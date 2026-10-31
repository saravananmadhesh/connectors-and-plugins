# Toast Animation Effects

The Syncfusion EJ2 JavaScript Toast component supports customizable show and hide animation effects.

## Table of Contents
- [Animation Property](#animation-property)
- [Available Effects](#available-effects)
- [Default Animation](#default-animation)
- [Custom Animations](#custom-animations)
- [Animation Duration](#animation-duration)
- [Animation Delay](#animation-delay)
- [Reduced Motion](#reduced-motion)

---

## Animation Property

The `animation` property accepts an object with `show` and `hide` effect settings:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Animated Toast',
  content: 'This toast has custom animations',
  animation: {
    show: { effect: 'FadeIn', duration: 400, delay: 0 },
    hide: { effect: 'FadeOut', duration: 400, delay: 0 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Available Effects

### Show Effects

| Effect | Description |
|--------|-------------|
| `FadeIn` | Fade in from transparent to opaque (default) |
| `FadeZoomIn` | Fade in with zoom effect |
| `SlideBottomIn` | Slide in from bottom |
| `SlideTopIn` | Slide in from top |
| `SlideLeftIn` | Slide in from left |
| `SlideRightIn` | Slide in from right |
| `ZoomIn` | Zoom in from small to normal size |
| `FlipLeftUpIn` | Flip in from left-up direction |
| `FlipLeftDownIn` | Flip in from left-down direction |
| `FlipRightUpIn` | Flip in from right-up direction |
| `FlipRightDownIn` | Flip in from right-down direction |
| `None` | No animation |

### Hide Effects

| Effect | Description |
|--------|-------------|
| `FadeOut` | Fade out from opaque to transparent (default) |
| `FadeZoomOut` | Fade out with zoom effect |
| `SlideBottomOut` | Slide out to bottom |
| `SlideTopOut` | Slide out to top |
| `SlideLeftOut` | Slide out to left |
| `SlideRightOut` | Slide out to right |
| `ZoomOut` | Zoom out from normal to small size |
| `FlipLeftUpOut` | Flip out to left-up direction |
| `FlipLeftDownOut` | Flip out to left-down direction |
| `FlipRightUpOut` | Flip out to right-up direction |
| `FlipRightDownOut` | Flip out to right-down direction |
| `None` | No animation |

---

## Default Animation

The default animation is FadeIn/FadeOut with 400ms duration:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Default Animation',
  content: 'Uses FadeIn/FadeOut',
  // animation property not specified = uses defaults
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Custom Animations

### FadeZoomIn/FadeZoomOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Fade Zoom',
  content: 'Fade with zoom effect',
  animation: {
    show: { effect: 'FadeZoomIn', duration: 600 },
    hide: { effect: 'FadeZoomOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### SlideBottomIn/SlideBottomOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Slide from Bottom',
  content: 'Slides in from bottom',
  position: { X: 'Right', Y: 'Bottom' },
  animation: {
    show: { effect: 'SlideBottomIn', duration: 500 },
    hide: { effect: 'SlideBottomOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### SlideTopIn/SlideTopOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Slide from Top',
  content: 'Slides in from top',
  position: { X: 'Right', Y: 'Top' },
  animation: {
    show: { effect: 'SlideTopIn', duration: 500 },
    hide: { effect: 'SlideTopOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### SlideLeftIn/SlideLeftOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Slide from Left',
  content: 'Slides in from left',
  position: { X: 'Left', Y: 'Bottom' },
  animation: {
    show: { effect: 'SlideLeftIn', duration: 500 },
    hide: { effect: 'SlideLeftOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### SlideRightIn/SlideRightOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Slide from Right',
  content: 'Slides in from right',
  position: { X: 'Right', Y: 'Bottom' },
  animation: {
    show: { effect: 'SlideRightIn', duration: 500 },
    hide: { effect: 'SlideRightOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### ZoomIn/ZoomOut

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Zoom Effect',
  content: 'Zooms in and out',
  animation: {
    show: { effect: 'ZoomIn', duration: 600 },
    hide: { effect: 'ZoomOut', duration: 400 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Flip Effects

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Flip Animation',
  content: 'Flips in from left',
  animation: {
    show: { effect: 'FlipLeftUpIn', duration: 700 },
    hide: { effect: 'FlipLeftUpOut', duration: 500 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## No Animation

Disable animations completely:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'No Animation',
  content: 'Appears and disappears instantly',
  animation: {
    show: { effect: 'None' },
    hide: { effect: 'None' }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Animation Duration

Control animation speed in milliseconds:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

// Fast animation
let fastToast: Toast = new Toast({
  title: 'Fast Animation',
  content: 'Quick fade in/out',
  animation: {
    show: { effect: 'FadeIn', duration: 200 },
    hide: { effect: 'FadeOut', duration: 200 }
  }
});
fastToast.appendTo('#toast');
fastToast.show();

// Slow animation
let slowToast: Toast = new Toast({
  title: 'Slow Animation',
  content: 'Gradual fade in/out',
  animation: {
    show: { effect: 'FadeIn', duration: 1000 },
    hide: { effect: 'FadeOut', duration: 1000 }
  }
});
slowToast.appendTo('#toast-slow');
slowToast.show();
```

---

## Animation Delay

Add delay before animation starts:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Delayed Animation',
  content: 'Waits 500ms before showing',
  animation: {
    show: { effect: 'FadeIn', duration: 400, delay: 500 },
    hide: { effect: 'FadeOut', duration: 400, delay: 0 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Different Show and Hide Animations

Use different effects for show and hide:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Mixed Animations',
  content: 'Slides in, fades out',
  position: { X: 'Right', Y: 'Bottom' },
  animation: {
    show: { effect: 'SlideBottomIn', duration: 500 },
    hide: { effect: 'FadeOut', duration: 300 }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Reduced Motion

Respect user's motion preferences:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastObj: Toast = new Toast({
  title: 'Motion-Aware',
  content: 'Animation respects user preference',
  animation: prefersReducedMotion
    ? { show: { effect: 'None' }, hide: { effect: 'None' } }
    : { show: { effect: 'FadeIn', duration: 400 }, hide: { effect: 'FadeOut', duration: 400 } }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Performance Considerations

- **Shorter durations** (200-400ms) feel more responsive
- **Avoid very long durations** (>1000ms) for toasts
- **Use `None`** for performance-critical scenarios
- **Match hide duration to show** for consistent feel
- **Consider reduced motion** for accessibility

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animation` | `ToastAnimationSettingsModel` | `{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }` | Animation settings |

**ToastAnimationSettingsModel Interface:**

```typescript
interface ToastAnimationSettingsModel {
  show?: ToastAnimationEffect;
  hide?: ToastAnimationEffect;
}

interface ToastAnimationEffect {
  effect?: string;
  duration?: number;
  delay?: number;
}
```

For complete API details, see [toast-api.md](./toast-api.md).
