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
        <span className="inline-block bg-gray-100 text-gray-700 text-xs tracking-wide uppercase px-3 py-1 rounded-full mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">{title}</h3>
      {description ? (
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
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
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
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

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-[90rem] mx-auto">
            <Reveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Clara AI — Case Study
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl pb-6">
                The Social Manager That Talks Back — A 24/7 AI-powered social media manager built to help creators and businesses plan, design, and publish content effortlessly.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
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
        <section className="px-6 py-16">
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
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="02" title="The Challenge" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text={'The first version of Clara worked — but **it didn\'t feel right**.\n\nUsers had to type captions, upload images, click "generate," and wait.\n\nThe process was **functional**, yet completely **detached** from the real rhythm of how people create content together.\n\nSocial media management is, at its core, a **conversation** — not a form.\n\nAnd Clara **wasn\'t speaking that language** yet.'} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={ASSETS.images.old}
                    alt="Clara old interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={ASSETS.images.createPost2Old}
                    alt="Create post old interface"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={ASSETS.images.createPostOld}
                    alt="Create post old interface 2"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
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
        <section className="px-6 py-16">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="03" title="The Insight" />
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <MarkdownText text={'Real creators don\'t think in **inputs and outputs** — they think in **ideas**.\n\nThey say things like "make this feel more playful" or "try a darker tone."\n\nSo instead of forcing users into rigid fields, I wanted to design a space that **listens, understands, and responds**.\n\nThe insight: make AI creation feel as natural as **texting your social media manager on WhatsApp**.'} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 04. The Shift */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="04" title="The Shift" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">WEB-FIRST → MOBILE-FIRST</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">The Challenge</h5>
                        <MarkdownText text="Instead of shrinking a desktop experience, we redesigned Clara's flow **from the ground up** for mobile." />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">The Approach</h5>
                        <MarkdownText text="We built **mobile-first**, then seamlessly adapted it for web — **intelligently**." />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">The Result</h5>
                        <MarkdownText text="An **intuitive** experience everywhere. A **strategic shift**, not just responsive design." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
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
                      border: '1px solid rgba(0, 0, 0, 0.1)',
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
        <section className="px-6 py-16">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="Live Preview" title="Try the conversational interface yourself" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="Experience how Clara transforms ideas into fully-designed social posts through natural conversation." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <VideoPlayer
                    src={ASSETS.videos.createPostPhone}
                    className="w-full"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={ASSETS.images.flowFigma}
                    alt="Clara flow diagram"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                <div
                  className="w-full"
                  style={{ paddingBottom: '125%', position: 'relative', height: 0 }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                    src="https://money-home-80432019.figma.site/"
                    allowFullScreen
                    title="Clara AI Interactive Demo"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 05. Responsive for Web as Well */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="05" title="Responsive for Web as Well" />
            <Reveal>
              <div className="max-w-4xl mx-auto mb-12">
                <MarkdownText text="The interface is fully responsive and works seamlessly across all devices, ensuring a consistent experience whether you're on desktop, tablet, or mobile." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <VideoPlayer
                    src={ASSETS.videos.postCreation}
                    className="w-full"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
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
        <section className="px-6 py-16">
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                      +37%
                    </div>
                    <div className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                      Completion Rate
                    </div>
                    <div className="text-gray-600">
                      More users finish their posts
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 07. Reflection */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[90rem] mx-auto">
            <SectionHeader eyebrow="07" title="Reflection" align="left" />
            <Reveal>
              <div className="max-w-4xl">
                <MarkdownText text="Designing for AI means designing for **trust**.

When an interface **talks like a person**, people treat it like one — they **open up, explore, and create**.

This project reminded me that the future of AI isn't about replacing people — it's about **amplifying human creativity** through natural conversation." />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 text-right font-semibold text-gray-900">— Daniel Gur Arye</div>
            </Reveal>
          </div>
        </section>

        {/* Next Project Button */}
        <div className="pb-12">
          <NextProjectButton
            nextProjectPath="/projects/web-3d"
            nextProjectTitle="3D Hand Tracking Interface"
            nextProjectDescription="Real-time hand gesture recognition with 3D visualization using MediaPipe and WebGL."
            className="bg-white"
          />
        </div>
      </main>
    </>
  )
}

