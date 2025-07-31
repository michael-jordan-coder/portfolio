import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ConnectorLine: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 200, strokeDashoffset: 200 },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div className="flex justify-center my-8" aria-hidden="true">
      <svg width="80" height="48" viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d="M10 10 Q40 38 70 10"
          stroke="url(#connector-gradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="connector-gradient" x1="10" y1="10" x2="70" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="1" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ConnectorLine; 