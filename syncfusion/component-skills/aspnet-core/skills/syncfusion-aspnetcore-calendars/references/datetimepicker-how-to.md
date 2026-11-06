# DateTimePicker – How-To Guides

## Table of Contents
- [Render DateTimePickerFor (Model Binding)](#1-render-datetimepickerfor-model-binding)
- [Disable the DateTimePicker](#2-disable-the-datetimepicker)
- [Set Placeholder](#3-set-placeholder)
- [Customize the Day Header Format](#4-customize-the-day-header-format)
- [Customize Day Cells (renderDayCell)](#5-customize-day-cells-renderdaycell)
- [Calendar View Configuration (start / depth)](#6-calendar-view-configuration-start--depth)
- [Week Number Display](#7-week-number-display)
- [Enable State Persistence](#8-enable-state-persistence)

---

## 1. Render DateTimePickerFor (Model Binding)

Use `<ejs-datetimepicker for="...">` to bind a model property and retrieve the selected value on form submission:

**Model:**
```csharp
public class BookingModel
{
    public DateTime BookingDateTime { get; set; }
}
```

**View:**
```cshtml
@model BookingModel
<form asp-action="Submit" method="post">
    <ejs-datetimepicker id="datetimepicker" for="BookingDateTime"></ejs-datetimepicker>
    <button type="submit">Book</button>
</form>
```

**Controller:**
```csharp
[HttpPost]
public IActionResult Submit(BookingModel model)
{
    // model.BookingDateTime holds the selected value
    return RedirectToAction("Index");
}
```

---

## 2. Disable the DateTimePicker

Set `enabled` to `false` to disable the component so users cannot interact with it:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    value="@DateTime.Now"
    enabled="false">
</ejs-datetimepicker>
```

The component renders in a visually disabled state with `aria-disabled` set for screen readers.

---

## 3. Set Placeholder

Display hint text in the input using the `placeholder` property:

```cshtml
<ejs-datetimepicker id="datetimepicker"
    placeholder="Select a date and time">
</ejs-datetimepicker>
```

Combine with `floatLabelType` for a floating label effect:
```cshtml
<ejs-datetimepicker id="datetimepicker"
    placeholder="Select a date and time"
    floatLabelType="Auto">
</ejs-datetimepicker>
```

---

## 4. Customize the Day Header Format

Use the `dayHeaderFormat` property to change how day names appear in the calendar header:

| Value | Display | Example |
|---|---|---|
| `Short` (default) | Abbreviated two-letter | `Su`, `Mo` |
| `Narrow` | Single character | `S`, `M` |
| `Abbreviated` | Three-letter abbreviated | `Sun`, `Mon` |
| `Wide` | Full name | `Sunday`, `Monday` |

```cshtml
<ejs-datetimepicker id="datetimepicker" dayHeaderFormat="Wide"></ejs-datetimepicker>
```

```cshtml
<ejs-datetimepicker id="datetimepicker" dayHeaderFormat="Narrow"></ejs-datetimepicker>
```

---

## 5. Customize Day Cells (renderDayCell)

The `renderDayCell` event fires for each day cell during calendar rendering, allowing customization or disabling of specific dates:

**Disable weekends:**
```cshtml
<ejs-datetimepicker id="datetimepicker"
    renderDayCell="disableWeekends">
</ejs-datetimepicker>

<script>
    function disableWeekends(args) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
</script>
```

**Add custom CSS class to a date:**
```javascript
function customizeDates(args) {
    // Highlight the 15th of every month
    if (args.date.getDate() === 15) {
        args.element.classList.add('highlight-date');
    }
}
```

---

## 6. Calendar View Configuration (start / depth)

Control the initial and minimum view level in the calendar popup:

| Property | Values | Description |
|---|---|---|
| `start` | `Month`, `Year`, `Decade` | Initial view when popup opens |
| `depth` | `Month`, `Year`, `Decade` | Lowest drilldown level (must be ≤ start) |

```cshtml
{{! Opens at year view, user can drill down to Month only }}
<ejs-datetimepicker id="datetimepicker"
    start="Year"
    depth="Month">
</ejs-datetimepicker>
```

---

## 7. Week Number Display

Show the ISO week number alongside each row in the calendar:

```cshtml
<ejs-datetimepicker id="datetimepicker" weekNumber="true"></ejs-datetimepicker>
```

---

## 8. Enable State Persistence

Persist the selected value across page reloads using browser localStorage:

```cshtml
<ejs-datetimepicker id="datetimepicker" enablePersistence="true"></ejs-datetimepicker>
```

When the page reloads, the component restores the last selected `value` from storage.

---

## API Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `enabled` | `bool` | `true` | Enable/disable the component |
| `placeholder` | `string` | `null` | Input hint text |
| `floatLabelType` | `FloatLabelType` | `Never` | Floating label behavior |
| `dayHeaderFormat` | `DayHeaderFormats` | `Short` | Day header display format |
| `renderDayCell` | `string` | `null` | Event for day cell customization |
| `start` | `CalendarView` | `Month` | Initial calendar view |
| `depth` | `CalendarView` | `Month` | Minimum drilldown view |
| `weekNumber` | `bool` | `false` | Show week numbers |
| `enablePersistence` | `bool` | `false` | Persist value across reloads |
| `calendarMode` | `CalendarType` | `Gregorian` | Calendar type (Gregorian or Islamic) |
