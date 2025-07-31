"use client";

import { useState, useEffect } from 'react';

interface ImageTestProps {
  images: string[];
}

export default function ImageTest({ images }: ImageTestProps) {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  useEffect(() => {
    images.forEach((imageUrl) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => [...prev, imageUrl]);
        console.log('✅ Image loaded successfully:', imageUrl);
      };
      img.onerror = () => {
        setFailedImages(prev => [...prev, imageUrl]);
        console.error('❌ Image failed to load:', imageUrl);
      };
      img.src = imageUrl;
    });
  }, [images]);

  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Image Loading Test</h3>
      <div className="text-sm">
        <div className="mb-2">
          <span className="text-green-400">✅ Loaded ({loadedImages.length}):</span>
          {loadedImages.map((img, i) => (
            <div key={i} className="ml-2 text-xs">{img}</div>
          ))}
        </div>
        <div>
          <span className="text-red-400">❌ Failed ({failedImages.length}):</span>
          {failedImages.map((img, i) => (
            <div key={i} className="ml-2 text-xs">{img}</div>
          ))}
        </div>
      </div>
    </div>
  );
} 