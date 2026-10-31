# Print and Export

## Table of Contents
1. [Export to Excel](#export-to-excel)
2. [Export to PDF](#export-to-pdf)
3. [Export to ICS](#export-to-ics)
4. [Custom Fields Export](#custom-fields-export)
5. [Export Options](#export-options)
6. [Import from ICS](#import-from-ics)
7. [Print Scheduler](#print-scheduler)

## Export to Excel

Export appointments to Excel file:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .ActionBegin("onActionBegin")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2019, 1, 10))
    .Render()
)

<style>
    .e-schedule .e-schedule-toolbar .e-icon-schedule-excel-export::before {
        content: '\e242';
    }

    .e-schedule-toolbar .e-toolbar-item.e-today {
        display: none !important;
    }
</style>

<script type="text/javascript">
    function onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            var exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
            };
            args.items.push(exportItem);
        }
    }

    function onExportClick() {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        scheduleObj.exportToExcel();
    }
</script>
```

### Server-Side Export
```csharp
[HttpPost]
public ActionResult ExportToExcel() {
    var events = _context.Events.ToList();
    
    using (ExcelEngine excelEngine = new ExcelEngine()) {
        IApplication application = excelEngine.Excel;
        IWorkbook workbook = application.Workbooks.Create(1);
        IWorksheet sheet = workbook.Worksheets[0];
        
        // Add headers
        sheet.Range["A1"].Text = "Subject";
        sheet.Range["B1"].Text = "Start Time";
        sheet.Range["C1"].Text = "End Time";
        sheet.Range["D1"].Text = "Location";
        
        // Add data
        int row = 2;
        foreach (var evt in events) {
            sheet.Range[$"A{row}"].Text = evt.Subject;
            sheet.Range[$"B{row}"].DateTime = evt.StartTime;
            sheet.Range[$"C{row}"].DateTime = evt.EndTime;
            sheet.Range[$"D{row}"].Text = evt.Location;
            row++;
        }
        
        MemoryStream stream = new MemoryStream();
        workbook.SaveAs(stream);
        
        return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Appointments.xlsx");
    }
}
```

## Export to PDF

Export to PDF format (Note: PDF export requires server-side implementation with Syncfusion PDF library):

```javascript
function onToolbarClick(args) {
    if (args.item.text === 'PdfExport' || args.item.id === 'schedule_pdf_export') {
        var schedule = document.getElementById('schedule').ej2_instances[0];
        // PDF export requires server-side processing
        window.location.href = '/Home/ExportToPdf';
    }
}
```

### Server-Side PDF Export
```csharp
[HttpPost]
public ActionResult ExportToPdf() {
    var events = _context.Events.ToList();
    
    Document document = new Document();
    Section section = document.AddSection();
    
    // Add title
    Paragraph title = section.AddParagraph("Scheduler Appointments");
    title.Format.Font.Size = 18;
    title.Format.Font.Bold = true;
    
    // Add table
    Table table = section.AddTable();
    table.AddColumn(new Unit(2, UnitType.Inch));
    table.AddColumn(new Unit(1.5, UnitType.Inch));
    table.AddColumn(new Unit(1.5, UnitType.Inch));
    table.AddColumn(new Unit(2, UnitType.Inch));
    
    // Header row
    Row headerRow = table.AddRow();
    headerRow.Cells[0].AddParagraph("Subject");
    headerRow.Cells[1].AddParagraph("Start Time");
    headerRow.Cells[2].AddParagraph("End Time");
    headerRow.Cells[3].AddParagraph("Location");
    
    // Data rows
    foreach (var evt in events) {
        Row row = table.AddRow();
        row.Cells[0].AddParagraph(evt.Subject);
        row.Cells[1].AddParagraph(evt.StartTime.ToString("g"));
        row.Cells[2].AddParagraph(evt.EndTime.ToString("g"));
        row.Cells[3].AddParagraph(evt.Location);
    }
    
    MemoryStream stream = new MemoryStream();
    document.Save(stream, SaveFormat.Pdf);
    
    return File(stream.ToArray(), "application/pdf", "Appointments.pdf");
}
```

## Export to ICS

Export as iCalendar format:

```cshtml
@using Syncfusion.EJ2.Schedule

@Html.EJS().Button("ics-export").Content("Export").Render()

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2019, 1, 10))
    .Render()
)

