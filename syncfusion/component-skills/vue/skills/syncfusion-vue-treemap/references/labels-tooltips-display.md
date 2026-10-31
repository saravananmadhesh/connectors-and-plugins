# Labels, Tooltips, and Data Display in Vue TreeMap

This guide covers configuring data labels, tooltip templates, label positioning, and customizing data display in the TreeMap.

## Table of Contents
- [Overview](#overview)
- [Data Labels](#data-labels)
- [Label Positioning](#label-positioning)
- [Label Styling](#label-styling)
- [Tooltips](#tooltips)
- [Tooltip Templates](#tooltip-templates)
- [Display Control](#display-control)

## Overview

The TreeMap displays hierarchical data using:

1. **Labels** - Text displayed directly on rectangles (item names, values)
2. **Tooltips** - Information shown on hover (detailed data, descriptions)
3. **Headers** - Group names at parent levels (auto-generated from groupPath)

Each level can have unique label and display configurations.

## Data Labels

Labels display item names or values directly on rectangles.

### Basic Label Configuration

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource'
            :leafItemSettings='leafItemSettings'
            :levels='levels'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { State: "Brazil", Count: 25 },
    { State: "Colombia", Count: 12 },
    { State: "Argentina", Count: 9 },
];

const leafItemSettings = {
    labelPath: 'State',              // Field to display as label
    labelStyle: {
        color: 'white',              // Label text color
        size: '14px',
        fontFamily: 'Arial',
        fontWeight: 'bold'
    }
};
</script>
```

**labelPath Options:**
- Must match a field name in your data
- Commonly uses descriptive fields (name, title, label)
- Can only display one field per level

### Multi-Field Label Display

To display multiple fields, create a computed label field in data:

```vue
<script setup>
// Pre-process data to create display field
const dataSource = [
    { 
        State: "Brazil",
        Count: 25,
        displayLabel: "Brazil (25)"  // Combined field
    },
    { 
        State: "Colombia",
        Count: 12,
        displayLabel: "Colombia (12)"
    }
];

const leafItemSettings = {
    labelPath: 'displayLabel'  // Use combined field
};
</script>
```

Or use a custom formatter:

```javascript
// Before rendering, add display field to all items
dataSource.forEach(item => {
    item.displayLabel = `${item.State} (${item.Count})`;
});
```

## Label Positioning

Control where labels appear on rectangles using `labelPosition`.

### Label Position Options

Available positions form a 3x3 grid:

```
TopLeft         TopCenter         TopRight
CenterLeft      Center            CenterRight
BottomLeft      BottomCenter      BottomRight
```

### Position Example

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ProductName',
    labelPosition: 'Center'  // Centered on rectangle
};
</script>

<template>
    <ejs-treemap :leafItemSettings='leafItemSettings' ...></ejs-treemap>
</template>
```

### Layout Positioning Guide

```vue
<script setup>
// Top positioning
const leafItemSettings = {
    labelPosition: 'TopCenter'  // Title-like display
};

// Center positioning (most common)
const leafItemSettings = {
    labelPosition: 'Center'     // Balanced, always visible
};

// Bottom positioning
const leafItemSettings = {
    labelPosition: 'BottomCenter'  // Footer-like display
};
</script>
```

### Position for Different Content

```vue
<script setup>
// Category names - Top
const categoryLabels = {
    labelPath: 'CategoryName',
    labelPosition: 'TopCenter'
};

// Large values - Center
const valueLabels = {
    labelPath: 'Value',
    labelPosition: 'Center'
};

// Description text - Bottom
const descriptionLabels = {
    labelPath: 'Description',
    labelPosition: 'BottomLeft'
};
</script>
```

## Label Styling

Customize label appearance with styles.

### Comprehensive Label Styling

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ProductName',
    labelStyle: {
        color: '#ffffff',           // Text color
        size: '14px',               // Font size
        fontFamily: 'Segoe UI',     // Font family
        fontWeight: 'bold',         // bold, normal, 600, etc.
        fontStyle: 'normal',        // normal, italic
        opacity: '1'                // 0 (transparent) to 1 (opaque)
    },
    labelPosition: 'Center'
};
</script>
```

### Conditional Styling (Via Data)

Pre-process data with style indicators:

```vue
<script setup>
const dataSource = [
    { 
        Name: "Apple",
        Count: 5000,
        displayLabel: "Apple\n5000",
        textColor: '#ff5722'
    },
    { 
        Name: "Mango",
        Count: 3000,
        displayLabel: "Mango\n3000",
        textColor: '#4caf50'
    }
];

// Note: TreeMap labelStyle is static, cannot bind per-item styles
// For different colors per item, use data visualization with colorMapping
</script>
```

### Font Size Responsiveness

```vue
<script setup>
// Large rectangles - larger text
const leafItemSettings = {
    labelPath: 'LargeName',
    labelStyle: {
        size: '18px'  // Visible on large items
    }
};

// Small rectangles - smaller text
const leafItemSettings = {
    labelPath: 'SmallName',
    labelStyle: {
        size: '10px'  // Fits small rectangles
    }
};
</script>
```

## Tooltips

Tooltips display additional information when hovering over items.

### Enable Basic Tooltips

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :tooltipSettings='tooltipSettings'
        ...>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapTooltip } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const tooltipSettings = {
    visible: true,
    fill: '#ffffcc',                // Background color
    border: {
        color: '#cccccc',
        width: 1
    }
};

provide('treemap', [TreeMapTooltip]);
</script>
```

### Tooltip Content Options

#### Show Item Label

```vue
<script setup>
const tooltipSettings = {
    visible: true,
    format: '${label}'  // Shows the label field
};
</script>
```

#### Show Value

```vue
<script setup>
const tooltipSettings = {
    visible: true,
    format: '${value}'  // Shows the value from weightValuePath
};
</script>
```

#### Custom Format

```vue
<script setup>
const tooltipSettings = {
    visible: true,
    format: '${label}: ${value}'  // Combines label and value
};

// Example output: "Apple: 5000"
</script>
```

#### Multi-Line Format

```vue
<script setup>
const tooltipSettings = {
    visible: true,
    format: '<b>${label}</b><br/>Count: ${value}<br/>Percentage: ${percentage}%'
};
</script>
```

## Tooltip Templates

Use custom templates for complete control over tooltip display.

### Template-Based Tooltip

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :tooltipSettings='tooltipSettings'
        ...>
        <template v-slot:tooltipTemplate="{ data }">
            <div class="tooltip-content">
                <p><strong>{{ data.label }}</strong></p>
                <p>Value: {{ data.value }}</p>
                <p>ID: {{ data.id }}</p>
            </div>
        </template>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapTooltip } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const dataSource = [
    { name: "Item1", value: 100, id: "A001" },
    { name: "Item2", value: 200, id: "A002" }
];

const tooltipSettings = {
    visible: true,
    template: '#tooltipTemplate'
};

provide('treemap', [TreeMapTooltip]);
</script>

<style scoped>
.tooltip-content {
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 12px;
}
</style>
```

### HTML Template Tooltip

```vue
<script setup>
const tooltipSettings = {
    visible: true,
    format: '<table><tr><td>Name:</td><td>${label}</td></tr><tr><td>Value:</td><td>${value}</td></tr></table>'
};
</script>
```

## Display Control

Control when and what information displays.

### Show/Hide Labels

```vue
<script setup>
import { ref } from 'vue';

const showLabels = ref(true);

const leafItemSettings = ref({
    labelPath: showLabels.value ? 'ProductName' : '',
    labelStyle: {
        opacity: showLabels.value ? '1' : '0'
    }
});

const toggleLabels = () => {
    showLabels.value = !showLabels.value;
};
</script>

<template>
    <div>
        <button @click="toggleLabels">Toggle Labels</button>
        <ejs-treemap :leafItemSettings='leafItemSettings' ...></ejs-treemap>
    </div>
</template>
```

### Label Overflow Handling

For long text, TreeMap automatically truncates labels. Control with `labelPosition`:

```vue
<script setup>
// If text is too long for center position, try top/bottom
const leafItemSettings = {
    labelPath: 'LongProductName',
    labelPosition: 'TopCenter',  // More space at top
    labelStyle: {
        size: '11px'  // Smaller font helps fit
    }
};
</script>
```

### Per-Level Display Settings

```vue
<script setup>
// Headers for groups
const levels = [
    {
        groupPath: 'Country',
        headerAlignment: 'Center',
        headerStyle: { size: '16px', fontWeight: 'bold' },
        groupGap: 5
    },
    {
        groupPath: 'City',
        headerAlignment: 'Left',
        headerStyle: { size: '12px' },
        groupGap: 2
    }
];

// Specific labels for leaf level
const leafItemSettings = {
    labelPath: 'ProductName',
    labelPosition: 'Center',
    labelStyle: { size: '12px' }
};
</script>
```

## Common Display Patterns

### Dashboard Display

```vue
<script setup>
// Summary numbers with tooltips
const leafItemSettings = {
    labelPath: 'MetricName',
    labelStyle: {
        color: '#333',
        size: '12px',
        fontWeight: 'bold'
    },
    labelPosition: 'TopCenter'
};

const tooltipSettings = {
    visible: true,
    format: '<b>${label}</b><br/>Value: $${value:n0}<br/>% of Total: ${percentage}%'
};
</script>
```

### Minimal Display

```vue
<script setup>
// Show only values, no labels
const leafItemSettings = {
    labelPath: 'value',  // Display numeric value
    labelStyle: {
        size: '10px',
        color: '#999'
    }
};

const tooltipSettings = {
    visible: true,
    format: '${label}'  // Show name on hover
};
</script>
```

### Detailed Information

```vue
<script setup>
// Rich display with styled labels
const leafItemSettings = {
    labelPath: 'displayLabel',  // Pre-formatted label
    labelPosition: 'Center',
    labelStyle: {
        color: '#ffffff',
        size: '14px',
        fontWeight: 'bold'
    }
};

const tooltipSettings = {
    visible: true,
    format: '<div><strong>${label}</strong><br/>Details: ${details}<br/>Updated: ${lastUpdate}</div>'
};
</script>
```

## Troubleshooting

**Issue:** Labels not showing
- Verify `leafItemSettings.labelPath` matches a data field
- Check data contains values for that field
- Ensure rectangles are large enough (small items may hide labels)

**Issue:** Labels overlapping or cut off
- Try different `labelPosition` values
- Reduce `labelStyle.size`
- Check data has shorter values for small rectangles

**Issue:** Tooltips not appearing
- Inject TreeMapTooltip with `provide()`
- Verify `tooltipSettings.visible = true`
- Check hover works on actual TreeMap component

**Issue:** Format string not working
- Verify field names in format string match data fields
- Use proper syntax: `${fieldName}`
- Check field names are case-sensitive
