'use client';

import { useEffect, useRef } from 'react';
import DomeGallery from '../../components/DomeGallery';
import { SectionWrapper, NeonBlob } from './_shared';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GsapSection() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  // Refs for GSAP reveal animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  // Responsive opened image dimensions based on screen size
  const getOpenedImageDimensions = () => {
    if (typeof window === 'undefined') {
      return { width: '900px', height: '500px' };
    }
    
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    
    if (isMobile) {
      return { width: '90vw', height: '50vh' };
    } else if (isTablet) {
      return { width: '600px', height: '400px' };
    } else {
      return { width: '900px', height: '500px' };
    }
  };

  const openedDimensions = getOpenedImageDimensions();

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
    <SectionWrapper id="tech-stack" className="py-16 sm:py-32 md:py-60" ref={sectionRef}>
      <NeonBlob 
        position="custom" 
        customClass="right-1/4 top-1/2 -translate-y-1/2" 
        size="lg" 
        colors={['#3b82f6', '#8b5cf6', '#ec4899']} 
        opacity={0.3} 
      />
      
      <div className="text-center text-white max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
        <h2 
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6"
        >
          My Design & UX Toolkit
        </h2>
        <p 
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover the tools I use to craft exceptional user experiences. 
          Click on each tool to learn how it helps create intuitive, accessible designs.
        </p>
      </div>

      <div className="relative w-full h-[600px] max-w-6xl mx-auto px-4">
        <div className="h-full rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10">
          <DomeGallery 
            images={[
              { src: '/imagetrail/claude.svg', alt: 'Claude AI - Advanced AI assistant by Anthropic for coding and creative tasks' },
              { src: '/imagetrail/cursor.svg', alt: 'Cursor - AI-powered code editor with intelligent autocomplete and chat' },
              { src: '/imagetrail/figma.svg', alt: 'Figma - Collaborative design tool for UI/UX and prototyping' },
              { src: '/imagetrail/gemini.svg', alt: 'Google Gemini - Multimodal AI model for text and image generation' },
              { src: '/imagetrail/gpt.svg', alt: 'ChatGPT - OpenAI conversational AI for various creative and analytical tasks' },
              { src: '/imagetrail/gsap.svg', alt: 'GSAP - High-performance JavaScript animation library for web' },
              { src: '/imagetrail/next.svg', alt: 'Next.js - React framework for production with SSR and static generation' },
              { src: '/imagetrail/swift.svg', alt: 'Swift - Apple programming language for iOS and macOS development' },
              { src: '/imagetrail/tailwind.svg', alt: 'Tailwind CSS - Utility-first CSS framework for rapid UI development' }
            ]}
            fit={0.6}
            segments={30}
            maxVerticalRotationDeg={8}
            dragSensitivity={25}
            grayscale={false}
            imageBorderRadius="20px"
            openedImageBorderRadius="30px"
            openedImageWidth={openedDimensions.width}
            openedImageHeight={openedDimensions.height}
          />
        </div>
      </div>

    </SectionWrapper>
  )
}