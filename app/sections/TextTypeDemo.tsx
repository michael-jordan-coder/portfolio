'use client';

import React from 'react';
import TextType from '@/components/TextType';
import { SectionWrapper } from './_shared';

// Demo configurations for different TextType examples
const demoConfigs = [
  { text: "Welcome to the future of text animations", speed: 80, className: "text-blue-400" },
  { 
    text: ["Creating amazing experiences", "Building the future", "Innovating with technology", "Designing for tomorrow"], 
    speed: 60, 
    className: "text-green-400", 
    colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"] 
  },
  { text: "This text types with random speeds between 30-100ms per character", variableSpeed: { min: 30, max: 100 }, className: "text-purple-400", cursor: "█" },
  { text: "This animation starts when you scroll to this section", startOnVisible: true, speed: 90, className: "text-red-400" },
  { text: "This animation plays only once and stops", loop: false, speed: 75, className: "text-indigo-400" }
];

const TextTypeDemo: React.FC = () => {
  return (
    <SectionWrapper id="texttype-demo">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">TextType Animation Examples</h2>
          </div>
          
          {/* Basic Example */}
          <div className="text-center space-y-4">
            <div className="text-xl md:text-2xl text-gray-300">
              <TextType text={demoConfigs[0].text} typingSpeed={demoConfigs[0].speed} className={demoConfigs[0].className} />
            </div>
          </div>

          {/* Multiple Text Array */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">Multiple Text Sequences</h3>
            <div className="text-lg md:text-xl text-gray-300 min-h-[2rem]">
              <TextType 
                text={demoConfigs[1].text}
                typingSpeed={demoConfigs[1].speed}
                pauseDuration={1500}
                deletingSpeed={40}
                className={demoConfigs[1].className}
                textColors={demoConfigs[1].colors}
              />
            </div>
          </div>

          {/* Variable Speed */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">Variable Typing Speed</h3>
            <div className="text-lg md:text-xl text-gray-300">
              <TextType 
                text={demoConfigs[2].text}
                variableSpeed={demoConfigs[2].variableSpeed}
                className={demoConfigs[2].className}
                cursorCharacter={demoConfigs[2].cursor}
                cursorClassName="text-type__cursor--block"
              />
            </div>
          </div>

          {/* Custom Cursor Styles */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">Custom Cursor Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{text: "Block cursor", cursor: "█", class: "text-type__cursor--block", color: "text-yellow-400"}, 
                {text: "Underline cursor", cursor: "_", class: "text-type__cursor--underline", color: "text-pink-400"}, 
                {text: "Thick cursor", cursor: "|", class: "text-type__cursor--thick", color: "text-cyan-400"}].map((config, i) => (
                <div key={i} className="text-lg text-gray-300">
                  <TextType text={config.text} typingSpeed={100} cursorCharacter={config.cursor} cursorClassName={config.class} className={config.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Mode */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">Reverse Typing Mode</h3>
            <div className="text-lg md:text-xl text-gray-300">
              <TextType text="This text appears in reverse order" reverseMode={true} typingSpeed={70} className="text-orange-400" cursorBlinkDuration={0.3} />
            </div>
          </div>

          {/* Start on Visible & No Loop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Start When Visible</h3>
              <div className="text-lg text-gray-300">
                <TextType text={demoConfigs[3].text} startOnVisible={demoConfigs[3].startOnVisible} typingSpeed={demoConfigs[3].speed} className={demoConfigs[3].className} initialDelay={100} />
              </div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Single Animation</h3>
              <div className="text-lg text-gray-300">
                <TextType text={demoConfigs[4].text} loop={demoConfigs[4].loop} typingSpeed={demoConfigs[4].speed} className={demoConfigs[4].className} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TextTypeDemo; 