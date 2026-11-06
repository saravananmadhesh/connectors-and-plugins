# Getting Started with ASP.NET MVC Linear Gauge

This guide walks you through installing, setting up, and creating your first Linear Gauge component.

## Prerequisites

- **ASP.NET MVC 5** or higher
- **Visual Studio 2015** or later
- **.NET Framework 4.5** or higher

## Installation: Adding Syncfusion NuGet Packages

### Step 1: Open NuGet Package Manager
In Visual Studio, go to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**

### Step 2: Search and Install
Search for `Syncfusion.EJ2.MVC5` and click **Install**

```
Install-Package Syncfusion.EJ2.MVC5 -Version 21.1.35
```

> **Note**: Replace the version number with the latest available version. The package automatically installs dependencies including `Newtonsoft.Json` and `Syncfusion.Licensing`.

## Configuration: Update Web.config

### Step 1: Add Syncfusion Namespace to Views Web.config
Open `Views/Web.config` and add the namespace:

```xml
<configuration>
  <appSettings>
    <!-- Existing settings -->
  </appSettings>
  
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages>
      <namespaces>
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
  
  <!-- Rest of configuration -->
</configuration>
```

## Step 2: Add Script and CSS References to Layout

Open `~/Views/Shared/_Layout.cshtml` and add CDN references in the `<head>` section:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET Application</title>
    
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/21.1.35/material.css" />
    
    <!-- jQuery (required for EJ2) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- Syncfusion JavaScript -->
    <script src="https://cdn.syncfusion.com/ej2/21.1.35/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    <!-- Register Syncfusion Script Manager at the end of body -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

## Creating Your First Linear Gauge

### Complete Working Example

#### Controller Code (GaugeController.cs)
```csharp
using System.Web.Mvc;

namespace MyGaugeApp.Controllers
{
    public class GaugeController : Controller
    {
        // GET: Gauge
        public ActionResult Index()
        {
            return View();
        }
    }
}
```

#### View Code (Index.cshtml)
```html
@{
    ViewBag.Title = "My First Linear Gauge";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>My First Linear Gauge</h2>

<div id="gaugeContainer" style="padding: 20px;">
    @Html.EJS().LinearGauge("gauge")
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

**Result**: A basic linear gauge with a scale from 0 to 100 and a pointer at value 50.

---

## Example 2: Gauge with Ranges and Title

This example adds colored ranges and a title:

#### Controller Code
```csharp
public ActionResult RangeGauge()
{
    return View();
}
```

#### View Code (RangeGauge.cshtml)
```html
@{
    ViewBag.Title = "Gauge with Ranges";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Temperature Indicator</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("tempGauge")
        .Title("Temperature (°C)")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    // Cold zone (0-20)
                    ranges.Start(0)
                        .End(20)
                        .Color("#2E88F0")
                        .Add();
                    
                    // Comfortable zone (20-25)
                    ranges.Start(20)
                        .End(25)
                        .Color("#4CAF50")
                        .Add();
                    
                    // Warm zone (25-35)
                    ranges.Start(25)
                        .End(35)
                        .Color("#FFC107")
                        .Add();
                    
                    // Hot zone (35-100)
                    ranges.Start(35)
                        .End(100)
                        .Color("#F44336")
                        .Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(28).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A temperature gauge with color-coded zones and a title.

---

## Example 3: Multiple Pointers

Display multiple data points on the same gauge:

#### Controller Code
```csharp
public ActionResult MultiPointerGauge()
{
    return View();
}
```

#### View Code (MultiPointerGauge.cshtml)
```html
@{
    ViewBag.Title = "Multiple Pointers";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Pressure Monitoring</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("pressureGauge")
        .Title("Pressure Level (PSI)")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(150)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(50).Color("#4CAF50").Add();      // Safe
                    ranges.Start(50).End(100).Color("#FFC107").Add();    // Caution
                    ranges.Start(100).End(150).Color("#F44336").Add();   // Danger
                })
                .Pointers(pointers =>
                {
                    // Current pressure
                    pointers.Value(65)
                        .Type(PointerType.Bar)
                        .Width(8)
                        .Color("#2196F3")
                        .Add();
                    
                    // Average pressure
                    pointers.Value(55)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Circle)
                        .Width(12)
                        .Color("#FF9800")
                        .Add();
                })
                .Add();
        })
        .Height("350px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with two pointers showing current and average pressure.

---

## Example 4: Bar Pointer Type

Using a bar pointer instead of a marker:

#### Controller Code
```csharp
public ActionResult BarPointerGauge()
{
    return View();
}
```

#### View Code (BarPointerGauge.cshtml)
```html
@{
    ViewBag.Title = "Bar Pointer Gauge";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>CPU Usage Monitor</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("cpuGauge")
        .Title("CPU Usage (%)")
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
                    pointers.Value(45)
                        .Type(PointerType.Bar)
                        .Width(20)
                        .Color("#2196F3")
                        .Add();
                })
                .Add();
        })
        .Height("300px")
        .Width("100%")
        .Render();
</div>
```

**Result**: A gauge with a thick bar pointer showing CPU usage.

---

## Verifying Your Setup

After creating your first gauge, verify:

1. **The gauge renders** without JavaScript errors in the browser console
2. **The title appears** above the gauge
3. **The pointer displays** at the specified value
4. **Colors are visible** for ranges (if added)
5. **The gauge is responsive** when resizing the browser

## Common Issues and Solutions

### Issue: "Syncfusion.EJ2 namespace not recognized"
**Solution**: Verify that `Syncfusion.EJ2` is added to `Views/Web.config` namespaces section.

### Issue: Gauge doesn't render
**Solution**: Ensure the script manager `@Html.EJS().ScriptManager()` is in your layout file.

### Issue: Styles not applied
**Solution**: Check that Syncfusion CSS is loaded before other stylesheets in the `<head>` section.

### Issue: Pointer not visible
**Solution**: Verify the pointer value is within the axis minimum and maximum range.

---

## Next Steps

Now that you have a working gauge:

- **Customize Axes**: Read the [references/axes-configuration.md](references/axes-configuration.md) guide to configure scales and labels
- **Add More Pointers**: Check [references/pointers.md](references/pointers.md) for pointer types and shapes
- **Define Ranges**: Use [references/ranges.md](references/ranges.md) to create value zones
- **Style Your Gauge**: Visit [references/appearance-and-styling.md](references/appearance-and-styling.md) for themes and colors
- **Add Interactivity**: Explore [references/user-interactions.md](references/user-interactions.md) for tooltips and events
