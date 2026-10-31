# Ranges (Quality Indicators)

Ranges in bullet charts represent qualitative measures of performance, such as **Good**, **Bad**, and **Satisfactory**. They provide visual context by creating colored background bands that help users quickly assess whether values are in acceptable, warning, or critical zones.

## Table of Contents
- [Understanding Ranges](#understanding-ranges)
- [Basic Range Configuration](#basic-range-configuration)
- [Range End Property](#range-end-property)
- [Color Customization](#color-customization)
- [Opacity Settings](#opacity-settings)
- [Multiple Range Scenarios](#multiple-range-scenarios)
- [Range Best Practices](#range-best-practices)
- [Common Range Patterns](#common-range-patterns)
- [Complete Working Example](#complete-working-example)
- [Troubleshooting](#troubleshooting)

## Understanding Ranges

**Purpose:** Ranges divide the chart scale into segments that represent different performance levels or quality zones. They appear as colored bands behind the value bar and target marker, providing immediate visual feedback about performance status.

**Common Use Cases:**
- **Performance Levels:** Poor, Fair, Good, Excellent
- **Risk Zones:** Safe, Warning, Danger
- **Quality Measures:** Below Standard, Meets Standard, Exceeds Standard
- **Status Indicators:** Critical, Needs Attention, Satisfactory, Outstanding

## Basic Range Configuration

Ranges are defined using the `Ranges` property. Each range specifies an ending point, and the chart automatically determines the starting point based on the previous range or the minimum value.

### Simple Three-Range Example

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

@(Html.EJS().BulletChart("bulletChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Ranges(ranges => {
        ranges.End(150).Add();   // Range 1: 0 to 150 (Poor)
        ranges.End(250).Add();   // Range 2: 150 to 250 (Average)
        ranges.End(300).Add();   // Range 3: 250 to 300 (Good)
    })
    .Render()
)
```

**How It Works:**
- **Range 1:** Starts at Minimum (0), ends at 150
- **Range 2:** Starts at previous range end (150), ends at 250
- **Range 3:** Starts at previous range end (250), ends at 300 (Maximum)

## Range End Property

The `End` property specifies where a range concludes on the quantitative scale.

### Understanding End Values

```cshtml
@(Html.EJS().BulletChart("chart")
    .Minimum(0)
    .Maximum(500)
    .Ranges(ranges => {
        ranges.End(200).Add();  // Range spans 0-200
        ranges.End(350).Add();  // Range spans 200-350
        ranges.End(500).Add();  // Range spans 350-500
    })
    .Render()
)
```

**Key Points:**
- End values must be between Minimum and Maximum
- Ranges automatically start from the previous range's end
- The first range starts at the Minimum value
- End values should be in ascending order
- Gaps are not allowed - each range must connect to the next

### Complete Example with Data

```csharp
// Controller
public ActionResult SalesPerformance()
{
    List<SalesData> data = new List<SalesData>
    {
        new SalesData 
        { 
            actualSales = 8500, 
            targetSales = 10000 
        }
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

@(Html.EJS().BulletChart("salesChart")
    .DataSource(Model)
    .ValueField("actualSales")
    .TargetField("targetSales")
    .Title("Monthly Sales Performance (in $)")
    .Minimum(0)
    .Maximum(12000)
    .Interval(2000)
    .Ranges(ranges => {
        ranges.End(6000).Add();   // Critical: Less than 50% of max
        ranges.End(9000).Add();   // Warning: 50-75% of max
        ranges.End(12000).Add();  // Good: 75-100% of max
    })
    .Render()
)
```

## Color Customization

Enhance readability and convey meaning by applying custom colors to ranges.

### Applying Colors

```cshtml
@(Html.EJS().BulletChart("coloredChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Ranges(ranges => {
        ranges.End(150).Color("#DC3545").Add();    // Red: Poor performance
        ranges.End(225).Color("#FFC107").Add();    // Yellow: Below target
        ranges.End(300).Color("#28A745").Add();    // Green: Good performance
    })
    .Render()
)
```

**Color Guidelines:**
- **Red (#DC3545):** Poor, Critical, Below Standard
- **Yellow/Orange (#FFC107):** Warning, Needs Improvement, Approaching Target
- **Green (#28A745):** Good, Satisfactory, Meets/Exceeds Target
- **Gray (#D3D3D3):** Neutral or informational zones

### Color Naming and Formats

You can specify colors using:
- **Hex codes:** `#DC3545`, `#FF5733`
- **RGB:** `rgb(220, 53, 69)`
- **RGBA:** `rgba(220, 53, 69, 0.8)`
- **Named colors:** `red`, `green`, `blue`, `gray`

```cshtml
@(Html.EJS().BulletChart("chart")
    .Ranges(ranges => {
        ranges.End(100).Color("#FF0000").Add();          // Hex
        ranges.End(200).Color("rgb(255, 165, 0)").Add(); // RGB
        ranges.End(300).Color("lightgreen").Add();       // Named color
    })
    .Render()
)
```

## Opacity Settings

Control range transparency using the `Opacity` property (value between 0 and 1).

### Basic Opacity Example

```cshtml
@(Html.EJS().BulletChart("opacityChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(100)
    .Ranges(ranges => {
        ranges.End(40).Color("#DC3545").Opacity(0.3).Add();  // 30% opacity
        ranges.End(70).Color("#FFC107").Opacity(0.5).Add();  // 50% opacity
        ranges.End(100).Color("#28A745").Opacity(0.7).Add(); // 70% opacity
    })
    .Render()
)
```

**Opacity Values:**
- `0.0`: Completely transparent (invisible)
- `0.3-0.5`: Subtle, allows grid lines and other elements to show through
- `0.7-0.9`: Semi-transparent, visible but not overwhelming
- `1.0`: Fully opaque (default)

### Combined Color and Opacity

```cshtml
@(Html.EJS().BulletChart("subtleRanges")
    .DataSource(Model)
    .ValueField("score")
    .TargetField("benchmark")
    .Title("Quality Score")
    .Minimum(0)
    .Maximum(100)
    .Interval(20)
    .Ranges(ranges => {
        ranges.End(50)
            .Color("#E74C3C")
            .Opacity(0.4)
            .Add();
        ranges.End(75)
            .Color("#F39C12")
            .Opacity(0.4)
            .Add();
        ranges.End(100)
            .Color("#27AE60")
            .Opacity(0.4)
            .Add();
    })
    .Render()
)
```

## Multiple Range Scenarios

### Five-Level Performance Scale

```cshtml
@(Html.EJS().BulletChart("fiveLevelChart")
    .DataSource(Model)
    .ValueField("performance")
    .TargetField("goal")
    .Title("Employee Performance Rating")
    .Minimum(0)
    .Maximum(100)
    .Interval(10)
    .Ranges(ranges => {
        ranges.End(20).Color("#C0392B").Opacity(0.5).Add();   // Unsatisfactory
        ranges.End(40).Color("#E67E22").Opacity(0.5).Add();   // Needs Improvement
        ranges.End(60).Color("#F39C12").Opacity(0.5).Add();   // Meets Expectations
        ranges.End(80).Color("#27AE60").Opacity(0.5).Add();   // Exceeds Expectations
        ranges.End(100).Color("#16A085").Opacity(0.5).Add();  // Outstanding
    })
    .Render()
)
```

### KPI Dashboard with Standard Ranges

```csharp
// Controller
public ActionResult KPIDashboard()
{
    ViewBag.RevenueData = new List<MetricData>
    {
        new MetricData { value = 425000, target = 500000 }
    };
    
    ViewBag.CustomerData = new List<MetricData>
    {
        new MetricData { value = 1450, target = 1500 }
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
<div class="kpi-dashboard">
    <!-- Revenue Chart -->
    <div class="kpi-card">
        <h3>Revenue ($)</h3>
        @(Html.EJS().BulletChart("revenueChart")
            .DataSource((List<MetricData>)ViewBag.RevenueData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(600000)
            .Interval(100000)
            .Ranges(r => {
                r.End(300000).Color("#E74C3C").Opacity(0.4).Add();  // Below 50%
                r.End(450000).Color("#F39C12").Opacity(0.4).Add();  // 50-75%
                r.End(600000).Color("#27AE60").Opacity(0.4).Add();  // Above 75%
            })
            .Render()
        )
    </div>
    
    <!-- Customer Acquisition -->
    <div class="kpi-card">
        <h3>New Customers</h3>
        @(Html.EJS().BulletChart("customerChart")
            .DataSource((List<MetricData>)ViewBag.CustomerData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(2000)
            .Interval(500)
            .Ranges(r => {
                r.End(1000).Color("#E74C3C").Opacity(0.4).Add();
                r.End(1500).Color("#F39C12").Opacity(0.4).Add();
                r.End(2000).Color("#27AE60").Opacity(0.4).Add();
            })
            .Render()
        )
    </div>
    
    <!-- Customer Satisfaction -->
    <div class="kpi-card">
        <h3>Satisfaction Rating</h3>
        @(Html.EJS().BulletChart("satisfactionChart")
            .DataSource((List<MetricData>)ViewBag.SatisfactionData)
            .ValueField("value")
            .TargetField("target")
            .Minimum(0)
            .Maximum(5)
            .Interval(1)
            .Ranges(r => {
                r.End(2.5).Color("#E74C3C").Opacity(0.4).Add();   // Poor (0-2.5)
                r.End(3.5).Color("#F39C12").Opacity(0.4).Add();   // Fair (2.5-3.5)
                r.End(4.0).Color("#3498DB").Opacity(0.4).Add();   // Good (3.5-4.0)
                r.End(5.0).Color("#27AE60").Opacity(0.4).Add();   // Excellent (4.0-5.0)
            })
            .Render()
        )
    </div>
</div>
```

## Range Best Practices

### 1. Use Meaningful Colors
Choose colors that match user expectations:
- Red for negative/poor performance
- Yellow/Orange for warning/moderate
- Green for positive/good performance
- Blue for informational

### 2. Maintain Consistent Ranges
When displaying multiple related metrics, use consistent range boundaries and colors across all charts.

### 3. Choose Appropriate Number of Ranges
- **3 ranges:** Simple, clear (Poor/Average/Good)
- **4-5 ranges:** More granular assessment
- **Avoid > 6 ranges:** Can become cluttered and hard to interpret

### 4. Set Ranges Based on Business Logic
Align range boundaries with business rules, industry standards, or organizational thresholds.

```cshtml
<!-- Example: Industry-standard performance ranges -->
@(Html.EJS().BulletChart("chart")
    .Ranges(ranges => {
        ranges.End(50).Add();   // 0-50%: Below Industry Standard
        ranges.End(75).Add();   // 50-75%: At Industry Standard
        ranges.End(100).Add();  // 75-100%: Above Industry Standard
    })
    .Render()
)
```

### 5. Use Subtle Opacity
Apply opacity (0.3-0.6) to ranges to prevent them from overwhelming the value bar and target marker.

### 6. Test Color Accessibility
Ensure sufficient contrast for users with color vision deficiencies. Consider using patterns or textures in addition to colors.

## Common Range Patterns

### Pattern 1: Traffic Light (Red-Yellow-Green)
```cshtml
.Ranges(ranges => {
    ranges.End(60).Color("#DC3545").Opacity(0.4).Add();   // Red
    ranges.End(85).Color("#FFC107").Opacity(0.4).Add();   // Yellow
    ranges.End(100).Color("#28A745").Opacity(0.4).Add();  // Green
})
```

### Pattern 2: Risk Zones
```cshtml
.Ranges(ranges => {
    ranges.End(100).Color("#28A745").Opacity(0.3).Add();  // Safe
    ranges.End(200).Color("#FFC107").Opacity(0.3).Add();  // Caution
    ranges.End(300).Color("#DC3545").Opacity(0.3).Add();  // Danger
})
```

### Pattern 3: Percentage-Based
```cshtml
.Ranges(ranges => {
    ranges.End(25).Color("#E74C3C").Opacity(0.4).Add();   // 0-25%
    ranges.End(50).Color("#E67E22").Opacity(0.4).Add();   // 25-50%
    ranges.End(75).Color("#F39C12").Opacity(0.4).Add();   // 50-75%
    ranges.End(100).Color("#27AE60").Opacity(0.4).Add();  // 75-100%
})
```

### Pattern 4: Deviation from Target
```cshtml
.Ranges(ranges => {
    ranges.End(200).Color("#DC3545").Opacity(0.3).Add();  // Below target by 20%
    ranges.End(240).Color("#FFC107").Opacity(0.3).Add();  // Close to target
    ranges.End(260).Color("#28A745").Opacity(0.3).Add();  // At/exceeds target
    ranges.End(300).Color("#17A2B8").Opacity(0.3).Add();  // Significantly exceeds
})
```

## Complete Working Example

```csharp
// Controller
public ActionResult ProductionMonitor()
{
    List<ProductionData> data = new List<ProductionData>
    {
        new ProductionData 
        { 
            actualProduction = 8750,
            targetProduction = 10000,
            productLine = "Assembly Line A"
        }
    };
    return View(data);
}

public class ProductionData
{
    public double actualProduction { get; set; }
    public double targetProduction { get; set; }
    public string productLine { get; set; }
}
```

```cshtml
@model List<ProductionData>

@{
    ViewBag.Title = "Production Monitor";
}

<div style="padding: 30px;">
    <h2>@Model[0].productLine - Daily Production</h2>
    
    @(Html.EJS().BulletChart("productionChart")
        .DataSource(Model)
        .ValueField("actualProduction")
        .TargetField("targetProduction")
        .Title("Units Produced")
        .Subtitle("Daily Target: 10,000 units")
        .Minimum(0)
        .Maximum(12000)
        .Interval(2000)
        .Ranges(ranges => {
            ranges.End(7000)
                .Color("#DC3545")
                .Opacity(0.4)
                .Add();  // Critical: < 70% of target
            ranges.End(9000)
                .Color("#FFC107")
                .Opacity(0.4)
                .Add();  // Warning: 70-90% of target
            ranges.End(10500)
                .Color("#28A745")
                .Opacity(0.4)
                .Add();  // Good: 90-105% of target
            ranges.End(12000)
                .Color("#007BFF")
                .Opacity(0.4)
                .Add();  // Excellent: > 105% of target
        })
        .Tooltip(t => t.Enable(true))
        .Width("90%")
        .Height("120")
        .Render()
    )
    
    <div style="margin-top: 20px;">
        <h4>Performance Ranges:</h4>
        <ul>
            <li><span style="color: #DC3545;">■</span> Critical (0-7,000): Below 70%</li>
            <li><span style="color: #FFC107;">■</span> Warning (7,000-9,000): 70-90%</li>
            <li><span style="color: #28A745;">■</span> Good (9,000-10,500): 90-105%</li>
            <li><span style="color: #007BFF;">■</span> Excellent (10,500-12,000): Above 105%</li>
        </ul>
    </div>
</div>
```

## Troubleshooting

### Ranges Not Displaying
- Verify End values are within Minimum and Maximum range
- Ensure End values are in ascending order
- Check that Ranges() is properly configured

### Colors Not Showing
- Confirm Color property uses valid format (hex, RGB, or named color)
- Check opacity is not set to 0
- Verify CSS doesn't override range colors

### Overlapping or Gaps
- Ensure each range End equals the next range's start
- Don't skip values between ranges
- Ranges automatically connect - no manual gaps needed

You now have complete knowledge of implementing and customizing ranges in Bullet Charts for effective visual communication of performance metrics!
