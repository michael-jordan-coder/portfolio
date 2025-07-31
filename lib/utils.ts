import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect } from 'react'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind CSS class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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