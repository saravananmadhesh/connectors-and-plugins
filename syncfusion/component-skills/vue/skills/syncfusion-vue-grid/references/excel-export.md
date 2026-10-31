# Excel Export

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Excel Export](#basic-excel-export)
- [Export Options](#export-options)
- [Customize Export](#customize-export)
- [Styling and Formatting](#styling-and-formatting)
- [Advanced Features](#advanced-features)
- [CSV Export Limitations](#csv-export-limitations)

## When to Use

Use this reference when you need to:
- Export grid data to Excel (.xlsx) or CSV format
- Export selected records, current page, or all data
- Include/exclude columns from export
- Add headers, footers, and styling to exports
- Apply themes and custom formatting
- Export grouped or filtered data

## Basic Excel Export

### Enable Excel Export
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbarOptions" 
    :allowExcelExport="true"
    :toolbarClick="toolbarClick"
    height="272px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="120"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar, ExcelExport } from "@syncfusion/ej2-vue-grids";
import { provide, ref } from 'vue';

const grid = ref(null);
const toolbarOptions = ['ExcelExport', 'CsvExport'];

const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    grid.value.excelExport();
  } else if (args.item.id === 'Grid_csvexport') {
    grid.value.csvExport();
  }
};

provide('grid', [Toolbar, ExcelExport]);
</script>
```

## Export Options

### Export Current Page
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    let excelExportProperties = {
      exportType: 'CurrentPage'  // or 'AllPages'
    };
    grid.value.excelExport(excelExportProperties);
  }
};
```

### Export Selected Records
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    let selectedRecords = grid.value.getSelectedRecords();
    let excelExportProperties = {
      dataSource: selectedRecords
    };
    grid.value.excelExport(excelExportProperties);
  }
};
```

### Export Grouped Records
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowGrouping="true"
    :groupSettings="groupOptions">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const groupOptions = { columns: ['CustomerID', 'ShipCity'] };
</script>
```

### Include Hidden Columns
```javascript
const excelExportProperties = {
  includeHiddenColumn: true
};
grid.value.excelExport(excelExportProperties);
```

## Customize Export

### Custom File Name
```javascript
const excelExportProperties = {
  fileName: 'OrdersReport.xlsx'
};
grid.value.excelExport(excelExportProperties);
```

### Customize Exported Columns
```javascript
const excelExportProperties = {
  columns: [
    { field: 'OrderID', textAlign: 'Right', width: '90' },
    { field: 'CustomerID', headerText: 'Customer Name', width: '100' },
    { field: 'Freight', textAlign: 'Center', width: '80' }
  ]
};
grid.value.excelExport(excelExportProperties);
```

### Show or Hide Columns During Export
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    grid.value.getColumns()[1].visible = true;
    grid.value.getColumns()[3].visible = false;
    grid.value.excelExport();
  }
};

const excelExportComplete = () => {
  grid.value.getColumns()[1].visible = false;
  grid.value.getColumns()[3].visible = true;
};
```

## Styling and Formatting

### Font and Color Theme
```javascript
const excelExportProperties = {
  theme: {
    header: { fontName: 'Segoe UI', fontColor: '#666666' },
    record: { fontName: 'Segoe UI', fontColor: '#666666' },
    caption: { fontName: 'Segoe UI', fontColor: '#666666' }
  }
};
grid.value.excelExport(excelExportProperties);
```

### Conditional Cell Formatting
```javascript
const excelQueryCellInfo = (args) => {
  if (args.column.field === 'Freight') {
    if (args.value < 30) {
      args.style = { backColor: '#99ffcc' };
    } else if (args.value < 60) {
      args.style = { backColor: '#ffffb3' };
    } else {
      args.style = { backColor: '#ff704d' };
    }
  }
};
```

### Rotate Header Text
```javascript
const excelHeaderQueryCellInfo = (args) => {
  if (args.column.field === 'Freight') {
    args.style = { backColor: '#99ffcc', vAlign: 'Bottom' };
  } else {
    args.style = { vAlign: 'Center', rotation: 90 };
  }
};
```

### Add Header and Footer
```javascript
const excelExportProperties = {
  header: {
    headerRows: 7,
    rows: [
      { cells: [{ colSpan: 4, value: 'Company Name', style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, value: 'Address', style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true } }] }
    ]
  },
  footer: {
    footerRows: 2,
    rows: [
      { cells: [{ colSpan: 4, value: 'Thank you for your business!', style: { hAlign: 'Center', bold: true } }] }
    ]
  }
};
```

## Advanced Features

### Export as Blob
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    grid.value.excelExport(null, null, null, true);
  }
};

const excelExportComplete = (args) => {
  args.promise.then((e) => {
    exportBlob(e.blobData);
  });
};

const exportBlob = (blob) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'Export.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
```

