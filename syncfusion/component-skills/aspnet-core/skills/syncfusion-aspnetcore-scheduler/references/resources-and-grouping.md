# Resources and Grouping in ASP.NET Core Scheduler

## Overview

This topic is the landing page for resource scheduling patterns in the Scheduler. The detailed implementation examples have been split into focused reference documents to keep each file easier to maintain and within the recommended line limits.

## Table of Contents

- [Resource Fundamentals](resources-fundamentals.md)
- [Resource Grouping and Custom Fields](resources-grouping-and-custom-fields.md)
- [Data Binding and Timeline Resources](resources-data-binding-and-timeline.md)
- [Complete Example](#complete-resource-scheduling-example)
- [Best Practices](#best-practices)

## Included topics

- single resource scheduling
- multi-resource grouping
- custom resource fields and working hours
- resource colors and template customization
- local, remote, and OData resource data binding
- timeline views and grouped resource layouts
- best practices for scalable resource configuration

## Use this page as a starting point

Start with the fundamentals, then continue to the grouped and timeline examples for advanced scheduling scenarios. Each linked document includes complete code samples that you can adapt for your application.

## Complete Resource Scheduling Example

```cshtml
@{
    string[] resources = new string[] { "Departments", "Employees" };
    var currentDate = new DateTime(2024, 3, 25);
}

<ejs-schedule id="schedule" width="100%" height="550px" currentView="TimelineWeek" selectedDate="currentDate">

    <!-- Group by Department then Employee -->
    <e-schedule-group resources="@resources">
    </e-schedule-group>

    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineMonth"></e-schedule-view>
    </e-schedule-views>

    <e-schedule-resources>
        <!-- Level 1: Departments -->
        <e-schedule-resource
            field="DepartmentId"
            title="Department"
            name="Departments"
            dataSource="@Model.Departments"
            idField="Id"
            textField="Name">
        </e-schedule-resource>

        <!-- Level 2: Employees grouped by department with custom working hours -->
        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@Model.Employees"
            idField="Id"
            textField="Name"
            groupIDField="DepartmentId"
            colorField="Color"
            startHourField="StartHour"
            endHourField="EndHour"
            workDaysField="WorkDays">
        </e-schedule-resource>
    </e-schedule-resources>

    <e-schedule-eventsettings dataSource="@Model.Events">
    </e-schedule-eventsettings>

</ejs-schedule>
```

```csharp
public class CompleteResourceModel : PageModel
{
    public List<DepartmentResource> Departments { get; set; } = new List<DepartmentResource>();

    public List<EmployeeResource> Employees { get; set; } = new List<EmployeeResource>();

    public List<AppointmentData> Events { get; set; } = new List<AppointmentData>();

    public void OnGet()
    {
        // Parent resource collection
        Departments.Add(new DepartmentResource
        {
            Id = 1,
            Name = "Sales"
        });

        Departments.Add(new DepartmentResource
        {
            Id = 2,
            Name = "Engineering"
        });

        Departments.Add(new DepartmentResource
        {
            Id = 3,
            Name = "Marketing"
        });

        // Child resource collection with custom working hours
        Employees.Add(new EmployeeResource
        {
            Id = 101,
            Name = "John Smith",
            DepartmentId = 1,
            StartHour = "09:00",
            EndHour = "17:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FF6B6B"
        });

        Employees.Add(new EmployeeResource
        {
            Id = 102,
            Name = "Sarah Johnson",
            DepartmentId = 1,
            StartHour = "10:00",
            EndHour = "18:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FF8C42"
        });

        Employees.Add(new EmployeeResource
        {
            Id = 201,
            Name = "Mike Davis",
            DepartmentId = 2,
            StartHour = "08:00",
            EndHour = "16:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#4ECDC4"
        });

        Employees.Add(new EmployeeResource
        {
            Id = 301,
            Name = "Lisa Wilson",
            DepartmentId = 3,
            StartHour = "09:00",
            EndHour = "17:00",
            WorkDays = new int[] { 1, 2, 3, 4, 5 },
            Color = "#FFE66D"
        });

        // Appointment data spanning the timeline week
        Events.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Client Meeting",
            StartTime = new DateTime(2024, 3, 25, 10, 0, 0),
            EndTime = new DateTime(2024, 3, 25, 11, 0, 0),
            DepartmentId = 1,
            EmployeeId = 101
        });

        Events.Add(new AppointmentData
        {
            Id = 2,
            Subject = "Sprint Planning",
            StartTime = new DateTime(2024, 3, 26, 14, 0, 0),
            EndTime = new DateTime(2024, 3, 26, 15, 30, 0),
            DepartmentId = 2,
            EmployeeId = 201
        });

        Events.Add(new AppointmentData
        {
            Id = 3,
            Subject = "Marketing Review",
            StartTime = new DateTime(2024, 3, 27, 9, 0, 0),
            EndTime = new DateTime(2024, 3, 27, 10, 0, 0),
            DepartmentId = 3,
            EmployeeId = 301
        });

        Events.Add(new AppointmentData
        {
            Id = 4,
            Subject = "Quarterly Planning",
            StartTime = new DateTime(2024, 3, 28, 11, 0, 0),
            EndTime = new DateTime(2024, 3, 28, 12, 30, 0),
            DepartmentId = 1,
            EmployeeId = 102
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

    public string StartHour { get; set; }

    public string EndHour { get; set; }

    public int[] WorkDays { get; set; }

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

## Best practices

- Keep resource data models small and explicitly typed.
- Match the `field` values to the appointment model names.
- Use grouped timelines for large multi-resource calendars.
- Apply `allowMultiple` only when the user truly needs multiple resource selection.
- Prefer color and template metadata over repeated inline logic in the UI.
