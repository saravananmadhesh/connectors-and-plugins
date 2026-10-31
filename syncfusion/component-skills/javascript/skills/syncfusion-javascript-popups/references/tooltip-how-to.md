# Tooltip How-To Patterns

Common patterns and solutions for the Syncfusion TypeScript Tooltip component.

## Table of Contents
- [Tooltip on Multiple Targets with Dynamic Content](#tooltip-on-multiple-targets-with-dynamic-content)
- [Tooltip on Disabled Elements](#tooltip-on-disabled-elements)
- [Enable/Disable Tooltip](#enabledisable-tooltip)
- [Tooltip on SVG and Canvas](#tooltip-on-svg-and-canvas)
- [Embed Iframes in Tooltip](#embed-iframes-in-tooltip)
- [Custom Open Modes](#custom-open-modes)
- [Tooltip with Form Validation](#tooltip-with-form-validation)

---

## Tooltip on Multiple Targets with Dynamic Content

Apply a single Tooltip to multiple elements with content from each element's `title` attribute or data attribute:

```typescript
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '.dynamic-tooltip',
  position: 'TopCenter',
  beforeRender: (args: TooltipEventArgs) => {
    const target: HTMLElement = args.target as HTMLElement;
    // Use data attribute for custom content
    const customContent: string = target.getAttribute('data-tooltip') || target.title;
    args.content = customContent;
  }
});
tooltip.appendTo('#container');
```

**HTML:**

```html
<div id="container">
  <button class="dynamic-tooltip" data-tooltip="Save your work" title="Save">Save</button>
  <button class="dynamic-tooltip" data-tooltip="Discard changes" title="Discard">Discard</button>
  <button class="dynamic-tooltip" data-tooltip="Export data" title="Export">Export</button>
</div>
```

---

## Tooltip on Disabled Elements

Disabled elements don't trigger hover events. Wrap them in a container:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'This feature is currently disabled',
  position: 'TopCenter'
});
tooltip.appendTo('#disabled-wrapper');
```

**HTML:**

```html
<!-- Wrap disabled element in a span -->
<span id="disabled-wrapper" style="display: inline-block;">
  <button class="e-btn" disabled>Disabled Button</button>
</span>
```

**Alternative with data attribute:**

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '[data-tooltip-target]',
  position: 'TopCenter'
});
tooltip.appendTo('#form-container');
```

**HTML:**

```html
<div id="form-container">
  <span data-tooltip-target data-tooltip="This field is disabled">
    <input type="text" disabled />
  </span>
</div>
```

---

## Enable/Disable Tooltip

Dynamically enable or disable a tooltip using `destroy()` and `render()`:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let tooltip: Tooltip = new Tooltip({
  content: 'Toggleable tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

let toggleBtn: Button = new Button({
  content: 'Disable Tooltip',
  isToggle: true,
  click: (args: any) => {
    if (args.element.classList.contains('e-active')) {
      // Disable: destroy tooltip
      tooltip.destroy();
      (args.element.querySelector('.e-btn-content') as HTMLElement).textContent = 'Enable Tooltip';
    } else {
      // Enable: recreate tooltip
      tooltip = new Tooltip({
        content: 'Toggleable tooltip',
        position: 'TopCenter'
      });
      tooltip.appendTo('#target');
      (args.element.querySelector('.e-btn-content') as HTMLElement).textContent = 'Disable Tooltip';
    }
  }
});
toggleBtn.appendTo('#toggle-btn');
```

---

## Tooltip on SVG and Canvas

Display tooltips on SVG elements:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'SVG element tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#svg-circle');
```

**HTML:**

```html
<svg width="200" height="200">
  <circle id="svg-circle" cx="100" cy="100" r="50" fill="#3498db" />
</svg>
```

**Canvas:**

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Canvas element tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#my-canvas');
```

```typescript
// Setup canvas
const canvas: HTMLCanvasElement = document.getElementById('my-canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
ctx.fillStyle = '#e74c3c';
ctx.fillRect(50, 50, 100, 100);
```

---

## Embed Iframes in Tooltip

Embed external content using iframes:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: '<iframe src="https://example.com" width="300" height="200" frameborder="0"></iframe>',
  position: 'RightCenter',
  width: 320,
  height: 220
});
tooltip.appendTo('#iframe-trigger');
```

### Embed Video

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: `
    <video width="300" height="200" controls>
      <source src="video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `,
  position: 'TopCenter',
  width: 320,
  height: 220
});
tooltip.appendTo('#video-trigger');
```

---

## Custom Open Modes

### Double-Click to Open

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let tooltip: Tooltip = new Tooltip({
  content: 'Double-clicked tooltip',
  opensOn: 'Custom',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

let targetBtn: Button = new Button({
  content: 'Double-click me',
  click: (e: MouseEvent) => {
    if (e.detail === 2) {
      tooltip.open();
    }
  }
});
targetBtn.appendTo('#target');
```

### Right-Click to Open

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Right-clicked tooltip',
  opensOn: 'Custom',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

document.getElementById('target')!.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
  tooltip.open();
});
```

---

## Tooltip with Form Validation

Show validation errors via tooltip:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;

let emailTooltip: Tooltip = new Tooltip({
  content: 'Please enter a valid email address',
  position: 'RightCenter',
  opensOn: 'Custom',
  cssClass: 'error-tooltip'
});
emailTooltip.appendTo('#email');

emailInput.addEventListener('blur', () => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    emailTooltip.open();
  } else {
    emailTooltip.close();
  }
});
```

```css
.error-tooltip .e-tip-content {
  background-color: #e74c3c;
  color: white;
}
```

---

## Tooltip on Table Cells

Add tooltips to table cells with truncated content:

```typescript
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: 'td.cell-tooltip',
  position: 'TopCenter',
  beforeRender: (args: TooltipEventArgs) => {
    const cell: HTMLElement = args.target as HTMLElement;
    // Show full text if cell content is truncated
    if (cell.scrollWidth > cell.clientWidth) {
      args.content = cell.textContent || '';
    } else {
      args.cancel = true; // Don't show tooltip if content fits
    }
  }
});
tooltip.appendTo('#data-table');
```

**HTML:**

```html
<table id="data-table" style="table-layout: fixed; width: 100%;">
  <tr>
    <td class="cell-tooltip" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
      This is a very long text that might be truncated
    </td>
  </tr>
</table>
```

---

## Programmatic Refresh

Refresh tooltip content and position:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Initial content',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

// Update content and refresh
function updateTooltip(newContent: string): void {
  tooltip.content = newContent;
  tooltip.dataBind();
  tooltip.refresh(); // Reposition and re-render
}
```

---

## API Reference

For complete API details, see [tooltip-api.md](./tooltip-api.md).
