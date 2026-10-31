# Configuring Axes in HeatMap

## Table of Contents
- [Axis Overview](#axis-overview)
- [Category Axis](#category-axis)
- [Numeric Axis](#numeric-axis)
- [DateTime Axis](#datetime-axis)
- [Axis Label Configuration](#axis-label-configuration)
- [Advanced Axis Customization](#advanced-axis-customization)

## Axis Overview

HeatMap uses two axes to define data coordinates:
- **X-Axis**: Horizontal axis, typically for columns or categories
- **Y-Axis**: Vertical axis, typically for rows or time periods

Each axis supports three value types:
- **Category**: String labels for discrete categories
- **Numeric**: Number values for continuous ranges
- **DateTime**: Date/time values for temporal data

### Configuring Axes

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "A", "B", "C" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "2016", "2017", "2018" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .Render()
```

## Category Axis

### Overview

Category axis displays string labels for discrete categories. It's the most common axis type for HeatMap.

### Basic Category Axis

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr", "May" });
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
})
```

### Category Labels from Model

Bind axis labels from your data model:

```csharp
// Controller
public ActionResult Index()
{
    var model = new HeatMapViewModel
    {
        Data = GetHeatMapData(),
        MonthLabels = new List<string> { "January", "February", "March" },
        RegionLabels = new List<string> { "North", "South", "East", "West" }
    };
    return View(model);
}

// View
.XAxis(xaxis =>
{
    xaxis.Labels(Model.MonthLabels);
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
})
.YAxis(yaxis =>
{
    yaxis.Labels(Model.RegionLabels);
    yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
})
```

### Category Axis with Long Labels

Handle long category labels:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> 
    { 
        "Product Category A", 
        "Product Category B", 
        "Product Category C" 
    });
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    xaxis.LabelRotation(45);  // Rotate labels to prevent overlap
    xaxis.LabelIntersectAction(Syncfusion.EJ2.HeatMap.LabelIntersectAction.Wrap);
})
```

## Numeric Axis

### Overview

Numeric axis displays continuous number ranges. Useful for numeric scales instead of categories.

### Basic Numeric Axis

```csharp
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Numeric);
    xaxis.Minimum(0);
    xaxis.Maximum(100);
    xaxis.Interval(10);
})
```

### Numeric Range Configuration

```csharp
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Numeric);
    xaxis.Minimum(1900);
    xaxis.Maximum(2020);
    xaxis.Interval(10);
})
.YAxis(yaxis =>
{
    yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Numeric);
    yaxis.Minimum(0);
    yaxis.Maximum(1000);
    yaxis.Interval(100);
})
```

### Numeric with Custom Labels

```csharp
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Numeric);
    xaxis.Minimum(0);
    xaxis.Maximum(100);
    xaxis.Interval(20);
    xaxis.Labels(new List<string> { "0%", "20%", "40%", "60%", "80%", "100%" });
})
```

## DateTime Axis

### Overview

DateTime axis displays temporal data with automatic date formatting. Perfect for time-series visualizations.

### Basic DateTime Axis

```csharp
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.DateTime);
    xaxis.Minimum(DateTime.Parse("2016-01-01"));
    xaxis.Maximum(DateTime.Parse("2016-12-31"));
    xaxis.IntervalType(Syncfusion.EJ2.HeatMap.IntervalType.Months);
    xaxis.LabelFormat("MMM");  // Display as "Jan", "Feb", etc.
})
```

### DateTime with Different Intervals

```csharp
// By Days
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.DateTime);
    xaxis.Minimum(DateTime.Parse("2016-01-01"));
    xaxis.Maximum(DateTime.Parse("2016-01-31"));
    xaxis.IntervalType(Syncfusion.EJ2.HeatMap.IntervalType.Days);
    xaxis.Interval(7);  // Every 7 days
    xaxis.LabelFormat("dd MMM");
})

