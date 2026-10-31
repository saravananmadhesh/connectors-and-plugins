# DatePicker — Date Range

## Table of Contents
- [Overview](#overview)
- [Setting Min and Max](#setting-min-and-max)
- [Out-of-Range Behavior](#out-of-range-behavior)
- [Updating Min/Max from Code-Behind](#updating-minmax-from-code-behind)

---

## Overview

The DatePicker restricts date selection to a specified range using the `min` and `max` properties. The `min` value must always be less than `max`. Dates outside the range are rendered as disabled in the calendar popup.

---

## Setting Min and Max

```cshtml
@{
    var minDate = new DateTime(2025, 5, 7);
    var maxDate = new DateTime(2025, 5, 27);
}
<ejs-datepicker id="datepicker"
    min="@minDate"
    max="@maxDate"
    placeholder="Select a date within range">
</ejs-datepicker>
```

- Only dates from the 7th to 27th of May 2025 can be selected.
- Dates outside this range are visually disabled but visible in the calendar.

---

## Out-of-Range Behavior

The behavior when a date is out of range depends on the `strictMode` setting:

| Scenario | `strictMode="false"` (default) | `strictMode="true"` |
|---|---|---|
| Value out of range | Model value set to out-of-range value; `e-error` CSS class applied | Value clamped to `min` or `max` |
| Invalid date entry | Model value set to `null`; `e-error` CSS class applied | Previous valid value retained |

### Default (strictMode=false) with out-of-range initial value

```cshtml
@{
    var minDate = new DateTime(2025, 5, 7);
    var maxDate = new DateTime(2025, 5, 27);
    var value   = new DateTime(2025, 5, 30); // out of range
}
<ejs-datepicker id="datepicker"
    min="@minDate"
    max="@maxDate"
    value="@value">
</ejs-datepicker>
```

The input will display the out-of-range date with an `e-error` class highlighting.

### strictMode=true with out-of-range initial value

```cshtml
@{
    var minDate = new DateTime(2025, 5, 7);
    var maxDate = new DateTime(2025, 5, 27);
    var value   = new DateTime(2025, 5, 30); // out of range → clamped to max
}
<ejs-datepicker id="datepicker"
    min="@minDate"
    max="@maxDate"
    value="@value"
    strictMode="true">
</ejs-datepicker>
```

The value is clamped to `maxDate` (May 27) on render.

---

## Updating Min/Max from Code-Behind

If `min` or `max` is changed programmatically, update `value` as well to ensure it stays within the new range:

```csharp
// Controller
public IActionResult OnGet()
{
    ViewBag.Min   = new DateTime(2025, 6, 1);
    ViewBag.Max   = new DateTime(2025, 6, 30);
    ViewBag.Value = new DateTime(2025, 6, 15);
    return Page();
}
```

```cshtml
<ejs-datepicker id="datepicker"
    min="@ViewBag.Min"
    max="@ViewBag.Max"
    value="@ViewBag.Value">
</ejs-datepicker>
```

> **Note:** If `min` or `max` is changed from code-behind, always update the `value` property to keep it within the new range.
