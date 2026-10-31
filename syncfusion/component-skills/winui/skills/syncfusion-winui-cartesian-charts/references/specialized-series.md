# Specialized Series Types in Cartesian Charts

## Table of Contents
- [Overview](#overview)
- [Scatter Series](#scatter-series)
- [Bubble Series](#bubble-series)
- [Candle Series](#candle-series)
- [OHLC Series (HiLoOpenClose)](#ohlc-series-hilopenclose)
- [Financial Data Patterns](#financial-data-patterns)
- [Use Cases and Best Practices](#use-cases-and-best-practices)
- [Troubleshooting Tips](#troubleshooting-tips)

## Overview

Specialized series types in Syncfusion WinUI Cartesian Charts provide advanced visualization capabilities for specific data scenarios. These include Scatter series for correlation analysis, Bubble series for three-dimensional data, and financial series (Candle and OHLC) for stock market data.

**Key Features:**
- Advanced data visualization for specialized scenarios
- Support for multi-dimensional data (Bubble)
- Financial chart capabilities (Candle, OHLC)
- Customizable appearance and behavior
- Bullish/Bearish color differentiation for financial charts

## Scatter Series

Scatter series displays data points as individual markers without connecting lines, ideal for showing correlation between two variables or identifying patterns in data.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>

    <chart:SfCartesianChart.XAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes>  
                
    <chart:SfCartesianChart.Series>
        <chart:ScatterSeries PointHeight="7" 
                            PointWidth="7" 
                            ItemsSource="{Binding Data}" 
                            XBindingPath="XValue" 
                            YBindingPath="YValue"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

NumericalAxis xAxis = new NumericalAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

ScatterSeries series = new ScatterSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "XValue",
    YBindingPath = "YValue",
    PointHeight = 7,
    PointWidth = 7
};

chart.Series.Add(series);
this.Content = chart;
```

### Data Model for Scatter

```csharp
public class ScatterData
{
    public double XValue { get; set; }
    public double YValue { get; set; }
}

public class ViewModel
{
    public List<ScatterData> Data { get; set; }
    
    public ViewModel()
    {
        Data = new List<ScatterData>
        {
            new ScatterData { XValue = 23, YValue = 45 },
            new ScatterData { XValue = 45, YValue = 67 },
            new ScatterData { XValue = 12, YValue = 89 },
            new ScatterData { XValue = 67, YValue = 34 },
            new ScatterData { XValue = 89, YValue = 56 }
        };
    }
}
```

### Customizing Point Size and Shape

**PointHeight and PointWidth:**
```xaml
<chart:ScatterSeries PointHeight="10" 
                    PointWidth="10" 
                    ItemsSource="{Binding Data}" 
                    XBindingPath="XValue" 
                    YBindingPath="YValue"/>
```

**Custom Fill:**
```xaml
<chart:ScatterSeries Fill="Red"
                    Stroke="DarkRed"
                    PointHeight="8" 
                    PointWidth="8" 
                    ItemsSource="{Binding Data}" 
                    XBindingPath="XValue" 
                    YBindingPath="YValue"/>
```

### Multiple Scatter Series

Compare different datasets by adding multiple scatter series.

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Series>
        <chart:ScatterSeries ItemsSource="{Binding DataSet1}" 
                            XBindingPath="X" 
                            YBindingPath="Y"
                            Label="Dataset 1"
                            Fill="Blue"
                            PointHeight="6" 
                            PointWidth="6"/>
        
        <chart:ScatterSeries ItemsSource="{Binding DataSet2}" 
                            XBindingPath="X" 
                            YBindingPath="Y"
                            Label="Dataset 2"
                            Fill="Green"
                            PointHeight="6" 
                            PointWidth="6"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

### When to Use Scatter Series

- Analyzing correlation between two variables (height vs. weight, price vs. demand)
- Identifying patterns, clusters, or outliers in data
- Scientific research and statistical analysis
- Quality control and process analysis
- Distribution analysis

**Example Scenarios:**
- Temperature vs. Ice Cream Sales
- Study Hours vs. Test Scores
- Age vs. Blood Pressure
- Marketing Spend vs. Revenue

## Bubble Series

Bubble series displays three-dimensional data where each bubble's size represents a third variable in addition to X and Y coordinates.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis />
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis />
    </chart:SfCartesianChart.YAxes> 

    <chart:BubbleSeries ItemsSource="{Binding Data}" 
                       XBindingPath="Country" 
                       YBindingPath="Population" 
                       Size="Area" 
                       MinimumRadius="5" 
                       MaximumRadius="20"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

BubbleSeries series = new BubbleSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Country",
    YBindingPath = "Population",
    Size = "Area",
    MinimumRadius = 5,
    MaximumRadius = 20
};

chart.Series.Add(series);
this.Content = chart;
```

### Data Model for Bubble Series

```csharp
public class CountryData
{
    public string Country { get; set; }
    public double Population { get; set; }  // Y-axis
    public double Area { get; set; }        // Bubble size
    public double GDP { get; set; }
}

public class ViewModel
{
    public List<CountryData> Data { get; set; }
    
    public ViewModel()
    {
        Data = new List<CountryData>
        {
            new CountryData 
            { 
                Country = "USA", 
                Population = 331, 
                Area = 9834, 
                GDP = 21433 
            },
            new CountryData 
            { 
                Country = "China", 
                Population = 1439, 
                Area = 9597, 
                GDP = 14343 
            },
            new CountryData 
            { 
                Country = "India", 
                Population = 1380, 
                Area = 3287, 
                GDP = 2875 
            }
        };
    }
}
```

### Bubble Size Configuration

The `Size` property determines which data property controls the bubble size. Use `MinimumRadius` and `MaximumRadius` to constrain bubble sizes.

**XAML:**
```xaml
<chart:BubbleSeries ItemsSource="{Binding Data}" 
                   XBindingPath="Country" 
                   YBindingPath="Population" 
                   Size="GDP" 
                   MinimumRadius="10" 
                   MaximumRadius="50"
                   Label="Country Data"/>
```

**Key Properties:**
- **Size** - Property name for bubble size values
- **MinimumRadius** - Smallest bubble radius (in pixels)
- **MaximumRadius** - Largest bubble radius (in pixels)

### Customizing Bubble Appearance

**XAML:**
```xaml
<chart:BubbleSeries ItemsSource="{Binding Data}" 
                   XBindingPath="Country" 
                   YBindingPath="Population" 
                   Size="Area"
                   Fill="LightBlue"
                   Stroke="DarkBlue"
                   StrokeWidth="2"
                   MinimumRadius="8" 
                   MaximumRadius="30"/>
```

### Bubble Series with Different Colors

Use PaletteBrushes to assign different colors to bubbles.

**XAML:**
```xaml
<chart:SfCartesianChart.Resources>
    <BrushCollection x:Key="bubbleBrushes">
        <SolidColorBrush Color="#FF6B9E"/>
        <SolidColorBrush Color="#FAD02C"/>
        <SolidColorBrush Color="#6FD195"/>
        <SolidColorBrush Color="#5CA9FB"/>
    </BrushCollection>
</chart:SfCartesianChart.Resources>

<chart:BubbleSeries ItemsSource="{Binding Data}" 
                   XBindingPath="Country" 
                   YBindingPath="Population" 
                   Size="Area"
                   PaletteBrushes="{StaticResource bubbleBrushes}"
                   MinimumRadius="10" 
                   MaximumRadius="40"/>
```

### When to Use Bubble Series

- Visualizing three-dimensional data relationships
- Comparing entities across three metrics simultaneously
- Portfolio analysis (risk vs. return vs. market cap)
- Market research (price vs. sales vs. market share)
- Scientific data with three variables

**Example Scenarios:**
- Product Analysis: Price vs. Sales Volume vs. Profit Margin
- City Comparison: Population vs. Crime Rate vs. GDP
- Company Performance: Revenue vs. Employees vs. Market Cap
- Resource Planning: Cost vs. Time vs. Resources

## Candle Series

Candle series (candlestick chart) is a financial chart type used to represent price movements, showing open, high, low, and close values for each period.

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

    <chart:CandleSeries ItemsSource="{Binding StockData}"
                       XBindingPath="Date"
                       Open="Open"
                       High="High"
                       Low="Low"
                       Close="Close"/>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

CandleSeries series = new CandleSeries()
{
    ItemsSource = new ViewModel().StockData,
    XBindingPath = "Date",
    Open = "Open",
    High = "High",
    Low = "Low",
    Close = "Close"
};

chart.Series.Add(series);
this.Content = chart;
```

### Financial Data Model

```csharp
public class StockData
{
    public string Date { get; set; }
    public double Open { get; set; }
    public double High { get; set; }
    public double Low { get; set; }
    public double Close { get; set; }
    public double Volume { get; set; }
}

public class ViewModel
{
    public ObservableCollection<StockData> StockData { get; set; }
    
    public ViewModel()
    {
        StockData = new ObservableCollection<StockData>
        {
            new StockData { Date = "2024-01", High = 50, Low = 40, Open = 47, Close = 45 },
            new StockData { Date = "2024-02", High = 50, Low = 35, Open = 45, Close = 40 },
            new StockData { Date = "2024-03", High = 40, Low = 30, Open = 37, Close = 40 },
            new StockData { Date = "2024-04", High = 50, Low = 35, Open = 40, Close = 45 },
            new StockData { Date = "2024-05", High = 45, Low = 30, Open = 35, Close = 32 }
        };
    }
}
```

### Bull and Bear Colors

Customize colors for bullish (close >= open) and bearish (close < open) candles.

**XAML:**
```xaml
<chart:CandleSeries ItemsSource="{Binding StockData}"
                   XBindingPath="Date"
                   Open="Open"
                   High="High"
                   Low="Low"
                   Close="Close"
                   BullishBrush="Green"
                   BearishBrush="Red"/>
```

**C#:**
```csharp
CandleSeries series = new CandleSeries()
{
    ItemsSource = new ViewModel().StockData,
    XBindingPath = "Date",
    Open = "Open",
    High = "High",
    Low = "Low",
    Close = "Close",
    BullishBrush = new SolidColorBrush(Colors.Green),
    BearishBrush = new SolidColorBrush(Colors.Red)
};
```

### EnableSolidCandle

The `EnableSolidCandle` property determines how candles are filled.

**False (Hollow Mode - Default):**
- Compares previous close to current close
- Previous close > current close → bearish (filled)
- Previous close ≤ current close → bullish (hollow)

**True (Solid Mode):**
- Compares current open to current close
- Close >= open → bullish (filled with BullishBrush)
- Close < open → bearish (filled with BearishBrush)

**XAML:**
```xaml
<chart:CandleSeries ItemsSource="{Binding StockData}"
                   XBindingPath="Date"
                   Open="Open"
                   High="High"
                   Low="Low"
                   Close="Close"
                   EnableSolidCandle="True"
                   BullishBrush="Green"
                   BearishBrush="Red"/>
```

### Segment Width

Control the width of candles using the `SegmentWidth` property (0 to 1).

**XAML:**
```xaml
<chart:CandleSeries ItemsSource="{Binding StockData}"
                   XBindingPath="Date"
                   Open="Open"
                   High="High"
                   Low="Low"
                   Close="Close"
                   SegmentWidth="0.6"/>
```

### Complete Candle Series Example

**XAML:**
```xaml
<chart:SfCartesianChart Header="Stock Price Analysis">
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Date"/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Price ($)"/>
    </chart:SfCartesianChart.YAxes> 

    <chart:CandleSeries ItemsSource="{Binding StockData}"
                       XBindingPath="Date"
                       Open="Open"
                       High="High"
                       Low="Low"
                       Close="Close"
                       BullishBrush="#26A69A"
                       BearishBrush="#EF5350"
                       EnableSolidCandle="True"
                       SegmentWidth="0.7"
                       Label="Stock Price"
                       EnableTooltip="True"/>

</chart:SfCartesianChart>
```

### When to Use Candle Series

- Stock price analysis and technical analysis
- Forex trading charts
- Cryptocurrency price tracking
- Any OHLC financial data visualization
- Commodity price movements

## OHLC Series (HiLoOpenClose)

OHLC (Open-High-Low-Close) series displays financial data using tick marks instead of filled bodies, providing a cleaner look for dense data.

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

    <chart:HiLoOpenCloseSeries ItemsSource="{Binding StockData}"
                              XBindingPath="Date"
                              Open="Open"
                              High="High"
                              Low="Low"
                              Close="Close"/>
                              
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

HiLoOpenCloseSeries series = new HiLoOpenCloseSeries()
{
    ItemsSource = new ViewModel().StockData,
    XBindingPath = "Date",
    Open = "Open",
    High = "High",
    Low = "Low",
    Close = "Close"
};

chart.Series.Add(series);
this.Content = chart;
```

### Bull and Bear Colors for OHLC

**XAML:**
```xaml
<chart:HiLoOpenCloseSeries ItemsSource="{Binding StockData}"
                          XBindingPath="Date"
                          Open="Open"
                          High="High"
                          Low="Low"
                          Close="Close"
                          BullishBrush="Blue"
                          BearishBrush="Orange"/>
```

### Segment Width for OHLC

**XAML:**
```xaml
<chart:HiLoOpenCloseSeries ItemsSource="{Binding StockData}"
                          XBindingPath="Date"
                          Open="Open"
                          High="High"
                          Low="Low"
                          Close="Close"
                          SegmentWidth="0.5"/>
```

### Complete OHLC Example

**XAML:**
```xaml
<chart:SfCartesianChart Header="OHLC Stock Chart">
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Trading Day"/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Stock Price"/>
    </chart:SfCartesianChart.YAxes> 

    <chart:HiLoOpenCloseSeries ItemsSource="{Binding StockData}"
                              XBindingPath="Date"
                              Open="Open"
                              High="High"
                              Low="Low"
                              Close="Close"
                              BullishBrush="Green"
                              BearishBrush="Red"
                              SegmentWidth="0.6"
                              Label="Stock OHLC"
                              EnableTooltip="True"/>

</chart:SfCartesianChart>
```

### Candle vs. OHLC: When to Use Each

**Use Candle Series When:**
- Analyzing individual price movements in detail
- Trading with fewer data points (daily, weekly charts)
- Need visual emphasis on body (open-close range)
- Presenting to general audiences

**Use OHLC Series When:**
- Displaying dense intraday data (tick charts)
- Analyzing with many data points on screen
- Professional trading platforms
- Need cleaner, less cluttered visualization
- Focusing on price range rather than body

## Financial Data Patterns

### Complete Financial Data Setup

**ViewModel with Financial Data:**
```csharp
public class FinancialViewModel : INotifyPropertyChanged
{
    public ObservableCollection<StockData> StockData { get; set; }
    
    public FinancialViewModel()
    {
        StockData = new ObservableCollection<StockData>();
        LoadStockData();
    }
    
    private void LoadStockData()
    {
        // Generate or load stock data
        var random = new Random();
        double currentPrice = 100;
        
        for (int i = 0; i < 30; i++)
        {
            double open = currentPrice;
            double change = random.NextDouble() * 10 - 5; // -5 to +5
            double close = open + change;
            double high = Math.Max(open, close) + random.NextDouble() * 3;
            double low = Math.Min(open, close) - random.NextDouble() * 3;
            
            StockData.Add(new StockData
            {
                Date = DateTime.Now.AddDays(-30 + i).ToString("MM/dd"),
                Open = Math.Round(open, 2),
                High = Math.Round(high, 2),
                Low = Math.Round(low, 2),
                Close = Math.Round(close, 2),
                Volume = random.Next(1000000, 10000000)
            });
            
            currentPrice = close;
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
}
```

### Multiple Financial Series

Combine financial series with technical indicators.

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Series>
        <!-- Main candlestick chart -->
        <chart:CandleSeries ItemsSource="{Binding StockData}"
                           XBindingPath="Date"
                           Open="Open"
                           High="High"
                           Low="Low"
                           Close="Close"
                           BullishBrush="Green"
                           BearishBrush="Red"/>
        
        <!-- Moving average overlay -->
        <chart:LineSeries ItemsSource="{Binding MovingAverage}"
                         XBindingPath="Date"
                         YBindingPath="Value"
                         Stroke="Blue"
                         StrokeThickness="2"
                         Label="MA(20)"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

### Volume with Financial Charts

Display volume bars below price chart using multiple axes.

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <!-- Price axis -->
        <chart:NumericalAxis Name="PriceAxis" Header="Price"/>
        
        <!-- Volume axis -->
        <chart:NumericalAxis Name="VolumeAxis" 
                           OpposedPosition="True"
                           Header="Volume"/>
    </chart:SfCartesianChart.YAxes>

    <chart:SfCartesianChart.Series>
        <!-- Candle chart on price axis -->
        <chart:CandleSeries ItemsSource="{Binding StockData}"
                           XBindingPath="Date"
                           Open="Open"
                           High="High"
                           Low="Low"
                           Close="Close"
                           YAxisName="PriceAxis"/>
        
        <!-- Volume bars on volume axis -->
        <chart:ColumnSeries ItemsSource="{Binding StockData}"
                           XBindingPath="Date"
                           YBindingPath="Volume"
                           YAxisName="VolumeAxis"
                           Opacity="0.5"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

## Use Cases and Best Practices

### Scatter Series Best Practices

1. **Use appropriate point sizes** - Not too large or too small (6-10 pixels typical)
2. **Limit data points** - Too many points can create a blob (consider aggregation)
3. **Add trend lines** - Help viewers understand correlations
4. **Use color coding** - Different colors for different categories or ranges
5. **Enable tooltips** - Show exact values on hover

### Bubble Series Best Practices

1. **Choose meaningful size values** - Ensure size represents an important metric
2. **Set appropriate min/max radius** - Prevent bubbles from being too small or overlapping
3. **Use color coding** - Differentiate categories or ranges
4. **Add legends** - Explain what size and color represent
5. **Consider transparency** - Use opacity for overlapping bubbles

### Financial Series Best Practices

1. **Use appropriate time intervals** - Match data granularity to analysis needs
2. **Apply consistent coloring** - Green/red or blue/orange for bull/bear
3. **Add volume indicators** - Provide context for price movements
4. **Include technical indicators** - Moving averages, RSI, MACD, etc.
5. **Enable tooltips** - Display all OHLC values clearly
6. **Use DateTimeAxis** - For accurate time-series representation

## Troubleshooting Tips

### Scatter Points Not Visible

**Problem:** Scatter points are too small or not showing.

**Solutions:**
```xaml
<!-- Increase point size -->
<chart:ScatterSeries PointHeight="10" 
                    PointWidth="10"
                    Fill="Red"/>
```

### Bubble Sizes Incorrect

**Problem:** All bubbles appear the same size or too small.

**Solutions:**
```xaml
<!-- Adjust radius range -->
<chart:BubbleSeries MinimumRadius="15" 
                   MaximumRadius="50"
                   Size="SizeProperty"/>
```

### Financial Chart Data Not Displaying

**Problem:** Candle or OHLC series not showing.

**Solutions:**
1. Verify all four properties are bound correctly: Open, High, Low, Close
2. Ensure High >= Open, Close and Low <= Open, Close
3. Check data types are numeric

```csharp
// Validate financial data
public bool ValidateOHLC()
{
    return High >= Math.Max(Open, Close) && 
           Low <= Math.Min(Open, Close);
}
```

### Colors Not Showing Correctly

**Problem:** Bull/Bear colors not applied.

**Solutions:**
```xaml
<!-- Explicitly set colors -->
<chart:CandleSeries BullishBrush="Green"
                   BearishBrush="Red"
                   EnableSolidCandle="True"/>
```

### Overlapping Bubbles

**Problem:** Bubbles overlap making data hard to read.

**Solutions:**
```xaml
<!-- Use transparency -->
<chart:BubbleSeries Opacity="0.6"
                   Stroke="Black"
                   StrokeThickness="1"/>
```

### Performance with Large Datasets

**Problem:** Chart sluggish with many data points.

**Solutions:**
- Limit visible data points (show last 100, 200 points)
- Use pagination or filtering
- Consider FastScatterBitmapSeries for scatter charts
- Aggregate data for bubble series

```csharp
// Filter to recent data
var recentData = allData.OrderByDescending(x >= x.Date)
                       .Take(100)
                       .ToList();
```
