# Resource Grouping and Custom Fields in ASP.NET Core Scheduler

## Table of Contents
- [Custom Resource Fields](#custom-resource-fields)
- [Resource-Specific Colors](#resource-specific-colors)
- [Best Practices](#best-practices)

## Custom Resource Fields

Customize resource availability and working patterns using additional fields such as `StartHour`, `EndHour`, and `WorkDays`.

```csharp
public class ResourceData
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string StartHour { get; set; }
    public string EndHour { get; set; }
    public int[] WorkDays { get; set; }
    public string Color { get; set; }
}
```

```cshtml
@{
    string[] resources = new string[] { "Employees" };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@Model.EmployeeCollection"
            idField="Id"
            textField="Name"
            startHourField="StartHour"
            endHourField="EndHour"
            workDaysField="WorkDays"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```csharp
public class WorkingHoursModel : PageModel
{
    public List<ResourceData> EmployeeCollection { get; set; } = new List<ResourceData>();
    public List<AppointmentData> Events { get; set; } = new List<AppointmentData>();

    public void OnGet()
    {
        EmployeeCollection.Add(new ResourceData
        {
            Id = 101,
            Name = "John Smith",
            StartHour = "09:00",
            EndHour = "17:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FF6B6B"
        });

        EmployeeCollection.Add(new ResourceData
        {
            Id = 102,
            Name = "Sarah Johnson",
            StartHour = "10:00",
            EndHour = "18:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FF8C42"
        });

        Events.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Morning Standup",
            StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 10, 0, 0),
            EmployeeId = 101
        });
    }
}
```

## Resource-Specific Colors

Apply colors directly to resource data and optionally adjust appearance during `eventRendered`.

```cshtml
<ejs-schedule id="schedule" width="100%" height="550px" eventRendered="onEventRendered">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@Model.EmployeeCollection"
            idField="Id"
            textField="Name"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>

<script>
    function onEventRendered(args) {
        if (args.element) {
            args.element.style.fontWeight = 'bold';
        }
    }
</script>
```

## When to Use This Pattern

- Group work by department and employee
- Define resource availability or working hours
- Visually distinguish teams using color metadata
- Keep resource details in the model rather than in the UI

## Best Practices

1. Keep custom resource fields aligned with the Scheduler property names.
2. Use colors consistently for readable resource grouping.
3. Validate numeric arrays for working days and multiple assignment fields.
4. Limit large resource collections using filtering or paging when possible.
