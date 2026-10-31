# Getting Started with Angular Scheduler

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Theme Configuration](#css-theme-configuration)
- [Module Injection and View Services](#module-injection-and-view-services)
- [Basic Scheduler Implementation](#basic-scheduler-implementation)
- [Populating Events](#populating-events)
- [Custom Field Mapping](#custom-field-mapping)
- [Setting Date and View](#setting-date-and-view)
- [Individual View Customization](#individual-view-customization)
- [Running the Application](#running-the-application)

## Overview

This guide covers the complete setup process for the Syncfusion Angular Scheduler component, from installation to creating your first working scheduler with events. The Scheduler (ejs-schedule) provides a full-featured calendar interface for event management.

## Prerequisites

Install Angular CLI globally to create and manage Angular applications:

```bash
npm install -g @angular/cli
```

Create a new Angular application:

```bash
ng new my-scheduler-app
cd my-scheduler-app
```

## Installation

Syncfusion provides two package structures for Angular components:

### Option 1: Ivy Library Distribution (Recommended)

For Angular version 12 and above, use the Ivy package:

```bash
npm install @syncfusion/ej2-angular-schedule --save
```

**Package**: `@syncfusion/ej2-angular-schedule` (version >= 20.2.36)

### Option 2: Angular Compatibility Compiled (NGCC)

For Angular versions below 12, use the legacy NGCC package:

```bash
npm install @syncfusion/ej2-angular-schedule@ngcc --save
```

Or specify in `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-schedule": "32.1.19-ngcc"
  }
}
```

**Note**: If the `ngcc` tag is not specified, the Ivy package will be installed by default.

## ## Add Theme Styles

Install the **Material 3** theme package using the following command:

```bash
npm install @syncfusion/ej2-material3-theme
```

The installed theme package includes an `index.css` file that automatically imports all the required dependency styles. Import the following stylesheet into `src/styles.css`:

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/schedule/index.css';
```

**Available Themes:**
- `material3.css` - Material 3 theme
- `material.css` - Material theme
- `bootstrap5.css` - Bootstrap 5 theme
- `bootstrap4.css` - Bootstrap 4 theme
- `bootstrap.css` - Bootstrap theme
- `fabric.css` - Office Fabric theme
- `tailwind.css` - Tailwind CSS theme
- `highcontrast.css` - High contrast theme

Replace `material3` with your preferred theme name in all imports.

## Module Injection and View Services

The Scheduler component provides view modes as separate service modules. You must inject the required view services to make them available.

### Available View Services

| Service | View Type | Description |
|---------|-----------|-------------|
| `DayService` | Day | Single day view |
| `WeekService` | Week | 7-day week view |
| `WorkWeekService` | WorkWeek | Working days only view |
| `MonthService` | Month | Monthly calendar view |
| `YearService` | Year | Yearly calendar view |
| `AgendaService` | Agenda | List view of events |
| `MonthAgendaService` | MonthAgenda | Month with agenda list |
| `TimelineViewsService` | TimelineDay, TimelineWeek, TimelineWorkWeek | Horizontal timeline views |
| `TimelineMonthService` | TimelineMonth | Timeline month view |
| `TimelineYearService` | TimelineYear | Timeline year view |

### Injecting View Services

Add view services to the `providers` array in your component:

```typescript
import { Component } from '@angular/core';
import { 
  DayService, 
  WeekService, 
  WorkWeekService, 
  MonthService, 
  AgendaService, 
  MonthAgendaService,
  TimelineViewsService, 
  TimelineMonthService, 
  TimelineYearService 
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  providers: [
    DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService, 
    AgendaService, 
    MonthAgendaService,
    TimelineViewsService, 
    TimelineMonthService, 
    TimelineYearService
  ]
  // ...
})
export class AppComponent { }
```

**Important**: Only injected views will be available in the Scheduler. If a view service is not provided, that view mode cannot be used.

## Basic Scheduler Implementation

Create a minimal Scheduler component using standalone component syntax:

### Standalone Component (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `<ejs-schedule></ejs-schedule>`
})
export class AppComponent { }
```

### Module-Based Component (Traditional)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Component } from '@angular/core';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  template: `<ejs-schedule></ejs-schedule>`
})
export class AppComponent { }

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

This creates an empty Scheduler with default Week view.

## Populating Events

Add events to the Scheduler using the `eventSettings` property with a `dataSource`.

### Using Default Field Names

The Scheduler expects events with specific default field names:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Id` | number/string | Yes | Unique event identifier |
| `Subject` | string | Yes | Event title |
| `StartTime` | Date | Yes | Event start date/time |
| `EndTime` | Date | Yes | Event end date/time |
| `IsAllDay` | boolean | No | All-day event flag |
| `Location` | string | No | Event location |
| `Description` | string | No | Event description |
| `RecurrenceRule` | string | No | Recurrence pattern (RRULE format) |

**Example:**

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, ScheduleAllModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, ScheduleAllModule],
  template: `<ejs-schedule [eventSettings]='eventSettings'></ejs-schedule>`
})
export class AppComponent {
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 12, 30)
    },
    {
      Id: 2,
      Subject: 'Conference',
      StartTime: new Date(2024, 0, 16, 9, 0),
      EndTime: new Date(2024, 0, 16, 11, 0),
      IsAllDay: false,
      Location: 'Conference Room A'
    }
  ];
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
}
```

## Custom Field Mapping

If your data uses different field names, map them using the `fields` property:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, ScheduleAllModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, ScheduleAllModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
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
  public data: object[] = [
    {
      id: 2,
      eventName: 'Meeting',
      startTime: new Date(2024, 0, 15, 10, 0),
      endTime: new Date(2024, 0, 15, 12, 30),
      isAllDay: false
    }
  ];
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'id',
      subject: { name: 'eventName' },
      isAllDay: { name: 'isAllDay' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' }
    }
  };
}
```

**Field Mapping Options:**

```typescript
fields: {
  id: 'customId',                    // Maps to Id
  subject: { name: 'title' },        // Maps to Subject
  startTime: { name: 'start' },      // Maps to StartTime
  endTime: { name: 'end' },          // Maps to EndTime
  isAllDay: { name: 'fullDay' },     // Maps to IsAllDay
  location: { name: 'place' },       // Maps to Location
  description: { name: 'notes' },    // Maps to Description
  recurrenceRule: { name: 'repeat' } // Maps to RecurrenceRule
}
```

## Setting Date and View

### Setting the Selected Date

Use the `selectedDate` property to set the initial date:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, ScheduleAllModule, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, ScheduleAllModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px' 
      [selectedDate]='selectedDate'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
}
```

**Default**: If not specified, the Scheduler displays the current system date.

### Setting the Current View

Use the `currentView` property to set the initial view mode:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, ScheduleAllModule, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, ScheduleAllModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px' 
      [selectedDate]='selectedDate' 
      [currentView]='currentView'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Month';
}
```

**Available View Values:**
- `'Day'` - Single day view
- `'Week'` - 7-day week view (default)
- `'WorkWeek'` - Working days only
- `'Month'` - Monthly calendar
- `'Year'` - Yearly calendar
- `'Agenda'` - List view
- `'MonthAgenda'` - Month with agenda
- `'TimelineDay'` - Timeline day view
- `'TimelineWeek'` - Timeline week view
- `'TimelineWorkWeek'` - Timeline work week
- `'TimelineMonth'` - Timeline month view
- `'TimelineYear'` - Timeline year view

## Individual View Customization

Customize each view with specific options using the `<e-views>` directive:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
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
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = { 
    dataSource: [
      {
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2024, 0, 15, 10, 0),
        EndTime: new Date(2024, 0, 15, 12, 0)
      }
    ] 
  };
}
```

**Common View Options:**

| Property | Type | Description | Applicable Views |
|----------|------|-------------|------------------|
| `option` | View | View type (Day, Week, Month, etc.) | All |
| `startHour` | string | Start hour (e.g., '07:00') | Day, Week, WorkWeek, Timeline variants |
| `endHour` | string | End hour (e.g., '18:00') | Day, Week, WorkWeek, Timeline variants |
| `showWeekend` | boolean | Show/hide weekends | All except Agenda |
| `interval` | number | Number of days/weeks/months | All except Agenda |
| `readonly` | boolean | Make view read-only | All |
| `dateFormat` | string | Date format (e.g., 'dd-MMM-yyyy') | All |

## Running the Application

Start the development server:

```bash
npm start
```

Or:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser to see the Scheduler.

## Complete Working Example

Here's a complete standalone component with events, custom date, and view:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]="selectedDate"
      [currentView]="currentView"
      [eventSettings]="eventSettings">
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Week';
  
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Team Meeting',
        StartTime: new Date(2024, 0, 15, 9, 0),
        EndTime: new Date(2024, 0, 15, 10, 30),
        Location: 'Conference Room',
        Description: 'Discuss project updates'
      },
      {
        Id: 2,
        Subject: 'Client Presentation',
        StartTime: new Date(2024, 0, 16, 14, 0),
        EndTime: new Date(2024, 0, 16, 16, 0),
        Location: 'Meeting Room 2'
      },
      {
        Id: 3,
        Subject: 'Code Review',
        StartTime: new Date(2024, 0, 17, 11, 0),
        EndTime: new Date(2024, 0, 17, 12, 0)
      }
    ]
  };
}
```

## Next Steps

Now that you have a basic Scheduler running, explore:

- **Views Configuration**: Learn about different view modes and customization options
- **Event Management**: Understand event types, recurrence patterns, and CRUD operations
- **Data Binding**: Connect to remote data sources and implement real-time updates
- **Resources**: Add multiple calendars with resource grouping
- **Customization**: Apply templates, styles, and themes

## Troubleshooting

### Scheduler not displaying
- Verify all required CSS files are imported in `styles.css`
- Check that view services are injected in the `providers` array
- Ensure `ScheduleModule` is imported in the component

### Views not appearing
- Inject the corresponding view service (e.g., `MonthService` for Month view)
- Check that the view name in `currentView` matches available views

### Events not showing
- Verify `StartTime` and `EndTime` are Date objects, not strings
- Ensure events fall within the visible date range
- Check field mapping if using custom field names

### Build errors
- For Angular <12, use `@syncfusion/ej2-angular-schedule@ngcc`
- For Angular >=12, use `@syncfusion/ej2-angular-schedule` (without ngcc tag)
