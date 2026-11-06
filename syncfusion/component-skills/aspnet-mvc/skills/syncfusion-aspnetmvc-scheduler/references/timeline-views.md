# Timeline Views

## Table of Contents
1. [Timeline Day](#timeline-day)
2. [Timeline Week](#timeline-week)
3. [Timeline Month](#timeline-month)
4. [Timeline Year](#timeline-year)
5. [Resource Grouping](#resource-grouping)
6. [Header Rows](#header-rows)

## Timeline Day

Horizontal timeline display for a single day:

```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "TimelineDay" })
    .CurrentView(ScheduleView.TimelineDay)
    .Render()
```

### Configuration
```cshtml
.Views(new ScheduleViewSettings {
    Option = "TimelineDay",
    Interval = 1,
    AllowMultiSelect = true
})
```

## Timeline Week

7-day horizontal timeline:

```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "TimelineWeek" })
    .CurrentView(ScheduleView.TimelineWeek)
    .Render()
```

## Timeline Month

Monthly horizontal timeline view:

```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "TimelineMonth" })
    .CurrentView(ScheduleView.TimelineMonth)
    .Render()
```

## Timeline Year

Yearly timeline display:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .Views(view => {
        view.Option(View.TimelineYear).Add();
    })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

## Resource Grouping

Group appointments by resources in timeline:

```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "TimelineDay", "TimelineWeek" })
    .CurrentView(ScheduleView.TimelineDay)
    .Resources(new ScheduleResources {
        DataSource = ViewBag.resourceData,
        TextField = "Text",
        IdField = "Id",
        GroupIdField = "GroupId",
        AllowMultiple = false
    })
    .Group(new ScheduleGroup { 
        Resources = new string[] { "Rooms" },
        ByGroupId = true
    })
    .Render()
```

### Multi-Level Resource Grouping

```cshtml
.Group(new ScheduleGroup {
    Resources = new string[] { "Departments", "Employees" }
})
```

## Header Rows

Add custom header rows above timeline:

```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "TimelineWeek" })
    .HeaderRows(new ScheduleHeaderRow {
        Option = HeaderRowOption.Week,
        Template = "#weekTemplate"
    })
    .Render()
```

```html
<script id="weekTemplate" type="text/x-template">
    <div class="e-header-text">${getWeekText(data.startDate, data.endDate)}</div>
</script>
```

### Header Row Options
- `Year`: Show year grouping
- `Month`: Show month grouping
- `Week`: Show week grouping
- `Date`: Show date grouping

### Multiple Header Rows

```cshtml
.HeaderRows(new ScheduleHeaderRow[] {
    new ScheduleHeaderRow { Option = HeaderRowOption.Year },
    new ScheduleHeaderRow { Option = HeaderRowOption.Month },
    new ScheduleHeaderRow { Option = HeaderRowOption.Week }
})
```
