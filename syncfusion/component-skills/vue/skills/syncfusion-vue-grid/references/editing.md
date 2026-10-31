# Editing in Vue Grid

## Table of Contents
- [When to Use](#when-to-use)
- [Enabling Editing](#enabling-editing)
- [Edit Modes](#edit-modes)
- [Edit Types](#edit-types)
- [Inline Editing](#inline-editing)
- [Dialog Editing](#dialog-editing)
- [Batch Editing](#batch-editing)
- [Template Editing](#template-editing)
- [Server Persistence](#server-persistence)
- [Advanced Editing](#advanced-editing)

## When to Use

Use the editing feature when you need to allow users to dynamically insert, delete, and update records directly within the grid. This feature enables CRUD (Create, Read, Update, Delete) operations seamlessly. Choose between inline editing (Normal/Default mode) for quick cell edits, Dialog mode for form-based editing, Batch mode for bulk updates, or Template mode for custom forms. Use server adaptors to persist changes to your database.

## Enabling Editing

Enable CRUD by configuring `editSettings` with a primary key column (`isPrimaryKey: true`):

```vue
const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

<!-- Primary key required for edit/delete -->
<e-column field='OrderID' :isPrimaryKey='true' width=100></e-column>
<e-column field='Freight' editType='numericedit' format='C2' width=100></e-column>
<e-column field='ShipCountry' editType='dropdownedit' width=120></e-column>
```

## Edit Modes

**Normal (Inline):** Edit cells directly | **Dialog:** Form dialog | **Batch:** Multi-row edit, save together

```javascript
// Normal Mode (inline cell editing)
const editSettings = { mode: 'Normal', allowEditing: true, allowAdding: true, allowDeleting: true };

// Dialog Mode (form-based)
const editSettings = { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true };

// Batch Mode (bulk editing)
const editSettings = { mode: 'Batch', allowEditing: true, allowAdding: true, allowDeleting: true };

// Dialog with custom template
const editSettings = { mode: 'Dialog', template: 'dialogTemplate' };
```

## Edit Types

**textedit** (default) | **numericedit** | **dropdownedit** | **checkboxedit** | **datepickeredit** | **datetimepickeredit** | **maskedtextedit** | **richtextedit**

```vue
<!-- Common edit types -->
<e-column field="CustomerID" editType="textedit" width="120"></e-column>
<e-column field="Freight" editType="numericedit" format="C2" width="100"></e-column>
<e-column field="ShipCountry" editType="dropdownedit" :dataSource="countryData" width="120"></e-column>
<e-column field="OrderDate" editType="datepickeredit" format="yMd" type="date" width="130"></e-column>
<e-column field="IsActive" editType="checkboxedit" type="boolean" width="80"></e-column>

<!-- Custom editor template for TextArea -->
<e-column field="ShipAddress" editType="defaultedit">
  <template v-slot:editTemplate="{ data }">
    <textarea v-model="data.ShipAddress" rows="3"></textarea>
  </template>
</e-column>
```

**Customize numeric:** `{ params: { validateDecimalOnType: true, decimals: 2, showClearButton: true } }`

## Inline Editing

Enable inline (Normal) editing to edit cells directly in the grid. Key features include default values, multi-row selection, persistent empty rows, single-click editing, and conditional row locking.

### Inline Editing Features

```javascript
// Display default values for new records
const columns = [
  { field: 'CustomerID', defaultValue: 'HANAR' },
  { field: 'Freight', editType: 'numericedit', defaultValue: 1 },
  { field: 'ShipCountry', editType: 'dropdownedit', defaultValue: 'France' }
];

// Delete multiple rows with selection
const selectOptions = { type: 'Multiple' };
const toolbar = ['Delete'];

// Add new row at top/bottom with persistent empty row
const editSettings = { 
  newRowPosition: 'Top',  // or 'Bottom'
  showAddNewRow: true,    // Always show empty row for new records
  showDeleteConfirmDialog: true
};

// Single-click edit (instead of double-click)
const load = () => {
  grid.value.ej2Instances.getContentTable().addEventListener('click', (args) => {
    if (args.target.classList.contains('e-rowcell')) {
      grid.value.ej2Instances.editModule.editCell(
        parseInt(args.target.getAttribute('index')),
        grid.value.ej2Instances.getColumnByIndex(parseInt(args.target.getAttribute('aria-colindex'))-1).field
      );
    }
  });
};

// Prevent edit/delete for specific rows
const actionBegin = (args) => {
  if ((args.requestType === "beginEdit" || args.requestType === "delete") && args.rowData["Role"] === "Admin") {
    args.cancel = true;  // Block edit/delete
  }
};

// Move focus to specific field after edit begins
const actionComplete = (args) => {
  if (args.requestType === 'beginEdit') {
    args.form.elements.namedItem('CustomerID').focus();
  }
};

// Programmatic CRUD actions
grid.value.ej2Instances.addRecord();
grid.value.ej2Instances.startEdit();
grid.value.ej2Instances.deleteRecord();
grid.value.ej2Instances.updateRow(0, { OrderID: 10249, CustomerID: 'TOMSP' });
grid.value.ej2Instances.setCellValue(10249, 'CustomerID', 'UPDATED');
```

## Dialog Editing

```javascript
const editSettings = { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true };

// Customize dialog appearance and buttons
const actionComplete = (args) => {
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    // Customize appearance
    args.dialog.showCloseIcon = false;
    args.dialog.height = 300;
    args.dialog.header = args.requestType === 'beginEdit' ? 'Edit Record' : 'Add New Record';
    
    // Custom buttons
    args.dialog.buttons = [
      { buttonModel: { content: 'Discard', cssClass: 'e-primary' }, click: () => grid.value.ej2Instances.editModule.closeEdit() },
      { buttonModel: { content: 'Submit', cssClass: 'e-success' }, click: () => grid.value.ej2Instances.editModule.endEdit() }
    ];
  }
};

// Show/hide columns conditionally in dialog
const actionBegin = (args) => {
  grid.value.ej2Instances.columns.forEach(col => {
    if (args.requestType === 'beginEdit') {
      col.visible = col.field !== 'ShipCountry';  // Hide ShipCountry on edit
    } else if (args.requestType === 'save') {
      col.visible = col.field === 'ShipCountry';  // Show ShipCountry on save
    }
  });
};
```

## Batch Editing

Edit multiple rows, save all together:

```javascript
const editSettings = { 
  mode: 'Batch', 
  allowEditing: true, allowAdding: true, allowDeleting: true,
  showConfirmDialog: true,
  showDeleteConfirmDialog: true
};

// Auto-update dependent columns on edit
const cellEdit = (args) => {
  if (args.columnName === 'UnitPrice' || args.columnName === 'UnitInStock') {
    const totalCost = args.rowData.UnitPrice * args.rowData.UnitInStock;
    grid.value.ej2Instances.setCellValue(args.rowData.ProductID, 'TotalCost', totalCost);
  }
};

// Prevent edit for specific cell values
const cellEdit2 = (args) => {
  if (args.value === 'France') args.cancel = true;
};

// Save all batch changes
grid.value.ej2Instances.editModule.batchSave();

// Single-click with arrow key navigation
const load = () => {
  grid.value.ej2Instances.getContentTable().addEventListener('click', (args) => {
    if (args.target.classList.contains('e-rowcell')) {
      grid.value.ej2Instances.editModule.editCell(
        parseInt(args.target.getAttribute('index')),
        grid.value.ej2Instances.getColumnByIndex(parseInt(args.target.getAttribute('aria-colindex'))-1).field
      );
    }
  });
};
```

## Template Editing

Custom form editing with Vue templates:

```vue
<!-- Template definition -->
<template v-slot:dialogTemplate="{ data }">
  <div class="form-group">
    <!-- Use isAdd property to detect new vs edit -->
    <input v-model="data.OrderID" type="text" :disabled="!data.isAdd" />
  </div>
</template>
```

```javascript
const editSettings = { mode: 'Dialog', template: 'dialogTemplate' };

// Render custom dropdown editor in template
const actionComplete = (args) => {
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    new DropDownList({
      value: args.rowData.ShipCountry,
      dataSource: countryData,
      fields: { text: 'ShipCountry', value: 'ShipCountry' }
    }, args.form.elements.namedItem('ShipCountry'));
    args.form.elements.namedItem('CustomerID').focus();  // Set focus
  }
};

// Get values from custom editor
const actionBegin = (args) => {
  if (args.requestType === 'save') {
    args.data.Freight = parseFloat(args.form.querySelector('#Freight').ej2_instances[0].value);
  }
};

// Manage form validation
const actionComplete2 = (args) => {
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    args.form.ej2_instances[0].removeRules();  // Clear default validation
    args.form.ej2_instances[0].addRules('Freight', { max: 500 });  // Add custom rules
  }
};
```

## Server Persistence

Use DataManager adaptors to persist changes:

```javascript
import { DataManager, UrlAdaptor, WebApiAdaptor, ODataV4Adaptor, RemoteSaveAdaptor, GraphQLAdaptor } from "@syncfusion/ej2-data";

// UrlAdaptor or WebApiAdaptor (same structure)
const data = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  insertUrl: 'url/insert',
  updateUrl: 'url/update',
  removeUrl: 'url/delete'
});

// OData v4
const data2 = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});

// RemoteSaveAdaptor (client-side operations, server-side CRUD)
const data3 = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  insertUrl: '.../insert',
  updateUrl: '.../update',
  removeUrl: '.../delete'
});

// GraphQL
const data4 = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor({ query: 'query GetOrders { Orders { OrderID CustomerID } }' })
});

// Handle CRUD events and errors
const actionBegin = (args) => {
  if (args.requestType === 'save') console.log('Saving:', args.data);
  if (args.requestType === 'delete') console.log('Deleting:', args.data);
};

const actionFailure = (args) => {
  console.log('Error:', args.error);
};
```

## Advanced Editing

**Column restrictions and custom editors:**

```vue
<!-- Disable editing for specific column -->
<e-column field="OrderID" :allowEditing="false" width="100"></e-column>

<!-- Foreign key with ComboBox -->
<e-column field="EmployeeID" headerText="Employee Name">
  <template v-slot:editTemplate="{ data }">
    <ejs-combobox id="EmployeeID" :dataSource="employeeData" :value="data.EmployeeID"></ejs-combobox>
  </template>
</e-column>

<!-- Nested data edit (use underscore for nested properties) -->
<e-column field="Name.FirstName" editType="textedit">
  <template v-slot:editTemplate="{ data }">
    <input name="Name__FirstName" v-model="data.Name.FirstName" />
  </template>
</e-column>

<!-- Enum/Select column -->
<e-column field="Status" editType="dropdownedit">
  <template v-slot:editTemplate="{ data }">
    <select v-model="data.Status"><option>Active</option><option>Inactive</option></select>
  </template>
</e-column>

<!-- Boolean column with single-click toggle -->
<e-column field="Verified" type="boolean" :displayAsCheckBox="true">
  <template v-slot:template="{ data }">
    <ejs-checkbox :checked="data.Verified" :change="() => toggleBoolean(data)"></ejs-checkbox>
  </template>
</e-column>
```

**External form & keyboard operations:**

```javascript
// External form editing
const handleRowSelect = (args) => populateFormWithData(args.rowData);
const saveExternalForm = () => grid.value.ej2Instances.updateRow(selectedRowIndex, getFormData());

// Keyboard shortcuts: Insert (add) | Delete (delete) | Tab (next cell) | Enter (save) | Esc (cancel)
// IMPORTANT: Ensure isPrimaryKey=true on primary column; edit/delete fail on first row without it
```
