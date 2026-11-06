# Animations and Transitions

## Table of Contents
- [Animation Effects](#animation-effects)
- [Fade Animation](#fade-animation)
- [Slide Animation](#slide-animation)
- [No Animation](#no-animation)
- [Custom Animation](#custom-animation)
- [Animation Configuration](#animation-configuration)
- [Performance Considerations](#performance-considerations)

## Animation Effects

The Carousel component supports four animation effects for slide transitions. The animation effect is controlled by the `animationEffect` property.

Available animation effects:
- **Slide** - Default slide transition (horizontal movement)
- **Fade** - Fade in/out transition
- **None** - No animation, instant transition
- **Custom** - Custom animation effects

## Fade Animation

Fade animation creates a smooth fade-in/fade-out transition between slides:

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" />' },
    { template: '<img src="image2.jpg" />' },
    { template: '<img src="image3.jpg" />' }
  ],
  animationEffect: "Fade"
});

carouselObj.appendTo("#carousel");
```

### Fade with Auto-play

```typescript
const carouselObj = new Carousel({
  items: [...],
  animationEffect: "Fade",
  autoPlay: true,
  interval: 3000  // 3 seconds between slides
});

carouselObj.appendTo("#carousel");
```

## Slide Animation

Slide animation (default) creates a horizontal slide transition between slides:

```typescript
const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" />' },
    { template: '<img src="image2.jpg" />' },
    { template: '<img src="image3.jpg" />' }
  ],
  animationEffect: "Slide"  // Default effect
});

carouselObj.appendTo("#carousel");
```

### Slide with Partial Visibility

Show previous and next slides partially with slide animation:

```typescript
const carouselObj = new Carousel({
  items: [...],
  animationEffect: "Slide",
  partialVisible: true,
  width: "100%"
});

carouselObj.appendTo("#carousel");
```

## No Animation

Remove all animations for instant slide transitions:

```typescript
const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" />' },
    { template: '<img src="image2.jpg" />' },
    { template: '<img src="image3.jpg" />' }
  ],
  animationEffect: "None"  // No animation
});

carouselObj.appendTo("#carousel");
```

### When to Use No Animation

- High frequency updates
- Mobile devices with performance constraints
- Accessibility requirements
- Presentation mode
- Rapid slide transitions

```typescript
const carouselObj = new Carousel({
  items: items,
  animationEffect: "None",
  autoPlay: true,
  interval: 1000  // Very fast transitions
});

carouselObj.appendTo("#carousel");
```

## Custom Animation

Create custom animations by defining CSS transitions:

```typescript
const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" class="custom-slide" />' },
    { template: '<img src="image2.jpg" class="custom-slide" />' },
    { template: '<img src="image3.jpg" class="custom-slide" />' }
  ],
  animationEffect: "Custom"
});

carouselObj.appendTo("#carousel");
```

### Custom Animation CSS

```css
/* Custom zoom animation */
.e-carousel-item {
  animation: zoomSlide 0.5s ease-in-out;
}

@keyframes zoomSlide {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Custom Rotation Animation

```typescript
const carouselObj = new Carousel({
  items: [...],
  animationEffect: "Custom",
  cssClass: "rotate-carousel"
});

carouselObj.appendTo("#carousel");
```

```css
.rotate-carousel .e-carousel-item {
  animation: rotateSlide 0.6s ease-out;
}

@keyframes rotateSlide {
  from {
    transform: rotateY(90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0);
    opacity: 1;
  }
}
```

## Animation Configuration

### Basic Animation Setup

```typescript
const carouselObj = new Carousel({
  items: items,
  animationEffect: "Slide",
  autoPlay: true,
  interval: 3000,  // Time between slides (ms)
  pauseOnHover: true  // Pause animation on hover
});

carouselObj.appendTo("#carousel");
```

### Animation Timing

Control animation timing with `interval` property:

```typescript
// Slow animation
const slowCarousel = new Carousel({
  items: items,
  autoPlay: true,
  interval: 5000  // 5 seconds
});

// Normal animation
const normalCarousel = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000  // 3 seconds
});

// Fast animation
const fastCarousel = new Carousel({
  items: items,
  autoPlay: true,
  interval: 1000  // 1 second
});
```

### Pause on Hover

Pause auto-play when user hovers over carousel:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000,
  pauseOnHover: true  // Pause on hover
});

carouselObj.appendTo("#carousel");
```

### Per-Item Animation Timing

Different animation duration for each item:

```typescript
const carouselObj = new Carousel({
  autoPlay: true,
  items: [
    { template: '<img src="image1.jpg" />', interval: 2000 },
    { template: '<img src="image2.jpg" />', interval: 4000 },
    { template: '<img src="image3.jpg" />', interval: 3000 }
  ]
});

carouselObj.appendTo("#carousel");
```

## Complete Examples

### Gallery with Fade Effect

```typescript
const gallery = new Carousel({
  items: [
    { template: '<img src="photo1.jpg" alt="Photo 1" style="height:100%;width:100%;" />' },
    { template: '<img src="photo2.jpg" alt="Photo 2" style="height:100%;width:100%;" />' },
    { template: '<img src="photo3.jpg" alt="Photo 3" style="height:100%;width:100%;" />' },
    { template: '<img src="photo4.jpg" alt="Photo 4" style="height:100%;width:100%;" />' }
  ],
  animationEffect: "Fade",
  autoPlay: true,
  interval: 4000,
  pauseOnHover: true,
  buttonsVisibility: "VisibleOnHover"
});

gallery.appendTo("#gallery");
```

### Presentation with Slide Effect

```typescript
const presentation = new Carousel({
  items: slides,
  animationEffect: "Slide",
  autoPlay: false,  // Manual navigation for presentations
  buttonsVisibility: "Visible",
  showIndicators: true,
  indicatorsType: "Numeric"
});

presentation.appendTo("#slides");

// Navigate with keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') presentation.next();
  if (e.key === 'ArrowLeft') presentation.prev();
});
```

### News Ticker with No Animation

```typescript
const ticker = new Carousel({
  items: newsItems,
  animationEffect: "None",
  autoPlay: true,
  interval: 2000,  // Very fast
  loop: true,
  buttonsVisibility: "Hidden",
  showIndicators: false
});

ticker.appendTo("#ticker");
```

### Product Carousel with Custom Animation

```typescript
const carousel = new Carousel({
  items: products,
  animationEffect: "Custom",
  autoPlay: true,
  interval: 3000,
  pauseOnHover: true,
  cssClass: "product-carousel"
});

carousel.appendTo("#carousel");
```

```css
.product-carousel .e-carousel-item {
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Performance Considerations

### Animation Performance

1. **Fade vs Slide** - Fade typically performs better on low-end devices
2. **Disable on mobile** - Consider disabling animations for mobile
3. **GPU acceleration** - Use `transform` for better performance

```typescript
// Performance optimized for mobile
const carouselObj = new Carousel({
  items: items,
  animationEffect: isMobile ? "None" : "Fade",
  autoPlay: true,
  interval: 3000
});

carouselObj.appendTo("#carousel");
```

### CSS for Performance

```css
/* GPU acceleration for smooth animations */
.e-carousel-item {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
```

### Disabling Animation for Accessibility

```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const carouselObj = new Carousel({
  items: items,
  animationEffect: prefersReducedMotion ? "None" : "Fade",
  autoPlay: !prefersReducedMotion,
  pauseOnHover: true
});

carouselObj.appendTo("#carousel");
```
