# Customization – ASP.NET Core Calendar

## Table of Contents
- [renderDayCell Event](#renderdaycell-event)
- [Disable Weekends](#disable-weekends)
- [Highlight Specific Dates](#highlight-specific-dates)
- [Highlight Weekends](#highlight-weekends)
- [Day Cell Format](#day-cell-format)
- [First Day of the Week](#first-day-of-the-week)
- [Week Numbers](#week-numbers)
- [Week Rule](#week-rule)
- [CSS Class Reference](#css-class-reference)

---

## renderDayCell Event

The `renderDayCell` event fires for each day cell during Calendar rendering. Use it to **disable** or **style** individual day cells.

**Event arguments available in the handler:**

| Argument | Description |
|----------|-------------|
| `date` | The `Date` object for the current cell |
| `isDisabled` | Set to `true` to disable this date |
| `isOutOfRange` | Indicates whether the date is outside min/max range |
| `element` | The DOM element of the day cell |

---

## Disable Weekends

```cshtml
<ejs-calendar id="calendar" renderDayCell="disableWeekends"></ejs-calendar>

<script>
    function disableWeekends(args) {
        // 0 = Sunday, 6 = Saturday
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
</script>
```

---

## Highlight Specific Dates

Highlight special dates (e.g., World Health Day – April 7, World Forest Day – March 21) by adding a CSS class or element to the cell:

```cshtml
<ejs-calendar id="calendar" renderDayCell="highlightSpecialDates"></ejs-calendar>

<style>
    .e-calendar .special span.e-day {
        background-color: #3c78ef;
        border-radius: 50%;
        color: white;
    }
</style>

<script>
    function highlightSpecialDates(args) {
        var date  = args.date;
        var month = date.getMonth() + 1; // 1-based
        var day   = date.getDate();

        // World Health Day: April 7
        if (month === 4 && day === 7) {
            args.element.classList.add('special');
            args.element.setAttribute('title', 'World Health Day');
        }

        // World Forest Day: March 21
        if (month === 3 && day === 21) {
            args.element.classList.add('special');
            args.element.setAttribute('title', 'World Forest Day');
        }
    }
</script>
```

---

## Highlight Weekends

Add a CSS class to weekend cells to visually distinguish them without disabling:

```cshtml
<ejs-calendar id="calendar" renderDayCell="highlightWeekends"></ejs-calendar>

<style>
    .e-calendar .e-content td.weekend span.e-day {
        background-color: #e2f3ff;
        color: #0056b3;
    }
</style>

<script>
    function highlightWeekends(args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.element.classList.add('weekend');
        }
    }
</script>
```

---

## Day Cell Format

Control how the day names appear in the Calendar header using `dayHeaderFormat`:

| Format Value | Example Output |
|-------------|---------------|
| `Short` (default) | Su, Mo, Tu, ... |
| `Narrow` | S, M, T, ... |
| `Abbreviated` | Sun, Mon, Tue, ... |
| `Wide` | Sunday, Monday, ... |

```cshtml
@* Narrow format (single character) *@
<ejs-calendar id="calendar" dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Narrow"></ejs-calendar>
```

```cshtml
@* Abbreviated format (3-letter) *@
<ejs-calendar id="calendar" dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Abbreviated"></ejs-calendar>
```

```cshtml
@* Wide format (full day name) *@
<ejs-calendar id="calendar" dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Wide"></ejs-calendar>
```

---

## First Day of the Week

Change the starting day of the week using `firstDayOfWeek`. Day values: 0 = Sunday, 1 = Monday, ..., 6 = Saturday.

```cshtml
@* Start week on Monday *@
<ejs-calendar id="calendar" firstDayOfWeek="1"></ejs-calendar>
```

```cshtml
@* Start week on Tuesday *@
<ejs-calendar id="calendar" firstDayOfWeek="2"></ejs-calendar>
```

> **Note:** By default, the first day of the week is culture-specific.

---

## Week Numbers

Display the ISO week number of the year in the Calendar:

```cshtml
<ejs-calendar id="calendar" weekNumber="true"></ejs-calendar>
```

An extra column appears on the left of the calendar grid showing the week number for each row.

---

## Week Rule

Control the rule used to determine the first week of the year using `weekRule`:

| Value | Description |
|-------|-------------|
| `FirstDay` (default) | First week contains the first day of the year |
| `FirstFourDayWeek` | First week has at least four days in the year |
| `FirstFullWeek` | First week contains all seven days within the year |

```cshtml
<ejs-calendar id="calendar"
    weekNumber="true"
    weekRule="Syncfusion.EJ2.Calendars.WeekRule.FirstFourDayWeek">
</ejs-calendar>
```

---

## CSS Class Reference

Use these class names to customize Calendar appearance via CSS:

| CSS Class | Applied To |
|-----------|-----------|
| `.e-calendar` | Root Calendar element |
| `.e-header` | Calendar header area |
| `.e-title` | Month/year title in header |
| `.e-icon-container` | Container for prev/next navigation icons |
| `.e-prev` | Previous navigation icon |
| `.e-next` | Next navigation icon |
| `.e-weekend` | Weekend day cells |
| `.e-other-month` | Days belonging to adjacent months |
| `.e-day` | Each individual day cell |
| `.e-selected` | Currently selected date cell |
| `.e-disabled` | Disabled date cells |
| `.e-footer-container` | Today button footer area |
| `.e-focused-date` | Focused (keyboard-navigated) date |
| `.e-today` | Today's date cell |

**Scope customization using `cssClass`:**
```cshtml
<ejs-calendar id="calendar" cssClass="my-calendar"></ejs-calendar>
```
```css
.my-calendar .e-header {
    background-color: #1565C0;
    color: white;
}
.my-calendar .e-selected span.e-day {
    background-color: #1565C0;
}
```
