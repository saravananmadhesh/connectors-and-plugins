# Drill Through in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Drill Through](#enable-drill-through)
- [Drill Through Behavior](#drill-through-behavior)
- [Drill Through from Charts](#drill-through-from-charts)
- [Maximum Rows](#maximum-rows)
- [Raw Data Grid Customization](#raw-data-grid-customization)
- [Events](#events)
- [Best Practices](#best-practices)

## Overview

Drill-through allows users to view the raw, unaggregated data behind any aggregated cell in the Pivot Table. By double-clicking an aggregated value cell, users can view its underlying raw data in a data grid displayed in a new window. The window shows the row header, column header, and measure name of the clicked cell at the top, with a data grid displaying all contributing raw records.

**Key Features:**
- Double-click aggregated cells to view raw data
- Grid shows all records contributing to cell value
- Includes column chooser to include/exclude fields
- Works with both table and chart views
- Customizable grid with sorting, filtering, grouping
- OLAP support with row limit control

**Requirements:**
- Must inject `DrillThrough` module
- Works with relational and OLAP data
- Requires proper data source configuration

## Enable Drill Through

Enable drill through by setting `AllowDrillThrough(true)`. Inject the `DrillThrough` module in your application:

```html
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDrillThrough(true).Height("450").Width("100%").Render()
```

**Key Property:**
- `AllowDrillThrough(true)` - Enables double-click drill through

**User Interaction:**
1. Double-click on any aggregated value cell
2. Drill through window opens with raw data grid
3. Grid shows all records contributing to that cell value
4. Use column chooser to customize visible fields

## Drill Through Behavior

Drill through displays context and raw data:

```
Drill Through Window:
┌─────────────────────────────────────┐
│ Row Header: USA                      │
│ Column Header: 2020                  │
│ Measure: Sales                       │
├─────────────────────────────────────┤
│ [Raw Data Grid]                     │
│ RowID | Product | Sales | Date ...  │
│ 001   | Widget  | $100  | 1/1/20 │
│ 002   | Gadget  | $200  | 1/2/20 │
│ ...                                │
└─────────────────────────────────────┘
```

**Grid Features:**
- Shows complete raw records
- Can be sorted, filtered, grouped based on configuration
- Column chooser allows field selection
- Respects data permissions

## Drill Through from Charts

Drill through also works from pivot charts:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDrillThrough(true).DisplayOption(new PivotViewDisplayOption { View = View.Both }).Height("600").Width("100%").Render()
```

**Chart Drill Through:**
- Click on any data point in pivot chart
- Drill through window displays raw data
- Same grid customization as table drill through
- Works for all chart types

## Maximum Rows

**OLAP Data Only:** Control maximum rows returned in drill through:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDrillThrough(true).MaxRowsInDrillThrough(50000).Height("450").Width("100%").Render()
```

**Properties:**
- `MaxRowsInDrillThrough("10000")` (default) - Maximum rows to retrieve
- Applies only to OLAP data sources
- Relational data returns all records regardless

**Performance Considerations:**
- Default: 10,000 rows
- Increase with caution to avoid performance impact
- Monitor memory usage with large row counts
- Consider network bandwidth

## Raw Data Grid Customization

### Enable Sorting, Filtering, Grouping

Use the `BeginDrillThrough` event to enable grid features (sorting, filtering, grouping):

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDrillThrough(true).BeginDrillThrough("onBeginDrillThrough").Height("450").Width("100%").Render()

<script>
    function onBeginDrillThrough(args) {
        // args.gridObj - Grid instance in drill through popup
        // args.cellInfo - Details about clicked cell
        
        // Enable sorting
        args.gridObj.allowSorting = true;
        
        // Enable filtering
        args.gridObj.allowFiltering = true;
        
        // Enable grouping
        args.gridObj.allowGrouping = true;
    }
</script>
```

**Note:** Grid features require individual module injections (Grid.Inject(Sort), Grid.Inject(Filter), etc.)

**Available Grid Features:**
- Sorting (click column header)
- Filtering (filter toolbar)
- Grouping (drag column to group area)
- Row selection
- Column menu
- Pagination

### Column Selection

```html
// Grid includes column chooser button
// Users can include/exclude visible fields
// Click column chooser icon to customize
```

## Events

### DrillThrough Event

Triggered immediately after double-click on value cell:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDrillThrough(true).DrillThrough("onDrillThrough").Height("450").Width("100%").Render()

<script>
    function onDrillThrough(args) {
        // args.columnHeaders - Column header of clicked cell
        // args.currentCell - Cell details
        // args.gridColumns - Grid columns to display
        // args.rawData - Raw records for the cell
        // args.rowHeaders - Row header of clicked cell
        // args.value - Cell value
        // args.cancel - Set true to prevent dialog
        
        console.log("Drill through: " + args.rowHeaders + ", " + args.columnHeaders);
        
        // Customize grid columns
        args.gridColumns = [
            { field: 'ProductID', headerText: 'Product' },
            { field: 'Sales', headerText: 'Sales', type: 'number' }
        ];
    }
</script>
```

**Event Parameters:**
- `columnHeaders` - Column header value(s) of the clicked cell
- `currentCell` - Cell details object
- `currentTarget` - HTML element of clicked cell
- `gridColumns` - Array of columns to display in grid
- `rawData` - Raw records array contributing to the cell value
- `rowHeaders` - Row header value(s) of the clicked cell
- `value` - Aggregated value of the clicked cell
- `cancel` - Set true to prevent dialog opening

### BeginDrillThrough Event

Triggered after grid initializes in drill through popup:

```html
@Html.EJS().PivotView("pivotview").AllowDrillThrough(true).BeginDrillThrough("onBeginDrillThrough").Height("450").Width("100%").Render()

<script>
    function onBeginDrillThrough(args) {
        // args.gridObj - Grid instance in popup
        // args.cellInfo - Details about clicked cell
        //   cellInfo.rawData - Raw records
        //   cellInfo.rowHeaders - Row values
        //   cellInfo.columnHeaders - Column values
        //   cellInfo.value - Aggregated value
        
        // Enable grid features
        args.gridObj.allowSorting = true;
        args.gridObj.allowFiltering = true;
        args.gridObj.allowGrouping = true;
    }
</script>
```

**Use Cases for BeginDrillThrough:**
- Enable sorting/filtering/grouping
- Customize grid appearance
- Add event listeners to grid
- Modify grid behavior

**Note:** Grid features require Grid.Inject() for each feature (Sort, Filter, Group, etc.)

## Best Practices

- **Enable Strategically:** Enable drill through for important metrics
- **Performance:** Monitor drill through queries; optimize data source
- **Security:** Implement row-level security for sensitive data
- **Limits:** Set appropriate MaxRowsInDrillThrough for OLAP data
- **Grid Features:** Enable only needed features (sorting, filtering) to reduce complexity
- **Documentation:** Inform users that double-click triggers drill through
- **Column Selection:** Limit visible columns to important fields
- **Testing:** Test with actual data volume before deployment
- **Module:** Ensure DrillThrough module is injected
- **OLAP:** Set reasonable row limits to prevent memory issues
- **Relational:** Relational data returns all records regardless of MaxRows
- **Charts:** Test drill through from both table and chart
