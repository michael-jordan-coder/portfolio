'use client';

import { ScrollToButton } from '@/components/ScrollToButton'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import TextType from '@/components/TextType'
import { motion, useScroll, useTransform } from 'framer-motion'
import Aurora from '@/components/Aurora'
import { Button } from '../../components/Button'

// Register SplitText plugin
gsap.registerPlugin(SplitText);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Split the heading text into characters and words
    const splitHeading = new SplitText(headingRef.current, { 
      type: "chars, words",
      charsClass: "char",
      wordsClass: "word"
    });
    const chars = splitHeading.chars;
    const words = splitHeading.words;

    // Set initial states
    gsap.set([chars, buttonsRef.current], {
      opacity: 0,
      y: 100
    });

    // Create the enhanced reveal sequence
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)"
    })
    .to(words, {
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scale: 1.05,
      yoyo: true,
      repeat: 0
    }, "-=0.5")
    .to(chars, {
      duration: 0.3,
      ease: "power2.out",
      scale: 1,
      opacity: 1
    }, "-=0.2")
    .to(words, {
      duration: 0.2,
      ease: "power2.out",
      scale: 1,
      opacity: 1
    }, "-=0.1")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.1");

    return () => {
      tl.kill();
      splitHeading.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Black background fill */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Aurora Background */}
      <div className="absolute inset-0 z-10">
        <Aurora 
          colorStops={["#7CFF67", "#FF2974", "#57BEFF"]}
          amplitude={0.8}
          blend={0.6}
          speed={0.3}
        />
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none" />
      
      <motion.div 
        className="text-center text-white w-full px-4 max-w-7xl mx-auto relative z-30"
        style={{ y: y2, opacity, scale }}
      >
        {/* Main heading with improved typography */}
        <h1 
          ref={headingRef} 
          className="text-7xl md:text-7xl mb-8 text-center tracking-tight w-full px-4 mx-auto" 
          style={{ 
            wordSpacing: '-0.03em', 
            lineHeight: '0.95',
            textShadow: '0 0 30px rgba(255,255,255,0.1)'
          }}
        >
          <div className="font-bold mb-4"> I focus on finding problems</div>
          <div className="font-normal text-6xl text-gray-300">And solving them beautifully.</div>
        </h1>
        
        {/* Subtitle with better spacing and typography */}
        {/* <div className="text-xl font-semibold md:text-3xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <TextType 
            text="Design is like cinema — emotional, reactive, unforgettable"
            typingSpeed={40}
            initialDelay={800}
            className="text-gray-600 font-normal"
            cursorCharacter="|"
            cursorBlinkDuration={1.8}
          />
        </div> */}
        
        {/* Buttons with improved typography */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            variant="primary"
            className="bg-white text-black font-semibold text-lg tracking-wide transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-xl hover:-translate-y-1 focus:ring-white/60"
            onClick={() => {
              const element = document.getElementById('smooth');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Projects
          </Button>

          <Link
            href="/about"
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-xl hover:-translate-y-1 focus:ring-white/60"
          >
            <Button 
              variant="primary"
              className="border-2 border-white text-white font-semibold text-lg tracking-wide transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-xl hover:-translate-y-1 hover:bg-white/10 focus:ring-white/60"
            >
              About Me
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection 