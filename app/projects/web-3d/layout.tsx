import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Hand Tracking Interface - Interactive Experience | Daniel Gur Arye Portfolio',
  description: 'Real-time hand gesture recognition with 3D visualization and interactive controls using computer vision and web technologies.',
  keywords: ['hand tracking', 'computer vision', '3D visualization', 'web technologies', 'HTML5', 'CSS3', 'JavaScript', 'real-time interaction', 'interactive experience'],
  openGraph: {
    title: '3D Hand Tracking Interface - Interactive Experience',
    description: 'Real-time hand gesture recognition with 3D visualization using computer vision and web technologies.',
    images: ['/image.png'],
  },
}

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 