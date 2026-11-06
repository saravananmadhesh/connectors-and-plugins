# Print, Excel Export, and iCalendar (ICS) in ASP.NET Core Scheduler

## Table of Contents
- [Overview](#overview)
- [Print](#print)
  - [Print Methods](#print-methods)
- [Excel Export](#excel-export)
  - [Excel Export Method](#excel-export-method)
  - [Customize Exported Fields](#customize-exported-fields)
- [ICS Calendar Export](#ics-calendar-export)
  - [exportToICalendar Method](#exporttoicalendar-method)
- [ICS Calendar Import](#ics-calendar-import)
  - [importICalendar Method](#importicalendar-method)

---

## Overview

The Syncfusion ASP.NET Core Scheduler provides built-in support for **printing**, **Excel export**, and **iCalendar (ICS) export/import**. These capabilities allow users to share schedules, archive data, and integrate with external calendar applications like Microsoft Outlook, Google Calendar, and Apple Calendar.

All of these operations are performed through public methods exposed on the Scheduler's client-side instance, which can be invoked from JavaScript event handlers or external UI controls (buttons, dropdowns, uploaders).

---

## Print

The Scheduler can be printed directly from the browser using the `print` method.

### Print Methods

The Scheduler exposes the `print` method, which can be called with or without options.

| Method | Signature | Description |
|--------|-----------|-------------|
| `print` | `print()` | Prints the Scheduler using the current view, height, and width |
| `print` | `print(options)` | Prints the Scheduler using the provided height, width, and selected date |

### Print Method Examples

```cshtml
@page

@using EJ2CoreSampleBrowser.Models
@using Syncfusion.EJ2

@{
    var appointments = new ScheduleData().GetScheduleData();
}

<div>
    <ejs-schedule id="schedule" width="100%" height="650px" selectedDate="new DateTime(DateTime.Today.Year, 1, 10)">
        <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
    </ejs-schedule>
</div>
<div>
    <ejs-button id="print-btn" cssClass="e-print-btn" iconCss="e-icons e-print" content="Print"></ejs-button>
</div>

<script type="text/javascript">
    document.getElementById("print-btn").addEventListener("click", function () {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        scheduleObj.print();
    })
</script>
```

## Excel Export

The Scheduler can export appointments to an Excel (`.xlsx`) file using the `exportToExcel` method. The exported file contains a single sheet with the appointment fields, and the field set, labels, and column widths can be customized.

### Excel Export Method

| Method | Signature | Description |
|--------|-----------|-------------|
| `exportToExcel` | `exportToExcel(exportValues)` | Exports the Scheduler appointments to an Excel file using the provided options |

### Customize Exported Fields

By default, all appointment fields are exported. To export only specific fields with custom column headers, pass the `fieldsInfo` array to `exportToExcel`.

| Export Option | Type | Description |
|---------------|------|-------------|
| `fieldsInfo` | `FieldInfoModel[]` | List of field definitions with `name` (data field) and `text` (column header) |
| `fileName` | `string` | Name of the exported file (defaults to `Schedule.xlsx`) |
| `includeOccurrences` | `boolean` | When `true`, exports expanded occurrences of recurring events |
| `customData` | `object[]` | Additional data to append to the export |

### Excel Export Examples

```cshtml
@page

@using EJ2CoreSampleBrowser.Models
@using Syncfusion.EJ2

@{
    var appointments = new ScheduleData().GetScheduleData();
}

<div>
    <ejs-schedule id="schedule" width="100%" height="650px" selectedDate="new DateTime(DateTime.Today.Year, 1, 10)" >
        <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
        <e-schedule-views>
            <e-schedule-view option="Week"></e-schedule-view>
        </e-schedule-views>
    </ejs-schedule>
</div>
<div>
    <ejs-button id="excel-export-btn"
                iconCss="e-icons e-export-excel"
                content="Excel Export"
                cssClass="e-excel-export-btn">
    </ejs-button>
</div>

<script type="text/javascript">
    document.getElementById("excel-export-btn").addEventListener("click", function () {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        var exportFields = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        var exportValues = { fieldsInfo: exportFields };
        scheduleObj.exportToExcel(exportValues);
    })
</script>
```

---

## ICS Calendar Export

The Scheduler appointments can be exported as a standard **iCalendar (`.ics`)** file using the `exportToICalendar` method. The resulting file can be opened in Microsoft Outlook, Google Calendar, Apple Calendar, and any other iCalendar-compliant application.

### exportToICalendar Method

| Method | Signature | Description |
|--------|-----------|-------------|
| `exportToICalendar` | `exportToICalendar(fileName?)` | Exports the Scheduler appointments to an `.ics` file. Optionally accepts a custom `fileName`; otherwise uses the default file name |

```cshtml
@page

@using EJ2CoreSampleBrowser.Models
@using Syncfusion.EJ2

@{
    var appointments = new ScheduleData().GetScheduleData();
}

<div>
    <ejs-schedule id="schedule" width="100%" height="650px" selectedDate="new DateTime(DateTime.Today.Year, 1, 10)">
        <e-schedule-views>
            <e-schedule-view option="Day"></e-schedule-view>
            <e-schedule-view option="Week"></e-schedule-view>
            <e-schedule-view option="WorkWeek"></e-schedule-view>
            <e-schedule-view option="Month"></e-schedule-view>
            <e-schedule-view option="Agenda"></e-schedule-view>
        </e-schedule-views>
        <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
    </ejs-schedule>
</div>
<div>
    <ejs-button id="ics-export" content="Export"></ejs-button>
</div>

<script type="text/javascript">
    document.getElementById("ics-export").addEventListener('click', function () {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        scheduleObj.exportToICalendar();
    });
</script>
```

---

## ICS Calendar Import

The Scheduler can import appointments from a standard **iCalendar (`.ics`)** file using the `importICalendar` method. This is typically wired to a file uploader's `selected` event so that users can pick a `.ics` file from their device and load it into the Scheduler.

### importICalendar Method

| Method | Signature | Description |
|--------|-----------|-------------|
| `importICalendar` | `importICalendar(file)` | Imports appointments from the provided iCalendar (`.ics`) file into the Scheduler |

### Import Scenarios

| Use Case | Recommended Pattern | Description |
|----------|---------------------|-------------|
| Import from file picker | `ej2-uploader` `selected` event | Let users browse and select an `.ics` file from their device |
| Validate file extension | `allowedExtensions=".ics"` | Restrict the Uploader to accept only `.ics` files |
| Disable multi-select | `multiple="false"` | Allow the user to import a single file at a time |
| Hide file list | `showFileList="false"` | Keep the property panel clean by hiding the Uploader's file list |

```cshtml
@page

@using EJ2CoreSampleBrowser.Models
@using Syncfusion.EJ2

@{
    var appointments = new ScheduleData().GetScheduleData();
}

<div>
    <ejs-schedule id="schedule" width="100%" height="650px" selectedDate="new DateTime(DateTime.Today.Year, 1, 10)">
        <e-schedule-views>
            <e-schedule-view option="Day"></e-schedule-view>
            <e-schedule-view option="Week"></e-schedule-view>
            <e-schedule-view option="WorkWeek"></e-schedule-view>
            <e-schedule-view option="Month"></e-schedule-view>
            <e-schedule-view option="Agenda"></e-schedule-view>
        </e-schedule-views>
        <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
    </ejs-schedule>
</div>
<div>
    <ejs-uploader id="ics-import" allowedExtensions=".ics" cssClass="calendar-import" showFileList="false" selected="onSelected" multiple="false">
        <e-uploader-buttons browse="Choose file"></e-uploader-buttons>
    </ejs-uploader>
</div>

<style>
    .calendar-import.e-upload {
        border: 0;
        padding-left: 0 !important;
    }

    .calendar-import.e-upload .e-file-select-wrap {
        padding: 0
    }

    .calendar-import.e-upload .e-file-select-wrap .e-file-drop {
        display: none;
    }
</style>

<script type="text/javascript">
    function onSelected(args) {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        scheduleObj.importICalendar(args.event.target.files[0]);
    }
</script>
```
