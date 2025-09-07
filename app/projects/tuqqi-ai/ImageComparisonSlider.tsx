'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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

  const updatePositionFromEvent = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      updatePositionFromEvent(e);
    },
    [isDragging, updatePositionFromEvent]
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
      const handleGlobalMouseUp = () => handleMouseUp();

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-pointer ${
        isDragging ? 'cursor-ew-resize' : ''
      } ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
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