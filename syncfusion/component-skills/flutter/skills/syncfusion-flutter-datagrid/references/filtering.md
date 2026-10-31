# Filtering — Flutter DataGrid

## Overview

`SfDataGrid` supports both **programmatic filtering** and **UI filtering** (Excel-like). Filtering operates on `DataGridSource.filterConditions`, an unmodifiable map collection keyed by `columnName`.

---

## Programmatic Filtering

Use the following methods on `DataGridSource` to manage filters:

| Method | Description |
|---|---|
| `addFilter(columnName, FilterCondition)` | Add a filter condition to a column |
| `removeFilter(columnName, FilterCondition)` | Remove a specific filter condition |
| `clearFilters([columnName])` | Clear all filters or filters on a specific column |

### Add Filter

```dart
_employeeDataSource.addFilter(
  'ID',
  FilterCondition(type: FilterType.lessThan, value: 1005),
);
```

### Remove Filter

```dart
final FilterCondition? condition = _employeeDataSource
    .filterConditions['Name']!
    .firstWhereOrNull((item) =>
        item.value == 'James' && item.type == FilterType.equals);
if (condition != null) {
  _employeeDataSource.removeFilter('Name', condition);
}
```

### Clear Filters

```dart
// Clear all columns
_employeeDataSource.clearFilters();

// Clear a specific column
_employeeDataSource.clearFilters('ID');
```

### FilterBehavior

Controls how the cell value is compared:

| Value | Description |
|---|---|
| `FilterBehavior.stringDataType` | Converts cell value to string before comparing |
| `FilterBehavior.strongDataType` | Compares using actual data type (default for numeric, String, DateTime, and `Comparable` user types) |

```dart
_employeeDataSource.addFilter(
  'ID',
  FilterCondition(
    value: 1005,
    type: FilterType.contains,
    filterBehavior: FilterBehavior.stringDataType,
  ),
);
```

### FilterOperator — Multiple Conditions (AND / OR)

```dart
_employeeDataSource.addFilter(
  'ID',
  FilterCondition(
    value: 1005,
    filterOperator: FilterOperator.and,
    type: FilterType.greaterThanOrEqual,
  ),
);
_employeeDataSource.addFilter(
  'ID',
  FilterCondition(
    value: 1010,
    filterOperator: FilterOperator.and,
    type: FilterType.lessThanOrEqual,
  ),
);
```

### Filter Rows by Date Range

Use two conditions with `FilterType.greaterThanOrEqual` (start) and `FilterType.lessThanOrEqual` (end) with `FilterOperator.and`:

```dart
_employeeDataSource.addFilter(
  'Date of Joining',
  FilterCondition(
    value: DateTime(2000, 07, 12),
    filterOperator: FilterOperator.and,
    type: FilterType.greaterThanOrEqual,
  ),
);
_employeeDataSource.addFilter(
  'Date of Joining',
  FilterCondition(
    value: DateTime(2022, 03, 24),
    filterOperator: FilterOperator.and,
    type: FilterType.lessThanOrEqual,
  ),
);
```

### Retrieve Filtered Rows

```dart
// effectiveRows holds the currently visible (filtered) rows
final List<DataGridRow> filtered = _employeeDataSource.effectiveRows;
```

---

## UI Filtering

