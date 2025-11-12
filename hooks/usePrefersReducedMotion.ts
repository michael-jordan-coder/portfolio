import { useState, useEffect } from 'react';

/**
 * Custom hook that checks the user's prefers-reduced-motion accessibility preference
 * Respects system accessibility settings
 * @returns boolean - true if user prefers reduced motion, false otherwise
 */
export const usePrefersReducedMotion = () => {
  // Initialize with false to match SSR, will update on client
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  // Always return the state value - initialized to false for SSR safety
  // Never use early return in hooks as it violates Rules of Hooks
  return prefersReducedMotion;
};

