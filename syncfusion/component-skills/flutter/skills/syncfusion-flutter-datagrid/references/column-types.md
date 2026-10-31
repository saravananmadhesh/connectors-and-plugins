# Column Types in SfDataGrid

## Table of Contents
- [GridColumn Basics](#gridcolumn-basics)
  - [Mapping Column to a Property](#mapping-column-to-a-property)
  - [Hiding a Column](#hiding-a-column)
  - [Setting Manual Column Width](#setting-manual-column-width)
- [Checkbox Column](#checkbox-column)
  - [Basic Checkbox Column Setup](#basic-checkbox-column-setup)
  - [Show Text in the Header Cell](#show-text-in-the-header-cell)
  - [Disable Checkbox in the Header Cell](#disable-checkbox-in-the-header-cell)
  - [Change Background Color](#change-background-color)
  - [Get Checked Items](#get-checked-items)
  - [Change Checkbox Shape](#change-checkbox-shape)
  - [onCheckboxValueChanged Callback](#oncheckboxvaluechanged-callback)
  - [Checkbox Column Limitations](#checkbox-column-limitations)
- [Column Header Icon on Hover](#column-header-icon-on-hover)

---

## GridColumn Basics

`GridColumn` is the base class for all columns in `SfDataGrid`. It binds to a data field via 
`columnName` and displays any widget as the column header via `label`.

### Mapping Column to a Property

The `columnName` must match the `columnName` used in `DataGridCell` within your `DataGridSource`.

```dart
SfDataGrid(
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
)
```

### Hiding a Column

Set `visible: false` to hide a column. The column remains in the data model but is not rendered.

> **Important:** Always use `visible: false` to hide columns — never set `width: 0`.

```dart
GridColumn(
  columnName: 'designation',
  visible: false,  // column is hidden
  label: Container(
    padding: EdgeInsets.symmetric(horizontal: 16.0),
    alignment: Alignment.centerLeft,
    child: Text('Designation', overflow: TextOverflow.ellipsis),
  ),
),
```

### Setting Manual Column Width

Use the `width` property to set a fixed pixel width for a column. Columns without `width` use the 
`SfDataGrid.defaultColumnWidth` value.

```dart
GridColumn(
  columnName: 'name',
  width: 100.0,
  label: Container(
    padding: EdgeInsets.symmetric(horizontal: 16.0),
    alignment: Alignment.centerLeft,
    child: Text('Name', overflow: TextOverflow.ellipsis),
  ),
),
```

---

## Checkbox Column

The checkbox column provides built-in row selection via checkboxes. It is added automatically as 
the first column when enabled.

### Basic Checkbox Column Setup

Set `showCheckboxColumn: true` and a `selectionMode` other than `none` to enable it.

```dart
SfDataGrid(
  source: _employeeDataSource,
  showCheckboxColumn: true,
  selectionMode: SelectionMode.multiple,
  columns: [
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
)
```

### Show Text in the Header Cell

Display a widget alongside the header checkbox using `checkboxColumnSettings.label`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  showCheckboxColumn: true,
  checkboxColumnSettings: DataGridCheckboxColumnSettings(
    label: Text('Selector'),
    width: 100,
  ),
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

### Disable Checkbox in the Header Cell

Hide the "select all" checkbox in the header by setting `showCheckboxOnHeader: false`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  showCheckboxColumn: true,
  checkboxColumnSettings: DataGridCheckboxColumnSettings(
    showCheckboxOnHeader: false,
  ),
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

### Change Background Color

Customize the checkbox column's background with `backgroundColor`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  showCheckboxColumn: true,
  checkboxColumnSettings: DataGridCheckboxColumnSettings(
    backgroundColor: Colors.yellow,
  ),
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

### Get Checked Items

Checked/selected rows are accessible through `DataGridController`. Since checkbox state mirrors 
row selection, use `selectedRows`, `selectedRow`, and `selectedIndex`:

```dart
final DataGridController _dataGridController = DataGridController();

// In your widget:
TextButton(
  child: Text('Get Checked Items'),
  onPressed: () {
    final selectedIndex = _dataGridController.selectedIndex;
    final selectedRow = _dataGridController.selectedRow;
    final selectedRows = _dataGridController.selectedRows;
    print(selectedRows);
  },
),
SfDataGrid(
  source: _employeeDataSource,
  showCheckboxColumn: true,
  controller: _dataGridController,
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

### Change Checkbox Shape

By default, checkboxes are square. Change the shape using `checkboxShape`:

```dart
SfDataGrid(
  source: employeeDataSource,
  showCheckboxColumn: true,
  checkboxShape: CircleBorder(),
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

### onCheckboxValueChanged Callback

React to checkbox state changes (either by tapping the checkbox or selecting a row):

```dart
SfDataGrid(
  source: employeeDataSource,
  showCheckboxColumn: true,
  onCheckboxValueChanged: (DataGridCheckboxValueChangedDetails details) {
    // details.value     → current checkbox state (bool)
    // details.row       → DataGridRow linked to the checkbox (null for header row)
    // details.rowType   → whether it's a data row or header row
    print('Value: ${details.value}, RowType: ${details.rowType}');
  },
  selectionMode: SelectionMode.multiple,
  columns: [...],
)
```

**Callback argument properties:**

| Property | Description |
|----------|-------------|
| `value` | Current state of the checkbox (`true`/`false`) |
| `row` | The `DataGridRow` linked to the checkbox; `null` if it's the header checkbox |
| `rowType` | Whether the changed checkbox is in a data row or header row |

### Checkbox Column Limitations

- Does **not** support sorting operations
- Does **not** support stacked headers alongside other columns
- Is **excluded** from export operations (Excel/PDF)

---

## Column Header Icon on Hover

Display sort and filter icons on column headers only when the mouse hovers over them. This is 
available on **web and desktop platforms only**.

```dart
SfDataGrid(
  source: employeeDataSource,
  allowSorting: true,
  allowFiltering: true,
  showColumnHeaderIconOnHover: true,
  columnWidthMode: ColumnWidthMode.fill,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.all(16.0),
        alignment: Alignment.centerRight,
        child: Text('ID'),
      ),
    ),
    GridColumn(
      columnName: 'name',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.centerLeft,
        child: Text('Name'),
      ),
    ),
  ],
)
```

> **Platform note:** `showColumnHeaderIconOnHover` has no effect on mobile platforms. Icons are 
> always visible on mobile regardless of this setting.
