# Timezone — Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Setting the Timezone](#setting-the-timezone)
- [Common IANA Timezone Values](#common-iana-timezone-values)
- [CRUD Operations with Timezone](#crud-operations-with-timezone)
- [Hour-Level Timeline with Timezone](#hour-level-timeline-with-timezone)
- [Timezone Utility Methods](#timezone-utility-methods)

---

## Overview

By default, the Syncfusion Gantt chart renders task dates using the browser's local timezone. The `Timezone` property allows you to render and edit all dates in a specific IANA timezone, regardless of the client's local timezone setting.

This is especially useful when:
- The data is stored in UTC and must be displayed in a project-specific timezone.
- Users across different time zones must see consistent date/time values.
- The chart uses an hour-level timeline where timezone offsets affect taskbar positions.

---

## Setting the Timezone

Use the `.Timezone()` method on the Gantt builder to set a specific IANA timezone string.

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Timezone("America/New_York")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks"))
    .Render()
```

**Controller (`HomeController.cs`):**

```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GanttData.ProjectNewData();
    return View();
}
```

---

## Common IANA Timezone Values

| Timezone String | UTC Offset | Region |
|---|---|---|
| `UTC` | +00:00 | Universal Time Coordinated |
| `Etc/GMT+0` | +00:00 | GMT |
| `Europe/London` | +00:00 / +01:00 | UK (BST in summer) |
| `Europe/Berlin` | +01:00 / +02:00 | Central Europe |
| `Europe/Paris` | +01:00 / +02:00 | Central Europe |
| `Europe/Moscow` | +03:00 | Russia |
| `Asia/Kolkata` | +05:30 | India |
| `Asia/Singapore` | +08:00 | Singapore |
| `Asia/Tokyo` | +09:00 | Japan |
| `Australia/Sydney` | +10:00 / +11:00 | Australia East |
| `America/New_York` | -05:00 / -04:00 | US Eastern |
| `America/Chicago` | -06:00 / -05:00 | US Central |
| `America/Denver` | -07:00 / -06:00 | US Mountain |
| `America/Los_Angeles` | -08:00 / -07:00 | US Pacific |
| `America/Sao_Paulo` | -03:00 | Brazil |
| `Pacific/Auckland` | +12:00 / +13:00 | New Zealand |

> The Gantt component uses the `@syncfusion/ej2-schedule` timezone utility internally. Full IANA timezone database support requires that IANA timezone data is available in the browser (modern browsers include this natively via `Intl`).

---

## CRUD Operations with Timezone

When `Timezone` is set, all task dates entered or edited in the Gantt UI are interpreted in that timezone. The following example combines timezone with the edit settings to support add, edit, and delete in the specified timezone.

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Timezone("UTC")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Dependency("Predecessor")
        .Child("SubTasks"))
    .EditSettings(es => es
        .AllowAdding(true)
        .AllowEditing(true)
        .AllowDeleting(true)
        .AllowTaskbarEditing(true)
        .Mode(Syncfusion.EJ2.Gantt.EditMode.Auto))
    .Toolbar(tb => {
        tb.Text("Add").TooltipText("Add").Id("ganttAdd").PrefixIcon("e-add").Add();
        tb.Text("Edit").TooltipText("Edit").Id("ganttEdit").PrefixIcon("e-edit").Add();
        tb.Text("Delete").TooltipText("Delete").Id("ganttDelete").PrefixIcon("e-delete").Add();
        tb.Text("Update").TooltipText("Update").Id("ganttUpdate").PrefixIcon("e-update").Add();
        tb.Text("Cancel").TooltipText("Cancel").Id("ganttCancel").PrefixIcon("e-cancel").Add();
    })
    .Render()
```

> When `Timezone("UTC")` is set and your server stores dates in UTC, the dates are displayed correctly without any offset conversion on the client side.

---

## Hour-Level Timeline with Timezone

For projects that work at the hour level (e.g., shift schedules), combine `Timezone` with an hour-unit timeline. The timezone setting ensures taskbar positions are accurate when users in different timezones view the same chart.

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("450px")
    .Timezone("America/Chicago")
    .DurationUnit(Syncfusion.EJ2.Gantt.DurationUnit.Hour)
    .DayWorkingTime(dwt => {
        dwt.From(0).To(24).Add();
    })
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Child("SubTasks"))
    .TimelineSettings(ts => ts
        .TimelineViewMode(Syncfusion.EJ2.Gantt.TimelineViewMode.Day)
        .TopTier(tt => tt
            .Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Day)
            .Format("MMM dd, yyyy"))
        .BottomTier(bt => bt
            .Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Hour)
            .Format("hh:mm a")))
    .Render()
```

> Setting `DayWorkingTime` from `0` to `24` disables the working-hours constraint so tasks can span any hour of the day.

---

## Timezone Utility Methods

The EJ2 Schedule module ships a `Timezone` utility class that can convert dates programmatically between timezones in JavaScript. These utilities are available when the `@syncfusion/ej2-schedule` package is included.

### Accessing the Utility

```javascript
var timezoneUtil = new ej.schedule.Timezone();
```

### offset

Returns the UTC offset in minutes for a given date in a specific timezone.

```javascript
var timezoneUtil = new ej.schedule.Timezone();
var offsetMinutes = timezoneUtil.offset(new Date('2024-06-15'), 'America/New_York');
console.log(offsetMinutes); // e.g., 240 (UTC-4 during EDT)
```

### convert

Converts a `Date` object from one timezone to another.

```javascript
var timezoneUtil = new ej.schedule.Timezone();
var utcDate = new Date('2024-06-15T12:00:00Z');
var nyDate = timezoneUtil.convert(utcDate, 'UTC', 'America/New_York');
console.log(nyDate); // Date adjusted to New York time
```

### remove

Removes the timezone offset from a date, converting it to "local" (system) time.

```javascript
var timezoneUtil = new ej.schedule.Timezone();
var localDate = timezoneUtil.remove(new Date('2024-06-15T12:00:00Z'), 'UTC');
```

### add

Adds the timezone offset to a date, adjusting it from local to a target timezone.

```javascript
var timezoneUtil = new ej.schedule.Timezone();
var adjustedDate = timezoneUtil.add(new Date('2024-06-15T12:00:00'), 'Asia/Kolkata');
```

> **Tip:** Use `timezoneUtil.convert()` when you need to display a UTC datetime string from the server in a project-specific timezone in the Gantt's `ActionBegin` or `DataBound` event.
