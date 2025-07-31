import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface SceneBlockProps {
  text: string;
  image: {
    src: string;
    alt: string;
    detail: string;
  };
  animation: 'fade' | 'bounce' | 'scale' | 'shimmer';
  animationDuration: number;
  bgColor: string;
  quotes: string[];
}

const animationVariants = {
  fade: (el: HTMLElement, img: HTMLElement, duration: number) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 64 },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      img,
      { autoAlpha: 0, scale: 0.92 },
      {
        autoAlpha: 1,
        scale: 1,
        duration,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
  bounce: (el: HTMLElement, img: HTMLElement, duration: number) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 64 },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      img,
      { autoAlpha: 0, y: 40, scale: 0.9 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration,
        delay: 0.3,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
  scale: (el: HTMLElement, img: HTMLElement, duration: number) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 0.96 },
      {
        autoAlpha: 1,
        scale: 1,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      img,
      { autoAlpha: 0, scale: 0.85, rotate: -6 },
      {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration,
        delay: 0.3,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
  shimmer: (el: HTMLElement, img: HTMLElement, duration: number) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, x: -32 },
      {
        autoAlpha: 1,
        x: 0,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      img,
      { autoAlpha: 0, filter: 'brightness(1.5) blur(2px)' },
      {
        autoAlpha: 1,
        filter: 'brightness(1) blur(0px)',
        duration,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
};

const SceneBlock: React.FC<SceneBlockProps> = ({ text, image, animation, animationDuration, bgColor, quotes }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const detailId = `${image.alt.replace(/\s+/g, '-')}-detail`;

  useEffect(() => {
    if (!textRef.current || !imgRef.current) return;
    animationVariants[animation](textRef.current, imgRef.current, animationDuration);
  }, [animation, animationDuration]);

  // Cycle quote on click/hover
  const handleQuoteCycle = () => {
    if (quotes.length > 1) {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <div
        ref={imgRef}
        className={`relative w-full max-w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto aspect-[16/9] will-change-transform ${bgColor}`}
      >
        <div
          tabIndex={0}
          aria-describedby={showDetail ? detailId : undefined}
          className="w-full h-full rounded-3xl shadow-2xl object-cover bg-white cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onMouseEnter={() => setShowDetail(true)}
          onMouseLeave={() => setShowDetail(false)}
          onFocus={() => setShowDetail(true)}
          onBlur={() => setShowDetail(false)}
          onClick={handleQuoteCycle}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full rounded-3xl object-cover"
            draggable={false}
          />
          {/* Overlay detail/quote */}
          <div
            id={detailId}
            className={`absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-center rounded-3xl transition-opacity duration-300 pointer-events-none ${showDetail ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!showDetail}
            onMouseEnter={quotes.length > 1 ? handleQuoteCycle : undefined}
          >
            <span className="text-sm font-medium mb-2">{image.detail}</span>
            <span className="italic text-pink-200 select-none">{quotes[quoteIdx]}</span>
            {quotes.length > 1 && (
              <span className="block mt-2 text-xs text-pink-100/70">(לחץ/י להחלפת ציטוט)</span>
            )}
          </div>
        </div>
      </div>
      <div
        ref={textRef}
        className="w-full max-w-2xl mx-auto text-center will-change-transform"
      >
        <p className="text-lg md:text-xl font-light text-gray-300">{text}</p>
      </div>
    </div>
  );
};

export default SceneBlock; 