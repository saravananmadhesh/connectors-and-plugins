# TreeGrid Editing

## When to Use This Reference

Read this reference when you need to:
- Enable users to create, update, or delete records (CRUD operations)
- Choose appropriate edit mode for your use case (inline cell/row, dialog box, or batch edits)
- Customize editor components (text input, numeric, dropdown, date picker)
- Validate data before saving (required fields, data types, custom rules)
- Add edit/delete buttons via toolbar or command columns
- Persist edited data to a server with REST APIs
- Handle special scenarios like new row position, delete confirmation, default values, or disabled columns

---

## Table of Contents

- [Editing Basics](#editing-basics)
- [Edit Modes](#edit-modes)
- [Edit Types & Components](#edit-types--components)
- [Edit Templates](#edit-templates)
- [Field Validation](#field-validation)
- [Toolbar & Confirmation](#toolbar--confirmation)
- [Command Column](#command-column)
- [Server Persistence](#server-persistence)
- [Common Patterns](#common-patterns)

---

## Editing Basics

Enable editing by setting `allowEditing: true` in `editSettings` and injecting the `Edit` module. **Important:** Define `isPrimaryKey: true` on a column for CRUD operations to work.

```typescript
import { TreeGrid, Edit } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Edit);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Cell'
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Troubleshooting:** If editing works only for the first row, add `isPrimaryKey: true` to the primary key column. Editing matches records by primary key value.

---

## Edit Modes

TreeGrid supports four edit modes. Choose based on your editing workflow.

### Mode: Cell

Double-click cells to edit individually. Changes save immediately or on Enter key.

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Cell'
}
```

**Use when:** Quick single-cell edits, real-time updates, editing many fields in sequence.

### Mode: Row

Click row → Click Edit button → Entire row becomes editable → Click Update to save.

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Row'
}
```

**Use when:** Editing multiple columns for one record, want to review changes before saving.

### Mode: Dialog

Click row → Click Edit → Dialog box opens with all fields → Save to confirm.

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
}
```

**Use when:** Complex forms, custom field organization, multi-field validation needed.

### Mode: Batch

Double-click cells → Edit multiple cells → Click Update to save all changes at once.

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Batch'
}
```

**Use when:** Bulk edits, batch-processing data, minimizing server requests.

---

## Edit Types & Components

Specify editor component per column via `editType`. Types map to EJ2 components.

### Available Edit Types

| Type | Component | Data Type |
|------|-----------|-----------|
| `defaultedit` | TextBox | String (default) |
| `numericedit` | NumericTextBox | Number |
| `dropdownedit` | DropDownList | List values |
| `booleanedit` | CheckBox | Boolean |
| `datepickeredit` | DatePicker | Date |
| `datetimepickeredit` | DateTimePicker | DateTime |

### Configure Edit Components

```typescript
columns: [
    {
        field: 'taskName',
        headerText: 'Task Name',
        editType: 'defaultedit',  // TextBox (default)
        width: 180
    },
    {
        field: 'priority',
        headerText: 'Priority',
        editType: 'dropdownedit',
        dataSource: ['Low', 'Normal', 'High'],
        width: 90
    },
    {
        field: 'progress',
        headerText: 'Progress %',
        editType: 'numericedit',
        edit: { params: { format: 'n', decimals: 0 } },
        width: 80
    },
    {
        field: 'startDate',
        headerText: 'Start Date',
        editType: 'datepickeredit',
        format: 'yMd',
        width: 100
    },
    {
        field: 'approved',
        headerText: 'Approved',
        editType: 'booleanedit',
        type: 'boolean',
        displayAsCheckBox: true,
        width: 80
    }
]
```

---

## Edit Templates

Use custom editor components via `create`, `write`, `read`, and `destroy` functions.

### Cell Edit Template

```typescript
import { TreeGrid, Edit, Column } from '@syncfusion/ej2-treegrid';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

let autoCompleteObj: AutoComplete;

columns: [
    {
        field: 'taskName',
        headerText: 'Task Name',
        editType: 'stringedit',
        edit: {
            create: () => {
                return document.createElement('input');
            },
            write: (args: { rowData: Object, column: Column }) => {
                autoCompleteObj = new AutoComplete({
                    dataSource: treeGridObj.grid.dataSource,
                    fields: { value: 'taskName' },
                    value: args.rowData[args.column.field]
                });
                autoCompleteObj.appendTo(args.element);
            },
            read: () => {
                return autoCompleteObj.value;
            },
            destroy: () => {
                autoCompleteObj.destroy();
            }
        },
        width: 180
    }
]
```

### Dialog Template

Create custom dialog form using template:

```typescript
import { TreeGrid, Edit, Toolbar, DialogEditEventArgs } from '@syncfusion/ej2-treegrid';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Edit, Toolbar);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Dialog',
        template: '#dialogTemplate'
    },
    actionComplete: (args: DialogEditEventArgs) => {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            // Render custom components in dialog
            new DropDownList({
                dataSource: ['Low', 'Normal', 'High'],
                value: args.rowData.priority
            }, args.form.elements.namedItem('priority') as HTMLInputElement);
            
            // Set focus
            (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
        }
    },
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        { field: 'priority', headerText: 'Priority', width: 90 }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Template HTML:**
```html
<script id="dialogTemplate" type="text/template">
    <div class="form-group">
        <label for="taskName">Task Name</label>
        <input id="taskName" name="taskName" type="text" class="form-control"/>
    </div>
    <div class="form-group">
        <label for="priority">Priority</label>
        <input id="priority" name="priority" type="text" class="form-control"/>
    </div>
</script>
```

---

## Field Validation

Prevent invalid data before save using `validationRules`.

### Column Validation Rules

```typescript
columns: [
    {
        field: 'taskID',
        headerText: 'Task ID',
        isPrimaryKey: true,
        validationRules: { required: true, number: true },
        width: 90
    },
    {
        field: 'taskName',
        headerText: 'Task Name',
        validationRules: { required: true },
        width: 180
    },
    {
        field: 'progress',
        headerText: 'Progress %',
        editType: 'numericedit',
        validationRules: { number: true, min: 0, max: 100 },
        width: 80
    },
    {
        field: 'startDate',
        headerText: 'Start Date',
        editType: 'datepickeredit',
        validationRules: { date: true },
        width: 100
    }
]
```

### Custom Validation Function

```typescript
let customMinLengthRule: (args: { [key: string]: string }) => boolean = (args) => {
    return args['value'].length >= 5;
};

columns: [
    {
        field: 'taskName',
        headerText: 'Task Name',
        validationRules: {
            required: true,
            minLength: [customMinLengthRule, 'Task name must be at least 5 characters']
        },
        width: 180
    }
]
```

---

## Toolbar & Confirmation

### Toolbar with Edit Actions

```typescript
import { TreeGrid, Edit, Toolbar } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Edit, Toolbar);

let treeGridObj = new TreeGrid({
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' }
});
```

**Toolbar Actions:**
- `Add` - Create new row
- `Edit` - Edit selected row
- `Delete` - Delete selected row
- `Update` - Save changes
- `Cancel` - Cancel edits

### Delete Confirmation Dialog

Show confirmation when deleting:

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
    mode: 'Cell'
}
```

### New Row Position

Control where new rows appear:

```typescript
editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: 'Child'  // 'Top', 'Bottom', 'Above', 'Below', or 'Child'
}
```

**Positions:**
- `Top` - Add at top of grid
- `Bottom` - Add at bottom
- `Above` - Add above selected row
- `Below` - Add below selected row  
- `Child` - Add as child of selected row

### Default Column Values

Pre-fill new records with default values:

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    {
        field: 'priority',
        headerText: 'Priority',
        editType: 'dropdownedit',
        defaultValue: 'Normal',  // Default when adding new row
        width: 90
    },
    {
        field: 'approved',
        headerText: 'Approved',
        editType: 'booleanedit',
        defaultValue: false,
        width: 80
    }
]
```

### Disable Editing for Specific Columns

```typescript
columns: [
    { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
    {
        field: 'createdDate',
        headerText: 'Created Date',
        allowEditing: false,  // Disable editing for this column
        width: 100
    }
]
```

---

## Command Column

Add action buttons (Edit, Delete, Save, Cancel) in a column.

### Built-in Command Buttons

```typescript
import { TreeGrid, CommandColumn, Edit } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(CommandColumn, Edit);

let treeGridObj = new TreeGrid({
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' },
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        {
            headerText: 'Commands',
            width: 150,
            commands: [
                { type: 'Edit', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
                { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
                { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
                { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
            ]
        }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Custom Command Buttons

```typescript
import { TreeGrid, CommandColumn, Edit } from '@syncfusion/ej2-treegrid';
import { closest } from '@syncfusion/ej2-base';

TreeGrid.Inject(CommandColumn, Edit);

let onClick = (args: Event) => {
    let rowIndex: number = (<HTMLTableRowElement>closest(args.target as Element, '.e-row')).rowIndex;
    let rowData = treeGridObj.getCurrentViewRecords()[rowIndex];
    console.log('Row data:', rowData);
};

let treeGridObj = new TreeGrid({
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
        { field: 'taskName', headerText: 'Task Name', width: 180 },
        {
            headerText: 'Actions',
            width: 100,
            commands: [
                { buttonOption: { content: 'Details', cssClass: 'e-flat', click: onClick } }
            ]
        }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

---

## Server Persistence

Save edited data to a server via REST APIs.

### URL Adaptor (CRUD via REST endpoints)

```typescript
import { TreeGrid, Edit, Toolbar } from '@syncfusion/ej2-treegrid';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

TreeGrid.Inject(Edit, Toolbar);

let dataManager = new DataManager({
    url: 'api/TreeGrid/GetData',           // Get initial data
    updateUrl: 'api/TreeGrid/UpdateRow',   // Update record
    insertUrl: 'api/TreeGrid/InsertRow',   // Add new record
    removeUrl: 'api/TreeGrid/DeleteRow',   // Delete record
    batchUrl: 'api/TreeGrid/BatchUpdate',  // Batch delete (parent + children)
    adaptor: new UrlAdaptor()
});

let treeGridObj = new TreeGrid({
    dataSource: dataManager,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentID',
    hasChildMapping: 'IsParent',
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Row',
        newRowPosition: 'Below'
    },
    columns: [
        { field: 'TaskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
        { field: 'TaskName', headerText: 'Task Name', width: 180 },
        { field: 'StartDate', headerText: 'Start Date', editType: 'datepickeredit', type: 'date', format: 'yMd' },
        { field: 'Priority', headerText: 'Priority', editType: 'dropdownedit', validationRules: { required: true } }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Server Response Format (JSON):**
```json
{
    "result": [
        { "TaskID": 1, "TaskName": "Planning", "ParentID": null, "IsParent": true, "Priority": "High" },
        { "TaskID": 2, "TaskName": "Design", "ParentID": 1, "IsParent": false, "Priority": "Normal" }
    ],
    "count": 100
}
```

### Remote Save Adaptor (Client-side operations with server CRUD)

Use when you want all filtering/sorting/paging on the client, but save CRUD to server:

```typescript
import { TreeGrid, Edit, Toolbar } from '@syncfusion/ej2-treegrid';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';

TreeGrid.Inject(Edit, Toolbar);

let dataManager = new DataManager({
    json: window.gridData,  // Local data (array)
    updateUrl: 'api/TreeGrid/UpdateRow',
    insertUrl: 'api/TreeGrid/InsertRow',
    removeUrl: 'api/TreeGrid/DeleteRow',
    batchUrl: 'api/TreeGrid/BatchUpdate',
    adaptor: new RemoteSaveAdaptor()
});

let treeGridObj = new TreeGrid({
    dataSource: dataManager,
    idMapping: 'TaskID',
    parentIdMapping: 'ParentID',
    hasChildMapping: 'IsParent',
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: 'Row'
    },
    columns: [
        { field: 'TaskID', headerText: 'Task ID', isPrimaryKey: true, width: 90 },
        { field: 'TaskName', headerText: 'Task Name', width: 180 },
        { field: 'Priority', headerText: 'Priority', editType: 'dropdownedit' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Server-Side CRUD Handlers (Generic C#/ASP.NET Example)

```csharp
// Get initial data
public ActionResult GetData(DataManager dm)
{
    var data = TreeData.GetTree();
    return Json(new { result = data, count = data.Count });
}

// Insert new row
public ActionResult InsertRow(TreeGridData value, int relationalKey)
{
    // Add to data source
    TreeData.tree.Insert(GetInsertPosition(relationalKey), value);
    return Json(value);
}

// Update row
public ActionResult UpdateRow(TreeGridData value)
{
    var existing = TreeData.tree.FirstOrDefault(x => x.TaskID == value.TaskID);
    if (existing != null)
    {
        existing.TaskName = value.TaskName;
        existing.Priority = value.Priority;
        existing.StartDate = value.StartDate;
    }
    return Json(value);
}

// Delete single row
public ActionResult DeleteRow(int key)
{
    TreeData.tree.RemoveAll(x => x.TaskID == key);
    return Json(null);
}

// Batch delete (parent + all children)
public ActionResult BatchUpdate(List<TreeGridData> deleted)
{
    foreach (var item in deleted)
    {
        TreeData.tree.RemoveAll(x => x.TaskID == item.TaskID);
    }
    return Json(null);
}
```

---

## Common Patterns

### Programmatic Add

```typescript
let newRecord = {
    TaskID: 100,
    TaskName: 'New Task',
    Priority: 'High',
    ParentID: 1
};

treeGridObj.addRecord(newRecord, 0);  // Add at index 0
```

### Programmatic Update

```typescript
let updatedRecord = {
    TaskID: 5,
    TaskName: 'Updated Task',
    Priority: 'Low'
};

treeGridObj.updateRow(2, updatedRecord);  // Update row at index 2
```

### Programmatic Delete

```typescript
treeGridObj.deleteRow(treeGridObj.getSelectedRowIndexes()[0]);
```

### Get Edited Records

```typescript
let addedRecords = treeGridObj.editModule.addedRecords;
let changedRecords = treeGridObj.editModule.changedRecords;
let deletedRecords = treeGridObj.editModule.deletedRecords;
```
