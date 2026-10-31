# Link Configuration in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Link Basics](#link-basics)
  - [Understanding Link Properties](#understanding-link-properties)
  - [Basic Link Configuration](#basic-link-configuration)
- [Link Colors and Blending](#link-colors-and-blending)
  - [Uniform Link Color](#uniform-link-color)
  - [Color Mapping by Source Node](#color-mapping-by-source-node)
  - [Color Mapping by Target Node](#color-mapping-by-target-node)
  - [Gradient Color Blending](#gradient-color-blending)
  - [Color by Value or Importance](#color-by-value-or-importance)
- [Link Curvature](#link-curvature)
  - [Setting Link Curvature](#setting-link-curvature)
  - [Curvature Options](#curvature-options)
  - [Using Curves vs Straighter Paths](#using-curves-vs-straighter-paths)
- [Link Opacity and Transparency](#link-opacity-and-transparency)
  - [Setting Default Link Opacity](#setting-default-link-opacity)
  - [Variable Link Interaction Opacity](#variable-link-interaction-opacity)
  - [Highlighting Important Flows](#highlighting-important-flows)
  - [Dimming Non-Related Links on Hover](#dimming-non-related-links-on-hover)
- [Link Value and Thickness Mapping](#link-value-and-thickness-mapping)
  - [Automatic Thickness from Value](#automatic-thickness-from-value)
  - [Understanding Automatic Scaling](#understanding-automatic-scaling)
  - [Normalized Values](#normalized-values)
  - [Dynamic Value Updates](#dynamic-value-updates)
  - [Value-Based Styling](#value-based-styling)
- [Link Styling with Rendering Events](#link-styling-with-rendering-events)
  - [Basic Link Rendering Event](#basic-link-rendering-event)
  - [Conditional Link Styling](#conditional-link-styling)
  - [Link Visual Helper Functions](#link-visual-helper-functions)
- [Dynamic Link Data](#dynamic-link-data)
  - [Updating Links on Data Change](#updating-links-on-data-change)
  - [JavaScript to Update the Chart](#javascript-to-update-the-chart)
  - [Adding Links Dynamically](#adding-links-dynamically)
  - [Removing Links Dynamically](#removing-links-dynamically)
  - [Real-Time Data Updates](#real-time-data-updates)
- [Common Link Customization Patterns](#common-link-customization-patterns)
  - [Pattern 1 Color Code by Flow Category](#pattern-1-color-code-by-flow-category)
  - [Pattern 2 Highlight High-Value Flows](#pattern-2-highlight-high-value-flows)
  - [Pattern 3 Alternate Colors for Layers](#pattern-3-alternate-colors-for-layers)
  - [Pattern 4 Interactive Link Highlighting](#pattern-4-interactive-link-highlighting)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyLinkConfigurationViewModel
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
        public ActionResult LinkConfiguration()
        {
            var model = new SankeyLinkConfigurationViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Product C", Color = "#FFE66D", Label = new SankeyChartDataLabel { Text = "Product C" } },
                    new SankeyNode { Id = "Online Sales", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online Sales" } },
                    new SankeyNode { Id = "Retail Sales", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Retail Sales" } },
                    new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 8000 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 5000 },
                    new SankeyLink { SourceId = "Product C", TargetId = "Online Sales", Value = 2500 },
                    new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 9000 },
                    new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 4500 }
                }
            };

            return View(model);
        }

        public JsonResult UpdateLinkData()
        {
            var nodes = new List<object>
            {
                new { id = "Product A", color = "#FF6B6B", label = new { text = "Product A" } },
                new { id = "Product B", color = "#4ECDC4", label = new { text = "Product B" } },
                new { id = "Product C", color = "#FFE66D", label = new { text = "Product C" } },
                new { id = "Online Sales", color = "#95E1D3", label = new { text = "Online Sales" } },
                new { id = "Retail Sales", color = "#A78BFA", label = new { text = "Retail Sales" } },
                new { id = "Revenue", color = "#60A5FA", label = new { text = "Revenue" } }
            };

            var links = new List<object>
            {
                new { sourceId = "Product A", targetId = "Online Sales", value = 9200 },
                new { sourceId = "Product B", targetId = "Retail Sales", value = 4100 },
                new { sourceId = "Product C", targetId = "Online Sales", value = 1800 },
                new { sourceId = "Online Sales", targetId = "Revenue", value = 9800 },
                new { sourceId = "Retail Sales", targetId = "Revenue", value = 3900 }
            };

            return Json(new { SankeyNodes = nodes, SankeyLinks = links }, JsonRequestBehavior.AllowGet);
        }
    }
}
```

---

## Table of Contents
- [Link Basics](#link-basics)
- [Link Colors and Blending](#link-colors-and-blending)
- [Link Curvature](#link-curvature)
- [Link Opacity and Transparency](#link-opacity-and-transparency)
- [Link Value and Thickness Mapping](#link-value-and-thickness-mapping)
- [Link Styling with Rendering Events](#link-styling-with-rendering-events)
- [Dynamic Link Data](#dynamic-link-data)
- [Common Link Customization Patterns](#common-link-customization-patterns)
- [Future reference](#future-reference)

---

## Link Basics

Links are the connecting paths in a Sankey diagram that represent the flow of values between nodes. In Syncfusion ASP.NET MVC Sankey, each link is defined using a `SankeyLink` object.

### Understanding Link Properties

A link in the Sankey chart is defined by:

- **SourceId** - The starting node id
- **TargetId** - The destination node id
- **Value** - Determines link thickness
- **Color behavior** - Controlled globally with `ColorType` or individually with `LinkRendering`
- **Opacity** - Controlled through `LinkStyle`
- **Curvature** - Controlled through `LinkStyle`

### Basic Link Configuration

```cshtml
@model WebApplication1.Models.SankeyLinkConfigurationViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Link Colors and Blending

### Uniform Link Color

To apply the same color to all links, use `LinkRendering` and assign `args.fill`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6)
    ).LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        args.fill = "#0078D4";
    }
</script>
```

### Color Mapping by Source Node

Use `ColorType(Source)` when links should inherit the source node color.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6).ColorType(Syncfusion.EJ2.Charts.ColorType.Source)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Color Mapping by Target Node

Use `ColorType(Target)` when links should inherit the target node color.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6).ColorType(Syncfusion.EJ2.Charts.ColorType.Target)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Gradient Color Blending

Use `ColorType(Blend)` to blend the source and target colors across the link.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6).ColorType(Syncfusion.EJ2.Charts.ColorType.Blend)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Color by Value or Importance

For value-based link coloring, use `LinkRendering`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.7)
    ).LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        var value = link.value;

        if (value > 8000) {
            args.fill = "#FF0000";
        } else if (value > 5000) {
            args.fill = "#FF6B6B";
        } else if (value > 2000) {
            args.fill = "#FFD700";
        } else {
            args.fill = "#D3D3D3";
        }
    }
</script>
```

---

## Link Curvature

### Setting Link Curvature

Curvature controls how much the links bend.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Curvature(0)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Curvature Options

The Sankey helper uses a numeric curvature value rather than a linear-or-curve switch.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Curvature(0)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Curvature(0.5)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Curvature(1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Using Curves vs Straighter Paths

- **Curvature(0)** - straighter links
- **Curvature(0.5)** - moderate curves
- **Curvature(1)** - maximum curve effect

**When to use each:**

- **Lower curvature**: simpler look and denser layouts
- **Moderate curvature**: balanced readability for most Sankey diagrams
- **Higher curvature**: more visual separation for overlapping flows

---

## Link Opacity and Transparency

### Setting Default Link Opacity

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Variable Link Interaction Opacity

The Sankey helper supports interactive opacity behavior through `HighlightOpacity` and `InactiveOpacity`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6).HighlightOpacity(1).InactiveOpacity(0.2)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Highlighting Important Flows

A stable MVC pattern is to combine:

- global link opacity in `LinkStyle`
- conditional link colors through `LinkRendering`

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.55).HighlightOpacity(1).InactiveOpacity(0.25)
    ).LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        var value = link.value;

        if (value > 7000) {
            args.fill = "#DC2626";
        } else if (value > 3000) {
            args.fill = "#2563EB";
        } else {
            args.fill = "#9CA3AF";
        }
    }
</script>
```

### Dimming Non-Related Links on Hover

Use the built-in inactive and highlight opacity settings for the cleanest behavior.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6).HighlightOpacity(1).InactiveOpacity(0.1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Link Value and Thickness Mapping

### Automatic Thickness from Value

In the Sankey chart, link thickness is automatically derived from `SankeyLink.Value`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Understanding Automatic Scaling

The Sankey component automatically scales thickness based on the values in the link collection.

**Example values:**

- `100` → thinner link
- `500` → medium link
- `1000` → thicker link

### Normalized Values

If your source values vary widely, you can normalize them before binding.

Helper
```csharp

using System.Collections.Generic;
using System.Linq;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Helpers
{
    public static class SankeyAccessibilityHelper
    {
        public static List<SankeyLink> NormalizeLinks(List<SankeyLink> links)
        {
            if (links == null || !links.Any())
            {
                return new List<SankeyLink>();
            }

            double maxValue = links.Max(l => l.Value);

            if (maxValue <= 0)
            {
                return links.Select(l => new SankeyLink
                {
                    SourceId = l.SourceId,
                    TargetId = l.TargetId,
                    Value = 0
                }).ToList();
            }

            return links.Select(l => new SankeyLink
            {
                SourceId = l.SourceId,
                TargetId = l.TargetId,
                Value = (l.Value / maxValue) * 100
            }).ToList();
        }
    }
}
```
Controller
```csharp
using Syncfusion.EJ2.Charts;
using System.Collections.Generic;
using System.Web.Mvc;
using WebApplication1.Helpers;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var Links = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 8000 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 5000 },
                    new SankeyLink { SourceId = "Product C", TargetId = "Online Sales", Value = 2500 },
                    new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 9000 },
                    new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 4500 }
                };
            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Product C", Color = "#FFE66D", Label = new SankeyChartDataLabel { Text = "Product C" } },
                    new SankeyNode { Id = "Online Sales", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online Sales" } },
                    new SankeyNode { Id = "Retail Sales", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Retail Sales" } },
                    new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                },
                SankeyLinks = SankeyAccessibilityHelper.NormalizeLinks(Links)
            };

            return View(model);
        }

        public JsonResult UpdateLinkData()
        {
            var nodes = new List<object>
            {
                new { id = "Product A", color = "#FF6B6B", label = new { text = "Product A" } },
                new { id = "Product B", color = "#4ECDC4", label = new { text = "Product B" } },
                new { id = "Product C", color = "#FFE66D", label = new { text = "Product C" } },
                new { id = "Online Sales", color = "#95E1D3", label = new { text = "Online Sales" } },
                new { id = "Retail Sales", color = "#A78BFA", label = new { text = "Retail Sales" } },
                new { id = "Revenue", color = "#60A5FA", label = new { text = "Revenue" } }
            };

            var links = new List<object>
            {
                new { sourceId = "Product A", targetId = "Online Sales", value = 9200 },
                new { sourceId = "Product B", targetId = "Retail Sales", value = 4100 },
                new { sourceId = "Product C", targetId = "Online Sales", value = 1800 },
                new { sourceId = "Online Sales", targetId = "Revenue", value = 9800 },
                new { sourceId = "Retail Sales", targetId = "Revenue", value = 3900 }
            };

            return Json(new { SankeyNodes = nodes, SankeyLinks = links }, JsonRequestBehavior.AllowGet);
        }
    }
}
```
```cshtml
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```
### Dynamic Value Updates

When link values change, update the client-side `links` collection and refresh the control.
'''cshtml
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom: 12px;">
    <button type="button" onclick="updateSankeyData()">Update JSON Data</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function updateSankeyData() {
        fetch('@Url.Action("UpdateLinkData", "Home")')
            .then(function (response) {
                return response.json();
            })
            .then(function(result) {
    var sankey = document.getElementById("sankey").ej2_instances[0];

    sankey.nodes = result.SankeyNodes;
    sankey.links = result.SankeyLinks;
    sankey.refresh();
})
            .catch(function(error) {
    console.error("Error updating Sankey data:", error);
});
    }
</script>
'''
controller
```csharp
using Syncfusion.EJ2.Charts;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebApplication1.Helpers;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var links = new List<SankeyLink>
            {
                new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 8000 },
                new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 5000 },
                new SankeyLink { SourceId = "Product C", TargetId = "Online Sales", Value = 2500 },
                new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 9000 },
                new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 4500 }
            };

            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Product C", Color = "#FFE66D", Label = new SankeyChartDataLabel { Text = "Product C" } },
                    new SankeyNode { Id = "Online Sales", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online Sales" } },
                    new SankeyNode { Id = "Retail Sales", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Retail Sales" } },
                    new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                },
                SankeyLinks = SankeyAccessibilityHelper.NormalizeLinks(links)
            };

            return View(model);
        }

        public JsonResult UpdateLinkData()
        {
            var nodes = new List<object>
            {
                new { id = "Product A", color = "#FF6B6B", label = new { text = "Product A" } },
                new { id = "Product B", color = "#4ECDC4", label = new { text = "Product B" } },
                new { id = "Product C", color = "#FFE66D", label = new { text = "Product C" } },
                new { id = "Online Sales", color = "#95E1D3", label = new { text = "Online Sales" } },
                new { id = "Retail Sales", color = "#A78BFA", label = new { text = "Retail Sales" } },
                new { id = "Revenue", color = "#60A5FA", label = new { text = "Revenue" } }
            };

            var updatedLinks = new List<SankeyLink>
            {
                new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 9200 },
                new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 4100 },
                new SankeyLink { SourceId = "Product C", TargetId = "Online Sales", Value = 1800 },
                new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 9800 },
                new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 3900 }
            };

            var normalizedLinks = SankeyAccessibilityHelper.NormalizeLinks(updatedLinks)
                .Select(l => new
                {
                    sourceId = l.SourceId,
                    targetId = l.TargetId,
                    value = l.Value
                })
                .ToList();

            return Json(new { SankeyNodes = nodes, SankeyLinks = normalizedLinks }, JsonRequestBehavior.AllowGet);
        }
    }
}
```

### Value-Based Styling

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.65)
    ).LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        var value = link.value;

        if (value > 8000) {
            args.fill = "#FF0000";
        } else if (value > 4000) {
            args.fill = "#FFD700";
        } else {
            args.fill = "#D3D3D3";
        }
    }
</script>
```

---

## Link Styling with Rendering Events

### Basic Link Rendering Event

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        console.log("Link from", link.sourceId, "to", link.targetId);
        console.log("Value:", link.value);

        args.fill = "#0078D4";
    }
</script>
```

### Conditional Link Styling

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.6)
    ).LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        var source = link.sourceId || "";
        var target = link.targetId || "";
        var value = link.value || 0;

        if (source.indexOf("Product") !== -1 && target.indexOf("Sales") !== -1) {
            args.fill = "#FF6B6B";
        } else if (target.indexOf("Revenue") !== -1) {
            args.fill = "#FFE66D";
        } else {
            args.fill = "#0078D4";
        }

        if (value > 8000) {
            args.fill = "#DC2626";
        }
    }
</script>
```

### Link Visual Helper Functions

```html
<script>
    function getColorForLink(link) {
        if (!link) {
            return "#0078D4";
        }

        if ((link.targetId || "").indexOf("Revenue") !== -1) {
            return "#FFE66D";
        }

        return "#0078D4";
    }

    function onLinkRendering(args) {
        var link = args.link || {};
        args.fill = getColorForLink(link);
    }
</script>
```

---

## Dynamic Link Data

### Updating Links on Data Change

Return plain client-safe node and link objects from the controller.

```csharp
public JsonResult UpdateSankeyData()
{
    var nodes = new List<object>
    {
        new { id = "A", color = "#FF6B6B", label = new { text = "A" } },
        new { id = "B", color = "#4ECDC4", label = new { text = "B" } },
        new { id = "X", color = "#60A5FA", label = new { text = "X" } }
    };

    var links = new List<object>
    {
        new { sourceId = "A", targetId = "X", value = 200 },
        new { sourceId = "B", targetId = "X", value = 150 }
    };

    return Json(new { SankeyNodes = nodes, SankeyLinks = links }, JsonRequestBehavior.AllowGet);
}
```

### JavaScript to Update the Chart

```html
<script>
    function updateSankeyChart() {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        fetch('/Sankey/UpdateSankeyData')
            .then(function (response) { return response.json(); })
            .then(function (result) {
                sankeyInstance.setProperties({
                    nodes: result.SankeyNodes || [],
                    links: result.SankeyLinks || []
                }, true);

                sankeyInstance.refresh();
            });
    }
</script>
```

### Adding Links Dynamically

```html
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom:12px;">
    <button type="button" onclick="addNewLink('Product C', 'Retail Sales', 55)">Add New Link</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()


<script>
    function addNewLink(sourceId, targetId, value) {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        var numericValue = Number(value);

        if (isNaN(numericValue)) {
            return;
        }

        var currentLinks = (sankeyInstance.links || []).map(function (link) {
            return {
                sourceId: link.sourceId || link.SourceId,
                targetId: link.targetId || link.TargetId,
                value: link.value != null ? link.value : link.Value
            };
        });

        currentLinks.push({
            sourceId: sourceId,
            targetId: targetId,
            value: numericValue
        });

        sankeyInstance.setProperties({
            links: currentLinks
        }, true);

        sankeyInstance.refresh();
    }
</script>
```

### Removing Links Dynamically

```html
@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts
<div style="margin-bottom:12px;">
    <button type="button" onclick="removeLink('Product A', 'Online Sales')">Remove Link</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()


<script>

    function removeLink(sourceId, targetId) {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        sourceId = sourceId ? sourceId.trim() : sourceId;
        targetId = targetId ? targetId.trim() : targetId;

        var currentLinks = (sankeyInstance.links || []).map(function (link) {
            return {
                sourceId: (link.sourceId || link.SourceId || "").trim(),
                targetId: (link.targetId || link.TargetId || "").trim(),
                value: link.value != null ? link.value : link.Value
            };
        });

        var filteredLinks = currentLinks.filter(function (link) {
            return !(link.sourceId === sourceId && link.targetId === targetId);
        });

        sankeyInstance.setProperties({
            links: filteredLinks
        }, true);

        sankeyInstance.refresh();
    }
</script>

```

### Real-Time Data Updates

For real-time updates, the same client pattern applies: update `nodes` and `links` with plain objects, then call `refresh()`.

```html

@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom:12px;">
    <button type="button" onclick="loadRealtimeDataFromServer()">Apply Real-Time Update</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()


<script>
    function applyRealtimeUpdate(newNodes, newLinks) {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        var normalizedNodes = (newNodes || []).map(function (node) {
            return {
                id: node.id || node.Id,
                color: node.color || node.Color,
                label: node.label || node.Label || { text: node.id || node.Id }
            };
        });

        var nodeMap = {};
        normalizedNodes.forEach(function (node) {
            nodeMap[node.id] = true;
        });

        var normalizedLinks = (newLinks || []).map(function (link) {
            return {
                sourceId: link.sourceId || link.SourceId,
                targetId: link.targetId || link.TargetId,
                value: link.value != null ? link.value : link.Value
            };
        }).filter(function (link) {
            return nodeMap[link.sourceId] && nodeMap[link.targetId];
        });

        sankeyInstance.setProperties({
            nodes: normalizedNodes,
            links: normalizedLinks
        }, true);

        sankeyInstance.refresh();
    }

function loadRealtimeDataFromServer() {
        fetch('@Url.Action("UpdateLinkData", "Home")')
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                applyRealtimeUpdate(result.SankeyNodes, result.SankeyLinks);
            })
            .catch(function (error) {
                console.error("Error applying real-time update:", error);
            });
    }

</script>

```

---

## Common Link Customization Patterns

### Pattern 1: Color Code by Flow Category

```html
<script>
    var categoryColors = {
        "Online Sales to Revenue": "#FF6B6B",
        "Retail Sales to Revenue": "#4ECDC4",
        "Product A to Online Sales": "#FFE66D"
    };

    function onLinkRendering(args) {
        var link = args.link || {};
        var key = (link.sourceId || "") + " to " + (link.targetId || "");

        if (categoryColors[key]) {
            args.fill = categoryColors[key];
        } else {
            args.fill = "#0078D4";
        }
    }
</script>
```

### Pattern 2: Highlight High-Value Flows

```html
<script>
    function onLinkRendering(args) {
        var link = args.link || {};
        var value = link.value || 0;
        var avgValue = 5000;

        if (value > avgValue * 1.5) {
            args.fill = "#FF0000";
        } else if (value < avgValue * 0.5) {
            args.fill = "#D3D3D3";
        } else {
            args.fill = "#0078D4";
        }
    }
</script>
```

### Pattern 3: Alternate Colors for Layers

```html
<script>
    function getNodeLevel(nodeId) {
        var levels = {
            "Product A": 0,
            "Product B": 0,
            "Product C": 0,
            "Online Sales": 1,
            "Retail Sales": 1,
            "Revenue": 2
        };

        return levels[nodeId] || 0;
    }

    function onLinkRendering(args) {
        var link = args.link || {};
        var sourceLevel = getNodeLevel(link.sourceId || "");
        var levelColors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3"];

        args.fill = levelColors[sourceLevel % levelColors.length];
    }
</script>
```

### Pattern 4: Interactive Link Highlighting

For Sankey link interaction, the clean built-in approach is to combine:

- `Opacity(...)`
- `HighlightOpacity(...)`
- `InactiveOpacity(...)`

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Opacity(0.55).HighlightOpacity(1).InactiveOpacity(0.15).ColorType(Syncfusion.EJ2.Charts.ColorType.Source)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Best Practices

1. **Consistent opacity** - Keep your link opacity range visually consistent across the chart.
2. **Value-based thickness** - Let `SankeyLink.Value` represent real flow volume because thickness is derived from that value automatically.
3. **Meaningful colors** - Use source color, target color, blend, or value-based color rules to communicate category or importance clearly.
4. **Efficient rendering logic** - Keep `LinkRendering` lightweight, especially when many links are present.
5. **Plain object updates** - When updating links dynamically on the client, assign plain `nodes` and `links` objects and then refresh.
6. **Strong typing** - Use `List<SankeyNode>` and `List<SankeyLink>` in MVC to avoid lambda and runtime binding issues.
7. **Continuous helper chaining** - Keep the Sankey helper in a continuous MVC chain for readability and consistent rendering.

---

## Future reference

- Use `.LinkStyle(...)` instead of `.LinkSettings(...)` for Sankey link configuration.
- Use `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`.
- Use `.ColorType(Source|Target|Blend)` for built-in link color behavior.
- Use `.Curvature(...)` for path bending instead of a linear-or-curve text option.
- Use `.LinkRendering("...")` when you need per-link custom coloring.
- For dynamic updates, rebind plain `nodes` and `links` collections on the Sankey instance and call `refresh()`.