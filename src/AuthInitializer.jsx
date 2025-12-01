import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "./pages/login/state/authSlice";
// import { setUserFromStorage } from "../path-to-your-auth-slice/authSlice";

/**
 * Component to initialize authentication state from localStorage
 * Place this at the root of your app (in App.js or similar)
 */
export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app initialization
    const userStr = localStorage.getItem("user");
    const authToken = localStorage.getItem("authToken");

    if (userStr && authToken) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setUserFromStorage(user));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  }, [dispatch]);

  return children;
}
