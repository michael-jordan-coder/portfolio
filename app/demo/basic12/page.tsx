'use client';

import { useState, useEffect } from 'react';

export default function Basic12CaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const [isPlaying3, setIsPlaying3] = useState(true);
  const [showControls1, setShowControls1] = useState(true);
  const [showControls2, setShowControls2] = useState(true);
  const [showControls3, setShowControls3] = useState(true);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{background: '#121212'}} />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(0, 122, 255, 0.2)'}} />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl animate-pulse delay-1000" style={{backgroundColor: 'rgba(0, 86, 204, 0.15)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border" style={{backgroundColor: 'rgba(0, 122, 255, 0.2)', color: '#007AFF', borderColor: 'rgba(0, 122, 255, 0.3)'}}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Case Study
              </div>

              {/* Headlines */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#FFFFFF'}}>
                  Capturing your notes
                </h1>
                <p className="text-xl max-w-2xl leading-relaxed" style={{color: '#8E8E93'}}>
                  How we built a privacy-first AI note organization system using a hybrid approach of rule-based heuristics and large language models to achieve 94% categorization accuracy.
                </p>
              </div>

              {/* Key Metrics */}
             
           

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 text-white rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{background: 'linear-gradient(to right, #007AFF, #0056CC)'}}
                >
                  Read Full Case Study
                </button>
                <button 
                  className="px-8 py-4 border-2 rounded-full font-semibold transition-all duration-200 text-[#8E8E93] border-[#38383A] hover:bg-[#2C2C2E] hover:text-white"
                >
                  View Technical Details
                </button>
              </div>

                </div>

            {/* Right Column - iPhone Mockup */}
            <div className="relative flex justify-center ">
              <img 
                src="/basic-assets/mockup.png" 
                alt="Notes App Mockup" 
                className="w-80 h-[auto] object-cover rounded-[3rem] shadow-2xl"
                // fit image cover
                style={{objectFit: 'cover'}}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{color: '#8E8E93'}}>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-24" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{color: '#FFFFFF'}}>
              The Problem
            </h2>
            <div className="max-w-4xl">
              <p className="text-2xl leading-relaxed mb-8" style={{color: '#8E8E93'}}>
                We're drowning in information. Notes scattered across platforms become impossible to find when needed.
              </p>
              <p className="text-2xl leading-relaxed mb-8" style={{color: '#8E8E93'}}>
                Traditional apps force manual organization, creating friction that leads to abandoned systems and lost productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Idea Section */}
      <section id="idea" className="py-24" style={{backgroundColor: '#1C1C1E'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{color: '#FFFFFF'}}>
              The Idea
            </h2>
            <div className="max-w-4xl">
              <p className="text-3xl leading-relaxed mb-2 font-semibold" style={{color: '#ffffff'}}>
                What if notes could organize themselves?
              </p>
              <p className="text-xl leading-relaxed mb-8" style={{color: '#8E8E93'}}>
              SwiftNoteClassifier eliminates the friction between thought capture and organization.
                Users simply type their thoughts. AI instantly categorizes them into 11 distinct categories - from actionable tasks to personal reflections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Engine Section */}
      <section id="engine" className="py-24" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Left Column - Header and Text Content */}
                <div className="space-y-12">
                  <div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-8" style={{color: '#FFFFFF'}}>
                      The Engine
                    </h2>
                    <p className="text-2xl leading-relaxed mb-8" style={{color: '#8E8E93'}}>
                      A dual-layer system combining fast heuristics with intelligent language models.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-6" style={{color: '#007AFF'}}>Building the engine</h3>
                    <p className="text-xl leading-relaxed" style={{color: '#8E8E93'}}>
                      Lightning-fast pattern recognition for clear-cut cases. Instantly identifies code snippets, shopping lists, reminders, and contact information with 95% accuracy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-6" style={{color: '#007AFF'}}>Test the output</h3>
                    <p className="text-xl leading-relaxed" style={{color: '#8E8E93'}}>
                      Local AI handles ambiguous cases with nuanced understanding. Distinguishes between personal reflections and meeting notes while maintaining complete privacy.
                    </p>
                  </div>
                </div>

                {/* Right Column - Flowchart */}
                <div className="flex justify-center items-center h-full">
                  <img 
                    src="/basic-assets/engine.svg" 
                    alt="Classification Engine Workflow" 
                    className="w-full h-auto max-h-[700px]"
                    style={{filter: 'invert(1)'}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Flows Section */}
      <section id="flows" className="py-24" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{color: '#FFFFFF'}}>
              User Flows
            </h2>
            <div className="max-w-full">
              <div className="space-y-12">
                  <div className="grid xl:grid-cols-2 gap-44 items-center border-b border-semantic-border-secondary pb-16">
                    {/* Left Column - Text Content */}
                    <div>
                      <h3 className="text-3xl font-bold mb-6" style={{color: '#007AFF'}}>Note Creation</h3>
                      <p className="text-xl leading-relaxed" style={{color: '#8E8E93'}}>
                        Tap plus, type thoughts, done. AI categorizes instantly while you focus on capturing ideas.
                      </p>
                    </div>
                    
                    {/* Right Column - Video */}
                    <div className="flex justify-center">
                      <div 
                        className="relative w-full max-w-xs"
                        onMouseEnter={() => {
                          setShowControls1(true);
                        }}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setShowControls1(false);
                          }, 2000);
                        }}
                      >
                        <video 
                          ref={(video) => {
                            if (video) {
                              video.addEventListener('play', () => setIsPlaying1(true));
                              video.addEventListener('pause', () => setIsPlaying1(false));
                            }
                          }}
                          src="/basic-assets/flow-create.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full rounded-2xl shadow-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                        {/* Play/Pause Button Overlay */}
                        <div 
                          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                            showControls1 ? 'opacity-100' : 'opacity-0'
                          }`}
                          onClick={(e) => {
                            const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                            if (video) {
                              if (isPlaying1) {
                                video.pause();
                              } else {
                                video.play();
                              }
                            }
                          }}
                        >
                          <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all">
                            {isPlaying1 ? (
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-2 gap-44 items-center border-b border-semantic-border-secondary pb-16">
                    {/* Left Column - Text Content */}
                    <div>
                      <h3 className="text-3xl font-bold mb-6" style={{color: '#007AFF'}}>Discovery</h3>
                      <p className="text-xl leading-relaxed" style={{color: '#8E8E93'}}>
                        Color-coded badges and instant filtering make finding the right note effortless.
                      </p>
                    </div>
                    
                    {/* Right Column - Video */}
                    <div className="flex justify-center">
                      <div 
                        className="relative w-full max-w-xs"
                        onMouseEnter={() => {
                          setShowControls2(true);
                        }}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setShowControls2(false);
                          }, 2000);
                        }}
                      >
                        <video 
                          ref={(video) => {
                            if (video) {
                              video.addEventListener('play', () => setIsPlaying2(true));
                              video.addEventListener('pause', () => setIsPlaying2(false));
                            }
                          }}
                          src="/basic-assets/flow-create.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full rounded-2xl shadow-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                        {/* Play/Pause Button Overlay */}
                        <div 
                          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                            showControls2 ? 'opacity-100' : 'opacity-0'
                          }`}
                          onClick={(e) => {
                            const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                            if (video) {
                              if (isPlaying2) {
                                video.pause();
                              } else {
                                video.play();
                              }
                            }
                          }}
                        >
                          <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all">
                            {isPlaying2 ? (
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-2 gap-44 items-center">
                    {/* Left Column - Text Content */}
                    <div>
                      <h3 className="text-3xl font-bold mb-6" style={{color: '#007AFF'}}>Categories</h3>
                      <p className="text-xl leading-relaxed" style={{color: '#8E8E93'}}>
                        11 categories cover everything: Actionable tasks, Reminders, Shopping lists, Code snippets, Journal entries, and more.
                      </p>
                    </div>
                    
                    {/* Right Column - Video */}
                    <div className="flex justify-center">
                      <div 
                        className="relative w-full max-w-xs"
                        onMouseEnter={() => {
                          setShowControls3(true);
                        }}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setShowControls3(false);
                          }, 2000);
                        }}
                      >
                        <video 
                          ref={(video) => {
                            if (video) {
                              video.addEventListener('play', () => setIsPlaying3(true));
                              video.addEventListener('pause', () => setIsPlaying3(false));
                            }
                          }}
                          src="/basic-assets/flow-create.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full rounded-2xl shadow-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                        {/* Play/Pause Button Overlay */}
                        <div 
                          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                            showControls3 ? 'opacity-100' : 'opacity-0'
                          }`}
                          onClick={(e) => {
                            const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                            if (video) {
                              if (isPlaying3) {
                                video.pause();
                              } else {
                                video.play();
                              }
                            }
                          }}
                        >
                          <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all">
                            {isPlaying3 ? (
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The UI Section */}
      <section id="ui" className="py-24" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-12" style={{color: '#FFFFFF'}}>
              The UI
            </h2>
            <div className="max-w-4xl">
              <p className="text-2xl leading-relaxed mb-8" style={{color: '#8E8E93'}}>
                Minimalist design that prioritizes content. Clean, modern, and deeply integrated with iOS principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-8 max-w-2xl w-full mx-4" style={{backgroundColor: '#1C1C1E'}}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold" style={{color: '#FFFFFF'}}>AI Note Organization Case Study</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="transition-colors text-[#8E8E93] hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="mb-6" style={{color: '#8E8E93'}}>
                Dive deep into the technical architecture, challenges overcome, and innovations behind our AI-powered note organization system.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#FFFFFF'}}>What You'll Learn:</h4>
                  <ul className="text-sm space-y-1" style={{color: '#8E8E93'}}>
                    <li>• Hybrid AI classification techniques</li>
                    <li>• Privacy-first architecture design</li>
                    <li>• Performance optimization strategies</li>
                    <li>• Machine learning model selection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: '#FFFFFF'}}>Technical Highlights:</h4>
                  <ul className="text-sm space-y-1" style={{color: '#8E8E93'}}>
                    <li>• 94% accuracy with local processing</li>
                    <li>• Sub-50ms response times</li>
                    <li>• 127 dynamic category system</li>
                    <li>• Zero data collection policy</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg transition-colors text-[#8E8E93] border-[#38383A] hover:bg-[#2C2C2E] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg transition-colors text-white hover:bg-[#0056CC]"
                style={{backgroundColor: '#007AFF'}}
              >
                Start Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}