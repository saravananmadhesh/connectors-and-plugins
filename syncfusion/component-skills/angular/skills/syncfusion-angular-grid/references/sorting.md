# Sorting

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Single Column Sorting](#single-column-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Custom Sort](#custom-sort)
- [Sort Events](#sort-events)

## When to Use This Skill

Use this skill when you need to:
- **Sort grid data** — Reorder rows based on column values
- **Single column sort** — Sort by clicking column header
- **Multi-column sort** — Sort by multiple columns at once
- **Custom sort logic** — Implement custom comparison functions
- **Programmatic sorting** — Apply sorting via code/API
- **Sort events** — Hook into sort start/complete events
- **Ascending/descending** — Control sort direction
- **Allow/disallow sorts** — Enable sorting on specific columns

## Overview

Sorting reorders grid rows based on column values. Users can sort by clicking column headers, or you can apply sorting programmatically.

## Single Column Sorting

Enable sorting with clickable headers:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-grid',
  template: `
    <ejs-grid [dataSource]="data" [allowSorting]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150" 
                  [allowSorting]="true"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class SortGridComponent {
  data = [
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) },
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) }
  ];
}
```

## Multi-Column Sorting

Sort by multiple columns simultaneously:

```typescript
import { Component } from '@angular/core';
import { SortSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-multisort-grid',
  template: `
    <p style="padding: 10px; color: #666;">Tip: Hold Shift and click columns to sort by multiple columns</p>
    <ejs-grid [dataSource]="data" 
              [allowSorting]="true"
              [sortSettings]="sortSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class MultiSortGridComponent {
  sortSettings: SortSettingsModel = {
    columns: [
      { field: 'ShipCity', direction: 'Ascending' },
      { field: 'CustomerName', direction: 'Ascending' }
    ]
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];
}
```

## Custom Sort

Apply custom sort order for specific scenarios:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataManager, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-custom-sort-grid',
  template: `
    <button (click)="sortByFreight()">Sort by Freight (Descending)</button>
    <button (click)="sortByCustom()">Custom Sort (City, then Name)</button>
    <button (click)="clearSort()">Clear Sort</button>
    
    <ejs-grid #grid [dataSource]="data" [allowSorting]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CustomSortGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 }
  ];

  sortByFreight() {
    this.grid.sortByColumn('Freight', 'Descending', true);
  }

  sortByCustom() {
    this.grid.sortByColumn('ShipCity', 'Ascending', true);
    this.grid.sortByColumn('CustomerName', 'Ascending', false);
  }

  clearSort() {
    this.grid.clearSorting();
  }
}
```

## Sort Events

Handle sort operations with events:

```typescript
import { Component } from '@angular/core';
import { SortEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-sort-events-grid',
  template: `
    <div style="padding: 10px; background-color: #f0f0f0;">
      <p>Last Sort: {{ lastSort }}</p>
    </div>
    <ejs-grid [dataSource]="data" 
              [allowSorting]="true"
              (actionComplete)="onSortComplete($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class SortEventsGridComponent {
  lastSort = 'None';

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10250, CustomerName: 'HANAR' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  onSortComplete(args: SortEventArgs) {
    console.log('Sort complete:', args);
    this.lastSort = `Column: ${args.columnName}, Direction: ${args.direction}`;
  }
}
```
