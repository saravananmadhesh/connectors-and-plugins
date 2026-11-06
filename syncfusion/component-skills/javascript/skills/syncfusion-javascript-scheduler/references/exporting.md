# Exporting Reference

## Table of contents

- [Excel Export](#excel-export)
    - [Module Injection](#module-injection)
    - [`exportToExcel()` Method](#exporttoexcel-method)
    - [Exporting with Custom Fields (`ExportOptions`)](#exporting-with-custom-fields-exportoptions)
- [ICS (iCalendar) Export](#ics-icalendar-export)
    - [Module Injection](#module-injection-1)
    - [`exportToICalendar()` Method](#exporttoicalendar-method)
    - [Exporting with Custom Filename](#exporting-with-custom-filename)
- [ICS Import](#ics-import)
    - [Module Injection](#module-injection-2)
    - [`importICalendar()` Method](#importicalendar-method)
- [Summary Table](#summary-table)

## Excel Export

### Module Injection

Import and inject the `ExcelExport` module before using Excel export:

```ts
import { Schedule, Week, ExcelExport } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, ExcelExport);
```

---

### `exportToExcel()` Method

Exports all Scheduler appointments to an Excel file. By default, exports all fields mapped through `eventSettings`.

```ts
import { Schedule, Week, ExcelExport, ActionEventArgs, ToolbarActionArgs } from '@syncfusion/ej2-schedule';
import { ItemModel } from '@syncfusion/ej2-navigations';

Schedule.Inject(Week, ExcelExport);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2019, 0, 10),
    views: ['Week'],
    eventSettings: { dataSource: scheduleData },
    actionBegin: (args: ActionEventArgs & ToolbarActionArgs) => {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem: ItemModel = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
            };
            args.items.push(exportItem);
        }
    }
});
scheduleObj.appendTo('#Schedule');

function onExportClick(): void {
    scheduleObj.exportToExcel();
}
```

---

### Exporting with Custom Fields (`ExportOptions`)

To limit which fields are exported, pass an `ExportOptions` object with a `fields` array.

```ts
import { Schedule, Week, ExcelExport, ExportOptions } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, ExcelExport);

function onExportClick(): void {
    let exportValues: ExportOptions = {
        fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
    };
    scheduleObj.exportToExcel(exportValues);
}
```

---

## ICS (iCalendar) Export

### Module Injection

Import and inject `ICalendarExport`:

```ts
import { Schedule, Day, Week, WorkWeek, Month, Agenda, ICalendarExport } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, ICalendarExport);
```

---

### `exportToICalendar()` Method

Exports all Scheduler events to a `.ics` calendar file (compatible with Google Calendar, Outlook, etc.). Default filename: `Calendar.ics`.

```ts
import { Button } from '@syncfusion/ej2-buttons';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, ICalendarExport } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, ICalendarExport);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '520px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');

let buttonObj: Button = new Button();
buttonObj.appendTo('#ics-export');
buttonObj.element.onclick = () => scheduleObj.exportToICalendar();
```

---

### Exporting with Custom Filename

Pass a custom file name string as the first argument to `exportToICalendar()`.

```ts
// Produces "ScheduleEvents.ics"
buttonObj.element.onclick = () => scheduleObj.exportToICalendar('ScheduleEvents');
```

---

## ICS Import

### Module Injection

Import and inject `ICalendarImport`:

```ts
import { Schedule, Day, Week, WorkWeek, Month, Agenda, ICalendarImport } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, ICalendarImport);
```

---

### `importICalendar()` Method

Imports events from an external `.ics` file into the Scheduler. Accepts a `Blob` object (file) as the mandatory argument.

```ts
import { Schedule, Day, Week, WorkWeek, Month, Agenda, ICalendarImport } from '@syncfusion/ej2-schedule';
import { Uploader, SelectedEventArgs } from '@syncfusion/ej2-inputs';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, ICalendarImport);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '520px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');

let importObj: Uploader = new Uploader({
    allowedExtensions: '.ics',
    multiple: false,
    showFileList: false,
    selected: (args: SelectedEventArgs) =>
        scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0])
});
importObj.appendTo('#ics-import');
```

---

## Summary Table

| Feature | Module | Method | Description |
|---|---|---|---|
| Excel export | `ExcelExport` | `exportToExcel()` | Export events to `.xlsx` file |
| Excel export (custom fields) | `ExcelExport` | `exportToExcel(ExportOptions)` | Export only selected fields |
| ICS export | `ICalendarExport` | `exportToICalendar()` | Export events to `.ics` file |
| ICS export (custom name) | `ICalendarExport` | `exportToICalendar('fileName')` | Export with custom filename |
| ICS import | `ICalendarImport` | `importICalendar(blob)` | Import `.ics` file into Scheduler |
