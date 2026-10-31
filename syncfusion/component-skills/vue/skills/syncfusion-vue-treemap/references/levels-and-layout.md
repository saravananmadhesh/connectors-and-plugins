# Hierarchical Levels and Layout in Vue TreeMap

This guide covers creating multi-level hierarchies with grouping, layout algorithms, and level styling.

## Table of Contents
- [Overview](#overview)
- [Creating Levels with groupPath](#creating-levels-with-grouppath)
- [Layout Types](#layout-types)
- [Level Styling](#level-styling)
- [Leaf Item Configuration](#leaf-item-configuration)
- [Complex Hierarchies](#complex-hierarchies)

## Overview

The TreeMap organizes data into multiple levels using the `levels` property. Each level groups data by a specific field using the `groupPath` property. Multiple levels create a drill-down hierarchy where users can explore nested data progressively.

## Creating Levels with groupPath

### Two-Level Hierarchy

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :levels='levels'
            :palette='palette'>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { dataType: "Import", type: "Animal products", sales: 20839332874 },
    { dataType: "Import", type: "Chemical products", sales: 141637951510 },
    { dataType: "Export", type: "Animal products", sales: 15845503378 },
    { dataType: "Export", type: "Chemical products", sales: 136100054087 }
];

const weightValuePath = 'sales';
const palette = ["#f44336", "#29b6f6", "#ab47bc"];

const levels = [
    { 
        groupPath: 'dataType',
        fill: '#c5e2f7',
        headerStyle: { size: '16px' },
        headerAlignment: 'Center',
        groupGap: 5
    },
    { 
        groupPath: 'type',
        fill: '#a4d1f2',
        headerAlignment: 'Center',
        groupGap: 2
    }
];
</script>
```

In this example:
- Level 1 groups by `dataType` (Import/Export)
- Level 2 groups by `type` (Animal/Chemical products)
- Each group displays with specific fill colors and spacing

### Three-Level Hierarchy

```vue
<script setup>
const dataSource = [
    { 
        Category: 'Employees', 
        Country: 'USA', 
        JobDescription: 'Sales', 
        JobGroup: 'Executive',
        EmployeesCount: 20 
    },
    { 
        Category: 'Employees', 
        Country: 'USA', 
        JobDescription: 'Sales', 
        JobGroup: 'Analyst',
        EmployeesCount: 30 
    },
    { 
        Category: 'Employees', 
        Country: 'India', 
        JobDescription: 'Technical', 
        JobGroup: 'Testers',
        EmployeesCount: 100 
    },
    // ... more records
];

const levels = [
    { 
        groupPath: 'Country',
        border: { color: 'black', width: 0.5 },
        headerStyle: { size: '18px', fontWeight: 'bold' }
    },
    { 
        groupPath: 'JobDescription',
        border: { color: 'black', width: 0.3 },
        headerStyle: { size: '14px' }
    },
    { 
        groupPath: 'JobGroup',
        border: { color: 'gray', width: 0.2 }
    }
];

const weightValuePath = 'EmployeesCount';
const palette = ["#f44336", "#29b6f6", "#ab47bc", "#ffc107"];
</script>
```

This creates a four-level structure:
1. Category (grouping header)
2. Country (Level 1)
3. JobDescription (Level 2)
4. JobGroup (Level 3)
5. EmployeesCount (leaf values)

## Layout Types

The `layoutType` property controls how rectangles are arranged. Choose the layout that best represents your data relationships.

### Squarified Layout (Default)

Arranges rectangles based on aspect ratio for better visibility.

```vue
<script setup>
const layoutType = 'Squarified';
</script>

<template>
    <ejs-treemap :layoutType='layoutType' ...></ejs-treemap>
</template>
```

**Use when:**
- Visual appeal and readability are important
- Comparing multiple values simultaneously
- Data distribution is varied (large and small values mixed)

### SliceAndDiceVertical Layout

Creates vertical strips with items stacked vertically.

```vue
<script setup>
const layoutType = 'SliceAndDiceVertical';
</script>
```

**Characteristics:**
- Items arranged in vertical strips
- High aspect ratio (narrow, tall rectangles)
- Preserves vertical order

**Use when:**
- Data needs to be read left-to-right
- Items should maintain vertical alignment
- Timeline or sequence representation

### SliceAndDiceHorizontal Layout

Creates horizontal strips with items arranged horizontally.

```vue
<script setup>
const layoutType = 'SliceAndDiceHorizontal';
</script>
```

**Characteristics:**
- Items arranged in horizontal strips
- High aspect ratio (wide, short rectangles)
- Preserves horizontal order

**Use when:**
- Data naturally reads top-to-bottom
- Items should maintain horizontal sequence
- Category progression from left to right

### SliceAndDiceAuto Layout

Automatically alternates between horizontal and vertical slicing for optimal arrangement.

```vue
<script setup>
const layoutType = 'SliceAndDiceAuto';
</script>
```

**Characteristics:**
- Combines vertical and horizontal slicing
- Adapts to data distribution
- Generally produces balanced results

**Use when:**
- You want automatic optimization
- Data distribution is unpredictable
- Mixed content with varying values

### Layout Comparison Example

```vue
<template>
    <div>
        <select v-model="selectedLayout">
            <option value="Squarified">Squarified</option>
            <option value="SliceAndDiceVertical">Slice & Dice Vertical</option>
            <option value="SliceAndDiceHorizontal">Slice & Dice Horizontal</option>
            <option value="SliceAndDiceAuto">Slice & Dice Auto</option>
        </select>
        <ejs-treemap :layoutType='selectedLayout' ...></ejs-treemap>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedLayout = ref('Squarified');
</script>
```

## Level Styling

Each level can have distinct visual styling through the `levels` array configuration.

### Level Color and Appearance

```vue
<script setup>
const levels = [
    { 
        groupPath: 'Region',
        fill: '#e3f2fd',  // Light blue background
        headerStyle: {
            size: '18px',
            fontWeight: 'bold',
            color: '#1976d2'
        },
        border: {
            color: '#1976d2',
            width: 1.5
        },
        groupGap: 5
    },
    { 
        groupPath: 'Country',
        fill: '#bbdefb',  // Slightly darker blue
        headerStyle: {
            size: '14px',
            fontWeight: 'normal',
            color: '#0d47a1'
        },
        border: {
            color: '#0d47a1',
            width: 1
        },
        groupGap: 2
    }
];
</script>
```

### Level Header Properties

| Property | Description | Example |
|----------|-------------|---------|
| `groupPath` | Field name for grouping (required) | `'Country'` |
| `fill` | Background color for this level | `'#c5e2f7'` |
| `headerStyle.size` | Header text size | `'16px'` |
| `headerStyle.fontWeight` | Header font weight | `'bold'`, `'normal'` |
| `headerStyle.color` | Header text color | `'#1976d2'` |
| `border.color` | Border color | `'black'` |
| `border.width` | Border width | `0.5`, `1`, `1.5` |
| `groupGap` | Space between groups | `2`, `5`, `10` |
| `headerAlignment` | Header text alignment | `'Center'`, `'Left'`, `'Right'` |

### Dynamic Level Styling Based on Values

```vue
<script setup>
const levels = [
    { 
        groupPath: 'Category',
        fill: '#ffecb3',  // Yellow for categories
        border: { color: 'orange', width: 1 }
    }
];

// The palette prop also affects level colors when not specified
const palette = ["#f44336", "#29b6f6", "#ab47bc", "#ffc107"];
</script>
```

## Leaf Item Configuration

Leaf items (lowest level data items) are configured with `leafItemSettings`.

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ProductName',
    labelPosition: 'Center',
    fill: '#8ebfe2',
    labelStyle: {
        size: '12px',
        color: 'white'
    },
    border: {
        color: 'white',
        width: 1
    }
};
</script>
```

### Leaf Label Positions

```
TopLeft         TopCenter         TopRight
CenterLeft      Center            CenterRight
BottomLeft      BottomCenter      BottomRight
```

Example positioning:

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ItemName',
    labelPosition: 'TopCenter'  // Position at top center
};
</script>
```

## Complex Hierarchies

### Four-Level Hierarchy with Mixed Styling

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource' 
        :weightValuePath='weightValuePath'
        :levels='levels'
        :leafItemSettings='leafItemSettings'
        :layoutType='layoutType'
        :palette='palette'>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const layoutType = 'Squarified';
const palette = ["#ef5350", "#66bb6a", "#42a5f5", "#ffa726"];

const levels = [
    { 
        groupPath: 'Continent',
        fill: '#ffebee',
        headerAlignment: 'Center',
        headerStyle: { size: '16px', fontWeight: 'bold' }
    },
    { 
        groupPath: 'Country',
        fill: '#fff3e0',
        headerAlignment: 'Center',
        headerStyle: { size: '13px' }
    },
    { 
        groupPath: 'State',
        fill: '#f3e5f5',
        headerAlignment: 'Center',
        headerStyle: { size: '11px' }
    }
];

const leafItemSettings = {
    labelPath: 'City',
    fill: '#e8f5e9',
    labelPosition: 'Center',
    border: { color: '#4caf50', width: 0.5 }
};

const weightValuePath = 'Population';
const dataSource = [
    // Structure: Continent, Country, State, City, Population
    { Continent: 'Asia', Country: 'India', State: 'Maharashtra', City: 'Mumbai', Population: 20961472 },
    { Continent: 'Asia', Country: 'India', State: 'Gujarat', City: 'Ahmedabad', Population: 8450570 },
    { Continent: 'Asia', Country: 'China', State: 'Shanghai', City: 'Shanghai', Population: 24256800 },
    // ... more records
];
</script>
```

### Dynamic Level Adjustment

```vue
<script setup>
import { ref } from 'vue';

const showDetailLevel = ref(false);

const levels = ref([
    { groupPath: 'Region' },
    { groupPath: 'Country' }
]);

const addDetailLevel = () => {
    if (showDetailLevel.value) return;
    levels.value.push({ groupPath: 'City' });
    showDetailLevel.value = true;
};

const removeDetailLevel = () => {
    if (!showDetailLevel.value) return;
    levels.value.pop();
    showDetailLevel.value = false;
};
</script>

<template>
    <div>
        <button @click="addDetailLevel" :disabled="showDetailLevel">Add City Level</button>
        <button @click="removeDetailLevel" :disabled="!showDetailLevel">Remove City Level</button>
        <ejs-treemap :levels='levels' ...></ejs-treemap>
    </div>
</template>
```

## Best Practices

1. **Limit Hierarchy Depth** - Keep to 3-4 levels for usability (more levels become confusing)
2. **Progressive Disclosure** - Use drill-down (enableDrillDown) for more than 2 levels
3. **Clear Color Distinction** - Use distinctly different colors for each level
4. **Consistent Spacing** - Apply consistent `groupGap` values for visual coherence
5. **Readable Headers** - Ensure header text size increases for higher levels
6. **Data Validation** - Verify all items have complete hierarchy data
