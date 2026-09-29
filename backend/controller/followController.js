import { prisma } from "../prisma_db/prisma.js";

export async function followUser(req, res) {
  try {
    const followerId = req.user.id;
    const followingId = Number(req.params.userId);

    if (Number.isNaN(followingId)) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself.",
      });
    }

    const userToFollow = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
      select: {
        id: true,
      },
    });

    if (!userToFollow) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    // If already following, unfollow
    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return res.status(200).json({
        message: "User unfollowed successfully.",
        isFollowing: false,
      });
    }

    // Otherwise, follow
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return res.status(201).json({
      message: "User followed successfully.",
      isFollowing: true,
    });
  } catch (error) {
    console.error("Follow/unfollow user error:", error);

    return res.status(500).json({
      message: "Something went wrong while following or unfollowing this user.",
    });
  }
}