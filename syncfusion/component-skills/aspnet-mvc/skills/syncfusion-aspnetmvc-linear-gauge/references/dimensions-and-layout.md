# Sizing and Layout

## Sizing in Pixels

Set fixed gauge dimensions:

**Controller Code**:
```csharp
public ActionResult SizeInPixels()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Dimensions";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Fixed Size Gauge (Pixels)</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("pixelGauge")
        .Title("Fixed Size Gauge")
        .Height("400px")                             // Height in pixels
        .Width("600px")                              // Width in pixels
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
        .Render();
</div>
```

**Result**: Gauge with fixed dimensions of 600px wide by 400px tall.

---

## Responsive Sizing (Percentage)

Make gauges responsive using percentages:

**Controller Code**:
```csharp
public ActionResult ResponsiveSize()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Responsive Size";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Responsive Gauge (Percentage)</h2>

<div style="padding: 20px; border: 1px solid #ccc;">
    @Html.EJS().LinearGauge("responsiveGauge")
        .Title("Responsive Gauge - Resize Browser to Test")
        .Height("100%")                              // 100% of parent height
        .Width("100%")                               // 100% of parent width (stretches to fill)
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
                    pointers.Value(65).Add();
                })
                .Add();
        })
        .Render();
</div>

<p style="margin-top: 20px; font-style: italic;">Note: Resize the browser window to see the gauge scale responsively.</p>
```

**Result**: Gauge that stretches to fit its container - try resizing the browser window.

---

## Container Sizing

Control gauge layout within a container:

**Controller Code**:
```csharp
public ActionResult ContainerSizing()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Container Sizing";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Multiple Gauges with Responsive Layout</h2>

<style>
    .gauge-wrapper {
        display: inline-block;
        width: 32%;
        margin-right: 1%;
        vertical-align: top;
        border: 1px solid #ddd;
        padding: 10px;
        box-sizing: border-box;
    }
</style>

<!-- Gauge 1 -->
<div class="gauge-wrapper">
    @Html.EJS().LinearGauge("gauge1")
        .Title("CPU Usage")
        .Height("300px")
        .Width("100%")
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
        .Render();
</div>

<!-- Gauge 2 -->
<div class="gauge-wrapper">
    @Html.EJS().LinearGauge("gauge2")
        .Title("Memory Usage")
        .Height("300px")
        .Width("100%")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(62).Add();
                })
                .Add();
        })
        .Render();
</div>

<!-- Gauge 3 -->
<div class="gauge-wrapper">
    @Html.EJS().LinearGauge("gauge3")
        .Title("Disk Usage")
        .Height("300px")
        .Width("100%")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(78).Add();
                })
                .Add();
        })
        .Render();
</div>
```

**Result**: Three responsive gauges side-by-side that resize together.

---

## Vertical Gauge Layout

Create vertical (portrait) oriented gauges:

**Controller Code**:
```csharp
public ActionResult VerticalLayout()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Vertical Layout";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Vertical Gauge</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("verticalGauge")
        .Title("Vertical Gauge")
        .Orientation(Orientation.Vertical)           // Vertical orientation
        .Height("500px")
        .Width("300px")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#4CAF50").Add();
                    ranges.Start(40).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#2196F3")
                        .Add();
                })
                .Add();
        })
        .Render();
</div>
```

**Result**: A vertically oriented gauge with the scale running top to bottom.

---

## Horizontal Gauge Layout (Default)

Explicitly set horizontal orientation:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("horizontalGauge")
        .Title("Horizontal Gauge")
        .Orientation(Orientation.Horizontal)         // Horizontal (default)
        .Height("300px")
        .Width("600px")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#4CAF50").Add();
                    ranges.Start(40).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#2196F3")
                        .Add();
                })
                .Add();
        })
        .Render();
</div>
```

**Result**: A horizontally oriented gauge with scale running left to right.

---

## Fluid Layout Example

Create a gauge that adapts to container size:

**Controller Code**:
```csharp
public ActionResult FluidLayout()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Fluid Layout";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Fluid Layout Gauge</h2>

<style>
    .dashboard-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .gauge-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    
    .gauge-item {
        flex: 1;
        min-width: 300px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>

<div class="dashboard-container">
    <h3>System Dashboard</h3>
    
    <!-- Row 1: CPU and Memory -->
    <div class="gauge-row">
        <div class="gauge-item">
            @Html.EJS().LinearGauge("cpuGauge")
                .Title("CPU Usage")
                .Height("250px")
                .Width("100%")
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
                            pointers.Value(35).Add();
                        })
                        .Add();
                })
                .Render();
        </div>
        
        <div class="gauge-item">
            @Html.EJS().LinearGauge("memoryGauge")
                .Title("Memory Usage")
                .Height("250px")
                .Width("100%")
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
                            pointers.Value(62).Add();
                        })
                        .Add();
                })
                .Render();
        </div>
    </div>
    
    <!-- Row 2: Disk and Network -->
    <div class="gauge-row">
        <div class="gauge-item">
            @Html.EJS().LinearGauge("diskGauge")
                .Title("Disk Usage")
                .Height("250px")
                .Width("100%")
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
                            pointers.Value(78).Add();
                        })
                        .Add();
                })
                .Render();
        </div>
        
        <div class="gauge-item">
            @Html.EJS().LinearGauge("networkGauge")
                .Title("Network Bandwidth")
                .Height("250px")
                .Width("100%")
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
                            pointers.Value(45).Add();
                        })
                        .Add();
                })
                .Render();
        </div>
    </div>
</div>
```

**Result**: A responsive dashboard with four gauges that arrange based on screen size.

---

## Default Sizing Behavior

When height and width are not specified:

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("defaultGauge")
        .Title("Default Sizing")
        <!-- No Height or Width specified -->
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
        .Render();
</div>

<p style="margin-top: 20px; color: #666;">
    <strong>Default behavior:</strong><br/>
    • Height: 450px (default)<br/>
    • Width: 100% of parent container (fills horizontally)<br/>
    • Orientation: Horizontal
</p>
```

**Result**: Gauge using defaults (450px height, 100% width, horizontal layout).
