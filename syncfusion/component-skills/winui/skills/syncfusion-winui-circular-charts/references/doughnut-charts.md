# Doughnut Charts

## Table of Contents
- [Overview](#overview)
- [Creating a Doughnut Series](#creating-a-doughnut-series)
- [Inner Radius Configuration](#inner-radius-configuration)
- [Multiple Doughnut Series](#multiple-doughnut-series)
- [Semi-Doughnut Charts](#semi-doughnut-charts)
- [Comparison with Pie Charts](#comparison-with-pie-charts)
- [Best Practices](#best-practices)

## Overview

DoughnutSeries is similar to PieSeries but features a hollow center, creating a ring shape. This design offers advantages for label placement, multiple series visualization, and modern aesthetics.

**When to use DoughnutSeries:**
- Need better label placement (can use center space)
- Want to display multiple concentric series
- Prefer modern, clean aesthetic
- Need to show central summary information
- Working with dense data requiring clearer segment separation

## Creating a Doughnut Series

### Basic Doughnut Chart

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

DoughnutSeries series = new DoughnutSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";

chart.Series.Add(series);
```

### Doughnut Chart with Features

**XAML:**
```xml
<chart:SfCircularChart Header="Sales Distribution">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate"
                            InnerRadius="0.6"
                            ShowDataLabels="True"
                            EnableTooltip="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
chart.Header = "Sales Distribution";
chart.Legend = new ChartLegend();

DoughnutSeries series = new DoughnutSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.InnerRadius = 0.6;
series.ShowDataLabels = true;
series.EnableTooltip = true;

chart.Series.Add(series);
```

## Inner Radius Configuration

The **InnerRadius** property controls the size of the hollow center. It accepts values from 0 to 1, where higher values create a thinner ring.

### Setting Inner Radius

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate"
                            InnerRadius="0.7"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
DoughnutSeries series = new DoughnutSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.InnerRadius = 0.7;  // 70% inner hole

chart.Series.Add(series);
```

### Inner Radius Values

**Effect of different values:**

- **0.0** - No inner hole (becomes a pie chart)
- **0.3** - Small center hole (thick ring)
- **0.5** - Medium center hole (balanced)
- **0.6** - Larger center hole (common default)
- **0.7** - Large center hole (thin ring)
- **0.8** - Very large center hole (very thin ring)
- **0.9** - Maximum practical inner radius

### Visual Examples

```xml
<!-- Thick doughnut (more pie-like) -->
<chart:DoughnutSeries InnerRadius="0.4"/>

<!-- Balanced doughnut -->
<chart:DoughnutSeries InnerRadius="0.6"/>

<!-- Thin ring doughnut -->
<chart:DoughnutSeries InnerRadius="0.8"/>
```

### Combining with Radius Property

Both **Radius** and **InnerRadius** can be used together:

**XAML:**
```xml
<chart:DoughnutSeries ItemsSource="{Binding Data}"
                    XBindingPath="Category"
                    YBindingPath="Value"
                    Radius="0.9"
                    InnerRadius="0.7"/>
```

**Result:** Large doughnut (90% of space) with large inner hole (70% inner radius)

## Multiple Doughnut Series

One of the key advantages of doughnut charts is the ability to display multiple concentric series for comparison.

### Two Doughnut Series

**XAML:**
```xml
<chart:SfCircularChart Header="Sales Comparison: 2023 vs 2024">
    <chart:SfCircularChart.Series>
        <!-- Outer series (2023 data) -->
        <chart:DoughnutSeries ItemsSource="{Binding Data2023}"
                            XBindingPath="Product"
                            YBindingPath="Sales"/>
        
        <!-- Inner series (2024 data) -->
        <chart:DoughnutSeries ItemsSource="{Binding Data2024}"
                            XBindingPath="Product"
                            YBindingPath="Sales"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
chart.Header = "Sales Comparison: 2023 vs 2024";

// Outer series
DoughnutSeries series1 = new DoughnutSeries();
series1.XBindingPath = "Product";
series1.YBindingPath = "Sales";
series1.ItemsSource = viewModel.Data2023;

// Inner series
DoughnutSeries series2 = new DoughnutSeries();
series2.XBindingPath = "Product";
series2.YBindingPath = "Sales";
series2.ItemsSource = viewModel.Data2024;

chart.Series.Add(series1);
chart.Series.Add(series2);
```

**Important:** The chart automatically spaces multiple doughnut series from outside to inside in the order they're added.

### Three Doughnut Series

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <!-- Outermost ring -->
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate1"/>
        
        <!-- Middle ring -->
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate2"/>
        
        <!-- Innermost ring -->
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate3"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

DoughnutSeries series1 = new DoughnutSeries();
series1.XBindingPath = "Product";
series1.YBindingPath = "SalesRate1";

DoughnutSeries series2 = new DoughnutSeries();
series2.XBindingPath = "Product";
series2.YBindingPath = "SalesRate2";

DoughnutSeries series3 = new DoughnutSeries();
series3.XBindingPath = "Product";
series3.YBindingPath = "SalesRate3";

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
```

### ViewModel for Multiple Series

```csharp
public class MultiYearData
{
    public string Product { get; set; }
    public double Sales2022 { get; set; }
    public double Sales2023 { get; set; }
    public double Sales2024 { get; set; }
}

public class ChartViewModel
{
    public List<MultiYearData> Data { get; set; }
    
    public ChartViewModel()
    {
        Data = new List<MultiYearData>()
        {
            new MultiYearData 
            { 
                Product = "Product A", 
                Sales2022 = 100, 
                Sales2023 = 120, 
                Sales2024 = 150 
            },
            new MultiYearData 
            { 
                Product = "Product B", 
                Sales2022 = 80, 
                Sales2023 = 90, 
                Sales2024 = 110 
            }
        };
    }
}
```

### Custom Spacing for Multiple Series

For more control over concentric series spacing, you can manually set InnerRadius:

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <!-- Outer ring: 100% to 70% -->
        <chart:DoughnutSeries Radius="1.0" 
                            InnerRadius="0.7"
                            ItemsSource="{Binding Data1}"/>
        
        <!-- Middle ring: 65% to 40% -->
        <chart:DoughnutSeries Radius="0.65" 
                            InnerRadius="0.4"
                            ItemsSource="{Binding Data2}"/>
        
        <!-- Inner ring: 35% to 0% (or small value) -->
        <chart:DoughnutSeries Radius="0.35" 
                            InnerRadius="0.1"
                            ItemsSource="{Binding Data3}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

## Semi-Doughnut Charts

Create semi-circular or partial doughnut charts using **StartAngle** and **EndAngle** properties.

### Semi-Doughnut (180 degrees)

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Product"
                            YBindingPath="SalesRate"
                            InnerRadius="0.6"
                            StartAngle="180"
                            EndAngle="360"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
DoughnutSeries series = new DoughnutSeries();
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
series.InnerRadius = 0.6;
series.StartAngle = 180;  // Start at bottom
series.EndAngle = 360;    // End at bottom (180-degree arc)

chart.Series.Add(series);
```

### Quarter-Doughnut (90 degrees)

**XAML:**
```xml
<chart:DoughnutSeries StartAngle="0"
                    EndAngle="90"
                    InnerRadius="0.5"
                    ItemsSource="{Binding Data}"
                    XBindingPath="Category"
                    YBindingPath="Value"/>
```

### Gauge-Style Semi-Doughnut

Create a gauge-like visualization:

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding GaugeData}"
                            XBindingPath="Label"
                            YBindingPath="Value"
                            InnerRadius="0.75"
                            StartAngle="180"
                            EndAngle="360"
                            ShowDataLabels="True">
            <chart:DoughnutSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Position="Inside"/>
            </chart:DoughnutSeries.DataLabelSettings>
        </chart:DoughnutSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

## Comparison with Pie Charts

### Similarities

Both PieSeries and DoughnutSeries:
- Display proportional data
- Support same features (data labels, tooltips, selection, explode)
- Use same binding properties (XBindingPath, YBindingPath)
- Support StartAngle/EndAngle for partial charts
- Can be customized with same appearance properties

### Key Differences

| Feature | PieSeries | DoughnutSeries |
|---------|-----------|----------------|
| **Shape** | Solid circle | Ring with hollow center |
| **InnerRadius** | N/A | 0.0 to 1.0 |
| **Center Space** | None | Available for content |
| **Multiple Series** | Overlapping (not ideal) | Concentric rings (ideal) |
| **Label Placement** | Limited | More flexible |
| **Visual Weight** | Heavier | Lighter, more modern |

### When to Choose Pie

- Simple, single series visualization
- Traditional presentation style preferred
- Emphasizing total/whole concept
- Maximum segment visibility

### When to Choose Doughnut

- Multiple series comparison needed
- Want to display central content/summary
- Modern, clean aesthetic preferred
- Need better label spacing
- Working with many categories

## Best Practices

### Inner Radius Selection

**Guidelines:**
- **0.5-0.6** - Good balance for single series
- **0.6-0.7** - Recommended for multiple series
- **0.7-0.8** - For thin, elegant rings
- **Avoid > 0.85** - Too thin, segments become hard to see

### Multiple Series

1. **Limit to 2-3 series** - More becomes cluttered
2. **Use consistent categories** - Same XBindingPath across series
3. **Consider color schemes** - Different palettes for each series
4. **Add legend** - Essential for identifying series

### Performance

1. **Reasonable data size** - Don't bind thousands of points per series
2. **Group small values** - Use GroupTo property
3. **Avoid excessive series** - 3 series maximum for clarity

### Accessibility

1. **Provide tooltips** - Show series name and value
2. **Use legend** - Identify which ring is which series
3. **Data labels** - Consider for critical values
4. **Contrast** - Ensure good color contrast between segments

## Common Scenarios

### Scenario 1: Year-over-Year Comparison

```xml
<chart:SfCircularChart Header="Revenue Comparison: 2023 vs 2024">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <!-- 2023 (outer ring) -->
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Quarter"
                            YBindingPath="Revenue2023"
                            Label="2023"/>
        
        <!-- 2024 (inner ring) -->
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Quarter"
                            YBindingPath="Revenue2024"
                            Label="2024"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Dashboard with Central Summary

```xml
<Grid>
    <chart:SfCircularChart>
        <chart:SfCircularChart.Series>
            <chart:DoughnutSeries ItemsSource="{Binding SalesData}"
                                XBindingPath="Region"
                                YBindingPath="Sales"
                                InnerRadius="0.7"
                                ShowDataLabels="True"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
    
    <!-- Central content overlay -->
    <StackPanel HorizontalAlignment="Center" 
                VerticalAlignment="Center">
        <TextBlock Text="Total Sales" 
                   FontSize="16" 
                   HorizontalAlignment="Center"/>
        <TextBlock Text="{Binding TotalSales, StringFormat='${0:N0}'}" 
                   FontSize="24" 
                   FontWeight="Bold"
                   HorizontalAlignment="Center"/>
    </StackPanel>
</Grid>
```

### Scenario 3: Gauge-Style Progress Indicator

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding ProgressData}"
                            XBindingPath="Category"
                            YBindingPath="Value"
                            InnerRadius="0.8"
                            StartAngle="180"
                            EndAngle="360"
                            ShowDataLabels="False"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```