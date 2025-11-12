'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper, NeonBlob } from './_shared';
import { Button } from '../../components/Button';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const AboutCTASection: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 25 : 50, isMobile ? -25 : -50]);

  return (
    <SectionWrapper id="about-cta" variant="default">
      <NeonBlob 
        position="custom" 
        customClass="right-1/4 top-1/3 -rotate-12" 
        size="md" 
        colors={['#a855f7', '#ec4899', '#ef4444']} 
        opacity={0.3} 
        animated={shouldAnimate}
      />
      <NeonBlob 
        position="custom" 
        customClass="left-1/4 bottom-1/3 rotate-6" 
        size="sm" 
        colors={['#06b6d4', '#3b82f6', '#6366f1']} 
        opacity={0.25} 
        animated={shouldAnimate}
      />
      
      <motion.div 
        ref={sectionRef}
        className="relative z-10 text-center px-4 py-20"
        style={{ opacity, y }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Eyebrow */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-100px" } : undefined}
            transition={shouldAnimate ? { duration: 0.6, ease: "easeOut" } : undefined}
          >
            <span className="inline-block text-sm px-4 py-2 rounded-full font-medium bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
              Get to Know Me
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-100px" } : undefined}
            transition={shouldAnimate ? { duration: 0.7, ease: "easeOut", delay: 0.1 } : undefined}
          >
            Learn More About My Journey
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-100px" } : undefined}
            transition={shouldAnimate ? { duration: 0.7, ease: "easeOut", delay: 0.2 } : undefined}
          >
            Discover my design philosophy, strengths, and what drives me to create exceptional user experiences. Let's explore how we can work together.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="pt-4"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldAnimate ? { once: false, margin: "-100px" } : undefined}
            transition={shouldAnimate ? { duration: 0.7, ease: "easeOut", delay: 0.3 } : undefined}
          >
            <Link href="/about" className="group inline-block">
              <Button
                variant="primary"
                size="lg"
                className="relative overflow-hidden rounded-full font-semibold px-8 py-4 text-base transition-all duration-200 focus:ring-2 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] bg-white text-black hover:bg-gray-100 border border-white/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View About Page
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default AboutCTASection;

