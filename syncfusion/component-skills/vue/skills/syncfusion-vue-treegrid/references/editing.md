# Editing Features

Editingfeature is enabled by using `editSettings` property and it requires a primary key column for CRUD operations. TreeGrid supports dynamic insert, delete, and update operations with multiple editing modes.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Setup](#basic-setup)
- [Edit Modes Comparison](#edit-modes-comparison)
- [Edit Types Reference](#edit-types-reference)
- [Command Column](#command-column)
- [Delete Confirmation Dialog](#delete-confirmation-dialog)
- [New Row Position](#new-row-position)
- [Disable Editing for Specific Columns](#disable-editing-for-specific-columns)

## When to Use

Use editing features when you need to:
- **Allow users to modify data** - add, edit, delete rows dynamically
- **Validate user input** - ensure data quality before persistence
- **Provide inline editing** - quick cell-by-cell edits inline
- **Use dialog forms** - complex multi-field editing in modal
- **Batch updates** - edit multiple rows then save together
- **Command columns** - action buttons (Edit, Delete, Save, Cancel) for each row
- **Server persistence** - save changes back to backend database
- **Prevent invalid data** - validation rules and constraints on input
- **Control row insertion** - add new rows at top, bottom, or as child
- **Default values** - pre-populate new row fields

## Mandatory Rules

Before implementing editing:
- ✓ **Primary Key Required**: Mark exactly one column `:isPrimaryKey='true'` - ESSENTIAL for all CRUD
- ✓ **Edit Module**: Import `Edit` from '@syncfusion/ej2-vue-treegrid' and provide to treegrid
- ✓ **Edit Type**: Specify `editType` property for each editable column (details below)
- ✓ **editSettings Configuration**: Define allowed operations and mode ('Cell', 'Row', 'Dialog', 'Batch')
- ✓ **Toolbar Module**: Import `Toolbar` module for toolbar items


## Basic Setup

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :editSettings="editSettings"
    :toolbar="toolbarItems">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200 editType="defaultedit"></e-column>
      <e-column field="duration" headerText="Duration" width=100 type="number" editType="numericedit" textAlign="Right"></e-column>
      <e-column field="startDate" headerText="Start Date" width=120 type="date" editType="datepickeredit" format="yMd" textAlign="Right"></e-column>
      <e-column field="approved" headerText="Approved" type="boolean" editType="booleanedit" :displayAsCheckBox="true" width=100></e-column>
      <e-column field="status" headerText="Status" width=120 editType="dropdownedit"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Edit, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { 
    taskID: 1, 
    taskName: 'Planning', 
    duration: 10, 
    startDate: new Date('02/03/2017'), 
    approved: true,
    status: 'Open', 
    subtasks: [
      { taskID: 2, taskName: 'Analysis', duration: 3, startDate: new Date('02/05/2017'), approved: false, status: 'In Progress' }
    ] 
  }
]);

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Dialog',  // Cell | Row | Dialog | Batch
  newRowPosition: 'Child',  // Top | Bottom | Above | Below | Child
  showDeleteConfirmDialog: true  // Show delete confirmation
});

const toolbarItems = ref(['Add', 'Edit', 'Delete', 'Update', 'Cancel']);

provide('treegrid', [Edit, Toolbar]);
</script>
```

## Edit Modes Comparison

| Mode | Default | User Interaction | Best For |
|------|---------|------------------|----------|
| **Cell** | ✓ Yes | Double-click cell → Edit → Press Enter to save | Quick single-cell updates, real-time changes |
| **Row** | No | Click Edit button → Entire row editable → Update to save | Multi-field row updates, related data changes |
| **Dialog** | No | Click Edit → Modal form opens → Update to save | Complex forms, validation, multi-column editing |
| **Batch** | No | Double-click cells (multiple) → Update button saves all | Bulk operations, spreadsheet-like editing |

**Default:** Cell mode is the default editing mode if not specified

### Cell Editing Mode

Default editing mode. Edit individual cells inline by double-clicking. Single cell changes are saved immediately.

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :editSettings="editSettings"
    :toolbar="['Add', 'Delete', 'Update', 'Cancel']">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Edit, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, startDate: new Date('02/03/2017'), priority: 'High' },
  { taskID: 2, taskName: 'Design', duration: 5, startDate: new Date('02/05/2017'), priority: 'Normal' }
]);

const editSettings = ref({
  mode: 'Cell',  // Default mode
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});

provide('treegrid', [Edit, Toolbar]);
</script>
```

**User Interaction:** 
1. Double-click cell to enter edit mode
2. Edit the cell value
3. Press Enter or Tab to save
4. Escape to cancel editing

### Row Editing Mode

```vue
const editSettings = ref({
  mode: 'Row',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});
```

### Dialog Editing Mode

```vue
const editSettings = ref({
  mode: 'Dialog',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});
```

### Batch Editing Mode

```vue
const editSettings = ref({
  mode: 'Batch',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});
```

## Edit Types Reference

| editType | Component | Use For | Edit Parameters | Default? |
|----------|-----------|---------|-----------------|----------|
| `defaultedit` (or omitted) | TextBox | Text input/strings | - | ✓ Yes |
| `stringedit` | TextBox | Text strings | - | - |
| `numericedit` | NumericTextBox | Numbers: integers, decimals | `params: { decimals: 2, value: 5 }` | - |
| `dropdownedit` | DropDownList | Dropdown selection lists | `params: { value: 'Germany' }` | - |
| `booleanedit` | CheckBox | Boolean: Yes/No, true/false | `params: { checked: true }` | - |
| `datepickeredit` | DatePicker | Date selection only | `params: { format: 'dd.MM.yyyy' }` | - |
| `datetimepickeredit` | DateTimePicker | Date + time selection | `params: { value: new Date() }` | - |

**Note:** If `editType` is not defined, defaults to `stringedit` (TextBox)

## Command Column

### Built-in Commands

Add CRUD action buttons (Edit, Delete, Save, Cancel) directly in a column:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :editSettings="editSettings">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <!-- Command column with built-in buttons -->
      <e-column 
        headerText="Manage Records" 
        :commands="commands"
        width=150
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Edit, CommandColumn } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, subtasks: [
    { taskID: 2, taskName: 'Analysis', duration: 3 }
  ] },
  { taskID: 3, taskName: 'Implementation', duration: 15, subtasks: [] }
]);

