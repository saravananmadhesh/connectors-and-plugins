# Tooltips and Interactivity in HeatMap

## Table of Contents
- [Tooltip Overview](#tooltip-overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Formatting](#tooltip-formatting)
- [Tooltip Customization](#tooltip-customization)
- [Interactive Features](#interactive-features)
- [Common Use Cases](#common-use-cases)

## Tooltip Overview

Tooltips display detailed information when users hover over cells. They:
- Show values without cluttering the display
- Provide additional cell information
- Support custom templates
- Enhance user exploration
- Improve data accessibility

### Basic Tooltip

```csharp
@Html.EJS().HeatMap("container")
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true);
    })
    .Render()
```

## Enabling Tooltips

### Show Tooltips

Enable tooltip display on hover:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
})
```

### Hide Tooltips

Disable tooltips completely:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(false);
})
```

### Toggle Tooltips Dynamically

Control tooltips at runtime:

```csharp
<script>
function toggleTooltips() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.tooltip.visible = !heatmap.tooltip.visible;
    heatmap.refresh();
}
</script>

<button onclick="toggleTooltips()">Toggle Tooltips</button>
```

## Tooltip Formatting

### Default Tooltip Content

Show value by default:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("{value}");  // Shows just the value
})
```

### Show Row and Column Headers

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("{xLabel}: {yLabel} = {value}");
})
// Example: "Jan: Q1 = 150"
```

### Complete Cell Information

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("<b>{xLabel} - {yLabel}</b><br/>Value: {value}");
})
```

### Formatted Values

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("<b>{xLabel}</b><br/>{yLabel}: ${value:N2}");
})
// Example: Jan\nQ1: $1,234.56
```

### Percentage in Tooltip

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("{xLabel}<br/>{yLabel}<br/>Percentage: {percentage:.1f}%");
})
```

### Tooltip Format Placeholders

| Placeholder | Value | Example |
|------------|-------|---------|
| `{xLabel}` | Column header | "January" |
| `{yLabel}` | Row header | "Q1" |
| `{value}` | Cell value | "1234" |
| `{percentage}` | Value percentage | "45.5" |

## Tooltip Customization

### Tooltip Styling

Customize appearance:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format("{xLabel}: {value}");
    tooltip.Fill("#ffffff");
    tooltip.Opacity(0.95);
    tooltip.TextStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("12px");
        style.Color("#333333");
    });
    tooltip.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
    });
})
```

### Tooltip Template

Create custom HTML tooltips:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Template("<div class='custom-tooltip'>" +
        "<span class='label'>${xLabel}</span>" +
        "<span class='value'>${value}</span>" +
        "</div>");
})
```

### Tooltip Border

Add emphasis with border:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(2);
    });
})
```

### Tooltip Background Color

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Fill("#f0f0f0");
    tooltip.Opacity(0.9);
})
```

### Tooltip Text Color

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.TextStyle(style =>
    {
        style.Color("#ffffff");
        style.FontWeight("bold");
    });
    tooltip.Fill("#333333");
})
```

### Tooltip Margins

Control spacing inside tooltip:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Margin(margin =>
    {
        margin.Left(10);
        margin.Right(10);
        margin.Top(8);
        margin.Bottom(8);
    });
})
```

## Interactive Features

### Hover Highlighting

Highlight cell on tooltip hover:

```csharp
@Html.EJS().HeatMap("container")
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true);
        tooltip.Format("{xLabel}: {yLabel} = {value}");
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.Border(border =>
        {
            border.Color("#ffffff");
            border.Width(1);
        });
    })
    .Render()
```

### Cell Selection with Tooltip

Show tooltip when cell is selected:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true);
        tooltip.Format("<b>Selected Cell</b><br/>{xLabel} - {yLabel}<br/>Value: {value}");
    })
    .Render()
```

### Multiple Tooltips

Show related information:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>{xLabel}</b><br/>" +
        "<b>{yLabel}</b><br/>" +
        "Value: {value}<br/>" +
        "Range: Min-Max<br/>" +
        "Status: Active"
    );
})
```

## Common Use Cases

### Use Case 1: Sales Data Tooltip

Display comprehensive sales information:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b style='color:#0078d4;'>{xLabel}</b><br/>" +
        "<b>{yLabel}</b><br/>" +
        "<hr/>" +
        "Sales: ${value:N0}<br/>" +
        "Share: {percentage:.1f}%"
    );
    tooltip.Fill("#ffffff");
    tooltip.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(2);
    });
})
```

### Use Case 2: Performance Metrics

Show performance with color coding:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Template(
        "<div class='perf-tooltip'>" +
        "<span class='metric'>${xLabel}</span>" +
        "<span class='value'>${value}%</span>" +
        "<span class='status'>${yLabel}</span>" +
        "</div>"
    );
})
```

### Use Case 3: Correlation Matrix

Display correlation details:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>Correlation: {xLabel} vs {yLabel}</b><br/>" +
        "Coefficient: {value:.3f}<br/>" +
        "Strength: " +
        "#=Math.abs(value) > 0.7 ? 'Strong' : 'Moderate'#"
    );
})
```

### Use Case 4: Calendar Heatmap

Show activity details:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>{xLabel} {yLabel}</b><br/>" +
        "Activity: {value} events<br/>" +
        "Date: #=getFullDate(xLabel, yLabel)#"
    );
})
```

### Use Case 5: Temperature Heatmap

Display temperature with forecast:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>{xLabel}</b><br/>" +
        "Temperature: {value}°C<br/>" +
        "Humidity: 65%<br/>" +
        "Condition: Sunny"
    );
    tooltip.Fill("#fffacd");
    tooltip.TextStyle(style => { style.Color("#000000"); });
})
```

### Use Case 6: Inventory Status

Show stock information:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Visible(true);
    tooltip.Format(
        "<b>{xLabel}</b><br/>" +
        "Warehouse: {yLabel}<br/>" +
        "Stock: {value} units<br/>" +
        "Status: #={value < 50 ? '⚠️ Low' : '✓ Adequate'}#"
    );
})
```

## Complete Tooltip Example

```csharp
@Html.EJS().HeatMap("container")
    .DataSource((IEnumerable<object>)Model)
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Q1", "Q2", "Q3" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
        cellSettings.Format("0");
    })
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true);
        tooltip.Format(
            "<b style='font-size:14px;'>{xLabel} - {yLabel}</b><br/>" +
            "Value: <b style='color:#0078d4;'>{value}</b><br/>" +
            "Percentage: {percentage:.1f}%"
        );
        tooltip.Fill("#ffffff");
        tooltip.Opacity(0.9);
        tooltip.TextStyle(style =>
        {
            style.FontSize("12px");
            style.Color("#333333");
        });
        tooltip.Border(border =>
        {
            border.Color("#0078d4");
            border.Width(2);
        });
    })
    .Render()
```

## Best Practices

1. **Clarity**: Format tooltip content for easy scanning
2. **Relevance**: Include only needed information
3. **Consistency**: Use consistent formatting across tooltips
4. **Styling**: Match tooltip style to overall design
5. **Performance**: Avoid heavy computations in templates
6. **Accessibility**: Ensure readable contrast
7. **Responsiveness**: Test on different screen sizes

Tooltips enhance HeatMap interactivity by providing on-demand information access without overwhelming the display.
