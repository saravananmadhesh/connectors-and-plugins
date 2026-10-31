# Cell

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Cell Properties](#cell-properties)
- [Cell Editing](#cell-editing)
- [Cell Events](#cell-events)
- [Cell Styling](#cell-styling)

## When to Use This Skill

Use this skill when you need to:
- **Configure cell-level properties** — Set individual cell widths, alignment, and behavior
- **Implement cell editing** — Enable inline editing of specific cells with validation
- **Handle cell events** — Respond to cell selection, editing, and content changes
- **Style cells conditionally** — Apply custom styling based on cell values or conditions
- **Cell selection** — Enable single or multiple cell selection with keyboard support
- **Cell templates** — Create custom cell content with HTML templates
- **Cell validation** — Validate data before saving cell changes
- **Cell formatting** — Format cell content (currency, dates, decimals) for display

## Overview

Cells are individual data containers. Control cell editing, content, and appearance with properties and templates.

## Cell Properties

Configure cell-level settings:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-cell-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Cell', type: 'Multiple' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100" [allowSorting]="false"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" 
                  width="120" [textAlign]="'Right'"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" 
                  format="yMd" width="130" [editType]="'DatePicker'"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CellGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) }
  ];
}
```

## Cell Editing

Enable cell-level editing:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-cell-edit-grid',
  template: `
    <p style="padding: 10px; color: #666;">Click on cells to edit double-click to enable edit</p>
    
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Cell', type: 'Multiple' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CellEditGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Batch'  // Edit mode: cell edit on double-click
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];
}
```

## Cell Events

Respond to cell interactions:

```typescript
import { Component } from '@angular/core';
import { CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-cell-events-grid',
  template: `
    <div style="padding: 10px; background-color: #f0f0f0;">
      <p>Selected Cell: {{ selectedCell }}</p>
    </div>
    
    <ejs-grid [dataSource]="data" 
              [allowSelection]="true"
              (cellSelected)="onCellSelected($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CellEventsGridComponent {
  selectedCell = 'None';

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];

  onCellSelected(args: CellSelectEventArgs) {
    this.selectedCell = `Row: ${args.rowIndex}, Column: ${args.columnIndex}, Value: ${args.value}`;
  }
}
```

## Cell Styling

Style cells conditionally:

```typescript
import { Component } from '@angular/core';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-cell-styling-grid',
  template: `
    <style>
      :host ::ng-deep .high-value {
        background-color: #c8e6c9;
        font-weight: 500;
      }
      :host ::ng-deep .low-value {
        background-color: #ffcccc;
      }
    </style>
    
    <ejs-grid [dataSource]="data" 
              (queryCellInfo)="onQueryCellInfo($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CellStylingGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  onQueryCellInfo(args: QueryCellInfoEventArgs) {
    const data = args.data as any;
    if (args.cell?.textContent && args.column?.field === 'Freight') {
      if (data.Freight > 50) {
        args.cell.classList.add('high-value');
      } else if (data.Freight < 20) {
        args.cell.classList.add('low-value');
      }
    }
  }
}
```
