# Recurrence Editor

## Table of Contents
- [Overview](#overview)
- [Customizing Repeat Types](#customizing-repeat-types)
- [Limit Available Frequency Options](#limit-available-frequency-options)
- [Customizing End Types](#customizing-end-types)
- [Limit End Options](#limit-end-options)
- [Recurrence Editor Properties](#recurrence-editor-properties)
- [Accessing Recurrence Rule String](#accessing-recurrence-rule-string)
- [Capture Rule Changes](#capture-rule-changes)
- [Setting Initial Recurrence Rule](#setting-initial-recurrence-rule)
- [Load Editor with Predefined Rule](#load-editor-with-predefined-rule)
- [Recurrence Date Generation](#recurrence-date-generation)
- [Generate Date Instances from Rule](#generate-date-instances-from-rule)
- [getRecurrenceDates Parameters](#getrecurrencedates-parameters)
- [Generate Dates with Exclusions](#generate-dates-with-exclusions)
- [Restrict Date Generation with Count](#restrict-date-generation-with-count)
- [Limit "Never Ends" Rules](#limit-never-ends-rules)
- [Server-Side Date Generation](#server-side-date-generation)
- [Using RecurrenceHelper Class](#using-recurrencehelper-class)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Meeting Room Booking (No "Never Ends")](#meeting-room-booking-no-never-ends)
- [Shift Scheduling (Weekdays Only)](#shift-scheduling-weekdays-only)
- [Subscription Billing](#subscription-billing)
- [Class Schedule (Academic Calendar)](#class-schedule-academic-calendar)
- [Maintenance Windows](#maintenance-windows)

The recurrence editor is a standalone component for managing recurrence rule generation, integrated into Scheduler's event editor by default.

## Overview

The recurrence editor provides UI to create and manage recurrence patterns according to iCalendar RFC 5545 specification. It can be used:
- **Integrated**: Within Scheduler's event editor window (default)
- **Standalone**: As an independent component for custom recurrence scenarios

## Customizing Repeat Types

### Limit Available Frequency Options

By default, the editor shows five repeat options: Never, Daily, Weekly, Monthly, Yearly. Customize using the `frequencies` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (popupOpen)='onPopupOpen($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      // Limit to daily and weekly options only
      (this.scheduleObj.eventWindow as any).recurrenceEditor.frequencies = ['daily', 'weekly'];
    }
  }
}
```

**Available Frequency Values**:
- `'none'` - Never repeat
- `'daily'` - Daily recurrence
- `'weekly'` - Weekly recurrence
- `'monthly'` - Monthly recurrence
- `'yearly'` - Yearly recurrence

## Customizing End Types

### Limit End Options

By default, the editor provides three end options: Never, Until, Count. Customize using the `endTypes` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { RecurrenceEditorComponent, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecurrenceEditorModule, DropDownListAllModule],
  template: `
    <ejs-recurrenceeditor #recurrenceObj></ejs-recurrenceeditor>
  `
})
export class AppComponent {
  @ViewChild('recurrenceObj') public recurrenceObj!: RecurrenceEditorComponent;
  
  ngAfterViewInit() {
    // Set initial repeat type to Daily (index 1)
    this.recurrenceObj.selectedType = 1;
    
    // Show only "Until" and "Count" end options
    (this.recurrenceObj as any).endTypes = ['until', 'count'];
  }
}
```

**Available End Type Values**:
- `'never'` - No end date
- `'until'` - End on specific date
- `'count'` - End after N occurrences

## Recurrence Editor Properties

| Property | Type | Description |
|----------|------|-------------|
| `firstDayOfWeek` | number | First day of the week (0=Sunday, 6=Saturday) |
| `startDate` | Date | Start date for recurrence pattern |
| `dateFormat` | string | Date format for display |
| `locale` | string | Locale for internationalization |
| `cssClass` | string | Custom CSS class names |
| `enableRtl` | boolean | Enable right-to-left mode |
| `minDate` | Date | Minimum selectable date |
| `maxDate` | Date | Maximum selectable date |
| `value` | string | Recurrence rule string (RFC 5545) |
| `selectedType` | number | Initial repeat type (0=None, 1=Daily, 2=Weekly, 3=Monthly, 4=Yearly) |
| `frequencies` | string[] | Available frequency options |
| `endTypes` | string[] | Available end type options |

## Accessing Recurrence Rule String

### Capture Rule Changes

Use the `change` event to access the generated recurrence rule:

```typescript
import { Component } from '@angular/core';
import { RecurrenceEditorModule, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecurrenceEditorModule, DropDownListAllModule, CommonModule],
  template: `
    <div style="padding-bottom:15px;">
      <label id="rule-label">Rule Output</label>
      <div class="rule-output-container">
        <div id="rule-output">{{selectRule}}</div>
      </div>
    </div>
    <ejs-recurrenceeditor (change)="onChange($event)"></ejs-recurrenceeditor>
  `
})
export class AppComponent {
  public selectRule: string = 'Select Rule';
  
  onChange(args: RecurrenceEditorChangeEventArgs): void {
    if (!isNullOrUndefined(args.value)) {
      if (args.value === '') {
        this.selectRule = 'Select Rule';
      } else {
        this.selectRule = args.value;
      }
    }
  }
}
```

**Change Event Arguments**:
- `args.value`: Generated recurrence rule string (RFC 5545 format)
- Example output: `"FREQ=DAILY;INTERVAL=2;COUNT=10"`

## Setting Initial Recurrence Rule

### Load Editor with Predefined Rule

Display the recurrence editor with specific options loaded initially using the `value` property:

```typescript
import { Component } from '@angular/core';
import { RecurrenceEditorModule, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecurrenceEditorModule, DropDownListAllModule, CommonModule],
  template: `
    <div class="content-wrapper recurrence-editor-wrap">
      <div style="padding-bottom:15px;">
        <label>Rule Output</label>
        <div class="rule-output-container">
          <div id="rule-output">{{selectRule}}</div>
        </div>
      </div>
      <ejs-recurrenceeditor 
        (change)="onChange($event)" 
        value="FREQ=DAILY;INTERVAL=2;COUNT=8">
      </ejs-recurrenceeditor>
    </div>
  `
})
export class AppComponent {
  public selectRule: string = 'FREQ=DAILY;INTERVAL=2;COUNT=8';
  
  onChange(args: RecurrenceEditorChangeEventArgs): void {
    if (!isNullOrUndefined(args.value)) {
      this.selectRule = args.value;
    }
  }
}
```

**Rule Parsing**:
- Editor parses the rule and populates all fields accordingly
- `FREQ=DAILY;INTERVAL=2;COUNT=8` sets: Daily, every 2 days, ends after 8 occurrences

## Recurrence Date Generation

### Generate Date Instances from Rule

Use the `getRecurrenceDates` method to parse a recurrence rule and generate actual date instances:

```typescript
import { Component, ViewChild } from '@angular/core';
import { RecurrenceEditorModule, RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecurrenceEditorModule, DropDownListAllModule, CommonModule],
  template: `
    <div style="padding-bottom:15px;">
      <label id="rule-label">Date Collections</label>
      <div class="rule-output-container">
        <div id="rule-output">
          <div *ngFor="let date of dateArray">{{date}}</div>
        </div>
      </div>
    </div>
    <ejs-recurrenceeditor 
      #recurrenceObj 
      [value]="value" 
      (change)="onChange($event)">
    </ejs-recurrenceeditor>
  `
})
export class AppComponent {
  @ViewChild('recurrenceObj') public recObject!: RecurrenceEditor;
  
  public value = 'FREQ=DAILY;INTERVAL=1';
  public dateArray: string[] = [];
  public selectRule: string = 'Select Rule';
  
  onChange(args: RecurrenceEditorChangeEventArgs): void {
    if (!isNullOrUndefined(args.value)) {
      this.dateArray = [];
      if (args.value === '') {
        this.dateArray.push(this.selectRule);
      } else {
        const dates: number[] = this.recObject.getRecurrenceDates(
          new Date(), // Start date
          args.value  // Recurrence rule
        );
        for (let i = 0; i < dates.length; i++) {
          this.dateArray.push(new Date(dates[i]).toString());
        }
      }
    }
  }
}
```

### getRecurrenceDates Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | Date | Yes | Appointment start date |
| `rule` | string | Yes | Recurrence rule (RFC 5545) |
| `excludeDate` | string | No | ISO format dates to exclude (comma-separated) |
| `maximumCount` | number | No | Maximum number of dates to generate |
| `viewDate` | Date | No | Current view's first date for optimization |

### Generate Dates with Exclusions

Exclude specific dates from the generated series:

```typescript
onChange(args: RecurrenceEditorChangeEventArgs): void {
  if (!isNullOrUndefined(args.value)) {
    this.dateArray = [];
    const dates: number[] = this.recObject.getRecurrenceDates(
      new Date(2024, 0, 7, 10, 0),
      args.value,
      '20240108T114224Z,20240110T114224Z', // Exclude Jan 8 and Jan 10
      undefined,
      new Date(2024, 0, 7)
    );
    for (let i = 0; i < dates.length; i++) {
      this.dateArray.push(new Date(dates[i]).toString());
    }
  }
}
```

**Exclusion Format**:
- ISO 8601 format with UTC time: `YYYYMMDDTHHmmssZ`
- Multiple exclusions separated by commas
- Example: `"20240108T114224Z,20240110T114224Z"`

## Restrict Date Generation with Count

### Limit "Never Ends" Rules

For rules without end dates, specify maximum count to prevent infinite generation:

```typescript
import { Component, OnInit } from '@angular/core';
import { RecurrenceEditorModule, RecurrenceEditor } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecurrenceEditorModule, DropDownListAllModule, NumericTextBoxModule, CommonModule],
  template: `
    <div style="padding-bottom:15px;">
      <label id="rule-label">Date Collections</label>
      <div class="rule-output-container">
        <div id="rule-output">
          <div *ngFor="let date of dateArray">{{date}}</div>
        </div>
      </div>
    </div>
    <ejs-numerictextbox 
      [(value)]='numericValue' 
      (change)="onChange($event)">
    </ejs-numerictextbox>
  `
})
export class AppComponent implements OnInit {
  public ruleString = 'FREQ=DAILY;INTERVAL=1';
  public numericValue: number = 10;
  public dateArray: string[] = [];
  public recObject: RecurrenceEditor = new RecurrenceEditor();
  
  ngOnInit(): void {
    const dates: number[] = this.recObject.getRecurrenceDates(
      new Date(2024, 0, 7, 10, 0),
      this.ruleString,
      '20240108T114224Z,20240110T114224Z',
      this.numericValue, // Maximum count
      new Date(2024, 0, 7)
    );
    for (let i = 0; i < dates.length; i++) {
      this.dateArray.push(new Date(dates[i]).toString());
    }
  }
  
  onChange(args: ChangeEventArgs) {
    if (!isNullOrUndefined(args.value)) {
      this.dateArray = [];
      const dates: number[] = this.recObject.getRecurrenceDates(
        new Date(2024, 0, 7, 10, 0),
        this.ruleString,
        '20240108T114224Z,20240110T114224Z',
        args.value, // Dynamic maximum count
        new Date(2024, 0, 7)
      );
      for (let i = 0; i < dates.length; i++) {
        this.dateArray.push(new Date(dates[i]).toString());
      }
    }
  }
}
```

**Performance Tip**:
- Always use `maximumCount` with "never-ending" rules
- Default behavior without count may generate excessive dates
- Recommended count: 50-100 for UI display, 500-1000 for calculations

## Server-Side Date Generation

### Using RecurrenceHelper Class

For server-side processing (ASP.NET, Node.js), use the `RecurrenceHelper` class:

**C# Example (ASP.NET Core)**:
```csharp
using Syncfusion.EJ2.Schedule;

public class RecurrenceController : Controller
{
    [HttpPost]
    public IActionResult GenerateDates([FromBody] RecurrenceRequest request)
    {
        var helper = new RecurrenceHelper();
        var dates = helper.GetRecurrenceDateTimeCollection(
            request.Rule,
            request.StartDate,
            request.ExcludeDates,
            request.MaximumCount
        );
        
        return Json(dates);
    }
}
```

## Best Practices

1. **Frequency Customization**: Limit frequencies to reduce user complexity for domain-specific apps
2. **End Type Restriction**: Hide "Never" option for booking systems to enforce end dates
3. **Change Event**: Always handle `change` event to capture and store recurrence rules
4. **Date Generation**: Use `maximumCount` parameter to prevent performance issues
5. **Exclusions**: Store exception dates separately for easier management
6. **Server-Side**: Generate dates server-side for large-scale operations
7. **Validation**: Validate generated dates against business rules (e.g., no past dates)
8. **UI Feedback**: Display generated date count to users before saving
9. **Locale**: Set `locale` property for international date format support
10. **Testing**: Test edge cases like leap years, DST changes, month-end dates

## Common Scenarios

### Meeting Room Booking (No "Never Ends")
Hide the "never" end type to enforce reservation limits.

### Shift Scheduling (Weekdays Only)
Combine with custom validation to exclude weekends from generated dates.

### Subscription Billing
Use date generation for invoicing schedules with monthly/yearly patterns.

### Class Schedule (Academic Calendar)
Use `minDate` and `maxDate` to restrict within semester bounds.

### Maintenance Windows
Limit frequencies to "daily" and "weekly" for operational tasks.
