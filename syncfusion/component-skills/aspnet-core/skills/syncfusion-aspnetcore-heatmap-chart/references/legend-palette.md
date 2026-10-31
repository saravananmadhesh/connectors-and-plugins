# Legend and Palette System

- [Legend Types](#legend-types)
  - [Gradient Legend](#gradient-legend)
  - [List Legend](#list-legend)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Position Examples](#position-examples)
  - [Alignment Within Position](#alignment-within-position)
- [Legend Dimensions and Paging](#legend-dimensions-and-paging)
  - [Legend Size](#legend-size)
  - [Legend Paging](#legend-paging)
- [Smart Legend](#smart-legend)
  - [Overview](#overview)
  - [Label Display Types](#label-display-types)
  - [Smart Legend Configuration](#smart-legend-configuration)
- [Legend Selection and Titles](#legend-selection-and-titles)
  - [Toggle Cell Visibility](#toggle-cell-visibility)
  - [Legend Title](#legend-title)
  - [Complete Legend Example](#complete-legend-example)
- [Palette System](#palette-system)
  - [Gradient Palette](#gradient-palette)
  - [Fixed Palette](#fixed-palette)
- [Color Configuration](#color-configuration)
  - [Color Stops](#color-stops)
  - [Color Format Support](#color-format-support)
  - [Predefined Color Schemes](#predefined-color-schemes)
  - [Complete Palette Example](#complete-palette-example)
  - [Multi-Stop Gradient](#multi-stop-gradient)

## Legend Types

The Syncfusion ASP.NET Core HeatMap Chart legend explains how cell colors map to data values. The legend is usually configured together with `paletteSettings`, because palette values define the color scale that the legend displays.

For ASP.NET Core Razor Pages, use this structure:

- Keep HeatMap markup in `Pages/Index.cshtml`.
- Keep palette collections, labels, sample data, and reusable text styles in `Pages/Index.cshtml.cs`.
- Use real Razor tags in `.cshtml` files, not encoded tags.
- Use `@Model.PropertyName` instead of `ViewBag`.
- Use a strongly typed `List<HeatMapPalette>` for palette configuration.
- Use `e-heatmap-datasourcesettings` when binding object collections.

### Gradient Legend

A gradient legend displays smooth color transitions for continuous values. Use this when the data is numeric and values should be visually interpolated between multiple color stops.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="gradientLegendHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.GradientPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] MonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr"
        };

        public string[] RegionLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<SalesHeatMapData> SalesData { get; set; } = new List<SalesHeatMapData>();

        public List<HeatMapPalette> GradientPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
        };

        public void OnGet()
        {
            SalesData = new List<SalesHeatMapData>
            {
                new SalesHeatMapData { Month = "Jan", Region = "North", Sales = 72 },
                new SalesHeatMapData { Month = "Feb", Region = "North", Sales = 84 },
                new SalesHeatMapData { Month = "Mar", Region = "South", Sales = 46 },
                new SalesHeatMapData { Month = "Apr", Region = "South", Sales = 91 },
                new SalesHeatMapData { Month = "Jan", Region = "East", Sales = 63 },
                new SalesHeatMapData { Month = "Feb", Region = "East", Sales = 58 },
                new SalesHeatMapData { Month = "Mar", Region = "West", Sales = 39 },
                new SalesHeatMapData { Month = "Apr", Region = "West", Sales = 96 }
            };
        }
    }

    public class SalesHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

Use cases:

- Temperature visualization.
- Density maps.
- Confidence scores.
- Continuous performance metrics.
- Utilization or intensity values.

### List Legend

A list legend is commonly used with a fixed palette. It displays discrete color items where each color represents a classification, threshold, or status range.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="fixedLegendHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Fixed"
        palette="@Model.FixedPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        type="List"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapPalette> FixedPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#51CF66", Label = "Low" },
    new HeatMapPalette { Value = 50, Color = "#FFD93D", Label = "Medium" },
    new HeatMapPalette { Value = 80, Color = "#FF6B6B", Label = "High" }
};
```

Use cases:

- Status classifications.
- Risk levels.
- Rating categories.
- SLA state visualization.
- Discrete business thresholds.

## Legend Positioning

### Position Options

Use the `position` property in `e-heatmap-legendsettings` to control legend placement.

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right">
</e-heatmap-legendsettings>
```

Supported position values include:

| Position | Placement |
|----------|-----------|
| `Right` | Displays the legend on the right side. |
| `Left` | Displays the legend on the left side. |
| `Top` | Displays the legend above the HeatMap. |
| `Bottom` | Displays the legend below the HeatMap. |

### Position Examples

#### Right Position

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right"
    showLabel="true">
</e-heatmap-legendsettings>
```

#### Left Position

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Left"
    showLabel="true">
</e-heatmap-legendsettings>
```

#### Top Position

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Top"
    showLabel="true">
</e-heatmap-legendsettings>
```

#### Bottom Position

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Bottom"
    showLabel="true">
</e-heatmap-legendsettings>
```

### Alignment Within Position

Use `alignment` to control legend alignment within the selected legend position.

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right"
    alignment="Center">
</e-heatmap-legendsettings>
```

Common alignment values:

| Alignment | Placement Behavior |
|-----------|--------------------|
| `Near` | Aligns the legend near the start edge. |
| `Center` | Centers the legend in the available legend area. |
| `Far` | Aligns the legend near the end edge. |

## Legend Dimensions and Paging

### Legend Size

Use `width` and `height` to control the legend area.

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right"
    width="150"
    height="200"
    showLabel="true">
</e-heatmap-legendsettings>
```

Sizing notes:

- Numeric values are interpreted as pixel values.
- Percentage strings can be used where supported by the layout.
- Use fixed legend dimensions when the HeatMap is part of a dashboard with limited space.

### Legend Paging

Legend paging is useful when the number of legend items exceeds the available legend area. This is most commonly seen with fixed palettes that have many discrete ranges.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="legendPagingHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-palettesettings
        type="Fixed"
        palette="@Model.MultiLevelPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        height="150"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapPalette> MultiLevelPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#FF0000", Label = "Level 1" },
    new HeatMapPalette { Value = 20, Color = "#FF6600", Label = "Level 2" },
    new HeatMapPalette { Value = 40, Color = "#FFFF00", Label = "Level 3" },
    new HeatMapPalette { Value = 60, Color = "#00FF00", Label = "Level 4" },
    new HeatMapPalette { Value = 80, Color = "#0000FF", Label = "Level 5" },
    new HeatMapPalette { Value = 100, Color = "#4B0082", Label = "Level 6" }
};
```

Paging behavior:

- Legend navigation appears when legend items exceed the available legend space.
- Users can navigate between legend pages.
- Reducing legend height can force paging for compact layouts.

## Smart Legend

### Overview

Smart legend improves readability when the palette has many colors or labels. It reduces visual clutter by controlling how legend labels are displayed.

Use smart legend when:

- The palette contains many values.
- Legend labels overlap.
- The legend area is small.
- Only minimum and maximum labels are important.

### Label Display Types

Use `labelDisplayType` to control which labels appear in the smart legend.

```cshtml
<e-heatmap-legendsettings
    visible="true"
    enableSmartLegend="true"
    labelDisplayType="Edge">
</e-heatmap-legendsettings>
```

Common label display values:

| Display Type | Behavior |
|--------------|----------|
| `All` | Shows all legend labels. |
| `Edge` | Shows only edge labels such as minimum and maximum. |
| `None` | Hides legend labels and keeps the color scale visible. |

### Smart Legend Configuration

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right"
    alignment="Center"
    enableSmartLegend="true"
    labelDisplayType="Edge"
    showLabel="true">
</e-heatmap-legendsettings>
```

Use this configuration for dense palettes or compact dashboard panels.

## Legend Selection and Titles

### Toggle Cell Visibility

Use `toggleVisibility="true"` to allow users to click legend items and toggle the visibility of cells associated with that legend item.

```cshtml
<e-heatmap-legendsettings
    visible="true"
    position="Right"
    toggleVisibility="true"
    showLabel="true">
</e-heatmap-legendsettings>
```

Use cases:

- Filtering by status.
- Temporarily hiding low-priority ranges.
- Comparing specific value groups.
- Interactive dashboards.

### Legend Title

A legend title improves readability by describing what the legend values represent.

Use `<e-legendsettings-title>` inside `<e-heatmap-legendsettings>` to add a legend title.

#### Legend Title Example

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SalesData"
    showTooltip="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true" textStyle="@Model.LegendTitleTextStyle">
        <e-legendsettings-title text="Sales Volume"></e-legendsettings-title>
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public HeatMapFont LegendTitleTextStyle { get; set; } = new HeatMapFont
{
    Size = "13px",
    FontWeight = "500",
    FontFamily = "Segoe UI"
};
```

#### Safe Legend Title Alternative

If the `<e-legendsettings-title>` tag is not recognized in your Syncfusion package version, use an HTML element outside the HeatMap component:

```cshtml
<div class="heatmap-legend-caption">Sales Performance</div>

<ejs-heatmap ...>
</ejs-heatmap>
```

```html
<style>
    .heatmap-legend-caption {
        font-family: "Segoe UI", Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 8px;
    }
</style>
```

### Complete Legend Example

This example combines a gradient palette, visible legend, smart legend behavior, legend positioning, legend sizing, and legend toggle behavior.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="completeLegendHeatmap"
    dataSource="@Model.SalesData"
    width="100%"
    height="500px"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-titlesettings
        text="Sales Performance by Region"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}"
        textStyle="@Model.CellTextStyle">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.GradientPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        alignment="Center"
        toggleVisibility="true"
        enableSmartLegend="true"
        labelDisplayType="All"
        width="200"
        height="300"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] MonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr"
        };

        public string[] RegionLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<SalesHeatMapData> SalesData { get; set; } = new List<SalesHeatMapData>();

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "18px",
            Color = "#222222"
        };

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "500",
            Size = "12px",
            Color = "#111111"
        };

        public List<HeatMapPalette> GradientPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
        };

        public void OnGet()
        {
            SalesData = new List<SalesHeatMapData>
            {
                new SalesHeatMapData { Month = "Jan", Region = "North", Sales = 72 },
                new SalesHeatMapData { Month = "Feb", Region = "North", Sales = 84 },
                new SalesHeatMapData { Month = "Mar", Region = "North", Sales = 46 },
                new SalesHeatMapData { Month = "Apr", Region = "North", Sales = 91 },

                new SalesHeatMapData { Month = "Jan", Region = "South", Sales = 63 },
                new SalesHeatMapData { Month = "Feb", Region = "South", Sales = 58 },
                new SalesHeatMapData { Month = "Mar", Region = "South", Sales = 39 },
                new SalesHeatMapData { Month = "Apr", Region = "South", Sales = 96 },

                new SalesHeatMapData { Month = "Jan", Region = "East", Sales = 52 },
                new SalesHeatMapData { Month = "Feb", Region = "East", Sales = 68 },
                new SalesHeatMapData { Month = "Mar", Region = "East", Sales = 76 },
                new SalesHeatMapData { Month = "Apr", Region = "East", Sales = 88 },

                new SalesHeatMapData { Month = "Jan", Region = "West", Sales = 34 },
                new SalesHeatMapData { Month = "Feb", Region = "West", Sales = 47 },
                new SalesHeatMapData { Month = "Mar", Region = "West", Sales = 59 },
                new SalesHeatMapData { Month = "Apr", Region = "West", Sales = 73 }
            };
        }
    }

    public class SalesHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

## Palette System

### Gradient Palette

A gradient palette creates smooth color interpolation between defined value stops.

#### Pages/Index.cshtml

```cshtml
<e-heatmap-palettesettings
    type="Gradient"
    palette="@Model.GradientPalette">
</e-heatmap-palettesettings>
```

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapPalette> GradientPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
    new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
    new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
};
```

Behavior:

- Values near `0` use the first palette color.
- Values between `0` and `50` are interpolated between the first and second colors.
- Values between `50` and `100` are interpolated between the second and third colors.
- This is best for continuous metrics.

### Fixed Palette

A fixed palette assigns discrete colors to value thresholds or ranges.

#### Pages/Index.cshtml

```cshtml
<e-heatmap-palettesettings
    type="Fixed"
    palette="@Model.FixedPalette">
</e-heatmap-palettesettings>
```

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapPalette> FixedPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#51CF66", Label = "Low" },
    new HeatMapPalette { Value = 50, Color = "#FFD93D", Label = "Medium" },
    new HeatMapPalette { Value = 80, Color = "#FF6B6B", Label = "High" }
};
```

Behavior:

- Each configured palette item represents a threshold or classification.
- Colors are not intended to interpolate smoothly in the same way as a gradient palette.
- This is best for status, risk, rating, and classification scenarios.

## Color Configuration

### Color Stops

Color stops define the value thresholds used by the palette.

```csharp
public List<HeatMapPalette> TemperaturePalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#0080FF", Label = "Cold" },
    new HeatMapPalette { Value = 50, Color = "#90EE90", Label = "Moderate" },
    new HeatMapPalette { Value = 100, Color = "#FF0000", Label = "Hot" }
};
```

Bind the color stops to the HeatMap.

```cshtml
<e-heatmap-palettesettings
    type="Gradient"
    palette="@Model.TemperaturePalette">
</e-heatmap-palettesettings>
```

### Color Format Support

Palette colors can be defined using common CSS color formats.

```csharp
public List<HeatMapPalette> ColorFormatPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#FF5733", Label = "Hex Color" },
    new HeatMapPalette { Value = 50, Color = "rgb(255, 87, 51)", Label = "RGB Color" },
    new HeatMapPalette { Value = 100, Color = "red", Label = "Named Color" }
};
```

Recommended practice:

- Prefer hexadecimal colors for predictable documentation examples.
- Use labels for readability in legends.
- Keep palette values aligned with the actual data range.

### Predefined Color Schemes

#### Cool Colors

```csharp
public List<HeatMapPalette> CoolPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#0080FF", Label = "Low" },
    new HeatMapPalette { Value = 100, Color = "#90EE90", Label = "High" }
};
```

#### Warm Colors

```csharp
public List<HeatMapPalette> WarmPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#FFFF00", Label = "Low" },
    new HeatMapPalette { Value = 100, Color = "#FF0000", Label = "High" }
};
```

#### Neutral Colors

```csharp
public List<HeatMapPalette> NeutralPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#FFFFFF", Label = "Low" },
    new HeatMapPalette { Value = 100, Color = "#000000", Label = "High" }
};
```

### Complete Palette Example

This complete example demonstrates JSON cell binding, fixed palette configuration, legend visibility, legend toggle behavior, and a strongly typed PageModel.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="completePaletteHeatmap"
    dataSource="@Model.PerformanceData"
    showTooltip="true"
    width="100%"
    height="500px">

    <e-heatmap-titlesettings
        text="Sales Performance Classification"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.PerformanceMonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.PerformanceRegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Score">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Fixed"
        palette="@Model.PerformancePalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        enableSmartLegend="true"
        toggleVisibility="true"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] PerformanceMonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr"
        };

        public string[] PerformanceRegionLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<PerformanceHeatMapData> PerformanceData { get; set; } = new List<PerformanceHeatMapData>();

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "18px",
            Color = "#2C3E50"
        };

        public List<HeatMapPalette> PerformancePalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#2ECC71", Label = "Below Target" },
            new HeatMapPalette { Value = 75, Color = "#F39C12", Label = "At Target" },
            new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "Above Target" }
        };

        public void OnGet()
        {
            PerformanceData = new List<PerformanceHeatMapData>
            {
                new PerformanceHeatMapData { Month = "Jan", Region = "North", Score = 72 },
                new PerformanceHeatMapData { Month = "Feb", Region = "North", Score = 84 },
                new PerformanceHeatMapData { Month = "Mar", Region = "North", Score = 46 },
                new PerformanceHeatMapData { Month = "Apr", Region = "North", Score = 91 },

                new PerformanceHeatMapData { Month = "Jan", Region = "South", Score = 63 },
                new PerformanceHeatMapData { Month = "Feb", Region = "South", Score = 58 },
                new PerformanceHeatMapData { Month = "Mar", Region = "South", Score = 39 },
                new PerformanceHeatMapData { Month = "Apr", Region = "South", Score = 96 },

                new PerformanceHeatMapData { Month = "Jan", Region = "East", Score = 52 },
                new PerformanceHeatMapData { Month = "Feb", Region = "East", Score = 68 },
                new PerformanceHeatMapData { Month = "Mar", Region = "East", Score = 76 },
                new PerformanceHeatMapData { Month = "Apr", Region = "East", Score = 88 },

                new PerformanceHeatMapData { Month = "Jan", Region = "West", Score = 34 },
                new PerformanceHeatMapData { Month = "Feb", Region = "West", Score = 47 },
                new PerformanceHeatMapData { Month = "Mar", Region = "West", Score = 59 },
                new PerformanceHeatMapData { Month = "Apr", Region = "West", Score = 73 }
            };
        }
    }

    public class PerformanceHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;

        public double Score { get; set; }
    }
}
```

### Multi-Stop Gradient

A multi-stop gradient creates a smoother and more expressive color progression across several values.

#### Pages/Index.cshtml.cs

```csharp
public List<HeatMapPalette> MultiStopGradientPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#0080FF", Label = "Minimum" },
    new HeatMapPalette { Value = 33, Color = "#00FF00", Label = "Low" },
    new HeatMapPalette { Value = 66, Color = "#FFFF00", Label = "Medium" },
    new HeatMapPalette { Value = 100, Color = "#FF0000", Label = "Maximum" }
};
```

#### Pages/Index.cshtml

```cshtml
<e-heatmap-palettesettings
    type="Gradient"
    palette="@Model.MultiStopGradientPalette">
</e-heatmap-palettesettings>
```

Resulting value progression:

```text
Blue at 0 → Green at 33 → Yellow at 66 → Red at 100
```

This pattern is useful for scientific, operational, and analytics dashboards where values should progress through multiple visual states.
