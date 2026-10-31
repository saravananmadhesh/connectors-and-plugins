# Managing Tasks in Angular Gantt Chart

## Table of Contents
- [Prerequisites for Editing](#prerequisites-for-editing)
- [editSettings Configuration](#editsettings-configuration)
- [Adding Tasks](#adding-tasks)
- [Editing Tasks — Cell Mode](#editing-tasks--cell-mode)
- [Editing Tasks — Dialog Mode](#editing-tasks--dialog-mode)
- [Taskbar Editing](#taskbar-editing)
- [Customizing the Edit Dialog](#customizing-the-edit-dialog)
- [Deleting Tasks](#deleting-tasks)
- [Drag and Drop (Row Reordering)](#drag-and-drop-row-reordering)
- [Indent and Outdent](#indent-and-outdent)
- [Expand and Collapse](#expand-and-collapse)
- [Maintaining Data in Server (CRUD)](#maintaining-data-in-server-crud)
- [Validation](#validation)
- [Programmatic CRUD Methods](#programmatic-crud-methods)

---

## Prerequisites for Editing

1. Inject `EditService` into `providers`
2. A primary key column must be defined — by default, the `taskFields.id` column is the primary key
3. If custom columns are defined, set `isPrimaryKey: true` on one column

Missing `isPrimaryKey` will trigger `actionFailure`.

---

## editSettings Configuration

```typescript
public editSettings: object = {
  allowEditing: true,        // Enable cell/dialog editing
  allowAdding: true,         // Enable adding new tasks
  allowDeleting: true,       // Enable deleting tasks
  allowTaskbarEditing: true, // Enable taskbar drag/resize
  mode: 'Auto',              // 'Auto' = cell editing | 'Dialog' = dialog
  showDeleteConfirmDialog: true  // Show confirmation before delete
};
```

---

## Adding Tasks

**Via toolbar:** Include `'Add'` in the toolbar array. Clicking opens a new task dialog (or inserts a row for cell mode).

**With default values:** Pre-populate the new task dialog using `actionBegin` with `requestType: 'beforeOpenAddDialog'`:

```typescript
public actionBegin(args: any): void {
  if (args.requestType === 'beforeOpenAddDialog') {
    args.rowData.StartDate = new Date('04/10/2024');
    args.rowData.Duration = 5;
  }
}
```

**Programmatic add:**
```typescript
this.ganttObj.addRecord({
  TaskID: 10,
  TaskName: 'New Task',
  StartDate: new Date('04/10/2024'),
  Duration: 3
}, 'Below', 2);  // Position: 'Top' | 'Bottom' | 'Above' | 'Below' | 'Child'
```

---

## Editing Tasks — Cell Mode

Set `editSettings.mode: 'Auto'` and double-click a cell in the TreeGrid pane to edit inline:

```typescript
public editSettings: object = { allowEditing: true, mode: 'Auto' };
```

**Cell edit types** per column:
- `'numericedit'` → NumericTextBox (for numbers)
- `'defaultedit'` → TextBox (for strings)
- `'dropdownedit'` → DropDownList
- `'booleanedit'` → CheckBox
- `'datepickeredit'` → DatePicker
- `'datetimepickeredit'` → DateTimePicker

Configure via column definition:
```typescript
public columns: object[] = [
  { field: 'TaskName', editType: 'defaultedit' },
  { field: 'Duration', editType: 'numericedit', edit: { params: { decimals: 0, min: 0 } } }
];
```

In Auto mode, double-clicking the chart pane opens the edit dialog instead.

---

## Editing Tasks — Dialog Mode

Set `editSettings.mode: 'Dialog'` — double-clicking anywhere opens the edit dialog:

```typescript
public editSettings: object = { allowEditing: true, mode: 'Dialog' };
```

The dialog contains tabs: General, Dependency, Notes, and custom tabs.

---

## Taskbar Editing

Drag and resize taskbars directly on the Gantt chart:

```typescript
public editSettings: object = {
  allowTaskbarEditing: true
};
```

Actions:
- **Drag taskbar:** Moves start and end dates together
- **Drag left edge:** Adjusts start date
- **Drag right edge:** Adjusts end/duration
- **Drag connector point:** Creates/modifies dependency

`taskbarEditing` event fires during drag; `taskbarEdited` fires after completion.

---

## Customizing the Edit Dialog

Restrict which tabs and fields appear in add/edit dialogs:

```typescript
public addDialogFields: object[] = [
  { type: 'General', headerText: 'Task Info', fields: ['TaskName', 'StartDate', 'Duration'] },
  { type: 'Dependency' },
  { type: 'Notes' }
];

public editDialogFields: object[] = [
  { type: 'General', fields: ['TaskName', 'StartDate', 'EndDate', 'Progress'] },
  { type: 'Dependency' },
  { type: 'Resources' }
];
```

```html
<ejs-gantt
  [addDialogFields]="addDialogFields"
  [editDialogFields]="editDialogFields">
</ejs-gantt>
```

Available tab types: `'General'`, `'Dependency'`, `'Resources'`, `'Notes'`, `'Custom'`

---

## Deleting Tasks

Include `'Delete'` in toolbar or use `deleteRecord()`. With `showDeleteConfirmDialog: true`, a confirmation prompt appears before deletion.

```typescript
this.ganttObj.deleteRecord(3);  // Delete task with TaskID 3
```

---

## Drag and Drop (Row Reordering)

Reorder rows by dragging them to new positions:

```typescript
// Inject RowDDService (already included with EditService)
public allowRowDragAndDrop: boolean = true;
```

```html
<ejs-gantt [allowRowDragAndDrop]="true"></ejs-gantt>
```

Handle drop events to apply custom logic:
```typescript
public rowDrop(args: any): void {
  console.log('Dropped task:', args.data, 'Target:', args.dropIndex);
}
```

---

## Indent and Outdent

Promote or demote tasks in the hierarchy via toolbar or programmatically:

```typescript
public toolbar: string[] = ['Indent', 'Outdent'];

// Programmatic
this.ganttObj.indent();   // Make selected task a child of task above
this.ganttObj.outdent();  // Move selected task up one level in hierarchy
```

---

## Expand and Collapse

Expand or collapse task rows programmatically or via toolbar:

```typescript
// Expand / collapse all
this.ganttObj.expandAll();
this.ganttObj.collapseAll();

// Expand / collapse a specific task by its ID
this.ganttObj.expandByID(1);    // Expand task with TaskID 1
this.ganttObj.collapseByID(1);  // Collapse task with TaskID 1
```

Use the toolbar items `'ExpandAll'` and `'CollapseAll'` for user-triggered expand/collapse.

Listen to expand/collapse events:
```typescript
public expanding(args: any): void {
  if (args.data.Progress === 0) {
    args.cancel = true;  // Prevent expanding tasks with no progress
  }
}
```

```html
<ejs-gantt
  (expanding)="expanding($event)"
  (expanded)="expanded($event)"
  (collapsing)="collapsing($event)"
  (collapsed)="collapsed($event)">
</ejs-gantt>
```

---

## Maintaining Data in Server (CRUD)

For server-side persistence, configure the `DataManager` with CRUD URLs and handle the `dataStateChange` event or use built-in adaptor batch updates.

**Event-driven approach:**
```typescript
public actionComplete(args: any): void {
  if (args.requestType === 'save') {
    // args.data contains the updated task
    this.httpClient.put('/api/tasks/' + args.data.TaskID, args.data).subscribe();
  }
  if (args.requestType === 'delete') {
    this.httpClient.delete('/api/tasks/' + args.data[0].TaskID).subscribe();
  }
}
```

**Adaptor approach (recommended for REST APIs):**
```typescript
public dataManager: DataManager = new DataManager({
  url: 'api/tasks',
  insertUrl: 'api/tasks/insert',
  updateUrl: 'api/tasks/update',
  removeUrl: 'api/tasks/delete',
  adaptor: new UrlAdaptor()
});
```

---

## Validation

The `actionBegin` event fires before edits are committed. Cancel to prevent the operation:

```typescript
public actionBegin(args: any): void {
  if (args.requestType === 'beforeSave') {
    if (!args.data.TaskName || args.data.TaskName.trim() === '') {
      args.cancel = true;  // Block save
      alert('Task name is required');
    }
  }
}
```

For dependency validation conflicts, use `requestType: 'validateLinkedTask'`.

---

## Programmatic CRUD Methods

```typescript
// Add a new record — position: 'Top' | 'Bottom' | 'Above' | 'Below' | 'Child'
this.ganttObj.addRecord(taskData, 'Bottom');
this.ganttObj.addRecord(taskData, 'Child', 1);  // Add as child of task with index 1

// Open add/edit dialogs programmatically
this.ganttObj.openAddDialog();            // Opens the add task dialog
this.ganttObj.openEditDialog(3);          // Opens edit dialog for task with TaskID 3

// Update by ID
this.ganttObj.updateRecordById({ TaskID: 3, TaskName: 'Updated', Duration: 5 });

// Delete by ID
this.ganttObj.deleteRecord(3);

// Update task ID
this.ganttObj.updateTaskId(oldID, newID);

// Refresh all data
this.ganttObj.refresh();
```

Access the component instance with `@ViewChild('gantt') ganttObj: GanttComponent`.
