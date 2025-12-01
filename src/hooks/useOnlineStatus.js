import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Additional check with network request (more reliable)
    const checkInternetConnection = async () => {
      try {
        // Try to fetch a small resource from your API or a reliable external source
        const response = await fetch('/api/health-check', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
        });
        setIsOnline(true);
      } catch {
        try {
          // Fallback to checking Google's DNS
          const response = await fetch('https://dns.google/resolve?name=google.com&type=A', {
            method: 'HEAD',
            mode: 'no-cors',
          });
          setIsOnline(true);
        } catch {
          setIsOnline(false);
        }
      }
    };

    // Check connection every 30 seconds
    const intervalId = setInterval(checkInternetConnection, 30000);

    // Cleanup event listeners and interval
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(intervalId);
    };
  }, []);

  return isOnline;
};