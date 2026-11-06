# Title and Tooltip

## Table of Contents
- [Title](#title)
- [Subtitle](#subtitle)
- [Title Positioning](#title-positioning)
- [Title Styling](#title-styling)
- [Tooltip](#tooltip)
- [Tooltip Customization](#tooltip-customization)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Title

The title provides context about the data displayed in the bullet chart. It helps users quickly understand what metric or measurement the chart represents.

### Basic Title

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
    .Title("Sales Performance")  // Add title
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

**Result:** "Sales Performance" appears as the chart title.

### Title with Data Context

```csharp
// Controller
public ActionResult SalesReport()
{
    string period = "Q1 2024";
    string metric = "Revenue";
    ViewBag.Title = $"{metric} - {period}";
    
    List<SalesData> data = new List<SalesData>
    {
        new SalesData { revenue = 425000, target = 500000 }
    };
    
    return View(data);
}

public class SalesData
{
    public double revenue { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<SalesData>

@(Html.EJS().BulletChart("salesChart")
    .DataSource(Model)
    .ValueField("revenue")
    .TargetField("target")
    .Title(ViewBag.Title)
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .Render()
)
```

## Subtitle

Subtitles provide additional context or details about the data, such as time periods, units, or clarifications.

### Basic Subtitle

```cshtml
@model List<SalesData>

@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("revenue")
    .TargetField("target")
    .Title("Revenue Performance")
    .Subtitle("In thousands of dollars")  // Add subtitle
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .Render()
)
```

### Title and Subtitle Together

```cshtml
@(Html.EJS().BulletChart("completChart")
    .DataSource(Model)
    .ValueField("sales")
    .TargetField("quota")
    .Title("Monthly Sales")
    .Subtitle("March 2024 - vs Quarterly Quota")
    .Minimum(0)
    .Maximum(150000)
    .Interval(25000)
    .LabelFormat("${value}k")
    .Ranges(r => {
        r.End(75000).Color("#E74C3C").Opacity(0.3).Add();
        r.End(112500).Color("#F39C12").Opacity(0.3).Add();
        r.End(150000).Color("#27AE60").Opacity(0.3).Add();
    })
    .Width("90%")
    .Height("110")
    .Render()
)
```

## Title Positioning

Control where the title and subtitle appear relative to the chart using the `TitlePosition` property.

### Available Positions

**Options:**
- **Top** (default): Title above the chart
- **Bottom**: Title below the chart
- **Left**: Title to the left of the chart
- **Right**: Title to the right of the chart

### Top Position (Default)

```cshtml
@(Html.EJS().BulletChart("topChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Performance Metric")
    .Subtitle("Current Quarter")
    .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Top)
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Left Position

```cshtml
@(Html.EJS().BulletChart("leftChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Revenue")
    .Subtitle("Q1 2024")
    .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Left)
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Use Case:** Common in dashboards where multiple bullet charts are stacked vertically with left-aligned titles creating a clean column layout.

### Right Position

```cshtml
@(Html.EJS().BulletChart("rightChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Sales")
    .Subtitle("Target: $500K")
    .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Right)
    .Minimum(0)
    .Maximum(600000)
    .Render()
)
```

### Bottom Position

```cshtml
@(Html.EJS().BulletChart("bottomChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Customer Satisfaction")
    .Subtitle("Out of 5.0")
    .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Bottom)
    .Minimum(0)
    .Maximum(5)
    .Render()
)
```

### Position Comparison Example

```csharp
// Controller
public ActionResult TitlePositions()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.TopData = data;
    ViewBag.LeftData = data;
    ViewBag.RightData = data;
    ViewBag.BottomData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h2>Title Position Examples</h2>

<div style="margin-bottom: 30px;">
    <h3>Top Position</h3>
    @(Html.EJS().BulletChart("topPosChart")
        .DataSource((List<MetricData>)ViewBag.TopData)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales Metric")
        .Subtitle("Q1 Performance")
        .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Top)
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Width("80%")
        .Height("90")
        .Render()
    )
</div>

<div style="margin-bottom: 30px;">
    <h3>Left Position</h3>
    @(Html.EJS().BulletChart("leftPosChart")
        .DataSource((List<MetricData>)ViewBag.LeftData)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales Metric")
        .Subtitle("Q1 Performance")
        .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Left)
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Width("80%")
        .Height("90")
        .Render()
    )
</div>

<!-- Similar for Right and Bottom positions -->
```

## Title Styling

Customize title appearance using `TitleStyle` and subtitle appearance using `SubtitleStyle`.

### Title Style Properties

```cshtml
@(Html.EJS().BulletChart("styledTitleChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Annual Revenue")
    .TitleStyle(ts => ts
        .Color("#2C3E50")
        .FontFamily("Segoe UI")
        .FontSize("18px")
        .FontWeight("bold")
        .FontStyle("normal")
        .Opacity(1)
        .TextAlignment("Center")
    )
    .Minimum(0)
    .Maximum(1000000)
    .Interval(200000)
    .Render()
)
```

**TitleStyle Properties:**
- **Color**: Text color
- **FontFamily**: Font family name
- **FontSize**: Size with unit
- **FontWeight**: "normal", "bold", or numeric (400, 600, 700)
- **FontStyle**: "normal", "italic", "oblique"
- **Opacity**: 0 to 1
- **TextAlignment**: "Near", "Center", "Far"

### Subtitle Style

```cshtml
@(Html.EJS().BulletChart("styledSubtitleChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Quarterly Performance")
    .Subtitle("Compared to target")
    .TitleStyle(ts => ts
        .Color("#2C3E50")
        .FontSize("16px")
        .FontWeight("bold")
    )
    .SubtitleStyle(ss => ss
        .Color("#7F8C8D")
        .FontFamily("Segoe UI")
        .FontSize("12px")
        .FontWeight("normal")
        .FontStyle("italic")
        .Opacity(0.9)
    )
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Complete Styled Title Example

```csharp
// Controller
public ActionResult StyledTitle()
{
    List<PerformanceData> data = new List<PerformanceData>
    {
        new PerformanceData { score = 8.5, benchmark = 9.0 }
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

@{
    ViewBag.Title = "Performance Dashboard";
}

<div style="padding: 30px; background: #f8f9fa;">
    @(Html.EJS().BulletChart("performanceChart")
        .DataSource(Model)
        .ValueField("score")
        .TargetField("benchmark")
        .Title("Employee Performance Score")
        .Subtitle("Against departmental benchmark")
        .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Top)
        .TitleStyle(ts => ts
            .Color("#2C3E50")
            .FontFamily("Segoe UI")
            .FontSize("20px")
            .FontWeight("bold")
            .TextAlignment("Center")
        )
        .SubtitleStyle(ss => ss
            .Color("#7F8C8D")
            .FontFamily("Segoe UI")
            .FontSize("14px")
            .FontStyle("italic")
            .TextAlignment("Center")
        )
        .Minimum(0)
        .Maximum(10)
        .Interval(2)
        .LabelFormat("{value}")
        .ValueFill("#3498DB")
        .TargetColor("#E74C3C")
        .TargetWidth(5)
        .Ranges(r => {
            r.End(5).Color("#E74C3C").Opacity(0.3).Add();
            r.End(7).Color("#F39C12").Opacity(0.3).Add();
            r.End(8.5).Color("#3498DB").Opacity(0.3).Add();
            r.End(10).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("130")
        .Render()
    )
</div>
```

## Tooltip

Tooltips display additional information when users hover over the bullet chart elements. They're useful for showing exact values and providing context without cluttering the visual.

### Enabling Tooltip

```cshtml
@model List<BulletChartData>

@(Html.EJS().BulletChart("chart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Tooltip(t => t.Enable(true))  // Enable tooltip
    .Render()
)
```

**Default Behavior:** Displays actual and target values on hover.

### Basic Tooltip Example

```csharp
// Controller
public ActionResult WithTooltip()
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

@(Html.EJS().BulletChart("tooltipChart")
    .DataSource(Model)
    .ValueField("sales")
    .TargetField("quota")
    .Title("Sales vs Quota")
    .Minimum(0)
    .Maximum(600000)
    .Interval(100000)
    .LabelFormat("${value}k")
    .Tooltip(t => t.Enable(true))
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

## Tooltip Customization

Customize tooltip appearance using Fill, Border, and TextStyle properties.

### Fill Color

```cshtml
@(Html.EJS().BulletChart("chart")
    .Tooltip(t => t
        .Enable(true)
        .Fill("#34495E")  // Dark blue-gray background
    )
    .Render()
)
```

### Border Styling

```cshtml
@(Html.EJS().BulletChart("chart")
    .Tooltip(t => t
        .Enable(true)
        .Fill("#2C3E50")
        .Border(b => b
            .Color("#E74C3C")
            .Width(2)
        )
    )
    .Render()
)
```

### Text Style

```cshtml
@(Html.EJS().BulletChart("chart")
    .Tooltip(t => t
        .Enable(true)
        .Fill("#2C3E50")
        .TextStyle(ts => ts
            .Color("#FFFFFF")
            .FontFamily("Arial")
            .FontSize("13px")
            .FontWeight("600")
        )
    )
    .Render()
)
```

### Completely Customized Tooltip

```cshtml
@model List<MetricData>

@(Html.EJS().BulletChart("customTooltipChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Custom Tooltip Example")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Tooltip(t => t
        .Enable(true)
        .Fill("#2C3E50")
        .Border(b => b
            .Color("#3498DB")
            .Width(2)
        )
        .TextStyle(ts => ts
            .Color("#FFFFFF")
            .FontFamily("Segoe UI")
            .FontSize("14px")
            .FontWeight("normal")
        )
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

## Complete Examples

### Example 1: Professional Dashboard

```csharp
// Controller
public ActionResult ProfessionalDashboard()
{
    ViewBag.RevenueData = new List<MetricData>
    {
        new MetricData { value = 8750, target = 10000, category = "Revenue ($K)" }
    };
    
    ViewBag.CustomersData = new List<MetricData>
    {
        new MetricData { value = 1450, target = 1500, category = "New Customers" }
    };
    
    ViewBag.SatisfactionData = new List<MetricData>
    {
        new MetricData { value = 4.3, target = 4.5, category = "Satisfaction" }
    };
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
    public string category { get; set; }
}
```

```cshtml
<style>
    .dashboard-card {
        margin-bottom: 30px;
        padding: 25px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>

<div style="padding: 20px; background: #f5f7fa;">
    <h1 style="text-align: center; color: #2C3E50;">Q1 2024 Performance Dashboard</h1>
    
    <div class="dashboard-card">
        @(Html.EJS().BulletChart("revenueChart")
            .DataSource((List<MetricData>)ViewBag.RevenueData)
            .ValueField("value")
            .TargetField("target")
            .CategoryField("category")
            .Title("Revenue Performance")
            .Subtitle("Against quarterly target")
            .TitlePosition(Syncfusion.EJ2.Charts.TextPosition.Top)
            .TitleStyle(ts => ts
                .Color("#2C3E50")
                .FontSize("18px")
                .FontWeight("bold")
            )
            .SubtitleStyle(ss => ss
                .Color("#7F8C8D")
                .FontSize("13px")
            )
            .Minimum(0)
            .Maximum(12000)
            .Interval(2000)
            .LabelFormat("${value}K")
            .ValueFill("#3498DB")
            .TargetColor("#E74C3C")
            .TargetWidth(5)
            .Tooltip(t => t
                .Enable(true)
                .Fill("#34495E")
                .TextStyle(ts => ts.Color("#FFFFFF").FontSize("13px"))
            )
            .Ranges(r => {
                r.End(6000).Color("#E74C3C").Opacity(0.3).Add();
                r.End(9000).Color("#F39C12").Opacity(0.3).Add();
                r.End(12000).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("100%")
            .Height("110")
            .Render()
        )
    </div>
    
    <!-- Similar cards for Customers and Satisfaction -->
</div>
```

## Best Practices

### Title Best Practices

1. **Be Descriptive:** Clearly describe what the chart measures
2. **Keep Concise:** Use 2-5 words when possible
3. **Use Consistent Capitalization:** Title case or sentence case
4. **Include Units in Subtitle:** Keep title clean, put units in subtitle

### Subtitle Best Practices

1. **Provide Context:** Time period, comparison basis, units
2. **Keep Brief:** One short phrase or sentence
3. **Complement Title:** Don't repeat title information
4. **Use Lighter Styling:** Smaller, lighter color than title

### Tooltip Best Practices

1. **Enable for Complex Data:** Always enable tooltips for detailed metrics
2. **Use High Contrast:** Ensure text is readable on tooltip background
3. **Keep Simple:** Default tooltips work well; customize only if needed
4. **Test Accessibility:** Ensure tooltips work with keyboard navigation

### Styling Best Practices

1. **Maintain Hierarchy:** Title bold/large, subtitle lighter/smaller
2. **Use Brand Colors:** Match your application's color scheme
3. **Ensure Readability:** High contrast, appropriate font sizes
4. **Be Consistent:** Use same styling across all charts in application

## Troubleshooting

### Title Not Visible
- Verify Title property is set
- Check TitleStyle color contrasts with background
- Ensure chart height accommodates title

### Subtitle Positioned Incorrectly
- Check TitlePosition affects both title and subtitle
- Verify SubtitleStyle is configured
- Ensure Subtitle property contains text

### Tooltip Not Appearing
- Confirm Enable is set to true in Tooltip
- Check browser console for JavaScript errors
- Verify chart is interactive (not in print mode)

### Tooltip Text Not Readable
- Increase contrast between Fill color and TextStyle color
- Use lighter Fill colors with dark text or vice versa
- Increase FontSize in TextStyle

You now have complete knowledge of implementing and customizing titles and tooltips for professional, informative bullet chart visualizations!
