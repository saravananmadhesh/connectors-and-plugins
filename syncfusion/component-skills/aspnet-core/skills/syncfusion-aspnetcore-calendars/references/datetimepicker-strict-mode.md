# DateTimePicker – Strict Mode

## Overview

The `strictMode` property controls how the DateTimePicker handles out-of-range or invalid date-time input.

| Mode | Behavior |
|---|---|
| `strictMode="false"` (default) | Accepts any input; shows `error` CSS class for out-of-range or invalid values |
| `strictMode="true"` | Rejects out-of-range input; clamps value to `min`/`max`; resets to previous value if invalid |

---

## Strict Mode Enabled (true)

When `strictMode` is `true`, the component restricts entry to only valid values within the `min`/`max` range:

- If the user enters a value **greater than** `max`, the component sets the value to `max`.
- If the user enters a value **less than** `min`, the component sets the value to `min`.
- If the user enters an **invalid** date-time, the component reverts to the previous valid value.

```cshtml
@{
    var minVal = new DateTime(2019, 5, 5, 2, 0, 0);
    var maxVal = new DateTime(2019, 5, 25, 2, 0, 0);
    var value  = new DateTime(2019, 5, 10, 10, 0, 0);
}
<ejs-datetimepicker id="datetimepicker"
    value="value"
    min="minVal"
    max="maxVal"
    strictMode="true">
</ejs-datetimepicker>
```

**Example behavior:** If the user types `5/28/2019` (greater than max `5/25/2019`), the value is automatically set to `5/25/2019 2:00 AM`.

---

## Strict Mode Disabled (false – Default)

When `strictMode` is `false`, the component accepts out-of-range or invalid input but indicates the error visually:

- Out-of-range value: model is set to the out-of-range value with an `error` CSS class.
- Invalid date-time: model is set to `null` with an `error` CSS class.

```cshtml
@{
    var minVal = new DateTime(2019, 5, 5, 2, 0, 0);
    var maxVal = new DateTime(2019, 5, 25, 2, 0, 0);
    var value  = new DateTime(2019, 5, 10, 10, 0, 0);
}
<ejs-datetimepicker id="datetimepicker"
    value="value"
    min="minVal"
    max="maxVal"
    strictMode="false">
</ejs-datetimepicker>
```

**Use this mode** when you want to show validation feedback without forcibly clamping the input.

---

## Choosing the Right Mode

| Scenario | Recommended Mode |
|---|---|
| Form with server-side validation | `false` – display error class, submit anyway |
| Scheduling with hard boundaries | `true` – never allow invalid booking times |
| Date range pickers with strict start/end | `true` – prevent invalid selections |
| Data entry with flexible validation | `false` – show error but preserve input |

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `strictMode` | `bool` | `false` | Enforce only valid date-time within min/max range |
| `min` | `object` | `null` | Minimum allowed date-time |
| `max` | `object` | `null` | Maximum allowed date-time |
