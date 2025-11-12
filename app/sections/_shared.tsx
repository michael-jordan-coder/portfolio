// Shared components and utilities for sections
import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

// Common section wrapper with noise overlay and gradient background
interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'responsive';
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, children, className = '', variant = 'default' }, ref) => {
    const baseClasses = "relative overflow-hidden";
    
    const variantClasses = {
      default: "py-20 bg-gradient-to-b from-black via-[#000000] to-black",
      hero: "min-h-screen flex items-center justify-center bg-black",
      responsive: "h-auto bg-gradient-to-b from-black via-[#060607] to-black flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-visible p-4 sm:p-6 pt-[15vh] sm:pt-[20vh] pb-[15vh] sm:pb-[20vh]"
    };

    return (
      <section ref={ref} id={id} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {variant !== 'hero' && <NoiseOverlay />}
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

// Reusable noise overlay component
export const NoiseOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-10" 
    style={{ backgroundImage: 'url(/noise.svg)' }} 
  />
);

// Reusable neon blob component
interface NeonBlobProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'custom';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colors: string[];
  opacity?: number;
  customClass?: string;
  animated?: boolean;
}

export const NeonBlob = ({ 
  position, 
  size = 'md', 
  colors, 
  opacity = 0.3, 
  customClass = '',
  animated = false
}: NeonBlobProps) => {
  const sizeClasses = {
    sm: 'w-[250px] h-[120px]',
    md: 'w-[350px] h-[180px]',
    lg: 'w-[450px] h-[280px]',
    xl: 'w-[920px] h-[280px]'
  };

  const positionClasses = {
    'top-left': 'left-1/4 top-1/4',
    'top-right': 'right-1/4 top-1/4',
    'bottom-left': 'left-1/3 bottom-1/4',
    'bottom-right': 'right-1/3 bottom-1/4',
    'center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'custom': customClass
  };

  const gradientColors = colors.join(', ');
  const baseClasses = `absolute rounded-full blur-3xl pointer-events-none z-0`;
  const posClass = position === 'custom' ? customClass : positionClasses[position];
  
  const Component = animated ? motion.div : 'div';
  
  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size]} ${posClass}`}
      style={{
        background: `linear-gradient(to right, ${gradientColors})`,
        opacity
      }}
      aria-hidden="true"
    />
  );
};

// Common parallax transforms
export const useParallaxTransforms = (scrollYProgress: any) => ({
  y1: scrollYProgress?.to?.([0, 1], [200, -100]),
  y2: scrollYProgress?.to?.([0, 1], [100, -50]),
  y3: scrollYProgress?.to?.([0, 1], [50, -25]),
  opacity: scrollYProgress?.to?.([0, 0.3, 0.7, 1], [0, 1, 1, 0]),
  scale: scrollYProgress?.to?.([0, 1], [1, 0.8])
});

// Common tool/tech stack items
export const TECH_STACK_ITEMS = [
  '/imagetrail/gemini.svg',
  '/imagetrail/cursor.svg',
  '/imagetrail/figma.svg',
  '/imagetrail/tailwind.svg',
  '/imagetrail/gsap.svg',
  '/imagetrail/claude.svg',
  '/imagetrail/next.svg',
  '/imagetrail/gpt.svg',
];
