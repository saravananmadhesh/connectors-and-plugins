# Getting Started

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Installation](#installation)
- [Package Setup](#package-setup)
- [CSS Imports](#css-imports)
- [Basic Grid Initialization](#basic-grid-initialization)
- [Minimal Working Example](#minimal-working-example)

## When to Use This Skill

Use this skill when you need to:
- **Set up Angular Grid** — Install and configure Syncfusion Grid in Angular projects
- **Install packages** — Add required npm packages
- **Configure modules** — Import GridModule in Angular modules
- **Add CSS styles** — Include required Syncfusion stylesheets
- **Initialize grid** — Create first working grid component
- **Configure data binding** — Show how to bind data to grid
- **Basic column setup** — Define and configure columns
- **CSS troubleshooting** — Fix unstyled pager and other components

## Installation

Install Syncfusion Angular Grid component via npm:

```bash
npm install @syncfusion/ej2-angular-grids
```

## Package Setup

Import the GridModule in your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GridModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## CSS Imports

> **CSS Quick Reference:** Always import **all** required Syncfusion CSS files in your `App.css` (or equivalent). Each feature depends on a specific package's CSS:
> - **Pager** (page number buttons, navigation) → `@syncfusion/ej2-angular-grids/styles/material.css` — **missing this is the most common cause of unstyled pagers**
> - **Toolbar** → `@syncfusion/ej2-navigations/styles/material.css`
> - **Filter/Edit inputs** → `@syncfusion/ej2-inputs/styles/material.css`
> - **Dialog editing, filter menus** → `@syncfusion/ej2-popups/styles/material.css`

Include required CSS files in your main styles or component:

```typescript
// In styles.css or component.css
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-grids/styles/material.css';
```

**Available themes:**
- material (default)
- material-dark
- fabric
- fabric-dark
- bootstrap
- bootstrap-dark
- bootstrap5
- tailwind
- fluent
- fluent-dark

## Basic Grid Initialization

Create a grid with minimal configuration:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Total Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', TotalAmount: 65.83 }
  ];
}
```

## Minimal Working Example

A complete, copy-paste-ready example with basic features:

**grid.component.ts:**
```typescript
import { Component, OnInit } from '@angular/core';

interface Order {
  OrderID: number;
  CustomerName: string;
  ShipAddress: string;
  TotalAmount: number;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  data: Order[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = [
      { OrderID: 10248, CustomerName: 'VINET', ShipAddress: '59 rue de l\'Abbaye', TotalAmount: 32.38 },
      { OrderID: 10249, CustomerName: 'TOMSP', ShipAddress: 'Luisenstr. 48', TotalAmount: 11.61 },
      { OrderID: 10250, CustomerName: 'HANAR', ShipAddress: 'Rua do Paço, 67', TotalAmount: 65.83 },
      { OrderID: 10251, CustomerName: 'VICTE', ShipAddress: '2, rue du Commerce', TotalAmount: 41.34 },
      { OrderID: 10252, CustomerName: 'SUPRD', ShipAddress: 'Boulevard Tirou, 255', TotalAmount: 51.30 }
    ];
  }
}
```

**grid.component.html:**
```html
<ejs-grid [dataSource]="data" [allowPaging]="true" [pageSettings]="{ pageSize: 10 }">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" type="number" width="100"></e-column>
    <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
    <e-column field="ShipAddress" headerText="Ship Address" width="200"></e-column>
    <e-column field="TotalAmount" headerText="Total Amount" type="number" format="C2" width="120"></e-column>
  </e-columns>
</ejs-grid>
```

**grid.component.css:**
```css
:host ::ng-deep .e-grid {
  font-family: Arial, sans-serif;
}

:host ::ng-deep .e-gridheader {
  background-color: #f5f5f5;
}
```
 
## Module Injection

Syncfusion Angular Grid modules help optimize your application bundle size by including only the features you need. To enable a specific Grid feature, import and inject the corresponding Feature Module into your Grid configuration. The available Grid Feature Modules include

For Angular, inject the required feature services from `@syncfusion/ej2-angular-grids` at the component or module level. Example (component-level):

```typescript
import { Component } from '@angular/core';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  providers: [PageService, SortService, FilterService, GroupService]
})
export class GridComponent {}
```

### Common Modules

| Feature | Module | Description |
|--------|--------|-------------|
| Paging | `PageService` | Inject this module to use paging feature. |
| Sorting| `SortService` | Inject this module to use sorting feature. |
| Filtering | `FilterService` | Inject this module to use filtering feature. |
| Grouping | `GroupService` | Inject this module to use grouping feature. |
| Lazy Load Grouping | `LazyLoadGroupService` | Inject this module to use lazy load grouping feature. |
| Editing | `EditService` | Inject this module to use editing feature. |
| Aggregates | `AggregateService` | Inject this module to use aggregate feature. |
| Column Chooser | `ColumnChooserService` | Inject this module to use column chooser feature. |
| Column Menu | `ColumnMenuService` | Inject this module to use column menu feature. |
| Command Column | `CommandColumnService` | Inject this module to use command column feature. |
| Context Menu | `ContextMenuService` | Inject this module to use context menu feature. |
| Detail Row | `DetailRowService` | Inject this module to use detail template feature. |
| Foreign Key | `ForeignKeyService` | Inject this module to use foreign key feature. |
| Resize | `ResizeService` | Inject this module to use resize feature. |
| Reordering | `ReorderService` | Inject this module to use reorder feature. |
| Row Drag and Drop | `RowDDService` | Inject this module to use row drag and drop feature. |
| Virtual Scrolling | `VirtualScrollService` | Inject this module to use virtual scrolling feature. |
| Infinite Scrolling | `InfiniteScrollService` | Inject this module to use infinite scrolling feature. |
| Toolbar | `ToolbarService` | Inject this module to use toolbar feature. |
| Excel Export | `ExcelExportService` | Inject this module to use excel export feature. |
| PDF Export | `PdfExportService` | Inject this module to use PDF export feature. |

## Grid Example with common services injected

**src/app/app.ts** 

```typescript
import { Component, OnInit } from '@angular/core';
// Import the required grid modules from the grid package
import { FilterService, GridModule, PageService, PageSettingsModel, SortService, EditService, ToolbarService, FilterSettingsModel, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
// Import Grid data from external file
import { data } from './datasource';

@Component({
  imports: [GridModule],
  /* Inject required Grid features */
  providers: [PageService, SortService, FilterService, EditService, ToolbarService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-grid [dataSource]='data' [allowPaging]="true" [allowSorting]="true" [pageSettings]="pageSettings" [editSettings]='editSettings'
                  [toolbar]='toolbar' [allowFiltering]="true" [filterSettings]='filterSettings'>
              <e-columns>
                      <e-column field='OrderID' headerText='Order ID' isPrimaryKey='true'  [validationRules]='orderIDRules' textAlign='Right' width=90></e-column>
                      <e-column field='CustomerName' headerText='Customer Name' [validationRules]='customerIDRules' width=100></e-column>
                      <e-column field='Freight' headerText='Freight' format='C2' editType='numericedit' width=120></e-column>
                      <e-column field='OrderDate' headerText='Order Date' format='yMd' editType='datepickeredit' width=100></e-column>
                      <e-column field='ShipCountry' headerText='Ship Country' editType='dropdownedit' width=100></e-column>
                  </e-columns>
              </ejs-grid>`
})

export class AppComponent implements OnInit {

  public data?: object[];
  public pageSettings?: PageSettingsModel;
  public filterSettings?: FilterSettingsModel;
  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];
  public orderIDRules?: object;
  public customerIDRules?: object;

  ngOnInit(): void {
      this.data = data;
      this.pageSettings = { pageSize: 6 };
      this.filterSettings = { type: 'CheckBox' }
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
      this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.orderIDRules = { required: true, number: true };
      this.customerIDRules = { required: true };
  }
}
```
**src/main.ts**
```
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err)); 
```
**datasource.ts**
```
export let data: Object[] = [
    { OrderID: 10248, CustomerName: 'Ana Trujillo', OrderDate: new Date(2025, 0, 12), ShipCountry: 'France', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'Martin Sommer', OrderDate: new Date(2025, 0, 15), ShipCountry: 'Germany', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'Thomas Hardy', OrderDate: new Date(2025, 1, 5), ShipCountry: 'Brazil', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'Elizabeth Lincoln', OrderDate: new Date(2025, 1, 18), ShipCountry: 'France', Freight: 41.34 },
    { OrderID: 10252, CustomerName: 'Victoria Ashworth', OrderDate: new Date(2025, 2, 10), ShipCountry: 'Belgium', Freight: 51.30 },
    { OrderID: 10253, CustomerName: 'Martine Rance', OrderDate: new Date(2025, 2, 22), ShipCountry: 'Brazil', Freight: 58.17 },
    { OrderID: 10254, CustomerName: 'John Smith', OrderDate: new Date(2025, 3, 3), ShipCountry: 'USA', Freight: 23.45 },
    { OrderID: 10255, CustomerName: 'Emily Johnson', OrderDate: new Date(2025, 3, 15), ShipCountry: 'Canada', Freight: 45.67 }
];
```
