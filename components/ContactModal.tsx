'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, itemName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 1500);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-8">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Let's Connect!</h2>
              <p className="text-white/70">Get in touch to discuss your project</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
                              {/* Phone */}
                <div className="group">
                  <label className="block text-white/60 text-sm font-medium mb-2">Phone Number</label>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-200">
                    <span className="text-white font-mono">+972538250078</span>
                    <button
                      onClick={() => handleCopy('+972538250078', 'phone')}
                      className="text-white/60 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 relative"
                      title="Copy phone number"
                    >
                      <AnimatePresence>
                        {copiedItem === 'phone' ? (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded"
                          >
                            Copied!
                          </motion.div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>

                              {/* Email */}
                <div className="group">
                  <label className="block text-white/60 text-sm font-medium mb-2">Email</label>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-200">
                    <span className="text-white font-mono">daniel.gourarye@gmail.com</span>
                    <button
                      onClick={() => handleCopy('daniel.gourarye@gmail.com', 'email')}
                      className="text-white/60 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 relative"
                      title="Copy email"
                    >
                      <AnimatePresence>
                        {copiedItem === 'email' ? (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded"
                          >
                            Copied!
                          </motion.div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>

                              {/* LinkedIn */}
                <div className="group">
                  <label className="block text-white/60 text-sm font-medium mb-2">LinkedIn</label>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-200">
                    <span className="text-white font-mono text-sm">linkedin.com/in/daniel-gur-556002308/</span>
                    <button
                      onClick={() => handleCopy('https://www.linkedin.com/in/daniel-gur-556002308/', 'linkedin')}
                      className="text-white/60 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 relative"
                      title="Copy LinkedIn URL"
                    >
                      <AnimatePresence>
                        {copiedItem === 'linkedin' ? (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded"
                          >
                            Copied!
                          </motion.div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>


            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/50 text-sm">
                Click the copy icons to easily copy contact information
              </p>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal; 