# Chart Types and Variants

This guide covers all accumulation chart types: Pie (including Doughnut variant), Pyramid, and Funnel charts, along with their customization options.

**Important:** Doughnut is NOT a separate chart type. It's a Pie chart with `innerRadius` set to create a hollow center.

## Table of Contents

- [Pie Chart](#pie-chart)
  - [Basic Pie Chart](#basic-pie-chart)
  - [When to Use Pie Charts](#when-to-use-pie-charts)
  - [Pie Chart with Custom Radius](#pie-chart-with-custom-radius)
  - [Various Radius Pie Chart](#various-radius-pie-chart)
- [Doughnut Chart](#doughnut-chart)
  - [Basic Doughnut Chart](#basic-doughnut-chart)
  - [When to Use Doughnut Charts](#when-to-use-doughnut-charts)
  - [Doughnut with Center Label](#doughnut-with-center-label)
- [Multiple Pie Series](#multiple-pie-series)
  - [Basic Multiple Pie Series](#basic-multiple-pie-series)
  - [Mapping Related Points with mappingKey](#mapping-related-points-with-mappingkey)
- [Pyramid Chart](#pyramid-chart)
  - [Basic Pyramid Chart](#basic-pyramid-chart)
  - [When to Use Pyramid Charts](#when-to-use-pyramid-charts)
  - [Pyramid Size Customization](#pyramid-size-customization)
  - [Pyramid with Gap Between Segments](#pyramid-with-gap-between-segments)
  - [Pyramid Mode: Linear vs Surface](#pyramid-mode-linear-vs-surface)
- [Funnel Chart](#funnel-chart)
  - [Basic Funnel Chart](#basic-funnel-chart)
  - [When to Use Funnel Charts](#when-to-use-funnel-charts)
  - [Funnel Neck Customization](#funnel-neck-customization)
  - [Funnel with Gap and Size](#funnel-with-gap-and-size)
  - [Funnel Mode: Standard vs Trapezoidal](#funnel-mode-standard-vs-trapezoidal)
- [Radius Customization](#radius-customization)
  - [Absolute vs Percentage Radius](#absolute-vs-percentage-radius)
- [Start and End Angles](#start-and-end-angles)
  - [Semi-Pie Chart](#semi-pie-chart)
  - [Semi-Doughnut (Gauge Style)](#semi-doughnut-gauge-style)
  - [Angle Reference](#angle-reference)
  - [Common Semi-Chart Configurations](#common-semi-chart-configurations)
- [Exploding Slices](#exploding-slices)
  - [Explode on Click](#explode-on-click)
  - [Pre-Exploded Slice](#pre-exploded-slice)
  - [Exploding All Slices](#exploding-all-slices)
- [Center Positioning](#center-positioning)
  - [Custom Center Position](#custom-center-position)
  - [Use Cases for Custom Center](#use-cases-for-custom-center)
- [Choosing the Right Chart Type](#choosing-the-right-chart-type)
- [Complete Example: All Chart Types](#complete-example-all-chart-types)

## Pie Chart

The pie chart is a circular graphic divided into slices to illustrate numerical proportions. It's the default chart type for accumulation series.

### Basic Pie Chart

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { Category = "Product A", Value = 35 },
        new PieChartData { Category = "Product B", Value = 28 },
        new PieChartData { Category = "Product C", Value = 22 },
        new PieChartData { Category = "Product D", Value = 15 }
    };
}

<ejs-accumulationchart id="pieChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
// Data Model
public class PieChartData
{
    public string Category { get; set; }
    public double Value { get; set; }
}
```

### When to Use Pie Charts
- Display parts of a whole (percentages)
- Show simple proportional data (5-7 categories max)
- Compare relative sizes at a glance
- Present budget allocations or market share

### Pie Chart with Custom Radius

By default, the pie radius is 80% of the available space. Customize using the `radius` property:

```cshtml
<ejs-accumulationchart id="customPieChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              radius="60%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Tip:** Use smaller radius (50-70%) when you need space for external data labels or annotations.

### Various Radius Pie Chart

Create visual emphasis by assigning different radii to individual slices:

```cshtml
@{
    List<VariableRadiusData> chartData = new List<VariableRadiusData>
    {
        new VariableRadiusData { Category = "Premium", Value = 45, Radius = "80%" },
        new VariableRadiusData { Category = "Standard", Value = 35, Radius = "65%" },
        new VariableRadiusData { Category = "Basic", Value = 20, Radius = "50%" }
    };
}

<ejs-accumulationchart id="variousRadiusChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              radius="Radius">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class VariableRadiusData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public string Radius { get; set; }  // Individual radius per slice
}
```

## Doughnut Chart

A doughnut chart is a **pie chart with a hollow center**, created by setting the `innerRadius` property on the **`<e-accumulation-series>`** tag (not on `<ejs-accumulationchart>`). There is no separate "Doughnut" type - it's simply a Pie chart variant.

### Basic Doughnut Chart

```cshtml
<ejs-accumulationchart id="doughnutChart">
    <e-accumulation-series-collection>
        <!-- innerRadius goes on series, NOT on chart tag -->
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              innerRadius="40%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Key Properties:**
- `type`: Must be `"Pie"` (not "Doughnut")
- `innerRadius`: Accepts percentage (0-100%) or pixel values to create the hollow center
- Common values: `"30%"`, `"40%"`, `"50%"` for different thickness
- Setting `innerRadius="0%"` creates a regular pie chart

### When to Use Doughnut Charts
- Display data with a center summary or KPI
- Show multiple concentric data series
- Emphasize individual segments over the whole
- Modern aesthetic preference over pie charts

### Doughnut with Center Label

Display summary information in the center:

```cshtml
@{
    List<PieChartData> chartData = new List<PieChartData>
    {
        new PieChartData { x = "Chrome", y = 61.3, text = "Chrome: 61.3%"},
        new PieChartData { x = "Safari", y = 24.6, text = "Safari: 24.6%"},
        new PieChartData { x = "Edge", y = 5.0, text = "Edge: 5.0%"},
        new PieChartData { x = "Samsung Internet", y = 2.7, text = "Samsung Internet: 2.7%"},
        new PieChartData { x = "Firefox", y = 2.6, text = "Firefox: 2.6%"},
        new PieChartData { x = "Others", y = 3.6, text = "Others: 3.6%"}
    };
}

<ejs-accumulationchart id="container">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="chartData" 
                              xName="x" 
                              yName="y" 
                              type="Pie"
                              innerRadius="65%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
    <e-accumulationchart-centerlabel text="Mobile<br>Browsers<br>Statistics">
    </e-accumulationchart-centerlabel>
    <e-accumulationchart-legendsettings visible="false">
    </e-accumulationchart-legendsettings>
</ejs-accumulationchart>
```

**Alternative: Using Annotation for Center Label** (see advanced-features.md)

## Multiple Pie Series

Render multiple pie or doughnut series in a single Accumulation Chart to compare related datasets as concentric rings. Each series can have its own data source, radius, inner radius, data labels, and styling.

### Basic Multiple Pie Series

```cshtml
@{
    List<DeviceUsageData> currentYearData = new List<DeviceUsageData>
    {
        new DeviceUsageData { Category = "Mobile", Value = 45 },
        new DeviceUsageData { Category = "Desktop", Value = 35 },
        new DeviceUsageData { Category = "Tablet", Value = 20 }
    };

    List<DeviceUsageData> previousYearData = new List<DeviceUsageData>
    {
        new DeviceUsageData { Category = "Mobile", Value = 38 },
        new DeviceUsageData { Category = "Desktop", Value = 42 },
        new DeviceUsageData { Category = "Tablet", Value = 20 }
    };
}

<ejs-accumulationchart
    id="multiplePieSeries"
    title="Device Usage Comparison">

    <e-accumulationchart-legendsettings visible="true">
    </e-accumulationchart-legendsettings>

    <e-accumulationchart-tooltipsettings
        enable="true"
        format="${series.name}<br/>${point.x}: <b>${point.y}%</b>">
    </e-accumulationchart-tooltipsettings>

    <e-accumulation-series-collection>
        <e-accumulation-series
            dataSource="@currentYearData"
            xName="Category"
            yName="Value"
            name="Current Year"
            type="Pie"
            radius="100%"
            innerRadius="70%">

            <e-accumulationseries-datalabel
                visible="true"
                name="Category"
                position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>

        <e-accumulation-series
            dataSource="@previousYearData"
            xName="Category"
            yName="Value"
            name="Previous Year"
            type="Pie"
            radius="60%"
            innerRadius="30%">

            <e-accumulationseries-datalabel
                visible="true"
                name="Category"
                position="Inside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class DeviceUsageData
{
    public string Category { get; set; }

    public double Value { get; set; }
}
```

Configure the `radius` and `innerRadius` properties of each series so that the series render as separate concentric rings without overlapping.

- The outer series uses a larger `radius`.
- The inner series uses a smaller `radius`.
- The `innerRadius` property determines the thickness of each ring.
- Each series can use a separate data source and visual configuration.
- The tooltip identifies the hovered point and its corresponding series.

### Mapping Related Points with mappingKey

Use the `mappingKey` property in the legend settings to associate corresponding points across multiple pie series. The property specifies the point field used to group related legend items across the series.

```cshtml
@{
    List<MappedDeviceUsageData> currentYearData = new List<MappedDeviceUsageData>
    {
        new MappedDeviceUsageData
        {
            Id = "mobile",
            Category = "Mobile",
            Value = 45
        },
        new MappedDeviceUsageData
        {
            Id = "desktop",
            Category = "Desktop",
            Value = 35
        },
        new MappedDeviceUsageData
        {
            Id = "tablet",
            Category = "Tablet",
            Value = 20
        }
    };

    List<MappedDeviceUsageData> previousYearData = new List<MappedDeviceUsageData>
    {
        new MappedDeviceUsageData
        {
            Id = "mobile",
            Category = "Mobile",
            Value = 38
        },
        new MappedDeviceUsageData
        {
            Id = "desktop",
            Category = "Desktop",
            Value = 42
        },
        new MappedDeviceUsageData
        {
            Id = "tablet",
            Category = "Tablet",
            Value = 20
        }
    };
}

<ejs-accumulationchart
    id="mappedMultiplePieSeries"
    title="Device Usage Comparison">

    <e-accumulationchart-legendsettings
        visible="true"
        mappingKey="x">
    </e-accumulationchart-legendsettings>

    <e-accumulationchart-tooltipsettings
        enable="true"
        format="${series.name}<br/>${point.x}: <b>${point.y}%</b>">
    </e-accumulationchart-tooltipsettings>

    <e-accumulation-series-collection>
        <e-accumulation-series
            dataSource="@currentYearData"
            xName="Category"
            yName="Value"
            name="Current Year"
            type="Pie"
            radius="100%"
            innerRadius="70%">

            <e-accumulationseries-datalabel
                visible="true"
                name="Category"
                position="Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>

        <e-accumulation-series
            dataSource="@previousYearData"
            xName="Category"
            yName="Value"
            name="Previous Year"
            type="Pie"
            radius="60%"
            innerRadius="30%">

            <e-accumulationseries-datalabel
                visible="true"
                name="Category"
                position="Inside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class MappedDeviceUsageData
{
    public string Id { get; set; }

    public string Category { get; set; }

    public double Value { get; set; }
}
```

In the above example:

- `mappingKey="x"` is configured in `e-accumulationchart-legendsettings`.
- The internal `x` value represents the category mapped through the `xName` property.
- Points with the same category value across multiple series share a common legend item.
- Interacting with a mapped legend item affects the corresponding points in all related series.
- Point mapping does not depend on the order of the records in each data source.

For example, the following points are associated because both use `Mobile` as their category value:

```csharp
// Current year
new MappedDeviceUsageData
{
    Id = "mobile",
    Category = "Mobile",
    Value = 45
}

// Previous year
new MappedDeviceUsageData
{
    Id = "mobile",
    Category = "Mobile",
    Value = 38
}
```

Both series configure `xName="Category"`. Therefore, the `Category` field is mapped to the internal `x` value used by `mappingKey="x"`.

**Requirements for `mappingKey`:**

- Configure `mappingKey` inside `e-accumulationchart-legendsettings`.
- Use `"x"` to associate points through the field mapped by each series' `xName`.
- Related points across the series must have identical X-values.
- Use consistent category mapping in all related series.
- Each mapped value should uniquely identify a category within its series.

> **Note:** Multiple pie series use the `Pie` series type. Enable the legend to display and interact with mapped legend items. Enable data labels and tooltips only when those features are required.

## Pyramid Chart

Pyramid charts display hierarchical data in a triangular shape, with the widest section at the top or bottom.

### Basic Pyramid Chart

```cshtml
@{
    List<PyramidData> salesFunnel = new List<PyramidData>
    {
        new PyramidData { Stage = "Awareness", Count = 10000 },
        new PyramidData { Stage = "Interest", Count = 5000 },
        new PyramidData { Stage = "Consideration", Count = 2000 },
        new PyramidData { Stage = "Intent", Count = 800 },
        new PyramidData { Stage = "Purchase", Count = 300 }
    };
}

<ejs-accumulationchart id="pyramidChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesFunnel" 
                              xName="Stage" 
                              yName="Count"
                              type="Pyramid">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class PyramidData
{
    public string Stage { get; set; }
    public double Count { get; set; }
}
```

### When to Use Pyramid Charts
- Visualize hierarchical data (organizational structure)
- Show progressive reduction (sales funnel, filtering process)
- Display population demographics (age distribution)
- Represent status or rank distributions

### Pyramid Size Customization

```cshtml
<ejs-accumulationchart id="customPyramid">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesFunnel" 
                              xName="Stage" 
                              yName="Count"
                              type="Pyramid"
                              width="45%"
                              height="80%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Properties:**
- `width`: Width of the pyramid (default: `"80%"`)
- `height`: Height of the pyramid (default: `"80%"`)

### Pyramid with Gap Between Segments

```cshtml
<ejs-accumulationchart id="pyramidWithGap">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesFunnel" 
                              xName="Stage" 
                              yName="Count"
                              type="Pyramid"
                              gapRatio="0.05">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**`gapRatio` Property:**
- Range: 0 to 1 (0 = no gap, 1 = maximum gap)
- Typical values: `0.02` to `0.1`
- Creates visual separation between segments

### Pyramid Mode: Linear vs Surface

```cshtml
<!-- Linear Mode (default): Equal height segments -->
<ejs-accumulationchart id="linearPyramid">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesFunnel" 
                              xName="Stage" 
                              yName="Count"
                              type="Pyramid"
                              pyramidMode="Linear">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<!-- Surface Mode: Height proportional to value -->
<ejs-accumulationchart id="surfacePyramid">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@salesFunnel" 
                              xName="Stage" 
                              yName="Count"
                              type="Pyramid"
                              pyramidMode="Surface">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Modes:**
- **Linear:** Each segment has equal height (emphasizes count)
- **Surface:** Height proportional to value (emphasizes magnitude)

## Funnel Chart

Funnel charts are similar to pyramid charts but taper to a narrow "neck" at the bottom, ideal for conversion processes.

### Basic Funnel Chart

```cshtml
@{
    List<FunnelData> conversionFunnel = new List<FunnelData>
    {
        new FunnelData { Stage = "Website Visits", Users = 50000 },
        new FunnelData { Stage = "Product Views", Users = 25000 },
        new FunnelData { Stage = "Add to Cart", Users = 7500 },
        new FunnelData { Stage = "Checkout Started", Users = 3000 },
        new FunnelData { Stage = "Purchase Complete", Users = 1200 }
    };
}

<ejs-accumulationchart id="funnelChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@conversionFunnel" 
                              xName="Stage" 
                              yName="Users"
                              type="Funnel">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
public class FunnelData
{
    public string Stage { get; set; }
    public double Users { get; set; }
}
```

### When to Use Funnel Charts
- Visualize conversion rates (e-commerce, lead generation)
- Show sequential stages with progressive reduction
- Identify bottlenecks in a process
- Display sales pipeline stages

### Funnel Neck Customization

Control the narrow portion at the bottom:

```cshtml
<ejs-accumulationchart id="customFunnel">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@conversionFunnel" 
                              xName="Stage" 
                              yName="Users"
                              type="Funnel"
                              neckWidth="15%"
                              neckHeight="18%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Neck Properties:**
- `neckWidth`: Width of the funnel neck (default: `"20%"`)
- `neckHeight`: Height of the funnel neck (default: `"20%"`)
- Use smaller values for more dramatic tapering

### Funnel with Gap and Size

```cshtml
<ejs-accumulationchart id="styledFunnel">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@conversionFunnel" 
                              xName="Stage" 
                              yName="Users"
                              type="Funnel"
                              width="50%"
                              height="85%"
                              neckWidth="10%"
                              neckHeight="15%"
                              gapRatio="0.03">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Funnel Mode: Standard vs Trapezoidal

```cshtml
<!-- Standard Mode (default): Traditional funnel shape -->
<ejs-accumulationchart id="standardFunnel">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@conversionFunnel" 
                              xName="Stage" 
                              yName="Users"
                              type="Funnel"
                              funnelMode="Standard">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<!-- Trapezoidal Mode: Flattened top section -->
<ejs-accumulationchart id="trapezoidalFunnel">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@conversionFunnel" 
                              xName="Stage" 
                              yName="Users"
                              type="Funnel"
                              funnelMode="Trapezoidal">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## Radius Customization

Customize the size of your accumulation charts across all types.

### Absolute vs Percentage Radius

```cshtml
<!-- Percentage (responsive) -->
<ejs-accumulationchart id="percentRadius">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              radius="70%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

<!-- Pixel (fixed size) -->
<ejs-accumulationchart id="pixelRadius">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              radius="200px">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Recommendation:** Use percentage values for responsive designs.

## Start and End Angles

Create semi-pie or semi-doughnut charts by customizing start and end angles.

### Semi-Pie Chart

```cshtml
<ejs-accumulationchart id="semiPie">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              startAngle="270"
                              endAngle="90">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Semi-Doughnut (Gauge Style)

```cshtml
<ejs-accumulationchart id="gaugeStyle">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie"
                              innerRadius="60%"
                              startAngle="180"
                              endAngle="0">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```
**Angle Reference:**
- **0°** = 3 o'clock (right) | **90°** = 6 o'clock (bottom)
- **180°** = 9 o'clock (left) | **270°** = 12 o'clock (top)
### Angle Reference

- **0°** = 3 o'clock (right)
- **90°** = 6 o'clock (bottom)
- **180°** = 9 o'clock (left)
- **270°** = 12 o'clock (top)
- **360°** = Complete circle (default: 0° to 360°)

### Common Semi-Chart Configurations

```cshtml
<!-- Half circle (top) -->
startAngle="180" endAngle="0"

<!-- Half circle (bottom) -->
startAngle="0" endAngle="180"

<!-- Three-quarter circle -->
startAngle="270" endAngle="180"

<!-- Quarter circle -->
startAngle="0" endAngle="90"
```

## Exploding Slices

Make slices "pop out" to emphasize specific data points.

### Explode on Click

```cshtml
<ejs-accumulationchart id="explodableChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              explode="true"
                              explodeOffset="10%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Properties:**
- `explode`: Enable explosion on click (default: `false`)
- `explodeOffset`: Distance slice moves out (default: `"10%"`)

### Pre-Exploded Slice

Explode a specific slice on load:

```cshtml
<ejs-accumulationchart id="preExplodedChart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              explode="true"
                              explodeIndex="2"
                              explodeOffset="15%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**`explodeIndex`:** Zero-based index of the slice to explode (e.g., `2` = third slice)

### Exploding All Slices

All slices in the series will be exploded when the chart loads.

```cshtml
<ejs-accumulationchart id="container" title="Mobile Browser Statistics" >
    <e-accumulationchart-legendsettings visible="false">
    </e-accumulationchart-legendsettings>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" xName="xValue" yName="yValue" name="Browser" explode="true" explodeAll="true" explodeOffset="10%">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>

```

**`explodeAll`:** When set to `true`, all slices will be exploded on load, provided that `explode` is also set to `true` and `explodeOffset` is greater than `0`.


## Center Positioning

Adjust the center point of pie and doughnut charts.

### Custom Center Position

```cshtml
<ejs-accumulationchart id="offsetChart">
    <e-accumulationchart-center x="60%" y="45%"></e-accumulationchart-center>
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="@chartData" 
                              xName="Category" 
                              yName="Value"
                              type="Pie">
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

**Default:** `x="50%"`, `y="50%"` (center of chart area)

### Use Cases for Custom Center
- Align with other dashboard elements
- Make room for external labels or annotations
- Create asymmetric layouts
- Position for specific design requirements

## Choosing the Right Chart Type

| Chart Type | Best For | Avoid When |
|-----------|----------|------------|
| **Pie (includes Doughnut customization)** | Simple proportions, 3–7 categories, quick comparisons, multiple data series, center summary display, modern aesthetic | Many categories, precise comparison needed |
| **Pyramid** | Hierarchical data, progressive reduction, demographics | Non-hierarchical data, multiple unrelated series |
| **Funnel** | Conversion processes, sales pipelines, sequential stages | Static data, non-sequential information |

## Complete Example: All Chart Types

```cshtml
@{
    List<ChartData> data = new List<ChartData>
    {
        new ChartData { Category = "Stage 1", Value = 100 },
        new ChartData { Category = "Stage 2", Value = 75 },
        new ChartData { Category = "Stage 3", Value = 50 },
        new ChartData { Category = "Stage 4", Value = 30 },
        new ChartData { Category = "Stage 5", Value = 15 }
    };
}

<div class="row">
    <!-- Pie Chart -->
    <div class="col-md-6">
        <h3>Pie Chart</h3>
        <ejs-accumulationchart id="pie">
            <e-accumulation-series-collection>
                <e-accumulation-series dataSource="@data" xName="Category" yName="Value" type="Pie">
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
    
    <!-- Doughnut Chart -->
    <div class="col-md-6">
        <h3>Doughnut Chart</h3>
        <ejs-accumulationchart id="doughnut">
            <e-accumulation-series-collection>
                <e-accumulation-series dataSource="@data" xName="Category" yName="Value" type="Pie" innerRadius="40%">
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
    
    <!-- Pyramid Chart -->
    <div class="col-md-6">
        <h3>Pyramid Chart</h3>
        <ejs-accumulationchart id="pyramid">
            <e-accumulation-series-collection>
                <e-accumulation-series dataSource="@data" xName="Category" yName="Value" type="Pyramid">
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
    
    <!-- Funnel Chart -->
    <div class="col-md-6">
        <h3>Funnel Chart</h3>
        <ejs-accumulationchart id="funnel">
            <e-accumulation-series-collection>
                <e-accumulation-series dataSource="@data" xName="Category" yName="Value" type="Funnel" neckWidth="15%" neckHeight="18%">
                </e-accumulation-series>
            </e-accumulation-series-collection>
        </ejs-accumulationchart>
    </div>
</div>
```

