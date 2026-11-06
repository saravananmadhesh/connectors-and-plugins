# Grid Component - Properties Reference

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Properties Overview](#properties-overview)
- [Core Data Properties](#core-data-properties)
- [Layout & Display Properties](#layout--display-properties)
- [Feature Enablement Properties](#feature-enablement-properties)
- [Selection & Editing Properties](#selection--editing-properties)

## When to Use This Skill

Use this skill when you need to:
- **Configure grid properties** — Set core grid behavior and appearance
- **Enable features** — Turn on paging, sorting, filtering, grouping, selection
- **Set data source** — Configure dataSource and columns properties
- **Control layout** — Set grid height, width, row height, grid lines
- **Enable editing** — Configure edit settings for CRUD operations
- **Selection settings** — Control row/cell selection behavior
- **Export settings** — Enable Excel/PDF export capabilities
- **Feature configuration** — Configure paging, sorting, filtering options

## Properties Overview

The Grid component has 95+ configurable properties. Here are the most commonly used ones organized by category.

### Quick Reference Table

| Category | Key Properties |
|----------|----------------|
| **Data Binding** | `dataSource`, `columns`, `query` |
| **Paging** | `allowPaging`, `pageSettings` |
| **Sorting** | `allowSorting`, `allowMultiSorting`, `sortSettings` |
| **Filtering** | `allowFiltering`, `filterSettings` |
| **Selection** | `allowSelection`, `selectionSettings` |
| **Editing** | `editSettings` |
| **Layout** | `height`, `width`, `gridLines`, `rowHeight` |
| **Export** | `allowExcelExport`, `allowPdfExport` |
| **Grouping** | `allowGrouping`, `groupSettings` |

---

## Core Data Properties

### dataSource
**Type:** `Object | DataManager | DataResult`  
**Default:** `[]`  
**Description:** Primary data source for rendering grid rows

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-datasource',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridDataSourceComponent {
  data = [
    { OrderID: 10001, CustomerID: 'ALFKI', Freight: 32.38 },
    { OrderID: 10002, CustomerID: 'ANATR', Freight: 11.61 }
  ];
}
```

### columns
**Type:** `Column[] | string[] | ColumnModel[]`  
**Default:** `[]`  
**Description:** Schema definition for grid columns. Auto-generated from dataSource if empty

```typescript
@Component({
  selector: 'app-columns-config',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ColumnsConfigComponent {
  data: any[] = [];
}
```

### query
**Type:** `Query`  
**Default:** `null`  
**Description:** External Query to be executed along with data processing

```typescript
import { Component, OnInit } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-grid-query',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="gridData" [query]="query">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridQueryComponent implements OnInit {
  gridData!: DataManager;
  query!: Query;

  ngOnInit(): void {
    this.gridData = new DataManager({ url: 'api/orders', adaptor: new UrlAdaptor() });
    this.query = new Query()
      .select(['OrderID', 'CustomerID', 'Freight'])
      .where('Freight', 'greaterThan', 100);
  }
}
```

---

## Layout & Display Properties

### height
**Type:** `string | number`  
**Default:** `'auto'`  
**Description:** Scrollable height of grid content

```typescript
@Component({
  selector: 'app-grid-height',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [height]="400">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>

    <!-- Or with string value -->
    <ejs-grid [dataSource]="data" height="500px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridHeightComponent {
  data: any[] = [];
}
```

### width
**Type:** `string | number`  
**Default:** `'auto'`  
**Description:** Grid width

```typescript
@Component({
  selector: 'app-grid-width',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" width="100%">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridWidthComponent {
  data: any[] = [];
}
```

### rowHeight
**Type:** `number`  
**Default:** `null` (auto-calculated)  
**Description:** Height for all grid rows

```typescript
@Component({
  selector: 'app-grid-rowheight',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [rowHeight]="40">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridRowHeightComponent {
  data: any[] = [];
}
```

### gridLines
**Type:** `GridLine` (Both | None | Horizontal | Vertical | Default)  
**Default:** `Default`  
**Description:** Grid line display mode

```typescript
@Component({
  selector: 'app-grid-lines',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" gridLines="Both">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridLinesComponent {
  data: any[] = [];
}
```

### allowTextWrap
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables text wrapping in cells

```typescript
@Component({
  selector: 'app-grid-textwrap',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [allowTextWrap]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridTextWrapComponent {
  data: any[] = [];
}
```

### enableAltRow
**Type:** `boolean`  
**Default:** `true`  
**Description:** Renders alternating row styling

```typescript
@Component({
  selector: 'app-grid-altrow',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [enableAltRow]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridAltRowComponent {
  data: any[] = [];
}
```

### enableHover
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables row hover effect

```typescript
@Component({
  selector: 'app-grid-hover',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [enableHover]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridHoverComponent {
  data: any[] = [];
}
```

### enableStickyHeader
**Type:** `boolean`  
**Default:** `false`  
**Description:** Makes column headers visible while scrolling

```typescript
@Component({
  selector: 'app-grid-stickyheader',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [enableStickyHeader]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridStickyHeaderComponent {
  data: any[] = [];
}
```

---

## Feature Enablement Properties

### allowPaging
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables pager rendering at grid footer for page navigation

```typescript
import { Component } from '@angular/core';
import { GridModule, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-paging',
  standalone: true,
  imports: [GridModule],
  providers: [PageService],
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridPagingComponent {
  data: any[] = [];
}
```

### pageSettings
**Type:** `PageSettingsModel`  
**Default:** `{currentPage: 1, pageSize: 12, pageCount: 8, ...}`  
**Description:** Configures pager behavior

```typescript
@Component({
  selector: 'app-grid-pagesettings',
  standalone: true,
  imports: [GridModule],
  providers: [PageService],
  template: `
    <ejs-grid [dataSource]="data" [allowPaging]="true" [pageSettings]="pageSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridPageSettingsComponent {
  data: any[] = [];
  pageSettings = { pageSize: 20, currentPage: 1 };
}
```

### allowSorting
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables sorting when clicking column headers

```typescript
import { Component } from '@angular/core';
import { GridModule, SortService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-sorting',
  standalone: true,
  imports: [GridModule],
  providers: [SortService],
  template: `
    <ejs-grid [dataSource]="data" [allowSorting]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridSortingComponent {
  data: any[] = [];
}
```

### allowMultiSorting
**Type:** `boolean`  
**Default:** `false`  
**Description:** Allows sorting multiple columns

```typescript
@Component({
  selector: 'app-grid-multisorting',
  standalone: true,
  imports: [GridModule],
  providers: [SortService],
  template: `
    <ejs-grid [dataSource]="data" [allowSorting]="true" [allowMultiSorting]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridMultiSortingComponent {
  data: any[] = [];
}
```

### allowFiltering
**Type:** `boolean`  
**Default:** `false`  
**Description:** Displays filter bar for record filtering

```typescript
import { Component } from '@angular/core';
import { GridModule, FilterService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-filtering',
  standalone: true,
  imports: [GridModule],
  providers: [FilterService],
  template: `
    <ejs-grid [dataSource]="data" [allowFiltering]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridFilteringComponent {
  data: any[] = [];
}
```

### allowSelection
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables row/cell selection with highlighting

```typescript
@Component({
  selector: 'app-grid-selection',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [allowSelection]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridSelectionComponent {
  data: any[] = [];
}
```

### allowGrouping
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables dynamic column grouping via drag-drop

```typescript
import { Component } from '@angular/core';
import { GridModule, GroupService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-grouping',
  standalone: true,
  imports: [GridModule],
  providers: [GroupService],
  template: `
    <ejs-grid [dataSource]="data" [allowGrouping]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridGroupingComponent {
  data: any[] = [];
}
```

### allowExcelExport
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables Excel export functionality

```typescript
import { Component } from '@angular/core';
import { GridModule, ExcelExportService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-excelexport',
  standalone: true,
  imports: [GridModule],
  providers: [ExcelExportService],
  template: `
    <ejs-grid [dataSource]="data" [allowExcelExport]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridExcelExportComponent {
  data: any[] = [];
}
```

### allowPdfExport
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables PDF export functionality

```typescript
import { Component } from '@angular/core';
import { GridModule, PdfExportService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-pdfexport',
  standalone: true,
  imports: [GridModule],
  providers: [PdfExportService],
  template: `
    <ejs-grid [dataSource]="data" [allowPdfExport]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridPdfExportComponent {
  data: any[] = [];
}
```

---

## Selection & Editing Properties

### selectionSettings
**Type:** `SelectionSettingsModel`  
**Description:** Configures selection mode, cellSelectionMode, and type

```typescript
@Component({
  selector: 'app-grid-selection-settings',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" [selectionSettings]="selectionSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridSelectionSettingsComponent {
  data: any[] = [];
  selectionSettings = {
    mode: 'Row',           // Row, Cell, or Column
    type: 'Multiple',      // Single or Multiple
    cellSelectionMode: 'Flow' // Flow or Box
  };
}
```

### editSettings
**Type:** `EditSettingsModel`  
**Description:** Configures editing behavior, modes, and dialogs

```typescript
import { Component } from '@angular/core';
import { GridModule, EditService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-editing',
  standalone: true,
  imports: [GridModule],
  providers: [EditService],
  template: `
    <ejs-grid [dataSource]="data" [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridEditingComponent {
  data: any[] = [];
  editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Dialog'  // Dialog, Batch, InlineAdd, InlineEdit, etc.
  };
}
```
