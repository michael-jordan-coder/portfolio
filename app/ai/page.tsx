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

function Placeholder({
  label = 'Placeholder',
  className = '',
  children,
}: {
  label?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={`relative rounded-xl border border-dashed border-gray-300 bg-gray-50/60 text-gray-500 ${className}`}
      aria-label={label}
      role="img"
    >
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="text-sm font-medium opacity-80">{label}</span>
      </div>
      {children}
    </div>
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
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200" />
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

        {/* 3) Objectives */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Objectives" title="What success looks like" />
            <ol className="grid md:grid-cols-3 gap-6">
              {['Privacy-first conversational assistant.', 'Native inline tools & command palette.', 'Proactive, transparent guidance with logs.'].map((item, i) => (
                <Reveal key={i} delay={i * 90}>
                  <li className="group rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{i + 1}.</div>
                    <p className="text-gray-700 leading-relaxed">
                      <span className="bg-gradient-to-r from-transparent to-transparent bg-no-repeat [background-size:0_2px] [background-position:0_100%] group-hover:[background-size:100%_2px] transition-[background-size] duration-300" style={{ backgroundImage: `linear-gradient(${ACCENT}, ${ACCENT})` }}>
                        {item}
                      </span>
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Product Goals (from PRD) */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Product Goals" title="Why this matters" />
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Increase productivity: automate summarizing, writing, tagging, and replies.',
                'Reduce learning curve: guide new users to build first workflows quickly.',
                'Enhance UX: save time, fewer clicks, more intuitive flows.',
                'Boost engagement: keep workspaces clean, current, and active.',
                'Simplify workflow creation: forms, groups, automations, templates via natural language.',
                'Provide contextual support: answer "how do I..." without leaving flow.',
                'Tuqqi as a knowledge hub: summarize, connect, and surface linked items.',
              ].map((g, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="rounded-2xl border border-gray-200 p-5 bg-white flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                    <div className="text-gray-800 leading-relaxed">{g}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation & Access to AI */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Navigation" title="Access patterns for AI chat" description="Multiple entry points; consistent requirements across implementations." />
            <div className="grid md:grid-cols-3 gap-6">
              {['Command palette', 'Inline in context', 'Floating assistant'].map((t, i) => (
                <Reveal key={t} delay={i * 70}>
                  <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                    <div className="text-gray-900 font-semibold mb-2">{t}</div>
                    <p className="text-gray-600 text-sm">Same constraints: privacy, history, logging, actions — regardless of entry point.</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Chat History Requirements */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Chat History" title="Privacy and control by design" />
            <Reveal>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <ul className="space-y-3 text-gray-700">
                    <li>• Each user sees only their history; no admin access to others.</li>
                    <li>• Organized by date for quick navigation.</li>
                    <li>• New session created automatically per login.</li>
                    <li>• Users can delete single chats or the entire history.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-sm text-gray-600">Interaction controls</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['New chat', 'Delete chat', 'Delete all'].map((c) => (
                      <button key={c} className="px-3 py-1.5 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100">{c}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Chat Interactions & Post-Chat Actions */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Chat Interactions" title="Transparency, control, and actionability" />
            <Reveal>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-gray-900 font-semibold mb-3">Real-time steps + history</div>
                  <div className="space-y-2 text-gray-700">
                    <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">Researching: Customer groups where Country = "Israel"…</div>
                    <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">Analyzing data…</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {['👍 Like', '👎 Dislike', 'Show steps', 'Retry'].map((b) => (
                      <button key={b} className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white hover:bg-gray-50">{b}</button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <div className="text-gray-900 font-semibold mb-3">Post-chat actions</div>
                  <p className="text-gray-700">Trigger actions directly from the conversation — create items, launch workflows, or update metadata without switching tabs.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Create item', 'Add label', 'Assign', 'Start workflow'].map((c) => (
                      <button key={c} className="px-3 py-1.5 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100">{c}</button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4) Research & Insights */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Research & Insights" title="What we learned" />
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Quotes */}
              <Reveal>
                <div className="space-y-4">
                  {[
                    '“I want AI to help me summarize threads, not replace my judgment.”',
                    '“Natural language task creation would save me minutes every hour.”',
                    '“I need to understand what AI did and why.”',
                  ].map((q, i) => (
                    <div key={i} className="max-w-md rounded-2xl p-4 shadow-sm border border-gray-200 bg-white">
                      <div className="text-gray-700 leading-relaxed">{q}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
              {/* Right: Benchmarks */}
              <Reveal delay={120}>
                <div className="relative rounded-2xl border border-gray-200 p-4 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="relative h-28 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gray-200 blur-sm" />
                        <div className="absolute inset-0 rounded-xl" style={{ boxShadow: `0 0 0 2px ${ACCENT}` }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600">Competitive landscape with AI emphasis</div>
                </div>
              </Reveal>
            </div>
            {/* Horizontal competitor gallery */}
            <Reveal delay={200}>
              <div className="mt-8 overflow-x-auto">
                <div className="flex gap-4 min-w-max pr-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-64 h-36 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors shrink-0" />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5) Design Approach */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-12">
            <SectionHeader eyebrow="Design Approach" title="Interaction model and visual language" />
            <Reveal>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Interaction Model</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  {['Inline actions', 'Command palette', 'Proactive notifications'].map((label, i) => (
                    <div key={label} className="relative rounded-xl border border-gray-200 p-5">
                      <div className="h-24 rounded-lg bg-gray-100 mb-3" />
                      <div className="text-gray-800 font-medium">{label}</div>
                      {i < 2 && (
                        <svg className="hidden md:block absolute top-1/2 right-[-18px] -translate-y-1/2" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 6H34M34 6L28 1M34 6L28 11" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Visual Language</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex gap-3">
                      {[ACCENT, '#111827', '#6B7280', '#E5E7EB', '#F9FAFB'].map((c) => (
                        <div key={c} className="w-14 h-14 rounded-xl border border-gray-200" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Color palette for AI touch-points</div>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      {['✨', '⚡', '💬', '🔍'].map((ico) => (
                        <div key={ico} className="w-12 h-12 grid place-items-center rounded-lg border border-gray-200 bg-gray-50 text-xl">{ico}</div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Iconography accents for AI interactions</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6) Key Decisions */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Key UX/UI Decisions" title="Rationale and impact" />
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      {['Decision', 'Reasoning', 'Impact'].map((h) => (
                        <th key={h} className="px-5 py-3 text-sm font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {[
                      ['Privacy-scoped chat history', 'User-only visibility; aligns with trust & compliance.', 'Higher trust; reduced friction to adopt'],
                      ['Real-time + historical step logs', 'Explainability of AI behavior.', 'Improved confidence and controllability'],
                      ['Retry + Feedback controls', 'Close the loop for quality and learning.', 'Better responses over time'],
                      ['Context-aware answers with CTA to switch', 'Avoids wrong-context answers.', 'Accuracy and clarity in workflows'],
                      ['Permission checks + audit trail', 'User authority preserved; “via AI” tracking.', 'Security with clear accountability'],
                      ['Explicit confirmation for dangerous acts', 'Prevents destructive mistakes.', 'Safer operations across orgs'],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 ? 'bg-white' : 'bg-gray-50/50'}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-5 py-4 align-top group relative">
                            <span className="group-hover:underline decoration-[1.5px] underline-offset-4" style={{ textDecorationColor: ACCENT }}>{cell}</span>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-10 rounded-lg border border-gray-200 bg-gray-100" />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* AI Abilities */}
        <section className="px-6 py-16 bg-gray-50">
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

        {/* Considerations & Safeguards */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Considerations" title="Trust, permissions, and clarity" />
            <div className="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {[
                      'While processing, narrate steps in natural language.',
                      'Final response includes: 👍 / 👎 / Show steps / Retry.',
                      'Copy response button appears on hover.',
                      'Clearly indicate current context; propose switching when needed.',
                      'Adapt suggestions to screen context.',
                      'Tabular outputs can be copied or downloaded (Excel/CSV).',
                      'All actions require user confirmation; follow-up suggestions offered.',
                    ].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {[
                      'Permission checks always enforced; AI cannot bypass user roles.',
                      'Knowledge and memory scoped per org and ideally per user.',
                      'Access to Help Center for Tuqqi how-to answers.',
                      'Audit trail: actions recorded as “{userName} via AI”.',
                    ].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <div className="text-gray-900 font-semibold mb-2">Dangerous actions: explicit confirmation</div>
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                      <div>Deleting a group is permanent. To confirm, type exactly:</div>
                      <div className="mt-2 font-semibold">“Yes, delete group Marketing Assets”</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Example Use Cases */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Example Use Cases" title="End-to-end flows" />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  t: 'Create an item + label',
                  d: ['Draft item with fields/dates/files', 'If label missing, propose creating it', 'Confirm scope then create and assign label'],
                },
                {
                  t: 'Create form, group, external link',
                  d: ['Draft form schema and review', 'Create group with views/permissions', 'Generate external link to collect responses'],
                },
                {
                  t: 'Analytics & answers',
                  d: ['Count completed items by user/date', 'Switch to correct group context', 'Provide breakdown with follow-ups'],
                },
              ].map((c, i) => (
                <Reveal key={c.t} delay={i * 100}>
                  <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                    <div className="text-gray-900 font-semibold mb-2">{c.t}</div>
                    <ul className="text-gray-700 text-sm space-y-2">
                      {c.d.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7) Final Screens */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-[100vw] overflow-x-hidden">
            <SectionHeader eyebrow="Final Screens" title="Polished UI moments" />
            <div className="relative max-w-6xl mx-auto">
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[720px]">
                    <Reveal>
                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="h-[420px] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200" />
                        <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">Outcome: clearer intent, faster completion</div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8) Outcome & Metrics */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Outcome & Metrics" title="Measurable results" />
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
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Closing Visual" title="Before and after" />
            <Reveal>
              <DraggableBeforeAfter />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}



