# Animation and Transitions

## Table of Contents
- [Animation Settings](#animation-settings)
- [Built-In Animations](#built-in-animations)
- [Custom Animations](#custom-animations)
- [Swipe Interactions](#swipe-interactions)
- [Timing and Easing](#timing-and-easing)
- [Edge Cases](#edge-cases)

## Animation Settings

### Basic Configuration

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { 
            effect: 'SlideLeftIn',
            duration: 500
        },
        next: { 
            effect: 'SlideRightIn',
            duration: 500
        }
    }
});
tabObj.appendTo('#element');
```

### Animation Properties

```typescript
interface AnimationSettings {
    effect?: string;      // Animation effect type
    duration?: number;    // Duration in milliseconds
    easing?: string;      // Easing function
    delay?: number;       // Delay before animation
}

let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: {
            effect: 'SlideLeftIn',
            duration: 400,
            easing: 'easeInOut',
            delay: 0
        },
        next: {
            effect: 'SlideRightIn',
            duration: 400,
            easing: 'easeInOut',
            delay: 0
        }
    }
});
tabObj.appendTo('#element');
```

## Built-In Animations

### Available Effects

| Effect | Description | Use Case |
|--------|-------------|----------|
| **SlideRightIn** | Content slides from left | Next tab |
| **SlideLeftIn** | Content slides from right | Previous tab |
| **FadeIn** | Content fades in | Subtle transition |
| **ZoomIn** | Content zooms in | Emphasis |
| **None** | No animation | Performance critical |

### Slide Animation

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ],
    animation: {
        previous: { effect: 'SlideLeftIn', duration: 500 },
        next: { effect: 'SlideRightIn', duration: 500 }
    }
});
tabObj.appendTo('#element');
```

### Fade Animation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { effect: 'FadeIn', duration: 300 },
        next: { effect: 'FadeIn', duration: 300 }
    }
});
tabObj.appendTo('#element');
```

### Zoom Animation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { effect: 'ZoomIn', duration: 400 },
        next: { effect: 'ZoomIn', duration: 400 }
    }
});
tabObj.appendTo('#element');
```

### No Animation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { effect: 'None' },
        next: { effect: 'None' }
    }
});
tabObj.appendTo('#element');
```

## Custom Animations

### Define Custom Animation

```typescript
import { Animate } from '@syncfusion/ej2-base';

let customAnimation = {
    duration: 600,
    effect: 'custom',
    timingFunction: 'easeInOutQuad'
};

let tabObj: Tab = new Tab({
    items: [...],
    selected: (args) => {
        let content = document.querySelector('.e-content') as HTMLElement;
        
        // Apply custom animation
        Animate.animate(content, {
            duration: 600,
            name: 'CustomSlide',
            timingFunction: 'easeInOutQuad',
            begin: () => {
                console.log('Animation started');
            },
            complete: () => {
                console.log('Animation completed');
            }
        });
    }
});
tabObj.appendTo('#element');
```

### CSS-Based Custom Animation

```css
@keyframes customSlideIn {
    0% {
        opacity: 0;
        transform: translateX(-50px) scale(0.9);
    }
    50% {
        opacity: 0.7;
    }
    100% {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

.e-tab .e-content .e-item.animated {
    animation: customSlideIn 0.5s ease-in-out;
}
```

### JavaScript Custom Animation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    selected: (args) => {
        let newContent = document.querySelector('.e-content .e-item.e-active') as HTMLElement;
        
        if (newContent) {
            // Reset animation
            newContent.style.animation = 'none';
            // Trigger reflow
            void newContent.offsetWidth;
            // Apply animation
            newContent.style.animation = 'customSlideIn 0.5s ease-in-out';
        }
    }
});
tabObj.appendTo('#element');
```

## Swipe Interactions

### Enable Swipe Mode

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    swipeMode: 'Touch'  // 'Touch', 'Mouse', 'TouchAndMouse', 'Pointer'
});
tabObj.appendTo('#element');
```

### Swipe Modes

| Mode | Gesture |
|------|---------|
| **Touch** | Touch swipe on touch devices |
| **Mouse** | Mouse drag on desktop |
| **TouchAndMouse** | Both touch and mouse |
| **Pointer** | Pointer events (modern) |

### Swipe Configuration

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ],
    swipeMode: 'TouchAndMouse',
    animation: {
        previous: { effect: 'SlideLeftIn', duration: 400 },
        next: { effect: 'SlideRightIn', duration: 400 }
    }
});
tabObj.appendTo('#element');
```

