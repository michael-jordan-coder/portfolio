import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const SignatureBlock: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [smile, setSmile] = useState(true);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  // Bounce+rotate on hover
  const handleMouseEnter = () => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        y: -12,
        rotate: 8,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };
  // Return to normal on mouse leave
  const handleMouseLeave = () => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        y: 0,
        rotate: 0,
        duration: 0.4,
        ease: 'elastic.out(1,0.5)',
      });
    }
  };
  // Shake and toggle smile on click
  const handleClick = () => {
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current,
        { x: -6 },
        { x: 6, duration: 0.08, yoyo: true, repeat: 3, ease: 'power1.inOut', onComplete: () => {
          gsap.to(svgRef.current, { x: 0, duration: 0.1 });
        }}
      );
    }
    setSmile((s) => !s);
  };

  return (
    <div ref={ref} className="mt-16 flex flex-col items-center gap-4">
      <div className="w-24 h-24">
        <svg
          ref={svgRef}
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full cursor-pointer select-none"
          tabIndex={0}
          aria-label="Friendly avatar illustration"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          {/* Face circle */}
          <circle cx="48" cy="48" r="44" fill="#fff" stroke="#ec4899" strokeWidth="4" />
          {/* Eyes */}
          <ellipse cx="34" cy="44" rx="5" ry="7" fill="#ec4899" />
          <ellipse cx="62" cy="44" rx="5" ry="7" fill="#ec4899" />
          {/* Smile or neutral */}
          {smile ? (
            <path d="M34 62 Q48 74 62 62" stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M34 68 Q48 58 62 68" stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* Blush */}
          <ellipse cx="28" cy="56" rx="3" ry="1.5" fill="#f9a8d4" opacity="0.5" />
          <ellipse cx="68" cy="56" rx="3" ry="1.5" fill="#f9a8d4" opacity="0.5" />
        </svg>
      </div>
      <span className="text-lg text-pink-200 font-medium transition-opacity duration-700">Thanks for reading my story. <span className="inline-block">Let’s create something together!</span></span>
    </div>
  );
};

export default SignatureBlock; 