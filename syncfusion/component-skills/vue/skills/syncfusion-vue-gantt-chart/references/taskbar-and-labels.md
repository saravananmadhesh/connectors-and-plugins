# Taskbar and Labels

## Table of Contents
- [Taskbar Overview](#taskbar-overview)
- [Taskbar Templates](#taskbar-templates)
- [Parent Taskbar Template](#parent-taskbar-template)
- [Milestone Template](#milestone-template)
- [Label Settings](#label-settings)
- [Tooltip Customization](#tooltip-customization)
- [Connector line tooltip](#connector-line-tooltip)
- [Baseline tooltip](#baseline-tooltip)
- [Timeline tooltip](#timeline-tooltip)
- [Progress Bar](#progress-bar)
- [Data Markers / Indicators](#data-markers--indicators)
- [Taskbar Styling](#taskbar-styling)
- [Connector Lines](#connector-lines)

## Taskbar Overview

Each task row in the chart panel renders a **taskbar** (or milestone diamond). The taskbar is configurable via templates, label settings, and CSS. Milestones are tasks where `Duration === 0`.

## Taskbar Templates

Override the default task bar HTML using `taskbarTemplate`:

```vue
<ejs-gantt
  :taskbarTemplate="'taskbarTemplate'"
  height="450px"
  :dataSource="data"
  :taskFields="taskFields"
>
  <template v-slot:taskbarTemplate="{ data }">
    <div class="custom-taskbar" :style="{ background: data.taskData.color || '#4CA1AF' }">
      <span>{{ data.taskData.TaskName }}</span>
    </div>
  </template>
</ejs-gantt>
```

> **Note:** Pass the slot name as the string `'taskbarTemplate'` to the prop; the actual template is defined in the `<template v-slot:...>` tag.

## Parent Taskbar Template

Override parent (summary) task bars separately using `parentTaskbarTemplate`:

```vue
<ejs-gantt :parentTaskbarTemplate="'parentTaskbarTemplate'" ...>
  <template v-slot:parentTaskbarTemplate="{ data }">
    <div class="parent-taskbar">
      <b>{{ data.taskData.TaskName }}</b>
    </div>
  </template>
</ejs-gantt>
```

## Milestone Template

Override milestone diamond rendering via `milestoneTemplate`:

```vue
<ejs-gantt :milestoneTemplate="'milestoneTemplate'" ...>
  <template v-slot:milestoneTemplate="{ data }">
    <div class="milestone-icon">⭐</div>
  </template>
</ejs-gantt>
```

## Label Settings

Display data fields as labels inside, to the left, or to the right of taskbars:

```vue
<ejs-gantt :labelSettings="labelSettings" ...></ejs-gantt>

<script setup>
const labelSettings = {
  leftLabel:  'TaskID',                // field name string
  rightLabel: 'Duration',             // field name string
  taskLabel:  '${Progress}%'          // template string — shown inside the bar
};
</script>
```

### Template labels

Use a Vue slot for rich label content:

```vue
<ejs-gantt :labelSettings="{ leftLabel: 'leftLabelTemplate', rightLabel: 'rightLabelTemplate' }" ...>
  <template v-slot:leftLabelTemplate="{ data }">
    <span class="label-chip">{{ data.taskData.TaskName }}</span>
  </template>

  <template v-slot:rightLabelTemplate="{ data }">
    <span class="label-chip">{{ data.taskData.TaskName }}</span>
  </template>
</ejs-gantt>
```

### labelSettings properties

| Property | Type | Description |
|---|---|---|
| `leftLabel` | string | Field name or template slot name displayed left of taskbar |
| `rightLabel` | string | Field name or template slot name displayed right of taskbar |
| `taskLabel` | string | Field name or template string displayed inside taskbar |

## Tooltip Customization

Override the default hover tooltip using `tooltipSettings`:

```vue
<ejs-gantt :tooltipSettings="tooltipSettings" ...>
  <template v-slot:taskbarTooltipTemplate="{ data }">
    <div>
      <b>{{ data.TaskName }}</b><br/>
      Start: {{ data.StartDate }}<br/>
      End: {{ data.EndDate }}<br/>
      Progress: {{ data.Progress }}%
    </div>
  </template>
</ejs-gantt>

<script setup>
const tooltipSettings = {
  showTooltip: true,
  taskbar: 'taskbarTooltipTemplate'   // name of the slot
};
</script>
```

### Connector line tooltip

Customize the connector line hover tooltip using `tooltipSettings.connectorLine` and a Vue slot.

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    id="GanttContainer"
    :taskFields="taskFields"
    :height="height"
    :tooltipSettings="tooltipSettings"
  >
    <template v-slot:connectorLineTooltipTemplate="{ data }">
      <div>
        Offset: {{ data.offsetString }}
      </div>
    </template>
  </ejs-gantt>
</template>

<script setup>
const tooltipSettings = {
  showTooltip: true,
  connectorLine: 'connectorLineTooltipTemplate'
};
</script>
```

### Baseline tooltip

Customize the baseline hover tooltip using `tooltipSettings.baseline` and a Vue slot. Enable baseline rendering with `renderBaseline`.

```vue
<template>
  <ejs-gantt
    ref="gantt"
    :dataSource="data"
    id="GanttContainer"
    :renderBaseline="true"
    :taskFields="taskFields"
    :columns="columns"
    :treeColumnIndex="1"
    :includeWeekend="true"
    :timelineSettings="timelineSettings"
    :height="height"
    :dayWorkingTime="dayWorkingTime"
    :projectStartDate="projectStartDate"
    :projectEndDate="projectEndDate"
    :tooltipSettings="tooltipSettings"
    baselineColor="red"
  >
    <template v-slot:baselineTooltipTemplate="{ data }">
      <div>
        Baseline StartDate: {{ format(data.BaselineStartDate) }}
      </div>
    </template>
  </ejs-gantt>
</template>

<script setup>
const tooltipSettings = {
  showTooltip: true,
  baseline: 'baselineTooltipTemplate'
};
</script>
```

### Timeline tooltip

Customize the timeline hover tooltip using `tooltipSettings.timeline` and a Vue slot (`timelineTooltipTemplate`).

```vue
<template>
  <ejs-gantt
    ref="gantt"
    :dataSource="data"
    id="GanttContainer"
    :taskFields="taskFields"
    :height="height"
    :tooltipSettings="tooltipSettings"
  >
    <template v-slot:timelineTooltipTemplate="{ data }">
      <div
        v-if="data.tier === 'topTier'"
        v-html="topTierTooltip(data.value, data.date, data.tier)"
      ></div>
      <div
        v-if="data.tier === 'bottomTier'"
        v-html="bottomTierTooltip(data.date, data.tier)"
      ></div>
    </template>
  </ejs-gantt>
</template>

<script setup>
import { GanttComponent as EjsGantt } from '@syncfusion/ej2-vue-gantt';
import { editingData } from './data-source.js';

const data = editingData;
const height = '450px';
const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  baselineStartDate: 'BaselineStartDate',
  baselineEndDate: 'BaselineEndDate',
  progress: 'Progress',
  dependency: 'Predecessor',
  child: 'subtasks'
};

const tooltipSettings = {
  showTooltip: true,
  timeline: 'timelineTooltipTemplate'
};

const topTierTooltip = (value, date, tier) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime());
  endDate.setDate(startDate.getDate() + 6);
  const tooltipData = getTooltipData(startDate, endDate, tier);
  return generateTooltipMarkup(value, tooltipData);
};

const bottomTierTooltip = (date, tier) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime());
  const tooltipData = getTooltipData(startDate, endDate, tier);
  return generateTooltipMarkup(date.toDateString(), tooltipData);
};

const getTooltipData = (startDate, endDate, tier) => {
  const ganttElement = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];

  const activeTasks = ganttElement.currentViewData.filter((task) => {
    const taskStart = new Date(task.StartDate);
    const taskEnd = new Date(task.EndDate);
    taskStart.setHours(0, 0, 0, 0);
    taskEnd.setHours(0, 0, 0, 0);
    return tier === 'topTier'
      ? taskStart >= startDate && taskEnd <= endDate
      : taskStart.getTime() === startDate.getTime() && taskEnd.getTime() === endDate.getTime();
  });

  const milestones = activeTasks.filter((task) => task.Duration === 0);
  const totalProgress = activeTasks.reduce((acc, task) => acc + (task.Progress || 0), 0);
  const overallProgress =
    activeTasks.length > 0 ? (totalProgress / activeTasks.length).toFixed(2) : 0;

  return {
    activeTasks: activeTasks.length,
    milestones: milestones.length,
    overallProgress
  };
};

const generateTooltipMarkup = (label, tooltipData) => {
  return `
    <div style="padding: 5px;">
      <div style="padding-bottom: 9px; text-align: center; border-bottom: 2px solid white;">
        <span style="font-weight: bold; font-size: 14px;">${label}</span>
      </div>
      <div style="display: flex; padding-bottom: 5px; padding-top: 9px">
        <span style="font-weight: bold;">Active Tasks:</span>
        <span style="padding-left: 2px;">${tooltipData.activeTasks}</span>
      </div>
      <div style="display: flex; padding-bottom: 5px;">
        <span style="font-weight: bold;">Milestones:</span>
        <span style="padding-left: 2px;">${tooltipData.milestones}</span>
      </div>
      <div style="display: flex; padding-bottom: 5px;">
        <span style="font-weight: bold;">Overall Progress:</span>
        <span style="padding-left: 2px;">${tooltipData.overallProgress}</span>
      </div>
    </div>
  `;
};
</script>
```

## Progress Bar

The Gantt taskbar fills from the left based on `taskFields.progress`. The field must contain a numeric 0–100 value.

```js
const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  progress: 'Progress'    // <-- field that drives the fill %
};
```

Users can drag the progress resizer handle to update progress interactively when `editSettings.allowTaskbarEditing: true`.

## Data Markers / Indicators

Add point-in-time visual markers (icons/labels) to specific dates on task rows:

```vue
<ejs-gantt :indicators="indicators" :taskFields="taskFields" ...></ejs-gantt>

<script setup>
// indicators are defined per-task inside the data source
const data = [
  {
    TaskID: 1, TaskName: 'Design Phase',
    StartDate: new Date('2024-01-01'), Duration: 10,
    Indicators: [
      {
        date: new Date('2024-01-05'),
        name: 'Review',
        tooltip: 'Design review checkpoint',
        iconClass: 'e-info'
      }
    ]
  }
];

// Map the indicators field
const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  indicators: 'Indicators'   // <-- field name in data
};
</script>
```

### Indicator properties

| Property | Type | Description |
|---|---|---|
| `date` | Date/string | Position on the timeline |
| `name` | string | Label text shown next to the icon |
| `tooltip` | string | Hover tooltip text |
| `iconClass` | string | CSS class for the icon |

## Taskbar Styling

Override taskbar colors via CSS or `queryTaskbarInfo` event:

```vue
<ejs-gantt @queryTaskbarInfo="onQueryTaskbarInfo" ...></ejs-gantt>

<script setup>
function onQueryTaskbarInfo(args) {
  if (args.data.taskData.Priority === 'High') {
    args.taskbarBgColor = '#e74c3c';
    args.progressBarBgColor = '#c0392b';
  }
}
</script>
```

### `queryTaskbarInfo` args properties

| Property | Description |
|---|---|
| `taskbarBgColor` | Background color of the taskbar |
| `progressBarBgColor` | Background color of the progress fill |
| `taskbarBorderColor` | Border color |
| `taskLabelColor` | Color of the label inside the bar |
| `rightLabelColor` | Color of the right label |
| `leftLabelColor` | Color of the left label |

## Connector Lines

Connector lines visually represent task dependencies. Customize their appearance using `connectorLineWidth` and `connectorLineBackground`:

```vue
<ejs-gantt
  :connectorLineWidth="3"
  :connectorLineBackground="'red'"
  :dataSource="data"
  :taskFields="taskFields"
  height="450px"
>
</ejs-gantt>
```

### Connector Line Properties

| Property | Type | Description |
|---|---|---|
| `connectorLineWidth` | number | Width of the connector line in pixels (default: 1) |
| `connectorLineBackground` | string | Color of the connector line; accepts CSS color values (hex, rgb, named colors) |

### Notes

- **Connector lines** display when tasks have **dependency relationships** (predecessor/successor)
- The `Predecessor` field in task data defines the dependency (e.g., `"2FS"` = Task 2 Finish-to-Start)
- Adjust `connectorLineWidth` to make dependency lines more or less prominent
- Use `connectorLineBackground` with project branding colors or status indicators
