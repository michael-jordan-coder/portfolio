"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import ChatViewSection from './ChatViewSection';
import ImageComparisonSlider from './ImageComparisonSlider';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollRestoration } from '@/lib/utils';

export default function AlphaPage() {
  useScrollRestoration();

  return (
    <>
      {/* Schema for Alpha Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "Tuqqi Chat Interface Redesign",
            "description": "Comprehensive chat interface redesign for Tuqqi work management platform, enhancing user experience and modernizing the visual design",
            "author": {
              "@type": "Person",
              "name": "Daniel Gur Arye"
            },
            "dateCreated": "2024",
            "genre": "UX Design",
            "keywords": "chat interface, UX design, work management, user experience, Tuqqi, interface redesign",
            "url": "https://danielgurarye.com/projects/alpha",
            "image": "/tuqqi/chat-new.png"
          })
        }}
      />
      
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tuqqi Chat Interface Redesign
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive design transformation that modernizes the chat interface, enhances user experience, and elevates the overall product quality
            </p>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
           

            {/* Comparison Slider */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <ImageComparisonSlider
                beforeImage={{
                  src: "/tuqqi/chat-old.png",
                  alt: "Current Tuqqi Chat Interface"
                }}
                afterImage={{
                  src: "/tuqqi/chat-new.png",
                  alt: "Redesigned Tuqqi Chat Interface"
                }}
                handleColor="#3b82f6"
                handleSize={50}
                dividerWidth={4}
                className="rounded-2xl"
              />
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-3 bg-red-100 px-4 py-2 rounded-lg border border-red-200">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-800 font-medium">Original Design</span>
              </div>
              <div className="flex items-center gap-3 bg-green-100 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-800 font-medium">Redesigned Interface</span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-4"></div>

        {/* Detailed Process Section */}
        <ChatViewSection />
        
        {/* Next Project Button */}
        <NextProjectButton
          nextProjectPath="/projects/gamma"
          nextProjectTitle="Dashboard OS"
          nextProjectDescription="A comprehensive design system that brings modern dashboard interfaces to life with interactive components and design tokens."
        />
      </main>
    </>
  );
} 