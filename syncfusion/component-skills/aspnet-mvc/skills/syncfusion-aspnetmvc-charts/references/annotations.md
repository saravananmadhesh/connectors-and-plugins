# Annotations

Annotations allow you to add custom content (text, shapes, images, HTML) to highlight specific regions or data points on charts.

## Table of Contents
- [Basic Annotation](#basic-annotation)
- [Coordinate Units](#coordinate-units)  
- [Text Annotations](#text-annotations)  
- [Shape Annotations](#shape-annotations)  
- [Image Annotations](#image-annotations)  
- [HTML Annotations](#html-annotations)  
- [Region Annotations](#region-annotations)  
- [Dynamic Annotations](#dynamic-annotations)  
- [Common Patterns](#common-patterns)
  - [Threshold Line Annotation](#threshold-line-annotation)
  - [Data Label Annotation](#data-label-annotation)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Basic Annotation

```cshtml
@Html.EJS().Chart("annotationChart").Annotations(annot =>
    {
        annot.Content("<div style='padding:5px; background:#FF5733; color:white; border-radius:3px;'><b>Peak Sales</b></div>")
            .X("Mar")  // X-axis value
            .Y(45)     // Y-axis value
            .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
            .Add();
    }
    ).Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

## Coordinate Units

Control how annotations are positioned.

```cshtml
// Point units - based on data values
.CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)

// Pixel units - based on chart pixels
.CoordinateUnits(Syncfusion.EJ2.Charts.Units.Pixel)
```

## Text Annotations

```cshtml
.Annotations(annot =>
{
    annot.Content("<div style='font-size:14px; font-weight:bold; color:#1E88E5;'>Q1 Target: $50K</div>")
        .X("Feb")
        .Y(50)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Add();
})
```

## Shape Annotations

```cshtml
.Annotations(annot =>
{
    // Rectangle
    annot.Content("<div style='width:100px; height:50px; background:rgba(255,0,0,0.2); border:2px solid red;'></div>")
        .X(100)
        .Y(200)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Pixel)
        .Add();
    
    // Circle
    annot.Content("<div style='width:30px; height:30px; background:#00FF00; border-radius:50%;'></div>")
        .X("May")
        .Y(40)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Add();
})
```

## Image Annotations

```cshtml
.Annotations(annot =>
{
    annot.Content("<img src='/images/warning.png' width='32' height='32'/>")
        .X("Jun")
        .Y(30)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Add();
})
```

## HTML Annotations

```cshtml
.Annotations(annot =>
{
    annot.Content("<div style='padding:10px; background:white; border:2px solid #1E88E5; border-radius:5px; box-shadow:0 2px 4px rgba(0,0,0,0.2);'>" +
                 "<h4 style='margin:0 0 5px 0;'>Important Note</h4>" +
                 "<p style='margin:0; font-size:12px;'>Sales spike due to promotion</p>" +
                 "</div>")
        .X("Jul")
        .Y(55)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Add();
})
```

## Region Annotations

Highlight specific regions:

```cshtml
@Html.EJS().Chart("regionChart")
    .Annotations(annot =>
    {
        // Vertical band
        annot.Content("<div style='width:2px; height:100%; background:rgba(255,0,0,0.5);'></div>")
            .X(150)
            .Y(0)
            .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Pixel)
            .Add();
        
        // Horizontal band
        annot.Content("<div style='width:100%; height:2px; background:rgba(0,255,0,0.5);'></div>")
            .X(0)
            .Y(200)
            .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Pixel)
            .Add();
    }
    ).Series(series => series.Add()
    ).Render()
```

## Dynamic Annotations

Add annotations based on data:

```cshtml
<script>
    function onLoaded(args) {
        var chart = args.chart;
        var maxPoint = getMaxDataPoint(chart.series[0].dataSource);
        
        // Add annotation at max point
        chart.annotations = [{
            content: `<div style='background:#00FF00; padding:5px; color:white;'><b>Max: ${maxPoint.y}</b></div>`,
            x: maxPoint.x,
            y: maxPoint.y,
            coordinateUnits: 'Point'
        }];
        
        chart.refresh();
    }
    
    function getMaxDataPoint(data) {
        return data.reduce((max, point) => point.Y > max.y ? point : max, data[0]);
    }
</script>

@Html.EJS().Chart("dynamicAnnotation")
    .Loaded("onLoaded").Series(series => series.DataSource(ViewBag.Data).Add()
    ).Render()
```

## Common Patterns

### Threshold Line Annotation

```cshtml
.Annotations(annot =>
{
    annot.Content("<div style='width:100%; height:2px; background:#FF0000; position:relative;'>" +
                 "<span style='position:absolute; right:0; top:-20px; color:#FF0000; font-weight:bold;'>Target</span>" +
                 "</div>")
        .X(0)
        .Y(50)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Region(Syncfusion.EJ2.Charts.Regions.Chart)
        .Add();
})
```

### Data Label Annotation

```cshtml
.Annotations(annot =>
{
    annot.Content("<div style='background:rgba(0,0,0,0.7); color:white; padding:8px; border-radius:4px;'>" +
                 "<div style='font-size:16px; font-weight:bold;'>$45K</div>" +
                 "<div style='font-size:11px;'>↑ 25% from last month</div>" +
                 "</div>")
        .X("Apr")
        .Y(45)
        .CoordinateUnits(Syncfusion.EJ2.Charts.Units.Point)
        .Add();
})
```

## Best Practices

1. **Positioning**: Use Point units for data-aligned annotations
2. **Styling**: Keep annotation styles consistent with chart theme
3. **Clarity**: Ensure annotations don't obscure important data
4. **Performance**: Limit number of annotations (prefer strip lines for regions)
5. **Responsiveness**: Test annotation positioning on different screen sizes

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAnnotation.html
