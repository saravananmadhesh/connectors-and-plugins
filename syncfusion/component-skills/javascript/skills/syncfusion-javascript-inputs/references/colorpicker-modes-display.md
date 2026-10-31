# Modes and Display – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [Picker Mode](#picker-mode)
2. [Palette Mode](#palette-mode)
3. [Mode Switcher](#mode-switcher)
4. [Inline Rendering](#inline-rendering)
5. [Popup on Click (createPopupOnClick)](#popup-on-click-createpopuponclick)
6. [Show/Hide Apply and Cancel Buttons](#showhide-apply-and-cancel-buttons)
7. [Show Recent Colors](#show-recent-colors)
8. [Disabling the Component](#disabling-the-component)
9. [Dynamic Mode Switching](#dynamic-mode-switching)

---

## Picker Mode

The default mode. Renders an HSV gradient area (the color box), hue slider, and opacity slider.

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Picker',
  value: '#e91e63ff'
});
colorPicker.appendTo('#color-picker');
```

**Interaction:**
- Drag the handler inside the gradient area to adjust saturation and value
- Drag the hue slider to change the hue
- Drag the opacity slider to change alpha
- Type directly into the HEX, RGB, or HSV inputs

---

## Palette Mode

Renders a grid of color tiles (default: 100 colors in 10 columns).

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  value: '#9c27b0ff'
});
colorPicker.appendTo('#color-picker');
```

**Interaction:**
- Click a tile to select it
- Arrow keys navigate between tiles
- Enter confirms the selection

---

## Mode Switcher

When both modes are available, the mode switcher button (shown by default) lets users toggle between Picker and Palette. It appears at the bottom of the popup.

```typescript
// Hide mode switcher — lock the user to one mode
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false
});
colorPicker.appendTo('#color-picker');
```

```typescript
// Show mode switcher (default behavior)
const colorPicker: ColorPicker = new ColorPicker({
  modeSwitcher: true    // This is the default; can be omitted
});
colorPicker.appendTo('#color-picker');
```

**Note:** Even with `modeSwitcher: true`, you can control the starting mode with the `mode` property. The switcher only toggles from the initial mode.

---

## Inline Rendering

Renders the ColorPicker directly on the page without a popup. Useful for toolbars, settings pages, and editors.

```typescript
// Inline palette — no popup, no Apply button
const colorPicker: ColorPicker = new ColorPicker({
  inline: true,
  mode: 'Palette',
  showButtons: false
});
colorPicker.appendTo('#color-picker');
```

```typescript
// Inline picker with Apply/Cancel
const colorPicker: ColorPicker = new ColorPicker({
  inline: true,
  mode: 'Picker',
  showButtons: true
});
colorPicker.appendTo('#color-picker');
```

**Key difference from popup mode:**
- No SplitButton is rendered
- The component is always visible
- The `beforeOpen`, `open`, `beforeClose` events do not fire in inline mode

---

## Popup on Click (createPopupOnClick)

By default (`createPopupOnClick: false`), the popup container is created when the component initializes. Setting `createPopupOnClick: true` defers popup creation until the first open, improving initial render time when many pickers exist on a page.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  createPopupOnClick: true    // Popup DOM created only on first open
});
colorPicker.appendTo('#color-picker');
```

**Use case:** Pages with many ColorPicker instances where reducing initial DOM size matters.

---

## Show/Hide Apply and Cancel Buttons

### `showButtons: true` (default)
The user must click **Apply** to confirm the selection. The `change` event fires on Apply. The `select` event fires during intermediate selection.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  showButtons: true    // Default — explicit Apply required
});
colorPicker.appendTo('#color-picker');
```

### `showButtons: false`
Every color interaction immediately fires the `change` event. No Apply/Cancel buttons rendered.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  showButtons: false,   // Immediate selection — no confirmation needed
  change: (args) => {
    document.body.style.backgroundColor = args.currentValue.rgba;
  }
});
colorPicker.appendTo('#color-picker');
```

**Decision guide:**
- Use `showButtons: true` when the color change has a significant effect (e.g., saving to a database)
- Use `showButtons: false` for live preview scenarios (e.g., real-time background color updates)

---

## Show Recent Colors

In palette mode, the `showRecentColors` property displays a row of recently used colors above the palette tiles. This is useful for quick re-use of previously selected colors.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  showRecentColors: true    // Shows recent colors strip (palette mode only)
});
colorPicker.appendTo('#color-picker');
```

**Notes:**
- Only works in palette mode (`mode: 'Palette'`)
- Automatically tracks up to 10 recent colors
- Duplicates are filtered out

---

## Disabling the Component

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  disabled: true    // Popup won't open; component is non-interactive
});
colorPicker.appendTo('#color-picker');
```

Re-enable programmatically:

```typescript
colorPicker.disabled = false;
colorPicker.dataBind();
```

---

## Dynamic Mode Switching

Switch modes programmatically by setting the `mode` property and calling `dataBind()`:

```typescript
// Switch to palette mode dynamically
colorPicker.mode = 'Palette';
colorPicker.dataBind();

// Switch back to picker mode
colorPicker.mode = 'Picker';
colorPicker.dataBind();
```

Listen for mode switch events:

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  beforeModeSwitch: (args) => {
    console.log('Switching to:', args.mode);    // 'Picker' or 'Palette'
  },
  onModeSwitch: (args) => {
    console.log('Switched to:', args.mode);
  }
});
colorPicker.appendTo('#color-picker');
```
