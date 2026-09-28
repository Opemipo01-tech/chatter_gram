import { prisma } from "../prisma_db/prisma.js";

export async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving your profile.",
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    return res.status(200).json({
      users,
      currentUserId: req.user.id,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving users.",
    });
  }
}