# Baseline in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Data Source Configuration](#data-source-configuration)
- [Enabling Baseline Display](#enabling-baseline-display)
- [Baseline Milestones](#baseline-milestones)
- [Customizing Baseline Appearance](#customizing-baseline-appearance)
- [Customizing Baseline via Events](#customizing-baseline-via-events)
- [Customizing Baseline Templates](#customizing-baseline-templates)

---

## Overview

The baseline feature displays the **original planned schedule** alongside the actual current schedule, allowing visual comparison of planned vs. actual progress. A thin baseline bar appears beneath each taskbar showing where the task was originally planned.

Use baselines to:
- Track schedule deviations (early/late delivery)
- Assess project performance against the original plan
- Identify which tasks are ahead or behind schedule

---

## Data Source Configuration

Add baseline date fields to your data source and map them in `taskFields`:

| taskFields property | Description |
|--------------------|-------------|
| `baselineStartDate` | Originally planned start date |
| `baselineEndDate` | Originally planned end date |
| `baselineDuration` | Originally planned duration (string or number). Set to `'0'` for milestone baseline. |

```typescript
let projectData: Object[] = [
    {
        TaskID: 1, TaskName: 'Project Planning',
        StartDate: new Date('04/05/2024'),   // actual start (later than planned)
        EndDate: new Date('04/10/2024'),
        Duration: 5, Progress: 80,
        BaselineStartDate: new Date('04/02/2024'),   // planned start
        BaselineEndDate: new Date('04/06/2024'),     // planned end
        BaselineDuration: '5'
    },
    {
        TaskID: 2, TaskName: 'Design Phase',
        StartDate: new Date('04/11/2024'),
        EndDate: new Date('04/16/2024'),
        Duration: 5, Progress: 50, ParentID: 1,
        BaselineStartDate: new Date('04/08/2024'),
        BaselineEndDate: new Date('04/12/2024'),
        BaselineDuration: '5'
    },
    {
        TaskID: 3, TaskName: 'Milestone: Design Complete',
        StartDate: new Date('04/17/2024'),
        EndDate: new Date('04/17/2024'),
        Duration: 0, Progress: 0, ParentID: 1,
        BaselineStartDate: new Date('04/13/2024'),
        BaselineEndDate: new Date('04/13/2024'),
        BaselineDuration: '0'    // baseline milestone — MUST be '0', not same dates alone
    }
];
```

---

## Enabling Baseline Display

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: projectData,
    height: '450px',
    renderBaseline: true,         // show baseline bars
    baselineColor: 'red',         // baseline bar color (CSS color string)
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate',
        baselineDuration: 'BaselineDuration'
    }
});
gantt.appendTo('#Gantt');
```

---

## Baseline Milestones

To display a **baseline milestone** (diamond), you must set `baselineDuration` to `'0'` explicitly:

```typescript
// ✅ Correct: baseline milestone
{
    TaskID: 5, TaskName: 'Go-Live Milestone',
    StartDate: new Date('05/01/2024'), Duration: 0,
    BaselineStartDate: new Date('04/28/2024'),
    BaselineEndDate: new Date('04/28/2024'),
    BaselineDuration: '0'    // required for milestone rendering
}

// ❌ Wrong: same BaselineStartDate and BaselineEndDate without baselineDuration: '0'
//    → renders as 1-day baseline bar, not a milestone
{
    BaselineStartDate: new Date('04/28/2024'),
    BaselineEndDate: new Date('04/28/2024')
    // missing BaselineDuration: '0'
}
```

---

## Customizing Baseline Appearance

**Using `baselineColor` property:**
```typescript
let gantt: Gantt = new Gantt({
    renderBaseline: true,
    baselineColor: 'rgba(255, 107, 107, 0.8)',   // semi-transparent red
    // ... other config
});
```

**Advanced CSS override:**
```css
/* Baseline bar styling */
.e-gantt .e-gantt-chart .e-baseline-bar {
    height: 4px;
    border-radius: 2px;
    opacity: 0.9;
    background-color: #4CAF50;   /* green baseline */
}

/* Baseline milestone diamond */
.e-gantt .e-gantt-chart .e-baseline-gantt-milestone-container {
    border-color: #4CAF50;
}
```

> The `baselineColor` property takes precedence as a quick configuration option. For advanced per-element control, use CSS overrides.

---

## Customizing Baseline via Events

Use the `queryTaskbarInfo` event to dynamically customize the baseline bar (for example, applying a gradient):

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: projectData,
    height: '450px',
    renderBaseline: true,
    baselineColor: 'red',
    queryTaskbarInfo: (args: any) => {
        const element: HTMLElement | null = args.rowElement.querySelector('.e-baseline-bar');
        if (element) {
            element.style.background = 'linear-gradient(red, yellow)';
        }
    },
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate',
        baselineDuration: 'BaselineDuration'
    }
});
gantt.appendTo('#Gantt');
```

---

## Customizing Baseline Templates

The `baselineTemplate` property allows customization of baseline rendering by replacing the default baseline UI with a custom HTML structure. This enables advanced scenarios such as rendering additional baseline elements, visual indicators, or multiple baselines using task-specific data.

Set the `baselineTemplate` property with a template string or function. The template receives the task data object, which can be used to dynamically generate baseline elements.

### Multiple Baseline Rendering Using Template

By default, the Gantt component supports a single baseline per task. However, using `baselineTemplate`, you can extend this behavior to render multiple baselines by maintaining additional baseline data within custom fields in your data source.

This enables rich visualization scenarios such as:
- Comparing original vs revised schedules
- Visualizing multiple planning phases
- Highlighting deviations across timeline checkpoints

```typescript
import { Gantt, DayMarkers, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(DayMarkers, Selection);

let gantt: Gantt = new Gantt({
    dataSource: baselineTemplateData,
    height: '450px',
    renderBaseline: true,
    baselineColor: 'red',
    allowSelection: true,
    highlightWeekends: true,
    gridLines: 'Both',
    rowHeight: 60,
    taskbarHeight: 20,
    splitterSettings: { columnIndex: 3 },
    tooltipSettings: { showTooltip: false },
    labelSettings: { taskLabel: 'TaskName' },
    columns: [
        { field: 'TaskID', headerText: 'ID', textAlign: 'Left' },
        { field: 'TaskName', width: '270px', headerText: 'Name' },
        { field: 'BaselineStartDate', headerText: 'Baseline Start Date', width: '180px' },
        { field: 'BaselineDuration', headerText: 'Baseline Duration', width: '180px' },
        { field: 'BaselineStartDate1', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline1 Start Date', width: '180px' },
        { field: 'BaselineDuration1', headerText: 'Baseline1 Duration', width: '180px' },
        { field: 'BaselineStartDate2', format: { skeleton: 'yMd', type: 'date' }, headerText: 'Baseline2 Start Date', width: '180px' },
        { field: 'BaselineDuration2', headerText: 'Baseline2 Duration', width: '180px' }
    ],
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress',
        parentID: 'ParentID',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate'
    },
    baselineTemplate: baselineTemplate.bind(gantt)
});
gantt.appendTo('#Gantt');

function baselineTemplate(props: any): string {
    if (props.hasChildRecords || (props.data && props.data.hasChildRecords)) {
        return '';
    }
    const taskRecord = props.taskData;
    const ganttProperties = taskRecord.ganttProperties;
    const chartRowsModule = gantt.chartRowsModule;
    const baselineTop = chartRowsModule.baselineTop;
    const baselineHeight = chartRowsModule.baselineHeight;
    const taskBarHeight = chartRowsModule.taskBarHeight;
    const milestoneHeight = chartRowsModule.milestoneHeight;
    const milestoneMarginTop = chartRowsModule.milestoneMarginTop;
    const rowHeight = gantt.rowHeight;
    const renderBaseline = gantt.renderBaseline;
    const enableRtl = gantt.enableRtl;
    const taskSpacing = 9;
    const baselineSpacing = 4;

    function getLeft(date: Date): number {
        return gantt.dataOperation.getTaskLeft(new Date(date), false, ganttProperties.calendarContext);
    }
    function getWidth(start: Date, duration: number): number {
        if (!start || duration == null || duration === 0) return 0;
        const end = new Date(start);
        end.setDate(end.getDate() + duration);
        const leftStart = gantt.dataOperation.getTaskLeft(new Date(start), false, ganttProperties.calendarContext);
        const leftEnd = gantt.dataOperation.getTaskLeft(end, false, ganttProperties.calendarContext);
        return leftEnd - leftStart;
    }
    function render(start: Date, duration: number, index: number): string {
        if (!start) return '';
        const leftPosition = getLeft(start);
        const width = getWidth(start, duration);

        // Milestone baseline (duration = 0)
        if (duration === 0) {
            const milestoneSize = renderBaseline ? taskBarHeight : (taskBarHeight - 10);
            const baselineMilestoneHeight = renderBaseline ? 5 : 2;
            const leftPositionMs = enableRtl
                ? (leftPosition - (milestoneHeight / 2) + 3)
                : (leftPosition - (milestoneHeight / 2) + 1);
            const marginTop = (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight) +
                2 + (index * baselineSpacing);
            return '<div class="e-baseline-gantt-milestone-container" style="position:absolute;' +
                'width:' + milestoneSize + 'px;' +
                'height:' + milestoneSize + 'px;' +
                'transform:rotate(45deg);' +
                (enableRtl ? 'right:' : 'left:') + leftPositionMs + 'px;' +
                'margin-top:' + marginTop + 'px;"></div>';
        }
        // Normal baseline bar
        return '<div class="e-baseline-bar" role="term" style="position:absolute;' +
            (enableRtl ? 'right:' : 'left:') + leftPosition + 'px;' +
            'margin-top:' + (baselineTop + (index * taskSpacing)) + 'px;' +
            'width:' + width + 'px;' +
            'height:' + baselineHeight + 'px;"></div>';
    }
    return ('<div class="custom-multi-baseline">' +
        render(taskRecord.taskData.BaselineStartDate, taskRecord.taskData.BaselineDuration, 0) +
        render(taskRecord.taskData.BaselineStartDate1, taskRecord.taskData.BaselineDuration1, 1) +
        render(taskRecord.taskData.BaselineStartDate2, taskRecord.taskData.BaselineDuration2, 2) +
        '</div>');
}
```
