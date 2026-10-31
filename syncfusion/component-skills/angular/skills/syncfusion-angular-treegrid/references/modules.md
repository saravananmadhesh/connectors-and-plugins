---
name: Modules
description: 'Modules in Syncfusion Angular TreeGrid - service providers for paging, sorting, filtering, editing, exporting, and advanced features. Enabling required modules for TreeGrid functionality.'
---

# Modules

Modules are service providers that need to be injected into TreeGrid to enable specific features. Each module extends TreeGrid functionality for operations like paging, sorting, filtering, and more.

## When to Use

Use modules when you need to:
- **Enable features** — Inject services for paging, sorting, filtering
- **Optimize bundle size** — Load only required modules
- **Add export support** — Include Excel, PDF, CSV export modules
- **Enable editing** — Inject edit and toolbar services
- **Add drag-drop** — Include row drag-drop service
- **Enable print** — Include print service
- **Module dependencies** — Understand which modules depend on others

## Table of Contents
- [Module Injection Rules](#module-injection-rules)
- [Core Modules Overview](#core-modules-overview)
- [Injecting Modules](#injecting-modules)
- [Data Manipulation Modules](#data-manipulation-modules)
- [UI Interaction Modules](#ui-interaction-modules)
- [Export & Print Modules](#export--print-modules)
- [Advanced Modules](#advanced-modules)
- [Module Dependencies](#module-dependencies)
- [Complete Module Setup](#complete-module-setup)

## Module Injection Rules

### Rule 1: Module Injection is Feature-Specific (Not Universal)
**Severity**: 🟠 IMPORTANT - Some features require services, some don't

**Feature-Based Injection Requirements**:

```typescript
// ✅ REQUIRED SERVICES:

// For Paging - REQUIRED
import { PageService } from '@syncfusion/ej2-angular-treegrid';
providers: [PageService]  // MANDATORY if allowPaging='true'

// For Sorting - REQUIRED
import { SortService } from '@syncfusion/ej2-angular-treegrid';
providers: [SortService]  // MANDATORY if allowSorting='true'

// For Filtering - REQUIRED
import { FilterService } from '@syncfusion/ej2-angular-treegrid';
providers: [FilterService]  // MANDATORY if allowFiltering='true'

// For Editing - REQUIRED
import { EditService } from '@syncfusion/ej2-angular-treegrid';
providers: [EditService]  // MANDATORY for editing modes

// For Aggregates - REQUIRED
import { AggregateService } from '@syncfusion/ej2-angular-treegrid';
providers: [AggregateService]  // MANDATORY if using aggregates

// For Toolbar - REQUIRED
import { ToolbarService } from '@syncfusion/ej2-angular-treegrid';
providers: [ToolbarService]  // MANDATORY if using toolbar

// For Context Menu - REQUIRED
import { ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
providers: [ContextMenuService]  // MANDATORY if contextMenuItems set

// For Exports - REQUIRED (based on export type)
import { ExcelExportService, PdfExportService } from '@syncfusion/ej2-angular-treegrid';
providers: [ExcelExportService, PdfExportService]  // MANDATORY for export features
```

**⚠️ NO SERVICE INJECTION REQUIRED FOR**:
```typescript
// ✅ BUILT-IN FEATURES (Do NOT inject services):

// Selection - BUILT-IN, NO SERVICE NEEDED
[selectionSettings]='{ type: "Multiple", mode: "Row" }'
// No service injection required!

// Column Definition - BUILT-IN
<e-column field='TaskID'></e-column>
// No service needed

// Child Mapping - BUILT-IN
childMapping='subtasks'
// No service needed

// Basic Data Binding - BUILT-IN
[dataSource]='data'
// No service needed
```

---

### Rule 2: Complete Module Setup for Full-Featured Grid
**Severity**: 🟠 IMPORTANT - Ensure all needed services are injected

**Requirement**:
```typescript
// ✅ COMPLETE SETUP - All common features
import { 
  PageService, 
  SortService, 
  FilterService, 
  EditService,
  ExcelExportService,
  PdfExportService,
  PrintService,
  AggregateService,
  ToolbarService,
  ColumnMenuService,
  ResizeService,
  ReorderService,
  ContextMenuService,
  RowDDService
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `...`,
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ExcelExportService,
    PdfExportService,
    PrintService,
    AggregateService,
    ToolbarService,
    ColumnMenuService,
    ResizeService,
    ReorderService,
    ContextMenuService,
    RowDDService
  ]
})
```

---

## Core Modules Overview

### All Available Modules

```typescript
// Data Manipulation
PageService       // Pagination support
SortService       // Sorting functionality
FilterService     // Filtering support
EditService       // CRUD editing operations
AggregateService  // Aggregation calculations

// UI & Interaction
ColumnMenuService     // Column menu feature
CommandColumnService  // Command column buttons
ContextMenuService    // Context menu support
ResizeService         // Column resizing
ReorderService        // Column reordering
ToolbarService        // Toolbar functionality
RowDDService          // Row drag-and-drop & indent

// Export & Print
PrintService      // Print functionality (default)
ExcelExportService    // Excel export
PdfExportService      // PDF export
CsvExportService      // CSV export (if available)
```

> ℹ️ **No Module Injection Required:**
> - **Selection** — Row, cell, and checkbox selection are built into TreeGrid core and work without injecting any service. Do **not** add `SelectionService` to `providers`; it is not a valid injectable for TreeGrid and will cause an error.

## Injecting Modules

### Method 1: Component-Level Injection

```typescript
import { Component } from '@angular/core';
import { 
  PageService, 
  SortService, 
  FilterService, 
  EditService,
  ExcelExportService,
  PdfExportService
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowPaging]='true'
      [allowSorting]='true'
      [allowFiltering]='true'
      [editSettings]='editSettings'>
      <!-- columns -->
    </ejs-treegrid>
  `,
  providers: [
    PageService, 
    SortService, 
    FilterService, 
    EditService,
    ExcelExportService,
    PdfExportService
  ]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public editSettings = {
    mode: 'Cell',
    allowEditing: true
  };
}
```

### Method 2: Module-Level (Standalone or NgModule)

```typescript
// In a standalone component
import { Component } from '@angular/core';
import { 
  TreeGridAllModule 
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `<ejs-treegrid ...></ejs-treegrid>`,
  standalone: true,
  imports: [TreeGridAllModule]
})
export class AppComponent {
  // All modules are available
}
```

## Data Manipulation Modules

### PageService - Pagination

```typescript
import { PageService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [PageService]
})
export class AppComponent {
  public pageSettings = {
    pageSize: 10,
    pageCount: 5
  };
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowPaging]='true'
  [pageSettings]='pageSettings'>
</ejs-treegrid>
```

### SortService - Sorting

```typescript
import { SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [SortService]
})
export class AppComponent {
  public sortSettings = {
    columns: [{ field: 'TaskName', direction: 'Ascending' }]
  };
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowSorting]='true'
  [sortSettings]='sortSettings'>
</ejs-treegrid>
```

### FilterService - Filtering

```typescript
import { FilterService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [FilterService]
})
export class AppComponent {
  public filterSettings = {
    type: 'FilterBar'
  };
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowFiltering]='true'
  [filterSettings]='filterSettings'>
</ejs-treegrid>
```

### EditService - CRUD Operations

```typescript
import { EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [EditService]
})
export class AppComponent {
  public editSettings = {
    mode: 'Cell',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };
}
```

Enable with:
```typescript
<ejs-treegrid 
  [editSettings]='editSettings'>
</ejs-treegrid>
```

### AggregateService - Aggregations

```typescript
import { AggregateService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [AggregateService]
})
export class AppComponent {
  public aggregateSettings = [
    {
      field: 'Duration',
      type: ['Sum', 'Average'],
      footerTemplate: 'Total: ${Sum}'
    }
  ];
}
```

## UI Interaction Modules

### ColumnMenuService - Column Context Menu

```typescript
import { ColumnMenuService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ColumnMenuService]
})
export class AppComponent {
  // Enables column header context menu
}
```

Enable with:
```typescript
<ejs-treegrid 
  [showColumnMenu]='true'>
