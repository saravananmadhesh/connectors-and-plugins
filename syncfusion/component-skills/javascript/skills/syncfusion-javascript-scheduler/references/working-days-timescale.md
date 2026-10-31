# Working Days & Timescale Reference

## Table of contents

- [Working Days Configuration](#working-days-configuration)
    - [`workDays` Property](#workdays-property)
    - [`showWeekend` Property](#showweekend-property)
    - [`showWeekNumber` Property](#showweeknumber-property)
    - [`workHours` Property](#workhours-property)
    - [`startHour` and `endHour` Properties](#starthour-and-endhour-properties)
    - [`firstDayOfWeek` Property](#firstdayofweek-property)
    - [`scrollTo()` Method](#scrollto-method)
- [Timescale Configuration](#timescale-configuration)
    - [`timeScale` Property](#timescale-property)
    - [Setting Different Slot Durations](#setting-different-slot-durations)
    - [Customizing Time Cells with Templates](#customizing-time-cells-with-templates)
    - [Hiding the Timescale](#hiding-the-timescale)
    - [`showTimeIndicator` Property](#showtimeindicator-property)
- [Quick Reference Table](#quick-reference-table)

## Working Days Configuration

### `workDays` Property

Set custom working days using the `workDays` array. Values: `0` = Sunday, `1` = Monday, `2` = Tuesday, `3` = Wednesday, `4` = Thursday, `5` = Friday, `6` = Saturday.

Default: `[1, 2, 3, 4, 5]` (Monday to Friday).

```ts
import { Schedule, Week, WorkWeek, Month, TimelineViews } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, WorkWeek, Month, TimelineViews);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    currentView: 'WorkWeek',
    views: ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineWorkWeek'],
    workDays: [1, 3, 5],   // Monday, Wednesday, Friday
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

> Work week and Timeline Work week views display **only** the defined working days. Other views display all days and visually differentiate non-working days with inactive cell color.

---

### `showWeekend` Property

Show or hide weekend days. Default is `true`. Days NOT in `workDays` are considered non-working/weekend days.

```ts
let scheduleObj: Schedule = new Schedule({
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'TimelineMonth'],
    showWeekend: false,
    workDays: [1, 3, 4, 5],  // Mon, Wed, Thu, Fri — remaining days (0, 2, 6) hidden
    eventSettings: { dataSource: scheduleData }
});
```

> Not applicable on Work Week view (non-working days are always excluded there).

---

### `showWeekNumber` Property

Show week number in the header bar. Default is `false`. In Month view, week numbers appear as a first column.

```ts
let scheduleObj: Schedule = new Schedule({
    currentView: 'Month',
    views: ['Day', 'Week', 'Month'],
    showWeekNumber: true,
    eventSettings: { dataSource: scheduleData }
});
```

> Not applicable on Timeline views — use `headerRows` for that use case.

#### `weekRule` Property

Configure how week numbers are calculated. Requires `showWeekNumber: true`. Options: `FirstDay`, `FirstFourDayWeek`, `FirstFullWeek`.

---

### `workHours` Property

Highlight the business/working hour range. Accepts a `workHoursModel` object.

| Sub-option | Type | Description |
|---|---|---|
| `highlight` | boolean | Enable/disable highlighting of work hours. |
| `start` | string | Start time of working hours (e.g., `'09:00'`). |
| `end` | string | End time of working hours (e.g., `'18:00'`). |

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'WorkWeek'],
    workHours: {
        highlight: true,
        start: '11:00',
        end: '20:00'
    },
    eventSettings: { dataSource: scheduleData }
});
```

---

### `startHour` and `endHour` Properties

Restrict the visible time range on the Scheduler layout. Hours outside this range are hidden.

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'WorkWeek'],
    startHour: '07:00',
    endHour: '18:00',
    eventSettings: { dataSource: scheduleData }
});
```

---

### `firstDayOfWeek` Property

Set the first day of the week. Default is `0` (Sunday). Values: `0` = Sunday through `6` = Saturday.

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Week', 'Month'],
    firstDayOfWeek: 3,  // Wednesday
    eventSettings: { dataSource: scheduleData }
});
```

---

### `scrollTo()` Method

Scroll the Scheduler to a specific time programmatically.

```ts
scheduleObj.scrollTo('09:00');

// Scroll to current time on load
let scheduleObj: Schedule = new Schedule({
    created: (): void => {
        let intl: Internationalization = new Internationalization();
        scheduleObj.scrollTo(intl.formatDate(new Date(), { skeleton: 'Hm' }));
    }
});
```

---

## Timescale Configuration

### `timeScale` Property

Controls time slot duration and appearance. Accepts a `timeScaleModel` object.

| Sub-option | Type | Default | Description |
|---|---|---|---|
| `enable` | boolean | `true` | Show/hide grid lines for time slots. When `false`, appointments stack without grid lines. |
| `interval` | number | `60` | Duration of each major time slot in minutes. |
| `slotCount` | number | `2` | Number of minor slots per major interval. |
| `majorSlotTemplate` | string | — | Template for major time slot cells. |
| `minorSlotTemplate` | string | — | Template for minor time slot cells. |

> **Max slots per day:** The combined result of `interval` and `slotCount` cannot exceed 1000 slots/day. This applies to `TimelineDay`, `TimelineWeek`, and `TimelineWorkWeek` views only.

---

### Setting Different Slot Durations

```ts
import { Schedule, Day, Week, WorkWeek } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    views: ['Day', 'Week', 'WorkWeek'],
    timeScale: {
        enable: true,
        interval: 60,
        slotCount: 6   // 6 slots × 10 min each = 1 hour major interval
    },
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

### Customizing Time Cells with Templates

```ts
import { Internationalization } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek);

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).majorSlotTemplate = (date: Date) => {
    return instance.formatDate(date, { skeleton: 'hm' });
};
(window as TemplateFunction).minorSlotTemplate = (date: Date) => {
    return instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
};

interface TemplateFunction extends Window {
    majorSlotTemplate?: Function;
    minorSlotTemplate?: Function;
}

let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'WorkWeek'],
    timeScale: {
        enable: true,
        interval: 60,
        slotCount: 6,
        majorSlotTemplate: '#majorSlotTemplate',
        minorSlotTemplate: '#minorSlotTemplate'
    },
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

In HTML, define the templates:
```html
<script id="majorSlotTemplate" type="text/x-template">
    <div>${majorSlotTemplate(data.date)}</div>
</script>
<script id="minorSlotTemplate" type="text/x-template">
    <div style="text-align: right; margin-right: 15px">${minorSlotTemplate(data.date)}</div>
</script>
```

---

### Hiding the Timescale

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'TimelineWorkWeek'],
    timeScale: {
        enable: false
    },
    eventSettings: { dataSource: scheduleData }
});
```

---

### `showTimeIndicator` Property

Show or hide the current time indicator. Default is `true`. The indicator appears in Day, Week, Work Week, Timeline Day, Timeline Week, and Timeline Work Week views.

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'WorkWeek', 'TimelineDay'],
    showTimeIndicator: true
});
```

---

## Quick Reference Table

| Property | Type | Default | Description |
|---|---|---|---|
| `workDays` | number[] | `[1,2,3,4,5]` | Active working days (0=Sun to 6=Sat) |
| `showWeekend` | boolean | `true` | Show/hide non-working days |
| `showWeekNumber` | boolean | `false` | Show week numbers in header |
| `weekRule` | string | `'FirstDay'` | Rule for week number calculation |
| `workHours.highlight` | boolean | `true` | Highlight working hours |
| `workHours.start` | string | `'09:00'` | Work hours start time |
| `workHours.end` | string | `'18:00'` | Work hours end time |
| `startHour` | string | `'00:00'` | Scheduler display start time |
| `endHour` | string | `'24:00'` | Scheduler display end time |
| `firstDayOfWeek` | number | `0` | First day of week (0=Sun) |
| `timeScale.enable` | boolean | `true` | Show/hide time slot grid lines |
| `timeScale.interval` | number | `60` | Major slot duration in minutes |
| `timeScale.slotCount` | number | `2` | Minor slots per major interval |
| `timeScale.majorSlotTemplate` | string | — | Template for major time cells |
| `timeScale.minorSlotTemplate` | string | — | Template for minor time cells |
| `showTimeIndicator` | boolean | `true` | Show current time indicator |