Enable by setting `SfDataGrid.allowFiltering = true`. The filter icon appears in each column header.

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowFiltering: true,
  columns: [/* ... */],
)
```

- **Desktop/Web:** Filter popup menu appears.
- **Mobile:** Opens a new page.

### Filter Modes

| Mode | Description |
|---|---|
| Checkbox Filter | Excel-like checked list with search; checked items remain visible |
| Advanced Filter | Multiple condition UI with Text / Number / Date filter types |

#### Advanced Filter types by column data type

| Filter Type | Triggered When | Menu Options |
|---|---|---|
| Text Filters | String column | Equals, Does Not Equal, Begins/Ends With, Contains, Empty, Null, etc. |
| Number Filters | Numeric column | Equals, Less/Greater Than (or Equal), Null, etc. |
| Date Filters | DateTime column | Equals, Before/After (or Equal), Null, etc. |

Advanced filter also supports **case-sensitive filtering** (string columns only) via an icon in the filter UI.

### Disable Filtering per Column

`GridColumn.allowFiltering` takes priority over `SfDataGrid.allowFiltering`:

```dart
SfDataGrid(
  allowFiltering: true,
  source: _employeeDataSource,
  columns: [
    GridColumn(
      allowFiltering: false,  // disable for this column
      columnName: 'ID',
      label: Container(/* ... */),
    ),
    // other columns...
  ],
)
```

---

## Callbacks

### onFilterChanging — Cancel UI filter before applying

Return `false` to prevent a column from being filtered via UI:

```dart
SfDataGrid(
  allowFiltering: true,
  source: _employeeDataSource,
  onFilterChanging: (DataGridFilterChangeDetails details) {
    if (details.column.columnName == 'Salary') {
      return false; // block filtering on Salary column
    }
    return true;
  },
  columns: [/* ... */],
)
```

### onFilterChanged — Post-filter notification

```dart
SfDataGrid(
  allowFiltering: true,
  source: _employeeDataSource,
  onFilterChanged: (DataGridFilterChangeDetails details) {
    print('Column: ${details.column.columnName}');
    print('Type: ${details.filterConditions.last.type}');
    print('Value: ${details.filterConditions.last.value}');
  },
  columns: [/* ... */],
)
```

---

## Customize Filter Popup Menu Options

### Show only Checkbox or Advanced filter mode

```dart
GridColumn(
  columnName: 'ID',
  filterPopupMenuOptions: FilterPopupMenuOptions(
    filterMode: FilterMode.checkboxFilter,
  ),
  label: Container(/* ... */),
)
```

### Hide sort options in popup

```dart
GridColumn(
  columnName: 'ID',
  filterPopupMenuOptions: FilterPopupMenuOptions(canShowSortingOptions: false),
  label: Container(/* ... */),
)
```

### Hide "Clear Filter" option

```dart
GridColumn(
  columnName: 'ID',
  filterPopupMenuOptions: FilterPopupMenuOptions(canShowClearFilterOption: false),
  label: Container(/* ... */),
)
```

### Hide column name in "Clear Filter From {Column Name}"

```dart
GridColumn(
  columnName: 'ID',
  filterPopupMenuOptions: FilterPopupMenuOptions(showColumnName: false),
  label: Container(/* ... */),
)
```

---

## Filter Icon Customization

### Change filter icon color and hover color

```dart
import 'package:syncfusion_flutter_core/theme.dart';

SfDataGridTheme(
  data: SfDataGridThemeData(
    filterIconColor: Colors.pink,
    filterIconHoverColor: Colors.purple,
  ),
  child: SfDataGrid(allowFiltering: true, /* ... */),
)
```

### Change filter icon padding

```dart
GridColumn(
  columnName: 'ID',
  filterIconPadding: EdgeInsets.fromLTRB(0, 0, 40, 0),
  label: Container(/* ... */),
)
```

### Set custom filter icon (with filtered/unfiltered states)

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    filterIcon: Builder(builder: (context) {
      Widget? icon;
      String columnName = '';
      context.visitAncestorElements((element) {
        if (element is GridHeaderCellElement) {
          columnName = element.column.columnName;
        }
        return true;
      });
      var col = employeeDataSource.filterConditions.keys
          .where((e) => e == columnName)
          .firstOrNull;
      if (col != null) {
        icon = const Icon(Icons.filter_alt_outlined, size: 20, color: Colors.purple);
      }
      return icon ?? const Icon(Icons.filter_alt_off_outlined, size: 20, color: Colors.deepOrange);
    }),
  ),
  child: SfDataGrid(allowFiltering: true, /* ... */),
)
```

### Change filter icon position

```dart
GridColumn(
  columnName: 'id',
  filterIconPosition: ColumnHeaderIconPosition.start,
  label: Container(/* ... */),
)
```

---

## Filter Popup Appearance (Theme)

Wrap `SfDataGrid` in `SfDataGridTheme` to customize popup colors. Key properties:

