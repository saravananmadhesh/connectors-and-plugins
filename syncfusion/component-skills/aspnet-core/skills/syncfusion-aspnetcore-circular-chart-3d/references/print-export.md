# Print and Export Functionality

## Table of Contents
- [Printing](#printing)
  - [Basic Print Implementation](#basic-print-implementation)
  - [Print Method Details](#print-method-details)
  - [Print Quality](#print-quality)
  - [Integration with UI Buttons](#integration-with-ui-buttons)
- [Exporting](#exporting)
  - [Export Methods](#export-methods)
  - [Export Method Signature](#export-method-signature)
  - [Basic Export Implementation](#basic-export-implementation)
- [Export Formats](#export-formats)
  - [JPEG Export](#jpeg-export)
  - [PNG Export](#png-export)
  - [SVG Export](#svg-export)
  - [PDF Export](#pdf-export)
  - [PDF Export with Options](#pdf-export-with-options)
- [Implementation Examples](#implementation-examples)
  - [Example 1 Multiple Export Buttons](#example-1-multiple-export-buttons)
  - [Example 2 Export with Dynamic Filename](#example-2-export-with-dynamic-filename)
  - [Example 3 Export in Server-side Button Click](#example-3-export-in-server-side-button-click)
- [Common Patterns](#common-patterns)
  - [Pattern 1 Smart Export Selection](#pattern-1-smart-export-selection)
  - [Pattern 2 Export on Report Generation](#pattern-2-export-on-report-generation)
  - [Pattern 3 Format-Specific Export](#pattern-3-format-specific-export)
- [Best Practices](#best-practices)

## Printing

The rendered 3D circular chart(pie/donut) can be printed directly from the browser by calling the public `Print` method. This is useful for generating hardcopies of chart reports.

### Basic Print Implementation

**View (CSHTML):**
```cshtml
<div>
    <button onclick="printChart()">Print Chart</button>
</div>

<ejs-circularchart3d id="chartContainer" title="Sales Distribution" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>

<script>
function printChart() {
    var chartObj = document.getElementById("chartContainer").ej2_instances[0];
    chartObj.print();
}
</script>
```

**Result:** Clicking "Print Chart" opens the browser's print dialog to print the chart.

### Print Method Details

After retrieving the chart instance, call `chart.print()` to open the browser print dialog.

```javascript
// Print the chart
var chart = document.getElementById("chartContainer").ej2_instances[0];
chart.print();
```

The chart is rendered at its current size and quality in the print dialog.

### Print Quality

The print output matches the screen resolution. For better print quality:
1. Ensure the chart is rendered at appropriate size on screen
2. Use high-contrast colors
3. Enable legends and titles for context
4. Test printing before deployment

### Integration with UI Buttons

**Example: Print button in toolbar**
```cshtml
<div class="toolbar">
    <button class="btn btn-primary" onclick="document.getElementById('chartContainer').ej2_instances[0].print()">
        <i class="fa fa-print"></i> Print
    </button>
</div>

<ejs-circularchart3d id="chartContainer" title="Market Analysis" tilt="-45">
    <!-- Chart configuration -->
</ejs-circularchart3d>
```

## Exporting

The rendered 3D circular chart(pie/donut) can be exported to various image and document formats using the `Export` and `PdfExport` methods. To enable exporting, set `enableExport` as `true` on the root `<ejs-circularchart3d>` component.

### Export Methods

1. **export** method - For image formats (JPEG, PNG, SVG)
2. **pdfExport** method - For PDF format

### Export Method Signature

```javascript
// Image export
export(type, fileName)

// PDF export
pdfExport(fileName)
```

**Parameters:**
- `type` - Export format (JPEG, PNG, or SVG)
- `fileName` - Name of the exported file (without extension; added automatically)

### Basic Export Implementation

```cshtml
<div>
    <button onclick="exportChart()">Export Chart</button>
</div>

<ejs-circularchart3d id="chartContainer" title="Sales Distribution" enableExport="true" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>

<script>
function exportChart() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.circularChartExport3DModule.export("PNG", "sales-chart");
}
</script>
```

## Export Formats

### JPEG Export

JPEG provides good compression and is widely supported for image sharing.

```cshtml
<button onclick="exportAsJPEG()">Export as JPEG</button>

<script>
function exportAsJPEG() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.circularChartExport3DModule.export("JPEG", "sales-chart");
    // Downloads: sales-chart.jpeg
}
</script>
```

**Characteristics:**
- Lossy compression (file size smaller)
- Best for photos and complex images
- File extension: `.jpeg` or `.jpg`

**Use when:**
- File size is critical
- Image quality trade-off is acceptable
- Sharing via email or web

### PNG Export

PNG provides lossless compression with support for transparency.

```cshtml
<button onclick="exportAsPNG()">Export as PNG</button>

<script>
function exportAsPNG() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.circularChartExport3DModule.export("PNG", "sales-chart");
    // Downloads: sales-chart.png
}
</script>
```

**Characteristics:**
- Lossless compression (higher quality)
- Larger file size than JPEG
- Supports transparency
- File extension: `.png`

**Use when:**
- Quality is critical
- Need transparency support
- Editing may be necessary later

### SVG Export

SVG (Scalable Vector Graphics) is a vector format that scales without quality loss.

```cshtml
<button onclick="exportAsSVG()">Export as SVG</button>

<script>
function exportAsSVG() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.circularChartExport3DModule.export("SVG", "sales-chart");
    // Downloads: sales-chart.svg
}
</script>
```

**Characteristics:**
- Vector format (scalable without quality loss)
- Text remains editable in vector editors
- Smaller file size for simple graphics
- File extension: `.svg`

**Use when:**
- Need to scale for different sizes
- Future editing in design tools is likely
- Need smallest file size for simple charts

### PDF Export

Export the chart directly to PDF format for professional reports and documentation.

```cshtml
<button onclick="exportAsPDF()">Export as PDF</button>

<script>
function exportAsPDF() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.circularChartExport3DModule.pdfExport("sales-report");
    // Downloads: sales-report.pdf
}
</script>
```

**Characteristics:**
- Professional document format
- Widely accepted for reports
- Maintains formatting and appearance
- File extension: `.pdf`

**Use when:**
- Creating formal reports
- Need to include multiple pages
- Sharing with non-technical users
- Archiving for compliance

### PDF Export with Options

For more control over PDF export, you can specify additional parameters (if supported by your Syncfusion version):

```javascript
var chart = document.getElementById("chartContainer").ej2_instances[0];
chart.circularChartExport3DModule.pdfExport("annual-report", "Portrait");  // Portrait or Landscape
```

## Implementation Examples

### Example 1: Multiple Export Buttons

**View:**
```cshtml
<div class="export-toolbar">
    <button class="export-btn" onclick="exportChart('PNG')">📥 PNG</button>
    <button class="export-btn" onclick="exportChart('JPEG')">📥 JPEG</button>
    <button class="export-btn" onclick="exportChart('SVG')">📥 SVG</button>
    <button class="export-btn" onclick="exportChart('PDF')">📥 PDF</button>
    <button class="export-btn" onclick="printChart()">🖨️ Print</button>
</div>

<ejs-circularchart3d id="chartContainer" title="Q4 Analysis" enableExport="true" tilt="-45">
    <e-circularchart3d-legendsettings visible="true">
    </e-circularchart3d-legendsettings>
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Category" yName="Value">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>

<script>
function exportChart(format) {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    var fileName = "chart-" + new Date().toISOString().split('T')[0];
    
    if (format === 'PDF') {
        chart.circularChartExport3DModule.pdfExport(fileName);
    } else {
        chart.circularChartExport3DModule.export(format, fileName);
    }
}

function printChart() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    chart.print();
}
</script>

<style>
.export-toolbar {
    margin-bottom: 20px;
}
.export-btn {
    padding: 8px 16px;
    margin-right: 8px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}
.export-btn:hover {
    background-color: #0056b3;
}
</style>
```

### Example 2: Export with Dynamic Filename

```javascript
function exportWithTimestamp(format) {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    
    // Generate filename with date and time
    var now = new Date();
    var timestamp = now.getFullYear() + 
                   (now.getMonth() + 1).toString().padStart(2, '0') +
                   now.getDate().toString().padStart(2, '0') + '_' +
                   now.getHours().toString().padStart(2, '0') +
                   now.getMinutes().toString().padStart(2, '0');
    
    var fileName = "sales-chart_" + timestamp;
    
    if (format === 'PDF') {
        chart.circularChartExport3DModule.pdfExport(fileName);
    } else {
        chart.circularChartExport3DModule.export(format, fileName);
    }
}
```

### Example 3: Export in Server-side Button Click

**View:**
```cshtml
<button onclick="@ViewBag.OnExportClick" class="btn btn-primary">Export Chart</button>

<ejs-circularchart3d id="chartContainer" title="Performance Metrics" enableExport="true" tilt="-45">
    <e-circularchart3d-series-collection>
        <e-circularchart3d-series dataSource="@chartData" xName="Metric" yName="Score">
        </e-circularchart3d-series>
    </e-circularchart3d-series-collection>
</ejs-circularchart3d>
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.OnExportClick = new HtmlString(@"
        function() {
            var chart = document.getElementById('chartContainer').ej2_instances[0];
            chart.circularChartExport3DModule.export('PNG', 'performance-chart');
        }
    ");
    return View();
}
```

## Common Patterns

### Pattern 1: Smart Export Selection

```javascript
function smartExport() {
    // Let user choose format
    var format = prompt("Choose format:\n1. PNG (Best quality)\n2. JPEG (Smaller size)\n3. SVG (Scalable)\n4. PDF (Report)");
    
    var formatMap = {
        "1": "PNG",
        "2": "JPEG",
        "3": "SVG",
        "4": "PDF"
    };
    
    var selectedFormat = formatMap[format];
    if (selectedFormat) {
        var chart = document.getElementById("chartContainer").ej2_instances[0];
        if (selectedFormat === "PDF") {
            chart.circularChartExport3DModule.pdfExport("chart");
        } else {
            chart.circularChartExport3DModule.export(selectedFormat, "chart");
        }
    }
}
```

### Pattern 2: Export on Report Generation

```cshtml
// Generate report with exported chart
<button onclick="generateReport()">Generate Report</button>

<script>
function generateReport() {
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    
    // Export chart
    chart.circularChartExport3DModule.export("PNG", "chart-for-report");
    
    // Then generate report
    setTimeout(() => {
        // Call server to create report with exported chart
        fetch('/api/reports/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chartFileName: 'chart-for-report.png' })
        })
        .then(response => response.blob())
        .then(blob => {
            // Download report
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'report.pdf';
            a.click();
        });
    }, 500);
}
</script>
```

### Pattern 3: Format-Specific Export

```javascript
var exportConfig = {
    'quick-share': { format: 'PNG', quality: 'medium' },
    'email': { format: 'JPEG', quality: 'medium' },
    'print': { format: 'SVG', quality: 'high' },
    'report': { format: 'PDF', quality: 'high' }
};

function exportChart(purpose) {
    var config = exportConfig[purpose];
    var chart = document.getElementById("chartContainer").ej2_instances[0];
    
    if (config.format === 'PDF') {
        chart.circularChartExport3DModule.pdfExport('chart-' + purpose);
    } else {
        chart.circularChartExport3DModule.export(config.format, 'chart-' + purpose);
    }
}

// Usage
exportChart('email');  // Exports as JPEG
exportChart('report'); // Exports as PDF
```

## Best Practices

1. **Format Selection**
   - PNG for best quality and general use
   - JPEG for smaller file size
   - SVG for scalable/editable charts
   - PDF for professional reports

2. **Filename Management**
   - Include date/timestamp for versioning
   - Use descriptive names (e.g., "sales-chart-2024-01-15")
   - Avoid special characters
   - Keep names under 255 characters

3. **User Experience**
   - Provide multiple export options
   - Show export progress for large charts
   - Handle export failures gracefully
   - Disable buttons during export

4. **Performance**
   - Avoid exporting too many charts simultaneously
   - Use appropriate delays between multiple exports
   - Consider server-side export for large batches
   - Clean up downloaded files regularly

5. **Security**
   - Validate export requests
   - Control which users can export
   - Log export activities for compliance
   - Protect sensitive data in exports

6. **Quality Assurance**
   - Test exports in different browsers
   - Verify file opening in various applications
   - Check print output quality
   - Test with different data sizes
