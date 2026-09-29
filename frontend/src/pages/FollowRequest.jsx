import { useEffect, useState } from "react";

import {
  getFollowRequests,
  followUser,
} from "../services/userApi.js";

function FollowRequests() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFollowRequests() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getFollowRequests(token);

        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadFollowRequests();
  }, []);

  async function handleFollowBack(userId) {
    const token = localStorage.getItem("token");

    try {
      await followUser(token, userId);

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user.id !== userId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return <p>Loading follow requests...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Follow Requests</h1>

      {users.length === 0 ? (
        <p>No follow requests.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <a href={`/users/${user.id}`}>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>

                <p>@{user.username}</p>
              </a>

              <button
                type="button"
                onClick={() =>
                  handleFollowBack(user.id)
                }
              >
                Follow Back
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default FollowRequests;