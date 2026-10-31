# Scheduler Views

This guide covers all available Scheduler view modes, their configurations, and how to customize each view.

## Table of Contents
- [Overview](#overview)
- [Day View](#day-view)
- [Week View](#week-view)
- [Work Week View](#work-week-view)
- [Month View](#month-view)
- [Year View](#year-view)
- [Agenda View](#agenda-view)
- [Month Agenda View](#month-agenda-view)
- [Setting Active View](#setting-active-view)
- [Extending View Intervals](#extending-view-intervals)
- [View-Specific Configuration](#view-specific-configuration)
- [Common View Properties](#common-view-properties)
- [Max Event Stack](#max-event-stack)

## Overview

Scheduler provides 12 built-in views with unique configuration options:

**Calendar Views:** Day, Week, Work Week, Month, Year, Agenda, Month Agenda

**Timeline Views:** Timeline Day, Timeline Week, Timeline Work Week, Timeline Month, Timeline Year

**Default View:** Week view is set as active by default.

### Available View Navigation

The header bar provides:
- **View Switcher:** Buttons to toggle between views
- **Date Range Display:** Shows current view's date range (click to open date picker)
- **Navigation Arrows:** Navigate to previous/next date ranges

## Day View

Displays a single day with time slots and appointments in vertical layout.

### Basic Day View

```cshtml
@using Syncfusion.EJ2.Schedule
@model List<ScheduleView>

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Views(Model)
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Multi-Day View (Extended Interval)

Display multiple consecutive days:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Views(view => {
        view.Option(View.Day).DisplayName("3 Days").Interval(3).Add();
        view.Option(View.Week).DisplayName("2 Weeks").Interval(2).IsSelected(true).Add();
        view.Option(View.Month).DisplayName("4 Months").Interval(4).Add();
    })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

**Properties:**
- `Interval`: Number of days to display (e.g., 2, 3, 4 days)
- `DisplayName`: Custom name shown in view switcher

### Setting Work Hours

Define visible time range for Day view:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day)
            .StartHour("08:00")
            .EndHour("18:00")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Effect:** Only shows 8 AM to 6 PM time slots. Users can still create appointments outside this range.

## Week View

Displays 7 days (Sunday to Saturday) with appointments in columnar layout.

### Basic Week View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Week)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Changing First Day of Week

Start week on Monday instead of Sunday:

```cshtml
@Html.EJS().Schedule("scheduler")
    .FirstDayOfWeek(1)  // Monday (0=Sunday, 1=Monday, etc.)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Multi-Week View

Display multiple weeks:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Week).Interval(2).DisplayName("2 Weeks").Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Customizing Week View Only

Apply settings to Week view specifically:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Week)
            .ShowWeekend(false)  // Hide Saturday & Sunday
            .DateFormat("dd-MMM-yyyy")
            .StartHour("09:00")
            .EndHour("17:00")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Work Week View

Displays only working days (Monday to Friday by default).

### Basic Work Week View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.WorkWeek)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Custom Working Days

Define custom working days (e.g., Tuesday to Saturday):

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.WorkWeek)
            .WorkDays(new int[] { 2, 3, 4, 5, 6 })  // Tue-Sat
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Day Values:** 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday

### Work Week with Custom Hours

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.WorkWeek)
            .WorkDays(new int[] { 1, 2, 3, 4, 5 })
            .StartHour("08:30")
            .EndHour("17:30")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Month View

Displays all days of a month in grid layout.

### Basic Month View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Month)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Behavior:**
- Shows "+ N more" indicator when cell has multiple appointments
- Click date to navigate to Day view
- Click "+ more" to view all appointments in popup

### Multi-Month View

Display 2 or 3 months:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Month).Interval(3).DisplayName("Quarter").Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Hiding Weekend in Month View

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Month).ShowWeekend(false).Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Showing Week Numbers

Display week numbers in Month view:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Month).ShowWeekNumber(true).Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Year View

Displays 12 months of a year in calendar grid format.

### Basic Year View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Year)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Features:**
- Shows mini calendars for all 12 months
- Dates with appointments have dot indicators
- Click date to open event popup
- Click month header to navigate to Month view

### Vertical Year View

Stack months vertically:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Year).Orientation(Syncfusion.EJ2.Schedule.Orientation.Vertical).Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Orientations:**
- `Horizontal`: Default, displays months in rows (4 columns)
- `Vertical`: Displays months in single column

### Year View with Custom Configuration

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Year)
            .Orientation(Syncfusion.EJ2.Schedule.Orientation.Horizontal)
            .ShowWeekNumber(true)
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Agenda View

Lists appointments in grid format for specified number of days.

### Basic Agenda View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Agenda)
    .AgendaDaysCount(7)  // Show next 7 days (default)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Default Behavior:**
- Shows appointments for next 7 days from current date
- Displays in list format (date, time, title)
- Virtual scrolling loads more dates on scroll

### Extending Agenda Days

Show appointments for next 14 days:

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Agenda)
    .AgendaDaysCount(14)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Hiding Empty Agenda Days

Hide days with no appointments:

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Agenda)
    .HideEmptyAgendaDays(true)  // Only show days with events
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Enabling Virtual Scrolling

Enable infinite scroll for Agenda view:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Agenda).AllowVirtualScrolling(true).Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Note:** Height must be set in pixels for Agenda view.

```cshtml
@Html.EJS().Schedule("scheduler")
    .Height("550px")  // Required for Agenda
    .CurrentView(Syncfusion.EJ2.Schedule.View.Agenda)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Month Agenda View

Displays month calendar with appointment list below selected date.

### Basic Month Agenda View

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.MonthAgenda)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Behavior:**
- Shows month calendar at top
- Dates with appointments have dot indicators
- Click date to view appointments below calendar

### Month Agenda with Custom Working Days

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.MonthAgenda)
            .WorkDays(new int[] { 1, 3, 5 })  // Mon, Wed, Fri
            .ShowWeekend(false)
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Setting Active View

Control which view displays on initial load.

### Using CurrentView Property

```cshtml
@Html.EJS().Schedule("scheduler")
    .CurrentView(Syncfusion.EJ2.Schedule.View.Month)  // Start with Month view
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Using IsSelected in Views

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day).Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Week).Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Month).IsSelected(true).Add();  // Active view
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Extending View Intervals

