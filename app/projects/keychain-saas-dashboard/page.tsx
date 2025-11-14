'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollToTopOnNavigation } from '../../../lib/utils'
import NextProjectButton from '../../../components/NextProjectButton'
import { CodeBlock } from '../../../components/CodeBlock'
import Navbar from '../../../components/Navbar'
import ContactModal from '../../../components/ContactModal'

// Asset configuration
const ASSETS = {
  images: {
    overview: '/keychain/overview.webp',
    models: '/keychain/models.webp',
    aiPanel: '/keychain/ai-panel.webp',
    section3: '/keychain/section-3.svg',
    card: '/keychain/card.svg',
    code: '/keychain/code.svg',
    tablist: '/keychain/Tablist.svg',
    alex: '/keychain/alex.svg',
    jonathan: '/keychain/jonathan.svg',
    total: '/keychain/total.webp',
    components: '/keychain/components.webp',
  },
  videos: {
    fullHero: '/keychain/full-hero.mp4',
    ai: '/keychain/ai.mp4',
    models: '/keychain/models.mov',
  },
} as const

// Constants
const INTERSECTION_OPTIONS: IntersectionObserverInit = { threshold: 0.15 }
const MARKDOWN_BOLD_REGEX = /(\*\*.*?\*\*)/g
const MOBILE_BREAKPOINT = 1024
const RESIZE_DEBOUNCE_MS = 150

// Back button icon SVG
const BackIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

// Throttle utility for resize events
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

const SectionHeader = memo(function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  id?: string
}) {
  return (
    <header className={align === 'center' ? 'text-center mb-6' : 'mb-8'}>
      {eyebrow ? (
        <span className="inline-block bg-black border border-gray-700 text-gray-300 text-xs tracking-wide uppercase px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h3 id={id} className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">{title}</h3>
      {description ? (
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      ) : null}
    </header>
  )
})

function useInView(options: IntersectionObserverInit = INTERSECTION_OPTIONS) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const optionsRef = useRef(options)
  
  // Update options ref when it changes
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, optionsRef.current)
    
    observer.observe(element)
    return () => observer.disconnect()
  }, []) // Empty deps - options are accessed via ref

  return { ref, inView }
}

const Reveal = memo(function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
})

