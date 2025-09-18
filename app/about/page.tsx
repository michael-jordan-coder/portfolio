'use client';

import Link from 'next/link'
import React from 'react';
import SplashCursor from '@/components/SplashCursor';

const AboutPage: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Back to home button - mobile optimized but desktop preserved */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-4 right-4 md:top-8 md:right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-4 py-2 md:px-6 md:py-4 backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2 touch-manipulation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>
      
      {/* Main Content - Original desktop layout preserved, mobile optimized */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            About
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            As a junior still developing as a young professional, I know it won't be easy to find the right place. But honestly, I don't care. I believe consistency is one of the most valuable skills I bring, and I know my passion for this field will guide me toward the right opportunities to grow my career. If my portfolio shows you my quality, I'd love to talk about working together. And if it doesn't, I'd truly appreciate your thoughts and feedback—I'll take them to heart.
          </p>
          
          {/* LinkedIn Button - Following Figma specs: 208px w, 44px h, 10px horizontal padding, 16px vertical padding, 12px gap */}
          <a
            href="https://linkedin.com/in/danielgur" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
            style={{
              width: '208px',
              height: '44px',
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '16px',
              paddingBottom: '16px',
              gap: '12px'
            }}
          >
            <img 
              src="/imagetrail/linkedin.png" 
              alt="LinkedIn" 
              width={20} 
              height={20}
              className="flex-shrink-0"
            />
            <span>Open Via LinkedIn</span>
          </a>
        </div>
      </div>
      
      {/* Splash Cursor Effect - Subtle and beautiful */}
      <SplashCursor 
        DENSITY_DISSIPATION={4.5}
        VELOCITY_DISSIPATION={2.5}
        SPLAT_FORCE={3500}
        SPLAT_RADIUS={0.15}
        COLOR_UPDATE_SPEED={6}
        CURL={2}
      />
    </section>
  );
};

export default AboutPage