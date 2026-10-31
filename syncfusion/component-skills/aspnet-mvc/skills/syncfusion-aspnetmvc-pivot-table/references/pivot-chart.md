# Pivot Chart in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Pivot Chart](#enable-pivot-chart)
- [Display Options](#display-options)
- [Chart Types](#chart-types)
- [Accumulation Charts](#accumulation-charts)
- [Chart Configuration](#chart-configuration)
- [Drill Down in Charts](#drill-down-in-charts)
- [Data Binding](#data-binding)
- [Series Customization](#series-customization)
- [Best Practices](#best-practices)

## Overview

Pivot Chart helps users visualize aggregated values in a clear and graphical format. It provides essential options like drill down/drill up operations, 21 chart types, 4 accumulation chart types, and various display settings for series, axes, legends, export, and print. The main purpose is to present Pivot Table data in an easy-to-understand and interactive way.

**Key Features:**
- 21 chart types (Line, Column, Area, Bar, Spline, Polar, Radar, etc.)
- 4 accumulation chart types (Pie, Doughnut, Funnel, Pyramid)
- Drill down and drill up on row headers
- Display table only, chart only, or both via `DisplayOption` property
- Full customization of series, axes, legend, tooltips via `ChartSettings`
- Export and print capabilities

**Requirements:**
- Must inject `PivotChartService` module
- Works with both relational and OLAP data
- Supports all data binding methods

**CRITICAL API Pattern:** Use `.DisplayOption(new PivotViewDisplayOption { View = View.Chart })` NOT deprecated `PivotViewDisplayOption` enum values

## Enable Pivot Chart

Enable pivot chart by setting `DisplayOption` property with `PivotViewDisplayOption` object:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

## Display Options

Control visibility and order of table and chart using the `DisplayOption` property with `PivotViewDisplayOption` object:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).DisplayOption(new PivotViewDisplayOption { View = View.Both }).Height("600").Width("100%").Render()
```

**View Options:**
- `View.Grid` - Pivot table only
- `View.Chart` - Pivot chart only
- `View.Both` (default) - Both table and chart

### Primary Component

When displaying both, specify which appears first using the `Primary` property:

```html
.DisplayOption(new PivotViewDisplayOption { 
    View = View.Both,
    Primary = View.Chart  // Chart appears first
})
```

**Primary View Options:**
- `View.Grid` (default) - Table appears first
- `View.Chart` - Chart appears first

## Chart Types

### Line Series (21 Types)

**Basic Line Charts:**
- **Line** - Points connected by lines, ideal for trend analysis
- **StepLine** - Step-like line chart for discrete changes
- **Spline** - Smooth curved lines between points
- **SplineArea** - Spline with area fill

**Stacked Variants:**
- **StackingLine** - Lines stacked vertically
- **StackingLine100** - 100% stacked lines (proportional)

**Column/Bar Charts:**
- **Column** - Vertical bars for category comparison
- **Bar** - Horizontal bars
- **StackingColumn** - Stacked vertical bars
- **StackingColumn100** - 100% stacked columns
- **StackingBar** - Stacked horizontal bars
- **StackingBar100** - 100% stacked bars

**Area Charts:**
- **Area** - Filled area between line and axis
- **StepArea** - Step-like area chart
- **StackingArea** - Stacked areas
- **StackingArea100** - 100% stacked areas

**Advanced Charts:**
- **Scatter** - Scatter plot for correlation
- **Bubble** - Bubble chart with 3 dimensions
- **Pareto** - Combinat column and line for 80/20 analysis
- **Polar** - Polar coordinate system
- **Radar** - Radar/web chart for multi-dimensional comparison

**Default:** Line chart type

### Set Chart Type

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum); })).ChartSettings(cs => cs.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Bar))).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

**Note:** Default chart type is `ChartSeriesType.Line`. Use `ChartSeries` collection to configure series properties.

## Accumulation Charts

Pivot Chart supports 4 accumulation chart types:
- **Pie** - Classic pie chart
- **Doughnut** - Pie with center hole
- **Funnel** - Funnel chart for conversion
- **Pyramid** - Pyramid chart for hierarchies

### Enable Accumulation Chart

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ChartSettings(cs => cs.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Pie))).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

### Drill Down/Up in Accumulation Charts

Accumulation charts support drill down and drill up operations through context menu:

```html
// When clicking on a pie slice, context menu appears:
// 1. Expand - Drill down to view detailed data for next hierarchy level
// 2. Collapse - Drill up to view summarized data at parent level
// 3. Exit - Close context menu without changes
```

**Important:** Row headers only support drill operations in accumulation charts. Column headers cannot be drilled.

### Column Headers and Delimiters

In accumulation charts, only values from a single column display. By default, first column is used. To show values from different column, use `ColumnHeader` property in `ChartSettings` with `ColumnDelimiter`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ChartSettings(chartSettings => chartSettings.ChartSeries(chartSeries =>
        {
            chartSeries.Type(ChartSeriesType.Doughnut);

        }).ColumnHeader("FY 2016-Q2").ColumnDelimiter("-")).Height("500").Width("100%").Render()
```

**Example Column Hierarchy:**
```
Column 1: Germany
  Sub-column: Road Bikes, Mountain Bikes

Column 2: USA
  Sub-column: Road Bikes, Mountain Bikes
```

To display USA Mountain Bikes: `ColumnHeader("USA~~Mountain Bikes")`

### Label Customization

Control data label visibility and positioning in accumulation charts:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).ChartSettings(chartSettings => chartSettings.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Pyramid).DataLabel(datalabel => datalabel.Position("Inside")))).Height("500").Width("100%").Render()
```

**Label Options:**
- `Position = LabelPosition.Outside` - Label outside chart point (default)
- `Position = LabelPosition.Inside` - Label inside chart point
- `EnableSmartLabels = true` - Smart arrangement to prevent overlapping

### Connector Line Customization

Customize connector lines that appear when labels positioned outside:

```html
.ChartSettings(cs => cs
    .Type(ChartSeriesType.Pie)
    .DataLabel(new DataLabelSettings 
    { 
        Visible = true,
        Position = LabelPosition.Outside,
        ConnectorStyle = new ConnectorLineSettings 
        { 
            Color = "#FF0000",
            Length = "50px",
            Width = 2
        }
    }))
```

### Pie and Doughnut Customization

Draw pie/doughnut charts within specific angle range using `StartAngle` and `EndAngle` properties to create semi-pie/semi-doughnut charts:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ChartSettings(cs => cs.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Pie).StartAngle(0).EndAngle(180))).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

**Angle Configuration:**
- `StartAngle = 0, EndAngle = 360` (default) - Full pie/doughnut
- `StartAngle = 0, EndAngle = 180` - Semi-pie (top half)
- `StartAngle = 180, EndAngle = 360` - Semi-pie (bottom half)
- `StartAngle = 0, EndAngle = 270` - 3/4 pie

#### Convert Pie to Doughnut

Use the `InnerRadius` property to convert a pie chart to a doughnut chart. Values greater than 0% create a hollow center:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ChartSettings(cs => cs.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Pie).InnerRadius("40%"))).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

**InnerRadius Configuration:**
- `InnerRadius = "0%"` (default) - Pie chart (no hollow center)
- `InnerRadius = "40%"` - Doughnut with moderate hollow center
- `InnerRadius = "60%"` - Thin doughnut ring
- `InnerRadius = "80%"` - Very thin doughnut ring

**Note:** Values must be in percentage format (e.g., "40%", "60%")

### Exploding Series Points

Make individual points stand out in accumulation charts by enabling the explode option. Points separate when clicked:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ChartSettings(cs => cs.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Pie).Explode(true).ExplodeIndex(2).ExplodeOffset("10%"))).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).Height("500").Width("100%").Render()
```

**Explode Properties:**
- `Explode(true)` - Enable explode functionality
- `ExplodeIndex(2)` - Index of point to explode by default (0-based)
- `ExplodeOffset("10%")` - Distance of exploded point from center

**Behavior:**
- Click any point to explode/collapse it
- Only one point explodes at a time
- Works with Pie, Doughnut, Funnel, Pyramid charts

## Multiple Axis Configuration

Display multiple value fields with multiple Y-axes for better data visualization when measures have different scales.

### Enable Multiple Axis

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => {
            values.Name("Sold").Add();
            values.Name("Amount").Add();
        }))
    .ChartSettings(cs => cs.EnableMultipleAxis(true))
    .DisplayOption(new PivotViewDisplayOption { View = View.Chart })
    .Height("500")
    .Width("100%").Render()
```

**Key Property:**
- `EnableMultipleAxis(true)` - Creates separate chart for each value field

**Result:** Each value field appears in its own chart with independent Y-axis scaling

### Enable Scroll on Multiple Axis

When multiple axes shrink charts, enable scrolling to maintain readability:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Values(values => {
            values.Name("Sold").Add();
            values.Name("Amount").Add();
            values.Name("Quantity").Add();
        }))
    .ChartSettings(cs => cs
        .EnableMultipleAxis(true)
        .EnableScrollOnMultiAxis(true))
    .DisplayOption(new PivotViewDisplayOption { View = View.Chart })
    .Height("500")
    .Width("100%").Render()
```

**EnableScrollOnMultiAxis Benefits:**
- Each chart maintains minimum height (160-180px)
- Vertical scrollbar appears for navigation
- Prevents chart compression with many value fields

### Multiple Axis Mode

Control how multiple value fields display - as separate charts or combined in one chart with multiple Y-axes:

#### Single Mode (Multiple Y-Axes in One Chart)

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Values(values => {
            values.Name("Sold").Add();
            values.Name("Amount").Add();
        }))
    .ChartSettings(cs => cs
        .EnableMultipleAxis(true)
        .MultipleAxisMode(MultipleAxisMode.Single))
    .DisplayOption(new PivotViewDisplayOption { View = View.Chart })
    .Height("500")
    .Width("100%").Render()
```

**Single Mode:**
- All series displayed in one chart
- Multiple Y-axes with different scales
- Each measure gets its own axis scale

#### Combined Mode (Single Y-Axis)

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Values(values => {
            values.Name("Sold").Add();
            values.Name("Amount").Add();
        }))
    .ChartSettings(cs => cs
        .EnableMultipleAxis(true)
        .MultipleAxisMode(MultipleAxisMode.Combined))
    .DisplayOption(new PivotViewDisplayOption { View = View.Chart })
    .Height("500")
    .Width("100%").Render()
```

**Combined Mode:**
- All series displayed in one chart
- Single Y-axis shared by all measures
- Y-axis range determined by first value field format

**MultipleAxisMode Options:**
- `Single` - Separate Y-axis for each measure
- `Combined` - Shared Y-axis for all measures
- Default behavior (without mode) - Separate charts

**Note:** Multiple axis not supported for accumulation charts (Pie, Doughnut, Pyramid, Funnel)

### Show Point Color by Members

Display consistent colors for column axis members across all measures in multiple axis charts:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Products").Add(); })
        .Values(values => {
            values.Name("Sold").Add();
            values.Name("Amount").Add();
        }))
    .ChartSettings(cs => cs
        .EnableMultipleAxis(true)
        .ShowPointColorByMembers(true))
    .DisplayOption(new PivotViewDisplayOption { View = View.Chart })
    .Height("500")
    .Width("100%").Render()
