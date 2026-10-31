# Data Markers

Data markers are symbols displayed at data points on line, area, and scatter charts to highlight individual values and improve data readability.

## Table of Contents
- [Enabling Markers](#enabling-markers)
- [Marker Shapes](#marker-shapes)
  - [Different Shapes for Multiple Series](#different-shapes-for-multiple-series)
- [Marker Size](#marker-size)
  - [Variable Marker Sizes](#variable-marker-sizes)
- [Marker Colors](#marker-colors)
  - [Auto Color from Series](#auto-color-from-series)
  - [Data-Driven Colors](#data-driven-colors)
- [Image Markers](#image-markers)
  - [Different Images per Series](#different-images-per-series)
- [Marker Border](#marker-border)
- [Marker Positioning](#marker-positioning)
- [Conditional Marker Visibility](#conditional-marker-visibility)
  - [First and Last Points](#first-and-last-points)
  - [Highlight Maximum/Minimum](#highlight-maximumminimum)
- [Marker Data Labels](#marker-data-labels)
- [Marker Patterns for Accessibility](#marker-patterns-for-accessibility)
- [Performance Considerations](#performance-considerations)
  - [Large Datasets](#large-datasets)
- [Common Patterns](#common-patterns)
  - [Line Chart with Markers](#line-chart-with-markers)
  - [Spline Chart with Custom Markers](#spline-chart-with-custom-markers)
  - [Scatter Plot](#scatter-plot)
- [Troubleshooting](#troubleshooting)
  - [Markers not visible](#markers-not-visible)
  - [Markers clipped at edges](#markers-clipped-at-edges)
  - [Image markers not displaying](#image-markers-not-displaying)
  - [Performance issues with markers](#performance-issues-with-markers)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Enabling Markers

Markers are disabled by default and must be explicitly enabled.

```cshtml
@Html.EJS().Chart("markerChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .Marker(marker => marker.Visible(true))
              .DataSource(ViewBag.Data)
              .XName("Month")
              .YName("Sales")
              .Add();
    }).Render()
```

## Marker Shapes

Choose from 10 built-in shapes.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Shape(Syncfusion.EJ2.Charts.ChartShape.Circle))
```

**Available shapes:**
- `Circle` - Solid circle (default)
- `Rectangle` - Square
- `Triangle` - Upward triangle
- `Diamond` - Diamond shape
- `InvertedTriangle` - Downward triangle
- `Pentagon` - Pentagon
- `Cross` - Plus sign
- `HorizontalLine` - Horizontal line
- `VerticalLine` - Vertical line
- `Image` - Custom image

### Different Shapes for Multiple Series

```cshtml
@Html.EJS().Chart("multiShapeChart").Series(series =>
    {
        series.DataSource(productA)
              .XName("Month")
              .YName("Sales")
              .Name("Product A")
              .Marker(m => m.Visible(true).Shape(Syncfusion.EJ2.Charts.ChartShape.Circle))
              .Add();

        series.DataSource(productB)
              .XName("Month")
              .YName("Sales")
              .Name("Product B")
              .Marker(m => m.Visible(true).Shape(Syncfusion.EJ2.Charts.ChartShape.Diamond))
              .Add();
    }).Render()
```

## Marker Size

Control marker dimensions with `Height` and `Width`.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Height(12)
    .Width(12))
```

**Guidelines:**
- Default size: 5x5 pixels
- Recommended range: 6-15 pixels
- Larger markers for emphasis, smaller for dense data

### Variable Marker Sizes

Use data properties to control size:

```cshtml
@{
    var bubbleData = new[] {
        new { X = "USA", Y = 46, Size = 40 },
        new { X = "GBR", Y = 27, Size = 30 },
        new { X = "CHN", Y = 26, Size = 35 }
    };
}

@Html.EJS().Chart("variableSizeChart").PrimaryXAxis(x => x.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(y => y.Minimum(0).Maximum(50)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Bubble)
              .DataSource(bubbleData)
              .XName("X")
              .YName("Y")
              .Size("Size")
              .MinRadius(5)
              .MaxRadius(15)
              .Add();
    }).Render()
```

## Marker Colors

Customize marker fill and border colors.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Fill("#FF5733")
    .Opacity(0.9)
    .Border(border => border
        .Width(2)
        .Color("#000000")))
```

### Auto Color from Series

By default, markers inherit series color:

```cshtml
.Series(series =>
{
    series.Fill("#1E88E5")
          .Marker(m => m.Visible(true))  // Markers will be blue
          .Add();
})
```

### Data-Driven Colors

Use point color mapping:

```cshtml
@using Syncfusion.EJ2.Charts;

@{
    var coloredData = new[] {
        new { Month = "Jan", Sales = 35, Color = "#FF0000" },
        new { Month = "Feb", Sales = 28, Color = "#00FF00" },
        new { Month = "Mar", Sales = 34, Color = "#0000FF" }
    };
}

@Html.EJS().Chart("colorMappedChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.DataSource(coloredData)
              .XName("Month")
              .YName("Sales")
              .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)          // ✅ REQUIRED
              .PointColorMapping("Color")       // ✅ Works for Column
              .Marker(m => m.Visible(true).Height(10).Width(10))
              .Add();
    }).Render()
```

## Image Markers

Use custom images as markers.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Shape(Syncfusion.EJ2.Charts.ChartShape.Image)
    .Height(20)
    .Width(20)
    .ImageUrl("/Images/marker-icon.png"))
```

**Best practices:**
- Use PNG with transparency
- Size: 16x16 to 32x32 pixels
- Optimize image file size
- Provide fallback shape if image fails to load

### Different Images per Series

```cshtml
.Series(series =>
{
    series.Name("Product A")
          .Marker(m => m
              .Visible(true)
              .Shape(Syncfusion.EJ2.Charts.ChartShape.Image)
              .ImageUrl("/Images/product-a-icon.png")
              .Height(24)
              .Width(24))
          .Add();
    
    series.Name("Product B")
          .Marker(m => m
              .Visible(true)
              .Shape(Syncfusion.EJ2.Charts.ChartShape.Image)
              .ImageUrl("/Images/product-b-icon.png")
              .Height(24)
              .Width(24))
          .Add();
})
```

## Marker Border

Add borders to markers for better visibility.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Fill("#FFFFFF")  // White fill
    .Border(border => border
        .Width(3)
        .Color("#1E88E5")))  // Blue border
```

**Use cases:**
- White/light markers on dark background
- Hollow markers for overlapping data
- High contrast for accessibility

## Marker Positioning

Markers are centered on data points by default. Adjust with offsets if needed.

```cshtml
.Marker(marker => marker
    .Visible(true)
    .Offset(offset => offset
        .X(0)
        .Y(-10)))  // Move 10 pixels up
```

## Conditional Marker Visibility

Show markers only for specific conditions.

### Highlight Maximum/Minimum

```cshtml
<script>
    function onPointRender(args) {
        var yValue = args.point.y;
        var maxValue = Math.max(...args.series.dataSource.map(d => d.Y));
        var minValue = Math.min(...args.series.dataSource.map(d => d.Y));
        
        if (yValue === maxValue) {
            args.fill = '#00FF00';  // Green for max
            args.marker.height = 15;
            args.marker.width = 15;
        } else if (yValue === minValue) {
            args.fill = '#FF0000';  // Red for min
            args.marker.height = 15;
            args.marker.width = 15;
        }
    }
</script>

@Html.EJS().Chart("highlightChart")
    .Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .Marker(m => m.Visible(true))
              .Add();
    })
    .PointRender("onPointRender")
    .Render()
```

## Marker Data Labels

Combine markers with data labels for complete information.

```cshtml
.Series(series =>
{
    series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
          .XName("Month")
          .YName("Sales")
          .Marker(marker => marker
              .Visible(true)
              .Height(10)
              .Width(10)
              .Shape(Syncfusion.EJ2.Charts.ChartShape.Circle)
              .DataLabel(label => label
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.LabelPosition.Top)))
          .Add();
})
```

## Marker Patterns for Accessibility

Use distinct patterns for better accessibility and print compatibility.

```cshtml
@Html.EJS().Chart("accessibleChart")
    .Series(series =>
    {
        // Series 1: Circle
        series.Name("Product A")
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Circle)
                  .Height(10)
                  .Width(10))
              .Add();
        
        // Series 2: Triangle
        series.Name("Product B")
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Triangle)
                  .Height(10)
                  .Width(10))
              .Add();
        
        // Series 3: Diamond
        series.Name("Product C")
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Diamond)
                  .Height(10)
                  .Width(10))
              .Add();
    })
    .Render()
```

## Performance Considerations

### Large Datasets

For charts with many data points, consider:

```cshtml
@Html.EJS().Chart("largeDataChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("X")
              .YName("Y")
              .Marker(m => m.Visible(false))  // Disable for performance
              .Width(2)
              .DataSource(ViewBag.LargeData)  // 1000+ points
              .Add();
    })
    .Render()
```

**Guidelines:**
- Disable markers if > 100 points per series
- Use thicker lines instead of markers
- Enable markers only on hover/selection
- Consider data aggregation/sampling

## Common Patterns

### Line Chart with Markers

```cshtml
@Html.EJS().Chart("lineWithMarkers").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .XName("Month")
              .YName("Sales")
              .Width(3)
              .Marker(marker => marker
                  .Visible(true)
                  .Height(10)
                  .Width(10)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Circle)
                  .Fill("#1E88E5")
                  .Border(b => b.Width(2).Color("#FFFFFF")))
              .DataSource(ViewBag.ChartData)
              .Add();
    }).Render()
```

### Spline Chart with Custom Markers

```cshtml
@Html.EJS().Chart("splineCustomMarkers").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Spline)
              .XName("X")
              .YName("Y")
              .Marker(marker => marker
                  .Visible(true)
                  .Height(12)
                  .Width(12)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Pentagon)
                  .Fill("rgba(255, 87, 51, 0.8)")
                  .Border(b => b.Width(2).Color("#FF5733")))
              .DataSource(ViewBag.Data)
              .Add();
    }).Render()
```

### Scatter Plot

```cshtml
@Html.EJS().Chart("scatterPlot").PrimaryXAxis(px => px.Title("Height (cm)")
    ).PrimaryYAxis(py => py.Title("Weight (kg)")
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Scatter)
              .XName("Height")
              .YName("Weight")
              .Marker(marker => marker
                  .Visible(true)
                  .Height(8)
                  .Width(8)
                  .Shape(Syncfusion.EJ2.Charts.ChartShape.Circle)
                  .Opacity(0.7))
              .DataSource(ViewBag.ScatterData)
              .Add();
    }).Render()
```

## Troubleshooting

### Markers not visible
- Check `Visible(true)` is set
- Verify marker size is appropriate (Height/Width)
- Check if marker color contrasts with background
- Ensure opacity is not set to 0

### Markers clipped at edges
- Add padding to chart area
- Adjust axis ranges to include marker space
- Use `EdgeLabelPlacement.Shift` on axes

### Image markers not displaying
- Verify image path is correct
- Check image file exists and is accessible
- Ensure image format is supported (PNG, JPG, SVG)
- Check browser console for 404 errors

### Performance issues with markers
- Reduce number of data points
- Disable markers for large datasets
- Use sampling or aggregation
- Consider using canvas instead of SVG

## Best Practices

1. **Visibility**: Enable markers only when they add value
2. **Size**: Use 8-12px for most cases
3. **Consistency**: Use same marker size across series
4. **Contrast**: Ensure markers stand out against lines
5. **Accessibility**: Use distinct shapes for multiple series
6. **Performance**: Disable for large datasets (>100 points)

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartMarker.html
