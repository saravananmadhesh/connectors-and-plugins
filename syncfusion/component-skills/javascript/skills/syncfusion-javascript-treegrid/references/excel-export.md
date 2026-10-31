# Excel Export

## When to Use This Reference

**Read this file when you need to:**
- Export TreeGrid data to Excel file format with hierarchy preserved
- Customize export appearance (colors, fonts, alignment, headers/footers)
- Include or exclude specific columns, expand/shrink states during export
- Apply conditional cell styling based on data values
- Implement server-side export for large datasets
- Handle custom aggregates in exported Excel files
- Export CSV format via server-side methods

## Table of Contents
- [Basic Excel Export](#basic-excel-export)
- [Export Options](#export-options)
- [Cell Styling & Themes](#cell-styling--themes)
- [Headers & Footers](#headers--footers)
- [Server-Side Export](#server-side-export)
- [Custom Aggregates Export](#custom-aggregates-export)
- [Troubleshooting](#troubleshooting)

## Basic Excel Export

Export TreeGrid to Excel file using ExcelExport module:

```typescript
import { TreeGrid, Toolbar, ExcelExport, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Toolbar, ExcelExport, Page);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  allowExcelExport: true,
  allowPaging: true,
  height: 220,
  pageSettings: { pageSize: 7 },
  toolbar: ['ExcelExport'],
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ]
});

treeGridObj.appendTo('#TreeGrid');
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    treeGridObj.excelExport();
  }
};
```

**Built-in Features:**
- Hierarchical structure preserved
- Column formatting included
- Data types retained
- Automatic file download

## Export Options

### Persist Collapsed State

Maintain hierarchy expansion state in exported Excel:

```typescript
let excelExportProperties: TreeGridExcelExportProperties = {
  isCollapsedStatePersist: true
};

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    treeGridObj.excelExport(excelExportProperties);
  }
};
```

### Export Hidden Columns

Include hidden columns in Excel export:

```typescript
let excelExportProperties: ExcelExportProperties = {
  includeHiddenColumn: true
};

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    treeGridObj.excelExport(excelExportProperties);
  }
};
```

### Show/Hide Columns During Export

Dynamically toggle column visibility during export using `toolbarClick` and `excelExportComplete` events:

```typescript
import { Column } from '@syncfusion/ej2-grids';

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    let cols: Column[] = treeGridObj.grid.columns;
    cols[2].visible = false;  // Hide Start Date
    cols[3].visible = true;   // Show Duration
    treeGridObj.excelExport();
  }
};

treeGridObj.excelExportComplete = () => {
  let cols: Column[] = treeGridObj.grid.columns;
  cols[3].visible = false;   // Restore original state
  cols[2].visible = true;
};
```

### File Name Customization

Assign custom file name:

```typescript
let excelExportProperties: ExcelExportProperties = {
  fileName: 'ProjectTasks_2026.xlsx'
};

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    treeGridObj.excelExport(excelExportProperties);
  }
};
```

### Custom Data Source

Export different data dynamically:

```typescript
let excelExportProperties: ExcelExportProperties = {
  dataSource: customData  // Export custom dataset instead of grid data
};

treeGridObj.excelExport(excelExportProperties);
```

## Cell Styling & Themes

### Conditional Cell Formatting

Format cells based on values using `excelQueryCellInfo` event:

```typescript
treeGridObj.excelQueryCellInfo = (args: ExcelQueryCellInfoEventArgs) => {
  if (args.column.field === 'duration') {
    if (args.value === 0 || args.value === '') {
      args.style = { backColor: '#336c12' };  // Green
    } else if (args.value < 3) {
      args.style = { backColor: '#7b2b1d' };  // Red
    }
  }
};
```

### Apply Theme

Customize header, record, and caption styles:

```typescript
let exportProperties: ExcelExportProperties = {
  theme: {
    header: { fontName: 'Segoe UI', fontColor: '#666666' },
    record: { fontName: 'Segoe UI', fontColor: '#666666' },
    caption: { fontName: 'Segoe UI', fontColor: '#666666' }
  }
};

treeGridObj.excelExport(exportProperties);
```

**Default:** Material theme is applied to exported Excel document.

## Headers & Footers

Add comprehensive headers and footers with styling:

```typescript
let excelExportProperties: ExcelExportProperties = {
  header: {
    headerRows: 7,
    rows: [
      { cells: [{ colSpan: 4, value: 'Northwind Traders', style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, value: '2501 Aerial Center Parkway', style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, value: 'Suite 200 Morrisville, NC 27560 USA', style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306', style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, hyperlink: { target: 'localhost://api/northwind', displayText: 'Sample Data Link' }, style: { hAlign: 'Center' } }] },
      { cells: [{ colSpan: 4, hyperlink: { target: 'mailto:support@northwind.com' }, style: { hAlign: 'Center' } }] }
    ]
  },
  footer: {
    footerRows: 4,
    rows: [
      { cells: [{ colSpan: 4, value: 'Thank you for your business!', style: { hAlign: 'Center', bold: true } }] },
      { cells: [{ colSpan: 4, value: 'Visit Again!', style: { hAlign: 'Center', bold: true } }] }
    ]
  }
};

treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].text === 'Excel Export') {
    treeGridObj.excelExport(excelExportProperties);
  }
};
```

## Server-Side Export

### ASP.NET MVC Server Configuration

**Dependencies:** Syncfusion.EJ2, Syncfusion.EJ2.TreeGridExport

Controller implementation:

```csharp
public IActionResult ServerSideExporting() {
  var order = TreeData.GetDefaultData();
  ViewBag.dataSource = order;
  return View();
}

public IActionResult ExcelExport(string treeGridModel) {
  if (treeGridModel == null) return View();
  TreeGridExcelExport exp = new TreeGridExcelExport();
  Syncfusion.EJ2.TreeGrid.TreeGrid gridProperty = ConvertTreeGridObject(treeGridModel);
  return exp.ExportToExcel<TreeData>(gridProperty, TreeData.GetDefaultData());
}

private Syncfusion.EJ2.TreeGrid.TreeGrid ConvertTreeGridObject(string gridProperty) {
  Syncfusion.EJ2.TreeGrid.TreeGrid TreeGridModel = (Syncfusion.EJ2.TreeGrid.TreeGrid)Newtonsoft.Json.JsonConvert.DeserializeObject(gridProperty, typeof(Syncfusion.EJ2.TreeGrid.TreeGrid));
  TreeGridColumnModel cols = (TreeGridColumnModel)Newtonsoft.Json.JsonConvert.DeserializeObject(gridProperty, typeof(TreeGridColumnModel));
  TreeGridModel.Columns = cols.columns;
  return TreeGridModel;
}
```

Client call using `serverExcelExport`:

```typescript
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].id === 'TreeGrid_gridcontrol_excelexport') {
    treeGridObj.serverExcelExport('Home/ExcelExport');
  }
};
```

### CSV Export (Server-Side)

Export to CSV format using `serverCsvExport`:

```csharp
public IActionResult CsvExport(string treeGridModel) {
  if (treeGridModel == null) return View();
  TreeGridExcelExport exp = new TreeGridExcelExport();
  Syncfusion.EJ2.TreeGrid.TreeGrid gridProperty = ConvertTreeGridObject(treeGridModel);
  return exp.ExportToCsv<TreeData>(gridProperty, TreeData.GetDefaultData());
}
```

```typescript
treeGridObj.toolbarClick = (args: Object) => {
  if (args['item'].id === 'TreeGrid_gridcontrol_csvexport') {
    treeGridObj.serverCsvExport('Home/CsvExport');
  }
};
```

## Custom Aggregates Export

Export custom aggregates using `excelAggregateQueryCellInfo` event:

```typescript
const formatExcelAggregateCell = (args: AggregateQueryCellInfoEventArgs): void => {
  if ((args.cell as any).column.headerText === 'Category') {
    (args.style as any).value = `Count of ${selectedCategory} : ${(args.row as any).data.category.Custom}`;
  }
};

let treeGrid = new TreeGrid({
  dataSource: summaryData,
  childMapping: 'subtasks',
  allowExcelExport: true,
  excelAggregateQueryCellInfo: formatExcelAggregateCell,
  toolbar: ['ExcelExport', 'CsvExport'],
  columns: [
    { field: 'ID', headerText: 'Order ID', width: 115 },
    { field: 'Name', headerText: 'Shipment Name', width: 230 },
    { field: 'category', headerText: 'Category', width: 220 },
    { field: 'units', headerText: 'Total Units', width: 90, type: 'number' },
    { field: 'price', headerText: 'Price', width: 140, type: 'number' }
  ]
});

treeGrid.toolbarClick = (args: any) => {
  if (args.item.text === 'Excel Export') {
    treeGrid.excelExport();
  }
};
```

## Troubleshooting

**Q: Excel export not working?**
A: Ensure `TreeGrid.Inject(ExcelExport)` is called and `allowExcelExport: true` is set.

**Q: Hierarchy not preserved?**
A: Set `isCollapsedStatePersist: true` to maintain parent-child relationships.

**Q: Hidden columns not showing in export?**
A: Use `includeHiddenColumn: true` in export properties.

**Q: Server-side export failing?**
A: Verify Syncfusion.EJ2.TreeGridExport package is installed and controller endpoint is correct.
