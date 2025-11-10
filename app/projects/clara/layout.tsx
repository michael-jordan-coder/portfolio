import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clara AI - Social Media Manager Case Study - Daniel Gur Arye Portfolio',
  description: 'Case study: A 24/7 AI-powered social media manager that transforms content creation into a natural conversation. Mobile-first design with conversational interface.',
  keywords: ['Clara AI', 'social media manager', 'AI design', 'conversational interface', 'mobile-first design', 'UX case study'],
  openGraph: {
    title: 'Clara AI - Social Media Manager',
    description: 'A 24/7 AI-powered social media manager built to help creators and businesses plan, design, and publish content effortlessly.',
    images: ['/clara/clara-header.png'],
  },
}

export default function ClaraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

