# Column Drag and Drop in SfDataGrid

## Table of Contents
- [Enable Column Drag and Drop](#enable-column-drag-and-drop)
- [onColumnDragging Callback](#oncolumndragging-callback)
- [Cancel Drop for a Specific Column](#cancel-drop-for-a-specific-column)
- [Custom Drag Feedback Widget](#custom-drag-feedback-widget)
- [Customize the Drag Indicator](#customize-the-drag-indicator)

---

## Enable Column Drag and Drop

Set `allowColumnsDragging: true` and handle the `onColumnDragging` callback to reorder columns 
when dropped. The grid does **not** reorder columns automatically — you update the `columns` list 
and rebuild rows inside the callback:

```dart
// Hold columns as a mutable list (not inline in build)
late List<GridColumn> columns;

@override
void initState() {
  super.initState();
  columns = [
    GridColumn(columnName: 'id', label: ...),
    GridColumn(columnName: 'name', label: ...),
    GridColumn(columnName: 'designation', label: ...),
    GridColumn(columnName: 'salary', label: ...),
  ];
}

SfDataGrid(
  source: employeeDataSource,
  allowColumnsDragging: true,
  columns: columns,
  onColumnDragging: (DataGridColumnDragDetails details) {
    if (details.action == DataGridColumnDragAction.dropped &&
        details.to != null) {
      // Move the dragged column to its new position
      final GridColumn rearrangeColumn = columns[details.from];
      columns.removeAt(details.from);
      columns.insert(details.to!, rearrangeColumn);

      // Rebuild rows so DataGridCell order matches the new column order
      employeeDataSource.buildDataGridRows();
      employeeDataSource.notifyListeners();
    }
    return true;
  },
)
```

> **Important:** Always create `columns` as an instance variable, not inline in `build()`. This 
> allows the list to be mutated inside the callback. Also rebuild rows after reordering because 
> column indices change — rows must stay aligned with the updated column order.

---

## onColumnDragging Callback

The `onColumnDragging` callback fires throughout the drag lifecycle. It receives a 
`DataGridColumnDragDetails` with:

| Property | Description |
|----------|-------------|
| `from` | Index of the column being dragged |
| `to` | Index of the drop target (may be `null` if not over a valid target) |
| `action` | The current drag stage (`DataGridColumnDragAction` enum) |
| `offset` | Current pointer offset during dragging |

**`DataGridColumnDragAction` values:**

| Value | When it fires |
|-------|--------------|
| `starting` | Drag is about to begin |
| `update` | Column is being dragged over another column |
| `dropped` | Column was released at a target position |
| `canceled` | Drag was canceled (e.g., released outside grid) |

---

## Cancel Drop for a Specific Column

Return `false` from `onColumnDragging` during the `update` action to prevent dropping at a 
specific position:

```dart
onColumnDragging: (DataGridColumnDragDetails details) {
  // Prevent dropping any column at index 2
  if (details.action == DataGridColumnDragAction.update && details.to == 2) {
    return false;
  }

  if (details.action == DataGridColumnDragAction.dropped && details.to != null) {
    final GridColumn rearrangeColumn = columns[details.from];
    columns.removeAt(details.from);
    columns.insert(details.to!, rearrangeColumn);
    employeeDataSource.buildDataGridRows();
    employeeDataSource.notifyListeners();
  }

  return true;
},
```

---

## Custom Drag Feedback Widget

Override the default drag feedback using `columnDragFeedbackBuilder`. Return any widget — it 
will be shown as the floating widget while dragging:

```dart
SfDataGrid(
  source: employeeDataSource,
  allowColumnsDragging: true,
  columns: columns,
  columnDragFeedbackBuilder: (context, column) {
    return Container(
      height: 50,
      width: column.actualWidth,
      color: Colors.grey,
      child: const Center(
        child: DefaultTextStyle(
          style: TextStyle(
            fontSize: 14,
            color: Colors.pink,
            fontWeight: FontWeight.bold,
          ),
          child: Text('Drag View'),
        ),
      ),
    );
  },
  onColumnDragging: (DataGridColumnDragDetails details) {
    if (details.action == DataGridColumnDragAction.dropped &&
        details.to != null) {
      final GridColumn rearrangeColumn = columns[details.from];
      columns.removeAt(details.from);
      columns.insert(details.to!, rearrangeColumn);
      employeeDataSource.buildDataGridRows();
      employeeDataSource.notifyListeners();
    }
    return true;
  },
)
```

---

## Customize the Drag Indicator

Style the drop-position indicator line using `SfDataGridThemeData`. Requires the 
`syncfusion_flutter_core` package:

```dart
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

SfDataGridTheme(
  data: SfDataGridThemeData(
    columnDragIndicatorColor: Colors.pink,
    columnDragIndicatorStrokeWidth: 3,
  ),
  child: SfDataGrid(
    source: employeeDataSource,
    allowColumnsDragging: true,
    columns: columns,
    onColumnDragging: (DataGridColumnDragDetails details) {
      if (details.action == DataGridColumnDragAction.dropped &&
          details.to != null) {
        final GridColumn rearrangeColumn = columns[details.from];
        columns.removeAt(details.from);
        columns.insert(details.to!, rearrangeColumn);
        employeeDataSource.buildDataGridRows();
        employeeDataSource.notifyListeners();
      }
      return true;
    },
  ),
)
```
