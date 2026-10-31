# Tooltip Position

The Syncfusion TypeScript Tooltip supports 12 static positions, tip pointer customization, mouse trailing, and offset configuration.

## Table of Contents
- [12 Static Positions](#12-static-positions)
- [Tip Pointer](#tip-pointer)
- [Tip Pointer Position](#tip-pointer-position)
- [Mouse Trailing](#mouse-trailing)
- [Offset Values](#offset-values)
- [Dynamic Positioning](#dynamic-positioning)
- [Collision Handling](#collision-handling)

---

## 12 Static Positions

The `position` property accepts 12 predefined values:

| Position | Description |
|----------|-------------|
| `TopLeft` | Above target, aligned left |
| `TopCenter` | Above target, centered (default) |
| `TopRight` | Above target, aligned right |
| `BottomLeft` | Below target, aligned left |
| `BottomCenter` | Below target, centered |
| `BottomRight` | Below target, aligned right |
| `LeftTop` | Left of target, aligned top |
| `LeftCenter` | Left of target, centered |
| `LeftBottom` | Left of target, aligned bottom |
| `RightTop` | Right of target, aligned top |
| `RightCenter` | Right of target, centered |
| `RightBottom` | Right of target, aligned bottom |

### Top Positions

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let topLeft: Tooltip = new Tooltip({
  content: 'Top Left',
  position: 'TopLeft'
});
topLeft.appendTo('#target-tl');

let topCenter: Tooltip = new Tooltip({
  content: 'Top Center',
  position: 'TopCenter'
});
topCenter.appendTo('#target-tc');

let topRight: Tooltip = new Tooltip({
  content: 'Top Right',
  position: 'TopRight'
});
topRight.appendTo('#target-tr');
```

### Bottom Positions

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let bottomLeft: Tooltip = new Tooltip({
  content: 'Bottom Left',
  position: 'BottomLeft'
});
bottomLeft.appendTo('#target-bl');

let bottomCenter: Tooltip = new Tooltip({
  content: 'Bottom Center',
  position: 'BottomCenter'
});
bottomCenter.appendTo('#target-bc');

let bottomRight: Tooltip = new Tooltip({
  content: 'Bottom Right',
  position: 'BottomRight'
});
bottomRight.appendTo('#target-br');
```

### Left Positions

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let leftTop: Tooltip = new Tooltip({
  content: 'Left Top',
  position: 'LeftTop'
});
leftTop.appendTo('#target-lt');

let leftCenter: Tooltip = new Tooltip({
  content: 'Left Center',
  position: 'LeftCenter'
});
leftCenter.appendTo('#target-lc');

let leftBottom: Tooltip = new Tooltip({
  content: 'Left Bottom',
  position: 'LeftBottom'
});
leftBottom.appendTo('#target-lb');
```

### Right Positions

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let rightTop: Tooltip = new Tooltip({
  content: 'Right Top',
  position: 'RightTop'
});
rightTop.appendTo('#target-rt');

let rightCenter: Tooltip = new Tooltip({
  content: 'Right Center',
  position: 'RightCenter'
});
rightCenter.appendTo('#target-rc');

let rightBottom: Tooltip = new Tooltip({
  content: 'Right Bottom',
  position: 'RightBottom'
});
rightBottom.appendTo('#target-rb');
```

---

## Tip Pointer

Control the tip pointer (arrow) visibility:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// With tip pointer (default)
let withTip: Tooltip = new Tooltip({
  content: 'Has tip pointer',
  showTipPointer: true
});
withTip.appendTo('#target-with-tip');

// Without tip pointer
let withoutTip: Tooltip = new Tooltip({
  content: 'No tip pointer',
  showTipPointer: false
});
withoutTip.appendTo('#target-without-tip');
```

**Default:** `showTipPointer: true`

---

## Tip Pointer Position

Control the tip pointer alignment:

| Value | Description |
|-------|-------------|
| `Auto` | Auto-positioned based on tooltip position (default) |
| `Start` | Aligned to start of tooltip |
| `Middle` | Centered on tooltip |
| `End` | Aligned to end of tooltip |

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Tip pointer at start',
  position: 'TopCenter',
  showTipPointer: true,
  tipPointerPosition: 'Start'
});
tooltip.appendTo('#target');
```

---

## Mouse Trailing

Make the tooltip follow the mouse cursor:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Follows the mouse',
  mouseTrail: true
});
tooltip.appendTo('#target');
```

**Use Cases:**
- Interactive help
- Drawing/annotation tools
- Dynamic information display

---

## Offset Values

Set X and Y offset from the target:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Horizontal offset
let horizontalOffset: Tooltip = new Tooltip({
  content: 'Offset 20px right',
  position: 'RightCenter',
  offsetX: 20
});
horizontalOffset.appendTo('#target-h');

// Vertical offset
let verticalOffset: Tooltip = new Tooltip({
  content: 'Offset 15px down',
  position: 'BottomCenter',
  offsetY: 15
});
verticalOffset.appendTo('#target-v');

// Both offsets
let bothOffsets: Tooltip = new Tooltip({
  content: 'Offset 10px X, 5px Y',
  position: 'TopCenter',
  offsetX: 10,
  offsetY: 5
});
bothOffsets.appendTo('#target-both');
```

**Defaults:** `offsetX: 0`, `offsetY: 0`

---

## Dynamic Positioning

For draggable targets, call `refresh()` to recalculate position:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Dynamic position',
  position: 'TopCenter'
});
tooltip.appendTo('#draggable-target');

// After dragging, refresh position
document.getElementById('draggable-target')!.addEventListener('mouseup', () => {
  tooltip.refresh();
});
```

### Refresh Specific Target

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '.dynamic-item',
  position: 'TopCenter'
});
tooltip.appendTo('#container');

// Refresh specific target
function refreshTarget(target: HTMLElement): void {
  tooltip.refresh(target);
}
```

---

## Collision Handling

Enable auto-flip when tooltip would overflow viewport:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Auto-flips when near edge',
  position: 'TopCenter',
  windowCollision: true  // Auto-flip on collision
});
tooltip.appendTo('#target');
```

**Default:** `windowCollision: false` (tooltip can overflow viewport)

When enabled, the tooltip automatically flips to the opposite side if it would overflow the viewport edge.

---

## Complete Positioning Example

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Fully positioned tooltip',
  position: 'TopCenter',
  showTipPointer: true,
  tipPointerPosition: 'Auto',
  offsetX: 0,
  offsetY: 5,
  mouseTrail: false,
  windowCollision: true
});
tooltip.appendTo('#target');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `string` | `'TopCenter'` | Tooltip position (12 values) |
| `showTipPointer` | `boolean` | `true` | Show tip pointer |
| `tipPointerPosition` | `string` | `'Auto'` | Tip pointer alignment |
| `mouseTrail` | `boolean` | `false` | Follow mouse cursor |
| `offsetX` | `number` | `0` | Horizontal offset |
| `offsetY` | `number` | `0` | Vertical offset |
| `windowCollision` | `boolean` | `false` | Auto-flip on viewport collision |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
