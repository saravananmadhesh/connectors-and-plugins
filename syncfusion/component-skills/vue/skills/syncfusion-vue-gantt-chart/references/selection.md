# Selection

## Table of Contents
- [Selection Overview](#selection-overview)
- [Enable / Disable Selection](#enable--disable-selection)
- [Selection Mode](#selection-mode)
- [Selection Type](#selection-type)
- [Row Selection](#row-selection)
- [Select Row on Initial Load](#select-row-on-initial-load)
- [Select Row Dynamically](#select-row-dynamically)
- [Multiple Row Selection](#multiple-row-selection)
- [Select Rows Based on Condition](#select-rows-based-on-condition)
- [Cell Selection](#cell-selection)
- [Multiple Cell Selection](#multiple-cell-selection)
- [Select Cell Dynamically](#select-cell-dynamically)
- [Toggle Selection](#toggle-selection)
- [Hover Highlighting](#hover-highlighting)
- [selectionSettings Reference](#selectionsettings-reference)
- [Programmatic Selection APIs](#programmatic-selection-apis)
- [Selection Events](#selection-events)
- [Prevent Row Selection](#prevent-row-selection)
- [Prevent Cell Selection](#prevent-cell-selection)
- [Checkbox Selection](#checkbox-selection)
- [Touch Interaction](#touch-interaction)

## Selection Overview

Gantt supports row and cell selection. Selection is enabled by default. Inject the `Selection` module and configure via `selectionSettings`.

```js
import { GanttComponent as EjsGantt, Selection } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Selection]);
```

## Enable / Disable Selection

Selection is enabled by default. Disable it entirely with `allowSelection: false`:

```vue
<ejs-gantt :allowSelection="false" ...></ejs-gantt>
```

## Selection Mode

Set `selectionSettings.mode` to control what can be selected:

| Mode | Description |
|---|---|
| `'Row'` | Select entire rows only (default) |
| `'Cell'` | Select individual grid cells only |
| `'Both'` | Select rows and cells simultaneously |

```vue
<ejs-gantt :selectionSettings="{ mode: 'Both' }" ...></ejs-gantt>
```

## Selection Type

Set `selectionSettings.type` to control how many items can be selected:

| Type | Description |
|---|---|
| `'Single'` | Only one row or cell at a time (default) |
| `'Multiple'` | Multiple rows or cells — hold Ctrl to add to selection |

## Row Selection

```vue
<ejs-gantt
  :selectionSettings="selectionSettings"
  @rowSelected="onRowSelected"
  @rowDeselected="onRowDeselected"
  ...
></ejs-gantt>

<script setup>
const selectionSettings = {
  mode: 'Row',
  type: 'Single'
};

function onRowSelected(args) {
  console.log('Selected row data:', args.data);
  console.log('Selected row index:', args.rowIndex);
}

function onRowDeselected(args) {
  console.log('Deselected row data:', args.data);
}
</script>
```

## Select Row on Initial Load

Use `selectedRowIndex` to pre-select a row when the Gantt first renders (zero-based flat row index):

```vue
<ejs-gantt :selectedRowIndex="5" ...></ejs-gantt>
```

## Select Row Dynamically

```js
const gantt = this.$refs.ganttRef.ej2Instances;

gantt.selectionModule.selectRow(2);          // select single row by index
gantt.selectionModule.selectRows([1, 2, 3]); // select multiple rows by indexes
```

## Multiple Row Selection

```vue
<ejs-gantt :selectionSettings="{ mode: 'Row', type: 'Multiple' }" ...></ejs-gantt>
```

Hold **Ctrl+Click** to add rows to the selection. Hold **Shift+Click** to select a range.

## Select Rows Based on Condition

Select rows programmatically based on data values using the `dataBound` event:

```vue
<ejs-gantt
  :selectionSettings="{ mode: 'Row', type: 'Multiple' }"
  @dataBound="onDataBound"
  ...
></ejs-gantt>

<script setup>
const gantt = ref(null);

function onDataBound() {
  const ganttObj = gantt.value.ej2Instances;
  const rowIndexes = [];
  ganttObj.treeGrid.grid.dataSource.forEach((data, index) => {
    if (data.TaskID === 3 || data.TaskID === 4) {
      rowIndexes.push(index);
    }
  });
  ganttObj.selectionModule.selectRows(rowIndexes);
}
</script>
```

## Cell Selection

Set `mode: 'Cell'` to enable cell selection:

```vue
<ejs-gantt :selectionSettings="{ mode: 'Cell' }" @cellSelected="onCellSelected" ...></ejs-gantt>

<script setup>
function onCellSelected(args) {
  // args.selectedRowCellIndex contains cellIndexes and rowIndex
  console.log('Selected cell indexes:', args.selectedRowCellIndex[0].cellIndexes);
}
</script>
```

Get all selected cell info using `getSelectedRowCellIndexes()`:

```js
const selected = gantt.selectionModule.getSelectedRowCellIndexes();
// returns [{ rowIndex: 1, cellIndexes: [2] }, ...]
```

> **Note:** Cell selection is not supported when virtualization (`enableVirtualization`) is enabled.

## Multiple Cell Selection

```vue
<ejs-gantt :selectionSettings="{ mode: 'Cell', type: 'Multiple' }" ...></ejs-gantt>
```

Hold **Ctrl+Click** to select multiple cells.

## Select Cell Dynamically

```js
const gantt = this.$refs.ganttRef.ej2Instances;

gantt.selectionModule.selectCell({ rowIndex: 1, cellIndex: 1 });
```

## Toggle Selection

When `enableToggle: true`, clicking an already-selected row or cell deselects it. Default is `false`.

```vue
<ejs-gantt :selectionSettings="{ mode: 'Row', type: 'Multiple', enableToggle: true }" ...></ejs-gantt>
```

Disable toggle programmatically at runtime:

```js
gantt.selectionSettings.enableToggle = false;
```

## Hover Highlighting

Enable hover highlighting on grid rows, taskbars, header cells, and timeline cells:

```vue
<ejs-gantt :enableHover="true" ...></ejs-gantt>
```

## selectionSettings Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `mode` | string | `'Row'` | `'Row'`, `'Cell'`, or `'Both'` |
| `type` | string | `'Single'` | `'Single'` or `'Multiple'` |
| `enableToggle` | boolean | `false` | Click selected row/cell again to deselect |
| `persistSelection` | boolean | `false` | Persist selection across data refresh |
| `checkboxOnly` | boolean | `false` | Allow selection only via checkbox column |
| `checkboxMode` | string | `'Default'` | `'Default'` or `'ResetOnRowClick'` |

## Programmatic Selection APIs

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Row selection
gantt.selectionModule.selectRow(2);           // by row index
gantt.selectionModule.selectRows([0, 2, 4]);  // multiple indexes

// Cell selection
gantt.selectionModule.selectCell({ rowIndex: 1, cellIndex: 2 });

// Clear all selection
gantt.clearSelection();

// Get selected data
const records = gantt.getSelectedRecords();                        // array of data objects
const indexes = gantt.getSelectedRowIndexes();                     // array of row indexes
const cells   = gantt.selectionModule.getSelectedRowCellIndexes(); // cell selection info
```

## Selection Events

| Event | Args | When fired |
|---|---|---|
| `rowSelecting` | `data`, `cancel` | Before row selection — set `args.cancel = true` to prevent |
| `rowSelected` | `data`, `rowIndex`, `row` | After row selection completes |
| `rowDeselecting` | `data`, `cancel` | Before row deselection — set `args.cancel = true` to prevent |
| `rowDeselected` | `data`, `rowIndex`, `row` | After row deselection completes |
| `cellSelecting` | `data`, `cellIndex`, `cancel` | Before cell selection — set `args.cancel = true` to prevent |
| `cellSelected` | `selectedRowCellIndex` | After cell selection completes |
| `cellDeselected` | `selectedRowCellIndex` | After cell deselection completes |

## Prevent Row Selection

Use the `rowSelecting` event to cancel selection based on row data:

```vue
<ejs-gantt @rowSelecting="onRowSelecting" ...></ejs-gantt>

<script setup>
function onRowSelecting(args) {
  if (args.data.TaskID === 4) {
    args.cancel = true;
  }
}
</script>
```

## Prevent Cell Selection

Use the `cellSelecting` event to cancel cell selection based on row/cell conditions:

```vue
<ejs-gantt :selectionSettings="{ mode: 'Cell' }" @cellSelecting="onCellSelecting" ...></ejs-gantt>

<script setup>
function onCellSelecting(args) {
  if (args.data.TaskID === 4 && args.cellIndex.cellIndex === 1) {
    args.cancel = true;
  }
}
</script>
```

## Checkbox Selection

Add a checkbox column and restrict selection to checkbox clicks only:

```js
const columns = [
  { type: 'checkboxselect', width: 50 },
  { field: 'TaskName', headerText: 'Task Name', width: 250 },
];

const selectionSettings = {
  type: 'Multiple',
  checkboxOnly: true
};
```

```vue
<ejs-gantt :columns="columns" :selectionSettings="selectionSettings" ...></ejs-gantt>
```

### checkboxMode options

| Value | Behavior |
|---|---|
| `'Default'` | Clicking a row also toggles its checkbox |
| `'ResetOnRowClick'` | Clicking a row clears all other checkboxes and selects only that row |

## Hierarchy Checkbox Mode

Hierarchy checkbox mode controls how checkbox selection behaves within the parent-child hierarchy of tasks. The `hierarchyMode` property defines how parent, child, and sibling checkboxes interact when selected.

### Enable Hierarchy Checkbox Selection

Hierarchy checkbox mode works in conjunction with checkbox selection. Enable it by setting the `hierarchyMode` property in `selectionSettings`:

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :columns="columns"
    :selectionSettings="selectionSettings"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { Selection } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Selection]);

const columns = [
  { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
  { field: 'TaskName', headerText: 'Task Name', width: 250 },
  { field: 'StartDate', headerText: 'Start Date', width: 100, format: 'yMd' },
  { field: 'Progress', headerText: 'Progress', width: 80 }
];

const selectionSettings = {
  type: 'Multiple',
  mode: 'Row',
  hierarchyMode: 'Hierarchy'  // Enable hierarchy checkbox mode
};

const data = [
  { TaskID: 1, TaskName: 'Project', StartDate: new Date('04/02/2024'), Progress: 0, subtasks: [
    { TaskID: 2, TaskName: 'Phase 1', StartDate: new Date('04/02/2024'), Progress: 50, subtasks: [
      { TaskID: 3, TaskName: 'Design', StartDate: new Date('04/02/2024'), Progress: 50 },
      { TaskID: 4, TaskName: 'Prototype', StartDate: new Date('04/05/2024'), Progress: 50 }
    ]},
    { TaskID: 5, TaskName: 'Phase 2', StartDate: new Date('04/15/2024'), Progress: 0 }
  ]}
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  child: 'subtasks'
};
</script>
```

### Hierarchy Checkbox Mode Values

The `hierarchyMode` property accepts three values that control selection propagation:

| Value | Default | Description |
|---|---|---|
| `'Self'` | — | Selects only the clicked record; independent selection |
| `'Hierarchy'` | ✓ Yes | Propagates selection through parent-child hierarchy |
| `'FilteredHierarchy'` | — | Propagates selection only to records visible in the current filtered/searched view |

### Mode Behavior

#### Self Mode

- Selects only the current record when its checkbox is clicked
- Parent selection does **not** affect child records
- Child selection does **not** affect parent or sibling records
- Useful for independent task selection where parent and children are unrelated

```vue
<script setup>
const selectionSettings = {
  type: 'Multiple',
  hierarchyMode: 'Self'  // No propagation
};
</script>
```

**Selection Example (Self Mode):**
```
Project (Unchecked)
├─ Phase 1 (Checked)      ← Selecting Phase 1 does NOT check Project or children
│  ├─ Design (Unchecked)
│  └─ Prototype (Unchecked)
└─ Phase 2 (Unchecked)
```

#### Hierarchy Mode (Default)

- Selecting a **parent** record checks all its descendant records
- Selecting a **child** record updates ancestor selection state according to hierarchy rules
- Collapsed descendants are still included because selection is based on the data hierarchy, not only on visible rows
- Useful for "select all related tasks" scenarios

```vue
<script setup>
const selectionSettings = {
  type: 'Multiple',
  hierarchyMode: 'Hierarchy'  // Full hierarchy propagation
};
</script>
```

**Selection Example (Hierarchy Mode):**
```
Project (Unchecked)
├─ Phase 1 (Check this)    ← Checking Phase 1 automatically:
│  ├─ Design (Auto-checked)  - Checks all children
│  └─ Prototype (Auto-checked)
└─ Phase 2 (Unchecked)

---OR---

Project (Check this)        ← Checking Project automatically:
├─ Phase 1 (Auto-checked)    - Checks all descendants
│  ├─ Design (Auto-checked)
│  └─ Prototype (Auto-checked)
└─ Phase 2 (Auto-checked)
```

**Partial Selection:**
If some children are checked and others are not, the parent shows an indeterminate state (half-checked).

#### FilteredHierarchy Mode

- Behaves like `Hierarchy` for the visible filtered set
- Selection propagates only to records currently visible after filtering or searching
- Hidden records remain unchanged (neither selected nor deselected)
- Useful when users need selection to respect the current filtered context

```vue
<script setup>
const selectionSettings = {
  type: 'Multiple',
  hierarchyMode: 'FilteredHierarchy'  // Filtered hierarchy propagation
};
</script>
```

**Selection Example (FilteredHierarchy Mode with Filter Active):**
```
All Tasks:                    After filtering (Progress >= 50%):
✓ Project                     ✓ Project
├─ Phase 1                    ├─ Phase 1
│  ├─ Design (50%)            │  ├─ Design (50%)
│  └─ Prototype (50%)         │  └─ Prototype (50%)
└─ Phase 2 (0%)               (Phase 2 hidden — 0% progress)

Checking "Design" in filtered view:
- Design checked
- Phase 1 indeterminate (only 1/2 children visible and checked)
- Project indeterminate
- Phase 2 remains unchanged (not visible, not affected)
```

### Selection Propagation Rules

| Interaction | Self | Hierarchy | FilteredHierarchy |
|---|---|---|---|
| Check parent | Select parent only | Select parent + all descendants | Select parent + visible descendants |
| Check child | Select child only | Select child + update parent state | Select child + update parent state (visible only) |
| Uncheck parent | Deselect parent only | Deselect parent + all descendants | Deselect parent + visible descendants |
| Uncheck child | Deselect child only | Deselect child + update parent state | Deselect child + update parent state (visible only) |

### Interaction with Other Features

#### Virtual Scrolling

Hierarchy checkbox mode works correctly with virtual scrolling. Selection state is maintained across scrolled rows:

```vue
<ejs-gantt
  :enableVirtualization="true"
  :selectionSettings="{ type: 'Multiple', hierarchyMode: 'Hierarchy' }"
  ...
></ejs-gantt>
```

When a parent with many children is selected while virtualizing, all children (both visible and off-screen) are selected.

#### Paging

On paginated data, hierarchy selection propagates within each page. Parent-child relationships span pages correctly.

#### Filtering

- **Hierarchy Mode** — unfiltered records retain selection state; filtered records follow hierarchy rules
- **FilteredHierarchy Mode** — only visible records are affected; hidden records are untouched

#### Sorting

Hierarchy checkbox mode is independent of sorting. Parent-child relationships are preserved, and selection propagation follows the data hierarchy, not the displayed sort order.

#### Collapsed/Expanded Rows

Selection propagates to collapsed descendants automatically. When a parent is selected, all its children are checked regardless of expand/collapse state. Expanding a parent later shows all children checked.

### Example: Hierarchy Mode with Filtering

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :columns="columns"
    :allowFiltering="true"
    :selectionSettings="selectionSettings"
    @rowSelecting="onRowSelecting"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { Filter, Selection } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Filter, Selection]);

const columns = [
  { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
  { field: 'TaskName', headerText: 'Task', width: 200 },
  { field: 'Progress', headerText: 'Progress', width: 100 }
];

const selectionSettings = {
  type: 'Multiple',
  hierarchyMode: 'FilteredHierarchy'
};

const data = [
  { TaskID: 1, TaskName: 'Project', Progress: 45, subtasks: [
    { TaskID: 2, TaskName: 'Phase 1', Progress: 50, subtasks: [
      { TaskID: 3, TaskName: 'Design', Progress: 100 },
      { TaskID: 4, TaskName: 'Review', Progress: 50 }
    ]},
    { TaskID: 5, TaskName: 'Phase 2', Progress: 0 }
  ]}
];

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  child: 'subtasks'
};

function onRowSelecting(args) {
  console.log('Selecting:', args.data.TaskName);
}
</script>
```

### Best Practices

1. **Choose the Right Mode** — Use `Self` for independent selections, `Hierarchy` for "select all related", `FilteredHierarchy` when filters are active.

2. **Document Mode Choice** — Inform users how selection propagates in your application.

3. **Test with Filters** — If your Gantt supports filtering, test both `Hierarchy` and `FilteredHierarchy` modes to ensure correct behavior.

4. **Consider User Expectations** — Power users expect `Hierarchy` mode; casual users may prefer `Self` mode.

5. **Combine with Events** — Use `rowSelecting` event to add custom logic on top of hierarchy modes.

---

## Touch Interaction

On touch devices:
- **Single tap** on a row — selects that row
- **Multi-row selection** — tap a row to see the multi-select popup, then tap additional rows to add to the selection