Display multiple days, weeks, or months in single view.

### Extended Day View (3 Days)

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day)
            .Interval(3)
            .DisplayName("3 Days")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Extended Week View (2 Weeks)

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Week)
            .Interval(2)
            .DisplayName("Bi-Weekly")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Extended Month View (Quarter)

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Month)
            .Interval(3)
            .DisplayName("Quarter View")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Note:** Interval extension not supported for Agenda and Month Agenda views.

## View-Specific Configuration

Apply different settings to each view.

### Multiple Views with Different Configurations

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        // Day view: 8 AM - 6 PM
        view.Option(Syncfusion.EJ2.Schedule.View.Day)
            .StartHour("08:00")
            .EndHour("18:00")
            .Add();
        
        // Week view: Hide weekends, custom date format
        view.Option(Syncfusion.EJ2.Schedule.View.Week)
            .ShowWeekend(false)
            .DateFormat("dd-MM-yyyy")
            .Add();
        
        // Month view: Read-only, show week numbers
        view.Option(Syncfusion.EJ2.Schedule.View.Month)
            .ShowWeekNumber(true)
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Work Week with Custom Configuration

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.WorkWeek)
            .WorkDays(new int[] { 1, 2, 3, 4, 5, 6 })  // Mon-Sat
            .StartHour("09:00")
            .EndHour("17:00")
            .ShowWeekend(false)
            .DisplayName("Office Hours")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Common View Properties

Properties applicable across multiple views.

### Property Reference Table

| Property | Type | Description | Applicable Views |
|----------|------|-------------|------------------|
| `Option` | View | Specifies view type (Day, Week, Month, etc.) | All views |
| `IsSelected` | bool | Sets active view on load | All views |
| `DateFormat` | string | Custom date format (e.g., "dd-MMM-yyyy") | All views |
| `ShowWeekend` | bool | Show/hide weekend days | All views |
| `WorkDays` | int[] | Define working days (0-6) | All except Agenda |
| `StartHour` | string | Start time (e.g., "08:00") | Day, Week, WorkWeek, Timeline variants |
| `EndHour` | string | End time (e.g., "18:00") | Day, Week, WorkWeek, Timeline variants |
| `Interval` | int | Number of days/weeks/months to show | All except Agenda, MonthAgenda |
| `DisplayName` | string | Custom view name in switcher | All except Agenda, MonthAgenda |
| `ShowWeekNumber` | bool | Display week numbers | Day, Week, WorkWeek, Month |
| `AllowVirtualScrolling` | bool | Enable infinite scroll | Agenda, Timeline variants |
| `MaxEventStack` | int | Maximum number of appointments to render per cell; remaining events show as "+N more" (0 = unlimited) | Day, Week, WorkWeek, Month |

