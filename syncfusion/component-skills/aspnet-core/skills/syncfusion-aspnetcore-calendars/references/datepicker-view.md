# DatePicker — Views and Calendar Configuration

## Table of Contents
- [Overview](#overview)
- [Start View](#start-view)
- [Depth View](#depth-view)
- [Day Header Format](#day-header-format)
- [Week Number](#week-number)
- [First Day of Week](#first-day-of-week)

---

## Overview

The DatePicker calendar popup supports three view levels that users navigate through. You can control the initial view shown when the popup opens (`start`) and the deepest view the user can drill into (`depth`).

| View | Description |
|---|---|
| `Month` (default) | Displays all days in a month |
| `Year` | Displays all months in a year |
| `Decade` | Displays years in a decade |

---

## Start View

The `start` property sets the view rendered when the calendar popup first opens.

**Open directly at Year view (month selection):**

```cshtml
<ejs-datepicker id="datepicker"
    start="Year"
    placeholder="Select a month">
</ejs-datepicker>
```

**Open at Decade view (year selection):**

```cshtml
<ejs-datepicker id="datepicker"
    start="Decade"
    placeholder="Select a year">
</ejs-datepicker>
```

---

## Depth View

The `depth` property controls the deepest view the user can navigate into. Depth must be the same level as or shallower than `start`.

**Year picker — open at Decade, stop at Year (user picks a year, not a day):**

```cshtml
<ejs-datepicker id="datepicker"
    start="Decade"
    depth="Year"
    format="yyyy"
    placeholder="Select year">
</ejs-datepicker>
```

**Month picker — open at Year, stop at Year (user picks a month):**

```cshtml
<ejs-datepicker id="datepicker"
    start="Year"
    depth="Year"
    format="MMM yyyy"
    placeholder="Select month">
</ejs-datepicker>
```

> **Note:** `depth` must be less than or equal to `start`. Setting `depth` deeper than `start` has no effect.

---

## Day Header Format

The `dayHeaderFormat` property sets how the day names are displayed in the calendar header row.

| Value | Example |
|---|---|
| `Short` (default) | Su, Mo, Tu… |
| `Narrow` | S, M, T… |
| `Abbreviated` | Sun, Mon, Tue… |
| `Wide` | Sunday, Monday, Tuesday… |

```cshtml
<ejs-datepicker id="datepicker" dayHeaderFormat="Abbreviated"></ejs-datepicker>
```

```cshtml
<ejs-datepicker id="datepicker" dayHeaderFormat="Wide"></ejs-datepicker>
```

---

## Week Number

Display the ISO week number alongside each row in the month view:

```cshtml
<ejs-datepicker id="datepicker" weekNumber="true"></ejs-datepicker>
```

---

## First Day of Week

Override the first day of the week (0 = Sunday, 1 = Monday, … 6 = Saturday):

```cshtml
<ejs-datepicker id="datepicker" firstDayOfWeek="1"></ejs-datepicker>
```

Setting `firstDayOfWeek="1"` starts the calendar week on Monday, regardless of the current culture default.
