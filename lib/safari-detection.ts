/**
 * Safari detection utility
 * Detects Safari desktop and iOS, excludes Chrome/Chromium
 * 
 * SAFARI-ONLY: Used to apply performance optimizations that reduce GPU pressure
 * in Safari without affecting Chrome, Edge, Brave, or Firefox behavior
 */

let safariCache: boolean | null = null;

/**
 * Detects Safari (desktop + iOS) reliably
 * Returns false for Chrome, Edge, Brave, Firefox, and other Chromium browsers
 */
export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  if (safariCache !== null) return safariCache;
  
  const ua = navigator.userAgent.toLowerCase();
  const isSafariUA = /safari/.test(ua) && !/chrome/.test(ua) && !/chromium/.test(ua);
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMacSafari = /macintosh/.test(ua) && isSafariUA;
  
  // Safari-specific API check
  const hasSafariAPIs = 
    '-webkit-touch-callout' in document.documentElement.style ||
    (window as any).safari !== undefined;
  
  safariCache = (isSafariUA || isIOS || isMacSafari) && hasSafariAPIs;
  return safariCache;
}

/**
 * Memoized Safari detection (call once, reuse)
 * Use this in React components to avoid repeated detection calls
 */
export function getIsSafari(): boolean {
  return isSafari();
}

