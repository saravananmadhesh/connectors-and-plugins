# Comparative Bar (Target Value Display)

## Table of Contents
- [Overview](#overview)
- [Target Bar Types](#target-bar-types)
- [Customization](#customization)
- [Width and Height](#width-and-height)
- [Color and Styling](#color-and-styling)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

The comparative bar (also called target bar or target marker) displays the comparison value or target against which the actual value is measured. It appears as a distinctive marker overlaid on the bullet chart, providing an immediate visual reference point.

**Purpose:**
- Shows the target, goal, or benchmark value
- Provides comparison point for the actual value (value bar)
- Helps users quickly assess performance relative to expectations
- Can represent previous period performance, industry benchmark, or any comparison metric

**Key Characteristics:**
- Bound to `TargetField` property in data
- Displayed as a distinct marker (line, shape, or symbol)
- Overlays ranges and value bar
- Independently customizable from value bar

## Target Bar Types

The Bullet Chart supports various visual styles for the target marker through the `TargetTypes` property.

### Available Target Types

**1. Rect (Rectangle/Line) - Default**
A thin vertical line or rectangle crossing the chart.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Rect 
    })
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**2. Circle**
A circular marker at the target position.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Circle 
    })
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**3. Cross**
An X-shaped or plus-shaped marker.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Cross 
    })
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Type Comparison Example

```csharp
// Controller
public ActionResult TargetTypeComparison()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    
    ViewBag.RectData = data;
    ViewBag.CircleData = data;
    ViewBag.CrossData = data;
    
    return View();
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h3>Rect Type (Default Line Marker)</h3>
@(Html.EJS().BulletChart("rectChart")
    .DataSource((List<BulletChartData>)ViewBag.RectData)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Rect 
    })
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("80")
    .Render()
)

<h3>Circle Type</h3>
@(Html.EJS().BulletChart("circleChart")
    .DataSource((List<BulletChartData>)ViewBag.CircleData)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Circle 
    })
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("80")
    .Render()
)

<h3>Cross Type</h3>
@(Html.EJS().BulletChart("crossChart")
    .DataSource((List<BulletChartData>)ViewBag.CrossData)
    .ValueField("value")
    .TargetField("target")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Cross 
    })
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("80")
    .Render()
)
```

### Type Selection Guidelines

| Type | Best For | Visibility | Use Case |
|------|----------|------------|----------|
| **Rect** | Standard dashboards | High | Clear, unambiguous target line |
| **Circle** | Dense layouts | Medium | Softer, less intrusive marker |
| **Cross** | Multiple targets | Medium-High | Distinct, attention-grabbing |

## Customization

Customize the target bar appearance to match design requirements and improve clarity.

### Basic Target Bar Configuration

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetColor("#E74C3C")
    .TargetWidth(5)
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Complete Customization

```csharp
// Controller
public ActionResult CustomTarget()
{
    List<PerformanceData> data = new List<PerformanceData>
    {
        new PerformanceData 
        { 
            currentValue = 85000,
            goalValue = 100000,
            metric = "Revenue"
        }
    };
    return View(data);
}

public class PerformanceData
{
    public double currentValue { get; set; }
    public double goalValue { get; set; }
    public string metric { get; set; }
}
```

```cshtml
@model List<PerformanceData>

@(Html.EJS().BulletChart("customTargetChart")
    .DataSource(Model)
    .ValueField("currentValue")
    .TargetField("goalValue")
    .Title("Revenue Target Tracking")
    .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
        Syncfusion.EJ2.Charts.TargetType.Rect 
    })
    .TargetColor("#C0392B")
    .TargetWidth(4)
    .ValueFill("#3498DB")
    .Minimum(0)
    .Maximum(120000)
    .Interval(20000)
    .LabelFormat("${value}k")
    .Ranges(r => {
        r.End(60000).Color("#F8D7DA").Add();
        r.End(90000).Color("#FFF3CD").Add();
        r.End(120000).Color("#D4EDDA").Add();
    })
    .Width("90%")
    .Height("100")
    .Render()
)
```

