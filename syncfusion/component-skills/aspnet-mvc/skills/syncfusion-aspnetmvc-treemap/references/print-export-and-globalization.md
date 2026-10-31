# Print, Export, and Globalization in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Print Functionality](#print-functionality)
- [Export to PDF](#export-to-pdf)
- [Export to Images](#export-to-images)
- [Export to SVG](#export-to-svg)
- [Export Configuration](#export-configuration)
- [Internationalization (i18n)](#internationalization-i18n)
- [Localization Examples](#localization-examples)
- [Troubleshooting](#troubleshooting)

## Overview

TreeMap supports printing and exporting to multiple formats (PDF, PNG, JPEG, SVG), and provides comprehensive internationalization support for multi-language applications. These features enable users to save, share, and localize TreeMap visualizations.

### Export and Print Features

| Feature | Format | Use Case |
|---------|--------|----------|
| **Print** | Native browser print | Quick output to paper |
| **PDF Export** | PDF document | Archival, sharing, reports |
| **Image Export** | PNG, JPEG | Web sharing, emails |
| **SVG Export** | Scalable vector | Editing, high quality |

### Internationalization Features

- **Multi-language support** — Display TreeMap in different languages
- **Locale formatting** — Adapt numbers, dates to locale
- **RTL support** — Right-to-left language support

## Print Functionality

Enable users to print TreeMap directly from the browser.

### Print Method

Call print method programmatically:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<button onclick="printTreeMap()">Print TreeMap</button>

<script>
    function printTreeMap() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.print();
    }
</script>
```

### Print with Custom Settings

Configure print options:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<button onclick="printCustom()">Print with Settings</button>

<script>
    function printCustom() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        var printSettings = {
            type: 'Print'
        };
        treemap.print(printSettings);
    }
</script>
```

### Complete Print Example

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Category"))
    .TitleSettings(title =>
    {
        title.Text("Sales Report - Printable")
             .TextStyle(style => style.FontSize("16px"));
    })
    .Render();

<div style="margin-top: 20px;">
    <button class="btn btn-primary" onclick="printTreeMap()">
        <i class="icon-print"></i> Print
    </button>
</div>

<script>
    function printTreeMap() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.print();
    }
</script>
```

## Export to PDF

Export TreeMap as PDF document.

### PDF Export Method

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<button onclick="exportPDF()">Export as PDF</button>

<script>
    function exportPDF() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('PDF', 'TreeMap');  // Export format, filename
    }
</script>
```

### PDF Export with Configuration

```razor
<button onclick="exportPDFCustom()">Export PDF (Custom)</button>

<script>
    function exportPDFCustom() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        var pdfSettings = {
            type: 'PDF',
            fileName: 'TreeMap_Report.pdf',
            orientation: 'Portrait',      // or 'Landscape'
            width: 500,
            height: 500
        };
        treemap.export(pdfSettings.type, pdfSettings.fileName);
    }
</script>
```

### Complete PDF Example

```razor
@Model List<object>

<div class="export-buttons" style="margin-bottom: 20px;">
    <button class="btn btn-info" onclick="exportPDF()">
        Export to PDF
    </button>
</div>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .WeightValuePath("Revenue")
    .Levels(levels =>
    {
        levels.GroupPath("Region").Add();
    })
    .TitleSettings(title =>
    {
        title.Text("Annual Revenue Report")
             .TextStyle(style => style.FontSize("18px"));
    })
    .Render();

<script>
    function exportPDF() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('PDF', 'Revenue_Report.pdf');
    }
</script>
```

## Export to Images

Export TreeMap as PNG or JPEG image.

### PNG Export

```razor
<button onclick="exportPNG()">Export as PNG</button>

<script>
    function exportPNG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('PNG', 'TreeMap.png');
    }
</script>
```

### JPEG Export

```razor
<button onclick="exportJPEG()">Export as JPEG</button>

<script>
    function exportJPEG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('JPEG', 'TreeMap.jpg');
    }
</script>
```

### Image Export Configuration

```razor
<script>
    function exportImage(format, filename) {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        var settings = {
            type: format,         // 'PNG' or 'JPEG'
            fileName: filename,
            width: 1200,          // Export width
            height: 800           // Export height
        };
        treemap.export(settings.type, settings.fileName);
    }
</script>

<button onclick="exportImage('PNG', 'treemap.png')">Export PNG</button>
<button onclick="exportImage('JPEG', 'treemap.jpg')">Export JPEG</button>
```

### Complete Image Export Example

```razor
<div class="export-buttons" style="margin-bottom: 20px;">
    <button class="btn btn-success" onclick="exportPNG()">
        Export as PNG
    </button>
    <button class="btn btn-success" onclick="exportJPEG()">
        Export as JPEG
    </button>
</div>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<script>
    function exportPNG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('PNG', 'treemap.png');
    }
    
    function exportJPEG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('JPEG', 'treemap.jpg');
    }
</script>
```

## Export to SVG

Export TreeMap as SVG (Scalable Vector Graphics) for editing or high-quality output.

### SVG Export Method

```razor
<button onclick="exportSVG()">Export as SVG</button>

<script>
    function exportSVG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('SVG', 'TreeMap.svg');
    }
</script>
```

### SVG Export Use Cases

- **Vector editing** — Open in Illustrator, Inkscape
- **Web embedding** — Use directly in web pages
- **Scalability** — Scales without quality loss
- **Small file size** — Compress better than raster

### Complete SVG Example

```razor
<div class="export-buttons">
    <button class="btn btn-danger" onclick="exportSVG()">
        Export as SVG (Editable)
    </button>
</div>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<script>
    function exportSVG() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.export('SVG', 'TreeMap_Editable.svg');
    }
</script>
```

## Export Configuration

Fine-tune export behavior and appearance.

### Export Type Options

```razor
<script>
    var treemap = document.getElementById('treemap').ej2_instances[0];
    
    // Export types available
    treemap.export('PDF', 'file.pdf');      // PDF document
    treemap.export('PNG', 'file.png');      // PNG image
    treemap.export('JPEG', 'file.jpg');     // JPEG image
    treemap.export('SVG', 'file.svg');      // SVG vector
    treemap.print();                         // Print to browser
</script>
```

### Export with All Options

```razor
<script>
    function advancedExport() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        
        var exportSettings = {
            type: 'PDF',
            fileName: 'TreeMap_Report.pdf',
            orientation: 'Landscape',    // Portrait or Landscape
            width: 800,                  // Export width
            height: 600,                 // Export height
            backgroundColor: '#ffffff'   // Background color
        };
        
        treemap.export(exportSettings.type, exportSettings.fileName);
    }
</script>
```

### Button Group for Multiple Export Options

```razor
<div class="export-controls" style="margin-bottom: 20px; gap: 10px;">
    <button class="btn btn-primary" onclick="exportFormat('PDF')">
        <i class="icon-pdf"></i> PDF
    </button>
    <button class="btn btn-success" onclick="exportFormat('PNG')">
        <i class="icon-image"></i> PNG
    </button>
    <button class="btn btn-warning" onclick="exportFormat('JPEG')">
        <i class="icon-image"></i> JPEG
    </button>
    <button class="btn btn-info" onclick="exportFormat('SVG')">
        <i class="icon-vector"></i> SVG
    </button>
    <button class="btn" onclick="printTreeMap()">
        <i class="icon-print"></i> Print
    </button>
</div>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<script>
    function exportFormat(format) {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        var timestamp = new Date().getTime();
        treemap.export(format, 'TreeMap_' + timestamp + '.' + format.toLowerCase());
    }
    
    function printTreeMap() {
        var treemap = document.getElementById('treemap').ej2_instances[0];
        treemap.print();
    }
</script>
```

## Internationalization (i18n)

Support multiple languages and regional formats.

### Locale Configuration

Set locale for TreeMap:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Locale("fr")  // French locale
    .Render();
```

### Supported Locales

Common locale codes:
- **en** — English (default)
- **fr** — French
- **de** — German
- **es** — Spanish
- **it** — Italian
- **ja** — Japanese
- **ko** — Korean
- **zh** — Chinese
- **ar** — Arabic
- **pt** — Portuguese
- **ru** — Russian

### Locale-Specific Formatting

```csharp
// French locale uses comma for decimals, space for thousands
// 1.234,56 (French) vs 1,234.56 (English)

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Locale("fr")
    .Render();
```

### Right-to-Left (RTL) Support

Enable RTL for Arabic, Hebrew, etc.:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Locale("ar")  // Arabic
    .EnableRtl(true)
    .Render();
```

## Localization Examples

### Complete Multi-Language Example

**Controller:**
```csharp
public ActionResult Localized(string lang = "en")
{
    ViewBag.Locale = lang;
    var data = GetTreeMapData();
    return View(data);
}

private List<object> GetTreeMapData()
{
    return new List<object>
    {
        new { Department = "Sales", Employees = 45 },
        new { Department = "Engineering", Employees = 120 },
        new { Department = "Marketing", Employees = 30 }
    };
}
```

**View:**
```razor
@Model List<object>

<div style="margin-bottom: 20px;">
    <label>Select Language:</label>
    <select onchange="changeLanguage(this.value)">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="ja">日本語</option>
    </select>
</div>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .WeightValuePath("Employees")
    .Locale(ViewBag.Locale ?? "en")
    .EnableRtl(ViewBag.Locale == "ar")
    .Levels(levels =>
    {
        levels.GroupPath("Department").Add();
    })
    .TitleSettings(title =>
    {
        title.Text("Organization Structure")
             .TextStyle(style => style.FontSize("16px"));
    })
    .Render();

<script>
    function changeLanguage(lang) {
        window.location = '?lang=' + lang;
    }
</script>
```

### RTL Example (Arabic)

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Locale("ar")
    .EnableRtl(true)
    .TitleSettings(title =>
    {
        title.Text("هيكل المنظمة")  // "Organization Structure" in Arabic
             .TextAlignment(Alignment.Right);
    })
    .LegendSettings(legend =>
    {
        legend.Position(LegendPosition.Left)      // Legend on left for RTL
              .Orientation(LegendOrientation.Vertical);
    })
    .Render();

<style>
    #treemap {
        direction: rtl;
        text-align: right;
    }
</style>
```

### Custom Locale Strings

Define custom localization strings:

```javascript
// Define custom locale
Syncfusion.EJ2.base.L10n.load({
    'fr-FR': {
        'treemap': {
            'print': 'Imprimer',
            'export': 'Exporter',
            'exportAsImage': 'Exporter en tant que image',
            'exportAsPDF': 'Exporter en tant que PDF'
        }
    }
});

// Use in TreeMap
var treemap = new ej.treemap.TreeMap({
    locale: 'fr-FR'
});
```

## Troubleshooting

### Issue: Export Button Not Working

**Cause:** TreeMap instance not properly accessed or method name incorrect.

**Solution:**
```javascript
// ✅ Correct
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.export('PDF', 'file.pdf');

// ❌ Incorrect
var treemap = document.getElementById('treemap');
treemap.export('PDF', 'file.pdf');  // No ej2_instances access
```

### Issue: Export File Not Downloading

**Cause:** Pop-up blocked or JavaScript error.

**Solution:**
1. Check browser console (F12) for errors
2. Allow pop-ups from your site
3. Check file system permissions

```javascript
// Test if export works
try {
    var treemap = document.getElementById('treemap').ej2_instances[0];
    treemap.export('PDF', 'test.pdf');
} catch(e) {
    console.error('Export error:', e);
}
```

### Issue: Exported File Has Poor Quality

**Cause:** Export dimensions too small.

**Solution:**
```javascript
// Increase export dimensions
var treemap = document.getElementById('treemap').ej2_instances[0];

// For image export (set dimensions before export)
// Dimensions affect quality
treemap.export('PNG', 'treemap.png');  // Uses default dimensions

// To increase quality, create with larger dimensions initially
```

### Issue: Locale Not Changing

**Cause:** Locale code incorrect or not supported.

**Solution:**
```razor
// ✅ Valid locale codes
.Locale("en")   // English
.Locale("fr")   // French
.Locale("de")   // German

// ❌ Invalid codes
.Locale("english")   // Wrong format (should be 'en')
.Locale("fr-CA")     // Specific locale variant (may not work)
```

### Issue: RTL Layout Not Applied

**Cause:** EnableRtl not set to true or CSS conflicts.

**Solution:**
```razor
// ✅ Enable RTL
.EnableRtl(true)
.Locale("ar")

// Add CSS
<style>
    #treemap {
        direction: rtl;
    }
</style>
```

### Issue: Print Includes Unwanted Elements

**Cause:** Browser print styles interfering.

**Solution:**
```css
@media print {
    /* Hide export buttons when printing */
    .export-buttons {
        display: none;
    }
    
    /* Optimize for print */
    #treemap {
        background-color: white;
        border: none;
    }
}
```

### Performance Tip: Large TreeMaps

For large TreeMaps:
1. Reduce dimensions for faster export
2. Export during off-peak usage
3. Consider server-side generation for multiple exports

```javascript
// Batch export multiple formats
async function batchExport() {
    var treemap = document.getElementById('treemap').ej2_instances[0];
    
    for (let format of ['PDF', 'PNG', 'SVG']) {
        await new Promise(resolve => {
            treemap.export(format, 'treemap.' + format.toLowerCase());
            setTimeout(resolve, 1000);  // Delay between exports
        });
    }
}
```

