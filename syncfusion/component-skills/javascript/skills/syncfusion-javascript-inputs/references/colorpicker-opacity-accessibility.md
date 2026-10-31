# Opacity, Accessibility and Customization – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [Opacity Control (enableOpacity)](#opacity-control-enableopacity)
2. [Right-to-Left Layout (enableRtl)](#right-to-left-layout-enablertl)
3. [Disabled State](#disabled-state)
4. [State Persistence (enablePersistence)](#state-persistence-enablepersistence)
5. [CSS Class Customization (cssClass)](#css-class-customization-cssclass)
6. [Keyboard Navigation](#keyboard-navigation)
7. [focusIn Method](#focusin-method)

---

## Opacity Control (enableOpacity)

Enabled by default. Controls whether the opacity slider and alpha channel inputs are shown.

### With opacity (default)

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  enableOpacity: true,    // Default
  value: '#2196f3cc'      // Blue at ~80% opacity
});
colorPicker.appendTo('#color-picker');
```

When `enableOpacity: true`:
- An opacity slider renders alongside the hue slider (picker mode)
- The alpha value is stored in the last two characters of the HEX8 value
- `args.currentValue.rgba` includes the alpha component (e.g., `rgba(33,150,243,0.8)`)

### Without opacity

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enableOpacity: false,   // Hides opacity slider; all colors fully opaque
  value: '#2196f3'        // HEX6 accepted; 'ff' appended internally
});
colorPicker.appendTo('#color-picker');
```

When `enableOpacity: false`:
- Opacity slider is hidden
- `colorPicker.value` stores only HEX6 (e.g., `'#2196f3'`)
- `args.currentValue.hex` in events is HEX6
- Use this when transparency is not needed to simplify the UI

### Toggle opacity dynamically

```typescript
// Disable opacity at runtime
colorPicker.enableOpacity = false;
colorPicker.dataBind();

// Re-enable opacity at runtime
colorPicker.enableOpacity = true;
colorPicker.dataBind();
```

---

## Right-to-Left Layout (enableRtl)

Renders the component in right-to-left direction for RTL languages (Arabic, Hebrew, etc.).

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enableRtl: true,
  value: '#e91e63ff'
});
colorPicker.appendTo('#color-picker');
```

In RTL mode:
- The hue slider direction is reversed
- The opacity slider direction is reversed
- The HSV gradient handler position is mirrored
- The SplitButton layout adapts to RTL

**Dynamic RTL toggle:**

```typescript
colorPicker.enableRtl = true;
colorPicker.dataBind();
```

---

## Disabled State

Prevents user interaction entirely. The popup will not open when `disabled: true`.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  disabled: true,
  value: '#9e9e9eff'
});
colorPicker.appendTo('#color-picker');
```

**Toggle disabled state at runtime:**

```typescript
// Disable
colorPicker.disabled = true;
colorPicker.dataBind();

// Enable
colorPicker.disabled = false;
colorPicker.dataBind();
```

**Inline mode disabled state:**
In inline mode, setting `disabled: true` adds the `e-disabled` class to the wrapper and disables all input elements inside.

---

## State Persistence (enablePersistence)

When `enablePersistence: true`, the selected `value` is saved to browser `localStorage` and restored on page reload.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enablePersistence: true,
  value: '#673ab7ff'    // This initial value may be overridden by persisted state
});
colorPicker.appendTo('#color-picker');
```

**What is persisted:** Only the `value` property (selected color).

**Use case:** User preference panels, theme color pickers where the selection should survive page refreshes without server-side storage.

**Note:** Persistence uses the component's element `id` as the storage key. Ensure each ColorPicker instance has a unique `id` attribute on its `<input>` element.

---

## CSS Class Customization (cssClass)

Apply one or more custom CSS classes to the root wrapper element for visual overrides.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  cssClass: 'compact-picker dark-theme'    // Space-separated class names
});
colorPicker.appendTo('#color-picker');
```

```css
/* Override tile size in palette */
.compact-picker .e-tile {
  width: 16px;
  height: 16px;
}

/* Dark theme styling */
.dark-theme .e-colorpicker-wrapper {
  background-color: #333;
  border-color: #555;
}
```

**Dynamic class updates:**

```typescript
colorPicker.cssClass = 'new-class another-class';
colorPicker.dataBind();
```

**Built-in CSS utility classes** (apply via `cssClass`):

| Class | Effect |
|---|---|
| `e-hide-value` | Hides the hex/rgb/hsv input fields |
| `e-hide-hex-value` | Hides the HEX input only |
| `e-hide-switchable-value` | Hides RGB/HSV inputs only |
| `e-hide-valueswitcher` | Hides the format switcher button |
| `e-show-value` | Shows input fields (useful in palette mode) |

```typescript
// Hide all input fields in picker mode
const colorPicker: ColorPicker = new ColorPicker({
  cssClass: 'e-hide-value'
});
colorPicker.appendTo('#color-picker');
```

---

## Keyboard Navigation

### Picker Mode

| Key | Action |
|---|---|
| Arrow keys | Move the color handler within the HSV gradient area |
| Ctrl + Arrow keys | Fine-grained (1-unit) movement of the handler |
| Enter | Confirm the current color (triggers `change` event) |

### Palette Mode

| Key | Action |
|---|---|
| Arrow Right | Move to the next tile |
| Arrow Left | Move to the previous tile |
| Arrow Down | Move down one row |
| Arrow Up | Move up one row |
| Enter | Select the focused tile (triggers `change` or `select` event) |

### Popup Control

| Key | Action |
|---|---|
| Escape | Closes the color picker popup |

---

## focusIn Method

Programmatically focuses the ColorPicker component. Focuses the root wrapper element.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  value: '#ff9800ff'
});
colorPicker.appendTo('#color-picker');

// Focus the component after a delay
setTimeout(() => {
  colorPicker.focusIn();
}, 500);
```

**Use case:** Accessibility workflows where focus management is required after a programmatic action (e.g., opening a dialog that contains the color picker).
