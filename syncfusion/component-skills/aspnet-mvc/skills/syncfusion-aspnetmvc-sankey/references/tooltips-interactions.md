# Tooltips and Interactions in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Tooltip Basics](#tooltip-basics)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Basic Tooltip Configuration](#basic-tooltip-configuration)
  - [Tooltip Format](#tooltip-format)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Templates](#tooltip-templates)
  - [Practical Tooltip Customization Pattern](#practical-tooltip-customization-pattern)
  - [Basic Custom Tooltip Content](#basic-custom-tooltip-content)
  - [Node-Oriented Tooltip Content](#node-oriented-tooltip-content)
  - [Link-Oriented Tooltip Content](#link-oriented-tooltip-content)
  - [HTML in Tooltip Content](#html-in-tooltip-content)
- [Custom Tooltip Content](#custom-tooltip-content)
  - [Dynamic Tooltip Content from Custom Mappings](#dynamic-tooltip-content-from-custom-mappings)
  - [Calculated Tooltip Content](#calculated-tooltip-content)
  - [Formatted Currency in Tooltips](#formatted-currency-in-tooltips)
- [Tooltip Events](#tooltip-events)
  - [Tooltip Rendering Event](#tooltip-rendering-event)
  - [Conditional Tooltip Display](#conditional-tooltip-display)
  - [Practical note about tooltip show/hide events](#practical-note-about-tooltip-showhide-events)
- [Node and Link Click Interactions](#node-and-link-click-interactions)
  - [Node Click Event](#node-click-event)
  - [Link Click Event](#link-click-event)
  - [Double-Click Interaction Pattern](#double-click-interaction-pattern)
- [Hover Effects](#hover-effects)
  - [Built-In Hover Highlighting](#built-in-hover-highlighting)
  - [Node Hover Events](#node-hover-events)
  - [Link Hover Events](#link-hover-events)
  - [Custom Hover Styling with Rendering Events](#custom-hover-styling-with-rendering-events)
- [Common Interaction Patterns](#common-interaction-patterns)
  - [Pattern 1: Click to Select and Filter](#pattern-1-click-to-select-and-filter)
  - [Pattern 2: Hover to Highlight a Path](#pattern-2-hover-to-highlight-a-path)
  - [Pattern 3: Click to Show Details Panel](#pattern-3-click-to-show-details-panel)
- [Best Practices](#best-practices)

---

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyInteractionViewModel
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
        public ActionResult TooltipsAndInteractions()
        {
            var model = new SankeyInteractionViewModel
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
                        Id = "Online",
                        Color = "#95E1D3",
                        Label = new SankeyChartDataLabel { Text = "Online" }
                    },
                    new SankeyNode
                    {
                        Id = "Retail",
                        Color = "#A78BFA",
                        Label = new SankeyChartDataLabel { Text = "Retail" }
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
                    new SankeyLink { SourceId = "Product A", TargetId = "Online", Value = 500 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Retail", Value = 420 },
                    new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 500 },
                    new SankeyLink { SourceId = "Retail", TargetId = "Revenue", Value = 420 }
                }
            };

            return View(model);
        }
    }
}
```

---

## Tooltip Basics

Tooltips are informational pop-ups that appear when users hover over nodes or links in the Sankey chart. They provide additional context for the current element.

### Enabling Tooltips

Use `.Tooltip(t => t.Enable(true))` on the Sankey helper.

```cshtml
@model WebApplication1.Models.SankeyInteractionViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(
        t => t.Enable(true)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Basic Tooltip Configuration

A clean interactive configuration often combines tooltip enablement with node and link opacity behavior.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(
        t => t.Enable(true)
    ).NodeStyle(
        ns => ns.Width(40).Padding(15).Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.3)
    ).LinkStyle(
        ls => ls.Opacity(0.6).HighlightOpacity(1).InactiveOpacity(0.2)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Tooltip Format

Use the `NodeFormat` and `LinkFormat` properties to customize the tooltip content displayed for Sankey nodes and links.

- `NodeFormat` controls the tooltip content for nodes.
- `LinkFormat` controls the tooltip content for links.

```cshtml
@Html.EJS().Sankey("sankey")
    .Width("100%")
    .Height("500px")
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .NodeFormat("$name : $value")
        .LinkFormat(
            "$start.name ($start.value) → " +
            "$target.name ($target.value) : $value"
        )
    )
    .Nodes(Model.SankeyNodes)
    .Links(Model.SankeyLinks)
    .Render()
```

In the above example, the node tooltip displays the node name and value. The link tooltip displays the source node, target node, and link value.

The following placeholders can be used in the tooltip format:

- `$name` or `${name}`: Displays the hovered node name.
- `$value` or `${value}`: Displays the hovered node or link value.
- `$start.name` or `${start.name}`: Displays the source node name.
- `$start.value` or `${start.value}`: Displays the source node value.
- `$start.out` or `${start.out}`: Displays the outgoing value from the source node.
- `$target.name` or `${target.name}`: Displays the target node name.
- `$target.value` or `${target.value}`: Displays the target node value.
- `$target.in` or `${target.in}`: Displays the incoming value to the target node.

> **Note:** Node tooltips use node-related placeholders such as `$name` and `$value`. Link tooltips can use link-related placeholders such as `$start.name`, `$target.name`, and `$value`.

### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `NodeFormat` and `LinkFormat` properties by adding number format specifiers to supported tooltip placeholders. This allows node and link values to be formatted without using the `TooltipRendering` event.

A format specifier is applied by adding a colon (`:`) followed by the required format. Sankey tooltips support both `$placeholder` and `${placeholder}` syntax. When applying formatting, use the `${placeholder:format}` syntax.

```cshtml
@Html.EJS().Sankey("sankey")
    .Width("100%")
    .Height("500px")
    .Tooltip(tooltip => tooltip
        .Enable(true)
        .NodeFormat("$name : ${value:n2}")
        .LinkFormat(
            "$start.name (${start.out:n2}) → " +
            "${target.name} (${target.in:n2}) : ${value:n2}"
        )
    )
    .Nodes(Model.SankeyNodes)
    .Links(Model.SankeyLinks)
    .Render()
```

In the above example, `$name` and `$start.name` display text values directly, while `${value:n2}`, `${start.out:n2}`, and `${target.in:n2}` display numeric values with two decimal places.

Sankey tooltip values can be displayed using either of the following placeholder syntaxes:

- `$start.name` or `${start.name}`: Displays the source node name.
- `$target.name` or `${target.name}`: Displays the target node name.
- `$value` or `${value}`: Displays the node or link value.

To apply formatting, use the `${placeholder:format}` syntax. For example, `${value:n2}` displays the resolved value with two decimal places.

Inline formatting can be applied to the following tooltip placeholders:

- `$name` or `${name}`: Specifies the name or label of the hovered node.
- `$value`, `${value}`, or `${value:n2}`: Specifies the value of the hovered node or link.
- `$start.name` or `${start.name}`: Specifies the source node name.
- `$start.value`, `${start.value}`, or `${start.value:n2}`: Specifies the source node value.
- `$start.out`, `${start.out}`, or `${start.out:n2}`: Specifies the outgoing value from the source node.
- `$target.name` or `${target.name}`: Specifies the target node name.
- `$target.value`, `${target.value}`, or `${target.value:n2}`: Specifies the target node value.
- `$target.in`, `${target.in}`, or `${target.in:n2}`: Specifies the incoming value to the target node.

> **Important:** Sankey tooltip placeholders can use either `$placeholder` or `${placeholder}` syntax. However, number formatting requires the `${placeholder:format}` syntax, such as `${value:n2}`, `${start.out:n2}`, or `${target.in:n2}`. String placeholders such as `${name}`, `${start.name}`, and `${target.name}` are displayed as plain text and do not support number formatting.

The following number formats are supported:

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

---

## Tooltip Templates

### Practical Tooltip Customization Pattern

For Sankey, the most reliable tooltip customization pattern is to enable the tooltip and use `TooltipRendering` to modify the content before display.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(
        t => t.Enable(true)
    ).TooltipRendering("onTooltipRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Basic Custom Tooltip Content

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        var text = "";

        if (args.node) {
            var nodeId = args.node.id || "";
            text = "<div><b>" + nodeId + "</b></div>";
        } else if (args.link) {
            var sourceId = args.link.sourceId || "";
            var targetId = args.link.targetId || "";
            var value = args.link.value || 0;

            text = "<div><b>" + sourceId + " → " + targetId + "</b><br/>Value: " + value + "</div>";
        }

        args.text = text;
    }
</script>
```

### Node-Oriented Tooltip Content

```html
<script>
    function onTooltipRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var incomingValue = calculateIncoming(nodeId);
        var outgoingValue = calculateOutgoing(nodeId);

        args.text =
            "<div>" +
                "<b>" + nodeId + "</b><br/>" +
                "Incoming: " + incomingValue + "<br/>" +
                "Outgoing: " + outgoingValue +
            "</div>";
    }

    function calculateIncoming(nodeId) {
        var sankeyInstance = document.getElementById("sankey").ej2_instances[0];
        var links = sankeyInstance && sankeyInstance.links ? sankeyInstance.links : [];
        var total = 0;

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var targetId = link.targetId || link.TargetId;
            var value = link.value != null ? link.value : link.Value;

            if (targetId === nodeId) {
                total += value || 0;
            }
        }

        return total;
    }

    function calculateOutgoing(nodeId) {
        var sankeyInstance = document.getElementById("sankey").ej2_instances[0];
        var links = sankeyInstance && sankeyInstance.links ? sankeyInstance.links : [];
        var total = 0;

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var sourceId = link.sourceId || link.SourceId;
            var value = link.value != null ? link.value : link.Value;

            if (sourceId === nodeId) {
                total += value || 0;
            }
        }

        return total;
    }
</script>
```

### Link-Oriented Tooltip Content

```html
<script>
    function onTooltipRendering(args) {
        if (!args || !args.link) {
            return;
        }

        var sourceId = args.link.sourceId || "";
        var targetId = args.link.targetId || "";
        var value = args.link.value || 0;

        args.text =
            "<div>" +
                "<b>" + sourceId + " → " + targetId + "</b><br/>" +
                "Value: " + value +
            "</div>";
    }
</script>
```

### HTML in Tooltip Content

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.node) {
            var nodeId = args.node.id || "";
            args.text =
                "<div>" +
                    "<b style='color: #0078D4;'>" + nodeId + "</b><br/>" +
                    "<span style='font-size: 12px; color: #666;'>Interactive Sankey node</span>" +
                "</div>";
        }
    }
</script>
```

---

## Custom Tooltip Content

### Dynamic Tooltip Content from Custom Mappings

If you need richer tooltip content, use a client-side lookup map keyed by node id or link route.

```html
<script>
    var nodeMetadata = {
        "Product A": {
            category: "Electronics",
            description: "Main product line",
            percentage: 35
        },
        "Product B": {
            category: "Retail Goods",
            description: "Secondary product line",
            percentage: 28
        },
        "Revenue": {
            category: "Finance",
            description: "Final output node",
            percentage: 100
        }
    };

    function onTooltipRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        var metadata = nodeMetadata[nodeId];

        if (!metadata) {
            return;
        }

        args.text =
            "<div>" +
                "<b>" + nodeId + "</b><br/>" +
                "Category: " + metadata.category + "<br/>" +
                "Description: " + metadata.description + "<br/>" +
                "Percentage: " + metadata.percentage + "%" +
            "</div>";
    }
</script>
```

### Calculated Tooltip Content

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.node) {
            var nodeId = args.node.id || "";
            var incomingValue = calculateIncoming(nodeId);
            var outgoingValue = calculateOutgoing(nodeId);

            args.text =
                "<div>" +
                    "<b>" + nodeId + "</b><br/>" +
                    "Incoming: " + incomingValue + "<br/>" +
                    "Outgoing: " + outgoingValue +
                "</div>";
        }
    }
</script>
```

### Formatted Currency in Tooltips

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.link) {
            var sourceId = args.link.sourceId || "";
            var targetId = args.link.targetId || "";
            var value = args.link.value || 0;

            args.text =
                "<div style='padding: 10px;'>" +
                    "<b>" + sourceId + " → " + targetId + "</b><br/>" +
                    "Value: $" + Number(value).toLocaleString() +
                "</div>";
        }
    }
</script>
```

---

## Tooltip Events

### Tooltip Rendering Event

The main built-in tooltip customization point is `TooltipRendering`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(
        t => t.Enable(true)
    ).TooltipRendering("onTooltipRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.node) {
            args.text = "<b>" + (args.node.id || "") + "</b>";
        } else if (args.link) {
            args.text = (args.link.sourceId || "") + " → " + (args.link.targetId || "");
        }
    }
</script>
```

### Conditional Tooltip Display

A simple pattern is to cancel tooltip rendering for lower-value flows.

```html
<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.link) {
            var value = args.link.value || 0;

            if (value < 100) {
                args.cancel = true;
            }
        }
    }
</script>
```

### Practical note about tooltip show/hide events

The standard Sankey event surface here centers on `TooltipRendering` for tooltip customization. If you need additional UI behavior when the user hovers or moves away, combine `NodeEnter`, `NodeLeave`, `LinkEnter`, and `LinkLeave` with your own page logic.

---

## Node and Link Click Interactions

### Node Click Event

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeClick("onNodeClick").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeClick(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        console.log("Node clicked:", nodeId);

        highlightConnectedElements(nodeId);
    }

    function highlightConnectedElements(nodeId) {
        var sankeyInstance = document.getElementById("sankey").ej2_instances[0];

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.refresh();
    }
</script>
```

### Link Click Event

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkClick("onLinkClick").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkClick(args) {
        if (!args || !args.link) {
            return;
        }

        var sourceId = args.link.sourceId || "";
        var targetId = args.link.targetId || "";
        var value = args.link.value || 0;

        console.log("Link clicked:", sourceId, "→", targetId);
        showLinkDetails(sourceId, targetId, value);
    }

    function showLinkDetails(sourceId, targetId, value) {
        alert(sourceId + " → " + targetId + ": " + value);
    }
</script>
```

### Double-Click Interaction Pattern

There is no dedicated Sankey double-click helper event here, so double-click behavior can be layered on top of `NodeClick`.

```html
<script>
    var lastClickTime = 0;
    var lastClickedNodeId = null;

    function onNodeClick(args) {
        if (!args || !args.node) {
            return;
        }

        var now = Date.now();
        var nodeId = args.node.id || "";

        if (now - lastClickTime < 300 && lastClickedNodeId === nodeId) {
            onNodeDoubleClick(args.node);
        }

        lastClickTime = now;
        lastClickedNodeId = nodeId;
    }

    function onNodeDoubleClick(node) {
        var nodeId = node.id || "";
        console.log("Double clicked node:", nodeId);
    }
</script>
```

---

## Hover Effects

### Built-In Hover Highlighting

The clean built-in Sankey hover effect uses node and link opacity settings.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Width(40).Padding(15).Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.25)
    ).LinkStyle(
        ls => ls.Opacity(0.55).HighlightOpacity(1).InactiveOpacity(0.15)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Node Hover Events

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeEnter("onNodeEnter").NodeLeave("onNodeLeave").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeEnter(args) {
        if (!args || !args.node) {
            return;
        }

        console.log("Hovering over node:", args.node.id || "");
    }

    function onNodeLeave(args) {
        if (!args || !args.node) {
            return;
        }

        console.log("Mouse left node:", args.node.id || "");
    }
</script>
```

### Link Hover Events

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkEnter("onLinkEnter").LinkLeave("onLinkLeave").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLinkEnter(args) {
        if (!args || !args.link) {
            return;
        }

        console.log("Hovering over link:", (args.link.sourceId || "") + " → " + (args.link.targetId || ""));
    }

    function onLinkLeave(args) {
        if (!args || !args.link) {
            return;
        }

        console.log("Mouse left link:", (args.link.sourceId || "") + " → " + (args.link.targetId || ""));
    }
</script>
```

### Custom Hover Styling with Rendering Events

A stable pattern is to keep the built-in highlight behavior and optionally adjust color in rendering events if needed.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.3)
    ).LinkStyle(
        ls => ls.Opacity(0.6).HighlightOpacity(1).InactiveOpacity(0.2)
    ).NodeRendering("onNodeRendering").LinkRendering("onLinkRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (!args || !args.node) {
            return;
        }

        if (!args.node.color) {
            args.node.color = "#0078D4";
        }
    }

    function onLinkRendering(args) {
        if (!args || !args.link) {
            return;
        }

        if (!args.fill) {
            args.fill = "#599DBD";
        }
    }
</script>
```

---

## Common Interaction Patterns

### Pattern 1: Click to Select and Filter

For Sankey, if you need filtering, update the client-side `links` and `nodes` collections and refresh.

```html
<script>
    function onNodeClick(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        filterBySelectedNode(nodeId);
    }

    function filterBySelectedNode(nodeId) {
        var sankeyInstance = document.getElementById("sankey").ej2_instances[0];

        if (!sankeyInstance) {
            return;
        }

        var currentLinks = (sankeyInstance.links || []).map(function (link) {
            return {
                sourceId: link.sourceId || link.SourceId,
                targetId: link.targetId || link.TargetId,
                value: link.value != null ? link.value : link.Value
            };
        });

        var filteredLinks = currentLinks.filter(function (link) {
            return link.sourceId === nodeId || link.targetId === nodeId;
        });

        var visibleNodeMap = {};
        for (var i = 0; i < filteredLinks.length; i++) {
            visibleNodeMap[filteredLinks[i].sourceId] = true;
            visibleNodeMap[filteredLinks[i].targetId] = true;
        }

        var currentNodes = (sankeyInstance.nodes || []).map(function (node) {
            return {
                id: node.id || node.Id,
                color: node.color || node.Color,
                label: {
                    text: node.label && node.label.text ? node.label.text : (node.id || node.Id)
                }
            };
        });

        var filteredNodes = currentNodes.filter(function (node) {
            return !!visibleNodeMap[node.id];
        });

        sankeyInstance.setProperties({
            nodes: filteredNodes,
            links: filteredLinks
        }, true);

        sankeyInstance.refresh();
    }
</script>
```

### Pattern 2: Hover to Highlight a Path

The cleanest built-in version is to use highlight and inactive opacity values.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeStyle(
        ns => ns.Opacity(0.9).HighlightOpacity(1).InactiveOpacity(0.2)
    ).LinkStyle(
        ls => ls.Opacity(0.55).HighlightOpacity(1).InactiveOpacity(0.1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 3: Click to Show Details Panel

```cshtml
<div id="details-panel" style="display:none; padding:10px; border:1px solid #ccc; margin-bottom:12px;">
    <h4 id="detail-title"></h4>
    <p id="detail-content"></p>
    <button type="button" onclick="closeDetails()">Close</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").NodeClick("onNodeClick").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeClick(args) {
        if (!args || !args.node) {
            return;
        }

        showDetailsPanel(args.node);
    }

    function showDetailsPanel(node) {
        var nodeId = node.id || "";
        document.getElementById("detail-title").textContent = nodeId;
        document.getElementById("detail-content").textContent =
            "Incoming: " + calculateIncoming(nodeId) + " | Outgoing: " + calculateOutgoing(nodeId);

        document.getElementById("details-panel").style.display = "block";
    }

    function closeDetails() {
        document.getElementById("details-panel").style.display = "none";
    }
</script>
```

---

## Best Practices

1. **Keep tooltip content concise** so users can read it quickly.
2. **Use `TooltipRendering` for customization** instead of relying on unsupported tooltip helper variations.
3. **Use built-in hover opacity settings** for clean highlight behavior.
4. **Use `NodeClick` and `LinkClick` for user actions** such as details panels, filtering, or drill-down.
5. **Keep hover handlers lightweight** so interaction stays smooth on larger Sankey diagrams.
