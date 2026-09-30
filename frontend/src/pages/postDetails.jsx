import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";

import {
  getPostById,
  createComment,
  deleteComment,
  toggleLike,
} from "../services/postApi.js";

function PostDetails() {
  const { id } = useParams();
  const { user } = useOutletContext();

  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentId] =
    useState(null);

  const [error, setError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [likeError, setLikeError] = useState("");

  useEffect(() => {
    async function loadPost() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPostById(token, id);
        setPost(data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  async function handleLike() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLikeError("You must be logged in to like a post.");
      return;
    }

    try {
      setLikeLoading(true);
      setLikeError("");

      const data = await toggleLike(token, id);

      setPost((previousPost) => {
        if (data.liked) {
          return {
            ...previousPost,
            likes: [
              ...previousPost.likes,
              data.like,
            ],
          };
        }

        return {
          ...previousPost,
          likes: previousPost.likes.filter(
            (like) => like.user.id !== user.id
          ),
        };
      });
    } catch (error) {
      setLikeError(error.message);
    } finally {
      setLikeLoading(false);
    }
  }

  async function handleCreateComment(event) {
    event.preventDefault();

    const trimmedContent = commentContent.trim();

    if (!trimmedContent) {
      setCommentError("Comment content is required.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setCommentError("You must be logged in to comment.");
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError("");

      const data = await createComment(
        token,
        id,
        trimmedContent
      );

      setPost((previousPost) => ({
        ...previousPost,
        comments: [
          ...previousPost.comments,
          data.comment,
        ],
      }));

      setCommentContent("");
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setCommentLoading(false);
    }
  }

  async function handleDeleteComment(commentId) {
    const token = localStorage.getItem("token");

    if (!token) {
      setCommentError("You must be logged in.");
      return;
    }

    try {
      setDeletingCommentId(commentId);
      setCommentError("");

      await deleteComment(token, commentId);

      setPost((previousPost) => ({
        ...previousPost,
        comments: previousPost.comments.filter(
          (comment) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setDeletingCommentId(null);
    }
  }

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  const userHasLiked = post.likes.some(
    (like) => like.user.id === user.id
  );

  return (
    <main>
      <Link to="/">← Back to Home</Link>

      <article>
        <header>
          <Link to={`/users/${post.author.id}`}>
            <strong>
              {post.author.firstName}{" "}
              {post.author.lastName}
            </strong>
          </Link>

          <p>@{post.author.username}</p>

          <small>
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </header>

        <p>{post.content}</p>

        <section>
          <button
            type="button"
            onClick={handleLike}
            disabled={likeLoading}
          >
            {userHasLiked ? "❤️" : "♡"} Like{" "}
            {post.likes.length}
          </button>

          {likeError && <p>{likeError}</p>}
        </section>

        <section>
          <h2>Likes</h2>

          {post.likes.length === 0 ? (
            <p>No likes yet.</p>
          ) : (
            <ul>
              {post.likes.map((like) => (
                <li key={like.id}>
                  <Link to={`/users/${like.user.id}`}>
                    @{like.user.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Comments</h2>

          <form onSubmit={handleCreateComment}>
            <textarea
              value={commentContent}
              onChange={(event) =>
                setCommentContent(event.target.value)
              }
              placeholder="Write a comment..."
              rows="4"
              disabled={commentLoading}
            />

            {commentError && <p>{commentError}</p>}

            <button
              type="submit"
              disabled={commentLoading}
            >
              {commentLoading
                ? "Commenting..."
                : "Comment"}
            </button>
          </form>

          {post.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>
                  <Link
                    to={`/users/${comment.author.id}`}
                  >
                    <strong>
                      {comment.author.firstName}{" "}
                      {comment.author.lastName}
                    </strong>
                  </Link>

                  <p>{comment.content}</p>

                  <small>
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </small>

                  {comment.author.id === user.id && (
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteComment(comment.id)
                      }
                      disabled={
                        deletingCommentId === comment.id
                      }
                    >
                      {deletingCommentId === comment.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </main>
  );
}

export default PostDetails;