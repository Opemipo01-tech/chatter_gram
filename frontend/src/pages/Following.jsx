import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getFollowing } from "../services/userApi.js";

function Following() {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFollowing() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getFollowing(
          token,
          id
        );

        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadFollowing();
  }, [id]);

  if (loading) {
    return <p>Loading following...</p>;
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>

        <Link to={`/users/${id}`}>
          Back to Profile
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link to={`/users/${id}`}>
        ← Back to Profile
      </Link>

      <h1>Following</h1>

      {users.length === 0 ? (
        <p>Not following anyone yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>

                <p>@{user.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Following;