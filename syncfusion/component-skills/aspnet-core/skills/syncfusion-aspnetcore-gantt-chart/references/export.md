````markdown
# Export (Excel, CSV & PDF) — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents

### Excel & CSV Export
- [Excel Export — Basic Setup](#excel-export--basic-setup)
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
- [PDF Export — Basic Setup](#pdf-export--basic-setup)
- [PDF Export Properties](#pdf-export-properties)
- [PDF Export File Name](#pdf-export-file-name)
- [Page Orientation and Size](#page-orientation-and-size)
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
- [PDF Header and Footer](#pdf-header-and-footer)
- [Blob Export](#blob-export)
- [Export Multiple Gantt Charts to Single PDF](#export-multiple-gantt-charts-to-single-pdf)

### Programmatic Export
- [Programmatic Export](#programmatic-export)

---

## Excel Export — Basic Setup

Enable Excel export by adding `allowExcelExport="true"` and the `ExcelExport` and/or `CsvExport` toolbar buttons. Handle the `toolbarClick` event to call `excelExport()` or `csvExport()`:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport", "CsvExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        if (args.item.id === 'GanttContainer_excelexport') {
            ganttObj.excelExport();
        }
        if (args.item.id === 'GanttContainer_csvexport') {
            ganttObj.csvExport();
        }
    }
</script>
```

> The toolbar item ID is formed as `{gantt-id}_excelexport` and `{gantt-id}_csvexport`. If the Gantt `id` is `GanttContainer`, use `GanttContainer_excelexport` and `GanttContainer_csvexport`.

---

## CSV Export

CSV export works the same way as Excel export — enable `allowExcelExport="true"` and call `csvExport()`:

```javascript
function toolbarClick(args) {
    var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
    if (args.item.id === 'GanttContainer_csvexport') {
        ganttObj.csvExport();
    }
}
```

> CSV export also uses the `allowExcelExport` property — **not** a separate `allowCsvExport`. The same Excel export license covers CSV.

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

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport", "CsvExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        if (args.item.id === 'GanttContainer_excelexport') {
            ganttObj.excelExport({ fileName: 'Gantt.xlsx' });
        }
        if (args.item.id === 'GanttContainer_csvexport') {
            ganttObj.csvExport({ fileName: 'Gantt.csv' });
        }
    }
</script>
```

---

## Export Hidden Columns

To include hidden columns in the Excel/CSV export, set `includeHiddenColumn: true`:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport", "CsvExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        if (args.item.id === 'GanttContainer_excelexport') {
            ganttObj.excelExport({ includeHiddenColumn: true });
        }
        if (args.item.id === 'GanttContainer_csvexport') {
            ganttObj.csvExport({ includeHiddenColumn: true });
        }
    }
</script>
```

---

## Show or Hide Columns on Export

Temporarily change column visibility for export only — show or hide specific columns during the export and revert them back in `excelExportComplete`:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick"
           excelExportComplete="excelExportComplete">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        if (args.item.id === 'GanttContainer_excelexport') {
            // Show a hidden column during export
            ganttObj.treeGrid.grid.columns[1].visible = true;
            // Hide a visible column during export
            ganttObj.treeGrid.grid.columns[4].visible = false;
            ganttObj.excelExport();
        }
    }
    function excelExportComplete() {
        // Revert visibility after export
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        ganttObj.treeGrid.grid.columns[1].visible = false;
        ganttObj.treeGrid.grid.columns[4].visible = true;
    }
</script>
```

> Access columns via `ganttObj.treeGrid.grid.columns[index]` and toggle the `.visible` property before calling `excelExport()`. Revert in the `excelExportComplete` event.

---

## Cell Customization — excelQueryCellInfo

Use the `excelQueryCellInfo` event to customize individual cell styles based on data values:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick"
           excelQueryCellInfo="excelQueryCellInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_excelexport') {
            document.getElementById('GanttContainer').ej2_instances[0].excelExport();
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

Apply a custom theme to header, record, and caption rows in the Excel export:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_excelexport') {
            var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
            var exportProps = {
                theme: {
                    header: {
                        fontName: 'Segoe UI',
                        fontColor: '#666666'
                    },
                    record: {
                        fontName: 'Segoe UI',
                        fontColor: '#666666'
                    },
                    caption: {
                        fontName: 'Segoe UI',
                        fontColor: '#666666'
                    }
                }
            };
            ganttObj.excelExport(exportProps);
        }
    }
</script>
```

---

## Header and Footer

Add custom header rows and footer rows to the Excel export using the `header` and `footer` properties:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_excelexport') {
            var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
            var exportProps = {
                header: {
                    headerRows: 7,
                    rows: [
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'Syncfusion ASP.NET Core Gantt Chart',
                                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true }
                            }]
                        },
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'https://www.syncfusion.com',
                                style: { fontColor: '#C67878', fontSize: 12, hAlign: 'Center', bold: true },
                                hyperlink: { target: 'https://www.syncfusion.com', displayText: 'Visit Website' }
                            }]
                        },
                        { cells: [{ colSpan: 4, value: '' }] },
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'Tel: 0000000000',
                                style: { fontSize: 12, hAlign: 'Center', bold: true }
                            }]
                        },
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'Email: sales@syncfusion.com',
                                style: { fontSize: 12, hAlign: 'Center', bold: true },
                                hyperlink: { target: 'mailto:sales@syncfusion.com', displayText: 'Send Email' }
                            }]
                        },
                        { cells: [{ colSpan: 4, value: '' }] },
                        { cells: [{ colSpan: 4, value: '' }] }
                    ]
                },
                footer: {
                    footerRows: 2,
                    rows: [
                        { cells: [{ colSpan: 4, value: '', style: { hAlign: 'Center', bold: true } }] },
                        {
                            cells: [{
                                colSpan: 4,
                                value: 'Thank you for using Syncfusion Gantt Chart',
                                style: { hAlign: 'Center', bold: true }
                            }]
                        }
                    ]
                }
            };
            ganttObj.excelExport(exportProps);
        }
    }
</script>
```

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

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_excelexport') {
            var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
            // Export only the second record from the data source
            var exportProps = {
                dataSource: [ganttObj.dataSource[1]]
            };
            ganttObj.excelExport(exportProps);
        }
    }
</script>
```

---

## Export Multiple Gantt Charts to Single Excel

Export two Gantt chart instances into one Excel file — either appended to the same sheet or on separate sheets:

**Append to Same Sheet:**

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="300px"
           allowExcelExport="true"
           toolbar="@(new List<string>() { "ExcelExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
<ejs-gantt id='GanttContainer1' dataSource="ViewBag.dataSource" height="300px"
           allowExcelExport="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_excelexport') {
            var firstGantt = document.getElementById('GanttContainer').ej2_instances[0];
            var secondGantt = document.getElementById('GanttContainer1').ej2_instances[0];
            // Pass true as 2nd argument so excelExport returns a Promise with the workbook
            firstGantt.excelExport({
                multipleExport: { type: 'AppendToSheet', blankRows: 2 }
            }, true).then(function(workbook) {
                secondGantt.excelExport({
                    multipleExport: { type: 'AppendToSheet', blankRows: 2 }
                }, false, workbook);
            });
        }
    }
</script>
```

**Export to New Sheet:**

```javascript
firstGantt.excelExport(
    { multipleExport: { type: 'NewSheet' } }, true
).then(function(workbook) {
    secondGantt.excelExport(
        { multipleExport: { type: 'NewSheet' } }, false, workbook
    );
});
```

> `excelExport(props, isMultipleExport, workbook)` — when `isMultipleExport` is `true`, it returns a Promise resolving to the workbook. Pass this workbook to the second Gantt's export call with `isMultipleExport: false` to finalize and download.

---

## PDF Export — Basic Setup

Enable PDF export with `allowPdfExport="true"` and the `PdfExport` toolbar button:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0].pdfExport();
        }
    }
