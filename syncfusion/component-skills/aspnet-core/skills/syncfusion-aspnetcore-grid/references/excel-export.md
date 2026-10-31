# Excel Export — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Excel Export](#enable-excel-export)
- [Export Options](#export-options)
- [Export with Templates](#export-with-templates)
- [Server-Side Excel Export](#server-side-excel-export)
- [Multiple Grids Export](#multiple-grids-export)
- [Customizing Export Data](#customizing-export-data)

## When to Use This

- Export grid data to Excel format
- Include formatting and styles in exports
- Export templates and calculated columns
- Perform server-side export operations
- Export multiple grids to single file

---

## Enable Excel Export

Add `allowExcelExport="true"` and include `ExcelExport` in the toolbar. Trigger via `toolbarClick`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          allowExcelExport="true"
          toolbar="@(new List<string>() { "ExcelExport" })"
          toolbarClick="toolbarClickFn">
```

```javascript
function toolbarClickFn(args) {
    if (args.item.id === 'Grid_excelexport') {
        document.getElementById('Grid').ej2_instances[0].excelExport();
    }
}
```

## Export Options

Pass an `ExcelExportProperties` object to customize the export:

```javascript
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
```

**Common properties:**
| Property | Type | Description |
|---|---|---|
| `fileName` | string | Output file name |
| `includeHiddenColumn` | boolean | Include hidden columns |
| `exportType` | string | `AllPages` or `CurrentPage` |
| `theme` | object | Header/content/caption cell styles |
| `header` | object | Custom header rows at top |
| `footer` | object | Custom footer rows at bottom |
| `dataSource` | array | Override exported data |

## Export with Templates

Export columns that use templates or custom rendering by handling `excelQueryCellInfo`:

```javascript
function excelQueryCellInfo(args) {
    if (args.column.field === 'EmployeeImage') {
        args.image = { base64: args.data['Base64'], height: 75, width: 75 };
    }
}
```

## Server-Side Excel Export

For large datasets, export on the server using Syncfusion's XlsIO library:

```cshtml
<ejs-grid id="grid" dataSource="@ViewBag.dataSource" height="400px" toolbarClick="toolbarClick" toolbar=@(new List<string>() { "ExcelExport" })>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="CustomerID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

```javascript
    function toolbarClick(args) {
        var grid = document.getElementById("grid").ej2_instances[0];
        grid.serverExcelExport("/Home/ExcelExport");
    }
```

Server controller:
```csharp
public IActionResult ExcelExport(string gridModel)
{
    GridExcelExport exp = new GridExcelExport();
    Grid gridProperty = ConvertGridObject(gridModel);
    return exp.ExcelExport<OrdersDetails>(gridProperty, OrdersDetails.GetAllRecords());
}
```

## Multiple Grids Export

Export multiple grids into a single Excel workbook:

```javascript
var firstGrid = document.getElementById('FirstGrid').ej2_instances[0];
var secondGrid = document.getElementById('SecondGrid').ej2_instances[0];

var appendGrids = [firstGrid, secondGrid];
firstGrid.excelExport({}, true).then(function(workbook) {
    secondGrid.excelExport({}, false, workbook);
});
```

## Customizing Export Data

Override which data gets exported using `dataSource` in export properties:

```javascript
var exportProps = {
    dataSource: customFilteredData
};
grid.excelExport(exportProps);
```
