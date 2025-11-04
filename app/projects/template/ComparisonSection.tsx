'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/Button';

// Fullscreen Modal Component
function FullscreenModal({ isOpen, onClose, imageSrc, altText }: { 
  isOpen: boolean; 
  onClose: () => void; 
  imageSrc: string; 
  altText: string; 
}) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-[95vw] max-h-[95vh] p-4">
        <Button
          variant="primary"
          size="sm"
          className="absolute -top-2 -right-2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 focus:ring-white/50"
          onClick={onClose}
          aria-label="Close fullscreen view"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        
        <Image
          src={imageSrc}
          alt={altText}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
          draggable={false}
        />
        
        <p className="text-white/60 text-sm text-center mt-4">
          Click anywhere to close
        </p>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isComponent1Hovered, setIsComponent1Hovered] = useState(false);
  const [isComponent2Hovered, setIsComponent2Hovered] = useState(false);
  const [isComponent3Hovered, setIsComponent3Hovered] = useState(false);

  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Fullscreen Modal */}
        <FullscreenModal
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          imageSrc="/placeholder-before.png"
          altText="Current Interface - Before Redesign (Fullscreen View)"
        />
        
    
        
      
        
        {/* Step 1: Current State */}
        <article className="mb-20">
          <header className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
              Step 1: Current State
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Analyzing the Current Interface</h3>
            <p className="text-gray-600 text-xl font-semibold max-w-3xl mx-auto">
              "The existing interface requires a comprehensive visual redesign to align with modern design standards and improve overall user experience."
            </p>
          </header>
          
          {/* Current Design Image */}
          <div className="max-w-5xl mx-auto mb-12">
            <div 
              className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-2xl"
              onClick={() => setIsFullscreenOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFullscreenOpen(true);
                }
              }}
              aria-label="Click to view fullscreen"
            >
              <Image
                src="/placeholder-before.png"
                alt="Current Interface - Before Redesign"
                width={1600}
                height={1000}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              /> 
              
              {/* Component 1 Problem Overlay */}
              {isComponent1Hovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight box */}
                  <div className="absolute bottom-1 left-1/4 w-[54%] h-16 border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Issue 1
                    </div>
                  </div>
                </div>
              )}
              
              {/* Component 2 Problem Overlay */}
              {isComponent2Hovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight background issues */}
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Issue 2
                    </div>
                  </div>
                  
                  {/* Highlight left panel issues */}
                  <div className="absolute top-0 left-0 w-1/4 h-full border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Issue 2a
                    </div>
                  </div>
                </div>
              )}
              
              {/* Component 3 Problem Overlay */}
              {isComponent3Hovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight middle section */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Issue 3
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/70 text-white text-sm px-3 py-2 rounded-full backdrop-blur-sm">
                  Click to expand
                </span>
              </div>
            </div>
          </div>

                    {/* Design Issues - Horizontal Cards */}
          <div className="text-center mb-3">
            <h4 className="text-xl font-medium text-gray-900">Key Issues Identified</h4>
          </div>
          <div className="flex gap-4 max-w-5xl mx-auto justify-center">
            <div 
              className="bg-transparent rounded-xl p-3 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setIsComponent1Hovered(true)}
              onMouseLeave={() => setIsComponent1Hovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Issue 1</h5>
            </div>
            <div 
              className="bg-transparent rounded-xl p-3 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setIsComponent2Hovered(true)}
              onMouseLeave={() => setIsComponent2Hovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Issue 2</h5>
            </div>
            <div 
              className="bg-transparent rounded-xl p-3 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setIsComponent3Hovered(true)}
              onMouseLeave={() => setIsComponent3Hovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Issue 3</h5>
            </div>
          </div>
        </article>
        
        {/* Step 2: Design Process */}
        <article className="mb-20">
          <header className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
              Step 2: Design Transformation
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Redesigning the Interface</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Transforming the interface with modern design principles, improved visual hierarchy, and enhanced user experience patterns.
            </p>
          </header>
          
          {/* Design Inspiration */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-2 gap-8 h-[400px] mb-8">
              {/* Old UI - Left Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-red-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-old-1.svg" 
                    alt="Old Interface Design" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Original Interface Design</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The initial interface featured outdated visual elements, insufficient color contrast, and lacked contemporary design patterns.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Before
                </div>
              </div>
              
              {/* New UI - Right Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-green-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-new-1.svg" 
                    alt="New Interface Design" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Redesigned Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned interface incorporates contemporary aesthetics, enhanced visual hierarchy, and improved user experience.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  After
                </div>
              </div>
            </div>
            
            {/* Second Pair of Containers */}
            <div className="grid grid-cols-2 gap-8 h-[400px] mb-8">
              {/* Second Old UI - Left Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-red-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-old-2.svg" 
                    alt="Old Interface Design 2" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Original Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The initial interface design that required modernization and enhanced user experience optimization.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Before
                </div>
              </div>
              
              {/* Second New UI - Right Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-green-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-new-2.svg" 
                    alt="New Interface Design 2" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Modernized Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned interface featuring contemporary aesthetics, improved functionality, and enhanced user experience design.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  After
                </div>
              </div>
            </div>
            
            {/* Third Pair of Containers */}
            <div className="grid grid-cols-2 gap-8 h-[400px]">
              {/* Third Old UI - Left Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-red-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-old-3.png" 
                    alt="Old Complete Interface" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Complete Original Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The comprehensive original interface demonstrating the complete user flow and interaction design patterns.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Before
                </div>
              </div>
              
              {/* Third New UI - Right Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-green-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image 
                    src="/placeholder-new-3.png" 
                    alt="New Complete Interface" 
                    width={400}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">New Complete Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned complete interface with improved layout, modern design elements, and enhanced user experience.
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  After
                </div>
              </div>
            </div>
          </div>
          
          {/* Design Principles */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Visual Hierarchy</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Creating clear information hierarchy to improve readability and user flow.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Modern Aesthetics</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Implementing contemporary design patterns and visual elements.
              </p>
            </div>
          </div>
        </article>
        
        {/* Step 3: Final Result */}
        <article className="text-center">
          <header className="mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
              Step 3: Final Result
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Enhanced Interface</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The redesigned interface delivers improved user experience with modern aesthetics and enhanced functionality.
            </p>
          </header>
          
          {/* Final Design - Figma Prototype */}
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-green-200 bg-white">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://your-figma-prototype-url.figma.com/proto/..." 
                allowFullScreen
                title="Project Redesign - Figma Prototype"
              />
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">
              Interactive Figma prototype of the redesigned interface
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

