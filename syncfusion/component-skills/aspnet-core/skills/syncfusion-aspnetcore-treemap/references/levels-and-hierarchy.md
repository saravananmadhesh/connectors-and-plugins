# Hierarchical Levels and Organization in Syncfusion TreeMap

Complete guide to creating multi-level hierarchies, configuring group spacing, customizing level headers, applying level-specific appearance, and optimizing hierarchical TreeMap rendering in ASP.NET Core Razor Pages.

## Table of Contents
- [Overview](#overview)
- [Group Path Configuration](#group-path-configuration)
  - [What is groupPath](#what-is-grouppath)
  - [Single-Level Grouping](#single-level-grouping)
  - [Understanding groupPath Matching](#understanding-grouppath-matching)
- [Group Gaps and Spacing](#group-gaps-and-spacing)
  - [Group Gap](#group-gap)
  - [Group Padding](#group-padding)
- [Header Customization](#header-customization)
  - [Header Format and Alignment](#header-format-and-alignment)
  - [Custom Header Format](#custom-header-format)
  - [Header Alignment](#header-alignment)
- [Header Styling and Formatting](#header-styling-and-formatting)
  - [Header Height and Style](#header-height-and-style)
  - [Header Style Properties](#header-style-properties)
- [Header Templates](#header-templates)
  - [Basic Header Template](#basic-header-template)
  - [Header Template with Multiple Fields](#header-template-with-multiple-fields)
  - [Template Position](#template-position)
  - [Position Options](#position-options)
- [Multi-Level Hierarchies](#multi-level-hierarchies)
  - [Two-Level Hierarchy Example](#two-level-hierarchy-example)
  - [Three-Level Hierarchy Example](#three-level-hierarchy-example)
  - [Practical Hierarchy Depth](#practical-hierarchy-depth)
- [Color Coding Hierarchy Levels](#color-coding-hierarchy-levels)
- [Level-Specific Appearance](#level-specific-appearance)
  - [Per-Level Border Configuration](#per-level-border-configuration)
  - [Per-Level Opacity](#per-level-opacity)
- [Performance Optimization for Hierarchies](#performance-optimization-for-hierarchies)
  - [Data Pre-aggregation](#data-pre-aggregation)
  - [Limiting Hierarchy Depth](#limiting-hierarchy-depth)
- [Common Hierarchy Patterns](#common-hierarchy-patterns)
  - [Pattern 1 Organization Chart](#pattern-1-organization-chart)
  - [Pattern 2 Geographic Hierarchy](#pattern-2-geographic-hierarchy)
  - [Pattern 3 Product Hierarchy](#pattern-3-product-hierarchy)
  - [Pattern 4 Time-Based Hierarchy](#pattern-4-time-based-hierarchy)
- [Troubleshooting Hierarchical Levels](#troubleshooting-hierarchical-levels)

---

## Overview

The TreeMap `levels` collection defines hierarchical grouping by using one or more `groupPath` fields. Each configured level groups the flat data source into nested visual rectangles.

Without `levels`, TreeMap treats the data as a flat collection and renders each data item as a leaf item.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}">
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="City">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Common hierarchy-related settings include:

- `groupPath` - Field used to group data at a level.
- `headerFormat` - Header text format for a group.
- `headerHeight` - Height of the group header.
- `headerAlignment` - Alignment of group header text.
- `groupGap` - Space between items inside a group.
- `groupPadding` - Inner spacing inside a group container.
- `fill` - Fill color for group level.
- `opacity` - Opacity for group level.
- `border` - Border around group level.

---

## Group Path Configuration

### What is groupPath

The `groupPath` property specifies the data field used to create a hierarchy level. All items with the same `groupPath` value are grouped into one parent rectangle.

For example, this level groups all records by the `Category` field:

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}">
</e-treemap-level>
```

If the data contains `Electronics` and `Furniture` categories, the TreeMap creates two parent group rectangles:

- Electronics
- Furniture

### Single-Level Grouping

Define grouped data in `Index.cshtml.cs`.

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
            new SalesData { Category = "Electronics", Product = "Laptop", Sales = 5000 },
            new SalesData { Category = "Electronics", Product = "Phone", Sales = 8000 },
            new SalesData { Category = "Furniture", Product = "Chair", Sales = 3000 },
            new SalesData { Category = "Furniture", Product = "Desk", Sales = 4000 }
        };
    }

    public class SalesData
    {
        public string Category { get; set; } = string.Empty;
        public string Product { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

Configure the TreeMap in `Index.cshtml`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             fill='@("#336699")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Result:

- `Electronics` becomes one group.
- `Furniture` becomes one group.
- `Laptop`, `Phone`, `Chair`, and `Desk` are rendered as leaf items inside their respective category groups.

### Understanding groupPath Matching

For each unique value in a `groupPath` field:

1. TreeMap collects all matching records.
2. A parent group rectangle is created.
3. Child items are arranged inside the group rectangle.
4. The group size is based on the total of the child `weightValuePath` values.

Example data:

```text
Electronics / Laptop / 5000
Electronics / Phone / 8000
Furniture / Chair / 3000
```

Grouped result:

```text
Electronics total = 13000
Furniture total = 3000
```

Important rules:

- `groupPath` must match a real data field.
- Field names are case-sensitive.
- Empty group values can lead to unexpected grouping.
- Group fields should be available in every record.
- Leaf labels should be configured through `leafItemSettings`.

---

## Group Gaps and Spacing

### Group Gap

The `groupGap` property adds spacing between items inside a group.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             groupGap="5">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Common values:

- `groupGap="0"` - No spacing.
- `groupGap="5"` - Moderate spacing.
- `groupGap="10"` - Strong visual separation.

Use `groupGap` when sibling items need clearer separation inside each group.

### Group Padding

The `groupPadding` property adds internal spacing between the group boundary and the child items.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             groupPadding="10">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Common values:

- `groupPadding="5"` - Small internal spacing.
- `groupPadding="10"` - Clear internal spacing.
- `groupPadding="15"` - Larger container spacing.

Use `groupPadding` when group contents appear too close to group boundaries or headers.

---

## Header Customization

### Header Format and Alignment

Each TreeMap group can display a header. Use `headerFormat` to control the header text and `headerAlignment` to control its alignment.

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}"
                 headerAlignment="Center">
</e-treemap-level>
```

### Custom Header Format

Use `headerFormat` to display custom text.

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="Category: ${Category}">
</e-treemap-level>
```

Example output:

```text
Category: Electronics
Category: Furniture
```

For values such as totals or formatted text, prepare those fields in the model when possible.

```csharp
public class SalesData
{
    public string Category { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public double Sales { get; set; }
    public string CategoryLabel { get; set; } = string.Empty;
}
```

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}">
</e-treemap-level>
```

### Header Alignment

Use `headerAlignment` to control header text alignment.

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}"
                 headerAlignment="Center">
</e-treemap-level>
```

Common alignment values:

- `Near` - Aligns near the start edge.
- `Center` - Aligns to center.
- `Far` - Aligns near the end edge.

For RTL layouts, `Near` and `Far` follow the layout direction.

---

## Header Styling and Formatting

### Header Height and Style

Use `headerHeight` to allocate vertical space for the header.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             headerHeight="30">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Use a larger `headerHeight` when:

- Header text is long.
- Header font size is larger.
- Header template contains multiple rows.
- Group headers need strong visual separation.

### Header Style Properties

Use nested header style settings to customize group header text.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             headerHeight="30"
                             fill='@("#336699")'>
                <e-level-headerstyle color='@("#FFFFFF")'
                                     fontSize="16px"
                                     fontWeight="600"
                                     fontOpacity="1">
                </e-level-headerstyle>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Header style properties commonly include:

- `color` - Header text color.
- `fontSize` - Header text size.
- `fontWeight` - Header text weight.
- `fontOpacity` - Header text opacity.

---

## Header Templates

Use header templates when a group header requires custom HTML layout.

### Basic Header Template

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerTemplate="#headerTemplate"
                             templatePosition="TopLeft">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script id="headerTemplate" type="text/x-template">
    <div style="padding: 5px; background: #336699; color: white; font-weight: 600;">
        <span>${Category}</span>
    </div>
</script>
```

### Header Template with Multiple Fields

For stable output, prepare additional header fields in the model if needed.

```cshtml
<script id="headerTemplate" type="text/x-template">
    <div style="padding: 8px; background: linear-gradient(to right, #336699, #0066CC); color: white;">
        <strong>${Category}</strong>
        <br />
        <small>${CategoryNote}</small>
    </div>
</script>
```

Example model fields:

```csharp
public class SalesData
{
    public string Category { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public double Sales { get; set; }
    public string CategoryNote { get; set; } = string.Empty;
}
```

### Template Position

Use `templatePosition` to position the header template.

```cshtml
<e-treemap-level groupPath="Category"
                 headerTemplate="#headerTemplate"
                 templatePosition="Center">
</e-treemap-level>
```

### Position Options

Common template positions:

- `TopLeft`
- `TopCenter`
- `TopRight`
- `Center`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

Use `Center` for compact headers and `TopLeft` for dashboard-style grouped sections.

---

## Multi-Level Hierarchies

### Two-Level Hierarchy Example

Define data in `Index.cshtml.cs`.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<CountryData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<CountryData>
        {
            new CountryData { Continent = "Asia", Country = "India", Population = 1400000000 },
            new CountryData { Continent = "Asia", Country = "China", Population = 1425000000 },
            new CountryData { Continent = "Europe", Country = "Germany", Population = 84000000 },
            new CountryData { Continent = "Europe", Country = "France", Population = 67000000 }
        };
    }

    public class CountryData
    {
        public string Continent { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public long Population { get; set; }
    }
}
```

Configure two hierarchy levels in `Index.cshtml`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}"
                             headerHeight="25"
                             fill='@("#336699")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Country">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Result:

- `Continent` is the parent group.
- `Country` is the leaf item label.
- `Population` determines rectangle size.

### Three-Level Hierarchy Example

Define data in `Index.cshtml.cs`.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<RegionData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<RegionData>
        {
            new RegionData { Continent = "Asia", Country = "India", Region = "North", Population = 500000000 },
            new RegionData { Continent = "Asia", Country = "India", Region = "South", Population = 300000000 },
            new RegionData { Continent = "Asia", Country = "China", Region = "East", Population = 800000000 },
            new RegionData { Continent = "Asia", Country = "China", Region = "West", Population = 400000000 },
            new RegionData { Continent = "Europe", Country = "Germany", Region = "East", Population = 60000000 },
            new RegionData { Continent = "Europe", Country = "Germany", Region = "West", Population = 40000000 }
        };
    }

    public class RegionData
    {
        public string Continent { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public long Population { get; set; }
    }
}
```

Configure grouped levels and leaf labels.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="Continent: ${Continent}"
                             fill='@("#336699")'>
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="Country: ${Country}"
                             fill='@("#0066CC")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Result:

- `Continent` is the first group level.
- `Country` is the second group level.
- `Region` is displayed as the leaf label.
- `Population` determines item sizing.

### Practical Hierarchy Depth

TreeMap can represent multiple grouped levels, but readability decreases as the hierarchy becomes too deep.

Recommended guidance:

- Use 1 to 3 grouping levels for most dashboards.
- Avoid more than 4 to 5 visual levels unless the data is sparse.
- Use drill-down for deeper exploration.
- Aggregate data before binding when the hierarchy is large.
- Keep leaf labels short.

Example structure:

```cshtml
<e-treemap-levels>
    <e-treemap-level groupPath="Level1">
    </e-treemap-level>
    <e-treemap-level groupPath="Level2">
    </e-treemap-level>
    <e-treemap-level groupPath="Level3">
    </e-treemap-level>
</e-treemap-levels>
```

---

## Color Coding Hierarchy Levels

Use `fill` on each level to visually distinguish hierarchy groups.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}"
                             fill='@("#FF6B6B")'>
            </e-treemap-level>
            <e-treemap-level groupPath="SubCategory"
                             headerFormat="${SubCategory}"
                             fill='@("#4ECDC4")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Use level colors when:

- Parent groups need stronger visual identity.
- You want users to distinguish hierarchy depth quickly.
- Different hierarchy levels represent different semantic layers.

---

## Level-Specific Appearance

### Per-Level Border Configuration

Use nested border settings inside each level.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Category"
                             headerFormat="${Category}">
                <e-level-border color='@("#CCCCCC")'
                                width="2">
                </e-level-border>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Use borders to clearly separate parent groups.

### Per-Level Opacity

Use `opacity` to soften the appearance of a hierarchy level.

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}"
                 fill='@("#336699")'
                 opacity="0.8">
</e-treemap-level>
```

Lower opacity can make parent groups appear as visual containers while keeping leaf items prominent.

---

## Performance Optimization for Hierarchies

### Data Pre-aggregation

For large datasets, aggregate data server-side before binding to the TreeMap. This reduces the number of rendered items and improves readability.

```csharp
var hierarchicalData = data
    .GroupBy(item => new
    {
        item.Category,
        item.Product
    })
    .Select(group => new SalesData
    {
        Category = group.Key.Category,
        Product = group.Key.Product,
        Sales = group.Sum(item => item.Sales)
    })
    .ToList();
```

Example model:

```csharp
public class SalesData
{
    public string Category { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public double Sales { get; set; }
}
```

### Limiting Hierarchy Depth

Avoid deeply nested hierarchies when possible.

Deep hierarchies can affect:

- Rendering performance
- Label readability
- Group header readability
- Drill-down clarity
- User navigation experience

Recommended practices:

- Prefer summary levels first.
- Use drill-down for deeper exploration.
- Aggregate low-value or small categories.
- Avoid rendering transaction-level records directly.
- Keep hierarchy depth within practical dashboard limits.

---

## Common Hierarchy Patterns

### Pattern 1 Organization Chart

Use grouping fields such as:

```text
Company -> Department -> Team -> Employee
```

Example configuration:

```cshtml
<e-treemap-levels>
    <e-treemap-level groupPath="Company"
                     headerFormat="${Company}">
    </e-treemap-level>
    <e-treemap-level groupPath="Department"
                     headerFormat="${Department}">
    </e-treemap-level>
    <e-treemap-level groupPath="Team"
                     headerFormat="${Team}">
    </e-treemap-level>
</e-treemap-levels>
```

Use `Employee` as the leaf label when individual employees are the final visual items.

### Pattern 2 Geographic Hierarchy

Use grouping fields such as:

```text
Region -> Country -> State -> City
```

Example configuration:

```cshtml
<e-treemap-levels>
    <e-treemap-level groupPath="Region"
                     headerFormat="${Region}">
    </e-treemap-level>
    <e-treemap-level groupPath="Country"
                     headerFormat="${Country}">
    </e-treemap-level>
    <e-treemap-level groupPath="State"
                     headerFormat="${State}">
    </e-treemap-level>
</e-treemap-levels>

<e-treemap-leafitemsettings labelPath="City">
</e-treemap-leafitemsettings>
```

### Pattern 3 Product Hierarchy

Use grouping fields such as:

```text
Category -> Subcategory -> Product -> SKU
```

Example configuration:

```cshtml
<e-treemap-levels>
    <e-treemap-level groupPath="Category"
                     headerFormat="${Category}">
    </e-treemap-level>
    <e-treemap-level groupPath="SubCategory"
                     headerFormat="${SubCategory}">
    </e-treemap-level>
    <e-treemap-level groupPath="Product"
                     headerFormat="${Product}">
    </e-treemap-level>
</e-treemap-levels>

<e-treemap-leafitemsettings labelPath="Sku">
</e-treemap-leafitemsettings>
```

### Pattern 4 Time-Based Hierarchy

Use grouping fields such as:

```text
Year -> Quarter -> Month -> Day
```

Example configuration:

```cshtml
<e-treemap-levels>
    <e-treemap-level groupPath="Year"
                     headerFormat="${Year}">
    </e-treemap-level>
    <e-treemap-level groupPath="Quarter"
                     headerFormat="${Quarter}">
    </e-treemap-level>
    <e-treemap-level groupPath="Month"
                     headerFormat="${Month}">
    </e-treemap-level>
</e-treemap-levels>

<e-treemap-leafitemsettings labelPath="Day">
</e-treemap-leafitemsettings>
```

Use time-based hierarchy when comparing values across calendar dimensions.

---

## Troubleshooting Hierarchical Levels

**Issue: Groups are not created**

- Verify `groupPath` matches a real data field.
- Check field casing exactly.
- Ensure the grouped field contains non-empty values.
- Confirm `dataSource` is not empty.

**Issue: Leaf labels are not displayed**

- Configure `labelPath` in `leafItemSettings`.
- Ensure the label field exists in each data item.
- Use `interSectAction="Trim"` if labels overflow.

```cshtml
Trim
</e-treemap-leafitemsettings>
```

**Issue: Header text is missing or incorrect**

- Set `headerFormat` on each grouped level.
- Ensure placeholders match actual data fields.
- Avoid using fields that are not available in the grouped data context.

```cshtml
<e-treemap-level groupPath="Category"
                 headerFormat="${Category}">
</e-treemap-level>
```

**Issue: Hex color values cause Razor compilation errors**

- Use explicit Razor string expressions for hex colors.

```cshtml
fill='@("#336699")'
```

**Issue: Borders do not apply**

- Use the nested level border tag.

```cshtml
<e-level-border color='@("#CCCCCC")'
                width="2">
</e-level-border>
```

**Issue: Hierarchy looks too crowded**

- Reduce hierarchy depth.
- Increase `headerHeight`.
- Use `groupGap` or `groupPadding`.
- Aggregate data server-side.
- Use drill-down for deeper navigation instead of showing all levels at once.

**Issue: TreeMap is not visible**

- Ensure the TreeMap container has visible height.
- Ensure `weightValuePath` points to a numeric field.
- Ensure Syncfusion scripts are rendered through `<ejs-scripts></ejs-scripts>`.

```cshtml
<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales">
    </ejs-treemap>
</div>
```

---