// Built-in command buttons
const commands = ref([
  { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
  { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
  { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
  { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
]);

const editSettings = ref({
  mode: 'Row',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
});

provide('treegrid', [Edit, CommandColumn]);
</script>
```

**Built-in Commands:**
- `Edit` - Start editing the row
- `Delete` - Delete the row
- `Save` - Save changes (appears during edit)
- `Cancel` - Discard changes (appears during edit)

**Note:** CommandColumn module required: `import { CommandColumn }`

### Custom Command Buttons

Add custom action buttons with click handlers:

```vue
<template>
  <ejs-treegrid 
    ref="treegrid"
    :dataSource="data" 
    :treeColumnIndex="1"
    :editSettings="editSettings">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <!-- Custom command buttons -->
      <e-column 
        headerText="Actions" 
        :commands="customCommands"
        width=150>
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Edit, CommandColumn } from '@syncfusion/ej2-vue-treegrid';
import { closest } from '@syncfusion/ej2-base';

const treegrid = ref(null);
const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10 },
  { taskID: 2, taskName: 'Design', duration: 5 }
]);

const customCommands = ref([
  { buttonOption: { content: 'Details', cssClass: 'e-flat', click: onDetailsClick } }
]);

const onDetailsClick = (args) => {
  const rowIndex = closest(args.target, '.e-row').rowIndex;
  const rowData = treegrid.value.ej2Instances.getCurrentViewRecords()[rowIndex];
  alert(`Details: ${JSON.stringify(rowData)}`);
};

const editSettings = ref({
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Row'
});

provide('treegrid', [Edit, CommandColumn]);
</script>
```

## Delete Confirmation Dialog

```vue
const editSettings = ref({
  mode: 'Row',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  showDeleteConfirmDialog: true  // Enable delete confirmation
});
```

**Note:** `showDeleteConfirmDialog: true` - Prompts user to confirm before deletion

## New Row Position

Control where new rows are inserted with `newRowPosition`:

```vue
<script setup>
const editSettings = ref({
  mode: 'Dialog',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  newRowPosition: 'Child'  // Options: Top | Bottom | Above | Below | Child
});
</script>
```

**newRowPosition Options:**
- `Top` - Insert at top of grid
- `Bottom` - Insert at bottom (default)
- `Above` - Insert above selected row
- `Below` - Insert below selected row
- `Child` - Insert as child of selected parent row

## Disable Editing for Specific Columns

Prevent editing of certain columns:

```vue
<template>
  <e-column field="taskName" :isPrimaryKey="true" headerText="Task Name" :allowEditing="false" width=90 textAlign="Right"></e-column>
</template>
</script>
```

**Note:** `:allowEditing="false"` prevents that column from being edited while others remain editable
