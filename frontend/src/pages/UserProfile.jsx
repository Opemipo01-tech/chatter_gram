import { useEffect, useState } from "react";
import {
  Link,
  useOutletContext,
  useParams,
} from "react-router";

import {
  getUserById,
  followUser,
} from "../services/userApi.js";

function UserProfile() {
  const { id } = useParams();

  const { user: currentUser } =
    useOutletContext();

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [followLoading, setFollowLoading] =
    useState(false);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserById(
          token,
          id
        );

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleFollow() {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      return;
    }

    try {
      setFollowLoading(true);
      setError("");

      const data = await followUser(
        token,
        user.id
      );

setUser((previousUser) => ({
  ...previousUser,

  isFollowing: data.isFollowing,

  followersCount: data.followersCount,
}));
    } catch (error) {
      setError(error.message);
    } finally {
      setFollowLoading(false);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error && !user) {
    return (
      <main>
        <p>{error}</p>

        <Link to="/users">
          Back to People
        </Link>
      </main>
    );
  }

  const isCurrentUser =
    currentUser.id === user.id;

  return (
    <main>
      <Link to="/users">
        ← Back to People
      </Link>

      <section>
        <h1>
          {user.firstName} {user.lastName}
        </h1>

        <p>@{user.username}</p>

        <p>
          {user.bio || "No bio yet."}
        </p>

        <div>
          <Link
            to={`/users/${user.id}/followers`}
          >
            <strong>
              {user.followersCount}
            </strong>{" "}
            Followers
          </Link>

          {" | "}

          <Link
            to={`/users/${user.id}/following`}
          >
            <strong>
              {user.followingCount}
            </strong>{" "}
            Following
          </Link>
        </div>

        {!isCurrentUser && (
          <div>
            <button
              type="button"
              onClick={handleFollow}
              disabled={followLoading}
            >
              {followLoading
                ? "Loading..."
                : user.isFollowing
                ? "Following"
                : user.isFollowingMe
                ? "Follow Back"
                : "Follow"}
            </button>
          </div>
        )}

        {isCurrentUser && (
          <div>
            <Link to="/edit-profile">
              Edit Profile
            </Link>
          </div>
        )}

        {error && <p>{error}</p>}
      </section>

      <section>
        <h2>Posts</h2>

        {user.posts.length === 0 ? (
          <p>
            This user hasn't posted anything yet.
          </p>
        ) : (
          <div>
            {user.posts.map((post) => (
              <article key={post.id}>
                <p>{post.content}</p>

                <small>
                  {new Date(
                    post.createdAt
                  ).toLocaleString()}
                </small>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default UserProfile;