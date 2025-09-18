'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useScrollToTopOnNavigation } from '../../../lib/utils'
import NextProjectButton from '../../../components/NextProjectButton'

// Accent brand color for AI sections (Tuqqi touch)
const ACCENT = 'primary-500' // Using semantic color token

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

function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<T | null>(null)
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
  const { ref, inView } = useInView<HTMLDivElement>()
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

function CountUpOnView({ to, duration = 1800, className = '' }: { to: number; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const animate = (t: number) => {
      if (start === null) start = t
      const progress = Math.min(1, (t - start) / duration)
      setValue(Math.round(progress * to))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [inView, to, duration])
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}

function RadialStat({ percent, label }: { percent: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-28 h-28 rounded-full grid place-items-center"
        style={{ background: `conic-gradient(#3b82f6 ${clamped * 3.6}deg, #e5e7eb 0deg)` }}
        aria-label={`${label} ${clamped}%`}
        role="img"
      >
        <div className="absolute inset-2 rounded-full bg-white" />
        <div className="relative text-xl font-semibold text-semantic-text-primary">{clamped}%</div>
      </div>
      <div className="mt-2 text-sm text-semantic-text-secondary">{label}</div>
    </div>
  )
}

function DraggableBeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const onDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])
  const onMove = useCallback((e: MouseEvent) => {
    if (!dragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPos(pct)
  }, [dragging])
  const onUp = useCallback(() => setDragging(false), [])
  useEffect(() => {
    if (!dragging) return
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, onMove, onUp])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${dragging ? 'cursor-ew-resize' : 'cursor-pointer'} rounded-2xl border border-gray-200 bg-white`}
      onMouseDown={onDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pos}
      aria-label="Before and after comparison"
      tabIndex={0}
      style={{ height: '420px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div
        className="absolute top-0 h-full shadow-lg bg-primary-500"
        style={{ left: `${pos}%`, width: 3, transform: `translateX(-1.5px)` }}
        onMouseDown={onDown}
        aria-hidden
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center rounded-full shadow-lg border-2 bg-primary-500 border-primary-500"
        style={{ left: `${pos}%`, width: 48, height: 48 }}
        onMouseDown={onDown}
        aria-hidden
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8L22 12L18 16" />
          <path d="M6 8L2 12L6 16" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur px-2 py-1 rounded">Before</div>
      <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur px-2 py-1 rounded">After</div>
    </div>
  )
}

export default function Page() {
  useScrollToTopOnNavigation()

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
        {/* 1) Hero */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">Tuqqi Mind — Case Study</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl pb-6">Integrating a privacy-first, contextual AI assistant that accelerates work, reduces learning curves, and keeps workspaces clean and active — aligned to the Tuqqi AI PRD.</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white text-black text-md font-medium tracking-wide px-4 py-2 rounded-full border border-gray-200">
                  Try Me - Interactive Demo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="aspect-[16/9] w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                <iframe 
                  src="https://rover-symbol-10191448.figma.site/"
                  width="100%" 
                  height="100%" 
                  className="w-full h-full border-0"
                  title="Tuqqi AI Case Study - Figma Site"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2) Context */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Context" title="About, Challenge, Role" description="A concise snapshot that frames the initiative." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[{ t: 'About Tuqqi', d: 'Work management platform helping teams collaborate and execute.' }, { t: 'The Challenge', d: 'Introduce AI that feels native, trustworthy, and genuinely helpful.' }, { t: 'My Role', d: 'End-to-end product design: research, UX/UI, prototyping, and validation.' }].map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <div className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"> 
                      {i === 0 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18" />
                          <path d="M5 21V7l8-4v18" />
                          <path d="M19 21V11l-6-4" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10,9 9,9 8,9" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{b.t}</h4>
                    <p className="text-gray-600 leading-relaxed">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

          {/* 8) Outcome & Metrics */}
          <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="kpi assumptions" title="What success looks like" />
            <Reveal>
              <div className="grid sm:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    +<CountUpOnView to={35} className="[tabular-nums]" />%
                  </div>
                  <div className="mt-2 text-gray-600">Adoption</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    +<CountUpOnView to={18} className="[tabular-nums]" />%
                  </div>
                  <div className="mt-2 text-gray-600">Task speed</div>
                </div>
                <div className="flex justify-center"><RadialStat percent={72} label="Feature engagement" /></div>
              </div>
            </Reveal>
          </div>
        </section>



        {/* 5) User Flows */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="User Flows" title="AI interaction pathways" />
            <Reveal>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                  <Image src="/ai/Flowchart.svg" alt="AI User Flow Diagram" width={800} height={400} className="w-full h-auto rounded-lg" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">User Input</h4>
                    <p className="text-sm text-gray-600">Natural language queries and commands that trigger AI processing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                    <p className="text-sm text-gray-600">Context analysis, permission checks, and intelligent response generation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Action & Response</h4>
                    <p className="text-sm text-gray-600">Task execution, result delivery, and follow-up suggestions</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

       

        {/* 7) Final Screens */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[100vw] overflow-x-hidden">
            <SectionHeader eyebrow="Final Screens" title="Polished UI moments" />
            <div className="relative max-w-6xl mx-auto">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[720px]">
                    <Reveal>
                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="h-[420px] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
                          {i === 0 && (
                            <Image 
                              src="/tuqqi/chat+files.svg" 
                              alt="AI Assistant Interface Frame" 
                              width={600}
                              height={400}
                              className="w-auto h-auto max-w-full max-h-full object-contain"
                            />
                          )}
                          {i === 1 && (
                            <Image 
                              src="/tuqqi/chatbubble.svg" 
                              alt="AI Table Interface" 
                              width={600}
                              height={400}
                              className="w-auto h-auto max-w-full max-h-full object-contain"
                            />
                          )}
                          {i === 2 && (
                            <Image 
                              src="/tuqqi/send.svg" 
                              alt="AI Mind Mapping Interface" 
                              width={600}
                              height={400}
                              className="w-auto h-auto max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">
                          {i === 0 && "Outcome: clearer intent, faster completion"}
                          {i === 1 && "Outcome: improved conversation flow"}
                          {i === 2 && "Outcome: enhanced AI thinking visualization"}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 9) Reflection */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <SectionHeader eyebrow="Reflection" title="What I learned" align="left" />
            <Reveal>
              <p className="text-gray-700 leading-relaxed">
                Centering trust changed the trajectory. When AI explained its steps, usage rose naturally — not from novelty, but from confidence and clarity.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Simplicity scales. The smallest affordances — inline actions, gentle motion, consistent language — made the experience feel obvious.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 text-right font-semibold text-gray-900">— Daniel Gur Arye</div>
            </Reveal>
          </div>
        </section>

        {/* 10) Closing Visual — Before/After */}
        {/* <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Closing Visual" title="Before and after" />
            <Reveal>
              <DraggableBeforeAfter />
            </Reveal>
          </div>
        </section> */}

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