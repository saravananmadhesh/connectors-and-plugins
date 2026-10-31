# Getting Started – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [Installation](#installation)
2. [Required CSS Imports](#required-css-imports)
3. [HTML Setup](#html-setup)
4. [Basic Initialization](#basic-initialization)
5. [Picker Mode vs. Palette Mode](#picker-mode-vs-palette-mode)
6. [Inline Rendering](#inline-rendering)
7. [Pre-setting a Color Value](#pre-setting-a-color-value)
8. [Lifecycle: created Event](#lifecycle-created-event)
9. [Gotchas](#gotchas)

---

## Installation

The ColorPicker is part of the `@syncfusion/ej2-inputs` package:

```bash
npm install @syncfusion/ej2-inputs
```

The package includes all required peer dependencies (base, buttons, popups, splitbuttons, etc.).

---

## Required CSS Imports

Import CSS in the correct order. Missing or misordered imports cause broken layouts:

```typescript
// In your main TypeScript/index file or global stylesheet:
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/color-picker/index.css";
```

Replace `material` with your chosen theme: `bootstrap5`, `tailwind`, `fluent`, `highcontrast`, etc.

---

## HTML Setup

The ColorPicker renders on an `<input type="color">` element:

```html
<!-- Required: type="color" -->
<input type="color" id="color-picker" />
```

The component wraps the input with its own generated markup. The input element is retained in the DOM for form compatibility.

---

## Basic Initialization

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

// Minimal — opens a popup with the picker (default mode)
const colorPicker: ColorPicker = new ColorPicker(
  { value: '#008000ff' },
  '#color-picker'
);
```

Alternatively use `appendTo`:

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({ value: '#008000ff' });
colorPicker.appendTo('#color-picker');
```

Both forms are equivalent. The second is useful when the element reference is obtained dynamically.

---

## Picker Mode vs. Palette Mode

The `mode` property controls the default rendering mode.

### Picker Mode (default: `'Picker'`)

Renders an HSV gradient area with hue and opacity sliders. Allows fine-grained color selection.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Picker',    // Default, so this can be omitted
  value: '#ff5733ff'
});
colorPicker.appendTo('#color-picker');
```

### Palette Mode (`'Palette'`)

Renders a grid of color tiles. Faster for selecting from a defined set of colors.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  value: '#2196f3ff'
});
colorPicker.appendTo('#color-picker');
```

### Mode Switcher Button

By default (`modeSwitcher: true`), a button is shown inside the popup that lets the user switch between Picker and Palette. To hide it:

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false    // Lock to palette — no toggle button
});
colorPicker.appendTo('#color-picker');
```

---

## Inline Rendering

By default, the ColorPicker renders as a SplitButton that opens a popup. Set `inline: true` to render the picker/palette directly on the page without a popup:

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  inline: true,
  mode: 'Palette',
  showButtons: false    // Optional: remove Apply/Cancel for immediate selection
});
colorPicker.appendTo('#color-picker');
```

**Use case:** Color swatches in toolbars, settings panels, or design tools where constant visibility is required.

---

## Pre-setting a Color Value

The `value` property accepts a HEX8 string (`#rrggbbaa`). The alpha channel (`aa`) controls opacity:

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  value: '#ff573380'    // Red at 50% opacity
});
colorPicker.appendTo('#color-picker');
```

Shorter formats are also accepted and internally normalized to HEX8:
- `#rgb` → expanded to 8-character HEX
- `#rrggbb` → `ff` appended for full opacity

**Default value:** `'#008000ff'` (green, fully opaque).

---

## Lifecycle: created Event

The `created` event fires once the component has fully rendered. Use it to perform post-render operations:

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  value: '#3f51b5ff',
  created: () => {
    console.log('ColorPicker initialized. Current value:', colorPicker.value);
    // Apply initial preview color to another element
    const preview = document.getElementById('color-preview') as HTMLElement;
    if (preview) {
      preview.style.backgroundColor = colorPicker.getValue(colorPicker.value, 'rgba');
    }
  }
});
colorPicker.appendTo('#color-picker');
```

---

## Gotchas

| Issue | Cause | Fix |
|---|---|---|
| Popup not opening | `disabled: true` | Set `disabled: false` |
| Color shows as green | No `value` provided | Set `value` explicitly |
| Opacity slider missing | `enableOpacity: false` | Set `enableOpacity: true` (default) |
| Apply button missing | `showButtons: false` | Set `showButtons: true` (default) |
| Mode switcher not visible | `modeSwitcher: false` | Set `modeSwitcher: true` (default) |
| Inline not rendering popup | `inline: true` bypasses popup | Expected behavior; picker renders in-place |
| CSS broken | Wrong import order | Follow the 5-package CSS import order above |
