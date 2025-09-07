'use client';

import Link from 'next/link'
import React, { useRef, useState } from 'react';

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import AnimatedContent from '@/components/AnimatedContent';
import ContactModal from '@/components/ContactModal';

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Testimonials data
  const testimonials = [
    {
      quote: "My love for basketball came from Michael jordan, just see him on coart (on videos) made me exicted, his commitment to the game and his passion, is what i find minigful in life",
      name: "Basketball",
      designation: "I'm a big fan of the game",
      src: "https://cdn.sanity.io/images/c1chvb1i/production/a177656f876ed4e52b538e4bfd2546de9f1e5919-1100x735.jpg?auto=format&fit=max&q=75&w=1100",
    },
    {
      quote: "My calm times are always starts with music that i love, i think music is effective for multiple situations, wether it's a workout, a study session, or just a chill day, music is always there to help me.",
      name: "Music",
      designation: "specially the beatles",
      src: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/03/06/USAT/81787689007-usatgraphics-beatles-topper.png?crop=2666,1997,x552,y0",
    },
    {
      quote: "I find myself drawn to the intersection of technology and creativity. Whether it's coding, designing, or exploring new tools, I love discovering how things work and finding elegant solutions to complex problems.",
      name: "Technology",
      designation: "always learning, always building",
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1000&q=80",
    },
  ];



  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
     

      {/* Subtle Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20"></div>



      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-8 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>
      
      {/* Main Content */}
      <div className="relative z-10 py-24 sm:py-32 md:py-40 lg:py-48">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-5xl mx-auto">
            {/* Title */}
            {/* <motion.div 
              className="mb-32 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Daniel
              </h1>
              <div className="mt-6 text-xl md:text-2xl lg:text-3xl text-gray-400 font-medium tracking-wider">
                Creative Developer & Designer
              </div>
            </motion.div> */}
            
            {/* Testimonials Section */}
            <AnimatedContent 
              distance={50}
              duration={1.2}
              delay={0.2}
            >
              <div className="mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Soooo, what about Me?
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
                  Here are 3 things i like beside Design.
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/10">
                  <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
                </div>
              </div>
            </AnimatedContent>
            
            {/* Main Story */}
            <div className="space-y-[768px]">
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-300 leading-relaxed">
                    I believe great design is invisible. It's not about making things pretty — it's about creating experiences that feel inevitable, like they've always existed.
                  </p>
                </div>
              </AnimatedContent>
              
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                    Every project starts with a question: "What if?" What if we could make this feel alive? What if we could make someone's day a little better?
                  </p>
                </div>
              </AnimatedContent>
              
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                    I'm obsessed with the details that most people never notice. The micro-interactions, the timing, the way something responds to your touch.
                  </p>
                </div>
              </AnimatedContent>
              
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-400 leading-relaxed">
                    My process is messy, iterative, and deeply personal. I sketch, I prototype, I fail, I learn. Each iteration brings me closer to something honest.
                  </p>
                </div>
              </AnimatedContent>
              
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-300 leading-relaxed">
                    I'm not here to follow trends or chase awards. I'm here to create work that matters — work that connects, that moves, that makes a difference.
                  </p>
                </div>
              </AnimatedContent>
            </div>
            
            {/* Call to Action */}
            <div className="mt-[768px]">
              <AnimatedContent 
                distance={100}
                duration={1.2}
                ease="power3.out"
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-12 font-medium">
                    Let's create something together.
                  </p>
                  <div className="flex justify-center gap-8">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-8 py-4 text-lg md:text-xl bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full text-white font-bold backdrop-blur-xl border border-white/20 hover:border-white/40"
                    >
                      Back to Projects
                    </button>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="px-8 py-4 text-lg md:text-xl bg-white hover:bg-gray-100 transition-all duration-300 rounded-full text-black font-bold"
                    >
                      Get In Touch
                    </button>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default AboutSection