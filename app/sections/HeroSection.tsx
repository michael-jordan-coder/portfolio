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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-2 sm:pt-4 pb-4 sm:pb-6"
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
                fontSize: 'clamp(1.8rem, 5vw, 5rem)',
                lineHeight: '1.1'
              }}
            >
              Ai/UX product Designer.
            </div>
          
            <p className="text-gray-300 font-regular text-3xl max-w-3xl mx-auto mb-4">
           Im truly passionate about design products, putting my focus on the user and the product.
            </p>

          </h1>
          

        </div>

        {/* DomeGallery */}
        <div className="relative w-full h-[600px] max-w-5xl mx-auto">
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