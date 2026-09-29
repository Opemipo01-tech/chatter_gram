import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import { updateMyProfile } from "../services/userApi.js";

function EditProfile() {
  const { user, updateUser } = useOutletContext();

  const [formData, setFormData] = useState(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: user?.bio || "",
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const data = await updateMyProfile(token, formData);

      updateUser(data.user);

      setSuccess(data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      <Link to={`/users/${user.id}`}>
        Back to Profile
      </Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            First name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">
            Last name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="bio">
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {error && <p>{error}</p>}

        {success && <p>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}

export default EditProfile;