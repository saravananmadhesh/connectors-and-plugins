# Adding Annotations

Annotations allow you to add custom text, HTML elements, or images at specific locations on the gauge.

## Basic Text Annotation

**Controller Code**:
```csharp
public ActionResult BasicAnnotation()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Annotations";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Text Annotation Example</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("annotationGauge")
        .Title("Temperature with Annotation")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#4CAF50").Add();
                    ranges.Start(30).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Annotations(annotations =>
                {
                    // Text annotation at position 55
                    annotations.Content("<div style='font-size:14px; color:#1976D2;'>Current: 55°C</div>")
                        .AxisValue(55)                   // Position on axis
                        .AxisIndex(0)                    // First axis
                        .X(30)                           // X position in pixels
                        .Y(-30)                          // Y position in pixels
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with text annotation showing "Current: 55°C" positioned above the pointer.

## Positioning Annotations with Alignment

**Controller Code**:
```csharp
public ActionResult PositionedAnnotations()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Positioned Annotations";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Annotations with Different Positions</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("positionedAnnotationGauge")
        .Title("Multi-Annotation Gauge")
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
                    pointers.Value(60).Add();
                })
                .Annotations(annotations =>
                {
                    // Left annotation
                    annotations.Content("<div style='font-weight:bold; color:#2E7D32;'>SAFE</div>")
                        .AxisValue(20)
                        .HorizontalAlignment(HorizontalAlignment.Center)
                        .VerticalAlignment(VerticalAlignment.Top)
                        .X(-50)
                        .Y(-25)
                        .Add();
                    
                    // Center annotation
                    annotations.Content("<div style='font-weight:bold; color:#C62828;'>DANGER</div>")
                        .AxisValue(80)
                        .HorizontalAlignment(HorizontalAlignment.Center)
                        .VerticalAlignment(VerticalAlignment.Top)
                        .X(0)
                        .Y(-25)
                        .Add();
                    
                    // Right annotation
                    annotations.Content("<div style='font-size:12px;'>Critical Zone</div>")
                        .AxisValue(95)
                        .X(50)
                        .Y(-25)
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Three text annotations positioned at different locations showing zone labels.

## Annotations with HTML Content

**Controller Code**:
```csharp
public ActionResult HtmlAnnotation()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "HTML Annotations";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Annotation with HTML Elements</h2>

<style>
    .annotation-box {
        background: white;
        border: 2px solid #1976D2;
        border-radius: 5px;
        padding: 8px 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        min-width: 100px;
    }
    
    .annotation-value {
        font-size: 18px;
        font-weight: bold;
        color: #1976D2;
        text-align: center;
    }
    
    .annotation-label {
        font-size: 12px;
        color: #666;
        text-align: center;
    }
</style>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("htmlAnnotationGauge")
        .Title("Pressure Monitoring with HTML Annotation")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(200)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(60).Color("#4CAF50").Add();
                    ranges.Start(60).End(120).Color("#FFC107").Add();
                    ranges.Start(120).End(200).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(95).Add();
                })
                .Annotations(annotations =>
                {
                    annotations.Content(@"
                        <div class='annotation-box'>
                            <div class='annotation-value'>95</div>
                            <div class='annotation-label'>PSI</div>
                        </div>
                    ")
                        .AxisValue(95)
                        .X(0)
                        .Y(-50)
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A styled HTML annotation showing pressure value with a box border and label.

## Image Annotation

**Controller Code**:
```csharp
public ActionResult ImageAnnotation()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Image Annotation";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Annotation with Image</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("imageAnnotationGauge")
        .Title("Server Status with Icon")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(33).Color("#F44336").Add();
                    ranges.Start(33).End(66).Color("#FFC107").Add();
                    ranges.Start(66).End(100).Color("#4CAF50").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(78).Add();
                })
                .Annotations(annotations =>
                {
                    // Image annotation
                    annotations.Content("<img src='https://cdn-icons-png.flaticon.com/512/1995/1995467.png' width='40' height='40'/>")
                        .AxisValue(78)
                        .X(0)
                        .Y(-50)
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with an image icon annotation showing a happy face for good server status.

## Z-Index (Layer Control)

Control the stacking order of overlapping annotations:

**Controller Code**:
```csharp
public ActionResult AnnotationZIndex()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Annotation Z-Index";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Annotations with Z-Index Layering</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("zIndexAnnotationGauge")
        .Title("Layered Annotations")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50).Add();
                })
                .Annotations(annotations =>
                {
                    // Background annotation (lower z-index)
                    annotations.Content("<div style='background:#E0E0E0; padding:10px; border-radius:5px;'>Background Layer</div>")
                        .AxisValue(50)
                        .X(0)
                        .Y(-60)
                        .ZIndex(1)                       // Lower z-index
                        .Add();
                    
                    // Foreground annotation (higher z-index)
                    annotations.Content("<div style='background:#1976D2; color:white; padding:10px; border-radius:5px;'>Front Layer</div>")
                        .AxisValue(50)
                        .X(0)
                        .Y(-35)
                        .ZIndex(2)                       // Higher z-index (appears on top)
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Two overlapping annotations where the blue annotation appears on top due to higher z-index.

## Multiple Annotations

Add multiple annotations to various gauge locations:

**Controller Code**:
```csharp
public ActionResult MultipleAnnotations()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Multiple Annotations";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Gauge with Multiple Annotations</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiAnnotationGauge")
        .Title("System Performance Dashboard")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(25).Color("#F44336").Add();
                    ranges.Start(25).End(50).Color("#FFC107").Add();
                    ranges.Start(50).End(75).Color("#4CAF50").Add();
                    ranges.Start(75).End(100).Color("#2E7D32").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(68).Add();
                })
                .Annotations(annotations =>
                {
                    // Minimum label
                    annotations.Content("<span style='font-size:11px; color:#666;'>MIN<br/>0</span>")
                        .AxisValue(0)
                        .X(-40)
                        .Y(0)
                        .ZIndex(1)
                        .Add();
                    
                    // Current value label
                    annotations.Content("<div style='background:#1976D2; color:white; padding:5px 10px; border-radius:3px; font-weight:bold;'>68%</div>")
                        .AxisValue(68)
                        .X(0)
                        .Y(-40)
                        .ZIndex(2)
                        .Add();
                    
                    // Maximum label
                    annotations.Content("<span style='font-size:11px; color:#666;'>MAX<br/>100</span>")
                        .AxisValue(100)
                        .X(40)
                        .Y(0)
                        .ZIndex(1)
                        .Add();
                    
                    // Status annotation
                    annotations.Content("<div style='font-size:13px; color:#2E7D32; font-weight:bold;'>✓ GOOD</div>")
                        .AxisValue(50)
                        .X(0)
                        .Y(40)
                        .ZIndex(2)
                        .Add();
                })
                .Add();
        })
        .Height("450px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with four annotations showing min, max, current value, and status.

## Real-World Example: Temperature Monitor with Warnings

**Controller Code**:
```csharp
public ActionResult TemperatureMonitor()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Temperature Monitor";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Industrial Temperature Monitor</h2>

<style>
    .temp-warning {
        background: #FFF9C4;
        border: 2px solid #FBC02D;
        color: #F57F17;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
    }
    
    .temp-normal {
        background: #F1F8E9;
        border: 2px solid #558B2F;
        color: #33691E;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
    }
    
    .temp-critical {
        background: #FFEBEE;
        border: 2px solid #C62828;
        color: #B71C1C;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
    }
</style>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("tempMonitorGauge")
        .Title("Reactor Temperature (0-150°C)")
        .Format("{value}°C")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(150)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(60).Color("#4CAF50").Add();
                    ranges.Start(60).End(100).Color("#FFC107").Add();
                    ranges.Start(100).End(150).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(75)
                        .Type(PointerType.Bar)
                        .Width(12)
                        .Color("#1976D2)
                        .Add();
                })
                .Annotations(annotations =>
                {
                    // Safe zone label
                    annotations.Content("<div class='temp-normal'>SAFE<br/>0-60°C</div>")
                        .AxisValue(30)
                        .X(-70)
                        .Y(0)
                        .Add();
                    
                    // Warning zone label
                    annotations.Content("<div class='temp-warning'>WARNING<br/>60-100°C</div>")
                        .AxisValue(80)
                        .X(0)
                        .Y(50)
                        .Add();
                    
                    // Critical zone label
                    annotations.Content("<div class='temp-critical'>CRITICAL<br/>100-150°C</div>")
                        .AxisValue(125)
                        .X(70)
                        .Y(0)
                        .Add();
                    
                    // Current reading
                    annotations.Content("<div style='background:#1976D2; color:white; padding:8px 12px; border-radius:4px; font-size:16px; font-weight:bold;'>75°C</div>")
                        .AxisValue(75)
                        .X(0)
                        .Y(-60)
                        .ZIndex(10)
                        .Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A professional temperature monitor with color-coded zone labels and current reading annotation.
