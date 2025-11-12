"use client";

import Link from 'next/link';
import { DotPattern } from '../../../components/DotPattern';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollToTopOnNavigation } from '../../../lib/utils';
import { CodeBlock } from '../../../components/CodeBlock';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import ContactModal from '../../../components/ContactModal';

// Simple feature highlight component
const FeatureHighlight: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 border border-white/10">
    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
      {icon}
    </div>
    <span className="text-white font-medium text-sm">{text}</span>
  </div>
);

// Camera permission component
const CameraPermissionModal: React.FC<{ isOpen: boolean; onClose: () => void; onGranted: () => void }> = ({ isOpen, onClose, onGranted }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    setIsRequesting(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      // Stop the stream immediately as we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      onGranted();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to access camera');
    } finally {
      setIsRequesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white/10 rounded-2xl p-8 max-w-md mx-4 border border-white/20 backdrop-blur-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">Camera Access Required</h3>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            This demo uses your camera to track hand movements in real-time. 
            Your camera feed stays private and is processed locally in your browser.
          </p>
          
          {error && (
            <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 text-white font-medium text-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={requestCameraPermission}
              disabled={isRequesting}
              className="flex-1 px-4 py-2 bg-blue-400/20 text-blue-400 font-medium text-sm rounded-full hover:bg-blue-400/30 transition-all duration-300 border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRequesting ? 'Requesting...' : 'Allow Camera'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HandTrackingPage() {
  useScrollToTopOnNavigation();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleCameraPermissionGranted = () => {
    setCameraPermissionGranted(true);
    setShowIframe(true);
    // Open the live demo in a new tab
    window.open('https://3-dweb-kanm.vercel.app/', '_blank');
  };

  const handleLaunchDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCameraModal(true);
  };

  const handleDirectLaunch = () => {
    window.open('https://3-dweb-kanm.vercel.app/', '_blank');
  };

  return (
    <>
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      
      {/* Schema for Beta Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "3D Hand Tracking Interface",
            "description": "Real-time hand gesture recognition with 3D visualization and interactive controls using computer vision and web technologies",
            "author": {
              "@type": "Person",
              "name": "Daniel Gur Arye"
            },
            "dateCreated": "2024",
            "genre": "Interactive Experience",
            "keywords": "hand tracking, computer vision, 3D visualization, web technologies, HTML5, CSS3, JavaScript, real-time interaction",
            "url": "https://danielgurarye.com/projects/web-3d",
            "image": "/image.png"
          })
        }}
      />
      
      {/* Back to home button */}
      <Link
        href="/"
        aria-label="back"
        className="fixed top-20 right-8 z-50 bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-full px-6 py-4 shadow-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="text-white font-medium">back</span>
      </Link>

      {/* Main Content */}
      <main className="min-h-[100svh] bg-semantic-dark-bg-primary relative overflow-hidden">
        {/* Dot Pattern Background */}
        <DotPattern 
          width={25} 
          height={25} 
          cx={1} 
          cy={1} 
          cr={1} 
          className="opacity-60 text-white/40" 
        />
        
        {/* Radial Fade Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, transparent 15%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0.7) 55%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.98) 100%)`
          }}
        />
        
        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <FeatureHighlight
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
                      <path d="M8 3V5.5C8 6.33 8.67 7 9.5 7S11 6.33 11 5.5V3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 5.5V12C11 12.83 10.33 13.5 9.5 13.5S8 12.83 8 12V7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  text="Pinch to Scale"
                />
                <FeatureHighlight
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  text="Touch to Rotate"
                />
                <FeatureHighlight
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  text="Real-time"
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-semantic-dark-text-primary mb-6 leading-tight">
              Control 3D Objects
              <span className="block text-transparent bg-clip-text bg-white">
                With Your Hands
              </span>
            </h1>
            <p className="text-xl text-semantic-dark-text-muted font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
              Experience the future of interaction. Use natural hand gestures to manipulate 3D objects in real-time. 
              No controllers, no touch screens—just your hands and a camera.
            </p>
            
            {/* Hero Video */}
            <div className="mt-12 mb-8 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <video 
                  className="w-full max-w-4xl h-auto"
                  autoPlay
                  muted
                  playsInline
                  loop
                >
                  <source src="/3dvideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white/90 text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  Live Hand Tracking Demo
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-gray-500 text-sm font-light">
                {cameraPermissionGranted ? (
                  <p className="text-green-400">Camera access granted • Ready to use!</p>
                ) : (
                  <p>Requires camera access • Works best in Chrome/Firefox</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-semantic-dark-text-primary mb-6">See It In Action</h2>
              <p className="text-semantic-dark-text-muted text-lg font-light">Preview of the live hand tracking demo</p>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-sm">
              {showIframe ? (
                <iframe 
                  width="100%" 
                  height="500"
                  src="https://3-dweb-kanm.vercel.app/" 
                  allowFullScreen
                  title="3D Hand Tracking Interface - Live Demo"
                  className="w-full"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-camera"
                />
              ) : (
                <div className="h-[500px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-blue-400/20 rounded-full flex items-center justify-center mb-8 border border-blue-400/30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Camera Access Required</h3>
                  <p className="text-gray-300 text-lg mb-8 max-w-md">
                    Grant camera permission above to see the live demo preview, or click the button to open the full experience.
                  </p>
                  <button 
                    onClick={handleDirectLaunch}
                    className="px-8 py-4 bg-blue-400/20 text-blue-400 font-medium text-lg rounded-full hover:bg-blue-400/30 transition-all duration-300 border border-blue-400/30"
                  >
                    Open Full Demo
                  </button>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 bg-black/60 text-white/90 text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                {showIframe ? 'Live Demo Preview' : 'Camera Permission Required'}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-light text-semantic-dark-text-primary mb-6">How It Works</h2>
              <p className="text-semantic-dark-text-muted text-lg font-light max-w-3xl mx-auto">
                Simple gestures, powerful technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                        <path d="M8 3V5.5C8 6.33 8.67 7 9.5 7S11 6.33 11 5.5V3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 5.5V12C11 12.83 10.33 13.5 9.5 13.5S8 12.83 8 12V7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Pinch to Scale</h3>
                      <p className="text-gray-400 text-sm">Use your right hand to pinch and expand the 3D object</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center border border-green-400/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Touch to Rotate</h3>
                      <p className="text-gray-400 text-sm">Point your left index finger at the center to rotate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Real-time Response</h3>
                      <p className="text-gray-400 text-sm">120 FPS tracking with instant feedback</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-sm">
                  <video 
                    className="w-full h-auto"
                    controls
                    autoPlay
                    muted
                    playsInline
                    loop
                  >
                    <source src="/handcont.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-6 left-6 bg-black/60 text-white/90 text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-20">
              <h2 className="text-3xl font-light text-white mb-8">
                Ready to Experience the Future?
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-4xl mx-auto">
                This is just the beginning. Hand tracking technology opens up endless possibilities for 
                natural, intuitive interactions with digital content.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="text-gray-500 text-sm font-light">
                {cameraPermissionGranted ? (
                  <p className="text-green-400">Camera access granted • Ready to use!</p>
                ) : (
                  <p>Requires camera access • Works best in Chrome/Firefox</p>
                )}
              </div>
              
              <div className="pt-8">
                <Link
                  href="/projects/web-3d/beta"
                  className="inline-block px-8 py-3 bg-white/5 text-white font-medium text-sm rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                >
                  View Technical Details →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Next Project Button */}
        <div className="pb-12"> 
          <NextProjectButton
            nextProjectPath="/projects/keychain-saas-dashboard"
            nextProjectTitle="KEYCHAIN SaaS Dashboard"
            nextProjectDescription="An advanced SaaS dashboard with workspace management, secure authentication, and comprehensive analytics for modern businesses."
            className="bg-black"
          />
        </div>
      </main>

      {/* Camera Permission Modal */}
      <CameraPermissionModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onGranted={handleCameraPermissionGranted}
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
} 