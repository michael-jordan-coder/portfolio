import { ScrollToButton } from '@/components/ScrollToButton'
import React from 'react'
import Link from 'next/link'

const ResponsiveSection: React.FC = () => (
  <section
    id="responsive"
    className="relative h-auto bg-gradient-to-b from-black via-[#060607] to-black flex items-center justify-center px-4 sm:px-8 overflow-visible p-6 pt-[20vh] pb-[20vh]"
  >
    {/* Noise overlay */}
    <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
    {/* Neon blob - ResponsiveSection (top left) */}
    <div className="absolute left-1/2 top-[300px] -translate-x-1/2 w-[920px] h-[280px] rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 opacity-10 blur-3xl pointer-events-none z-0" aria-hidden="true" 
      // border-2 border-pink-300 (uncomment for debug)
      // border-2 border-cyan-200 (uncomment for debug)
    />
    <div className="text-center text-white max-w-2xl mx-auto py-12">
      <h2 className="text-5xl font-bold mb-4">This is the end, but now you can get to know me better</h2>
      <p className="text-lg mb-6">either way, you can go back to the top or learn more about me</p>
      <div className="flex flex-row gap-4 items-center justify-center">
        <ScrollToButton 
          target="#hero" 
          className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
        >
          Back to Top
        </ScrollToButton>
        <Link 
          href="/about" 
          className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold transition-colors hover:bg-white/10"
        >
          About Me
        </Link>
      </div>
    </div>
  </section>
)

export default ResponsiveSection 