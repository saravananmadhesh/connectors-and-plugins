# Grouping — Flutter DataGrid

## Overview

`SfDataGrid` supports grouping rows by one or more column values. Groups can be expanded/collapsed, customized, and managed programmatically. Use `DataGridSource.addColumnGroup` to define grouping columns, and override DataGridSource.buildGroupCaptionCellWidget to render the group caption row.

---

## Basic Grouping

Call `addColumnGroup` in `initState` to group rows by a column:

```dart
@override
void initState() {
  super.initState();
  employeeDataSource = EmployeeDataSource(employeeData: employees);
  employeeDataSource.addColumnGroup(
    ColumnGroup(name: 'City', sortGroupRows: true),
  );
}
```

```dart
SfDataGrid(
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
      columnName: 'city',
      label: Container(
        padding: EdgeInsets.all(8),
        alignment: Alignment.center,
        child: Text('City'),
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
)
```

Override `buildGroupCaptionCellWidget` in `DataGridSource`:

``` dart
@override
Widget? buildGroupCaptionCellWidget(
    RowColumnIndex rowColumnIndex, String summaryValue) {
  return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 15),
      child: Text(summaryValue));
}
```

> **Note:** `ColumnGroup.name` must exactly match the `GridColumn.columnName`.

---

## Multi-Level Grouping

Add multiple `ColumnGroup` entries — the first added becomes the outermost (primary) group:

```dart
employeeDataSource.addColumnGroup(
  ColumnGroup(name: 'City', sortGroupRows: true),
);
employeeDataSource.addColumnGroup(
  ColumnGroup(name: 'Designation', sortGroupRows: true),
);
```

---

## Removing and Clearing Groups

```dart
// Remove a specific group
final group = employeeDataSource.groupedColumns
    .firstWhereOrNull((g) => g.name == 'City');
if (group != null) {
  employeeDataSource.removeColumnGroup(group);
}

// Clear all groups
employeeDataSource.clearColumnGroups();
```

---

## Expand and Collapse

Enable expand/collapse UI with `allowExpandCollapseGroup`:

```dart
SfDataGrid(
  source: employeeDataSource,
  allowExpandCollapseGroup: true,
  autoExpandGroups: false,   // collapse all groups on initial load
  columns: columns,
)
```

| Property | Type | Default | Description |
|---|---|---|---|
| `allowExpandCollapseGroup` | `bool` | `false` | Show expand/collapse icons on group caption rows |
| `autoExpandGroups` | `bool` | `true` | Expand all groups on initial load; set `false` to collapse |

---

## Expand/Collapse Callbacks

```dart
SfDataGrid(
  source: employeeDataSource,
  allowExpandCollapseGroup: true,
  columns: columns,
  groupExpanding: (DataGridGroupChangingDetails group) {
    // return false to cancel expanding
    return true;
  },
  groupExpanded: (DataGridGroupChangedDetails group) {
    print('Group expanded: ${group.key}');
  },
  groupCollapsing: (DataGridGroupChangingDetails group) {
    // return false to cancel collapsing
    return true;
  },
  groupCollapsed: (DataGridGroupChangedDetails group) {
    print('Group collapsed: ${group.key}');
  },
)
```

---

## Programmatic Expand/Collapse

Use `DataGridController` to expand or collapse groups programmatically:

```dart
final DataGridController _dataGridController = DataGridController();

SfDataGrid(
  source: employeeDataSource,
  controller: _dataGridController,
  allowExpandCollapseGroup: true,
  columns: columns,
)

// Expand/collapse all
_dataGridController.expandAllGroup();
_dataGridController.collapseAllGroup();

// Expand/collapse by nesting level (1-based)
_dataGridController.expandGroupsAtLevel(1);
_dataGridController.collapseGroupsAtLevel(2);
```

---

## Custom Group Caption Row

Override `buildGroupCaptionCellWidget` in your `DataGridSource` to return a custom widget for the caption row:

```dart
class EmployeeDataSource extends DataGridSource {
  @override
  Widget? buildGroupCaptionCellWidget(
      RowColumnIndex rowColumnIndex, String summaryValue) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 15),
      child: Text(summaryValue),
    );
  }
}
```

---

## Caption Title Format

Customize the caption display string using `groupCaptionTitleFormat`:

```dart
SfDataGrid(
  source: employeeDataSource,
  groupCaptionTitleFormat: '{ColumnName} : {Key} - {ItemsCount} Items',
  columns: columns,
)
```

