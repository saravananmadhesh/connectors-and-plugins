# Task Scheduling in Angular Gantt Chart

## Table of Contents
- [Scheduling Modes Overview](#scheduling-modes-overview)
- [Auto Scheduling](#auto-scheduling)
- [Manual Scheduling](#manual-scheduling)
- [Custom (Mixed) Scheduling](#custom-mixed-scheduling)
- [Unscheduled Tasks](#unscheduled-tasks)
- [Duration Units](#duration-units)
- [Working Days and Hours](#working-days-and-hours)
- [Baseline Dates](#baseline-dates)
- [Work Scheduling (Effort-Driven)](#work-scheduling-effort-driven)
- [Baseline template](#baseline-template)

---

## Scheduling Modes Overview

The `taskMode` property controls how task dates are calculated:

| Mode | `taskMode` value | Behavior |
|------|-----------------|----------|
| **Auto** | `'Auto'` (default) | Dates auto-calculated based on dependencies, holidays, and working time |
| **Manual** | `'Manual'` | Dates remain exactly as specified in the data source |
| **Custom** | `'Custom'` | Per-task mode determined by a boolean field in the data source |

---

## Auto Scheduling

Default behavior. Task start and end dates are automatically validated and adjusted based on:
- Working hours and non-working time
- Holidays and weekends
- Predecessor task completion

Parent task dates are derived from the min/max dates of child tasks — you cannot directly edit parent task start/end or progress in auto mode.

```typescript
@Component({
  template: `<ejs-gantt [dataSource]="data" [taskFields]="taskFields" taskMode="Auto"></ejs-gantt>`
})
export class AppComponent {
  public taskFields: object = {
    id: 'TaskID', name: 'TaskName',
    startDate: 'StartDate', duration: 'Duration',
    progress: 'Progress', dependency: 'Predecessor', child: 'subtasks'
  };
}
```

Use auto scheduling when you want the Gantt to enforce project logic automatically.

---

## Manual Scheduling

All task dates are fixed as entered in the data source. The component does not adjust dates based on dependencies or calendars.

```typescript
@Component({
  template: `<ejs-gantt [dataSource]="data" [taskFields]="taskFields" taskMode="Manual"></ejs-gantt>`
})
```

To still validate predecessors while using manual mode, enable:
```html
<ejs-gantt taskMode="Manual" [validateManualTasksOnLinking]="true"></ejs-gantt>
```

This automatically adjusts task dates when dependency links are created or modified, while keeping other dates fixed.

---

## Custom (Mixed) Scheduling

Individual tasks can have different scheduling modes using a boolean field in the data source:

```typescript
public data: object[] = [
  { TaskID: 1, TaskName: 'Auto task', StartDate: new Date('04/02/2024'), Duration: 3, isManual: false },
  { TaskID: 2, TaskName: 'Manual task', StartDate: new Date('04/02/2024'), Duration: 5, isManual: true }
];

public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  manual: 'isManual'   // Maps per-task scheduling mode
};
```

```html
<ejs-gantt [dataSource]="data" [taskFields]="taskFields" taskMode="Custom"></ejs-gantt>
```

`isManual: true` → task uses manual mode; `isManual: false` → task uses auto mode.

---

## Unscheduled Tasks

Tasks without complete scheduling information (missing start date, end date, or duration) can be rendered using `allowUnscheduledTasks`:

```html
<ejs-gantt [allowUnscheduledTasks]="true"></ejs-gantt>
```

Supported unscheduled states:
- **Start date only** — rendered as a milestone or open-ended bar
- **End date only** — bar starts at project beginning
- **Duration only** — floating bar with no fixed position
- **No dates at all** — task shown without positioned taskbar

This is useful for backlog items or placeholder tasks that have not been scheduled yet.

---

## Duration Units

Duration units define how the scheduler interprets a task's duration field before it calculates start and end dates.

The default duration unit is **days**. Configure using `durationUnit`:

```html
<ejs-gantt [durationUnit]="Hour"></ejs-gantt>
```

Available units: `'Day'` | `'Hour'` | `'Minute'` | `'Week'` | `'Month'`

### Supported duration units

| Unit | Typical use | Scheduling effect |
|---|---|---|
| `'Day'` | General planning | Moves the task in whole-day blocks |
| `'Hour'` | Short or shift-based work | Uses daily working hours and time slots |
| `'Minute'` | Very short tasks | Useful for precision work, meetings, and burst tasks |
| `'Week'` | Sprint planning, iteration planning | Converts the duration using `daysPerWeek` before scheduling |
| `'Month'` | Long phases, roadmap planning | Converts the duration using `daysPerMonth` before scheduling |

### How duration is resolved

The scheduler checks duration input in this order:

1. A unit embedded in the duration text, such as `'5 days'`, `'2 weeks'`, or `'1 month'`
2. `taskFields.durationUnit` on the task row
3. The global `durationUnit` property on the component

Map the unit per task using `taskFields.durationUnit` if individual tasks use different units:

```typescript
public taskFields: object = {
  id: 'TaskID', name: 'TaskName',
  startDate: 'StartDate', duration: 'Duration',
  durationUnit: 'DurationUnit'  // Field in data source with values: 'day', 'hour', 'minute', 'week', 'month'
};
```

### Example — mixed duration sources

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  durationUnit: 'DurationUnit',
  progress: 'Progress'
};

public data: object[] = [
  { TaskID: 1, TaskName: 'Planning', StartDate: new Date('04/02/2024'), Duration: '5 days' },
  { TaskID: 2, TaskName: 'Execution', StartDate: new Date('04/09/2024'), Duration: 2, DurationUnit: 'Week' },
  { TaskID: 3, TaskName: 'Closure', StartDate: new Date('04/30/2024'), Duration: 1, DurationUnit: 'Month' }
];
```

---

## Working Days and Hours

### Work Week

Configure which days of the week are working days using `workWeek`. The default is Monday through Friday:

```html
<ejs-gantt [workWeek]="['Monday','Tuesday','Wednesday','Thursday','Friday']">
</ejs-gantt>
```

Six-day work week (Monday–Saturday):
```html
<ejs-gantt [workWeek]="['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']">
</ejs-gantt>
```

Valid values: `'Sunday'`, `'Monday'`, `'Tuesday'`, `'Wednesday'`, `'Thursday'`, `'Friday'`, `'Saturday'`

> **Effect:** Non-working days are excluded from duration calculations. A 5-day task that starts on Thursday in a Mon–Fri week will end the following Wednesday, skipping Saturday and Sunday.

### Include Weekends

To make every day a working day (including weekends), use `includeWeekend`:

```html
<ejs-gantt [includeWeekend]="true"></ejs-gantt>
```

When `true`, all 7 days are treated as working days regardless of `workWeek`. Default is `false`.

---

## Week and Month Duration Calculation

When a task uses `'Week'` or `'Month'`, the scheduler converts the value to working days before it derives the end date. The conversion is calendar-aware, so the final result still respects weekends, holidays, and the configured work week.

### daysPerWeek and daysPerMonth

`daysPerWeek` and `daysPerMonth` are the conversion controls used by `'Week'` and `'Month'` duration units.

```html
<ejs-gantt [daysPerWeek]="5" [daysPerMonth]="20"></ejs-gantt>
```

| Property | Default | Purpose |
|---|---|---|
| `daysPerWeek` | `5` | How many working days equal one week in scheduling |
| `daysPerMonth` | `20` | How many working days equal one month in scheduling |

### Week duration behavior

- `1 Week` equals `daysPerWeek` working days
- The conversion happens before dependency logic is evaluated
- If the project uses a 5-day schedule, a 2-week task behaves like 10 working days, not 14 calendar days
- This is useful for sprint planning because the estimate stays in work units rather than calendar units

### Month duration behavior

- `1 Month` equals `daysPerMonth` working days
- The conversion is applied before the task is placed on the timeline
- A 1-month task behaves like a fixed planning month, not a calendar-month hop
- This keeps month-based estimates stable across different calendar lengths

### Example — week and month tasks in one project

```typescript
@Component({
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [daysPerWeek]="5"
      [daysPerMonth]="20">
    </ejs-gantt>
  `
})
export class AppComponent {
  public data: object[] = [
    { TaskID: 1, TaskName: 'Sprint Cycle', StartDate: new Date('04/01/2024'), Duration: 2, DurationUnit: 'Week' },
    { TaskID: 2, TaskName: 'Release Phase', StartDate: new Date('04/15/2024'), Duration: 1, DurationUnit: 'Month' }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    durationUnit: 'DurationUnit'
  };
}
```

### Scheduling flow

For both `'Week'` and `'Month'`, the scheduler follows this flow:

1. Read the task duration and unit
2. Convert the value to working days using the configured base
3. Apply work week, weekends, holidays, and working time rules
4. Resolve predecessor links and parent rollups
5. Recalculate the final visible start and end dates

### Daily Working Hours

Configure the working hours within each working day using `dayWorkingTime`. This affects duration calculations when `durationUnit: 'Hour'` or work-based scheduling is used:

```typescript
public dayWorkingTime: object[] = [
  { from: 8, to: 12 },   // 8 AM – 12 PM
  { from: 13, to: 17 }   // 1 PM – 5 PM (excludes 1-hour lunch break)
];
```

```html
<ejs-gantt [dayWorkingTime]="dayWorkingTime"></ejs-gantt>
```

Default is a single block `[{ from: 8, to: 17 }]` (8 AM to 5 PM = 9 working hours/day).

Multiple ranges are supported for split shifts or flexible schedules.

| Property | Working hours/day | Example |
|---|---|---|
| `[{ from: 8, to: 17 }]` | 9 hrs | Standard office hours |
| `[{ from: 8, to: 12 }, { from: 13, to: 17 }]` | 8 hrs | With lunch break |
| `[{ from: 6, to: 14 }]` | 8 hrs | Morning shift |
| `[{ from: 0, to: 24 }]` | 24 hrs | Round-the-clock |

---

## Baseline Dates

Baseline shows the originally planned dates alongside current dates for comparison:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  baselineStartDate: 'BaselineStartDate',
  baselineEndDate: 'BaselineEndDate'
};
```

```html
<ejs-gantt [renderBaseline]="true" baselineColor="red"></ejs-gantt>
```

Baseline bars render as a separate indicator behind or below the current taskbar, visually showing schedule slippage.

### Baseline template

Use the `baselineTemplate` property when the default baseline rendering is not enough and you need custom baseline UI.

This is useful for advanced scenarios such as:
- Rendering additional baseline indicators.
- Showing multiple baselines for a task.
- Using task-specific data to draw custom baseline elements.

Set `baselineTemplate` to a template string or function. The template receives the task data and can return custom HTML for the baseline area.

Example baseline template for multiple baseline rendering:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaselineTemplateData } from './data';
import { GanttAllModule, TaskFieldsModel, SplitterSettingsModel, LabelSettingsModel, ColumnModel, TooltipSettingsModel } from '@syncfusion/ej2-angular-gantt';

@Component({
  selector: 'ej2-ganttbaselinetemplate',
  template: `
    <ejs-gantt #gantt height="650px" [rowHeight]="60" [taskbarHeight]="20" [dataSource]="data"
      [taskFields]="taskSettings" [treeColumnIndex]="1" [splitterSettings]="splitterSettings" [labelSettings]="labelSettings"
      [projectStartDate]="projectStartDate" [projectEndDate]="projectEndDate" [renderBaseline]="true"
      [columns]="columns" [gridLines]="gridLines" [tooltipSettings]="tooltipSettings">
      <ng-template #baselineTemplate let-data>
        <div *ngIf="!data.subtasks" style="position: relative; height: 100%;">
          <div *ngIf="data.taskData.BaselineStartDate && data.taskData.BaselineDuration !== 0"
            class="e-baseline-bar" style="position:absolute; height:8px;"
            [style.left.px]="getLeft(data.taskData.BaselineStartDate, data)"
            [style.width.px]="getWidth(data.taskData.BaselineStartDate, data.taskData.BaselineDuration, data)"
            [style.marginTop.px]="getBaselineTop(0)">
          </div>

          <div *ngIf="data.taskData.BaselineStartDate1 && data.taskData.BaselineDuration1 !== 0"
            class="e-baseline-bar" style="position:absolute; height:8px;"
            [style.left.px]="getLeft(data.taskData.BaselineStartDate1, data)"
            [style.width.px]="getWidth(data.taskData.BaselineStartDate1, data.taskData.BaselineDuration1, data)"
            [style.marginTop.px]="getBaselineTop(1)">
          </div>

          <div *ngIf="data.taskData.BaselineStartDate2 && data.taskData.BaselineDuration2 !== 0"
            class="e-baseline-bar" style="position:absolute; height:8px;"
            [style.left.px]="getLeft(data.taskData.BaselineStartDate2, data)"
            [style.width.px]="getWidth(data.taskData.BaselineStartDate2, data.taskData.BaselineDuration2, data)"
            [style.marginTop.px]="getBaselineTop(2)">
          </div>

          <div *ngIf="data.taskData.BaselineStartDate && data.taskData.BaselineDuration === 0"
            class="e-baseline-gantt-milestone-container" style="position:absolute; transform: rotate(45deg);"
            [style.left.px]="getMilestoneLeft(data.taskData.BaselineStartDate, data)"
            [style.top.px]="getBaselineMilestoneTop(0)"
            [style.width.px]="ganttObj.chartRowsModule.taskBarHeight"
            [style.height.px]="ganttObj.chartRowsModule.taskBarHeight">
          </div>

          <div *ngIf="data.taskData.BaselineStartDate1 && data.taskData.BaselineDuration1 === 0"
            class="e-baseline-gantt-milestone-container" style="position:absolute; transform: rotate(45deg);"
            [style.left.px]="getMilestoneLeft(data.taskData.BaselineStartDate1, data)"
            [style.top.px]="getBaselineMilestoneTop(1)"
            [style.width.px]="ganttObj.chartRowsModule.taskBarHeight"
            [style.height.px]="ganttObj.chartRowsModule.taskBarHeight">
          </div>

          <div *ngIf="data.taskData.BaselineStartDate2 && data.taskData.BaselineDuration2 === 0"
            class="e-baseline-gantt-milestone-container" style="position:absolute; transform: rotate(45deg);"
            [style.left.px]="getMilestoneLeft(data.taskData.BaselineStartDate2, data)"
            [style.top.px]="getBaselineMilestoneTop(2)"
            [style.width.px]="ganttObj.chartRowsModule.taskBarHeight"
            [style.height.px]="ganttObj.chartRowsModule.taskBarHeight">
          </div>
        </div>
      </ng-template>
    </ejs-gantt>
  `,
  standalone: true,
  imports: [GanttAllModule]
})

export class GanttBaselineTemplateComponent implements OnInit {
  public data: Object[];
  public taskSettings: TaskFieldsModel;
  public splitterSettings: SplitterSettingsModel;
  public labelSettings: LabelSettingsModel;
  public columns: ColumnModel[];
  public projectStartDate: Date;
  public projectEndDate: Date;
  public gridLines: string = 'Both';
  public tooltipSettings: TooltipSettingsModel;

  @ViewChild('gantt', { static: true }) public ganttObj: any;

  ngAfterViewInit(): void {
  }

  public ngOnInit(): void {
    this.data = BaselineTemplateData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      baselineStartDate: 'BaselineStartDate',
      baselineDuration: 'BaselineDuration',
      dependency: 'Predecessor',
      child: 'subtasks'
    };

    this.columns = [
      { field: 'TaskID' },
      { field: 'TaskName', width: '270px' },
      { field: 'BaselineStartDate', headerText: 'Baseline Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration', headerText: 'Baseline Duration', width: '180px' },
      { field: 'BaselineStartDate1', headerText: 'Baseline1 Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration1', headerText: 'Baseline1 Duration', width: '180px' },
      { field: 'BaselineStartDate2', headerText: 'Baseline2 Start Date', type: 'date', format: 'dd/MM/yyyy', width: '180px' },
      { field: 'BaselineDuration2', headerText: 'Baseline2 Duration', width: '180px' }
    ];

    this.splitterSettings = {
      columnIndex: 3
    };
    this.tooltipSettings = {
      showTooltip: false
    };
    this.labelSettings = {
      rightLabel: 'TaskName'
    };
    this.projectStartDate = new Date('2024-05-01');
    this.projectEndDate = new Date('2024-05-30');
  }

  getLeft(date: Date, row: any): number {
    const gp = row.taskData.ganttProperties;
    return this.ganttObj.dataOperation.getTaskLeft(new Date(date), false, gp.calendarContext);
  }

  getWidth(start: Date, duration: number, row: any): number {
    if (!start || duration == null || duration === 0) return 0;

    const end = new Date(start);
    end.setDate(end.getDate() + duration);

    return this.getLeft(end, row) - this.getLeft(start, row);
  }

  getMilestoneLeft(date: Date, row: any): number {
    const chart = this.ganttObj.chartRowsModule;
    const milestoneHeight = chart.milestoneHeight;
    const enableRtl = this.ganttObj.enableRtl;
    const left = this.getLeft(date, row);
    return enableRtl
      ? left - (milestoneHeight / 2) + 3
      : left - (milestoneHeight / 2) + 1;
  }

  getBaselineMilestoneTop(index: number): number {
    const chart = this.ganttObj.chartRowsModule;
    const rowHeight = this.ganttObj.rowHeight;
    const milestoneMarginTop = chart.milestoneMarginTop;
    const baselineGap = 4;
    const baselineMilestoneHeight = 5;
    return (
      (-Math.floor(rowHeight - milestoneMarginTop) + baselineMilestoneHeight)
      + 2
      + (index * baselineGap)
    );
  }

  getBaselineTop(index: number): number {
    const chart = this.ganttObj.chartRowsModule;
    const baselineTop = chart.baselineTop;
    const gap = 9;
    return baselineTop + (index * gap);
  }
}
```

For the standard baseline setup, use `renderBaseline`, map `baselineStartDate` and `baselineEndDate` in `taskFields`, and set `baselineColor` or target the `.e-baseline-bar` class for styling. Remember that milestone baselines require `baselineDuration` to be set to `0`.

---

## Work Scheduling (Effort-Driven)

Work-based scheduling calculates task duration based on assigned resource effort (hours of work):

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  work: 'Work',               // Total work hours
  resourceInfo: 'resources'
};
```

```html
<ejs-gantt workUnit="Hour"></ejs-gantt>
```

Available `workUnit` values: `Day` | `Hour` | `Minute`

Configure the work week:
```typescript
public dayWorkingTime: object[] = [
  { from: 8, to: 12 },   // Morning shift
  { from: 13, to: 17 }   // Afternoon shift (excludes lunch)
];
```

```html
<ejs-gantt [dayWorkingTime]="dayWorkingTime"></ejs-gantt>
```

Work scheduling automatically recalculates duration when resource units change.
