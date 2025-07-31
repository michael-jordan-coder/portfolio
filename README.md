# Smooth Scroll Next.js App

A Next.js application with buttery-smooth scrolling using Lenis, fully integrated with GSAP ScrollTrigger support.

## Features

- ✨ Smooth scrolling with Lenis
- 🎨 GSAP ScrollTrigger integration (optional)
- 📱 Responsive design with TailwindCSS
- ⚡ TypeScript support
- 🎯 Clean, scalable architecture

## Installation

The project comes with all dependencies pre-configured:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the smooth scrolling in action.

## Architecture

### SmoothScrollProvider

The core of the smooth scrolling implementation is the `SmoothScrollProvider` component located at `components/SmoothScrollProvider.tsx`. It:

- Initializes Lenis with optimized settings (`lerp: 0.08`)
- Automatically connects to `requestAnimationFrame` for smooth updates
- Optionally integrates with GSAP ScrollTrigger if available
- Properly cleans up on unmount

### Global CSS Configuration

The `app/globals.css` file includes:

- Tailwind CSS imports
- Lenis CSS imports
- Essential smooth scroll styles (`overflow: hidden` on html/body)

### Layout Integration

The main layout (`app/layout.tsx`) wraps the entire application with the `SmoothScrollProvider`, ensuring all pages have smooth scrolling.

## GSAP Integration

The provider automatically detects and integrates with GSAP ScrollTrigger if it's installed. To use GSAP animations:

1. Install GSAP: `npm install gsap`
2. Import ScrollTrigger in your components:

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Your animations will work seamlessly with smooth scrolling
```

## Customization

### Lenis Configuration

Modify the Lenis settings in `SmoothScrollProvider.tsx`:

```tsx
const lenis = new Lenis({
  lerp: 0.08,           // Smoothness (0-1, lower = smoother)
  smoothWheel: true,    // Enable smooth wheel scrolling
  // Add more options as needed
})
```

### CSS Customization

The global styles can be extended in `app/globals.css`:

```css
@layer base {
  html,
  body {
    height: auto;
    overflow: hidden;
    /* Add your custom styles here */
  }
}
```

## Performance

- Optimized `requestAnimationFrame` loop
- Minimal bundle size impact
- Efficient scroll event handling
- Compatible with React 18+ features

## Browser Support

- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

## Troubleshooting

### Scrolling doesn't work
- Ensure `overflow: hidden` is applied to html/body
- Check that no parent elements have conflicting scroll properties

### GSAP animations are jumpy
- Make sure ScrollTrigger is properly registered
- Verify the scroller proxy is correctly configured

### Performance issues
- Reduce the `lerp` value for less smoothing
- Check for conflicting CSS animations

## License

MIT # Updated for deployment
