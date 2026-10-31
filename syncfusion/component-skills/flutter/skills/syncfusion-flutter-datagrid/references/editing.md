# Editing — Flutter DataGrid

## Overview

`SfDataGrid` supports inline cell editing. To enable it:

1. Set `SfDataGrid.allowEditing = true`
2. Set `SfDataGrid.navigationMode = GridNavigationMode.cell`
3. Set `SfDataGrid.selectionMode` to any value other than `none`
4. Override `DataGridSource.buildEditWidget` to return the edit widget
5. Override `DataGridSource.onCellSubmit` to commit the edited value

---

## Basic Setup

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowEditing: true,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,
  columns: [
    GridColumn(columnName: 'id', label: Container(/* ... */)),
    GridColumn(columnName: 'name', label: Container(/* ... */)),
    GridColumn(columnName: 'designation', label: Container(/* ... */)),
    GridColumn(columnName: 'salary', label: Container(/* ... */)),
  ],
)
```

---

## DataGridSource: buildEditWidget + onCellSubmit

Provide the editing widget via `buildEditWidget` and commit values via `onCellSubmit`:

```dart
class EmployeeDataSource extends DataGridSource {
  dynamic newCellValue;
  TextEditingController editingController = TextEditingController();

  @override
  Widget? buildEditWidget(DataGridRow dataGridRow,
      RowColumnIndex rowColumnIndex, GridColumn column, CellSubmit submitCell) {
    final String displayText = dataGridRow
            .getCells()
            .firstWhereOrNull((cell) => cell.columnName == column.columnName)
            ?.value
            ?.toString() ??
        '';

    newCellValue = null; // reset before editing

    final bool isNumericType =
        column.columnName == 'id' || column.columnName == 'salary';

    return Container(
      padding: const EdgeInsets.all(8.0),
      alignment: isNumericType ? Alignment.centerRight : Alignment.centerLeft,
      child: TextField(
        autofocus: true,
        controller: editingController..text = displayText,
        textAlign: isNumericType ? TextAlign.right : TextAlign.left,
        keyboardType:
            isNumericType ? TextInputType.number : TextInputType.text,
        decoration: InputDecoration(
          contentPadding: const EdgeInsets.fromLTRB(0, 0, 0, 16.0),
        ),
        onChanged: (String value) {
          if (value.isNotEmpty) {
            newCellValue = isNumericType ? int.parse(value) : value;
          } else {
            newCellValue = null;
          }
        },
        onSubmitted: (String value) {
          // On mobile: manually call submitCell to trigger onCellSubmit
          submitCell();
        },
      ),
    );
  }

  @override
  Future<void> onCellSubmit(DataGridRow dataGridRow,
      RowColumnIndex rowColumnIndex, GridColumn column) async {
    final dynamic oldValue = dataGridRow
            .getCells()
            .firstWhereOrNull((cell) => cell.columnName == column.columnName)
            ?.value ??
        '';
    final int dataRowIndex = dataGridRows.indexOf(dataGridRow);

    if (newCellValue == null || oldValue == newCellValue) return;

    if (column.columnName == 'id') {
      dataGridRows[dataRowIndex].getCells()[rowColumnIndex.columnIndex] =
          DataGridCell<int>(columnName: 'id', value: newCellValue);
      _employees[dataRowIndex].id = newCellValue as int;
    } else if (column.columnName == 'name') {
      dataGridRows[dataRowIndex].getCells()[rowColumnIndex.columnIndex] =
          DataGridCell<String>(columnName: 'name', value: newCellValue);
      _employees[dataRowIndex].name = newCellValue.toString();
    } else if (column.columnName == 'designation') {
      dataGridRows[dataRowIndex].getCells()[rowColumnIndex.columnIndex] =
          DataGridCell<String>(columnName: 'designation', value: newCellValue);
      _employees[dataRowIndex].designation = newCellValue.toString();
    } else {
      dataGridRows[dataRowIndex].getCells()[rowColumnIndex.columnIndex] =
          DataGridCell<int>(columnName: 'salary', value: newCellValue);
      _employees[dataRowIndex].salary = newCellValue as int;
    }
    // No need to call notifyListeners — DataGrid refreshes automatically
  }
}
```

---

## Disable Editing for a Specific Column

```dart
GridColumn(
  columnName: 'id',
  allowEditing: false,  // overrides SfDataGrid.allowEditing
  label: Container(/* ... */),
)
```

---

## Edit Mode Trigger

By default, double-tap enters edit mode. Use single-tap instead:

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowEditing: true,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,
  editingGestureType: EditingGestureType.tap,
  columns: [/* ... */],
)
```

---

## DataGridSource Methods for Editing

### onCellBeginEdit — Control which cells can enter edit mode

Return `false` to prevent a cell from entering edit mode:

