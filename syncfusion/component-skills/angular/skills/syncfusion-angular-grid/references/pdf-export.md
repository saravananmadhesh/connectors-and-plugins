# PDF Export

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Critical Rule: Async Methods](#critical-rule-async-methods)
- [Basic PDF Export](#basic-pdf-export)
- [PDF Export Options](#pdf-export-options)
- [Custom Headers and Footers](#custom-headers-and-footers)
- [Exporting with Templates](#exporting-with-templates)

## When to Use This Skill

Use this skill when you need to:
- **Export to PDF** — Generate PDF files from grid data
- **Create reports** — Generate formatted reports for distribution
- **Custom PDF styling** — Control fonts, colors, and layout in PDF
- **Add headers/footers** — Include titles, page numbers, dates in PDF
- **Hierarchical export** — Export master-detail grids to PDF
- **Wide grid export** — Fit wide grids across PDF pages
- **Template export** — Include formatted content in PDF
- **Async export handling** — Wait for PDF generation completion

## Overview

Export grid data to PDF format for documentation, reports, and sharing. Supports custom styling, headers, footers, and hierarchical data.

## Critical Rule: Async Methods

#### Rule 1: PDF Export Methods Return Promises — Must Be Awaited

PDF export methods are asynchronous. Failing to await causes incomplete exports or race conditions.

```typescript
// ❌ WRONG - Export might not complete
@Component({...})
export class MyComponent {
  handleExport() {
    this.gridComponent.pdfExport();    // Fire and forget
    this.updateStatus('Done');         // Runs before export finishes
  }
}

// ✅ CORRECT - Wait for completion
@Component({...})
export class MyComponent {
  async handleExport() {
    await this.gridComponent.pdfExport();
    this.updateStatus('Export complete');  // Runs after export finishes
  }
}

// ❌ WRONG - Multiple exports race condition
export() {
  this.gridComponent.pdfExport();
  this.gridComponent.csvExport();   // Both may interfere
}

// ✅ CORRECT - Export sequentially
async export() {
  await this.gridComponent.pdfExport();   // Wait for PDF
  await this.gridComponent.csvExport();   // Then CSV
}

// ❌ WRONG - UI updates before export completes
export() {
  this.isExporting = true;
  this.gridComponent.pdfExport();
  this.isExporting = false;  // Too early
}

// ✅ CORRECT - Update UI after export
async export() {
  this.isExporting = true;
  try {
    await this.gridComponent.pdfExport();
    this.showSuccess('PDF exported');
  } catch (error) {
    this.showError('Export failed');
  } finally {
    this.isExporting = false;
  }
}
```

---

## Basic PDF Export

Export grid data to PDF with toolbar button:

```typescript
import { Component } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-pdf-export-grid',
  template: `
    <ejs-grid id='Grid' [dataSource]="data" 
              [toolbar]="['PdfExport']"
              [allowPdfExport]='true'
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
export class PdfExportGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83, OrderDate: new Date(1996, 7, 16) }
  ];

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        (this.grid as GridComponent).pdfExport();
    }
  }
}
```

## PDF Export Options

Configure PDF export with page setup and styling:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-pdf-options-grid',
  template: `
    <button (click)="pdfExportOptions()">Export PDF with Options</button>
    <button (click)="pdfExportLandscape()">Export Landscape</button>
    
    <ejs-grid #grid [dataSource]="data" [allowPdfExport]='true'>
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PdfOptionsGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  pdfExportOptions() {
    const pdfExportProperties: PdfExportProperties = {
      fileName: 'orders.pdf',
      pageSize: 'A4',
      pageOrientation: 'Portrait'
    };
    this.grid.pdfExport(pdfExportProperties);
  }

  pdfExportLandscape() {
    const pdfExportProperties: PdfExportProperties = {
      fileName: 'orders-landscape.pdf',
      pageSize: 'A4',
      pageOrientation: 'Landscape',
      dataSource: this.data
    };
    this.grid.pdfExport(pdfExportProperties);
  }
}
```

## Custom Headers and Footers

Add headers and footers to PDF export:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-pdf-header-footer-grid',
  template: `
    <button (click)="exportWithHeaderFooter()">Export with Header & Footer</button>
    
    <ejs-grid #grid [dataSource]="data" [allowPdfExport]='true'>
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PdfHeaderFooterGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];

  exportWithHeaderFooter() {
    const pdfExportProperties: PdfExportProperties = {
      fileName: 'orders-report.pdf',
      pageOrientation: 'Portrait',
      pageSize: 'A4'
    };

    // Add custom header
    (pdfExportProperties as any).header = {
      fromTop: 0,
      height: 60,
      contents: [
        {
          type: 'text',
          value: 'Order Report',
          position: { x: 250, y: 20 },
          style: { fontSize: 20, bold: true }
        },
        {
          type: 'text',
          value: `Generated on ${new Date().toLocaleDateString()}`,
          position: { x: 250, y: 45 },
          style: { fontSize: 10 }
        }
      ]
    };

    // Add custom footer
    (pdfExportProperties as any).footer = {
      fromBottom: 160,
      height: 60,
      contents: [
        {
          type: 'pageNumber',
          format: 'Page ${$current} of ${$total}',
          position: { x: 250, y: 20 },
          style: { fontSize: 10 }
        }
      ]
    };

    this.grid.pdfExport(pdfExportProperties);
  }
}
```

## Exporting with Templates

Export grid with grouped data and templates:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { GroupSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-pdf-template-grid',
  template: `
    <button (click)="exportGroupedPDF()">Export Grouped Data</button>
    
    <ejs-grid #grid [dataSource]="data"
              [allowGrouping]="true"
              [groupSettings]="groupSettings"
              [allowPdfExport]='true'>
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PdfTemplateGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  groupSettings: GroupSettingsModel = {
    columns: ['ShipCity']
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];

  exportGroupedPDF() {
    const pdfExportProperties: PdfExportProperties = {
      fileName: 'grouped-orders.pdf',
      pageSize: 'A4',
      pageOrientation: 'Landscape'
    };
    this.grid.pdfExport(pdfExportProperties);
  }
}
```
