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

export async function createComment(
  token,
  postId,
  content
) {
  const response = await fetch(
    `${API_URL}/posts/${postId}/comments`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        content,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to create comment."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function deleteComment(
  token,
  commentId
) {
  const response = await fetch(
    `${API_URL}/comments/${commentId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to delete comment."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function toggleLike(token, postId) {
  const response = await fetch(
    `${API_URL}/posts/${postId}/like`,
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
      data.message || "Failed to like or unlike post."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}