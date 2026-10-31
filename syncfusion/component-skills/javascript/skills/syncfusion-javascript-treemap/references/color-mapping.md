# Color Mapping in TreeMap (TypeScript and JavaScript)

Apply data-driven colors to TreeMap items using range mapping, equal mapping, palettes, gradients, and opacity-based styling. Learn how to implement each color mapping technique with TypeScript and JavaScript examples.

## Table of Contents

- [overview](#overview)
- [range-color-mapping](#range-color-mapping)
  - [basic-range-mapping](#basic-range-mapping)
  - [color-range-examples](#color-range-examples)
- [equal-color-mapping](#equal-color-mapping)
  - [category-based-coloring](#category-based-coloring)
- [desaturation-color-mapping](#desaturation-color-mapping)
  - [opacity-based-coloring](#opacity-based-coloring)
- [palette-color-mapping](#palette-color-mapping)
  - [simple-palette-assignment](#simple-palette-assignment)
- [multiple-gradient-colors](#multiple-gradient-colors)
  - [gradient-color-mapping](#gradient-color-mapping)
- [direct-color-assignment](#direct-color-assignment)
  - [color-value-path](#color-value-path)
- [color-mapping-for-group-headers](#color-mapping-for-group-headers)
  - [group-vs-leaf-coloring](#group-vs-leaf-coloring)
- [best-practices](#best-practices)
- [troubleshooting-color-mapping](#troubleshooting-color-mapping)

## Overview

Color mapping in the Syncfusion TreeMap is a built-in feature set used to customize the fill color of leaf items based on numeric ranges, exact values, opacity variation, palette assignment, gradients, or a color field from the data source. This guide covers TypeScript and JavaScript implementations of all color mapping modes.

## Range Color Mapping

Range color mapping is a built-in TreeMap coloring mode used to apply colors based on numeric value intervals. It works by binding a numeric field to `rangeColorValuePath` and defining `from`, `to`, and `color` entries inside `leafItemSettings.colorMapping`.

### Basic Range Mapping

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'A', Sales: 15000, Profit: 35 },
    { Product: 'B', Sales: 12000, Profit: 55 },
    { Product: 'C', Sales: 8000, Profit: 75 },
    { Product: 'D', Sales: 10000, Profit: 20 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Profit',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { from: 0, to: 25, color: '#a6c84c' },
            { from: 25, to: 50, color: '#f1b41d' },
            { from: 50, to: 75, color: '#f18f17' },
            { from: 75, to: 100, color: '#c1272d' }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'A', Sales: 15000, Profit: 35 },
    { Product: 'B', Sales: 12000, Profit: 55 },
    { Product: 'C', Sales: 8000, Profit: 75 },
    { Product: 'D', Sales: 10000, Profit: 20 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Profit',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { from: 0, to: 25, color: '#a6c84c' },
            { from: 25, to: 50, color: '#f1b41d' },
            { from: 50, to: 75, color: '#f18f17' },
            { from: 75, to: 100, color: '#c1272d' }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Key Properties:**

- `rangeColorValuePath`: The numeric field used for evaluating range-based colors.
- `from`: The lower boundary of the color range.
- `to`: The upper boundary of the color range.
- `color`: The fill color applied when the data value falls inside that range.

### Color Range Examples

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: -10, to: 0, color: '#0066cc' },
    { from: 0, to: 15, color: '#3399ff' },
    { from: 15, to: 25, color: '#66cc00' },
    { from: 25, to: 40, color: '#ff6600' },
    { from: 40, to: 60, color: '#cc0000' }
  ]
};
```

This is useful for temperature bands, risk scoring, sales tiers, or any metric where the numeric scale itself carries meaning.

## Equal Color Mapping

Equal color mapping is another built-in TreeMap coloring mode. It is used when the color should depend on exact category values rather than numeric intervals.

### Category-Based Coloring

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' },
    { Product: 'Shirt', Sales: 5000, Category: 'Clothing' }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    equalColorValuePath: 'Category',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { value: 'Electronics', color: '#0066cc' },
            { value: 'Furniture', color: '#66cc00' },
            { value: 'Clothing', color: '#ff6600' }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' },
    { Product: 'Shirt', Sales: 5000, Category: 'Clothing' }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    equalColorValuePath: 'Category',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { value: 'Electronics', color: '#0066cc' },
            { value: 'Furniture', color: '#66cc00' },
            { value: 'Clothing', color: '#ff6600' }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

**Key Properties:**

- `equalColorValuePath`: The field that contains the exact value to compare.
- `value`: The specific category or value to match.
- `color`: The fill color assigned to matched items.

This is the best option for category-based visuals such as brand, status, department, or product type.

## Desaturation Color Mapping

Desaturation color mapping is built in and uses `minOpacity` and `maxOpacity` to show value intensity. It still works through the color-mapping configuration, but instead of switching between very different colors, it varies opacity across the range.

### Opacity-Based Coloring

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'A', Sales: 15000, Profit: 10 },
    { Product: 'B', Sales: 12000, Profit: 30 },
    { Product: 'C', Sales: 8000, Profit: 60 },
    { Product: 'D', Sales: 10000, Profit: 90 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Profit',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            {
                from: 0,
                to: 100,
                color: '#0066cc',
                minOpacity: 0.2,
                maxOpacity: 1
            }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'A', Sales: 15000, Profit: 10 },
    { Product: 'B', Sales: 12000, Profit: 30 },
    { Product: 'C', Sales: 8000, Profit: 60 },
    { Product: 'D', Sales: 10000, Profit: 90 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Profit',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            {
                from: 0,
                to: 100,
                color: '#0066cc',
                minOpacity: 0.2,
                maxOpacity: 1
            }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Key Properties:**

- `color`: The base color used for the opacity transition.
- `minOpacity`: The opacity used near the low end of the range.
- `maxOpacity`: The opacity used near the high end of the range.

**Use Case:** Items with lower profit or lower score appear lighter, while higher values appear more visually prominent.

## Palette Color Mapping

Palette coloring is built in, but it is not the same as range or equal color mapping. Instead of comparing values, TreeMap cycles through the colors you provide in the `palette` property.

### Simple Palette Assignment

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'A', Sales: 15000 },
    { Product: 'B', Sales: 12000 },
    { Product: 'C', Sales: 8000 },
    { Product: 'D', Sales: 10000 },
    { Product: 'E', Sales: 9000 }
];

const palette = ['#0066cc', '#66cc00', '#ff6600', '#cc0000', '#9933ff'];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    palette: palette,
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'A', Sales: 15000 },
    { Product: 'B', Sales: 12000 },
    { Product: 'C', Sales: 8000 },
    { Product: 'D', Sales: 10000 },
    { Product: 'E', Sales: 9000 }
];

var palette = ['#0066cc', '#66cc00', '#ff6600', '#cc0000', '#9933ff'];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    palette: palette,
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Behavior:** TreeMap assigns colors from the palette in sequence across the rendered items.

This is ideal when you simply want quick visual distinction between items without a value-based mapping rule.

## Multiple Gradient Colors

This is a built-in TreeMap capability. Syncfusion supports giving an array of colors inside a `colorMapping` entry so the component can apply a gradient-like effect within the configured range.

### Gradient Color Mapping

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'A', Sales: 15000, Score: 10 },
    { Product: 'B', Sales: 12000, Score: 35 },
    { Product: 'C', Sales: 8000, Score: 65 },
    { Product: 'D', Sales: 10000, Score: 90 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Score',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { from: 0, to: 50, color: ['#3398db', '#7cb5ec', '#ffd700'] },
            { from: 50, to: 100, color: ['#ffd700', '#ff8c42', '#d32f2f'] }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'A', Sales: 15000, Score: 10 },
    { Product: 'B', Sales: 12000, Score: 35 },
    { Product: 'C', Sales: 8000, Score: 65 },
    { Product: 'D', Sales: 10000, Score: 90 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Score',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 },
        colorMapping: [
            { from: 0, to: 50, color: ['#3398db', '#7cb5ec', '#ffd700'] },
            { from: 50, to: 100, color: ['#ffd700', '#ff8c42', '#d32f2f'] }
        ]
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

Colors transition across the provided color array for values within each range.

## Direct Color Assignment

Direct color assignment is also built in. If your data source already contains the final color for each item, bind that field to `colorValuePath`.

### Color Value Path

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Product: 'A', Sales: 15000, Color: '#0066cc' },
    { Product: 'B', Sales: 12000, Color: '#66cc00' },
    { Product: 'C', Sales: 8000, Color: '#ff6600' }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    colorValuePath: 'Color',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Product: 'A', Sales: 15000, Color: '#0066cc' },
    { Product: 'B', Sales: 12000, Color: '#66cc00' },
    { Product: 'C', Sales: 8000, Color: '#ff6600' }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    colorValuePath: 'Color',
    leafItemSettings: {
        labelPath: 'Product',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**When to use:** Use this when color is already part of the dataset and should not be derived by TreeMap rules.

## Color Mapping for Group Headers

TreeMap supports styling for group headers, but this is not the same as leaf-item color mapping. Group styling is usually applied through `levels`, while leaf-item styling is controlled through `leafItemSettings`, `palette`, or color mapping properties.

### Group vs Leaf Coloring

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Category: 'Electronics', Item: 'Laptop', Value: 25 },
    { Category: 'Electronics', Item: 'Phone', Value: 20 },
    { Category: 'Furniture', Item: 'Chair', Value: 15 },
    { Category: 'Furniture', Item: 'Table', Value: 18 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    levels: [
        {
            groupPath: 'Category',
            fill: '#dbeafe',
            border: { color: '#93c5fd', width: 1 }
        }
    ],
    leafItemSettings: {
        labelPath: 'Item',
        fill: '#0066cc',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
    { Category: 'Electronics', Item: 'Laptop', Value: 25 },
    { Category: 'Electronics', Item: 'Phone', Value: 20 },
    { Category: 'Furniture', Item: 'Chair', Value: 15 },
    { Category: 'Furniture', Item: 'Table', Value: 18 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    levels: [
        {
            groupPath: 'Category',
            fill: '#dbeafe',
            border: { color: '#93c5fd', width: 1 }
        }
    ],
    leafItemSettings: {
        labelPath: 'Item',
        fill: '#0066cc',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
```

**Clarified Behavior:** Group headers are styled through `levels`, while leaf items are styled through `leafItemSettings` and the built-in color mechanisms.

## Best Practices

### Use Accessible Color Ranges

Choose colors with enough contrast so users can distinguish them clearly.

**TypeScript:**

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 15, color: '#0066cc' },
    { from: 15, to: 50, color: '#ff6600' }
  ]
};
```

**JavaScript:**

```javascript
var leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 15, color: '#0066cc' },
    { from: 15, to: 50, color: '#ff6600' }
  ]
};
```

### Avoid Similar Colors for Different Ranges

Avoid ranges that are visually too close together, because users may not be able to distinguish them quickly.

**TypeScript:**

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 50, color: '#0066cc' },
    { from: 50, to: 100, color: '#0055bb' }
  ]
};
```

**JavaScript:**

```javascript
var leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 50, color: '#0066cc' },
    { from: 50, to: 100, color: '#0055bb' }
  ]
};
```

### Align Colors with Data Meaning

Use color semantics that support the data meaning.

**TypeScript:**

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 40, color: '#cc0000' },
    { from: 40, to: 80, color: '#ffcc00' },
    { from: 80, to: 100, color: '#00cc00' }
  ]
};
```

**JavaScript:**

```javascript
var leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    { from: 0, to: 40, color: '#cc0000' },
    { from: 40, to: 80, color: '#ffcc00' },
    { from: 80, to: 100, color: '#00cc00' }
  ]
};
```

### Use Sequential Colors for Ranges

For progressive values such as score, revenue, density, or completion, use a visually ordered sequence.

**TypeScript:**

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    {
      from: 0,
      to: 100,
      color: ['#e8f4f8', '#b3d9e6', '#7eb8d4', '#5a9bc0']
    }
  ]
};
```

**JavaScript:**

```javascript
var leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    {
      from: 0,
      to: 100,
      color: ['#e8f4f8', '#b3d9e6', '#7eb8d4', '#5a9bc0']
    }
  ]
};
```

## Troubleshooting Color Mapping

**Issue:** Color mapping is not applying.

**Solution:** In Syncfusion TreeMap, range and equal mapping are commonly configured through `leafItemSettings.colorMapping`. Make sure the correct value path is bound at the TreeMap level and the field exists in the data source.

**TypeScript:**

```typescript
const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    rangeColorValuePath: 'Profit',
    leafItemSettings: {
        labelPath: 'Product',
        colorMapping: [...]
    }
});
```

**Issue:** All items show the same color.

**Possible Causes:**

- All values fall into the same defined range.
- Exact match values do not match the `value` entries in equal mapping.
- `palette` is being used when you expected rule-based mapping.
- `colorValuePath` points to the wrong field name.

Verify your `colorMapping` configuration includes distinct value ranges.

**Issue:** Colors appear washed out.

**Solution:** This occurs if `minOpacity` is too low. Increase the minimum opacity or use stronger base colors.

**TypeScript:**

```typescript
leafItemSettings = {
  labelPath: 'Product',
  colorMapping: [
    {
      from: 0,
      to: 100,
      color: '#0066cc',
      minOpacity: 0.5,
      maxOpacity: 1
    }
  ]
};
```

---

## Key Takeaways

- All color mapping modes are built into Syncfusion TreeMap for both TypeScript and JavaScript implementations.
- Use range color mapping for numeric intervals, equal mapping for categories, and palette for simple sequential coloring.
- For opacity-based desaturation, configure `minOpacity` and `maxOpacity` in the color mapping.
- Always validate that your data contains the fields referenced in `rangeColorValuePath`, `equalColorValuePath`, and `colorValuePath`.
- Consider WCAG color contrast guidelines when selecting color schemes for accessibility.

