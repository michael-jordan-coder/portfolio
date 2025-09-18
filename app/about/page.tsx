'use client';

import Link from 'next/link'
import React from 'react';
import SplashCursor from '@/components/SplashCursor';

const AboutPage: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white"
    >
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            About
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto">
            As a junior still developing as a young professional, I know it won't be easy to find the right place. But honestly, I don't care. I believe consistency is one of the most valuable skills I bring, and I know my passion for this field will guide me toward the right opportunities to grow my career. If my portfolio shows you my quality, I'd love to talk about working together. And if it doesn't, I'd truly appreciate your thoughts and feedback—I'll take them to heart.
          </p>
        </div>
      </div>
      
      {/* Splash Cursor Effect */}
      <SplashCursor />
    </section>
  );
};

export default AboutPage