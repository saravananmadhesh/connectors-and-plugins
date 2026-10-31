# Critical Path in Syncfusion Angular Gantt Chart

## Table of Contents
- [What is the critical path](#what-is-the-critical-path)
- [Setup and requirements](#setup-and-requirements)
- [Enabling critical path](#enabling-critical-path)
- [Toolbar toggle button](#toolbar-toggle-button)
- [Critical path calculation rules](#critical-path-calculation-rules)
- [getCriticalTasks method](#getcriticaltasks-method)
- [Customizing critical path visuals](#customizing-critical-path-visuals)
- [queryTaskbarInfo with isCritical](#querytaskbarinfo-with-iscritical)

---

## What is the critical path

The critical path is the longest sequence of dependent tasks that determines the **minimum project duration**. Tasks on the critical path have **zero or negative slack** (float), meaning any delay directly impacts the overall project completion date.

The Angular Gantt Chart automatically calculates and highlights critical tasks in red with emphasized dependency connector lines.

---

## Setup and requirements

Inject `CriticalPathService` in the component's `providers`:

```typescript
import { GanttModule, CriticalPathService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [CriticalPathService],
  standalone: true
})
export class AppComponent { }
```

The data source must have:
- Valid `startDate` and `endDate` (or `duration`) fields
- Task dependency field mapped via `taskFields.dependency`

---

## Enabling critical path

Set `enableCriticalPath` to `true` on the `<ejs-gantt>` element:

```typescript
@Component({
  imports: [GanttModule],
  providers: [CriticalPathService],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskSettings"
      [enableCriticalPath]="true"
      height="450px">
    </ejs-gantt>
  `
})
export class AppComponent {
  public taskSettings = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };

  public data = [
    {
      TaskID: 1, TaskName: 'Project Start', StartDate: new Date('2024-04-01'), EndDate: new Date('2024-04-21'),
      subtasks: [
        { TaskID: 2, TaskName: 'Analysis', StartDate: new Date('2024-04-01'), Duration: 4, Progress: 30 },
        { TaskID: 3, TaskName: 'Design', StartDate: new Date('2024-04-01'), Duration: 4, Predecessor: '2' },
        { TaskID: 4, TaskName: 'Development', StartDate: new Date('2024-04-05'), Duration: 6, Predecessor: '3', Progress: 20 }
      ]
    }
  ];
}
```

---

## Toolbar toggle button

Add `'CriticalPath'` to the toolbar to allow users to toggle critical path on/off interactively:

```typescript
@Component({
  template: `
    <ejs-gantt
      [toolbar]="toolbar"
      [enableCriticalPath]="true">
    </ejs-gantt>
  `
})
export class AppComponent {
  public toolbar = ['CriticalPath', 'ZoomIn', 'ZoomOut', 'ZoomToFit'];
}
```

---

## Critical path calculation rules

| Rule | Details |
|---|---|
| **Slack** | Zero or negative slack = critical. Slack = task end date vs. project end date |
| **Project end date** | If `projectEndDate` is not set, the component uses the latest task end date |
| **Completed tasks** | Tasks with `Progress === 100` are **not** marked critical |
| **Parent vs child** | Parent task criticality does NOT automatically make children critical (and vice versa); evaluated independently |
| **Offset support** | Dependency offsets (e.g., `'2FS+3d'`) are factored into slack calculations |
| **Manual tasks** | Manual tasks compare end dates directly vs. project end date |
| **Auto tasks** | Use forward/backward pass (CPM) algorithm for slack |
| **Recalculation** | Critical path recalculates automatically when task dates, durations, dependencies, or progress change |

### Dependency type impacts

| Type | Critical when |
|---|---|
| Finish-to-Start | Predecessor ends after successor should start → negative slack |
| Start-to-Start | Predecessor starts after successor should start |
| Finish-to-Finish | Timing conflict between connected tasks |
| Start-to-Finish | Timing conflict between connected tasks |

---

## getCriticalTasks method

Retrieve all currently critical tasks programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GanttModule, GanttComponent, CriticalPathService } from '@syncfusion/ej2-angular-gantt';

@Component({
  imports: [GanttModule],
  providers: [CriticalPathService],
  standalone: true,
  template: `
    <button (click)="showCriticalTasks()">Show Critical Tasks</button>
    <ejs-gantt #gantt [dataSource]="data" [taskFields]="taskSettings"
      [enableCriticalPath]="true">
    </ejs-gantt>
  `
})
export class AppComponent {
  @ViewChild('gantt') public ganttObj?: GanttComponent;

  public showCriticalTasks(): void {
    const criticalTasks = this.ganttObj?.getCriticalTasks();
    console.log('Critical tasks:', criticalTasks);
    // criticalTasks is an array of IGanttData objects
    criticalTasks?.forEach(task => {
      console.log(task.ganttProperties.taskName, 'slack:', task.slack);
    });
  }

  // ... taskSettings and data
}
```

---

## Customizing critical path visuals

### Default rendering

By default, critical tasks render with:
- **Red taskbar** background
- **Thicker/red connector lines** between critical dependencies

### CSS overrides

```css
/* Critical taskbar color */
.e-gantt .e-critical-path-container .e-gantt-child-taskbar-inner-div {
  background-color: #c0392b !important;
}

/* Critical connector line */
.e-gantt .e-critical-connector-line {
  stroke: #c0392b;
  stroke-width: 2px;
}

/* Critical milestone */
.e-gantt .e-critical-path-container .e-gantt-milestone {
  background-color: #c0392b;
}
```

---

## queryTaskbarInfo with isCritical

Use the `queryTaskbarInfo` event to apply conditional styling based on whether a task is critical:

```typescript
import { IQueryTaskbarInfoEventArgs } from '@syncfusion/ej2-angular-gantt';

@Component({
  template: `
    <ejs-gantt
      [enableCriticalPath]="true"
      (queryTaskbarInfo)="queryTaskbarInfo($event)">
    </ejs-gantt>
  `
})
export class AppComponent {
  public queryTaskbarInfo(args: IQueryTaskbarInfoEventArgs): void {
    // isCritical is available on ganttProperties when enableCriticalPath is true
    const ganttProps = args.data.ganttProperties as any;
    if (ganttProps.isCritical) {
      // Critical task — apply red styling
      args.taskbarBgColor = '#e74c3c';
      args.progressBarBgColor = '#c0392b';
      args.taskbarBorderColor = '#a93226';
    } else {
      // Non-critical — apply default or project-specific colors
      args.taskbarBgColor = '#3498db';
      args.progressBarBgColor = '#2980b9';
    }
  }
}
```

> The `isCritical` flag is recalculated automatically whenever task scheduling changes, so `queryTaskbarInfo` always reflects the current state.
