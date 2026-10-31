# Scatter and Bubble Charts

## Table of Contents

- [Scatter Chart](#scatter-chart)
  - [Basic Scatter Chart](#basic-scatter-chart)
  - [Multiple Scatter Series](#multiple-scatter-series)
  - [Marker Shapes](#marker-shapes)
  - [Scatter with Trendline](#scatter-with-trendline)
- [Bubble Chart](#bubble-chart)
  - [Basic Bubble Chart](#basic-bubble-chart)
  - [Bubble Size Control](#bubble-size-control)
  - [Multiple Bubble Series](#multiple-bubble-series)
  - [Bubble Colors](#bubble-colors)
- [Customization Options](#customization-options)
  - [Marker Customization](#marker-customization)
  - [Data Labels](#data-labels)
  - [Tooltips](#tooltips)
  - [Selection](#selection)
- [Advanced Patterns](#advanced-patterns)
  - [Correlation Matrix](#correlation-matrix)
  - [BCG Matrix (Bubble Chart Application)](#bcg-matrix-bubble-chart-application)
- [When to Use](#when-to-use)
  - [Scatter Chart Usage](#scatter-chart-usage)
  - [Bubble Chart Usage](#bubble-chart-usage)
- [Best Practices](#best-practices)
- [Performance Tips](#performance-tips)

Scatter and Bubble charts are used to plot data points on a two-dimensional plane, ideal for correlation analysis and multi-variable data visualization.

## Scatter Chart

Scatter charts display data points without connecting lines, showing the relationship or correlation between two variables.

### Basic Scatter Chart

```cshtml
<ejs-chart id="scatterChart" title="Height vs Weight Correlation">
    <e-chart-primaryxaxis title="Height (cm)" 
                          minimum="150" 
                          maximum="200">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Weight (kg)" 
                          minimum="50" 
                          maximum="100">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Height" 
                  yName="Weight" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker height="10" width="10">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
public IActionResult Index()
{
    ViewBag.ChartData = new object[]
    {
        new { Height = 165, Weight = 65 },
        new { Height = 170, Weight = 70 },
        new { Height = 175, Weight = 72 },
        new { Height = 160, Weight = 58 },
        new { Height = 180, Weight = 80 },
        new { Height = 168, Weight = 67 },
        new { Height = 172, Weight = 74 },
        new { Height = 163, Weight = 60 },
        new { Height = 178, Weight = 78 },
        new { Height = 185, Weight = 85 }
    };
    return View();
}
```

**Use Cases:**
- Correlation analysis
- Identifying patterns and clusters
- Outlier detection
- Scientific data visualization

### Multiple Scatter Series

Compare different groups or categories:

```cshtml
<ejs-chart id="multiScatterChart" title="Student Performance Analysis">
    <e-chart-primaryxaxis title="Study Hours"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Test Score"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.GroupA" 
                  xName="StudyHours" 
                  yName="Score" 
                  name="Group A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker height="10" width="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Circle">
            </e-series-marker>
        </e-series>
        <e-series dataSource="@ViewBag.GroupB" 
                  xName="StudyHours" 
                  yName="Score" 
                  name="Group B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker height="10" width="10" shape="@Syncfusion.EJ2.Charts.ChartShape.Diamond">
            </e-series-marker>
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### Marker Shapes

Different marker shapes help distinguish series:

```cshtml
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"></e-series-marker>
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Diamond"></e-series-marker>
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Triangle"></e-series-marker>
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Rectangle"></e-series-marker>
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Pentagon"></e-series-marker>
<e-series-marker shape="@Syncfusion.EJ2.Charts.ChartShape.Cross"></e-series-marker>
```

### Scatter with Trendline

Add a trendline to show the relationship:

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="X" 
          yName="Y" 
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
    <e-series-marker height="10" width="10"></e-series-marker>
    <e-series-trendlines>
        <e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Linear" 
                           width="2" 
                           fill="#FF6347">
        </e-trendline>
    </e-series-trendlines>
</e-series>
```

## Bubble Chart

Bubble charts are scatter charts with a third dimension represented by the size of the bubbles.

### Basic Bubble Chart

```cshtml
<ejs-chart id="bubbleChart" title="Product Performance Analysis">
    <e-chart-primaryxaxis title="Sales Volume"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Revenue ($)"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Sales" 
                  yName="Revenue" 
                  size="Profit"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
                  minRadius="5"
                  maxRadius="15">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Sales = 100, Revenue = 50000, Profit = 5000 },
    new { Sales = 150, Revenue = 75000, Profit = 8000 },
    new { Sales = 200, Revenue = 100000, Profit = 12000 },
    new { Sales = 120, Revenue = 60000, Profit = 6000 },
    new { Sales = 180, Revenue = 90000, Profit = 10000 }
};
```

**Three Dimensions:**
- **X-axis:** First variable (e.g., sales volume)
- **Y-axis:** Second variable (e.g., revenue)
- **Bubble size:** Third variable (e.g., profit, market share)

### Bubble Size Control

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
          dataSource="@ViewBag.ChartData"
          xName="X"
          yName="Y"
          size="Size"
          minRadius="3"
          maxRadius="20">
</e-series>
```

**Properties:**
- `minRadius`: Minimum bubble size in pixels
- `maxRadius`: Maximum bubble size in pixels
- `size`: Data field determining bubble size

### Multiple Bubble Series

```cshtml
<ejs-chart id="multiBubbleChart" title="Market Analysis">
    <e-chart-primaryxaxis title="Market Share (%)"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Growth Rate (%)"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.TechCompanies" 
                  xName="MarketShare" 
                  yName="GrowthRate" 
                  size="Revenue"
                  name="Tech"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
                  minRadius="5" maxRadius="20">
        </e-series>
        <e-series dataSource="@ViewBag.RetailCompanies" 
                  xName="MarketShare" 
                  yName="GrowthRate" 
                  size="Revenue"
                  name="Retail"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
                  minRadius="5" maxRadius="20">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### Bubble Colors

Individual bubble colors based on data:

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
          dataSource="@ViewBag.ChartData"
          xName="X"
          yName="Y"
          size="Size"
          pointColorMapping="Color">
</e-series>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = 10, Y = 20, Size = 5, Color = "#FF6384" },
    new { X = 15, Y = 25, Size = 8, Color = "#36A2EB" },
    new { X = 20, Y = 30, Size = 12, Color = "#FFCE56" }
};
```

## Customization Options

### Marker Customization

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
    <e-series-marker visible="true"
                     height="12"
                     width="12"
                     shape="@Syncfusion.EJ2.Charts.ChartShape.Circle"
                     fill="#FF6384"
                     opacity="0.8">
        <e-marker-border width="2" color="#000000"></e-marker-border>
    </e-series-marker>
</e-series>
```

### Data Labels

Add labels to points:

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
    <e-series-marker height="10" width="10"></e-series-marker>
    <e-series-datalabel visible="true" 
                        name="Label"
                        position="Top">
    </e-series-datalabel>
</e-series>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = 10, Y = 20, Label = "Point A" },
    new { X = 15, Y = 25, Label = "Point B" }
};
```

### Tooltips

Custom tooltips for detailed information:

```cshtml
<ejs-chart id="chart">
    <e-chart-tooltipsettings enable="true" 
                             format="X: ${point.x}<br/>Y: ${point.y}<br/>Size: ${point.size}">
    </e-chart-tooltipsettings>
    <e-series-collection>
        <e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
                  dataSource="@ViewBag.ChartData"
                  xName="X" yName="Y" size="Size">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Selection

Enable point selection:

```cshtml
<ejs-chart id="chart" selectionMode="Point">
    <e-series-collection>
        <e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter">
            <e-series-marker height="10" width="10"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Advanced Patterns

### Correlation Matrix

Visualize multiple variable correlations:

```cshtml
<ejs-chart id="correlationChart" title="Multi-Variable Correlation">
    <e-chart-primaryxaxis title="Variable 1"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Variable 2"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.PositiveCorrelation" 
                  xName="X" yName="Y" 
                  name="Positive Correlation"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter"
                  fill="#4CAF50">
            <e-series-marker height="8" width="8"></e-series-marker>
        </e-series>
        <e-series dataSource="@ViewBag.NegativeCorrelation" 
                  xName="X" yName="Y" 
                  name="Negative Correlation"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter"
                  fill="#F44336">
            <e-series-marker height="8" width="8"></e-series-marker>
        </e-series>
        <e-series dataSource="@ViewBag.NoCorrelation" 
                  xName="X" yName="Y" 
                  name="No Correlation"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Scatter"
                  fill="#9E9E9E">
            <e-series-marker height="8" width="8"></e-series-marker>
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### BCG Matrix (Bubble Chart Application)

Boston Consulting Group matrix for portfolio analysis:

```cshtml
<ejs-chart id="bcgMatrix" title="Product Portfolio - BCG Matrix">
    <e-chart-primaryxaxis title="Market Share" 
                          labelFormat="{value}%">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Market Growth Rate" 
                          labelFormat="{value}%">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Products" 
                  xName="MarketShare" 
                  yName="GrowthRate" 
                  size="Revenue"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bubble"
                  minRadius="10" maxRadius="30">
            <e-series-labelsettings visible="true"></e-series-labelsettings>
        </e-series>
    </e-series-collection>
    <!-- Add striplines for quadrants -->
    <e-chart-primaryxaxis>
        <e-primaryxaxis-striplines>
            <e-primaryxaxis-stripline start="50" 
                             zIndex="Behind" 
                             color="rgba(200,200,200,0.2)">
            </e-primaryxaxis-stripline>
        </e-primaryxaxis-striplines>
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis>
        <e-primaryyaxis-striplines>
            <e-primaryyaxis-stripline start="10" 
                             zIndex="Behind" 
                             color="rgba(200,200,200,0.2)">
            </e-primaryyaxis-stripline>
        </e-primaryyaxis-striplines>
    </e-chart-primaryyaxis>
</ejs-chart>
```

```csharp
ViewBag.Products = new object[]
{
    new { ProductName = "Stars", MarketShare = 65, GrowthRate = 18, Revenue = 50000 },
    new { ProductName = "Cash Cows", MarketShare = 70, GrowthRate = 5, Revenue = 80000 },
    new { ProductName = "Question Marks", MarketShare = 30, GrowthRate = 20, Revenue = 20000 },
    new { ProductName = "Dogs", MarketShare = 25, GrowthRate = 3, Revenue = 15000 }
};
```

## When to Use

### Scatter Chart Usage
**Best for:**
- Showing correlation between two variables
- Identifying patterns, trends, and outliers
- Scientific and statistical data
- Quality control and process analysis

**Examples:**
- Height vs Weight
- Temperature vs Ice Cream Sales
- Study Hours vs Test Scores
- Age vs Income

### Bubble Chart Usage
**Best for:**
- Displaying three-dimensional data
- Comparing entities across multiple metrics
- Portfolio analysis (BCG Matrix)
- Resource allocation visualization

**Examples:**
- Market Share vs Growth Rate (bubble size = revenue)
- Risk vs Return (bubble size = investment amount)
- Sales vs Profit (bubble size = market size)
- Performance metrics with multiple dimensions

## Best Practices

1. **Axis Scaling:** Use appropriate min/max values to show data distribution clearly
2. **Bubble Size:** Keep bubble sizes distinguishable (minRadius ≥ 3, maxRadius ≤ 30)
3. **Color Coding:** Use colors to represent categories or additional dimensions
4. **Labels:** Add labels sparingly to avoid clutter
5. **Tooltips:** Always enable tooltips for detailed information
6. **Legend:** Use legend when multiple series are present
7. **Trendlines:** Add trendlines to show overall patterns
8. **Data Points:** Limit to reasonable number (<500) for performance
9. **Marker Shapes:** Use different shapes for multiple series
10. **Axis Titles:** Always label axes clearly

## Performance Tips

1. Limit data points to <1000 for smooth interaction
2. Disable animations for large datasets
3. Use appropriate marker sizes
4. Enable data virtualization for very large datasets
5. Consider data aggregation for dense plots
