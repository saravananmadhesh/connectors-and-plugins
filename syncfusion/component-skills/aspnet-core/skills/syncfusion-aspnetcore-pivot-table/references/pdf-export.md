# PDF Export in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable PDF Export](#enable-pdf-export)
- [Export to PDF](#export-to-pdf)
- [Multiple Table Exporting](#multiple-table-exporting)
- [Export Table and Chart Together](#export-table-and-chart-together)
- [Header and Footer](#header-and-footer)
  - [Add Text in Header/Footer](#add-text-in-headerfooter)
  - [Draw Line in Header/Footer](#draw-line-in-headerfooter)
  - [Add Page Number in Header/Footer](#add-page-number-in-headerfooter)
  - [Add Image in Header/Footer](#add-image-in-headerfooter)
- [File Name Customization](#file-name-customization)
- [Page Orientation](#page-orientation)
- [Page Size](#page-size)
- [Document Width and Height](#document-width-and-height)
- [Column Count Customization](#column-count-customization)
- [Column Width and Row Height](#column-width-and-row-height)
- [Changing Pivot Table Style](#changing-pivot-table-style)
- [Virtual Scroll Data](#virtual-scroll-data)

## Overview

PDF export functionality allows users to export pivot table data to PDF format with customizable formatting, headers, footers, and export options. The pivot table preserves all formatting, colors, and conditional formatting in the exported PDF.

**Key Features:**
- Single and multiple table export
- Export pivot table with chart
- Custom headers and footers
- Page number formatting
- Custom fonts and page orientation
- Automatic page breaks for large data
- All formatting and conditional styling preserved

## Enable PDF Export

Add the `allowPdfExport` attribute to enable PDF export functionality.

```html
<ejs-pivotview id="PivotView" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Note:** Set `allowPdfExport="true"` to make the PDF export button available in the toolbar.

## Export to PDF

Export pivot table to PDF using button or toolbar action with programmatic control.

### Basic PDF Export with Button

```html
<ejs-button id="pdf" content="Pdf Export" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.pdfExport();
    }
</script>
```

## Multiple Table Exporting

Export multiple pivot tables to a single PDF file (each table on separate page).

```html
<ejs-button id="pdf" content="Export Multiple Tables" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
<br />
<ejs-pivotview id="PivotGrid2" height="300" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-columns>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-columns>
        <e-rows>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-rows>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    document.getElementById('pdf').onclick = function () {
        var pivot1 = document.getElementById('PivotView').ej2_instances[0];
        var pivot2 = document.getElementById('PivotGrid2').ej2_instances[0];
        
        // Export first table to new PDF document
        pivot1.pdfExport(null, true);
        
        // Export second table to same PDF (on new page)
        pivot2.pdfExport(null, false);
    }
</script>
```

**Parameters:**
- First table: `pdfExport(null, true)` - Create new PDF document
- Subsequent tables: `pdfExport(null, false)` - Append to existing document

## Export Table and Chart Together

Export pivot table and chart in a single PDF for comprehensive visualization.

### Enable Chart View with Both Option

```html
<ejs-button id="pdf" content="Pdf Export" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-displayOption view="Both"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.pdfExport(null, false, null, false, true);
    }
</script>
```

**Export Both Option:**
- Last parameter `true` exports both table and chart in single PDF
- Table appears at top, chart below on same/additional pages

## Header and Footer

Add custom text, page numbers, and images to PDF headers and footers. When exporting data from the Pivot Table to a PDF document, you can include additional information in the header or footer. You can add text, lines, page numbers, or images to ensure your exported document includes important details, such as your organization's name or branding, and to improve readability.

To do this, you can use the `header` or `footer` options in the `pdfExportProperties`. These options allow you to specify what content to display at the top or bottom of each PDF page when exporting.

### Add Text in Header/Footer

You can include custom text in the header or footer of the exported PDF document. Set the `type` property to **Text** in the contents array to add text. The following example shows how to add the text "Northwind Traders" to the header:

```javascript
var pdfExportProperties = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            {
                type: 'Text',
                value: "Northwind Traders",
                position: { x: 0, y: 50 },
                style: { textBrushColor: '#000000', fontSize: 13 }
            }
        ]
    }
}
```

**Header/Footer Properties:**
- `fromTop`: Space from top of page (pixels)
- `fromBottom`: Space from bottom of page (pixels)
- `height`: Available height for header/footer content (pixels)
- `contents`: Array of content items (Text, PageNumber, Image, Line)

### Draw Line in Header/Footer

You can draw lines in the header or footer to create visual separators or decorative elements. Set the `type` property to **Line** in the contents array to add line elements. The line can be styled with different dash patterns and colors.

**Supported line styles:**
- `Solid` - Continuous line
- `Dash` - Dashed line
- `Dot` - Dotted line
- `DashDot` - Alternating dash and dot pattern
- `DashDotDot` - Dash followed by two dots pattern

The following example demonstrates how to add a solid line in the header:

```javascript
var pdfExportProperties = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            {
                type: 'Line',
                style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
                points: { x1: 0, y1: 4, x2: 685, y2: 4 }
            }
        ]
    }
}
```

### Add Page Number in Header/Footer

You can display page numbers in the header or footer using various numbering formats. Set the `type` property to **PageNumber** in the contents array to add page number elements. This helps users navigate through multi-page PDF documents easily.

**Supported page number types:**
- `LowerLatin` - Lowercase letters (a, b, c)
- `UpperLatin` - Uppercase letters (A, B, C)
- `LowerRoman` - Lowercase Roman numerals (i, ii, iii)
- `UpperRoman` - Uppercase Roman numerals (I, II, III)
- `Arabic` - Numbers (1, 2, 3)

The following example shows how to add page numbers with Arabic format in the header:

```javascript
var pdfExportProperties = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            {
                type: 'PageNumber',
                pageNumberType: 'Arabic',
                format: 'Page {$current} of {$total}',
                position: { x: 0, y: 25 },
                style: { textBrushColor: '#ffff80', fontSize: 15, hAlign: 'Center' }
            }
        ]
    }
}
```

**Format Placeholders:**
- `{$current}`: Current page number
- `{$total}`: Total number of pages

### Add Image in Header/Footer

You can include images in the header or footer by providing a Base64 encoded string. Set the `type` property to **Image** in the contents array to add image elements. This allows you to add logos, watermarks, or other visual elements to your PDF documents.

The following example demonstrates how to add an image to the header:

```javascript
var pdfExportProperties = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            {
                type: 'Image',
                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                position: { x: 20, y: 10 },
                size: { height: 100, width: 100 }
            }
        ]
    }
}
```

**Image Properties:**
- `src`: Base64 data URI of the image
- `position`: { x, y } coordinates in pixels
- `size`: { height, width } in pixels

To convert your own images to Base64:
1. Use an online converter or programmatically convert image to Base64 format
2. Store as data URI: `data:image/png;base64,{encoded-data}`
3. Add to PDF export properties with size and position

**Full Example with Header, Footer, and All Elements:**

```html
<ejs-button id="pdf" content="Pdf Export" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowPdfExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];

        var pdfExportProperties = {
            header: {
                fromTop: 0,
                height: 130,
                contents: [
                    {
                        type: 'Text',
                        value: "Northwind Traders",
                        position: { x: 0, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 13 }
                    },
                    {
                        type: 'Line',
                        style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
                        points: { x1: 0, y1: 4, x2: 685, y2: 4 }
                    }
                ]
            },
            footer: {
                fromBottom: 160,
                height: 150,
                contents: [
                    {
                        type: 'PageNumber',
                        pageNumberType: 'Arabic',
                        format: 'Page {$current} of {$total}',
                        position: { x: 0, y: 25 },
                        style: { textBrushColor: '#02007a', fontSize: 15 }
                    }
                ]
            }
        };
        pivotObj.pdfExport(pdfExportProperties);
    }
