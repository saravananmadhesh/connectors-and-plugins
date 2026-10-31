# Managing Tasks (Editing)

## Table of Contents
- [Enable Editing](#enable-editing)
- [Edit Modes](#edit-modes)
- [Cell Edit Types and Params](#cell-edit-types-and-params)
- [Cell Edit Template](#cell-edit-template)
- [Disable Editing for a Column](#disable-editing-for-a-column)
- [Read-Only Gantt](#read-only-gantt)
- [Adding Tasks](#adding-tasks)
- [Open New Task Dialog with Default Values](#open-new-task-dialog-with-default-values)
- [Customize Dialog Tabs](#customize-dialog-tabs)
- [Deleting Tasks](#deleting-tasks)
- [Indent and Outdent](#indent-and-outdent)
- [Splitting and Merging Tasks](#splitting-and-merging-tasks)
- [Taskbar Editing](#taskbar-editing)
- [Prevent Editing for Specific Tasks](#prevent-editing-for-specific-tasks)
- [Taskbar Editing Tooltip](#taskbar-editing-tooltip)
- [Touch Interaction](#touch-interaction)
- [Column Validation](#column-validation)
- [Custom Validation](#custom-validation)
- [Dependency and Resource Grid Validation](#dependency-and-resource-grid-validation)
- [Server-Side Persistence](#server-side-persistence)
- [editSettings Reference](#editsettings-reference)
- [Programmatic CRUD APIs](#programmatic-crud-apis)

## Enable Editing

Inject `Edit` and configure `editSettings`:

```vue
<script setup>
import { provide } from 'vue';
import { Edit, Toolbar, Selection } from '@syncfusion/ej2-vue-gantt';

provide('gantt', [Edit, Toolbar, Selection]);

const toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  allowTaskbarEditing: true,
  showDeleteConfirmDialog: true
};
</script>
```

> A column must have `isPrimaryKey: true` for CRUD to work. By default, `taskFields.id` column serves this role.

## Edit Modes

### Cell Editing (Auto mode)

Double-click a TreeGrid cell to edit inline. Double-click chart side opens the dialog.

```js
const editSettings = { allowEditing: true, mode: 'Auto' };
```

### Dialog Editing

Opens a structured dialog for both TreeGrid and chart double-click:

```js
const editSettings = { allowEditing: true, mode: 'Dialog' };
```

The dialog shows tabs: **General**, **Dependency**, **Resources**, **Notes**, **Segments**.

### Taskbar Editing

Drag and resize taskbars directly in the chart area:

```js
const editSettings = { allowTaskbarEditing: true };
```

- **Drag** — moves task (changes start/end dates)
- **Resize left/right handles** — changes start date or duration
- **Drag progress handle** — changes progress percentage
- **Connector line handles** — creates/modifies dependencies

## Cell Edit Types and Params

Set `columns.editType` based on column data type:

| Edit Type | Component | Example params |
|---|---|---|
| `numericedit` | NumericTextBox | `{ decimals: 2, value: 5 }` |
| `defaultedit` | TextBox | — |
| `dropdownedit` | DropDownList | `{ value: 'Germany' }` |
| `booleanedit` | CheckBox | `{ checked: true }` |
| `datepickeredit` | DatePicker | `{ format: 'dd.MM.yyyy' }` |
| `datetimepickeredit` | DateTimePicker | `{ value: new Date() }` |

```js
const columns = [
  { field: 'Duration', editType: 'numericedit', edit: { params: { min: 1 } } },
  { field: 'Progress', editType: 'numericedit', edit: { params: { showSpinButton: false } } }
];
```

## Cell Edit Template

Create a custom editor component for a column using lifecycle hooks:

```js
const dpParams = {
  create: () => {
    elem = document.createElement('input');
    return elem;
  },
  write: () => {
    dropdownlistObj = new DropDownList({
      dataSource: ganttRef.value.ej2Instances.treeGrid.grid.dataSource,
      fields: { value: 'TaskName' },
      floatLabelType: 'Auto'
    });
    dropdownlistObj.appendTo(elem);
  },
  read: () => dropdownlistObj.text,
  destroy: () => dropdownlistObj.destroy()
};
// Usage: <e-column field="TaskName" editType="dropdownedit" :edit="dpParams"></e-column>
```

## Disable Editing for a Column

Set `columns.allowEditing: false` to lock a specific column from inline edits:

```js
const columns = [
  { field: 'TaskID' },
  { field: 'TaskName', allowEditing: false },  // locked
  { field: 'StartDate' },
  { field: 'Duration' }
];
```

## Read-Only Gantt

Set `readOnly: true` to disable all create, update, and delete operations:

```vue
<ejs-gantt :readOnly="true" :editSettings="editSettings" ...></ejs-gantt>
```

> Even with `allowAdding`, `allowEditing`, `allowDeleting` enabled in `editSettings`, the `readOnly` flag overrides all edits.

## Adding Tasks

**Via toolbar:** Click the **Add** button — new row inserted at the top by default.

**Via context menu:** Add above, below, or as child of the selected row. Requires `enableContextMenu: true` and `ContextMenu` module injected.

**Programmatic:**
```js
const record = {
  TaskID: 10, TaskName: 'New task',
  StartDate: new Date('04/10/2019'), Duration: 3, Progress: 0
};
// rowPosition: 'Top' | 'Bottom' | 'Above' | 'Below' | 'Child'
ganttRef.value.ej2Instances.editModule.addRecord(record, 'Below', 2);
```

## Open New Task Dialog with Default Values

Use `actionBegin` with `requestType === 'beforeOpenAddDialog'` to pre-fill fields:

```js
const onActionBegin = (args) => {
  if (args.requestType === 'beforeOpenAddDialog') {
    args.rowData.TaskName = 'New Default Task';
    args.rowData.Progress = 70;
    args.rowData.ganttProperties.taskName = 'New Default Task';
    args.rowData.ganttProperties.progress = 70;
  }
};
```

## Customize Dialog Tabs

### Control visible tabs and fields

Use `addDialogFields` / `editDialogFields` to choose which tabs appear and which fields show in General tab:

```js
const editDialogFields = [
  { type: 'General', headerText: 'General', fields: ['TaskID', 'TaskName'] },
  { type: 'Dependency' },
  { type: 'Resources' },
  { type: 'Notes' },
  { type: 'Segments' }
];

const addDialogFields = [
  { type: 'General', headerText: 'General', fields: ['TaskID', 'TaskName'] },
  { type: 'Dependency' },
  { type: 'Resources' },
  { type: 'Notes' },
  { type: 'Segments' }
];
```

### Customize Dependency, Resources, Segments tabs

Use `additionalParams` to pass Grid properties to these tabs:

```js
const editDialogFields = [
  { type: 'General' },
  { type: 'Dependency', additionalParams: { allowSorting: true, toolbar: ['Search'] } },
  { type: 'Resources', additionalParams: { allowSorting: true, columns: [{ field: 'newData' }] } },
  { type: 'Segments', additionalParams: { columns: [{ field: 'segmentTask', headerText: 'Segment Task', width: '170px' }] } }
];

const addDialogFields = [
  { type: 'General' },
  { type: 'Dependency', additionalParams: { allowSorting: true, toolbar: ['Search'] } },
  { type: 'Resources', additionalParams: { allowSorting: true, columns: [{ field: 'newData' }] } },
  { type: 'Segments', additionalParams: { columns: [{ field: 'segmentTask', headerText: 'Segment Task', width: '170px' }] } }
];
```

### Customize Notes tab (RTE)

Pass RTE properties via `additionalParams` in the Notes tab:

```js
{ type: 'Notes', additionalParams: { inlineMode: { enable: true, onSelection: true } } }
```

## Deleting Tasks

**Via toolbar:** Select a row → click **Delete** toolbar button.

**Via context menu:** Right-click a row → Delete.

**Programmatic:**
```js
ganttRef.value.ej2Instances.editModule.deleteRow();
```

Set `showDeleteConfirmDialog: true` to show a confirmation prompt before deletion.

## Indent and Outdent

Promote or demote a task in the hierarchy. Requires `allowEditing: true`.

**Via toolbar:**
```js
const toolbar = ['Indent', 'Outdent'];
```

**Programmatic:**
```js
const gantt = ganttRef.value.ej2Instances;
gantt.indent();   // promote selected task
gantt.outdent();  // demote selected task
```

## Splitting and Merging Tasks

Two approaches are supported for defining split-task segments at load time: **Hierarchical** (segments embedded in each task record) and **Self-referential** (segments stored as a flat separate collection).

---

### Hierarchical — Segments embedded in task data

Map the segments array field name via `taskFields.segments`. Each task record carries its own `Segments` array.

```js
const taskFields = { /* ... */ segments: 'Segments' };

// In data:
{ TaskID: 2, TaskName: 'Design', StartDate: new Date('04/02/2019'), Duration: 8,
  Segments: [
    { StartDate: new Date('04/02/2019'), Duration: 3 },
    { StartDate: new Date('04/07/2019'), Duration: 4 }
  ]
}
```
---

### Self-referential — Segments as a flat external collection

Map `taskFields.segmentId` (links each segment record to its task ID) and pass the flat segment array to the `segmentData` property on `<ejs-gantt>`. The main task data does **not** need to contain any segment arrays.

```js
const taskFields = {
  segmentId: 'segmentId'   // ← links segment records to their parent task by TaskID
};

// Flat segment collection — segmentId references the TaskID being split
const segmentData = [
  { segmentId: 2, StartDate: new Date('04/02/2019'), Duration: 2 },
  { segmentId: 2, StartDate: new Date('04/04/2019'), Duration: 2 },
  { segmentId: 4, StartDate: new Date('04/02/2019'), Duration: 2 },
  { segmentId: 4, StartDate: new Date('04/04/2019'), Duration: 2 }
];
```

> **Note:** `segmentId` in each segment record must match the `TaskID` (`taskFields.id` value) of the task to be split.

---

### Comparison: Hierarchical vs Self-referential

| Aspect | Hierarchical (`taskFields.segments`) | Self-referential (`taskFields.segmentId` + `segmentData`) |
|---|---|---|
| Segment storage | Nested array inside each task record | Separate flat array on `<ejs-gantt>` |
| Property on component | — (no extra prop needed) | `:segmentData="segmentData"` |
| `taskFields` key | `segments: 'Segments'` | `segmentId: 'segmentId'` |
| Suitable for | JSON / hierarchical data sources | SQL / flat / self-referential data sources |

---

### Split dynamically

- **Context menu:** Enable `enableContextMenu: true` and map either `taskFields.segments` or `taskFields.segmentId` → **Split Task** item appears.
- **Dialog:** **Segments** tab appears in add/edit dialog when `taskFields.segments` or `taskFields.segmentId` is mapped.

### Merge tasks

Use **Merge Task** context menu item, or drag segments together in the UI, or use the dialog Segments tab.

### Split task limitations

- Parent tasks and milestones cannot be split
- Task width must be greater than the timeline unit cell
- Not supported with Multi Taskbar

## Taskbar Editing

Enable with `allowTaskbarEditing: true` in `editSettings`. Inject the `Edit` module.

Users can:
- **Drag** the taskbar to move start/end dates
- **Resize** left/right handles to change duration
- **Drag progress handle** to update progress %
- **Drag connector points** to create/edit dependencies

## Prevent Editing for Specific Tasks

Use the `taskbarEditing` event to cancel editing, and `queryTaskbarInfo` to hide edit handles:

```js
const taskbarEditing = (args) => {
  if (args.data.TaskID === 4) args.cancel = true;  // block task 4
};

const queryTaskbarInfo = (args) => {
  if (args.data.TaskID === 6) {
    args.taskbarElement.className += ' e-preventEdit';  // hide handles
  }
};
```

```css
.e-gantt-chart .e-preventEdit .e-right-resize-gripper,
.e-gantt-chart .e-preventEdit .e-left-resize-gripper,
.e-gantt-chart .e-preventEdit .e-progress-resize-gripper,
.e-gantt-chart .e-preventEdit .e-left-connectorpoint-outer-div,
.e-gantt-chart .e-preventEdit .e-right-connectorpoint-outer-div { display: none; }
```

## Taskbar Editing Tooltip

Customize the tooltip shown while dragging/resizing a taskbar using `tooltipSettings.editing`:

```vue
<ejs-gantt :tooltipSettings="tooltipSettings">
  <template v-slot:editingTooltipTemplate="{ data }">
    <div>Duration: {{ data.duration }}</div>
  </template>
</ejs-gantt>

<script setup>
const tooltipSettings = {
  showTooltip: true,
  editing: 'editingTooltipTemplate'
};
</script>
```

## Touch Interaction

| Action | Result |
|---|---|
| Double-tap TreeGrid cell | Enters cell edit mode |
| Double-tap row | Opens edit dialog |
| Tap taskbar | Activates taskbar editing state |
| Drag taskbar | Moves the task |
| Drag left/right resize icon | Changes duration |
| Drag progress icon | Changes progress |
| Tap connector point → tap another taskbar | Creates `FS` dependency |

> On mobile, only `FS` dependency type can be created via taskbar. Use cell/dialog editing for other types.

Force adaptive (mobile) layout in desktop for testing:
```js
ganttRef.value.ej2Instances.isAdaptive = true;
```

## Column Validation

Define validation rules on columns using `columns.validationRules`:

```js
const columns = [
  { field: 'TaskName', validationRules: { required: true } },
  { field: 'StartDate', editType: 'datetimepickeredit',
    validationRules: { required: true, date: true } },
  { field: 'Duration', validationRules: { required: true } }
];
```

Common rules: `required`, `minLength`, `maxLength`, `min`, `max`, `date`, `email`.

## Custom Validation

Use a callback in `validationRules` for custom logic:

```js
{ field: 'TaskName', validationRules: {
    required: true,
    minLength: [(args) => args['value'].length <= 8, 'Must be 8 characters or fewer']
}}
```

## Dependency and Resource Grid Validation

Apply validation to the Dependency/Resource grid columns inside the dialog via `actionBegin`:

```js
const actionBegin = (args) => {
  if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
    args.Dependency.columns[3].validationRules = { required: true };
    args.Resources.columns[2].allowEditing = true;
    args.Resources.columns[2].validationRules = { required: true };
  }
};
```

## Server-Side Persistence

Use `DataManager` with `UrlAdaptor` and `batchUrl` for server CRUD:

```js
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
  url: '/Home/UrlDatasource',
  batchUrl: '/Home/BatchSave',
  adaptor: new UrlAdaptor()
});
```

The `BatchSave` controller receives `added`, `changed`, `deleted` collections:

```ts
public ActionResult BatchSave([FromBody] ICRUDModel<GanttData> data) {
  // data.added   → new records
  // data.changed → edited records
  // data.deleted → removed records
  return Json(new { addedRecords = uAdded, changedRecords = uChanged, deletedRecords = uDeleted });
}
```

> The `UrlDatasource` method must return `{ result: [...], count: N }`.

## editSettings Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `allowAdding` | boolean | false | Enable Add toolbar/context menu |
| `allowEditing` | boolean | false | Enable cell/dialog editing |
| `allowDeleting` | boolean | false | Enable Delete toolbar/context menu |
| `allowTaskbarEditing` | boolean | false | Enable drag/resize on taskbars |
| `mode` | string | `'Auto'` | `'Auto'` or `'Dialog'` edit mode |
| `showDeleteConfirmDialog` | boolean | false | Show confirm dialog before delete |

## Programmatic CRUD APIs

```js
const gantt = ganttRef.value.ej2Instances;

// Add a record
gantt.editModule.addRecord(record, 'Below', rowIndex);

// Update a task by ID (cannot update the ID itself)
gantt.updateRecordByID({ TaskID: 3, Duration: 5, Progress: 80 });

// Delete selected row
gantt.editModule.deleteRow();

// Indent / Outdent
gantt.indent();
gantt.outdent();

// Expand / Collapse
gantt.expandByID(taskId);
gantt.collapseByID(taskId);
gantt.expandAll();
gantt.collapseAll();
```
