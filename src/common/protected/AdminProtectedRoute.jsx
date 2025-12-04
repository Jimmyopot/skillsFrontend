import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAdminTokenExpiry } from "../../hooks/useAdminTokenExpiry";

export function AdminProtectedRoute({ children }) {
  const adminState = useSelector((state) => state?.AdminLoginReducer || {});
  const adminToken = localStorage.getItem("adminAuthToken");
  
  // Monitor admin token expiry and auto-logout when expired
  useAdminTokenExpiry();

  // If not authenticated as admin, redirect to admin login
  if (!adminToken && !adminState.isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  // If authenticated as admin, render the protected content
  return <>{children}</>;
}
