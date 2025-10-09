'use client';

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SplashCursor from '../../components/SplashCursor';
import ContactModal from '../../components/ContactModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [splashCursorKey, setSplashCursorKey] = useState(0);

  // Refs for GSAP animations
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const philosophySectionRef = useRef<HTMLDivElement>(null);
  const strengthsSectionRef = useRef<HTMLDivElement>(null);

  const handleButtonHover = (hovered: boolean) => {
    setIsButtonHovered(hovered);
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // About section animation - SplitText only for header
    if (aboutSectionRef.current) {
      const titleElement = aboutSectionRef.current.querySelector('h1');
      const textElement = aboutSectionRef.current.querySelector('p');
      
      if (titleElement && textElement) {
        // Split title into characters manually
        const titleText = titleElement.textContent || '';
        titleElement.innerHTML = titleText.split('').map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        // Get character elements
        const chars = titleElement.querySelectorAll('.char');

        // Set initial states for characters
        gsap.set(chars, {
          y: 80,
          opacity: 0,
          rotationX: 70,
          transformOrigin: "center bottom"
        });

        // Set initial state for paragraph
        gsap.set(textElement, {
          y: 40,
          opacity: 0
        });

        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        });

        // Animate title characters with wave effect
        aboutTl
          .to(chars, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.6,
              from: "start"
            }
          })
          .to(textElement, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.4");
      }
    }

    // Philosophy section animation - SplitText for header
    if (philosophySectionRef.current) {
      const titleElement = philosophySectionRef.current.querySelector('h1');
      const textElement = philosophySectionRef.current.querySelector('p');
      
      if (titleElement && textElement) {
        // Split title into characters manually
        const titleText = titleElement.textContent || '';
        titleElement.innerHTML = titleText.split('').map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        // Get character elements
        const chars = titleElement.querySelectorAll('.char');

        // Set initial states for characters
        gsap.set(chars, {
          y: 80,
          opacity: 0,
          rotationX: 70,
          transformOrigin: "center bottom"
        });

        // Set initial state for paragraph
        gsap.set(textElement, {
          y: 40,
          opacity: 0
        });

        const philosophyTl = gsap.timeline({
          scrollTrigger: {
            trigger: philosophySectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        });

        // Animate title characters with wave effect
        philosophyTl
          .to(chars, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.6,
              from: "start"
            }
          })
          .to(textElement, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.4");
      }
    }

    // Strengths section animation - SplitText for header
    if (strengthsSectionRef.current) {
      const titleElement = strengthsSectionRef.current.querySelector('h1');
      const textElement = strengthsSectionRef.current.querySelector('p');
      
      if (titleElement && textElement) {
        // Split title into characters manually
        const titleText = titleElement.textContent || '';
        titleElement.innerHTML = titleText.split('').map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        // Get character elements
        const chars = titleElement.querySelectorAll('.char');

        // Set initial states for characters
        gsap.set(chars, {
          y: 80,
          opacity: 0,
          rotationX: 70,
          transformOrigin: "center bottom"
        });

        // Set initial state for paragraph
        gsap.set(textElement, {
          y: 40,
          opacity: 0
        });

        const strengthsTl = gsap.timeline({
          scrollTrigger: {
            trigger: strengthsSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        });

        // Animate title characters with wave effect
        strengthsTl
          .to(chars, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.6,
              from: "start"
            }
          })
          .to(textElement, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.4");
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Refresh splash cursor every 30 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setSplashCursorKey(prev => prev + 1);
    }, 30000); // 30,000ms = 30 seconds

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
      <div ref={aboutSectionRef} className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            About
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            As a junior still developing as a young professional, I know it won't be easy to find the right place. But honestly, I don't care. I believe <strong className="font-bold text-gray-300">consistency</strong> is one of the most valuable skills I bring, and I know my <strong className="font-bold text-gray-300">passion</strong> for this field will guide me toward the right opportunities to grow my career. If my portfolio shows you my <strong className="font-bold text-gray-300">quality</strong>, I'd love to talk about <strong className="font-bold text-gray-300">working together</strong>. And if it doesn't, I'd truly appreciate your <strong className="font-bold text-gray-300">thoughts and feedback</strong>—I'll take them to heart.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div ref={philosophySectionRef} className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            Philosophy
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            My approach to design is rooted in <strong className="font-bold text-gray-300">empathy</strong> and <strong className="font-bold text-gray-300">user-centered thinking</strong>. I believe that great design happens when we truly understand the people we're designing for. Every decision I make is guided by <strong className="font-bold text-gray-300">research</strong>, <strong className="font-bold text-gray-300">iteration</strong>, and a deep commitment to creating experiences that not only look beautiful but also solve real problems and make people's lives better.
          </p>
        </div>
      </div>

      {/* Third Section - Strengths */}
      <div ref={strengthsSectionRef} className="relative z-10 flex items-center justify-center min-h-[100svh] px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
            Strengths
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            My unique advantage lies in bridging the gap between <strong className="font-bold text-gray-300">design and development</strong>. I'm fluent in both Figma and React, understanding how designs translate into code and how code constraints shape design decisions. My expertise with <strong className="font-bold text-gray-300">AI tools</strong> allows me to prototype faster, iterate smarter, and explore creative solutions that push boundaries. Above all, I'm driven by a genuine <strong className="font-bold text-gray-300">passion for user-centered design</strong>—every pixel, every interaction, every decision is made with the user's experience in mind.
          </p>
        </div>
      </div>

      {/* Action Buttons - Horizontal Layout */}
      <div className="relative z-10 flex items-center justify-center min-h-[50vh] px-4 md:px-0">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4 md:px-0 leading-relaxed mb-8">
            Ready to bring your ideas to life? Choose how you'd like to connect and let's start building something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Google Calendar Button - Following Figma specs: 208px w, 44px h, 10px horizontal padding, 16px vertical padding, 12px gap */}
          <a
            href="https://calendar.google.com/calendar/u/0/r/eventedit" 
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Schedule Meeting</span>
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