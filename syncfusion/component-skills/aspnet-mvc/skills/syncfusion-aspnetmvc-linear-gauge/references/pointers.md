# Working with Pointers

## Table of Contents
- [Pointer Types](#pointer-types)
- [Marker Pointer Shapes](#marker-pointer-shapes)
- [Pointer Customization](#pointer-customization)
- [Multiple Pointers](#multiple-pointers)
- [Pointer Animation](#pointer-animation)

---

## Pointer Types

The Linear Gauge supports two main pointer types: **Bar** and **Marker**.

### Bar Pointer

A bar pointer displays as a filled rectangular bar extending along the axis.

**Controller Code**:
```csharp
public ActionResult BarPointer()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Bar Pointer";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Bar Pointer Example</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("barPointerGauge")
        .Title("CPU Usage - Bar Pointer")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#4CAF50").Add();      // Good
                    ranges.Start(30).End(70).Color("#FFC107").Add();     // Caution
                    ranges.Start(70).End(100).Color("#F44336").Add();    // Critical
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55)
                        .Type(PointerType.Bar)           // Bar pointer type
                        .Width(15)                       // Width of bar
                        .Color("#2196F3")                // Bar color
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A blue bar pointer showing CPU usage at 55%.

### Marker Pointer

A marker pointer displays as a specific shape (circle, triangle, etc.) at the value location.

**Controller Code**:
```csharp
public ActionResult MarkerPointer()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Marker Pointer";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Marker Pointer Example</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("markerPointerGauge")
        .Title("Temperature - Marker Pointer")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(50)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(15).Color("#2196F3").Add();      // Cold
                    ranges.Start(15).End(25).Color("#4CAF50").Add();     // Comfortable
                    ranges.Start(25).End(50).Color("#F44336").Add();     // Hot
                })
                .Pointers(pointers =>
                {
                    pointers.Value(28)
                        .Type(PointerType.Marker)        // Marker pointer type
                        .MarkerType(MarkerType.Triangle) // Shape: Triangle
                        .Width(18)                       // Marker size
                        .Color("#FF5722")                // Marker color
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A triangle marker showing temperature at 28°C.

---

## Marker Pointer Shapes

Marker pointers support multiple shapes. Here's a complete reference showing all shapes:

### All Available Marker Shapes

**Controller Code**:
```csharp
public ActionResult AllMarkerShapes()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "All Marker Shapes";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>All Marker Pointer Shapes</h2>

<style>
    .shape-row {
        margin-bottom: 30px;
    }
</style>

<!-- Circle Marker -->
<div class="shape-row">
    @Html.EJS().LinearGauge("circleMarker")
        .Title("Circle Marker")
        .Axes(axes =>
        {
            axes.Minimum(0).Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Circle)
                        .Width(20)
                        .Color("#FF6B6B")
                        .Add();
                })
                .Add();
        })
        .Height("250px")
        .Width("100%")
        .Render();
</div>

<!-- Rectangle Marker -->
<div class="shape-row">
    @Html.EJS().LinearGauge("rectangleMarker")
        .Title("Rectangle Marker")
        .Axes(axes =>
        {
            axes.Minimum(0).Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Rectangle)
                        .Width(20)
                        .Color("#4ECDC4")
                        .Add();
                })
                .Add();
        })
        .Height("250px")
        .Width("100%")
        .Render();
</div>

<!-- Triangle Marker -->
<div class="shape-row">
    @Html.EJS().LinearGauge("triangleMarker")
        .Title("Triangle Marker")
        .Axes(axes =>
        {
            axes.Minimum(0).Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Triangle)
                        .Width(20)
                        .Color("#FFD93D")
                        .Add();
                })
                .Add();
        })
        .Height("250px")
        .Width("100%")
        .Render();
</div>

<!-- Inverted Triangle Marker -->
<div class="shape-row">
    @Html.EJS().LinearGauge("invertedTriangleMarker")
        .Title("Inverted Triangle Marker (Default)")
        .Axes(axes =>
        {
            axes.Minimum(0).Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.InvertedTriangle)
                        .Width(20)
                        .Color("#6BCB77")
                        .Add();
                })
                .Add();
        })
        .Height("250px")
        .Width("100%")
        .Render();
</div>

<!-- Diamond Marker -->
<div class="shape-row">
    @Html.EJS().LinearGauge("diamondMarker")
        .Title("Diamond Marker")
        .Axes(axes =>
        {
            axes.Minimum(0).Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Diamond)
                        .Width(20)
                        .Color("#A8DADC")
                        .Add();
                })
                .Add();
        })
        .Height("250px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Six different gauge shapes displayed with their respective marker types.

### Image Marker (Custom Icon)

Display an image instead of a predefined shape:

**Controller Code**:
```csharp
public ActionResult ImageMarker()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Image Marker";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Custom Image Marker</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("imageMarkerGauge")
        .Title("Location Indicator with Image")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(45)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Image)
                        .ImageUrl("https://cdn-icons-png.flaticon.com/512/833/833472.png")
                        .Width(30)
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with a custom image as the marker.

### Text Marker (Alphanumeric)

Display text or numbers as a marker:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("textMarkerGauge")
        .Title("Text Marker Example")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(75)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Text)
                        .Text("75")                      // Display "75" as marker
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with "75" displayed as the marker at the pointer location.

---

## Pointer Customization

### Detailed Pointer Styling

**Controller Code**:
```csharp
public ActionResult CustomizePointer()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Pointer Customization";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Fully Customized Pointer</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("customizedPointerGauge")
        .Title("Pressure Gauge - Customized Pointer")
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
                    pointers.Value(85)
                        .Type(PointerType.Bar)
                        .Width(18)                       // Bar thickness
                        .Color("#2196F3")                // Bar color
                        .Offset(5)                       // Distance from axis center
                        .RoundedCorners(true)            // Rounded bar ends
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A pointer with custom width, color, offset, and rounded corners.

### Pointer with Border

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("borderPointerGauge")
        .Title("Pointer with Border")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(55)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Circle)
                        .Width(25)
                        .Color("#FFC107")                // Pointer fill color
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

---

## Multiple Pointers

Add multiple pointers to the same gauge to compare values or show relationships.

### Two-Pointer Configuration

**Controller Code**:
```csharp
public ActionResult MultiplePointers()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Multiple Pointers";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Multiple Pointers - Current vs Target</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("twoPointerGauge")
        .Title("Sales Performance: Actual vs Target")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(1000)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(500).Color("#FFEBEE").Add();
                    ranges.Start(500).End(750).Color("#FFF3E0").Add();
                    ranges.Start(750).End(1000).Color("#E8F5E9").Add();
                })
                .Pointers(pointers =>
                {
                    // Current sales (bar)
                    pointers.Value(680)
                        .Type(PointerType.Bar)
                        .Width(12)
                        .Color("#2196F3")
                        .Add();
                    
                    // Target sales (marker)
                    pointers.Value(850)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Triangle)
                        .Width(18)
                        .Color("#F44336")
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Blue bar shows current sales (680), red triangle shows target (850).

### Three-Pointer Dashboard

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("threePointerGauge")
        .Title("System Metrics - CPU, Memory, Disk")
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
                    // CPU Usage
                    pointers.Value(45)
                        .Type(PointerType.Bar)
                        .Width(8)
                        .Color("#2196F3")
                        .Add();
                    
                    // Memory Usage
                    pointers.Value(62)
                        .Type(PointerType.Bar)
                        .Width(8)
                        .Color("#FF9800")
                        .Add();
                    
                    // Disk Usage
                    pointers.Value(78)
                        .Type(PointerType.Bar)
                        .Width(8)
                        .Color("#F44336")
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Three overlapping bar pointers showing different metrics.

---

## Pointer Animation

Animate pointers when the gauge loads or when values change.

### Animation on Load

**Controller Code**:
```csharp
public ActionResult PointerAnimation()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Pointer Animation";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Animated Pointer</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("animatedPointerGauge")
        .Title("Animated Value Indicator")
        .AnimationDuration(2000)                    // 2 second animation
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(75)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#2196F3")
                        .Animation(animation =>
                        {
                            animation.Enable(true)       // Enable animation
                                .Duration(1500)          // Animation duration in ms
                                .Delay(500);             // Delay before animation starts
                        })
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Pointer animates from 0 to 75 over 1.5 seconds when the page loads.

### Multiple Animations

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiAnimationGauge")
        .Title("Multiple Animated Pointers")
        .AnimationDuration(1500)
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    // First pointer
                    pointers.Value(40)
                        .Type(PointerType.Bar)
                        .Width(10)
                        .Color("#4CAF50")
                        .Animation(animation =>
                        {
                            animation.Enable(true).Duration(1000);
                        })
                        .Add();
                    
                    // Second pointer
                    pointers.Value(75)
                        .Type(PointerType.Bar)
                        .Width(10)
                        .Color("#FFC107")
                        .Animation(animation =>
                        {
                            animation.Enable(true).Duration(1200).Delay(200);
                        })
                        .Add();
                    
                    // Third pointer
                    pointers.Value(90)
                        .Type(PointerType.Bar)
                        .Width(10)
                        .Color("#F44336)
                        .Animation(animation =>
                        {
                            animation.Enable(true).Duration(1400).Delay(400);
                        })
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Three pointers animate sequentially with staggered delays.

---

## Complete Real-World Example: Live Dashboard

**Controller Code**:
```csharp
public ActionResult LiveDashboard()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Live Dashboard";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Real-Time System Dashboard</h2>

<div style="padding: 20px;">
    <!-- Server Health -->
    @Html.EJS().LinearGauge("serverHealthGauge")
        .Title("Server Health (0-100)")
        .AnimationDuration(1000)
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#F44336").Add();    // Critical
                    ranges.Start(30).End(60).Color("#FFC107").Add();   // Warning
                    ranges.Start(60).End(100).Color("#4CAF50").Add();  // Healthy
                })
                .Pointers(pointers =>
                {
                    pointers.Value(78)
                        .Type(PointerType.Bar)
                        .Width(14)
                        .Color("#2196F3")
                        .Add();
                })
                .Add();
        })
        .Height("350px")
        .Width("100%")
        .Render();
</div>

<div style="padding: 20px;">
    <!-- Response Time -->
    @Html.EJS().LinearGauge("responseTimeGauge")
        .Title("Response Time (0-5000 ms)")
        .AnimationDuration(1000)
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(5000)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(1000).Color("#4CAF50").Add();     // Fast
                    ranges.Start(1000).End(2500).Color("#FFC107").Add();  // Moderate
                    ranges.Start(2500).End(5000).Color("#F44336").Add();  // Slow
                })
                .Pointers(pointers =>
                {
                    pointers.Value(1250)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Circle)
                        .Width(16)
                        .Color("#FF5722")
                        .Add();
                })
                .Add();
        })
        .Height("350px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Live dashboard showing server health and response time metrics with appropriate color zones.