<script type="text/javascript">
    document.getElementById('ics-export').onclick = function () {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        scheduleObj.exportToICalendar();
    }
</script>
```

## Custom Fields Export

Include custom fields in export:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .Views(ViewBag.view)
    .ActionBegin("onActionBegin")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2019, 1, 10))
    .Render()
)

<style>
    .e-schedule .e-schedule-toolbar .e-icon-schedule-excel-export::before {
        content: '\e242';
    }
</style>

<script type="text/javascript">
    function onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            var exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
            };
            args.items.push(exportItem);
        }
    }

    function onExportClick() {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        var exportValues = {
            fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
        };
        scheduleObj.exportToExcel(exportValues);
    }
</script>
```

## Export Options

Configure export behavior:

```javascript
function exportScheduler(format) {
    var schedule = document.getElementById('schedule').ej2_instances[0];
    
    if (format === 'Excel') {
        var exportValues = {
            fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
        };
        schedule.exportToExcel(exportValues);
    } else if (format === 'ICS') {
        schedule.exportToICalendar();
    }
}
```

### Export Button Setup
```cshtml
@Html.EJS().Button("excel-export").Content("Export to Excel").Render()
@Html.EJS().Button("ics-export").Content("Export to ICS").Render()

<script type="text/javascript">
    document.getElementById('excel-export').onclick = function () {
        exportScheduler('Excel');
    }
    
    document.getElementById('ics-export').onclick = function () {
        exportScheduler('ICS');
    }
</script>
```

## Import from ICS

Import appointments from an iCalendar (.ics) file using the Syncfusion Uploader component together with the Scheduler's `importICalendar` method.

### Uploader Configuration

Restrict the Uploader to `.ics` files only, hide the file list and drag area, and hook the `Selected` event so the chosen file is forwarded to the Scheduler:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .Views(ViewData["view"])
    .EventSettings(new ScheduleEventSettings { DataSource = ViewData["datasource"] })
    .SelectedDate(new DateTime(DateTime.Today.Year, 1, 10))
    .Render()

@Html.EJS().Uploader("ics-import")
    .AllowedExtensions(".ics")
    .CssClass("calendar-import")
    .Multiple(false)
    .ShowFileList(false)
    .Buttons(new Syncfusion.EJ2.Inputs.UploaderButtonsProps { Browse = "Choose file" })
    .Selected("onSelected")
    .Render()
```

### Import Selected File

In the `Selected` handler, retrieve the Scheduler instance and call `importICalendar` with the selected file from the change event:

```javascript
function onSelected(args) {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.importICalendar(args.event.target.files[0]);
}
```


## Print Scheduler

Print the Scheduler using its built-in client-side `print` method. By default the Scheduler opens the browser's print dialog using its current dimensions and selected date.

### Basic Print

Call `print()` with no arguments to open the print dialog with the Scheduler's current configuration:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewData["datasource"] })
    .SelectedDate(new DateTime(DateTime.Today.Year, 1, 10))
    .Render()

@Html.EJS().Button("print-btn")
    .Content("Print")
    .IconCss("e-icons e-print")
    .CssClass("e-print-btn")
    .Render()
```

### Print Button Click Handler

Wire a click handler to the print button that resolves the Scheduler instance and invokes the `print` method:

```javascript
document.getElementById("print-btn").addEventListener("click", function () {
    var scheduleObj = document.getElementById('schedule').ej2_instances[0];
    scheduleObj.print();
});
```
