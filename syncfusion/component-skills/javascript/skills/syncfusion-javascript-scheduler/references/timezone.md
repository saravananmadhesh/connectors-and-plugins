# Timezone Reference

## Table of contents

- [Overview](#overview)
- [`timezone` Property](#timezone-property)
- [No Explicit Timezone](#no-explicit-timezone)
- [UTC Timezone (Same Time for All Users)](#utc-timezone-same-time-for-all-users)
- [Per-Event Timezones (`startTimezone` / `endTimezone`)](#per-event-timezones-starttimezone--endtimezone)
- [Customize Timezone List in the Editor](#customize-timezone-list-in-the-editor)
- [`Timezone` Utility Class](#timezone-utility-class)
- [Summary Table](#summary-table)

## Overview

By default, the Scheduler uses the client system's time zone. Use the `timezone` property to display appointments in a specific time zone. Individual appointments can also carry their own time zone information using `startTimezone` and `endTimezone` fields.

> The `timezone` property affects appointment processing and the current-time indicator only.

---

## `timezone` Property

Set the Scheduler's display timezone. All appointments will render according to this zone regardless of the client's local setting.

```ts
import { Schedule, Day, Week, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    views: ['Day', 'Week', 'Month'],
    selectedDate: new Date(2018, 1, 17),
    timezone: 'America/New_York',
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## No Explicit Timezone

When no `timezone` is set, appointments render in the client browser's local time zone.

```ts
import { Schedule, Day, Week, TimelineViews, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, TimelineViews, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'TimelineWeek', 'Month', 'Agenda'],
    eventSettings: {
        dataSource: [{
            Subject: 'Paris',
            StartTime: new Date(2018, 1, 15, 9, 0),
            EndTime: new Date(2018, 1, 15, 10, 0)
        }]
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## UTC Timezone (Same Time for All Users)

Set `timezone: 'UTC'` and strip local offsets using the `Timezone` utility to ensure all users see the same wall-clock time.

```ts
import { Schedule, Day, Week, Month, Timezone } from '@syncfusion/ej2-schedule';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, Month);

let fifaEvents: Object[] = <Object[]>extend([], fifaEventsData, null, true);
let timezone: Timezone = new Timezone();
for (let fifaEvent of fifaEvents) {
    let event: { [key: string]: Object } = fifaEvent as { [key: string]: Object };
    event.StartTime = timezone.removeLocalOffset(<Date>event.StartTime);
    event.EndTime = timezone.removeLocalOffset(<Date>event.EndTime);
}

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 5, 17),
    views: ['Day', 'Week', 'Month'],
    timezone: 'UTC',
    eventSettings: { dataSource: fifaEvents }
});
scheduleObj.appendTo('#Schedule');
```

---

## Per-Event Timezones (`startTimezone` / `endTimezone`)

Provide `StartTimezone` and `EndTimezone` fields in the event data to render each appointment in its originating time zone.

```ts
import { Schedule, Day, Week, TimelineViews, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, TimelineViews, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'TimelineWeek', 'Month', 'Agenda'],
    eventSettings: {
        dataSource: [{
            Subject: 'Paris',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 15, 12, 30),
            StartTimezone: 'Europe/Moscow',
            EndTimezone: 'Europe/Moscow'
        }]
    }
});
scheduleObj.appendTo('#Schedule');
```

> The `StartTimezone` and `EndTimezone` field names must match the mapped fields in `eventSettings.fields` if using custom field names.

---

## Customize Timezone List in the Editor

The editor popup shows 200+ timezone entries by default. Customize using the `timezoneData` export from `@syncfusion/ej2-schedule`.

```ts
import { Schedule, Day, Week, Month, timezoneData } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month);

let customTimezoneData: { [key: string]: Object }[] = [
    { Value: 'America/New_York', Text: '(UTC-05:00) Eastern Time' },
    { Value: 'UTC', Text: 'UTC' },
    { Value: 'Asia/Kolkata', Text: '(UTC+05:30) India Standard Time' }
];

// Replace all entries with custom set
timezoneData.splice(0, timezoneData.length, ...customTimezoneData);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 11),
    views: ['Day', 'Week', 'Month'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## `Timezone` Utility Class

Import `Timezone` from `@syncfusion/ej2-schedule` for programmatic timezone offset operations.

| Method | Description |
|---|---|
| `removeLocalOffset(date)` | Strips the local time zone offset from a Date object (useful for UTC normalization) |

---

## Summary Table

| Property/Field | Scope | Description |
|---|---|---|
| `timezone` | Schedule | Set global display timezone for all appointments |
| `StartTimezone` | Event data field | Per-event start timezone (IANA format, e.g., `'America/New_York'`) |
| `EndTimezone` | Event data field | Per-event end timezone (IANA format) |
| `timezoneData` | Module export | Array of timezone entries for the editor dropdown |
| `Timezone` | Class | Utility class for timezone offset operations |
