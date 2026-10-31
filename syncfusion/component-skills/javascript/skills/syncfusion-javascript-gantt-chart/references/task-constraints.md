# Task Constraints in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Benefits of Task Constraints](#benefits-of-task-constraints)
- [Constraint Types](#constraint-types)
- [Configuring Constraints](#configuring-constraints)
- [Handle Constraint Violations](#handle-constraint-violations)
- [Constraint Interaction with taskMode](#constraint-interaction-with-taskmode)
- [Editing Constraints](#editing-constraints)
- [Gotchas & Edge Cases](#gotchas--edge-cases)

---

## Overview

Task constraints define scheduling rules that control when tasks can start or finish. They are separate from dependencies — constraints enforce absolute or relative date boundaries, while dependencies define task-to-task ordering.

Use constraints when you need to:
- Pin a task to a specific date (e.g. contract start: MSO)
- Enforce a hard deadline (e.g. regulatory due date: MFO / FNLT)
- Prevent a task from starting before approval (SNET)
- Delay a task as late as possible without affecting successors (ALAP)

---

## Benefits of Task Constraints

Task constraints enhance project planning with the following advantages:
- Enforce logical task sequences, ensuring dependencies are respected (e.g., taskbars align with predecessors).
- Anchor tasks to fixed milestone dates, such as product launches or audits.
- Prevent resource conflicts by spacing tasks that share teams or equipment.
- Support "what-if" scenario testing by adjusting constraints to explore timeline impacts.
- Meet compliance deadlines, ensuring taskbars reflect regulatory requirements.
- Improve accuracy by incorporating real-world constraints like material availability.

---

## Constraint Types

| Constraint | Enum Value | Description | Typical Use Case |
|------------|-----------|-------------|-----------------|
| As Soon As Possible (ASAP) | `0` | Starts as soon as dependencies allow. Default for auto-scheduled tasks. | Normal auto-scheduled task |
| As Late As Possible (ALAP) | `1` | Delays to latest possible start without delaying successors | Finalize docs just before release |
| Must Start On (MSO) | `2` | Task must start on the specified date | Contract-fixed start date |
| Must Finish On (MFO) | `3` | Task must finish on the specified date | Compliance deadline |
| Start No Earlier Than (SNET) | `4` | Task cannot start before the specified date | Wait for regulatory approval |
| Start No Later Than (SNLT) | `5` | Task must start on or before the specified date | Reviews must begin by Sept 1 |
| Finish No Earlier Than (FNET) | `6` | Task cannot finish before the specified date | Training can't end before onboarding completes |
| Finish No Later Than (FNLT) | `7` | Task must finish on or before the specified date | QA must complete by July 25 |

---

## Configuring Constraints

Map `constraintType` and `constraintDate` in `taskFields`, then include these fields in your data source:

```typescript
import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection);

let constraintData: Object[] = [
    {
        taskId: 1, taskName: 'Project Planning',
        startDate: new Date('04/01/2024'), duration: 5, progress: 0,
        constraintType: 2,                          // Must Start On (MSO)
        constraintDate: new Date('04/03/2024')      // pinned start date
    },
    {
        taskId: 2, taskName: 'Regulatory Submission',
        startDate: new Date('04/08/2024'), duration: 3, progress: 0,
        constraintType: 7,                          // Finish No Later Than (FNLT)
        constraintDate: new Date('04/15/2024'),     // must finish by this date
        parentId: 1
    },
    {
        taskId: 3, taskName: 'Development',
        startDate: new Date('04/01/2024'), duration: 8, progress: 0,
        constraintType: 4,                          // Start No Earlier Than (SNET)
        constraintDate: new Date('04/05/2024'),     // can't start before this
        parentId: 1
    }
];

let gantt: Gantt = new Gantt({
    dataSource: constraintData,
    height: '450px',
    taskFields: {
        id: 'taskId',
        name: 'taskName',
        startDate: 'startDate',
        duration: 'duration',
        progress: 'progress',
        parentID: 'parentId',
        constraintType: 'constraintType',    // maps the constraint type field
        constraintDate: 'constraintDate'     // maps the constraint date field
    },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true }
});
gantt.appendTo('#Gantt');
```

---

## Handle Constraint Violations

Constraint violations occur when scheduling changes (e.g., dragging taskbars) conflict with strict constraints (**MustStartOn**, **MustFinishOn**, **StartNoLaterThan**, **FinishNoLaterThan**). By default, a validation popup alerts users.

Use the `actionBegin` event with `requestType: 'validateTaskViolation'` to handle violations programmatically via `args.validateMode` flags:

| Flag | Constraint Handled | Behavior when `true` |
|------|--------------------|----------------------|
| `respectMustStartOn` | Must Start On (MSO) | Silently rejects the edit — no popup |
| `respectMustFinishOn` | Must Finish On (MFO) | Silently rejects the edit — no popup |
| `respectStartNoLaterThan` | Start No Later Than (SNLT) | Silently rejects the edit — no popup |
| `respectFinishNoLaterThan` | Finish No Later Than (FNLT) | Silently rejects the edit — no popup |

Setting a flag to `false` (default) shows the validation popup instead.

```typescript
import { Gantt, Edit, Toolbar, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection);

let gantt: Gantt = new Gantt({
    dataSource: constraintData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        endDate: 'EndDate', duration: 'Duration', progress: 'Progress',
        constraintType: 'ConstraintType', constraintDate: 'ConstraintDate',
        dependency: 'Predecessor', parentID: 'parentID'
    },
    editSettings: {
        allowAdding: true, allowEditing: true,
        allowDeleting: true, allowTaskbarEditing: true
    },
    actionBegin: function (args: any) {
        if (args.requestType === 'validateTaskViolation') {
            // Silently reject all strict constraint violations (no popup)
            args.validateMode.respectMustStartOn = true;
            args.validateMode.respectMustFinishOn = true;
            args.validateMode.respectStartNoLaterThan = true;
            args.validateMode.respectFinishNoLaterThan = true;
        }
    }
});
gantt.appendTo('#Gantt');
```

> To suppress only a specific violation (e.g., MustStartOn), set only that flag to `true` and leave others as `false` to retain the popup for remaining constraint types.

---

## Constraint Interaction with taskMode

| taskMode | Constraint Behaviour |
|----------|---------------------|
| `'Auto'` | Constraints are enforced; auto-scheduling respects constraint dates |
| `'Manual'` | Constraints are set but auto-recalculation doesn't fire; user manages dates |
| `'Custom'` | Constraints apply per task based on `manual` field value |

**Example — ASAP with dependencies:**
In Auto mode with ASAP (default), a task starts immediately when its predecessor finishes. If you add SNET `2024-04-10`, the task won't start before April 10 even if the predecessor finishes earlier.

---

## Editing Constraints

When editing is enabled, constraints can be edited through the dialog editor. The constraint type and constraint date fields appear in the task dialog when properly mapped.

To show constraint fields in the edit dialog:
```typescript
editSettings: {
    allowEditing: true,
    mode: 'Dialog'
}
```

Constraints can also be set programmatically:
```typescript
// Update constraint for a specific task
gantt.updateRecordByID({
    taskId: 2,
    constraintType: 5,                       // SNLT
    constraintDate: new Date('04/20/2024')
});
```

---

## Gotchas & Edge Cases

**Conflict between constraints and dependencies:**
- If SNET is set to April 10, but a FS dependency requires the task to start April 15, the later date wins (task starts April 15)
- MFO constraint date earlier than the calculated finish will cause the task to appear "late" — no automatic shortening

**ALAP in auto mode:**
- ALAP pushes the task as late as possible while not delaying the project end
- In a project with no successors, ALAP may push the task to project end date

**Constraint date is required for MSO, MFO, SNET, SNLT, FNET, FNLT:**
- ASAP and ALAP do not use a constraint date
- Providing a constraint date for ASAP/ALAP has no effect

**Numeric vs string values:**
- `constraintType` accepts the numeric enum value (0–7)
- Always use numbers in the data source, not strings
