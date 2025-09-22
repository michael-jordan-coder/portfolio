'use client';

import WobbleCardDemo from "@/components/ui/wobble-card-demo";
import { CodeBlock } from "@/components/CodeBlock";
import DomeGallery from "@/components/DomeGallery";
import { useState } from "react";

export default function DemoPage() {
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
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Wobble Card Demo
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Interactive cards with smooth hover animations and 3D transforms. 
            Hover over the cards to see the wobble effect!
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
        
        <div className="mt-16 text-center">
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
                <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
                <p>Fully responsive components that work on all devices</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Performance Optimized</h3>
                <p>Optimized animations using Framer Motion and modern web APIs</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Interactive Controls</h3>
                <p>Touch, mouse, and keyboard support for all interactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
