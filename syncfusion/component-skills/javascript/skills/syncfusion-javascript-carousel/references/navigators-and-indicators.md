# Navigators and Indicators

## Table of Contents
- [Navigation Buttons](#navigation-buttons)
- [Button Visibility Modes](#button-visibility-modes)
- [Indicator Types](#indicator-types)
- [Configuring Indicators](#configuring-indicators)
- [Auto-play Control](#auto-play-control)
- [Play/Pause Button](#playpause-button)
- [Manual Navigation](#manual-navigation)
- [Loop and Direction](#loop-and-direction)

## Navigation Buttons

Navigation buttons allow users to manually transition between slides. The carousel includes previous and next buttons that can be shown, hidden, or shown on hover.

## Button Visibility Modes

The `buttonsVisibility` property controls how navigation buttons are displayed:

### Visible Mode

Previous and next buttons are always visible:

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" />' },
    { template: '<img src="image2.jpg" />' },
    { template: '<img src="image3.jpg" />' }
  ],
  buttonsVisibility: "Visible"
});

carouselObj.appendTo("#carousel");
```

### VisibleOnHover Mode

Buttons appear only when hovering over the carousel:

```typescript
const carouselObj = new Carousel({
  items: items,
  buttonsVisibility: "VisibleOnHover"  // Default in many cases
});

carouselObj.appendTo("#carousel");
```

### Hidden Mode

Navigation buttons are not displayed (users navigate via indicators or programmatically):

```typescript
const carouselObj = new Carousel({
  items: items,
  buttonsVisibility: "Hidden",
  showIndicators: true  // Show indicators instead
});

carouselObj.appendTo("#carousel");
```

## Indicator Types

Indicators show the current slide position and allow direct navigation to specific slides. The `indicatorsType` property defines the indicator style.

### Default Indicators (Dots)

Display as bullet points:

```typescript
const carouselObj = new Carousel({
  items: items,
  indicatorsType: "Default",
  showIndicators: true
});

carouselObj.appendTo("#carousel");
```

### Dynamic Indicators

Animated indicator design:

```typescript
const carouselObj = new Carousel({
  items: items,
  indicatorsType: "Dynamic",
  showIndicators: true
});

carouselObj.appendTo("#carousel");
```

### Fraction Indicators

Display current slide as numbers (e.g., "1/5"):

```typescript
const carouselObj = new Carousel({
  items: items,
  indicatorsType: "Fraction",
  showIndicators: true
});

carouselObj.appendTo("#carousel");
```

### Progress Indicators

Display as a progress bar:

```typescript
const carouselObj = new Carousel({
  items: items,
  indicatorsType: "Progress",
  showIndicators: true
});

carouselObj.appendTo("#carousel");
```

## Configuring Indicators

### Show/Hide Indicators

```typescript
// Show indicators
const withIndicators = new Carousel({
  items: items,
  showIndicators: true,
  indicatorsType: "Default"
});

// Hide indicators
const withoutIndicators = new Carousel({
  items: items,
  showIndicators: false
});

withIndicators.appendTo("#carousel1");
withoutIndicators.appendTo("#carousel2");
```

### Custom Indicator Templates

Define custom HTML for indicators:

```typescript
const carouselObj = new Carousel({
  items: items,
  showIndicators: true,
  indicatorsTemplate: '<span class="custom-indicator"></span>'
});

carouselObj.appendTo("#carousel");
```

### Indicator CSS Customization

```css
/* Customize indicator size and spacing */
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar {
  padding: 8px;  /* Space between indicators */
}

/* Customize individual indicator appearance */
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

/* Active indicator */
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: white;
}
```

## Auto-play Control

### Enable Auto-play

Automatically transition between slides:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000  // 3 seconds between slides
});

carouselObj.appendTo("#carousel");
```

### Disable Auto-play

Manual navigation only:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: false,
  buttonsVisibility: "Visible"
});

carouselObj.appendTo("#carousel");
```

### Pause on Hover

Stop auto-play when user hovers over carousel:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000,
  pauseOnHover: true  // Pause on hover
});

carouselObj.appendTo("#carousel");
```

### Interval Configuration

Control the duration between slides:

```typescript
// Fast transitions (1 second)
const fast = new Carousel({
  items: items,
  autoPlay: true,
  interval: 1000
});

// Normal transitions (3 seconds)
const normal = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000
});

// Slow transitions (5 seconds)
const slow = new Carousel({
  items: items,
  autoPlay: true,
  interval: 5000
});

fast.appendTo("#carousel1");
normal.appendTo("#carousel2");
slow.appendTo("#carousel3");
```

### Per-Item Intervals

Different timing for each slide:

```typescript
const carouselObj = new Carousel({
  autoPlay: true,
  items: [
    { template: '<img src="important.jpg" />', interval: 5000 },  // Show longer
    { template: '<img src="image2.jpg" />', interval: 2000 },
    { template: '<img src="image3.jpg" />', interval: 2000 }
  ]
});

carouselObj.appendTo("#carousel");
```

## Play/Pause Button

Control auto-play with a play/pause button:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true,
  interval: 3000,
  showPlayButton: true  // Display play/pause button
});

