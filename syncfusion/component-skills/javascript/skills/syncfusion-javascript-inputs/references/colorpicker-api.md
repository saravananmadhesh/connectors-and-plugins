# API Reference – Syncfusion TypeScript ColorPicker

Source: https://ej2.syncfusion.com/documentation/api/color-picker/index-default

## Table of Contents
1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [Event Argument Interfaces](#event-argument-interfaces)
5. [Type Definitions](#type-definitions)

---

## Properties

All properties belong to the `ColorPicker` class from `@syncfusion/ej2-inputs`.

---

### `columns`
**Type:** `number` | **Default:** `10`

Renders the ColorPicker palette with the specified number of columns (tiles per row).

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  columns: 5
});
```

---

### `createPopupOnClick`
**Type:** `boolean` | **Default:** `false`

When `true`, the popup container is created lazily — only on the first open. Improves initial render performance when many pickers exist on a page.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  createPopupOnClick: true
});
```

---

### `cssClass`
**Type:** `string` | **Default:** `''`

Sets CSS classes on the root wrapper element of the ColorPicker, enabling complete style customization.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  cssClass: 'compact-picker e-hide-value'
});
```

**Built-in utility classes (apply via `cssClass`):**

| Class | Effect |
|---|---|
| `e-hide-value` | Hide all hex/rgb/hsv input fields |
| `e-hide-hex-value` | Hide only the HEX input |
| `e-hide-switchable-value` | Hide only the RGB/HSV inputs |
| `e-hide-valueswitcher` | Hide the format-switch button |
| `e-show-value` | Show input fields in palette mode |

---

### `disabled`
**Type:** `boolean` | **Default:** `false`

Enables or disables the ColorPicker. When `true`, the popup will not open and all interaction is blocked.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  disabled: true
});
```

---

### `enableOpacity`
**Type:** `boolean` | **Default:** `true`

Shows or hides the opacity slider and alpha channel input in picker mode. When `false`, all colors are fully opaque and the value stores only HEX6.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enableOpacity: false    // No opacity slider; opaque colors only
});
```

---

### `enablePersistence`
**Type:** `boolean` | **Default:** `false`

Persists the selected `value` in browser `localStorage` between page reloads. The element `id` is used as the storage key.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enablePersistence: true
});
```

---

### `enableRtl`
**Type:** `boolean` | **Default:** `false`

Renders the component in right-to-left direction for RTL language support.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  enableRtl: true
});
```

---

### `inline`
**Type:** `boolean` | **Default:** `false`

When `true`, renders the ColorPicker directly on the page without a popup SplitButton.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  inline: true,
  showButtons: false
});
```

---

### `locale`
**Type:** `string` | **Default:** `''`

Overrides the global culture and localization value for this component instance. Default global culture is `'en-US'`.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  locale: 'ar'    // Arabic
});
```

---

### `mode`
**Type:** `ColorPickerMode` (`'Picker' | 'Palette'`) | **Default:** `'Picker'`

Controls the rendering mode.
- `'Picker'` — HSV gradient area with hue and opacity sliders
- `'Palette'` — Color tile grid

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette'
});
```

---

### `modeSwitcher`
**Type:** `boolean` | **Default:** `true`

Shows or hides the mode-toggle button at the bottom of the popup. When `false`, the user is locked to the initial mode.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false    // Lock to palette mode
});
```

---

### `noColor`
**Type:** `boolean` | **Default:** `false`

Adds a "no color" transparent tile as the first tile in palette mode. Selecting it sets `value` to `''`.

**Constraints:** Only works in `mode: 'Palette'` with `modeSwitcher: false`.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false,
  noColor: true
});
```

---

### `presetColors`
**Type:** `{ [key: string]: string[] }` | **Default:** `null`

Loads custom color groups into the palette. Each key is a group name; the value is an array of HEX color strings. When `null`, the built-in 100-color Material palette is used.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  presetColors: {
    'Primary': ['#f44336', '#e91e63', '#9c27b0', '#2196f3'],
    'Neutral': ['#ffffff', '#9e9e9e', '#616161', '#000000']
  }
});
```

---

### `showButtons`
**Type:** `boolean` | **Default:** `true`

Shows or hides the Apply and Cancel control buttons.
- `true` — User must click Apply to commit. `change` fires on Apply. `select` fires on interaction.
- `false` — Every color interaction immediately commits. `change` fires on each selection.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  showButtons: false    // Immediate commit on selection
});
```

---

### `showRecentColors`
**Type:** `boolean` | **Default:** `false`

