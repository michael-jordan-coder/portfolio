'use client';

import { ScrollToButton } from '../../components/ScrollToButton'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionWrapper, NeonBlob } from './_shared'
import { useIsMobile } from '../../hooks/useIsMobile'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface ResponsiveSectionProps {
  onOpenContact?: () => void;
}

const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({ onOpenContact }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;

  return (
    <SectionWrapper id="responsive" variant="responsive">
      <NeonBlob 
        position="custom" 
        customClass="left-1/2 top-[300px] -translate-x-1/2" 
        size="xl" 
        colors={['#f472b6', '#c084fc']} 
        opacity={0.1}
        animated={shouldAnimate}
      />
      <div className="text-center text-white max-w-2xl mx-auto py-12">
        {shouldAnimate ? (
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Ready to build scalable solutions that drive impact?
          </motion.h2>
        ) : (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to build scalable solutions that drive impact?
          </h2>
        )}
        {shouldAnimate ? (
          <motion.p 
            className="text-base sm:text-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Let's discuss how we can solve your toughest technical challenges
          </motion.p>
        ) : (
          <p className="text-base sm:text-lg mb-6">
            Let's discuss how we can solve your toughest technical challenges
          </p>
        )}
        {shouldAnimate ? (
          <motion.div 
            className="flex flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
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
          </motion.div>
        ) : (
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
        )}
      </div>
    </SectionWrapper>
  )
}

export default ResponsiveSection 