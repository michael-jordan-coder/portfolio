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
    id: 'gamma',
    title: 'Reducing user action for better performance',
    description: 'A case study on optimizing the note creation flow in Inbox app by reducing user actions from 8 seconds to 4 seconds through strategic UX improvements.',
    image: '/notes-app/Casestudy/images/BG.png',
    url: '/projects/notesapp',
    category: 'UX Sprint'
  },
  {
    id: 'alpha',
    title: 'Adding AI to Tuqqi.com',
    description: 'Adding intelligence to Tuqqi, while keeping the design simple and familiar',
    image: '/projects/tuqqi.svg',
    url: '/projects/tuqqi-ai',
    category: 'Web App - B2B'
  },
  {
    id: 'beta',
    title: '3D Hand Tracking Interface using AI',
    description: 'Real-time hand gesture recognition with 3D visualization and interactive controls.',
    image: '/3D.png',
    url: '/projects/web-3d',
    category: 'Vibe coding experience'
  },
];

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const router = useRouter();
  const handleProjectClick = () => {
    // Scroll to top immediately before navigation
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    
    if (project.id === 'alpha') {
      router.push('/projects/tuqqi-ai');
    } else if (project.id === 'gamma') {
      router.push('/projects/notesapp');
    } else if (project.id === 'beta') {
      router.push('/projects/web-3d');
    } else {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Detect if this is the first, second, or third project and render special content
  const isVideo = project.id === 'alpha';
  const isFigma = project.id === 'beta';
  const isHandTracking = project.id === 'beta';

  return (
    <div
      className="w-[200%] h-[500px] rounded-[40px] overflow-hidden 
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
            src="https://cdn.prod.website-files.com/60d03c10d0238c6fa34380ed/613a35257ffdb0165af59a37_5ea165795e0858637285a37e_LogoGraph1200_630.png"
            className="w-full h-full object-fill"
            style={{ pointerEvents: 'none', border: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Project Alpha Video"
          />
        ) : isHandTracking ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1, y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
            whileHover={{ scale: 1.08, y: -10, boxShadow: '0 8px 32px rgba(80,90,228,0.15)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          />
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
        
        {/* Enhanced Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 pointer-events-none" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 group-hover:backdrop-blur-xl transition-all duration-300">
          <div className="space-y-4">
            {/* Category badge */}
            <span className="inline-block bg-white/25 backdrop-blur-lg text-white font-semibold text-xs px-4 py-2 rounded-full drop-shadow-lg border border-white/20 uppercase tracking-wider">
              {project.category}
            </span>
            
            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-xl tracking-tight">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-white/90 text-base leading-relaxed max-w-lg drop-shadow-lg font-medium">
              {project.description}
            </p>
            
            {/* CTA Button */}
            <Button
              variant="primary"
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm border border-white/40 
                         text-white font-bold hover:scale-105 hover:shadow-xl
                         focus:ring-white/50 drop-shadow-lg px-6 py-3 text-sm
                         transition-all duration-300 hover:border-white/60"
              onClick={(e) => {
                e.stopPropagation();
                // Scroll to top immediately before navigation
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }
                
                if (project.id === 'alpha') {
                  router.push('/projects/tuqqi-ai');
                } else if (project.id === 'gamma') {
                  router.push('/projects/notesapp');
                } else if (project.id === 'beta') {
                  router.push('/projects/web-3d');
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
      className="h-[70vh] flex items-center justify-center px-4"
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" aria-live="polite">
          Project Showcase  
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">
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