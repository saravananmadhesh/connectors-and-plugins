# Data Labels & Legends

## Table of Contents
- [Data Labels Basics](#data-labels-basics)
  - [Enable Data Labels](#enable-data-labels)
  - [Disable Data Labels](#disable-data-labels)
  - [Smart Label Placement](#smart-label-placement)
- [Data Label Positioning](#data-label-positioning)
  - [Position Options](#position-options)
  - [Column Chart Label Positions](#column-chart-label-positions)
  - [Bar Chart Label Positions](#bar-chart-label-positions)
  - [Label Margin](#label-margin)
- [Data Label Templates](#data-label-templates)
  - [Basic Template](#basic-template)
  - [Template Variables](#template-variables)
  - [Show Series Name and Value](#show-series-name-and-value)
  - [Formatted Value Template](#formatted-value-template)
  - [Complex HTML Template](#complex-html-template)
- [Data Label Formatting](#data-label-formatting)
  - [Currency Formatting](#currency-formatting)
  - [Decimal Formatting](#decimal-formatting)
  - [Percentage Format](#percentage-format)
  - [Number Abbreviation](#number-abbreviation)
  - [Styling Labels](#styling-labels)
- [Legend Positioning](#legend-positioning)
  - [Bottom Position (Default)](#bottom-position-default)
  - [Position Options](#position-options)
  - [Right Position Example](#right-position-example)
  - [Top Position Example](#top-position-example)
  - [Custom Position](#custom-position)
- [Legend Alignment](#legend-alignment)
  - [Alignment Options](#alignment-options)
  - [Near Alignment (Bottom)](#near-alignment-bottom)
  - [Center Alignment (Bottom)](#center-alignment-bottom)
  - [Far Alignment (Bottom)](#far-alignment-bottom)
- [Legend Customization](#legend-customization)
  - [Legend Background and Border](#legend-background-and-border)
  - [Legend Font and Color](#legend-font-and-color)
  - [Toggleable Legend](#toggleable-legend)
  - [Legend Dimensions](#legend-dimensions)
  - [Custom Legend Padding](#custom-legend-padding)
- [Legend Reverse](#legend-reverse)
  - [Basic Reverse](#basic-reverse)
  - [Use Case: Stack Order Matching](#use-case-stack-order-matching)
- [Complete Example: Styled Chart with Labels and Legend](#complete-example-styled-chart-with-labels-and-legend)

## Data Labels Basics

Data labels display the value of each data point directly on the chart, improving readability without requiring tooltips.

### Enable Data Labels

```cshtml
<ejs-chart3d id="chart" title="Monthly Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
            <!-- Enable data labels -->
            <e-chart3d-series-datalabel visible="true">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Result:** Each column shows its numeric value on top.

### Disable Data Labels

```cshtml
<e-chart3d-series-datalabel visible="false">
</e-chart3d-series-datalabel>
```

### Smart Label Placement

By default, labels are positioned to avoid overlapping. Overlapping labels are automatically adjusted:

```cshtml
<e-chart3d-series-datalabel visible="true" enableRotation="false">
</e-chart3d-series-datalabel>
```

Set `enableRotation="true"` to allow text rotation for better fit.

## Data Label Positioning

Control where labels appear relative to data points.

### Position Options

```cshtml
<e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top">
</e-chart3d-series-datalabel>
```

| Position | Location | Best For |
|----------|----------|----------|
| Top | Above the bar/column | Column charts |
| Bottom | Below the bar/column | Bar/column layouts where bottom placement improves readability |
| Middle | Center of the bar/column | When space is limited |

### Column Chart Label Positions

```cshtml
<ejs-chart3d id="chart" title="Sales Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <!-- Labels above columns -->
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          name="Sales">
            <e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Middle">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
        
        <!-- Labels below columns -->
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Expenses" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          name="Expenses">
            <e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Bottom">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Bar Chart Label Positions

For bar charts, position typically works horizontally:

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="ProductName" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar"
                  name="Sales">
    <e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top">
    </e-chart3d-series-datalabel>
</e-chart3d-series>
```

### Label Margin

Use data-label margin settings to add spacing around the label.

```cshtml
<e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top">
    <e-chart3ddatalabelsettings-margin left="5" right="5" top="5" bottom="5">
    </e-chart3ddatalabelsettings-margin>
</e-chart3d-series-datalabel>
```

The margin values are in pixels.

## Data Label Templates

Templates allow custom formatting of label content, combining multiple data fields.

### Basic Template

```cshtml
<e-chart3d-series-datalabel visible="true" 
                     template="<div>${point.x}: ${point.y}</div>">
</e-chart3d-series-datalabel>
```

### Template Variables

| Variable | Content | Example |
|----------|---------|---------|
| ${point.x} | X-axis value | "January" |
| ${point.y} | Y-axis value | "35000" |
| ${series.name} | Series name | "Sales" |

### Show Series Name and Value

```cshtml
<e-chart3d-series-datalabel visible="true" 
                     template="${series.name}: ${point.y}">
</e-chart3d-series-datalabel>
```

Result: "Sales: 35000"

### Formatted Value Template

```cshtml
<e-chart3d-series-datalabel visible="true" 
                     template="${point.x}<br/>${point.y}k">
</e-chart3d-series-datalabel>
```

Result:
```
January
35k
```

### Complex HTML Template

```cshtml

<e-chart3d-series-datalabel visible="true"
    template='<div style="border: 1px solid black; padding: 3px;"><div>${point.x}</div><div>${point.y}</div></div>'>
</e-chart3d-series-datalabel>
```

## Data Label Formatting

Format numbers and text in labels for better readability.

### Currency Formatting

```cshtml
<e-chart3d-series-datalabel visible="true" format="c1">
</e-chart3d-series-datalabel>
```

Result: $35,000.0

### Decimal Formatting

```cshtml
<e-chart3d-series-datalabel visible="true" format="n2">
</e-chart3d-series-datalabel>
```

Result: 35,000.00

### Percentage Format

```cshtml
<e-chart3d-series-datalabel visible="true" format="p1">
</e-chart3d-series-datalabel>
```

Result depends on the input value. For example, `0.155` with `p1` displays as `15.5%`.

### Number Abbreviation

Use template to abbreviate large numbers:

```cshtml
<e-chart3d-series-datalabel visible="true" 
                     template="${point.y > 1000 ? (point.y/1000).toFixed(1) + 'K' : point.y}">
</e-chart3d-series-datalabel>
```

Result: 35K for 35000, 2.5K for 2500

### Styling Labels

```cshtml
<e-chart3d-series-datalabel visible="true" 
                     position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top">
    <e-font color="red" size="12px">
    </e-font>
</e-chart3d-series-datalabel>
```

| Property | Purpose | Example |
|----------|---------|---------|
| `font` | Font style | color="red" size="12px" |
| `border` | Option for customizing the border lines | width = 2 |

## Legend Positioning

The legend displays series information. Control its position on the chart.

### Bottom Position (Default)

```cshtml
<ejs-chart3d id="chart" title="Sales Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Expenses" 
                          name="Expenses"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Legend at bottom -->
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom">
    </e-chart3d-legendsettings>
</ejs-chart3d>
```

### Position Options

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Top">
</e-chart3d-legendsettings>
```

| Position | Location |
|----------|----------|
| Top | Above chart area |
| Bottom | Below chart area (default) |
| Left | Left side of chart |
| Right | Right side of chart |
| Custom | Specified coordinates |

### Right Position Example

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
</e-chart3d-legendsettings>
```

Displays legend vertically on the right side, useful for charts with horizontal space.

### Top Position Example

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Top">
</e-chart3d-legendsettings>
```

Displays legend horizontally at the top, good for many series.

### Custom Position

Specify exact X, Y coordinates:

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Custom">
    <e-chart3dlegendsettings-location x="100" y="50"></e-chart3dlegendsettings-location>
</e-chart3d-legendsettings>
```

Positions legend at (100, 50) from top-left corner (in pixels).

## Legend Alignment

Align the legend within its position area.

### Alignment Options

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" alignment="@Syncfusion.EJ2.Charts.Alignment.Center">
</e-chart3d-legendsettings>
```

| Alignment | Effect |
|-----------|--------|
| Near | Align to start (left for bottom, top for right) |
| Center | Center in position area |
| Far | Align to end (right for bottom, bottom for right) |

### Near Alignment (Bottom)

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" alignment="@Syncfusion.EJ2.Charts.Alignment.Near">
</e-chart3d-legendsettings>
```

Legend items align to the left.

### Center Alignment (Bottom)

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" alignment="@Syncfusion.EJ2.Charts.Alignment.Center">
</e-chart3d-legendsettings>
```

Legend items center horizontally.

### Far Alignment (Bottom)

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" alignment="@Syncfusion.EJ2.Charts.Alignment.Far">
</e-chart3d-legendsettings>
```

Legend items align to the right.

## Legend Customization

Customize legend appearance and behavior.

### Legend Background and Border

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Right" background="rgba(255, 255, 204, 0.8)">
    <e-chart3dlegendsettings-border width="1" color="#999999">
    </e-chart3dlegendsettings-border>
</e-chart3d-legendsettings>
```

### Legend Font and Color

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom">
    <e-chart3dlegendsettings-textstyle color="#333333" 
                         fontFamily="Arial" 
                         fontStyle="Italic" 
                         size="12px">
    </e-chart3dlegendsettings-textstyle>
</e-chart3d-legendsettings>
```

### Toggleable Legend

Enable clicking legend items to show/hide series:

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" toggleVisibility="true">
</e-chart3d-legendsettings>
```

Now users can click legend items to toggle series visibility.

### Legend Dimensions

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Right" 
                          width="150px" 
                          height="300px">
</e-chart3d-legendsettings>
```

Controls the size of the legend container.

### Custom Legend Padding

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" 
                          padding="20">
</e-chart3d-legendsettings>
```

Adds space around the legend (in pixels).

## Legend Reverse

Reverse the order of legend items.

### Basic Reverse

```cshtml
<e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" reverse="true">
</e-chart3d-legendsettings>
```

If series are defined as: Sales, Expenses, Revenue
Reversed legend shows: Revenue, Expenses, Sales

### Use Case: Stack Order Matching

For stacked charts, reversing the legend often matches the visual stack order:

```cshtml
<ejs-chart3d id="stackChart" title="Sales Breakdown" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Product1" 
                          name="Product A"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Product2" 
                          name="Product B"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Product3" 
                          name="Product C"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Reversed legend matches visual stack order (bottom to top) -->
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" reverse="true">
    </e-chart3d-legendsettings>
</ejs-chart3d>
```

## Complete Example: Styled Chart with Labels and Legend

```cshtml
<ejs-chart3d id="styledChart" title="Quarterly Performance" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.PerformanceData" 
                          xName="Quarter" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#3498DB">
            <!-- Data labels with currency format -->
            <e-chart3d-series-datalabel visible="true" 
                                 position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top" 
                                 format="c2"
                                 font="Bold 11px Arial"
                                 color="#1A1A1A">
                    <e-font color="red" size="12px">
                    </e-font>
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
        
        <e-chart3d-series dataSource="@Model.PerformanceData" 
                          xName="Quarter" 
                          yName="Expenses" 
                          name="Expenses"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#E74C3C">
            <e-chart3d-series-datalabel visible="true" 
                                 position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top" 
                                 format="c2"
                                 font="Bold 11px Arial"
                                 color="#1A1A1A">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Legend with custom styling -->
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" 
                              alignment="@Syncfusion.EJ2.Charts.Alignment.Center"
                              reverse="false"
                              toggleVisibility="true"
                              background="rgba(255, 255, 204, 0.8)">
        <e-chart3dlegendsettings-border width="1" color="#CCCCCC">
        </e-chart3dlegendsettings-border>
        <e-chart3dlegendsettings-textstyle color="#333333" 
                            fontFamily="Arial" 
                            size="12px">
        </e-chart3dlegendsettings-textstyle>
    </e-chart3d-legendsettings>
    
    <!-- Tooltips to complement labels -->
    <e-chart3d-tooltipsettings enable="true" 
                               format="${series.name}: ${point.y}">
    </e-chart3d-tooltipsettings>
</ejs-chart3d>
```

**Features:**
- Two column series with labels
- Custom number formatting (currency)
- Bottom-aligned center legend
- Styled legend with background and border
- Toggleable series visibility
- Tooltips for additional info

## Troubleshooting Data Labels & Legends

**Issue: Labels overlap**
- Solution: Set `position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top"` or use `enableRotation="true"`
- For dense data, consider using tooltips instead of labels

**Issue: Legend items don't appear**
- Verify each series has a `name` property
- Check legend `position` is valid: Top, Bottom, Left, Right

**Issue: Legend toggle not working**
- Confirm `toggleVisibility="true"` is set
- Check browser console for JavaScript errors

**Issue: Labels cut off**
- Increase chart container size
- Adjust `format` to use shorter text
