# API Reference – ASP.NET Core Calendar

> **Source:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Calendars.Calendar.html  
> **Namespace:** `Syncfusion.EJ2.Calendars`  
> **Assembly:** `Syncfusion.EJ2.dll`  
> **Tag Helper:** `<ejs-calendar>`

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Enum Reference](#enum-reference)
- [CSS Classes](#css-classes)
- [Tag Helper Syntax Reference](#tag-helper-syntax-reference)

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `CalendarMode` | `CalendarType` | `Gregorian` | Sets the calendar type. `Gregorian` for standard calendar; `Islamic` for Hijri lunar calendar. |
| `CssClass` | `string` | `null` | Root CSS class for appearance customization by overriding styles. |
| `DayHeaderFormat` | `DayHeaderFormats` | `Short` | Format of day names in the header. Options: `Short` (Su), `Narrow` (S), `Abbreviated` (Sun), `Wide` (Sunday). |
| `Depth` | `CalendarView` | `Month` | Maximum view depth the user can navigate into. Must be ≤ `Start`. Options: `Month`, `Year`, `Decade`. |
| `Enabled` | `bool` | `true` | Enables or disables the Calendar component. |
| `EnablePersistence` | `bool` | `false` | Persists the `Value` state between page reloads. |
| `EnableRtl` | `bool` | `false` | Enables right-to-left rendering for RTL languages (Arabic, Hebrew). |
| `FirstDayOfWeek` | `int` | `0` | First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday. Culture-specific by default. |
| `HtmlAttributes` | `object` | `null` | Additional HTML attributes (e.g., title, name) as key-value pairs. |
| `IsMultiSelection` | `bool` | `false` | Enables multiple date selection. Use `Values` (plural) to get/set selected dates. |
| `KeyConfigs` | `object` | `null` | Customizes keyboard shortcuts for the Calendar. |
| `Locale` | `string` | `""` | Culture locale override (e.g., `"de"`, `"ar"`). Defaults to global culture `en-US`. |
| `Max` | `object` | `null` | Maximum selectable date. Dates after this are disabled. |
| `Min` | `object` | `null` | Minimum selectable date. Dates before this are disabled. |
| `ServerTimezoneOffset` | `double` | `Double.NaN` | Server timezone offset in hours for processing the initial date value. |
| `ShowTodayButton` | `bool` | `true` | Shows or hides the Today button in the Calendar footer. |
| `Start` | `CalendarView` | `Month` | Initial view when Calendar renders. Options: `Month`, `Year`, `Decade`. |
| `Value` | `object` | `null` | Currently selected date. Updated when user selects a date. |
| `Values` | `object` | `null` | Array of selected dates for multi-selection mode (`IsMultiSelection="true"`). |
| `WeekNumber` | `bool` | `false` | Displays the ISO week number column on the left side of the Calendar. |
| `WeekRule` | `WeekRule` | `FirstDay` | Rule for defining the first week of the year. Options: `FirstDay`, `FirstFourDayWeek`, `FirstFullWeek`. |

---

## Events

| Event | Type | Trigger Condition |
|-------|------|------------------|
| `Change` | `string` | Fires when the selected date value changes. |
| `Created` | `string` | Fires when the Calendar component finishes rendering. |
| `Destroyed` | `string` | Fires when the Calendar component is destroyed. |
| `Navigated` | `string` | Fires when the Calendar navigates to another view level or moves within the same level. |
| `RenderDayCell` | `string` | Fires for each day cell during rendering. Use to disable or customize individual cells. |

### Event Handler Examples

#### Change Event
```cshtml
<ejs-calendar id="calendar" change="onDateChange"></ejs-calendar>

<script>
    function onDateChange(args) {
        // args.value  – the newly selected Date object
        // args.values – array of dates (when isMultiSelection is true)
        console.log('Selected date:', args.value);
    }
</script>
```

#### Created Event
```cshtml
<ejs-calendar id="calendar" created="onCalendarCreated"></ejs-calendar>

<script>
    function onCalendarCreated() {
        console.log('Calendar rendered');
    }
</script>
```

#### Navigated Event
```cshtml
<ejs-calendar id="calendar" navigated="onNavigated"></ejs-calendar>

<script>
    function onNavigated(args) {
        // args.date  – the current navigation date
        // args.view  – the current view ('month', 'year', or 'decade')
        console.log('Navigated to:', args.view, args.date);
    }
</script>
```

#### RenderDayCell Event
```cshtml
<ejs-calendar id="calendar" renderDayCell="onRenderCell"></ejs-calendar>

<script>
    function onRenderCell(args) {
        // args.date        – Date object for the cell
        // args.isDisabled  – set true to disable the cell
        // args.isOutOfRange – true if cell is outside min/max
        // args.element     – DOM element of the cell
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true; // Disable weekends
        }
    }
</script>
```

---

## Enum Reference

### CalendarType
Controls the calendar system displayed.

| Value | Description |
|-------|-------------|
| `Gregorian` (default) | Standard Gregorian calendar |
| `Islamic` | Islamic (Hijri) lunar calendar |

### CalendarView
Used for `Start` and `Depth` properties.

| Value | Description |
|-------|-------------|
| `Month` (default) | Day-level view showing all days of the month |
| `Year` | Month-level view showing all months of the year |
| `Decade` | Year-level view showing all years of the decade |

### DayHeaderFormats
Controls the day name format in the header row.

| Value | Example |
|-------|---------|
| `Short` (default) | Su, Mo, Tu |
| `Narrow` | S, M, T |
| `Abbreviated` | Sun, Mon, Tue |
| `Wide` | Sunday, Monday, Tuesday |

### WeekRule
Controls which week is considered the first of the year.

| Value | Description |
|-------|-------------|
| `FirstDay` (default) | First week contains the first day of the year |
| `FirstFourDayWeek` | First week has at least four days in the year |
| `FirstFullWeek` | First week contains all seven days within the year |

---

## CSS Classes

| CSS Class | Applied To |
|-----------|-----------|
| `.e-calendar` | Root Calendar wrapper element |
| `.e-header` | Header section (title + navigation icons) |
| `.e-title` | Month/year title text in the header |
| `.e-icon-container` | Container for previous and next navigation icons |
| `.e-prev` | Previous (left arrow) navigation icon |
| `.e-next` | Next (right arrow) navigation icon |
| `.e-content thead` | Day-names header row |
| `.e-content td` | Individual day cell |
| `.e-day` | Day number span inside each cell |
| `.e-weekend` | Weekend day cells (Saturday and Sunday) |
| `.e-other-month` | Days belonging to the previous or next month |
| `.e-selected` | Currently selected date cell |
| `.e-disabled` | Disabled date cells (outside min/max or manually disabled) |
| `.e-focused-date` | Keyboard-focused date cell |
| `.e-today` | Today's date cell |
| `.e-footer-container` | Footer area containing the Today button |
| `.e-btn.e-today` | Today button element |

---

## Tag Helper Syntax Reference

```cshtml
<ejs-calendar
    id="calendar"
    value="@ViewBag.selectedDate"
    min="@ViewBag.minDate"
    max="@ViewBag.maxDate"
    start="Syncfusion.EJ2.Calendars.CalendarView.Month"
    depth="Syncfusion.EJ2.Calendars.CalendarView.Month"
    firstDayOfWeek="1"
    dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Short"
    weekNumber="false"
    weekRule="Syncfusion.EJ2.Calendars.WeekRule.FirstDay"
    isMultiSelection="false"
    values="@ViewBag.multiValues"
    showTodayButton="true"
    enabled="true"
    enableRtl="false"
    enablePersistence="false"
    locale="en-US"
    cssClass=""
    calendarMode="Syncfusion.EJ2.Calendars.CalendarType.Gregorian"
    serverTimezoneOffset="0"
    change="onDateChange"
    created="onCreated"
    destroyed="onDestroyed"
    navigated="onNavigated"
    renderDayCell="onRenderDayCell">
</ejs-calendar>
```

> **Note:** Only set properties you need — most have sensible defaults. Omitting a property uses its default value as listed in the Properties table above.
