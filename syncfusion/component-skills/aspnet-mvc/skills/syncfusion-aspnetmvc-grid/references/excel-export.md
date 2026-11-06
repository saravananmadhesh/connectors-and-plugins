# Excel Export in ASP.NET MVC Grid

Export grid data to Excel (.xlsx) format. Trigger via toolbar or programmatically.

## When to Use This

Use this reference when you need to:
- Export grid data to Excel format
- Customize export properties (file name, theme, headers)
- Export specific sheets or multiple grids
- Handle template column exports
- Export current page versus all pages
- Configure server-side Excel export

## Table of Contents
- [Enable Excel Export](#enable-excel-export)
- [Export Options](#export-options)
- [ExcelExportProperties Options](#excelexportproperties-options)
- [Export with Header and Footer](#export-with-header-and-footer)
- [Export with Templates](#export-with-templates)
- [Server-Side Excel Export](#server-side-excel-export)
- [Export Multiple Grids to Single File](#export-multiple-grids-to-single-file)
- [CSV Export](#csv-export)

## Enable Excel Export

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Toolbar(new List<string> { "ExcelExport" })
    .AllowExcelExport(true)
    .ToolbarClick("toolbarClick")
    .Render()
```

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_excelexport') {
        grid.excelExport();
    }
}
```

## Export Options

Pass `ExcelExportProperties` to customize the export:

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_excelexport') {
        var exportProperties = {
            fileName: 'OrderData.xlsx',
            dataSource: customData,         // export custom data
            includeHiddenColumn: true,      // include hidden columns
            exportType: 'CurrentPage',      // 'CurrentPage' or 'AllPages'
            theme: {
                header: { fontName: 'Segoe UI', fontSize: 12, bold: true, fontColor: '#ffffff', backColor: '#0070c0' },
                record: { fontName: 'Segoe UI', fontSize: 11 },
                caption: { fontName: 'Segoe UI', fontSize: 11, bold: true }
            }
        };
        grid.excelExport(exportProperties);
    }
}
```

## ExcelExportProperties Options

| Property | Description |
|----------|-------------|
| `fileName` | Output file name (default: `Export.xlsx`) |
| `exportType` | `'AllPages'` (default) or `'CurrentPage'` |
| `includeHiddenColumn` | Export hidden columns (default: false) |
| `dataSource` | Custom data to export instead of grid data |
| `theme` | Excel theme with header/record/caption styles |
| `header` | Custom header rows above grid data |
| `footer` | Custom footer rows below grid data |
| `multipleExport` | Export multiple grids to a single file |

## Export with Header and Footer

```javascript
var exportProperties = {
    header: {
        headerRows: 2,
        rows: [
            { cells: [{ colSpan: 4, value: 'Northwind Traders', style: { bold: true, fontSize: 14 } }] },
            { cells: [{ colSpan: 4, value: 'Order Report', style: { bold: true } }] }
        ]
    },
    footer: {
        footerRows: 1,
        rows: [
            { cells: [{ colSpan: 4, value: 'Thank you for your business', style: { italic: true } }] }
        ]
    }
};
grid.excelExport(exportProperties);
```

## Export with Templates

For columns with templates, use `ExcelQueryCellInfo` event to provide the value to be exported:

```javascript
function excelQueryCellInfo(args) {
    if (args.column.field === 'EmployeeID') {
        args.value = args.data.EmployeeID; // resolve display value
    }
}
```

Bind the event:
```cshtml
.ExcelQueryCellInfo("excelQueryCellInfo")
```

## Server-Side Excel Export

```cshtml
@Html.EJS().Grid("Grid")
    .DataSource(ds => ds.Url("/Home/DataSource").Adaptor("UrlAdaptor"))
    .Toolbar(new List<string> { "ExcelExport" })
    .AllowExcelExport(true)
    .ToolbarClick("toolbarClick")
    .Render()
```

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_excelexport') {
        grid.serverExcelExport('/Home/ExcelExport');
    }
}
```

```csharp
public ActionResult ExcelExport(string gridModel)
{
    GridExcelExport exp = new GridExcelExport();
    Grid gridProperty = ConvertGridObject(gridModel);
    return exp.ExcelExport<OrdersDetails>(gridProperty, OrdersDetails.GetAllRecords());
}
```

## Export Multiple Grids to Single File

```javascript
var firstGridProperties = { dataSource: firstGridData };
var secondGridProperties = { dataSource: secondGridData };
var grid1 = document.getElementById('Grid1').ej2_instances[0];
grid1.excelExport(firstGridProperties, true);           // isBlob = true
grid1.pdfExportComplete = function() {};
var grid2 = document.getElementById('Grid2').ej2_instances[0];
// chain exports using exportComplete event
```

## CSV Export

```cshtml
.Toolbar(new List<string> { "CsvExport" })
.AllowExcelExport(true)
```

```javascript
if (args.item.id === 'Grid_csvexport') {
    grid.csvExport();
}
```
