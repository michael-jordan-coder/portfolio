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
    header: '/clara/clara-header.png',
    hero: '/clara/hero-light.png',
    new: '/clara/clara-new.png',
    old: '/clara/clara-old.png',
    ctaNew: '/clara/cta-new.png',
    ctaOld: '/clara/cta-old.png',
    createPostOld: '/clara/create-post-old.png',
    createPost2Old: '/clara/create-post-2-old.png',
    postNew: '/clara/clara-post-new.png',
    flowFigma: '/clara/flow-figma.svg',
  },
  videos: {
    createPostPhone: '/clara/create-post-phone.mp4',
    postCreation: '/clara/post-creation.mp4',
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
      Your browser does not support the video tag.
    </video>
  )
}

function MarkdownText({ text }: { text: string }) {
  const regex = /(\*\*.*?\*\*)/g
  const parts = text.split(regex)
  return (
    <p className="text-gray-300 leading-relaxed text-base sm:text-lg text-center">
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
          <div className="max-w-[80rem] mx-auto">
            <Reveal>
              <h1 className="text-3xl sm:text-3xl xl:text-5xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-center">
                Increase sign ups by 23% by a new conversational interface
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto pb-6 text-center">
                Clara AI is a 24/7 AI-powered social media manager built to help creators and businesses plan, design, and publish content effortlessly.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                <Image
                  src={ASSETS.images.header}
                  alt="Clara AI Header"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 01. Context */}
        <section className="px-6 py-32">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="01" title="Context" />
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <MarkdownText text="Clara AI is a **24/7 AI-powered** social media manager built to help creators and businesses **plan, design, and publish** content effortlessly.

The product blends **AI generation** with real **human-like conversation** — turning everyday content creation into a **creative dialogue**." />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02. The Challenge */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="02" title="The Challenge" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text={'The first version of Clara worked — but **it didn\'t feel right**.\n\nUsers had to type captions, upload images, click "generate," and wait.\n\nThe process was **functional**, yet completely **detached** from the real rhythm of how people create content together.\n\nSocial media management is, at its core, a **conversation** — not a form.\n\nAnd Clara **wasn\'t speaking that language** yet.'} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.old}
                    alt="Clara old interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.createPost2Old}
                    alt="Create post old interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.createPostOld}
                    alt="Create post old interface 2"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.ctaOld}
                    alt="CTA old interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 03. The Insight */}
        <section className="px-6 py-32">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="03" title="The Insight" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text={'Real creators don\'t think in **inputs and outputs** — they think in **ideas**.\n\nThey say things like "make this feel more playful" or "try a darker tone."\n\nSo instead of forcing users into rigid fields, I wanted to design a space that **listens, understands, and responds**.\n\nThe insight: make AI creation feel as natural as **texting your social media manager on WhatsApp**.'} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-2xl p-8 md:p-12 border border-gray-700/50">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold text-red-500 mb-4">
                      5%
                    </div>
                    <div className="text-xl md:text-2xl font-semibold text-gray-300 mb-2">
                      sign ups after trying the free demo
                    </div>
                    <div className="text-gray-400">
                      Users leaving site after trying the free demo
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 04. The Shift */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="04" title="The Shift" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 text-center">WEB-FIRST → MOBILE-FIRST</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2 text-center">The Challenge</h5>
                        <MarkdownText text="Instead of shrinking a desktop experience, we redesigned Clara's flow **from the ground up** for mobile." />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2 text-center">The Approach</h5>
                        <MarkdownText text="We built **mobile-first**, then seamlessly adapted it for web — **intelligently**." />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2 text-center">The Result</h5>
                        <MarkdownText text="An **intuitive** experience everywhere. A **strategic shift**, not just responsive design." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                <div
                  className="w-full"
                  style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    src="https://embed.figma.com/board/gxkAoRUvulZxWTJOt1S4OC/ClaraAI-%E2%80%93-Instagram-Post-Creation-Flow?node-id=0-1&embed-host=share"
                    allowFullScreen
                    title="Clara AI Instagram Post Creation Flow"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Live Preview */}
        <section className="px-6 py-32">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="Live Preview" title="Try the conversational interface yourself" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="Experience how Clara transforms ideas into fully-designed social posts through natural conversation." />
              </div>
            </Reveal>
            {/* Live Demo Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="font-semibold text-sm uppercase tracking-wide">Live Interactive Demo</span>
                <span className="text-xs">— Click to interact</span>
              </div>
            </div>
            <div className="relative mx-auto mb-12 flex justify-center">
              {/* iPhone 16 frame (no selfie camera) */}
              <div className="relative w-[340px] max-w-full aspect-[9/19.5] rounded-[2.6rem] border-[7px] border-[#0e0e0e] bg-black shadow-[0_0_35px_rgba(0,0,0,0.6)] overflow-hidden">
                
                {/* Power + Volume buttons (visual only) */}
                <div className="absolute top-20 -left-1 w-1 h-14 bg-gray-700 rounded-r-full"></div>
                <div className="absolute top-[168px] -left-1 w-1 h-9 bg-gray-700 rounded-r-full"></div>
                <div className="absolute top-28 -right-1 w-1 h-[72px] bg-gray-700 rounded-l-full"></div>

                {/* Screen area */}
                <div className="absolute inset-[7px] bg-black rounded-[2.2rem] overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    style={{
                      border: 'none',
                      borderRadius: '2rem',
                    }}
                    src="https://money-home-80432019.figma.site/"
                    allowFullScreen
                    title="Clara AI Interactive Demo"
                  />
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* 05. Responsive for Web as Well */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="05" title="Responsive for Web as Well" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="The interface is fully responsive and works seamlessly across all devices, ensuring a consistent experience whether you're on desktop, tablet, or mobile." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto mb-12">
                {/* Live Demo Badge */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="font-semibold text-sm uppercase tracking-wide">Live Interactive Demo</span>
                    <span className="text-xs">—try "create post" and send</span>
                  </div>
                </div>
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
                      https://money-home-80432019.figma.site/
                    </div>
                  </div>
                  {/* Screen area */}
                  <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '640px' }}>
                    <iframe
                      className="w-full h-full absolute inset-0"
                      style={{
                        border: 'none',
                      }}
                      src="https://money-home-80432019.figma.site/"
                      allowFullScreen
                      title="Clara AI Interactive Demo - Web"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <VideoPlayer
                    src={ASSETS.videos.postCreation}
                    className="w-full"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-sm">
                  <Image
                    src={ASSETS.images.postNew}
                    alt="Clara post creation new interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 06. The Impact */}
        <section className="px-6 py-32">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="06" title="The Impact" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="Since launching the conversational experience, **engagement and retention** have grown dramatically:

