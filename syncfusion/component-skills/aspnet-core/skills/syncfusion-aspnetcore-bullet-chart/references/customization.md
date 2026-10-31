# Customization and Layout in Bullet Chart

## Table of Contents
- [Orientation](#orientation)
  - [Horizontal vs. Vertical](#horizontal-vs-vertical)
  - [Orientation Options](#orientation-options)
  - [Horizontal Orientation Example](#horizontal-orientation-example)
  - [Vertical Orientation Example](#vertical-orientation-example)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [Enable RTL Rendering](#enable-rtl-rendering)
  - [RTL Effects](#rtl-effects)
  - [When to Use RTL](#when-to-use-rtl)
  - [RTL with Horizontal Orientation](#rtl-with-horizontal-orientation)
- [Animation](#animation)
  - [Animation Basics](#animation-basics)
  - [Animation Properties](#animation-properties)
  - [Animation Duration Options](#animation-duration-options)
  - [Animation Delay](#animation-delay)
  - [Disable Animations](#disable-animations)
- [Chart Sizing](#chart-sizing)
  - [Container Sizing](#container-sizing)
  - [Chart Properties: Width and Height](#chart-properties-width-and-height)
  - [Percentage-Based Sizing](#percentage-based-sizing)
  - [Pixel vs. Percentage](#pixel-vs-percentage)
- [Responsive Design](#responsive-design)
  - [Mobile-Responsive Layout](#mobile-responsive-layout)
  - [Media Query Responsive Chart](#media-query-responsive-chart)
  - [Responsive Orientation](#responsive-orientation)
- [Complete Customization Example](#complete-customization-example)
  - [Dashboard with Multiple Customizations](#dashboard-with-multiple-customizations)
- [Troubleshooting](#troubleshooting)
  - [Chart Not Resizing Properly](#chart-not-resizing-properly)
  - [Animation Too Slow](#animation-too-slow)
  - [RTL Not Working](#rtl-not-working)

---

## Orientation

### Horizontal vs. Vertical

Change the chart orientation based on your layout needs:

```cshtml
<!-- Horizontal (default) -->
<ejs-bulletchart id="container" 
    orientation="@Syncfusion.EJ2.Charts.OrientationType.Horizontal">
</ejs-bulletchart>

<!-- Vertical -->
<ejs-bulletchart id="container" 
    orientation="@Syncfusion.EJ2.Charts.OrientationType.Vertical">
</ejs-bulletchart>
```

### Orientation Options

| Orientation | Layout | Best For |
|-------------|--------|----------|
| `Horizontal` | Bars extend left to right | Dashboard rows, multiple metrics |
| `Vertical` | Bars extend bottom to top | Comparisons, vertical dashboards |

### Horizontal Orientation Example

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category"
    orientation="@Syncfusion.EJ2.Charts.OrientationType.Horizontal"
    title="Sales Performance">
</ejs-bulletchart>
```

**Use Case:** Display multiple sales representatives in rows, each with their actual vs. target performance.

### Vertical Orientation Example

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    categoryField="Category"
    orientation="@Syncfusion.EJ2.Charts.OrientationType.Vertical"
    title="Revenue Comparison">
</ejs-bulletchart>
```

**Use Case:** Compare performance metrics side-by-side in a column format.

---

## Right-to-Left (RTL) Support

### Enable RTL Rendering

Support right-to-left languages like Arabic and Hebrew:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    enableRtl="true">
</ejs-bulletchart>
```

### RTL Effects

With `enableRtl="true"`:
- Chart axis reverses direction
- Category labels align right
- Overall layout mirrors horizontally

### When to Use RTL

```csharp
// Detect culture and enable RTL automatically
public void OnGet()
{
    var culture = CultureInfo.CurrentCulture.Name;
    ViewBag.EnableRtl = culture.StartsWith("ar-") || culture.StartsWith("he-");
}
```

```cshtml
<ejs-bulletchart id="container" enableRtl="@ViewBag.EnableRtl"></ejs-bulletchart>
```

### RTL with Horizontal Orientation

```cshtml
<ejs-bulletchart id="container" 
    orientation="@Syncfusion.EJ2.Charts.OrientationType.Horizontal"
    enableRtl="true">
</ejs-bulletchart>
```

In RTL mode, bars extend from right to left instead of left to right.

---

## Animation

### Animation Basics

Enable smooth animated transitions when the chart renders:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target">
    <e-bulletchart-animation enable="true" duration="1000" delay="0"></e-bulletchart-animation>
</ejs-bulletchart>
```

### Animation Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `enable` | boolean | true | Enable/disable animations |
| `duration` | number | 1000 | Duration in milliseconds |
| `delay` | number | 0 | Delay before animation starts (ms) |

### Animation Duration Options

```cshtml
<!-- Quick animation (500ms) -->
<e-bulletchart-animation enable="true" duration="500"></e-bulletchart-animation>

<!-- Standard animation (1000ms) -->
<e-bulletchart-animation enable="true" duration="1000"></e-bulletchart-animation>

<!-- Slow animation (2000ms) -->
<e-bulletchart-animation enable="true" duration="2000"></e-bulletchart-animation>
```

### Animation Delay

Add delay between chart rendering and animation:

```cshtml
<!-- Delay animation by 500ms -->
<e-bulletchart-animation enable="true" duration="1000" delay="500"></e-bulletchart-animation>

<!-- Stagger multiple chart animations -->
<ejs-bulletchart id="chart1">
    <e-bulletchart-animation duration="1000" delay="0"></e-bulletchart-animation>
</ejs-bulletchart>

<ejs-bulletchart id="chart2">
    <e-bulletchart-animation duration="1000" delay="200"></e-bulletchart-animation>
</ejs-bulletchart>

<ejs-bulletchart id="chart3">
    <e-bulletchart-animation duration="1000" delay="400"></e-bulletchart-animation>
</ejs-bulletchart>
```

### Disable Animations

```cshtml
<ejs-bulletchart id="container">
    <e-bulletchart-animation enable="false"></e-bulletchart-animation>
</ejs-bulletchart>
```

**Why disable?**
- Performance optimization on large dashboards
- Accessibility (some users find animations distracting)
- Reports for printing

---

## Chart Sizing

### Container Sizing

Set the parent container size in pixels:

```cshtml
<div style="width: 500px; height: 300px;">
    <ejs-bulletchart id="container" 
        dataSource="@Model.ChartData" 
        valueField="Value" 
        targetField="Target">
    </ejs-bulletchart>
</div>
```

### Chart Properties: Width and Height

Set explicit chart dimensions:

```cshtml
<ejs-bulletchart id="container" 
    dataSource="@Model.ChartData" 
    valueField="Value" 
    targetField="Target"
    width="500px"
    height="300px">
</ejs-bulletchart>
```

### Percentage-Based Sizing

Use percentages for responsive layouts:

```cshtml
<ejs-bulletchart id="container" 
    width="100%"
    height="100%">
</ejs-bulletchart>
```

### Pixel vs. Percentage

```cshtml
<!-- Fixed size in pixels -->
<ejs-bulletchart id="chart1" width="600px" height="400px"></ejs-bulletchart>

<!-- Responsive with percentages -->
<ejs-bulletchart id="chart2" width="100%" height="100%"></ejs-bulletchart>

<!-- Auto-fit to container -->
<ejs-bulletchart id="chart3"></ejs-bulletchart>
```

---

## Responsive Design

### Mobile-Responsive Layout

Create charts that adapt to screen size:

```cshtml
<div id="chartContainer" style="width: 100%; height: 400px;">
    <ejs-bulletchart id="container" 
        dataSource="@Model.ChartData" 
        valueField="Value" 
        targetField="Target"
        width="100%"
        height="100%">
    </ejs-bulletchart>
</div>

<script>
    // Adjust chart on window resize
    window.addEventListener('resize', function() {
        var chart = document.getElementById('container').ej2_instances[0];
        chart.refresh();
    });
</script>
```

### Media Query Responsive Chart

```css
/* Desktop */
@media (min-width: 1024px) {
    #chartContainer {
        width: 100%;
        height: 500px;
    }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
    #chartContainer {
        width: 100%;
        height: 400px;
    }
}

/* Mobile */
@media (max-width: 767px) {
    #chartContainer {
        width: 100%;
        height: 300px;
    }
}
```

### Responsive Orientation

Switch orientation based on screen size:

```csharp
// In your page model
public Syncfusion.EJ2.Charts.OrientationType ChartOrientation { get; set; }

public void OnGet()
{
    var userAgent = Request.Headers["User-Agent"].ToString();
    ChartOrientation = userAgent.Contains("Mobile")
        ? Syncfusion.EJ2.Charts.OrientationType.Vertical
        : Syncfusion.EJ2.Charts.OrientationType.Horizontal;
}
```

```cshtml
<ejs-bulletchart id="container" orientation="@Model.ChartOrientation"></ejs-bulletchart>
```

### Responsive Font Size

```cshtml
<ejs-bulletchart id="container">
    <e-bulletchart-categorylabelstyle 
        size="@ViewBag.FontSize">
    </e-bulletchart-categorylabelstyle>
</ejs-bulletchart>
```

```csharp
public void OnGet()
{
    // Adjust font based on device type
    ViewBag.FontSize = IsMobileDevice() ? "10px" : "14px";
}
```

---

## Complete Customization Example

### Dashboard with Multiple Customizations

```cshtml
<div style="width: 100%; height: 600px; overflow-y: auto;">
    <!-- Chart 1: Horizontal, RTL, with animation -->
    <div style="width: 100%; height: 150px;">
        <ejs-bulletchart id="chart1" 
            dataSource="@Model.ChartData" 
            valueField="Value" 
            targetField="Target"
            categoryField="Category"
            orientation="@Syncfusion.EJ2.Charts.OrientationType.Horizontal"
            enableRtl="false"
            width="100%"
            height="100%">
            <e-bulletchart-animation enable="true" duration="1000"></e-bulletchart-animation>
        </ejs-bulletchart>
    </div>
    
    <!-- Chart 2: Vertical, fast animation -->
    <div style="width: 100%; height: 250px;">
        <ejs-bulletchart id="chart2" 
            dataSource="@Model.ChartData" 
            valueField="Value" 
            targetField="Target"
            orientation="@Syncfusion.EJ2.Charts.OrientationType.Vertical"
            width="100%"
            height="100%">
            <e-bulletchart-animation enable="true" duration="500"></e-bulletchart-animation>
        </ejs-bulletchart>
    </div>
    
    <!-- Chart 3: RTL support -->
    <div style="width: 100%; height: 150px;">
        <ejs-bulletchart id="chart3" 
            dataSource="@Model.ArabicData" 
            valueField="Value" 
            targetField="Target"
            categoryField="Category"
            enableRtl="true"
            width="100%"
            height="100%">
        </ejs-bulletchart>
    </div>
</div>
```

---

## Troubleshooting

### Chart Not Resizing Properly

**Issue:** Chart doesn't respond to container resize.

**Solution:** Refresh chart on resize:
```javascript
window.addEventListener('resize', function() {
    var chart = document.getElementById('container').ej2_instances[0];
    chart.refresh();
});
```

### Animation Too Slow

**Issue:** Animation duration feels sluggish.

**Solution:** Reduce duration:
```cshtml
<e-bulletchart-animation enable="true" duration="300"></e-bulletchart-animation>
```

### RTL Not Working

**Issue:** Chart doesn't mirror in RTL mode.

**Solution:** Verify language/culture setting and enable RTL explicitly:
```cshtml
<ejs-bulletchart id="container" enableRtl="true"></ejs-bulletchart>
```