Shows a strip of recently used colors in palette mode. Up to 10 unique recent colors are tracked and displayed. Works only in `mode: 'Palette'`.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  showRecentColors: true
});
```

---

### `value`
**Type:** `string` | **Default:** `'#008000ff'`

The currently selected color in HEX8 format (`#rrggbbaa`). The last two characters represent the alpha channel (`ff` = fully opaque, `00` = fully transparent).

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  value: '#e91e6380'    // Pink at 50% opacity
});

// Read current value
console.log(colorPicker.value);    // '#e91e6380'
```

---

## Methods

All methods are called on a `ColorPicker` instance.

---

### `addEventListener(eventName, handler)`
Adds a handler to the given event listener.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | Yes | Name of the event to listen to |
| `handler` | `Function` | Yes | Callback function |

**Returns:** `void`

```typescript
colorPicker.addEventListener('change', (args) => {
  console.log('Color changed:', args.currentValue.hex);
});
```

---

### `appendTo(selector?)`
Appends the component to a target HTML element.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `selector` | `string \| HTMLElement` | No | CSS selector string or DOM element |

**Returns:** `void`

```typescript
colorPicker.appendTo('#color-picker');
colorPicker.appendTo(document.getElementById('color-picker') as HTMLElement);
```

---

### `dataBind()`
Applies all pending property changes immediately to the component.

**Returns:** `void`

```typescript
colorPicker.value = '#ff5722ff';
colorPicker.dataBind();    // Apply the new color immediately
```

---

### `destroy()`
Removes the component from the DOM and detaches all related event handlers. The original `<input>` element is preserved.

**Returns:** `void`

```typescript
colorPicker.destroy();
```

---

### `focusIn()`
Sets focus to the ColorPicker component (focuses the root wrapper element).

**Returns:** `void`

```typescript
colorPicker.focusIn();
```

---

### `getPersistData()`
Returns the properties that are maintained in the persisted state. Returns a JSON string containing the `value` property.

**Returns:** `string`

```typescript
const persistedData: string = colorPicker.getPersistData();
console.log(persistedData);    // e.g. '{"value":"#ff5722ff"}'
```

---

### `getRootElement()`
Returns the root HTML element of the component (the wrapper element).

**Returns:** `HTMLElement`

```typescript
const root: HTMLElement = colorPicker.getRootElement();
root.style.border = '2px solid #000';
```

---

### `getValue(value?, type?)`
Converts a color value to the specified output format.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | No | Color value to convert. Accepts HEX, HEX8, `rgb(...)`, `rgba(...)`, `hsv(...)`, `hsva(...)`. Defaults to `colorPicker.value` |
| `type` | `string` | No | Target format: `'hex'`, `'hexa'`, `'rgb'`, `'rgba'`, `'hsv'`, `'hsva'`, `'a'`. Defaults to `'hex'` |

**Returns:** `string`

```typescript
// Convert current value to rgba
const rgba: string = colorPicker.getValue(colorPicker.value, 'rgba');

// Convert specific HEX8 to rgb
const rgb: string = colorPicker.getValue('#e91e63cc', 'rgb');
// Returns: 'rgb(233,30,99)'

// Get alpha value only
const alpha: string = colorPicker.getValue('#e91e63cc', 'a');
// Returns: '0.8'

// Convert rgba to hsv
const hsv: string = colorPicker.getValue('rgba(233,30,99,0.8)', 'hsv');
```

**Supported conversion matrix:**

| Input → | `hex` | `hexa` | `rgb` | `rgba` | `hsv` | `hsva` | `a` |
|---|---|---|---|---|---|---|---|
| HEX/HEX8 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `rgb(...)` / `rgba(...)` | ✅ | ✅ | — | — | ✅ | ✅ | — |
| `hsv(...)` / `hsva(...)` | ✅ | ✅ | ✅ | ✅ | — | — | — |

---

### `refresh()`
Applies all pending property changes and re-renders the component.

**Returns:** `void`

```typescript
colorPicker.refresh();
```

---

### `removeEventListener(eventName, handler)`
Removes a previously added event handler.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | Yes | Name of the event |
| `handler` | `Function` | Yes | The handler function to remove (must be the same reference) |

**Returns:** `void`

```typescript
const handler = (args: any) => console.log(args.currentValue.hex);
colorPicker.addEventListener('change', handler);
// Later:
colorPicker.removeEventListener('change', handler);
```

---

### `toggle()`
Toggles the ColorPicker popup open/closed based on its current state.

**Returns:** `void`

```typescript
// Toggle popup programmatically
colorPicker.toggle();
```

**Note:** Only works in popup mode (`inline: false`). Has no effect in inline mode.

---

### `Inject(moduleList)`
Dynamically injects required modules into the component.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `moduleList` | `Function[]` | Yes | Array of module functions to inject |

**Returns:** `void`

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

// No additional modules are required for basic ColorPicker usage
// This method is available for extensibility
ColorPicker.Inject();
```

---

## Events

Subscribe by passing handler functions in component options or via `addEventListener`.

---

### `beforeClose`
**Type:** `EmitType<BeforeOpenCloseEventArgs>`

Triggers before closing the ColorPicker popup. Set `args.cancel = true` to prevent closing.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  beforeClose: (args) => {
    if (shouldPreventClose()) {
      args.cancel = true;
    }
  }
});
```

---

### `beforeModeSwitch`
**Type:** `EmitType<ModeSwitchEventArgs>`

Triggers before switching between ColorPicker modes. `args.mode` is the target mode.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  beforeModeSwitch: (args) => {
    console.log('Switching to:', args.mode);    // 'Picker' or 'Palette'
  }
});
```

---

### `beforeOpen`
**Type:** `EmitType<BeforeOpenCloseEventArgs>`

Triggers before opening the ColorPicker popup. Set `args.cancel = true` to prevent opening.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  beforeOpen: (args) => {
    if (!canOpen()) {
      args.cancel = true;
    }
  }
});
```

---

### `beforeTileRender`
**Type:** `EmitType<PaletteTileEventArgs>`

Triggers while rendering each palette tile. Use it to customize tile DOM elements before they are added to the palette.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  beforeTileRender: (args) => {
    args.element.setAttribute('title', args.value);
  }
});
```

---

### `change`
**Type:** `EmitType<ColorPickerEventArgs>`

Triggers when a color is committed. When `showButtons: false`, fires on every selection. When `showButtons: true`, fires only when Apply is clicked.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  change: (args) => {
    console.log('Hex:', args.currentValue.hex);
    console.log('RGBA:', args.currentValue.rgba);
    console.log('HEX8 value:', args.value);
  }
});
```

---

### `created`
**Type:** `EmitType<Event>`

Triggers once after the component has fully rendered.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  created: () => {
    console.log('ColorPicker ready');
  }
});
```

---

### `onModeSwitch`
**Type:** `EmitType<ModeSwitchEventArgs>`

Triggers after the mode switch has completed. `args.mode` is the new current mode.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  onModeSwitch: (args) => {
    console.log('Now in:', args.mode);    // 'Picker' or 'Palette'
  }
});
```

---

### `open`
**Type:** `EmitType<OpenEventArgs>`

Triggers when the ColorPicker popup opens.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  open: (args) => {
    console.log('Popup opened. Container:', args.element);
  }
});
```

---

### `select`
**Type:** `EmitType<ColorPickerEventArgs>`

Triggers while selecting a color in picker/palette when `showButtons: true`. Fires on each interactive selection before Apply is clicked. Useful for live preview.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  showButtons: true,
  select: (args) => {
    // Live preview before Apply
    document.getElementById('preview').style.backgroundColor = args.currentValue.rgba;
  }
});
```

---

## Event Argument Interfaces

---

### `ColorPickerEventArgs`
Used by `change` and `select` events.

| Property | Type | Description |
|---|---|---|
| `currentValue` | `{ hex: string; rgba: string }` | Current color: `hex` (6-char) and `rgba` (CSS string) |
| `previousValue` | `{ hex: string; rgba: string }` | Previous color: `hex` (6-char) and `rgba` (CSS string) |
| `value` | `string` (optional) | Full HEX8 value (only present in `change`, not `select`) |
| `event` | `Event` (optional) | Original DOM event |

---

### `PaletteTileEventArgs`
Used by `beforeTileRender` event.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The `<span>` tile DOM element being rendered |
| `presetName` | `string` | The preset group name key (e.g., `'default'`, `'Primary'`) |
| `value` | `string` | HEX color value of this tile (e.g., `'#f44336'`) |

---

### `BeforeOpenCloseEventArgs`
Used by `beforeOpen` and `beforeClose` events.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The popup container element |
| `event` | `Event` | The original DOM event that triggered the action |
| `cancel` | `boolean` | Set `true` to cancel the open or close action |

---

### `OpenEventArgs`
Used by `open` event.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The popup container element |

---

### `ModeSwitchEventArgs`
Used by `beforeModeSwitch` and `onModeSwitch` events.

| Property | Type | Description |
|---|---|---|
| `element` | `HTMLElement` | The component container element |
| `mode` | `string` | The mode name: `'Picker'` or `'Palette'` |

---

## Type Definitions

### `ColorPickerMode`
```typescript
type ColorPickerMode = 'Picker' | 'Palette';
```
- `'Picker'` — HSV gradient area with sliders
- `'Palette'` — Color tile grid
