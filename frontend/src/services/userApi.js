const API_URL = "http://localhost:3000/api";

export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to get current user."
    );

    error.status = response.status;

    throw error;
  }

  return data.user;
}

export async function getAllUsers(token) {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to get users."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function getUserById(token, userId) {
  const response = await fetch(
    `${API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to get user profile."
    );

    error.status = response.status;

    throw error;
  }

  return data.user;
}