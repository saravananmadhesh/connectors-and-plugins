# Animations and Gestures

## Table of Contents
- [Animation Configuration](#animation-configuration)
- [Animation Timing](#animation-timing)
- [Enable Gestures](#enable-gestures)
- [Mobile Interactions](#mobile-interactions)
- [Variation Animations](#variation-animations)

## Animation Configuration

### Enable/Disable Animations

Control whether sidebar opens and closes with smooth transitions:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

// Enable animations (default)
let sidebar: Sidebar = new Sidebar({
    animate: true,  // Smooth transitions
    type: 'Push'
});
sidebar.appendTo('#sidebar');

// Disable animations for instant show/hide
let instantSidebar: Sidebar = new Sidebar({
    animate: false,  // No transitions
    type: 'Over'
});
instantSidebar.appendTo('#sidebar');
```

### Animation Properties

- **`animate`**: `boolean` - Enable smooth transitions (default: `true`)
- Use `open` and `close` events for sidebar state transitions

## Animation Timing

### CSS Transition Duration

Control animation speed with CSS:

```css
/* 0.3s smooth transition */
.e-sidebar.e-open {
    transition: transform 0.3s ease;
}

.e-sidebar.e-close {
    transition: transform 0.3s ease;
}

/* Over type animation */
.e-sidebar.e-over.e-open {
    transition: transform 0.25s ease-out;
}

/* Push type animation */
.e-sidebar.e-push.e-open {
    transition: transform 0.35s ease;
}

/* Slide type animation */
.e-sidebar.e-slide.e-open {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Easing Functions

Use different easing for smooth, natural motion:

```css
/* Linear - constant speed */
.sidebar-linear {
    transition: transform 0.3s linear;
}

/* Ease-in - slow start, fast end */
.sidebar-ease-in {
    transition: transform 0.3s ease-in;
}

/* Ease-out - fast start, slow end */
.sidebar-ease-out {
    transition: transform 0.3s ease-out;
}

/* Ease-in-out - slow start and end */
.sidebar-ease-in-out {
    transition: transform 0.3s ease-in-out;
}

/* Cubic-bezier for custom curves */
.sidebar-smooth {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Enable Gestures

### Built-in Gesture Support with `enableGestures`

The Sidebar supports built-in touch gesture handling through the `enableGestures` property. Use it to enable swipe interactions without custom touch event wiring:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Over',
    animate: true,
    enableGestures: true
});
sidebar.appendTo('#sidebar');
```

This is the recommended way to enable native sidebar gestures.

### Custom Swipe Detection (Optional)

```typescript
interface SwipeEvent {
    startX: number;
    endX: number;
    distance: number;
    direction: 'left' | 'right';
}

class SwipeDetector {
    private startX: number = 0;
    private minSwipeDistance: number = 50;

    init(sidebar: Sidebar) {
        document.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const distance = Math.abs(endX - this.startX);
            
            if (distance > this.minSwipeDistance) {
                const direction = endX > this.startX ? 'right' : 'left';
                
                if (direction === 'left') {
                    sidebar.hide();
                } else if (direction === 'right' && this.startX < 50) {
                    sidebar.show();
                }
            }
        });
    }
}

const swipeDetector = new SwipeDetector();
swipeDetector.init(sidebar);
```

## Mobile Interactions

### Touch-Friendly Toggle Button

Make the toggle button easy to tap on mobile:

```html
<!-- Larger touch target (44x44px minimum) -->
<button id="toggle" class="e-btn e-icon-btn sidebar-toggle">
    <span class="e-icons e-menu"></span>
</button>

<style>
.sidebar-toggle {
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
    touch-action: manipulation;  /* Prevent touch delay */
}
</style>
```

```typescript
let viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    document.head.appendChild(viewport);
}
```

### Mobile-Optimized Sidebar

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Auto',  // Over on mobile, Push on desktop
    animate: true,
    showBackdrop: true,  // Modal effect on mobile
    mediaQuery: window.matchMedia('(max-width: 768px)')
});
sidebar.appendTo('#sidebar');

// Close on navigation click
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.hide();
        }
    });
});
```

### Haptic Feedback (Vibration)

Provide tactile feedback for touch interactions:

```typescript
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(10);  // 10ms vibration
    }
}

document.querySelector('#toggle')?.addEventListener('click', () => {
    triggerHaptic();
    sidebar.toggle();
});

