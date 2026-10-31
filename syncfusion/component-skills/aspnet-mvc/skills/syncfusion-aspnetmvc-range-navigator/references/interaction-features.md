# Interaction Features and Events

## Table of Contents
- [Overview](#overview)
- [Tooltip Configuration](#tooltip-configuration)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Tooltip Format String](#tooltip-format-string)
  - [Tooltip Format Variables](#tooltip-format-variables)
  - [Tooltip Example: Currency Format](#tooltip-example-currency-format)
- [Period Selector Setup](#period-selector-setup)
  - [Creating Preset Range Buttons](#creating-preset-range-buttons)
  - [Available Period Types](#available-period-types)
  - [Period Selector Example: Financial Dashboard](#period-selector-example-financial-dashboard)
- [Range Selection Events](#range-selection-events)
  - [Handling Changed Event](#handling-changed-event)
  - [Changed Event Arguments](#changed-event-arguments)
  - [Practical Example: Filtering Grid with Range Selection](#practical-example-filtering-grid-with-range-selection)
- [Label Formatting and Styling](#label-formatting-and-styling)
  - [Customizing Axis Labels](#customizing-axis-labels)
  - [Common Label Formats for DateTime](#common-label-formats-for-datetime)
  - [Label Format Example: Quarterly View](#label-format-example-quarterly-view)
- [Grid Display](#grid-display)
  - [Showing Grid Lines in Navigator](#showing-grid-lines-in-navigator)
  - [Grid Line Configuration](#grid-line-configuration)
  - [Grid Line Dash Patterns](#grid-line-dash-patterns)
- [Tick Marks Configuration](#tick-marks-configuration)
  - [Configuring Major and Minor Ticks](#configuring-major-and-minor-ticks)
  - [Tick Mark Best Practices](#tick-mark-best-practices)
- [Complete Examples](#complete-examples)
  - [Example 1: Financial Dashboard with All Features](#example-1-financial-dashboard-with-all-features)
  - [Example 2: Sales Analysis with Real-Time Filtering](#example-2-sales-analysis-with-real-time-filtering)

## Overview

Interaction features enhance user experience by providing visual feedback, quick navigation options, and event handling for range selections. The Range Navigator supports tooltips for data values, period selectors for quick presets, and various events for integration with other controls.

## Tooltip Configuration

### Enabling Tooltips

Tooltips display data values when users hover over or interact with the range navigator:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("${value}");  // Custom format
    })
    .DataSource(Model)
    .Render()
)
```

### Tooltip Format String

Format strings customize how data appears in the tooltip:

```html
<!-- Display date and value -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("<b>${x}</b><br/>Value: <b>${y}</b>");
    })
    .DataSource(Model)
    .Render()
)
```

### Tooltip Format Variables

| Variable | Represents | Example Output |
|----------|------------|-----------------|
| **${x}** | X-axis value (date/category) | 2023-01-15 or Jan 2023 |
| **${y}** | Y-axis value (numeric) | 1234.56 |
| **${point.x}** | Complete x-axis data | 2023-01-15 |
| **${point.y}** | Complete y-axis data | 1234.56 |

### Tooltip Example: Currency Format

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Revenue")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("Date: ${x}<br/>Revenue: $${y,.2f}");
    })
    .DataSource(Model)
    .Render()
)
```

## Period Selector Setup

### Creating Preset Range Buttons

Period selectors provide quick buttons for common date ranges:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .PeriodSelectorSettings(ps =>
    {
        ps.Periods(period =>
        {
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("1M").Add();
            period.Interval(3).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("3M").Add();
            period.Interval(6).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("6M").Add();
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Text("1Y").Add();
        });
    })
    .DataSource(Model)
    .Render()
)
```

### Available Period Types

| IntervalType | Unit | Examples |
|-------------|------|----------|
| **Years** | Years | 1Y (1 year) |
| **Months** | Months | 1M, 3M, 6M, 12M |
| **Weeks** | Weeks | 1W, 2W, 4W |
| **Days** | Days | 1D, 7D, 14D, 30D |
| **Hours** | Hours | 1H, 6H, 12H |

### Positioning Period Selector

The position property allows the users to position the period selector at the Top or Bottom.

```html
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .LabelFormat("MMM-yy")
    .PeriodSelectorSettings(ps => ps.Position(Syncfusion.EJ2.Charts.PeriodSelectorPosition.Top).Periods(ViewBag.periods).Position("Bottom"))
    .Series(sr =>
    {
        sr.XName("x").YName("y").DataSource(ViewBag.dataSource).Add();
    }).Render()
)
```

### Height

The height property allows the users to specify the height of the period selector. The default value of the height property is 43px.

```html
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .LabelFormat("MMM-yy")
    .PeriodSelectorSettings(ps => ps.Position(Syncfusion.EJ2.Charts.PeriodSelectorPosition.Top).Periods(ViewBag.periods).Height("45"))
    .Series(sr =>
    {
        sr.XName("x").YName("y").DataSource(ViewBag.dataSource).Add();
    }).Render()
)
```

### Visibility of Range Navigator

The disableRangeSelector property allows the users to display only the period selector and not the Range Selector.

```html
@(Html.EJS().RangeNavigator("container")
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .LabelFormat("MMM-yy")
    .DisableRangeSelector("true")
    .PeriodSelectorSettings(ps => ps.Position(Syncfusion.EJ2.Charts.PeriodSelectorPosition.Top).Periods(ViewBag.periods))
    .Series(sr =>
    {
        sr.XName("x").YName("y").DataSource(ViewBag.dataSource).Add();
    }).Render()
)
```

### Period Selector Example: Financial Dashboard

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("StockPrice")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .PeriodSelectorSettings(ps =>
    {
        ps.Periods(period =>
        {
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Weeks).Text("1W").Add();
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("1M").Add();
            period.Interval(3).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("3M").Add();
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Text("1Y").Add();
            period.Interval(5).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Text("5Y").Add();
        });
    })
    .DataSource(Model)
    .Render()
)
```

## Range Selection Events

### Handling Changed Event

The `Changed` event fires when the user completes range selection:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .Changed("onRangeChanged")
    .DataSource(Model)
    .Render()
)

<script>
function onRangeChanged(args) {
    console.log("Range Selection Changed");
    console.log("Start: ", args.start);
    console.log("End: ", args.end);
    
    // Update connected controls
    updateConnectedChart(args.start, args.end);
}

function updateConnectedChart(startDate, endDate) {
    // Filter and update other visualizations based on selected range
    var chartInstance = document.getElementById('container').ej2_instances[0];
    // Update chart data source based on range
}
</script>
```

### Changed Event Arguments

The event handler receives these properties:

| Property | Type | Description |
|----------|------|-------------|
| **start** | Date/Number | Start of selected range |
| **end** | Date/Number | End of selected range |

### Practical Example: Filtering Grid with Range Selection

```html
<!-- Range Navigator -->
@(Html.EJS().RangeNavigator("rangeNavigator")
    .Series(series =>
    {
        series.XName("Date").YName("Sales").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Changed("onRangeChanged")
    .DataSource(Model)
    .Render()
)

<!-- Connected Grid that filters based on range selection -->
@(Html.EJS().Grid("grid")
    .DataSource(Model)
    .Render()
)

<script>
function onRangeChanged(args) {
    // Get grid instance
    var gridInstance = document.getElementById('grid').ej2_instances[0];
    
    // Filter grid data based on selected range
    var filteredData = gridData.filter(function(item) {
        return item.Date >= args.start && item.Date <= args.end;
    });
    
    // Update grid
    gridInstance.dataSource = filteredData;
}
</script>
```

## Label Formatting and Styling

### Customizing Axis Labels

Labels display x-axis values (dates or categories). Customize their format and appearance:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .LabelFormat("MMM dd")  // Jan 15, Feb 20, etc.
    .DataSource(Model)
    .Render()
)
```

### Common Label Formats for DateTime

| Format | Output Example | Use Case |
|--------|-----------------|----------|
| **yyyy** | 2023 | Yearly view |
| **MMM yyyy** | Jan 2023 | Monthly view |
| **MMM dd** | Jan 15 | Daily view |
| **HH:mm** | 14:30 | Hourly view |
| **dd/MM/yyyy** | 15/01/2023 | Regional format |

### Label Format Example: Quarterly View

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Revenue")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .LabelFormat("'Q'q yyyy")  // Q1 2023, Q2 2023, etc.
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

## Grid Display

### Showing Grid Lines in Navigator

Grid lines help users align range selection with data intervals:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .MajorGridLines(grid =>
    {
        grid.Width(1)
            .Color("#e5e5e5");  // Light gray grid
    })
    .DataSource(Model)
    .Render()
)
```

### Grid Line Configuration

```html
<!-- Detailed grid configuration -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .MajorGridLines(grid =>
    {
        grid.Width(2)
            .Color("#cccccc")
            .DashArray("5");
    })
    .DataSource(Model)
    .Render()
)
```

### Grid Line Dash Patterns

| DashArray | Pattern | Use Case |
|-----------|---------|----------|
| **0** | Solid line | Standard grid |
| **2,2** | Dashed | Subtle divisions |
| **5** | Dashed | Clear divisions |
| **10,5** | Dash-dot | Major intervals |

## Tick Marks Configuration

### Configuring Major and Minor Ticks

Tick marks indicate data points or intervals on the axis:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .MajorTickLines(tick =>
    {
        tick.Width(1)
            .Color("#3c78dc")
            .Height(10);
    })
    .DataSource(Model)
    .Render()
)
```

### Tick Mark Best Practices
- **Major ticks**: Placed at significant intervals (months, years)
- **Minor ticks**: Placed between major ticks for reference
- **Height**: Major 8-12px, Minor 4-6px for visual hierarchy
- **Color**: Use contrasting colors for clear visibility

## Complete Examples

### Example 1: Financial Dashboard with All Features

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("StockPrice")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("Date: <b>${x}</b><br/>Price: <b>$${y,.2f}</b>");
    })
    .PeriodSelectorSettings(ps =>
    {
        ps.Periods(period =>
        {
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("1M").Add();
            period.Interval(3).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("3M").Add();
            period.Interval(6).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months).Text("6M").Add();
            period.Interval(1).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Years).Text("1Y").Add();
        });
    })
    .LabelFormat("MMM dd, yyyy")
    .MajorGridLines(grid => grid.Width(1).Color("#e5e5e5"))
    .Changed("onStockRangeChanged")
    .DataSource(Model)
    .Render()
)

<script>
function onStockRangeChanged(args) {
    console.log("Date range: " + args.start + " to " + args.end);
    // Update associated chart or grid
}
</script>
```

### Example 2: Sales Analysis with Real-Time Filtering

```html
@(Html.EJS().RangeNavigator("rangeNavigator")
    .Series(series =>
    {
        series.XName("SalesDate")
              .YName("DailySales")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Line)
              .Add();
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("<b>${x}</b><br/>Sales: <b>${y:C0}</b>");
    })
    .PeriodSelectorSettings(ps =>
    {
        ps.Periods(period =>
        {
            period.Interval(7).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Text("1W").Add();
            period.Interval(30).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Text("1M").Add();
            period.Interval(90).IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Days).Text("3M").Add();
        });
    })
    .LabelFormat("dd MMM")
    .MajorTickLines(tick => tick.Width(1).Height(8))
    .Changed("updateSalesDetails")
    .DataSource(Model)
    .Render()
)

<script>
function updateSalesDetails(args) {
    var startDate = new Date(args.start);
    var endDate = new Date(args.end);
    
    // Fetch and display sales details for selected period
    $.ajax({
        url: '/Sales/GetDetailedSales',
        data: {
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0]
        },
        success: function(data) {
            // Update grid or details display
            updateDetailsGrid(data);
        }
    });
}
</script>
```