```

**ShowPointColorByMembers Benefits:**
- Each column member (e.g., "Road Bikes", "Mountain Bikes") gets unique color
- Same color used across all measures (Sold, Amount, etc.)
- Easy visual comparison of members across different measures
- Click legend to show/hide member across all measures

**Use Case:** When comparing "Road Bikes" vs "Mountain Bikes" sales and amount, both metrics for "Road Bikes" appear in the same color across all charts.

## Chart Configuration

### Series Customization

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).ChartSettings(chartSettings => chartSettings.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Column).EnableTooltip(false).Border(border => border.Color("#000").Width(2)))).Height("500").Width("100%").Render()
```

## Drill Down in Charts

Drill down/drill up in row headers (not column headers):

```html
// Click legend item representing row member:
// - Expand icon: Drill down to child members
// - Collapse icon: Drill up to parent member

// Works for:
// ✓ Row hierarchies
// ✗ Column hierarchies (not supported)
```

## Data Binding

> **⚠️ SECURITY:** Always use configuration-based URLs for remote data. Never hardcode external endpoints.

Chart automatically binds to same data as pivot table:

```html
// Local JSON (recommended)
.DataSourceSettings(ds => ds.DataSource((IEnumerable<object>)ViewBag.DataSource))

// Remote DataManager with configuration-based URL
.DataSourceSettings(ds => ds.DataSource(
    new DataManager { Url = (string)ViewBag.ApiUrl }))

// CSV binding also supported
```

