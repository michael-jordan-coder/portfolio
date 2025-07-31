'use client'

import React from 'react';
import { ScrollToButton } from './ScrollToButton';
import { Button } from './Button';

const DesignSystemShowcase: React.FC = () => {
  return (
    <section className="section-accent">
      <div className="content-container">
        <h1 className="text-hero mb-8">🎨 Design System</h1>
        <p className="text-body-large mb-12">
          מערכת עיצוב מקיפה לפרויקט Smooth Scroll
        </p>

        {/* Typography Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">📝 Typography</h2>
          <div className="space-y-4 text-left">
            <h1 className="text-hero">Hero Text (64px)</h1>
            <h2 className="text-display">Display Text (48px)</h2>
            <h3 className="text-heading-1">Heading 1 (40px)</h3>
            <h4 className="text-heading-2">Heading 2 (32px)</h4>
            <h5 className="text-heading-3">Heading 3 (24px)</h5>
            <p className="text-body-large">Body Large Text (20px)</p>
            <p className="text-body">Body Text (16px)</p>
            <p className="text-body-small">Body Small Text (14px)</p>
          </div>
        </div>

        {/* Buttons Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">🔘 Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="primary">Secondary Button</Button>
            <Button variant="primary">Outline Button</Button>
            <Button variant="primary">Accent Button</Button>
          </div>
          
          <h3 className="text-heading-3 mt-6 mb-4">Button Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Colors Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">🎨 Colors</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <div>
              <h3 className="text-heading-3 mb-3">Primary (Blue)</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded bg-primary-${shade} border border-white/20`}
                    ></div>
                    <span className="text-body-small">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div>
              <h3 className="text-heading-3 mb-3">Secondary (Purple)</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded bg-secondary-${shade} border border-white/20`}
                    ></div>
                    <span className="text-body-small">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-heading-3 mb-3">Accent (Orange)</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded bg-accent-${shade} border border-white/20`}
                    ></div>
                    <span className="text-body-small">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pink Colors */}
            <div>
              <h3 className="text-heading-3 mb-3">Pink</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded bg-pink-${shade} border border-white/20`}
                    ></div>
                    <span className="text-body-small">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">🎴 Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-base p-6">
              <h3 className="text-heading-3">Base Card</h3>
              <p className="text-body">כרטיס בסיסי עם צללים</p>
            </div>
            
            <div className="card-glass p-6">
              <h3 className="text-heading-3">Glass Card</h3>
              <p className="text-body">כרטיס עם אפקט זכוכית</p>
            </div>
            
            <div className="big-box !min-h-[150px]">
              Big Box Component
            </div>
          </div>
        </div>

        {/* Gradients Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">🌈 Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-hero h-24 rounded-container flex items-center justify-center text-white font-semibold">
              Hero
            </div>
            <div className="bg-gradient-smooth h-24 rounded-container flex items-center justify-center text-white font-semibold">
              Smooth
            </div>
            <div className="bg-gradient-gsap h-24 rounded-container flex items-center justify-center text-white font-semibold">
              GSAP
            </div>
            <div className="bg-gradient-accent h-24 rounded-container flex items-center justify-center text-white font-semibold">
              Accent
            </div>
          </div>
        </div>

        {/* Shadows Showcase */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">🎭 Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white/10 p-4 rounded-container shadow-soft">
              <p className="text-body-small">Soft Shadow</p>
            </div>
            <div className="bg-white/10 p-4 rounded-container shadow-medium">
              <p className="text-body-small">Medium Shadow</p>
            </div>
            <div className="bg-white/10 p-4 rounded-container shadow-strong">
              <p className="text-body-small">Strong Shadow</p>
            </div>
            <div className="bg-white/10 p-4 rounded-container shadow-glow">
              <p className="text-body-small">Glow Shadow</p>
            </div>
            <div className="bg-white/10 p-4 rounded-container shadow-glow-purple">
              <p className="text-body-small">Purple Glow</p>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="card-glass p-8 mb-8">
          <h2 className="text-display mb-6">⚡ Interactive Elements</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" className="glow-hover">Glow Hover</Button>
              <Button variant="primary" className="glow-hover-purple">Purple Glow Hover</Button>
              <div className="glass-effect p-4 rounded-container">Glass Effect</div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <ScrollToButton target="#hero" className="btn-outline">
                Scroll to Hero
              </ScrollToButton>
              <Button variant="primary" className="animate-float">
                Floating Button
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="card-glass p-8">
          <h2 className="text-display mb-6">📚 Usage Instructions</h2>
          <div className="text-left space-y-4">
            <div>
              <h3 className="text-heading-3">כפתורים</h3>
              <code className="bg-black/20 p-2 rounded text-body-small block mt-2">
                {`<Button variant="primary">Primary</Button>`}
              </code>
            </div>
            
            <div>
              <h3 className="text-heading-3">קטעים</h3>
              <code className="bg-black/20 p-2 rounded text-body-small block mt-2">
                {`<section className="section-hero">
  <div className="content-container">
    <h1 className="text-hero">Title</h1>
  </div>
</section>`}
              </code>
            </div>
            
            <div>
              <h3 className="text-heading-3">כרטיסים</h3>
              <code className="bg-black/20 p-2 rounded text-body-small block mt-2">
                {`<div className="card-glass p-6">
  <h3 className="text-heading-2">Title</h3>
  <p className="text-body">Content</p>
</div>`}
              </code>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ScrollToButton target="#hero" className="btn-primary">
            🚀 חזרה להתחלה
          </ScrollToButton>
        </div>
      </div>
    </section>
  )
}

export default DesignSystemShowcase 