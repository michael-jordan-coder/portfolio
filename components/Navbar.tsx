'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import ContactModal from './ContactModal';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Refs for better performance
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  // Handle scroll with proper throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;
          
          // Update scrolled state
          setIsScrolled(currentScrollY > 20);
          
          // Always show navbar at the top
          if (currentScrollY <= 100) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }
          
          // Clear any existing timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }
          
          // Determine scroll direction and distance
          if (Math.abs(scrollDelta) > 5) {
            if (scrollDelta > 0) {
              // Scrolling down - hide navbar
              scrollTimeout.current = setTimeout(() => {
                setIsVisible(false);
              }, 150);
            } else {
              // Scrolling up - show navbar immediately
              setIsVisible(true);
            }
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/', isScrollTo: true, targetId: 'hero' },
    { name: 'Projects', href: '/projects', isScrollTo: true, targetId: 'smooth' },
    { name: 'About', href: '/about', isScrollTo: false },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-white font-bold text-xl tracking-wide">
              Daniel Gur Arye
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6 md:space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.isScrollTo ? (
                  <button
                    onClick={() => {
                      if (typeof document !== 'undefined') {
                        const element = document.getElementById(item.targetId!);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="primary"
                className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                onClick={onOpenContact}
              >
              Contact
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <motion.button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="w-6 h-0.5 bg-white mb-1"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white mb-1"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden bg-black/60 backdrop-blur-md border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.isScrollTo ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (typeof document !== 'undefined') {
                          const element = document.getElementById(item.targetId!);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2 w-full text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar; 