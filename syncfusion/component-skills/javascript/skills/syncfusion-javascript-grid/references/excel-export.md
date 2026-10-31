---
name: excel-export
description: 'Excel export in Syncfusion Grid: options, templates, server-side export.'
---

# Export to Excel

## Table of Contents
- [Overview](#overview)
- [Excel Export Basics](#excel-export-basics)
- [Export Configuration](#export-configuration)
- [Template Rendering in Export](#template-rendering-in-export)
- [Server-Side Export](#server-side-export)

## When to Use This Reference

- Export grid data to Excel spreadsheets
- Configure column formatting and styles in exports
- Include or exclude specific columns from export
- Apply custom headers, footers, and metadata
- Handle large dataset exports and file generation

## Overview

Export grid data to Excel format with customization options for formatting, templates, and file naming. The Excel export feature allows you to programmatically or manually export grid data with full control over columns, filters, formatting, and custom templates.

## Excel Export Basics

### Enable Excel Export

```ts
import { Grid, Toolbar, ExcelExport, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport, Page);

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
  toolbar: ['ExcelExport'],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Add Export Button

```ts
import { Grid, Toolbar, ExcelExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  toolbar: ['ExcelExport'],
  allowExcelExport: true,
  toolbarClick: (args: any) => {
    if (args.item.id === 'grid_excelexport') {
      grid.excelExport();
    }
  }
});

grid.appendTo('#grid');
```

### Programmatic Export

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');

// Export grid to Excel
grid.excelExport();

// Export with specific filename
grid.excelExport('OrderData');
```

## Export Configuration

### Set Export File Name

```ts
const exportToExcel = () => {
  const excelExportProperties = {
    fileName: 'orders.xlsx'
  };
  grid.excelExport(excelExportProperties);
};
```

### Excel Export Options

```ts
import { Grid, Toolbar, ExcelExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, type: 'number' },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  toolbar: ['ExcelExport'],
  excelExportProperties: {
    fileName: 'Orders.xlsx',
    hierarchyExportMode: 'All',
    isCollapsedStateSave: false
  }
});

grid.appendTo('#grid');
```

### Export Selected Records

```ts
const exportSelectedRows = () => {
  const excelExportProperties = {
    dataSource: grid.getSelectedRecords()
  };
  grid.excelExport(excelExportProperties);
};
```

### Export Filtered Data

```ts
const exportFilteredData = () => {
  const excelExportProperties = {
    dataSource: grid.getCurrentViewRecords()
  };
  grid.excelExport(excelExportProperties);
};
```

### Customize Export Columns

```ts
const exportToExcel = () => {
  const excelExportProperties = {
    columns: [
      { field: 'OrderID' },
      { field: 'CustomerID' },
      { field: 'Freight' }
    ]
  };
  grid.excelExport(excelExportProperties);
};
```

## Template Rendering in Export

### Include Column Templates

```ts
import { Grid, Toolbar, ExcelExport, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport, Page);

const employeeData = [
  { EmployeeID: 1, EmployeeImage: 'base64encodedimage...', FirstName: 'Nancy', EmailID: 'nancy@example.com' },
  { EmployeeID: 2, EmployeeImage: 'base64encodedimage...', FirstName: 'Michael', EmailID: 'michael@example.com' }
];

const grid = new Grid({
  dataSource: employeeData,
  toolbar: ['ExcelExport'],
  allowExcelExport: true,
  excelQueryCellInfo: (args: any) => {
    if (args.column.headerText === 'Employee Image') {
      args.image = {
        base64: args.data.EmployeeImage,
        height: 70,
        width: 70
      };
    }
    if (args.column.headerText === 'Email ID') {
      args.hyperLink = {
        target: 'mailto:' + args.data.EmailID,
        displayText: args.data.EmailID
      };
    }
  },
  columns: [
    { field: 'EmployeeID', headerText: 'Employee ID', width: 125 },
    { field: 'FirstName', headerText: 'Name', width: 120 },
    { field: 'EmailID', headerText: 'Email ID', width: 170 }
  ]
});

grid.appendTo('#grid');
```

### Export with Formatted Templates

```ts
import { Grid, Toolbar, ExcelExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      field: 'Status',
      headerText: 'Status',
      width: 120,
      template: '<span class="status-${Status}">${Status}</span>',
      displayAsCheckBox: false
    },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ],
  toolbar: ['ExcelExport'],
  beforeExcelExport: (args: any) => {
    // Customize before export
    console.log('Exporting to Excel...');
  }
});

grid.appendTo('#grid');
```

### Custom Export Format

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['ExcelExport'],
  beforeExcelExport: (args: any) => {
    // Customize workbook before export
    if (args.workbook && args.workbook.worksheets) {
      args.workbook.worksheets[0].name = 'Orders';
    }
  }
});

grid.appendTo('#grid');
```

## Server-Side Export

### Enable Server-Side Excel Export

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['ExcelExport'],
  actionBegin: (args: any) => {
    if (args.requestType === 'excel') {
      // Send export request to server
      fetch('/api/grid/export-excel', {
        method: 'POST',
        body: JSON.stringify(grid.getCurrentViewRecords())
      })
      .then(response => response.blob())
      .then(blob => {
        // Trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
});

grid.appendTo('#grid');
```

### Export to Server

```ts
import { Grid, Toolbar, ExcelExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['ExcelExport'],
  beforeExcelExport: (args: any) => {
    // Send to server for processing
    const excelPromise = args.promise;
    excelPromise.then((customizeCell: any) => {
      // Server-side export logic
    });
  }
});

grid.appendTo('#grid');

// Export with server URL
grid.excelExport(null, null, false, '/api/grid/export-excel');
```

### Export with Server Formatting

```ts
const exportWithServerProcessing = () => {
  const payload = {
    gridData: grid.getCurrentViewRecords(),
    columns: grid.getVisibleColumns(),
    fileName: 'orders.xlsx'
  };

  fetch('/api/grid/export', {
    method: 'POST'
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
```

### Export Event Handling

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  toolbar: ['ExcelExport'],
  excelExportComplete: (args: any) => {
    console.log('Excel export completed');
  },
  excelQueryCellInfo: (args: any) => {
    // Customize individual cells
    if (args.column.field === 'Freight' && args.value > 50) {
      args.style = { backColor: '#FFC000' };
    }
  }
});

grid.appendTo('#grid');
```
