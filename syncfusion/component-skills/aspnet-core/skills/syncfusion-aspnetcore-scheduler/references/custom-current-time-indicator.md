# Custom Current Time Indicator in ASP.NET Core Scheduler

## Table of Contents
- [Overview](#overview)
- [Enabling the Current Time Indicator](#enabling-the-current-time-indicator)
- [CurrentTimeIndicatorSettings Options](#currenttimeindicatorsettings-options)
- [Supported Views](#supported-views)
- [Updating Settings at Runtime](#updating-settings-at-runtime)
- [Limitations and Validation Guidance](#limitations-and-validation-guidance)
- [Best Practices](#best-practices)
- [AI Generation Guidance](#ai-generation-guidance)

---

## Overview

The **Current Time Indicator** draws a horizontal line across the Scheduler that marks the current time of day. The
indicator is helpful in time-grid and timeline views where users need a quick visual reference of "now" relative
to the surrounding appointments.

In the ASP.NET Core Scheduler, the indicator is controlled by two pieces:

- The boolean `showTimeIndicator` property on `ejs-schedule`, which turns the indicator on or off.
- The `currentTimeIndicatorSettings` client-side object, which customizes the indicator's appearance and behavior
  (time label, previous dates, and z-order).

Because `currentTimeIndicatorSettings` is a nested client-side object, the typical ASP.NET Core pattern is to set
defaults through a `dataBound` (or `created`) callback from JavaScript rather than through a Razor attribute.

## Enabling the Current Time Indicator

Set `showTimeIndicator="true"` on the Scheduler tag helper:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550px"
              selectedDate="new DateTime(2026, 2, 10)"
              currentView="TimelineWeek"
              showTimeIndicator="true">

    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineWorkWeek"></e-schedule-view>
    </e-schedule-views>

    <e-schedule-eventsettings dataSource="@indicatorData">
    </e-schedule-eventsettings>

</ejs-schedule>
```

When `showTimeIndicator` is `false` (the default) the indicator is hidden entirely. `currentTimeIndicatorSettings`
is ignored while the indicator is hidden.

## CurrentTimeIndicatorSettings Options

`currentTimeIndicatorSettings` is configured on the Scheduler's client-side instance. Set it once on `created` /
`dataBound`, or update it at runtime from a UI control (such as a checkbox) and call `dataBind()` to apply.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showTime` | boolean | `true` | Shows the current-time label next to the indicator line. |
| `showPreviousDates` | boolean | `true` | Draws the indicator on previous days (relative to `selectedDate`) so a Timeline week or Timeline month still shows "now" on every day. |
| `onTop` | boolean | `true` | Renders the indicator above the events. When `false`, the indicator is drawn under the events and may be partially occluded. |

### Razor Configuration Pattern

`currentTimeIndicatorSettings` is a client-side object, so the recommended ASP.NET Core pattern is to set it from
JavaScript once the Scheduler instance is ready:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550px"
              selectedDate="@currentDate"
              currentView="TimelineWeek"
              showTimeIndicator="true">

    <e-schedule-eventsettings dataSource="@indicatorData">
    </e-schedule-eventsettings>

</ejs-schedule>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];

        scheduleObj.currentTimeIndicatorSettings = {
            showTime: true,
            showPreviousDates: true,
            onTop: true
        };

        scheduleObj.dataBind();
    });
</script>
```

> The settings object is applied at the client side. After changing it, call `dataBind()` to re-render the
> indicator.

## Supported Views

The Current Time Indicator is rendered on the time-grid and timeline views that have a visible time axis:

| View | Indicator Support |
|------|-------------------|
| Day | Yes |
| Week | Yes |
| WorkWeek | Yes |
| TimelineDay | Yes |
| TimelineWeek | Yes (one indicator per day when `showPreviousDates` is `true`) |
| TimelineWorkWeek | Yes |
| Month | Not rendered (no time axis) |
| TimelineMonth | Not rendered |
| Year / Agenda | Not rendered |

## Updating Settings at Runtime

The typical ASP.NET Core pattern is to wire the options to a panel of checkboxes and reapply the settings object on
change:

```cshtml
@{
    var currentDate = DateTime.Today;

    var indicatorData = new List<object>
    {
        new {
            Id = 1,
            Subject = "Travel Preparation",
            StartTime = currentDate.AddHours(8).AddMinutes(30),
            EndTime = currentDate.AddHours(9).AddMinutes(30)
        },
        new {
            Id = 2,
            Subject = "Customer Meeting",
            StartTime = currentDate.AddHours(10),
            EndTime = currentDate.AddHours(12).AddMinutes(30)
        },
        new {
            Id = 3,
            Subject = "Lab Review",
            StartTime = currentDate.AddHours(14),
            EndTime = currentDate.AddHours(15)
        }
    };
}

<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;align-items:center;">
    <label>
        <input type="checkbox" id="showTimeIndicator" checked />
        showTimeIndicator
    </label>

    <label>
        <input type="checkbox" id="showTime" checked />
        showTime
    </label>

    <label>
        <input type="checkbox" id="showPreviousDates" checked />
        showPreviousDates
    </label>

    <label>
        <input type="checkbox" id="onTop" checked />
        onTop
    </label>
</div>

<ejs-schedule id="schedule"
              width="100%"
              height="550px"
              selectedDate="@currentDate"
              currentView="TimelineWeek"
              showTimeIndicator="true">

    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineWorkWeek"></e-schedule-view>
    </e-schedule-views>

    <e-schedule-eventsettings dataSource="@indicatorData">
    </e-schedule-eventsettings>

</ejs-schedule>

<script>
    document.addEventListener('DOMContentLoaded', function () {

        var schedule = document.getElementById('schedule').ej2_instances[0];

        function updateSettings() {

            schedule.showTimeIndicator =
                document.getElementById('showTimeIndicator').checked;

            schedule.currentTimeIndicatorSettings = {
                showTime:
                    document.getElementById('showTime').checked,

                showPreviousDates:
                    document.getElementById('showPreviousDates').checked,

                onTop:
                    document.getElementById('onTop').checked
            };

            schedule.dataBind();
        }

        document.getElementById('showTimeIndicator')
            .addEventListener('change', updateSettings);

        document.getElementById('showTime')
            .addEventListener('change', updateSettings);

        document.getElementById('showPreviousDates')
            .addEventListener('change', updateSettings);

        document.getElementById('onTop')
            .addEventListener('change', updateSettings);
    });
</script>
```

Key behaviors:

- `showTimeIndicator` is a top-level property, so it can be toggled on the instance directly and re-applied with
  `dataBind()`.
- `currentTimeIndicatorSettings` is a plain object, so replacing it as a whole is the supported update pattern.
  After each change, call `dataBind()` to redraw the indicator.

## Limitations and Validation Guidance

- **Time-axis views only.** The indicator is not drawn on Month, TimelineMonth, Year, or Agenda views. Do not rely
  on it for those views.
- **Client-side configuration only.** `currentTimeIndicatorSettings` is a client-side object; it cannot be set
  declaratively through the Tag Helper. Configure it in JavaScript.
- **`showTimeIndicator` must be `true`.** If `showTimeIndicator` is `false`, the indicator is hidden and
  `currentTimeIndicatorSettings` is ignored.
- **`onTop` does not escape overflow.** Setting `onTop="false"` lets overlapping events cover the indicator line.
  Use `true` if the indicator must always be visible.
- **`showPreviousDates` only affects multi-day views.** On a Day view, there is no "previous day" to draw the
  indicator on, so the option is a no-op there.
- **Time-zone sensitive.** The indicator uses the browser's local clock. If the Scheduler is configured with
  `timezone` data binding, expect the indicator to follow the browser, not the appointment time zone.

## Best Practices

1. **Initialize settings once on `DOMContentLoaded`.** Apply `currentTimeIndicatorSettings` after the Scheduler
   instance is available, then call `dataBind()` to redraw.
2. **Pair `showTimeIndicator` with `showTime`.** Disabling the label still draws the line, which is the cheapest
   visual reference for "now".
3. **Keep `onTop` enabled in dense views.** TimelineWeek and TimelineDay with many events can completely occlude
   the indicator if `onTop` is `false`.
4. **Use `showPreviousDates="true"` for timeline multi-day views.** It draws the indicator on each visible day so
   the user can compare "now" to past slots.
5. **Do not query the indicator DOM from production code.** Its CSS class is an internal implementation detail;
   toggle settings through the API instead.
6. **Validate at the server only when persistence is involved.** The Current Time Indicator is purely a client-side
   visual; it is not stored on the appointment and does not require server-side validation.

## AI Generation Guidance

When generating ASP.NET Core Scheduler samples that use the Custom Current Time Indicator:

- **Required configuration.** Set `showTimeIndicator="true"` on `ejs-schedule`. Configure
  `currentTimeIndicatorSettings` from JavaScript after the instance is available, then call `dataBind()`.
- **Settings object.** Use only the documented options: `showTime`, `showPreviousDates`, and `onTop`. Do not invent
  options such as `color`, `width`, or `interval` — these are not part of `currentTimeIndicatorSettings`.
- **Supported views.** Use `Day`, `Week`, `WorkWeek`, `TimelineDay`, `TimelineWeek`, or `TimelineWorkWeek`. Do not
  add Month, TimelineMonth, Year, or Agenda views to a sample whose headline feature is the time indicator.
- **Tag Helper usage.** Bind data with `dataSource="@localVariable"` for inline data, or
  `dataSource="ViewBag.datasource"` for controller-supplied data. Do not introduce a PageModel or Controller
  unless the surrounding sample already does.
- **No inline event templates.** The indicator does not use a template. Do not add a `template` or
  `eventTemplate` to the indicator configuration.
- **Runtime toggles.** When wiring checkboxes, set `showTimeIndicator` directly on the instance and replace the
  `currentTimeIndicatorSettings` object as a whole, then call `dataBind()`.
- **Do not combine with `readonly`.** The indicator has no dependency on read-only mode, but combining the two in
  a single sample obscures the indicator's actual behavior. Keep them in separate samples.
- **Anti-hallucination.** Do not claim settings such as `interval`, `color`, `lineWidth`, `format`, or
  `customTemplate` on `currentTimeIndicatorSettings`. Only the three documented options are supported.
