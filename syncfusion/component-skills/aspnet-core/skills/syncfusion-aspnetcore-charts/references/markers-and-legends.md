# Markers and Legends Configuration

This guide covers comprehensive marker and legend configuration in Syncfusion ASP.NET Core Charts, including shapes, customization, legend positioning, templates, and interactive features.

## Table of Contents

- [Data Markers](#data-markers)
  - [Enable Basic Markers](#enable-basic-markers)
  - [Markers for Multiple Series](#markers-for-multiple-series)
- [Marker Shapes](#marker-shapes)
  - [Circle Markers](#circle-markers)
  - [Diamond Markers](#diamond-markers)
  - [Triangle Markers](#triangle-markers)
  - [Different Shapes for Multiple Series](#different-shapes-for-multiple-series)
  - [Image Markers](#image-markers)
- [Marker Customization](#marker-customization)
  - [Size Customization](#size-customization)
  - [Fill Color and Border](#fill-color-and-border)
  - [Opacity](#opacity)
  - [Data Labels on Markers](#data-labels-on-markers)
- [Legend Basics](#legend-basics)
  - [Enable Legend](#enable-legend)
  - [Custom Legend Text](#custom-legend-text)
- [Legend Positioning](#legend-positioning)
  - [Top Position](#top-position)
  - [Bottom Position](#bottom-position)
  - [Left Position](#left-position)
  - [Right Position](#right-position)
  - [Custom Position](#custom-position)
- [Legend Customization](#legend-customization)
  - [Alignment](#alignment)
  - [Shape and Size](#shape-and-size)
  - [Background and Border](#background-and-border)
  - [Text Styling](#text-styling)
  - [Padding and Spacing](#padding-and-spacing)
- [Legend Templates](#legend-templates)
  - [Basic Template](#basic-template)
  - [Rich Template with Icons](#rich-template-with-icons)
- [Interactive Features](#interactive-features)
  - [Toggle Series Visibility](#toggle-series-visibility)
  - [Pagination](#pagination)
  - [Highlight on Hover](#highlight-on-hover)
- [When to Use](#when-to-use)

## Data Markers

### Enable Basic Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
public class ChartController : Controller
{
    public IActionResult Index()
    {
        ViewBag.ChartData = new[]
        {
            new { Month = "Jan", Sales = 35 },
            new { Month = "Feb", Sales = 28 },
            new { Month = "Mar", Sales = 34 },
            new { Month = "Apr", Sales = 32 },
            new { Month = "May", Sales = 40 }
        };
        return View();
    }
}
```

### Markers for Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Marker Shapes

### Circle Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="10" 
                           height="10" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Circle">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Diamond Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="12" 
                           height="12" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Diamond">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Triangle Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="10" 
                           height="10" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Triangle">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Different Shapes for Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Diamond"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Rectangle"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Image Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="20" 
                           height="20" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Image"
                           imageUrl="/images/marker-icon.png">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Marker Customization

### Size Customization

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="2">
            <e-series-marker visible="true" 
                           width="15" 
                           height="15" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Circle">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Fill Color and Border

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="12" 
                           height="12" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"
                           fill="#FFB900"
                           border-width="2"
                           border-color="#CC8800">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Opacity

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" 
                           width="14" 
                           height="14" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"
                           fill="#0078D4"
                           opacity="0.6">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Data Labels on Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Circle">
                <e-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Top">
                    <e-margin bottom="10"></e-margin>
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Legend Basics

### Enable Legend

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Legend Text

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  name="Sales (in thousands)" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Legend Positioning

### Top Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Top"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Bottom Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Left Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Left"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Right Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Custom">
        <e-legendsettings-location x="100" y="50"></e-legendsettings-location>
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" xName="Month" yName="Sales" name="Sales" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

## Legend Customization

### Alignment

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          position="@Syncfusion.EJ2.Charts.LegendPosition.Top" 
                          alignment="Center">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Shape and Size

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          shapeHeight="15" 
                          shapeWidth="15" 
                          shapePadding="10">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Background and Border

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          background="#F5F5F5" 
                          opacity="0.9">
        <e-legendsettings-border width="2" color="#0078D4"></e-legendsettings-border>
        <e-margin left="10" right="10" top="10" bottom="10"></e-margin>
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" xName="Month" yName="Sales" name="Sales" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Text Styling

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true">
        <e-legendsettings-textstyle fontFamily="Arial" 
                                   fontSize="14px" 
                                   fontWeight="600" 
                                   color="#333">
        </e-legendsettings-textstyle>
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Padding and Spacing

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          padding="15" 
                          shapePadding="12">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

## Legend Templates

### Basic Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          legendTemplate="<div style='padding:5px;background:#f0f0f0;border-radius:3px'><span style='font-weight:bold;color:#0078D4'>${series.name}</span></div>">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Rich Template with Icons

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          legendTemplate="<div style='display:flex;align-items:center;padding:5px'><div style='width:15px;height:15px;background:${series.fill};margin-right:8px;border-radius:50%'></div><span style='font-weight:500'>${series.name}</span></div>">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" fill="#0078D4" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" fill="#107C10" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Interactive Features

### Toggle Series Visibility

```cshtml
<ejs-chart id="chart" legendClick="legendClick">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" toggleVisibility="true"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" xName="Month" yName="Sales" name="2023" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Sales2024" xName="Month" yName="Sales" name="2024" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function legendClick(args) {
        console.log('Legend clicked:', args.series.name);
    }
</script>
```

### Pagination

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true" 
                          width="200" 
                          height="60" 
                          enablePages="true">
    </e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Series1" xName="X" yName="Y" name="Series 1" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Series2" xName="X" yName="Y" name="Series 2" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Series3" xName="X" yName="Y" name="Series 3" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Series4" xName="X" yName="Y" name="Series 4" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="ViewBag.Series5" xName="X" yName="Y" name="Series 5" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Highlight on Hover

```cshtml
<ejs-chart id="chart" legendRender="legendRender">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function legendRender(args) {
        // Custom legend rendering logic
        args.fill = args.fill;
    }
</script>
```

## When to Use

**Data Markers**: Use on line, spline, and scatter charts to highlight individual data points and make them easier to identify and track.

**Marker Shapes**: Use different shapes to distinguish multiple series when colors alone might not be sufficient or accessible.

**Marker Customization**: Use to match brand guidelines, create visual hierarchy, or draw attention to important data points.

**Legend Basics**: Use to identify series in charts with multiple datasets, providing clear labels for color-coded information.

**Legend Positioning**: Position based on chart layout and available space - Top/Bottom for horizontal space, Left/Right for vertical space.

**Legend Customization**: Use to match design systems, improve readability, or highlight specific series through visual styling.

**Legend Templates**: Use when you need rich formatting, icons, or complex layouts beyond simple text and color indicators.

**Toggle Visibility**: Use to allow users to interactively show/hide series, especially useful in busy charts with many datasets.

**Pagination**: Use when there are many series that would make the legend too large or cluttered in the available space.

Choose marker and legend configuration based on the number of series, chart type, available space, accessibility requirements, and the level of interactivity needed.
