# Appearance and Rendering in HeatMap

## Table of Contents
- [Cell Styling](#cell-styling)
- [Title and Subtitle](#title-and-subtitle)
- [Dimensions Configuration](#dimensions-configuration)
- [Rendering Modes](#rendering-modes)
- [Responsive Design](#responsive-design)
- [Advanced Customization](#advanced-customization)
- [Performance Optimization](#performance-optimization)

## Cell Styling

### Basic Cell Styling

Customize cell appearance:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Border(border =>
    {
        cellSettings.BorderColor("#ffffff");
        cellSettings.BorderWidth(1);
    });
})
```

### Cell Border Configuration

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Border(border =>
    {
        border.Color("#e0e0e0");
        border.Width(2);
    });
})
```

### Cell Padding

Add spacing inside cells:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.ShowLabel(true);
    // Padding affects label positioning
})
```

### Cell Radius (Rounded Corners)

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
        border.Radius("4px");
    });
})
```

### Cell Opacity

Control cell transparency:

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Opacity(0.8);  // 80% opacity
})
```

### Custom Cell Styling

```csharp
.CellSettings(cellSettings =>
{
    cellSettings.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(2);
        border.DashArray("5,5");  // Dashed border
    });
    cellSettings.Opacity(0.9);
})
```

## Title and Subtitle

### Add Title

```csharp
.Title(title =>
{
    title.Text("Annual Sales Report");
})
```

### Title with Subtitle

```csharp
.Title(title =>
{
    title.Text("Annual Sales Report");
    title.Subtitle("2024 Performance Data");
})
```

### Title Styling

Customize title appearance:

```csharp
.Title(title =>
{
    title.Text("Sales Analysis");
    title.TextStyle(style =>
    {
        style.FontSize("18px");
        style.FontWeight("bold");
        style.Color("#0078d4");
        style.FontFamily("Segoe UI");
    });
})
```

### Subtitle Styling

```csharp
.Title(title =>
{
    title.Text("Quarterly Results");
    title.Subtitle("Q1 2024");
    title.SubtitleStyle(style =>
    {
        style.FontSize("12px");
        style.Color("#666666");
        style.FontStyle("italic");
    });
})
```

### Title Alignment

```csharp
.Title(title =>
{
    title.Text("Sales Report");
    title.Alignment(Syncfusion.EJ2.HeatMap.Alignment.Center);  // Center, Left, Right
})
```

### Complete Title Configuration

```csharp
.Title(title =>
{
    title.Text("2024 Sales Performance");
    title.Subtitle("Updated: March 15, 2024");
    title.Alignment(Syncfusion.EJ2.HeatMap.Alignment.Center);
    title.TextStyle(style =>
    {
        style.FontSize("20px");
        style.FontWeight("bold");
        style.Color("#1a1a1a");
    });
    title.SubtitleStyle(style =>
    {
        style.FontSize("12px");
        style.Color("#999999");
    });
})
```

## Dimensions Configuration

### Fixed Dimensions

Set explicit width and height:

```csharp
@Html.EJS().HeatMap("container")
    .Width("800px")
    .Height("500px")
    .Render()
```

### Percentage-Based Dimensions

```csharp
@Html.EJS().HeatMap("container")
    .Width("100%")
    .Height("600px")
    .Render()
```

### Auto-Sizing

Let HeatMap determine size:

```csharp
@Html.EJS().HeatMap("container")
    .Width("auto")
    .Height("auto")
    .Render()
```

### Container Div Setup

```html
<div id="container" style="width: 100%; height: 500px;"></div>

@Html.EJS().HeatMap("container")
    .Width("100%")
    .Height("100%")
    .Render()
```

### Resize with Window

```html
<div id="container" style="width: 100%; height: 600px;"></div>

<script>
window.addEventListener('resize', function() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.refresh();
});
</script>
```

## Rendering Modes

### Overview

HeatMap supports two rendering modes:
- **SVG**: Vector-based, better for small-medium datasets
- **Canvas**: Raster-based, better for large datasets

### SVG Rendering (Default)

```csharp
@Html.EJS().HeatMap("container")
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.SVG)
    .Render()
```

### Canvas Rendering

```csharp
@Html.EJS().HeatMap("container")
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Canvas)
    .Render()
```

### Auto Rendering Mode

Automatically switch based on data size:

```csharp
@Html.EJS().HeatMap("container")
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Auto)
    .Render()
