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

              {/* WhatsApp Button - Now at the end */}
              <div>
                <label className="block text-white/60 text-sm font-medium mb-2">Quick Chat</label>
                <a
                  href="https://wa.me/972538250078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-full border border-[#25D366]/20 hover:border-[#20BA5A]/40 transition-all duration-200 group"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                  <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
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