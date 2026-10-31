# Tooltip Animation

The Syncfusion TypeScript Tooltip supports customizable animation effects for open and close transitions.

## Table of Contents
- [Animation Property](#animation-property)
- [Available Effects](#available-effects)
- [Default Animation](#default-animation)
- [Custom Animations](#custom-animations)
- [Programmatic Animation](#programmatic-animation)
- [CSS Transitions](#css-transitions)
- [Reduced Motion](#reduced-motion)

---

## Animation Property

The `animation` property accepts an object with `open` and `close` settings:

```typescript
import { Tooltip, TooltipAnimationSettings } from '@syncfusion/ej2-popups';

const animation: TooltipAnimationSettings = {
  open: { effect: 'FadeIn', duration: 400, delay: 0 },
  close: { effect: 'FadeOut', duration: 400, delay: 0 }
};

let tooltip: Tooltip = new Tooltip({
  content: 'Animated tooltip',
  animation: animation
});
tooltip.appendTo('#target');
```

---

## Available Effects

| Effect | Description |
|--------|-------------|
| `FadeIn` / `FadeOut` | Fade in/out (default) |
| `ZoomIn` / `ZoomOut` | Zoom in/out |
| `FlipXDownIn` / `FlipXDownOut` | Flip X-axis down |
| `FlipXUpIn` / `FlipXUpOut` | Flip X-axis up |
| `FlipYLeftIn` / `FlipYLeftOut` | Flip Y-axis left |
| `FlipYRightIn` / `FlipYRightOut` | Flip Y-axis right |
| `SlideBottomIn` / `SlideBottomOut` | Slide from/to bottom |
| `SlideTopIn` / `SlideTopOut` | Slide from/to top |
| `SlideLeftIn` / `SlideLeftOut` | Slide from/to left |
| `SlideRightIn` / `SlideRightOut` | Slide from/to right |
| `None` | No animation |

---

## Default Animation

The default animation is FadeIn/FadeOut with 150ms duration:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Default animation',
  // animation property not specified = uses defaults
});
tooltip.appendTo('#target');
```

---

## Custom Animations

### FadeIn/FadeOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Fade animation',
  animation: {
    open: { effect: 'FadeIn', duration: 400 },
    close: { effect: 'FadeOut', duration: 400 }
  }
});
tooltip.appendTo('#target');
```

### ZoomIn/ZoomOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Zoom animation',
  animation: {
    open: { effect: 'ZoomIn', duration: 500 },
    close: { effect: 'ZoomOut', duration: 400 }
  }
});
tooltip.appendTo('#target');
```

### SlideBottomIn/SlideBottomOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Slides up from bottom',
  position: 'BottomCenter',
  animation: {
    open: { effect: 'SlideBottomIn', duration: 400 },
    close: { effect: 'SlideBottomOut', duration: 300 }
  }
});
tooltip.appendTo('#target');
```

### SlideTopIn/SlideTopOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Slides down from top',
  position: 'TopCenter',
  animation: {
    open: { effect: 'SlideTopIn', duration: 400 },
    close: { effect: 'SlideTopOut', duration: 300 }
  }
});
tooltip.appendTo('#target');
```

### FlipXDownIn/FlipXDownOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Flip X down animation',
  position: 'TopCenter',
  animation: {
    open: { effect: 'FlipXDownIn', duration: 600 },
    close: { effect: 'FlipXDownOut', duration: 500 }
  }
});
tooltip.appendTo('#target');
```

### FlipYRightIn/FlipYRightOut

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Flip Y right animation',
  position: 'RightCenter',
  animation: {
    open: { effect: 'FlipYRightIn', duration: 600 },
    close: { effect: 'FlipYRightOut', duration: 500 }
  }
});
tooltip.appendTo('#target');
```

---

## No Animation

Disable animations completely:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'No animation',
  animation: {
    open: { effect: 'None' },
    close: { effect: 'None' }
  }
});
tooltip.appendTo('#target');
```

---

## Programmatic Animation

Animate tooltip using `open()` and `close()` methods:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let tooltip: Tooltip = new Tooltip({
  content: 'Programmatically animated',
  opensOn: 'Custom',
  animation: {
    open: { effect: 'ZoomIn', duration: 500 },
    close: { effect: 'ZoomOut', duration: 400 }
  }
});
tooltip.appendTo('#target');

let openBtn: Button = new Button({
  content: 'Animate Open',
  click: () => tooltip.open()
});
openBtn.appendTo('#open-btn');

let closeBtn: Button = new Button({
  content: 'Animate Close',
  click: () => tooltip.close()
});
closeBtn.appendTo('#close-btn');
```

---

## CSS Transitions

Use CSS transitions with `beforeRender` event for custom animations:

```typescript
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Custom CSS transition',
  animation: { open: { effect: 'None' }, close: { effect: 'None' } },
  beforeRender: (args: TooltipEventArgs) => {
    const element: HTMLElement = args.element;
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }, 10);
  }
});
tooltip.appendTo('#target');
```

---

## Reduced Motion

Respect user's motion preferences:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let tooltip: Tooltip = new Tooltip({
  content: 'Motion-aware tooltip',
  animation: prefersReducedMotion
    ? { open: { effect: 'None' }, close: { effect: 'None' } }
    : { open: { effect: 'FadeIn', duration: 400 }, close: { effect: 'FadeOut', duration: 400 } }
});
tooltip.appendTo('#target');
```

---

## Performance Considerations

- **Shorter durations** (150-300ms) feel more responsive for tooltips
- **Avoid long durations** (>800ms) for tooltips
- **Use `None`** for performance-critical scenarios
- **Match open and close** durations for consistent feel
- **Consider reduced motion** for accessibility

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animation.open.effect` | `string` | `'FadeIn'` | Open animation effect |
| `animation.open.duration` | `number` | `150` | Open duration in ms |
| `animation.open.delay` | `number` | `0` | Open delay in ms |
| `animation.close.effect` | `string` | `'FadeOut'` | Close animation effect |
| `animation.close.duration` | `number` | `150` | Close duration in ms |
| `animation.close.delay` | `number` | `0` | Close delay in ms |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
