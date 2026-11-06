# Palette Customization – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [Default Palette](#default-palette)
2. [Custom Preset Colors (Single Group)](#custom-preset-colors-single-group)
3. [Multiple Named Color Groups](#multiple-named-color-groups)
4. [Columns Configuration](#columns-configuration)
5. [No-Color Option](#no-color-option)
6. [beforeTileRender Event](#beforetilerender-event)
7. [Combined: Custom Palette with No-Color](#combined-custom-palette-with-no-color)

---

## Default Palette

When `mode: 'Palette'` is set without a `presetColors` property, the component renders the built-in 100-color Material Design palette (10 columns × 10 rows).

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette'
  // No presetColors — uses default 100-color Material palette
});
colorPicker.appendTo('#color-picker');
```

---

## Custom Preset Colors (Single Group)

Use `presetColors` to define your own color palette. Each key is a group name and the value is an array of HEX color strings.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false,
  presetColors: {
    'custom': [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
      '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#000000'
    ]
  },
  columns: 5    // 5 tiles per row — 4 rows for 20 colors
});
colorPicker.appendTo('#color-picker');
```

**Note:** Color strings must be valid HEX codes (3, 6, or 8 characters). The component normalizes them to HEX8 internally.

---

## Multiple Named Color Groups

When `presetColors` has more than one key, each group renders as a separate labeled section. Groups with more than 10 rows total receive the `e-palette-group` class for visual grouping.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  presetColors: {
    'Primary': [
      '#f44336', '#e91e63', '#9c27b0', '#3f51b5',
      '#2196f3', '#009688', '#4caf50', '#ffeb3b',
      '#ff9800', '#795548'
    ],
    'Accent': [
      '#ff5252', '#ff4081', '#ea80fc', '#8c9eff',
      '#40c4ff', '#64ffda', '#69f0ae', '#eeff41',
      '#ffab40', '#ff6d00'
    ],
    'Neutral': [
      '#ffffff', '#f5f5f5', '#eeeeee', '#e0e0e0',
      '#bdbdbd', '#9e9e9e', '#757575', '#616161',
      '#424242', '#000000'
    ]
  },
  columns: 10
});
colorPicker.appendTo('#color-picker');
```

Each key becomes a named palette section. Users can quickly identify color groups by their heading labels.

---

## Columns Configuration

The `columns` property sets the number of tiles per row in the palette grid. Default is `10`.

```typescript
// Compact 5-column palette
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  columns: 5,
  presetColors: {
    'colors': [
      '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3',
      '#009688', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722'
    ]
  }
});
colorPicker.appendTo('#color-picker');
```

```typescript
// Wide 14-column brand palette
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  columns: 14,
  presetColors: {
    'brand': [
      '#b71c1c','#c62828','#d32f2f','#e53935','#ef5350',
      '#f44336','#ef9a9a','#ffcdd2',
      '#880e4f','#ad1457','#c2185b','#d81b60','#e91e63','#ec407a'
    ]
  }
});
colorPicker.appendTo('#color-picker');
```

**Tip:** Align `columns` with the number of colors so the last row is full.

---

## No-Color Option

The `noColor` property adds a transparent "no color" tile as the first tile in the palette. Selecting it sets the value to an empty string (`''`).

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false,    // Required: noColor only works without mode switcher
  noColor: true,
  value: ''               // Start with no color selected
});
colorPicker.appendTo('#color-picker');
```

**Constraints:**
- `noColor` only functions in `mode: 'Palette'`
- `modeSwitcher` must be `false` when using `noColor`
- When selected, `args.currentValue.hex` and `args.currentValue.rgba` are empty strings in the `change` event

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false,
  noColor: true,
  change: (args) => {
    if (args.currentValue.hex === '') {
      console.log('No color selected (transparent)');
    } else {
      console.log('Color selected:', args.currentValue.hex);
    }
  }
});
colorPicker.appendTo('#color-picker');
```

---

## beforeTileRender Event

Fires while rendering each palette tile. Use it to add tooltips, custom attributes, or visual indicators to individual tiles.

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  presetColors: {
    'swatches': ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#4caf50']
  },
  beforeTileRender: (args) => {
    // args.element — the <span> tile DOM element
    // args.value   — the color value for this tile (e.g., '#f44336')
    // args.presetName — the group name (e.g., 'swatches')
    args.element.setAttribute('title', args.value);
    args.element.setAttribute('aria-label', `Color ${args.value}`);
  }
});
colorPicker.appendTo('#color-picker');
```

**Adding a border to a specific color:**

```typescript
const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  beforeTileRender: (args) => {
    if (args.value === '#000000') {
      args.element.style.border = '2px solid #fff';
    }
  }
});
colorPicker.appendTo('#color-picker');
```

---

## Combined: Custom Palette with No-Color

A full example combining custom preset, column layout, no-color tile, and tile customization:

```typescript
import { ColorPicker, PaletteTileEventArgs } from '@syncfusion/ej2-inputs';

const brandColors: string[] = [
  '#1a237e', '#283593', '#303f9f', '#3949ab', '#3f51b5',
  '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9', '#e8eaf6'
];

const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  modeSwitcher: false,
  noColor: true,
  columns: 5,
  presetColors: { 'brand': brandColors },
  beforeTileRender: (args: PaletteTileEventArgs) => {
    args.element.title = args.value || 'None';
  },
  change: (args) => {
    const hex = args.currentValue.hex;
    console.log(hex === '' ? 'Cleared' : `Picked: ${hex}`);
  }
});
colorPicker.appendTo('#color-picker');
```
