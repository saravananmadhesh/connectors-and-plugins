# Time Configuration

## Table of Contents
- [Overview](#overview)
- [Timescale Configuration](#timescale-configuration)
- [Working Hours](#working-hours)
- [Working Days](#working-days)
- [Timezone Support](#timezone-support)

## Overview

The Scheduler provides comprehensive time management features including:
- **Timescale**: Configure time slot intervals and visibility
- **Working Hours**: Define business hours with visual highlighting
- **Working Days**: Set custom working days for the week
- **Timezone**: Handle multiple timezones for global scheduling
- **Display Hours**: Show only specific time ranges

## Timescale Configuration

### Basic Timescale Properties

The `timeScale` property controls the time slots displayed in Day, Week, Work Week, and Timeline views:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | boolean | true | Shows/hides time grid lines |
| `interval` | number | 60 | Time duration per slot (in minutes) |
| `slotCount` | number | 2 | Number of divisions per interval |

**Calculation**: Slot Duration = `interval` / `slotCount` minutes

### Configure Time Slot Duration

Create 10-minute slots (6 slots per hour):

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [timeScale]='timeScale'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,    // 1 hour
    slotCount: 6     // 6 divisions = 10-minute slots
  };
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Common Configurations**:
- **30-minute slots**: `interval: 60, slotCount: 2`
- **15-minute slots**: `interval: 60, slotCount: 4`
- **10-minute slots**: `interval: 60, slotCount: 6`
- **5-minute slots**: `interval: 60, slotCount: 12`
- **2-hour slots**: `interval: 120, slotCount: 2`

**Limitation**: Maximum 1000 slots per day for Timeline views (browser `colspan` limit).

### Hide Timescale

Display appointments without time grid lines:

```typescript
public timeScale: TimeScaleModel = {
  enable: false
};
```

**Result**: All appointments for a day stack vertically with no time indicators.

### Customize Time Cells with Templates

#### Major and Minor Slot Templates

Use `majorSlotTemplate` and `minorSlotTemplate` to customize time cell rendering:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [timeScale]='timeScale'>
      <ng-template #timeScaleMajorSlotTemplate let-data>
        <div style="font-weight: bold; color: #3f51b5;">
          {{getMajorTime(data.date)}}
        </div>
      </ng-template>
      <ng-template #timeScaleMinorSlotTemplate let-data>
        <div style="font-size: 11px; color: #666;">
          {{getMinorTime(data.date)}}
        </div>
      </ng-template>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public timeScale: TimeScaleModel = {
    enable: true,
    interval: 60,
    slotCount: 6
  };
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  private instance: Internationalization = new Internationalization();
  
  getMajorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'hm' }); // "10:00 AM"
  }
  
  getMinorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'ms' }).replace(':00', ''); // "30"
  }
}
```

**Template Context**: The `data` object contains:
- `date`: Date object for the time slot
- Access time details for formatting

### Current Time Indicator

Show a red line marking the current system time:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [eventSettings]='eventSettings'
      [showTimeIndicator]='showTimeIndicator'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public showTimeIndicator: boolean = true; // Default: true
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Behavior**:
- Displays in Day, Week, Work Week, Timeline Day, Timeline Week, Timeline Work Week views
- Updates automatically as time progresses
- Set to `false` to hide

## Working Hours

### Set Working Hours

Define business hours with visual highlighting:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, WorkHoursModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [workHours]='workHours'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public workHours: WorkHoursModel = {
    highlight: true,      // Enable visual highlighting
    start: '09:00',       // 9:00 AM
    end: '18:00'          // 6:00 PM
  };
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Properties**:
- `highlight` (boolean): Enables active color on work cells
- `start` (string): Start time in 'HH:mm' format (24-hour)
- `end` (string): End time in 'HH:mm' format

**Example Configurations**:
- **Standard office**: `start: '09:00', end: '17:00'`
- **Morning shift**: `start: '06:00', end: '14:00'`
- **Night shift**: `start: '18:00', end: '02:00'`
- **24-hour**: `start: '00:00', end: '23:59'`

### Display Custom Time Range

Show only specific hours using `startHour` and `endHour`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      startHour='07:00'
      endHour='18:00'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Result**: Only displays 7:00 AM to 6:00 PM; other hours are hidden from view.

**Use Cases**:
- Business hours scheduler (8 AM - 6 PM)
- School schedule (7 AM - 4 PM)
- Restaurant reservations (11 AM - 11 PM)

## Working Days

### Set Working Days

Define which days of the week are working days:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='WorkWeek'
      [selectedDate]='selectedDate'
      [workDays]='workDays'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public workDays: number[] = [1, 2, 3, 4, 5]; // Mon-Fri (default)
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Day Index Mapping**:
- `0` = Sunday
- `1` = Monday
- `2` = Tuesday
- `3` = Wednesday
- `4` = Thursday
- `5` = Friday
- `6` = Saturday

**Example Configurations**:
- **Monday-Friday**: `[1, 2, 3, 4, 5]` (default)
- **Monday-Saturday**: `[1, 2, 3, 4, 5, 6]`
- **Sunday-Thursday**: `[0, 1, 2, 3, 4]`
- **Tuesday-Saturday**: `[2, 3, 4, 5, 6]`
- **Mon, Wed, Fri**: `[1, 3, 5]`

**View Behavior**:
- **Work Week** and **Timeline Work Week**: Show only working days
- **Other views**: Show all days, visually differentiate non-working days

### Hide Weekend Days

Hide non-working days from all views:

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
      [selectedDate]='selectedDate'
      [workDays]='workDays'
      [showWeekend]='showWeekend'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public workDays: number[] = [1, 3, 4, 5]; // Mon, Wed, Thu, Fri
  public showWeekend: boolean = false; // Hide Tue, Sat, Sun
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Result**: Only working days (1, 3, 4, 5) are visible; days 0, 2, 6 are hidden.

**Note**: Not applicable to Work Week view (already shows only working days).

### First Day of Week

Set the week's starting day:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [firstDayOfWeek]='firstDayOfWeek'
      [eventSettings]='eventSettings'>
      <e-views>
        <e-view option='Week'></e-view>
        <e-view option='TimelineMonth'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public firstDayOfWeek: number = 1; // Monday (default: 0 = Sunday)
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Common Configurations**:
- **Sunday**: `0` (default)
- **Monday**: `1`
- **Saturday**: `6`

### Show Week Numbers

Display week numbers in the header:

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
      currentView='Month'
      [selectedDate]='selectedDate'
      [showWeekNumber]='showWeekNumber'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public showWeekNumber: boolean = true; // Show week numbers
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Behavior**:
- Displays in calendar views (Day, Week, Month)
- Not applicable to Timeline views (use `headerRows` instead)
- In Month view, week numbers appear as the first column

### Week Number Calculation Rules

Control how week numbers are calculated using `weekRule`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, WeekRule } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='Month'
      [selectedDate]='selectedDate'
      [showWeekNumber]='showWeekNumber'
      [weekRule]='weekRule'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public showWeekNumber: boolean = true;
  public weekRule: WeekRule = 'FirstFourDayWeek'; // ISO 8601 standard
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**WeekRule Options**:
- `'FirstDay'`: First week starts on January 1st (default)
- `'FirstFourDayWeek'`: First week with 4+ days (ISO 8601 standard)
- `'FirstFullWeek'`: First complete week starting with `firstDayOfWeek`

**Note**: Requires `showWeekNumber: true` and works with `firstDayOfWeek`.

## Timezone Support

### Scheduler Timezone

Set a specific timezone for the entire Scheduler:

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
      [selectedDate]='selectedDate'
      timezone='America/New_York'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0), // 10 AM EST
        EndTime: new Date(2024, 0, 15, 11, 0)
      }
    ]
  };
}
```

