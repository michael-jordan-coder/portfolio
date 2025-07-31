'use client';

import React from 'react';
import TextType from '@/components/TextType';

const TextTypeDemo: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-[#000000] to-black overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Basic Example */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              TextType Animation Examples
            </h2>
            
            <div className="text-xl md:text-2xl text-gray-300">
              <TextType 
                text="Welcome to the future of text animations"
                typingSpeed={80}
                className="text-blue-400"
              />
            </div>
          </div>

          {/* Multiple Text Array */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Multiple Text Sequences
            </h3>
            
            <div className="text-lg md:text-xl text-gray-300 min-h-[2rem]">
              <TextType 
                text={[
                  "Creating amazing experiences",
                  "Building the future",
                  "Innovating with technology",
                  "Designing for tomorrow"
                ]}
                typingSpeed={60}
                pauseDuration={1500}
                deletingSpeed={40}
                className="text-green-400"
                textColors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]}
              />
            </div>
          </div>

          {/* Variable Speed */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Variable Typing Speed
            </h3>
            
            <div className="text-lg md:text-xl text-gray-300">
              <TextType 
                text="This text types with random speeds between 30-100ms per character"
                variableSpeed={{ min: 30, max: 100 }}
                className="text-purple-400"
                cursorCharacter="█"
                cursorClassName="text-type__cursor--block"
              />
            </div>
          </div>

          {/* Custom Cursor */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Custom Cursor Styles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-lg text-gray-300">
                <TextType 
                  text="Block cursor"
                  typingSpeed={100}
                  cursorCharacter="█"
                  cursorClassName="text-type__cursor--block"
                  className="text-yellow-400"
                />
              </div>
              
              <div className="text-lg text-gray-300">
                <TextType 
                  text="Underline cursor"
                  typingSpeed={100}
                  cursorCharacter="_"
                  cursorClassName="text-type__cursor--underline"
                  className="text-pink-400"
                />
              </div>
              
              <div className="text-lg text-gray-300">
                <TextType 
                  text="Thick cursor"
                  typingSpeed={100}
                  cursorCharacter="|"
                  cursorClassName="text-type__cursor--thick"
                  className="text-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Reverse Mode */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Reverse Typing Mode
            </h3>
            
            <div className="text-lg md:text-xl text-gray-300">
              <TextType 
                text="This text appears in reverse order"
                reverseMode={true}
                typingSpeed={70}
                className="text-orange-400"
                cursorBlinkDuration={0.3}
              />
            </div>
          </div>

          {/* Start on Visible */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Start Animation When Visible
            </h3>
            
            <div className="text-lg md:text-xl text-gray-300">
              <TextType 
                text="This animation starts when you scroll to this section"
                startOnVisible={true}
                typingSpeed={90}
                className="text-red-400"
                initialDelay={100}
              />
            </div>
          </div>

          {/* No Loop */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Single Animation (No Loop)
            </h3>
            
            <div className="text-lg md:text-xl text-gray-300">
              <TextType 
                text="This animation plays only once and stops"
                loop={false}
                typingSpeed={75}
                className="text-indigo-400"
                onSentenceComplete={(sentence, index) => {
                  console.log(`Completed: ${sentence} at index ${index}`);
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TextTypeDemo; 