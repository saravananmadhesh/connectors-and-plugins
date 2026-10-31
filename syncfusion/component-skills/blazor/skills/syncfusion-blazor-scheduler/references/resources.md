# Resources and Grouping

## Table of Contents
- [Overview](#overview)
- [ScheduleResource Component](#scheduleresource-component)
- [Resource Fields Reference](#resource-fields-reference)
- [Resource Data Binding](#resource-data-binding)
- [Binding with ExpandoObject](#binding-with-expandoobject)
- [Binding with DynamicObject](#binding-with-dynamicobject)
- [Binding with ObservableCollection](#binding-with-observablecollection)
- [Multiple Resources Without Grouping](#multiple-resources-without-grouping)
- [Single-Level Resource Grouping](#single-level-resource-grouping)
- [Multi-Level Resource Grouping](#multi-level-resource-grouping)

## Overview

Resources enable the Scheduler to display appointments for multiple entities (rooms, employees, equipment, etc.) with individual columns or rows for each resource. The Scheduler supports single and multiple levels of resource grouping, allowing flexible organization of appointments. Resources can be displayed in vertical (calendar views) or timeline views, with extensive customization options for headers, colors, working hours, and days.

**Key Concepts:**
- Resources are entities assigned to appointments (e.g., Conference Room A, Nancy, Equipment X)
- Each resource has properties: ID, Name, Color, Working Hours, Working Days, CSS Class
- Resources can be grouped hierarchically (parent-child relationships)
- Single appointment can be assigned to multiple resources
- Shared events allow editing one instance to update all resource copies
- Resources can have different working schedules

## ScheduleResource Component

The `ScheduleResource` component defines available resources and maps resource data fields. It uses generics for strong typing.

**ScheduleResource Generic Parameters:**
- `TItem` - Resource data model class
- `TValue` - Resource ID type (int, string, Guid, etc.)

**Basic Structure:**

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Resource"
            Name="Resources"
            TextField="Name"
            IdField="Id"
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
    public string[] Resources { get; set; } = { "Resources" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Room A", Color = "#FF6B6B" },
        new ResourceData { Id = 2, Name = "Room B", Color = "#4ECDC4" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = 1
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

## Resource Fields Reference

ScheduleResource properties map appointment/resource data fields:

| Property | Type | Description |
|----------|------|-------------|
| **Field** | string | Appointment field name storing resource ID (e.g., "ResourceId") |
| **Title** | string | Display name in event editor (e.g., "Select Room") |
| **Name** | string | Unique resource name for grouping identification (e.g., "Rooms") |
| **TextField** | string | Resource data field for display name (e.g., "Name") |
| **IdField** | string | Resource data field for ID (e.g., "Id") |
| **ColorField** | string | Resource data field for color (e.g., "Color") |
| **AllowMultiple** | bool | Allow appointment assignment to multiple resources (default: false) |
| **DataSource** | object | Resource data collection (List, ExpandoObject, DynamicObject) |
| **Query** | Query | OData query for remote data |
| **ExpandedField** | string | Resource data field indicating initial expand state (bool) |
| **GroupIDField** | string | Parent resource ID for hierarchical grouping (multi-level) |
| **StartHourField** | string | Resource data field for work start hour (e.g., "StartHour") |
| **EndHourField** | string | Resource data field for work end hour (e.g., "EndHour") |
| **WorkDaysField** | string | Resource data field for work days (e.g., "WorkDays") |
| **CssClassField** | string | Resource data field for custom CSS class (e.g., "CssClass") |

## Resource Data Binding

Bind resource data from local List collections:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="RoomData" TValue="int"
            DataSource="@RoomsList"
            Field="RoomId"
            Title="Room"
            Name="Rooms"
            TextField="RoomName"
            IdField="Id"
            ColorField="RoomColor">
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
    public string[] Resources { get; set; } = { "Rooms" };

    List<RoomData> RoomsList = new List<RoomData>
    {
        new RoomData { Id = 1, RoomName = "Conference Room A", RoomColor = "#ff9800" },
        new RoomData { Id = 2, RoomName = "Conference Room B", RoomColor = "#2196f3" },
        new RoomData { Id = 3, RoomName = "Meeting Room C", RoomColor = "#4caf50" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Standup",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 9, 30, 0),
            RoomId = 1
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Client Meeting",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            RoomId = 2
        }
    };

    public class RoomData
    {
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string RoomColor { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int RoomId { get; set; }
    }
}
```

## Binding with ExpandoObject

Use ExpandoObject when resource model type is unknown at compile time:

```cshtml
@using Syncfusion.Blazor.Schedule
@using System.Dynamic

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ExpandoObject" TValue="int"
            DataSource="@ExpandoResourceList"
            Field="ResourceId"
            Title="Resource"
            Name="Resources"
            TextField="Name"
            IdField="Id"
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
    public string[] Resources { get; set; } = { "Resources" };

    List<ExpandoObject> ExpandoResourceList = new List<ExpandoObject>
    {
        CreateExpandoResource(1, "Resource A", "#FF6B6B"),
        CreateExpandoResource(2, "Resource B", "#4ECDC4"),
        CreateExpandoResource(3, "Resource C", "#95E1D3")
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Task 1",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = 1
        }
    };

    private ExpandoObject CreateExpandoResource(int id, string name, string color)
    {
        dynamic resource = new ExpandoObject();
        resource.Id = id;
        resource.Name = name;
        resource.Color = color;
        return (ExpandoObject)resource;
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

## Binding with DynamicObject

Use DynamicObject for dynamic resource properties with custom behavior:

```cshtml
@using Syncfusion.Blazor.Schedule
@using System.Dynamic

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="DynamicResourceData" TValue="int"
            DataSource="@DynamicResourceList"
            Field="ResourceId"
            Title="Resource"
            Name="Resources"
            TextField="Name"
            IdField="Id"
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
    public string[] Resources { get; set; } = { "Resources" };

    List<DynamicResourceData> DynamicResourceList = new List<DynamicResourceData>
    {
        new DynamicResourceData { Id = 1, Name = "Resource A", Color = "#FF6B6B" },
        new DynamicResourceData { Id = 2, Name = "Resource B", Color = "#4ECDC4" }
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

    public class DynamicResourceData : DynamicObject
    {
        private Dictionary<string, object> properties = new Dictionary<string, object>();

        public int Id
        {
            get { return (int)properties["Id"]; }
            set { properties["Id"] = value; }
        }

        public string Name
        {
            get { return (string)properties["Name"]; }
            set { properties["Name"] = value; }
        }

        public string Color
        {
            get { return (string)properties["Color"]; }
            set { properties["Color"] = value; }
        }

        public override IEnumerable<string> GetDynamicMemberNames()
        {
            return properties.Keys;
        }
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

## Binding with ObservableCollection

Use ObservableCollection for dynamic resource additions/removals with notifications:

```cshtml
@using Syncfusion.Blazor.Schedule
@using System.Collections.ObjectModel
@using System.ComponentModel
@using Syncfusion.Blazor.Buttons

<SfButton @onclick="AddResource">Add Resource</SfButton>
<SfButton @onclick="RemoveResource">Remove Resource</SfButton>

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int"
            DataSource="@DynamicResourceList"
            Field="ResourceId"
            Title="Resource"
            Name="Resources"
            TextField="Name"
            IdField="Id"
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
    public string[] Resources { get; set; } = { "Resources" };
    int resourceCount = 3;

    ObservableCollection<ResourceData> DynamicResourceList = new ObservableCollection<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Resource A", Color = "#FF6B6B" },
        new ResourceData { Id = 2, Name = "Resource B", Color = "#4ECDC4" },
        new ResourceData { Id = 3, Name = "Resource C", Color = "#95E1D3" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = 1
        }
    };

    private void AddResource()
    {
        resourceCount++;
        DynamicResourceList.Add(new ResourceData 
        { 
            Id = resourceCount, 
            Name = $"Resource {(char)(64 + (resourceCount % 26))}", 
            Color = "#FFE66D" 
        });
    }

    private void RemoveResource()
    {
        if (DynamicResourceList.Count > 1)
            DynamicResourceList.RemoveAt(DynamicResourceList.Count - 1);
    }

    public class ResourceData : INotifyPropertyChanged
    {
        private int id;
        private string name;
        private string color;

        public int Id
        {
            get { return id; }
            set { id = value; OnPropertyChanged(nameof(Id)); }
        }

        public string Name
        {
            get { return name; }
            set { name = value; OnPropertyChanged(nameof(Name)); }
        }

        public string Color
        {
            get { return color; }
            set { color = value; OnPropertyChanged(nameof(Color)); }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
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

## Multiple Resources Without Grouping

Display multiple resource options without visual grouping:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleResources>
        <ScheduleResource TItem="ResourceData" TValue="int[]"
            DataSource="@ResourceList"
            Field="ResourceId"
            Title="Select Room"
            Name="Rooms"
            TextField="Name"
            IdField="Id"
            ColorField="Color"
            AllowMultiple="true">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Room A", Color = "#FF6B6B" },
        new ResourceData { Id = 2, Name = "Room B", Color = "#4ECDC4" },
        new ResourceData { Id = 3, Name = "Room C", Color = "#95E1D3" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            ResourceId = new[] { 1, 2 }
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
        public int[] ResourceId { get; set; }
    }
}
```

## Single-Level Resource Grouping

Group appointments by single resource type:

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
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.TimelineWeek"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Rooms" };

    List<ResourceData> ResourceList = new List<ResourceData>
    {
        new ResourceData { Id = 1, Name = "Conference Room A", Color = "#FF9800" },
        new ResourceData { Id = 2, Name = "Conference Room B", Color = "#2196F3" },
        new ResourceData { Id = 3, Name = "Board Room", Color = "#4CAF50" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Standup",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 9, 30, 0),
            ResourceId = 1
        },
        new AppointmentData
        {
            Id = 2,
            Subject = "Management Review",
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0),
            ResourceId = 3
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

## Multi-Level Resource Grouping

Nest resources hierarchically using GroupIDField:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleGroup Resources="@Resources"></ScheduleGroup>
    <ScheduleResources>
        <!-- Parent level: Buildings -->
        <ScheduleResource TItem="BuildingData" TValue="int"
            DataSource="@BuildingList"
            Field="BuildingId"
            Title="Building"
            Name="Buildings"
            TextField="Name"
            IdField="Id"
            ColorField="Color">
        </ScheduleResource>
        
        <!-- Child level: Rooms within Buildings -->
        <ScheduleResource TItem="RoomData" TValue="int"
            DataSource="@RoomList"
            Field="RoomId"
            Title="Room"
            Name="Rooms"
            TextField="Name"
            IdField="Id"
            GroupIDField="BuildingId"
            ColorField="Color">
        </ScheduleResource>
    </ScheduleResources>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.TimelineMonth"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    public string[] Resources { get; set; } = { "Buildings", "Rooms" };

    List<BuildingData> BuildingList = new List<BuildingData>
    {
        new BuildingData { Id = 1, Name = "North Building", Color = "#FF9800" },
        new BuildingData { Id = 2, Name = "South Building", Color = "#2196F3" }
    };

    List<RoomData> RoomList = new List<RoomData>
    {
        new RoomData { Id = 1, Name = "Room 101", BuildingId = 1, Color = "#FFB74D" },
        new RoomData { Id = 2, Name = "Room 102", BuildingId = 1, Color = "#FFCC80" },
        new RoomData { Id = 3, Name = "Room 201", BuildingId = 2, Color = "#64B5F6" },
        new RoomData { Id = 4, Name = "Room 202", BuildingId = 2, Color = "#90CAF9" }
    };

    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Team Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0),
            EndTime = new DateTime(2026, 3, 24, 10, 0, 0),
            BuildingId = 1,
            RoomId = 1
        }
    };

    public class BuildingData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }

    public class RoomData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BuildingId { get; set; }
        public string Color { get; set; }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int BuildingId { get; set; }
        public int RoomId { get; set; }
    }
}
```