| Property | Description |
|---|---|
| `filterPopupBackgroundColor` | Background color of the popup |
| `filterPopupCheckboxFillColor` | Checkbox fill color (`WidgetStatePropertyAll` supported) |
| `filterPopupCheckColor` | Checkmark color in filter popup |
| `filterPopupIconColor` | Icon color in filter popup |
| `filterPopupDisabledIconColor` | Disabled icon color in filter popup |
| `filterPopupInputBorderColor` | Input field border color in filter popup |
| `filterPopupTopDividerColor` | Top divider color in filter popup |
| `filterPopupBottomDividerColor` | Bottom divider color in filter popup |
| `filterPopupTextStyle` | Text style for popup menu items |
| `filterPopupDisabledTextStyle` | Text style for disabled menu items |
| `okFilteringLabelButtonColor` / `cancelFilteringLabelButtonColor` | OK / Cancel button colors |
| `okFilteringLabelColor` / `cancelFilteringLabelColor` | OK / Cancel label text colors |
| `searchIconColor` | Search icon color |
| `searchAreaCursorColor` | Cursor color in search area |
| `searchAreaFocusedBorderColor` | Focused border color of search area |
| `closeIconColor` | Close icon color in search field |
| `filterIconColor` / `filterIconHoverColor` | Header filter icon colors |
| `caseSensitiveIconColor` | Case-sensitive icon color |
| `caseSensitiveIconActiveColor` | Case-sensitive icon active color |
| `calendarIconColor` | Calendar icon color |
| `noMatchesFilteringLabelColor` | "No Matches" label color |
| `andRadioActiveColor` / `andRadioFillColor` | AND radio button colors |
| `orRadioActiveColor` / `orRadioFillColor` | OR radio button colors |
| `advancedFilterPopupDropdownColor` | Advanced filter dropdown background color |
| `advancedFilterPopupDropdownIconColor` | Advanced filter dropdown icon color |
| `advancedFilterTypeDropdownIconColor` | Advanced filter type dropdown icon color |
| `advancedFilterValueDropdownIconColor` | Advanced filter value dropdown icon color |
| `advancedFilterTypeDropdownFocusedBorderColor` | Advanced filter type dropdown focused border |
| `advancedFilterValueDropdownFocusedBorderColor` | Advanced filter value dropdown focused border |
| `advancedFilterValueTextAreaCursorColor` | Advanced filter value text area cursor color |
| `appBarBottomBorderColor` | AppBar bottom border color |
| `captionSummaryRowColor` | Caption summary row background color |

```dart
SfDataGridTheme(
  data: SfDataGridThemeData(
    filterPopupCheckboxFillColor: WidgetStatePropertyAll(Colors.green[400]),
    filterPopupDisabledIconColor: Colors.teal[400],
    okFilteringLabelColor: Colors.white,
    okFilteringLabelButtonColor: Colors.indigo[600],
    cancelFilteringLabelColor: Colors.black,
    cancelFilteringLabelButtonColor: Colors.blueGrey[200],
  ),
  child: SfDataGrid(allowFiltering: true, /* ... */),
)
```

---

## Show Filter Icon on Header Hover (Web/Desktop Only)

```dart
SfDataGrid(
  source: employeeDataSource,
  allowFiltering: true,
  showColumnHeaderIconOnHover: true,
  columns: [/* ... */],
)
```

---

## Filter User-Defined Types

Extend your model class with `Comparable` to enable `FilterBehavior.strongDataType` on custom types:

```dart
class Worker extends Comparable<Worker> {
  final int id;
  final String name;
  Worker(this.id, this.name);

  @override
  int compareTo(Worker other) => id.compareTo(other.id);
}
```

Then use it with:
```dart
employeeDataSource.addFilter(
  'worker',
  FilterCondition(
    value: Worker(10001, 'James'),
    filterBehavior: FilterBehavior.strongDataType,
    type: FilterType.equals,
  ),
);
```

---

## TOC

- [Programmatic Filtering](#programmatic-filtering)
- [UI Filtering](#ui-filtering)
- [Callbacks](#callbacks)
- [Customize Filter Popup Menu Options](#customize-filter-popup-menu-options)
- [Filter Icon Customization](#filter-icon-customization)
- [Filter Popup Appearance (Theme)](#filter-popup-appearance-theme)
