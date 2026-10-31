# Time Navigation and Scheduling Guidance

## Table of Contents
- [Scrolling and Navigation](#scrolling-and-navigation)
- [Scroll to Specific Time](#scroll-to-specific-time)
- [Scroll to Current Time on Load](#scroll-to-current-time-on-load)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Standard Office Scheduler](#standard-office-scheduler)
- [Healthcare/Clinic](#healthcareclinic)
- [24/7 Operations](#247-operations)
- [Global Team (UTC)](#global-team-utc)
- [Restaurant Reservations](#restaurant-reservations)
- [Retail Store Hours](#retail-store-hours)

## Scrolling and Navigation

### Scroll to Specific Time

Programmatically scroll to a time using `scrollTo()`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { TimePickerModule, ChangeEventArgs } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, TimePickerModule],
  providers: [DayService, WeekService, WorkWeekService],
  template: `
    <div style="padding: 10px;">
      <label>Scroll To: </label>
      <ejs-timepicker 
        width='120px' 
        [value]='scrollToHour'
        format='HH:mm'
        (change)='onChange($event)'>
      </ejs-timepicker>
    </div>
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='530px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public scrollToHour: Date = new Date(2024, 0, 15, 9, 0);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onChange(args: ChangeEventArgs): void {
    this.scheduleObj.scrollTo(args.text as string);
  }
}
```

**Format**: `'HH:mm'` (e.g., `'09:00'`, `'14:30'`)

### Scroll to Current Time on Load

Automatically scroll to the system's current time:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, TimelineViewsService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (created)='onCreated()'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onCreated(): void {
    let currentTime: Date = new Date();
    let hours: string = currentTime.getHours() < 10 
      ? '0' + currentTime.getHours().toString() 
      : currentTime.getHours().toString();
    let minutes: string = currentTime.getMinutes() < 10 
      ? '0' + currentTime.getMinutes().toString() 
      : currentTime.getMinutes().toString();
    let time: string = hours + ':' + minutes;
    
    this.scheduleObj.scrollTo(time);
  }
}
```

## Best Practices

1. **Time Slots**: Choose slot durations matching your scheduling needs (30-min for meetings, 15-min for appointments)
2. **Working Hours**: Align `workHours` with `startHour`/`endHour` for consistency
3. **Working Days**: Match `workDays` with organizational calendar
4. **Timezone**: Use `timezone='UTC'` for global applications or set to primary office timezone
5. **Performance**: Avoid extremely small time slots (<5 minutes) in timeline views to prevent exceeding 1000-slot limit
6. **Current Time**: Keep `showTimeIndicator: true` for real-time awareness
7. **Week Numbers**: Enable `showWeekNumber` for scheduling by week (project management, sprints)
8. **Scrolling**: Implement `scrollTo()` on load for better UX (scroll to business hours start)
9. **Per-Resource Time**: Use resources' `startHourField`/`endHourField`/`workDaysField` for different schedules

## Common Scenarios

### Standard Office Scheduler
```typescript
workHours: { start: '09:00', end: '17:00' }
workDays: [1, 2, 3, 4, 5]
startHour: '08:00'
endHour: '18:00'
```

### Healthcare/Clinic
```typescript
timeScale: { interval: 60, slotCount: 4 } // 15-minute slots
workHours: { start: '08:00', end: '20:00' }
workDays: [1, 2, 3, 4, 5, 6]
```

### 24/7 Operations
```typescript
startHour: '00:00'
endHour: '23:59'
workHours: { start: '00:00', end: '23:59' }
workDays: [0, 1, 2, 3, 4, 5, 6]
```

### Global Team (UTC)
```typescript
timezone: 'UTC'
// Convert all appointment dates to UTC using Timezone.removeLocalOffset()
```

### Restaurant Reservations
```typescript
timeScale: { interval: 60, slotCount: 4 } // 15-minute slots
startHour: '11:00'
endHour: '23:00'
workDays: [0, 1, 2, 3, 4, 5, 6] // 7 days
```

### Retail Store Hours
```typescript
workHours: { start: '10:00', end: '21:00' }
showWeekend: true
workDays: [1, 2, 3, 4, 5, 6, 0] // All days
```
