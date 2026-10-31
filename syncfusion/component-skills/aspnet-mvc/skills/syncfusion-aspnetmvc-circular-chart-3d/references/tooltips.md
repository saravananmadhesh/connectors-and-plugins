# Adding Tooltips and Interactivity

## Table of Contents
- [Tooltip Overview](#tooltip-overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Formatting](#tooltip-formatting)
- [Tooltip Customization](#tooltip-customization)
- [Interactive Features](#interactive-features)
- [Common Use Cases](#common-use-cases)

## Tooltip Overview

Tooltips display detailed information when users hover over pie or donut slices. They provide:

- Detailed value information on demand
- Space-efficient data display
- Enhanced user interactivity
- Non-intrusive value presentation
- Professional data exploration experience

## Enabling Tooltips

### Basic Tooltip

Enable default tooltip behavior:

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
    })
    .Render()
```

### Disable Tooltip

Disable tooltips for minimal interaction:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(false);
})
```

## Tooltip Formatting

Control what information displays in tooltips.

### Format Strings

Use placeholders to customize tooltip content:

```csharp
// Category only
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.x}");
})

// Value only
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.y}");
})

// Category and value
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.x}: {point.y}");
})

// With percentage
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.x}: {point.percentage}%");
})

// Combined information
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Value: {point.y}<br/>Share: {point.percentage:.##}%");
})
```

### Format Placeholders

| Placeholder | Value | Example |
|------------|-------|---------|
| `{point.x}` | Category name | "Brand A" |
| `{point.y}` | Data value | "25000" |
| `{point.percentage}` | Percentage share | "35.5" |
| `{series.name}` | Series name | "2024 Sales" |

### Inline Tooltip Formatting

Tooltip values can be formatted directly within the `Format` property by adding DateTime or number format specifiers to supported tooltip placeholders. This allows you to control how point and series values are displayed without using additional events.

Add a colon (`:`) after the placeholder name, followed by the required format specifier.

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format(
        "{series.name}<br/>" +
        "{point.x:MMM yyyy}: {point.y:n2}<br/>" +
        "Share: {point.percentage:n1}%<br/>" +
        "Opacity: {series.opacity}"
    );
})
```

In the above example, `point.x` is displayed in month-year format, `point.y` is displayed with two decimal places, and `point.percentage` is displayed with one decimal place. The `series.opacity` placeholder displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip placeholders:

- `{point.x}` or `{point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `{point.y}` or `{point.y:n2}`: Specifies the numeric y-value of the data point.
- `{point.percentage}` or `{point.percentage:n1}`: Specifies the percentage contribution of the point.
- `{series.opacity}` or `{series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific placeholders depends on the fields configured in the data source and the chart series type. The `{series.name}` and `{series.type}` placeholders return string values, so DateTime or number formatting is not applied to them.

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

### Tooltip Content Examples

**Simple Value Display:**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.y}");
})
// Hover shows: 25000
```

**Category with Value:**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.x}: {point.y}");
})
// Hover shows: Brand A: 25000
```

**Percentage Display:**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.percentage}%");
})
// Hover shows: 35%
```

**Multi-line Information:**

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>{point.y} units<br/>{point.percentage:.2f}%");
})
// Hover shows:
// Brand A (bold)
// 25000 units
// 35.50%
```

## Tooltip Customization

### Tooltip Styling

Customize appearance:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Fill("#ffffff");
    tooltip.Opacity(0.9);
    tooltip.TextStyle(style =>
    {
        style.FontFamily("Arial");
        style.FontSize("12px");
        style.Color("#333333");
    });
})
```

### Tooltip Border

Add border definition:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Border(border =>
    {
        border.Color("#0078d4");
        border.Width(1);
    });
})
```

### Tooltip Margin and Padding

Control spacing:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Margin(margin =>
    {
        margin.Left(10);
        margin.Right(10);
        margin.Top(10);
        margin.Bottom(10);
    });
})
```

