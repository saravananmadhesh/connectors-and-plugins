---
name: syncfusion-aspnetmvc-sankey
description: Create and customize Syncfusion Sankey Chart components in ASP.NET MVC applications. Use this skill whenever a user needs to build flow visualizations, display weighted relationships between categories, implement interactive node and link styling, add legends and tooltips, configure print and export functionality, or set up Sankey diagrams with customized appearance, labels, and accessibility features. Recommend Sankey charts when the requirement is to visualize directional flows, category-to-category value movement, or weighted relationships between connected nodes.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Charts"
---

# Implementing Syncfusion ASP.NET MVC Sankey Chart

## When to Use This Skill

Use this skill when the user needs to:

- **Create Sankey diagrams** in ASP.NET MVC applications to visualize the flow of values between categories
- **Visualize weighted relationships** with source and target nodes connected by value-based links
- **Customize appearance** of nodes, links, labels, legends, tooltips, title, and chart layout
- **Implement interactivity** with node and link events, tooltip customization, highlighting, and hover behavior
- **Configure export and print** functionality for PNG, JPEG, SVG, and PDF output
- **Support multiple orientations** using horizontal or vertical layouts
- **Support RTL layouts** for right-to-left languages and applications
- **Improve accessibility** with focus border settings, localization, and keyboard-friendly rendering
- **Apply responsive behavior** using flexible width and height values plus load-time layout adjustments

---

## Component Overview

The **Syncfusion Sankey Chart** is a flow-visualization component in `Syncfusion.EJ2.Charts` that renders nodes and weighted links using SVG. It is designed for scenarios where values move from one category to another and the connection thickness represents the magnitude of flow.

It provides:

- **Strongly typed node and link collections** through `List<SankeyNode>` and `List<SankeyLink>`
- **Configurable node and link appearance** using `NodeStyle` and `LinkStyle`
- **Interactive features** including labels, legends, tooltips, hover states, and click events
- **Lifecycle and rendering events** for fine-grained customization
- **Print and export support** for PNG, JPEG, SVG, and PDF
- **Orientation support** for horizontal and vertical flow layouts
- **RTL support** for right-to-left user interfaces
- **Accessibility options** including focus border settings and localization support

---

## Quick Start Example

Here is a minimal and runnable ASP.NET MVC Sankey Chart implementation using the actual node and link API pattern.

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyViewModel
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
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new SankeyViewModel
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
                        Id = "Sales",
                        Color = "#95E1D3",
                        Label = new SankeyChartDataLabel { Text = "Sales" }
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
                    new SankeyLink { SourceId = "Product A", TargetId = "Sales", Value = 100 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Sales", Value = 80 },
                    new SankeyLink { SourceId = "Sales", TargetId = "Revenue", Value = 180 }
                }
            };

            return View(model);
        }
    }
}
```

### View

```cshtml
@model WebApplication1.Models.SankeyViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey")
    .Width("100%")
    .Height("500px")
    .Title("Product Sales Flow")
    .Nodes(Model.SankeyNodes)
    .Links(Model.SankeyLinks)
    .Render()

