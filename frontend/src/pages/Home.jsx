import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";

import CreatePost from "../components/CreatePost.jsx";
import { getPosts } from "../services/postApi.js";

function Home() {
  const { user } = useOutletContext();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPosts(token);

        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  function handlePostCreated(newPost) {
    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);
  }

  return (
    <main>
      <section>
        <h1>Welcome, {user.firstName}</h1>
        <p>@{user.username}</p>
      </section>

      <CreatePost
        onPostCreated={handlePostCreated}
      />

      <section>
        <h2>Posts</h2>

        {loading && <p>Loading posts...</p>}

        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          posts.length === 0 && (
            <p>No posts yet.</p>
          )}

        {!loading &&
          !error &&
          posts.length > 0 && (
            <div>
              {posts.map((post) => (
                <article key={post.id}>
                  <header>
                    <Link
                      to={`/users/${post.author.id}`}
                    >
                      <strong>
                        {post.author.firstName}{" "}
                        {post.author.lastName}
                      </strong>
                    </Link>

                    <p>
                      @{post.author.username}
                    </p>

                    <small>
                      {new Date(
                        post.createdAt
                      ).toLocaleString()}
                    </small>
                  </header>

                  <Link to={`/posts/${post.id}`}>
                    <p>{post.content}</p>
                  </Link>

                  <div>
                    <span>
                      {post.likes.length}{" "}
                      {post.likes.length === 1
                        ? "Like"
                        : "Likes"}
                    </span>

                    {" · "}

                    <span>
                      {post.comments.length}{" "}
                      {post.comments.length === 1
                        ? "Comment"
                        : "Comments"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default Home;