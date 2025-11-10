'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ensureScrollToTop } from '../lib/utils'

/**
 * Global scroll restoration component for Next.js App Router
 * This component handles scroll-to-top on all route changes
 */
export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top whenever pathname changes
    const scrollToTop = () => {
      // Immediate scroll
      ensureScrollToTop()
      
      // Additional scrolls after delays to handle async rendering and Lenis initialization
      requestAnimationFrame(() => {
        ensureScrollToTop()
        
        setTimeout(() => ensureScrollToTop(), 0)
        setTimeout(() => ensureScrollToTop(), 10)
        setTimeout(() => ensureScrollToTop(), 50)
        setTimeout(() => ensureScrollToTop(), 100)
        setTimeout(() => ensureScrollToTop(), 200)
        setTimeout(() => ensureScrollToTop(), 300)
      })
    }

    scrollToTop()
  }, [pathname])

  return null
}

