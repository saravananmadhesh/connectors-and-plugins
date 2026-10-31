# Timeline

## Table of Contents
- [Timeline Overview](#timeline-overview)
- [Top Tier and Bottom Tier](#top-tier-and-bottom-tier)
- [Available Time Units](#available-time-units)
- [Custom Tier Formatting](#custom-tier-formatting)
- [Timeline Unit Size](#timeline-unit-size)
- [Zooming](#zooming)
- [Fit to Project](#fit-to-project)
- [Timeline View Modes](#timeline-view-modes)
- [Fixed View Date Range](#fixed-view-date-range)
- [Week Start Day](#week-start-day)
- [Auto-Update Timescale](#auto-update-timescale)
- [Timeline Cell Tooltip](#timeline-cell-tooltip)
- [Show / Hide Weekends](#show--hide-weekends)
- [Timeline Cell Template](#timeline-cell-template)
- [Infinite Timeline Scrolling](#infinite-timeline-scrolling)

## Timeline Overview

The Gantt timeline header sits above the chart panel. It is split into a **top tier** (larger unit, e.g. month) and a **bottom tier** (smaller unit, e.g. day). Both tiers are configured via `timelineSettings`.

```vue
<ejs-gantt :timelineSettings="timelineSettings" ...></ejs-gantt>

<script setup>
const timelineSettings = {
  timelineUnitSize: 60,        // pixel width of each bottom-tier cell
  topTier: { unit: 'Month', format: 'MMM yyyy' },
  bottomTier: { unit: 'Day',   format: 'd',       count: 1 }
};
</script>
```

## Top Tier and Bottom Tier

Each tier object supports:

| Property | Type | Description |
|---|---|---|
| `unit` | string | Time unit — see table below |
| `format` | string | Date format string (e.g. `'MMM yyyy'`) |
| `count` | number | Number of units per cell (e.g. `7` for week-grouped days) |
| `formatter` | function | Custom cell label renderer `(date) => string` |

### Minimal example — week/day view

```js
const timelineSettings = {
  topTier:    { unit: 'Week',  format: "'Week' W", count: 1 },
  bottomTier: { unit: 'Day',   format: 'EEE d',    count: 1 }
};
```

### Quarterly top tier with monthly bottom tier

```js
const timelineSettings = {
  topTier:    { unit: 'Month', format: "QQQ yyyy", count: 3 },  // count:3 groups 3 months = quarter
  bottomTier: { unit: 'Month', format: 'MMM',      count: 1 }
};
```

## Available Time Units

| `unit` value | Typical use |
|---|---|
| `'Hour'` | Very short-range projects (days) |
| `'Day'` | Standard task-level granularity |
| `'Week'` | Medium projects (weeks/months) |
| `'Month'` | Long projects (months/quarters) |
| `'Quarter'` | Multi-year programs |
| `'Year'` | Portfolio/roadmap views |
| `'Minutes'` | Scheduling at sub-hour granularity |

## Custom Tier Formatting

Use a `formatter` function when built-in format strings are not enough:

```js
const timelineSettings = {
  topTier: {
    unit: 'Month',
    formatter: (date) => {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${months[date.getMonth()]} '${String(date.getFullYear()).slice(-2)}`;
    }
  },
  bottomTier: { unit: 'Week', format: "'W'W" }
};
```

## Timeline Unit Size

Controls how wide (in pixels) each **bottom-tier** cell is. Larger values zoom in; smaller values compress the timeline.

```js
const timelineSettings = {
  timelineUnitSize: 99   // default is 33
};
```

> **Tip:** Increase `timelineUnitSize` instead of using `Zoom In` toolbar button for a fixed zoom level on mount.

## Zooming

Add `ZoomIn`, `ZoomOut`, and `ZoomToFit` toolbar buttons plus the `Zoom` module:

```vue
<ejs-gantt
  :toolbar="['ZoomIn', 'ZoomOut', 'ZoomToFit']"
  ...
></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Toolbar, Zoom } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Toolbar, Zoom]);
</script>
```

### Programmatic zoom

```js
// Access via template ref
this.$refs.ganttRef.ej2Instances.zoomIn();
this.$refs.ganttRef.ej2Instances.zoomOut();
this.$refs.ganttRef.ej2Instances.fitToProject();
```

### Zoom levels configuration

Override the built-in zoom levels with a custom `zoomingLevels` array:

```js
const zoomingLevels = [
  {
    topTier:    { unit: 'Year',  format: 'yyyy',       count: 1 },
    bottomTier: { unit: 'Month', format: 'MMM',         count: 1 },
    timelineUnitSize: 66, level: 1, timelineViewMode: 'Year',
    weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
  },
  {
    topTier:    { unit: 'Month', format: 'MMM yyyy',    count: 1 },
    bottomTier: { unit: 'Week',  format: "'W'W",        count: 1 },
    timelineUnitSize: 66, level: 2, timelineViewMode: 'Month',
    weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
  },
];
```

## Fit to Project

Automatically adjusts the timeline range and zoom level to display all tasks:

```js
this.$refs.ganttRef.ej2Instances.fitToProject();
```

Or trigger via toolbar button `'ZoomToFit'`.

## Timeline View Modes

Use `timelineViewMode` as a shortcut to set both tiers at once:

| Value | Top Tier | Bottom Tier |
|---|---|---|
| `'Hour'` | Hour | Minute |
| `'Day'` | Day | Hour |
| `'Week'` | Week | Day |
| `'Month'` | Month | Week |
| `'Year'` | Year | Month |

```js
const timelineSettings = { timelineViewMode: 'Week' };
```

`timelineViewMode` is overridden if you also specify `topTier` and `bottomTier` explicitly.

## Fixed View Date Range

Lock the visible timeline to a specific range using `viewStartDate` and `viewEndDate`, independent of `projectStartDate`/`projectEndDate`:

```js
const timelineSettings = {
  viewStartDate: new Date('04/03/2019'),
  viewEndDate: new Date('04/07/2019')
};
```

- When `viewStartDate` is `auto`: uses `projectStartDate` or the earliest task start date.
- When `viewEndDate` is `auto`: uses `projectEndDate` or the latest task end date (auto-extended to fill chart width if needed).

> `ZoomToFit` uses `projectStartDate` and `projectEndDate`, not the view dates.

## Week Start Day

Customize which day is the first day of the week (default `0` = Sunday):

```js
const timelineSettings = {
  timelineViewMode: 'Week',
  weekStartDay: 1   // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
};
```

## Auto-Update Timescale

Control whether the timeline auto-extends when tasks are edited beyond the current range:

```js
const timelineSettings = {
  updateTimescaleView: false   // true by default — set false to lock the visible range
};
```

## Timeline Cell Tooltip

Show or hide the hover tooltip on timeline cells:

```js
const timelineSettings = {
  showTooltip: true   // default is true
};
```

## Show / Hide Weekends

Exclude weekends from the timeline to show only working days:

```js
const timelineSettings = {
  showWeekend: false   // default is true
};
```

> **Limitations:** `showWeekend: false` does not support baselines, manual task mode, non-working hour exclusions, or holiday exclusions.

## Timeline Cell Template

Customize the HTML content of individual timeline cells using `timelineTemplate`. The slot receives `data` with:

| Property | Description |
|---|---|
| `data.date` | Raw `Date` of the cell |
| `data.value` | Formatted display string |
| `data.tier` | `'topTier'` or `'bottomTier'` |

```vue
<ejs-gantt :timelineTemplate="'timelineTemplates'" :timelineSettings="timelineSettings" ...>
  <template v-slot:timelineTemplates="{ data }">
    <div v-if="data.tier === 'topTier'" style="font-weight:bold; text-align:center;">
      {{ data.value }}
    </div>
    <div v-else :style="{ backgroundColor: data.value === 'S' ? '#7BD3EA' : '#E0FBE2', textAlign: 'center' }">
      {{ data.value }}
    </div>
  </template>
</ejs-gantt>

<script setup>
const timelineSettings = {
  topTier:  { unit: 'Week', format: 'dd/MM/yyyy' },
  bottomTier: { unit: 'Day', count: 1 },
  timelineUnitSize: 100
};
</script>
```

## Infinite Timeline Scrolling

The `enableInfiniteTimelineScroll` property enables infinite horizontal scrolling in the Gantt Chart timeline by dynamically extending the visible timeline range as the user navigates. Set `enableInfiniteTimelineScroll` to **true** to enable this behavior.

### Key Behaviors

- When `enableInfiniteTimelineScroll` is enabled, the timeline automatically extends in the **forward direction** as the user scrolls using the horizontal scrollbar or clicks the forward scroll arrow.
- In the **backward direction**, the timeline extends only when the user clicks the backward scroll arrow. Scrolling or dragging the scrollbar backward does not trigger timeline extension.
- Infinite scrolling extends only the **visible timeline range** and does not modify the `projectStartDate` and `projectEndDate`.
- This feature enables exploration of long project schedules without manually updating the timeline range.

### Basic Setup

```vue
<template>
  <ejs-gantt 
    :enableInfiniteTimelineScroll="true"
    :dataSource="data"
    :taskFields="taskFields"
    :timelineSettings="timelineSettings"
    ...
  ></ejs-gantt>
</template>

<script setup>
const data = [
  { TaskID: 1, TaskName: 'Project initiation', StartDate: new Date('12/29/2025'), Duration: 4, Progress: 30 },
  { TaskID: 2, TaskName: 'Identify objectives', StartDate: new Date('01/02/2026'), Duration: 4, Progress: 50 }
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  progress: 'Progress'
};

const timelineSettings = {
  viewStartDate: new Date('12/29/2025'),
  viewEndDate: new Date('04/27/2026')
};
</script>
```

### Full Example with Options API

```vue
<template>
  <div>
    <ejs-gantt 
      :enableInfiniteTimelineScroll="true"
      :dataSource="data"
      :taskFields="taskFields"
      :timelineSettings="timelineSettings"
      :labelSettings="labelSettings"
      :splitterSettings="splitterSettings"
      :height="height"
      :columns="columns"
    ></ejs-gantt>
  </div>
</template>

<script>
import { GanttComponent } from '@syncfusion/ej2-vue-gantt';

export default {
  name: 'App',
  components: {
    'ejs-gantt': GanttComponent
  },
  data() {
    return {
      data: [
        { TaskID: 1, TaskName: 'Project planning', StartDate: new Date('12/29/2025'), Duration: 5, Progress: 30, ParentID: null },
        { TaskID: 2, TaskName: 'Phase 1', StartDate: new Date('01/03/2026'), Duration: 4, Progress: 50, ParentID: 1 },
        { TaskID: 3, TaskName: 'Phase 2', StartDate: new Date('01/07/2026'), Duration: 5, Progress: 40, ParentID: 1 }
      ],
      height: '430px',
      taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID'
      },
      splitterSettings: {
        columnIndex: 3
      },
      timelineSettings: {
        viewStartDate: new Date('12/29/2025'),
        viewEndDate: new Date('04/27/2026')
      },
      labelSettings: {
        leftLabel: 'TaskID',
        rightLabel: 'TaskName'
      },
      columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 80 },
        { field: 'TaskName', headerText: 'Task Name', width: 200 },
        { field: 'StartDate', headerText: 'Start Date', width: 120 },
        { field: 'Duration', headerText: 'Duration', width: 100 },
        { field: 'Progress', headerText: 'Progress', width: 100 }
      ]
    };
  }
};
</script>
```