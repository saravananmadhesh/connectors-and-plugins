# Placeholder — Flutter DataGrid

## Overview

`SfDataGrid` supports displaying a custom placeholder widget when the data source is empty, via the `SfDataGrid.placeholder` property. By default, nothing is shown when there are no rows.

---

## Basic Usage

Set `SfDataGrid.placeholder` to any widget to show when the data source has no rows:

```dart
SfDataGrid(
  source: employeeDataSource,
  columnWidthMode: ColumnWidthMode.auto,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.all(16.0),
        alignment: Alignment.center,
        child: Text('ID'),
      ),
    ),
    GridColumn(
      columnName: 'name',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Name'),
      ),
    ),
    GridColumn(
      columnName: 'designation',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Designation', overflow: TextOverflow.ellipsis),
      ),
    ),
    GridColumn(
      columnName: 'salary',
      label: Container(
        padding: EdgeInsets.all(8.0),
        alignment: Alignment.center,
        child: Text('Salary'),
      ),
    ),
  ],
  placeholder: Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.thumb_down_alt_outlined, size: 30),
        SizedBox(height: 8),
        Text(
          'No Records Found',
          style: TextStyle(fontSize: 16),
        ),
      ],
    ),
  ),
)
```

---

## Key Points

- The placeholder is rendered in the scroll view area below the column headers.
- The placeholder is only visible when `DataGridSource.rows` is empty.
- Any widget can be used — icons, text, images, custom layouts, etc.
- The placeholder is hidden automatically once rows are populated.

---

## Key Property Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `Widget?` | `null` | Widget displayed when the data source is empty |
