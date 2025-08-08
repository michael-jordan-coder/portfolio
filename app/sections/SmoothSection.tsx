'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollToButton } from '@/components/ScrollToButton';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/Button';
import { ensureScrollToTop } from '@/lib/utils';

// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
}

// Sample projects data
const PROJECTS: Project[] = [
  {
    id: 'alpha',
    title: 'Tuqqi chat view refreshed Design',
    description: 'A refreshed design for the chat view in Tuqqi, a work management platform',
    image: '/projects/tuqqi.svg',
    url: '/projects/alpha',
    category: 'Web App - B2B'
  },
  {
    id: 'gamma',
    title: 'Dashboard OS',
    description: 'A comprehensive design system for modern dashboard interfaces with component library and design tokens',
    image: '/dashboard-os/dashboard-os.png',
    url: '/projects/gamma',
    category: 'Design System'
  },
  {
    id: 'beta',
    title: 'Design System (Figma)',
    description: 'A modern, production-ready design system published on Figma Community.',
    image: '/projects/ink.svg',
    url: '/projects/beta',
    category: 'Design System'
  },
  
  
 
];

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const router = useRouter();
  const handleProjectClick = () => {
    if (project.id === 'alpha') {
      router.push('/projects/alpha');
      // Ensure scroll to top after navigation
      setTimeout(() => {
        ensureScrollToTop();
      }, 100);
    } else if (project.id === 'gamma') {
      router.push('/projects/gamma');
      // Ensure scroll to top after navigation
      setTimeout(() => {
        ensureScrollToTop();
      }, 100);
    } else if (project.id === 'beta') {
      router.push('/projects/beta');
      setTimeout(() => {
        ensureScrollToTop();
      }, 100);
    } else {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Detect if this is the first, second, or third project and render special content
  const isVideo = project.id === 'alpha';
  const isFigma = project.id === 'beta';

  return (
    <div
      className="w-full h-[400px] rounded-[40px] overflow-hidden 
                 shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                 will-change-transform cursor-pointer transition-all duration-300
                 hover:bg-white/20 hover:shadow-2xl group"
      onClick={handleProjectClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick();
        }
      }}
    >
      <div className="relative w-full h-full">
        {isVideo ? (
          <iframe
            src="https://www.youtube.com/embed/Vymd01oztPg?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=Vymd01oztPg"
            className="w-full h-full object-fill"
            style={{ pointerEvents: 'none', border: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Project Alpha Video"
          />
        ) : isFigma ? (
          <div className="w-full h-full overflow-hidden relative">
            <iframe
              src="https://www.figma.com/community/file/1535743654409682396/design-system"
              className="w-full h-full object-fill scale-[1.15] -translate-y-4"
              style={{ pointerEvents: 'none', border: 'none', minHeight: '100%', minWidth: '100%' }}
              title="Design System Figma Community File"
              scrolling="no"
            />
            <style jsx>{`
              iframe::-webkit-scrollbar { display: none; }
              iframe { scrollbar-width: none; }
            `}</style>
          </div>
        ) : (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1, y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
            whileHover={{ scale: 1.08, y: -10, boxShadow: '0 8px 32px rgba(80,90,228,0.15)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 pointer-events-none" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 group-hover:backdrop-blur-xl transition-all duration-300">
          <div className="space-y-3">
            {/* Category badge */}
            <span className="inline-block bg-white/30 backdrop-blur-lg text-white font-medium text-xs px-3 py-1 rounded-full drop-shadow-lg">
              {project.category}
            </span>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-white text-sm leading-relaxed max-w-md drop-shadow-md">
              {project.description}
            </p>
            
            {/* CTA Button */}
            <Button
              variant="primary"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 
                         text-white font-semibold hover:scale-105 hover:shadow-lg
                         focus:ring-white/50 drop-shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                if (project.id === 'alpha') {
                  router.push('/projects/alpha');
                  // Ensure scroll to top after navigation
                  setTimeout(() => {
                    ensureScrollToTop();
                  }, 100);
                } else if (project.id === 'gamma') {
                  router.push('/projects/gamma');
                  // Ensure scroll to top after navigation
                  setTimeout(() => {
                    ensureScrollToTop();
                  }, 100);
                } else if (project.id === 'beta') {
                  router.push('/projects/beta');
                  setTimeout(() => {
                    ensureScrollToTop();
                  }, 100);
                } else {
                  window.open(project.url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              View Project →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Card with Center-based Animation
const AnimatedCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track this specific card's position relative to center
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate how close this card is to the center
  const centerProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  // Apply animations based on center proximity
  const y = useTransform(centerProgress, [0, 1], [50, 0]);
  const opacity = useTransform(centerProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(centerProgress, [0, 1], [0.8, 1]);
  const zIndex = useTransform(centerProgress, [0, 1], [1, 10]);
  const blur = useTransform(centerProgress, [0, 1], ['blur(3px)', 'blur(0px)']);

  return (
    <motion.div
      ref={cardRef}
      className="h-[60vh] flex items-center justify-center px-8"
      style={{
        y,
        opacity,
        scale,
        zIndex,
        filter: blur
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
};

// Main Carousel Component with Center-based Logic
const SmoothCarousel: React.FC = () => {
  // Parallax scroll tracking for smooth section
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });
  
  // Parallax transforms for smooth section
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <section
      id="smooth"
      className="relative  bg-gradient-to-b from-black via-[#000000] to-black overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
      
      {/* Parallax Neon blobs for smooth section */}
      {/* <motion.div 
        className="absolute left-1/2 top-[-100px] -translate-x-1/2 w-[450px] h-[140px] rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 opacity-60 blur-3xl pointer-events-none z-0 rotate-8" 
        style={{ y: y1 }}
        aria-hidden="true" 
      /> */}
      <motion.div 
        className="absolute right-1/3 bottom-1/4 w-[350px] h-[180px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-40 blur-3xl pointer-events-none z-0 -rotate-12" 
        style={{ y: y2 }}
        aria-hidden="true" 
      />
      <motion.div 
        className="absolute left-1/3 top-1/2 w-[250px] h-[120px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-30 blur-3xl pointer-events-none z-0 rotate-6" 
        style={{ y: y1 }}
        aria-hidden="true" 
      />
      
      {/* Floating geometric shapes for depth */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-sm rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(scrollYProgress, [0, 1], [0, -Math.random() * 300 - 150])
            }}
          />
        ))}
      </motion.div>
      
      {/* Header Section with parallax */}
      <motion.div 
        className="text-center text-white pt-4 px-4"
        style={{ y: y2, opacity }}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4" aria-live="polite">
          Project Showcase  
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Experience the last projects i worked on
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-10">
         
          <div className="text-white/80 text-sm">
            {PROJECTS.length} projects
          </div>
        </div>
      </motion.div>

      {/* Parallax Bridge Element - connects hero to smooth section */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        }}
      />
      
      {/* Carousel Container */}
      <div 
        className="relative w-full max-w-4xl mx-auto"
        aria-label="Project carousel"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Project Cards with Center-based Animation */}
        {PROJECTS.map((project, index) => (
          <AnimatedCard key={project.id} project={project} index={index} />
        ))}

        {/* Status Indicator */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center z-50">
          <div className="font-medium">Scroll to explore projects</div>
          <div className="text-xs">Center-focused animations powered by Framer Motion</div>
        </div>
      </div>
    </section>
  );
};

// Main Component Export
const SmoothSection: React.FC = () => {
  return <SmoothCarousel />;
};

export default SmoothSection;