</script>
```

> The PDF toolbar item ID is `{gantt-id}_pdfexport`.

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
| `ganttStyle` | object | Full custom styling (see [Custom Theme](#custom-theme--ganttstyle)) |
| `pageOrientation` | string | `'Portrait'` (default) or `'Landscape'` |
| `pageSize` | string | `'Letter'`, `'A4'`, `'A3'`, etc. |
| `header` | object | Custom content above the Gantt in the PDF |
| `footer` | object | Custom content below the Gantt in the PDF |
| `enableFooter` | bool | Set `false` to disable the default footer |

---

## PDF Export File Name

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ fileName: 'Gantt.pdf' });
        }
    }
</script>
```

---

## Page Orientation and Size

```javascript
function toolbarClick(args) {
    if (args.item.id === 'GanttContainer_pdfexport') {
        document.getElementById('GanttContainer').ej2_instances[0].pdfExport({
            pageOrientation: 'Landscape',
            pageSize: 'A3'
        });
    }
}
```

---

## Export Type — Current View Data

Export only the currently visible (filtered/sorted) rows rather than all data:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ exportType: 'CurrentViewData' });
        }
    }
</script>
```

---

## Export Hidden Columns (PDF)

Include hidden columns in the PDF export:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ includeHiddenColumn: true });
        }
    }
</script>
```

---

## Show or Hide Columns on PDF Export

