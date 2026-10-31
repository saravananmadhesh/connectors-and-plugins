# Tooltip and Interactions

## Table of Contents
- [Overview](#overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Headers](#tooltip-headers)
- [Tooltip Format](#tooltip-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Templates](#tooltip-templates)
- [Fixed Tooltip Position](#fixed-tooltip-position)
- [Tooltip Customization](#tooltip-customization)
- [Individual Tooltip Customization](#individual-tooltip-customization)
- [Tooltip Mapping](#tooltip-mapping)
- [Enable Highlight](#enable-highlight)
- [Point Selection](#point-selection)
- [Point Explosion](#point-explosion)
- [Mouse Events](#mouse-events)
- [Animation](#animation)
- [Print Functionality](#print-functionality)
- [Export Functionality](#export-functionality)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)
  - [Tooltips](#tooltips)
  - [Selection](#selection)
  - [Interactions](#interactions)
  - [Performance](#performance)
  - [Export](#export)
- [See Also](#see-also)

## Overview

Tooltips and interactions enhance user engagement by providing detailed information on hover, enabling selection, and supporting data exploration through visual feedback and events.

**Key Interactive Features:**
- **Tooltips:** Show data on hover
- **Selection:** Click to select/highlight points
- **Explosion:** Separate segments for emphasis
- **Events:** Respond to user actions
- **Print/Export:** Generate outputs

## Enabling Tooltips

Enable tooltips using the `Tooltip` settings:

```cshtml
@(Html.EJS().AccumulationChart("tooltipChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Tooltip(t => t.Enable(true))  // Enable tooltip
    .Render()
)
```

```csharp
// Controller
public ActionResult TooltipChart()
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

**Default Tooltip Content:**
- Point x value (category name)
- Point y value (numeric value)

## Tooltip Headers

Add custom headers to tooltips:

```cshtml
@(Html.EJS().AccumulationChart("headerTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Header("Product Sales")  // Custom header text
    )
    .Render()
)
```

**Dynamic Headers:**

```cshtml
.Tooltip(t => t
    .Enable(true)
    .Header("<b>Q1 2026 Sales</b>")  // HTML formatting allowed
)
```

## Tooltip Format

Customize tooltip content using format strings:

```cshtml
@(Html.EJS().AccumulationChart("formattedTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Region")
              .YName("Revenue")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Format("${point.x}: <b>${point.y}K</b>")  // Custom format
    )
    .Render()
)
```

**Format Placeholders:**

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `${point.x}` | Category name | "Electronics" |
| `${point.y}` | Numeric value | 37 |
| `${point.percentage}` | Percentage | 37 |
| `${series.name}` | Series name | "Sales 2026" |
| `${point.text}` | Mapped text field | Custom text |

**Format Examples:**

```cshtml
<!-- Show value with currency -->
.Format("${point.x}: <b>$${point.y}M</b>")

<!-- Show percentage only -->
.Format("${point.x}: <b>${point.percentage}%</b>")

<!-- Show value and percentage -->
.Format("${point.x}<br/>Value: ${point.y}<br/>Share: ${point.percentage}%")

<!-- With series name -->
.Format("<b>${series.name}</b><br/>${point.x}: ${point.y}")
```

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `Format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

A format specifier can be applied by adding a colon (`:`) after the tooltip token, followed by the required format.

For example:

```cshtml
@(Html.EJS().AccumulationChart("inlineFormattedTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Region")
              .YName("Revenue")
              .Name("Sales 2026")
              .Opacity(0.8)
              .Add();
    })
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .Format(
            "${series.name}<br/>" +
            "${point.x}: <b>${point.y:n2}K</b><br/>" +
            "Share: ${point.percentage:n1}%<br/>" +
            "Opacity: ${series.opacity}"
        )
    )
    .Render()
)
```

In the above example, `point.y` is displayed with two decimal places, `point.percentage` is displayed with one decimal place, and `series.opacity` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the x-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric y-value of the data point.
- `${point.percentage}` or `${point.percentage:n1}`: Specifies the percentage contribution of the point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series, such as `Pie`, `Doughnut`, `Pyramid`, or `Funnel`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the Accumulation Chart series type. The `series.name` and `series.type` tokens return string values, so DateTime or number formatting is not applied to these tokens.

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

Create rich tooltip content with HTML templates:

```cshtml
@(Html.EJS().AccumulationChart("templateTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Template("<div style='padding:10px; background:#fff; border:2px solid ${point.color}; border-radius:5px;'>" +
                  "<div style='font-size:14px; font-weight:bold; color:#2c3e50; margin-bottom:5px;'>${point.x}</div>" +
                  "<div style='font-size:12px; color:#7f8c8d;'>Sales: <b style='color:${point.color};'>$${point.y}K</b></div>" +
                  "<div style='font-size:11px; color:#95a5a6;'>Market Share: ${point.percentage}%</div>" +
                  "</div>")
    )
    .Render()
)
```

**Template with Icons:**

```cshtml
.Template(
    "<div style='padding:12px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); " +
    "color:white; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15); min-width:150px;'>" +
    "<div style='display:flex; align-items:center; margin-bottom:8px;'>" +
    "<svg width='20' height='20' style='margin-right:8px;'>" +
    "<circle cx='10' cy='10' r='8' fill='${point.color}' stroke='white' stroke-width='2'/>" +
    "</svg>" +
    "<span style='font-size:15px; font-weight:bold;'>${point.x}</span>" +
    "</div>" +
    "<div style='font-size:13px; margin-bottom:4px;'>Revenue: <b>$${point.y}M</b></div>" +
    "<div style='font-size:12px; opacity:0.9;'>Share: <b>${point.percentage}%</b></div>" +
    "</div>"
)
```

**Template with Chart:**

```cshtml
.Template(
    "<div style='padding:10px; background:white; border:1px solid #ddd; border-radius:4px;'>" +
    "<div style='font-weight:bold; margin-bottom:5px;'>${point.x}</div>" +
    "<div style='display:flex; align-items:center;'>" +
    "<div style='flex:1; background:#ecf0f1; height:6px; border-radius:3px; margin-right:8px;'>" +
    "<div style='background:${point.color}; width:${point.percentage}%; height:100%; border-radius:3px;'></div>" +
    "</div>" +
    "<span style='font-size:12px; font-weight:600;'>${point.percentage}%</span>" +
    "</div>" +
    "<div style='font-size:11px; color:#7f8c8d; margin-top:4px;'>Value: ${point.y}</div>" +
    "</div>"
)
```

## Fixed Tooltip Position

Set a fixed tooltip position instead of following the mouse:

```cshtml
@(Html.EJS().AccumulationChart("fixedTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Location(new { X = 100, Y = 100 })
    )
    .Render()
)
```

**Use Cases:**
- Consistent tooltip position in presentations
- Prevent tooltip from obscuring important areas
- Fixed dashboard layouts

## Tooltip Customization

Style tooltip appearance:

```cshtml
@(Html.EJS().AccumulationChart("styledTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Fill("#2c3e50")  // Background color
        .Border(b => b
            .Width(2)
            .Color("#e74c3c")
        )
        .TextStyle(ts => ts
            .FontFamily("Segoe UI, Arial")
            .Size("13px")
            .Color("white")
            .FontWeight("500")
        )
        .Opacity(0.95)
        .Format("${point.x}: <b>${point.y}</b>")
    )
    .HighlightColor("#ff6b6b")  // Point highlight color on hover
    .Render()
)
```

**Styling Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Fill` | string | Background color |
| `Opacity` | double | Transparency (0-1) |
| `Border.Width` | int | Border thickness |
| `Border.Color` | string | Border color |
| `TextStyle` | object | Font properties |
| `HighlightColor` | string | Point highlight color |

## Individual Tooltip Customization

Customize tooltips for specific points using the `TooltipRender` event:

```cshtml
@(Html.EJS().AccumulationChart("individualTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Tooltip(t => t.Enable(true))
    .TooltipRender("customizeTooltip")
    .Render()
)

<script>
    function customizeTooltip(args) {
        // Customize based on value
        if (args.point.y > 30) {
            args.fill = "#27ae60";  // Green for high values
            args.border.color = "#229954";
            args.text = ["<b>Top Performer!</b>", args.point.x + ": $" + args.point.y + "K"];
        } else if (args.point.y < 15) {
            args.fill = "#e74c3c";  // Red for low values
            args.border.color = "#c0392b";
            args.text = ["<b>Needs Attention</b>", args.point.x + ": $" + args.point.y + "K"];
        } else {
            args.fill = "#3498db";  // Blue for medium
        }
        
        // Custom per point
        if (args.point.x === "Electronics") {
            args.fill = "#9b59b6";
            args.border.width = 3;
        }
    }
</script>
```

**TooltipRender Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `args.text` | string[] | Tooltip text lines (modifiable) |
| `args.point` | object | Data point info |
| `args.fill` | string | Background color |
| `args.border` | object | Border styling |
| `args.textStyle` | object | Font properties |

## Tooltip Mapping

Display additional data from your datasource in tooltips:

```cshtml
@(Html.EJS().AccumulationChart("mappedTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .TooltipMappingName("TooltipInfo")  // Map field from data
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Format("${point.x}<br/>${point.tooltip}")  // Use mapped data
    )
    .Render()
)
```

```csharp
// Controller - Data with tooltip info
public ActionResult MappedTooltip()
{
    List<TooltipData> data = new List<TooltipData>
    {
        new TooltipData { 
            Product = "Electronics", 
            Sales = 37, 
            TooltipInfo = "Revenue: $37M | Growth: +15%" 
        },
        new TooltipData { 
            Product = "Clothing", 
            Sales = 25, 
            TooltipInfo = "Revenue: $25M | Growth: +8%" 
        },
        new TooltipData { 
            Product = "Food", 
            Sales = 20, 
            TooltipInfo = "Revenue: $20M | Growth: +3%" 
        }
    };
    return View(data);
}

public class TooltipData
{
    public string Product { get; set; }
    public double Sales { get; set; }
    public string TooltipInfo { get; set; }
}
```

## Enable Highlight

Enhance focus by highlighting the hovered slice while dimming others:

```cshtml
@(Html.EJS().AccumulationChart("highlightTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .EnableHighlight(true)  // Highlight hovered slice, dim others
    )
    .Render()
)
```

**Visual Effect:**
- Hovered slice: Full opacity
- Other slices: Reduced opacity (dimmed)
- Improves focus and clarity

## Point Selection

Enable clicking to select chart points:

```cshtml
@(Html.EJS().AccumulationChart("selectable")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .SelectionPattern(Syncfusion.EJ2.Charts.SelectionPattern.DiagonalForward)
    .Render()
)
```

**Selection Modes:**

| Mode | Description | Behavior |
|------|-------------|----------|
| `None` | No selection | Default |
| `Point` | Single point selection | One at a time |
| `Cluster` | Multiple point selection | Click to toggle |

**Selection Patterns:**

| Pattern | Visual Effect |
|---------|---------------|
| `None` | Solid selection |
| `Dots` | Dotted pattern |
| `DiagonalBackward` | Diagonal lines (\) |
| `DiagonalForward` | Diagonal lines (/) |
| `Chessboard` | Checkerboard |
| `Crosshatch` | Cross-hatch |
| `Grid` | Grid pattern |

**Example with Multiple Selection:**

```cshtml
@(Html.EJS().AccumulationChart("multiSelect")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .IsMultiSelect(true)  // Allow multiple selections
    .Render()
)
```

## Point Explosion

Enable points to "explode" (separate) on click:

```cshtml
@(Html.EJS().AccumulationChart("explodable")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Explode(true)              // Enable explosion
              .ExplodeOffset("10%")       // Separation distance
              .ExplodeIndex(2)            // Auto-explode index 2
              .ExplodeAll(false)          // Explode one at a time
              .Add();
    })
    .Render()
)
```

**Explosion Properties:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `Explode` | bool | Enable explosion | `true` |
| `ExplodeOffset` | string | Distance | `"10%"`, `"20px"` |
| `ExplodeIndex` | int | Auto-explode point | `0`, `2` |
| `ExplodeAll` | bool | Explode all points | `false` |

## Mouse Events

Respond to user interactions with event handlers:

```cshtml
@(Html.EJS().AccumulationChart("eventChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .PointClick("onPointClick")
    .PointMove("onPointMove")
    .ChartMouseClick("onChartClick")
    .ChartMouseMove("onChartMove")
    .Render()
)

<script>
    function onPointClick(args) {
        console.log("Point clicked:", args.point.x, args.point.y);
        alert("Clicked: " + args.point.x + " - " + args.point.y);
    }
    
    function onPointMove(args) {
        console.log("Mouse over point:", args.point.x);
        // Update external UI, trigger animations, etc.
    }
    
    function onChartClick(args) {
        console.log("Chart clicked at:", args.x, args.y);
    }
    
    function onChartMove(args) {
        // Track mouse position
    }
</script>
```

**Available Events:**

| Event | Trigger | Use Case |
|-------|---------|----------|
| `PointClick` | Click on point | Selection, drill-down |
| `PointMove` | Hover over point | Preview, highlight |
| `ChartMouseClick` | Click anywhere on chart | Navigation, reset |
| `ChartMouseMove` | Mouse moves on chart | Tracking, custom tooltips |

## Animation

Configure chart animations:

```cshtml
@(Html.EJS().AccumulationChart("animated")
    .Series(series =>
    {
        series.XName("Category")
              .YName("Value")
              .Animation(anim => anim
                  .Enable(true)
                  .Duration(1500)
                  .Delay(100)
              )
              .DataSource(Model)              
              .Add();
    })
    .EnableAnimation(true)
    .Render()
)
```

**Animation Properties:**

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Enable` | bool | Enable animation | true |
| `Duration` | int | Animation time (ms) | 1000 |
| `Delay` | int | Start delay (ms) | 0 |

## Print Functionality

Enable printing directly from the browser:

```cshtml
@(Html.EJS().AccumulationChart("printable")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Render()
)

<button onclick="printChart()">Print Chart</button>

<script>
    function printChart() {
        var chart = document.getElementById("printable").ej2_instances[0];
        chart.print();
    }
</script>
```

**Keyboard Shortcut:** Users can press `Ctrl+P` when chart is focused.

## Export Functionality

Export charts to various formats:

```cshtml
@(Html.EJS().AccumulationChart("exportable")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Render()
)

<button onclick="exportPNG()">Export PNG</button>
<button onclick="exportPDF()">Export PDF</button>
<button onclick="exportSVG()">Export SVG</button>
<button onclick="exportJPEG()">Export JPEG</button>

<script>
    var chartObj;
    
    function exportPNG() {
        chartObj = document.getElementById("exportable").ej2_instances[0];
        chartObj.export('PNG', 'SalesChart');
    }
    
    function exportPDF() {
        chartObj = document.getElementById("exportable").ej2_instances[0];
        chartObj.export('PDF', 'SalesChart');
    }
    
    function exportSVG() {
        chartObj = document.getElementById("exportable").ej2_instances[0];
        chartObj.export('SVG', 'SalesChart');
    }
    
    function exportJPEG() {
        chartObj = document.getElementById("exportable").ej2_instances[0];
        chartObj.export('JPEG', 'SalesChart');
    }
</script>
```

**Export Formats:**

| Format | Use Case | Quality |
|--------|----------|---------|
| `PNG` | Web, presentations | High, transparent background |
| `JPEG` | Photos, prints | High, smaller file size |
| `SVG` | Scalable graphics | Vector, infinite scaling |
| `PDF` | Documents, reports | Print-ready |

## Complete Example

Comprehensive interactive chart:

```cshtml
@(Html.EJS().AccumulationChart("interactiveChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .PointColorMapping("Color")
              .Explode(true)
              .ExplodeOffset("10%")
              .ExplodeIndex(0)
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .EnableHighlight(true)
        .Format("${point.x}: <b>$${point.y}M</b><br/>Share: ${point.percentage}%")
        .Fill("#2c3e50")
        .TextStyle(ts => ts.Color("white").FontWeight("500"))
        .Border(b => b.Width(2).Color("#3498db"))
    )
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .SelectionPattern(Syncfusion.EJ2.Charts.SelectionPattern.DiagonalForward)
    .EnableAnimation(true)
    .EnableSmartLabels(true)
    .PointClick("handlePointClick")
    .Title("Interactive Sales Analysis - Q1 2026")
    .LegendSettings(ls => ls.Visible(true).ToggleVisibility(true))
    .Render()
)

<div style="margin-top:15px;">
    <button onclick="printChart()" class="btn">Print</button>
    <button onclick="exportPDF()" class="btn">Export PDF</button>
    <button onclick="exportPNG()" class="btn">Export PNG</button>
</div>

<script>
    function handlePointClick(args) {
        console.log("Product:", args.point.x, "Sales:", args.point.y);
        // Implement drill-down, show details, etc.
    }
    
    function printChart() {
        var chart = document.getElementById("interactiveChart").ej2_instances[0];
        chart.print();
    }
    
    function exportPDF() {
        var chart = document.getElementById("interactiveChart").ej2_instances[0];
        chart.export('PDF', 'Q1-Sales-Analysis');
    }
    
    function exportPNG() {
        var chart = document.getElementById("interactiveChart").ej2_instances[0];
        chart.export('PNG', 'Q1-Sales-Analysis');
    }
</script>
```

## Best Practices

### Tooltips
1. **Concise Content:** Show relevant data without overwhelming
2. **Consistent Format:** Use same format across all points
3. **Readable Styling:** Good contrast, appropriate font size (12px+)
4. **Response Time:** Appear quickly on hover (<200ms feel instant)
5. **Templates:** Use for rich content, but keep simple for performance

### Selection
1. **Visual Feedback:** Clear indication of selected state
2. **Deselection:** Allow easy deselection (click again or elsewhere)
3. **Multiple Selection:** Make it obvious (Ctrl+Click pattern)
4. **Use Cases:** Comparison, filtering, drill-down

### Interactions
1. **Discoverable:** Provide visual cues (cursor changes, highlights)
2. **Consistent:** Same interaction patterns across features
3. **Reversible:** Allow undo/reset actions
4. **Accessible:** Keyboard navigation for all interactions

### Performance
1. **Throttle Events:** Don't update on every mouse move
2. **Lightweight Templates:** Complex HTML impacts tooltip rendering
3. **Conditional Features:** Disable unused interactions
4. **Animation Duration:** 500-1500ms feels smooth without delays

### Export
1. **Multiple Formats:** Offer PNG, PDF, SVG options
2. **Clear Naming:** Use descriptive filenames
3. **High Quality:** Ensure readable exports at target size
4. **Test:** Verify exports in actual use cases (print, web, presentations)

## See Also

- [Data Labels](data-labels.md) - Alternative data display method
- [Legend](legend.md) - Legend interaction and toggle visibility
- [Accessibility](accessibility.md) - Keyboard navigation and interactions
