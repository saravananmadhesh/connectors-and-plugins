# DatePicker — Strict Mode

## Overview

The `strictMode` property controls how the DatePicker handles invalid or out-of-range date input:

| Mode | Behavior |
|---|---|
| `strictMode="false"` (default) | Accepts any input; applies `e-error` class for invalid/out-of-range values |
| `strictMode="true"` | Clamps out-of-range values to `min`/`max`; retains previous value for invalid entries |

---

## Strict Mode Enabled (strictMode=true)

When `strictMode` is `true`:
- If the user types a date **beyond the max**, the value resets to `max`.
- If the user types a date **before the min**, the value resets to `min`.
- If the user types an **invalid date string**, the previous valid value is retained.

```cshtml
@{
    var minDate = new DateTime(2025, 5, 5);
    var maxDate = new DateTime(2025, 5, 25);
    var value   = new DateTime(2025, 5, 10);
}
<ejs-datepicker id="datepicker"
    min="@minDate"
    max="@maxDate"
    value="@value"
    strictMode="true"
    placeholder="Select a date (5th–25th May)">
</ejs-datepicker>
```

**Example behavior:** Typing `05/28/2025` → value snaps to `05/25/2025` (the max).

---

## Default Mode (strictMode=false)

When `strictMode` is `false` (default):
- Out-of-range or invalid input is **accepted** in the text box.
- The model value is set to the out-of-range date value, or `null` for invalid text.
- The `e-error` CSS class is applied to the wrapper to visually indicate the problem.
- No forced correction occurs — the user sees the error highlight.

```cshtml
@{
    var minDate = new DateTime(2025, 5, 5);
    var maxDate = new DateTime(2025, 5, 25);
    var value   = new DateTime(2025, 5, 28); // out of range — will show error class
}
<ejs-datepicker id="datepicker"
    min="@minDate"
    max="@maxDate"
    value="@value"
    placeholder="Select a date">
</ejs-datepicker>
```

---

## Choosing Between Modes

| Use Case | Recommended Setting |
|---|---|
| Form requires only valid values — no erroneous submission | `strictMode="true"` |
| Display existing data that may be out-of-range with visual feedback | `strictMode="false"` (default) |
| Validation handled separately (e.g., FormValidator) | `strictMode="false"` |

> **Note:** If `min` or `max` is updated from code-behind, also update `value` to keep it within the valid range.
