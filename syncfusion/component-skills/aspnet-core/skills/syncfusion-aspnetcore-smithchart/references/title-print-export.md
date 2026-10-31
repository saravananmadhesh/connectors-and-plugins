# Title, Subtitle, Print, and Export in Smith Chart

## Table of Contents
- [Title and Subtitle](#title-and-subtitle)
  - [Enabling Title and Subtitle](#enabling-title-and-subtitle)
  - [Title Customization](#title-customization)
  - [Subtitle Customization](#subtitle-customization)
  - [Title Trimming](#title-trimming)
  - [Title Visibility](#title-visibility)
- [Print Functionality](#print-functionality)
  - [Basic Print Implementation](#basic-print-implementation)
  - [Print with Custom Styling](#print-with-custom-styling)
  - [Print Example with Report Header](#print-example-with-report-header)
- [Export Functionality](#export-functionality)
  - [Supported Export Formats](#supported-export-formats)
  - [Basic Export Implementation](#basic-export-implementation)
  - [Export Format Selection](#export-format-selection)
  - [Format-Specific Recommendations](#format-specific-recommendations)
- [Practical Examples](#practical-examples)
  - [Example 1: Complete Report with Print and Export](#example-1-complete-report-with-print-and-export)
  - [Example 2: Scheduled Report Generation](#example-2-scheduled-report-generation)
  - [Example 3: Professional Report with Title Formatting](#example-3-professional-report-with-title-formatting)
  - [Example 4: Batch Export Implementation](#example-4-batch-export-implementation)
- [Integration Patterns](#integration-patterns)
  - [Pattern 1: Dashboard Widget with Export](#pattern-1-dashboard-widget-with-export)
  - [Pattern 2: Full Report Page](#pattern-2-full-report-page)
  - [Pattern 3: Data-Driven Export](#pattern-3-data-driven-export)

## Title and Subtitle

### Enabling Title and Subtitle

Add descriptive titles to your Smith Chart:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-title text="Smith Chart Analysis">
        <e-title-subtitle text="RF Circuit Impedance Matching">
        </e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

Both title and subtitle are visible by default. Set the text property to display them.

### Title Customization

Customize title appearance using the `font` and `alignment` properties:

```cshtml
<e-smithchart-title text="Smith Chart Analysis" textAlignment="Center">
    <e-title-font fontFamily="Arial" fontSize="18" fontColor="black" fontWeight="bold">
    </e-title-font>
</e-smithchart-title>
```

Font properties:
- `fontFamily` - Font typeface (Arial, Verdana, Georgia, etc.)
- `fontSize` - Text size in pixels (typical: 16-24 for titles)
- `fontColor` - Text color (hex, RGB, or color names)
- `fontWeight` - Font weight (normal, bold)
- `fontStyle` - Font style (normal, italic)

Text alignment options:
- `Left` - Left-aligned
- `Center` - Center-aligned (default)
- `Right` - Right-aligned

### Subtitle Customization

Customize subtitle similarly:

```cshtml
<e-title-subtitle text="RF Circuit Impedance Matching" textAlignment="Center">
    <e-smithchart-subtitle-font fontFamily="Arial" fontSize="14" fontColor="gray" fontStyle="italic">
    </e-smithchart-subtitle-font>
</e-title-subtitle>
```

Typical subtitle font sizes: 12-14 pixels, with lighter or italic styling for distinction.

### Title Trimming

For constrained layouts, trim titles that exceed available width:

```cshtml
<e-smithchart-title text="Smith Chart Analysis - Detailed Impedance Measurement and Load Matching" 
         enableTrim="true" maximumWidth="300">
    <e-title-font fontSize="16" fontWeight="bold">
    </e-title-font>
</e-smithchart-title>
```

Properties:
- `enableTrim` - Enable/disable trimming
- `maximumWidth` - Maximum width in pixels before trimming occurs

When text exceeds `maximumWidth`, it's truncated with an ellipsis (...).

### Title Visibility

Hide title and subtitle when not needed:

```cshtml
<e-smithchart-title text="Smith Chart" visible="false">
</e-smithchart-title>
```

## Print Functionality

Print Smith Charts directly from the browser for reports and documentation.

### Basic Print Implementation

Add a button to trigger printing:

```cshtml
<button onclick="document.getElementById('smithchart').ej2_instances[0].print()">
    Print Chart
</button>

<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

The print method captures the Smith Chart as currently rendered and opens the browser's print dialog.

### Print with Custom Styling

Ensure charts print well with CSS media queries:

```html
<style>
    @media print {
        .no-print {
            display: none;
        }
        
        #smithchart {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .print-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .print-date {
            text-align: right;
            font-size: 12px;
            margin-top: 20px;
            color: gray;
        }
    }
</style>
```

### Print Example with Report Header

```cshtml
<div id="printable">
    <div class="print-title">RF Circuit Analysis Report</div>
    
    <ejs-smithchart id="smithchart">
        <e-smithchart-title text="Impedance Analysis">
            <e-title-subtitle text="@DateTime.Now.ToString("MMMM dd, yyyy")">
            </e-title-subtitle>
        </e-smithchart-title>
        <e-smithchart-smithchartseriescollection>
            <e-smithchart-smithchartseries dataSource="MeasuredData" name="Measured" resistance="resistance" reactance="reactance">
            </e-smithchart-smithchartseries>
        </e-smithchart-smithchartseriescollection>
    </ejs-smithchart>
    
    <div class="print-date">Printed: @DateTime.Now.ToString("g")</div>
</div>

<button onclick="document.getElementById('smithchart').ej2_instances[0].print()">
    Print Report
</button>
```

## Export Functionality

Export Smith Charts to various image and document formats.

### Supported Export Formats

Smith Chart supports exporting to:
- **JPEG** - Compressed image format, good for web
- **PNG** - Lossless image format with transparency support
- **SVG** - Vector format, scalable without quality loss
- **PDF** - Document format suitable for reports

### Basic Export Implementation

Add buttons for different export formats:

```cshtml
<button onclick="document.getElementById('smithchart').ej2_instances[0].export('JPEG', 'SmithChart')">
    Export as JPEG
</button>

<button onclick="document.getElementById('smithchart').ej2_instances[0].export('PNG', 'SmithChart')">
    Export as PNG
</button>

<button onclick="document.getElementById('smithchart').ej2_instances[0].export('SVG', 'SmithChart')">
    Export as SVG
</button>

<button onclick="document.getElementById('smithchart').ej2_instances[0].export('PDF', 'SmithChart')">
    Export as PDF
</button>

<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

The export method takes two parameters:
1. Format: 'JPEG', 'PNG', 'SVG', or 'PDF'
2. Filename (without extension): 'SmithChart' creates 'SmithChart.jpg', 'SmithChart.png', etc.

### Export Format Selection

```html
<select id="exportFormat">
    <option value="JPEG">JPEG Image</option>
    <option value="PNG">PNG Image</option>
    <option value="SVG">SVG Vector</option>
    <option value="PDF">PDF Document</option>
</select>

<button onclick="exportChart()">Export</button>

<script>
function exportChart() {
    const format = document.getElementById('exportFormat').value;
    const filename = 'SmithChart_' + new Date().getTime();
    document.getElementById('smithchart').ej2_instances[0].export(format, filename);
}
</script>
```

### Format-Specific Recommendations

**JPEG** - Best for:
- Quick sharing via email
- Web display
- File size optimization
- General documentation

**PNG** - Best for:
- Transparent backgrounds
- Lossless quality
- Technical publications
- Long-term archival

**SVG** - Best for:
- Scalable graphics
- Web applications
- Further editing with vector tools
- Presentation slides

**PDF** - Best for:
- Professional reports
- Multi-page documents
- Printing
- Email distribution

## Practical Examples

### Example 1: Complete Report with Print and Export

```cshtml
@page
@model SmithChartReportModel

<div class="chart-controls">
    <button onclick="printChart()" class="btn btn-primary">Print Chart</button>
    <button onclick="exportAsJPEG()" class="btn btn-secondary">Export JPEG</button>
    <button onclick="exportAsPNG()" class="btn btn-secondary">Export PNG</button>
    <button onclick="exportAsSVG()" class="btn btn-secondary">Export SVG</button>
    <button onclick="exportAsPDF()" class="btn btn-secondary">Export PDF</button>
</div>

<ejs-smithchart id="smithchart" width="100%" height="600px">
    <e-smithchart-title text="RF Circuit Analysis Report">
        <e-title-subtitle text="Generated: @DateTime.Now.ToString("MMMM dd, yyyy HH:mm")">
        </e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-legendsettings visible="true" position="Bottom" toggleVisibility="true">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Model.CircuitData" name="Circuit Impedance" fill="navy" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="Model.ReferenceData" name="Reference Match" fill="red" opacity="0.6" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>

<script>
function printChart() {
    const chart = document.getElementById('smithchart').ej2_instances[0];
    chart.print();
}

function exportAsJPEG() {
    const chart = document.getElementById('smithchart').ej2_instances[0];
    chart.export('JPEG', 'SmithChart_' + new Date().toISOString().split('T')[0]);
}

function exportAsPNG() {
    const chart = document.getElementById('smithchart').ej2_instances[0];
    chart.export('PNG', 'SmithChart_' + new Date().toISOString().split('T')[0]);
}

function exportAsSVG() {
    const chart = document.getElementById('smithchart').ej2_instances[0];
    chart.export('SVG', 'SmithChart_' + new Date().toISOString().split('T')[0]);
}

function exportAsPDF() {
    const chart = document.getElementById('smithchart').ej2_instances[0];
    chart.export('PDF', 'SmithChart_' + new Date().toISOString().split('T')[0]);
}
</script>
```

### Example 2: Scheduled Report Generation

```csharp
public class ReportGenerationModel : PageModel
{
    public List<SmithChartData> CircuitData { get; set; }
    
    public void OnGet()
    {
        // Load today's circuit analysis data
        CircuitData = LoadCircuitAnalysisForToday();
    }
    
    private List<SmithChartData> LoadCircuitAnalysisForToday()
    {
        // Database query or calculation
        return new List<SmithChartData> { /* ... */ };
    }
}
```

### Example 3: Professional Report with Title Formatting

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-title text="Impedance Analysis - Daily Report" textAlignment="Center" enableTrim="true" maximumWidth="500">
        <e-title-font fontFamily="Georgia" fontSize="20" fontColor="#003366" fontWeight="bold">
        </e-title-font>
    </e-smithchart-title>
    <e-title-subtitle text="RF Circuit Characterization Study - @Model.ProjectName" textAlignment="Center">
        <e-smithchart-subtitle-font fontFamily="Georgia" fontSize="14" fontColor="#666666" fontStyle="italic">
        </e-smithchart-subtitle-font>
    </e-title-subtitle>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Model.Data" name="Measurement" resistance="resistance" reactance="reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 4: Batch Export Implementation

```cshtml
<form method="post">
    <input type="hidden" id="chartData" name="chartData" />
    
    <select id="batchFormat">
        <option value="PNG">PNG Batch</option>
        <option value="JPEG">JPEG Batch</option>
        <option value="PDF">PDF Batch</option>
    </select>
    
    <button type="button" onclick="batchExport()">Export All Measurements</button>
</form>

<ejs-smithchart id="smithchart">
    <!-- Chart configuration -->
</ejs-smithchart>

<script>
function batchExport() {
    const format = document.getElementById('batchFormat').value;
    const measurements = @Html.Raw(Json.Serialize(Model.AllMeasurements));
    
    measurements.forEach((measurement, index) => {
        const chart = document.getElementById('smithchart').ej2_instances[0];
        const filename = `Measurement_${index + 1}`;
        chart.export(format, filename);
    });
}
</script>
```

## Integration Patterns

### Pattern 1: Dashboard Widget with Export

Minimal UI, export on demand:

```cshtml
<div class="dashboard-widget">
    <span class="widget-actions">
        <button onclick="document.getElementById('widget-chart').ej2_instances[0].export('PNG', 'Widget')">
            ⬇️ Save
        </button>
    </span>
    <ejs-smithchart id="widget-chart" width="100%" height="250px">
        <e-smithchart-smithchartseriescollection>
            <e-smithchart-smithchartseries dataSource="Data" name="Status" resistance="resistance" reactance="reactance">
            </e-smithchart-smithchartseries>
        </e-smithchart-smithchartseriescollection>
    </ejs-smithchart>
</div>
```

### Pattern 2: Full Report Page

Complete analysis with print/export options:

```cshtml
<div class="report-header">
    <h1>Circuit Analysis Report</h1>
    <div class="report-actions">
        <button onclick="printReport()">Print</button>
        <button onclick="exportReport()">Export</button>
    </div>
</div>

<ejs-smithchart id="report-chart">
    <!-- Full configuration with title, legend, multiple series -->
</ejs-smithchart>

<div class="report-footer">
    <p>Analysis completed: @DateTime.Now</p>
</div>
```

### Pattern 3: Data-Driven Export

Multiple charts exported with consistent naming:

```csharp
// C# Model
public class ExportModel
{
    public string ProjectName { get; set; }
    public DateTime AnalysisDate { get; set; }
    public List<ChartDataPoint> Measurements { get; set; }
}
```

```cshtml
@model ExportModel

<ejs-smithchart id="analysis">
    <e-smithchart-title text="@Model.ProjectName - Analysis">
        <e-title-subtitle text="@Model.AnalysisDate.ToString("g")">
        </e-title-subtitle>
    </e-smithchart-title>
</ejs-smithchart>

<button onclick="exportAnalysis()">Save Report</button>

<script>
function exportAnalysis() {
    const filename = '@Model.ProjectName'.replace(/\s+/g, '_') + '_' + new Date().toISOString().split('T')[0];
    document.getElementById('analysis').ej2_instances[0].export('PDF', filename);
}
</script>
```

Title, subtitle, print, and export features transform Smith Charts from standalone visualizations into shareable, professional-quality reports suitable for technical documentation and analysis workflows.
