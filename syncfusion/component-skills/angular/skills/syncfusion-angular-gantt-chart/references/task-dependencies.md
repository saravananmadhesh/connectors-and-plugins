# Task Dependencies in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Configure Dependencies](#configure-dependencies)
- [Dependency Types](#dependency-types)
- [Predecessor Offsets](#predecessor-offsets)
- [Auto-Update Predecessor Offset](#auto-update-predecessor-offset)
- [Parent Dependencies](#parent-dependencies)
- [Editing Dependencies](#editing-dependencies)
- [Dependency Validation](#dependency-validation)
- [Connector Line Styling](#connector-line-styling)
- [Programmatic Management](#programmatic-management)

---

## Overview

Task dependencies define relationships between tasks, where changes to a predecessor automatically affect its successors. Dependencies are defined as string values in the data source (e.g., `'2FS'`, `'3SS+1d'`) and mapped using `taskFields.dependency`.

The `allowedDependencyTypes` property can be used to restrict which dependency types users can create or edit. When configured, the Gantt component blocks dependency creation and validation for any dependency type that is not included in the allowed set.

---

## Configure Dependencies

Map the predecessor field in `taskFields.dependency`:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  dependency: 'Predecessor'   // Field containing dependency strings
};

public data: object[] = [
  { TaskID: 1, TaskName: 'Task 1', StartDate: new Date('04/02/2024'), Duration: 3 },
  { TaskID: 2, TaskName: 'Task 2', StartDate: new Date('04/05/2024'), Duration: 3, Predecessor: '1FS' },
  { TaskID: 3, TaskName: 'Task 3', StartDate: new Date('04/05/2024'), Duration: 3, Predecessor: '1FS,2SS' }  // Multiple predecessors
];
```

Multiple dependencies are comma-separated: `'2FS,3FS'`.

---

## Dependency Types

| Type | Format | Meaning |
|------|--------|---------|
| Finish-to-Start | `'NFS'` | Successor starts after predecessor finishes (default) |
| Start-to-Start | `'NSS'` | Successor starts when predecessor starts |
| Finish-to-Finish | `'NFF'` | Successor finishes when predecessor finishes |
| Start-to-Finish | `'NSF'` | Successor finishes when predecessor starts |

Where `N` is the task ID. Example: `'2FS'` means "after task 2 finishes, this task can start."

---

## Predecessor Offsets

Add lag (+) or lead (-) time after the dependency type:

```
'2FS+3d'   → Start 3 days after task 2 finishes
'2FS-1d'   → Start 1 day before task 2 finishes (lead)
'2SS+2h'   → Start 2 hours after task 2 starts
'2FS+30m'  → Start 30 minutes after task 2 finishes
```

Supported units: `d` (day), `h` (hour), `m` (minute)

```typescript
public data: object[] = [
  { TaskID: 2, TaskName: 'Foundation', StartDate: new Date('04/02/2024'), Duration: 4 },
  { TaskID: 3, TaskName: 'Framing', StartDate: new Date('04/02/2024'), Duration: 5, Predecessor: '2FS+2d' }
];
```

---

## Auto-Update Predecessor Offset

The `autoUpdatePredecessorOffset` property synchronizes predecessor offset values with actual taskbar positions on initial data load:

```html
<ejs-gantt [autoUpdatePredecessorOffset]="true"></ejs-gantt>
```

When enabled, if the data source contains offset values that don't match the rendered taskbar positions, the displayed predecessor column values are automatically corrected.

---

## Parent Dependencies

By default, `allowParentDependency` is `true`, enabling dependencies between parent-parent, child-child, parent-child, and child-parent tasks:

```html
<ejs-gantt [allowParentDependency]="true"></ejs-gantt>
```

To restrict dependencies to leaf tasks only, set to `false`.

---

## Editing Dependencies

Enable taskbar editing to create/modify dependencies via drag-and-drop:

```typescript
public editSettings: object = {
  allowTaskbarEditing: true  // Enables connector line drag
};
```

Inject `EditService`. Users can:
- **Drag connector points** on taskbar ends to create new dependency links
- **Edit the Dependency tab** in the dialog when `mode: 'Dialog'`
- **Type predecessor strings** directly when cell editing is active

---

## Dependency Validation

When dependencies create conflicts (e.g., circular dependencies or date violations), the Gantt triggers the `actionBegin` event with `requestType: 'validateLinkedTask'`. Handle it to show custom warnings or cancel validation:

```typescript
public actionBegin(args: any): void {
  if (args.requestType === 'validateLinkedTask') {
    // args.validateMode.preserveLinkWithEditing = true;  // Keep link, adjust task
    // args.validateMode.removeLink = true;               // Remove the conflicting link
    // args.validateMode.respectLink = true;              // Revert task date to respect link
    args.cancel = false;  // Set true to show validation dialog to user
  }
}
```

---

## Connector Line Styling

Customize the appearance of dependency connector lines:

```html
<ejs-gantt
  [connectorLineWidth]="2"
  connectorLineBackground="#FF6B6B">
</ejs-gantt>
```

For dynamic styling per task, use `queryTaskbarInfo`:

```typescript
public queryTaskbarInfo(args: any): void {
  if (args.data.Predecessor) {
    args.connectorLineColor = '#FF0000';  // Red for tasks with predecessors
  }
}
```

---

## Allowed Dependency Types

The `allowedDependencyTypes` property restricts which dependency types can be created, edited, or loaded in the Gantt Chart. When configured, the Gantt validates dependency strings during initial load and prevents UI-based dependency creation for disallowed types.

```html
<ejs-gantt [allowedDependencyTypes]="['FS', 'SF']"></ejs-gantt>
```

### When to use

Use `allowedDependencyTypes` when:
- Your project should only use specific relationship types (e.g., only Finish-to-Start for a sequential project)
- You need to prevent users from creating certain dependency types through the UI
- You want to enforce a specific scheduling pattern at the data validation level

### Example — restrict to FS and SS only

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <ejs-gantt
      [dataSource]="data"
      [taskFields]="taskFields"
      [allowedDependencyTypes]="['FS', 'SS']"
      [editSettings]="editSettings">
    </ejs-gantt>
  `
})
export class AppComponent {
  public allowedDependencyTypes: string[] = ['FS', 'SS'];

  public editSettings: object = {
    allowTaskbarEditing: true
  };

  public data: object[] = [
    { TaskID: 1, TaskName: 'Task 1', StartDate: new Date('04/02/2024'), Duration: 3 },
    { TaskID: 2, TaskName: 'Task 2', StartDate: new Date('04/05/2024'), Duration: 3, Predecessor: '1FS' },
    { TaskID: 3, TaskName: 'Task 3', StartDate: new Date('04/02/2024'), Duration: 2, Predecessor: '1SS' }
  ];

  public taskFields: object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    dependency: 'Predecessor'
  };
}
```

### Behavior

- **During load:** Dependency strings with disallowed types are ignored or rejected
- **During UI editing:** The Gantt blocks connector creation for disallowed types
- **Programmatically:** Dependency methods respect `allowedDependencyTypes`

---

## Programmatic Management

Add or remove dependencies without user interaction:

```typescript
// Add a predecessor programmatically
ganttInstance.addPredecessor(3, '2FS');

// Remove a predecessor
ganttInstance.removePredecessor(3, '2FS');

// Update predecessor via updateRecordById
ganttInstance.updateRecordById({
  TaskID: 3,
  Predecessor: '2FS+1d'
});
```

Access the Gantt instance via `@ViewChild`:
```typescript
import { ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@ViewChild('gantt') ganttObj: GanttComponent;

addDependency(): void {
  this.ganttObj.addPredecessor(3, '2FS');
}
```
