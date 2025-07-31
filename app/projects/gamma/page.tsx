"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function DashboardOSPage() {
  const [previewWidth, setPreviewWidth] = useState('web');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-40">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-black/90 text-white font-semibold shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Dashboard OS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              A living UI kit experience for modern dashboard interfaces
            </p>
                        <div className="mb-12">
            <div className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                Design System
              </div>
            
            {/* Responsive Preview Controls */}
            <div className="mt-6 mb-4 flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => setPreviewWidth('web')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  previewWidth === 'web' 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Web (1872px)
              </button>
              <button 
                onClick={() => setPreviewWidth('tablet')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  previewWidth === 'tablet' 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Tablet (768px)
              </button>
              <button 
                onClick={() => setPreviewWidth('phone')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  previewWidth === 'phone' 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Phone (402px)
              </button>
            </div>

            <div className="mt-4 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black w-auto">
              <div className={`mx-auto transition-all duration-500 ${
                previewWidth === 'web' ? 'w-[1872px]' :
                previewWidth === 'tablet' ? 'w-[768px]' :
                previewWidth === 'phone' ? 'w-[402px]' : 'w-full'
              }`}>
                <iframe 
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1);' }} 
                  width="100%" 
                  height="700"
                  src="https://emit-cane-34282110.figma.site/" 
                  allowFullScreen
                  title="Dashboard OS - Live Preview"
                  className="w-full"
                />
              </div>
            </div>
          </div>


           
          </div>
        </section>

        {/* Project Overview */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-300 mb-6">
                  Dashboard OS is a comprehensive design system and UI kit for modern dashboard interfaces. 
                  Built with Figma, it provides a complete set of components, design tokens, and interactive prototypes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">Figma</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">Design System</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">UI Kit</span>
                  <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">Dashboard</span>
                </div>
              </div>
              <div className="bg-black rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-400">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Component Library
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-400">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Design Tokens
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-400">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Interactive Prototypes
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-400">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Live Preview
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Showcase */}
        <section className="px-4 pb-12">
          <div className="max-w-5xl mx-auto">
         
            
            {/* Live Preview - Primary */}
           

            {/* Figma Design System */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Design System Components
              </h3>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <iframe 
                  style={{ border: '1px solid rgba(255, 255, 255, 0.1);' }} 
                  width="100%" 
                  height="600"
                  src="https://emit-cane-34282110.figma.site" 
                  allowFullScreen
                  title="Dashboard OS - Design System"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Design System Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black rounded-xl p-6 border border-white/10 shadow-sm">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Component Library</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive set of reusable UI components designed for dashboard interfaces
                </p>
              </div>

              <div className="bg-black rounded-xl p-6 border border-white/10 shadow-sm">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M7 21L3 7L21 7L17 21L7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 21L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Design Tokens</h3>
                <p className="text-gray-300 text-sm">
                  Consistent color palette, typography, and spacing system for cohesive design
                </p>
              </div>

              <div className="bg-black rounded-xl p-6 border border-white/10 shadow-sm">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Interactive Prototype</h3>
                <p className="text-gray-300 text-sm">
                  Live Figma prototype showcasing the complete dashboard experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center bg-black rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Experience the Full Design System
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Explore the complete Dashboard OS design system with interactive components, design tokens, and real-world examples.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://emit-cane-34282110.figma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Live Preview
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13V19A2 2 0 0 1 16 21H6A2 2 0 0 1 4 19V5A2 2 0 0 1 6 3H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 2L21 8L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="https://emit-cane-34282110.figma.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                >
                  View Design System
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 