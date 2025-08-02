import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Beta - Concept Design | Daniel Gur Arye Portfolio',
  description: 'Mobile-first responsive design concept with smooth animations and intuitive navigation. Exploring modern design patterns and user interactions.',
  keywords: ['concept project', 'mobile design', 'responsive design', 'UI concept', 'design exploration', 'interactive design'],
  openGraph: {
    title: 'Project Beta - Design Concept',
    description: 'Mobile-first responsive design concept with modern interactions.',
    images: ['/projects/beta-og.jpg'],
  },
}

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 