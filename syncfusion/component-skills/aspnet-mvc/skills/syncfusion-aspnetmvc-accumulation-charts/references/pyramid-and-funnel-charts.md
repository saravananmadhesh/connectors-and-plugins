# Pyramid and Funnel Charts

## Table of Contents
- [Overview](#overview)
- [Pyramid Charts](#pyramid-charts)
  - [Basic Pyramid Chart](#basic-pyramid-chart)
  - [Pyramid Mode](#pyramid-mode)
- [Funnel Charts](#funnel-charts)
  - [Basic Funnel Chart](#basic-funnel-chart)
  - [Neck Size Customization](#neck-size-customization)
- [Size Customization](#size-customization)
- [Gap Between Segments](#gap-between-segments)
- [Exploding Segments](#exploding-segments)
- [Point Customization](#point-customization)
- [Funnel Modes](#funnel-modes)
  - [Standard Mode (Default)](#standard-mode-default)
  - [Trapezoidal Mode](#trapezoidal-mode)
- [Smart Data Labels](#smart-data-labels)
- [Complete Example: Sales Funnel](#complete-example-sales-funnel)
- [Best Practices](#best-practices)
  - [Pyramid Charts Best Practices](#pyramid-charts-best-practices)
  - [Funnel Charts Best Practices](#funnel-charts-best-practices)
  - [General Guidelines](#general-guidelines)
- [Common Use Cases](#common-use-cases)
  - [Pyramid Charts Use Cases](#pyramid-charts-use-cases)
  - [Funnel Charts Use Cases](#funnel-charts-use-cases)
- [See Also](#see-also)


## Overview

Pyramid and funnel charts are specialized accumulation charts used to represent hierarchical data and conversion processes:

**Pyramid Charts:**
- Visualize hierarchical data with decreasing quantities
- Widest part at top, narrowest at bottom
- Useful for organizational hierarchies, population demographics, wealth distribution

**Funnel Charts:**
- Track stages in a sequential process (e.g., sales pipeline, conversion funnel)
- Similar to pyramid but with customizable "neck" section
- Ideal for visualizing drop-off rates, conversion tracking, filtering processes

## Pyramid Charts

### Basic Pyramid Chart

Set the series `Type` property to `Pyramid`:

```cshtml
@(Html.EJS().AccumulationChart("pyramidChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .DataLabel(dl => dl.Visible(true).Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside))
              .DataSource(Model)
              .XName("Stage")
              .YName("Value")
              .Width("60%")
              .Height("80%")
              .Add();
    })
    .Title("Organizational Hierarchy")
    .Render()
)
```

```csharp
// Controller
public ActionResult PyramidChart()
{
    List<PyramidData> data = new List<PyramidData>
    {
        new PyramidData { Stage = "C-Level", Value = 10 },
        new PyramidData { Stage = "Directors", Value = 45 },
        new PyramidData { Stage = "Managers", Value = 180 },
        new PyramidData { Stage = "Team Leads", Value = 420 },
        new PyramidData { Stage = "Individual Contributors", Value = 1200 }
    };
    return View(data);
}

public class PyramidData
{
    public string Stage { get; set; }
    public double Value { get; set; }
}
```

### Pyramid Mode

Pyramids support two rendering modes: **Linear** (default) and **Surface**.

**Linear Mode:** Segments have equal height regardless of value
**Surface Mode:** Segment height proportional to value

```cshtml
@(Html.EJS().AccumulationChart("pyramidMode")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .XName("Category")
              .YName("Count")
              .PyramidMode(Syncfusion.EJ2.Charts.PyramidModes.Surface)  // or .Linear
              .Add();
    })
    .Title("Population Distribution (Surface Mode)")
    .Render()
)
```

**When to Use Each Mode:**

| Mode | Use Case | Visual Effect |
|------|----------|---------------|
| **Linear** | Equal importance to each stage | All segments same height |
| **Surface** | Proportional importance | Segment height varies by value |

**Example Comparison:**

```cshtml
<!-- Linear Mode -->
@(Html.EJS().AccumulationChart("pyramidLinear")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .PyramidMode(Syncfusion.EJ2.Charts.PyramidModes.Linear)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Title("Linear Mode - Equal Heights")
    .Render()
)

<!-- Surface Mode -->
@(Html.EJS().AccumulationChart("pyramidSurface")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .PyramidMode(Syncfusion.EJ2.Charts.PyramidModes.Surface)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Add();
    })
    .Title("Surface Mode - Proportional Heights")
    .Render()
)
```

## Funnel Charts

### Basic Funnel Chart

Set the series `Type` property to `Funnel`:

```cshtml
@(Html.EJS().AccumulationChart("funnelChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataLabel(dl => dl.Visible(true).Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside))
              .DataSource(Model)
              .XName("Stage")
              .YName("Users")
              .Width("60%")
              .Height("80%")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Title("Sales Conversion Funnel")
    .Render()
)
```

```csharp
// Controller
public ActionResult FunnelChart()
{
    List<FunnelData> data = new List<FunnelData>
    {
        new FunnelData { Stage = "Website Visits", Users = 50000 },
        new FunnelData { Stage = "Product Views", Users = 15000 },
        new FunnelData { Stage = "Add to Cart", Users = 7500 },
        new FunnelData { Stage = "Checkout Started", Users = 3200 },
        new FunnelData { Stage = "Order Completed", Users = 2100 }
    };
    return View(data);
}

public class FunnelData
{
    public string Stage { get; set; }
    public double Users { get; set; }
}
```

### Neck Size Customization

The "neck" is the narrow bottom section of a funnel chart. Customize it using `NeckWidth` and `NeckHeight`:

```cshtml
@(Html.EJS().AccumulationChart("customNeck")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .NeckWidth("25%")   // Width of neck (% of chart width)
              .NeckHeight("30%")  // Height of neck (% of chart height)
              .Add();
    })
    .Render()
)
```

**Guidelines:**

| Property | Range | Typical Value | Effect |
|----------|-------|---------------|--------|
| `NeckWidth` | 0% - 100% | 10% - 25% | Wider = less dramatic taper |
| `NeckHeight` | 0% - 100% | 15% - 30% | Taller = more vertical neck section |

**Visual Impact:**

```cshtml
<!-- Narrow Neck (dramatic) -->
.NeckWidth("10%")
.NeckHeight("15%")

<!-- Wide Neck (subtle) -->
.NeckWidth("30%")
.NeckHeight("35%")

<!-- No Neck (pyramid-like) -->
.NeckWidth("0%")
.NeckHeight("0%")
```

## Size Customization

Control the overall size of pyramid and funnel charts using `Width` and `Height` properties:

```cshtml
@(Html.EJS().AccumulationChart("sizedChart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Width("70%")   // 70% of chart container width
              .Height("90%")  // 90% of chart container height
              .Add();
    })
    .Render()
)
```

**Size Guidelines:**

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| **Small** | 40-50% | 50-60% | Multiple charts on page |
| **Medium** | 60-70% | 70-80% | Standard single chart |
| **Large** | 80-90% | 85-95% | Full-width dashboards |

**Responsive Sizing:**

```cshtml
@(Html.EJS().AccumulationChart("responsiveFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Width("80%")
              .Height("85%")
              .Add();
    })
    .Height("400px")  // Chart container height
    .Width("100%")    // Responsive width
    .Render()
)
```

## Gap Between Segments

Add spacing between segments using the `GapRatio` property (range: 0 to 1):

```cshtml
@(Html.EJS().AccumulationChart("gappedFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataLabel(dl => dl.Visible(true))
              .DataSource(Model)
              .XName("Stage")
              .YName("Count")
              .GapRatio(0.08)  // 8% gap between segments
              .Width("60%")
              .Height("80%")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Title("Funnel with Gaps")
    .Render()
)
```

**GapRatio Values:**

| Value | Gap Size | Visual Impact |
|-------|----------|---------------|
| `0` | No gap | Continuous funnel |
| `0.03` | Small gap | Subtle separation |
| `0.08` | Medium gap | Clear separation |
| `0.15` | Large gap | Distinct segments |
| `1` | Maximum gap | Very separated |

**Use Cases:**
- **No gap (0):** Traditional continuous funnel
- **Small gap (0.03-0.05):** Modern, clean look
- **Medium gap (0.08-0.12):** Emphasize stage separation
- **Large gap (0.15+):** Highlight individual stages

## Exploding Segments

Make segments "explode" (separate) from the main chart for emphasis:

```cshtml
@(Html.EJS().AccumulationChart("explodedFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .Explode(true)              // Enable explode on click
              .ExplodeOffset("10%")       // Distance to separate
              .ExplodeIndex(2)            // Auto-explode 3rd segment (0-indexed)
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Render()
)
```

**Explode Properties:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `Explode` | bool | Enable click-to-explode | `true` |
| `ExplodeOffset` | string | Distance to separate | `"10%"`, `"20px"` |
| `ExplodeIndex` | int | Auto-explode segment (0-based) | `0`, `2`, `4` |

**Interactive Explosion Example:**

```cshtml
@(Html.EJS().AccumulationChart("interactiveFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("Stage")
              .YName("Value")
              .Explode(true)
              .ExplodeOffset("15%")
              // No ExplodeIndex - let users click to explode
              .Add();
    })
    .Title("Click segments to explode")
    .Render()
)
```

## Point Customization

Customize individual segments using the `PointRender` event:

```cshtml
@(Html.EJS().AccumulationChart("customizedPyramid")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pyramid)
              .DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .PointRender("customizePoints")
    .Render()
)

<script>
    function customizePoints(args) {
        // Custom colors for specific segments
        var colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
        args.fill = colors[args.point.index % colors.length];
        
        // Highlight top segment
        if (args.point.index === 0) {
            args.fill = '#e74c3c';
            args.border.width = 3;
            args.border.color = '#c0392b';
        }
        
        // Custom styling for bottom segment
        if (args.point.index === args.data.length - 1) {
            args.fill = '#95a5a6';
        }
    }
</script>
```

**Advanced Customization:**

```cshtml
<script>
    function customizePoints(args) {
        // Gradient effect (lighten colors as you go down)
        var baseColor = { r: 52, g: 152, b: 219 };  // Blue
        var factor = args.point.index / args.data.length;
        
        var r = Math.floor(baseColor.r + (255 - baseColor.r) * factor);
        var g = Math.floor(baseColor.g + (255 - baseColor.g) * factor);
        var b = Math.floor(baseColor.b + (255 - baseColor.b) * factor);
        
        args.fill = `rgb(${r}, ${g}, ${b})`;
        
        // Add border to all segments
        args.border.width = 2;
        args.border.color = '#ffffff';
    }
</script>
```

## Funnel Modes

Funnel charts support **Standard** and **Trapezoidal** modes:

### Standard Mode (Default)

Continuous narrowing to a point at the bottom:

```cshtml
@(Html.EJS().AccumulationChart("standardFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .FunnelMode(Syncfusion.EJ2.Charts.FunnelModes.Standard)
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Title("Standard Funnel")
    .Render()
)
```

### Trapezoidal Mode

Modified funnel with flattened sections for clearer comparison:

```cshtml
@(Html.EJS().AccumulationChart("trapezoidalFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
              .DataSource(Model)
              .XName("X")
              .YName("Y")
              .FunnelMode(Syncfusion.EJ2.Charts.FunnelModes.Trapezoidal)
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .Title("Trapezoidal Funnel")
    .Render()
)
```

**Mode Comparison:**

| Mode | Visual | Use Case |
|------|--------|----------|
| **Standard** | Smooth continuous taper | Traditional conversion funnels |
| **Trapezoidal** | Flattened parallel sections | Easier value comparison |

## Smart Data Labels

Enable smart label arrangement to prevent overlapping labels:

```cshtml
@(Html.EJS().AccumulationChart("smartLabelsFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
        .DataLabel(dl => dl
    .Visible(true)
    .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
    .ConnectorStyle(cs => cs.Length("20px"))
)
              .DataSource(Model)
              .XName("Stage")
              .YName("Count")
              .Width("60%")
              .Height("80%")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .Add();
    })
    .EnableSmartLabels(true)  // Automatically arrange labels
    .Title("Funnel with Smart Labels")
    .Render()
)
```

## Complete Example: Sales Funnel

Here's a comprehensive sales conversion funnel with all features:

```cshtml
@(Html.EJS().AccumulationChart("salesFunnel")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Funnel)
         .DataLabel(dl => dl
     .Visible(true)
     .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Inside)
     .Font(f => f.FontWeight("600").Color("white"))
     .Template("<div>${point.x}: <b>${point.y}</b> (${point.percentage}%)</div>")
 )
              .DataSource(Model)
              .XName("Stage")
              .YName("Users")
              .Width("60%")
              .Height("80%")
              .NeckWidth("15%")
              .NeckHeight("18%")
              .GapRatio(0.08)
              .Explode(true)
              .ExplodeOffset("12%")
              .Add();
    })
    .Title("E-commerce Conversion Funnel - Q1 2026")
    .Tooltip(t => t
        .Enable(true)
        .Format("${point.x}: <b>${point.y} users</b><br/>Conversion: ${point.percentage}%")
    )
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
    )
    .EnableSmartLabels(true)
    .PointRender("customizeSegments")
    .Render()
)

<script>
    function customizeSegments(args) {
        var colors = ['#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#e74c3c'];
        args.fill = colors[args.point.index];
        args.border.width = 2;
        args.border.color = '#ecf0f1';
    }
</script>
```

```csharp
// Controller
public ActionResult SalesFunnel()
{
    List<ConversionData> data = new List<ConversionData>
    {
        new ConversionData { Stage = "Total Visitors", Users = 50000 },
        new ConversionData { Stage = "Signed Up", Users = 25000 },
        new ConversionData { Stage = "Product Added", Users = 15000 },
        new ConversionData { Stage = "Billing Info", Users = 8500 },
        new ConversionData { Stage = "Purchase Complete", Users = 6200 }
    };
    return View(data);
}

public class ConversionData
{
    public string Stage { get; set; }
    public double Users { get; set; }
}
```

## Best Practices

### Pyramid Charts Best Practices

1. **Top to Bottom:** Place highest value at top (natural reading pattern)
2. **3-7 Segments:** Optimal readability
3. **Linear vs Surface:** Choose based on whether equal visual weight or proportional representation is more important
4. **Labels:** Use inside labels for wide segments, outside for narrow
5. **Use Cases:** Hierarchies, demographic distributions, resource allocation

### Funnel Charts Best Practices

1. **Sequential Data:** Data must represent a progression (e.g., conversion steps)
2. **Neck Customization:** Adjust neck to emphasize final stages
3. **Gap Ratio:** Use 0.05-0.1 for modern, separated appearance
4. **Smart Labels:** Always enable to prevent overlap in tight sections
5. **Tooltips:** Essential for precise values
6. **Use Cases:** Conversion funnels, sales pipelines, recruitment processes, filtering workflows

### General Guidelines

1. **Color Coding:** Use color gradients (light to dark) to reinforce hierarchy
2. **Interactivity:** Enable explode for user exploration
3. **Data Labels:** Show values and percentages for conversion context
4. **Legends:** Usually optional (labels provide context)
5. **Responsive:** Test different container sizes
6. **Accessibility:** Provide keyboard navigation and alt text

## Common Use Cases

### Pyramid Charts Use Cases

- **Organizational Structure:** Employee hierarchy
- **Age Demographics:** Population distribution by age group
- **Economic Levels:** Wealth distribution
- **Educational Attainment:** Education levels in population
- **Food Chain:** Ecological pyramids

### Funnel Charts Use Cases

- **Sales Pipeline:** Lead → Opportunity → Quote → Close
- **E-commerce:** Visit → Browse → Cart → Checkout → Purchase
- **Recruitment:** Applications → Screening → Interview → Offer → Hire
- **Marketing:** Awareness → Interest → Consideration → Intent → Purchase
- **Customer Support:** Tickets → Triage → In Progress → Resolved
