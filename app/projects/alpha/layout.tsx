import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuqqi Chat Interface Redesign - Daniel Gur Arye Portfolio',
  description: 'Case study: Redesigned chat interface for Tuqqi work management platform. Modern UX design with improved user experience and intuitive navigation.',
  keywords: ['Tuqqi chat interface', 'UX design case study', 'work management platform', 'chat redesign', 'user experience design'],
  openGraph: {
    title: 'Tuqqi Chat Interface Redesign',
    description: 'Modern UX design case study for Tuqqi work management platform.',
    images: ['/tuqqi/tuqqi-og.jpg'],
  },
}

export default function AlphaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 