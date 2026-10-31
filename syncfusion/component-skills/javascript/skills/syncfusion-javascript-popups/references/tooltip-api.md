# Tooltip API Reference

Complete API reference for the Syncfusion TypeScript Tooltip component.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Enumerations](#enumerations)
- [Type Definitions](#type-definitions)
- [Complete Example](#complete-example)

---

## Properties

### content

Gets or sets the content of the tooltip.

| | |
|---|---|
| **Type** | `string \| HTMLElement \| Function` |
| **Default** | `''` |

```typescript
let tooltip: Tooltip = new Tooltip({
  content: 'Tooltip text'
});
```

### target

Gets or sets the target element(s) for the tooltip.

| | |
|---|---|
| **Type** | `string \| HTMLElement` |
| **Default** | `''` |

```typescript
let tooltip: Tooltip = new Tooltip({
  target: '#myButton'  // or '.my-class' for multiple
});
```

### position

Gets or sets the position of the tooltip.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'TopCenter'` |
| **Values** | `'TopLeft' \| 'TopCenter' \| 'TopRight' \| 'BottomLeft' \| 'BottomCenter' \| 'BottomRight' \| 'LeftTop' \| 'LeftCenter' \| 'LeftBottom' \| 'RightTop' \| 'RightCenter' \| 'RightBottom'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  position: 'BottomCenter'
});
```

### showTipPointer

Gets or sets whether to show the tip pointer.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

```typescript
let tooltip: Tooltip = new Tooltip({
  showTipPointer: false
});
```

### tipPointerPosition

Gets or sets the tip pointer position.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Auto'` |
| **Values** | `'Auto' \| 'Start' \| 'Middle' \| 'End'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  tipPointerPosition: 'Start'
});
```

### mouseTrail

Gets or sets whether the tooltip follows the mouse cursor.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let tooltip: Tooltip = new Tooltip({
  mouseTrail: true
});
```

### offsetX

Gets or sets the horizontal offset from the target.

| | |
|---|---|
| **Type** | `number` |
| **Default** | `0` |

```typescript
let tooltip: Tooltip = new Tooltip({
  offsetX: 10
});
```

### offsetY

Gets or sets the vertical offset from the target.

| | |
|---|---|
| **Type** | `number` |
| **Default** | `0` |

```typescript
let tooltip: Tooltip = new Tooltip({
  offsetY: 5
});
```

### opensOn

Gets or sets the open trigger mode.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Auto'` |
| **Values** | `'Auto' \| 'Hover' \| 'Click' \| 'Focus' \| 'Custom'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  opensOn: 'Focus'
});
```

### isSticky

Gets or sets whether the tooltip is sticky (stays visible).

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let tooltip: Tooltip = new Tooltip({
  isSticky: true
});
```

### openDelay

Gets or sets the delay before showing the tooltip (in ms).

| | |
|---|---|
| **Type** | `number` |
| **Default** | `0` |

```typescript
let tooltip: Tooltip = new Tooltip({
  openDelay: 500
});
```

### closeDelay

Gets or sets the delay before hiding the tooltip (in ms).

| | |
|---|---|
| **Type** | `number` |
| **Default** | `0` |

```typescript
let tooltip: Tooltip = new Tooltip({
  closeDelay: 1000
});
```

### width

Gets or sets the width of the tooltip.

| | |
|---|---|
| **Type** | `number \| string` |
| **Default** | `'auto'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  width: 250  // or '50%'
});
```

### height

Gets or sets the height of the tooltip.

| | |
|---|---|
| **Type** | `number \| string` |
| **Default** | `'auto'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  height: 80
});
```

### animation

Gets or sets the animation settings.

| | |
|---|---|
| **Type** | `TooltipAnimationSettings` |
| **Default** | `{ open: { effect: 'FadeIn', duration: 150 }, close: { effect: 'FadeOut', duration: 150 } }` |

```typescript
let tooltip: Tooltip = new Tooltip({
  animation: {
    open: { effect: 'ZoomIn', duration: 400 },
    close: { effect: 'FadeOut', duration: 300 }
  }
});
```

### cssClass

Gets or sets custom CSS classes.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let tooltip: Tooltip = new Tooltip({
  cssClass: 'custom-tooltip'
});
```

