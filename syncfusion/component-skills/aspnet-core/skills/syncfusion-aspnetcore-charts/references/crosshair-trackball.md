# Crosshair and Trackball Configuration

This guide covers comprehensive crosshair and trackball configuration in Syncfusion ASP.NET Core Charts, including customization, tooltip integration, line styles, and shared tooltip features.

## Table of Contents

- [Crosshair Basics](#crosshair-basics)
  - [Enable Basic Crosshair](#enable-basic-crosshair)
  - [Crosshair with Multiple Series](#crosshair-with-multiple-series)
  - [Crosshair on DateTime Axis](#crosshair-on-datetime-axis)
- [Crosshair Customization](#crosshair-customization)
  - [Line Color and Width](#line-color-and-width)
  - [Vertical Line Only](#vertical-line-only)
  - [Horizontal Line Only](#horizontal-line-only)
  - [Dashed Crosshair Lines](#dashed-crosshair-lines)
- [Trackball Mode](#trackball-mode)
  - [Basic Trackball](#basic-trackball)
  - [Trackball with Markers](#trackball-with-markers)
- [Tooltip Integration](#tooltip-integration)
  - [Crosshair with Tooltip](#crosshair-with-tooltip)
  - [Styled Tooltip with Crosshair](#styled-tooltip-with-crosshair)
  - [Tooltip Template with Crosshair](#tooltip-template-with-crosshair)
- [Line Styles and Labels](#line-styles-and-labels)
  - [Crosshair with Axis Labels](#crosshair-with-axis-labels)
  - [Custom Label Format](#custom-label-format)
  - [Styled Crosshair Labels](#styled-crosshair-labels)
- [Shared Tooltips](#shared-tooltips)
  - [Basic Shared Tooltip](#basic-shared-tooltip)
  - [Shared Tooltip with Custom Format](#shared-tooltip-with-custom-format)
  - [Shared Tooltip Template](#shared-tooltip-template)
- [Advanced Configuration](#advanced-configuration)
  - [Crosshair with Animation](#crosshair-with-animation)
  - [Event Handling](#event-handling)
  - [Multiple Axes with Crosshair](#multiple-axes-with-crosshair)
- [When to Use](#when-to-use)

## Crosshair Basics

### Enable Basic Crosshair

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
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
            new { Month = "May", Sales = 40 },
            new { Month = "Jun", Sales = 38 }
        };
        return View();
    }
}
```

### Crosshair with Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Crosshair on DateTime Axis

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" labelFormat="MMM dd"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.TimeSeriesData" 
                  xName="Date" 
                  yName="Temperature" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.TimeSeriesData = new[]
{
    new { Date = new DateTime(2024, 1, 1), Temperature = 25.5 },
    new { Date = new DateTime(2024, 1, 2), Temperature = 26.2 },
    new { Date = new DateTime(2024, 1, 3), Temperature = 24.8 },
    new { Date = new DateTime(2024, 1, 4), Temperature = 27.1 }
};
```

## Crosshair Customization

### Line Color and Width

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" 
                             lineType="@Syncfusion.EJ2.Charts.LineType.Both"
                             line-width="2"
                             line-color="#0078D4"
                             line-dashArray="5,5">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Vertical Line Only

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" 
                             lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"
                             line-width="2"
                             line-color="#107C10">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Horizontal Line Only

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" 
                             lineType="@Syncfusion.EJ2.Charts.LineType.Horizontal"
                             line-width="2"
                             line-color="#E74856">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Dashed Crosshair Lines

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" 
                             lineType="@Syncfusion.EJ2.Charts.LineType.Both"
                             line-width="1"
                             line-color="#666"
                             line-dashArray="10,5">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Trackball Mode

### Basic Trackball

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" shared="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales" 
                  xName="Month" 
                  yName="Amount" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.Profit" 
                  xName="Month" 
                  yName="Amount" 
                  name="Profit"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.Sales = new[]
{
    new { Month = "Jan", Amount = 35 },
    new { Month = "Feb", Amount = 28 },
    new { Month = "Mar", Amount = 34 },
    new { Month = "Apr", Amount = 32 }
};

ViewBag.Profit = new[]
{
    new { Month = "Jan", Amount = 15 },
    new { Month = "Feb", Amount = 12 },
    new { Month = "Mar", Amount = 18 },
    new { Month = "Apr", Amount = 16 }
};
```

### Trackball with Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" shared="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Product1" 
                  xName="Date" 
                  yName="Sales" 
                  name="Product 1"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="8" height="8" shape="Circle"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.Product2" 
                  xName="Date" 
                  yName="Sales" 
                  name="Product 2"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="8" height="8" shape="Diamond"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.Product3" 
                  xName="Date" 
                  yName="Sales" 
                  name="Product 3"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="8" height="8" shape="Rectangle"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Tooltip Integration

### Crosshair with Tooltip

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true"></e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
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

### Styled Tooltip with Crosshair

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true" 
                   fill="#0078D4" 
                   opacity="0.9"
                   format="${point.x} : <b>${point.y}</b>"></e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" 
                             line-color="#0078D4"
                             line-width="2">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Tooltip Template with Crosshair

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true" 
                   template="<div style='background:#0078D4;color:white;padding:10px;border-radius:5px'><b>${point.x}</b><br/>Sales: <b>${point.y}</b></div>"></e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Both"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Line Styles and Labels

### Crosshair with Axis Labels

```cshtml
@{
    textStyle = { color="#ffffff" }
}
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true" fill="#0078D4" textStyle="textStyle">
        </e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-crosshairtooltip enable="true" fill="#0078D4" textStyle="textStyle">
        </e-crosshairtooltip>
    </e-chart-primaryyaxis>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Label Format

```cshtml
@{
    textStyle = { color="#ffffff" fontWeight="600" }
}
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" labelFormat="MMM dd">
        <e-crosshairtooltip enable="true" fill="#107C10" textStyle="textStyle">
        </e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis labelFormat="${value}">
        <e-crosshairtooltip enable="true" fill="#107C10" textStyle="textStyle">
        </e-crosshairtooltip>
    </e-chart-primaryyaxis>
    <e-chart-crosshairsettings enable="true" line-color="#107C10"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.RevenueData" 
                  xName="Date" 
                  yName="Revenue" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.RevenueData = new[]
{
    new { Date = new DateTime(2024, 1, 1), Revenue = 35000 },
    new { Date = new DateTime(2024, 1, 2), Revenue = 42000 },
    new { Date = new DateTime(2024, 1, 3), Revenue = 38000 }
};
```

### Styled Crosshair Labels

```cshtml
@{
    textStyle = { color="#333" fontSize="12px" fontWeight="600" }
}
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true" 
                          fill="#FFB900"
                          opacity="0.9" textStyle="textStyle" >
        </e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-crosshairtooltip enable="true" 
                          fill="#FFB900"
                          opacity="0.9" textStyle="textStyle">
        </e-crosshairtooltip>
    </e-chart-primaryyaxis>
    <e-chart-crosshairsettings enable="true" 
                             line-color="#FFB900"
                             line-width="2">
    </e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Shared Tooltips

### Basic Shared Tooltip

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" shared="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Shared Tooltip with Custom Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   shared="true"
                   header="${point.x}">
    </e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Shared Tooltip Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   shared="true"
                   template="<div style='background:#f5f5f5;padding:10px;border:2px solid #0078D4;border-radius:5px'><div style='font-weight:bold;margin-bottom:5px;color:#0078D4'>${point.x}</div>${series.name}: <b>${point.y}</b></div>">
    </e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@Syncfusion.EJ2.Charts.LineType.Vertical"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales" 
                  xName="Month" 
                  yName="Amount" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.Profit" 
                  xName="Month" 
                  yName="Amount" 
                  name="Profit"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Advanced Configuration

### Crosshair with Animation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" enableAnimation="true" duration="1000"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline"
                  enableAnimation="true">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Event Handling

```cshtml
<ejs-chart id="chart" tooltipRender="tooltipRender">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function tooltipRender(args) {
        // Custom tooltip rendering
        if (args.point.y > 35) {
            args.tooltip.fill = '#107C10';
        } else {
            args.tooltip.fill = '#E74856';
        }
    }
</script>
```

### Multiple Axes with Crosshair

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
        <e-crosshairtooltip enable="true"></e-crosshairtooltip>
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Revenue">
        <e-crosshairtooltip enable="true"></e-crosshairtooltip>
    </e-chart-primaryyaxis>
    <e-chart-axes>
        <e-chart-axis name="yAxis2" title="Units" opposedPosition="true">
            <e-crosshairtooltip enable="true"></e-crosshairtooltip>
        </e-chart-axis>
    </e-chart-axes>
    <e-chart-tooltipsettings enable="true" shared="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true"></e-chart-crosshairsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.RevenueData" 
                  xName="Month" 
                  yName="Revenue" 
                  name="Revenue"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.UnitsData" 
                  xName="Month" 
                  yName="Units" 
                  name="Units"
                  yAxisName="yAxis2"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## When to Use

**Basic Crosshair**: Use to help users read exact values from the chart by showing precise intersection points with axis lines.

**Vertical Line Only**: Use for time-series or category data where X-axis precision is more important than Y-axis reading.

**Horizontal Line Only**: Use when Y-axis value precision is critical, such as in threshold or target tracking scenarios.

**Trackball Mode**: Use with multiple line series to simultaneously display values for all series at a specific X-axis position.

**Tooltip Integration**: Use to provide detailed information about data points while the crosshair helps with precise positioning.

**Axis Labels**: Use to display exact axis values at the crosshair position for precise data reading without estimating from gridlines.

**Shared Tooltips**: Use when comparing multiple series values at the same X-axis position, ideal for trend analysis.

**Custom Styling**: Use to match brand guidelines or improve visibility against different chart backgrounds and color schemes.

Choose crosshair and trackball features based on data precision requirements, number of series, chart density, and whether users need to compare values across multiple datasets.
