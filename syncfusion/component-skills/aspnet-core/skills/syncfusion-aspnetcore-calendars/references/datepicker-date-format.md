# DatePicker — Date Format

## Table of Contents
- [Overview](#overview)
- [Custom Format with format Property](#custom-format-with-format-property)
- [Multiple Input Formats with inputFormats](#multiple-input-formats-with-inputformats)
- [Common Format Tokens](#common-format-tokens)

---

## Overview

By default, the DatePicker uses the format defined by the current culture (`en-US` uses `M/d/yyyy`). Use the `format` property to override this with a custom display format. Once set, the `format` applies across all cultures.

---

## Custom Format with format Property

Set the `format` property to any valid date format string.

**Example — ISO format (yyyy-MM-dd):**

```cshtml
@{
    var value = new DateTime(2025, 11, 25);
}
<ejs-datepicker id="datepicker"
    value="@value"
    format="yyyy-MM-dd"
    placeholder="YYYY-MM-DD">
</ejs-datepicker>
```

**Example — Day/Month/Year:**

```cshtml
<ejs-datepicker id="datepicker"
    format="dd/MM/yyyy"
    placeholder="DD/MM/YYYY">
</ejs-datepicker>
```

**Example — Full month name:**

```cshtml
<ejs-datepicker id="datepicker"
    format="MMMM dd, yyyy"
    placeholder="e.g., January 01, 2025">
</ejs-datepicker>
```

---

## Multiple Input Formats with inputFormats

The `inputFormats` property accepts an array of date format strings that the DatePicker will recognize when the user types a date. After the user confirms the entry (pressing Enter, Tab, or losing focus), the value is converted to the display `format`.

This provides flexibility so users can type in several shorthand styles.

**Razor Page code-behind:**

```csharp
public class IndexModel : PageModel
{
    public string[] InputFormats { get; set; }

    public void OnGet()
    {
        InputFormats = new[] { "M/d/yy", "MM-dd-yyyy", "dd MMM yyyy" };
    }
}
```

**View:**

```cshtml
<ejs-datepicker id="datepicker"
    format="MM/dd/yyyy"
    inputFormats="@Model.InputFormats"
    placeholder="Try: 1/5/25 or 01-05-2025">
</ejs-datepicker>
```

Users can now type `1/5/25`, `01-05-2025`, or `05 Jan 2025` — all are parsed and normalized to `01/05/2025`.

---

## Common Format Tokens

| Token | Meaning | Example |
|---|---|---|
| `d` | Day (no leading zero) | 5 |
| `dd` | Day (with leading zero) | 05 |
| `M` | Month (no leading zero) | 3 |
| `MM` | Month (with leading zero) | 03 |
| `MMM` | Abbreviated month name | Jan |
| `MMMM` | Full month name | January |
| `yy` | 2-digit year | 25 |
| `yyyy` | 4-digit year | 2025 |

> **Note:** The `format` property applies globally once set — it overrides the culture default for display.
