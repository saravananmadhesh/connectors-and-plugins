---
name: modules
description: 'Module system in Syncfusion JavaScript Grid: feature modules, injection pattern, bundle optimization, module dependencies.'
---

# Module System in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Module Injection Pattern](#module-injection-pattern)
- [Available Modules](#available-modules)
- [Module Dependencies](#module-dependencies)
- [Bundle Optimization](#bundle-optimization)
- [Feature-Module Mapping](#feature-module-mapping)
- [Advanced Scenarios](#advanced-scenarios)

## When to Use This Reference

- Understand which modules to inject for features
- Set up module dependencies and relationships
- Optimize bundle size by including only needed modules
- Reference all available grid modules and their purposes
- Configure module-specific functionality
- [Bundle Optimization](#bundle-optimization)
- [Feature-Module Mapping](#feature-module-mapping)
- [Advanced Scenarios](#advanced-scenarios)

## Overview

Syncfusion JavaScript Grid uses a modular architecture where features are provided as separate modules. This allows you to include only the features you need, reducing bundle size and improving performance.

Modules are injected using the `Grid.Inject()` method, passing an array of required module classes.

## Module Injection Pattern

### Basic Injection

```ts
import { Grid, Page, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

### Multiple Modules

```ts
import {
  Grid,
  Page,
  Sort,
  Filter,
  Group,
  Edit,
  Toolbar,
  ExcelExport,
  PdfExport
} from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group, Edit, Toolbar, ExcelExport, PdfExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport']
});

grid.appendTo('#grid');
```

### Conditional Injection

```ts
import { Grid, Page, Sort, Filter, Group, Edit, Toolbar } from '@syncfusion/ej2-grids';

const getRequiredModules = (features: string[]) => {
  const modules: any[] = [];
  
  if (features.includes('paging')) modules.push(Page);
  if (features.includes('sorting')) modules.push(Sort);
  if (features.includes('filtering')) modules.push(Filter);
  if (features.includes('grouping')) modules.push(Group);
  if (features.includes('editing')) {
    modules.push(Edit);
    modules.push(Toolbar);
  }
  
  return modules;
};

const requiredModules = getRequiredModules(['paging', 'sorting', 'filtering']);
Grid.Inject(...requiredModules);

const grid = new Grid({
  dataSource: data,
  columns: [...]
});

grid.appendTo('#grid');
```

## Available Modules

### Data Operation Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `Page` | `@syncfusion/ej2-grids` | Pagination | `allowPaging: true` |
| `Sort` | `@syncfusion/ej2-grids` | Column sorting | `allowSorting: true` |
| `Filter` | `@syncfusion/ej2-grids` | Data filtering | `allowFiltering: true` |
| `Group` | `@syncfusion/ej2-grids` | Row grouping | `allowGrouping: true` |
| `Selection` | `@syncfusion/ej2-grids` | Row/cell selection | `selectionSettings: {...}` |
| `Aggregate` | `@syncfusion/ej2-grids` | Summary aggregates | `aggregateRows: [...]` |
| `Search` | `@syncfusion/ej2-grids` | Global search | Toolbar search item |

### UI & Interaction Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `Toolbar` | `@syncfusion/ej2-grids` | Toolbar functionality | `toolbar: [...]` |
| `Edit` | `@syncfusion/ej2-grids` | Row editing | `editSettings: {...}` |
| `ContextMenu` | `@syncfusion/ej2-grids` | Right-click menu | `contextMenuItems: [...]` |
| `Clipboard` | `@syncfusion/ej2-grids` | Copy/paste | Copy/paste functionality |

### Display & Layout Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `VirtualScroll` | `@syncfusion/ej2-grids` | Virtual scrolling | `enableVirtualization: true` |
| `InfiniteScroll` | `@syncfusion/ej2-grids` | Infinite scrolling | `enableInfiniteScrolling: true` |
| `DetailRow` | `@syncfusion/ej2-grids` | Master-detail hierarchy | `detailTemplate: (...)` |
| `ColumnMenu` | `@syncfusion/ej2-grids` | Column header menu | `showColumnMenu: true` |
| `ColumnChooser` | `@syncfusion/ej2-grids` | Column visibility | Column chooser toolbar |
| `Resize` | `@syncfusion/ej2-grids` | Column resizing | `allowResizing: true` |
| `Reorder` | `@syncfusion/ej2-grids` | Column reordering | `allowReordering: true` |

### Export & Print Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `ExcelExport` | `@syncfusion/ej2-grids` | Excel export | `allowExcelExport: true` |
| `PdfExport` | `@syncfusion/ej2-grids` | PDF export | `allowPdfExport: true` |
| `Print` | `@syncfusion/ej2-grids` | Grid printing | Print toolbar item |

### Advanced Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `RowDD` | `@syncfusion/ej2-grids` | Row drag & drop | `allowRowDragAndDrop: true` |
| `RowPinning` | `@syncfusion/ej2-grids` | Row pinning/freezing | `allowRowPinning: true` |

## Module Dependencies

Some modules require other modules to function properly:

```
Edit ──────┐
           ├─> Toolbar (required for Dialog mode)
Filtering──┘

Sorting ──────────────> Independent
Filtering ────────────> Independent
Grouping ─────────────> Independent

ExcelExport ──────────> Independent
PdfExport ────────────> Independent

VirtualScroll ───────> Cannot be used with InfiniteScroll
InfiniteScroll ──────> Cannot be used with VirtualScroll

DetailRow ───────────> Independent

ColumnMenu ──────────> Independent
Reorder ─────────────> Independent
Resize ──────────────> Independent
```

### Edit Mode Dependencies

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';

// Dialog Edit requires Toolbar module
Grid.Inject(Edit, Toolbar);

const grid = new Grid({
  dataSource: data,
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    mode: 'Dialog'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  columns: [...]
});

grid.appendTo('#grid');
```

### Inline Edit (No Toolbar Required)

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

// Inline edit works with Edit module only
Grid.Inject(Edit);

const grid = new Grid({
  dataSource: data,
  editSettings: {
    allowEditing: true,
    mode: 'Normal'  // Inline mode
  },
  columns: [...]
});

grid.appendTo('#grid');
```

## Bundle Optimization

### Minimal Bundle (Core Only)

Includes only basic grid display:

```ts
import { Grid } from '@syncfusion/ej2-grids';

// No Grid.Inject() needed = smallest bundle
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

**Bundle Size:** ~45 KB

### Read-Only Grid with Pagination

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');
```

**Bundle Size:** ~55 KB

### Reporting Grid (Sorting, Filtering, Grouping, Export)

```ts
import { Grid, Page, Sort, Filter, Group, Aggregate, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group, Aggregate, ExcelExport, PdfExport);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  toolbar: ['ExcelExport', 'PdfExport']
});

grid.appendTo('#grid');
```

**Bundle Size:** ~130 KB

### Full-Featured Grid

```ts
import {
  Grid,
  Page,
  Sort,
  Filter,
  Group,
  Edit,
  Toolbar,
  ExcelExport,
  PdfExport,
  DetailRow,
  Selection,
  Aggregate,
  ColumnMenu,
  Resize,
  Reorder,
  ContextMenu,
  Clipboard,
  Print,
  VirtualScroll,
  RowDD
} from '@syncfusion/ej2-grids';

Grid.Inject(
  Page, Sort, Filter, Group, Edit, Toolbar,
  ExcelExport, PdfExport, DetailRow, Selection,
  Aggregate, ColumnMenu, Resize, Reorder,
  ContextMenu, Clipboard, Print, VirtualScroll, RowDD
);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  allowExcelExport: true,
  allowPdfExport: true,
  allowResizing: true,
  allowReordering: true,
  allowRowDragAndDrop: true,
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'ExcelExport', 'PdfExport', 'Print'],
  contextMenuItems: ['Copy', 'ExcelExport'],
  showColumnMenu: true
});

grid.appendTo('#grid');
```

**Bundle Size:** ~200 KB

## Feature-Module Mapping

### Quick Reference: Which Module for Which Feature

| Feature | Module | Optional | Notes |
|---------|--------|----------|-------|
| Display data | None | No | Core grid only |
| Pagination | `Page` | Yes | |
| Column Sorting | `Sort` | Yes | |
| Column Filtering | `Filter` | Yes | |
| Global Search | `Search` | Yes | With Toolbar |
| Row Grouping | `Group` | Yes | |
| Row/Cell Selection | `Selection` | Yes | |
| Aggregates (Sum, Avg, etc.) | `Aggregate` | Yes | |
| Inline Editing | `Edit` | Yes | |
| Dialog Editing | `Edit, Toolbar` | Yes | Toolbar required |
| Batch Editing | `Edit` | Yes | |
| Edit Toolbar Buttons | `Toolbar` | Yes | Usually with Edit |
| Excel Export | `ExcelExport` | Yes | |
| PDF Export | `PdfExport` | Yes | |
| Print | `Print` | Yes | Usually with Toolbar |
| Virtual Scrolling | `VirtualScroll` | Yes | Alternative to pagination |
| Infinite Scrolling | `InfiniteScroll` | Yes | Cannot use with VirtualScroll |
| Master-Detail Hierarchy | `DetailRow` | Yes | |
| Right-Click Context Menu | `ContextMenu` | Yes | |
| Column Resizing | `Resize` | Yes | |
| Column Reordering | `Reorder` | Yes | |
| Column Menu | `ColumnMenu` | Yes | |
| Column Chooser | `ColumnChooser` | Yes | In toolbar |
| Row Drag & Drop | `RowDD` | Yes | |
| Row Pinning | `RowPinning` | Yes | |
| Copy/Paste | `Clipboard` | Yes | |

### Common Feature Combinations

#### Read-Only Grid with Pagination & Sorting

```ts
import { Grid, Page, Sort } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort);

