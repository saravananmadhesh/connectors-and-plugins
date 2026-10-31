# Scheduler CRUD Actions

## Table of Contents
- [Adding Events](#adding-events)
- [Updating Events](#updating-events)
- [Deleting Events](#deleting-events)
- [Prevent CRUD via actionBegin](#prevent-crud-via-actionbegin)
- [Read-only Scheduler](#read-only-scheduler)

---

## Adding Events

### Via Editor Window

Double-click a cell to open the default editor window. Fill in the fields and click **Save** to create the appointment.

Single-click a cell to open the quick popup — enter the Subject and press **Enter** to create quickly.

### Via addEvent Method

Use `addEvent()` to add one or multiple events programmatically:

```typescript
import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');

// Add single event
scheduleObj.addEvent({
    Id: 1,
    Subject: 'Conference',
    StartTime: new Date(2018, 1, 12, 9, 0),
    EndTime: new Date(2018, 1, 12, 10, 0),
    IsAllDay: true
});

// Add multiple events
scheduleObj.addEvent([
    {
        Id: 2,
        Subject: 'Meeting',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 11, 30),
        IsAllDay: false
    },
    {
        Id: 3,
        Subject: 'Testing',
        StartTime: new Date(2018, 1, 11, 9, 0),
        EndTime: new Date(2018, 1, 11, 10, 0),
        IsAllDay: false
    }
]);
```

### Field Validation When Adding

Add validation rules to event fields via `eventSettings.fields`:

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: [],
        fields: {
            subject: {
                name: 'Subject',
                validation: { required: true }
            },
            location: {
                name: 'Location',
                validation: {
                    required: true,
                    regex: ["^[a-zA-Z0-9- ]*$", 'Special character(s) not allowed in this field']
                }
            }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Updating Events

### Via Editor Window

Double-click an existing appointment to open the editor pre-filled with its data. Modify fields and click **Save** to update.

> Single-clicking shows a quick popup with **Edit** and **Delete** options.

### Via saveEvent Method

**Normal event** — pass the modified event object with its `Id` field:

```typescript
import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleData: Object[] = [{
    Id: 3,
    Subject: 'Testing',
    StartTime: new Date(2018, 1, 11, 9, 0),
    EndTime: new Date(2018, 1, 11, 10, 0),
    IsAllDay: false
}];

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');

// Edit a normal event
let updatedData: Object = {
    Id: 3,
    Subject: 'Testing-edited',
    StartTime: new Date(2018, 1, 11, 10, 0),
    EndTime: new Date(2018, 1, 11, 11, 0),
    IsAllDay: false
};
scheduleObj.saveEvent(updatedData);
```

**Recurring event — edit entire series** (`EditSeries`):

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

// Get occurrence from view, modify, then save as series
let data: Object[] = new DataManager(scheduleObj.getCurrentViewEvents())
    .executeLocal(new Query().where('RecurrenceID', 'equal', 3)) as Object[];
(data[0] as { [key: string]: Object }).Subject = 'Edited Series';
scheduleObj.saveEvent(data[0], 'EditSeries');
```

**Recurring event — edit single occurrence** (`EditOccurrence`):

```typescript
// The modified occurrence must have RecurrenceID pointing to parent Id
let occurrenceData: Object = {
    Id: 10,                                          // new Id for the occurrence
    Subject: 'Modified occurrence',
    StartTime: new Date(2018, 1, 12, 10, 0),
    EndTime: new Date(2018, 1, 12, 11, 0),
    IsAllDay: false,
    RecurrenceID: 3                                  // parent event Id
};
scheduleObj.saveEvent(occurrenceData, 'EditOccurrence');
```

> `saveEvent(eventData)` — edits a normal event.
> `saveEvent(eventData, 'EditOccurrence')` — edits a single occurrence of a recurring event.
> `saveEvent(eventData, 'EditSeries')` — edits the entire recurring series.

---

## Deleting Events

### Via Quick Popup or Editor Window

Single-click an event to open the quick popup and select **Delete**. Or open the editor and click **Delete**.

### Via deleteEvent Method

**Normal event** — pass event `Id` or the event object:

```typescript
import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    eventSettings: {
        dataSource: [{
            Id: 4,
            Subject: 'Vacation',
            StartTime: new Date(2018, 1, 13, 9, 0),
            EndTime: new Date(2018, 1, 13, 10, 0),
            IsAllDay: false
        }]
    }
});
scheduleObj.appendTo('#Schedule');

// Delete by Id
scheduleObj.deleteEvent(4);
```

**Recurring event — delete entire series** (`DeleteSeries`):

```typescript
let seriesData: { [key: string]: Object }[] = [{
    Id: 4,
    Subject: 'Vacation',
    RecurrenceID: 4,
    StartTime: new Date(2018, 1, 12, 11, 0),
    EndTime: new Date(2018, 1, 12, 12, 0),
    IsAllDay: false,
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=2'
}];
scheduleObj.deleteEvent(seriesData, 'DeleteSeries');
```

**Recurring event — delete single occurrence** (`DeleteOccurrence`):

```typescript
scheduleObj.deleteEvent(occurrenceEvent, 'DeleteOccurrence');
```

> `deleteEvent(id)` — deletes a normal event by Id.
> `deleteEvent(eventData, 'DeleteOccurrence')` — deletes a single occurrence.
> `deleteEvent(eventData, 'DeleteSeries')` — deletes the entire recurring series.

---

## Prevent CRUD via actionBegin

Use the `actionBegin` event to intercept and cancel CRUD operations based on custom logic:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda, ActionEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: [] },
    actionBegin: (args: ActionEventArgs) => {
        // Prevent adding on weekends
        if (args.requestType === 'eventCreate') {
            let data: { [key: string]: Object } = args.data as { [key: string]: Object };
            let startTime: Date = data.StartTime as Date;
            let weekDay: number = startTime.getDay();
            if (weekDay === 0 || weekDay === 6) {
                args.cancel = true;
            }
        }
        // Prevent editing during non-working hours
        if (args.requestType === 'eventChange') {
            let data: { [key: string]: Object } = args.data as { [key: string]: Object };
            let startTime: Date = data.StartTime as Date;
            let hour: number = startTime.getHours();
            if (hour < 9 || hour > 18) {
                args.cancel = true;
            }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

### ActionBegin requestType Values

| requestType | Triggered When |
|------------|----------------|
| `eventCreate` | New event is about to be saved |
| `eventChange` | Existing event is about to be updated |
| `eventRemove` | Event is about to be deleted |
| `dateNavigate` | Date navigation occurs |
| `viewNavigate` | View change occurs |

---

## Read-only Scheduler

Set `readonly: true` to prevent all CRUD operations:

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    readonly: true,
    eventSettings: { dataSource: data }
});
scheduleObj.appendTo('#Schedule');
```
