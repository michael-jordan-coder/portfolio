"use client";

import { useEffect, useState } from 'react';

interface CustomCursorProps {
  isVisible: boolean;
  toolName: string;
  description: string;
  position: { x: number; y: number };
}

export default function CustomCursor({ isVisible, toolName, description, position }: CustomCursorProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
      style={{
        left: position.x + 20,
        top: position.y - 20,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Tooltip */}
      <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-2xl max-w-xs">
        <div className="text-white font-semibold text-sm mb-2">{toolName}</div>
        <div className="text-gray-300 text-xs leading-relaxed">{description}</div>
        
        {/* Arrow pointing to cursor */}
        <div className="absolute -left-2 top-6 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/90" />
      </div>
    </div>
  );
}
