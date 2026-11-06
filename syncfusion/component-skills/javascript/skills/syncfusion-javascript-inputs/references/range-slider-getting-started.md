# Getting Started — Syncfusion TypeScript Range Slider

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [HTML Setup](#html-setup)
- [Basic Initialization](#basic-initialization)
- [Setting Value, Min, and Max](#setting-value-min-and-max)
- [Orientation](#orientation)
- [Show Buttons](#show-buttons)
- [Troubleshooting](#troubleshooting)

---

## Dependencies

The Range Slider requires these packages from `@syncfusion/ej2-inputs`:

```
@syncfusion/ej2-inputs
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-popups
  └── @syncfusion/ej2-buttons
```

---

## Installation

Install via npm:

```bash
npm install @syncfusion/ej2-inputs
```

Or clone the quickstart project:

```bash
git clone https://github.com/syncfusion/ej2-quickstart.git quickstart
cd quickstart
npm install
npm start
```

---

## CSS Imports

Import all required theme CSS files (example uses Material theme):

```css
/* In your styles.css or index.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/slider/index.css";
```

> Popups CSS is required for tooltip rendering. Buttons CSS is required for increment/decrement buttons.

---

## HTML Setup

Add a container `<div>` element where the slider will render:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Range Slider</title>
    <meta charset="utf-8" />
    <link href="styles/index.css" rel="stylesheet" />
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="system.config.js"></script>
</head>
<body>
    <div class="wrap">
        <div id="slider"></div>
    </div>
</body>
</html>
```

Recommended container style:

```css
.wrap {
    height: 260px;
    margin: 0 auto;
    padding: 30px 10px;
    width: 260px;
}
```

---

## Basic Initialization

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

// Minimal slider with default value
let slider: Slider = new Slider({ value: 30 });
slider.appendTo('#slider');
```

The slider renders a default horizontal slider from 0 to 100, with the thumb positioned at value 30.

---

## Setting Value, Min, and Max

Configure the slider's range and initial position:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 100,
    max: 1000,
    value: 400,
    step: 50,
    ticks: { placement: 'After', largeStep: 200, smallStep: 100, showSmallTicks: true },
    tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' }
});
slider.appendTo('#slider');
```

- `min` — minimum value (default: 0)
- `max` — maximum value (default: 100)
- `value` — initial value; use a number for single-handle, array `[start, end]` for range
- `step` — increment/decrement step on each drag or key press (default: 1)

---

## Orientation

The slider renders **horizontal** by default. Switch to vertical using the `orientation` property:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    orientation: 'Vertical',
    value: 30
});
slider.appendTo('#slider');
```

Valid values: `'Horizontal'` (default) | `'Vertical'`

> When using vertical orientation, ensure the container element has sufficient height.

---

## Show Buttons

Enable increment/decrement buttons on either side of the slider:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    showButtons: true,
    tooltip: { isVisible: true, placement: 'After', showOn: 'Always' }
});
slider.appendTo('#slider');
```

- In a Range Slider, clicking buttons changes the first handle by default.
- Focus a handle first, then click to change that handle's value.
- After enabling buttons, pressing `Tab` moves focus to the handle, not the button.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Slider renders without styling | Ensure all CSS imports are included (base, inputs, popups, buttons) |
| Tooltip not visible | Add `tooltip: { isVisible: true }` and import popups CSS |
| Slider thumb at wrong position | Check that `value` is within `min`–`max` range |
| Vertical slider too small | Set explicit height on the container element |
| Buttons not rendering | Add `showButtons: true` and import buttons CSS |
