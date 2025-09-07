import { ScrollToButton } from '@/components/ScrollToButton'
import React from 'react'
import Link from 'next/link'

interface ResponsiveSectionProps {
  onOpenContact?: () => void;
}

const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({ onOpenContact }) => (
  <section
    id="responsive"
    className="relative h-auto bg-gradient-to-b from-black via-[#060607] to-black flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-visible p-4 sm:p-6 pt-[15vh] sm:pt-[20vh] pb-[15vh] sm:pb-[20vh]"
  >
    {/* Noise overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
    {/* Neon blob - ResponsiveSection (top left) */}
    <div className="absolute left-1/2 top-[300px] -translate-x-1/2 w-[920px] h-[280px] rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 opacity-10 blur-3xl pointer-events-none z-0" aria-hidden="true" 
      // border-2 border-pink-300 (uncomment for debug)
      // border-2 border-cyan-200 (uncomment for debug)
    />
    <div className="text-center text-white max-w-2xl mx-auto py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Ready to build scalable solutions that drive impact?</h2>
      <p className="text-base sm:text-lg mb-6">Let's discuss how we can solve your toughest technical challenges</p>
      <div className="flex flex-row gap-4 items-center justify-center">
        <ScrollToButton 
          target="#hero" 
          className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
        >
          Back to Top
        </ScrollToButton>
        <button 
          onClick={onOpenContact}
          className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
        >
          Let's Connect
        </button>
      </div>
    </div>
  </section>
)

export default ResponsiveSection 