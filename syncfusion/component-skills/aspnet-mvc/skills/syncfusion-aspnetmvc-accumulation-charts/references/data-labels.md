# Data Labels

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Positioning](#label-positioning)
- [Smart Label Arrangement](#smart-label-arrangement)
- [Label Templates](#label-templates)
- [Text Mapping](#text-mapping)
- [Format Options](#format-options)
- [Connector Lines](#connector-lines)
- [Font Styling](#font-styling)
- [Text Wrapping](#text-wrapping)
- [Showing Percentages](#showing-percentages)
  - [Method 1: Using TextRender Event](#method-1-using-textrender-event)
  - [Method 2: Using Template](#method-2-using-template)
  - [Method 3: With Value and Percentage](#method-3-with-value-and-percentage)
- [Customization](#customization)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)
  - [Label Visibility](#label-visibility)
  - [Content Guidelines](#content-guidelines)
  - [Visual Design](#visual-design)
  - [Performance](#performance)
  - [Accessibility](#accessibility)
- [See Also](#see-also)


## Overview

Data labels display information about chart data points directly on the visualization, eliminating the need for users to reference axes or tooltips. They show values, percentages, categories, or custom content, making charts more accessible and informative.

**When to Use Data Labels:**
- Precise values are critical (financial data, metrics, KPIs)
- Chart is used in presentations or reports (static viewing)
- Limited number of data points (3-10) to avoid clutter
- Emphasizing specific values or highlighting winners/losers

## Enabling Data Labels

Enable data labels by setting the `Visible` property to `true` in the `DataLabel` settings:

```cshtml
@(Html.EJS().AccumulationChart("labeledChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .XName("Category")
              .YName("Value")
              .DataLabel(dl => dl.Visible(true))  // Enable data labels
              .DataSource(Model)
              .Add();
    })
    .Render()
)
```

```csharp
// Controller
public ActionResult DataLabels()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Category = "Electronics", Value = 37 },
        new ChartData { Category = "Clothing", Value = 25 },
        new ChartData { Category = "Food", Value = 20 },
        new ChartData { Category = "Books", Value = 18 }
    };
    return View(data);
}
```

## Label Positioning

Position data labels either **Inside** or **Outside** the chart segments:

```cshtml
@(Html.EJS().AccumulationChart("positioned")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .DataSource(Model)
              .Add();
    })
    .Render()
)
```

**Position Options:**

| Position | Description | Best For |
|----------|-------------|----------|
| `Inside` | Labels inside segments | Large segments, minimal clutter |
| `Outside` | Labels outside with connector lines | Small segments, readability |

**Inside Labels Example:**

```cshtml
.DataLabel(dl => dl
    .Visible(true)
    .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside)
    .Font(f => f.Color("white").FontWeight("600"))
)
```

**Outside Labels Example:**

```cshtml
.DataLabel(dl => dl
    .Visible(true)
    .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
    .ConnectorStyle(cs => cs
        .Length("30px")
        .Type(Syncfusion.EJ2.Charts.ConnectorType.Curve)
    )
)
```

## Smart Label Arrangement

Prevent label overlapping with smart label arrangement:

```cshtml
@(Html.EJS().AccumulationChart("smartLabels")
    .Series(series =>
    {
        series.XName("Product")
              .YName("Sales")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .DataSource(Model)
              .Add();
    })
    .EnableSmartLabels(true)  // Automatically arrange to prevent overlap
    .Render()
)
```

**How Smart Labels Work:**
1. Detects potential label collisions
2. Shifts labels vertically to prevent overlap
3. Adjusts connector line positioning
4. Prioritizes readability over exact positioning

**When to Use:**
- Many data points with small segments
- Outside label positioning
- Variable data point counts
- Mobile/responsive designs

## Label Templates

Create custom label content using HTML templates:

```cshtml
@(Html.EJS().AccumulationChart("templateLabels")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Template("<div style='background:#fff; border:1px solid #000; padding:5px; border-radius:3px;'>" +
                            "<b>${point.x}</b><br/>" +
                            "Value: ${point.y}<br/>" +
                            "Percentage: ${point.percentage}%" +
                            "</div>")
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

**Template Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `${point.x}` | Category/X value | "Electronics" |
| `${point.y}` | Numeric/Y value | 37 |
| `${point.percentage}` | Percentage of total | 37 |
| `${point.text}` | Custom text field | Custom mapped text |
| `${series.name}` | Series name | "Sales 2026" |

**Advanced Template Example:**

```cshtml
.DataLabel(dl => dl
    .Visible(true)
    .Template(
        "<div style='text-align:center; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); " +
        "color:white; padding:8px 12px; border-radius:20px; box-shadow:0 2px 8px rgba(0,0,0,0.2);'>" +
        "<div style='font-size:16px; font-weight:bold;'>${point.x}</div>" +
        "<div style='font-size:20px; margin:5px 0;'>$${point.y}K</div>" +
        "<div style='font-size:12px; opacity:0.9;'>${point.percentage}%</div>" +
        "</div>"
    )
)
```

## Text Mapping

Map custom text from your data source to data labels:

```cshtml
@(Html.EJS().AccumulationChart("mappedText")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Name("Text")  // Map 'Text' field from data
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

```csharp
// Controller - Data with custom text
public ActionResult TextMapping()
{
    List<MappedData> data = new List<MappedData>
    {
        new MappedData { X = "Chrome", Y = 37, Text = "37% Market Share" },
        new MappedData { X = "Firefox", Y = 17, Text = "17% Market Share" },
        new MappedData { X = "Safari", Y = 19, Text = "19% Market Share" },
        new MappedData { X = "Edge", Y = 11, Text = "11% Market Share" },
        new MappedData { X = "Others", Y = 16, Text = "16% Market Share" }
    };
    return View(data);
}

public class MappedData
{
    public string X { get; set; }
    public double Y { get; set; }
    public string Text { get; set; }  // Custom text for labels
}
```

## Format Options

Format numeric values using standard format strings:

```cshtml
@(Html.EJS().AccumulationChart("formattedLabels")
    .Series(series =>
    {
        series.XName("Product")
              .YName("Revenue")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Format("c2")  // Currency with 2 decimal places
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

**Format String Options:**

| Format | Description | Input | Output |
|--------|-------------|-------|--------|
| `n0` | Number, 0 decimals | 1000 | 1,000 |
| `n1` | Number, 1 decimal | 1000 | 1,000.0 |
| `n2` | Number, 2 decimals | 1000 | 1,000.00 |
| `p0` | Percentage, 0 decimals | 0.37 | 37% |
| `p1` | Percentage, 1 decimal | 0.37 | 37.0% |
| `p2` | Percentage, 2 decimals | 0.3789 | 37.89% |
| `c0` | Currency, 0 decimals | 1000 | $1,000 |
| `c1` | Currency, 1 decimal | 1000 | $1,000.0 |
| `c2` | Currency, 2 decimals | 1000 | $1,000.00 |

**Examples:**

```cshtml
<!-- Show as percentages -->
.DataLabel(dl => dl.Visible(true).Format("p1"))

<!-- Show as currency -->
.DataLabel(dl => dl.Visible(true).Format("c0"))

<!-- Show as thousands -->
.DataLabel(dl => dl.Visible(true).Format("n1"))
```

## Connector Lines

Customize connector lines for outside labels:

```cshtml
@(Html.EJS().AccumulationChart("connectorLines")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                  .ConnectorStyle(cs => cs
                      .Type(Syncfusion.EJ2.Charts.ConnectorType.Curve)  // or Line
                      .Length("40px")
                      .Width(2)
                      .Color("#007bff")
                      .DashArray("5,3")
                  )
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

**Connector Properties:**

| Property | Type | Description | Values |
|----------|------|-------------|--------|
| `Type` | ConnectorType | Line style | `Line`, `Curve` |
| `Length` | string | Distance from chart | `"20px"`, `"30px"`, `"5%"` |
| `Width` | int | Line thickness | `1`, `2`, `3` |
| `Color` | string | Line color | `"#000"`, `"red"` |
| `DashArray` | string | Dash pattern | `"5,3"`, `"10,5"` |

**Connector Style Examples:**

```cshtml
<!-- Curved connectors (modern look) -->
.ConnectorStyle(cs => cs
    .Type(Syncfusion.EJ2.Charts.ConnectorType.Curve)
    .Length("30px")
    .Width(1)
    .Color("#95a5a6")
)

<!-- Straight dashed connectors -->
.ConnectorStyle(cs => cs
    .Type(Syncfusion.EJ2.Charts.ConnectorType.Line)
    .Length("25px")
    .Width(1)
    .DashArray("5,3")
    .Color("#34495e")
)
```

## Font Styling

Customize label font appearance:

```cshtml
@(Html.EJS().AccumulationChart("styledLabels")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside)
                  .Font(f => f
                      .FontFamily("Segoe UI, Arial, sans-serif")
                      .Size("14px")
                      .FontWeight("600")
                      .Color("white")
                      .FontStyle("normal")
                      .Opacity(1)
                  )
                  .Border(new { Width = 2, Color = "rgba(255, 255, 255, 0.3)" })
                  .Fill("transparent")
              )
              .DataSource(Model)              
              .Add();
    })
    .Render()
)
```

**Font Properties:**

| Property | Type | Description | Values |
|----------|------|-------------|--------|
| `FontFamily` | string | Font typeface | `"Arial"`, `"Segoe UI"` |
| `Size` | string | Font size | `"12px"`, `"14px"`, `"1em"` |
| `FontWeight` | string | Text weight | `"normal"`, `"bold"`, `"600"` |
| `Color` | string | Text color | `"#000"`, `"white"`, `"rgb(...)"`|
| `FontStyle` | string | Text style | `"normal"`, `"italic"` |
| `Opacity` | double | Transparency | `0.0` to `1.0` |

**Label Border and Background:**

```cshtml
.DataLabel(dl => dl
    .Visible(true)
    .Font(f => f.Color("#2c3e50").FontWeight("bold"))
    .Border(new { Width =2, Color = "#e74c3c" })
    .Fill("#ecf0f1")  // Background color
    .Rx(5)  // Border radius X
    .Ry(5)  // Border radius Y
)
```

## Text Wrapping

Wrap long label text to fit within constraints:

```cshtml
@(Html.EJS().AccumulationChart("wrappedLabels")
    .Series(series =>
    {
        series.XName("CategoryName")
              .YName("Value")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                  .TextWrap(Syncfusion.EJ2.Charts.TextWrap.Wrap)  // Enable wrapping
                  .MaxWidth(80)  // Maximum width in pixels
              )
              .DataSource(Model)
              .Add();
    })
    .Render()
)
```

**TextWrap Options:**

| Value | Description | Behavior |
|-------|-------------|----------|
| `Normal` | No wrapping | Text extends as needed |
| `Wrap` | Word wrap | Breaks at word boundaries |
| `AnyWhere` | Character wrap | Breaks anywhere to fit |

**Best Practices:**
- Set `MaxWidth` to prevent overflow
- Use with `Outside` positioning for better readability
- Test with longest expected label text
- Consider abbreviations for very long text

## Showing Percentages

### Method 1: Using TextRender Event

```cshtml
@(Html.EJS().AccumulationChart("percentageLabels")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .Add();
    })
    .TextRender("textRenderHandler")
    .Render()
)

<script>
    function textRenderHandler(args) {
        args.text = args.point.percentage + "%";
    }
</script>
```

### Method 2: Using Template

```cshtml
@(Html.EJS().AccumulationChart("percentageTemplate")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Template("<div style='font-weight:bold; color:#2c3e50;'>" +
                            "${point.x}<br/>" +
                            "<span style='font-size:18px; color:#e74c3c;'>${point.percentage}%</span>" +
                            "</div>")
              )
              .DataSource(Model)
              .Add();
    })
    .Render()
)
```

### Method 3: With Value and Percentage

```cshtml
<script>
    function showValueAndPercentage(args) {
        args.text = args.point.y + " (" + args.point.percentage + "%)";
    }
</script>

@(Html.EJS().AccumulationChart("valueAndPercentage")
    .Series(series =>
    {
        series.XName("Product")
              .YName("Sales")
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)              
              .Add();
    })
    .TextRender("showValueAndPercentage")
    .Render()
)
```

## Customization

Customize individual labels using the `TextRender` event:

```cshtml
@(Html.EJS().AccumulationChart("customLabels")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)              
              .Add();
    })
    .TextRender("customizeLabelText")
    .Render()
)

<script>
    function customizeLabelText(args) {
        // Highlight largest value
        if (args.point.y === Math.max(...args.series.points.map(p => p.y))) {
            args.color = "#e74c3c";
            args.border.color = "#c0392b";
            args.border.width = 2;
            args.font.size = "16px";
            args.font.fontWeight = "bold";
        }
        
        // Color code by value range
        if (args.point.y > 30) {
            args.color = "#27ae60";  // Green for high values
        } else if (args.point.y > 15) {
            args.color = "#f39c12";  // Orange for medium
        } else {
            args.color = "#e74c3c";  // Red for low
        }
        
        // Custom text format
        args.text = args.point.x + ": $" + args.point.y + "K";
    }
</script>
```

**TextRender Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `args.text` | string | Label text (modifiable) |
| `args.point` | object | Data point (x, y, percentage) |
| `args.series` | object | Series information |
| `args.color` | string | Label color |
| `args.border` | object | Border styling |
| `args.font` | object | Font properties |

## Complete Example

Here's a comprehensive example with multiple label features:

```cshtml
@(Html.EJS().AccumulationChart("comprehensiveLabels")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)              
              .XName("Product")
              .YName("Sales")
              .PointColorMapping("Color")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                  .Name("LabelText")
                  .Font(f => f
                      .FontFamily("Segoe UI, Arial")
                      .Size("12px")
                      .FontWeight("600")
                      .Color("#2c3e50")
                  )
                  .ConnectorStyle(cs => cs
                      .Type(Syncfusion.EJ2.Charts.ConnectorType.Curve)
                      .Length("30px")
                      .Width(2)
                      .Color("#95a5a6")
                  )
                  .Border(new {Width = 1, Color= "#ecf0f1"})                  
                  .Fill("white")
                  .Rx(3)
                  .Ry(3)
              )
              .DataSource(Model)
              .Add();
    })
    .Title("Quarterly Sales Analysis")
    .EnableSmartLabels(true)
    .EnableAnimation(true)
    .TextRender("enhanceLabels")
    .Render()
)

<script>
    function enhanceLabels(args) {
        // Add currency symbol and thousands separator
        var value = args.point.y.toLocaleString('en-US');
        args.text = "$" + value + " (" + args.point.percentage.toFixed(1) + "%)";
    }
</script>
```

## Best Practices

### Label Visibility
1. **Limit Data Points:** 3-10 points for optimal readability
2. **Choose Inside or Outside:** Based on segment size
3. **Enable Smart Labels:** Always for outside positioning
4. **Test Responsive:** Verify labels on different screen sizes

### Content Guidelines
1. **Be Concise:** Short text prevents overflow
2. **Consistent Format:** Use same format for all labels
3. **Meaningful Info:** Show what matters (value, percentage, or both)
4. **Avoid Redundancy:** Don't repeat legend information

### Visual Design
1. **Readable Fonts:** Size 12px+ for accessibility
2. **Sufficient Contrast:** Dark text on light segments, vice versa
3. **Connector Lines:** Subtle, not distracting
4. **Spacing:** Adequate padding in templates

### Performance
1. **Simple Templates:** Complex HTML impacts rendering
2. **Conditional Display:** Hide labels for tiny segments
3. **Batch Updates:** Use events efficiently

### Accessibility
1. **Font Size:** Minimum 12px for readability
2. **Color Contrast:** WCAG AA compliance (4.5:1 ratio)
3. **Alternative Text:** Provide data table or description
4. **Screen Readers:** Ensure semantic HTML in templates

## See Also

- [Pie and Doughnut Charts](pie-and-doughnut-charts.md) - Chart type implementations
- [Legend](legend.md) - Complementary legend configuration
- [Tooltip and Interactions](tooltip-and-interactions.md) - Alternative data display methods