```dart
@override
bool onCellBeginEdit(
    DataGridRow dataGridRow, RowColumnIndex rowColumnIndex, GridColumn column) {
  if (column.columnName == 'id') {
    return false; // block editing for 'id' column
  }
  return true;
}
```

Block a specific cell by row/column index:

```dart
@override
bool onCellBeginEdit(DataGridRow dataGridRow, RowColumnIndex rowColumnIndex,
    GridColumn column) {
  if (rowColumnIndex.equals(RowColumnIndex(2, 2))) {
    return false;
  }
  return true;
}
```

### canSubmitCell — Validate before committing

Return `false` to keep the cell in edit mode (focus stays on current cell):

```dart
@override
Future<bool> canSubmitCell(DataGridRow dataGridRow,
    RowColumnIndex rowColumnIndex, GridColumn column) async {
  if (column.columnName == 'id' && newCellValue == null) {
    return false; // retain in edit mode to prevent null value
  }
  return true;
}
```

### onCellSubmit — Commit edited values

Called when editing ends (via `submitCell()` or focus change). See [Basic Setup](#datasourcce-buildEditWidget--onCellSubmit) for full example.

> No need to call `notifyListeners` after updating `dataGridRows` — DataGrid refreshes automatically.

### onCellCancelEdit — Handle ESC key cancel

Called on Web/Desktop when `Esc` is pressed. `canSubmitCell` and `onCellSubmit` are **not** called:

```dart
@override
void onCellCancelEdit(DataGridRow dataGridRow, RowColumnIndex rowColumnIndex,
    GridColumn column) {
  // Reset any temp edit state here
}
```

---

## Programmatic Editing

### Begin edit at specific cell

```dart
final DataGridController _dataGridController = DataGridController();

// In widget:
SfDataGrid(
  source: _employeeDataSource,
  allowEditing: true,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,
  controller: _dataGridController,
  columns: [/* ... */],
)

// Trigger programmatically:
_dataGridController.beginEdit(RowColumnIndex(2, 3));
```

### End edit programmatically

```dart
_dataGridController.endEdit();
```

### Check if current cell is in edit mode

```dart
bool isEditing = _dataGridController.isCurrentCellInEditing;
```

---

## Async Editing with Loading Indicator

Use `StreamController` to show a loading indicator during async `onCellSubmit` or `canSubmitCell`:

```dart
StreamController<bool> loadingController = StreamController<bool>();

// In build(), wrap SfDataGrid in StreamBuilder:
StreamBuilder(
  stream: loadingController.stream,
  builder: (context, snapshot) {
    return Stack(children: [
      SfDataGrid(/* ... */),
      if (snapshot.data == true)
        const Center(child: CircularProgressIndicator()),
    ]);
  },
)

// In DataGridSource:
@override
Future<void> onCellSubmit(/* ... */) async {
  loadingController.add(true);
  await Future<void>.delayed(const Duration(seconds: 2));
  loadingController.add(false);
  // ... commit logic
}

@override
Future<bool> canSubmitCell(/* ... */) async {
  if (column.columnName == 'id' && newCellValue == 104) {
    loadingController.add(true);
    await Future<void>.delayed(const Duration(seconds: 2));
    loadingController.add(false);
    return false; // invalid value, stay in edit mode
  }
  return true;
}
```

---

## Key Properties Reference

| Property / Method | Description |
|---|---|
| `SfDataGrid.allowEditing` | Enable cell editing globally |
| `SfDataGrid.navigationMode` | Must be `GridNavigationMode.cell` for editing |
| `SfDataGrid.selectionMode` | Must not be `none` |
| `SfDataGrid.editingGestureType` | `tap` or `doubleTap` (default) |
| `GridColumn.allowEditing` | Override editing per column |
| `DataGridSource.buildEditWidget` | Returns the edit widget for a cell |
| `DataGridSource.onCellSubmit` | Commit edited value to data source |
| `DataGridSource.onCellBeginEdit` | Control which cells can be edited |
| `DataGridSource.canSubmitCell` | Validate before committing |
| `DataGridSource.onCellCancelEdit` | Handle ESC key cancel |
| `DataGridController.beginEdit(RowColumnIndex)` | Programmatically enter edit mode |
| `DataGridController.endEdit()` | Programmatically end edit mode |
| `DataGridController.isCurrentCellInEditing` | Check if current cell is in edit mode |

---

## TOC

- [Basic Setup](#basic-setup)
- [DataGridSource: buildEditWidget + onCellSubmit](#datasource-buildEditWidget--onCellSubmit)
- [Disable Editing for a Specific Column](#disable-editing-for-a-specific-column)
- [Edit Mode Trigger](#edit-mode-trigger)
- [DataGridSource Methods for Editing](#datasource-methods-for-editing)
- [Programmatic Editing](#programmatic-editing)
- [Async Editing with Loading Indicator](#async-editing-with-loading-indicator)
