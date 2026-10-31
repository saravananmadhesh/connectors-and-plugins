# Resource Grouping and Customization

## Table of Contents
- [One-to-One Resource Grouping](#one-to-one-resource-grouping)
- [Grouping Resources by Date](#grouping-resources-by-date)
- [Shared Events Across Resources](#shared-events-across-resources)
- [Resource Header Customization](#resource-header-customization)
- [Multiple Column Resource Headers](#multiple-column-resource-headers)
- [Expand and Collapse Resources](#expand-and-collapse-resources)
- [Resource Header Tooltips](#resource-header-tooltips)
- [Resource Color Selection](#resource-color-selection)
- [Custom Working Hours by Resource](#custom-working-hours-by-resource)
- [Custom Working Days by Resource](#custom-working-days-by-resource)

## One-to-One Resource Grouping

Display all child resources for each parent (ByGroupID="false"):

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup ByGroupID="false" Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="TeamData" TValue="int"
            DataSource="@TeamList"
            Field="TeamId"
            Title="Team"
            Name="Teams"
            TextField="Name"
            IdField="Id"
            ColorField="Color">
        </ScheduleResource>
        
        <ScheduleResource TItem="PersonData" TValue="int"
            DataSource="@PersonList"
            Field="PersonId"
            Title="Person"
            Name="Persons"
            TextField="Name"
            IdField="Id"
            GroupIDField="TeamId"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Teams", "Persons" };

    List<TeamData> TeamList = new List<TeamData>
    {
        new TeamData { Id = 1, Name = "Team A", Color = "#FF6B6B" },
        new TeamData { Id = 2, Name = "Team B", Color = "#4ECDC4" }
    };

    List<PersonData> PersonList = new List<PersonData>
    {
        new PersonData { Id = 1, Name = "Nancy", TeamId = 1, Color = "#FF9999" },
        new PersonData { Id = 2, Name = "Steven", TeamId = 1, Color = "#FFB3B3" },
        new PersonData { Id = 3, Name = "Michael", TeamId = 2, Color = "#7FE5DE" },
        new PersonData { Id = 4, Name = "Angela", TeamId = 2, Color = "#B3F0EB" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            TeamId = 1,
            PersonId = 1
        }
    };

    public class TeamData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class PersonData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TeamId { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int TeamId { get; set; }
        public int PersonId { get; set; }
    }
}
```

## Grouping Resources by Date

Group resources under each date (ByDate="true", calendar views only):

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup ByDate="true" Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Owner"
            Name="Owners"
            TextField="Name"
            IdField="Id"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Owners" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Nancy", Color = "#FFAA00" },
        new ResourceData { Id = 2, Name = "Steven", Color = "#7FA900" },
        new ResourceData { Id = 3, Name = "Michael", Color = "#5978EE" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Nancy's Task",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = 1
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Steven's Meeting",
            StartTime = new DateTime(2026, 3, 25, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 25, 11, 0, 0),
            ResourceId = 2
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
    }
}
```

## Shared Events Across Resources

Create events that appear for multiple resources with synchronized editing (AllowGroupEdit="true"):

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup AllowGroupEdit="true" Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int[]"
            DataSource="@ResourceList"
            Field="ResourceIds"
            Title="Select Attendees"
            Name="Attendees"
            TextField="Name"
            IdField="Id"
            ColorField="Color"
            AllowMultiple="true">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Attendees" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Nancy", Color = "#FFAA00" },
        new ResourceData { Id = 2, Name = "Steven", Color = "#7FA900" },
        new ResourceData { Id = 3, Name = "Michael", Color = "#5978EE" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Meeting - All Attendees",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            ResourceIds = new int[] { 1, 2, 3 }
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Nancy and Steven Meeting",
            StartTime = new DateTime(2026, 3, 24, 14, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 15, 0, 0),
            ResourceIds = new int[] { 1, 2 }
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int[] ResourceIds { get; set; }
    }
}
```

## Resource Header Customization

Customize resource header display with custom templates:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Width="100%" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleTemplates>
        <ResourceHeaderTemplate>
            @{
                var resourceData = (context as TemplateContext).ResourceData as ResourceData;
                <div class='template-wrap'>
                    <div class="resource-image"><img src="https://ej2.syncfusion.com/demos/src/schedule/images/@(resourceData.Image).png" /></div>
                    <div class="resource-details">
                        <div class="resource-name">@(resourceData.Text)</div>
                        <div class="resource-designation">@(resourceData.Designation)</div>
                    </div>
                </div>
            }
        </ResourceHeaderTemplate>
    </ScheduleTemplates>
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int" DataSource="@DoctorsData" Field="DoctorId" Title="Doctor Name" Name="Doctors" TextField="Text" IdField="Id" ColorField="Color"></ScheduleResource>
    </ScheduleResources>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.WorkWeek"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
        <ScheduleView Option="View.Agenda"></ScheduleView>
    </ScheduleViews>
</SfSchedule>
@code{
    DateTime CurrentDate = new DateTime(2023, 6, 1);
    public string[] Resources { get; set; } = { "Doctors" };
    public List<ResourceData> DoctorsData { get; set; } = new List<ResourceData>
    {
        new ResourceData{ Text = "Will Smith", Id = 1, Color = "#ea7a57", Designation = "Cardiologist", Image = "will-smith" },
        new ResourceData{ Text = "Alice", Id = 2, Color = "rgb(53, 124, 210)", Designation = "Neurologist", Image = "alice"  },
        new ResourceData{ Text = "Robson", Id = 3, Color = "#7fa900", Designation = "Orthopedic Surgeon", Image = "robson"  }
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
        public int DoctorId { get; set; }
    }
    public class ResourceData
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Designation { get; set; }
        public string Color { get; set; }
        public string Image { get; set; }
    }
}
<style>
    .e-schedule .e-vertical-view .e-resource-cells {
        height: 62px;
    }

    .e-schedule .template-wrap {
        display: flex;
        text-align: left;
    }

    .e-schedule .template-wrap .resource-image img {
        width: 45px;
        height: 45px;
    }

    .e-schedule .template-wrap .resource-details {
        padding-left: 10px;
    }

    .e-schedule .template-wrap .resource-details .resource-name {
        font-size: 16px;
        font-weight: 500;
        margin-top: 5px;
    }

    .e-schedule.e-device .template-wrap .resource-details .resource-name {
        font-size: inherit;
        font-weight: inherit;
    }

    .e-schedule.e-device .e-resource-tree-popup .e-fullrow {
        height: 50px;
    }

    .e-schedule.e-device .template-wrap .resource-details .resource-designation {
        display: none;
    }
</style>
```

## Multiple Column Resource Headers

Display resources with multiple columns (timeline views only):

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Room"
            Name="Rooms"
            TextField="Name"
            IdField="Id"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.TimelineMonth"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

<style>
    .e-schedule .e-timeline-month-view .e-resource-left-td {
        width: 200px;
    }

    .e-schedule .e-timeline-month-view .e-resource-left-td .e-resource-text {
        display: grid;
        grid-template-columns: 100px 100px;
        gap: 5px;
        padding: 10px;
    }

    .resource-column {
        border-right: 1px solid #ddd;
        padding: 5px;
        text-align: center;
    }
</style>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Rooms" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Board Room", Capacity = "20", Type = "Executive", Color = "#FF9800" },
        new ResourceData { Id = 2, Name = "Meeting Room A", Capacity = "10", Type = "Standard", Color = "#2196F3" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            ResourceId = 1
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Type { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
    }
}
```

## Expand and Collapse Resources

Control initial expand/collapse state using ExpandedField:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Room"
            Name="Rooms"
            TextField="Name"
            IdField="Id"
            ExpandedField="IsExpanded"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.TimelineMonth"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Rooms" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Room A", IsExpanded = true, Color = "#FF9800" },
        new ResourceData { Id = 2, Name = "Room B", IsExpanded = false, Color = "#2196F3" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>();

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsExpanded { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
    }
}
```

## Resource Header Tooltips

Display tooltips on resource headers using HeaderTooltipTemplate:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources">
        <HeaderTooltipTemplate>
            @{
                var resourceData = (context as TemplateContext).ResourceData as ResourceData;
                <div class='template-wrap'>
                    <div class="resource-image"><img src="https://ej2.syncfusion.com/demos/src/schedule/images/@(resourceData.Image).png" /></div>
                    <div class="resource-details">
                        <div class="resource-name">@(resourceData.Text)</div>
                    </div>
                </div>
            }
        </HeaderTooltipTemplate>
    </ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TValue="int[]" TItem="ResourceData" DataSource="@ConferenceData" Field="ConferenceId" Title="Attendees" Name="Conferences" TextField="Text" IdField="Id" ColorField="Color" AllowMultiple="true"></ScheduleResource>
    </ScheduleResources>
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
    DateTime CurrentDate = new DateTime(2023, 6, 1);
    public string[] Resources { get; set; } = { "Conferences" };
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
       new AppointmentData { Id = 1, Subject = "Meeting", StartTime = new DateTime(2023, 6, 16, 9, 30, 0) , EndTime = new DateTime(2023, 6, 16, 11, 0, 0),
       ConferenceId = 1 }
    };
    public List<ResourceData> ConferenceData { get; set; } = new List<ResourceData>
    {
        new ResourceData{ Text = "Margaret", Id = 1, Color = "#1aaa55", Image= "margaret" },
        new ResourceData{ Text = "Robert", Id = 2, Color = "#357cd2", Image= "robert" },
        new ResourceData{ Text = "Laura", Id = 3, Color = "#7fa900", Image= "laura" }
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
        public int ConferenceId { get; set; }
    }
    public class ResourceData
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }
        public string Color { get; set; }
    }
}
```

## Resource Color Selection

Apply specific resource color to events using ResourceColorField:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource" ResourceColorField="ResourceColor"></ScheduleEventSettings>
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Owner"
            Name="Owners"
            TextField="Name"
            IdField="Id"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Owners" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Nancy", Color = "#FFAA00" },
        new ResourceData { Id = 2, Name = "Steven", Color = "#7FA900" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting 1",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = 1,
            ResourceColor = "Owners"
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
        public string ResourceColor { get; set; }
    }
}
```

## Custom Working Hours by Resource

Set different work hours for each resource using StartHourField and EndHourField:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Staff"
            Name="Staff"
            TextField="Name"
            IdField="Id"
            StartHourField="StartHour"
            EndHourField="EndHour"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Staff" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Nancy (9-5)", StartHour = 9, EndHour = 17, Color = "#FFAA00" },
        new ResourceData { Id = 2, Name = "Steven (10-6)", StartHour = 10, EndHour = 18, Color = "#7FA900" },
        new ResourceData { Id = 3, Name = "Michael (8-4)", StartHour = 8, EndHour = 16, Color = "#5978EE" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Nancy's Meeting",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            ResourceId = 1
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
    }
}
```

## Custom Working Days by Resource

Set different working days for each resource using WorkDaysField:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Staff"
            Name="Staff"
            TextField="Name"
            IdField="Id"
            WorkDaysField="WorkDays"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Staff" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        // 0=Sunday, 1=Monday, ..., 6=Saturday
        // Nancy works Mon-Fri
        new ResourceData 
        { 
            Id = 1, 
            Name = "Nancy (Mon-Fri)", 
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FFAA00" 
        },
        // Steven works Tue-Sat
        new ResourceData 
        { 
            Id = 2, 
            Name = "Steven (Tue-Sat)", 
            WorkDays = new int[] { 2, 3, 4, 5, 6 },
            Color = "#7FA900" 
        }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Monday Meeting",
            StartTime = new DateTime(2026, 3, 23, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 23, 11, 0, 0),
            ResourceId = 1
        }
    };

    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int[] WorkDays { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ResourceId { get; set; }
    }
}
```
