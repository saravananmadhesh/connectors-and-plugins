# Module System in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Critical Rule](#critical-rule)
- [Module Injection Pattern](#module-injection-pattern)
- [Available Modules](#available-modules)
- [Module Dependencies](#module-dependencies)
- [Bundle Optimization](#bundle-optimization)
- [Feature-Module Mapping](#feature-module-mapping)

## When to Use This Skill

Use this skill when you need to:
- **Enable grid features** — Inject services to unlock feature methods
- **Optimize bundle size** — Import only required modules
- **Configure services** — Understand service injection for features
- **Troubleshoot silent failures** — Ensure required services are provided
- **Feature prerequisites** — Know which services enable which methods
- **Performance tuning** — Reduce bundle by excluding unused modules
- **Lazy loading** — Load modules conditionally when needed

## Overview

Syncfusion Angular Grid uses a modular architecture where features are provided through service injection. This allows you to include only the features you need, reducing bundle size and improving performance.

Modules are injected using the `Inject` property in the component template or providers array.

## Critical Rule

### Rule 1: Service Injection Required for Feature Methods

**Features work only if their service is injected via `providers` array. No error thrown if missing.**

Methods fail silently when their service is not provided:

```typescript
// ❌ WRONG - goToPage() fails silently
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `<ejs-grid #grid [dataSource]="data"></ejs-grid>`,
  // ❌ No providers — no services injected
})
export class GridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  
  navigateToPage() {
    this.gridComponent.goToPage(2);  // ❌ FAILS SILENTLY - no PageService
  }
}

// ✅ CORRECT - Inject required services
import { 
  PageService, SortService, FilterService, EditService,
  ToolbarService, ExcelExportService, PdfExportService 
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid 
      [dataSource]="data" 
      [editSettings]="editSettings"
      [toolbar]="['Add', 'Edit', 'Delete', 'PdfExport', 'ExcelExport']">
      <e-columns>
        <e-column field="OrderID" [isPrimaryKey]="true"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ToolbarService,
    ExcelExportService,
    PdfExportService
  ]
})
export class GridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  
  navigateToPage() {
    this.gridComponent.goToPage(2);
  }
}
```

**Always match service to feature:**

| Feature | Service | Method |
|---------|---------|--------|
| Paging | `PageService` | `goToPage()`, `getPagerObject()` |
| Sorting | `SortService` | `sortColumn()`, `clearSorting()` |
| Filtering | `FilterService` | `filterByColumn()`, `clearFiltering()` |
| Editing | `EditService` | `addRecord()`, `deleteRecord()`, `startEdit()` |
| Toolbar | `ToolbarService` | `toolbarModule.enableItems()` |
| Excel Export | `ExcelExportService` | `excelExport()` |
| PDF Export | `PdfExportService` | `pdfExport()` |
| Grouping | `GroupService` | `groupColumn()`, `groupModule.ungroupByName()` |
| Selection | `SelectionService` | `selectRows()` (implicit – always available) |
| Virtual Scroll | `VirtualScrollService` | `enableVirtualization` property |

---

## Module Injection Pattern

```typescript
import { Component } from '@angular/core';
import { 
  PageService, SortService, FilterService, GroupService, 
  EditService, ToolbarService, ExcelExportService, PdfExportService 
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `<ejs-grid [dataSource]="data"><!-- columns --></ejs-grid>`,
  providers: [
    PageService, SortService, FilterService, GroupService, 
    EditService, ToolbarService, ExcelExportService, PdfExportService
  ]
})
export class GridComponent {
  data = [];
}
```

## Available Modules

### Data Operation Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `Page` | `@syncfusion/ej2-angular-grids` | Pagination | `[allowPaging]="true"` |
| `Sort` | `@syncfusion/ej2-angular-grids` | Column sorting | `[allowSorting]="true"` |
| `Filter` | `@syncfusion/ej2-angular-grids` | Data filtering | `[allowFiltering]="true"` |
| `Group` | `@syncfusion/ej2-angular-grids` | Row grouping | `[allowGrouping]="true"` |
| `Selection` | `@syncfusion/ej2-angular-grids` | Row/cell selection | `[allowSelection]="true"` |
| `Aggregate` | `@syncfusion/ej2-angular-grids` | Summary aggregates | Aggregate components |
| `Search` | `@syncfusion/ej2-angular-grids` | Global search | Search toolbar item |

### UI & Interaction Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `Toolbar` | `@syncfusion/ej2-angular-grids` | Toolbar functionality | `[toolbar]="[...]"` |
| `Edit` | `@syncfusion/ej2-angular-grids` | Row editing | `[editSettings]="{...}"` |
| `ContextMenu` | `@syncfusion/ej2-angular-grids` | Right-click context menu | `[contextMenuItems]="[...]"` |
| `Clipboard` | `@syncfusion/ej2-angular-grids` | Copy/paste operations | Copy/paste functionality |

### Display & Layout Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `VirtualScroll` | `@syncfusion/ej2-angular-grids` | Virtual scrolling | `enableVirtualization="true"` |
| `InfiniteScroll` | `@syncfusion/ej2-angular-grids` | Infinite scrolling | `enableInfiniteScrolling="true"` |
| `DetailRow` | `@syncfusion/ej2-angular-grids` | Master-detail hierarchy | `<ng-template #detailTemplate>` |
| `ColumnMenu` | `@syncfusion/ej2-angular-grids` | Column header menu | `[showColumnMenu]="true"` |
| `ColumnChooser` | `@syncfusion/ej2-angular-grids` | Column visibility toggle | Column chooser toolbar |
| `Resize` | `@syncfusion/ej2-angular-grids` | Column resizing | `[allowResizing]="true"` |
| `Reorder` | `@syncfusion/ej2-angular-grids` | Column reordering | `[allowReordering]="true"` |

