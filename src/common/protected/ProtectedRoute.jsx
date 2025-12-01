import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

export function ProtectedRoute({ children }) {
  // @ts-ignore
  const loginState = useSelector((state) => state?.LoginReducer || {});
 
  const authToken = localStorage.getItem("authToken");

  // Show loading spinner while checking authentication
  // if (checkingAuth) {
  //   return (
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         minHeight: '100vh',
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // If not authenticated, redirect to login
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}