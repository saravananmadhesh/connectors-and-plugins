---
name: syncfusion-aspnetmvc-linear-gauge
description: Implement Syncfusion ASP.NET MVC Linear Gauge component for visualizing numerical values on a linear scale. Use this skill when building data visualization dashboards, creating measurement displays, monitoring systems, or displaying progress/status indicators. Includes full setup, axis configuration, pointers, ranges, annotations, styling, interactions, animations, and export capabilities.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion ASP.NET MVC Linear Gauge

The Linear Gauge control is a versatile data visualization component that renders numerical values on a linear axis. Built with SVG for scalability and performance, it supports multiple pointers, ranges, annotations, animations, and interactive features like tooltips and drag-and-drop pointer manipulation.

## When to Use This Skill

✅ Building **dashboards** that display numerical metrics (temperature, pressure, speed)  
✅ Creating **progress indicators** or **status displays**  
✅ Implementing **real-time monitoring** systems with animated pointers  
✅ Designing **measurement applications** (gauges, meters, indicators)  
✅ Adding **visual ranges** to highlight safe/warning/danger zones  
✅ Exporting **reports** with visual gauge snapshots  

## Key Features

- **Multiple Pointers**: Add Bar and Marker pointers to the same axis
- **Value Ranges**: Highlight specific value bands with custom colors and styles
- **Annotations**: Add custom text, HTML, or images at specific positions
- **Animations**: Smooth pointer and element animations on load
- **Tooltips**: Interactive hover information with custom formatting
- **Drag & Drop**: Manipulate pointer values interactively
- **Print & Export**: Generate PNG, JPEG, or PDF outputs
- **Internationalization**: Supports multiple languages and number formats
- **Responsive**: Automatically scales to container dimensions

## Documentation and Navigation Guide

### 📍 Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)  
When you need to: Set up the component for the first time, install NuGet packages, create a basic linear gauge.

### 📍 Configuring Axes
📄 **Read:** [references/axes-configuration.md](references/axes-configuration.md)  
When you need to: Set minimum/maximum values, customize axis lines, ticks, and labels, create multiple axes, format numbers.

### 📍 Working with Pointers
📄 **Read:** [references/pointers.md](references/pointers.md)  
When you need to: Add Bar or Marker pointers, change pointer shapes, animate pointers, display multiple pointers.

### 📍 Defining Ranges
📄 **Read:** [references/ranges.md](references/ranges.md)  
When you need to: Create visual bands for different value zones, customize range colors and positions, add multiple ranges.

### 📍 Adding Annotations
📄 **Read:** [references/annotations.md](references/annotations.md)  
When you need to: Add text labels, custom HTML, or images to specific gauge locations, control layering with z-index.

### 📍 Styling and Appearance
📄 **Read:** [references/appearance-and-styling.md](references/appearance-and-styling.md)  
When you need to: Customize backgrounds, borders, titles, container types, and apply themes.

### 📍 Sizing and Layout
📄 **Read:** [references/dimensions-and-layout.md](references/dimensions-and-layout.md)  
When you need to: Set gauge dimensions in pixels or percentages, make gauges responsive, change orientation.

### 📍 User Interactions
📄 **Read:** [references/user-interactions.md](references/user-interactions.md)  
When you need to: Enable tooltips, implement drag-and-drop pointers, handle events, show real-time updates.

### 📍 Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)  
When you need to: Configure animations, print gauges, export as images/PDFs, internationalize content, migrate from EJ1.

### 📍 API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)  
When you need to: Look up all component properties, events, methods, and data models.

---

## Quick Start Example

Here's a minimal working example to get started:

### Controller (C#)
```csharp
using Syncfusion.EJ2.LinearGauge;
using System.Collections.Generic;
using System.Web.Mvc;

public class GaugeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
```

### View (CSHTML)
```html
@{
    ViewBag.Title = "Linear Gauge";
}

<div id="container">
    @Html.EJS().LinearGauge("gauge")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(35).Color("green").Add();
                    ranges.Start(35).End(70).Color("yellow").Add();
                    ranges.Start(70).End(100).Color("red").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(45).Add();
                })
                .Add();
        })
        .Height("500px")
        .Width("100%")
        .Render();
</div>
```

