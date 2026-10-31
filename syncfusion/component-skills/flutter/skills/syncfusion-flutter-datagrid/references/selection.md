# Selection — Flutter DataGrid

## Overview

`SfDataGrid` supports single and multiple row selection. Set `selectionMode` to enable selection. Use `DataGridController` to get/set selected rows programmatically, navigate cells, and retrieve row details.

---

## Selection Modes

| Mode | Description |
|---|---|
| `SelectionMode.none` | Selection disabled (default) |
| `SelectionMode.single` | One row at a time; next selection clears previous |
| `SelectionMode.multiple` | Multiple rows; click selected row again to deselect |
| `SelectionMode.singleDeselect` | Single row; tap again to deselect |

```dart
SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.single,
  columns: columns,
)
```

---

## Navigation Mode

Control whether keyboard/touch navigates between cells or rows:

```dart
SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,   // or GridNavigationMode.row
  columns: columns,
)
```

---

## Getting Selected Rows

Use `DataGridController`:

```dart
final DataGridController _dataGridController = DataGridController();

SfDataGrid(
  source: _employeeDataSource,
  controller: _dataGridController,
  selectionMode: SelectionMode.multiple,
  columns: columns,
)

// Read selection
var selectedIndex = _dataGridController.selectedIndex;    // last selected row index
var selectedRow = _dataGridController.selectedRow;        // last selected DataGridRow
var selectedRows = _dataGridController.selectedRows;      // all selected DataGridRows
```

---

## Programmatic Selection

```dart
// Single mode — by index
_dataGridController.selectedIndex = 4;

// Single mode — by row
_dataGridController.selectedRow = _employeeDataSource.dataGridRows[3];

// Multiple mode — set list
_dataGridController.selectedRows = [
  _employeeDataSource.dataGridRows[1],
  _employeeDataSource.dataGridRows[3],
  _employeeDataSource.dataGridRows[6],
];
```

---

## Clearing Selection

```dart
// Single / singleDeselect
_dataGridController.selectedIndex = -1;
// or
_dataGridController.selectedRow = null;

// Multiple
_dataGridController.selectedRows = [];
```

> **Note:** Selected rows are automatically cleared when the `source` is changed at runtime.

---

## Current Cell

```dart
// Get current cell
var currentCell = _dataGridController.currentCell;  // RowColumnIndex

// Move current cell programmatically
_dataGridController.moveCurrentCellTo(RowColumnIndex(6, 3));
```

---

## Get Row Details

```dart
DataGridRowDetails? details = _dataGridController.getRowDetails(4);
if (details != null) {
  print(details.rowType);       // RowType (dataRow, headerRow, etc.)
  print(details.dataGridRow);   // DataGridRow at this index
  print(details.isSelected);    // bool
}
```

---

## Selection Callbacks

```dart
SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.single,
  onSelectionChanging: (List<DataGridRow> addedRows, List<DataGridRow> removedRows) {
    // return false to cancel selection
    final index = _employeeDataSource.dataGridRows.indexOf(addedRows.last);
    if (_employees[index].designation == 'Manager') return false;
    return true;
  },
  onSelectionChanged: (List<DataGridRow> addedRows, List<DataGridRow> removedRows) {
    // post-selection notification
  },
  columns: columns,
)
```

## Current Cell Callbacks

```dart
SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,
  onCurrentCellActivating: (RowColumnIndex current, RowColumnIndex previous) {
    // return false to cancel focus on this cell
    if (current.rowIndex == 2 && current.columnIndex == 3) return false;
    return true;
  },
  onCurrentCellActivated: (RowColumnIndex current, RowColumnIndex previous) {
    // cell is now focused
  },
  columns: columns,
)
```

---

## Cell Tap Callbacks

```dart
SfDataGrid(
  source: _employeeDataSource,
  onCellTap: (DataGridCellTapDetails details) { print(details); },
  onCellDoubleTap: (DataGridCellDoubleTapDetails details) { print(details); },
  onCellLongPress: (DataGridCellLongPressDetails details) { print(details); },
  onCellSecondaryTap: (DataGridCellTapDetails details) { print(details); },
  columns: columns,
)
```

