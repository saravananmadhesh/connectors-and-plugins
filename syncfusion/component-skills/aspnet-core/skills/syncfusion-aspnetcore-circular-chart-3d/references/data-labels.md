# Data Labels Configuration and Customization

## Table of Contents
- [Overview](#overview)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Basic Label Example](#basic-label-example)
- [Positioning](#positioning)
  - [Position Options](#position-options)
  - [Inside Position](#inside-position)
  - [Outside Position](#outside-position)
  - [Example: Dynamic Position Selection](#example-dynamic-position-selection)
- [Label Templates](#label-templates)
  - [Template Syntax](#template-syntax)
  - [Basic Template Example](#basic-template-example)
  - [Formatted Number Template](#formatted-number-template)
  - [Multi-line Template](#multi-line-template)
- [Connector Lines](#connector-lines)
  - [Basic Connector Line](#basic-connector-line)
  - [Customized Connector Line](#customized-connector-line)
  - [Connector Line Examples](#connector-line-examples)
- [Text Mapping](#text-mapping)
  - [Basic Text Mapping](#basic-text-mapping)
  - [Multiple Mappings](#multiple-mappings)
- [Formatting](#formatting)
  - [Format Property](#format-property)
  - [Available Format Options](#available-format-options)
  - [Format Examples](#format-examples)
- [Customization with Events](#customization-with-events)
  - [TextRender Event](#textrender-event)
  - [Common TextRender Customizations](#common-textrender-customizations)
- [Percentage Display](#percentage-display)
  - [Method 1: Using TextRender Event](#method-1-using-textrender-event)
  - [Method 2: Using Template](#method-2-using-template)
  - [Method 3: Format Approach](#method-3-format-approach)
- [Best Practices](#best-practices)

## Overview

Data labels are text annotations associated with individual data points in a pie/donut chart. They display information about each slice directly on or near the chart.

### Enabling Data Labels

By default, data labels are hidden. Enable them using the `Visible` property:

```cshtml
<e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y">
    <e-circularchart3d-series-datalabel visible="true">
    </e-circularchart3d-series-datalabel>
</e-circularchart3d-series>
```

**Result:** Labels appear on each pie slice showing the data point values. The component automatically arranges labels to avoid overlapping.

### Basic Label Example

```cshtml
<ejs-circularchart3d id="container" title="Product Sales" tilt="-45">
    <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Sales">
        <e-circularchart3d-series-datalabel visible="true">
        </e-circularchart3d-series-datalabel>
    </e-circularchart3d-series>
</ejs-circularchart3d>
```

## Positioning

Control where labels appear relative to the pie slice using the `Position` property:

### Position Options

- **Inside** - Labels rendered inside the slice (default for space efficiency)
- **Outside** - Labels rendered outside the slice (better readability, may need connector lines)

### Inside Position

```cshtml
<e-circularchart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Inside">
</e-circularchart3d-series-datalabel>
```

**Use when:**
- Slices are large enough to accommodate text
- Space is limited
- You want a compact chart appearance

### Outside Position

```cshtml
<e-circularchart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside">
    <e-connectorstyle length="40px"></e-connectorstyle>
</e-circularchart3d-series-datalabel>
```

**Use when:**
- Slices are small
- Readability is critical
- You want to use connector lines

### Example: Dynamic Position Selection

```csharp
// Code-behind
var labelPosition = largeSlices ? 
    Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Inside : 
    Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside;
```

## Label Templates

Customize label content using HTML templates. Templates can include data point values, series names, percentages, and custom text.

### Template Syntax

Use placeholders to reference data:
- `${point.x}` - X value (category)
- `${point.y}` - Y value (numeric value)
- `${series.name}` - Series name

### Basic Template Example

```cshtml
<e-circularchart3d-series-datalabel visible="true" template="<div style='background: white; padding: 5px; border: 1px solid gray;'>${point.x}: ${point.y}</div>">
</e-circularchart3d-series-datalabel>
```

**Result:** Labels show both category and value (e.g., "Chrome: 37.8")

### Formatted Number Template

```cshtml
<e-circularchart3d-series-datalabel visible="true" template="<b>${point.x}</b><br/>${point.y}%">
</e-circularchart3d-series-datalabel>
```

**Result:** Category in bold on first line, percentage on second line

### Multi-line Template

```cshtml
<e-circularchart3d-series-datalabel visible="true" template="<div><strong>${point.x}</strong><br/>Value: ${point.y}<br/>Share: ${point.percentage}</div>">
</e-circularchart3d-series-datalabel>
```

## Connector Lines

When labels are positioned outside, connector lines link labels to their corresponding slices for clarity.

### Basic Connector Line

```cshtml
<e-circularchart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.Outside">
    <e-connectorstyle length="40px"></e-connectorstyle>
</e-circularchart3d-series-datalabel>
```

### Customized Connector Line

Customize connector appearance with color, width, and style:

```cshtml
<e-connectorstyle length="50px" color="#FF6B6B" width="2" dashArray="5,5"></e-connectorstyle>
```

**Properties:**
- `length` - Line length in pixels (e.g., "40px", "50px")
- `color` - Line color (hex or named color, e.g., "#FF6B6B", "gray")
- `width` - Line thickness in pixels (default: 1)
- `dashArray` - Pattern for dashed lines (e.g., "5,5" for dash-space pattern)

### Connector Line Examples

**Example 1: Long dashed connector**
```cshtml
<e-connectorstyle length="60px" color="gray" width="1" dashArray="8,4"></e-connectorstyle>
```

**Example 2: Bold colored connector**
```cshtml
<e-connectorstyle length="45px" color="#2E86AB" width="3"></e-connectorstyle>
```

**Example 3: No dash pattern (solid)**
```cshtml
<e-connectorstyle length="40px" color="black" width="2"></e-connectorstyle>
```

## Text Mapping

Map label text from your data source using the `Name` property in the `DataLabel` configuration.

### Basic Text Mapping

**Data structure:**
```csharp
public class ChartData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Label { get; set; }
}

List<ChartData> data = new()
{
    new ChartData { Category = "A", Value = 35, Label = "Product A - 35%" },
    new ChartData { Category = "B", Value = 28, Label = "Product B - 28%" }
};
```

**Map the Label column:**
```cshtml
<e-circularchart3d-series dataSource="@data" xName="Category" yName="Value">
    <e-circularchart3d-series-datalabel visible="true" name="Label">
    </e-circularchart3d-series-datalabel>
</e-circularchart3d-series>
```

**Result:** Labels display the custom Label field values instead of default Y values.

### Multiple Mappings

You can combine different fields in templates:

```cshtml
<e-circularchart3d-series-datalabel visible="true" template="${point.x}: ${point.y} units">
</e-circularchart3d-series-datalabel>
```

This uses the X field (Category) and Y field (Value) in one label.

## Formatting

Format label values using global formatting options.

### Format Property

```cshtml
<e-circularchart3d-series-datalabel visible="true" format="n2">
</e-circularchart3d-series-datalabel>
```

### Available Format Options

| Format | Input | Output | Description |
|--------|-------|--------|-------------|
| `n1` | 1000 | 1000.0 | One decimal place |
| `n2` | 1000 | 1000.00 | Two decimal places |
| `n3` | 1000 | 1000.000 | Three decimal places |
| `p1` | 0.01 | 1.0% | Percentage with 1 decimal |
| `p2` | 0.01 | 1.00% | Percentage with 2 decimals |
| `p3` | 0.01 | 1.000% | Percentage with 3 decimals |
| `c1` | 1000 | $1000.0 | Currency with 1 decimal |
| `c2` | 1000 | $1000.00 | Currency with 2 decimals |

### Format Examples

```cshtml
// Two decimal numbers
<e-circularchart3d-series-datalabel visible="true" format="n2">
</e-circularchart3d-series-datalabel>

// Percentage format
<e-circularchart3d-series-datalabel visible="true" format="p2">
</e-circularchart3d-series-datalabel>

// Currency format
<e-circularchart3d-series-datalabel visible="true" format="c2">
</e-circularchart3d-series-datalabel>
```

## Customization with Events

### TextRender Event

Customize individual label text dynamically using the `TextRender` event. This event fires before each label is rendered.

**View:**
```cshtml
<ejs-circularchart3d id="container" textRender="@ViewBag.OnTextRender" tilt="-45">
    <e-circularchart3d-series dataSource="@chartData" xName="X" yName="Y">
        <e-circularchart3d-series-datalabel visible="true">
        </e-circularchart3d-series-datalabel>
    </e-circularchart3d-series>
</ejs-circularchart3d>
```

**Controller/Code-behind:**
```csharp
public IActionResult Index()
{
    ViewBag.OnTextRender = new HtmlString(@"
        function onTextRender(args) {
            // Customize text for specific points
            if (args.point.y > 30) {
                args.text = 'High: ' + args.point.y.toFixed(2);
            } else {
                args.text = 'Low: ' + args.point.y.toFixed(2);
            }
        }
    ");
    return View();
}
```

**Result:** Labels dynamically show "High:" or "Low:" prefix based on value.

### Common TextRender Customizations

- Add prefixes/suffixes based on conditions
- Format numbers with custom patterns
- Modify text color or styling
- Calculate derived values (e.g., percentages)
- Add units or symbols

## Percentage Display

Display percentage values instead of raw numbers using templates or the TextRender event.

### Method 1: Using TextRender Event

```csharp
function onTextRender(args) {
    // Calculate total sum (requires access to all data)
    var total = chartData.reduce((sum, item) => sum + item.Y, 0);
    var percentage = ((args.point.y / total) * 100).toFixed(2);
    args.text = percentage + '%';
}
```

### Method 2: Using Template

If you pre-calculate percentages in your data:

```csharp
public class ChartData
{
    public string X { get; set; }
    public double Y { get; set; }
    public double Percentage { get; set; }
}

var data = new List<ChartData>
{
    new ChartData { X = "A", Y = 35, Percentage = 35.0 },
    new ChartData { X = "B", Y = 28, Percentage = 28.0 }
};
```

Then display percentages:

```cshtml
<e-circularchart3d-series dataSource="@data" xName="X" yName="Y">
    <e-circularchart3d-series-datalabel visible="true" template="${point.x}: ${point.y}% (${Percentage}%)">
    </e-circularchart3d-series-datalabel>
</e-circularchart3d-series>
```

### Method 3: Format Approach

If all values are already percentages (0 to 1 decimal range):

```cshtml
<e-circularchart3d-series-datalabel visible="true" format="p0">
</e-circularchart3d-series-datalabel>
```

## Best Practices

1. **Choose Appropriate Position**
   - Use `Inside` for large slices with space
   - Use `Outside` for small slices with connector lines

2. **Format for Clarity**
   - Use `n2` for general numbers
   - Use `p2` for percentages
   - Use `c2` for currency values

3. **Connector Lines**
   - Enable when using `Outside` position
   - Adjust length based on chart size
   - Use color to differentiate from chart

4. **Template Content**
   - Keep templates concise
   - Include relevant data only
   - Test with different data sizes

5. **Performance**
   - Minimize TextRender event complexity
   - Avoid heavy calculations per label
   - Cache calculated values when possible
