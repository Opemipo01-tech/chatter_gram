import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getPostById } from "../services/postApi.js";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            {new Date(
              post.createdAt
            ).toLocaleString()}
          </small>
        </header>

        <p>{post.content}</p>

        <section>
          <h2>Comments</h2>

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