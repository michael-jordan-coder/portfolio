'use client';

import { useState, useEffect } from 'react';
import LivingSquaresGrid from '@/components/LivingSquaresGrid';
import CustomCursor from '@/components/CustomCursor';

// Tool descriptions for each technology
const toolDescriptions = {
  '/imagetrail/gemini.svg': {
    name: 'Gemini AI',
    description: 'Google\'s advanced AI model that I use for code review, problem-solving, and creative brainstorming. It helps me think through complex technical challenges.'
  },
  '/imagetrail/cursor.svg': {
    name: 'Cursor',
    description: 'My primary code editor powered by AI. It accelerates my development workflow with intelligent code completion and helps me write cleaner, more efficient code.'
  },
  '/imagetrail/figma.svg': {
    name: 'Figma',
    description: 'The go-to design tool for creating user interfaces and prototypes. I use it to design beautiful, functional layouts before bringing them to life with code.'
  },
  '/imagetrail/tailwind.svg': {
    name: 'Tailwind CSS',
    description: 'My preferred CSS framework for rapid UI development. It allows me to build responsive, modern interfaces quickly while maintaining clean, maintainable code.'
  },
  '/imagetrail/gsap.svg': {
    name: 'GSAP',
    description: 'The powerhouse animation library I use to create smooth, performant animations and interactions. It brings life to my designs with buttery-smooth motion.'
  },
  '/imagetrail/claude.svg': {
    name: 'Claude AI',
    description: 'Anthropic\'s AI assistant that I use for technical discussions, code optimization, and exploring new approaches to complex problems.'
  },
  '/imagetrail/next.svg': {
    name: 'Next.js',
    description: 'My React framework of choice for building full-stack applications. It provides the perfect balance of performance, developer experience, and modern web features.'
  },
  '/imagetrail/gpt.svg': {
    name: 'ChatGPT',
    description: 'OpenAI\'s AI that I use for quick coding questions, debugging help, and learning new technologies. It\'s like having a coding mentor available 24/7.'
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
        <h2 className="text-6xl font-bold mb-6">My Tech Stack</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the technologies and tools I use to bring ideas to life. 
          Hover over the squares to see them come alive and learn why I love each tool.
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