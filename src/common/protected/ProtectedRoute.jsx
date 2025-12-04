import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTokenExpiry } from "../../hooks/useTokenExpiry";

export function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.AuthReducer);
  const authToken = localStorage.getItem("authToken");
  
  // Monitor token expiry and auto-logout when expired
  useTokenExpiry();

  // If not authenticated or no user, redirect to login
  if (!authToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}