# Row

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Row Properties](#row-properties)
- [Row Events](#row-events)
- [Row Templates](#row-templates)
- [Detail Templates](#detail-templates)

## When to Use This Skill

Use this skill when you need to:
- **Configure row behavior** — Set row height, styles, and properties
- **Handle row events** — Respond to row selection, hover, click events
- **Row templates** — Customize row content with HTML templates
- **Detail templates** — Show expanded detail content for rows
- **Row styling** — Apply conditional styling to rows
- **Row selection** — Control single/multiple row selection
- **Row visibility** — Show/hide rows based on conditions

## Overview

Rows are the horizontal containers that display individual records from your data source. Control row behavior through properties, templates, and events.

## Row Properties

Access and configure row properties:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-row-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" height="400">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RowGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', TotalAmount: 65.83 }
  ];

  ngAfterViewInit() {
    // Access row height
    const rowHeight = this.grid.getRowHeight();
    console.log('Row height:', rowHeight);

    // Get rows
    const rows = this.grid.getRows();
    rows.forEach((row, index) => {
      console.log(`Row ${index}:`, row);
    });
  }
}
```

## Row Events

Handle row-related events:

```typescript
import { Component } from '@angular/core';
import { RowSelectEventArgs, RowDeselectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-row-events-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              (rowSelecting)="onRowSelecting($event)"
              (rowSelected)="onRowSelected($event)"
              (rowDeselecting)="onRowDeselecting($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RowEventsGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  onRowSelecting(args: RowSelectEventArgs) {
    console.log('Row selecting:', args.data);
    // args.cancel = true; // To prevent selection
  }

  onRowSelected(args: RowSelectEventArgs) {
    console.log('Row selected:', args.data);
  }

  onRowDeselecting(args: RowDeselectEventArgs) {
    console.log('Row deselecting:', args.data);
  }
}
```

## Row Templates

Use custom templates to render entire rows:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-row-template-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>
      
      <ng-template #rowTemplate let-data>
        <tr>
          <td style="padding: 10px; background-color: #f9f9f9;">
            <strong>Order: {{ data.OrderID }}</strong>
          </td>
          <td style="padding: 10px;">
            {{ data.CustomerName }}
          </td>
          <td style="padding: 10px; text-align: right;">
            <span [style.color]="data.TotalAmount > 50 ? 'green' : 'orange'">
              {{ data.TotalAmount | currency }}
            </span>
          </td>
        </tr>
      </ng-template>
    </ejs-grid>
  `
})
export class RowTemplateGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', TotalAmount: 65.83 }
  ];
}
```

## Detail Templates

Show hierarchical data with expandable detail rows:

```typescript
import { Component } from '@angular/core';

interface Order {
  OrderID: number;
  CustomerName: string;
  TotalAmount: number;
  Items?: OrderItem[];
}

interface OrderItem {
  ItemID: number;
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
}

@Component({
  selector: 'app-detail-template-grid',
  template: `
    <ejs-grid [dataSource]="orders" [detailTemplate]="template" 
              (detailDataBound)="onDetailDataBound($event)">
      <e-columns>
        <e-column type="expand" width="50"></e-column>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>

      <ng-template #template let-data>
        <div style="padding: 20px; background-color: #f5f5f5;">
          <h4>Items for Order {{ data.OrderID }}</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #e0e0e0;">
                <th style="padding: 8px; border: 1px solid #ccc;">Product</th>
                <th style="padding: 8px; border: 1px solid #ccc;">Quantity</th>
                <th style="padding: 8px; border: 1px solid #ccc;">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of data.Items">
                <td style="padding: 8px; border: 1px solid #ccc;">{{ item.ProductName }}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">{{ item.Quantity }}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">{{ item.UnitPrice | currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-template>
    </ejs-grid>
  `
})
export class DetailTemplateGridComponent {
  orders: Order[] = [
    { 
      OrderID: 10248, 
      CustomerName: 'VINET', 
      TotalAmount: 32.38,
      Items: [
        { ItemID: 1, ProductName: 'Quiche Lorraine', Quantity: 5, UnitPrice: 6.00 },
        { ItemID: 2, ProductName: 'Singaporean Hokkien Mee', Quantity: 10, UnitPrice: 3.60 }
      ]
    },
    { 
      OrderID: 10249, 
      CustomerName: 'TOMSP', 
      TotalAmount: 11.61,
      Items: [
        { ItemID: 3, ProductName: 'Tourtière', Quantity: 9, UnitPrice: 1.90 }
      ]
    }
  ];

  onDetailDataBound(args: any) {
    console.log('Detail template bound:', args.data);
  }
}
```
