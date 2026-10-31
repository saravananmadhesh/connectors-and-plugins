# Appointments and Event Management

## Table of Contents
- [Overview](#overview)
- [Event Types](#event-types)
- [Normal Events](#normal-events)
- [Spanned Events](#spanned-events)
- [All-Day Events](#all-day-events)
- [Recurring Events](#recurring-events)
- [Event Fields](#event-fields)
- [Field Mapping](#field-mapping)
- [Recurrence Rules](#recurrence-rules)
- [Recurrence Patterns](#recurrence-patterns)
- [Exception Dates](#exception-dates)
- [Editing Recurring Events](#editing-recurring-events)
- [Recurrence Validation](#recurrence-validation)

## Overview

Appointments (events) in the Scheduler represent scheduled items for specific time periods. The Scheduler categorizes events based on their duration and recurrence pattern, providing flexible event management capabilities.

## Event Types

The Scheduler supports four types of events:

| Type | Description | Display Location |
|------|-------------|------------------|
| **Normal Events** | Appointments for specific time intervals within a day | Regular time cells |
| **Spanned Events** | Events lasting more than 24 hours | All-day row (default) or time slots |
| **All-Day Events** | Full-day events like holidays | All-day row |
| **Recurring Events** | Events that repeat at regular intervals | Regular cells with repeat indicator |

## Normal Events

Normal events are appointments created for specific time intervals within a day (less than 24 hours).

### Creating Normal Events

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 30)
    },
    {
      Id: 2,
      Subject: 'Client Call',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 15, 0),
      Location: 'Conference Room',
      Description: 'Discuss project requirements'
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
}
```

## Spanned Events

Spanned events are appointments with durations longer than 24 hours. By default, they display in the all-day row.

### Customize Spanned Event Placement

Use the `spannedEventPlacement` property to control where spanned events display:

**Options**:
- `'AllDayRow'` (default) - Display in all-day row
- `'TimeSlot'` - Display in regular time cells

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Conference',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 17, 12, 30), // Spans 2+ days
      IsAllDay: false
    },
    {
      Id: 2,
      Subject: 'Training',
      StartTime: new Date(2024, 0, 16, 12, 0),
      EndTime: new Date(2024, 0, 18, 13, 0), // Spans 2+ days
      IsAllDay: false
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    spannedEventPlacement: 'TimeSlot' // Display in time cells instead of all-day row
  };
}
```

**Note**: Events spanning multiple days but less than 24 hours (e.g., 11 PM to 2 AM) are split and displayed on each day.

## All-Day Events

All-day events represent full-day appointments like holidays. They display in a separate all-day row.

### Creating All-Day Events

Set `IsAllDay: true` to mark an event as all-day:

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Company Holiday',
    StartTime: new Date(2024, 0, 15, 0, 0),
    EndTime: new Date(2024, 0, 15, 23, 59),
    IsAllDay: true
  },
  {
    Id: 2,
    Subject: 'Team Building Event',
    StartTime: new Date(2024, 0, 16, 0, 0),
    EndTime: new Date(2024, 0, 18, 0, 0), // Multi-day all-day event
    IsAllDay: true
  }
];
```

### Hide All-Day Row

Use CSS to hide the all-day row:

```css
.e-schedule .e-date-header-wrap .e-schedule-table thead {
  display: none;
}
```

### Expand All-Day Row on Load

Automatically expand the all-day row to show all events:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

let initialLoad = true;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='750px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings"
      (dataBound)="onDataBound()">
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj?: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
  
  onDataBound() {
    if (initialLoad) {
      const elements: HTMLElement = this.scheduleObj?.element.querySelector(
        '.e-all-day-appointment-section'
      ) as HTMLElement;
      elements.click();
      initialLoad = false;
    }
  }
}
```

## Recurring Events

Recurring events repeat at regular intervals based on a recurrence rule following the iCalendar RFC 5545 standard.

### Creating Recurring Events

Use the `RecurrenceRule` field to define the recurrence pattern:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Daily Standup',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 10, 30),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10' // Daily for 10 days
    },
    {
      Id: 2,
      Subject: 'Weekly Review',
      StartTime: new Date(2024, 0, 15, 14, 0),
      EndTime: new Date(2024, 0, 15, 15, 0),
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO;INTERVAL=1' // Every Monday
    },
    {
      Id: 3,
      Subject: 'Monthly Report',
      StartTime: new Date(2024, 0, 1, 9, 0),
      EndTime: new Date(2024, 0, 1, 10, 0),
      RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=1;INTERVAL=1;COUNT=12' // 1st of each month
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
}
```

**Visual Indicator**: Recurring events display with a repeat icon in the lower-right corner.

## Event Fields

Events require specific fields to be properly displayed and managed in the Scheduler.

### Built-in Event Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Id` | number/string | Yes | Unique event identifier |
| `Subject` | string | Yes | Event title/summary |
| `StartTime` | Date | Yes | Event start date and time |
| `EndTime` | Date | Yes | Event end date and time |
| `IsAllDay` | boolean | No | Mark as all-day event |
| `Location` | string | No | Event location |
| `Description` | string | No | Event description/notes |
| `RecurrenceRule` | string | No | Recurrence pattern (RRULE format) |
| `RecurrenceID` | number | No | Parent event ID for edited occurrences |
| `RecurrenceException` | string | No | Exception dates (ISO format) |
| `FollowingID` | number | No | Parent ID for "edit following" scenarios |
| `StartTimezone` | string | No | Start timezone (IANA format) |
| `EndTimezone` | string | No | End timezone (IANA format) |
| `IsReadonly` | boolean | No | Make event read-only |
| `IsBlock` | boolean | No | Block time slot (prevents event creation) |

### Default Field Names

When using default field names, no mapping is required:

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2024, 0, 15, 10, 0),
    EndTime: new Date(2024, 0, 15, 12, 0),
    Location: 'Room 101',
    Description: 'Project kickoff meeting',
    IsAllDay: false
  }
];
```

## Field Mapping

Map custom field names to Scheduler field names using the `fields` property:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public data: object[] = [
    {
      TravelId: 1,
      TravelSummary: 'Business Trip to Paris',
      DepartureTime: new Date(2024, 0, 15, 10, 0),
      ArrivalTime: new Date(2024, 0, 15, 12, 30),
      FullDay: false,
      Source: 'London',
      Comments: 'Client meeting',
      Origin: 'Europe/London',
      Destination: 'Europe/Paris',
      IsDisabled: false
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'TravelId',
      subject: { name: 'TravelSummary' },
      startTime: { name: 'DepartureTime' },
      endTime: { name: 'ArrivalTime' },
      isAllDay: { name: 'FullDay' },
      location: { name: 'Source' },
      description: { name: 'Comments' },
      startTimezone: { name: 'Origin' },
      endTimezone: { name: 'Destination' },
      isBlock: 'IsDisabled'
    }
  };
}
```

### Field Settings with Additional Options

Field mappings can include additional options:

```typescript
fields: {
  id: 'EventId',
  subject: { 
    name: 'Title',
    default: 'No Title', // Default value
    title: 'Event Title', // Label in editor
    validation: { required: true } // Validation rules
  },
  startTime: { 
    name: 'Start',
    validation: { required: true }
  },
  endTime: { 
    name: 'End',
    validation: { required: true }
  },
  location: {
    name: 'Place',
    title: 'Location',
    default: 'Office'
  },
  description: {
    name: 'Notes',
    title: 'Description'
  }
}
```

**Field Setting Options**:
- `name`: Field name in data source
- `default`: Default value when field is empty
- `title`: Label displayed in event editor
- `validation`: Validation rules for editor

## Recurrence Rules

Recurrence rules follow the iCalendar RFC 5545 standard and define how events repeat.

### Recurrence Rule Properties

| Property | Description | Example |
|----------|-------------|---------|
| `FREQ` | Frequency type (DAILY, WEEKLY, MONTHLY, YEARLY) | `FREQ=DAILY` |
| `INTERVAL` | Interval between occurrences | `INTERVAL=2` (every 2 days) |
| `COUNT` | Number of occurrences | `COUNT=10` (10 times) |
| `UNTIL` | End date in ISO format | `UNTIL=20241231T235959Z` |
| `BYDAY` | Days of week (MO, TU, WE, TH, FR, SA, SU) | `BYDAY=MO,WE,FR` |
| `BYMONTHDAY` | Day of month (1-31) | `BYMONTHDAY=15` |
| `BYMONTH` | Month number (1-12) | `BYMONTH=6` (June) |
| `BYSETPOS` | Position in month (1-5, -1 for last) | `BYSETPOS=2` (second occurrence) |

### Basic Recurrence Rule Format

```
FREQ=[DAILY|WEEKLY|MONTHLY|YEARLY];[INTERVAL=n;][COUNT=n|UNTIL=date;][Additional properties]
```

## Recurrence Patterns

### Daily Recurrence

```typescript
// Every day, never ends
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1'

// Every day for 5 occurrences
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5'

// Every day until December 31, 2024
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20241231T235959Z'

// Every 2 days for 10 occurrences
RecurrenceRule: 'FREQ=DAILY;INTERVAL=2;COUNT=10'
```

### Weekly Recurrence

```typescript
// Every Monday, Wednesday, Friday
RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR'

// Every Thursday for 10 occurrences
RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=TH;COUNT=10'

// Every Monday until end of year
RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=MO;UNTIL=20241231T235959Z'

// Every 2 weeks on Monday, Wednesday, Friday for 10 times
RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR;COUNT=10'
```

### Monthly Recurrence

```typescript
// 15th day of every month
RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1'

// 16th day of every month for 10 occurrences
RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=16;INTERVAL=1;COUNT=10'

// 17th day of every month until December 2024
RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=17;INTERVAL=1;UNTIL=20241231T235959Z'

// 2nd Friday of every month
RecurrenceRule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1'

// Last day of every month
RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=-1;INTERVAL=1'

// 4th Wednesday of every month for 10 occurrences
RecurrenceRule: 'FREQ=MONTHLY;BYDAY=WE;BYSETPOS=4;INTERVAL=1;COUNT=10'
```

### Yearly Recurrence

```typescript
// December 15th every year
RecurrenceRule: 'FREQ=YEARLY;BYMONTHDAY=15;BYMONTH=12;INTERVAL=1'

// December 10th for 10 years
RecurrenceRule: 'FREQ=YEARLY;BYMONTHDAY=10;BYMONTH=12;INTERVAL=1;COUNT=10'

// December 12th until 2025
RecurrenceRule: 'FREQ=YEARLY;BYMONTHDAY=12;BYMONTH=12;INTERVAL=1;UNTIL=20251212T235959Z'

// 3rd Friday of December every year
RecurrenceRule: 'FREQ=YEARLY;BYDAY=FR;BYMONTH=12;BYSETPOS=3;INTERVAL=1'

// Last Tuesday of December for 10 years
RecurrenceRule: 'FREQ=YEARLY;BYDAY=TU;BYMONTH=12;BYSETPOS=-1;INTERVAL=1;COUNT=10'
```

## Exception Dates

Exclude specific occurrences from a recurring series using `RecurrenceException`:

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Daily Meeting',
    StartTime: new Date(2024, 0, 28, 10, 0),
    EndTime: new Date(2024, 0, 28, 10, 30),
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8',
    RecurrenceException: '20240129T100000Z,20240131T100000Z,20240202T100000Z' // Skip Jan 29, 31, Feb 2
  }
];
```

**Exception Date Format**:
- Use ISO 8601 format without hyphens
- UTC times end with 'Z'
- Example: `20240129T100000Z` for January 29, 2024 at 10:00 AM UTC
- Multiple exceptions separated by commas

## Editing Recurring Events

### Edit Single Occurrence

Create a new event with `RecurrenceID` pointing to the parent:

```typescript
public data: object[] = [
  {
    Id: 1,
    Subject: 'Scrum Meeting',
    StartTime: new Date(2024, 0, 28, 10, 0),
    EndTime: new Date(2024, 0, 28, 10, 30),
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8',
    RecurrenceException: '20240130T100000Z' // Exclude Jan 30
  },
  {
    Id: 2,
    Subject: 'Scrum Meeting (Rescheduled)',
    StartTime: new Date(2024, 0, 30, 9, 0), // Different time
    EndTime: new Date(2024, 0, 30, 9, 30),
    Description: 'Rescheduled due to conflict',
    RecurrenceID: 1 // Points to parent event
  }
];
```

**Steps**:
1. Add exception date to parent's `RecurrenceException`
2. Create new event with different time
3. Set `RecurrenceID` to parent's `Id`

### Edit Following Events

Enable editing current and following events:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 28);
  
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Scrum Meeting',
      StartTime: new Date(2024, 0, 28, 10, 0),
      EndTime: new Date(2024, 0, 28, 10, 30),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20240129T100000Z' // Ends Jan 29
    },
    {
      Id: 2,
      Subject: 'Scrum Meeting - Updated',
      StartTime: new Date(2024, 0, 30, 10, 0),
      EndTime: new Date(2024, 0, 30, 10, 30),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20240204T100000Z', // New end date
      FollowingID: 1 // Points to immediate parent
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    editFollowingEvents: true // Enable edit following feature
  };
}
```

**Steps**:
1. Update parent's `RecurrenceRule` with `UNTIL` date before edited occurrence
2. Create new event with `FollowingID` pointing to parent
3. Set `editFollowingEvents: true` in `eventSettings`

## Recurrence Validation

The Scheduler includes built-in validation for recurring events:

### Validation Messages

| Message | Cause |
|---------|-------|
| "The recurrence pattern is not valid" | Invalid rule (e.g., end date before start date) |
| "The changes made to specific instances will be cancelled" | Editing series when occurrences were already edited |
| "The duration must be shorter than frequency" | Event duration exceeds recurrence interval |
| "Some months have fewer than the selected date" | Date doesn't exist in all months (e.g., 31st) |
| "Two occurrences cannot occur on the same day" | Moving occurrence to date with existing occurrence |

### Example Validation Scenarios

**Invalid Pattern**:
```typescript
// Error: End date before start date
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20231231T235959Z'
StartTime: new Date(2024, 0, 1, 10, 0)
```

**Duration Exceeds Frequency**:
```typescript
// Error: 2-day event with daily recurrence
StartTime: new Date(2024, 0, 1, 10, 0)
EndTime: new Date(2024, 0, 3, 10, 0) // 2 days duration
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1' // Repeats daily
```
