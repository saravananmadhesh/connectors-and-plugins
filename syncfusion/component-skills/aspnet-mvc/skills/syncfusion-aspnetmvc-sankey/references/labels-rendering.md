# Labels and Rendering in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Analysis summary](#analysis-summary)
- [Label Configuration Basics](#label-configuration-basics)
  - [Enabling Labels](#enabling-labels)
  - [Basic Label Configuration](#basic-label-configuration)
  - [Supported Label Settings](#supported-label-settings)
  - [About Label Positioning](#about-label-positioning)
- [Label Visibility Control](#label-visibility-control)
  - [Show All Labels](#show-all-labels)
  - [Hide All Labels](#hide-all-labels)
  - [Conditional Label Visibility](#conditional-label-visibility)
- [Controller](#controller)
  - [Dynamic Label Visibility Toggle](#dynamic-label-visibility-toggle)
- [Font Styling and Sizing](#font-styling-and-sizing)
  - [Setting Label Font](#setting-label-font)
  - [Common Font Properties](#common-font-properties)
  - [Bold Labels for Emphasis](#bold-labels-for-emphasis)
  - [Color-Coded Label Fonts](#color-coded-label-fonts)
  - [Font Size Variation by Label Content](#font-size-variation-by-label-content)
- [Individual Node Label Customization](#individual-node-label-customization)
  - [Conditional Label Content](#conditional-label-content)
  - [Labels with Formatted Text](#labels-with-formatted-text)
  - [Node-Specific Label Styling](#node-specific-label-styling)
  - [Display Additional Information in Labels](#display-additional-information-in-labels)
- [Label Rendering Events](#label-rendering-events)
  - [Basic Label Rendering Event](#basic-label-rendering-event)
  - [Comprehensive Label Event Handling](#comprehensive-label-event-handling)
  - [Using NodeRendering Alongside LabelRendering](#using-noderendering-alongside-labelrendering)
- [Dynamic Labels](#dynamic-labels)
  - [Updating Labels on Data Change](#updating-labels-on-data-change)
  - [Labels Based on Node Index](#labels-based-on-node-index)
  - [Localized Labels](#localized-labels)
    - [Controller-side localization helper](#controller-side-localization-helper)
  - [Value-Based Label Content](#value-based-label-content)
- [Common Label Patterns](#common-label-patterns)
  - [Pattern 1: Hierarchical Labels](#pattern-1-hierarchical-labels)
  - [Pattern 2: Category Prefixes](#pattern-2-category-prefixes)
  - [Pattern 3: Truncated Labels for Space](#pattern-3-truncated-labels-for-space)
  - [Pattern 4: Enhanced Labels with Prefix Icons or Symbols](#pattern-4-enhanced-labels-with-prefix-icons-or-symbols)
  - [Pattern 5: Multi-Part Labels](#pattern-5-multi-part-labels)
  - [Pattern 6: Smart Label Visibility](#pattern-6-smart-label-visibility)
- [Best Practices](#best-practices)


## Analysis summary

For the ASP.NET MVC Sankey Chart, label configuration is handled through the component-level `LabelSettings(...)` API, and label customization at render time is handled through the `LabelRendering(...)` event. Node appearance is handled separately through `NodeStyle(...)` for global styling and `NodeRendering(...)` for per-node rendering customization.

A few parts of the original draft needed alignment with the actual ASP.NET MVC Sankey API:

- Use `@Html.EJS().Sankey(...)`
- Bind labels through `.LabelSettings(...)`, not through `.NodeSettings(...).Label(...)`
- Bind data through `.Nodes(...)` and `.Links(...)`
- Use `Color(...)` for label text color, not `FontColor(...)`
- Label position options such as `Top`, `Middle`, and `Bottom` are not part of the Sankey `LabelSettings` builder in ASP.NET MVC
- For per-label content changes, prefer `LabelRendering(...)`
- For per-node appearance changes, prefer `NodeRendering(...)`

---

## Label Configuration Basics

Labels are the text displayed for Sankey nodes. In ASP.NET MVC Sankey, label behavior is configured through `LabelSettings(...)`.

### Enabling Labels

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls
        .Visible(true)
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Basic Label Configuration

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls
        .Visible(true)
        .Color("#222222")
        .FontFamily("Segoe UI")
        .FontSize("12px")
        .FontWeight("400")
        .Padding(6)
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Supported Label Settings

The Sankey label builder supports the following label-related members:

- `Visible(bool)`
- `Color(string)`
- `FontFamily(string)`
- `FontSize(string)` or `FontSize(double)`
- `FontStyle(string)`
- `FontWeight(string)`
- `Padding(double)`

### About Label Positioning

The Sankey ASP.NET MVC `LabelSettings` builder does not expose a label position API such as `Top`, `Middle`, or `Bottom`.

If you need better label placement, use one or more of these approaches instead:

- Adjust overall Sankey layout using `Width(...)`, `Height(...)`, `Margin(...)`, and `Orientation(...)`
- Use `Padding(...)` in `LabelSettings(...)`
- Shorten or transform label text in `LabelRendering(...)`
- Use tooltip content for additional detail instead of forcing more label content into limited node space

---

## Label Visibility Control

### Show All Labels

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(
        ls => ls.Visible(true)
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Hide All Labels

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(
        ls => ls.Visible(false)
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Conditional Label Visibility

For selective visibility, use `LabelRendering(...)` and return an empty text value for labels you do not want displayed.

```cshrap
using Syncfusion.EJ2.Charts;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class SankeyAccessibilityViewModel
    {
        public List<SankeyNode> SankeyNodes { get; set; }
        public List<SankeyLink> SankeyLinks { get; set; }
    }
}
```

## Controller

```csharp
using Syncfusion.EJ2.Charts;
using System.Collections.Generic;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Products", Color = "#0078D4" },
                    new SankeyNode { Id = "Online", Color = "#107C10" },
                    new SankeyNode { Id = "Retail", Color = "#8764B8" },
                    new SankeyNode { Id = "Revenue", Color = "#D13438" }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Products", TargetId = "Online", Value = 120 },
                    new SankeyLink { SourceId = "Products", TargetId = "Retail", Value = 80 },
                    new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 120 },
                    new SankeyLink { SourceId = "Retail", TargetId = "Revenue", Value = 80 }
                }
            };

            return View(model);
        }
    }
}
```
```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(
        ls => ls.Visible(true)
    ).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLabelRendering(args) {
        var mainCategories = ["Products", "Revenue"];
        if (mainCategories.indexOf(args.text) !== -1) {
            args.text = "";
        }
    }
</script>
```

### Dynamic Label Visibility Toggle

```cshtml
<button type="button" onclick="toggleLabels()">Toggle Labels</button>

@Html.EJS().Sankey("sankey").Nodes(Model.Nodes).Links(Model.Links).Render()

<script>
    var labelsVisible = true;

    function toggleLabels() {
        var sankey = document.getElementById("sankey").ej2_instances[0];
        labelsVisible = !labelsVisible;

        sankey.labelSettings.visible = labelsVisible;
        sankey.refresh();
    }
</script>
```

---

## Font Styling and Sizing

### Setting Label Font

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls
        .Visible(true)
        .FontFamily("Arial")
        .FontSize("12px")
        .FontWeight("400")
        .Color("#000000")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Common Font Properties

- `FontFamily("Arial")`
- `FontSize("12px")`
- `FontWeight("400")` or `FontWeight("700")`
- `FontStyle("Italic")`
- `Color("#000000")`

### Bold Labels for Emphasis

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(
        ls => ls
        .Visible(true)
        .FontWeight("700")
        .FontSize("14px")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Color-Coded Label Fonts

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls
        .Visible(true)
        .Color("#0078D4")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Font Size Variation by Label Content

For per-label visual adjustments at render time, use `LabelRendering(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)
    ).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLabelRendering(args) {
        var value = getTotalNodeValue(args.text);

        args.style = args.style || {};

        if (value > 8000) {
            args.style.fontSize = "14px";
            args.style.fontWeight = "700";
        } else if (value > 4000) {
            args.style.fontSize = "12px";
            args.style.fontWeight = "600";
        } else {
            args.style.fontSize = "10px";
            args.style.fontWeight = "400";
        }
    }

    function getTotalNodeValue(labelText) {
        return 5000;
    }
</script>
```

---

## Individual Node Label Customization

For label text customization by node, the cleanest pattern is to use `LabelRendering(...)` and apply a text map or a rule set.

### Conditional Label Content

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLabelRendering(args) {
        if (args.text.indexOf("Products") !== -1) {
            args.text = args.text.toUpperCase();
        } else if (args.text.indexOf("Revenue") !== -1) {
            args.text = "Revenue - " + args.text;
        }
    }
</script>
```

### Labels with Formatted Text

```html
<script>
    function onLabelRendering(args) {
        if (args.text.indexOf("Products") !== -1) {
            args.text = "[Products] " + args.text;
        } else if (args.text.indexOf("Retail") !== -1) {
            args.text = "[Retail] " + args.text;
        } else if (args.text.indexOf("Revenue") !== -1) {
            args.text = "[REVENUE] " + args.text;
        }
    }
</script>
```

### Node-Specific Label Styling

```html
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    var labelStyles = {
        "Products 200": { fontSize: "14px", color: "#FF6B6B", fontWeight: "700" },
        "Retail 80": { fontSize: "14px", color: "#4ECDC4", fontWeight: "700" },
        "Online 120": { fontSize: "12px", color: "#FFE66D", fontWeight: "400" },
        "Revenue 200": { fontSize: "16px", color: "#FFD700", fontWeight: "700" }
    };

    function onLabelRendering(args) {
        var style = labelStyles[args.text];

        if (style) {
            args.labelStyle = args.label || {};
            args.labelStyle.fontSize = style.fontSize;
            args.labelStyle.color = style.color;
            args.labelStyle.fontWeight = style.fontWeight;
        }
    }
</script>
```

### Display Additional Information in Labels

```html
<script>
    function onLabelRendering(args) {
        var additionalInfo = getNodeValue(args.text);
        args.text = args.text + " (" + additionalInfo + ")";
    }

    function getNodeValue(labelText) {
        return "1000";
    }
</script>
```

---

## Label Rendering Events

### Basic Label Rendering Event

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLabelRendering(args) {
        console.log("Label:", args.text);
        args.text = args.text.toUpperCase();
    }
</script>
```

### Comprehensive Label Event Handling

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onLabelRendering(args) {
        var label = args.text || "";

        if (label.length > 20) {
            args.text = label.substring(0, 17) + "...";
        }

        args.labelStyle = args.labelStyle || {};
        args.labelStyle.fontSize = "12px";
        args.labelStyle.color = "#000000";
    }
</script>
```

### Using NodeRendering Alongside LabelRendering

Use `NodeRendering(...)` for node appearance and keep label text logic in `LabelRendering(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).NodeRendering("onNodeRendering").LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onNodeRendering(args) {
        if (args.node && args.node.id === "Revenue") {
            args.node.color = "#FFD700";
        }
    }

    function onLabelRendering(args) {
        if (args.text === "Revenue 200") {
            args.labelStyle = args.labelStyle || {};
            args.labelStyle.fontWeight = "700";
            args.labelStyle.fontSize = "18px";
        }
    }
</script>
```

---

## Dynamic Labels

### Updating Labels on Data Change

If label text depends on live data, update the underlying mapping or data and then refresh the component.

```html
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(ls => ls.Visible(true)).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    var labelMap = {
        "Products 200": "Products",
        "Online 120": "Online"
    };

    function updateLabels(newLabelMap) {
        labelMap = newLabelMap || labelMap;

        var sankey = document.getElementById("sankey").ej2_instances[0];
        sankey.refresh();
    }

    function onLabelRendering(args) {
        if (labelMap[args.text]) {
            args.text = labelMap[args.text];
        }
    }
</script>
```

### Labels Based on Node Index

If your node metadata includes a stable index or order value, you can prepend it during rendering.

```html
<script>
    var nodeOrder = {
        "Products 200": 1,
        "Online 120": 2,
        "Retail 80": 3,
        "Revenue 200": 4
    };

    function onLabelRendering(args) {
        if (nodeOrder[args.text]) {
            args.text = nodeOrder[args.text] + ": " + args.text;
        }
    }
</script>
```

### Localized Labels

#### Controller-side localization helper
```cshtml
@* Views/Home/Index.cshtml *@
@using WebApplication1.Helpers
@model WebApplication1.Models.SankeyAccessibilityViewModel
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LabelSettings(
        ls => ls.Visible(true)
    ).LabelRendering("onLabelRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    var language = "@ViewBag.Language";

    var translations = {
    "Products": { en: "Products", es: "Productos" },
    "Retail": { en: "Retail Channel", es: "Canal de Ventas" }
    };

    function onLabelRendering(args)
    {
    if (translations[args.text] && translations[args.text][language])
    {
    args.text = translations[args.text][language];
    }
    }
</script>
```
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
            string language = "es";

            var model = new SankeyAccessibilityViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode
                    {
                        Id = "Products",
                        Label = new SankeyChartDataLabel
                        {
                            Text = SankeyAccessibilityHelper.GetLocalizedLabel("Products", language)
                        },
                        Color = "#0078D4"
                    },
                    new SankeyNode
                    {
                        Id = "Online",
                        Label = new SankeyChartDataLabel
                        {
                            Text = SankeyAccessibilityHelper.GetLocalizedLabel("Online", language)
                        },
                        Color = "#107C10"
                    },
                    new SankeyNode
                    {
                        Id = "Retail",
                        Label = new SankeyChartDataLabel
                        {
                            Text = SankeyAccessibilityHelper.GetLocalizedLabel("Retail", language)
                        },
                        Color = "#8764B8"
                    },
                    new SankeyNode
                    {
                        Id = "Revenue",
                        Label = new SankeyChartDataLabel
                        {
                            Text = SankeyAccessibilityHelper.GetLocalizedLabel("Revenue", language)
                        },
                        Color = "#D13438"
                    }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Products", TargetId = "Online", Value = 120 },
                    new SankeyLink { SourceId = "Products", TargetId = "Retail", Value = 80 },
                    new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 120 },
                    new SankeyLink { SourceId = "Retail", TargetId = "Revenue", Value = 80 }
                }
            };

            return View(model);
        }
    }
}
```
```csharp

using System.Collections.Generic;

namespace WebApplication1.Helpers
{
    public static class SankeyAccessibilityHelper
    {
        private static readonly Dictionary<string, Dictionary<string, string>> _translations =
            new Dictionary<string, Dictionary<string, string>>
            {
                ["en"] = new Dictionary<string, string>
                {
                    { "Products", "Products" },
                    { "Retail", "Retail Channel" }
                },
                ["es"] = new Dictionary<string, string>
                {
                    { "Products", "Productos" },
                    { "Retail", "Canal de minorista" }
                }
            };
    public static string GetLocalizedLabel(string key, string language)
        {
            if (!string.IsNullOrEmpty(language) &&
                _translations.ContainsKey(language) &&
                _translations[language].ContainsKey(key))
            {
                return _translations[language][key];
            }

            return key;
        }
    }
}
```

### Value-Based Label Content

```html
<script>
    function onLabelRendering(args) {
        var value = getTotalNodeValue(args.text);
        args.text = args.text + " (" + value.toLocaleString() + ")";
    }

    function getTotalNodeValue(labelText) {
        return 5000;
    }
</script>
```

---

## Common Label Patterns

### Pattern 1: Hierarchical Labels

```html
<script>
    function onLabelRendering(args) {
        var level = getNodeLevel(args.text);
        var indent = new Array(level + 1).join("  ");
        args.text = indent + args.text;
    }

    function getNodeLevel(labelText) {
        if (labelText.indexOf("Products") !== -1) return 0;
        if (labelText.indexOf("Channel") !== -1) return 1;
        if (labelText.indexOf("Revenue") !== -1) return 2;
        return 0;
    }
</script>
```

### Pattern 2: Category Prefixes

```html
<script>
    function onLabelRendering(args) {
        var prefixes = {
            "Products": "[P]",
            "Online": "[O]",
            "Store": "[S]",
            "Revenue": "[R]"
        };

        for (var key in prefixes) {
            if (args.text.indexOf(key) !== -1) {
                args.text = prefixes[key] + " " + args.text;
                break;
            }
        }
    }
</script>
```

### Pattern 3: Truncated Labels for Space

```html
<script>
    var maxLabelLength = 15;

    function onLabelRendering(args) {
        if (args.text.length > maxLabelLength) {
            args.text = args.text.substring(0, maxLabelLength - 3) + "...";
        }
    }
</script>
```

### Pattern 4: Enhanced Labels with Prefix Icons or Symbols

```html
<script>
    var iconMap = {
        "Products": "■",
        "Retail": "$",
        "Online": "@",
        "Store": "#",
        "Revenue": "+"
    };

    function onLabelRendering(args) {
        for (var key in iconMap) {
            if (args.text.indexOf(key) !== -1) {
                args.text = iconMap[key] + " " + args.text;
                break;
            }
        }
    }
</script>
```

### Pattern 5: Multi-Part Labels

```html
<script>
    function onLabelRendering(args) {
        var value = getTotalNodeValue(args.text);
        args.text = args.text + " - " + value.toLocaleString();
    }

    function getTotalNodeValue(labelText) {
        return 5000;
    }
</script>
```

### Pattern 6: Smart Label Visibility

```html
<script>
    function onLabelRendering(args) {
        var value = getTotalNodeValue(args.text);
        var threshold = 1000;

        if (value < threshold) {
            args.text = "";
        }
    }

    function getTotalNodeValue(labelText) {
        return 500;
    }
</script>
```

## Best Practices

1. **Readable Text** - Ensure labels are large enough to read at display size
2. **Consistent Styling** - Use uniform fonts and colors across similar node types
3. **Abbreviations** - Consider abbreviations or icons for space-constrained layouts
4. **Hierarchy** - Use font size or style to indicate importance levels
5. **Truncation** - Gracefully truncate long labels rather than overflow
6. **Performance** - Keep label rendering logic efficient with large datasets
