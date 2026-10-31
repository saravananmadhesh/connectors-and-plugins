# Load More / Infinite Scroll — Flutter DataGrid

## Overview

`SfDataGrid` supports loading additional rows on demand when the user scrolls to the bottom. Use `SfDataGrid.loadMoreViewBuilder` to provide a custom widget (loading indicator or button), and override `DataGridSource.handleLoadMoreRows()` to fetch the next batch of data.

---

## Core API

| API | Type | Description |
|---|---|---|
| `SfDataGrid.loadMoreViewBuilder` | `Widget? Function(BuildContext, LoadMoreRows)?` | Builder for the widget shown at the bottom when more rows can be loaded |
| `DataGridSource.handleLoadMoreRows()` | `Future<void>` | Override to fetch additional rows and call `notifyListeners()` |

---

## DataGridSource Setup

Override `handleLoadMoreRows` to append new rows:

```dart
class EmployeeDataSource extends DataGridSource {
  EmployeeDataSource({required List<Employee> employeeData}) {
    employees = employeeData;
    _buildDataGridRows(employees);
  }

  void _buildDataGridRows(List<Employee> employeeData) {
    dataGridRows = employeeData.map<DataGridRow>((employee) {
      return DataGridRow(cells: [
        DataGridCell<int>(columnName: 'id', value: employee.id),
        DataGridCell<String>(columnName: 'name', value: employee.name),
        DataGridCell<String>(
            columnName: 'designation', value: employee.designation),
        DataGridCell<int>(columnName: 'salary', value: employee.salary),
      ]);
    }).toList();
  }

  List<DataGridRow> dataGridRows = [];
  List<Employee> employees = [];

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    return DataGridRowAdapter(
      cells: row.getCells().map<Widget>((dataGridCell) {
        return Container(
          alignment: (dataGridCell.columnName == 'id' ||
                  dataGridCell.columnName == 'salary')
              ? Alignment.centerRight
              : Alignment.centerLeft,
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(dataGridCell.value.toString()),
        );
      }).toList(),
    );
  }

  @override
  Future<void> handleLoadMoreRows() async {
    await Future.delayed(Duration(seconds: 5));  // simulate network fetch
    employees.addAll(getEmployees(15));           // fetch more rows
    _buildDataGridRows(employees);
    notifyListeners();
  }
}
```

---

## Infinite Scroll Pattern

Use a `FutureBuilder` in `loadMoreViewBuilder` to automatically trigger loading when the user scrolls to the bottom:

```dart
SfDataGrid(
  source: employeeDataSource,
  columnWidthMode: ColumnWidthMode.fill,
  columns: columns,
  loadMoreViewBuilder: (BuildContext context, LoadMoreRows loadMoreRows) {
    Future<String> loadRows() async {
      await loadMoreRows();  // calls handleLoadMoreRows internally
      return 'Loaded';
    }

    return FutureBuilder<String>(
      initialData: 'loading',
      future: loadRows(),
      builder: (context, snapShot) {
        if (snapShot.data == 'loading') {
          return Container(
            height: 98.0,
            width: double.infinity,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  width: 1.0,
                  color: Color.fromRGBO(0, 0, 0, 0.26),
                ),
              ),
            ),
            child: CircularProgressIndicator(),
          );
        } else {
          return SizedBox.fromSize(size: Size.zero);  // hide when done
        }
      },
    );
  },
)
```

---

## Load More Button Pattern

Show a button at the bottom that fetches more rows when tapped:

```dart
SfDataGrid(
  source: employeeDataSource,
  columnWidthMode: ColumnWidthMode.fill,
  columns: columns,
  loadMoreViewBuilder: (BuildContext context, LoadMoreRows loadMoreRows) {
    bool showIndicator = false;

    return StatefulBuilder(
      builder: (context, setState) {
        return showIndicator
            ? Container(
                height: 98.0,
                alignment: Alignment.center,
                width: double.infinity,
                child: CircularProgressIndicator(),
              )
            : Container(
                height: 98.0,
                alignment: Alignment.center,
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () async {
                    if (context.mounted) {
                      setState(() => showIndicator = true);
                    }
                    await loadMoreRows();
                    if (context.mounted) {
                      setState(() => showIndicator = false);
                    }
                  },
                  child: Text('Load More Rows'),
                ),
              );
      },
    );
  },
)
```

> **Note:** Always check `context.mounted` before calling `setState` inside an async callback to avoid setState-after-dispose errors.

---

## Key Points

- `loadMoreViewBuilder` is only triggered when the user scrolls to the very bottom of the grid.
- The `LoadMoreRows` callback passed to `loadMoreViewBuilder` internally calls `handleLoadMoreRows()` on the data source.
- Call `notifyListeners()` inside `handleLoadMoreRows()` after updating the rows list to refresh the grid.
- For infinite scroll, use `FutureBuilder` — the future starts immediately and shows a spinner while loading.
- For on-demand loading, use `StatefulBuilder` with a button to give the user control over when to load.
