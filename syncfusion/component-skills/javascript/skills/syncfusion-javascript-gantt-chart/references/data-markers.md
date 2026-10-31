# Data Markers in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Indicator Properties](#indicator-properties)
- [Multiple Indicators per Task](#multiple-indicators-per-task)

## Overview

Data markers (also called indicators) display icons on the chart timeline for specific tasks at specific dates. They represent schedule events or milestone notes that belong to a task.

## Basic Setup

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

// Data source with indicators field
const GanttData = [
    {
        TaskID: 1,
        TaskName: 'Project Initiation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        Indicators: [
            {
                date: '04/10/2019',
                iconClass: 'e-btn-icon e-notes-info e-icons e-icon-left e-gantt e-notes-info::before',
                name: 'Kickoff Meeting',
                tooltip: 'Project kick-off scheduled'
            }
        ]
    }
];

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID',
        indicators: 'Indicators'    // map the indicators field
    }
});
gantt.appendTo('#Gantt');
```

---

## Indicator Properties

| Property | Type | Description |
|----------|------|-------------|
| `date` | string \| Date | Date where the indicator icon is placed on the chart |
| `iconClass` | string | CSS class(es) for the indicator icon |
| `name` | string | Text label shown alongside the icon |
| `tooltip` | string | Tooltip shown on hover (only rendered if value is set) |

---

## Multiple Indicators per Task

A single task can have multiple indicators:

```typescript
{
    TaskID: 2,
    TaskName: 'Analysis',
    StartDate: new Date('04/02/2019'),
    Duration: 4,
    Indicators: [
        { date: '04/03/2019', iconClass: 'e-icons e-gantt e-notes-info', name: 'Review', tooltip: 'Review scheduled' },
        { date: '04/05/2019', iconClass: 'e-icons e-gantt e-milestone', name: 'Complete', tooltip: 'Completion target' }
    ]
}
```

> Data markers belong to a specific task record and appear at a specified date regardless of the task's start/end.
