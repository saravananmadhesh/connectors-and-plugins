# Axes Configuration Guide

## Table of Contents
- [Setting Minimum and Maximum Values](#setting-minimum-and-maximum-values)
- [Customizing Axis Lines](#customizing-axis-lines)
- [Configuring Ticks](#configuring-ticks)
- [Customizing Labels](#customizing-labels)
- [Multiple Axes](#multiple-axes)
- [Advanced Axis Features](#advanced-axis-features)

---

## Setting Minimum and Maximum Values

The axis scale is defined by minimum and maximum values. By default, the minimum is **0** and maximum is **100**.

### Basic Configuration

**Controller Code**:
```csharp
public ActionResult BasicAxis()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Axis Configuration";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Setting Axis Range</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("gauge")
        .Title("Pressure Gauge (0-300 PSI)")
        .Axes(axes =>
        {
            axes.Minimum(0)              // Axis starts at 0
                .Maximum(300)            // Axis ends at 300
                .Pointers(pointers =>
                {
                    pointers.Value(150).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Axis scale from 0 to 300 PSI with pointer at 150.

### Custom Range Example (Negative to Positive)

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("temperatureGauge")
        .Title("Temperature Range (-50 to +50°C)")
        .Axes(axes =>
        {
            axes.Minimum(-50)            // Negative minimum
                .Maximum(50)             // Positive maximum
                .Pointers(pointers =>
                {
                    pointers.Value(-20).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Axis with negative and positive values.

---

## Customizing Axis Lines

The axis line is the main reference line. Customize its appearance with height, width, color, and offset.

### Complete Axis Line Customization

**Controller Code**:
```csharp
public ActionResult CustomAxisLine()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Axis Line Customization";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Custom Axis Line</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("customLineGauge")
        .Title("Custom Axis Line Configuration")
        .Axes(axes =>
        {
            // Configure the axis line
            axes.Line(line =>
                {
                    line.Height(150)              // Length of axis line in pixels
                        .Width(3)                 // Thickness of line
                        .Color("#FF5722")         // Color of the axis line
                        .Offset(20);              // Distance from gauge edge
                })
                .Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Axis line with custom color (deep orange), thickness, and length.

### Multiple Line Styles

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiLineGauge")
        .Title("Different Axis Line Styles")
        .Axes(axes =>
        {
            // Thick, long line
            axes.Line(line =>
                {
                    line.Height(200)
                        .Width(5)
                        .Color("#1976D2");
                })
                .Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(35).Add();
                })
                .Add();
        })
        .Height("450px")
        .Width("100%")
        .Render();
</div>
```

---

## Configuring Ticks

Ticks mark intervals on the axis. There are **major ticks** (larger) and **minor ticks** (smaller).

### Major and Minor Ticks Configuration

**Controller Code**:
```csharp
public ActionResult ConfigureTicks()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Tick Configuration";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Customizing Major and Minor Ticks</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("tickGauge")
        .Title("Speed Gauge with Custom Ticks")
        .Axes(axes =>
        {
            // Configure major ticks
            axes.MajorTicks(majorTicks =>
                {
                    majorTicks.Interval(20)      // Major ticks every 20 units
                        .Height(15)              // Length of major tick
                        .Width(3)                // Thickness of major tick
                        .Color("#1976D2");       // Color of major ticks
                })
                // Configure minor ticks
                .MinorTicks(minorTicks =>
                {
                    minorTicks.Interval(5)       // Minor ticks every 5 units
                        .Height(8)               // Length of minor tick
                        .Width(2)                // Thickness of minor tick
                        .Color("#90CAF9");       // Color of minor ticks
                })
                .Minimum(0)
                .Maximum(100)
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

**Result**: Gauge with major ticks every 20 units and minor ticks every 5 units.

### Tick Position Configuration

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("positionedTickGauge")
        .Title("Ticks Positioned Inside")
        .Axes(axes =>
        {
            axes.MajorTicks(majorTicks =>
                {
                    majorTicks.Interval(25)
                        .Height(12)
                        .Width(2)
                        .Color("#F44336");
                })
                .MinorTicks(minorTicks =>
                {
                    minorTicks.Interval(5)
                        .Height(6)
                        .Width(1)
                        .Color("#EF5350");
                })
                .Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(70).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

---

## Customizing Labels

Labels are the numeric values displayed on the axis. Customize their format, position, and appearance.

### Basic Label Configuration

**Controller Code**:
```csharp
public ActionResult CustomizeLabels()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Label Configuration";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Customizing Axis Labels</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("labelGauge")
        .Title("Gauge with Formatted Labels")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                // Configure labels
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Color("#1976D2")            // Label text color
                            .Size("14px")                // Font size
                            .FontFamily("Arial")         // Font family
                            .FontWeight("bold");         // Font weight
                    });
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

**Result**: Axis labels with blue bold Arial font.

### Label Format with Units

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("temperatureLabelGauge")
        .Title("Temperature with °C Units")
        .Format("{value}°C")                    // Add unit to labels
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px")
                            .Color("#F57C00");
                    });
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

**Result**: Labels display as "0°C", "25°C", "50°C", "75°C", "100°C".

### Label Position and Spacing

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("positionedLabelGauge")
        .Title("Positioned Labels")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("13px")
                            .Color("#388E3C");
                    });
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

---

## Multiple Axes

Add multiple axes to display different data ranges on the same gauge.

### Two-Axis Configuration

**Controller Code**:
```csharp
public ActionResult MultipleAxes()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Multiple Axes";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Gauge with Multiple Axes</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiAxisGauge")
        .Title("Temperature in Celsius and Fahrenheit")
        .Axes(axes =>
        {
            // First axis: Celsius
            axes.Minimum(0)
                .Maximum(100)
                .Offset(20)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Color("#1976D2");
                    });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(35).Add();
                })
                .Add();
            
            // Second axis: Fahrenheit
            axes.Minimum(32)
                .Maximum(212)
                .Offset(70)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Color("#F44336");
                    });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(95).Add();
                })
                .Add();
        })
        .Height("450px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Two parallel axes showing temperature in both Celsius (left) and Fahrenheit (right).

### Three-Axis Configuration with Different Ranges

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("tripleAxisGauge")
        .Title("Multi-Scale Gauge")
        .Axes(axes =>
        {
            // Axis 1: 0-100
            axes.Minimum(0)
                .Maximum(100)
                .Offset(0)
                .Pointers(pointers =>
                {
                    pointers.Value(40).Add();
                })
                .Add();
            
            // Axis 2: 0-50
            axes.Minimum(0)
                .Maximum(50)
                .Offset(50)
                .Pointers(pointers =>
                {
                    pointers.Value(25).Add();
                })
                .Add();
            
            // Axis 3: 0-200
            axes.Minimum(0)
                .Maximum(200)
                .Offset(100)
                .Pointers(pointers =>
                {
                    pointers.Value(120).Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Three independent axes with different scales and pointers.

---

## Advanced Axis Features

### Opposed Axes (Reverse Direction)

Display axes in opposite directions:

**Controller Code**:
```csharp
public ActionResult OpposedAxes()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Opposed Axes";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Opposed Axes Configuration</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("opposedGauge")
        .Title("Opposed Axis Scale")
        .Axes(axes =>
        {
            // Normal axis (left to right)
            axes.Minimum(0)
                .Maximum(100)
                .Offset(20)
                .Pointers(pointers =>
                {
                    pointers.Value(60).Add();
                })
                .Add();
            
            // Opposed axis (right to left - reversed)
            axes.Minimum(0)
                .Maximum(100)
                .Offset(70)
                .IsInversed(true)              // Reverse the scale direction
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

**Result**: Two axes where the second one counts down instead of up.

### Show Last Label Configuration

Control whether the last label appears:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("lastLabelGauge")
        .Title("Last Label Control")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .ShowLastLabel(true)            // Show the last label (100)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("13px");
                    });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(75).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

---

## Complete Real-World Example: Multi-Purpose Dashboard Gauge

This example combines multiple axis features in a single gauge:

**Controller Code**:
```csharp
public ActionResult DashboardGauge()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Dashboard Gauge";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Industrial Dashboard Gauge</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("dashboardGauge")
        .Title("System Performance Monitor")
        .Axes(axes =>
        {
            // CPU Axis (0-100%)
            axes.Minimum(0)
                .Maximum(100)
                .Offset(10)
                .Line(line =>
                {
                    line.Height(180)
                        .Width(2)
                        .Color("#1976D2");
                })
                .MajorTicks(majorTicks =>
                {
                    majorTicks.Interval(20)
                        .Height(12)
                        .Width(2);
                })
                .MinorTicks(minorTicks =>
                {
                    minorTicks.Interval(5)
                        .Height(6)
                        .Width(1);
                })
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px")
                            .Color("#1976D2");
                    });
                })
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#4CAF50").Add();
                    ranges.Start(30).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(45).Add();
                })
                .Add();
            
            // Memory Axis (0-16GB)
            axes.Minimum(0)
                .Maximum(16)
                .Offset(70)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px")
                            .Color("#F57C00");
                    });
                })
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(8).Color("#4CAF50").Add();
                    ranges.Start(8).End(12).Color("#FFC107").Add();
                    ranges.Start(12).End(16).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(9.5).Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A professional dashboard with two axes, color zones, and complete styling.
