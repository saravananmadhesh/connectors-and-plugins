# Legend and Tooltip Configuration

## Table of Contents
- [Legend Configuration](#legend-configuration)
  - [Enabling Legend](#enabling-legend)
  - [Basic Legend Setup](#basic-legend-setup)
  - [Legend Data Source](#legend-data-source)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Position Examples](#position-examples)
- [Legend Alignment](#legend-alignment)
  - [Alignment Options](#alignment-options)
  - [Alignment Examples](#alignment-examples)
- [Legend Appearance](#legend-appearance)
  - [Legend Shapes](#legend-shapes)
  - [Legend Size](#legend-size)
  - [Legend Item Size](#legend-item-size)
  - [Legend Item Padding](#legend-item-padding)
  - [Text Wrapping](#text-wrapping)
  - [Legend Title](#legend-title)
- [Legend Reverse](#legend-reverse)
- [Legend Paging](#legend-paging)
  - [Auto Paging (Enabled by Default)](#auto-paging-enabled-by-default)
  - [Arrow Navigation](#arrow-navigation)
- [Tooltip Configuration](#tooltip-configuration)
  - [Enabling Tooltip](#enabling-tooltip)
  - [Basic Tooltip Example](#basic-tooltip-example)
- [Tooltip Formatting](#tooltip-formatting)
  - [Default Format](#default-format)
  - [Custom Format](#custom-format)
  - [Format Placeholders](#format-placeholders)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Format Examples](#format-examples)
  - [Fixed Tooltip Position](#fixed-tooltip-position)
- [Tooltip Templates](#tooltip-templates)
  - [Template with Styling](#template-with-styling)
- [Advanced Tooltip](#advanced-tooltip)
  - [Tooltip Customization](#tooltip-customization)
  - [Header in Tooltip](#header-in-tooltip)
  - [TooltipRender Event](#tooltiprender-event)
- [Best Practices](#best-practices)

## Legend Configuration

The legend provides a reference for the data represented in the 3D circular chart. Each slice is associated with a legend item that displays its category name.

### Enabling Legend

Enable the legend using the `visible="true"` property.

```cshtml
<e-circularchart3d-legendsettings visible="true">
</e-circularchart3d-legendsettings>
```

### Basic Legend Setup

```cshtml
<ejs-circularchart3d id="container" title="Sales Distribution" tilt="-45">
    <e-circularchart3d-legendsettings visible="true">
    </e-circularchart3d-legendsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

**Result:** Legend appears showing categories from your data source.

### Legend Data Source

By default, the legend uses the X field (category) from the series data. The legend item text corresponds to each data point's category name.

**Data structure:**
```csharp
List<ChartData> data = new()
{
    new ChartData { Category = "Chrome", Value = 37 },
    new ChartData { Category = "Firefox", Value = 28 },
    new ChartData { Category = "Safari", Value = 18 }
};
```

**Result:** Legend shows "Chrome", "Firefox", "Safari" items.

## Legend Positioning

Control where the legend appears using the `Position` property.

### Position Options

- **Right** (default) - Legend appears to the right of the chart
- **Left** - Legend appears to the left
- **Top** - Legend appears above the chart
- **Bottom** - Legend appears below the chart

### Position Examples

**Right (default):**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
</e-circularchart3d-legendsettings>
```

**Bottom:**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom">
</e-circularchart3d-legendsettings>
```

**Top:**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Top">
</e-circularchart3d-legendsettings>
```

**Left:**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Left">
</e-circularchart3d-legendsettings>
```

## Legend Alignment

Control alignment within the legend container using the `Alignment` property. This is useful when the legend is wider/taller than the chart.

### Alignment Options

- **Center** (default) - Legend centered on its axis
- **Near** - Legend aligned to the start (top for top/bottom, left for left/right)
- **Far** - Legend aligned to the end (bottom for top/bottom, right for left/right)

### Alignment Examples

**Top position with Left alignment:**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Top" 
    alignment="@Syncfusion.EJ2.Charts.Alignment.Near">
</e-circularchart3d-legendsettings>
```

**Bottom position with Full width and Center alignment:**
```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" 
    alignment="@Syncfusion.EJ2.Charts.Alignment.Center" width="100%">
</e-circularchart3d-legendsettings>
```

## Legend Appearance

### Legend Shapes

Change the shape displayed next to each legend item using the `LegendShape` property in the Series:

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y" 
    legendShape="@Syncfusion.EJ2.Charts.LegendShape.Circle">
</e-circularchart3d-series>
```

**Available Shapes:**
- `Circle` - Circular shape
- `Rectangle` - Square/rectangular shape
- `Triangle` - Triangular shape
- `Diamond` - Diamond shape
- `Pentagon` - Pentagonal shape
- `SeriesType` (default) - Uses the series type icon

### Legend Size

Control the overall legend size using `Width` and `Height`:

```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom" 
    width="100%" height="60px">
</e-circularchart3d-legendsettings>
```

### Legend Item Size

Customize individual legend item shape size using `ShapeWidth` and `ShapeHeight`:

```cshtml
<e-circularchart3d-legendsettings visible="true" shapeWidth="20px" shapeHeight="20px">
</e-circularchart3d-legendsettings>
```

### Legend Item Padding

Adjust spacing between legend items using the `ItemPadding` property:

```cshtml
<e-circularchart3d-legendsettings visible="true" itemPadding="15">
</e-circularchart3d-legendsettings>
```

Value is in pixels. Larger values create more space between items.

### Text Wrapping

Enable text wrapping for long category names using `TextWrap`:

```cshtml
<e-circularchart3d-legendsettings visible="true" textWrap="@Syncfusion.EJ2.Charts.TextWrap.Wrap" 
    maximumLabelWidth="120">
</e-circularchart3d-legendsettings>
```

**Options:**
- `Wrap` - Text wraps to multiple lines
- `Normal` - Text doesn't wrap

### Legend Title

Add a title to the legend using the `Title` property:

```cshtml
<e-circularchart3d-legendsettings visible="true" title="Categories">
    <e-circularchart3dlegendsettings-titlestyle size="16px" fontWeight="bold" color="black">
    </e-circularchart3dlegendsettings-titlestyle>
</e-circularchart3d-legendsettings>
```

## Legend Reverse

Reverse the order of legend items using the `Reverse` property:

```cshtml
<e-circularchart3d-legendsettings visible="true" reverse="true">
</e-circularchart3d-legendsettings>
```

**Default:** First series item appears first in legend  
**Reversed:** Last series item appears first in legend

## Legend Paging

Legend paging is automatically applied when items exceed available space. Users can navigate between pages using navigation buttons.

### Auto Paging (Enabled by Default)

```cshtml
<e-circularchart3d-legendsettings visible="true" position="@Syncfusion.EJ2.Charts.LegendPosition.Right">
</e-circularchart3d-legendsettings>
```

### Arrow Navigation

Disable page numbers and show only navigation arrows using `EnablePages`:

```cshtml
<e-circularchart3d-legendsettings visible="true" enablePages="false">
</e-circularchart3d-legendsettings>
```

This displays left/right arrows instead of page numbers.

## Tooltip Configuration

Tooltips display information about data points when the user hovers over them. This is disabled by default.

### Enabling Tooltip

```cshtml
<e-circularchart3d-tooltipsettings enable="true">
</e-circularchart3d-tooltipsettings>
```

**Result:** When hovering over a pie slice, a tooltip appears with point information.

### Basic Tooltip Example

```cshtml
<ejs-circularchart3d id="container" title="Market Share" tilt="-45">
    <e-circularchart3d-tooltipsettings enable="true">
    </e-circularchart3d-tooltipsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

## Tooltip Formatting

### Default Format

By default, the tooltip shows the category name (X) and value (Y) in the format: `category: value`

### Custom Format

Use the `Format` property with placeholders to customize tooltip content:

```cshtml
<e-circularchart3d-tooltipsettings enable="true" format="${point.x}: ${point.y}%">
</e-circularchart3d-tooltipsettings>
```

**Result:** Tooltip shows "Chrome: 37%" instead of default format.

### Format Placeholders

- `${point.x}` - Category name (X value)
- `${point.y}` - Data value (Y value)
- `${series.name}` - Series name
- `${point.percentage}` - Percentage of total

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
<e-circularchart3d-tooltipsettings
    enable="true"
    format="${series.name}<br/>${point.x}: ${point.y:n2}<br/>Share: ${point.percentage:n1}%<br/>Opacity: ${series.opacity}">
</e-circularchart3d-tooltipsettings>
```

In the above example, `${point.y:n2}` displays the point value with two decimal places, `${point.percentage:n1}` displays the percentage with one decimal place, and `${series.opacity}` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${point.percentage}` or `${point.percentage:n1}`: Specifies the percentage contribution of the point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Circular 3D Chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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

### Format Examples

**Example 1: Category and percentage**
```cshtml
<e-circularchart3d-tooltipsettings enable="true" format="${point.x}: ${point.percentage}%">
</e-circularchart3d-tooltipsettings>
```

**Example 2: Multi-line format with series info**
```cshtml
<e-circularchart3d-tooltipsettings enable="true" format="<b>${point.x}</b><br/>Value: ${point.y}<br/>Share: ${point.percentage}%">
</e-circularchart3d-tooltipsettings>
```

### Fixed Tooltip Position

By default, the tooltip follows the mouse. To display it at a fixed location, use the `Location` property:

```cshtml
<e-circularchart3d-tooltipsettings enable="true">
    <e-circularchart3dtooltipsettings-location x="200" y="20"></e-circularchart3dtooltipsettings-location>
</e-circularchart3d-tooltipsettings>
```

The tooltip appears at pixel coordinates (200, 20) instead of following the mouse.

## Tooltip Templates

Any HTML elements can be displayed in the tooltip using the `Template` property:

```cshtml
<e-circularchart3d-tooltipsettings enable="true" 
    template="<div style='padding: 10px; background: #f0f0f0;'><strong>${point.x}</strong><br/>Sales: ${point.y}</div>">
</e-circularchart3d-tooltipsettings>
```

**Result:** Custom styled tooltip with product name and sales value.

### Template with Styling

```cshtml
<e-circularchart3d-tooltipsettings enable="true" 
    template="<div style='color: white; background: #333; padding: 8px; border-radius: 4px;'>${point.x}: <strong>${point.y}</strong></div>">
</e-circularchart3d-tooltipsettings>
```

## Advanced Tooltip

### Tooltip Customization

Customize the tooltip appearance using properties like `Fill`, `Border`, and `TextStyle`:

```cshtml
<e-circularchart3d-tooltipsettings enable="true" format="${point.x}: ${point.y}%">
    <e-circularchart3dtooltipsettings-border color="#FF5733" width="2"></e-circularchart3dtooltipsettings-border>
    <e-circularchart3dtooltipsettings-textstyle color="white" size="12px">
    </e-circularchart3dtooltipsettings-textstyle>
</e-circularchart3d-tooltipsettings>
```

**Properties:**
- `Fill` - Background color of tooltip
- `Border.Color` - Border color
- `Border.Width` - Border thickness
- `TextStyle.Color` - Text color
- `TextStyle.Size` - Font size
- `TextStyle.FontStyle` - Font style (italic, etc.)

### Header in Tooltip

Add a header section to the tooltip using the `Header` property:

```cshtml
<e-circularchart3d-tooltipsettings enable="true" header="Product Information" format="${point.x}: ${point.y}%">
</e-circularchart3d-tooltipsettings>
```

**Result:** "Product Information" appears as header above the formatted content.

### TooltipRender Event

Customize tooltips for individual points using the `TooltipRender` event:

**View:**
```cshtml
<ejs-circularchart3d id="container" tooltipRender="@ViewBag.OnTooltipRender" tilt="-45">
    <e-circularchart3d-tooltipsettings enable="true">
    </e-circularchart3d-tooltipsettings>
</ejs-circularchart3d>
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.OnTooltipRender = new HtmlString(@"
        function onTooltipRender(args) {
            if (args.point.y > 30) {
                args.content = '<b>Premium Product:</b><br/>' + args.point.x + ': ' + args.point.y;
            }
        }
    ");
    return View();
}
```

## Best Practices

1. **Legend Positioning**
   - Use `Bottom` for wide charts to conserve vertical space
   - Use `Right` for tall charts (traditional approach)
   - Consider chart aspect ratio

2. **Legend Size**
   - Set explicit width for horizontal legends
   - Enable text wrapping for long category names
   - Maintain adequate item padding for readability

3. **Tooltip Enabling**
   - Enable for complex charts with many data points
   - Disable if space is limited or for static reports
   - Use consistent tooltip format with data labels

4. **Tooltip Content**
   - Keep format concise and readable
   - Include units (%, $, etc.) for clarity
   - Use templates for complex information

5. **Styling**
   - Maintain color contrast in tooltips
   - Match tooltip styling to overall chart theme
   - Test with different screen sizes
