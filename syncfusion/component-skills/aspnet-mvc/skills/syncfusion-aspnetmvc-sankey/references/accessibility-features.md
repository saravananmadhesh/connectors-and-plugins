# Accessibility Features in Syncfusion ASP.NET MVC Sankey Chart

## Analysis summary

This revised version aligns the topic with the official EJ2 ASP.NET MVC Sankey initialization pattern, data binding model, supported events, tooltip/legend APIs, and documented accessibility-related surface such as built-in keyboard navigation, WAI-ARIA usage, and `FocusBorderColor`. The main adjustment is to use `.Nodes(...)` and `.Links(...)` with `SankeyNode` / `SankeyLink` collections instead of unsupported `DataSource` / `From` / `To` / `Weight` mappings, and to place accessible naming/description in surrounding semantic HTML where the MVC Sankey helper does not document direct `AriaLabel`, `AriaDescription`, `Role`, or `AllowKeyboardInteraction` fluent members. 

## Table of Contents

- [Analysis summary](#analysis-summary)
- [WCAG Compliance](#wcag-compliance)
  - [Key WCAG Principles](#key-wcag-principles)
  - [WCAG Requirements for Sankey](#wcag-requirements-for-sankey)
  - [Enabling Accessibility Features](#enabling-accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
  - [Tab Navigation](#tab-navigation)
  - [Events](#events)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Focus Management](#focus-management)
- [ARIA Attributes](#aria-attributes)
  - [Chart-Level ARIA](#chart-level-aria)
  - [Node ARIA Labels](#node-aria-labels)
  - [Link ARIA Labels](#link-aria-labels)
  - [ARIA Live Regions](#aria-live-regions)
  - [ARIA Roles and Properties](#aria-roles-and-properties)
- [Screen Reader Support](#screen-reader-support)
  - [Making Content Accessible to Screen Readers](#making-content-accessible-to-screen-readers)
  - [Accessible Data Table Alternative](#accessible-data-table-alternative)
  - [Screen Reader Testing](#screen-reader-testing)
- [Color Contrast Requirements](#color-contrast-requirements)
  - [WCAG Color Contrast Standards](#wcag-color-contrast-standards)
  - [Checking Contrast](#checking-contrast)
  - [Accessible Color Palette](#accessible-color-palette)
  - [Don’t Rely on Color Alone](#dont-rely-on-color-alone)
- [Accessible Data Representation](#accessible-data-representation)
  - [Providing Text Alternatives](#providing-text-alternatives)
  - [Accessible Label Content](#accessible-label-content)
  - [Data Export for Accessibility](#data-export-for-accessibility)
- [Testing Accessibility](#testing-accessibility)
  - [Automated Testing](#automated-testing)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Accessibility Validator](#accessibility-validator)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

---

## WCAG Compliance

The current Syncfusion EJ2 Sankey accessibility guidance for the component documents support for WCAG 2.2, Section 508, screen readers, right-to-left layouts, color contrast, mobile usage, keyboard navigation, and accessibility-checker validation. For ASP.NET MVC, the same EJ2 Sankey wrapper exposes the core Sankey component APIs, so the accessibility approach should be implemented with the documented MVC helper plus semantic HTML around the chart. 

### Key WCAG Principles

1. **Perceivable** - Information should be available in both visual and text form so assistive technologies can announce it clearly. 
2. **Operable** - Users should be able to reach and interact with the chart through the documented keyboard model. maries should clearly explain the flow being shown. 
4. **Robust** - The chart should keep the built-in WAI-ARIA semantics and use additional semantic HTML for descriptions, summaries, and status announcements. 

### WCAG Requirements for Sankey

```csharp
// 1. Provide a clear chart title and nearby text summary
// 2. Use the built-in keyboard navigation model
// 3. Keep visible labels, legend, and tooltip content meaningful
// 4. Use sufficient contrast for text and focus indication
// 5. Provide an accessible table or summary for non-visual access
```

### Enabling Accessibility Features

For ASP.NET MVC Sankey, initialize the chart with the official helper pattern, bind strongly typed `SankeyNode` and `SankeyLink` collections, keep visible labels/legend/tooltip enabled where appropriate, and use a semantic wrapper with `aria-labelledby` / `aria-describedby` for the accessible name and description. `FocusBorderColor` is a documented Sankey property and is the cleanest built-in accessibility-specific visual configuration surfaced in the MVC API reference. 

```csharp
// Models/SankeyAccessibilityViewModel.cs
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace YourApp.Models
{
    public class SankeyAccessibilityViewModel
    {
        public List<SankeyNode> Nodes { get; set; }
        public List<SankeyLink> Links { get; set; }
        public string SummaryText { get; set; }
    }
}
```

```csharp
// Controllers/HomeController.cs
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using YourApp.Models;

namespace YourApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new SankeyAccessibilityViewModel
            {
                Nodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Products", Color = "#0078D4" },
                    new SankeyNode { Id = "Online", Color = "#107C10" },
                    new SankeyNode { Id = "Retail", Color = "#8764B8" },
                    new SankeyNode { Id = "Revenue", Color = "#D13438" }
                },
                Links = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Products", TargetId = "Online", Value = 120 },
                    new SankeyLink { SourceId = "Products", TargetId = "Retail", Value = 80 },
                    new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 120 },
                    new SankeyLink { SourceId = "Retail", TargetId = "Revenue", Value = 80 }
                }
            };

            model.SummaryText = BuildSummary(model);
            return View(model);
        }

        private static string BuildSummary(SankeyAccessibilityViewModel model)
        {
            var totalValue = model.Links.Sum(x => x.Value);
            var sourceCount = model.Links.Select(x => x.SourceId).Distinct().Count();
            var targetCount = model.Links.Select(x => x.TargetId).Distinct().Count();

            return $"This Sankey chart shows {sourceCount} source groups flowing into " +
                   $"{targetCount} target groups with a total link value of {totalValue}.";
        }
    }
}
```

```cshtml
@* Views/Home/Index.cshtml *@
@model WebApplication1.Models.SankeyAccessibilityViewModel

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .status-text {
        margin-top: 12px;
        padding: 10px 12px;
        border: 1px solid #d0d7de;
        border-radius: 4px;
        background: #f8f9fa;
        color: #222;
        font-size: 14px;
    }
</style>

<section role="region" aria-labelledby="sankey-title" aria-describedby="sankey-summary">
    <h2 id="sankey-title">Sales Flow Analysis</h2>
    <p id="sankey-summary">@Model.SummaryText</p>

    @* Hidden live region for screen readers *@
    <div id="sankey-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    @* Visible status text for users *@
    <div id="sankey-visible-status" class="status-text">
        Touch or click a node or link to see details.
    </div>

    @Html.EJS().Sankey("sankey").Width("90%").Height("420px").Title("Sales Flow Analysis").FocusBorderColor("#005A9E").Tooltip(t => t
    .Enable(true)
    .NodeFormat("$name : $value")
    .LinkFormat("$start.name $start.value → $target.name $target.value")
    ).LegendSettings(l => l.Visible(true)).LabelSettings(ls => ls
    .Visible(true).Color("#1F1F1F").FontSize("12px")
    ).Nodes(Model.Nodes).Links(Model.Links).NodeClick("onNodeClick").LinkClick("onLinkClick").Render()
</section>

<script>
    function updateStatus(message) {
        var srStatus = document.getElementById("sankey-status");
        var visibleStatus = document.getElementById("sankey-visible-status");

        if (srStatus) {
            srStatus.textContent = message;
        }

        if (visibleStatus) {
            visibleStatus.textContent = message;
        }
    }

    function onNodeClick(args) {
        console.log("NodeClick args:", args);

        var node = args.node || args.data || {};
        var nodeText = node.id || node.name || node.label.text || "Unknown node";

        updateStatus("Node selected: " + nodeText);
    }

    function onLinkClick(args) {
        console.log("LinkClick args:", args);

        var link = args.link || args.data || {};
        var source = link.sourceId || (link.source && (link.source.id || link.source.name)) || "Unknown source";
        var target = link.targetId || (link.target && (link.target.id || link.target.name)) || "Unknown target";
        var value = link.value != null ? " (" + link.value + ")" : "";

        updateStatus("Link selected from " + source + " to " + target + value);
    }
</script>
```

---

## Keyboard Navigation

The Sankey component includes built-in keyboard interaction guidance. The official accessibility guidance documents the following shortcuts: `Alt + J` moves focus to the Sankey element, `Tab` and `Shift + Tab` move between focusable elements, the arrow keys move between related nodes or links, `Esc` cancels the tooltip, and `Ctrl + P` prints the Sankey chart. No separate MVC fluent member is documented for turning keyboard interaction on, so the preferred approach is to keep the component in its documented default interaction model and ensure the chart is present in the page’s tab order. 

### Tab Navigation

Use the built-in keyboard model and make sure the chart is placed in a logical part of the page so users can reach it naturally through the document flow. `FocusBorderColor` can be used to keep the active focus state visible. 

```cshtml
@Html.EJS().Sankey("sankey")
    .Width("90%")
    .Height("420px")
    .Title("Keyboard Accessible Sankey")
    .FocusBorderColor("#0078D4")
    .Tooltip(t => t.Enable(true))
    .Nodes(Model.Nodes)
    .Links(Model.Links)
    .Render()
```

### Events

The Sankey event model exposes interaction events such as `NodeClick`, `LinkClick`, `NodeEnter`, `NodeLeave`, `LinkEnter`, `LinkLeave`, `Load`, and `Loaded`. The event list does not document a Sankey-specific `KeyPress` fluent event in the MVC Sankey API surface that was retrieved, so accessibility reactions should be attached to the supported Sankey events and, when needed, to standard page-level JavaScript keyboard handlers outside the helper. 

```cshtml
@Html.EJS().Sankey("sankey").Width("90%").Height("420px").Tooltip(t => t.Enable(true)).NodeClick("onNodeClick").LinkClick("onLinkClick").Load("onSankeyLoad").Loaded("onSankeyLoaded").Nodes(Model.Nodes).Links(Model.Links).Render()


```
<script>
    function onSankeyLoad(args) {
        console.log("Sankey is loading", args);
    }

    function onSankeyLoaded(args) {
        console.log("Sankey is ready", args);
    }

    function onNodeClick(args) {
        console.log("Node interaction", args);
    }

    function onLinkClick(args) {
        console.log("Link interaction", args);
    }
</script>
### Keyboard Shortcuts

The documented keyboard shortcuts for the Sankey component are: 

- `Alt + J` - Moves focus to the Sankey chart element. 
- `Tab` - Moves focus to the next element in the chart. 
- `Shift + Tab` - Moves focus to the previous element in the chart. 
- `Down Arrow` - Moves focus to the node or link below the selected element. 
- `Up Arrow` - Moves focus to the node or link above the selected element. 
- `Left Arrow` - Moves focus to the next node or link from the selected element. 
- `Right Arrow` - Moves focus to the previous node or link from the selected element. 
- `Esc` - Cancels the tooltip for the node or link.

### Focus Management

The MVC Sankey API reference explicitly documents `FocusBorderColor`, which is the supported way to customize the focus outline color. Use that together with strong nearby headings and summaries so keyboard users always know where they are and what the chart represents. 

```cshtml
@Html.EJS().Sankey("sankey").Width("90%").Height("420px").FocusBorderColor("#0078D4").Nodes(Model.Nodes).Links(Model.Links).Render()
```

---

## ARIA Attributes

The official accessibility guidance for the EJ2 Sankey component states that the component uses WAI-ARIA patterns and includes roles/attributes such as `img`, `button`, `region`, `aria-label`, `aria-hidden`, and `aria-pressed`. In ASP.NET MVC, the most reliable implementation pattern is to let the component render its built-in semantics and add surrounding semantic HTML for chart-level labeling and description. 

### Chart-Level ARIA

Instead of relying on undocumented MVC Sankey fluent members such as `.AriaLabel(...)`, `.AriaDescription(...)`, or `.Role(...)`, use a semantic wrapper around the helper output. That preserves official MVC helper usage while still giving assistive technologies a stable accessible name and description. 

```cshtml
<section role="region" aria-labelledby="chart-title" aria-describedby="chart-desc">
    <h2 id="chart-title">Sales Flow Visualization</h2>
    <p id="chart-desc">Shows distribution of products through sales channels and resulting revenue.</p>

    @Html.EJS().Sankey("sankey").Width("90%").Height("420px").Title("Sales Flow Visualization").Nodes(Model.Nodes).Links(Model.Links).Render()
</section>
```

### Node ARIA Labels

The official documentation confirms node-level rendering and click events, but the retrieved MVC Sankey API surface does not document direct `ariaLabel` mutation members on `args.node`. For node accessibility, prefer meaningful node identifiers, visible labels, and status announcements triggered from supported events. 

```cshtml
@Html.EJS().Sankey("sankey").LabelSettings(ls => ls.Visible(true).Color("#1F1F1F")).NodeClick("announceNode").Nodes(Model.Nodes).Links(Model.Links).Render()

<script>
    function announceNode(args) {
        var status = document.getElementById("sankey-status");
        if (status && args && args.node) {
            status.textContent = "Node selected: " + (args.node.id || args.node.name || args.node.label.text || "Unknown node");
        }
    }
</script>
```

### Link ARIA Labels

For links, keep readable source/target identifiers in the data model and use the supported link events plus tooltip formatting so both visual and screen-reader users receive meaningful flow descriptions. The tooltip API documents `NodeFormat` and `LinkFormat`, which is useful for accessible descriptive text. 

```cshtml
@Html.EJS().Sankey("sankey").Tooltip(t => t
        .Enable(true)
        .LinkFormat("$start.name $start.value → $target.name $target.value")
    ).LinkClick("announceLink").Nodes(Model.Nodes).Links(Model.Links).Render()

<script>
    function announceLink(args) {
        var status = document.getElementById("sankey-status");
        if (status && args && args.link) {
            var source = args.link.sourceId || "Unknown source";
            var target = args.link.targetId || "Unknown target";
            var value = args.link.value != null ? args.link.value : "";
            status.textContent = "Flow from " + source + " to " + target + " " + value;
        }
    }
</script>
```

### ARIA Live Regions

A live region is a strong companion pattern for Sankey accessibility because it lets you announce node/link interactions without depending on undocumented Sankey helper members. The official event model includes `NodeClick` and `LinkClick`, which makes this approach a clean MVC fit. 

```cshtml
<div id="sankey-status" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

### ARIA Roles and Properties

The component already follows WAI-ARIA patterns, so the most maintainable MVC implementation is to combine the helper with semantic page structure instead of trying to manually inject every ARIA detail through undocumented fluent members. 

```cshtml
<section role="region" aria-labelledby="chart-title" aria-describedby="chart-summary">
    <h2 id="chart-title">Sales Flow Analysis</h2>
    <p id="chart-summary">This chart presents the movement of values between sources and targets.</p>

    @Html.EJS().Sankey("sankey").Title("Sales Flow Analysis").LegendSettings(l => l.Visible(true)).Tooltip(t => t.Enable(true)).Nodes(Model.Nodes).Links(Model.Links).Render()
</section>
```

---

## Screen Reader Support

The Sankey accessibility guidance documents screen reader support, and the component also provides labels, legend, tooltips, title, and interaction events that can be combined with semantic HTML to produce a strong non-visual experience. In MVC, the best pattern is to provide a concise summary, readable labels, and an accessible data alternative near the chart. 

### Making Content Accessible to Screen Readers

A text summary generated on the server is a strong complement to the Sankey visualization. This is especially useful because the official MVC Sankey examples focus on rendering through `.Nodes(...)` and `.Links(...)`, while descriptive narrative is best supplied through nearby HTML content. 

```csharp
// Helpers/SankeyAccessibilityHelper.cs
using System.Collections.Generic;
using System.Linq;
using Syncfusion.EJ2.Charts;

namespace YourApp.Helpers
{
    public static class SankeyAccessibilityHelper
    {
        public static string GetTextAlternative(List<SankeyLink> links)
        {
            var groups = links.GroupBy(x => x.SourceId);
            var parts = new List<string>();

            foreach (var group in groups)
            {
                var targets = string.Join(", ", group.Select(x => $"{x.TargetId} ({x.Value})"));
                parts.Add($"{group.Key} flows to {targets}");
            }

            return "Sales flow summary: " + string.Join(". ", parts) + ".";
        }
    }
}
```

```cshtml
@using YourApp.Helpers
@{
    var textAlternative = SankeyAccessibilityHelper.GetTextAlternative(Model.Links);
}

<div role="region" aria-labelledby="text-alt-title">
    <h3 id="text-alt-title">Text alternative for Sankey chart</h3>
    <p>@textAlternative</p>
</div>

@Html.EJS().Sankey("sankey")
    .Nodes(Model.Nodes)
    .Links(Model.Links)
    .Render()
```

### Accessible Data Table Alternative

A companion table is often the most dependable accessibility fallback because it exposes the same flow relationships in a linear format that works well with screen readers, keyboard navigation, copy/paste, and export workflows. This complements the official Sankey rendering model rather than competing with it. 

```cshtml
<div role="region" aria-labelledby="sankey-table-title">
    <h3 id="sankey-table-title">Sales Flow Data</h3>

    <table>
        <thead>
            <tr>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var link in Model.Links)
            {
                <tr>
                    <td>@link.SourceId</td>
                    <td>@link.TargetId</td>
                    <td>@link.Value</td>
                </tr>
            }
        </tbody>
    </table>
</div>
```

### Screen Reader Testing

The official accessibility page notes accessibility-checker and axe-core validation, so screen-reader validation should be paired with practical testing in NVDA, JAWS, or VoiceOver. Verify that the chart title, summary, visible labels, legend, live region announcements, and table alternative all read clearly. 

```html
@* Views/Home/Index.cshtml *@
@using WebApplication1.Helpers
@model WebApplication1.Models.SankeyAccessibilityViewModel

@{
    var textAlternative = SankeyAccessibilityHelper.GetTextAlternative(Model.Links);

}

<div role="region" aria-labelledby="text-alt-title">
    <h3 id="text-alt-title">Text alternative for Sankey chart</h3>
    <p>@textAlternative</p>
</div>

@Html.EJS().Sankey("sankey").Nodes(Model.Nodes).Links(Model.Links).Loaded("onSankeyLoaded").Render()
<div role="region" aria-labelledby="sankey-table-title">
    <h3 id="sankey-table-title">Sales Flow Data</h3>

    <table>
        <thead>
            <tr>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var link in Model.Links)
            {
                <tr>
                    <td>@link.SourceId</td>
                    <td>@link.TargetId</td>
                    <td>@link.Value</td>
                </tr>
            }
        </tbody>
    </table>
</div>
<script>

    function onSankeyLoaded(args) {
        testScreenReaderAccess();
    }

    function testScreenReaderAccess() {
        var chart = document.getElementById("sankey");
        console.log("Chart element found:", !!chart);

        var status = document.getElementById("sankey-status");
        console.log("Live region found:", !!status);

        var table = document.querySelector("table");
        console.log("Accessible table found:", !!table);
    }
</script>
```

---

## Color Contrast Requirements

The official accessibility guidance for Sankey explicitly includes color-contrast support. In MVC, the chart-level properties for labels, node styling, border styling, legend, and focus border provide the main places to enforce contrast-friendly presentation. 

### WCAG Color Contrast Standards

| Level | Text | Large Text |
|-------|------|-----------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

### Checking Contrast

A lightweight contrast helper can still be useful during development, especially when you are choosing label colors, node fills, and focus states around the Sankey chart. 

```html
<script>
    function onSankeyLoaded() {
        var ratio = getContrastRatio("#1F1F1F", "#FFFFFF");
        console.log("Label contrast ratio:", ratio);

        if (ratio >= 4.5) {
            console.log("Passes WCAG AA for normal text");
        } else {
            console.log("Does not pass WCAG AA for normal text");
        }
    }

    function getContrastRatio(color1, color2) {
        var rgb1 = hexToRgb(color1);
        var rgb2 = hexToRgb(color2);

        if (!rgb1 || !rgb2) {
            return null;
        }

        var l1 = getRelativeLuminance(rgb1);
        var l2 = getRelativeLuminance(rgb2);

        var lighter = Math.max(l1, l2);
        var darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function getRelativeLuminance(rgb) {
        var channels = [rgb.r, rgb.g, rgb.b].map(function (val) {
            val = val / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    }
</script>
```

### Accessible Color Palette

Keep an intentional palette for nodes and pair it with readable label text and a visible focus border. The MVC Sankey API documents node styling, label styling, and focus border customization, which is the correct place to enforce contrast in the ASP.NET MVC wrapper. 

```csharp
// Helpers/AccessibleColors.cs
using System.Collections.Generic;

namespace YourApp.Helpers
{
    public static class AccessibleColors
    {
        public static Dictionary<string, string> GetColorPalette()
        {
            return new Dictionary<string, string>
            {
                { "Primary", "#0078D4" },
                { "Success", "#107C10" },
                { "Warning", "#B14600" },
                { "Danger", "#D13438" },
                { "Secondary", "#8764B8" },
                { "Info", "#005A9E" }
            };
        }
    }
}
```

```cshtml
@Html.EJS().Sankey("sankey").FocusBorderColor("#005A9E").NodeStyle(ns => ns
        .Fill("#0078D4")
        .Stroke("#003A75")
        .StrokeWidth(1.5)
    ).LabelSettings(ls => ls
        .Visible(true)
        .Color("#1F1F1F")
        .FontSize("12px")
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Don’t Rely on Color Alone

Use text labels, legend items, tooltip content, and meaningful node/link names in addition to color. The Sankey documentation exposes labels, legend, and tooltips, so those should remain part of the accessibility strategy even when nodes already have distinct colors. 

```cshtml
@Html.EJS().Sankey("sankey").Title("Sales Flow Analysis").LegendSettings(l => l.    Visible(true)
    ).LabelSettings(ls => ls.Visible(true)
    ).Tooltip(t => t
        .Enable(true)
        .NodeFormat("$name : $value")
        .LinkFormat("$start.name $start.value → $target.name $target.value")
    ).Nodes(Model.Nodes).Links(Model.Links).Render()
```

---

## Accessible Data Representation

Accessible Sankey implementations should always provide at least one linearized representation of the same information, such as a summary paragraph, a data table, or an exportable CSV. That approach fits well with the official Sankey feature set, which already includes labels, titles, legend, tooltip, and export/print support. 

### Providing Text Alternatives

A concise summary can be generated in Razor and placed directly above or below the chart so it is immediately available to screen readers and keyboard users. 

```cshtml
@{
    var totalValue = Model.Links.Sum(x => x.Value);
    var sourceCount = Model.Links.Select(x => x.SourceId).Distinct().Count();
    var targetCount = Model.Links.Select(x => x.TargetId).Distinct().Count();

    var summaryText = $"This diagram shows {sourceCount} sources flowing to {targetCount} " +
                      $"targets with a total value of {totalValue}.";
}

<div role="complementary" aria-labelledby="summary-title">
    <h3 id="summary-title">Chart Summary</h3>
    <p>@summaryText</p>
</div>

@Html.EJS().Sankey("sankey").Nodes(Model.Nodes).Links(Model.Links).Render()
```

### Accessible Label Content

Readable node IDs and visible labels help all users, including assistive technology users. Since the node model documents `Id`, and the component supports label settings, use expanded business-friendly names instead of abbreviations where possible. 

```csharp
new List<SankeyNode>
{
    new SankeyNode { Id = "Fourth Quarter Sales", Color = "#0078D4" },
    new SankeyNode { Id = "Online Channel", Color = "#107C10" },
    new SankeyNode { Id = "Retail Channel", Color = "#8764B8" }
}
```

### Data Export for Accessibility

The official Sankey documentation includes print and export support at the component level

```csharp
@* Views/Home/Index.cshtml *@
@using WebApplication1.Helpers
@model WebApplication1.Models.SankeyAccessibilityViewModel

<div style="margin-bottom:10px;">
    <button type="button" style="margin-right:5px;" onclick="exportSankeyPNG()">Export PNG</button>
    <button type="button" style="margin-right:5px;" onclick="exportSankeyPDF()">Export PDF</button>
    <button type="button" onclick="exportSankeySVG()">Export SVG</button>
</div>

@Html.EJS().Sankey("sankey-container").Width("90%").Height("450px").Tooltip(t => t.Enable(true)).LegendSettings(l => l.Visible(true)).Nodes(Model.Nodes).Links(Model.Links).Render()

<script>
    function getSankeyInstance() {
        var el = document.getElementById('sankey-container');
        return el && el.ej2_instances ? el.ej2_instances[0] : null;
    }
    function exportSankeyPNG() {
        var inst = getSankeyInstance();
        if (inst && typeof inst.export === 'function') {
            inst.export('PNG', 'Sankey');
        }
    }

    function exportSankeyPDF() {
        var inst = getSankeyInstance();
        if (inst && typeof inst.export === 'function') {
            inst.export('PDF', 'Sankey');
        }
    }

    function exportSankeySVG() {
        var inst = getSankeyInstance();
        if (inst && typeof inst.export === 'function') {
            inst.export('SVG', 'Sankey');
        }
    }
</script>
```

---

## Testing Accessibility

The official accessibility page specifically mentions accessibility-checker and axe-core validation, so both automated and manual validation should be part of the delivery checklist for an ASP.NET MVC Sankey chart. 

### Automated Testing

Use axe DevTools, Lighthouse, or another accessibility scanner to verify the surrounding semantic HTML, summary text, focus indication, and any table fallback you add around the Sankey component. 

```html
<script>
    async function runAccessibilityTest() {
        if (typeof axe === "undefined") {
            console.warn("axe-core is not loaded.");
            return;
        }

        const results = await axe.run(document);
        console.log(results);

        if (results.violations.length > 0) {
            console.error("Accessibility violations found:", results.violations);
        }
    }
</script>
```

### Manual Testing Checklist

- [ ] Use `Alt + J`, `Tab`, `Shift + Tab`, and arrow keys to confirm built-in keyboard navigation works as expected. 
- [ ] Verify the chart title and summary are announced meaningfully by NVDA, JAWS, or VoiceOver. 
- [ ] Confirm the focus outline is visible with the configured `FocusBorderColor`. 
- [ ] Ensure visible labels, legend, and tooltip text are descriptive rather than abbreviated. 
- [ ] Check that the accessible table or text summary matches the chart’s node/link data. 
- [ ] Validate contrast for label text, node fills, borders, and focus visuals. 
- [ ] Test print/export paths if the chart is part of reporting workflows. 

### Accessibility Validator

A small page-level validator is useful during development to verify that the semantic wrapper, summary, live region, and chart host are all present. 

```html
<script>
    function validateAccessibility() {
        var wrapper = document.querySelector("section[role='region']");
        var title = document.getElementById("sankey-title");
        var summary = document.getElementById("sankey-summary");
        var status = document.getElementById("sankey-status");
        var chart = document.getElementById("sankey");

        console.log("Wrapper exists:", !!wrapper);
        console.log("Title exists:", !!title);
        console.log("Summary exists:", !!summary);
        console.log("Live region exists:", !!status);
        console.log("Chart exists:", !!chart);

        return !!wrapper && !!title && !!summary && !!status && !!chart;
    }
</script>
```

---

## Best Practices

1. **Always include a nearby title and summary** so the chart has an understandable accessible context. 
2. **Use the built-in keyboard model** and verify the documented shortcuts work in your page layout. 
3. **Keep labels, legend, and tooltip content meaningful** because those are official Sankey feature areas and are essential to accessibility. 
4. **Set a visible focus outline** with `FocusBorderColor`. 
5. **Provide a text summary or data table alternative** for screen readers and linear consumption. 
6. **Use contrast-friendly node, border, label, and focus colors** through the documented styling APIs. 
7. **Use supported Sankey events** such as `NodeClick`, `LinkClick`, `Load`, and `Loaded` when you need announcements or interaction hooks. 
8. **Include automated and manual accessibility validation** before release. 

## Future reference

- Prefer the official ASP.NET MVC Sankey binding model with `.Nodes(...)` and `.Links(...)` using `SankeyNode` and `SankeyLink` collections. 
- Keep accessibility customizations on documented Sankey members such as `FocusBorderColor`, label settings, tooltip settings, legend settings, and supported Sankey events. 
- For chart-level accessible names and descriptions, use semantic HTML wrappers when the MVC Sankey helper does not document direct fluent members for those attributes. 
- Avoid mixing framework-specific patterns that are not part of the ASP.NET MVC Sankey helper surface. 