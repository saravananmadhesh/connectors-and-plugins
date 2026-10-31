# Customized Current Time Indicator

Configure and customize the Scheduler's **current time indicator** — the line (and optional time label) that marks the system clock in time-grid and timeline views. The indicator can be toggled on/off, its time label can be hidden, the indicator can be extended into previous date columns, and the indicator can be promoted above appointment cells so it is never visually occluded.

**Package**: `@syncfusion/ej2-angular-schedule`

---

## Table of Contents

- [When to Read This Reference](#when-to-read-this-reference)
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Supported Views](#supported-views)
- [Configuration](#configuration)
  - [`showTimeIndicator` (Scheduler)](#showtimeindicator-scheduler)
  - [`currentTimeIndicatorSettings` (Scheduler)](#currenttimeindicatorsettings-scheduler)
  - [Inline vs. Property-Bound Settings](#inline-vs-property-bound-settings)
- [Minimal Working Sample](#minimal-working-sample)
- [Interactive Sample (Checkboxes Drive State)](#interactive-sample-checkboxes-drive-state)
- [Runtime Updates](#runtime-updates)
- [Validation Rules and Constraints](#validation-rules-and-constraints)
- [Common Scenarios and Best Practices](#common-scenarios-and-best-practices)
- [Hallucination Prevention (for AI Assistants)](#hallucination-prevention-for-ai-assistants)

---

## When to Read This Reference

Read this reference when you need to:

- Show or hide the current time indicator on the Scheduler.
- Toggle the time label that is rendered next to the indicator line.
- Extend the indicator into previous date columns (so a `Week` view shows the line for every day that is "today" plus any past days that are still visible).
- Force the indicator to render **above** appointment cells (so it is not visually occluded by overlapping events).
- Build an interactive demo where checkboxes drive the indicator configuration at runtime.
- Re-render the indicator after the user changes `showTimeIndicator` or any `currentTimeIndicatorSettings` field.

## Overview

The custom current time indicator is configured with two complementary inputs:

- A boolean flag on the Scheduler — `showTimeIndicator` — that turns the whole feature on or off.
- An object on the Scheduler — `currentTimeIndicatorSettings` — that exposes three boolean sub-options:
  - `showTime` — whether the time label (e.g. `10:42 AM`) is rendered next to the line.
  - `showPreviousDates` — whether the indicator is drawn in the columns of previous dates that are still visible on the active date range.
  - `onTop` — whether the indicator is promoted to a higher z-order so it sits above appointment cells.

The line itself is part of the standard Scheduler behavior and is anchored to the system clock; it updates automatically as time progresses. All four options are toggleable, and can be combined freely.

## Prerequisites

- `ScheduleModule`, `EventSettingsModel`, and `View` imported from `@syncfusion/ej2-angular-schedule`.
- View services injected in `providers` for every view that should expose the indicator. At minimum for the time-grid and timeline views covered by this reference:
  - `DayService` — for `Day`
  - `WeekService` — for `Week`
  - `WorkWeekService` — for `WorkWeek`
  - `TimelineViewsService` — for `TimelineDay`, `TimelineWeek`, `TimelineWorkWeek`
- `CommonModule` and `FormsModule` when binding the options to checkboxes via `[(ngModel)]` (interactive demo pattern).
- `FormsModule` is **not** required for a static configuration — the options can be passed inline as a literal object on the template.

## Supported Views

The current time indicator is rendered in the time-grid and timeline views:

- `Day`
- `Week`
- `WorkWeek`
- `TimelineDay`
- `TimelineWeek`
- `TimelineWorkWeek`

The indicator is **not** rendered in `Month`, `Year`, `Agenda`, `MonthAgenda`, `TimelineMonth`, or `TimelineYear`. Switch the active view to one of the supported views when the indicator needs to be visible.

## Configuration

### `showTimeIndicator` (Scheduler)

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `showTimeIndicator` | `boolean` | No | `true` | Master switch. When `false`, neither the line nor the time label is drawn, regardless of the values inside `currentTimeIndicatorSettings`. |

### `currentTimeIndicatorSettings` (Scheduler)

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `showTime` | `boolean` | No | `true` | When `true`, the time label (clock value at the indicator's current position) is rendered next to the line. When `false`, only the line is drawn. |
| `showPreviousDates` | `boolean` | No | `true` | When `true`, the indicator is drawn in the columns of previous dates that are part of the active date range (e.g. on Monday's column when today is Tuesday). When `false`, the indicator is only drawn on the column of "today". |
| `onTop` | `boolean` | No | `true` | When `true`, the indicator is rendered above the appointment cells (higher z-order) so it stays visible even when an appointment overlaps the current time. When `false`, the indicator is rendered at the default z-order and can be partially occluded by overlapping events. |

### Inline vs. Property-Bound Settings

`currentTimeIndicatorSettings` can be provided either:

- **Inline** as a literal object on the template — convenient for static configurations and for binding every sub-option to a different control on the same page.
- **As a class property** bound with `[currentTimeIndicatorSettings]="{ ... }"` or via a typed `currentTimeIndicatorSettings` field on the component — convenient when the configuration must be derived in code (for example, toggled from a service or guard).

The reference sample uses the inline form with `[(ngModel)]` bindings so the user can flip each option independently at runtime.

## Minimal Working Sample

```typescript
import { Component } from '@angular/core';
import {
  ScheduleModule,
  EventSettingsModel,
  View,
  DayService,
  WeekService,
  WorkWeekService,
  TimelineViewsService
} from '@syncfusion/ej2-angular-schedule';

const currentDate = new Date();

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './scheduler.html',
  imports: [ScheduleModule],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    TimelineViewsService
  ]
})
export class ScheduleComponent {
  public selectedDate: Date = currentDate;
  public currentView: View = 'TimelineWeek';

  public showTimeIndicator: boolean = true;
  public showTime: boolean = true;
  public showPreviousDates: boolean = true;
  public onTop: boolean = true;

  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Travel Preparation',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 30),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 30)
      },
      {
        Id: 2,
        Subject: 'Customer Meeting',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 30)
      },
      {
        Id: 3,
        Subject: 'Lab Review',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0)
      }
    ]
  };
}
```

```html
<ejs-schedule
  width="100%"
  height="550px"
  [selectedDate]="selectedDate"
  [currentView]="currentView"
  [showTimeIndicator]="showTimeIndicator"
  [currentTimeIndicatorSettings]="{
    showTime: showTime,
    showPreviousDates: showPreviousDates,
    onTop: onTop
  }"
  [timeScale]="{ enable: true }"
  [eventSettings]="eventSettings"
>
  <e-views>
    <e-view option="Day"></e-view>
    <e-view option="Week"></e-view>
    <e-view option="WorkWeek"></e-view>
    <e-view option="TimelineDay"></e-view>
    <e-view option="TimelineWeek"></e-view>
    <e-view option="TimelineWorkWeek"></e-view>
  </e-views>
</ejs-schedule>
```

The minimal sample uses the same day for every appointment (constructed from the `currentDate` constant) so the appointments are visible alongside the indicator in any view that includes today.

## Interactive Sample (Checkboxes Drive State)

Bind each option to a checkbox using `[(ngModel)]` so the configuration can be flipped at runtime. The Scheduler re-renders the indicator automatically when these bindings change because they are plain boolean properties on the component class.

```html
<div
  style="
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    margin-bottom:16px;
    align-items:center;
  "
>
  <label>
    <input type="checkbox" [(ngModel)]="showTimeIndicator" />
    showTimeIndicator
  </label>

  <label>
    <input type="checkbox" [(ngModel)]="showTime" />
    showTime
  </label>

  <label>
    <input type="checkbox" [(ngModel)]="showPreviousDates" />
    showPreviousDates
  </label>

  <label>
    <input type="checkbox" [(ngModel)]="onTop" />
    onTop
  </label>
</div>

<ejs-schedule
  width="100%"
  height="550px"
  [selectedDate]="selectedDate"
  [currentView]="currentView"
  [showTimeIndicator]="showTimeIndicator"
  [currentTimeIndicatorSettings]="{
    showTime: showTime,
    showPreviousDates: showPreviousDates,
    onTop: onTop
  }"
  [timeScale]="{ enable: true }"
  [eventSettings]="eventSettings"
>
  <e-views>
    <e-view option="Day"></e-view>
    <e-view option="Week"></e-view>
    <e-view option="WorkWeek"></e-view>
    <e-view option="TimelineDay"></e-view>
    <e-view option="TimelineWeek"></e-view>
    <e-view option="TimelineWorkWeek"></e-view>
  </e-views>
</ejs-schedule>
```

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ScheduleModule,
  EventSettingsModel,
  View,
  DayService,
  WeekService,
  WorkWeekService,
  TimelineViewsService
} from '@syncfusion/ej2-angular-schedule';

const currentDate = new Date();

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './scheduler.html',
  imports: [CommonModule, FormsModule, ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, TimelineViewsService]
})
export class ScheduleComponent {
  public selectedDate: Date = currentDate;
  public currentView: View = 'TimelineWeek';

  public showTimeIndicator: boolean = true;
  public showTime: boolean = true;
  public showPreviousDates: boolean = true;
  public onTop: boolean = true;

  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Travel Preparation',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 30),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 30)
      },
      {
        Id: 2,
        Subject: 'Customer Meeting',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 30)
      },
      {
        Id: 3,
        Subject: 'Lab Review',
        StartTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0),
        EndTime:   new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0)
      }
    ]
  };
}
```

This is the same configuration as the reference component in `ReferenceCustomCurrentTimeIndicator/`. Each checkbox is wired to a different option so the user can verify the behavior of every option independently.

## Runtime Updates

Because the four options are simple booleans, the Scheduler picks up changes to them without any extra code:

- **Toggling `showTimeIndicator`**: re-renders the line (and label) on the next change-detection cycle. The indicator is removed or added without requiring a `refresh()` call.
- **Toggling `currentTimeIndicatorSettings.showTime`**: re-renders only the time label; the line stays in place.
- **Toggling `currentTimeIndicatorSettings.showPreviousDates`**: re-renders the indicator across the visible date range. When `true`, the line is drawn for every previous date that is still in the active range; when `false`, the line is only drawn on today's column.
- **Toggling `currentTimeIndicatorSettings.onTop`**: re-renders the indicator at the new z-order. With `onTop: true`, the line is drawn above appointment cells; with `onTop: false`, the line is drawn at the default z-order and can be occluded by overlapping events.

If the active view is changed to one that does not support the indicator (`Month`, `Year`, `Agenda`, `MonthAgenda`, `TimelineMonth`, `TimelineYear`), the indicator is no longer rendered. Switching back to a supported view brings it back automatically.

## Validation Rules and Constraints

- `showTimeIndicator` is a boolean. Do not pass `undefined`, `null`, or a string. The default is `true`; set it to `false` explicitly to hide the indicator.
- `currentTimeIndicatorSettings` is an object with the three boolean sub-options listed above. Do not invent additional sub-options (`color`, `width`, `position`, etc.) — the Scheduler does not expose them.
- The line position itself is **not** user-configurable — it is anchored to the system clock. The time label, the extension to previous dates, and the z-order are the only customization points.
- The feature is only rendered in the supported views listed under [Supported Views](#supported-views). Switching the active view to a non-time-grid view (e.g. `Month`) hides the indicator regardless of the configuration.
- When using inline `currentTimeIndicatorSettings="{ ... }"` on the template, every property name must match the exact casing shown above (`showTime`, `showPreviousDates`, `onTop`). Property renames break the binding silently.
- For interactive demos, `FormsModule` must be imported and listed in the `imports` array of the component so that `[(ngModel)]` is available on the template.
- View services must be registered in `providers` for every view that should display the indicator. Adding a view to the `<e-views>` block without its corresponding service causes a runtime error.

## Common Scenarios and Best Practices

- **Real-time awareness in a meeting-room scheduler**: keep `showTimeIndicator: true` and `currentTimeIndicatorSettings.showTime: true` so attendees can see both the line and the clock value at a glance.
- **Reduce visual clutter in a day view**: keep the line but set `currentTimeIndicatorSettings.showTime: false` to hide the time label. The line still anchors the user to the current time, but the cell is less crowded.
- **Multi-day timeline with a long-running event today**: set `currentTimeIndicatorSettings.onTop: true` so the indicator stays visible even when the running event overlaps the current time. With `onTop: false`, the event cell paints over the line.
- **Show the indicator only on today's column in `Week`/`WorkWeek` views**: set `currentTimeIndicatorSettings.showPreviousDates: false`. The line is only drawn on the column whose date matches the system clock.
- **Show the indicator on every previous day that is still in the active range** (e.g. a `Week` view where Monday through Wednesday are "previous" and the line should mark each of them as well as today): keep `currentTimeIndicatorSettings.showPreviousDates: true`.
- **Pair with `timeScale`**: enabling `[timeScale]="{ enable: true }"` is the recommended pattern when the indicator is shown in a time-grid view, because the line snaps to the timescale grid.
- **Switching the view at runtime**: after changing `currentView` programmatically, the Scheduler renders the indicator automatically when the destination view is in the supported list. No extra `refresh()` call is required.

## Hallucination Prevention (for AI Assistants)

- Only the four properties listed in this reference are supported: `showTimeIndicator` (boolean, on the Scheduler) and `currentTimeIndicatorSettings.showTime`, `currentTimeIndicatorSettings.showPreviousDates`, `currentTimeIndicatorSettings.onTop` (all booleans, on the Scheduler). Do not invent additional sub-options such as `color`, `width`, `position`, `timeFormat`, or `interval`.
- The line position is anchored to the system clock and is not user-configurable. Do not suggest custom date values to move the line.
- Supported views are limited to `Day`, `Week`, `WorkWeek`, `TimelineDay`, `TimelineWeek`, and `TimelineWorkWeek`. Do not claim indicator support in `Month`, `Year`, `Agenda`, `MonthAgenda`, `TimelineMonth`, or `TimelineYear`.
- The corresponding view services (`DayService`, `WeekService`, `WorkWeekService`, `TimelineViewsService`) must be listed in `providers` for the views that should display the indicator. `TimelineViewsService` covers `TimelineDay`, `TimelineWeek`, and `TimelineWorkWeek` together.
- For interactive demos, `FormsModule` is required so that `[(ngModel)]` is available on the template. Do not omit it from `imports` when checkboxes are used.
- Property casing must match exactly: `showTimeIndicator`, `currentTimeIndicatorSettings`, `showTime`, `showPreviousDates`, `onTop`. Renames break the binding silently and produce no runtime error.
- The minimal sample uses the current day (`new Date()`) for every appointment so the appointments are visible alongside the indicator in any supported view that includes today. Do not hard-code a year like `2024` when the user wants the indicator to be visible at runtime — the indicator is anchored to the system clock, so a past date in `selectedDate` still anchors to the system clock, but the appointments will not overlap the line if they are not on today's date.
- Do not wrap `showTimeIndicator` or `currentTimeIndicatorSettings` inside the `<e-views>` block — both are Scheduler-level properties, not per-view options.
- Do not invent CSS class names for the indicator; rely on the default theme styles.
