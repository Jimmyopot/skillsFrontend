// Temporary authentication setup for testing
// Remove this file in production

export function setupTestAuth() {
  // Set test user ID (matches your Postman sender)
  localStorage.setItem("userId", "2952da01-2354-4f24-87d1-9481e11f6a77");

  // You need to set a valid JWT token here
  // Get this token from your login API or from Postman after successful login
  // localStorage.setItem("token", "your-jwt-token-here");

}

// Call this function in your browser console or add it to your app startup
// setupTestAuth();

export function clearAuth() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
}

export function checkAuthStatus() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Try to decode JWT payload (just for debugging)
      const payload = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
    }
  }
}
