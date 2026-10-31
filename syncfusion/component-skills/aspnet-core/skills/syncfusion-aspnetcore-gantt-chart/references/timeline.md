````markdown
# Timeline — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Timeline View Modes](#timeline-view-modes)
- [Week Timeline Mode](#week-timeline-mode)
- [Month Timeline Mode](#month-timeline-mode)
- [Year Timeline Mode](#year-timeline-mode)
- [Day Timeline Mode](#day-timeline-mode)
- [Hour Timeline Mode](#hour-timeline-mode)
- [Top Tier and Bottom Tier](#top-tier-and-bottom-tier)
- [Combining Timeline Cells](#combining-timeline-cells)
- [Format Timeline Cell Values](#format-timeline-cell-values)
- [Custom Formatter Function](#custom-formatter-function)
- [Timeline Cell Width](#timeline-cell-width)
- [Week Start Day](#week-start-day)
- [Automatic Timescale Update](#automatic-timescale-update)
- [View Start and End Dates](#view-start-and-end-dates)
- [Timeline Cell Tooltip](#timeline-cell-tooltip)
- [Show or Hide Weekends](#show-or-hide-weekends)
- [Timeline Template](#timeline-template)
- [Infinite Timeline Scrolling](#infinite-timeline-scrolling)
- [Zooming with Toolbar](#zooming-with-toolbar)
- [Zoom by External Buttons](#zoom-by-external-buttons)
- [Custom Zooming Levels](#custom-zooming-levels)

---

## Overview

The Gantt timeline header consists of two tiers — a **top tier** and a **bottom tier** — each displaying a configurable time unit and date format. The timeline spans from the earliest task start date to the latest task end date unless `projectStartDate`/`projectEndDate` or `viewStartDate`/`viewEndDate` are specified.

Key properties on `<e-gantt-timelinesettings>`:

| Property | Description |
|---|---|
| `timelineViewMode` | Preset timeline configuration: `Hour`, `Day`, `Week`, `Month`, `Year` |
| `timelineUnitSize` | Width in pixels of each bottom-tier cell (default: `33`) |
| `weekStartDay` | Day index (0=Sunday, 1=Monday, … 6=Saturday) for the start of a week (default: `0`) |
| `updateTimescaleView` | When `true` (default), timeline auto-extends when tasks are moved beyond project boundaries |
| `showTooltip` | When `true` (default), hovering a timeline cell shows a tooltip with the date |
| `showWeekend` | When `false`, weekend columns are hidden from the timeline |
| `viewStartDate` | Locks the visible timeline start independent of `projectStartDate` |
| `viewEndDate` | Locks the visible timeline end independent of `projectEndDate` |

---

## Timeline View Modes

`timelineViewMode` sets both tiers to a preset unit pair in a single property:

| Mode | Top Tier | Bottom Tier | Typical Use |
|---|---|---|---|
| `Hour` | Hour | Minute | Minute-level task tracking |
| `Day` | Day | Hour | Intra-day scheduling |
| `Week` | Week | Day | Short-sprint planning |
| `Month` | Month | Week | Standard project view (default) |
| `Year` | Year | Month | Long-range roadmaps |

---

## Week Timeline Mode

The top tier shows weeks and the bottom tier shows individual days.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineViewMode="Week"></e-gantt-timelinesettings>
</ejs-gantt>
```

---

## Month Timeline Mode

The top tier shows months and the bottom tier shows its corresponding weeks.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineUnitSize="80" timelineViewMode="Month"></e-gantt-timelinesettings>
</ejs-gantt>
```

---

## Year Timeline Mode

The top tier shows years and the bottom tier shows its corresponding months.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineUnitSize="80" timelineViewMode="Year"></e-gantt-timelinesettings>
</ejs-gantt>
```

---

## Day Timeline Mode

The top tier shows days and the bottom tier shows corresponding hours. Use `durationUnit="Hour"` and `dateFormat` for hour-level task data.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           durationUnit="Hour" dateFormat="M/d/yyyy hh:mm:ss tt">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineViewMode="Day"></e-gantt-timelinesettings>
</ejs-gantt>
```

---

## Hour Timeline Mode

The `Hour` mode tracks tasks in minutes scale. The top tier displays hours; the bottom tier displays minutes. Use `durationUnit="Minute"` for minute-level tasks.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           durationUnit="Minute" dateFormat="M/d/yyyy hh:mm:ss tt">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineViewMode="Hour"></e-gantt-timelinesettings>
</ejs-gantt>
```

---

## Top Tier and Bottom Tier

Configure each tier independently using `<e-timelinesettings-toptier>` and `<e-timelinesettings-bottomtier>`. Each tier accepts `unit`, `format`, `count`, and `formatter`.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings>
        <e-timelinesettings-toptier unit="Month" format="MMM"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Day"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
</ejs-gantt>
```

**Tier properties:**

| Property | Description |
|---|---|
| `unit` | Time unit for the tier: `None`, `Minute`, `Hour`, `Day`, `Week`, `Month`, `Year` |
| `format` | Date format string for cell labels (e.g., `"MMM"`, `"dd MMM"`, `"hh a"`) |
| `count` | Number of units grouped into a single cell (default: `1`) |
| `formatter` | Name of a JavaScript function that returns a custom string for each cell |

---

## Combining Timeline Cells

Use `count` on the bottom tier to merge multiple units into one cell. The top tier width is calculated automatically based on the bottom tier cell width.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           projectStartDate="01/01/2019" projectEndDate="12/30/2019">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineUnitSize="200">
        <e-timelinesettings-toptier unit="Year"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Month" count="6" format="MMM"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
</ejs-gantt>
```

> `count="6"` on the bottom tier groups every 6 months into a single cell, producing a bi-annual bottom tier under an annual top tier.

---

## Format Timeline Cell Values

Use the `format` attribute with standard date-format strings to control cell label output:

| Format string | Example output |
|---|---|
| `"MMM"` | Apr |
| `"MMM yyyy"` | Apr 2024 |
| `"dd MMM"` | 02 Apr |
| `"MMM dd, yyyy"` | Apr 02, 2024 |
| `"hh a"` | 09 AM |
| `"d"` | 2 |

---

## Custom Formatter Function

Use the `formatter` attribute to point to a JavaScript function that returns a custom string for each cell date. This enables fully arbitrary cell labels such as fiscal quarters.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px"
           projectStartDate="01/01/2019" projectEndDate="12/30/2019">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings>
        <e-timelinesettings-toptier unit="Month" count="3" formatter="formatter"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Month" format="MMM"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
</ejs-gantt>

<script>
    var formatter = function (date) {
        var month = date.getMonth();
        if (month >= 0 && month <= 2) {
            return 'Q1';
        } else if (month >= 3 && month <= 5) {
            return 'Q2';
        } else if (month >= 6 && month <= 8) {
            return 'Q3';
        } else {
            return 'Q4';
        }
    }
</script>
```

> The `formatter` attribute accepts the **name** of a JavaScript function as a string. The function receives a `Date` object and must return a string. In this example, `count="3"` groups 3 months per cell and the formatter labels each group Q1–Q4.

---

## Timeline Cell Width

Control the width (in pixels) of bottom-tier cells using `timelineUnitSize`. Top-tier cell widths are calculated automatically.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineUnitSize="150"></e-gantt-timelinesettings>
</ejs-gantt>
```

> Default `timelineUnitSize` is `33` px. Increasing this value provides more horizontal space per cell — useful when bottom-tier labels are long.

---

## Week Start Day

Customize which day is treated as the first day of the week using `weekStartDay`. The value is a numeric day index.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings timelineViewMode="Week" weekStartDay="3"></e-gantt-timelinesettings>
</ejs-gantt>
```

**`weekStartDay` values:**

| Value | Day |
|---|---|
| `0` (default) | Sunday |
| `1` | Monday |
| `2` | Tuesday |
| `3` | Wednesday |
| `4` | Thursday |
| `5` | Friday |
| `6` | Saturday |

---

## Automatic Timescale Update

By default (`updateTimescaleView="true"`), the timeline automatically extends when tasks are moved beyond the current project start/end date range. Set to `false` to lock the timeline to the original range.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings updateTimescaleView="false"></e-gantt-timelinesettings>
</ejs-gantt>
```

> When `updateTimescaleView="false"`, tasks dragged outside the visible timeline range will not cause the timeline to grow. This is useful for fixed-window project views.

---

## View Start and End Dates

`viewStartDate` and `viewEndDate` lock the **visible portion** of the timeline to a specific range, independent of `projectStartDate`/`projectEndDate`. This is useful for focusing on a sprint window without changing the project boundaries used for baselines and critical-path calculations.

```cshtml
<ejs-gantt id="GanttDefault" height="430px" dataSource="ViewBag.DataSource"
           projectStartDate="03/31/2019" projectEndDate="04/31/2019">
    <e-gantt-taskfields id="TaskID" name="TaskName" startDate="StartDate"
                        duration="Duration" progress="Progress" parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings viewStartDate="04/03/2019" viewEndDate="04/07/2019">
    </e-gantt-timelinesettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID"></e-gantt-column>
        <e-gantt-column field="TaskName"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

**`viewStartDate` / `viewEndDate` resolution rules:**

| Property set to | Behaviour |
|---|---|
| Concrete date | Timeline rendering is locked to the inclusive `[viewStartDate, viewEndDate]` range |
| `auto` (default) + `projectStartDate` set | Uses `projectStartDate` / `projectEndDate` |
| `auto` (default) + no project dates | Uses earliest task start / latest task end date; end is auto-extended to fill chart width |

> `ZoomToFit` uses `projectStartDate` and `projectEndDate` — not `viewStartDate`/`viewEndDate` — to fit the full project in the viewport.

---

## Timeline Cell Tooltip

Enable or disable the hover tooltip on timeline cells using `showTooltip`. Default is `true`.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings showTooltip="true">
    </e-gantt-timelinesettings>
</ejs-gantt>
```

> Set `showTooltip="false"` to disable the date tooltip that appears when hovering over a timeline header cell.

---

## Show or Hide Weekends

Control weekend column visibility in the timeline using `showWeekend`. Set to `false` to display only working days.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-timelinesettings showWeekend="false">
    </e-gantt-timelinesettings>
</ejs-gantt>
```

> To customize which days are treated as weekends, use the `workWeek` property.

**Known limitations of `showWeekend="false"`:**
- Baselines are not supported
- Incompatible with Manual task mode
- Non-working hours are not excluded from the visible timeline
- Holidays are not automatically excluded

---

## Timeline Template

Customize the HTML rendered inside timeline header cells using the `timelineTemplate` property. The template is a `jsrender` script block referenced by its `id`.

**Template context variables:**

| Variable | Description |
|---|---|
| `date` | JavaScript `Date` object for the cell |
| `value` | Pre-formatted string label for the cell |
| `tier` | `"topTier"` or `"bottomTier"` — which row the cell belongs to |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowSelection="true"
           treeColumnIndex="1" projectStartDate="03/31/2024" projectEndDate="04/23/2024"
           timelineTemplate="#TimelineTemplates">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" visible="false"></e-gantt-column>
        <e-gantt-column field="TaskName" width="300"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="EndDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-timelinesettings timelineUnitSize="100">
        <e-timelinesettings-toptier unit="Week" format="MMM dd, y"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Day"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
    <e-gantt-labelSettings leftLabel="TaskName"></e-gantt-labelSettings>
    <e-gantt-splittersettings columnIndex="1"></e-gantt-splittersettings>
    <e-gantt-holidays>
        <e-gantt-holiday from="04/04/2019" to="04/04/2019" label="Local Holiday"></e-gantt-holiday>
        <e-gantt-holiday from="04/19/2019" to="04/19/2019" label="Public holiday"></e-gantt-holiday>
    </e-gantt-holidays>
</ejs-gantt>

<script type="text/x-jsrender" id="TimelineTemplates">
    ${if(tier == 'topTier')}
    <div class="e-header-cell-label e-gantt-top-cell-text"
         style="width:100%; background-color:#FBF9F1; font-weight:bold; height:100%;
                display:flex; justify-content:center; align-items:center;" title="${date}">
        <div>${value}</div>
        <div style="width:20px; height:20px; padding-left:10px;">
            <img style="width:100%; height:100%;" src="${imagedate()}">
        </div>
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
        var ganttObj = document.getElementById("Gantt").ej2_instances[0];
        const parsedDate = new Date(date);
        for (let i = 0; i < ganttObj.holidays.length; i++) {
            const holiday = ganttObj.holidays[i];
            const fromDate = new Date(holiday.from);
            const toDate = new Date(holiday.to);
            if (parsedDate >= fromDate && parsedDate <= toDate) {
                return parsedDate.toLocaleDateString('en-US', { weekday: 'short' }).toLocaleUpperCase();
            }
        }
        return value;
    };
    const imagedate = () => {
        const getImage = Math.floor(Math.random() * 5) + 1;
        return "./image/" + getImage + ".svg";
    };
    const bgColor = (value, date) => {
        if (value === "S") { return "#7BD3EA"; }
        var ganttObj = document.getElementById("Gantt").ej2_instances[0];
        const parsedDate = new Date(date);
        for (let i = 0; i < ganttObj.holidays.length; i++) {
            const holiday = ganttObj.holidays[i];
            const fromDate = new Date(holiday.from);
            const toDate = new Date(holiday.to);
            if (parsedDate >= fromDate && parsedDate <= toDate) { return "#97E7E1"; }
        }
        return "#E0FBE2";
    };
</script>
```

> The `timelineTemplate` attribute on `<ejs-gantt>` must reference the `id` of a `<script type="text/x-jsrender">` block. Use `${if(tier == 'topTier')}` / `${if(tier == 'bottomTier')}` conditionals to render different HTML for each tier row.

---

## Infinite Timeline Scrolling

The Gantt Chart supports infinite timeline scrolling, allowing users to scroll horizontally through the timeline without being constrained by predefined start and end date boundaries. This feature is particularly useful for long-running projects or when you want to provide unlimited timeline exploration.

### Enabling Infinite Timeline Scrolling

Enable infinite timeline scrolling using the `enableInfiniteTimelineScroll` property on the `<ejs-gantt>` component. Set to `true` to activate this feature.

**ASP.NET Core Tag Helper:**

```cshtml
<ejs-gantt id="Gantt" 
           height="430px" 
           dataSource="Model.GanttDataSourceCollection" 
           enableInfiniteTimelineScroll="true"
           treeColumnIndex="1" 
           gridLines="Both">
    <e-gantt-taskfields id="TaskID" name="TaskName" startDate="StartDate" 
                        endDate="EndDate" duration="Duration" progress="Progress" 
                        dependency="Predecessor" parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-splittersettings columnIndex="3"></e-gantt-splittersettings>
    <e-gantt-timelinesettings viewStartDate="@(new DateTime(2025, 12, 29))"
                              viewEndDate="@(new DateTime(2026, 04, 27))">
    </e-gantt-timelinesettings>
    <e-gantt-labelsettings leftLabel="TaskID" rightLabel="TaskName"></e-gantt-labelsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID" width="80"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="Predecessor"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Key Properties and Behavior

| Property | Description |
|---|---|
| `enableInfiniteTimelineScroll` | When set to `true`, enables infinite timeline scrolling in both directions. Users can scroll left or right beyond the normal project boundaries |
| `viewStartDate` | Optional. Sets the initial visible timeline start date. Can be any date within the scrollable range |
| `viewEndDate` | Optional. Sets the initial visible timeline end date. Can be any date within the scrollable range |
| `gridLines` | Set to `Both` to display both vertical and horizontal grid lines for better readability in infinite scroll mode |

---

## Zooming with Toolbar

Add `ZoomIn`, `ZoomOut`, and `ZoomToFit` toolbar items to enable interactive timeline zooming.

```cshtml
<ejs-gantt id='GanttZooming' dataSource="ViewBag.dataSource" height="450px"
           projectStartDate="03/24/2019" projectEndDate="04/28/2019"
           toolbar="@(new List<string>() { "ZoomIn", "ZoomOut", "ZoomToFit" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings leftLabel="TaskName"></e-gantt-labelSettings>
</ejs-gantt>
```

**Toolbar zoom item behaviours:**

| Item | Behaviour |
|---|---|
| `ZoomIn` | Increases timeline detail level — bottom-tier cell width grows, and unit changes from coarser to finer (e.g., Month → Week → Day) when the cell exceeds the defined range |
| `ZoomOut` | Decreases detail level — cell width shrinks and unit changes from finer to coarser (e.g., Day → Week → Month) when the cell falls below the defined range |
| `ZoomToFit` | Adjusts zoom so all tasks fit within the visible chart width using `projectStartDate` / `projectEndDate` |

---

## Zoom by External Buttons

Invoke `zoomIn()`, `zoomOut()`, and `fitToProject()` methods programmatically from external button clicks.

```cshtml
<ejs-button id="zoomIn" content="ZoomIn" cssClass="e-primary"></ejs-button>
<ejs-button id="zoomOut" content="ZoomOut" cssClass="e-primary"></ejs-button>
<ejs-button id="fitToProject" content="FitToProject" cssClass="e-primary"></ejs-button>

<ejs-gantt id='GanttZooming' dataSource="ViewBag.dataSource" height="450px"
           projectStartDate="03/24/2019" projectEndDate="04/28/2019">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings leftLabel="TaskName"></e-gantt-labelSettings>
</ejs-gantt>

<script>
    var ganttObj = document.getElementById('GanttZooming').ej2_instances[0];
    document.getElementById('zoomIn').addEventListener('click', function () {
        ganttObj.zoomIn();
    });
    document.getElementById('zoomOut').addEventListener('click', function () {
        ganttObj.zoomOut();
    });
    document.getElementById('fitToProject').addEventListener('click', function () {
        ganttObj.fitToProject();
    });
</script>
```

> The Gantt instance must be retrieved **after** the component has rendered. Place the `getElementById` call inside a `load` / `dataBound` event handler or at the bottom of the page if using inline script.

---

## Custom Zooming Levels

Override the default zoom level sequence by assigning a custom array to `ganttObj.zoomingLevels` inside the `dataBound` event. Each level is a plain JavaScript object.

```cshtml
<ejs-gantt id='GanttZooming' dataSource="ViewBag.dataSource" height="450px"
           dataBound="DataBound"
           projectStartDate="03/24/2019" projectEndDate="04/28/2019"
           toolbar="@(new List<string>() { "ZoomIn", "ZoomOut", "ZoomToFit" })">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate"
                        duration="Duration" progress="Progress"
                        dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-labelSettings leftLabel="TaskName"></e-gantt-labelSettings>
</ejs-gantt>

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
        topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 },
        timelineUnitSize: 99, level: 2, timelineViewMode: 'Month',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 },
        timelineUnitSize: 33, level: 3, timelineViewMode: 'Week',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 },
        timelineUnitSize: 66, level: 4, timelineViewMode: 'Week',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 },
        timelineUnitSize: 66, level: 5, timelineViewMode: 'Day',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 6 },
        timelineUnitSize: 99, level: 6, timelineViewMode: 'Day',
        weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    }
];

function DataBound() {
    var ganttObj = document.getElementById("GanttZooming").ej2_instances[0];
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
| `level` | Numeric index (0 = most zoomed out shown first when zooming in from zoom-out) |
| `timelineViewMode` | Preset view mode string for this level (`'Month'`, `'Week'`, `'Day'`, etc.) |
| `weekStartDay` | Day index for the start of a week (0 = Sunday) |
| `updateTimescaleView` | `true` to allow timeline to auto-extend when tasks move beyond range |
| `weekendBackground` | CSS color string for weekend cells, or `null` for the default |
| `showTooltip` | `true` to show the hover tooltip on timeline cells |

> Custom zoom levels are assigned only via JavaScript in `dataBound` — there is no server-side C# collection for `zoomingLevels`. Levels must be ordered from most zoomed-out (lowest `level` index) to most zoomed-in.

````