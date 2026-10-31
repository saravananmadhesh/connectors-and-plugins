# PDF Export

## Table of Contents
- [When to Use](#when-to-use)
- [Basic PDF Export](#basic-pdf-export)
- [Export Options](#export-options)
- [Customize Export](#customize-export)
- [Header and Footer](#header-and-footer)
- [Advanced Features](#advanced-features)

## When to Use

Use this reference when you need to:
- Export grid data to PDF format
- Export current page, selected records, or all data
- Add headers, footers, and custom content
- Configure page orientation and size
- Apply styling and formatting to PDF exports
- Export grouped or filtered data

## Basic PDF Export

### Enable PDF Export
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbarOptions" 
    :allowPdfExport="true"
    :toolbarClick="toolbarClick"
    height="272px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" textAlign="Right" width="90"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, PdfExport } from "@syncfusion/ej2-vue-grids";
import { provide, ref } from 'vue';

const grid = ref(null);
const toolbarOptions = ['PdfExport'];

const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    grid.value.pdfExport();
  }
};

provide('grid', [Toolbar, PdfExport]);
</script>
```

## Export Options

### Export Current Page Only
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    let pdfExportProperties = {
      exportType: 'CurrentPage'
    };
    grid.value.pdfExport(pdfExportProperties);
  }
};
```

### Export Selected Records
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    let selectedRecords = grid.value.getSelectedRecords();
    let pdfExportProperties = {
      dataSource: selectedRecords
    };
    grid.value.pdfExport(pdfExportProperties);
  }
};
```

### Export Filtered Records
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    let filteredRecords = grid.value.getFilteredRecords();
    let pdfExportProperties = {
      dataSource: filteredRecords
    };
    grid.value.pdfExport(pdfExportProperties);
  }
};
```

## Customize Export

### Change Page Orientation
```javascript
const pdfExportProperties = {
  pageOrientation: 'Landscape'  // or 'Portrait'
};
grid.value.pdfExport(pdfExportProperties);
```

Supported page sizes: Letter, Note, Legal, A0-A9, B0-B5, Archa-Arche, Flsa, HalfLetter, Letter11x17, Ledger

### Change Page Size
```javascript
const pdfExportProperties = {
  pageSize: 'A4'  // or other supported sizes
};
grid.value.pdfExport(pdfExportProperties);
```

### Define Custom File Name
```javascript
const pdfExportProperties = {
  fileName: 'OrdersReport.pdf'
};
grid.value.pdfExport(pdfExportProperties);
```

### Customize Columns on Export
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    const pdfExportColumns = [
      { field: 'OrderID', textAlign: 'Right', width: '90' },
      { field: 'CustomerID', headerText: 'Customer Name', width: '100' },
      { field: 'Freight', textAlign: 'Center', width: '80' }
    ];
    let pdfExportProperties = {
      columns: pdfExportColumns
    };
    grid.value.pdfExport(pdfExportProperties);
  }
};
```

### Include Hidden Columns
```javascript
const pdfExportProperties = {
  includeHiddenColumn: true
};
grid.value.pdfExport(pdfExportProperties);
```

### Export as Blob
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbarOptions" 
    :allowPdfExport="true"
    :toolbarClick="toolbarClick"
    :pdfExportComplete="pdfExportComplete">
    <e-columns>
      <e-column field="OrderID" width="90"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const pdfExportComplete = (args) => {
  args.promise.then((e) => {
    exportBlob(e.blobData);
  });
};

const exportBlob = (blob) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'Export.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
</script>
```

## Header and Footer

### Add Header Text
```javascript
const pdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Text',
        value: 'Exported Document Of Customers',
        position: { x: 200, y: 50 },
        style: { textBrushColor: '#000000', fontSize: 20 }
      }
    ]
  }
};
grid.value.pdfExport(pdfExportProperties);
```

### Add Header with Image and Line
```javascript
const pdfExportProperties = {
  header: {
    fromTop: 0,
    height: 130,
    contents: [
      {
        type: 'Line',
        style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
        points: { x1: 0, y1: 4, x2: 685, y2: 4 }
      },
      {
        type: 'Image',
        src: imageBase64,
        position: { x: 40, y: 10 },
        size: { height: 100, width: 150 }
      }
    ]
  }
};
```

### Add Footer with Page Numbers
```javascript
const pdfExportProperties = {
  footer: {
    fromBottom: 10,
    height: 60,
    contents: [
      {
        type: 'PageNumber',
        pageNumberType: 'Arabic',
        format: 'Page {$current} of {$total}',
        position: { x: 0, y: 25 },
        style: { textBrushColor: '#4169e1', fontSize: 15, hAlign: 'Center' }
      }
    ]
  }
};
```

## Advanced Features

### Conditional Cell Formatting
```javascript
const pdfQueryCellInfo = (args) => {
  if (args.column.field === 'Freight') {
    if (args.value < 30) {
      args.style = { backgroundColor: '#99ffcc' };
    } else if (args.value < 60) {
      args.style = { backgroundColor: '#ffffb3' };
    } else {
      args.style = { backgroundColor: '#ff704d' };
    }
  }
};
```

### Show Spinner During Export
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    grid.value.showSpinner();
    grid.value.pdfExport();
  }
};

const pdfExportComplete = () => {
  grid.value.hideSpinner();
};
```

### Export Hierarchical Grid
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_pdfexport') {
    const exportProperties = {
      hierarchyExportMode: 'All'  // 'Expanded', 'All', or 'None'
    };
    grid.value.pdfExport(exportProperties);
  }
};
```

### Font and Color Customization
```javascript
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

const pdfExportProperties = {
  theme: {
    header: {
      font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold),
      fontColor: '#000080',
      bold: true
    },
    record: {
      font: new PdfStandardFont(PdfFontFamily.TimesRoman, 10),
      fontColor: '#B22222'
    }
  }
};
```

### Export Multiple Grids

**Same Page:**
```javascript
const appendPdfExportProperties = {
  multipleExport: { type: 'AppendToPage', blankSpace: 10 }
};
firstGrid.value.pdfExport(appendPdfExportProperties, true);
```

**New Page:**
```javascript
const appendPdfExportProperties = {
  multipleExport: { type: 'NewPage' }
};
firstGrid.value.pdfExport(appendPdfExportProperties, true);
```

### Repeat Header on Every Page
```javascript
const pdfHeaderQueryCellInfo = (args) => {
  args.cell.row.pdfGrid.repeatHeader = true;
};
```

### Export with Row and Column Spanning
```javascript
const queryCellInfo = (args) => {
  if (args.data.OrderID === 10248 && args.column.field === 'CustomerID') {
    args.rowSpan = 2;
  }
};

const pdfQueryCellInfo = (args) => {
  if (args.data.OrderID === 10248 && args.column.field === 'CustomerID') {
    args.cell.rowSpan = 2;
  }
};
```

### Remove Header Row While Exporting
```javascript
const pdfHeaderQueryCellInfo = (args) => {
  args.cell.value = '';
  if (args.cell.value === '') {
    args.cell.height = '';
  }
};
```
