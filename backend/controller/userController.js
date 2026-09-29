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
    const currentUserId = req.user.id;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,

        // Does the logged-in user follow this person?
        followers: {
          where: {
            followerId: currentUserId,
          },
          select: {
            id: true,
          },
        },

        // Does this person follow the logged-in user?
        following: {
          where: {
            followingId: currentUserId,
          },
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        username: "asc",
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,

      isFollowing: user.followers.length > 0,

      isFollowingMe: user.following.length > 0,
    }));

    return res.status(200).json({
      users: formattedUsers,
      currentUserId,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message:
        "Something went wrong while retrieving users.",
    });
  }
}

export async function getUserById(req, res) {
  try {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user ID.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
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
    console.error("Get user by ID error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving this user.",
    });
  }
}

export async function updateMyProfile(req, res) {
  try {
    const { firstName, lastName, username, bio } = req.body;

    const data = {};

    if (firstName !== undefined) {
      data.firstName = firstName.trim();
    }

    if (lastName !== undefined) {
      data.lastName = lastName.trim();
    }

    if (username !== undefined) {
      data.username = username.trim();
    }

    if (bio !== undefined) {
      data.bio = bio.trim();
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No profile information was provided.",
      });
    }

    if (data.firstName !== undefined && data.firstName.length === 0) {
      return res.status(400).json({
        message: "First name cannot be empty.",
      });
    }

    if (data.lastName !== undefined && data.lastName.length === 0) {
      return res.status(400).json({
        message: "Last name cannot be empty.",
      });
    }

    if (data.username !== undefined) {
      if (data.username.length < 3 || data.username.length > 30) {
        return res.status(400).json({
          message: "Username must be between 3 and 30 characters.",
        });
      }

      if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        return res.status(400).json({
          message:
            "Username can only contain letters, numbers, and underscores.",
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          username: data.username,
          NOT: {
            id: req.user.id,
          },
        },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Username is already taken.",
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data,
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

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Something went wrong while updating your profile.",
    });
  }
}