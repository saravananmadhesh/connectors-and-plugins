# Print

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Basic Printing](#basic-printing)
- [Programmatic Printing](#programmatic-printing)
- [Print Styling](#print-styling)

## When to Use This Skill

Use this skill when you need to:
- **Print grid data** — Generate print-friendly grid output
- **Print button** — Add print functionality to toolbar
- **Programmatic printing** — Trigger print via code
- **Custom print styling** — Optimize grid appearance for printing
- **Page breaks** — Control how grid spans multiple pages
- **Print layouts** — Customize header, footer, margins
- **Print preview** — Show preview before printing

## Overview

Print grid data with full formatting and layout control. Optimize grid appearance for printed output.

## Basic Printing

Enable print functionality with toolbar button:

```typescript
import { Component } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-print-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [toolbar]="['Print']"
              [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PrintGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) }
  ];
}
```

## Programmatic Printing

Trigger print from custom button:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-custom-print-grid',
  template: `
    <button (click)="printGrid()" style="padding: 8px 16px; margin-bottom: 10px;">
      Print Grid
    </button>
    
    <ejs-grid #grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CustomPrintGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  printGrid() {
    this.grid.print();
  }
}
```

## Print Styling

Customize grid appearance for printing:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-print-style-grid',
  template: `
    <style>
      @media print {
        .no-print { display: none !important; }
        :host ::ng-deep .e-grid {
          font-size: 12px;
        }
        :host ::ng-deep .e-gridheader {
          background-color: #e0e0e0;
        }
      }
    </style>
    
    <button class="no-print" (click)="printGrid()">Print</button>
    
    <ejs-grid #grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PrintStyleGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];
}
```
