# Tooltip Configuration in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enabling Tooltips](#enabling-tooltips)
- [Basic Tooltip Example](#basic-tooltip-example)
- [Tooltip Behavior](#tooltip-behavior)
  - [Mouse Interaction](#mouse-interaction)
  - [Touch Interaction](#touch-interaction)
- [Per-Series Tooltip Configuration](#per-series-tooltip-configuration)
- [Complete Working Examples](#complete-working-examples)
  - [Example 1: Interactive Antenna Analysis](#example-1-interactive-antenna-analysis)
  - [Example 2: Filter Comparison with Tooltips](#example-2-filter-comparison-with-tooltips)
  - [Example 3: Before/After Optimization](#example-3-beforeafter-optimization)
  - [Example 4: Dense Data with Tooltips](#example-4-dense-data-with-tooltips)
- [Customization Patterns](#customization-patterns)
  - [Pattern 1: Tooltip Only (No Markers)](#pattern-1-tooltip-only-no-markers)
  - [Pattern 2: Selective Tooltip Enabling](#pattern-2-selective-tooltip-enabling)
  - [Pattern 3: Tooltips with Data Labels](#pattern-3-tooltips-with-data-labels)
- [Best Practices](#best-practices)
  - [When to Enable Tooltips](#when-to-enable-tooltips)
  - [Performance Considerations](#performance-considerations)
  - [User Experience](#user-experience)
  - [Accessibility](#accessibility)
  - [Combining Features](#combining-features)
- [Troubleshooting](#troubleshooting)

## Overview

Tooltips provide interactive data exploration by displaying detailed information when users hover over data points. They show resistance and reactance values dynamically without cluttering the chart.

**Key Features:**
- Displays resistance and reactance values on hover
- Customizable per series
- Mouse and touch interaction support
- Enhances user experience for data exploration

**Default State:** Tooltips are **disabled** by default and must be enabled explicitly.

## Prerequisites

The tooltip feature requires the TooltipRender module. This is typically included automatically with Syncfusion EJ2 ASP.NET MVC controls, but ensure your script references are correct.

**Required Script:** The standard `ej2.min.js` includes tooltip functionality.

## Enabling Tooltips

Enable tooltips through the series marker configuration:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Points(ViewBag.Data)
              .Name("Transmission Line")
              .Tooltip(new { visible = true })
              .Add();
    })
    .Render()
```

**Note:** Tooltips are configured within Marker settings, even though they appear on hover over the entire series line, not just markers.

## Basic Tooltip Example

**Controller:**
```csharp
public ActionResult TooltipExample()
{
    ViewBag.ImpedanceData = new[]
    {
        new { resistance = 0.15, reactance = 0.0 },
        new { resistance = 0.25, reactance = 0.25 },
        new { resistance = 0.50, reactance = 0.50 },
        new { resistance = 0.75, reactance = 0.75 },
        new { resistance = 1.00, reactance = 1.00 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("tooltipChart")
    .Width("800px")
    .Height("600px")
    .Title(t => t.Text("Hover over data points to see values"))
    .Series(series =>
    {
        series.Name("Antenna Impedance")
              .Fill("#FF6347")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Tooltip(new { visible= true })
              .Points(ViewBag.ImpedanceData)
              .Add();
    })
    .Render()
```

**Result:** When users hover over the series line or markers, a tooltip appears showing the resistance and reactance values.

## Tooltip Behavior

### Mouse Interaction

**Desktop browsers:**
- **Hover** - Tooltip appears when mouse enters data point area
- **Move** - Tooltip updates as mouse moves along series
- **Leave** - Tooltip disappears when mouse exits

### Touch Interaction

**Mobile devices and tablets:**
- **Tap** - Tooltip appears on single tap
- **Hold** - Tooltip remains visible
- **Tap elsewhere** - Tooltip disappears

## Per-Series Tooltip Configuration

Enable tooltips independently for each series:

**Controller:**
```csharp
public ActionResult MultiSeriesTooltip()
{
    ViewBag.Primary = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 }
    };
    
    ViewBag.Secondary = new[]
    {
        new { resistance = 0.3, reactance = 0.1 },
        new { resistance = 0.6, reactance = 0.3 },
        new { resistance = 0.9, reactance = 0.6 }
    };
    
    ViewBag.Reference = new[]
    {
        new { resistance = 1.0, reactance = 0.0 },
        new { resistance = 1.0, reactance = 0.5 },
        new { resistance = 1.0, reactance = 1.0 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("multiTooltipChart")
    .Width("900px")
    .Height("700px")
    .Series(series =>
    {
        // Primary series: Tooltip enabled
        series.Name("Primary Circuit")
              .Fill("#e74c3c")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Tooltip(new { visible= true })  // Enabled
              .Points(ViewBag.Primary)
              .Add();
        
        // Secondary series: Tooltip enabled
        series.Name("Secondary Circuit")
              .Fill("#3498db")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Tooltip(new { visible= true })  // Enabled
              .Points(ViewBag.Secondary)
              .Add();
        
        // Reference series: Tooltip disabled (static reference)
        series.Name("Reference Line")
              .Fill("#95a5a6")
              .Width(1)
              .Opacity(0.5)
              .Marker(m => m.Visible(true))
              .Tooltip(new { visible= false })  // Enabled
              .Points(ViewBag.Reference)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

## Complete Working Examples

### Example 1: Interactive Antenna Analysis

**Controller:**
```csharp
public class AntennaAnalysisController : Controller
{
    public ActionResult Index()
    {
        // Antenna impedance across frequency range
        ViewBag.AntennaData = new[]
        {
            new { resistance = 0.85, reactance = -0.15 },
            new { resistance = 0.90, reactance = -0.10 },
            new { resistance = 0.95, reactance = -0.05 },
            new { resistance = 1.00, reactance = 0.00 },
            new { resistance = 1.05, reactance = 0.05 },
            new { resistance = 1.10, reactance = 0.10 },
            new { resistance = 1.15, reactance = 0.15 }
        };
        
        return View();
    }
}
```

**View:**
```cshtml
@{
    ViewBag.Title = "Antenna Impedance Analysis";
}

<div class="container" style="margin-top: 20px;">
    <h2>Antenna Impedance Sweep</h2>
    <p>Hover over the data points to see resistance and reactance values</p>
    
    @Html.EJS().Smithchart("antennaChart")
        .Width("100%")
        .Height("650px")
        .Title(t => t
            .Text("Antenna S11: 2.4 - 2.5 GHz")
            .Visible(true))
        .Series(series =>
        {
            series.Name("Measured Impedance")
                  .Fill("#2ecc71")
                  .Width(3)
                  .Marker(m => m
                      .Visible(true)
                      .Shape("Circle")
                      .Width(10)
                      .Height(10)
                      .Fill("#27ae60")
                      .Border(b => b.Width(2).Color("#ffffff")))
                  .Tooltip(new { visible= false })
                  .Points(ViewBag.AntennaData)
                  .Add();
        })
        .LegendSettings(legend => legend.Visible(true).Position("Bottom"))
        .Render()
    
    <div class="alert alert-info" style="margin-top: 15px;">
        <strong>How to use:</strong> Move your mouse over the green line to see exact impedance values at each frequency point.
    </div>
</div>
```

### Example 2: Filter Comparison with Tooltips

**Controller:**
```csharp
public ActionResult FilterComparison()
{
    ViewBag.Butterworth = new[]
    {
        new { resistance = 0.92, reactance = 0.08 },
        new { resistance = 0.88, reactance = 0.15 },
        new { resistance = 0.80, reactance = 0.30 },
        new { resistance = 0.70, reactance = 0.50 },
        new { resistance = 0.58, reactance = 0.72 }
    };
    
    ViewBag.Chebyshev = new[]
    {
        new { resistance = 0.95, reactance = 0.12 },
        new { resistance = 0.85, reactance = 0.25 },
        new { resistance = 0.72, reactance = 0.45 },
        new { resistance = 0.60, reactance = 0.68 },
        new { resistance = 0.50, reactance = 0.88 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("filterComparisonChart")
    .Width("1000px")
    .Height("750px")
    .Title(t => t.Text("Filter Performance: Butterworth vs Chebyshev"))
    .Series(series =>
    {
        series.Name("Butterworth Filter")
              .Fill("#3498db")
              .Width(3)
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.Shape.Circle)
                  .Width(12)
                  .Height(12)
                  .Fill("#3498db"))
              .Tooltip(new { visible= true })
              .Points(ViewBag.Butterworth)
              .Add();
        
        series.Name("Chebyshev Filter")
              .Fill("#e74c3c")
              .Width(3)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Diamond")
                  .Width(12)
                  .Height(12)
                  .Fill("#e74c3c"))
              .Tooltip(new { visible= true })
              .Points(ViewBag.Chebyshev)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .ToggleVisibility(true))
    .Render()
```

### Example 3: Before/After Optimization

**Controller:**
```csharp
public ActionResult OptimizationDemo()
{
    ViewBag.BeforeMatch = new[]
    {
        new { resistance = 0.45, reactance = 0.75 },
        new { resistance = 0.60, reactance = 1.00 },
        new { resistance = 0.80, reactance = 1.25 },
        new { resistance = 1.10, reactance = 1.45 }
    };
    
    ViewBag.AfterMatch = new[]
    {
        new { resistance = 0.90, reactance = 0.12 },
        new { resistance = 0.95, reactance = 0.08 },
        new { resistance = 1.00, reactance = 0.03 },
        new { resistance = 1.05, reactance = 0.05 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("optimizationChart")
    .Width("950px")
    .Height("700px")
    .Title(t => t.Text("Impedance Matching Network Results"))
    .Series(series =>
    {
        series.Name("Before Optimization (VSWR: 3.2)")
              .Fill("#dc3545")
              .Width(3)
              .Opacity(0.7)
              .Marker(m => m
                  .Visible(true)
                  .Shape(Syncfusion.EJ2.Charts.Shape.Cross)
                  .Width(14)
                  .Height(14)
                  .Fill("#dc3545"))
              .Tooltip(new { visible= true })
              .Points(ViewBag.BeforeMatch)
              .Add();
        
        series.Name("After Optimization (VSWR: 1.2)")
              .Fill("#28a745")
              .Width(3)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Circle")
                  .Width(14)
                  .Height(14)
                  .Fill("#28a745")
                  .Border(b => b.Width(2).Color("#ffffff")))
              .Tooltip(new { visible= true })
              .Points(ViewBag.AfterMatch)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()

<div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
    <h4>Analysis Instructions:</h4>
    <ul>
        <li>Hover over data points to see exact impedance values</li>
        <li>Red crosses show poor matching (high VSWR)</li>
        <li>Green circles show improved matching (low VSWR)</li>
        <li>Target: Resistance ≈ 1.0, Reactance ≈ 0.0 (50Ω match)</li>
    </ul>
</div>
```

### Example 4: Dense Data with Tooltips

For charts with many data points:

**Controller:**
```csharp
public ActionResult DenseData()
{
    // Generate 30 data points for detailed sweep
    var dataPoints = new List<object>();
    for (double i = 0.1; i <= 1.5; i += 0.05)
    {
        dataPoints.Add(new
        {
            resistance = i,
            reactance = Math.Sin(i * 2) * 0.5 + 0.5
        });
    }
    
    ViewBag.SweepData = dataPoints.ToArray();
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("denseDat aChart")
    .Width("900px")
    .Height("700px")
    .Title(t => t.Text("High-Resolution Impedance Sweep"))
    .Series(series =>
    {
        series.Name("Frequency Sweep: 1-3 GHz")
              .Fill("#9b59b6")
              .Width(2)
              .Marker(m => m
                  .Visible(false))      // Hide markers (too many points)
              .Tooltip(new { visible= true }) // But keep tooltips
              .Points(ViewBag.SweepData)
              .Add();
    })
    .Render()

<p style="margin-top: 10px; color: #666;">
    <em>Tooltips enabled without markers for clean appearance with dense data.</em>
</p>
```

## Customization Patterns

### Pattern 1: Tooltip Only (No Markers)

For dense data, enable tooltips without cluttering with markers:

```cshtml
.Marker(m => m
    .Visible(false))               // No visible markers
.Tooltip(new { visible= true })  // But tooltips enabled
```

### Pattern 2: Selective Tooltip Enabling

Enable tooltips only on series of interest:

```cshtml
// Measured data: Tooltip enabled
series.Points(ViewBag.Measured)
      .Name("Measured")
      .Tooltip(new { visible= true })
      .Add();

// Reference data: Tooltip disabled
series.Points(ViewBag.Reference)
      .Name("Reference")
      .Tooltip(new { visible= false })
      .Add();
```

### Pattern 3: Tooltips with Data Labels

Use both for different purposes:

```cshtml
.Marker(m => m
    .Visible(true)
    .DataLabel(dl => dl.Visible(true)))   // Always visible
.Tooltip(new { visible= true })     // On-demand details
```

**Use case:** Data labels show key points, tooltips provide precision on hover.

## Best Practices

### When to Enable Tooltips

**✅ Enable tooltips when:**
- Users need precise values
- Interactive exploration is desired
- Many data points make labels impractical
- Comparison between series is needed
- Digital/web-only charts (not for print)

**❌ Avoid tooltips when:**
- Chart is for print output
- Static presentation slides
- Performance is critical (very dense data)
- Touch interaction is primary (consider data labels instead)

### Performance Considerations

**For optimal performance:**
- Limit to reasonable data point counts (< 500 per series)
- Disable markers if not needed (reduces hit detection area)
- Test on target devices (especially mobile)

**Example - Performance optimized:**
```cshtml
.Marker(m => m
    .Visible(false))                    // No marker rendering
.Tooltip(new { visible= true })   // Tooltip only
```

### User Experience

**Provide clear instructions:**
```html
<div class="chart-instructions">
    <p><strong>Tip:</strong> Hover over the line to see detailed impedance values.</p>
</div>
```

**Consider mobile users:**
- Tooltips require tap interaction on mobile
- Test touch behavior on actual devices
- Provide alternative (data labels) if tooltip UX is poor

### Accessibility

**Limitations:**
- Tooltips are not keyboard-accessible by default
- Screen readers may not announce tooltip content
- Consider providing data table alternative for accessibility

**Example - Accessible alternative:**
```cshtml
@Html.EJS().Smithchart("accessibleChart")
    .Series(series =>
    {
        series.Points(ViewBag.Data)
              .Tooltip(new { visible= true }) 
              .Add();
    })
    .Render()

<details style="margin-top: 20px;">
    <summary>View Data Table (Accessible Alternative)</summary>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Point</th>
                <th>Resistance</th>
                <th>Reactance</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var point in ViewBag.Data)
            {
                <tr>
                    <td>@(ViewBag.Data.IndexOf(point) + 1)</td>
                    <td>@point.resistance</td>
                    <td>@point.reactance</td>
                </tr>
            }
        </tbody>
    </table>
</details>
```

### Combining Features

**Tooltips + Markers + Legend:**
```cshtml
.Series(series =>
{
    series.Points(ViewBag.Data)
          .Name("Impedance")                  // For legend
          .Marker(m => m
              .Visible(true))                  // Show markers
          .Tooltip(new { visible= true })  // Enable tooltips
          .Add();
})
.LegendSettings(legend => legend.Visible(true))
```

**Tooltips + Smart Labels:**
```cshtml
.Series(series =>
{
    series.Points(ViewBag.Data)
          .EnableSmartLabels(true)           // Prevent label overlap
          .Marker(m => m
              .DataLabel(dl => dl.Visible(true)))  // Show some labels
          .Tooltip(new { visible= true })     // Precise values on hover
          .Add();
})
```

## Troubleshooting

**Tooltip not appearing:**
1. Verify `Tooltip(t => t.Visible(true))` is set
2. Check that EJ2 scripts are loaded correctly
3. Ensure chart has data points
4. Test mouse hover behavior (not just click)

**Tooltip appears but shows no data:**
1. Verify data structure has `resistance` and `reactance` properties
2. Check for null/undefined values in data
3. Ensure data is properly bound to series

**Tooltip performance issues:**
1. Reduce data point count
2. Disable markers: `.Visible(false)`
3. Simplify chart configuration
4. Test on target devices

**Mobile touch not working:**
1. Test with actual touch devices (not mouse simulation)
2. Ensure adequate touch target size
3. Consider using data labels as alternative
4. Check for conflicting touch event handlers
