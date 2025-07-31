"use client";

import { useRef, useEffect, useState } from "react";
import "./ImageTrail.css";

interface SimpleImageTrailProps {
  items?: string[];
}

export default function SimpleImageTrail({
  items = [],
}: SimpleImageTrailProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % items.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="content" ref={containerRef}>
        <div className="text-white text-center py-8">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div className="content" ref={containerRef}>
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-2 rounded text-xs z-50">
        Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})<br/>
        Current: {currentImageIndex + 1}/{items.length}<br/>
        Image: {items[currentImageIndex]}
      </div>

      {/* Current image */}
      <div 
        className="content__img"
        style={{
          opacity: 1,
          transform: `translate(${mousePos.x - 95}px, ${mousePos.y - 95}px)`,
          zIndex: 1000,
        }}
      >
        <div
          className="content__img-inner"
          style={{ backgroundImage: `url(${items[currentImageIndex]})` }}
        />
      </div>

      {/* All images for debugging */}
      {items.map((url, i) => (
        <div 
          key={i}
          className="content__img"
          style={{
            opacity: i === currentImageIndex ? 0.5 : 0.1,
            transform: `translate(${i * 100}px, 0px)`,
            zIndex: 100 + i,
          }}
        >
          <div
            className="content__img-inner"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}
    </div>
  );
} 