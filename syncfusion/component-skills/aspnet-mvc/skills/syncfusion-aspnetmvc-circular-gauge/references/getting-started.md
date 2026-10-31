# Getting Started

## Table of Contents
- [Installation](#installation)
- [ASP.NET MVC Configuration](#aspnet-mvc-configuration)
- [Basic Gauge Implementation](#basic-gauge-implementation)
- [Adding Titles](#adding-titles)
- [Basic Axes Configuration](#basic-axes-configuration)
- [Troubleshooting](#troubleshooting)

## Installation

### Step 1: Install NuGet Package

Open the NuGet Package Manager in Visual Studio:
- Go to Tools → NuGet Package Manager → Manage NuGet Packages for Solution
- Search for `Syncfusion.EJ2.MVC5`
- Click Install

Alternatively, use Package Manager Console:

```csharp
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

**Dependencies:**
The package includes required dependencies:
- **Newtonsoft.Json** - for JSON serialization
- **Syncfusion.Licensing** - for license validation

### Step 2: Add Namespace to Views

Edit `Web.config` located in the Views folder and add the namespace:

```xml
<configuration>
  <system.web.webServer>
    <compilation>
      <assemblies>
        <add assembly="Syncfusion.EJ2, Version=..." />
      </assemblies>
    </compilation>
    <system.webServer>
      <validation validateIntegratedModeConfiguration="false" />
    </system.webServer>
  </system.web.webServer>
  
  <!-- Add this within system.web -->
  <namespaces>
    <add namespace="Syncfusion.EJ2"/>
  </namespaces>
</configuration>
```

## ASP.NET MVC Configuration

### Add Scripts and Styles to Layout

Edit your `~/Pages/Shared/_Layout.cshtml` (or master page):

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Syncfusion CSS Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Other head content -->
</head>
<body>
    <!-- Page content -->
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
    
    <!-- Syncfusion Script Manager (must be at end of body) -->
    @Html.EJS().ScriptManager()
</body>
</html>
```

**Theme Options:** Available themes include:
- fluent (default)
- bootstrap
- bootstrap4
- bootstrap5
- fabric
- highcontrast
- material
- tailwind

## Basic Gauge Implementation

### Minimal Example

Create your gauge in a view file (e.g., `~/Home/Index.cshtml`):

```csharp
@Html.EJS().CircularGauge("container").Render();
```

### HTML Container

Ensure you have a container element:

```html
<div id="container" style="width:500px; height:500px;"></div>
@Html.EJS().CircularGauge("container").Render();
```

### First Complete Gauge

```csharp
@Html.EJS().CircularGauge("cpuGauge")
    .Title("CPU Usage (%)")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            StartAngle = 200,
            EndAngle = 160
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 65,
            Type = GaugePointerType.Needle
        });
    })
    .Render();
```

**What this does:**
- Creates a gauge with ID "cpuGauge"
- Sets title to "CPU Usage (%)"
- Configures axis from 0-100
- Adds a needle pointer at value 65

## Adding Titles

### Simple Title

```csharp
@Html.EJS().CircularGauge("gauge")
    .Title("Speed (km/h)")
    .Render();
```

### Styled Title

```csharp
@Html.EJS().CircularGauge("gauge")
    .Title("Temperature")
    .TitleStyle(ts => ts
        .Color("#FF5733")
        .FontFamily("Segoe UI")
        .FontSize("18px")
        .FontWeight("bold")
    )
    .Render();
```

**Title Style Properties:**
- `Color` - Text color
- `FontFamily` - Font type
- `FontSize` - Title size
- `FontWeight` - Bold, normal
- `TextAlignment` - Left, center, right

## Basic Axes Configuration

### Default Axis

The gauge automatically creates a default axis if none specified:

```csharp
@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100
        });
    })
    .Render();
```

### Custom Angle Range

```csharp
@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 200,
            StartAngle = 270,  // Start at top
            EndAngle = 90      // End at bottom
        });
    })
    .Render();
```

### Axis with Direction

```csharp
@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Direction = GaugeDirection.AntiClockWise  // or ClockWise
        });
    })
    .Render();
```

## Troubleshooting

### Issue: Gauge Not Rendering
- **Check:** Script manager is placed at END of body
- **Check:** Container div exists with matching ID
- **Check:** Styles are loaded from CDN
- **Solution:** Verify all three in layout file

### Issue: NuGet Package Not Installing
- **Check:** NuGet feed source configured
- **Check:** Package version available for your .NET version
- **Solution:** Check Syncfusion NuGet documentation for version compatibility

### Issue: Styling Not Applied
- **Check:** CSS theme link is correct
- **Check:** CSS file loads before scripts
- **Solution:** Verify CDN URL is accessible in your environment

### Issue: Data Not Displaying
- **Check:** Axis minimum/maximum values are set
- **Check:** Pointer value is within axis range
- **Solution:** Add explicit axis configuration

## Next Steps

After setting up your first gauge:
1. Learn about axes configuration: [axes-and-scales.md](axes-and-scales.md)
2. Add pointers to display data: [pointers.md](pointers.md)
3. Create visual zones with ranges: [ranges-and-indicators.md](ranges-and-indicators.md)
4. Customize appearance: [appearance-and-styling.md](appearance-and-styling.md)
