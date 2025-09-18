'use client';

import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SplashCursor from '../../components/SplashCursor';
import ContactModal from '../../components/ContactModal';

const AboutPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [splashCursorKey, setSplashCursorKey] = useState(0);

  const handleButtonHover = (hovered: boolean) => {
    setIsButtonHovered(hovered);
  };

  // Refresh splash cursor every 1 minute
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setSplashCursorKey(prev => prev + 1);
    }, 60000); // 60,000ms = 1 minute

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-[100svh] bg-black text-white overflow-x-hidden"
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
      <div className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            About
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            As a junior still developing as a young professional, I know it won't be easy to find the right place. But honestly, I don't care. I believe <strong className="font-bold text-gray-300">consistency</strong> is one of the most valuable skills I bring, and I know my <strong className="font-bold text-gray-300">passion</strong> for this field will guide me toward the right opportunities to grow my career. If my portfolio shows you my <strong className="font-bold text-gray-300">quality</strong>, I'd love to talk about <strong className="font-bold text-gray-300">working together</strong>. And if it doesn't, I'd truly appreciate your <strong className="font-bold text-gray-300">thoughts and feedback</strong>—I'll take them to heart.
          </p>
          
          {/* Action Buttons - Horizontal Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* LinkedIn Button - Following Figma specs: 208px w, 44px h, 10px horizontal padding, 16px vertical padding, 12px gap */}
            <a
              href="https://www.linkedin.com/in/daniel-gur-556002308/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
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
              <Image 
                src="/imagetrail/linkedin.png" 
                alt="LinkedIn" 
                width={20} 
                height={20}
                className="flex-shrink-0"
              />
              <span>Open Via LinkedIn</span>
            </a>

            {/* Contact Button - Matching design */}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center justify-center bg-transparent text-white font-medium rounded-full border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation"
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
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
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="flex-shrink-0"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Contact Me</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Splash Cursor Effect - Hidden when buttons are hovered, refreshes every minute */}
      {!isButtonHovered && (
        <SplashCursor 
          key={splashCursorKey}
          DENSITY_DISSIPATION={4.5}
          VELOCITY_DISSIPATION={2.5}
          SPLAT_FORCE={3500}
          SPLAT_RADIUS={0.15}
          COLOR_UPDATE_SPEED={6}
          CURL={2}
        />
      )}
    </section>
  );
};

export default AboutPage