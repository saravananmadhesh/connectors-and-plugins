# Strict Mode – ASP.NET Core TimePicker

## Table of Contents
- [Overview](#overview)
- [Strict Mode Enabled](#strict-mode-enabled)
- [Strict Mode Disabled (Default)](#strict-mode-disabled-default)
- [Behavior Comparison](#behavior-comparison)

---

## Overview

The `StrictMode` property controls how the TimePicker handles time values that are invalid or outside the configured `Min`/`Max` range. This is useful when you need to enforce valid input and prevent users from submitting out-of-range or unparseable time values.

---

## Strict Mode Enabled

When `StrictMode="true"`:

- **Out-of-range value:** Automatically clamped to `Min` (if below) or `Max` (if above)
- **Invalid value:** Reverts to the previous valid value

**Example:** If `Min` is `10:00 AM` and `Max` is `4:00 PM`, entering `8:00 PM` sets the value to `4:00 PM`. Entering `9:00 tt` (invalid) reverts to the last valid value.

**Controller:**
```csharp
public ActionResult StrictMode()
{
    ViewBag.value  = new DateTime(2022, 05, 07, 10, 00, 00);
    ViewBag.minVal = new DateTime(2022, 05, 07, 10, 00, 00);
    ViewBag.maxVal = new DateTime(2022, 05, 07, 16, 00, 00);
    return View();
}
```

**View:**
```cshtml
<ejs-timepicker id="timepicker"
    value="@ViewBag.value"
    min="@ViewBag.minVal"
    max="@ViewBag.maxVal"
    strictMode="true">
</ejs-timepicker>
```

---

## Strict Mode Disabled (Default)

When `StrictMode="false"` (default):

- **Out-of-range value:** Accepted as entered, but the wrapper element receives an `error` CSS class to visually indicate it's out of range
- **Invalid value:** The model value is set to `null`, and the `error` CSS class is applied

This mode is permissive — it allows any input and flags problems visually rather than blocking them.

**View:**
```cshtml
<ejs-timepicker id="timepicker"
    value="@ViewBag.value"
    min="@ViewBag.minVal"
    max="@ViewBag.maxVal">
</ejs-timepicker>
```

> `StrictMode` defaults to `false`, so simply omitting it renders the non-strict behavior.

---

## Behavior Comparison

| Scenario | StrictMode = true | StrictMode = false |
|----------|-------------------|-------------------|
| Value within range | Accepted normally | Accepted normally |
| Value above Max | Clamped to `Max` | Accepted, `error` class applied |
| Value below Min | Clamped to `Min` | Accepted, `error` class applied |
| Invalid time string | Reverts to previous value | Model value set to `null`, `error` class applied |

> **Tip:** When `Min` or `Max` is updated programmatically, always update `Value` to remain within range — especially when using `StrictMode="true"`.
