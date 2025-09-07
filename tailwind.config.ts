/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Standardized breakpoint strategy
      screens: {
        'xs': '375px',   // Small phones
        'sm': '640px',   // Large phones / small tablets
        'md': '768px',   // Tablets
        'lg': '1024px',  // Small desktops
        'xl': '1280px',  // Large desktops
        '2xl': '1536px', // Extra large screens
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem'],
      },
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Secondary Accent Colors
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Neutral Colors (for text and backgrounds)
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Semantic Colors
        semantic: {
          // Text colors
          'text-primary': '#171717',      // neutral-900
          'text-secondary': '#404040',   // neutral-700  
          'text-tertiary': '#737373',    // neutral-500
          'text-muted': '#a3a3a3',      // neutral-400
          
          // Background colors
          'bg-primary': '#ffffff',       // white
          'bg-secondary': '#fafafa',   // neutral-50
          'bg-tertiary': '#f5f5f5',     // neutral-100
          'bg-muted': '#e5e5e5',        // neutral-200
          
          // Border colors
          'border-primary': '#e5e5e5',   // neutral-200
          'border-secondary': '#d4d4d4', // neutral-300
          'border-muted': '#a3a3a3',    // neutral-400
          
          // Dark theme colors
          'dark-bg-primary': '#000000',   // black
          'dark-bg-secondary': '#0a0a0a', // neutral-950
          'dark-text-primary': '#ffffff', // white
          'dark-text-secondary': '#f5f5f5', // neutral-100
          'dark-text-muted': '#a3a3a3',   // neutral-400
          'dark-border-primary': 'rgba(255, 255, 255, 0.1)',
          'dark-border-secondary': 'rgba(255, 255, 255, 0.2)',
        },
        // Project-specific accent colors
        'tuqqi-blue': '#3b82f6',
        'notes-gray': '#2a2a2a',
        'notes-border': '#c6c6c8',
      },
    },
  },
  plugins: [],
} 