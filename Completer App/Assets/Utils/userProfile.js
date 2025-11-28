//For user profile and info
export function getUserProfile() {
  const username = localStorage.getItem("username") || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

  return {
    username,
    userEmail,
  };
}

