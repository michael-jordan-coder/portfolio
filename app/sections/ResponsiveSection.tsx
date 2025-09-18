import { ScrollToButton } from '../../components/ScrollToButton'
import React from 'react'
import Link from 'next/link'
import { SectionWrapper, NeonBlob } from './_shared'

interface ResponsiveSectionProps {
  onOpenContact?: () => void;
}

const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({ onOpenContact }) => (
  <SectionWrapper id="responsive" variant="responsive">
    <NeonBlob 
      position="custom" 
      customClass="left-1/2 top-[300px] -translate-x-1/2" 
      size="xl" 
      colors={['#f472b6', '#c084fc']} 
      opacity={0.1} 
    />
    <div className="text-center text-white max-w-2xl mx-auto py-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Ready to build scalable solutions that drive impact?</h2>
      <p className="text-base sm:text-lg mb-6">Let's discuss how we can solve your toughest technical challenges</p>
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
)

export default ResponsiveSection 