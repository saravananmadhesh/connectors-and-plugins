# Bubble HeatMap Visualization

- [Bubble Types Overview](#bubble-types-overview)
  - [Available Bubble Types](#available-bubble-types)
- [Size-Based Bubbles](#size-based-bubbles)
  - [Size-Based Bubbles Overview](#size-based-bubbles-overview)
  - [Size-Based Bubbles Basic Configuration](#size-based-bubbles-basic-configuration)
  - [Size-Based Bubbles PageModel Implementation](#size-based-bubbles-pagemodel-implementation)
  - [Size-Based Bubbles Configuration Properties](#size-based-bubbles-configuration-properties)
  - [Size-Based Bubbles Inverting Bubble Size](#size-based-bubbles-inverting-bubble-size)
  - [Size-Based Bubbles Use Cases](#size-based-bubbles-use-cases)
- [Color-Based Bubbles](#color-based-bubbles)
  - [Color-Based Bubbles Overview](#color-based-bubbles-overview)
  - [Color-Based Bubbles Basic Configuration](#color-based-bubbles-basic-configuration)
  - [Color-Based Bubbles PageModel Example](#color-based-bubbles-pagemodel-example)
  - [Color-Based Bubbles Razor Page](#color-based-bubbles-razor-page)
  - [Color-Based Bubbles Use Cases](#color-based-bubbles-use-cases)
- [Sector-Based Bubbles](#sector-based-bubbles)
  - [Sector-Based Bubbles Overview](#sector-based-bubbles-overview)
  - [Sector-Based Bubbles Basic Configuration](#sector-based-bubbles-basic-configuration)
  - [Sector-Based Bubbles PageModel Implementation](#sector-based-bubbles-pagemodel-implementation)
  - [Sector-Based Bubbles Razor Page](#sector-based-bubbles-razor-page)
  - [Sector-Based Bubbles Configuration Details](#sector-based-bubbles-configuration-details)
  - [Sector-Based Bubbles Use Cases](#sector-based-bubbles-use-cases)
- [Size and Color Combined](#size-and-color-combined)
  - [Size and Color Combined Overview](#size-and-color-combined-overview)
  - [Size and Color Combined Configuration](#size-and-color-combined-configuration)
  - [Size and Color Combined PageModel with Dual Metrics](#size-and-color-combined-pagemodel-with-dual-metrics)
- [Bubble Data Mapping](#bubble-data-mapping)
  - [Bubble Data Mapping Data Structure](#bubble-data-mapping-data-structure)
  - [Bubble Data Mapping Configuration](#bubble-data-mapping-configuration)
  - [Bubble Data Mapping Property Specifications](#bubble-data-mapping-property-specifications)
  - [Bubble Data Mapping Advanced Example](#bubble-data-mapping-advanced-example)
- [Configuration Patterns](#configuration-patterns)
  - [Pattern 1: Size-Only Visualization](#pattern-1-size-only-visualization)
  - [Pattern 2: Color-Only with Legend](#pattern-2-color-only-with-legend)
  - [Pattern 3: Sector-Based Progress](#pattern-3-sector-based-progress)
  - [Pattern 4: Dual-Dimension Analysis](#pattern-4-dual-dimension-analysis)
  - [Pattern 5: Inverted Size for Anomaly Detection](#pattern-5-inverted-size-for-anomaly-detection)
- [Complete Example: Sales Analysis Dashboard](#complete-example-sales-analysis-dashboard)
  - [Sales Analysis Dashboard Razor Page](#sales-analysis-dashboard-razor-page)
  - [Sales Analysis Dashboard PageModel](#sales-analysis-dashboard-pagemodel)

## Bubble Types Overview

Bubble HeatMap visualization renders bubbles inside HeatMap cells instead of only rectangular color-filled tiles. This is useful when the cell must communicate value magnitude, intensity, progress, or multiple metrics in a compact matrix layout.

For ASP.NET Core Razor Pages, use this structure:

- Keep the HeatMap UI markup in `Pages/Index.cshtml`.
- Keep data, labels, palettes, fonts, and reusable configuration objects in `Pages/Index.cshtml.cs`.
- Use real Razor tags in `.cshtml` files, not encoded tags.
- Use `e-heatmap-datasourcesettings` for JSON-style object binding.
- Use `tileType="Bubble"` in `e-heatmap-cellsettings`.
- Use `bubbleType` to select how the bubble represents the value.
- Configure bubble size with the nested `<e-cellsettings-bubblesize>` Tag Helper instead of assigning `bubbleSize="50%"` directly.

### Available Bubble Types

| Type | Represents | Use Case |
|------|------------|----------|
| `Size` | Bubble radius changes based on value magnitude. | Sales volume, traffic count, usage volume. |
| `Color` | Bubble color changes based on value intensity. | Score intensity, rating, quality, risk level. |
| `Sector` | Bubble sector angle changes based on value. | Completion percentage, progress, allocation. |
| `SizeAndColor` | Bubble size and color both represent data. | Two-dimensional metric comparison. |

## Size-Based Bubbles

### Size-Based Bubbles Overview

Use size-based bubbles when the value magnitude should be visually represented through bubble size. Larger values produce larger bubbles, and smaller values produce smaller bubbles.

### Size-Based Bubbles Basic Configuration

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="sizeBubbleHeatmap"
    dataSource="@Model.SizeBubbleData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.ProductLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Product"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="Size"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="50%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Size-Based Bubbles PageModel Implementation

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] MonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar"
        };

        public string[] ProductLabels { get; set; } =
        {
            "A", "B"
        };

        public List<BubbleSalesData> SizeBubbleData { get; set; } = new List<BubbleSalesData>();

        public void OnGet()
        {
            SizeBubbleData = new List<BubbleSalesData>
            {
                new BubbleSalesData { Product = "A", Month = "Jan", Sales = 10 },
                new BubbleSalesData { Product = "A", Month = "Feb", Sales = 25 },
                new BubbleSalesData { Product = "A", Month = "Mar", Sales = 40 },
                new BubbleSalesData { Product = "B", Month = "Jan", Sales = 30 },
                new BubbleSalesData { Product = "B", Month = "Feb", Sales = 50 },
                new BubbleSalesData { Product = "B", Month = "Mar", Sales = 15 }
            };
        }
    }

    public class BubbleSalesData
    {
        public string Product { get; set; } = string.Empty;

        public string Month { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

### Size-Based Bubbles Configuration Properties

| Property | Purpose |
|----------|---------|
| `tileType="Bubble"` | Renders HeatMap cells as bubbles. |
| `bubbleType="Size"` | Uses bubble size to represent the mapped value. |
| `<e-cellsettings-bubblesize>` | Defines the bubble size range as a complex child setting. |
| `minimum="20%"` | Defines the minimum bubble size. |
| `maximum="50%"` | Defines the maximum bubble size. |
| `isInversedBubbleSize="true"` | Reverses the size relationship so lower values appear larger. |
| `showLabel="true"` | Displays the mapped cell value as a label. |

### Size-Based Bubbles Inverting Bubble Size

Use `isInversedBubbleSize="true"` when smaller values should receive stronger visual emphasis.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Size"
    isInversedBubbleSize="true"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="60%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

### Size-Based Bubbles Use Cases

- Sales volume where larger bubbles represent higher revenue or unit sales.
- Website traffic where larger bubbles represent more page views.
- Resource utilization where larger bubbles represent higher CPU or memory usage.
- Transaction volume where larger bubbles represent higher transaction counts.

## Color-Based Bubbles

### Color-Based Bubbles Overview

Use color-based bubbles when all bubbles should remain the same size and value differences should be represented through color intensity.

### Color-Based Bubbles Basic Configuration

```cshtml
<ejs-heatmap
    id="colorBubbleHeatmap"
    dataSource="@Model.ColorBubbleData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.QuarterLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Quarter"
        yDataMapping="Region"
        valueMapping="Performance">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="Color"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="50%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.PerformancePalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Color-Based Bubbles PageModel Example

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] QuarterLabels { get; set; } =
        {
            "Q1", "Q2"
        };

        public string[] RegionLabels { get; set; } =
        {
            "North", "South"
        };

        public List<RegionalPerformanceData> ColorBubbleData { get; set; } = new List<RegionalPerformanceData>();

        public List<HeatMapPalette> PerformancePalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
        };

        public void OnGet()
        {
            ColorBubbleData = new List<RegionalPerformanceData>
            {
                new RegionalPerformanceData { Region = "North", Quarter = "Q1", Performance = 75 },
                new RegionalPerformanceData { Region = "North", Quarter = "Q2", Performance = 85 },
                new RegionalPerformanceData { Region = "South", Quarter = "Q1", Performance = 65 },
                new RegionalPerformanceData { Region = "South", Quarter = "Q2", Performance = 95 }
            };
        }
    }

    public class RegionalPerformanceData
    {
        public string Region { get; set; } = string.Empty;

        public string Quarter { get; set; } = string.Empty;

        public double Performance { get; set; }
    }
}
```

### Color-Based Bubbles Razor Page

Use this smaller snippet when your PageModel already contains `ColorBubbleData`, `QuarterLabels`, `RegionLabels`, and `PerformancePalette`.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.ColorBubbleData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.QuarterLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Quarter"
        yDataMapping="Region"
        valueMapping="Performance">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="Color"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="50%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.PerformancePalette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

### Color-Based Bubbles Use Cases

- Quality scores where color indicates rating.
- Customer satisfaction levels.
- Accuracy metrics.
- Risk scores where size should not bias interpretation.
- Status intensity where equal-size bubbles improve comparison.

## Sector-Based Bubbles

### Sector-Based Bubbles Overview

Use sector-based bubbles when the value should be represented as a sector or progress portion inside the bubble. This is useful for completion, progress, and allocation scenarios.

### Sector-Based Bubbles Basic Configuration

```cshtml
<ejs-heatmap
    id="sectorBubbleHeatmap"
    dataSource="@Model.SectorBubbleData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.TaskLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DepartmentLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Task"
        yDataMapping="Department"
        valueMapping="Completion">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="Sector"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="70%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>
</ejs-heatmap>
```

### Sector-Based Bubbles PageModel Implementation

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] TaskLabels { get; set; } =
        {
            "Development", "Testing", "Recruitment", "Training"
        };

        public string[] DepartmentLabels { get; set; } =
        {
            "IT", "HR"
        };

        public List<TaskCompletionData> SectorBubbleData { get; set; } = new List<TaskCompletionData>();

        public void OnGet()
        {
            SectorBubbleData = new List<TaskCompletionData>
            {
                new TaskCompletionData { Department = "IT", Task = "Development", Completion = 85 },
                new TaskCompletionData { Department = "IT", Task = "Testing", Completion = 60 },
                new TaskCompletionData { Department = "HR", Task = "Recruitment", Completion = 40 },
                new TaskCompletionData { Department = "HR", Task = "Training", Completion = 90 }
            };
        }
    }

    public class TaskCompletionData
    {
        public string Department { get; set; } = string.Empty;

        public string Task { get; set; } = string.Empty;

        public double Completion { get; set; }
    }
}
```

### Sector-Based Bubbles Razor Page

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SectorBubbleData">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Task"
        yDataMapping="Department"
        valueMapping="Completion">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="Sector"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="70%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>
</ejs-heatmap>
```

### Sector-Based Bubbles Configuration Details

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Sector"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="80%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

Important configuration notes:

- `tileType="Bubble"` enables bubble rendering.
- `bubbleType="Sector"` changes the bubble into a sector-style visualization.
- `<e-cellsettings-bubblesize>` controls the minimum and maximum rendered bubble size.
- Use values in a predictable range, such as `0` to `100`, for progress-style data.

### Sector-Based Bubbles Use Cases

- Project progress.
- Completion percentage.
- Task allocation.
- Budget usage.
- Goal achievement.
- Resource allocation percentage.

## Size and Color Combined

### Size and Color Combined Overview

Use `SizeAndColor` when the HeatMap must communicate two visual dimensions together. For example:

- Bubble size can represent unit volume.
- Bubble color can represent margin, score, or intensity.

If your installed Syncfusion ASP.NET Core package supports bubble-specific size and color field mapping, configure that mapping using the supported child Tag Helper syntax for your version. If separate bubble size and color field mapping is not available, use `valueMapping` for the primary metric and the palette for color scaling of that same mapped metric.

### Size and Color Combined Configuration

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="sizeAndColorBubbleHeatmap"
    dataSource="@Model.DualMetricData"
    width="100%"
    height="500px"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DualMetricProductLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Product"
        valueMapping="Revenue">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="SizeAndColor"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="60%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.MarginPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Size and Color Combined PageModel with Dual Metrics

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
            "January", "February"
        };

        public string[] DualMetricProductLabels { get; set; } =
        {
            "Widget A", "Widget B"
        };

        public List<DualMetricBubbleData> DualMetricData { get; set; } = new List<DualMetricBubbleData>();

        public List<HeatMapPalette> MarginPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#1E90FF", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#FF4500", Label = "High" }
        };

        public void OnGet()
        {
            DualMetricData = new List<DualMetricBubbleData>
            {
                new DualMetricBubbleData
                {
                    Product = "Widget A",
                    Month = "January",
                    Revenue = 50000,
                    Profit = 75
                },
                new DualMetricBubbleData
                {
                    Product = "Widget A",
                    Month = "February",
                    Revenue = 60000,
                    Profit = 82
                },
                new DualMetricBubbleData
                {
                    Product = "Widget B",
                    Month = "January",
                    Revenue = 35000,
                    Profit = 45
                },
                new DualMetricBubbleData
                {
                    Product = "Widget B",
                    Month = "February",
                    Revenue = 42000,
                    Profit = 55
                }
            };
        }
    }

    public class DualMetricBubbleData
    {
        public string Product { get; set; } = string.Empty;

        public string Month { get; set; } = string.Empty;

        public double Revenue { get; set; }

        public double Profit { get; set; }
    }
}
```

## Bubble Data Mapping

### Bubble Data Mapping Data Structure

Use a strongly typed model when bubble size and color are driven by named fields.

```csharp
public class BubbleHeatMapData
{
    public string Product { get; set; } = string.Empty;

    public string Month { get; set; } = string.Empty;

    public double Revenue { get; set; }

    public double Profit { get; set; }
}
```

### Bubble Data Mapping Configuration

For JSON-style object binding, always configure `e-heatmap-datasourcesettings`.

```cshtml
<e-heatmap-datasourcesettings
    isJsonData="true"
    adaptorType="Cell"
    xDataMapping="Month"
    yDataMapping="Product"
    valueMapping="Revenue">
</e-heatmap-datasourcesettings>
```

Use nested bubble size configuration inside `e-heatmap-cellsettings`.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Size"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="50%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

### Bubble Data Mapping Property Specifications

| Property | Purpose |
|----------|---------|
| `xDataMapping` | Maps the source field used for the X-axis cell position. |
| `yDataMapping` | Maps the source field used for the Y-axis cell position. |
| `valueMapping` | Maps the primary numeric value used by the HeatMap. |
| `tileType` | Defines whether cells render as regular rectangles or bubbles. |
| `bubbleType` | Defines whether bubble visuals use size, color, sector, or size and color. |
| `<e-cellsettings-bubblesize>` | Defines the bubble size range. |
| `minimum` | Defines the minimum bubble size. |
| `maximum` | Defines the maximum bubble size. |
| `isInversedBubbleSize` | Reverses the bubble size calculation. |

### Bubble Data Mapping Advanced Example

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="advancedBubbleHeatmap"
    dataSource="@Model.AdvancedBubbleData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.QuarterLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Quarter"
        yDataMapping="Region"
        valueMapping="Transactions">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="SizeAndColor"
        showLabel="true">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="60%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.EfficiencyPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<AdvancedBubbleDataPoint> AdvancedBubbleData { get; set; } = new List<AdvancedBubbleDataPoint>
{
    new AdvancedBubbleDataPoint
    {
        Region = "North America",
        Quarter = "Q1",
        Transactions = 1500,
        Efficiency = 88
    },
    new AdvancedBubbleDataPoint
    {
        Region = "Europe",
        Quarter = "Q1",
        Transactions = 1200,
        Efficiency = 92
    }
};

public List<HeatMapPalette> EfficiencyPalette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 50, Color = "#FF6B6B", Label = "Low" },
    new HeatMapPalette { Value = 75, Color = "#FFD166", Label = "Medium" },
    new HeatMapPalette { Value = 100, Color = "#51CF66", Label = "High" }
};

public class AdvancedBubbleDataPoint
{
    public string Region { get; set; } = string.Empty;

    public string Quarter { get; set; } = string.Empty;

    public double Transactions { get; set; }

    public double Efficiency { get; set; }
}
```

## Configuration Patterns

### Pattern 1: Size-Only Visualization

Use this pattern for simple magnitude representation.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Size"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="50%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

### Pattern 2: Color-Only with Legend

Use this pattern when value intensity should be communicated through color and explained by a legend.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Color"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="50%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>

<e-heatmap-palettesettings
    type="Gradient"
    palette="@Model.PerformancePalette">
</e-heatmap-palettesettings>

<e-heatmap-legendsettings
    visible="true"
    position="Right"
    showLabel="true">
</e-heatmap-legendsettings>
```

### Pattern 3: Sector-Based Progress

Use this pattern for progress, completion, or allocation visualization.

```cshtml
<e-heatmap-titlesettings
    text="Project Progress Dashboard">
</e-heatmap-titlesettings>

<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Sector"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="70%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

### Pattern 4: Dual-Dimension Analysis

Use this pattern when size and color should both communicate analytical meaning.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="SizeAndColor"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="60%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>

<e-heatmap-palettesettings
    type="Gradient"
    palette="@Model.MarginPalette">
</e-heatmap-palettesettings>

<e-heatmap-legendsettings
    visible="true"
    position="Right">
</e-heatmap-legendsettings>
```

### Pattern 5: Inverted Size for Anomaly Detection

Use this pattern when lower values should be visually emphasized.

```cshtml
<e-heatmap-cellsettings
    tileType="Bubble"
    bubbleType="Size"
    isInversedBubbleSize="true"
    showLabel="true">

    <e-cellsettings-bubblesize
        minimum="20%"
        maximum="60%">
    </e-cellsettings-bubblesize>

</e-heatmap-cellsettings>
```

## Complete Example: Sales Analysis Dashboard

This example shows a complete Razor Pages bubble HeatMap implementation where:

- Bubble size represents units sold.
- Bubble color represents the mapped value intensity.
- Product and month define the HeatMap matrix position.

### Sales Analysis Dashboard Razor Page

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="salesBubbleHeatmap"
    dataSource="@Model.SalesAnalysisData"
    width="100%"
    height="600px"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-titlesettings
        text="Sales Volume Bubble Analysis"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.SalesMonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.SalesProductLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Product"
        valueMapping="Units">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        tileType="Bubble"
        bubbleType="SizeAndColor"
        showLabel="true"
        textStyle="@Model.CellTextStyle">

        <e-cellsettings-bubblesize
            minimum="20%"
            maximum="60%">
        </e-cellsettings-bubblesize>

    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.SalesPalette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

### Sales Analysis Dashboard PageModel

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] SalesMonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar"
        };

        public string[] SalesProductLabels { get; set; } =
        {
            "Laptop", "Phone", "Tablet"
        };

        public List<SalesAnalysisDataPoint> SalesAnalysisData { get; set; } = new List<SalesAnalysisDataPoint>();

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
            FontWeight = "600",
            Size = "12px",
            Color = "#111111"
        };

        public List<HeatMapPalette> SalesPalette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 150, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 350, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            SalesAnalysisData = new List<SalesAnalysisDataPoint>
            {
                new SalesAnalysisDataPoint { Product = "Laptop", Month = "Jan", Units = 150, Margin = 42 },
                new SalesAnalysisDataPoint { Product = "Laptop", Month = "Feb", Units = 175, Margin = 45 },
                new SalesAnalysisDataPoint { Product = "Laptop", Month = "Mar", Units = 200, Margin = 48 },

                new SalesAnalysisDataPoint { Product = "Phone", Month = "Jan", Units = 300, Margin = 38 },
                new SalesAnalysisDataPoint { Product = "Phone", Month = "Feb", Units = 280, Margin = 40 },
                new SalesAnalysisDataPoint { Product = "Phone", Month = "Mar", Units = 320, Margin = 42 },

                new SalesAnalysisDataPoint { Product = "Tablet", Month = "Jan", Units = 100, Margin = 35 },
                new SalesAnalysisDataPoint { Product = "Tablet", Month = "Feb", Units = 120, Margin = 36 },
                new SalesAnalysisDataPoint { Product = "Tablet", Month = "Mar", Units = 140, Margin = 38 }
            };
        }
    }

    public class SalesAnalysisDataPoint
    {
        public string Product { get; set; } = string.Empty;

        public string Month { get; set; } = string.Empty;

        public double Units { get; set; }

        public double Margin { get; set; }
    }
}
```

This dashboard communicates:

- Bubble size through the `Units` value.
- Bubble color through the configured palette.
- Matrix position through `Product` and `Month`.
- Product comparison by row.
- Month comparison by column.
