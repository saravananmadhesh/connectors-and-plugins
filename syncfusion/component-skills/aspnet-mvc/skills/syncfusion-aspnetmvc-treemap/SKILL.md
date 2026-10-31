---
name: syncfusion-aspnetmvc-treemap
description: Implement and configure the Syncfusion ASP.NET MVC TreeMap component for hierarchical data visualization. Use this skill whenever the user needs to visualize hierarchical data, create nested rectangles for tree structures, apply color mapping, configure drill-down navigation, set up legends and tooltips, or work with any TreeMap-specific features in ASP.NET MVC applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Syncfusion ASP.NET MVC TreeMap Component

The TreeMap control visualizes hierarchical data as nested rectangles, with each item's area calculated based on its numeric value. It's ideal for displaying organization structures, file hierarchies, market segments, and any data with parent-child relationships. All rendering uses Scalable Vector Graphics (SVG) for smooth, scalable visualization.

## Key Features

- **Multiple Layouts:** Square, Horizontal, Vertical, and Auto layout types
- **Hierarchical Visualization:** Unlimited levels and items support
- **Drill-Down Navigation:** Interactive drill-down to lower hierarchy levels
- **Color Mapping:** Range-based, equal-value, and desaturation color schemes
- **Interactive Elements:** Selection, highlighting, tooltips, and interactive legends
- **Data Labels:** Customizable labels with templates and positioning
- **Export & Print:** Support for PDF, image, and SVG export
- **Internationalization:** Multi-language locale support
- **Accessibility:** Built-in accessibility features for inclusive design

## When to Use This Skill

Use this skill when you need to:

- ✅ Set up and initialize a TreeMap control in ASP.NET MVC
- ✅ Bind flat or hierarchical data to a TreeMap
- ✅ Configure color mapping (range, equal, desaturation)
- ✅ Set up layouts and hierarchy levels
- ✅ Configure data labels, tooltips, and legends
- ✅ Implement interactive features (selection, drill-down, highlighting)
- ✅ Customize styling, fonts, borders, and appearance
- ✅ Export TreeMap to PDF, PNG, SVG, or print
- ✅ Configure internationalization and locales
- ✅ Handle TreeMap events and user interactions
- ✅ Access API properties, methods, and events

## Documentation and Navigation Guide

### 📌 Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- System requirements and prerequisites
- ASP.NET MVC project setup with Syncfusion templates
- NuGet package installation (Syncfusion.EJ2.MVC5)
- Namespace configuration in Web.config
- Script resources and CDN setup
- ScriptManager registration
- Creating your first TreeMap control
- Basic rendering and verification

**When to read:** Start here if setting up TreeMap for the first time or configuring the development environment.

### 📌 Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- DataSource property configuration
- Flat collection data binding (single-level data)
- Hierarchical collection data binding (multi-level data)
- Complete C# controller examples with data models
- CSHTML view implementation with Html.EJS helper
- Data source preparation and structuring
- Testing data binding with expected outputs

**When to read:** When you need to connect your data to the TreeMap component.

### 📌 Color Mapping
📄 **Read:** [references/color-mapping.md](references/color-mapping.md)
- Range color mapping (apply colors based on numeric ranges)
- Equal color mapping (apply colors based on specific values)
- Desaturation color mapping (apply colors based on opacity levels)
- ColorMapping property configuration
- RangeColorValuePath and EqualColorValuePath usage
- MinOpacity and MaxOpacity settings
- Complete examples for each color mapping type
- Visual output descriptions for each configuration

**When to read:** When you need to apply conditional coloring based on data values.

### 📌 Layout and Levels
📄 **Read:** [references/layout-and-levels.md](references/layout-and-levels.md)
- Layout types: Square, Horizontal, Vertical, and Auto
- Levels configuration for hierarchical display
- GroupIdPath and GroupColorValuePath settings
- Hierarchy depth and nesting configuration
- Layout-specific properties and behaviors
- Complete examples for each layout type
- Optimizing visual hierarchy for your data structure

**When to read:** When you need to control how data is arranged and displayed in the TreeMap.

### 📌 Data Labels and Tooltips
📄 **Read:** [references/data-labels-and-tooltips.md](references/data-labels-and-tooltips.md)
- Data label configuration and display
- Label positioning (TopLeft, TopCenter, TopRight, etc.)
- Label formatting with LabelFormat property
- Label templates and custom HTML rendering
- TemplatePosition property for template alignment
- Tooltip setup with TooltipSettings
- Tooltip templates and custom content
- Interactive tooltip examples with event handling

**When to read:** When you need to display text labels on rectangles or show additional information in tooltips.

