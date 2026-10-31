# Data Binding in Vue TreeMap

This guide covers binding data sources, data structure requirements, and field mapping in the TreeMap component.

## Table of Contents
- [Overview](#overview)
- [Flat Data Structure](#flat-data-structure)
- [Hierarchical Data Structure](#hierarchical-data-structure)
- [Essential Field Mappings](#essential-field-mappings)
- [Using weightValuePath](#using-weightvaluepath)
- [Leaf Item Settings](#leaf-item-settings)
- [Dynamic Data Updates](#dynamic-data-updates)

## Overview

The TreeMap component uses the `dataSource` property to bind data. Data can be provided as:

1. **Flat collection** - Simple array of objects with a numeric field for sizing
2. **Hierarchical data** - Structured with grouping fields for multi-level displays

Choose flat collection for simple visualizations and hierarchical data for complex organizational structures.

## Flat Data Structure

Flat data is the simplest format - a single-level array where all items are at the same level.

### Basic Flat Data Example

```javascript
const dataSource = [
    { State: "USA", GDP: 17946 },
    { State: "China", GDP: 10866 },
    { State: "Japan", GDP: 4123 },
    { State: "Germany", GDP: 3355 }
];
```

### Complete Vue Component with Flat Data

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource' 
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { State: "United States", GDP: 17946, percentage: 11.08 },
    { State: "China", GDP: 10866, percentage: 28.42 },
    { State: "Japan", GDP: 4123, percentage: -30.78 },
    { State: "Germany", GDP: 3355, percentage: -5.19 },
    { State: "United Kingdom", GDP: 2848, percentage: 8.28 },
    { State: "France", GDP: 2421, percentage: -9.69 },
    { State: "India", GDP: 2073, percentage: 13.65 },
    { State: "Italy", GDP: 1814, percentage: -12.45 }
];

const weightValuePath = 'GDP';
const leafItemSettings = {
    labelPath: 'State'
};
</script>
```

Each rectangle size is proportional to the `GDP` value. Larger GDP values produce larger rectangles.

## Hierarchical Data Structure

Hierarchical data uses grouping fields to create multi-level TreeMaps. All data items must include every grouping field, even if some are undefined at leaf levels.

### Hierarchical Data Example

```javascript
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
    // ... more records with consistent field structure
];
```

### Hierarchical Vue Component

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
    { Category: 'Employees', Country: 'USA', JobDescription: 'Sales', JobGroup: 'Executive', EmployeesCount: 20 },
    { Category: 'Employees', Country: 'USA', JobDescription: 'Sales', JobGroup: 'Analyst', EmployeesCount: 30 },
    { Category: 'Employees', Country: 'USA', JobDescription: 'Marketing', EmployeesCount: 40 },
    { Category: 'Employees', Country: 'India', JobDescription: 'Technical', JobGroup: 'Testers', EmployeesCount: 100 },
    { Category: 'Employees', Country: 'Germany', JobDescription: 'Sales', JobGroup: 'Executive', EmployeesCount: 50 },
];

const weightValuePath = 'EmployeesCount';
const palette = ["#f44336", "#29b6f6", "#ab47bc"];

const levels = [
    { groupPath: 'Country', border: { color: 'black', width: 0.5 } },
    { groupPath: 'JobDescription', border: { color: 'black', width: 0.3 } },
    { groupPath: 'JobGroup', border: { color: 'gray', width: 0.2 } }
];
</script>
```

In this structure:
- Level 1 groups by `Country` (USA, India, Germany)
- Level 2 groups by `JobDescription` (Sales, Marketing, Technical)
- Level 3 groups by `JobGroup` (Executive, Analyst, Testers)
- Each lowest item sized by `EmployeesCount`

## Essential Field Mappings

### weightValuePath

The `weightValuePath` property specifies which field determines rectangle size. This is required.

```vue
<script setup>
// Size rectangles by GDP value
const weightValuePath = 'GDP';

// Or by employee count
const weightValuePath = 'EmployeesCount';

// Or by any numeric field
const weightValuePath = 'SalesAmount';
</script>

<template>
    <ejs-treemap :weightValuePath='weightValuePath' ...></ejs-treemap>
</template>
```

**Rules for weightValuePath:**
- Must reference an existing field in your data
- Field must contain numeric values
- Null or undefined values are treated as 0
- Negative values are displayed but with special behavior

### labelPath in leafItemSettings

The `labelPath` specifies which field displays as the label on each leaf rectangle.

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'State'  // Displays State name on rectangles
};
</script>

<template>
    <ejs-treemap :leafItemSettings='leafItemSettings' ...></ejs-treemap>
</template>
```

## Leaf Item Settings

The `leafItemSettings` object configures appearance of leaf-level items (lowest hierarchy level or flat data).

### Basic Leaf Configuration

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'StateName',           // Field for display labels
    fill: '#8ebfe2',                  // Rectangle background color
    labelPosition: 'Center',          // Label position: TopLeft, TopCenter, TopRight, CenterLeft, Center, CenterRight, BottomLeft, BottomCenter, BottomRight
    labelStyle: {
        color: 'white',
        size: '14px',
        fontFamily: 'Arial'
    },
    border: {
        color: 'black',
        width: 0.5
    }
};
</script>
```

### Leaf Configuration with Color Mapping

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'ProductName',
    colorMapping: [
        { from: 100, to: 500, color: '#FFA07A' },
        { from: 500, to: 1000, color: '#FF6347' },
        { from: 1000, to: 5000, color: '#DC143C' }
    ]
};
</script>
```

## Dynamic Data Updates

### Updating dataSource

To update TreeMap data dynamically, modify the `dataSource` array. Vue's reactivity will detect changes:

```vue
<template>
    <div>
        <button @click="addNewData">Add Data</button>
        <button @click="updateData">Update Data</button>
        <ejs-treemap :dataSource='dataSource' ...></ejs-treemap>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = ref([
    { State: "USA", GDP: 17946 },
    { State: "China", GDP: 10866 }
]);

const addNewData = () => {
    dataSource.value.push({ State: "India", GDP: 2073 });
};

const updateData = () => {
    dataSource.value[0].GDP = 18500;  // Update existing value
    dataSource.value = [...dataSource.value];  // Trigger reactivity
};
</script>
```

### Options API Version

```vue
<script>
export default {
    data() {
        return {
            dataSource: [
                { State: "USA", GDP: 17946 },
                { State: "China", GDP: 10866 }
            ]
        };
    },
    methods: {
        addNewData() {
            this.dataSource.push({ State: "India", GDP: 2073 });
        },
        updateData() {
            this.$set(this.dataSource[0], 'GDP', 18500);
        }
    }
}
</script>
```

### Bulk Data Refresh

For significant data changes, replace the entire array:

```javascript
// Complete data refresh
dataSource.value = newDataset;

// This triggers TreeMap to recalculate sizes and redraw
```

## Data Structure Best Practices

1. **Consistency** - All objects in `dataSource` should have the same field structure
2. **Numeric Values** - Ensure `weightValuePath` field contains numbers (not strings)
3. **Unique Identifiers** - Add an ID field for tracking items in events
4. **Null Handling** - Use 0 or omit missing numeric values rather than null
5. **Hierarchy Completeness** - In multi-level data, include all grouping fields even if some are undefined

## Troubleshooting Data Issues

**Issue:** Rectangles don't appear
- Check `weightValuePath` references correct field name
- Verify numeric values are valid numbers (not strings like "100")

**Issue:** Labels are blank
- Ensure `leafItemSettings.labelPath` matches an existing field name
- Check field contains values (not empty strings)

**Issue:** Hierarchy not showing properly
- Verify `levels` array has `groupPath` matching data field names
- Check data objects contain all grouping fields
- Confirm nested grouping makes logical sense

**Issue:** Data updates don't reflect
- Use proper Vue reactivity patterns (ref, $set, array replacement)
- For large datasets, use `:key` binding if applicable
