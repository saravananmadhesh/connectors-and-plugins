# Bullet Chart Dimensions

Control the size and dimensions of your bullet charts to fit various layouts, from compact dashboard widgets to full-width displays.

## Table of Contents
- [Overview](#overview)
- [Container-Based Sizing](#container-based-sizing)
- [Pixel Sizing](#pixel-sizing)
- [Percentage Sizing](#percentage-sizing)
- [Aspect Ratio Considerations](#aspect-ratio-considerations)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Common Sizing Patterns](#common-sizing-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

Bullet charts can be sized using three approaches:
1. **Container-based:** Chart fills its parent container
2. **Pixel sizing:** Fixed width and height in pixels
3. **Percentage sizing:** Responsive dimensions relative to container

**Default Dimensions:** If not specified, bullet charts render with a height of 126px and width matching the browser window.

## Container-Based Sizing

The bullet chart automatically fills its parent container when no explicit dimensions are set.

### Basic Container Sizing

```cshtml
<div id="chartContainer" style="width: 600px; height: 150px;">
    @(Html.EJS().BulletChart("chart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Minimum(0)
        .Maximum(300)
        .Render()
    )
</div>
```

**Result:** Chart renders at 600px × 150px, filling the container.

### CSS-Controlled Container

```cshtml
<style>
    .chart-wrapper {
        width: 800px;
        height: 120px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 5px;
    }
</style>

<div class="chart-wrapper">
    @(Html.EJS().BulletChart("containerChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales Performance")
        .Minimum(0)
        .Maximum(500000)
        .Interval(100000)
        .LabelFormat("${value}k")
        .Ranges(r => {
            r.End(250000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(375000).Color("#F39C12").Opacity(0.3).Add();
            r.End(500000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Render()
    )
</div>
```

### Responsive Container Example

```csharp
// Controller
public ActionResult ResponsiveChart()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
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

<style>
    .responsive-container {
        width: 100%;
        max-width: 1200px;
        height: 150px;
        margin: 0 auto;
        padding: 20px;
    }
    
    @media (max-width: 768px) {
        .responsive-container {
            height: 120px;
            padding: 10px;
        }
    }
</style>

<div class="responsive-container">
    @(Html.EJS().BulletChart("responsiveChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Title("Performance Metric")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Render()
    )
</div>
```

## Pixel Sizing

Set explicit dimensions in pixels for precise control over chart size.

### Basic Pixel Dimensions

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Width("700")       // 700 pixels wide
    .Height("120")      // 120 pixels tall
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Different Sizes Example

```csharp
// Controller
public ActionResult PixelSizes()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.SmallData = data;
    ViewBag.MediumData = data;
    ViewBag.LargeData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h2>Size Comparison - Pixels</h2>

<div style="margin-bottom: 30px;">
    <h3>Small (400 × 80)</h3>
    @(Html.EJS().BulletChart("smallChart")
        .DataSource((List<MetricData>)ViewBag.SmallData)
        .ValueField("value")
        .TargetField("target")
        .Title("Compact Size")
        .Width("400")
        .Height("80")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Render()
    )
</div>

<div style="margin-bottom: 30px;">
    <h3>Medium (600 × 110)</h3>
    @(Html.EJS().BulletChart("mediumChart")
        .DataSource((List<MetricData>)ViewBag.MediumData)
        .ValueField("value")
        .TargetField("target")
        .Title("Standard Size")
        .Width("600")
        .Height("110")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Render()
    )
</div>

<div style="margin-bottom: 30px;">
    <h3>Large (900 × 150)</h3>
    @(Html.EJS().BulletChart("largeChart")
        .DataSource((List<MetricData>)ViewBag.LargeData)
        .ValueField("value")
        .TargetField("target")
        .Title("Large Display Size")
        .Width("900")
        .Height("150")
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Render()
    )
</div>
```

### Size Guidelines

| Use Case | Width | Height | Description |
|----------|-------|--------|-------------|
| **Dashboard Widget** | 350-500px | 70-90px | Compact, fits in small cards |
| **Standard Metric** | 500-750px | 100-120px | Most common size |
| **Featured Display** | 750-1000px | 130-160px | Prominent charts |
| **Full Width** | 100% | 120-150px | Responsive width |

## Percentage Sizing

Use percentage values to create responsive charts that scale with their container.

### Basic Percentage Dimensions

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Width("90%")      // 90% of container width
    .Height("100")     // Fixed height in pixels
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Common Pattern:** Use percentage width for responsiveness, fixed pixel height for consistency.

### Fully Percentage-Based

```cshtml
<div style="width: 800px; height: 200px;">
    @(Html.EJS().BulletChart("percentChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Width("100%")   // Fills container width
        .Height("80%")   // 80% of container height (160px)
        .Minimum(0)
        .Maximum(300)
        .Render()
    )
</div>
```

### Responsive Dashboard Example

```csharp
// Controller
public ActionResult ResponsiveDashboard()
{
    ViewBag.RevenueData = new List<MetricData>
    {
        new MetricData { value = 8500, target = 10000 }
    };
    
    ViewBag.CustomersData = new List<MetricData>
    {
        new MetricData { value = 1450, target = 1500 }
    };
    
    ViewBag.SatisfactionData = new List<MetricData>
    {
        new MetricData { value = 4.3, target = 4.5 }
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
    .dashboard {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .metric-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .metric-card {
        flex: 1;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
        .metric-row {
            flex-direction: column;
        }
    }
</style>

<div class="dashboard">
    <h1>Performance Dashboard</h1>
    
    <div class="metric-row">
        <div class="metric-card">
            <h3>Revenue</h3>
            @(Html.EJS().BulletChart("revenueResponsive")
                .DataSource((List<MetricData>)ViewBag.RevenueData)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("100")
                .Minimum(0)
                .Maximum(12000)
                .Interval(2000)
                .LabelFormat("${value}K")
                .Ranges(r => {
                    r.End(6000).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(9000).Color("#F39C12").Opacity(0.3).Add();
                    r.End(12000).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
    </div>
    
    <div class="metric-row">
        <div class="metric-card">
            <h3>New Customers</h3>
            @(Html.EJS().BulletChart("customersResponsive")
                .DataSource((List<MetricData>)ViewBag.CustomersData)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("100")
                .Minimum(0)
                .Maximum(2000)
                .Interval(500)
                .Ranges(r => {
                    r.End(1000).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(1500).Color("#F39C12").Opacity(0.3).Add();
                    r.End(2000).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
        
        <div class="metric-card">
            <h3>Customer Satisfaction</h3>
            @(Html.EJS().BulletChart("satisfactionResponsive")
                .DataSource((List<MetricData>)ViewBag.SatisfactionData)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("100")
                .Minimum(0)
                .Maximum(5)
                .Interval(1)
                .LabelFormat("{value}")
                .Ranges(r => {
                    r.End(2.5).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(3.5).Color("#F39C12").Opacity(0.3).Add();
                    r.End(4.0).Color("#3498DB").Opacity(0.3).Add();
                    r.End(5.0).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
    </div>
</div>
```

## Aspect Ratio Considerations

### Horizontal Charts (Default)
**Recommended Ratios:**
- **Compact:** 4:1 to 6:1 (width:height) - e.g., 480×80, 600×100
- **Standard:** 6:1 to 8:1 - e.g., 600×100, 800×100
- **Wide:** 8:1 to 12:1 - e.g., 960×80, 1200×100

### Vertical Charts
**Recommended Ratios:**
- **Compact:** 1:3 to 1:4 (width:height) - e.g., 100×300, 120×400
- **Standard:** 1:4 to 1:6 - e.g., 100×500, 150×700

## Complete Examples

### Example 1: Multi-Size Dashboard

```csharp
// Controller
public ActionResult MultiSizeDashboard()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.FeaturedData = data;
    ViewBag.StandardData1 = data;
    ViewBag.StandardData2 = data;
    ViewBag.CompactData1 = data;
    ViewBag.CompactData2 = data;
    ViewBag.CompactData3 = data;
    
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
    .featured-metric {
        margin-bottom: 40px;
    }
    .standard-metrics {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
    }
    .compact-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    .metric-box {
        padding: 15px;
        background: #f8f9fa;
        border-radius: 5px;
    }
</style>

<div style="padding: 20px;">
    <h1>Executive Dashboard</h1>
    
    <!-- Featured Metric: Large -->
    <div class="featured-metric">
        <h2>Primary KPI</h2>
        @(Html.EJS().BulletChart("featured")
            .DataSource((List<MetricData>)ViewBag.FeaturedData)
            .ValueField("value")
            .TargetField("target")
            .Title("Revenue Performance")
            .Width("100%")
            .Height("150")
            .Minimum(0)
            .Maximum(300)
            .Interval(50)
            .Ranges(r => {
                r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                r.End(250).Color("#F39C12").Opacity(0.3).Add();
                r.End(300).Color("#27AE60").Opacity(0.3).Add();
            })
            .Render()
        )
    </div>
    
    <!-- Standard Metrics: Medium -->
    <div class="standard-metrics">
        <div class="metric-box" style="flex: 1;">
            <h3>Sales</h3>
            @(Html.EJS().BulletChart("standard1")
                .DataSource((List<MetricData>)ViewBag.StandardData1)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("100")
                .Minimum(0)
                .Maximum(300)
                .Interval(50)
                .Ranges(r => {
                    r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(250).Color("#F39C12").Opacity(0.3).Add();
                    r.End(300).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
        <div class="metric-box" style="flex: 1;">
            <h3>Customers</h3>
            @(Html.EJS().BulletChart("standard2")
                .DataSource((List<MetricData>)ViewBag.StandardData2)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("100")
                .Minimum(0)
                .Maximum(300)
                .Interval(50)
                .Ranges(r => {
                    r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(250).Color("#F39C12").Opacity(0.3).Add();
                    r.End(300).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
    </div>
    
    <!-- Compact Metrics: Small -->
    <div class="compact-metrics">
        <div class="metric-box">
            <h4>Metric 1</h4>
            @(Html.EJS().BulletChart("compact1")
                .DataSource((List<MetricData>)ViewBag.CompactData1)
                .ValueField("value")
                .TargetField("target")
                .Width("100%")
                .Height("70")
                .Minimum(0)
                .Maximum(300)
                .Interval(100)
                .Ranges(r => {
                    r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                    r.End(250).Color("#F39C12").Opacity(0.3).Add();
                    r.End(300).Color("#27AE60").Opacity(0.3).Add();
                })
                .Render()
            )
        </div>
        <!-- Similar for compact2 and compact3 -->
    </div>
</div>
```

## Best Practices

### 1. Choose Appropriate Dimensions
- **Small dashboards:** 400-600px wide, 70-100px tall
- **Standard displays:** 600-900px wide, 100-130px tall
- **Featured metrics:** 900-1200px wide, 130-160px tall

### 2. Maintain Proportions
- Typical horizontal bullet charts work best with 6:1 to 8:1 (width:height) ratio
- Avoid overly tall or overly wide proportions

### 3. Consider Content
- Allow space for titles, labels, and legends
- Taller charts accommodate longer titles/subtitles
- Wider charts display more axis labels clearly

### 4. Use Percentage for Responsiveness
- Set `Width="90%"` or `Width="100%"` for fluid layouts
- Use pixel heights for vertical consistency
- Test on different screen sizes

### 5. Test Readability
- Ensure labels don't overlap at smallest dimensions
- Verify value bars are visible at all sizes
- Check that target markers are distinguishable

### 6. Be Consistent
- Use same dimensions for related metrics in dashboards
- Maintain uniform sizing across similar chart types

## Common Sizing Patterns

### Pattern 1: Full-Width Responsive
```cshtml
.Width("100%")
.Height("120")
```

### Pattern 2: Fixed Dashboard Widget
```cshtml
.Width("500")
.Height("100")
```

### Pattern 3: Percentage in Container
```cshtml
.Width("85%")
.Height("110")
```

### Pattern 4: Compact Mobile
```cshtml
.Width("100%")
.Height("80")
```

## Troubleshooting

### Chart Too Small/Large
- Check container dimensions if using container-based sizing
- Verify Width and Height values are correct
- Inspect CSS that might override dimensions

### Responsive Sizing Not Working
- Ensure container has defined dimensions
- Check that parent elements don't have height: auto
- Use percentage widths with pixel heights for best results

### Labels Overlapping
- Increase chart height
- Reduce font sizes
- Increase Interval to show fewer labels
- Use shorter label formats

### Chart Cuts Off
- Verify container is large enough
- Check for CSS overflow: hidden
- Ensure padding/margins don't restrict space

You now have complete knowledge of controlling bullet chart dimensions for any layout scenario, from compact widgets to full-width displays!
