# Appointment Appearance and Management

## Table of Contents
- [Appointment Appearance](#appointment-appearance)
- [Tooltips](#tooltips)
- [Appointment Selection](#appointment-selection)
- [Retrieving Appointments](#retrieving-appointments)
- [Filtering Appointments](#filtering-appointments)
- [Refresh Appointments](#refresh-appointments)

## Appointment Appearance

### Differentiate Past Appointments

Use `EventRendered` event to apply custom styling:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Width="100%" Height="550px" @bind-SelectedDate="@SelectedDate">
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
    <ScheduleEvents TValue="AppointmentData" EventRendered="OnEventRendered"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
</SfSchedule>

@code{
    public DateTime SelectedDate = new DateTime(2023, 1, 10);
    
    public List<string> CustomClass = new List<string>() { "e-past-app" };
    
    public void OnEventRendered(EventRenderedArgs<AppointmentData> args)
    {
        if(args.Data.StartTime < SelectedDate)
        {
            args.CssClasses = CustomClass;
        }
    }
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2023, 1, 10, 9, 30, 0),
            EndTime = new DateTime(2023, 1, 10, 11, 0, 0) 
        },
        new AppointmentData 
        { 
            Id = 2, 
            Subject = "Conference", 
            StartTime = new DateTime(2023, 1, 9, 11, 30, 0),
            EndTime = new DateTime(2023, 1, 9, 13, 0, 0) 
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}

<style>
    .e-schedule .e-vertical-view .e-day-wrapper .e-appointment.e-past-app, 
    .e-schedule .e-month-view .e-appointment.e-past-app {
        background-color: chocolate;
    }
</style>
```

### Full-Height Appointments

Make appointments occupy entire cell height:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Width="100%" Height="550px" SelectedDate="@(new DateTime(2023, 3, 11))" CurrentView="View.Month">
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.TimelineWeek"></ScheduleView>
        <ScheduleView Option="View.TimelineMonth"></ScheduleView>
    </ScheduleViews>
    <ScheduleEventSettings DataSource="@DataSource" EnableMaxHeight="true" EnableIndicator="true"></ScheduleEventSettings>
</SfSchedule>

@code{
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2023, 3, 11, 9, 30, 0),
            EndTime = new DateTime(2023, 3, 11, 11, 0, 0) 
        },
        new AppointmentData 
        { 
            Id = 2, 
            Subject = "Conference", 
            StartTime = new DateTime(2023, 3, 11, 9, 30, 0),
            EndTime = new DateTime(2023, 3, 11, 11, 0, 0) 
        }
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

- `EnableMaxHeight="true"` - Appointments occupy full cell height
- `EnableIndicator="true"` - Shows more indicator when multiple appointments in same cell

## Tooltips

### Enable Built-In Tooltip

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource" EnableTooltip="true"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2023, 1, 10);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2023, 1, 8, 10, 0, 0),
            EndTime = new DateTime(2023, 1, 8, 12, 0, 0) 
        }
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

### Customize Tooltip Template

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource" EnableTooltip="true">
        <TooltipTemplate>
            <div class="tooltip-wrap">
                <div>@((context as AppointmentData).Subject)</div>
                <div>From: @((context as AppointmentData).StartTime)</div>
                <div>To: @((context as AppointmentData).EndTime)</div>
            </div>
        </TooltipTemplate>
    </ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2023, 1, 13);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2023, 1, 11, 10, 0, 0),
            EndTime = new DateTime(2023, 1, 11, 12, 0, 0) 
        }
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

### Prevent Tooltip for Specific Events

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEvents TValue="AppointmentData" TooltipOpening="OnTooltipOpening"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource" EnableTooltip="true"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2025, 1, 10);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2025, 1, 8, 10, 0, 0),
            EndTime = new DateTime(2025, 1, 8, 12, 0, 0) 
        },
        new AppointmentData 
        { 
            Id = 2, 
            Subject = "Vacation", 
            StartTime = new DateTime(2025, 1, 10, 10, 0, 0),
            EndTime = new DateTime(2025, 1, 10, 12, 0, 0) 
        }
    };

    public void OnTooltipOpening(TooltipOpenEventArgs<AppointmentData> args)
    {
        if(args.Data.Subject == "Vacation")
        {
            args.Cancel = true;
        }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
```

## Appointment Selection

Select appointments using mouse or keyboard:

| Action | Behavior |
|--------|----------|
| Click/Tap appointment | Select single appointment |
| Ctrl + Click/Tap | Select multiple appointments |
| Delete key | Delete selected appointment(s) |

Deleting multiple occurrences from a series only deletes those occurrences, not the entire series.

## Retrieving Appointments

### Get Target Event from Coordinates

```csharp
await ScheduleObj.GetTargetEventAsync(x, y);
```

### Get Selected Appointments

```csharp
await ScheduleObj.GetSelectedEventsAsync();
```

### Get Current View Appointments

```cshtml
<SfSchedule TValue="AppointmentData" @ref="ScheduleRef" Width="100%" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEvents TValue="AppointmentData" DataBound="OnDataBound"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 10);
    SfSchedule<AppointmentData> ScheduleRef;
    
    public void OnDataBound(DataBoundEventArgs<AppointmentData> args)
    {
        List<AppointmentData> eventCollection = ScheduleRef.GetCurrentViewEvents();
    }

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2020, 1, 10, 9, 30, 0),
            EndTime = new DateTime(2020, 1, 10, 11, 30, 0) 
        }
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

### Get All Appointments

```cshtml
<SfSchedule TValue="AppointmentData" @ref="ScheduleRef" Width="100%" Height="550px" SelectedDate="@(new DateTime(2020,1,10))">
    <ScheduleEvents TValue="AppointmentData" DataBound="OnDataBound"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
</SfSchedule>

@code{
    SfSchedule<AppointmentData> ScheduleRef;
    
    public async void OnDataBound(DataBoundEventArgs<AppointmentData> args)
    {
        List<AppointmentData> EventCollection = await ScheduleRef.GetEventsAsync();
    }

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2020, 1, 10, 9, 30, 0),
            EndTime = new DateTime(2020, 1, 10, 11, 30, 0) 
        }
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

**Pass date range to `GetEventsAsync()`:**
```csharp
await ScheduleRef.GetEventsAsync(startDate, endDate);
```

**Get block events:**
```csharp
await ScheduleRef.GetBlockEventsAsync();
```

## Filtering Appointments

Filter appointments by specific criteria:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Data
@using Syncfusion.Blazor.Buttons

<SfCheckBox TChecked="bool" @bind-Checked="MargretChecked" Value="@MargretId" ValueChange="@OnChange" Label="Margaret"></SfCheckBox>
<SfCheckBox TChecked="bool" @bind-Checked="RobertChecked" Value="@RobertId" ValueChange="@OnChange" Label="Robert"></SfCheckBox>

<SfSchedule TValue="AppointmentData" Width="100%" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource" Query="@ScheduleQuery"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    public DateTime CurrentDate { get; set; } = new DateTime(2020, 6, 5);
    public bool MargretChecked { get; set; } = true;
    public bool RobertChecked { get; set; } = true;

    public dynamic predicate;
    public Query ScheduleQuery { get; set; } = null;

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1,
            Subject = "Event 1",
            StartTime = new DateTime(2020, 5, 29, 15, 0, 0),
            EndTime = new DateTime(2020, 5, 29, 17, 0, 0),
            OwnerId = 1
        }
    };

    public void OnChange(ChangeEventArgs<bool> args)
    {
        predicate = null;
        if (MargretChecked)
        {
            predicate = new WhereFilter() { Field = "OwnerId", Operator = "equal", value = 1 };
        }
        if (RobertChecked)
        {
            if (predicate != null)
            {
                predicate = predicate.Or("OwnerId", "equal", 2);
            }
        }
        ScheduleQuery = new Query().Where(predicate);
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int OwnerId { get; set; }
    }
}
```

## Refresh Appointments

Refresh appointment collection without reloading Scheduler:

```csharp
await ScheduleRef.RefreshEventsAsync();
```

This updates appointments from the data source without full Scheduler refresh.
