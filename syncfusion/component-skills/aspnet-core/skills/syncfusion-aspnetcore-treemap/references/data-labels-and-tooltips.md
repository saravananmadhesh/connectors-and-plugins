# Data Labels and Tooltips in Syncfusion TreeMap

Complete guide to data label formatting, label templates, label intersection handling, tooltip formatting, and tooltip templates for enhanced information display in Syncfusion TreeMap for ASP.NET Core Razor Pages.

## Table of Contents
- [Overview](#overview)
- [Data Label Formatting](#data-label-formatting)
  - [Basic Label Display](#basic-label-display)
  - [Label Format with Multiple Fields](#label-format-with-multiple-fields)
  - [Advanced Label Formatting](#advanced-label-formatting)
  - [Label Format Syntax](#label-format-syntax)
- [Data Label Templates](#data-label-templates)
  - [Basic Label Template](#basic-label-template)
  - [Label Template with Styling](#label-template-with-styling)
  - [Label Template with Icons](#label-template-with-icons)
  - [Label Template Position](#label-template-position)
  - [When to Use Templates vs labelFormat](#when-to-use-templates-vs-labelformat)
- [Label Intersect Actions](#label-intersect-actions)
  - [Action Types](#action-types)
  - [Choosing Intersect Action](#choosing-intersect-action)
  - [When to Use Each Action](#when-to-use-each-action)
- [Tooltip Visibility](#tooltip-visibility)
  - [Enable or Disable Tooltips](#enable-or-disable-tooltips)
  - [Default Tooltip Content](#default-tooltip-content)
- [Tooltip Formatting](#tooltip-formatting)
  - [Custom Tooltip Format](#custom-tooltip-format)
  - [Multi-Line Tooltip Format](#multi-line-tooltip-format)
  - [Conditional Tooltip Formatting](#conditional-tooltip-formatting)
  - [Tooltip Format Syntax](#tooltip-format-syntax)
- [Tooltip Templates](#tooltip-templates)
  - [Basic Tooltip Template](#basic-tooltip-template)
  - [Rich Tooltip Template with Styling](#rich-tooltip-template-with-styling)
  - [Tooltip Template with Icons](#tooltip-template-with-icons)
  - [Tooltip Template with Conditional Colors](#tooltip-template-with-conditional-colors)
- [Tooltip Styling](#tooltip-styling)
- [Complete Information Display Example](#complete-information-display-example)
- [Common Information Display Patterns](#common-information-display-patterns)
  - [Pattern 1 Minimal Labels and Rich Tooltips](#pattern-1-minimal-labels-and-rich-tooltips)
  - [Pattern 2 Simple Labels and Format Tooltips](#pattern-2-simple-labels-and-format-tooltips)
  - [Pattern 3 Template Labels and Template Tooltips](#pattern-3-template-labels-and-template-tooltips)
  - [Pattern 4 Hide Labels and Enable Tooltips](#pattern-4-hide-labels-and-enable-tooltips)
- [Troubleshooting Data Labels and Tooltips](#troubleshooting-data-labels-and-tooltips)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)

---

## Overview

TreeMap provides two primary information display mechanisms:

1. **Data labels** - Static text displayed inside TreeMap rectangles.
2. **Tooltips** - Dynamic information displayed on hover or tap.

Use labels for short, always-visible information such as product names or category names. Use tooltips for detailed information such as sales, revenue, margin, formatted values, and status details.

For ASP.NET Core Razor Pages examples, use strongly typed `Model.TreeMapData` instead of `ViewBag.data` for clearer and safer binding.

---

## Data Label Formatting

### Basic Label Display

Labels show values from the field configured through `labelPath`.

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

With data such as:

```csharp
new SalesData { Name = "Laptop", Sales = 5000 }
```

The label displays:

```text
Laptop
```

### Label Format with Multiple Fields

Use `labelFormat` to combine multiple data fields in the label.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    labelFormat="${Name}: ${Sales}">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Example output:

```text
Laptop: 5000
```

### Advanced Label Formatting

For multi-line or formatted values, the most reliable ASP.NET Core approach is to prepare formatted fields in the PageModel and bind those fields through `labelFormat`.

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
                Revenue = 150000,
                SalesText = 5000.ToString("N0", CultureInfo.CurrentCulture),
                RevenueText = 150000.ToString("C2", CultureInfo.CurrentCulture)
            },
            new SalesData
            {
                Name = "Phone",
                Sales = 8000,
                Revenue = 200000,
                SalesText = 8000.ToString("N0", CultureInfo.CurrentCulture),
                RevenueText = 200000.ToString("C2", CultureInfo.CurrentCulture)
            }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
        public double Revenue { get; set; }
        public string SalesText { get; set; } = string.Empty;
        public string RevenueText { get; set; } = string.Empty;
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    labelFormat="${Name}: ${SalesText}">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Avoid complex conditional expressions directly inside `labelFormat`. If conditional text is required, precompute it in C# and bind that field.

```csharp
PerformanceText = sales > 5000 ? "High" : "Low";
```

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelFormat="${PerformanceText}: ${Name}">
</e-treemap-leafitemsettings>
```

### Label Format Syntax

Common label format patterns:

```text
${Name}
${Name}: ${Sales}
${Name}: ${SalesText}
${Name}: ${RevenueText}
${PerformanceText}: ${Name}
```

Recommended usage:

- Use `${FieldName}` to display a field from the data source.
- Use preformatted C# fields for currency, percentage, date, and number formatting.
- Use templates instead of `labelFormat` for rich HTML layouts.
- Use precomputed fields instead of complex inline conditional expressions.

---

## Data Label Templates

Use label templates when the label requires HTML layout, custom styling, icons, or multiple visual elements.

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
                                    templatePosition="Center"
                                    showLabels="true">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script id="labelTemplate" type="text/x-template">
    <div style="text-align: center; padding: 5px;">
        <strong>${Name}</strong>
        <br />
        <span>${SalesText}</span>
    </div>
</script>
```

### Label Template with Styling

```cshtml
<script id="labelTemplate" type="text/x-template">
    <div style="background: rgba(255,255,255,0.85); padding: 4px; border-radius: 3px;">
        <div style="font-weight: 600; color: #333;">${Name}</div>
        <div style="color: #666; font-size: 12px;">${SalesText} units</div>
    </div>
</script>
```

### Label Template with Icons

For reliable rendering, prepare the icon field in the PageModel instead of using conditional expressions directly in the template.

```csharp
public class SalesData
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Sales { get; set; }
    public string SalesText { get; set; } = string.Empty;
    public string CategoryIcon { get; set; } = string.Empty;
}
```

```csharp
TreeMapData = new List<SalesData>
{
    new SalesData
    {
        Name = "Laptop",
        Category = "Electronics",
        Sales = 5000,
        SalesText = "5,000",
        CategoryIcon = "🖥️"
    },
    new SalesData
    {
        Name = "Chair",
        Category = "Furniture",
        Sales = 3000,
        SalesText = "3,000",
        CategoryIcon = "🪑"
    }
};
```

```cshtml
<script id="labelTemplate" type="text/x-template">
    <div style="text-align: center;">
        <div style="font-size: 20px; margin-bottom: 3px;">${CategoryIcon}</div>
        <div style="font-size: 12px; font-weight: 600;">${Name}</div>
    </div>
</script>
```

### Label Template Position

Use `templatePosition` to control where the label template appears inside the TreeMap item.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelTemplate="#labelTemplate"
                            templatePosition="Center">
</e-treemap-leafitemsettings>
```

Common position options:

- `TopLeft`
- `TopCenter`
- `TopRight`
- `Center`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

### When to Use Templates vs labelFormat

Use `labelFormat` when:

- The output is simple text.
- Only field substitution is required.
- You want lightweight rendering.
- No custom HTML layout is needed.

Use `labelTemplate` when:

- HTML layout is required.
- Icons or images are required.
- Conditional styles are required.
- Labels need multiple visual sections.
- Rich styling is more important than compact rendering.

---

## Label Intersect Actions

When label text exceeds the available rectangle area, `interSectAction` controls how the label behaves.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            interSectAction="Trim"
                            showLabels="trueettings labelPath="Name"
                            interSectAction="Wraptreemap-leafitemsettings labelPath="Name"
                            interSectAction="Hideest Practice |
|---|---|---|
| None | Large rectangles | Use only when labels naturally fit |
| Trim | Standard dashboards | Good default for most layouts |
| WrapByWord | Multi-line labels | Best for readability |
| Wrap | Dense layouts | Use only when word wrapping is insufficient |
| Hide | Small rectangles | Pair with tooltips |

### When to Use Each Action

Use `Trim` for most business dashboards. Use `WrapByWord` when labels must remain readable and rectangles have enough height. Use `Hide` for dense TreeMaps where tooltips provide detailed information.

---

## Tooltip Visibility

### Enable or Disable Tooltips

Enable tooltips with `e-treemap-tooltipsettings`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-tooltipsettings visible="true">
        </e-treemap-tooltipsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

- `visible="true"` enables tooltips.
- `visible="false"` disables tooltips.

### Default Tooltip Content

When tooltip formatting is not configured, the tooltip displays basic item value information based on the TreeMap data and weight field.

Example data:

```csharp
new SalesData { Name = "Laptop", Sales = 5000 }
```

With:

```cshtml
weightValuePath="Sales"
```

The default tooltip can display the value associated with the TreeMap item.

---

## Tooltip Formatting

### Custom Tooltip Format

Use the `format` property to customize tooltip text.

```cshtml
<e-treemap-tooltipsettings visible="true"
                           format="Product: ${Name}, Sales: ${Sales}">
</e-treemap-tooltipsettings>
```

Example output:

```text
Product: Laptop, Sales: 5000
```

### Multi-Line Tooltip Format

For formatted multi-field tooltip content, use preformatted fields and line breaks where supported.

```cshtml
<e-treemap-tooltipsettings visible="true"
                           format="${Name} - Sales: ${SalesText} - Revenue: ${RevenueText}">
</e-treemap-tooltipsettings>
```

For rich multi-line layout, prefer `template`.

### Conditional Tooltip Formatting

Avoid complex conditional expressions directly in `format`. Precompute conditional display values in C#.

```csharp
PerformanceText = sales > 5000 ? "High Performer" : "Needs Improvement";
```

```cshtml
<e-treemap-tooltipsettings visible="true"
                           format="${PerformanceText}: ${Name}">
</e-treemap-tooltipsettings>
```

### Tooltip Format Syntax

Common tooltip format patterns:

```text
${Name}
${Name}: ${Sales}
Product: ${Name}, Sales: ${Sales}
${PerformanceText}: ${Name}
${Name}: ${RevenueText}
```

Recommended usage:

- Use `${FieldName}` to display fields.
- Use preformatted model fields for currency, number, date, and percentage values.
- Use templates for multi-line or styled tooltips.
- Avoid complex inline expressions inside the tooltip `format`.

---

## Tooltip Templates

Use tooltip templates for complex HTML tooltip layouts.

### Basic Tooltip Template

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-tooltipsettings visible="true"
                                   template="#tooltipTemplate">
        </e-treemap-tooltipsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script id="tooltipTemplate" type="text/x-template">
    <div style="padding: 10px;">
        <strong>${Name}</strong>
        <br />
        Sales: ${SalesText}
        <br />
        Revenue: ${RevenueText}
    </div>
</script>
```

### Rich Tooltip Template with Styling

```cshtml
<script id="tooltipTemplate" type="text/x-template">
    <div style="width: 250px; padding: 12px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
            ${Name}
        </div>
        <table style="width: 100%; font-size: 13px;">
            <tr>
                <td>Sales:</td>
                <td style="text-align: right; font-weight: 600;">${SalesText}</td>
            </tr>
            <tr>
                <td>Revenue:</td>
                <td style="text-align: right; font-weight: 600;">${RevenueText}</td>
            </tr>
            <tr>
                <td>Margin:</td>
                <td style="text-align: right; font-weight: 600; color: #4CAF50;">${MarginText}</td>
            </tr>
        </table>
    </div>
</script>
```

### Tooltip Template with Icons

Use a precomputed icon field for predictable rendering.

```cshtml
<script id="tooltipTemplate" type="text/x-template">
    <div style="padding: 10px;">
        <div style="font-size: 24px; text-align: center; margin-bottom: 5px;">
            ${CategoryIcon}
        </div>
        <strong>${Name}</strong>
        <br />
        ${SalesText} units sold
    </div>
</script>
```

### Tooltip Template with Conditional Colors

Prepare the color and text in the PageModel.

```csharp
PerformanceColor = sales > 5000 ? "#4CAF50" : "#F44336";
PerformanceText = sales > 5000 ? "High Performance" : "Low Performance";
```

```cshtml
<script id="tooltipTemplate" type="text/x-template">
    <div style="padding: 10px;">
        <strong>${Name}</strong>
        <br />
        <div style="color: ${PerformanceColor}; font-weight: 600;">
            ${PerformanceText}
        </div>
        Sales: ${SalesText}
    </div>
</script>
```

---

## Tooltip Styling

Use tooltip properties for simple styling, and templates for rich tooltip layout.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-tooltipsettings visible="true"
                                   fill='@("#333333")'
                                   format="${Name}: ${SalesText}">
        </e-treemap-tooltipsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Tooltip styling options commonly include:

- `fill` - Tooltip background color.
- `format` - Tooltip text format.
- `template` - Rich HTML tooltip layout.

For border and complex text styling, prefer tooltip templates because they provide predictable HTML and CSS control.

---

## Complete Information Display Example

This example uses labels, tooltip formatting, templates, preformatted fields, and range color mapping.

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
            CreateSalesData("Laptop", "Electronics", 5000, 150000, 35),
            CreateSalesData("Phone", "Electronics", 8000, 200000, 42),
            CreateSalesData("Chair", "Furniture", 3000, 60000, 22),
            CreateSalesData("Desk", "Furniture", 4000, 120000, 28)
        };
    }

    private static SalesData CreateSalesData(string name, string category, double sales, double revenue, double margin)
    {
        return new SalesData
        {
            Name = name,
            Category = category,
            Sales = sales,
            Revenue = revenue,
            Margin = margin,
            SalesText = sales.ToString("N0", CultureInfo.CurrentCulture),
            RevenueText = revenue.ToString("C2", CultureInfo.CurrentCulture),
            MarginText = margin.ToString("N1", CultureInfo.CurrentCulture) + "%",
            CategoryIcon = category == "Electronics" ? "🖥️" : "🪑",
            PerformanceText = sales > 5000 ? "High Performance" : "Standard Performance",
            PerformanceColor = sales > 5000 ? "#4CAF50" : "#F44336"
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Sales { get; set; }
        public double Revenue { get; set; }
        public double Margin { get; set; }
        public string SalesText { get; set; } = string.Empty;
        public string RevenueText { get; set; } = string.Empty;
        public string MarginText { get; set; } = string.Empty;
        public string CategoryIcon { get; set; } = string.Empty;
        public string PerformanceText { get; set; } = string.Empty;
        public string PerformanceColor { get; set; } = string.Empty;
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 rangeColorValuePath="Sales"
                 layoutType="Squarified">

        <e-treemap-leafitemsettings labelPath="Name"
                                    labelTemplate="#labelTemplate"
                                    templatePosition="Center"
                                    showLabels="true"
                                    interSectAction="Trim   label="Low">
                </e-leafitemsettings-colormapping>
                <e-leafitemsettings-colormapping from="4000"
                                                 to="7000"
                                                 color='@("#FDD835")'
                                                 label="Medium">
                </e-leafitemsettings-colormapping>
                <e-leafitemsettings-colormapping from="7000"
                                                 to="10000"
                                                 color='@("#66BB6A")'
                                                 label="High">
                </e-leafitemsettings-colormapping>
            </e-leafitemsettings-colormappings>
        </e-treemap-leafitemsettings>

        <e-treemap-tooltipsettings visible="true"
                                   template="#tooltipTemplate"
                                   fill='@("#333333")'>
        </e-treemap-tooltipsettings>
    </ejs-treemap>
</div>

<script id="labelTemplate" type="text/x-template">
    <div style="text-align: center; padding: 5px;">
        <div style="font-weight: 600; font-size: 12px;">${Name}</div>
        <div style="font-size: 10px;">${SalesText} units</div>
    </div>
</script>

<script id="tooltipTemplate" type="text/x-template">
    <div style="width: 220px; padding: 10px;">
        <strong style="font-size: 14px;">${CategoryIcon} ${Name}</strong>
        <hr style="margin: 5px 0; border: none; border-top: 1px solid #555;" />
        <table style="width: 100%; font-size: 12px;">
            <tr>
                <td>Sales:</td>
                <td style="text-align: right; font-weight: 600;">${SalesText}</td>
            </tr>
            <tr>
                <td>Revenue:</td>
                <td style="text-align: right; font-weight: 600;">${RevenueText}</td>
            </tr>
            <tr>
                <td>Margin:</td>
                <td style="text-align: right; font-weight: 600; color: #4CAF50;">${MarginText}</td>
            </tr>
            <tr>
                <td>Status:</td>
                <td style="text-align: right; font-weight: 600; color: ${PerformanceColor};">${PerformanceText}</td>
            </tr>
        </table>
    </div>
</script>
```

This configuration:

- Shows product name and sales in labels.
- Uses a custom label template for formatted display.
- Trims labels that do not fit.
- Displays detailed information in a rich tooltip.
- Uses preformatted values for currency, numbers, and percentages.
- Uses color mapping to visually distinguish sales ranges.

---

## Common Information Display Patterns

### Pattern 1 Minimal Labels and Rich Tooltips

Hide labels and show details in tooltips.

```cshtml
<e-treemap-leafitemsettings showLabels="false">
</e-treemap-leafitemsettings>

<e-treemap-tooltipsettings visible="true"
                           template="#fullDetailTooltip">
</e-treemap-tooltipsettings>
```

### Pattern 2 Simple Labels and Format Tooltips

Use basic labels with formatted tooltip content.

```cshtml
<e-treemap-leafitemsettings labelPath="Name">
</e-treemap-leafitemsettings>

<e-treemap-tooltipsettings visible="true"
                           format="${Name}: ${SalesText}">
</e-treemap-tooltipsettings>
```

### Pattern 3 Template Labels and Template Tooltips

Use templates for both labels and tooltips.

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            labelTemplate="#labelTemplate">
</e-treemap-leafitemsettings>

<e-treemap-tooltipsettings visible="true"
                           template="#tooltipTemplate">
</e-treemap-tooltipsettings>
```

### Pattern 4 Hide Labels and Enable Tooltips

For dense layouts, hide labels and rely on hover or tap tooltips.

```cshtml
<e-treemap-leafitemsettings showLabels="false"
                            interSectAction="Hideipsettings>
```

---

## Troubleshooting Data Labels and Tooltips

**Issue: Labels are not displayed**

- Verify `labelPath` points to an existing data field.
- Verify `showLabels` is not set to `false`.
- Ensure the TreeMap rectangles are large enough to display labels.
- Use `interSectAction="Trim"` or `interSectAction="WrapByWord"` for long labels.

**Issue: Label format does not show expected values**

- Verify every field used in `labelFormat` exists in the data source.
- Check field casing. `SalesText` and `salestext` are not the same.
- Use preformatted C# fields for currency, percentage, and date values.
- Avoid complex conditional expressions in `labelFormat`.

**Issue: Tooltip is not displayed**

- Verify tooltip settings are configured with `visible="true"`.
- Confirm the TreeMap item has valid data.
- Check browser console for JavaScript errors.
- Ensure Syncfusion scripts are rendered in `_Layout.cshtml`.

```cshtml
<ejs-scripts></ejs-scripts>
```

**Issue: Tooltip template does not render**

- Verify the template ID matches the `template` value.
- Use `script type="text/x-template"`.
- Ensure template fields exist in the data source.
- Avoid invalid HTML inside the template.

**Issue: Hex color values cause Razor compilation errors**

- Use explicit Razor string expressions for hex colors.

```cshtml
fill='@("#333333")'
```

**Issue: Labels overflow rectangles**

- Use `interSectAction="Trim"`.
- Use `interSectAction="WrapByWord"` for readable multi-line labels.
- Use `interSectAction="Hide"` and enable tooltips for dense layouts.
- Keep labels short and move detailed information to tooltips.

---
