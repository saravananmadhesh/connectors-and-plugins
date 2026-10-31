# Event Markers — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Add Event Markers](#add-event-markers)
- [Event Marker Properties](#event-marker-properties)
- [Custom CSS for Markers](#custom-css-for-markers)

---

## Overview

Event markers highlight important project dates (e.g., deadlines, sprints, releases) with a vertical line on the chart timeline. They are configured in the `EventMarkers` collection and rendered as labeled vertical lines at the specified dates.

> **Important:** Each event marker **must** have a `Day` property set. Missing `Day` triggers the `ActionFailure` event.

---

## Add Event Markers

Configure event markers using the `EventMarkers` builder:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EventMarkers(em =>
    {
        em.Day(new DateTime(2024, 4, 15)).Label("Sprint Review").CssClass("e-custom-marker").Add();
        em.Day(new DateTime(2024, 5, 1)).Label("Release v1.0").Add();
        em.Day(new DateTime(2024, 6, 10)).Label("Project Deadline").CssClass("e-deadline-marker").Add();
    })
    .Height("450px")
    .Render()
```

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GetGanttData();
    return View();
}
```

---

## Event Marker Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `Day` | `DateTime` | ✅ Yes | The date to mark on the timeline |
| `Label` | `string` | No | Text label shown on the marker line |
| `CssClass` | `string` | No | Custom CSS class applied to the marker element |

---

## Custom CSS for Markers

Style event markers using the `.e-event-markers` class and the custom `CssClass` you provide:

```css
/* Default marker styling override */
.e-gantt .e-event-markers {
    border-left: 2px solid #1976d2;
}

/* Custom marker class */
.e-custom-marker .e-gantt-eventmarker-header {
    color: #d32f2f;
    border-left-color: #d32f2f;
}

/* Deadline marker — thicker red line */
.e-deadline-marker .e-gantt-eventmarker-header {
    color: #b71c1c;
    border-left: 3px dashed #b71c1c;
    font-weight: bold;
}
```

> The `CssClass` value is applied to the marker container element, allowing full CSS customization of the marker line color, style, and label appearance.
