const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Registration failed."
    );

    error.errors = data.errors || [];

    throw error;
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Login failed."
    );

    error.errors = data.errors || [];

    throw error;
  }

  return data;
}