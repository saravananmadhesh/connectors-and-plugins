# Tooltip Open Modes

## Table of Contents
- [opensOn Values](#openson-values)
- [Combining Multiple Open Modes](#combining-multiple-open-modes)
- [Custom Mode](#custom-mode)
- [Sticky Mode](#sticky-mode)
- [Open and Close Delay](#open-and-close-delay)
- [Mobile Behavior](#mobile-behavior)

---

## opensOn Values

Control how the tooltip is triggered using the `opensOn` property (default: `'Auto'`).

| Value | Desktop | Mobile |
|---|---|---|
| `Auto` | Opens on hover or focus | Opens on tap and hold |
| `Hover` | Opens on mouse hover | Opens on tap and hold |
| `Click` | Opens on mouse click | Opens on single tap |
| `Focus` | Opens when element receives focus (e.g., via Tab) | Opens on single tap |
| `Custom` | Not triggered automatically; use `open()`/`close()` | Same as desktop |

```html
<!-- Auto (default) -->
<ejs-tooltip content="Auto mode" opensOn="Auto">
  <button>Hover or focus me</button>
</ejs-tooltip>

<!-- Click mode -->
<ejs-tooltip content="Click triggered" opensOn="Click">
  <button>Click me</button>
</ejs-tooltip>

<!-- Focus mode -->
<ejs-tooltip content="Tab to focus me" opensOn="Focus">
  <input type="text" placeholder="Tab here" />
</ejs-tooltip>
```

---

## Combining Multiple Open Modes

Combine modes by separating them with a space. `Auto` cannot be combined with other values.

```html
<!-- Opens on hover OR click -->
<ejs-tooltip content="Hover or click!" opensOn="Hover Click">
  <button>Interact with me</button>
</ejs-tooltip>

<!-- Opens on click OR focus -->
<ejs-tooltip content="Click or tab!" opensOn="Click Focus">
  <input type="text" placeholder="Click or tab" />
</ejs-tooltip>
```

> Combined modes give users more flexibility. Commonly used in forms where both mouse and keyboard users need tooltip feedback.

---

## Custom Mode

In `Custom` mode the tooltip never opens automatically. You control it entirely with the `open()` and `close()` methods on the component instance. This is useful for right-click menus, double-click actions, or drag interactions.

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule, TooltipComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip #tooltip content="Right-click triggered!" opensOn="Custom">
      <div
        (contextmenu)="onRightClick($event)"
        style="padding:20px; border:1px solid #ccc; display:inline-block;">
        Right-click here
      </div>
    </ejs-tooltip>
  `
})
export class App {
  @ViewChild('tooltip') tooltip!: TooltipComponent;

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.tooltip.open(event.target as HTMLElement);
    // Auto-close after 2 seconds
    setTimeout(() => this.tooltip.close(), 2000);
  }
}
```

**Double-click example:**
```typescript
onDoubleClick(event: MouseEvent): void {
  this.tooltip.open(event.target as HTMLElement);
}
```

> The `open()` method's `element` parameter is optional — if omitted it uses the tooltip's own host element.

---

## Sticky Mode

Enable sticky mode to keep the tooltip visible until the user explicitly closes it using the close icon (automatically added to the top-right corner of the tooltip):

```html
<ejs-tooltip content="I stay open until closed." [isSticky]="true">
  <span>Hover to pin</span>
</ejs-tooltip>
```

**Sticky mode with scrollable content:**
```html
<ejs-tooltip
  content="<p>Line 1</p><p>Line 2</p><p>Line 3</p><p>Line 4</p>"
  [isSticky]="true"
  [height]="100">
  <button>Sticky + scroll</button>
</ejs-tooltip>
```

> Sticky mode is ideal for tutorial tooltips, help overlays, or any context where users need time to read the content.

---

## Open and Close Delay

Delay when the tooltip opens or closes using `openDelay` and `closeDelay` (in milliseconds, default: `0`):

```html
<!-- Opens after 500ms, closes after 300ms -->
<ejs-tooltip
  content="Delayed tooltip"
  [openDelay]="500"
  [closeDelay]="300">
  <button>Hover me</button>
</ejs-tooltip>
```

```typescript
// Useful for dense UIs to prevent flicker when mousing over items
public openDelay: number = 600;
public closeDelay: number = 200;
```

> Adding a small `closeDelay` lets users move their mouse onto the tooltip itself (if needed) without it disappearing immediately.

---

## Mobile Behavior

On touch devices:

- `Auto` and `Hover`: Tooltip shows on tap-and-hold; dismisses 1.5 seconds after release
- `Click`: Shows on single tap
- `Focus`: Shows on single tap
- `Custom`: Same behavior as desktop

```html
<!-- Touch-friendly: tap and hold -->
<ejs-tooltip content="Tap and hold on mobile" opensOn="Hover">
  <button>Tap &amp; hold (mobile)</button>
</ejs-tooltip>
```

> If another interaction occurs before the 1.5-second auto-dismiss, the tooltip hides immediately.

---

## See Also

- [Position & Dimensions](./position-and-dimension.md) — Tooltip placement
- [Animation](./animation.md) — Open/close animation effects
- [API Reference](./api.md) — `opensOn`, `isSticky`, `openDelay`, `closeDelay`, `open()`, `close()`
