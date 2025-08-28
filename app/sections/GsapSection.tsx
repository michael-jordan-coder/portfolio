'use client';

import { useState, useEffect } from 'react';
import LivingSquaresGrid from '@/components/LivingSquaresGrid';
import CustomCursor from '@/components/CustomCursor';

// Tool descriptions for each technology
const toolDescriptions = {
  '/imagetrail/gemini.svg': {
    name: 'Gemini AI',
    description: 'My creative partner for design ideation and user experience exploration. It helps me brainstorm innovative UI patterns, user flows, and design solutions that feel intuitive and delightful.'
  },
  '/imagetrail/cursor.svg': {
    name: 'Cursor',
    description: 'My design-to-code bridge. I use it to transform beautiful Figma designs into pixel-perfect, responsive interfaces while maintaining the visual integrity and user experience I envisioned.'
  },
  '/imagetrail/figma.svg': {
    name: 'Figma',
    description: 'The heart of my design process. I use it to craft user interfaces that aren\'t just beautiful, but intuitive and accessible. From wireframes to high-fidelity prototypes, it\'s where my UX vision comes to life.'
  },
  '/imagetrail/tailwind.svg': {
    name: 'Tailwind CSS',
    description: 'My design system enabler. It lets me rapidly prototype and iterate on UI designs, ensuring consistency across components while maintaining the flexibility to create unique, branded experiences.'
  },
  '/imagetrail/gsap.svg': {
    name: 'GSAP',
    description: 'The magic wand for user experience. I use it to create micro-interactions, smooth transitions, and engaging animations that guide users through interfaces and make every interaction feel polished and purposeful.'
  },
  '/imagetrail/claude.svg': {
    name: 'Claude AI',
    description: 'My UX research and design thinking partner. It helps me explore user psychology, accessibility considerations, and innovative design patterns to create experiences that truly serve user needs.'
  },
  '/imagetrail/next.svg': {
    name: 'Next.js',
    description: 'My platform for bringing designs to life. It provides the performance and user experience foundation that allows my carefully crafted interfaces to shine, ensuring fast loading and smooth interactions.'
  },
  '/imagetrail/gpt.svg': {
    name: 'ChatGPT',
    description: 'My design inspiration and UX research assistant. I use it to explore user behavior patterns, accessibility guidelines, and creative design solutions that enhance the overall user experience.'
  }
};

export default function GsapSection() {
  const [cursorState, setCursorState] = useState({
    isVisible: false,
    toolName: '',
    description: '',
    position: { x: 0, y: 0 }
  });

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        position: { x: e.clientX, y: e.clientY }
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle tool hover
  const handleToolHover = (toolPath: string) => {
    const tool = toolDescriptions[toolPath as keyof typeof toolDescriptions];
    if (tool) {
      setCursorState(prev => ({
        ...prev,
        isVisible: true,
        toolName: tool.name,
        description: tool.description
      }));
      // Add custom cursor class to body
      document.body.classList.add('tech-stack-cursor');
    }
  };

  const handleToolLeave = () => {
    setCursorState(prev => ({
      ...prev,
      isVisible: false
    }));
    // Remove custom cursor class from body
    document.body.classList.remove('tech-stack-cursor');
  };

  return (
    <section
      id="tech-stack"
      className="relative py-60 bg-gradient-to-b from-black via-[#000000] to-black overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
      
      {/* Neon blob - Tech Stack Section */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl pointer-events-none z-0" aria-hidden="true" />
      
      {/* Header */}
      <div className="text-center text-white max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-6xl font-bold mb-6">My Design & UX Toolkit</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the tools and technologies I use to craft exceptional user experiences. 
          Hover over each tool to learn how it helps me create intuitive, beautiful, and accessible designs.
        </p>
      </div>

      {/* LivingSquaresGrid Container */}
      <div className="relative w-full h-[500px] max-w-6xl mx-auto px-4">
        <LivingSquaresGrid
          items={[
            '/imagetrail/gemini.svg',
            '/imagetrail/cursor.svg',
            '/imagetrail/figma.svg',
            '/imagetrail/tailwind.svg',
            '/imagetrail/gsap.svg',
            '/imagetrail/claude.svg',
            '/imagetrail/next.svg',
            '/imagetrail/gpt.svg',
          ]}
          gridSize={3}
          onToolHover={handleToolHover}
          onToolLeave={handleToolLeave}
        />
      </div>

      {/* Custom Cursor with Tool Descriptions */}
      <CustomCursor
        isVisible={cursorState.isVisible}
        toolName={cursorState.toolName}
        description={cursorState.description}
        position={cursorState.position}
      />
    </section>
  )
}