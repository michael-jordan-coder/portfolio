# Mobile Animation Optimization Plan

## Overview
This document provides step-by-step instructions for optimizing animations on mobile devices while keeping desktop/tablet experiences unchanged. The goal is to improve mobile performance by reducing or disabling heavy animations that cause lag, while maintaining a professional appearance.

## Core Principle
- **Mobile (< 640px)**: Simplified animations or no animations
- **Tablet (640px - 1024px)**: Medium animations
- **Desktop (> 1024px)**: Full animations

---

## Phase 1: Create Shared Utilities

### Step 1.1: Create `useIsMobile` Hook

**File to create**: `hooks/useIsMobile.ts`

**Instructions**:
1. Create a new directory `hooks/` in the root if it doesn't exist
2. Create a custom hook that detects mobile screen size
3. Use `window.innerWidth < 640` as the mobile breakpoint
4. Include resize listener for dynamic updates
5. Return boolean value

**Expected code structure**:
```typescript
import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
```

**Testing**: Verify hook returns `true` on mobile viewport and `false` on desktop.

---

### Step 1.2: Create `usePrefersReducedMotion` Hook

**File to create**: `hooks/usePrefersReducedMotion.ts`

**Instructions**:
1. Create hook that checks `prefers-reduced-motion` media query
2. Respects user accessibility preferences
3. Returns boolean value

**Expected code structure**:
```typescript
import { useState, useEffect } from 'react';

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};
```

**Testing**: Verify hook respects system accessibility settings.

---

### Step 1.3: Create Animation Utilities

**File to create**: `lib/animation-utils.ts`

**Instructions**:
1. Create helper functions for conditional animations
2. Functions should check both mobile and reduced motion preferences
3. Provide duration and ease helpers

**Expected code structure**:
```typescript
export const shouldAnimate = (isMobile: boolean, prefersReducedMotion: boolean): boolean => {
  return !isMobile && !prefersReducedMotion;
};

export const getAnimationDuration = (
  isMobile: boolean, 
  prefersReducedMotion: boolean, 
  baseDuration: number
): number => {
  if (prefersReducedMotion) return 0.01;
  if (isMobile) return baseDuration * 0.3; // Faster on mobile
  return baseDuration;
};

export const getAnimationEase = (
  isMobile: boolean, 
  prefersReducedMotion: boolean, 
  baseEase: string = 'power2.out'
): string => {
  if (prefersReducedMotion || isMobile) return 'none';
  return baseEase;
};
```

**Testing**: Verify functions return correct values for different conditions.

---

## Phase 2: Optimize Heavy Components

### Step 2.1: Optimize HeroSection

**File to modify**: `app/sections/HeroSection.tsx`

**Current issues**:
- GSAP SplitText with complex word animations
- Ambient breathing animation
- Heavy parallax scroll transforms

**Instructions**:
1. Import `useIsMobile` and `usePrefersReducedMotion` hooks
2. In the `useEffect` that handles GSAP animations:
   - If mobile or reduced motion: Skip SplitText, show text immediately with simple fade
   - If desktop: Keep full animations
3. Disable ambient breathing animation on mobile
4. Reduce parallax scroll transform intensity on mobile (reduce `y2` transform values)
5. Keep button animations simple on mobile (just opacity fade)

**Expected changes**:
```typescript
const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  // ... existing code ...
  
  useEffect(() => {
    if (!headingRef.current || !buttonsRef.current || !accentRef.current) {
      return;
    }

    if (!shouldAnimate) {
      // Simple mobile version - just show content
      gsap.set(headingRef.current, { opacity: 1 });
      gsap.set(buttonsRef.current, { opacity: 1 });
      gsap.set(accentRef.current, { scaleX: 1 });
      return;
    }

    // Full desktop animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    // ... existing animation code ...
    
    // Only add ambient breathing if not mobile
    if (!isMobile) {
      const ambient = gsap.to(headingRef.current, {
        scale: 1.006,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
      return () => {
        tl.kill();
        ambient.kill();
        splitHeading.revert();
      };
    }
    
    return () => {
      tl.kill();
      splitHeading.revert();
    };
  }, [isMobile, prefersReducedMotion, shouldAnimate]);
  
  // Adjust parallax transforms for mobile
  const transforms = {
    y2: useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]),
    opacity: useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.3, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.95 : 0.8])
  };
};
```

