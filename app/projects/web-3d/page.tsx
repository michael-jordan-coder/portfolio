"use client";

import Link from 'next/link';
import { DotPattern } from '@/components/DotPattern';
import NextProjectButton from '../../../components/NextProjectButton';
import { useScrollToTopOnNavigation } from '@/lib/utils';
import CodeBlock from '@/components/ui/TerminalCard';

// Feature card component
const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white/5 rounded-xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-1 group cursor-pointer">
    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30 group-hover:scale-105">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-gray-100">{title}</h3>
    <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-200">{description}</p>
  </div>
);

export default function HandTrackingPage() {
  useScrollToTopOnNavigation();

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
            "url": "https://danielgurarye.com/projects/web-3d",
            "image": "/image.png"
          })
        }}
      />
      
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
        <section className="relative z-10 pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                <div className="inline-block bg-white/5 text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                  Computer Vision
                </div>
                <div className="inline-block bg-white/5 text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                  Real-time Tracking
                </div>
                <div className="inline-block bg-white/5 text-white text-sm px-4 py-2 rounded-full font-medium border border-white/20">
                  WebGL 3D
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hand Tracking
              <span className="block text-transparent bg-clip-text bg-white">
                Interface
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
              Real-time hand gesture recognition with 3D visualization using MediaPipe and WebGL. 
              Track 21 hand landmarks at 120 FPS with sub-10ms latency.
            </p>
          </div>
        </section>

        {/* Live Demo */}
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-6">See it in action</h2>
              <p className="text-gray-400 text-lg font-light">Experience the hand tracking interface in action</p>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-sm">
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
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-light text-white mb-6">Core Technology</h2>
              <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto">
                Advanced computer vision and 3D rendering capabilities powering real-time hand interaction
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="MediaPipe Detection"
                description="Google's MediaPipe framework for robust hand landmark detection with 21 key points per hand"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureCard
                title="WebGL Rendering"
                description="Hardware-accelerated 3D graphics with custom shaders for smooth skeletal visualization"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                    <path d="M7 21L3 7L21 7L17 21L7 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 21L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 7L17 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
              <FeatureCard
                title="Real-time Processing"
                description="120 FPS tracking with sub-10ms latency for responsive gesture recognition and interaction"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Implementation Examples */}
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-light text-white mb-6">Technical Implementation</h2>
              <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto">
                Core setup and configuration for MediaPipe hand detection
              </p>
            </div>
            
            {/* Hand Detection Setup */}
            <div className="mb-20">
              <h3 className="text-2xl font-light text-white mb-10">MediaPipe Configuration</h3>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="lg:max-w-lg">
                  <CodeBlock
                    language="javascript"
                    command={`// Initialize MediaPipe Hands
const hands = new Hands({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

// Process video frame
hands.onResults((results) => {
    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach(landmarks => {
            // Process 21 hand landmarks
            drawHandSkeleton(landmarks);
        });
    }
});`}
                  />
                </div>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-light text-white">Configuration Parameters</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <span className="text-blue-400/80 text-lg font-bold">•</span>
                        <div>
                          <span className="text-white/90 font-normal">maxNumHands: 2</span>
                          <p className="text-gray-400 text-sm font-light">Supports tracking up to 2 hands simultaneously</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-green-400/80 text-lg font-bold">•</span>
                        <div>
                          <span className="text-white/90 font-normal">modelComplexity: 1</span>
                          <p className="text-gray-400 text-sm font-light">Balanced accuracy vs performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-purple-400/80 text-lg font-bold">•</span>
                        <div>
                          <span className="text-white/90 font-normal">Confidence Thresholds</span>
                          <p className="text-gray-400 text-sm font-light">0.5 for both detection and tracking</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-lg font-light text-white">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/3 rounded-2xl p-6 border border-white/5">
                        <div className="text-2xl font-light text-blue-400/90">120 FPS</div>
                        <div className="text-gray-400 text-sm font-light">Processing Rate</div>
                      </div>
                      <div className="bg-white/3 rounded-2xl p-6 border border-white/5">
                        <div className="text-2xl font-light text-green-400/90">&lt;10ms</div>
                        <div className="text-gray-400 text-sm font-light">Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hand Tracking & Bone System */}
        <section className="relative z-10 px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-light text-white mb-6">Skeletal Hand Tracking</h2>
              <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto">
                21 landmark points create a complete skeletal representation for precise gesture recognition
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Video Demo */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-sm">
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
                  <div className="absolute top-6 left-6 bg-black/60 text-white/90 text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                    Live Demo
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="order-1 lg:order-2 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-light text-white">Landmark Detection</h3>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    Each hand is tracked using 21 key points representing joints and landmarks. 
                    This creates a complete skeletal model that follows every movement in real-time.
                  </p>
                </div>

                {/* Bone Structure */}
                <div className="space-y-8">
                  <h4 className="text-xl font-light text-white">Hand Landmarks (21 Points)</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-blue-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Wrist (1 point)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-green-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Palm (4 points)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-purple-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Thumb (4 points)</span>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-yellow-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Index (4 points)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-red-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Middle (4 points)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-pink-400/80 rounded-full"></div>
                        <span className="text-gray-400 font-light">Ring & Pinky (4 points)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-8">
                  <h4 className="text-xl font-light text-white">Performance Specifications</h4>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white/3 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-xl font-light text-blue-400/90">120 FPS</div>
                      <div className="text-gray-400 text-sm font-light">Processing</div>
                    </div>
                    <div className="bg-white/3 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-xl font-light text-green-400/90">&lt;10ms</div>
                      <div className="text-gray-400 text-sm font-light">Latency</div>
                    </div>
                    <div className="bg-white/3 rounded-2xl p-6 border border-white/5 text-center">
                      <div className="text-xl font-light text-purple-400/90">2 Hands</div>
                      <div className="text-gray-400 text-sm font-light">Simultaneous</div>
                    </div>
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
                Experience Hand Tracking
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-4xl mx-auto">
                Try the live demo and see how hand gestures can control digital interfaces. 
                No installation required—just your camera and a modern browser.
              </p>
            </div>
            
            <div className="space-y-10">
              <a 
                href="https://live-3d.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-16 py-5 bg-white/10 text-white font-light text-lg rounded-full hover:bg-white/20 transition-all duration-500 hover:scale-105 backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                Launch Live Demo
              </a>
              
              <div className="text-gray-500 text-sm font-light">
                <p>Requires camera access • Works best in Chrome/Firefox</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Project Button */}
      
      </main>
    </>
  );
} 