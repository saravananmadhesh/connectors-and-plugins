# Multi Selection – ASP.NET Core Calendar

## Table of Contents
- [Overview](#overview)
- [Enabling Multi-Selection](#enabling-multi-selection)
- [Setting Pre-Selected Multiple Dates](#setting-pre-selected-multiple-dates)
- [Select a Sequence of Dates](#select-a-sequence-of-dates)
- [Handling the Change Event for Multiple Values](#handling-the-change-event-for-multiple-values)
- [Key Properties](#key-properties)

---

## Overview

The Calendar supports selecting **single** or **multiple dates** using the `isMultiSelection` and `values` properties.

| Property | Type | Description |
|----------|------|-------------|
| `isMultiSelection` | `bool` | Enables multi-date selection. Default: `false` |
| `values` | `object` (Date[]) | Gets or sets the array of selected dates in multi-selection mode |

> **Note:** When `isMultiSelection` is `true`, use `values` (plural) for multiple dates. The `value` (singular) property reflects only the last selected date.

---

## Enabling Multi-Selection

```cshtml
<ejs-calendar id="calendar" isMultiSelection="true"></ejs-calendar>
```

Once enabled, users can click multiple day cells to select them. Each selected date is highlighted. Clicking a selected date again deselects it.

---

## Setting Pre-Selected Multiple Dates

Pass an array of `DateTime` objects via the model or `ViewBag`:

**Controller / PageModel:**
```csharp
public IActionResult Index()
{
    ViewBag.multiValues = new DateTime[]
    {
        new DateTime(2025, 6, 5),
        new DateTime(2025, 6, 10),
        new DateTime(2025, 6, 15)
    };
    return View();
}
```

**View:**
```cshtml
<ejs-calendar id="calendar"
    isMultiSelection="true"
    values="ViewBag.multiValues">
</ejs-calendar>
```

---

## Select a Sequence of Dates

The following example demonstrates selecting an entire week of dates when a user clicks any day, using the `change` event and JavaScript `Date` manipulation:

```cshtml
<ejs-calendar id="calendar"
    isMultiSelection="true"
    change="onCalendarChange">
</ejs-calendar>

<script>
    function onCalendarChange(args) {
        var calendarObj = document.getElementById('calendar').ej2_instances[0];
        if (!args.value) return;

        var selectedDate = new Date(args.value);
        var day = selectedDate.getDay(); // 0 = Sunday

        // Calculate start (Sunday) and end (Saturday) of the selected week
        var weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - day);

        var weekDates = [];
        for (var i = 0; i < 7; i++) {
            var d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            weekDates.push(d);
        }

        calendarObj.values = weekDates;
    }
</script>
```

This uses `isMultiSelection="true"` combined with the `change` event to compute the full week range from the clicked date and assign it to `values`.

---

## Handling the Change Event for Multiple Values

```cshtml
<ejs-calendar id="calendar"
    isMultiSelection="true"
    change="onMultiChange">
</ejs-calendar>

<script>
    function onMultiChange(args) {
        // args.values contains all currently selected dates as an array
        console.log('Selected dates:', args.values);
        console.log('Count:', args.values ? args.values.length : 0);
    }
</script>
```

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isMultiSelection` | `bool` | `false` | Enables multiple date selection |
| `values` | `object` | `null` | Array of pre-selected dates (use with `isMultiSelection`) |
| `value` | `object` | `null` | Single selected date (last clicked in multi mode) |
