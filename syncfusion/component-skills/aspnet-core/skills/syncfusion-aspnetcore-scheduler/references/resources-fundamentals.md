# Resource Fundamentals in ASP.NET Core Scheduler

## Table of Contents
- [Single Resource Scheduling](#single-resource-scheduling)
- [Multiple Resources](#multiple-resources)
- [Resource Grouping](#resource-grouping)
- [Best Practices](#best-practices)

## Single Resource Scheduling

Assign appointments to a single resource such as a user, room, or equipment item.

```cshtml
@{
    string[] resources = new string[] { "Resources" };
}

<ejs-schedule id="schedule">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="ResourceId"
            name="Resources"
            title="Resources"
            dataSource="@Model.ResourceCollection"
            idField="Id"
            textField="Name"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```csharp
public class GroupModel : PageModel
{
    public List<ResourceItem> ResourceCollection { get; set; } = new List<ResourceItem>();
    public List<AppointmentData> Events { get; set; } = new List<AppointmentData>();

    public void OnGet()
    {
        ResourceCollection.Add(new ResourceItem { Id = 1, Name = "Resource A", Color = "#EA7A57" });
        ResourceCollection.Add(new ResourceItem { Id = 2, Name = "Resource B", Color = "#357CD2" });
        ResourceCollection.Add(new ResourceItem { Id = 3, Name = "Resource C", Color = "#7FA900" });

        Events.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Planning Meeting",
            StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
            ResourceId = 1
        });
    }
}

public class ResourceItem
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
```

## Multiple Resources

Use multiple resource types to structure a scheduler by department, employee, or room.

```cshtml
@{
    string[] resources = new string[] { "Departments", "Employees" };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="DepartmentId"
            title="Department"
            name="Departments"
            dataSource="@Model.Departments"
            idField="Id"
            textField="Name">
        </e-schedule-resource>

        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@Model.Employees"
            idField="Id"
            textField="Name"
            groupIDField="DepartmentId"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```csharp
public class GroupModel : PageModel
{
    public List<DepartmentResource> Departments { get; set; } = new List<DepartmentResource>();
    public List<EmployeeResource> Employees { get; set; } = new List<EmployeeResource>();
    public List<AppointmentData> Events { get; set; } = new List<AppointmentData>();

    public void OnGet()
    {
        Departments.Add(new DepartmentResource { Id = 1, Name = "Sales" });
        Departments.Add(new DepartmentResource { Id = 2, Name = "Engineering" });

        Employees.Add(new EmployeeResource { Id = 101, Name = "John Smith", DepartmentId = 1, Color = "#FF6B6B" });
        Employees.Add(new EmployeeResource { Id = 201, Name = "Mike Davis", DepartmentId = 2, Color = "#4ECDC4" });

        Events.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Client Meeting",
            StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 11, 0, 0),
            DepartmentId = 1,
            EmployeeId = 101
        });
    }
}

public class DepartmentResource
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class EmployeeResource
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int DepartmentId { get; set; }
    public string Color { get; set; }
}

public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int DepartmentId { get; set; }
    public int EmployeeId { get; set; }
}
```

## Resource Grouping

Enable multiple resource selection for a single appointment using `allowMultiple=true`.

```cshtml
@{
    string[] resources = new string[] { "Employees" };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="EmployeeIds"
            title="Employees"
            name="Employees"
            allowMultiple="true"
            dataSource="@Model.EmployeeCollection"
            idField="Id"
            textField="Name"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```csharp
public class MultiResourceModel : PageModel
{
    public List<EmployeeResource> EmployeeCollection { get; set; } = new List<EmployeeResource>();
    public List<AppointmentData> Events { get; set; } = new List<AppointmentData>();

    public void OnGet()
    {
        EmployeeCollection.Add(new EmployeeResource { Id = 101, Name = "John Smith", Color = "#FF6B6B" });
        EmployeeCollection.Add(new EmployeeResource { Id = 102, Name = "Sarah Johnson", Color = "#FF8C42" });

        Events.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Project Planning",
            StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 12, 0, 0),
            EmployeeIds = new int[] { 101, 102 }
        });
    }
}

public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int[] EmployeeIds { get; set; }
}
```

## Best Practices

1. Use a logical hierarchy for grouped resources.
2. Keep resource data small and cached when possible.
3. Use color coding to improve readability.
4. Set custom working hours only when needed.
5. Prefer resource names and IDs that match your business domain.
