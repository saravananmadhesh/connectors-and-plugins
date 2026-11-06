# Critical Path in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enabling Critical Path](#enabling-critical-path)
- [How Critical Path Is Calculated](#how-critical-path-is-calculated)
- [Slack Values](#slack-values)
- [Visual Appearance](#visual-appearance)
- [Critical Path with projectEndDate](#critical-path-with-projectenddate)

---

## Overview

The critical path is the longest sequence of dependent tasks that determines the minimum project duration. Tasks on the critical path have **zero or negative slack** — any delay in these tasks directly shifts the project end date.

Use critical path analysis to:
- Identify which tasks cannot slip without delaying the project
- Focus resources on tasks that matter most for on-time delivery
- Understand the impact of delays through the dependency network

---

## Enabling Critical Path

Set `enableCriticalPath: true`. Critical tasks are automatically highlighted in red.

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { GanttData } from './datasource';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    enableCriticalPath: true,     // highlights critical tasks in red
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress',
        dependency: 'Predecessor', child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

> Critical path requires dependency data (`taskFields.dependency`) to be meaningful.

---

## How Critical Path Is Calculated

Gantt uses **Critical Path Method (CPM)** principles:

1. **Project end date is determined** — uses `projectEndDate` if set, otherwise derives it from the latest task end date in the data
2. **Slack is calculated per task** — measures the difference between task end date and project end date
3. **Tasks with zero or negative slack** are marked critical
4. **Dependency chains** are traversed — delays propagate through FS/SS/FF/SF links

**Example chain:**
```
Task A (5 days) → Task B (3 days) → Task C (2 days)  = 10 days critical path
Task D (4 days) — no dependencies                    = 6 days slack (not critical)
```

---

## Slack Values

| Slack | Meaning |
|-------|---------|
| **Zero slack** | Task must finish exactly on schedule; any delay shifts project end |
| **Negative slack** | Task is already behind or creates a scheduling conflict (e.g. dependency constraints push end past project end date) |
| **Positive slack** | Task has scheduling flexibility — it can slip without affecting the project deadline |

Access slack programmatically via `gantt.flatData`:
```typescript
let taskRecord = gantt.flatData.find(t => t.ganttProperties.taskId === 3);
let slack = taskRecord.ganttProperties.slack;   // in hours/days
```

---

## Visual Appearance

By default, critical tasks render with **red taskbars** and emphasized connector lines.

Customize with CSS:
```css
/* Critical task taskbar color */
.e-gantt .e-gantt-chart .e-critical-taskbar-container .e-gantt-child-taskbar {
    background-color: #c0392b;
    border-color: #922b21;
}

/* Critical connector lines */
.e-gantt .e-gantt-chart .e-critical-connector-line {
    stroke: #c0392b;
}
```

Or use `queryTaskbarInfo` for dynamic per-task styling:
```typescript
queryTaskbarInfo: function (args: any) {
    if (args.isCritical) {
        args.taskbarBgColor = '#c0392b';
        args.taskbarBorderColor = '#922b21';
        args.progressBarBgColor = '#e74c3c';
    }
}
```

---

## Critical Path with projectEndDate

The `projectEndDate` serves as the reference for slack calculation:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    enableCriticalPath: true,
    projectStartDate: new Date('03/25/2024'),
    projectEndDate: new Date('07/28/2024'),   // reference for slack calculation
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', dependency: 'Predecessor', child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

**Parent-child note:** A parent task being critical does NOT automatically make its children critical — each task's slack is evaluated independently based on its own dependencies and timing.
