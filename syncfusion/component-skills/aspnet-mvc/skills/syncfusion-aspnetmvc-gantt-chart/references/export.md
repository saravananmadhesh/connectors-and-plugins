# Excel & PDF Export – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents

### Excel & CSV Export
- [Excel Export](#excel-export)
- [CSV Export](#csv-export)
- [Excel Export Properties](#excel-export-properties)
- [Export File Name](#export-file-name)
- [Export Hidden Columns](#export-hidden-columns)
- [Show or Hide Columns on Export](#show-or-hide-columns-on-export)
- [Cell Customization — excelQueryCellInfo](#cell-customization--excelquerycellinfo)
- [Theme Customization](#theme-customization)
- [Header and Footer](#header-and-footer)
- [Custom Data Source](#custom-data-source)
- [Export Multiple Gantt Charts to Single Excel](#export-multiple-gantt-charts-to-single-excel)

### PDF Export
- [PDF Export](#pdf-export)
- [PDF Export Properties](#pdf-export-properties)
- [PDF Export File Name](#pdf-export-file-name)
- [Page Orientation and Size](#page-orientation-and-size)
- [How to Change Page Size](#how-to-change-page-size)
- [Export Type — Current View Data](#export-type--current-view-data)
- [Export Hidden Columns (PDF)](#export-hidden-columns-pdf)
- [Show or Hide Columns on PDF Export](#show-or-hide-columns-on-pdf-export)
- [Show Predecessor Lines](#show-predecessor-lines)
- [Fit to Width](#fit-to-width)
- [Built-in Themes](#built-in-themes)
- [Custom Theme — ganttStyle](#custom-theme--ganttstyle)
- [Cell Customization — pdfQueryCellInfo](#cell-customization--pdfquerycellinfo)
- [Timeline Cell Customization — pdfQueryTimelineCellInfo](#timeline-cell-customization--pdfquerytimelinecellinfo)
- [Taskbar Customization — pdfQueryTaskbarInfo](#taskbar-customization--pdfquerytaskbarinfo)
- [Customize Split Taskbar Segment Colors in PDF](#customize-split-taskbar-segment-colors-in-pdf)
- [PDF Header and Footer](#pdf-header-and-footer)
- [Blob Export](#blob-export)
- [Export Multiple Gantt Charts to Single PDF](#export-multiple-gantt-charts-to-single-pdf)
- [Exporting with Template](#exporting-with-template)
  - [Exporting with Column Template](#exporting-with-column-template)
  - [Exporting with Taskbar Template](#exporting-with-taskbar-template)
  - [Exporting with Task Label Template](#exporting-with-task-label-template)
  - [Exporting with Header Template](#exporting-with-header-template)

### Other
- [Export via Toolbar](#export-via-toolbar)
- [Export Events](#export-events)
- [Programmatic Export](#programmatic-export)

---

## Excel Export

Enable and trigger Excel export:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowExcelExport(true)
    .Toolbar(new List<string> { "ExcelExport" })
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') {
        gantt.excelExport();
    }
}
</script>
```

> The toolbar item ID is formed as `{gantt-id}_excelexport`. If the Gantt `id` is `gantt`, use `gantt_excelexport`.

Export programmatically (without toolbar):

```javascript
var gantt = document.getElementById('gantt').ej2_instances[0];
gantt.excelExport();
```

---

## CSV Export

CSV export works the same way as Excel export — enable `.AllowExcelExport(true)` and call `csvExport()`:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowExcelExport(true)
    .Toolbar(new List<string> { "CsvExport" })
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_csvexport') {
        gantt.csvExport();
    }
}
</script>
```

> CSV export uses `.AllowExcelExport(true)` — **not** a separate `AllowCsvExport`. The same Excel export license covers CSV. The toolbar item ID is `{gantt-id}_csvexport`.

---

## Excel Export Properties

Pass an `ExcelExportProperties` object to `excelExport()` to customize the output:

| Property | Type | Description |
|---|---|---|
| `fileName` | string | Output file name (e.g., `'Gantt.xlsx'`) |
| `includeHiddenColumn` | bool | Include hidden columns in the export |
| `dataSource` | array | Custom data source to export instead of Gantt data |
| `theme` | object | Custom header/record/caption cell styles |
| `header` | object | Custom header rows above the column headers |
| `footer` | object | Custom footer rows below the data |

---

## Export File Name

Pass `fileName` in the export properties to set a custom output file name:

```javascript
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') {
        gantt.excelExport({ fileName: 'Gantt.xlsx' });
    }
    if (args.item.id === 'gantt_csvexport') {
        gantt.csvExport({ fileName: 'Gantt.csv' });
    }
}
```

---

## Export Hidden Columns

To include hidden columns in the Excel/CSV export, set `includeHiddenColumn: true`:

```javascript
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') {
        gantt.excelExport({ includeHiddenColumn: true });
    }
    if (args.item.id === 'gantt_csvexport') {
        gantt.csvExport({ includeHiddenColumn: true });
    }
}
```

---

## Show or Hide Columns on Export

Temporarily change column visibility for export only — toggle before calling `excelExport()` and revert in the `ExcelExportComplete` event:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowExcelExport(true)
    .Toolbar(new List<string> { "ExcelExport" })
    .ToolbarClick("toolbarClick")
    .ExcelExportComplete("excelExportComplete")
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') {
        // Show a hidden column during export
        gantt.treeGrid.grid.columns[1].visible = true;
        gantt.treeGrid.grid.columns[4].visible = false;
        gantt.excelExport();
    }
}
function excelExportComplete() {
    // Revert visibility after export
    var gantt = document.getElementById('gantt').ej2_instances[0];
    gantt.treeGrid.grid.columns[1].visible = false;
    gantt.treeGrid.grid.columns[4].visible = true;
}
</script>
```

> Access columns via `ganttObj.treeGrid.grid.columns[index]` and toggle the `.visible` property before calling `excelExport()`. Revert in the `ExcelExportComplete` event.

---

## Cell Customization — excelQueryCellInfo

Use the `ExcelQueryCellInfo` event to customize individual cell styles based on data values:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowExcelExport(true)
    .Toolbar(new List<string> { "ExcelExport" })
    .ToolbarClick("toolbarClick")
    .ExcelQueryCellInfo("excelQueryCellInfo")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_excelexport') {
        document.getElementById('gantt').ej2_instances[0].excelExport();
    }
}
function excelQueryCellInfo(args) {
    if (args.column.field === 'Progress' && args.value > 80) {
        args.style = { backColor: '#A569BD' }; // Purple background for high progress
    }
}
</script>
```

**`excelQueryCellInfo` args properties:**

| Property | Description |
|---|---|
| `args.column.field` | Field name of the current cell's column |
| `args.value` | Cell value |
| `args.style` | Assign style object: `{ backColor, fontColor, bold, italic, fontSize }` |
| `args.data` | Full row data object |

---

## Theme Customization

Apply a custom theme to header, record, and caption rows in the Excel export via the `theme` property of `ExcelExportProperties`:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_excelexport') {
        var gantt = document.getElementById('gantt').ej2_instances[0];
        gantt.excelExport({
            theme: {
                header:  { fontColor: '#ffffff', backColor: '#1976d2', bold: true },
                record:  { fontColor: '#333333', backColor: '#f5f5f5' },
                caption: { fontColor: '#1976d2', backColor: '#e3f2fd' }
            }
        });
    }
}
```

---

## Header and Footer

Add custom header and footer rows to the Excel export using the `header` and `footer` properties.

**Header/Footer cell properties:**

| Property | Description |
|---|---|
| `colSpan` | Number of columns the cell spans |
| `value` | Text content |
| `style` | Style object: `{ fontColor, fontSize, hAlign, bold, italic }` |
| `hyperlink` | Link object: `{ target, displayText }` — use `mailto:` prefix for email links |

---

## Custom Data Source

Export a custom or filtered data set instead of the full Gantt data by passing `dataSource` in the export properties:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_excelexport') {
        var gantt = document.getElementById('gantt').ej2_instances[0];
        gantt.excelExport({ dataSource: customFilteredData });
    }
}
```

---

## Export Multiple Gantt Charts to Single Excel

Export two Gantt instances into one Excel file — appended to the same sheet or on separate sheets.

**Append to Same Sheet:**

```cshtml
@(Html.EJS().Gantt("GanttContainer1")
    .DataSource((IEnumerable<object>)ViewBag.FirstData)
    .Height("280px")
    .AllowExcelExport(true)
    .TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string>() { "ExcelExport" })
    .ToolbarClick("toolbarClick")
    .TreeColumnIndex(1)
    .ProjectStartDate("03/31/2019")
    .ProjectEndDate("04/14/2019")
    .Render())

@(Html.EJS().Gantt("GanttContainer2")
    .DataSource((IEnumerable<object>)ViewBag.FirstData)
    .Height("250px")
    .AllowExcelExport(true)
    .TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .TreeColumnIndex(1)
    .Render())

<script>
    function toolbarClick(args) {
        var firstGantt = document.getElementById("GanttContainer1").ej2_instances[0];
        var secondGantt = document.getElementById("GanttContainer2").ej2_instances[0];
        var appendExcelExportProperties = {
            multipleExport: { type: 'AppendToSheet', blankRows: 2 }
        };
        var firstGanttExport = firstGantt.excelExport(appendExcelExportProperties, true);
        firstGanttExport.then((fData) => {
            secondGantt.excelExport(appendExcelExportProperties, false, fData);
        });
    }
</script>
```

**Export to New Sheet:**

```javascript
var firstGantt = document.getElementById("GanttContainer1").ej2_instances[0];
var secondGantt = document.getElementById("GanttContainer2").ej2_instances[0];
var newSheetExcelExportProperties = {
    multipleExport: { type: 'NewSheet' }
};
var firstGanttExport = firstGantt.excelExport(newSheetExcelExportProperties, true);
firstGanttExport.then((fData) => {
    secondGantt.excelExport(newSheetExcelExportProperties, false, fData);
});
```

> `excelExport(props, isMultipleExport, workbook)` — when `isMultipleExport` is `true`, it returns a Promise resolving to the workbook. Pass this workbook to the second Gantt's export call with `isMultipleExport: false` to finalize and download. Use `multipleExport: { type: 'AppendToSheet', blankRows: N }` to control spacing between charts in the same sheet.

---

## Excel Export Customization

Pass an `ExcelExportProperties` object to customize the export:

```javascript
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') {
        var exportProps = {
            fileName: 'ProjectPlan.xlsx',
            includeHiddenColumn: true,        // export hidden columns too
            exportType: 'CurrentPage',         // 'AllPages' or 'CurrentPage'
            header: {
                headerRows: 1,
                rows: [
                    {
                        cells: [{
                            colSpan: 4,
                            value: 'Project Schedule Export',
                            style: { fontColor: '#ffffff', backColor: '#1976d2', bold: true, fontSize: 14, hAlign: 'Center' }
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
                            value: 'Exported on ' + new Date().toLocaleDateString(),
                            style: { italic: true, fontSize: 10 }
                        }]
                    }
                ]
            },
            theme: {
                header: { fontColor: '#ffffff', backColor: '#1976d2', bold: true },
                record: { fontColor: '#333333', backColor: '#f5f5f5' },
                caption: { fontColor: '#1976d2', backColor: '#e3f2fd' }
            }
        };
        gantt.excelExport(exportProps);
    }
}
```

Export as CSV instead of Excel:

```javascript
gantt.csvExport();
// or with properties:
gantt.csvExport({ fileName: 'tasks.csv' });
```

---

## PDF Export

Enable and trigger PDF export:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_pdfexport') {
        gantt.pdfExport();
    }
}
</script>
```

> The PDF toolbar item ID is `{gantt-id}_pdfexport`. If the Gantt `id` is `gantt`, use `gantt_pdfexport`.

---

## PDF Export Properties

Pass a `PdfExportProperties` object to `pdfExport()` to customize the output:

| Property | Type | Description |
|---|---|---|
| `fileName` | string | Output file name (e.g., `'Gantt.pdf'`) |
| `includeHiddenColumn` | bool | Include hidden columns in export |
| `exportType` | string | `'AllData'` (default) or `'CurrentViewData'` |
| `showPredecessorLines` | bool | Render dependency connector lines in PDF |
| `fitToWidthSettings` | object | `{ isFitToWidth: true }` to scale to page width |
| `theme` | string | Built-in theme: `'Material'`, `'Fabric'`, `'Bootstrap'`, `'Bootstrap4'` |
| `ganttStyle` | object | Full custom styling (see [Custom Theme — ganttStyle](#custom-theme--ganttstyle)) |
| `pageOrientation` | string | `'Portrait'` (default) or `'Landscape'` |
| `pageSize` | string | `'Letter'`, `'A4'`, `'A3'`, etc. |
| `header` | object | Custom content above the Gantt in the PDF |
| `footer` | object | Custom content below the Gantt in the PDF |
| `enableFooter` | bool | Set `false` to disable the default Syncfusion footer |

---

## PDF Export File Name

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({ fileName: 'Gantt.pdf' });
    }
}
```

---

## Page Orientation and Size

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({
            pageOrientation: 'Landscape',
            pageSize: 'A3'
        });
    }
}
```

---

## How to Change Page Size

Page size can be customized for the exported document using the `pageSize` property in `pdfExportProperties`.

**Supported page sizes:**

`Letter`, `Note`, `Legal`, `A0`, `A1`, `A2`, `A3`, `A5`, `A6`, `A7`, `A8`, `A9`, `B0`, `B1`, `B2`, `B3`, `B4`, `B5`, `Archa`, `Archb`, `Archc`, `Archd`, `Arche`, `Flsa`, `HalfLetter`, `Letter11x17`, `Ledger`

```cshtml
@(Html.EJS().Gantt("GanttContainer")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPdfExport(true)
    .TaskFields(ts => ts.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Toolbar(new List<string>() { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .TreeColumnIndex(1)
    .Render())

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        if (args.item.id === "GanttContainer_pdfexport") {
            var exportProperties = {
                pageSize: 'A0'
            };
            ganttObj.pdfExport(exportProperties);
        }
    }
</script>
```

> Pass any of the supported page size strings to `pageSize` in the export properties. The default page size is `Letter`.

---

## Export Type — Current View Data

Export only the currently visible (filtered/sorted) rows rather than all data:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({ exportType: 'CurrentViewData' });
    }
}
```

---

## Export Hidden Columns (PDF)

Include hidden columns in the PDF export:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({ includeHiddenColumn: true });
    }
}
```

---

## Show or Hide Columns on PDF Export

Temporarily change column visibility for PDF export only — restore visibility in `BeforePdfExport` and revert in the export complete handler:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .BeforePdfExport("beforePdfExport")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport();
    }
}
function beforePdfExport(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    // Show column index 3 during export, hide column index 4
    gantt.treeGrid.columns[3].visible = true;
    gantt.treeGrid.columns[4].visible = false;
}
</script>
```

---

## Show Predecessor Lines

Render dependency connector lines in the exported PDF:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({ showPredecessorLines: true });
    }
}
```

---

## Fit to Width

Scale the Gantt chart to fit within a single PDF page width:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({
            fitToWidthSettings: { isFitToWidth: true }
        });
    }
}
```

---

## Built-in Themes

Apply one of Syncfusion's built-in PDF themes using the `theme` string property:

```javascript
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport({ theme: 'Material' });
    }
}
```

Available theme values: `'Material'`, `'Fabric'`, `'Bootstrap'`, `'Bootstrap4'`

---

## Custom Theme — ganttStyle

Use the `ganttStyle` property for full control over PDF chart colors, fonts, and styles.

**`ganttStyle` sub-properties:**

| Property | Description |
|---|---|
| `fontFamily` | `0`=Helvetica, `1`=TimesRoman, `2`=Courier, `3`=Symbol |
| `columnHeader.backgroundColor` | Header row background (`PdfColor`) |
| `taskbar.taskColor` | Taskbar fill color (`PdfColor`) |
| `taskbar.taskBorderColor` | Taskbar border color (`PdfColor`) |
| `taskbar.progressColor` | Progress fill color (`PdfColor`) |
| `connectorLineColor` | Dependency line color (`PdfColor`) |
| `footer.backgroundColor` | Footer row background (`PdfColor`) |
| `timeline.backgroundColor` | Timeline header background (`PdfColor`) |
| `timeline.padding` | Timeline cell padding (`PdfPaddings`) |
| `label.fontColor` | Task label text color (`PdfColor`) |
| `cell.backgroundColor` | Grid cell background (`PdfColor`) |
| `cell.fontColor` | Grid cell text color (`PdfColor`) |
| `cell.borderColor` | Grid cell border color (`PdfColor`) |
| `eventMarker.borderColor` | Event marker border (`PdfPen` with dash style) |
| `holiday.backgroundColor` | Holiday cell background (`PdfColor`) |
| `holiday.fontFamily` | Holiday text font (`PdfFontFamily` enum) |

---

## Cell Customization — pdfQueryCellInfo

Use the `PdfQueryCellInfo` event to customize individual grid cell styles in the PDF:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .PdfQueryCellInfo("pdfQueryCellInfo")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport();
    }
}
function pdfQueryCellInfo(args) {
    if (args.column.field === 'Progress' && args.value > 80) {
        args.style = { backgroundColor: new ej.pdfexport.PdfColor(165, 105, 189) };
    }
}
</script>
```

> Use `new ej.pdfexport.PdfColor(r, g, b)` for PDF colors. The `args.style.backgroundColor` accepts a `PdfColor` instance.

---

## Timeline Cell Customization — pdfQueryTimelineCellInfo

Use the `PdfQueryTimelineCellInfo` event to customize timeline header cells in the PDF:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .PdfQueryTimelineCellInfo("pdfQueryTimelineCellInfo")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport();
    }
}
function pdfQueryTimelineCellInfo(args) {
    args.timelineCell.backgroundColor = new ej.pdfexport.PdfColor(240, 248, 255);
    args.timelineCell.fontColor        = new ej.pdfexport.PdfColor(0, 0, 128);
}
</script>
```

---

## Taskbar Customization — pdfQueryTaskbarInfo

Use the `PdfQueryTaskbarInfo` event to customize individual taskbar colors in the PDF:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .PdfQueryTaskbarInfo("pdfQueryTaskbarInfo")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        document.getElementById('gantt').ej2_instances[0].pdfExport();
    }
}
function pdfQueryTaskbarInfo(args) {
    if (args.data.Progress < 50) {
        args.taskbar.progressColor   = new ej.pdfexport.PdfColor(205, 92, 92);
        args.taskbar.taskColor       = new ej.pdfexport.PdfColor(240, 128, 128);
        args.taskbar.taskBorderColor = new ej.pdfexport.PdfColor(205, 92, 92);
    }
}
</script>
```

**`pdfQueryTaskbarInfo` args properties:**

| Property | Description |
|---|---|
| `args.data` | Row data object |
| `args.taskbar.taskColor` | Taskbar fill color (`PdfColor`) |
| `args.taskbar.taskBorderColor` | Taskbar border color (`PdfColor`) |
| `args.taskbar.progressColor` | Progress fill color (`PdfColor`) |

---

## Customize Split Taskbar Segment Colors in PDF

The PDF export feature allows you to customize the colors of individual split taskbar segments using the `taskSegmentStyles` property inside the `PdfQueryTaskbarInfo` event.

The `taskSegmentStyles` property is a collection of style objects indexed by segment position. Set the color, progress color, and border color for any specific segment by its index.

```cshtml
@(Html.EJS().Gantt("GanttContainer")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .GridLines(Syncfusion.EJ2.Gantt.GridLine.Both)
    .Height("450px")
    .AllowPdfExport(true)
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks"))
    .Segments("Segments")
    .EditSettings(es => es.AllowEditing(true).AllowDeleting(true).AllowTaskbarEditing(true).ShowDeleteConfirmDialog(true))
    .Columns(col => {
        col.Field("TaskId").Width(100).HeaderText("Task Id").Add();
        col.Field("TaskName").HeaderText("Task Name").Add();
        col.Field("StartDate").HeaderText("Start Date").Add();
        col.Field("EndDate").HeaderText("End Date").Add();
    })
    .Toolbar(new List<string>() { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .PdfQueryTaskbarInfo("pdfQueryTaskbarInfo")
    .QueryTaskbarInfo("queryTaskbarInfo")
    .Render())

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        ganttObj.pdfExport();
    }

    // Customize segment colors in the rendered Gantt chart
    function queryTaskbarInfo(args) {
        if (args.data.taskData.Segments) {
            var segmentIndex = args.taskbarElement.dataset.segmentIndex;
            if (Number(segmentIndex) === 1) {
                args.taskbarBgColor = 'red';
                args.taskbarBorderColor = 'black';
                args.progressBarBgColor = 'green';
            }
        }
    }

    // Customize segment colors in the exported PDF
    function pdfQueryTaskbarInfo(args) {
        if (args.taskbar.taskSegmentStyles) {
            args.taskbar.taskSegmentStyles[1].taskColor     = new ej.pdfexport.PdfColor(255, 0, 0);
            args.taskbar.taskSegmentStyles[1].progressColor = new ej.pdfexport.PdfColor(0, 128, 0);
            args.taskbar.taskSegmentStyles[1].taskBorderColor = new ej.pdfexport.PdfColor(0, 0, 0);
        }
    }
</script>
```

**`taskSegmentStyles[index]` properties:**

| Property | Type | Description |
|---|---|---|
| `taskColor` | `PdfColor` | Fill color of the segment taskbar |
| `progressColor` | `PdfColor` | Fill color of the progress bar within the segment |
| `taskBorderColor` | `PdfColor` | Border color of the segment taskbar |

> Check `args.taskbar.taskSegmentStyles` for existence before accessing by index, as it is only available for tasks that have split segments.

---

## PDF Header and Footer

Add custom content above and below the Gantt chart in the PDF using `header` and `footer` content items.

**PDF Header/Footer content types:**

| `type` | Required properties | Description |
|---|---|---|
| `Text` | `value`, `position: {x, y}`, `style: { textBrushColor, fontSize }` | Static text |
| `Line` | `style: { penColor, penSize, dashStyle }`, `points: {x1, y1, x2, y2}` | Horizontal/diagonal line |
| `Image` | `src` (base64 string), `position: {x, y}`, `size: {height, width}` | Embedded image |
| `PageNumber` | `pageNumberType`, `format` (`'Page {$current} of {$total}'`), `position`, `style: { hAlign }` | Auto page number |

**Header/Footer placement:**
- `header.fromTop` — distance from top of page (px)
- `footer.fromBottom` — distance from bottom of page (px)

> Set `enableFooter: false` in the export properties to disable Syncfusion's default PDF footer.

---

## Blob Export

Export the PDF as a Blob object for programmatic handling (e.g., upload to server, custom download):

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Progress("Progress").Child("SubTasks"))
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ToolbarClick("toolbarClick")
    .PdfExportComplete("pdfExportComplete")
    .Render()

<script>
function toolbarClick(args) {
    if (args.item.id === 'gantt_pdfexport') {
        // Pass true as 4th parameter to return blob instead of auto-downloading
        document.getElementById('gantt').ej2_instances[0].pdfExport({}, false, null, true);
    }
}
function pdfExportComplete(e) {
    // e.blobData contains the exported PDF as a Blob
    e.blobData.then(function(blobData) {
        var url = URL.createObjectURL(blobData);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Gantt.pdf';
        a.click();
        URL.revokeObjectURL(url);
    });
}
</script>
```

> `pdfExport(exportProps, isMultipleExport, pdfDoc, returnBlobData)` — pass `true` as the 4th argument. The `PdfExportComplete` event fires with `e.blobData` (a Promise resolving to a Blob).

---

## Export Multiple Gantt Charts to Single PDF

Combine two Gantt instances into one PDF document using a promise chain:

```javascript
var gantt1 = document.getElementById('gantt1').ej2_instances[0];
var gantt2 = document.getElementById('gantt2').ej2_instances[0];

gantt1.pdfExport({}, true).then(function(pdfDoc) {
    gantt2.pdfExport({}, false, pdfDoc);
});
```

> `pdfExport(props, isMultipleExport, pdfDoc)` — when `isMultipleExport` is `true`, the method returns a Promise resolving to a PDF document object. Pass this to the next Gantt's `pdfExport` with `isMultipleExport: false` to finalize and trigger the file download.

---

## Exporting with Template

### Exporting with Column Template

The PDF export functionality allows exporting Grid columns that include images, hyperlinks, and custom text to a PDF document using the `pdfQueryCellInfo` event.

Use the `args.image` property (with `base64` string) to embed images and the `args.hyperlink` property to embed links in exported cells.

> PDF Export supports base64 strings to export images.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPdfExport(true)
    .Height("450px")
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
        .Toolbar(new List<string>() { "PdfExport" })
        .ToolbarClick("toolbarClick")
        .PdfQueryCellInfo("pdfQueryCellInfo")
        .ResourceInfo("ResourceId"))
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Resources((IEnumerable<object>)ViewBag.projectResources)
    .Columns(col => {
        col.Field("TaskId").HeaderText("Task ID").Width(250).Add();
        col.Field("TaskName").HeaderText("Task Name").Width(250).Add();
        col.Field("ResourceId").HeaderText("Resources").Template("#columnTemplate").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .Render()

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        if (args.item.id === "GanttContainer_pdfexport") {
            ganttObj.pdfExport();
        }
    }
    function pdfQueryCellInfo(args) {
        if (args.column.headerText === 'Resources') {
            // Embed a base64 image for the Resources column
            args.image = {
                height: 40,
                width: 40,
                base64: args.data.taskData.resourcesImage
            };
        }
    }
</script>

<script type="text/x-jsrender" id="columnTemplate">
    ${if(ganttProperties.resourceNames)}
    <div class="image">
        <img src="${TaskID}.png" style="height:40px;width:40px" />
        <div style="display:inline-block;width:100%;position:relative;left:30px;top:-14px">
            ${ganttProperties.resourceNames}
        </div>
    </div>
    ${/if}
</script>
```

**`pdfQueryCellInfo` template export properties:**

| Property | Description |
|---|---|
| `args.image` | Object `{ base64, width, height }` — embeds an image in the cell |
| `args.hyperlink` | Object `{ target, displayText }` — embeds a hyperlink in the cell |
| `args.column.headerText` | Header text of the current column |
| `args.data` | Full row data object |

---

### Exporting with Taskbar Template

The PDF export functionality allows exporting taskbar templates that include images and text to a PDF document using the `pdfQueryTaskbarInfo` event. Taskbars can be customized for parent taskbar templates, child taskbar templates, and milestone templates.

Use the `args.taskbarTemplate.image` array and `args.taskbarTemplate.value` properties to embed images and text in the exported taskbars.

> PDF Export supports base64 strings to export images.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPdfExport(true)
    .Height("450px")
    .RowHeight(60)
    .TaskbarTemplate("#TaskbarTemplate")
    .ParentTaskbarTemplate("#ParentTaskbarTemplate")
    .MilestoneTemplate("#MilestoneTemplate")
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
        .Toolbar(new List<string>() { "PdfExport" })
        .ToolbarClick("toolbarClick")
        .PdfQueryTaskbarInfo("pdfQueryTaskbarInfo")
        .ResourceInfo("ResourceId"))
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Resources((IEnumerable<object>)ViewBag.projectResources)
    .Columns(col => {
        col.Field("TaskId").HeaderText("Task ID").Width(250).Add();
        col.Field("TaskName").HeaderText("Task Name").Width(250).Add();
        col.Field("ResourceId").HeaderText("Resources").Template("#columnTemplate").Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
    })
    .Render()

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        if (args.item.id === "GanttContainer_pdfexport") {
            ganttObj.pdfExport();
        }
    }
    function pdfQueryTaskbarInfo(args) {
        // Child taskbar
        if (!args.data.hasChildRecords) {
            if (args.data.ganttProperties.resourceNames) {
                args.taskbarTemplate.image = [{
                    width: 20, base64: args.data.taskData.resourcesImage, height: 20
                }];
            }
            args.taskbarTemplate.value = args.data.TaskName;
        }
        // Parent taskbar
        if (args.data.hasChildRecords) {
            if (args.data.ganttProperties.resourceNames) {
                args.taskbarTemplate.image = [{
                    width: 20, base64: args.data.taskData.resourcesImage, height: 20
                }];
            }
            args.taskbarTemplate.value = args.data.TaskName;
        }
        // Milestone
        if (args.data.ganttProperties.duration === 0) {
            if (args.data.ganttProperties.resourceNames) {
                args.taskbarTemplate.image = [{
                    width: 20, base64: args.data.taskData.resourcesImage, height: 20
                }];
            }
            args.taskbarTemplate.value = args.data.TaskName;
        }
    }
</script>
```

**`pdfQueryTaskbarInfo` template export properties:**

| Property | Description |
|---|---|
| `args.taskbarTemplate.image` | Array of `{ base64, width, height }` — images rendered inside the taskbar |
| `args.taskbarTemplate.value` | Text label rendered inside the taskbar |
| `args.data.hasChildRecords` | `true` for parent tasks |
| `args.data.ganttProperties.duration` | `0` for milestone tasks |

---

### Exporting with Task Label Template

The PDF export functionality allows exporting task label templates that include images and text to a PDF document using the `pdfQueryTaskbarInfo` event.

Use the `args.labelSettings` property to configure left label, right label, and task label content with both text and images.

> PDF Export supports base64 strings to export images.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPdfExport(true)
    .Height("450px")
    .RowHeight(60)
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
        .Toolbar(new List<string>() { "PdfExport" })
        .ToolbarClick("toolbarClick")
        .PdfQueryTaskbarInfo("pdfQueryTaskbarInfo")
        .ResourceInfo("ResourceId"))
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .LabelSettings(ls => ls.LeftLabel("#leftLabel").RightLabel("#rightLabel").TaskLabel("${Progress}%"))
    .ProjectStartDate("03/24/2019")
    .ProjectEndDate("05/04/2019")
    .Render()

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        if (args.item.id === "GanttContainer_pdfexport") {
            ganttObj.pdfExport();
        }
    }
    function pdfQueryTaskbarInfo(args) {
        // Set left label text: TaskName [Progress%]
        args.labelSettings.leftLabel.value =
            args.data.ganttProperties.taskName + '[' + args.data.ganttProperties.progress + ']';

        // Set right label with resource image and name
        if (args.data.ganttProperties.resourceNames) {
            args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
            args.labelSettings.rightLabel.image = [{
                base64: args.data.taskData.resourcesImage, width: 20, height: 20
            }];
        }

        // Set task label (shown inside taskbar)
        args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
    }
</script>
```

**`args.labelSettings` properties:**

| Property | Description |
|---|---|
| `labelSettings.leftLabel.value` | Text for the left label |
| `labelSettings.leftLabel.image` | Array of `{ base64, width, height }` for left label images |
| `labelSettings.rightLabel.value` | Text for the right label |
| `labelSettings.rightLabel.image` | Array of `{ base64, width, height }` for right label images |
| `labelSettings.taskLabel.value` | Text rendered inside the taskbar |

---

### Exporting with Header Template

The PDF export functionality allows exporting column header templates that include images and text to a PDF document using the `pdfColumnHeaderQueryCellInfo` event.

Use the `args.headerTemplate.image` array and `args.headerTemplate.value` properties to embed images and text in exported column headers.

> PDF Export supports base64 strings to export images.

```cshtml
@Html.EJS().Gantt("Gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPdfExport(true)
    .Height("450px")
    .RowHeight(60)
    .TaskFields(ts => ts
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Child("SubTasks")
        .Toolbar(new List<string>() { "PdfExport" })
        .ToolbarClick("toolbarClick")
        .PdfColumnHeaderQueryCellInfo("pdfColumnHeaderQueryCellInfo")
        .ResourceInfo("ResourceId"))
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .Resources((IEnumerable<object>)ViewBag.ProjectResources)
    .Columns(col => {
        col.Field("TaskName").HeaderText("Task ID").HeaderTemplate("#projectName").Width(250).Add();
        col.Field("StartDate").HeaderTemplate("#dateTemplate").Add();
    })
    .Render()

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById("GanttContainer").ej2_instances[0];
        if (args.item.id === "GanttContainer_pdfexport") {
            ganttObj.pdfExport();
        }
    }

    // Map each column field to its base64 header image
    var headerImages = {
        'TaskName': '<base64-string-for-taskname-icon>',
        'StartDate': '<base64-string-for-startdate-icon>'
    };

    function pdfColumnHeaderQueryCellInfo(args) {
        var base64 = headerImages[args.column.field];
        if (base64) {
            args.headerTemplate.image = [{ base64: base64, width: 20, height: 20 }];
            args.headerTemplate.value = args.column.field;
        }
    }
</script>
```

**`pdfColumnHeaderQueryCellInfo` args properties:**

| Property | Description |
|---|---|
| `args.column.field` | Field name of the column header being exported |
| `args.headerTemplate.image` | Array of `{ base64, width, height }` — images rendered in the header cell |
| `args.headerTemplate.value` | Text label rendered in the header cell |

---

## PDF Export Customization

```javascript
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_pdfexport') {
        var pdfProps = {
            fileName: 'ProjectPlan.pdf',
            fitToWidthSettings: {
                isFitToWidth: true    // scale columns to fit page width
            },
            pageOrientation: 'Landscape',    // 'Portrait' or 'Landscape'
            pageSize: 'A3',                  // 'A4', 'A3', 'Letter', etc.
            exportType: 'CurrentViewData',   // 'CurrentViewData' or 'AllData'
            header: {
                fromTop: 0,
                height: 130,
                contents: [{
                    type: 'Text',
                    value: 'Project Schedule',
                    position: { x: 200, y: 50 },
                    style: { textBrushColor: '#1976d2', fontSize: 20, bold: true }
                }]
            },
            footer: {
                fromBottom: 160,
                height: 150,
                contents: [{
                    type: 'PageNumber',
                    pageNumberType: 'Arabic',
                    format: 'Page {$current} of {$total}',
                    position: { x: 0, y: 25 },
                    style: { textBrushColor: '#666666', fontSize: 12 }
                }]
            }
        };
        gantt.pdfExport(pdfProps);
    }
}
```

---

## Export via Toolbar

Enable both Excel and PDF export with a combined toolbar:

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "ExcelExport", "PdfExport" })
    .ToolbarClick("toolbarClick")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function toolbarClick(args) {
    var gantt = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') { gantt.excelExport(); }
    if (args.item.id === 'gantt_pdfexport') { gantt.pdfExport(); }
}
</script>
```

---

## Multiple Gantt Export to Single File

Export data from two Gantt instances into a single Excel file:

```javascript
var gantt1 = document.getElementById('gantt1').ej2_instances[0];
var gantt2 = document.getElementById('gantt2').ej2_instances[0];

// First export returns a workbook promise, then append second Gantt
gantt1.excelExport({}, true).then(function(workbook) {
    gantt2.excelExport({}, false, workbook);
});
```

---

## Export Events

Handle export lifecycle events using the fluent API:

```cshtml
@Html.EJS().Gantt("gantt")
    .BeforeExcelExport("onBeforeExcelExport")
    .ExcelExportComplete("onExcelExportComplete")
    .BeforePdfExport("onBeforePdfExport")
    .PdfExportComplete("onPdfExportComplete")
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()

<script>
function onBeforeExcelExport(args) {
    console.log('About to export to Excel');
    // args.cancel = true to prevent export
}
function onExcelExportComplete(args) {
    console.log('Excel export done');
}
function onBeforePdfExport(args) {
    console.log('About to export to PDF');
}
function onPdfExportComplete(args) {
    console.log('PDF export done');
    // args.blobData available when returnBlobData = true
}
</script>
```

**Export events reference:**

| Event | Fluent API method | Fires when |
|---|---|---|
| `beforeExcelExport` | `.BeforeExcelExport()` | Before Excel/CSV export begins — modify properties or set `args.cancel = true` |
| `excelExportComplete` | `.ExcelExportComplete()` | After Excel/CSV export finishes — restore column visibility |
| `beforePdfExport` | `.BeforePdfExport()` | Before PDF export begins — modify properties or column visibility |
| `pdfExportComplete` | `.PdfExportComplete()` | After PDF export finishes — access `args.blobData` for blob export |

---

## Programmatic Export

Trigger any export without a toolbar button — call the export methods directly from custom actions:

```javascript
var gantt = document.getElementById('gantt').ej2_instances[0];

// Excel export
gantt.excelExport({ fileName: 'Gantt.xlsx' });

// CSV export
gantt.csvExport({ fileName: 'Gantt.csv' });

// PDF export
gantt.pdfExport({ fileName: 'Gantt.pdf' });

// PDF export with multiple options
gantt.pdfExport({
    fileName: 'Gantt.pdf',
    fitToWidthSettings: { isFitToWidth: true },
    showPredecessorLines: true,
    theme: 'Material'
});
```
