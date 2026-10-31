# Event Buffer

## Table of Contents
- [Feature Overview](#feature-overview)
- [When to Use EventBuffer](#when-to-use-eventbuffer)
- [When Not to Use EventBuffer](#when-not-to-use-eventbuffer)
- [Required Scheduler Configuration](#required-scheduler-configuration)
- [Required Event Data Fields](#required-event-data-fields)
- [EventBuffer Settings](#eventbuffer-settings)
- [BufferTemplate Configuration and Usage](#buffertemplate-configuration-and-usage)
- [Dependencies and Prerequisites](#dependencies-and-prerequisites)
- [Supported Views](#supported-views)
- [Conflicts and Overlap Detection](#conflicts-and-overlap-detection)
- [Constraints and Limitations](#constraints-and-limitations)
- [Validation Guidance](#validation-guidance)
- [AI Generation Guidance](#ai-generation-guidance)
- [Best Practices](#best-practices)

## Feature Overview

The Event Buffer feature reserves a configurable amount of time **before** and **after** every appointment. The buffer represents preparation, recovery, transition, or any reserved time that is not part of the event itself but must stay free.

Buffers are rendered as visual pills next to the appointment and are also taken into account by the Scheduler's overlap detection logic. When `allowOverlap` is disabled, the buffer range is treated as reserved and a conflicting event is rejected.

The feature is activated by the `enableBuffer` flag of `eventSettings`. The buffer durations are sourced from event data through field mapping, and the visual appearance of each buffer pill is fully customizable through `bufferTemplate`.

## When to Use EventBuffer

Use the Event Buffer feature when:

- An appointment requires pre-event preparation time (sterilization, equipment setup, patient intake).
- An appointment requires post-event recovery or cleanup time (recovery room, sanitization, teardown).
- The Scheduler must enforce a "no-overlap" rule on a window that is larger than the event duration itself (for example, a 60-minute surgery needs 30 minutes before and 30 minutes after for a total 2-hour reserved range).
- A domain workflow needs to visualize the reserved range so users can see the planning context around an event.
- Drag and drop must respect the extended reserved range rather than only the event body.

Common domains: healthcare scheduling (operating rooms, consultations, infusions), manufacturing (machine setup/teardown), laboratories (sample prep and analysis), field service (travel + arrival), broadcast media (setup + rehearsal + broadcast + breakdown).

## When Not to Use EventBuffer

Do not use the Event Buffer feature when:

- The "buffer" duration is the same for every event and never changes. In that case, extend the appointment's `StartTime` and `EndTime` instead of enabling buffers.
- The reserved range is not time-bound (for example, "doctor is on vacation next week" is a full-day block, not a buffer).
- The Scheduler is in a view that does not support buffers (see [Supported Views](#supported-views)).
- The reserved range is meant to overlap with other events by design. Event Buffer relies on overlap prevention semantics; if overlapping is allowed, the buffer loses its meaning.
- You need the reserved range to be a separately editable entity. Buffers are derived from event fields and cannot be edited independently.

## Required Scheduler Configuration

To enable Event Buffer:

1. Set `eventSettings.enableBuffer` to `true`.
2. Map the buffer fields through `eventSettings.fields`:
   - `bufferBefore: { name: 'bufferBefore' }`
   - `bufferAfter: { name: 'bufferAfter' }`
3. Provide a `bufferTemplate` name (the slot name) and declare the corresponding slot in the template.
4. Inject the views that should support buffers (see [Supported Views](#supported-views)).
5. To enforce conflict detection on the buffer range, set `allowOverlap` to `false`.

```vue
<ejs-schedule
  :selectedDate="selectedDate"
  :currentView="currentView"
  :allowOverlap="false"
  :eventSettings="eventSettings">
  <e-views>
    <e-view option="Day"></e-view>
    <e-view option="TimelineDay"></e-view>
    <e-view option="TimelineWeek"></e-view>
  </e-views>
</ejs-schedule>
```

```vue
<script>
export default {
  data() {
    return {
      eventSettings: {
        enableBuffer: true,
        dataSource: [],
        bufferTemplate: 'bufferTemplate',
        fields: {
          bufferBefore: { name: 'bufferBefore' },
          bufferAfter: { name: 'bufferAfter' }
        }
      }
    };
  }
};
</script>
```

## Required Event Data Fields

Every event that should display a buffer must carry the following two numeric fields (in minutes):

| Field | Type | Description |
|-------|------|-------------|
| `bufferBefore` | number | Reserved minutes **before** the event's `StartTime`. |
| `bufferAfter` | number | Reserved minutes **after** the event's `EndTime`. |

The Scheduler subtracts `bufferBefore` from `StartTime` to compute the buffer start, and adds `bufferAfter` to `EndTime` to compute the buffer end. If the mapped field is missing, undefined, or zero/negative, no buffer is rendered for that side.

Example event payload:

```js
{
  Id: 1,
  Subject: 'Knee Replacement',
  StartTime: new Date(2024, 0, 15, 9, 0),
  EndTime: new Date(2024, 0, 15, 10, 30),
  IsAllDay: false,
  RoomId: 2,
  bufferBefore: 30, // 30 minutes preparation
  bufferAfter: 45   // 45 minutes recovery
}
```

## EventBuffer Settings

The `eventSettings` object is the single source of configuration:

| Setting | Required | Description |
|---------|----------|-------------|
| `enableBuffer` | Yes | Activates the Event Buffer feature. |
| `dataSource` | Yes | The collection of events. |
| `bufferTemplate` | Yes (for custom UI) | The slot name used in the Vue template to render the buffer pill. |
| `fields.bufferBefore` | Yes | Field mapping for the pre-event buffer value. |
| `fields.bufferAfter` | Yes | Field mapping for the post-event buffer value. |

The `bufferBefore` and `bufferAfter` settings under `fields` accept the same shape as other field mappings: a string for a direct field name, or an object with a `name` property. Use the object form when the data field is named differently from the default and to keep room for future options.

## BufferTemplate Configuration and Usage

`bufferTemplate` is the name of a Vue slot that the Scheduler uses to render each buffer pill. The slot receives a single scoped property:

| Slot prop | Description |
|-----------|-------------|
| `data.data` | The full event object the buffer belongs to. |
| `data.bufferType` | Either `'before'` (pre-event buffer) or `'after'` (post-event buffer). |

Wire the slot in the template:

```vue
<ejs-schedule :eventSettings="eventSettings">
  <template v-slot:bufferTemplate="{ data }">
    <!-- data.bufferType is 'before' or 'after' -->
    <div class="buffer-pill">
      <span>{{ data.bufferType === 'before' ? 'Prep' : 'Recovery' }}</span>
      <span>
        {{ data.bufferType === 'before' ? data.data.bufferBefore : data.data.bufferAfter }} min
      </span>
    </div>
  </template>
</ejs-schedule>
```

In the Options API style (the form used by the reference sample), the slot name is forwarded through a method on the component so the Scheduler can resolve the template:

```js
methods: {
  bufferTemplate() {
    return { template: this.$slots.bufferTemplate };
  }
}
```

And the slot declaration matches the `bufferTemplate` value set on `eventSettings`:

```vue
<template v-slot:bufferTemplate="{ data }">
  <!-- render the buffer pill here -->
</template>
```

### Using the Slot Context

The two pieces of information available in the slot are sufficient to render any visual variant:

- `data.bufferType` switches behavior (icon, label, color) between the pre-event and post-event buffer.
- The minute count is read from `data.data` using the same field mapping the Scheduler was configured with.

A minimal example that renders a duration label only:

```vue
<template v-slot:bufferTemplate="{ data }">
  <span class="buffer-duration">
    {{ data.bufferType === 'before'
        ? data.data.bufferBefore
        : data.data.bufferAfter }} min
  </span>
</template>
```

## Dependencies and Prerequisites

- `@syncfusion/ej2-vue-schedule` (Schedule, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective).
- One or more view modules registered through `provide('schedule', [...])`. Event Buffer works with the modules listed in [Supported Views](#supported-views).
- The Theme stylesheet for the Scheduler (for example `@syncfusion/ej2-vue-schedule/styles/material3.css`).
- A valid `eventSettings.dataSource` whose events expose `bufferBefore` and `bufferAfter` numeric fields (or fields mapped through `eventSettings.fields`).

## Supported Views

Event Buffer is rendered in time-grid views and in timeline views:

- `Day`
- `Week`
- `WorkWeek`
- `TimelineDay`
- `TimelineWeek`
- `TimelineWorkWeek`

The buffer pill is anchored to the EVENT edges (start and end) and re-anchors during drag and resize previews, so the pill always follows the event.

## Conflicts and Overlap Detection

When `allowOverlap` is `false`, the buffer range participates in conflict detection in the same way the event body does. A new event that would land in a buffer range is rejected, and a drag-and-drop move that would push another event into a buffer range is rejected as well.

To implement custom validation on top of the built-in overlap check, use the `dragStop` event and set `args.cancel = true` to prevent the move:

```js
methods: {
  onDragStop(args) {
    const data = Array.isArray(args.data) ? args.data[0] : args.data;

    // Custom business rule, e.g. enforce resource/specialty match
    const room = this.roomData.find((r) => r.RoomId === data.RoomId);
    if (!room) return;

    if (room.Specialty !== data.RequiredSkill) {
      args.cancel = true;          // Block the move
      this.$refs.dialogObj.show(); // Notify the user
    }
  }
}
```

This pattern (cancel + show a user-facing dialog) is the recommended way to combine buffer-based overlap protection with domain-specific rules.

## Constraints and Limitations

- Buffer values are interpreted as **minutes** and must be numeric.
- A buffer with a value below a reasonable visual threshold (for example below 10 minutes) may be hidden by a custom template that filters small buffers. This is a UI choice, not a Scheduler restriction.
- The buffer pill is part of the same event; it cannot be edited, moved, or deleted independently from the event.
- The buffer pill re-anchors on the event edges during drag and resize. It is not freely resizable.
- The default UI does not enforce a maximum buffer duration. Validate inputs in your data layer.
- Recurring events follow the same buffer rules per occurrence, but a single occurrence cannot override the buffer values of the series.

## Validation Guidance

Validate at the data layer because the Scheduler will not warn on invalid values:

- `bufferBefore` and `bufferAfter` must be numbers, not strings.
- Values must be `>= 0`. Negative values are ignored.
- Values that exceed the available time before `StartTime` (for example, a 480-minute buffer on a 09:00 event when the day starts at 08:00) cause the buffer to render outside the visible range. Choose reasonable bounds.
- Always provide a value for both fields on every event. An event with only one buffer side defined renders an asymmetric buffer, which may confuse users.
- Combine `allowOverlap: false` with custom `dragStop` validation when the domain has additional rules (specialty match, certification, equipment availability).

## AI Generation Guidance

When generating an EventBuffer implementation, follow this checklist:

1. **Set `eventSettings.enableBuffer` to `true`.** Without it, no buffer is rendered and no buffer conflict is detected.
2. **Map both fields** through `eventSettings.fields`:
   - `bufferBefore: { name: 'bufferBefore' }`
   - `bufferAfter: { name: 'bufferAfter' }`
3. **Set `bufferTemplate`** on `eventSettings` to the same name used in the `<template v-slot:...>` declaration.
4. **Declare the slot** on the `<ejs-schedule>` element with `<template v-slot:bufferTemplate="{ data }">`.
5. **Render both sides** inside the slot. The slot is called once per buffer (once for `'before'`, once for `'after'`); do not assume a single call.
6. **Read the duration from `data.data`** using the same field names configured in step 2, and select the right one with `data.bufferType`.
7. **Inject the right view modules.** Register `Day` (or `Week`/`WorkWeek`) and `TimelineViews` so both time-grid and timeline views render buffers.
8. **Set `allowOverlap` to `false`** when the buffer must be enforced as reserved time.
9. **Optionally** add a `dragStop` handler that calls `args.cancel = true` for custom domain rules, and surface a user notification.
10. **Do not invent** new properties, events, or APIs. Only `enableBuffer`, `bufferTemplate`, `fields.bufferBefore`, `fields.bufferAfter`, and the documented events (`dragStop`, `actionBegin`, `navigating`, etc.) are part of the feature surface.
11. **Do not place the slot inside the `<e-resources>` block** or outside the `<ejs-schedule>` element. It must be a child of the Schedule component to be registered.
12. **Do not rely on buffer fields for non-buffer purposes.** They are reserved for the Event Buffer feature.

## Best Practices

1. **Keep buffer values in a constant range per event type.** Validation is easier and the UI is more predictable.
2. **Always render the duration** (`{{ ... }} min`) inside the buffer pill, even if an icon is shown. Users need to see the numeric value.
3. **Use a custom CSS class** (for example `cssClass="my-scheduler"`) on `<ejs-schedule>` and scope buffer styles under that class to avoid leaking styles to other Schedulers on the page.
4. **Show a user-facing message** when a drag is cancelled, so users understand why the event did not move.
5. **Pair Event Buffer with resource grouping** when buffer rules are per-resource (for example, room-specific preparation times). Buffers and resources combine cleanly.
6. **Set the `bufferBefore` and `bufferAfter` values in `actionBegin` (`requestType === 'eventCreate'`)** when the values should be derived from the resource (such as the room or specialty). This keeps the data layer consistent.
7. **Test across both Day and Timeline views.** Buffer rendering and pill layout differ between time-grid and timeline.
8. **Hide very small buffers (under 10 minutes)** in the template if the visual pill becomes unreadable; this is a UI choice, not a Scheduler behavior.
9. **Document buffer semantics for end users.** Buffers are reserved time, not part of the event; clarify this in the page description or in the help text.
10. **Reuse the slot template across Day and Timeline views** by branching on the `currentView` data property instead of declaring two separate slots.
