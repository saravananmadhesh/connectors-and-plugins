# Leaf Items: Rendering and Customization

Complete guide to leaf item rendering, label customization, spacing, appearance, label templates, and common leaf item patterns in Syncfusion TreeMap for ASP.NET Core Razor Pages.

## Table of Contents
- [Overview](#overview)
- [Leaf Item Rendering](#leaf-item-rendering)
  - [Basic Rendering](#basic-rendering)
  - [Hiding Labels](#hiding-labels)
- [Label Positioning and Formatting](#label-positioning-and-formatting)
  - [Label Positions](#label-positions)
  - [Label Format](#label-format)
  - [Label Style Customization](#label-style-customization)
- [Label Templates](#label-templates)
  - [Basic Label Template](#basic-label-template)
  - [Label Template with Conditional Formatting](#label-template-with-conditional-formatting)
  - [Label Template with Icons](#label-template-with-icons)
  - [Template Position](#template-position)
  - [When to Use Templates vs labelFormat](#when-to-use-templates-vs-labelformat)
- [Item Gaps and Spacing](#item-gaps-and-spacing)
  - [Gap Between Items](#gap-between-items)
  - [Padding Within Items](#padding-within-items)
- [Leaf Item Appearance](#leaf-item-appearance)
  - [Border Configuration](#border-configuration)
  - [Fill Color](#fill-color)
  - [Auto-Fill Colors](#fill-color)
  - [Opacity](#opacity)
- [Label Intersect Action](#label-intersect-action)
- [Complete Leaf Item Configuration Example](#complete-leaf-item-configuration-example)
- [Common Leaf Item Patterns](#common-leaf-item-patterns)
  - [Pattern 1 Minimal Display](#pattern-1-minimal-display)
  - [Pattern 2 Information-Rich](#pattern-2-information-rich)
  - [Pattern 3 Color-Coded Categories](#pattern-3-color-coded-categories)
  - [Pattern 4 Visual Hierarchy with Opacity](#pattern-4-visual-hierarchy-with-opacity)
  - [Pattern 5 Custom Template with Icons](#pattern-5-custom-template-with-icons)
- [Troubleshooting Leaf Items](#troubleshooting-leaf-items)

---

## Overview

Leaf items are the lowest-level visual elements in the TreeMap. Each leaf item is rendered as a rectangle whose size is calculated from the numeric field configured through `weightValuePath`.

Leaf item customization is configured inside `e-treemap-leafitemsettings`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Leaf item settings commonly control:

- Label field
- Label visibility
- Label position
- Label format
- Label template
- Item gap
- Item padding
- Fill color
- Opacity
- Border
- Label overflow behavior

---

## Leaf Item Rendering

### Basic Rendering

By default, leaf items render based on:

- Rectangle size from `weightValuePath`
- Label text from `labelPath`
- Layout behavior from `layoutType`
- Color from default palette, fill, direct binding, or color mapping

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    showLabels="true">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Example model:

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<SalesData>
        {
            new SalesData { Name = "Laptop", Category = "Electronics", Sales = 5000 },
            new SalesData { Name = "Phone", Category = "Electronics", Sales = 8000 },
            new SalesData { Name = "Chair", Category = "Furniture", Sales = 3000 },
            new SalesData { Name = "Desk", Category = "Furniture", Sales = 4000 }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

### Hiding Labels

Set `showLabels="false"` when the TreeMap should focus only on rectangle size, color, or tooltip-based details.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            showLabels="false">
</e-treemap-leafitemsettings>
```

Use hidden labels when:

- Items are too small for readable text.
- Tooltips provide the detailed information.
- You want a clean size-comparison visualization.
- Labels reduce readability in dense layouts.

---

## Label Positioning and Formatting

### Label Positions

Use `labelPosition` to control where labels appear inside each rectangle.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelPosition="Center">
</e-treemap-leafitemsettings>
```

Common label positions:

- `Center`
- `TopLeft`
- `TopCenter`
- `TopRight`
- `MiddleLeft`
- `MiddleRight`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

Example:

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        Trim
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### Label Format

Use `labelFormat` to display multiple fields in a label.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelFormat="${Name}: ${Sales}">
</e-treemap-leafitemsettings>
```

With data:

```csharp
new SalesData { Name = "Laptop", Sales = 5000 }
```

The label displays:

```text
Laptop: 5000
```

For formatted values, prepare display fields in C# and bind them in `labelFormat`.

```csharp
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<SalesData>
        {
            new SalesData
            {
                Name = "Laptop",
                Sales = 5000,
                SalesText = 5000.ToString("N0", CultureInfo.CurrentCulture)
            },
            new SalesData
            {
                Name = "Phone",
                Sales = 8000,
                SalesText = 8000.ToString("N0", CultureInfo.CurrentCulture)
            }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
        public string SalesText { get; set; } = string.Empty;
    }
}
```

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelFormat="${Name}: ${SalesText} units">
</e-treemap-leafitemsettings>
```

### Label Style Customization

Use nested label style settings to customize label appearance.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
            <e-leafitemsettings-labelstyle color='@("#FFFFFF")'
                                           fontSize="14px"
                                           fontWeight="600"
                                           opacity="1">
            </e-leafitemsettings-labelstyle>
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Common label style properties:

- `color` - Label text color.
- `fontSize` - Label font size.
- `fontWeight` - Label font weight.
- `opacity` - Label opacity.

---

## Label Templates

Use `labelTemplate` when labels need custom HTML, icons, multiple visual rows, or advanced styling.

### Basic Label Template

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    labelTemplate="#labelTemplate"
                                    templatePosition="Center">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script id="labelTemplate" type="text/x-template">
    <div style="padding: 5px; text-align: center;">
        <strong>${Name}</strong>
        <br />
        <span>${SalesText}</span>
    </div>
</script>
```

### Label Template with Conditional Formatting

For stable Razor Pages output, compute conditional fields in the PageModel instead of placing complex conditional expressions directly inside the template.

```csharp
public class SalesData
{
    public string Name { get; set; } = string.Empty;
    public double Sales { get; set; }
    public string SalesText { get; set; } = string.Empty;
    public string PerformanceColor { get; set; } = string.Empty;
}
```

```csharp
TreeMapData = new List<SalesData>
{
    new SalesData
    {
        Name = "Laptop",
        Sales = 5000,
        SalesText = "5,000",
        PerformanceColor = "#F44336"
    },
    new SalesData
    {
        Name = "Phone",
        Sales = 8000,
        SalesText = "8,000",
        PerformanceColor = "#4CAF50"
    }
};
```

```cshtml
<script id="labelTemplate" type="text/x-template">
    <div style="padding: 5px;">
        <strong>${Name}</strong>
        <br />
        <span style="color: ${PerformanceColor}; font-weight: 600;">
            ${SalesText}
        </span>
    </div>
</script>
```

### Label Template with Icons

Use an `Icon` or `CategoryIcon` field in the model.

```csharp
public class SalesData
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Sales { get; set; }
    public string CategoryIcon { get; set; } = string.Empty;
}
```

```csharp
TreeMapData = new List<SalesData>
{
    new SalesData { Name = "Laptop", Category = "Electronics", Sales = 5000, CategoryIcon = "🖥️" },
    new SalesData { Name = "Chair", Category = "Furniture", Sales = 3000, CategoryIcon = "🪑" }
};
```

```cshtml
<script id="labelTemplate" type="text/x-template">
    <div style="text-align: center; padding: 8px;">
        <div style="font-size: 20px;">${CategoryIcon}</div>
        <strong>${Name}</strong>
    </div>
</script>
```

### Template Position

Use `templatePosition` to control where the label template is rendered inside the rectangle.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelTemplate="#labelTemplate"
                            templatePosition="TopLeft">
</e-treemap-leafitemsettings>
```

Common template positions:

- `TopLeft`
- `TopCenter`
- `TopRight`
- `Center`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

### When to Use Templates vs labelFormat

Use `labelFormat` when:

- You need simple text with field substitution.
- You need lightweight rendering.
- No custom HTML layout is required.
- Performance is important for many items.

Use `labelTemplate` when:

- HTML layout is required.
- Icons or images are needed.
- Conditional styling is required.
- Labels need multiple styled sections.
- You need full control over label markup.

---

## Item Gaps and Spacing

### Gap Between Items

Use the `gap` property to add spacing between leaf items.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            gap="2">
</e-treemap-leafitemsettings>
```

Common values:

- `gap="0"` - No spacing between items.
- `gap="2"` - Small spacing.
- `gap="5"` - More visible spacing.

Use small gaps for dashboards and larger gaps when visual separation is important.

### Padding Within Items

Use the `padding` property to add internal spacing inside leaf items.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            padding="5">
</e-treemap-leafitemsettings>
```

Common values:

- `padding="2"` - Compact internal padding.
- `padding="5"` - Balanced padding.
- `padding="10"` - Larger internal spacing.

Use padding when labels or templates appear too close to item edges.

---

## Leaf Item Appearance

### Border Configuration

Use nested border settings inside `leafItemSettings`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
            <e-leafitemsettings-border color='@("#CCCCCC")'
                                       width="1">
            </e-leafitemsettings-border>
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Border properties:

- `color` - Border color.
- `width` - Border width in pixels.

### Fill Color

Use `fill` to apply one color to all leaf items.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            fill='@("#336699")'>
</e-treemap-leafitemsettings>
```

If range color mapping, equal color mapping, palette, or direct color binding is configured, those color settings may override or take precedence over a simple fill.

### Auto-Fill Colors

Use `autoFill="true"` to generate colors for leaf items automatically.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            autoFill="true">
</e-treemap-leafitemsettings>
```

Use auto-fill when:

- You want visual differentiation without explicit color mapping.
- Exact color-to-value meaning is not required.
- The TreeMap is used for simple visual separation.

For metric-driven color meaning, prefer range or equal color mapping.

### Opacity

Use `opacity` to control leaf item transparency.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            opacity="0.8">
</e-treemap-leafitemsettings>
```

Common values:

- `opacity="1"` - Fully opaque.
- `opacity="0.8"` - Slight transparency.
- `opacity="0.5"` - Moderate transparency.
- `opacity="0.3"` - High transparency.

---

## Label Intersect Action

Use `interSectAction` to control how labels behave when they exceed the available item area.

```cshtml
Trim
</e-treemap-leafitemsettings>
```

Available options:

**None**

Displays the label as-is.

```cshtml
None
</e-treemap-leafitemsettings>
```

**Trim**

Trims overflowing text and uses ellipsis.

```cshtml
Trim
</e-treemap-leafitemsettings>
```

**WrapByWord**

Wraps long labels by word.

```cshtml
WrapByWord
</e-treemap-leafitemsettings>
```

**Wrap**

Wraps text character by character.

```cshtml
Wrap
</e-treemap-leafitemsettings>
```

**Hide**

Hides labels that do not fit.

```cshtml
Hide
</e-treemap-leafitemsettings>
```

Use `Hide` with tooltips when the TreeMap contains many small rectangles.

---

## Complete Leaf Item Configuration Example

This example combines label positioning, formatting, spacing, fill, opacity, border, label style, tooltip support, and label overflow handling.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        Trim
            <e-leafitemsettings-border color='@("#CCCCCC")'
                                       width="1">
            </e-leafitemsettings-border>

            <e-leafitemsettings-labelstyle color='@("#FFFFFF")'
                                           fontSize="13px"
                                           fontWeight="600"
                                           opacity="1">
            </e-leafitemsettings-labelstyle>
        </e-treemap-leafitemsettings>

        <e-treemap-tooltipsettings visible="true"
                                   format="${Name}: ${SalesText}">
        </e-treemap-tooltipsettings>
    </ejs-treemap>
</div>
```

This configuration:

- Displays item names with sales values.
- Centers labels in rectangles.
- Adds spacing between items.
- Adds padding inside items.
- Applies a blue fill with 90% opacity.
- Trims long labels.
- Adds a light gray border.
- Enables tooltips for additional readability.

---

## Common Leaf Item Patterns

### Pattern 1 Minimal Display

For size-focused comparison, hide labels and use tooltips.

```cshtml
<e-treemap-leafitemsettings showLabels="false">
</e-treemap-leafitemsettings>

<e-treemap-tooltipsettings visible="true"
                           format="${Name}: ${Sales}">
</e-treemap-tooltipsettings>
```

### Pattern 2 Information-Rich

Show multiple data fields in each item using preformatted values.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelFormat="${Name}: ${SalesText}">
</e-treemap-leafitemsettings>
```

For rich layouts, use a template.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelTemplate="#infoTemplate"
                            templatePosition="Center">
</e-treemap-leafitemsettings>

<script id="infoTemplate" type="text/x-template">
    <div style="text-align: center; padding: 6px;">
        <strong>${Name}</strong>
        <br />
        <span>${SalesText} units</span>
    </div>
</script>
```

### Pattern 3 Color-Coded Categories

For simple differentiation, use `autoFill`.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            autoFill="true">
</e-treemap-leafitemsettings>
```

For meaningful category colors, use `equalColorValuePath` with color mappings.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             equalColorValuePath="Category"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping value="Electronics"
                                             color='@("#336699")'
                                             label="Electronics">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping value="Furniture"
                                             color='@("#FF6B6B")'
                                             label="Furniture">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Pattern 4 Visual Hierarchy with Opacity

Use opacity for softer visual presentation, then combine it with selection or highlight for emphasis.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            opacity="0.7">
</e-treemap-leafitemsettings>

<e-treemap-selectionsettings enable="true"
                             fill='@("#FFD93D")'
                             opacity="1">
</e-treemap-selectionsettings>
```

### Pattern 5 Custom Template with Icons

Use a custom label template with icon fields from the model.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelTemplate="#customTemplate"
                            templatePosition="Center">
</e-treemap-leafitemsettings>

<script id="customTemplate" type="text/x-template">
    <div style="text-align: center; padding: 8px;">
        <div style="font-size: 24px;">${CategoryIcon}</div>
        <div style="font-weight: 600;">${Name}</div>
        <div style="font-size: 12px;">${SalesText} units</div>
    </div>
</script>
```

---

## Troubleshooting Leaf Items

**Issue: Leaf items are not rendering**

- Verify `dataSource` is not empty.
- Verify `weightValuePath` points to a numeric field.
- Ensure the TreeMap container has a visible height.
- Confirm Syncfusion scripts are rendered with `<ejs-scripts></ejs-scripts>`.

**Issue: Labels are not showing**

- Verify `labelPath` matches an existing data field.
- Ensure `showLabels` is not set to `false`.
- Ensure rectangles are large enough for labels.
- Use `interSectAction="Trim"` or enable tooltips for smaller rectangles.

**Issue: Label format does not display values**

- Verify field names are case-sensitive and match the model.
- Use preformatted C# fields such as `SalesText`.
- Avoid complex inline conditional expressions in `labelFormat`.

**Issue: Label templates do not render**

- Verify the template ID matches `labelTemplate`.
- Use `script type="text/x-template"`.
- Ensure all template fields exist in the data source.
- Avoid invalid HTML inside the template.

**Issue: Hex color values cause Razor compilation errors**

- Use explicit Razor string expressions for hex values.

```cshtml
fill='@("#336699")'
```

**Issue: Border does not apply**

- Use the nested border tag inside `leafItemSettings`.

```cshtml
<e-leafitemsettings-border color='@("#CCCCCC")'
                           width="1">
</e-leafitemsettings-border>
```

**Issue: Labels overflow item boundaries**

- Use `interSectAction="Trim"` for most dashboards.
- Use `interSectAction="WrapByWord"` when multi-line labels are acceptable.
- Use `interSectAction="Hide"` with tooltips for dense layouts.

---