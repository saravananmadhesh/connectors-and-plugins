# Series Configuration in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Basic Series Configuration](#basic-series-configuration)
  - [Series Name and Identity](#series-name-and-identity)
- [Series Appearance Customization](#series-appearance-customization)
  - [Fill Color](#fill-color)
  - [Series Line Width](#series-line-width)
  - [Series Opacity](#series-opacity)
  - [Complete Appearance Example](#complete-appearance-example)
- [Series Visibility Control](#series-visibility-control)
  - [Visibility Property](#visibility-property)
  - [Toggling with Legend](#toggling-with-legend)
- [Smart Label Positioning](#smart-label-positioning)
- [Multiple Series Management Pattern](#multiple-smithchart-smithchartseries-management-pattern)
- [Series with Markers and Labels](#series-with-markers-and-labels)
- [Series Patterns for Common Scenarios](#series-patterns-for-common-scenarios)
  - [Scenario 1: Process Path Analysis](#scenario-1-process-path-analysis)
  - [Scenario 2: Baseline vs. Degraded](#scenario-2-baseline-vs-degraded)
  - [Scenario 3: Multiple Frequency Points](#scenario-3-multiple-frequency-points)
- [Series Customization Page Model Example](#series-customization-page-model-example)


## Overview

Series configuration allows you to customize how transmission line data is displayed on the Smith Chart. Each series can be styled independently with unique colors, line styles, visibility states, and label options. This enables comparison of multiple circuit configurations with visually distinct representations.

## Basic Series Configuration

### Series Name and Identity

Every series should have a name identifier, used in legends and tooltips:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line 1" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

The name appears in the legend and helps users identify which data series they're examining. The `resistance` and `reactance` attributes map your C# properties to the chart axes.

## Series Appearance Customization

### Fill Color

Change the line color for a series using the `fill` property:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData1" name="Line A" fill="blue" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>

<e-smithchart-smithchartseries dataSource="TransmissionData2" name="Line B" fill="red" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>

<e-smithchart-smithchartseries dataSource="TransmissionData3" name="Line C" fill="green" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

This is useful for:
- Distinguishing different circuit configurations
- Highlighting primary vs. secondary measurements
- Matching company or application branding

### Series Line Width

Customize the thickness of the series line using the `width` property:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" width="2" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

Typical values:
- `1` - Thin line for less emphasis
- `2` - Standard, most readable
- `3-4` - Thick line for primary focus
- `5+` - Very prominent

### Series Opacity

Control transparency using the `opacity` property (0 to 1):

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" opacity="0.7" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

Values:
- `0.5` - 50% transparent, subtle
- `0.7` - 70% opaque, readable with layers
- `1.0` - Fully opaque (default)

### Complete Appearance Example

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <!-- Primary measurement - thick blue -->
        <e-smithchart-smithchartseries dataSource="PrimaryData" name="Primary Measurement" 
                  fill="blue" width="3" opacity="1.0" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>

        <!-- Secondary measurement - thin red, transparent -->
        <e-smithchart-smithchartseries dataSource="SecondaryData" name="Secondary Measurement" 
                  fill="red" width="1" opacity="0.6" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>

        <!-- Reference - green, standard -->
        <e-smithchart-smithchartseries dataSource="ReferenceData" name="Reference" 
                  fill="green" width="2" opacity="0.8" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Series Visibility Control

### Visibility Property

Toggle whether a series displays on the chart:

```cshtml
<e-smithchart-smithchartseries dataSource="OptionalData" name="Optional Series" visibility="false">
</e-smithchart-smithchartseries>
```

This is useful for:
- Initially hiding advanced analysis
- Removing reference or deprecated measurements
- Simplifying the chart for initial presentation

### Toggling with Legend

By default, users can click legend items to toggle series visibility. Control this behavior in legend settings (affects all series):

```cshtml
<ejs-smithchart id="smithchart">
    <e-legendsettings visible="true" toggleVisibility="true">
    </e-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data1" name="Series 1">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Data2" name="Series 2">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Smart Label Positioning

The `enableSmartLabels` property automatically positions data labels to avoid overlapping:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" enableSmartLabels="true">
    <e-smithchartseries-marker visible="true">
        <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

Smart labels:
- Detect overlapping labels automatically
- Reposition labels for readability
- Improve visual clarity for dense data points
- Especially useful with multiple series

## Multiple Series Management Pattern

When working with several series, establish consistent patterns for identification:

```cshtml
<ejs-smithchart id="smithchart">
    <e-title text="Circuit Analysis - Load Conditions">
    </e-title>
    <e-smithchart-smithchartseriescollection>
        <!-- Base/Reference configuration -->
        <e-smithchart-smithchartseries dataSource="BaselineLoad" name="Baseline (50 Ω)" 
                  fill="black" width="2" opacity="1.0">
            <e-smithchartseries-marker visible="true"></e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Variant 1 -->
        <e-smithchart-smithchartseries dataSource="HighImpedance" name="High Impedance Load" 
                  fill="blue" width="2" opacity="0.8">
            <e-smithchartseries-marker visible="true"></e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Variant 2 -->
        <e-smithchart-smithchartseries dataSource="CapacitiveLoad" name="Capacitive Load" 
                  fill="red" width="2" opacity="0.8">
            <e-smithchartseries-marker visible="true"></e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Variant 3 -->
        <e-smithchart-smithchartseries dataSource="InductiveLoad" name="Inductive Load" 
                  fill="green" width="2" opacity="0.8">
            <e-smithchartseries-marker visible="true"></e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Series with Markers and Labels

Configuration for series emphasizing individual data points:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="MeasuredData" name="Measured Impedance" 
                  fill="navy" width="2" enableSmartLabels="true">
            <e-smithchartseries-marker visible="true">
                <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <e-smithchart-smithchartseries dataSource="SimulatedData" name="Simulated Impedance" 
                  fill="orange" width="1" opacity="0.7" enableSmartLabels="true">
            <e-smithchartseries-marker visible="true">
                <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Series Patterns for Common Scenarios

### Scenario 1: Process Path Analysis

Visualize impedance change along a transmission line:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionPath" name="Impedance Path" 
          fill="purple" width="3" opacity="0.8" enableSmartLabels="true">
    <e-smithchartseries-marker visible="true">
        <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

### Scenario 2: Baseline vs. Degraded

Show normal operation vs. degraded performance:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <!-- Normal operation - solid, opaque -->
        <e-smithchart-smithchartseries dataSource="NormalOperation" name="Normal Operation" 
                  fill="green" width="2" opacity="1.0">
        </e-smithchart-smithchartseries>

        <!-- Degraded state - thinner, transparent -->
        <e-smithchart-smithchartseries dataSource="DegradedOperation" name="Degraded Performance" 
                  fill="red" width="1" opacity="0.5">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Scenario 3: Multiple Frequency Points

Plot same circuit at different frequencies:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="100MHz" name="100 MHz" fill="blue">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="1GHz" name="1 GHz" fill="green">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="10GHz" name="10 GHz" fill="red">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Series Customization Page Model Example

```csharp
public class SmithChartModel : PageModel
{
    public List<SmithChartData> Series1 { get; set; }
    public List<SmithChartData> Series2 { get; set; }
    public List<SmithChartData> Series3 { get; set; }

    public void OnGet()
    {
        Series1 = new List<SmithChartData>
        {
            new SmithChartData { Resistance = 20, Reactance = 40 },
            new SmithChartData { Resistance = 30, Reactance = 55 },
            new SmithChartData { Resistance = 40, Reactance = 60 },
            new SmithChartData { Resistance = 50, Reactance = 50 }
        };

        Series2 = new List<SmithChartData>
        {
            new SmithChartData { Resistance = 10, Reactance = 20 },
            new SmithChartData { Resistance = 20, Reactance = 35 },
            new SmithChartData { Resistance = 30, Reactance = 40 },
            new SmithChartData { Resistance = 40, Reactance = 35 }
        };

        Series3 = new List<SmithChartData>
        {
            new SmithChartData { Resistance = 30, Reactance = 60 },
            new SmithChartData { Resistance = 40, Reactance = 75 },
            new SmithChartData { Resistance = 50, Reactance = 80 },
            new SmithChartData { Resistance = 60, Reactance = 70 }
        };
    }
}

public class SmithChartData
{
    public double Resistance { get; set; }
    public double Reactance { get; set; }
}
```

Series configuration is essential for creating meaningful, readable Smith Charts that effectively communicate transmission line analysis and circuit behavior.
