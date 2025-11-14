'use client'

import { ReactNode } from 'react'

interface SmoothScrollProviderProps {
  children: ReactNode
}

/**
 * TEMPORARY DIAGNOSTIC CHANGE: SmoothScrollProvider is currently a no-op
 * 
 * This component has been temporarily disabled to test whether Lenis smooth scrolling
 * is the root cause of mobile scroll issues (Chrome + Safari).
 * 
 * Current behavior:
 * - Does NOT initialize Lenis
 * - Does NOT add any event listeners
 * - Does NOT modify html/body styles or classes
 * - Simply renders children as-is
 * 
 * Testing goal:
 * - If mobile scroll works normally with this disabled, Lenis is confirmed as the root cause
 * - If scroll is still broken, the issue is elsewhere (layout/overflow/hero components)
 * 
 * Next steps after testing:
 * - Re-introduce Lenis with stricter mobile guards (desktop-only)
 * - Or investigate alternative causes if scroll remains broken
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // No-op: Just render children without any scroll manipulation
  return <>{children}</>
} 