---

## Custom Key Handling

Override `RowSelectionManager.handleKeyEvent` to customize keyboard behavior:

```dart
class CustomSelectionManager extends RowSelectionManager {
  @override
  void handleKeyEvent(KeyEvent keyEvent) {
    if (keyEvent.logicalKey == LogicalKeyboardKey.keyA) {
      if (HardwareKeyboard.instance.isControlPressed) {
        // custom Ctrl+A logic
        return;
      }
    }
    super.handleKeyEvent(keyEvent);
  }
}

SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.multiple,
  selectionManager: CustomSelectionManager(),
  columns: columns,
)
```

---

## Selection Appearance

Customize selection background and current cell border:

```dart
SfDataGridTheme(
    data: SfDataGridThemeData(
        selectionColor: Colors.red,
        currentCellStyle: DataGridCurrentCellStyle(
            borderWidth: 2,
            borderColor: Colors.pinkAccent)),
    child: SfDataGrid(
      source: _employeeDataSource,
      selectionMode: SelectionMode.multiple,
      navigationMode: GridNavigationMode.cell,
      columns: columns,
    ))
```

---

## Keyboard Navigation Reference

| Key | Behavior |
|---|---|
| `↑` / `↓` | Move current cell up/down |
| `←` / `→` | Move current cell left/right |
| `Home` / `Ctrl+←` | First cell in row |
| `End` / `Ctrl+→` | Last cell in row |
| `Ctrl+↑` / `Ctrl+↓` | First/last row in current column |
| `Ctrl+Home` / `Ctrl+End` | First/last cell of grid |
| `PageUp` / `PageDown` | Scroll to previous/next page |
| `Tab` / `Shift+Tab` | Move to next/previous cell |
| `Space` | Toggle selection (multiple mode) |
| `Shift+↑` / `Shift+↓` | Range-select rows (multiple mode) |
| `Ctrl+A` | Select all rows/cells |
| `F2` | Enter edit mode (if `allowEditing` is true) |
| `Esc` | Cancel edit (calls `onCellCancelEdit`) |
| `Enter` | Move to next row in same column |

---

## Key Property Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `selectionMode` | `SelectionMode` | `none` | Selection behavior |
| `navigationMode` | `GridNavigationMode` | `row` | Cell or row navigation |
| `controller` | `DataGridController?` | `null` | Access selection and navigation programmatically |
| `selectionManager` | `RowSelectionManager?` | `null` | Custom keyboard/selection handler |
| `onSelectionChanging` | `bool? Function(addedRows, removedRows)?` | `null` | Pre-selection callback; return false to cancel |
| `onSelectionChanged` | `void Function(addedRows, removedRows)?` | `null` | Post-selection callback |
| `onCurrentCellActivating` | `bool? Function(current, previous)?` | `null` | Pre-focus callback; return false to cancel |
| `onCurrentCellActivated` | `void Function(current, previous)?` | `null` | Post-focus callback |
| `onCellTap` | `void Function(DataGridCellTapDetails)?` | `null` | Single tap callback |
| `onCellDoubleTap` | `void Function(DataGridCellDoubleTapDetails)?` | `null` | Double tap callback |
| `onCellLongPress` | `void Function(DataGridCellLongPressDetails)?` | `null` | Long press callback |
| `onCellSecondaryTap` | `void Function(DataGridCellTapDetails)?` | `null` | Secondary (right-click) tap callback |

---

## TOC

- [Selection Modes](#selection-modes)
- [Navigation Mode](#navigation-mode)
- [Getting Selected Rows](#getting-selected-rows)
- [Programmatic Selection](#programmatic-selection)
- [Clearing Selection](#clearing-selection)
- [Current Cell](#current-cell)
- [Get Row Details](#get-row-details)
- [Selection Callbacks](#selection-callbacks)
- [Cell Tap Callbacks](#cell-tap-callbacks)
- [Custom Key Handling](#custom-key-handling)
- [Selection Appearance](#selection-appearance)
- [Keyboard Navigation Reference](#keyboard-navigation-reference)
