# Sorting — Flutter DataGrid

## Overview

`SfDataGrid` supports interactive and programmatic sorting. Enable sorting with `allowSorting = true`. Multi-column sorting, tri-state sorting, custom sort icons, and custom sort logic are all supported.

---

## Enable Sorting

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  columns: columns,
)
```

Tapping a column header sorts ascending → descending (→ unsorted if tri-state enabled).

---

## Programmatic Sorting

Add `SortColumnDetails` to `DataGridSource.sortedColumns` and call `sort()`:

```dart
_employeeDataSource.sortedColumns.add(SortColumnDetails(
    name: 'name',
    sortDirection: DataGridSortDirection.ascending));
_employeeDataSource.sort();
```

---

## Multi-Column Sorting

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  allowMultiColumnSorting: true,
  columns: columns,
)
```

On web/desktop, click column headers while holding **Ctrl** to add additional sort columns.

---

## Tri-State Sorting

Adds a third "unsorted" state after descending:

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  allowMultiColumnSorting: true,
  allowTriStateSorting: true,
  columns: columns,
)
```

---

## Sort on Double Tap

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  sortingGestureType: SortingGestureType.doubleTap,
  columns: columns,
)
```

Default is `SortingGestureType.tap`.

---

## Sorting Callbacks

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  onColumnSortChanging: (SortColumnDetails? newSortedColumn, SortColumnDetails? oldSortedColumn) {
    // return false to cancel sort
    return true;
  },
  onColumnSortChanged: (SortColumnDetails? newSortedColumn, SortColumnDetails? oldSortedColumn) {
    // post-sort notification
  },
  columns: columns,
)
```

Both callbacks provide:
- `newSortedColumn`: `SortColumnDetails` being applied
- `oldSortedColumn`: `SortColumnDetails` being removed

---

## Show Sort Order Numbers

Show sequence numbers on multi-column sort indicators:

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  allowMultiColumnSorting: true,
  showSortNumbers: true,
  columns: columns,
)
```

Customize number appearance:

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
      sortOrderNumberBackgroundColor: Colors.tealAccent,
      sortOrderNumberColor: Colors.pink),
  child: SfDataGrid(
      source: _employeeDataSource,
      allowSorting: true,
      allowMultiColumnSorting: true,
      showSortNumbers: true,
      columns: columns),
)
```

---

## Disable Sorting Per Column

```dart
GridColumn(
    columnName: 'name',
    allowSorting: false,   // default is true
    label: ...)
```

---

## Sort Icon Customization

Change icon color:

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(sortIconColor: Colors.redAccent),
  child: SfDataGrid(source: _employeeDataSource, allowSorting: true, columns: columns),
)
```

Change icon position:

```dart
GridColumn(
    sortIconPosition: ColumnHeaderIconPosition.start,
    columnName: 'id',
    label: ...)
```

