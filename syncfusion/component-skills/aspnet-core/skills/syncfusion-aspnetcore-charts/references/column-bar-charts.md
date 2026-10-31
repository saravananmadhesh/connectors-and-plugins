# Column and Bar Charts

## Table of Contents

- [Overview](#overview)
- [Column Chart](#column-chart)
  - [Basic Column Chart](#basic-column-chart)
  - [Multiple Column Series](#multiple-column-series)
  - [Column Spacing and Width](#column-spacing-and-width)
- [Bar Chart](#bar-chart)
  - [Basic Bar Chart](#basic-bar-chart)
  - [Multiple Bar Series](#multiple-bar-series)
  - [Bar vs Column: When to Use Each](#bar-vs-column-when-to-use-each)
- [Stacked Column and Bar](#stacked-column-and-bar)
  - [Stacked Column](#stacked-column)
  - [Stacked Bar](#stacked-bar)
  - [Stacking Groups](#stacking-groups)
- [100% Stacked Charts](#100-stacked-charts)
  - [100% Stacked Column](#100-stacked-column)
  - [100% Stacked Bar](#100-stacked-bar)
- [Range Column Chart](#range-column-chart)
- [Vertical Chart](#vertical-chart)
- [Customization Options](#customization-options)
  - [Column/Bar Colors](#columnbar-colors)
  - [Individual Point Colors](#individual-point-colors)
  - [Border Customization](#border-customization)
  - [Corner Radius](#corner-radius)
  - [Data Labels](#data-labels)
  - [Empty Points](#empty-points)
- [When to Use](#when-to-use)
  - [Column Chart Usage](#column-chart-usage)
  - [Bar Chart Usage](#bar-chart-usage)
  - [Stacked Column/Bar](#stacked-columnbar)
  - [100% Stacked](#100-stacked)
  - [Range Column](#range-column)
- [Performance Tips](#performance-tips)

## Overview

Column and Bar charts are among the most common chart types for comparing discrete categories of data. Columns display vertically while bars display horizontally.

**Key Differences:**
- **Column:** Vertical bars, categories on X-axis, values on Y-axis
- **Bar:** Horizontal bars, categories on Y-axis, values on X-axis

**Common Use Cases:**
- Comparing quantities across categories
- Showing rankings or distributions
- Displaying survey results
- Sales comparisons by product, region, or time period

## Column Chart

Column charts display data as vertical rectangular bars with heights proportional to the values they represent.

### Basic Column Chart

```cshtml
<ejs-chart id="columnChart" title="Sales by Product">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Sales ($1000)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Product" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
public IActionResult Index()
{
    ViewBag.ChartData = new object[]
    {
        new { Product = "Laptop", Sales = 120 },
        new { Product = "Desktop", Sales = 80 },
        new { Product = "Tablet", Sales = 150 },
        new { Product = "Phone", Sales = 200 },
        new { Product = "Accessories", Sales = 90 }
    };
    return View();
}
```

### Multiple Column Series

Compare multiple datasets side by side:

```cshtml
<ejs-chart id="multiColumnChart" title="Quarterly Sales Comparison">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Q1Data" 
                  xName="Region" 
                  yName="Sales" 
                  name="Q1 2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="@ViewBag.Q2Data" 
                  xName="Region" 
                  yName="Sales" 
                  name="Q2 2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
        <e-series dataSource="@ViewBag.Q3Data" 
                  xName="Region" 
                  yName="Sales" 
                  name="Q3 2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

```csharp
ViewBag.Q1Data = new object[]
{
    new { Region = "North", Sales = 45 },
    new { Region = "South", Sales = 32 },
    new { Region = "East", Sales = 38 },
    new { Region = "West", Sales = 50 }
};
ViewBag.Q2Data = new object[]
{
    new { Region = "North", Sales = 52 },
    new { Region = "South", Sales = 38 },
    new { Region = "East", Sales = 42 },
    new { Region = "West", Sales = 55 }
};
// Similar for Q3Data
```

### Column Spacing and Width

Control spacing between columns:

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="Category" 
          yName="Value" 
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
          columnWidth="0.8"
          columnSpacing="0.2">
</e-series>
```

**Properties:**
- `columnWidth`: Width of columns (0-1, default 0.7)
- `columnSpacing`: Space between columns (0-1, default 0)

## Bar Chart

Bar charts display horizontal bars, useful when category names are long or when showing rankings.

### Basic Bar Chart

```cshtml
<ejs-chart id="barChart" title="Top 10 Countries by GDP">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="GDP (Trillion $)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Country" 
                  yName="GDP" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bar">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Country = "United States", GDP = 21.43 },
    new { Country = "China", GDP = 14.34 },
    new { Country = "Japan", GDP = 5.08 },
    new { Country = "Germany", GDP = 3.86 },
    new { Country = "United Kingdom", GDP = 2.83 }
};
```

### Multiple Bar Series

```cshtml
<ejs-chart id="multiBarChart" title="Employee Count by Department">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Year2022" 
                  xName="Department" 
                  yName="Count" 
                  name="2022"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bar">
        </e-series>
        <e-series dataSource="@ViewBag.Year2023" 
                  xName="Department" 
                  yName="Count" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Bar">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### Bar vs Column: When to Use Each

**Use Column Charts when:**
- Categories are short (1-2 words)
- Showing time-based comparisons
- Emphasizing vertical growth/decline
- Standard comparison visualizations

**Use Bar Charts when:**
- Category names are long
- Many categories (>10)
- Showing rankings or ordered data
- Horizontal space is limited

## Stacked Column and Bar

Stacked charts show composition and total, with segments stacked vertically (column) or horizontally (bar).

### Stacked Column

```cshtml
<ejs-chart id="stackedColumn" title="Revenue Breakdown by Quarter">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Revenue ($M)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ProductA" 
                  xName="Quarter" 
                  yName="Revenue" 
                  name="Product A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.ProductB" 
                  xName="Quarter" 
                  yName="Revenue" 
                  name="Product B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
        <e-series dataSource="@ViewBag.ProductC" 
                  xName="Quarter" 
                  yName="Revenue" 
                  name="Product C"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

```csharp
ViewBag.ProductA = new object[]
{
    new { Quarter = "Q1", Revenue = 25 },
    new { Quarter = "Q2", Revenue = 30 },
    new { Quarter = "Q3", Revenue = 28 },
    new { Quarter = "Q4", Revenue = 35 }
};
ViewBag.ProductB = new object[]
{
    new { Quarter = "Q1", Revenue = 20 },
    new { Quarter = "Q2", Revenue = 25 },
    new { Quarter = "Q3", Revenue = 22 },
    new { Quarter = "Q4", Revenue = 28 }
};
ViewBag.ProductC = new object[]
{
    new { Quarter = "Q1", Revenue = 15 },
    new { Quarter = "Q2", Revenue = 18 },
    new { Quarter = "Q3", Revenue = 20 },
    new { Quarter = "Q4", Revenue = 22 }
};
```

### Stacked Bar

```cshtml
<ejs-chart id="stackedBar" title="Market Share by Region">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.CompanyA" 
                  xName="Region" 
                  yName="Share" 
                  name="Company A"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar">
        </e-series>
        <e-series dataSource="@ViewBag.CompanyB" 
                  xName="Region" 
                  yName="Share" 
                  name="Company B"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

### Stacking Groups

Group different series into separate stacks:

```cshtml
<e-series-collection>
    <e-series stackingGroup="Group1" name="2022 Sales"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
    </e-series>
    <e-series stackingGroup="Group1" name="2022 Returns"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
    </e-series>
    <e-series stackingGroup="Group2" name="2023 Sales"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
    </e-series>
    <e-series stackingGroup="Group2" name="2023 Returns"
              type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn">
    </e-series>
</e-series-collection>
```

## 100% Stacked Charts

Show relative percentage contribution of each series, with total always reaching 100%.

### 100% Stacked Column

```cshtml
<ejs-chart id="fullStackedColumn" title="Budget Allocation (%)">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Percentage (%)" 
                          labelFormat="{value}%">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Development" 
                  xName="Year" 
                  yName="Percent" 
                  name="Development"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100">
        </e-series>
        <e-series dataSource="@ViewBag.Marketing" 
                  xName="Year" 
                  yName="Percent" 
                  name="Marketing"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100">
        </e-series>
        <e-series dataSource="@ViewBag.Operations" 
                  xName="Year" 
                  yName="Percent" 
                  name="Operations"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn100">
        </e-series>
    </e-series-collection>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
</ejs-chart>
```

```csharp
ViewBag.Development = new object[]
{
    new { Year = "2020", Percent = 40 },
    new { Year = "2021", Percent = 45 },
    new { Year = "2022", Percent = 50 },
    new { Year = "2023", Percent = 48 }
};
ViewBag.Marketing = new object[]
{
    new { Year = "2020", Percent = 35 },
    new { Year = "2021", Percent = 30 },
    new { Year = "2022", Percent = 28 },
    new { Year = "2023", Percent = 30 }
};
ViewBag.Operations = new object[]
{
    new { Year = "2020", Percent = 25 },
    new { Year = "2021", Percent = 25 },
    new { Year = "2022", Percent = 22 },
    new { Year = "2023", Percent = 22 }
};
```

### 100% Stacked Bar

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingBar100"
          dataSource="@ViewBag.Data"
          xName="Category"
          yName="Value"
          name="Series Name">
</e-series>
```

## Range Column Chart

Range column charts display data with minimum and maximum values for each point.

```cshtml
<ejs-chart id="rangeColumn" title="Temperature Range">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Temperature (°C)">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  low="MinTemp" 
                  high="MaxTemp" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.RangeColumn">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { Month = "Jan", MinTemp = -2, MaxTemp = 8 },
    new { Month = "Feb", MinTemp = 0, MaxTemp = 10 },
    new { Month = "Mar", MinTemp = 3, MaxTemp = 15 },
    new { Month = "Apr", MinTemp = 7, MaxTemp = 20 },
    new { Month = "May", MinTemp = 12, MaxTemp = 25 },
    new { Month = "Jun", MinTemp = 16, MaxTemp = 30 }
};
```

**Use Cases:**
- Temperature ranges (min/max)
- Price ranges (low/high)
- Forecast ranges (best/worst case)
- Statistical ranges (confidence intervals)

## Vertical Chart

Invert the chart to change axis orientation (column becomes bar, bar becomes column).

```cshtml
<ejs-chart id="verticalChart" 
           title="Sales Ranking" 
           isTransposed="true">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Product" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**Key Property:** `isTransposed="true"` swaps X and Y axes.

## Customization Options

### Column/Bar Colors

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="X" 
          yName="Y" 
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column"
          fill="#FF6384">
</e-series>
```

### Individual Point Colors

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="X" 
          yName="Y" 
          pointColorMapping="Color"
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
</e-series>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = "A", Y = 10, Color = "#FF6384" },
    new { X = "B", Y = 20, Color = "#36A2EB" },
    new { X = "C", Y = 15, Color = "#FFCE56" }
};
```

### Border Customization

```cshtml
@{
    border={ width="2" color="#000000" }
}
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column" border="border">
</e-series>
```

### Corner Radius

Create rounded columns/bars:

```cshtml
<e-series type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
    <e-series-cornerradius topLeft="10" topRight="10"></e-series-cornerradius>
</e-series>
```

### Data Labels

Add labels to show values:

```cshtml
<e-series dataSource="@ViewBag.ChartData" 
          xName="X" 
          yName="Y" 
          type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
    <e-series-datalabel visible="true" 
                        position="@Syncfusion.EJ2.Charts.LabelPosition.Top"
                        font-fontWeight="600">
    </e-series-datalabel>
</e-series>
```

**Label positions:**
- `Top` - Above column/bar
- `Middle` - Center of column/bar
- `Bottom` - Below column/bar
- `Outer` - Outside the column/bar

### Empty Points

Handle missing data:

```cshtml
<e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
    <e-series-emptypointsettings mode="@Syncfusion.EJ2.Charts.EmptyPointMode.Average" fill="lightgray">
    </e-series-emptypointsettings>
</e-series>
```

## When to Use

### Column Chart Usage
**Best for:**
- Comparing discrete categories
- Time-based comparisons (months, years)
- Showing changes in a single metric across categories
- Small to medium number of categories (2-12)

**Examples:** Monthly sales, product comparisons, year-over-year growth

### Bar Chart Usage
**Best for:**
- Many categories or long category names
- Rankings or ordered data
- Comparing values when horizontal space is better
- When categories need more readability

**Examples:** Top performers, survey results, country comparisons

### Stacked Column/Bar
**Best for:**
- Part-to-whole relationships
- Showing composition along with totals
- Comparing totals AND breakdown across categories

**Examples:** Revenue by product line, budget allocation, demographic breakdown

### 100% Stacked
**Best for:**
- Relative proportions (not absolute values)
- Comparing composition percentages
- Market share analysis

**Examples:** Market share over time, portfolio allocation, survey percentages

### Range Column
**Best for:**
- Displaying minimum and maximum values
- Showing variation or spread
- Forecast ranges or confidence intervals

**Examples:** Temperature ranges, price fluctuations, estimation ranges

## Performance Tips

1. **Limit categories:** Keep to <50 for optimal rendering
2. **Animation:** Disable for large datasets (`enableAnimation="false"`)
3. **Data labels:** Use selectively on many columns
4. **Stacking:** Limit to 5-7 series per stack
5. **Colors:** Use distinct, accessible colors for multiple series
6. **Spacing:** Adjust column spacing for better readability with many categories