Temporarily change column visibility for PDF export only — restore visibility in `beforePdfExport` and revert in the export complete handler:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick"
           beforePdfExport="beforePdfExport">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0].pdfExport();
        }
    }
    function beforePdfExport(args) {
        var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
        // Show column index 3 during export, hide column index 4
        ganttObj.treeGrid.columns[3].visible = true;
        ganttObj.treeGrid.columns[4].visible = false;
    }
</script>
```

---

## Show Predecessor Lines

Render dependency connector lines in the exported PDF:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress"
            dependency="Dependency" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ showPredecessorLines: true });
        }
    }
</script>
```

---

## Fit to Width

Scale the Gantt chart to fit within a single PDF page width:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ fitToWidthSettings: { isFitToWidth: true } });
        }
    }
</script>
```

---

## Built-in Themes

Apply one of Syncfusion's built-in PDF themes using the `theme` string property:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport({ theme: 'Fabric' });
        }
    }
</script>
```

Available theme values: `'Material'`, `'Fabric'`, `'Bootstrap'`, `'Bootstrap4'`

---

## Custom Theme — ganttStyle

Use the `ganttStyle` property for full control over PDF chart colors, fonts, and styles:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
            var exportProps = {
                ganttStyle: {
                    fontFamily: 1, // 0=Helvetica, 1=TimesRoman, 2=Courier, 3=Symbol
                    columnHeader: {
                        backgroundColor: new ej.pdfexport.PdfColor(179, 219, 255)
                    },
                    taskbar: {
                        taskColor:       new ej.pdfexport.PdfColor(240, 128, 128),
                        taskBorderColor: new ej.pdfexport.PdfColor(240, 128, 128),
                        progressColor:   new ej.pdfexport.PdfColor(205,  92,  92)
                    },
                    connectorLineColor: new ej.pdfexport.PdfColor(128, 0, 0),
                    footer: {
                        backgroundColor: new ej.pdfexport.PdfColor(205, 92, 92)
                    },
                    timeline: {
                        backgroundColor: new ej.pdfexport.PdfColor(179, 219, 255),
                        padding: new ej.pdfexport.PdfPaddings(5, 5, 5, 5)
                    },
                    label: {
                        fontColor: new ej.pdfexport.PdfColor(128, 0, 0)
                    },
                    cell: {
                        backgroundColor: new ej.pdfexport.PdfColor(240, 248, 255),
                        fontColor:       new ej.pdfexport.PdfColor(0, 0, 0),
                        borderColor:     new ej.pdfexport.PdfColor(179, 219, 255)
                    },
                    eventMarker: {
                        offset: 10,
                        borderColor: new ej.pdfexport.PdfPen(
                            new ej.pdfexport.PdfColor(0, 255, 0),
                            { dashStyle: ej.pdfexport.PdfDashStyle.Dash }
                        )
                    },
                    holiday: {
                        backgroundColor: new ej.pdfexport.PdfColor(255, 255, 0),
                        fontFamily: ej.pdfexport.PdfFontFamily.TimesRoman
                    }
                }
            };
            ganttObj.pdfExport(exportProps);
        }
    }
</script>
```

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

Use the `pdfQueryCellInfo` event to customize individual grid cell styles in the PDF:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick"
           pdfQueryCellInfo="pdfQueryCellInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0].pdfExport();
        }
    }
    function pdfQueryCellInfo(args) {
        if (args.column.field === 'Progress' && args.value > 80) {
            args.style = {
                backgroundColor: new ej.pdfexport.PdfColor(240, 128, 128) // Red for high progress
            };
        }
    }
</script>
```

> Use `new ej.pdfexport.PdfColor(r, g, b)` for PDF colors. The `args.style.backgroundColor` accepts a `PdfColor` instance.

---

## Timeline Cell Customization — pdfQueryTimelineCellInfo

Use the `pdfQueryTimelineCellInfo` event to customize timeline header cells in the PDF:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick"
           pdfQueryTimelineCellInfo="pdfQueryTimelineCellInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0].pdfExport();
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

