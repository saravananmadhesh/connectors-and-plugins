# Tooltip Customization

The Syncfusion TypeScript Tooltip supports extensive customization for CSS classes, tip pointer appearance, dimensions, and RTL support.

## Table of Contents
- [Custom CSS Classes](#custom-css-classes)
- [Tip Pointer Customization](#tip-pointer-customization)
- [Background and Text Styling](#background-and-text-styling)
- [Dimension Control](#dimension-control)
- [RTL Support](#rtl-support)
- [Custom Themes](#custom-themes)

---

## Custom CSS Classes

Apply custom CSS for theming and styling:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Custom styled tooltip',
  cssClass: 'custom-tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

```css
.custom-tooltip .e-tip-content {
  background-color: #2c3e50;
  color: #ffffff;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
}

.custom-tooltip .e-arrow-tip-inner,
.custom-tooltip .e-arrow-tip-outer {
  background-color: #2c3e50;
}
```

---

## Tip Pointer Customization

### Hide Tip Pointer

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'No tip pointer',
  showTipPointer: false
});
tooltip.appendTo('#target');
```

### Custom Tip Pointer Size

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Custom tip pointer',
  showTipPointer: true,
  cssClass: 'large-tip'
});
tooltip.appendTo('#target');
```

```css
.large-tip .e-arrow-tip-inner,
.large-tip .e-arrow-tip-outer {
  width: 16px;
  height: 16px;
}
```

### Curved Tip Pointer

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Curved tip',
  showTipPointer: true,
  cssClass: 'curved-tip-tooltip'
});
tooltip.appendTo('#target');
```

```css
.curved-tip-tooltip .e-arrow-tip-inner,
.curved-tip-tooltip .e-arrow-tip-outer {
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
```

### Bubble Tip Arrow

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Bubble tip',
  showTipPointer: true,
  cssClass: 'bubble-tip'
});
tooltip.appendTo('#target');
```

```css
.bubble-tip .e-arrow-tip-outer {
  border: 2px solid #3498db;
  background-color: transparent;
}

.bubble-tip .e-arrow-tip-inner {
  background-color: #ffffff;
}
```

---

## Background and Text Styling

### Custom Background

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Gradient background',
  cssClass: 'gradient-tooltip'
});
tooltip.appendTo('#target');
```

```css
.gradient-tooltip .e-tip-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}
```

### Custom Font

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Custom font',
  cssClass: 'custom-font-tooltip'
});
tooltip.appendTo('#target');
```

```css
.custom-font-tooltip .e-tip-content {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
}
```

### Opacity

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Semi-transparent',
  cssClass: 'transparent-tooltip'
});
tooltip.appendTo('#target');
```

```css
.transparent-tooltip .e-tip-content {
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.95;
}
```

---

## Dimension Control

Set custom width and height:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Fixed dimensions
let fixedSize: Tooltip = new Tooltip({
  content: 'Fixed size tooltip',
  width: 200,
  height: 80
});
fixedSize.appendTo('#target');

// Auto width, fixed height
let autoWidth: Tooltip = new Tooltip({
  content: 'Auto width, fixed height',
  width: 'auto',
  height: 60
});
autoWidth.appendTo('#target');

// Percentage width
let percentWidth: Tooltip = new Tooltip({
  content: '50% width',
  width: '50%'
});
percentWidth.appendTo('#target');
```

---

## RTL Support

Enable right-to-left layout:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'RTL tooltip',
  enableRtl: true,
  position: 'LeftCenter'
});
tooltip.appendTo('#target');
```

**Use Cases:**
- Arabic, Hebrew, Persian languages
- Right-to-left reading languages
- Internationalization support

---

## Scroll Mode

Control tooltip behavior during scrolling:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Reposition on scroll (default)
let reposition: Tooltip = new Tooltip({
  content: 'Repositions on scroll'
});
reposition.appendTo('#target');
```

The tooltip automatically repositions when the page scrolls, keeping it aligned with its target element.

---

## Custom Themes

### Dark Theme

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Dark theme tooltip',
  cssClass: 'dark-tooltip'
});
tooltip.appendTo('#target');
```

```css
.dark-tooltip .e-tip-content {
  background-color: #1a1a1a;
  color: #e0e0e0;
  border: 1px solid #444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-tooltip .e-arrow-tip-inner,
.dark-tooltip .e-arrow-tip-outer {
  background-color: #1a1a1a;
}
```

### Light Theme

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Light theme tooltip',
  cssClass: 'light-tooltip'
});
tooltip.appendTo('#target');
```

```css
.light-tooltip .e-tip-content {
  background-color: #ffffff;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Material Theme

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Material theme',
  cssClass: 'material-tooltip'
});
tooltip.appendTo('#target');
```

```css
.material-tooltip .e-tip-content {
  background-color: #212121;
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  padding: 6px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## Complete Customization Example

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Fully customized tooltip',
  position: 'TopCenter',
  showTipPointer: true,
  tipPointerPosition: 'Auto',
  width: 250,
  height: 'auto',
  cssClass: 'premium-tooltip',
  enableRtl: false,
  animation: {
    open: { effect: 'ZoomIn', duration: 300 },
    close: { effect: 'FadeOut', duration: 200 }
  }
});
tooltip.appendTo('#target');
```

```css
.premium-tooltip .e-tip-content {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(245, 87, 108, 0.3);
}

.premium-tooltip .e-arrow-tip-inner,
.premium-tooltip .e-arrow-tip-outer {
  background: #f5576c;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `''` | Custom CSS class |
| `width` | `number \| string` | `'auto'` | Tooltip width |
| `height` | `number \| string` | `'auto'` | Tooltip height |
| `enableRtl` | `boolean` | `false` | Enable RTL layout |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
