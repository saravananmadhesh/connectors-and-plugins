# Modules Reference

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Core Modules](#core-modules)
- [Feature Specific Module Sets](#feature-fpecific-module-sets)
- [Complete Module List](#complete-module-list)

## When to Use

Import modules when you need:
- **Feature enablement** - Only load what's needed
- **Code splitting** - Reduce bundle size
- **Lazy loading** - Load on demand
- **Feature bundling** - Group related features
- **Dependency management** - Track requirements
- **Tree shaking** - Remove unused code
- **Performance tuning** - Minimal overhead
- **Selective functionality** - Precise feature control

## Mandatory Rules

Before using modules:
- ✓ **Explicit Imports**: Import only needed modules
- ✓ **provide() Call**: Supply modules to grid
- ✓ **camelCase Fields**: Use throughout
- ✓ **Vue Template Columns**: Use `<e-column>` elements
- ✓ **No Circular Imports**: Import dependencies first
- ✓ **Correct Order**: Some modules depend on others
- ✓ **Check Conflicts**: Some features may conflict
- ✓ **Test Bundle Size**: Verify tree shaking works

## Core Modules

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowPaging="true"
    :allowSorting="true"
    :allowFiltering="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=100></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="priority" headerText="Priority" width=100></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page, Sort, Filter } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Provide only needed modules
provide('treegrid', [Page, Sort, Filter]);
</script>
```


## Feature Specific Module Sets

### Read-Only Viewer
```javascript
const modules = [];
// No modules needed
```

### CRUD Grid
```javascript
const modules = [
  Page,      // Navigation
  Edit,      // Editing
  Selection, // Row selection
  Toolbar    // Add/Edit/Delete buttons
];
```

### Analytics Dashboard
```javascript
const modules = [
  Page,          // Paging
  Sort,          // Sorting
  Filter,        // Filtering
  Aggregate,     // Totals
  ExcelExport,   // Export
  Selection      // Row selection
];
```

### Reporting Engine
```javascript
const modules = [
  Page,           // Paging
  Sort,           // Sorting
  Filter,         // Filtering
  ExcelExport,    // Excel export
  PdfExport,      // PDF export
  Aggregate,      // Calculations
  Selection,      // Row selection
  ColumnChooser   // Column visibility
];
```


## Complete Module List

| Module | Purpose | Dependencies |
|--------|---------|--------------|
| Page | Paging | None |
| Sort | Column sorting | None |
| Filter | Row filtering | None |
| Edit | Cell/row editing | Recommended: Page |
| Selection | Row/cell selection | None |
| ColumnMenu | Column context menu | Recommended: Sort, Filter |
| ColumnChooser | Column visibility | None |
| Toolbar | Toolbar with buttons | None |
| ExcelExport | Export to Excel | None |
| PdfExport | Export to PDF | None |
| Resize | Column resizing | None |
| Reorder | Column reordering | None |
| VirtualScroll | Virtual scrolling | None |
| DetailRow | Master-detail | None |
| CommandColumn | Action buttons | None |
| ContextMenu | Right-click menu | None |
| Aggregate | Totals/summaries | None |
| GroupSettings | Grouping | Recommended: Sort |
| Freeze | Freeze columns/rows | None |
| RowDD | Drag and drop | None |
