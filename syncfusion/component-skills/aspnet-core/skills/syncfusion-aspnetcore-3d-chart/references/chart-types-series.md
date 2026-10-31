# Chart Types & Series Configuration

## Table of Contents
- [Column Chart](#column-chart)
  - [Basic Column Chart](#basic-column-chart)
  - [Multiple Column Series Side-by-Side](#multiple-column-series-side-by-side)
  - [Cylindrical Column Chart](#cylindrical-column-chart)
  - [Grouped column](#grouped-column)
  - [Column Styling](#column-styling)
- [Bar Chart](#bar-chart)
  - [Basic Bar Chart](#basic-bar-chart)
  - [Multiple Bar Series](#multiple-bar-series)
  - [Cylindrical Bar Chart](#cylindrical-bar-chart)
  - [Bar space and width](#bar-space-and-width)
  - [Grouped bar](#grouped-bar)
- [Stacked Column](#stacked-column)
  - [Basic Stacked Column](#basic-stacked-column)
  - [Stacked Column with Data Labels](#stacked-column-with-data-labels)
- [Stacked Bar](#stacked-bar)
  - [Basic Stacked Bar](#basic-stacked-bar)
  - [Multiple Stacked Bar Series Example](#multiple-stacked-bar-series-example)
- [Stacked 100% Column](#stacked-100-column)
  - [Basic Stacked 100% Column](#basic-stacked-100-column)
  - [Example: Website Traffic Distribution](#example-website-traffic-distribution)
- [Stacked 100% Bar](#stacked-100-bar)
  - [Basic Stacked 100% Bar](#basic-stacked-100-bar)
- [Series Visibility](#series-visibility)
  - [Hiding a Series](#hiding-a-series)
  - [Dynamic Series Visibility (JavaScript)](#dynamic-series-visibility-javascript)
- [Series Configuration Options](#series-configuration-options)
  - [Core Series Properties](#core-series-properties)

## Column Chart

Column charts are the most common chart type, displaying data as vertical bars grouped by categories.

### Basic Column Chart

```cshtml
<ejs-chart3d id="columnChart" title="Monthly Sales" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-tooltipsettings enable="true"></e-chart3d-tooltipsettings>
</ejs-chart3d>
```

### Multiple Column Series Side-by-Side

When displaying multiple column series side-by-side:

```csharp
// Controller
public class HomeController : Controller
{
    public IActionResult Index()
    {
        List<ChartData> data = new List<ChartData>
        {
            new ChartData { Month = "Jan", Sales = 35, Revenue = 100 },
            new ChartData { Month = "Feb", Sales = 28, Revenue = 85 },
            new ChartData { Month = "Mar", Sales = 34, Revenue = 95 },
            new ChartData { Month = "Apr", Sales = 32, Revenue = 88 }
        };
        return View(data);
    }
}

public class ChartData
{
    public string Month { get; set; }
    public double Sales { get; set; }
    public double Revenue { get; set; }
}
```

```cshtml
<ejs-chart3d id="chart" title="Sales vs Revenue" enableSideBySidePlacement="true" enableRotation="true" rotation="7" tilt="10"
    depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
</ejs-chart3d>
```

**Key Property:** `enableSideBySidePlacement="true"` positions series side-by-side instead of overlapping.

### Cylindrical Column Chart

To render a cylindrical column chart, set the `ColumnFacet` property to `Cylinder` in the chart series.

```cshtml
<ejs-chart3d id="container" wallColor="transparent" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="ViewBag.dataSource" xName="Month" yName="Sales" columnWidth="0.9"
            type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
            columnFacet="@Syncfusion.EJ2.Charts.ShapeType.Cylinder"></e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Grouped column

The data points can be grouped in the column type charts by using the `groupName` property. Series that share the same `groupName` are grouped together.

```cshtml
<ejs-chart3d id="chart" title="Sales vs Revenue" enableSideBySidePlacement="true" enableRotation="true" rotation="7" tilt="10"
    depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          groupName="Financials"
                          columnSpacing="0.1">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          groupName="Financials"
                          columnSpacing="0.1">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
</ejs-chart3d>
```

### Column Styling

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  opacity="0.5"
                  fill="#5DADE2">
</e-chart3d-series>
```

| Property | Purpose | Example |
|----------|---------|---------|
| `opacity` | opacity of the series | 0-1 |
| `fill` | Column fill color | #FF5733, rgb(255,87,51) |

## Bar Chart

Bar charts display data as horizontal bars, useful for comparing items or long category names.

### Basic Bar Chart

```cshtml
<ejs-chart3d id="barChart" title="Product Sales" enableRotation="true" rotation="7" tilt="10"
    depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ProductData" 
                          xName="ProductName" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Multiple Bar Series

```cshtml
<ejs-chart3d id="chart" title="Sales Comparison by Region" enableSideBySidePlacement="true" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Region" 
                          yName="Q1Sales" 
                          name="Q1"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Region" 
                          yName="Q2Sales" 
                          name="Q2"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Right"></e-chart3d-legendsettings>
</ejs-chart3d>
```

### Cylindrical Bar Chart

To render a cylindrical bar chart, set the `ColumnFacet` property to `Cylinder` in the chart series.

```cshtml
<ejs-chart3d id="barChart" title="Product Sales" enableRotation="true" rotation="7" tilt="10"
    depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ProductData" 
                          xName="ProductName" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar"
                          columnFacet="@Syncfusion.EJ2.Charts.ShapeType.Cylinder">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Bar space and width

The `ColumnSpacing` and `ColumnWidth` properties are used to customize the space between bars.

```cshtml
 <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ProductData" 
                          xName="ProductName" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar"
                          columnSpacing="0.1"
                          columnWidth="0.7">
        </e-chart3d-series>
    </e-chart3d-series-collection>
```

### Grouped bar

```cshtml
<ejs-chart3d id="chart" title="Sales Comparison by Region" enableSideBySidePlacement="true" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Region" 
                          yName="Q1Sales" 
                          name="Q1"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar"
                          groupName="Sales"
                          columnSpacing="0.1"
                          columnWidth="0.7">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Region" 
                          yName="Q2Sales" 
                          name="Q2"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Bar"
                          groupName="Sales"
                          columnSpacing="0.1"
                          columnWidth="0.7">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Right"></e-chart3d-legendsettings>
</ejs-chart3d>
```

**Use Case:** Bar charts are ideal when:
- Category labels are long (e.g., product names, company names)
- You have more categories than vertical space
- Comparing values horizontally is more intuitive

## Stacked Column

Stacked column charts display multiple series as stacked segments in a single column, showing composition and total values.

### Basic Stacked Column

```cshtml
<ejs-chart3d id="stackChart" title="Sales Breakdown by Region" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="EastSales" 
                          name="East"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="WestSales" 
                          name="West"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="SouthSales" 
                          name="South"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
</ejs-chart3d>
```

**Data Model:**
```csharp
public class RegionalSales
{
    public string Month { get; set; }
    public double EastSales { get; set; }
    public double WestSales { get; set; }
    public double SouthSales { get; set; }
}
```

### Stacked Column with Data Labels

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="EastSales" 
                  name="East"
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn">
    <e-chart3d-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.Top">
    </e-chart3d-series-datalabel>
</e-chart3d-series>
```

Shows the value of each segment on top of the stack.

## Stacked Bar

Stacked bar charts display stacked horizontal bars, combining the composition view of stacked columns with the horizontal orientation of bar charts.

### Basic Stacked Bar

```cshtml
<ejs-chart3d id="stackBarChart" title="Department Budget by Quarter" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.BudgetData" 
                          xName="Department" 
                          yName="Q1Budget" 
                          name="Q1"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.BudgetData" 
                          xName="Department" 
                          yName="Q2Budget" 
                          name="Q2"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.BudgetData" 
                          xName="Department" 
                          yName="Q3Budget" 
                          name="Q3"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Right"></e-chart3d-legendsettings>
</ejs-chart3d>
```

### Multiple Stacked Bar Series Example

```csharp
public class DepartmentBudget
{
    public string Department { get; set; }
    public double Q1Budget { get; set; }
    public double Q2Budget { get; set; }
    public double Q3Budget { get; set; }
    public double Q4Budget { get; set; }
}
```

## Stacked 100% Column

Shows each series as a percentage of the total (100%), useful for viewing proportional composition.

### Basic Stacked 100% Column

```cshtml
<ejs-chart3d id="stack100Chart" title="Market Share by Vendor" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.MarketData" 
                          xName="Year" 
                          yName="Vendor1" 
                          name="Vendor A"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.MarketData" 
                          xName="Year" 
                          yName="Vendor2" 
                          name="Vendor B"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.MarketData" 
                          xName="Year" 
                          yName="Vendor3" 
                          name="Vendor C"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
</ejs-chart3d>
```

Y-axis automatically shows percentages (0-100%), and all stacks are normalized to 100%.

**Use Case:** When you care about proportion/percentage rather than absolute values.

### Example: Website Traffic Distribution

```cshtml
<ejs-chart3d id="trafficChart" title="Traffic Source Distribution" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.TrafficData" 
                          xName="Month" 
                          yName="DirectTraffic" 
                          name="Direct"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.TrafficData" 
                          xName="Month" 
                          yName="SearchTraffic" 
                          name="Search"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.TrafficData" 
                          xName="Month" 
                          yName="SocialTraffic" 
                          name="Social"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingColumn100">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-tooltipsettings enable="true" format="${series.name}: ${point.percentage}%">
    </e-chart3d-tooltipsettings>
</ejs-chart3d>
```

## Stacked 100% Bar

Horizontal version of stacked 100%, showing proportional composition in bar format.

### Basic Stacked 100% Bar

```cshtml
<ejs-chart3d id="stack100BarChart" title="Product Category Mix by Region" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.CategoryData" 
                          xName="Region" 
                          yName="Electronics" 
                          name="Electronics"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.CategoryData" 
                          xName="Region" 
                          yName="Clothing" 
                          name="Clothing"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar100">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model.CategoryData" 
                          xName="Region" 
                          yName="Home" 
                          name="Home"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.StackingBar100">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Right"></e-chart3d-legendsettings>
</ejs-chart3d>
```

## Series Visibility

Control which series display in the chart.

### Hiding a Series

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="Expenses" 
                  visible="false"
                  name="Expenses"
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
</e-chart3d-series>
```

The series is not rendered but remains in the legend (if legend is displayed).

### Dynamic Series Visibility (JavaScript)

```cshtml
<ejs-chart3d id="chart" title="Sales Data" enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Month" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>

<button onclick="toggleSeriesVisibility()">Toggle Revenue Series</button>

<script>
function toggleSeriesVisibility() {
    var chart = document.getElementById('chart').ej2_instances[0];
    var seriesCollection = chart.series;
    seriesCollection[1].visible = !seriesCollection[1].visible;
    chart.refresh();
}
</script>
```

## Series Configuration Options

Essential properties for customizing series behavior and appearance.

### Core Series Properties

```cshtml
<e-chart3d-series dataSource="@Model" 
                  xName="Month" 
                  yName="Sales" 
                  name="Sales"
                  type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                  visible="true"
                  fill="#3498DB"
                  opacity="0.8"
                  columnFacet="@Syncfusion.EJ2.Charts.ShapeType.Cylinder"
                  columnSpacing="0.1"
                  columnWidth="0.7">
</e-chart3d-series>
```

| Property | Purpose | Values |
|----------|---------|--------|
| `xName` | X-axis data field | Property name |
| `yName` | Y-axis data field | Property name |
| `name` | Series display name | String |
| `type` | Chart type | Column, Bar, StackingColumn, StackingBar, StackingColumn100, StackingBar100 |
| `visible` | Show/hide series | true/false |
| `fill` | Series color | #HEX, rgb(), named color |
| `opacity` | Color transparency | 0.0-1.0 |
| `columnFacet` | Defines the shape of the data in a column and bar chart | Cylinder, Rectangle |
| `columnSpacing` | render the column series points with particular column spacing | 0.0-1.0 |
| `columnWidth` | Render the column series points with a particular column width | Numeric value |

### Complete Example: Custom Styled Column Chart

```cshtml
<ejs-chart3d id="styledChart" title="Quarterly Revenue"enableRotation="true" rotation="7" tilt="10" depth="100">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart3d-primaryxaxis>
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Quarter" 
                          yName="Revenue" 
                          name="Q Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          fill="#FF6B6B"
                          opacity="0.9">
            <e-chart3d-series-datalabel visible="true" position="Top">
            </e-chart3d-series-datalabel>
        </e-chart3d-series>
    </e-chart3d-series-collection>
    <e-chart3d-legendsettings position="Bottom"></e-chart3d-legendsettings>
    <e-chart3d-tooltipsettings enable="true" format="${point.x} : ${point.y}">
    </e-chart3d-tooltipsettings>
</ejs-chart3d>
```

This creates a styled column chart with custom colors, data labels, and tooltips.
