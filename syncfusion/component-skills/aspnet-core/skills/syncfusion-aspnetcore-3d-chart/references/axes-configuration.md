# Axes & Scales Configuration

## Table of Contents
- [Category Axis](#category-axis)
  - [Basic Category Axis](#basic-category-axis)
  - [Category Axis Labels](#category-axis-labels)
  - [Axis Title](#axis-title)
  - [Range](#range)
  - [Labels placement](#labels-placement)
  - [Indexed category axis](#indexed-category-axis)
- [Numeric Axis](#numeric-axis)
  - [Basic Numeric Axis](#basic-numeric-axis)
  - [Common Format Codes](#common-format-codes)
  - [Auto-Scale Numeric Axis](#auto-scale-numeric-axis)
  - [Numeric Axis with Custom Formatting](#numeric-axis-with-custom-formatting)
  - [Range Constraints](#range-constraints)
  - [Grouping separator](#grouping-separator)
- [Date-Time Axis](#date-time-axis)
  - [Basic Date-Time Axis](#basic-date-time-axis)
  - [DateTime category axis](#datetime-category-axis)
  - [Date-Time Format Options](#date-time-format-options)
  - [Practical Example: Revenue Over Time](#practical-example-revenue-over-time)
- [Logarithmic Axis](#logarithmic-axis)
  - [Basic Logarithmic Axis](#basic-logarithmic-axis)
  - [Logarithmic Scale Example](#logarithmic-scale-example)
  - [Logarithmic interval](#logarithmic-interval)
  - [Use Cases for Logarithmic Axes](#use-cases-for-logarithmic-axes)
- [Multiple Axes](#multiple-axes)
  - [Two Y-Axes Example](#two-y-axes-example)
- [Axis Labels &amp; Formatting](#axis-labels--formatting)
  - [Label Customization](#label-customization)
  - [Number Formatting](#number-formatting)
  - [Label Rotation](#label-rotation)
  - [Hide Axis Labels](#hide-axis-labels)
- [Multiple Panes](#multiple-panes)
  - [Two-Pane Configuration](#two-pane-configuration)
  - [Key Points for Multi-Pane Charts:](#key-points-for-multi-pane-charts)

## Category Axis

Category axes display non-numeric values (strings) on the axis. This is the default X-axis valueType.

### Basic Category Axis

```cshtml
<ejs-chart3d id="chart" title="Monthly Sales">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Data Model:**
```csharp
public class SalesData
{
    public string Month { get; set; }  // Category values
    public double Sales { get; set; }
}

// Sample data
List<SalesData> data = new List<SalesData>
{
    new SalesData { Month = "January", Sales = 35 },
    new SalesData { Month = "February", Sales = 28 },
    new SalesData { Month = "March", Sales = 34 }
};
```

### Category Axis Labels

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    <e-axis-label-style color="#333333" size="12px" fontFamily="Arial">
    </e-axis-label-style>
</e-chart3d-primaryxaxis>
```

### Axis Title

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" title="Months">
    <e-titlestyle size="16px" color="#000000">
    </e-titlestyle>
</e-chart3d-primaryxaxis>

<e-chart3d-primaryyaxis title="Sales Amount ($)">
    <e-titlestyle size="16px" color="#000000">
    </e-titlestyle>
</e-chart3d-primaryyaxis>
```

### Range

The range of the category axis can be customized using `Minimum`, `Maximum` and `Interval` properties of the axis.

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" minimum="1" maximum="5" interval="2"></e-chart3d-primaryxaxis>
```

### Labels placement

By default, category axis labels are placed between ticks in an axis. It can also be placed on ticks using the `LabelPlacement` property.

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" labelPlacement="@Syncfusion.EJ2.Charts.LabelPlacement.OnTicks"></e-chart3d-primaryxaxis>
```

### Indexed category axis

The category axis can also be rendered based on the index values of the data source. This can be achieved by defining the `IsIndexed` property to `true` in the axis.

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" isIndexed="true"></e-chart3d-primaryxaxis>
```

## Numeric Axis

Numeric axes display numeric values on the axis. Used for Y-axis by default.

### Basic Numeric Axis

```cshtml
<ejs-chart3d id="chart" title="Revenue Distribution">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                              minimum="0" 
                              maximum="100" 
                              interval="20">
    </e-chart3d-primaryyaxis>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Category" 
                          yName="Amount" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

| Property | Purpose | Example |
|----------|---------|---------|
| `valueType` | Axis type | Double, Category, DateTime, Logarithmic |
| `minimum` | Smallest axis value | 0, -50 |
| `maximum` | Largest axis value | 100, 1000 |
| `interval` | Gap between tick marks | 10, 25, 50 |

### Common Format Codes

| Format | Result | Description |
|--------|--------|-------------|
| `n1` | 1000.0 | Number with 1 decimal place |
| `n2` | 1000.00 | Number with 2 decimal places |
| `n3` | 1000.000 | Number with 3 decimal places |
| `c1` | $1000.0 | Currency with 1 decimal place |
| `c2` | $1000.00 | Currency with 2 decimal places |
| `p1` | 100.0% | Percentage with 1 decimal place |
| `p2` | 100.00% | Percentage with 2 decimal places |

### Auto-Scale Numeric Axis

Let the chart automatically determine axis range:

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double">
    <!-- minimum, maximum, interval auto-determined -->
</e-chart3d-primaryyaxis>
```

The chart examines your data and calculates appropriate ranges.

### Numeric Axis with Custom Formatting

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                          minimum="0" 
                          maximum="10000" 
                          interval="2000"
                          labelFormat="n1">
</e-chart3d-primaryyaxis>
```

### Range Constraints

Padding can be applied to the minimum and maximum extremes of an axis range by using the `RangePadding` property.

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                          minimum="0" 
                          maximum="100" 
                          rangePadding="@Syncfusion.EJ2.Charts.ChartRangePadding.None">
</e-chart3d-primaryyaxis>
```

`rangePadding` controls how padding is applied to the axis range. Supported modes include `None`, `Round`, `Additional`, `Normal`, and `Auto`.

### Grouping separator

To separate the y-axis labels to groups of thousands, set the `UseGroupingSeparator` property to `true` in the 3D chart.

```cshtml
<ejs-chart3d id="container" wallColor="transparent" enableRotation="true" rotation="7" tilt="10" depth="100"
    useGroupingSeparator="true">
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="ViewBag.dataSource" xName="x" yName="y"
            type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"></e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

## Date-Time Axis

Date-time axes display date/time values with automatic formatting.

### Basic Date-Time Axis

```cshtml
<ejs-chart3d id="timeSeriesChart" title="Stock Price Over Time">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime">
    </e-chart3d-primaryxaxis>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.StockData" 
                          xName="Date" 
                          yName="Price" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

**Data Model:**
```csharp
public class StockData
{
    public DateTime Date { get; set; }
    public double Price { get; set; }
}

List<StockData> data = new List<StockData>
{
    new StockData { Date = new DateTime(2024, 1, 1), Price = 150.5 },
    new StockData { Date = new DateTime(2024, 1, 2), Price = 152.3 },
    new StockData { Date = new DateTime(2024, 1, 3), Price = 149.8 }
};
```
### DateTime category axis

DateTime category axis is used to display the date time values with non-linear intervals. For example, the business days alone have been depicted in a week here.

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTimeCategory" skeleton="Ed">
</e-chart3d-primaryxaxis>
```
### Date-Time Format Options

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                          intervalType="@Syncfusion.EJ2.Charts.IntervalType.Months" 
                          interval="1"
                          labelFormat="MMM">
</e-chart3d-primaryxaxis>
```

| intervalType | Usage | Example |
|--------------|-------|---------|
| Seconds | High-frequency data | Real-time stock ticks |
| Minutes | Minute-level intervals | Website traffic per minute |
| Hours | Hourly data | Temperature readings |
| Days | Daily data | Stock prices |
| Months | Monthly data | Monthly revenue |
| Years | Long-term trends | Annual sales |

The following table describes the result of applying some common date time formats to the `LabelFormat` property.

| Label Value | Label Format Property Value | Result |
|-------------|-----------------------------|--------|
| new Date(2000, 03, 10) | EEEE | Monday |
| new Date(2000, 03, 10) | yMd | 04/10/2000 |
| new Date(2000, 03, 10) | MMM | Apr |
| new Date(2000, 03, 10) | hm | 12:00 AM |
| new Date(2000, 03, 10) | hms | 12:00:00 AM |


### Practical Example: Revenue Over Time

```cshtml
<ejs-chart3d id="timeChart" title="Monthly Revenue Trend">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                              intervalType="@Syncfusion.EJ2.Charts.IntervalType.Months" 
                              interval="1"
                              edgeLabelPlacement="@Syncfusion.EJ2.Charts.EdgeLabelPlacement.Shift"
                              labelFormat="yMd">
    </e-chart3d-primaryxaxis>
    
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" labelFormat="n2">
    </e-chart3d-primaryyaxis>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.RevenueData" 
                          xName="Month" 
                          yName="Revenue" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

## Logarithmic Axis

Logarithmic axes are useful for data spanning multiple orders of magnitude.

**LogBase**: Logarithmic base can be customized by using the `LogBase` property of the axis. 

### Basic Logarithmic Axis

```cshtml
<ejs-chart3d id="logChart" title="Exponential Growth Data">
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Logarithmic" 
                              logBase="10">
    </e-chart3d-primaryyaxis>
    
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model.ExponentialData" 
                          xName="Day" 
                          yName="Value" 
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Logarithmic Scale Example

**Data:**
```
Day 1: 1
Day 2: 10
Day 3: 100
Day 4: 1000
Day 5: 10000
```

With linear scale, points 4-5 appear compressed. With logarithmic scale, they're evenly spaced.

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Logarithmic" 
                          logBase="10"
                          minimum="1"
                          maximum="10000"
                          title="Value (Log Scale)">
</e-chart3d-primaryyaxis>
```

### Logarithmic interval

The interval of the logarithmic axis can be customized by using the `Interval` property in the axis. When the logarithmic base is 10 and logarithmic `Interval` is 2, then the axis labels are placed at an interval of  10 to the power of 2. The default value of the `Interval` is 1.

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Logarithmic"interval="2">
</e-chart3d-primaryyaxis>
```

### Use Cases for Logarithmic Axes
- Stock price over years (exponential growth)
- Website traffic (can grow from thousands to millions)
- CPU performance improvements
- Earthquake magnitude measurements (Richter scale is logarithmic)

## Multiple Axes

Display multiple Y-axes with different scales and units.

### Two Y-Axes Example

```cshtml
<ejs-chart3d id="multiAxisChart" title="Sales and Temperature">
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    
    <!-- Primary Y-axis (left) -->
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" title="Sales ($)">
    </e-chart3d-primaryyaxis>
    
    <!-- Secondary Y-axis (right) -->
    <e-chart3d-axes>
        <e-chart3d-axis name="SecondaryY" valueType="@Syncfusion.EJ2.Charts.ValueType.Double" opposedPosition="true" title="Temperature (°C)">
        </e-chart3d-axis>
    </e-chart3d-axes>
    
    <e-chart3d-series-collection>
        <!-- Sales series uses primary Y-axis -->
        <e-chart3d-series dataSource="@Model.Data" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        
        <!-- Temperature series uses secondary Y-axis -->
        <e-chart3d-series dataSource="@Model.Data" 
                          xName="Month" 
                          yName="Temperature" 
                          name="Temperature"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          yAxisName="SecondaryY">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom">
    </e-chart3d-legendsettings>
</ejs-chart3d>
```

**Key Points:**
- Primary Y-axis is on the left (default)
- Secondary axis has `opposedPosition="true"` (right side)
- Series reference axis via `yAxisName` property

## Axis Labels & Formatting

### Label Customization

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double">
    <e-labelstyle color="#FF5733" 
                        size="14px" 
                        fontFamily="Arial"
                        fontStyle="Italic"
                        fontWeight="Bold">
    </e-labelstyle>
</e-chart3d-primaryyaxis>
```

### Number Formatting

Display numbers with specific formatting (currency, decimals, etc.):

```cshtml
<e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" labelFormat="c2">
</e-chart3d-primaryyaxis>
```

### Label Rotation

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"
                        labelRotation="45">
</e-chart3d-primaryxaxis>
```

Angle in degrees (45° = diagonal, useful for long labels).

### Hide Axis Labels

```cshtml
<e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"
                        visible="false">
</e-chart3d-primaryxaxis>

```

## Multiple Panes

Display multiple chart areas (panes) for different data ranges or visual separation.

### Two-Pane Configuration

```cshtml
<ejs-chart3d id="multiPaneChart" title="Sales and Profit Analysis">
    <!-- Row 1: Sales data -->
    <e-chart3d-rows>
        <e-chart3d-row height="40%"></e-chart3d-row>
        <e-chart3d-row height="60%"></e-chart3d-row>
    </e-chart3d-rows>
    
    <!-- X-axis (shared) -->
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart3d-primaryxaxis>
    
    <!-- Y-axis for pane 1 -->
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" title="Sales ($)">
    </e-chart3d-primaryyaxis>
    
    <!-- Y-axis for pane 2 -->
    <e-chart3d-axes>
        <e-chart3d-axis name="SecondaryY" valueType="@Syncfusion.EJ2.Charts.ValueType.Double" rowIndex="1" title="Profit Margin (%)">
        </e-chart3d-axis>
    </e-chart3d-axes>
    
    <e-chart3d-series-collection>
        <!-- Series in pane 1 -->
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="Sales" 
                          name="Sales"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          rowIndex="0">
        </e-chart3d-series>
        
        <!-- Series in pane 2 -->
        <e-chart3d-series dataSource="@Model.SalesData" 
                          xName="Month" 
                          yName="ProfitMargin" 
                          name="Profit Margin"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          yAxisName="SecondaryY"
                          rowIndex="1">
        </e-chart3d-series>
    </e-chart3d-series-collection>
</ejs-chart3d>
```

### Key Points for Multi-Pane Charts:
- Define `<e-chart3d-rows>` with height percentages (must total 100%)
- Each secondary Y-axis requires a `rowIndex` property
- Series reference their target pane via `rowIndex`
- X-axis is typically shared across all panes
- Useful for comparing data at different scales

## Practical Example: Complete Multi-Axis Chart

```cshtml
<ejs-chart3d id="complexChart" 
             title="Quarterly Business Metrics">
    
    <!-- Axes Configuration -->
    <e-chart3d-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" title="Quarter">
    </e-chart3d-primaryxaxis>
    
    <e-chart3d-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                              minimum="0" 
                              maximum="100000"
                              title="Revenue ($)">
    </e-chart3d-primaryyaxis>
    
    <e-chart3d-axes>
        <e-chart3d-axis name="SecondaryY" valueType="@Syncfusion.EJ2.Charts.ValueType.Double" opposedPosition="true" title="Growth Rate (%)">
        </e-chart3d-axis>
    </e-chart3d-axes>
    
    <!-- Series -->
    <e-chart3d-series-collection>
        <e-chart3d-series dataSource="@Model" 
                          xName="Quarter" 
                          yName="Revenue" 
                          name="Revenue"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column">
        </e-chart3d-series>
        <e-chart3d-series dataSource="@Model" 
                          xName="Quarter" 
                          yName="GrowthRate" 
                          name="Growth"
                          type="@Syncfusion.EJ2.Charts.Chart3DSeriesType.Column"
                          yAxisName="SecondaryY">
        </e-chart3d-series>
    </e-chart3d-series-collection>
    
    <!-- Legend and Tooltips -->
    <e-chart3d-legendsettings position="@Syncfusion.EJ2.Charts.LegendPosition.Bottom">
    </e-chart3d-legendsettings>
    <e-chart3d-tooltipsettings enable="true">
    </e-chart3d-tooltipsettings>
</ejs-chart3d>
```

This example demonstrates:
- Category X-axis
- Numeric primary Y-axis (left)
- Numeric secondary Y-axis (right)
- Multiple series with custom formatting
- Legend and tooltip support
