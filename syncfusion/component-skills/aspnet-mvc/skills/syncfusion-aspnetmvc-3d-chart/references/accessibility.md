# Accessibility Features

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [ARIA Attributes](#aria-attributes)
- [Color and Contrast](#color-and-contrast)
- [Testing and Validation](#testing-and-validation)

## Accessibility Overview

Creating accessible charts ensures all users, including those with disabilities, can access and understand your data visualizations. The 3D Chart control includes built-in accessibility features that align with WCAG (Web Content Accessibility Guidelines).

### Key Accessibility Principles

1. **Perceivable**: Information is available to all users
2. **Operable**: Charts work with keyboard and assistive devices
3. **Understandable**: Clear labels and text alternatives
4. **Robust**: Compatible with assistive technologies

## WCAG Compliance

The 3D Chart follows WCAG 2.1 guidelines at level AA.

### WCAG Checklist

- ✓ Level A (minimum): Basic accessibility features
- ✓ Level AA (recommended): Enhanced accessibility
- ✓ Level AAA (advanced): Maximum accessibility support

### Implementing WCAG Compliant Charts

```csharp
@Html.EJS().Chart("container")
    .Title("Quarterly Sales Report")
    .Description("Bar chart showing quarterly sales data for 2024")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Quarter")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .DataLabel(label =>
            {
                label.Visible(true);
                label.Format("{point.y}");
            })
            .Add();
    })
    .PrimaryXAxis(axis =>
    {
        axis.Title("Quarter");
        axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
    })
    .PrimaryYAxis(axis =>
    {
        axis.Title("Sales ($)");
        axis.LabelFormat("${value}K");
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
        tooltip.Format("<b>{point.x}</b>: ${point.y}K");
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
    })
    .Render()
```

## Keyboard Navigation

Enable users to interact with charts using only the keyboard.

### Keyboard Support

```csharp
@Html.EJS().Chart("container")
    .AllowMultipleSelection(true)
    .SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point)
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .Render()
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Navigate between elements |
| **Enter** | Select data point |
| **Escape** | Deselect |
| **Arrow Keys** | Navigate between points |
| **Space** | Activate tooltips |

### HTML for Keyboard Access

```html
<div role="region" aria-label="Sales Chart">
    <h2>Sales Data Visualization</h2>
    
    <div id="container" tabindex="0" role="img" 
         aria-labelledby="chart-title"
         aria-describedby="chart-description">
        @Html.EJS().Chart("container")
            .Series(series =>
            {
                series.DataSource((IEnumerable<object>)Model)
                    .XName("Month")
                    .YName("Sales")
                    .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                    .Add();
            })
            .Render()
    </div>
    
    <p id="chart-description" hidden>
        Column chart showing monthly sales data for 2024
    </p>
</div>

<script type="text/javascript">
// Handle keyboard interaction
document.getElementById("container").addEventListener("keydown", function(e) {
    var chart = this.ej2_instances[0];
    
    if (e.key === "ArrowRight") {
        // Navigate to next data point
        e.preventDefault();
    } else if (e.key === "ArrowLeft") {
        // Navigate to previous data point
        e.preventDefault();
    } else if (e.key === "Enter") {
        // Select current point
        e.preventDefault();
    }
});
</script>
```

## Screen Reader Support

Make chart content available to screen readers.

### Screen Reader Configuration

```csharp
@Html.EJS().Chart("container")
    .Title("Monthly Revenue Trends")
    .Description("This chart shows revenue trends across 12 months, increasing from January to December")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Name("Revenue 2024")
            .Add();
    })
    .Render()
```

### HTML Structure for Screen Readers

```html
<div role="region" aria-live="polite" aria-label="Chart Data">
    <!-- Chart container -->
    <div id="container"></div>
    
    <!-- Data table alternative (screen readers will read this) -->
    <table id="chart-data-table" class="sr-only">
        <caption>Revenue data for 2024 (Alternative text representation)</caption>
        <thead>
            <tr>
                <th>Month</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>January</td><td>$50,000</td></tr>
            <tr><td>February</td><td>$55,000</td></tr>
            <tr><td>March</td><td>$60,000</td></tr>
        </tbody>
    </table>
</div>

<style>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>
```

## ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes for semantic meaning.

### ARIA Labels and Descriptions

```html
<div id="chart-wrapper">
    <h2 id="chart-title">Quarterly Performance Analysis</h2>
    
    <div id="container"
         role="img"
         aria-labelledby="chart-title"
         aria-describedby="chart-description"
         aria-label="Quarterly Performance Chart">
        
        @Html.EJS().Chart("container")
            .Series(series =>
            {
                series.DataSource((IEnumerable<object>)Model)
                    .XName("Quarter")
                    .YName("Performance")
                    .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                    .Add();
            })
            .Render()
    </div>
    
    <p id="chart-description">
        This chart displays quarterly performance metrics showing growth 
        from Q1 ($50K) through Q4 ($85K), with a steady increase each quarter.
    </p>
</div>
```

### ARIA Live Regions

Announce dynamic chart updates:

```html
<div aria-live="polite" aria-atomic="true" id="chart-update-status" role="status">
    <!-- Status messages appear here -->
</div>

<script type="text/javascript">
function updateChart(newData) {
    var chart = document.getElementById("container").ej2_instances[0];
    chart.series[0].dataSource = newData;
    chart.refresh();
    
    // Announce update to screen readers
    var statusDiv = document.getElementById("chart-update-status");
    statusDiv.textContent = "Chart updated with new data";
}
</script>
```

## Color and Contrast

Ensure charts are readable for users with color blindness or low vision.

### High Contrast Color Palette

```csharp
@Html.EJS().Chart("container")
    // Use colorblind-friendly palette
    .Palette(new string[] 
    { 
        "#0173B2",  // Blue (colorblind safe)
        "#DE8F05",  // Orange (colorblind safe)
        "#CC78BC",  // Purple (colorblind safe)
        "#CA9161",  // Brown (colorblind safe)
        "#949494",  // Gray (colorblind safe)
        "#ECE133"   // Yellow (colorblind safe)
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .Render()
```

### Contrast Ratio Compliance

```csharp
.TitleStyle(style =>
{
    style.Color("#000000");      // Dark text on light background
    style.FontSize("18px");       // Readable size
})
.PrimaryXAxis(axis =>
{
    axis.LabelStyle(style =>
    {
        style.Color("#333333");   // High contrast color
        style.FontSize("12px");
    });
})
```

### CSS for Enhanced Contrast

```css
/* High contrast mode */
@media (prefers-contrast: more) {
    #container {
        background-color: #ffffff;
        color: #000000;
    }
}

/* Reduced motion mode */
@media (prefers-reduced-motion: reduce) {
    .chart-animation {
        animation: none !important;
        transition: none !important;
    }
}
```

## Testing and Validation

### Accessibility Testing Checklist

- [ ] All chart elements are keyboard accessible
- [ ] Screen reader announces chart title and description
- [ ] Color palette is colorblind-friendly
- [ ] Text contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Data labels are visible and readable
- [ ] Tooltips provide alternative to visual data
- [ ] Legend clearly identifies series
- [ ] Focus indicators are visible
- [ ] Alternative data representation (table) is provided

### Automated Testing

```csharp
// Example automated accessibility test
[TestMethod]
public void ChartShouldHaveAriaLabel()
{
    var chart = GetChart();
    var ariaLabel = chart.GetAttribute("aria-label");
    Assert.IsNotNull(ariaLabel);
    Assert.IsTrue(ariaLabel.Length > 0);
}

[TestMethod]
public void ChartDataTableShouldExist()
{
    var table = GetElement("[id*='data-table']");
    Assert.IsNotNull(table);
}
```

### Manual Testing Tools

1. **NVDA** - Free screen reader for Windows
2. **JAWS** - Premium screen reader
3. **WebAIM Color Contrast Checker** - Verify contrast ratios
4. **Lighthouse** - Chrome DevTools accessibility audit
5. **axe DevTools** - Browser extension for accessibility checks

### Complete Accessible Chart Example

```csharp
@{
    ViewBag.Title = "Sales Chart";
}

<h1>Sales Dashboard</h1>

<div role="region" aria-label="Sales Chart Section">
    <h2 id="chart-title">Monthly Sales Performance</h2>
    
    <div id="chart-container"
         role="img"
         aria-labelledby="chart-title"
         aria-describedby="chart-data-description">
        
        @Html.EJS().Chart("container")
            .Title("Monthly Sales Performance")
            .Description("Column chart showing sales data by month")
            .Series(series =>
            {
                series.DataSource((IEnumerable<object>)Model)
                    .XName("Month")
                    .YName("Sales")
                    .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                    .Name("Sales 2024")
                    .DataLabel(label =>
                    {
                        label.Visible(true);
                        label.Format("${point.y}K");
                    })
                    .Add();
            })
            .PrimaryXAxis(axis =>
            {
                axis.Title("Month");
                axis.ValueType(Syncfusion.EJ2.Charts.ValueType.Category);
                axis.TitleStyle(style => style.FontSize("14px"));
            })
            .PrimaryYAxis(axis =>
            {
                axis.Title("Sales Amount");
                axis.LabelFormat("${value}K");
            })
            .Tooltip(tooltip =>
            {
                tooltip.Enable(true);
                tooltip.Format("<b>{point.x}</b>: ${point.y}K");
            })
            .Legend(legend =>
            {
                legend.Visible(true);
                legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
            })
            .Render()
    </div>
    
    <p id="chart-data-description">
        This chart displays sales performance from January to December 2024.
        Values range from $25K to $45K with peak performance in December.
    </p>
    
    <!-- Alternative data table for screen readers -->
    <table class="sr-only" aria-label="Sales data table">
        <caption>Sales Data - Alternative Representation</caption>
        <thead>
            <tr>
                <th>Month</th>
                <th>Sales Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach(var item in Model)
            {
                <tr>
                    <td>@item.Month</td>
                    <td>$@item.Sales K</td>
                </tr>
            }
        </tbody>
    </table>
</div>

<style>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>
```

Accessible charts benefit all users by making data clear, understandable, and available through multiple interaction methods.
