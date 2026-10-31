# Baseline

Render baseline bars to compare planned vs actual dates. Baselines are optional visual elements that display original or planned schedules alongside the current task schedule.

## Table of Contents
- [Baseline Configuration](#baseline-configuration)
- [Baseline Milestone](#baseline-milestone)
- [Baseline Color Customization](#baseline-color-customization)
- [Baseline Template (Custom Rendering)](#baseline-template-custom-rendering)

## Baseline Configuration

Enable baseline visualization with `renderBaseline` and map baseline fields in `taskFields`:

```vue
<ejs-gantt :renderBaseline="true" baselineColor="red" ...></ejs-gantt>
```

```js
const taskFields = {
  // ... standard fields
  baselineStartDate: 'BaselineStartDate',
  baselineEndDate: 'BaselineEndDate',
  baselineDuration: "BaselineDuration",
};
```

**Data example:**
```js
{ TaskID: 2, TaskName: 'Design', StartDate: new Date('04/05/2019'), Duration: 3,
  BaselineStartDate: new Date('04/04/2019'), BaselineEndDate: new Date('04/08/2019'), BaselineDuration: '5' }
```

## Baseline Milestone

Set `baselineDuration: '0'` to render a baseline as a milestone (diamond shape). Setting `baselineStartDate` and `baselineEndDate` to the same date **without** `baselineDuration: 0` produces a one-day baseline task, not a milestone.

```js
{ TaskID: 2, TaskName: 'Milestone Review',
  StartDate: new Date('02/10/2019'), EndDate: new Date('02/10/2019'),
  BaselineStartDate: new Date('02/09/2019'), BaselineEndDate: new Date('02/09/2019'),
  BaselineDuration: '0' }   // Milestone baseline
```

## Baseline Color Customization

Customize the baseline appearance in two ways:

**Property-based** (global):
```vue
<ejs-gantt :renderBaseline="true" baselineColor="red" ...></ejs-gantt>
```

**CSS-based** (advanced styling):
```css
.e-gantt .e-gantt-chart .e-baseline-bar {
    height: 4px;
    border-radius: 2px;
    opacity: 0.9;
    background-color: #4CAF50;
}
```

## Baseline Template (Custom Rendering)

The `baselineTemplate` property replaces the default baseline UI with a custom HTML structure. Use it to render additional baseline elements, visual indicators, or **multiple baselines** per task.

The template receives the task data object and must return an HTML string.

**When to use `baselineTemplate`:**
- Comparing original vs revised schedules side-by-side
- Visualizing multiple planning phases (e.g., draft, approved, current)
- Highlighting deviations across timeline checkpoints
- Adding custom indicators or labels to baseline bars

**Composition API example** (multiple baselines):

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :renderBaseline="true"
    :baselineTemplate="baselineTemplateFunc"
    :rowHeight="60"
    :taskbarHeight="20"
    :columns="columns"
    :labelSettings="labelSettings"
    :height="height"
    baselineColor="red"
  ></ejs-gantt>
</template>

<script setup>
import { ref, provide } from "vue";
import { GanttComponent as EjsGantt, Selection, DayMarkers } from "@syncfusion/ej2-vue-gantt";

const gantt = ref(null);
const data = [
  { TaskID: 1, TaskName: 'Design', StartDate: new Date('04/02/2019'), EndDate: new Date('04/08/2019'),
    BaselineStartDate: new Date('04/01/2019'), BaselineDuration: '5',
    BaselineStartDate1: new Date('04/03/2019'), BaselineDuration1: '3',
    BaselineStartDate2: new Date('04/05/2019'), BaselineDuration2: '2' }
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  baselineStartDate: 'BaselineStartDate',
  baselineEndDate: 'BaselineEndDate',
  parentID: 'ParentID'
};

const columns = [
  { field: 'TaskID', headerText: 'ID', textAlign: 'Left' },
  { field: 'TaskName', width: '270px', headerText: 'Name' },
  { field: 'BaselineStartDate', headerText: 'Baseline Start Date', width: '180px' },
  { field: 'BaselineDuration', headerText: 'Baseline Duration', width: '180px' },
  { field: 'BaselineStartDate1', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline1 Start Date', width: '180px' },
  { field: 'BaselineDuration1', headerText: 'Baseline1 Duration', width: '180px' },
  { field: 'BaselineStartDate2', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline2 Start Date', width: '180px' },
  { field: 'BaselineDuration2', headerText: 'Baseline2 Duration', width: '180px' }
];

const labelSettings = { taskLabel: 'TaskName' };
const height = '450px';

const baselineTemplateFunc = function () {
  return {
    template: function (props) {
      if (props.hasChildRecords || (props.data && props.data.hasChildRecords)) {
        return '';
      }

      const ganttInstance = gantt.value.ej2Instances;
      const taskRecord = props.taskData;
      const ganttProperties = taskRecord.ganttProperties;
      const chartRowsModule = ganttInstance.chartRowsModule;

      const baselineTop = chartRowsModule.baselineTop;
      const baselineHeight = chartRowsModule.baselineHeight;
      const taskBarHeight = chartRowsModule.taskBarHeight;
      const milestoneHeight = chartRowsModule.milestoneHeight;
      const milestoneMarginTop = chartRowsModule.milestoneMarginTop;
      const rowHeight = ganttInstance.rowHeight;
      const renderBaseline = ganttInstance.renderBaseline;
      const enableRtl = ganttInstance.enableRtl;

      const taskSpacing = 9;
      const baselineSpacing = 4;

      const getLeft = (date) => ganttInstance.dataOperation.getTaskLeft(
        new Date(date), false, ganttProperties.calendarContext
      );

      const getWidth = (start, duration) => {
        if (!start || duration == null || duration === 0) return 0;
        const end = new Date(start);
        end.setDate(end.getDate() + duration);
        const leftStart = ganttInstance.dataOperation.getTaskLeft(
          new Date(start), false, ganttProperties.calendarContext
        );
        const leftEnd = ganttInstance.dataOperation.getTaskLeft(
          end, false, ganttProperties.calendarContext
        );
        return leftEnd - leftStart;
      };

      const render = (start, duration, index) => {
        if (!start) return '';
        const leftPosition = getLeft(start);
        const width = getWidth(start, duration);

        if (duration === 0) {
          // Milestone baseline
          const milestoneSize = renderBaseline ? taskBarHeight : (taskBarHeight - 10);
          const baselineMilestoneHeight = renderBaseline ? 5 : 2;
          const leftPositionMs = enableRtl
            ? (leftPosition - (milestoneHeight / 2) + 3)
            : (leftPosition - (milestoneHeight / 2) + 1);
          const marginTop = (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight) +
            2 + (index * baselineSpacing);

          return '<div class="e-baseline-gantt-milestone-container" style="position:absolute;' +
            'width:' + milestoneSize + 'px;height:' + milestoneSize + 'px;' +
            'transform:rotate(45deg);' +
            (enableRtl ? 'right:' : 'left:') + leftPositionMs + 'px;' +
            'margin-top:' + marginTop + 'px;"></div>';
        }

        // Regular baseline bar
        return '<div class="e-baseline-bar" role="term" style="position:absolute;' +
          (enableRtl ? 'right:' : 'left:') + leftPosition + 'px;' +
          'margin-top:' + (baselineTop + (index * taskSpacing)) + 'px;' +
          'width:' + width + 'px;height:' + baselineHeight + 'px;"></div>';
      };

      return (
        '<div class="custom-multi-baseline">' +
        render(taskRecord.taskData.BaselineStartDate, taskRecord.taskData.BaselineDuration, 0) +
        render(taskRecord.taskData.BaselineStartDate1, taskRecord.taskData.BaselineDuration1, 1) +
        render(taskRecord.taskData.BaselineStartDate2, taskRecord.taskData.BaselineDuration2, 2) +
        '</div>'
      );
    }
  };
};

provide('gantt', [Selection, DayMarkers]);
</script>
```

**Options API example** (same logic, different registration):

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :baselineTemplate="baselineTemplateFunc"
    :renderBaseline="true"
    :rowHeight="60"
    :taskbarHeight="20"
    :columns="columns"
    :labelSettings="labelSettings"
    :height="height"
    baselineColor="red"
  ></ejs-gantt>
</template>

<script>
import { GanttComponent, Selection, DayMarkers } from "@syncfusion/ej2-vue-gantt";

export default {
  name: "App",
  components: { "ejs-gantt": GanttComponent },
  data() {
    return {
      data: [ /* same data as above */ ],
      taskFields: { /* same as above */ },
      columns: [ /* same as above */ ],
      labelSettings: { taskLabel: 'TaskName' },
      height: '450px'
    };
  },
  provide: { gantt: [Selection, DayMarkers] },
  methods: {
    baselineTemplateFunc: function () {
      return {
        template: function (props) {
          if (props.hasChildRecords || (props.data && props.data.hasChildRecords)) {
            return '';
          }
          const gantt = this.$refs.gantt.ej2Instances;
          const taskRecord = props.taskData;
          // ... same render logic as Composition API ...
          // Access gantt via `this.$refs.gantt.ej2Instances` instead of ref
        }
      };
    }
  }
};
</script>
```

**Template API — internal metrics exposed to `baselineTemplate`:**

| Property | Source | Purpose |
|---|---|---|
| `baselineTop` | `chartRowsModule` | Top offset of baseline bar within the row |
| `baselineHeight` | `chartRowsModule` | Height of the baseline bar in pixels |
| `taskBarHeight` | `chartRowsModule` | Height of the main taskbar (used for milestone sizing) |
| `milestoneHeight` | `chartRowsModule` | Height of the milestone diamond |
| `milestoneMarginTop` | `chartRowsModule` | Top margin for milestone alignment |
| `rowHeight` | `gantt.rowHeight` | Total row height in pixels |
| `renderBaseline` | `gantt.renderBaseline` | Whether baseline is enabled |
| `enableRtl` | `gantt.enableRtl` | RTL layout flag (affects `left` vs `right` positioning) |
| `getTaskLeft(date, false, calendar)` | `gantt.dataOperation` | Convert a date to pixel position in the chart |
| `taskData` | `props.taskData` | Full task data object (access custom fields like `BaselineStartDate1`) |

> **Tip:** Always return an empty string for parent tasks (`hasChildRecords: true`) to avoid rendering baseline elements on summary rows.
