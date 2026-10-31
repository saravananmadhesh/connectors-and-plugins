# Column Sizing in SfDataGrid

## Table of Contents
- [ColumnWidthMode Options](#columnwidthmode-options)
- [Basic Usage](#basic-usage)
- [Per-Column Width Mode](#per-column-width-mode)
- [Calculate Autofit for All Rows](#calculate-autofit-for-all-rows)
- [Custom Autofit Padding](#custom-autofit-padding)
- [Autofit with Custom TextStyle](#autofit-with-custom-textstyle)
- [Autofit with Formatted Values](#autofit-with-formatted-values)
- [Fill Remaining Width for a Specific Column](#fill-remaining-width-for-a-specific-column)
- [Recalculate Widths on Data Change](#recalculate-widths-on-data-change)

---

## ColumnWidthMode Options

Set `SfDataGrid.columnWidthMode` (grid-level) or `GridColumn.columnWidthMode` (per-column) to 
control how column widths are calculated.

| Mode | Description |
|------|-------------|
| `ColumnWidthMode.auto` | Fits to both the header label and cell values — nothing is truncated |
| `ColumnWidthMode.fitByCellValue` | Fits to cell values only — header may truncate |
| `ColumnWidthMode.fitByColumnName` | Fits to the header label only — cells may truncate |
| `ColumnWidthMode.lastColumnFill` | All columns use default width; the last visible column fills remaining space |
| `ColumnWidthMode.fill` | Divides total grid width equally across all columns |
| `ColumnWidthMode.none` | No automatic sizing — uses `GridColumn.width` or `defaultColumnWidth` |

> **Note:** `columnWidthMode` is ignored when `GridColumn.width` is set explicitly.  
> `GridColumn.columnWidthMode` takes priority over `SfDataGrid.columnWidthMode`.

---

## Basic Usage

Set `columnWidthMode` at the grid level to apply to all columns:

```dart
SfDataGrid(
  source: _employeeDataSource,
  columnWidthMode: ColumnWidthMode.fill,  // equal width for all columns
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerRight,
        child: Text('ID', overflow: TextOverflow.ellipsis),
      ),
    ),
    GridColumn(
      columnName: 'name',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerLeft,
        child: Text('Name', overflow: TextOverflow.ellipsis),
      ),
    ),
    GridColumn(
      columnName: 'designation',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerLeft,
        child: Text('Designation', overflow: TextOverflow.ellipsis),
      ),
    ),
    GridColumn(
      columnName: 'salary',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerRight,
        child: Text('Salary', overflow: TextOverflow.ellipsis),
      ),
    ),
  ],
)
```

---

## Per-Column Width Mode

Override the grid-level mode for a specific column using `GridColumn.columnWidthMode`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  columnWidthMode: ColumnWidthMode.lastColumnFill,  // default for other columns
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: ...,
    ),
    GridColumn(
      columnName: 'name',
      columnWidthMode: ColumnWidthMode.lastColumnFill, // this column fills remaining space
      label: ...,
    ),
    GridColumn(
      columnName: 'salary',
      label: ...,
    ),
    GridColumn(
      columnName: 'designation',
      label: ...,
    ),
  ],
)
```

---

## Calculate Autofit for All Rows

By default, autofit considers only visible rows. To base the calculation on all rows, set 
`columnWidthCalculationRange` to `ColumnWidthCalculationRange.allRows`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  columnWidthMode: ColumnWidthMode.auto,
  columnWidthCalculationRange: ColumnWidthCalculationRange.allRows,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'ID',
      label: Container(
        padding: EdgeInsets.all(16.0),
        alignment: Alignment.centerRight,
        child: Text('ID', softWrap: false),
      ),
    ),
    GridColumn(
      columnName: 'Name',
      label: Container(
        padding: EdgeInsets.all(16.0),
        alignment: Alignment.centerLeft,
        child: Text('Name', softWrap: false),
      ),
    ),
  ],
)
```

---

## Custom Autofit Padding

By default autofit adds `EdgeInsets.all(16.0)` around each cell's text. Override per-column with 
`GridColumn.autoFitPadding`. The cell `Container.padding` and `autoFitPadding` must match to 
ensure correct width calculation:

```dart
GridColumn(
  columnName: 'id',
  autoFitPadding: EdgeInsets.all(10.0),  // must match container padding
  label: Container(
    padding: EdgeInsets.all(10.0),
    alignment: Alignment.centerRight,
    child: Text('ID', softWrap: false),
  ),
),
```

---

## Autofit with Custom TextStyle

When cells use a non-default `TextStyle`, override `ColumnSizer` to pass the correct style into 
the width calculation:

```dart
class CustomColumnSizer extends ColumnSizer {
  @override
  double computeHeaderCellWidth(GridColumn column, TextStyle style) {
    if (column.columnName == 'Name' || column.columnName == 'Designation') {
      style = TextStyle(fontWeight: FontWeight.bold, fontStyle: FontStyle.italic);
    }
    return super.computeHeaderCellWidth(column, style);
  }

  @override
  double computeCellWidth(GridColumn column, DataGridRow row,
      Object? cellValue, TextStyle textStyle) {
    if (column.columnName == 'Name' || column.columnName == 'Designation') {
      textStyle = TextStyle(fontWeight: FontWeight.bold, fontStyle: FontStyle.italic);
    }
    return super.computeCellWidth(column, row, cellValue, textStyle);
  }
}

// Pass the custom sizer to SfDataGrid:
final CustomColumnSizer _customColumnSizer = CustomColumnSizer();

SfDataGrid(
  source: _employeeDataSource,
  columnSizer: _customColumnSizer,
  columnWidthMode: ColumnWidthMode.auto,
  columns: [...],
)
```

---

## Autofit with Formatted Values

When cells display formatted values (e.g., `DateFormat`, `NumberFormat`), override 
`computeCellWidth` to pass the formatted string instead of the raw value:

```dart
import 'package:intl/intl.dart';

class CustomColumnSizer extends ColumnSizer {
  @override
  double computeCellWidth(GridColumn column, DataGridRow row,
      Object? cellValue, TextStyle textStyle) {
    if (column.columnName == 'DOB') {
      cellValue = DateFormat.yMMMMd('en_US').format(cellValue as DateTime);
    } else if (column.columnName == 'Salary') {
      cellValue = NumberFormat.simpleCurrency(decimalDigits: 0).format(cellValue);
    }
    return super.computeCellWidth(column, row, cellValue, textStyle);
  }
}
```

---

## Fill Remaining Width for a Specific Column

Using `ColumnWidthMode.lastColumnFill` at the grid level fills the *last visible column*. To fill 
a *specific* column, set `GridColumn.columnWidthMode` on that column instead:

```dart
// Grid level: no mode (columns use default width)
// Column level: 'name' fills remaining space
GridColumn(
  columnName: 'name',
  columnWidthMode: ColumnWidthMode.lastColumnFill,
  label: ...,
),
```

---

## Recalculate Widths on Data Change

Column widths are calculated once on initial load. To recalculate when data changes at runtime, 
override `shouldRecalculateColumnWidths` in your `DataGridSource` and return `true`:

> Returning `true` recalculates on every `notifyListeners()` call. Only do this when column 
> content genuinely changes width — it may impact performance for large datasets.

```dart
class EmployeeDataSource extends DataGridSource {
  // ...

  @override
  bool shouldRecalculateColumnWidths() {
    return true;
  }
}
```
