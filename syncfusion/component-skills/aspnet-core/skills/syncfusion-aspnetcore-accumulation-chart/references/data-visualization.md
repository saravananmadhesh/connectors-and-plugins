# Data Visualization Features

This guide covers all visual customization features for accumulation charts including data labels, tooltips, legends, titles, colors, and gradients.

## Table of Contents

- [Data Labels](#data-labels)
  - [Basic Data Labels](#basic-data-labels)
  - [Label Positioning](#label-positioning)
  - [Smart Labels](#smart-labels)
  - [Label Templates](#label-templates)
  - [Connector Lines](#connector-lines)
  - [Text Mapping](#text-mapping)
  - [Label Formatting](#label-formatting)
  - [Text Wrapping](#text-wrapping)
  - [Show Percentages](#show-percentages)
- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Tooltip Header](#tooltip-header)
  - [Tooltip Format](#tooltip-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Tooltip Templates](#tooltip-templates)
  - [Fixed Tooltip Position](#fixed-tooltip-position)
  - [Tooltip Customization](#tooltip-customization)
  - [Tooltip Mapping](#tooltip-mapping)
- [Legend](#legend)
  - [Basic Legend](#basic-legend)
  - [Position and Alignment](#position-and-alignment)
  - [Legend Reverse](#legend-reverse)
  - [Legend Shape](#legend-shape)
  - [Legend Size](#legend-size)
  - [Legend Paging](#legend-paging)
  - [Legend Text Wrap](#legend-text-wrap)
  - [Legend Title](#legend-title)
  - [Legend Animation](#legend-animation)
  - [Legend Layout](#legend-layout)
  - [Legend Template](#legend-template)
- [Title and Subtitle](#title-and-subtitle)
- [Colors and Gradients](#colors-and-gradients)
- [Border and Styling](#border-and-styling)
- [Complete Visualization Example](#complete-visualization-example)

## Data Labels

Data labels display information about data points directly on the chart.

### Basic Data Labels

Enable data labels using the `visible` property:

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { Category = "Chrome", Value = 65.3, Label = "Chrome: 65.3%" },
        new PieChartData { Category = "Safari", Value = 18.2, Label = "Safari: 18.2%" },
        new PieChartData { Category = "Edge", Value = 5.1, Label = "Edge: 5.1%" },
        new PieChartData { Category = "Firefox", Value = 4.9, Label = "Firefox: 4.9%" },
        new PieChartData { Category = "Others", Value = 6.5, Label = "Others: 6.5%" }
    };
}

<ejs-accumulationchart id="labelChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true"></e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Label Positioning

Position labels inside or outside the chart:

```cshtml
<!-- Inside positioning -->
<ejs-accumulationchart id="insideLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" position="Inside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<!-- Outside positioning (default) -->
<ejs-accumulationchart id="outsideLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Positions:**
- `Inside` - Labels appear within slices
- `Outside` - Labels appear outside with connector lines (default)

**When to use:**
- **Inside:** Large slices, minimal labels, clean look
- **Outside:** Many small slices, detailed labels, prevent overlap

### Smart Labels

Automatically arrange labels to prevent overlapping:

```cshtml
<ejs-accumulationchart id="smartLabels" enableSmartLabels="true">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**`enableSmartLabels` Benefits:**
- Automatically repositions overlapping labels
- Adjusts connector lines
- Works best with outside positioning
- Essential for charts with many small slices

### Label Templates

Create custom label layouts with HTML templates:

```cshtml
<ejs-accumulationchart id="templateLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" template="#labelTemplate">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script id="labelTemplate" type="text/x-template">
    <div style="background:#f0f0f0; border:2px solid #666; padding:5px; border-radius:5px;">
        <div style="font-weight:bold; color:#333;">${point.x}</div>
        <div style="color:#666;">${point.y}%</div>
    </div>
</script>
```

**Template Variables:**
- `${point.x}` - Category name
- `${point.y}` - Value
- `${point.percentage}` - Calculated percentage
- `${point.text}` - Custom text field

### Connector Lines

Customize lines connecting labels to slices (for outside labels):

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { xValue = "Chrome", yValue = 37, text = "37%", fill="#498fff"},
        new PieChartData { xValue = "UC Browser", yValue = 17, text = "17%", fill="#ffa060"},
        new PieChartData { xValue = "iPhone", yValue = 19, text = "19%", fill="#ff68b6"},
        new PieChartData { xValue = "Others", yValue = 4 , text = "4%", fill="#81e2a1"},
    };
}

<ejs-accumulationchart id="container" title="Mobile Browser Statistics" enableSmartLabels="true">
    <e-accumulationchart-legendsettings visible="false">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="chartData" xName="xValue" yName="yValue" name="Browser">
            <e-accumulationseries-datalabel name="text" visible="true" position="Outside">
                <e-connectorstyle color="#f4429e" length="50px" width="2" type="Curve" dashArray="5,3">
                </e-connectorstyle>
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Connector Properties:**
- `type` - Line or Curve
- `color` - Line color
- `width` - Line thickness (pixels)
- `length` - Distance from slice (pixels or percentage)
- `dashArray` - Dashed line pattern

### Text Mapping

Map text from data source to labels:

```cshtml
@{
    List<LabelData> chartData = new List<LabelData>
    {
        new LabelData { Category = "Product A", Value = 35, DisplayText = "Premium Product" },
        new LabelData { Category = "Product B", Value = 28, DisplayText = "Standard Product" },
        new LabelData { Category = "Product C", Value = 22, DisplayText = "Basic Product" }
    };
}

<ejs-accumulationchart id="mappedLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" name="DisplayText">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class LabelData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string DisplayText { get; set; }  // Custom label text
}
```

### Label Formatting

Format numeric labels with standard patterns:

```cshtml
<ejs-accumulationchart id="formattedLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <!-- Percentage format with 1 decimal -->
            <e-accumulationseries-datalabel visible="true" format="p1">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Format Strings:**

| Format | Input | Output | Description |
|--------|-------|--------|-------------|
| `n1` | 1000 | 1,000.0 | Number with 1 decimal |
| `n2` | 1000 | 1,000.00 | Number with 2 decimals |
| `n3` | 1000 | 1,000.000 | Number with 3 decimals |
| `p1` | 0.01 | 1.0% | Percentage with 1 decimal |
| `p2` | 0.01 | 1.00% | Percentage with 2 decimals |
| `p3` | 0.01 | 1.000% | Percentage with 3 decimals |
| `c1` | 1000 | $1,000.0 | Currency with 1 decimal |
| `c2` | 1000 | $1,000.00 | Currency with 2 decimals |

### Text Wrapping

Wrap long labels across multiple lines:

```cshtml
<ejs-accumulationchart id="wrappedLabels">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" 
                                          textWrap="Wrap"
                                          maxWidth="80">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Text Wrap Options:**
- `Normal` - No wrapping (default)
- `Wrap` - Wrap based on maxWidth
- `AnyWhere` - Break anywhere in word

### Show Percentages

Display percentage values in labels:

**Method 1: Using textRender Event**

```cshtml
<ejs-accumulationchart id="percentChart" textRender="onTextRender">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>
    function onTextRender(args) {
        args.text = args.point.percentage.toFixed(1) + '%';
    }
</script>
```

**Method 2: Using Template**

```cshtml
<ejs-accumulationchart id="percentTemplate">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-datalabel visible="true" template="#percentLabel">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script id="percentLabel" type="text/x-template">
    <div>${point.x}: ${point.percentage}%</div>
</script>
```

## Tooltips

Tooltips display information when hovering over data points.

### Enable Tooltips

```cshtml
<ejs-accumulationchart id="tooltipChart">
    <e-accumulationchart-tooltipsettings enable="true">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Tooltip Header

Add a custom header to tooltips:

```cshtml
<ejs-accumulationchart id="headerTooltip">
    <e-accumulationchart-tooltipsettings enable="true" header="Browser Statistics">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Tooltip Format

Customize tooltip content using format strings:

```cshtml
<ejs-accumulationchart id="formatTooltip">
    <e-accumulationchart-tooltipsettings enable="true" 
                                        format="${point.x}: ${point.y}%">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Format Variables:**
- `${point.x}` - Category
- `${point.y}` - Value
- `${series.name}` - Series name
- `${point.percentage}` - Percentage

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

Apply a format specifier by adding a colon (`:`) after the tooltip token, followed by the required format.

```cshtml
<ejs-accumulationchart id="inlineFormatTooltip">
    <e-accumulationchart-tooltipsettings
        enable="true"
        format="${series.name}<br/>${point.x}: ${point.y:n2}<br/>Share: ${point.percentage:n1}%<br/>Opacity: ${series.opacity}">
    </e-accumulationchart-tooltipsettings>

    <e-accumulation-series-collection>
        <e-accumulation-series
            dataSource="@chartData"
            xName="Category"
            yName="Value"
            name="Browser Statistics"
            opacity="0.8">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

In the above example, `point.y` is displayed with two decimal places, `point.percentage` is displayed with one decimal place, and `series.opacity` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${point.percentage}` or `${point.percentage:n1}`: Specifies the percentage contribution of the point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series, such as `Pie`, `Doughnut`, `Pyramid`, or `Funnel`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Accumulation Chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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

### Tooltip Templates

Create rich HTML tooltips:

```cshtml
<ejs-accumulationchart id="richTooltip">
    <e-accumulationchart-tooltipsettings enable="true" template="#tooltipTemplate">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script id="tooltipTemplate" type="text/x-template">
    <div style="background:#2c3e50; color:white; padding:10px; border-radius:5px;">
        <div style="font-size:16px; font-weight:bold;">${x}</div>
        <hr style="border-color:#95a5a6; margin:5px 0;" />
        <div>Market Share: <strong>${y}%</strong></div>
        <div>Users: <strong>${(y * 1000000).toLocaleString()}</strong></div>
    </div>
</script>
```

### Fixed Tooltip Position

Set a static tooltip position:

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { Category = "Chrome", Value = 65.3, Label = "Chrome: 65.3%" },
        new PieChartData { Category = "Safari", Value = 18.2, Label = "Safari: 18.2%" },
        new PieChartData { Category = "Edge", Value = 5.1, Label = "Edge: 5.1%" },
        new PieChartData { Category = "Firefox", Value = 4.9, Label = "Firefox: 4.9%" },
        new PieChartData { Category = "Others", Value = 6.5, Label = "Others: 6.5%" }
    };
    var location = new { x = "150", y = "50" };
}
<ejs-accumulationchart id="fixedTooltip">
    <e-accumulationchart-tooltipsettings enable="true" location="@location">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Tooltip Customization

Style tooltip appearance:

```cshtml
<ejs-accumulationchart id="styledTooltip">
    <e-accumulationchart-tooltipsettings enable="true"
                                        fill="#FF6347"
                                        format="${point.x}: ${point.y}%">
        <e-tooltipsettings-border color="#ffffff" width="2"></e-tooltipsettings-border>
        <e-tooltipsettings-textstyle color="#ffffff" 
                                    fontFamily="Arial" 
                                    size="14px">
        </e-tooltipsettings-textstyle>
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Tooltip Mapping

Display additional data from the source:

```cshtml
@{
    List<TooltipData> chartData = new List<TooltipData>
    {
        new TooltipData { Category = "Chrome", Value = 65.3, Users = "2.1B", TooltipInfo = "Market Leader" },
        new TooltipData { Category = "Safari", Value = 18.2, Users = "590M", TooltipInfo = "Apple Ecosystem" }
    };
}

<ejs-accumulationchart id="mappedTooltip">
    <e-accumulationchart-tooltipsettings enable="true" format="${point.tooltip}">
    </e-accumulationchart-tooltipsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              tooltipMappingName="TooltipInfo">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class TooltipData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Users { get; set; }
    public string TooltipInfo { get; set; }
}
```

## Legend

Legends provide information about chart data points.

### Basic Legend

```cshtml
<ejs-accumulationchart id="legendChart">
    <e-accumulationchart-legendsettings visible="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Position and Alignment

```cshtml
<ejs-accumulationchart id="positionedLegend">
    <e-accumulationchart-legendsettings visible="true" 
                                       position="Bottom" 
                                       alignment="Center">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Positions:** `Top`, `Bottom`, `Left`, `Right`, `Custom`

**Alignments:** `Near`, `Center`, `Far`

### Legend Reverse

Reverse the order of legend items:

```cshtml
<ejs-accumulationchart id="reverseLegend">
    <e-accumulationchart-legendsettings visible="true" reverse="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Shape

Customize legend icon shape:

```cshtml
<ejs-accumulationchart id="shapeLegend">
    <e-accumulationchart-legendsettings visible="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              legendShape="Circle">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Shapes:** `Circle`, `Rectangle`, `Triangle`, `Diamond`, `Cross`, `HorizontalLine`, `VerticalLine`, `Pentagon`, `InvertedTriangle`, `SeriesType` (default)

### Legend Size

Set custom legend dimensions:

```cshtml
<ejs-accumulationchart id="sizedLegend">
    <e-accumulationchart-legendsettings visible="true" 
                                       width="300px" 
                                       height="100px"
                                       shapeHeight="15"
                                       shapeWidth="15">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Paging

Automatically page legends when they exceed bounds:

```cshtml
<ejs-accumulationchart id="pagedLegend">
    <e-accumulationchart-legendsettings visible="true"
                                        width="100px"
                                        height="100px"
                                        enablePages="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Text Wrap

Wrap long legend text:

```cshtml
<ejs-accumulationchart id="wrappedLegend">
    <e-accumulationchart-legendsettings visible="true" 
                                       textWrap="Wrap"
                                       maximumLabelWidth="20">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Title

Add a title to the legend:

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { xValue = "Chrome", yValue = 37 },
        new PieChartData { xValue = "UC Browser", yValue = 17 },
        new PieChartData { xValue = "iPhone", yValue = 19 },
        new PieChartData { xValue = "Others", yValue = 4  },
        new PieChartData { xValue = "Opera", yValue = 11 },
        new PieChartData { xValue = "Android", yValue = 12 },
    };
}

<ejs-accumulationchart id="container" title="Mobile Browser Statistics">
    <e-accumulationchart-legendsettings visible="true" position="Bottom" title="Browsers">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="chartData" xName="xValue" yName="yValue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Animation

Enable animation when clicking legend items:

```cshtml
<ejs-accumulationchart id="animatedLegend" enableAnimation="true">
    <e-accumulationchart-legendsettings visible="true" toggleVisibility="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend TextStyle

Use separate `<e-legendsettings-textstyle>` tag inside legend settings:

```cshtml
<ejs-accumulationchart id="styledLegend">
    <e-accumulationchart-legendsettings visible="true" 
                                       position="Right" 
                                       alignment="Center" 
                                       toggleVisibility="true"
                                       title="Browsers">
        <e-legendsettings-textstyle color="#374151" size="13px"></e-legendsettings-textstyle>
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Important:** `textStyle` must NOT be an inline attribute like `textStyle="color: #374151"`. Always use the separate `<e-legendsettings-textstyle>` child tag with individual properties.

### Legend Layout

Control horizontal vs vertical layout:

```cshtml
<ejs-accumulationchart id="layoutLegend">
    <e-accumulationchart-legendsettings visible="true" 
                                       layout="Horizontal"
                                       maximumColumns="5"
                                       fixedWidth="true">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Legend Template

Create custom legend items with HTML:

```cshtml
<ejs-accumulationchart id="accumulation-container" legendRender="legendRender" enableBorderOnMouseMove="false" load="load">
    <e-accumulationchart-titlestyle position="@Syncfusion.EJ2.Charts.TitlePosition.Custom"></e-accumulationchart-titlestyle>
    <e-accumulationchart-legendsettings visible="true" position="Right" itemPadding="15" id="legend-settings">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series type="Pie" dataSource="@chartData" xName="xValue" yName="yValue">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<script>

	var legendTemplate = '<div class="legend-template" style="display:flex; align-items:flex-start; gap:' + ('8px') + '; opacity:1; max-width:' + ('280px') + '; box-sizing:border-box;">' +
		'<div style="display:flex; flex-direction:column; min-width:0; text-align:left;">' +
		'<span class="e-legend-label" style="font-weight:600; font-size:' + ('13px') + '; color:LABEL_COLOR; line-height:' + ('18px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + ( '220px') + ';"></span>' +
		'<span class="e-legend-desc" style="font-size:' + ( '12px') + '; margin-top:' + ( '2px') + '; line-height:' + ( '15px') + '; white-space:normal; overflow-wrap:break-word; word-break:break-word; max-width:' + ( '220px') + ';"></span>' +
		'</div>' +
		'</div>';

	function legendRender(args) {
		var chart = document.getElementById('accumulation-container').ej2_instances[0];
		var matchedPoint = chart.series[0].points.find(function (p) { return p.x === args.text; });
		var opacity = matchedPoint && !matchedPoint.visible ? '0.5' : '1';
		args.template = args.template
			.replace('opacity:1;', 'opacity:' + opacity + ';')
			.replace('LABEL_COLOR', args.fill)
			.replace('></span>', '>' + args.text + '</span>')
	}

	function load(args) {
		var chart = document.getElementById('accumulation-container').ej2_instances[0];
		chart.legendSettings.template = legendTemplate;

	}
</script>
```

## Title and Subtitle

Add titles and subtitles to provide context:

```cshtml
<ejs-accumulationchart id="titledChart" 
                      title="Browser Market Share 2024"
                      subTitle="Global Desktop Statistics">
    <e-accumulationchart-titlestyle fontFamily="Arial" 
                                   fontSize="20px" 
                                   fontWeight="Bold" 
                                   color="#2c3e50">
    </e-accumulationchart-titlestyle>
    <e-accumulationchart-subtitlestyle fontFamily="Arial" 
                                      fontSize="14px" 
                                      color="#7f8c8d">
    </e-accumulationchart-subtitlestyle>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Title Positions:** `Top` (default), `Bottom`, `Left`, `Right`, `Custom`

## Colors and Gradients

### Point Color Mapping

Map colors from data source:

```cshtml
@{
    List<ColoredData> chartData = new List<ColoredData>
    {
        new ColoredData { Category = "Chrome", Value = 65.3, Color = "#1E90FF" },
        new ColoredData { Category = "Safari", Value = 18.2, Color = "#32CD32" },
        new ColoredData { Category = "Edge", Value = 5.1, Color = "#FF6347" }
    };
}

<ejs-accumulationchart id="colorMapped">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              pointColorMapping="Color">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class ColoredData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Color { get; set; }
}
```

### Color Palettes

Apply predefined color schemes:

```cshtml
<ejs-accumulationchart id="paletteChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              palettes='new string[] { "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF" }'>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Linear Gradients

Apply linear gradient fills:

```cshtml
@{
    var linearGradient = new Syncfusion.EJ2.Charts.AccumulationChartLinearGradient
    {
        X1 = 0.1,
        Y1 = 0,
        X2 = 0.9,
        Y2 = 1,
        GradientColorStop = new List<Syncfusion.EJ2.Charts.ChartGradientColorStop>
        {
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#4F46E5", Offset = 0,   Opacity = 1 },
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#4F46E5", Offset = 60,  Opacity = 0.5 },
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#4F46E5", Offset = 100, Opacity = 0 }
        }
    };

    List<ColoredData> chartData = new List<ColoredData>
    {
        new ColoredData { Category = "Chrome", Value = 65.3 },
        new ColoredData { Category = "Safari", Value = 18.2 },
        new ColoredData { Category = "Edge", Value = 5.1 }
    };
}

<ejs-accumulationchart id="container" title="Orders by Category" enableSmartLabels="true">
    <e-accumulation-series-collection>
        <e-accumulation-series type="Pie" dataSource="@chartData"
                               xName="Category" yName="Value" name="Share by Category"
            linearGradient="@linearGradient">
            <e-accumulationseries-datalabel visible="true" name="DataLabel"
                position="Outside">
                <e-connectorstyle length="10px"></e-connectorstyle>
                <e-font size="12px"></e-font>
            </e-accumulationseries-datalabel>
            <e-accumulationseries-border color="#FFFFFF" width="2">
            </e-accumulationseries-border>
        </e-accumulation-series>
    </e-accumulation-series-collection>
    <e-accumulationchart-legendsettings visible="true" position="Right">
    </e-accumulationchart-legendsettings>
    <e-accumulationchart-tooltipsettings enable="true"></e-accumulationchart-tooltipsettings>
</ejs-accumulationchart>
```

### Radial Gradients

Create circular gradient effects:

```cshtml
@{
    var radialGradient = new Syncfusion.EJ2.Charts.AccumulationChartRadialGradient
    {
        Cx = 0.22,
        Cy = 0.22,
        Fx = 0.12,
        Fy = 0.12,
        R = 0.96,
        GradientColorStop = new List<Syncfusion.EJ2.Charts.ChartGradientColorStop>
        {
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#1E90FF", Offset = 0,   Opacity = 1 },
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#32CD32", Offset = 50,  Opacity = 1 },
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#FF6347", Offset = 100,  Opacity = 1 },
        }
    };

    List<ColoredData> chartData = new List<ColoredData>
    {
        new ColoredData { Category = "Chrome", Value = 65.3, Color = "#1E90FF" },
        new ColoredData { Category = "Safari", Value = 18.2, Color = "#32CD32" },
        new ColoredData { Category = "Edge", Value = 5.1, Color = "#FF6347" }
    };
}

<ejs-accumulationchart id="container" title="Orders by Category" enableSmartLabels="true">
    <e-accumulation-series-collection>
        <e-accumulation-series type="Pie" dataSource="@chartData"
                               xName="Category" yName="Value" name="Share by Category"
            innerRadius="50%" radialGradient="@radialGradient">
            <e-accumulationseries-datalabel visible="true" name="DataLabel"
                position="Outside">
                <e-connectorstyle length="10px"></e-connectorstyle>
                <e-font size="12px"></e-font>
            </e-accumulationseries-datalabel>
            <e-accumulationseries-border color="#FFFFFF" width="2">
            </e-accumulationseries-border>
        </e-accumulation-series>
    </e-accumulation-series-collection>
    <e-accumulationchart-legendsettings visible="true" position="Right">
    </e-accumulationchart-legendsettings>
    <e-accumulationchart-tooltipsettings enable="true"></e-accumulationchart-tooltipsettings>
</ejs-accumulationchart>
```

## Border and Styling

### Chart Border

```cshtml
<ejs-accumulationchart id="borderedChart" background="#f0f0f0">
    <e-accumulationchart-border color="#333" width="2"></e-accumulationchart-border>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Slice Borders

```cshtml
<ejs-accumulationchart id="sliceBorders">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
            <e-accumulationseries-border color="#ffffff" width="2"></e-accumulationseries-border>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Border Radius

Create rounded slice corners:

```cshtml
<ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.dataSource" xName="X" yName="Y" borderRadius="8" type="@Syncfusion.EJ2.Charts.AccumulationType.Pie">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Hide Border on Hover

```cshtml
<ejs-accumulationchart id="noBorderHover" enableBorderOnMouseMove="false">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="Category" yName="Value">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## Complete Visualization Example

```cshtml
@{
    List<VisualizationData> data = new List<VisualizationData>
    {
        new VisualizationData { Browser = "Chrome", Share = 65.3, Users = "2.1B", Color = "#4285F4" },
        new VisualizationData { Browser = "Safari", Share = 18.2, Users = "590M", Color = "#34A853" },
        new VisualizationData { Browser = "Edge", Share = 5.1, Users = "165M", Color = "#0078D7" },
        new VisualizationData { Browser = "Firefox", Share = 4.9, Users = "158M", Color = "#FF7139" },
        new VisualizationData { Browser = "Others", Share = 6.5, Users = "210M", Color = "#FBBC04" }
    };
}

<ejs-accumulationchart id="completeChart" 
                      title="Global Browser Market Share 2024"
                      subTitle="Desktop & Mobile Combined"
                      enableSmartLabels="true"
                      enableAnimation="true"
                      background="#ffffff">
    
    <!-- Title Styling -->
    <e-accumulationchart-titlestyle fontFamily="Segoe UI" fontSize="22px" fontWeight="600" color="#2c3e50">
    </e-accumulationchart-titlestyle>
    
    <!-- Subtitle Styling -->
    <e-accumulationchart-subtitlestyle fontFamily="Segoe UI" fontSize="14px" color="#7f8c8d">
    </e-accumulationchart-subtitlestyle>
    
    <!-- Legend -->
    <e-accumulationchart-legendsettings visible="true" position="Right" alignment="Center">
    </e-accumulationchart-legendsettings>
    
    <!-- Tooltip -->
    <e-accumulationchart-tooltipsettings enable="true" 
                                        format="${point.x}: ${point.y}%<br/>Users: ${point.tooltip}">
        <e-tooltipsettings-border color="#666" width="1"></e-tooltipsettings-border>
    </e-accumulationchart-tooltipsettings>
    
    <!-- Series -->
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@data" 
                              xName="Browser" 
                              yName="Share"
                              tooltipMappingName="Users"
                              pointColorMapping="Color"
                              type="Pie"
                              innerRadius="50%"
                              explode="true"
                              explodeOffset="10%">
            
            <!-- Data Labels -->
            <e-accumulationseries-datalabel visible="true" position="Outside">
                <e-connectorstyle type="Curve"></e-connectorstyle>
            </e-accumulationseries-datalabel>
            
            <!-- Borders -->
            <e-accumulationseries-border color="#ffffff" width="3" radius="5"></e-accumulationseries-border>
            
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class VisualizationData
{
    public string Browser { get; set; }
    public double Share { get; set; }
    public string Users { get; set; }
    public string Color { get; set; }
}
```

This creates a polished, professional accumulation chart with all visualization features combined.
