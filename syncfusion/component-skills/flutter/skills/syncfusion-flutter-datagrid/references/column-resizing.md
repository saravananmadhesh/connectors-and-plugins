# Column Resizing in SfDataGrid

## Table of Contents
- [Enable Column Resizing](#enable-column-resizing)
- [Resizing Modes](#resizing-modes)
- [Resizing Callbacks](#resizing-callbacks)
- [Disable Resizing for a Specific Column](#disable-resizing-for-a-specific-column)
- [Disable Resizing for the Checkbox Column](#disable-resizing-for-the-checkbox-column)
- [Prevent Column from Being Hidden](#prevent-column-from-being-hidden)
- [Customize the Resize Indicator](#customize-the-resize-indicator)

---

## Enable Column Resizing

Set `allowColumnsResizing: true` on `SfDataGrid`. Column widths are **not** updated automatically 
— you must maintain a width map and apply the new width in the `onColumnResizeUpdate` callback:

```dart
late Map<String, double> columnWidths = {
  'id': double.nan,
  'name': double.nan,
  'designation': double.nan,
  'salary': double.nan,
};

SfDataGrid(
  source: _employeeDataSource,
  allowColumnsResizing: true,
  onColumnResizeUpdate: (ColumnResizeUpdateDetails details) {
    setState(() {
      columnWidths[details.column.columnName] = details.width;
    });
    return true;  // must return true to apply the resize
  },
  columns: <GridColumn>[
    GridColumn(
      width: columnWidths['id']!,
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.all(16.0),
        alignment: Alignment.center,
        child: Text('ID'),
      ),
    ),
    GridColumn(
      width: columnWidths['name']!,
      columnName: 'name',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Name'),
      ),
    ),
    GridColumn(
      width: columnWidths['designation']!,
      columnName: 'designation',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Designation', overflow: TextOverflow.ellipsis),
      ),
    ),
    GridColumn(
      width: columnWidths['salary']!,
      columnName: 'salary',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Salary'),
      ),
    ),
  ],
)
```

**Platform behavior:**
- **Web & Desktop** — Resize indicator appears on hover over the right edge; drag to resize
- **Mobile** — Resize indicator appears after long-pressing the column header

> Resizing respects `GridColumn.minimumWidth` and `GridColumn.maximumWidth`.

---

## Resizing Modes

Control when `onColumnResizeUpdate` fires using `columnResizeMode`:

| Mode | Behavior |
|------|----------|
| `ColumnResizeMode.onResize` *(default)* | Fires continuously as you drag |
| `ColumnResizeMode.onResizeEnd` | Fires once when you release the pointer |

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowColumnsResizing: true,
  columnResizeMode: ColumnResizeMode.onResizeEnd,  // update only on release
  onColumnResizeUpdate: (ColumnResizeUpdateDetails details) {
    setState(() {
      columnWidths[details.column.columnName] = details.width;
    });
    return true;
  },
  columns: [...],
)
```

---

## Resizing Callbacks

Three callbacks cover the full resize lifecycle:

| Callback | When it fires | Return value |
|----------|---------------|--------------|
| `onColumnResizeStart` | Drag begins (or long-press on mobile) | `true` to allow, `false` to cancel |
| `onColumnResizeUpdate` | During drag (or on release with `onResizeEnd` mode) | `true` to apply the new width |
| `onColumnResizeEnd` | Pointer released | void |

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowColumnsResizing: true,
  onColumnResizeStart: (ColumnResizeStartDetails details) {
    return true;  // allow all columns to be resized
  },
  onColumnResizeUpdate: (ColumnResizeUpdateDetails details) {
    setState(() {
      columnWidths[details.column.columnName] = details.width;
    });
    return true;
  },
  onColumnResizeEnd: (ColumnResizeEndDetails details) {
    print('Resize ended for: ${details.column.columnName}');
  },
  columns: [...],
)
```

---

## Disable Resizing for a Specific Column

Return `false` from `onColumnResizeStart` for the column you want to lock:

```dart
onColumnResizeStart: (ColumnResizeStartDetails details) {
  if (details.column.columnName == 'id') {
    return false;  // prevent resizing the 'id' column
  }
  return true;
},
```

---

## Disable Resizing for the Checkbox Column

The checkbox column is always at index `0`. Use `columnIndex` to target it:

```dart
onColumnResizeStart: (ColumnResizeStartDetails details) {
  if (details.columnIndex == 0) {
    return false;  // prevent resizing the checkbox column
  }
  return true;
},
```

---

## Prevent Column from Being Hidden

Set `GridColumn.minimumWidth` to ensure a column cannot be dragged below a minimum size:

```dart
GridColumn(
  width: columnWidths['name']!,
  minimumWidth: 30.0,  // column cannot be narrower than 30px
  columnName: 'name',
  label: Container(
    padding: EdgeInsets.all(8.0),
    alignment: Alignment.center,
    child: Text('Name'),
  ),
),
```

---

## Customize the Resize Indicator

Style the resize indicator line using `SfDataGridThemeData`. Requires the 
`syncfusion_flutter_core` package:

```dart
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

SfDataGridTheme(
  data: SfDataGridThemeData(
    columnResizeIndicatorColor: Colors.orange,
    columnResizeIndicatorStrokeWidth: 2.0,
  ),
  child: SfDataGrid(
    source: _employeeDataSource,
    allowColumnsResizing: true,
    onColumnResizeUpdate: (ColumnResizeUpdateDetails details) {
      setState(() {
        columnWidths[details.column.columnName] = details.width;
      });
      return true;
    },
    columns: [...],
  ),
)
```
