# Views and Display Configuration

## Table of Contents
- [Overview](#overview)
- [Available View Modes](#available-view-modes)
- [Setting the Current View](#setting-the-current-view)
- [Configuring Multiple Views](#configuring-multiple-views)
- [View-Specific Properties](#view-specific-properties)
- [Day View](#day-view)
- [Week View](#week-view)
- [Work Week View](#work-week-view)
- [Month View](#month-view)
- [Year View](#year-view)
- [Agenda View](#agenda-view)
- [Month Agenda View](#month-agenda-view)
- [Timeline Views](#timeline-views)

## Overview

The Angular Scheduler provides 11+ view modes for displaying events and appointments. Each view has unique configuration options and can be customized independently. By default, the Scheduler displays the **Week** view.

## Available View Modes

| View Mode | Description | Service Required |
|-----------|-------------|------------------|
| `Day` | Single day with time slots | `DayService` |
| `Week` | 7-day week (Sunday to Saturday) | `WeekService` |
| `WorkWeek` | Working days only (Mon-Fri) | `WorkWeekService` |
| `Month` | Monthly calendar with all days | `MonthService` |
| `Year` | Yearly calendar with all months | `YearService` |
| `Agenda` | List view of upcoming events | `AgendaService` |
| `MonthAgenda` | Month calendar with event list | `MonthAgendaService` |
| `TimelineDay` | Horizontal timeline for day | `TimelineViewsService` |
| `TimelineWeek` | Horizontal timeline for week | `TimelineViewsService` |
| `TimelineWorkWeek` | Horizontal timeline for work week | `TimelineViewsService` |
| `TimelineMonth` | Horizontal timeline for month | `TimelineMonthService` |
| `TimelineYear` | Horizontal timeline for year | `TimelineYearService` |

**Important**: You must inject the required view service to make that view available.

## Setting the Current View

Use the `currentView` property to set the active view mode:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
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
      [currentView]='currentView'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Month'; // Set Month as default view
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Default**: If not specified, the Scheduler defaults to `'Week'` view.

## Configuring Multiple Views

Display multiple views and allow users to switch between them using the `<e-views>` directive:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { 
  DayService, 
  WeekService, 
  MonthService, 
  TimelineViewsService, 
  TimelineMonthService 
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [
    DayService, 
    WeekService, 
    MonthService, 
    TimelineViewsService, 
    TimelineMonthService
  ],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option='TimelineDay'></e-view>
        <e-view option='Week'></e-view>
        <e-view option='Month'></e-view>
        <e-view option='TimelineMonth'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Note**: Only the views specified in `<e-views>` will be displayed in the view switcher.

## View-Specific Properties

Each view can have custom configuration using properties within `<e-view>`:

### Common View Properties

| Property | Type | Description | Applicable Views |
|----------|------|-------------|------------------|
| `option` | View | View type (Day, Week, Month, etc.) | All |
| `isSelected` | boolean | Set as default selected view | All |
| `dateFormat` | string | Custom date format (e.g., 'dd-MMM-yyyy') | All |
| `readonly` | boolean | Make view read-only | All |
| `showWeekend` | boolean | Show/hide weekend days | All except Agenda |
| `workDays` | number[] | Custom working days (0=Sun, 1=Mon, etc.) | All except Agenda |
| `interval` | number | Number of days/weeks/months to display | All except Agenda, MonthAgenda |
| `displayName` | string | Custom display name for view | All except Agenda, MonthAgenda |
| `startHour` | string | Start hour (e.g., '07:00') | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `endHour` | string | End hour (e.g., '18:00') | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `timeScale` | TimeScaleModel | Time slot configuration | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `showWeekNumber` | boolean | Display week numbers | Day, Week, WorkWeek, Month |
| `cellTemplate` | string | Custom cell template | All except Agenda |
| `eventTemplate` | string | Custom event template | All |
| `dateHeaderTemplate` | string | Custom date header template | All |
| `resourceHeaderTemplate` | string | Custom resource header template | All |
| `allowVirtualScrolling` | boolean | Enable virtual scrolling | Agenda, Timeline views |
| `headerRows` | HeaderRowsModel | Custom header rows | Timeline views only |
| `group` | GroupModel | Resource grouping configuration | All |
| `maxEventStack` | number | Maximum number of overlapping events to display per cell (0 = unlimited). Only applicable when `timeScale.enable` is `true`. | Day, Week, WorkWeek |

### Example: Different Configurations per View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService, MonthService, WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option="Week" startHour="07:00" endHour="15:00"></e-view>
        <e-view option="WorkWeek" startHour="10:00" endHour="18:00"></e-view>
        <e-view option="Month" [showWeekend]="showWeekend"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public showWeekend: boolean = false; // Hide weekends in Month view
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

## Day View

Displays a single day with time slots. Can be extended to show multiple days using the `interval` property.

### Basic Day View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { DayService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView="Day"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='Day' 
          startHour='09:30' 
          endHour='18:00' 
          [timeScale]="timeScaleOptions">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public timeScaleOptions: TimeScaleModel = { 
    enable: true, 
    slotCount: 5 // 5 slots per major interval
  };
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Multi-Day View (Custom Interval)

```typescript
<e-views>
  <e-view 
    option='Day' 
    [interval]="2" 
    displayName='2 Days'
    startHour='09:30' 
    endHour='18:00'>
  </e-view>
</e-views>
```

**Properties**: `startHour`, `endHour`, `timeScale`, `interval`, `showWeekNumber`

## Week View

Displays 7 days (Sunday to Saturday) with time slots. The first day can be customized using the `firstDayOfWeek` property on the Scheduler.

### Basic Week View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { WeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView="Week"
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='Week' 
          [interval]="2" 
          displayName='2 Weeks'
          [showWeekend]="showWeekend"
          [isSelected]="isSelected">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public showWeekend: boolean = false;
  public isSelected: boolean = true;
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Custom First Day of Week

Set globally on the Scheduler component:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  [firstDayOfWeek]="1"> <!-- Monday = 1, Sunday = 0 -->
</ejs-schedule>
```

**Properties**: `startHour`, `endHour`, `timeScale`, `interval`, `showWeekend`, `showWeekNumber`

## Work Week View

Displays only working days (Monday to Friday by default). Customize working days using the `workDays` property.

### Basic Work Week View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [WorkWeekService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option='WorkWeek' [workDays]="workWeekDays"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public workWeekDays: number[] = [2, 3, 5]; // Tuesday, Wednesday, Friday
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Working Days Values**: 0 = Sunday, 1 = Monday, 2 = Tuesday, ..., 6 = Saturday

**Properties**: `startHour`, `endHour`, `timeScale`, `workDays`, `showWeekNumber`

## Month View

Displays all days of the month in a calendar format. Click a date to navigate to Day view.

### Basic Month View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='Month' 
          [showWeekNumber]="showWeekNumber"
          [readonly]="isReadOnly">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public showWeekNumber: boolean = true;
  public isReadOnly: boolean = true; // Read-only mode
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Features**:
- `+ more` indicator shows hidden appointments
- Creating events defaults to all-day unless unchecked in editor
- Click date to navigate to Day view

**Properties**: `showWeekend`, `showWeekNumber`, `readonly`, `workDays`

## Year View

Displays all months of the year. Available in Horizontal and Vertical orientations.

### Basic Year View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { YearService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [YearService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option='Year' [showWeekNumber]="showWeekNumber"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public showWeekNumber: boolean = true;
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Features**:
- Dates with appointments marked with dots
- Click date to show event popup

**Properties**: `showWeekend`, `showWeekNumber`, `orientation` (Horizontal/Vertical)

## Agenda View

List view showing upcoming events. Displays next 7 days by default.

### Basic Agenda View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [agendaDaysCount]="agendaDays"
      [hideEmptyAgendaDays]="hideEmptyDays"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view option='Agenda' [allowVirtualScrolling]="allowVirtualScroll"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public agendaDays: number = 14; // Show 14 days
  public hideEmptyDays: boolean = true; // Hide days with no events
  public allowVirtualScroll: boolean = true;
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Important**: Schedule height must be set in pixels for Agenda view.

**Properties**: `allowVirtualScrolling`, `eventTemplate`

**Scheduler Properties**: `agendaDaysCount`, `hideEmptyAgendaDays`

## Month Agenda View

Combines Month calendar with Agenda list. Click a date to see events for that day below the calendar.

### Basic Month Agenda View

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthAgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='MonthAgenda' 
          [showWeekend]="showWeekend"
          [workDays]="workDays">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 14);
  public showWeekend: boolean = false;
  public workDays: number[] = [1, 2, 3]; // Monday, Tuesday, Wednesday
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Features**:
- Dates with events indicated by dots
- Click date to view events in agenda list below

**Important**: Schedule height must be set in pixels for Month Agenda view.

**Properties**: `showWeekend`, `workDays`

## Timeline Views

Horizontal timeline views display time slots and events from left to right.

### Timeline Day

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='TimelineDay' 
          startHour='10:00' 
          endHour='15:30'>
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Timeline Week

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='TimelineWeek' 
          [timeScale]="timeScaleOptions">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public timeScaleOptions: TimeScaleModel = { enable: false }; // Hide timescale
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Timeline Work Week

```typescript
<e-views>
  <e-view 
    option='TimelineWorkWeek' 
    dateFormat='dd-MMM-yyyy'
    [interval]="3"
    [workDays]="[1, 3, 5]"> <!-- Mon, Wed, Fri -->
  </e-view>
</e-views>
```

### Timeline Month

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='TimelineMonth' 
          dateFormat='dd-MMM-yyyy'
          [showWeekend]="showWeekend">
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

### Timeline Year

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineYearService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineYearService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [rowAutoHeight]="rowAutoHeight"
      [eventSettings]="eventSettings">
      <e-views>
        <e-view 
          option='TimelineYear' 
          displayName='Horizontal Timeline Year'
          isSelected=true>
        </e-view>
        <e-view 
          option='TimelineYear' 
          displayName='Vertical Timeline Year'
          orientation='Vertical'>
        </e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public rowAutoHeight: boolean = true; // Auto-adjust row height
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Timeline Features**:
- `+ more` indicator when events exceed cell height
- Click date header to navigate to Timeline Day view (for Timeline Week/Month)
- Supports resource grouping
- Supports virtual scrolling

**Properties**: `startHour`, `endHour`, `timeScale`, `interval`, `headerRows`, `allowVirtualScrolling`

