import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { manualAdminLogout } from '../pages/adminLogin/state/AdminLoginSlice';
import { config } from '../utils/config';

/**
 * Custom hook to monitor admin token expiry and auto-logout
 * Checks token validity every 10 seconds
 */
export const useAdminTokenExpiry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const hasLoggedOutRef = useRef(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken');
        
        // If no token, skip validation
        if (!token) {
          return;
        }

        // Call backend to validate admin token
        const response = await fetch(`${config.apiUrl}admin/ValidateToken`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Token is invalid or expired
          if (!hasLoggedOutRef.current) {
            handleLogout('Your admin session has expired. Please login again.');
          }
          return;
        }

        const data = await response.json();
        
        // Check if token is expired or about to expire
        if (!data.isValid || data.timeRemainingSeconds <= 0) {
          if (!hasLoggedOutRef.current) {
            handleLogout('Your admin session has expired. Please login again.');
          }
        } else if (data.timeRemainingSeconds <= 10) {
        //   console.warn(`Admin token expiring in ${data.timeRemainingSeconds} seconds`);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // console.error('Admin token validation error:', error);
      }
    };

    const handleLogout = () => {
      hasLoggedOutRef.current = true;
      
      // Clear interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Clear admin local storage BEFORE dispatch
      localStorage.removeItem('adminAuthToken');
      localStorage.removeItem('admin');
      
      // Dispatch logout action to clear Redux state
      dispatch(manualAdminLogout());
      
    //   console.log(message);
      
      // Force immediate navigation
      window.location.href = '/';
    };

    // Start checking token validity every 5 seconds (faster detection)
    intervalRef.current = setInterval(checkTokenValidity, 5000);
    
    // Check immediately on mount
    checkTokenValidity();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [navigate, dispatch]);

  return null;
};
