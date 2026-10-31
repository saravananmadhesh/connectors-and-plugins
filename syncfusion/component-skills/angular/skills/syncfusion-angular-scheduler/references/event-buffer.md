# Event Buffer

Configure pre-event and post-event buffer times for Scheduler appointments to reserve preparation and recovery (or transition) periods around each appointment, prevent overlap with adjacent events, and visually render the buffer pill inside the schedule cells.

**Package**: `@syncfusion/ej2-angular-schedule`

---

## Table of Contents

- [When to Read This Reference](#when-to-read-this-reference)
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Supported Views](#supported-views)
- [Configuration](#configuration)
  - [`eventSettings` Properties](#eventsettings-properties)
  - [Buffer Template Context](#buffer-template-context)
  - [Event Record Shape](#event-record-shape)
- [Minimal Working Sample](#minimal-working-sample)
- [Resource-Related Behavior](#resource-related-behavior)
- [Validation Rules and Constraints](#validation-rules-and-constraints)
- [Common Scenarios and Best Practices](#common-scenarios-and-best-practices)
- [Hallucination Prevention (for AI Assistants)](#hallucination-prevention-for-ai-assistants)

---

## When to Read This Reference

Read this reference when you need to:

- Add pre-procedure / post-procedure (or pre-appointment / post-appointment) buffer time around events
- Reserve a fixed number of minutes before and after each event for preparation, cleanup, or transition
- Visually render the buffer pill with a custom `bufferTemplate` (icon, label, duration text)
- Combine buffer time with `allowOverlap="false"` so adjacent events cannot intrude on the reserved range
- Restrict drag-and-drop so an event is only moved into a resource that matches its required specialty
- Re-anchor buffers on the event edges during drag and resize previews
- Generate sample data and field mappings that pair each event with `bufferBefore` / `bufferAfter` values (in minutes)

## Overview

Event Buffer extends `EventSettingsModel` with three pieces:

- A boolean flag that activates the feature.
- Two field mappings (in **minutes**) that point at numeric properties on each event record.
- An optional `bufferTemplate` that renders inside the buffer pill (icon, text, custom markup).

When enabled, the Scheduler reserves a `bufferBefore` minute range immediately before `StartTime` and a `bufferAfter` minute range immediately after `EndTime`. The reserved range is excluded from overlap detection when `allowOverlap` is `false`, and it is rendered as a small pill inside the cell, anchored to the event edges.

## Prerequisites

- `EventSettingsModel`, `ScheduleComponent`, and view services (`DayService`, `TimelineViewsService`, etc.) imported from `@syncfusion/ej2-angular-schedule`.
- For interactive demos with confirmation dialogs, the popups package: `DialogComponent` / `DialogModule` from `@syncfusion/ej2-angular-popups`.
- For drag, resize, and template re-rendering on view change, also include the related services in `providers`:
  - `DragAndDropService`
  - `ResizeService`
- `CommonModule` for `*ngIf` and `*ngFor` inside the templates.

## Supported Views

Buffers are rendered in the time-grid and timeline views:

- `Day`
- `Week`
- `WorkWeek`
- `TimelineDay`
- `TimelineWeek`
- `TimelineWorkWeek`

Buffers are **not** rendered in `Month`, `Year`, `Agenda`, `MonthAgenda`, or `TimelineMonth` / `TimelineYear` views. When the active view is one of those, the buffer pill will not be visible even though the reserved range is still enforced for overlap detection.

## Configuration

### `eventSettings` Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `enableBuffer` | `boolean` | Yes | Set to `true` to turn on the event buffer feature. Without this flag the field mappings and template are ignored. |
| `fields.bufferBefore` | `{ name: string }` | Yes | Maps to the event property that holds the **pre-event** buffer value, in **minutes**. |
| `fields.bufferAfter` | `{ name: string }` | Yes | Maps to the event property that holds the **post-event** buffer value, in **minutes**. |
| `bufferTemplate` | `TemplateRef<any>` | No | Custom template that renders inside the buffer pill. Receives a `data` context described below. |

### Buffer template context

The `bufferTemplate` receives a `data` object with the following shape:

| Field | Type | Description |
|-------|------|-------------|
| `data.data` | `Record<string, any>` | The full event record (same shape as the datasource item). |
| `data.bufferType` | `'before' \| 'after'` | `'before'` for the pill rendered before `StartTime`, `'after'` for the pill rendered after `EndTime`. |

Use `data.bufferType` to differentiate the two pills (for example, different icons or colors) and read the duration from the event record using the field names mapped in `fields`.

### Event record shape

Each event in the `dataSource` must include the two numeric fields mapped in `eventSettings.fields`:

```typescript
{
  Id: number,
  Subject: string,
  StartTime: Date,
  EndTime: Date,
  IsAllDay: boolean,
  // ...other custom fields...
  bufferBefore: number, // minutes reserved before StartTime
  bufferAfter: number   // minutes reserved after EndTime
}
```

## Minimal Working Sample

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ScheduleComponent,
    EventSettingsModel,
    ScheduleModule,
    View,
    DayService,
    TimelineViewsService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ScheduleModule],
    providers: [DayService, TimelineViewsService],
    template: `
        <ejs-schedule
            #scheduleObj
            width="100%"
            height="550px"
            [selectedDate]="selectedDate"
            [currentView]="currentView"
            [allowOverlap]="false"
            [eventSettings]="eventSettings">
            <e-views>
                <e-view option="Day"></e-view>
                <e-view option="TimelineDay"></e-view>
                <e-view option="TimelineWeek"></e-view>
            </e-views>
        </ejs-schedule>

        <ng-template #bufferTemplate let-data>
            <div class="buffer-minimal" *ngIf="showBuffer(data)">
                <span class="buffer-duration">
                    {{ getBufferDuration(data) }} min
                </span>
            </div>
        </ng-template>
    `
})
export class AppComponent implements AfterViewInit {
    @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
    @ViewChild('bufferTemplate', { static: true })
    public bufferTemplateRef: any;

    public selectedDate: Date = new Date();
    public currentView: View = 'TimelineDay';

    public eventSettings: EventSettingsModel = {
        dataSource: [
            {
                Id: 1,
                Subject: 'Surgery',
                StartTime: new Date(2024, 0, 15, 9, 0),
                EndTime:   new Date(2024, 0, 15, 10, 30),
                IsAllDay: false,
                bufferBefore: 30,
                bufferAfter:  45
            }
        ],
        enableBuffer: true,
        fields: {
            bufferBefore: { name: 'bufferBefore' },
            bufferAfter:  { name: 'bufferAfter'  }
        }
    };

    public ngAfterViewInit(): void {
        this.eventSettings = {
            ...this.eventSettings,
            bufferTemplate: this.bufferTemplateRef
        };
    }

    public getBufferDuration(args: any): number {
        return args.bufferType === 'before'
            ? args.data.bufferBefore
            : args.data.bufferAfter;
    }

    public showBuffer(args: any): boolean {
        return this.getBufferDuration(args) >= 10;
    }
}
```

## Resource-Related Behavior

- Buffers coexist with the resource pipeline: a buffered reserved range is honored **per resource row** (the same resource cannot be double-booked across the buffer range).
- A buffer pill is rendered only when the event's record contains the configured `bufferBefore` / `bufferAfter` values and `enableBuffer` is `true`.
- Drag-and-drop validation against a resource (e.g. matching `RequiredSkill`) is **separate** from buffer enforcement. Implement resource-based validation in `dragStop` and `actionBegin`; do not rely on `allowOverlap` to enforce it.

## Validation Rules and Constraints

- `bufferBefore` and `bufferAfter` values must be expressed in **minutes**, not in any other time unit.
- Buffers are honored for overlap detection only when `allowOverlap` is `false`. With `allowOverlap` set to `true` (the default), the reserved range is rendered but not enforced.
- The `bufferTemplate` is optional. When omitted, the Scheduler renders a default pill.
- `enableBuffer` must be set to `true`. The field mappings are ignored when the flag is `false` (the default).
- Bind `bufferTemplate` after the view has been created (for example, in `ngAfterViewInit`) by spreading the existing `eventSettings` and assigning `bufferTemplate` to the template reference. Assigning it during field initialization will not work because the template is not yet available.
- Resource-based drop validation (for example, specialty matching) is not provided by the buffer feature itself. Use `dragStop` and `actionBegin` event handlers, and set `args.cancel = true` to reject the drop.

## Common Scenarios and Best Practices

- **Surgery / procedure scheduling**: pair `enableBuffer` with a `group` of operating rooms and a `dragStop` validator that requires the room's `Specialty` to match the event's `RequiredSkill`. This is the pattern demonstrated in the reference sample.
- **Appointment booking with preparation time**: keep `bufferBefore` small (for example, 10 minutes) and `bufferAfter` larger (for example, 15-30 minutes) so the cleanup / notes period is reserved.
- **Avoid using buffers in `Month` / `Year` / `Agenda` views**: the pill is not rendered there, which may confuse end users. Restrict the available views to the time-grid and timeline views listed under "Supported Views".
- **Hide the pill for very small buffers**: gate the inner content on a minimum duration in the template (for example, `*ngIf="getBufferDuration(data) >= 10"`) so that a 1- or 5-minute buffer does not clutter the cell.
- **Refresh templates on view change**: if the buffer template's content depends on the current view, call `scheduleObj.refreshTemplates()` from `actionComplete` when `args.requestType === 'viewNavigate'`.
- **Re-anchor on drag / resize**: the buffer range follows the event edges automatically during drag and resize. No extra code is required.

## Hallucination Prevention (for AI Assistants)

- Only mention the properties, events, and templates that are explicitly listed in this reference. Do not invent additional buffer-related fields, services, or events.
- Buffer values are always in **minutes**. Do not describe them as hours, seconds, or any other unit.
- The supported view list is limited to `Day`, `Week`, `WorkWeek`, `TimelineDay`, `TimelineWeek`, and `TimelineWorkWeek`. Do not claim buffer support in `Month`, `Year`, `Agenda`, `MonthAgenda`, `TimelineMonth`, or `TimelineYear`.
- Resource-based drop validation (specialty matching, role matching, etc.) is **not** built into the buffer feature. Describe it as a `dragStop` / `actionBegin` pattern, not as a buffer property.
- The `bufferTemplate` is bound in `ngAfterViewInit`, not during field initialization. Do not recommend binding it directly in the property initializer.
- When generating samples, use the same field names that the reference component uses (`bufferBefore`, `bufferAfter`) so the field mappings match without renaming.
- The basic `bufferTemplate` only renders the buffer duration as text. Icons are an optional enhancement layered on top of the basic template; do not put icon markup inside the basic sample.
