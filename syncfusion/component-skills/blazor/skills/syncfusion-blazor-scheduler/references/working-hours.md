# Working Hours

## Table of Contents
- [Configure Working Hours](#configure-working-hours)
- [Set Custom Hours](#set-custom-hours)
- [Style Working Hours](#style-working-hours)
- [Working Hours with Events](#working-hours-with-events)
- [Highlight Working Hours](#highlight-working-hours)
- [Working Hours Configuration](#working-hours-configuration)
- [Format Notes](#format-notes)

## Configure Working Hours

Set scheduler working hours range:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleWorkHours Start="09:00" End="18:00"></ScheduleWorkHours>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>();
    
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

## Set Custom Hours

Define custom work schedule:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleWorkHours Start="08:30" End="17:30"></ScheduleWorkHours>
    <ScheduleTimeScale Interval="30" SlotCount="2"></ScheduleTimeScale>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData { Id = 1, Subject = "Meeting", StartTime = new DateTime(2026, 3, 24, 9, 0, 0), EndTime = new DateTime(2026, 3, 24, 10, 0, 0)}
    };
    
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

## Style Working Hours

Customize working hours appearance:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" CssClass="work-hours-styled" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleWorkHours Start="09:00" End="18:00"></ScheduleWorkHours>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

<style>
    .work-hours-styled .e-work-cells.e-work-hours {
        background-color: #f0f8ff;
    }
    .work-hours-styled .e-work-cells:not(.e-work-hours) {
        background-color: #f5f5f5;
    }
</style>

@code{
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>();
    
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

## Working Hours with Events

Schedule events within working hours:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleWorkHours Start="09:00" End="18:00"></ScheduleWorkHours>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData { Id = 1, Subject = "Team Meeting", StartTime = new DateTime(2026, 3, 24, 10, 0, 0), EndTime = new DateTime(2026, 3, 24, 11, 0, 0)},
        new AppointmentData { Id = 2, Subject = "Project Review", StartTime = new DateTime(2026, 3, 24, 14, 0, 0), EndTime = new DateTime(2026, 3, 24, 15, 0, 0)},
        new AppointmentData { Id = 3, Subject = "After Hours", StartTime = new DateTime(2026, 3, 24, 18, 0, 0), EndTime = new DateTime(2026, 3, 24, 19, 0, 0)}
    };
    
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

## Highlight Working Hours

Enable the Highlight option to highlight the working hours.

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleWorkHours Start="09:00" End="18:00" Highlight="true"></ScheduleWorkHours>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>();
    
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

The `Highlight` option only controls whether the configured working hours are visually highlighted.

## Working Hours Configuration

| Property | Value | Description |
|----------|-------|-------------|
| Start | HH:mm | Work day start (24hr format) |
| End | HH:mm | Work day end (24hr format) |
| Highlight | true/false | Highlight working hours |

## Format Notes

- Start/End use 24-hour format (00:00-23:59)
- Non-working hours show grayed out
- Events can extend outside working hours
- Working hours display differs by view type
- Timezone affects working hours display