</ejs-treegrid>
```

### CommandColumnService - Action Buttons

```typescript
import { CommandColumnService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [CommandColumnService]
})
export class AppComponent {
  // Enables command column edit/delete/save buttons
}
```

### ContextMenuService - Right-Click Menu

```typescript
import { ContextMenuService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ContextMenuService]
})
export class AppComponent {
  public contextMenuItems = ['Edit', 'Delete', 'Copy'];
}
```

Enable with:
```typescript
<ejs-treegrid 
  [contextMenuItems]='contextMenuItems'>
</ejs-treegrid>
```

### ResizeService - Column Resizing

```typescript
import { ResizeService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ResizeService]
})
export class AppComponent {
  // Enables column drag-to-resize
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowResizing]='true'>
</ejs-treegrid>
```

### ReorderService - Column Reordering

```typescript
import { ReorderService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ReorderService]
})
export class AppComponent {
  // Enables column drag-to-reorder
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowReordering]='true'>
</ejs-treegrid>
```

### ToolbarService - Toolbar Items

```typescript
import { ToolbarService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ToolbarService]
})
export class AppComponent {
  public toolbarItems = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
}
```

Enable with:
```typescript
<ejs-treegrid 
  [toolbar]='toolbarItems'>
</ejs-treegrid>
```

### RowDDService - Row Drag-Drop & Indent

```typescript
import { RowDDService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [RowDDService]
})
export class AppComponent {
  // Enables row drag-and-drop
  // Enables indent/outdent operations
}
```

Enable with:
```typescript
<ejs-treegrid 
  [allowRowDragandDrop]='true'>
