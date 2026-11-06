# Paging — Flutter DataGrid

## Overview

`SfDataPager` is a companion widget to `SfDataGrid` that provides page-based navigation. Override `DataGridSource.handlePageChange` to load rows for the current page. The data grid and pager are typically placed in a `Column` using a `LayoutBuilder` to manage height correctly.

---

## Basic Setup

### Add Package

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_datagrid
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Imports

```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
```

---

## Basic Paging Example

```dart
final int rowsPerPage = 15;

class EmployeeDataSource extends DataGridSource {
  EmployeeDataSource({required List<Employee> employeeData}) {
    _paginatedRows = employeeData
        .getRange(0, rowsPerPage)
        .toList(growable: false);
    buildDataGridRows();
  }

  List<DataGridRow> dataGridRows = [];
  List<Employee> _paginatedRows = [];

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
          child: Text(
            dataGridCell.value.toString(),
            overflow: TextOverflow.ellipsis,
          ),
        );
      }).toList(),
    );
  }

  void buildDataGridRows() {
    dataGridRows = _paginatedRows.map<DataGridRow>((employee) {
      return DataGridRow(cells: [
        DataGridCell<int>(columnName: 'id', value: employee.id),
        DataGridCell<String>(columnName: 'name', value: employee.name),
        DataGridCell<String>(
            columnName: 'designation', value: employee.designation),
        DataGridCell<int>(columnName: 'salary', value: employee.salary),
      ]);
    }).toList();
  }

  @override
  Future<bool> handlePageChange(int oldPageIndex, int newPageIndex) async {
    int startIndex = newPageIndex * rowsPerPage;
    int endIndex = startIndex + rowsPerPage;

    if (startIndex < employees.length && endIndex <= employees.length) {
      _paginatedRows = employees
          .getRange(startIndex, endIndex)
          .toList(growable: false);
      buildDataGridRows();
      notifyListeners();
    } else {
      _paginatedRows = [];
      buildDataGridRows();
    }

    return true;
  }
}
```

### Widget Layout

```dart
LayoutBuilder(
  builder: (context, constraints) {
    return Column(
      children: [
        SizedBox(
          height: constraints.maxHeight - 60,
          child: SfDataGrid(
            source: employeeDataSource,
            columnWidthMode: ColumnWidthMode.fill,
            columns: [
              GridColumn(
                columnName: 'id',
                label: Container(
                  padding: EdgeInsets.all(16),
                  alignment: Alignment.center,
                  child: Text('ID'),
                ),
              ),
              GridColumn(
                columnName: 'name',
                label: Container(
                  padding: EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Name'),
                ),
              ),
              GridColumn(
                columnName: 'designation',
                label: Container(
                  padding: EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Designation'),
                ),
              ),
              GridColumn(
                columnName: 'salary',
                label: Container(
                  padding: EdgeInsets.all(8),
                  alignment: Alignment.center,
                  child: Text('Salary'),
                ),
              ),
            ],
          ),
        ),
        Container(
          height: 60,
          child: SfDataPager(
            delegate: employeeDataSource,
            pageCount: employees.length / rowsPerPage,
            visibleItemsCount: 5,
          ),
        ),
      ],
    );
  },
)
```

---

## Async Page Loading

Show a loading indicator while fetching data asynchronously:

```dart
bool isLoading = false;

@override
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      return Column(
        children: [
          SizedBox(
            height: constraints.maxHeight - 60,
            child: Stack(
              children: [
                SfDataGrid(
                  source: employeeDataSource,
                  columnWidthMode: ColumnWidthMode.fill,
                  columns: columns,
                ),
                if (isLoading)
                  Center(child: CircularProgressIndicator()),
              ],
            ),
          ),
          Container(
            height: 60,
            child: SfDataPager(
              delegate: employeeDataSource,
              pageCount: employees.length / rowsPerPage,
              onPageNavigationStart: (int newPageIndex) {
                setState(() => isLoading = true);
              },
              onPageNavigationEnd: (int newPageIndex) {
                setState(() => isLoading = false);
              },
            ),
          ),
        ],
      );
    },
  );
}
```

### handlePageChange with async delay

```dart
@override
Future<bool> handlePageChange(int oldPageIndex, int newPageIndex) async {
  await Future.delayed(Duration(milliseconds: 500));

  int startIndex = newPageIndex * rowsPerPage;
  int endIndex = startIndex + rowsPerPage;

  _paginatedRows = employees
      .getRange(startIndex, endIndex)
      .toList(growable: false);
  buildDataGridRows();
  notifyListeners();

  return true;
}
```

---

## Programmatic Navigation

Use `DataPagerController` to navigate pages programmatically:

