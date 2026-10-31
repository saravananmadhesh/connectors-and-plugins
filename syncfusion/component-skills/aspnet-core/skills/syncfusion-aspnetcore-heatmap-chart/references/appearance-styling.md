# Appearance and Styling

## Table of Contents
- [Cell Customization](#cell-customization)
  - [Border Configuration](#border-configuration)
  - [Border Properties](#border-properties)
  - [Cell Border Examples](#cell-border-examples)
  - [Cell Highlighting](#cell-highlighting)
  - [Color Gradient Mode](#color-gradient-mode)
- [Background and Margins](#background-and-margins)
  - [Background Color](#background-color)
  - [Margin Configuration](#margin-configuration)
  - [Common Patterns](#common-patterns)
- [Title Configuration](#title-configuration)
  - [Basic Title](#basic-title)
  - [Title with Custom Styling](#title-with-custom-styling)
  - [Title Alignment Options](#title-alignment-options)
- [Data Labels](#data-labels)
  - [Enable or Disable Data Labels](#enable-or-disable-data-labels)
  - [Label Format](#label-format)
  - [Hide Labels on Large Datasets](#hide-labels-on-large-datasets)
  - [Conditional Label Display](#conditional-label-display)
- [Label Templates](#label-templates)
  - [Basic Template](#basic-template)
  - [Template with X and Y Labels](#template-with-x-and-y-labels)
  - [Available Template Variables](#available-template-variables)
  - [Complex Template Example](#complex-template-example)
  - [HTML Template](#html-template)
  - [Data Binding in Templates](#data-binding-in-templates)
- [Text Styling](#text-styling)
  - [Label Text Style](#label-text-style)
  - [Text Style Properties](#text-style-properties)
  - [Handling Label Overflow](#handling-label-overflow)
  - [Bold and Italic Labels](#bold-and-italic-labels)
- [Advanced Styling](#advanced-styling)
  - [Customize Individual Cells](#customize-individual-cells)
  - [Color Mapping with Value Ranges](#color-mapping-with-value-ranges)
  - [Transparency Opacity](#transparency-opacity)
  - [Complete Styling Example](#complete-styling-example)
  - [RTL Right-to-Left Support](#rtl-right-to-left-support)

## Cell Customization

### Border Configuration

Cell appearance can be customized through `cellSettings`. For ASP.NET Core Razor Pages, keep the HeatMap markup in `Index.cshtml` and move reusable configuration values into `Index.cshtml.cs`.

If your installed Syncfusion ASP.NET Core package does not expose a strongly typed border class for HeatMap cell settings, avoid binding a custom `CellBorder` object directly. Use nested Tag Helper border configuration only if it is supported in your installed package version. Otherwise, use `cellRender` for runtime styling.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    showTooltip="true"
    renderingMode="Auto">

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
        public List<HeatMapDataPoint> DataSource { get; set; } = new List<HeatMapDataPoint>();

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            Size = "12px",
            FontWeight = "600",
            Color = "#333333"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#C2E7EC", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#87C1C9", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#1B7280", Label = "High" }
        };

        public void OnGet()
        {
            DataSource = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product A", Value = 73 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product A", Value = 39 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product B", Value = 53 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product C", Value = 66 }
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

### Border Properties

Common border concepts used for cell styling are:

| Property | Type | Purpose |
|----------|------|---------|
| `width` | number | Defines the cell border thickness in pixels. |
| `color` | string | Defines the cell border color. |
| `radius` | number | Defines rounded corner radius when supported by the rendered cell configuration. |

### Cell Border Examples

Use the following pattern only when your installed HeatMap Tag Helper supports nested border tags for cell settings.

#### Minimal Border

```cshtml
<e-heatmap-cellsettings showLabel="true">
    <e-heatmap-cellsettings-border
        width="1"
        color="#E0E0E0">
    </e-heatmap-cellsettings-border>
</e-heatmap-cellsettings>
```

#### Bold Border

```cshtml
<e-heatmap-cellsettings showLabel="true">
    <e-heatmap-cellsettings-border
        width="3"
        color="#000000">
    </e-heatmap-cellsettings-border>
</e-heatmap-cellsettings>
```

#### Rounded Cells

```cshtml
<e-heatmap-cellsettings showLabel="true">
    <e-heatmap-cellsettings-border
        width="1"
        color="#888888"
        radius="4">
    </e-heatmap-cellsettings-border>
</e-heatmap-cellsettings>
```

If nested border configuration is not recognized by your package version, use the `cellRender` event instead.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    cellRender="onCellRender">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onCellRender(args) {
        if (args.value > 75) {
            args.cellColor = '#1B7280';
        }
    }
</script>
```

### Cell Highlighting

Cell highlighting improves interactivity when users move the pointer over HeatMap cells.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    renderingMode="SVG">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        enableCellHighlighting="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

Features:

- Highlights cells on hover.
- Improves visual tracking for dense data.
- Best used with SVG rendering.
- Can be disabled for large datasets to improve performance.

### Color Gradient Mode

The color gradient mode controls how values are normalized for color calculation.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-palettesettings
        type="Gradient"
        colorGradientMode="Table"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

Gradient modes:

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Table` | Calculates color intensity based on the complete dataset. | Overall comparison across the entire HeatMap. |
| `Row` | Calculates color intensity independently for each row. | Row-by-row comparison. |
| `Column` | Calculates color intensity independently for each column. | Column-by-column comparison. |

#### Row Mode

```cshtml
<e-heatmap-palettesettings
    type="Gradient"
    colorGradientMode="Row"
    palette="@Model.Palette">
</e-heatmap-palettesettings>
```

#### Column Mode

```cshtml
<e-heatmap-palettesettings
    type="Gradient"
    colorGradientMode="Column"
    palette="@Model.Palette">
</e-heatmap-palettesettings>
```

## Background and Margins

### Background Color

Use `backgroundColor` to set the HeatMap background.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    backgroundColor="#F5F5F5">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Margin Configuration

Use `e-heatmap-margin` to configure spacing around the HeatMap plot area.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-margin
        left="40"
        right="40"
        top="40"
        bottom="40">
    </e-heatmap-margin>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Margin properties:

- `left`: Defines the left spacing in pixels.
- `right`: Defines the right spacing in pixels.
- `top`: Defines the top spacing in pixels.
- `bottom`: Defines the bottom spacing in pixels.

### Common Patterns

#### Compact Layout

```cshtml
<e-heatmap-margin
    left="20"
    right="20"
    top="20"
    bottom="20">
</e-heatmap-margin>
```

#### Spacious Layout

```cshtml
<e-heatmap-margin
    left="60"
    right="60"
    top="60"
    bottom="60">
</e-heatmap-margin>
```

#### Extra Space for Right Legend

```cshtml
<e-heatmap-margin
    left="40"
    right="100"
    top="40"
    bottom="40">
</e-heatmap-margin>
```

## Title Configuration

### Basic Title

Use `titleSettings` to define the title text and alignment.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-titlesettings
        text="Sales Performance HeatMap"
        textAlign="Center">
    </e-heatmap-titlesettings>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Title with Custom Styling

The recommended Razor Pages approach is to define the title font object in `Index.cshtml.cs` and bind it in `Index.cshtml`.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-titlesettings
        text="Monthly Revenue Analysis"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

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
public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    FontStyle = "Normal",
    FontWeight = "Bold",
    Size = "18px",
    Color = "#333333"
};
```

### Title Alignment Options

| Option | Positioning |
|--------|-------------|
| `Center` | Centers the title horizontally. |
| `Left` | Aligns the title to the left. |
| `Right` | Aligns the title to the right. |

## Data Labels

### Enable or Disable Data Labels

Use `showLabel` to show or hide values inside HeatMap cells.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Label Format

Use `format` to control how cell values are displayed.

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    format="{value}">
</e-heatmap-cellsettings>
```

For numeric formatting, use a format suitable for the HeatMap label rendering behavior in your installed version. Common display patterns include numeric values, percentages, and currency-like values through custom label templates or value formatting.

### Hide Labels on Large Datasets

For large datasets, disable labels to improve rendering performance.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    renderingMode="Canvas"
    showTooltip="false">

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Conditional Label Display

Use `cellRender` to customize labels or cell appearance conditionally.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    cellRender="onCellRender">

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

<script>
    function onCellRender(args) {
        if (args.value < 50) {
            args.displayText = '';
        }
    }
</script>
```

## Label Templates

### Basic Template

Use `labelTemplate` when the displayed cell text should be customized beyond the raw value.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-cellsettings
        showLabel="true"
        labelTemplate="${value}">
    </e-heatmap-cellsettings>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Template with X and Y Labels

Do not place `xDataMapping`, `yDataMapping`, or `valueDataMapping` directly on the root `<ejs-heatmap>` tag. Use `e-heatmap-datasourcesettings`.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        labelTemplate="${xLabel}: ${value}">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

### Available Template Variables

Common template variables include:

- `${value}`: Displays the cell value.
- `${xLabel}`: Displays the X-axis label for the cell.
- `${yLabel}`: Displays the Y-axis label for the cell.

### Complex Template Example

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    labelTemplate="Sales: ${value}">
</e-heatmap-cellsettings>
```

### HTML Template

HTML templates can be used when the cell label requires richer formatting. Keep the template simple for performance.

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    labelTemplate="<span style='font-weight:600;'>${value}</span>">
</e-heatmap-cellsettings>
```

### Data Binding in Templates

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    labelTemplate="${yLabel} - ${value}%">
</e-heatmap-cellsettings>
```

## Text Styling

### Label Text Style

The recommended Razor Pages approach is to configure label text style in `Index.cshtml.cs`.

#### Pages/Index.cshtml

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    textStyle="@Model.CellTextStyle">
</e-heatmap-cellsettings>
```

#### Pages/Index.cshtml.cs

```csharp
public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    FontStyle = "Normal",
    FontWeight = "600",
    Size = "12px",
    Color = "#333333"
};
```

### Text Style Properties

| Property | Example Values | Purpose |
|----------|----------------|---------|
| `FontFamily` | `Segoe UI`, `Arial` | Defines the font family. |
| `FontStyle` | `Normal`, `Italic` | Defines normal or italic text. |
| `FontWeight` | `400`, `600`, `Bold` | Defines text weight. |
| `Size` | `10px`, `12px`, `14px` | Defines text size. |
| `Color` | `#000000`, `#333333` | Defines text color. |

### Handling Label Overflow

For dense HeatMaps, reduce text size or hide labels. If your installed package supports text overflow settings, configure them through the supported text style or cell setting APIs.

```csharp
public HeatMapFont CompactCellTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    Size = "10px",
    FontWeight = "400",
    Color = "#222222"
};
```

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    textStyle="@Model.CompactCellTextStyle">
</e-heatmap-cellsettings>
```

For very dense datasets, prefer:

```cshtml
<e-heatmap-cellsettings
    showLabel="false">
</e-heatmap-cellsettings>
```

### Bold and Italic Labels

```csharp
public HeatMapFont EmphasisCellTextStyle { get; set; } = new HeatMapFont
{
    FontFamily = "Segoe UI",
    FontWeight = "Bold",
    FontStyle = "Italic",
    Size = "14px",
    Color = "#2C3E50"
};
```

```cshtml
<e-heatmap-cellsettings
    showLabel="true"
    textStyle="@Model.EmphasisCellTextStyle">
</e-heatmap-cellsettings>
```

## Advanced Styling

### Customize Individual Cells

Use `cellRender` to customize cells based on their values.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    cellRender="onCellRender">

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

<script>
    function onCellRender(args) {
        if (args.value > 80) {
            args.cellColor = '#27AE60';
        }

        if (args.value < 30) {
            args.cellColor = '#C0392B';
        }

        if (args.value >= 50 && args.value <= 70) {
            args.cellColor = '#F39C12';
        }
    }
</script>
```

### Color Mapping with Value Ranges

Use `paletteSettings.palette` with a strongly typed `List<HeatMapPalette>` in `Index.cshtml.cs`.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

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
public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
{
    new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
    new HeatMapPalette { Value = 50, Color = "#F1C40F", Label = "Medium" },
    new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
};
```

### Transparency Opacity

If opacity customization is needed per cell, use `cellRender` where the event argument supports cell appearance changes in your installed package version. If opacity is not supported directly in the HeatMap event argument, use color intensity through `paletteSettings` instead.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    cellRender="onCellRender">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onCellRender(args) {
        if (args.value < 30) {
            args.cellColor = '#D6EAF8';
        }

        if (args.value >= 30 && args.value < 70) {
            args.cellColor = '#5DADE2';
        }

        if (args.value >= 70) {
            args.cellColor = '#1B4F72';
        }
    }
</script>
```

### Complete Styling Example

This complete example uses both `Index.cshtml` and `Index.cshtml.cs`.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="styledHeatmap"
    dataSource="@Model.DataSource"
    cellRender="onCellRender"
    backgroundColor="#FAFAFA"
    width="100%"
    height="500px"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-margin
        left="50"
        right="50"
        top="50"
        bottom="50">
    </e-heatmap-margin>

    <e-heatmap-titlesettings
        text="Performance Dashboard"
        textAlign="Center"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.XAxisLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.YAxisLabels">
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
        alignment="Center"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>

<script>
    function onCellRender(args) {
        if (args.value > 75) {
            args.cellColor = '#27AE60';
        }

        if (args.value < 30) {
            args.cellColor = '#E74C3C';
        }
    }
</script>
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
        public List<HeatMapDataPoint> DataSource { get; set; } = new List<HeatMapDataPoint>();

        public string[] XAxisLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr", "May"
        };

        public string[] YAxisLabels { get; set; } =
        {
            "Product A", "Product B", "Product C", "Product D", "Product E"
        };

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "20px",
            Color = "#2C3E50"
        };

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "600",
            Size = "11px",
            Color = "#2C3E50"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#3498DB", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#2ECC71", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#E74C3C", Label = "High" }
        };

        public void OnGet()
        {
            DataSource = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Jan", YValue = "Product A", Value = 73 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product A", Value = 39 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product A", Value = 26 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product A", Value = 39 },
                new HeatMapDataPoint { XValue = "May", YValue = "Product A", Value = 94 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "Product B", Value = 93 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product B", Value = 58 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product B", Value = 53 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product B", Value = 38 },
                new HeatMapDataPoint { XValue = "May", YValue = "Product B", Value = 26 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "Product C", Value = 99 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product C", Value = 28 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product C", Value = 22 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product C", Value = 4 },
                new HeatMapDataPoint { XValue = "May", YValue = "Product C", Value = 66 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "Product D", Value = 14 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product D", Value = 26 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product D", Value = 97 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product D", Value = 69 },
                new HeatMapDataPoint { XValue = "May", YValue = "Product D", Value = 69 },

                new HeatMapDataPoint { XValue = "Jan", YValue = "Product E", Value = 7 },
                new HeatMapDataPoint { XValue = "Feb", YValue = "Product E", Value = 46 },
                new HeatMapDataPoint { XValue = "Mar", YValue = "Product E", Value = 47 },
                new HeatMapDataPoint { XValue = "Apr", YValue = "Product E", Value = 47 },
                new HeatMapDataPoint { XValue = "May", YValue = "Product E", Value = 88 }
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

### RTL Right-to-Left Support

Use `enableRtl="true"` for Arabic, Hebrew, and other right-to-left layouts.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.DataSource"
    enableRtl="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

RTL support helps align the component with right-to-left page layouts and text direction requirements.
