# Frozen Columns

## Table of Contents
- [Freeze Particular Columns](#freeze-particular-columns)
- [Freeze Direction](#freeze-direction)
- [Freeze Rows and Columns Together](#freeze-rows-and-columns-together)
- [Limitations](#limitations)

---

## Freeze Particular Columns

Use the `isFrozen` property on columns to keep specific columns always visible during horizontal scrolling:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    height="310"
    childMapping="subtasks"
    :allowSelection="false">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="230" isFrozen="true"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Freeze, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource';

const data = sampleData;

provide('treegrid', [Freeze]);  // Module injection for frozen support
</script>
```

**Result:** taskName and startDate columns remain frozen on the left while other columns can be scrolled.

---

## Freeze Direction

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    height="310"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowSelection="false">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="230" freeze="Left"></e-column>
      <e-column field="priority" headerText="Priority" width="120" freeze="Right"></e-column>
      <e-column field="approved" headerText="Approved" width="110" textAlign="Left"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Freeze, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource';

const data = sampleData;

provide('treegrid', [Freeze]);  // Module injection required
</script>
```

**Freeze Direction Types:**
- `Left`: Freezes column on the left side
- `Right`: Freezes column on the right side

**Important:** The `freeze` property (directional freezing) is **NOT compatible** with `isFrozen` and `frozenColumns` properties. Use one approach or the other, not both.

---

## Freeze Rows and Columns Together

You can freeze both rows and columns simultaneously using `frozenRows` and `frozenColumns` properties:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    height="310"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :frozenColumns="2"
    :frozenRows="3">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, Freeze, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource';

const data = sampleData;

provide('treegrid', [Freeze]);
</script>
```

**Configuration:**
- `frozenColumns="2"`: First 2 columns stay fixed on left
- `frozenRows="3"`: First 3 rows stay fixed on top
- When scrolling, the frozen intersection remains visible

**Use Case:** Keep header rows and ID column visible while scrolling through large datasets with many columns and rows.

---

## Limitations

The following features are **NOT compatible** with frozen columns and rows:

| Feature | Reason | Impact |
|---------|--------|--------|
| **Row Template** | Custom row rendering conflicts with frozen pane | Cannot use custom rowTemplate |
| **Detail Template** | Child rows incompatible with fixed layout | Cannot expand detail rows |
| **Cell Editing** | Edit mode conflicts with frozen positioning | Cannot edit cells in-place |
| **Column Reordering** | (Freeze Direction only) Reordering breaks alignment | Can't reorder columns in stacked headers |
| **Infinite Scroll** | (Freeze Direction only) Cache mode not supported | Cannot use infinite scroll with directional freeze |

### Incompatibility Examples

**❌ Cannot use Row Template with Frozen:**
```vue
<!-- DON'T DO THIS -->
<ejs-treegrid 
  :frozenColumns="2"
  :rowTemplate="customTemplate">  <!-- NOT supported with frozen -->
</ejs-treegrid>
```

**❌ Cannot use Cell Editing with Frozen:**
```vue
<!-- DON'T DO THIS -->
<ejs-treegrid 
  :frozenColumns="2">
  <e-column field="taskName" editType="TextBox"></e-column>  <!-- NOT compatible -->
</ejs-treegrid>
```

**✅ Sorting and Filtering ARE Compatible:**
```vue
<!-- This is fine -->
<ejs-treegrid 
  :frozenColumns="2"
  :allowSorting="true"
  :allowFiltering="true">  <!-- These work with frozen -->
</ejs-treegrid>
```

---
