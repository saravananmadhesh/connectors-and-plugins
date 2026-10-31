# PDF Export in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Export to PDF](#export-to-pdf)
- [Multiple Table Exporting](#multiple-table-exporting)
- [Export Table and Chart Together](#export-table-and-chart-together)
- [Customization](#customization)
  - [Header and Footer](#header-and-footer)
  - [Add Page Number in Header/Footer](#add-page-number-in-headerfooter)
  - [Add Image in Header/Footer](#add-image-in-headerfooter)
  - [Changing Default Font While Exporting](#changing-default-font-while-exporting)
  - [Changing Page Orientation While Exporting](#changing-page-orientation-while-exporting)
  - [Changing the File Name While Exporting](#changing-the-file-name-while-exporting)
  - [Changing Page Size While Exporting](#changing-page-size-while-exporting)
  - [Export All Pages](#export-all-pages)
- [Best Practices](#best-practices)

## Overview

Export to PDF converts pivot table and optional chart into portable PDF documents for archival, sharing, and professional distribution.

## Export to PDF

### Enable PDF Export

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .AllowPdfExport(true)
    .ShowToolbar(true)
    .Toolbar(new List<string> { "PdfExport" })
    .Height("450")
    .Width("100%")
    .Render()
```

**Key Properties:**
- `AllowPdfExport(true)` - Enables export capability
- `ShowToolbar(true)` - Displays toolbar
- Toolbar includes "PdfExport" button

### Export Programmatically

```html
<button onclick="exportToPDF()">Export to PDF</button>

<script>
    function exportToPDF() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.pdfExport();
    }
</script>
```



## Multiple Table Exporting

Export multiple pivot tables to same PDF with proper page management:

```html
<button onclick="exportMultipleToPDF()">Export All Tables</button>

<script>
    function exportMultipleToPDF() {
        var pivot1 = document.getElementById('pivot1').ej2_instances[0];
        var pivot2 = document.getElementById('pivot2').ej2_instances[0];
        
        // First table - initiate export
        var pdfExportProperties = {
            fileName: 'combined-report.pdf',
            orientation: 'Landscape'
        };
        pivot1.pdfExport(true, pdfExportProperties);  // isMultipleExport: true
        
        // Second table - append to same PDF
        // Use same pdfDoc reference to continue export
        var exportProperties = {
            isMultipleExport: false  // Don't create new document
        };
        pivot2.pdfExport(false, exportProperties, pdfDoc);  // Continue on existing pdfDoc
    }
</script>
```

**Multiple Export Logic:**
- **First call:** `isMultipleExport=true`, creates new PDF document
- **Subsequent calls:** `isMultipleExport=false`, appends to existing `pdfDoc` parameter
- Pass `pdfDoc` from first export to subsequent exports

## Export Table and Chart Together

Export both pivot table and pivot chart in same PDF:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("PivotView").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .DisplayOption(new PivotViewDisplayOption { View = View.Both })
    .AllowPdfExport(true)
    .Height("450")
    .Width("100%")
    .Render()

<button id="pdf">PDF Export</button>

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.pdfExport(null, false, null, false, true);
    }
</script>
```

**Key Details:**
- `DisplayOption` with `View.Both` - Shows both table and chart
- Last parameter `true` in `pdfExport()` - Exports both table and chart to PDF

## Customization

### Header and Footer

Add custom headers and footers to PDF:

```html
<script>
    function exportWithHeader() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        
        var pdfExportProperties = {
            fileName: 'report-with-header.pdf',
            pageOrientation: 'Landscape',
            theme: {
                header: {
                    type: 'Text',
                    format: 'Sales Report - ' + new Date().toLocaleDateString(),
                    fontSize: 14,
                    bold: true,
                    alignment: 'Center'
                }
            }
        };
        
        pivotObj.pdfExport(null, pdfExportProperties);
    }
</script>
```

### Header/Footer with Elements

```javascript
var pdfExportProperties = {
    fileName: 'styled-report.pdf',
    theme: {
        header: {
            type: 'Text',
            format: 'Quarterly Sales Report',
            fontSize: 16
        },
        footer: {
            type: 'Line',
            style: {
                dashStyle: 'Dash',  // solid, dash, dot, dashdot, dashdotdot
                width: 2,
                color: [0, 0, 0]
            }
        }
    }
};
```

### Line Styles

Supported line styles for separators:

| Style | Appearance |
|-------|-----------|
| **solid** | ________________ |
| **dash** | __ __ __ __ |
| **dot** | ......... |
| **dashdot** | _. _. _. |
| **dashdotdot** | _.. _.. _..|

### Add Page Number in Header/Footer

Display page numbers in header or footer with various formats:

```html
<button id="pdf">Export with Page Numbers</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var pdfExportProperties = {
            header: {
                fromTop: 0,
                height: 60,
                contents: [
                    {
                        type: 'Text',
                        value: 'Sales Report',
                        position: { x: 0, y: 10 },
                        style: { fontSize: 16, textBrushColor: '#000000' }
                    }
                ]
            },
            footer: {
                fromBottom: 150,
                height: 60,
                contents: [
                    {
                        type: 'PageNumber',
                        pageNumberType: 'Arabic',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 15 },
                        style: { fontSize: 12, textBrushColor: '#000000' }
                    }
                ]
            }
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**Page Number Formats:**
- `Arabic` - Numbers (1, 2, 3)
- `LowerLatin` - Lowercase letters (a, b, c)
- `UpperLatin` - Uppercase letters (A, B, C)
- `LowerRoman` - Lowercase Roman numerals (i, ii, iii)
- `UpperRoman` - Uppercase Roman numerals (I, II, III)

### Add Image in Header/Footer

Include logos or images in PDF header/footer using Base64 encoded strings:

```html
<button id="pdf">Export with Logo</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        // Base64 encoded image string
        var logoImage = 'data:image/png;base64,iVBORw0KGgoAAAA...'; // Your Base64 image
        
        var pdfExportProperties = {
            header: {
                fromTop: 0,
                height: 100,
                contents: [
                    {
                        type: 'Image',
                        src: logoImage,
                        position: { x: 20, y: 10 },
                        size: { height: 50, width: 50 }
                    },
                    {
                        type: 'Text',
                        value: 'Company Name',
                        position: { x: 80, y: 20 },
                        style: { fontSize: 14, textBrushColor: '#000000' }
                    }
                ]
            }
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**Key Details:**
- `type: 'Image'` - Specifies image content in header/footer
- `src` - Base64 encoded image string
- `position` - X, Y coordinates for image placement
- `size` - Height and width in pixels

### Changing Default Font While Exporting

By default, the Pivot Table uses the "Helvetica" font in exported PDFs. You can change this using the **PdfStandardFont** property to improve readability or match corporate branding standards.

```html
<button id="pdf">Export with Custom Font</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var pdfExportProperties = {
            theme: {
                header: {
                    font: new ej.pdfexport.PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold),
                    fontColor: '#000000',
                    fontSize: 13
                },
                caption: {
                    font: new ej.pdfexport.PdfStandardFont(PdfFontFamily.TimesRoman, 9, PdfFontStyle.Regular),
                    fontSize: 11
                },
                record: {
                    font: new ej.pdfexport.PdfStandardFont(PdfFontFamily.TimesRoman, 10, PdfFontStyle.Regular),
                    fontSize: 10
                }
            }
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**PdfStandardFont Options:**

The `PdfStandardFont` class allows you to specify built-in PDF fonts:

- **PdfFontFamily.Helvetica** (default) - Clean, modern sans-serif font
- **PdfFontFamily.TimesRoman** - Traditional serif font for formal documents
- **PdfFontFamily.Courier** - Monospaced font for technical documents
- **PdfFontFamily.Symbol** - Special symbols and mathematical characters
- **PdfFontFamily.ZapfDingbats** - Decorative symbols and icons

**PdfFontStyle Options:**
- `PdfFontStyle.Regular` - Normal text
- `PdfFontStyle.Bold` - Bold text
- `PdfFontStyle.Italic` - Italic text
- `PdfFontStyle.Bold | PdfFontStyle.Italic` - Bold and italic combined

**Usage Pattern:**
```javascript
new ej.pdfexport.PdfStandardFont(PdfFontFamily.TimesRoman, fontSize, PdfFontStyle.Bold)
```

**Font Selection Guidelines:**
- **Helvetica**: Modern, clean reports and dashboards
- **TimesRoman**: Formal reports, legal documents, academic papers
- **Courier**: Code samples, technical specifications, monospaced data
- **Symbol/ZapfDingbats**: Special characters and decorative elements

### Changing Page Orientation While Exporting

Set page orientation to Portrait or Landscape:

```html
<button id="pdf">Export as Landscape</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var pdfExportProperties = {
            pageOrientation: 'Landscape'  // or 'Portrait'
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**Options:**
- `Portrait` - Vertical orientation (default, 8.5" x 11")
- `Landscape` - Horizontal orientation (11" x 8.5")

### Changing the File Name While Exporting

Customize the exported PDF file name:

```html
<button id="pdf">Export PDF</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var pdfExportProperties = {
            fileName: 'sales-report-' + new Date().toISOString().split('T')[0] + '.pdf'
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**Tip:** Use timestamps or meaningful identifiers in file names for better organization

### Changing Page Size While Exporting

Select different page sizes for the PDF document:

```html
<button id="pdf">Export as A4</button>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var pdfExportProperties = {
            pageSize: 'A4'  // or 'Letter', 'Legal', etc.
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

**Supported Page Sizes:**
- Letter, LegalNote, A0, A1, A2, A3, A4, A5, A6, A7, A8, A9
- B0, B1, B2, B3, B4, B5
- Archa, Archb, Archc, Archd, Arche
- Flsa, HalfLetter, Letter11x17, Ledger

### Export All Pages

By default, the Pivot Table exports all data records when virtual scrolling is enabled, allowing export of complete datasets. To export only the data currently visible in the viewport, set the `ExportAllPages` property to **false**.

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().Button("pdf").Content("Pdf Export").IsPrimary(true).Render()

@Html.EJS().PivotView("PivotView").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .EnableVirtualization(true)
    .ExportAllPages(true)
    .AllowPdfExport(true)
    .Height("450")
    .Width("100%")
    .Render()

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.pdfExport();
    }
</script>
```

**Export All vs Current Page:**

```javascript
// Export all pages (default with virtualization)
pivotObj.ExportAllPages = true;
pivotObj.pdfExport();

// Export only current visible page
pivotObj.ExportAllPages = false;
pivotObj.pdfExport();
```

**Configuration Options:**

| Property | Value | Behavior |
|----------|-------|----------|
| `ExportAllPages(true)` | true | Exports complete dataset (all virtual pages) |
| `ExportAllPages(false)` | false | Exports only visible viewport data |
| `EnableVirtualization(true)` | true | Required for export optimization |

**When to Use:**
- **ExportAllPages = true**: Complete data export, archival, full reports
- **ExportAllPages = false**: Quick previews, sample data, performance optimization

**Performance Impact:**
- `true`: Longer export time, larger file size, complete data
- `false`: Faster export, smaller file size, viewport data only

**Note:** This option only works when `EnableVirtualization` is enabled. By default, the pivot engine performs automatic export with virtual scrolling.

## Best Practices

- **Orientation:** Use Landscape for wide pivots (many columns)
- **Scaling:** Set `fitToPage: true` to avoid truncation
- **Headers:** Include report title, date, and department for context
- **Branding:** Add company header/footer for professional appearance
- **Testing:** Verify page breaks and layout before distribution
- **Performance:** Limit large exports (100+ pages) to avoid delays
- **Accessibility:** Include descriptive text in headers for screen readers
- **File naming:** Use timestamps and meaningful prefixes: `sales-report-Quarterly-2024-Q1.pdf`
