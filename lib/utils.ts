import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind CSS class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to ensure scroll to top
export function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

// Custom hook for scroll restoration
export function useScrollToTop() {
  if (typeof window !== 'undefined') {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also scroll to top after a short delay to ensure it works
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    // Additional scroll to top after component mount
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }
}

// Helper to get Lenis instance from window (if available)
function getLenisInstance(): any {
  if (typeof window === 'undefined') return null;
  
  // Try to find Lenis instance from the global scope or document
  // Lenis stores itself on window or we can access it via document.body
  const lenis = (window as any).lenis || (document.body as any).__lenis;
  
  // Alternative: try to find it via the SmoothScrollProvider's ref
  // Since we can't directly access it, we'll use a different approach
  return lenis;
}

// Enhanced scroll restoration for Next.js navigation
export function ensureScrollToTop() {
  if (typeof window === 'undefined') return;
  
  // Try to use Lenis if available (for smooth scrolling)
  const lenis = getLenisInstance();
  
  if (lenis) {
    // Use Lenis scrollTo with immediate option
    lenis.scrollTo(0, { immediate: true });
    
    // Additional scrolls to ensure it works
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 10);
    
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 50);
    
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 100);
    
    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
    }, 300);
  } else {
    // Fallback to native scroll for mobile or when Lenis is not available
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 10);
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 50);
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 300);
  }
}

// React hook for automatic scroll restoration
export function useScrollRestoration() {
  useEffect(() => {
    // Immediate scroll on mount
    ensureScrollToTop();
    
    // Additional scroll after a short delay to handle any layout shifts
    const timeoutId = setTimeout(() => {
      ensureScrollToTop();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);
}

// Enhanced hook for scroll restoration with router navigation
export function useScrollToTopOnNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Function to scroll to top with multiple attempts
    const scrollToTopWithRetries = () => {
      // Immediate attempt
      ensureScrollToTop();
      
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        ensureScrollToTop();
        
        // Additional attempts after delays to handle async rendering
        setTimeout(() => ensureScrollToTop(), 0);
        setTimeout(() => ensureScrollToTop(), 10);
        setTimeout(() => ensureScrollToTop(), 50);
        setTimeout(() => ensureScrollToTop(), 100);
        setTimeout(() => ensureScrollToTop(), 200);
        setTimeout(() => ensureScrollToTop(), 300);
      });
    };
    
    // Scroll to top immediately when component mounts or pathname changes
    scrollToTopWithRetries();
    
    // Listen for route changes via popstate (browser back/forward)
    const handlePopState = () => {
      scrollToTopWithRetries();
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Also listen for hash changes
    const handleHashChange = () => {
      scrollToTopWithRetries();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]); // Re-run when pathname changes
  
  return router;
}

/**
 * Design System utility functions
 */

// Color utilities
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe', 
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74', 
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6', 
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  }
} as const

// Spacing utilities
export const spacing = {
  sectionY: '20vh',
  content: '3rem',
  component: '1.5rem', 
  element: '1rem',
  tight: '0.5rem',
} as const

// Typography utilities
export const typography = {
  hero: 'text-hero',
  display: 'text-display',
  heading1: 'text-heading-1',
  heading2: 'text-heading-2', 
  heading3: 'text-heading-3',
  bodyLarge: 'text-body-large',
  body: 'text-body',
  bodySmall: 'text-body-small',
} as const

// Component class builders
export const buildButtonClass = (variant: string, size: string, className?: string) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline', 
    accent: 'btn-accent'
  }

  const sizes = {
    default: 'px-6 py-3',
    sm: 'px-4 py-2 text-body-small',
    lg: 'px-8 py-4 text-body-large'
  }

  return cn(
    variants[variant as keyof typeof variants],
    sizes[size as keyof typeof sizes],
    className
  )
}

export const buildSectionClass = (variant: string, className?: string) => {
  const variants = {
    hero: 'section-hero',
    smooth: 'section-smooth', 
    gsap: 'section-gsap',
    accent: 'section-accent'
  }

  return cn(
    variants[variant as keyof typeof variants],
    className
  )
}

export const buildCardClass = (variant: string, className?: string) => {
  const variants = {
    base: 'card-base',
    glass: 'card-glass',
    big: 'big-box'
  }

  return cn(
    variants[variant as keyof typeof variants], 
    className
  )
}

// Hydration hook to prevent SSR/client mismatch
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
}

/**
 * Mobile detection utility for iOS Safari and mobile WebViews
 * Returns true only for mobile devices (iOS Safari, Android Chrome, mobile WebViews)
 * Desktop behavior remains completely unchanged
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
  
  // Check for touch capability and screen size
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024; // Consider tablets as mobile for scroll behavior
  
  // Mobile = mobile user agent OR (touch device AND small screen)
  return isMobileUserAgent || (isTouchDevice && isSmallScreen);
}

/**
 * Hook for mobile detection in React components
 * Only returns true on mobile devices, desktop always returns false
 */
export const useIsMobileDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    // Optional: listen for resize to handle device rotation
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
} 