import type { Metadata } from 'next'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smooth Scroll App',
  description: 'A Next.js app with buttery-smooth scrolling using Lenis',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
