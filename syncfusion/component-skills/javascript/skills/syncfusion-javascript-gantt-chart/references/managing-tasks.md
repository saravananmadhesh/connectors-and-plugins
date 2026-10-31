# Managing Tasks in Syncfusion Gantt Chart

## Table of Contents
- [Edit Settings Overview](#edit-settings-overview)
- [Cell Editing](#cell-editing)
- [Dialog Editing](#dialog-editing)
- [Taskbar Editing](#taskbar-editing)
- [Adding Tasks](#adding-tasks)
- [Deleting Tasks](#deleting-tasks)
- [Indent and Outdent](#indent-and-outdent)
- [Splitting and Merging Tasks](#splitting-and-merging-tasks)
- [Server-Side CRUD](#server-side-crud)
- [Validation](#validation)

## Edit Settings Overview

**Module required**: `Edit`

```typescript
import { Gantt, Edit, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    editSettings: {
        allowEditing: true,           // inline/dialog cell editing
        allowAdding: true,            // adding new tasks
        allowDeleting: true,          // deleting tasks
        allowTaskbarEditing: true,    // drag/resize taskbar on chart
        showDeleteConfirmDialog: true // confirm before delete
    },
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll']
});
gantt.appendTo('#Gantt');
```

> A primary key column is required for editing. By default, `taskFields.id` is the primary key. If custom `columns` are defined without a `taskFields.id` mapping, set `columns.isPrimaryKey: true` on the ID column.

**Read-Only Mode**: Set `readOnly: true` to prevent all CRUD operations while still rendering the toolbar and context menu.

---

## Cell Editing

Click a cell to edit inline. Set `editSettings.mode` to control trigger:

```typescript
editSettings: {
    allowEditing: true,
    mode: 'Auto'    // 'Auto' (double-click for dialog, single for cell) | 'Dialog' | 'Cell'
}
```

### Column Edit Types

| `editType` | Component | Example params |
|-----------|-----------|---------------|
| `'numericedit'` | NumericTextBox | `{ min: 0, decimals: 2 }` |
| `'defaultedit'` | TextBox | — |
| `'dropdownedit'` | DropDownList | `{ value: 'Active' }` |
| `'booleanedit'` | CheckBox | `{ checked: true }` |
| `'datepickeredit'` | DatePicker | `{ format: 'dd.MM.yyyy' }` |
| `'datetimepickeredit'` | DateTimePicker | `{ value: new Date() }` |

```typescript
columns: [
    { field: 'Duration', editType: 'numericedit', edit: { params: { min: 1 } } },
    { field: 'StartDate', allowEditing: false }     // disable edit for this column
]
```

### Custom Cell Edit Template

```typescript
{
    field: 'TaskName',
    edit: {
        create: () => { elem = document.createElement('input'); return elem; },
        write: (args) => {
            dropdownlistObj = new DropDownList({ dataSource: gantt.treeGrid.grid.dataSource, fields: { value: 'TaskName' }, value: args.rowData[args.column.field] });
            dropdownlistObj.appendTo(elem);
        },
        read: () => { return dropdownlistObj.value; },
        destroy: () => { dropdownlistObj.destroy(); }
    }
}
```

---

## Dialog Editing

Open the add/edit dialog and customize which tabs and fields appear:

```typescript
addDialogFields: [
    { type: 'General', headerText: 'General', fields: ['TaskID', 'TaskName', 'StartDate', 'Duration'] },
    { type: 'Dependency' },
    { type: 'Resources' },
    { type: 'Notes' },
    { type: 'Segments' }
],
editDialogFields: [
    { type: 'General', fields: ['TaskID', 'TaskName'] },
    { type: 'Dependency', additionalParams: { allowSorting: true, toolbar: ['Search'] } },
    { type: 'Resources', additionalParams: { columns: [{ field: 'newData' }] } },
    { type: 'Notes', additionalParams: { inlineMode: { enable: true, onSelection: true } } }
]
```

### Set Default Values for New Task Dialog

```typescript
actionBegin: (args) => {
    if (args.requestType === 'beforeOpenAddDialog') {
        args.rowData.TaskName = 'New Task';
        args.rowData.Progress = 0;
        args.rowData.ganttProperties.taskName = 'New Task';
        args.rowData.ganttProperties.progress = 0;
    }
}
```

---

## Taskbar Editing

Drag the taskbar to reschedule, drag edges to resize duration, drag the progress handle for progress:

```typescript
editSettings: {
    allowTaskbarEditing: true
},
// Customize editing tooltip
tooltipSettings: {
    showTooltip: true,
    editing: '#editingTooltip'   // HTML template ID
}
```

---

## Adding Tasks

```typescript
editSettings: { allowAdding: true },
toolbar: ['Add']    // or use Context Menu
```

**Programmatic add**:
```typescript
const newTask = { TaskID: 100, TaskName: 'New Task', StartDate: new Date(), Duration: 3, Progress: 0 };
gantt.editModule.addRecord(newTask, 'Below', 2);  // rowPosition: 'Top' | 'Bottom' | 'Above' | 'Below' | 'Child'
```

---

## Deleting Tasks

```typescript
editSettings: { allowDeleting: true, showDeleteConfirmDialog: true },
toolbar: ['Delete']
```

**Programmatic delete**:
```typescript
gantt.editModule.deleteRecord(taskID);
```

---

## Indent and Outdent

Promote or demote task level in the hierarchy:

```typescript
toolbar: ['Indent', 'Outdent']

// Programmatically
gantt.indent();
gantt.outdent();
```

---

## Splitting and Merging Tasks

Split a task into segments (paused and resumed work):

```typescript
import { Gantt, Edit, Toolbar, Selection, ContextMenu } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Toolbar, Selection, ContextMenu);

let gantt: Gantt = new Gantt({
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate',
        duration: 'Duration', progress: 'Progress', parentID: 'ParentID',
        segments: 'Segments'    // enable split task support
    },
    editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, allowTaskbarEditing: true },
    enableContextMenu: true,    // provides "Split Task" / "Merge Task" context menu items
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel']
});
```

- **Split via dialog**: `Segments` tab appears in add/edit dialog when `taskFields.segments` is mapped
- **Split via context menu**: `Split Task` item appears when `enableContextMenu: true`
- **Merge**: Use `Merge Task` from context menu, or drag segments together

> **Limitations**: Parent and milestone tasks cannot be split. Split task is incompatible with multi-taskbar.

---

## Server-Side CRUD

Use `UrlAdaptor` with `batchUrl` to persist all CRUD changes to a backend:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
    url: '/Home/UrlDatasource',
    adaptor: new UrlAdaptor(),
    batchUrl: '/Home/BatchSave'    // receives all affected records (edited + parent + dependencies)
});

let gantt: Gantt = new Gantt({
    dataSource: dataSource,
    taskFields: { id: 'TaskId', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', dependency: 'Predecessor', child: 'SubTasks' }
});
```

> All CRUD operations are sent as batch updates because editing one task may affect parents and dependent tasks.

---

## Validation

Use `actionBegin` to validate or cancel edits:

```typescript
actionBegin: (args) => {
    if (args.requestType === 'beforeSave') {
        if (args.data.Duration < 1) {
            args.cancel = true;     // cancel save
            alert('Duration must be at least 1 day');
        }
    }
}
```

**Common `requestType` values** in `actionBegin`:
- `'beforeSave'` — before a cell/taskbar edit is saved
- `'beforeOpenAddDialog'` — before the add dialog opens
- `'beforeOpenEditDialog'` — before the edit dialog opens
- `'taskbarEditing'` — during taskbar drag (can cancel)
