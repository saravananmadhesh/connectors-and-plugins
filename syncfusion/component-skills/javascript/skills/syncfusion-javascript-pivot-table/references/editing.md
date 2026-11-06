# Editing in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Edit Modes](#edit-modes)
3. [Edit Settings Configuration](#edit-settings-configuration)
4. [Command Columns](#command-columns)
5. [Common Patterns](#common-patterns)
6. [Troubleshooting](#troubleshooting)

## Overview

The cell editing feature allows users to directly modify data in the pivot table by adding, updating, or deleting raw data items within value cells. When you double-click a value cell, the raw items appear in a data grid within a new window where CRUD operations can be performed. After editing, the pivot table automatically updates the aggregated values.

**Key Features:**
- Add, edit, delete raw data records
- Four editing modes: Normal, Dialog, Batch, Command Columns
- Toolbar and command column actions
- Confirmation dialogs for operations
- Inline editing support
- Automatic pivot table refresh after edits

**Important:** This feature applies only to relational data sources.

## Edit Modes

### Normal Mode

Normal edit mode allows editing one row at a time. The selected row changes to edit state, and cell values can be modified and saved using the "Update" toolbar button.

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    height: 350,
    editSettings: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        mode: 'Normal'
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Default:** Normal mode is the default editing mode.

### Dialog Mode

Dialog edit mode displays the selected row data in an exclusive dialog window for focused editing. Cell values can be modified and saved using the "Save" button in the dialog.

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    height: 350,
    editSettings: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        mode: 'Dialog'
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Benefits:**
- Clear visibility of all fields
- Controlled data modification
- Dedicated editing environment

### Batch Mode

Batch editing enables users to make multiple changes and save them all at once, improving efficiency for bulk updates. Users can perform multiple add, edit, and delete operations before clicking the "Update" toolbar button.

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    height: 350,
    editSettings: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        mode: 'Batch'
    }
});
pivotTableObj.appendTo('#PivotTable');
```

**Use Case:** Ideal for bulk data entry or multiple corrections.

## Edit Settings Configuration

The `editSettings` property provides comprehensive control over editing behavior:

| Property | Type | Description |
|----------|------|-------------|
| `allowAdding` | boolean | Enables adding new rows to the data grid |
| `allowEditing` | boolean | Allows editing existing records |
| `allowDeleting` | boolean | Enables deleting records |
| `allowCommandColumns` | boolean | Displays command buttons in data grid |
| `mode` | string | Sets editing mode: Normal, Dialog, Batch |
| `allowEditOnDblClick` | boolean | Enables double-click to start editing |
| `showConfirmDialog` | boolean | Shows confirmation before saving changes |
| `showDeleteConfirmDialog` | boolean | Shows confirmation before deleting |
| `allowInlineEditing` | boolean | Allows direct cell editing |

### Complete Configuration Example

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    height: 350,
    editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        mode: 'Normal',
        allowEditOnDblClick: true,
        showConfirmDialog: true,
        showDeleteConfirmDialog: true,
        allowInlineEditing: false
    }
});
pivotTableObj.appendTo('#PivotTable');
```

## Command Columns

Command columns provide dedicated action buttons within the data grid for CRUD operations as an alternative to toolbar options. An additional column appears with command buttons for each row.

### Enabling Command Columns

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    height: 350,
    editSettings: {
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true,
        allowCommandColumns: true
    }
});
pivotTableObj.appendTo('#PivotTable');
```

### Available Command Buttons

| Button | Action |
|--------|--------|
| Edit | Edit the current row |
| Delete | Delete the current row |
| Save | Update the edited row |
| Cancel | Cancel the edited state |

**Note:** When command columns are enabled, Edit, Delete, Update, and Cancel buttons don't appear in the toolbar. These actions appear in the last column of each row instead.

## Toolbar Actions

The data grid toolbar provides buttons for CRUD operations:

| Toolbar Button | Action |
|----------------|--------|
| Add | Add a new row |
| Edit | Edit the current row or cell |
| Delete | Delete the current row |
| Update | Update the edited row or cell |
| Cancel | Cancel the edited state |

## Common Patterns

### Pattern 1: Basic Editing with Confirmation

```typescript
// Enable all CRUD operations with confirmation dialogs
editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Normal',
    showConfirmDialog: true,
    showDeleteConfirmDialog: true
}
```

### Pattern 2: Batch Editing for Bulk Updates

```typescript
// Allow multiple edits before saving
editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Batch',
    showConfirmDialog: true
}
```

### Pattern 3: Command Columns for Quick Actions

```typescript
// Use command columns for streamlined editing
editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowCommandColumns: true,
    showDeleteConfirmDialog: true
}
```

### Pattern 4: Dialog Editing for Complex Records

```typescript
// Use dialog mode for forms with many fields
editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: false,
    mode: 'Dialog',
    showConfirmDialog: true,
    allowEditOnDblClick: true
}
```

## Editing Workflow

### User Interaction Steps

**For Toolbar-Based Editing:**
1. Double-click any value cell in pivot table
2. Data grid opens in new window showing raw data
3. Click "Add" button to add new rows
4. Double-click any cell to edit (Normal/Dialog mode)
5. Click "Update" to save changes
6. Pivot table refreshes with updated aggregations

**For Command Column Editing:**
1. Double-click any value cell in pivot table
2. Data grid opens with command column
3. Click "Edit" button in the row to modify
4. Make changes to cell values
5. Click "Save" button in the row
6. Pivot table refreshes automatically

**For Batch Editing:**
1. Double-click any value cell in pivot table
2. Double-click multiple cells to edit
3. Make all necessary changes
4. Click "Update" toolbar button once
5. All changes save together
6. Pivot table refreshes with updates

## Troubleshooting

### Editing Not Working

**Issue:** Double-clicking value cells doesn't open editing window.

**Solution:**
- Set `allowEditing: true` in editSettings
- Verify clicking on value cells (not headers or row/column cells)
- Check that data source is relational (not OLAP)
- Ensure data source is mutable (not read-only)

### Add Button Not Visible

**Issue:** Cannot see "Add" button in data grid toolbar.

**Solution:**
- Set `allowAdding: true` in editSettings
- Verify command columns are not enabled (command columns hide toolbar buttons)
- Check that data grid is properly initialized

### Delete Confirmation Not Appearing

**Issue:** Delete action executes without confirmation.

**Solution:**
- Set `showDeleteConfirmDialog: true` in editSettings
- Verify the setting is applied before initialization
- Check browser console for JavaScript errors

### Changes Not Reflecting in Pivot Table

**Issue:** Edits are saved but pivot table doesn't update.

**Solution:**
- Ensure data source is bound by reference (not a copy)
- Verify data source updates are persisted
- Check that fields used in aggregation are correctly updated
- Refresh pivot table manually if needed:
  ```typescript
  pivotTableObj.dataSourceSettings.dataSource = updatedData;
  ```

### Command Columns Hiding Toolbar

**Issue:** Toolbar buttons disappeared after enabling command columns.

**Solution:**
- This is expected behavior when `allowCommandColumns: true`
- Use command buttons in each row instead of toolbar
- Disable command columns to restore toolbar buttons:
  ```typescript
  allowCommandColumns: false
  ```

### Batch Mode Not Saving All Changes

**Issue:** Some batch edits are lost.

**Solution:**
- Click "Update" toolbar button to save all changes
- Don't close edit window before clicking Update
- Check console for validation errors
- Ensure data types match field requirements
