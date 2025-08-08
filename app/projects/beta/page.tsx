"use client";

import Link from 'next/link';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollRestoration } from '@/lib/utils';

export default function BetaPage() {
  useScrollRestoration();

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-40">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-gray-800/90 text-white font-semibold shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 backdrop-blur-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-10 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Design System (Figma)
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A modern, production-ready design system published on Figma Community.
            </p>
            <div className="mt-6">
              <a
                href="https://www.figma.com/community/file/1535743654409682396/design-system"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                aria-label="Open Figma Community file in a new tab"
              >
                Open in Figma ↗
              </a>
            </div>
          </div>
        </section>

        {/* Figma Embed */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              {/* 16:9 responsive frame */}
              <div className="relative pt-[56.25%]">
                <iframe
                  title="Figma Design System"
                  src={
                    `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                      'https://www.figma.com/community/file/1535743654409682396/design-system'
                    )}`
                  }
                  className="absolute inset-0 w-full h-full"
                  style={{ border: '0' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              If the embed does not load, use the button above to open the file on Figma.
            </p>
          </div>
        </section>

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