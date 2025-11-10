'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useScrollToTopOnNavigation } from '../../../lib/utils'
import NextProjectButton from '../../../components/NextProjectButton'

// Asset configuration
const ASSETS = {
  images: {
    overview: '/keychain/overview.png',
    models: '/keychain/models.png',
    aiPanel: '/keychain/ai-panel.png',
    section3: '/keychain/section-3.svg',
    card: '/keychain/card.svg',
    code: '/keychain/code.svg',
    tablist: '/keychain/Tablist.svg',
    alex: '/keychain/alex.svg',
    jonathan: '/keychain/jonathan.svg',
  },
  videos: {
    fullHero: '/keychain/full-hero.mp4',
    ai: '/keychain/ai.mp4',
    models: '/keychain/models.mov',
  },
} as const

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <header className={align === 'center' ? 'text-center mb-12' : 'mb-8'}>
      {eyebrow ? (
        <span className="inline-block bg-black border border-gray-700 text-gray-300 text-xs tracking-wide uppercase px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">{title}</h3>
      {description ? (
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      ) : null}
    </header>
  )
}

function useInView(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])
  return { ref, inView }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
}

function VideoPlayer({ src, poster, className = '' }: { src: string; poster?: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error)
      })
    }

    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

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
      onClick={() => {
        const video = videoRef.current
        if (video) {
          if (video.paused) {
            video.play()
          } else {
            video.pause()
          }
        }
      }}
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/quicktime" />
      Your browser does not support the video tag.
    </video>
  )
}

function MarkdownText({ text }: { text: string }) {
  const regex = /(\*\*.*?\*\*)/g
  const parts = text.split(regex)
  return (
    <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export default function Page() {
  useScrollToTopOnNavigation();

  return (
    <>
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>

      <main className="min-h-screen bg-black">
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
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 01. Overview */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="01" title="Overview" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="KEYCHAIN is an **advanced SaaS dashboard** solution designed for modern business applications. Built with cutting-edge design principles and scalability in mind, it features innovative workspace management, secure authentication systems, and comprehensive analytics for enterprise-level SaaS products." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                <Image
                  src={ASSETS.images.overview}
                  alt="KEYCHAIN Overview"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02. Workspace Management */}
        <section className="px-6 py-16 bg-black">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="02" title="Key Components" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="The dashboard provides intuitive workspace management capabilities, allowing teams to organize their work efficiently. Features include customizable layouts, team collaboration tools, and seamless integration with existing business workflows." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden  shadow-sm">
                  <Image
                    src={ASSETS.images.card}
                    alt="Workspace Card"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden  shadow-sm">
                  <Image
                    src={ASSETS.images.tablist}
                    alt="Tab List Interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 03. AI-Powered Features */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="03" title="AI-Powered Features" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="KEYCHAIN integrates **advanced AI capabilities** to enhance productivity and decision-making. The AI panel provides intelligent insights, automated workflows, and predictive analytics to help teams work smarter." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-20 max-w-7xl mx-auto mt-16">
                {/* First Row: Models Video + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center">
                  <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                    <VideoPlayer
                      src={ASSETS.videos.models}
                      className="w-full"
                    />
                  </div>
                  <div className="text-gray-300">
                    <p className="text-xl leading-relaxed">
                      Built for <strong className="text-white">scalability and performance</strong>. Advanced data models support complex business logic.
                    </p>
                  </div>
                </div>
                
                {/* Second Row: Text + AI Video */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
                  <div className="text-gray-300 lg:order-1 order-2">
                    <p className="text-xl leading-relaxed">
                      <strong className="text-white">Advanced AI capabilities</strong> that enhance productivity with intelligent insights and automated workflows.
                    </p>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm lg:order-2 order-1">
                    <VideoPlayer
                      src={ASSETS.videos.ai}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 04. Design System & Components */}
        <section className="px-6 py-16 bg-black">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="04" title="Design System & Components" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="Built with a **comprehensive design system** that ensures consistency and scalability. The component library includes reusable UI elements, custom icons, and carefully crafted interactions that create a cohesive user experience." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.code}
                    alt="Code Components"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.section3}
                    alt="Section 3 Design"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 05. Models & Architecture */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeader eyebrow="05" title="Models & Architecture" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="The dashboard architecture is built for **scalability and performance**. Advanced data models support complex business logic while maintaining clean, maintainable code structure." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.models}
                    alt="Data Models"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <VideoPlayer
                    src={ASSETS.videos.models}
                    className="w-full"
                  />
                </div>
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
      </main>
    </>
  )
}

