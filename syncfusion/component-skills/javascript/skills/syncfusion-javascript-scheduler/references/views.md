# Scheduler Views Configuration

## Table of Contents
- [Available Views](#available-views)
- [View-Specific Configuration Options](#view-specific-configuration-options)
- [Day View](#day-view)
- [Week View](#week-view)
- [Work Week View](#work-week-view)
- [Month View](#month-view)
- [Year View](#year-view)
- [Agenda View](#agenda-view)
- [Month Agenda View](#month-agenda-view)
- [Timeline Views](#timeline-views)
- [Timeline Month View](#timeline-month-view)
- [Timeline Year View](#timeline-year-view)
- [Extending View Intervals](#extending-view-intervals)

---

## Available Views

The Scheduler supports 12 view modes. Inject the corresponding module for each view you want to use:

| View Name | Module to Inject |
|-----------|-----------------|
| `Day` | `Day` |
| `Week` | `Week` |
| `WorkWeek` | `WorkWeek` |
| `Month` | `Month` |
| `Year` | `Year` |
| `Agenda` | `Agenda` |
| `MonthAgenda` | `MonthAgenda` |
| `TimelineDay` | `TimelineViews` |
| `TimelineWeek` | `TimelineViews` |
| `TimelineWorkWeek` | `TimelineViews` |
| `TimelineMonth` | `TimelineMonth` |
| `TimelineYear` | `TimelineYear` |

Set the active view using `currentView`, or use `isSelected: true` on the view object in the `views` array.

**Display specific views only:**

```typescript
import { Schedule, Week, Month, TimelineViews, TimelineMonth } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month, TimelineViews, TimelineMonth);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Week', 'TimelineWeek', 'Month', 'TimelineMonth'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## View-Specific Configuration Options

Each entry in the `views` array accepts these properties:

| Property | Type | Description | Applicable Views |
|----------|------|-------------|-----------------|
| `option` | View | The view name (`'Day'`, `'Week'`, etc.) | All views |
| `isSelected` | Boolean | Sets this view as active (like `currentView`) | All views |
| `dateFormat` | String | Date format for this view's header | All views |
| `readonly` | Boolean | Prevents CRUD on this view | All views |
| `resourceHeaderTemplate` | String | Custom resource header template | All views |
| `dateHeaderTemplate` | String | Custom date header cell template | All views |
| `eventTemplate` | String | Custom event appearance template | All views |
| `showWeekend` | Boolean | Show/hide Saturday and Sunday | All views |
| `group` | GroupModel | Resource grouping configuration | All views |
| `cellTemplate` | String | Custom work cell template | All except Agenda |
| `workDays` | Number[] | Working days array | All except Agenda |
| `displayName` | String | Label shown in header bar for this view | All except Agenda, MonthAgenda |
| `interval` | Number | Extend the view to span multiple days/weeks/months | All except Agenda, MonthAgenda |
| `startHour` | String | Start hour of visible time range | Day, Week, WorkWeek, TimelineDay, TimelineWeek, TimelineWorkWeek |
| `endHour` | String | End hour of visible time range | Day, Week, WorkWeek, TimelineDay, TimelineWeek, TimelineWorkWeek |
| `timeScale` | TimeScaleModel | Time slot configuration | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `showWeekNumber` | Boolean | Display week numbers | Day, Week, WorkWeek, Month |
| `allowVirtualScrolling` | Boolean | Enable virtual scrolling | Agenda and Timeline views |
| `headerRows` | HeaderRowsModel | Custom header rows (Year/Month/Week/Date/Hour) | Timeline views only |

---

## Day View

Displays a single day with all appointments.

```typescript
import { Schedule, Day } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'Day',
    selectedDate: new Date(2018, 1, 15),
    views: [{ option: 'Day', startHour: '09:30', endHour: '18:00', timeScale: { enable: true, slotCount: 5 } }],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Week View

Displays 7 days (Sunday to Saturday). Change the first day using `firstDayOfWeek`.

```typescript
import { Schedule, Day, Week } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [
        { option: 'Day', interval: 2, displayName: '2 Days', startHour: '09:30', endHour: '18:00', timeScale: { enable: true, slotCount: 5 } },
        { option: 'Week', displayName: '2 Weeks', interval: 2, showWeekend: false, isSelected: true }
    ],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Work Week View

Displays only working days (defaults to Monday–Friday). Customize via `workDays`.

```typescript
import { Schedule, WorkWeek } from '@syncfusion/ej2-schedule';

Schedule.Inject(WorkWeek);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [{ option: 'WorkWeek', workDays: [2, 3, 5] }],  // Tuesday, Wednesday, Friday
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Month View

Displays an entire month. Clicking a date navigates to Day view. The `+more` indicator shows hidden events.

```typescript
import { Schedule, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [{ option: 'Month', showWeekNumber: true, readonly: true }],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Year View

Displays all months of a year with appointment indicators.

```typescript
import { Schedule, Year } from '@syncfusion/ej2-schedule';

Schedule.Inject(Year);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Year'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Agenda View

Lists appointments for the next 7 days by default. Requires an explicit pixel height.

```typescript
import { Internationalization } from '@syncfusion/ej2-base';
import { Schedule, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Agenda);

let instance: Internationalization = new Internationalization();

(window as any).getTimeString = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'hm' });
};

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '350px',   // pixel height required for Agenda
    selectedDate: new Date(2018, 1, 15),
    views: [{
        option: 'Agenda',
        eventTemplate: '<div class="template-wrap"><div class="subject">${Subject}</div><div class="time">${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}</div></div>',
        allowVirtualScrolling: true
    }],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

Use `agendaDaysCount` on the Scheduler to change the number of days displayed. Use `hideEmptyAgendaDays` to hide days without appointments.

---

## Month Agenda View

Shows a month calendar; clicking a date displays its events below. Days with appointments show a circular dot.

```typescript
import { Schedule, MonthAgenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(MonthAgenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 14),
    views: [{ option: 'MonthAgenda', showWeekend: false, workDays: [1, 2, 3] }],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Timeline Views

Timeline Day, Week, and Work Week display time slots horizontally. Import and inject the `TimelineViews` module for all three.

```typescript
import { Schedule, TimelineViews } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 14),
    views: [
        { option: 'TimelineDay', startHour: '10:00', endHour: '15:30' },
        { option: 'TimelineWeek', timeScale: { enable: false } },
        { option: 'TimelineWorkWeek', interval: 3, workDays: [1, 3, 5], dateFormat: 'dd-MMM-yyyy' }
    ],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Timeline Month View

Displays current month days with horizontal time slots.

```typescript
import { Schedule, TimelineMonth } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineMonth);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [{ option: 'TimelineMonth', showWeekend: false }],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Timeline Year View

Supports both `Horizontal` (default) and `Vertical` orientations. Each row represents a resource.

```typescript
import { Schedule, TimelineYear } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineYear);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    rowAutoHeight: true,
    views: [
        { option: 'TimelineYear', displayName: 'Horizontal Timeline Year', isSelected: true },
        { option: 'TimelineYear', displayName: 'Vertical Timeline Year', orientation: 'Vertical' }
    ],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## Extending View Intervals

Use the `interval` property to extend a view to display multiple days/weeks/months. Use `displayName` to label the extended view in the header bar.

```typescript
import { Schedule, Day, Week } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'Day',
    selectedDate: new Date(2018, 1, 15),
    views: [
        { option: 'Day', interval: 3, displayName: '3 Days' },
        { option: 'Week', interval: 2, displayName: '2 Weeks', isSelected: true }
    ],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

**Two views with different configurations:**

```typescript
import { Schedule, Week, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [
        { option: 'Week', dateFormat: 'dd-MMM-yyyy' },
        { option: 'Month', showWeekend: false, readonly: true }
    ],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

> View intervals are not supported on Agenda and Month Agenda views.
