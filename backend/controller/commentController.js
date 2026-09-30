import { prisma } from "../prisma_db/prisma.js";

export async function createComment(req, res) {
  try {
    const postId = Number(req.params.postId);
    const { content } = req.body;

    if (Number.isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post ID.",
      });
    }

    if (
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Comment content is required.",
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: req.user.id,
        postId,
      },

      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,

        author: {
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

    return res.status(201).json({
      message: "Comment created successfully.",
      comment,
    });
  } catch (error) {
    console.error("Create comment error:", error);

    return res.status(500).json({
      message:
        "Something went wrong while creating the comment.",
    });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = Number(req.params.commentId);

    if (Number.isNaN(commentId)) {
      return res.status(400).json({
        message: "Invalid comment ID.",
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },

      select: {
        id: true,
        authorId: true,
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found.",
      });
    }

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this comment.",
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error("Delete comment error:", error);

    return res.status(500).json({
      message:
        "Something went wrong while deleting the comment.",
    });
  }
}