new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true
}).appendTo('#grid');
```

#### Data Entry Grid (Inline Editing)

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

new Grid({
  dataSource: data,
  columns: [...],
  editSettings: { allowEditing: true, mode: 'Normal' }
}).appendTo('#grid');
```

#### Data Entry Grid (Dialog Editing)

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar);

new Grid({
  dataSource: data,
  columns: [...],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
}).appendTo('#grid');
```

#### Analytics Grid (Grouping with Aggregates)

```ts
import { Grid, Page, Sort, Filter, Group, Aggregate } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group, Aggregate);

new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  aggregateRows: [
    { columns: [{ field: 'Freight', type: 'Sum', footerTemplate: 'Total: ${Sum}' }] }
  ]
}).appendTo('#grid');
```

#### Master-Detail Reporting Grid

```ts
import { Grid, Page, Sort, Filter, DetailRow, Aggregate } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, DetailRow, Aggregate);

new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  detailTemplate: '<div>Detail content</div>',
  aggregateRows: [...]
}).appendTo('#grid');
```

#### Exportable & Printable Grid

```ts
import { Grid, Page, Sort, Filter, Toolbar, ExcelExport, PdfExport, Print, ColumnMenu, Resize } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Toolbar, ExcelExport, PdfExport, Print, ColumnMenu, Resize);

