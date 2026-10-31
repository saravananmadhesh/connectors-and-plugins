# DateRangePicker — Range Restriction

## Table of Contents
- [Restrict Min and Max Date](#restrict-min-and-max-date)
- [Range Span: minDays and maxDays](#range-span-mindays-and-maxdays)
- [Strict Mode](#strict-mode)
- [Out-of-Range Behavior Summary](#out-of-range-behavior-summary)

---

## Restrict Min and Max Date

Use `min` and `max` to define the earliest selectable start date and latest selectable end date. Dates outside this range are disabled in the calendar popup.

- `min` — Sets the minimum date that can be selected as the start date.
- `max` — Sets the maximum date that can be selected as the end date.

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.minDate = new DateTime(2017, 1, 1);
    ViewBag.maxDate = new DateTime(2017, 12, 31);
    return View();
}
```

**View:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    placeholder="Enter a Range"
    min="@ViewBag.minDate"
    max="@ViewBag.maxDate">
</ejs-daterangepicker>
```

> **Note:** If `min` or `max` is changed from code-behind after initial render, update `startDate` and `endDate` to ensure they remain within the new range. If the existing start/end date falls outside the new range, a validation error class is applied to the input — unless `strictMode` is enabled.

---

## Range Span: minDays and maxDays

Constrain the number of days the user can select in a single range:

- `minDays` — Minimum number of days required between start and end date.
- `maxDays` — Maximum number of days allowed between start and end date.

```cshtml
<ejs-daterangepicker id="dayspan"
    minDays="5"
    maxDays="10"
    placeholder="Select a Range">
</ejs-daterangepicker>
```

In the example above, the user must select at least 5 days and no more than 10 days. Selecting outside these boundaries resets the selection.

---

## Strict Mode

When `strictMode="true"`, the DateRangePicker enforces valid date range entry:

- If both start and end dates are **less than** `min`, both are clamped to `min`.
- If both start and end dates are **greater than** `max`, both are clamped to `max`.
- If only the start date is less than `min`, the start date is updated to `min`.
- If only the end date is greater than `max`, the end date is updated to `max`.
- Any invalid range resets to the previous valid value.

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.minDate   = new DateTime(2017, 1, 1);
    ViewBag.maxDate   = new DateTime(2017, 12, 31);
    ViewBag.startDate = new DateTime(2017, 3, 1);
    ViewBag.endDate   = new DateTime(2017, 3, 15);
    return View();
}
```

**View:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    strictMode="true"
    placeholder="Enter a Range"
    min="@ViewBag.minDate"
    max="@ViewBag.maxDate"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate">
</ejs-daterangepicker>
```

Without `strictMode` (default `false`): The control accepts the out-of-range input, but applies an error CSS class (`e-error`) to indicate the invalid state. The value is not automatically corrected.

---

## Out-of-Range Behavior Summary

| Scenario | `strictMode="false"` (default) | `strictMode="true"` |
|---|---|---|
| Start date < `min` | Accepts value, shows error class | Clamps start date to `min` |
| End date > `max` | Accepts value, shows error class | Clamps end date to `max` |
| Both < `min` | Accepts value, shows error class | Both set to `min` |
| Both > `max` | Accepts value, shows error class | Both set to `max` |
| Invalid range typed | Accepts value, shows error class | Resets to previous valid value |
