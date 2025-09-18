'use client';

import { useState, useEffect } from 'react';
import LivingSquaresGrid from '../../components/LivingSquaresGrid';
import CustomCursor from '../../components/CustomCursor';
import { SectionWrapper, NeonBlob, TECH_STACK_ITEMS } from './_shared';

// Condensed tool descriptions
const toolDescriptions = {
  '/imagetrail/gemini.svg': { name: 'Gemini AI', description: 'Creative partner for design ideation and UX exploration.' },
  '/imagetrail/cursor.svg': { name: 'Cursor', description: 'Design-to-code bridge for pixel-perfect interfaces.' },
  '/imagetrail/figma.svg': { name: 'Figma', description: 'Heart of my design process for intuitive, accessible UIs.' },
  '/imagetrail/tailwind.svg': { name: 'Tailwind CSS', description: 'Design system enabler for rapid prototyping.' },
  '/imagetrail/gsap.svg': { name: 'GSAP', description: 'Magic wand for polished micro-interactions and animations.' },
  '/imagetrail/claude.svg': { name: 'Claude AI', description: 'UX research partner for user psychology insights.' },
  '/imagetrail/next.svg': { name: 'Next.js', description: 'Performance foundation for smooth interfaces.' },
  '/imagetrail/gpt.svg': { name: 'ChatGPT', description: 'Design inspiration and accessibility guidelines assistant.' }
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
      setCursorState(prev => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle tool hover/leave
  const handleToolHover = (toolPath: string) => {
    const tool = toolDescriptions[toolPath as keyof typeof toolDescriptions];
    if (tool) {
      setCursorState(prev => ({ ...prev, isVisible: true, toolName: tool.name, description: tool.description }));
      if (typeof document !== 'undefined') {
        document.body.classList.add('tech-stack-cursor');
      }
    }
  };

  const handleToolLeave = () => {
    setCursorState(prev => ({ ...prev, isVisible: false }));
    if (typeof document !== 'undefined') {
      document.body.classList.remove('tech-stack-cursor');
    }
  };

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

      <div className="relative w-full h-[500px] max-w-6xl mx-auto px-4">
        <LivingSquaresGrid
          items={TECH_STACK_ITEMS}
          gridSize={3}
          onToolHover={handleToolHover}
          onToolLeave={handleToolLeave}
        />
      </div>

      <CustomCursor
        isVisible={cursorState.isVisible}
        toolName={cursorState.toolName}
        description={cursorState.description}
        position={cursorState.position}
      />
    </SectionWrapper>
  )
}