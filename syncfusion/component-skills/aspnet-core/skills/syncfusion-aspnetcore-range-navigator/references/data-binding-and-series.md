# Data Binding and Series Types

## Table of Contents

- [Data Types Overview](#data-types-overview)
- [Numeric Scale](#numeric-scale)
  - [Basic Numeric Example](#basic-numeric-example)
  - [Range and Interval Configuration](#range-and-interval-configuration)
  - [Label Formatting for Numeric Data](#label-formatting-for-numeric-data)
- [DateTime Scale](#datetime-scale)
  - [Basic DateTime Example](#basic-datetime-example)
  - [DateTime Interval Customization](#datetime-interval-customization)
  - [DateTime Label Format](#datetime-label-format)
- [Logarithmic Scale](#logarithmic-scale)
  - [Basic Logarithmic Example](#basic-logarithmic-example)
  - [Logarithmic Base Configuration](#logarithmic-base-configuration)
- [Series Types](#series-types)
  - [Line Series](#line-series)
  - [Area Series](#area-series)
  - [StepLine Series](#stepline-series)
  - [Spline Series](#spline-series)
  - [SplineArea Series](#splinearea-series)
  - [Column Series](#column-series)
  - [Series Type Selection](#series-type-selection)
- [Data Source Configuration](#data-source-configuration)
  - [Local Data Binding](#local-data-binding)
  - [Remote Data Binding](#remote-data-binding)
- [Remote Data Binding](#remote-data-binding-1)
- [Complete Example: Multi-Type Comparison](#complete-example-multi-type-comparison)

## Data Types Overview

RangeNavigator supports three types of data scales determined by the `valueType` property:

1. **Numeric (Double)** - For numeric data
2. **DateTime** - For date and time data
3. **Logarithmic** - For data with exponential or logarithmic scale

The appropriate scale type should match your data values and visualization needs.

## Numeric Scale

Use numeric scale when your data contains numeric values. This is the default `valueType`.

### Basic Numeric Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<NumericData> NumericData { get; set; }
    
    public void OnGet()
    {
        NumericData = new List<NumericData>
        {
            new NumericData { x = 1, y = 95 },
            new NumericData { x = 2, y = 54 },
            new NumericData { x = 3, y = 76 },
            new NumericData { x = 4, y = 88 },
            new NumericData { x = 5, y = 65 },
            new NumericData { x = 6, y = 42 }
        };
    }
}

public class NumericData
{
    public double x { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<ejs-rangenavigator id="numericRange" 
    valueType="Double" 
    width="100%" 
    height="150px">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.NumericData" 
            xName="x" 
            yName="y" 
            type="Line">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Range and Interval Configuration

Customize the numeric axis range and intervals:
```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;
public class IndexModel : PageModel
{
    public List<NumericData> NumericData { get; set; }
    
public void OnGet()
{
    // Generating data points every 10 units to match the interval
    NumericData = new List<NumericData>
    {
        new NumericData { x = 0, y = 95 },
        new NumericData { x = 10, y = 54 },
        new NumericData { x = 20, y = 76 },
        new NumericData { x = 30, y = 88 },
        new NumericData { x = 40, y = 65 },
        new NumericData { x = 50, y = 42 },
        new NumericData { x = 60, y = 55 },
        new NumericData { x = 70, y = 90 },
        new NumericData { x = 80, y = 30 },
        new NumericData { x = 90, y = 70 },
        new NumericData { x = 100, y = 85 }
    };
}

}

public class NumericData
{
    public double x { get; set; }
    public double y { get; set; }
}
```
```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts @* Ensure this namespace is included *@
@{
    var border = new RangeNavigatorBorder {
        Width = 2,
        Color = "solid #005A9E"
    };
    // Initial selected range: June 1st to August 1st, 2024
    var initialSelectedRange = new object[] { 
        new DateTime(2024, 6, 1), 
        new DateTime(2024, 8, 1) 
    };
}
<ejs-rangenavigator id="numericRange" 
    valueType="Double"
    maximum="90" 
    interval=10>
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.NumericData" 
            xName="x" 
            yName="y" 
            type="Line"
            >
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Properties:**
- `maximum="90"` - Maximum axis value
- `interval=10` - Gap between axis labels

### Label Formatting for Numeric Data

Format numeric labels with decimal places, percentages, or currency:

```cshtml
<ejs-rangenavigator valueType="Double" id="numericRange"
    labelFormat="n2">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.NumericData" 
            xName="x" 
            yName="y" 
            type="Line">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Common formats:**
- `n1` - Number with 1 decimal place (1000.0)
- `n2` - Number with 2 decimal places (1000.00)
- `p1` - Percentage with 1 decimal place (1.0%)
- `c1` - Currency with 1 decimal place ($1000.0)
- `{value}$` - Custom format (1000$)

## DateTime Scale

Use DateTime scale for time-series data like stock prices, weather, or events over time.

### Basic DateTime Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<TimeSeriesData> TimeSeriesData { get; set; }
    
    public void OnGet()
    {
        TimeSeriesData = new List<TimeSeriesData>
        {
            new TimeSeriesData { x = new DateTime(2024, 1, 1), y = 35 },
            new TimeSeriesData { x = new DateTime(2024, 2, 1), y = 42 },
            new TimeSeriesData { x = new DateTime(2024, 3, 1), y = 38 },
            new TimeSeriesData { x = new DateTime(2024, 4, 1), y = 55 },
            new TimeSeriesData { x = new DateTime(2024, 5, 1), y = 60 },
            new TimeSeriesData { x = new DateTime(2024, 6, 1), y = 48 }
        };
    }
}

public class TimeSeriesData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<ejs-rangenavigator id="dateTimeRange" 
    valueType="DateTime" 
    width="100%" 
    height="150px">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.TimeSeriesData" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### DateTime Interval Customization

Set specific date intervals for the axis:

```cshtml
<ejs-rangenavigator valueType="DateTime" id="dateTimeInterval" 
    interval="3" 
    intervalType="Months">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.TimeSeriesData" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Interval types:**
- `Auto` - Automatically determine interval
- `Years` - Yearly intervals
- `Quarter` - Quarterly intervals (3 months)
- `Months` - Monthly intervals
- `Weeks` - Weekly intervals
- `Days` - Daily intervals
- `Hours` - Hourly intervals
- `Minutes` - Minute intervals

**Example:** `interval="3" intervalType="Months"` = 3-month intervals (Q1, Q2, Q3, Q4)

### DateTime Label Format

Format date labels in various styles:

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Charts
<ejs-rangenavigator id="dateTimeLabel"
                    valueType="DateTime" 
                    intervalType="Months" 
                    labelFormat="MMM-yy"
                    xName="x" 
                    yName="y" 
                    dataSource="@Model.TimeSeriesData"
                    value="@(new object[] { new DateTime(2018, 6, 1), new DateTime(2018, 7, 1) })">
    <e-rangenavigator-labelstyle color="red" size="10px"></e-rangenavigator-labelstyle>
</ejs-rangenavigator>

```

**Common date formats:**
- `EEEE` - Full day name (Monday)
- `yMd` - Date format (04/10/2000)
- `MMM` - Short month name (Apr)
- `hm` - Time format (12:00 AM)
- `hms` - Time with seconds (12:00:00 AM)
- `MMM dd, yyyy` - Long date (Apr 10, 2024)
- `yyyy-MM-dd` - ISO format (2024-04-10)

## Logarithmic Scale

Use logarithmic scale for data with exponential growth or very different magnitudes (e.g., 10^-6 to 10^6).

### Basic Logarithmic Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<LogData> LogData { get; set; }
    
    public void OnGet()
    {
        LogData = new List<LogData>
        {
            new LogData { x = 1, y = 0.0001 },
            new LogData { x = 2, y = 0.001 },
            new LogData { x = 3, y = 0.1 },
            new LogData { x = 4, y = 1 },
            new LogData { x = 5, y = 100 },
            new LogData { x = 6, y = 1000 },
            new LogData { x = 7, y = 10000 }
        };
    }
}

public class LogData
{
    public double x { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<ejs-rangenavigator id="logRange" 
    valueType="Logarithmic" 
    width="100%" 
    height="150px">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.LogData" 
            xName="x" 
            yName="y" 
            type="Line">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Logarithmic Base Configuration

Customize the logarithm base (default is 10):

```cshtml
<ejs-rangenavigator valueType="Logarithmic" id="logBase"
    logBase="2">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.LogData" 
            xName="x" 
            yName="y" 
            type="Line">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

**Common bases:**
- `logBase="10"` - Base 10 (default, common in measurements)
- `logBase="2"` - Base 2 (binary, used in computing)
- `logBase="e"` - Natural logarithm

## Series Types

Range Navigator supports six visualization types through the `type` property:
- `Line`
- `Area`
- `StepLine`
- `Spline`
- `SplineArea`
- `Column`

### Line Series

Linear line connecting data points:

```cshtml
<e-rangenavigator-rangenavigatorseries 
    datasource="@Model.Data" 
    xName="x" 
    yName="y" 
    type="Line">
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Stock trends, sensor readings, continuous measurements

### Area Series

Filled area under the line:

```cshtml
<e-rangenavigator-rangenavigatorseries 
    datasource="@Model.Data" 
    xName="x" 
    yName="y" 
    type="Area">
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Volume trends, accumulated values, percentage changes

### StepLine Series

Step-like line connecting data points at right angles:

```cshtml
<e-rangenavigator-rangenavigatorseries 
    datasource="@Model.Data" 
    xName="x" 
    yName="y" 
    type="StepLine">
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Discrete state changes, on/off transitions, level measurements

### Spline Series

The Spline series connects data points using smooth, curved segments.

```cshtml
<e-rangenavigator-rangenavigatorseries
    datasource="@Model.Data"
    xName="x"
    yName="y"
    type="Spline"
    width="2"
    fill="#7C3AED">
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Smooth trends, gradually changing measurements, and data where curved transitions improve readability.

### SplineArea Series

The SplineArea series combines a smooth spline curve with a filled area beneath it.

```cshtml
<e-rangenavigator-rangenavigatorseries
    datasource="@Model.Data"
    xName="x"
    yName="y"
    type="SplineArea"
    fill="#0EA5E9"
    opacity="0.65">
    <e-rangenavigatorseries-border
        color="#0369A1"
        width="2">
    </e-rangenavigatorseries-border>
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Smooth trends where both the direction and magnitude of values need to be emphasized.

### Column Series

The Column series displays each data point as a vertical column.

```cshtml
<e-rangenavigator-rangenavigatorseries
    datasource="@Model.Data"
    xName="x"
    yName="y"
    type="Column"
    fill="#F97316"
    opacity="0.8">
    <e-rangenavigatorseries-border
        color="#9A3412"
        width="1">
    </e-rangenavigatorseries-border>
</e-rangenavigator-rangenavigatorseries>
```

**Best for:** Discrete values, interval-based measurements, transaction volumes, and category comparisons.

### Series Type Selection

- Use `Line` for continuous trends without a filled region.
- Use `Area` to emphasize both trend and magnitude.
- Use `StepLine` for discrete state or level changes.
- Use `Spline` for smoothly varying trends.
- Use `SplineArea` for smooth trends with an emphasized magnitude.
- Use `Column` for discrete or interval-based comparisons.

## Data Source Configuration

### Local Data Binding

Bind to a local collection in your page model:

```cshtml
<e-rangenavigator-rangenavigatorseries 
    datasource="@Model.LocalData" 
    xName="x" 
    yName="y" 
    type="Area">
</e-rangenavigator-rangenavigatorseries>
```

### Remote Data Binding

Bind to remote data via URL:

```cshtml
<e-rangenavigator-rangenavigatorseries 
    dataSource="https://api.example.com/data" 
    xName="x" 
    yName="y" 
    type="Area">
</e-rangenavigator-rangenavigatorseries>
```

## Remote Data Binding

For remote data sources, use the `query` property with OData services:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            dataSource="https://odata.example.com/data" 
            query="@query" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

## Complete Example: Multi-Type Comparison

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<ChartData> NumericData { get; set; }
    public List<ChartData> DateTimeData { get; set; }
    
    public void OnGet()
    {
        NumericData = GetNumericData();
        DateTimeData = GetDateTimeData();
    }
    
    private List<ChartData> GetNumericData()
    {
        return new List<ChartData>
        {
            new ChartData { x = 1, y = 10 },
            new ChartData { x = 2, y = 20 },
            new ChartData { x = 3, y = 15 }
        };
    }
    
    private List<ChartData> GetDateTimeData()
    {
        return new List<ChartData>
        {
            new ChartData { xDate = new DateTime(2024, 1, 1), y = 10 },
            new ChartData { xDate = new DateTime(2024, 2, 1), y = 20 },
            new ChartData { xDate = new DateTime(2024, 3, 1), y = 15 }
        };
    }
}

public class ChartData
{
    public double x { get; set; }
    public DateTime xDate { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Numeric Range Navigator -->
<div>
    <h4>Numeric Scale</h4>
    <ejs-rangenavigator valueType="Double" id="numeric">
        <e-rangenavigator-rangenavigatorseriescollection>
            <e-rangenavigator-rangenavigatorseries 
                datasource="@Model.NumericData" 
                xName="x" 
                yName="y" 
                type="Line">
            </e-rangenavigator-rangenavigatorseries>
        </e-rangenavigator-rangenavigatorseriescollection>
    </ejs-rangenavigator>
</div>

<!-- DateTime Range Navigator -->
<div>
    <h4>DateTime Scale</h4>
    <ejs-rangenavigator valueType="DateTime" id="datetime">
        <e-rangenavigator-rangenavigatorseriescollection>
            <e-rangenavigator-rangenavigatorseries 
                datasource="@Model.DateTimeData" 
                xName="xDate" 
                yName="y" 
                type="Area">
            </e-rangenavigator-rangenavigatorseries>
        </e-rangenavigator-rangenavigatorseriescollection>
    </ejs-rangenavigator>
</div>
```
