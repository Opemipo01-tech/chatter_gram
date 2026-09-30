import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";

import CreatePost from "../components/CreatePost.jsx";
import { getPosts, toggleLike } from "../services/postApi.js";

function Home() {
  const { user } = useOutletContext();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoadingId, setLikeLoadingId] = useState(null);

  const [error, setError] = useState("");
  const [likeError, setLikeError] = useState("");

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

  async function handleLike(postId) {
    const token = localStorage.getItem("token");

    if (!token) {
      setLikeError("You must be logged in to like a post.");
      return;
    }

    try {
      setLikeLoadingId(postId);
      setLikeError("");

      const data = await toggleLike(token, postId);

      setPosts((previousPosts) =>
        previousPosts.map((post) => {
          if (post.id !== postId) {
            return post;
          }

          if (data.liked) {
            return {
              ...post,
              likes: [
                ...post.likes,
                data.like,
              ],
            };
          }

          return {
            ...post,
            likes: post.likes.filter(
              (like) => like.user.id !== user.id
            ),
          };
        })
      );
    } catch (error) {
      setLikeError(error.message);
    } finally {
      setLikeLoadingId(null);
    }
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

        {likeError && <p>{likeError}</p>}

        {!loading &&
          !error &&
          posts.length === 0 && (
            <p>No posts yet.</p>
          )}

        {!loading &&
          !error &&
          posts.length > 0 && (
            <div>
              {posts.map((post) => {
                const userHasLiked = post.likes.some(
                  (like) => like.user.id === user.id
                );

                return (
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
                      <button
                        type="button"
                        onClick={() =>
                          handleLike(post.id)
                        }
                        disabled={
                          likeLoadingId === post.id
                        }
                      >
                        {userHasLiked ? "❤️" : "♡"} Like{" "}
                        {post.likes.length}
                      </button>

                      {" · "}

                      <Link
                        to={`/posts/${post.id}`}
                      >
                        {post.comments.length}{" "}
                        {post.comments.length === 1
                          ? "Comment"
                          : "Comments"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
      </section>
    </main>
  );
}

export default Home;