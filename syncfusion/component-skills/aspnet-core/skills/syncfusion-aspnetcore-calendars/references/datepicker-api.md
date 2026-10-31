# DatePicker — API Reference

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [MaskPlaceholder Sub-Properties](#maskplaceholder-sub-properties)
- [CSS Class Reference](#css-class-reference)
- [Tag Helper Attribute Syntax](#tag-helper-attribute-syntax)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowEdit` | `bool` | `true` | When `false`, the user cannot type directly in the input — selection is only via the popup. |
| `calendarMode` | `CalendarType` | `Gregorian` | Calendar type: `Gregorian` or `Islamic`. |
| `cssClass` | `string` | `null` | Root CSS class for custom appearance overrides. |
| `dayHeaderFormat` | `DayHeaderFormats` | `Short` | Format of day names in the calendar header. Values: `Short`, `Narrow`, `Abbreviated`, `Wide`. |
| `depth` | `CalendarView` | `Month` | The deepest view the user can navigate to. Values: `Month`, `Year`, `Decade`. Must be ≤ `start`. |
| `enabled` | `bool` | `true` | When `false`, the DatePicker is disabled (non-interactive). |
| `enableMask` | `bool` | `false` | When `true`, renders a segmented masked input derived from `format`. |
| `enablePersistence` | `bool` | `false` | When `true`, persists the `value` across page reloads. |
| `enableRtl` | `bool` | `false` | When `true`, renders the component right-to-left. |
| `firstDayOfWeek` | `int` | `0` | Sets the first day of the week (0 = Sunday, 1 = Monday, …, 6 = Saturday). |
| `floatLabelType` | `FloatLabelType` | `Never` | Floating label behavior: `Never`, `Auto`, `Always`. |
| `format` | `string` | `null` | Custom date display format string (e.g., `yyyy-MM-dd`, `dd/MM/yyyy`). Overrides culture default. |
| `fullScreenMode` | `bool` | `false` | When `true`, displays the popup in full-screen on mobile/tablet devices. |
| `htmlAttributes` | `object` | `null` | Additional HTML attributes to set on the input element (e.g., `data-*`, `tabindex`). |
| `inputFormats` | `string[]` | `null` | Array of accepted date input formats. Users can type in any of these formats; the value is normalized to `format`. |
| `keyConfigs` | `object` | `null` | Custom keyboard shortcut mappings. |
| `locale` | `string` | `""` | Culture code for localization (e.g., `"de"`, `"ar"`, `"fr"`). Defaults to global culture (`en-US`). |
| `maskPlaceholder` | `DatePickerMaskPlaceholder` | `null` | Placeholder text for each segment in masked input mode. Configured via `<e-datepicker-maskplaceholder>`. |
| `max` | `object` (DateTime) | `null` | Maximum selectable date. Dates after this are disabled. |
| `min` | `object` (DateTime) | `null` | Minimum selectable date. Dates before this are disabled. |
| `openOnFocus` | `bool` | `false` | When `true`, the popup opens when the input receives focus (without clicking the icon). |
| `placeholder` | `string` | `null` | Placeholder text displayed in the input field. |
| `readonly` | `bool` | `false` | When `true`, the DatePicker is read-only (displays value but prevents editing). |
| `serverTimezoneOffset` | `double` | `NaN` | Server UTC timezone offset (in hours) for processing the initial date value. |
| `showClearButton` | `bool` | `true` | When `false`, hides the clear (✕) button. |
| `showTodayButton` | `bool` | `true` | When `false`, hides the "Today" button in the calendar popup. |
| `start` | `CalendarView` | `Month` | Initial view when the popup opens. Values: `Month`, `Year`, `Decade`. |
| `strictMode` | `bool` | `false` | When `true`, clamps out-of-range input to `min`/`max`; retains previous value for invalid input. |
| `value` | `object` (DateTime) | `null` | The currently selected date value. |
| `weekNumber` | `bool` | `false` | When `true`, displays ISO week numbers in the calendar month view. |
| `weekRule` | `WeekRule` | `FirstDay` | Rule for determining the first week of the year. Values: `FirstDay`, `FirstFullWeek`, `FirstFourDayWeek`. |
| `width` | `string` | `null` | Width of the DatePicker component (e.g., `"250px"`, `"100%"`). |
| `zIndex` | `int` | `1000` | z-index of the calendar popup element. |

---

## Events

| Event | Trigger | Description |
|---|---|---|
| `change` | On date selection | Fires when the selected date value changes. `args.value` contains the new date. |
| `open` | On popup open | Fires when the calendar popup opens. |
| `close` | On popup close | Fires when the calendar popup closes. Call `args.preventDefault()` to keep popup open. |
| `focus` | On input focus | Fires when the input element receives focus. |
| `blur` | On input blur | Fires when the input element loses focus. |
| `cleared` | On clear button click | Fires when the value is cleared via the clear button. |
| `renderDayCell` | On each day cell render | Fires for every day cell in the calendar. Use `args.isDisabled = true` to disable a cell; add classes via `args.element.classList`. |
| `navigated` | On calendar navigation | Fires when the user navigates to a different month, year, or decade view. |
| `created` | On component creation | Fires once when the DatePicker is fully initialized. |
| `destroyed` | On component destroy | Fires when the DatePicker instance is destroyed. |

---

## MaskPlaceholder Sub-Properties

Configure via `<e-datepicker-maskplaceholder>` child tag inside `<ejs-datepicker>`:

| Sub-Property | Type | Default | Description |
|---|---|---|---|
| `day` | `string` | `"day"` | Placeholder label for the day segment in masked input. |
| `month` | `string` | `"month"` | Placeholder label for the month segment in masked input. |
| `year` | `string` | `"year"` | Placeholder label for the year segment in masked input. |

**Example:**

```cshtml
<ejs-datepicker id="datepicker" enableMask="true">
    <e-datepicker-maskplaceholder day="DD" month="MM" year="YYYY"></e-datepicker-maskplaceholder>
</ejs-datepicker>
```

---

## CSS Class Reference

| CSS Class | Applied To |
|---|---|
| `e-date-wrapper` | DatePicker wrapper element |
| `e-datepicker` | DatePicker input element |
| `e-float-text` | Floating label |
| `e-date-icon` | Calendar toggle icon |
| `e-popup-wrapper` | Calendar popup wrapper |
| `e-calendar` | Calendar element |
| `e-header` | Calendar header bar |
| `e-title` | Calendar title (current month/year text) |
| `e-icon-container` | Previous/next navigation icon container |
| `e-prev` | Previous navigation icon |
| `e-next` | Next navigation icon |
| `e-weekend` | Weekend day cells |
| `e-other-month` | Days from adjacent months |
| `e-day` | Individual day cell |
| `e-selected` | Currently selected day cell |
| `e-disabled` | Disabled day cells |
| `e-error` | Applied to wrapper when value is invalid or out-of-range (strictMode=false) |

---

## Tag Helper Attribute Syntax

```cshtml
<ejs-datepicker
    id="datepicker"
    value="@Model.Date"
    min="@Model.MinDate"
    max="@Model.MaxDate"
    format="dd/MM/yyyy"
    placeholder="Select a date"
    enabled="true"
    readonly="false"
    showClearButton="true"
    showTodayButton="true"
    strictMode="false"
    enableMask="false"
    enableRtl="false"
    locale="en-US"
    start="Month"
    depth="Month"
    dayHeaderFormat="Short"
    weekNumber="false"
    firstDayOfWeek="0"
    fullScreenMode="false"
    floatLabelType="Never"
    openOnFocus="false"
    cssClass=""
    width="250px"
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
    <e-datepicker-maskplaceholder day="day" month="month" year="year">
    </e-datepicker-maskplaceholder>
</ejs-datepicker>
```