</script>
```

## File Name Customization

The PDF export provides an option to change the file name of the document before exporting. To change the file name, define the `fileName` property in the `pdfExportProperties` object and pass it as a parameter to the `pdfExport` method.

```javascript
var pdfExportProperties = {
    fileName: 'PivotAnalysis_2024.pdf'
};
pivotObj.pdfExport(pdfExportProperties);
```

**File Naming Tips:**
- Use descriptive names: `Sales_Report_Q4_2024.pdf`
- Include dates for versioning: `Pivot_Analysis_20240115.pdf`
- Avoid special characters that may cause issues
- Include `.pdf` extension for clarity

## Page Orientation

When exporting the Pivot Table as a PDF, users can choose the page orientation of the document. By default, the PDF is exported in **Portrait** orientation. If you want to change the orientation to **Landscape**, set the `pageOrientation` property in the `pdfExportProperties` object. Then, pass this object as a parameter to the `pdfExport` method. This lets you select either Portrait or Landscape orientation based on your needs before saving the exported PDF.

```javascript
var pdfExportProperties = {
    pageOrientation: 'Landscape'  // Portrait or Landscape
};
pivotObj.pdfExport(pdfExportProperties);
```

**When to Use:**
- `Portrait` (default): Optimal for typical reports with moderate column count
- `Landscape`: Better for wide pivot tables with many columns spread across page

## Page Size

When exporting Pivot Table data to PDF, users can select a specific page size for the PDF document. To set the page size, define the `pageSize` property within the `pdfExportProperties` object, and pass this object as a parameter to the `pdfExport` method.

You can choose from various page sizes: Letter, Note, Legal, A0, A1, A2, A3, A5, A6, A7, A8, A9, B0, B1, B2, B3, B4, B5, Archa, Archb, Archc, Archd, Arche, Flsa, HalfLetter, Letter11x17, and Ledger.

```javascript
var pdfExportProperties = {
    pageSize: 'A4'  // Default is A4
};
pivotObj.pdfExport(pdfExportProperties);
```

**Common Page Sizes:**
- `A4`: Standard paper size (210 x 297 mm)
- `A3`: Larger size (297 x 420 mm)
- `Letter`: US standard (8.5 x 11 in)
- `Legal`: US legal (8.5 x 14 in)

## Document Width and Height

You can adjust the size of the exported PDF document by setting the `height` and `width` options in the [`beforeExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_BeforeExport) event. This allows you to specify the dimensions of the PDF before creating it.

