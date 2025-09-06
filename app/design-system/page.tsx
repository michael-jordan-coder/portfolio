'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button'
import Aurora from '../../components/Aurora'

const DesignSystemPage = () => {
  const [activeTab, setActiveTab] = useState('colors')

  const tabs = [
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '📝' },
    { id: 'components', label: 'Components', icon: '🧩' },
    { id: 'custom-components', label: 'Custom Components', icon: '⚡' },
    { id: 'spacing', label: 'Spacing', icon: '📏' },
    { id: 'animations', label: 'Animations', icon: '✨' },
    { id: 'utilities', label: 'Utilities', icon: '🔧' }
  ]

  const colorPalette = {
    primary: {
      name: 'Primary',
      colors: [
        { name: 'Primary', value: '#505ae4', class: 'bg-blue-600' },
        { name: 'Primary Hover', value: '#333cab', class: 'bg-blue-700' },
        { name: 'Primary Light', value: '#7c8bf8', class: 'bg-blue-400' }
      ]
    },
    secondary: {
      name: 'Secondary',
      colors: [
        { name: 'Secondary', value: '#ea4db9', class: 'bg-pink-500' },
        { name: 'Secondary Hover', value: '#d61f8a', class: 'bg-pink-600' },
        { name: 'Secondary Light', value: '#f17cc0', class: 'bg-pink-400' }
      ]
    },
    neutral: {
      name: 'Neutral',
      colors: [
        { name: 'Black', value: '#000000', class: 'bg-black' },
        { name: 'White', value: '#ffffff', class: 'bg-white' },
        { name: 'Gray 100', value: '#f3f4f6', class: 'bg-gray-100' },
        { name: 'Gray 300', value: '#d1d5db', class: 'bg-gray-300' },
        { name: 'Gray 500', value: '#6b7280', class: 'bg-gray-500' },
        { name: 'Gray 700', value: '#374151', class: 'bg-gray-700' },
        { name: 'Gray 900', value: '#111827', class: 'bg-gray-900' }
      ]
    },
    accent: {
      name: 'Accent',
      colors: [
        { name: 'Success', value: '#10b981', class: 'bg-green-500' },
        { name: 'Warning', value: '#f59e0b', class: 'bg-yellow-500' },
        { name: 'Error', value: '#ef4444', class: 'bg-red-500' },
        { name: 'Info', value: '#3b82f6', class: 'bg-blue-500' }
      ]
    }
  }

      const typography = {
      headings: [
        { name: 'H1', class: 'text-8xl', example: 'Main Heading' },
        { name: 'H2', class: 'text-6xl', example: 'Secondary Heading' },
        { name: 'H3', class: 'text-4xl', example: 'Tertiary Heading' },
        { name: 'H4', class: 'text-2xl', example: 'Quaternary Heading' },
        { name: 'H5', class: 'text-xl', example: 'Fifth Heading' },
        { name: 'H6', class: 'text-lg', example: 'Sixth Heading' }
      ],
      body: [
        { name: 'Body Large', class: 'text-lg', example: 'Large body text' },
        { name: 'Body Default', class: 'text-base', example: 'Default body text' },
        { name: 'Body Small', class: 'text-sm', example: 'Small body text' },
        { name: 'Caption', class: 'text-xs', example: 'Caption text' }
      ]
    }

  const spacing = {
    scale: [
      { name: '0', class: 'p-0', size: '0px' },
      { name: '1', class: 'p-1', size: '4px' },
      { name: '2', class: 'p-2', size: '8px' },
      { name: '3', class: 'p-3', size: '12px' },
      { name: '4', class: 'p-4', size: '16px' },
      { name: '5', class: 'p-5', size: '20px' },
      { name: '6', class: 'p-6', size: '24px' },
      { name: '8', class: 'p-8', size: '32px' },
      { name: '10', class: 'p-10', size: '40px' },
      { name: '12', class: 'p-12', size: '48px' },
      { name: '16', class: 'p-16', size: '64px' },
      { name: '20', class: 'p-20', size: '80px' },
      { name: '24', class: 'p-24', size: '96px' }
    ]
  }

  const animations = {
    transitions: [
      { name: 'Fast', class: 'duration-150', value: '150ms' },
      { name: 'Normal', class: 'duration-200', value: '200ms' },
      { name: 'Slow', class: 'duration-300', value: '300ms' },
      { name: 'Slower', class: 'duration-500', value: '500ms' }
    ],
    easings: [
      { name: 'Linear', class: 'ease-linear' },
      { name: 'In', class: 'ease-in' },
      { name: 'Out', class: 'ease-out' },
      { name: 'In-Out', class: 'ease-in-out' }
    ]
  }

  const renderColors = () => (
    <div className="space-y-8">
      {Object.entries(colorPalette).map(([key, category]) => (
        <div key={key} className="space-y-4">
          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.colors.map((color, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                <div className={`w-12 h-12 rounded-lg ${color.class} border border-white/30`}></div>
                <div>
                  <p className="font-medium text-white">{color.name}</p>
                  <p className="text-sm text-gray-300 font-mono">{color.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderTypography = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-100 mb-4">Headings</h3>
        <div className="space-y-4">
          {typography.headings.map((heading, index) => (
            <div key={index} className="p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-sm text-gray-300 mb-2">{heading.name}</p>
              <p className={`${heading.class} font-bold text-white`}>{heading.example}</p>
              <p className="text-sm text-gray-400 mt-2 font-mono">{heading.class}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-100 mb-4">Body Text</h3>
        <div className="space-y-4">
          {typography.body.map((text, index) => (
            <div key={index} className="p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-sm text-gray-300 mb-2">{text.name}</p>
              <p className={`${text.class} text-white`}>{text.example}</p>
              <p className="text-sm text-gray-400 mt-2 font-mono">{text.class}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderComponents = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-100 mb-4">Buttons</h3>
        <div className="space-y-4">
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">Variants</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="accent">Accent</Button>
            </div>
          </div>
          
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCustomComponents = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Custom Project Components</h3>
        <div className="space-y-6">
          
          {/* Aurora Hero Frame */}
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-3">Aurora Hero Background</h4>
            <p className="text-sm text-gray-300 mb-4">Miniature version of the hero section with aurora background effect</p>
            
            {/* Aurora Background Frame */}
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-black">
              {/* Aurora Effect - Miniature version */}
              <div className="absolute inset-0">
                <Aurora 
                  colorStops={["#7CFF67", "#FF2974", "#57BEFF"]}
                  amplitude={0.4}
                  blend={0.3}
                  speed={0.2}
                />
              </div>
              
              {/* Subtle overlay for better visibility */}
              <div className="absolute inset-0 bg-black/10 z-10" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Hero Section</h3>
                  <p className="text-sm text-gray-200">Aurora Background Effect</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-2 font-mono">components/Aurora.tsx + HeroSection.tsx</p>
          </div>

          {/* Project Card Component */}
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <h4 className="text-lg font-semibold text-white mb-3">Project Card Component</h4>
            <p className="text-sm text-gray-300 mb-4">Interactive project card with blur effect on hover and smooth transitions</p>
            
            {/* Card Demo */}
            <div className="w-[200%] h-[300px] rounded-[40px] overflow-hidden 
                           shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                           will-change-transform cursor-pointer transition-all duration-300
                           hover:bg-white/20 hover:shadow-2xl group">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 pointer-events-none" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 group-hover:backdrop-blur-xl transition-all duration-300">
                  <div className="space-y-3">
                    {/* Category badge */}
                    <span className="inline-block bg-white/30 backdrop-blur-lg text-white font-medium text-xs px-3 py-1 rounded-full drop-shadow-lg">
                      Design System
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                      Dashboard OS
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white text-sm leading-relaxed max-w-md drop-shadow-md">
                      A comprehensive design system for modern dashboard interfaces with component library and design tokens
                    </p>
                    
                    {/* CTA Button */}
                    <Button
                      variant="primary"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 
                                 text-white font-semibold hover:scale-105 hover:shadow-lg
                                 focus:ring-white/50 drop-shadow-md"
                    >
                      View Project →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-2 font-mono">components/SmoothSection.tsx - ProjectCard Component</p>
          </div>

        </div>
      </div>
    </div>
  )

  const renderSpacing = () => (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-100">Spacing Scale</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spacing.scale.map((item, index) => (
          <div key={index} className="p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <div className={`${item.class} bg-blue-900 border border-blue-600 rounded`}>
              <p className="text-center text-blue-200 font-medium">{item.name}</p>
            </div>
            <p className="text-sm text-gray-300 mt-2 text-center">{item.size}</p>
            <p className="text-xs text-gray-400 mt-1 text-center font-mono">{item.class}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnimations = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Transitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animations.transitions.map((transition, index) => (
            <div key={index} className="p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-sm text-gray-300 mb-2">{transition.name}</p>
              <div className={`w-full h-4 bg-blue-500 rounded transition-all ${transition.class} hover:bg-blue-600`}></div>
              <p className="text-xs text-gray-400 mt-2 font-mono">{transition.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Easing Functions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animations.easings.map((easing, index) => (
            <div key={index} className="p-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-sm text-gray-300 mb-2">{easing.name}</p>
              <div className={`w-full h-4 bg-green-500 rounded transition-all ${easing.class} hover:bg-green-600`}></div>
              <p className="text-xs text-gray-400 mt-2 font-mono">{easing.class}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderUtilities = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Useful Utilities</h3>
        <div className="space-y-4">
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">Cursor Custom</p>
            <div className="tech-stack-cursor p-4 bg-gray-900 rounded border-2 border-dashed border-gray-600">
              <p className="text-center text-gray-300">Hover here for custom cursor</p>
            </div>
          </div>
          
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">CTA Animation</p>
            <div className="animate-cta p-4 bg-pink-500 text-white rounded-lg text-center">
              <p>Animated CTA Button</p>
            </div>
          </div>
          
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">Gradient Animation</p>
            <div className="animate-gradient-move w-full h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg"></div>
          </div>
          
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-gray-300 mb-4">Slow Spin</p>
            <div className="animate-spin-slow w-16 h-16 bg-blue-500 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'colors':
        return renderColors()
      case 'typography':
        return renderTypography()
      case 'components':
        return renderComponents()
      case 'custom-components':
        return renderCustomComponents()
      case 'spacing':
        return renderSpacing()
      case 'animations':
        return renderAnimations()
      case 'utilities':
        return renderUtilities()
      default:
        return renderColors()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Design System</h1>
              <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded">v1.0</span>
            </div>
            <div className="text-sm text-gray-400">
              Project: Daniel New01
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-white/10">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/40 backdrop-blur-lg rounded-lg border border-white/10 p-8"
        >
          {renderContent()}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Design System - All Rights Reserved © 2025</p>
        </div>
      </div>
    </div>
  )
}

export default DesignSystemPage