**Testing**: 
- Verify text appears immediately on mobile
- Verify full animations work on desktop
- Check that parallax is less intense on mobile

---

### Step 2.2: Optimize SmoothSection

**File to modify**: `app/sections/SmoothSection.tsx`

**Current issues**:
- Framer Motion scroll transforms with scale/blur
- Floating elements animation
- Complex card animations

**Instructions**:
1. Import `useIsMobile` and `usePrefersReducedMotion` hooks
2. In `AnimatedCard` component:
   - On mobile: Simplify animations (remove blur, reduce scale range, remove zIndex animation)
   - Keep basic opacity fade
3. Disable floating elements on mobile (don't render them)
4. Reduce scroll parallax intensity in `SmoothCarousel` component

**Expected changes**:
```typescript
const AnimatedCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const centerProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  const animations = shouldAnimate ? {
    y: useTransform(centerProgress, [0, 1], [50, 0]),
    opacity: useTransform(centerProgress, [0, 1], [0.3, 1]),
    scale: useTransform(centerProgress, [0, 1], [0.3, 1.1]),
    zIndex: useTransform(centerProgress, [0, 1], [1, 10]),
    filter: useTransform(centerProgress, [0, 1], ['blur(3px)', 'blur(0px)'])
  } : {
    y: useTransform(centerProgress, [0, 1], [20, 0]),
    opacity: useTransform(centerProgress, [0, 1], [0.5, 1]),
    scale: 1,
    zIndex: 1,
    filter: 'blur(0px)'
  };

  return (
    <motion.div ref={cardRef} className="h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center px-3 sm:px-4" style={animations}>
      <ProjectCard project={project} />
    </motion.div>
  );
};

// In SmoothCarousel component
const SmoothCarousel: React.FC = () => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const transforms = {
    y1: useTransform(scrollYProgress, [0, 1], [isMobile ? 50 : 200, isMobile ? -25 : -100]),
    y2: useTransform(scrollYProgress, [0, 1], [isMobile ? 25 : 100, isMobile ? -12 : -50]),
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  };

  // ... existing code ...
  
  // Only render floating elements if not mobile
  {isClient && !isMobile && (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: transforms.opacity }}>
      {FLOATING_ELEMENTS.map((element, i) => (
        // ... floating elements code ...
      ))}
    </motion.div>
  )}
};
```

**Testing**:
- Verify cards animate smoothly on mobile (simplified)
- Verify floating elements don't appear on mobile
- Check desktop still has full animations

---

### Step 2.3: Optimize DomeGallery

**File to modify**: `components/DomeGallery.tsx`

**Current issues**:
- 3D sphere rotation with 30 segments
- WebGL rendering
- Complex drag gestures
- Heavy enlarge animations

**Instructions**:
1. Import `useIsMobile` hook
2. Reduce `segments` prop on mobile (30 → 15 or 20)
3. Adjust `dragSensitivity` for mobile (increase value = less sensitive)
4. Simplify enlarge animation on mobile (already done, but verify)
5. Consider reducing `fit` value on mobile for smaller sphere

**Expected changes**:
```typescript
// In GsapSection.tsx - pass mobile-aware props
export default function GsapSection() {
  const isMobile = useIsMobile();
  
  // ... existing code ...
  
  <DomeGallery 
    images={[...]}
    fit={isMobile ? 0.5 : 0.6}
    segments={isMobile ? 15 : 30}
    maxVerticalRotationDeg={8}
    dragSensitivity={isMobile ? 35 : 25} // Higher = less sensitive
    // ... other props
  />
```

**Note**: The enlarge animation mobile optimization was already done in previous changes. Verify it's working correctly.

**Testing**:
- Verify sphere is less complex on mobile
- Check drag interaction feels good on mobile
- Verify enlarge animation is simplified on mobile

---

### Step 2.4: Optimize GsapSection

**File to modify**: `app/sections/GsapSection.tsx`

**Instructions**:
1. Import `useIsMobile` hook
2. Pass mobile-aware props to DomeGallery (as shown in Step 2.3)
3. No other changes needed (DomeGallery handles the optimization)

**Testing**: Verify props are passed correctly.

---

### Step 2.5: Optimize AboutCTASection

**File to modify**: `app/sections/AboutCTASection.tsx`

**Current issues**:
- Framer Motion parallax
- Animated NeonBlobs

**Instructions**:
1. Import `useIsMobile` and `usePrefersReducedMotion` hooks
2. Disable `animated` prop on NeonBlobs for mobile
3. Reduce parallax intensity on mobile

**Expected changes**:
```typescript
const AboutCTASection: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 25 : 50, isMobile ? -25 : -50]);

  return (
    <SectionWrapper id="about-cta" variant="default">
      <NeonBlob 
        position="custom" 
        customClass="right-1/4 top-1/3 -rotate-12" 
        size="md" 
        colors={['#a855f7', '#ec4899', '#ef4444']} 
        opacity={0.3} 
        animated={shouldAnimate}
      />
      <NeonBlob 
        position="custom" 
        customClass="left-1/4 bottom-1/3 rotate-6" 
        size="sm" 
        colors={['#06b6d4', '#3b82f6', '#6366f1']} 
        opacity={0.25} 
        animated={shouldAnimate}
      />
      // ... rest of component
    </SectionWrapper>
  );
};
```

**Testing**: Verify NeonBlobs don't animate on mobile, parallax is reduced.

---

### Step 2.6: Optimize About Page

**File to modify**: `app/about/page.tsx`

**Current issues**:
- GSAP ScrollTrigger with character-by-character animations
- Complex rotation transforms

**Instructions**:
1. Import `useIsMobile` and `usePrefersReducedMotion` hooks
2. In GSAP animations:
   - On mobile: Skip character splitting, use simple fade-in
   - On desktop: Keep full character animations
3. Reduce rotation transforms on mobile

**Expected changes**:
```typescript
const AboutPage: React.FC = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;

  // GSAP ScrollTrigger animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // About section animation
    if (aboutSectionRef.current) {
      const titleElement = aboutSectionRef.current.querySelector('h1');
      const textElement = aboutSectionRef.current.querySelector('p');
      
      if (titleElement && textElement) {
        if (!shouldAnimate) {
          // Simple mobile version
          gsap.set([titleElement, textElement], { opacity: 1, y: 0 });
          return;
        }

        // Full desktop animation with character splitting
        const titleText = titleElement.textContent || '';
        titleElement.innerHTML = titleText.split('').map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        const chars = titleElement.querySelectorAll('.char');
        // ... existing animation code ...
      }
    }
    
    // Apply same pattern to other sections
  }, [isMobile, prefersReducedMotion, shouldAnimate]);
};
```

**Testing**: Verify simple fade on mobile, full animations on desktop.

---

## Phase 3: Optimize Background Effects

### Step 3.1: Optimize Aurora Component

**File to modify**: `components/Aurora.tsx`

**Current issues**:
- Continuous WebGL shader animation
- High frame rate rendering

**Instructions**:
1. Import `useIsMobile` hook
2. Reduce animation speed on mobile (multiply speed by 0.5)
3. Lower amplitude on mobile
4. Consider pausing animation when not visible (optional optimization)

**Expected changes**:
```typescript
export default function Aurora(props: AuroraProps) {
  const isMobile = useIsMobile();
  const {
    colorStops = ["#5227FF", "#7cff67", "#5227FF"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 1.0,
  } = props;
  
  // Adjust props for mobile
  const adjustedSpeed = isMobile ? speed * 0.5 : speed;
  const adjustedAmplitude = isMobile ? amplitude * 0.7 : amplitude;
  
  // ... existing code ...
  
  const update = (t: number) => {
    animateId = requestAnimationFrame(update);
    const { time = t * 0.01 } = propsRef.current;
    if (program) {
      program.uniforms.uTime.value = time * adjustedSpeed * 0.1;
      program.uniforms.uAmplitude.value = adjustedAmplitude;
      // ... rest of update code
    }
  };
}
```

**Testing**: Verify Aurora animates slower on mobile, less intense.

---

### Step 3.2: Optimize NeonBlobs in _shared.tsx

**File to modify**: `app/sections/_shared.tsx`

**Instructions**:
1. The `NeonBlob` component already accepts `animated` prop
2. Ensure components using NeonBlob pass `animated={!isMobile}` (already handled in Step 2.5)
3. No changes needed to NeonBlob component itself

**Testing**: Verify static blobs on mobile, animated on desktop.

---

## Phase 4: Optimize Utility Components

### Step 4.1: Optimize AnimatedContent

**File to modify**: `components/AnimatedContent.tsx`

**Current issues**:
- GSAP ScrollTrigger animations

**Instructions**:
1. Import `useIsMobile` and `usePrefersReducedMotion` hooks
2. Skip GSAP animations on mobile, show content immediately
3. Or use simple CSS fade-in for mobile

**Expected changes**:
```typescript
const AnimatedContent: React.FC<AnimatedContentProps> = ({
  // ... props
}) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!shouldAnimate) {
      // Simple mobile version - show immediately
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    // Full desktop animations
    // ... existing animation code ...
  }, [shouldAnimate, /* other deps */]);

  return <div ref={ref}>{children}</div>;
};
```

**Testing**: Verify content appears immediately on mobile.

---

### Step 4.2: Review Other Components

**Files to check**:
- `components/LivingSquaresGrid.tsx`
- `components/ImageTrail.tsx`
- `components/ui/wobble-card.tsx`

**Instructions**:
1. Review each component for heavy animations
2. Apply same pattern: use `useIsMobile` and conditionally disable animations
3. For WobbleCard: Disable wobble effect on mobile (touch devices don't have mouse)

**Expected changes for WobbleCard**:
```typescript
export const WobbleCard = ({ children, containerClassName, className }) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; // Skip on mobile
    // ... existing mouse tracking code
  };

  return (
    <motion.section
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : () => setIsHovering(true)}
      onMouseLeave={isMobile ? undefined : () => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isMobile || !isHovering
          ? "translate3d(0px, 0px, 0) scale3d(1, 1, 1)"
          : `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`,
        transition: "transform 0.1s ease-out",
      }}
      // ... rest of component
    />
  );
};
```

**Testing**: Verify each component works correctly on mobile.

---

## Phase 5: Global CSS Optimizations

### Step 5.1: Add Global Mobile Animation Rules

**File to modify**: `app/globals.css`

**Instructions**:
1. Add media query for mobile devices
2. Reduce animation durations
3. Respect `prefers-reduced-motion`

**Expected changes**:
```css
@layer utilities {
  /* ... existing utilities ... */
  
  /* Mobile animation optimizations */
  @media (max-width: 639px) {
    /* Reduce animation durations on mobile */
    * {
      animation-duration: 0.3s !important;
      transition-duration: 0.2s !important;
    }
    
    /* Disable complex animations */
    @keyframes pulse {
      from, to { opacity: 1; }
    }
  }
  
  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

**Testing**: Verify animations are faster/disabled on mobile.

---

## Phase 6: Testing and Refinement

### Step 6.1: Test on Real Devices

**Instructions**:
1. Test on iOS Safari (iPhone)
2. Test on Android Chrome
3. Test on low-end Android device if possible
4. Check:
   - Page load time
   - Scroll performance
   - Animation smoothness
   - Battery usage (if possible)

**Checklist**:
- [ ] HeroSection loads quickly on mobile
- [ ] SmoothSection scrolls smoothly
- [ ] DomeGallery is interactive but not laggy
- [ ] No janky animations
- [ ] Text is readable immediately
- [ ] Buttons are responsive

---

### Step 6.2: Performance Monitoring

**Instructions**:
1. Use Chrome DevTools Performance tab
2. Record performance on mobile viewport
3. Check:
   - FPS during animations (should be 60fps or close)
   - Memory usage
   - CPU usage
   - Layout shifts

**Metrics to aim for**:
- FPS: > 55fps on mobile
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- No layout shifts during animations

---

### Step 6.3: Cross-browser Testing

**Instructions**:
1. Test on Safari (iOS)
2. Test on Chrome (Android)
3. Test on Firefox (mobile)
4. Verify all animations work or are properly disabled

---

## Implementation Order

### Recommended Sequence:

1. **Phase 1** (30 min): Create all hooks and utilities
2. **Phase 2.1** (30 min): HeroSection - highest impact
3. **Phase 2.2** (40 min): SmoothSection - main content
4. **Phase 2.3** (30 min): DomeGallery - most complex
5. **Phase 3.1** (20 min): Aurora - continuous rendering
6. **Phase 2.5** (15 min): AboutCTASection
7. **Phase 2.6** (30 min): About Page
8. **Phase 4** (30 min): Utility components
9. **Phase 5** (15 min): Global CSS
10. **Phase 6** (60 min): Testing

**Total estimated time**: 4-5 hours

---

## Key Patterns to Follow

### Pattern 1: Conditional Animation Hook
```typescript
const isMobile = useIsMobile();
const prefersReducedMotion = usePrefersReducedMotion();
const shouldAnimate = !isMobile && !prefersReducedMotion;
```

### Pattern 2: Early Return for Mobile
```typescript
useEffect(() => {
  if (!shouldAnimate) {
    // Simple version - show immediately
    gsap.set(element, { opacity: 1, x: 0, y: 0 });
    return;
  }
  
  // Full animations
  gsap.timeline()...
}, [shouldAnimate]);
```

### Pattern 3: Reduced Values for Mobile
```typescript
const value = isMobile ? reducedValue : fullValue;
```

### Pattern 4: Conditional Rendering
```typescript
{!isMobile && <AnimatedComponent />}
```

---

## Notes

- Always test on actual mobile devices, not just browser dev tools
- Keep desktop experience unchanged
- Maintain visual hierarchy even without animations
- Ensure content is accessible immediately on mobile
- Consider battery impact of continuous animations

---

## Success Criteria

✅ Mobile site loads quickly (< 2s)
✅ Smooth scrolling on mobile (60fps)
✅ No janky animations
✅ Desktop experience unchanged
✅ Respects accessibility preferences
✅ Professional appearance maintained

---

## Troubleshooting

**If animations still lag on mobile:**
- Further reduce animation complexity
- Disable more animations
- Check for memory leaks
- Verify hooks are working correctly

**If desktop is affected:**
- Check breakpoint logic
- Verify `shouldAnimate` conditions
- Test on different screen sizes

**If content doesn't appear:**
- Check early return logic
- Verify GSAP set() calls
- Ensure fallback rendering

---

## Final Checklist

Before considering this complete:

- [ ] All hooks created and tested
- [ ] HeroSection optimized
- [ ] SmoothSection optimized
- [ ] DomeGallery optimized
- [ ] Aurora optimized
- [ ] All other components reviewed
- [ ] Global CSS rules added
- [ ] Tested on real mobile devices
- [ ] Desktop experience verified unchanged
- [ ] Performance metrics acceptable
- [ ] Code committed and pushed

---

**Good luck! This will significantly improve mobile performance while maintaining the impressive desktop experience.**

