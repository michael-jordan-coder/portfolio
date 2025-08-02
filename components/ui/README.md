# UI Components

This directory contains reusable UI components following the shadcn/ui pattern.

## WobbleCard

An interactive card component with smooth 3D hover animations and mouse tracking.

### Features

- **3D Transform**: Smooth 3D transforms on hover with mouse position tracking
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized animations using Framer Motion
- **Customizable**: Accepts custom className and containerClassName props
- **Accessible**: Proper ARIA attributes and keyboard navigation support

### Usage

```tsx
import { WobbleCard } from "@/components/ui/wobble-card";

export default function MyComponent() {
  return (
    <WobbleCard
      containerClassName="bg-blue-900 min-h-[300px]"
      className="p-8"
    >
      <h2 className="text-white text-2xl font-bold">My Card Title</h2>
      <p className="text-neutral-200 mt-4">
        This is the card content with wobble animation on hover.
      </p>
    </WobbleCard>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the card |
| `containerClassName` | `string` | - | Additional CSS classes for the container |
| `className` | `string` | - | Additional CSS classes for the inner content |

### Demo

Visit `/demo` to see the WobbleCardDemo component in action.

## Available Components

- `WobbleCard` - Interactive 3D animated cards
- `WobbleCardDemo` - Demo showcasing multiple wobble cards
- `AnimatedTestimonials` - Animated testimonials component
- `AnimatedTestimonialsDemo` - Demo for animated testimonials 