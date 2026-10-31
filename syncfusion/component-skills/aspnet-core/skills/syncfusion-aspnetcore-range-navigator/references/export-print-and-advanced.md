# Export, Print, and Advanced Features

## Table of Contents

- [Exporting RangeNavigator](#exporting-rangenavigator)
  - [Export Types](#export-types)
  - [Export Parameters](#export-parameters)
  - [Export Examples](#export-examples)
- [Print Functionality](#print-functionality)
  - [Print Output](#print-output)
- [API Migration from EJ1 to EJ2](#api-migration-from-ej1-to-ej2)
  - [Major Property Changes](#major-property-changes)
  - [Migration Example](#migration-example)
  - [Removed Features (EJ1 Only)](#removed-features-ej1-only)
- [Accessibility Standards](#accessibility-standards)
  - [WCAG 2.2 Level AA Compliance](#wcag-22-level-aa-compliance)
  - [Section 508 Compliance](#section-508-compliance)
  - [Screen Reader Support](#screen-reader-support)
- [Complete Example](#complete-example)
- [Common Use Cases](#common-use-cases)
  - [Use Case 1: Export for Report](#use-case-1-export-for-report)
  - [Use Case 2: Export for Web Sharing](#use-case-2-export-for-web-sharing)
  - [Use Case 3: Export for Edit (SVG)](#use-case-3-export-for-edit-svg)

## Exporting RangeNavigator

Export the rendered RangeNavigator to image or PDF formats using the `export()` method:

```cshtml
<!-- Export buttons -->
<button onclick="exportJPEG()">Export as JPEG</button>
<button onclick="exportPNG()">Export as PNG</button>
<button onclick="exportSVG()">Export as SVG</button>
<button onclick="exportPDF()">Export as PDF</button>

<!-- RangeNavigator -->
<ejs-rangenavigator id="rangeNavigator">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<script>
    function exportJPEG() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.export('JPEG', 'RangeNavigator');
    }
    
    function exportPNG() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.export('PNG', 'RangeNavigator');
    }
    
    function exportSVG() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.export('SVG', 'RangeNavigator');
    }
    
    function exportPDF() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.export('PDF', 'RangeNavigator');
    }
</script>
```

### Export Types

| Format | Best For | Size | Quality |
|--------|----------|------|---------|
| **JPEG** | Photos, web sharing | Small | Good |
| **PNG** | Web, transparency needed | Medium | Excellent |
| **SVG** | Scalable, editing | Large | Vector (lossless) |
| **PDF** | Reports, printing | Medium | Excellent for print |

### Export Parameters

```javascript
rangeObj.export(type, fileName, orientation, width, height);
```

**Parameters:**
- `type` - Export format: "JPEG", "PNG", "SVG", "PDF"
- `fileName` - Name for downloaded file (without extension)
- `orientation` (PDF only) - "Portrait" or "Landscape"
- `width` (optional) - Export width in pixels
- `height` (optional) - Export height in pixels

### Export Examples

**Export as JPEG (10MB limit):**

```javascript
function exportAsJPEG() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    rangeObj.export('JPEG', 'chart-export');
    // Downloads: chart-export.jpg
}
```

**Export as PNG (recommended):**

```javascript
function exportAsPNG() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    rangeObj.export('PNG', 'chart-export');
    // Downloads: chart-export.png
}
```

**Export as PDF with custom size:**

```javascript
function exportAsPDF() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    rangeObj.export('PDF', 'chart-report', 'Landscape', 1200, 600);
    // Downloads: chart-report.pdf (landscape, 1200x600px)
}
```

**Export as SVG (vector format):**

```javascript
function exportAsSVG() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    rangeObj.export('SVG', 'chart-vector');
    // Downloads: chart-vector.svg
}
```

## Print Functionality

Print the RangeNavigator directly from the browser using the `print()` method:

```cshtml
<!-- Print button -->
<button onclick="printRangeNavigator()">Print</button>

<!-- RangeNavigator -->
<ejs-rangenavigator id="rangeNavigator">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<script>
    function printRangeNavigator() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.print();
        // Opens browser print dialog
    }
</script>
```


### Print Output

- Opens native browser print dialog
- User selects printer and settings
- Outputs to paper or PDF writer
- Preserves styling and colors

## API Migration from EJ1 to EJ2

If migrating from Syncfusion Essential JS 1 (EJ1) to EJ2, note these property changes:

### Major Property Changes

| Feature | EJ1 Property | EJ2 Property | Example |
|---------|--------------|--------------|---------|
| Snapping | `allow-snapping` | `allowSnapping` | `allowSnapping="true"` |
| Animation | Not available | `animationDuration` | `animationDuration="500"` |
| Border | `e-border` | `e-rangenavigator-navigatorborder` | Nested tag |
| Data Source | `dataSource` | `dataSource` | Same |
| Deferred Update | `enable-deferred-update` | `enableDeferredUpdate` | `enableDeferredUpdate="true"` |
| Multi-level Labels | `e-lower-level` | `enableGrouping` | `enableGrouping="true"` |
| RTL | `enable-rtl` | `enableRtl` | `enableRtl="true"` |
| Interval | Via `e-value-axis-settings` | Direct property | `interval="1"` |
| Interval Type | `interval-type` (snake-case) | `intervalType` (camelCase) | `intervalType="Years"` |
| Label Format | Not available | `labelFormat` | `labelFormat="yMd"` |
| Label Position | Not available | `labelPosition` | `labelPosition="Inside"` |
| Label Intersect | Not available | `labelIntersectAction` | `labelIntersectAction="Hide"` |
| Tooltip Enable | `visible` | `enable` | `<e-rangenavigator-tooltip enable="true">` |
| Value Type | `value-type` | `valueType` | `valueType="DateTime"` |

### Migration Example

**EJ1 Code:**
```cshtml
<ej-range-navigator id="range" enable-rtl="true" value-type="DateTime">
    <e-series-settings>
        <e-series type="Area" x-name="x" y-name="y">
        </e-series>
    </e-series-settings>
</ej-range-navigator>
```

**EJ2 Code:**
```cshtml
<ejs-rangenavigator id="range" enableRtl="true" valueType="DateTime">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            type="Area" 
            xName="x" 
            yName="y">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Removed Features (EJ1 Only)

These EJ1 properties are not in EJ2:
- Scroll bar (`enable-scrollbar`)
- Auto resizing (`enable-auto-resizing`)
- Responsive mode (`is-responsive`)
- Scroll range settings
- Series settings container
- Range settings container

**Workaround:** Use CSS media queries and responsive containers instead.

## Accessibility Standards

The RangeNavigator is built to meet these accessibility standards:

### WCAG 2.2 Level AA Compliance

- AA color contrast ratio (4.5:1 for text)
- Screen reader compatible
- All interactive elements labeled

### Section 508 Compliance

- Accessible to federal employees and contractors
- PDF export is accessible
- No flashing/strobing effects

### Screen Reader Support

- Component has proper ARIA roles
- Range values announced when changed
- Tooltips read aloud
- Status updates announced

## Complete Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<ChartData> Data { get; set; }
    
    public void OnGet()
    {
        Data = GenerateData();
    }
    
    private List<ChartData> GenerateData()
    {
        var data = new List<ChartData>();
        for (int month = 1; month <= 12; month++)
        {
            data.Add(new ChartData
            {
                Date = new DateTime(2024, month, 1),
                Value = 25 + (month * 2)
            });
        }
        return data;
    }
}

public class ChartData
{
    public DateTime Date { get; set; }
    public double Value { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<h4>RangeNavigator with Export and Print</h4>

<!-- Action buttons -->
<div style="margin-bottom: 15px;">
    <button onclick="exportJPEG()" class="btn btn-primary">Export JPEG</button>
    <button onclick="exportPNG()" class="btn btn-primary">Export PNG</button>
    <button onclick="exportPDF()" class="btn btn-primary">Export PDF</button>
    <button onclick="exportSVG()" class="btn btn-primary">Export SVG</button>
    <button onclick="printChart()" class="btn btn-secondary">Print (Ctrl+P)</button>
</div>

<!-- RangeNavigator with full configuration -->
<ejs-rangenavigator 
    id="rangeNavigator" 
    valueType="DateTime" 
    theme="Bootstrap5">
    
    <!-- Tooltip -->
    <e-rangenavigator-tooltip enable="true" labelFormat="MMM dd, yyyy">
    </e-rangenavigator-tooltip>
    
    <!-- Series configuration -->
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="Date" 
            yName="Value" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<!-- Status message -->
<div id="exportStatus" style="margin-top: 15px; color: green;"></div>

<script>
    function getRangeObj() {
        return document.getElementById('rangeNavigator').ej2_instances[0];
    }
    
    function exportJPEG() {
        getRangeObj().export('JPEG', 'chart-data');
        showStatus('Exporting as JPEG...');
    }
    
    function exportPNG() {
        getRangeObj().export('PNG', 'chart-data');
        showStatus('Exporting as PNG...');
    }
    
    function exportPDF() {
        getRangeObj().export('PDF', 'chart-report', 'Landscape');
        showStatus('Exporting as PDF (Landscape)...');
    }
    
    function exportSVG() {
        getRangeObj().export('SVG', 'chart-vector');
        showStatus('Exporting as SVG...');
    }
    
    function printChart() {
        getRangeObj().print();
        showStatus('Print dialog opened...');
    }
    
    function showStatus(message) {
        var statusDiv = document.getElementById('exportStatus');
        statusDiv.innerText = message;
        setTimeout(function() {
            statusDiv.innerText = '';
        }, 2000);
    }
</script>

<style>
    button {
        padding: 8px 16px;
        margin-right: 5px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 14px;
    }
    
    .btn-primary {
        background-color: #0078D4;
        color: white;
    }
    
    .btn-primary:hover {
        background-color: #005A9E;
    }
    
    .btn-secondary {
        background-color: #6C757D;
        color: white;
    }
    
    .btn-secondary:hover {
        background-color: #5A6268;
    }
</style>
```

## Common Use Cases

### Use Case 1: Export for Report

```javascript
function exportForReport() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    // Export as PDF for email report
    rangeObj.export('PDF', 'monthly-report_' + new Date().toISOString(), 'Portrait', 800, 600);
}
```

### Use Case 2: Export for Web Sharing

```javascript
function exportForWeb() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    // Small PNG for web (faster loading)
    rangeObj.export('PNG', 'chart-preview');
}
```

### Use Case 3: Export for Edit (SVG)

```javascript
function exportForEdit() {
    var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
    // SVG can be edited in Illustrator or other tools
    rangeObj.export('SVG', 'chart-editable');
}
```
