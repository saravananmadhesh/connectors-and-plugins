# Specialized Charts

## Table of Contents

- [Box and Whisker Chart](#box-and-whisker-chart)
  - [Basic Box and Whisker](#basic-box-and-whisker)
  - [Box Plot Components](#box-plot-components)
  - [Box Plot Modes](#box-plot-modes)
  - [Customization](#customization)
- [Histogram](#histogram)
  - [Basic Histogram](#basic-histogram)
  - [Histogram Properties](#histogram-properties)
- [Pareto Chart](#pareto-chart)
  - [Basic Pareto Chart](#basic-pareto-chart)
- [Waterfall Chart](#waterfall-chart)
  - [Basic Waterfall Chart](#basic-waterfall-chart)
  - [Waterfall Properties](#waterfall-properties)
- [Polar and Radar Charts](#polar-and-radar-charts)
  - [Polar Chart](#polar-chart)
  - [Radar Chart](#radar-chart)
  - [Draw Types](#draw-types)
  - [Start Angle](#start-angle)
  - [Coefficient](#coefficient)
- [When to Use](#when-to-use)
  - [Box and Whisker Usage](#box-and-whisker-usage)
  - [Histogram Usage](#histogram-usage)
  - [Pareto Usage](#pareto-usage)
  - [Waterfall Usage](#waterfall-usage)
  - [Polar/Radar Usage](#polarradar-usage)
- [Performance and Best Practices](#performance-and-best-practices)

## Box and Whisker Chart

Box and Whisker charts display statistical distribution showing quartiles, median, and outliers. Ideal for analyzing data spread and identifying anomalies.

### Basic Box and Whisker

```cshtml
<ejs-chart id="boxWhiskerChart" title="Exam Score Distribution">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Score">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Class" 
                  yName="Scores" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.BoxAndWhisker"
                  boxPlotMode="Normal">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Class = "Class A", Scores = new double[] { 65, 70, 75, 80, 82, 85, 88, 90, 92, 95 } },
    new { Class = "Class B", Scores = new double[] { 60, 65, 68, 72, 75, 78, 80, 82, 85, 88 } },
    new { Class = "Class C", Scores = new double[] { 70, 72, 75, 78, 80, 82, 85, 88, 90, 92 } }
};
```

### Box Plot Components

**Box:** Shows 25th to 75th percentile (IQR - Interquartile Range)  
**Line inside box:** Median (50th percentile)  
**Whiskers:** Extend to minimum and maximum values within 1.5 × IQR  
**Outliers:** Points beyond whiskers

### Box Plot Modes

```cshtml
<e-series boxPlotMode="Normal"></e-series>      <!-- Shows median and quartiles -->
<e-series boxPlotMode="Exclusive"></e-series>   <!-- Excludes median from quartile calculation -->
<e-series boxPlotMode="Inclusive"></e-series>   <!-- Includes median in quartile calculation -->
```

### Customization

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.BoxAndWhisker"
          dataSource="@ViewBag.ChartData"
          xName="Category"
          yName="Values"
          fill="#8B4513"
          showMean="true">
    <e-series-marker visible="true" height="8" width="8"></e-series-marker>
</e-series>
```

**Properties:**
- `showMean`: Display mean value
- `fill`: Box color
- `marker`: Outlier marker settings

**Use Cases:** Quality control, test score analysis, salary distributions, performance metrics

## Histogram

Histogram visualizes frequency distribution of continuous data by grouping values into bins.

### Basic Histogram

```cshtml
<ejs-chart id="histogramChart" title="Age Distribution">
    <e-chart-primaryxaxis title="Age Range"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Frequency"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.AgeData" 
                  yName="Age" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Histogram"
                  binInterval="10"
                  showNormalDistribution="true">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.AgeData = new object[]
{
    new { Age = 25 }, new { Age = 28 }, new { Age = 32 }, new { Age = 35 },
    new { Age = 38 }, new { Age = 42 }, new { Age = 45 }, new { Age = 48 },
    new { Age = 52 }, new { Age = 55 }, new { Age = 58 }, new { Age = 62 },
    new { Age = 25 }, new { Age = 30 }, new { Age = 35 }, new { Age = 40 },
    new { Age = 45 }, new { Age = 50 }, new { Age = 55 }, new { Age = 60 }
};
```

### Histogram Properties

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Histogram"
          yName="Value"
          binInterval="5"
          showNormalDistribution="true"
          fill="#36A2EB">
</e-series>
```

**Properties:**
- `binInterval`: Width of each bin
- `showNormalDistribution`: Show normal distribution curve overlay

**Use Cases:** Population analysis, test scores, manufacturing quality, response times

## Pareto Chart

Pareto charts combine column and line charts to show cumulative impact, following the 80-20 rule (80% of effects come from 20% of causes).

### Basic Pareto Chart

```cshtml
<ejs-chart id="paretoChart" title="Defect Analysis">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Defect Count">
    </e-chart-primaryyaxis>
    <e-chart-axes>
        <e-chart-axis name="SecondaryAxis" 
                     opposedPosition="true" 
                     title="Cumulative Percentage"
                     minimum="0" 
                     maximum="100"
                     labelFormat="{value}%">
        </e-chart-axis>
    </e-chart-axes>
    <e-series-collection>
        <e-series dataSource="@ViewBag.DefectData" 
                  xName="Defect" 
                  yName="Count" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Pareto">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.DefectData = new object[]
{
    new { Defect = "Scratches", Count = 150 },
    new { Defect = "Dents", Count = 120 },
    new { Defect = "Paint Issues", Count = 80 },
    new { Defect = "Misalignment", Count = 50 },
    new { Defect = "Other", Count = 30 }
};
```

Chart automatically:
- Sorts data in descending order
- Creates column chart for individual values
- Adds cumulative percentage line
- Shows which issues contribute most to total

**Use Cases:** Quality control (defect analysis), sales analysis (top products), problem prioritization

## Waterfall Chart

Waterfall charts show cumulative effect of sequential positive and negative values, displaying how an initial value increases or decreases through a series of changes.

### Basic Waterfall Chart

```cshtml
<ejs-chart id="waterfallChart" title="Profit and Loss Statement">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Amount ($1000)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.FinancialData" 
                  xName="Category" 
                  yName="Amount" 
                  intermediateSumIndexes="new int[] { 3 }"
                  sumIndexes="new int[] { 6 }"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Waterfall">
            <e-series-connector width="2" color="#333"></e-series-connector>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.FinancialData = new object[]
{
    new { Category = "Revenue", Amount = 500 },
    new { Category = "Cost of Sales", Amount = -200 },
    new { Category = "Operating Expenses", Amount = -150 },
    new { Category = "Gross Profit", Amount = 0 },  // Intermediate sum
    new { Category = "Taxes", Amount = -50 },
    new { Category = "Other Income", Amount = 30 },
    new { Category = "Net Profit", Amount = 0 }  // Final sum
};
```

### Waterfall Properties

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Waterfall"
          intermediateSumIndexes="new int[] { 3, 6 }"
          sumIndexes="new int[] { 9 }"
          columnWidth="0.9">
    <e-series-connector width="2" color="#000" dashArray="5,3">
    </e-series-connector>
</e-series>
```

**Properties:**
- `intermediateSumIndexes`: Indices for intermediate total columns
- `sumIndexes`: Indices for final total columns
- `connector`: Line connecting columns

**Colors:**
- Positive values: Green
- Negative values: Red
- Sum columns: Blue

**Use Cases:** Financial statements, inventory tracking, sales pipeline, budget analysis

## Polar and Radar Charts

Polar and Radar charts display data on a circular axis, useful for cyclical data and multi-variable comparison.

### Polar Chart

```cshtml
<ejs-chart id="polarChart" title="Wind Rose Diagram">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.WindData" 
                  xName="Direction" 
                  yName="Speed" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Polar"
                  drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Line">
            <e-series-marker visible="true" height="8" width="8">
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.WindData = new object[]
{
    new { Direction = "N", Speed = 15 },
    new { Direction = "NE", Speed = 20 },
    new { Direction = "E", Speed = 25 },
    new { Direction = "SE", Speed = 18 },
    new { Direction = "S", Speed = 12 },
    new { Direction = "SW", Speed = 22 },
    new { Direction = "W", Speed = 28 },
    new { Direction = "NW", Speed = 16 }
};
```

### Radar Chart

```cshtml
<ejs-chart id="radarChart" title="Player Skills Comparison">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Player1" 
                  xName="Skill" 
                  yName="Rating" 
                  name="Player 1"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Radar"
                  drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Area"
                  opacity="0.5">
        </e-series>
        <e-series dataSource="@ViewBag.Player2" 
                  xName="Skill" 
                  yName="Rating" 
                  name="Player 2"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Radar"
                  drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Area"
                  opacity="0.5">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

```csharp
ViewBag.Player1 = new object[]
{
    new { Skill = "Speed", Rating = 8 },
    new { Skill = "Strength", Rating = 7 },
    new { Skill = "Stamina", Rating = 9 },
    new { Skill = "Agility", Rating = 6 },
    new { Skill = "Technique", Rating = 8 }
};
ViewBag.Player2 = new object[]
{
    new { Skill = "Speed", Rating = 7 },
    new { Skill = "Strength", Rating = 9 },
    new { Skill = "Stamina", Rating = 7 },
    new { Skill = "Agility", Rating = 8 },
    new { Skill = "Technique", Rating = 9 }
};
```

### Draw Types

Both Polar and Radar support different draw types:

```cshtml
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Line"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Column"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Area"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Scatter"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.Spline"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.StackingColumn"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.StackingArea"></e-series>
<e-series drawType="@Syncfusion.EJ2.Charts.ChartDrawType.RangeColumn"></e-series>
```

### Start Angle

Rotate the chart:

```cshtml
<e-chart-primaryxaxis startAngle="90"></e-chart-primaryxaxis>
```

**0° = East, 90° = North, 180° = West, 270° = South**

### Coefficient

Adjust chart radius:

```cshtml
<e-chart-primaryxaxis coefficient="100"></e-chart-primaryxaxis>
```

Higher coefficient = larger radius

**Use Cases:**
- **Polar:** Wind direction, cyclical patterns, directional data
- **Radar:** Multi-attribute comparison, skills assessment, performance metrics

## When to Use

### Box and Whisker Usage
- Statistical analysis and distribution
- Identifying outliers
- Comparing distributions across categories
- Quality control and six sigma analysis

### Histogram Usage
- Frequency distribution
- Data spread and range
- Normal distribution verification
- Process capability analysis

### Pareto Usage
- Identifying top contributors (80-20 rule)
- Prioritizing problems or opportunities
- Quality improvement (defect analysis)
- Showing cumulative impact

### Waterfall Usage
- Sequential value changes
- Financial statements (P&L)
- Inventory movements
- Bridge analysis (variance analysis)

### Polar/Radar Usage
- Cyclical or directional data
- Multi-variable comparison
- Skills/performance assessment
- Environmental data (wind, weather patterns)

## Performance and Best Practices

1. **Box and Whisker:** Ensure array data is numeric
2. **Histogram:** Choose appropriate bin interval
3. **Pareto:** Data automatically sorted, ensure meaningful categories
4. **Waterfall:** Clearly mark intermediate and final sums
5. **Polar/Radar:** Use 5-10 axes for readability
6. **All types:** Enable tooltips for detailed information
7. **Use appropriate colors** for different value types
8. **Add data labels** selectively to avoid clutter
