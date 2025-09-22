'use client';

import DomeGallery from '../../components/DomeGallery';
import { SectionWrapper, NeonBlob } from './_shared';

export default function GsapSection() {

  return (
    <SectionWrapper id="tech-stack" className="py-60">
      <NeonBlob 
        position="custom" 
        customClass="right-1/4 top-1/2 -translate-y-1/2" 
        size="lg" 
        colors={['#3b82f6', '#8b5cf6', '#ec4899']} 
        opacity={0.3} 
      />
      
      <div className="text-center text-white max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-6xl font-bold mb-6">My Design & UX Toolkit</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the tools I use to craft exceptional user experiences. 
          Hover over each tool to learn how it helps create intuitive, accessible designs.
        </p>
      </div>

      <div className="relative w-full h-[600px] max-w-6xl mx-auto px-4">
        <div className="h-full rounded-2xl overflow-hidden bg-black backdrop-blur-sm">
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
            fit={0.6}
            segments={30}
            maxVerticalRotationDeg={8}
            dragSensitivity={25}
            grayscale={false}
            imageBorderRadius="20px"
            openedImageBorderRadius="30px"
          />
        </div>
      </div>

    </SectionWrapper>
  )
}