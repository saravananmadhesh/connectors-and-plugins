# Tooltip

## Table of Contents
- [Overview](#overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Formatting](#tooltip-formatting)
  - [Basic Format](#basic-format)
  - [Multi-Line Format](#multi-line-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Custom Data in Tooltip](#custom-data-in-tooltip)
- [Shared Tooltips](#shared-tooltips)
- [Tooltip Templates](#tooltip-templates)
  - [Basic Template](#basic-template)
  - [Rich Template with Styling](#rich-template-with-styling)
  - [Template with Icons](#template-with-icons)
  - [Shared Tooltip Template](#shared-tooltip-template)
- [Tooltip Customization](#tooltip-customization)
  - [Fill and Border](#fill-and-border)
  - [Text Style](#text-style)
  - [Duration and Animation](#duration-and-animation)
  - [Enable Marker](#enable-marker)
- [Crosshair Tooltips](#crosshair-tooltips)
- [Tooltip Events](#tooltip-events)
  - [Before Tooltip Render](#before-tooltip-render)
  - [Conditional Tooltip Display](#conditional-tooltip-display)
- [Common Patterns](#common-patterns)
  - [Financial Chart Tooltip](#financial-chart-tooltip)
  - [Multi-Series Comparison Tooltip](#multi-series-comparison-tooltip)
  - [Percentage Change Tooltip](#percentage-change-tooltip)
- [Troubleshooting](#troubleshooting)
  - [Tooltip not showing](#tooltip-not-showing)
  - [Tooltip flickering](#tooltip-flickering)
  - [Template not rendering](#template-not-rendering)
  - [Shared tooltip showing wrong data](#shared-tooltip-showing-wrong-data)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Overview

Tooltips display detailed information when users hover over data points, providing context without cluttering the chart with permanent labels.

## Enabling Tooltips

Tooltips are disabled by default. Enable them via TooltipSettings:

```cshtml
@Html.EJS().Chart("tooltipChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).Tooltip(tooltip => tooltip.Enable(true)
    ).Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .XName("Month")
              .YName("Sales")
              .Add();
    }).Render()
```

**Default tooltip shows:**
- Series name
- X-axis value
- Y-axis value

## Tooltip Formatting

Customize tooltip text using format strings.

### Basic Format

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Format("${point.x}: ${point.y}K"))  // Jan: 35K
```

**Format placeholders:**
- `${point.x}` - X-axis value
- `${point.y}` - Y-axis value
- `${series.name}` - Series name
- `${point.tooltip}` - Custom tooltip property from data

### Multi-Line Format

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Format("<b>${series.name}</b><br/>" +
           "Month: ${point.x}<br/>" +
           "Sales: $${point.y}K"))
```

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `Format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Format("${series.name}<br/>" +
            "Month: ${point.x:MMM yyyy}<br/>" +
            "Sales: ${point.y:n2}<br/>" +
            "Opacity: ${series.opacity}"))
```

In the above example, `point.x` is displayed in month-year format, `point.y` is displayed with two decimal places, and `series.opacity` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series, such as `Column`, `Bar`, `Line`, or `StackingColumn`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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

### Custom Data in Tooltip

Include extra data properties:

```csharp
// Controller
public class SalesData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Target { get; set; }
    public string Region { get; set; }
}
```

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Format("<b>${point.x}</b><br/>" +
           "Sales: $${point.y}<br/>" +
           "Target: ${point.tooltip}<br/>" +  
           "Region: ${point.region}")

).Series(series =>
{
    series.DataSource(ViewBag.Data)
          .XName("Month")
          .YName("Sales")
          .TooltipMappingName("Target")  // Maps to ${point.tooltip}
          .Add();
})
```

## Shared Tooltips

Display data from all series at once.

```cshtml
@Html.EJS().Chart("sharedTooltip").Tooltip(tooltip => tooltip
        .Enable(true)
        .Shared(true)
    ).Series(series =>
    {
        series.DataSource(ViewBag.Sales)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Add();

        series.DataSource(ViewBag.Profit)
              .XName("Month")
              .YName("Profit")
              .Name("Profit")
              .Add();

        series.DataSource(ViewBag.Expenses)
              .XName("Month")
              .YName("Expenses")
              .Name("Expenses")
              .Add();
    }).Render()
```

**Shared tooltip shows:**
- X-axis value (common for all series)
- Each series name and value
- Color-coded by series

## Tooltip Templates

Create custom HTML tooltips.

### Basic Template

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Template("<div style='padding:10px; background:#333; color:#FFF; border-radius:5px;'>" +
             "<div style='font-weight:bold; font-size:14px;'>${point.x}</div>" +
             "<div style='margin-top:5px;'>Sales: <b>${point.y}</b></div>" +
             "</div>"))
```

### Rich Template with Styling

```cshtml
<script id="GradientTooltipTemplate" type="text/x-template">
    <div style="
        width:150px;
        padding:12px;
        background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color:white;
        border-radius:8px;
        box-shadow:0 4px 6px rgba(0,0,0,0.2);">

        <div style="font-size:16px; font-weight:bold; margin-bottom:8px;">
            ${point.x}
        </div>

        <div style="display:flex; justify-content:space-between;">
            <span>Sales:</span>
            <span style="font-weight:bold;">$${point.y}K</span>
        </div>
    </div>
</script>
```

```cshtml

.Tooltip(tooltip => tooltip
    .Enable(true)
    .Template("#GradientTooltipTemplate")
)

```

### Template with Icons

```cshtml

<script id="TooltipTemplate" type="text/x-template">
    <div style="padding:10px; background:#FFF; border:2px solid #1E88E5; border-radius:5px;">
        <div>
            <img src="/images/chart-icon.png"
                 width="20"
                 height="20e="margin-top:5px;">
            ${point.x}: <b>${point.y}</b>
        </div>
    </div>
</script>

```

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Template("#TooltipTemplate"))
```

### Shared Tooltip Template

```cshtml

<script id="sharedTooltipTemplate" type="text/x-template">
    <div style="padding:10px; background:#FFF; border:1px solid #E0E0E0; border-radius:5px;">
        <div style="font-weight:bold; margin-bottom:8px; border-bottom:1px solid #E0E0E0; padding-bottom:5px;">
            ${point.x}
        </div>
        <div style="margin-top:8px;">
            {{for points}}
            <div style="display:flex; justify-content:space-between; margin:4px 0;">
                <div>
                    <span style="display:inline-block; width:10px; height:10px; background:${point.fill}; margin-right:5px;"></span>
                    ${point.series.name}
                </div>
                <b>${point.y}</b>
            </div>
            {{/for}}
        </div>
    </div>
</script>

```

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Shared(true)
    .Template("#sharedTooltipTemplate"))
```

## Tooltip Customization

### Fill and Border

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Fill("rgba(0, 0, 0, 0.8)")
    .Border(border => border
        .Width(2)
        .Color("#1E88E5"))
    .Opacity(0.9))
```

### Text Style

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .TextStyle(text => text
        .Size("13px")
        .FontFamily("Arial")
        .Color("#FFFFFF")
        .FontWeight("500")))
```

### Duration and Animation

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .Duration(1000)  // Fade out after 1 second
    .FadeOutDuration(500))  // Fade out animation duration
```

### Enable Marker

Show marker in tooltip:

```cshtml
.Tooltip(tooltip => tooltip
    .Enable(true)
    .EnableMarker(true))
```

## Crosshair Tooltips

Combine tooltips with crosshair for precise data tracking.

```cshtml
@Html.EJS().Chart("crosshairTooltip").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime).CrosshairTooltip(ct => ct.Enable(true))
    ).PrimaryYAxis(py => py
        .CrosshairTooltip(ct => ct.Enable(true))
    ).Tooltip(tooltip => tooltip.Enable(true)
    ).CrosshairSettings(cross => cross.Enable(true)
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(ViewBag.Data)
              .XName("Date")
              .YName("Value")
              .Add();
    }).Render()
```

## Tooltip Events

Handle tooltip rendering for custom behavior.

### Before Tooltip Render

```cshtml
<script>
    function onTooltipRender(args) {
        // Customize tooltip before rendering
        if (args.point.y > 50) {
            args.text = "High Value: " + args.point.y;
            args.textStyle.color = "#00FF00";
        } else {
            args.text = "Value: " + args.point.y;
        }
    }
</script>

@Html.EJS().Chart("tooltipEvent")
    .Tooltip(tooltip => tooltip.Enable(true))
    .TooltipRender("onTooltipRender")
    .Series(series => series.Add())
    .Render()
```

### Conditional Tooltip Display

```cshtml
<script>
    function onTooltipRender(args) {
        // Hide tooltip for specific values
        if (args.point.y < 10) {
            args.cancel = true;
        }
    }
</script>

@Html.EJS().Chart("conditionalTooltip")
    .Tooltip(tooltip => tooltip.Enable(true))
    .TooltipRender("onTooltipRender")
    .Series(series => series.Add())
    .Render()
```

### Raw Datasource Record in `TooltipRender`

The complete datasource record is available only in the `TooltipRender` event through `args.data.rawData`. It is not a tooltip format token.

```cshtml
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

@Html.EJS().Chart("rawDataTooltipChart")
    .PrimaryXAxis(x => x.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .Tooltip(t => t.Enable(true))
    .TooltipRender("tooltipRender")
    .Series(series => series
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.HiloOpenClose)
        .DataSource(ViewBag.HiloData)
        .XName("X").Open("Open").High("High").Low("Low").Close("Close")
        .Name("Price").Add())
    .Render()
```

```csharp
ViewBag.HiloData = new[]
{
    new { X = "Jan", Open = 120, High = 160, Low = 100, Close = 140 },
    new { X = "Feb", Open = 150, High = 190, Low = 130, Close = 170 },
    new { X = "Mar", Open = 130, High = 170, Low = 110, Close = 150 },
    new { X = "Apr", Open = 160, High = 180, Low = 120, Close = 140 },
    new { X = "May", Open = 150, High = 170, Low = 110, Close = 130 }
};
```

Use serialized field names such as `args.data.rawData.x` and `args.data.rawData.high`. Do not generate `${point.data.<field>}` for this feature.

## Common Patterns

### Financial Chart Tooltip

```cshtml
@Html.EJS().Chart("financialTooltip").Tooltip(tooltip => tooltip
        .Enable(true)
        .Format("<b>${point.x}</b><br/>" +
               "Open: <b>${point.open}</b><br/>" +
               "High: <b>${point.high}</b><br/>" +
               "Low: <b>${point.low}</b><br/>" +
               "Close: <b>${point.close}</b>")
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(ViewBag.StockData)
              .XName("Date")
              .High("High")
              .Low("Low")
              .Open("Open")
              .Close("Close")
              .Add();
    }).Render()
```

### Multi-Series Comparison Tooltip

```cshtml
@Html.EJS().Chart("comparisonTooltip").Tooltip(tooltip => tooltip
        .Enable(true)
        .Shared(true)
        .Format("<b>${point.x}</b><br/>" +
               "{{for points}}" +
               "${point.series.name}: <b>${point.y}</b><br/>" +
               "{{/for}}")
    ).Series(series =>
    {
        series.Name("2022").DataSource(data2022).Add();
        series.Name("2023").DataSource(data2023).Add();
    }).Render()
```

### Percentage Change Tooltip

```cshtml
<script>
    function onTooltipRender(args) {
        var currentValue = args.point.y;
        var previousValue = args.series.points[args.point.index - 1]?.y || currentValue;
        var change = ((currentValue - previousValue) / previousValue * 100).toFixed(2);
        var arrow = change > 0 ? "▲" : "▼";
        var color = change > 0 ? "#00FF00" : "#FF0000";
        
        args.text = `<div>
            <b>${args.point.x}</b><br/>
            Value: ${currentValue}<br/>
            Change: <span style="color:${color}">${arrow} ${Math.abs(change)}%</span>
        </div>`;
    }
</script>

@Html.EJS().Chart("changeTooltip")
    .Tooltip(tooltip => tooltip.Enable(true))
    .TooltipRender("onTooltipRender")
    .Series(series => series.Add())
    .Render()
```

## Troubleshooting

### Tooltip not showing
- Check `Enable(true)` in Tooltip settings
- Verify mouse events are not blocked by CSS
- Ensure data points exist
- Check browser console for JavaScript errors

### Tooltip flickering
- Reduce `Duration` value
- Check for overlapping chart elements
- Verify no conflicting event handlers
- Use `FadeOutDuration` for smooth transitions

### Template not rendering
- Check HTML syntax in template string
- Verify placeholder names are correct
- Escape special characters properly
- Test with simple template first

### Shared tooltip showing wrong data
- Ensure all series have same X-axis values
- Check series data alignment
- Verify `Shared(true)` is set
- Use consistent data types across series

## Best Practices

1. **Clarity**: Keep tooltip content concise and readable
2. **Formatting**: Use consistent number and date formatting
3. **Shared**: Use shared tooltips for multi-series comparison
4. **Templates**: Style templates to match chart theme
5. **Performance**: Avoid heavy computations in TooltipRender event
6. **Accessibility**: Tooltips complement but don't replace data labels for accessibility
7. **Mobile**: Test tooltip behavior on touch devices

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartTooltipSettings.html
