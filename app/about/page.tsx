'use client';

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Aurora from '../../components/Aurora';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const AboutSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Testimonials data
  const testimonials = [
    {
      quote: "My love for basketball came from Michael jordan, just see him on coart (on videos) made me exicted, his commitment to the game and his passion, is what i find minigful in life",
      name: "Basketball",
      designation: "I'm a big fan of the game",
      src: "https://cdn.sanity.io/images/c1chvb1i/production/a177656f876ed4e52b538e4bfd2546de9f1e5919-1100x735.jpg?auto=format&fit=max&q=75&w=1100",
    },
    {
      quote: "My calm times are always starts with music that i love, i think music is effective for multiple situations, wether it's a workout, a study session, or just a chill day, music is always there to help me.",
      name: "Music",
      designation: "specially the beatles",
      src: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/03/06/USAT/81787689007-usatgraphics-beatles-topper.png?crop=2666,1997,x552,y0",
    },
    {
      quote: "Daniel's designs don't just look good—they feel right. Every interaction is thoughtful and purposeful.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Mouse tracking for the glass effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <Aurora 
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>

      {/* Subtle Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Mouse-following Glass Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
        }}
      ></div>

      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full p-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      
      {/* Main Content */}
      <div className="relative z-10 py-32 lg:py-48">
        <div className="w-full px-6 lg:px-12">
          <div className="w-full max-w-5xl mx-auto">
            {/* Title */}
            {/* <motion.div 
              className="mb-32 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Daniel
              </h1>
              <div className="mt-6 text-xl md:text-2xl lg:text-3xl text-gray-400 font-medium tracking-wider">
                Creative Developer & Designer
              </div>
            </motion.div> */}
            
            {/* Testimonials Section */}
            <motion.div 
              className="mb-32"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Soooo, what about Me?
                </h2>
                <p className="text-xl md:text-2xl text-gray-300">
                Here are 3 things i like beside Design.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10">
                <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
              </div>
            </motion.div>
            
            {/* Main Story */}
            <motion.div 
              className="mb-32"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center space-y-16">
                <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-300 leading-relaxed">
                  I believe great design is invisible. It's not about making things pretty — it's about creating experiences that feel inevitable, like they've always existed.
                </p>
                
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                  Every project starts with a question: "What if?" What if we could make this feel alive? What if we could make someone's day a little better?
                </p>
                
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                  I'm obsessed with the details that most people never notice. The micro-interactions, the timing, the way something responds to your touch.
                </p>
                
                <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                  My process is messy, iterative, and deeply personal. I sketch, I prototype, I fail, I learn. Each iteration brings me closer to something honest.
                </p>
                
                <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-300 leading-relaxed">
                  I'm not here to follow trends or chase awards. I'm here to create work that matters — work that connects, that moves, that makes a difference.
                </p>
              </div>
            </motion.div>
            
            {/* Call to Action */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-12 font-medium">
                Let's create something together.
              </p>
              <div className="flex justify-center gap-8">
                <Link
                  href="/projects"
                  className="px-8 py-4 text-lg md:text-xl bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full text-white font-bold backdrop-blur-xl border border-white/20 hover:border-white/40"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 text-lg md:text-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 rounded-full text-white font-bold"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection