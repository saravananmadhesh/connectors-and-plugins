# Tooltip Customization & Style

## Table of Contents
- [cssClass Property](#cssclass-property)
- [CSS Class Reference](#css-class-reference)
- [Tip Pointer Customization](#tip-pointer-customization)
- [Full Tooltip Appearance](#full-tooltip-appearance)
- [Fancy Tips: Curved and Bubble](#fancy-tips-curved-and-bubble)
- [Tooltip on SVG and Canvas Elements](#tooltip-on-svg-and-canvas-elements)
- [Tooltip on Disabled Elements](#tooltip-on-disabled-elements)
- [Container Property](#container-property)
- [htmlAttributes Property](#htmlattributes-property)
- [RTL Support](#rtl-support)

---

## cssClass Property

The `cssClass` property adds a custom CSS class to the tooltip element. Use this to scope all your custom styles without affecting other tooltips:

```html
<ejs-tooltip content="Styled tooltip" cssClass="my-custom-tip">
  <button>Hover me</button>
</ejs-tooltip>
```

```css
/* Scoped to your custom class */
.my-custom-tip.e-tooltip-wrap {
  border-radius: 8px;
}
.my-custom-tip .e-tip-content {
  color: #fff;
  background: #333;
  font-size: 13px;
}
```

---

## CSS Class Reference

These are the stable CSS classes used by the tooltip component:

| Class | Targets |
|---|---|
| `.e-tooltip-wrap` | Root tooltip container element |
| `.e-tooltip-wrap.e-popup` | Popup overlay |
| `.e-tip-content` | Content area inside the tooltip |
| `.e-arrow-tip` | The tip pointer arrow container |
| `.e-arrow-tip.e-tip-top` | Arrow when tooltip is below target (pointing up) |
| `.e-arrow-tip.e-tip-bottom` | Arrow when tooltip is above target (pointing down) |
| `.e-arrow-tip.e-tip-left` | Arrow when tooltip is to the right of target |
| `.e-arrow-tip.e-tip-right` | Arrow when tooltip is to the left of target |
| `.e-arrow-tip-inner` | Inner part of the tip arrow |
| `.e-arrow-tip-outer` | Outer part of the tip arrow (border) |

---

## Tip Pointer Customization

Override the arrow tip's size and border colors:

```css
/* Customize tip size for all positions */
.e-tooltip-wrap .e-arrow-tip.e-tip-bottom {
  height: 12px;
  width: 24px;
}
.e-tooltip-wrap .e-arrow-tip.e-tip-top {
  height: 12px;
  width: 24px;
}
.e-tooltip-wrap .e-arrow-tip.e-tip-left {
  height: 24px;
  width: 12px;
}
.e-tooltip-wrap .e-arrow-tip.e-tip-right {
  height: 24px;
  width: 12px;
}
```

**Color the outer tip border:**
```css
.e-tooltip-wrap .e-arrow-tip-outer.e-tip-bottom {
  border-left: 12px solid transparent;
  border-right: 14px solid transparent;
  border-top: 12px solid #e53935;   /* red border */
}
.e-tooltip-wrap .e-arrow-tip-outer.e-tip-top {
  border-bottom: 12px solid #e53935;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}
```

**Color the inner tip fill:**
```css
.e-tooltip-wrap .e-arrow-tip-inner.e-tip-bottom,
.e-tooltip-wrap .e-arrow-tip-inner.e-tip-top {
  color: #e53935;
  font-size: 25.9px;
}
```

---

## Full Tooltip Appearance

Customize the complete tooltip look — background, border, opacity, font:

```css
/* Container */
.e-tooltip-wrap {
  border-radius: 4px;
  opacity: 1;
}

/* Popup background and border */
.e-tooltip-wrap.e-popup {
  background-color: #1a1a2e;
  border: 2px solid #e94560;
}

/* Content text */
.e-tooltip-wrap .e-tip-content {
  color: #eaeaea;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.5;
  padding: 8px 12px;
}
```

To scope styles to a specific tooltip, prefix with your `cssClass`:
```css
.dark-theme.e-tooltip-wrap.e-popup {
  background-color: #111;
  border: 1px solid #555;
}
.dark-theme .e-tip-content {
  color: #fff;
}
```
```html
<ejs-tooltip content="Dark themed" cssClass="dark-theme">
  <button>Dark tip</button>
</ejs-tooltip>
```

---

## Fancy Tips: Curved and Bubble

### Curved Tip

Override the standard triangular arrow with a curved shape:

```css
.curved-tip .e-arrow-tip-outer.e-tip-bottom,
.curved-tip .e-arrow-tip-outer.e-tip-top {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
}
.curved-tip .e-arrow-tip.e-tip-top {
  transform: rotate(170deg);
}
```

### Bubble Tip

Replace the triangular arrow with a circular bubble:

```css
.bubble-tip .e-arrow-tip-outer.e-tip-bottom,
.bubble-tip .e-arrow-tip-outer.e-tip-top {
  border-radius: 50px;
  height: 10px;
  width: 10px;
}
.bubble-tip .e-arrow-tip-inner.e-tip-bottom,
.bubble-tip .e-arrow-tip-inner.e-tip-top {
  border-radius: 50px;
  height: 10px;
  width: 10px;
}
```

```html
<ejs-tooltip content="Bubble tip!" cssClass="bubble-tip">
  <button>Bubble</button>
</ejs-tooltip>
```

---

## Tooltip on SVG and Canvas Elements

The tooltip works on SVG and canvas elements by targeting their IDs:

**SVG:**
```html
<ejs-tooltip cssClass="e-tooltip-css" content="SVG Square" target="#square">
  <svg width="150" height="100">
    <rect
      id="square"
      x="50" y="20" width="50" height="50"
      style="fill:#FDA600; stroke:none;">
    </rect>
  </svg>
</ejs-tooltip>
```

**Canvas:**
```typescript
import { Component, ViewChild, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip cssClass="e-tooltip-css" content="Canvas Circle" target="#circle">
      <canvas #circle id="circle" width="60" height="60"></canvas>
    </ejs-tooltip>
  `
})
export class App implements AfterViewInit {
  @ViewChild('circle') canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(30, 30, 28, 0, 2 * Math.PI);
      ctx.fillStyle = '#4CAF50';
      ctx.fill();
    }
  }
}
```

---

## Tooltip on Disabled Elements

Disabled HTML elements (e.g., `<button disabled>`) do not fire mouse events, so tooltips don't trigger on them by default. Work around this by wrapping:

1. Wrap the disabled element in a `<div>` with `display: inline-block`
2. Apply `pointer-events: none` to the disabled element via CSS
3. Attach the tooltip to the wrapper `<div>`

```typescript
@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .disabled-wrapper { display: inline-block; cursor: not-allowed; }
    .disabled-wrapper button[disabled] { pointer-events: none; }
  `],
  template: `
    <ejs-tooltip content="This action is currently unavailable.">
      <div class="disabled-wrapper">
        <button disabled>Disabled Action</button>
      </div>
    </ejs-tooltip>
  `
})
export class App {}
```

---

## Container Property

By default, the tooltip popup appends to `<body>`. Change this with the `container` property:

```html
<!-- Append tooltip to a specific element by ID -->
<ejs-tooltip content="Contained tooltip" container="#my-modal">
  <button>In a modal</button>
</ejs-tooltip>

<div id="my-modal" style="position:relative; overflow:hidden;"><!-- modal content --></div>
```

```typescript
// Or pass an HTMLElement reference
public containerEl: HTMLElement = document.getElementById('my-modal')!;
```

> Use `container` when the tooltip must appear within a scrollable or overflow-hidden parent (such as modals or sidebars).

---

## htmlAttributes Property

Add arbitrary HTML attributes to the tooltip popup element:

```typescript
public tooltipAttrs: { [key: string]: string } = {
  'tabindex': '0',
  'data-testid': 'info-tooltip',
  'aria-label': 'Additional information'
};
```
```html
<ejs-tooltip content="Attributed tooltip" [htmlAttributes]="tooltipAttrs">
  <button>Hover me</button>
</ejs-tooltip>
```

---

## RTL Support

Render the tooltip in right-to-left direction with `enableRtl`:

```html
<ejs-tooltip content="نص تلميح" [enableRtl]="true" position="BottomCenter">
  <button>RTL tooltip</button>
</ejs-tooltip>
```

---

## See Also

- [Content](./content.md) — HTML and template content
- [Position & Dimensions](./position-and-dimension.md) — Tip pointer position
- [Accessibility](./accessibility.md) — ARIA attributes, keyboard support
- [API Reference](./api.md) — `cssClass`, `container`, `htmlAttributes`, `enableRtl`, `showTipPointer`
