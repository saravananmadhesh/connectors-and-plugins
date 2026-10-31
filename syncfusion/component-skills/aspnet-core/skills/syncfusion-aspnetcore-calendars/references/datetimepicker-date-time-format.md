# DateTimePicker – Date and Time Format

## Table of Contents
- [Display Format (format)](#1-display-format-format)
- [Time Popup Format (timeFormat)](#2-time-popup-format-timeformat)
- [Input Formats (inputFormats)](#3-input-formats-inputformats)
- [Format Token Reference](#4-format-token-reference)

---

## 1. Display Format (format)

By default, the DateTimePicker uses the culture-based format. Use the `format` property to define a custom display format for both date and time:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    format="yyyy-MM-dd hh:mm">
</ejs-datetimepicker>
```

Setting a custom format applies it across all cultures.

**Common format examples:**

| Format String | Example Output |
|---|---|
| `MM/dd/yyyy hh:mm a` | `05/10/2019 10:00 AM` |
| `yyyy-MM-dd HH:mm` | `2019-05-10 10:00` |
| `dd/MM/yyyy HH:mm:ss` | `10/05/2019 10:00:00` |
| `M/d/yy h:mm tt` | `5/10/19 10:00 AM` |

---

## 2. Time Popup Format (timeFormat)

Use `timeFormat` to control the format of time values displayed in the time popup list, independently from the main `format`:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    timeFormat="HH:mm">
</ejs-datetimepicker>
```

---

## 3. Input Formats (inputFormats)

The `inputFormats` property accepts an array of format strings that the component recognizes when the user types directly into the input. After the user presses **Enter**, **Tab**, or when focus leaves the input, the entered value is parsed and converted to the display `format`.

```cshtml
@{
    string[] formats = new string[] { "dd/MM/yyyy HH:mm", "M/d/yy h:mm tt", "yyyy-MM-dd HH:mm" };
}
<ejs-datetimepicker id="datetimepicker"
    format="MM/dd/yyyy hh:mm a"
    inputFormats="formats">
</ejs-datetimepicker>
```

**How it works:**
1. User types `10/05/2019 14:30` (matching `dd/MM/yyyy HH:mm`).
2. User presses Tab or Enter.
3. Input converts to `05/10/2019 02:30 PM` (display format).

**Controller (passing to ViewBag):**
```csharp
public IActionResult Index()
{
    ViewBag.inputFormats = new string[] { "dd/MM/yyyy HH:mm", "M/d/yy h:mm tt" };
    return View();
}
```

---

## 4. Format Token Reference

| Token | Description | Example |
|---|---|---|
| `yyyy` | 4-digit year | `2019` |
| `yy` | 2-digit year | `19` |
| `MM` | 2-digit month (01–12) | `05` |
| `M` | Month without leading zero | `5` |
| `dd` | 2-digit day (01–31) | `10` |
| `d` | Day without leading zero | `10` |
| `HH` | 24-hour hours (00–23) | `14` |
| `hh` | 12-hour hours (01–12) | `02` |
| `mm` | Minutes (00–59) | `30` |
| `ss` | Seconds (00–59) | `00` |
| `a` / `tt` | AM/PM meridiem | `PM` |

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `format` | `string` | `null` (culture-based) | Display format for date and time |
| `timeFormat` | `string` | `null` | Format for time popup list items |
| `inputFormats` | `string[]` | `null` | Accepted input formats for user typing |
