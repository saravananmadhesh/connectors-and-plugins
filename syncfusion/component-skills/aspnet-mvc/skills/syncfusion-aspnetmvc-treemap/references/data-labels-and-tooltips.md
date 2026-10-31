# Data Labels and Tooltips in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Data Labels Configuration](#data-labels-configuration)
- [Label Positioning](#label-positioning)
- [Label Formatting](#label-formatting)
- [Label Templates](#label-templates)
- [Tooltip Configuration](#tooltip-configuration)
- [Tooltip Templates](#tooltip-templates)
- [Advanced Label and Tooltip Features](#advanced-label-and-tooltip-features)
- [Troubleshooting](#troubleshooting)

## Overview

Data labels and tooltips provide textual information about TreeMap items. Data labels are permanently displayed on rectangles, while tooltips appear on hover. Both can be customized to show specific data fields, formatted text, or custom HTML templates.

### Core Components

**Data Labels:**
- Permanently visible text on rectangles
- Display item names, values, or custom text
- Positioned within or around rectangles
- Customizable fonts and styles

**Tooltips:**
- Appear on mouse hover
- Show detailed information
- Can contain HTML content
- Appear in popup overlays

## Data Labels Configuration

Data labels identify what each rectangle represents.

### Basic Label Display

Enable labels to show item names:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")  // Property to display as label
    )
    .Render();
```

### LabelPath Property

LabelPath specifies which data property displays as the label:

```csharp
// Controller data
var data = new List<object>
{
    new { ProductName = "Laptop", ProductCode = "LAP001", Sales = 5000 },
    new { ProductName = "Desktop", ProductCode = "DES001", Sales = 3500 }
};

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("ProductName")  // Display product name
    )
    .Render();
```

**Result:** Labels show "Laptop", "Desktop"

### Label Visibility Control

Control whether labels are shown:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .Visible(true)   // true = show labels (default)
    )
    .Render();

// Hide all labels
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .Visible(false)  // false = hide labels
    )
    .Render();
```

## Label Positioning

Control where labels appear relative to rectangles.

### LabelPosition Property

Position labels within or around rectangles:

```csharp
// Available positions
public enum LabelPosition
{
    TopLeft,      // Top-left corner
    TopCenter,    // Top center
    TopRight,     // Top-right corner
    MiddleLeft,   // Middle-left side
    Center,       // Center (default)
    MiddleRight,  // Middle-right side
    BottomLeft,   // Bottom-left corner
    BottomCenter, // Bottom center
    BottomRight   // Bottom-right corner
}
```

### Complete Positioning Example

```csharp
// Controller
public ActionResult LabelPositionDemo()
{
    var data = new List<object>
    {
        new { Name = "Item A", Value = 100 },
        new { Name = "Item B", Value = 200 },
        new { Name = "Item C", Value = 150 }
    };
    return View(data);
}
```

```razor
// View: Center positioning (default)
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .LabelPosition(LabelPosition.Center)
    )
    .Render();

// Top-left positioning
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .LabelPosition(LabelPosition.TopLeft)
    )
    .Render();

// Bottom-right positioning
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .LabelPosition(LabelPosition.BottomRight)
    )
    .Render();
```

### Position Selection Guide

| Position | Best For |
|----------|----------|
| **Center** | Default, balanced layout |
| **TopLeft / TopRight / BottomLeft / BottomRight** | Avoiding content overlap |
| **TopCenter / BottomCenter / MiddleLeft / MiddleRight** | Text alignment with space |

## Label Formatting

Format label text with multiple data fields or custom patterns.

### LabelFormat Property

Combine multiple data properties into a single label:

```csharp
// Controller
var data = new List<object>
{
    new { Product = "Laptop", Sales = 5000, Growth = 15 },
    new { Product = "Desktop", Sales = 3500, Growth = 8 }
};
```

```razor
// Label showing just product name
.LeafItemSettings(leaf => 
    leaf.LabelPath("Product")
)

// Label showing name and sales (using LabelFormat)
.LeafItemSettings(leaf => 
    leaf.LabelPath("Product")
        .LabelFormat("${Product}: ${Sales}K")
)

// Label showing all three fields
.LeafItemSettings(leaf => 
    leaf.LabelFormat("${Product}<br/>Sales: ${Sales}K<br/>Growth: ${Growth}%")
)
```

### Format String Syntax

Use `${PropertyName}` to insert data values:

```csharp
// Examples
"${Name}"                              // Single property
"${Name}: ${Value}"                    // Name + Value
"${Category} - ${SubCategory}"         // Multiple fields
"${Product} (${Quantity} units)"       // With literal text
"${Item}<br/>Price: $${Price}"         // Multi-line format
```

### Complete Formatting Example

```razor
@Html.EJS().TreeMap("container")
    .DataSource(new List<object>
    {
        new { Name = "Electronics", Revenue = 250, Items = 1200 },
        new { Name = "Furniture", Revenue = 150, Items = 450 }
    })
    .WeightValuePath("Revenue")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
    })
    .LeafItemSettings(leaf => 
        leaf.LabelFormat("${Name}<br/>Revenue: ${Revenue}M<br/>Items: ${Items}")
    )
    .Render();
```

## Label Templates

Use HTML templates for complex label layouts.

### LabelTemplate Property

Define custom HTML for labels:

```csharp
// Controller
var data = new List<object>
{
    new { ProductId = 1, Name = "Laptop", Price = 999 },
    new { ProductId = 2, Name = "Mouse", Price = 25 }
};
```

```razor
// Using template ID
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelTemplate("<div>${Name}</div>")
    )
    .Render();

// With styling
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelTemplate(
            "<div style='font-weight: bold;'>${Name}</div>" +
            "<div style='font-size: 12px;'>$${Price}</div>"
        )
    )
    .Render();
```

### Template Position Control

Position templates within rectangles using TemplatePosition:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelTemplate("<div class='label-content'>${Name}</div>")
            .TemplatePosition(LabelPosition.Center)  // Position in center
    )
    .Render();
```

### Advanced Template Example

```razor
@Html.EJS().TreeMap("container")
    .DataSource(new List<object>
    {
        new { Id = 1, Name = "Sales", Value = 45, Percentage = 30 },
        new { Id = 2, Name = "Engineering", Value = 120, Percentage = 80 }
    })
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
    })
    .LeafItemSettings(leaf => 
        leaf.LabelTemplate(
            "<div class='label-wrapper'>" +
            "  <div class='label-name'>${Name}</div>" +
            "  <div class='label-value'>${Value}</div>" +
            "  <div class='label-percent'>${Percentage}%</div>" +
            "</div>"
        )
    )
    .Render();

<style>
    .label-wrapper {
        text-align: center;
        padding: 5px;
    }
    .label-name {
        font-weight: bold;
        font-size: 14px;
    }
    .label-value {
        font-size: 12px;
        color: #666;
    }
    .label-percent {
        font-size: 11px;
        color: #999;
    }
</style>
```

## Tooltip Configuration

Tooltips provide hover-based information display.

### Basic Tooltip Setup

Enable tooltips to show on hover:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Tooltip(tooltip => 
        tooltip.Visible(true)
    )
    .Render();
```

### Tooltip Format

Specify what information appears in the tooltip:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Name}</b><br/>Value: ${Value}")
    )
    .Render();