### Show Spinner During Export
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    grid.value.showSpinner();
    grid.value.excelExport();
  }
};

const excelExportComplete = () => {
  grid.value.hideSpinner();
};
```

### Export Master-Detail Grid
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'masterGrid_excelexport') {
    const appendExcelExportProperties = {
      multipleExport: { type: 'AppendToSheet', blankRows: 2 }
    };
    masterGrid.value.excelExport(appendExcelExportProperties);
  }
};
```

### Export Custom Aggregate
```javascript
const customAggregateFn = (data) => {
  const brazilCount = data.result 
    ? data.result.filter((item) => item['ShipCountry'] === 'Brazil').length
    : data.filter((item) => item['ShipCountry'] === 'Brazil').length;
  return `Brazil count: ${brazilCount}`;
};
```

### Export with Row and Column Spanning
```javascript
const queryCellInfo = (args) => {
  let data = args.data.OrderID;
  switch (data) {
    case 10248:
      if (args.column.field === 'CustomerID') {
        args.rowSpan = 2;
      }
      break;
    case 10250:
      if (args.column.field === 'CustomerID') {
        args.colSpan = 2;
      }
      break;
  }
};

const excelQueryCellInfo = (args) => {
  if (args.data.OrderID === 10248 && args.column.field === 'CustomerID') {
    args.cell.rowSpan = 2;
  }
};
```

### Export with Custom Date Format
```vue
<template>
  <ejs-grid>
    <e-columns>
      <e-column 
        field="OrderDate" 
        headerText="Order Date" 
        :format="formatOption" 
        width="130">
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const formatOption = { type: 'date', format: 'ccc, LLL d, yy' };
</script>
```

### Export Hierarchical Grid
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    const exportProperties = {
      hierarchyExportMode: 'All'  // 'Expanded', 'All', or 'None'
    };
    grid.value.excelExport(exportProperties);
  }
};
```

### Enable Filtering in Exported File
```javascript
const excelExportProperties = {
  enableFilter: true
};
grid.value.excelExport(excelExportProperties);
```

### Export Multiple Grids

**Same Sheet:**
```javascript
let appendExcelExportProperties = {
  multipleExport: { type: 'AppendToSheet', blankRows: 2 }
};
firstGrid.value.excelExport(appendExcelExportProperties, true);
```

**New Sheet:**
```javascript
let appendExcelExportProperties = {
  multipleExport: { type: 'NewSheet' }
};
firstGrid.value.excelExport(appendExcelExportProperties, true);
```

### Remove Header Row While Exporting
```javascript
const excelHeaderQueryCellInfo = (args) => {
  args.cell.value = '';
};

const created = () => {
  let processGridExportObject = grid.value.ej2Instances.excelExportModule.__proto__.processGridExport;
  grid.value.ej2Instances.excelExportModule.__proto__.processGridExport = function(gobj, props, r) {
    let rows = processGridExportObject.call(this, gobj, props, r);
    rows.shift();
    return rows;
  };
};
```

### Add Formula to Cells
```javascript
const excelQueryCellInfo = (args) => {
  if (args.column.field === 'TotalPatents') {
    args.value = '=E' + rowNumber + '+B' + rowNumber;
    args.cell.formula = args.value;
  }
};
```

### Custom Data Source During Export
```javascript
const toolbarClick = (args) => {
  if (args.item.id === 'Grid_excelexport') {
    const excelExportProperties = {
      dataSource: customData
    };
    grid.value.excelExport(excelExportProperties);
  }
};
```

## CSV Export Limitations

CSV is a plain text format that does NOT support:
- Cell rotation
- Font and color customization
- Column and row spanning
- Adding formulas
- Themes and styling

For advanced formatting requirements, use Excel export instead of CSV.
