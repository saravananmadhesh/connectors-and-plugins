# Pie Charts

## Table of Contents
- [Overview](#overview)
- [Creating a Pie Series](#creating-a-pie-series)
- [Radius Configuration](#radius-configuration)
- [Grouping Small Data Points](#grouping-small-data-points)
- [Semi-Pie and Partial Pie Charts](#semi-pie-and-partial-pie-charts)
- [Combination Charts](#combination-charts)
- [Best Practices](#best-practices)

## Overview

PieSeries displays data as segments of a circle, where each segment represents a proportion of the total. It's ideal for showing parts of a whole, such as market share, budget allocation, or survey results.

**When to use PieSeries:**
- Display proportional data (percentages, parts of whole)
- 5-7 categories maximum for readability
- Single data series visualization
- Emphasize relative sizes rather than exact values

## Creating a Pie Series

### Basic Pie Chart

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.ItemsSource = viewModel.Data;

chart.Series.Add(series);
```

### Pie Chart with Common Features

**XAML:**
```xml
<chart:SfCircularChart Header="Sales by Product">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       ShowDataLabels="True"
                       EnableTooltip="True"
                       LegendIcon="Circle"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
chart.Header = "Sales by Product";
chart.Legend = new ChartLegend();

PieSeries series = new PieSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.ShowDataLabels = true;
series.EnableTooltip = true;
series.LegendIcon = ChartLegendIcon.Circle;

chart.Series.Add(series);
```

## Radius Configuration

The **Radius** property controls the size of the pie chart. It accepts values from 0 to 1, where 1 fills the available space.

### Setting Radius

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       Radius="0.9"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.Radius = 0.9;  // 90% of available space

chart.Series.Add(series);
```

**Radius Values:**
- `0.5` - Half of available space (50%)
- `0.8` - 80% of available space (default-ish)
- `0.9` - 90% of available space (larger pie)
- `1.0` - 100% of available space (fills container)

**Use Cases:**
- Use smaller radius (0.5-0.7) when you have outside extended labels
- Use larger radius (0.8-0.95) for cleaner presentation
- Use radius < 0.5 when combining multiple series

## Grouping Small Data Points

Group small segments into an "Others" category using **GroupTo** and **GroupMode** properties. This improves readability when you have many small values.

### GroupMode Options

1. **Value** - Group by actual data value
2. **Percentage** - Group by percentage of total
3. **Angle** - Group by angle in degrees

### Group by Value

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       GroupMode="Value"
                       GroupTo="1000"
                       ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings ShowConnectorLine="True"
                                               ConnectorHeight="80"
                                               Context="DataLabelItem"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.GroupMode = PieGroupMode.Value;
series.GroupTo = 1000;  // Group all values less than 1000
series.ShowDataLabels = true;
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 80,
    Context = LabelContext.DataLabelItem
};

chart.Series.Add(series);
```

**Result:** All data points with values less than 1000 are grouped into a single "Others" segment.

### Group by Percentage

**XAML:**
```xml
<chart:PieSeries ItemsSource="{Binding Data}"
               XBindingPath="Category"
               YBindingPath="Amount"
               GroupMode="Percentage"
               GroupTo="5"/>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.GroupMode = PieGroupMode.Percentage;
series.GroupTo = 5;  // Group all segments less than 5%
```

**Result:** All segments representing less than 5% of the total are grouped into "Others".

### Group by Angle

**XAML:**
```xml
<chart:PieSeries ItemsSource="{Binding Data}"
               XBindingPath="Product"
               YBindingPath="Sales"
               GroupMode="Angle"
               GroupTo="30"/>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.GroupMode = PieGroupMode.Angle;
series.GroupTo = 30;  // Group all segments with angle less than 30 degrees
```

**Result:** All segments with an angle less than 30 degrees are grouped.

### Practical Grouping Example

```csharp
// Sample data with many small values
public class SalesData
{
    public string Region { get; set; }
    public double Revenue { get; set; }
}

var data = new List<SalesData>
{
    new SalesData { Region = "North", Revenue = 5000 },
    new SalesData { Region = "South", Revenue = 4500 },
    new SalesData { Region = "East", Revenue = 3000 },
    new SalesData { Region = "West", Revenue = 800 },   // Will be grouped
    new SalesData { Region = "Central", Revenue = 600 },  // Will be grouped
    new SalesData { Region = "Northeast", Revenue = 400 }  // Will be grouped
};
```

```xml
<!-- Group regions with less than 3% into "Others" -->
<chart:PieSeries ItemsSource="{Binding Data}"
               XBindingPath="Region"
               YBindingPath="Revenue"
               GroupMode="Percentage"
               GroupTo="3"
               ShowDataLabels="True"/>
```

## Semi-Pie and Partial Pie Charts

Create semi-circular or partial pie charts using **StartAngle** and **EndAngle** properties.

### Semi-Pie Chart (180 degrees)

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       StartAngle="180"
                       EndAngle="360"
                       ShowDataLabels="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.StartAngle = 180;  // Start at bottom
series.EndAngle = 360;    // End at bottom (180-degree arc)
series.ShowDataLabels = true;

chart.Series.Add(series);
```

### Quarter-Pie Chart (90 degrees)

**XAML:**
```xml
<chart:PieSeries StartAngle="0"
               EndAngle="90"
               ItemsSource="{Binding Data}"
               XBindingPath="Category"
               YBindingPath="Value"/>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.StartAngle = 0;
series.EndAngle = 90;  // 90-degree quarter circle
```

### Three-Quarter Pie (270 degrees)

**XAML:**
```xml
<chart:PieSeries StartAngle="0"
               EndAngle="270"
               ItemsSource="{Binding Data}"
               XBindingPath="Category"
               YBindingPath="Value"/>
```

### Angle Reference

**Angle positions (clockwise):**
- 0° - Right (3 o'clock)
- 90° - Bottom (6 o'clock)
- 180° - Left (9 o'clock)
- 270° - Top (12 o'clock)
- 360° - Right (back to start)

**Common Patterns:**
```xml
<!-- Top semi-circle -->
<chart:PieSeries StartAngle="270" EndAngle="90"/>

<!-- Bottom semi-circle -->
<chart:PieSeries StartAngle="90" EndAngle="270"/>

<!-- Left semi-circle -->
<chart:PieSeries StartAngle="180" EndAngle="360"/>

<!-- Right semi-circle -->
<chart:PieSeries StartAngle="0" EndAngle="180"/>
```

### Multiple Pie Series (Not Recommended)

While technically possible, overlapping multiple pie series is not recommended. Use multiple doughnut series instead for better visualization.

## Best Practices

### Data Preparation

1. **Limit categories** - Keep to 5-7 segments for readability
2. **Sort data** - Order by value (descending) for better presentation
3. **Use grouping** - Group small values to avoid tiny segments
4. **Meaningful names** - Use clear, concise category names

### Visual Design

1. **Choose appropriate radius** - Leave space for labels
2. **Enable tooltips** - For detailed information on hover
3. **Use data labels** - For critical values
4. **Add legend** - For category identification
5. **Consider colors** - Use contrasting colors for adjacent segments

### Performance

1. **Optimize data** - Don't bind thousands of items
2. **Use grouping** - Reduce number of visible segments
3. **Avoid animations** - On large datasets

## Common Scenarios

### Scenario 1: Market Share Analysis

```xml
<chart:SfCircularChart Header="Market Share Q1 2024">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend Placement="Right"/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding MarketData}"
                       XBindingPath="Company"
                       YBindingPath="Share"
                       GroupMode="Percentage"
                       GroupTo="2"
                       ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Context="Percentage"
                                               Position="Outside"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Budget Allocation

```xml
<chart:SfCircularChart Header="Annual Budget Distribution">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding BudgetData}"
                       XBindingPath="Department"
                       YBindingPath="Amount"
                       Radius="0.9"
                       ShowDataLabels="True"
                       EnableTooltip="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 3: Survey Results with Semi-Pie

```xml
<chart:SfCircularChart Header="Customer Satisfaction">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding SurveyResults}"
                       XBindingPath="Rating"
                       YBindingPath="Count"
                       StartAngle="180"
                       EndAngle="360"
                       ShowDataLabels="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```