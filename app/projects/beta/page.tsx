"use client";

import Link from 'next/link';
import { useEffect } from 'react';
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
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Beta Project
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              This project is currently under development
            </p>
          </div>
        </section>

        {/* Placeholder Content */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                This project is currently being developed. Check back soon for updates.
              </p>
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
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