# TreeMap Layouts and Rendering

Guide to layout types, rendering directions, right-to-left support, layout selection, and performance-oriented layout patterns in Syncfusion TreeMap for ASP.NET Core Razor Pages.

## Table of Contents
- [Overview](#overview)
- [Layout Types](#layout-types)
  - [Squarified Layout Default](#squarified-layout-default)
  - [SliceAndDiceVertical Layout](#sliceanddicevertical-layout)
  - [SliceAndDiceHorizontal Layout](#sliceanddicehorizontal-layout)
  - [SliceAndDiceAuto Layout](#sliceanddiceauto-layout)
- [Choosing the Right Layout](#choosing-the-right-layout)
  - [Decision Matrix](#decision-matrix)
  - [Layout Selection Logic](#layout-selection-logic)
- [Right-to-Left RTL Support](#right-to-left-rtl-support)
  - [Enabling RTL](#enabling-rtl)
  - [RTL Components](#rtl-components)
  - [RTL with Legend](#rtl-with-legend)
  - [RTL with Tooltips](#rtl-with-tooltips)
- [Rendering Directions](#rendering-directions)
  - [Direction Options](#direction-options)
  - [Implementation Examples](#implementation-examples)
  - [When to Use Render Directions](#when-to-use-render-directions)
- [Combining Layout with RTL](#combining-layout-with-rtl)
- [Layout Performance Considerations](#layout-performance-considerations)
- [Common Layout Patterns](#common-layout-patterns)
  - [Pattern Responsive Dashboard](#pattern-responsive-dashboard)
  - [Pattern Localized Application](#pattern-localized-application)
  - [Pattern Performance-Optimized](#pattern-performance-optimized)
- [Troubleshooting Layout and Rendering](#troubleshooting-layout-and-rendering)

---

## Overview

The TreeMap `layoutType` property controls how rectangles are arranged inside the available TreeMap area. Different layout types are useful for different visualization goals, such as balanced rectangle shapes, ordered item rendering, responsive containers, and localized right-to-left layouts.

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

Common layout types include:

1. **Squarified** - Balanced aspect ratios and the default choice for most dashboards.
2. **SliceAndDiceVertical** - Vertical slicing pattern.
3. **SliceAndDiceHorizontal** - Horizontal slicing pattern.
4. **SliceAndDiceAuto** - Automatically chooses slicing direction based on available space.

---

## Layout Types

### Squarified Layout Default

The `Squarified` layout arranges TreeMap items to maintain balanced rectangle aspect ratios. It is the recommended starting point for most use cases.

**When to use:**

- General-purpose TreeMap visualization.
- Dashboards where visual balance is important.
- Datasets with varying numeric values.
- Presentations where readability and compactness matter.

**Implementation:**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 layoutType="Squarified"
                 weightValuePath="Sales">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**Characteristics:**

- Creates visually balanced rectangles.
- Reduces extreme tall or wide item shapes.
- Works well for mixed-value datasets.
- Good default for most TreeMap dashboards.

---

### SliceAndDiceVertical Layout

The `SliceAndDiceVertical` layout arranges rectangles using a vertical slicing pattern.

**When to use:**

- Sequential or ordered datasets.
- Vertical dashboard panels.
- Layouts where item ordering should remain visually straightforward.
- Hierarchical datasets with many items.

**Implementation:**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 layoutType="SliceAndDiceVertical"
                 weightValuePath="Sales">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**Characteristics:**

- Uses vertical slicing.
- Produces vertical item divisions.
- Useful for ordered comparisons.
- Typically simpler and faster than aspect-ratio optimization.

---

### SliceAndDiceHorizontal Layout

The `SliceAndDiceHorizontal` layout arranges rectangles using a horizontal slicing pattern.

**When to use:**

- Wide dashboard layouts.
- Row-like comparison views.
- Sequential or ordered data in horizontal space.
- Category comparisons where horizontal grouping is easier to scan.

**Implementation:**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 layoutType="SliceAndDiceHorizontal"
                 weightValuePath="Sales">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**Characteristics:**

- Uses horizontal slicing.
- Produces row-like divisions.
- Works well in wide containers.
- Useful for side-by-side comparison patterns.

---

### SliceAndDiceAuto Layout

The `SliceAndDiceAuto` layout automatically chooses slicing direction based on available width and height.

**When to use:**

- Responsive dashboards.
- Resizable widgets.
- Layouts that must adapt to different screen sizes.
- Dynamic containers where width and height can change.

**Implementation:**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 layoutType="SliceAndDiceAuto"
                 weightValuePath="Sales">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**Characteristics:**

- Automatically chooses a suitable slice direction.
- Useful for responsive layouts.
- Maintains a simple slicing approach.
- Adapts better than fixed horizontal or vertical slicing in dynamic containers.

---

## Choosing the Right Layout

### Decision Matrix

| Use Case | Recommended Layout | Reason |
|---|---|---|
| General dashboards | Squarified | Balanced rectangle shapes |
| Mixed-value data | Squarified | Better aspect ratio handling |
| Ordered data | SliceAndDiceVertical or SliceAndDiceHorizontal | Easier sequential reading |
| Wide panels | SliceAndDiceHorizontal | Fits horizontal layouts |
| Tall panels | SliceAndDiceVertical | Fits vertical layouts |
| Responsive widgets | SliceAndDiceAuto | Adapts to available space |
| Large item count | SliceAndDiceVertical or SliceAndDiceHorizontal | Simpler slicing calculation |

### Layout Selection Logic

Use a model property when you want to choose layout type dynamically in Razor Pages.

**Pages/Index.cshtml.cs**

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public string TreeMapLayoutType { get; set; } = "Squarified";

    public void OnGet()
    {
        TreeMapData = new List<SalesData>
        {
            new SalesData { Name = "Laptop", Sales = 5000 },
            new SalesData { Name = "Phone", Sales = 8000 },
            new SalesData { Name = "Chair", Sales = 3000 },
            new SalesData { Name = "Desk", Sales = 4000 },
            new SalesData { Name = "Monitor", Sales = 6000 }
        };

        if (TreeMapData.Count > 10)
        {
            TreeMapLayoutType = "SliceAndDiceVertical";
        }
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

**Pages/Index.cshtml**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 layoutType="@Model.TreeMapLayoutType"
                 weightValuePath="Sales">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## Right-to-Left RTL Support

TreeMap supports right-to-left rendering using `enableRtl`. This is useful for localized applications that support Arabic, Hebrew, and other RTL languages.

### Enabling RTL

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 enableRtl="true"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### RTL Components

When `enableRtl="true"` is configured, TreeMap layout-related UI elements adapt for right-to-left rendering.

**Data labels with RTL:**

```cshtml
<e-treemap-leafitemsettings labelPath="Name"
                            showLabels="true">
</e-treemap-leafitemsettings>
```

**Tooltip with RTL:**

```cshtml
<e-treemap-tooltipsettings visible="true"
                           format="الاسم: ${Name}">
</e-treemap-tooltipsettings>
```

**Legend with RTL:**

```cshtml
<e-treemap-legendsettings visible="true"
                          position="Top">
</e-treemap-legendsettings>
```

### RTL with Legend

Use `enableRtl="true"` with legend settings when the TreeMap is part of an RTL page.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 enableRtl="true"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>

        <e-treemap-legendsettings visible="true"
                                  position="Bottom">
        </e-treemap-legendsettings>
    </ejs-treemap>
</div>
```

### RTL with Tooltips

Tooltips can be used with RTL text through tooltip formatting or templates.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 enableRtl="true"
                 layoutType="Squarified">
        <e-treemap-tooltipsettings visible="true"
                                   format="الاسم: ${Name}, المبيعات: ${Sales}">
        </e-treemap-tooltipsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## Rendering Directions

The `renderDirection` property controls the starting corner and rendering flow of TreeMap rectangles.

### Direction Options

Common render direction values include:

1. `TopLeftBottomRight` - Starts from top-left and flows toward bottom-right.
2. `TopRightBottomLeft` - Starts from top-right and flows toward bottom-left.
3. `BottomRightTopLeft` - Starts from bottom-right and flows toward top-left.
4. `BottomLeftTopRight` - Starts from bottom-left and flows toward top-right.

### Implementation Examples

**TopLeftBottomRight**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 renderDirection="TopLeftBottomRight"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**TopRightBottomLeft**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 renderDirection="TopRightBottomLeft"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**BottomRightTopLeft**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 renderDirection="BottomRightTopLeft"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

**BottomLeftTopRight**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 renderDirection="BottomLeftTopRight"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### When to Use Render Directions

Use render direction when the visual flow of items must align with reading direction, dashboard convention, or localization requirements.

Recommended usage:

- `TopLeftBottomRight` for standard left-to-right layouts.
- `TopRightBottomLeft` for right-to-left visual flow.
- `BottomLeftTopRight` when visual emphasis starts from the bottom-left.
- `BottomRightTopLeft` when visual emphasis starts from the bottom-right.

---

## Combining Layout with RTL

For RTL applications, combine `enableRtl`, `renderDirection`, and an appropriate `layoutType`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 enableRtl="true"
                 layoutType="SliceAndDiceAuto"
                 renderDirection="TopRightBottomLeft">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

This configuration:

- Enables RTL rendering behavior.
- Uses automatic slice-and-dice layout selection.
- Starts visual rendering from the top-right direction.
- Supports localized dashboards that require RTL reading flow.

---

## Layout Performance Considerations

TreeMap layout performance depends on the layout algorithm, item count, label configuration, templates, and data size.

General guidance:

- `Squarified` gives balanced visuals but requires more layout calculation than basic slicing.
- `SliceAndDiceVertical`, `SliceAndDiceHorizontal`, and `SliceAndDiceAuto` use simpler slicing behavior.
- For large datasets, pre-aggregate records before binding to the TreeMap.
- Avoid rendering thousands of raw transaction records directly.
- Use grouped data to reduce the number of visible leaf items.
- Avoid heavy label templates for large datasets.
- Keep labels short and use tooltips for detailed information.
- Ensure the TreeMap container has a fixed or visible height.

For very large datasets, prefer server-side aggregation and progressive exploration patterns instead of loading every raw item into the initial TreeMap.

---

## Common Layout Patterns

### Pattern Responsive Dashboard

Use `SliceAndDiceAuto` inside a visible responsive container.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="SliceAndDiceAuto">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

If the container size changes dynamically, refresh the TreeMap instance after layout changes.

```html
<script>
    window.refreshTreeMapLayout = function () {
        var treemapElement = document.getElementById('treemap');

        if (treemapElement && treemapElement.ej2_instances && treemapElement.ej2_instances.length > 0) {
            treemapElement.ej2_instances[0].refresh();
        }
    };
</script>
```

### Pattern Localized Application

Use the current culture to determine whether RTL should be enabled.

**Pages/Index.cshtml.cs**

```csharp
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public bool IsRtl { get; set; }

    public string RenderDirection { get; set; } = "TopLeftBottomRight";

    public void OnGet()
    {
        var culture = CultureInfo.CurrentCulture.Name;

        IsRtl = culture.StartsWith("ar") || culture.StartsWith("he");
        RenderDirection = IsRtl ? "TopRightBottomLeft" : "TopLeftBottomRight";

        TreeMapData = new List<SalesData>
        {
            new SalesData { Name = "Laptop", Sales = 5000 },
            new SalesData { Name = "Phone", Sales = 8000 },
            new SalesData { Name = "Chair", Sales = 3000 }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

**Pages/Index.cshtml**

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 enableRtl="@Model.IsRtl"
                 renderDirection="@Model.RenderDirection"
                 layoutType="SliceAndDiceAuto">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### Pattern Performance-Optimized

Use a slice-and-dice layout and aggregated data when rendering many items.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="SliceAndDiceVertical">
        <e-treemap-leafitemsettings labelPath="Name"
                                    interSectAction="TrimarizedData = sales
    .GroupBy(item => item.Category)
    .Select(group => new SalesData
    {
        Name = group.Key,
        Sales = group.Sum(item => item.Sales)
    })
    .ToList();
```

---

## Troubleshooting Layout and Rendering

**Issue: TreeMap is not visible**

- Ensure the TreeMap container has a visible height.
- Ensure `weightValuePath` points to a numeric field.
- Ensure the data source is not empty.
- Ensure Syncfusion scripts are rendered through `<ejs-scripts></ejs-scripts>`.

```cshtml
<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales">
    </ejs-treemap>
</div>
```

**Issue: Layout does not look balanced**

- Use `layoutType="Squarified"` for balanced rectangles.
- Verify the data values are not extremely skewed.
- Aggregate very small records into grouped items when needed.

**Issue: Slice-and-dice layout creates long rectangles**

- Use `Squarified` if readability is more important than ordered slicing.
- Use `SliceAndDiceAuto` for responsive containers.
- Adjust the container aspect ratio if the visual layout is too narrow or too wide.

**Issue: RTL does not appear as expected**

- Set `enableRtl="true"`.
- Use `renderDirection="TopRightBottomLeft"` when the rectangle flow should start from the right.
- Verify the page or container is not applying conflicting CSS direction styles.

**Issue: Dynamic layout changes do not update**

- Refresh the TreeMap instance after the container size changes.

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.refresh();
```

**Issue: Hex color values cause Razor compilation errors**

- Use explicit Razor string expressions for hex color attributes.

```cshtml
fill='@("#336699")'
```

---