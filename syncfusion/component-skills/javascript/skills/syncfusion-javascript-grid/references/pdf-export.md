---
name: pdf-export
description: 'PDF export in Syncfusion Grid: options, headers/footers, templates, server export.'
---

# Export to PDF

## Table of Contents
- [Overview](#overview)
- [PDF Export Basics](#pdf-export-basics)
- [PDF Configuration](#pdf-configuration)
- [Headers and Footers](#headers-and-footers)
- [Server-Side Export](#server-side-export)

## When to Use This Reference

- Export grid data to PDF documents
- Configure PDF layout, page breaks, and orientation
- Apply formatting, headers, and footers to exports
- Include images and custom content in PDF
- Handle large dataset exports and file generation

## Overview

Export grid data to PDF format with customization for headers, footers, styling, page layout, and orientation. The PDF export feature allows you to programmatically or manually export grid data with full control over columns, filters, and custom formatting.

## PDF Export Basics

### Enable PDF Export

```ts
import { Grid, Toolbar, PdfExport, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, PdfExport, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['PdfExport'],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Programmatic PDF Export

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');

// Export grid to PDF
grid.pdfExport();

// Export with filename
grid.pdfExport('Orders.pdf');
```

## PDF Configuration

### Set File Name and Title

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'orders.pdf'
  }
});

grid.appendTo('#grid');
```

### PDF Export Settings

```ts
import { Grid, Toolbar, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, PdfExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, type: 'number' },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'Orders.pdf',
    pageOrientation: 'Portrait',
    pageSize: 'A4'
  }
});

grid.appendTo('#grid');
```

### Page Orientation

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'Orders.pdf',
    pageOrientation: 'Landscape'  // or 'Portrait'
  }
});

grid.appendTo('#grid');
```

### Page Size

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    pageOrientation: 'Landscape',
    pageSize: 'A4'  // A4, A3, A5, Letter, Legal, etc.
  }
});

grid.appendTo('#grid');
```

### Export Selected Records

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: [{
    text: 'Export Selected',
    id: 'grid_export_selected',
    prefixIcon: 'e-icons e-export-pdf'
  }],
  toolbarClick: (args: any) => {
    if (args.item.id === 'grid_export_selected') {
      const pdfExportProperties = {
        dataSource: grid.getSelectedRecords()
      };
      grid.pdfExport(pdfExportProperties);
    }
  },
  allowSelection: true
});

grid.appendTo('#grid');
```

### Filtered Data Export

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: [{
    text: 'Export PDF',
    id: 'grid_export_pdf',
    prefixIcon: 'e-icons e-export-pdf'
  }],
  toolbarClick: (args: any) => {
    if (args.item.id === 'grid_export_pdf') {
      grid.pdfExport();  // Exports filtered/sorted data
    }
  },
  allowFiltering: true
});

grid.appendTo('#grid');
```

## Headers and Footers

### Add Page Header

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'Orders.pdf',
    header: {
      fromTop: 0,
      height: 60,
      contents: [
        {
          type: 'Text',
          value: 'Orders Report',
          position: { x: 150, y: 50 },
          style: { fontSize: 20, fontFamily: 'Calibri' }
        }
      ]
    }
  }
});

grid.appendTo('#grid');
```

### Add Page Footer

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'Orders.pdf',
    footer: {
      fromBottom: 160,
      height: 60,
      contents: [
        {
          type: 'Text',
          value: 'Page {$current} of {$total}',
          position: { x: 150, y: 20 },
          style: { fontSize: 10 }
        }
      ]
    }
  }
});

grid.appendTo('#grid');
```

### Add Custom Logo

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    fileName: 'Orders.pdf',
    header: {
      height: 80,
      contents: [
        {
          type: 'Image',
          src: 'logo.png',
          position: { x: 300, y: 50 },
          width: 50,
          height: 50
        },
        {
          type: 'Text',
          value: 'Company Orders',
          position: { x: 350, y: 50 }
        }
      ]
    }
  }
});

grid.appendTo('#grid');
```

## Server-Side Export

### Export to Server

```ts
import { Grid, Toolbar, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, PdfExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  beforePdfExport: (args: any) => {
    // Send to server for processing
    console.log('Preparing PDF export');
  }
});

grid.appendTo('#grid');

// Server-side export
grid.pdfExport(null, null, false, '/api/grid/export-pdf');
```

### Custom PDF Generation

```ts
const exportWithCustomization = () => {
  const payload = {
    gridData: grid.getCurrentViewRecords(),
    title: 'Orders Report',
    columns: grid.getVisibleColumns(),
    fileName: 'orders.pdf'
  };

  fetch('/api/grid/generate-pdf', {
    method: 'POST'
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
```

### Export with Summary

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportProperties: {
    footer: {
      height: 80,
      contents: [
        {
          type: 'Text',
          value: `Total Records: ${grid.currentViewData.length}`,
          position: { x: 200, y: 20 }
        },
        {
          type: 'Text',
          value: `Exported on: ${new Date().toLocaleDateString()}`,
          position: { x: 200, y: 40 }
        }
      ]
    }
  }
});

grid.appendTo('#grid');
```

### Export Events

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['PdfExport'],
  pdfExportComplete: (args: any) => {
    console.log('PDF export completed');
  },
  pdfQueryCellInfo: (args: any) => {
    // Customize individual cells in PDF
    if (args.column.field === 'Freight' && args.value > 50) {
      args.style = { backColor: 'RGB(255, 192, 0)' };
    }
  }
});

grid.appendTo('#grid');
```
