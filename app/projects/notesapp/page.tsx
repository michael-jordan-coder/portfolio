"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { KPICard } from '@/components/ui';
import { useScrollToTopOnNavigation } from '@/lib/utils';
import NextProjectButton from '../../../components/NextProjectButton';

// Asset configuration - centralized and type-safe
const ASSETS = {
  images: {
    userflow1: '/notes-app/Casestudy/images/userflow-1.png',
    userflow2: '/notes-app/Casestudy/images/userflow-2.png',
    currentScreen: '/notes-app/Casestudy/images/current-screen.png',
    advancedScreen: '/notes-app/Casestudy/images/advanced-screen.png',
    lovable: '/notes-app/Casestudy/images/lovable.png',
    base44: '/notes-app/Casestudy/images/base-44.png',
    bolt: '/notes-app/Casestudy/images/bolt.png',
  },
  videos: {
    currentFlow: '/notes-app/Casestudy/video/current-flowvid.mp4',
    newFlow: '/notes-app/Casestudy/video/new-flowvid.mp4',
  },
} as const;

// Reusable components for better maintainability
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`px-4 py-16 md:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  className = '' 
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={priority}
    className={`w-full h-auto object-cover ${className}`}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
);

const VideoPlayer = ({ src, poster }: { src: string; poster: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        // Video will show poster image if autoplay fails
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      className="w-full h-full object-cover rounded-[40px] cursor-pointer"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      onClick={() => {
        const video = videoRef.current;
        if (video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};


export default function GammaPage() {
  useScrollToTopOnNavigation();
  
  return (
    <div className="bg-white min-h-screen">
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black hover:bg-black/80 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl border border-black/20 hover:border-black/40 focus:outline-none focus:ring-2 focus:ring-black/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>

      {/* Hero Section */}
      <Section className="pt-32 pb-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-6 text-sm font-medium text-neutral-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                Product Designer
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                1 Week Sprint
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                iOS App
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                UX Optimization
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black tracking-[-2.16px] leading-[1.2] max-w-4xl">
            Optimizing user workflows for enhanced performance
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-neutral-600 tracking-[-0.48px] leading-[1.3] max-w-6xl">
            A strategic UX optimization initiative focused on streamlining the note creation workflow, achieving a 50% reduction in task completion time through data-driven design decisions.
          </p>
        </div>
      </Section>

      {/* Overview Section */}
      <Section>
        <div className="border-b border-semantic-border-secondary pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-black tracking-[-0.96px] leading-[1.2] mb-8">
                  Overview
                </h2>
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2]">
                    Inbox is a productivity-focused iOS application designed to capture and organize thoughts efficiently
                  </p>
                  <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2]">
                    The following demonstrates the existing note creation workflow and identifies opportunities for optimization
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-[302px] h-[657px] rounded-[40px] overflow-hidden">
                <VideoPlayer 
                  src={ASSETS.videos.currentFlow}
                  poster={ASSETS.images.currentScreen}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Current User Flow Section */}
      <Section>
        <div className="border-b border-semantic-border-secondary pb-16">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-[-0.96px] leading-[1.2]">
              Current user flow
            </h2>
             <div className="w-full bg-neutral-100 rounded-xl overflow-hidden shadow-sm">
               <OptimizedImage
                 src={ASSETS.images.userflow1}
                 alt="Current user flow diagram"
                 width={1200}
                 height={600}
                 priority
               />
             </div>
            <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2] max-w-2xl">
              While the current workflow follows conventional patterns, our objective is to optimize user efficiency by minimizing required interactions
            </p>
          </div>
        </div>
      </Section>

      {/* Hacking Better Approach Section */}
      <Section>
        <div className="border-b border-semantic-border-secondary pb-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-black tracking-[-0.96px] leading-[1.2]">
                Strategic approach analysis
              </h2>
              <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2]">
                Competitive analysis of Lovable, Base 44, and Bolt revealed a key pattern: prioritizing the primary user action on the initial screen creates a more efficient experience.
              </p>
            </div>
            
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-8 md:gap-12 lg:gap-16 min-w-max px-4 md:px-0">
                <div className="w-[280px] md:w-[350px] lg:w-[500px] h-[280px] md:h-[250px] lg:h-[300px] rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                  <OptimizedImage
                    src={ASSETS.images.lovable}
                    alt="Lovable app screenshot"
                    width={700}
                    height={500}
                  />
                </div>
                <div className="w-[280px] md:w-[350px] lg:w-[500px] h-[280px] md:h-[250px] lg:h-[300px] rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                  <OptimizedImage
                    src={ASSETS.images.base44}
                    alt="Base 44 app screenshot"
                    width={700}
                    height={500}
                  />
                </div>
                <div className="w-[280px] md:w-[350px] lg:w-[500px] h-[280px] md:h-[250px] lg:h-[300px] rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                  <OptimizedImage
                    src={ASSETS.images.bolt}
                    alt="Bolt app screenshot"
                    width={700}
                    height={500}
                  />
                </div>
              </div>
            </div>

         
          </div>
        </div>
      </Section>

      {/* Advanced User Flow Section */}
      <Section>
        <div className="border-b border-semantic-border-secondary pb-16">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-[-0.96px] leading-[1.2]">
              Optimized user flow implementation
            </h2>
             <div className="w-full rounded-xl overflow-hidden shadow-sm">
               <OptimizedImage
                 src={ASSETS.images.userflow2}
                 alt="Optimized user flow diagram"
                 width={1200}
                 height={600}
               />
             </div>
            <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2] max-w-4xl">
              By prioritizing the primary user action on the initial screen, we create a more intuitive and efficient user experience that aligns with user expectations and reduces cognitive load
            </p>
          </div>
        </div>
      </Section>

      {/* Screen Comparison Section */}
      <Section>
        <div className="space-y-16">
          {/* Current First Screen */}
          <div className="border-b border-semantic-border-secondary pb-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-xl md:text-2xl font-semibold text-black text-center tracking-[-0.48px] leading-[1.2]">
                  Current First screen
                </h3>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="w-[302px] h-[657px] rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={ASSETS.images.currentScreen}
                    alt="Current first screen"
                    width={302}
                    height={657}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced First Screen */}
          <div className="pt-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="w-[302px] h-[657px] rounded-md overflow-hidden">
                  <OptimizedImage
                    src={ASSETS.images.advancedScreen}
                    alt="Advanced first screen with instant input field"
                    width={302}
                    height={657}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black tracking-[-0.48px] leading-[1.2] max-w-2xl">
                  Advanced first screen with an instant input field for thought capturing
                </h3>
                {/* New Screen Badge */}
                <div className="mt-4">
                  <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW SCREEN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Flow in Action Section */}
      <Section className="py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black tracking-[-2.16px] leading-[1.2] mb-8">
            Flow in action
          </h2>
          <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2] mb-32 max-w-4xl mx-auto">
            Enhanced user engagement through strategic micro-interactions that reduce friction and improve task completion rates
          </p>
          <div className="flex justify-center">
            <div className="w-[250px] md:w-[320px] h-[540px] md:h-[690px] rounded-[40px] overflow-hidden">
              <VideoPlayer 
                src={ASSETS.videos.newFlow}
                poster={ASSETS.images.advancedScreen}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* KPI Metrics Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 text-center">
            <div className="space-y-5">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black tracking-[-2.16px] leading-[1.2]">
                Key performance metrics
              </h2>
              <p className="text-xl md:text-2xl font-medium text-semantic-text-primary tracking-[-0.48px] leading-[1.2] max-w-3xl mx-auto">
                Success metrics focused on user action count to quantify the impact of our optimization efforts
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-7 max-w-4xl mx-auto">
              <KPICard 
                title="Current flow"
                value="4"
                unit="actions"
              />
              <KPICard 
                title="New Flow"
                value="2"
                unit="actions"
                improvement="+50%"
                isOptimized={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Button */}
      <div className="pb-12"> 
        <NextProjectButton
          nextProjectPath="/projects/tuqqi-ai"
          nextProjectTitle="tuqqi ai"
          nextProjectDescription="adding intelligence to Tuqqi, while keeping the design simple and familiar"
          className="bg-white"
        />
      </div>
    </div>
  );
}