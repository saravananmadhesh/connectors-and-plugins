# Grid Feature Modules

## Table of Contents
- [When to Use](#when-to-use)
- [What Are Modules](#what-are-modules)
- [Complete Module List](#complete-module-list)
- [Default Injected Modules](#default-injected-modules)
- [Module Injection Examples](#module-injection-examples)

## When to Use

This reference explains all available Grid modules and how to inject them. Use this when:
- You need to enable specific Grid features
- You want to understand module dependencies
- You're importing modules in your Grid component
- You need to know which modules are injected by default
- You're optimizing bundle size by selectively importing modules

## What Are Modules

Modules are feature extensions for the Vue Grid. To use a Grid feature, you must inject its corresponding module into the Grid's `provide` section. This modular architecture allows you to include only the features you need.

---

## Complete Module List

### Core Data Operations

**Page**
- Purpose: Enables paging feature to view Grid records in pages
- When Needed: When displaying large datasets and want pagination controls
- Default: No (must be manually injected)

**Sort**
- Purpose: Enables sorting feature to order records by column
- When Needed: When users should be able to sort data by clicking headers
- Default: No (must be manually injected)

**Filter**
- Purpose: Enables filtering feature to view reduced records based on criteria
- When Needed: When users need to filter data using filter bar or menu
- Default: No (must be manually injected)

**Group**
- Purpose: Enables grouping feature to view Grid records in grouped view
- When Needed: When users should organize data into logical groups
- Default: No (must be manually injected)

**Search**
- Purpose: Enables search feature to find records globally
- When Needed: When providing quick text search functionality
- Default: **Yes (automatically injected)**

**Selection**
- Purpose: Enables selection feature for rows, cells, or columns
- When Needed: Always available for interactive record selection
- Default: **Yes (automatically injected)**

**Scroll**
- Purpose: Enables scrolling feature for Grid navigation
- When Needed: Always needed for normal Grid interaction
- Default: **Yes (automatically injected)**

### Editing & Data Modification

**Edit**
- Purpose: Enables inline, dialog, batch, and template editing modes
- When Needed: When users should be able to create, update, or delete records
- Default: No (must be manually injected)

**CommandColumn**
- Purpose: Enables command column with edit/delete/save/cancel buttons
- When Needed: When using Edit module and want built-in command buttons
- Default: No (must be manually injected)

**ForeignKey**
- Purpose: Enables foreign key column relationships
- When Needed: When displaying data from related tables with lookup values
- Default: No (must be manually injected)

### Templates & Display

**DetailRow**
- Purpose: Enables detail template feature to show expanded row details
- When Needed: When displaying hierarchical or additional data per row
- Default: No (must be manually injected)

**ColumnChooser**
- Purpose: Enables column chooser feature to show/hide columns dynamically
- When Needed: When users should customize visible columns
- Default: No (must be manually injected)

**ColumnMenu**
- Purpose: Enables column menu with sorting, filtering, and column options
- When Needed: When providing column-level context menu
- Default: No (must be manually injected)

### Column Organization

**Freeze**
- Purpose: Enables frozen rows and frozen columns feature
- When Needed: When certain rows or columns should remain visible during scrolling
- Default: No (must be manually injected)

**Reorder**
- Purpose: Enables column reorder feature to drag columns to new positions
- When Needed: When users should rearrange column order
- Default: No (must be manually injected)

**Resize**
- Purpose: Enables column resize feature to adjust column widths
- When Needed: When users should adjust column widths dynamically
- Default: No (must be manually injected)

### Row Operations

**RowDD** (Row Drag and Drop)
- Purpose: Enables row drag and drop feature to reorder rows
- When Needed: When users should rearrange row order by dragging
- Default: No (must be manually injected)

**DetailRow**
- Purpose: Enables detail template feature (also for hierarchical data)
- When Needed: When showing expandable row details
- Default: No (must be manually injected)

### Data Aggregation

**Aggregate**
- Purpose: Enables aggregate feature for summaries (Sum, Average, Count, etc.)
- When Needed: When displaying summary calculations in footer or group headers
- Default: No (must be manually injected)

### UI Features

**Toolbar**
- Purpose: Enables toolbar feature with built-in and custom tools
- When Needed: When displaying toolbar with export, refresh, or custom buttons
- Default: No (must be manually injected)

**ContextMenu**
- Purpose: Enables context menu (right-click menu) for Grid rows/cells
- When Needed: When providing right-click actions
- Default: No (must be manually injected)

**Print**
- Purpose: Enables print feature to print Grid data
- When Needed: When users should print Grid records
- Default: **Yes (automatically injected)**

### Export & Output

**ExcelExport**
- Purpose: Enables export to Excel format
- When Needed: When users should download Grid as Excel file
- Default: No (must be manually injected)

**PdfExport**
- Purpose: Enables export to PDF format
- When Needed: When users should download Grid as PDF file
- Default: No (must be manually injected)

### Performance Optimization

**VirtualScroll**
- Purpose: Enables virtual scrolling to render only visible rows
- When Needed: When displaying very large datasets (1000+ rows) for better performance
- Default: No (must be manually injected)

---

## Default Injected Modules

These modules are automatically available without manual injection:

- **Search**: Enables global search functionality
- **Selection**: Enables row/cell/column selection
- **Scroll**: Enables scrolling navigation
- **Print**: Enables print feature

All other modules must be explicitly injected to use their features.

---

## Module Injection Examples

### Vue 3 (Composition API)

```vue
<script setup>
import { provide } from "vue";
import {
  GridComponent as EjsGrid,
  Page,
  Sort,
  Filter,
  Group,
  Edit,
  Toolbar,
  ExcelExport,
  PdfExport,
  Aggregate
} from "@syncfusion/ej2-vue-grids";

// Inject all required modules
provide('grid', [Page, Sort, Filter, Group, Edit, Toolbar, ExcelExport, PdfExport, Aggregate]);
</script>

<template>
  <ejs-grid :dataSource="data" :allowPaging="true" :allowSorting="true" :allowFiltering="true">
    <!-- columns and other configuration -->
  </ejs-grid>
</template>
```



### Minimal Module Injection

For basic Grid functionality with just paging and sorting:

```vue
<script setup>
import { provide } from "vue";
import { GridComponent as EjsGrid, Page, Sort } from "@syncfusion/ej2-vue-grids";

provide('grid', [Page, Sort]);
</script>
```

### Complete Feature-Rich Setup

For a full-featured Grid:

```vue
<script setup>
import { provide } from "vue";
import {
  GridComponent as EjsGrid,
  Page,
  Sort,
  Filter,
  Group,
  Edit,
  CommandColumn,
  Toolbar,
  ColumnChooser,
  ColumnMenu,
  ContextMenu,
  DetailRow,
  Freeze,
  Reorder,
  Resize,
  Selection,
  ExcelExport,
  PdfExport,
  Aggregate,
  RowDD,
  VirtualScroll,
  ForeignKey
} from "@syncfusion/ej2-vue-grids";

provide('grid', [
  Page, Sort, Filter, Group, Edit, CommandColumn, Toolbar,
  ColumnChooser, ColumnMenu, ContextMenu, DetailRow, Freeze,
  Reorder, Resize, Selection, ExcelExport, PdfExport, Aggregate,
  RowDD, VirtualScroll, ForeignKey
]);
</script>
```

### Performance-Optimized Setup

For large datasets with virtual scrolling:

```vue
<script setup>
import { provide } from "vue";
import {
  GridComponent as EjsGrid,
  VirtualScroll,
  Page,
  Sort,
  Filter
} from "@syncfusion/ej2-vue-grids";

// VirtualScroll instead of Page for 1000+ rows
provide('grid', [VirtualScroll, Sort, Filter]);
</script>
```

---

## Key Notes

1. **Module Injection is Required**: Features don't work unless their corresponding modules are injected
2. **Order Doesn't Matter**: The order of modules in the array doesn't affect functionality
3. **Bundle Size**: Only import modules you actually use to minimize bundle size
4. **Default Modules Are Always Available**: Search, Selection, Scroll, and Print work without explicit injection
5. **Dependencies**: Some modules work better together (e.g., Edit + CommandColumn, ExcelExport + Toolbar)
6. **Performance**: Use VirtualScroll instead of Page when displaying 1000+ rows
