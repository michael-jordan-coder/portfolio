'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/Button';
import { SectionWrapper, NeonBlob } from './_shared';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  url: string;
  category: string;
}

// Projects data
const PROJECTS: Project[] = [
  { id: 'keychain', title: 'KEYCHAIN SaaS Dashboard', description: 'An advanced SaaS dashboard with workspace management, secure authentication, and comprehensive analytics for modern businesses.', image: '/keychain/overview.png', video: '/keychain/full-hero.mp4', url: '/projects/keychain-saas-dashboard', category: 'UI' },
  { id: 'clara', title: 'Clara AI', description: 'A 24/7 AI-powered social media manager that helps creators plan, design, and publish content through natural conversation.', image: '/clara/clara-header.png', url: '/projects/clara', category: 'UI' },
  { id: 'alpha', title: 'Adding AI to Tuqqi.com', description: 'Adding intelligence to Tuqqi, while keeping the design simple and familiar', image: '/tuqqi/tuqqi-car.png', url: '/projects/tuqqi-ai', category: 'Web App - B2B' },
  { id: 'beta', title: '3D Hand Tracking Game', description: 'Real-time hand gesture recognition with 3D visualization and interactive controls.', image: '/3d.webp', url: '/projects/web-3d', category: 'Bonus Project!' }
];

