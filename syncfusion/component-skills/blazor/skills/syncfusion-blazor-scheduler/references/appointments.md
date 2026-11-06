# Appointments and Event Fields

## Table of Contents
- [Built-in Event Fields](#built-in-event-fields)
- [Binding Different Field Names](#binding-different-field-names)
- [Event Field Settings](#event-field-settings)
- [Adding Custom Fields](#adding-custom-fields)
- [Normal Events](#normal-events)
- [Spanned Events](#spanned-events)
- [All-Day Events](#all-day-events)
- [Block Date and Time](#block-date-and-time)
- [Read-Only Appointments](#read-only-appointments)
- [Overlapping Events](#overlapping-events)
- [Slot Availability](#slot-availability)

## Built-in Event Fields

The Scheduler event object contains the following built-in fields that map to appointment properties:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Id` | int | Yes (for CRUD) | Unique identifier for each event |
| `Subject` | string | No | Event title/summary (default: empty) |
| `StartTime` | DateTime | Yes | Appointment start time |
| `EndTime` | DateTime | Yes | Appointment end time |
| `Location` | string | No | Event location |
| `Description` | string | No | Event details |
| `IsAllDay` | bool | No | All-day event flag (default: false) |
| `StartTimezone` | string | No | IANA timezone for start time |
| `EndTimezone` | string | No | IANA timezone for end time |
| `RecurrenceRule` | string | No | iCalendar recurrence pattern |
| `RecurrenceID` | int? | No | Parent event ID for edited occurrences |
| `RecurrenceException` | string | No | Excluded dates from recurrence (ISO format) |
| `IsReadonly` | bool | No | Make event read-only (default: false) |
| `IsBlock` | bool | No | Block time slot (default: false) |
| `CssClass` | string | No | Custom CSS class for styling |

**Note:** To create an event, minimum required fields are `StartTime` and `EndTime`. For remote data binding, `Id` field is mandatory for CRUD operations.

## Binding Different Field Names

When your data model uses different field names, map them explicitly using `ScheduleField`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource">
        <ScheduleField Id="TravelId" IsBlock="IsDisabled">
            <FieldSubject Name="TravelSummary"></FieldSubject>
            <FieldLocation Name="Source"></FieldLocation>
            <FieldDescription Name="Comments"></FieldDescription>
            <FieldIsAllDay Name="FullDay"></FieldIsAllDay>
            <FieldStartTime Name="DepartureTime"></FieldStartTime>
            <FieldEndTime Name="ArrivalTime"></FieldEndTime>
            <FieldStartTimezone Name="Origin"></FieldStartTimezone>
            <FieldEndTimezone Name="Destination"></FieldEndTimezone>
        </ScheduleField>
    </ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.Agenda"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 10);
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            TravelId = 1, 
            TravelSummary = "Paris", 
            DepartureTime = new DateTime(2020, 1, 10, 10, 0, 0),
            ArrivalTime = new DateTime(2020, 1, 10, 12, 30, 0),
            Source = "London", 
            Comments = "Summer vacation planned for outstation.", 
            Origin = "Asia/Yekaterinburg", 
            Destination = "Asia/Yekaterinburg" 
        },
        new AppointmentData 
        { 
            TravelId = 2, 
            TravelSummary = "Tokyo", 
            DepartureTime = new DateTime(2020, 1, 11, 10, 0, 0), 
            ArrivalTime = new DateTime(2020, 1, 11, 12, 30, 0),
            Source = "Beijing", 
            Comments = "Conference on emerging technologies.", 
            Origin = "Asia/Yekaterinburg", 
            Destination = "Asia/Yekaterinburg", 
            IsDisabled = true 
        }
    };

    public class AppointmentData
    {
        public int TravelId { get; set; }
        public string TravelSummary { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public bool FullDay { get; set; }
        public string Source { get; set; }
        public string Comments { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public bool IsDisabled { get; set; }
    }
}
```

## Event Field Settings

Configure field behavior with labels, defaults, and validation:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings TValue="AppointmentData" DataSource="@DataSource">
        <ScheduleField Id="Id">
            <FieldSubject Name="Subject" Title="Summary" Default="Add Summary"></FieldSubject>
            <FieldLocation Name="Location"></FieldLocation>
            <FieldDescription Name="Description"></FieldDescription>
            <FieldStartTime Name="StartTime"></FieldStartTime>
            <FieldEndTime Name="EndTime"></FieldEndTime>
        </ScheduleField>
    </ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.Agenda"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2020, 1, 31, 9, 30, 0),
            EndTime = new DateTime(2020, 1, 31, 11, 0, 0) 
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
    }
}
```

**Field Options:**
- `Default` - Default value if not provided
- `Name` - Maps to dataSource field
- `Title` - Label shown in event editor
- `Validation` - Validation rules for the field

## Adding Custom Fields

Extend appointments with custom properties beyond built-in fields:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2020, 1, 31, 9, 30, 0),
            EndTime = new DateTime(2020, 1, 31, 11, 0, 0),
            Status = "Completed", 
            Priority = "High"
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        
        // Custom fields - not required to map in EventSettings
        public string Status { get; set; }
        public string Priority { get; set; }
    }
}
```

Custom fields can be accessed in templates and events without explicit field mapping.

## Normal Events

Create single-occurrence appointments within a specific time period:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.Agenda"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2020, 1, 31, 9, 30, 0),
            EndTime = new DateTime(2020, 1, 31, 11, 0, 0) 
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

## Spanned Events

Events spanning multiple days (>24 hours) or across day boundaries:

- **Multi-day spanned:** Appointment created for more than 24 hours, displayed in all-day row
- **Cross-day spanned:** Appointment created for multiple days but less than 24 hours, split across days

Example: Event from Nov 25 11:00 PM to Nov 26 2:00 AM displays on both days.

## All-Day Events

Appointments covering an entire day without specific times. Set `IsAllDay = true`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2023, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Holiday", 
            IsAllDay = true,
            StartTime = new DateTime(2023, 1, 31, 0, 0, 0),
            EndTime = new DateTime(2023, 2, 1, 0, 0, 0)
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
```

**Hide All-Day Row (CSS):**

```css
.e-schedule .e-date-header-wrap .e-schedule-table thead {
    display: none;
}
```

## Block Date and Time

Block specific time slots to prevent event creation. Set `IsBlock = true`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.Agenda"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2023, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Maintenance", 
            StartTime = new DateTime(2023, 1, 31, 9, 30, 0),
            EndTime = new DateTime(2023, 1, 31, 11, 0, 0),
            IsBlock = true 
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsBlock { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
    }
}
```

**Recurring Block Events:**

```cshtml
new AppointmentData 
{ 
    Id = 1, 
    Subject = "Maintenance",
    StartTime = new DateTime(2020, 1, 31, 9, 30, 0),
    EndTime = new DateTime(2020, 1, 31, 11, 0, 0),
    IsBlock = true, 
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=5" 
}
```

## Read-Only Appointments

Prevent CRUD operations on specific appointments.

### Disable All Appointments

Use `Readonly` property on Scheduler:

```cshtml
<SfSchedule TValue="AppointmentData" Height="550px" Readonly="true" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>
```

### Make Specific Events Read-Only

Set `IsReadonly = true` on individual appointments:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2020, 1, 31);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Paris", 
            StartTime = new DateTime(2020, 1, 28, 10, 0, 0),
            EndTime = new DateTime(2020, 1, 28, 12, 0, 0),
            IsReadonly = true 
        },
        new AppointmentData 
        { 
            Id = 2, 
            Subject = "Germany", 
            StartTime = new DateTime(2020, 1, 31, 10, 0, 0),
            EndTime = new DateTime(2020, 1, 31, 12, 0, 0) 
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsReadonly { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
    }
}
```

Read-only events prevent the event editor from opening.

## Overlapping Events

### Customize Overlapping Order

Sort overlapping events using custom fields:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentSortData" Width="100%" EnableAutoRowHeight="true" @bind-SelectedDate="@CurrentDate" @bind-CurrentView="@SelectedView">
    <ScheduleEventSettings SortBy="RankId" DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.TimelineDay"></ScheduleView>
        <ScheduleView Option="View.TimelineWeek"></ScheduleView>
        <ScheduleView Option="View.TimelineWorkWeek"></ScheduleView>
        <ScheduleView Option="View.TimelineMonth"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code{
    DateTime CurrentDate = new DateTime(2023, 2, 14);
    View SelectedView = View.Week;
    
    List<AppointmentSortData> DataSource = new List<AppointmentSortData>
    {
        new AppointmentSortData 
        { 
            Id = 1, 
            Subject = "Rank A", 
            RankId = "A",
            StartTime = new DateTime(2023, 2, 13, 10, 0, 0),
            EndTime = new DateTime(2023, 2, 13, 12, 0, 0) 
        },
        new AppointmentSortData 
        { 
            Id = 2, 
            Subject = "Rank B", 
            RankId = "B",
            StartTime = new DateTime(2023, 2, 13, 7, 0, 0),
            EndTime = new DateTime(2023, 2, 13, 15, 0, 0) 
        }
    };

    public class AppointmentSortData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string RankId { get; set; }
    }
}
```

### Prevent Overlapping Events

Block overlapping appointments with `AllowOverlap="false"`:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" AllowOverlap="false" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2024, 12, 2);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Board Meeting", 
            StartTime = new DateTime(2024, 12, 1, 9, 30, 0),
            EndTime = new DateTime(2024, 12, 1, 11, 0, 0) 
        },
        new AppointmentData 
        { 
            Id = 2, 
            Subject = "Conference", 
            StartTime = new DateTime(2024, 12, 2, 10, 0, 0),
            EndTime = new DateTime(2024, 12, 2, 11, 0, 0) 
        }
    };

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
    }
}
```

When `AllowOverlap=false`:
- Initial load prioritizes non-overlapping events
- Recurring appointments skip conflicting instances
- User actions blocked if overlap detected
- Alert shown to user

**Limitation:** Overlap check only applies to rendered date range.

**Check overlaps across all events using ActionBegin event:**

```cshtml
<ScheduleEvents TValue="AppointmentData" OnActionBegin="OnActionBegin"></ScheduleEvents>

@code {
    public void OnActionBegin(ActionEventArgs<AppointmentData> args)
    {
        if (args.ActionType == ActionType.EventCreate || args.ActionType == ActionType.EventChange)
        {
            // Custom logic to check overlaps across all events
        }
    }
}
```

## Slot Availability

Check if a time slot is available before creating appointments:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule @ref="ScheduleObj" TValue="AppointmentData" Height="600px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEvents TValue="AppointmentData" OnActionBegin="OnActionBegin"></ScheduleEvents>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
</SfSchedule>

@code{
    private DateTime CurrentDate = new DateTime(2022, 1, 9);
    SfSchedule<AppointmentData> ScheduleObj;
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2022, 1, 9, 9, 30, 0),
            EndTime = new DateTime(2022, 1, 9, 11, 0, 0),
            RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=5" 
        }
    };
    
    public async Task OnActionBegin(ActionEventArgs<AppointmentData> args)
    {
        bool availability = true;
        if (args.ActionType == ActionType.EventCreate || args.ActionType == ActionType.EventChange)  
        {
            var records = args.AddedRecords ?? args.ChangedRecords;
            if(records == null) return;
            availability = await ScheduleObj.IsSlotAvailableAsync(records.First());
        }
        args.Cancel = !availability;
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string RecurrenceRule { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
    }
}
```

**Note:** `IsSlotAvailableAsync` checks only current view's date range, not recurrences beyond it.
