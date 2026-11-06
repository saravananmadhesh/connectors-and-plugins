# Event Buffer in ASP.NET Core Scheduler

## Table of Contents
- [Overview](#overview)
- [Enabling Event Buffer](#enabling-event-buffer)
- [Required Event Fields](#required-event-fields)
- [Field Mapping](#field-mapping)
- [Buffer Template](#buffer-template)
- [Overlap Behavior with Buffers](#overlap-behavior-with-buffers)
- [Supported Views](#supported-views)
- [Custom Validation Example](#custom-validation-example)
- [Limitations and Validation Guidance](#limitations-and-validation-guidance)
- [Best Practices](#best-practices)

## Overview

The **Event Buffer** feature reserves a configurable time window **before** and **after** every appointment. It is
useful for scenarios that need setup, cleanup, preparation, or recovery time attached to the event itself, such as
surgical preparation in a hospital, lab instrumentation in a research lab, or pre/post-meeting wrap-up time in a
service center.

Buffers are rendered as a pill rendered against the event edges. With `allowOverlap="false"`, the buffer range also
participates in conflict detection so adjacent appointments cannot bleed into the reserved buffer window.

## Enabling Event Buffer

Event Buffer is enabled on `e-schedule-eventsettings` through the `enableBuffer` flag and the `bufferTemplate`
attribute:

| Property | Type | Description |
|----------|------|-------------|
| `enableBuffer` | boolean | Turns on the buffer rendering and overlap logic |
| `bufferTemplate` | string | Id of the `<script type="text/x-template">` block that renders the buffer pill |

```cshtml
<ejs-schedule id="Schedule"
              width="100%"
              height="650px"
              selectedDate="new DateTime(2026, 1, 12)"
              currentView="TimelineDay"
              allowOverlap="false">

    <e-schedule-eventsettings dataSource="ViewBag.datasource"
                              enableBuffer="true"
                              bufferTemplate="#bufferTemplate">
    </e-schedule-eventsettings>

</ejs-schedule>
```

## Required Event Fields

Buffers are read from numeric fields on the appointment record (minutes):

| Field | Type | Description |
|-------|------|-------------|
| `BufferBefore` | int | Minutes reserved **before** `StartTime` |
| `BufferAfter` | int | Minutes reserved **after** `EndTime` |

```csharp
public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int RoomId { get; set; }
    public int BufferBefore { get; set; }   // minutes
    public int BufferAfter { get; set; }    // minutes
}
```

When `BufferBefore` or `BufferAfter` is `0` (or not provided) the corresponding buffer pill is not rendered for that
event.

## Field Mapping

Map the data model field names to the Scheduler using the `e-eventsettings-fields` child tag. The buffer field
mappings use `<e-field-bufferbefore>` and `<e-field-bufferafter>`:

```cshtml
<e-schedule-eventsettings dataSource="ViewBag.datasource"
                          enableBuffer="true"
                          bufferTemplate="#bufferTemplate">
    <e-eventsettings-fields>
        <e-field-id name="Id"></e-field-id>
        <e-field-subject name="Subject"></e-field-subject>
        <e-field-starttime name="StartTime"></e-field-starttime>
        <e-field-endtime name="EndTime"></e-field-endtime>
        <e-field-bufferbefore name="BufferBefore"></e-field-bufferbefore>
        <e-field-bufferafter name="BufferAfter"></e-field-bufferafter>
    </e-eventsettings-fields>
</e-schedule-eventsettings>
```

> Field names are case-sensitive. Match the model property names exactly.

## Buffer Template

The `bufferTemplate` is a `<script type="text/x-template">` block whose body is invoked once for each side of each
event. The template receives:

- `data` — the appointment record. The current buffer value is on `data.data.BufferBefore` or `data.data.BufferAfter`.
- `bufferType` — `"before"` or `"after"`. Use this to differentiate the two pills.

### Minimal Buffer Template

```html
<script id="bufferTemplate" type="text/x-template">
    ${renderBuffer(data, bufferType)}
</script>

<script>
    window.renderBuffer = function (data, bufferType) {
        var value = bufferType === 'before' ? data.data.BufferBefore : data.data.BufferAfter;
        if (!value) return '';

        return '<div class="buffer-pill">' + value + ' min</div>';
    };
</script>
```

### Compact Buffer Template with Icon

```html
<script id="bufferTemplate" type="text/x-template">
    ${renderBuffer(data, bufferType)}
</script>

<script>
    window.renderBuffer = function (data, bufferType) {
        var value = bufferType === 'before' ? data.data.BufferBefore : data.data.BufferAfter;
        if (!value || value < 10) return '';

        var icon = bufferType === 'before' ? 'pre' : 'post';
        return '<div class="buffer-pill">' +
                   '<span class="buffer-icon ' + icon + '"></span>' +
                   '<span class="buffer-duration">' + value + ' min</span>' +
               '</div>';
    };
</script>
```

### Buffer Template with View-Aware Layout

Use `scheduleObj.currentView` inside the renderer to switch between vertical and timeline layouts without changing
the template:

```html
<script>
    window.renderBuffer = function (data, bufferType) {
        var scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        var value = bufferType === 'before' ? data.data.BufferBefore : data.data.BufferAfter;
        if (!value) return '';

        var isVertical = scheduleObj && scheduleObj.currentView === 'Day';
        var layoutClass = isVertical ? 'buffer-vertical' : 'buffer-horizontal';

        return '<div class="buffer-pill ' + layoutClass + '">' + value + ' min</div>';
    };
</script>
```

## Overlap Behavior with Buffers

`allowOverlap` controls whether the **buffer range** participates in conflict detection:

| `allowOverlap` | Buffer Behavior |
|----------------|-----------------|
| `true` (default) | Buffers render only. They do not block adjacent events. |
| `false` | The reserved range (`StartTime - BufferBefore` to `EndTime + BufferAfter`) is treated as occupied. |

When `allowOverlap="false"`, a `dragStop` / `actionBegin` callback is the recommended place to add custom business
rules on top of the built-in conflict check.

## Supported Views

Buffers are rendered on the time-grid and timeline views:

| View | Buffer Support |
|------|----------------|
| Day | Yes |
| Week | Yes |
| WorkWeek | Yes |
| TimelineDay | Yes |
| TimelineWeek | Yes |
| TimelineWorkWeek | Yes |
| Month | Not rendered (no adjacent vertical buffer pill) |
| TimelineMonth | Not rendered |

During drag and resize, the buffer re-anchors to the **event edges** so the pre/post window always tracks the
appointment.

## Custom Validation Example

Combine `allowOverlap="false"` with `actionBegin` to add domain-specific rules — for example, restrict which resource
a buffered event may move to:

```cshtml
<ejs-schedule id="Schedule"
              width="100%"
              height="650px"
              currentView="TimelineDay"
              allowOverlap="false"
              actionBegin="onActionBegin"
              dragStop="onDragStop">

    <e-schedule-resources>
        <e-schedule-resource field="RoomId"
                             title="Operating Room"
                             name="Rooms"
                             dataSource="@Model.RoomData"
                             textField="RoomText"
                             idField="RoomId"
                             colorField="RoomColor">
        </e-schedule-resource>
    </e-schedule-resources>

    <e-schedule-eventsettings dataSource="ViewBag.datasource"
                              enableBuffer="true"
                              bufferTemplate="#bufferTemplate">
        <e-eventsettings-fields>
            <e-field-bufferbefore name="BufferBefore"></e-field-bufferbefore>
            <e-field-bufferafter name="BufferAfter"></e-field-bufferafter>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>

<script id="bufferTemplate" type="text/x-template">
    ${renderBuffer(data, bufferType)}
</script>

<script>
    // Reject drag/drop where the new room does not match the event's required skill
    function onDragStop(args) {
        var data = Array.isArray(args.data) ? args.data[0] : args.data;
        if (!data) return;

        var scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        var room = scheduleObj.getResourceCollections()
            .slice(-1)[0].dataSource
            .find(function (r) { return r.RoomId === data.RoomId; });

        if (room && data.RequiredSkill && room.Specialty !== data.RequiredSkill) {
            args.cancel = true;
            alert('This room does not match the required specialty for this event.');
        }
    }

    // Stamp the room's specialty onto new events so the buffer-aware validation can read it later
    function onActionBegin(args) {
        if (args.requestType !== 'eventCreate') return;

        var records = Array.isArray(args.data) ? args.data : [args.data];
        var scheduleObj = document.getElementById('Schedule').ej2_instances[0];
        var rooms = scheduleObj.getResourceCollections().slice(-1)[0].dataSource;

        records.forEach(function (event) {
            var room = rooms.find(function (r) { return r.RoomId === event.RoomId; });
            if (room) event.RequiredSkill = room.Specialty;
        });
    }

    window.renderBuffer = function (data, bufferType) {
        var value = bufferType === 'before' ? data.data.BufferBefore : data.data.BufferAfter;
        if (!value) return '';
        return '<div class="buffer-pill">' + value + ' min</div>';
    };
</script>
```

## Limitations and Validation Guidance

- **Numeric values only.** `BufferBefore` and `BufferAfter` must be non-negative integers (minutes). Non-numeric or
  negative values can produce unexpected layout; treat them as `0` server-side before binding.
- **Month and TimelineMonth views** do not render the buffer pill. Configure the data, but expect no visual
  artifact on those views.
- **`enableBuffer` requires `bufferTemplate` or a custom layout.** Without a template, the reserved time is still
  reserved for overlap checks but is not visually drawn.
- **`allowOverlap` controls buffer conflicts.** If you want buffers to render but allow overlap, leave
  `allowOverlap="true"` (the default). If you want the buffer range to participate in conflict detection, set
  `allowOverlap="false"`.
- **Drag and resize** re-anchor the buffer to the event edges. The buffer value itself is not modified by drag.
- **Server-side validation** should still cap `BufferBefore` and `BufferAfter` to sane values (for example, less
  than the event duration) to prevent abuse from clients posting arbitrary minute counts.
- **No built-in editor field** is added for buffers. Set `BufferBefore` and `BufferAfter` either from your data
  source or by hooking `actionBegin` / `actionComplete` to update them after edit.

## Best Practices

1. **Pick a single source of truth.** Keep buffer values in the data model so the appointment can be re-rendered
   consistently across views and reloads.
2. **Pair with `allowOverlap="false"` only when needed.** Setting it to `false` globally can prevent legitimate
   adjacent bookings if you do not intend buffers to block.
3. **Keep templates small.** Buffer pills are rendered per side per event; a heavy template can impact performance
   on large datasets.
4. **Reuse a single `renderBuffer` helper** instead of inlining logic in the template. The template string should
   call one function and return HTML.
5. **Validate on the server.** Do not rely on the client template to clamp `BufferBefore` / `BufferAfter`; validate
   in the controller / API endpoint before persisting.
6. **Style with a CSS class** scoped to a `cssClass` on the Scheduler so the buffer pill does not leak styles
   onto unrelated appointments.
