# Editing

## Table of Contents
- [Overview](#overview)
- [Enable Editing](#enable-editing)
- [Edit Modes](#edit-modes)
- [CRUD Operations](#crud-operations)
- [Editing Configuration](#editing-configuration)
- [Edit Events](#edit-events)

## Overview

Cell editing allows users to directly modify pivot data by editing raw items in a value cell. Double-clicking a cell opens a data grid where users can add, update, or delete records. After editing, the pivot table automatically recalculates aggregated values. Property: [`allowEditing`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/cellEditSettingsModel#allowediting)

**Requirements:**
- Only for relational data sources (not OLAP)
- Set `allowEditing: true` in `editSettings`
- Edit mode: Normal (default), Dialog, or Batch
- Use `allowCommandColumns: true` to show command buttons

## Enable Editing

### Basic Editing Setup

```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings"
    :editSettings="editSettings"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }]
};

// Enable editing
const editSettings = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: 'Normal'  // Or: Dialog, Batch
};

const height = 400;
</script>
```

### Edit Settings Properties

| Property | Type | Description |
|----------|------|-------------|
| `allowEditing` | boolean | Enable cell editing (default: false) |
| `allowAdding` | boolean | Allow adding new rows in data grid |
| `allowDeleting` | boolean | Allow deleting rows from data grid |
| `allowCommandColumns` | boolean | Show command buttons (Edit, Delete, Save, Cancel) in grid |
| `mode` | string | Editing mode: Normal, Dialog, or Batch (default: Normal) |

## Edit Modes

### Normal Mode (Default)

One row at a time. Edited row shown in edit state. Save with Update button.

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  mode: 'Normal'  // Edit one row at a time
};
</script>
```

**Workflow:**
1. Double-click cell → Row enters edit mode
2. Modify values
3. Click **Update** → Save changes
4. Click **Cancel** → Discard changes

### Dialog Mode

Edited row appears in a dedicated dialog window. More focused editing.

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  mode: 'Dialog'  // Edit in modal dialog
};
</script>
```

**Workflow:**
1. Double-click cell → Dialog opens
2. Modify values in form
3. Click **Save** → Save and close
4. Click **Cancel** → Close without saving

**Benefits:**
- Full-screen dedicated editing
- Better for many fields
- Prevents accidental row modifications

### Batch Mode

Edit multiple rows, then save all at once. Efficient for bulk updates.

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  mode: 'Batch'  // Edit multiple rows, save together
};
</script>
```

**Workflow:**
1. Double-click any cell → Cell enters edit mode
2. Edit multiple cells across multiple rows
3. Click **Update** → Save all changes at once
4. Click **Cancel** → Discard all changes

**Benefits:**
- Make multiple changes before saving
- Reduce database operations
- Better for large edits

### Command Columns Options

Dedicated action buttons in grid for Edit/Delete/Save/Cancel. Set `allowCommandColumns: true` with any edit mode.

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  mode: 'Normal',  // Or: Dialog, Batch
  allowCommandColumns: true
};
</script>
```

**Command Column Buttons:**
- **Edit** - Start editing row
- **Delete** - Delete row
- **Save** - Save edited row
- **Cancel** - Discard changes

**Benefits:**
- Clear action buttons visible
- No double-click needed
- Easy for users unfamiliar with grid editing

## CRUD Operations

### Create (Add New Rows)

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  allowAdding: true
};
</script>
```

**User workflow:**
1. Click **Add** toolbar button (if toolbar shown)
2. New empty row appears in grid
3. Enter data for new record
4. Click **Save** or **Update**
5. New item added to dataset

### Read (View Data)

Data grid opens when double-clicking any value cell. Shows all raw items contributing to that aggregation.

### Update (Modify Rows)

```vue
<script setup>
const editSettings = {
  allowEditing: true
};
</script>
```

**User example:**
```
Cell: "USA $100,000" (Sum)
  ↓ Double-click
  Data Grid shows:
  - USA Order 1: $50,000
  - USA Order 2: $30,000
  - USA Order 3: $20,000
  ↓ Modify: Change Order 1 to $60,000
  ↓ Save
  Cell updates: "USA $110,000"
```

### Delete (Remove Rows)

```vue
<script setup>
const editSettings = {
  allowEditing: true,
  allowDeleting: true
};
</script>
```

**User workflow:**
1. Select row in data grid
2. Click **Delete** button
3. Confirmation dialog (if enabled)
4. Click **Confirm** → Row deleted
5. Pivot values recalculate

## Editing Configuration

### Complete Editing Example

```vue
<script setup>
const editSettings = {
  // Basic permissions
  allowEditing: true,        // Enable editing
  allowAdding: true,         // Allow new records
  allowDeleting: true,       // Allow deletes
  
  // UI options
  mode: 'Normal',            // Edit mode: Normal, Dialog, or Batch
  allowCommandColumns: true  // Show command buttons
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }]
};
</script>
```

### Toolbar CRUD Buttons

When toolbar enabled, offers:
- **Add** - New row
- **Edit** - Modify row
- **Delete** - Remove row
- **Update** - Save changes
- **Cancel** - Discard changes

## Edit Events

### Cell Editing Behavior

When `allowEditing` is enabled, users can edit cells by:
1. Double-clicking a value cell
2. Editing raw data in the grid that opens
3. Clicking Update/Save to apply changes

The pivot table automatically recalculates values after edits.

### actionBegin Event

Triggered when editing action starts:

```vue
<script setup>
const onActionBegin = (args) => {
  if (args.actionName === 'Edit') {
    console.log('User started editing:', args);
  }
};

// In template: :actionBegin="onActionBegin"
</script>
```

### actionComplete Event

Triggered when editing action finishes:

```vue
<script setup>
const onActionComplete = (args) => {
  if (args.actionName === 'Save') {
    console.log('Updates saved:', args.data);
    // Refresh external system if needed
  }
};
</script>
```

## Editing Best Practices

### Enable Appropriate Edit Modes

```vue
<script setup>
// For single updates
editSettings.mode = 'Dialog'

// For bulk data entry
editSettings.mode = 'Batch'

// For simple inline changes
editSettings.allowCommandColumns = true
</script>
```

### Permission-Based Editing Control

Control which operations users can perform based on role:

```vue
<script setup>
const userRole = 'Editor';  // Admin, Editor, Viewer

const editSettings = {
  allowEditing: userRole !== 'Viewer',      // Only Admins/Editors
  allowAdding: userRole === 'Admin',        // Only Admins
  allowDeleting: userRole === 'Admin',      // Only Admins
  mode: 'Dialog'                            // Safer than Normal mode
};
</script>
```

### Permission-Based Editing

```vue
<script setup>
const canEdit = userRole === 'Admin';

const editSettings = {
  allowEditing: canEdit,
  allowAdding: canEdit,
  allowDeleting: canEdit && userRole === 'SuperAdmin'
};
</script>
```

### Validation During Editing

```vue
<script setup>
const onActionBegin = (args) => {
  if (args.actionName === 'Save') {
    // Validate before saving
    if (!validateData(args.data)) {
      args.cancel = true;  // Prevent save
      showError('Invalid data');
    }
  }
};
</script>
```

### Performance for Large Datasets

```vue
<script setup>
const editSettings = {
  mode: 'Batch',  // Batch mode is faster for bulk edits
  allowDeferLayoutUpdate: true  // Don't recalc until all done
};
</script>
```

## Data Grid Editor Configuration

Configure grid editing behavior when working with PivotView in editable mode:

```vue
<template>
  <ejs-pivotview
    ref="pivot"
    :dataSourceSettings="dataSourceSettings"
    :gridSettings="gridSettings"
    :editSettings="editSettings"
    :actionBegin="onActionBegin"
    :actionComplete="onActionComplete">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';

const gridSettings = {
  // Cell editing behavior
  allowResizing: true,
  allowReordering: true,
  
  // Selection settings for editing
  selectionSettings: {
    mode: 'Cell',      // 'Row', 'Cell', 'Both'
    type: 'Multiple'
  },
  
  // Column sizing
  columnWidth: 120,
  rowHeight: 36
};

const editSettings = {
  mode: 'Dialog',           // 'Dialog', 'Inline', 'Batch'
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  showDeleteConfirmDialog: true,
  
  // Validation
  allowEditOnDblClick: true,
  editMode: 'Dialog'
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const onActionBegin = (args) => {
  if (args.requestType === 'save') {
    console.log('Saving:', args.data);
  }
};

const onActionComplete = (args) => {
  if (args.requestType === 'save') {
    // Persist changes to server
    saveToServer(args.data);
  }
};

const saveToServer = async (data) => {
  const response = await fetch('/api/pivot/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};
</script>
```

### Editing Checklist

- [ ] Choose appropriate edit mode (Normal/Dialog/Batch)
- [ ] Set `allowAdding`, `allowDeleting` based on use case
- [ ] Implement validation for data integrity
- [ ] Add permission checks for sensitive operations
- [ ] Use Dialog mode for safer editing (dedicated modal)
- [ ] Use Batch mode for bulk updates
- [ ] Test CRUD with realistic data volumes
- [ ] Monitor performance with batch editing

---

## Grid Editor Configuration

Configure the underlying data grid editor when PivotView is in editing mode.

### Enable Grid Editing Mode
```vue
<template>
  <ejs-pivotview
    ref="pivot"
    :dataSourceSettings="dataSourceSettings"
    :gridSettings="gridSettings"
    :editSettings="editSettings"
    :actionBegin="onActionBegin"
    :actionComplete="onActionComplete">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';

const pivot = ref(null);

// Grid editing configuration
const gridSettings = {
  // Editing mode options
  editMode: 'Dialog',           // 'Dialog', 'Inline', 'Batch', 'ExternalForm'
  
  // Grid appearance
  rowHeight: 36,
  columnWidth: 150,
  allowResizing: true,
  allowReordering: false,       // Disable during editing for clarity
  
  // Selection behavior
  selectionSettings: {
    type: 'Single',             // 'Single' or 'Multiple'
    mode: 'Row'                 // 'Row', 'Cell', 'Both'
  },
  
  // Cell styling
  enableHover: true,
  allowTextWrap: true,
  rowBorder: true
};

const editSettings = {
  // Basic editing
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  
  // User confirmation
  showDeleteConfirmDialog: true,
  
  // Edit mode
  mode: 'Dialog'                // Options: 'Inline', 'Dialog', 'Batch'
};

const onActionBegin = (args) => {
  if (args.requestType === 'save') {
    console.log('Saving row:', args.data);
    // Validate before save
    if (!validateRow(args.data)) {
      args.cancel = true;
      console.warn('Validation failed - edit cancelled');
    }
  }
  
  if (args.requestType === 'delete') {
    console.log('Deleting row:', args.data);
    // Check permissions
    if (!canDelete(args.data)) {
      args.cancel = true;
      console.warn('Permission denied - delete cancelled');
    }
  }
};

const onActionComplete = (args) => {
  if (args.requestType === 'save') {
    console.log('Row saved successfully');
    // Send to server
    saveToServer(args.data);
  }
  
  if (args.requestType === 'delete') {
    console.log('Row deleted');
    // Notify server
    deleteFromServer(args.data);
  }
};

const validateRow = (data) => {
  // Example validation rules
  if (!data.Name || data.Name.trim() === '') {
    console.error('Name is required');
    return false;
  }
  
  if (data.Amount && data.Amount < 0) {
    console.error('Amount cannot be negative');
    return false;
  }
  
  return true;
};

const canDelete = (data) => {
  // Check user permissions
  const userRole = getCurrentUserRole();
  return userRole === 'Admin' || userRole === 'Manager';
};

const saveToServer = async (data) => {
  try {
    const response = await fetch('/api/pivot/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Save failed:', error);
  }
};

const deleteFromServer = async (data) => {
  try {
    await fetch(`/api/pivot/delete/${data.id}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Delete failed:', error);
  }
};

const getCurrentUserRole = () => {
  // Get from auth service
  return 'User';  // Replace with actual role
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Inline Edit Mode (Quick Edits)
```vue
<script setup>
const editSettings = {
  mode: 'Inline',          // Edit directly in cell
  allowEditing: true,
  allowAdding: false       // Adding not available in inline mode
};

// User clicks cell → Becomes editable → Press Enter to save → Press Esc to cancel
</script>
```

### Batch Edit Mode (Bulk Updates)
```vue
<template>
  <div>
    <button @click="saveAllChanges">Save All Changes</button>
    <button @click="discardChanges">Discard Changes</button>
    
    <ejs-pivotview
      ref="pivot"
      :editSettings="editSettings"
      :actionBegin="onActionBegin">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pivot = ref(null);

const editSettings = {
  mode: 'Batch',           // Multiple edits before final save
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
};

const saveAllChanges = async () => {
  // Get all pending changes
  const changes = pivot.value?.getBatchChanges?.();
  
  if (changes && changes.length > 0) {
    const response = await fetch('/api/pivot/batch-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    });
    
    if (response.ok) {
      pivot.value?.saveChanges?.();
      console.log('✓ All changes saved');
    }
  }
};

const discardChanges = () => {
  pivot.value?.discardChanges?.();
  console.log('Changes discarded');
};
</script>
```
