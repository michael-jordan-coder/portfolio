'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useIsMobileDevice } from '../../../lib/utils';

interface ImageComparisonSliderProps {
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  initialPosition?: number;
  handleColor?: string;
  handleSize?: number;
  dividerWidth?: number;
  showHandle?: boolean;
  className?: string;
}

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  initialPosition = 50,
  handleColor = '#FFFFFF',
  handleSize = 40,
  dividerWidth = 3,
  showHandle = true,
  className = '',
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobileDevice();
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const updatePositionFromEvent = useCallback(
    (e: MouseEvent | React.MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // MOBILE-ONLY: Handle touch events, Desktop: Handle mouse events
      let clientX = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      } else if ('clientX' in e) {
        clientX = e.clientX;
      }
      const x = clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // MOBILE-ONLY: Don't preventDefault on mobile to allow native scroll
    // Desktop: Keep preventDefault for drag behavior
    if (!isMobile) {
      e.preventDefault();
    }
    
    // Track start position for gesture detection on mobile
    if (isMobile && 'touches' in e && e.touches.length > 0) {
      startPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (isMobile && 'clientX' in e) {
      startPosRef.current = { x: e.clientX, y: e.clientY };
    }
    
    setIsDragging(true);
  }, [isMobile]);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      // MOBILE-ONLY: Detect if user is scrolling vertically vs dragging horizontally
      // Desktop: Process all drag events as before
      if (isMobile && startPosRef.current) {
        let currentX = 0, currentY = 0;
        if ('touches' in e && e.touches.length > 0) {
          currentX = e.touches[0].clientX;
          currentY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          currentX = e.clientX;
          currentY = e.clientY;
        }
        
        const dx = Math.abs(currentX - startPosRef.current.x);
        const dy = Math.abs(currentY - startPosRef.current.y);
        
        // If vertical movement is greater, user is scrolling - don't update slider
        if (dy > dx && dy > 10) {
          return; // User is scrolling, not dragging slider
        }
      }
      
      updatePositionFromEvent(e);
    },
    [isDragging, updatePositionFromEvent, isMobile]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) {
        updatePositionFromEvent(e);
      }
    },
    [isDragging, updatePositionFromEvent]
  );

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => {
        startPosRef.current = null;
        handleMouseUp();
      };
      const handleGlobalTouchMove = (e: TouchEvent) => handleMouseMove(e);
      const handleGlobalTouchEnd = () => {
        startPosRef.current = null;
        handleMouseUp();
      };

      // MOBILE-ONLY: Add touch listeners on mobile, mouse listeners on desktop
      // Desktop: Keep mouse listeners as before
      if (isMobile) {
        window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
        window.addEventListener('touchend', handleGlobalTouchEnd);
      } else {
        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
      }

      return () => {
        if (isMobile) {
          window.removeEventListener('touchmove', handleGlobalTouchMove);
          window.removeEventListener('touchend', handleGlobalTouchEnd);
        } else {
          window.removeEventListener('mousemove', handleGlobalMouseMove);
          window.removeEventListener('mouseup', handleGlobalMouseUp);
        }
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-pointer ${
        isDragging ? 'cursor-ew-resize' : ''
      } ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      role="slider"
      aria-valuenow={position}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Image comparison slider"
      tabIndex={0}
    >
      {/* After Image (Full) */}
      <div className="relative">
        <Image
          src={afterImage.src}
          alt={afterImage.alt}
          width={800}
          height={600}
          className="w-full h-auto object-contain"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          width={800}
          height={600}
          className="w-full h-auto object-contain"
          draggable={false}
        />
      </div>

      {/* Vertical Divider */}
      <div
        className="absolute top-0 h-full cursor-ew-resize z-10 shadow-lg"
        style={{
          left: `${position}%`,
          width: `${dividerWidth}px`,
          backgroundColor: handleColor,
          transform: `translateX(-${dividerWidth / 2}px)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />

      {/* Draggable Handle */}
      {showHandle && (
        <div
          className="absolute top-1/2 z-20 flex items-center justify-center cursor-ew-resize rounded-full shadow-lg border-2"
          style={{
            left: `${position}%`,
            width: `${handleSize}px`,
            height: `${handleSize}px`,
            backgroundColor: handleColor,
            borderColor: handleColor,
          transform: `translate(-${handleSize / 2}px, -${handleSize / 2}px)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
          <svg
            width={handleSize * 0.5}
            height={handleSize * 0.5}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0, 0, 0, 0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      )}
    </div>
  );
}

