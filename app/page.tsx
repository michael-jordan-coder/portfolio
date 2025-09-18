'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar'
import ContactModal from '../components/ContactModal'

// Dynamic imports for heavy sections with GSAP/Framer Motion
const HeroSection = dynamic(() => import('./sections/HeroSection'), {
  ssr: false, // Disable SSR for GSAP animations
  loading: () => (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      <div className="text-center">
        <div className="w-32 h-8 bg-white/10 animate-pulse rounded mb-4"></div>
        <div className="w-48 h-12 bg-white/5 animate-pulse rounded"></div>
      </div>
    </div>
  )
});

const GsapSection = dynamic(() => import('./sections/GsapSection'), {
  ssr: false, // Heavy GSAP animations
  loading: () => (
    <div className="py-60 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-64 h-8 bg-white/10 animate-pulse rounded mx-auto"></div>
      </div>
    </div>
  )
});

// Regular imports for lighter sections
import SmoothSection from './sections/SmoothSection'
import ResponsiveSection from './sections/ResponsiveSection'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <main 
        className="min-h-[100svh]"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
        
        {/* Heavy sections with Suspense boundaries */}
        <Suspense fallback={
          <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
            <div className="text-center">
              <div className="w-32 h-8 bg-white/10 animate-pulse rounded mb-4"></div>
              <div className="w-48 h-12 bg-white/5 animate-pulse rounded"></div>
            </div>
          </div>
        }>
          <HeroSection />
        </Suspense>
        
        <SmoothSection />
        
        <Suspense fallback={
          <div className="py-60 bg-black">
            <div className="max-w-7xl mx-auto px-4">
              <div className="w-64 h-8 bg-white/10 animate-pulse rounded mx-auto"></div>
            </div>
          </div>
        }>
          <GsapSection />
        </Suspense>
        
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
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom) + 0.5rem)', right: 'max(2rem, env(safe-area-inset-right) + 0.5rem)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  )
}
