"use client";

import Link from 'next/link';
import { DotPattern } from '@/components/DotPattern';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollRestoration } from '@/lib/utils';
import CodeBlock from '@/components/ui/TerminalCard';

// Feature card component
const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 border border-white/20">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default function HandTrackingPage() {
  useScrollRestoration();

  return (
    <>
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
            "url": "https://danielgurarye.com/projects/beta",
            "image": "/image.png"
          })
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-6 right-6 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-black/90 text-white font-semibold shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
          aria-label="Back to home"
        >
          ← Back
        </Link>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-black relative overflow-hidden">
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
        <section className="relative z-10 pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <div className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                Interactive Experience
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12">
              3D Hand Tracking Interface From your camera
            </h1>
           
          </div>
        </section>

        {/* Live Demo */}
        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">See it in action</h2>
              <p className="text-gray-300">Experience the hand tracking interface in action</p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe 
                width="100%" 
                height="600"
                src="/3dvideo.mp4" 
                allowFullScreen
                title="3D Hand Tracking Interface - Live Demo"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                title="Real-time Tracking"
                description="120 FPS hand detection with sub-10ms latency using MediaPipe"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureCard
                title="3D Visualization"
                description="WebGL-powered 3D rendering with custom shaders and skeletal animations"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M7 21L3 7L21 7L17 21L7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 21L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureCard
                title="Gesture Recognition"
                description="Advanced gesture detection with machine learning-based pattern recognition"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Implementation Examples */}
        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Implementation</h2>
            
            {/* Hand Detection Setup */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-white mb-6">Hand Detection Setup</h3>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="md:max-w-md">
                  <CodeBlock
                    language="javascript"
                    command={`async function initMediaPipeHands() {
    const hands = new Hands({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
}`}
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Initialize MediaPipe hands detection with optimized parameters for real-time performance. 
                    Configured for 2 hands maximum with balanced accuracy and speed.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">Max 2 hands for optimal performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">Balanced model complexity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">Configurable confidence thresholds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hand Tracking & Bone System */}
        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Hand Tracking & Bone System</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Video Demo */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                  <video 
                    className="w-full h-auto"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/handcont.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    Live Demo
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white">Skeletal Hand Tracking</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The system tracks 21 key points on each hand, creating a complete skeletal representation 
                    that follows every movement in real-time. Each point represents a specific joint or landmark 
                    on the hand, enabling precise gesture recognition and 3D positioning.
                  </p>
                </div>

                {/* Bone Structure */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Bone Structure (21 Points)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Wrist (1 point)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Palm (4 points)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Thumb (4 points)</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Index (4 points)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Middle (4 points)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Ring & Pinky (4 points)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Features */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Real-time Tracking Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 text-lg">⚡</span>
                      <div>
                        <span className="text-white font-medium">120 FPS Processing</span>
                        <p className="text-gray-300 text-sm">Ultra-smooth tracking with minimal latency</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg">🎯</span>
                      <div>
                        <span className="text-white font-medium">Sub-pixel Accuracy</span>
                        <p className="text-gray-300 text-sm">Precise positioning down to pixel level</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 text-lg">🔄</span>
                      <div>
                        <span className="text-white font-medium">Continuous Tracking</span>
                        <p className="text-gray-300 text-sm">Seamless hand movement following</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-60">
              <h3 className="text-3xl font-bold text-gray-200 mb-8 tracking-wider">
                Beyond Today's Demo
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light tracking-wide">
                This technology opens doors to a future where hand gestures become the primary interface for digital experiences. 
                Imagine controlling virtual environments, manipulating 3D objects, or navigating complex interfaces with nothing but your hands. 
                From gaming and design to education and accessibility, the possibilities are endless.
              </p>
            </div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              Try It Live
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the 3D hand tracking system in action. 
              No installation required, just your camera and a modern browser.
            </p>
            
            <div className="space-y-8">
              <a 
                href="https://live-3d.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Launch Demo
              </a>
            </div>
          </div>
        </section>

        {/* Next Project Button */}
        <div className="pb-12"> 
          <NextProjectButton
            nextProjectPath="/projects/alpha"
            nextProjectTitle='tuqqi chat redesign'
            nextProjectDescription="make actions with your hands, and see the result in real time."
            className="bg-black"
          />
        </div>
      </main>
    </>
  );
} 