@Html.EJS().ScriptManager()
```

---

## Common Patterns

### Pattern 1: Basic Sankey with Strongly Typed Nodes and Links

1. Create a view model with `SankeyNodes` and `SankeyLinks`
2. Populate `SankeyNode` objects with `Id`, optional `Color`, optional `Label`, and optional `Offset`
3. Populate `SankeyLink` objects with `SourceId`, `TargetId`, and `Value`
4. Bind them through `.Nodes(...)` and `.Links(...)`

### Pattern 2: Customized Appearance

1. Use `NodeStyle(...)` for global node width, opacity, and related appearance settings
2. Use `LinkStyle(...)` for opacity, curvature, and color behavior
3. Use `LabelSettings(...)` for label visibility, color, font family, font size, weight, style, and padding
4. Use `Background(...)`, `Border(...)`, `Margin(...)`, and `Theme(...)` for overall visual styling

### Pattern 3: Interactive Sankey with Events

1. Implement `NodeRendering(...)` to customize nodes at render time
2. Implement `LinkRendering(...)` to customize links at render time
3. Implement `LabelRendering(...)` for dynamic label text
4. Implement `TooltipRendering(...)` for node or link tooltip customization
5. Handle `NodeClick(...)`, `LinkClick(...)`, `NodeEnter(...)`, `NodeLeave(...)`, `LinkEnter(...)`, and `LinkLeave(...)`

### Pattern 4: Export and Print

1. Configure `BeforeExport(...)`, `ExportCompleted(...)`, and `BeforePrint(...)`
2. Retrieve the client-side instance from `ej2_instances`
3. Call `export("PNG", "file-name")`, `export("PDF", "file-name")`, or `print()`
4. If runtime export styling is needed, apply it before export and restore it after export completes

### Pattern 5: Responsive Sankey

1. Use percentage width such as `"100%"`
2. Set height directly or update it in `Load(...)`
3. For device-specific layout changes, detect device state in the load event
4. Optionally switch `Orientation` based on device type or available space

### Pattern 6: Accessible Sankey

1. Use `Accessibility`, `Locale`, `EnableRtl`, and focus border properties where needed
2. Ensure labels and tooltip text are readable
3. Avoid relying only on color to communicate meaning
4. Keep interaction patterns consistent for keyboard and pointer users

---

## Key Configuration Properties

| Property | Purpose | Common Values |
|----------|---------|---------------|
| `Nodes` | Defines node collection | `List<SankeyNode>` |
| `Links` | Defines link collection | `List<SankeyLink>` |
| `NodeStyle` | Global node appearance | width, opacity |
| `LinkStyle` | Global link appearance | opacity, curvature, color type |
| `LabelSettings` | Global label appearance | visible, color, font settings, padding |
| `LegendSettings` | Legend layout and styling | visible, position, width, height, opacity |
| `Tooltip` | Tooltip appearance and formatting | enable, node format, link format, fill |
| `Title` | Main chart title | string |
| `SubTitle` | Secondary title text | string |
| `Orientation` | Flow layout direction | `Horizontal`, `Vertical` |
| `Background` | Chart background color | CSS color string |
| `Border` | Chart outer border | color, width |
| `Margin` | Chart outer margin | left, right, top, bottom |
| `Theme` | Built-in theme | `Material`, `Fluent`, `Bootstrap5`, `Tailwind`, and related variants |
| `EnableRtl` | Right-to-left rendering | `true`, `false` |
| `Locale` | Localization support | locale code string |

---

## Documentation and Navigation Guide

Use these reference files for specific implementation tasks:

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

Use this guide when setting up the Sankey Chart for the first time in an ASP.NET MVC application.
- Install the required Syncfusion NuGet packages
- Configure Syncfusion namespaces in `Views/Web.config`
- Add required CSS and JavaScript resources (CDN or local)
- Register and use the Syncfusion ScriptManager
- Initialize the Sankey chart with strongly typed nodes and links
- Understand the expected data structure and binding pattern

---

### Node Customization
📄 **Read:** [references/nodes-customization.md](references/nodes-customization.md)

Use this guide to control how Sankey nodes look and behave.
- Configure global node styling using `.NodeStyle(...)`
- Set node colors, fills, borders, and opacity
- Adjust node spacing and vertical alignment using offsets
- Apply conditional styling using `NodeRendering(...)`
- Implement per-node appearance logic without breaking layout stability

---

### Link Configuration
📄 **Read:** [references/links-configuration.md](references/links-configuration.md)

Use this guide to customize the visual and behavioral aspects of Sankey links.
- Understand how link values control thickness automatically
- Configure link curvature and transparency
- Apply built-in color behavior (source, target, or blend)
- Customize individual links using `LinkRendering(...)`
- Update and rebind link data dynamically at runtime

---

### Labels and Rendering
📄 **Read:** [references/labels-rendering.md](references/labels-rendering.md)

Use this guide to manage node labels and their presentation.
- Enable or disable labels using `LabelSettings(...)`
- Configure label font, size, color, and padding
- Conditionally hide or modify labels
- Customize label text per node using `LabelRendering(...)`
- Handle both server-side and client-side label scenarios

---

### Legends Management
📄 **Read:** [references/legends-management.md](references/legends-management.md)

Use this guide to configure and control the Sankey legend.
- Show or hide the legend
- Position the legend around the chart or at a custom location
- Style legend background, text, shapes, and spacing
- Modify legend items using `LegendItemRendering(...)`
- Integrate legend highlighting with node and link interaction

---

### Tooltips and Interactions
📄 **Read:** [references/tooltips-interactions.md](references/tooltips-interactions.md)

Use this guide to add interactivity and user feedback.
- Enable and configure Sankey tooltips
- Customize tooltip content using `TooltipRendering(...)`
- Display node- or link-specific details
- Handle node and link click events
- Implement hover-based highlighting and interaction workflows

---

### Orientation and RTL
📄 **Read:** [references/orientation-and-rtl.md](references/orientation-and-rtl.md)

Use this guide to control layout direction and internationalization behavior.
- Switch between horizontal and vertical Sankey layouts
- Enable Right-to-Left (RTL) rendering
- Combine RTL with horizontal or vertical orientation
- Adjust sizing, spacing, and layout for different orientations
- Implement responsive orientation strategies

---

### Title and Formatting
📄 **Read:** [references/title-and-formatting.md](references/title-and-formatting.md)

Use this guide to format chart titles and subtitles.
- Set title and subtitle text
- Style fonts, sizes, colors, and weights
- Control text alignment and visual hierarchy
- Dynamically update title content at runtime
- Decide when to use built-in titles versus external HTML headings

---

### Accessibility
📄 **Read:** [references/accessibility-features.md](references/accessibility-features.md)

Use this guide to make the Sankey chart accessible and inclusive.
- Apply focus border settings for keyboard navigation
- Support RTL and localized content
- Use accessible label and tooltip practices
- Improve screen reader compatibility
- Ensure sufficient color contrast and interaction clarity

---

### Print and Export
📄 **Read:** [references/print-and-export.md](references/print-and-export.md)

Use this guide to support printing and exporting the Sankey chart.
- Export the chart to PNG, JPEG, SVG, and PDF formats
- Trigger print using the built-in Sankey print method
- Handle export lifecycle events
- Customize file names, metadata, and backgrounds
- Build user-friendly export and print toolbars

---

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)

Use this guide as the authoritative reference for all supported APIs.
- Full `Sankey` component API surface
- Properties with types and documented default values
- Node, Link, Label, Legend, and Tooltip configuration classes
- Border, Margin, Orientation, Theme, and Title-related APIs
- All lifecycle, rendering, interaction, and export/print events
- Enumerations and related helper classes
- Namespace and assembly details

---

## Quick Decision Tree

**What do you need?**

- Install and set up? → **getting-started.md**
- Style nodes? → **nodes-customization.md**
- Style links? → **links-configuration.md**
- Show and customize labels? → **labels-rendering.md**
- Add or customize legend? → **legends-management.md**
- Add or customize tooltips? → **tooltips-interactions.md**
- Switch orientation or use RTL? → **orientation-and-rtl.md**
- Add title and subtitle? → **title-and-formatting.md**
- Improve accessibility? → **accessibility-features.md**
- Export or print? → **print-and-export.md**
- Need the full class and property map? → **api-reference.md**

---

## Common Use Cases

1. **Supply chain visualization**  
   Show the flow from suppliers to warehouses to customers.

2. **Financial analysis**  
   Display money flow from sources to departments to net outcome.

3. **User journey visualization**  
   Track movement from traffic sources to onboarding to activation.

4. **Energy flow visualization**  
   Show distribution from sources to intermediate systems to consumption points.

5. **Data pipeline monitoring**  
   Visualize movement through ingestion, transformation, and output stages.

6. **Resource distribution**  
   Show allocation of time, budget, or staffing across categories.

---
