# Custom Current Time Indicator

## Table of Contents
1. [Overview](#overview)
2. [Enabling the Current Time Indicator](#enabling-the-current-time-indicator)
3. [Customizing the Indicator](#customizing-the-indicator)
4. [Supported Views](#supported-views)
5. [Complete Example](#complete-example)
6. [Limitations and Best Practices](#limitations-and-best-practices)

## Overview

The **Current Time Indicator** visually highlights the current time in the Scheduler. You can customize its appearance and behavior using the `ShowTimeIndicator` property and the `CurrentTimeIndicatorSettings` object.

Use this feature to help users quickly identify the present time in day, week, work week, and timeline views.

## Enabling the Current Time Indicator

The indicator is enabled by default in supported views. To explicitly enable or disable it:

```cshtml
@Html.EJS().Schedule("schedule")
    .ShowTimeIndicator(true) // Show the indicator
    .Render()
```

| Property             | Type  | Description                                 | Default |
|----------------------|-------|---------------------------------------------|---------|
| ShowTimeIndicator    | bool  | Show or hide the current time indicator     | true    |

## Customizing the Indicator

Use the `CurrentTimeIndicatorSettings` property to control indicator display options:

```cshtml
@Html.EJS().Schedule("schedule")
    .ShowTimeIndicator(true)
    .CurrentTimeIndicatorSettings(settings =>
    {
        settings.ShowTime(true);           // Show the time label on the indicator
        settings.ShowPreviousDates(true);   // Show indicator on previous dates (multi-day views)
        settings.OnTop(true);               // Render indicator above events
    })
    .Render()
```

| Setting              | Type  | Description                                                      | Default |
|----------------------|-------|------------------------------------------------------------------|---------|
| ShowTime             | bool  | Show the time label on the indicator                             | true    |
| ShowPreviousDates    | bool  | Show indicator on previous dates in multi-day/timeline views     | true    |
| OnTop                | bool  | Render indicator above events (true) or below (false)            | false   |

### Property Details
- **ShowTime**: If `true`, displays the current time as a label on the indicator line.
- **ShowPreviousDates**: If `true`, the indicator appears on previous dates in multi-day/timeline views.
- **OnTop**: If `true`, the indicator is rendered above events; if `false`, it appears below events.

## Supported Views

The current time indicator is supported in:
- Day
- Week
- WorkWeek
- TimelineDay
- TimelineWeek
- TimelineWorkWeek

It is **not** shown in Month, Year, Agenda, or MonthAgenda views.

## Complete Example

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .SelectedDate(DateTime.Today)
    .CurrentView(View.TimelineWeek)
    .ShowTimeIndicator(true)
    .CurrentTimeIndicatorSettings(settings =>
    {
        settings.ShowTime(true);
        settings.ShowPreviousDates(true);
        settings.OnTop(true);
    })
    .Views(view =>
    {
        view.Option(View.Day).Add();
        view.Option(View.Week).Add();
        view.Option(View.WorkWeek).Add();
        view.Option(View.TimelineDay).Add();
        view.Option(View.TimelineWeek).Add();
        view.Option(View.TimelineWorkWeek).Add();
    })
    .EventSettings(new ScheduleEventSettings
    {
        DataSource = ViewBag.datasource
    })
    .Render())
```

## Limitations and Best Practices

- The indicator is only visible in supported views (see above).
- The indicator updates automatically as time progresses.
- Use `ShowTimeIndicator(false)` to hide the indicator if not needed.
- Use `CurrentTimeIndicatorSettings` for fine-grained control; omit for default behavior.
- Setting `OnTop(true)` ensures the indicator is always visible above events.
- Avoid using in Month, Year, Agenda, or MonthAgenda views—indicator will not appear.
- No controller or model changes are required unless you need to provide a data source.

## When to Use
- To visually highlight the current time for users in time-based views.
- To improve usability in scheduling, booking, or resource management scenarios.

## When Not to Use
- When using Month, Year, Agenda, or MonthAgenda views exclusively.
- When the current time is not relevant to your scheduling scenario.
