# Color Mapping in Vue TreeMap

This guide covers all color mapping strategies in TreeMap including range, equal, palette, and custom color assignment.

## Table of Contents
- [Overview](#overview)
- [Range Color Mapping](#range-color-mapping)
- [Equal Color Mapping](#equal-color-mapping)
- [Palette Color Mapping](#palette-color-mapping)
- [Color Binding from Data Source](#color-binding-from-data-source)
- [Desaturation Effects](#desaturation-effects)
- [Legend Integration](#legend-integration)

## Overview

Color mapping adds visual meaning to data by mapping item values to colors. The TreeMap supports four color mapping strategies:

1. **Range** - Map color ranges to numeric intervals (e.g., 0-100 = red, 100-200 = green)
2. **Equal** - Map specific discrete values to colors (e.g., 'High' = red, 'Low' = green)
3. **Palette** - Distribute predefined colors across data items
4. **Direct** - Bind colors directly from data source

## Range Color Mapping

Range color mapping applies colors based on numeric value intervals. Perfect for continuous data like percentages, scores, or quantities.

### Basic Range Mapping

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource'
            :rangeColorValuePath='rangeColorValuePath'
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { fruit: 'Apple', count: 5000 },
    { fruit: 'Mango', count: 3000 },
    { fruit: 'Orange', count: 2300 },
    { fruit: 'Banana', count: 500 },
    { fruit: 'Grape', count: 4300 },
    { fruit: 'Papaya', count: 1200 },
    { fruit: 'Melon', count: 4500 }
];

const weightValuePath = 'count';
const rangeColorValuePath = 'count';

const leafItemSettings = {
    labelPath: 'fruit',
    colorMapping: [
        {
            from: 500,
            to: 3000,
            color: '#FFA07A'  // Light salmon
        },
        {
            from: 3000,
            to: 5000,
            color: '#FF6347'  // Tomato red
        }
    ]
};
</script>
```

**How it works:**
- Items with count 500-3000 display light salmon
- Items with count 3000-5000 display tomato red
- The `rangeColorValuePath` specifies which field determines the color

### Multi-Range Mapping

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ProductName',
    colorMapping: [
        { from: 0, to: 250, color: '#d4e6f1' },      // Light blue
        { from: 250, to: 500, color: '#aed6f1' },    // Medium light
        { from: 500, to: 1000, color: '#5dade2' },   // Medium blue
        { from: 1000, to: 2500, color: '#2874a6' },  // Dark blue
        { from: 2500, to: 5000, color: '#1a5276' }   // Very dark blue
    ]
};

const rangeColorValuePath = 'Sales';
</script>
```

This creates a 5-step gradient from light to dark blue based on sales values.

## Equal Color Mapping

Equal color mapping maps exact values or discrete categories to specific colors. Use when data values are categorical or discrete (not continuous).

### Categorical Equal Mapping

```vue
<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { Car: 'Mustang', Brand: 'Ford', count: 232 },
    { Car: 'EcoSport', Brand: 'Ford', count: 121 },
    { Car: 'Swift', Brand: 'Maruti', count: 143 },
    { Car: 'Baleno', Brand: 'Maruti', count: 454 },
    { Car: 'Vitara Brezza', Brand: 'Maruti', count: 545 },
    { Car: 'A3 Cabriolet', Brand: 'Audi', count: 123 },
    { Car: 'RS7 Sportback', Brand: 'Audi', count: 523 }
];

const weightValuePath = 'count';
const equalColorValuePath = 'Brand';  // Group by Brand

const leafItemSettings = {
    labelPath: 'Car',
    colorMapping: [
        { value: 'Ford', color: '#4caf50' },   // Green
        { value: 'Audi', color: '#f44336' },   // Red
        { value: 'Maruti', color: '#ff9800' }  // Orange
    ]
};
</script>

<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :equalColorValuePath='equalColorValuePath'
        :weightValuePath='weightValuePath'
        :leafItemSettings='leafItemSettings'>
    </ejs-treemap>
</template>
```

**Result:** All Ford cars are green, Audi cars are red, Maruti cars are orange.

### Numeric Equal Mapping

```vue
<script setup>
const dataSource = [
    { Department: 'HR', Score: 1, Count: 20 },
    { Department: 'IT', Score: 1, Count: 30 },
    { Department: 'Sales', Score: 2, Count: 40 },
    { Department: 'Marketing', Score: 2, Count: 50 },
    { Department: 'Operations', Score: 3, Count: 35 }
];

const equalColorValuePath = 'Score';

const leafItemSettings = {
    labelPath: 'Department',
    colorMapping: [
        { value: 1, color: '#ffeb3b' },  // Score 1 = Yellow
        { value: 2, color: '#ff9800' },  // Score 2 = Orange
        { value: 3, color: '#f44336' }   // Score 3 = Red
    ]
};
</script>
```

## Palette Color Mapping

Palette mapping automatically distributes a predefined color array across items.

### Simple Palette

```vue
<script setup>
const dataSource = [
    { Car: 'Mustang', Brand: 'Ford', count: 232 },
    { Car: 'EcoSport', Brand: 'Ford', count: 121 },
    { Car: 'Swift', Brand: 'Maruti', count: 143 },
    { Car: 'Baleno', Brand: 'Maruti', count: 454 },
    { Car: 'Vitara Brezza', Brand: 'Maruti', count: 545 },
];

const weightValuePath = 'count';
const palette = ['#ef5350', '#66bb6a', '#42a5f5', '#ffa726'];

const leafItemSettings = {
    labelPath: 'Car'
};
</script>

<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :weightValuePath='weightValuePath'
        :palette='palette'
        :leafItemSettings='leafItemSettings'>
    </ejs-treemap>
</template>
```

Colors cycle through the palette array. First item gets first color, second gets second color, and so on.

## Color Binding from Data Source

Bind colors directly from a data field when each item has its own color specification.

### Data-Driven Colors

```vue
<script setup>
const dataSource = [
    { fruit: 'Apple', count: 5000, color: 'red' },
    { fruit: 'Mango', count: 3000, color: 'orange' },
    { fruit: 'Orange', count: 2300, color: 'orange' },
    { fruit: 'Banana', count: 500, color: 'yellow' },
    { fruit: 'Grape', count: 4300, color: 'purple' },
    { fruit: 'Papaya', count: 1200, color: 'pink' },
    { fruit: 'Melon', count: 4500, color: 'lightgreen' }
];

const weightValuePath = 'count';
const colorValuePath = 'color';  // Use 'color' field
const palette = [];  // Leave empty when using colorValuePath

const leafItemSettings = {
    labelPath: 'fruit'
};
</script>

<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :colorValuePath='colorValuePath'
        :palette='palette'
        :weightValuePath='weightValuePath'
        :leafItemSettings='leafItemSettings'>
    </ejs-treemap>
</template>
```

Each item displays with its assigned color from the data source.

## Desaturation Effects

Desaturation creates gradient effects by applying opacity variations to a base color.

### Opacity-Based Desaturation

```vue
<script setup>
const dataSource = [
    { fruit: 'Apple', count: 5000 },
    { fruit: 'Mango', count: 3000 },
    { fruit: 'Orange', count: 2300 },
    { fruit: 'Banana', count: 500 },
    { fruit: 'Grape', count: 4300 },
];

const rangeColorValuePath = 'count';
const weightValuePath = 'count';

const leafItemSettings = {
    labelPath: 'fruit',
    colorMapping: [
        {
            from: 500,
            to: 3000,
            color: '#FF6347',    // Tomato red
            minOpacity: 0.2,     // 20% opacity (lighter)
            maxOpacity: 0.5      // 50% opacity (darker)
        },
        {
            from: 3000,
            to: 5000,
            color: '#FF6347',
            minOpacity: 0.5,     // Darker range
            maxOpacity: 0.8      // Much darker
        }
    ]
};
</script>
```

Creates a gradient effect within each range using opacity.

### Multi-Color Desaturation

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'fruit',
    colorMapping: [
        {
            from: 500,
            to: 2500,
            color: ['orange', 'pink']  // Gradient from orange to pink
        },
        {
            from: 3000,
            to: 5000,
            color: ['green', 'red', 'blue']  // 3-color gradient
        }
    ]
};
</script>
```

## Unmapped Values

Handle values that don't fit any mapping rule by specifying a default color.

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'fruit',
    colorMapping: [
        { from: 500, to: 2500, color: '#FFA07A' },   // Mapped
        { from: 3000, to: 5000, color: '#FF6347' },  // Mapped
        { color: '#CCCCCC' }                          // Default for unmapped values
    ]
};

const rangeColorValuePath = 'count';
</script>
```

Items with values outside specified ranges use the default gray color.

## Legend Integration

Display legends to explain color mappings.

### Legend with Color Mapping

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :rangeColorValuePath='rangeColorValuePath'
        :weightValuePath='weightValuePath'
        :leafItemSettings='leafItemSettings'
        :legendSettings='legendSettings'>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapLegend } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const legendSettings = {
    visible: true,
    position: 'Top',        // Top, Bottom, Left, Right
    shape: 'Rectangle',     // Rectangle, Circle, Triangle
    width: '100%',
    height: '50px',
    mode: 'Default'         // Default, Interactive
};

const leafItemSettings = {
    labelPath: 'fruit',
    colorMapping: [
        { from: 500, to: 3000, color: '#FFA07A' },
        { from: 3000, to: 5000, color: '#FF6347' }
    ]
};

const rangeColorValuePath = 'count';

provide('treemap', [TreeMapLegend]);
</script>
```

## Common Color Mapping Patterns

### Performance Analysis

```javascript
const leafItemSettings = {
    colorMapping: [
        { from: 0, to: 60, color: '#dc3545' },     // Red - Poor
        { from: 60, to: 75, color: '#ffc107' },    // Yellow - Fair
        { from: 75, to: 90, color: '#28a745' },    // Green - Good
        { from: 90, to: 100, color: '#007bff' }    // Blue - Excellent
    ]
};
```

### Temperature Gradient

```javascript
const leafItemSettings = {
    colorMapping: [
        { from: -10, to: 0, color: '#4169E1' },    // Indigo - Cold
        { from: 0, to: 10, color: '#87CEEB' },     // Sky Blue
        { from: 10, to: 20, color: '#FFD700' },    // Gold - Warm
        { from: 20, to: 30, color: '#FF6347' },    // Tomato - Hot
        { from: 30, to: 50, color: '#DC143C' }     // Crimson - Very Hot
    ]
};
```

### Categorical Status

```javascript
const leafItemSettings = {
    colorMapping: [
        { value: 'Active', color: '#4caf50' },
        { value: 'Inactive', color: '#9e9e9e' },
        { value: 'Pending', color: '#ff9800' },
        { value: 'Failed', color: '#f44336' }
    ]
};
```

## Troubleshooting

**Issue:** Colors not appearing
- Verify `colorMapping` is in correct structure
- Check `rangeColorValuePath` or `equalColorValuePath` matches a data field
- Ensure data values are in range specified

**Issue:** All items same color
- If using palette, verify array has multiple colors
- Check color mapping ranges cover your data values
- Verify value fields exist and contain data

**Issue:** Legend not showing
- Inject `TreeMapLegend` module with `provide()`
- Set `legendSettings.visible = true`
- Check data has proper color mapping configuration
