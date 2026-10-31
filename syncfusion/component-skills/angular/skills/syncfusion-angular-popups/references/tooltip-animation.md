# Tooltip Animation

## Table of Contents
- [Animation Property](#animation-property)
- [Animation Effects](#animation-effects)
- [Custom Duration and Delay](#custom-duration-and-delay)
- [Per-Call Animation with open() and close()](#per-call-animation-with-open-and-close)
- [Transition Effects via beforeOpen](#transition-effects-via-beforeopen)
- [Disabling Animation](#disabling-animation)

---

## Animation Property

The `animation` property accepts an `AnimationModel` object with two keys: `open` and `close`. Each takes a `TooltipAnimationSettings` object.

**Default:** `{ open: { effect: 'FadeIn', duration: 150, delay: 0 }, close: { effect: 'FadeOut', duration: 150, delay: 0 } }`

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { AnimationModel } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip content="Animated tooltip" [animation]="tooltipAnimation">
      <button>Hover me</button>
    </ejs-tooltip>
  `
})
export class App {
  public tooltipAnimation: AnimationModel = {
    open:  { effect: 'ZoomIn',  duration: 300, delay: 0 },
    close: { effect: 'ZoomOut', duration: 200, delay: 0 }
  };
}
```

---

## Animation Effects

All supported `Effect` values for open and close actions:

| Effect | Notes |
|---|---|
| `FadeIn` / `FadeOut` | Default; smooth opacity transition |
| `FadeZoomIn` / `FadeZoomOut` | Fade combined with scale |
| `FlipXDownIn` / `FlipXDownOut` | 3D flip on X axis downward |
| `FlipXUpIn` / `FlipXUpOut` | 3D flip on X axis upward |
| `FlipYLeftIn` / `FlipYLeftOut` | 3D flip on Y axis leftward |
| `FlipYRightIn` / `FlipYRightOut` | 3D flip on Y axis rightward |
| `ZoomIn` / `ZoomOut` | Scale from/to center |
| `None` | No animation |

> Flip and Zoom effects look best when `showTipPointer` is `false`, since the arrow can look jarring when animating.

---

## Custom Duration and Delay

`duration` (ms) controls how long the animation takes. `delay` (ms) delays the start:

```typescript
public tooltipAnimation: AnimationModel = {
  open:  { effect: 'SlideDown' as any, duration: 400, delay: 100 },
  close: { effect: 'FadeOut',          duration: 200, delay: 50  }
};
```

> The tooltip enters over 150ms using `ease-out` timing and exits at 150ms using `ease-in` by default. Increase `duration` for slower, more visible effects.

---

## Per-Call Animation with open() and close()

Pass a `TooltipAnimationSettings` object directly to `open()` or `close()` to override the component-level animation for that specific call. This lets you apply different animations to the same tooltip on different targets.

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule, TooltipComponent, TooltipAnimationSettings } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip #tooltip content="Dynamic animation" opensOn="Custom">
      <span id="target">Custom target</span>
    </ejs-tooltip>
    <button (click)="showWithZoom()">Zoom In</button>
    <button (click)="showWithFade()">Fade In</button>
    <button (click)="hide()">Hide</button>
  `
})
export class App {
  @ViewChild('tooltip') tooltip!: TooltipComponent;

  showWithZoom(): void {
    const target = document.getElementById('target') as HTMLElement;
    const anim: TooltipAnimationSettings = { effect: 'ZoomIn', duration: 400, delay: 0 };
    this.tooltip.open(target, anim);
  }

  showWithFade(): void {
    const target = document.getElementById('target') as HTMLElement;
    const anim: TooltipAnimationSettings = { effect: 'FadeIn', duration: 300, delay: 0 };
    this.tooltip.open(target, anim);
  }

  hide(): void {
    const closeAnim: TooltipAnimationSettings = { effect: 'FadeOut', duration: 200, delay: 0 };
    this.tooltip.close(closeAnim);
  }
}
```

> If no animation parameter is passed to `open()`/`close()`, it falls back to the `animation` property settings.

---

## Transition Effects via beforeOpen

Apply custom CSS transitions using the `beforeOpen` event. This lets you use CSS animations that don't exist as built-in effects:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .e-tooltip-wrap.e-popup {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `],
  template: `
    <ejs-tooltip content="Custom transition!" (beforeOpen)="onBeforeOpen($event)">
      <button>Hover me</button>
    </ejs-tooltip>
  `
})
export class App {
  onBeforeOpen(args: any): void {
    // Apply a CSS class to the tooltip element for custom transition
    if (args.element) {
      args.element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }
  }
}
```

---

## Disabling Animation

Set both `open` and `close` effects to `'None'` for instant show/hide:

```typescript
public noAnimation: AnimationModel = {
  open:  { effect: 'None', duration: 0, delay: 0 },
  close: { effect: 'None', duration: 0, delay: 0 }
};
```
```html
<ejs-tooltip content="No animation" [animation]="noAnimation">
  <button>Instant tooltip</button>
</ejs-tooltip>
```

---

## See Also

- [Open Modes](./open-mode.md) — Triggering tooltip open/close
- [API Reference](./api.md) — `animation`, `open()`, `close()`, `AnimationModel`, `TooltipAnimationSettings`, `Effect`