## Width and Height

Control the size of the target marker for visibility and emphasis.

### Target Width

The width property controls the thickness of the target marker.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetWidth(6)  // Pixels
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Width Guidelines:**
- `2-3`: Subtle marker
- `4-5`: Standard visibility (recommended)
- `6-8`: Emphasized marker
- `>8`: Very prominent, may be distracting

### Width Comparison

```csharp
// Controller
public ActionResult WidthComparison()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.ThinData = data;
    ViewBag.MediumData = data;
    ViewBag.ThickData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h3>Thin Target (Width: 2)</h3>
@(Html.EJS().BulletChart("thinTarget")
    .DataSource((List<MetricData>)ViewBag.ThinData)
    .ValueField("value")
    .TargetField("target")
    .TargetWidth(2)
    .TargetColor("#E74C3C")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("70")
    .Render()
)

<h3>Medium Target (Width: 5)</h3>
@(Html.EJS().BulletChart("mediumTarget")
    .DataSource((List<MetricData>)ViewBag.MediumData)
    .ValueField("value")
    .TargetField("target")
    .TargetWidth(5)
    .TargetColor("#E74C3C")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("70")
    .Render()
)

<h3>Thick Target (Width: 8)</h3>
@(Html.EJS().BulletChart("thickTarget")
    .DataSource((List<MetricData>)ViewBag.ThickData)
    .ValueField("value")
    .TargetField("target")
    .TargetWidth(8)
    .TargetColor("#E74C3C")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("70")
    .Render()
)
```

## Color and Styling

Use color to differentiate the target from the value bar and convey meaning.

### Target Color

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TargetColor("#E74C3C")  // Red target line
    .ValueFill("#3498DB")     // Blue value bar
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Color Format Options

```cshtml
<!-- Hex Color -->
.TargetColor("#C0392B")

<!-- RGB Color -->
.TargetColor("rgb(192, 57, 43)")

<!-- RGBA Color (with transparency) -->
.TargetColor("rgba(192, 57, 43, 0.8)")

<!-- Named Color -->
.TargetColor("crimson")
```

### Contrasting Colors Example

```csharp
// Controller
public ActionResult ColorContrast()
{
    List<SalesData> data = new List<SalesData>
    {
        new SalesData { sales = 425000, quota = 500000 }
    };
    return View(data);
}

public class SalesData
{
    public double sales { get; set; }
    public double quota { get; set; }
}
```

```cshtml
@model List<SalesData>

@(Html.EJS().BulletChart("contrastChart")
    .DataSource(Model)
    .ValueField("sales")
    .TargetField("quota")
    .Title("Sales vs Quota")
    .ValueFill("#2980B9")      // Deep blue for actual
    .TargetColor("#E74C3C")    // Red for target (high contrast)
    .TargetWidth(5)
    .ValueHeight(15)
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .Ranges(r => {
        r.End(300000).Color("#F8D7DA").Opacity(0.4).Add();
        r.End(450000).Color("#FFF3CD").Opacity(0.4).Add();
        r.End(600000).Color("#D4EDDA").Opacity(0.4).Add();
    })
    .Tooltip(t => t.Enable(true))
    .Width("90%")
    .Height("110")
    .Render()
)
```

### Conditional Target Styling

