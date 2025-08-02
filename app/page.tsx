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
    </>
  )
}
