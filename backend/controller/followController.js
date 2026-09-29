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

    const existingFollow =
      await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

    // Unfollow
    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      const followersCount =
        await prisma.follow.count({
          where: {
            followingId,
          },
        });

      const followingCount =
        await prisma.follow.count({
          where: {
            followerId,
          },
        });

      return res.status(200).json({
        message:
          "User unfollowed successfully.",
        isFollowing: false,
        followersCount,
        followingCount,
      });
    }

    // Follow
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    const followersCount =
      await prisma.follow.count({
        where: {
          followingId,
        },
      });

    const followingCount =
      await prisma.follow.count({
        where: {
          followerId,
        },
      });

    return res.status(201).json({
      message: "User followed successfully.",
      isFollowing: true,
      followersCount,
      followingCount,
    });
  } catch (error) {
    console.error(
      "Follow/unfollow user error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong while following or unfollowing this user.",
    });
  }
}

export async function getFollowRequests(req, res) {
  try {
    const currentUserId = req.user.id;

    const followRequests = await prisma.follow.findMany({
      where: {
        // Someone follows the logged-in user
        followingId: currentUserId,

        // But the logged-in user does NOT follow them back
        follower: {
          following: {
            none: {
              followingId: currentUserId,
            },
          },
        },
      },

      select: {
        id: true,

        follower: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const users = followRequests.map((follow) => ({
      followId: follow.id,
      id: follow.follower.id,
      username: follow.follower.username,
      firstName: follow.follower.firstName,
      lastName: follow.follower.lastName,
      avatarUrl: follow.follower.avatarUrl,
    }));

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get follow requests error:", error);

    return res.status(500).json({
      message:
        "Something went wrong while retrieving follow requests.",
    });
  }
}