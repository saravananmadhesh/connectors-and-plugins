# DateRangePicker — Date Format

## Table of Contents
- [Custom Display Format](#custom-display-format)
- [Input Formats](#input-formats)
- [Separator](#separator)
- [Common Format Token Reference](#common-format-token-reference)

---

## Custom Display Format

By default, the DateRangePicker's display format is based on the active culture. Use the `format` property to apply a custom format string.

> **Note:** Once `format` is set, it applies uniformly across all cultures — overriding the locale-specific default.

**Example — Custom format `dd/MMM/yy hh:mm a`:**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 20);
    ViewBag.endDate   = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 25);
    return View();
}
```

**View:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    format="dd/MMM/yy hh:mm a"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate">
</ejs-daterangepicker>
```

**Simple date-only format:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    format="yyyy-MM-dd"
    placeholder="YYYY-MM-DD ~ YYYY-MM-DD">
</ejs-daterangepicker>
```

---

## Input Formats

The `inputFormats` property accepts an array of date format strings that the DateRangePicker recognizes for user text entry. When the user types a date in any of the specified formats and presses **Enter**, **Tab**, or blurs the input, the value is automatically converted to the display `format`.

This is useful when users may enter dates in various regional formats (e.g., `MM/dd/yyyy`, `dd-MM-yyyy`, `yyyyMMdd`).

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 20);
    ViewBag.endDate   = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 25);
    return View();
}
```

**View:**

```cshtml
<ejs-daterangepicker id="daterangepicker"
    format="dd/MMM/yy hh:mm a"
    inputFormats="@(new string[] { "dd/MM/yyyy", "yyyyMMdd" })"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate">
</ejs-daterangepicker>
```

> **Note:** `inputFormats` only affects how user-typed values are parsed. The displayed value always uses the `format` property.

---

## Separator

The `separator` property sets the string displayed between the start date and end date in the input field. The default separator is `" - "`.

```cshtml
<ejs-daterangepicker id="daterangepicker"
    separator=" to "
    placeholder="Select a Range">
</ejs-daterangepicker>
```

---

## Common Format Token Reference

| Token | Description | Example |
|---|---|---|
| `d` | Day of month (no leading zero) | 5 |
| `dd` | Day of month (leading zero) | 05 |
| `M` | Month number (no leading zero) | 3 |
| `MM` | Month number (leading zero) | 03 |
| `MMM` | Abbreviated month name | Mar |
| `MMMM` | Full month name | March |
| `yy` | 2-digit year | 25 |
| `yyyy` | 4-digit year | 2025 |
| `hh` | Hour 1–12 (leading zero) | 09 |
| `HH` | Hour 0–23 (leading zero) | 21 |
| `mm` | Minutes (leading zero) | 05 |
| `ss` | Seconds (leading zero) | 00 |
| `a` | AM/PM | AM |
