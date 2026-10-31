# Event Markers — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Adding Event Markers](#adding-event-markers)
- [Event Marker Properties](#event-marker-properties)
- [Custom Styling](#custom-styling)

---

## Overview

Event markers are vertical lines drawn on the chart area to highlight significant project dates (e.g., sprint reviews, release deadlines, milestones). They are defined using the `<e-gantt-eventmarkers>` child tag inside `<ejs-gantt>`.

---

## Adding Event Markers

Use `<e-gantt-eventmarker>` entries inside `<e-gantt-eventmarkers>`. Each marker requires a `day` and optionally a `label` and `cssClass`:

```cshtml
<ejs-gantt id="Gantt" dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-eventmarkers>
        <e-gantt-eventmarker day="new DateTime(2024, 4, 10)"
                             label="Sprint Review">
        </e-gantt-eventmarker>
        <e-gantt-eventmarker day="new DateTime(2024, 4, 20)"
                             label="Release Deadline"
                             cssClass="e-custom-event-marker">
        </e-gantt-eventmarker>
        <e-gantt-eventmarker day="new DateTime(2024, 5, 1)"
                             label="Phase 2 Kickoff"
                             cssClass="e-phase-marker">
        </e-gantt-eventmarker>
    </e-gantt-eventmarkers>
</ejs-gantt>
```

> The `day` property must be a valid `DateTime` value. Omitting it or passing an invalid date triggers an `actionFailure` event.

---

## Event Marker Properties

| Property | Type | Description |
|----------|------|-------------|
| `day` | DateTime | The date where the vertical marker line is drawn |
| `label` | string | Text label displayed above the marker line |
| `cssClass` | string | CSS class applied to the marker element for custom styling |

---

## Custom Styling

Apply CSS to the `cssClass` value you set on each marker, or override the default `.e-event-markers` class:

```css
/* Default marker override */
.e-gantt .e-event-markers {
    border-left: 2px dashed #f44336;
}

/* Custom marker via cssClass="e-custom-event-marker" */
.e-gantt .e-custom-event-marker {
    border-left: 3px solid #ff9800;
}
.e-gantt .e-custom-event-marker .e-span-label {
    color: #ff9800;
    font-weight: bold;
}

/* Phase marker */
.e-gantt .e-phase-marker {
    border-left: 2px solid #4caf50;
}
.e-gantt .e-phase-marker .e-span-label {
    color: #4caf50;
}
```

> The label element inside an event marker uses the `.e-span-label` CSS class. The marker container uses the class name you specify in `cssClass` appended to `.e-event-markers`.
