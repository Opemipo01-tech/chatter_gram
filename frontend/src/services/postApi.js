const API_URL = "http://localhost:3000/api";

export async function createPost(token, content) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      content,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to create post."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function getPosts(token) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to get posts."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}
export async function getPostById(token, postId) {
  const response = await fetch(
    `${API_URL}/posts/${postId}`,
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
      data.message || "Failed to get post."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}