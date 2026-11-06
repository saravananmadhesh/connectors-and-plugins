# Interactive Features

## Table of Contents
- [Data Labels](#data-labels)
- [Legend Configuration](#legend-configuration)
- [Tooltips](#tooltips)
- [Selection and Highlighting](#selection-and-highlighting)
- [Multiple Panes](#multiple-panes)

## Data Labels

Data labels display the value of each data point on the chart, improving readability and eliminating the need to reference the axis.

### Basic Data Labels

Enable data labels on series:

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .DataLabel(label => 
                label.Visible(true)
            )
            .Add();
    })
    .Render()
```

### Data Label Customization

```csharp
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outer);
    label.Format("${point.y}K");
    label.FontFamily("Arial");
    label.FontSize("12px");
})
```

### Data Label Positioning

Position labels around data points:

```csharp
// Top position
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
})

// Bottom position
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Bottom);
})

// Inside position
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Middle);
})

// Outer position
.DataLabel(label =>
{
    label.Visible(true);
    label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Outer);
})
```

### Data Label Formatting

Format displayed values:

```csharp
// Currency format
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("${point.y}");
})

// Percentage format
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("{point.y}%");
})

// Custom text
.DataLabel(label =>
{
    label.Visible(true);
    label.Format("<b>{point.x}</b>: {point.y}");
})
```

### Data Label Examples

**Example 1: Sales Chart with Currency**

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Region")
        .YName("Revenue")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Position(Syncfusion.EJ2.Charts.ChartDataLabelPosition.Top);
            label.Format("${point.y}K");
        })
        .Add();
})
```

**Example 2: Percentage Distribution**

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Percentage")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .DataLabel(label =>
        {
            label.Visible(true);
            label.Format("{point.y}%");
        })
        .Add();
})
```

## Legend Configuration

The legend displays series names and helps users identify different data series on the chart.

### Basic Legend

Enable the legend:

```csharp
@Html.EJS().Chart("container")
    .Legend(legend =>
    {
        legend.Visible(true);
    })
    .Render()
```

### Legend Positioning

Control where the legend appears:

```csharp
// Top position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Top);
})

// Bottom position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
})

// Left position
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Left);
})

// Right position (default)
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
})
```

### Legend Customization

```csharp
.Legend(legend =>
{
    legend.Visible(true);
    legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
    legend.Width("100%");
    legend.Padding(20);
    legend.TextWidth(100);
    legend.MaxItemsInRow(3);
})
```

### Legend with Series Names

Name your series for meaningful legend labels:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales2023")
        .Name("2023 Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Add();
    
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales2024")
        .Name("2024 Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Add();
})
.Legend(legend =>
{
    legend.Visible(true);
})
```

## Tooltips

Tooltips display data point information when users hover over chart elements.

### Basic Tooltip

Enable tooltips:

```csharp
@Html.EJS().Chart("container")
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
    })
    .Render()
```

### Tooltip Configuration

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Shared(false);
    tooltip.Format("<b>{series.name}</b><br/>Month: {point.x}<br/>Value: {point.y}");
    tooltip.TextStyle(text => 
        text.FontFamily("Arial").FontSize("12px")
    );
})
```

### Shared vs Individual Tooltips

```csharp
// Shared: Show all series for the x-value
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Shared(true);
})

// Individual: Show only hovered series
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Shared(false);
})
```

### Tooltip Formatting

Format tooltip content:

```csharp
// Simple value display
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b>: {point.y}");
})

// Multi-line with formatting
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{series.name}</b><br/>Date: {point.x}<br/>Amount: ${point.y}K");
})

// Inline Tooltip Formatting
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{series.name}</b><br/>Date: {point.x:MMM yyy}<br/>Amount: {point.y:c2}K");
})

// HTML content
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Template("<div><b>{point.x}</b><br/>Revenue: ${point.y}</div>");
})
```

### Tooltip Examples

**Example 1: Sales Data**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{series.name}</b><br/>{point.x}: ${point.y}K");
})
```

**Example 2: Time Series**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Shared(true);
    tooltip.Format("<b>{point.x | date}</b><br/>{series.name}: {point.y}");
})
```

## Selection and Highlighting

Enable users to interact with data points through selection and hover effects.

### Point Selection

Allow users to select individual data points:

```csharp
@Html.EJS().Chart("container")
    .SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)
    .Render()
```

### Selection Modes

```csharp
// Select single point
.SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)

// Select entire series
.SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Series)

// Select cluster (all series at x-value)
.SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Cluster)

// Disable selection
.SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.None)
```

### Series Point Selection Style

Configure appearance of selected points:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .SelectionStyle(style =>
        {
            style.Color("red");
            style.Border(border => 
                border.Width(2).Color("darkred")
            );
        })
        .Add();
})
```

### Hover Effects

Configure how points appear on hover:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .Add();
})
```

## Multiple Panes

Display multiple chart series in separate vertical sections (panes).

### Creating Multiple Panes

Define panes for different data:

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        // Series in first pane
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .YAxisName("YAxis1")
            .Add();
        
        // Series in second pane
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Profit")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
            .YAxisName("YAxis2")
            .Add();
    })
    .PrimaryXAxis(axis =>
    {
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    })
    .PrimaryYAxis(axis =>
    {
        axis.Name("YAxis1");
        axis.Title("Revenue ($)");
        axis.RowIndex(0);
        axis.PlotOffset(0);
    })
    .Axes(axis =>
    {
        axis.Name("YAxis2")
            .RowIndex(1)
            .Title("Profit (%)")
            .Add();
    })
    .Rows(row =>
    {
        row.Height("50%").Add();
        row.Height("50%").Add();
    })
    .Render()
```

### Pane Configuration

```csharp
.Rows(row =>
{
    row.Height("60%").Add();    // First pane: 60%
    row.Height("40%").Add();    // Second pane: 40%
})
```

### Multiple Panes Example

```csharp
// Compare different metrics in separate panes
.Series(series =>
{
    // Sales pane
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Sales")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
        .YAxisName("SalesAxis")
        .Add();
    
    // Customer count pane
    series.DataSource((IEnumerable<object>)Model)
        .XName("Month")
        .YName("Customers")
        .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
        .YAxisName("CustomersAxis")
        .Add();
})
.PrimaryXAxis(axis =>
{
    axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
})
.PrimaryYAxis(axis =>
{
    axis.Name("SalesAxis");
    axis.Title("Sales ($)");
    axis.RowIndex(0);
})
.Axes(axis =>
{
    axis.Name("CustomersAxis")
        .Title("Customer Count")
        .RowIndex(1)
        .Add();
})
.Rows(row =>
{
    row.Height("50%").Add();
    row.Height("50%").Add();
})
```

## Interactive Features Best Practices

1. **Data Labels**: Enable when values are critical for understanding
2. **Legend**: Use for multi-series charts to identify series
3. **Tooltips**: Always enable for detailed data exploration
4. **Selection**: Use for interactive drill-downs or filtering
5. **Multiple Panes**: Use to compare data with different scales

Combining these features creates a comprehensive interactive experience for users exploring your chart data.
