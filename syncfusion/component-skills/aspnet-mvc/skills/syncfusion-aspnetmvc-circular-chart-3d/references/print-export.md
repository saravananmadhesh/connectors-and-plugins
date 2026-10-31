# Printing and Exporting Charts

## Table of Contents
- [Export Overview](#export-overview)
- [Export Methods](#export-methods)
- [PNG Export](#png-export)
- [SVG Export](#svg-export)
- [PDF Export](#pdf-export)
- [Print Functionality](#print-functionality)
- [Advanced Export Options](#advanced-export-options)
- [User Interface Integration](#user-interface-integration)

## Export Overview

Export and print capabilities allow users to:
- Save charts as images
- Generate reports
- Share visualizations
- Archive data snapshots
- Support offline access

Syncfusion charts support multiple export formats and print options.

## Export Methods

### Available Export Formats

| Format | Type | Use Case |
|--------|------|----------|
| PNG | Raster | Web sharing, email |
| SVG | Vector | Print, editing, scaling |
| PDF | Document | Reports, archival |

### Default Export Button

Enable export toolbar:

```csharp
@Html.EJS().CircularChart3D("container")
    .Export(export =>
    {
        export.Type(new List<Syncfusion.EJ2.Charts.ExportType> 
        { 
            Syncfusion.EJ2.Charts.ExportType.PNG 
        });
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

## PNG Export

### Basic PNG Export

Export as PNG image:

```csharp
@Html.EJS().CircularChart3D("container")
    .Export(export =>
    {
        export.Type(new List<Syncfusion.EJ2.Charts.ExportType>
        {
            Syncfusion.EJ2.Charts.ExportType.PNG
        });
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### PNG with Custom Filename

```csharp
<script>
    function exportChart() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.export('PNG', 'SalesChart');
    }
</script>

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()

<button onclick="exportChart()">Export as PNG</button>
```

### PNG Export with Dimensions

```csharp
<script>
    function exportChartWithDimensions() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.export('PNG', 'Chart', null, false, new Syncfusion.EJ2.Charts.ImageExportSettings({
            type: 'PNG',
            width: 1000,
            height: 800
        }));
    }
</script>
```

## SVG Export

### Basic SVG Export

Export as scalable vector graphics:

```csharp
@Html.EJS().CircularChart3D("container")
    .Export(export =>
    {
        export.Type(new List<Syncfusion.EJ2.Charts.ExportType>
        {
            Syncfusion.EJ2.Charts.ExportType.SVG
        });
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### SVG for Print

SVG maintains quality at any scale:

```csharp
<script>
    function exportForPrint() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.export('SVG', 'PrintChart');
    }
</script>

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()

<button onclick="exportForPrint()">Export as SVG</button>
```

## PDF Export

### PDF Export Methods

Syncfusion charts export to PDF (requires additional library):

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Export via JavaScript

```csharp
<script>
    function exportToPDF() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        // First export as PNG, then convert to PDF
        var svgData = chartObject.svgExport();
        // Process with PDF library
    }
</script>
```

## Print Functionality

### Enable Print Button

```csharp
@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()

<script>
    function printChart() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.print();
    }
</script>

<button onclick="printChart()">Print Chart</button>
```

### Print with Custom Title

```csharp
<script>
    function printWithTitle() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        // Add title before printing
        var originalTitle = chartObject.title;
        chartObject.title = "Sales Report - Q1 2024";
        chartObject.print();
        chartObject.title = originalTitle;
    }
</script>
```

### Print Multiple Charts

```csharp
<script>
    function printDashboard() {
        var charts = [
            document.getElementById("chart1").ej2_instances[0],
            document.getElementById("chart2").ej2_instances[0],
            document.getElementById("chart3").ej2_instances[0]
        ];
        
        charts.forEach(function(chart) {
            chart.print();
        });
    }
</script>
```

## Advanced Export Options

### Export with Orientation

```csharp
<script>
    function exportPortrait() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.export('PNG', 'Chart', null, false, {
            type: 'PNG',
            orientation: 'Portrait'
        });
    }
    
    function exportLandscape() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        chartObject.export('PNG', 'Chart', null, false, {
            type: 'PNG',
            orientation: 'Landscape'
        });
    }
</script>
```

### Export with Custom Settings

```csharp
<script>
    function exportWithSettings() {
        var chartObject = document.getElementById("container").ej2_instances[0];
        var settings = {
            type: 'PNG',
            width: 1200,
            height: 800,
            backgroundColor: '#ffffff'
        };
        chartObject.export('PNG', 'CustomChart', null, false, settings);
    }
</script>
```

### Bulk Export

Export multiple charts in sequence:

```csharp
<script>
    function bulkExportCharts() {
        var chartIds = ['chart1', 'chart2', 'chart3'];
        var timestamp = new Date().getTime();
        
        chartIds.forEach(function(chartId, index) {
            var chart = document.getElementById(chartId).ej2_instances[0];
            var filename = 'Chart_' + timestamp + '_' + (index + 1);
            chart.export('PNG', filename);
        });
    }
</script>
```

## User Interface Integration

### Export Buttons in Toolbar

```csharp
<div class="chart-toolbar">
    <button class="btn btn-primary" onclick="exportPNG()">
        <span class="icon">📥</span> Export PNG
    </button>
    <button class="btn btn-primary" onclick="exportSVG()">
        <span class="icon">📥</span> Export SVG
    </button>
    <button class="btn btn-primary" onclick="printChart()">
        <span class="icon">🖨️</span> Print
    </button>
</div>

@Html.EJS().CircularChart3D("container")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()

<script>
    function exportPNG() {
        document.getElementById("container").ej2_instances[0].export('PNG', 'Chart');
    }
    
    function exportSVG() {
        document.getElementById("container").ej2_instances[0].export('SVG', 'Chart');
    }
    
    function printChart() {
        document.getElementById("container").ej2_instances[0].print();
    }
</script>
```

### Export with Dropdown Menu

```csharp
<div class="export-menu">
    <button class="btn dropdown-toggle" data-toggle="dropdown">
        Export <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <a href="#" onclick="exportFormat('PNG')">PNG Image</a>
        <a href="#" onclick="exportFormat('SVG')">SVG Vector</a>
        <a href="#" onclick="printChart()">Print</a>
    </div>
</div>

<script>
    function exportFormat(format) {
        var chart = document.getElementById("container").ej2_instances[0];
        chart.export(format, 'Chart');
        return false;
    }
    
    function printChart() {
        document.getElementById("container").ej2_instances[0].print();
        return false;
    }
</script>
```

### Export with Progress Indicator

```csharp
<script>
    function exportWithProgress(format) {
        var chart = document.getElementById("container").ej2_instances[0];
        var progressBar = document.getElementById("progress");
        
        progressBar.style.display = 'block';
        progressBar.style.width = '0%';
        
        // Simulate progress
        var progress = 0;
        var interval = setInterval(function() {
            progress += Math.random() * 30;
            if (progress > 90) progress = 90;
            progressBar.style.width = progress + '%';
        }, 100);
        
        // Export chart
        setTimeout(function() {
            chart.export(format, 'Chart');
            clearInterval(interval);
            progressBar.style.width = '100%';
            setTimeout(function() {
                progressBar.style.display = 'none';
            }, 500);
        }, 1000);
    }
</script>
```

## Complete Export Example

Comprehensive example with all export options:

```csharp
<div class="chart-container">
    <div class="chart-controls">
        <button onclick="exportChart('PNG')" class="btn btn-sm">Export PNG</button>
        <button onclick="exportChart('SVG')" class="btn btn-sm">Export SVG</button>
        <button onclick="printChart()" class="btn btn-sm">Print</button>
    </div>
    
    @Html.EJS().CircularChart3D("container")
        .Width("100%")
        .Height("500px")
        .Title("Sales Distribution")
        .Series(series =>
        {
            series.DataSource((IEnumerable<object>)Model)
                .XName("Category")
                .YName("Sales")
                .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
                .Add();
        })
        .Legend(legend => legend.Visible(true))
        .Tooltip(tooltip =>
        {
            tooltip.Enable(true);
            tooltip.Format("{point.x}: {point.y}");
        })
        .Render()
</div>

<script>
    function exportChart(format) {
        var chart = document.getElementById("container").ej2_instances[0];
        var timestamp = new Date().toISOString().slice(0, 10);
        var filename = 'SalesChart_' + timestamp;
        chart.export(format, filename);
    }
    
    function printChart() {
        var chart = document.getElementById("container").ej2_instances[0];
        chart.print();
    }
</script>
```

## Best Practices for Export/Print

1. **Filename Convention**: Use descriptive, timestamped filenames
2. **Format Selection**: Choose SVG for quality, PNG for web
3. **User Feedback**: Show progress for large exports
4. **Performance**: Handle large charts efficiently
5. **Resolution**: Set appropriate dimensions for export
6. **Branding**: Include headers/footers when printing
7. **Error Handling**: Handle export failures gracefully
8. **Accessibility**: Ensure exported content is readable

## Export Considerations

| Aspect | PNG | SVG | Print |
|--------|-----|-----|-------|
| File Size | Medium | Small | N/A |
| Quality | High | Excellent | Excellent |
| Editing | Limited | Easy | Yes |
| Compatibility | Universal | Good | Good |
| Performance | Fast | Fast | Fast |

## Troubleshooting Export/Print

**Export button not working?**
- Check chart instance is initialized
- Verify export method is accessible
- Review browser console for errors

**Image quality poor?**
- Increase export dimensions
- Use SVG for vector quality
- Check background settings

**Print formatting issues?**
- Set print dimensions
- Configure page margins
- Use CSS for print styling

Export and print capabilities extend chart utility beyond screen display, supporting reporting and archival needs.
