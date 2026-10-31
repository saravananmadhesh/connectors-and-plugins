# Axis Types in Cartesian Charts

## Table of Contents
- [Overview](#overview)
- [NumericalAxis](#numericalaxis)
- [CategoryAxis](#categoryaxis)
- [DateTimeAxis](#datetimeaxis)
- [LogarithmicAxis](#logarithmicaxis)
- [When to Use Each Type](#when-to-use-each-type)

## Overview

Cartesian charts use axes to position data points within the chart area. The horizontal (X) and vertical (Y) axes can be configured independently using different axis types based on your data characteristics.

**Available Axis Types:**
- **NumericalAxis** - For continuous numeric data
- **CategoryAxis** - For discrete categorical data
- **DateTimeAxis** - For time-series data
- **LogarithmicAxis** - For logarithmic scale visualization

Both XAxes and YAxes properties accept collections, allowing multiple axes per chart.

## NumericalAxis

NumericalAxis plots numerical values on a linear scale. It's the most common axis type for quantitative data.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
</chart:SfCartesianChart>
```

**C#:**
```csharp
NumericalAxis xAxis = new NumericalAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);
```

### Interval Configuration

Control the spacing between axis labels:

**XAML:**
```xaml
<chart:NumericalAxis Interval="10"/>
```

**C#:**
```csharp
NumericalAxis axis = new NumericalAxis();
axis.Interval = 10;
```

The interval is calculated automatically if not specified.

### Range Customization

Set explicit minimum and maximum values:

**XAML:**
```xaml
<chart:NumericalAxis Minimum="0" 
                    Maximum="100" 
                    Interval="20"/>
```

**C#:**
```csharp
NumericalAxis axis = new NumericalAxis();
axis.Minimum = 0;
axis.Maximum = 100;
axis.Interval = 20;
```

**Note:** If you set only Minimum or Maximum, the other value is calculated automatically from the data.

### Use Cases

- Sales amounts, revenue, profit
- Measurements (temperature, weight, distance)
- Percentages and ratios
- Scientific data (voltage, pressure, speed)
- Any continuous numeric data

## CategoryAxis

CategoryAxis plots data based on index position. Points are equally spaced regardless of their actual values. Ideal for discrete categories.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
</chart:SfCartesianChart>
```

**C#:**
```csharp
CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);
```

### Label Placement

Control whether labels appear on tick marks or between them:

**XAML:**
```xaml
<!-- Labels on tick marks (default) -->
<chart:CategoryAxis LabelPlacement="OnTicks"/>

<!-- Labels between tick marks -->
<chart:CategoryAxis LabelPlacement="BetweenTicks"/>
```

**C#:**
```csharp
CategoryAxis axis = new CategoryAxis();
axis.LabelPlacement = LabelPlacement.BetweenTicks;
```

**OnTicks** - Labels align with tick marks (good for point-based data)  
**BetweenTicks** - Labels center between ticks (good for ranges/bars)

### Interval

Control label frequency:

**XAML:**
```xaml
<chart:CategoryAxis Interval="2"/>
```

**C#:**
```csharp
CategoryAxis axis = new CategoryAxis();
axis.Interval = 2; // Show every 2nd label
```

### Use Cases

- Product names, categories
- Employee names, teams
- Countries, regions, cities
- Months, quarters (when order matters more than date arithmetic)
- Any discrete, non-numeric labels

## DateTimeAxis

DateTimeAxis handles DateTime values, automatically formatting and spacing labels based on time intervals.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis>
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM-yy"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfCartesianChart.XAxes>
</chart:SfCartesianChart>
```

**C#:**
```csharp
DateTimeAxis xAxis = new DateTimeAxis();
xAxis.LabelStyle = new LabelStyle 
{ 
    LabelFormat = "MMM-yy" 
};
chart.XAxes.Add(xAxis);
```

### Interval and IntervalType

Specify interval size and unit:

**XAML:**
```xaml
<chart:DateTimeAxis Interval="6" 
                   IntervalType="Months">
    <chart:DateTimeAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="MMM-yy"/>
    </chart:DateTimeAxis.LabelStyle>
</chart:DateTimeAxis>
```

**C#:**
```csharp
DateTimeAxis axis = new DateTimeAxis();
axis.Interval = 6;
axis.IntervalType = DateTimeIntervalType.Months;
axis.LabelStyle = new LabelStyle { LabelFormat = "MMM-yy" };
```

**IntervalType Options:**
- `Auto` - Automatically determined
- `Years`
- `Months`
- `Days`
- `Hours`
- `Minutes`
- `Seconds`
- `Milliseconds`

### Range Customization

**XAML:**
```xaml
<chart:DateTimeAxis Minimum="2024/01/01" 
                   Maximum="2024/12/31">
    <chart:DateTimeAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="MMM-dd"/>
    </chart:DateTimeAxis.LabelStyle>
</chart:DateTimeAxis>
```

**C#:**
```csharp
DateTimeAxis axis = new DateTimeAxis();
axis.Minimum = new DateTime(2024, 1, 1);
axis.Maximum = new DateTime(2024, 12, 31);
axis.LabelStyle = new LabelStyle { LabelFormat = "MMM-dd" };
```

### Common Date Formats

```
"yyyy" - 2024
"MMM-yy" - Jan-24
"MMM-dd" - Jan-15
"dd/MM/yyyy" - 15/01/2024
"MM/dd/yyyy" - 01/15/2024
"yyyy-MM-dd" - 2024-01-15
"HH:mm" - 14:30
"HH:mm:ss" - 14:30:45
```

### Use Cases

- Stock prices over time
- Temperature trends
- Sales over months/years
- Real-time sensor data
- Historical analysis
- Any time-series data

## LogarithmicAxis

LogarithmicAxis uses logarithmic scale, ideal for data spanning multiple orders of magnitude.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.YAxes>
        <chart:LogarithmicAxis/>
    </chart:SfCartesianChart.YAxes>
</chart:SfCartesianChart>
```

**C#:**
```csharp
LogarithmicAxis yAxis = new LogarithmicAxis();
chart.YAxes.Add(yAxis);
```

### Logarithmic Base

Customize the logarithmic base (default is 10):

**XAML:**
```xaml
<chart:LogarithmicAxis LogarithmicBase="2"/>
```

**C#:**
```csharp
LogarithmicAxis axis = new LogarithmicAxis();
axis.LogarithmicBase = 2; // Binary logarithm
```

Common bases: 10 (decimal), 2 (binary), e (~2.718, natural logarithm)

### Interval

**XAML:**
```xaml
<chart:LogarithmicAxis Interval="1"/>
```

**C#:**
```csharp
LogarithmicAxis axis = new LogarithmicAxis();
axis.Interval = 1; // Powers of base
```

### Range Customization

**XAML:**
```xaml
<chart:LogarithmicAxis Minimum="1" 
                      Maximum="1000000"/>
```

**C#:**
```csharp
LogarithmicAxis axis = new LogarithmicAxis();
axis.Minimum = 1;
axis.Maximum = 1000000;
```

### Use Cases

- Population growth
- Earthquake magnitudes (Richter scale)
- Sound intensity (decibels)
- pH levels in chemistry
- Financial data with exponential growth
- Scientific data spanning orders of magnitude (1 to 1,000,000)

## When to Use Each Type

### Decision Flow

**Is your data numeric?**
- No → Use **CategoryAxis** (for labels like names, products, categories)
- Yes → Continue...

**Does your data represent dates/times?**
- Yes → Use **DateTimeAxis** (automatic date formatting and spacing)
- No → Continue...

**Does your data span multiple orders of magnitude (e.g., 1 to 1,000,000)?**
- Yes → Use **LogarithmicAxis** (compress large ranges, highlight proportional changes)
- No → Use **NumericalAxis** (standard linear scale)

### Comparison Table

| Axis Type | Data Type | Spacing | Best For |
|-----------|-----------|---------|----------|
| **NumericalAxis** | Numeric | Proportional | Continuous numeric data |
| **CategoryAxis** | Any | Equal | Discrete categories, labels |
| **DateTimeAxis** | DateTime | Proportional | Time-series data |
| **LogarithmicAxis** | Numeric (>0) | Logarithmic | Wide-ranging exponential data |

### Examples by Scenario

**Sales by Product Name**
- X: CategoryAxis (product names)
- Y: NumericalAxis (sales amounts)

**Stock Price Over Time**
- X: DateTimeAxis (dates)
- Y: NumericalAxis (prices)

**Population Growth by Year**
- X: NumericalAxis (years) or DateTimeAxis
- Y: LogarithmicAxis (population spans orders of magnitude)

**Temperature vs. Pressure**
- X: NumericalAxis (temperature)
- Y: NumericalAxis (pressure)

**Website Traffic by Month**
- X: CategoryAxis (month names) or DateTimeAxis
- Y: NumericalAxis (visitor count)

## Common Patterns

### Mixed Axis Types

```xaml
<chart:SfCartesianChart>
    <!-- Categorical X-axis -->
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Products"/>
    </chart:SfCartesianChart.XAxes>
    
    <!-- Numeric Y-axis -->
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Revenue ($)"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="ProductName"
                       YBindingPath="Revenue"/>
</chart:SfCartesianChart>
```

### Time-Series with Multiple Y-Axes

When using multiple axes, assign a `Name` to each axis and reference it from series using `XAxisName` or `YAxisName`:

```xaml
<chart:SfCartesianChart>
    <!-- DateTime X-axis -->
    <chart:SfCartesianChart.XAxes>
        <chart:DateTimeAxis>
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM-dd"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfCartesianChart.XAxes>
    
    <!-- Multiple Y-axes -->
    <chart:SfCartesianChart.YAxes>
        <!-- Primary Y-axis for price (index 0, default) -->
        <chart:NumericalAxis Header="Price ($)"/>
        
        <!-- Secondary Y-axis for volume -->
        <chart:NumericalAxis Name="VolumeAxis" 
                           Header="Volume"
                           OpposedPosition="True"/>
    </chart:SfCartesianChart.YAxes>
    
    <!-- Series must specify which axis to use -->
    <chart:SfCartesianChart.Series>
        <!-- Uses default Y-axis (index 0) -->
        <chart:LineSeries ItemsSource="{Binding PriceData}"
                         XBindingPath="Date"
                         YBindingPath="Price"
                         Label="Price"/>
        
        <!-- Explicitly uses VolumeAxis -->
        <chart:ColumnSeries ItemsSource="{Binding VolumeData}"
                           XBindingPath="Date"
                           YBindingPath="Volume"
                           YAxisName="VolumeAxis"
                           Label="Volume"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

// Add X-axis
DateTimeAxis xAxis = new DateTimeAxis();
xAxis.LabelStyle = new LabelStyle { LabelFormat = "MMM-dd" };
chart.XAxes.Add(xAxis);

// Add primary Y-axis (index 0)
NumericalAxis priceAxis = new NumericalAxis();
priceAxis.Header = "Price ($)";
chart.YAxes.Add(priceAxis);

// Add secondary Y-axis with name
NumericalAxis volumeAxis = new NumericalAxis();
volumeAxis.Name = "VolumeAxis";
volumeAxis.Header = "Volume";
volumeAxis.OpposedPosition = true;
chart.YAxes.Add(volumeAxis);

// Price series uses default Y-axis (index 0)
LineSeries priceSeries = new LineSeries();
priceSeries.ItemsSource = viewModel.PriceData;
priceSeries.XBindingPath = "Date";
priceSeries.YBindingPath = "Price";
priceSeries.Label = "Price";
chart.Series.Add(priceSeries);

// Volume series uses named Y-axis
ColumnSeries volumeSeries = new ColumnSeries();
volumeSeries.ItemsSource = viewModel.VolumeData;
volumeSeries.XBindingPath = "Date";
volumeSeries.YBindingPath = "Volume";
volumeSeries.YAxisName = "VolumeAxis"; // Associate with named axis
volumeSeries.Label = "Volume";
chart.Series.Add(volumeSeries);
```

**Key Points:**
- Assign a `Name` property to axes you want to reference explicitly
- Use `YAxisName` or `XAxisName` on series to associate with named axes
- Series without explicit axis names use the axis at index 0 (first axis)
- Use `OpposedPosition="True"` to display the secondary axis on the opposite side

## Troubleshooting

**Labels overlapping:**
- Increase Interval
- Use LabelRotation
- Format labels to be shorter (e.g., "Jan" instead of "January")

**Data not showing:**
- Verify data type matches axis type (numeric for NumericalAxis, DateTime for DateTimeAxis)
- Check that Minimum/Maximum range includes your data
- Ensure binding paths point to correct property types

**LogarithmicAxis errors:**
- Data must be positive (>0)
- Avoid zero or negative values
- Use NumericalAxis if data includes zero

**CategoryAxis not spacing correctly:**
- Data will be equally spaced by index, not by value
- Use NumericalAxis or DateTimeAxis if proportional spacing is needed
