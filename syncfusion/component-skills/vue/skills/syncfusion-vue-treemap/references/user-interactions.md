# User Interactions in Vue TreeMap

This guide covers selection, highlight modes, drill-down navigation, and event handling in the TreeMap component.

## Table of Contents
- [Overview](#overview)
- [Selection Settings](#selection-settings)
- [Highlight Settings](#highlight-settings)
- [Drill-Down Navigation](#drill-down-navigation)
- [Event Handling](#event-handling)
- [Interactive Combinations](#interactive-combinations)

## Overview

TreeMap provides interactive features for user engagement:

1. **Selection** - Click to select items with visual feedback
2. **Highlight** - Hover effect on items
3. **Drill-Down** - Click to navigate into hierarchy levels
4. **Events** - Respond to user interactions (click, hover, selection)

## Selection Settings

Selection allows users to click items and have them highlighted visually.

### Enable Basic Selection

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource'
            :levels='levels'
            :selectionSettings='selectionSettings'
            :weightValuePath='weightValuePath'
            :leafItemSettings='leafItemSettings'>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapSelection } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const dataSource = [
    { dataType: "Import", type: "Animal products", sales: 20839332874 },
    { dataType: "Import", type: "Chemical products", sales: 141637951510 },
    { dataType: "Export", type: "Animal products", sales: 15845503378 },
    { dataType: "Export", type: "Chemical products", sales: 136100054087 }
];

const weightValuePath = 'sales';

const levels = [
    { groupPath: 'dataType' },
    { groupPath: 'type' }
];

const leafItemSettings = {
    labelPath: 'type'
};

const selectionSettings = {
    enable: true,
    fill: '#58a0d3',           // Selected item color
    border: { 
        width: 0.3, 
        color: 'black' 
    },
    opacity: '1'
};

provide('treemap', [TreeMapSelection]);
</script>
```

### Selection Properties

| Property | Description | Example |
|----------|-------------|---------|
| `enable` | Enable/disable selection | `true`, `false` |
| `fill` | Color of selected item | `'#58a0d3'` |
| `border.color` | Border color when selected | `'black'`, `'#333'` |
| `border.width` | Border width when selected | `0.3`, `1`, `2` |
| `opacity` | Opacity of selected item | `'0.5'`, `'1'` |

### Selection Modes

```vue
<script setup>
// Single item selection (default)
const selectionSettings = {
    enable: true,
    mode: 'Default'
};

// Select multiple items
const selectionSettings = {
    enable: true,
    mode: 'Multiple'  // Hold Ctrl/Cmd to select multiple
};
</script>
```

## Highlight Settings

Highlight provides visual feedback when hovering over items without selecting them.

### Enable Hover Highlight

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource'
        :highlightSettings='highlightSettings'
        :leafItemSettings='leafItemSettings'
        ...>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapHighlight } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const highlightSettings = {
    enable: true,
    fill: '#e8f5e9',            // Light green on hover
    border: {
        color: '#4caf50',
        width: 1
    },
    opacity: '0.8'
};

provide('treemap', [TreeMapHighlight]);
</script>
```

### Highlight vs Selection

```vue
<script setup>
// Selection: Clicked state persists, visible until clicked elsewhere
const selectionSettings = {
    enable: true,
    fill: '#ff9800',             // Orange when clicked
    border: { width: 2 }
};

// Highlight: Temporary hover effect, disappears when mouse leaves
const highlightSettings = {
    enable: true,
    fill: '#ffeb3b',             // Yellow when hovering
    border: { width: 1 },
    opacity: '0.6'               // Semi-transparent
};

provide('treemap', [TreeMapSelection, TreeMapHighlight]);
</script>
```

## Drill-Down Navigation

Drill-down allows users to click on parent groups to navigate deeper into the hierarchy.

### Enable Drill-Down

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            id="treemap"
            :dataSource='dataSource'
            :palette='palette'
            :enableDrillDown='enableDrillDown'
            :weightValuePath='weightValuePath'
            :levels='levels'>
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
    { Category: 'Employees', Country: 'India', JobDescription: 'HR Executives', EmployeesCount: 30 },
    { Category: 'Employees', Country: 'Germany', JobDescription: 'Sales', JobGroup: 'Executive', EmployeesCount: 50 },
    // ... more records
];

const palette = ["#f44336", "#29b6f6", "#ab47bc", "#ffc107", "#5c6bc0", "#009688"];
const weightValuePath = 'EmployeesCount';
const enableDrillDown = true;

const levels = [
    { groupPath: 'Country', border: { color: 'black', width: 0.5 } },
    { groupPath: 'JobDescription', border: { color: 'black', width: 0.5 } },
    { groupPath: 'JobGroup', border: { color: 'black', width: 0.5 } }
];
</script>
```

**Drill-Down Behavior:**
- Click a group to zoom into that level
- Header shows breadcrumb/path navigation
- Click header or use back button to return to previous level
- Leaf items cannot be drilled (they're the deepest level)

### Drill-Down with Custom Navigation

```vue
<script setup>
import { ref } from 'vue';

const treemapInstance = ref(null);
const currentLevel = ref(0);

const drillUp = () => {
    if (treemapInstance.value) {
        treemapInstance.value.drillUp();
    }
};

const resetDrill = () => {
    while (currentLevel.value > 0) {
        treemapInstance.value.drillUp();
        currentLevel.value--;
    }
};
</script>

<template>
    <div>
        <button @click="drillUp">Go Back</button>
        <button @click="resetDrill">Reset to Top</button>
        <ejs-treemap 
            ref="treemapInstance"
            :enableDrillDown='true'
            ...>
        </ejs-treemap>
    </div>
</template>
```

## Event Handling

Respond to user interactions with event handlers.

### Common Events

```vue
<template>
    <ejs-treemap 
        @nodeClick='onNodeClick'
        @beforePrint='onBeforePrint'
        @drillStart='onDrillStart'
        @drillEnd='onDrillEnd'
        ...>
    </ejs-treemap>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const onNodeClick = (args) => {
    console.log('Clicked item:', args.currentItem);
    console.log('Item data:', args.data);
};

const onDrillStart = (args) => {
    console.log('Drilling into:', args.groupIndex);
};

const onDrillEnd = (args) => {
    console.log('Drill completed for level:', args.groupIndex);
};

const onBeforePrint = (args) => {
    console.log('Preparing to print');
};
</script>
```

### Item Selection Events

```vue
<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);

const onItemSelected = (args) => {
    selectedItems.value = args.selectedItems || [];
    console.log('Selected items count:', selectedItems.value.length);
};

const getSelectedData = () => {
    console.log('Currently selected:', selectedItems.value);
};
</script>

<template>
    <div>
        <button @click="getSelectedData">Show Selected Items</button>
        <p>Selected: {{ selectedItems.length }} items</p>
    </div>
</template>
```

### Event Handling for Level Changes

```vue
<script setup>
const onLevelChange = (args) => {
    console.log('Current level:', args.currentLevel);
    console.log('Level changed:', args.levelChanged);
    
    // Update UI based on level
    if (args.currentLevel === 0) {
        console.log('At root level');
    } else {
        console.log('At nested level:', args.currentLevel);
    }
};
</script>

<template>
    <ejs-treemap 
        @itemLevelChange='onLevelChange'
        ...>
    </ejs-treemap>
</template>
```

## Interactive Combinations

### Selection + Highlight + Drill-Down

```vue
<template>
    <div class="control_wrapper">
        <ejs-treemap 
            :dataSource='dataSource'
            :levels='levels'
            :leafItemSettings='leafItemSettings'
            :selectionSettings='selectionSettings'
            :highlightSettings='highlightSettings'
            :enableDrillDown='true'
            @nodeClick='handleNodeClick'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapSelection, TreeMapHighlight } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const selectionSettings = {
    enable: true,
    fill: '#ff9800',
    border: { width: 1, color: 'black' }
};

const highlightSettings = {
    enable: true,
    fill: '#ffeb3b',
    opacity: '0.6'
};

const handleNodeClick = (args) => {
    if (args.currentItem) {
        console.log('Clicked:', args.currentItem.label);
        console.log('Is group:', args.currentItem.isGroup);
    }
};

provide('treemap', [TreeMapSelection, TreeMapHighlight]);
</script>
```

**User Experience:**
1. Hover shows yellow highlight
2. Click selects with orange background
3. Double-click group drills into next level
4. Back navigation available in header

### Conditional Interactions

```vue
<script setup>
import { ref } from 'vue';

const isEditMode = ref(false);

const selectionSettings = ref({
    enable: true,
    fill: '#ff9800'
});

const highlightSettings = ref({
    enable: !isEditMode.value  // No highlight in edit mode
});

const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
    highlightSettings.value.enable = !isEditMode.value;
};
</script>

<template>
    <div>
        <button @click="toggleEditMode">
            {{ isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode' }}
        </button>
        <ejs-treemap 
            :selectionSettings='selectionSettings'
            :highlightSettings='highlightSettings'
            ...>
        </ejs-treemap>
    </div>
</template>
```

## Best Practices

1. **Module Injection** - Inject TreeMapSelection, TreeMapHighlight for these features
2. **Visual Distinction** - Use different colors for selection vs highlight
3. **Feedback** - Always provide visual feedback for interactions
4. **Drill-Down UX** - Limit hierarchy depth (3-4 levels max) for usability
5. **Events** - Use events for logging, analytics, or related UI updates
6. **Accessibility** - Ensure keyboard navigation support (Tab, Enter for drill-down)
7. **Performance** - With large datasets, consider debouncing selection events

## Troubleshooting

**Issue:** Selection not working
- Verify TreeMapSelection is injected with `provide()`
- Check `selectionSettings.enable = true`

**Issue:** Highlight not showing
- Ensure TreeMapHighlight is injected
- Verify `highlightSettings.enable = true`

**Issue:** Drill-down not working
- Check `enableDrillDown = true`
- Verify multi-level hierarchy exists (requires `levels` config)

**Issue:** Events not firing
- Verify event handler names match Vue conventions (@nodeClick, @drillStart)
- Check event handlers are properly defined in script
