# User Interaction & Tooltips

## Table of Contents
- [Tooltip Overview](#tooltip-overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Customization](#tooltip-customization)
- [Tooltip Format](#tooltip-format)
- [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Templates](#tooltip-templates)
- [Track Line Feature](#track-line-feature)
- [Track Line Customization](#track-line-customization)
- [Combined Tooltip and Track Line](#combined-tooltip-and-track-line)

## Tooltip Overview

Tooltips display detailed information about data points when users hover their mouse over the sparkline. Tooltips are essential for providing context without cluttering the compact display.

**Tooltip uses:**
- Show exact data values on hover
- Display formatted information (currency, percentages)
- Explain data point significance
- Provide additional context about specific points

**Requirements:**
- Tooltips require the SparklineTooltip module
- Module is automatically injected when using tooltipSettings

## Enabling Tooltips

Add basic tooltips to any sparkline using the `tooltipSettings` element.

**Example: Simple tooltip:**

```cshtml
<ejs-sparkline id="basicTooltip" 
    type="Line"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparkline-tooltipsettings visible="true"></e-sparkline-tooltipsettings>
</ejs-sparkline>
```

**Result:** On mouse hover, a default tooltip appears showing the Y-value.

**Example: Tooltip with format:**

```cshtml
<ejs-sparkline id="formattedTooltip" 
    type="Column"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparkline-tooltipsettings 
        visible="true" 
        format="${xval}: $${yval}">
    </e-sparkline-tooltipsettings>
</ejs-sparkline>
```

**Result:** Tooltip displays "Jan: $25000" format.

## Tooltip Customization

Customize tooltip appearance with styling properties.

**Tooltip properties:**
- `fill` - Background color
- `border` - Border styling (color, width)
- `textStyle` - Font properties (color, size, family)
- `opacity` - Transparency (0-1)

**Example: Custom styled tooltip:**

```cshtml
<ejs-sparkline id="styledTooltip" 
    type="Area"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparkline-tooltipsettings 
        visible="true" 
        format="${xval}: $${yval}">
        <e-sparklinetooltipsettings-border color="#333333" width="1"></e-sparklinetooltipsettings-border>
        <e-sparklinetooltipsettings-textstyle color="#ffffff" size="12px" family="Arial"></e-sparklinetooltipsettings-textstyle>
    </e-sparkline-tooltipsettings>
</ejs-sparkline>
```

**Example: Dark theme tooltip:**

```cshtml
<e-sparkline-tooltipsettings 
    visible="true" 
    format="Value: ${yval}">
    <e-sparklinetooltipsettings-border color="#1a1a1a" width="2"></e-sparklinetooltipsettings-border>
    <e-sparklinetooltipsettings-textstyle color="#ffffff" size="13px"></e-sparklinetooltipsettings-textstyle>
</e-sparkline-tooltipsettings>
```

**Result:** Dark background with white text and bold border.

## Tooltip Format

Format tokens control what data is displayed in the tooltip. Multiple tokens can be combined.

**Available tokens:**
- `${xval}` - X-axis label/value
- `${yval}` - Y-axis numeric value

**Format examples:**

```cshtml
<!-- Show only value -->
<e-sparkline-tooltipsettings format="${yval}"></e-sparkline-tooltipsettings>

<!-- Show month and revenue -->
<e-sparkline-tooltipsettings format="${xval}: ${yval}"></e-sparkline-tooltipsettings>

<!-- Show with custom text and currency -->
<e-sparkline-tooltipsettings format="Revenue in ${xval}: $$${yval}"></e-sparkline-tooltipsettings>

<!-- Show with percentage (example for calculated data) -->
<e-sparkline-tooltipsettings format="${xval} - ${yval}%"></e-sparkline-tooltipsettings>

<!-- Show with units -->
<e-sparkline-tooltipsettings format="${xval}: ${yval} units"></e-sparkline-tooltipsettings>
```

**Common format patterns:**

```cshtml
<!-- Financial data -->
<e-sparkline-tooltipsettings format="${xval}: $$${yval}K"></e-sparkline-tooltipsettings>

<!-- Percentage data -->
<e-sparkline-tooltipsettings format="${xval}: ${yval}%"></e-sparkline-tooltipsettings>

<!-- Time series -->
<e-sparkline-tooltipsettings format="Date: ${xval}, Value: ${yval}"></e-sparkline-tooltipsettings>

<!-- Category with value -->
<e-sparkline-tooltipsettings format="${xval} = ${yval} items"></e-sparkline-tooltipsettings>
```

## Inline Tooltip Formatting

Tooltip values can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how the X and Y values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
<ejs-sparkline
    id="inlineFormattedTooltip"
    type="Line"
    dataSource="ViewBag.SalesData"
    xName="Date"
    yName="Revenue"
    valueType="@Syncfusion.EJ2.Charts.SparklineValueType.DateTime"
    height="80"
    width="300">

    <e-sparkline-tooltipsettings
        visible="true"
        format="${xval:MMM yyyy}: ${yval:n2}">
    </e-sparkline-tooltipsettings>
</ejs-sparkline>
```

In the above example, `${xval:MMM yyyy}` displays the X-value in month-year format, and `${yval:n2}` displays the Y-value with two decimal places.

Inline formatting can be applied to the following tooltip tokens:

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

## Tooltip Templates

Create custom HTML templates for advanced tooltip displays.

**Example: Simple HTML template:**

```cshtml
<ejs-sparkline id="templateTooltip" 
    type="Column"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparkline-tooltipsettings visible="true" template="<div class="sparktooltip">
                <span class="sparktooltip-month">${xval}:</span>
                <span class="sparktooltip-value">$$${yval}K</span>
            </div>">
    </e-sparkline-tooltipsettings>
</ejs-sparkline>

<style>
    .sparktooltip {
        padding: 8px;
        display: flex;
        gap: 8px;
        background: #ffffff;
        border: 1px solid #cccccc;
        border-radius: 4px;
    }
    
    .sparktooltip-month {
        font-weight: bold;
        color: #333333;
    }
    
    .sparktooltip-value {
        color: #28a745;
        font-weight: bold;
    }
</style>
```

**Example: Template with image (if data contains URLs):**

```cshtml
<e-template>
    <div class="sparktooltip-custom">
        <div><strong>${xval}</strong></div>
        <div>Sales: $$${yval}</div>
        <div class="sparktooltip-indicator"></div>
    </div>
</e-template>

<style>
    .sparktooltip-custom {
        padding: 10px;
        background: #f8f9fa;
        border-left: 4px solid #007bff;
    }
    
    .sparktooltip-indicator {
        margin-top: 5px;
        height: 4px;
        background: #007bff;
        border-radius: 2px;
    }
</style>
```

**CSS class available for template styling:**
- `.sparktooltip` - Default wrapper class for tooltip content

## Track Line Feature

Track line displays a vertical line following the mouse position, highlighting the closest data point. Enables precise data point identification.

**Requirements:**
- Requires SparklineTooltip module (same as tooltips)
- Usually combined with tooltips for full context

**Example: Enable track line:**

```cshtml
<ejs-sparkline id="trackLineSparkline" 
    type="Line"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
</ejs-sparkline>
```

**Result:** As mouse moves across sparkline, a vertical line tracks the position and highlights the nearest data point.

## Track Line Customization

Customize track line appearance.

**Example: Styled track line:**

```cshtml
<ejs-sparkline id="customTrackLine" 
    type="Area"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparklinetooltipsettings-tracklinesettings visible="true" color="#033e96">
    </e-sparklinetooltipsettings-tracklinesettings>
</ejs-sparkline>
```

**Track line properties:**
- `visible` - Show/hide track line (true/false)
- Color changes based on theme by default

**Color guidance:**
- Material theme: Dark color automatically applied
- Highcontrast theme: Bright color automatically applied
- Can be overridden for custom appearances

## Combined Tooltip and Track Line

Combine tooltips and track line for comprehensive user interaction.

**Example: Full interaction experience:**

```cshtml
<ejs-sparkline id="fullInteraction" 
    type="Column"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="100"
    theme="Material">
    
    <!-- Track line follows mouse -->
    <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
    
    <!-- Tooltip shows data values -->
    <e-sparkline-tooltipsettings 
        visible="true" 
        format="${xval}: $$${yval}K">
        <e-sparklinetooltipsettings-border color="#333333" width="1"></e-sparklinetooltipsettings-border>
        <e-sparklinetooltipsettings-textstyle color="#000000" size="12px"></e-sparklinetooltipsettings-textstyle>
    </e-sparkline-tooltipsettings>
    
    <!-- Markers highlight points -->
    <e-sparkline-markersettings visible="High,Low">
        <e-sparklinemarkersettings-border color="#bb2d3b" width="2"></e-sparklinemarkersettings-border>
    </e-sparkline-markersettings>
    
</ejs-sparkline>
```

**User experience with combined features:**
1. Mouse hovers over sparkline
2. Track line appears, following cursor
3. Tooltip displays formatted data values
4. High/low points are marked with colored indicators
5. Clear visual feedback for all interactions

## Dashboard Integration Example

Sparklines in a dashboard row with consistent interaction:

```cshtml
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-header">Sales</div>
            <div class="card-body">
                <ejs-sparkline id="salesSparkline" 
                    type="Line"
                    dataSource="ViewBag.Sales"
                    xName="Month" yName="Amount" height="80">
                    <e-sparkline-tooltipsettings visible="true" format="${xval}: $$${yval}"></e-sparkline-tooltipsettings>
                    <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
                </ejs-sparkline>
            </div>
        </div>
    </div>
    
    <div class="col-md-3">
        <div class="card">
            <div class="card-header">Traffic</div>
            <div class="card-body">
                <ejs-sparkline id="trafficSparkline" 
                    type="Area"
                    dataSource="ViewBag.Traffic"
                    xName="Month" yName="Visits" height="80">
                    <e-sparkline-tooltipsettings visible="true" format="${xval}: ${yval} visits"></e-sparkline-tooltipsettings>
                    <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
                </ejs-sparkline>
            </div>
        </div>
    </div>
</div>
```

## Interaction Best Practices

1. **Always combine track line with tooltips** - Users expect visual feedback + data
2. **Use consistent formats** - Currency symbols, units across all sparklines
3. **Color-code tooltips** - Match tooltip colors to sparkline theme
4. **Provide context** - Include labels and units in format strings
5. **Test with touch** - Track line and tooltips work on touch devices
6. **Mobile responsiveness** - Tooltips should display without overflow

## Troubleshooting

**Tooltips not appearing:**
- Verify `visible="true"` is set
- Check browser console for errors
- Ensure data is bound to sparkline

**Track line not visible:**
- Confirm `visible="true"` in tracklineSettings
- Check if track line color matches background
- Try changing theme or track line color

**Format not working:**
- Verify token syntax: `${xval}` not `{xval}`
- Check that xName/yName properties match data object property names
- Test format in browser console
