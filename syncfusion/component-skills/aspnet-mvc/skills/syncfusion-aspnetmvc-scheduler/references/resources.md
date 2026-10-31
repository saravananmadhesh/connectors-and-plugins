# Resources

## Table of Contents
1. [Resource Basics](#resource-basics)
2. [Resource Fields](#resource-fields)
3. [Single-Level Grouping](#single-level-grouping)
4. [Multi-Level Grouping](#multi-level-grouping)
5. [Vertical Grouping](#vertical-grouping)
6. [Timeline Grouping](#timeline-grouping)

## Resource Basics

Define resources like rooms, employees, or equipment:

```csharp
public ActionResult Index() {
    var resources = new List<ResourceModel> {
        new ResourceModel { Id = 1, Text = "Room A", GroupId = 1 },
        new ResourceModel { Id = 2, Text = "Room B", GroupId = 1 }
    };
    ViewBag.resourceData = resources;
    return View();
}
```

## Resource Fields

Configure resource properties:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Group(group => group.Resources(ViewBag.Resources))
    .Resources(res => {
        res.DataSource(ViewBag.Owners)
        .Field("OwnerId")
        .Title("Owners")
        .Name("Owners")
        .TextField("text")
        .IdField("id")
        .ColorField("color")
        .Add();
    })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 4, 1))
    .Render()
)
```

### Resource Model
```csharp
public class ResourceModel {
    public int Id { get; set; }
    public string Text { get; set; }
    public int GroupId { get; set; }
    public string Color { get; set; }
}
```

## Single-Level Grouping

Group appointments by one resource dimension:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Group(group => group.Resources(ViewBag.Resources))
    .Resources(res => {
        res.AllowMultiple(true).DataSource(ViewBag.Owners).Field("OwnerId").Title("Owner").Name("Owners").TextField("OwnerText").IdField("Id").ColorField("OwnerColor").Add();
    })
    .Views(view => {
        view.Option(View.Week).Add();
        view.Option(View.Month).Add();
        view.Option(View.TimelineWeek).Add();
        view.Option(View.TimelineMonth).Add();
        view.Option(View.Agenda).Add();
    })
    .EventSettings(e => e.DataSource(ViewBag.datasource))
    .SelectedDate(new DateTime(2018, 4, 1))
    .Render()
)
```

### View Rendering
- Each resource gets its own column (vertical) or row (timeline)
- Users select resource when creating appointments

## Multi-Level Grouping

Group by multiple resource dimensions:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Group(group => group.ByGroupID(false).Resources(ViewBag.Resources))
    .Resources(res => {
        res.DataSource(ViewBag.Projects).Field("ProjectId").Title("Choose Project").Name("Projects").TextField("text").IdField("id").ColorField("color").Add();
        res.AllowMultiple(true).DataSource(ViewBag.Categories).Field("CategoryId").Title("Category").Name("Categories").TextField("text").IdField("id").ColorField("color").Add();
    })
    .Views(view =>  { 
        view.Option(View.Week).Add();
        view.Option(View.Month).Add();
        view.Option(View.Agenda).Add();
    })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 4, 1))
    .Render()
)
```

## Vertical Grouping

Resources displayed as columns in vertical views:

```cshtml
@Html.EJS().Schedule("Schedule")
    .Views(new string[] { "Day", "Week", "WorkWeek" })
    .Group(new ScheduleGroup {
        Resources = new string[] { "Rooms" },
        GroupOrientation = GroupOrientation.Vertical
    })
    .Render()
```

## Timeline Grouping

Resources displayed as rows in timeline views:

```cshtml
@Html.EJS().Schedule("Schedule")
    .Views(new string[] { "TimelineDay", "TimelineWeek" })
    .Group(new ScheduleGroup {
        Resources = new string[] { "Rooms" },
        GroupOrientation = GroupOrientation.Horizontal
    })
    .Render()
```

### Timeline Multi-Resource

```cshtml
.Group(new ScheduleGroup {
    Resources = new string[] { "Departments", "Employees" },
    GroupOrientation = GroupOrientation.Horizontal
})
```
