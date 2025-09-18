'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/Button';
import { SectionWrapper, NeonBlob } from './_shared';

// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
}

// Projects data
const PROJECTS: Project[] = [
  { id: 'alpha', title: 'Adding AI to Tuqqi.com', description: 'Adding intelligence to Tuqqi, while keeping the design simple and familiar', image: '/tuqqi/tuqqi-car.png', url: '/projects/tuqqi-ai', category: 'Web App - B2B' },
  { id: 'gamma', title: 'Reducing user action for better performance', description: 'A case study on optimizing the note creation flow in Inbox app by reducing user actions from 8 seconds to 4 seconds through strategic UX improvements.', image: '/notes-app/Casestudy/images/bg.webp', url: '/projects/notesapp', category: 'UX Sprint' },
  { id: 'beta', title: '3D Hand Tracking Interface using AI', description: 'Real-time hand gesture recognition with 3D visualization and interactive controls.', image: '/3d.webp', url: '/projects/web-3d', category: 'Vibe coding experience' }
];

// Project route mapping
const PROJECT_ROUTES = { alpha: '/projects/tuqqi-ai', gamma: '/projects/notesapp', beta: '/projects/web-3d' };

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const router = useRouter();
  const handleProjectClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const route = PROJECT_ROUTES[project.id as keyof typeof PROJECT_ROUTES];
    route ? router.push(route) : window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="w-full max-w-4xl h-[500px] rounded-[40px] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 will-change-transform cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-2xl group"
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
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover will-change-transform"
          initial={{ scale: 1, y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
          whileHover={{ scale: 1.08, y: -10, boxShadow: '0 8px 32px rgba(80,90,228,0.15)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 pointer-events-none" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 group-hover:backdrop-blur-xl transition-all duration-300">
          <div className="space-y-4">
            <span className="inline-block bg-white/25 backdrop-blur-lg text-white font-semibold text-xs px-4 py-2 rounded-full drop-shadow-lg border border-white/20 uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-xl tracking-tight">
              {project.title}
            </h3>
            <p className="text-white/90 text-base leading-relaxed max-w-lg drop-shadow-lg font-medium">
              {project.description}
            </p>
            <Button
              variant="primary"
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm border border-white/40 text-white font-bold hover:scale-105 hover:shadow-xl focus:ring-white/50 drop-shadow-lg px-6 py-3 text-sm transition-all duration-300 hover:border-white/60"
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                const route = PROJECT_ROUTES[project.id as keyof typeof PROJECT_ROUTES];
                route ? router.push(route) : window.open(project.url, '_blank', 'noopener,noreferrer');
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
const AnimatedCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const centerProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const animations = {
    y: useTransform(centerProgress, [0, 1], [50, 0]),
    opacity: useTransform(centerProgress, [0, 1], [0.3, 1]),
    scale: useTransform(centerProgress, [0, 1], [0.8, 1]),
    zIndex: useTransform(centerProgress, [0, 1], [1, 10]),
    filter: useTransform(centerProgress, [0, 1], ['blur(3px)', 'blur(0px)'])
  };

  return (
    <motion.div ref={cardRef} className="h-[70vh] flex items-center justify-center px-4" style={animations}>
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
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const transforms = {
    y1: useTransform(scrollYProgress, [0, 1], [200, -100]),
    y2: useTransform(scrollYProgress, [0, 1], [100, -50]),
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
      <NeonBlob position="custom" customClass="right-1/3 bottom-1/4 -rotate-12" size="md" colors={['#a855f7', '#ec4899', '#ef4444']} opacity={0.4} animated />
      <NeonBlob position="custom" customClass="left-1/3 top-1/2 rotate-6" size="sm" colors={['#06b6d4', '#3b82f6', '#6366f1']} opacity={0.3} animated />
      {/* Only render floating elements on client to avoid hydration issues */}
      {isClient && (
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" aria-live="polite">Project Showcase</h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">Experience the last projects i worked on</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-10">
          <div className="text-white/80 text-sm">{PROJECTS.length} projects</div>
        </div>
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }} />
      <div className="relative w-full max-w-4xl mx-auto" aria-label="Project carousel" role="region" aria-live="polite" aria-atomic="true">
        {PROJECTS.map((project, index) => (<AnimatedCard key={project.id} project={project} index={index} />))}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center z-50">
          <div className="font-medium">Scroll to explore projects</div>
          <div className="text-xs">Center-focused animations powered by Framer Motion</div>
        </div>
      </div>
    </SectionWrapper>
  );
};

// Main Component Export
const SmoothSection: React.FC = () => {
  return <SmoothCarousel />;
};

export default SmoothSection;