+37% completion rate — more users finish their posts

This metric reflects a significant improvement in user engagement, showing that the conversational interface made content creation more intuitive and enjoyable. Users are now more likely to complete their social media posts from start to finish, reducing abandoned drafts and increasing overall productivity.

A conversational experience didn't just make Clara friendlier — it made **the business stronger**." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-2xl p-8 md:p-12 border border-gray-700/50">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold text-green-500 mb-4">
                      +23%
                    </div>
                    <div className="text-xl md:text-2xl font-semibold text-gray-300 mb-2">
                    active users sign in
                    </div>
                    <div className="text-gray-400">
                     from the first month of launch
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 07. Reflection */}
        <section className="px-6 py-32 bg-black">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="07" title="Reflection" />
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <MarkdownText text="Designing for AI means designing for **trust**.

When an interface **talks like a person**, people treat it like one — they **open up, explore, and create**.

This project reminded me that the future of AI isn't about replacing people — it's about **amplifying human creativity** through natural conversation." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 text-center font-semibold text-white">— Daniel Gur Arye</div>
            </Reveal>
          </div>
        </section>

        {/* Next Project Button */}
        <div className="pb-12">
          <NextProjectButton
            nextProjectPath="/projects/web-3d"
            nextProjectTitle="3D Hand Tracking Interface"
            nextProjectDescription="Real-time hand gesture recognition with 3D visualization using MediaPipe and WebGL."
            className="bg-black"
          />
        </div>
      </main>
    </>
  )
}

