# Interactive Features: Selection, Highlighting, and Drill-Down

Complete guide to user interaction features in Syncfusion TreeMap for ASP.NET Core Razor Pages, including selection, highlighting, drill-down navigation, on-demand data loading, breadcrumb display, and event handling.

## Table of Contents
- [Overview](#overview)
- [Selection Mode](#selection-mode)
  - [Enabling Selection](#enabling-selection)
  - [Selection Modes](#selection-modes)
  - [Customizing Selection Appearance](#customizing-selection-appearance)
  - [Selection with Legend Integration](#selection-with-legend-integration)
- [Highlight Behavior](#highlight-behavior)
  - [Enabling Highlight](#enabling-highlight)
  - [Highlight Modes](#highlight-modes)
  - [Customizing Highlight Appearance](#customizing-highlight-appearance)
  - [Highlight vs Selection Difference](#highlight-vs-selection-difference)
- [Drill-Down Navigation](#drill-down-navigation)
  - [Enabling Drill-Down](#enabling-drill-down)
  - [Drill-Down Behavior](#drill-down-behavior)
  - [Drill-Down with Custom Styling](#drill-down-with-custom-styling)
- [On-Demand Data Loading](#on-demand-data-loading)
  - [Default Behavior All Data Loaded Upfront](#default-behavior-all-data-loaded-upfront)
  - [On-Demand Loading](#on-demand-loading)
  - [Implementing On-Demand Data with Razor Page Handler](#implementing-on-demand-data-with-razor-page-handler)
- [Breadcrumb Navigation](#breadcrumb-navigation)
  - [Adding Breadcrumbs](#adding-breadcrumbs)
  - [Breadcrumb Display](#breadcrumb-display)
  - [Customizing Breadcrumb](#customizing-breadcrumb)
- [Complete Interactive Example](#complete-interactive-example)
- [Common Interactive Patterns](#common-interactive-patterns)
  - [Pattern 1 Drill-Down Dashboard](#pattern-1-drill-down-dashboard)
  - [Pattern 2 Selection with Legend](#pattern-2-selection-with-legend)
  - [Pattern 3 Hover-Only Emphasis](#pattern-3-hover-only-emphasis)
  - [Pattern 4 Performance-Optimized Large Dataset](#pattern-4-performance-optimized-large-dataset)
  - [Pattern 5 Summary View with Details](#pattern-5-summary-view-with-details)
- [Event Handling](#event-handling)
- [Accessibility](#accessibility)

---

## Overview

TreeMap provides multiple interaction features for data exploration:

1. **Selection** - Allows users to click and select TreeMap items.
2. **Highlight** - Applies temporary visual emphasis when hovering over items.
3. **Drill-down** - Allows users to navigate into grouped hierarchy levels.
4. **On-demand loading** - Allows data to be loaded dynamically based on user action.
5. **Breadcrumb display** - Shows the current navigation path when implementing drill-down workflows.
6. **Events** - Allows custom logic for item click, item selection, highlight, drill start, and drill end.

For ASP.NET Core Razor Pages, define JavaScript event handlers on the `window` object so the Syncfusion TagHelper can resolve them reliably during component initialization.

---

## Selection Mode

### Enabling Selection

Enable selection with `e-treemap-selectionsettings`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 itemSelected="onItemSelected"
                 layoutType="Squarified">
        <e-treemap-selectionsettings enable="true"
                                     mode="Item">
        </e-treemap-selectionsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onItemSelected = function (args) {
        console.log('Item selected:', args);
    };
</script>
```

Key properties:

- `enable="true"` enables selection.
- `mode="Item"` selects the individual item.
- `mode="All"` applies selection to the related group or group items, depending on hierarchy and interaction context.

### Selection Modes

Use `mode="Item"` for individual item selection.

```cshtml
<e-treemap-selectionsettings enable="true"
                             mode="Item">
</e-treemap-selectionsettings>
```

Use `mode="All"` when selection should apply more broadly across grouped items.

```cshtml
<e-treemap-selectionsettings enable="true"
                             mode="All">
</e-treemap-selectionsettings>
```

### Customizing Selection Appearance

Use `fill`, `opacity`, and nested border settings to customize selected item appearance.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 itemSelected="onItemSelected"
                 layoutType="Squarified">
        <e-treemap-selectionsettings enable="true"
                                     mode="Item"
                                     fill='@("#FF6B6B")'
                                     opacity="0.9">
            <e-selectionsettings-border color='@("#FFFFFF")'
                                        width="2">
            </e-selectionsettings-border>
        </e-treemap-selectionsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onItemSelected = function (args) {
        console.log('Selected item:', args);
    };
</script>
```

Selection properties:

- `fill` - Fill color of the selected item.
- `opacity` - Opacity of the selected item.
- `border` - Border style for selected item.

### Selection with Legend Integration

Use selection with a visible legend and color mapping when users need to visually relate selected items to categories or ranges.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 equalColorValuePath="Category"
                 itemSelected="onItemSelected"
                 layoutType="Squarified">
        <e-treemap-selectionsettings enable="true"
                                     mode="Item"
                                     fill='@("#FFD93D")'>
        </e-treemap-selectionsettings>

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

        <e-treemap-legendsettings visible="true"
                                  mode="Interactive"
                                  position="Bottom">
        </e-treemap-legendsettings>
    </ejs-treemap>
</div>

<script>
    window.onItemSelected = function (args) {
        console.log('Selection with legend:', args);
    };
</script>
```

Use `legendRendering` if you need built-in legend rendering event logic. TreeMap does not expose a dedicated `legendItemClicked` event.

---

## Highlight Behavior

### Enabling Highlight

Highlight is generally used for hover-based emphasis.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 itemHighlight="onItemHighlight"
                 layoutType="Squarified">
        <e-treemap-highlightsettings enable="true"
                                     mode="Item">
        </e-treemap-highlightsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onItemHighlight = function (args) {
        console.log('Item highlighted:', args);
    };
</script>
```

### Highlight Modes

Use `mode="Item"` to highlight only the hovered item.

```cshtml
<e-treemap-highlightsettings enable="true"
                             mode="Item">
</e-treemap-highlightsettings>
```

Use `mode="All"` to highlight a broader group context.

```cshtml
<e-treemap-highlightsettings enable="true"
                             mode="All">
</e-treemap-highlightsettings>
```

### Customizing Highlight Appearance

Use `fill`, `opacity`, and border settings for highlight styling.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 itemHighlight="onItemHighlight"
                 layoutType="Squarified">
        <e-treemap-highlightsettings enable="true"
                                     mode="Item"
                                     fill='@("#4ECDC4")'
                                     opacity="1">
            <e-highlightsettings-border color='@("#333333")'
                                        width="2">
            </e-highlightsettings-border>
        </e-treemap-highlightsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onItemHighlight = function (args) {
        console.log('Highlight event:', args);
    };
</script>
```

### Highlight vs Selection Difference

| Feature | Trigger | Persistence | Best Use Case |
|---|---|---|---|
| Highlight | Hover or pointer movement | Temporary | Temporary focus or visual emphasis |
| Selection | Click or tap | Persistent until another selection or reset | Marking an item for action or details |

Use highlight for visual feedback and selection for user-confirmed choices.

---

## Drill-Down Navigation

### Enabling Drill-Down

Use `enableDrillDown="true"` with grouped levels.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 enableDrillDown="true"
                 drillStart="onDrillStart"
                 drillEnd="onDrillEnd"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}">
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onDrillStart = function (args) {
        console.log('Drill started:', args);
    };

    window.onDrillEnd = function (args) {
        console.log('Drill ended:', args);
    };
</script>
```

### Drill-Down Behavior

Typical drill-down flow:

1. Initial view shows the first group level.
2. Clicking a group drills into the next hierarchy level.
3. The TreeMap redraws for the selected hierarchy path.
4. `drillStart` fires before the drill action.
5. `drillEnd` fires after the drill action completes.

### Drill-Down with Custom Styling

Use different level settings to visually separate hierarchy levels.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 enableDrillDown="true"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}"
                             fill='@("#336699")'
                             headerHeight="30">
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}"
                             fill='@("#0066CC")'
                             headerHeight="25">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## On-Demand Data Loading

### Default Behavior All Data Loaded Upfront

By default, TreeMap scenarios commonly bind the full dataset during initial rendering. This works well for small and medium datasets.

For large datasets, loading everything upfront can increase:

- Initial page load time
- Memory usage
- Client-side rendering cost
- Network payload size

### On-Demand Loading

For large datasets, load summary data first and then fetch detail data only when the user selects or drills into a category.

Recommended approach:

1. Bind initial summary data.
2. Handle `itemClick`, `itemSelected`, or `drillEnd`.
3. Call a Razor Page handler using `fetch`.
4. Replace the TreeMap data source.
5. Call `refresh()`.

### Implementing On-Demand Data with Razor Page Handler

Use a Razor Page handler to return filtered data.

**Pages/Index.cshtml.cs**

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = GetSummaryData();
    }

    public JsonResult OnGetCategoryData(string? category)
    {
        var query = GetDetailedData().AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(item => item.Category == category);
        }

        var data = query
            .OrderByDescending(item => item.Sales)
            .Take(1000)
            .ToList();

        return new JsonResult(data, new JsonSerializerOptions
        {
            PropertyNamingPolicy = null
        });
    }

    private List<SalesData> GetSummaryData()
    {
        return new List<SalesData>
        {
            new SalesData { Name = "Electronics", Category = "Electronics", Sales = 1200000 },
            new SalesData { Name = "Furniture", Category = "Furniture", Sales = 650000 },
            new SalesData { Name = "Appliances", Category = "Appliances", Sales = 950000 }
        };
    }

    private List<SalesData> GetDetailedData()
    {
        return new List<SalesData>
        {
            new SalesData { Name = "Laptop", Category = "Electronics", Sales = 450000 },
            new SalesData { Name = "Phone", Category = "Electronics", Sales = 380000 },
            new SalesData { Name = "Television", Category = "Electronics", Sales = 470000 },
            new SalesData { Name = "Table", Category = "Furniture", Sales = 220000 },
            new SalesData { Name = "Chair", Category = "Furniture", Sales = 180000 },
            new SalesData { Name = "Sofa", Category = "Furniture", Sales = 330000 },
            new SalesData { Name = "Refrigerator", Category = "Appliances", Sales = 560000 },
            new SalesData { Name = "Washing Machine", Category = "Appliances", Sales = 390000 }
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

**Pages/Index.cshtml**

```cshtml
@page
@model IndexModel

<div style="margin-bottom: 10px;">
    <button type="button" onclick="loadCategoryData('')">Load All Details</button>
    <button type="button" onclick="loadCategoryData('Electronics')">Electronics</button>
    <button type="button" onclick="loadCategoryData('Furniture')">Furniture</button>
    <button type="button" onclick="loadCategoryData('Appliances')">Appliances</button>
</div>

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.loadCategoryData = function (category) {
        var url = category
            ? '?handler=CategoryData&category=' + encodeURIComponent(category)
            : '?handler=CategoryData';

        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Request failed: ' + response.status);
                }

                return response.json();
            })
            .then(function (data) {
                var treemapElement = document.getElementById('treemap');

                if (!treemapElement || !treemapElement.ej2_instances || treemapElement.ej2_instances.length === 0) {
                    console.log('TreeMap instance is not available.');
                    return;
                }

                var treemap = treemapElement.ej2_instances[0];
                treemap.dataSource = data;
                treemap.refresh();
            })
            .catch(function (error) {
                console.error('Error loading TreeMap data:', error);
            });
    };
</script>
```

This pattern keeps the initial load small and retrieves detail records only when required.

---

## Breadcrumb Navigation

### Adding Breadcrumbs

TreeMap drill-down can be paired with a breadcrumb display. If your requirement is simple and predictable, use a custom breadcrumb container updated from TreeMap events.

```cshtml
@page
@model IndexModel

<div id="breadcrumb" style="margin-bottom: 10px;">
    Home
</div>

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 enableDrillDown="true"
                 drillEnd="onDrillEnd"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}">
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.onDrillEnd = function (args) {
        console.log('Drill completed:', args);
        document.getElementById('breadcrumb').textContent = 'Home';
    };
</script>
```

### Breadcrumb Display

A breadcrumb is useful for showing the current path in a drill-down workflow.

Example display:

```text
Home
Home > Asia
Home > Asia > India
```

The exact breadcrumb text depends on your data and the drill event arguments available in your version. Log the `drillEnd` argument first, then map the required path value to the breadcrumb text.

### Customizing Breadcrumb

Use plain HTML and update it from built-in TreeMap events.

```html
<div id="breadcrumb" style="margin-bottom: 10px; font-weight: 600;">
    Home
</div>
```

```javascript
window.onDrillEnd = function (args) {
    console.log('Drill event data:', args);
    document.getElementById('breadcrumb').textContent = 'Home';
};
```

For production use, update the breadcrumb based on the selected group or current drill level available from the event argument.

---

## Complete Interactive Example

This example combines selection, highlight, tooltip, range color mapping, and print-ready interaction setup.

**Pages/Index.cshtml.cs**

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
            new SalesData { Name = "Laptop", Category = "Electronics", Sales = 450000 },
            new SalesData { Name = "Phone", Category = "Electronics", Sales = 380000 },
            new SalesData { Name = "Television", Category = "Electronics", Sales = 470000 },
            new SalesData { Name = "Table", Category = "Furniture", Sales = 220000 },
            new SalesData { Name = "Chair", Category = "Furniture", Sales = 180000 },
            new SalesData { Name = "Sofa", Category = "Furniture", Sales = 330000 }
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

**Pages/Index.cshtml**

```cshtml
@page
@model IndexModel

<script>
    window.onItemClick = function (args) {
        console.log('Item clicked:', args);
    };

    window.onItemSelected = function (args) {
        console.log('Item selected:', args);
    };

    window.onItemHighlight = function (args) {
        console.log('Item highlighted:', args);
    };

    window.onTooltipRendering = function (args) {
        console.log('Tooltip rendering:', args);
    };
</script>

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 rangeColorValuePath="Sales"
                 itemClick="onItemClick"
                 itemSelected="onItemSelected"
                 itemHighlight="onItemHighlight"
                 tooltipRendering="onTooltipRendering"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name"
                                    showLabels="true"
                                    gap="2">
            <e-leafitemsettings-colormappings>
                <e-leafitemsettings-colormapping from="0"
                                                 to="250000"
                                                 color='@("#EF5350")'
                                                 label="Low">
                </e-leafitemsettings-colormapping>
                <e-leafitemsettings-colormapping from="250000"
                                                 to="400000"
                                                 color='@("#FDD835")'
                                                 label="Medium">
                </e-leafitemsettings-colormapping>
                <e-leafitemsettings-colormapping from="400000"
                                                 to="700000"
                                                 color='@("#66BB6A")'
                                                 label="High">
                </e-leafitemsettings-colormapping>
            </e-leafitemsettings-colormappings>
        </e-treemap-leafitemsettings>

        <e-treemap-selectionsettings enable="true"
                                     mode="Item"
                                     fill='@("#FFD93D")'
                                     opacity="0.9">
        </e-treemap-selectionsettings>

        <e-treemap-highlightsettings enable="true"
                                     mode="Item"
                                     fill='@("#4ECDC4")'
                                     opacity="0.8">
        </e-treemap-highlightsettings>

        <e-treemap-tooltipsettings visible="true"
                                   format="${Name}: ${Sales}">
        </e-treemap-tooltipsettings>

        <e-treemap-legendsettings visible="true"
                                  position="Bottom">
        </e-treemap-legendsettings>
    </ejs-treemap>
</div>
```

This configuration provides:

- Item click logging
- Persistent item selection
- Hover highlighting
- Tooltip display
- Range-based color mapping
- Legend display

---

## Common Interactive Patterns

### Pattern 1 Drill-Down Dashboard

Use grouped data with `enableDrillDown`.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             enableDrillDown="true"
             drillStart="onDrillStart"
             drillEnd="onDrillEnd">
    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}">
        </e-treemap-level>
    </e-treemap-levels>

    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Pattern 2 Selection with Legend

Use selection with legend and color mapping.

```cshtml
<e-treemap-selectionsettings enable="true"
                             mode="Item">
</e-treemap-selectionsettings>

<e-treemap-legendsettings visible="true"
                          mode="Interactive"
                          position="Bottom">
</e-treemap-legendsettings>
```

### Pattern 3 Hover-Only Emphasis

Enable highlight and disable selection when only hover emphasis is needed.

```cshtml
<e-treemap-highlightsettings enable="true"
                             mode="Item"
                             fill='@("#4ECDC4")'>
</e-treemap-highlightsettings>

<e-treemap-selectionsettings enable="false">
</e-treemap-selectionsettings>
```

### Pattern 4 Performance-Optimized Large Dataset

Start with summary data and fetch details only when needed.

```javascript
window.loadCategoryData = function (category) {
    fetch('?handler=CategoryData&category=' + encodeURIComponent(category))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var treemap = document.getElementById('treemap').ej2_instances[0];
            treemap.dataSource = data;
            treemap.refresh();
        });
};
```

### Pattern 5 Summary View with Details

Use labels for summary and tooltips for additional details.

```cshtml
<e-treemap-leafitemsettings labelPath="Name">
</e-treemap-leafitemsettings>

<e-treemap-tooltipsettings visible="true"
                           format="${Name}: ${Sales}">
</e-treemap-tooltipsettings>
```

---

## Event Handling

Use built-in TreeMap events to respond to interactions.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapLoad = function (args) {
        console.log('TreeMap load:', args);
    };

    window.onTreeMapLoaded = function (args) {
        console.log('TreeMap loaded:', args);
    };

    window.onItemClick = function (args) {
        console.log('Item click:', args);
    };

    window.onItemSelected = function (args) {
        console.log('Item selected:', args);
    };

    window.onItemHighlight = function (args) {
        console.log('Item highlight:', args);
    };

    window.onDrillStart = function (args) {
        console.log('Drill start:', args);
    };

    window.onDrillEnd = function (args) {
        console.log('Drill end:', args);
    };

    window.onTooltipRendering = function (args) {
        console.log('Tooltip rendering:', args);
    };

    window.onLegendRendering = function (args) {
        console.log('Legend rendering:', args);
    };
</script>

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 load="onTreeMapLoad"
                 loaded="onTreeMapLoaded"
                 itemClick="onItemClick"
                 itemSelected="onItemSelected"
                 itemHighlight="onItemHighlight"
                 drillStart="onDrillStart"
                 drillEnd="onDrillEnd"
                 tooltipRendering="onTooltipRendering"
                 legendRendering="onLegendRendering"
                 layoutType="Squarified">
        <e-treemap-selectionsettings enable="true">
        </e-treemap-selectionsettings>

        <e-treemap-highlightsettings enable="true">
        </e-treemap-highlightsettings>

        <e-treemap-tooltipsettings visible="true">
        </e-treemap-tooltipsettings>

        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

Common built-in events:

- `load` - Fires before rendering.
- `loaded` - Fires after rendering.
- `itemClick` - Fires when an item is clicked.
- `itemSelected` - Fires when an item is selected.
- `itemHighlight` - Fires when an item is highlighted.
- `drillStart` - Fires before drill-down starts.
- `drillEnd` - Fires after drill-down completes.
- `tooltipRendering` - Fires when tooltip is rendered.
- `legendRendering` - Fires when legend is rendered.

---

## Accessibility

Interactive TreeMap features should remain understandable for keyboard and assistive technology users.

Recommended accessibility practices:

- Use meaningful labels through `labelPath`.
- Enable tooltips for dense layouts.
- Avoid relying only on color to convey meaning.
- Use clear category labels and legend labels.
- Ensure sufficient color contrast for selection and highlight fills.
- Keep item text concise and readable.
- Use keyboard testing as part of validation.
- Provide external summary or details panels when information is too dense for labels.

Example details panel pattern:

```cshtml
<div id="detailsPanel" style="margin-top: 12px;">
    Select a TreeMap item to view details.
</div>

<script>
    window.onItemClick = function (args) {
        var item = args.item && args.item.data ? args.item.data : null;

        if (!item) {
            return;
        }

        document.getElementById('detailsPanel').textContent =
            item.Name + ' - Sales: ' + item.Sales;
    };
</script>
```

---

## Troubleshooting Interactive Features

**Issue: Selection event is not firing**

- Ensure `itemSelected="onItemSelected"` is configured.
- Ensure `selectionSettings` has `enable="true"`.
- Define the function on `window`.
- Click directly on a TreeMap rectangle.

```javascript
window.onItemSelected = function (args) {
    console.log(args);
};
```

**Issue: Details panel is not updating**

- Use `itemClick` for details panel updates because it fires directly on item click.
- Use `itemSelected` only when selection-specific behavior is required.

```cshtml
<ejs-treemap itemClick="onItemClick">
</ejs-treemap>
```

**Issue: Highlight does not appear**

- Ensure `highlightSettings` has `enable="true"`.
- Use a visible `fill` color.
- Test by hovering directly over a TreeMap item.

**Issue: Drill-down does not work**

- Set `enableDrillDown="true"`.
- Configure at least one valid `groupPath`.
- Ensure grouped fields exist in the data source.
- Ensure `weightValuePath` points to a numeric field.

**Issue: Dynamic data update renders blank**

- Ensure returned JSON field names match `weightValuePath` and `labelPath`.
- If using `weightValuePath="Sales"`, return `Sales`, not `sales`.
- Preserve PascalCase JSON when required.

```csharp
return new JsonResult(data, new JsonSerializerOptions
{
    PropertyNamingPolicy = null
});
```

**Issue: Legend interaction is expected to fire a click event**

- TreeMap does not expose a dedicated `legendItemClicked` event.
- Use `legendRendering` for built-in legend rendering logic.
- Use `itemClick` or `itemSelected` for TreeMap item interaction.

**Issue: Hex color values cause Razor compilation errors**

- Use explicit Razor string expressions for hex colors.

```cshtml
fill='@("#FFD93D")'
```

---