Custom icon using `Builder` (handles all 3 sort states):

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    sortIcon: Builder(
      builder: (context) {
        Widget? icon;
        String columnName = '';
        context.visitAncestorElements((element) {
          if (element is GridHeaderCellElement) {
            columnName = element.column.columnName;
          }
          return true;
        });
        var column = _employeeDataSource.sortedColumns
            .where((element) => element.name == columnName)
            .firstOrNull;
        if (column != null) {
          if (column.sortDirection == DataGridSortDirection.ascending) {
            icon = const Icon(Icons.arrow_circle_up_rounded, size: 16);
          } else if (column.sortDirection == DataGridSortDirection.descending) {
            icon = const Icon(Icons.arrow_circle_down_rounded, size: 16);
          }
        }
        return icon ?? const Icon(Icons.sort_outlined, size: 16);
      },
    ),
  ),
  child: SfDataGrid(source: _employeeDataSource, allowSorting: true, columns: columns),
)
```

---

## Custom Sorting Logic

### Sort by String Length

```dart
@override
int compare(DataGridRow? a, DataGridRow? b, SortColumnDetails sortColumn) {
  final String? value1 = a
      ?.getCells()
      .firstWhereOrNull((element) => element.columnName == sortColumn.name)
      ?.value;
  final String? value2 = b
      ?.getCells()
      .firstWhereOrNull((element) => element.columnName == sortColumn.name)
      ?.value;

  int? aLength = value1?.length;
  int? bLength = value2?.length;

  if (aLength == null || bLength == null) return 0;

  if (aLength.compareTo(bLength) > 0) {
    return sortColumn.sortDirection == DataGridSortDirection.ascending ? 1 : -1;
  } else if (aLength.compareTo(bLength) == -1) {
    return sortColumn.sortDirection == DataGridSortDirection.ascending ? -1 : 1;
  } else {
    return 0;
  }
}
```

### Case-Insensitive Sorting

```dart
@override
int compare(DataGridRow? a, DataGridRow? b, SortColumnDetails sortColumn) {
  if (sortColumn.name == 'name') {
    final String? value1 = a?.getCells()
        .firstWhereOrNull((e) => e.columnName == sortColumn.name)?.value.toString();
    final String? value2 = b?.getCells()
        .firstWhereOrNull((e) => e.columnName == sortColumn.name)?.value.toString();

    if (value1 == null || value2 == null) return 0;

    if (sortColumn.sortDirection == DataGridSortDirection.ascending) {
      return value1.toLowerCase().compareTo(value2.toLowerCase());
    } else {
      return value2.toLowerCase().compareTo(value1.toLowerCase());
    }
  }
  return super.compare(a, b, sortColumn);
}
```

---

## Async Sorting

Override `performSorting` in `DataGridSource` for async sort (e.g., server-side):

```dart
@override
Future<void> performSorting(List<DataGridRow> rows) async {
  if (sortedColumns.isEmpty) return;
  // show loading indicator
  await Future<void>.delayed(const Duration(seconds: 2));
  // update rows and call notifyListeners()
}
```

---

## Key Property Reference

### SfDataGrid Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowSorting` | `bool` | `false` | Enable column header tap-to-sort |
| `allowMultiColumnSorting` | `bool` | `false` | Allow sorting by multiple columns |
| `allowTriStateSorting` | `bool` | `false` | Add unsorted state after descending |
| `sortingGestureType` | `SortingGestureType` | `tap` | `tap` or `doubleTap` |
| `showSortNumbers` | `bool` | `false` | Show sort order numbers (requires `allowMultiColumnSorting`) |
| `onColumnSortChanging` | `bool? Function(SortColumnDetails?, SortColumnDetails?)?` | `null` | Pre-sort callback; return false to cancel |
| `onColumnSortChanged` | `void Function(SortColumnDetails?, SortColumnDetails?)?` | `null` | Post-sort callback |

### GridColumn Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowSorting` | `bool` | `true` | Enable/disable sorting for this column |
| `sortIconPosition` | `ColumnHeaderIconPosition` | `end` | `start` or `end` |

### DataGridSource Methods

| Method | Description |
|---|---|
| `sortedColumns` | List of active `SortColumnDetails`; modify programmatically |
| `sort()` | Apply sorting after updating `sortedColumns` |
| `compare(a, b, sortColumn)` | Override for custom sort comparison |
| `performSorting(rows)` | Override for full custom/async sort control |

---

## TOC

- [Enable Sorting](#enable-sorting)
- [Programmatic Sorting](#programmatic-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Tri-State Sorting](#tri-state-sorting)
- [Sort on Double Tap](#sort-on-double-tap)
- [Sorting Callbacks](#sorting-callbacks)
- [Show Sort Order Numbers](#show-sort-order-numbers)
- [Disable Sorting Per Column](#disable-sorting-per-column)
- [Sort Icon Customization](#sort-icon-customization)
- [Custom Sorting Logic](#custom-sorting-logic)
- [Async Sorting](#async-sorting)
