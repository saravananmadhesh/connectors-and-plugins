# Print and Export

The Sankey Chart provides comprehensive print and export functionality, enabling users to generate static files in multiple formats (PNG, JPEG, SVG, PDF) or print the diagram directly. This is useful for reports, documentation, sharing, and offline access. All print and export functionality is self-contained and independent of styling or event handling.

## Table of Contents
- [Print Functionality](#print-functionality)
    - [Basic Print Example](#basic-print-example)
    - [Print with Custom Options](#print-with-custom-options)
    - [Keyboard Shortcut for Print](#keyboard-shortcut-for-print)
- [Export Formats](#export-formats)
    - [Supported Export Formats](#supported-export-formats)
- [Export with Default Settings](#export-with-default-settings)
    - [Export as PNG](#export-as-png)
    - [Export as JPEG](#export-as-jpeg)
    - [Export as SVG](#export-as-svg)
    - [Export as PDF](#export-as-pdf)
- [Export with Custom Options](#export-with-custom-options)
    - [Custom Filename and Format](#custom-filename-and-format)
    - [Multi-Format Export Buttons](#multi-format-export-buttons)
- [Before Export Event](#before-export-event)
    - [Add Watermark on Export](#add-watermark-on-export)
- [Export Completed Event](#export-completed-event)
    - [Show Success Message](#show-success-message)
- [Export Scenarios](#export-scenarios)
    - [Scenario 1: Report Generation](#scenario-1-report-generation)
    - [Scenario 2: Share on Social Media](#scenario-2-share-on-social-media)
    - [Scenario 3: Print to PDF](#scenario-3-print-to-pdf)
    - [Scenario 4: Archive Export](#scenario-4-archive-export)
- [Format Comparison](#format-comparison)
    - [PNG vs JPEG](#png-vs-jpeg)
    - [SVG vs PDF](#svg-vs-pdf)
- [Complete Export Example](#complete-export-example)
    - [Full Export Interface](#full-export-interface)
- [Best Practices](#best-practices)
    - [Format Selection](#format-selection)
    - [Performance](#performance)
    - [Quality Considerations](#quality-considerations)
    - [User Experience](#user-experience)
    - [Accessibility](#accessibility)

## Print Functionality

Print the Sankey Chart directly to paper or PDF using the `print()` method. This opens the browser's print dialog, allowing users to select printer settings and output format:

### Basic Print Example

```html
<button onclick="printSankey()">Print Chart</button>

<ejs-sankey id="container"
                 width="100%"
                 height="420px">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
    function printSankey() {
        let chartObj = document.getElementById('container').ej2_instances[0];
        chartObj.print();
    }
</script>
```

### Print with Custom Options

```html
<script>
function printWithOptions() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    
    // Print to specific printer or settings
    chartObj.print();  // Opens browser print dialog
}
</script>
```

### Keyboard Shortcut for Print

```html
<script>
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        let chartObj = document.getElementById('container').ej2_instances[0];
        chartObj.print();
    }
});
</script>
```

**Result:** Users can press Ctrl+P to print the chart.

## Export Formats

Export the Sankey Chart to various file formats using the `export()` method. This allows you to generate standalone files suitable for sharing, archiving, or embedding in documents.

### Supported Export Formats

| Format | File Type | Use Case | Quality |
|--------|-----------|----------|---------|
| PNG | Raster (.png) | Web sharing, presentations | Good (lossy compression) |
| JPEG | Raster (.jpg) | Email, web images | Good (smaller file size) |
| SVG | Vector (.svg) | Scalable, print-ready | Excellent (scalable) |
| PDF | Document (.pdf) | Reports, archival | Excellent (scalable) |

## Export with Default Settings

Export the chart using default settings with an auto-generated filename:

```html
<button onclick="exportSankey()">Export Chart</button>

<ejs-sankey id="container"
                 width="100%"
                 height="420px">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
    function exportSankey() {
        let chartObj = document.getElementById('container').ej2_instances[0];
        chartObj.export('PNG', 'SankeyChart');  // Exports as SankeyChart.png
    }
</script>
```

### Export as PNG

```html
<button onclick="exportPNG()">Export as PNG</button>

<script>
function exportPNG() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    chartObj.export('PNG', 'sankey-diagram');  // Exports as sankey-diagram.png
}
</script>
```

### Export as JPEG

```html
<button onclick="exportJPEG()">Export as JPEG</button>

<script>
function exportJPEG() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    chartObj.export('JPEG', 'sankey-diagram');  // Exports as sankey-diagram.jpg
}
</script>
```

### Export as SVG

```html
<button onclick="exportSVG()">Export as SVG</button>

<script>
function exportSVG() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    chartObj.export('SVG', 'sankey-diagram');  // Exports as sankey-diagram.svg
}
</script>
```

SVG files are scalable and perfect for printing or further editing in design software.

### Export as PDF

```html
<button onclick="exportPDF()">Export as PDF</button>

<script>
function exportPDF() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    chartObj.export('PDF', 'sankey-diagram');  // Exports as sankey-diagram.pdf
}
</script>
```

## Export with Custom Options

Export the chart with a custom filename and format selection to control output file names and type:

### Custom Filename and Format

```html
<select id="formatSelect">
    <option value="PNG">PNG</option>
    <option value="JPEG">JPEG</option>
    <option value="SVG">SVG</option>
    <option value="PDF">PDF</option>
</select>

<input type="text" id="filename" placeholder="Enter filename">

<button onclick="exportWithOptions()">Export</button>

<script>
function exportWithOptions() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    let format = document.getElementById('formatSelect').value;
    let filename = document.getElementById('filename').value || 'sankey-chart';
    
    chartObj.export(format, filename);
}
</script>
```

### Multi-Format Export Buttons

```html
<div class="export-buttons">
    <button onclick="quickExport('PNG')">Quick Export (PNG)</button>
    <button onclick="quickExport('JPEG')">Export as JPEG</button>
    <button onclick="quickExport('SVG')">Export as SVG</button>
    <button onclick="quickExport('PDF')">Export as PDF</button>
</div>

<script>
function quickExport(format) {
    let chartObj = document.getElementById('container').ej2_instances[0];
    let timestamp = new Date().toISOString().slice(0, 10);
    chartObj.export(format, 'sankey-' + timestamp);
}
</script>
```

## Before Export Event

Use the `BeforeExport` event to customize the export process before the file is generated. This allows you to modify chart properties, add watermarks, or perform pre-export calculations:

```html
<ejs-sankey id="container"
                 width="100%"
                 height="420px"
                 beforeExport="onBeforeExport">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>


<script>
function onBeforeExport(args) {
    console.log('Export starting with format: ' + args.type);
    // Pre-export customization
    if (args.type === 'PDF') {
        // Adjust for PDF if needed
    }
}
</script>
```

### Add Watermark on Export

```html
<script>
function onBeforeExport(args) {
    // Temporarily add watermark
    let chartElement = document.getElementById('container');
    chartElement.style.opacity = '0.9';
    
    // Schedule watermark removal after export
    setTimeout(function() {
        chartElement.style.opacity = '1';
    }, 500);
}
</script>
```

## Export Completed Event

Handle the completion of export using the `ExportCompleted` event:

```html
<ejs-sankey id="container"
                 width="100%"
                 height="420px"
                 exportCompleted="onExportCompleted">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onExportCompleted(args) {
    console.log('Export completed');
    showNotification('Chart exported successfully!');
}
</script>
```

### Show Success Message

```html
<script>
function onExportCompleted(args) {
    // Show user confirmation
    let message = document.getElementById('message');
    message.textContent = 'Export completed! File downloaded.';
    message.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(function() {
        message.style.display = 'none';
    }, 3000);
}
</script>
```

## Export Scenarios

### Scenario 1: Report Generation

```html
<button onclick="generateReport()">Generate Report</button>

<script>
function generateReport() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    
    // Prepare filename with date
    let today = new Date();
    let dateStr = today.getFullYear() + '-' + 
                  (today.getMonth() + 1) + '-' + 
                  today.getDate();
    
    // Export as PDF for professional reports
    chartObj.export('PDF', 'Sankey-Report-' + dateStr);
}
</script>
```

### Scenario 2: Share on Social Media

```html
<button onclick="exportForSharing()">Share Chart</button>

<script>
function exportForSharing() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    
    // PNG for web/social sharing
    chartObj.export('PNG', 'my-sankey-chart');
}
</script>
```

### Scenario 3: Print to PDF

```html
<button onclick="printToPDF()">Print to PDF</button>

<script>
function printToPDF() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    
    // Export as PDF for printing
    chartObj.export('PDF', 'sankey-print');
}
</script>
```

### Scenario 4: Archive Export

```html
<button onclick="archiveExport()">Archive</button>

<script>
function archiveExport() {
    let chartObj = document.getElementById('container').ej2_instances[0];
    
    // Export as SVG for long-term archival (scalable, future-proof)
    let timestamp = new Date().toISOString();
    chartObj.export('SVG', 'sankey-archive-' + timestamp);
}
</script>
```

## Format Comparison

### PNG vs JPEG

| Aspect | PNG | JPEG |
|--------|-----|------|
| Compression | Lossless | Lossy |
| File Size | Larger | Smaller |
| Transparency | Supported | Not supported |
| Quality | Excellent | Good |
| Use Case | Web, graphics | Photos, web |
| Editing | Easy | Possible |

### SVG vs PDF

| Aspect | SVG | PDF |
|--------|-----|-----|
| Type | Vector (XML) | Document format |
| Scalability | Infinite | High |
| Editability | Yes (text editor) | No (static) |
| Compatibility | All modern browsers | Universal |
| Use Case | Web, editing | Printing, archival |
| File Size | Medium | Medium-Large |

## Complete Export Example

### Full Export Interface

```html
<div class="export-panel">
    <h3>Export Sankey Chart</h3>

    <div class="form-group">
        <label for="filename">Filename:</label>
        <input type="text" id="filename" placeholder="sankey-chart">
    </div>

    <div class="form-group">
        <label for="format">Format:</label>
        <select id="format">
            <option value="PNG">PNG (Web, presentations)</option>
            <option value="JPEG">JPEG (Smaller file size)</option>
            <option value="SVG">SVG (Scalable, print-ready)</option>
            <option value="PDF">PDF (Documents, archival)</option>
        </select>
    </div>

    <div class="button-group">
        <button onclick="performExport()" class="btn-primary">Export</button>
        <button onclick="printChart()" class="btn-secondary">Print</button>
    </div>

    <div id="status-message"></div>
</div>

<ejs-sankey id="container"
                 width="100%"
                 height="600px"
                 beforeExport="onBeforeExport"
                 exportCompleted="onExportCompleted">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
    function performExport() {
        let chartObj = document.getElementById('container').ej2_instances[0];
        let filename = document.getElementById('filename').value || 'sankey-chart';
        let format = document.getElementById('format').value;

        updateStatus('Exporting as ' + format + '...');
        chartObj.export(format, filename);
    }

    function printChart() {
        let chartObj = document.getElementById('container').ej2_instances[0];
        chartObj.print();
    }

    function onBeforeExport(args) {
        updateStatus('Preparing export...');
    }

    function onExportCompleted(args) {
        updateStatus('Export completed successfully!');
        setTimeout(function() {
            updateStatus('');
        }, 3000);
    }

    function updateStatus(message) {
        document.getElementById('status-message').textContent = message;
    }
</script>

```

## Best Practices

### Format Selection

1. **PNG** - Default choice for most use cases (web, sharing)
2. **JPEG** - When file size matters (email, mobile)
3. **SVG** - For print-ready, professional documents
4. **PDF** - For formal reports, archival

### Performance

- Export operations can be slow for large/complex charts
- Provide user feedback (progress indicator, spinner)
- Consider server-side export for very large charts
- Cache exports for frequently requested formats

### Quality Considerations

- PNG: Good quality, reasonable file size (recommended)
- JPEG: Acceptable quality, smaller files but potential artifacts
- SVG: Perfect quality, scalable, best for printing
- PDF: Excellent for documents, professional appearance

### User Experience

- Provide clear export/print buttons
- Show status messages during export
- Include format descriptions/recommendations
- Allow custom filenames
- Test across browsers and devices

### Accessibility

- Ensure export buttons are keyboard accessible
- Provide alternative export methods
- Include aria-labels for export buttons
- Support screen reader announcements
