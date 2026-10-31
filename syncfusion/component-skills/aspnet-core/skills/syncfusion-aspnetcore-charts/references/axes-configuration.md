# Axes Configuration

## Table of Contents

- [Overview](#overview)
- [Axis Types](#axis-types)
  - [Numeric Axis](#numeric-axis)
  - [Category Axis](#category-axis)
  - [DateTime Axis](#datetime-axis)
  - [DateTimeCategory Axis](#datetimecategory-axis)
  - [Logarithmic Axis](#logarithmic-axis)
- [Multiple Axes](#multiple-axes)
  - [Multiple Y Axes](#multiple-y-axes)
  - [Multiple X Axes](#multiple-x-axes)
- [Axis Customization](#axis-customization)
  - [Axis Title](#axis-title)
  - [Title Rotation](#title-rotation)
  - [Axis Line](#axis-line)
  - [Grid Lines](#grid-lines)
  - [Tick Lines](#tick-lines)
- [Axis Crossing](#axis-crossing)
- [Inversed Axis](#inversed-axis)
- [Axis Range and Interval](#axis-range-and-interval)
  - [Set Range](#set-range)
  - [Desired Intervals](#desired-intervals)
  - [Maximum Labels](#maximum-labels)
  - [Range Padding](#range-padding)

## Overview

Axes define the scale and organization of data in a chart. Syncfusion ASP.NET Core Chart supports multiple axis types, multiple axes, and extensive customization options.

## Axis Types

### Numeric Axis

Default axis type for numerical data.

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                          title="Index">
    </e-chart-primaryxaxis>
    <e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Double" 
                          title="Value">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Category Axis

For discrete categories (strings).

```cshtml
<e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category">
</e-chart-primaryxaxis>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = "Jan", Y = 35 },
    new { X = "Feb", Y = 28 },
    new { X = "Mar", Y = 34 }
};
```

### DateTime Axis

For date/time data.

```cshtml
<e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                      labelFormat="MMM-dd"
                      intervalType="@Syncfusion.EJ2.Charts.IntervalType.Days">
</e-chart-primaryxaxis>
```

```csharp
ViewBag.ChartData = new object[]
{
    new { X = new DateTime(2023, 1, 1), Y = 35 },
    new { X = new DateTime(2023, 2, 1), Y = 28 },
    new { X = new DateTime(2023, 3, 1), Y = 34 }
};
```

**IntervalTypes:** Auto, Years, Months, Days, Hours, Minutes, Seconds

### DateTimeCategory Axis

Combines DateTime with Category behavior (no gaps for missing dates).

```cshtml
<e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTimeCategory">
</e-chart-primaryxaxis>
```

### Logarithmic Axis

For data spanning multiple orders of magnitude.

```cshtml
<e-chart-primaryyaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Logarithmic" 
                      logBase="10">
</e-chart-primaryyaxis>
```

**Use case:** Scientific data, exponential growth, large value ranges

## Multiple Axes

Create charts with multiple X or Y axes.

### Multiple Y Axes

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Temperature (°C)"></e-chart-primaryyaxis>
    
    <!-- Additional Y Axis -->
    <e-chart-axes>
        <e-chart-axis name="SecondaryY" 
                     opposedPosition="true" 
                     title="Rainfall (mm)">
        </e-chart-axis>
    </e-chart-axes>
    
    <e-series-collection>
        <e-series dataSource="@ViewBag.TempData" 
                  xName="Month" yName="Temp" 
                  name="Temperature">
        </e-series>
        <e-series dataSource="@ViewBag.RainData" 
                  xName="Month" yName="Rain" 
                  name="Rainfall"
                  yAxisName="SecondaryY">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Multiple X Axes

```cshtml
<e-chart-axes>
    <e-chart-axis name="SecondaryX" 
                 opposedPosition="true">
    </e-chart-axis>
</e-chart-axes>

<e-series xAxisName="SecondaryX">
</e-series>
```

## Axis Customization

### Axis Title

```cshtml
<e-chart-primaryxaxis title="Month">
</e-chart-primaryxaxis>
```

You can also customize the axis title using a separate configuration:

```cshtml
<e-chart-primaryxaxis>
    <e-axis-title text="Sales Month" 
                  fontsize="16"
                  fontweight="Bold" 
                  color="#333">
    </e-axis-title>
</e-chart-primaryxaxis>
```

### Title Rotation

```cshtml
<e-chart-primaryyaxis titleRotation="90">
</e-chart-primaryyaxis>
```

### Axis Line

```cshtml
<e-chart-primaryxaxis>
    <e-linestyle width="2" color="#FF0000"></e-linestyle>
</e-chart-primaryxaxis>
```

### Grid Lines

```cshtml
<e-chart-primaryxaxis>
    <e-majorgridlines width="1" 
                      color="#E0E0E0" 
                      dasharray="5,5">
    </e-majorgridlines>
    <e-minorgridlines width="1" 
                      color="#F5F5F5">
    </e-minorgridlines>
</e-chart-primaryxaxis>
```

### Tick Lines

```cshtml
<e-chart-primaryxaxis>
    <e-majorticklines width="2" 
                      height="10" 
                      color="#000">
    </e-majorticklines>
    <e-minorticklines width="1" 
                      height="5" 
                      color="#666">
    </e-minorticklines>
</e-chart-primaryxaxis>
```

## Axis Crossing

Position axis at specific value.

```cshtml
<e-chart-primaryxaxis crossesAt="0" 
                      crossesInAxis="PrimaryYAxis">
</e-chart-primaryxaxis>
```

**Example:** Move X-axis to Y=0 for positive/negative value visualization.

## Inversed Axis

Reverse axis direction.

```cshtml
<e-chart-primaryyaxis isInversed="true">
</e-chart-primaryyaxis>
```

**Use case:** Ranking charts (1st place at top), depth charts

## Axis Range and Interval

### Set Range

```cshtml
<e-chart-primaryyaxis minimum="0" 
                      maximum="100" 
                      interval="10">
</e-chart-primaryyaxis>
```

### Desired Intervals

```cshtml
<e-chart-primaryxaxis desiredIntervals="5">
</e-chart-primaryxaxis>
```

### Maximum Labels

```cshtml
<e-chart-primaryxaxis maximumLabels="10">
</e-chart-primaryxaxis>
```

### Range Padding

```cshtml
<e-chart-primaryyaxis rangePadding="Auto">
</e-chart-primaryyaxis>
```

**Options:** None, Normal, Additional, Round, Auto

This covers comprehensive axis configuration for all chart scenarios.
