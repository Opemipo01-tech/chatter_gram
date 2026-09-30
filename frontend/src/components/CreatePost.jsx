import { useState } from "react";
import { createPost } from "../services/postApi.js";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Post content is required.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await createPost(
        token,
        trimmedContent
      );

      setContent("");

      onPostCreated(data.post);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="What's on your mind?"
          rows="5"
          disabled={loading}
        />

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;