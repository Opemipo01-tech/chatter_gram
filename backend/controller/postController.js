import { prisma } from "../prisma_db/prisma.js";

export async function createPost(req, res) {
  try {
    const { content } = req.body;

    if (
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Post content is required.",
      });
    }

    const trimmedContent = content.trim();

    const post = await prisma.post.create({
      data: {
        content: trimmedContent,
        authorId: req.user.id,
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

        comments: {
          select: {
            id: true,
          },
        },

        likes: {
          select: {
            id: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating the post.",
    });
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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

        comments: {
          orderBy: {
            createdAt: "asc",
          },

          select: {
            id: true,
            content: true,
            createdAt: true,

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
        },

        likes: {
          select: {
            id: true,
            createdAt: true,

            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving posts.",
    });
  }
}

export async function getPostById(req, res) {
  try {
    const postId = Number(req.params.id);

    if (Number.isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post ID.",
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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

        comments: {
          orderBy: {
            createdAt: "asc",
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
        },

        likes: {
          orderBy: {
            createdAt: "asc",
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
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error("Get post by ID error:", error);

    return res.status(500).json({
      message:
        "Something went wrong while retrieving the post.",
    });
  }
}