# Export to PDF — Flutter DataGrid

## Overview

`SfDataGrid` supports exporting content to PDF using the `syncfusion_flutter_datagrid_export` package.

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
import 'package:syncfusion_flutter_pdf/pdf.dart';
```

### Add GlobalKey

Exporting methods are accessed via `SfDataGridState`. Create and assign a `GlobalKey<SfDataGridState>`:

```dart
final GlobalKey<SfDataGridState> key = GlobalKey<SfDataGridState>();

// In build():
SfDataGrid(key: key, source: _employeeDataSource, columns: [/* ... */])
```

---

## Export Methods

| Method | Returns | Description |
|---|---|---|
| `key.currentState!.exportToPdfDocument(...)` | `PdfDocument` | Export entire grid as a PDF document |
| `key.currentState!.exportToPdfGrid(...)` | `PdfGrid` | Export grid as a `PdfGrid` for custom layout |

---

## Export to PdfDocument

```dart
ElevatedButton(
  child: Text('Export To PDF'),
  onPressed: () {
    PdfDocument document = key.currentState!.exportToPdfDocument();
    final List<int> bytes = document.saveSync();
    File('DataGrid.pdf').writeAsBytes(bytes);
  },
)
```

## Export to PdfGrid (for custom layout)

```dart
PdfDocument document = PdfDocument();
PdfPage pdfPage = document.pages.add();
PdfGrid pdfGrid = key.currentState!.exportToPdfGrid();
pdfGrid.draw(
  page: pdfPage,
  bounds: Rect.fromLTWH(0, 0, 0, 0),
);
final List<int> bytes = document.saveSync();
File('DataGrid.pdf').writeAsBytes(bytes);
```

---

## Exporting Options

### Exclude specific columns

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  excludeColumns: ['Name'],
);
```

### Disable column headers on each page

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  canRepeatHeaders: false,
);
```

### Fit all columns on one page

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  fitAllColumnsInOnePage: true,
);
```

### Exclude table summaries

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  exportTableSummaries: false,
);
```

### Exclude stacked headers

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  exportStackedHeaders: false,
);
```

### Use actual column widths (disable auto-sizing)

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  autoColumnWidth: false,
);
```

> **Note:** If `autoColumnWidth` is `false`, set `fitAllColumnsInOnePage` to `false` as well, so overflowing columns continue to the next page.

---

## Page Orientation

Use `exportToPdfGrid` to draw onto a custom-oriented page:

```dart
PdfDocument document = PdfDocument();
document.pageSettings.orientation = PdfPageOrientation.landscape;
PdfPage pdfPage = document.pages.add();
PdfGrid pdfGrid = key.currentState!.exportToPdfGrid();
pdfGrid.draw(
  page: pdfPage,
  bounds: Rect.fromLTWH(0, 0, 0, 0),
);
final List<int> bytes = document.saveSync();
```

---

## Export Selected Rows Only

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  rows: dataGridController.selectedRows,
);
```

---

## Header and Footer in PDF

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  headerFooterExport: (DataGridPdfHeaderFooterExportDetails details) {
    final double width = details.pdfPage.getClientSize().width;
    final PdfPageTemplateElement header =
        PdfPageTemplateElement(Rect.fromLTWH(0, 0, width, 65));
    header.graphics.drawString(
      'Company Details',
      PdfStandardFont(PdfFontFamily.helvetica, 13, style: PdfFontStyle.bold),
      bounds: const Rect.fromLTWH(0, 25, 200, 60),
    );
    details.pdfDocumentTemplate.top = header;
  },
);
```

---

## Cell Styling on Export

Customize cell styles based on `DataGridExportCellType`:

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  cellExport: (DataGridCellPdfExportDetails details) {
    if (details.cellType == DataGridExportCellType.columnHeader) {
      details.pdfCell.style.backgroundBrush = PdfBrushes.pink;
    }
    if (details.cellType == DataGridExportCellType.row) {
      details.pdfCell.style.backgroundBrush = PdfBrushes.lightCyan;
    }
  },
);
```

### Customize cell values during export

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  cellExport: (DataGridCellPdfExportDetails details) {
    if (details.cellType == DataGridExportCellType.row &&
        details.columnName == 'Designation' &&
        details.cellValue == 'Project Lead') {
      details.pdfCell.value = 'Lead';
    }
  },
);
```

### Customize cells by column name

```dart
PdfDocument document = key.currentState!.exportToPdfDocument(
  cellExport: (DataGridCellPdfExportDetails details) {
    if (details.cellType == DataGridExportCellType.row &&
        details.columnName == 'Customer Name') {
      details.pdfCell.style.textBrush = PdfBrushes.red;
    }
  },
);
```

---

## Custom Converter (Advanced)

Override `DataGridToPdfConverter` for full control:

```dart
class CustomDataGridToPdfConverter extends DataGridToPdfConverter {
  @override
  void exportColumnHeader(SfDataGrid dataGrid, GridColumn column,
      String columnName, PdfGrid pdfGrid) {
    super.exportColumnHeader(dataGrid, column, columnName, pdfGrid);
  }

  @override
  void exportRows(
      List<GridColumn> columns, List<DataGridRow> rows, PdfGrid pdfGrid) {
    super.exportRows(columns, rows, pdfGrid);
  }
}

// Usage:
PdfDocument document = key.currentState!.exportToPdfDocument(
  converter: CustomDataGridToPdfConverter(),
);
```

---

## TOC

- [Setup](#setup)
- [Export Methods](#export-methods)
- [Exporting Options](#exporting-options)
- [Page Orientation](#page-orientation)
- [Export Selected Rows Only](#export-selected-rows-only)
- [Header and Footer in PDF](#header-and-footer-in-pdf)
- [Cell Styling on Export](#cell-styling-on-export)
- [Custom Converter (Advanced)](#custom-converter-advanced)
