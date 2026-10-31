# Timeline & Markers – Syncfusion ASP.NET MVC Gantt Chart

## Table of Contents
- [Timeline Overview](#timeline-overview)
- [Timeline View Modes](#timeline-view-modes)
- [Timeline Tier Configuration](#timeline-tier-configuration)
- [Combining Timeline Cells](#combining-timeline-cells)
- [Custom Formatter Function](#custom-formatter-function)
- [Timeline Cell Width](#timeline-cell-width)
- [Week Start Day](#week-start-day)
- [Automatic Timescale Update](#automatic-timescale-update)
- [View Start and End Dates](#view-start-and-end-dates)
- [Timeline Cell Tooltip](#timeline-cell-tooltip)
- [Show or Hide Weekends](#show-or-hide-weekends)
- [Timeline Template](#timeline-template)
- [Infinite Timeline Scrolling](#infinite-timeline-scrolling)
- [Zoom Levels](#zoom-levels)
- [Zoom by External Buttons](#zoom-by-external-buttons)
- [Custom Zooming Levels](#custom-zooming-levels)
- [Event Markers](#event-markers)
- [Holidays](#holidays)

---

## Timeline Overview

The timeline (X-axis of the chart section) has two tiers: top and bottom. Each tier shows a different time scale (e.g., month on top, week on bottom). The timeline renders from the project's earliest task start date to the latest end date.

Key `TimelineSettings` properties:

| Property | Description |
|---|---|
| `TimelineViewMode` | Preset timeline configuration: `Hour`, `Day`, `Week`, `Month`, `Year` |
| `TimelineUnitSize` | Width in pixels of each bottom-tier cell (default: `33`) |
| `WeekStartDay` | Day index (0=Sunday … 6=Saturday) for the start of a week (default: `0`) |
| `UpdateTimescaleView` | When `true` (default), timeline auto-extends when tasks move beyond project boundaries |
| `ShowTooltip` | When `true` (default), hovering a timeline cell shows a tooltip with the date |
| `ShowWeekend` | When `false`, weekend columns are hidden from the timeline |
| `ViewStartDate` | Locks the visible timeline start independent of `ProjectStartDate` |
| `ViewEndDate` | Locks the visible timeline end independent of `ProjectEndDate` |

---

## Timeline View Modes

`TimelineViewMode` sets both tiers to a preset unit pair:

| Mode | Top Tier | Bottom Tier |
|---|---|---|
| `Hour` | Hour | Minute |
| `Day` | Day | Hour |
| `Week` | Week | Day |
| `Month` | Month | Week (default) |
| `Year` | Year | Month |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.TimelineViewMode(Syncfusion.EJ2.Gantt.TimelineViewMode.Week))
    .Render()
```

For `Day` mode (hour-level tasks), set `DurationUnit` and `DateFormat` accordingly:

```cshtml
@Html.EJS().Gantt("gantt")
    .DurationUnit(Syncfusion.EJ2.Gantt.DurationUnit.Hour)
    .DateFormat("M/d/yyyy hh:mm:ss tt")
    .TimelineSettings(ts => ts.TimelineViewMode(Syncfusion.EJ2.Gantt.TimelineViewMode.Day))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Render()
```

---

## Timeline Tier Configuration

Customize top and bottom tier display format and unit:

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts
        .TopTier(tt => tt
            .Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month)
            .Format("MMM yyyy")
            .Count(1)
        )
        .BottomTier(bt => bt
            .Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Week)
            .Format("dd MMM")
            .Count(1)
        )
    )
    .Render()
```

**Available `TimelineViewMode` units:**

| Unit | Description |
|---|---|
| `Hour` | Each cell = 1 hour |
| `Day` | Each cell = 1 day |
| `Week` | Each cell = 1 week |
| `Month` | Each cell = 1 month |
| `Year` | Each cell = 1 year |

**Useful format strings:**

| Format | Output |
|---|---|
| `"MMM yyyy"` | Apr 2024 |
| `"dd MMM"` | 02 Apr |
| `"W"` | W14 (week number) |
| `"yMd"` | 4/2/2024 |
| `"EEEE dd"` | Tuesday 02 |

**`Count` property:** Combines multiple units into one cell. E.g., `Count(2)` with `Week` makes each cell span 2 weeks.

---

## Combining Timeline Cells

Use `Count` on the bottom tier to merge multiple units into one cell. The top tier width is calculated automatically based on the bottom tier cell width.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2019, 1, 1))
    .ProjectEndDate(new DateTime(2019, 12, 30))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts
        .TimelineUnitSize(200)
        .TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Year))
        .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month).Count(6).Format("MMM"))
    )
    .Render()
```

> `Count(6)` on the bottom tier groups every 6 months into a single cell, producing a bi-annual bottom tier under an annual top tier.

---

## Custom Formatter Function

Use the `Formatter` property to point to a JavaScript function that returns a custom string for each cell date. This enables fully arbitrary cell labels such as fiscal quarters.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2019, 1, 1))
    .ProjectEndDate(new DateTime(2019, 12, 30))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts
        .TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month).Count(3).Formatter("formatter"))
        .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month).Format("MMM"))
    )
    .Render()

<script>
var formatter = function (date) {
    var month = date.getMonth();
    if (month >= 0 && month <= 2) return 'Q1';
    else if (month >= 3 && month <= 5) return 'Q2';
    else if (month >= 6 && month <= 8) return 'Q3';
    else return 'Q4';
};
</script>
```

> The `Formatter` attribute accepts the **name** of a JavaScript function. The function receives a `Date` object and must return a string.

---

## Timeline Cell Width

Control the width (in pixels) of bottom-tier cells using `TimelineUnitSize`. Top-tier cell widths are calculated automatically.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.TimelineUnitSize(150))
    .Render()
```

> Default `TimelineUnitSize` is `33` px. Increasing this value provides more horizontal space per cell — useful when bottom-tier labels are long.

---

## Week Start Day

Customize which day is treated as the first day of the week using `WeekStartDay`. The value is a numeric day index.

| Value | Day |
|---|---|
| `0` (default) | Sunday |
| `1` | Monday |
| `2` | Tuesday |
| `3` | Wednesday |
| `4` | Thursday |
| `5` | Friday |
| `6` | Saturday |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.TimelineViewMode(Syncfusion.EJ2.Gantt.TimelineViewMode.Week).WeekStartDay(1))
    .Render()
```

---

## Automatic Timescale Update

By default (`UpdateTimescaleView(true)`), the timeline automatically extends when tasks are moved beyond the current project start/end date range. Set to `false` to lock the timeline to the original range.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.UpdateTimescaleView(false))
    .Render()
```

---

## View Start and End Dates

`ViewStartDate` and `ViewEndDate` lock the **visible portion** of the timeline to a specific range, independent of `ProjectStartDate`/`ProjectEndDate`. Useful for focusing on a sprint window without changing project boundaries.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2019, 3, 31))
    .ProjectEndDate(new DateTime(2019, 4, 30))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").ParentID("ParentID"))
    .TimelineSettings(ts => ts
        .ViewStartDate(new DateTime(2019, 4, 3))
        .ViewEndDate(new DateTime(2019, 4, 7))
    )
    .Render()
```

> `ZoomToFit` uses `ProjectStartDate` and `ProjectEndDate` — not `ViewStartDate`/`ViewEndDate` — to fit the full project in the viewport.

---

## Timeline Cell Tooltip

Enable or disable the hover tooltip on timeline cells using `ShowTooltip`. Default is `true`.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.ShowTooltip(false))
    .Render()
```

---

## Show or Hide Weekends

Control weekend column visibility in the timeline using `ShowWeekend`. Set to `false` to display only working days.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .TimelineSettings(ts => ts.ShowWeekend(false))
    .Render()
```

**Known limitations of `ShowWeekend(false)`:**
- Baselines are not supported
- Incompatible with Manual task mode
- Non-working hours are not excluded from the visible timeline
- Holidays are not automatically excluded

---

## Timeline Template

Customize the HTML rendered inside timeline header cells using the `TimelineTemplate` property. Reference a `type="text/x-jsrender"` script block by its `id`.

**Template context variables:**

| Variable | Description |
|---|---|
| `date` | JavaScript `Date` object for the cell |
| `value` | Pre-formatted string label for the cell |
| `tier` | `"topTier"` or `"bottomTier"` — which row the cell belongs to |

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2024, 3, 31))
    .ProjectEndDate(new DateTime(2024, 4, 23))
    .TaskFields(tf => tf
        .Id("TaskId").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").Child("SubTasks")
    )
    .TimelineSettings(ts => ts
        .TimelineUnitSize(100)
        .TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Week).Format("MMM dd, y"))
        .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Day))
    )
    .TimelineTemplate("#TimelineTemplates")
    .Render()

<script type="text/x-jsrender" id="TimelineTemplates">
    ${if(tier == 'topTier')}
    <div class="e-header-cell-label e-gantt-top-cell-text"
         style="width:100%; background-color:#FBF9F1; font-weight:bold; height:100%;
                display:flex; justify-content:center; align-items:center;" title="${date}">
        <div>${value}</div>
    </div>
    ${/if}
    ${if(tier == 'bottomTier')}
    <div class="e-header-cell-label e-gantt-top-cell-text"
         style="width:100%; background-color:${bgColor(value,date)}; text-align:center;
                height:100%; display:flex; align-items:center; font-weight:bold; justify-content:center;"
         title="${date}">
        ${holidayValue(value, date)}
    </div>
    ${/if}
</script>

<script>
const holidayValue = (value, date) => {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    const parsedDate = new Date(date);
    for (let i = 0; i < ganttObj.holidays.length; i++) {
        const holiday = ganttObj.holidays[i];
        if (parsedDate >= new Date(holiday.from) && parsedDate <= new Date(holiday.to)) {
            return parsedDate.toLocaleDateString('en-US', { weekday: 'short' }).toLocaleUpperCase();
        }
    }
    return value;
};
const bgColor = (value, date) => {
    if (value === 'S') return '#7BD3EA';
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    const parsedDate = new Date(date);
    for (let i = 0; i < ganttObj.holidays.length; i++) {
        const holiday = ganttObj.holidays[i];
        if (parsedDate >= new Date(holiday.from) && parsedDate <= new Date(holiday.to)) return '#97E7E1';
    }
    return '#E0FBE2';
};
</script>
```

> Use `${if(tier == 'topTier')}` / `${if(tier == 'bottomTier')}` conditionals to render different HTML for each tier row.

---

## Infinite Timeline Scrolling

The `EnableInfiniteTimelineScroll` property enables infinite horizontal scrolling in the Gantt Chart timeline by dynamically extending the visible timeline range as the user navigates. Set `EnableInfiniteTimelineScroll` to **true** to enable this behavior.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Height("430px")
    .EnableInfiniteTimelineScroll(true)
    .TreeColumnIndex(1)
    .GridLines(Syncfusion.EJ2.Gantt.GridLine.Both)
    .TaskFields(tf => tf
        .Id("TaskID").Name("TaskName").StartDate("StartDate").EndDate("EndDate")
        .Duration("Duration").Progress("Progress").Dependency("Predecessor").ParentID("ParentID")
    )
    .SplitterSettings(ss => ss.ColumnIndex(3))
    .TimelineSettings(ts => ts
        .ViewStartDate(new DateTime(2025, 12, 29))
        .ViewEndDate(new DateTime(2026, 4, 27))
    )
    .LabelSettings(ls => ls.LeftLabel("TaskID").RightLabel("TaskName"))
    .Columns(col =>
    {
        col.Field("TaskID").Width(80).Add();
        col.Field("TaskName").HeaderText("Job Name").Width(250)
            .ClipMode(Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip).Add();
        col.Field("StartDate").Add();
        col.Field("Duration").Add();
        col.Field("Progress").Add();
        col.Field("Predecessor").Add();
    })
    .Render()
```

**Controller Example:**

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(ganttData());
        }

        public static List<GanttDataSource> ganttData()
        {
            return new List<GanttDataSource>()
            {
                new GanttDataSource{ TaskID=1, TaskName="Project kickoff & planning", StartDate=new DateTime(2026,1,1), EndDate=new DateTime(2026,1,10) },
                new GanttDataSource{ TaskID=2, TaskName="Requirement gathering", StartDate=new DateTime(2026,1,1), Duration=5, Progress=100, ParentID=1 },
                new GanttDataSource{ TaskID=3, TaskName="Scope finalization", StartDate=new DateTime(2026,1,6), Duration=4, Predecessor="2", ParentID=1 },
                new GanttDataSource{ TaskID=4, TaskName="Design phase", StartDate=new DateTime(2026,1,11), EndDate=new DateTime(2026,1,31) },
                new GanttDataSource{ TaskID=5, TaskName="UI/UX design", StartDate=new DateTime(2026,1,11), Duration=10, ParentID=4 },
                new GanttDataSource{ TaskID=6, TaskName="Architecture setup", StartDate=new DateTime(2026,1,15), Duration=12, ParentID=4 },
                new GanttDataSource{ TaskID=7, TaskName="Development phase", StartDate=new DateTime(2026,2,1), EndDate=new DateTime(2026,12,15) },
                new GanttDataSource{ TaskID=8, TaskName="Frontend development", StartDate=new DateTime(2026,2,1), Duration=120, Progress=60, ParentID=7 },
                new GanttDataSource{ TaskID=9, TaskName="Backend development", StartDate=new DateTime(2026,2,5), Duration=140, Progress=55, ParentID=7 },
                new GanttDataSource{ TaskID=10, TaskName="API integration", StartDate=new DateTime(2026,8,1), Duration=60, Predecessor="8,9", ParentID=7 },
                new GanttDataSource{ TaskID=11, TaskName="Testing & bug fixing", StartDate=new DateTime(2026,12,16), EndDate=new DateTime(2027,1,31) },
                new GanttDataSource{ TaskID=12, TaskName="Unit testing", StartDate=new DateTime(2026,12,16), Duration=20, ParentID=11 },
                new GanttDataSource{ TaskID=13, TaskName="Integration testing", StartDate=new DateTime(2027,1,5), Duration=20, Predecessor="10", ParentID=11 },
                new GanttDataSource{ TaskID=14, TaskName="Release", StartDate=new DateTime(2027,2,1), EndDate=new DateTime(2027,2,15) },
                new GanttDataSource{ TaskID=15, TaskName="Beta release", StartDate=new DateTime(2027,2,1), Duration=5, ParentID=14 },
                new GanttDataSource{ TaskID=16, TaskName="Production deployment", StartDate=new DateTime(2027,2,10), Duration=2, Predecessor="15", ParentID=14 }
            };
        }
    }

    public class GanttDataSource
    {
        public int TaskID { get; set; }
        public string TaskName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Duration { get; set; }
        public int? Progress { get; set; }
        public string Predecessor { get; set; }
        public int? ParentID { get; set; }
    }
}
```

---

## Zoom Levels

Control default zoom and available zoom range:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .ZoomingLevels(zl =>
    {
        zl.TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Year).Format("yyyy").Count(1))
          .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month).Format("MMM").Count(1))
          .Add();
        zl.TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Month).Format("MMM yyyy").Count(1))
          .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Week).Format("dd").Count(1))
          .Add();
        zl.TopTier(tt => tt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Week).Format("dd MMM").Count(1))
          .BottomTier(bt => bt.Unit(Syncfusion.EJ2.Gantt.TimelineViewMode.Day).Format("EEE dd").Count(1))
          .Add();
    })
    .Toolbar(new List<string> { "ZoomIn", "ZoomOut", "ZoomToFit" })
    .Render()
```

