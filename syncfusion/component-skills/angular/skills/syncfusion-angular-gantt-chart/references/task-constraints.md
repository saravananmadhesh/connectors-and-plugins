# Task Constraints in Angular Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Constraint Types](#constraint-types)
- [Configure Constraints](#configure-constraints)
- [Constraints vs. Manual Scheduling](#constraints-vs-manual-scheduling)
- [Interaction with Dependencies](#interaction-with-dependencies)
- [Common Use Cases](#common-use-cases)

---

## Overview

Task constraints define scheduling rules that control when tasks start or finish — enforcing fixed deadlines, minimum start dates, and compliance dates. They interact with `taskMode` and dependency calculations.

---

## Constraint Types

| Constraint | Enum Value | Description |
|-----------|-----------|-------------|
| As Soon As Possible (ASAP) | `0` | Starts as soon as dependencies are met (default) |
| As Late As Possible (ALAP) | `1` | Delays until latest possible start without delaying successors |
| Must Start On (MSO) | `2` | Task must start on the specified date |
| Must Finish On (MFO) | `3` | Task must finish on the specified date |
| Start No Earlier Than (SNET) | `4` | Task cannot start before the specified date |
| Start No Later Than (SNLT) | `5` | Task must start on or before the specified date |
| Finish No Earlier Than (FNET) | `6` | Task cannot finish before the specified date |
| Finish No Later Than (FNLT) | `7` | Task must finish on or before the specified date |

---

## Configure Constraints

Map `constraintType` and `constraintDate` in `taskFields`:

```typescript
public taskFields: object = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  constraintType: 'ConstraintType',  // Numeric enum value
  constraintDate: 'ConstraintDate'   // Date value for applicable constraints
};

public data: object[] = [
  {
    TaskID: 1,
    TaskName: 'Design Phase',
    StartDate: new Date('04/02/2024'),
    Duration: 5,
    ConstraintType: 4,                        // SNET: Start No Earlier Than
    ConstraintDate: new Date('04/05/2024')    // Cannot start before April 5
  },
  {
    TaskID: 2,
    TaskName: 'Compliance Submission',
    StartDate: new Date('04/10/2024'),
    Duration: 3,
    ConstraintType: 7,                        // FNLT: Finish No Later Than
    ConstraintDate: new Date('04/15/2024')    // Must finish by April 15
  },
  {
    TaskID: 3,
    TaskName: 'Kick-off Meeting',
    StartDate: new Date('04/02/2024'),
    Duration: 1,
    ConstraintType: 2,                        // MSO: Must Start On
    ConstraintDate: new Date('04/03/2024')    // Must start exactly on April 3
  }
];
```

---

## Constraints vs. Manual Scheduling

- **Auto mode** (`taskMode: 'Auto'`): Constraints are actively enforced and may override dependency-calculated dates.
- **Manual mode** (`taskMode: 'Manual'`): Task dates are fixed by the data source; constraints are stored but may not adjust rendering unless `validateManualTasksOnLinking: true` is set.

ASAP and ALAP work best in Auto mode since they require the scheduler to compute optimal positions.

---

## Interaction with Dependencies

When a constraint conflicts with a dependency (e.g., a predecessor pushes a task past a FNLT date), the Gantt raises `actionBegin` with conflict information. Handle validation to decide how to resolve:

```typescript
public actionBegin(args: any): void {
  if (args.requestType === 'validateLinkedTask') {
    // args.validateMode options determine resolution behavior
    console.log('Constraint conflict detected:', args.data);
  }
}
```

---

## Common Use Cases

- **Fixed milestone delivery:** Use MSO (2) or MFO (3) to anchor regulatory or contractual deadlines.
- **Waiting for external approval:** Use SNET (4) to prevent tasks starting before an approval date.
- **Compliance windows:** Use FNLT (7) to ensure tasks finish before a regulatory deadline.
- **Late-start optimization:** Use ALAP (1) to defer non-critical tasks until the last safe moment, freeing up resources earlier.