### Export & Print Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `ExcelExport` | `@syncfusion/ej2-angular-grids` | Excel export | `[allowExcelExport]="true"` |
| `PdfExport` | `@syncfusion/ej2-angular-grids` | PDF export | `[allowPdfExport]="true"` |
| `Print` | `@syncfusion/ej2-angular-grids` | Grid printing | Print toolbar item |

### Advanced Modules

| Module | Import | Purpose | Required For |
|--------|--------|---------|---------------|
| `RowDD` | `@syncfusion/ej2-angular-grids` | Row drag & drop | `[allowRowDragAndDrop]="true"` |
| `RowPinning` | `@syncfusion/ej2-angular-grids` | Row pinning/freezing | `[allowRowPinning]="true"` |

## Module Dependencies

Some modules require other modules to function properly:

```
Edit ──────┐
           ├─> Toolbar (required)
Filtering──┘

Sorting
Filtering
Grouping ──> Requires individual setup

ExcelExport
PdfExport ──> Can work independently

VirtualScroll
InfiniteScroll ──> Cannot be used together

DetailRow ──> Independent

ColumnMenu ──> Independent
Reorder ────> Independent
Resize─────-> Independent
```

### Edit Mode Dependencies

```typescript
// Dialog Edit requires Toolbar
import { Component } from '@angular/core';
import { GridComponent, EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-edit-grid',
  template: `
    <ejs-grid [dataSource]="data" [editSettings]="editSettings" [toolbar]="toolbar">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `,
  providers: [EditService, ToolbarService, PageService]
})
export class EditGridComponent {
  data: any[] = [];
  editSettings: any = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Dialog'
  };
  toolbar: any[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
}
```

## Bundle Optimization

### Minimal Bundle (Core Only)

Includes only basic grid display:

```typescript
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-minimal-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class MinimalGridComponent {
  data: any[] = [];
}
// No providers needed = smallest bundle
```

### Read-Only Grid with Pagination

