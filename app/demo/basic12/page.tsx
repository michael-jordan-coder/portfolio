'use client';

import { useState, useEffect } from 'react';

export default function Basic12CaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#FFFFFF'}}>
              The Problem
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                In our digital age, we're drowning in information. Every day, we capture thoughts, ideas, reminders, and insights across multiple platforms - sticky notes, text messages, voice memos, random scraps of paper. The result? A chaotic mess of unstructured content that becomes impossible to find when we need it most.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                Traditional note-taking apps force users to manually organize their thoughts into folders or tags. This creates friction - users must stop and think about categorization instead of focusing on capturing their ideas. The cognitive load of organization often leads to abandoned notes, forgotten insights, and lost productivity.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                The core challenge: How do we capture the natural flow of human thought while automatically organizing it in a way that makes sense and remains discoverable?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Idea Section */}
      <section id="idea" className="py-24" style={{backgroundColor: '#1C1C1E'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#FFFFFF'}}>
              The Idea
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                What if notes could organize themselves? What if we could simply type our thoughts and have an intelligent system automatically categorize them into meaningful groups? SwiftNoteClassifier was born from this simple premise: eliminate the friction between thought capture and organization.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                Instead of forcing users to think about categories, we let artificial intelligence do the heavy lifting. The vision was clear: create an app that feels as natural as thinking, but organizes as systematically as a librarian. Users would simply type their thoughts, and the app would instantly categorize them into 11 distinct categories - from actionable tasks to personal reflections, from code snippets to shopping lists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Engine Section */}
      <section id="engine" className="py-24" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#FFFFFF'}}>
              The Engine
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg leading-relaxed mb-8" style={{color: '#8E8E93'}}>
                The heart of SwiftNoteClassifier is a sophisticated dual-layer classification system that combines the speed of rule-based heuristics with the intelligence of large language models.
              </p>

              {/* Flowchart */}
              <div className="my-12 flex justify-center">
                <div className="w-full max-w-5xl">
                  <img 
                    src="/basic-assets/diagram.svg" 
                    alt="Classification Engine Workflow" 
                    className="w-full h-auto"
                    style={{filter: 'invert(1)'}}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#007AFF'}}>Layer 1: Heuristic Classification</h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    The first line of defense is a comprehensive rule-based system that analyzes text patterns, keywords, and structural elements. This system can instantly recognize:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6" style={{color: '#8E8E93'}}>
                    <li>Code snippets through syntax patterns and programming keywords</li>
                    <li>Shopping lists through product names and list structures</li>
                    <li>Time-sensitive reminders through date and time expressions</li>
                    <li>Quoted material through quotation marks and attribution patterns</li>
                    <li>Contact information through phone numbers, emails, and professional titles</li>
                  </ul>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                    The heuristic system operates at near-instant speed with 95% accuracy for clear-cut cases. It uses pattern matching, regular expressions, and keyword analysis to make rapid decisions.
                  </p>
              </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#007AFF'}}>Layer 2: LLM Classification</h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    When heuristics can't reach a confident conclusion, the system falls back to a local large language model (Ollama with llama3). This provides the nuanced understanding needed for ambiguous cases - distinguishing between a personal reflection and a meeting note, or determining if a task is actionable or just an idea.
                  </p>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    The LLM processes the text through carefully crafted prompts that define each category with examples and context. The system maintains privacy by running everything locally - no data leaves the user's device.
                  </p>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                    <strong>Intelligent Fallbacks:</strong> The system includes sophisticated tie-breaking logic for edge cases. When confidence is low, additional heuristics provide context-aware decisions. The result is a classification system that's both fast and accurate, handling the full spectrum of human communication patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Flows Section */}
      <section id="flows" className="py-24" style={{backgroundColor: '#1C1C1E'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#FFFFFF'}}>
              User Flows
            </h2>
            <div className="max-w-4xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#007AFF'}}>Primary Flow: Note Creation</h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    The user journey begins with a single tap on the plus button in the main interface. This opens a clean, focused input screen with a prominent text field. The interface automatically focuses the keyboard, encouraging immediate input.
                  </p>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    As the user types, they see a simple, distraction-free interface. When they're ready, they tap send or press return. The system immediately begins classification, showing a subtle 'Organizing your note...' indicator. Within seconds, the note is categorized and stored.
                  </p>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                    The user sees a brief success message before being returned to the main interface, where their newly organized note appears at the top of the list.
            </p>
          </div>

                  <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#007AFF'}}>Secondary Flow: Discovery and Retrieval</h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    The main interface presents all notes in a clean, chronological list. Each note displays its category through a color-coded badge, making it easy to scan and understand content at a glance.
                  </p>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                    Users can filter notes by category using horizontal scrollable badges at the top. Tapping a category badge instantly filters the view to show only notes of that type. A search bar allows full-text search across all notes, making it easy to find specific content regardless of category.
                  </p>
              </div>

                  <div>
                  <h3 className="text-2xl font-bold mb-4" style={{color: '#007AFF'}}>Tertiary Flow: Category Exploration</h3>
                  <p className="text-lg leading-relaxed mb-4" style={{color: '#8E8E93'}}>
                    The 11 categories cover the full spectrum of human thought:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6" style={{color: '#8E8E93'}}>
                    <li><strong>Actionable:</strong> Tasks and ideas without specific timing</li>
                    <li><strong>Reminders:</strong> Time-sensitive scheduling and appointments</li>
                    <li><strong>Shopping:</strong> Grocery lists and household items</li>
                    <li><strong>Snippets:</strong> Code, commands, and technical content</li>
                    <li><strong>Links:</strong> URLs and web references</li>
                    <li><strong>Media:</strong> Books, movies, podcasts, and content consumption</li>
                    <li><strong>Notes:</strong> Meeting logs, announcements, and information</li>
                    <li><strong>Journal:</strong> Personal reflections and emotional content</li>
                    <li><strong>Quotes:</strong> Inspirational sayings and attributed material</li>
                    <li><strong>Goals:</strong> Targets, objectives, and measurable outcomes</li>
                    <li><strong>People:</strong> Contact information and professional relationships</li>
                  </ul>
                  <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                    Each category has its own visual identity through color coding and SF Symbols, making the interface both functional and aesthetically pleasing.
                  </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#FFFFFF'}}>
              The UI
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg leading-relaxed mb-6" style={{color: '#8E8E93'}}>
                The interface follows a minimalist philosophy that prioritizes content over decoration. The design language is clean, modern, and deeply integrated with iOS design principles.
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