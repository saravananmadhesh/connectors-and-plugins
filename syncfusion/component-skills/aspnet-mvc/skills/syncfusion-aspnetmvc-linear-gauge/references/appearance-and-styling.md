# Styling and Appearance

## Table of Contents
- [Customizing Gauge Background](#customizing-gauge-background)
- [Title Configuration](#title-configuration)
- [Container Types](#container-types)
- [Applying Themes](#applying-themes)

---

## Customizing Gauge Background

Set background color and borders for the entire gauge:

**Controller Code**:
```csharp
public ActionResult BackgroundCustomization()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Appearance";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Gauge Background Customization</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("backgroundGauge")
        .Title("Customized Background")
        .Background("#F5F5F5")                       // Light gray background
        .Border(border =>
        {
            border.Color("#1976D2")                  // Blue border
                .Width(3);                           // 3px border
        })
        .Margin(margin =>
        {
            margin.Left(20)                          // Left margin in pixels
                .Right(20)                           // Right margin
                .Top(20)                             // Top margin
                .Bottom(20);                         // Bottom margin
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
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

**Result**: Gauge with light gray background, blue border, and specified margins.

### Gradient Background

Create a visual appeal with gradient:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("gradientGauge")
        .Title("Gradient Background")
        .Background("linear-gradient(to bottom, #F5F5F5, #E0E0E0)")
        .Border(border =>
        {
            border.Color("#757575")
                .Width(2);
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(65).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Gauge with a gradient background from light to dark gray.

---

## Title Configuration

Add and style a gauge title:

**Controller Code**:
```csharp
public ActionResult TitleConfiguration()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Title Configuration";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Customizing Title Style</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("titleGauge")
        .Title("System Performance Monitor")
        .TitleStyle(titleStyle =>
        {
            titleStyle.Font(font =>
            {
                font.Color("#1976D2")                // Blue title color
                    .Size("18px")                    // Font size
                    .FontFamily("Arial, sans-serif") // Font family
                    .FontWeight("bold")              // Bold text
                    .FontStyle("normal");            // Font style
            });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
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

**Result**: Gauge with a styled title in blue, bold, 18px Arial font.

### Title with Margin

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("titleMarginGauge")
        .Title("Performance Indicator")
        .TitleStyle(titleStyle =>
        {
            titleStyle.Font(font =>
            {
                font.Color("#388E3C")
                    .Size("16px")
                    .FontWeight("bold");
            });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
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

---

## Container Types

The container holds ranges and pointers. Choose from three types:

### Normal Container (Default)

**Controller Code**:
```csharp
public ActionResult ContainerTypes()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Container Types";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Normal Container (Rectangle)</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("normalContainerGauge")
        .Title("Normal Container Type")
        .Container(container =>
        {
            container.Type(ContainerType.Normal)      // Rectangle container
                .Width(30)                           // Width of container
                .Height(180)                         // Height of container
                .BackgroundColor("#F5F5F5")          // Background color
                .Border(border =>
                {
                    border.Color("#1976D2")
                        .Width(2);
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#4CAF50").Add();
                    ranges.Start(40).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("450px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A rectangular container holding the gauge elements.

### Rounded Rectangle Container

**View Code**:
```html
<h2>Rounded Rectangle Container</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("roundedContainerGauge")
        .Title("Rounded Rectangle Container")
        .Container(container =>
        {
            container.Type(ContainerType.RoundedRectangle)  // Rounded rectangle
                .Width(35)
                .Height(200)
                .BackgroundColor("#E8F5E9")
                .Border(border =>
                {
                    border.Color("#388E3C")
                        .Width(2);
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(100).Color("#81C784").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(70).Add();
                })
                .Add();
        })
        .Height("450px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A rounded rectangle container with green theme.

### Thermometer Container

**View Code**:
```html
<h2>Thermometer Container</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("thermometerGauge")
        .Title("Thermometer Style Container")
        .Container(container =>
        {
            container.Type(ContainerType.Thermometer)  // Thermometer bulb shape
                .Width(25)
                .Height(180)
                .BackgroundColor("#FFF3E0")
                .Border(border =>
                {
                    border.Color("#F57C00")
                        .Width(2);
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(-10)
                .Maximum(50)
                .Ranges(ranges =>
                {
                    ranges.Start(-10).End(0).Color("#2196F3").Add();
                    ranges.Start(0).End(25).Color("#4CAF50").Add();
                    ranges.Start(25).End(50).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(22).Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A thermometer-style gauge with bulb appearance.

---

## Applying Themes

Themes provide consistent color schemes. Apply predefined theme colors:

**Controller Code**:
```csharp
public ActionResult ApplyTheme()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Themes";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Themed Gauges</h2>

<style>
    .gauge-container {
        display: inline-block;
        width: 48%;
        margin-right: 2%;
        vertical-align: top;
    }
</style>

<!-- Material Theme -->
<div class="gauge-container">
    @Html.EJS().LinearGauge("materialThemeGauge")
        .Title("Material Theme")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#66BB6A").Add();
                    ranges.Start(40).End(70).Color("#FFA726").Add();
                    ranges.Start(70).End(100).Color("#EF5350").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("350px")
        .Width("100%")
        .Render();
</div>

<!-- Bootstrap Theme -->
<div class="gauge-container">
    @Html.EJS().LinearGauge("bootstrapThemeGauge")
        .Title("Bootstrap Theme")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#5BC0DE").Add();
                    ranges.Start(40).End(70).Color("#F0AD4E").Add();
                    ranges.Start(70).End(100).Color("#D9534F").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("350px")
        .Width("100%")
        .Render();
</div>
```

---

## Complete Real-World Example: Professional Dashboard

**Controller Code**:
```csharp
public ActionResult ProfessionalDashboard()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Professional Dashboard";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Professional Dashboard Gauge</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("professionalGauge")
        .Title("Data Center Performance")
        .Background("#FFFFFF")
        .Border(border =>
        {
            border.Color("#E0E0E0")
                .Width(1);
        })
        .Margin(margin =>
        {
            margin.Left(30).Right(30).Top(30).Bottom(30);
        })
        .TitleStyle(titleStyle =>
        {
            titleStyle.Font(font =>
            {
                font.Color("#212121")
                    .Size("18px")
                    .FontWeight("bold")
                    .FontFamily("'Segoe UI', sans-serif");
            });
        })
        .Container(container =>
        {
            container.Type(ContainerType.RoundedRectangle)
                .Width(40)
                .Height(250)
                .BackgroundColor("#F5F5F5")
                .Border(border =>
                {
                    border.Color("#BDBDBD")
                        .Width(1);
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Line(line =>
                {
                    line.Height(250)
                        .Width(0)
                        .Color("transparent");
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
                        .Height(7)
                        .Width(1)
                        .Color("#757575");
                })
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px")
                            .Color("#424242");
                    });
                })
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#C8E6C9").Add();
                    ranges.Start(30).End(70).Color("#FFE0B2").Add();
                    ranges.Start(70).End(100).Color("#FFCCBC").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(62)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#1976D2")
                        .Add();
                })
                .Annotations(annotations =>
                {
                    annotations.Content("<div style='background:#1976D2; color:white; padding:8px 15px; border-radius:4px; font-weight:bold; font-size:14px;'>62%</div>")
                        .AxisValue(62)
                        .X(0)
                        .Y(-40)
                        .Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A professional gauge with modern styling, custom container, and complete customization.
