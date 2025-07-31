# Main Page Design System Overview

This document explains the design principles and technical implementation behind the clean, simple, and visually engaging main page.

---

## 1. **Background & Visual Atmosphere**

- **Fluid Interactive Background:**  
  The page uses a custom `<SplashCursor />` React component, which renders a full-screen, interactive fluid simulation using WebGL. This creates a subtle, dynamic, and modern background effect that responds to user input, adding depth without distracting from the content.

- **Gradient Layers & Noise:**  
  Each section (Hero, Projects, Footer) uses a `bg-gradient-to-b` Tailwind class for smooth vertical gradients, with additional neon “blob” overlays for color and vibrancy.  
  A semi-transparent noise texture (`/noise.svg`) is layered on top for a tactile, analog feel.

---

## 2. **Typography**

- **Font Choice:**  
  The base font is set to `system-ui, sans-serif` for a clean, modern, and accessible look.
- **Hierarchy:**  
  - **Headings:** Large, bold (`text-5xl`/`text-6xl`), centered, and white for maximum contrast.
  - **Body Text:** Slightly larger than default (`text-xl`/`text-lg`), with generous spacing for readability.
- **Color:**  
  All text is white or near-white, ensuring clarity against the dark, gradient backgrounds.

---

## 3. **Card & Section Design**

- **Project Cards:**  
  - **Structure:**  
    Each card is a rounded rectangle (`rounded-[40px]`), with a glassmorphic effect:  
    - `bg-white/10` (translucent white)
    - `backdrop-blur-sm`
    - `border border-white/20`
    - `shadow-2xl`
  - **Content:**  
    - **Image/Video/Figma Preview:** The top portion of the card is reserved for a project image, video, or live Figma embed.  
    - **Overlay:** A gradient overlay ensures text is always readable.
    - **Text:** Project title, description, and category badge are overlaid at the bottom.
    - **CTA:** A rounded button invites users to view the project.
  - **Animation:**  
    - Cards animate smoothly into focus as you scroll, using Framer Motion for scale, blur, and opacity transitions.  
    - Only the image portion animates for depth, not the entire card.

- **Section Layout:**  
  - **Hero Section:**  
    - Centered profile image, bold headline, and two clear CTAs.
    - Neon gradient “blob” and noise overlay for visual interest.
  - **Project Carousel:**  
    - Vertically stacked cards, each animating as it approaches the center of the viewport.
    - Section header and subheader are centered above the carousel.
  - **Footer/End Section:**  
    - Simple, centered text and navigation buttons.
    - Subtle neon gradient and noise overlays continue the visual theme.

---

## 4. **Color & Theme Tokens**

- **Global CSS Variables:**  
  Defined in `globals.css` (example):
  ```css
  :root {
    --color-bg-page: #f2f6fc;
    --color-text-primary: #252525;
    --color-primary: #505ae4;
    --color-primary-hover: #333cab;
    --color-secondary: #ea4db9;
  }
  ```
- **Tailwind Colors:**  
  Most colors are handled via Tailwind utility classes, with gradients and overlays using `from-pink-500 via-fuchsia-500 to-orange-400` for a vibrant, modern palette.

---

## 5. **Accessibility & Responsiveness**

- **Responsiveness:**  
  - All layouts use Tailwind’s responsive classes (`sm:`, `md:`, `lg:`) for mobile-first design.
  - Cards and sections scale and reflow gracefully from mobile to desktop.
- **Accessibility:**  
  - All interactive elements (cards, buttons) are keyboard-accessible (`tabIndex`, `role="button"`, `onKeyDown`).
  - Sufficient color contrast is maintained throughout.
  - Animations are subtle and do not hinder readability.

---

## 6. **Philosophy: Simplicity in Complexity**

- The design leverages advanced techniques (WebGL, Framer Motion, glassmorphism) but presents them in a way that feels effortless and uncluttered.
- Visual effects are layered for depth, but content remains central and easy to read.
- The result is a page that feels modern, inviting, and easy to navigate—demonstrating that simplicity can be achieved even with complex systems.

---

**In summary:**  
The main page’s design is a careful balance of modern web techniques, clean typography, and thoughtful layering. Every detail—from the interactive background to the animated cards—serves to enhance clarity and focus, embodying the philosophy of “simplicity in complexity.” 