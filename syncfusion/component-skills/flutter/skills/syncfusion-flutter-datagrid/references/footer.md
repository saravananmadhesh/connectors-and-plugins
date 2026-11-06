# Footer Row — Flutter DataGrid

## Overview

`SfDataGrid` supports a custom footer row displayed below the last data row. Any widget can be placed inside the footer using the `footer` property.

---

## Adding a Footer

Use the `SfDataGrid.footer` property to supply a widget:

```dart
SfDataGrid(
  source: _employeeDataSource,
  footer: Container(
    color: Colors.grey[400],
    child: Center(
      child: Text(
        'FOOTER VIEW',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    ),
  ),
  columns: <GridColumn>[
    GridColumn(
      columnName: 'id',
      label: Container(
        padding: EdgeInsets.all(8.0),
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
)
```

---

## Change Footer Row Height

Use `SfDataGrid.footerHeight` to customize the footer row height. Default is `49.0`.

```dart
SfDataGrid(
  source: _employeeDataSource,
  footerHeight: 60.0,
  footer: Container(
    color: Colors.grey[400],
    child: Center(
      child: Text('FOOTER VIEW', style: TextStyle(fontWeight: FontWeight.bold)),
    ),
  ),
  columns: <GridColumn>[/* ... */],
)
```

---

## Keep Footer Always Visible (Sticky Footer)

By default the footer row scrolls with content. To pin it to the bottom of the viewport at all times, set `footerFrozenRowsCount` to `1`:

```dart
SfDataGrid(
  source: _employeeDataSource,
  footerFrozenRowsCount: 1,
  footer: Container(
    color: Colors.grey[400],
    child: Center(
      child: Text('FOOTER VIEW', style: TextStyle(fontWeight: FontWeight.bold)),
    ),
  ),
  columns: <GridColumn>[/* ... */],
)
```

> This uses the same `footerFrozenRowsCount` property as Freeze Panes. See `freeze-panes.md` for more details on frozen rows.

---

## Key Properties Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `footer` | `Widget?` | `null` | Widget shown below the last row |
| `footerHeight` | `double` | `49.0` | Height of the footer row |
| `footerFrozenRowsCount` | `int` | `0` | Set to `1` to pin footer to viewport bottom |

---

## TOC

- [Adding a Footer](#adding-a-footer)
- [Change Footer Row Height](#change-footer-row-height)
- [Keep Footer Always Visible (Sticky Footer)](#keep-footer-always-visible-sticky-footer)