### Complete Customization Example

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Value: {point.y}<br/>Share: {point.percentage:.##}%");
    tooltip.Fill("#f0f0f0");
    tooltip.Opacity(0.95);
    tooltip.TextStyle(style =>
    {
        style.FontFamily("Segoe UI");
        style.FontSize("12px");
        style.Color("#333333");
        style.FontWeight("500");
    });
    tooltip.Border(border =>
    {
        border.Color("#cccccc");
        border.Width(1);
    });
    tooltip.Margin(margin =>
    {
        margin.Left(5);
        margin.Right(5);
        margin.Top(5);
        margin.Bottom(5);
    });
})
```

## Interactive Features

### Slice Selection

Enable users to click and select slices:

```csharp
@Html.EJS().CircularChart3D("container")
    .SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Highlight on Hover

Automatically highlight hovered slices:

```csharp
.Series(series =>
{
    series.DataSource((IEnumerable<object>)Model)
        .XName("Category")
        .YName("Value")
        .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
        .SelectionStyle(style =>
        {
            style.Color("red");
            style.Border(border =>
            {
                border.Color("darkred");
                border.Width(2);
            });
        })
        .Add();
})
```

### Slice Animation

Add smooth animations on load:

```csharp
@Html.EJS().CircularChart3D("container")
    .EnableAnimation(true)
    .AnimationDuration(1000)  // 1 second animation
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

## Common Use Cases

### Use Case 1: Business Data with Currency

Display currency values with category labels:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Revenue: ${point.y}K<br/>Market Share: {point.percentage:.1f}%");
    tooltip.TextStyle(style =>
    {
        style.FontSize("13px");
        style.FontWeight("bold");
    });
})
```

### Use Case 2: Survey Results

Show response distribution with counts:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.x}<br/>Responses: {point.y}<br/>Percentage: {point.percentage}%");
})
```

### Use Case 3: Minimalist Display

Show only essential information:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("{point.percentage:.0f}%");
    tooltip.Fill("#333333");
    tooltip.TextStyle(style =>
    {
        style.Color("#ffffff");
    });
})
```

### Use Case 4: Budget Breakdown

Display department information:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Budget: ${point.y}M<br/>% of Total: {point.percentage:.2f}%");
})
```

### Use Case 5: Product Analysis

Show product metrics:

```csharp
.Tooltip(tooltip =>
{
    tooltip.Enable(true);
    tooltip.Format("<b>{point.x}</b><br/>Units Sold: {point.y:n0}<br/>Market Share: {point.percentage}%<br/>Series: {series.name}");
})
```

## Interactive Tooltip Example

Complete example with tooltips and interactivity:

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("600px")
    .Height("400px")
    .EnableAnimation(true)
    .SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .SelectionStyle(style =>
            {
                style.Fill("#ff6b6b");
                style.Border(border =>
                {
                    border.Color("#cc0000");
                    border.Width(2);
                });
            })
            .Add();
    })
    .Title("Sales Distribution")
    .Legend(legend => 
        legend.Visible(true)
    )
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
        tooltip.Format("<b>{point.x}</b><br/>Sales: ${point.y}K<br/>Share: {point.percentage:.1f}%");
        tooltip.Fill("#f5f5f5");
        tooltip.TextStyle(style =>
        {
            style.FontSize("12px");
            style.Color("#333333");
        });
        tooltip.Border(border =>
        {
            border.Color("#cccccc");
            border.Width(1);
        });
    })
    .Render()
```

## Best Practices for Tooltips

1. **Information**: Include relevant data without clutter
2. **Formatting**: Use clear, readable format strings
3. **Styling**: Match tooltip style to chart theme
4. **Performance**: Tooltips have minimal performance impact
5. **Content**: Keep tooltip content concise and scannable
6. **Positioning**: Tooltips automatically position to avoid edges
7. **Accessibility**: Ensure tooltip text is readable

## Troubleshooting Tooltips

**Tooltip not showing?**
- Verify `Enable(true)` is set
- Check for CSS conflicts hiding tooltips
- Ensure chart has data to display

**Content not displaying correctly?**
- Verify placeholder syntax matches available fields
- Test with simple format string first
- Check data values exist in model

**Styling not applied?**
- Verify CSS properties are correctly set
- Check for browser compatibility
- Clear browser cache if changes don't appear

Tooltips and interactivity create engaging, user-friendly charts that support data exploration and understanding.
