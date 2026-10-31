# Export to Excel — Flutter DataGrid

## Overview

`SfDataGrid` supports exporting content to Excel using the `syncfusion_flutter_datagrid_export` package.

---

## Setup

### Add dependencies

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_datagrid_export
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Import packages

```dart
import 'package:syncfusion_flutter_datagrid_export/export.dart';
import 'package:syncfusion_flutter_xlsio/xlsio.dart';
```

### Add GlobalKey

Exporting methods are available via `SfDataGridState`. Create and assign a `GlobalKey<SfDataGridState>`:

```dart
final GlobalKey<SfDataGridState> key = GlobalKey<SfDataGridState>();

// In build():
SfDataGrid(key: key, source: employeeDataSource, columns: [/* ... */])
```

---

## Export Methods

| Method | Returns | Description |
|---|---|---|
| `key.currentState!.exportToExcelWorkbook(...)` | `Workbook` | Export to a new Excel workbook |
| `key.currentState!.exportToExcelWorksheet(worksheet, ...)` | `void` | Export to an existing `Worksheet` |

---

## Export to Excel Workbook

```dart
ElevatedButton(
  child: Text('Export to Excel'),
  onPressed: () async {
    final Workbook workbook = key.currentState!.exportToExcelWorkbook();
    final List<int> bytes = workbook.saveAsStream();
    workbook.dispose();
    await helper.saveAndLaunchFile(bytes, 'DataGrid.xlsx');
  },
)
```

## Export to Excel Worksheet (existing workbook)

```dart
final Workbook workbook = Workbook();
final Worksheet worksheet = workbook.worksheets[0];
key.currentState!.exportToExcelWorksheet(worksheet);
final List<int> bytes = workbook.saveAsStream();
File('DataGrid.xlsx').writeAsBytes(bytes, flush: true);
```

---

## Exporting Options

### Exclude specific columns

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  excludeColumns: ['Name'],
);
```

### Exclude table summaries

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  exportTableSummaries: false,
);
```

### Exclude stacked headers

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  exportStackedHeaders: false,
);
```

### Set starting row/column index

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  startRowIndex: 3,
  startColumnIndex: 2,
);
```

### Row height and column width customization

By default, `SfDataGrid.rowHeight` and `SfDataGrid.defaultColumnWidth` are used. Override with custom values by setting `exportRowHeight`/`exportColumnWidth` to `false`:

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  exportRowHeight: false,
  exportColumnWidth: false,
  defaultRowHeight: 35,
  defaultColumnWidth: 120,
);
```

> When `exportRowHeight` and `exportColumnWidth` are `true` (default), the actual DataGrid row heights and column widths are used.

---

## Export Selected Rows Only

```dart
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  rows: dataGridController.selectedRows,
);
```

---

## Cell Styling on Export

```dart
final Workbook workbook = key.currentState!.exportToExcelWorkbook(
  cellExport: (DataGridCellExcelExportDetails details) {
    if (details.cellType == DataGridExportCellType.columnHeader) {
      details.excelRange.cellStyle.backColor = '#42A5F5';
    } else if (details.cellType == DataGridExportCellType.row) {
      details.excelRange.cellStyle.backColor = '#FFA726';
    }
  },
);
```

### Customize cell values during export

```dart
final Workbook workbook = key.currentState!.exportToExcelWorkbook(
  cellExport: (DataGridCellExcelExportDetails details) {
    if (details.cellType == DataGridExportCellType.row &&
        details.cellValue == 'Project Lead') {
      details.excelRange.value = 'Lead';
    }
  },
);
```

### Customize cells by column name

```dart
final Workbook workbook = key.currentState!.exportToExcelWorkbook(
  cellExport: (DataGridCellExcelExportDetails details) {
    if (details.cellType == DataGridExportCellType.row &&
        details.columnName == 'Name') {
      details.excelRange.cellStyle
        ..bold = true
        ..fontColor = '#F44336';
    }
  },
);
```

---

## Custom Converter (Advanced)

Override `DataGridToExcelConverter` for full control:

```dart
class CustomDataGridToExcelConverter extends DataGridToExcelConverter {
  @override
  void exportColumnHeader(SfDataGrid dataGrid, GridColumn column,
      String columnName, Worksheet worksheet) {
    super.exportColumnHeader(dataGrid, column, columnName, worksheet);
  }

  @override
  void exportRow(SfDataGrid dataGrid, DataGridRow row, GridColumn column,
      Worksheet worksheet) {
    super.exportRow(dataGrid, row, column, worksheet);
  }

  @override
  void exportTableSummaryRow(SfDataGrid dataGrid,
      GridTableSummaryRow summaryRow, Worksheet worksheet) {
    super.exportTableSummaryRow(dataGrid, summaryRow, worksheet);
  }

  @override
  Object? getCellValue(DataGridRow row, GridColumn column) {
    return super.getCellValue(row, column);
  }
}

// Usage:
Workbook workbook = key.currentState!.exportToExcelWorkbook(
  converter: CustomDataGridToExcelConverter(),
);
```

Available override methods: `exportColumnHeader`, `exportColumnHeaders`, `exportRow`, `exportRows`, `exportStackedHeaderRow`, `exportStackedHeaderRows`, `exportTableSummaryRow`, `exportTableSummaryRows`, `getCellValue`.

---

## TOC

- [Setup](#setup)
- [Export Methods](#export-methods)
- [Exporting Options](#exporting-options)
- [Export Selected Rows Only](#export-selected-rows-only)
- [Cell Styling on Export](#cell-styling-on-export)
- [Custom Converter (Advanced)](#custom-converter-advanced)
