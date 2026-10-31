# Editing in JavaScript Grid

## Table of Contents
- [Rules](#rules)
- [Overview](#overview)
- [Setup Editing](#setup-editing)
- [Edit Modes](#edit-modes)
- [Edit Configuration](#edit-configuration)
- [Validation](#validation)
- [Advanced Editing](#advanced-editing)

## When to Use This Reference

- Set up all grid editing modes and configurations
- Implement form-based and inline cell editing
- Configure edit validation and constraints
- Handle CRUD operations and data persistence
- Manage edit state and transaction handling

## Rules

> ⚠️ Do not use `allowEditing` on `Grid`. Use `editSettings: { allowEditing: true }` instead.

## Overview

Editing enables users to create, update, and delete records directly in the grid with multiple edit modes and validation support.

## Setup Editing

### Inject Edit Module

```ts
import { Grid, Edit, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, Page);

const grid = new Grid({
  dataSource: data
});
```

### Enable Editing

```ts
import { Grid, Edit, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, Page);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  allowPaging: true
});

grid.appendTo('#grid');
```

## Edit Modes

### Inline Editing

Edit single row inline without dialog:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100, allowEditing: false },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    mode: 'Inline',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Batch Editing

Edit multiple rows at once and save all changes together:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100, allowEditing: false },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    mode: 'Batch',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Dialog Editing

Edit in a modal dialog:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100, allowEditing: false },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAditing: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Save', 'Cancel'],
  allowPaging: true
});

grid.appendTo('#grid');
```

## Edit Configuration

### Edit Triggers

Edit can be triggered via double-click, toolbar buttons, keyboard, or programmatically:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    allowEditOnDblClick: true,  // Enable double-click editing
    allowEditing: true,
    mode: 'Dialog'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Save', 'Cancel']
});

grid.appendTo('#grid');
```

### Primary Key Requirement

Always mark the primary key column:

```ts
{ field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true }
```

### Read-Only Columns

```ts
{ field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true, allowEditing: false }
```

### Edit Type Configuration

Configure different editor types for columns:

**TextBox**
```ts
{ field: 'CustomerName', headerText: 'Customer Name', editType: 'Default', width: 150 }
```

**DropDownList**
```ts
{
  field: 'Status',
  headerText: 'Status',
  editType: 'DropDownList',
  dataSource: ['Pending', 'Shipped', 'Delivered']
}
```

**NumericTextBox**
```ts
{
  field: 'Freight',
  headerText: 'Freight',
  type: 'number',
  editType: 'NumericTextBox',
  editParams: { min: 0, max: 1000, step: 0.01 }
}
```

**DatePicker**
```ts
{
  field: 'OrderDate',
  headerText: 'Order Date',
  type: 'date',
  editType: 'DatePicker',
  editParams: { format: 'yMd' }
}
```

## Validation

### Column Validation Rules

Always match the validation rule to the column's data type. Using the wrong rule causes incorrect validation messages (e.g., applying `min`/`max` to a string column shows a number-based message like "ShipName must be at least 3" instead of "must have at least 3 characters").

```ts
// ✅ Number column — use min/max
{
  field: 'Freight',
  headerText: 'Freight',
  width: 100,
  type: 'number',
  validationRules: { required: true, min: 0, max: 10000 }
}

// ✅ String column — use minLength/maxLength, NOT min/max
{
  field: 'CustomerID',
  headerText: 'Customer ID',
  width: 120,
  type: 'string',
  validationRules: { required: true, minLength: 5, maxLength: 5 }
}

// ✅ Date column — only required applies
{
  field: 'OrderDate',
  headerText: 'Order Date',
  width: 130,
  type: 'date',
  format: 'yMd',
  validationRules: { required: true }
}

// ❌ Wrong — min/max applied to a string column produces wrong message
// { field: 'ShipName', validationRules: { min: 3 } }

// ❌ Wrong — minLength/maxLength applied to a number column produces wrong message
// { field: 'Freight', validationRules: { minLength: 1 } }
```

### Validation Rules Reference

| Rule | Applies to | Description | Example |
|------|-----------|-------------|---------|
| `required` | All types | Field must not be empty | `{ required: true }` |
| `minLength` | **String only** | Minimum character count | `{ minLength: 3 }` |
| `maxLength` | **String only** | Maximum character count | `{ maxLength: 50 }` |
| `min` | **Number only** | Minimum numeric value | `{ min: 0 }` |
| `max` | **Number only** | Maximum numeric value | `{ max: 10000 }` |

### Basic Validation

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100, allowEditing: false },
    {
      field: 'CustomerName',
      headerText: 'Customer Name',
      width: 150,
      validationRules: { required: true, minLength: 3, maxLength: 50 }
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      width: 120,
      validationRules: { required: true, min: 0, max: 1000 }
    }
  ],
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```

### Custom Validation

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  beforeSave: (args: any) => {
    const rowData = args.data;
    
    // Validate Freight amount
    if (rowData.Freight > 5000) {
      args.cancel = true;
      alert('Freight exceeds maximum limit of 5000');
      return;
    }
    
    // Validate customer name
    if (!rowData.CustomerName || rowData.CustomerName.trim() === '') {
      args.cancel = true;
      alert('Customer name is required');
      return;
    }
  },
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```

