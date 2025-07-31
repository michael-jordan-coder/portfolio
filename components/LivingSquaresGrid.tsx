"use client";

import { useRef, useEffect, useState } from "react";
import "./LivingSquaresGrid.css";

interface LivingSquaresGridProps {
  items?: string[];
  gridSize?: number;
}

// Inline SVG fallbacks for common tech logos
const svgFallbacks = {
  gemini: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#6366f1"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">G</text>
  </svg>`,
  cursor: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#10b981"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">C</text>
  </svg>`,
  figma: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#f59e0b"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">F</text>
  </svg>`,
  tailwind: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#06b6d4"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">T</text>
  </svg>`,
  gsap: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#8b5cf6"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">G</text>
  </svg>`,
  claude: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#ef4444"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">C</text>
  </svg>`,
  next: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#000000"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">N</text>
  </svg>`,
  gpt: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#10a37f"/>
    <text x="32" y="40" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">G</text>
  </svg>`,
};

const fallbackKeys = ['gemini', 'cursor', 'figma', 'tailwind', 'gsap', 'claude', 'next', 'gpt'];

export default function LivingSquaresGrid({
  items = [],
  gridSize = 3,
}: LivingSquaresGridProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());

  // Calculate grid dimensions
  const totalSquares = gridSize * gridSize;
  const squares = Array.from({ length: totalSquares }, (_, i) => i);

  useEffect(() => {
    setIsClient(true);
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax and ScrollTrigger animation
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const initParallaxScrollTrigger = async () => {
      try {
        // Import GSAP and ScrollTrigger
        const gsap = (await import('gsap')).default;
        const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Set initial state for squares
        gsap.set(squaresRef.current.filter(Boolean), {
          opacity: 0,
          scale: 0.8,
          y: 30,
        });

        // Create timeline for staggered animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        });

        // Add squares to timeline with stagger
        tl.to(squaresRef.current.filter(Boolean), {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        });

        // Add parallax effect to each square
        squaresRef.current.forEach((square, index) => {
          if (!square) return;
          
          const { row, col } = getGridPosition(index);
          const parallaxSpeed = 0.5 + (row + col) * 0.1; // Different speed based on position
          
          gsap.to(square, {
            y: `${-50 * parallaxSpeed}px`,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          });
        });

        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

      } catch (error) {
        console.warn('GSAP ScrollTrigger not available:', error);
        // Fallback: simple fade in
        const squares = squaresRef.current.filter(Boolean);
        squares.forEach((square, index) => {
          if (square) {
            square.style.opacity = '0';
            square.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => {
              if (square) {
                square.style.transition = 'all 0.6s ease';
                square.style.opacity = '1';
                square.style.transform = 'scale(1) translateY(0)';
              }
            }, index * 100);
          }
        });
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(initParallaxScrollTrigger, 200);
    return () => clearTimeout(timer);
  }, [isClient, gridSize]);

  // Preload images with error handling
  useEffect(() => {
    if (!isClient) return;

    const preloadImages = async () => {
      console.log('🖼️ Starting image preload for LivingSquaresGrid:', items);
      
      const imagePromises = items.map((url, index) => {
        return new Promise<{ success: boolean; index: number; url: string }>((resolve) => {
          const img = new window.Image();
          
          img.onload = () => {
            console.log(`✅ Image loaded successfully: ${url}`);
            resolve({ success: true, index, url });
          };
          
          img.onerror = () => {
            console.error(`❌ Failed to load image: ${url}`);
            setImageLoadErrors(prev => new Set(prev).add(index));
            resolve({ success: false, index, url });
          };
          
          img.src = url;
        });
      });

      try {
        const results = await Promise.all(imagePromises);
        const failedImages = results.filter(result => !result.success);
        
        if (failedImages.length > 0) {
          console.warn('⚠️ Some images failed to load:', failedImages);
        } else {
          console.log('🎉 All images loaded successfully!');
        }
      } catch (error) {
        console.error('💥 Error during image preload:', error);
      }
    };

    preloadImages();
  }, [items, isClient]);

  const getImageForIndex = (index: number) => {
    return items[index % items.length] || '';
  };

  const getGridPosition = (index: number) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return { row, col };
  };

  const setSquareRef = (index: number) => (el: HTMLDivElement | null) => {
    squaresRef.current[index] = el;
  };

  const getFallbackSvg = (index: number) => {
    const fallbackIndex = index % fallbackKeys.length;
    const key = fallbackKeys[fallbackIndex];
    return svgFallbacks[key as keyof typeof svgFallbacks] || svgFallbacks.gemini;
  };

  // Render consistent structure for both server and client
  return (
    <div 
      ref={containerRef}
      className="living-squares-grid"
      style={{
        '--grid-size': gridSize,
      } as React.CSSProperties}
    >
      {squares.map((index) => {
        const { row, col } = getGridPosition(index);
        const imageUrl = getImageForIndex(index);
        const isHovered = hoveredIndex === index;
        const hasImageError = imageLoadErrors.has(index % items.length);
        
        return (
          <div
            key={index}
            ref={setSquareRef(index)}
            className={`square ${isHovered ? 'hovered' : ''} ${hasImageError ? 'image-error' : ''}`}
            style={{
              '--row': row,
              '--col': col,
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="square-content">
              {imageUrl && !hasImageError ? (
                <div 
                  className="square-image"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              ) : (
                <div 
                  className="square-fallback"
                  dangerouslySetInnerHTML={{ __html: getFallbackSvg(index) }}
                />
              )}
            </div>
          </div>
        );
      })}
      
      {/* Loading state - only show if not loaded yet */}
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
} 