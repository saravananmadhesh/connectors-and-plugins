# Swiping — Flutter DataGrid

## Overview

`SfDataGrid` supports left/right row swiping via `allowSwiping = true`. Use `startSwipeActionsBuilder` and `endSwipeActionsBuilder` to define the widgets revealed behind swiped rows. Swipe distance is controlled by `swipeMaxOffset`.

---

## Basic Swiping

```dart
SfDataGrid(
  allowSwiping: true,
  swipeMaxOffset: 100.0,
  source: _employeeDataSource,
  startSwipeActionsBuilder:
      (BuildContext context, DataGridRow row, int rowIndex) {
    return GestureDetector(
        onTap: () {
          _employeeDataSource.dataGridRows.insert(
              rowIndex,
              DataGridRow(cells: [
                DataGridCell(value: 1011, columnName: 'id'),
                DataGridCell(value: 'Tom Bass', columnName: 'name'),
                DataGridCell(value: 'Developer', columnName: 'designation'),
                DataGridCell(value: 20000, columnName: 'salary')
              ]));
          _employeeDataSource.updateDataGridSource();
        },
        child: Container(
            color: Colors.greenAccent,
            child: Center(child: Icon(Icons.add))));
  },
  endSwipeActionsBuilder:
      (BuildContext context, DataGridRow row, int rowIndex) {
    return GestureDetector(
        onTap: () {
          _employeeDataSource.dataGridRows.removeAt(rowIndex);
          _employeeDataSource.updateDataGridSource();
        },
        child: Container(
            color: Colors.redAccent,
            child: Center(child: Icon(Icons.delete))));
  },
  columns: <GridColumn>[
    GridColumn(
        columnName: 'id',
        label: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            alignment: Alignment.centerRight,
            child: Text('ID', overflow: TextOverflow.ellipsis))),
    GridColumn(
        columnName: 'name',
        label: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            alignment: Alignment.centerLeft,
            child: Text('Name', overflow: TextOverflow.ellipsis))),
    GridColumn(
        columnName: 'designation',
        label: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            alignment: Alignment.centerLeft,
            child: Text('Designation', overflow: TextOverflow.ellipsis))),
    GridColumn(
        columnName: 'salary',
        label: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            alignment: Alignment.centerRight,
            child: Text('Salary', overflow: TextOverflow.ellipsis))),
  ],
)
```

The `updateDataGridSource()` helper on `DataGridSource` calls `notifyListeners()`.

``` dart
class EmployeeDataSource extends DataGridSource {
... 

void updateDataGridSource() {
    notifyListeners();
  }
}
```

---

## Swipe Callbacks

| Callback | Parameters | Description |
|---|---|---|
| `onSwipeStart` | `DataGridSwipeStartDetails` | Called when swipe offset changes from zero. Return `false` to cancel. |
| `onSwipeUpdate` | `DataGridSwipeUpdateDetails` | Called during active swiping. Return `false` to cancel. |
| `onSwipeEnd` | `DataGridSwipeEndDetails` | Called when swipe reaches `swipeMaxOffset`. |

Callback detail properties:

| Property | Description |
|---|---|
| `rowIndex` | Index of the swiped row |
| `swipeDirection` | `DataGridRowSwipeDirection.startToEnd` or `endToStart` |
| `swipeOffset` | Current swipe offset |

---

## Customized Swipe-to-Delete

Delete a row when swiped fully from one end to the other:

```dart
LayoutBuilder(builder: (context, constraints) {
  return SfDataGrid(
    allowSwiping: true,
    swipeMaxOffset: constraints.maxWidth,
    source: _employeeDataSource,
    startSwipeActionsBuilder:
        (BuildContext context, DataGridRow row, int rowIndex) {
      return GestureDetector(
          onTap: () {
            _employeeDataSource.dataGridRows.removeAt(rowIndex);
            _employeeDataSource.updateDataGridSource();
          },
          child: Container(
              color: Colors.green,
              padding: EdgeInsets.only(left: 30.0),
              alignment: Alignment.centerLeft,
              child: Text('Delete', style: TextStyle(color: Colors.white))));
    },
    onSwipeUpdate: (DataGridSwipeUpdateDetails details) {
      isReachedCenter =
          (details.swipeOffset >= constraints.maxWidth / 2) ? true : false;
      return true;
    },
    onSwipeEnd: (DataGridSwipeEndDetails details) async {
      if (isReachedCenter && _employeeDataSource.dataGridRows.isNotEmpty) {
        _employeeDataSource.dataGridRows.removeAt(details.rowIndex);
        _employeeDataSource.updateDataGridSource();
        isReachedCenter = false;
      }
    },
    columns: columns,
  );
})
```

---

## Different Swipe Offsets Per Direction

Use `onSwipeStart` and `details.setSwipeMaxOffset()` to set different max offsets for left vs right swipe:

```dart
SfDataGrid(
  allowSwiping: true,
  source: employeeDataSource,
  onSwipeStart: (DataGridSwipeStartDetails details) {
    if (details.swipeDirection == DataGridRowSwipeDirection.startToEnd) {
      details.setSwipeMaxOffset(200);
    } else if (details.swipeDirection == DataGridRowSwipeDirection.endToStart) {
      details.setSwipeMaxOffset(100);
    }
    return true;
  },
  startSwipeActionsBuilder: ...,
  endSwipeActionsBuilder: ...,
  columns: columns,
)
```

---

## Key Property Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `allowSwiping` | `bool` | `false` | Enable row swiping |
| `swipeMaxOffset` | `double` | 200.0 | Maximum swipe distance in pixels |
| `startSwipeActionsBuilder` | `Widget? Function(context, row, rowIndex)?` | `null` | Widget shown on left-to-right swipe |
| `endSwipeActionsBuilder` | `Widget? Function(context, row, rowIndex)?` | `null` | Widget shown on right-to-left swipe |
| `onSwipeStart` | `bool? Function(DataGridSwipeStartDetails)?` | `null` | Callback at swipe start; return false to cancel |
| `onSwipeUpdate` | `bool? Function(DataGridSwipeUpdateDetails)?` | `null` | Callback during swipe; return false to cancel |
| `onSwipeEnd` | `void Function(DataGridSwipeEndDetails)?` | `null` | Callback when swipe completes |
