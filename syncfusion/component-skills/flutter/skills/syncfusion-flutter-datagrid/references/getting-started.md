# Getting Started with SfDataGrid

## Installation

Add the package by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_datagrid
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

Import in your Dart file:
```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
```

## Overview

`SfDataGrid` is a high-performance Flutter widget for displaying and manipulating tabular data. It 
is designed to handle large datasets efficiently while providing rich interactivity.

### Key Features

- **Column types** — Load any widget in each column for flexible content presentation
- **Column sizing** — Fixed widths, auto-fit to content, or fill-based modes
- **Row height** — Customize header and data row heights; auto-adjust based on content
- **Editing** — Allow users to modify cell values with custom editor widget support
- **Sorting** — Ascending/descending sort on single or multiple columns
- **Selection** — Single or multi-row selection with keyboard navigation (web)
- **Filtering** — Excel-like interactive filtering; also supports programmatic filtering
- **Column Drag and Drop** — Reorder columns by drag-and-drop
- **Column resizing** — Drag the right edge of a header to resize
- **Exporting** — Export grid data to Excel and PDF
- **Styling** — Conditional cell/header styling support
- **Stacked headers** — Unbound header rows spanning multiple rows/columns
- **Load more** — On-demand data loading when scrolling reaches the bottom
- **Paging** — Segment large datasets with `SfDataPager`
- **Freeze Panes** — Freeze rows/columns while scrolling
- **Swiping** — Left/right swipe actions per row (e.g., delete, edit)
- **Footer row** — Extra row below last data row for summaries or widgets
- **Pull to refresh** — Refresh data by pulling down
- **Theme** — Dark and light theme support
- **Accessibility** — Screen reader support
- **RTL** — Right-to-left layout support for Arabic, Hebrew, etc.

## Essential Concepts

### DataGridSource

`DataGridSource` is the data provider for `SfDataGrid`. You must subclass it and implement:

- **`rows`** — Returns a `List<DataGridRow>` representing all data rows
- **`buildRow`** — Returns a `DataGridRowAdapter` containing the cell widgets for a given row

> `DataGridSource` objects should be **long-lived** — do not recreate them on every `build()` call.

### DataGridRow & DataGridCell

- `DataGridRow` wraps a list of `DataGridCell` objects
- `DataGridCell<T>` holds a `columnName` and a `value`

### GridColumn

- `GridColumn` defines a column with a `columnName` (mapped to `DataGridCell.columnName`) and a 
  `label` widget shown in the column header

## Minimal Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

// Step 1: Define your data model
class Employee {
  Employee(this.id, this.name, this.designation, this.salary);
  final int id;
  final String name;
  final String designation;
  final int salary;
}

// Step 2: Create a DataGridSource
class EmployeeDataSource extends DataGridSource {
  EmployeeDataSource({required List<Employee> employees}) {
    dataGridRows = employees.map<DataGridRow>((e) => DataGridRow(cells: [
      DataGridCell<int>(columnName: 'id', value: e.id),
      DataGridCell<String>(columnName: 'name', value: e.name),
      DataGridCell<String>(columnName: 'designation', value: e.designation),
      DataGridCell<int>(columnName: 'salary', value: e.salary),
    ])).toList();
  }

  List<DataGridRow> dataGridRows = [];

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    return DataGridRowAdapter(
      cells: row.getCells().map<Widget>((cell) {
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          alignment: (cell.columnName == 'id' || cell.columnName == 'salary')
              ? Alignment.centerRight
              : Alignment.centerLeft,
          child: Text(
            cell.value.toString(),
            overflow: TextOverflow.ellipsis,
          ),
        );
      }).toList(),
    );
  }
}

// Step 3: Use SfDataGrid in your widget tree
class MyGridWidget extends StatefulWidget {
  @override
  State<MyGridWidget> createState() => _MyGridWidgetState();
}

class _MyGridWidgetState extends State<MyGridWidget> {
  late EmployeeDataSource _dataSource;

  @override
  void initState() {
    super.initState();
    final employees = [
      Employee(1, 'James', 'Project Lead', 20000),
      Employee(2, 'Kathryn', 'Manager', 30000),
      Employee(3, 'Lara', 'Developer', 15000),
    ];
    _dataSource = EmployeeDataSource(employees: employees);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfDataGrid(
        source: _dataSource,
        columnWidthMode: ColumnWidthMode.lastColumnFill,
        columns: <GridColumn>[
          GridColumn(
            columnName: 'id',
            label: Container(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              alignment: Alignment.centerRight,
              child: Text('ID', overflow: TextOverflow.ellipsis),
            ),
          ),
          GridColumn(
            columnName: 'name',
            label: Container(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              alignment: Alignment.centerLeft,
              child: Text('Name', overflow: TextOverflow.ellipsis),
            ),
          ),
          GridColumn(
            columnName: 'designation',
            label: Container(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              alignment: Alignment.centerLeft,
              child: Text('Designation', overflow: TextOverflow.ellipsis),
            ),
          ),
          GridColumn(
            columnName: 'salary',
            label: Container(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              alignment: Alignment.centerRight,
              child: Text('Salary', overflow: TextOverflow.ellipsis),
            ),
          ),
        ],
      ),
    );
  }
}
```

## Key Properties at a Glance

| Property | Type | Description |
|----------|------|-------------|
| `source` | `DataGridSource` | **Required.** The data provider for the grid |
| `columns` | `List<GridColumn>` | **Required.** Column definitions |
| `columnWidthMode` | `ColumnWidthMode` | How columns fill available width (`fill`, `lastColumnFill`, `auto`, etc.) |
| `allowSorting` | `bool` | Enable column tap-to-sort |
| `allowFiltering` | `bool` | Enable Excel-like filter UI |
| `selectionMode` | `SelectionMode` | `none`, `single`, `singleDeselect`, `multiple` |
| `showCheckboxColumn` | `bool` | Add a built-in checkbox selection column |
| `defaultColumnWidth` | `double` | Default width for columns without an explicit width |