// On swipe
document.addEventListener('touchend', (e) => {
    triggerHaptic();
    // Swipe logic...
});
```

## Complete Animation Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px',
    animate: true,
    
    // animation events
    open: (e) => {
        console.log('Opening animation complete');
        document.body.classList.add('sidebar-open');
    },
    close: (e) => {
        console.log('Closing animation complete');
        document.body.classList.remove('sidebar-open');
    }
});

sidebar.appendTo('#sidebar');

```

## Performance Optimization

### Prevent Animation Jank

```typescript
let sidebar: Sidebar = new Sidebar({
    animate: true,
    type: 'Push'
});
sidebar.appendTo('#sidebar');

// Use requestAnimationFrame for smooth 60fps
let isAnimating = false;

document.querySelector('#toggle')?.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => {
            sidebar.toggle();
            setTimeout(() => {
                isAnimating = false;
            }, 300);  // Match animation duration
        });
    }
});
```

### Disable Animations on Low-End Devices

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let sidebar: Sidebar = new Sidebar({
    animate: !prefersReducedMotion,  // Respect user preference
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

## Variation Animations

Create custom animation effects by adding CSS classes to the sidebar on button clicks. The sidebar automatically adjusts its animation to match custom sizes specified in CSS.

### Zoom Effect

```typescript
let zoomBtn = document.querySelector('#zoom');
if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("zoom-effect");
    });
}
```

```css
.zoom-effect {
    animation-name: animatezoom;
    animation-duration: 1s;
}

@keyframes animatezoom {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
```

### Open Door Effect (3D Rotate X)

```typescript
let openDoorBtn = document.querySelector('#open-door');
if (openDoorBtn) {
    openDoorBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("door-effect");
    });
}
```

```css
.door-effect {
    animation-name: animatedoor;
    animation-duration: 1s;
}

@keyframes animatedoor {
    from {
        transform: rotateX(-20deg);
    }
    to {
        transform: rotateX(0deg);
    }
}
```

### Bottom to Top Slide

```typescript
let bottomTopBtn = document.querySelector('#bottom-top');
if (bottomTopBtn) {
    bottomTopBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("slide-bottom-top");
    });
}
```

```css
.slide-bottom-top {
    animation-name: animatebottom;
    animation-duration: 1s;
}

@keyframes animatebottom {
    from {
        margin-top: 100%;
    }
    to {
        margin-top: 0%;
    }
}
```

### Rotate Effect (2D X-Axis)

```typescript
let rotateBtn = document.querySelector('#rotate');
if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("rotate-x");
    });
}
```

```css
.rotate-x {
    animation-name: animaterotatex;
    animation-duration: 1s;
}

@keyframes animaterotatex {
    from {
        transform: rotateX(150deg);
    }
    to {
        transform: rotateX(360deg);
    }
}
```

### 3D Rotation (Y-Axis)

```typescript
let rotate3dBtn = document.querySelector('#rotate-3d');
if (rotate3dBtn) {
    rotate3dBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("rotate-y");
    });
}
```

```css
.rotate-y {
    animation-name: animaterotate3d;
    animation-duration: 1s;
}

@keyframes animaterotate3d {
    from {
        transform: rotateY(150deg);
    }
    to {
        transform: rotateY(360deg);
    }
}
```

### Reverse Slide Out with Rotation

```typescript
let reverseBtn = document.querySelector('#reverse');
if (reverseBtn) {
    reverseBtn.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("reverse-slide-out");
    });
}
```

```css
.reverse-slide-out {
    animation-name: reverseslide;
    animation-duration: 1s;
}

@keyframes reverseslide {
    from {
        transform: rotateY(-65deg);
        margin-left: 200px;
    }
    to {
        margin-left: 0%;
    }
}
```

### Complete Variation Animation Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebarElement: Sidebar = new Sidebar({
    showBackdrop: true,
    width: '280px',
    created: function() {
        this.element.style.visibility = '';
    }
});
sidebarElement.appendTo('#sidebar-element');

// Setup animation buttons
setupAnimationButtons(sidebarElement);

