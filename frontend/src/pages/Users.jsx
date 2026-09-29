import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllUsers } from "../services/userApi.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view users.");
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

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>People</h1>

      <Link to="/">
        Back to Home
      </Link>

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
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Users;