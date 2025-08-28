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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full p-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  )
}
