'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import Aurora from '../../components/Aurora'
import { Button } from '../../components/Button'
import DomeGallery from '../../components/DomeGallery'

const HeroSection: React.FC = () => {
  const router = useRouter();
  
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-visible sm:overflow-hidden bg-black pt-2 sm:pt-4 pb-4 sm:pb-6"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-10 h-[62vh]">
        <Aurora 
          colorStops={["#7CFF67", "#FF2974", "#57BEFF"]}
          amplitude={0.9}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center pt-20">
        {/* Header Content */}
        <div className="text-center text-white w-full">
          {/* Main heading */}
          <h1 
            className="text-center tracking-tight w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-6xl mx-auto mb-2 sm:mt-8" 
            style={{ 
              wordSpacing: '-0.02em', 
              lineHeight: '0.9',
              textShadow: '0 0 30px rgba(255,255,255,0.1)'
            }}
          >
            <div 
              className="font-bold mb-1.5 leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', // Larger on mobile: increased from 1.8rem to 2.5rem
                lineHeight: '1.1'
              }}
            >
              Ai/UX product Designer.
            </div>
          
            <p className="text-gray-400 font-regular text-lg sm:text-2xl max-w-4xl mx-auto mb-4">
              {/* Mobile: Shorter version */}
              <span className="sm:hidden">
                A true designer finds the right questions to make the right decisions. Join me on this journey—it's messy, evolving, and fun.
              </span>
              {/* Desktop: Full version */}
              <span className="hidden sm:inline">
                A true designer finds the right questions to makes the right decisions, im passionate about this process. so please join me on this journey. its messy, evolving, and fun.
              </span>
            </p>

          </h1>
          

        </div>

        {/* DomeGallery */}
        <div className="relative w-full h-[600px] max-w-5xl mx-auto">
          <DomeGallery 
            images={[
              { src: '/imagetrail/claude.svg', alt: 'Claude AI - My favorite copywriting tool, used for most of my projects' },
              { src: '/imagetrail/cursor.svg', alt: 'Cursor - the future of product design tools, used it for buildin this website, and building my own apps' },
              { src: '/imagetrail/figma.svg', alt: 'Figma - fun fact, i spend more time in figma then with my own family' },
              { src: '/imagetrail/gemini.svg', alt: 'Google Gemini - my favorite code assistant for 3d modeling' },
              { src: '/imagetrail/gpt.svg', alt: 'ChatGPT - literally my second brain' },
              { src: '/imagetrail/gsap.svg', alt: 'GSAP - The best animation library that i ever used' },
              { src: '/imagetrail/next.svg', alt: 'Next.js - favorite framework for websites, and saaS applications' },
              { src: '/imagetrail/swift.svg', alt: 'SwiftUI - The standart way to build iOS apps, with an amazing design system, that is insparation for me' },
              { src: '/imagetrail/tailwind.svg', alt: 'my life saver for styling when i want my code to be clean and readable' }
            ]}
            fit={0.5}
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6">
          <Button 
            variant="hero"
            size="default"
            className="w-full sm:w-auto"
            onClick={() => {
              if (typeof document !== 'undefined') {
                document.getElementById('smooth')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore Projects
          </Button>
          <Button 
            variant="primary" 
            size="default" 
            className="w-full sm:w-auto"
            onClick={() => {
              router.push('/about');
            }}
          >
            About me
          </Button>
        </div>

        {/* Scroll text */}
        
      </div>
    </section>
  )
}

export default HeroSection 