### Required Namespace in Web.config
```xml
<configuration>
  <appSettings>
    <!-- Other settings -->
  </appSettings>
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages>
      <namespaces>
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

---

## Common Patterns

### Pattern 1: Temperature Gauge with Danger Zones
```csharp
// Controller
public ActionResult TemperatureGauge()
{
    return View();
}
```

```html
<!-- View -->
@Html.EJS().LinearGauge("tempGauge")
    .Title("Temperature Monitor (°C)")
    .Axes(axes =>
    {
        axes.Minimum(0)
            .Maximum(50)
            .Ranges(ranges =>
            {
                ranges.Start(0).End(15).Color("#4CAF50").Add();       // Cool
                ranges.Start(15).End(25).Color("#FFC107").Add();      // Comfortable
                ranges.Start(25).End(35).Color("#FF9800").Add();      // Warm
                ranges.Start(35).End(50).Color("#F44336").Add();      // Hot/Danger
            })
            .Pointers(pointers =>
            {
                pointers.Value(28)
                    .Type(PointerType.Bar)
                    .Add();
            })
            .Add();
    })
    .Height("400px")
    .Render();
```

### Pattern 2: Progress Indicator
```csharp
// Controller
public ActionResult ProgressGauge()
{
    return View();
}
```

```html
<!-- View -->
@Html.EJS().LinearGauge("progressGauge")
    .Axes(axes =>
    {
        axes.Minimum(0)
            .Maximum(100)
            .Ranges(ranges =>
            {
                ranges.Start(0).End(100).StartWidth(25).EndWidth(25).Color("#E0E0E0").Add();
            })
            .Pointers(pointers =>
            {
                pointers.Value(65)
                    .Type(PointerType.Bar)
                    .Width(25)
                    .Color("#4CAF50")
                    .Add();
            })
            .Add();
    })
    .Height("100px")
    .Width("100%")
    .Render();
```

### Pattern 3: Speedometer with Multiple Zones
```csharp
// Controller
public ActionResult Speedometer()
{
    return View();
}
```

```html
<!-- View -->
@Html.EJS().LinearGauge("speedometer")
    .Title("Speed (km/h)")
    .Axes(axes =>
    {
        axes.Minimum(0)
            .Maximum(200)
            .Ranges(ranges =>
            {
                ranges.Start(0).End(60).Color("#4CAF50").Add();
                ranges.Start(60).End(120).Color("#FFC107").Add();
                ranges.Start(120).End(180).Color("#FF9800").Add();
                ranges.Start(180).End(200).Color("#F44336").Add();
            })
            .Pointers(pointers =>
            {
                pointers.Value(95)
                    .Type(PointerType.Marker)
                    .MarkerType(MarkerType.Triangle)
                    .Add();
            })
            .Add();
    })
    .Height("300px")
    .Render();
```

---

## Component Structure Overview

A Linear Gauge consists of these main elements:

```
┌─────────────────────────────────────────────┐
│  LINEAR GAUGE CONTAINER                     │
├─────────────────────────────────────────────┤
│  Title: "Gauge Title"                       │
├─────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────┐│
│ │ AXIS (0-100)                              ││
│ │ [Ranges: Green(0-35), Yellow(35-70), Red]││
│ │ ├─ Ticks: Major & Minor tick marks        ││
│ │ ├─ Labels: 0, 25, 50, 75, 100             ││
│ │ └─ Pointers: Bar/Marker showing values    ││
│ │ ┌─ Annotations: Custom text/HTML at pos   ││
│ └──────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

---

## Next Steps

1. **Start Simple**: Begin with [references/getting-started.md](references/getting-started.md) to set up your first gauge
2. **Customize**: Use [references/axes-configuration.md](references/axes-configuration.md) to define your scale
3. **Add Data**: Check [references/pointers.md](references/pointers.md) to display your values
4. **Enhance**: Add ranges from [references/ranges.md](references/ranges.md) for visual zones
5. **Polish**: Apply styles from [references/appearance-and-styling.md](references/appearance-and-styling.md)
6. **Interact**: Enable interactivity with [references/user-interactions.md](references/user-interactions.md)
7. **Reference**: Consult [references/api-reference.md](references/api-reference.md) for all available options
