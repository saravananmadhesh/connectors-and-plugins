# Styling and Appearance

## Table of Contents
- [Chart Dimensions](#chart-dimensions)
- [Series Appearance](#series-appearance)
- [Color Customization](#color-customization)
- [Theme and Styling](#theme-and-styling)
- [Responsive Design](#responsive-design)

## Chart Dimensions

Control chart size to fit your layout requirements.

### Basic Sizing

Set chart width and height:

```csharp
@Html.EJS().Chart("container")
    .Width("100%")
    .Height("420px")
    .Render()
```

### Responsive Sizing

Make charts adapt to container size:

```csharp
@Html.EJS().Chart("container")
    .Width("100%")
    .Height("400px")
    .Render()
```

### Container Sizing Example

HTML setup:

```html
<div id="chart-container" style="width: 100%; max-width: 1000px; margin: 0 auto;">
    @Html.EJS().Chart("container")
        .Width("100%")
        .Height("400px")
        .Render()
</div>
```

CSS for responsiveness:

```css
#chart-container {
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
}

@media (max-width: 768px) {
    #chart-container {
        max-width: 100%;
    }
}
```

## Series Appearance

Control how data series are displayed visually.

### Series Color

Set series colors explicitly:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Fill("#0078d4")
        .Add();
})
```

### Series Border

Add borders to series elements:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Fill("#0078d4")
        .Border(border =>
        {
            border.Color("#003d7a");
            border.Width(1);
        })
        .Add();
})
```

### Series Width

Control thickness of line series:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
        .Width(2)
        .Add();
})
```

### Series Opacity

Add transparency to series:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Fill("#0078d4")
        .Opacity(0.7)
        .Add();
})
```

## Color Customization

### Palette Colors

Use predefined color palettes:

```csharp
@Html.EJS().Chart("container")
    .Palette(Syncfusion.EJ2.Charts.ChartSeriesPalette.Excel)
    .Render()

// Other options:
// ChartSeriesPalette.Fabric
// ChartSeriesPalette.Bootstrap
// ChartSeriesPalette.HighContrast
// ChartSeriesPalette.Material
// ChartSeriesPalette.Fluent
```

### Custom Palette

Define custom colors:

```csharp
@Html.EJS().Chart("container")
    .Palette(new string[] { "#0078d4", "#107c10", "#ffb900", "#e3008c" })
    .Render()
```

### Point-Level Colors

Color individual data points:

```csharp
public class ColoredData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public string Color { get; set; }
}

// Controller
var data = new List<ColoredData>
{
    new ColoredData { Month = "Jan", Sales = 35, Color = "#0078d4" },
    new ColoredData { Month = "Feb", Sales = 28, Color = "#107c10" },
    new ColoredData { Month = "Mar", Sales = 34, Color = "#ffb900" }
};
return View(data);

// View
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .PointColorMapping("Color")
        .Add();
})
```

## Theme and Styling

### Built-in Themes

Apply predefined themes:

```csharp
@Html.EJS().Chart("container")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
    .Render()

// Available themes:
// ChartTheme.Bootstrap
// ChartTheme.Bootstrap4
// ChartTheme.Fabric
// ChartTheme.HighContrast
// ChartTheme.Material
// ChartTheme.Fluent
// ChartTheme.FlucentDark
// ChartTheme.Tailwind
```

### Title Styling

Customize chart title appearance:

```csharp
.Title("Sales Report")
.TitleStyle(style =>
{
    style.FontFamily("Arial");
    style.FontSize("18px");
    style.FontWeight("bold");
    style.Color("#000000");
    style.Alignment(Syncfusion.EJ2.Charts.Alignment.Center);
})
```

### Subtitle Styling

Add and style subtitle:

```csharp
.SubTitle("Monthly Comparison 2024")
.SubtitleStyle(style =>
{
    style.FontFamily("Arial");
    style.FontSize("12px");
    style.Color("#666666");
})
```

### Axis Label Styling

Customize axis label appearance:

```csharp
.PrimaryXAxis(axis =>
{
    axis.Title("Months");
    axis.TitleStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("14px");
        style.FontWeight("bold");
    });
    axis.LabelStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("12px");
        style.Color("#333333");
    });
})
```

### Background Styling

Style chart background:

```csharp
@Html.EJS().Chart("container")
    .Background("#f5f5f5")
    .ChartArea(area =>
    {
        area.Background("#ffffff");
        area.Border(border =>
        {
            border.Color("#cccccc");
            border.Width(1);
        });
    })
    .Render()
```

## Responsive Design

### Media Query Responsive Sizing

```html
<style>
    #chart-container {
        width: 100%;
        height: 400px;
    }
    
    @media (max-width: 768px) {
        #chart-container {
            height: 300px;
        }
    }
    
    @media (max-width: 480px) {
        #chart-container {
            height: 250px;
        }
    }
</style>

<div id="chart-container">
    @Html.EJS().Chart("container")
        .Width("100%")
        .Height("400px")
        .Render()
</div>
```

### Dynamic Size Adjustment

```html
<style>
    .chart-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        height: 0;
        overflow: hidden;
    }
    
    .chart-wrapper canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
```

### Layout Responsive Charts

```csharp
@Html.EJS().Chart("container")
    .Width("100%")
    .Height("400px")
    .EnableExport(true)
    .Render()
```

## Complete Styling Example

Here's a fully styled 3D chart example:

```csharp
@Html.EJS().Chart("container")
    // Dimensions
    .Width("100%")
    .Height("500px")
    
    // Theme and appearance
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
    .Palette(Syncfusion.EJ2.Charts.ChartSeriesPalette.Excel)
    .Background("#f8f9fa")
    .ChartArea(area =>
    {
        area.Background("#ffffff");
        area.Border(border =>
        {
            border.Color("#d0d0d0");
            border.Width(1);
        });
    })
    
    // Title
    .Title("Quarterly Sales Analysis")
    .TitleStyle(style =>
    {
        style.FontSize("18px");
        style.FontWeight("bold");
        style.Color("#333333");
    })
    
    // Series
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Sales")
            .Name("2024 Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Border(border =>
            {
                border.Color("#0078d4");
                border.Width(0.5);
            })
            .DataLabel(label =>
            {
                label.Visible(true);
                label.Format("${point.y}K");
            })
            .Add();
    })
    
    // Axes
    .PrimaryXAxis(axis =>
    {
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
        axis.Title("Quarter");
        axis.TitleStyle(style => style.FontSize("14px"));
    })
    .PrimaryYAxis(axis =>
    {
        axis.Title("Sales ($)");
        axis.LabelFormat("${value}K");
        axis.TitleStyle(style => style.FontSize("14px"));
    })
    
    // Legend
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
    })
    
    // Tooltip
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
        tooltip.Format("<b>{point.x}</b>: ${point.y}K");
    })
    
    .Render()
```

Styling and appearance options help create professional, visually appealing charts that match your application's design system and improve data readability.
