'use client';

import { useState } from 'react';
// import { ScrollToButton } from '@/components/ScrollToButton'
import HeroSection from './sections/HeroSection'
import SmoothSection from './sections/SmoothSection'
// import SplashCursor from '../components/SplashCursor';
import GsapSection from './sections/GsapSection'
import ResponsiveSection from './sections/ResponsiveSection'
import Navbar from '../components/Navbar'
import ContactModal from '../components/ContactModal'
import Link from 'next/link'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen">
        <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
        {/* <SplashCursor 
          DENSITY_DISSIPATION={2.8}
          VELOCITY_DISSIPATION={1.5}
          SPLAT_FORCE={4000}
          SPLAT_RADIUS={0.15}
          COLOR_UPDATE_SPEED={5}
        /> */}
        <HeroSection />
        <SmoothSection />
        <GsapSection />
        <ResponsiveSection onOpenContact={() => setIsContactModalOpen(true)} />
      </main>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <Link
        href="/ai"
        className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        aria-label="Open AI Demo page"
      >
        AI Demo
      </Link>
    </>
  )
}
