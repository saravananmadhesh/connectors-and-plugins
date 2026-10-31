# PDF Export — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable PDF Export](#enable-pdf-export)
- [Export Options](#export-options)
- [Adding Header and Footer](#adding-header-and-footer)
- [Export with Templates](#export-with-templates)
- [Server-Side PDF Export](#server-side-pdf-export)
- [Multiple Grids Export](#multiple-grids-export)

## When to Use This

- Export grid to PDF format
- Add custom headers and footers
- Include templates in PDF export
- Generate professional PDF reports
- Export multiple grids to single document

---

## Enable PDF Export

Add `allowPdfExport="true"` and include `PdfExport` in the toolbar. Trigger via `toolbarClick`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
    allowPdfExport="true"
    toolbar="@(new List<string>() { "PdfExport" })"
    toolbarClick="toolbarClickFn">
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

```javascript
function toolbarClickFn(args) {
    if (args.item.id === 'Grid_pdfexport') {
        document.getElementById('Grid').ej2_instances[0].pdfExport();
    }
}
```

---

## Export Options

Pass a `PdfExportProperties` object to customize the export:

```javascript
var exportProps = {
    fileName: 'Orders.pdf',
    pageSize: 'Letter',         // 'Letter', 'A3', 'A4', 'A5', 'Legal', etc.
    pageOrientation: 'Landscape', // 'Portrait' or 'Landscape'
    includeHiddenColumn: true,
    exportType: 'CurrentPage'
};
grid.pdfExport(exportProps);
```

**Common properties:**
| Property | Type | Description |
|---|---|---|
| `fileName` | string | Output file name |
| `pageSize` | string | Paper size (A4, Letter, Legal…) |
| `pageOrientation` | string | `Portrait` or `Landscape` |
| `includeHiddenColumn` | boolean | Include hidden columns |
| `exportType` | string | `AllPages` or `CurrentPage` |
| `theme` | object | Font styles for header/content/caption |
| `header` | object | Custom header section |
| `footer` | object | Custom footer section |
| `dataSource` | array | Override exported data |

---

## Adding Header and Footer

Add custom header and footer content to the PDF using `header` and `footer` properties:

```javascript
var exportProps = {
    header: {
        fromTop: 0,
        height: 130,
        contents: [
            { type: 'Text', value: 'Order Report', position: { x: 0, y: 50 }, style: { textBrushColor: '#000000', fontSize: 20 } },
            { type: 'Image', src: imageBase64, position: { x: 40, y: 10 }, size: { height: 100, width: 250 } }
        ]
    },
    footer: {
        fromBottom: 160,
        height: 150,
        contents: [
            { type: 'PageNumber', pageNumberType: 'Arabic', format: 'Page {$current} of {$total}', position: { x: 0, y: 25 }, style: { textBrushColor: '#02007a', fontSize: 15 } }
        ]
    }
};
grid.pdfExport(exportProps);
```

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPdfExport="true" toolbarClick="toolbarClick" toolbar="@(new List<string>() {"PdfExport"})" allowPaging="true" height="220px">
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

---

## Export with Templates

Export columns with custom templates or images by handling `pdfQueryCellInfo`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPdfExport="true" toolbar="@(new List<string>() {"PdfExport"})"
    toolbarClick="toolbarClick" pdfQueryCellInfo="pdfQueryCellInfo"> 
    <e-grid-columns>
        <e-grid-column headerText="Employee Image" textAlign="Center" template="#imageTemplate" width="150"></e-grid-column>  
    </e-grid-columns> 
</ejs-grid>

<script type="text/x-template" id="imageTemplate">
    <div class="image">
        <img src="data:image/jpeg;base64,${EmployeeImage}" alt="${EmployeeID}" />
    </div>
</script>
```

```javascript
function pdfQueryCellInfo(args) {
    if (args.column.field === 'EmployeeImage') {
        args.image = { base64: args.data['Base64'], height: 75, width: 75 };
    }
}
function toolbarClick(args) {
    if (args['item'].id === 'Grid_pdfexport') {
        this.pdfExport();
    }
}
```

---

## Server-Side PDF Export

For large datasets, export on the server using Syncfusion's PDF library:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="400" toolbarClick="toolbarClick" toolbar=@(new List<string>() { "PdfExport" })>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

```javascript
function toolbarClick(args) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.serverPdfExport("/Home/PdfExport");
}
```

Server controller:
```csharp
public IActionResult PdfExport(string gridModel)
{
    GridPdfExport exp = new GridPdfExport();
    Grid gridProperty = ConvertGridObject(gridModel);
    return exp.PdfExport<OrdersDetails>(gridProperty, OrdersDetails.GetAllRecords());
}
```

---

## Multiple Grids Export

Export multiple grids into a single PDF document:

```javascript
var firstGrid = document.getElementById('FirstGrid').ej2_instances[0];
var secondGrid = document.getElementById('SecondGrid').ej2_instances[0];

firstGrid.pdfExport({}, true).then(function(pdfDoc) {
    secondGrid.pdfExport({}, false, pdfDoc);
});
```
