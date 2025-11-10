'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: ReactNode
}

// Mobile detection function
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
  const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword))
  
  // Also check for touch capability and screen size
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isSmallScreen = window.innerWidth <= 1024 // Consider tablets as mobile for smooth scrolling
  
  return isMobileUserAgent || (isTouchDevice && isSmallScreen)
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const mobile = isMobileDevice()
    setIsMobile(mobile)

    // Only initialize Lenis on desktop devices
    if (mobile) {
      console.log('Mobile device detected: Using native scrolling')
      return // Exit early for mobile devices
    }

    console.log('Desktop device detected: Initializing smooth scrolling')
    
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenisRef.current = lenis
    
    // Store Lenis instance globally so scroll utilities can access it
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
      (document.body as any).__lenis = lenis;
    }

    let scrollTrigger: any
    try {
      scrollTrigger = require('gsap/ScrollTrigger')?.ScrollTrigger
      if (scrollTrigger) {
        lenis.on('scroll', scrollTrigger.update)
        scrollTrigger.scrollerProxy(document.body, {
          scrollTop(value: number) {
            return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
          },
          pinType: document.body.style.transform ? 'transform' : 'fixed'
        })
        scrollTrigger.addEventListener('refresh', () => lenis.resize())
        scrollTrigger.refresh()
      }
    } catch {
      // GSAP ScrollTrigger not available, continue without it
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (scrollTrigger) {
        scrollTrigger.removeEventListener('refresh', () => lenis.resize())
      }
      // Clean up global reference
      if (typeof window !== 'undefined') {
        delete (window as any).lenis;
        delete (document.body as any).__lenis;
      }
    }
  }, [])

  // Add mobile-specific scroll behavior
  useEffect(() => {
    if (isMobile) {
      // Add class to indicate mobile device
      document.body.classList.add('mobile-device')
      document.documentElement.classList.add('mobile-device')
      
      // Ensure native scrolling behavior on mobile
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      
      // Remove any smooth scroll CSS that might interfere
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'
      
      return () => {
        document.body.classList.remove('mobile-device')
        document.documentElement.classList.remove('mobile-device')
      }
    } else {
      // Add class to indicate desktop device
      document.body.classList.add('desktop-device')
      document.documentElement.classList.add('desktop-device')
      
      return () => {
        document.body.classList.remove('desktop-device')
        document.documentElement.classList.remove('desktop-device')
      }
    }
  }, [isMobile])

  return <>{children}</>
} 