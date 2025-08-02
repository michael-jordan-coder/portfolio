"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DotPattern } from '@/components/DotPattern';
import NextProjectButton from '../../../components/NextProjectButton';



export default function DashboardOSPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-black/90 text-white font-semibold shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-black relative overflow-hidden">
        {/* Dot Pattern Background */}
        <DotPattern 
          width={25} 
          height={25} 
          cx={1} 
          cy={1} 
          cr={1} 
          className="opacity-60 text-white/40" 
        />
        {/* Radial Fade Overlay - Fixed to viewport center */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, transparent 15%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.98) 100%)`
          }}
        />
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <div className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                Design System
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12">
              Dashboard OS
            </h1>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto ">
              A comprehensive design system that brings modern dashboard interfaces to life
            </p>
          </div>
        </section>

        {/* Live Preview - Main Showcase */}
        <section className="relative z-10  ">
          <div className="max-w-7xl mx-auto">
           
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
        </section>

        {/* Project Overview & Features */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                The Journey
              </h2>
              <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                It all started with shadcn/ui—a solid foundation that I decided to push beyond its basic capabilities. I wanted to transform it into something more sophisticated, tailored specifically for complex SaaS systems and enterprise dashboards. As I evolved the components and design patterns, the idea emerged: why not make this accessible to designers through Figma? That's how Dashboard OS was born—a bridge between development and design.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">shadcn/ui</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">SaaS</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">Figma</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">Design System</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features Grid */}
        <section className="relative z-10 px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Technical Excellence
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
                  A comprehensive collection of modular, reusable UI components engineered specifically for modern dashboard interfaces
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
                  Systematic design tokens ensuring consistent color palettes, typography hierarchies, and spacing systems across all components
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
                  Fully functional Figma prototype demonstrating the complete dashboard experience with real interactions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center bg-black rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Dive Into the Complete Experience
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Immerse yourself in the full Dashboard OS design system—where every component tells a story and every interaction feels natural.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://emit-cane-34282110.figma.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Launch Preview
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
                  Explore System
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
        
        {/* Next Project Button */}
        <NextProjectButton
          nextProjectPath="/projects/alpha"
          nextProjectTitle="Tuqqi Chat Interface Redesign"
          nextProjectDescription="A comprehensive design refresh to modernize the chat interface and enhance user experience with interactive prototypes."
          className="bg-black"
        />
      </main>
    </>
  );
} 