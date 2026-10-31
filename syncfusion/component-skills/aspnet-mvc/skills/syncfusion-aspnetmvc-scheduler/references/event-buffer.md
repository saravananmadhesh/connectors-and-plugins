# Event Buffer

## Table of Contents
1. [Overview](#overview)
2. [Enabling Event Buffer](#enabling-event-buffer)
3. [Buffer Event Fields](#buffer-event-fields)
4. [Field Mappings](#field-mappings)
5. [Buffer Template](#buffer-template)
6. [Overlap Behavior](#overlap-behavior)
7. [Supported Views](#supported-views)
8. [Complete Example](#complete-example)
9. [Limitations and Best Practices](#limitations-and-best-practices)

## Overview

The Event Buffer feature adds configurable time margins before (`BufferBefore`) and after (`BufferAfter`) each appointment. Buffers represent reserved preparation or recovery time around an event and are typically used for:

- Surgery / operating-room scheduling (pre-op and post-op time)
- Service appointments that need setup or cleanup
- Court or hearing slots that include transition time
- Any scenario where the surrounding time around an event matters

Buffers are reserved time slots. When `AllowOverlap` is disabled, the buffered ranges count as occupied time and conflict with overlapping events.

## Enabling Event Buffer

Set the `EnableBuffer` property on `EventSettings` to `true`:

```cshtml
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 1, 12))
    .EventSettings(e => e
        .DataSource(ViewBag.appointments)
        .EnableBuffer(true)
    )
    .Render()
```

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `EnableBuffer` | `bool` | Activates the buffer feature on appointments | `false` |
| `BufferTemplate` | `string` | Selector of the template used to render each buffer pill | `null` |

When `EnableBuffer` is `false`, `BufferBefore` and `BufferAfter` values are ignored.

## Buffer Event Fields

Each appointment must provide the buffer durations in **minutes**. The fields are read through `EventSettings.Fields` mappings, so the property names on your model can be anything you choose.

| Field | Type | Description |
|-------|------|-------------|
| `BufferBefore` | `int` | Reserved minutes **before** the appointment starts |
| `BufferAfter` | `int` | Reserved minutes **after** the appointment ends |

### Data Model

```csharp
public class SurgeryEventData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int RoomId { get; set; }
    public int BufferBefore { get; set; }
    public int BufferAfter { get; set; }
}
```

### Controller

```csharp
public ActionResult Index()
{
    var events = new List<SurgeryEventData>
    {
        new SurgeryEventData
        {
            Id = 1,
            Subject = "Cardiac Checkup",
            StartTime = new DateTime(2026, 1, 12, 9, 0, 0),
            EndTime   = new DateTime(2026, 1, 12, 10, 30, 0),
            RoomId = 1,
            BufferBefore = 30,
            BufferAfter  = 45
        },
        new SurgeryEventData
        {
            Id = 2,
            Subject = "Knee Replacement",
            StartTime = new DateTime(2026, 1, 12, 11, 15, 0),
            EndTime   = new DateTime(2026, 1, 12, 12, 45, 0),
            RoomId = 2,
            BufferBefore = 60,
            BufferAfter  = 30
        }
    };

    ViewBag.appointments = events;
    return View();
}
```

## Field Mappings

Map the buffer properties on your data model through `EventSettings.Fields`:

```cshtml
@Html.EJS().Schedule("schedule")
    .EventSettings(e => e
        .DataSource(ViewBag.appointments)
        .EnableBuffer(true)
        .Fields(fields =>
        {
            fields.Subject(new ScheduleField { Name = "Subject" });
            fields.StartTime(new ScheduleField { Name = "StartTime" });
            fields.EndTime(new ScheduleField { Name = "EndTime" });
            fields.BufferBefore(new ScheduleFieldOptions { Name = "BufferBefore" });
            fields.BufferAfter(new ScheduleFieldOptions { Name = "BufferAfter" });
        })
    )
    .Render()
```

If your model already uses the default field names (`Subject`, `StartTime`, `EndTime`, `BufferBefore`, `BufferAfter`), you can omit the explicit `Fields` configuration.

## Buffer Template

Use `BufferTemplate` to render a custom layout inside the buffer pill. The template receives the appointment data and a `bufferType` value (`"before"` or `"after"`).

### Template Script

```html
<script id="bufferTemplate" type="text/x-template">
    ${renderBuffer(data, bufferType)}
</script>
```

### Renderer Function

```html
<script>
    function renderBuffer(data, bufferType) {
        var value = bufferType === 'before'
            ? data.data.BufferBefore
            : data.data.BufferAfter;

        if (!value) {
            return '';
        }

        return '<div class="buffer-pill">' +
                   '<span class="buffer-label">' + bufferType.toUpperCase() + '</span>' +
                   '<span class="buffer-value">' + value + ' min</span>' +
               '</div>';
    }
</script>
```

### Wiring the Template

```cshtml
@Html.EJS().Schedule("schedule")
    .EventSettings(e => e
        .DataSource(ViewBag.appointments)
        .EnableBuffer(true)
        .BufferTemplate("#bufferTemplate")
    )
    .Render()
```

## Overlap Behavior

Buffers reserve time around each event. Set `AllowOverlap` to `false` so the Scheduler treats the buffered range as occupied and blocks events that conflict with the buffer.

```cshtml
@Html.EJS().Schedule("schedule")
    .AllowOverlap(false)
    .EventSettings(e => e
        .DataSource(ViewBag.appointments)
        .EnableBuffer(true)
    )
    .Render()
```

| `AllowOverlap` | Behavior with buffers |
|----------------|----------------------|
| `true` (default) | New events can be created over the buffered range; only the event body is checked |
| `false` | Buffered ranges count as occupied. Drag, resize, and creation that touch the buffer are blocked |

The buffer is also re-anchored on the **event edges** during drag and resize previews, so the reserved range moves with the event.

## Supported Views

Buffers are supported in timeline and vertical time-grid views:

- Day
- Week
- WorkWeek
- TimelineDay
- TimelineWeek
- TimelineWorkWeek

Buffers are **not** rendered in `Month`, `Year`, `Agenda`, or `MonthAgenda` views.

## Complete Example

A typical setup combines `EnableBuffer`, `BufferTemplate`, `AllowOverlap(false)`, and a resource grouping so the buffer can be shown per room.

```cshtml
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .CssClass("buffer-scheduler")
    .SelectedDate(new DateTime(2026, 1, 12))
    .CurrentView(View.TimelineDay)
    .AllowOverlap(false)
    .Views(view => {
        view.Option(View.Day).Add();
        view.Option(View.TimelineDay).Add();
        view.Option(View.TimelineWeek).Add();
    })
    .Group(group => group.Resources(new string[] { "Rooms" }))
    .Resources(res => {
        res.DataSource(ViewBag.rooms)
           .Field("RoomId")
           .Title("Operating Room")
           .Name("Rooms")
           .TextField("RoomText")
           .IdField("RoomId")
           .ColorField("RoomColor")
           .Add();
    })
    .EventSettings(e => e
        .DataSource(ViewBag.appointments)
        .EnableBuffer(true)
        .BufferTemplate("#bufferTemplate")
        .Fields(fields =>
        {
            fields.BufferBefore(new ScheduleFieldOptions { Name = "BufferBefore" });
            fields.BufferAfter(new ScheduleFieldOptions { Name = "BufferAfter" });
        })
    )
    .Render()
```

### Minimal CSS for the Template

```css
.buffer-scheduler .buffer-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.15);
    font-size: 11px;
    line-height: 1;
}

.buffer-scheduler .buffer-label {
    font-weight: 600;
    text-transform: uppercase;
}

.buffer-scheduler .buffer-value {
    opacity: 0.9;
}
```

## Limitations and Best Practices

- Buffers are visual + scheduling aids only; the underlying `StartTime` and `EndTime` of the appointment are not modified by buffer values.
- `BufferBefore` and `BufferAfter` are always interpreted in **minutes**.
- To make overlap detection honor the buffer, set `AllowOverlap` to `false` at the Scheduler level.
- Use `EventSettings.Fields` to map buffer fields when your model property names differ from the defaults.
- The `BufferTemplate` receives `data` (the appointment record) and `bufferType` (`"before"` or `"after"`) and should return an HTML string. Keep the markup compact so the buffer pill fits inside the cell.
- Buffers are not rendered in `Month`, `Year`, `Agenda`, or `MonthAgenda` views. Switch to a time-grid or timeline view to display them.
- Return an empty string from the renderer (`''`) when a buffer value is missing or should not be shown for a given slot.
- When using resources, the buffer is shown per resource row/column and inherits the resource color context.
