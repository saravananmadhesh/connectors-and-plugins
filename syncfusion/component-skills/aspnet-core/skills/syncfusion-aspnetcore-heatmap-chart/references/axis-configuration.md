# Axis Configuration

## Table of Contents
- [Axis Types](#axis-types)
  - [Category Axis](#category-axis)
  - [Numeric Axis](#numeric-axis)
  - [DateTime Axis](#datetime-axis)
- [Axis Positioning](#axis-positioning)
  - [Inversed Axis](#inversed-axis)
  - [Opposed Axis](#opposed-axis)
- [Axis Label Customization](#axis-label-customization)
  - [Text Style Configuration](#text-style-configuration)
  - [Label Rotation](#label-rotation)
  - [Handle Intersecting Labels](#handle-intersecting-labels)
- [Label Formatting and Rotation](#label-formatting-and-rotation)
  - [Label Format](#label-format)
  - [DateTime Formatting](#datetime-formatting)
- [Axis Intervals](#axis-intervals)
  - [Defining Label Intervals](#defining-label-intervals)
  - [DateTime Interval Type](#datetime-interval-type)
  - [Label Increment](#label-increment)
- [Multilevel Labels](#multilevel-labels)
  - [Basic Multilevel Configuration](#basic-multilevel-configuration)
  - [Multilevel Customization](#multilevel-customization)
- [Advanced Configurations](#advanced-configurations)
  - [Complete Axis Setup Example](#complete-axis-setup-example)
  - [DateTime Axis Example](#datetime-axis-example)
  - [Show Limited DateTime Labels](#show-limited-datetime-labels)
  - [Numeric Range with Line Breaks](#numeric-range-with-line-breaks)
  - [Category Axis with Line Breaks in Labels](#category-axis-with-line-breaks-in-labels)

## Axis Types

The Syncfusion ASP.NET Core HeatMap Chart supports different axis value types for representing category, numeric, and date-time based matrix data.

**Important:** Unlike other Syncfusion chart components, the HeatMap axis does NOT support a `title` property. 

For Razor Pages, the recommended approach is:

- Keep HeatMap markup in `Pages/Index.cshtml`.
- Keep labels, data, palettes, and reusable configuration objects in `Pages/Index.cshtml.cs`.
For Razor Pages, the recommended approach is:

- Keep HeatMap markup in `Pages/Index.cshtml`.
- Keep labels, data, palettes, and reusable configuration objects in `Pages/Index.cshtml.cs`.
- Bind values through strongly typed PageModel properties using `@Model`.
- Use `e-heatmap-datasourcesettings` when binding JSON-style object collections.

### Category Axis

Use a category axis for non-numeric labels such as months, quarters, regions, departments, products, or teams.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="categoryHeatmap"
    dataSource="@Model.CategoryData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
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
        public string[] CategoryXAxisLabels { get; set; } =
        {
            "Q1", "Q2", "Q3", "Q4"
        };

        public string[] CategoryYAxisLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<HeatMapDataPoint> CategoryData { get; set; } = new List<HeatMapDataPoint>();

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            CategoryData = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Q1", YValue = "North", Value = 72 },
                new HeatMapDataPoint { XValue = "Q2", YValue = "North", Value = 84 },
                new HeatMapDataPoint { XValue = "Q3", YValue = "South", Value = 46 },
                new HeatMapDataPoint { XValue = "Q4", YValue = "East", Value = 91 },
                new HeatMapDataPoint { XValue = "Q1", YValue = "West", Value = 63 }
            };
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

Use cases:

- Product names.
- Geographic regions.
- Time periods such as months or quarters.
- Department names.
- Business category classifications.

### Numeric Axis

Use a numeric axis when the X and Y values represent numeric positions, numeric ranges, scores, or indexed coordinates.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="numericHeatmap"
    dataSource="@Model.NumericData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="100"
        interval="20">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="50"
        interval="10">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<NumericHeatMapDataPoint> NumericData { get; set; } = new List<NumericHeatMapDataPoint>
{
    new NumericHeatMapDataPoint { XValue = 0, YValue = 0, Value = 12 },
    new NumericHeatMapDataPoint { XValue = 20, YValue = 10, Value = 38 },
    new NumericHeatMapDataPoint { XValue = 40, YValue = 20, Value = 65 },
    new NumericHeatMapDataPoint { XValue = 60, YValue = 30, Value = 82 },
    new NumericHeatMapDataPoint { XValue = 80, YValue = 40, Value = 91 },
    new NumericHeatMapDataPoint { XValue = 100, YValue = 50, Value = 76 }
};

public class NumericHeatMapDataPoint
{
    public double XValue { get; set; }

    public double YValue { get; set; }

    public double Value { get; set; }
}
```

Common numeric axis properties:

| Property | Purpose |
|----------|---------|
| `minimum` | Defines the lowest value on the axis. |
| `maximum` | Defines the highest value on the axis. |
| `interval` | Defines the gap between displayed axis labels. |

Use cases:

- Coordinate systems.
- Temperature ranges.
- Score distributions.
- Numeric indices.
- Age or value ranges.

### DateTime Axis

Use a date-time axis for time-series HeatMap data such as daily activity, monthly revenue, seasonal patterns, or historical trends.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="dateTimeHeatmap"
    dataSource="@Model.DateTimeData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="DateTime"
        minimum="2024-01-01"
        maximum="2024-12-31"
        intervalType="Months"
        interval="1"
        labelFormat="MMM">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DateTimeYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Date"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using System;
using System.Collections.Generic;

public string[] DateTimeYAxisLabels { get; set; } =
{
    "North", "South", "East", "West"
};

public List<DateTimeHeatMapDataPoint> DateTimeData { get; set; } = new List<DateTimeHeatMapDataPoint>
{
    new DateTimeHeatMapDataPoint { Date = new DateTime(2024, 1, 1), Region = "North", Sales = 1000 },
    new DateTimeHeatMapDataPoint { Date = new DateTime(2024, 2, 1), Region = "North", Sales = 1200 },
    new DateTimeHeatMapDataPoint { Date = new DateTime(2024, 3, 1), Region = "South", Sales = 900 },
    new DateTimeHeatMapDataPoint { Date = new DateTime(2024, 4, 1), Region = "East", Sales = 1500 },
    new DateTimeHeatMapDataPoint { Date = new DateTime(2024, 5, 1), Region = "West", Sales = 1320 }
};

public class DateTimeHeatMapDataPoint
{
    public DateTime Date { get; set; }

    public string Region { get; set; } = string.Empty;

    public double Sales { get; set; }
}
```

Common date-time axis properties:

| Property | Purpose |
|----------|---------|
| `minimum` | Defines the start date. |
| `maximum` | Defines the end date. |
| `interval` | Defines the interval value. |
| `intervalType` | Defines whether the interval is based on years, months, days, hours, or minutes. |
| `labelFormat` | Defines how the date labels are displayed. |

Use cases:

- Daily or hourly activity tracking.
- Seasonal analysis.
- Historical trend visualization.
- Month-wise or year-wise comparison.

## Axis Positioning

### Inversed Axis

Use `isInversed="true"` to reverse the axis direction.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="inversedHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels"
        isInversed="true">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels"
        isInversed="true">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Use cases:

- Displaying values in descending order.
- Matching a required reading direction.
- Emphasizing recent or high-priority values.
- Aligning with custom dashboard layouts.

### Opposed Axis

Use `opposedPosition="true"` to place axis labels on the opposite side of their default location.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="opposedHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels"
        opposedPosition="true">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels"
        opposedPosition="true">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Use cases:

- Moving X-axis labels to the opposite side.
- Moving Y-axis labels to the opposite side.
- Improving readability when legends or titles occupy layout space.
- Matching an existing dashboard design.

## Axis Label Customization

### Text Style Configuration

Use `HeatMapFont` in `Index.cshtml.cs` and bind it to the axis `textStyle` property.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="axisStyleHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels"
        textStyle="@Model.AxisTextStyle">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels"
        textStyle="@Model.AxisTextStyle">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public HeatMapFont AxisTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    FontStyle = "Normal",
    FontWeight = "600",
    Size = "12px",
    Color = "#333333"
};
```

Common axis text style properties:

| Property | Example Values |
|----------|----------------|
| `FontFamily` | `Segoe UI`, `Arial`, `Georgia` |
| `FontStyle` | `Normal`, `Italic` |
| `FontWeight` | `400`, `600`, `Bold`, `Normal` |
| `Size` | `10px`, `12px`, `14px`, `20px` |
| `Color` | `#333333`, `#000000`, `red` |

### Label Rotation

Use `labelRotation` to rotate axis labels when the labels are long or crowded.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="rotatedLabelHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels"
        labelRotation="45">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common rotation values:

| Rotation | Usage |
|----------|-------|
| `0` | Default horizontal display. |
| `45` | Common diagonal layout for readability. |
| `90` | Vertical display for long labels. |
| `-45` | Alternative diagonal direction. |

### Handle Intersecting Labels

Use `labelIntersectAction` when axis labels overlap.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="intersectLabelHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.CategoryXAxisLabels"
        labelIntersectAction="Rotate45    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common intersection actions:

| Action | Behavior |
|--------|----------|
| `None` | Displays labels normally and allows overlap. |
| `Trim` | Trims labels when space is insufficient. |
| `Rotate45` | Rotates overlapping labels to 45 degrees. |
| `MultipleRows` | Places labels across multiple rows. |

## Label Formatting and Rotation

### Label Format

Use `labelFormat` to control numeric axis label formatting.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="numericFormatHeatmap"
    dataSource="@Model.NumericData">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="100"
        interval="20"
        labelFormat="N0">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="50"
        interval="10"
        labelFormat="N0">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common numeric label formats:

| Format | Example Input | Example Output |
|--------|---------------|----------------|
| `N0` | `12345` | `12,345` |
| `N2` | `123.456` | `123.46` |
| `P0` | `0.85` | `85%` |
| `C2` | `12345` | `$12,345.00` |

### DateTime Formatting

Use `labelFormat` with a DateTime axis to format date labels.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="dateFormatHeatmap"
    dataSource="@Model.DateTimeData">

    <e-heatmap-xaxis
        valueType="DateTime"
        minimum="2024-01-01"
        maximum="2024-12-31"
        intervalType="Months"
        interval="1"
        labelFormat="MMM yyyy">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DateTimeYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Date"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common date format patterns:

| Format | Example Output |
|--------|----------------|
| `yyyy` | `2024` |
| `MM` | `01` |
| `MMM` | `Jan` |
| `dd` | `15` |
| `MMM yyyy` | `Jan 2024` |
| `yyyy-MM-dd` | `2024-01-15` |

## Axis Intervals

### Defining Label Intervals

Use `interval` to control the spacing between axis labels.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="intervalHeatmap"
    dataSource="@Model.NumericData">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="100"
        interval="10">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="50"
        interval="5">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

This configuration displays X-axis labels at `0`, `10`, `20`, and continues up to `100`.

### DateTime Interval Type

Use `intervalType` with `interval` for date-time axes.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="dateIntervalHeatmap"
    dataSource="@Model.DateTimeData">

    <e-heatmap-xaxis
        valueType="DateTime"
        minimum="2024-01-01"
        maximum="2024-12-31"
        intervalType="Months"
        interval="3"
        labelFormat="MMM">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DateTimeYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Date"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common date-time interval types:

| Interval Type | Usage |
|---------------|-------|
| `Years` | Year-wise intervals. |
| `Months` | Month-wise intervals. |
| `Days` | Day-wise intervals. |
| `Hours` | Hour-wise intervals. |
| `Minutes` | Minute-wise intervals. |

### Label Increment

Use label increment when you need to reduce label density and show labels at a fixed increment.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="incrementHeatmap"
    dataSource="@Model.NumericData">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="100"
        increment="5">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="50"
        increment="5">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Use `increment` carefully with the actual axis type and dataset shape. If the labels still appear crowded, use `labelIntersectAction`, `labelRotation`, or reduce the label count using `interval`.

## Multilevel Labels

### Basic Multilevel Configuration

Multilevel labels are useful for grouping axis labels into higher-level categories such as quarters, years, departments, or product groups.

For maintainable Razor Pages examples, define the main axis labels in `Index.cshtml.cs`. If the installed HeatMap Tag Helper package supports nested multilevel label tags, use the supported nested Tag Helper syntax in `Index.cshtml`.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="multiLevelHeatmap"
    dataSource="@Model.MonthlyData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">

        <e-heatmap-x-multilevellabels>
            <e-heatmap-x-multilevellabel
                text="Q1"
                alignment="Center">
                <e-heatmap-x-categories>
                    <e-heatmap-x-category start="0" end="2"></e-heatmap-x-category>
                </e-heatmap-x-categories>
            </e-heatmap-x-multilevellabel>

            <e-heatmap-x-multilevellabel
                text="Q2"
                alignment="Center">
                <e-heatmap-x-categories>
                    <e-heatmap-x-category start="3" end="5"></e-heatmap-x-category>
                </e-heatmap-x-categories>
            </e-heatmap-x-multilevellabel>
        </e-heatmap-x-multilevellabels>
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.ProductLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public string[] MonthLabels { get; set; } =
{
    "Jan", "Feb", "Mar", "Apr", "May", "Jun"
};

public string[] ProductLabels { get; set; } =
{
    "Product A", "Product B", "Product C"
};

public List<HeatMapDataPoint> MonthlyData { get; set; } = new List<HeatMapDataPoint>
{
    new HeatMapDataPoint { XValue = "Jan", YValue = "Product A", Value = 73 },
    new HeatMapDataPoint { XValue = "Feb", YValue = "Product A", Value = 39 },
    new HeatMapDataPoint { XValue = "Mar", YValue = "Product B", Value = 53 },
    new HeatMapDataPoint { XValue = "Apr", YValue = "Product B", Value = 38 },
    new HeatMapDataPoint { XValue = "May", YValue = "Product C", Value = 66 },
    new HeatMapDataPoint { XValue = "Jun", YValue = "Product C", Value = 90 }
};
```

Visual grouping:

```text
        Q1              Q2
    Jan Feb Mar     Apr May Jun
```

### Multilevel Customization

When supported by your installed package version, customize multilevel labels using alignment, overflow, text style, and border settings.

```cshtml
<e-heatmap-x-multilevellabel
    text="Sales Region"
    alignment="Center"
    overflow="Wrap"
    maximumTextWidth="120">
</e-heatmap-x-multilevellabel>
```

Common multilevel label settings:

| Property | Purpose |
|----------|---------|
| `text` | Defines the multilevel label text. |
| `alignment` | Defines text alignment such as `Near`, `Center`, or `Far`. |
| `overflow` | Defines overflow behavior such as `Wrap` or `Trim`. |
| `maximumTextWidth` | Defines the maximum text width before overflow behavior is applied. |

If the multilevel label Tag Helper names are not recognized in your installed Syncfusion ASP.NET Core package, keep the main category labels and avoid unsupported nested tags until the package version is confirmed.

## Advanced Configurations

### Complete Axis Setup Example

This complete example demonstrates category axes, label styling, axis positioning, label rotation, data source mapping, palette configuration, and cell labels using both `Index.cshtml` and `Index.cshtml.cs`.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="completeAxisHeatmap"
    dataSource="@Model.CompleteAxisData"
    width="100%"
    height="600px"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-titlesettings
        text="Regional Sales by Month"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels"
        opposedPosition="false"
        labelRotation="45"
        labelIntersectAction="Rotate45"
        textStyle="@Model.AxisTextStyle/e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}"
        textStyle="@Model.CellTextStyle">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
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
            "Jan", "Feb", "Mar", "Apr", "May", "Jun"
        };

        public string[] RegionLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public List<HeatMapDataPoint> CompleteAxisData { get; set; } = new List<HeatMapDataPoint>();

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "18px",
            Color = "#222222"
        };

        public HeatMapFont AxisTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "600",
            Size = "12px",
            Color = "#333333"
        };

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "400",
            Size = "12px",
            Color = "#111111"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            CompleteAxisData = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "North", Value = 73 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "North", Value = 39 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "North", Value = 26 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "North", Value = 94 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "South", Value = 93 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "South", Value = 58 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "South", Value = 53 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "South", Value = 26 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "East", Value = 99 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "East", Value = 28 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "East", Value = 22 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "East", Value = 66 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "West", Value = 14 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "West", Value = 26 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "West", Value = 97 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "West", Value = 69 }
            };
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### DateTime Axis Example

Use this example when the X-axis represents dates and the Y-axis represents categories.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="dateTimeAxisHeatmap"
    dataSource="@Model.DateTimeData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="DateTime"
        minimum="2024-01-01"
        maximum="2024-12-31"
        intervalType="Months"
        interval="1"
        labelFormat="MMM">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DateTimeYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Date"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

### Show Limited DateTime Labels

Use `showLabelOn` to display date-time labels only at specific date boundaries.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="limitedDateLabelHeatmap"
    dataSource="@Model.DateTimeData">

    <e-heatmap-xaxis
        valueType="DateTime"
        minimum="2024-01-01"
        maximum="2024-12-31"
        intervalType="Months"
        interval="1"
        labelFormat="MMM"
        showLabelOn="Months">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DateTimeYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Date"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Common `showLabelOn` values:

| Value | Behavior |
|-------|----------|
| `None` | Uses normal interval-based label display. |
| `Years` | Shows labels on year boundaries. |
| `Months` | Shows labels on month boundaries. |
| `Days` | Shows labels on day boundaries. |
| `Minutes` | Shows labels on minute boundaries. |

### Numeric Range with Line Breaks

For numeric axes, prefer label rotation, label intersect action, or reduced interval density when labels are crowded.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="numericWrapHeatmap"
    dataSource="@Model.NumericData">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="100"
        interval="20"
        labelIntersectAction="MultipleRows   </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Recommended options for crowded numeric labels:

- Use `labelRotation="45"`.
- Use `labelIntersectAction="Rotate45"`.
- Use `labelIntersectAction="MultipleRows"`.
- Increase `interval` to reduce label count.

### Category Axis with Line Breaks in Labels

For category labels that need multiple lines, include HTML line breaks in the label strings.

#### Pages/Index.cshtml.cs

```csharp
public string[] MultiLineLabels { get; set; } =
{
    "Jan<br>2024",
    "Feb<br>2024",
    "Mar<br>2024"
};
```

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="multiLineCategoryHeatmap"
    dataSource="@Model.CategoryData">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MultiLineLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.CategoryYAxisLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Expected label layout:

```text
Jan     Feb     Mar
2024    2024    2024
```