carouselObj.appendTo("#carousel");
```

### Custom Play Button Template

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true,
  showPlayButton: true,
  playButtonTemplate: '<button class="custom-play-btn">Play</button>'
});

carouselObj.appendTo("#carousel");
```

### Programmatic Control

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: true
});

carouselObj.appendTo("#carousel");

// Play and pause programmatically
document.getElementById('playBtn').addEventListener('click', () => {
  carouselObj.play();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  carouselObj.pause();
});
```

## Manual Navigation

### Previous and Next Methods

Navigate slides programmatically:

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: false
});

carouselObj.appendTo("#carousel");

// Navigate to next slide
document.getElementById('nextBtn').addEventListener('click', () => {
  carouselObj.next();
});

// Navigate to previous slide
document.getElementById('prevBtn').addEventListener('click', () => {
  carouselObj.prev();
});
```

### Keyboard Navigation

```typescript
const carouselObj = new Carousel({
  items: items,
  allowKeyboardInteraction: true  // Enable keyboard navigation
});

carouselObj.appendTo("#carousel");

// Arrow keys will now navigate slides
```

### Custom Navigation Controls

```typescript
const carouselObj = new Carousel({
  items: items,
  autoPlay: false,
  buttonsVisibility: "Hidden",
  showIndicators: true
});

carouselObj.appendTo("#carousel");

// Create custom navigation buttons
const prevBtn = document.getElementById('customPrev');
const nextBtn = document.getElementById('customNext');

prevBtn.addEventListener('click', () => carouselObj.prev());
nextBtn.addEventListener('click', () => carouselObj.next());
```

## Loop and Direction

### Loop Configuration

Continue looping from end to beginning:

```typescript
// With loop (default behavior)
const loopCarousel = new Carousel({
  items: items,
  loop: true  // Restart from beginning after last slide
});

// Without loop
const noLoopCarousel = new Carousel({
  items: items,
  loop: false  // Stop at last slide
});

loopCarousel.appendTo("#carousel1");
noLoopCarousel.appendTo("#carousel2");
```

## Complete Configuration Examples

### Image Gallery

```typescript
const gallery = new Carousel({
  items: images,
  buttonsVisibility: "Visible",
  indicatorsType: "Default",
  showIndicators: true,
  autoPlay: false
});

gallery.appendTo("#gallery");
```

### Auto-rotating Banner

```typescript
const banner = new Carousel({
  items: bannerItems,
  buttonsVisibility: "VisibleOnHover",
  indicatorsType: "Progress",
  showIndicators: true,
  autoPlay: true,
  interval: 4000,
  pauseOnHover: true,
  showPlayButton: true
});

banner.appendTo("#banner");
```

### Presentation Slides

```typescript
const presentation = new Carousel({
  items: slides,
  buttonsVisibility: "Visible",
  indicatorsType: "Numeric",
  showIndicators: true,
  autoPlay: false,
  allowKeyboardInteraction: true,
  loop: false
});

presentation.appendTo("#slides");
```

### News Ticker

```typescript
const ticker = new Carousel({
  items: newsItems,
  buttonsVisibility: "Hidden",
  showIndicators: false,
  autoPlay: true,
  interval: 2000,
  loop: true,
  animationEffect: "Slide"
});

ticker.appendTo("#ticker");
```

### Product Showcase

```typescript
const showcase = new Carousel({
  items: products,
  buttonsVisibility: "VisibleOnHover",
  indicatorsType: "Dynamic",
  showIndicators: true,
  autoPlay: true,
  interval: 3000,
  pauseOnHover: true,
  showPlayButton: true
});

showcase.appendTo("#showcase");
```
