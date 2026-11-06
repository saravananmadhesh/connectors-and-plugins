# Splitting and Merging Tasks in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Split Tasks at Load Time (Hierarchical Data)](#split-tasks-at-load-time-hierarchical-data)
- [Split Tasks at Load Time (Self-Referential Data)](#split-tasks-at-load-time-self-referential-data)
- [Split Tasks Dynamically — Dialog](#split-tasks-dynamically--dialog)
- [Split Tasks Dynamically — Context Menu](#split-tasks-dynamically--context-menu)
- [Merge Tasks Dynamically](#merge-tasks-dynamically)
- [Detect Segment Click](#detect-segment-click)
- [Limitations](#limitations)

---

## Overview

Task splitting divides a task into multiple non-consecutive segments (e.g., representing a work pause or holiday break). Segments appear as separate taskbar pieces connected visually. Tasks can be split at load time or dynamically via the UI.

---

## Split Tasks at Load Time (Hierarchical Data)

Use `taskFields.segments` to define pre-split tasks in the data source:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  segments: 'Segments'   // Field containing segment array
};

public data: object[] = [
  {
    TaskID: 3,
    TaskName: 'Design Phase',
    StartDate: new Date('04/02/2024'),
    EndDate: new Date('04/15/2024'),
    Segments: [
      { startDate: new Date('04/02/2024'), duration: 3 },
      { startDate: new Date('04/08/2024'), duration: 4 }  // Resumes after a gap
    ]
  }
];
```

Each segment needs `startDate` and `duration` (or `endDate`). All segments must fall within the task's overall `startDate` and `endDate`.

---

## Split Tasks at Load Time (Self-Referential Data)

Use `taskFields.segmentId` for flat/self-referential data where segments are separate records:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  segmentId: 'SegmentTaskID'  // Links segment rows to their parent task
};

public data: object[] = [
  { TaskID: 1, TaskName: 'Main Task', StartDate: new Date('04/02/2024'), Duration: 10 },
  // Segment records reference the parent task via segmentId
  { TaskID: 1, SegmentTaskID: 1, StartDate: new Date('04/02/2024'), Duration: 3 },
  { TaskID: 2, SegmentTaskID: 1, StartDate: new Date('04/08/2024'), Duration: 4 }
];
```

---

## Split Tasks Dynamically — Dialog

Enable dynamic splitting via the edit dialog's Segments tab:

```typescript
// Requirements:
// 1. Inject EditService
// 2. Map taskFields.segments or taskFields.segmentId
// 3. editSettings.allowEditing = true
public editSettings: object = { allowEditing: true };
public taskFields: object = { ..., segments: 'Segments' };
```

In the dialog, the **Segments** tab allows users to add/remove/edit segments visually.

---

## Split Tasks Dynamically — Context Menu

Enable the **Split Task** option via the context menu:

```typescript
// Inject ContextMenuService and EditService
// Add 'SplitTask' to contextMenuItems
public contextMenuItems: object[] = ['SplitTask', 'MergeTask'];
```

```html
<ejs-gantt [enableContextMenu]="true" [contextMenuItems]="contextMenuItems"></ejs-gantt>
```

Right-click a task to see Split Task option.

---

## Merge Tasks Dynamically

Merge split segments back into a single taskbar:
- **Context menu:** Right-click a split task → **Merge Task**
- **Drag:** Drag segments together until they touch — they merge automatically

Requirements: `enableContextMenu: true`, `ContextMenuService` injected, `EditService` injected.

---

## Detect Segment Click

Get which segment was clicked using `onTaskbarClick`:

```typescript
public onTaskbarClick(args: any): void {
  if (args.segmentIndex !== undefined) {
    console.log('Clicked segment index:', args.segmentIndex);
    console.log('Segment data:', args.data.ganttProperties.segments[args.segmentIndex]);
  }
}
```

---

## Limitations

- Parent tasks and milestones **cannot** be split
- The task must be wider than one timeline unit cell to be splittable
- Split tasks are **not compatible** with Multi-Taskbar feature (`showOverAllocationAsMultiTaskbar`)
- All segment dates must fall within the parent task's start and end date range
