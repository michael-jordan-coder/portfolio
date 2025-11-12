'use client';

import { ScrollToButton } from '../../components/ScrollToButton'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { SectionWrapper, NeonBlob } from './_shared'
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ResponsiveSectionProps {
  onOpenContact?: () => void;
}

const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({ onOpenContact }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  // Refs for GSAP reveal animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // GSAP ScrollTrigger reveal animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !headingRef.current || !descriptionRef.current) return;

    if (!shouldAnimate) {
      // Simple mobile version - just show content
      gsap.set([headingRef.current, descriptionRef.current], { opacity: 1, y: 0 });
      return;
    }

    // Split heading into characters manually
    const headingText = headingRef.current.textContent || '';
    headingRef.current.innerHTML = headingText.split('').map(char => 
      char === ' ' ? ' ' : `<span class="char">${char}</span>`
    ).join('');

    // Get character elements
    const chars = headingRef.current.querySelectorAll('.char');

    // Set initial states for characters
    gsap.set(chars, {
      y: 80,
      opacity: 0,
      rotationX: 70,
      transformOrigin: "center bottom"
    });

    // Set initial state for description
    gsap.set(descriptionRef.current, {
      y: 40,
      opacity: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });

    // Animate heading characters with wave effect
    tl
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
      .to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, prefersReducedMotion, shouldAnimate]);

  return (
    <SectionWrapper ref={sectionRef} id="responsive" variant="responsive">
      <NeonBlob 
        position="custom" 
        customClass="left-1/2 top-[300px] -translate-x-1/2" 
        size="xl" 
        colors={['#f472b6', '#c084fc']} 
        opacity={0.1} 
      />
      <div className="text-center text-white max-w-2xl mx-auto py-12">
        <h2 
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          Ready to build scalable solutions that drive impact?
        </h2>
        <p 
          ref={descriptionRef}
          className="text-base sm:text-lg mb-6"
        >
          Let's discuss how we can solve your toughest technical challenges
        </p>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Link 
            href="/about"
            className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
          >
            About Me
          </Link>
          <button 
            onClick={onOpenContact}
            className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
          >
            Let's Connect
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ResponsiveSection 