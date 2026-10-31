---
name: syncfusion-flutter-datagrid
description: Implements Syncfusion Flutter DataGrid (SfDataGrid) for displaying and manipulating tabular data in Flutter applications. Use when working with data grids, data tables, or column-based data presentation using the syncfusion_flutter_datagrid package. This skill covers DataGridSource, GridColumn configuration, sorting, filtering, paging, editing, and selection.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Syncfusion Flutter DataGrid

A comprehensive skill for implementing and customizing the Syncfusion Flutter DataGrid (SfDataGrid) control. The DataGrid displays and manipulates data in a tabular format with support for columns, editing, sorting, filtering, grouping, summaries, paging, and export features.

## When to Use This Skill

Use this skill when you need to:
- Display tabular data in a Flutter application
- Bind data sources (List, ObservableList) to a grid
- Configure columns (auto-generated or manual)
- Implement cell editing and styling
- Add sorting, filtering, or searching functionality
- Group data and display summaries/aggregates
- Implement paging or incremental loading
- Enable row operations (drag-drop, swipe, add/delete)
- Export grid data to Excel or PDF
- Customize grid appearance and behavior
- Optimize performance for large datasets
- Handle keyboard navigation and accessibility

## Component Overview

The Syncfusion Flutter DataGrid (SfDataGrid) is a high-performance data grid control for displaying and manipulating tabular data in Flutter applications. It supports comprehensive data management features including sorting, filtering, grouping, and summarization. The grid is highly customizable and optimized for both small and large datasets with efficient virtualization and paging support.

**SfDataGrid excels at:**
- Displaying structured data in rows and columns
- Interactive data exploration with sorting and filtering
- Complex data analysis with grouping and summaries
- Large dataset handling with virtualization and paging
- Data entry and validation with in-cell editing
- Data export to Excel and PDF formats
- Building responsive data-driven dashboards and reports

## Key Capabilities

- **Data Binding Options:** Support for List and ObservableList data sources
- **Flexible Column Configuration:** Manual column definition support
- **In-Cell Editing:** Edit cell content with validation and custom editors
- **Advanced Sorting:** Single and multi-column sorting with custom logic
- **Powerful Filtering:** Built-in and custom filtering predicates
- **Data Grouping:** Group data by one or more columns with expand/collapse
- **Aggregate Summaries:** Group and caption summaries with built-in functions
- **Selection Modes:** Single, multiple, or no selection with event fallbacks
- **Paging & Virtualization:** Efficient handling of large datasets with data virtualization
- **Export Capabilities:** Export to Excel (.xlsx) and PDF formats with customization
- **Row Operations:** Swipe actions, drag-drop, and dynamic row height
- **Freezing Support:** Freeze columns and rows for better navigation
- **Comprehensive Styling:** Cell, row, header styling with conditional formatting
- **Accessibility:** Keyboard navigation and screen reader support

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and pub package setup
- Adding dependency to pubspec.yaml
- Importing the datagrid package
- Creating your first datagrid
- Minimal working sample

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Basic DataGrid implementation
- Creating data models and DataGridSource
- Binding with List and ObservableList

### Column Types
📄 **Read:** [references/column-types.md](references/column-types.md)
- Manually defining columns
- Column properties (columnName, label, width)
- Column sizing and width options
- Column visibility and ordering
- Checkbox column and customization
- Header icon visiblity

### Column Sizing
📄 **Read:** [references/column-sizing.md](references/column-sizing.md)
- Column width configuration modes
- Auto-fit and fill modes
- Manual column resizing
- Width calculation strategies
- Dynamic width adjustment

### Column Resizing
📄 **Read:** [references/column-resizing.md](references/column-resizing.md)
- Enable/disable column resizing
- Resize interaction and UX
- Programmatic resizing
- Resize events and callbacks
- Auto-fit column width

### Column Drag and Drop
📄 **Read:** [references/column-drag-and-drop.md](references/column-drag-and-drop.md)
- Enable column reordering via drag-drop
- Column reorder events
- Programmatic column reordering
- Drag-drop constraints and behavior

### Stacked Headers
📄 **Read:** [references/stacked-headers.md](references/stacked-headers.md)
- Multi-level column headers
- Stacked header configuration
- Spanning columns across headers
- Header customization and styling

### Freeze Panes
📄 **Read:** [references/freeze-panes.md](references/freeze-panes.md)
- Frozen columns (left side)
- Frozen rows (top side)
- Freeze pane configuration
- Scrolling with frozen panes

### Scrolling
📄 **Read:** [references/scrolling.md](references/scrolling.md)
- Horizontal and vertical scrolling
- Scroll behavior customization
- Programmatic scrolling
- Scroll events and callbacks
- Virtual scrolling performance

### Editing
📄 **Read:** [references/editing.md](references/editing.md)
- Enabling editing
- Column-level editing control
- Edit triggers and modes
- Cell editing events (onBeginEdit, onEndEdit)
- Programmatic editing
- Enter arrow and Tab key navigation during editing

### Sorting
📄 **Read:** [references/sorting.md](references/sorting.md)
- Single and multi-column sorting
- Custom sorting logic
- Programmatic sorting
- Sort icons and UI customization
- Sort order behavior

### Filtering
📄 **Read:** [references/filtering.md](references/filtering.md)
- Filtering functionality basics
- Filter types and predicates
- Programmatic filtering
- Custom filter logic
- Filter UI customization

### Selection
📄 **Read:** [references/selection.md](references/selection.md)
- Selection modes (Single, Multiple, None)
- Selection events (onSelectionChanging, onSelectionChanged)
- Programmatic selection
- Current cell vs selected rows

### Grouping
📄 **Read:** [references/grouping.md](references/grouping.md)
- Data grouping (single and multi-column)
- Group expand/collapse behavior
- Custom grouping logic
- Group header customization

### Summaries
📄 **Read:** [references/summaries.md](references/summaries.md)
- Summary rows (Group and Caption summaries)
- Built-in aggregate functions (Sum, Average, Count, Min, Max)
- Custom summary calculations
- Summary display formatting
- Summary footer configuration

### Paging
📄 **Read:** [references/paging.md](references/paging.md)
- Paging setup and configuration
- Page size and page navigation
- Custom paging UI
- Programmatic page navigation
- Page change events

### Load More
📄 **Read:** [references/load-more.md](references/load-more.md)
- Incremental loading setup
- Load More row handling
- Load More triggers and events
- Programmatic load more control
- Large dataset pagination strategies

### Pull to Refresh
📄 **Read:** [references/pull-to-refresh.md](references/pull-to-refresh.md)
- Pull to refresh gestures
- Refresh event handling
- Custom refresh UI
- Loading state management
- Data refresh patterns

### Row Height Customization
📄 **Read:** [references/row-height-customization.md](references/row-height-customization.md)
- Row height configuration
- Auto row height based on content
- QueryRowHeight event usage
- Dynamic row height adjustment
- Header row height customization

### Swiping
📄 **Read:** [references/swiping.md](references/swiping.md)
- Row swiping gestures
- Swipe actions and commands
- Swipe event handling
- Custom swipe action UI
- Swipe extent configuration

### Styles
📄 **Read:** [references/styles.md](references/styles.md)
- Grid styling basics
- Cell styling (DataGridCellStyle)
- Conditional cell styling
- Row styling and alternating row colors
- Header styling
- Theme customization

### Conditional Styling
📄 **Read:** [references/conditional-styling.md](references/conditional-styling.md)
- Apply styles based on cell/row data
- Dynamic styling logic
- Style builders and callbacks
- Performance optimization for conditional styles

### Placeholder
📄 **Read:** [references/placeholder.md](references/placeholder.md)
- Empty DataGrid view
- Custom placeholder widgets
- Loading state display
- No data message customization

### Export to Excel
📄 **Read:** [references/export-to-excel.md](references/export-to-excel.md)
- Export DataGrid to Excel
- Excel export customization (columns, rows, styling)
- Excel export options and events
- File save and sharing

### Export to PDF
📄 **Read:** [references/export-to-pdf.md](references/export-to-pdf.md)
- Export DataGrid to PDF
- PDF export customization
- Page orientation and sizing
- PDF export events
- File save and sharing

### Footer
📄 **Read:** [references/footer.md](references/footer.md)
- Footer row configuration
- Summary display in footer
- Custom footer content
- Footer styling

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Keyboard navigation
- Screen reader support
- Accessibility best practices

### Localization
📄 **Read:** [references/localization.md](references/localization.md)
- Localization setup
- Multi-language support

### Right-to-Left
📄 **Read:** [references/right-to-left.md](references/right-to-left.md)
- RTL (Right-to-Left) support
- Text direction customization

## Quick Start Example

### Step 1: Add Package

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_datagrid
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Step 2: Create Data Model

```dart
class OrderInfo {
  int orderId;
  String customerId;
  String shipCountry;
  double freight;
  DateTime orderDate;

  OrderInfo({
    required this.orderId,
    required this.customerId,
    required this.shipCountry,
    required this.freight,
    required this.orderDate,
  });
}
```

### Step 3: Create DataGridSource

```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class OrderDataSource extends DataGridSource {
  late List<OrderInfo> _orders;

  OrderDataSource(List<OrderInfo> orders) {
    _orders = orders;
    buildDataGridRows();
  }

  List<DataGridRow> dataGridRows = [];

  @override
  List<DataGridRow> get rows => dataGridRows;

  void buildDataGridRows() {
    dataGridRows = _orders
        .map<DataGridRow>((order) => DataGridRow(cells: [
              DataGridCell<int>(columnName: 'orderId', value: order.orderId),
              DataGridCell<String>(columnName: 'customerId', value: order.customerId),
              DataGridCell<String>(columnName: 'shipCountry', value: order.shipCountry),
              DataGridCell<double>(columnName: 'freight', value: order.freight),
              DataGridCell<DateTime>(columnName: 'orderDate', value: order.orderDate),
            ]))
        .toList();
  }

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    return DataGridRowAdapter(cells: [
      Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[0].value.toString()),
      ),
      Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[1].value.toString()),
      ),
      Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[2].value.toString()),
      ),
      Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.all(8.0),
        child: Text('\$${row.getCells()[3].value.toStringAsFixed(2)}'),
      ),
      Container(
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[4].value.toString().split(' ')[0]),
      ),
    ]);
  }
}
```

### Step 4: Add DataGrid to View

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class DataGridPage extends StatefulWidget {
  const DataGridPage({Key? key}) : super(key: key);

  @override
  State<DataGridPage> createState() => _DataGridPageState();
}

class _DataGridPageState extends State<DataGridPage> {
  late List<OrderInfo> _orders;
  late OrderDataSource _orderDataSource;

  @override
  void initState() {
    super.initState();
    _orders = getOrders();
    _orderDataSource = OrderDataSource(_orders);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('DataGrid'),
      ),
      body: SfDataGrid(
        source: _orderDataSource,
        columns: [
          GridColumn(
            columnName: 'orderId',
            label: Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.centerRight,
              child: const Text('Order ID'),
            ),
          ),
          GridColumn(
            columnName: 'customerId',
            label: Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.centerLeft,
              child: const Text('Customer Name'),
            ),
          ),
          GridColumn(
            columnName: 'shipCountry',
            label: Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.centerLeft,
              child: const Text('Ship Country'),
            ),
          ),
          GridColumn(
            columnName: 'freight',
            label: Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.centerRight,
              child: const Text('Freight'),
            ),
          ),
          GridColumn(
            columnName: 'orderDate',
            label: Container(
              padding: const EdgeInsets.all(16.0),
              alignment: Alignment.centerLeft,
              child: const Text('Order Date'),
            ),
          ),
        ],
      ),
    );
  }

  List<OrderInfo> getOrders() {
    return [
      OrderInfo(
        orderId: 1001,
        customerId: 'ALFKI',
        shipCountry: 'Germany',
        freight: 32.38,
        orderDate: DateTime(2024, 01, 15),
      ),
      OrderInfo(
        orderId: 1002,
        customerId: 'FRANS',
        shipCountry: 'Mexico',
        freight: 11.61,
        orderDate: DateTime(2024, 01, 14),
      ),
      OrderInfo(
        orderId: 1003,
        customerId: 'MEREP',
        shipCountry: 'Canada',
        freight: 45.34,
        orderDate: DateTime(2024, 01, 13),
      ),
    ];
  }
}
```

## Key Properties and Configuration

| Property | Type | Description |
|----------|------|-------------|
| `source` | DataGridSource | Data source for the grid (required) |
| `columns` | List<GridColumn> | Column definitions (required) |
| `rowHeight` | double | Default row height |
| `headerRowHeight` | double | Height of header row |
| `allowSorting` | bool | Enable sorting |
| `allowMultiColumnSorting` | bool | Enable multi-column sorting |
| `allowFiltering` | bool | Enable filtering |
| `allowEditing` | bool | Enable cell editing |
| `navigationMode` | GridNavigationMode | Row or Cell navigation |
| `selectionMode` | SelectionMode | None, Single, or Multiple |
| `frozenColumnsCount` | int | Number of frozen columns from left |
| `frozenRowsCount` | int | Number of frozen rows from top |
| `columnWidthMode` | ColumnWidthMode | Auto, Fill, None |

## Common Patterns

### Pattern 1: Sorting with Multi-Column Support

Enable single and multi-column sorting with visual indicators:

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowSorting: true,
  allowMultiColumnSorting: true,
  allowTriStateSorting: true,
  showSortNumbers: true,
  columns: _columns,
)
```

Add programmatic sorting:

```dart
_employeeDataSource.sortedColumns.add(
  SortColumnDetails(
    name: 'name',
    sortDirection: DataGridSortDirection.ascending,
  ),
);
_employeeDataSource.sort();
```

### Pattern 2: Filtering with Programmatic and UI Support

Enable both programmatic and UI-based filtering:

```dart
SfDataGrid(
  source: _employeeDataSource,
  allowFiltering: true,
  columns: _columns,
  onFilterChanging: (DataGridFilterChangeDetails details) {
    // Optional: validate before applying filter
    return true;
  },
  onFilterChanged: (DataGridFilterChangeDetails details) {
    // Optional: handle post-filter notification
    print('Filtered column: ${details.column.columnName}');
  },
)
```

Add programmatic filters:

```dart
// Add single condition
_employeeDataSource.addFilter(
  'salary',
  FilterCondition(
    type: FilterType.greaterThanOrEqual,
    value: 50000,
  ),
);

// Add multiple conditions (AND operator)
_employeeDataSource.addFilter(
  'salary',
  FilterCondition(
    value: 100000,
    type: FilterType.lessThanOrEqual,
    filterOperator: FilterOperator.and,
  ),
);

// Clear filters
_employeeDataSource.clearFilters('salary');
```

### Pattern 3: Grouping with Custom Captions and Expand/Collapse

Implement hierarchical data grouping with expand/collapse functionality:

```dart
// In initState
_employeeDataSource.addColumnGroup(
  ColumnGroup(name: 'city', sortGroupRows: true),
);

// In widget build
SfDataGrid(
  source: _employeeDataSource,
  controller: _dataGridController,
  allowExpandCollapseGroup: true,
  autoExpandGroups: false,
  groupCaptionTitleFormat: '{ColumnName}: {Key} ({ItemsCount} records)',
  groupExpanded: (DataGridGroupChangedDetails group) {
    print('Group expanded: ${group.key}');
  },
  groupCollapsed: (DataGridGroupChangedDetails group) {
    print('Group collapsed: ${group.key}');
  },
  columns: _columns,
)
```

Programmatic expand/collapse:

```dart
// Expand all groups
_dataGridController.expandAllGroup();

// Collapse groups at specific level
_dataGridController.collapseGroupsAtLevel(1);
```

## Common Use Cases

| Use Case | Key Features | Reference Files |
|----------|--------------|-----------------|
| Basic data display | Data binding, columns | getting-started.md, column-types.md |
| Editable grid | Cell editing, validation | editing.md, data-binding.md |
| Sortable/filterable table | Sorting, filtering | sorting.md, filtering.md |
| Grouped data with totals | Grouping, summaries | grouping.md, summaries.md |
| Large dataset | Paging, Load More | paging.md, load-more.md |
| Data export | Excel/PDF export | export-to-excel.md, export-to-pdf.md |
| Responsive layout | Column sizing, scrolling | column-sizing.md, scrolling.md |
| Custom cell layouts | Templates, styling | styles.md, conditional-styling.md |

## Troubleshooting

**DataGrid not showing data:**
- Verify `source` is set with a valid DataGridSource
- Check that `columns` are defined
- Ensure `buildDataGridRows()` is called in DataGridSource constructor
- Verify data model is not empty

**Editing not working:**
- Set `allowEditing=true`
- Set `navigationMode` to `GridNavigationMode.cell`
- Set `selectionMode` to Single or Multiple
- Check column's `allowEditing` property

**Sorting not working:**
- Enable `allowSorting=true` on the SfDataGrid
- Verify column header is tappable (check `GridColumn.allowSorting` is not `false`)
- Check that custom `compare()` method is implemented correctly in DataGridSource if using custom sorting
- For async sorting, override `performSorting()` in DataGridSource

**Filtering not working:**
- Enable `allowFiltering=true` on the SfDataGrid
- Verify column header has filter icon visible (check `GridColumn.allowFiltering` is not `false`)
- For programmatic filters, ensure column name in `addFilter()` matches exact `GridColumn.columnName`
- Check `FilterCondition.type` is appropriate for the data type
- Verify `effectiveRows` returns filtered results; use `clearFilters()` to reset all filters

**Grouping not showing:**
- Ensure `addColumnGroup()` is called before building the grid
- Verify `ColumnGroup.name` exactly matches a `GridColumn.columnName`
- Check that grouping column contains non-null values
- Enable `allowExpandCollapseGroup=true` to show expand/collapse UI
- Use `DataGridController` with `expandAllGroup()` to verify grouping is working

**Multi-Column Sorting not working:**
- Set `allowMultiColumnSorting=true` on the SfDataGrid
- For web/desktop: hold Ctrl while clicking column headers to add additional sort columns
- Check `sortedColumns` list to verify multiple sort entries exist
- Call `sort()` after modifying `sortedColumns` programmatically

**Custom Grouping Logic not applied:**
- Override `performGrouping()` in DataGridSource
- Return the custom group key as a String
- Ensure the method returns non-null values for proper grouping

## Next Steps

1. Start with [references/getting-started.md](references/getting-started.md) for basic setup
2. Configure columns using [references/column-types.md](references/column-types.md)
3. Add interactivity with editing, sorting, and filtering
4. Optimize for your data size using paging or virtualization
5. Customize appearance with styling and templates
