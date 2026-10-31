# DateTimePicker – Date and Time Range

## Table of Contents
- [DateTime Restriction (min / max)](#1-datetime-restriction-min--max)
- [Time-Only Restriction (minTime / maxTime)](#2-time-only-restriction-mintime--maxtime)
- [Out-of-Range Behavior](#3-out-of-range-behavior)
- [Updating min/max from Code-Behind](#4-updating-minmax-from-code-behind)

---

## 1. DateTime Restriction (min / max)

Use `min` and `max` to restrict the selectable date-time range. The `min` value must always be less than `max`.

```cshtml
@{
    var minVal = new DateTime(2019, 5, 5, 2, 0, 0);
    var maxVal = new DateTime(2019, 5, 25, 2, 0, 0);
    var value  = new DateTime(2019, 5, 10, 10, 0, 0);
}
<ejs-datetimepicker id="datetimepicker"
    value="value"
    min="minVal"
    max="maxVal">
</ejs-datetimepicker>
```

When the selected value is out of range:
- **StrictMode = false (default):** The model value is set to the out-of-range value and an `error` CSS class is applied to the input.
- **StrictMode = true:** The value is clamped to `min` or `max` automatically.

---

## 2. Time-Only Restriction (minTime / maxTime)

Use `minTime` and `maxTime` to restrict only the time portion for each day. The component will restrict time selection without affecting the date range beyond `min`/`max`.

```cshtml
@{
    var minTime = new DateTime(2019, 1, 1, 10, 0, 0);  // 10:00 AM
    var maxTime = new DateTime(2019, 1, 1, 20, 30, 0); // 8:30 PM
}
<ejs-datetimepicker id="datetimepicker"
    minTime="minTime"
    maxTime="maxTime"
    placeholder="Select a time between 10 AM - 8:30 PM">
</ejs-datetimepicker>
```

**Priority rules when both min/max and minTime/maxTime are set:**
- If `minTime` is less than the time component of `min`, `min` takes priority on that date.
- If `maxTime` is greater than the time component of `max`, `max` takes priority on that date.
- For all other dates, `minTime`/`maxTime` apply normally.

---

## 3. Out-of-Range Behavior

| Scenario | StrictMode = false | StrictMode = true |
|---|---|---|
| Value within range | Accepted | Accepted |
| Value out of range | Error class applied, model set to out-of-range value | Value clamped to min or max |
| Invalid date/time input | Model set to `null`, error class applied | Resets to previous valid value |

---

## 4. Updating min/max from Code-Behind

When `min` or `max` values change dynamically via code-behind, also update the `value` property to ensure it falls within the new range:

```csharp
// Controller
public IActionResult Index()
{
    ViewBag.minVal = new DateTime(2019, 5, 5, 2, 0, 0);
    ViewBag.maxVal = new DateTime(2019, 5, 25, 2, 0, 0);
    ViewBag.value  = new DateTime(2019, 5, 10, 10, 0, 0);
    return View();
}
```

```cshtml
<ejs-datetimepicker id="datetimepicker"
    value="@ViewBag.value"
    min="@ViewBag.minVal"
    max="@ViewBag.maxVal">
</ejs-datetimepicker>
```

> **Note:** If you change `min` or `max` through code-behind, always update `value` to keep it within the new range.

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `min` | `object` | `null` | Minimum selectable date-time |
| `max` | `object` | `null` | Maximum selectable date-time |
| `minTime` | `object` | `null` | Minimum selectable time for each day |
| `maxTime` | `object` | `null` | Maximum selectable time for each day |
| `strictMode` | `bool` | `false` | Enforce valid range entry |
