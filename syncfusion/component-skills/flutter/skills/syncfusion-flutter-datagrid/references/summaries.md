# Summaries — Flutter DataGrid

## Overview

`SfDataGrid` supports table summary rows via `SfDataGrid.tableSummaryRows`. Summary values are calculated automatically, but you must override `DataGridSource.buildTableSummaryCellWidget` to render the summary widget. Summary rows can appear at the top or bottom of the grid.

---

## Summary in a Row (showSummaryInRow: true)

Display a summary for an entire row using a title string with a `{Name}` placeholder:

```dart
SfDataGrid(
  source: employeeDataSource,
  tableSummaryRows: [
    GridTableSummaryRow(
        showSummaryInRow: true,
        title: 'Total Salary: {Sum} for 20 employees',
        columns: [
          GridSummaryColumn(
              name: 'Sum',
              columnName: 'salary',
              summaryType: GridSummaryType.sum)
        ],
        position: GridTableSummaryRowPosition.bottom)
  ],
  columns: columns,
)
```

Override `buildTableSummaryCellWidget` in `DataGridSource`:

```dart
@override
Widget? buildTableSummaryCellWidget(
    GridTableSummaryRow summaryRow,
    GridSummaryColumn? summaryColumn,
    RowColumnIndex rowColumnIndex,
    String summaryValue) {
  return Container(
    padding: EdgeInsets.all(15.0),
    child: Text(summaryValue),
  );
}
```

---

## Summary in a Column (showSummaryInRow: false)

Display summary values in their respective columns:

```dart
SfDataGrid(
  source: employeeDataSource,
  tableSummaryRows: [
    GridTableSummaryRow(
        showSummaryInRow: false,
        columns: [
          GridSummaryColumn(
              name: 'Sum',
              columnName: 'salary',
              summaryType: GridSummaryType.sum),
        ],
        position: GridTableSummaryRowPosition.bottom)
  ],
  columns: columns,
)
```

---

## Summary with Title + Column Values

Show a title spanning columns alongside individual column summaries. Requires `showSummaryInRow: false` and `titleColumnSpan`:

```dart
GridTableSummaryRow(
    showSummaryInRow: false,
    title: 'Total Employee Count: {Count}',
    titleColumnSpan: 3,
    columns: [
      GridSummaryColumn(
          name: 'Count',
          columnName: 'id',
          summaryType: GridSummaryType.count),
      GridSummaryColumn(
          name: 'Sum',
          columnName: 'salary',
          summaryType: GridSummaryType.sum)
    ],
    position: GridTableSummaryRowPosition.bottom),
```

---

## Positioning Summary Rows

```dart
// Top summary
GridTableSummaryRow(
    showSummaryInRow: false,
    columns: [...],
    position: GridTableSummaryRowPosition.top),

// Bottom summary
GridTableSummaryRow(
    showSummaryInRow: true,
    title: 'Total Salary: {Sum} for 20 employees',
    columns: [...],
    position: GridTableSummaryRowPosition.bottom)
```

---

## Summary Row Background Color

```dart
GridTableSummaryRow(
    color: Colors.indigo,
    showSummaryInRow: true,
    title: 'Minimum Salary: {Minimum} for 20 employees',
    columns: [
      GridSummaryColumn(
          name: 'Minimum',
          columnName: 'salary',
          summaryType: GridSummaryType.minimum)
    ],
    position: GridTableSummaryRowPosition.bottom),
```

---

## Custom Summary Calculation

Override `calculateSummaryValue` to implement custom logic (e.g., standard deviation):

```dart
@override
String calculateSummaryValue(GridTableSummaryRow summaryRow,
    GridSummaryColumn? summaryColumn, RowColumnIndex rowColumnIndex) {
  String? title = summaryRow.title;
  if (title != null) {
    if (summaryRow.showSummaryInRow && summaryRow.columns.isNotEmpty) {
      for (final GridSummaryColumn summaryColumn in summaryRow.columns) {
        if (title!.contains(summaryColumn.name)) {
          double deviation = 0;
          final List<int> values = getCellValues(summaryColumn);
          if (values.isNotEmpty) {
            int sum = values.reduce((value, element) =>
                value + pow(element - values.average, 2).toInt());
            deviation = sqrt((sum) / (values.length - 1));
          }
          title = title.replaceAll(
              '{${summaryColumn.name}}', deviation.toString());
        }
      }
    }
  }
  return title ?? '';
}
```

---

## Summary Calculation Types

| Type | Description |
|---|---|
| `GridSummaryType.sum` | Sum of all values in the column |
| `GridSummaryType.average` | Average of all values in the column |
| `GridSummaryType.count` | Total number of rows |
| `GridSummaryType.maximum` | Maximum value in the column |
| `GridSummaryType.minimum` | Minimum value in the column |

---

## Key Property Reference

### GridTableSummaryRow Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `showSummaryInRow` | `bool` | required | Show summary across full row (`true`) or per-column (`false`) |
| `title` | `String?` | `null` | Title string with `{Name}` placeholder (used when `showSummaryInRow: true` or with `titleColumnSpan`) |
| `titleColumnSpan` | `int` | 0 | How many columns the title should span (requires `showSummaryInRow: false`) |
| `columns` | `List<GridSummaryColumn>` | required | Summary column definitions |
| `position` | `GridTableSummaryRowPosition` | required | `top` or `bottom` |
| `color` | `Color?` | `null` | Background color of the summary row |

### GridSummaryColumn Properties

| Property | Type | Description |
|---|---|---|
| `name` | `String` | Identifier used in `title` placeholder (`{name}`) |
| `columnName` | `String` | Must match a `GridColumn.columnName` |
| `summaryType` | `GridSummaryType` | Calculation type (sum, average, count, maximum, minimum) |

### DataGridSource Methods

| Method | Description |
|---|---|
| `buildTableSummaryCellWidget(summaryRow, summaryColumn, rowColumnIndex, summaryValue)` | Override to return widget displaying the summary value |
| `calculateSummaryValue(summaryRow, summaryColumn, rowColumnIndex)` | Override to implement custom summary calculation logic |

---

## TOC

- [Summary in a Row](#summary-in-a-row-showsummaryinrow-true)
- [Summary in a Column](#summary-in-a-column-showsummaryinrow-false)
- [Summary with Title + Column Values](#summary-with-title--column-values)
- [Positioning Summary Rows](#positioning-summary-rows)
- [Summary Row Background Color](#summary-row-background-color)
- [Custom Summary Calculation](#custom-summary-calculation)
- [Summary Calculation Types](#summary-calculation-types)
- [Key Property Reference](#key-property-reference)
