# Print and Export Functionality

## Table of Contents
- [Overview](#overview)
- [Export to Image](#export-to-image)
- [Export to SVG](#export-to-svg)
- [Print Functionality](#print-functionality)
- [Export Configuration](#export-configuration)
- [Common Scenarios](#common-scenarios)

## Overview

The 3D Chart control provides built-in functionality to export charts as images or SVG files and print them. This is useful for:

- Generating reports
- Sharing charts with stakeholders
- Creating presentations
- Archiving visualizations
- Including charts in documents

## Export to Image

Export charts to PNG format for use in documents, emails, and presentations.

### Basic PNG Export

```csharp
@Html.EJS().Chart("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Month")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
            .Add();
    })
    .Render()

<button onclick="exportToPNG()">Export as PNG</button>

<script type="text/javascript">
function exportToPNG() {
    var chartInstance = document.getElementById("container").ej2_instances[0];
    chartInstance.export(Syncfusion.EJ2.Charts.ExportType.PNG, "chart");
}
</script>
```

### Export with Custom Filename

```html
<button onclick="exportChart()">Export Chart</button>

<script type="text/javascript">
function exportChart() {
    var chartInstance = document.getElementById("container").ej2_instances[0];
    chartInstance.export(Syncfusion.EJ2.Charts.ExportType.PNG, "sales_chart");
    // Downloads as: sales_chart.png
}
</script>
```

### Export Multiple Charts

```html
<div id="chart1"></div>
<div id="chart2"></div>

<button onclick="exportAllCharts()">Export All Charts</button>

<script type="text/javascript">
function exportAllCharts() {
    var chart1 = document.getElementById("chart1").ej2_instances[0];
    var chart2 = document.getElementById("chart2").ej2_instances[0];
    
    chart1.export(Syncfusion.EJ2.Charts.ExportType.PNG, "chart_1");
    chart2.export(Syncfusion.EJ2.Charts.ExportType.PNG, "chart_2");
}
</script>
```

## Export to SVG

Export charts as SVG (Scalable Vector Graphics) for unlimited scaling without quality loss.

### Basic SVG Export

```csharp
<button onclick="exportToSVG()">Export as SVG</button>

<script type="text/javascript">
function exportToSVG() {
    var chartInstance = document.getElementById("container").ej2_instances[0];
    chartInstance.export(Syncfusion.EJ2.Charts.ExportType.SVG, "chart");
}
</script>
```

### SVG vs PNG Comparison

**PNG Export:**
- Raster format
- Fixed resolution
- Smaller file size
- Good for web and email

**SVG Export:**
- Vector format
- Scales infinitely
- Larger file size
- Best for professional printing
- Editable in design tools

```html
<div>
    <button onclick="exportPNG()">Export PNG</button>
    <button onclick="exportSVG()">Export SVG</button>
</div>

<script type="text/javascript">
function exportPNG() {
    var chart = document.getElementById("container").ej2_instances[0];
    chart.export(Syncfusion.EJ2.Charts.ExportType.PNG, "chart");
}

function exportSVG() {
    var chart = document.getElementById("container").ej2_instances[0];
    chart.export(Syncfusion.EJ2.Charts.ExportType.SVG, "chart");
}
</script>
```

## Print Functionality

Print charts directly from the browser with proper formatting.

### Basic Print

```html
<button onclick="printChart()">Print Chart</button>

<script type="text/javascript">
function printChart() {
    var chartInstance = document.getElementById("container").ej2_instances[0];
    chartInstance.print();
}
</script>
```

### Print with Title and Legend

The print function automatically includes chart title, legend, and all configurations.

```html
<button onclick="printFullReport()">Print Report</button>

<script type="text/javascript">
function printFullReport() {
    var chartInstance = document.getElementById("container").ej2_instances[0];
    chartInstance.print();
    // Prints:
    // - Chart title
    // - Legend
    // - All series
    // - Current styling
}
</script>
```

### Print Multiple Elements

Print chart with surrounding content:

```html
<div id="report-section">
    <h1>Sales Report 2024</h1>
    <p>Q1-Q4 Performance Analysis</p>
    <div id="container"></div>
    <table>
        <tr><th>Quarter</th><th>Sales</th></tr>
        <tr><td>Q1</td><td>$50K</td></tr>
    </table>
</div>

<button onclick="printReport()">Print Full Report</button>

<script type="text/javascript">
function printReport() {
    var printContent = document.getElementById("report-section").innerHTML;
    var printWindow = window.open('', '', 'height=800,width=900');
    printWindow.document.write('<html><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
</script>
```

## Export Configuration

### Controller Method for Export

Handle exports server-side with additional processing:

```csharp
[HttpPost]
public ActionResult ExportChart(string format)
{
    // Prepare chart data
    var data = GetChartData();
    
    if (format == "png")
    {
        // Process PNG export
        byte[] imageBytes = ConvertChartToPNG(data);
        return File(imageBytes, "image/png", "chart.png");
    }
    else if (format == "svg")
    {
        // Process SVG export
        string svgContent = ConvertChartToSVG(data);
        return File(Encoding.UTF8.GetBytes(svgContent), 
                   "image/svg+xml", "chart.svg");
    }
    
    return new HttpStatusCodeResult(400);
}

private byte[] ConvertChartToPNG(List<ChartData> data)
{
    // Chart conversion logic
    // ... implementation
    return imageBytes;
}

private string ConvertChartToSVG(List<ChartData> data)
{
    // Chart conversion logic
    // ... implementation
    return svgContent;
}
```

### View with Export Button

```html
<div id="chart-container">
    @Html.EJS().Chart("container")
        .Series(series =>
        {
            series.DataSource((IEnumerable<object>)Model)
                .XName("Month")
                .YName("Sales")
                .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                .Add();
        })
        .Render()
</div>

<div class="export-buttons">
    <button onclick="exportChart('png')" class="btn btn-primary">
        <i class="icon-image"></i> Export PNG
    </button>
    <button onclick="exportChart('svg')" class="btn btn-primary">
        <i class="icon-vector"></i> Export SVG
    </button>
    <button onclick="printChart()" class="btn btn-secondary">
        <i class="icon-print"></i> Print
    </button>
</div>

<style>
.export-buttons {
    margin: 20px 0;
}

.export-buttons button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.export-buttons button:hover {
    background-color: #005a9e;
}
</style>

<script type="text/javascript">
function exportChart(format) {
    var chart = document.getElementById("container").ej2_instances[0];
    if (format === 'png') {
        chart.export(Syncfusion.EJ2.Charts.ExportType.PNG, 'chart');
    } else if (format === 'svg') {
        chart.export(Syncfusion.EJ2.Charts.ExportType.SVG, 'chart');
    }
}

function printChart() {
    var chart = document.getElementById("container").ej2_instances[0];
    chart.print();
}
</script>
```

## Common Scenarios

### Scenario 1: Download Chart from Dashboard

```csharp
<div class="dashboard-widget">
    <h3>Sales Overview</h3>
    <div id="chart-container">
        @Html.EJS().Chart("container")
            .Series(series =>
            {
                series.DataSource((IEnumerable<object>)Model)
                    .XName("Month")
                    .YName("Sales")
                    .Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
                    .Add();
            })
            .Render()
    </div>
    <button onclick="downloadChart()">Download</button>
</div>

<script type="text/javascript">
function downloadChart() {
    var chart = document.getElementById("container").ej2_instances[0];
    chart.export(Syncfusion.EJ2.Charts.ExportType.PNG, 'sales_chart');
}
</script>
```

### Scenario 2: Generate Report with Multiple Charts

```html
<div id="report">
    <h1>Annual Report 2024</h1>
    
    <h2>Q1 Analysis</h2>
    <div id="chart1"></div>
    
    <h2>Q2 Analysis</h2>
    <div id="chart2"></div>
    
    <button onclick="generateReport()">Generate PDF Report</button>
</div>

<script type="text/javascript">
function generateReport() {
    // Export charts
    var chart1 = document.getElementById("chart1").ej2_instances[0];
    var chart2 = document.getElementById("chart2").ej2_instances[0];
    
    chart1.export(Syncfusion.EJ2.Charts.ExportType.PNG, 'q1_chart');
    chart2.export(Syncfusion.EJ2.Charts.ExportType.PNG, 'q2_chart');
    
    // In production, use a PDF library to combine images
}
</script>
```

### Scenario 3: Print with Custom Formatting

```html
<button onclick="printWithCustomFormat()">Print Formatted</button>

<script type="text/javascript">
function printWithCustomFormat() {
    var chart = document.getElementById("container").ej2_instances[0];
    
    // Create print window
    var printWindow = window.open('', '', 'height=600,width=800');
    
    // Add CSS for printing
    printWindow.document.write('<html><head>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; }');
    printWindow.document.write('h1 { text-align: center; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    
    // Add content
    printWindow.document.write('<h1>Sales Report</h1>');
    printWindow.document.write('<p>Generated: ' + new Date().toLocaleDateString() + '</p>');
    
    // Close and print
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
</script>
```

### Scenario 4: Scheduled Export

```csharp
public class ChartExportService
{
    public void ScheduleExport()
    {
        // Export chart daily
        var timer = new System.Timers.Timer(24 * 60 * 60 * 1000); // 24 hours
        timer.Elapsed += (sender, e) => ExportChartDaily();
        timer.Start();
    }
    
    private void ExportChartDaily()
    {
        var data = GetChartData();
        var filename = $"chart_{DateTime.Now:yyyy-MM-dd}.png";
        
        // Save to server
        // ... save logic
    }
}
```

## Export Best Practices

1. **Format Selection**: Use PNG for web/email, SVG for printing
2. **Filename Conventions**: Use descriptive names with dates
3. **Error Handling**: Check for export failures
4. **User Feedback**: Show success/error messages
5. **Performance**: Consider chart complexity when exporting
6. **Resolution**: Ensure exported images are readable
7. **Styling**: Verify print styles match screen appearance

Export and print functionality makes charts shareable, archivable, and suitable for professional reports and presentations.