// By Quarters
.YAxis(yaxis =>
{
    yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.DateTime);
    yaxis.IntervalType(Syncfusion.EJ2.HeatMap.IntervalType.Months);
    yaxis.Interval(3);  // Every 3 months (quarterly)
    yaxis.LabelFormat("MMM yyyy");
})
```

### DateTime Format Strings

| Format | Output | Example |
|--------|--------|---------|
| "dd MMM" | Day Month | "15 Jan" |
| "MMM yyyy" | Month Year | "Jan 2016" |
| "yyyy-MM-dd" | ISO format | "2016-01-15" |
| "MMMM d" | Full month | "January 15" |
| "Q yyyy" | Quarter | "Q1 2016" |

## Axis Label Configuration

### Label Styling

Customize axis label appearance:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "A", "B", "C" });
    xaxis.LabelStyle(style =>
    {
        style.Size("12px");
        style.FontFamily("Arial");
        style.FontWeight("bold");
        style.Color("#333333");
    });
})
```

### Label Rotation

Rotate labels for better readability:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "Very Long Category A", "Very Long Category B" });
    xaxis.LabelRotation(45);  // 45-degree rotation
})

.YAxis(yaxis =>
{
    yaxis.Labels(new List<string> { "Item 1", "Item 2", "Item 3" });
    yaxis.LabelRotation(90);  // 90-degree rotation
})
```

### Label Intersection Actions

Handle overlapping labels:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "Long Label 1", "Long Label 2", "Long Label 3" });
    xaxis.LabelIntersectAction(Syncfusion.EJ2.HeatMap.LabelIntersectAction.Rotate45);
})

// Other options:
// - Trim: Truncate labels
// - Wrap: Wrap text to multiple lines
// - Hide: Hide overlapping labels
// - Replace: Replace with default text
```

### Label Format

Format numeric labels:

```csharp
.XAxis(xaxis =>
{
    xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Numeric);
    xaxis.Minimum(0);
    xaxis.Maximum(1000);
    xaxis.LabelFormat("0.00");  // Two decimal places
})
```

## Advanced Axis Customization

### Inverted Axis

Reverse axis direction:

```csharp
.XAxis(xaxis =>
{
    xaxis.IsInversed(true);  // Reverse X-axis
})

.YAxis(yaxis =>
{
    yaxis.IsInversed(true);  // Reverse Y-axis
})
```

### Opposed Axis Position

Place axis labels on opposite side:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "A", "B", "C" });
    xaxis.OpposedPosition(true);  // Move to bottom
})

.YAxis(yaxis =>
{
    yaxis.Labels(new List<string> { "Q1", "Q2", "Q3" });
    yaxis.OpposedPosition(true);  // Move to right
})
```

### Multi-Level Labels

Create hierarchical labels:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun" });
    xaxis.MultiLevelLabels(new List<object>
    {
        new 
        { 
            start = 0, 
            end = 2, 
            text = "Q1",
            alignment = Syncfusion.EJ2.HeatMap.Alignment.Center
        },
        new 
        { 
            start = 3, 
            end = 5, 
            text = "Q2",
            alignment = Syncfusion.EJ2.HeatMap.Alignment.Center
        }
    });
})
```

### Axis Margins

Control spacing around axes:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "A", "B", "C" });
    xaxis.StartFromZero(true);
    xaxis.MaxLabelWidth(100);
})

.YAxis(yaxis =>
{
    yaxis.Labels(new List<string> { "Row1", "Row2", "Row3" });
    yaxis.MaxLabelWidth(150);
})
```

### Axis with Grid Lines

Configure grid appearance:

```csharp
.XAxis(xaxis =>
{
    xaxis.Labels(new List<string> { "A", "B", "C" });
    xaxis.MajorGridLines(gridLines =>
    {
        gridLines.Width(1);
        gridLines.Color("#e0e0e0");
    });
})
```

### Complete Axis Configuration Example

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
        xaxis.LabelRotation(45);
        xaxis.LabelStyle(style =>
        {
            style.FontWeight("bold");
            style.Size("12px");
        });
        xaxis.LabelIntersectAction(Syncfusion.EJ2.HeatMap.LabelIntersectAction.Wrap);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Q1", "Q2", "Q3", "Q4" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
        yaxis.LabelStyle(style =>
        {
            style.FontWeight("bold");
            style.Size("12px");
        });
    })
    .Render()
```

Proper axis configuration ensures data is accurately represented and labels are clearly readable in your HeatMap visualizations.
