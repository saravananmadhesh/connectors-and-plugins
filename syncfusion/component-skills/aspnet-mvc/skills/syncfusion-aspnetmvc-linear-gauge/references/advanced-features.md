# Advanced Features

## Table of Contents
- [Animation Configuration](#animation-configuration)
- [Print Functionality](#print-functionality)
- [Export to Image](#export-to-image)
- [PDF Export](#pdf-export)
- [Internationalization](#internationalization)
- [How-To Examples](#how-to-examples)

---

## Animation Configuration

### Global Animation Duration

Control animation for all gauge elements:

**Controller Code**:
```csharp
public ActionResult GlobalAnimation()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Advanced Features";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Global Animation Configuration</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("animatedGauge")
        .Title("Animated Gauge")
        .AnimationDuration(2000)                     // 2 second animation for all elements
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
                    pointers.Value(65).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<p style="color: #666; margin-top: 20px;">
    Watch as the gauge animates over 2 seconds when the page loads.<br/>
    All elements (ranges, labels, pointers) animate smoothly.
</p>
```

**Result**: Entire gauge animates smoothly over 2 seconds on page load.

### Pointer-Specific Animation

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("pointerAnimationGauge")
        .Title("Pointer-Only Animation")
        .AnimationDuration(1000)
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(100).Color("#E0E0E0").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(75)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#2196F3")
                        .Animation(animation =>
                        {
                            animation.Enable(true)
                                .Duration(2000)
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

**Result**: Pointer animates after 0.5 second delay over 2 seconds.

---

## Print Functionality

Print the gauge as part of your application:

**Controller Code**:
```csharp
public ActionResult PrintGauge()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Print Gauge";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Print Gauge</h2>

<div style="padding: 20px;">
    <button id="printBtn" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 3px; cursor: pointer;">
        Print Gauge
    </button>
    
    <div style="margin-top: 20px;">
        @Html.EJS().LinearGauge("printGauge")
            .Title("System Performance Report")
            .AllowPrint(true)                        // Enable print
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
                        pointers.Value(55).Add();
                    })
                    .Add();
            })
            .Height("400px")
            .Width("100%")
            .Render();
    </div>
</div>

<script>
document.getElementById("printBtn").addEventListener("click", function() {
    var gauge = document.getElementById("printGauge").ej2_instances[0];
    gauge.print();
});
</script>
```

**Result**: Click button to print the gauge to your printer or as PDF.

---

## Export to Image

Export gauge as PNG or JPEG:

**Controller Code**:
```csharp
public ActionResult ExportImage()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Export Image";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Export Gauge as Image</h2>

<div style="padding: 20px;">
    <div style="margin-bottom: 20px;">
        <button id="exportPngBtn" style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">
            Export as PNG
        </button>
        <button id="exportJpgBtn" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">
            Export as JPG
        </button>
    </div>
    
    @Html.EJS().LinearGauge("exportGauge")
        .Title("Performance Metrics")
        .AllowImageExport(true)                      // Enable image export
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
                    pointers.Value(62).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
document.getElementById("exportPngBtn").addEventListener("click", function() {
    var gauge = document.getElementById("exportGauge").ej2_instances[0];
    gauge.export("PNG", "gauge");
});

document.getElementById("exportJpgBtn").addEventListener("click", function() {
    var gauge = document.getElementById("exportGauge").ej2_instances[0];
    gauge.export("JPEG", "gauge");
});
</script>
```

**Result**: Click buttons to download gauge as PNG or JPG image file.

---

## PDF Export

Export gauge as PDF document:

**Controller Code**:
```csharp
public ActionResult ExportPDF()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Export PDF";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Export Gauge as PDF</h2>

<div style="padding: 20px;">
    <div style="margin-bottom: 20px;">
        <button id="exportPortrait" style="padding: 10px 20px; background: #F57C00; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">
            Export as PDF (Portrait)
        </button>
        <button id="exportLandscape" style="padding: 10px 20px; background: #E91E63; color: white; border: none; border-radius: 3px; cursor: pointer;">
            Export as PDF (Landscape)
        </button>
    </div>
    
    @Html.EJS().LinearGauge("pdfGauge")
        .Title("Quarterly Performance Report")
        .AllowPdfExport(true)                        // Enable PDF export
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
                    pointers.Value(78).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
document.getElementById("exportPortrait").addEventListener("click", function() {
    var gauge = document.getElementById("pdfGauge").ej2_instances[0];
    gauge.export("PDF", "gauge", "Portrait");
});

document.getElementById("exportLandscape").addEventListener("click", function() {
    var gauge = document.getElementById("pdfGauge").ej2_instances[0];
    gauge.export("PDF", "gauge", "Landscape");
});
</script>
```

**Result**: Export gauge as PDF in portrait or landscape orientation.

---

## Internationalization

Support multiple languages and number formats:

### Currency Format

**Controller Code**:
```csharp
public ActionResult CurrencyFormat()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Currency Format";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Currency Format Labels</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("currencyGauge")
        .Title("Revenue Gauge ($)")
        .Format("c")                                 // Currency format
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100000)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px");
                    });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(65000).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Labels display as currency: "$0", "$25000", "$50000", etc.

### Percentage Format

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("percentageGauge")
        .Title("Completion Percentage")
        .Format("p")                                 // Percentage format
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(1)
                .LabelStyle(labelStyle =>
                {
                    labelStyle.Font(font =>
                    {
                        font.Size("12px");
                    });
                })
                .Pointers(pointers =>
                {
                    pointers.Value(0.75).Add();      // 75%
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Labels display as percentages: "0%", "25%", "50%", "75%", "100%".

### Custom Locale

**View Code**:
```html
<div style="padding: 20px;">
    @Html.EJS().LinearGauge("localeGauge")
        .Title("Multi-Language Support")
        .Locale("fr")                                // French locale
        .Format("n")                                 // Number format
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(10000)
                .Pointers(pointers =>
                {
                    pointers.Value(5500).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Numbers formatted according to French locale standards.

---

## How-To Examples

### How-To: Dynamic Gauge Rendering

Create gauges programmatically based on data:

**Controller Code**:
```csharp
public ActionResult DynamicGauge()
{
    var gaugeData = new List<dynamic>
    {
        new { Name = "CPU", Value = 45, Max = 100 },
        new { Name = "Memory", Value = 62, Max = 100 },
        new { Name = "Disk", Value = 78, Max = 100 }
    };
    
    ViewBag.GaugeData = gaugeData;
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Dynamic Gauges";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Dynamically Generated Gauges</h2>

<div style="padding: 20px;">
    @{
        int count = 0;
        foreach (var gauge in ViewBag.GaugeData)
        {
            count++;
            <div style="margin-bottom: 20px;">
                @Html.EJS().LinearGauge("gauge" + count)
                    .Title(gauge.Name)
                    .Axes(axes =>
                    {
                        axes.Minimum(0)
                            .Maximum(gauge.Max)
                            .Ranges(ranges =>
                            {
                                ranges.Start(0).End(gauge.Max * 0.3).Color("#4CAF50").Add();
                                ranges.Start(gauge.Max * 0.3).End(gauge.Max * 0.7).Color("#FFC107").Add();
                                ranges.Start(gauge.Max * 0.7).End(gauge.Max).Color("#F44336").Add();
                            })
                            .Pointers(pointers =>
                            {
                                pointers.Value(gauge.Value).Add();
                            })
                            .Add();
                    })
                    .Height("300px")
                    .Width("100%")
                    .Render();
            </div>
        }
    }
</div>
```

**Result**: Three gauges automatically generated from controller data.

### How-To: Real-Time Value Updates

Update pointer values with AJAX:

**Controller Code**:
```csharp
public ActionResult UpdateGaugeValue(int value)
{
    return Json(new { success = true, value = value });
}

public ActionResult RealTimeGauge()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Real-Time Updates";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Real-Time Gauge Updates</h2>

<div style="padding: 20px;">
    <button id="updateBtn" style="padding: 10px 20px; background: #1976D2; color: white; border: none; border-radius: 3px; cursor: pointer; margin-bottom: 20px;">
        Update Value
    </button>
    
    @Html.EJS().LinearGauge("realtimeGauge")
        .Title("Real-Time Data")
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
                    pointers.Value(30).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
document.getElementById("updateBtn").addEventListener("click", function() {
    var gauge = document.getElementById("realtimeGauge").ej2_instances[0];
    var newValue = Math.random() * 100;
    gauge.setPointerValue(0, 0, newValue);
});
</script>
```

**Result**: Click button to update pointer value dynamically.

### How-To: Create a Dashboard Grid

Combine multiple gauges in a responsive grid:

**View Code**:
```html
@{
    ViewBag.Title = "Dashboard Grid";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>System Monitoring Dashboard</h2>

<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    
    .gauge-card {
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 15px;
    }
</style>

<div class="dashboard-grid">
    <!-- Gauge 1: CPU -->
    <div class="gauge-card">
        @Html.EJS().LinearGauge("cpuCard")
            .Title("CPU Usage")
            .Axes(axes =>
            {
                axes.Minimum(0).Maximum(100)
                    .Pointers(pointers =>
                    {
                        pointers.Value(45).Add();
                    })
                    .Add();
            })
            .Height("250px")
            .Width("100%")
            .Render();
    </div>
    
    <!-- Gauge 2: Memory -->
    <div class="gauge-card">
        @Html.EJS().LinearGauge("memoryCard")
            .Title("Memory Usage")
            .Axes(axes =>
            {
                axes.Minimum(0).Maximum(100)
                    .Pointers(pointers =>
                    {
                        pointers.Value(62).Add();
                    })
                    .Add();
            })
            .Height("250px")
            .Width("100%")
            .Render();
    </div>
    
    <!-- Gauge 3: Disk -->
    <div class="gauge-card">
        @Html.EJS().LinearGauge("diskCard")
            .Title("Disk Usage")
            .Axes(axes =>
            {
                axes.Minimum(0).Maximum(100)
                    .Pointers(pointers =>
                    {
                        pointers.Value(78).Add();
                    })
                    .Add();
            })
            .Height("250px")
            .Width("100%")
            .Render();
    </div>
    
    <!-- Gauge 4: Network -->
    <div class="gauge-card">
        @Html.EJS().LinearGauge("networkCard")
            .Title("Network Load")
            .Axes(axes =>
            {
                axes.Minimum(0).Maximum(100)
                    .Pointers(pointers =>
                    {
                        pointers.Value(35).Add();
                    })
                    .Add();
            })
            .Height("250px")
            .Width("100%")
            .Render();
    </div>
</div>
```

**Result**: Responsive 4-gauge dashboard that adapts to screen size.

---

## Accessibility Best Practices

When building gauges for public applications:

1. **Add ARIA labels**: Include descriptive titles and annotations
2. **Use high contrast colors**: Ensure readable color combinations
3. **Provide text alternatives**: Include data tables or text descriptions
4. **Enable keyboard interaction**: Allow drag-and-drop via keyboard
5. **Test with screen readers**: Verify gauge information is accessible

Example with accessibility:

```html
<div aria-label="System Performance Dashboard">
    @Html.EJS().LinearGauge("accessibleGauge")
        .Title("CPU Usage - Accessible")
        .AriaLabel("CPU usage gauge showing current load")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
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