### enableRtl

Gets or sets whether to enable right-to-left layout.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let tooltip: Tooltip = new Tooltip({
  enableRtl: true
});
```

### enablePersistence

Gets or sets whether to enable state persistence.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let tooltip: Tooltip = new Tooltip({
  enablePersistence: true
});
```

### windowCollision

Gets or sets whether to auto-flip on viewport collision.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let tooltip: Tooltip = new Tooltip({
  windowCollision: true
});
```

### locale

Gets or sets the locale for internationalization.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

```typescript
let tooltip: Tooltip = new Tooltip({
  locale: 'fr-FR'
});
```

---

## Methods

### open()

Shows the tooltip.

| | |
|---|---|
| **Returns** | `void` |
| **Parameters** | `element?: HTMLElement` |

```typescript
let tooltip: Tooltip = new Tooltip({
  content: 'Tooltip',
  opensOn: 'Custom'
});
tooltip.appendTo('#target');

tooltip.open();
```

### close()

Hides the tooltip.

| | |
|---|---|
| **Returns** | `void` |

```typescript
tooltip.close();
```

### refresh()

Refreshes the tooltip position and content.

| | |
|---|---|
| **Returns** | `void` |
| **Parameters** | `element?: HTMLElement` |

```typescript
// Refresh current tooltip
tooltip.refresh();

// Refresh specific target
tooltip.refresh(document.getElementById('specific-target'));
```

### dataBind()

Updates the tooltip with property changes.

| | |
|---|---|
| **Returns** | `void` |

```typescript
tooltip.content = 'Updated content';
tooltip.dataBind();
```

### destroy()

Destroys the tooltip component.

| | |
|---|---|
| **Returns** | `void` |

```typescript
tooltip.destroy();
```

---

## Events

### beforeRender

Triggered before the tooltip renders. Use this for dynamic content loading.

| | |
|---|---|
| **Event Args** | `TooltipEventArgs` |

```typescript
let tooltip: Tooltip = new Tooltip({
  content: 'Initial',
  beforeRender: (args: TooltipEventArgs) => {
    // Modify args.content, args.cancel, etc.
    args.content = 'Dynamically set content';
  }
});
```

### beforeOpen

Triggered before the tooltip opens.

| | |
|---|---|
| **Event Args** | `TooltipEventArgs` |

```typescript
let tooltip: Tooltip = new Tooltip({
  beforeOpen: (args: TooltipEventArgs) => {
    console.log('Tooltip about to open');
    if (args.cancel) {
      console.log('Open was cancelled');
    }
  }
});
```

### afterOpen

Triggered after the tooltip opens.

| | |
|---|---|
| **Event Args** | `TooltipEventArgs` |

```typescript
let tooltip: Tooltip = new Tooltip({
  afterOpen: (args: TooltipEventArgs) => {
    console.log('Tooltip opened');
  }
});
```

### beforeClose

Triggered before the tooltip closes.

| | |
|---|---|
| **Event Args** | `TooltipEventArgs` |

```typescript
let tooltip: Tooltip = new Tooltip({
  beforeClose: (args: TooltipEventArgs) => {
    console.log('Tooltip about to close');
  }
});
```

### afterClose

Triggered after the tooltip closes.

| | |
|---|---|
| **Event Args** | `TooltipEventArgs` |

```typescript
let tooltip: Tooltip = new Tooltip({
  afterClose: (args: TooltipEventArgs) => {
    console.log('Tooltip closed');
  }
});
```

### created

Triggered after the component is created.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let tooltip: Tooltip = new Tooltip({
  created: () => {
    console.log('Tooltip created');
  }
});
```

### destroyed

Triggered after the component is destroyed.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let tooltip: Tooltip = new Tooltip({
  destroyed: () => {
    console.log('Tooltip destroyed');
  }
});
```

---

## Interfaces

### TooltipEventArgs

```typescript
interface TooltipEventArgs {
  cancel: boolean;
  content: string | HTMLElement | Function;
  element: HTMLElement;
  event?: Event;
  target?: HTMLElement;
}
```

### TooltipAnimationSettings

```typescript
interface TooltipAnimationSettings {
  open?: AnimationModel;
  close?: AnimationModel;
}

