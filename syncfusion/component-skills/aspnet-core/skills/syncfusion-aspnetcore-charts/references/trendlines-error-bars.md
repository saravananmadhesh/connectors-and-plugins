# Trendlines and Error Bars

## Table of Contents

- [Trendlines](#trendlines)
  - [Linear Trendline](#linear-trendline)
  - [Trendline Types](#trendline-types)
  - [Forecasting](#forecasting)
  - [Trendline Customization](#trendline-customization)
- [Error Bars](#error-bars)
  - [Basic Error Bars](#basic-error-bars)
  - [Error Bar Types](#error-bar-types)
  - [Error Bar Modes](#error-bar-modes)
  - [Error Bar Direction](#error-bar-direction)
  - [Customization](#customization)
- [Use Cases](#use-cases)

Analyze data trends and visualize uncertainty with trendlines and error bars.

## Trendlines

Show overall data patterns and forecast future values.

### Linear Trendline

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="X" yName="Y">
            <e-series-trendlines>
                <e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Linear" 
                                   width="2" 
                                   fill="#FF6347"
                                   name="Linear Trend">
                </e-trendline>
            </e-series-trendlines>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Trendline Types

**Linear:** Straight line fit
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Linear"></e-trendline>
```

**Exponential:** Exponential curve
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Exponential"></e-trendline>
```

**Logarithmic:** Logarithmic curve
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Logarithmic"></e-trendline>
```

**Polynomial:** Polynomial curve (specify order)
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Polynomial" polynomialOrder="3"></e-trendline>
```

**Power:** Power curve
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Power"></e-trendline>
```

**Moving Average:** Smoothed trend
```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.MovingAverage" period="3"></e-trendline>
```

### Forecasting

Project trendline into future or past:

```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Linear" 
                   forwardForecast="3" 
                   backwardForecast="2">
</e-trendline>
```

### Trendline Customization

```cshtml
<e-trendline type="@Syncfusion.EJ2.Charts.TrendlineTypes.Linear" 
                   fill="#4CAF50" 
                   width="3" 
                   dashArray="5,5"
                   opacity="0.8">
    <e-trendline-marker visible="true"></e-trendline-marker>
</e-trendline>
```

## Error Bars

Visualize data uncertainty or variation.

### Basic Error Bars

```cshtml
<ejs-chart id="chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="X" yName="Y">
            <e-series-errorbar visible="true" 
                              type="@Syncfusion.EJ2.Charts.ErrorBarType.Fixed" 
                              verticalError="5">
            </e-series-errorbar>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Error Bar Types

**Fixed:** Constant error value
```cshtml
<e-series-errorbar type="@Syncfusion.EJ2.Charts.ErrorBarType.Fixed" verticalError="5"></e-series-errorbar>
```

**Percentage:** Percentage of data value
```cshtml
<e-series-errorbar type="@Syncfusion.EJ2.Charts.ErrorBarType.Percentage" verticalError="10"></e-series-errorbar>
```

**StandardDeviation:** Statistical standard deviation
```cshtml
<e-series-errorbar type="@Syncfusion.EJ2.Charts.ErrorBarType.StandardDeviation" verticalError="2"></e-series-errorbar>
```

**StandardError:** Standard error
```cshtml
<e-series-errorbar type="@Syncfusion.EJ2.Charts.ErrorBarType.StandardError"></e-series-errorbar>
```

**Custom:** Custom error values from data
```cshtml
<e-series-errorbar type="@Syncfusion.EJ2.Charts.ErrorBarType.Custom" 
                  verticalPositiveError="High" 
                  verticalNegativeError="Low">
</e-series-errorbar>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = "A", Y = 10, High = 2, Low = 1 },
    new { X = "B", Y = 20, High = 3, Low = 2 }
};
```

### Error Bar Modes

**Both:** Vertical and horizontal
```cshtml
<e-series-errorbar mode="@Syncfusion.EJ2.Charts.ErrorBarMode.Both" 
                  verticalError="5" 
                  horizontalError="3">
</e-series-errorbar>
```

**Vertical:** Vertical only
```cshtml
<e-series-errorbar mode="@Syncfusion.EJ2.Charts.ErrorBarMode.Vertical" verticalError="5"></e-series-errorbar>
```

**Horizontal:** Horizontal only
```cshtml
<e-series-errorbar mode="@Syncfusion.EJ2.Charts.ErrorBarMode.Horizontal" horizontalError="3"></e-series-errorbar>
```

### Error Bar Direction

```cshtml
<e-series-errorbar direction="@Syncfusion.EJ2.Charts.ErrorBarDirection.Both"></e-series-errorbar>
<e-series-errorbar direction="@Syncfusion.EJ2.Charts.ErrorBarDirection.Plus"></e-series-errorbar>
<e-series-errorbar direction="@Syncfusion.EJ2.Charts.ErrorBarDirection.Minus"></e-series-errorbar>
```

### Customization

```cshtml
<e-series-errorbar visible="true" 
                  type="@Syncfusion.EJ2.Charts.ErrorBarType.Fixed" 
                  verticalError="5"
                  color="#FF0000"
                  width="2">
    <e-errorbar-errorbarcap length="10" width="2"></e-errorbar-errorbarcap>
</e-series-errorbar>
```

## Use Cases

**Trendlines:**
- Identify long-term trends
- Forecast future values
- Smoothing noisy data
- Comparing actual vs expected trends

**Error Bars:**
- Scientific measurements
- Survey confidence intervals
- Quality control limits
- Financial risk visualization

This covers comprehensive trend analysis and uncertainty visualization.
