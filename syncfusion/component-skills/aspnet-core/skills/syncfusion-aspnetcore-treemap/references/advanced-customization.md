# Advanced Customization and Internationalization

Deep-dive into advanced TreeMap features including internationalization, number formatting, legend customization, templates, event handling, and practical implementation patterns for Syncfusion TreeMap in ASP.NET Core.

## Table of Contents
- [Overview](#overview)
- [Internationalization i18n](#internationalization-i18n)
  - [Configure Culture in ASP.NET Core](#configure-culture-in-aspnet-core)
  - [Pass Culture to View](#pass-culture-to-view)
  - [Set TreeMap Locale](#set-treemap-locale)
  - [Localized UI Elements](#localized-ui-elements)
- [Number and Date Formatting](#number-and-date-formatting)
  - [Format Currency Values](#format-currency-values)
  - [Format Percentage Values](#format-percentage-values)
  - [Format with Thousand Separators](#format-with-thousand-separators)
  - [Date Formatting](#date-formatting)
- [Legend Customization](#legend-customization)
  - [Enable Legend](#enable-legend)
  - [Legend Position Options](#legend-position-options)
  - [Custom Legend Title](#custom-legend-title)
  - [Legend Styling](#legend-styling)
  - [Legend with Color Mapping](#legend-with-color-mapping)
- [Interactive Legend Modes](#interactive-legend-modes)
  - [Legend Interactive Mode](#legend-interactive-mode)
  - [Legend with Multiple Colors](#legend-with-multiple-colors)
- [Custom Templates and Styling](#custom-templates-and-styling)
  - [Item Template](#item-template)
  - [Label Template with Icons](#label-template-with-icons)
  - [Conditional Styling](#conditional-styling)
  - [Header Template](#header-template)
- [Event Handling](#event-handling)
  - [Load Event](#load-event)
  - [Loaded Event](#loaded-event)
  - [ItemRendering Event](#itemrendering-event)
  - [ItemClick Event](#itemclick-event)
  - [ItemMove Event](#itemmove-event)
  - [ItemSelected Event](#itemselected-event)
  - [ItemHighlight Event](#itemhighlight-event)
  - [DrillStart Event](#drillstart-event)
  - [DrillEnd Event](#drillend-event)
  - [TooltipRendering Event](#tooltiprendering-event)
  - [LegendRendering Event](#legendrendering-event)
  - [Resize Event](#resize-event)
  - [BeforePrint Event](#beforeprint-event)
  - [Click Event](#click-event)
  - [DoubleClick Event](#doubleclick-event)
  - [MouseMove Event](#mousemove-event)
  - [RightClick Event](#rightclick-event)
  - [Built-in Event Notes](#built-in-event-notes)
- [How-To Patterns](#how-to-patterns)
  - [Dynamic Data Update](#dynamic-data-update)
  - [Show Details Panel](#show-details-panel)
  - [Filter by Category](#filter-by-category)
  - [Highlight High Performers](#highlight-high-performers)
  - [Export with Summary](#export-with-summary)
  - [Drill-Down with Breadcrumbs](#drill-down-with-breadcrumbs)
- [Advanced Performance Optimization](#advanced-performance-optimization)
  - [Lazy Load Data](#lazy-load-data)
  - [Large Dataset Rendering Guidance](#large-dataset-rendering-guidance)
- [Troubleshooting Advanced Features](#troubleshooting-advanced-features)

---

## Overview

Advanced customization enables:

1. **Internationalization** - Culture-aware labels, tooltip text, number formatting, date formatting, and right-to-left rendering.
2. **Custom Formatting** - Numbers, dates, currency, percentage values, and preformatted display fields.
3. **Legend Enhancement** - Legend visibility, positioning, title, interactive mode, and color-mapping labels.
4. **Templates** - Custom leaf labels and group headers.
5. **Events** - Respond to TreeMap load, selection, highlight, drill-down, tooltip, legend rendering, print, and pointer actions.
6. **Styling** - Component-level styling, color mapping, and CSS-based customization.

---

## Internationalization i18n

### Configure Culture in ASP.NET Core

Configure request localization in `Program.cs`.

```csharp
using System.Globalization;
using Microsoft.AspNetCore.Localization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

var supportedCultures = new[]
{
    new CultureInfo("en-US"),
    new CultureInfo("en-GB"),
    new CultureInfo("de-DE"),
    new CultureInfo("fr-FR"),
    new CultureInfo("es-ES"),
    new CultureInfo("ar-AE"),
    new CultureInfo("ja-JP"),
    new CultureInfo("zh-CN")
};

app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("en-US"),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures
});

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();

app.Run();
```

### Pass Culture to View

In Razor Pages, assign the current culture and TreeMap data in `Index.cshtml.cs`.

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public string CurrentCulture { get; set; } = "en-US";

    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        CurrentCulture = CultureInfo.CurrentCulture.Name;

        TreeMapData = new List<SalesData>
        {
            new SalesData
            {
                Name = "Electronics",
                Category = "Technology",
                Revenue = 125000,
                MarketShare = 0.42,
                RevenueText = 125000.ToString("C2", CultureInfo.CurrentCulture),
                RevenueNumberText = 125000.ToString("N0", CultureInfo.CurrentCulture),
                MarketShareText = 0.42.ToString("P1", CultureInfo.CurrentCulture),
                UpdatedOnText = DateTime.Today.ToString("d", CultureInfo.CurrentCulture),
                PerformanceColor = "#90EE90"
            },
            new SalesData
            {
                Name = "Furniture",
                Category = "Home",
                Revenue = 85000,
                MarketShare = 0.28,
                RevenueText = 85000.ToString("C2", CultureInfo.CurrentCulture),
                RevenueNumberText = 85000.ToString("N0", CultureInfo.CurrentCulture),
                MarketShareText = 0.28.ToString("P1", CultureInfo.CurrentCulture),
                UpdatedOnText = DateTime.Today.ToString("d", CultureInfo.CurrentCulture),
                PerformanceColor = "#FFB6C1"
            }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Revenue { get; set; }
        public double MarketShare { get; set; }
        public string RevenueText { get; set; } = string.Empty;
        public string RevenueNumberText { get; set; } = string.Empty;
        public string MarketShareText { get; set; } = string.Empty;
        public string UpdatedOnText { get; set; } = string.Empty;
        public string PerformanceColor { get; set; } = string.Empty;
    }
}
```

### Set TreeMap Locale

Use the `locale` property on the TreeMap component and bind data through the page model.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             locale="@Model.CurrentCulture"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

Supported culture values commonly include:

- `en-US` - English United States
- `en-GB` - English United Kingdom
- `de-DE` - German
- `fr-FR` - French
- `es-ES` - Spanish
- `ar-AE` - Arabic United Arab Emirates
- `ja-JP` - Japanese
- `zh-CN` - Simplified Chinese

### Localized UI Elements

TreeMap localization mainly affects component-level culture behavior. Data labels, headers, tooltip content, and legend labels are usually based on values provided through the data source or configuration.

For reliable localization:

- Format numbers, dates, currency, and percentage values in C# before binding.
- Store localized display fields such as `RevenueText`, `RevenueNumberText`, `MarketShareText`, and `UpdatedOnText`.
- Use `labelFormat`, tooltip format, or templates to show those preformatted values.
- Enable `enableRtl="true"` when rendering right-to-left layouts.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             locale="@Model.CurrentCulture"
             enableRtl="true"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelFormat="${Name}: ${RevenueText}">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

---

## Number and Date Formatting

### Format Currency Values

For TreeMap labels, prepare formatted display fields in C# and bind those fields in `labelFormat`.

```csharp
RevenueText = revenue.ToString("C2", CultureInfo.CurrentCulture);
```

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             locale="@Model.CurrentCulture"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelFormat="${Name}: ${RevenueText}">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Format Percentage Values

Use a separate display field for percentage values.

```csharp
MarketShareText = marketShare.ToString("P1", CultureInfo.CurrentCulture);
```

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelFormat="${Name}: ${MarketShareText}">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Format with Thousand Separators

Use `N0`, `N1`, or `N2` based on the required decimal precision. In this example, the TreeMap uses the numeric `Revenue` field for sizing, and the formatted `RevenueNumberText` field only for display.

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public string CurrentCulture { get; set; } = "en-US";

    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        CurrentCulture = CultureInfo.CurrentCulture.Name;

        var salesData = new List<SalesData>
        {
            new SalesData { Name = "Electronics", Category = "Technology", Revenue = 125000, MarketShare = 0.42 },
            new SalesData { Name = "Furniture", Category = "Home", Revenue = 85000, MarketShare = 0.28 }
        };

        TreeMapData = salesData.Select(item => new SalesData
        {
            Name = item.Name,
            Category = item.Category,
            Revenue = item.Revenue,
            MarketShare = item.MarketShare,
            RevenueNumberText = item.Revenue.ToString("N0", CultureInfo.CurrentCulture),
            RevenueText = item.Revenue.ToString("C2", CultureInfo.CurrentCulture),
            MarketShareText = item.MarketShare.ToString("P1", CultureInfo.CurrentCulture),
            UpdatedOnText = DateTime.Today.ToString("d", CultureInfo.CurrentCulture)
        }).ToList();
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Revenue { get; set; }
        public double MarketShare { get; set; }
        public string RevenueNumberText { get; set; } = string.Empty;
        public string RevenueText { get; set; } = string.Empty;
        public string MarketShareText { get; set; } = string.Empty;
        public string UpdatedOnText { get; set; } = string.Empty;
    }
}
```

Then bind the formatted field in the TreeMap label.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             locale="@Model.CurrentCulture"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelFormat="${Name}: ${RevenueNumberText}">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Date Formatting

TreeMap does not use a date axis. If date information must be displayed in labels or templates, format the date before passing it to the component.

```csharp
UpdatedOnText = DateTime.Today.ToString("d", CultureInfo.CurrentCulture);
```

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelFormat="${Name}: ${UpdatedOnText}">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

---

## Legend Customization

### Enable Legend

Enable the legend through `e-treemap-legendsettings`.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rangeColorValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0" to="100000" color='@("#66BB6A")' label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000" to="300000" color='@("#FDD835")' label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="300000" to="500000" color='@("#EF5350")' label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true" position="Bottom">
    </e-treemap-legendsettings>
</ejs-treemap>
```

### Legend Position Options

```cshtml
<e-treemap-legendsettings visible="true" position="Bottom">
</e-treemap-legendsettings>

<e-treemap-legendsettings visible="true" position="Top">
</e-treemap-legendsettings>

<e-treemap-legendsettings visible="true" position="Left">
</e-treemap-legendsettings>

<e-treemap-legendsettings visible="true" position="Right">
</e-treemap-legendsettings>
```

### Custom Legend Title

`TreeMapLegendSettings.Title` is a complex title settings object. Use the nested title tag instead of `title="..."`.

```cshtml
<e-treemap-legendsettings visible="true"
                          position="Bottom">
    <e-legendsettings-title text="Revenue Range">
    </e-legendsettings-title>
</e-treemap-legendsettings>
```

### Legend Styling

Use supported legend settings for layout-level customization and CSS for additional visual styling.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rangeColorValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0" to="100000" color='@("#66BB6A")' label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000" to="300000" color='@("#FDD835")' label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="300000" to="500000" color='@("#EF5350")' label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true" position="Bottom">
        <e-legendsettings-title text="Sales Categories">
        </e-legendsettings-title>
    </e-treemap-legendsettings>
</ejs-treemap>

<style>
    #treemap {
        max-width: 100%;
    }
</style>
```

### Legend with Color Mapping

For range-based legends, configure `rangeColorValuePath` on the TreeMap and define color mappings inside `leafItemSettings`.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rangeColorValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0" to="100000" color='@("#EF5350")' label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000" to="300000" color='@("#FDD835")' label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="300000" to="500000" color='@("#66BB6A")' label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true" position="Bottom">
        <e-legendsettings-title text="Revenue Range">
        </e-legendsettings-title>
    </e-treemap-legendsettings>
</ejs-treemap>
```

---

## Interactive Legend Modes

### Legend Interactive Mode

Use `mode="Interactive"` in legend settings to enable interactive legend behavior.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rangeColorValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0" to="100000" color='@("#EF5350")' label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000" to="300000" color='@("#FDD835")' label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="300000" to="500000" color='@("#66BB6A")' label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true"
                              mode="Interactive"
                              position="Bottom">
    </e-treemap-legendsettings>
</ejs-treemap>
```

Interactive legend mode is useful when users need to focus on a specific color range or category represented in the TreeMap.

### Legend with Multiple Colors

Use multiple color mapping entries and meaningful labels to produce a clear multi-color legend.

```cshtml
<e-leafitemsettings-colormappings>
    <e-leafitemsettings-colormapping from="0" to="100000" color='@("#D32F2F")' label="Critical">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="100000" to="250000" color='@("#FBC02D")' label="Average">
    </e-leafitemsettings-colormapping>
    <e-leafitemsettings-colormapping from="250000" to="500000" color='@("#388E3C")' label="Excellent">
    </e-leafitemsettings-colormapping>
</e-leafitemsettings-colormappings>
```

---

## Custom Templates and Styling

### Item Template

For TreeMap item display, use `labelTemplate` inside `leafItemSettings`.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelTemplate="#itemTemplate">
    </e-treemap-leafitemsettings>
</ejs-treemap>

<script type="text/x-template" id="itemTemplate">
    <div style="padding: 8px; text-align: center;">
        <span style="font-weight: 600;">${Name}</span><br />
        <span style="font-size: 12px;">${RevenueText}</span>
    </div>
</script>
```

### Label Template with Icons

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelTemplate="#labelTemplate">
    </e-treemap-leafitemsettings>
</ejs-treemap>

<script type="text/x-template" id="labelTemplate">
    <div class="treemap-label">
        <span class="category-icon">${Category}</span>
        <span>${Name}</span>
    </div>
</script>

<style>
    .treemap-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .category-icon {
        font-size: 11px;
        opacity: 0.75;
    }
</style>
```

### Conditional Styling

Avoid complex JavaScript expressions directly inside templates when the same result can be prepared in the model. Create fields such as `PerformanceColor` in C# and bind them in the template.

```csharp
PerformanceColor = revenue > 300000 ? "#90EE90" : "#FFB6C1";
```

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name"
                                labelTemplate="#conditionalTemplate">
    </e-treemap-leafitemsettings>
</ejs-treemap>

<script type="text/x-template" id="conditionalTemplate">
    <div style="padding: 8px; background-color: ${PerformanceColor}; height: 100%;">
        <strong>${Name}</strong><br />
        <span>${RevenueText}</span>
    </div>
</script>
```

### Header Template

Use `headerTemplate` on a TreeMap level when group headers need a custom visual layout.

```cshtml
@page
@model IndexModel

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>

    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}"
                         headerTemplate="#headerTemplate">
        </e-treemap-level>
    </e-treemap-levels>
</ejs-treemap>

<script type="text/x-template" id="headerTemplate">
    <div style="background: #4472C4; color: #ffffff; padding: 6px; font-weight: 600;">
        ${Category}
    </div>
</script>
```

---

## Event Handling

TreeMap events allow you to respond to built-in component actions such as loading, rendering, item click, item selection, item highlight, drill-down, tooltip rendering, legend rendering, resize, print, and pointer interactions.

For ASP.NET Core TagHelpers, define JavaScript event handlers on the global `window` object so the TreeMap component can resolve them correctly during initialization.

### Load Event

Use the `load` event for initialization-time changes before the TreeMap is fully rendered.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapLoad = function (args) {
        console.log('TreeMap load event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             load="onTreeMapLoad"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Loaded Event

Use the `loaded` event after the TreeMap has completed rendering.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapLoaded = function (args) {
        console.log('TreeMap loaded event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             loaded="onTreeMapLoaded"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### ItemRendering Event

Use the `itemRendering` event when TreeMap items are being rendered.

```cshtml
@page
@model IndexModel

<script>
    window.onItemRendering = function (args) {
        console.log('Item rendering event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             itemRendering="onItemRendering"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### ItemClick Event

Use the `itemClick` event when a TreeMap item is clicked.

```cshtml
@page
@model IndexModel

<script>
    window.onItemClick = function (args) {
        console.log('Item click event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             itemClick="onItemClick"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### ItemMove Event

Use the `itemMove` event when the pointer moves over a TreeMap item.

```cshtml
@page
@model IndexModel

<script>
    window.onItemMove = function (args) {
        console.log('Item move event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             itemMove="onItemMove"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### ItemSelected Event

Enable selection and wire the `itemSelected` event.

```cshtml
@page
@model IndexModel

<script>
    window.onItemSelected = function (args) {
        console.log('Item selected event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             itemSelected="onItemSelected"
             layoutType="Squarified">
    <e-treemap-selectionsettings enable="true">
    </e-treemap-selectionsettings>

    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### ItemHighlight Event

Enable highlight settings and wire the `itemHighlight` event.

```cshtml
@page
@model IndexModel

<script>
    window.onItemHighlight = function (args) {
        console.log('Item highlight event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             itemHighlight="onItemHighlight"
             layoutType="Squarified">
    <e-treemap-highlightsettings enable="true"
                                 fill='@("#FFD700")'>
    </e-treemap-highlightsettings>

    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### DrillStart Event

Use the `drillStart` event before drill-down navigation starts.

```cshtml
@page
@model IndexModel

<script>
    window.onDrillStart = function (args) {
        console.log('Drill start event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             enableDrillDown="true"
             drillStart="onDrillStart"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>

    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}">
        </e-treemap-level>
    </e-treemap-levels>
</ejs-treemap>
```

### DrillEnd Event

Use the `drillEnd` event after drill-down navigation is completed.

```cshtml
@page
@model IndexModel

<script>
    window.onDrillEnd = function (args) {
        console.log('Drill end event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             enableDrillDown="true"
             drillEnd="onDrillEnd"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>

    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}">
        </e-treemap-level>
    </e-treemap-levels>
</ejs-treemap>
```

### TooltipRendering Event

Use the `tooltipRendering` event when the TreeMap tooltip is being rendered.

```cshtml
@page
@model IndexModel

<script>
    window.onTooltipRendering = function (args) {
        console.log('Tooltip rendering event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             tooltipRendering="onTooltipRendering"
             layoutType="Squarified">
    <e-treemap-tooltipsettings visible="true">
    </e-treemap-tooltipsettings>

    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### LegendRendering Event

Use the `legendRendering` event when TreeMap legend items are being rendered.

```cshtml
@page
@model IndexModel

<script>
    window.onLegendRendering = function (args) {
        console.log('Legend rendering event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rangeColorValuePath="Revenue"
             legendRendering="onLegendRendering"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0" to="100000" color='@("#EF5350")' label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000" to="300000" color='@("#FDD835")' label="Medium">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="300000" to="500000" color='@("#66BB6A")' label="High">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true" position="Bottom">
    </e-treemap-legendsettings>
</ejs-treemap>
```

### Resize Event

Use the `resize` event when the TreeMap is resized.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapResize = function (args) {
        console.log('TreeMap resize event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             resize="onTreeMapResize"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### BeforePrint Event

Use the `beforePrint` event before the TreeMap print action starts. Printing requires `allowPrint="true"`.

```cshtml
@page
@model IndexModel

<script>
    window.onBeforePrint = function (args) {
        console.log('Before print event triggered:', args);
    };

    window.printTreeMap = function () {
        var treemapElement = document.getElementById('treemap');

        if (treemapElement && treemapElement.ej2_instances && treemapElement.ej2_instances.length > 0) {
            var treemap = treemapElement.ej2_instances[0];
            treemap.print();
        }
    };
</script>

<button type="button" onclick="printTreeMap()">
    Print TreeMap
</button>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             allowPrint="true"
             beforePrint="onBeforePrint"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Click Event

Use the `click` event for general TreeMap click interaction.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapClick = function (args) {
        console.log('TreeMap click event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             click="onTreeMapClick"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### DoubleClick Event

Use the `doubleClick` event for TreeMap double-click interaction.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapDoubleClick = function (args) {
        console.log('TreeMap double-click event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             doubleClick="onTreeMapDoubleClick"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### MouseMove Event

Use the `mouseMove` event for pointer movement over the TreeMap.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapMouseMove = function (args) {
        console.log('TreeMap mouse move event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             mouseMove="onTreeMapMouseMove"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### RightClick Event

Use the `rightClick` event for right-click interaction on the TreeMap.

```cshtml
@page
@model IndexModel

<script>
    window.onTreeMapRightClick = function (args) {
        console.log('TreeMap right-click event triggered:', args);
    };
</script>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Revenue"
             rightClick="onTreeMapRightClick"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

### Built-in Event Notes

- TreeMap does not expose a dedicated `legendItemClicked` event.
- For legend-related built-in behavior, use `legendRendering`.
- For item click behavior, use `itemClick`.
- For general TreeMap click behavior, use `click`.
- For selection behavior, enable `selectionSettings` and use `itemSelected`.
- For highlight behavior, enable `highlightSettings` and use `itemHighlight`.
- For tooltip behavior, enable `tooltipSettings` and use `tooltipRendering`.
- For drill-down behavior, enable `enableDrillDown` and use `drillStart` / `drillEnd`.
- For print behavior, enable `allowPrint="true"` and call the TreeMap instance `print()` method.

---

## How-To Patterns

### Dynamic Data Update

Create a Razor Page handler that returns JSON data. The handler preserves PascalCase JSON property names so `weightValuePath="Sales"` and `labelPath="Name"` continue to work after refresh.

```csharp
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = GetSalesData();
    }

    public JsonResult OnGetTreeMapData()
    {
        var updatedData = new List<SalesData>
        {
            new SalesData { Name = "Mobile", Category = "Electronics", Sales = 610000 },
            new SalesData { Name = "Television", Category = "Electronics", Sales = 470000 },
            new SalesData { Name = "Sofa", Category = "Furniture", Sales = 330000 },
            new SalesData { Name = "Dining Table", Category = "Furniture", Sales = 290000 },
            new SalesData { Name = "Refrigerator", Category = "Appliances", Sales = 560000 },
            new SalesData { Name = "Washing Machine", Category = "Appliances", Sales = 390000 }
        };

        return new JsonResult(updatedData, new JsonSerializerOptions
        {
            PropertyNamingPolicy = null
        });
    }

    private List<SalesData> GetSalesData()
    {
        return new List<SalesData>
        {
            new SalesData { Name = "Laptop", Category = "Electronics", Sales = 450000 },
            new SalesData { Name = "Phone", Category = "Electronics", Sales = 380000 },
            new SalesData { Name = "Table", Category = "Furniture", Sales = 220000 }
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

```cshtml
@page
@model IndexModel

<button type="button" onclick="refreshData()">
    Refresh Data
</button>

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
    window.refreshData = function () {
        fetch('?handler=TreeMapData')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Request failed: ' + response.status);
                }

                return response.json();
            })
            .then(function (data) {
                console.log('Updated TreeMap data:', data);

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
                console.error('Error while refreshing TreeMap data:', error);
            });
    };
</script>
```

### Show Details Panel

```cshtml
@page
@model IndexModel

<div style="display: flex; gap: 20px;">
    <div style="flex: 1;">
        <ejs-treemap id="treemap"
                     dataSource="Model.TreeMapData"
                     weightValuePath="Sales"
                     itemSelected="onItemSelected"
                     layoutType="Squarified">
            <e-treemap-selectionsettings enable="true">
            </e-treemap-selectionsettings>

            <e-treemap-leafitemsettings labelPath="Name">
            </e-treemap-leafitemsettings>
        </ejs-treemap>
    </div>

    <div id="details" style="flex: 0 0 300px; padding: 20px; border: 1px solid #ccc; display: none;">
        <h3 id="detailsTitle"></h3>
        <p id="detailsInfo"></p>
    </div>
</div>

<script>
    window.onItemSelected = function (args) {
        if (!args.item || !args.item.data) {
            return;
        }

        var item = args.item.data;
        document.getElementById('detailsTitle').textContent = item.Name;
        document.getElementById('detailsInfo').textContent = 'Sales: ' + item.Sales;
        document.getElementById('details').style.display = 'block';
    };
</script>
```

### Filter by Category

Serialize the original data to JavaScript and update the TreeMap data source after filtering.

```cshtml
@page
@model IndexModel
@using System.Text.Json

<select onchange="filterByCategory(this.value)">
    <option value="">All</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
</select>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>

<script>
    var allData = @Html.Raw(JsonSerializer.Serialize(Model.TreeMapData, new JsonSerializerOptions { PropertyNamingPolicy = null }));

    window.filterByCategory = function (category) {
        var treemapElement = document.getElementById('treemap');

        if (!treemapElement || !treemapElement.ej2_instances || treemapElement.ej2_instances.length === 0) {
            return;
        }

        var treemap = treemapElement.ej2_instances[0];

        var filtered = category
            ? allData.filter(function (item) {
                return item.Category === category;
            })
            : allData;

        treemap.dataSource = filtered;
        treemap.refresh();
    };
</script>
```

### Highlight High Performers

Use range color mapping to visually distinguish high performers.

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
            <e-leafitemsettings-colormapping from="0" to="250000" color='@("#EF5350")' label="Needs Attention">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="250000" to="400000" color='@("#FDD835")' label="Good">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="400000" to="1000000" color='@("#66BB6A")' label="High Performer">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>

    <e-treemap-legendsettings visible="true" position="Bottom">
    </e-treemap-legendsettings>
</ejs-treemap>
```

### Export with Summary

Use the TreeMap instance export method for exporting the component. Keep summary rendering separate from the TreeMap export unless a custom report layout is implemented.

```cshtml
@page
@model IndexModel

<button type="button" onclick="exportTreeMap()">Export TreeMap</button>
<div id="summary"></div>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             allowPdfExport="true"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>
</ejs-treemap>

<script>
    window.exportTreeMap = function () {
        var treemapElement = document.getElementById('treemap');

        if (!treemapElement || !treemapElement.ej2_instances || treemapElement.ej2_instances.length === 0) {
            return;
        }

        var treemap = treemapElement.ej2_instances[0];
        var data = treemap.dataSource || [];

        var total = data.reduce(function (sum, item) {
            return sum + item.Sales;
        }, 0);

        document.getElementById('summary').textContent = 'Total Sales: ' + total.toLocaleString();

        treemap.export('PDF', 'TreeMapReport');
    };
</script>
```

### Drill-Down with Breadcrumbs

Use the built-in drill-down option with grouped levels. If a custom breadcrumb display is required, update the breadcrumb container inside `drillEnd`.

```cshtml
@page
@model IndexModel

<div id="breadcrumbs" style="margin-bottom: 10px;">Sales</div>

<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             enableDrillDown="true"
             drillEnd="onDrillEnd"
             layoutType="Squarified">
    <e-treemap-leafitemsettings labelPath="Name">
    </e-treemap-leafitemsettings>

    <e-treemap-levels>
        <e-treemap-level groupPath="Category"
                         headerFormat="${Category}">
        </e-treemap-level>
    </e-treemap-levels>
</ejs-treemap>

<script>
    window.onDrillEnd = function (args) {
        document.getElementById('breadcrumbs').textContent = 'Sales';
        console.log('Drill completed:', args);
    };
</script>
```

---

## Advanced Performance Optimization

### Lazy Load Data

For large data sources, return only the records required for the current view or selected category. In this example, the Razor Page handler filters the data by category and returns only the matching records to the TreeMap.

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
        TreeMapData = GetSalesData();
    }

    public JsonResult OnGetTreeMapData(string? category)
    {
        var query = GetSalesData().AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(item => item.Category == category);
        }

        var data = query
            .OrderByDescending(item => item.Sales)
            .Take(1000)
            .Select(item => new
            {
                item.Name,
                item.Category,
                item.Sales
            })
            .ToList();

        return new JsonResult(data, new JsonSerializerOptions
        {
            PropertyNamingPolicy = null
        });
    }

    private List<SalesData> GetSalesData()
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

Use the following TreeMap markup to request filtered data based on the selected category.

```cshtml
@page
@model IndexModel

<select onchange="loadTreeMapData(this.value)">
    <option value="">All</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
    <option value="Appliances">Appliances</option>
</select>

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
    window.loadTreeMapData = function (category) {
        var url = category
            ? '?handler=TreeMapData&category=' + encodeURIComponent(category)
            : '?handler=TreeMapData';

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
                console.error('Error while loading TreeMap data:', error);
            });
    };
</script>
```

If the data comes from a real database, replace `GetSalesData().AsQueryable()` with your injected database context query. For sample documentation, use `GetSalesData().AsQueryable()` so the example remains complete and runnable.


### Large Dataset Rendering Guidance

TreeMap is a visual summarization component. Instead of rendering every raw record, aggregate data before binding whenever possible.

Recommended approaches:

- Aggregate records by category, region, department, or product group.
- Bind summarized values instead of transaction-level data.
- Use drill-down to progressively reveal more detail.
- Limit the initial data source size for faster first render.
- Avoid heavy HTML templates for thousands of items.
- Prefer plain labels for large datasets.
- Use server-side filtering for category-based exploration.

```csharp
var summarizedData = sales
    .GroupBy(item => new { item.Category, item.Region })
    .Select(group => new
    {
        Category = group.Key.Category,
        Region = group.Key.Region,
        Sales = group.Sum(item => item.Sales)
    })
    .ToList();
```

---

## Troubleshooting Advanced Features

**Issue: Internationalization is not reflected**

- Verify request localization is configured before endpoint mapping.
- Check that `CultureInfo.CurrentCulture.Name` returns the expected culture.
- Pass the current culture to the TreeMap `locale` property.
- Format data display values in C# when labels or tooltips must be culture-aware.

**Issue: Numbers are not formatting correctly**

- Do not rely on raw numeric values for final display text.
- Create formatted fields such as `RevenueText`, `RevenueNumberText`, `SalesText`, or `MarketShareText`.
- Use `CultureInfo.CurrentCulture` for consistent server-side formatting.
- Bind formatted fields in `labelFormat` or templates.
- Keep numeric fields such as `Revenue` or `Sales` for `weightValuePath`.

**Issue: Hex color values cause Razor compilation errors**

- Use lowercase `color`.
- Pass hex colors as explicit Razor string expressions.

```cshtml
color='@("#66BB6A")'
```

**Issue: Legend title throws a compile-time error**

- Do not use `title="Sales Categories"` directly on `e-treemap-legendsettings`.
- Use the nested title tag because legend title is a complex title settings object.

```cshtml
<e-treemap-legendsettings visible="true" position="Bottom">
    <e-legendsettings-title text="Sales Categories">
    </e-legendsettings-title>
</e-treemap-legendsettings>
```

**Issue: Events are not firing**

- Verify the event name matches the TreeMap event property.
- Define the JavaScript handler on the `window` object.
- Check the browser console for script errors.
- Enable the related feature when required, such as selection or highlight settings.

**Issue: Templates show raw HTML or do not render**

- Verify the template ID matches the configured template selector.
- Use `script type="text/x-template"`.
- Avoid invalid HTML inside the template.
- Prefer precomputed fields instead of complex expressions inside templates.

**Issue: Drill-down does not work**

- Set `enableDrillDown="true"`.
- Configure at least one valid grouped level using `groupPath`.
- Ensure the data source contains the fields referenced by `groupPath`.
- Confirm that `weightValuePath` points to a numeric field.

**Issue: Dynamic data refresh renders blank or does not resize correctly**

- Keep the `weightValuePath` field name consistent with JSON property names.
- If using `weightValuePath="Sales"`, return JSON with `Sales`, not `sales`.
- Use `PropertyNamingPolicy = null` in `JsonSerializerOptions` to preserve PascalCase.
- Ensure the TreeMap container has a visible height.

```csharp
return new JsonResult(updatedData, new JsonSerializerOptions
{
    PropertyNamingPolicy = null
});
```

**Issue: Print action does nothing**

- Enable `allowPrint="true"`.
- Call the TreeMap instance `print()` method from a user action such as a button click.
- Use `beforePrint` only to handle logic before printing starts.

```cshtml
<ejs-treemap id="treemap"
             allowPrint="true"
             beforePrint="onBeforePrint">
</ejs-treemap>
```

---
