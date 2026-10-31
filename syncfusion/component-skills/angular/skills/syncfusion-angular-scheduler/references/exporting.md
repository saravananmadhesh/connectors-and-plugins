# Exporting and Printing

## Table of Contents
- [Excel Export](#excel-export)
- [Enable Excel Export](#enable-excel-export)
- [Export Custom Fields](#export-custom-fields)
- [Customize Column Headers](#customize-column-headers)
- [Export Recurrence Occurrences](#export-recurrence-occurrences)
- [Export Custom Data](#export-custom-data)
- [ICS Export](#ics-export)
- [Export to ICalendar File](#export-to-icalendar-file)
- [Export with Custom Filename](#export-with-custom-filename)
- [ICS Import](#ics-import)
- [Import Events from ICS File](#import-events-from-ics-file)
- [Printing](#printing)
- [Print Current View](#print-current-view)
- [Print with Custom Options](#print-with-custom-options)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Export Current Month Only](#export-current-month-only)
- [Print with Logo/Header](#print-with-logoheader)
- [Export to Multiple Formats](#export-to-multiple-formats)
- [Sync with Google Calendar](#sync-with-google-calendar)
- [Audit Trail Export](#audit-trail-export)

Export Scheduler appointments to Excel or ICS files, import external calendars, and print Scheduler views.

## Excel Export

### Enable Excel Export

Import and inject the `ExcelExportService` to enable Excel export functionality:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, View, ActionEventArgs, ToolbarActionArgs, ExcelExportService } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService, ExcelExportService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      cssClass='schedule-excel-export'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [currentView]='currentView'
      (actionBegin)='onActionBegin($event)'>
      <e-views>
        <e-view option='Week'></e-view>
      </e-views>
    </ejs-schedule>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 10);
  public currentView: View = 'Week';
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const exportItem: ItemModel = {
        align: 'Right',
        showTextOn: 'Both',
        prefixIcon: 'e-icon-schedule-excel-export',
        text: 'Excel Export',
        cssClass: 'e-excel-export',
        click: this.onExportClick.bind(this)
      };
      args.items?.push(exportItem);
    }
  }
  
  onExportClick(): void {
    this.scheduleObj.exportToExcel();
  }
}
```

**Prerequisites**:
- Install `@syncfusion/ej2-excel-export` package
- Inject `ExcelExportService` in providers

### Export Custom Fields

Limit exported fields using `ExportOptions`:

```typescript
import { ExportOptions } from '@syncfusion/ej2-angular-schedule';

onExportClick(): void {
  const exportValues: ExportOptions = {
    fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location']
  };
  this.scheduleObj.exportToExcel(exportValues);
}
```

**ExportOptions Properties**:
- `fields`: Array of field names to export
- `fieldsInfo`: Custom column headers (see below)
- `customData`: Export custom data instead of dataSource
- `includeOccurrences`: Export individual recurrence occurrences

### Customize Column Headers

Provide custom headers for exported fields using `fieldsInfo`:

```typescript
import { ExportOptions, ExportFieldInfo } from '@syncfusion/ej2-angular-schedule';

onExportClick(): void {
  const exportFields: ExportFieldInfo[] = [
    { name: 'Id', text: 'Event ID' },
    { name: 'Subject', text: 'Summary' },
    { name: 'StartTime', text: 'Start Date' },
    { name: 'EndTime', text: 'End Date' },
    { name: 'Location', text: 'Place' }
  ];
  
  const exportValues: ExportOptions = {
    fieldsInfo: exportFields
  };
  
  this.scheduleObj.exportToExcel(exportValues);
}
```

### Export Recurrence Occurrences

Export each occurrence of recurring events separately:

```typescript
onExportClick(): void {
  const exportValues: ExportOptions = {
    includeOccurrences: true
  };
  this.scheduleObj.exportToExcel(exportValues);
}
```

**Default Behavior**:
- `includeOccurrences: false` - Exports only parent recurring event
- `includeOccurrences: true` - Exports all generated occurrences as separate rows

### Export Custom Data

Export a custom appointment collection instead of the bound dataSource:

```typescript
onExportClick(): void {
  const exportValues: ExportOptions = {
    customData: [
      {
        Id: 1,
        Subject: 'Project Meeting',
        StartTime: new Date(2024, 0, 15, 9, 0),
        EndTime: new Date(2024, 0, 15, 11, 0),
        Location: 'Conference Room A'
      },
      {
        Id: 2,
        Subject: 'Client Call',
        StartTime: new Date(2024, 0, 16, 14, 0),
        EndTime: new Date(2024, 0, 16, 15, 0),
        Location: 'Virtual'
      }
    ]
  };
  this.scheduleObj.exportToExcel(exportValues);
}
```

## ICS Export

### Export to ICalendar File

Export Scheduler events to .ics format for use in Google Calendar, Outlook, etc.:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, ICalendarExportService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService, ICalendarExportService],
  template: `
    <button ejs-button id="ics-export" type="button" (click)="onExportClick()">Export to ICS</button>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [currentView]='currentView'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Week';
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onExportClick(): void {
    this.scheduleObj.exportToICalendar();
  }
}
```

**Prerequisites**:
- Inject `ICalendarExportService` in providers

### Export with Custom Filename

Specify a custom filename for the exported ICS file:

```typescript
onExportClick(): void {
  this.scheduleObj.exportToICalendar('ScheduleEvents'); // Downloads as "ScheduleEvents.ics"
}
```

**Default Filename**: `Calendar.ics`

## ICS Import

### Import Events from ICS File

Import external calendar files (.ics) into the Scheduler:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, ICalendarImportService } from '@syncfusion/ej2-angular-schedule';
import { UploaderModule, SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, UploaderModule],
  providers: [DayService, WeekService, MonthService, ICalendarImportService],
  template: `
    <ejs-uploader 
      id='ics-import'
      cssClass='calendar-import'
      [multiple]='false'
      [buttons]='buttons'
      [showFileList]='false'
      allowedExtensions='.ics'
      (selected)='onSelected($event)'>
    </ejs-uploader>
    
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [currentView]='currentView'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Week';
  public showFileList: boolean = false;
  public buttons: Object = { browse: 'Choose file' };
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onSelected(args: SelectedEventArgs): void {
    const files = (args.event.target as HTMLInputElement).files;
    if (files && files[0]) {
      this.scheduleObj.importICalendar(files[0]);
    }
  }
}
```

**Prerequisites**:
- Inject `ICalendarImportService` in providers
- Use `UploaderModule` for file selection

## Printing

### Print Current View

Print the Scheduler without options (uses current view):

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, ActionEventArgs, ToolbarActionArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, PrintService } from '@syncfusion/ej2-angular-schedule';
import { ItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService, PrintService],
  template: `
    <ejs-schedule 
      #scheduleObj
      id="schedule"
      cssClass='schedule-print'
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (actionBegin)='onActionBegin($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const printItem: ItemModel = {
        align: 'Right',
        showTextOn: 'Both',
        prefixIcon: 'e-icon-schedule-print',
        text: 'Print',
        cssClass: 'e-print',
        click: this.onPrintIconClick.bind(this)
      };
      args.items?.push(printItem);
    }
  }
  
  onPrintIconClick(): void {
    this.scheduleObj.print();
  }
}
```

**Prerequisites**:
- Inject `PrintService` in providers

### Print with Custom Options

Customize the print output using `ScheduleModel` options:

```typescript
import { ScheduleModel } from '@syncfusion/ej2-angular-schedule';

onPrintIconClick(): void {
  const printModel: ScheduleModel = {
    agendaDaysCount: 14,
    cssClass: 'e-print-schedule',
    currentView: this.scheduleObj.currentView,
    dateFormat: 'dd-MMM-yyyy',
    enableRtl: false,
    endHour: '18:00',
    firstDayOfWeek: 1,
    height: 'auto',
    locale: 'en-US',
    readonly: true,
    rowAutoHeight: true,
    selectedDate: new Date(),
    showHeaderBar: false,
    showTimeIndicator: false,
    startHour: '08:00',
    timeScale: { interval: 60, slotCount: 1 },
    width: 'auto'
  };
  
  this.scheduleObj.print(printModel);
}
```

**Common Print Options**:
- `agendaDaysCount`: Number of days in Agenda view
- `cssClass`: Custom CSS for print styles
- `dateFormat`: Date display format
- `showHeaderBar`: Hide header in print
- `rowAutoHeight`: Auto-adjust cell heights
- `readonly`: Prevent edit indicators

## Best Practices

1. **Excel Export**: Include only necessary fields to reduce file size
2. **Field Mapping**: Use `fieldsInfo` for user-friendly column headers
3. **Recurrence Export**: Enable `includeOccurrences` only when needed (increases rows)
4. **ICS Compatibility**: Test exported .ics files with target calendar apps
5. **Import Validation**: Validate imported data before adding to Scheduler
6. **Print Styling**: Use `cssClass` to apply print-specific CSS (@media print)
7. **Custom Data**: Use `customData` for filtered exports (e.g., specific date range)
8. **File Naming**: Provide meaningful filenames with timestamps
9. **Error Handling**: Wrap export/import in try-catch for file operations
10. **Performance**: Export large datasets server-side for better performance

## Common Scenarios

### Export Current Month Only
Filter `customData` to current month's appointments before exporting.

### Print with Logo/Header
Use `cssClass` and inject custom HTML in print styles.

### Export to Multiple Formats
Provide buttons for both Excel and ICS exports.

### Sync with Google Calendar
Export to ICS, provide instructions for importing to Google Calendar.

### Audit Trail Export
Include all fields with `includeOccurrences: true` for compliance reporting.
