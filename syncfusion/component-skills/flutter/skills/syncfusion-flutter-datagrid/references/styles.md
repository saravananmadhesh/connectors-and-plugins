# Styles — Flutter DataGrid

## Overview

`SfDataGrid` appearance can be customized using `SfDataGridTheme` + `SfDataGridThemeData` from the `syncfusion_flutter_core` package. Covers header color, grid lines, row hover, row background, and cell text color.

---

## Required Import

```dart
import 'package:syncfusion_flutter_core/theme.dart';
```

---

## Header Background Color

```dart
SfDataGridTheme(
    data: SfDataGridThemeData(headerColor: const Color(0xff009889)),
    child: SfDataGrid(
        source: _employeeDataSource,
        columnWidthMode: ColumnWidthMode.fill,
        columns: columns))
```

---

## Header Hover Color (Web & Desktop)

```dart
SfDataGridTheme(
    data: SfDataGridThemeData(headerHoverColor: Colors.yellow),
    child: SfDataGrid(source: _employeeDataSource, columns: columns))
```

> Applicable for web and desktop platforms only.

---

## Row Background Color

Set background color per row via `DataGridRowAdapter.color`:

```dart
@override
DataGridRowAdapter? buildRow(DataGridRow row) {
  return DataGridRowAdapter(
    color: Colors.indigo[300],
    cells: row.getCells().map<Widget>((dataGridCell) {
      return Container(
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(
            dataGridCell.value.toString(),
            style: const TextStyle(color: Colors.white),
            overflow: TextOverflow.ellipsis,
          ));
    }).toList());
}
```

---

## Grid Line Color and Thickness

```dart
SfDataGridTheme(
    data: SfDataGridThemeData(
        gridLineColor: Colors.amber, gridLineStrokeWidth: 3.0),
    child: SfDataGrid(source: _employeeDataSource, columns: columns))
```

---

## Show Vertical and Horizontal Grid Lines

```dart
SfDataGrid(
    source: _employeeDataSource,
    gridLinesVisibility: GridLinesVisibility.both,
    headerGridLinesVisibility: GridLinesVisibility.both,
    columns: columns)
```

`GridLinesVisibility` options: `vertical`, `horizontal`, `both`, `none`

- `gridLinesVisibility`: applies to data cells
- `headerGridLinesVisibility`: applies to header and stacked header cells

---

## Disable Row Hover Highlighting (Web & Desktop)

```dart
SfDataGrid(
    highlightRowOnHover: false,
    source: _employeeDataSource,
    columns: columns)
```

---

## Row Hover Color and Text Style (Web & Desktop)

```dart
SfDataGridTheme(
    data: SfDataGridThemeData(
        rowHoverColor: Colors.yellow,
        rowHoverTextStyle: TextStyle(
          color: Colors.red,
          fontSize: 14,
        )),
    child: SfDataGrid(source: _employeeDataSource, columns: columns))
```

---

## Cell Value Text Color

Apply `TextStyle` to `Text` widget inside cell widgets:

```dart
@override
DataGridRowAdapter? buildRow(DataGridRow row) {
  return DataGridRowAdapter(
      cells: row.getCells().map<Widget>((dataGridCell) {
    TextStyle? getTextStyle() {
      if (dataGridCell.columnName == 'name') {
        return const TextStyle(color: Colors.pinkAccent);
      }
      return null;
    }
    return Container(
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: Text(
          dataGridCell.value.toString(),
          style: getTextStyle(),
          overflow: TextOverflow.ellipsis,
        ));
  }).toList());
}
```

---

## Key Property Reference

### SfDataGridThemeData Properties

| Property | Type | Description |
|---|---|---|
| `headerColor` | `Color?` | Column header background color |
| `headerHoverColor` | `Color?` | Header hover color (web/desktop) |
| `gridLineColor` | `Color?` | Grid line color |
| `gridLineStrokeWidth` | `double?` | Grid line thickness |
| `rowHoverColor` | `Color?` | Row hover background color (web/desktop) |
| `rowHoverTextStyle` | `TextStyle?` | Text style on hover (web/desktop) |

### SfDataGrid Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `gridLinesVisibility` | `GridLinesVisibility` | `horizontal` | Grid lines for data cells |
| `headerGridLinesVisibility` | `GridLinesVisibility` | `horizontal` | Grid lines for header cells |
| `highlightRowOnHover` | `bool` | `true` | Enable/disable hover highlight (web/desktop) |

### DataGridRowAdapter Properties

| Property | Type | Description |
|---|---|---|
| `color` | `Color?` | Row background color |
