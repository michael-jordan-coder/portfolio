import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard OS Design System - Daniel Gur Arye Portfolio',
  description: 'Comprehensive design system for modern dashboard interfaces. Complete component library with interactive prototypes and design tokens.',
  keywords: ['Dashboard OS', 'design system', 'component library', 'UI kit', 'Figma design system', 'dashboard design', 'shadcn/ui'],
  openGraph: {
    title: 'Dashboard OS Design System',
    description: 'Comprehensive design system for modern dashboard interfaces.',
    images: ['/dashboard-os/dashboard-os-og.jpg'],
  },
}

export default function GammaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 