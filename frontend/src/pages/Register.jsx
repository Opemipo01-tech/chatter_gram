import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors([]);
    setServerError("");
    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      setServerError(error.message);
      setErrors(error.errors || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Create an Account</h1>

      {serverError && (
        <p role="alert">
          {serverError}
        </p>
      )}

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} role="alert">
              {error.msg}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            First Name
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
            Last Name
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
        
            minLength={3}
            maxLength={30}
          />
        </div>

        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
        
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
        
            minLength={8}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Log in
        </Link>
      </p>
    </main>
  );
}

export default Register;