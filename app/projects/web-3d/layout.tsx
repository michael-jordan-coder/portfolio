import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3D Hand Tracking Interface - MediaPipe & Three.js Integration | Daniel Gur Arye Portfolio',
  description: 'Advanced hand gesture recognition system with 120 FPS tracking, real-time 3D object manipulation using MediaPipe computer vision and Three.js WebGL rendering. Comprehensive technical case study.',
  keywords: ['hand tracking', 'MediaPipe', 'Three.js', 'WebGL', 'computer vision', 'gesture recognition', 'real-time interaction', '120 FPS tracking', 'performance optimization', 'technical case study'],
  openGraph: {
    title: '3D Hand Tracking Interface - MediaPipe & Three.js Integration',
    description: 'Advanced hand gesture recognition with 120 FPS tracking and real-time 3D object manipulation. Technical deep-dive into MediaPipe and Three.js integration.',
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