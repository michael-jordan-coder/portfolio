'use client';

import WobbleCardDemo from "@/components/ui/wobble-card-demo";
import { CodeBlock } from "@/components/CodeBlock";
import DomeGallery from "@/components/DomeGallery";
import { useState } from "react";

// Import all unused components for demo
import Aurora from "@/components/Aurora";
import { Button } from "@/components/Button";
import ContactModal from "@/components/ContactModal";
import { DotPattern } from "@/components/DotPattern";
import ImageTest from "@/components/ImageTest";
import ImageTrail from "@/components/ImageTrail";
import LivingSquaresGrid from "@/components/LivingSquaresGrid";
import Navbar from "@/components/Navbar";
import NeonBlobs from "@/components/NeonBlobs";
import NextProjectButton from "@/components/NextProjectButton";
import { ScrollToButton } from "@/components/ScrollToButton";
import TextType from "@/components/TextType";

// Import UI components
import { AnimatedTestimonialsDemo } from "@/components/ui";
import { KPICard } from "@/components/ui";
import TerminalCard from "@/components/ui/TerminalCard";

export default function DemoPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [tabs, setTabs] = useState([
    {
      name: "Component.tsx",
      code: `import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

export const MyComponent = () => {
  return (
    <CodeBlock
      language="typescript"
      filename="example.ts"
      code={\`const hello = "world";\`}
      highlightLines={[1]}
    />
  );
};`,
      language: "tsx"
    },
    {
      name: "styles.css",
      code: `.code-block {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 16px;
  font-family: 'Fira Code', monospace;
}

.copy-button {
  transition: all 0.2s ease;
}

.copy-button:hover {
  transform: scale(1.05);
}`,
      language: "css"
    },
    {
      name: "config.json",
      code: `{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
      language: "json"
    }
  ]);

  const handleCodeChange = (newCode: string, tabIndex?: number) => {
    if (tabIndex !== undefined) {
      setTabs(prev => prev.map((tab, index) => 
        index === tabIndex ? { ...tab, code: newCode } : tab
      ));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Complete Component Demo
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Showcasing all components in the project - both used and unused components. 
            This demo includes 20+ interactive components with various animations and effects.
          </p>
        </div>
        
        <WobbleCardDemo />
        
        {/* DomeGallery Demo Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dome Gallery
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Interactive 3D sphere gallery with drag controls and smooth image transitions. 
              Drag to rotate the sphere and click on images to view them in full size.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="h-[600px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10">
              <DomeGallery 
                images={[
                  '/imagetrail/claude.svg',
                  '/imagetrail/cursor.svg',
                  '/imagetrail/figma.svg',
                  '/imagetrail/gemini.svg',
                  '/imagetrail/gpt.svg',
                  '/imagetrail/gsap.svg',
                  '/imagetrail/next.svg',
                  '/imagetrail/tailwind.svg'
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
        </div>
        
        {/* CodeBlock Demo Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CodeBlock Component
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              A beautiful code block component with syntax highlighting, copy functionality, tab support, and live editing capabilities.
            </p>
          </div>
          
            <div className="max-w-4xl mx-auto">
              <CodeBlock
                language="typescript"
                filename=""
                tabs={tabs}
                editable={true}
                onCodeChange={handleCodeChange}
              />
            </div>
        </div>
        
        {/* Aurora Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Aurora Background
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              WebGL-powered aurora background effect with customizable colors and animations.
            </p>
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <Aurora 
              colorStops={["#5227FF", "#7cff67", "#5227FF"]}
              amplitude={1.0}
              blend={0.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Aurora Effect</h3>
            </div>
          </div>
        </div>

        {/* Button Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Button Components
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Various button styles and variants.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="accent">Accent Button</Button>
          </div>
        </div>

        {/* TextType Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              TextType Animation
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Typewriter effect with customizable speed and styles.
            </p>
          </div>
          <div className="text-center">
            <TextType 
              text="This is a typewriter effect animation!"
              typingSpeed={100}
              className="text-2xl text-blue-400"
            />
          </div>
        </div>

        {/* DotPattern Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dot Pattern Background
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated dot pattern background effect.
            </p>
          </div>
          <div className="h-[300px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <DotPattern />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Dot Pattern</h3>
            </div>
          </div>
        </div>

        {/* NeonBlobs Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neon Blobs
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated neon blob effects.
            </p>
          </div>
          <div className="h-[300px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <NeonBlobs />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Neon Blobs</h3>
            </div>
          </div>
        </div>

        {/* LivingSquaresGrid Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Living Squares Grid
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Interactive grid of squares with hover effects.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 p-8">
            <LivingSquaresGrid 
              items={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg',
                '/imagetrail/gsap.svg',
                '/imagetrail/next.svg',
                '/imagetrail/tailwind.svg',
                '/imagetrail/swift.svg'
              ]}
              gridSize={3}
            />
          </div>
        </div>

        {/* ImageTrail Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Image Trail Effect
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Mouse-following image trail effect.
            </p>
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <ImageTrail 
              items={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg'
              ]}
              variant={1}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="text-white text-2xl font-bold">Move your mouse around!</h3>
            </div>
          </div>
        </div>

        {/* AnimatedTestimonialsDemo Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Animated Testimonials
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated testimonials carousel.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10">
            <AnimatedTestimonialsDemo />
          </div>
        </div>

        {/* KPICard Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              KPI Cards
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Key Performance Indicator cards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard 
              title="Users"
              value="10,000"
              unit="active users"
              improvement="+12%"
            />
            <KPICard 
              title="Revenue"
              value="$50,000"
              unit="monthly"
              improvement="+8%"
            />
            <KPICard 
              title="Conversion"
              value="3.2"
              unit="%"
              improvement="-2%"
            />
          </div>
        </div>

        {/* TerminalCard Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Terminal Card
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Terminal-style code display.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TerminalCard 
              command="npm install react"
              language="bash"
            />
          </div>
        </div>

        {/* ScrollToButton Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Scroll To Button
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Button that scrolls to a specific section.
            </p>
          </div>
          <div className="flex justify-center">
            <ScrollToButton 
              target="demo-features"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Scroll to Features
            </ScrollToButton>
          </div>
        </div>

        {/* NextProjectButton Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Next Project Button
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Button for navigating to the next project.
            </p>
          </div>
          <div className="flex justify-center">
            <NextProjectButton 
              nextProjectPath="/projects/tuqqi-ai"
              nextProjectTitle="Tuqqi AI Project"
            />
          </div>
        </div>

        {/* ImageTest Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Image Test Component
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Image testing component for debugging.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 p-8">
            <ImageTest 
              images={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg'
              ]}
            />
          </div>
        </div>
        
        <div id="demo-features" className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Demo Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-neutral-300">
              <div>
                <h3 className="font-semibold text-white mb-2">3D Wobble Cards</h3>
                <p>Smooth 3D transforms on hover with mouse tracking</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Dome Gallery</h3>
                <p>Interactive 3D sphere with drag controls and image zoom</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">CodeBlock Editor</h3>
                <p>Live code editing with syntax highlighting and copy functionality</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Aurora Background</h3>
                <p>WebGL-powered aurora effect with customizable colors</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">TextType Animation</h3>
                <p>Typewriter effect with customizable speed and styles</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Button Components</h3>
                <p>Various button styles and variants</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Dot Pattern</h3>
                <p>Animated dot pattern background effect</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Neon Blobs</h3>
                <p>Animated neon blob effects</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Living Squares Grid</h3>
                <p>Interactive grid of squares with hover effects</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Image Trail Effect</h3>
                <p>Mouse-following image trail effect</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Animated Testimonials</h3>
                <p>Animated testimonials carousel</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">KPI Cards</h3>
                <p>Key Performance Indicator cards</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Terminal Card</h3>
                <p>Terminal-style code display</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Scroll To Button</h3>
                <p>Button that scrolls to a specific section</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Next Project Button</h3>
                <p>Button for navigating to the next project</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Image Test Component</h3>
                <p>Image testing component for debugging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
