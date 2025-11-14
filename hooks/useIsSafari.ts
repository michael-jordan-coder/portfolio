import { useState, useEffect } from 'react';
import { getIsSafari } from '../lib/safari-detection';

/**
 * React hook for Safari detection that ensures client-side detection
 * Prevents hydration mismatches by detecting Safari only on the client
 * 
 * SAFARI-ONLY: Used to apply performance optimizations that reduce GPU pressure
 * in Safari without affecting Chrome, Edge, Brave, or Firefox behavior
 */
export const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Only detect Safari on the client side after mount
    // This prevents hydration mismatches and ensures detection happens before render
    setIsSafari(getIsSafari());
  }, []);

  return isSafari;
};

