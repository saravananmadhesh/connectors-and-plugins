# DateRangePicker — API Reference

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Presets Sub-Properties](#presets-sub-properties)
- [Enum Values](#enum-values)
- [CSS Class Reference](#css-class-reference)
- [Tag Helper Attribute Syntax](#tag-helper-attribute-syntax)

---

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowEdit` | `bool` | `true` | When `false`, the input is read-only — selection is via popup only. |
| `cssClass` | `string` | `""` | Root CSS class for scoped appearance overrides. |
| `dayHeaderFormat` | `DayHeaderFormats` | `Short` | Format of day names in calendar column headers. Values: `Short`, `Narrow`, `Abbreviated`, `Wide`. |
| `depth` | `CalendarView` | `Month` | Deepest navigation view. Values: `Month`, `Year`, `Decade`. Must be ≤ `start`. |
| `enabled` | `bool` | `true` | When `false`, disables the component and prevents form submission of its value. |
| `enablePersistence` | `bool` | `false` | When `true`, persists `startDate`, `endDate`, and `value` across page reloads. |
| `enableRtl` | `bool` | `false` | When `true`, renders the component right-to-left. |
| `endDate` | `object` (DateTime) | `null` | Gets or sets the end date of the selected range. |
| `firstDayOfWeek` | `double` | `NaN` | Sets the first day of the week. 0 = Sunday, 1 = Monday, …, 6 = Saturday. |
| `floatLabelType` | `FloatLabelType` | `Never` | Floating label behavior. Values: `Never`, `Auto`, `Always`. |
| `format` | `string` | `null` | Custom display format string (e.g., `"dd/MMM/yy"`, `"yyyy-MM-dd"`). Overrides culture default. |
| `fullScreenMode` | `bool` | `false` | When `true`, displays the popup full-screen on mobile/tablet devices. |
| `htmlAttributes` | `object` | `null` | Additional HTML attributes for the input element (e.g., `data-*`, `tabindex`). |
| `inputFormats` | `string[]` | `null` | Array of accepted date entry formats. User input in any of these is parsed and normalized to `format`. |
| `keyConfigs` | `object` | `null` | Custom keyboard shortcut mappings. |
| `locale` | `string` | `"en-US"` | Culture code for localization (e.g., `"de"`, `"ar"`, `"fr"`). |
| `max` | `object` (DateTime) | `null` | Maximum selectable date. Dates after this are disabled. |
| `maxDays` | `int` | `null` | Maximum number of days allowed in the selected range. |
| `min` | `object` (DateTime) | `null` | Minimum selectable date. Dates before this are disabled. |
| `minDays` | `int` | `null` | Minimum number of days required in the selected range. |
| `openOnFocus` | `bool` | `false` | When `true`, the popup opens when the input receives focus. |
| `placeholder` | `string` | `null` | Placeholder text shown in the input field. |
| `presets` | `List<DateRangePickerPreset>` | `null` | Predefined date range presets shown in the popup for quick selection. |
| `readonly` | `bool` | `false` | When `true`, the component displays its value but prevents editing. |
| `separator` | `string` | `"-"` | String displayed between the start and end date in the input. |
| `serverTimezoneOffset` | `double` | `NaN` | Server UTC timezone offset (hours) for processing the initial date value. |
| `showClearButton` | `bool` | `true` | When `false`, hides the clear (✕) button. |
| `start` | `CalendarView` | `Month` | Initial calendar view when popup opens. Values: `Month`, `Year`, `Decade`. |
| `startDate` | `object` (DateTime) | `null` | Gets or sets the start date of the selected range. |
| `strictMode` | `bool` | `false` | When `true`, out-of-range values are clamped to `min`/`max`; invalid input resets to previous value. |
| `value` | `object` | `null` | Gets or sets the selected start and end date as an array `[startDate, endDate]`. |
| `weekNumber` | `bool` | `false` | When `true`, displays ISO week numbers in the month calendar view. |
| `weekRule` | `WeekRule` | `FirstDay` | Rule for defining the first week of the year. Values: `FirstDay`, `FirstFullWeek`, `FirstFourDayWeek`. |
| `width` | `string` | `""` | Width of the component (e.g., `"300px"`, `"100%"`). |
| `zIndex` | `int` | `1000` | z-index of the calendar popup. |

---

## Events

| Event | Trigger | Description |
|---|---|---|
| `change` | On range selection | Fires when the selected date range changes. `args.startDate` and `args.endDate` contain the new values. |
| `open` | On popup open | Fires when the calendar popup opens. |
| `close` | On popup close | Fires when the calendar popup closes. |
| `select` | On start/end selection | Fires when either the start or end date is selected during range picking. |
| `focus` | On input focus | Fires when the input element receives focus. |
| `blur` | On input blur | Fires when the input element loses focus. |
| `cleared` | On clear button click | Fires when the value is cleared via the clear button. |
| `renderDayCell` | On each day cell render | Fires for every day cell in the calendar. Use `args.isDisabled = true` to disable a cell; modify `args.element` for DOM changes. |
| `navigated` | On calendar navigation | Fires when the user navigates to a different month, year, or decade view. |
| `created` | On component creation | Fires once when the DateRangePicker is fully initialized. |
| `destroyed` | On component destroy | Fires when the DateRangePicker instance is destroyed. |

---

## Presets Sub-Properties

Configure preset date ranges via `<e-daterangepicker-presets>` and `<e-daterangepicker-preset>` child tags:

| Sub-Property | Type | Description |
|---|---|---|
| `label` | `string` | Display text for the preset button shown in the popup panel. |
| `start` | `DateTime` | Start date of the preset range. |
| `end` | `DateTime` | End date of the preset range. |

**Example:**

```cshtml
<ejs-daterangepicker id="daterangepicker" placeholder="Select a Range">
    <e-daterangepicker-presets>
        <e-daterangepicker-preset label="Last 7 Days"
            start="@DateTime.Today.AddDays(-6)"
            end="@DateTime.Today">
        </e-daterangepicker-preset>
        <e-daterangepicker-preset label="Last 30 Days"
            start="@DateTime.Today.AddDays(-29)"
            end="@DateTime.Today">
        </e-daterangepicker-preset>
    </e-daterangepicker-presets>
</ejs-daterangepicker>
```

---

## Enum Values

### CalendarView
| Value | Description |
|---|---|
| `Month` | Month calendar view (default) |
| `Year` | Year calendar view |
| `Decade` | Decade calendar view |

### DayHeaderFormats
| Value | Example | Description |
|---|---|---|
| `Short` | Su | Short 2-character day name (default) |
| `Narrow` | S | Single character |
| `Abbreviated` | Sun | 3-character abbreviation |
| `Wide` | Sunday | Full day name |

### FloatLabelType
| Value | Description |
|---|---|
| `Never` | Label never floats (default) |
| `Auto` | Label floats when focused or value entered |
| `Always` | Label always floats above the input |

### WeekRule
| Value | Description |
|---|---|
| `FirstDay` | Week containing the first day of the year (default) |
| `FirstFullWeek` | First full 7-day week of the year |
| `FirstFourDayWeek` | First week with at least 4 days (ISO 8601) |

---

## CSS Class Reference

| CSS Class | Applied To |
|---|---|
| `e-date-range-wrapper` | DateRangePicker wrapper element |
| `e-range-icon` | Calendar range icon |
| `e-popup` | Popup wrapper |
| `e-calendar` | Both calendar elements |
| `e-right-calendar` | Right calendar |
| `e-left-calendar` | Left calendar |
| `e-range-header` | Range header (start/end label area) |
| `e-start-label` | Start label in popup header |
| `e-end-label` | End label in popup header |
| `e-day-span` | Day span details label |
| `e-footer` | Footer container |
| `e-apply` | Apply button |
| `e-cancel` | Cancel button |
| `e-header` | Calendar header bar |
| `e-title` | Calendar title text |
| `e-icon-container` | Previous/next icon container |
| `e-prev` | Previous navigation icon |
| `e-next` | Next navigation icon |
| `e-weekend` | Weekend date cells |
| `e-other-month` | Other month date cells |
| `e-day` | Individual day cell |
| `e-selected` | Selected date cells |
| `e-disabled` | Disabled date cells |

---

## Tag Helper Attribute Syntax

All properties map directly to lowercase tag helper attributes on `<ejs-daterangepicker>`:

```cshtml
<ejs-daterangepicker
    id="daterangepicker"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate"
    min="@ViewBag.minDate"
    max="@ViewBag.maxDate"
    minDays="5"
    maxDays="10"
    format="dd/MM/yyyy"
    inputFormats="@(new string[] { "MM/dd/yyyy", "yyyyMMdd" })"
    separator=" to "
    placeholder="Select a Range"
    locale="en-US"
    enableRtl="false"
    strictMode="false"
    allowEdit="true"
    readonly="false"
    enabled="true"
    showClearButton="true"
    openOnFocus="false"
    floatLabelType="Never"
    cssClass="my-class"
    fullScreenMode="false"
    weekNumber="false"
    weekRule="FirstDay"
    start="Month"
    depth="Month"
    dayHeaderFormat="Short"
    firstDayOfWeek="0"
    enablePersistence="false"
    width="300px"
    zIndex="1000"
    change="onRangeChange"
    open="onOpen"
    close="onClose"
    select="onSelect"
    renderDayCell="onRenderCell"
    created="onCreated">
</ejs-daterangepicker>
```

For `DateRangePickerFor` model binding:

```cshtml
@model MyModel
<ejs-daterangepicker id="daterangepicker" ejs-for="@Model.DateRange">
</ejs-daterangepicker>
```