Zoom programmatically:

```javascript
var gantt = document.getElementById('gantt').ej2_instances[0];
gantt.zoomIn();
gantt.zoomOut();
gantt.fitToProject();   // ZoomToFit
```

**Toolbar zoom item behaviours:**

| Item | Behaviour |
|---|---|
| `ZoomIn` | Increases timeline detail level — unit changes from coarser to finer |
| `ZoomOut` | Decreases detail level — unit changes from finer to coarser |
| `ZoomToFit` | Adjusts zoom so all tasks fit within the visible chart width |

---

## Zoom by External Buttons

Invoke `zoomIn()`, `zoomOut()`, and `fitToProject()` methods from external button clicks:

```cshtml
<button onclick="onZoomIn()">ZoomIn</button>
<button onclick="onZoomOut()">ZoomOut</button>
<button onclick="onFitToProject()">FitToProject</button>

@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2019, 3, 24))
    .ProjectEndDate(new DateTime(2019, 4, 28))
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .Render()

<script>
function onZoomIn() {
    document.getElementById('gantt').ej2_instances[0].zoomIn();
}
function onZoomOut() {
    document.getElementById('gantt').ej2_instances[0].zoomOut();
}
function onFitToProject() {
    document.getElementById('gantt').ej2_instances[0].fitToProject();
}
</script>
```