### Prevent Swipe Selection

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        let content = document.querySelector('.e-content') as HTMLElement;
        
        // Prevent text selection during swipe
        content.addEventListener('selectstart', (event) => {
            event.preventDefault();
        });
        
        // Add user-select: none
        content.style.userSelect = 'none';
    }
});
tabObj.appendTo('#element');
```

```css
.e-tab .e-content {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
```

## Timing and Easing

### Easing Functions

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: {
            effect: 'SlideLeftIn',
            duration: 500,
            easing: 'easeInOutQuad'  // Linear, easeInQuad, easeInCubic, etc.
        },
        next: {
            effect: 'SlideRightIn',
            duration: 500,
            easing: 'easeInOutQuad'
        }
    }
});
tabObj.appendTo('#element');
```

### Available Easing Functions

| Easing | Description |
|--------|-------------|
| **linear** | Constant speed |
| **easeInQuad** | Slow start, accelerates |
| **easeOutQuad** | Fast start, decelerates |
| **easeInOutQuad** | Slow at both ends |
| **easeInCubic** | Cubic acceleration in |
| **easeOutCubic** | Cubic acceleration out |
| **easeInOutCubic** | Cubic acceleration both |

### Duration Customization

```typescript
// Fast animation
animation: {
    previous: { effect: 'SlideLeftIn', duration: 200 },
    next: { effect: 'SlideRightIn', duration: 200 }
}

// Slow animation
animation: {
    previous: { effect: 'SlideLeftIn', duration: 800 },
    next: { effect: 'SlideRightIn', duration: 800 }
}

// Instant (no animation)
animation: {
    previous: { effect: 'None', duration: 0 },
    next: { effect: 'None', duration: 0 }
}
```

## Edge Cases

### Animation with Reduced Motion Preference

```typescript
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let tabObj: Tab = new Tab({
    items: [...],
    animation: prefersReducedMotion 
        ? {
            previous: { effect: 'None' },
            next: { effect: 'None' }
        }
        : {
            previous: { effect: 'SlideLeftIn', duration: 500 },
            next: { effect: 'SlideRightIn', duration: 500 }
        }
});
tabObj.appendTo('#element');

// Listen for changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
        tabObj.animation = { previous: { effect: 'None' }, next: { effect: 'None' } };
    } else {
        // Re-enable animations
    }
});
```

### Fast Animation on Mobile

```typescript
let isMobile = window.innerWidth < 768;

let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { 
            effect: 'SlideLeftIn', 
            duration: isMobile ? 250 : 500 
        },
        next: { 
            effect: 'SlideRightIn', 
            duration: isMobile ? 250 : 500 
        }
    }
});
tabObj.appendTo('#element');
```

### Handle Animation Conflicts

```typescript
let isAnimating = false;

let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { effect: 'SlideLeftIn', duration: 500 },
        next: { effect: 'SlideRightIn', duration: 500 }
    },
    selecting: (args) => {
        // Prevent selection during animation
        if (isAnimating) {
            args.cancel = true;
            return;
        }
        isAnimating = true;
    },
    selected: (args) => {
        // Reset flag after animation completes
        setTimeout(() => {
            isAnimating = false;
        }, 500);  // Match animation duration
    }
});
tabObj.appendTo('#element');
```

### Animation Performance

```typescript
// Use GPU acceleration
.e-tab .e-content {
    transform: translateZ(0);  /* Enable hardware acceleration */
    will-change: transform;
}

// Disable animations on low-end devices
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    // Low memory device - disable animations
    tabObj.animation = {
        previous: { effect: 'None' },
        next: { effect: 'None' }
    };
}
```

## Common Patterns

### Pattern 1: Smooth Page Transitions

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    animation: {
        previous: { effect: 'FadeIn', duration: 300 },
        next: { effect: 'FadeIn', duration: 300 }
    },
    selected: () => {
        // Smooth transition between pages
        let content = document.querySelector('.e-content');
        if (content) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});
tabObj.appendTo('#element');
```

### Pattern 2: Responsive Animation Speed

```typescript
class ResponsiveTabAnimation {
    private tabObj: Tab;
    
    constructor(tabObj: Tab) {
        this.tabObj = tabObj;
        this.updateAnimation();
        window.addEventListener('resize', () => this.updateAnimation());
    }
    
    private updateAnimation() {
        let speed = window.innerWidth < 768 ? 250 : 500;
        this.tabObj.animation = {
            previous: { effect: 'SlideLeftIn', duration: speed },
            next: { effect: 'SlideRightIn', duration: speed }
        };
    }
}
```

---

**Related Topics:**
- [Tab Structure and Content](./tab-structure-and-content.md) - Tab configuration
- [Responsive and Adaptive Modes](./responsive-adaptive-modes.md) - Mobile considerations