```csharp
// Controller
public ActionResult ConditionalTargetStyle()
{
    double actualValue = 270;
    double targetValue = 250;
    
    // Style target based on whether it was met
    string targetColor = actualValue >= targetValue 
        ? "#27AE60"  // Green if target met
        : "#E74C3C"; // Red if target not met
    
    ViewBag.TargetColor = targetColor;
    
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = actualValue, target = targetValue }
    };
    
    return View(data);
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<MetricData>

@(Html.EJS().BulletChart("conditionalChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Performance with Dynamic Target Styling")
    .TargetColor(ViewBag.TargetColor)
    .TargetWidth(6)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

## Complete Examples

### Example 1: Sales Target Dashboard

```csharp
// Controller
public ActionResult SalesDashboard()
{
    ViewBag.Q1Data = new List<QuarterlyData>
    {
        new QuarterlyData { actual = 285000, target = 300000, quarter = "Q1" }
    };
    
    ViewBag.Q2Data = new List<QuarterlyData>
    {
        new QuarterlyData { actual = 325000, target = 320000, quarter = "Q2" }
    };
    
    ViewBag.Q3Data = new List<QuarterlyData>
    {
        new QuarterlyData { actual = 295000, target = 310000, quarter = "Q3" }
    };
    
    ViewBag.Q4Data = new List<QuarterlyData>
    {
        new QuarterlyData { actual = 340000, target = 330000, quarter = "Q4" }
    };
    
    return View();
}

public class QuarterlyData
{
    public double actual { get; set; }
    public double target { get; set; }
    public string quarter { get; set; }
}
```

```cshtml
<style>
    .quarter-section {
        margin-bottom: 25px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 5px;
    }
</style>

<h1>Annual Sales Performance</h1>

