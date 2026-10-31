# Pull-to-Refresh — Flutter DataGrid

## Overview

`SfDataGrid` supports pull-to-refresh to add more data at runtime. The built-in `RefreshIndicator` is shown automatically during the refresh gesture.

---

## Basic Setup

1. Set `SfDataGrid.allowPullToRefresh = true`
2. Override `DataGridSource.handleRefresh()` to load new data and call `notifyListeners()`

```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

// In build():
SfDataGrid(
  allowPullToRefresh: true,
  source: _employeeDataSource,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerRight,
        child: Text('ID', overflow: TextOverflow.ellipsis),
      ),
    ),
    // ... other columns
  ],
)

// In DataGridSource:
class EmployeeDataSource extends DataGridSource {
  List<DataGridRow> dataGridRows = [];

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    return DataGridRowAdapter(
      cells: row.getCells().map<Widget>((cell) {
        return Container(
          alignment: (cell.columnName == 'id' || cell.columnName == 'salary')
              ? Alignment.centerRight
              : Alignment.centerLeft,
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(cell.value.toString(), overflow: TextOverflow.ellipsis),
        );
      }).toList(),
    );
  }

  @override
  Future<void> handleRefresh() async {
    await Future.delayed(Duration(seconds: 5)); // simulate network delay
    _addMoreRows(_employees, 15);              // add new data
    buildDataGridRows();                        // rebuild rows
    notifyListeners();                          // notify DataGrid
  }

  void buildDataGridRows() {
    dataGridRows = _employees.map<DataGridRow>((e) => DataGridRow(cells: [
      DataGridCell<int>(columnName: 'id', value: e.id),
      DataGridCell<String>(columnName: 'name', value: e.name),
      DataGridCell<String>(columnName: 'designation', value: e.designation),
      DataGridCell<int>(columnName: 'salary', value: e.salary),
    ])).toList();
  }
}
```

---

## Customize the Refresh Indicator

Change indicator color via `ThemeData`, and stroke width/displacement via DataGrid properties:

```dart
Theme(
  data: ThemeData(
    brightness: Brightness.light,
    canvasColor: Colors.lightBlue,             // indicator background
    colorScheme: const ColorScheme.light(primary: Colors.white), // spinner color
  ),
  child: SfDataGrid(
    allowPullToRefresh: true,
    source: _employeeDataSource,
    refreshIndicatorStrokeWidth: 3.0,          // spinner line width
    refreshIndicatorDisplacement: 60.0,        // distance before trigger
    columns: <GridColumn>[/* ... */],
  ),
)
```

| Property | Type | Default | Description |
|---|---|---|---|
| `allowPullToRefresh` | `bool` | `false` | Enable pull-to-refresh |
| `refreshIndicatorStrokeWidth` | `double` | `2.0` | Stroke width of the refresh spinner |
| `refreshIndicatorDisplacement` | `double` | `40.0` | Distance the indicator is displaced before refresh triggers |

---

## Programmatic Refresh (Without Indicator)

Use `GlobalKey<SfDataGridState>` and call `refresh()` to trigger refresh programmatically. Pass `showRefreshIndicator: false` to skip the visual indicator:

```dart
final GlobalKey<SfDataGridState> key = GlobalKey<SfDataGridState>();

// In build():
Scaffold(
  body: SfDataGrid(
    key: key,
    allowPullToRefresh: true,
    source: _employeeDataSource,
    columns: <GridColumn>[/* ... */],
  ),
  floatingActionButton: FloatingActionButton(
    child: Icon(Icons.refresh),
    onPressed: () {
      // Calls handleRefresh without showing the RefreshIndicator
      key.currentState!.refresh(showRefreshIndicator: false);
    },
  ),
)
```

---

## TOC

- [Basic Setup](#basic-setup)
- [Customize the Refresh Indicator](#customize-the-refresh-indicator)
- [Programmatic Refresh (Without Indicator)](#programmatic-refresh-without-indicator)
