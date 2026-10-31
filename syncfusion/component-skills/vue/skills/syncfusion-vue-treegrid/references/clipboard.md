# Clipboard

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Clipboard Features](#basic-clipboard-features)
- [Copy via External Button](#copy-via-external-button)
- [Copy Hierarchy Modes](#copy-hierarchy-modes)
- [Paste Functionality](#paste-functionality)
- [AutoFill Feature](#autofill-feature)
- [Limitations](#limitations)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

## When to Use

Use clipboard features when you need to:
- **Copy data** - Copy rows/cells with Ctrl+C keyboard shortcut
- **Copy with headers** - Include column headers in clipboard
- **External copy buttons** - Programmatic copy via button click
- **Paste data** - Paste copied cells with Ctrl+V
- **AutoFill** - Drag to fill cells with pattern/values
- **Hierarchy copy** - Control parent/child inclusion in copy
- **Data portability** - Move data between sheets/apps
- **Quick data selection** - Copy specific cells or rows
- **Batch editing** - Use paste for bulk data entry


## Basic Clipboard Features

### Copy with Keyboard Shortcuts

Default keyboard shortcuts for clipboard:

| Shortcut | Action |
|----------|--------|
| Ctrl + C | Copy selected rows/cells |
| Ctrl + Shift + H | Copy selected rows/cells with header |
| Ctrl + V | Paste copied data |

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings"
    :selectionSettings="selectionSettings">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);
const pageSettings = ref({ pageSize: 10 });

// Select multiple cells for copy
const selectionSettings = ref({
  type: 'Multiple'  // Allow multiple row/cell selection
});

// User can now:
// 1. Select rows/cells
// 2. Press Ctrl+C to copy
// 3. Press Ctrl+Shift+H to copy with headers
// 4. Paste in Excel/other apps

provide('treegrid', [Page]);
</script>
```

## Copy via External Button

Programmatically copy selected data:

```vue
<template>
  <div>
    <button @click="handleCopy">Copy to Clipboard</button>
    <button @click="handleCopyWithHeader">Copy with Header</button>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      childMapping="subtasks"
      :treeColumnIndex="1"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :selectionSettings="selectionSettings">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);
const pageSettings = ref({ pageSize: 10 });

const selectionSettings = ref({
  type: 'Multiple'
});

// Copy selected rows/cells to clipboard
const handleCopy = () => {
  gridInstance.value.copy();
};

// Copy with column headers included
const handleCopyWithHeader = () => {
  gridInstance.value.copy(true);  // true = include header
};

provide('treegrid', [Page]);
</script>
```

## Copy Hierarchy Modes

Control whether parent and/or child records are included when copying:

```vue
<template>
  <div>
    <label>Copy Mode:</label>
    <select @change="onModeChange" v-model="selectedMode">
      <option value="Parent">Parent (with parents)</option>
      <option value="Child">Child (with children)</option>
      <option value="Both">Both (with parents and children)</option>
      <option value="None">None (selected only)</option>
    </select>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      childMapping="subtasks"
      :treeColumnIndex="1"
      :allowPaging="true"
      :copyHierarchyMode="selectedMode"
      :pageSettings="pageSettings"
      :selectionSettings="selectionSettings">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=160></e-column>
        <e-column field="startDate" headerText="Start Date" format="yMd" width=90 textAlign="Right"></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref([...]);
const selectedMode = ref('Parent');
const pageSettings = ref({ pageSize: 10 });

const selectionSettings = ref({
  type: 'Multiple'
});

const onModeChange = (e) => {
  // Mode updates copyHierarchyMode dynamically
  selectedMode.value = e.target.value;
  gridInstance.value.ej2Instances.copyHierarchyMode = e.target.value;
};

provide('treegrid', [Page]);
</script>
```

### Copy Hierarchy Mode Options

| Mode | Behavior | Clipboard Contains |
|------|----------|-------------------|
| `Parent` | **Default** - Includes selected + parent records | Selected rows + all parent rows |
| `Child` | Includes selected + child records | Selected rows + all child rows |
| `Both` | Includes selected + parents + children | Selected + parents + children rows |
| `None` | Only selected records | Only selected rows/cells, no hierarchy |

**Use Cases:**
- **Parent**: Copy subset with context (shows where it fits)
- **Child**: Copy task with subtasks
- **Both**: Copy complete hierarchy section
- **None**: Copy only selected, no extra rows

## Paste Functionality

Paste copied data back into grid:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :editSettings="editSettings"
    :pageSettings="pageSettings"
    :selectionSettings="selectionSettings"
    :toolbar="['Add', 'Update', 'Cancel']">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Edit, Page, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Batch'  // Required for paste to work
});

const pageSettings = ref({ pageSize: 10 });

const selectionSettings = ref({
  type: 'Multiple',
  mode: 'Cell',  // Required for paste
  cellSelectionMode: 'Box'  // Required for paste
});

// User can now:
// 1. Copy data (Ctrl+C from another app or grid)
// 2. Select destination cells
// 3. Paste with Ctrl+V
// 4. Click Update to save batch changes

provide('treegrid', [Edit, Page, Toolbar]);
</script>
```

### Paste Requirements

- ✓ `:editSettings="{ mode: 'Batch' }"` - Batch edit mode required
- ✓ `:selectionSettings="{ mode: 'Cell', cellSelectionMode: 'Box' }"` - Cell selection required
- ✓ `:isPrimaryKey="true"` on at least one column - For row identification
- ✓ Keyboard shortcut: Ctrl+V

## AutoFill Feature

Drag to fill cells with copied values or patterns:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :enableAutoFill="true"
    :editSettings="editSettings"
    :pageSettings="pageSettings"
    :selectionSettings="selectionSettings"
    :toolbar="['Add', 'Update', 'Cancel']">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Edit, Page, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Batch'  // Required for autofill
});

const pageSettings = ref({ pageSize: 10 });

const selectionSettings = ref({
  type: 'Multiple',
  mode: 'Cell',  // Required for autofill
  cellSelectionMode: 'Box'  // Required for autofill
});

// When enableAutoFill: true:
// 1. Select cells and drag down with autofill handle
// 2. Grid copies/extends values to target cells
// 3. Click Update to save changes

provide('treegrid', [Edit, Page, Toolbar]);
</script>
```

### AutoFill Requirements

- ✓ `:enableAutoFill="true"` - Enable autofill feature
- ✓ `:editSettings="{ mode: 'Batch' }"` - Batch edit mode required
- ✓ `:selectionSettings="{ mode: 'Cell', cellSelectionMode: 'Box' }"` - Cell selection required
- ✓ `:isPrimaryKey="true"` on at least one column

### AutoFill Limitations

- Only copies exact values (no parsing to different types)
- String->Number: displays as NaN
- String->Date: displays as empty
- Linear series/sequential patterns NOT supported
- Type conversion must be handled manually

## Limitations

### Copy Limitations
- Only current view records are copied (not all pages if paging is enabled)
- Large selection may impact performance
- Hierarchy modes include more data (test with real data sizes)

### Paste Limitations
- String values not auto-parsed to number/date types (NaN or empty result)
- Requires Batch edit mode enabled
- Must have valid cell selection target
- Data types must match column definitions

### AutoFill Limitations
- No sequential number generation (1, 2, 3...)
- No date pattern recognition (handles same values only)
- Type conversion must be done outside autofill
- String values keep copying same value
