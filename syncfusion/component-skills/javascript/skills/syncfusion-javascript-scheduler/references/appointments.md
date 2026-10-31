# Scheduler Appointments

## Table of Contents
- [Event Types Overview](#event-types-overview)
- [Normal Events](#normal-events)
- [Spanned Events](#spanned-events)
- [All-Day Events](#all-day-events)
- [Recurring Events](#recurring-events)
- [Recurrence Rule Reference](#recurrence-rule-reference)
- [Built-in Event Fields](#built-in-event-fields)
- [Binding Different Field Names](#binding-different-field-names)
- [Event Field Settings](#event-field-settings)
- [Custom Fields](#custom-fields)
- [Preventing Overlapping Events](#preventing-overlapping-events)
- [Drag and Drop](#drag-and-drop)

---

## Event Types Overview

| Type | Description |
|------|-------------|
| **Normal** | Scheduled within a specific time interval on a single day |
| **Spanned** | Extends beyond 24 hours or spans multiple days |
| **All-Day** | Occupies an entire day (`isAllDay: true`) |
| **Recurring** | Repeats at regular intervals using `RecurrenceRule` |

---

## Normal Events

```typescript
import { Schedule, Day, Week, TimelineViews, Month, Agenda } from '@syncfusion/ej2-schedule';

let data: object[] = [{
    Subject: 'Paris',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30)
}];

Schedule.Inject(Day, Week, TimelineViews, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'TimelineWeek', 'Month', 'Agenda'],
    eventSettings: { dataSource: data }
});
scheduleObj.appendTo('#Schedule');
```

---

## Spanned Events

Spanned events extend beyond 24 hours and display in the all-day row by default. To display them in work cells instead, set `spannedEventPlacement` to `'TimeSlot'`:

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: [{
            Id: 1,
            Subject: 'Paris',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 17, 12, 30),
            IsAllDay: false
        }],
        spannedEventPlacement: 'TimeSlot'
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## All-Day Events

Set `IsAllDay: true` to make an event span the entire day. These appear in the all-day row in vertical views.

**Expand all-day row on initial load** using the `dataBound` event:

```typescript
let initialLoad = true;

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2022, 3, 25),
    views: ['Day', 'Week'],
    dataBound() {
        if (initialLoad) {
            this.element.querySelector('.e-all-day-appointment-section').click();
            initialLoad = false;
        }
    },
    eventSettings: { dataSource: data }
});
scheduleObj.appendTo('#Schedule');
```

---

## Recurring Events

### Creating a Recurring Event

Assign a `RecurrenceRule` string to the event data:

```typescript
let data: object[] = [{
    Id: 1,
    Subject: 'Paris',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30),
    IsAllDay: false,
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5'
}];
```

### Adding Recurrence Exceptions

Exclude specific dates using `RecurrenceException` in ISO format (no hyphens, UTC suffix `Z`):

```typescript
let data: object[] = [{
    Id: 1,
    Subject: 'Paris',
    StartTime: new Date(2018, 0, 28, 10, 0),
    EndTime: new Date(2018, 0, 28, 12, 30),
    IsAllDay: false,
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8',
    RecurrenceException: '20180129T043000Z,20180131T043000Z,20180202T043000Z'
}];
```

### Editing a Single Occurrence

Add the edited occurrence as a new event with `RecurrenceID` referencing the parent `Id`, and add the date to the parent's `RecurrenceException`:

```typescript
let data: object[] = [
    {
        Id: 1,
        Subject: 'Scrum Meeting',
        StartTime: new Date(2018, 0, 28, 10, 0),
        EndTime: new Date(2018, 0, 28, 12, 30),
        IsAllDay: false,
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8',
        RecurrenceException: '20180130T043000Z'    // Remove this occurrence
    },
    {
        Id: 2,
        Subject: 'Scrum Meeting',
        StartTime: new Date(2018, 0, 30, 9, 0),
        EndTime: new Date(2018, 0, 30, 10, 30),
        Description: 'Meeting time changed based on team activities.',
        RecurrenceID: 1    // References the parent event
    }
];
```

### Editing Current and Following Events

Enable `editFollowingEvents: true` in `eventSettings`. Use `FollowingID` on the new event:

```typescript
let data: object[] = [
    {
        Id: 1,
        Subject: 'Scrum Meeting',
        StartTime: new Date(2018, 0, 28, 10, 0),
        EndTime: new Date(2018, 0, 28, 12, 30),
        IsAllDay: false,
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20180129T043000Z;'
    },
    {
        Id: 2,
        Subject: 'Scrum Meeting - Following Edited',
        StartTime: new Date(2018, 0, 30, 10, 0),
        EndTime: new Date(2018, 0, 30, 12, 30),
        IsAllDay: false,
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20180204T043000Z;',
        FollowingID: 1
    }
];

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 0, 28),
    eventSettings: {
        dataSource: data,
        editFollowingEvents: true
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Recurrence Rule Reference

### Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `FREQ` | Repeat type (DAILY, WEEKLY, MONTHLY, YEARLY) | `FREQ=DAILY;INTERVAL=1` |
| `INTERVAL` | Interval between occurrences | `FREQ=DAILY;INTERVAL=2` |
| `COUNT` | Total number of occurrences | `FREQ=DAILY;INTERVAL=1;COUNT=10` |
| `UNTIL` | End date in ISO format (UTC) | `FREQ=DAILY;INTERVAL=1;UNTIL=20180530T041343Z;` |
| `BYDAY` | Day abbreviations (MO, TU, WE, TH, FR, SA, SU) | `FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE;COUNT=10` |
| `BYMONTHDAY` | Day of the month | `FREQ=MONTHLY;BYMONTHDAY=3;INTERVAL=1;COUNT=10` |
| `BYMONTH` | Month index (1–12) | `FREQ=YEARLY;BYMONTHDAY=16;BYMONTH=6;INTERVAL=1;COUNT=10` |
| `BYSETPOS` | Week position in month | `FREQ=MONTHLY;BYDAY=MO;BYSETPOS=2;COUNT=10` |

### Common Rule Examples

**Daily:**

| Description | Rule |
|-------------|------|
| Never ends | `FREQ=DAILY;INTERVAL=1` |
| Ends after 5 occurrences | `FREQ=DAILY;INTERVAL=1;COUNT=5` |
| Ends on specific date | `FREQ=DAILY;INTERVAL=1;UNTIL=20181212T041343Z` |
| Every other day, 10 times | `FREQ=DAILY;INTERVAL=2;COUNT=10` |

**Weekly:**

| Description | Rule |
|-------------|------|
| Mon/Wed/Fri, never ends | `FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR` |
| Every Thursday, 10 occurrences | `FREQ=WEEKLY;INTERVAL=1;BYDAY=TH;COUNT=10` |
| Alternate weeks Mon/Wed/Fri, 10 times | `FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR;COUNT=10` |

**Monthly:**

| Description | Rule |
|-------------|------|
| Every 15th, never ends | `FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1` |
| Every 2nd Friday | `FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1` |
| Every 4th Wednesday, 10 times | `FREQ=MONTHLY;BYDAY=WE;BYSETPOS=4;INTERVAL=1;COUNT=10` |

**Yearly:**

| Description | Rule |
|-------------|------|
| Dec 15th every year | `FREQ=YEARLY;BYMONTHDAY=15;BYMONTH=12;INTERVAL=1` |
| 3rd Friday of December | `FREQ=YEARLY;BYDAY=FR;BYMONTH=12;BYSETPOS=3;INTERVAL=1` |

---

## Built-in Event Fields

| Field | Description |
|-------|-------------|
| `id` | Unique identifier — required for CRUD operations |
| `subject` | Summary text of the event |
| `startTime` | Start time — **mandatory** |
| `endTime` | End time — **mandatory** |
| `startTimezone` | IANA timezone for the start time |
| `endTimezone` | IANA timezone for the end time |
| `location` | Location text shown on the event |
| `description` | Event description |
| `isAllDay` | `true` = all-day event |
| `recurrenceID` | ID of the parent recurrence event (for edited occurrences) |
| `recurrenceRule` | iCal recurrence rule string |
| `recurrenceException` | Comma-separated ISO exception dates |
| `isReadonly` | `true` = prevents editing this event |
| `isBlock` | `true` = blocks the time slot, prevents new events |

---

## Binding Different Field Names

When your data uses different field names, map them in `eventSettings.fields`:

```typescript
let data: object[] = [{
    TravelId: 2,
    TravelSummary: 'Paris',
    DepartureTime: new Date(2018, 1, 15, 10, 0),
    ArrivalTime: new Date(2018, 1, 15, 12, 30),
    FullDay: false,
    Source: 'London',
    Comments: 'Summer vacation.',
    Origin: 'Asia/Yekaterinburg',
    Destination: 'Asia/Yekaterinburg'
}];

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: data,
        fields: {
            id: 'TravelId',
            subject: { name: 'TravelSummary' },
            isAllDay: { name: 'FullDay' },
            location: { name: 'Source' },
            description: { name: 'Comments' },
            startTime: { name: 'DepartureTime' },
            endTime: { name: 'ArrivalTime' },
            startTimezone: { name: 'Origin' },
            endTimezone: { name: 'Destination' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

> The `id` field is a plain string; all other fields are objects with additional options.

---

## Event Field Settings

Each field object in `eventSettings.fields` supports:

| Option | Description |
|--------|-------------|
| `name` | Maps to the corresponding data source field name |
| `default` | Default value when no data is provided |
| `title` | Label shown in the event editor for this field |
| `validation` | Validation rules (required, regex, etc.) |

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: data,
        fields: {
            id: 'TravelId',
            subject: { name: 'TravelSummary', title: 'Summary', default: 'Add Summary' },
            location: { name: 'Source', default: 'USA' },
            description: { name: 'Comments' },
            startTime: { name: 'DepartureTime' },
            endTime: { name: 'ArrivalTime' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Custom Fields

Add any additional fields alongside the standard ones — they are accessible in templates and event handlers:

```typescript
let data: object[] = [{
    Id: 2,
    Subject: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30),
    IsAllDay: false,
    Status: 'Completed',   // custom field
    Priority: 'High'       // custom field
}];
```

---

## Preventing Overlapping Events

Set `allowOverlap: false` on the Scheduler to prevent overlapping events. An alert will appear when an overlap is detected:

```typescript
import { Schedule, Day, Week, TimelineViews, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, TimelineViews, Month, Agenda, Resize, DragAndDrop);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2025, 2, 6),
    views: ['Day', 'Week', 'TimelineWeek', 'Month', 'Agenda'],
    allowOverlap: false,
    eventSettings: { dataSource: eventsData }
});
scheduleObj.appendTo('#Schedule');
```

For cross-date-range overlap validation, use the `actionBegin` event with its `promise` field and the `openOverlapAlert()` method.

**Customizing sort order** with `sortComparer`:

```typescript
import { SortComparerFunction } from '@syncfusion/ej2-schedule';

let comparerFun: SortComparerFunction = (args: Record<string, any>) =>
    args.sort((event1: Record<string, any>, event2: Record<string, any>) =>
        event1.RankId.localeCompare(event2.RankId, undefined, { numeric: true })
    );

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2017, 9, 29),
    eventSettings: {
        dataSource: data,
        sortComparer: comparerFun
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Drag and Drop

Inject the `DragAndDrop` module. Drag is enabled by default (`allowDragAndDrop: true`).

```typescript
import { Schedule, Day, Week, Month, DragAndDrop } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month, DragAndDrop);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: data }
});
scheduleObj.appendTo('#Schedule');
```

**Multiple drag** — hold CTRL to select, then drag:

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    allowMultiDrag: true,
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: data }
});
scheduleObj.appendTo('#Schedule');
```

**Customize drag behavior** via `dragStart` event:

```typescript
import { DragEventArgs } from '@syncfusion/ej2-schedule';

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: data },
    dragStart: (args: DragEventArgs) => {
        args.interval = 10;                  // snap to 10-minute intervals
        args.scroll = { enable: true, scrollBy: 5, timeDelay: 200 };
        args.navigation = { enable: true, timeDelay: 4000 };
        args.excludeSelectors = 'e-header-cells,e-header-day,e-header-date,e-all-day-cells';
    }
});
scheduleObj.appendTo('#Schedule');
```
