# Data Labels

Data labels display the actual value directly on the bullet chart, providing immediate visibility of the measured value without requiring hover interactions or tooltips.

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Font Customization](#font-customization)
- [Color Contrast](#color-contrast)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Combining with Other Features](#combining-with-other-features)
- [Troubleshooting](#troubleshooting)

## Overview

Data labels identify and display the value of the actual bar in the bullet chart. They enhance readability by showing exact values directly on the visualization, eliminating the need for users to interpret the bar length against the axis scale.

**Purpose:**
- Display exact actual values on the chart
- Improve quick readability of metrics
- Reduce dependency on axis scales for value interpretation
- Enhance accessibility for users who need precise values

## Enabling Data Labels

Data labels are disabled by default. Enable them using the `DataLabel` property's `Enable` setting.

### Basic Data Label

```csharp
// Controller
public ActionResult Index()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    return View(data);
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<BulletChartData>

@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .DataLabel(dl => dl.Enable(true))  // Enable data labels
    .Render()
)
```

**Result:** The value "270" will be displayed directly on the value bar.

## Font Customization

Customize the appearance of data label text using the `LabelStyle` property within `DataLabel`.

### Font Properties

```cshtml
@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls
            .Color("#FFFFFF")
            .FontFamily("Segoe UI")
            .FontSize("14px")
            .FontWeight("bold")
            .FontStyle("normal")
            .Opacity(1)
        )
    )
    .Render()
)
```

**Available Properties:**
- **Color**: Text color (hex, RGB, or named color)
- **FontFamily**: Font family name (e.g., "Arial", "Segoe UI")
- **FontSize**: Size with unit (e.g., "12px", "14px")
- **FontWeight**: Weight value ("normal", "bold", "600", "700")
- **FontStyle**: Style ("normal", "italic", "oblique")
- **Opacity**: Transparency (0 to 1)

### Complete Font Customization Example

```csharp
// Controller
public ActionResult StyledLabels()
{
    List<SalesData> data = new List<SalesData>
    {
        new SalesData { actualSales = 425000, targetSales = 500000 }
    };
    return View(data);
}

public class SalesData
{
    public double actualSales { get; set; }
    public double targetSales { get; set; }
}
```

```cshtml
@model List<SalesData>

@(Html.EJS().BulletChart("styledChart")
    .DataSource(Model)
    .ValueField("actualSales")
    .TargetField("targetSales")
    .Title("Sales Performance with Styled Labels")
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .ValueFill("#3498DB")
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls
            .Color("#FFFFFF")
            .FontFamily("Arial")
            .FontSize("16px")
            .FontWeight("bold")
            .Opacity(1)
        )
    )
    .Ranges(r => {
        r.End(300000).Color("#E74C3C").Opacity(0.3).Add();
        r.End(450000).Color("#F39C12").Opacity(0.3).Add();
        r.End(600000).Color("#27AE60").Opacity(0.3).Add();
    })
    .Width("90%")
    .Height("110")
    .Render()
)
```

## Color Contrast

Ensure data label text is readable by choosing colors that contrast well with the value bar color.

### High Contrast Examples

```cshtml
<!-- White text on dark bar -->
@(Html.EJS().BulletChart("darkChart")
    .ValueFill("#2C3E50")  <!-- Dark blue bar -->
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls.Color("#FFFFFF"))  <!-- White text -->
    )
    .Render()
)

<!-- Dark text on light bar -->
@(Html.EJS().BulletChart("lightChart")
    .ValueFill("#E8F4F8")  <!-- Light blue bar -->
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls.Color("#2C3E50"))  <!-- Dark text -->
    )
    .Render()
)
```

### Dynamic Color Based on Bar Color

```csharp
// Controller
public ActionResult DynamicLabelColor()
{
    string barColor = "#2980B9";
    
    // Determine if bar is dark or light to choose contrasting text color
    string labelColor = "#FFFFFF"; // White for dark bars
    
    ViewBag.BarColor = barColor;
    ViewBag.LabelColor = labelColor;
    
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

@(Html.EJS().BulletChart("dynamicColorChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueFill(ViewBag.BarColor)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls
            .Color(ViewBag.LabelColor)
            .FontSize("14px")
            .FontWeight("bold")
        )
    )
    .Render()
)
```

## Complete Examples

### Example 1: Dashboard with Data Labels

```csharp
// Controller
public ActionResult Dashboard()
{
    ViewBag.RevenueData = new List<MetricData>
    {
        new MetricData { value = 8500, target = 10000 }
    };
    
    ViewBag.CustomerData = new List<MetricData>
    {
        new MetricData { value = 1250, target = 1500 }
    };
    
    ViewBag.SatisfactionData = new List<MetricData>
    {
        new MetricData { value = 4.2, target = 4.5 }
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
        background: #f8f9fa;
        border-radius: 5px;
    }
</style>

<h1>KPI Dashboard with Data Labels</h1>

<div class="metric-card">
    <h3>Revenue ($1000s)</h3>
    @(Html.EJS().BulletChart("revenueChart")
        .DataSource((List<MetricData>)ViewBag.RevenueData)
        .ValueField("value")
        .TargetField("target")
        .ValueFill("#3498DB")
        .Minimum(0)
        .Maximum(12000)
        .Interval(2000)
        .DataLabel(dl => dl
            .Enable(true)
            .LabelStyle(ls => ls
                .Color("#FFFFFF")
                .FontSize("14px")
                .FontWeight("600")
            )
        )
        .Ranges(r => {
            r.End(6000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(9000).Color("#F39C12").Opacity(0.3).Add();
            r.End(12000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("100%")
        .Height("100")
        .Render()
    )
    <p><strong>Current:</strong> $8,500K | <strong>Target:</strong> $10,000K</p>
</div>

<div class="metric-card">
    <h3>New Customers</h3>
    @(Html.EJS().BulletChart("customerChart")
        .DataSource((List<MetricData>)ViewBag.CustomerData)
        .ValueField("value")
        .TargetField("target")
        .ValueFill("#9B59B6")
        .Minimum(0)
        .Maximum(2000)
        .Interval(500)
        .DataLabel(dl => dl
            .Enable(true)
            .LabelStyle(ls => ls
                .Color("#FFFFFF")
                .FontSize("14px")
                .FontWeight("600")
            )
        )
        .Ranges(r => {
            r.End(1000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(1500).Color("#F39C12").Opacity(0.3).Add();
            r.End(2000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("100%")
        .Height("100")
        .Render()
    )
    <p><strong>Current:</strong> 1,250 | <strong>Target:</strong> 1,500</p>
</div>

<div class="metric-card">
    <h3>Customer Satisfaction</h3>
    @(Html.EJS().BulletChart("satisfactionChart")
        .DataSource((List<MetricData>)ViewBag.SatisfactionData)
        .ValueField("value")
        .TargetField("target")
        .ValueFill("#16A085")
        .Minimum(0)
        .Maximum(5)
        .Interval(1)
        .LabelFormat("{value}")
        .DataLabel(dl => dl
            .Enable(true)
            .LabelStyle(ls => ls
                .Color("#FFFFFF")
                .FontSize("14px")
                .FontWeight("600")
            )
        )
        .Ranges(r => {
            r.End(2.5).Color("#E74C3C").Opacity(0.3).Add();
            r.End(3.5).Color("#F39C12").Opacity(0.3).Add();
            r.End(4.0).Color("#3498DB").Opacity(0.3).Add();
            r.End(5.0).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("100%")
        .Height("100")
        .Render()
    )
    <p><strong>Current:</strong> 4.2/5.0 | <strong>Target:</strong> 4.5/5.0</p>
</div>
```

### Example 2: Formatted Data Labels

```csharp
// Controller
public ActionResult FormattedLabels()
{
    List<FinancialData> data = new List<FinancialData>
    {
        new FinancialData { revenue = 2750000, budget = 3000000 }
    };
    return View(data);
}

public class FinancialData
{
    public double revenue { get; set; }
    public double budget { get; set; }
}
```

```cshtml
@model List<FinancialData>

@{
    ViewBag.Title = "Financial Performance";
}

<div style="padding: 30px;">
    <h2>Q1 Revenue vs Budget</h2>
    
    @(Html.EJS().BulletChart("financialChart")
        .DataSource(Model)
        .ValueField("revenue")
        .TargetField("budget")
        .Title("Revenue ($M)")
        .Subtitle("Against Annual Budget")
        .ValueFill("#27AE60")
        .TargetColor("#E74C3C")
        .TargetWidth(5)
        .Minimum(0)
        .Maximum(3500000)
        .Interval(500000)
        .LabelFormat("${value}M")
        .EnableGroupSeparator(true)
        .DataLabel(dl => dl
            .Enable(true)
            .LabelStyle(ls => ls
                .Color("#FFFFFF")
                .FontFamily("Segoe UI")
                .FontSize("16px")
                .FontWeight("bold")
            )
        )
        .Ranges(r => {
            r.End(1500000).Color("#E74C3C").Opacity(0.3).Add();  // Below 50%
            r.End(2500000).Color("#F39C12").Opacity(0.3).Add();  // 50-83%
            r.End(3500000).Color("#27AE60").Opacity(0.3).Add();  // Above 83%
        })
        .Tooltip(t => t.Enable(true))
        .Width("90%")
        .Height("120")
        .Render()
    )
    
    <div style="margin-top: 20px;">
        <h4>Summary:</h4>
        <p><strong>Revenue:</strong> $@Model[0].revenue.ToString("N0")</p>
        <p><strong>Budget:</strong> $@Model[0].budget.ToString("N0")</p>
        <p><strong>Achievement:</strong> @((Model[0].revenue / Model[0].budget * 100).ToString("F1"))%</p>
    </div>
</div>
```

## Best Practices

### 1. Use High Contrast Colors
Ensure label text is easily readable:
- White text on dark bars
- Dark text on light bars
- Test color combinations for readability

### 2. Appropriate Font Size
Choose font sizes based on chart size:
- Small charts (60-80px): 11-13px
- Medium charts (100-120px): 13-15px
- Large charts (>120px): 15-18px

### 3. Keep Labels Concise
Data labels should display values clearly without cluttering:
- Use formatted numbers (K, M notation for large values)
- Avoid excessive decimal places
- Consider omitting labels if space is limited

### 4. Balance with Tooltips
- Use data labels for primary values that need immediate visibility
- Use tooltips for additional details or secondary information
- Don't duplicate the same information in both

### 5. Maintain Consistency
When displaying multiple charts:
- Use consistent font styles across all charts
- Apply uniform color schemes
- Keep font sizes proportional

## Common Scenarios

### Scenario 1: Percentage Display
```cshtml
.ValueField("completionRate")  // Value is 0.85 (85%)
.LabelFormat("p0")  // Displays as 85%
.DataLabel(dl => dl.Enable(true))
```

### Scenario 2: Currency Display
```cshtml
.ValueField("revenue")
.LabelFormat("c0")  // Displays as $425,000
.DataLabel(dl => dl.Enable(true))
```

### Scenario 3: Abbreviated Large Numbers
```cshtml
.ValueField("sales")  // Value is 425000
.LabelFormat("${value}K")  // Displays as $425K
.DataLabel(dl => dl.Enable(true))
```

### Scenario 4: Decimal Precision
```cshtml
.ValueField("rating")  // Value is 4.25
.LabelFormat("n2")  // Displays as 4.25
.DataLabel(dl => dl.Enable(true))
```

## Combining with Other Features

### Data Labels with Tooltips

```cshtml
@(Html.EJS().BulletChart("combinedChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .DataLabel(dl => dl
        .Enable(true)
        .LabelStyle(ls => ls
            .Color("#FFFFFF")
            .FontSize("14px")
            .FontWeight("600")
        )
    )
    .Tooltip(t => t
        .Enable(true)
        .Fill("#34495E")
        .TextStyle(ts => ts.Color("#FFFFFF"))
    )
    .Render()
)
```

**Benefit:** Data labels show immediate values; tooltips provide additional context on hover.

### Data Labels with Custom Value Formatting

```csharp
// Controller
public ActionResult CustomFormat()
{
    double value = 8500;
    string formattedLabel = $"${value / 1000}K";
    
    ViewBag.FormattedLabel = formattedLabel;
    
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = value, target = 10000 }
    };
    
    return View(data);
}
```

## Troubleshooting

### Data Labels Not Visible
- Verify `Enable` is set to `true`
- Check label color contrasts with value bar color
- Ensure value bar is large enough to display labels
- Confirm data values are within axis range

### Text Clipped or Truncated
- Increase chart height
- Reduce font size
- Use shorter format strings (K, M notation)
- Increase value bar height

### Poor Readability
- Increase color contrast between text and bar
- Use bold font weight
- Increase font size
- Add opacity to range colors to reduce background interference

### Labels Overlapping Other Elements
- Adjust chart dimensions
- Reduce font size
- Consider disabling labels if space is too limited
- Use tooltips instead for detailed values

You now have complete knowledge of implementing and customizing data labels in bullet charts for clear, immediate value visibility!
