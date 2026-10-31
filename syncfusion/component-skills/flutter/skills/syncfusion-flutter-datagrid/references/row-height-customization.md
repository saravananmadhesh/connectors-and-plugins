# Row Height Customization — Flutter DataGrid

## Overview

`SfDataGrid` supports fixed row heights, autofit (intrinsic) heights, per-TextStyle heights, formatted-value heights, header row height, data row height, and programmatic row refresh via `DataGridController.refreshRow`.

---

## Set Height for a Specific Row

Use `onQueryRowHeight` callback. Row index 0 = column header row:

```dart
SfDataGrid(
    source: _employeeDataSource,
    onQueryRowHeight: (RowHeightDetails details) {
      return details.rowIndex == 0 ? 70.0 : 49.0;
    },
    columns: columns)
```

---

## Autofit Row Height Based on Content

Use `RowHeightDetails.getIntrinsicRowHeight` to size rows to their content:

```dart
SfDataGrid(
    source: _employeeDataSource,
    onQueryRowHeight: (RowHeightDetails details) {
      return details.getIntrinsicRowHeight(details.rowIndex);
    },
    columns: columns)
```

### Autofit Options

```dart
// Exclude specific columns from height calculation
details.getIntrinsicRowHeight(details.rowIndex,
    excludedColumns: ['City'],
    canIncludeHiddenColumns: true)   // include hidden columns in calculation
```

---

## Autofit with Custom TextStyle

Override `ColumnSizer` methods to calculate height against a specific `TextStyle`:

```dart
class CustomColumnSizer extends ColumnSizer {
  @override
  double computeHeaderCellHeight(GridColumn column, TextStyle textStyle) {
    if (column.columnName == 'Contact Name' || column.columnName == 'City') {
      textStyle = TextStyle(fontWeight: FontWeight.bold, fontStyle: FontStyle.italic);
    }
    return super.computeHeaderCellHeight(column, textStyle);
  }

  @override
  double computeCellHeight(GridColumn column, DataGridRow row,
      Object? cellValue, TextStyle textStyle) {
    if (column.columnName == 'Contact Name' || column.columnName == 'City') {
      textStyle = TextStyle(fontWeight: FontWeight.bold, fontStyle: FontStyle.italic);
    }
    return super.computeCellHeight(column, row, cellValue, textStyle);
  }
}

// Use with:
SfDataGrid(
    source: _employeeDataSource,
    columnSizer: CustomColumnSizer(),
    onQueryRowHeight: (RowHeightDetails details) => details.getIntrinsicRowHeight(details.rowIndex),
    columns: columns)
```

---

## Autofit with Formatted Values

Override `computeCellHeight` to pass the formatted display value instead of raw value:

```dart
class CustomColumnSizer extends ColumnSizer {
  @override
  double computeCellHeight(GridColumn column, DataGridRow row,
      Object? cellValue, TextStyle textStyle) {
    if (column.columnName == 'Date of Birth') {
      cellValue = DateFormat.yMMMMd('en_US').format(cellValue as DateTime);
    } else if (column.columnName == 'Salary') {
      cellValue = NumberFormat.simpleCurrency(decimalDigits: 0).format(cellValue);
    }
    return super.computeCellHeight(column, row, cellValue, textStyle);
  }
}
```

---

## Set Header Row Height

```dart
SfDataGrid(
    source: _employeeDataSource,
    headerRowHeight: 70,
    columns: columns)
```

Applies to the column header row and all stacked header rows.

---

## Set Data Row Height

```dart
SfDataGrid(
    source: _employeeDataSource,
    rowHeight: 60,
    columns: columns)
```

Applies to all data rows (does not affect the header row).

---

## Refresh Row Height Programmatically

Use `DataGridController.refreshRow` after updating row data:

```dart
// Refresh only row data
_controller.refreshRow(0);

// Refresh row data AND recalculate its height
_controller.refreshRow(0, recalculateRowHeight: true);

// After calling refreshRow, update the data source:
_employeeDataSource.buildDataGridSource(_employees);
_employeeDataSource.updateDataGridSource();
```

When `recalculateRowHeight: true`, the `onQueryRowHeight` callback will be triggered for that row, allowing the height to be recalculated.

---

## Key Property Reference

### SfDataGrid Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `onQueryRowHeight` | `double Function(RowHeightDetails)?` | `null` | Callback to provide height per row index |
| `headerRowHeight` | `double` | 56.0 | Height of column header row and stacked headers |
| `rowHeight` | `double` | 49.0 | Height of all data rows |
| `columnSizer` | `ColumnSizer?` | `null` | Custom column/row sizer for autofit calculations |

### RowHeightDetails

| Property/Method | Description |
|---|---|
| `rowIndex` | Index of the row being queried |
| `rowHeight` | Default height for this row |
| `getIntrinsicRowHeight(rowIndex, {excludedColumns, canIncludeHiddenColumns})` | Calculate height to fit content |

### DataGridController Methods

| Method | Parameters | Description |
|---|---|---|
| `refreshRow(rowIndex, {recalculateRowHeight})` | `int`, `bool` (default false) | Refresh row data; optionally recalculate height |