---

## Custom Zooming Levels

Override the default zoom level sequence by assigning a custom array to `ganttObj.zoomingLevels` inside the `DataBound` event. Each level is a plain JavaScript object.

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .ProjectStartDate(new DateTime(2019, 3, 24))
    .ProjectEndDate(new DateTime(2019, 4, 28))
    .DataBound("dataBound")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Dependency("Predecessor").Child("SubTasks"))
    .Toolbar(new List<string> { "ZoomIn", "ZoomOut", "ZoomToFit" })
    .Render()

<script>
var customZoomingLevels = [
    {
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 },
        timelineUnitSize: 33, level: 0, timelineViewMode: 'Month',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 },
        timelineUnitSize: 66, level: 1, timelineViewMode: 'Month',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 },
        timelineUnitSize: 33, level: 2, timelineViewMode: 'Week',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 },
        timelineUnitSize: 66, level: 3, timelineViewMode: 'Day',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    }
];

function dataBound() {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    ganttObj.zoomingLevels = customZoomingLevels;
}
</script>
```

**Required properties for each zoom level object:**

| Property | Description |
|---|---|
| `topTier` | Object with `unit`, `format`, `count` for the top tier |
| `bottomTier` | Object with `unit`, `format`, `count` for the bottom tier |
| `timelineUnitSize` | Bottom-tier cell width in pixels for this level |
| `level` | Numeric index (0 = most zoomed out) |
| `timelineViewMode` | Preset view mode string for this level |
| `weekStartDay` | Day index for the start of a week (0 = Sunday) |
| `updateTimescaleView` | `true` to allow timeline to auto-extend |
| `weekendBackground` | CSS color string for weekend cells, or `null` for the default |
| `showTooltip` | `true` to show hover tooltip on timeline cells |

> Custom zoom levels are assigned only via JavaScript in `dataBound`. Levels must be ordered from most zoomed-out (lowest `level` index) to most zoomed-in.

---

## Event Markers

Event markers highlight important project dates (e.g., deadlines, releases) with a vertical line on the chart:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .EventMarkers(em =>
    {
        em.Day(new DateTime(2024, 4, 15)).Label("Sprint Review").CssClass("e-custom-marker").Add();
        em.Day(new DateTime(2024, 5, 1)).Label("Release v1.0").Add();
    })
    .Render()
```

