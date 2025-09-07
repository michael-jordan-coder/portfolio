'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useScrollRestoration } from '@/lib/utils'

// Accent brand color for AI sections (Tuqqi touch)
const ACCENT = '#3b82f6' // Tailwind blue-500

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
      <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">{title}</h3>
      {description ? (
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
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
        style={{ background: `conic-gradient(${ACCENT} ${clamped * 3.6}deg, #e5e7eb 0deg)` }}
        aria-label={`${label} ${clamped}%`}
        role="img"
      >
        <div className="absolute inset-2 rounded-full bg-white" />
        <div className="relative text-xl font-semibold text-gray-900">{clamped}%</div>
      </div>
      <div className="mt-2 text-sm text-gray-600">{label}</div>
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
        className="absolute top-0 h-full shadow-lg"
        style={{ left: `${pos}%`, width: 3, backgroundColor: ACCENT, transform: `translateX(-1.5px)` }}
        onMouseDown={onDown}
        aria-hidden
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center rounded-full shadow-lg border-2"
        style={{ left: `${pos}%`, width: 48, height: 48, backgroundColor: ACCENT, borderColor: ACCENT }}
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
  useScrollRestoration()

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-40">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-gray-800/90 text-white font-semibold shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 backdrop-blur-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </nav>

      <main className="min-h-screen bg-white">
        {/* 1) Hero */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">Tuqqi × AI — Case Study</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl">Integrating a privacy-first, contextual AI assistant that accelerates work, reduces learning curves, and keeps workspaces clean and active — aligned to the Tuqqi AI PRD.</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 relative rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
                  <img 
                    src="/ai/ai.svg" 
                    alt="AI Assistant Interface" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 animate-[fadeUp_1.2s_ease_0.2s_both]" style={{ pointerEvents: 'none' }} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2) Context */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Context" title="About, Challenge, Role" description="A concise snapshot that frames the initiative." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ t: 'About Tuqqi', d: 'Work management platform helping teams collaborate and execute.' }, { t: 'The Challenge', d: 'Introduce AI that feels native, trustworthy, and genuinely helpful.' }, { t: 'My Role', d: 'End-to-end product design: research, UX/UI, prototyping, and validation.' }].map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <div className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}1a`, color: ACCENT }}> 
                      <span className="text-lg">{i === 0 ? '🏢' : i === 1 ? '🧩' : '✍️'}</span>
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

        {/* 4) Visual Language Examples */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader eyebrow="Visual Language Examples" title="Design system in action" />
            <Reveal>
                              <div className="grid md:grid-cols-3 gap-8">
                  {/* Chat Interface */}
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 flex flex-col">
                    <div className="mb-4 flex-shrink-0 bg-white rounded-lg w-full h-32 flex items-center justify-center">
                      <img src="/ai/Chat.svg" alt="Chat Interface Design" className="w-full h-full object-contain p-3" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Chat Interface</h4>
                      <p className="text-sm text-gray-600">Clean, conversational design with clear visual hierarchy and intuitive interaction patterns.</p>
                    </div>
                  </div>
                  
                  {/* Chat Bubbles */}
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 flex flex-col">
                    <div className="mb-4 flex-shrink-0 bg-white rounded-lg w-full h-32 flex items-center justify-center">
                      <img src="/ai/chats.svg" alt="Chat Bubbles Design" className="w-full h-full object-contain p-3" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Chat Bubbles</h4>
                      <p className="text-sm text-gray-600">Conversation bubbles with clear visual hierarchy and intuitive message flow.</p>
                    </div>
                  </div>
                  
                  {/* Profile Selection */}
                  <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50 flex flex-col">
                    <div className="mb-4 flex-shrink-0 bg-white rounded-lg w-full h-32 flex items-center justify-center">
                      <img src="/ai/comp.svg" alt="Profile Selection Design" className="w-full h-full object-contain p-3" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Profile Selection</h4>
                      <p className="text-sm text-gray-600">User profile interface with role-based access and personalized settings.</p>
                    </div>
                  </div>
                </div>
            </Reveal>
            
            <Reveal delay={120}>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Design System Elements</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex gap-3">
                      {['#8A38F5', '#CCB7E6', '#6B7280', '#E5E7EB', '#F9FAFB'].map((c) => (
                        <div key={c} className="w-14 h-14 rounded-xl border border-gray-200" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Color palette for AI touch-points</div>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      {['/ai/item.svg', '/ai/link.svg', '/ai/table.svg'].map((src, i) => (
                        <div key={src} className="w-12 h-12 grid place-items-center rounded-lg border border-gray-200 bg-gray-50">
                          <img src={src} alt={`AI interaction icon ${i + 1}`} className="w-full h-full object-contain p-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Iconography accents for AI interactions</div>
                  </div>
                </div>
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
                  <img src="/ai/Flowchart.svg" alt="AI User Flow Diagram" className="w-full h-auto rounded-lg" />
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

        {/* 6) AI Abilities */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="AI Abilities" title="What the assistant can do" />
            <div className="grid md:grid-cols-3 gap-6">
              {/* Create */}
              <Reveal>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-gray-900 font-semibold mb-2">Create</div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {['Create/edit items & fields', 'Add comments & checklists', 'Complete checklist tasks', 'Attach files to items/tasks', 'Edit metadata (status, groups, labels, dates, assignees, watchers)'].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {/* Ask / Analyze */}
              <Reveal delay={100}>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-gray-900 font-semibold mb-2">Ask / Analyze</div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {['Queries with metadata (dates, tags, assignees, rating, watchers)', 'Queries on field values', 'Comments & activity insights', 'Checklists and linked items', 'File data extraction & OCR'].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {/* Build */}
              <Reveal delay={180}>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-gray-900 font-semibold mb-2">Build</div>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    {['Create/edit/delete forms', 'Create/edit/delete groups (views, permissions, members, allowed forms)', 'Create automations (excl. integrations)', 'Create external links'].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7) Final Screens */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[100vw] overflow-x-hidden">
            <SectionHeader eyebrow="Final Screens" title="Polished UI moments" />
            <div className="relative max-w-6xl mx-auto">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
                {[0, 1].map((i) => (
                  <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[720px]">
                    <Reveal>
                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="h-[420px] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
                          {i === 0 && (
                            <img 
                              src="/ai/Frame.svg" 
                              alt="AI Assistant Interface Frame" 
                              className="w-auto h-auto max-w-full max-h-full object-contain"
                            />
                          )}
                          {i === 1 && (
                            <img 
                              src="/ai/tablecopy.svg" 
                              alt="AI Table Interface" 
                              className="w-auto h-auto max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">Outcome: clearer intent, faster completion</div>
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
      </main>
    </>
  )
}