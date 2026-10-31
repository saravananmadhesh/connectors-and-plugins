# Data Binding in SfDataGrid

## Table of Contents
- [DataGridSource Setup](#datagrid-source-setup)
- [Binding Source to SfDataGrid](#binding-source-to-sfdatagrid)
- [CRUD: Adding Rows](#crud-adding-rows)
- [CRUD: Updating a Specific Cell](#crud-updating-a-specific-cell)
- [Best Practices](#best-practices)

---

## DataGridSource Setup

`SfDataGrid` requires a `DataGridSource` to obtain its row data. Subclass `DataGridSource` and 
implement two mandatory members:

- **`rows`** — Returns `List<DataGridRow>`, the full collection of data rows
- **`buildRow`** — Returns a `DataGridRowAdapter` with the cell widgets for a given row

```dart
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
          alignment: (cell.columnName == 'id' || cell.columnName == 'salary')
              ? Alignment.centerRight
              : Alignment.centerLeft,
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(
            cell.value.toString(),
            overflow: TextOverflow.ellipsis,
          ),
        );
      }).toList(),
    );
  }
}
```

**Key points:**
- `DataGridCell<T>` — typed cell with `columnName` matching the `GridColumn.columnName`
- `DataGridRowAdapter` — wraps the list of cell widgets for a row
- `row.getCells()` — iterates all cells in the row in column order

---

## Binding Source to SfDataGrid

Create your `DataGridSource` in `initState()` (not in `build()`) and pass it to the `source` 
property. The `source` property must not be null.

```dart
class _MyWidgetState extends State<MyWidget> {
  late EmployeeDataSource _employeeDataSource;
  List<Employee> _employees = <Employee>[];

  @override
  void initState() {
    super.initState();
    _employees = getEmployeeData();
    _employeeDataSource = EmployeeDataSource(employees: _employees);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfDataGrid(
        source: _employeeDataSource,
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

---

## CRUD: Adding Rows

When rows are added to or removed from the underlying data, call `notifyListeners()` from inside 
the `DataGridSource`. This triggers a full grid refresh.

> `notifyListeners()` is a protected method — expose it via a public method on your source.

```dart
// In your DataGridSource:
class EmployeeDataSource extends DataGridSource {
  final List<Employee> _employees;

  EmployeeDataSource(this._employees) {
    buildDataGridRows();
  }

  List<DataGridRow> dataGridRows = [];

  void buildDataGridRows() {
    dataGridRows = _employees.map<DataGridRow>((e) => DataGridRow(cells: [
      DataGridCell<int>(columnName: 'id', value: e.id),
      DataGridCell<String>(columnName: 'name', value: e.name),
      DataGridCell<String>(columnName: 'designation', value: e.designation),
      DataGridCell<int>(columnName: 'salary', value: e.salary),
    ])).toList();
  }

  @override
  List<DataGridRow> get rows => dataGridRows;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    return DataGridRowAdapter(
      cells: row.getCells().map<Widget>((cell) => Container(
        alignment: (cell.columnName == 'id' || cell.columnName == 'salary')
            ? Alignment.centerRight : Alignment.centerLeft,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(cell.value.toString(), overflow: TextOverflow.ellipsis),
      )).toList(),
    );
  }

  // Call this after modifying the underlying data list
  void updateDataGridSource() {
    notifyListeners();
  }
}

// In your widget, add a row and refresh:
TextButton(
  child: Text('Add row'),
  onPressed: () {
    _employees.add(Employee(10011, 'Steve', 'Designer', 15000));
    _employeeDataSource.buildDataGridRows();
    _employeeDataSource.updateDataGridSource();
  },
),
```

---

## CRUD: Updating a Specific Cell

When only a single cell's value changes, use `notifyDataSourceListeners(rowColumnIndex:)` instead 
of `notifyListeners()`. This tells the grid to refresh only the affected cell, which is more 
efficient for large grids.

`RowColumnIndex` is zero-based. Column index **0** refers to the first data column (not the 
checkbox column).

```dart
// In your DataGridSource:
void updateDataGridSource({required RowColumnIndex rowColumnIndex}) {
  notifyDataSourceListeners(rowColumnIndex: rowColumnIndex);
}

// In your widget — update salary of first employee (row 0, salary is column index 3):
TextButton(
  child: Text('Update cell value'),
  onPressed: () {
    // 1. Update the underlying data
    _employees[0].salary = 25000;

    // 2. Rebuild the DataGridRow to reflect the new value
    _employeeDataSource.dataGridRows[0] = DataGridRow(cells: [
      DataGridCell(columnName: 'id', value: _employees[0].id),
      DataGridCell(columnName: 'name', value: _employees[0].name),
      DataGridCell(columnName: 'designation', value: _employees[0].designation),
      DataGridCell(columnName: 'salary', value: _employees[0].salary),
    ]);

    // 3. Notify only the changed cell (row 0, column 3)
    _employeeDataSource.updateDataGridSource(
      rowColumnIndex: RowColumnIndex(0, 3),
    );
  },
),
```

---

## Best Practices

| Practice | Why |
|----------|-----|
| Create `DataGridSource` in `initState()`, not `build()` | Prevents unnecessary recreation and improves performance |
| Call `notifyListeners()` only from inside `DataGridSource` | It's a protected method — expose it via a public wrapper |
| Use `notifyDataSourceListeners(rowColumnIndex:)` for single-cell updates | More efficient than full refresh for large datasets |
| Rebuild the affected `DataGridRow` before calling notify | The grid reads from `dataGridRows` directly — stale rows won't reflect updates |
| Keep the underlying data list and `dataGridRows` in sync | Divergence causes inconsistent display and selection behavior |
