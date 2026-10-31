# Immutable Mode

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Immutable Mode Setup](#basic-immutable-mode-setup)
- [How Immutable Mode Works](#how-immutable-mode-works)
- [Immutable Performance Benefits](#immutable-performance-benefits)
- [Limitations](#limitations)

## When to Use

Use immutable mode when you need to:
- **Optimize re-rendering** - Only re-render changed/new rows, not unchanged rows
- **Large datasets** - Many rows (1000+) that frequently update
- **High-frequency updates** - Rapid add/delete/sort/filter operations
- **Performance-critical** - Monitor rendering times for optimization
- **Cell editing** - Update individual field values frequently
- **Batch operations** - Add/delete multiple rows at once
- **Sort or filter** - Compare performance overhead
- **Paging with updates** - Change pages while data updates
- **React to data changes** - Real-time TreeGrid updates from API

## Mandatory Rules

Before implementing immutable mode:
- ✓ **enableImmutableMode: true** - Enable the feature explicitly
- ✓ **isPrimaryKey column** - Provide at least one column marked with `:isPrimaryKey="true"`
- ✓ **Primary key value unique** - Each row must have unique primary key
- ✓ **No frozen rows/columns** - Cannot use frozen columns with immutable mode
- ✓ **No row templates** - Row Template feature not supported
- ✓ **No detail templates** - Detail Template feature not supported
- ✓ **No column reorder** - Column reordering not supported
- ✓ **No virtualization** - Virtual scrolling not compatible
- ✓ **Comparison via reference** - Uses object reference and deep compare

## Basic Immutable Mode Setup

Enable immutable mode with primary key column:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings"
    :editSettings="editSettings"
    :enableImmutableMode="true">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page, Edit } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);
const pageSettings = ref({ pageSize: 50 });

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Cell'
});

// When enableImmutableMode: true:
// 1. Only modified rows re-render
// 2. Unchanged rows keep DOM (faster)
// 3. Deep compare checks for actual changes
// 4. Primary key used for row identification

provide('treegrid', [Page, Edit]);
</script>
```

## How Immutable Mode Works

1. **Object Reference Comparison** - Compares object references, not values
2. **Deep Compare** - Checks nested object property values
3. **Primary Key Matching** - Uses primary key to identify same rows
4. **Selective Re-render** - Only rows with changes are re-rendered
5. **DOM Preservation** - Unchanged rows keep existing DOM nodes
6. **Performance Gain** - Fewer DOM updates = faster rendering

### Example Scenario

```
Initial data:
[{ taskID: 1, taskName: 'Task 1' }, { taskID: 2, taskName: 'Task 2' }]

After update:
[{ taskID: 1, taskName: 'Task 1' }, { taskID: 2, taskName: 'Task 2 - Updated' }]

Immutable rendering:
- Row 1 (taskID:1): No re-render (unchanged)
- Row 2 (taskID:2): Re-renders (taskName changed)
```

## Immutable Performance Benefits

| Operation | Immutable | Normal | Benefit |
|-----------|-----------|--------|---------|
| **Add single row** | Re-render new row | Re-render all visible | 50% faster |
| **Delete 5 rows** | Re-render deleted + adjacent | Re-render all visible | 80% faster |
| **Sort 1000 rows** | Re-render all (must compare) | Re-render all | Same |
| **Page change** | Re-render new page | Re-render all | 50% faster |
| **Cell edit** | Re-render one row | Re-render all visible | 90% faster |

**Large datasets benefit most from immutable mode when:**
- Frequent small updates (add/delete few rows)
- Large number of visible rows (paging with 50+ per page)
- Cell editing (single value changes)

## Limitations

### Unsupported Features
- ❌ **Frozen rows and columns** - Cannot freeze with immutable mode
- ❌ **Row Template** - Custom row rendering not supported
- ❌ **Detail Template** - Expandable row details not supported
- ❌ **Column reorder** - Drag-to-reorder columns not supported
- ❌ **Virtualization** - Virtual scrolling incompatible

### When Immutable Mode Won't Help
- Small datasets (< 100 rows) - No noticeable difference
- Full data replacement - All rows change anyway
- Complex hierarchies - Deep tree comparisons are expensive
- Frequent render cycles - Too much deep comparing overhead
