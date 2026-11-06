# Axis Customization

## Table of Contents
- [Overview](#overview)
- [Axis Range](#axis-range)
- [Tick Lines](#tick-lines)
- [Tick Placement](#tick-placement)
- [Label Formatting](#label-formatting)
- [Label Placement](#label-placement)
- [Opposed Position](#opposed-position)
- [Category Axis](#category-axis)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The bullet chart axis provides extensive customization options to control how values are displayed and scaled. Proper axis configuration ensures your data is presented clearly and accurately.

**Key Customization Areas:**
- Range (Minimum, Maximum, Interval)
- Tick lines (Major and Minor)
- Label formatting and placement
- Axis positioning
- Category labels

## Axis Range

Control the scale of your bullet chart using `Minimum`, `Maximum`, and `Interval` properties.

### Basic Range Configuration

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)        // Starting point
    .Maximum(300)      // Ending point
    .Interval(50)      // Distance between labels
    .Render()
)
```

**Guidelines:**
- **Minimum**: Should be 0 or lower than your smallest expected value
- **Maximum**: Should exceed your highest expected value with padding
- **Interval**: Choose values that create 4-8 labels for readability

### Dynamic Range Example

```csharp
// Controller
public ActionResult DynamicRange()
{
    double maxValue = 85000;
    double targetValue = 100000;
    
    // Calculate appropriate range
    double maximum = Math.Ceiling(Math.Max(maxValue, targetValue) * 1.2 / 10000) * 10000;
    double interval = maximum / 5;
    
    ViewBag.Maximum = maximum;
    ViewBag.Interval = interval;
    
    List<SalesData> data = new List<SalesData>
    {
        new SalesData { actual = maxValue, target = targetValue }
    };
    
    return View(data);
}

public class SalesData
{
    public double actual { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<SalesData>

@(Html.EJS().BulletChart("dynamicChart")
    .DataSource(Model)
    .ValueField("actual")
    .TargetField("target")
    .Minimum(0)
    .Maximum(ViewBag.Maximum)
    .Interval(ViewBag.Interval)
    .LabelFormat("${value}k")
    .Render()
)
```

## Tick Lines

Customize major and minor tick lines to enhance readability and visual appeal.

### Major Tick Lines

Major ticks appear at each interval mark on the axis.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .MajorTickLines(mtl => mtl
        .Width(2)
        .Height(10)
        .Color("#2C3E50")
    )
    .Render()
)
```

**Properties:**
- **Width**: Thickness of tick line (1-3 pixels recommended)
- **Height**: Length of tick line (8-15 pixels typical)
- **Color**: Line color (hex, RGB, or named)
- **UseRangeColor**: When true, tick color matches corresponding range

### Minor Tick Lines

Minor ticks subdivide major intervals for more precise value reading.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .MinorTicksPerInterval(4)
    .MinorTickLines(mtl => mtl
        .Width(1)
        .Height(5)
        .Color("#95A5A6")
    )
    .Render()
)
```

### Complete Tick Customization Example

```csharp
// Controller
public ActionResult CustomTicks()
{
    List<PerformanceData> data = new List<PerformanceData>
    {
        new PerformanceData { score = 275, benchmark = 250 }
    };
    return View(data);
}

public class PerformanceData
{
    public double score { get; set; }
    public double benchmark { get; set; }
}
```

```cshtml
@model List<PerformanceData>

@(Html.EJS().BulletChart("ticksChart")
    .DataSource(Model)
    .ValueField("score")
    .TargetField("benchmark")
    .Title("Performance Score with Custom Ticks")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .MajorTickLines(mtl => mtl
        .Width(2)
        .Height(12)
        .Color("#34495E")
    )
    .MinorTicksPerInterval(4)
    .MinorTickLines(mtl => mtl
        .Width(1)
        .Height(6)
        .Color("#BDC3C7")
    )
    .Ranges(r => {
        r.End(150).Color("#E74C3C").Opacity(0.3).Add();
        r.End(250).Color("#F39C12").Opacity(0.3).Add();
        r.End(300).Color("#27AE60").Opacity(0.3).Add();
    })
    .Width("90%")
    .Height("100")
    .Render()
)
```

### Using Range Colors for Ticks

```cshtml
@(Html.EJS().BulletChart("rangeColorTicks")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .MajorTickLines(mtl => mtl
        .Width(2)
        .Height(10)
        .UseRangeColor(true)  // Ticks match range colors
    )
    .Ranges(r => {
        r.End(150).Color("#DC3545").Add();
        r.End(250).Color("#FFC107").Add();
        r.End(300).Color("#28A745").Add();
    })
    .Render()
)
```

## Tick Placement

Position ticks inside or outside the ranges for different visual effects.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .TickPosition(Syncfusion.EJ2.Charts.TickPosition.Inside)  // or Outside
    .Render()
)
```

**Options:**
- **Inside**: Ticks appear within the range area
- **Outside**: Ticks extend beyond the range area (default)

### Comparison Example

```csharp
// Controller
public ActionResult TickPlacementComparison()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.InsideData = data;
    ViewBag.OutsideData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h3>Ticks Inside</h3>
@(Html.EJS().BulletChart("insideChart")
    .DataSource((List<MetricData>)ViewBag.InsideData)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .TickPosition(Syncfusion.EJ2.Charts.TickPosition.Inside)
    .MajorTickLines(mtl => mtl.Width(2).Height(10))
    .Height("80")
    .Render()
)

<h3>Ticks Outside (Default)</h3>
@(Html.EJS().BulletChart("outsideChart")
    .DataSource((List<MetricData>)ViewBag.OutsideData)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .TickPosition(Syncfusion.EJ2.Charts.TickPosition.Outside)
    .MajorTickLines(mtl => mtl.Width(2).Height(10))
    .Height("80")
    .Render()
)
```

## Label Formatting

Format axis labels to display values with appropriate units, decimals, or currency.

### Standard Format Strings

```cshtml
<!-- Currency Format -->
@(Html.EJS().BulletChart("chart1")
    .LabelFormat("c2")  <!-- $1,000.00 -->
    .Render()
)

<!-- Number with Decimals -->
@(Html.EJS().BulletChart("chart2")
    .LabelFormat("n1")  <!-- 1,000.0 -->
    .Render()
)

<!-- Percentage -->
@(Html.EJS().BulletChart("chart3")
    .LabelFormat("p0")  <!-- 10% -->
    .Render()
)
```

**Common Format Strings:**
| Format | Result | Description |
|--------|--------|-------------|
| `n0` | 1,000 | Number with no decimals |
| `n1` | 1,000.0 | Number with 1 decimal |
| `n2` | 1,000.00 | Number with 2 decimals |
| `c0` | $1,000 | Currency with no decimals |
| `c2` | $1,000.00 | Currency with 2 decimals |
| `p0` | 10% | Percentage with no decimals |
| `p1` | 10.0% | Percentage with 1 decimal |

### Custom Label Format

Use placeholders like `${value}` with custom text:

```cshtml
@(Html.EJS().BulletChart("customFormatChart")
    .DataSource(Model)
    .ValueField("sales")
    .TargetField("quota")
    .Minimum(0)
    .Maximum(500)
    .Interval(100)
    .LabelFormat("${value}K")  // Displays as: 0K, 100K, 200K, etc.
    .Render()
)
```

**Custom Format Examples:**
```cshtml
.LabelFormat("${value}K")      // 250K
.LabelFormat("${value}M")      // 250M
.LabelFormat("$${value}")      // $250
.LabelFormat("${value} units") // 250 units
.LabelFormat("${value}%")      // 250%
```

### Grouping Separator

Add thousand separators to large numbers:

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(1000000)
    .Interval(200000)
    .EnableGroupSeparator(true)  // Displays: 200,000, 400,000, etc.
    .Render()
)
```

### Complete Formatting Example

```csharp
// Controller
public ActionResult FormattedChart()
{
    List<RevenueData> data = new List<RevenueData>
    {
        new RevenueData { revenue = 425000, target = 500000 }
    };
    return View(data);
}

public class RevenueData
{
    public double revenue { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<RevenueData>

@(Html.EJS().BulletChart("formattedChart")
    .DataSource(Model)
    .ValueField("revenue")
    .TargetField("target")
    .Title("Revenue Performance")
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .EnableGroupSeparator(true)
    .Ranges(r => {
        r.End(300000).Color("#E74C3C").Opacity(0.3).Add();
        r.End(450000).Color("#F39C12").Opacity(0.3).Add();
        r.End(600000).Color("#27AE60").Opacity(0.3).Add();
    })
    .Width("90%")
    .Height("100")
    .Render()
)
```

## Label Placement

Position axis labels inside or outside the chart area.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .LabelPosition(Syncfusion.EJ2.Charts.LabelsPlacement.Inside)  // or Outside
    .Render()
)
```

**Options:**
- **Outside**: Labels appear below/outside the chart (default)
- **Inside**: Labels appear within the chart area

### Label Style Customization

```cshtml
@(Html.EJS().BulletChart("styledLabelChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .LabelStyle(ls => ls
        .Color("#2C3E50")
        .FontFamily("Arial")
        .FontSize("12px")
        .FontWeight("600")
        .Opacity(1)
        .UseRangeColor(false)
    )
    .Render()
)
```

**LabelStyle Properties:**
- **Color**: Text color
- **FontFamily**: Font family name
- **FontSize**: Size with unit (e.g., "12px")
- **FontWeight**: "normal", "bold", "600", etc.
- **FontStyle**: "normal", "italic", "oblique"
- **Opacity**: 0 to 1
- **UseRangeColor**: Match label color to range colors

## Opposed Position

Flip the axis to the opposite side of the chart.

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .OpposedPosition(true)  // Moves axis to top (horizontal) or right (vertical)
    .Render()
)
```

**Use Cases:**
- Creating mirror layouts
- Comparing two metrics back-to-back
- Design preference for top-positioned axes

### Comparison Example

```csharp
// Controller
public ActionResult OpposedComparison()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.NormalData = data;
    ViewBag.OpposedData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h3>Normal Position (Bottom)</h3>
@(Html.EJS().BulletChart("normalChart")
    .DataSource((List<MetricData>)ViewBag.NormalData)
    .ValueField("value")
    .TargetField("target")
    .Title("Standard Axis Position")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .OpposedPosition(false)
    .Height("80")
    .Render()
)

<h3>Opposed Position (Top)</h3>
@(Html.EJS().BulletChart("opposedChart")
    .DataSource((List<MetricData>)ViewBag.OpposedData)
    .ValueField("value")
    .TargetField("target")
    .Title("Opposed Axis Position")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .OpposedPosition(true)
    .Height("80")
    .Render()
)
```

## Category Axis

Display categorical labels on the axis for qualitative data.

### Basic Category Axis

```csharp
// Controller
public ActionResult CategoryAxis()
{
    List<CategoryData> data = new List<CategoryData>
    {
        new CategoryData { category = "Product A", value = 270, target = 250 }
    };
    return View(data);
}

public class CategoryData
{
    public string category { get; set; }
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<CategoryData>

@(Html.EJS().BulletChart("categoryChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .CategoryField("category")  // Maps to category property
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

### Category Label Customization

```cshtml
@(Html.EJS().BulletChart("styledCategoryChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .CategoryField("category")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .CategoryLabelStyle(cls => cls
        .Color("#2C3E50")
        .FontFamily("Arial")
        .FontSize("14px")
        .FontWeight("bold")
        .Opacity(1)
        .UseRangeColor(false)
    )
    .Render()
)
```

### Multiple Categories Example

```csharp
// Controller
public ActionResult MultiCategory()
{
    ViewBag.ProductA = new List<CategoryData>
    {
        new CategoryData { category = "Product A", value = 270, target = 250 }
    };
    
    ViewBag.ProductB = new List<CategoryData>
    {
        new CategoryData { category = "Product B", value = 210, target = 230 }
    };
    
    ViewBag.ProductC = new List<CategoryData>
    {
        new CategoryData { category = "Product C", value = 290, target = 280 }
    };
    
    return View();
}

public class CategoryData
{
    public string category { get; set; }
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<style>
    .product-card { margin-bottom: 25px; }
</style>

<h2>Product Performance Comparison</h2>

<div class="product-card">
    @(Html.EJS().BulletChart("productA")
        .DataSource((List<CategoryData>)ViewBag.ProductA)
        .ValueField("value")
        .TargetField("target")
        .CategoryField("category")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>

<div class="product-card">
    @(Html.EJS().BulletChart("productB")
        .DataSource((List<CategoryData>)ViewBag.ProductB)
        .ValueField("value")
        .TargetField("target")
        .CategoryField("category")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>

<div class="product-card">
    @(Html.EJS().BulletChart("productC")
        .DataSource((List<CategoryData>)ViewBag.ProductC)
        .ValueField("value")
        .TargetField("target")
        .CategoryField("category")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("90")
        .Render()
    )
</div>
```

## Complete Examples

### Example: Fully Customized Axis

```csharp
// Controller
public ActionResult FullyCustomizedAxis()
{
    List<SalesMetric> data = new List<SalesMetric>
    {
        new SalesMetric 
        { 
            region = "Northeast",
            sales = 425000,
            quota = 500000
        }
    };
    return View(data);
}

public class SalesMetric
{
    public string region { get; set; }
    public double sales { get; set; }
    public double quota { get; set; }
}
```

```cshtml
@model List<SalesMetric>

@(Html.EJS().BulletChart("fullCustomChart")
    .DataSource(Model)
    .ValueField("sales")
    .TargetField("quota")
    .CategoryField("region")
    .Title("Regional Sales Performance")
    .Subtitle("Q1 2024")
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .EnableGroupSeparator(true)
    .LabelPosition(Syncfusion.EJ2.Charts.LabelsPlacement.Outside)
    .LabelStyle(ls => ls
        .Color("#34495E")
        .FontFamily("Segoe UI")
        .FontSize("11px")
        .FontWeight("500")
    )
    .CategoryLabelStyle(cls => cls
        .Color("#2C3E50")
        .FontFamily("Segoe UI")
        .FontSize("13px")
        .FontWeight("bold")
    )
    .MajorTickLines(mtl => mtl
        .Width(2)
        .Height(10)
        .Color("#34495E")
    )
    .MinorTicksPerInterval(4)
    .MinorTickLines(mtl => mtl
        .Width(1)
        .Height(5)
        .Color("#95A5A6")
    )
    .TickPosition(Syncfusion.EJ2.Charts.TickPosition.Outside)
    .OpposedPosition(false)
    .Ranges(r => {
        r.End(300000).Color("#E74C3C").Opacity(0.3).Add();
        r.End(450000).Color("#F39C12").Opacity(0.3).Add();
        r.End(600000).Color("#27AE60").Opacity(0.3).Add();
    })
    .ValueFill("#3498DB")
    .TargetColor("#E74C3C")
    .TargetWidth(5)
    .Tooltip(t => t.Enable(true))
    .Width("90%")
    .Height("120")
    .Render()
)
```

## Best Practices

### 1. Choose Appropriate Ranges
- Ensure Minimum and Maximum encompass all data with padding
- Use round numbers for clean appearance
- Set Interval to create 4-8 labels for readability

### 2. Format Labels Clearly
- Use appropriate units ($, %, K, M, etc.)
- Enable grouping separators for large numbers
- Keep format strings consistent across related charts

### 3. Balance Visual Elements
- Use subtle colors for minor ticks
- Make major ticks more prominent
- Ensure tick lines don't overpower the data

### 4. Test Readability
- Verify labels don't overlap
- Check tick visibility against range colors
- Ensure text is legible at target display size

### 5. Maintain Consistency
- Use same axis configuration across dashboards
- Keep formatting consistent for related metrics
- Apply uniform styling to all charts in a view

## Troubleshooting

### Labels Overlapping
- Increase Interval
- Reduce FontSize in LabelStyle
- Use shorter LabelFormat strings

### Ticks Not Visible
- Increase tick Width or Height
- Check tick Color contrasts with background
- Verify TickPosition is appropriate

### Category Labels Not Showing
- Confirm CategoryField matches data property name exactly
- Check data source contains category values
- Verify CategoryLabelStyle is configured

You now have comprehensive knowledge of bullet chart axis customization to create professional, readable visualizations!
