# Data Binding and Timeline Resources in ASP.NET Core Scheduler

## Table of Contents
- [Local Resource Data](#local-resource-data)
- [Remote Resource Data](#remote-resource-data)
- [Timeline Views with Resources](#timeline-views-with-resources)
- [Resource Header Template](#resource-header-template)
- [Best Practices](#best-practices)

## Local Resource Data

Bind resources from a local collection in the page model.

```cshtml
@{
    string[] resources = new string[] { "Rooms" };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="RoomId"
            title="Room"
            name="Rooms"
            dataSource="@Model.RoomCollection"
            idField="Id"
            textField="Name">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

## Remote Resource Data

Use `DataManager` to lazy-load resources from an API or OData endpoint.

```cshtml
@{
    string[] resources = new string[] { "Employees" };
    var remoteData = new Syncfusion.EJ2.DataManager() {
        Url = "/api/resources/employees",
        Adaptor = "UrlAdaptor"
    };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@remoteData"
            idField="Id"
            textField="Name"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```csharp
[ApiController]
[Route("api/resources")]
public class ResourcesController : ControllerBase
{
    [HttpGet("employees")]
    public IActionResult GetEmployees()
    {
        var employees = new List<object>
        {
            new { Id = 101, Name = "John Smith", Color = "#FF6B6B" },
            new { Id = 102, Name = "Sarah Johnson", Color = "#FF8C42" },
            new { Id = 103, Name = "Mike Davis", Color = "#4ECDC4" }
        };
        return Ok(employees);
    }
}
```

OData example:

```cshtml
@{
    string[] resources = new string[] { "Employees" };
    var odataData = new Syncfusion.EJ2.DataManager() {
        Url = "https://services.odata.org/V4/Northwind/Northwind.svc/Employees",
        Adaptor = "ODataV4Adaptor"
    };
}

<ejs-schedule id="schedule" width="100%" height="550px">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource
            field="EmployeeId"
            title="Employee"
            name="Employees"
            dataSource="@odataData"
            idField="EmployeeID"
            textField="FirstName">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

## Timeline Views with Resources

Render resources as columns in timeline layouts.

```cshtml
@{
    string[] resources = new string[] { "Rooms" };
    var currentDate = new DateTime(2024, 3, 28);
}

<ejs-schedule id="schedule" width="100%" height="550px" currentView="TimelineDay" selectedDate="currentDate">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
        <e-schedule-view option="TimelineMonth"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-resources>
        <e-schedule-resource
            field="RoomId"
            title="Meeting Room"
            name="Rooms"
            dataSource="@Model.RoomCollection"
            idField="Id"
            textField="Name"
            colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@Model.Events"></e-schedule-eventsettings>
</ejs-schedule>
```

```cshtml
@{
    string[] resources = new string[] { "Departments", "Employees" };
    var currentDate = new DateTime(2024, 3, 25);
}

<ejs-schedule id="schedule" width="100%" height="550px" currentView="TimelineWeek" selectedDate="currentDate">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-views>
        <e-schedule-view option="TimelineWeek"></e-schedule-view>
    </e-schedule-views>
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

## Resource Header Template

Customize resource headers with a template and `resourceData` context.

```cshtml
@{
    string[] resources = new string[] { "Employees" };
    var currentDate = new DateTime(2024, 3, 28);
}

<ejs-schedule id="schedule"
              width="100%"
              height="550px"
              currentView="TimelineDay"
              selectedDate="currentDate"
              resourceHeaderTemplate="#resourceTemplate">
    <e-schedule-group resources="@resources"></e-schedule-group>
    <e-schedule-views>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
    </e-schedule-views>
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

<script id="resourceTemplate" type="text/x-template">
    <div class="resource-header">
        <div class="header-avatar" style="background:${resourceData.Color}">${resourceData.Name[0]}</div>
        <div class="header-details">
            <div class="header-name">${resourceData.Name}</div>
            <div class="header-email">${resourceData.Email}</div>
        </div>
    </div>
</script>
````


## Best Practices

1. Use layered grouping when resource structure is hierarchical.
2. Keep resource data models consistent with field names.
3. Prefer timeline views for large multi-resource schedules.
4. Load remote resources only when needed for performance.
5. Use header templates to surface staff or room details in compact layouts.
