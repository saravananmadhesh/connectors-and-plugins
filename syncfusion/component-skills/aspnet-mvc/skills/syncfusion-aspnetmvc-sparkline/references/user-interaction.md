# User Interaction Features: Tooltips and Track Lines

## Table of Contents
- [Overview](#overview)
- [Tooltip Configuration](#tooltip-configuration)
  - [Basic Tooltip Implementation](#basic-tooltip-implementation)
  - [Tooltip Visibility Behavior](#tooltip-visibility-behavior)
- [Tooltip Customization](#tooltip-customization)
  - [Default Tooltip Format](#default-tooltip-format)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Format Placeholders](#format-placeholders)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Tooltip Fill Color](#tooltip-fill-color)
  - [Tooltip Text Styling](#tooltip-text-styling)
  - [Tooltip Border](#tooltip-border)
- [Track Line Feature](#track-line-feature)
  - [Basic Track Line](#basic-track-line)
  - [Track Line Styling](#track-line-styling)
  - [Track Line Properties](#track-line-properties)
  - [Track Line Behavior](#track-line-behavior)
- [Tooltip Templates](#tooltip-templates)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Template Placeholders](#template-placeholders)
  - [Advanced Template with Styling](#advanced-template-with-styling)
- [Complete Interaction Examples](#complete-interaction-examples)
  - [Example 1: Sales Dashboard Tooltip](#example-1-sales-dashboard-tooltip)
  - [Example 2: Stock Price with Track Line](#example-2-stock-price-with-track-line)
  - [Example 3: Performance Metrics](#example-3-performance-metrics)
  - [Example 4: Minimal Tooltip](#example-4-minimal-tooltip)
- [Advanced Scenarios](#advanced-scenarios)
  - [Scenario 1: Interactive Data Exploration](#scenario-1-interactive-data-exploration)
  - [Scenario 2: Report-Ready Tooltip](#scenario-2-report-ready-tooltip)
  - [Scenario 3: Real-time Monitoring](#scenario-3-real-time-monitoring)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

User interaction features in sparklines allow users to explore data without enlarging the visualization. Two primary interaction mechanisms are available:

- **Tooltips**: Display values when hovering over data points
- **Track Lines**: Show a vertical line tracking the cursor position

These features transform sparklines from static indicators into interactive data exploration tools.

## Tooltip Configuration

### Basic Tooltip Implementation

Enable tooltips to show values on hover:

```cshtml
@Html.EJS().Sparkline("tooltipChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Tooltip Visibility Behavior

- Tooltips appear when hovering over the sparkline
- Default format shows the Y-value
- Tooltip disappears when moving the mouse away
- Works on all sparkline types

## Tooltip Customization

### Default Tooltip Format

By default, tooltips display the Y-value:

```cshtml
@Html.EJS().Sparkline("defaultTooltipChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .TooltipSettings(ts => ts
        .Visible(true)
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Custom Tooltip Format

Display custom information using format strings:

```cshtml
@Html.EJS().Sparkline("formattedTooltipChart")
    .XName("Date")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("Date: ${xval}, Revenue: $${yval}K")
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Format Placeholders

| Placeholder | Represents | Example |
|-------------|------------|---------|
| **${xval}** | X-axis value | "Jan", "2023", "Day 1" |
| **${yval}** | Y-axis value | "5000", "100.5", "150" |

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `Format` property by adding DateTime or number format specifiers to supported tooltip placeholders. This allows you to control how the X and Y values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the placeholder name, followed by the required format.

```cshtml
@Html.EJS().Sparkline("inlineFormattedTooltipChart")
    .XName("Date")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(tooltip => tooltip
        .Visible(true)
        .Format("Date: ${xval:MMM yyyy}, Revenue: ${yval:n2}")
    )
    .Height("100")
    .Width("300")
    .DataSource(Model)
    .Render()
```

In the above example, `${xval:MMM yyyy}` displays the X-value in month-year format, and `${yval:n2}` displays the Y-value with two decimal places.

Inline formatting can be applied to the following tooltip placeholders:

- `${xval}` or `${xval:MMM yyyy}`: Specifies the X-value of the Sparkline data point.
- `${yval}` or `${yval:n2}`: Specifies the numeric Y-value of the Sparkline data point.

> **Important:** Formatting is applied only when the resolved value supports the specified format. DateTime formatting applies to DateTime values, while number formatting applies to numeric values.

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

### Tooltip Fill Color

Customize tooltip background color:

```cshtml
@Html.EJS().Sparkline("coloredTooltipChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Fill("rgb(255, 241, 118)")  // Light yellow background
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Tooltip Text Styling

Customize font appearance:

```cshtml
@Html.EJS().Sparkline("styledTooltipChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Fill("rgba(0, 0, 0, 0.8)")
        .TextStyle(st => st
            .Color("white")
            .Size("12px")
            .FontFamily("Arial")
            .FontStyle("italic")
            .FontWeight("bold")
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Tooltip Border

Add borders to tooltips:

```cshtml
@Html.EJS().Sparkline("borderedTooltipChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Fill("white")
        .Border(br => br
            .Color("gray")
            .Width(1)
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Track Line Feature

### Basic Track Line

Show a vertical line that tracks cursor position:

```cshtml
@Html.EJS().Sparkline("trackLineChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .TrackLineSettings(tls => tls
            .Visible(true)
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Track Line Styling

Customize the track line appearance:

```cshtml
@Html.EJS().Sparkline("styledTrackLineChart")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .TooltipSettings(ts => ts
        .Visible(true)
        .TrackLineSettings(tls => tls
            .Visible(true)
            .Color("red")
            .Width(2)
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Track Line Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **Visible** | bool | Show/hide the track line | `true`, `false` |
| **Color** | string | Line color | `"red"`, `"#FF0000"` |
| **Width** | double | Line thickness in pixels | `1`, `2`, `3` |

### Track Line Behavior

- Appears when hovering over the sparkline
- Follows cursor horizontally as it moves
- Automatically adjusts color based on theme
- Useful for identifying precise data point positions

## Tooltip Templates

### Custom Tooltip Template

Create completely custom tooltip content:

```html
<!-- Sparkline in the view -->
<div id="tooltipTemplate" style="display:none;">
    <div class="sparktooltip">
        <table>
            <tr>
                <td>Date:</td>
                <td>${x}</td>
            </tr>
            <tr>
                <td>Value:</td>
                <td>$${y}K</td>
            </tr>
        </table>
    </div>
</div>

@Html.EJS().Sparkline("templateChart")
    .XName("Date")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Template("tooltipTemplate")
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Template Placeholders

In custom templates, use these placeholders:

| Placeholder | Represents |
|-------------|------------|
| **${x}** | X-axis value |
| **${y}** | Y-axis value |

### Advanced Template with Styling

```html
<div id="advancedTemplate" style="display:none;">
    <div class="custom-tooltip" style="padding:10px; background-color:#f0f0f0; border-radius:4px;">
        <div style="font-weight:bold;">Performance Report</div>
        <div>Period: ${x}</div>
        <div style="color:green; font-weight:bold;">Value: ${y}%</div>
        <div style="font-size:0.8em; color:#666;">Click for details</div>
    </div>
</div>
```

## Complete Interaction Examples

### Example 1: Sales Dashboard Tooltip

```cshtml
@Html.EJS().Sparkline("salesDashboard")
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: $${yval}K")
        .Fill("rgba(0, 0, 0, 0.9)")
        .TextStyle(st => st
            .Color("white")
            .Size("11px")
            .FontWeight("bold")
        )
    )
    .Height("100")
    .Width("80")
    .DataSource(Model)
    .Render()
```

### Example 2: Stock Price with Track Line

```cshtml
@Html.EJS().Sparkline("stockPriceChart")
    .XName("Date")
    .YName("Price")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}: $${yval}")
        .Fill("white")
        .Border(br => br
            .Color("steelblue")
            .Width(2)
        )
        .TrackLineSettings(tls => tls
            .Visible(true)
            .Color("steelblue")
            .Width(2)
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Example 3: Performance Metrics

```cshtml
@Html.EJS().Sparkline("performanceMetrics")
    .XName("Week")
    .YName("Score")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("Week ${xval}: ${yval}%")
        .Fill("lightyellow")
        .Border(br => br
            .Color("orange")
            .Width(1)
        )
        .TextStyle(st => st
            .Color("darkorange")
            .Size("10px")
        )
    )
    .Height("80")
    .Width("60")
    .DataSource(Model)
    .Render()
```

### Example 4: Minimal Tooltip

```cshtml
@Html.EJS().Sparkline("minimalTooltip")
    .XName("xval")
    .YName("yval")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Fill("white")
        .TextStyle(st => st
            .Color("black")
            .Size("9px")
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Advanced Scenarios

### Scenario 1: Interactive Data Exploration

Combine tooltip and track line for detailed exploration:

```cshtml
@Html.EJS().Sparkline("exploratoryChart")
    .XName("Hour")
    .YName("TrafficCount")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("${xval}:00 - ${yval} visitors")
        .Fill("rgba(33, 150, 243, 0.9)")
        .TextStyle(st => st
            .Color("white")
            .Size("11px")
        )
        .TrackLineSettings(tls => tls
            .Visible(true)
            .Color("rgba(33, 150, 243, 0.5)")
            .Width(2)
        )
    )
    .Height("100")
    .Width("80")
    .DataSource(Model)
    .Render()
```

### Scenario 2: Report-Ready Tooltip

Professional format for reports:

```cshtml
@Html.EJS().Sparkline("reportChart")
    .XName("Quarter")
    .YName("Profit")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("Q${xval}: $${yval}M profit")
        .Fill("white")
        .Border(br => br
            .Color("#333")
            .Width(1)
        )
        .TextStyle(st => st
            .Color("#333")
            .Size("10px")
            .FontWeight("bold")
        )
    )
    .Height("120")
    .Width("100")
    .DataSource(Model)
    .Render()
```

### Scenario 3: Real-time Monitoring

Tooltip with track line for monitoring dashboards:

```cshtml
@Html.EJS().Sparkline("monitoringChart")
    .XName("Timestamp")
    .YName("CPUUsage")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .TooltipSettings(ts => ts
        .Visible(true)
        .Format("Time: ${xval}%\nCPU: ${yval}%")
        .Fill("rgba(0, 0, 0, 0.85)")
        .TextStyle(st => st
            .Color("white")
            .Size("10px")
            .FontFamily("monospace")
        )
        .TrackLineSettings(tls => tls
            .Visible(true)
            .Color("yellow")
            .Width(2)
        )
    )
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

## Best Practices

1. **Always Inject Module**: Don't forget to register SparklineTooltip
2. **Meaningful Content**: Use tooltips to provide context, not clutter
3. **Consistent Formatting**: Use same format across related sparklines
4. **Include Units**: Show currency, percentage, or other units in tooltip
5. **Test Readability**: Ensure tooltip text is legible at display resolution
6. **Responsive Design**: Tooltips should work on touch devices (tap/long-press)
7. **Performance**: Don't update data too frequently while hovering
8. **Accessibility**: Provide keyboard shortcuts or alternatives
9. **Color Contrast**: Use sufficient contrast for text readability
10. **Documentation**: Help users understand what tooltip shows

## Troubleshooting

**Issue**: Tooltips not appearing
- **Solution**: Ensure SparklineTooltip module is injected in application startup

**Issue**: Track line not visible
- **Solution**: Make sure TrackLineSettings.Visible is set to true AND TooltipSettings.Visible is true

**Issue**: Custom template not rendering
- **Solution**: Verify the template element ID matches the Template property value

**Issue**: Tooltip text overlapping with sparkline
- **Solution**: Adjust tooltip positioning or use a different format string with fewer characters