**EventMarker properties:**

| Property | Description |
|---|---|
| `Day` | The date to mark (required — missing triggers `ActionFailure`) |
| `Label` | Text shown on the marker line |
| `CssClass` | Custom CSS class for styling |

**Custom styling:**

```css
.e-custom-marker .e-gantt-eventmarker-header {
    color: #d32f2f;
    border-left-color: #d32f2f;
}
```

---

## Holidays

Highlight non-working holiday dates on the timeline:

```cshtml
@Html.EJS().Gantt("gantt")
    .TaskFields(tf => tf.Id("TaskId").Name("TaskName").StartDate("StartDate").Duration("Duration").Child("SubTasks"))
    .Holidays(h =>
    {
        h.From(new DateTime(2024, 4, 14)).To(new DateTime(2024, 4, 14)).Label("Good Friday").CssClass("e-holiday").Add();
        h.From(new DateTime(2024, 5, 27)).To(new DateTime(2024, 5, 27)).Label("Memorial Day").Add();
        h.From(new DateTime(2024, 12, 25)).To(new DateTime(2024, 12, 26)).Label("Christmas").Add();  // multi-day
    })
    .Render()
```

**Holiday properties:**

| Property | Description |
|---|---|
| `From` | Holiday start date |
| `To` | Holiday end date (same as From for single day) |
| `Label` | Holiday name shown on chart |
| `CssClass` | Custom CSS class for the highlighted region |

Holidays are displayed as shaded columns on the chart. Tasks are not scheduled on holidays in Auto mode.

---