```typescript
import { Component } from '@angular/core';
import { GridComponent, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-paging-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `,
  providers: [PageService]  // Only 1 service
})
export class PagingGridComponent {
  data: any[] = [];
}
```

### Full-Featured Grid

```typescript
import { Component } from '@angular/core';
import {
  GridComponent,
  PageService,
  SortService,
  FilterService,
  GroupService,
  EditService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  DetailRowService,
  SelectionService,
  AggregateService,
  ColumnMenuService,
  ResizeService,
  ReorderService,
  ContextMenuService,
  ClipboardService,
  PrintService
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-full-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [allowPaging]="true"
              [allowSorting]="true"
              [allowFiltering]="true"
              [allowGrouping]="true"
              [allowSelection]="true"
              [editSettings]="editSettings"
              [toolbar]="toolbar"
              [showColumnMenu]="true"
              [allowExcelExport]="true"
              [allowPdfExport]="true"
              [allowResizing]="true"
              [allowReordering]="true">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `,
  providers: [
    PageService, SortService, FilterService, GroupService, EditService, ToolbarService, ExcelExportService, PdfExportService,
    DetailRowService, SelectionService, AggregateService, ColumnMenuService, ResizeService, ReorderService,
    ContextMenuService, ClipboardService, PrintService
  ]
})
export class FullGridComponent {
  data: any[] = [];
  editSettings: any = { 
    mode: 'Dialog', 
    allowEditing: true, 
    allowAdding: true, 
    allowDeleting: true 
  };
  toolbar: any[] = ['Add', 'Edit', 'Delete', 'ExcelExport', 'PdfExport', 'Print', 'Search'];
}
```

### Full-Featured Grid Example

```typescript
import { Component } from '@angular/core';
import {
  GridComponent, PageService, SortService, FilterService, GroupService, EditService, ToolbarService, 
  ExcelExportService, PdfExportService, DetailRowService, SelectionService, AggregateService, 
  ColumnMenuService, ResizeService, ReorderService, ContextMenuService, ClipboardService, PrintService
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-all-features-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [allowPaging]="true"
              [allowSorting]="true"
              [allowFiltering]="true"
              [allowGrouping]="true"
              [allowSelection]="true"
              [editSettings]="editSettings"
              [toolbar]="toolbar"
              [showColumnMenu]="true"
              [allowExcelExport]="true"
              [allowPdfExport]="true"
              [allowResizing]="true"
              [allowReordering]="true">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `,
  providers: [
    PageService, SortService, FilterService, GroupService, EditService, ToolbarService, ExcelExportService, PdfExportService,
    DetailRowService, SelectionService, AggregateService, ColumnMenuService, ResizeService, ReorderService,
    ContextMenuService, ClipboardService, PrintService
  ]
})
export class AllFeaturesGridComponent {
  data: any[] = [];
  editSettings: any = { 
    mode: 'Dialog', 
    allowEditing: true, 
    allowAdding: true, 
    allowDeleting: true 
  };
  toolbar: any[] = ['Add', 'Edit', 'Delete', 'ExcelExport', 'PdfExport', 'Print', 'Search'];
}
```

### Estimated Bundle Sizes

```
Core Grid Only:          ~45 KB
+ Paging:               ~55 KB
+ Paging + Sorting:     ~65 KB
+ Paging + All Data Ops: ~90 KB
+ All Modules:          ~200 KB
```

## Feature-Module Mapping

### Table: Which Module for Which Feature

| Feature | Module | Optional | Notes |
|---------|--------|----------|-------|
| Display data | None | No | Core grid only |
| Pagination | `PageService` | Yes | |
| Sorting | `SortService` | Yes | |
| Column Filtering | `FilterService` | Yes | |
| Global Search | `SearchService` | Yes | Requires ToolbarService |
| Row Grouping | `GroupService` | Yes | |
| Row/Cell Selection | `SelectionService` | Yes | Built-in, but enhance with service |
| Aggregates (Sum, Avg) | `AggregateService` | Yes | |
| Inline Editing | `EditService` | Yes | |
| Dialog Editing | `EditService, ToolbarService` | Yes | ToolbarService required |
| Batch Editing | `EditService` | Yes | |
| Add/Delete Toolbar | `ToolbarService` | Yes | Usually with EditService |
| Excel Export | `ExcelExportService` | Yes | |
| PDF Export | `PdfExportService` | Yes | |
| Print | `PrintService` | Yes | Usually with ToolbarService |
| Virtual Scrolling | `VirtualScrollService` | Yes | Alternative to pagination |
| Infinite Scrolling | `InfiniteScrollService` | Yes | Cannot use with VirtualScrollService |
| Master-Detail | `DetailRow` | Yes | |
| Right-Click Menu | `ContextMenu` | Yes | |
| Column Resizing | `Resize` | Yes | |
| Column Reordering | `Reorder` | Yes | |
| Column Menu | `ColumnMenu` | Yes | |
| Column Chooser | `ColumnChooser` | Yes | Usually in toolbar |
| Row Drag & Drop | `RowDD` | Yes | |
| Row Pinning | `RowPinning` | Yes | |
| Copy/Paste | `Clipboard` | Yes | |

### Common Feature Combinations

#### Read-Only Grid with Search & Paging
```typescript
// providers: [PageService, SearchService, ToolbarService]
```

#### Data Entry Grid (Inline Editing)
```typescript
// providers: [EditService]
```

#### Data Entry Grid (Dialog Editing with Validation)
```typescript
// providers: [EditService, ToolbarService]
```

#### Analytics Grid (Grouping with Aggregates)
```typescript
// providers: [GroupService, AggregateService, PageService, SortService, FilterService]
```

#### Master-Detail Reporting
```typescript
// providers: [DetailRowService, PageService, SortService, FilterService, AggregateService]
```

#### Exportable Data Grid
```typescript
// providers: [PageService, SortService, FilterService, ColumnMenuService, ResizeService, ReorderService, ExcelExportService, PdfExportService, PrintService, ToolbarService]
```

#### Real-Time Data Grid
```typescript
// providers: [VirtualScrollService, PageService, SortService, FilterService]
```

#### Mobile-Optimized Grid
```typescript
// providers: [ColumnChooserService, ColumnMenuService, ResizeService, ReorderService, PageService, SortService, FilterService]
```
