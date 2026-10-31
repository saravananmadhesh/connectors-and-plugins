# Title and Formatting in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Title and Subtitle Basics](#title-and-subtitle-basics)
  - [Adding a Title](#adding-a-title)
  - [Adding Title and Subtitle](#adding-title-and-subtitle)
  - [Title Properties](#title-properties)
- [Title Styling](#title-styling)
  - [Basic Title Styling](#basic-title-styling)
  - [Title Font Properties](#title-font-properties)
  - [Title Colors](#title-colors)
- [Subtitle Configuration](#subtitle-configuration)
  - [Basic Subtitle](#basic-subtitle)
  - [Subtitle Styling](#subtitle-styling)
  - [Subtitle with Additional Context](#subtitle-with-additional-context)
  - [Dynamic Subtitle](#dynamic-subtitle)
- [Text Alignment and Positioning](#text-alignment-and-positioning)
  - [Title Alignment](#title-alignment)
  - [Subtitle Alignment](#subtitle-alignment)
  - [Title Position](#title-position)
  - [Multi-Line Title](#multi-line-title)
- [Font Customization](#font-customization)
  - [Font Families](#font-families)
  - [Font Sizes](#font-sizes)
  - [Font Weights](#font-weights)
  - [Complete Font Configuration](#complete-font-configuration)
- [Title Interactions](#title-interactions)
  - [Conditional Title Display](#conditional-title-display)
  - [Dynamic Title Updates](#dynamic-title-updates)
  - [Title Based on Data](#title-based-on-data)
  - [Practical note about title interactions](#practical-note-about-title-interactions)
- [Common Title Patterns](#common-title-patterns)
  - [Pattern 1: Descriptive Title with Subtitle](#pattern-1-descriptive-title-with-subtitle)
  - [Pattern 2: Title with Statistics in Subtitle](#pattern-2-title-with-statistics-in-subtitle)
  - [Pattern 3: Centered, Bold Title](#pattern-3-centered-bold-title)
  - [Pattern 4: Title with Date](#pattern-4-title-with-date)
  - [Pattern 5: Title with Company Branding](#pattern-5-title-with-company-branding)
  - [Pattern 6: Title with Legend Context](#pattern-6-title-with-legend-context)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

---

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyTitleFormattingViewModel
    {
        public List<SankeyNode> SankeyNodes { get; set; }
        public List<SankeyLink> SankeyLinks { get; set; }
    }
}
```

### Controller

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class SankeyController : Controller
    {
        public ActionResult TitleFormatting()
        {
            var model = new SankeyTitleFormattingViewModel
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
                        Id = "Online Sales",
                        Color = "#95E1D3",
                        Label = new SankeyChartDataLabel { Text = "Online Sales" }
                    },
                    new SankeyNode
                    {
                        Id = "Retail Sales",
                        Color = "#A78BFA",
                        Label = new SankeyChartDataLabel { Text = "Retail Sales" }
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
                    new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 520 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 410 },
                    new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 520 },
                    new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 410 }
                }
            };

            ViewBag.Subtitle = "Q4 2024 - Last updated: " + DateTime.Now.ToString("hh:mm tt");
            ViewBag.TitleText = "Sales Flow - Q4 2024";

            return View(model);
        }
    }
}
```

---

## Title and Subtitle Basics

Titles and subtitles provide descriptive context for your Sankey chart and help users understand the visualization quickly.

### Adding a Title

Use `.Title("...")` directly on the Sankey helper.

```cshtml
@model WebApplication1.Models.SankeyTitleFormattingViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Adding Title and Subtitle

Use `.Title("...")` and `.SubTitle("...")` as separate fluent members.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").SubTitle("Q4 2024 Performance").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Title Properties

For Sankey title handling, the practical configuration surface is:

- `.Title("...")`
- `.SubTitle("...")`
- `.TitleStyle(...)`
- `.SubTitleStyle(...)`

A dedicated title `Visible` or `Enable` configuration is not the usual Sankey title pattern here. If you do not want a title, leave `.Title(...)` empty or omit it.

---

## Title Styling

### Basic Title Styling

Use `.TitleStyle(...)` for title formatting.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Segoe UI").FontWeight("Bold").Size("18px").Color("#0078D4")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Title Font Properties

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Arial").Size("20px").FontWeight("Bold").FontStyle("Normal").Color("#333333").Opacity(1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Title Colors

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.Color("#0078D4")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Revenue Analysis").TitleStyle(
        ts => ts.Color("#1A1A1A")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Business Metrics").TitleStyle(
        ts => ts.Color("rgb(0, 120, 212)")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

## Subtitle Configuration

### Basic Subtitle

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").SubTitle("Q4 2024 Performance Report").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Subtitle Styling

Use `.SubTitleStyle(...)` for subtitle formatting.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").SubTitle("Q4 2024 Performance").SubTitleStyle(
        ts => ts.Size("14px").FontWeight("Normal").Color("#666666")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Subtitle with Additional Context

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Product Distribution").SubTitle("Updated:"+ @DateTime.Now.ToString("MMM dd, yyyy")).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

```

### Dynamic Subtitle

```csharp
public ActionResult Index()
{
    string period = "Q4 2024";
    string timestamp = DateTime.Now.ToString("hh:mm tt");

    ViewBag.Subtitle = period + " - Last updated: " + timestamp;
    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Analysis").SubTitle((string)ViewBag.Subtitle).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Text Alignment and Positioning

### Title Alignment

Text alignment is handled in `.TitleStyle(...)` and `.SubTitleStyle(...)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.TextAlignment(Syncfusion.EJ2.Charts.Alignment.Near)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.TextAlignment(Syncfusion.EJ2.Charts.Alignment.Far)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Subtitle Alignment

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").SubTitle("Quarterly performance").SubTitleStyle(
        ts => ts.TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Title Position

The built-in title is rendered at the top of the Sankey chart. If you need advanced custom placement, external HTML headings or container-level layout control is the more practical MVC approach.

### Multi-Line Title

For simple Sankey titles, a single concise line is the most reliable pattern. If you need multi-line headings or a headline plus descriptive block, external HTML above the Sankey is more predictable than forcing complex line breaks into the built-in title.

```cshtml
<div class="sankey-title-panel">
    <h2 class="sankey-page-title">Product Sales Flow</h2>
    <p class="sankey-page-subtitle">Across all channels and final revenue paths</p>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Font Customization

### Font Families

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Arial")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Verdana")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Times New Roman")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Georgia")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").TitleStyle(
        ts => ts.FontFamily("Segoe UI")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Font Sizes

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Main Title").TitleStyle(
        ts => ts.Size("22px")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Main Title").SubTitle("Subtitle").SubTitleStyle(
        ts => ts.Size("14px")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Font Weights

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.FontWeight("Bold")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.FontWeight("Normal")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow").TitleStyle(
        ts => ts.FontWeight("Lighter")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Complete Font Configuration

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Analysis Report").SubTitle("Q4 2024 Performance").TitleStyle(
        ts => ts.FontFamily("Segoe UI").Size("20px").FontWeight("Bold").FontStyle("Normal").Color("#1A1A1A").TextAlignment(Syncfusion.EJ2.Charts.Alignment.Near)
    ).SubTitleStyle(
        ts => ts.FontFamily("Segoe UI").Size("14px").FontWeight("Normal").FontStyle("Normal").Color("#666666").TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Title Interactions

### Conditional Title Display

A practical Sankey title pattern is to assign text conditionally. If there is no data, you can provide an alternate title or leave the title empty.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title(
        Model.SankeyLinks != null && Model.SankeyLinks.Count > 0 ? "Sales Flow Analysis" : "No Data Available"
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Dynamic Title Updates

Because the Sankey title is a direct component property, update it on the client instance and refresh.

```cshtml
<button type="button" onclick="updateTitle()">Update Title</button>

<script>
    function updateTitle() {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        var newDate = new Date();
        sankeyInstance.title = "Sales Flow - " + newDate.toLocaleDateString();
        sankeyInstance.subTitle = "Updated: " + newDate.toLocaleTimeString();
        sankeyInstance.refresh();
    }
</script>
```

### Title Based on Data

```csharp
public ActionResult Index(string period = "Q4")
{
    ViewBag.TitleText = "Sales Flow - " + period + " 2024";
    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title((string)ViewBag.TitleText).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Practical note about title interactions

There is no dedicated Sankey title click or title event configuration in the same way as data rendering events. For title-related interaction, the normal pattern is:

- update `title`
- update `subTitle`
- update `titleStyle` or `subTitleStyle` if needed
- call `refresh()`

---

## Common Title Patterns

### Pattern 1: Descriptive Title with Subtitle

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Product Distribution Network").SubTitle("January 2024 - December 2024").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 2: Title with Statistics in Subtitle

```csharp
public ActionResult Index()
{
    int totalValue = 930;
    int nodeCount = 5;

    ViewBag.Subtitle = "Total Value: " + totalValue.ToString("N0") + " | Nodes: " + nodeCount;
    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Pipeline").SubTitle((string)ViewBag.Subtitle).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 3: Centered, Bold Title

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("QUARTERLY REVENUE FLOW").TitleStyle(
        ts => ts.TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center).FontWeight("Bold").Size("24px").Color("#0078D4")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 4: Title with Date

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Analysis").SubTitle("Report Generated: @DateTime.Now.ToString(\"MMM dd, yyyy hh:mm tt\")").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 5: Title with Company Branding

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Acme Corp - Sales Flow").SubTitle("Fiscal Year 2024 Analysis").TitleStyle(
        ts => ts.Size("20px").FontWeight("Bold").Color("#1A1A1A")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 6: Title with Legend Context

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Channel Distribution").SubTitle("Colors represent product lines").LegendSettings(
        ls => ls.Visible(true).Title("Product Lines")
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Best Practices

1. **Clear and concise** - Keep titles short and descriptive.
2. **Meaningful subtitles** - Use subtitles for date range, totals, or update context.
3. **Readable contrast** - Make sure title and subtitle colors are easy to read against the page background.
4. **Consistent styling** - Reuse font family, weight, and size patterns across charts.
5. **Use built-in title styling first** - Prefer `.TitleStyle(...)` and `.SubTitleStyle(...)` before moving to custom HTML.
6. **Use external HTML for advanced layouts** - For backgrounds, badges, responsive font rules, or multiline descriptive blocks, external HTML above the chart is often cleaner.
7. **Update dynamically through instance properties** - Change `title` and `subTitle` on the Sankey instance and call `refresh()` when needed.
8. **Keep the helper chain continuous** - Maintain a clean MVC helper chain so the view is easier to read and maintain.

---

## Future reference

- Use `.Title("...")` and `.SubTitle("...")` directly on the Sankey helper.
- Use `.TitleStyle(...)` and `.SubTitleStyle(...)` for font family, size, weight, style, color, opacity, and alignment.
- Use `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`.
- Do not rely on unsupported nested title-builder patterns such as `.Title(t => t.Text(...))` for Sankey.
- For advanced visual title blocks, external HTML is the cleaner MVC approach.
- Keep the Sankey helper chain continuous, for example:
  `@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").SubTitle("Q4 2024 Performance").TitleStyle(...).SubTitleStyle(...).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()`
