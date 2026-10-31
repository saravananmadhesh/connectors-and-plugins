# Date Range – ASP.NET Core Calendar

## Table of Contents
- [Overview](#overview)
- [Setting Min and Max Dates](#setting-min-and-max-dates)
- [Out-of-Range Behavior](#out-of-range-behavior)
- [Dynamic Range Updates](#dynamic-range-updates)
- [Examples](#examples)

---

## Overview

The Calendar provides an option to select a date value within a specified range by defining the `min` and `max` properties. Dates outside this range are **disabled** and cannot be selected.

**Rules:**
- `min` must always be **less than or equal to** `max`
- If the current `value` is outside the range when `min`/`max` change, it is automatically updated to stay within bounds

---

## Setting Min and Max Dates

```cshtml
@{
    var minDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 5);
    var maxDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 27);
}

<ejs-calendar id="calendar"
    min="minDate"
    max="maxDate">
</ejs-calendar>
```

This restricts selection to between the 5th and 27th of the current month. All other dates appear grayed out and are non-interactive.

---

## Out-of-Range Behavior

| Scenario | Result |
|----------|--------|
| `value` < `min` | `value` is updated to `min` |
| `value` > `max` | `value` is updated to `max` |
| `min` > `max` | Undefined behavior — always set `min` ≤ `max` |
| No `value` set | Calendar renders with range restriction only |

---

## Dynamic Range Updates

If `min` or `max` are changed programmatically after render, update `value` explicitly to ensure it stays within the new range:

```javascript
// Via JavaScript after render
var calendarObj = document.getElementById('calendar').ej2_instances[0];
calendarObj.min = new Date(2025, 0, 1);  // Jan 1, 2025
calendarObj.max = new Date(2025, 11, 31); // Dec 31, 2025
// If current value is outside new range, update it:
calendarObj.value = new Date(2025, 5, 15);
```

---

## Examples

### Restrict to Current Month's Working Days Range
```cshtml
@{
    var firstDay = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
    var lastDay  = new DateTime(DateTime.Now.Year, DateTime.Now.Month,
                      DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month));
}
<ejs-calendar id="calendar"
    min="firstDay"
    max="lastDay">
</ejs-calendar>
```

### Restrict to a Fixed Date Range
```cshtml
@{
    var minDate = new DateTime(2025, 1, 1);
    var maxDate = new DateTime(2025, 12, 31);
    var value   = new DateTime(2025, 6, 15);
}
<ejs-calendar id="calendar"
    min="minDate"
    max="maxDate"
    value="value">
</ejs-calendar>
```

### Only Future Dates (from today)
```cshtml
@{
    var today = DateTime.Now.Date;
}
<ejs-calendar id="calendar" min="today"></ejs-calendar>
```

### Only Past Dates (up to today)
```cshtml
@{
    var today = DateTime.Now.Date;
}
<ejs-calendar id="calendar" max="today"></ejs-calendar>
```

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `min` | `object` | `null` | Minimum selectable date |
| `max` | `object` | `null` | Maximum selectable date |
| `value` | `object` | `null` | Currently selected date; clamped to min/max |
