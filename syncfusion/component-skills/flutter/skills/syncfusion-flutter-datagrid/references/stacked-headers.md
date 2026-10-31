# Stacked Headers — Flutter DataGrid

## Overview

`SfDataGrid` supports multi-level column headers (stacked headers) via `SfDataGrid.stackedHeaderRows`. Each `StackedHeaderRow` contains `StackedHeaderCell` entries that span multiple columns, creating a hierarchical header structure.

---

## Required Imports

```dart
import 'package:syncfusion_flutter_core/theme.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
```

---

## Basic Stacked Header

Group columns under a single stacked header row:

```dart
SfDataGrid(
  gridLinesVisibility: GridLinesVisibility.both,
  headerGridLinesVisibility: GridLinesVisibility.both,
  source: _productDataSource,
  columns: <GridColumn>[
    GridColumn(
      columnName: 'orderId',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerRight,
        child: Text('ID', overflow: TextOverflow.ellipsis)
      )
    ),
    GridColumn(
      columnName: 'customerName',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerLeft,
        child: Text('Name', overflow: TextOverflow.ellipsis)
      )
    ),
    GridColumn(
      columnName: 'productId',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerRight,
        child: Text('ID', overflow: TextOverflow.ellipsis)
      )
    ),
    GridColumn(
      columnName: 'product',
      label: Container(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        alignment: Alignment.centerLeft,
        child: Text('Product', overflow: TextOverflow.ellipsis)
      )
    ),
  ],
  stackedHeaderRows: <StackedHeaderRow>[
    StackedHeaderRow(cells: [
      StackedHeaderCell(
        columnNames: ['orderId', 'customerName'],
        child: Container(
          color: const Color(0xFFF1F1F1),
          child: Center(child: Text('Customer Details'))
        )
      ),
      StackedHeaderCell(
        columnNames: ['productId', 'product'],
        child: Container(
          color: const Color(0xFFF1F1F1),
          child: Center(child: Text('Product Details'))
        )
      )
    ])
  ]
)
```

---

## Multi-Level Stacked Headers

Add multiple `StackedHeaderRow` entries for a deeper hierarchy (first row = topmost header):

```dart
stackedHeaderRows: <StackedHeaderRow>[
  StackedHeaderRow(cells: [
    StackedHeaderCell(
      columnNames: ['orderId', 'customerName', 'productId', 'product'],
      child: Container(
        color: const Color(0xFFF1F1F1),
        child: Center(child: Text('Order Shipment Details'))
      )
    ),
  ]),
  StackedHeaderRow(cells: [
    StackedHeaderCell(
      columnNames: ['orderId', 'customerName'],
      child: Container(
        color: const Color(0xFFF1F1F1),
        child: Center(child: Text('Customer Details'))
      )
    ),
    StackedHeaderCell(
      columnNames: ['productId', 'product'],
      child: Container(
        color: const Color(0xFFF1F1F1),
        child: Center(child: Text('Product Details'))
      )
    )
  ])
]
```

---

## Changing Stacked Header Row Height

Use `onQueryRowHeight` to set height for stacked header rows. Stacked header rows appear before the column header row (row index 0 = first stacked header, last row = column headers):

```dart
SfDataGrid(
    source: _productDataSource,
    onQueryRowHeight: (RowHeightDetails details) {
      if (details.rowIndex == 0) {
        return 70.0;  // height for first stacked header row
      }
      return details.rowHeight;
    },
    columns: columns,
    stackedHeaderRows: stackedHeaderRows)
```

You can also change the header row height globally using `SfDataGrid.headerRowHeight` (applies to both column header row and stacked header rows).

---

## Key Property Reference

### SfDataGrid Properties

| Property | Type | Description |
|---|---|---|
| `stackedHeaderRows` | `List<StackedHeaderRow>` | Collection of stacked header rows to display above column headers |

### StackedHeaderRow Properties

| Property | Type | Description |
|---|---|---|
| `cells` | `List<StackedHeaderCell>` | Stacked header cells in this row |

### StackedHeaderCell Properties

| Property | Type | Description |
|---|---|---|
| `columnNames` | `List<String>` | Column names this cell spans (must match `GridColumn.columnName`) |
| `child` | `Widget` | Widget to display in the stacked header cell |

---

## Key Notes

- `StackedHeaderCell.columnNames` must exactly match `GridColumn.columnName` values.
- The first `StackedHeaderRow` in the list appears at the top; the column headers appear last.
- Use `gridLinesVisibility` and `headerGridLinesVisibility` together for consistent grid lines across stacked headers.
