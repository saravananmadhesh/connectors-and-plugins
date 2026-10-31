# DateTimePicker – API Reference

> Source: https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Calendars.DateTimePicker.html

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [MaskPlaceholder Sub-Properties](#maskplaceholder-sub-properties)
- [CSS Class Reference](#css-class-reference)
- [Enum Values](#enum-values)
- [Tag Helper Syntax Summary](#tag-helper-syntax-summary)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowEdit` | `bool` | `true` | Allow direct typing in the input field |
| `calendarMode` | `CalendarType` | `Gregorian` | Calendar type: `Gregorian` or `Islamic` |
| `cssClass` | `string` | `null` | Root CSS class for appearance customization |
| `dayHeaderFormat` | `DayHeaderFormats` | `Short` | Format for day names in calendar header: `Short`, `Narrow`, `Abbreviated`, `Wide` |
| `depth` | `CalendarView` | `Month` | Minimum calendar view level: `Month`, `Year`, `Decade` |
| `enabled` | `bool` | `true` | Enable or disable the component |
| `enableMask` | `bool` | `false` | Enable masked date-time input |
| `enablePersistence` | `bool` | `false` | Persist selected value across page reloads (localStorage) |
| `enableRtl` | `bool` | `false` | Enable right-to-left layout |
| `firstDayOfWeek` | `int` | `0` | First day of week (0=Sunday, 1=Monday, ..., 6=Saturday); 0 uses culture default |
| `floatLabelType` | `FloatLabelType` | `Never` | Floating label behavior: `Never`, `Always`, `Auto` |
| `format` | `string` | `null` | Custom display format for date and time |
| `fullScreenMode` | `bool` | `false` | Full-screen popup on mobile/tablet devices |
| `htmlAttributes` | `object` | `null` | Additional HTML attributes (e.g., `disabled`, `data-*`) |
| `inputFormats` | `string[]` | `null` | Array of accepted input formats for user typing |
| `keyConfigs` | `object` | `null` | Custom key action mappings |
| `locale` | `string` | `""` | Culture code for globalization (e.g., `"de"`, `"ar"`) |
| `maskPlaceholder` | `DateTimePickerMaskPlaceholder` | `null` | Placeholder text per segment in masked input |
| `max` | `object` | `null` | Maximum selectable date-time |
| `maxTime` | `object` | `null` | Maximum selectable time per day in time popup |
| `min` | `object` | `null` | Minimum selectable date-time |
| `minTime` | `object` | `null` | Minimum selectable time per day in time popup |
| `openOnFocus` | `bool` | `false` | Open popup when input receives focus |
| `placeholder` | `string` | `null` | Hint text displayed in the input |
| `readonly` | `bool` | `false` | Render component in read-only state |
| `scrollTo` | `object` | `null` | Scroll position in time popup when no value is selected |
| `serverTimezoneOffset` | `double` | `Double.NaN` | Server time zone offset for initial value processing |
| `showClearButton` | `bool` | `true` | Show/hide the clear icon in the input |
| `showTodayButton` | `bool` | `true` | Show/hide the Today button in the calendar popup |
| `start` | `CalendarView` | `Month` | Initial calendar view: `Month`, `Year`, `Decade` |
| `step` | `double` | `30` | Time interval in minutes between items in the time popup |
| `strictMode` | `bool` | `false` | Restrict input to valid values within min/max range |
| `timeFormat` | `string` | `null` | Format for time items in the time popup list |
| `value` | `object` | `null` | Selected date-time value |
| `weekNumber` | `bool` | `false` | Show ISO week number in the calendar |
| `weekRule` | `WeekRule` | `FirstDay` | Rule for determining the first week of the year |
| `width` | `string` | `null` | Width of the component |
| `zIndex` | `int` | `1000` | z-index of the popup element |

---

## Events

| Event | Description |
|---|---|
| `blur` | Triggers when input loses focus |
| `change` | Triggers when the selected date-time value changes |
| `cleared` | Triggers when value is cleared using the clear button |
| `close` | Triggers when the popup closes |
| `created` | Triggers when the DateTimePicker is created |
| `destroyed` | Triggers when the DateTimePicker is destroyed |
| `focus` | Triggers when input receives focus |
| `navigated` | Triggers when the calendar navigates to another view level |
| `open` | Triggers when the popup opens |
| `renderDayCell` | Triggers when each day cell in the calendar is rendered |

---

## MaskPlaceholder Sub-Properties

Used when `enableMask="true"` to customize placeholder text for each date/time segment:

| Sub-Property | Type | Default | Description |
|---|---|---|---|
| `day` | `string` | `"day"` | Placeholder for the day segment |
| `month` | `string` | `"month"` | Placeholder for the month segment |
| `year` | `string` | `"year"` | Placeholder for the year segment |
| `hour` | `string` | `"hour"` | Placeholder for the hour segment |
| `minute` | `string` | `"minute"` | Placeholder for the minute segment |
| `second` | `string` | `"second"` | Placeholder for the second segment |

**Tag helper syntax:**
```cshtml
<ejs-datetimepicker id="datetimepicker" enableMask="true">
    <e-datetimepicker-maskplaceholder
        day="D" month="M" year="Y"
        hour="H" minute="Min" second="S">
    </e-datetimepicker-maskplaceholder>
</ejs-datetimepicker>
```

---

## CSS Class Reference

| CSS Class | Target Element |
|---|---|
| `.e-datetime-wrapper` | Root wrapper element |
| `.e-input-group` | Input group container |
| `.e-input-group input.e-input` | Input field |
| `.e-input-group-icon.e-date-icon` | Calendar icon button |
| `.e-input-group-icon.e-time-icon` | Clock icon button |
| `.e-datetimepicker.e-popup` | Time popup container |
| `.e-list-item` | Time popup list items |
| `.e-list-item.e-active` | Selected/active time item |
| `.e-list-item:hover` | Hovered time item |
| `.e-error` | Applied to input when value is out-of-range or invalid |

---

## Enum Values

### CalendarView
| Value | Description |
|---|---|
| `Month` | Month view (default) |
| `Year` | Year view |
| `Decade` | Decade view |

### DayHeaderFormats
| Value | Example |
|---|---|
| `Short` | `Su`, `Mo` |
| `Narrow` | `S`, `M` |
| `Abbreviated` | `Sun`, `Mon` |
| `Wide` | `Sunday`, `Monday` |

### CalendarType
| Value | Description |
|---|---|
| `Gregorian` | Standard Gregorian calendar (default) |
| `Islamic` | Islamic (Hijri) calendar |

### FloatLabelType
| Value | Description |
|---|---|
| `Never` | Label never floats (default) |
| `Always` | Label always floats above input |
| `Auto` | Label floats on focus or value entry |

### WeekRule
| Value | Description |
|---|---|
| `FirstDay` | First week contains the first day of the year (default) |
| `FirstFourDayWeek` | First week has at least four days |
| `FirstFullWeek` | First week is a complete week |

---

## Tag Helper Syntax Summary

```cshtml
<ejs-datetimepicker id="datetimepicker"
    value="@Model.Value"
    min="@Model.Min"
    max="@Model.Max"
    minTime="@Model.MinTime"
    maxTime="@Model.MaxTime"
    format="MM/dd/yyyy hh:mm a"
    timeFormat="hh:mm a"
    inputFormats="@Model.InputFormats"
    placeholder="Select a date and time"
    floatLabelType="Auto"
    strictMode="false"
    enableMask="false"
    locale="en-US"
    enableRtl="false"
    step="30"
    start="Month"
    depth="Month"
    dayHeaderFormat="Short"
    weekNumber="false"
    showClearButton="true"
    showTodayButton="true"
    allowEdit="true"
    openOnFocus="false"
    readonly="false"
    enabled="true"
    fullScreenMode="false"
    enablePersistence="false"
    cssClass=""
    width="300px"
    zIndex="1000"
    change="onChange"
    open="onOpen"
    close="onClose"
    focus="onFocus"
    blur="onBlur"
    cleared="onCleared"
    renderDayCell="onRenderDayCell"
    navigated="onNavigated"
    created="onCreated"
    destroyed="onDestroyed">
    <e-datetimepicker-maskplaceholder
        day="day" month="month" year="year"
        hour="hour" minute="minute" second="second">
    </e-datetimepicker-maskplaceholder>
</ejs-datetimepicker>
```
