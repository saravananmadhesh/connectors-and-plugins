# Freeze Panes (Fixed Headers) — Flutter DataGrid

## Overview

`SfDataGrid` supports freezing rows and columns in view, similar to Excel. Frozen rows/columns remain visible while scrolling.

| Property | Description |
|---|---|
| `frozenColumnsCount` | Number of columns frozen on the **left** |
| `footerFrozenColumnsCount` | Number of columns frozen on the **right** |
| `frozenRowsCount` | Number of rows frozen at the **top** |
| `footerFrozenRowsCount` | Number of rows frozen at the **bottom** |

> The header row is always frozen by default and is unaffected by `frozenRowsCount`.

---

## Freeze Columns

### Left side — `frozenColumnsCount`

```dart
SfDataGrid(
  source: _orderDataGridSource,
  frozenColumnsCount: 1,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        alignment: Alignment.centerRight,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text('ID', overflow: TextOverflow.ellipsis),
      ),
    ),
    // ... additional columns
  ],
)
```

### Right side — `footerFrozenColumnsCount`

```dart
SfDataGrid(
  source: _orderDataGridSource,
  footerFrozenColumnsCount: 1,
  columns: <GridColumn>[/* ... */],
)
```

### Limitations

- `frozenColumnsCount` or `footerFrozenColumnsCount` must be **less than** the total number of visible columns. For 5 visible columns, the max freeze count is 4.
- Only a **count** of columns from the left/right edge can be frozen — freezing by column name or index is not supported.

---

## Freeze Rows

### Top — `frozenRowsCount`

```dart
SfDataGrid(
  source: _orderDataGridSource,
  frozenRowsCount: 1,
  columns: <GridColumn>[/* ... */],
)
```

### Bottom — `footerFrozenRowsCount`

```dart
SfDataGrid(
  source: _orderDataGridSource,
  footerFrozenRowsCount: 1,
  columns: <GridColumn>[/* ... */],
)
```

### Limitations

- `frozenRowsCount` or `footerFrozenRowsCount` must be **less than** the number of displayed rows. For 10 displayed rows, the max is 9.
- Only a count of rows from the top/bottom can be frozen — specific rows cannot be frozen by index.

---

## Appearance Customization

Wrap `SfDataGrid` in `SfDataGridTheme` (from `syncfusion_flutter_core`) to customize freeze pane visuals.

```dart
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
```

### Customize line color, width, and elevation

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    frozenPaneElevation: 0.0,        // 0 hides shadow, shows line only
    frozenPaneLineColor: Colors.red,
    frozenPaneLineWidth: 1.5,
  ),
  child: SfDataGrid(
    source: _orderDataGridSource,
    frozenRowsCount: 1,
    footerFrozenRowsCount: 1,
    frozenColumnsCount: 1,
    footerFrozenColumnsCount: 1,
    columns: <GridColumn>[/* ... */],
  ),
)
```

### Customize elevation only

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(frozenPaneElevation: 7.0), // default is 5.0
  child: SfDataGrid(/* ... */),
)
```

### Hide elevation, show line only

Set `frozenPaneElevation` to `0` and specify line properties:

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    frozenPaneElevation: 0.0,
    frozenPaneLineColor: Colors.red,
    frozenPaneLineWidth: 1.5,
  ),
  child: SfDataGrid(/* ... */),
)
```

---

## Key Properties Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `frozenColumnsCount` | `int` | `0` | Columns frozen at left |
| `footerFrozenColumnsCount` | `int` | `0` | Columns frozen at right |
| `frozenRowsCount` | `int` | `0` | Rows frozen at top |
| `footerFrozenRowsCount` | `int` | `0` | Rows frozen at bottom |
| `SfDataGridThemeData.frozenPaneElevation` | `double` | `5.0` | Shadow depth of freeze pane |
| `SfDataGridThemeData.frozenPaneLineColor` | `Color?` | theme default | Color of the freeze divider line |
| `SfDataGridThemeData.frozenPaneLineWidth` | `double` | theme default | Width of the freeze divider line |

---

## TOC

- [Freeze Columns](#freeze-columns)
- [Freeze Rows](#freeze-rows)
- [Appearance Customization](#appearance-customization)
