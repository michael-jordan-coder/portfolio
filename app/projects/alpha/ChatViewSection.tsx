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

export default function ChatViewSection() {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isChatComponentHovered, setIsChatComponentHovered] = useState(false);
  const [isColorSelectionHovered, setIsColorSelectionHovered] = useState(false);
  const [isChatBubblesHovered, setIsChatBubblesHovered] = useState(false);

  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Fullscreen Modal */}
        <FullscreenModal
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          imageSrc="/tuqqi/chat-old.png"
          altText="Current Tuqqi Chat Interface - Before Redesign (Fullscreen View)"
        />
        
    
        
      
        
        {/* Step 1: Current State */}
        <article className="mb-20">
          <header className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
              Step 1: Current State
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Mapping the Problem</h3>
            <p className="text-gray-600 text-xl font-semibold max-w-3xl mx-auto">
              "The current chat interface needs a complete visual refresh. It looks outdated and doesn't reflect the quality of our product."
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
                src="/tuqqi/chat-old.png"
                alt="Current Tuqqi Chat Interface - Before Redesign"
                width={1600}
                height={1000}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              /> 
              
              {/* Chat Component Problem Overlay */}
              {isChatComponentHovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight box around message input area */}
                  <div className="absolute bottom-1 left-1/4 w-[54%] h-16 border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Message Input Issues
                    </div>
                  </div>
                </div>
              )}
              
              {/* Color Selection Problem Overlay */}
              {isColorSelectionHovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight background issues */}
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Background Color Issues
                    </div>
                  </div>
                  
                  {/* Highlight left panel issues */}
                  <div className="absolute top-0 left-0 w-1/4 h-full border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Left Panel Issues
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chat Bubbles Problem Overlay */}
              {isChatBubblesHovered && (
                <div className="absolute inset-0 bg-red-500/20 transition-all duration-300">
                  {/* Highlight chat bubbles in the middle */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 border-4 border-red-500 rounded-lg shadow-lg">
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Chat Bubbles Issues
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
              onMouseEnter={() => setIsChatComponentHovered(true)}
              onMouseLeave={() => setIsChatComponentHovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Chat Component</h5>
            </div>
            <div 
              className="bg-transparent rounded-xl p-3 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setIsColorSelectionHovered(true)}
              onMouseLeave={() => setIsColorSelectionHovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Color Selection</h5>
            </div>
            <div 
              className="bg-'transparent' rounded-xl p-3 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group cursor-pointer relative"
              onMouseEnter={() => setIsChatBubblesHovered(true)}
              onMouseLeave={() => setIsChatBubblesHovered(false)}
            >
              <h5 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-300">Chat Bubbles</h5>
            </div>
          </div>
        </article>
        
        {/* Step 2: Design Process */}
        <article className="mb-20">
          <header className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-full font-medium mb-4">
              Step 2: #uiHacking
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Its time to hack the UI</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              I'm going to hack the UI of the chat interface to make it more modern and clean.
            </p>
          </header>
          
          {/* Design Inspiration */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-2 gap-8 h-[400px] mb-8">
              {/* Old UI - Left Side */}
              <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-red-200" style={{ backgroundColor: '#E7E7E7' }}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img 
                    src="/tuqqi/old-chat.svg" 
                    alt="Old Tuqqi Chat Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Old UI Design</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The original interface had outdated visual elements, poor color contrast, and lacked modern design patterns. Users found it difficult to navigate and visually unappealing.
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
                  <img 
                    src="/tuqqi/new-chat.svg" 
                    alt="New Tuqqi Chat Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">New UI Design</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned interface features modern aesthetics, improved visual hierarchy, better color schemes, and enhanced user experience with cleaner chat bubbles and intuitive navigation.
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
                  <img 
                    src="/tuqqi/tuqqi-old.svg" 
                    alt="Old Tuqqi Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Old Tuqqi Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The original Tuqqi interface design that needed modernization and improved user experience.
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
                  <img 
                    src="/tuqqi/tuqqi-new.svg" 
                    alt="New Tuqqi Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">New Tuqqi Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned Tuqqi interface with modern aesthetics, improved functionality, and enhanced user experience.
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
                  <img 
                    src="/tuqqi/whole-chat-old.png" 
                    alt="Old Complete Chat Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">Old Complete Chat Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The complete original chat interface showing the full conversation flow and user interaction design.
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
                  <img 
                    src="/tuqqi/whole-chat-new.png" 
                    alt="New Complete Chat Interface" 
                    className="w-full h-full object-contain transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6">
                    <h4 className="text-white text-xl font-bold mb-3">New Complete Chat Interface</h4>
                    <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                      The redesigned complete chat interface with improved layout, modern design elements, and enhanced user experience.
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
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Enhanced Chat Interface</h3>
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
                src="https://embed.figma.com/proto/1JXOQvq1i10EItwQG4LpkY/Tuqqi-Redesign-files?node-id=3050-47619&t=0sJbQUS2Bn49UtP4-1&embed-host=share" 
                allowFullScreen
                title="Tuqqi Chat Redesign - Figma Prototype"
              />
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">
              Interactive Figma prototype of the redesigned chat interface
            </p>
          </div>
        </article>
      </div>
    </section>
  );
} 