## Advanced Editing

### Command Column Editing

Add action buttons to each row:

```ts
import { Grid, Edit, Toolbar, CommandColumn } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, CommandColumn);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 },
    {
      field: 'Action',
      headerText: 'Action',
      width: 150,
      commands: [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { cssClass: 'e-flat' } }
      ]
    }
  ],
  editSettings: { allowEditing: true, allowDeleting: true, mode: 'Dialog' },
  allowPaging: true
});

grid.appendTo('#grid');
```

### Custom Command Buttons

```ts
const archiveRecord = (args: any) => {
  console.log('Archive:', args.rowData);
  // Custom archive logic
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    {
      field: 'Action',
      headerText: 'Action',
      width: 200,
      commands: [
        { type: 'Edit', buttonOption: { iconCss: 'e-icons e-edit' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-save' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel' } },
        {
          buttonOption: {
            content: 'Archive',
            iconCss: 'e-icons e-archive',
            click: archiveRecord
          }
        }
      ]
    }
  ],
  editSettings: { mode: 'Inline', allowEditing: true, allowDeleting: true }
});

grid.appendTo('#grid');
```

### Batch Editing with Validation

```ts
const getChanges = () => {
  const changedRecords = grid.getBatchChanges();
  console.log('Changed Records:', changedRecords);
  // Send to server
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    mode: 'Batch',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');

// Get all changes
const batchChanges = grid.getBatchChanges();
```

### Edit Events

Handle edit lifecycle events:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true },
  actionBegin: (args: any) => {
    if (args.requestType === 'save') {
      console.log('Before save:', args.data);
    } else if (args.requestType === 'beginEdit') {
      console.log('Edit started:', args.rowData);
    } else if (args.requestType === 'add') {
      console.log('Add started');
    }
  },
  actionComplete: (args: any) => {
    if (args.requestType === 'save') {
      console.log('Save completed');
    } else if (args.requestType === 'cancel') {
      console.log('Edit cancelled');
    }
  },
  actionFailure: (args: any) => {
    console.error('Action failed:', args.error);
  }
});

grid.appendTo('#grid');
```

### Edit Row Selection

Customize which rows can be edited:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true },
  actionBegin: (args: any) => {
    if (args.requestType === 'beginEdit') {
      const data = args.rowData;
      
      // Prevent editing of completed orders
      if (data.Status === 'Completed') {
        args.cancel = true;
        alert('Cannot edit completed orders');
      }
    }
  }
});

grid.appendTo('#grid');
```

### Custom Edit Dialog Templates

```ts
const dialogTemplate = `
  <div id="dialogTemplate">
    <div class="form-group">
      <label>Order ID:</label>
      <input id="OrderID" disabled />
    </div>
    <div class="form-group">
      <label>Customer Name:</label>
      <input id="CustomerName" />
    </div>
    <div class="form-group">
      <label>Freight:</label>
      <input id="Freight" type="number" />
    </div>
  </div>
`;

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    mode: 'Dialog',
    template: '#dialogTemplate'
  },
  toolbar: ['Add', 'Edit', 'Delete']
});

grid.appendTo('#grid');
```

### Remote Editing with Server Persistence

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Edit, Toolbar);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    insertUrl: 'url',
    updateUrl: 'url',
    removeUrl: 'url',
    batchUrl: 'url/batch'
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Batch'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  actionFailure: (args: any) => {
    console.error('Server error:', args.error);
  }
});

grid.appendTo('#grid');
```

### Cell Edit Event

Handle cell edit start event:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100, allowEditing: false },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', width: 120 }
  ],
  cellEdit: (args: any) => {
    if (args.columnName === 'Freight') {
      // Only allow editing if specific condition is met
      if (args.rowData.Status !== 'Completed') {
        args.cancel = true;
        alert('Cannot edit completed records');
      }
    }
  },
  editSettings: { mode: 'Inline', allowEditing: true }
});

grid.appendTo('#grid');
```

### Grid State Persistence with Editing

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Save and restore grid state:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true }
});

grid.appendTo('#grid');

// Save grid state
const saveGridState = () => {
  const state = {
    pageSettings: grid.pageSettings,
    sortSettings: grid.sortSettings,
    filterSettings: grid.filterSettings,
    groupSettings: grid.groupSettings
  };
  localStorage.setItem('gridState', JSON.stringify(state));
};

// Restore grid state
const restoreGridState = () => {
  const state = JSON.parse(localStorage.getItem('gridState') || '{}');
  if (state) {
    grid.pageSettings = state.pageSettings;
    grid.sortSettings = state.sortSettings;
    grid.filterSettings = state.filterSettings;
    grid.groupSettings = state.groupSettings;
  }
};

restoreGridState();
```

### Error Handling

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true },
  actionFailure: (args: any) => {
    console.error('Edit action failed:', args.error);
    alert('Error: ' + args.error.message);
  }
});

grid.appendTo('#grid');
```
