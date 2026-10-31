# Orientation and RTL Support in Syncfusion ASP.NET MVC Sankey Chart

## Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Orientation Basics](#orientation-basics)
  - [Available Orientations](#available-orientations)
  - [Setting Orientation](#setting-orientation)
- [Vertical Orientation](#vertical-orientation)
  - [Vertical Layout](#vertical-layout)
  - [Vertical Layout Example](#vertical-layout-example)
  - [Container Sizing for Vertical](#container-sizing-for-vertical)
- [Horizontal Orientation](#horizontal-orientation)
  - [Horizontal Layout Configuration](#horizontal-layout-configuration)
  - [Horizontal Layout Example](#horizontal-layout-example)
  - [Container Sizing for Horizontal](#container-sizing-for-horizontal)
- [RTL Right-to-Left Support](#rtl-right-to-left-support)
  - [Enabling RTL](#enabling-rtl)
  - [Complete RTL Configuration](#complete-rtl-configuration)
  - [RTL with Arabic Content](#rtl-with-arabic-content)
  - [RTL Characteristics in Vertical Orientation](#rtl-characteristics-in-vertical-orientation)
- [RTL with Horizontal Layout](#rtl-with-horizontal-layout)
  - [RTL Horizontal Configuration](#rtl-horizontal-configuration)
  - [RTL Horizontal Example](#rtl-horizontal-example)
- [Layout Considerations](#layout-considerations)
  - [Container Dimensions](#container-dimensions)
  - [Responsive Container Sizing](#responsive-container-sizing)
  - [Margins](#margins)
  - [Node Width Adjustment](#node-width-adjustment)
  - [Node Padding by Orientation](#node-padding-by-orientation)
  - [Link Curvature by Orientation](#link-curvature-by-orientation)
- [Responsive Orientation](#responsive-orientation)
  - [Dynamic Orientation Based on Viewport in Controller](#dynamic-orientation-based-on-viewport-in-controller)
  - [JavaScript-Based Responsive Orientation](#javascript-based-responsive-orientation)
  - [Mobile Optimization](#mobile-optimization)
- [Common Orientation Patterns](#common-orientation-patterns)
  - [Pattern 1 Vertical for Hierarchical Data](#pattern-1-vertical-for-hierarchical-data)
  - [Pattern 2 Horizontal for Process Flows](#pattern-2-horizontal-for-process-flows)
  - [Pattern 3 RTL for International Applications](#pattern-3-rtl-for-international-applications)
  - [Pattern 4 Toggle Orientation](#pattern-4-toggle-orientation)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyOrientationViewModel
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
        public ActionResult OrientationDemo()
        {
            var model = new SankeyOrientationViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Online", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online" } },
                    new SankeyNode { Id = "Store", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Store" } },
                    new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Online", Value = 500 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Online", Value = 400 },
                    new SankeyLink { SourceId = "Product A", TargetId = "Store", Value = 200 },
                    new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 900 },
                    new SankeyLink { SourceId = "Store", TargetId = "Revenue", Value = 200 }
                }
            };

            return View(model);
        }

        public ActionResult ArabicOrientationDemo()
        {
            var model = new SankeyOrientationViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "منتج أ", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "منتج أ" } },
                    new SankeyNode { Id = "منتج ب", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "منتج ب" } },
                    new SankeyNode { Id = "المبيعات عبر الإنترنت", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "المبيعات عبر الإنترنت" } },
                    new SankeyNode { Id = "الإيرادات", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "الإيرادات" } }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "منتج أ", TargetId = "المبيعات عبر الإنترنت", Value = 500 },
                    new SankeyLink { SourceId = "منتج ب", TargetId = "المبيعات عبر الإنترنت", Value = 400 },
                    new SankeyLink { SourceId = "المبيعات عبر الإنترنت", TargetId = "الإيرادات", Value = 900 }
                }
            };

            return View(model);
        }
    }
}
```

---

## Table of Contents
- #orientation-basics
- #vertical-orientation
- #horizontal-orientation
- #rtl-right-to-left-support
- #rtl-with-horizontal-layout
- #layout-considerations
- #responsive-orientation
- #common-orientation-patterns
- #future-reference

---

## Orientation Basics

The Sankey chart supports two layout orientations for arranging the flow direction:

1. **Horizontal** - Flow from left to right by default
2. **Vertical** - Flow from top to bottom

RTL can also be enabled to support right-to-left application layouts.

### Available Orientations

- `Syncfusion.EJ2.Charts.Orientation.Horizontal`
- `Syncfusion.EJ2.Charts.Orientation.Vertical`

### Setting Orientation

```cshtml
@model WebApplication1.Models.SankeyOrientationViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Vertical Orientation

### Vertical Layout

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("600px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

**Characteristics:**

- Flow direction: Top to Bottom
- Source nodes appear toward the top
- Target nodes appear toward the bottom
- Links bend vertically through the layout
- Useful for hierarchical or stacked flow visualizations

### Vertical Layout Example

```csharp
public ActionResult VerticalSankey()
{
    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>
        {
            new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
            new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
            new SankeyNode { Id = "Online", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online" } },
            new SankeyNode { Id = "Store", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Store" } },
            new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
        },
        SankeyLinks = new List<SankeyLink>
        {
            new SankeyLink { SourceId = "Product A", TargetId = "Online", Value = 500 },
            new SankeyLink { SourceId = "Product B", TargetId = "Online", Value = 400 },
            new SankeyLink { SourceId = "Product A", TargetId = "Store", Value = 200 },
            new SankeyLink { SourceId = "Online", TargetId = "Revenue", Value = 900 },
            new SankeyLink { SourceId = "Store", TargetId = "Revenue", Value = 200 }
        }
    };

    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("600px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Title("Product Sales Flow (Vertical)").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Container Sizing for Vertical

```html
<style>
    #sankey {
        width: 100%;
        height: 600px;
        min-height: 500px;
    }
</style>
```

Vertical orientation usually benefits from a taller container so the top-to-bottom flow has enough space.

---

## Horizontal Orientation

### Horizontal Layout Configuration

Horizontal is the default layout direction for Sankey.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("400px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

**Characteristics:**

- Flow direction: Left to Right
- Source nodes appear on the left
- Target nodes appear on the right
- Links bend horizontally through the layout
- Useful for process flows, pipelines, and progression diagrams

### Horizontal Layout Example

```csharp
public ActionResult HorizontalSankey()
{
    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>
        {
            new SankeyNode { Id = "Source A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Source A" } },
            new SankeyNode { Id = "Source B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Source B" } },
            new SankeyNode { Id = "Process 1", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Process 1" } },
            new SankeyNode { Id = "Process 2", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Process 2" } },
            new SankeyNode { Id = "Output", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Output" } }
        },
        SankeyLinks = new List<SankeyLink>
        {
            new SankeyLink { SourceId = "Source A", TargetId = "Process 1", Value = 300 },
            new SankeyLink { SourceId = "Source B", TargetId = "Process 1", Value = 200 },
            new SankeyLink { SourceId = "Process 1", TargetId = "Process 2", Value = 400 },
            new SankeyLink { SourceId = "Process 2", TargetId = "Output", Value = 400 }
        }
    };

    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("400px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).Title("Data Pipeline (Horizontal)").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Container Sizing for Horizontal

```html
<style>
    #sankey {
        width: 100%;
        height: 400px;
        min-width: 800px;
    }
</style>
```

Horizontal orientation typically works best when the container is wider than it is tall.

---

## RTL (Right-to-Left) Support

### Enabling RTL

RTL support is enabled with `.EnableRtl(true)`.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Complete RTL Configuration

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Title("تدفق المبيعات").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### RTL with Arabic Content

```csharp
public ActionResult ArabicSankey()
{
    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>
        {
            new SankeyNode { Id = "منتج أ", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "منتج أ" } },
            new SankeyNode { Id = "منتج ب", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "منتج ب" } },
            new SankeyNode { Id = "المبيعات عبر الإنترنت", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "المبيعات عبر الإنترنت" } },
            new SankeyNode { Id = "الإيرادات", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "الإيرادات" } }
        },
        SankeyLinks = new List<SankeyLink>
        {
            new SankeyLink { SourceId = "منتج أ", TargetId = "المبيعات عبر الإنترنت", Value = 500 },
            new SankeyLink { SourceId = "منتج ب", TargetId = "المبيعات عبر الإنترنت", Value = 400 },
            new SankeyLink { SourceId = "المبيعات عبر الإنترنت", TargetId = "الإيرادات", Value = 900 }
        }
    };

    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).LabelSettings(
        ls => ls.Visible(true).Font(
            f => f.FontFamily("Arial")
        )
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### RTL Characteristics in Vertical Orientation

- Flow remains Top to Bottom when orientation is Vertical
- The component respects right-to-left layout behavior
- Labels and the overall component layout align with RTL rendering expectations

---

## RTL with Horizontal Layout

### RTL Horizontal Configuration

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

**Characteristics:**

- Horizontal layout is combined with RTL page behavior
- The component renders in an RTL-aware presentation
- Useful for RTL applications that still want a horizontal Sankey flow layout

### RTL Horizontal Example

```csharp
public ActionResult RTLHorizontalSankey()
{
    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>
        {
            new SankeyNode { Id = "المصدر أ", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "المصدر أ" } },
            new SankeyNode { Id = "المصدر ب", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "المصدر ب" } },
            new SankeyNode { Id = "العملية 1", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "العملية 1" } },
            new SankeyNode { Id = "النتيجة", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "النتيجة" } }
        },
        SankeyLinks = new List<SankeyLink>
        {
            new SankeyLink { SourceId = "المصدر أ", TargetId = "العملية 1", Value = 300 },
            new SankeyLink { SourceId = "المصدر ب", TargetId = "العملية 1", Value = 200 },
            new SankeyLink { SourceId = "العملية 1", TargetId = "النتيجة", Value = 500 }
        }
    };

    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).Title("خط أنابيب البيانات").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Layout Considerations

### Container Dimensions

**Vertical Orientation:**

```html
<div id="sankey" style="width: 100%; height: 600px;"></div>
```

**Horizontal Orientation:**

```html
<div id="sankey" style="width: 100%; height: 400px;"></div>
```

### Responsive Container Sizing

```html
<style>
    .sankey-container {
        width: 100%;
        min-height: 400px;
    }

    @media (min-width: 768px) {
        .sankey-container {
            height: 600px;
        }
    }

    @media (max-width: 768px) {
        .sankey-container {
            height: 400px;
        }
    }
</style>
```

```cshtml
<div class="sankey-container">
    @Html.EJS().Sankey("sankey").Width("100%").Height("100%").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
</div>
```

### Margins

The Sankey helper supports `.Margin(...)` for outer spacing.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Margin(
        m => m.Top(20).Bottom(20).Left(20).Right(20)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Node Width Adjustment

Use `.NodeStyle(...).Width(...)` to adjust node width.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).NodeStyle(
        ns => ns.Width(60)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Node Padding by Orientation

Use `.NodeStyle(...).Padding(...)` to control spacing around the node layout.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).NodeStyle(
        ns => ns.Width(50).Padding(20)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Link Curvature by Orientation

Use `.LinkStyle(...).Curvature(...)` for path bending.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).LinkStyle(
        ls => ls.Curvature(0.5)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).LinkStyle(
        ls => ls.Curvature(0.5)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

For a straighter look:

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").LinkStyle(
        ls => ls.Curvature(0)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Responsive Orientation

### Dynamic Orientation Based on Viewport in Controller

A simple MVC pattern is to decide the initial orientation in the controller.

```csharp
public ActionResult ResponsiveSankey()
{
    bool isMobile = Request.Browser.IsMobileDevice;

    ViewBag.Orientation = isMobile
        ? Syncfusion.EJ2.Charts.Orientation.Vertical
        : Syncfusion.EJ2.Charts.Orientation.Horizontal;

    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>(),
        SankeyLinks = new List<SankeyLink>()
    };

    return View(model);
}
```

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        (Syncfusion.EJ2.Charts.Orientation)ViewBag.Orientation
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### JavaScript-Based Responsive Orientation

You can also update the orientation at runtime in the browser.

```html
<script>
    function setResponsiveOrientation() {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        if (window.innerWidth < 768) {
            sankeyInstance.orientation = "Vertical";
        } else {
            sankeyInstance.orientation = "Horizontal";
        }

        sankeyInstance.refresh();
    }

    document.addEventListener("DOMContentLoaded", function () {
        setResponsiveOrientation();
    });

    window.addEventListener("resize", setResponsiveOrientation);
</script>
```

### Mobile Optimization

```html
<style>
    @media (max-width: 768px) {
        #sankey {
            height: 500px;
        }
    }

    @media (min-width: 1024px) {
        #sankey {
            height: 400px;
        }
    }
</style>
```

---

## Common Orientation Patterns

### Pattern 1: Vertical for Hierarchical Data

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("600px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Title("Sales Hierarchy").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 2: Horizontal for Process Flows

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("400px").Orientation(
        Syncfusion.EJ2.Charts.Orientation.Horizontal
    ).Title("Data Processing Pipeline").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Pattern 3: RTL for International Applications

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").EnableRtl(true).Orientation(
        Syncfusion.EJ2.Charts.Orientation.Vertical
    ).Title(ViewBag.LocalizedTitle).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

```csharp
public ActionResult LocalizedSankey()
{
    ViewBag.LocalizedTitle = System.Globalization.CultureInfo.CurrentUICulture.Name == "ar-SA"
        ? "تدفق البيانات"
        : "Data Flow";

    var model = new SankeyOrientationViewModel
    {
        SankeyNodes = new List<SankeyNode>(),
        SankeyLinks = new List<SankeyLink>()
    };

    return View(model);
}
```

### Pattern 4: Toggle Orientation

```html
<button type="button" onclick="toggleOrientation()">Toggle Orientation</button>

<script>
    function toggleOrientation() {
        var sankeyElement = document.getElementById("sankey");
        var sankeyInstance = sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.orientation = sankeyInstance.orientation === "Vertical"
            ? "Horizontal"
            : "Vertical";

        sankeyInstance.refresh();
    }
</script>
```

---

## Best Practices

1. **Choose the right orientation** - Use vertical layouts for stacked or hierarchical flows and horizontal layouts for process-style flows.
2. **Use enough height for vertical layouts** - Vertical Sankey charts usually need more height than horizontal ones.
3. **Use enough width for horizontal layouts** - Horizontal layouts benefit from a wide container.
4. **Enable RTL for RTL applications** - Use `.EnableRtl(true)` when the application layout is right-to-left.
5. **Keep labels readable** - Ensure node labels remain readable in both vertical/horizontal and LTR/RTL layouts.
6. **Use padding and margins thoughtfully** - Combine `NodeStyle.Padding(...)` and `Margin(...)` to prevent crowded layouts.
7. **Keep orientation changes efficient** - If orientation is toggled at runtime, update the instance and refresh only when necessary.
8. **Prefer strongly typed MVC data** - Use `List<SankeyNode>` and `List<SankeyLink>` in strongly typed view models for stable helper behavior.

---

## Future reference

- Use `.Orientation(Syncfusion.EJ2.Charts.Orientation.Horizontal|Vertical)` instead of string values.
- The default Sankey orientation is Horizontal.
- Use `.EnableRtl(true)` for RTL support.
- Use `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`.
- Use `.Title("...")` and `.SubTitle("...")` for title text.
- Use `.NodeStyle(...).Padding(...)` instead of unsupported spacing-style patterns.
- Use `.LinkStyle(...).Curvature(...)` instead of `CurveType(...)`.
- Keep the helper chain continuous in MVC, for example:
  `@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(...).EnableRtl(true).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()`