**Note:** This option is available only when [`enableVirtualization`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_EnableVirtualization) is set to **true**. Also, make sure that both the `VirtualScroll` and `PDFExport` modules are added to the Pivot Table.

```javascript
<ejs-pivotview id="PivotView" allowPdfExport="true" enableVirtualization="true">
    <!-- pivot view configuration -->
</ejs-pivotview>

<script>
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    
    pivotObj.beforeExport = function(args) {
        args.pdfExportProperties.height = 600;
        args.pdfExportProperties.width = 800;
    };
    
    pivotObj.pdfExport();
</script>
```

## Column Count Customization

Users can control how many Pivot Table columns appear on each page of the exported PDF by setting the `columnSize` option in the [`beforeExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_BeforeExport) event. This allows users to split Pivot Table columns across multiple pages when exporting large tables to PDF, making the output easier to read.

**Note:** This option works only when [`enableVirtualization`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_EnableVirtualization) is enabled in the Pivot Table settings. Also, make sure that both `VirtualScroll` and `PDFExport` modules are injected into the Pivot Table.

```javascript
<ejs-pivotview id="PivotView" allowPdfExport="true" enableVirtualization="true">
    <!-- pivot view configuration -->
</ejs-pivotview>

<script>
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    
    pivotObj.beforeExport = function(args) {
        args.pdfExportProperties.columnSize = 5;  // Display 5 columns per page
    };
    
    pivotObj.pdfExport();
</script>
```

## Column Width and Row Height

You can adjust column width and row height in the PDF document when exporting data from the Pivot Table by handling the [onPdfCellRender](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_OnPdfCellRender) event. To set the width of specific columns during export, use the `args.column.width` property inside this event.

**Adjust Column Width:**

```javascript
<ejs-pivotview id="PivotView" allowPdfExport="true" enableVirtualization="true" onPdfCellRender="onPdfCellRender">
    <!-- pivot view configuration -->
</ejs-pivotview>

<script>
    function onPdfCellRender(args) {
        // Set width for "Unit Sold" column under "FY 2015" to 60 pixels
        if (args.column && args.column.fieldName === 'Unit Sold') {
            args.column.width = 60;
        }
    }
    
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    pivotObj.pdfExport();
</script>
```

**Adjust Row Height:**

Similarly, if you want to change the height of a particular row in the PDF document, you can use the `args.cell.height` property inside the same [onPdfCellRender](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_OnPdfCellRender) event. For instance, the **"Mountain Bikes"** row can be set to a height of **30** pixels.

```javascript
<script>
    function onPdfCellRender(args) {
        // Set row height for "Mountain Bikes" row to 30 pixels
        if (args.cell && args.cell.rowText === 'Mountain Bikes') {
            args.cell.height = 30;
        }
    }
</script>
```

**Note:** To use this option, make sure that [enableVirtualization](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_EnableVirtualization) is set to **true**. Additionally, both `VirtualScroll` and `PDFExport` must be injected into the Pivot Table.

## Changing Pivot Table Style

When you export the Pivot Table as a PDF document, you can change the colors used for headers, captions, and records. To do this, use the `theme` property inside the `pdfExportProperties` object. Pass this object to the `pdfExport` method. This allows you to adjust how the Pivot Table looks in the exported PDF.

By default, the Material theme is applied to the exported PDF document.

### Changing Default Font While Exporting

By default, the Pivot Table uses the "Helvetica" font in the exported PDF. You can change this font by setting the `theme` property in `pdfExportProperties`. The available built-in font options are:

- Helvetica
- TimesRoman
- Courier
- Symbol
- ZapfDingbats

```javascript
var pdfExportProperties = {
    theme: {
        header: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold) },
        caption: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 9) },
        record: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 10) }
    }
};
pivotObj.pdfExport(pdfExportProperties);
```

### Adding Custom Font While Exporting

You can also use custom fonts when exporting if you need support for languages or styles that are not available in the built-in fonts. The custom font should be in **Base64** format and applied using the **PdfTrueTypeFont** class. In the example below, the **Advent Pro** font is used, which supports languages like Hungarian.

Non-English alphabets can also be exported correctly when you specify a suitable font.

## Virtual Scroll Data

When working with large amounts of data in the Pivot Table, the virtual scroll option allows users to efficiently export all the table data as a complete PDF document, without any slowdown or performance issues. This method uses PivotEngine export to manage and export extensive datasets smoothly. To use this option, make sure to enable the [`allowPdfExport`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotView.html#Syncfusion_EJ2_PivotView_PivotView_AllowPdfExport) property and use the `pdfExport` method in the Pivot Table.

**To use PivotEngine export:**
- Inject the `PDFExport` module into the Pivot Table
- When virtual scrolling is enabled, PivotEngine export is used automatically

**Example with Virtual Scrolling:**

```html
<ejs-pivotview id="PivotView" allowPdfExport="true" enableVirtualization="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <!-- datasource configuration -->
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    pivotObj.pdfExport();  // Will use PivotEngine export for virtual scrolling
</script>
```

This approach ensures that even with thousands of rows and columns, the PDF export completes efficiently without performance degradation.