function setupAnimationButtons(sidebar: Sidebar) {
    // Zoom
    document.querySelector('#zoom')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("zoom-effect");
    });

    // Open Door
    document.querySelector('#open-door')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("door-effect");
    });

    // Bottom to Top
    document.querySelector('#bottom-top')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("slide-bottom-top");
    });

    // Rotate X
    document.querySelector('#rotate')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("rotate-x");
    });

    // Rotate Y (3D)
    document.querySelector('#rotate-3d')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("rotate-y");
    });

    // Reverse Slide Out
    document.querySelector('#reverse')?.addEventListener('click', () => {
        sidebar.show();
        sidebar.element.classList.add("reverse-slide-out");
    });

    // Close and remove all animation classes
    document.querySelector('#close-btn')?.addEventListener('click', () => {
        sidebar.element.classList.remove(
            "zoom-effect",
            "door-effect",
            "slide-bottom-top",
            "rotate-x",
            "rotate-y",
            "reverse-slide-out"
        );
        sidebar.hide();
    });
}
```

```html
<!-- HTML Structure for Variation Animations -->
<aside id="sidebar-element" class="sidebar" style="visibility: hidden">
    <div class="title">Sidebar Content</div>
    <div class="sub-title">
        Sidebar is rendered with custom animation effect
    </div>
    <div class="center-align">
        <button id="close-btn" class="e-btn close-btn">Close Sidebar</button>
    </div>
</aside>

<!-- Main Content with Animation Buttons -->
<div id="main-content">
    <div class="title">Sidebar Transitions</div>
    <div class="sub-title">Click buttons to render sidebar with animation effects</div>
    <div style="padding:20px" class="center-align">
        <button id="zoom" class="e-btn e-info">Zoom Sidebar</button>
        <button id="open-door" class="e-btn e-info">Open Door</button>
        <button id="bottom-top" class="e-btn e-info">Bottom to Top</button>
    </div>
    <div style="padding:20px" class="center-align">
        <button id="rotate" class="e-btn e-info">Rotate</button>
        <button id="rotate-3d" class="e-btn e-info">Rotate 3D</button>
        <button id="reverse" class="e-btn e-info">Reverse Slide Out</button>
    </div>
</div>
```

### Browser Compatibility

Use vendor prefixes for cross-browser support, especially for 3D transforms:

```css
/* Transform animations with vendor prefixes */
.rotate-y {
    animation-name: animaterotate3d;
    animation-duration: 1s;
}

@keyframes animaterotate3d {
    from {
        -webkit-transform: rotateY(150deg);
        -moz-transform: rotateY(150deg);
        transform: rotateY(150deg);
    }
    to {
        -webkit-transform: rotateY(360deg);
        -moz-transform: rotateY(360deg);
        transform: rotateY(360deg);
    }
}

/* Enable 3D perspective on parent container */
body {
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
}
```

### Best Practices

- **Timing**: Keep animations between 0.3s - 1s for best UX
- **Performance**: Test animations on lower-end devices; disable if jank occurs
- **Accessibility**: Respect `prefers-reduced-motion` and provide non-animated alternatives
- **Cleanup**: Remove animation classes after animation completes to prevent repeated triggers
- **Z-Index**: Ensure backdrop and sidebar have proper stacking context during animations

## Common Patterns

**Pattern: Smooth Desktop, Instant Mobile**
```typescript
const isMobile = window.matchMedia('(max-width: 768px)').matches;

let sidebar: Sidebar = new Sidebar({
    animate: !isMobile,  // Disable on mobile for instant response
    type: isMobile ? 'Over' : 'Push'
});
sidebar.appendTo('#sidebar');
```

**Pattern: Disable Animations if Preferred**
```typescript
const prefersNoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let sidebar: Sidebar = new Sidebar({
    animate: !prefersNoMotion
});
sidebar.appendTo('#sidebar');
```

**Pattern: Custom Animation Speed**
```typescript
let sidebar: Sidebar = new Sidebar({
    animate: true,
    type: 'Slide'
});
sidebar.appendTo('#sidebar');

// Adjust CSS for custom timing
document.querySelector('#sidebar')?.style.setProperty('--animation-duration', '0.5s');
```

## Accessibility

Ensure animations don't interfere with accessibility:

```typescript
// Announce state changes for screen readers
let sidebar: Sidebar = new Sidebar({
    open: () => {
        announce('Sidebar opened');
    },
    close: () => {
        announce('Sidebar closed');
    }
});

function announce(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}
```

## Troubleshooting

**Issue**: Animations feel slow
- **Solution**: Reduce transition duration in CSS
- **Solution**: Use ease-out for snappier feel

**Issue**: Gestures not working
- **Solution**: Remove `touch-action: none` if blocking touch events
- **Solution**: Test on actual mobile device, not browser emulator

**Issue**: Jank during animation
- **Solution**: Disable other animations during sidebar toggle
- **Solution**: Reduce complexity of menu content

## Next Steps

- Learn **Content Integration** for menu interactions
- Explore **Styling and Theming** for animation customization
- Check **Troubleshooting** for common issues