<div class="quarter-section">
    <h3>Q1 2024</h3>
    @(Html.EJS().BulletChart("q1Chart")
        .DataSource((List<QuarterlyData>)ViewBag.Q1Data)
        .ValueField("actual")
        .TargetField("target")
        .ValueFill("#3498DB")
        .TargetColor("#E74C3C")
        .TargetWidth(5)
        .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
            Syncfusion.EJ2.Charts.TargetType.Rect 
        })
        .Minimum(0)
        .Maximum(400000)
        .Interval(50000)
        .LabelFormat("${value}k")
        .Ranges(r => {
            r.End(200000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(300000).Color("#F39C12").Opacity(0.3).Add();
            r.End(400000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("100%")
        .Height("90")
        .Render()
    )
</div>

<div class="quarter-section">
    <h3>Q2 2024</h3>
    @(Html.EJS().BulletChart("q2Chart")
        .DataSource((List<QuarterlyData>)ViewBag.Q2Data)
        .ValueField("actual")
        .TargetField("target")
        .ValueFill("#3498DB")
        .TargetColor("#E74C3C")
        .TargetWidth(5)
        .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
            Syncfusion.EJ2.Charts.TargetType.Rect 
        })
        .Minimum(0)
        .Maximum(400000)
        .Interval(50000)
        .LabelFormat("${value}k")
        .Ranges(r => {
            r.End(200000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(300000).Color("#F39C12").Opacity(0.3).Add();
            r.End(400000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("100%")
        .Height("90")
        .Render()
    )
</div>

<!-- Q3 and Q4 similar to above -->
```

### Example 2: Multiple Target Types

```csharp
// Controller
public ActionResult MultipleTargetTypes()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    
    ViewBag.RectStyle = data;
    ViewBag.CircleStyle = data;
    ViewBag.CrossStyle = data;
    
    return View();
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h2>Target Type Showcase</h2>

<div style="margin-bottom: 30px;">
    <h3>Rect Type - Professional Dashboard</h3>
    <p>Best for standard business metrics</p>
    @(Html.EJS().BulletChart("rectStyle")
        .DataSource((List<BulletChartData>)ViewBag.RectStyle)
        .ValueField("value")
        .TargetField("target")
        .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
            Syncfusion.EJ2.Charts.TargetType.Rect 
        })
        .TargetColor("#C0392B")
        .TargetWidth(5)
        .ValueFill("#2C3E50")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#F8D7DA").Add();
            r.End(250).Color("#FFF3CD").Add();
            r.End(300).Color("#D4EDDA").Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>

<div style="margin-bottom: 30px;">
    <h3>Circle Type - Softer Appearance</h3>
    <p>Best for design-focused interfaces</p>
    @(Html.EJS().BulletChart("circleStyle")
        .DataSource((List<BulletChartData>)ViewBag.CircleStyle)
        .ValueField("value")
        .TargetField("target")
        .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
            Syncfusion.EJ2.Charts.TargetType.Circle 
        })
        .TargetColor("#8E44AD")
        .TargetWidth(12)
        .ValueFill("#16A085")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#F8D7DA").Add();
            r.End(250).Color("#FFF3CD").Add();
            r.End(300).Color("#D4EDDA").Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>

<div style="margin-bottom: 30px;">
    <h3>Cross Type - Attention-Grabbing</h3>
    <p>Best for critical metrics requiring focus</p>
    @(Html.EJS().BulletChart("crossStyle")
        .DataSource((List<BulletChartData>)ViewBag.CrossStyle)
        .ValueField("value")
        .TargetField("target")
        .TargetTypes(new Syncfusion.EJ2.Charts.TargetType[] { 
            Syncfusion.EJ2.Charts.TargetType.Cross 
        })
        .TargetColor("#D35400")
        .TargetWidth(10)
        .ValueFill("#2980B9")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#F8D7DA").Add();
            r.End(250).Color("#FFF3CD").Add();
            r.End(300).Color("#D4EDDA").Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>
```

## Best Practices

### 1. Use Contrasting Colors
Ensure target marker contrasts clearly with:
- Value bar color
- Range background colors
- Chart background

**Good Example:**
```cshtml
.ValueFill("#3498DB")    <!-- Blue value bar -->
.TargetColor("#E74C3C")  <!-- Red target marker -->
```

### 2. Choose Appropriate Width
- Use width 4-6 for standard dashboards
- Increase width (7-10) for emphasis or when ranges are similar colors
- Keep width consistent across related charts

### 3. Select Meaningful Type
- **Rect**: Most versatile, works in all contexts
- **Circle**: Use when softness or design aesthetic is important
- **Cross**: Use for critical metrics that need attention

### 4. Maintain Visibility
Ensure target marker is always visible:
- Test against all range colors
- Check visibility when value bar overlaps target
- Adjust width or color if needed

### 5. Consider Context
- **At/Above Target**: Consider green or neutral colors
- **Below Target**: Consider red or warning colors
- **Neutral Comparison**: Use contrasting but non-judgmental colors

### 6. Consistent Styling
Maintain consistent target styling across dashboard:
- Same type (Rect, Circle, Cross)
- Same width
- Same or coordinated colors

## Common Scenarios

### Scenario 1: Target Met (Success)
```cshtml
.TargetColor("#27AE60")  <!-- Green target -->
.TargetWidth(5)
```

### Scenario 2: Target Missed (Needs Attention)
```cshtml
.TargetColor("#E74C3C")  <!-- Red target -->
.TargetWidth(6)  <!-- Slightly emphasized -->
```

### Scenario 3: Neutral Comparison
```cshtml
.TargetColor("#34495E")  <!-- Dark gray -->
.TargetWidth(4)
```

### Scenario 4: Multiple Targets
```cshtml
<!-- Primary target -->
.TargetColor("#E74C3C")
.TargetWidth(5)
<!-- Could add secondary visual cue via ranges -->
```

## Troubleshooting

### Target Not Visible
- Verify `TargetField` maps to correct data property
- Check target value is within Minimum/Maximum range
- Ensure target color contrasts with background
- Confirm `TargetWidth` is at least 2

### Target at Wrong Position
- Check `TargetField` property name spelling
- Verify data type is numeric
- Confirm axis Minimum/Maximum range

### Target Color Not Showing
- Ensure color format is valid (hex, RGB, or named)
- Check for CSS overrides
- Verify color isn't same as background

You now have complete understanding of configuring and customizing target bars to create effective comparative visualizations in Bullet Charts!