// Project route mapping
const PROJECT_ROUTES = { alpha: '/projects/tuqqi-ai', clara: '/projects/clara', keychain: '/projects/keychain-saas-dashboard', beta: '/projects/web-3d' };

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // Define button colors based on project ID - professional neutral palette
  const getButtonColors = (projectId: string) => {
    switch (projectId) {
      case 'alpha':
        return {
          hover: 'bg-neutral-700 hover:bg-neutral-600',
          background: 'from-neutral-700/20 to-neutral-800/10',
          secondary: 'from-neutral-600/10 to-transparent'
        };
      case 'clara':
        return {
          hover: 'bg-neutral-700 hover:bg-neutral-600',
          background: 'from-neutral-700/20 to-neutral-800/10',
          secondary: 'from-neutral-600/10 to-transparent'
        };
      case 'keychain':
        return {
          hover: 'bg-neutral-700 hover:bg-neutral-600',
          background: 'from-neutral-700/20 to-neutral-800/10',
          secondary: 'from-neutral-600/10 to-transparent'
        };
      case 'beta':
        return {
          hover: 'bg-neutral-700 hover:bg-neutral-600',
          background: 'from-neutral-700/20 to-neutral-800/10',
          secondary: 'from-neutral-600/10 to-transparent'
        };
      default:
        return {
          hover: 'bg-neutral-700 hover:bg-neutral-600',
          background: 'from-neutral-700/20 to-neutral-800/10',
          secondary: 'from-neutral-600/10 to-transparent'
        };
    }
  };

  const buttonColors = getButtonColors(project.id);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Ensure scroll to top on route changes
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  const handleProjectClick = () => {
    const route = PROJECT_ROUTES[project.id as keyof typeof PROJECT_ROUTES];
    if (route) {
      // Scroll to top immediately before navigation using Lenis if available
      const lenis = (window as any).lenis || (document.body as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      
      router.push(route);
      
      // Additional scroll after navigation (handled by useScrollToTopOnNavigation hook in destination page)
      // This setTimeout ensures scroll happens even if hook hasn't fired yet
      setTimeout(() => {
        const lenisAfter = (window as any).lenis || (document.body as any).__lenis;
        if (lenisAfter) {
          lenisAfter.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 100);
    } else {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl h-auto rounded-2xl sm:rounded-[32px] overflow-hidden shadow-lg bg-white/5 backdrop-blur-md border border-white/10 will-change-transform cursor-pointer transition-all duration-300 hover:bg-white/8 hover:shadow-xl group origin-center"
      initial={{ scale: 0.75 }}
      animate={{ scale: 0.75 }}
      onClick={handleProjectClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick();
        }
      }}
      whileHover={{ 
        scale: 0.7575,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full flex flex-col">
        {project.video ? (
          // Video container - flexible height, grows taller
          <div className="relative w-full min-h-[200px] sm:min-h-[280px] flex-1 bg-neutral-800 overflow-hidden">
            <motion.video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover will-change-transform"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            {/* Fallback image for browsers that don't support video */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ) : (
          // Image container - flexible height, grows taller
          <div className="relative w-full min-h-[200px] sm:min-h-[280px] flex-1 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover will-change-transform"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        )}
        
        {/* Dedicated black content area at bottom - responsive height */}
        <div className="relative w-full min-h-[200px] sm:h-[225px] bg-black flex flex-col justify-center p-4 sm:p-6 md:p-8">
          <div className="space-y-2 sm:space-y-3">
            {/* Static title - professional typography */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.2] tracking-tight">
              {project.title}
            </h3>
            
            {/* Always-visible description */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-regular text-white/90 line-clamp-2">
                {project.description}
              </p>
              
              {/* Button - subtle when not hovered, professional on hover */}
              <div className="pt-1 sm:pt-2 mt-2 sm:mt-4">
                <Button
                  variant="primary"
                  className={`relative overflow-hidden rounded-full font-semibold px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm transition-all duration-200 focus:ring-2 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] ${
                    isHovered 
                      ? `${buttonColors.hover} text-white border border-white/20` 
                      : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white/90'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const route = PROJECT_ROUTES[project.id as keyof typeof PROJECT_ROUTES];
                    if (route) {
                      // Scroll to top immediately before navigation using Lenis if available
                      const lenis = (window as any).lenis || (document.body as any).__lenis;
                      if (lenis) {
                        lenis.scrollTo(0, { immediate: true });
                      } else {
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                      }
                      
                      router.push(route);
                      
                      // Additional scroll after navigation (handled by useScrollToTopOnNavigation hook in destination page)
                      // This setTimeout ensures scroll happens even if hook hasn't fired yet
                      setTimeout(() => {
                        const lenisAfter = (window as any).lenis || (document.body as any).__lenis;
                        if (lenisAfter) {
                          lenisAfter.scrollTo(0, { immediate: true });
                        } else {
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }
                      }, 100);
                    } else {
                      window.open(project.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Project
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Fixed category badge at bottom-right */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-white/70 text-[10px] sm:text-xs font-medium tracking-wide">
              {project.category}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Individual Card with Center-based Animation
const AnimatedCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const centerProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Always call all hooks unconditionally to follow Rules of Hooks
  const yAnimated = useTransform(centerProgress, [0, 1], [50, 0]);
  const opacityAnimated = useTransform(centerProgress, [0, 1], [0.3, 1]);
  const scaleAnimated = useTransform(centerProgress, [0, 1], [0.3, 1.1]);
  const zIndexAnimated = useTransform(centerProgress, [0, 1], [1, 10]);
  const filterAnimated = useTransform(centerProgress, [0, 1], ['blur(3px)', 'blur(0px)']);
  
  const ySimple = useTransform(centerProgress, [0, 1], [20, 0]);
  const opacitySimple = useTransform(centerProgress, [0, 1], [0.5, 1]);
  
  // Conditionally use the transforms based on shouldAnimate
  const animations = shouldAnimate ? {
    y: yAnimated,
    opacity: opacityAnimated,
    scale: scaleAnimated,
    zIndex: zIndexAnimated,
    filter: filterAnimated
  } : {
    y: ySimple,
    opacity: opacitySimple,
    scale: 1,
    zIndex: 1,
    filter: 'blur(0px)'
  };

  return (
    <motion.div ref={cardRef} className="h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center px-3 sm:px-4" style={animations}>
      <ProjectCard project={project} />
    </motion.div>
  );
};

// Deterministic floating elements (no hydration issues)
const FLOATING_ELEMENTS = [
  { left: 18.6, top: 42.9, delay: 0 },
  { left: 71.0, top: 98.3, delay: 100 },
  { left: 45.2, top: 15.7, delay: 200 },
  { left: 82.4, top: 67.1, delay: 50 },
  { left: 12.8, top: 78.9, delay: 150 },
  { left: 59.3, top: 34.2, delay: 75 },
  { left: 33.7, top: 89.4, delay: 125 },
  { left: 76.9, top: 23.6, delay: 175 },
  { left: 25.1, top: 56.8, delay: 25 },
  { left: 68.5, top: 12.3, delay: 225 },
  { left: 41.9, top: 73.5, delay: 100 },
  { left: 87.2, top: 45.7, delay: 50 },
  { left: 19.4, top: 91.2, delay: 200 },
  { left: 54.6, top: 28.4, delay: 150 },
  { left: 92.1, top: 64.8, delay: 75 }
];

// Main Carousel Component
const SmoothCarousel: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const transforms = {
    y1: useTransform(scrollYProgress, [0, 1], [isMobile ? 50 : 200, isMobile ? -25 : -100]),
    y2: useTransform(scrollYProgress, [0, 1], [isMobile ? 25 : 100, isMobile ? -12 : -50]),
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  };

  // Pre-calculate all transforms for floating elements to avoid hooks in loops
  const floatingTransforms = FLOATING_ELEMENTS.map((element, i) => 
    useTransform(scrollYProgress, [0, 1], [0, -200 - element.delay])
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <SectionWrapper id="smooth">
      <NeonBlob position="custom" customClass="right-1/3 bottom-1/4 -rotate-12" size="md" colors={['#a855f7', '#ec4899', '#ef4444']} opacity={0.4} animated={shouldAnimate} />
      <NeonBlob position="custom" customClass="left-1/3 top-1/2 rotate-6" size="sm" colors={['#06b6d4', '#3b82f6', '#6366f1']} opacity={0.3} animated={shouldAnimate} />
      {/* Only render floating elements on client and if not mobile to avoid hydration issues */}
      {isClient && !isMobile && (
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: transforms.opacity }}>
          {FLOATING_ELEMENTS.map((element, i) => (
            <motion.div 
              key={i} 
              className="absolute w-2 h-2 bg-white/10 rounded-sm rotate-45" 
              style={{ 
                left: `${element.left}%`, 
                top: `${element.top}%`,
                y: floatingTransforms[i]
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: element.delay / 1000 }}
            />
          ))}
        </motion.div>
      )}
      
      <motion.div className="text-center text-white pt-4 px-4" style={{ y: transforms.y2, opacity: transforms.opacity }}>
        {shouldAnimate ? (
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4" 
            aria-live="polite"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Project Showcase
          </motion.h2>
        ) : (
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4" 
            aria-live="polite"
          >
            Project Showcase
          </h2>
        )}
        {shouldAnimate ? (
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            Experience the last projects i worked on
          </motion.p>
        ) : (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto">
            Experience the last projects i worked on
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 sm:py-10">
          <div className="text-white/80 text-xs sm:text-sm">{PROJECTS.length} projects</div>
        </div>
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }} />
      <div className="relative w-full max-w-4xl mx-auto" aria-label="Project carousel" role="region" aria-live="polite" aria-atomic="true">
        {PROJECTS.map((project, index) => (<AnimatedCard key={project.id} project={project} index={index} />))}
      </div>
    </SectionWrapper>
  );
};

// Main Component Export
const SmoothSection: React.FC = () => {
  return <SmoothCarousel />;
};

export default SmoothSection;