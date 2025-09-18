'use client';

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { motion, useScroll, useTransform } from 'framer-motion'
import Aurora from '../../components/Aurora'
import { Button } from '../../components/Button'

gsap.registerPlugin(SplitText);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const transforms = {
    y2: useTransform(scrollYProgress, [0, 1], [0, -150]),
    opacity: useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.3, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1, 0.8])
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Split into lines and words for a refined, premium cascade
    const splitHeading = new SplitText(headingRef.current, { 
      type: "lines, words",
      wordsClass: "word",
      linesClass: "line"
    });
    const words = splitHeading.words;
    const lines = splitHeading.lines;
    const lastWord = words[words.length - 1];

    // Set initial states
    gsap.set(lines, { display: 'block', overflow: 'hidden' });
    gsap.set(words, { opacity: 0, yPercent: 110 });
    gsap.set(buttonsRef.current, { opacity: 0, y: 16 });
    // Soft focus pull and slightly expanded letter spacing for emotional depth
    gsap.set(headingRef.current, { filter: 'blur(6px)', letterSpacing: '0.01em' });
    gsap.set(accentRef.current, { scaleX: 0, transformOrigin: 'left center' });

    // Create a refined reveal: masked rise per word with gentle skew settle
    tl.to(words, {
      opacity: 1,
      yPercent: 0,
      duration: 0.7,
      stagger: 0.01,
      ease: 'power4.out'
    })
    // Focus pull and letter-spacing settle in parallel
    .to(headingRef.current, {
      filter: 'blur(0px)',
      letterSpacing: '0em',
      duration: 0.6,
      ease: 'power1.out'
    }, '<0.1')
    // Gentle emphasis on the last word to land the message
    .to(lastWord, {
      color: '#ffffff',
      scale: 1.03,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      transformOrigin: '50% 70%'
    }, '-=0.2')
    // Underline accent sweep
    .to(accentRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.1')
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out"
    }, "-=0.05");

    // Ambient breathing to keep the hero feeling alive, extremely subtle
    const ambient = gsap.to(headingRef.current, {
      scale: 1.006,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      tl.kill();
      ambient.kill();
      splitHeading.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black"
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
        style={{ y: transforms.y2, opacity: transforms.opacity, scale: transforms.scale }}
      >
        {/* Main heading with improved typography */}
        <h1 
          ref={headingRef} 
          className="text-5xl md:text-6xl mb-8 text-center tracking-tight w-full px-4 mx-auto" 
          style={{ 
            wordSpacing: '-0.03em', 
            lineHeight: '0.95',
            textShadow: '0 0 30px rgba(255,255,255,0.1)'
          }}
        >
          <div className="font-bold mb-4">Sensitive. Human. Passionate.</div>
          <div className="font-normal text-4xl text-gray-300">Im Daniel, and this is my portfolio.</div>
        </h1>
        
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="hero"
            size="lg"
           
            onClick={() => {
              if (typeof document !== 'undefined') {
                document.getElementById('smooth')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Projects
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection 