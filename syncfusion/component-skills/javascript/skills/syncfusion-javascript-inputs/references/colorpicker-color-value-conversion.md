# Color Value and Conversion – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [The value Property](#the-value-property)
2. [getValue Method — Color Conversion](#getvalue-method--color-conversion)
3. [Reading Color from Events](#reading-color-from-events)
4. [Opacity and Alpha Channel](#opacity-and-alpha-channel)
5. [Setting Color Programmatically](#setting-color-programmatically)
6. [Color Conversion Reference Table](#color-conversion-reference-table)

---

## The value Property

The `value` property holds the currently selected color as a HEX8 string: `#rrggbbaa`.

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  value: '#e91e6380'    // Pink at 50% opacity (alpha = 0x80 = 128/255 ≈ 50%)
});
colorPicker.appendTo('#color-picker');

// Read current value at any time
console.log(colorPicker.value);    // e.g. '#e91e6380'
```

**Format rules:**
- Must be a HEX string. Shorter formats (`#rgb`, `#rrggbb`) are normalized to HEX8 internally.
- The last two characters represent the alpha channel: `ff` = fully opaque, `00` = fully transparent.
- **Default:** `'#008000ff'` (green, fully opaque).

---

## getValue Method — Color Conversion

`getValue(value?, type?)` converts a color string to the specified output format. This is the primary method for reading the color in non-HEX formats.

**Signature:**
```typescript
colorPicker.getValue(value?: string, type?: string): string
```

- `value` — The color to convert. Accepts HEX, HEX8 (`#rrggbbaa`), `rgb(...)`, `rgba(...)`, `hsv(...)`, `hsva(...)`. If omitted, uses the current `colorPicker.value`.
- `type` — Target format: `'hex'`, `'hexa'`, `'rgb'`, `'rgba'`, `'hsv'`, `'hsva'`, `'a'`. Case-insensitive. Defaults to `'hex'`.

### Converting HEX to other formats

```typescript
const colorPicker: ColorPicker = new ColorPicker({ value: '#2196f3cc' });
colorPicker.appendTo('#color-picker');

// After initialization:
colorPicker.getValue('#2196f3cc', 'hex');     // '#2196f3'        (6-char hex, no alpha)
colorPicker.getValue('#2196f3cc', 'hexa');    // '#2196f3cc'      (8-char hex with alpha)
colorPicker.getValue('#2196f3cc', 'rgb');     // 'rgb(33,150,243)'
colorPicker.getValue('#2196f3cc', 'rgba');    // 'rgba(33,150,243,0.8)'
colorPicker.getValue('#2196f3cc', 'hsv');     // 'hsv(207,86.4,95.3)'
colorPicker.getValue('#2196f3cc', 'hsva');    // 'hsva(207,86.4,95.3,0.8)'
colorPicker.getValue('#2196f3cc', 'a');       // '0.8'            (alpha only)
```

### Converting from RGBA to other formats

```typescript
colorPicker.getValue('rgba(33,150,243,0.8)', 'hex');     // '#2196f3'
colorPicker.getValue('rgba(33,150,243,0.8)', 'hexa');    // '#2196f3cc'
colorPicker.getValue('rgba(33,150,243,0.8)', 'hsv');     // 'hsv(207,86.4,95.3)'
colorPicker.getValue('rgba(33,150,243,0.8)', 'hsva');    // 'hsva(207,86.4,95.3,0.8)'
```

### Converting from HSVA to other formats

```typescript
colorPicker.getValue('hsva(207,86,95,0.8)', 'rgba');    // 'rgba(33,150,243,0.8)'
colorPicker.getValue('hsva(207,86,95,0.8)', 'hex');     // '#2196f3'
colorPicker.getValue('hsva(207,86,95,0.8)', 'rgb');     // 'rgb(33,150,243)'
```

### Using current value (no arguments)

```typescript
// Get current color as hex (no alpha)
const hex: string = colorPicker.getValue();    // returns colorPicker.value as hex
```

---

## Reading Color from Events

### change Event

The `change` event provides `currentValue` and `previousValue`, each containing `.hex` and `.rgba`:

```typescript
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  value: '#f44336ff',
  change: (args: ColorPickerEventArgs) => {
    // args.currentValue.hex  — 6-char hex (no alpha): e.g. '#f44336'
    // args.currentValue.rgba — rgba string: e.g. 'rgba(244,67,54,1)'
    // args.previousValue.hex — previous 6-char hex
    // args.previousValue.rgba— previous rgba string
    // args.value             — full HEX8 value: e.g. '#f44336ff'

    console.log('New hex:', args.currentValue.hex);
    console.log('New rgba:', args.currentValue.rgba);
    console.log('Previous hex:', args.previousValue.hex);
    console.log('Full value (HEX8):', args.value);

    // Apply to a preview element
    const preview = document.getElementById('preview') as HTMLElement;
    preview.style.backgroundColor = args.currentValue.rgba;
  }
});
colorPicker.appendTo('#color-picker');
```

### select Event

Fires during intermediate selection when `showButtons: true`. Has the same `currentValue`/`previousValue` structure as `change`, but does NOT include `args.value`:

```typescript
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  showButtons: true,
  select: (args: ColorPickerEventArgs) => {
    // Preview color before user clicks Apply
    const preview = document.getElementById('preview') as HTMLElement;
    preview.style.backgroundColor = args.currentValue.rgba;
  },
  change: (args: ColorPickerEventArgs) => {
    // Committed color after Apply is clicked
    console.log('Confirmed color:', args.currentValue.hex);
  }
});
colorPicker.appendTo('#color-picker');
```

---

## Opacity and Alpha Channel

Opacity is enabled by default (`enableOpacity: true`). It adds an opacity slider in picker mode and includes the alpha channel in all color values.

```typescript
// With opacity enabled (default)
const colorPicker: ColorPicker = new ColorPicker({
  enableOpacity: true,    // Default — shows opacity slider
  value: '#9c27b080'      // Purple at 50% opacity
});
colorPicker.appendTo('#color-picker');
```

Disable the opacity slider to work with fully opaque colors only:

```typescript
// Without opacity
const colorPicker: ColorPicker = new ColorPicker({
  enableOpacity: false,   // No opacity slider; all colors are opaque
  value: '#9c27b0'        // HEX6 is fine here; 'ff' appended internally
});
colorPicker.appendTo('#color-picker');
```

When `enableOpacity: false`:
- The opacity slider is hidden
- `value` stores a 6-character HEX (no alpha suffix)
- `args.currentValue.hex` returns a 6-character HEX

---

## Setting Color Programmatically

Change the color at runtime using `value` + `dataBind()`:

```typescript
// Change to a new color
colorPicker.value = '#ff5722ff';
colorPicker.dataBind();
```

Or use `setProperties` for batch updates:

```typescript
colorPicker.setProperties({ value: '#ff5722ff' });
```

**Note:** Setting `value` directly without `dataBind()` queues the change but does not apply it until the next render cycle. Use `dataBind()` to apply immediately.

---

## Color Conversion Reference Table

| Input Format | Accepted by `getValue` | Example |
|---|---|---|
| HEX6 | ✅ | `#ff5722` |
| HEX8 | ✅ | `#ff5722ff` |
| RGB | ✅ | `rgb(255,87,34)` |
| RGBA | ✅ | `rgba(255,87,34,1)` |
| HSV | ✅ | `hsv(14,86.7,100)` |
| HSVA | ✅ | `hsva(14,86.7,100,1)` |

| `type` Value | Output Format | Example Output |
|---|---|---|
| `'hex'` | 6-char HEX | `#ff5722` |
| `'hexa'` | 8-char HEX with alpha | `#ff5722ff` |
| `'rgb'` | `rgb(r,g,b)` | `rgb(255,87,34)` |
| `'rgba'` | `rgba(r,g,b,a)` | `rgba(255,87,34,1)` |
| `'hsv'` | `hsv(h,s,v)` | `hsv(14,86.7,100)` |
| `'hsva'` | `hsva(h,s,v,a)` | `hsva(14,86.7,100,1)` |
| `'a'` | Alpha value string | `'1'` or `'0.5'` |
