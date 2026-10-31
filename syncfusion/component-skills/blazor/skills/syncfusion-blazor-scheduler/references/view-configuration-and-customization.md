# View Configuration and Customization

## Table of Contents
- [View-Specific Configuration](#view-specific-configuration)
- [Limit Concurrent Events](#limit-concurrent-events)
- [View Templates](#view-templates)
- [Start and End Hours](#start-and-end-hours)
- [Hide Weekends](#hide-weekends)
- [Extending View Intervals](#extending-view-intervals)
- [Display Name for Custom Views](#display-name-for-custom-views)
- [Week Numbers in Views](#week-numbers-in-views)
- [Readonly Views](#readonly-views)

## View-Specific Configuration

Configure different properties for different views:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <!-- Day view: show all-day row -->
        <ScheduleView Option="View.Day" StartHour="08:00" EndHour="18:00"></ScheduleView>
        
        <!-- Week view: hide weekends, show week numbers -->
        <ScheduleView Option="View.Week" ShowWeekend="false" ShowWeekNumber="true"></ScheduleView>
        
        <!-- Month view: limit events, make readonly -->
        <ScheduleView Option="View.Month" MaxEventsPerRow="2" Readonly="true"></ScheduleView>
        
        <!-- Agenda view: custom day count -->
        <ScheduleView Option="View.Agenda" AllowVirtualScrolling="true"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Limit Concurrent Events

Use `MaxEventStack` to limit how many overlapping appointment labels are displayed in the vertical Day, Week, and WorkWeek views. A value of `0` displays all concurrent events; a positive value displays only that number of labels. The property applies when the view's time scale is enabled.

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource">
    </ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day" MaxEventStack="2">
        </ScheduleView>
        <ScheduleView Option="View.Week" MaxEventStack="2">
        </ScheduleView>
        <ScheduleView Option="View.WorkWeek" MaxEventStack="2">
        </ScheduleView>
    </ScheduleViews>

</SfSchedule>

@code {

    private DateTime CurrentDate { get; set; } =
        new DateTime(2026, 3, 24);

    private List<AppointmentData> DataSource = new()
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting 1",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0)
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Meeting 2",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0)
        },
        new AppointmentData
        {
            Id = 3,
            Subject = "Meeting 3",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0)
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }

        public string Subject { get; set; } = string.Empty;

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public bool IsAllDay { get; set; }
    }
}
```
>**Note:** The `MaxEventStack` property is applicable only with **Day**, **Week**, and **WorkWeek** views when the `timeScale` option is enabled.

## View Templates

Customize event rendering per view:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month">
            <EventTemplate>
                <div style="background-color: @((context as AppointmentData).Color); color: white; padding: 5px;">
                    @((context as AppointmentData).Subject)
                </div>
            </EventTemplate>
        </ScheduleView>
        
        <ScheduleView Option="View.Week">
            <DateHeaderTemplate>
                <div style="text-align: center; font-weight: bold;">
                    @(((context as TemplateContext).Date).ToString("ddd"))
                </div>
            </DateHeaderTemplate>
        </ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            Color = "#FF6B6B"
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Color { get; set; }
    }
}
```

## Start and End Hours

Limit visible time range using `StartHour` and `EndHour`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <!-- Show business hours only: 8 AM to 6 PM -->
        <ScheduleView Option="View.Day" StartHour="08:00" EndHour="18:00"></ScheduleView>
        <ScheduleView Option="View.Week" StartHour="08:00" EndHour="18:00"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Hide Weekends

Remove Saturday and Sunday from views using `ShowWeekend`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week" ShowWeekend="false"></ScheduleView>
        <ScheduleView Option="View.Month" ShowWeekend="false"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Extending View Intervals

Display multiple periods in a single view using `Interval`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <!-- Show 3 days instead of 1 -->
        <ScheduleView Option="View.Day" Interval="3" DisplayName="3 Days"></ScheduleView>
        
        <!-- Show 2 weeks instead of 1 -->
        <ScheduleView Option="View.Week" Interval="2" DisplayName="2 Weeks"></ScheduleView>
        
        <!-- Show 3 months instead of 1 -->
        <ScheduleView Option="View.Month" Interval="3" DisplayName="Quarterly"></ScheduleView>
        
        <!-- Show 12 months (entire year) in month view -->
        <ScheduleView Option="View.TimelineMonth" Interval="12" DisplayName="Year Timeline"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Display Name for Custom Views

Add custom labels for extended views using `DisplayName`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day" Interval="1" DisplayName="Daily"></ScheduleView>
        <ScheduleView Option="View.Day" Interval="3" DisplayName="3-Day View"></ScheduleView>
        <ScheduleView Option="View.Week" Interval="1" DisplayName="Weekly"></ScheduleView>
        <ScheduleView Option="View.Week" Interval="2" DisplayName="Bi-Weekly"></ScheduleView>
        <ScheduleView Option="View.Month" Interval="1" DisplayName="Monthly"></ScheduleView>
        <ScheduleView Option="View.Month" Interval="3" DisplayName="Quarterly"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Week Numbers in Views

Display ISO week numbers using `ShowWeekNumber`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week" ShowWeekNumber="true"></ScheduleView>
        <ScheduleView Option="View.Month" ShowWeekNumber="true"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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

## Readonly Views

Prevent CRUD operations on specific views using `Readonly`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <!-- Month view is editable -->
        <ScheduleView Option="View.Month" Readonly="false"></ScheduleView>
        
        <!-- Week view is read-only (no create, edit, delete) -->
        <ScheduleView Option="View.Week" Readonly="true"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
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