**Common Timezones**:
- `'UTC'`: Coordinated Universal Time
- `'America/New_York'`: Eastern Time (UTC-05:00/-04:00)
- `'America/Chicago'`: Central Time (UTC-06:00/-05:00)
- `'America/Los_Angeles'`: Pacific Time (UTC-08:00/-07:00)
- `'Europe/London'`: GMT/BST (UTC+00:00/+01:00)
- `'Asia/Kolkata'`: India Standard Time (UTC+05:30)
- `'Asia/Tokyo'`: Japan Standard Time (UTC+09:00)
- `'Australia/Sydney'`: AEDT/AEST (UTC+11:00/+10:00)

**Behavior**: Appointments display according to Scheduler timezone, regardless of user's system timezone.

### Display Events at Same Time Everywhere (UTC)

Show appointments at identical times for all users globally:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, Timezone } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      timezone='UTC'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings!: EventSettingsModel;
  
  constructor() {
    let timezone: Timezone = new Timezone();
    let events: Object[] = [
      {
        Id: 1,
        Subject: 'Global Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 0)
      }
    ];
    
    // Convert local dates to UTC
    for (let event of events) {
      let evt = event as { [key: string]: any };
      evt['StartTime'] = timezone.removeLocalOffset(evt['StartTime']);
      evt['EndTime'] = timezone.removeLocalOffset(evt['EndTime']);
    }
    
    this.eventSettings = { dataSource: events };
  }
}
```

**Use Case**: Global teams see meetings at the same clock time (e.g., "10:00" for everyone).

### Per-Event Timezone

Assign different timezones to individual appointments:

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
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'London Conference',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 12, 0),
        StartTimezone: 'Europe/London', // GMT
        EndTimezone: 'Europe/London'
      },
      {
        Id: 2,
        Subject: 'Tokyo Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 11, 0),
        StartTimezone: 'Asia/Tokyo', // JST
        EndTimezone: 'Asia/Tokyo'
      }
    ]
  };
}
```

