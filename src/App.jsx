import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import IndexPage from "./pages/landingPage/IndexPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage.jsx";
import AdminLogin from "./pages/adminLogin/AdminLogin.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import NoInternetPage from "./pages/noInternet/NoInternetPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  checkAuthAction,
} from "./pages/login/state/LoginActions";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { ProtectedRoute } from "./common/protected/ProtectedRoute";
import { AdminProtectedRoute } from "./common/protected/AdminProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const loc = useLocation();
 
if (loc.pathname === "/") {
 
  localStorage.clear();
}

  // If offline, show the no internet page
  if (!isOnline) {
    return <NoInternetPage />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/adminsOnly"
          element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Manual route to test no internet page */}
        <Route path="/no-internet" element={<NoInternetPage />} />
        {/* Catch-all route for 404 - MUST be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