### Example: Configuring All Common Properties

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Week)
            .IsSelected(true)               // Set as default view
            .DateFormat("dd MMM yyyy")      // Custom date format
            .ShowWeekend(true)              // Show Sat/Sun
            .WorkDays(new int[] { 1, 2, 3, 4, 5 })  // Mon-Fri working
            .StartHour("08:00")             // Start at 8 AM
            .EndHour("18:00")               // End at 6 PM
            .ShowWeekNumber(true)           // Display week numbers
            .DisplayName("Work Week")       // Custom name
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Limiting Available Views

Show only specific views in Scheduler.

### Displaying Subset of Views

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day).Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Week).Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Month).Add();
        // Only Day, Week, Month views available
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Read-Only Views

Make specific views read-only while allowing edits in others.

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day).Add();  // Editable
        view.Option(Syncfusion.EJ2.Schedule.View.Week).Add();  // Editable
        view.Option(Syncfusion.EJ2.Schedule.View.Month).Add();  // Read-only
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Max Event Stack

Limit the number of appointments rendered inside a single cell. When more events exist on a date, the cell shows a `+N more` indicator that, when clicked, opens a popup listing the remaining appointments.

### Configuring MaxEventStack on Each View

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@{
    List<ScheduleView> viewOptions = new List<ScheduleView>();
    viewOptions.Add(new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Day, MaxEventStack = 1 });
    viewOptions.Add(new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Week, MaxEventStack = 1 });
    viewOptions.Add(new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.WorkWeek, MaxEventStack = 1 });
}

@Html.EJS().Schedule("Schedule")
    .Width("100%")
    .Height("650px")
    .SelectedDate(new DateTime(2026, 5, 29))
    .CurrentView(View.Week)
    .Navigating("onNavigating")
    .Views(viewOptions)
    .EventSettings(new ScheduleEventSettings { DataSource = ViewData["datasource"] })
    .Render()
```

>**Note:** The `MaxEventStack` property is applicable only with **Day**, **Week**, and **WorkWeek** views when the `timeScale` option is enabled.

## Best Practices

### Performance
- Use `Interval` wisely (avoid displaying too many days/weeks)
- Enable `AllowVirtualScrolling` for Agenda with large datasets
- Set appropriate `AgendaDaysCount` (default 7 is optimal)
- Use `HideEmptyAgendaDays` to reduce rendering load

### User Experience
- Provide 3-5 view options (avoid overwhelming users)
- Set logical `StartHour`/`EndHour` based on use case
- Use descriptive `DisplayName` for extended views
- Show week numbers for week-oriented workflows
- Hide weekends if not relevant to business

### Configuration
- Apply view-specific settings via `Views` property (not global)
- Use `IsSelected` to set default view matching user preference
- Customize `WorkDays` to match organization schedule

## Common Scenarios

### Business Hours Scheduling

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day)
            .StartHour("09:00")
            .EndHour("17:00")
            .Add();
        view.Option(Syncfusion.EJ2.Schedule.View.WorkWeek)
            .WorkDays(new int[] { 1, 2, 3, 4, 5 })
            .StartHour("09:00")
            .EndHour("17:00")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Project Timeline (Extended Views)

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Week).Interval(2).DisplayName("Sprint").Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Month).Interval(3).DisplayName("Quarter").Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Healthcare Scheduling (24/7)

```cshtml
@Html.EJS().Schedule("scheduler")
    .Views(view =>
    {
        view.Option(Syncfusion.EJ2.Schedule.View.Day)
            .StartHour("00:00")
            .EndHour("23:59")
            .Add();
        view.Option(Syncfusion.EJ2.Schedule.View.Week)
            .WorkDays(new int[] { 0, 1, 2, 3, 4, 5, 6 })  // All days
            .StartHour("00:00")
            .EndHour("23:59")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Next Steps

- **Timeline views** → See [timeline-views.md](timeline-views.md)
- **Customizing cells** → See [cell-customization.md](cell-customization.md)
- **View templates** → See [appointment-customization.md](appointment-customization.md)
- **Resources in views** → See [resources.md](resources.md)
