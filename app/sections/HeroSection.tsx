'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Aurora from '../../components/Aurora';
import { Button } from '../../components/Button';
import DomeGallery from '../../components/DomeGallery';
import { useIsMobileDevice } from '../../lib/utils';

type OpenedImageDimensions = {
  width: string;
  height: string;
};

const getDimensionsForWidth = (viewportWidth: number): OpenedImageDimensions => {
  // Mobile-first defaults, then scale up
  if (viewportWidth < 640) {
    return { width: '90vw', height: '50vh' }; // mobile
  }

  if (viewportWidth < 1024) {
    return { width: '600px', height: '400px' }; // tablet
  }

  return { width: '900px', height: '500px' }; // desktop
};

const HeroSection: React.FC = () => {
  const router = useRouter();
  const isMobile = useIsMobileDevice();

  // Mobile-first default (for SSR + first paint)
  const [openedDimensions, setOpenedDimensions] = useState<OpenedImageDimensions>({
    width: '90vw',
    height: '50vh',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      setOpenedDimensions(getDimensionsForWidth(viewportWidth));
    };

    // init on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollToProjects = () => {
    if (typeof document === 'undefined') return;
    document.getElementById('smooth')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoToAbout = () => {
    router.push('/about');
  };

  return (
    <section
      id="hero"
      className="
        relative min-h-screen 
        flex flex-col items-center justify-center
        bg-black
        overflow-visible sm:overflow-hidden
        pt-6 pb-8 sm:pt-8 sm:pb-10
      "
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-10 h-[62vh]">
        <Aurora
          colorStops={['#7CFF67', '#FF2974', '#57BEFF']}
          amplitude={0.9}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center pt-20">
        {/* Header */}
        <header className="w-full text-center text-white">
          <h1
            className="
              w-full max-w-6xl mx-auto 
              px-2 sm:px-4 md:px-6 lg:px-8 
              mb-2 sm:mt-8 
              tracking-tight
            "
            style={{
              wordSpacing: '-0.02em',
              lineHeight: '0.9',
              textShadow: '0 0 30px rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="font-bold mb-2 leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
              }}
            >
              Ai/UX product Designer.
            </div>

            <p className="text-gray-400 font-regular text-base sm:text-2xl max-w-4xl mx-auto mb-4">
              {/* Mobile copy */}
              <span className="sm:hidden">
                A true designer finds the right questions to make the right decisions. Join me on this journey—it's messy,
                evolving, and fun.
              </span>
              {/* Desktop copy */}
              <span className="hidden sm:inline">
                A true designer finds the right questions to makes the right decisions, im passionate about this process. so
                please join me on this journey. its messy, evolving, and fun.
              </span>
            </p>
          </h1>
        </header>

        {/* CTA Buttons - Mobile: above DomeGallery, Desktop: below */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-0 mt-6 sm:mt-8 w-full sm:w-auto order-2 sm:order-3">
          <Button
            variant="hero"
            size="default"
            className="w-full sm:w-auto"
            onClick={handleScrollToProjects}
          >
            Explore Projects
          </Button>

          <Button
            variant="primary"
            size="default"
            className="w-full sm:w-auto"
            onClick={handleGoToAbout}
          >
            About me
          </Button>
        </div>

        {/* DomeGallery */}
        <div className="relative w-full max-w-5xl mx-auto h-[45vh] min-h-[260px] sm:h-[48vh] sm:min-h-[340px] md:h-[52vh] md:min-h-[420px] order-3 sm:order-2">
          <DomeGallery
            images={[
              {
                src: '/imagetrail/claude.svg',
                alt: 'Claude AI - My favorite copywriting tool, used for most of my projects',
              },
              {
                src: '/imagetrail/cursor.svg',
                alt: 'Cursor - the future of product design tools, used it for buildin this website, and building my own apps',
              },
              {
                src: '/imagetrail/figma.svg',
                alt: 'Figma - fun fact, i spend more time in figma then with my own family',
              },
              {
                src: '/imagetrail/gemini.svg',
                alt: 'Google Gemini - my favorite code assistant for 3d modeling',
              },
              {
                src: '/imagetrail/gpt.svg',
                alt: 'ChatGPT - literally my second brain',
              },
              {
                src: '/imagetrail/gsap.svg',
                alt: 'GSAP - The best animation library that i ever used',
              },
              {
                src: '/imagetrail/next.svg',
                alt: 'Next.js - favorite framework for websites, and saaS applications',
              },
              {
                src: '/imagetrail/swift.svg',
                alt:
                  'SwiftUI - The standart way to build iOS apps, with an amazing design system, that is insparation for me',
              },
              {
                src: '/imagetrail/tailwind.svg',
                alt: 'my life saver for styling when i want my code to be clean and readable',
              },
            ]}
            fit={0.5}
            segments={isMobile ? 20 : 30}
            maxVerticalRotationDeg={8}
            dragSensitivity={25}
            grayscale={false}
            imageBorderRadius="20px"
            openedImageBorderRadius="30px"
            openedImageWidth={openedDimensions.width}
            openedImageHeight={openedDimensions.height}
            disableInteractions={isMobile}
            reduceAnimations={isMobile}
            autoRotate={isMobile}
            autoRotateSpeed={0.05}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