```

### Rendering Mode Comparison

| Mode | SVG | Canvas |
|------|-----|--------|
| Data Size | Small-Medium | Large |
| Performance | Good | Excellent |
| Interaction | Interactive | Limited |
| Export | Easy | Requires processing |
| Scalability | Vector quality | Raster |

### Choose Rendering Mode

**Use SVG if:**
- Dataset is small to medium size
- Interactive features needed
- Quality is paramount

**Use Canvas if:**
- Dataset is very large (1000s of cells)
- Performance is critical
- Interaction not as important

## Responsive Design

### Responsive Container

```html
<div class="heatmap-container" style="width: 100%; height: auto;">
    @Html.EJS().HeatMap("container")
        .Width("100%")
        .Height("500px")
        .Render()
</div>

<style>
.heatmap-container {
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .heatmap-container {
        height: 300px;
    }
}
</style>
```

### Mobile Responsive

```csharp
@{
    bool isMobile = Request.Browser.IsMobileDevice;
    string width = isMobile ? "100%" : "90%";
    string height = isMobile ? "300px" : "500px";
}

@Html.EJS().HeatMap("container")
    .Width(width)
    .Height(height)
    .RenderingMode(isMobile ? 
        Syncfusion.EJ2.HeatMap.RenderingMode.Canvas : 
        Syncfusion.EJ2.HeatMap.RenderingMode.SVG)
    .Render()
```

### Orientation Handling

```csharp
<script>
window.addEventListener('orientationchange', function() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    if (window.innerWidth < window.innerHeight) {
        // Portrait
        heatmap.width = "100%";
        heatmap.height = "600px";
    } else {
        // Landscape
        heatmap.width = "100%";
        heatmap.height = "400px";
    }
    heatmap.refresh();
});
</script>
```

## Advanced Customization

### Background Color

```csharp
@Html.EJS().HeatMap("container")
    .Background("#f5f5f5")
    .Render()
```

### HeatMap Border

```csharp
@Html.EJS().HeatMap("container")
    .Border(border =>
    {
        border.Color("#0078d4");
        border.Width(2);
    })
    .Render()
```

### Margin Configuration

```csharp
@Html.EJS().HeatMap("container")
    .Margin(margin =>
    {
        margin.Left(40);
        margin.Right(20);
        margin.Top(30);
        margin.Bottom(30);
    })
    .Render()
```

### Complete Styling Example

```csharp
@Html.EJS().HeatMap("container")
    .Width("100%")
    .Height("600px")
    .Background("#f9f9f9")
    .Border(border =>
    {
        border.Color("#e0e0e0");
        border.Width(1);
    })
    .Margin(margin =>
    {
        margin.Left(50);
        margin.Right(30);
        margin.Top(40);
        margin.Bottom(40);
    })
    .Title(title =>
    {
        title.Text("Performance Dashboard");
        title.TextStyle(style => { style.FontSize("20px"); });
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.Border(border =>
        {
            border.Color("#ffffff");
            border.Width(1);
        });
    })
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Auto)
    .Render()
```

## Performance Optimization

### Canvas for Large Datasets

Use Canvas rendering for 10,000+ cells:

```csharp
@Html.EJS().HeatMap("container")
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Canvas)
    .Render()
```

### Disable Unnecessary Features

Remove unused features for performance:

```csharp
@Html.EJS().HeatMap("container")
    .Tooltip(tooltip => { tooltip.Visible(false); })
    .CellSettings(cellSettings => { cellSettings.ShowLabel(false); })
    .Legend(legend => { legend.Visible(false); })
    .RenderingMode(Syncfusion.EJ2.HeatMap.RenderingMode.Canvas)
    .Render()
```

### Reduce Axis Labels

Limit labels for large datasets:

```csharp
.XAxis(xaxis =>
{
    xaxis.MaxLabelWidth(80);
    xaxis.LabelIntersectAction(Syncfusion.EJ2.HeatMap.LabelIntersectAction.Hide);
})
```

### Lazy Loading

Load data in chunks:

```csharp
[HttpGet]
public JsonResult GetHeatmapData(int page, int size)
{
    var data = _dataService.GetChunkedData(page, size);
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

### Performance Monitoring

```csharp
<script>
var startTime = performance.now();

var heatmap = document.getElementById("container").ej2_instances[0];

var endTime = performance.now();
console.log("Render time: " + (endTime - startTime) + "ms");
</script>
```

Proper appearance and rendering configuration ensures HeatMaps are both visually appealing and performant across different data sizes and devices.