Available placeholders:

| Placeholder | Description |
|---|---|
| `{ColumnName}` | The column being grouped |
| `{Key}` | The group key value |
| `{ItemsCount}` | Number of items in the group |

Default format: `'{ColumnName} : {Key} - {ItemsCount} Items'`

---

## Custom Grouping Logic

Override `performGrouping` in `DataGridSource` to define a custom group key:

```dart
class EmployeeDataSource extends DataGridSource {
  @override
  String? performGrouping(String columnName, DataGridRow row) {
    if (columnName == 'salary') {
      final salary = row
          .getCells()
          .firstWhere((cell) => cell.columnName == 'salary')
          .value as int;
      if (salary < 10000) return 'Low';
      if (salary < 20000) return 'Medium';
      return 'High';
    }
    return super.performGrouping(columnName, row);
  }
}
```

---

## Indent Column Customization

The indent column is the left-side column used to show group hierarchy depth. Customize it via `SfDataGridThemeData`:

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    indentColumnWidth: 60.0,      // default: 40.0
    indentColumnColor: Colors.teal,
  ),
  child: SfDataGrid(
    source: employeeDataSource,
    allowExpandCollapseGroup: true,
    columns: columns,
  ),
)
```

---

## Expander Icon Customization

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    groupExpanderIcon: Icon(Icons.arrow_drop_down, color: Colors.blue),
  ),
  child: SfDataGrid(
    source: employeeDataSource,
    allowExpandCollapseGroup: true,
    columns: columns,
  ),
)
```

---

## Key Property Reference

### SfDataGrid Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowExpandCollapseGroup` | `bool` | `false` | Enable expand/collapse UI on group caption rows |
| `autoExpandGroups` | `bool` | `true` | Expand all groups on initial load |
| `groupCaptionTitleFormat` | `String` | `'{ColumnName} : {Key} - {ItemsCount} Items'` | Format string for group caption rows |
| `groupExpanding` | `bool? Function(DataGridGroup)?` | `null` | Callback before expanding; return `false` to cancel |
| `groupExpanded` | `void Function(DataGridGroup)?` | `null` | Callback after expanding |
| `groupCollapsing` | `bool? Function(DataGridGroup)?` | `null` | Callback before collapsing; return `false` to cancel |
| `groupCollapsed` | `void Function(DataGridGroup)?` | `null` | Callback after collapsing |

### DataGridSource Methods

| Method | Description |
|---|---|
| `addColumnGroup(ColumnGroup)` | Add a grouping column |
| `removeColumnGroup(ColumnGroup)` | Remove a specific grouping column |
| `clearColumnGroups()` | Remove all grouping columns |
| `performGrouping(columnName, row)` | Override to return custom group key |
| `buildGroupCaptionCellWidget(rowColumnIndex, summaryValue)` | Override to return custom caption widget |

### DataGridController Methods

| Method | Description |
|---|---|
| `expandAllGroup()` | Expand all groups |
| `collapseAllGroup()` | Collapse all groups |
| `expandGroupsAtLevel(int level)` | Expand groups at a specific nesting level (1-based) |
| `collapseGroupsAtLevel(int level)` | Collapse groups at a specific nesting level (1-based) |

### ColumnGroup Properties

| Property | Type | Description |
|---|---|---|
| `name` | `String` | Column name to group by (must match `GridColumn.columnName`) |
| `sortGroupRows` | `bool` | Whether to sort rows within the group |

---

## Important Notes

- CRUD operations (add/remove rows) reset the expand/collapse state based on the `autoExpandGroups` value.
- Set `SfDataGrid.columns` as an instance variable (not inline) to prevent unnecessary grid refresh when grouping is applied.
- Multi-level grouping: first `addColumnGroup` call = outermost group.

---

## TOC

- [Basic Grouping](#basic-grouping)
- [Multi-Level Grouping](#multi-level-grouping)
- [Removing and Clearing Groups](#removing-and-clearing-groups)
- [Expand and Collapse](#expand-and-collapse)
- [Expand/Collapse Callbacks](#expandcollapse-callbacks)
- [Programmatic Expand/Collapse](#programmatic-expandcollapse)
- [Custom Group Caption Row](#custom-group-caption-row)
- [Caption Title Format](#caption-title-format)
- [Custom Grouping Logic](#custom-grouping-logic)
- [Indent Column Customization](#indent-column-customization)
- [Expander Icon Customization](#expander-icon-customization)
- [Key Property Reference](#key-property-reference)