```

### Tooltip Display Options

Control tooltip appearance and behavior:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("${Name}: ${Value}")
               .Opacity(0.9)           // Transparency (0-1)
               .BorderWidth(1)         // Border thickness
               .BorderColor("#cccccc") // Border color
    )
    .Render();
```

### Tooltip Properties Reference

| Property | Purpose | Default |
|----------|---------|---------|
| **Visible** | Show/hide tooltips | false |
| **Format** | Text to display (supports ${Property}) | Default format |
| **Opacity** | Transparency level (0-1) | 1.0 |
| **BorderWidth** | Border thickness | 0 |
| **BorderColor** | Border color (hex or named) | #000000 |
| **Fill** | Background color | #000000 |
| **TextStyle** | Font and text properties | Default |

## Tooltip Templates

Use custom HTML templates for tooltips.

### Tooltip Template Syntax

Define HTML structure for tooltips:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(new List<object>
    {
        new { Product = "Laptop", Sales = 5000, Stock = 120 },
        new { Product = "Mouse", Sales = 850, Stock = 450 }
    })
    .WeightValuePath("Sales")
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Template(
                   "<div style='padding: 10px;'>" +
                   "  <div><b>${Product}</b></div>" +
                   "  <div>Sales: ${Sales}</div>" +
                   "  <div>Stock: ${Stock} units</div>" +
                   "</div>"
               )
    )
    .Render();
```

### Complex Tooltip Template

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Template(
                   "<div class='tooltip-content'>" +
                   "  <div class='tooltip-header'>${Department}</div>" +
                   "  <div class='tooltip-body'>" +
                   "    <div>Employees: ${EmployeeCount}</div>" +
                   "    <div>Budget: $${Budget}M</div>" +
                   "    <div>Performance: ${Performance}/10</div>" +
                   "  </div>" +
                   "</div>"
               )
    )
    .Render();

<style>
    .tooltip-content {
        padding: 12px;
        background: #f9f9f9;
        border-radius: 4px;
    }
    .tooltip-header {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
        color: #333;
    }
    .tooltip-body {
        font-size: 12px;
        color: #666;
    }
    .tooltip-body div {
        margin-bottom: 4px;
    }
</style>
```

