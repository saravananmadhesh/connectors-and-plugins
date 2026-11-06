# Scheduler Styling Reference

## Table of contents

- [Overview](#overview)
- [`cssClass` Property](#cssclass-property)
- [`eventRendered` Event](#eventrendered-event)
    - [`EventRenderedArgs` Properties](#eventrenderedargs-properties)
- [CSS Classes Reference Table](#css-classes-reference-table)
- [Minimum Appointment Height via `eventRendered`](#minimum-appointment-height-via-eventrendered)
- [Weekend Cell Styling](#weekend-cell-styling)
- [Theme Studio](#theme-studio)

## Overview

Customize the Scheduler appearance by overriding default CSS classes, using the `cssClass` property, or applying dynamic styles through the `eventRendered` event.

---

## `cssClass` Property

Add a custom CSS class to the Scheduler root element to scope overrides safely.

```ts
import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    width: '100%',
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    cssClass: 'my-custom-schedule',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

Then apply custom CSS using the scoped class:
```css
.my-custom-schedule.e-schedule .e-vertical-view .e-work-cells {
    background-color: #f5f5f5;
}
```

---

## `eventRendered` Event

Triggered before each appointment renders on the Scheduler. Use it to apply dynamic styles (e.g., set background color from a data field).

```ts
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    width: '100%',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: scheduleData },
    eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args)
});
scheduleObj.appendTo('#Schedule');

function applyCategoryColor(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
        return;
    }
    if (scheduleObj.currentView === 'Agenda') {
        (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
        args.element.style.backgroundColor = categoryColor;
    }
}
```

### `EventRenderedArgs` Properties

| Property | Type | Description |
|---|---|---|
| `element` | HTMLElement | The appointment DOM element |
| `data` | Object | The event data object (all fields accessible) |
| `type` | string | Event type string |

---

## CSS Classes Reference Table

Source: `docs/scheduler-styling.md`

| CSS Class | Purpose |
|---|---|
| `.e-schedule .e-vertical-view .e-work-cells` | Work cells in vertical views |
| `.e-schedule .e-month-view .e-work-cells` | Work cells in Month view |
| `.e-schedule .e-month-view .e-other-month` | Other month cells in Month view |
| `.e-schedule .e-timeline-view .e-work-cells` | Work cells in Timeline views |
| `.e-schedule .e-timeline-month-view .e-work-cells` | Work cells in Timeline Month view |
| `.e-schedule .e-timeline-year-view .e-work-cells` | Work cells in Timeline Year view |
| `.e-schedule .e-timeline-year-view .e-work-cells.e-other-month` | Other month cells in Timeline Year view |
| `.e-schedule .e-vertical-view .e-all-day-cells` | All-day cells in vertical views |
| `.e-schedule .e-vertical-view .e-work-hours` | Work hour cells in vertical views |
| `.e-schedule .e-month-view .e-work-days` | Work day cells in Month view |
| `.e-schedule .e-timeline-view .e-work-hours` | Work hour cells in Timeline views |
| `.e-schedule .e-vertical-view .e-day-wrapper .e-appointment` | Appointments in vertical views |
| `.e-schedule .e-vertical-view .e-all-day-appointment-wrapper .e-appointment` | All-day appointments in vertical views |
| `.e-schedule .e-month-view .e-appointment` | Appointments in Month view |
| `.e-schedule .e-timeline-view .e-appointment` | Appointments in Timeline views |
| `.e-schedule .e-timeline-month-view .e-appointment` | Appointments in Timeline Month view |
| `.e-schedule .e-agenda-view .e-appointment` | Appointments in Agenda view |
| `.e-schedule .e-block-appointment` | Block appointments |
| `.e-schedule .e-read-only` | Read-only appointments |
| `e-appointment-border` | Currently selected appointment |
| `e-selected-cells` | Currently selected work cells |
| `e-header-cells` | Header cells |
| `.e-schedule .e-vertical-view .e-resource-cells` | Resource cells in vertical views |
| `.e-schedule .e-month-view .e-resource-cells` | Resource cells in Month view |
| `.e-schedule .e-timeline-view .e-resource-cells` | Resource cells in Timeline views |
| `e-parent-node` | Parent resource cells in Timeline views |
| `e-child-node` | Child resource cells in Timeline views |

---

## Minimum Appointment Height via `eventRendered`

Set a minimum height on short appointments using `eventRendered`:

```ts
eventRendered: (args: EventRenderedArgs) => {
    let appHeight: number = /* calculate based on slot height */;
    args.element.style.height = appHeight + 'px';
}
```

---

## Weekend Cell Styling

```css
/* Non-working day cells in month view */
.my-custom-schedule.e-schedule .e-month-view .e-work-cells:not(.e-work-days) {
    background-color: #f08080;
}
```

Or use `renderCell` for dynamic coloring in Week view (see [cell-header-customization.md](cell-header-customization.md)).

---

