# Dimensions, Title, and Export Features in Smith Chart

## Table of Contents
- [Chart Dimensions](#chart-dimensions)
- [Container-Based Sizing](#container-based-sizing)
  - [HTML Container Setup](#html-container-setup)
  - [Inline Container Styling](#inline-container-styling)
  - [CSS Container Styling](#css-container-styling)
  - [Responsive Container](#responsive-container)
- [Fixed Dimensions (Pixels)](#fixed-dimensions-pixels)
  - [Basic Fixed Size](#basic-fixed-size)
  - [Common Fixed Sizes](#common-fixed-sizes)
  - [Fixed Size Example](#fixed-size-example)
- [Percentage-Based Sizing](#percentage-based-sizing)
  - [Basic Percentage Size](#basic-percentage-size)
  - [Responsive Full-Width Chart](#responsive-full-width-chart)
  - [Percentage Example](#percentage-example)
  - [Adaptive Sizing for Different Screens](#adaptive-sizing-for-different-screens)
- [Title and Subtitle](#title-and-subtitle)
- [Title Configuration](#title-configuration)
  - [Enabling Title](#enabling-title)
  - [Title with Subtitle](#title-with-subtitle)
  - [Title Styling](#title-styling)
  - [Title Alignment](#title-alignment)
  - [Complete Title Example](#complete-title-example)
- [Title Trimming](#title-trimming)
  - [Enable Title Trimming](#enable-title-trimming)
  - [Trimming Example](#trimming-example)
- [Print Functionality](#print-functionality)
  - [Print Method](#print-method)
  - [Complete Print Example](#complete-print-example)
  - [Print Keyboard Shortcut](#print-keyboard-shortcut)
- [Export Functionality](#export-functionality)
  - [Export Method](#export-method)
  - [Export Formats](#export-formats)
  - [Complete Export Example](#complete-export-example)
- [Complete Examples](#complete-examples)
  - [Example 1: Publication-Ready Chart](#example-1-publication-ready-chart)
  - [Example 2: Dashboard with Multiple Sizes](#example-2-dashboard-with-multiple-sizes)
- [Best Practices](#best-practices)
  - [Dimensions](#dimensions)
  - [Title Guidelines](#title-guidelines)
  - [Print Optimization](#print-optimization)
  - [Export Optimization](#export-optimization)
  - [Responsive Design](#responsive-design)
  - [Performance](#performance)

## Chart Dimensions

Smith Charts can be sized using three approaches:
1. **Container-based** - Chart adapts to parent container dimensions
2. **Fixed pixels** - Explicit width/height values
3. **Percentage** - Responsive sizing relative to container

## Container-Based Sizing

The chart automatically fills its container when dimensions are not explicitly set.

### HTML Container Setup

**HTML:**
```html
<div id="chartContainer" style="width: 800px; height: 600px;">
    @Html.EJS().Smithchart("smithchart")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

**The chart will inherit the container's 800px × 600px dimensions.**

### Inline Container Styling

```cshtml
<div style="width: 900px; height: 700px; border: 1px solid #ddd; padding: 10px;">
    @Html.EJS().Smithchart("smithchart")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

### CSS Container Styling

**CSS:**
```css
.smith-chart-container {
    width: 1000px;
    height: 750px;
    margin: 20px auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**View:**
```cshtml
<div class="smith-chart-container">
    @Html.EJS().Smithchart("smithchart")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

### Responsive Container

Full-width responsive chart:

```html
<div style="width: 100%; height: 600px;">
    @Html.EJS().Smithchart("smithchart")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

**Controller:**
```csharp
public ActionResult ResponsiveChart()
{
    ViewBag.Data = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 }
    };
    
    return View();
}
```

## Fixed Dimensions (Pixels)

Specify exact dimensions using the Width and Height properties.

### Basic Fixed Size

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Width("800px")
    .Height("600px")
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Common Fixed Sizes

**Small Chart (Mobile/Embedded):**
```cshtml
.Width("400px")
.Height("400px")
```

**Medium Chart (Standard Desktop):**
```cshtml
.Width("800px")
.Height("600px")
```

**Large Chart (Detailed Analysis):**
```cshtml
.Width("1200px")
.Height("900px")
```

**Square Chart (Presentations):**
```cshtml
.Width("700px")
.Height("700px")
```

### Fixed Size Example

**Controller:**
```csharp
public ActionResult FixedSizeChart()
{
    ViewBag.TransmissionData = new[]
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
<div style="text-align: center; padding: 20px;">
    <h2>Transmission Line Analysis</h2>
    
    @Html.EJS().Smithchart("fixedChart")
        .Width("900px")
        .Height("700px")
        .Title(t => t.Text("50Ω Transmission Line").Visible(true))
        .Series(series =>
        {
            series.Name("Impedance Data")
                  .Fill("#4169E1")
                  .Width(2)
                  .Marker(m => m.Visible(true))
                  .Points(ViewBag.TransmissionData)
                  .Add();
        })
        .LegendSettings(legend => legend.Visible(true))
        .Render()
</div>
```

## Percentage-Based Sizing

Use percentages for responsive layouts that adapt to screen size.

### Basic Percentage Size

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Width("100%")
    .Height("80%")
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Important:** Parent container must have defined dimensions for percentage to work.

### Responsive Full-Width Chart

```cshtml
<div style="width: 100%; height: 600px;">
    @Html.EJS().Smithchart("responsiveChart")
        .Width("100%")
        .Height("100%")
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

### Percentage Example

**Controller:**
```csharp
public ActionResult PercentageChart()
{
    ViewBag.FilterData = new[]
    {
        new { resistance = 0.85, reactance = 0.15 },
        new { resistance = 0.75, reactance = 0.45 },
        new { resistance = 0.60, reactance = 0.70 }
    };
    
    return View();
}
```

**View:**
```cshtml
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div style="width: 100%; height: 700px; background: #f8f9fa; padding: 15px;">
                @Html.EJS().Smithchart("percentChart")
                    .Width("100%")
                    .Height("100%")
                    .Title(t => t.Text("Filter Response (Responsive)"))
                    .Series(series =>
                    {
                        series.Name("Low-Pass Filter")
                              .Fill("#28a745")
                              .Width(3)
                              .Marker(m => m.Visible(true))
                              .Points(ViewBag.FilterData)
                              .Add();
                    })
                    .Render()
            </div>
        </div>
    </div>
</div>
```

### Adaptive Sizing for Different Screens

**Controller:**
```csharp
public ActionResult AdaptiveChart()
{
    ViewBag.Data = new[]
    {
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 }
    };
    
    // Detect device type
    bool isMobile = Request.Browser.IsMobileDevice;
    ViewBag.ChartWidth = isMobile ? "100%" : "900px";
    ViewBag.ChartHeight = isMobile ? "500px" : "700px";
    
    return View();
}
```

**View:**
```cshtml
<div style="width: 100%;">
    @Html.EJS().Smithchart("adaptiveChart")
        .Width(ViewBag.ChartWidth)
        .Height(ViewBag.ChartHeight)
        .Series(series => series.Points(ViewBag.Data).Add())
        .Render()
</div>
```

## Title and Subtitle

Titles provide context and identification for Smith Charts.

## Title Configuration

### Enabling Title

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Title(t => t
        .Text("Antenna Impedance Analysis")
        .Visible(true))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Properties:**
- **Text** - Title content
- **Visible** - Show/hide title (default: true)

### Title with Subtitle

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Title(t => t
        .Text("Antenna S11 Parameters")
        .Visible(true)
        .Subtitle(st => st
            .Text("Frequency Range: 2.4 - 2.5 GHz")
            .Visible(true)))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Title Styling

Customize title appearance:

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Title(t => t
        .Text("Filter Performance Analysis")
        .Visible(true)
        .TextStyle(new {
            size = "18px",
            fontFamily = "Arial",
            fontWeight = "bold" ,
            color = "#2c3e50" }))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**TextStyle Properties:**
- **Size** - Font size (e.g., "16px", "18px", "20px")
- **FontFamily** - Font name
- **FontWeight** - "normal", "bold", "600", "700"
- **Color** - Text color

### Title Alignment

```cshtml
.Title(t => t
    .Text("Smith Chart Analysis")
    .TextAlignment(Syncfusion.EJ2.Charts.SmithchartAlignment.Center))  // Center, Near, or Far
```

### Complete Title Example

**Controller:**
```csharp
public ActionResult TitledChart()
{
    ViewBag.MeasurementData = new[]
    {
        new { resistance = 0.9, reactance = 0.1 },
        new { resistance = 1.0, reactance = 0.05 },
        new { resistance = 1.1, reactance = 0.08 }
    };
    
    return View();
}
```

**View:**
```cshtml
@Html.EJS().Smithchart("titledChart")
    .Width("1000px")
    .Height("750px")
    .Title(t => t
        .Text("RF Amplifier Input Impedance")
        .Visible(true)
        .TextStyle(new {
            size = "20px",
            fontFamily = "Segoe UI",
            fontWeight = "bold",
            color = "#34495e" })
        .Subtitle(st => st
            .Text("Measured at VCC = 5V, 25°C")
            .Visible(true)
            .TextStyle(new {
                size = "14px",
                fontFamily = "Segoe UI",
                color ="#7f8c8d"})))
    .Series(series =>
    {
        series.Name("Input Impedance")
              .Fill("#3498db")
              .Width(3)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.MeasurementData)
              .Add();
    })
    .Render()
```

## Title Trimming

Automatically trim long titles to fit within chart bounds.

### Enable Title Trimming

```cshtml
.Title(t => t
    .Text("Very Long Title That Might Exceed Chart Width And Needs Trimming For Proper Display")
    .EnableTrim(true)
    .MaximumWidth(700))
```

**Properties:**
- **EnableTrim** - Enable automatic trimming (default: false)
- **MaximumWidth** - Maximum width in pixels before trimming

### Trimming Example

```cshtml
@Html.EJS().Smithchart("trimmedTitleChart")
    .Width("800px")
    .Height("600px")
    .Title(t => t
        .Text("Comprehensive Analysis of Transmission Line Impedance Characteristics Across Multiple Frequency Bands")
        .EnableTrim(true)
        .MaximumWidth(750)
        .TextStyle(new { size = "16px" }))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

**Result:** Title will be trimmed with "..." if it exceeds 750px width.

## Print Functionality

Enable users to print the Smith Chart directly from the browser.

### Print Method

Call the `print()` method on the chart instance:

```html
<button onclick="printChart()" class="btn btn-primary">Print Chart</button>

@Html.EJS().Smithchart("printableChart")
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()

<script>
    function printChart() {
        var chart = document.getElementById('printableChart').ej2_instances[0];
        chart.print();
    }
</script>
```

### Complete Print Example

**Controller:**
```csharp
public ActionResult PrintableChart()
{
    ViewBag.AntennaData = new[]
    {
        new { resistance = 0.85, reactance = 0.15 },
        new { resistance = 0.95, reactance = 0.08 },
        new { resistance = 1.00, reactance = 0.02 },
        new { resistance = 1.05, reactance = 0.05 }
    };
    
    return View();
}
```

**View:**
```cshtml
<div class="container" style="margin-top: 20px;">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Antenna Impedance Report</h2>
        <button onclick="printSmithChart()" class="btn btn-primary">
            <i class="fa fa-print"></i> Print Chart
        </button>
    </div>
    
    @Html.EJS().Smithchart("antennaChart")
        .Width("900px")
        .Height("700px")
        .Title(t => t
            .Text("Antenna S11 Measurements")
            .Subtitle(st => st.Text("Date: March 20, 2026")))
        .Series(series =>
        {
            series.Name("Measured Data")
                  .Fill("#000000")  // Black for print
                  .Width(2)
                  .Marker(m => m
                      .Visible(true)
                      .Shape("Circle")
                      .Fill("#000000"))
                  .Points(ViewBag.AntennaData)
                  .Add();
        })
        .LegendSettings(legend => legend.Visible(true))
        .Render()
</div>

<script>
    function printSmithChart() {
        var chart = document.getElementById('antennaChart').ej2_instances[0];
        chart.print();
    }
</script>
```

### Print Keyboard Shortcut

Enable Ctrl+P shortcut for printing:

```html
<script>
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'p') {
            event.preventDefault();
            var chart = document.getElementById('smithchart').ej2_instances[0];
            chart.print();
        }
    });
</script>
```

## Export Functionality

Export Smith Charts to various image formats for documentation and reports.

### Export Method

```javascript
chart.export(exportType, fileName);
```

**Parameters:**
- **exportType** - 'PNG', 'JPEG', 'SVG', or 'PDF'
- **fileName** - Name for exported file (without extension)

### Export Formats

**PNG (Recommended for Web):**
```javascript
chart.export('PNG', 'SmithChart');
```

**JPEG (Smaller File Size):**
```javascript
chart.export('JPEG', 'SmithChart');
```

**SVG (Vector, Scalable):**
```javascript
chart.export('SVG', 'SmithChart');
```

**PDF (Documents):**
```javascript
chart.export('PDF', 'SmithChart');
```

### Complete Export Example

**Controller:**
```csharp
public ActionResult ExportableChart()
{
    ViewBag.CircuitData = new[]
    {
        new { resistance = 0.2, reactance = 0.2 },
        new { resistance = 0.5, reactance = 0.5 },
        new { resistance = 0.8, reactance = 0.8 },
        new { resistance = 1.0, reactance = 1.0 }
    };
    
    return View();
}
```

**View:**
```cshtml
<div class="container" style="margin-top: 20px;">
    <div class="row mb-3">
        <div class="col-md-12">
            <h2>Circuit Impedance Analysis</h2>
            <div class="btn-group" role="group">
                <button onclick="exportAsPNG()" class="btn btn-success">Export PNG</button>
                <button onclick="exportAsJPEG()" class="btn btn-info">Export JPEG</button>
                <button onclick="exportAsSVG()" class="btn btn-warning">Export SVG</button>
                <button onclick="exportAsPDF()" class="btn btn-danger">Export PDF</button>
                <button onclick="printChart()" class="btn btn-primary">Print</button>
            </div>
        </div>
    </div>
    
    @Html.EJS().Smithchart("exportChart")
        .Width("900px")
        .Height("700px")
        .Title(t => t.Text("RF Circuit Impedance Analysis"))
        .Series(series =>
        {
            series.Name("Circuit Response")
                  .Fill("#2ecc71")
                  .Width(3)
                  .Marker(m => m
                      .Visible(true)
                      .Width(10)
                      .Height(10))
                  .Points(ViewBag.CircuitData)
                  .Add();
        })
        .LegendSettings(legend => legend.Visible(true))
        .Render()
</div>

<script>
    function getChartInstance() {
        return document.getElementById('exportChart').ej2_instances[0];
    }
    
    function exportAsPNG() {
        getChartInstance().export('PNG', 'SmithChart_Circuit_Analysis');
    }
    
    function exportAsJPEG() {
        getChartInstance().export('JPEG', 'SmithChart_Circuit_Analysis');
    }
    
    function exportAsSVG() {
        getChartInstance().export('SVG', 'SmithChart_Circuit_Analysis');
    }
    
    function exportAsPDF() {
        getChartInstance().export('PDF', 'SmithChart_Circuit_Analysis');
    }
    
    function printChart() {
        getChartInstance().print();
    }
</script>
```

## Complete Examples

### Example 1: Publication-Ready Chart

```cshtml
@Html.EJS().Smithchart("publicationChart")
    .Width("800px")
    .Height("800px")
    .Background("#ffffff")
    .Title(t => t
        .Text("Filter Performance Comparison")
        .TextStyle(new {
            fontFamily = "Times New Roman",
            size = "16px",
            fontWeight = "bold",
            color = "#000000" })
        .Subtitle(st => st
            .Text("Measured: March 2026")
            .TextStyle(new {
                fontFamily = "Times New Roman",
                size = "12px",
                color = "#333333"})))
    .Series(series =>
    {
        series.Name("Butterworth")
              .Fill("#000000")
              .Width(2)
              .Marker(m => m.Visible(true))
              .Points(ViewBag.Data)
              .Add();
    })
    .LegendSettings(legend => legend.Visible(true))
    .Render()

<div style="margin-top: 10px;">
    <button onclick="exportForPublication()" class="btn btn-primary">Export for Publication</button>
</div>

<script>
    function exportForPublication() {
        var chart = document.getElementById('publicationChart').ej2_instances[0];
        // SVG for best quality in documents
        chart.export('SVG', 'FilterAnalysis_Fig1');
    }
</script>
```

### Example 2: Dashboard with Multiple Sizes

```cshtml
<div class="row">
    <!-- Large main chart -->
    <div class="col-md-8">
        @Html.EJS().Smithchart("mainChart")
            .Width("100%")
            .Height("600px")
            .Title(t => t.Text("Primary Analysis"))
            .Series(series => series.Points(ViewBag.MainData).Add())
            .Render()
    </div>
    
    <!-- Small reference chart -->
    <div class="col-md-4">
        @Html.EJS().Smithchart("referenceChart")
            .Width("100%")
            .Height("300px")
            .Title(t => t.Text("Reference").TextStyle(new { size = "14px"}))
            .Series(series => series.Points(ViewBag.RefData).Add())
            .Render()
    </div>
</div>
```

## Best Practices

### Dimensions

**Fixed pixels when:**
- Specific layout requirements
- Print or PDF generation
- Consistent sizing across pages

**Percentage when:**
- Responsive web design
- Adapting to various screen sizes
- Fluid layouts

**Container-based when:**
- Simple responsive needs
- Grid-based layouts
- Standard use cases

### Title Guidelines

- **Be descriptive**: "Antenna S11 Measurements" not "Chart 1"
- **Include context**: Add measurement conditions in subtitle
- **Keep concise**: Long titles reduce chart area
- **Use trimming**: For dynamic/user-generated titles

### Print Optimization

**For best print results:**
- Use black/grayscale colors
- Increase line widths (2-3px)
- Ensure high contrast
- Remove unnecessary decorations
- Test print preview before printing

```cshtml
// Print-optimized styling
.Fill("#000000")
.Width(2)
.Marker(m => m.Fill("#000000").Width(8))
```

### Export Optimization

**Format selection:**
- **PNG**: Web, presentations, general use (recommended)
- **JPEG**: Smaller files, photos, web optimization
- **SVG**: Publications, scalable graphics, technical documents
- **PDF**: Reports, official documents, archival

**File naming:**
- Use descriptive names: `AntennaS11_2.4GHz_2026-03-20`
- Include dates for versioning
- Avoid spaces (use underscores or hyphens)

### Responsive Design

```cshtml
@{
    var isMobile = Request.Browser.IsMobileDevice;
}

@Html.EJS().Smithchart("responsiveChart")
    .Width(isMobile ? "100%" : "900px")
    .Height(isMobile ? "500px" : "700px")
    .Title(t => t
        .Text("Analysis")
        .TextStyle(new { size = isMobile ? "14px" : "18px"}))
    .Series(series => series.Points(ViewBag.Data).Add())
    .Render()
```

### Performance

- Avoid excessive redraws when resizing
- Use fixed dimensions for better initial load performance
- Cache exported files when possible
- Limit export file sizes for web delivery
