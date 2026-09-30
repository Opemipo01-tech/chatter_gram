import { prisma } from "../prisma_db/prisma.js";

export async function toggleLike(req, res) {
  try {
    const postId = Number(req.params.postId);
    const userId = req.user.id;

    if (Number.isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post ID.",
      });
    }

    // Make sure the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    // Check whether this user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // If a like already exists, remove it
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      const likesCount = await prisma.like.count({
        where: {
          postId,
        },
      });

      return res.status(200).json({
        message: "Post unliked successfully.",
        liked: false,
        likesCount,
      });
    }

    // Otherwise, create a new like
    const like = await prisma.like.create({
      data: {
        userId,
        postId,
      },
      select: {
        id: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    const likesCount = await prisma.like.count({
      where: {
        postId,
      },
    });

    return res.status(201).json({
      message: "Post liked successfully.",
      liked: true,
      likesCount,
      like,
    });
  } catch (error) {
    console.error("Toggle like error:", error);

    return res.status(500).json({
      message: "Something went wrong while liking or unliking the post.",
    });
  }
}