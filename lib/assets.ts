/**
 * Asset management utilities for optimized Vercel deployment
 */

// Base path for all case study assets
export const ASSETS_BASE_PATH = '/notes-app/Casestudy';

// Image asset paths with type safety
export const images = {
  userflow1: `${ASSETS_BASE_PATH}/images/userflow-1.png`,
  currentScreen: `${ASSETS_BASE_PATH}/images/current-screen.png`,
  advancedScreen: `${ASSETS_BASE_PATH}/images/advanced-screen.png`,
  lovable: `${ASSETS_BASE_PATH}/images/lovable.png`,
  base44: `${ASSETS_BASE_PATH}/images/base-44.png`,
  bolt: `${ASSETS_BASE_PATH}/images/bolt.png`,
} as const;

// Video asset paths
export const videos = {
  currentFlow: `${ASSETS_BASE_PATH}/video/current-flowvid.mp4`,
  newFlow: `${ASSETS_BASE_PATH}/video/new-flowvid.mp4.mp4`,
} as const;

// Optimized image dimensions for Next.js Image component
export const imageDimensions = {
  userflow1: { width: 1200, height: 600 },
  currentScreen: { width: 302, height: 657 },
  advancedScreen: { width: 302, height: 657 },
  lovable: { width: 500, height: 400 },
  base44: { width: 500, height: 400 },
  bolt: { width: 500, height: 400 },
} as const;

// Image optimization settings
export const imageOptimization = {
  // Priority images that should be loaded first
  priority: ['userflow1', 'currentScreen', 'advancedScreen'],
  
  // Images that can be lazy loaded
  lazy: ['lovable', 'base44', 'bolt'],
  
  // Quality settings for different image types
  quality: {
    hero: 90,
    screenshots: 85,
    diagrams: 80,
  },
} as const;

// Video optimization settings
export const videoOptimization = {
  // Preload settings
  preload: 'metadata' as const,
  
  // Poster images for videos
  posters: {
    currentFlow: `${ASSETS_BASE_PATH}/images/current-screen.png`,
    newFlow: `${ASSETS_BASE_PATH}/images/advanced-screen.png`,
  },
  
  // Video formats for better browser support
  formats: ['mp4', 'webm'] as const,
} as const;

// Utility function to get optimized image props
export function getOptimizedImageProps(
  imageKey: keyof typeof images,
  options: {
    priority?: boolean;
    quality?: number;
    sizes?: string;
  } = {}
) {
  const { priority = false, quality = 85, sizes = '100vw' } = options;
  
  return {
    src: images[imageKey],
    alt: `${imageKey} image`,
    width: imageDimensions[imageKey].width,
    height: imageDimensions[imageKey].height,
    priority,
    quality,
    sizes,
  };
}

// Utility function to get optimized video props
export function getOptimizedVideoProps(
  videoKey: keyof typeof videos,
  options: {
    poster?: string;
    preload?: 'none' | 'metadata' | 'auto';
  } = {}
) {
  const { 
    poster = videoOptimization.posters[videoKey as keyof typeof videoOptimization.posters],
    preload = videoOptimization.preload 
  } = options;
  
  return {
    src: videos[videoKey],
    poster,
    preload,
    controls: true,
    playsInline: true,
  };
}

// Type exports for better TypeScript support
export type ImageKey = keyof typeof images;
export type VideoKey = keyof typeof videos;
export type ImageDimensionKey = keyof typeof imageDimensions;
