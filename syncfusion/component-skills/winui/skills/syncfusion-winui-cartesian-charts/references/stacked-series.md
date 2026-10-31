# Stacked Series Types in Cartesian Charts

## Table of Contents
- [Overview](#overview)
- [Stacked Column Series](#stacked-column-series)
- [Stacked Bar Series](#stacked-bar-series)
- [Stacked Line Series](#stacked-line-series)
- [Stacked Area Series](#stacked-area-series)
- [Stacked100 Series](#stacked100-series)
- [Grouping Stacked Series](#grouping-stacked-series)
- [Use Cases and Patterns](#use-cases-and-patterns)
- [Troubleshooting Tips](#troubleshooting-tips)

## Overview

Stacked series in Syncfusion WinUI Cartesian Charts allow multiple data series to be stacked vertically, showing both individual values and cumulative totals. This is particularly useful for part-to-whole relationships and comparing contributions of different categories over time.

**Key Features:**
- Stack multiple series to show cumulative values
- Compare individual contributions
- Stacked100 variants show percentages
- Support for grouped stacking
- Available for Column, Bar, Line, and Area series

## Stacked Column Series

Stacked column series displays multiple series as vertical columns stacked on top of each other, showing both individual and cumulative values.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedColumnSeries XBindingPath="Month"    
                              YBindingPath="Gold" 
                              Label="Gold"
                              ItemsSource="{Binding MedalData}"/>

    <chart:StackedColumnSeries XBindingPath="Month" 
                              YBindingPath="Silver" 
                              Label="Silver"
                              ItemsSource="{Binding MedalData}"/> 

    <chart:StackedColumnSeries XBindingPath="Month" 
                              YBindingPath="Bronze" 
                              Label="Bronze"
                              ItemsSource="{Binding MedalData}"/>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

StackedColumnSeries series1 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().MedalData,
    XBindingPath = "Month",
    YBindingPath = "Gold",
    Label = "Gold"
};

StackedColumnSeries series2 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().MedalData,
    XBindingPath = "Month",
    YBindingPath = "Silver",
    Label = "Silver"
};

StackedColumnSeries series3 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().MedalData,
    XBindingPath = "Month",
    YBindingPath = "Bronze",
    Label = "Bronze"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
this.Content = chart;
```

### Data Model for Stacked Series

```csharp
public class MedalData
{
    public string Month { get; set; }
    public double Gold { get; set; }
    public double Silver { get; set; }
    public double Bronze { get; set; }
}

public class ViewModel
{
    public List<MedalData> MedalData { get; set; }
    
    public ViewModel()
    {
        MedalData = new List<MedalData>
        {
            new MedalData { Month = "Jan", Gold = 5, Silver = 7, Bronze = 3 },
            new MedalData { Month = "Feb", Gold = 8, Silver = 5, Bronze = 6 },
            new MedalData { Month = "Mar", Gold = 6, Silver = 9, Bronze = 4 },
            new MedalData { Month = "Apr", Gold = 7, Silver = 6, Bronze = 8 }
        };
    }
}
```

### When to Use Stacked Column Series

- Showing part-to-whole relationships over categories
- Sales breakdown by product category across regions
- Budget allocation across departments over quarters
- Resource utilization by type over time periods
- Market share distribution among competitors

## Stacked Bar Series

Stacked bar series is the horizontal version of stacked column series, created by transposing the chart.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart IsTransposed="True">
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedColumnSeries XBindingPath="Region"    
                              YBindingPath="Q1" 
                              Label="Q1"
                              ItemsSource="{Binding SalesData}"/>

    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="Q2" 
                              Label="Q2"
                              ItemsSource="{Binding SalesData}"/> 

    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="Q3" 
                              Label="Q3"
                              ItemsSource="{Binding SalesData}"/>
                              
    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="Q4" 
                              Label="Q4"
                              ItemsSource="{Binding SalesData}"/>

</chart:SfCartesianChart>
```

### When to Use Stacked Bar Series

- Long category names requiring more horizontal space
- Horizontal comparison of stacked values
- Progress tracking across multiple phases
- Ranking with multiple components

## Stacked Line Series

Stacked line series shows trends of cumulative values over time, connecting stacked data points with lines.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedLineSeries XBindingPath="Month"    
                            YBindingPath="Product1" 
                            Label="Product 1"
                            ItemsSource="{Binding Data}"/>

    <chart:StackedLineSeries XBindingPath="Month" 
                            YBindingPath="Product2"
                            Label="Product 2"
                            ItemsSource="{Binding Data}"/> 

    <chart:StackedLineSeries XBindingPath="Month" 
                            YBindingPath="Product3"
                            Label="Product 3"
                            ItemsSource="{Binding Data}"/>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

StackedLineSeries series1 = new StackedLineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Product1",
    Label = "Product 1"
};

StackedLineSeries series2 = new StackedLineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Product2",
    Label = "Product 2"
};

StackedLineSeries series3 = new StackedLineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Product3",
    Label = "Product 3"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
```

### When to Use Stacked Line Series

- Cumulative trends over time
- Multiple product sales trends contributing to total
- Resource usage trends by category
- Continuous data with part-to-whole relationships

## Stacked Area Series

Stacked area series combines features of area and stacked series, filling areas between lines to emphasize cumulative values.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedAreaSeries XBindingPath="Year" 
                            YBindingPath="Electric" 
                            Label="Electric"
                            ItemsSource="{Binding EnergyData}" />

    <chart:StackedAreaSeries XBindingPath="Year"         
                            YBindingPath="Gas" 
                            Label="Gas"
                            ItemsSource="{Binding EnergyData}" />

    <chart:StackedAreaSeries XBindingPath="Year"                 
                            YBindingPath="Coal" 
                            Label="Coal"
                            ItemsSource="{Binding EnergyData}" />

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

StackedAreaSeries series1 = new StackedAreaSeries()
{
    ItemsSource = new ViewModel().EnergyData,
    XBindingPath = "Year",
    YBindingPath = "Electric",
    Label = "Electric"
};

StackedAreaSeries series2 = new StackedAreaSeries()
{
    ItemsSource = new ViewModel().EnergyData,
    XBindingPath = "Year",
    YBindingPath = "Gas",
    Label = "Gas"
};

StackedAreaSeries series3 = new StackedAreaSeries()
{
    ItemsSource = new ViewModel().EnergyData,
    XBindingPath = "Year",
    YBindingPath = "Coal",
    Label = "Coal"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
```

### When to Use Stacked Area Series

- Visualizing cumulative resource consumption
- Energy usage by source over time
- Market composition changes over time
- Emphasizing both individual and total values with filled areas

## Stacked100 Series

Stacked100 series show the relative percentage of each series contributing to the total, with the cumulative sum always equaling 100%.

### Stacked Column 100 Series

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedColumn100Series XBindingPath="Region" 
                                 YBindingPath="Online" 
                                 Label="Online"
                                 ItemsSource="{Binding SalesData}"/>

    <chart:StackedColumn100Series XBindingPath="Region"
                                 YBindingPath="Retail" 
                                 Label="Retail"
                                 ItemsSource="{Binding SalesData}"/>

    <chart:StackedColumn100Series XBindingPath="Region" 
                                 YBindingPath="Wholesale" 
                                 Label="Wholesale"
                                 ItemsSource="{Binding SalesData}"/>

</chart:SfCartesianChart>
```

### Stacked Line 100 Series

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  

    <chart:StackedLine100Series ItemsSource="{Binding Data}" 
                               XBindingPath="Month" 
                               YBindingPath="Category1"
                               Label="Category 1" />

    <chart:StackedLine100Series ItemsSource="{Binding Data}"
                               XBindingPath="Month"  
                               YBindingPath="Category2"
                               Label="Category 2" />

    <chart:StackedLine100Series ItemsSource="{Binding Data}"
                               XBindingPath="Month" 
                               YBindingPath="Category3"
                               Label="Category 3"/>

</chart:SfCartesianChart>
```

### Stacked Area 100 Series

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  
    
    <chart:StackedArea100Series XBindingPath="Month"         
                               YBindingPath="Desktop" 
                               Label="Desktop"
                               ItemsSource="{Binding TrafficData}" />

    <chart:StackedArea100Series XBindingPath="Month" 
                               YBindingPath="Mobile" 
                               Label="Mobile"
                               ItemsSource="{Binding TrafficData}" />

    <chart:StackedArea100Series XBindingPath="Month" 
                               YBindingPath="Tablet" 
                               Label="Tablet"
                               ItemsSource="{Binding TrafficData}" />

</chart:SfCartesianChart>
```

### When to Use Stacked100 Series

- Showing percentage contributions (market share, composition)
- Comparing proportions across categories
- Budget allocation percentages over time
- When absolute values are less important than relative proportions
- Traffic sources, device usage, or demographic breakdowns

## Grouping Stacked Series

Group related stacked series together using the `GroupName` property. Series with the same group name are stacked together.

### Basic Grouping

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  
    
    <!-- Group 1: First Half -->
    <chart:StackedColumnSeries GroupName="Group1" 
                              XBindingPath="Month" 
                              YBindingPath="Q1" 
                              Label="Q1"
                              ItemsSource="{Binding Data}"/>

    <chart:StackedColumnSeries GroupName="Group1" 
                              XBindingPath="Month" 
                              YBindingPath="Q2"
                              Label="Q2"
                              ItemsSource="{Binding Data}"/>

    <!-- Group 2: Second Half -->
    <chart:StackedColumnSeries GroupName="Group2" 
                              XBindingPath="Month"  
                              YBindingPath="Q3" 
                              Label="Q3"
                              ItemsSource="{Binding Data}"/>

    <chart:StackedColumnSeries GroupName="Group2" 
                              XBindingPath="Month"
                              YBindingPath="Q4" 
                              Label="Q4"
                              ItemsSource="{Binding Data}"/>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

// Group 1
StackedColumnSeries series1 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Q1",
    Label = "Q1",
    GroupName = "Group1"
};

StackedColumnSeries series2 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Q2",
    Label = "Q2",
    GroupName = "Group1"
};

// Group 2
StackedColumnSeries series3 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Q3",
    Label = "Q3",
    GroupName = "Group2"
};

StackedColumnSeries series4 = new StackedColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Month",
    YBindingPath = "Q4",
    Label = "Q4",
    GroupName = "Group2"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
chart.Series.Add(series4);
```

### When to Use Grouping

- Comparing multiple stacked sets side by side
- Before/After comparisons with stacked data
- Actual vs. Budget with multiple categories
- Comparing different time periods with same categories
- Team performance comparison with multiple metrics

## Use Cases and Patterns

### Pattern 1: Sales Analysis by Region and Product

```csharp
public class RegionalSales
{
    public string Region { get; set; }
    public double ProductA { get; set; }
    public double ProductB { get; set; }
    public double ProductC { get; set; }
}
```

**XAML:**
```xaml
<chart:SfCartesianChart Header="Regional Sales by Product">
    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="ProductA" 
                              Label="Product A"/>
    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="ProductB" 
                              Label="Product B"/>
    <chart:StackedColumnSeries XBindingPath="Region" 
                              YBindingPath="ProductC" 
                              Label="Product C"/>
</chart:SfCartesianChart>
```

### Pattern 2: Budget vs. Actual

```xaml
<chart:SfCartesianChart>
    <!-- Budget Group -->
    <chart:StackedColumnSeries GroupName="Budget"
                              XBindingPath="Category"
                              YBindingPath="BudgetAmount"
                              Label="Budget"/>
    
    <!-- Actual Group -->
    <chart:StackedColumnSeries GroupName="Actual"
                              XBindingPath="Category"
                              YBindingPath="ActualAmount"
                              Label="Actual"/>
</chart:SfCartesianChart>
```

### Pattern 3: Market Share Evolution

```xaml
<chart:SfCartesianChart>
    <chart:StackedArea100Series XBindingPath="Year"
                               YBindingPath="CompanyA"
                               Label="Company A"/>
    <chart:StackedArea100Series XBindingPath="Year"
                               YBindingPath="CompanyB"
                               Label="Company B"/>
    <chart:StackedArea100Series XBindingPath="Year"
                               YBindingPath="CompanyC"
                               Label="Company C"/>
</chart:SfCartesianChart>
```

## Troubleshooting Tips

### Series Not Stacking

**Problem:** Series appear side by side instead of stacked.

**Solution:** Ensure all series are the same stacked type (all StackedColumnSeries, not mixed with ColumnSeries).

```xaml
<!-- Wrong: Mixed types -->
<chart:ColumnSeries .../> 
<chart:StackedColumnSeries .../>

<!-- Correct: All stacked -->
<chart:StackedColumnSeries .../>
<chart:StackedColumnSeries .../>
```

### Incorrect Totals in Stacked100

**Problem:** Stacked100 series not showing 100%.

**Solution:** Check for null or negative values in data. All values should be non-negative.

```csharp
// Validate data
public bool ValidateStackedData()
{
    return Data.All(d => d.Value1 >= 0 && d.Value2 >= 0 && d.Value3 >= 0);
}
```

### Groups Not Working

**Problem:** GroupName not creating separate stacks.

**Solution:** Ensure exact match of GroupName strings (case-sensitive).

```xaml
<!-- These will NOT group together -->
<chart:StackedColumnSeries GroupName="group1" .../>
<chart:StackedColumnSeries GroupName="Group1" .../>

<!-- These WILL group together -->
<chart:StackedColumnSeries GroupName="Group1" .../>
<chart:StackedColumnSeries GroupName="Group1" .../>
```

### Legend Items Not Showing

**Problem:** Legend not displaying series.

**Solution:** Add Label property to each series and enable ChartLegend.

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCartesianChart.Legend>
    
    <chart:StackedColumnSeries Label="Series 1" .../>
    <chart:StackedColumnSeries Label="Series 2" .../>
</chart:SfCartesianChart>
```

### Colors Look Similar

**Problem:** Difficult to distinguish between stacked series.

**Solution:** Use PaletteBrushes with distinct colors.

```xaml
<chart:SfCartesianChart.Resources>
    <BrushCollection x:Key="distinctColors">
        <SolidColorBrush Color="#FF6B6B"/>
        <SolidColorBrush Color="#4ECDC4"/>
        <SolidColorBrush Color="#45B7D1"/>
        <SolidColorBrush Color="#96CEB4"/>
    </BrushCollection>
</chart:SfCartesianChart.Resources>

<chart:SfCartesianChart PaletteBrushes="{StaticResource distinctColors}">
    ...
</chart:SfCartesianChart>
```
