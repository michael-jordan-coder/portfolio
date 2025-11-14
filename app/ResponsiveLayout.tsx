'use client'

import { ReactNode } from 'react'
import { useIsMobileDevice } from '../lib/utils'
import { SmoothScrollProvider } from '../components/SmoothScrollProvider'
import { ScrollRestoration } from '../components/ScrollRestoration'

type LayoutProps = {
  children: ReactNode
}

export function ResponsiveLayout({ children }: LayoutProps) {
  const isMobile = useIsMobileDevice()

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>
  }

  return <DesktopLayout>{children}</DesktopLayout>
}

function MobileLayout({ children }: LayoutProps) {
  return (
    <>
      <ScrollRestoration />
      <main className="min-h-screen bg-black text-white">
        {children}
      </main>
    </>
  )
}

function DesktopLayout({ children }: LayoutProps) {
  return (
    <SmoothScrollProvider>
      <ScrollRestoration />
      <main>{children}</main>
    </SmoothScrollProvider>
  )
}
