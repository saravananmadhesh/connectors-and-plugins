# Color Mapping Strategies in Syncfusion TreeMap

Complete guide to all color mapping techniques for visualizing data ranges, categories, opacity-based intensity, predefined palettes, and data-bound custom colors in Syncfusion TreeMap for ASP.NET Core.

## Table of Contents
- [Overview](#overview)
- [Range Color Mapping](#range-color-mapping)
  - [Range Mapping Purpose](#range-mapping-purpose)
  - [Range Mapping Basic Implementation](#range-mapping-basic-implementation)
  - [Range Color Example](#range-color-example)
  - [Handling Out-of-Range Values](#handling-out-of-range-values)
  - [Multiple Range Sets](#multiple-range-sets)
- [Equal Color Mapping](#equal-color-mapping)
  - [Equal Mapping Purpose](#equal-mapping-purpose)
  - [Equal Mapping Basic Implementation](#equal-mapping-basic-implementation)
  - [Equal Color Example](#equal-color-example)
  - [Categorical Colors with Default](#categorical-colors-with-default)
- [Desaturation Color Mapping](#desaturation-color-mapping)
  - [Desaturation Mapping Purpose](#desaturation-mapping-purpose)
  - [Desaturation Mapping Basic Implementation](#desaturation-mapping-basic-implementation)
  - [Desaturation Example](#desaturation-example)
- [Palette Color Mapping](#palette-color-mapping)
  - [Palette Mapping Purpose](#palette-mapping-purpose)
  - [Palette Mapping Basic Implementation](#palette-mapping-basic-implementation)
  - [Palette Cycling](#palette-cycling)
- [Direct Color Binding](#direct-color-binding)
  - [Direct Binding Purpose](#direct-binding-purpose)
  - [Direct Binding Basic Implementation](#direct-binding-basic-implementation)
- [Choosing Your Color Mapping Strategy](#choosing-your-color-mapping-strategy)
  - [Decision Matrix](#decision-matrix)
  - [Selection Logic](#selection-logic)
- [Advanced Color Mapping Patterns](#advanced-color-mapping-patterns)
  - [Pattern 1 Sales Performance Dashboard](#pattern-1-sales-performance-dashboard)
  - [Pattern 2 Department Tracking](#pattern-2-department-tracking)
  - [Pattern 3 Heatmap Visualization](#pattern-3-heatmap-visualization)
  - [Pattern 4 Multi-Color Gradient](#pattern-4-multi-color-gradient)
- [Color Mapping with Hierarchies](#color-mapping-with-hierarchies)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting Color Mapping](#troubleshooting-color-mapping)

---

## Overview

Color mapping applies colors to TreeMap leaf items based on data values. It helps users quickly identify value ranges, categories, intensity, and custom business-defined visual states.

Primary color mapping techniques:

1. **Range mapping** - Applies colors based on continuous numeric ranges.
2. **Equal mapping** - Applies colors based on exact categorical values.
3. **Desaturation mapping** - Applies opacity variation based on numeric values.
4. **Palette mapping** - Applies colors from a predefined color collection.
5. **Direct color binding** - Applies colors directly from a color field in the data source.

---

## Range Color Mapping

### Range Mapping Purpose

Range color mapping applies colors based on numeric value ranges. Items with values within a configured range receive that range color.

**Best for:**

- Sales, revenue, profit, or score ranges
- Intensity visualization such as density or performance
- Continuous numeric values that need visual grouping

### Range Mapping Basic Implementation

Use `rangeColorValuePath` on the TreeMap and define color mappings inside `leafItemSettings`.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             rangeColorValuePath="Sales"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0"
                                             to="5000"
                                             color='@("#66BB6A")'
                                             label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="5000"
                                             to="10000"
                                             color='@("#FDD835")'
                                             label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="10000"
                                             to="15000"
                                             color='@("#EF5350")'
                                             label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

**Property definitions:**

- `rangeColorValuePath="Sales"` - Specifies the numeric field used for color range calculation.
- `from` - Specifies the lower boundary of the range.
- `to` - Specifies the upper boundary of the range.
- `color` - Specifies the color applied to items within the range.
- `label` - Specifies the legend label for the range.

### Range Color Example

With data:

```csharp
new List<SalesData>
{
    new SalesData { Name = "A", Sales = 2000 },
    new SalesData { Name = "B", Sales = 7000 },
    new SalesData { Name = "C", Sales = 12000 }
}
```

Result:

- Item A with `Sales = 2000` uses green because it is in the `0` to `5000` range.
- Item B with `Sales = 7000` uses yellow because it is in the `5000` to `10000` range.
- Item C with `Sales = 12000` uses red because it is in the `10000` to `15000` range.

### Handling Out-of-Range Values

Values outside configured ranges may not receive the expected mapped color. Add a fallback color mapping without `from`, `to`, or `value` for unmapped values.

```cshtml
<e-treemap-leafitemsettings labelPath="Name">
    <e-leafitemsettings-colormappings>
        <e-leafitemsettings-colormapping from="0"
                                         to="5000"
                                         color='@("#66BB6A")'
                                         label="Low">
        </e-leafitemsettings-colormapping>
        <e-leafitemsettings-colormapping from="5000"
                                         to="10000"
                                         color='@("#FDD835")'
                                         label="Medium">
        </e-leafitemsettings-colormapping>
        <e-leafitemsettings-colormapping color='@("#999999")'
                                         label="Others">
        </e-leafitemsettings-colormapping>
    </e-leafitemsettings-colormappings>
</e-treemap-leafitemsettings>
```

### Multiple Range Sets

Create a traffic-light visualization with three value ranges.

```cshtml
<e-treemap-leafitemsettings labelPath="Name">
    <e-leafitemsettings-colormappings>
        <e-leafitemsettings-colormapping from="0"
                                         to="33"
                                         color='@("#FF6B6B")'
                                         label="Low">
        </e-leafitemsettings-colormapping>
        <e-leafitemsettings-colormapping from="33"
                                         to="66"
                                         color='@("#FFD93D")'
                                         label="Medium">
        </e-leafitemsettings-colormapping>
        <e-leafitemsettings-colormapping from="66"
                                         to="100"
                                         color='@("#6BCB77")'
                                         label="High">
        </e-leafitemsettings-colormapping>
    </e-leafitemsettings-colormappings>
</e-treemap-leafitemsettings>
```

---

## Equal Color Mapping

### Equal Mapping Purpose

Equal color mapping assigns colors by matching exact values from a data field. All items with the same matching value receive the same color.

**Best for:**

- Departments
- Regions
- Product categories
- Status values such as Approved, Pending, or Rejected

### Equal Mapping Basic Implementation

Use `equalColorValuePath` on the TreeMap and define value-based color mappings inside `leafItemSettings`.

```cshtml
@page
@model IndexModel

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
            <e-leafitemsettings-colormapping value="Clothing"
                                             color='@("#4ECDC4")'
                                             label="Clothing">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

**Property definitions:**

- `equalColorValuePath="Category"` - Specifies the field used for exact value matching.
- `value` - Specifies the category value to match.
- `color` - Specifies the color applied to matching items.

### Equal Color Example

With data:

```csharp
new List<SalesData>
{
    new SalesData { Name = "Laptop", Category = "Electronics", Sales = 5000 },
    new SalesData { Name = "Phone", Category = "Electronics", Sales = 8000 },
    new SalesData { Name = "Chair", Category = "Furniture", Sales = 3000 },
    new SalesData { Name = "Desk", Category = "Furniture", Sales = 4000 }
}
```

Result:

- All `Electronics` items use blue.
- All `Furniture` items use red.

### Categorical Colors with Default

Add a fallback mapping for values that do not match any configured category.

```cshtml
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
        <e-leafitemsettings-colormapping color='@("#CCCCCC")'
                                         label="Others">
        </e-leafitemsettings-colormapping>
    </e-leafitemsettings-colormappings>
</e-treemap-leafitemsettings>
```

---

## Desaturation Color Mapping

### Desaturation Mapping Purpose

Desaturation color mapping varies opacity based on numeric values. This creates a light-to-dark or transparent-to-opaque effect while using the same base color.

**Best for:**

- Intensity representation
- Heatmap-style visualizations
- Showing progression without changing hue

### Desaturation Mapping Basic Implementation

Use `minOpacity` and `maxOpacity` with a range mapping.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             rangeColorValuePath="Sales"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0"
                                             to="15000"
                                             color='@("#336699")'
                                             minOpacity="0.2"
                                             maxOpacity="1">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

**Property definitions:**

- `color` - Specifies the base color.
- `minOpacity` - Specifies opacity at the lower boundary.
- `maxOpacity` - Specifies opacity at the upper boundary.

### Desaturation Example

With range `0` to `15000`, `minOpacity="0.2"`, and `maxOpacity="1"`:

- Value `0` appears very light.
- Value `7500` appears medium opacity.
- Value `15000` appears fully opaque.

---

## Palette Color Mapping

### Palette Mapping Purpose

Palette mapping applies colors from a predefined color collection. It is useful when you need simple item differentiation without value-based color rules.

**Best for:**

- Simple visual differentiation
- Limited item sets
- Complementary or branded color schemes

### Palette Mapping Basic Implementation

Define the palette in the PageModel.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public List<string> TreeMapPalette { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<SalesData>
        {
            new SalesData { Name = "Laptop", Sales = 5000 },
            new SalesData { Name = "Phone", Sales = 8000 },
            new SalesData { Name = "Chair", Sales = 3000 }
        };

        TreeMapPalette = new List<string>
        {
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#FFA07A",
            "#98D8C8"
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

Bind the palette to the TreeMap.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             palette="Model.TreeMapPalette"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Palette Cycling

If the number of items is greater than the number of palette colors, the palette colors repeat.

Example with five colors and twelve items:

```text
Items 1-5   -> Colors 1-5
Items 6-10  -> Colors 1-5 again
Items 11-12 -> Colors 1-2 again
```

---

## Direct Color Binding

### Direct Binding Purpose

Direct color binding uses a color field from the data source. Each item receives the color specified in its own data record.

**Best for:**

- Precomputed colors
- Business-defined color logic
- Data-driven theme rules

### Direct Binding Basic Implementation

Define a color field in the data model.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<ProductData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<ProductData>
        {
            new ProductData { Name = "Laptop", Sales = 5000, ItemColor = "#336699" },
            new ProductData { Name = "Phone", Sales = 8000, ItemColor = "#FF6B6B" },
            new ProductData { Name = "Chair", Sales = 3000, ItemColor = "#4ECDC4" }
        };
    }

    public class ProductData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
        public string ItemColor { get; set; } = string.Empty;
    }
}
```

Bind the color field through `colorValuePath`.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                colorValuePath="ItemColor">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

---

## Choosing Your Color Mapping Strategy

### Decision Matrix

| Strategy | Best For | Complexity | Examples |
|---|---|---:|---|
| Range | Continuous numeric values | Medium | Sales, revenue, scores |
| Equal | Discrete categories | Low | Departments, regions, status |
| Desaturation | Intensity or progression | Low-Medium | Heatmaps, trends |
| Palette | Simple differentiation | Very Low | Small item collections |
| Direct Binding | Precomputed colors | Low | Colors from business rules |

### Selection Logic

Use this logic in your application layer when deciding which TreeMap configuration to apply.

```csharp
string colorStrategy = "range";

if (data.Any(item => !string.IsNullOrEmpty(item.Category)))
{
    colorStrategy = "equal";
}

if (isSimpleList && data.Count < 10)
{
    colorStrategy = "palette";
}

if (data.Any(item => !string.IsNullOrEmpty(item.PrecomputedColor)))
{
    colorStrategy = "direct";
}
```

---

## Advanced Color Mapping Patterns

### Pattern 1 Sales Performance Dashboard

Range-based coloring from red for low performance to green for high performance.

```cshtml
<e-leafitemsettings-colormappings>
    <e-leafitemsettings-colormapping from="0"
                                     to="3000"
                                     color='@("#EF5350")'
                                     label="Poor">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="3000"
                                     to="7000"
                                     color='@("#FFD93D")'
                                     label="Average">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="7000"
                                     to="15000"
                                     color='@("#6BCB77")'
                                     label="Excellent">
    </e-leafitemsettings-colormapping>
</e-leafitemsettings-colormappings>
```

### Pattern 2 Department Tracking

Equal-based coloring for departments.

```cshtml
<e-leafitemsettings-colormappings>
    <e-leafitemsettings-colormapping value="Engineering"
                                     color='@("#336699")'
                                     label="Engineering">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping value="Sales"
                                     color='@("#FF6B6B")'
                                     label="Sales">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping value="Marketing"
                                     color='@("#4ECDC4")'
                                     label="Marketing">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping value="HR"
                                     color='@("#FFD93D")'
                                     label="HR">
    </e-leafitemsettings-colormapping>
</e-leafitemsettings-colormappings>
```

### Pattern 3 Heatmap Visualization

Use opacity-based range color mapping for heatmap-like intensity.

```cshtml
<e-leafitemsettings-colormappings>
    <e-leafitemsettings-colormapping from="0"
                                     to="100"
                                     color='@("#336699")'
                                     minOpacity="0.1"
                                     maxOpacity="1">
    </e-leafitemsettings-colormapping>
</e-leafitemsettings-colormappings>
```

### Pattern 4 Multi-Color Gradient

Use multiple ranges to create a stepped gradient.

```cshtml
<e-leafitemsettings-colormappings>
    <e-leafitemsettings-colormapping from="0" to="1000" color='@("#0D47A1")'>
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="1000" to="2000" color='@("#1565C0")'>
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="2000" to="3000" color='@("#1976D2")'>
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="3000" to="4000" color='@("#1E88E5")'>
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="4000" to="5000" color='@("#2196F3")'>
    </e-leafitemsettings-colormapping>
</e-leafitemsettings-colormappings>
```

---

## Color Mapping with Hierarchies

In grouped TreeMaps, color mapping is commonly applied to leaf items, while group levels can use their own fill configuration.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             rangeColorValuePath="Sales"
             layoutType="Squarified">
    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         fill='@("#CCCCCC")'>
        </e-treemap-level>
    </e-treemap-levels>

    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0"
                                             to="5000"
                                             color='@("#66BB6A")'
                                             label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="5000"
                                             to="10000"
                                             color='@("#FDD835")'
                                             label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="10000"
                                             to="15000"
                                             color='@("#EF5350")'
                                             label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

Category groups use the configured group fill, while leaf items are colored based on the sales range.

---

## Performance Considerations

- **Range mapping** performs numeric range checks and is suitable for typical TreeMap datasets.
- **Equal mapping** is efficient for category-based color assignment.
- **Desaturation mapping** is lightweight and useful for intensity visualization.
- **Palette mapping** is simple and suitable for small-to-medium item collections.
- **Direct binding** is efficient because the color is already available in the data source.
- For very large datasets, aggregate or filter data before binding to the TreeMap.
- Avoid heavy label templates when rendering many leaf items.

---

## Troubleshooting Color Mapping

**Issue: Items are not coloring**

- Verify that `rangeColorValuePath` or `equalColorValuePath` matches an existing data field.
- Verify that `weightValuePath` points to a numeric field.
- Verify that range values match the actual data values.
- Ensure color values are valid CSS color names or valid hex values.

**Issue: Hex colors cause Razor compilation errors**

- Pass hex colors as explicit Razor string expressions in ASP.NET Core TagHelpers.

```cshtml
color='@("#66BB6A")'
```

**Issue: Unexpected colors are displayed**

- Verify that range boundaries do not overlap unintentionally.
- Verify that `from` is less than `to`.
- Verify that range mapping uses numeric data.
- Verify that equal mapping values exactly match the data values.

**Issue: Equal color mapping is not applied**

- Ensure `equalColorValuePath` is configured on the TreeMap.
- Ensure each mapping uses the correct `value`.
- Ensure data values match the configured `value` exactly, including casing and spacing.

**Issue: Palette colors are not showing**

- Verify that the palette collection is initialized before the TreeMap renders.
- Verify that the palette property is bound to the correct model property.
- Ensure palette colors are valid CSS color values.

**Issue: Direct color binding is not applied**

- Verify that `colorValuePath` is configured in `leafItemSettings`.
- Verify that each data item contains the configured color field.
- Ensure the color field contains valid CSS color values.

---