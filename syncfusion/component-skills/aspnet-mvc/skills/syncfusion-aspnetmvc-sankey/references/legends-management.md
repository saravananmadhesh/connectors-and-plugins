# Legends Management in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Legend Basics](#legend-basics)
  - [What Legends Display](#what-legends-display)
  - [Basic Legend Configuration](#basic-legend-configuration)
  - [Typical model shape](#typical-model-shape)
- [Enabling and Disabling Legends](#enabling-and-disabling-legends)
  - [Show Legend](#show-legend)
  - [Hide Legend](#hide-legend)
  - [Toggle Legend Visibility](#toggle-legend-visibility)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Complete Positioning Example](#complete-positioning-example)
  - [Custom Positioning](#custom-positioning)
  - [Responsive Positioning](#responsive-positioning)
- [Legend Customization](#legend-customization)
  - [Background and Border](#background-and-border)
  - [Legend Title](#legend-title)
  - [Legend Label Styling](#legend-label-styling)
  - [Legend Item Padding](#legend-item-padding)
  - [Complete Customization Example](#complete-customization-example)
- [Dynamic Legend Creation](#dynamic-legend-creation)
  - [Important behavior note](#important-behavior-note)
- [Legend Item Rendering](#legend-item-rendering)
  - [Basic Legend Item Rendering Event](#basic-legend-item-rendering-event)
  - [Conditional Legend Item Styling](#conditional-legend-item-styling)
  - [Custom Legend Item Content](#custom-legend-item-content)
  - [Legend Hover Handling](#legend-hover-handling)
- [Common Legend Patterns](#common-legend-patterns)
  - [Pattern 1: Category Legend](#pattern-1-category-legend)
  - [Pattern 2: Source Node Legend](#pattern-2-source-node-legend)
  - [Pattern 3: Color Scale Legend](#pattern-3-color-scale-legend)
  - [Pattern 4: Compact Right-Side Legend](#pattern-4-compact-right-side-legend)
- [Best Practices](#best-practices)

---

## Legend Basics

A legend helps users understand the meaning of the node colors shown in the Sankey chart. In Syncfusion ASP.NET MVC Sankey, legend behavior is configured through `.LegendSettings(...)` on the Sankey helper, and the legend is driven by the Sankey nodes and their visual representation.

### What Legends Display

Legends in the Syncfusion ASP.NET MVC Sankey chart typically show:

- **Node categories or labels** represented in the diagram
- **Node color mapping** used in the chart
- **Interactive highlighting behavior** for related nodes and links when legend interaction is enabled

### Basic Legend Configuration

In ASP.NET MVC Sankey, the helper is bound with `.Nodes(...)` and `.Links(...)`. The Sankey helper does not use `.DataSource(...)`, `.From(...)`, `.To(...)`, or `.Weight(...)` for this component.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Typical model shape

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace YourProject.Models
{
    public class SankeyLegendViewModel
    {
        public List<SankeyNode> SankeyNodes { get; set; }
        public List<SankeyLink> SankeyLinks { get; set; }
    }
}
```

---

## Enabling and Disabling Legends

### Show Legend

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Hide Legend

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(false)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Toggle Legend Visibility

Toggling the built-in legend at runtime can be handled by updating the Sankey instance settings and refreshing the control.

```html
<button type="button" onclick="toggleLegend()">Toggle Legend</button>

<script>
    function toggleLegend() {
        var sankeyInstance = document.getElementById("sankey").ej2_instances[0];
        sankeyInstance.legendSettings.visible = !sankeyInstance.legendSettings.visible;
        sankeyInstance.refresh();
    }
</script>
```

---

## Legend Positioning

### Position Options

Use the legend position enum rather than plain string values.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

Common options include:

- `Syncfusion.EJ2.Charts.LegendPosition.Auto`
- `Syncfusion.EJ2.Charts.LegendPosition.Top`
- `Syncfusion.EJ2.Charts.LegendPosition.Bottom`
- `Syncfusion.EJ2.Charts.LegendPosition.Left`
- `Syncfusion.EJ2.Charts.LegendPosition.Right`
- `Syncfusion.EJ2.Charts.LegendPosition.Custom`

### Complete Positioning Example

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Right).EnableHighlight(true)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Custom Positioning

For exact placement, use `Position(Custom)` together with `Location(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Custom).Location(
            loc => loc.X(80).Y(40)
        ).Width("180px").Height("160px")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Responsive Positioning

```csharp
public ActionResult Index()
{
    bool isMobile = Request.Browser.IsMobileDevice;
    ViewBag.LegendPosition = isMobile
        ? Syncfusion.EJ2.Charts.LegendPosition.Bottom
        : Syncfusion.EJ2.Charts.LegendPosition.Right;

    return View(model);
}
```

Use in view:

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Position((Syncfusion.EJ2.Charts.LegendPosition)ViewBag.LegendPosition)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

If you prefer to avoid casting through `ViewBag`, a strongly typed view model property is the cleaner MVC option.

---

## Legend Customization

### Background and Border

In Sankey legend settings, border configuration is applied through `.Border(...)` rather than separate `.BorderColor(...)` and `.BorderWidth(...)` calls.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Background("#FFFFFF").Border(
            b => b.Width(1).Color("#CCCCCC")
        )
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Legend Title

The legend title is configured as a string on the legend settings block.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Title("Categories")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Legend Label Styling

Text styling is handled through `.TextStyle(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Title("Categories").TextStyle(
            ts => ts.FontFamily("Segoe UI").FontWeight("500").Size("17px").Color("red")
        )
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Legend Item Padding

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).ItemPadding(15)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Complete Customization Example

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(
        t => t.Enable(true)
    ).LegendSettings(
        ls => ls.Visible(true).Title("Product Categories").Position(Syncfusion.EJ2.Charts.LegendPosition.Right).Background("#F5F5F5").Opacity(1).Padding(10).ItemPadding(10).ShapeWidth(14).ShapeHeight(14).ShapePadding(10).EnableHighlight(true).Border(
            b => b.Width(1).Color("#CCCCCC")
        ).TextStyle(
            ts => ts.FontFamily("Segoe UI").FontWeight("500").Size("11px").Color("#666666")
        )
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Dynamic Legend Creation

### Important behavior note

For the built-in Sankey legend, legend items are generated from the Sankey chart data and node appearance. There is no separate custom legend-items collection on the Sankey helper where arbitrary legend items can be injected directly into the built-in legend.

That means dynamic legend management is usually handled in one of these ways:

1. **Update the Sankey node data and refresh the chart**
2. **Use `LegendItemRendering` to modify the built-in legend items**

## Legend Item Rendering

### Basic Legend Item Rendering Event

Use `LegendItemRendering` on the main Sankey helper chain.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true)
    ).LegendItemRendering("onLegendItemRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLegendItemRendering(args) {
        if (!args) {
            return;
        }

        if (args.text) {
            args.text = args.text.toUpperCase();
        }
    }
</script>
```

### Conditional Legend Item Styling

```html
<script>
    function onLegendItemRendering(args) {
        if (!args) {
            return;
        }

        var legendText = args.text || "";

        if (legendText.indexOf("Product A") !== -1) {
            args.fill = "#FF6B6B";
        } else if (legendText.indexOf("Sales") !== -1) {
            args.fill = "#4ECDC4";
        } else if (legendText.indexOf("Product B") !== -1) {
            args.fill = "#FFE66D";
        }
    }
</script>
```

### Custom Legend Item Content

```html
<script>
    function onLegendItemRendering(args) {
        if (!args) {
            return;
        }

        var label = args.text || "";
        var value = getValueForLegendItem(label);
        args.text = label + " (" + value.toLocaleString() + ")";
    }

    function getValueForLegendItem(label) {
        var values = {
            "Product A": 1500,
            "Product B": 2000,
            "Sales": 3500
        };

        return values[label] || 0;
    }
</script>
```

### Legend Hover Handling

The Sankey API exposes `LegendItemHover`. This is the supported legend interaction event available for Sankey in this area.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).EnableHighlight(true)
    ).LegendItemHover("onLegendItemHover").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLegendItemHover(args) {
        if (!args) {
            return;
        }

        console.log("Hovered legend item:", args.node.id || args.name || "");
    }
</script>
```

## Common Legend Patterns

### Pattern 1: Category Legend

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Title("Product Categories").Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 2: Source Node Legend

If your source nodes are explicitly defined and colored in `Model.SankeyNodes`, the built-in legend will reflect those nodes.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Title("Source Nodes").Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 3: Color Scale Legend

For value ranges such as low, medium, and high, an external custom legend is usually more appropriate than the built-in Sankey legend.

```cshtml
<div class="value-scale-legend">
    <div><span class="box high"></span> High (8000+)</div>
    <div><span class="box medium"></span> Medium (4000-8000)</div>
    <div><span class="box low"></span> Low (0-4000)</div>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(false)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<style>
    .value-scale-legend div {
        margin-bottom: 6px;
        font-family: Segoe UI, Arial, sans-serif;
        font-size: 13px;
    }

    .box {
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 8px;
        border: 1px solid #999;
        vertical-align: middle;
    }

    .high {
        background: #FF0000;
    }

    .medium {
        background: #FFD700;
    }

    .low {
        background: #D3D3D3;
    }
</style>
```

### Pattern 4: Compact Right-Side Legend

There is no Sankey legend mode configuration in this area like `.Mode("Interactive")` for the MVC Sankey helper. A compact layout is achieved through item spacing, shape sizing, width, and position.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LegendSettings(
        ls => ls.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Right).Width("180px").ItemPadding(5).ShapeWidth(12).ShapeHeight(12).ShapePadding(8)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Best Practices

1. **Clarity** - Use clear and concise node labels so the legend remains easy to read.
2. **Consistency** - Make sure node colors and legend colors match exactly.
3. **Positioning** - Choose a legend position that does not compress the Sankey layout unnecessarily.
4. **Highlighting** - Use `.EnableHighlight(true)` when users need quick visual association between legend items and flow segments.
5. **Dynamic scenarios** - If the legend needs custom items, filtering, or arbitrary grouping, prefer an external custom legend.
6. **Strong typing** - Use `List<SankeyNode>` and `List<SankeyLink>` in a strongly typed view model for stable MVC helper behavior.
7. **Custom positioning** - When using `LegendPosition.Custom`, always pair it with `.Location(...)`.
8. **Event placement** - Keep `.LegendItemRendering(...)` and `.LegendItemHover(...)` on the main Sankey helper chain, not inside `.LegendSettings(...)`.
