'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenisRef.current = lenis

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
    }
  }, [])

  return <>{children}</>
} 