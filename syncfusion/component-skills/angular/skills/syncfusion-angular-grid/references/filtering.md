# Filtering

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Filter Bar](#filter-bar)
- [Filter Menu](#filter-menu)
- [Excel-Like Filter](#excel-like-filter)
- [Advanced Filtering](#advanced-filtering)
- [Filter Events](#filter-events)

## When to Use This Skill

Use this skill when you need to:
- **Enable data filtering** — Allow users to filter grid by column values
- **Filter bar** — Add inline filter input below headers
- **Filter menu** — Provide dropdown menus for filtering options
- **Excel-like filtering** — Implement Excel-style filter UI with checkboxes
- **Advanced filtering** — Build complex multi-criteria filters
- **Programmatic filtering** — Filter grid data via code/API
- **Filter events** — Handle filtering state changes
- **Search and filter** — Combine search with advanced filtering

## Overview

Filtering enables users to display only rows that match specified criteria. Grid supports multiple filtering modes to suit different use cases.

## Filter Bar

Enable inline filter bar below the header:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-bar-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowFiltering]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class FilterBarGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) }
  ];
}
```

## Filter Menu

Enable filter dropdown menu in headers:

```typescript
import { Component } from '@angular/core';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-filter-menu-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowFiltering]="true"
              [filterSettings]="filterSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class FilterMenuGridComponent {
  filterSettings: FilterSettingsModel = {
    type: 'Menu'  // 'Menu', 'FilterBar', 'Both'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];
}
```

## Excel-Like Filter

Enable spreadsheet-style filtering with checkboxes:

```typescript
import { Component } from '@angular/core';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-excel-filter-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowFiltering]="true"
              [filterSettings]="filterSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Status" headerText="Status" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ExcelFilterGridComponent {
  filterSettings: FilterSettingsModel = {
    type: 'Excel'  // Excel-like filter UI
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Status: 'Pending' },
    { OrderID: 10249, CustomerName: 'TOMSP', Status: 'Completed' },
    { OrderID: 10250, CustomerName: 'HANAR', Status: 'Pending' },
    { OrderID: 10251, CustomerName: 'VICTE', Status: 'Completed' }
  ];
}
```

## Advanced Filtering

Programmatically apply complex filters:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { PredicateModel } from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-advanced-filter-grid',
  template: `
    <button (click)="applyAdvancedFilter()">Apply Filter</button>
    <button (click)="clearFilter()">Clear Filter</button>
    
    <ejs-grid #grid [dataSource]="data" 
              [allowFiltering]="true"
              [filterSettings]="filterSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class AdvancedFilterGridComponent {
  @ViewChild('grid') grid!: GridComponent;
  filterSettings: FilterSettingsModel = { type: 'Menu' };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) },
    { OrderID: 10251, CustomerName: 'VICTE', Freight: 55.24, OrderDate: new Date(1996, 7, 25) }
  ];

  applyAdvancedFilter() {
    // Filter: Freight > 30 AND (CustomerName = 'VINET' OR CustomerName = 'HANAR')
    const filter: PredicateModel[] = [
      { field: 'Freight', operator: 'greaterThan', value: 30 },
      { field: 'CustomerName', operator: 'equal', value: 'VINET', predicate: 'or' },
      { field: 'CustomerName', operator: 'equal', value: 'HANAR', predicate: 'or' }
    ];
    this.grid.filterByColumn('Freight', 'greaterThan', 30);
  }

  clearFilter() {
    this.grid.clearFiltering();
  }
}
```

## Filter Events

Respond to filter changes:

```typescript
import { Component } from '@angular/core';
import { FilterEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-filter-events-grid',
  template: `
    <div style="padding: 10px; background-color: #f0f0f0;">
      <p>Last Filter: {{ lastFilter }}</p>
    </div>
    <ejs-grid [dataSource]="data" 
              [allowFiltering]="true"
              (actionBegin)="onFiltering($event)"
              (actionComplete)="onFiltered($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class FilterEventsGridComponent {
  lastFilter = 'None';

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' },
    { OrderID: 10250, CustomerName: 'HANAR' }
  ];

  onFiltering(args: FilterEventArgs) {
    console.log('Filtering:', args);
    // args.cancel = true; // Cancel filtering if needed
  }

  onFiltered(args: FilterEventArgs) {
    console.log('Filtered:', args);
    this.lastFilter = `Column: ${args.currentFilteringColumn}, Value: ${args.currentFilterValue}`;
  }
}
```
