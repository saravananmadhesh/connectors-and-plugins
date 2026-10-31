# Drill Through in Pivot Table

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

## Enable Drill Through

Enable drill through by setting `allowDrillThrough="true"` on the `ejs-pivotview` element:

```html
<ejs-pivotview id="PivotView" height="300" allowDrillThrough="true" showTooltip="false">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Properties:**
- `allowDrillThrough="true"` - Enables double-click drill through
- `showTooltip="false"` - Optional, disables tooltip display during drill

**User Interaction:**
1. Double-click on any aggregated value cell
2. Drill through window opens with raw data grid
3. Grid shows all records contributing to that cell value
4. Use column chooser to customize visible fields
5. Close window to return to pivot table

## Drill Through Behavior

When users double-click an aggregated cell, a drill-through window displays:

```
Drill Through Window:
┌────────────────────────────────────┐
│ Row Header: USA                     │
│ Column Header: 2020                 │
│ Measure: Sales Sum                  │
├────────────────────────────────────┤
│ [Raw Data Grid]                    │
│ ProductID | Country | Amount | ...  │
│ PRO-0001  | USA     | $5000  | ...  │
│ PRO-0002  | USA     | $2500  | ...  │
│ PRO-0003  | USA     | $7500  | ...  │
│ ...                                │
└────────────────────────────────────┘
```

**Grid Features:**
- Shows complete raw records matching the cell
- Displays all columns from source data
- Can be sorted, filtered, grouped (when enabled)
- Column chooser allows field selection
- Includes export functionality

## Drill Through from Charts

Drill through also works from pivot charts:

```html
<ejs-pivotview id="PivotView" height="600" 
    allowDrillThrough="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-displayOption view="Both"></e-displayOption>
</ejs-pivotview>
```

**Chart Drill Through:**
- Click on any data point in pivot chart
- Same drill through window displays raw data
- Grid customization applies to chart drill through
- Works for all chart types (Column, Bar, Line, etc.)

## Maximum Rows

Control maximum rows returned in drill through (especially for OLAP):

```html
<ejs-pivotview id="PivotView" height="300" 
    allowDrillThrough="true"
    maxRowsInDrillThrough="50000">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Properties:**
- `maxRowsInDrillThrough="10000"` (default) - Maximum rows to retrieve
- Applies only to OLAP data sources
- Relational data returns all records regardless

**Performance Considerations:**
- Default: 10,000 rows limit
- Increase with caution to avoid performance impact
- Monitor memory usage with large row counts
- Consider network bandwidth for large datasets
- Balance between detail level and performance

## Raw Data Grid Customization

### Event-Based Grid Enhancement

Customize the drill through grid using the `drillThrough` event:

```html
<ejs-pivotview id="PivotView" height="300" 
    allowDrillThrough="true"
    drillThrough="onDrillThrough">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    function onDrillThrough(args) {
        // args.columnHeaders - Column header values of clicked cell
        // args.rowHeaders - Row header values of clicked cell
        // args.value - Aggregated value of the clicked cell
        // args.rawData - Array of raw records
        // args.gridColumns - Columns to display in grid
        // args.currentCell - Cell object details
        // args.cancel - Set true to prevent dialog
        
        console.log('Drill through: ' + args.rowHeaders + ', ' + args.columnHeaders);
        
        // Customize grid columns
        args.gridColumns = [
            { field: 'ProductID', headerText: 'Product' },
            { field: 'Country', headerText: 'Country' },
            { field: 'Amount', headerText: 'Amount', format: 'C2' },
            { field: 'Year', headerText: 'Year' }
        ];
    }
</script>
```

**Event Parameters:**
- `columnHeaders` - Column header value(s) of clicked cell
- `rowHeaders` - Row header value(s) of clicked cell
- `value` - Aggregated value of the clicked cell
- `rawData` - Array of raw records contributing to cell
- `gridColumns` - Array of columns to display in grid
- `currentCell` - Cell details object
- `currentTarget` - HTML element of clicked cell
- `cancel` - Set to true to prevent dialog opening

### Customize Grid Columns

Modify grid columns to show specific fields:

```html
<script>
    function onDrillThrough(args) {
        // Show only selected columns
        args.gridColumns = [
            { field: 'ProductID', headerText: 'Product ID', width: '100' },
            { field: 'ProductName', headerText: 'Product', width: '150' },
            { field: 'Amount', headerText: 'Sales Amount', format: 'C2', width: '120' },
            { field: 'Country', headerText: 'Country', width: '100' },
            { field: 'Year', headerText: 'Year', width: '80' }
        ];
    }
</script>
```

## Events

### DrillThrough Event

Triggered immediately after double-click on value cell, before grid loads:

```html
<ejs-pivotview id="PivotView" height="300" 
    allowDrillThrough="true"
    drillThrough="onDrillThrough">
    <!-- Configuration -->
</ejs-pivotview>

<script>
    function onDrillThrough(args) {
        // Customize columns
        args.gridColumns = [
            { field: 'ProductID', headerText: 'Product' },
            { field: 'Amount', headerText: 'Amount', format: 'C2' }
        ];
        
        // Prevent drill through for specific conditions
        if (args.value < 1000) {
            args.cancel = true;  // Don't show drill through for small values
        }
    }
</script>
```

**Use Cases:**
- Filter/customize visible columns before display
- Validate cell meets criteria before showing drill through
- Apply conditional formatting to drill through data
- Prevent drill through for certain cells/values

## Best Practices

✓ **Enable for Analysis:** Always enable drill through for financial/operational data
```html
<ejs-pivotview id="PivotView" allowDrillThrough="true">
```

✓ **Limit Row Display:** Set reasonable `maxRowsInDrillThrough` for large datasets
```html
<ejs-pivotview id="PivotView" maxRowsInDrillThrough="50000">
```

✓ **Customize Grid Columns:** Use `drillThrough` event to show only relevant fields
```javascript
function onDrillThrough(args) {
    args.gridColumns = [/* selected columns only */];
}
```

✓ **Format Currency Values:** Apply formatting to monetary drill through data
```html
<e-formatsettings>
    <e-field name="Amount" format="C2"></e-field>
</e-formatsettings>
```

❌ **Avoid:** Enabling drill through on calculated/computed fields
❌ **Avoid:** Very large `maxRowsInDrillThrough` (causes memory issues)
❌ **Avoid:** Not customizing grid columns (shows all fields, confusing)

## Important Notes

- Drill through requires **double-click** (not single click) on aggregated cells
- Data loads in **new popup window**, original pivot remains visible
- OLAP data limited by **maxRowsInDrillThrough** property (default 10,000)
- **Relational data** returns all records matching drill-through criteria
- Works with **all data sources**: JSON, CSV, SQL Server, OLAP, etc.
- Raw data structure must be **properly configured** in data source
- Column customization uses **drillThrough event** for dynamic adjustment
- Grid features (sorting, filtering) work **out-of-the-box** in drill-through window
