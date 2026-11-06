# PDF Export in ASP.NET MVC Grid

Export grid data to PDF format. Enable with `AllowPdfExport(true)` and trigger via toolbar or programmatically.

## When to Use This

Use this reference when you need to:
- Export grid data to PDF format
- Customize PDF properties (page size, orientation, theme)
- Add headers and footers to PDF
- Handle template column exports
- Export specific pages or all data
- Configure server-side PDF export

## Table of Contents
- [Enable PDF Export](#enable-pdf-export)
- [PDF Export Options](#pdf-export-options)
- [PdfExportProperties Options](#pdfexportproperties-options)
- [Adding Header and Footer](#adding-header-and-footer)
- [Export with Templates](#export-with-templates)
- [Server-Side PDF Export](#server-side-pdf-export)
- [Repeat Column Headers on Each Page](#repeat-column-headers-on-each-page)
- [Export Multiple Grids to Single PDF](#export-multiple-grids-to-single-pdf)

## Enable PDF Export

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Toolbar(new List<string> { "PdfExport" })
    .AllowPdfExport(true)
    .ToolbarClick("toolbarClick")
    .Render()
```

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_pdfexport') {
        grid.pdfExport();
    }
}
```

## PDF Export Options

```javascript
var pdfExportProperties = {
    fileName: 'OrderReport.pdf',
    exportType: 'CurrentPage',    // 'AllPages' (default) or 'CurrentPage'
    includeHiddenColumn: true,
    pageOrientation: 'Landscape', // 'Portrait' (default) or 'Landscape'
    pageSize: 'A4',               // A0–A10, Letter, etc.
    theme: {
        header: {
            fontName: 'Helvetica', fontSize: 11, bold: true,
            fontColor: '#ffffff', fillColor: '#0070c0'
        },
        record: { fontName: 'Helvetica', fontSize: 10 },
        caption: { fontName: 'Helvetica', fontSize: 10, bold: true }
    }
};
grid.pdfExport(pdfExportProperties);
```

## PdfExportProperties Options

| Property | Description |
|----------|-------------|
| `fileName` | Output file name |
| `exportType` | `'AllPages'` or `'CurrentPage'` |
| `includeHiddenColumn` | Export hidden columns |
| `dataSource` | Custom data to export |
| `pageOrientation` | `'Portrait'` or `'Landscape'` |
| `pageSize` | Page size: `'A4'`, `'Letter'`, etc. |
| `theme` | PDF theme with header/record/caption font settings |
| `header` | Custom page header |
| `footer` | Custom page footer |
| `isRepeatHeader` | Repeat column headers on each page |

## Adding Header and Footer

```javascript
var pdfExportProperties = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            {
                type: 'Text',
                value: 'Order Report',
                position: { x: 0, y: 50 },
                style: { textBrushColor: '#000000', fontSize: 20, bold: true }
            },
            {
                type: 'Image',
                src: imageBase64,
                position: { x: 40, y: 10 },
                size: { height: 100, width: 250 }
            }
        ]
    },
    footer: {
        fromBottom: 160,
        height: 150,
        contents: [
            {
                type: 'Text',
                value: 'Page {$current} of {$total}',
                position: { x: 0, y: 0 },
                style: { textBrushColor: '#000000', fontSize: 13 }
            }
        ]
    }
};
```

Header/footer content types: `Text`, `Image`, `Line`, `PageNumber`.

## Export with Templates

Use `PdfQueryCellInfo` event to provide custom values for template columns:

```cshtml
.PdfQueryCellInfo("pdfQueryCellInfo")
```

```javascript
function pdfQueryCellInfo(args) {
    if (args.column.field === 'Rating') {
        args.value = args.data.Rating + ' stars'; // override template value
    }
}
```

Use `PdfHeaderQueryCellInfo` to customize header cells in the export:

```javascript
function pdfHeaderQueryCellInfo(args) {
    args.cell.value = args.cell.value.toUpperCase();
}
```

## Server-Side PDF Export

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_pdfexport') {
        grid.serverPdfExport('/Home/PdfExport');
    }
}
```

```csharp
public ActionResult PdfExport(string gridModel)
{
    GridPdfExport exp = new GridPdfExport();
    Grid gridProperty = ConvertGridObject(gridModel);
    return exp.PdfExport<OrdersDetails>(gridProperty, OrdersDetails.GetAllRecords());
}
```

## Repeat Column Headers on Each Page

```javascript
grid.pdfExport({ isRepeatHeader: true });
```

## Export Multiple Grids to Single PDF

```javascript
var grid1 = document.getElementById('Grid1').ej2_instances[0];
var pdfDoc = grid1.pdfExport({}, true); // isBlob = true, returns promise
pdfDoc.then(function(pdfData) {
    var grid2 = document.getElementById('Grid2').ej2_instances[0];
    grid2.pdfExport({}, false, pdfData); // append to existing PDF
});
```
