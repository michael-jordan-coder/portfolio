import React, { useEffect, useRef } from 'react';

// Animated gradient using CSS and a moving noise overlay
const LivingBackground: React.FC = () => {
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let running = true;
    const animate = () => {
      if (noiseRef.current) {
        noiseRef.current.style.backgroundPosition = `${frame % 200}px ${frame % 200}px`;
      }
      frame += 1;
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Multiple distributed neon glows */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 400px at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle 250px at 80% 20%, rgba(34, 197, 194, 0.12) 0%, transparent 50%),
            radial-gradient(circle 480px at 60% 70%, rgba(139, 69, 219, 0.10) 0%, transparent 50%),
            radial-gradient(circle 520px at 10% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle 260px at 90% 60%, rgba(34, 197, 194, 0.09) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle overall glow */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, rgba(34, 197, 194, 0.05) 50%, rgba(139, 69, 219, 0.04) 100%)'
        }}
      />
      
      {/* Moving noise overlay */}
      <div
        ref={noiseRef}
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: 'url(/noise.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default LivingBackground; 