const VideoPlayer = memo(function VideoPlayer({ 
  src, 
  poster, 
  className = '',
  onOpenModal 
}: { 
  src: string
  poster?: string
  className?: string
  onOpenModal?: (videoSrc: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch(() => {
        // Silently handle autoplay prevention
      })
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const handleClick = useCallback(() => {
    if (onOpenModal) {
      onOpenModal(src)
    } else {
      const video = videoRef.current
      if (!video) return
      
      if (video.paused) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
  }, [src, onOpenModal])

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover rounded-2xl cursor-pointer ${className}`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      onClick={handleClick}
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/quicktime" />
      Your browser does not support the video tag.
    </video>
  )
})

const VideoModal = memo(function VideoModal({ 
  isOpen, 
  videoSrc, 
  onClose 
}: { 
  isOpen: boolean
  videoSrc: string | null
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!videoSrc) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with glass blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white transition-all duration-200"
              aria-label="Close video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
                <source src={videoSrc} type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
})

const MarkdownText = memo(function MarkdownText({ text }: { text: string }) {
  const parts = useMemo(() => text.split(MARKDOWN_BOLD_REGEX), [text])
  
  return (
    <p className="text-gray-300 leading-relaxed text-lg sm:text-xl text-center">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
})

const AnimatedCheckmark = memo(function AnimatedCheckmark({ delay = 0 }: { delay?: number }) {
  const { ref, inView } = useInView()
  
  return (
    <div ref={ref} className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mt-1 relative overflow-hidden">
      {/* Background circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          duration: 0.3, 
          delay: delay,
          ease: "easeOut"
        }}
        className="absolute inset-0 rounded-full bg-green-500/10"
      />
      
      {/* Checkmark SVG */}
      <svg
        className="w-5 h-5 text-green-400 relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { 
              duration: 0.4, 
              delay: delay + 0.15,
              ease: "easeOut"
            },
            opacity: { 
              duration: 0.2, 
              delay: delay + 0.15 
            }
          }}
        />
      </svg>
    </div>
  )
})

const DataFlowVisualization = memo(function DataFlowVisualization() {
  const leftFrameRef = useRef<HTMLDivElement>(null)
  const rightFrameRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [pathData, setPathData] = useState<{ d: string; viewBox: string; startX: number; startY: number; endX: number; endY: number } | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const calculatePath = useCallback(() => {
    if (!leftFrameRef.current || !rightFrameRef.current) return
    
    const leftRect = leftFrameRef.current.getBoundingClientRect()
    const rightRect = rightFrameRef.current.getBoundingClientRect()
    const containerRect = leftFrameRef.current.parentElement?.getBoundingClientRect()
    
    if (!containerRect) return
    
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
    
    if (isMobile) {
      // Vertical path for mobile
      const leftX = leftRect.left - containerRect.left + leftRect.width / 2
      const leftY = leftRect.bottom - containerRect.top
      const rightX = rightRect.left - containerRect.left + rightRect.width / 2
      const rightY = rightRect.top - containerRect.top
      
      const midX = (leftX + rightX) / 2
      const midY = (leftY + rightY) / 2
      
      const d = `M ${leftX} ${leftY} Q ${midX} ${midY} ${rightX} ${rightY}`
      setPathData({ 
        d, 
        viewBox: `0 0 ${containerRect.width} ${containerRect.height}`, 
        startX: leftX, 
        startY: leftY, 
        endX: rightX, 
        endY: rightY 
      })
    } else {
      // Horizontal bezier path for desktop
      const leftX = leftRect.right - containerRect.left
      const leftY = leftRect.top - containerRect.top + leftRect.height / 2
      const rightX = rightRect.left - containerRect.left
      const rightY = rightRect.top - containerRect.top + rightRect.height / 2
      
      const controlX1 = leftX + (rightX - leftX) * 0.5
      const controlY1 = leftY - 40
      const controlX2 = leftX + (rightX - leftX) * 0.5
      const controlY2 = rightY + 40
      
      const d = `M ${leftX} ${leftY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${rightX} ${rightY}`
      setPathData({ 
        d, 
        viewBox: `0 0 ${containerRect.width} ${containerRect.height}`, 
        startX: leftX, 
        startY: leftY, 
        endX: rightX, 
        endY: rightY 
      })
    }
  }, [])

  const throttledCalculatePath = useMemo(
    () => throttle(calculatePath, RESIZE_DEBOUNCE_MS),
    [calculatePath]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleReducedMotionChange)
    
    // Initial calculation
    calculatePath()
    
    const resizeObserver = new ResizeObserver(throttledCalculatePath)
    const parentElement = leftFrameRef.current?.parentElement
    
    if (parentElement) {
      resizeObserver.observe(parentElement)
    }
    
    window.addEventListener('resize', throttledCalculatePath, { passive: true })
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
      resizeObserver.disconnect()
      window.removeEventListener('resize', throttledCalculatePath)
    }
  }, [calculatePath, throttledCalculatePath])

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-48">
        {/* Left: Code Frame */}
        <div
          ref={leftFrameRef}
          className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-700 shadow-lg focus-within:ring-2 focus-within:ring-gray-400/50 focus-within:ring-offset-2 focus-within:ring-offset-black transition-all duration-300 hover:shadow-xl"
          tabIndex={0}
        >
          <div className="aspect-[3/2] relative w-full h-full">
            <div className="absolute inset-0">
              <CodeBlock
                language="ts"
                filename=""
                tabs={[
                  {
                    name: "KPI Calculation",
                    code: `// KPI calculation logic

const costChange = prevCost > 0 ? ((totalCost - prevCost) / prevCost) * 100 : 0;

const kpis: KPIMetric[] = [
  { label: 'Total Cost', value: totalCost, change: costChange, format: 'currency' },
  { label: 'Tokens Used', value: totalTokens, format: 'number' },
];`,
                    language: "ts"
                  }
                ]}
                editable={false}
              />
            </div>
          </div>
        </div>

        {/* Right: Device Frame */}
        <div
          ref={rightFrameRef}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-700/30 shadow-lg focus-within:ring-2 focus-within:ring-gray-400/50 focus-within:ring-offset-2 focus-within:ring-offset-black transition-all duration-300 hover:shadow-xl"
          style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
          tabIndex={0}
        >
          <div className="aspect-[3/2] relative p-2">
            <Image
              src={ASSETS.images.total}
              alt="LLM card rendering total cost insight"
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
              quality={90}
            />
          </div>
         
        </div>
      </div>

      {/* SVG Connection Path */}
      {pathData && (
        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none z-10"
          viewBox={pathData.viewBox}
          preserveAspectRatio="none"
          role="img"
          aria-label="Data flow from KPI code to LLM insight"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={pathData.d}
            fill="none"
            stroke="rgb(156, 163, 175)"
            strokeWidth="2"
            strokeDasharray="8 4"
            strokeLinecap="round"
            className={reducedMotion ? '' : 'animate-dash'}
            style={
              reducedMotion
                ? {}
                : {
                    filter: 'drop-shadow(0 0 4px rgba(156, 163, 175, 0.3))',
                  }
            }
          />
          {/* Connection Nodes */}
          <circle
            cx={pathData.startX}
            cy={pathData.startY}
            r="4"
            fill="rgb(156, 163, 175)"
            className="group-hover:opacity-100 transition-opacity"
            style={{ filter: 'drop-shadow(0 0 6px rgba(156, 163, 175, 0.5))' }}
          />
          <circle
            cx={pathData.endX}
            cy={pathData.endY}
            r="4"
            fill="rgb(156, 163, 175)"
            className="group-hover:opacity-100 transition-opacity"
            style={{ filter: 'drop-shadow(0 0 6px rgba(156, 163, 175, 0.5))' }}
          />
        </svg>
      )}

    </div>
  )
})

export default function Page() {
  useScrollToTopOnNavigation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideoModal = useCallback((videoSrc: string) => {
    setVideoModalSrc(videoSrc);
    setIsVideoModalOpen(true);
  }, []);

  const handleCloseVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    setVideoModalSrc(null);
  }, []);

  return (
    <>
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-20 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        {BackIcon}
        <span className="text-white font-medium">back</span>
      </Link>

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center">
                KEYCHAIN SaaS Dashboard
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto pb-6 text-center">
                An advanced SaaS dashboard solution designed for modern business applications. Features innovative workspace management, secure authentication systems, and comprehensive analytics.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                <VideoPlayer
                  src={ASSETS.videos.fullHero}
                  className="w-full"
                  onOpenModal={handleOpenVideoModal}
                />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-base bg-[#171717] text-gray-400 rounded-2xl p-4">
                <li><span className="font-medium text-gray-300">Role:</span> Product Designer & Frontend Engineer</li>
                <li className="hidden sm:inline text-gray-600">•</li>
                <li><span className="font-medium text-gray-300">Timeline:</span> 2025</li>
                <li className="hidden sm:inline text-gray-600">•</li>
                <li><span className="font-medium text-gray-300">Platform:</span> Web · SaaS Dashboard</li>
                <li className="hidden sm:inline text-gray-600">•</li>
                <li><span className="font-medium text-gray-300">Stack:</span> Next.js, React, TypeScript, Tailwind CSS, Framer Motion</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 01. Overview */}
        <section className="px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="01" title="Overview" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="KEYCHAIN is a powerful tool that enables companies using **AI models** to track **cumulative costs** of their models and gain insights into **model usage**. Built with cutting-edge design principles and scalability in mind, it provides comprehensive analytics and cost monitoring for enterprise-level AI operations." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                <Image
                  src={ASSETS.images.overview}
                  alt="KEYCHAIN Overview"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="w-full h-auto"
                  loading="lazy"
                  quality={90}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 03. Intelligence in action */}
        <section className="relative py-32 bg-[#0c0c0c]">
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16">
              <SectionHeader eyebrow="03" title="Intelligence in action" />
              <Reveal>
                <div className="max-w-4xl mx-auto mb-12 text-neutral-200">
                  <MarkdownText text="KEYCHAIN integrates **advanced AI capabilities** to enhance productivity and decision-making. The AI panel provides intelligent insights, automated workflows, and predictive analytics to help teams work smarter." />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="space-y-24">
                  {/* First Row: Models Video + Text */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                    <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] lg:-ml-12">
                      <VideoPlayer
                        src={ASSETS.videos.models}
                        className="w-full h-full object-cover"
                        onOpenModal={handleOpenVideoModal}
                      />
                    </div>
                    <div className="text-neutral-200">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                        Scalable Architecture
                      </h3>
                      <p className="text-xl leading-[1.7] mb-6">
                        Built for <strong className="text-white">scalability and performance</strong>. Advanced data models support complex business logic.
                      </p>
                      <button
                        onClick={() => handleOpenVideoModal(ASSETS.videos.models)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                        aria-label="Open video"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Open Video</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Second Row: Text + AI Video */}
                  <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
                    <div className="text-neutral-200 order-2 lg:order-1">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                        AI-Powered Intelligence
                      </h3>
                      <p className="text-xl leading-[1.7] mb-6">
                        <strong className="text-white">Advanced AI capabilities</strong> that enhance productivity with intelligent insights and automated workflows.
                      </p>
                      <button
                        onClick={() => handleOpenVideoModal(ASSETS.videos.ai)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                        aria-label="Open video"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Open Video</span>
                      </button>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] order-1 lg:order-2 lg:-mr-12">
                      <VideoPlayer
                        src={ASSETS.videos.ai}
                        className="w-full h-full object-cover"
                        onOpenModal={handleOpenVideoModal}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 04. Data delivery and integration */}
        <section className="px-6 py-16 bg-black" aria-labelledby="data-integration-title">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="04" title="Data delivery and integration" id="data-integration-title" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-gray-300 leading-relaxed text-lg sm:text-xl text-center">
                  We transform raw KPI metrics into structured context the LLM can reason about—so it can explain the numbers and recommend next steps.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <DataFlowVisualization />
            </Reveal>
          </div>
        </section>

        {/* 05. Key Components */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="05" title="Key Components" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="The dashboard provides intuitive workspace management capabilities, allowing teams to organize their work efficiently. Features include customizable layouts, team collaboration tools, and seamless integration with existing business workflows." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto">
                {/* Desktop/Laptop frame */}
                <div className="relative mx-auto rounded-2xl overflow-hidden border border-gray-700 shadow-lg bg-gray-900">
                  {/* Browser chrome */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 mx-4 bg-gray-700/50 rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center">
                      keychain.app/dashboard
                    </div>
                  </div>
                  {/* Screen area */}
                  <div className="relative w-full bg-black">
                    <Image
                      src={ASSETS.images.components}
                      alt="Key Components Dashboard"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                      loading="lazy"
                      quality={90}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing Section */}
        <section className="px-6 py-32 bg-[#0c0c0c]">
          <div className="max-w-5xl mx-auto">
            <Reveal delay={120}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center mb-16">
               Keychain benefits in TLDR:
              </h3>
            </Reveal>
            <Reveal delay={180}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl border border-white/5"></div>
                <ul className="relative space-y-8 p-8 sm:p-12 lg:p-16">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start gap-6 group"
                  >
                    <AnimatedCheckmark delay={0.4} />
                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed flex-1 pt-1 group-hover:text-white transition-colors duration-200">
                      A single place to track spend across providers.
                    </p>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start gap-6 group"
                  >
                    <AnimatedCheckmark delay={0.6} />
                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed flex-1 pt-1 group-hover:text-white transition-colors duration-200">
                      AI-generated explanations for unusual spikes.
                    </p>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-start gap-6 group"
                  >
                    <AnimatedCheckmark delay={0.8} />
                    <p className="text-gray-300 text-lg sm:text-xl leading-relaxed flex-1 pt-1 group-hover:text-white transition-colors duration-200">
                      Clear KPIs to decide which models to optimize, downgrade, or remove.
                    </p>
                  </motion.li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Next Project Button */}
        <div className="pb-12">
          <NextProjectButton
            nextProjectPath="/projects/clara"
            nextProjectTitle="Clara AI"
            nextProjectDescription="The Social Manager That Talks Back — A 24/7 AI-powered social media manager."
            className="bg-black"
          />
        </div>
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        videoSrc={videoModalSrc}
        onClose={handleCloseVideoModal}
      />
    </>
  )
}

