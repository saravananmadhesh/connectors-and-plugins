# Excel Export

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Critical Rule: Async Methods](#critical-rule-async-methods)
- [Basic Export](#basic-export)
- [Export Options](#export-options)
- [Export Templates](#export-templates)
- [Exporting Server-Side](#exporting-server-side)

## When to Use This Skill

Use this skill when you need to:
- **Export to Excel** — Generate Excel files from grid data with formatting
- **Apply export options** — Configure Excel export with custom settings
- **Include templates in export** — Export formatted content from custom column templates
- **Server-side export** — Offload large exports to backend services
- **Auto-fit columns** — Automatically adjust column widths in exported file
- **Format numbers/dates** — Preserve formatting in exported Excel
- **Multi-sheet exports** — Create multiple sheets from grouped data
- **Async export handling** — Wait for export completion before proceeding

## Overview

Export grid data to Excel format with full formatting, formulas, and styling. Useful for reporting, data analysis, and archiving.

## Critical Rule: Async Methods

#### Rule 1: Export Methods Return Promises — Must Be Awaited

Export methods are asynchronous. If you don't await them, export may not complete before your code continues.

```typescript
// ❌ WRONG - Export might not complete
handleExport() {
  this.gridComponent.excelExport();  // Fire and forget
  console.log('Export complete');    // Runs before export finishes
}

// ✅ CORRECT - Wait for completion
async handleExport() {
  await this.gridComponent.excelExport();
  console.log('Export complete');  // Runs after export finishes
}

// ❌ WRONG - Multiple exports race condition
export() {
  this.gridComponent.excelExport();
  this.gridComponent.pdfExport();   // May not export all data correctly
}

// ✅ CORRECT - Export sequentially
async export() {
  await this.gridComponent.excelExport();  // Wait for Excel
  await this.gridComponent.pdfExport();    // Then PDF
}

// ❌ WRONG - Can't perform actions during export
export() {
  this.gridComponent.excelExport();
  this.disableButton();  // Runs before export completes
  this.showToast('Exporting...');
}

// ✅ CORRECT - Show feedback after export
async export() {
  try {
    this.disableButton();
    this.showToast('Exporting...');
    
    await this.gridComponent.excelExport();
    
    this.showToast('Export complete!', 'success');
  } finally {
    this.enableButton();
  }
}
```

---

## Basic Export

Export grid data to Excel with toolbar button:

```typescript
import { Component } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-excel-export-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              id='Grid'
              [toolbar]="['ExcelExport']"
              [allowExcelExport]='true'
              (toolbarClick)='toolbarClick($event)'
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
export class ExcelExportGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) }
  ];

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_excelexport') { 
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        (this.grid as GridComponent).excelExport();
    }
  }
}
```

## Export Options

Configure export with custom options:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-excel-options-grid',
  template: `
    <button (click)="exportWithOptions()">Export with Options</button>
    <button (click)="exportSelected()">Export Selected Rows</button>
    
    <ejs-grid #grid [dataSource]="data" 
              [allowExcelExport]='true'
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
export class ExcelOptionsGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  exportWithOptions() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'orders.xlsx',
      dataSource: this.data,
      columns: [
        { field: 'OrderID', headerText: 'Order ID', width: 100 },
        { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
        { field: 'Freight', headerText: 'Freight', format: 'C2', width: 120 }
      ]
    };
    this.grid.excelExport(excelExportProperties);
  }

  exportSelected() {
    const excelExportProperties: ExcelExportProperties = {
      fileName: 'selected-orders.xlsx',
      dataSource: this.data,
      isCollapsedStatePersist: true
    };
    this.grid.excelExport(excelExportProperties);
  }
}
```

## Export Templates

Use templates to customize exported content:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, ExcelExportProperties, ExcelExportEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-excel-template-grid',
  template: `
    <ejs-grid #grid id='Grid' [dataSource]="data" 
              [toolbar]="['ExcelExport']"
              [allowExcelExport]='true'
              (toolbarClick)='toolbarClick($event)'
              (beforeExcelExport)="onBeforeExcelExport($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ExcelTemplateGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];

  onBeforeExcelExport(args: ExcelExportEventArgs) {
    const excelData = args.data;
    // Modify export data, add headers, styling, etc.
    console.log('Exporting to Excel:', excelData);
    // args.cancel = true; // Prevent export if needed
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_excelexport') { 
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        (this.grid as GridComponent).excelExport();
    }
  }
}
```

## Exporting Server-Side

Handle export on the server:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-excel-server-export-grid',
  template: `
    <button (click)="serverExport()">Export to Server</button>
    
    <ejs-grid #grid [dataSource]="data" [allowExcelExport]='true'>
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ExcelServerExportGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  constructor(private http: HttpClient) { }

  serverExport() {
    const payload = { data: this.data };
    this.http.post('api/export/excel', payload, {
      responseType: 'blob'
    }).subscribe((result) => {
      // Download file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(result);
      link.download = 'export.xlsx';
      link.click();
    });
  }
}
```