</ejs-treegrid>
```

## Export & Print Modules

### PrintService - Print Functionality

```typescript
import { PrintService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [PrintService]  // Usually injected by default
})
export class AppComponent {
  public toolbarItems = ['Print'];
}
```

### ExcelExportService - Excel Export

```typescript
import { ExcelExportService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [ExcelExportService]
})
export class AppComponent {
  public toolbarItems = ['ExcelExport'];
  
  onExcelExport(): void {
    this.treegrid.excelExport();
  }
}
```

### PdfExportService - PDF Export

```typescript
import { PdfExportService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [PdfExportService]
})
export class AppComponent {
  public toolbarItems = ['PdfExport'];
  
  onPdfExport(): void {
    this.treegrid.pdfExport();
  }
}
```

## Advanced Modules

### Complete Feature Set

```typescript
import { Component } from '@angular/core';
import {
  PageService,
  SortService,
  FilterService,
  EditService,
  AggregateService,
  ColumnMenuService,
  CommandColumnService,
  ContextMenuService,
  ResizeService,
  ReorderService,
  PrintService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  RowDDService
} from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowPaging]='true'
      [allowSorting]='true'
      [allowFiltering]='true'
      [allowResizing]='true'
      [allowReordering]='true'
      [allowRowDragandDrop]='true'
      [editSettings]='editSettings'
      [toolbar]='toolbarItems'
      [contextMenuItems]='contextMenuItems'
      [showColumnMenu]='true'>
      <!-- columns -->
    </ejs-treegrid>
  `,
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    AggregateService,
    ColumnMenuService,
    CommandColumnService,
    ContextMenuService,
    ResizeService,
    ReorderService,
    PrintService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,
    RowDDService
  ]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public editSettings = {
    mode: 'Cell',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };
  
  public toolbarItems = [
    'Add', 'Edit', 'Delete', 'Update', 'Cancel',
    'Search', 'ExcelExport', 'PdfExport', 'Print'
  ];
  
  public contextMenuItems = ['Edit', 'Delete', 'Copy'];
}
```

## Module Dependencies

### Dependency Chart

```
EditService
  ├─ Requires: CommandColumnService (for command column)
  ├─ Works with: FilterService, SortService, PageService
  └─ Events: actionBegin, actionComplete, actionFailure

ExcelExportService / PdfExportService
  ├─ Optional: Works independently
  ├─ Can use: ToolbarService (for toolbar button)
  └─ Works with: All other services

PageService
  ├─ Independent operation
  └─ Works with: SortService, FilterService

RowDDService
  ├─ Requires: EditService (for parent-child updates)
  └─ Independent for simple drag-drop
```

## Complete Module Setup

### Minimal Setup (Read-Only)

```typescript
@Component({
  providers: []  // No modules needed
})
export class MinimalTreeGrid {
  public data: Object[] = [];
}
```

### Standard Setup (Edit & Navigate)

```typescript
@Component({
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ToolbarService
  ]
})
export class StandardTreeGrid {
  // Basic CRUD + Pagination + Filtering + Sorting
}
```

### Advanced Setup (Full Features)

```typescript
@Component({
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    AggregateService,
    ColumnMenuService,
    CommandColumnService,
    ContextMenuService,
    ResizeService,
    ReorderService,
    PrintService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,
    RowDDService
  ]
})
export class AdvancedTreeGrid {
  // All TreeGrid features enabled
}
```

### Using TreeGridAllModule (Standalone)

```typescript
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  standalone: true,
  imports: [TreeGridAllModule]
})
export class AppComponent {
  // All modules automatically available
}
```

## Module Import Optimization

### Lazy Loading Modules

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `<ejs-treegrid [dataSource]='data'></ejs-treegrid>`,
  providers: []  // Start with minimal setup
})
export class AppComponent implements AfterViewInit {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;

  ngAfterViewInit(): void {
    // Dynamically enable modules when needed
    if (this.treegrid) {
      // Module services can be injected after initialization
    }
  }
}
```

### Module Availability Check

```typescript
import { ViewContainerRef } from '@angular/core';

export class AppComponent {
  constructor(private vcr: ViewContainerRef) {}
  
  isModuleAvailable(moduleType: any): boolean {
    try {
      if (this.vcr.injector.get(moduleType, null) !== null) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
}
```

## Common Module Combinations

### CRUD + Export

```typescript
providers: [
  EditService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  CommandColumnService
]
```

### Analytics Dashboard

```typescript
providers: [
  PageService,
  SortService,
  FilterService,
  AggregateService,
  ExcelExportService
]
```

### Data Entry Form

```typescript
providers: [
  PageService,
  FilterService,
  EditService,
  ToolbarService,
  CommandColumnService,
  ContextMenuService
]
```

### Real-time Data Grid

```typescript
providers: [
  PageService,
  SortService,
  FilterService,
  EditService,
  RowDDService
]
```
