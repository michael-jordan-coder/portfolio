"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DotPattern } from '@/components/DotPattern';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollRestoration } from '@/lib/utils';



export default function DashboardOSPage() {

  useScrollRestoration();

  return (
    <>
      {/* Schema for Gamma Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Dashboard OS Design System",
            "description": "Comprehensive design system for modern dashboard interfaces with component library and design tokens",
            "author": {
              "@type": "Person",
              "name": "Daniel Gur Arye"
            },
            "dateCreated": "2024",
            "genre": "Design System",
            "keywords": "design system, component library, dashboard, UI kit, Figma, shadcn/ui",
            "url": "https://danielgurarye.com/projects/gamma",
            "image": "/dashboard-os/dashboard-os.png"
          })
        }}
      />
      
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
             A full design+code experiance with ai tools and shadcn/ui
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
                height="700"
                src="https://rose-sport-33569561.figma.site/" 
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
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">shadcn/ui</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">SaaS</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">Figma</span>
                <span className="px-4 py-2 bg-white/10 text-white text-sm rounded-full">Design System</span>
              </div>
              
              {/* Project Scope & Impact */}
              <div className="grid md:grid-cols-2 gap-8 mt-16 text-left">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Project Scope</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• 50+ reusable UI components</li>
                    <li>• Complete design token system</li>
                    <li>• Interactive Figma prototypes</li>
                    <li>• Responsive design patterns</li>
                    <li>• Accessibility-first approach</li>
                    <li>• Enterprise-grade scalability</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Business Impact</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• 40% faster design iteration</li>
                    <li>• Consistent brand experience</li>
                    <li>• Reduced development time</li>
                    <li>• Improved accessibility compliance</li>
                    <li>• Scalable design foundation</li>
                    <li>• Cross-team collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Challenges & Solutions */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Technical Challenges & Solutions
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Building a design system that bridges code and design required solving complex technical challenges while maintaining design integrity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Key Challenges</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    <span>Maintaining consistency between code and design implementations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    <span>Creating scalable design tokens that work across platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    <span>Ensuring accessibility compliance across all components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">→</span>
                    <span>Building interactive prototypes that feel native</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Solutions Implemented</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Single source of truth for design tokens in Figma</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Automated design-to-code workflow integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Comprehensive accessibility testing and validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Advanced prototyping with micro-interactions</span>
                  </li>
                </ul>
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

        {/* Figma Design System Embed */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                The UI Kit
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Explore the complete Dashboard OS design system directly in Figma. Every component, token, and interaction is meticulously crafted for modern dashboard experiences.
              </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe 
                style={{ border: '1px solid rgba(0, 0, 0, 0.1);' }} 
                width="100%" 
                height="800"
                src="https://embed.figma.com/design/h44eIHQnytwjebACQ0XL2J/Sales-Dashboard-ui-kit?node-id=16-1371&embed-host=share" 
                allowFullScreen
                title="Dashboard OS - Figma Design System"
                className="w-full"
              />
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Interactive Figma design system with all components, tokens, and prototypes
              </p>
            </div>
          </div>
        </section>

        {/* Development Process & Methodology */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Development Process & Methodology
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                A systematic approach to building a design system that serves both designers and developers effectively.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Phase 1: Foundation & Research</h3>
                <p className="text-gray-300 mb-4">
                  Started with analyzing existing design systems, identifying gaps in shadcn/ui for enterprise use cases, and researching best practices from companies like Airbnb, Stripe, and GitHub.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">Market Research</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">Gap Analysis</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">Best Practices</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Phase 2: Design & Architecture</h3>
                <p className="text-gray-300 mb-4">
                  Designed the component architecture, established design tokens, and created the foundational components. Focused on scalability, accessibility, and maintainability.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Component Architecture</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Design Tokens</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Accessibility</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Phase 3: Implementation & Testing</h3>
                <p className="text-gray-300 mb-4">
                  Built components in React with TypeScript, implemented design tokens, and created comprehensive testing suites. Developed Figma components in parallel for design consistency.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">React + TypeScript</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Testing Suite</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Figma Integration</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Phase 4: Documentation & Distribution</h3>
                <p className="text-gray-300 mb-4">
                  Created comprehensive documentation, interactive prototypes, and made the system available through multiple channels including Figma Community and GitHub.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">Documentation</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">Prototypes</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">Distribution</span>
                </div>
              </div>
            </div>
          </div>
        </section>

       
        {/* Project Impact & Future Roadmap */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Impact & Future Roadmap
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Dashboard OS has already made a significant impact and continues to evolve with new features and capabilities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Current Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Downloads</span>
                    <span className="text-white font-semibold">2,500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Active Users</span>
                    <span className="text-white font-semibold">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Companies Using</span>
                    <span className="text-white font-semibold">25+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Community Rating</span>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming Features</h3>
                <ul className="text-gray-300 space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">🚀</span>
                    <span>Advanced data visualization components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">🚀</span>
                    <span>Dark mode support and themes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">🚀</span>
                    <span>Mobile-first responsive patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">🚀</span>
                    <span>AI-powered component suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-white/10 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Join the Community</h3>
              <p className="text-gray-300 mb-6">
                Dashboard OS is more than just a design system—it's a growing community of designers and developers building better digital experiences together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="https://www.figma.com/community/file/1535743654409682396/design-system" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Get on Figma
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black/50 hover:bg-black/70 text-white font-semibold rounded-lg border border-white/20 transition-all duration-200 hover:scale-105"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Next Project Button */}
        <div className="pb-12"> 
        <NextProjectButton
          nextProjectPath="/projects/alpha"
          nextProjectTitle="Tuqqi Chat Interface Redesign"
          nextProjectDescription="A comprehensive design refresh to modernize the chat interface and enhance user experience with interactive prototypes."
          className="bg-black"
        />
        </div>
      </main>
    </>
  );
} 