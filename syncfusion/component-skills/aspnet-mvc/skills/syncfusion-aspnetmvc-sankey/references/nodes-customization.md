# Node Customization in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Node Styling Basics](#node-styling-basics)
  - [Basic Node Configuration](#basic-node-configuration)
  - [Complete Node Configuration Example](#complete-node-configuration-example)
- [Node Colors and Fills](#node-colors-and-fills)
  - [Uniform Node Color](#uniform-node-color)
  - [Individual Node Colors Based on Data](#individual-node-colors-based-on-data)
  - [Applying Individual Colors in the View](#applying-individual-colors-in-the-view)
  - [Node-Specific Coloring with NodeRendering](#node-specific-coloring-with-noderendering)
  - [Color Themes](#color-themes)
    - [Without Node rendering or javascript](#without-node-rendering-or-javascript)
    - [With Node rendering](#with-node-rendering)
- [Node Opacity and Visibility](#node-opacity-and-visibility)
  - [Setting Node Opacity](#setting-node-opacity)
  - [Interactive Opacity Behavior](#interactive-opacity-behavior)
  - [Variable Opacity Based on Node Category](#variable-opacity-based-on-node-category)
  - [Highlighting Specific Nodes](#highlighting-specific-nodes)
- [Node Positioning and Size](#node-positioning-and-size)
  - [Adjusting Node Width](#adjusting-node-width)
  - [Node Padding](#node-padding)
  - [Node Offset and Positioning](#node-offset-and-positioning)
  - [Example with Offset in the View Model](#example-with-offset-in-the-view-model)
  - [About size based on node importance](#about-size-based-on-node-importance)
- [Node Rendering Events](#node-rendering-events)
  - [Basic Node Rendering Event](#basic-node-rendering-event)
  - [Adding Derived Information to a Node](#adding-derived-information-to-a-node)
  - [Conditional Styling Based on Node Type](#conditional-styling-based-on-node-type)
- [Custom Node Appearance with Templates](#custom-node-appearance-with-templates)
  - [Basic guidance](#basic-guidance)
  - [Styling Nodes with NodeRendering](#styling-nodes-with-noderendering)
- [Conditional Node Styling](#conditional-node-styling)
  - [Multi-Condition Styling](#multi-condition-styling)
  - [Styling Based on Data Values](#styling-based-on-data-values)
- [Common Node Customization Patterns](#common-node-customization-patterns)
  - [Pattern 1: Color by Category](#pattern-1-color-by-category)
  - [Pattern 2: Hierarchical Styling](#pattern-2-hierarchical-styling)
  - [Pattern 3: Interactive Hover Styling](#pattern-3-interactive-hover-styling)
  - [Pattern 4: Value-Based Emphasis](#pattern-4-value-based-emphasis)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyNodeCustomizationViewModel
    {
        public List<SankeyNode> SankeyNodes { get; set; }
        public List<SankeyLink> SankeyLinks { get; set; }
    }
}
```

### Controller

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class SankeyController : Controller
    {
        public ActionResult NodeCustomization()
        {
            var model = new SankeyNodeCustomizationViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode
                    {
                        Id = "Product A",
                        Color = "#FF6B6B",
                        Label = new SankeyChartDataLabel { Text = "Product A" }
                    },
                    new SankeyNode
                    {
                        Id = "Product B",
                        Color = "#4ECDC4",
                        Label = new SankeyChartDataLabel { Text = "Product B" }
                    },
                    new SankeyNode
                    {
                        Id = "Product C",
                        Color = "#FFE66D",
                        Label = new SankeyChartDataLabel { Text = "Product C" }
                    },
                    new SankeyNode
                    {
                        Id = "Channel 1",
                        Color = "#95E1D3",
                        Label = new SankeyChartDataLabel { Text = "Channel 1" },
                        Offset = 0.1
                    },
                    new SankeyNode
                    {
                        Id = "Channel 2",
                        Color = "#A78BFA",
                        Label = new SankeyChartDataLabel { Text = "Channel 2" }
                    },
                    new SankeyNode
                    {
                        Id = "Revenue",
                        Color = "#60A5FA",
                        Label = new SankeyChartDataLabel { Text = "Revenue" }
                    }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Channel 1", Value = 4200 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Channel 2", Value = 5200 },
                    new SankeyLink { SourceId = "Product C", TargetId = "Channel 1", Value = 2600 },
                    new SankeyLink { SourceId = "Channel 1", TargetId = "Revenue", Value = 5300 },
                    new SankeyLink { SourceId = "Channel 2", TargetId = "Revenue", Value = 4800 }
                }
            };

            return View(model);
        }
    }
}
```

---

## Table of Contents
- #node-styling-basics
- #node-colors-and-fills
- #node-opacity-and-visibility
- #node-positioning-and-size
- #node-rendering-events
- #custom-node-appearance-with-templates
- #conditional-node-styling
- #common-node-customization-patterns
- #future-reference

---

## Node Styling Basics

Nodes are the rectangular elements in a Sankey diagram that represent categories, stages, or flow entities. In Syncfusion ASP.NET MVC Sankey, global node appearance is configured through `.NodeStyle(...)`, while individual node customization can be done through node data and `NodeRendering`.

### Basic Node Configuration

```cshtml
@model WebApplication1.Models.SankeyNodeCustomizationViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(60).Opacity(1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Complete Node Configuration Example

`Padding` is the supported spacing-related setting for global node layout, and `Border(...)` is the supported border configuration.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(50).Padding(18).Opacity(0.95).Border(
            b => b.Width(1).Color("#FFFFFF")
        )
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Node Colors and Fills

### Uniform Node Color

Set all nodes to the same fill color globally with `NodeStyle.Fill(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Fill("#0078D4")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Individual Node Colors Based on Data

For individual node colors, use the `Color` property on each `SankeyNode`.

```csharp
new SankeyNode
{
    Id = "Product A",
    Color = "#FF6B6B",
    Label = new SankeyChartDataLabel { Text = "Product A" }
}
```

### Applying Individual Colors in the View

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(50).Opacity(0.95)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

Because each node already contains its own `Color`, the Sankey will use those node-level colors.

### Node-Specific Coloring with NodeRendering

If you want to override color dynamically during render, use `NodeRendering`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(50).Opacity(0.95)
    ).NodeRendering("onNodeRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";

        if (nodeId === "Product A") {
            args.node.color = "#FF6B6B";
        } else if (nodeId === "Product B") {
            args.node.color = "#4ECDC4";
        } else if (nodeId === "Product C") {
            args.node.color = "#FFE66D";
        }
    }
</script>
```

### Color Themes

You can prepare a palette in the controller and assign node colors before the view is rendered.

#### Without Node rendering or javascript
```csharp

using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string theme = "warm")
        {
            var palette = GetColorPalette(theme);

            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode
                    {
                        Id = "Product A",
                        Color = palette[0],
                        Label = new SankeyChartDataLabel { Text = "Product A" }
                    },
                    new SankeyNode
                    {
                        Id = "Product B",
                        Color = palette[1],
                        Label = new SankeyChartDataLabel { Text = "Product B" }
                    },
                    new SankeyNode
                    {
                        Id = "Product C",
                        Color = palette[2],
                        Label = new SankeyChartDataLabel { Text = "Product C" }
                    },
                    new SankeyNode
                    {
                        Id = "Channel 1",
                        Color = palette[0],
                        Label = new SankeyChartDataLabel { Text = "Channel 1" },
                        Offset = 0.1
                    },
                    new SankeyNode
                    {
                        Id = "Channel 2",
                        Color = palette[1],
                        Label = new SankeyChartDataLabel { Text = "Channel 2" }
                    },
                    new SankeyNode
                    {
                        Id = "Revenue",
                        Color = palette[2],
                        Label = new SankeyChartDataLabel { Text = "Revenue" }
                    }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Channel 1", Value = 4200 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Channel 2", Value = 5200 },
                    new SankeyLink { SourceId = "Product C", TargetId = "Channel 1", Value = 2600 },
                    new SankeyLink { SourceId = "Channel 1", TargetId = "Revenue", Value = 5300 },
                    new SankeyLink { SourceId = "Channel 2", TargetId = "Revenue", Value = 4800 }
                }
            };

            ViewBag.CurrentTheme = theme;
            return View(model);
        }

        private List<string> GetColorPalette(string theme)
        {
            switch ((theme ?? string.Empty).ToLower())
            {
                case "blue":
                    return new List<string> { "#0078D4", "#1084D7", "#187FBA" };

                case "warm":
                    return new List<string> { "#FF6B6B", "#FFA500", "#FFD700" };

                case "cool":
                    return new List<string> { "#0099FF", "#00D4FF", "#00E5FF" };

                case "pastel":
                    return new List<string> { "#FFB3BA", "#BAFFC9", "#BAE1FF" };

                default:
                    return new List<string> { "#0078D4", "#1084D7", "#187FBA" };
            }
        }
    }
}
```
```cshtml
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom:12px;">
    <a href="@Url.Action("Index", "Home", new { theme = "blue" })">Blue</a> |
    <a href="@Url.Action("Index", "Home", new { theme = "warm" })">Warm</a> |
    <a href="@Url.Action("Index", "Home", new { theme = "cool" })">Cool</a> |
    <a href="@Url.Action("Index", "Home", new { theme = "pastel" })">Pastel</a>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(50).Opacity(0.95)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```
#### With Node rendering
```csharp

using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string theme = "warm")
        {
            var palette = GetColorPalette(theme);

            ViewBag.Palette = palette;

            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                    {
                    new SankeyNode { Id = "Product A", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Product C", Label = new SankeyChartDataLabel { Text = "Product C" } },
                    new SankeyNode { Id = "Channel 1", Label = new SankeyChartDataLabel { Text = "Channel 1" }, Offset = 0.1 },
                    new SankeyNode { Id = "Channel 2", Label = new SankeyChartDataLabel { Text = "Channel 2" } },
                    new SankeyNode { Id = "Revenue", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                    },
                SankeyLinks = new List<SankeyLink>
                    {
                    new SankeyLink { SourceId = "Product A", TargetId = "Channel 1", Value = 4200 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Channel 2", Value = 5200 },
                    new SankeyLink { SourceId = "Product C", TargetId = "Channel 1", Value = 2600 },
                    new SankeyLink { SourceId = "Channel 1", TargetId = "Revenue", Value = 5300 },
                    new SankeyLink { SourceId = "Channel 2", TargetId = "Revenue", Value = 4800 }
                    }
            };

            return View(model);
        }

        private List<string>
            GetColorPalette(string theme)
        {
            switch ((theme ?? string.Empty).ToLower())
            {
                case "blue":
                    return new List<string> { "#0078D4", "#1084D7", "#187FBA" };
                case "warm":
                    return new List<string> { "#FF6B6B", "#FFA500", "#FFD700" };
                case "cool":
                    return new List<string> { "#0099FF", "#00D4FF", "#00E5FF" };
                case "pastel":
                    return new List<string> { "#FFB3BA", "#BAFFC9", "#BAE1FF" };
                default:
                    return new List<string> { "#0078D4", "#1084D7", "#187FBA" };
            }
        }
    }
}
```
```cshtml
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts
@using System.Web.Helpers
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
    ns => ns.Width(50).Opacity(0.95)
).NodeRendering("onNodeRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
<script>
    var palette = @Html.Raw(Json.Encode(ViewBag.Palette));

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";

        if (nodeId === "Product A") {
            args.node.color = palette[0];
        } else if (nodeId === "Product B") {
            args.node.color = palette[1];
        } else if (nodeId === "Product C") {
            args.node.color = palette[2];
        } else if (nodeId === "Channel 1") {
            args.node.color = palette[0];
        } else if (nodeId === "Channel 2") {
            args.node.color = palette[1];
        } else if (nodeId === "Revenue") {
            args.node.color = palette[2];
        }
    }
</script>
```
---

## Node Opacity and Visibility

### Setting Node Opacity

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Interactive Opacity Behavior

The Sankey node style supports `HighlightOpacity` and `InactiveOpacity` for interaction-based emphasis.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.3)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Variable Opacity Based on Node Category

For per-node emphasis, use `NodeRendering` to assign node colors while keeping global opacity behavior in `NodeStyle`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.85).HighlightOpacity(1).InactiveOpacity(0.35)
    ).NodeRendering("onNodeRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";

        if (nodeId === "Product A" || nodeId === "Product B") {
            args.node.color = "#1D4ED8";
        } else {
            args.node.color = args.node.color || "#9CA3AF";
        }
    }
</script>
```

### Highlighting Specific Nodes

A practical Sankey pattern is:

- use `NodeStyle.Opacity(...)`
- use `NodeStyle.HighlightOpacity(...)`
- use `NodeStyle.InactiveOpacity(...)`
- use `NodeRendering` or per-node color data to visually distinguish important nodes

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.25)
    ).NodeRendering("onNodeRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var mainProducts = {
            "Product A": true,
            "Product B": true
        };

        var nodeId = args.node.id || "";
        args.node.color = mainProducts[nodeId] ? "#FF6B6B" : "#94A3B8";
    }
</script>
```

---

## Node Positioning and Size

### Adjusting Node Width

Node width is configured globally through `NodeStyle.Width(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(60)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Node Padding

Global spacing between nodes is handled through `Padding(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(50).Padding(40)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Node Offset and Positioning

Node position adjustment is supported through the `Offset` property on each `SankeyNode`.

```csharp
new SankeyNode
{
    Id = "Primary Node",
    Color = "#0078D4",
    Label = new SankeyChartDataLabel { Text = "Primary Node" },
    Offset = 0.15
}
```

### Example with Offset in the View Model

```csharp
var nodes = new List<SankeyNode>
{
    new SankeyNode
    {
        Id = "Primary Node",
        Color = "#0078D4",
        Label = new SankeyChartDataLabel { Text = "Primary Node" },
        Offset = 0
    },
    new SankeyNode
    {
        Id = "Secondary Node",
        Color = "#4ECDC4",
        Label = new SankeyChartDataLabel { Text = "Secondary Node" },
        Offset = 0.2
    }
};
```

### About size based on node importance

For Sankey nodes, width is generally a global style setting rather than a per-node dynamic size setting. If you want to emphasize important nodes, the recommended approach is to use:

- node color
- node opacity behavior
- node label text/style
- node offset

That keeps the Sankey layout stable and aligned with the component model.

---

## Node Rendering Events

### Basic Node Rendering Event

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeRendering("onNodeRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        console.log("Node Id:", args.node.id);

        args.node.color = "#0078D4";
    }
</script>
```

### Adding Derived Information to a Node

For custom logic, you can compute and attach values in the event, but the visual appearance should still be controlled through supported node properties.

```html
<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        args.node.customDescription = "Node: " + nodeId;
    }
</script>
```

### Conditional Styling Based on Node Type

```html
<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";

        if (nodeId.indexOf("Product") !== -1) {
            args.node.color = "#FF6B6B";
        } else if (nodeId.indexOf("Channel") !== -1) {
            args.node.color = "#4ECDC4";
        } else if (nodeId.indexOf("Revenue") !== -1) {
            args.node.color = "#FFE66D";
        }
    }
</script>
```

---

## Custom Node Appearance with Templates

### Basic guidance

The Sankey chart does not use custom DOM node templates in the same way that templated UI components do. For Sankey node appearance, the supported customization path is:

- `NodeStyle(...)`
- node data such as `Color`, `Label`, and `Offset`
- `NodeRendering("...")`

### Styling Nodes with NodeRendering

```html
<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var palette = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"];
        var nodeId = args.node.id || "";
        var indexMap = {
            "Product A": 0,
            "Product B": 1,
            "Product C": 2,
            "Channel 1": 3,
            "Revenue": 4
        };

        var nodeIndex = indexMap[nodeId] || 0;
        args.node.color = palette[nodeIndex % palette.length];
    }
</script>
```

## Conditional Node Styling

### Multi-Condition Styling

```html
<script>
    function getCategoryFromNodeId(nodeId) {
        if (nodeId.indexOf("Product") !== -1) {
            return "input";
        }

        if (nodeId.indexOf("Channel") !== -1) {
            return "process";
        }

        if (nodeId.indexOf("Revenue") !== -1) {
            return "output";
        }

        return "other";
    }

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var category = getCategoryFromNodeId(nodeId);

        if (category === "input") {
            args.node.color = "#0078D4";
        } else if (category === "process") {
            args.node.color = "#4ECDC4";
        } else if (category === "output") {
            args.node.color = "#FFE66D";
        } else {
            args.node.color = "#94A3B8";
        }
    }
</script>
```

### Styling Based on Data Values

When node emphasis depends on computed totals, use your own helper function and assign color conditionally.

```html
<script>
    function getNodeValue(nodeId) {
        var values = {
            "Product A": 8200,
            "Product B": 6100,
            "Product C": 3200,
            "Revenue": 10100
        };

        return values[nodeId] || 0;
    }

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var nodeValue = getNodeValue(nodeId);

        if (nodeValue > 8000) {
            args.node.color = "#FF6B6B";
        } else if (nodeValue > 5000) {
            args.node.color = "#FFA500";
        } else {
            args.node.color = "#4ECDC4";
        }
    }
</script>
```

---

## Common Node Customization Patterns

### Pattern 1: Color by Category

```html
<script>
    var nodeStyler = {
        "Sales": "#FF6B6B",
        "Marketing": "#4ECDC4",
        "Operations": "#FFE66D",
        "Revenue": "#95E1D3"
    };

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";

        for (var category in nodeStyler) {
            if (nodeId.indexOf(category) !== -1) {
                args.node.color = nodeStyler[category];
                break;
            }
        }
    }
</script>
```

### Pattern 2: Hierarchical Styling

Use different colors for different levels or stages in your Sankey data.

```html
<script>
    function calculateNodeLevel(nodeId) {
        var levels = {
            "Product A": 0,
            "Product B": 0,
            "Product C": 0,
            "Channel 1": 1,
            "Channel 2": 1,
            "Revenue": 2
        };

        return levels[nodeId] || 0;
    }

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var level = calculateNodeLevel(nodeId);
        var levelColors = ["#2563EB", "#14B8A6", "#F59E0B"];

        args.node.color = levelColors[level % levelColors.length];
    }
</script>
```

### Pattern 3: Interactive Hover Styling

For built-in interaction emphasis, combine node style opacity settings with Sankey interaction.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.2)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 4: Value-Based Emphasis

Since node width is typically a global setting, value-based emphasis is best represented through color and offset.

```html
<script>
    function getTotalNodeValue(nodeId) {
        var totals = {
            "Product A": 5000,
            "Product B": 7200,
            "Product C": 2800,
            "Revenue": 10000
        };

        return totals[nodeId] || 0;
    }

    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var totalValue = getTotalNodeValue(nodeId);

        if (totalValue > 8000) {
            args.node.color = "#DC2626";
        } else if (totalValue > 5000) {
            args.node.color = "#2563EB";
        } else {
            args.node.color = "#94A3B8";
        }
    }
</script>
```

---

## Best Practices

1. **Consistent styling** - Use a defined palette and stable node width range across the chart.
2. **Meaningful colors** - Use colors to represent category, role, or importance consistently.
3. **Readable layout** - Use `Padding(...)` and optional node `Offset` values to avoid crowded layouts.
4. **Efficient rendering logic** - Keep `NodeRendering` simple, especially with larger Sankey datasets.
5. **Accessibility** - Use clear labels and adequate contrast rather than relying only on color.
6. **Global width, local emphasis** - Keep width global through `NodeStyle.Width(...)` and use color or offset for individual emphasis.
7. **Strong typing** - Use `List<SankeyNode>` and `List<SankeyLink>` in MVC for predictable helper behavior.
8. **Continuous helper chaining** - Keep the Sankey helper in a continuous MVC chain for readability and stability.
---

## Future reference

- Use `.NodeStyle(...)` instead of `.NodeSettings(...)` for Sankey node configuration.
- Use `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`.
- Use `SankeyNode.Color`, `SankeyNode.Label`, and `SankeyNode.Offset` for individual node data-level customization.
- Use `.NodeRendering("...")` for per-node color logic and conditional appearance changes.
- Use `Padding(...)` rather than unsupported spacing-style patterns for Sankey node layout.
- Use `NodeStyle.Border(...)` for borders.
- Keep node width global and use color, label text, and offset for node-by-node emphasis.