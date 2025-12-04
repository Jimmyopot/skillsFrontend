import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { manualLogout } from '../pages/login/state/LoginSlice';
import { config } from '../utils/config';

/**
 * Custom hook to monitor token expiry and auto-logout users
 * Checks token validity every 5 seconds for faster response
 */
export const useTokenExpiry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const hasLoggedOutRef = useRef(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        // If no token, skip validation
        if (!token) {
          return;
        }

        // Call backend to validate token
        const response = await fetch(`${config.apiUrl}account/ValidateToken`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Token is invalid or expired
          if (!hasLoggedOutRef.current) {
            handleLogout('Your session has expired. Please login again.');
          }
          return;
        }

        const data = await response.json();
        
        // Check if token is expired or about to expire
        if (!data.isValid || data.timeRemainingSeconds <= 0) {
          if (!hasLoggedOutRef.current) {
            handleLogout('Your session has expired. Please login again.');
          }
        } else if (data.timeRemainingSeconds <= 10) {
          // Optional: Show warning when token is about to expire
        //   console.warn(`Token expiring in ${data.timeRemainingSeconds} seconds`);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // console.error('Token validation error:', error);
        // Network errors shouldn't log out the user immediately
        // Only explicit expiry/invalid token should trigger logout
      }
    };

    const handleLogout = () => {
      hasLoggedOutRef.current = true;
      
      // Clear interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Clear all local storage BEFORE dispatch
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Dispatch logout action to clear Redux state
      dispatch(manualLogout());
      
    //   console.log(message);
      
      // Force immediate navigation
      window.location.href = '/';
    };

    // Start checking token validity every 5 seconds (faster detection)
    intervalRef.current = setInterval(checkTokenValidity, 5000);
    
    // Also check immediately on mount
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
