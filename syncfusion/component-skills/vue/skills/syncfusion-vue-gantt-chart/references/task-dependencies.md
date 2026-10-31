# Task Dependencies

Define relationships between tasks so that the Gantt Chart enforces sequencing and validates date changes.

## Table of Contents
- [Dependency Types](#dependency-types)
- [Defining Predecessors](#defining-predecessors)
- [Multiple Predecessors](#multiple-predecessors)
- [Parent-Child Dependencies](#parent-child-dependencies)
- [Connector Line Rendering](#connector-line-rendering)
- [Interactive Dependency Editing](#interactive-dependency-editing)
- [Dependency Validation](#dependency-validation)
- [Critical Path](#critical-path)
- [Predecessor Offset with Duration Units](#predecessor-offset-with-duration-units)
- [Auto Update Predecessor Offset on Load](#auto-update-predecessor-offset-on-load)
- [Disable Offset Auto-Update on Taskbar Edit](#disable-offset-auto-update-on-taskbar-edit)
- [Dependency Validation Modes](#dependency-validation-modes)
- [Show / Hide Dependency Lines](#show--hide-dependency-lines)
- [Gotchas](#gotchas)

## Dependency Types

| Type | Symbol | Meaning |
|---|---|---|
| Finish to Start | `FS` | Successor cannot start until predecessor finishes |
| Start to Start | `SS` | Successor cannot start until predecessor starts |
| Finish to Finish | `FF` | Successor cannot finish until predecessor finishes |
| Start to Finish | `SF` | Successor cannot finish until predecessor starts |

`FS` is the most common — use it as the default when no type is specified.

### Restrict Allowed Dependency Types

Use `allowedDependencyTypes` to restrict which dependency types are permitted within the Gantt component. Dependency types that are not included in the configured array are not allowed during dependency creation or editing.

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :allowedDependencyTypes="['FS', 'SS']"
    :editSettings="editSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, Edit } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit]);

const editSettings = { allowTaskbarEditing: true };

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  dependency: 'Predecessor'
};

const data = [
  { TaskID: 1, TaskName: 'Design', StartDate: new Date('04/02/2024'), Duration: 3 },
  { TaskID: 2, TaskName: 'Review', StartDate: new Date('04/02/2024'), Duration: 2, Predecessor: '1FS' }, // FS allowed
  { TaskID: 3, TaskName: 'Approval', StartDate: new Date('04/02/2024'), Duration: 1, Predecessor: '2SS' } // SS allowed
];
</script>
```

**Default Behavior:**
- If `allowedDependencyTypes` is **not set**, all four types (FS, SS, FF, SF) are allowed
- If `allowedDependencyTypes` **is set**, only specified types are permitted

**Validation Scope:**
- **Data Loading** — Dependencies with disallowed types are ignored or not rendered
- **Dialog Editing** — Dependency type dropdown shows only allowed types
- **Taskbar Editing** — Users can only draw dependencies of allowed types
- **Predecessor Validation** — Disallowed types trigger validation errors

| Array Value | Behavior |
|---|---|
| `[]` | No dependencies allowed (dependency feature disabled) |
| `['FS']` | Only Finish-to-Start allowed |
| `['FS', 'SS']` | FS and SS allowed; FF and SF not allowed |
| Not set | All types (FS, SS, FF, SF) allowed (default) |

#### Example: Restrict to FS and SS

```vue
<ejs-gantt :allowedDependencyTypes="['FS', 'SS']" ...></ejs-gantt>
```

#### Example: FS-only Project

```vue
<ejs-gantt :allowedDependencyTypes="['FS']" ...></ejs-gantt>
```

This is typical for sequential projects where tasks must complete in order.

#### Example: Enable All Types (Explicit)

```vue
<ejs-gantt :allowedDependencyTypes="['FS', 'SS', 'FF', 'SF']" ...></ejs-gantt>
```

---

## Defining Predecessors

Map a string field to `taskFields.dependency`. The format is `"{TaskID}{Type}"` or `"{TaskID}{Type}+{lag}"`.

```js
const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  duration: 'Duration',
  dependency: 'Predecessor',   // maps the predecessor string field
  child: 'subtasks'
};
```

```js
const data = [
  { TaskID: 1, TaskName: 'Site survey', StartDate: new Date('04/02/2019'), Duration: 2 },
  { TaskID: 2, TaskName: 'Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Predecessor: '1FS' },
  { TaskID: 3, TaskName: 'Approval', StartDate: new Date('04/02/2019'), Duration: 2, Predecessor: '2FS' },
  { TaskID: 4, TaskName: 'Planning (parallel)', StartDate: new Date('04/02/2019'), Duration: 3, Predecessor: '1SS' },
  { TaskID: 5, TaskName: 'Report (with lag)', StartDate: new Date('04/02/2019'), Duration: 2, Predecessor: '3FS+2days' },
  { TaskID: 6, TaskName: 'Sign-off (lead)', StartDate: new Date('04/02/2019'), Duration: 1, Predecessor: '3FS-1days' },
];
```

**Predecessor string formats:**
- `"2FS"` — Finish-to-Start from task 2
- `"2SS"` — Start-to-Start from task 2
- `"2FF"` — Finish-to-Finish from task 2
- `"2SF"` — Start-to-Finish from task 2
- `"2FS+2days"` — FS with 2-day lag
- `"2FS+16h"` — FS with 16-hour lag
- `"2FS+960m"` — FS with 960-minute lag
- `"2FS-1days"` — FS with 1-day lead (negative offset)
- `"2FS,3FF"` — multiple predecessors (comma-separated)

## Multiple Predecessors

```js
{ TaskID: 5, TaskName: 'Integration', Predecessor: '2FS,3FF' }
```

## Parent-Child Dependencies

Parent-to-parent, parent-to-child, and child-to-parent dependencies are all supported. Control parent dependency with:

```vue
<ejs-gantt :allowParentDependency="true" ...></ejs-gantt>
```

Default is `true`. Set to `false` to restrict dependencies to leaf tasks only.

## Connector Line Rendering

Connector lines render automatically when `taskFields.dependency` is mapped. No extra configuration needed. The lines follow the dependency type arrow direction.

## Interactive Dependency Editing

Allow users to draw/remove dependency lines by dragging between taskbar handles. Requires:

```vue
<ejs-gantt
  :editSettings="{ allowTaskbarEditing: true }"
  :taskFields="taskFields"
  ...
></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Edit } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit]);
</script>
```

Users can drag from the right handle of one taskbar to the left handle of another to create a dependency.

## Dependency Validation

When a user edits a task date that conflicts with a dependency, the Gantt shows a validation dialog asking how to resolve the conflict. This is automatic when `taskMode` is `Auto`.

Customize validation behavior via:
```vue
<ejs-gantt :validateManualTasksOnLinking="true" ...></ejs-gantt>
```

## Critical Path

Highlight the chain of tasks that determines the project's minimum completion time:

```vue
<ejs-gantt :enableCriticalPath="true" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { CriticalPath } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [CriticalPath]);
</script>
```

Critical tasks and their connector lines are highlighted in red.

## Predecessor Offset with Duration Units

Lag/lead can be expressed in day, hour, or minute units using a suffix:

```js
{ TaskID: 4, Predecessor: '2FS+2days' }   // 2-day lag
{ TaskID: 5, Predecessor: '4FF+960m' }    // 960-minute lag
{ TaskID: 9, Predecessor: '7SS+16h' }     // 16-hour lag
```

## Auto Update Predecessor Offset on Load

`autoUpdatePredecessorOffset` recalculates and synchronizes offset values during initial data load to match rendered positions after applying calendar rules (holidays, weekends, working hours):

```vue
<ejs-gantt :autoUpdatePredecessorOffset="true" ...></ejs-gantt>
```

- `true` (default): Gantt recalculates offsets to match rendered dependency lines.
- `false`: Predecessor column shows original data source values — may cause visual mismatches.

To toggle at runtime (e.g. from a Switch component):

```js
methods: {
  onToggleChange(args) {
    this.$refs.gantt.ej2Instances.autoUpdatePredecessorOffset = args.checked;
  }
}
```

## Disable Offset Auto-Update on Taskbar Edit

By default, editing a taskbar also auto-updates the predecessor offset values. Disable this to allow manual-only offset edits:

```vue
<ejs-gantt :updateOffsetOnTaskbarEdit="false" ...></ejs-gantt>
```

When disabled, offsets can only be changed by editing the predecessor cell or the offset field in the edit dialog.

## Dependency Validation Modes

When a task edit conflicts with a dependency, the `actionBegin` event fires with `requestType = 'validateLinkedTask'`. Three validation modes are available via `args.validateMode`:

| Mode | Default | Description |
|---|---|---|
| `args.validateMode.respectLink` | `false` | Dependency is high-priority — editing reverts if it violates the link |
| `args.validateMode.removeLink` | `false` | Taskbar edit is high-priority — dependency link is removed |
| `args.validateMode.preserveLinkWithEditing` | `true` | Edit is allowed AND predecessor offset is updated to maintain the link |

```vue
<ejs-gantt :actionBegin="onActionBegin" :editSettings="{ allowTaskbarEditing: true }" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Edit } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Edit]);

// Option 1: Respect the link — revert edits that violate dependency
function onActionBegin(args) {
  if (args.requestType === 'validateLinkedTask') {
    args.validateMode.respectLink = true;
  }
}

// Option 2: Show validation dialog (disable all modes)
function onActionBegin(args) {
  if (args.requestType === 'validateLinkedTask') {
    args.validateMode.preserveLinkWithEditing = false;
  }
}
</script>
```

### Validation dialog options

When all validation modes are disabled, a dialog is shown with options:
- **Cancel, Keep the existing link**
- **Remove the link and move the task to start on edited date**
- **Move the task to start on edited date and keep the link** *(shown only if successor starts after predecessor's end)*

## Show / Hide Dependency Lines

Toggle dependency line visibility dynamically using CSS:

```js
const container = document.querySelector('.e-gantt-dependency-view-container');
container.style.visibility = 'hidden';  // hide
container.style.visibility = 'visible'; // show
```

## Gotchas

- **Invalid predecessor string** triggers `actionFailure` — only numeric IDs and valid type codes (FS/SS/FF/SF) are accepted
- **Circular dependency** is caught and rejected by the validation engine
- **Lag unit follows `durationUnit`** — if `durationUnit` is `hour`, lag `+2` means 2 hours, not 2 days
