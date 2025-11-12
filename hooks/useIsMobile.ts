import { useState, useEffect } from 'react';

/**
 * Custom hook that detects if the current viewport is mobile (< 640px)
 * Includes resize listener for dynamic updates
 * @returns boolean - true if mobile, false otherwise
 */
export const useIsMobile = () => {
  // Initialize with false to match SSR, will update on client
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Always return the state value - initialized to false for SSR safety
  // Never use early return in hooks as it violates Rules of Hooks
  return isMobile;
};