### 📌 Interactions and Drill-Down
📄 **Read:** [references/interactions-and-drilldown.md](references/interactions-and-drilldown.md)
- Selection and highlight settings configuration
- SelectionSettings with Fill, Border, and Enable properties
- Drill-down navigation and hierarchy traversal
- DrillDownSettings configuration
- Legend interactive features and legend click handling
- ItemClick, DrillStart, and DrillEnd events
- Building interactive drill-down interfaces
- Breadcrumb navigation for drill-down tracking

**When to read:** When you need to implement user interactions like clicking items, selecting rectangles, drilling down into hierarchies, or handling legend clicks.

### 📌 Customization and Styling
📄 **Read:** [references/customization-and-styling.md](references/customization-and-styling.md)
- Legend configuration (position, orientation, visibility)
- Title and subtitle setup with TitleSettings
- Border and background styling for the entire component
- Font customization for labels and text
- Padding and margin settings
- Border properties for items and containers
- Background colors and transparency
- Accessibility settings and ARIA attributes

**When to read:** When you need to change the visual appearance, add titles, configure legends, or adjust styling elements.

### 📌 Print, Export, and Globalization
📄 **Read:** [references/print-export-and-globalization.md](references/print-export-and-globalization.md)
- Print functionality and print settings
- Export to PDF format
- Export to image formats (PNG, JPEG)
- Export to SVG format
- Export method usage and export settings
- Internationalization (i18n) configuration
- Locale setup for different languages
- Multi-language support implementation
- Regional format customization

**When to read:** When you need to allow users to print or export TreeMaps, or when supporting multiple languages and regions.

### 📌 API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)
- Complete component properties and configuration options
- All available events and event handlers
- Methods for programmatic control
- Models and data structures
- Nested object hierarchies and child members
- Data types for each property
- Default values where documented
- Direct links to official Syncfusion documentation for each API item

**When to read:** When you need to look up specific properties, events, or methods, or when reviewing the complete API surface.

## Quick Start Example

Here's a minimal, complete example to create and render your first TreeMap:

**Controller (HomeController.cs):**
```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }

    public ActionResult GetTreeMapData()
    {
        List<object> data = new List<object>
        {
            new { Name = "USA", GDPValue = 21000 },
            new { Name = "China", GDPValue = 14000 },
            new { Name = "Japan", GDPValue = 5000 },
            new { Name = "Germany", GDPValue = 4000 }
        };
        return Json(data, JsonRequestBehavior.AllowGet);
    }
}
```

**View (Index.cshtml):**
```razor
@{
    ViewBag.Title = "TreeMap Example";
}

<div class="control-section">
    @Html.EJS().TreeMap("container")
        .DataSource(new List<object>
        {
            new { Name = "USA", GDPValue = 21000 },
            new { Name = "China", GDPValue = 14000 },
            new { Name = "Japan", GDPValue = 5000 },
            new { Name = "Germany", GDPValue = 4000 }
        })
        .WeightValuePath("GDPValue")
        .Levels(levels =>
        {
            levels.GroupPath("Name").Add();
        })
        .LeafItemSettings(leaf => leaf.LabelPath("Name"))
        .Render();
</div>

<style>
    .control-section {
        padding: 20px;
    }
</style>
```

**Expected Result:** A TreeMap displaying four countries as rectangles, with area proportional to GDP values. Each rectangle is labeled with the country name.

## Common Patterns

### Pattern 1: Hierarchical Organization Chart
Visualize an organization structure with parent-child relationships, showing departments and teams:

```csharp
// Controller
public ActionResult GetOrgData()
{
    List<object> data = new List<object>
    {
        new { Name = "CEO", Value = 1, ParentName = null },
        new { Name = "VP Sales", Value = 2, ParentName = "CEO" },
        new { Name = "VP Tech", Value = 3, ParentName = "CEO" },
        new { Name = "Sales Rep 1", Value = 1, ParentName = "VP Sales" }
    };
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

### Pattern 2: Range-Based Color Mapping
Apply colors based on numeric ranges to highlight high/medium/low performance:

```razor
@Html.EJS().TreeMap("container")
    .ColorMapping(colors =>
    {
        colors.From(0).To(50).Color("Red").Add();
        colors.From(50).To(100).Color("Yellow").Add();
        colors.From(100).To(150).Color("Green").Add();
    })
    .RangeColorValuePath("Performance")
    .Render();
```

### Pattern 3: Drill-Down Navigation
Enable users to navigate deeper into hierarchical data:

```razor
@Html.EJS().TreeMap("container")
    .LayoutType(TreemapLayoutType.Squarified)
    .Levels(levels =>
    {
        levels.GroupPath("Continent").Add();
        levels.GroupPath("Country").Add();
    })
    .Render();
```

---

**Ready to explore TreeMap features?** Choose the reference file that matches your task and dive in!

For comprehensive API documentation including all properties, events, and methods, **read the API Reference** section.

