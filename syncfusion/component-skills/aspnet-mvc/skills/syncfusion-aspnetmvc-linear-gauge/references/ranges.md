# Defining Ranges

Ranges are colored bands that highlight different zones or states on the gauge. They help visualize safe, warning, and critical zones.

## Basic Range Configuration

**Controller Code**:
```csharp
public ActionResult BasicRange()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Ranges";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Basic Range Configuration</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("basicRangeGauge")
        .Title("Temperature with Ranges (0-100°C)")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                // Add ranges for different zones
                .Ranges(ranges =>
                {
                    // Cold zone: 0-20
                    ranges.Start(0)
                        .End(20)
                        .Color("#2196F3")                // Blue
                        .Add();
                    
                    // Comfortable zone: 20-30
                    ranges.Start(20)
                        .End(30)
                        .Color("#4CAF50")                // Green
                        .Add();
                    
                    // Warm zone: 30-50
                    ranges.Start(30)
                        .End(50)
                        .Color("#FFC107")                // Amber
                        .Add();
                    
                    // Hot zone: 50-100
                    ranges.Start(50)
                        .End(100)
                        .Color("#F44336")                // Red
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(35).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Four colored zones representing different temperature ranges.

---

## Customizing Range Appearance

### Range Width (StartWidth and EndWidth)

Make ranges tapered or uniform width:

**Controller Code**:
```csharp
public ActionResult CustomRangeAppearance()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Custom Range Appearance";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Customized Range Appearance</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("customRangeGauge")
        .Title("Pressure Gauge with Tapered Ranges")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(200)
                .Ranges(ranges =>
                {
                    // Safe zone - uniform width (20px)
                    ranges.Start(0)
                        .End(50)
                        .StartWidth(20)                  // Width at start
                        .EndWidth(20)                    // Width at end (uniform)
                        .Color("#4CAF50")
                        .Add();
                    
                    // Caution zone - tapered (20px to 30px)
                    ranges.Start(50)
                        .End(120)
                        .StartWidth(20)
                        .EndWidth(30)                    // Wider at end (tapered effect)
                        .Color("#FFC107")
                        .Add();
                    
                    // Danger zone - reversed taper (30px to 20px)
                    ranges.Start(120)
                        .End(200)
                        .StartWidth(30)                  // Wider at start
                        .EndWidth(20)                    // Narrower at end
                        .Color("#F44336")
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(85).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Ranges with varying widths showing tapering effects.

### Range Position (Inside, Outside, Cross, Auto)

Control where ranges appear relative to the axis:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("positionedRangeGauge")
        .Title("Range Positioning Options")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    // Outside position (default)
                    ranges.Start(0)
                        .End(30)
                        .Position(Position.Outside)
                        .Color("#2196F3")
                        .Add();
                    
                    // Inside position
                    ranges.Start(30)
                        .End(70)
                        .Position(Position.Inside)
                        .Color("#4CAF50")
                        .Add();
                    
                    // Cross position
                    ranges.Start(70)
                        .End(100)
                        .Position(Position.Cross)
                        .Color("#F44336")
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(50).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Three ranges displayed in different positions (outside, inside, cross).

### Range Offset

Add spacing between range and axis line:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("offsetRangeGauge")
        .Title("Ranges with Offsets")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    // Range with no offset
                    ranges.Start(0)
                        .End(40)
                        .Offset(0)                       // No gap from axis
                        .Color("#4CAF50")
                        .Add();
                    
                    // Range with 10px offset
                    ranges.Start(40)
                        .End(70)
                        .Offset(10)                      // 10px gap from axis
                        .Color("#FFC107")
                        .Add();
                    
                    // Range with 20px offset
                    ranges.Start(70)
                        .End(100)
                        .Offset(20)                      // 20px gap from axis
                        .Color("#F44336")
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Ranges displayed at different distances from the axis.

### Range Borders

Add borders to ranges for better definition:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("borderedRangeGauge")
        .Title("Ranges with Borders")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0)
                        .End(40)
                        .Color("#4CAF50")
                        .Border(border =>
                        {
                            border.Color("#2E7D32")      // Dark green border
                                .Width(2);               // 2px border
                        })
                        .Add();
                    
                    ranges.Start(40)
                        .End(70)
                        .Color("#FFC107")
                        .Border(border =>
                        {
                            border.Color("#F57F17")
                                .Width(2);
                        })
                        .Add();
                    
                    ranges.Start(70)
                        .End(100)
                        .Color("#F44336")
                        .Border(border =>
                        {
                            border.Color("#C62828")
                                .Width(2);
                        })
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(60).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Ranges with colored borders for better visual separation.

---

## Multiple Ranges

Add several ranges to the same axis for complex scenarios:

**Controller Code**:
```csharp
public ActionResult MultipleRanges()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Multiple Ranges";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Multiple Overlapping Ranges</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiRangeGauge")
        .Title("Performance Indicator (0-100)")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    // Background zone
                    ranges.Start(0)
                        .End(100)
                        .Color("#E0E0E0")
                        .Offset(-10)
                        .Add();
                    
                    // Poor performance
                    ranges.Start(0)
                        .End(25)
                        .Color("#EF5350")
                        .Add();
                    
                    // Below average
                    ranges.Start(25)
                        .End(50)
                        .Color("#FFA726")
                        .Add();
                    
                    // Average
                    ranges.Start(50)
                        .End(75)
                        .Color("#FFD54F")
                        .Add();
                    
                    // Good
                    ranges.Start(75)
                        .End(90)
                        .Color("#81C784")
                        .Add();
                    
                    // Excellent
                    ranges.Start(90)
                        .End(100)
                        .Color("#66BB6A")
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(68).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Six overlapping ranges showing performance levels from poor to excellent.

---

## Range Color for Labels

Apply range colors to axis labels for consistency:

**Controller Code**:
```csharp
public ActionResult RangeColorLabels()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Range Color Labels";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Labels Colored by Range</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("rangeColorLabelGauge")
        .Title("Status Indicator")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(33).Color("#F44336").Add();     // Red
                    ranges.Start(33).End(66).Color("#FFC107").Add();    // Yellow
                    ranges.Start(66).End(100).Color("#4CAF50").Add();   // Green
                })
                .LabelStyle(labelStyle =>
                {
                    labelStyle.UseRangeColor(true)       // Use range colors for labels
                        .Font(font =>
                        {
                            font.Size("13px")
                                .FontWeight("bold");
                        });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(45).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Axis labels colored to match their respective ranges (red, yellow, green).

---

## Real-World Example: Traffic Light Gauge

Create a complete traffic light style gauge:

**Controller Code**:
```csharp
public ActionResult TrafficLightGauge()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Traffic Light Gauge";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>System Status - Traffic Light Style</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("trafficGauge")
        .Title("System Load (0-100%)")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Line(line =>
                {
                    line.Height(250)
                        .Width(8)
                        .Color("#BDBDBD");
                })
                .MajorTicks(majorTicks =>
                {
                    majorTicks.Interval(20)
                        .Height(15)
                        .Width(2)
                        .Color("#424242");
                })
                .MinorTicks(minorTicks =>
                {
                    minorTicks.Interval(5)
                        .Height(8)
                        .Width(1)
                        .Color("#757575");
                })
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px")
                            .Color("#212121");
                    });
                })
                // Traffic light ranges
                .Ranges(ranges =>
                {
                    // Green: 0-33% (Good)
                    ranges.Start(0)
                        .End(33)
                        .StartWidth(25)
                        .EndWidth(25)
                        .Color("#4CAF50")
                        .Border(border =>
                        {
                            border.Color("#2E7D32").Width(2);
                        })
                        .Add();
                    
                    // Yellow: 33-66% (Caution)
                    ranges.Start(33)
                        .End(66)
                        .StartWidth(25)
                        .EndWidth(25)
                        .Color("#FFC107")
                        .Border(border =>
                        {
                            border.Color("#F57F17").Width(2);
                        })
                        .Add();
                    
                    // Red: 66-100% (Critical)
                    ranges.Start(66)
                        .End(100)
                        .StartWidth(25)
                        .EndWidth(25)
                        .Color("#F44336")
                        .Border(border =>
                        {
                            border.Color("#C62828").Width(2);
                        })
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(58)
                        .Type(PointerType.Bar)
                        .Width(12)
                        .Color("#1976D2")
                        .Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A professional traffic light gauge with green (good), yellow (caution), and red (critical) zones.

---

## Example: Database Performance Ranges

**Controller Code**:
```csharp
public ActionResult DatabasePerformance()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Database Performance";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Database Query Response Time</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("dbPerformanceGauge")
        .Title("Query Response Time (0-10 seconds)")
        .Format("{value}s")                          // Add seconds unit
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(10)
                .Ranges(ranges =>
                {
                    // Excellent: 0-1s
                    ranges.Start(0)
                        .End(1)
                        .StartWidth(18)
                        .EndWidth(18)
                        .Color("#66BB6A")
                        .Add();
                    
                    // Good: 1-2s
                    ranges.Start(1)
                        .End(2)
                        .StartWidth(18)
                        .EndWidth(18)
                        .Color("#81C784")
                        .Add();
                    
                    // Fair: 2-4s
                    ranges.Start(2)
                        .End(4)
                        .StartWidth(18)
                        .EndWidth(18)
                        .Color("#FFD54F")
                        .Add();
                    
                    // Poor: 4-7s
                    ranges.Start(4)
                        .End(7)
                        .StartWidth(18)
                        .EndWidth(18)
                        .Color("#FFA726")
                        .Add();
                    
                    // Critical: 7-10s
                    ranges.Start(7)
                        .End(10)
                        .StartWidth(18)
                        .EndWidth(18)
                        .Color("#EF5350")
                        .Add();
                })
                .LabelStyle(labelStyle =>
                {
                    labelStyle.UseRangeColor(true)
                        .Font(font =>
                        {
                            font.Size("12px");
                        });
                })
                .MajorTicks(majorTicks =>
                {
                    majorTicks.Interval(1).Height(10).Width(2);
                })
                .MinorTicks(minorTicks =>
                {
                    minorTicks.Interval(0.2).Height(5).Width(1);
                })
                .Pointers(pointers =>
                {
                    pointers.Value(2.5)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Circle)
                        .Width(14)
                        .Color("#1976D2")
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Database performance gauge showing response time across five performance levels with appropriate colors.
