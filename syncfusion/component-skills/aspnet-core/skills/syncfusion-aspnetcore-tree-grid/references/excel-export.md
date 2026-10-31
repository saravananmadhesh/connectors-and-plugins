# Excel Export — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Basic Excel Export](#basic-excel-export)
- [Export Options](#export-options)
- [Persist Collapsed State](#persist-collapsed-state)
- [Headers and Footers](#headers-and-footers)
- [Cell Style Customization](#cell-style-customization)
- [Custom Aggregates](#custom-aggregates)
- [Server-Side Export](#server-side-export)

## When to Use This Skill

Use this reference when you need to:
- Enable users to download TreeGrid data as Excel files
- Apply custom cell styling and formatting to exports
- Preserve hierarchical expand/collapse state in exports
- Add custom headers and footers with metadata
- Customize aggregate values in export
- Handle large datasets via server-side export
- Control which columns are exported
- Format numbers, dates, and other data types in export

---

## Basic Excel Export

Enable Excel export with `allowExcelExport="true"` and add "ExcelExport" to the toolbar. Users can click the button to download the TreeGrid as an Excel file:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowExcelExport="true"
              toolbar="@(new List<string>() { "ExcelExport" })">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Controller:**
```csharp
public IActionResult ExcelExportExample()
{
    ViewBag.datasource = TreeData.GetDefaultData();
    return View();
}
```

**Programmatic trigger:**
```javascript
var treegrid = document.getElementById('TreeGrid').ej2_instances[0];
treegrid.excelExport();
```

---

## Export Options

Customize the Excel export output with `TreeGridExcelExportProperties`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowExcelExport="true"
              toolbar="@(new List<string>() { "ExcelExport" })"
              toolbarClick="toolbarClickHandler">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
function toolbarClickHandler(args) {
    if (args.item.id === 'TreeGrid_excelexport') {
        var excelExportProperties = {
            fileName: 'TreeGrid_Report.xlsx',
            isCollapsedStatePersist: false,
            theme: {
                header: { fontName: 'Calibri', fontSize: 12 }
            }
        };
        document.getElementById('TreeGrid').ej2_instances[0].excelExport(excelExportProperties);
    }
}
</script>
```

**Common options:**
- `fileName` - Exported file name (default: "TreeGrid.xlsx")
- `isCollapsedStatePersist` - Keep collapsed parent rows collapsed in export
- `theme` - Customize fonts and styles
- `dataSource` - Export specific data instead of all rows

---

## Persist Collapsed State

Preserve parent row collapse/expand state in the exported Excel file:

```javascript
var treegrid = document.getElementById('TreeGrid').ej2_instances[0];
var exportProperties = {
    isCollapsedStatePersist: true,
    fileName: 'TreeGrid_WithCollapsedState.xlsx'
};
treegrid.excelExport(exportProperties);
```

**Result:** If a parent row is collapsed in the grid, it will appear collapsed in the Excel file.

---

## Headers and Footers

Add custom headers and footers to the exported Excel document:

```javascript
var excelExportProperties = {
    fileName: 'TreeGrid_WithHeader.xlsx',
    header: {
        headerRows: 2,
        rows: [
            {
                cells: [{
                    colSpan: 4,
                    value: 'Project Task Report',
                    style: { bold: true, fontSize: 14, fontColor: '#FFFFFF', backColor: '#4472C4' }
                }]
            },
            {
                cells: [{
                    colSpan: 4,
                    value: 'Generated: ' + new Date().toDateString(),
                    style: { fontSize: 10, italic: true }
                }]
            }
        ]
    },
    footer: {
        footerRows: 1,
        rows: [
            {
                cells: [{
                    colSpan: 4,
                    value: 'Confidential - Internal Use Only',
                    style: { italic: true, fontColor: '#FF0000' }
                }]
            }
        ]
    }
};
document.getElementById('TreeGrid').ej2_instances[0].excelExport(excelExportProperties);
```

---

## Cell Style Customization

Use the `excelQueryCellInfo` event to customize individual cell styles in the exported Excel file:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowExcelExport="true"
              toolbar="@(new List<string>() { "ExcelExport" })"
              excelQueryCellInfo="onExcelQueryCellInfo">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
function onExcelQueryCellInfo(args) {
    // Highlight Duration > 5 days in red
    if (args.column.field === 'Duration' && args.value > 5) {
        args.style = {
            fontColor: '#FFFFFF',
            bold: true,
            backColor: '#FF0000'
        };
    }

    // Highlight High priority in green
    if (args.column.field === 'Priority' && args.value === 'High') {
        args.style = {
            backColor: '#00B050',
            bold: true
        };
    }
}
</script>
```

**Style properties:**
- `fontColor` - Text color (e.g., '#FF0000' for red)
- `backColor` - Background color
- `bold` - Make text bold
- `italic` - Make text italic
- `fontSize` - Font size
- `fontName` - Font name (e.g., 'Calibri', 'Arial')

---

## Custom Aggregates

Handle `excelAggregateQueryCellInfo` to customize aggregate (summary) cell values in the exported Excel:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowExcelExport="true"
              excelAggregateQueryCellInfo="onExcelAggregateCell">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
function onExcelAggregateCell(args) {
    // Customize aggregate row labels
    if (args.column.field === 'TaskName') {
        args.value = 'Total Duration:';
    }
    
    // Format aggregate values
    if (args.column.field === 'Duration') {
        args.value = args.value + ' days';
        args.style = { bold: true, backColor: '#E7E6E6' };
    }
}
</script>
```

---

## Server-Side Export

Handle Excel export on the server for large datasets or complex processing:

**Client-side trigger:**
```javascript
document.getElementById('TreeGrid').ej2_instances[0].serverExcelExport(
    '/api/treegrid/excelexport'
);
```

**Server-side controller (C#):**
```csharp
[HttpPost]
public IActionResult ExcelExport(string gridModel)
{
    GridExcelExport exportObject = new GridExcelExport();
    TreeGridExcelExportProperties exportProperties = new TreeGridExcelExportProperties();
    
    // Set custom filename
    exportProperties.FileName = "TreeGrid_ServerExport.xlsx";
    
    // Get data from database or ViewBag
    List<TaskModel> data = TreeData.GetDefaultData();
    
    // Export and return Excel file
    return exportObject.ExcelExport<TaskModel>(exportProperties, data);
}
```

**Benefits of server-side export:**
- Handle datasets larger than browser memory
- Access server-side data without sending to client
- Apply server-side business logic to export
- More control over file generation
