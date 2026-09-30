import { useEffect, useState } from "react";
import { Link } from "react-router";

import {
  getAllUsers,
  followUser,
} from "../services/userApi.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "You must be logged in to view users."
        );
        setLoading(false);
        return;
      }

      try {
        const data = await getAllUsers(token);

        setUsers(data.users);
        setCurrentUserId(data.currentUserId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleFollow(userId) {
    const token = localStorage.getItem("token");

    try {
      const data = await followUser(token, userId);

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                isFollowing: data.isFollowing,
              }
            : user
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
        
<div className="page-header">
  <div>
    <h1>People</h1>
    <p>Discover people and connect with them.</p>
  </div>

  <div className="page-header-actions">
    <Link to="/">
      ← Back to Home
    </Link>

    <Link to="/follow-requests">
      Follow Requests
    </Link>
  </div>
</div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => {
            const isCurrentUser =
              user.id === currentUserId;

            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <h2>
                    {user.firstName} {user.lastName}

                    {isCurrentUser && " (You)"}
                  </h2>

                  <p>@{user.username}</p>
                </Link>

                {!isCurrentUser && (
                  <button
                    type="button"
                    onClick={() =>
                      handleFollow(user.id)
                    }
                  >
                    {user.isFollowing
                      ? "Following"
                      : user.isFollowingMe
                      ? "Follow Back"
                      : "Follow"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Users;