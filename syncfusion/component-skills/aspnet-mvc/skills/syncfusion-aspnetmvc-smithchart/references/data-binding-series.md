# Data Binding and Series Management in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Data Structure Requirements](#data-structure-requirements)
  - [Required Fields](#required-fields)
  - [Valid Data Examples](#valid-data-examples)
  - [Invalid Data (Common Mistakes)](#invalid-data-common-mistakes)
- [Points vs Datasource](#points-vs-datasource)
  - [Using Points Property](#using-points-property)
  - [Using Datasource Property](#using-datasource-property)
- [Adding Series Using Points](#adding-series-using-points)
  - [Basic Single Series](#basic-single-series)
  - [Series with Multiple Data Points](#series-with-multiple-data-points)
- [Adding Series Using Datasource](#adding-series-using-datasource)
  - [With Strongly-Typed Model](#with-strongly-typed-model)
  - [From Database or API](#from-database-or-api)
- [Multiple Series Management](#multiple-series-management)
  - [Adding Multiple Series for Comparison](#adding-multiple-series-for-comparison)
- [Series Customization](#series-customization)
  - [Available Customization Options](#available-customization-options)
  - [Fill Color (Series Line Color)](#fill-color-series-line-color)
  - [Width (Line Thickness)](#width-line-thickness)
  - [Opacity (Transparency)](#opacity-transparency)
  - [Visibility (Show/Hide)](#visibility-showhide)
  - [Complete Customization Example](#complete-customization-example)
- [Smart Labels](#smart-labels)
  - [Enabling Smart Labels](#enabling-smart-labels)
  - [When to Use Smart Labels](#when-to-use-smart-labels)
- [Complete Working Examples](#complete-working-examples)
  - [Example 1: RF Filter Analysis](#example-1-rf-filter-analysis)
  - [Example 2: Before/After Matching Network](#example-2-beforeafter-matching-network)
- [Best Practices](#best-practices)
  - [Data Organization](#data-organization)
  - [Performance Optimization](#performance-optimization)
  - [Error Handling](#error-handling)
  - [Naming Conventions](#naming-conventions)
  - [Visual Consistency](#visual-consistency)

## Overview

The Smith Chart component visualizes transmission line parameters by plotting data points on circular grids. Each series represents a set of impedance or admittance measurements, and you can display multiple series simultaneously for comparison.

**Key Concepts:**
- **Series** - A collection of data points representing impedance/admittance values
- **Points** - Individual data entries with resistance and reactance coordinates
- **Datasource** - Alternative way to bind data to series
- **Resistance** - The real part of impedance (horizontal axis component)
- **Reactance** - The imaginary part of impedance (radial axis component)

## Data Structure Requirements

Every data point in a Smith Chart must contain two essential properties:

### Required Fields

```csharp
new { resistance = 0.5, reactance = 0.3 }
```

- **resistance** (required) - Numeric value representing the real part of impedance
  - Typically normalized values (0 to 3+ range)
  - Must be a number (int, double, decimal, float)
  - Property name must be exactly `resistance` (case-sensitive)

- **reactance** (required) - Numeric value representing the imaginary part of impedance
  - Can be positive (inductive) or negative (capacitive)
  - Must be a number (int, double, decimal, float)
  - Property name must be exactly `reactance` (case-sensitive)

### Valid Data Examples

```csharp
// Anonymous object array
var data1 = new[]
{
    new { resistance = 0.15, reactance = 0.0 },
    new { resistance = 0.25, reactance = 0.5 }
};

// Strongly-typed class
public class ImpedancePoint
{
    public double resistance { get; set; }
    public double reactance { get; set; }
}

var data2 = new List<ImpedancePoint>
{
    new ImpedancePoint { resistance = 0.2, reactance = 0.1 },
    new ImpedancePoint { resistance = 0.3, reactance = 0.2 }
};

// From database or API
var data3 = dbContext.Measurements
    .Select(m => new { resistance = m.RealPart, reactance = m.ImaginaryPart })
    .ToArray();
```

### Invalid Data (Common Mistakes)

```csharp
// ❌ Wrong property names
new { r = 0.5, x = 0.3 }  // Must be "resistance" and "reactance"

// ❌ String values instead of numbers
new { resistance = "0.5", reactance = "0.3" }  // Must be numeric

// ❌ Missing required properties
new { resistance = 0.5 }  // Missing reactance
new { reactance = 0.3 }   // Missing resistance

// ❌ Null values
new { resistance = null, reactance = 0.3 }  // Use 0 instead of null
```

## Points vs Datasource

Smith Chart provides two equivalent ways to bind data to a series:

### Using Points Property

**When to use:**
- Simple data binding with ViewBag/ViewData
- Data is already formatted as anonymous objects
- Quick prototypes and examples
- Single-dimensional data arrays

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Points(ViewBag.Data)
              .Name("Series 1")
              .Add();
    })
    .Render()
```

### Using Datasource Property

**When to use:**
- Strongly-typed model classes
- Complex data binding scenarios
- Data requires transformation or mapping
- Integration with Entity Framework or other ORMs

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .Name("Series 1")
              .Add();
    })
    .Render()
```

**Important:** Both `Points` and `Datasource` produce identical results. Choose based on your preference and code structure.

## Adding Series Using Points

### Basic Single Series

**Controller:**
```csharp
public ActionResult BasicSeries()
{
    ViewBag.TransmissionData = new[]
    {
        new { resistance = 0.15, reactance = 0.0 },
        new { resistance = 0.18, reactance = 0.15 },
        new { resistance = 0.25, reactance = 0.30 },
        new { resistance = 0.40, reactance = 0.50 },
        new { resistance = 0.65, reactance = 0.75 },
        new { resistance = 1.00, reactance = 1.00 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Points(ViewBag.TransmissionData)
              .Name("50Ω Transmission Line")
              .Add();
    })
    .Render()
```

### Series with Multiple Data Points

For detailed impedance measurements, include more data points:

**Controller:**
```csharp
public ActionResult DetailedMeasurement()
{
    // High-resolution impedance sweep from 1 GHz to 3 GHz
    ViewBag.ImpedanceSweep = new[]
    {
        new { resistance = 0.10, reactance = 0.00 },
        new { resistance = 0.12, reactance = 0.05 },
        new { resistance = 0.15, reactance = 0.10 },
        new { resistance = 0.18, reactance = 0.15 },
        new { resistance = 0.22, reactance = 0.22 },
        new { resistance = 0.28, reactance = 0.30 },
        new { resistance = 0.35, reactance = 0.40 },
        new { resistance = 0.45, reactance = 0.52 },
        new { resistance = 0.58, reactance = 0.65 },
        new { resistance = 0.75, reactance = 0.80 },
        new { resistance = 0.95, reactance = 0.95 },
        new { resistance = 1.20, reactance = 1.10 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Title(t => t.Text("Antenna Impedance: 1-3 GHz Sweep"))
    .Series(series =>
    {
        series.Name("Antenna Impedance")
              .Fill("#FF6347")
              .Width(2)
              .Marker(m => m.Visible(true).Shape("Circle"))
              .Points(ViewBag.ImpedanceSweep)
              .Add();
    })
    .Render()
```

## Adding Series Using Datasource

### With Strongly-Typed Model

**Model Class:**
```csharp
public class SmithChartPoint
{
    public double resistance { get; set; }
    public double reactance { get; set; }
    public double frequency { get; set; }  // Optional: for reference
    public string description { get; set; }  // Optional: for tooltips
}
```

**Controller:**
```csharp
public ActionResult StronglyTypedSeries()
{
    var filterData = new List<SmithChartPoint>
    {
        new SmithChartPoint { resistance = 0.2, reactance = 0.0, frequency = 100 },
        new SmithChartPoint { resistance = 0.3, reactance = 0.2, frequency = 200 },
        new SmithChartPoint { resistance = 0.5, reactance = 0.4, frequency = 300 },
        new SmithChartPoint { resistance = 0.8, reactance = 0.7, frequency = 400 },
        new SmithChartPoint { resistance = 1.2, reactance = 1.0, frequency = 500 }
    };
    
    ViewBag.FilterResponse = filterData;
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.DataSource(ViewBag.FilterResponse)
              .Name("Filter Response")
              .Add();
    })
    .Render()
```

### From Database or API

**Controller with Entity Framework:**
```csharp
public ActionResult DatabaseSeries()
{
    using (var context = new ApplicationDbContext())
    {
        // Query impedance measurements from database
        var measurements = context.ImpedanceMeasurements
            .Where(m => m.TestId == 12345)
            .OrderBy(m => m.Frequency)
            .Select(m => new
            {
                resistance = m.ResistanceValue,
                reactance = m.ReactanceValue
            })
            .ToArray();
        
        ViewBag.MeasurementData = measurements;
    }
    
    return View();
}
```

**Controller with API Call:**
```csharp
public async Task<ActionResult> ApiSeries()
{
    using (var client = new HttpClient())
    {
        var response = await client.GetStringAsync("https://api.example.com/measurements");
        var data = JsonConvert.DeserializeObject<List<MeasurementData>>(response);
        
        // Transform to Smith Chart format
        ViewBag.ApiData = data.Select(d => new
        {
            resistance = d.RealPart / 50.0,  // Normalize to 50Ω
            reactance = d.ImaginaryPart / 50.0
        }).ToArray();
    }
    
    return View();
}
```

## Multiple Series Management

### Adding Multiple Series for Comparison

**Controller:**
```csharp
public ActionResult CompareSeries()
{
    // Antenna A: Good matching
    ViewBag.AntennaA = new[]
    {
        new { resistance = 0.8, reactance = 0.1 },
        new { resistance = 0.9, reactance = 0.15 },
        new { resistance = 1.0, reactance = 0.1 },
        new { resistance = 1.1, reactance = 0.05 },
        new { resistance = 1.0, reactance = 0.0 }
    };
    
    // Antenna B: Poor matching
    ViewBag.AntennaB = new[]
    {
        new { resistance = 0.3, reactance = 0.5 },
        new { resistance = 0.5, reactance = 0.8 },
        new { resistance = 0.8, reactance = 1.2 },
        new { resistance = 1.3, reactance = 1.5 },
        new { resistance = 1.8, reactance = 1.8 }
    };
    
    // Antenna C: Moderate matching
    ViewBag.AntennaC = new[]
    {
        new { resistance = 0.6, reactance = 0.3 },
        new { resistance = 0.8, reactance = 0.4 },
        new { resistance = 1.0, reactance = 0.35 },
        new { resistance = 1.2, reactance = 0.25 },
        new { resistance = 1.3, reactance = 0.15 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Title(t => t.Text("Antenna Impedance Comparison"))
    .Width("1000px")
    .Height("700px")
    .Series(series =>
    {
        // Series 1: Antenna A
        series.Name("Antenna A (Optimized)")
              .Fill("#28a745")
              .Width(2)
              .Marker(m => m.Visible(true).Shape("Circle").Width(8).Height(8))
              .Points(ViewBag.AntennaA)
              .Add();
        
        // Series 2: Antenna B
        series.Name("Antenna B (Poor Match)")
              .Fill("#dc3545")
              .Width(2)
              .Marker(m => m.Visible(true).Shape("Triangle").Width(8).Height(8))
              .Points(ViewBag.AntennaB)
              .Add();
        
        // Series 3: Antenna C
        series.Name("Antenna C (Acceptable)")
              .Fill("#ffc107")
              .Width(2)
              .Marker(m => m.Visible(true).Shape("Diamond").Width(8).Height(8))
              .Points(ViewBag.AntennaC)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true).Position("Bottom"))
    .Render()
```

## Series Customization

### Available Customization Options

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Name("Custom Series")
              .Fill("#FF6347")              // Line color
              .Width(3)                     // Line thickness
              .Opacity(0.8)                 // Transparency (0 to 1)
              .Visibility("visible")             // Show/hide series
              .EnableSmartLabels(true)      // Prevent label overlap
              .Marker(m => m.Visible(true)) // Show data point markers
              .Tooltip(t => t.Visible(true)) // Enable tooltips
              .Points(ViewBag.Data)
              .Add();
    })
    .Render()
```

### Fill Color (Series Line Color)

**Using Named Colors:**
```cshtml
.Fill("red")
.Fill("blue")
.Fill("green")
```

**Using Hex Colors:**
```cshtml
.Fill("#FF6347")  // Tomato
.Fill("#4169E1")  // Royal Blue
.Fill("#32CD32")  // Lime Green
```

**Using RGB:**
```cshtml
.Fill("rgb(255, 99, 71)")
.Fill("rgb(65, 105, 225)")
```

### Width (Line Thickness)

```cshtml
.Width(1)   // Thin line
.Width(2)   // Medium line (default)
.Width(3)   // Thick line
.Width(5)   // Very thick line
```

### Opacity (Transparency)

```cshtml
.Opacity(1.0)   // Fully opaque (default)
.Opacity(0.8)   // 80% opaque
.Opacity(0.5)   // 50% opaque
.Opacity(0.3)   // 30% opaque (subtle)
```

### Visibility (Show/Hide)

```cshtml
.Visibility("visible")   // Show series (default)
.Visibility("hidden")  // Hide series
```

Use visibility to:
- Dynamically show/hide series based on user selection
- Temporarily hide series during analysis
- Create series that are hidden by default

### Complete Customization Example

**Controller:**
```csharp
public ActionResult CustomizedSeries()
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
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        // Primary series: Bold and prominent
        series.Name("Primary Circuit")
              .Fill("#FF6347")
              .Width(4)
              .Opacity(1.0)
              .Visibility("visible")
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Circle")
                  .Width(10)
                  .Height(10)
                  .Fill("#FF0000")
                  .Border(b => b.Width(2).Color("#FFFFFF")))
              .Points(ViewBag.Primary)
              .Add();
        
        // Secondary series: Subtle and translucent
        series.Name("Reference Circuit")
              .Fill("#4169E1")
              .Width(2)
              .Opacity(0.6)
              .Visibility("visible")
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Shape("Diamond")
                  .Width(8)
                  .Height(8))
              .Points(ViewBag.Secondary)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

## Smart Labels

Smart labels prevent data label text from overlapping when multiple labels are close together.

### Enabling Smart Labels

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Name("Dense Measurements")
              .EnableSmartLabels(true)  // Enable smart label positioning
              .Marker(m => m
                  .Visible(true)
                  .DataLabel(dl => dl.Visible(true)))
              .Points(ViewBag.DenseData)
              .Add();
    })
    .Render()
```

### When to Use Smart Labels

**Enable when:**
- Data points are close together
- Multiple series with overlapping regions
- Data labels are visible
- High-density measurements (many points in small area)

**Example: Dense Data with Smart Labels**

**Controller:**
```csharp
public ActionResult DenseData()
{
    // Many points in a small area
    var points = new List<object>();
    for (double i = 0.8; i <= 1.2; i += 0.05)
    {
        points.Add(new { resistance = i, reactance = i * 0.8 });
    }
    
    ViewBag.DensePoints = points.ToArray();
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("smithchart")
    .Series(series =>
    {
        series.Name("High Density Scan")
              .EnableSmartLabels(true)
              .Marker(m => m
                  .Visible(true)
                  .Width(6)
                  .Height(6)
                  .DataLabel(dl => dl
                      .Visible(true)
                      .TextStyle(new { size = "10px" })))
               .Points(ViewBag.DensePoints)
              .Add();
    })
    .Render()
```

## Complete Working Examples

### Example 1: RF Filter Analysis

**Controller:**
```csharp
public class FilterAnalysisController : Controller
{
    public ActionResult Index()
    {
        // Low-pass filter response at different frequencies
        ViewBag.LowPass = new[]
        {
            new { resistance = 0.95, reactance = 0.05 },
            new { resistance = 0.92, reactance = 0.12 },
            new { resistance = 0.85, reactance = 0.25 },
            new { resistance = 0.75, reactance = 0.45 },
            new { resistance = 0.60, reactance = 0.70 },
            new { resistance = 0.45, reactance = 0.95 }
        };
        
        // High-pass filter response
        ViewBag.HighPass = new[]
        {
            new { resistance = 0.50, reactance = -0.80 },
            new { resistance = 0.70, reactance = -0.55 },
            new { resistance = 0.85, reactance = -0.30 },
            new { resistance = 0.95, reactance = -0.15 },
            new { resistance = 1.00, reactance = -0.05 },
            new { resistance = 1.02, reactance = 0.05 }
        };
        
        return View();
    }
}
```

**View:**
```cshtml
@{
    ViewBag.Title = "RF Filter Impedance Analysis";
}

<h2>Filter Impedance Comparison</h2>

@Html.EJS().Smithchart("filterComparison")
    .Title(t => t.Text("RF Filter Impedance: 500MHz - 2GHz").Visible(true))
    .Width("100%")
    .Height("600px")
    .Series(series =>
    {
        series.Name("Low-Pass Filter")
              .Fill("#28a745")
              .Width(3)
              .Marker(m => m.Visible(true).Shape("Circle"))
              .Tooltip(t => t.Visible(true))
              .Points(ViewBag.LowPass)
              .Add();
        
        series.Name("High-Pass Filter")
              .Fill("#007bff")
              .Width(3)
              .Marker(m => m.Visible(true).Shape("Triangle"))
              .Tooltip(t => t.Visible(true))
              .Points(ViewBag.HighPass)
              .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position("Bottom")
        .Alignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center))
    .Render()
```

### Example 2: Before/After Matching Network

**Controller:**
```csharp
public ActionResult MatchingNetwork()
{
    // Before matching: Poor impedance match
    ViewBag.BeforeMatching = new[]
    {
        new { resistance = 0.3, reactance = 0.8 },
        new { resistance = 0.4, reactance = 1.0 },
        new { resistance = 0.6, reactance = 1.3 },
        new { resistance = 0.9, reactance = 1.5 }
    };
    
    // After matching: Improved to near 50Ω
    ViewBag.AfterMatching = new[]
    {
        new { resistance = 0.9, reactance = 0.1 },
        new { resistance = 0.95, reactance = 0.08 },
        new { resistance = 1.0, reactance = 0.05 },
        new { resistance = 1.05, reactance = 0.03 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("matchingDemo")
    .Title(t => t.Text("Impedance Matching Network: Before vs After"))
    .Width("900px")
    .Height("700px")
    .Series(series =>
    {
        series.Name("Before Matching (High VSWR)")
              .Fill("#dc3545")
              .Width(3)
              .Opacity(0.7)
              .Marker(m => m.Visible(true).Shape("Cross").Width(10).Height(10))
              .Points(ViewBag.BeforeMatching)
              .Add();
        
        series.Name("After Matching (Low VSWR)")
              .Fill("#28a745")
              .Width(3)
              .Marker(m => m.Visible(true).Shape("Circle").Width(10).Height(10))
              .Points(ViewBag.AfterMatching)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()
```

## Best Practices

### Data Organization

1. **Normalize Your Data**
   - Typically normalize impedance to characteristic impedance (50Ω or 75Ω)
   - Formula: `normalized_resistance = actual_resistance / Z0`
   - Formula: `normalized_reactance = actual_reactance / Z0`

2. **Sort Data Logically**
   - Order points by frequency (low to high or high to low)
   - Ensures smooth line connections
   - Makes trends easier to visualize

3. **Validate Data Ranges**
   - Resistance: typically 0 to 3 for normalized data
   - Reactance: typically -3 to +3
   - Values outside this range may indicate unnormalized data

### Performance Optimization

1. **Limit Data Points Per Series**
   - Optimal: 50-200 points per series
   - Maximum practical: 500 points
   - Beyond 500 points: consider decimation or aggregation

2. **Use Appropriate Precision**
   - 2-3 decimal places sufficient for most applications
   - Round values to reduce data size

```csharp
// Good: Reasonable precision
new { resistance = 0.856, reactance = 0.432 }

// Excessive: Too much precision
new { resistance = 0.85632147, reactance = 0.43289561 }
```

3. **Cache Static Data**
   - Store reference data in application cache
   - Avoid regenerating constant datasets

### Error Handling

```csharp
public ActionResult SafeSeriesBinding()
{
    try
    {
        var measurements = GetMeasurementsFromDatabase();
        
        // Validate data
        if (measurements == null || !measurements.Any())
        {
            // Provide default/sample data
            ViewBag.Data = GetDefaultSampleData();
            ViewBag.Message = "Using sample data - no measurements found";
        }
        else
        {
            // Normalize and validate
            ViewBag.Data = measurements
                .Where(m => m.Resistance.HasValue && m.Reactance.HasValue)
                .Select(m => new
                {
                    resistance = Math.Round(m.Resistance.Value, 3),
                    reactance = Math.Round(m.Reactance.Value, 3)
                })
                .ToArray();
        }
    }
    catch (Exception ex)
    {
        // Log error and provide fallback
        Logger.LogError(ex, "Failed to load Smith Chart data");
        ViewBag.Data = GetDefaultSampleData();
        ViewBag.Error = "Error loading data";
    }
    
    return View();
}
```

### Naming Conventions

- Use descriptive series names: "Antenna Impedance 2.4GHz" not "Series1"
- Include units or context in names
- Keep names concise for legend display

**Good Names:**
- "50Ω Coax - RG-58"
- "Antenna Match: 800-900 MHz"
- "Pre-Amplifier Input"

**Poor Names:**
- "Data1"
- "Test"
- "Series"

### Visual Consistency

When comparing multiple series:
- Use consistent line widths
- Choose distinct, color-blind-friendly colors
- Use different marker shapes for each series
- Enable legend for identification
- Consider opacity for overlapping regions