**Important:** 
- No additional configuration needed for chart data binding
- Chart inherits security settings from pivot table data source
- Use configuration-based URLs (Web.config) for remote sources

## Series Customization

### Multiple Series

```html
.Values(values => {
    values.Name("Sales").Add();
    values.Name("Cost").Add();
})  // Chart will have 2 series
```

### Series Configuration

```html
.ChartSettings(cs => cs
    .ChartSeries(chartSeries => chartSeries
        .Name("Sales")
        .Type(ChartSeriesType.Column)
        .Add()))
```

## Best Practices

- **Chart Type:** Choose type based on data (Column for comparison, Line for trend, Pie for composition)
- **Title:** Always include meaningful chart title
- **Legend:** Keep legend visible for multiple series
- **Tooltip:** Enable tooltips for hover details
- **Drill:** Leverage drill down/up for hierarchical analysis
- **Export:** Test chart export to PDF/Excel before deployment
- **Responsive:** Chart resizes with container; set appropriate height/width
- **Performance:** Monitor performance with 50,000+ data points
- **Accumulation:** Use Pie/Doughnut for composition; Drill works on rows only
- **Accessibility:** Provide data table alongside chart for screen readers
- **Module:** Ensure PivotChartService is injected
- **Colors:** Use consistent color schemes; consider colorblind users
