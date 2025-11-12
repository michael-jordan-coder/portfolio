/**
 * Animation utility functions for conditional animations based on device type
 * and user accessibility preferences
 */

/**
 * Determines if animations should be enabled
 * @param isMobile - Whether the current device is mobile
 * @param prefersReducedMotion - Whether the user prefers reduced motion
 * @returns boolean - true if animations should be enabled, false otherwise
 */
export const shouldAnimate = (isMobile: boolean, prefersReducedMotion: boolean): boolean => {
  return !isMobile && !prefersReducedMotion;
};

/**
 * Gets the appropriate animation duration based on device and preferences
 * @param isMobile - Whether the current device is mobile
 * @param prefersReducedMotion - Whether the user prefers reduced motion
 * @param baseDuration - The base duration in seconds
 * @returns number - The adjusted duration in seconds
 */
export const getAnimationDuration = (
  isMobile: boolean, 
  prefersReducedMotion: boolean, 
  baseDuration: number
): number => {
  if (prefersReducedMotion) return 0.01;
  if (isMobile) return baseDuration * 0.3; // Faster on mobile
  return baseDuration;
};

/**
 * Gets the appropriate animation easing function
 * @param isMobile - Whether the current device is mobile
 * @param prefersReducedMotion - Whether the user prefers reduced motion
 * @param baseEase - The base easing function (default: 'power2.out' for GSAP)
 * @returns string - The easing function to use
 */
export const getAnimationEase = (
  isMobile: boolean, 
  prefersReducedMotion: boolean, 
  baseEase: string = 'power2.out'
): string => {
  if (prefersReducedMotion || isMobile) return 'none';
  return baseEase;
};

