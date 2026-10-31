# Tooltips Configuration

This guide covers comprehensive tooltip configuration in Syncfusion ASP.NET Core Charts, including enabling, customizing, templates, shared tooltips, formatting, styling, and animations.

## Table of Contents

- [Basic Tooltips](#basic-tooltips)
  - [Enable Basic Tooltip](#enable-basic-tooltip)
  - [Tooltip for Multiple Series](#tooltip-for-multiple-series)
- [Tooltip Customization](#tooltip-customization)
  - [Custom Fill Color](#custom-fill-color)
  - [Border and Shadow](#border-and-shadow)
  - [Rounded Corners](#rounded-corners)
  - [Opacity and Fade](#opacity-and-fade)
- [Tooltip Templates](#tooltip-templates)
  - [Basic Template](#basic-template)
  - [Rich Template with Icons](#rich-template-with-icons)
  - [Multi-Value Template](#multi-value-template)
  - [Image in Template](#image-in-template)
- [Shared Tooltips](#shared-tooltips)
  - [Basic Shared Tooltip](#basic-shared-tooltip)
  - [Shared Tooltip with Header](#shared-tooltip-with-header)
  - [Shared Tooltip Template](#shared-tooltip-template)
- [Format and Styling](#format-and-styling)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Currency Format](#currency-format)
  - [Percentage Format](#percentage-format)
  - [Font Styling](#font-styling)
  - [Multi-Line Format](#multi-line-format)
- [Tooltip Animations](#tooltip-animations)
  - [Enable Animation](#enable-animation)
  - [Fade Duration](#fade-duration)
- [Advanced Features](#advanced-features)
  - [Tooltip Events](#tooltip-events)
  - [Conditional Tooltips](#conditional-tooltips)
  - [Position Control](#position-control)
  - [Marker in Tooltip](#marker-in-tooltip)
- [When to Use](#when-to-use)

## Basic Tooltips

### Enable Basic Tooltip

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
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

### Tooltip for Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Tooltip Customization

### Custom Fill Color

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettingssettings enable="true" fill="#0078D4" opacity="0.9">
        <e-tooltipsettings-textstyle color="#ffffff"></e-tooltipsettings-textstyle>
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Border and Shadow

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" fill="#ffffff">
        <e-tooltipsettings-border width="2" color="#0078D4"></e-tooltipsettings-border>
        <e-tooltipsettings-textstyle color="#333" fontSize="14px" fontWeight="500"></e-tooltipsettings-textstyle>
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Rounded Corners

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   fill="#107C10" 
                   opacity="0.9"
                   rx="10"
                   ry="10">
        <e-tooltipsettings-textstyle color="#ffffff" fontWeight="600"></e-tooltipsettings-textstyle>
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Opacity and Fade

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   fill="#FFB900" 
                   opacity="0.8"
                   fadeOutDuration="1000">
        <e-tooltipsettings-textstyle color="#333"></e-tooltipsettings-textstyle>
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Tooltip Templates

### Basic Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   template="<div style='background:#0078D4;color:white;padding:10px;border-radius:5px'><b>${point.x}</b><br/>Sales: <b>${point.y}</b></div>">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Rich Template with Icons

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   template="<div style='background:#f5f5f5;padding:12px;border:2px solid #0078D4;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)'><div style='display:flex;align-items:center;margin-bottom:5px'><div style='width:12px;height:12px;background:${series.fill};margin-right:8px;border-radius:50%'></div><span style='font-weight:bold;color:#0078D4'>${series.name}</span></div><div style='color:#666'>${point.x}: <b style='color:#333'>${point.y}</b></div></div>">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales" 
                  xName="Month" 
                  yName="Amount" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multi-Value Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   template="<div style='background:white;padding:15px;border:2px solid #0078D4;border-radius:5px'><div style='font-weight:bold;color:#0078D4;margin-bottom:10px'>${point.x}</div><table style='font-size:12px'><tr><td>Sales:</td><td style='text-align:right;padding-left:10px'><b>${point.y}</b></td></tr><tr><td>Target:</td><td style='text-align:right;padding-left:10px'><b>${point.target}</b></td></tr><tr><td>Achievement:</td><td style='text-align:right;padding-left:10px'><b>${point.achievement}%</b></td></tr></table></div>">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.DetailedData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.DetailedData = new[]
{
    new { Month = "Jan", Sales = 35, target = 40, achievement = 87.5 },
    new { Month = "Feb", Sales = 42, target = 40, achievement = 105.0 },
    new { Month = "Mar", Sales = 38, target = 40, achievement = 95.0 }
};
```

### Image in Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   template="<div style='background:white;padding:10px;border:1px solid #ddd;border-radius:5px;text-align:center'><img src='/images/${point.x}.png' style='width:40px;height:40px'/><div style='margin-top:5px;font-weight:bold'>${point.x}</div><div style='color:#0078D4;font-weight:bold'>${point.y} units</div></div>">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductData" 
                  xName="Product" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bar">
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

### Shared Tooltip with Header

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   shared="true"
                   header="${point.x}">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Shared Tooltip Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   shared="true"
                   template="<div style='background:#f8f9fa;padding:12px;border-radius:5px;border:1px solid #dee2e6'><div style='font-weight:bold;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #0078D4'>${point.x}</div><div style='margin-top:5px'><span style='color:${series.fill};font-weight:bold'>\u25CF</span> ${series.name}: <b>${point.y}</b></div></div>">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.Sales" 
                  xName="Date" 
                  yName="Amount" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.Profit" 
                  xName="Date" 
                  yName="Amount" 
                  name="Profit"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Format and Styling

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using the `tooltipRender` event.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
<ejs-chart id="inlineTooltipChart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart-primaryxaxis>

    <e-chart-tooltipsettings
        enable="true"
        format="${series.name}<br/>${point.x:MMM yyyy}: ${point.y:n2}<br/>Opacity: ${series.opacity}">
    </e-chart-tooltipsettings>

    <e-series-collection>
        <e-series
            dataSource="ViewBag.ChartData"
            xName="Date"
            yName="Sales"
            name="Sales"
            opacity="0.8"
            type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

In the above example, `${point.x:MMM yyyy}` displays the x-value in month-year format, `${point.y:n2}` displays the y-value with two decimal places, and `${series.opacity}` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series, such as `Column`, `Bar`, `Line`, or `Spline`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to these tokens.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

### Currency Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" format="${point.x} : ${point.y:c0}"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.RevenueData" 
                  xName="Month" 
                  yName="Revenue" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.RevenueData = new[]
{
    new { Month = "Jan", Revenue = 35000 },
    new { Month = "Feb", Revenue = 42000 },
    new { Month = "Mar", Revenue = 38000 }
};
```

### Percentage Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" format="${point.x} : ${point.y}%"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.GrowthData" 
                  xName="Quarter" 
                  yName="Growth" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Font Styling

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" fill="#0078D4">
        <e-tooltipsettings-textstyle fontFamily="Arial" 
                           fontSize="14px" 
                           fontWeight="600" 
                           color="#ffffff">
        </e-tooltipsettings-textstyle>
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multi-Line Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   format="<b>${point.x}</b><br/>Sales: ${point.y}<br/>Target: 40">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Tooltip Animations

### Enable Animation

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   enableAnimation="true"
                   duration="500">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Fade Duration

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   enableAnimation="true"
                   fadeOutDuration="2000">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Advanced Features

### Tooltip Events

```cshtml
<ejs-chart id="chart" tooltipRender="tooltipRender">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function tooltipRender(args) {
        // Customize tooltip based on value
        if (args.point.y > 35) {
            args.tooltip.fill = '#107C10';
            args.tooltip.textStyle.color = '#ffffff';
        } else {
            args.tooltip.fill = '#E74856';
            args.tooltip.textStyle.color = '#ffffff';
        }
    }
</script>
```

#### Raw Datasource Record in `tooltipRender`

The complete source record for the hovered point is available only through the `tooltipRender` event as `args.data.rawData`. It is not a tooltip-format token. Access fields with their datasource names, such as `args.data.rawData.x` or `args.data.rawData.high`.

```cshtml
<ejs-chart id="rawDataTooltipChart" title="HiloOpenClose Raw Data Tooltip" tooltipRender="tooltipRender">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis minimum="80" maximum="200" interval="20"></e-chart-primaryyaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.HiloData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose"
                  xName="X" open="Open" high="High" low="Low" close="Close" name="Price">
        </e-series>
    </e-series-collection>
</ejs-chart>
<script>
    function tooltipRender(args) {
        if (!args.data || !args.data.rawData) {
            return;
        }
        var rawData = args.data.rawData;
        args.headerText = '<b>' + rawData.x + '</b>';
        args.text = [
            'Open: ' + rawData.open,
            'High: ' + rawData.high,
            'Low: ' + rawData.low,
            'Close: ' + rawData.close
        ];
    }
</script>
```

```csharp
// Controller
ViewBag.HiloData = new[]
{
    new { X = "Jan", Open = 120, High = 160, Low = 100, Close = 140 },
    new { X = "Feb", Open = 150, High = 190, Low = 130, Close = 170 },
    new { X = "Mar", Open = 130, High = 170, Low = 110, Close = 150 },
    new { X = "Apr", Open = 160, High = 180, Low = 120, Close = 140 },
    new { X = "May", Open = 150, High = 170, Low = 110, Close = 130 }
};
```

The JavaScript datasource record uses the serialized camel-case field names. Guard `args.data` and `args.data.rawData` before accessing a field. Do not generate `${point.data.<field>}` for this feature.

### Conditional Tooltips

```cshtml
<ejs-chart id="chart" tooltipRender="conditionalTooltip">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function conditionalTooltip(args) {
        // Show different content based on conditions
        if (args.point.y > 40) {
            args.tooltip.text = [args.point.x + ': ' + args.point.y + ' (Excellent!)'];
        } else if (args.point.y < 30) {
            args.tooltip.text = [args.point.x + ': ' + args.point.y + ' (Needs Improvement)'];
        }
    }
</script>
```

### Position Control

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" 
                   location-x="100"
                   location-y="50"
                   enableMarker="true">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Marker in Tooltip

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-tooltipsettings enable="true" enableMarker="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
        <e-series dataSource="ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## When to Use

**Basic Tooltips**: Use to provide additional information about data points without cluttering the chart visualization.

**Custom Styling**: Use to match tooltips with your brand guidelines, theme, or to improve visibility against chart backgrounds.

**Templates**: Use when you need to display complex information, multiple values, images, or rich HTML content in tooltips.

**Shared Tooltips**: Use with multiple series to compare values across all series at the same X-axis position simultaneously.

**Format Strings**: Use to display values in specific formats like currency, percentage, or custom units for better readability.

**Animations**: Use to create smooth, professional transitions when tooltips appear and disappear, enhancing user experience.

**Event Handling**: Use when you need dynamic tooltip behavior based on data values, conditions, or user interactions.

**Conditional Tooltips**: Use to show different tooltip content or styling based on data thresholds, targets, or business rules.

Choose tooltip configuration based on the complexity of information to display, number of series, design requirements, and level of interactivity needed.