```dart
final DataPagerController _dataPagerController = DataPagerController();

SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / rowsPerPage,
  controller: _dataPagerController,
  initialPageIndex: 4,   // start on page 5 (0-based)
)

// Navigate programmatically
_dataPagerController.nextPage();
_dataPagerController.previousPage();
_dataPagerController.firstPage();
_dataPagerController.lastPage();
```

---

## Rows Per Page Dropdown

Allow users to change the number of rows displayed per page:

```dart
SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / rowsPerPage,
  availableRowsPerPage: const [10, 15, 20],
  onRowsPerPageChanged: (int? rowsPerPage) {
    setState(() {
      this.rowsPerPage = rowsPerPage!;
      employeeDataSource.updateDataGriDataSource();
    });
  },
)
```

---

## Pager Direction

```dart
SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / rowsPerPage,
  direction: Axis.vertical,   // default is Axis.horizontal
)
```

---

## Hiding Navigation Buttons

```dart
SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / rowsPerPage,
  firstPageItemVisible: false,
  lastPageItemVisible: false,
  nextPageItemVisible: true,
  previousPageItemVisible: true,
)
```

---

## Custom Page Button

```dart
SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / rowsPerPage,
  pageItemBuilder: (String itemName) {
    if (itemName == '1') {
      return Container(
        alignment: Alignment.center,
        child: Icon(Icons.home),
      );
    }
    return null;  // return null to use default rendering
  },
)
```

---

## Sort Across All Pages

To sort all rows across pages (not just the current page), use `SfDataGrid.rowsPerPage` and do NOT override `handlePageChange`. The DataGrid handles paging internally:

```dart
SfDataGrid(
  source: employeeDataSource,
  rowsPerPage: 15,
  allowSorting: true,
  columnWidthMode: ColumnWidthMode.fill,
  columns: columns,
)

SfDataPager(
  delegate: employeeDataSource,
  pageCount: employees.length / 15,
)
```

---

## Appearance Customization

Use `SfDataPagerTheme` to customize the pager's visual appearance:

```dart
SfDataPagerTheme(
  data: SfDataPagerThemeData(
    itemColor: Colors.white,
    selectedItemColor: Colors.lightGreen,
    itemBorderRadius: BorderRadius.circular(5),
    backgroundColor: Colors.teal,
  ),
  child: SfDataPager(
    delegate: employeeDataSource,
    pageCount: employees.length / rowsPerPage,
  ),
)
```

### Sizing Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `itemWidth` | `double` | 40.0 | Width of each page number item |
| `itemHeight` | `double` | 40.0 | Height of each page number item |
| `navigationItemWidth` | `double` | 40.0 | Width of navigation buttons (first/prev/next/last) |
| `navigationItemHeight` | `double` | 40.0 | Height of navigation buttons |
| `itemPadding` | `double` | 5.0 | Padding between items |

---

## Key Property Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `delegate` | `DataGridSource` | required | Data source (must implement `handlePageChange`) |
| `pageCount` | `double` | required | Total number of pages |
| `visibleItemsCount` | `int` | 5 | Number of visible page number buttons |
| `direction` | `Axis` | `Axis.horizontal` | Pager layout direction |
| `controller` | `DataPagerController?` | `null` | Programmatic navigation controller |
| `initialPageIndex` | `int` | 0 | Page to show on initial load (via controller) |
| `availableRowsPerPage` | `List<int>` | `[10,15,20]` | Options shown in rows-per-page dropdown |
| `onRowsPerPageChanged` | `Function(int?)` | `null` | Callback when rows-per-page changes |
| `onPageNavigationStart` | `Function(int)` | `null` | Callback before page navigation |
| `onPageNavigationEnd` | `Function(int)` | `null` | Callback after page navigation |
| `pageItemBuilder` | `Widget? Function(String)` | `null` | Custom builder for page number items |
| `firstPageItemVisible` | `bool` | `true` | Show/hide first-page button |
| `lastPageItemVisible` | `bool` | `true` | Show/hide last-page button |
| `nextPageItemVisible` | `bool` | `true` | Show/hide next-page button |
| `previousPageItemVisible` | `bool` | `true` | Show/hide previous-page button |

---

## TOC

- [Basic Setup](#basic-setup)
- [Basic Paging Example](#basic-paging-example)
- [Async Page Loading](#async-page-loading)
- [Programmatic Navigation](#programmatic-navigation)
- [Rows Per Page Dropdown](#rows-per-page-dropdown)
- [Pager Direction](#pager-direction)
- [Hiding Navigation Buttons](#hiding-navigation-buttons)
- [Custom Page Button](#custom-page-button)
- [Sort Across All Pages](#sort-across-all-pages)
- [Appearance Customization](#appearance-customization)
- [Key Property Reference](#key-property-reference)
