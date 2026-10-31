# Exporting Data from Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Export to Excel](#export-to-excel)
- [Export to PDF](#export-to-pdf)
- [Export to CSV](#export-to-csv)
- [Export Templates](#export-templates)
- [Export Events](#export-events)

## When to Use This

Use data export features when you need to:
- Generate reports from tree grid data
- Share data with external systems or users
- Create offline copies of hierarchical data
- Archive grid data for record keeping
- Export filtered or selected data subsets

## Export to Excel

### Basic Excel Export

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .Toolbar(new List<string> { "ExcelExport" })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

Click "ExcelExport" to export grid data to Excel with hierarchy preserved.

### Programmatic Excel Export

```html
<button onclick="exportToExcel()">Export</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function exportToExcel() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.excelExport();
}
</script>
```

### Custom Excel Export Configuration

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .BeforeExcelExport("beforeExcelExport")
    .Toolbar(new List<string> { "ExcelExport" })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Budget").Format("C2").Width("120").Add();
    })
    .Render()

<script>
function beforeExcelExport(args) {
    // Set file name
    args.fileName = 'TreeGridExport_' + new Date().getTime() + '.xlsx';
    
    // Customize export properties
    args.isCollapsedStateMaintained = true;  // Keep hierarchy
    
    console.log("Exporting to: " + args.fileName);
}
</script>
```

## Export to PDF

### Basic PDF Export

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "PdfExport" })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()
```

### Programmatic PDF Export

```html
<button onclick="exportToPDF()">Export PDF</button>

<script>
function exportToPDF() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.pdfExport();
}
</script>
```

### Custom PDF Configuration

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPdfExport(true)
    .BeforePdfExport("beforePdfExport")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function beforePdfExport(args) {
    // PDF Configuration
    args.fileName = 'TreeGrid_Report_' + new Date().toISOString().split('T')[0] + '.pdf';
    args.orientation = 'Portrait';  // Or 'Landscape'
    args.pageSize = 'A4';
    
    // Customize PDF
    args.isCollapsedStateMaintained = true;
}
</script>
```

## Export to CSV

### CSV Export

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .ActionComplete("onActionComplete")
    .Toolbar(new List<string> { "ExcelExport" })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function onActionComplete(args) {
    if (args.requestType === 'excel') {
        // Called after export
        console.log("Export completed");
    }
}

// Programmatic CSV export
function exportToCSV() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var csv = convertGridToCSV(grid.getCurrentViewRecords());
    downloadCSV(csv, 'treegrid-data.csv');
}

function convertGridToCSV(data) {
    var csv = 'ID,Task Name,Start Date,Duration\n';
    data.forEach(row => {
        csv += row.TaskID + ',' + row.TaskName + ',' + row.StartDate + ',' + row.Duration + '\n';
    });
    return csv;
}

function downloadCSV(csv, filename) {
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}
</script>
```

## Export Templates

### Custom Export Template

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .ExcelExportProperties(export =>
    {
        export.Columns(col =>
        {
            col.Field("TaskID").HeaderText("Task ID").Format("N0").Width(100).Add();
            col.Field("TaskName").HeaderText("Task Name").Width(200).Add();
            col.Field("Budget").HeaderText("Budget").Format("C2").Width(100).Add();
        });
    })
    .Toolbar(new List<string> { "ExcelExport" })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Budget").Format("C2").Width("120").Add();
    })
    .Render()
```

### Export with Filtered Data

```html
<button onclick="exportFiltered()">Export Filtered Data</button>

<script>
function exportFiltered() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Only export visible (filtered) rows
    var filteredRecords = grid.getCurrentViewRecords();
    var csv = 'ID,Task,Status\n';
    
    filteredRecords.forEach(record => {
        csv += record.TaskID + ',' + record.TaskName + ',' + record.Status + '\n';
    });
    
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'filtered-data.csv';
    a.click();
}
</script>
```

## Export Events

### Handle Export Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .BeforeExcelExport("beforeExport")
    .ExcelExportComplete("afterExport")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function beforeExport(args) {
    console.log("Export starting...");
    // Modify export data if needed
}

function afterExport(args) {
    console.log("Export completed!");
    alert("Data exported successfully!");
}
</script>
```
