# Tooltip Position & Dimensions

## Table of Contents
- [Position Values](#position-values)
- [Tip Pointer](#tip-pointer)
- [Dynamic Positioning](#dynamic-positioning)
- [Mouse Trailing](#mouse-trailing)
- [Offset Values](#offset-values)
- [Width and Height](#width-and-height)
- [Scroll Mode](#scroll-mode)
- [Window Collision](#window-collision)

---

## Position Values

Set the `position` property to place the tooltip relative to its target. Default is `'TopCenter'`.

**Available values:**

| Side | Positions |
|---|---|
| Top | `TopLeft`, `TopCenter`, `TopRight` |
| Bottom | `BottomLeft`, `BottomCenter`, `BottomRight` |
| Left | `LeftTop`, `LeftCenter`, `LeftBottom` |
| Right | `RightTop`, `RightCenter`, `RightBottom` |

```html
<ejs-tooltip content="Bottom center tooltip" position="BottomCenter">
  <button>Hover me</button>
</ejs-tooltip>
```

```typescript
// Dynamically change position
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule, TooltipComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip #tooltip content="Repositioned!" [position]="currentPosition">
      <button>Hover me</button>
    </ejs-tooltip>
    <select (change)="changePosition($event)">
      <option value="TopCenter">TopCenter</option>
      <option value="BottomCenter">BottomCenter</option>
      <option value="RightCenter">RightCenter</option>
      <option value="LeftCenter">LeftCenter</option>
    </select>
  `
})
export class App {
  public currentPosition: string = 'TopCenter';

  changePosition(event: Event): void {
    this.currentPosition = (event.target as HTMLSelectElement).value;
  }
}
```

> When the viewport has insufficient space, the tooltip auto-adjusts: it fits horizontally and flips vertically by default.

---

## Tip Pointer

### Show / Hide

Control the arrow tip pointer with `showTipPointer` (default: `true`):

```html
<!-- No arrow tip -->
<ejs-tooltip content="No arrow" [showTipPointer]="false">
  <button>Hover me</button>
</ejs-tooltip>
```

> Hiding the tip pointer works best with animation effects like `ZoomIn`/`ZoomOut`.

### Tip Pointer Position

Fine-tune where on the tooltip edge the arrow appears using `tipPointerPosition`:

| Value | Behavior |
|---|---|
| `Auto` (default) | Auto-adjusts within target bounds |
| `Start` | Start of the tooltip edge |
| `Middle` | Center of the tooltip edge |
| `End` | End of the tooltip edge |

```html
<ejs-tooltip content="Pointer at start" tipPointerPosition="Start">
  <button>Hover me</button>
</ejs-tooltip>
```

> `Auto` prevents the arrow from pointing outside the target element boundary.

---

## Dynamic Positioning

Use the `refresh()` method to recalculate and reposition the tooltip after the target or viewport changes:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule, TooltipComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip #tooltip content="Drag me!" target="#dragTarget">
      <div id="dragTarget" style="position:absolute; cursor:move; padding:10px; background:#eee;">
        Drag me
      </div>
    </ejs-tooltip>
  `
})
export class App {
  @ViewChild('tooltip') tooltip!: TooltipComponent;

  onDrag(target: HTMLElement): void {
    this.tooltip.refresh(target);
  }
}
```

---

## Mouse Trailing

Enable the tooltip to follow the mouse cursor with `mouseTrail` (default: `false`):

```html
<ejs-tooltip content="I follow your cursor!" [mouseTrail]="true">
  <div style="width:300px; height:100px; background:#f0f0f0;">
    Move mouse here
  </div>
</ejs-tooltip>
```

> When `mouseTrail` is enabled, `tipPointerPosition` values (`Start`, `Middle`, `End`) are ignored — the pointer auto-adjusts to avoid going outside the target. The `position` property still affects which side the tooltip appears on.

---

## Offset Values

Add space between the target element and the tooltip using `offsetX` (horizontal) and `offsetY` (vertical):

```html
<!-- 15px right, 10px down from default position -->
<ejs-tooltip content="Offset tooltip" [offsetX]="15" [offsetY]="10">
  <button>Hover me</button>
</ejs-tooltip>
```

```typescript
// Useful when tooltip overlaps an icon you want visible
public xOffset: number = 10;
public yOffset: number = -5;
```

---

## Width and Height

Set explicit dimensions to control tooltip size. Both default to `'auto'`:

```html
<!-- Fixed size -->
<ejs-tooltip content="This tooltip has a fixed width." width="200px" height="80px">
  <button>Fixed size</button>
</ejs-tooltip>

<!-- Number values (treated as px) -->
<ejs-tooltip content="Long content here..." [width]="250" [height]="120">
  <button>Number size</button>
</ejs-tooltip>
```

> `'auto'` lets the tooltip size adapt to its content within the viewport.

---

## Scroll Mode

When `height` is set to a specific value and content overflows, scrolling is automatically enabled:

```html
<ejs-tooltip
  [height]="100"
  [isSticky]="true"
  content="Line 1<br/>Line 2<br/>Line 3<br/>Line 4<br/>Line 5<br/>Line 6">
  <button>Scrollable tooltip</button>
</ejs-tooltip>
```

> Scroll mode is most useful combined with `isSticky="true"` so the user can actually scroll the tooltip content.

---

## Window Collision

By default, the tooltip performs collision detection against its own boundaries. Setting `windowCollision` to `true` uses the page viewport (window) as the collision boundary instead:

```html
<ejs-tooltip
  content="Viewport-aware tooltip"
  target=".target-item"
  [windowCollision]="true">
  <div>
    <span class="target-item">Near edge element</span>
  </div>
</ejs-tooltip>
```

> Use `windowCollision: true` when targets can be positioned near the viewport edges and you want the tooltip to flip/reposition relative to the window rather than the tooltip element.

---

## See Also

- [Open Modes](./open-mode.md) — Sticky, mouse trail interaction
- [Customization & Style](./customization-and-style.md) — Tip pointer CSS
- [API Reference](./api.md) — `position`, `tipPointerPosition`, `showTipPointer`, `mouseTrail`, `offsetX`, `offsetY`, `width`, `height`, `windowCollision`, `refresh()`
