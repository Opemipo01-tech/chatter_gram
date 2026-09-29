import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { getUserById } from "../services/userApi.js";

function UserProfile() {
  const { id } = useParams();
  const { user: currentUser } = useOutletContext();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserById(token, id);

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>

        <Link to="/users">
          Back to People
        </Link>
      </main>
    );
  }

  const isCurrentUser = currentUser.id === user.id;

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

        {isCurrentUser && (
          <Link to="/edit-profile">
            Edit Profile
          </Link>
        )}
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