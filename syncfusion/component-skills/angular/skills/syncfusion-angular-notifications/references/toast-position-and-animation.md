# Position and Animation — Syncfusion Angular Toast

## Table of Contents
- [Predefined Positions](#predefined-positions)
- [Custom Positions](#custom-positions)
- [Multiple Toasts in Different Positions](#multiple-toasts-in-different-positions)
- [Animation Configuration](#animation-configuration)
- [Animation Effects Reference](#animation-effects-reference)

---

## Predefined Positions

The `position` property accepts a `ToastPositionModel` with `X` and `Y` coordinates. Predefined string values are supported for common layouts:

**X axis values:** `'Left'` | `'Center'` | `'Right'`  
**Y axis values:** `'Top'` | `'Bottom'`

```typescript
import { ToastPositionModel } from '@syncfusion/ej2-angular-notifications';

// Top-right (common for notifications)
public position: ToastPositionModel = { X: 'Right', Y: 'Top' };

// Bottom-center (common for snackbars)
public position: ToastPositionModel = { X: 'Center', Y: 'Bottom' };

// Top-center
public position: ToastPositionModel = { X: 'Center', Y: 'Top' };

// Bottom-left (default direction)
public position: ToastPositionModel = { X: 'Left', Y: 'Bottom' };
```

```html
<ejs-toast [position]="position"></ejs-toast>
```

> **Important:** Position updates only take effect after all currently visible toasts are removed. If a toast is showing and you change `position` dynamically, the new position applies to the next toast shown — not the one currently visible.

> When `width` is set to `'100%'`, the X position has no effect. Use `Y: 'Top'` or `Y: 'Bottom'` for full-width banner toasts.

---

## Custom Positions

Use pixel values, numbers, or percentage strings for precise placement:

```typescript
// Pixel values (number treated as px)
public position = { X: '100', Y: '80' };

// Numeric shorthand (same as px)
public position = { X: 100, Y: 80 };

// Percentage-based
public position = { X: '30%', Y: '10%' };
```

```html
<ejs-toast [position]="position"></ejs-toast>
```

Custom positions update the toast container's `top` and `left` CSS values relative to the `target` element (or the viewport if no target is set).

---

## Multiple Toasts in Different Positions

Because toast position is per-instance and only updates once visible toasts are cleared, display multiple toasts in different positions by using **separate `ejs-toast` instances** with different `target` containers:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Top-right toast -->
    <ejs-toast #topRight [position]="posTopRight">
      <ng-template #title><div>Top Right</div></ng-template>
      <ng-template #content><div>Notification in top-right.</div></ng-template>
    </ejs-toast>

    <!-- Bottom-center toast -->
    <ejs-toast #bottomCenter [position]="posBottomCenter">
      <ng-template #title><div>Bottom Center</div></ng-template>
      <ng-template #content><div>Notification in bottom-center.</div></ng-template>
    </ejs-toast>

    <button (click)="topRight.show()">Show Top Right</button>
    <button (click)="bottomCenter.show()">Show Bottom Center</button>
  `
})
export class App {
  public posTopRight = { X: 'Right', Y: 'Top' };
  public posBottomCenter = { X: 'Center', Y: 'Bottom' };
}
```

> Each `ejs-toast` instance manages its own queue and position independently. This is the correct pattern for displaying toasts at simultaneous different positions.

---

## Animation Configuration

The `animation` property controls the show and hide transition effects. It accepts a `ToastAnimationSettingsModel` with `show` and `hide` sub-objects.

**Default animation:** `FadeIn` (show), `FadeOut` (hide) — both 600ms, linear easing.

```typescript
import { ToastAnimationSettingsModel } from '@syncfusion/ej2-angular-notifications';

public animation: ToastAnimationSettingsModel = {
  show: { effect: 'SlideRightIn', duration: 400, easing: 'ease' },
  hide: { effect: 'SlideRightOut', duration: 400, easing: 'ease' }
};
```

```html
<ejs-toast [animation]="animation"></ejs-toast>
```

**Animation object structure:**
```typescript
{
  show: {
    effect: string,    // Animation effect name (see table below)
    duration: number,  // Duration in milliseconds
    easing: string     // CSS easing function: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
  },
  hide: {
    effect: string,
    duration: number,
    easing: string
  }
}
```

---

## Animation Effects Reference

Common animation effects supported by Syncfusion's Animation library:

| Effect Name | Description |
|---|---|
| `FadeIn` / `FadeOut` | Default — opacity transition |
| `SlideRightIn` / `SlideRightOut` | Slide from/to the right |
| `SlideLeftIn` / `SlideLeftOut` | Slide from/to the left |
| `SlideTopIn` / `SlideTopOut` | Slide from/to the top |
| `SlideBottomIn` / `SlideBottomOut` | Slide from/to the bottom |
| `ZoomIn` / `ZoomOut` | Scale from/to center |
| `FlipLeftDownIn` / `FlipLeftDownOut` | 3D flip effect |
| `None` | No animation |

**Example — slide-in from right with fast hide:**
```typescript
public animation: ToastAnimationSettingsModel = {
  show: { effect: 'SlideRightIn', duration: 300, easing: 'ease-out' },
  hide: { effect: 'FadeOut', duration: 200, easing: 'linear' }
};
```

**Example — no animation:**
```typescript
public animation: ToastAnimationSettingsModel = {
  show: { effect: 'None', duration: 0, easing: 'linear' },
  hide: { effect: 'None', duration: 0, easing: 'linear' }
};
```

> Match your `show` slide direction to the X position for a natural feel: right-positioned toasts look best with `SlideRightIn`; bottom-positioned with `SlideBottomIn`.

## See Also
- [How-To: Show Multiple Toasts in Various Positions](./how-to.md#show-multiple-toasts-in-various-positions)
- [Configuration](./configuration.md) — Target container, width
- [API Reference](./api.md) — `ToastPositionModel`, `ToastAnimationSettingsModel`
