# Clipboard

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Enable Copy/Paste](#enable-copypaste)
- [Copy with Formatting](#copy-with-formatting)

## When to Use This Skill

Use this skill when you need to:
- **Copy/paste functionality** — Enable users to copy grid cells and paste into other applications
- **Excel integration** — Allow copying grid data to Excel with formatting preserved
- **Clipboard operations** — Support Ctrl+C/Ctrl+V keyboard shortcuts for cell selection
- **Multi-cell copying** — Copy multiple selected cells or entire rows
- **Formatted copying** — Preserve headers, formatting, and structure when copying
- **Paste with validation** — Validate pasted data before updating the grid
- **Export to external apps** — Enable users to move grid data to spreadsheets or documents
- **Batch data entry** — Support pasting multiple rows at once for bulk operations

## Overview

Clipboard functionality enables copy/paste operations for grid cells and rows. Users can copy data and paste into Excel, other applications, or back into the grid.

## Enable Copy/Paste

Basic copy and paste functionality:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-clipboard-grid',
  template: `
    <p style="padding: 10px; color: #666;">
      Tip: Select cells and press Ctrl+C to copy, Ctrl+V to paste
    </p>
    
    <ejs-grid [dataSource]="data" 
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Cell', type: 'Multiple' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ClipboardGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];
}
```

## Copy with Formatting

Copy cells with headers and formatting:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-clipboard-format-grid',
  template: `
    <div style="margin-bottom: 10px;">
      <button (click)="copyWithHeaders()">Copy with Headers</button>
      <button (click)="copySelectedRows()">Copy Selected Rows</button>
    </div>
    
    <ejs-grid #grid [dataSource]="data" 
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Row', type: 'Multiple' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ClipboardFormatGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  copyWithHeaders() {
    const selectedRows = this.grid.getSelectedRowIndexes();
    let text = 'Order ID\tCustomer Name\tFreight\n';
    selectedRows.forEach((index) => {
      const row = this.grid.getCurrentViewRecords()[index];
      text += `${row.OrderID}\t${row.CustomerName}\t${row.Freight}\n`;
    });
    navigator.clipboard.writeText(text);
    console.log('Copied with headers');
  }

  copySelectedRows() {
    const selectedRows = this.grid.getSelectedRowIndexes();
    let text = '';
    selectedRows.forEach((index) => {
      const row = this.grid.getCurrentViewRecords()[index];
      text += `${row.OrderID}\t${row.CustomerName}\t${row.Freight}\n`;
    });
    navigator.clipboard.writeText(text);
  }
}
```
