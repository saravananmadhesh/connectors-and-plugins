# Series Configuration

This guide covers comprehensive series configuration in Syncfusion ASP.NET Core Charts, including multiple series, series types, combination charts, empty points handling, and performance optimization.

## Table of Contents

- [Basic Series Configuration](#basic-series-configuration)
  - [Single Series](#single-series)
- [Multiple Series](#multiple-series)
  - [Basic Multiple Series](#basic-multiple-series)
  - [Multiple Series with Different Axes](#multiple-series-with-different-axes)
- [Series Types and Properties](#series-types-and-properties)
  - [Column Series](#column-series)
  - [Line Series with Markers](#line-series-with-markers)
  - [Area Series](#area-series)
  - [Stacked Series](#stacked-series)
  - [Spline Series](#spline-series)
- [Combination Charts](#combination-charts)
  - [Column and Line Combination](#column-and-line-combination)
  - [Stacked Column and Line](#stacked-column-and-line)
  - [Area and Column Combination](#area-and-column-combination)
- [Empty Points Handling](#empty-points-handling)
  - [Fill Empty Points](#fill-empty-points)
  - [Average Mode](#average-mode)
  - [Zero Mode](#zero-mode)
  - [Custom Empty Point Style](#custom-empty-point-style)
- [Series Customization](#series-customization)
  - [Custom Colors](#custom-colors)
  - [Point Color Mapping](#point-color-mapping)
  - [Series Opacity and Border](#series-opacity-and-border)
  - [Corner Radius](#corner-radius)
- [Performance Optimization](#performance-optimization)
  - [Enable Animation Selectively](#enable-animation-selectively)
  - [Optimize Data Source](#optimize-data-source)
  - [Lazy Loading for Large Datasets](#lazy-loading-for-large-datasets)
  - [Reduce Marker Count](#reduce-marker-count)
- [When to Use](#when-to-use)

## Basic Series Configuration

### Single Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  name="Sales 2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
public class ChartController : Controller
{
    public IActionResult Index()
    {
        ViewBag.ChartData = new[]
        {
            new { Month = "Jan", Sales = 35 },
            new { Month = "Feb", Sales = 28 },
            new { Month = "Mar", Sales = 34 },
            new { Month = "Apr", Sales = 32 },
            new { Month = "May", Sales = 40 }
        };
        return View();
    }
}
```

## Multiple Series

### Basic Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="@ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.Sales2023 = new[]
{
    new { Month = "Jan", Sales = 35 },
    new { Month = "Feb", Sales = 28 },
    new { Month = "Mar", Sales = 34 },
    new { Month = "Apr", Sales = 32 }
};

ViewBag.Sales2024 = new[]
{
    new { Month = "Jan", Sales = 42 },
    new { Month = "Feb", Sales = 38 },
    new { Month = "Mar", Sales = 45 },
    new { Month = "Apr", Sales = 40 }
};
```

### Multiple Series with Different Axes

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Revenue ($)"></e-chart-primaryyaxis>
    <e-chart-axes>
        <e-chart-axis name="yAxis2" title="Units Sold" opposedPosition="true"></e-chart-axis>
    </e-chart-axes>
    <e-series-collection>
        <e-series dataSource="@ViewBag.RevenueData" 
                  xName="Month" 
                  yName="Revenue" 
                  name="Revenue"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="@ViewBag.UnitsData" 
                  xName="Month" 
                  yName="Units" 
                  name="Units"
                  yAxisName="yAxis2"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.RevenueData = new[]
{
    new { Month = "Jan", Revenue = 35000 },
    new { Month = "Feb", Revenue = 42000 },
    new { Month = "Mar", Revenue = 38000 }
};

ViewBag.UnitsData = new[]
{
    new { Month = "Jan", Units = 350 },
    new { Month = "Feb", Units = 420 },
    new { Month = "Mar", Units = 380 }
};
```

## Series Types and Properties

### Column Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  columnWidth="0.6"
                  columnSpacing="0.1">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Line Series with Markers

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="3"
                  dashArray="5,5">
            <e-series-marker visible="true" 
                           width="10" 
                           height="10" 
                           shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"
                           fill="#0078D4"
                           border-width="2"
                           border-color="#fff">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Area Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
                  fill="rgba(0, 120, 212, 0.3)"
                  opacity="0.6"
                  border-width="2"
                  border-color="#0078D4">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Stacked Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ProductA" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.ProductB" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.ProductC" 
                  xName="Month" 
                  yName="Sales" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Spline Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Temperature" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Spline"
                  width="2">
            <e-series-marker visible="true" width="7" height="7"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Combination Charts

### Column and Line Combination

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.SalesData" 
                  xName="Month" 
                  yName="Sales" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="@ViewBag.TargetData" 
                  xName="Month" 
                  yName="Target" 
                  name="Target"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  width="3">
            <e-series-marker visible="true" width="10" height="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Stacked Column and Line

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.OnlineSales" 
                  xName="Month" 
                  yName="Sales" 
                  name="Online"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.StoreSales" 
                  xName="Month" 
                  yName="Sales" 
                  name="Store"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.Average" 
                  xName="Month" 
                  yName="Avg" 
                  name="Average"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line"
                  dashArray="5,5">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Area and Column Combination

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Forecast" 
                  xName="Month" 
                  yName="Value" 
                  name="Forecast"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Area"
                  opacity="0.4">
        </e-series>
        <e-series dataSource="@ViewBag.Actual" 
                  xName="Month" 
                  yName="Value" 
                  name="Actual"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Empty Points Handling

### Fill Empty Points

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.DataWithGaps" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-emptypointsettings mode="Gap"></e-series-emptypointsettings>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller - Data with nulls
ViewBag.DataWithGaps = new[]
{
    new { Month = "Jan", Sales = (double?)35 },
    new { Month = "Feb", Sales = (double?)null },
    new { Month = "Mar", Sales = (double?)34 },
    new { Month = "Apr", Sales = (double?)null },
    new { Month = "May", Sales = (double?)40 }
};
```

### Average Mode

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.DataWithGaps" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-emptypointsettings mode="Average" fill="#FFC107"></e-series-emptypointsettings>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Zero Mode

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.DataWithGaps" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-emptypointsettings mode="Zero"></e-series-emptypointsettings>
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Empty Point Style

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.DataWithGaps" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average" fill="#E74C3C">
                <e-emptypointsettings-border color="#C0392B" width="2"></e-emptypointsettings-border>
            </e-series-emptypointsettings>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Series Customization

### Custom Colors

```cshtml
<ejs-chart id="chart" palettes="new string[] { '#0078D4', '#107C10', '#FFB900', '#E74856' }">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ProductA" xName="Month" yName="Sales" name="Product A" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="@ViewBag.ProductB" xName="Month" yName="Sales" name="Product B" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
        <e-series dataSource="@ViewBag.ProductC" xName="Month" yName="Sales" name="Product C" type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"></e-series>
    </e-series-collection>
</ejs-chart>
```

### Point Color Mapping

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ColorMappedData" 
                  xName="Month" 
                  yName="Sales" 
                  pointColorMapping="Color"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.ColorMappedData = new[]
{
    new { Month = "Jan", Sales = 35, Color = "#0078D4" },
    new { Month = "Feb", Sales = 28, Color = "#E74856" },
    new { Month = "Mar", Sales = 34, Color = "#107C10" },
    new { Month = "Apr", Sales = 40, Color = "#FFB900" }
};
```

### Series Opacity and Border

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
                  fill="#0078D4"
                  opacity="0.8"
                  border-width="2"
                  border-color="#004578">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Corner Radius

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-cornerradius topLeft="10" topRight="10"></e-series-cornerradius>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Performance Optimization

### Enable Animation Selectively

```cshtml
<ejs-chart id="chart" enableAnimation="false">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.LargeDataSet" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-animation enable="false"></e-series-animation>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Optimize Data Source

```csharp
// Controller - Use efficient data structures
public IActionResult HighPerformance()
{
    // Pre-aggregate or sample data for large datasets
    var data = GetLargeDataSet()
        .GroupBy(d => d.Date.Date)
        .Select(g => new { Date = g.Key, AvgValue = g.Average(x => x.Value) })
        .ToArray();
    
    ViewBag.ChartData = data;
    return View();
}
```

### Lazy Loading for Large Datasets

```cshtml
<ejs-chart id="chart" load="chartLoad">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.InitialData" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function chartLoad(args) {
        // Load data progressively
        console.log('Chart loading with initial dataset');
    }
</script>
```

### Reduce Marker Count

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" ></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.LargeDataSet" 
                  xName="Date" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="false"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## When to Use

**Multiple Series**: Use to compare different datasets, show trends across categories, or display related metrics together for analysis.

**Series Types**: Choose based on data characteristics - columns for comparisons, lines for trends, areas for cumulative data, and splines for smooth curves.

**Combination Charts**: Use when you need to display different types of data with different scales or visualization needs in one chart.

**Empty Points Handling**: Use to manage missing data gracefully - Gap for honest representation, Average for continuity, Zero for complete datasets.

**Custom Colors**: Use to match brand guidelines, highlight specific data points, or create visual hierarchies in your charts.

**Performance Optimization**: Use when dealing with large datasets (>1000 points), real-time updates, or when targeting low-powered devices.

Choose series configuration based on data type, comparison needs, audience expectations, and performance requirements.
