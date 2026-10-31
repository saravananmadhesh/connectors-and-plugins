# Legend

## Table of Contents
- [Overview](#overview)
- [Enabling and Basic Configuration](#enabling-and-basic-configuration)
- [Position and Alignment](#position-and-alignment)
  - [Position Options](#position-options)
  - [Alignment Options](#alignment-options)
  - [Custom Positioning](#custom-positioning)
- [Legend Reverse](#legend-reverse)
- [Legend Shape](#legend-shape)
- [Legend Size](#legend-size)
- [Legend Item Size](#legend-item-size)
- [Paging](#paging)
- [Text Wrapping](#text-wrapping)
- [Click Animation](#click-animation)
- [Legend Title](#legend-title)
- [Arrow Page Navigation](#arrow-page-navigation)
- [Item Padding](#item-padding)
- [Legend Layout](#legend-layout)
- [Legend Templates](#legend-templates)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)
  - [Positioning](#positioning)
  - [Content](#content)
  - [Visual Design](#visual-design)
  - [Responsive Design](#responsive-design)
  - [Accessibility](#accessibility)
  - [Performance](#performance)
- [See Also](#see-also)

## Overview

Legends provide a visual reference that maps colors, shapes, or patterns in the chart to their corresponding data categories. They help users identify what each segment represents without hovering or clicking.

**When to Use Legends:**
- Multiple data categories need identification
- Colors alone are not self-explanatory
- Chart is used in presentations or printed materials
- Accessibility requirements (color-blind users)
- Interactive series toggling is desired

**Default Behavior:**
- Automatically positioned based on chart dimensions
- Right position for wide charts
- Bottom position for tall charts

## Enabling and Basic Configuration

Enable the legend by setting `Visible` to `true`:

```cshtml
@(Html.EJS().AccumulationChart("withLegend")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .LegendSettings(ls => ls.Visible(true))  // Enable legend
    .Render()
)
```

```csharp
// Controller
public ActionResult WithLegend()
{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Category = "Chrome", Value = 37 },
        new ChartData { Category = "Firefox", Value = 17 },
        new ChartData { Category = "Safari", Value = 19 },
        new ChartData { Category = "Edge", Value = 11 },
        new ChartData { Category = "Others", Value = 16 }
    };
    return View(data);
}
```

**Hiding Legend:**

```cshtml
.LegendSettings(ls => ls.Visible(false))  // Hide legend
```

## Position and Alignment

Control legend placement using `Position` and `Alignment` properties:

```cshtml
@(Html.EJS().AccumulationChart("positionedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
        .Alignment(Syncfusion.EJ2.Charts.Alignment.Center)
    )
    .Render()
)
```

### Position Options

| Position | Description | Best For |
|----------|-------------|----------|
| `Auto` | Automatic based on chart size | Responsive layouts |
| `Top` | Above chart | Wide charts, space permitting |
| `Bottom` | Below chart | Standard dashboards |
| `Left` | Left side of chart | Tall charts |
| `Right` | Right side of chart | Wide charts (default) |
| `Custom` | Absolute positioning | Advanced layouts |

### Alignment Options

| Alignment | Description | Effect |
|-----------|-------------|--------|
| `Center` | Centered in position | Balanced appearance |
| `Near` | Left/Top aligned | Flush with chart edge |
| `Far` | Right/Bottom aligned | Opposite edge alignment |

**Examples:**

```cshtml
<!-- Bottom-centered (common for dashboards) -->
.LegendSettings(ls => ls
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Center)
)

<!-- Right-aligned at top -->
.LegendSettings(ls => ls
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Top)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Far)
)

<!-- Left side, centered vertically -->
.LegendSettings(ls => ls
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Left)
    .Alignment(Syncfusion.EJ2.Charts.Alignment.Center)
)
```

### Custom Positioning

Place legend at exact coordinates:

```cshtml
.LegendSettings(ls => ls
    .Visible(true)
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Custom)
    .Location(new Syncfusion.EJ2.Charts.AccumulationChartLocation { X = 100, Y = 50 })
)
```

## Legend Reverse

Reverse the order of legend items:

```cshtml
@(Html.EJS().AccumulationChart("reversedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Reverse(true)  // Reverse legend order
    )
    .Render()
)
```

**Use Cases:**
- Match visual order (top to bottom in chart = top to bottom in legend)
- Follow data priority (highest values first)
- Align with specific presentation requirements

## Legend Shape

Customize the icon shape for legend items:

```cshtml
@(Html.EJS().AccumulationChart("shapedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Circle)
              .Add();
    })
    .LegendSettings(ls => ls.Visible(true))
    .Render()
)
```

**Available Shapes:**

| Shape | Description | Use Case |
|-------|-------------|----------|
| `SeriesType` | Matches chart type (default) | Consistency |
| `Circle` | Circular marker | Clean, modern |
| `Rectangle` | Rectangular marker | Traditional |
| `Triangle` | Triangle marker | Distinctive |
| `Diamond` | Diamond marker | Elegant |
| `Pentagon` | Pentagon marker | Unique |
| `InvertedTriangle` | Upside-down triangle | Alternative marker |
| `Image` | Custom image | Branded legends |

**Example with Multiple Shapes:**

```cshtml
@(Html.EJS().AccumulationChart("multiShape")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Diamond)
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .ShapeHeight(15)
        .ShapeWidth(15)
    )
    .Render()
)
```

## Legend Size

Control overall legend container dimensions:

```cshtml
@(Html.EJS().AccumulationChart("sizedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Width("200px")   // Legend container width
        .Height("150px")  // Legend container height
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    )
    .Render()
)
```

**Size Guidelines:**

| Position | Width | Height | Notes |
|----------|-------|--------|-------|
| **Left/Right** | 150-250px | Auto | Fixed width, flowing height |
| **Top/Bottom** | Auto | 50-100px | Flowing width, fixed height |
| **Responsive** | % values | % values | Adapts to container |

**Responsive Sizing:**

```cshtml
.LegendSettings(ls => ls
    .Visible(true)
    .Width("20%")    // 20% of chart width
    .Height("100px") // Fixed height
)
```

## Legend Item Size

Customize individual legend item icon dimensions:

```cshtml
@(Html.EJS().AccumulationChart("itemSized")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Value")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .ShapeHeight(20)  // Icon height in pixels
        .ShapeWidth(20)   // Icon width in pixels
        .ShapePadding(10) // Space between icon and text
    )
    .Render()
)
```

**Size Recommendations:**

| Size | ShapeHeight | ShapeWidth | Use Case |
|------|-------------|------------|----------|
| **Small** | 8-10px | 8-10px | Compact legends |
| **Medium** | 12-15px | 12-15px | Standard (default) |
| **Large** | 18-25px | 18-25px | Emphasis, accessibility |

## Paging

Automatically page legend items when they exceed available space:

```cshtml
@(Html.EJS().AccumulationChart("pagedLegend")
    .Series(series =>
    {
        series.DataSource(Model)  // Large dataset
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
        .Height("80px")  // Limited height triggers paging
    )
    .Render()
)
```

**Paging Features:**
- Automatically enabled when items exceed bounds
- Navigation buttons (Previous/Next)
- Page indicators
- Smooth transitions

**Custom Paging Configuration:**

```cshtml
.LegendSettings(ls => ls
    .Visible(true)
    .Height("100px")
    .Width("300px")
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    // Paging auto-enabled when content overflows
)
```

## Text Wrapping

Wrap long legend text to fit within constraints:

```cshtml
@(Html.EJS().AccumulationChart("wrappedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("LongCategoryName")
              .YName("Value")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .TextWrap(Syncfusion.EJ2.Charts.TextWrap.Wrap)
        .MaximumLabelWidth(100)  // Maximum width before wrapping
        .Width("150px")
    )
    .Render()
)
```

**TextWrap Options:**

| Option | Behavior | Use Case |
|--------|----------|----------|
| `Normal` | No wrapping, text truncates | Short, predictable labels |
| `Wrap` | Wrap at word boundaries | Long descriptive labels |
| `AnyWhere` | Wrap at any character | Very long single words |

**Best Practices:**
- Set `MaximumLabelWidth` to control wrapping point
- Test with longest expected label
- Allow sufficient legend height for wrapped text
- Consider abbreviations for very long labels

## Click Animation

Enable animation when clicking legend items to toggle series visibility:

```cshtml
@(Html.EJS().AccumulationChart("animatedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .ToggleVisibility(true)  // Enable click to toggle
    )
    .EnableAnimation(true)  // Smooth animation on toggle
    .Render()
)
```

**Interactive Behavior:**
1. User clicks legend item
2. Corresponding series fades out/in
3. Chart redraws to fill available space
4. Legend item appearance changes (dimmed/normal)

**Disable Toggle:**

```cshtml
.LegendSettings(ls => ls
    .Visible(true)
    .ToggleVisibility(false)  // Disable click interaction
)
```

## Legend Title

Add a title to the legend:

```cshtml
@(Html.EJS().AccumulationChart("titledLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Title("Product Categories")
        .TitleStyle(ts => ts
            .FontFamily("Segoe UI, Arial")
            .Size("16px")
            .FontWeight("bold")
            .Color("#2c3e50")
            .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
        )
        .TitlePosition(Syncfusion.EJ2.Charts.LegendTitlePosition.Top)
        .MaximumTitleWidth(200)
    )
    .Render()
)
```

**Title Properties:**

| Property | Type | Description | Values |
|----------|------|-------------|--------|
| `Title` | string | Title text | Any string |
| `TitlePosition` | enum | Title location | `Top`, `Left`, `Right` |
| `MaximumTitleWidth` | int | Max width (pixels) | Default: 100 |

**Title Styling:**

```cshtml
.TitleStyle(ts => ts
    .FontFamily("Arial, sans-serif")
    .Size("14px")
    .FontWeight("600")
    .Color("#34495e")
    .FontStyle("normal")
    .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    .TextOverflow(Syncfusion.EJ2.Charts.TextOverflow.Trim)  // or Wrap, Ellipsis
)
```

## Arrow Page Navigation

Use arrow buttons instead of page numbers for navigation:

```cshtml
@(Html.EJS().AccumulationChart("arrowPaged")
    .Series(series =>
    {
        series.DataSource(Model)  // Large dataset
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .EnablePages(false)  // Disable page numbers, show arrows only
        .Height("100px")
    )
    .Render()
)
```

**Navigation Styles:**

| EnablePages | Navigation UI |
|-------------|---------------|
| `true` (default) | Page numbers + arrows |
| `false` | Arrows only |

## Item Padding

Adjust spacing between legend items:

```cshtml
@(Html.EJS().AccumulationChart("paddedLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .ItemPadding(15)  // Horizontal and vertical padding in pixels
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    )
    .Render()
)
```

**Padding Guidelines:**

| Padding | Spacing | Use Case |
|---------|---------|----------|
| 5-8px | Compact | Space-constrained layouts |
| 10-12px | Standard | Default comfortable spacing |
| 15-20px | Spacious | Clean, modern designs |

## Legend Layout

Control legend item arrangement:

```cshtml
@(Html.EJS().AccumulationChart("layoutLegend")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Layout(Syncfusion.EJ2.Charts.LegendLayout.Auto)  // or Horizontal, Vertical
        .MaximumColumns(3)  // Max columns in auto layout
        .FixedWidth(true)   // Equal width for all items
    )
    .Render()
)
```

**Layout Options:**

| Layout | Description | Best For |
|--------|-------------|----------|
| `Auto` | Automatically arranges based on space | Responsive designs |
| `Horizontal` | Single horizontal row | Bottom/Top position |
| `Vertical` | Single vertical column | Left/Right position |

**Auto Layout with MaximumColumns:**

```cshtml
.LegendSettings(ls => ls
    .Visible(true)
    .Layout(Syncfusion.EJ2.Charts.LegendLayout.Auto)
    .MaximumColumns(4)  // Up to 4 columns, then wraps
    .FixedWidth(true)   // All items same width
    .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
)
```

**Fixed Width Example:**

```cshtml
// Equal-width legend items for clean alignment
.LegendSettings(ls => ls
    .Visible(true)
    .FixedWidth(true)    // All items same width
    .MaximumColumns(3)
    .Width("300px")
)
```

## Legend Templates

Create custom legend items with HTML templates:

```cshtml
@(Html.EJS().AccumulationChart("templateLegend")
    .Load("load")    
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
    )
    .Render()
)
<script>
    function load(args) {
        var chart = document.getElementById('templateLegend').ej2_instances[0];
        chart.legendSettings.template = "<div style='display:flex; align-items:center; padding:5px;'>" +
                  "<div style='width:20px; height:20px; background:${color}; border-radius:50%; margin-right:10px;'></div>" +
                  "<div>" +
                  "<div style='font-weight:bold; color:#2c3e50;'>${text}</div>" +
                  "<div style='font-size:11px; color:#7f8c8d;'>${y} units</div>" +
                  "</div>" +
                  "</div>";
    }
</script>
```

**Template Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `${text}` | Point label/name | "Electronics" |
| `${y}` | Data value | 37 |
| `${color}` | Point color | "#498fff" |
| `${percentage}` | Percentage value | 37 |

**Advanced Template Example:**

```cshtml
<script>
    function load(args) {
        var chart = document.getElementById('templateLegend').ej2_instances[0];
        chart.legendSettings.template = "<div style='display:flex; align-items:center; padding:8px; " +
            "background:linear-gradient(90deg, ${color}22, transparent); " +
            "border-left:3px solid ${color}; margin:2px 0;'>" +
            "<div style='width:15px; height:15px; background:${color}; " +
            "border-radius:3px; margin-right:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);'></div>" +
            "<div style='flex:1;'>" +
            "<div style='font-size:13px; font-weight:600; color:#2c3e50;'>${text}</div>" +
            "<div style='font-size:11px; color:#7f8c8d;'>" +
            "Value: <b>${y}</b> | Share: <b>${percentage}%</b>" +
            "</div>" +
            "</div>" +
            "</div>";
    }
</script>
```

**Template with Icons:**

```cshtml
<script>
    function load(args) {
        var chart = document.getElementById('templateLegend').ej2_instances[0];
        chart.legendSettings.template = "<div style='display:inline-flex; align-items:center;'>" +
                "<svg width='16' height='16' style='margin-right:6px;'>" +
                "<circle cx='8' cy='8' r='6' fill='${color}' />" +
                "</svg>" +
                "<span style='font-size:13px;'>${text} (${percentage}%)</span>" +
                "</div>";
    }
</script>
```

## Complete Example

Comprehensive legend with all major features:

```cshtml
@(Html.EJS().AccumulationChart("comprehensiveLegend")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .PointColorMapping("Color")
              .LegendShape(Syncfusion.EJ2.Charts.LegendShape.Circle)
              .Add();
    })
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .Alignment(Syncfusion.EJ2.Charts.Alignment.Center)
        .Width("200px")
        .Height("250px")
        .ShapeHeight(12)
        .ShapeWidth(12)
        .ShapePadding(8)
        .ItemPadding(12)
        .Title("Sales Breakdown")
        .TitleStyle(ts => ts
            .FontFamily("Segoe UI")
            .Size("15px")
            .FontWeight("bold")
            .Color("#2c3e50")
            .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
        )
        .TitlePosition(Syncfusion.EJ2.Charts.LegendTitlePosition.Top)
        .TextStyle(ts => ts
            .FontFamily("Segoe UI")
            .Size("12px")
            .Color("#34495e")
        )
        .Border(b => b
            .Width(1)
            .Color("#ecf0f1")
        )
        .Background("white")
        .Opacity(1)
        .TextWrap(Syncfusion.EJ2.Charts.TextWrap.Wrap)
        .MaximumLabelWidth(150)
        .ToggleVisibility(true)
    )
    .EnableAnimation(true)
    .Title("Quarterly Product Sales")
    .Render()
)
```

## Best Practices

### Positioning
1. **Right Position:** Default for wide charts, doesn't interrupt reading flow
2. **Bottom Position:** Standard for dashboards, works well with multiple charts
3. **Top Position:** Use sparingly, can interfere with title
4. **Left Position:** Consider RTL layouts and reading patterns

### Content
1. **Clear Labels:** Descriptive names, not codes or abbreviations
2. **Consistent Order:** Match visual hierarchy or data importance
3. **Limit Items:** 5-10 items optimal; use grouping for more
4. **Toggle Interaction:** Enable for exploratory analysis

### Visual Design
1. **Shape Selection:** Circles for modern look, SeriesType for consistency
2. **Size Balance:** Icons visible but not dominant (12-15px typical)
3. **Adequate Spacing:** 10-12px item padding for touch-friendly UI
4. **Readable Fonts:** 11-13px size, good contrast

### Responsive Design
1. **Auto Layout:** Let legend adapt to available space
2. **Test Breakpoints:** Verify legend on mobile, tablet, desktop
3. **Paging:** Essential for variable data point counts
4. **Position Switching:** Consider different positions for different screen sizes

### Accessibility
1. **Font Size:** Minimum 11px, 12px+ preferred
2. **Color Contrast:** WCAG AA compliance (4.5:1 ratio)
3. **Interactive Elements:** Sufficient touch targets (44x44px minimum)
4. **Keyboard Navigation:** Ensure tab navigation works

### Performance
1. **Simple Templates:** Complex HTML impacts rendering speed
2. **Fixed Dimensions:** Prevent layout shifts on load
3. **Conditional Features:** Disable paging if not needed

## See Also

- [Data Labels](data-labels.md) - Complementary data display on chart
- [Tooltip and Interactions](tooltip-and-interactions.md) - Interactive data exploration
- [Pie and Doughnut Charts](pie-and-doughnut-charts.md) - Chart type implementations
