# Styling and Appearance

## CSS Structure

The Carousel component uses specific CSS classes for styling different parts. Override these classes to customize appearance:

| CSS Class | Purpose |
|-----------|---------|
| `.e-carousel` | Main carousel container |
| `.e-carousel-item` | Individual carousel item |
| `.e-carousel-item.e-active` | Active (current) carousel item |
| `.e-carousel-indicators` | Indicators container |
| `.e-carousel-indicators .e-indicator-bars` | Indicator bars wrapper |
| `.e-carousel-indicators .e-indicator-bars .e-indicator-bar` | Individual indicator bar |
| `.e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator` | Individual indicator dot |
| `.e-carousel-navigators` | Navigation buttons container |
| `.e-carousel-navigators .e-previous` | Previous button |
| `.e-carousel-navigators .e-next` | Next button |
| `.e-carousel-navigators .e-play-pause` | Play/pause button |
| `.e-carousel.e-partial .e-carousel-slide-container` | Partial visible slides container |

## Customizing Indicators

### Indicator Spacing

Increase space between indicator dots:

```css
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar {
  padding: 8px;  /* Space between indicators */
}
```

### Indicator Size and Color

```css
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  width: 20px;              /* Indicator width */
  height: 20px;             /* Indicator height */
  border-radius: 50%;       /* Make circular */
  background-color: rgba(255, 255, 255, 0.5);  /* Inactive color */
  border: 2px solid white;  /* Add border */
}

/* Active indicator styling */
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: white;  /* Active color */
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}
```

### Indicator Position

Move indicators outside carousel:

```css
.e-carousel .e-carousel-indicators {
  bottom: -50px;  /* Position below carousel */
  top: auto;
}
```

Position indicators on the side:

```css
.e-carousel .e-carousel-indicators {
  position: absolute;
  right: -80px;
  bottom: auto;
  display: flex;
  flex-direction: column;
}

.e-carousel .e-carousel-indicators .e-indicator-bars {
  flex-direction: column;
}
```

### Custom Indicator Colors

```css
.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  background-color: #ccc;
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: #ff6b6b;  /* Custom active color */
}
```

## Customizing Navigation Buttons

### Button Size and Colors

```css
.e-carousel .e-carousel-navigators .e-next .e-btn:not(:disabled) .e-btn-icon,
.e-carousel .e-carousel-navigators .e-previous .e-btn:not(:disabled) .e-btn-icon {
  color: white;           /* Button icon color */
  font-size: 24px;        /* Icon size */
}

.e-carousel .e-carousel-navigators .e-btn {
  background-color: rgba(0, 0, 0, 0.5);  /* Button background */
  border: none;
}

.e-carousel .e-carousel-navigators .e-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);  /* Hover effect */
}
```

### Button Position

```css
/* Position buttons outside carousel */
.e-carousel .e-carousel-navigators .e-previous {
  left: -60px;
}

.e-carousel .e-carousel-navigators .e-next {
  right: -60px;
}
```

### Custom Button Icons

```css
.e-carousel .e-carousel-navigators .e-previous::before {
  content: "◀";
  font-size: 20px;
}

.e-carousel .e-carousel-navigators .e-next::before {
  content: "▶";
  font-size: 20px;
}
```

## Complete Theme Examples

### Dark Theme

```css
.e-carousel {
  background-color: #1e1e1e;
}

.e-carousel-item {
  background-color: #2d2d2d;
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  background-color: rgba(255, 255, 255, 0.3);
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: #ff6b6b;
}

.e-carousel .e-carousel-navigators .e-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.e-carousel .e-carousel-navigators .e-btn:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
```

### Light Theme

```css
.e-carousel {
  background-color: #f5f5f5;
}

.e-carousel-item {
  background-color: white;
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  background-color: rgba(0, 0, 0, 0.3);
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: #007bff;
}

.e-carousel .e-carousel-navigators .e-btn {
  background-color: rgba(0, 0, 0, 0.1);
  color: black;
}

.e-carousel .e-carousel-navigators .e-btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
```

### Modern Gradient Theme

```css
.e-carousel {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.e-carousel-item {
  background-color: rgba(255, 255, 255, 0.95);
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator {
  background-color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.e-carousel .e-carousel-indicators .e-indicator-bars .e-indicator-bar .e-indicator.e-active {
  background-color: white;
  transform: scale(1.2);
}

.e-carousel .e-carousel-navigators .e-btn {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.e-carousel .e-carousel-navigators .e-btn:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}
```

## Responsive Styling

### Mobile Adaptations

```css
/* Hide indicators and buttons on mobile */
@media (max-width: 768px) {
  .e-carousel .e-carousel-indicators {
    display: none;
  }

  .e-carousel .e-carousel-navigators {
    display: none;
  }

  .e-carousel {
    height: 250px;  /* Smaller height on mobile */
  }
}

/* Smaller buttons on tablet */
@media (max-width: 1024px) {
  .e-carousel .e-carousel-navigators .e-btn {
    width: 40px;
    height: 40px;
  }

  .e-carousel .e-carousel-indicators .e-indicator-bar .e-indicator {
    width: 12px;
    height: 12px;
  }
}
```

## Using Theme Studio

Syncfusion provides Theme Studio for creating custom themes. Visit: url

### Applying Custom Theme

```html
<!-- Original theme -->
<link href="url" rel="stylesheet" />

<!-- Custom theme (from Theme Studio export) -->
<link href="custom-theme.css" rel="stylesheet" />
```

### Theme Variables

Common CSS variables for customization:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --background-color: #f5f5f5;
}

.e-carousel {
  --e-carousel-background: var(--background-color);
  --e-indicator-color: var(--secondary-color);
  --e-button-color: var(--primary-color);
}
```

## Item Styling

### Individual Item CSS Classes

```typescript
const carousel = new Carousel({
  items: [
    { 
      template: '<img src="featured.jpg" />', 
      cssClass: 'featured-item' 
    },
    { 
      template: '<img src="image2.jpg" />', 
      cssClass: 'regular-item' 
    }
  ]
});

carousel.appendTo("#carousel");
```

```css
.e-carousel-item.featured-item {
  border: 3px solid gold;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

.e-carousel-item.regular-item {
  border: 1px solid #ddd;
}
```

## Partial Visibility Styling

```css
/* Style for partially visible slides */
.e-carousel.e-partial .e-carousel-slide-container {
  padding: 0 20px;  /* Space for visible edges */
}

.e-carousel.e-partial .e-carousel-item {
  margin: 0 10px;  /* Space between items */
  border-radius: 8px;
  opacity: 0.7;  /* Make side items slightly transparent */
}

.e-carousel.e-partial .e-carousel-item.e-active {
  opacity: 1;  /* Full opacity for active item */
  transform: scale(1.05);  /* Slightly enlarge active item */
}
```

## Animation Effects on Styling

```css
/* Smooth transitions for all style changes */
.e-carousel,
.e-carousel-item,
.e-carousel .e-carousel-indicators .e-indicator,
.e-carousel .e-carousel-navigators .e-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Indicator animation */
.e-carousel .e-carousel-indicators .e-indicator-bar .e-indicator {
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
```

## Accessibility Styling

Ensure proper contrast and focus indicators:

```css
/* Focus indicator for keyboard navigation */
.e-carousel .e-carousel-navigators .e-btn:focus,
.e-carousel .e-carousel-indicators .e-indicator:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  .e-carousel .e-carousel-indicators .e-indicator {
    border: 1px solid #000;
  }

  .e-carousel .e-carousel-navigators .e-btn {
    border: 1px solid #000;
  }
}
```
