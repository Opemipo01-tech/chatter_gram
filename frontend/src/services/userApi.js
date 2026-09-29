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

export async function updateMyProfile(token, profileData) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to update profile."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function followUser(token, userId) {
  const response = await fetch(
    `${API_URL}/follows/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to follow user."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function getFollowRequests(token) {
  const response = await fetch(
    `${API_URL}/follows/follow-requests`,
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
      data.message ||
        "Failed to get follow requests."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function getFollowers(token, userId) {
  const response = await fetch(
    `${API_URL}/users/${userId}/followers`,
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
      data.message ||
        "Failed to get followers."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function getFollowing(token, userId) {
  const response = await fetch(
    `${API_URL}/users/${userId}/following`,
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
      data.message ||
        "Failed to get following."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}