**Result**: Each appointment displays with correct time differences relative to Scheduler's timezone.

### Customize Timezone Collection

Limit timezone options in the event editor:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, timezoneData } from '@syncfusion/ej2-angular-schedule';
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
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  private customTimezones: { Text: string, Value: string }[] = [
    { Value: 'America/New_York', Text: '(UTC-05:00) Eastern Time' },
    { Value: 'America/Chicago', Text: '(UTC-06:00) Central Time' },
    { Value: 'America/Los_Angeles', Text: '(UTC-08:00) Pacific Time' },
    { Value: 'UTC', Text: 'UTC' },
    { Value: 'Europe/London', Text: '(UTC+00:00) London' },
    { Value: 'Asia/Kolkata', Text: '(UTC+05:30) India' }
  ];
  
  constructor() {
    // Replace default 200+ timezones with custom list
    timezoneData.splice(0, timezoneData.length, ...this.customTimezones);
  }
}
```

### Timezone Utility Methods

Use `Timezone` class for timezone conversions:

```typescript
import { Timezone } from '@syncfusion/ej2-angular-schedule';

// Create timezone instance
let timezone: Timezone = new Timezone();

// Get offset in minutes between UTC and target timezone
let date: Date = new Date(2024, 0, 15, 15, 25, 11);
let offset: number = timezone.offset(date, 'Europe/Paris');
console.log(offset); // -60 (for UTC+01:00)

// Convert date from one timezone to another
let fromDate: Date = new Date(2024, 0, 15, 10, 0);
let convertedDate: Date = timezone.convert(fromDate, 'America/New_York', 'Asia/Tokyo');

// Remove local timezone offset (convert to UTC)
let localDate: Date = new Date(2024, 0, 15, 10, 0);
let utcDate: Date = timezone.removeLocalOffset(localDate);

// Add local timezone offset (convert from UTC to local)
let utcDateInput: Date = new Date(Date.UTC(2024, 0, 15, 10, 0));
let localDateOutput: Date = timezone.addLocalOffset(utcDateInput);
```
