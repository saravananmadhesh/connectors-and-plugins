# Calendar Views – ASP.NET Core Calendar

## Table of Contents
- [Available Views](#available-views)
- [Setting the Start View](#setting-the-start-view)
- [View Restriction with Depth](#view-restriction-with-depth)
- [View Navigation Rules](#view-navigation-rules)
- [Examples](#examples)

---

## Available Views

The Calendar supports three pre-defined views for flexible navigation:

| View | Description |
|------|-------------|
| `Month` (default) | Displays all days in the current month |
| `Year` | Displays all months in the current year |
| `Decade` | Displays all years in the current decade |

Users can drill up (month → year → decade) by clicking the title, and drill down (decade → year → month) by clicking a year or month.

---

## Setting the Start View

Use the `start` property to control the **initial view** when the Calendar first renders. The value is a `CalendarView` enum.

```cshtml
@* Opens in Year view by default *@
<ejs-calendar id="calendar" start="Syncfusion.EJ2.Calendars.CalendarView.Year"></ejs-calendar>
```

```cshtml
@* Opens in Decade view by default *@
<ejs-calendar id="calendar" start="Syncfusion.EJ2.Calendars.CalendarView.Decade"></ejs-calendar>
```

```cshtml
@* Default: Month view *@
<ejs-calendar id="calendar" start="Syncfusion.EJ2.Calendars.CalendarView.Month"></ejs-calendar>
```

---

## View Restriction with Depth

Use the `depth` property to **limit how far down** the user can navigate. Combined with `start`, you can create a year picker or month picker using the Calendar.

```cshtml
@* Starts in Decade view; user can only drill down to Year (cannot reach Month) *@
<ejs-calendar id="calendar"
    start="Syncfusion.EJ2.Calendars.CalendarView.Decade"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Year">
</ejs-calendar>
```

```cshtml
@* Starts in Year view; user can only select months (cannot reach day level) *@
<ejs-calendar id="calendar"
    start="Syncfusion.EJ2.Calendars.CalendarView.Year"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Year">
</ejs-calendar>
```

---

## View Navigation Rules

- `depth` must always be **smaller than or equal** to `start` in hierarchy.
  - Valid: `start=Decade`, `depth=Year`
  - Valid: `start=Decade`, `depth=Month`
  - Valid: `start=Year`, `depth=Month`
  - ⚠️ **Invalid:** `depth` larger than `start` — Calendar view will remain unchanged.
- If `start` and `depth` are the same view, navigation is locked to that view.

---

## Examples

### Year Picker (select month only)
```cshtml
<ejs-calendar id="yearPicker"
    start="Syncfusion.EJ2.Calendars.CalendarView.Year"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Year">
</ejs-calendar>
```

### Decade Picker (select year only)
```cshtml
<ejs-calendar id="decadePicker"
    start="Syncfusion.EJ2.Calendars.CalendarView.Decade"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Decade">
</ejs-calendar>
```

### Full Navigation from Decade to Month
```cshtml
<ejs-calendar id="fullNav"
    start="Syncfusion.EJ2.Calendars.CalendarView.Decade"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Month">
</ejs-calendar>
```

### Standard Month View (default behavior)
```cshtml
<ejs-calendar id="calendar"></ejs-calendar>
```

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `start` | `CalendarView` | `Month` | Initial view when Calendar opens |
| `depth` | `CalendarView` | `Month` | Deepest view the user can navigate into |

**CalendarView enum values:** `Month`, `Year`, `Decade`