## Advanced Label and Tooltip Features

### Gap Between Labels

Add spacing for label readability:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .Gap(5)  // 5px gap around labels
    )
    .Render();
```

### Font Customization

Customize label font properties:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .TextStyle(style =>
            {
                style.FontFamily("Arial, sans-serif")
                     .FontSize("14px")
                     .FontWeight("bold")
                     .Color("#333333")
                     .Opacity(1.0);
            })
    )
    .Render();
```

### Conditional Formatting

Show/hide labels based on rectangle size:

```javascript
// Show labels only for large rectangles
var treemap = document.getElementById('container').ej2_instances[0];
treemap.legendSettings.visible = false;

treemap.itemRendering = function(args) {
    if (args.renderContent) {
        // args contains label information
        if (args.dataValue < 100) {
            args.label = '';  // Hide label for small items
        }
    }
};
```

### Dynamic Tooltip Content

Update tooltip based on data conditions:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Tooltip(tooltip => 
        tooltip.Visible(true)
    )
    .Render();

<script>
    var treemap = document.getElementById('container').ej2_instances[0];
    
    treemap.tooltipRender = function(args) {
        if (args.dataSource.Value > 1000) {
            args.tooltip.template = "<div><b>High Value</b><br/>${Name}: ${Value}</div>";
        } else {
            args.tooltip.template = "<div>${Name}: ${Value}</div>";
        }
    };
</script>
```

## Troubleshooting

### Issue: Labels Not Showing

**Cause:** LabelPath not specified or property doesn't exist in data.

**Solution:**
```razor
// ✅ Correct
.LeafItemSettings(leaf => 
    leaf.LabelPath("ProductName")  // Property exists in data
)

// ❌ Incorrect
.LeafItemSettings(leaf => 
    leaf.LabelPath("Product")  // Property doesn't exist
)
```

### Issue: Labels Overlapping

**Cause:** Too many items or labels don't fit in rectangles.

**Solution:**
```razor
// Add gap around labels
.LeafItemSettings(leaf => 
    leaf.LabelPath("Name")
        .Gap(10)  // Increase gap
)

// Use Top/Bottom positioning instead of Center
.LeafItemSettings(leaf => 
    leaf.LabelPosition(LabelPosition.TopCenter)
)

// Hide labels for small items (JavaScript)
treemap.itemRendering = function(args) {
    if (args.dataValue < 50) {
        args.label = '';  // Hide small item labels
    }
};
```

### Issue: Tooltips Not Appearing

**Cause:** Tooltip not enabled or not configured properly.

**Solution:**
```razor
// ✅ Ensure Visible = true
.Tooltip(tooltip => 
    tooltip.Visible(true)
           .Format("<b>${Name}</b><br/>Value: ${Value}")
)

// ✅ Check browser console for errors
// (Press F12, check console tab)
```

### Issue: Format String Not Interpolating

**Cause:** Property names don't match or wrong syntax.

**Solution:**
```csharp
// Data must have the property
var data = new { Name = "Item", Value = 100 };

// ✅ Correct syntax
.Format("${Name}: ${Value}")

// ❌ Incorrect syntax
.Format("${name}: ${value}")  // Case sensitive
.Format("$Name: $Value")      // Missing braces
.Format("Name: Value")        // Missing placeholders
```

### Issue: Template HTML Not Rendering

**Cause:** HTML not properly escaped or template syntax incorrect.

**Solution:**
```razor
// ✅ Correct: Concatenated string
.LabelTemplate(
    "<div class='label'>" +
    "  <b>${Name}</b>" +
    "  <div>${Value}</div>" +
    "</div>"
)

// ✅ Correct: Properly escaped
.LabelTemplate("<div>${Name}</div>")

// ❌ Incorrect: Unescaped quotes
.LabelTemplate("<div class=\"label\">${Name}</div>")
```

### Issue: Tooltip Template Not Showing

**Cause:** Tooltip.Template() used instead of Tooltip.Format() or vice versa.

**Solution:**
```razor
// ✅ For simple format
.Tooltip(tooltip => 
    tooltip.Format("<b>${Name}</b><br/>Value: ${Value}")
)

// ✅ For complex HTML template
.Tooltip(tooltip => 
    tooltip.Template(
        "<div class='complex'><b>${Name}</b></div>"
    )
)
```

### Performance Tip: Many Labels

For TreeMaps with many items:
1. Hide labels for items below a size threshold
2. Use simpler label formats
3. Consider condensed label text

```javascript
treemap.itemRendering = function(args) {
    // Hide labels if rectangle area is too small
    var minArea = 5000;
    if (args.dataValue < minArea) {
        args.label = '';
    }
};
```