Use the `pdfQueryTaskbarInfo` event to customize individual taskbar colors in the PDF:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick"
           pdfQueryTaskbarInfo="pdfQueryTaskbarInfo">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            document.getElementById('GanttContainer').ej2_instances[0].pdfExport();
        }
    }
    function pdfQueryTaskbarInfo(args) {
        if (args.data.Progress < 50) {
            args.taskbar.progressColor   = new ej.pdfexport.PdfColor(205, 92, 92);  // Red progress
            args.taskbar.taskColor       = new ej.pdfexport.PdfColor(240, 128, 128); // Light red bar
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

## PDF Header and Footer

Add custom content above and below the Gantt chart in the PDF using `header` and `footer` content items:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];
            var exportProps = {
                header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                        {
                            type: 'Text',
                            value: 'Gantt Chart Export',
                            position: { x: 0, y: 50 },
                            style: { textBrushColor: '#000000', fontSize: 13 }
                        },
                        {
                            type: 'Line',
                            style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
                            points: { x1: 0, y1: 4, x2: 685, y2: 4 }
                        },
                        {
                            type: 'Image',
                            src: 'data:image/png;base64,...', // base64 image string
                            position: { x: 40, y: 10 },
                            size: { height: 100, width: 250 }
                        },
                        {
                            type: 'PageNumber',
                            pageNumberType: 'Arabic',
                            format: 'Page {$current} of {$total}',
                            position: { x: 0, y: 25 },
                            style: { textBrushColor: '#ffff00', fontSize: 15, hAlign: 'Center' }
                        }
                    ]
                },
                footer: {
                    fromBottom: 160,
                    height: 150,
                    contents: [
                        {
                            type: 'Text',
                            value: 'Thank you for using Syncfusion Gantt Chart',
                            position: { x: 0, y: 40 },
                            style: { textBrushColor: '#000000', fontSize: 13 }
                        },
                        {
                            type: 'Line',
                            style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
                            points: { x1: 0, y1: 4, x2: 685, y2: 4 }
                        }
                    ]
                }
            };
            ganttObj.pdfExport(exportProps);
        }
    }
</script>
```

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
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="450px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick"
           pdfExportComplete="pdfExportComplete">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            // Pass true as 4th parameter to return blob instead of auto-downloading
            document.getElementById('GanttContainer').ej2_instances[0]
                .pdfExport(null, null, null, true);
        }
    }
    function pdfExportComplete(e) {
        // e.blobData contains the exported PDF as a Blob
        e.blobData.then(function(blobData) {
            var url = URL.createObjectURL(blobData);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'Gantt.pdf';
            link.click();
            URL.revokeObjectURL(url);
        });
    }
</script>
```

> `pdfExport(exportProps, isMultipleExport, pdfDoc, returnBlobData)` — pass `true` as the 4th argument. The `pdfExportComplete` event fires with `e.blobData` (a Promise resolving to a Blob).

---

## Export Multiple Gantt Charts to Single PDF

Combine two Gantt chart instances into one PDF document using a promise chain:

```cshtml
<ejs-gantt id='GanttContainer' dataSource="ViewBag.dataSource" height="300px"
           allowPdfExport="true"
           toolbar="@(new List<string>() { "PdfExport" })"
           toolbarClick="toolbarClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
<ejs-gantt id='GanttContainer1' dataSource="ViewBag.dataSource" height="300px"
           allowPdfExport="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>

<script>
    function toolbarClick(args) {
        if (args.item.id === 'GanttContainer_pdfexport') {
            var firstGantt  = document.getElementById('GanttContainer').ej2_instances[0];
            var secondGantt = document.getElementById('GanttContainer1').ej2_instances[0];
            // Export first Gantt with isMultipleExport=true to get the pdfDoc
            firstGantt.pdfExport({}, true).then(function(pdfDoc) {
                // Pass pdfDoc to second Gantt; isMultipleExport=false finalizes and downloads
                secondGantt.pdfExport({}, false, pdfDoc);
            });
        }
    }
</script>
```

> `pdfExport(props, isMultipleExport, pdfDoc)` — when `isMultipleExport` is `true`, the method returns a Promise resolving to a PDF document object. Pass this to the next Gantt's `pdfExport` with `isMultipleExport: false` to finalize and trigger the file download.

---

## Programmatic Export

Trigger any export without a toolbar button — call the export methods directly from custom actions:

```javascript
var ganttObj = document.getElementById('GanttContainer').ej2_instances[0];

// Excel export
ganttObj.excelExport({ fileName: 'Gantt.xlsx' });

// CSV export
ganttObj.csvExport({ fileName: 'Gantt.csv' });

// PDF export
ganttObj.pdfExport({ fileName: 'Gantt.pdf' });

// PDF export with multiple options
ganttObj.pdfExport({
    fileName: 'Gantt.pdf',
    fitToWidthSettings: { isFitToWidth: true },
    showPredecessorLines: true,
    theme: 'Material'
});
```

**Export events for hooking into the export lifecycle:**

| Event | Fires when |
|---|---|
| `beforeExcelExport` | Before Excel/CSV export begins — modify properties |
| `excelExportComplete` | After Excel/CSV export finishes — restore column visibility |
| `beforePdfExport` | Before PDF export begins — modify properties or column visibility |
| `pdfExportComplete` | After PDF export finishes — access `e.blobData` for blob export |
````
ument.getElementById('Gantt').ej2_instances[0];

// Excel export
gantt.excelExport({ fileName: 'schedule.xlsx' });

// CSV export
gantt.csvExport({ fileName: 'schedule.csv' });

// PDF export
gantt.pdfExport({ fileName: 'schedule.pdf' });
```