interface AnimationModel {
  effect?: string;
  duration?: number;
  delay?: number;
}
```

### TooltipModel

```typescript
interface TooltipModel {
  content?: string | HTMLElement | Function;
  target?: string | HTMLElement;
  position?: string;
  showTipPointer?: boolean;
  tipPointerPosition?: 'Auto' | 'Start' | 'Middle' | 'End';
  mouseTrail?: boolean;
  offsetX?: number;
  offsetY?: number;
  opensOn?: 'Auto' | 'Hover' | 'Click' | 'Focus' | 'Custom';
  isSticky?: boolean;
  openDelay?: number;
  closeDelay?: number;
  width?: number | string;
  height?: number | string;
  animation?: TooltipAnimationSettings;
  cssClass?: string;
  enableRtl?: boolean;
  enablePersistence?: boolean;
  windowCollision?: boolean;
  locale?: string;
  beforeRender?: (args: TooltipEventArgs) => void;
  beforeOpen?: (args: TooltipEventArgs) => void;
  afterOpen?: (args: TooltipEventArgs) => void;
  beforeClose?: (args: TooltipEventArgs) => void;
  afterClose?: (args: TooltipEventArgs) => void;
  created?: () => void;
  destroyed?: () => void;
}
```

---

## Enumerations

### Position Values

| Value | Description |
|-------|-------------|
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

### TipPointerPosition

| Value | Description |
|-------|-------------|
| `Auto` | Auto-positioned (default) |
| `Start` | Aligned to start |
| `Middle` | Centered |
| `End` | Aligned to end |

### OpenMode

| Value | Description |
|-------|-------------|
| `Auto` | Auto-detect (default) |
| `Hover` | Mouse hover |
| `Click` | Click/tap |
| `Focus` | Element focus |
| `Custom` | Programmatic only |

---

## Complete Example

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import './styles.css';

let tooltip: Tooltip = new Tooltip({
  content: 'Complete tooltip example',
  target: '#target',
  position: 'TopCenter',
  showTipPointer: true,
  tipPointerPosition: 'Auto',
  mouseTrail: false,
  offsetX: 0,
  offsetY: 5,
  opensOn: 'Auto',
  isSticky: false,
  openDelay: 0,
  closeDelay: 0,
  width: 'auto',
  height: 'auto',
  animation: {
    open: { effect: 'FadeIn', duration: 400, delay: 0 },
    close: { effect: 'FadeOut', duration: 300, delay: 0 }
  },
  cssClass: 'custom-tooltip',
  enableRtl: false,
  enablePersistence: false,
  windowCollision: true,
  locale: 'en-US',
  beforeRender: (args) => {
    console.log('Rendering');
  },
  beforeOpen: (args) => {
    console.log('Opening');
  },
  afterOpen: (args) => {
    console.log('Opened');
  },
  beforeClose: (args) => {
    console.log('Closing');
  },
  afterClose: (args) => {
    console.log('Closed');
  },
  created: () => {
    console.log('Created');
  }
});
tooltip.appendTo('#target');

// Programmatic control
// tooltip.open();
// tooltip.close();
// tooltip.refresh();
// tooltip.destroy();
```

---

## See Also

- [tooltip-getting-started.md](./tooltip-getting-started.md) - Setup and installation
- [tooltip-content.md](./tooltip-content.md) - Content strategies
- [tooltip-position.md](./tooltip-position.md) - Positioning
- [tooltip-open-mode.md](./tooltip-open-mode.md) - Open modes
- [tooltip-animation.md](./tooltip-animation.md) - Animation effects
- [tooltip-customization.md](./tooltip-customization.md) - CSS customization
- [tooltip-how-to.md](./tooltip-how-to.md) - Common patterns
- [tooltip-accessibility.md](./tooltip-accessibility.md) - Accessibility guidelines
