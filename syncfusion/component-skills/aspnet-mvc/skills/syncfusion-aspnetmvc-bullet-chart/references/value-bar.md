# Value Bar (Actual Value Display)

## Table of Contents
- [Overview](#overview)
- [Value Bar Types](#value-bar-types)
- [Border Customization](#border-customization)
- [Fill and Color](#fill-and-color)
- [Height and Width](#height-and-width)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

The value bar is the primary visual element in a bullet chart that represents the actual or current value. It displays as a horizontal or vertical bar (depending on orientation) and is the main indicator that users compare against the target marker and qualitative ranges.

**Purpose:**
- Displays the actual/current measurement
- Primary focus of the visualization
- Compared against target and ranges
- Customizable in appearance, size, and style

**Key Characteristics:**
- Bound to `ValueField` property in data
- Drawn on top of ranges (background)
- Can be styled independently from target bar
- Supports multiple types (Rect, Dot, etc.)

## Value Bar Types

The Bullet Chart supports different visual representations for the value bar through the `Type` property.

### Available Types

**1. Rect (Rectangle) - Default**
A solid rectangular bar, most commonly used.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb.Type(Syncfusion.EJ2.Charts.FeatureType.Rect))
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**2. Dot**
Displays the value as a dot/circle marker.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb.Type(Syncfusion.EJ2.Charts.FeatureType.Dot))
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Type Selection Guidelines

| Type | Best For | Visual Impact |
|------|----------|---------------|
| **Rect** | Standard metrics, continuous data | High visibility, clear comparison |
| **Dot** | Precise point values, minimal design | Subtle, precise positioning |

### Complete Type Example

```csharp
// Controller
public ActionResult Index()
{
    List<BulletChartData> rectData = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    
    List<BulletChartData> dotData = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    
    ViewBag.RectData = rectData;
    ViewBag.DotData = dotData;
    
    return View();
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h3>Rectangle Type (Default)</h3>
@(Html.EJS().BulletChart("rectChart")
    .DataSource((List<BulletChartData>)ViewBag.RectData)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb.Type(Syncfusion.EJ2.Charts.FeatureType.Rect))
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)

<h3>Dot Type</h3>
@(Html.EJS().BulletChart("dotChart")
    .DataSource((List<BulletChartData>)ViewBag.DotData)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb.Type(Syncfusion.EJ2.Charts.FeatureType.Dot))
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

## Border Customization

Customize the border around the value bar to enhance visibility or match design requirements.

### Border Color

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb
        .Border(b => b.Color("#2C3E50"))
    )
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Border Width

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueBar(vb => vb
        .Border(b => b
            .Color("#2C3E50")
            .Width(2)
        )
    )
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Width Guidelines:**
- `1`: Subtle border (default)
- `2-3`: Standard emphasis
- `4-5`: Strong emphasis
- `>5`: May appear too thick

### Complete Border Example

```csharp
// Controller
public ActionResult BorderDemo()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { actualValue = 85, targetValue = 100 }
    };
    return View(data);
}

public class MetricData
{
    public double actualValue { get; set; }
    public double targetValue { get; set; }
}
```

```cshtml
@model List<MetricData>

@(Html.EJS().BulletChart("borderedChart")
    .DataSource(Model)
    .ValueField("actualValue")
    .TargetField("targetValue")
    .Title("Sales Performance with Emphasized Border")
    .ValueBar(vb => vb
        .Border(b => b
            .Color("#E74C3C")
            .Width(3)
        )
    )
    .Minimum(0)
    .Maximum(120)
    .Interval(20)
    .Ranges(r => {
        r.End(60).Color("#F8D7DA").Add();
        r.End(90).Color("#FFF3CD").Add();
        r.End(120).Color("#D4EDDA").Add();
    })
    .Render()
)
```

## Fill and Color

Control the interior color of the value bar to match your application theme or convey meaning.

### Basic Fill Color

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueFill("#3498DB")  // Blue fill
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Note:** Use `ValueFill` property at the chart level, not within `ValueBar()` configuration.

### Color Options

```cshtml
<!-- Hex Color -->
@(Html.EJS().BulletChart("chart1")
    .ValueFill("#E74C3C")
    .Render()
)

<!-- RGB Color -->
@(Html.EJS().BulletChart("chart2")
    .ValueFill("rgb(52, 152, 219)")
    .Render()
)

<!-- Named Color -->
@(Html.EJS().BulletChart("chart3")
    .ValueFill("steelblue")
    .Render()
)
```

### Conditional Coloring Based on Performance

```csharp
// Controller
public ActionResult ConditionalColor()
{
    double actualValue = 75;
    double targetValue = 100;
    
    // Determine color based on performance
    string barColor = actualValue >= targetValue ? "#28A745" : // Green if met/exceeded
                      actualValue >= targetValue * 0.8 ? "#FFC107" : // Yellow if close
                      "#DC3545"; // Red if far below
    
    ViewBag.BarColor = barColor;
    
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

@(Html.EJS().BulletChart("dynamicColorChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueFill(ViewBag.BarColor)
    .Title("Performance-Based Coloring")
    .Minimum(0)
    .Maximum(120)
    .Interval(20)
    .Render()
)
```

### Combined Fill and Border

```cshtml
@(Html.EJS().BulletChart("styledChart")
    .DataSource(Model)
    .ValueField("revenue")
    .TargetField("quota")
    .ValueFill("#3498DB")
    .ValueBar(vb => vb
        .Border(b => b
            .Color("#2C3E50")
            .Width(2)
        )
    )
    .Minimum(0)
    .Maximum(500000)
    .Interval(100000)
    .Render()
)
```

## Height and Width

Control the thickness of the value bar for visual emphasis or space optimization.

### Value Height

Adjusts the thickness of the value bar (width in vertical orientation).

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueHeight(15)  // Thickness in pixels
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Height Guidelines:**
- `5-10`: Thin bar, subtle display
- `10-15`: Standard thickness (default ~10)
- `15-25`: Emphasized, prominent
- `>25`: May appear too thick relative to chart

### Comparing Different Heights

```csharp
// Controller
public ActionResult HeightComparison()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.ThinData = data;
    ViewBag.StandardData = data;
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
<h3>Thin Value Bar (Height: 8)</h3>
@(Html.EJS().BulletChart("thinChart")
    .DataSource((List<MetricData>)ViewBag.ThinData)
    .ValueField("value")
    .TargetField("target")
    .ValueHeight(8)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("60")
    .Render()
)

<h3>Standard Value Bar (Height: 15)</h3>
@(Html.EJS().BulletChart("standardChart")
    .DataSource((List<MetricData>)ViewBag.StandardData)
    .ValueField("value")
    .TargetField("target")
    .ValueHeight(15)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("60")
    .Render()
)

<h3>Thick Value Bar (Height: 25)</h3>
@(Html.EJS().BulletChart("thickChart")
    .DataSource((List<MetricData>)ViewBag.ThickData)
    .ValueField("value")
    .TargetField("target")
    .ValueHeight(25)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Height("60")
    .Render()
)
```

## Complete Examples

### Example 1: Fully Customized Value Bar

```csharp
// Controller
public ActionResult CustomValueBar()
{
    List<SalesData> data = new List<SalesData>
    {
        new SalesData 
        { 
            actualSales = 425000,
            targetSales = 500000,
            region = "Northeast"
        }
    };
    return View(data);
}

public class SalesData
{
    public double actualSales { get; set; }
    public double targetSales { get; set; }
    public string region { get; set; }
}
```

```cshtml
@model List<SalesData>

@{
    ViewBag.Title = "Sales Dashboard";
}

<div style="padding: 30px;">
    <h2>@Model[0].region Region Sales</h2>
    
    @(Html.EJS().BulletChart("customValueBar")
        .DataSource(Model)
        .ValueField("actualSales")
        .TargetField("targetSales")
        .Title("Revenue Performance ($)")
        .Subtitle("Fiscal Year 2024")
        .ValueFill("#2980B9")
        .ValueHeight(18)
        .ValueBar(vb => vb
            .Type(Syncfusion.EJ2.Charts.FeatureType.Rect)
            .Border(b => b
                .Color("#1A5276")
                .Width(2)
            )
        )
        .Minimum(0)
        .Maximum(600000)
        .Interval(100000)
        .LabelFormat("${value}k")
        .Ranges(r => {
            r.End(300000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(450000).Color("#F39C12").Opacity(0.3).Add();
            r.End(600000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Tooltip(t => t.Enable(true))
        .Width("85%")
        .Height("120")
        .Render()
    )
    
    <div style="margin-top: 20px;">
        <p><strong>Actual:</strong> $@Model[0].actualSales.ToString("N0")</p>
        <p><strong>Target:</strong> $@Model[0].targetSales.ToString("N0")</p>
        <p><strong>Achievement:</strong> @((Model[0].actualSales / Model[0].targetSales * 100).ToString("F1"))%</p>
    </div>
</div>
```

### Example 2: Multiple Charts with Consistent Styling

```csharp
// Controller
public ActionResult Dashboard()
{
    ViewBag.SalesData = new List<MetricData>
    {
        new MetricData { value = 8500, target = 10000 }
    };
    
    ViewBag.LeadsData = new List<MetricData>
    {
        new MetricData { value = 450, target = 500 }
    };
    
    ViewBag.ConversionData = new List<MetricData>
    {
        new MetricData { value = 18.5, target = 20.0 }
    };
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<style>
    .metric-card {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>

<div class="dashboard">
    <h1>Monthly Performance Dashboard</h1>
    
    <div class="metric-card">
        <h3>Sales ($1000s)</h3>
        @(Html.EJS().BulletChart("salesChart")
            .DataSource((List<MetricData>)ViewBag.SalesData)
            .ValueField("value")
            .TargetField("target")
            .ValueFill("#3498DB")
            .ValueHeight(15)
            .ValueBar(vb => vb.Border(b => b.Color("#2C3E50").Width(2)))
            .Minimum(0)
            .Maximum(12000)
            .Interval(2000)
            .Ranges(r => {
                r.End(6000).Color("#E74C3C").Opacity(0.3).Add();
                r.End(9000).Color("#F39C12").Opacity(0.3).Add();
                r.End(12000).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("100%")
            .Height("100")
            .Render()
        )
    </div>
    
    <div class="metric-card">
        <h3>Qualified Leads</h3>
        @(Html.EJS().BulletChart("leadsChart")
            .DataSource((List<MetricData>)ViewBag.LeadsData)
            .ValueField("value")
            .TargetField("target")
            .ValueFill("#3498DB")
            .ValueHeight(15)
            .ValueBar(vb => vb.Border(b => b.Color("#2C3E50").Width(2)))
            .Minimum(0)
            .Maximum(600)
            .Interval(100)
            .Ranges(r => {
                r.End(300).Color("#E74C3C").Opacity(0.3).Add();
                r.End(450).Color("#F39C12").Opacity(0.3).Add();
                r.End(600).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("100%")
            .Height("100")
            .Render()
        )
    </div>
    
    <div class="metric-card">
        <h3>Conversion Rate (%)</h3>
        @(Html.EJS().BulletChart("conversionChart")
            .DataSource((List<MetricData>)ViewBag.ConversionData)
            .ValueField("value")
            .TargetField("target")
            .ValueFill("#3498DB")
            .ValueHeight(15)
            .ValueBar(vb => vb.Border(b => b.Color("#2C3E50").Width(2)))
            .Minimum(0)
            .Maximum(25)
            .Interval(5)
            .LabelFormat("{value}%")
            .Ranges(r => {
                r.End(12.5).Color("#E74C3C").Opacity(0.3).Add();
                r.End(18.75).Color("#F39C12").Opacity(0.3).Add();
                r.End(25).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("100%")
            .Height("100")
            .Render()
        )
    </div>
</div>
```

## Best Practices

### 1. Choose Appropriate Type
- **Rect**: For most use cases, provides clear visual comparison
- **Dot**: When precise value positioning matters more than bar length

### 2. Use Contrasting Colors
Ensure value bar color contrasts well with:
- Range background colors
- Chart background
- Target marker color

```cshtml
<!-- Good contrast example -->
.ValueFill("#2C3E50")  <!-- Dark blue bar -->
.Ranges(r => {
    r.End(150).Color("#F8D7DA").Add();  <!-- Light red range -->
    r.End(250).Color("#FFF3CD").Add();  <!-- Light yellow range -->
    r.End(300).Color("#D4EDDA").Add();  <!-- Light green range -->
})
```

### 3. Maintain Consistent Styling
When displaying multiple charts, keep value bar styling consistent for professional appearance and easier comparison.

### 4. Balance Height with Chart Size
Scale `ValueHeight` proportionally to overall chart height:
- Small charts (60-80px): Use height 8-12
- Medium charts (100-120px): Use height 12-18
- Large charts (>120px): Use height 18-25

### 5. Use Borders Sparingly
Add borders only when needed for:
- Emphasis
- Distinguishing from similar-colored ranges
- Meeting specific design requirements

### 6. Test Visibility
Ensure value bar is clearly visible against all range colors, especially with opacity applied to ranges.

## Common Scenarios

### Scenario 1: High-Performance Indicator
```cshtml
.ValueFill("#27AE60")  <!-- Green for success -->
.ValueHeight(20)  <!-- Emphasized thickness -->
```

### Scenario 2: Low-Performance Warning
```cshtml
.ValueFill("#E74C3C")  <!-- Red for alert -->
.ValueBar(vb => vb.Border(b => b.Color("#C0392B").Width(3)))  <!-- Strong border -->
```

### Scenario 3: Neutral/Informational
```cshtml
.ValueFill("#95A5A6")  <!-- Gray for neutral -->
.ValueHeight(12)  <!-- Standard thickness -->
```

### Scenario 4: Brand-Matched
```cshtml
.ValueFill("#FF6B35")  <!-- Custom brand color -->
.ValueBar(vb => vb.Border(b => b.Color("#DD4A1F").Width(2)))
```

## Troubleshooting

### Value Bar Not Visible
- Check `ValueFill` color isn't same as background
- Verify `ValueField` maps to correct data property
- Ensure data value is within Minimum/Maximum range
- Confirm `ValueHeight` isn't set to 0

### Border Not Showing
- Verify border width is at least 1
- Check border color contrasts with fill color
- Ensure border isn't same color as fill

### Incorrect Bar Length
- Verify `ValueField` property name matches data exactly
- Check data value type is numeric
- Confirm `Minimum` and `Maximum` encompass data range

You now have complete knowledge of customizing the value bar to create clear, visually appealing bullet chart visualizations!