new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowExcelExport: true,
  allowPdfExport: true,
  allowResizing: true,
  toolbar: ['ExcelExport', 'PdfExport', 'Print'],
  showColumnMenu: true
}).appendTo('#grid');
```

#### High-Performance Grid (Virtual Scrolling)

```ts
import { Grid, Sort, Filter, VirtualScroll } from '@syncfusion/ej2-grids';

Grid.Inject(Sort, Filter, VirtualScroll);

new Grid({
  dataSource: largeDataset,  // 10k+ rows
  columns: [...],
  allowSorting: true,
  allowFiltering: true,
  enableVirtualization: true
}).appendTo('#grid');
```

## Advanced Scenarios

### Dynamic Module Loading

```ts
import { Grid } from '@syncfusion/ej2-grids';

const loadModulesForFeature = async (feature: string) => {
  if (feature === 'edit') {
    const { Edit, Toolbar } = await import('@syncfusion/ej2-grids');
    Grid.Inject(Edit, Toolbar);
  } else if (feature === 'export') {
    const { ExcelExport, PdfExport, Toolbar } = await import('@syncfusion/ej2-grids');
    Grid.Inject(ExcelExport, PdfExport, Toolbar);
  }
};

// Usage
await loadModulesForFeature('edit');

const grid = new Grid({
  dataSource: data,
  columns: [...]
});

grid.appendTo('#grid');
```

### Lazy Module Injection

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

// Inject only paging initially
Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

grid.appendTo('#grid');

// Later, when user enables filtering, inject Filter
setTimeout(() => {
  const { Filter } = require('@syncfusion/ej2-grids');
  Grid.Inject(Filter);
  
  grid.allowFiltering = true;
  grid.filterSettings = { type: 'Menu' };
  grid.refresh();
}, 2000);
```

### Check Injected Modules

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...]
});

grid.appendTo('#grid');

// Check if features are available
console.log('Paging:', grid.allowPaging);
console.log('Sorting:', grid.allowSorting);
console.log('Editing:', grid.editSettings?.allowEditing);

// Get toolbar if available
if (grid.toolbarModule) {
  console.log('Toolbar is injected');
}
```

### Optimize by Usage Pattern

```ts
// Pattern 1: Simple View-Only Grid
const viewGrid = new Grid({ dataSource, columns: [...] });
viewGrid.appendTo('#view-grid');
// No modules injected

// Pattern 2: CRUD Grid
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
Grid.Inject(Edit, Toolbar);
const editGrid = new Grid({
  dataSource,
  columns: [...],
  editSettings: { allowEditing: true, mode: 'Dialog' },
  toolbar: ['Add', 'Edit', 'Delete']
});
editGrid.appendTo('#edit-grid');

// Pattern 3: Filtered Report
import { Grid, Page, Sort, Filter, ExcelExport, Toolbar } from '@syncfusion/ej2-grids';
Grid.Inject(Page, Sort, Filter, ExcelExport, Toolbar);
const reportGrid = new Grid({
  dataSource,
  columns: [...],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  toolbar: ['ExcelExport']
});
reportGrid.appendTo('#report-grid');
```

## Important Notes

- **Inject once per class**: Call `Grid.Inject()` once with all needed modules before creating Grid instances
- **Module order doesn't matter**: Inject modules in any order
- **Global injection**: Modules injected affect all subsequent Grid instances on the page
- **Bundle size trade-off**: Include only modules you actually use to keep bundle small
- **Toolbar requirement**: Dialog edit mode requires Toolbar module
- **Virtual vs Pagination**: Cannot use both VirtualScroll and Pagination together
