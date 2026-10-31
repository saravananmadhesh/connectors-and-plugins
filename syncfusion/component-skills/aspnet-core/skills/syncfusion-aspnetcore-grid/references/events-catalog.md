# Events Catalog in ASP.NET Core Grid

## Table of Contents
- [Mandatory Rules](#mandatory-rules)
- [Event Handling Basics](#event-handling-basics)
- [All Grid Events by Category](#all-grid-events-by-category)
  - [Lifecycle Events (4)](#lifecycle-events-4)
  - [Action Events (3)](#action-events-3)
  - [Row Events (8)](#row-events-8)
  - [Cell Events (7)](#cell-events-7)
  - [Edit Events (6)](#edit-events-6)
  - [Column Events (6)](#column-events-6)
  - [Data & State Events (4)](#data--state-events-4)
  - [Export Events (4)](#export-events-4)

---

## Mandatory Rules for Inbuilt API

**CRITICAL**: Follow these rules when using Grid events and the inbuilt API to avoid silent failures or unexpected behavior.

### Rule 1: Event Handlers Must Accept the Args Parameter
Missing or incorrect event signatures cause silent failures.

```cshtml
<!-- ❌ WRONG - Missing args parameter -->
<ejs-grid id="Grid" onActionComplete="onActionComplete"></ejs-grid>

<script>
function onActionComplete() {
  console.log('done'); // No access to event data
}
</script>

<!-- ✅ CORRECT - Accept args parameter -->
<ejs-grid id="Grid" onActionComplete="onActionComplete"></ejs-grid>

<script>
function onActionComplete(args) {
  console.log('Request type:', args.requestType);
  console.log('Data:', args.data);
}
</script>
```

### Rule 2: Use actionBegin for Cancellation, actionComplete for Reactions

**actionBegin vs actionComplete — Decision Rule**

| Use `actionBegin` when you need to | Use `actionComplete` when you need to |
|---|---|
| Cancel/stop the action (`args.cancel = true`) | Call server API after save/delete |
| Modify data before save | Show notification/toast |
| Confirm before delete | Refresh external state |
| Block unauthorized actions | Log user actions |
| Validate data | Update parent data |

**Example 1: Using actionBegin for Cancellation**

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionBegin="onActionBegin"
          onActionComplete="onActionComplete">
</ejs-grid>

<script>
// actionBegin - intercept and potentially cancel
function onActionBegin(args) {
  // Cancel delete action with confirmation
  if (args.requestType === 'delete') {
    if (!confirm('Are you sure you want to delete this record?}} {
      args.cancel = true;
    }
  }

  // Modify data before save
  if (args.requestType === 'save') {
    args.data.UpdatedAt = new Date().toISOString();
    args.data.UpdatedBy = 'CurrentUser';
  }

  // Manage toolbar state
  if (['add', 'beginEdit'].includes(args.requestType)) {
    document.getElementById('Grid').ej2_instances[0].toolbarModule.enableItems(['Add', 'Edit', 'Delete'], false);
    document.getElementById('Grid').ej2_instances[0].toolbarModule.enableItems(['Update', 'Cancel'], true);
  }
}

// actionComplete - react after action succeeds
function onActionComplete(args) {
  var gridElement = document.getElementById('Grid');
  var gridObj = gridElement.ej2_instances[0];

  if (args.requestType === 'save') {
    // Call server API to sync record
    fetch('/api/records/sync', { 
      method: 'POST'
    });
    
    // Show notification
    alert('Record saved successfully');
    
    // Restore toolbar state
    gridObj.toolbarModule.enableItems(['Add', 'Edit', 'Delete'], true);
    gridObj.toolbarModule.enableItems(['Update', 'Cancel'], false);
  }

  if (args.requestType === 'delete') {
    alert('Record deleted successfully');
    gridObj.refresh();
  }
}
</script>
```

**Example 2: Complete Event Handler Setup**

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionBegin="onActionBegin"
          onActionComplete="onActionComplete"
          onActionFailure="onActionFailure">
</ejs-grid>

<script>
function onActionBegin(args) {
  // Cancel action before it executes
  if (args.requestType === 'save' && !isFormValid()) {
    args.cancel = true;
  }
}

function onActionComplete(args) {
  // React after action completes successfully
  if (args.requestType === 'save') {
    alert('Saved successfully!');
  }
}

function onActionFailure(args) {
  // MANDATORY - Handle errors
  console.error('Error:', args.error);
  alert('An error occurred. Please try again.');
}
</script>
```

### Rule 3: Event Timing Matters
Know when events fire relative to action execution:

| Event | Timing | Can Cancel? | Use For |
|-------|--------|-------------|---------|
| `actionBegin` | Before action starts | ✅ Yes | Validation, cancellation, data modification |
| `actionComplete` | After action finishes successfully | ❌ No | API calls, notifications, state updates |
| `actionFailure` | On error | ❌ No | Error handling, logging |
| `rowSelecting` | Before row selection | ✅ Yes | Prevent selection of certain rows |
| `rowSelected` | After row selection completes | ❌ No | React to updated selection |

### Rule 4: Don't Call Methods Inside Render Events
```javascript
// ❌ FORBIDDEN - Causes infinite loops and performance issues
var gridElement = document.getElementById('Grid');
var gridObj = gridElement.ej2_instances[0];

// These events fire for EVERY row render
gridObj.queryCellInfo = function(args) {
  gridObj.refresh(); // NEVER DO THIS - infinite loop
}

gridObj.rowDataBound = function(args) {
  gridObj.selectRow(0); // NEVER DO THIS - constant re-rendering
}

// ✅ CORRECT - Use proper event lifecycle
gridObj.actionComplete = function(args) {
  if (args.requestType === 'refresh') {
    // Safe to call methods here - fires once after refresh
    gridObj.selectRow(0);
  }
}
```

---
          onActionComplete="onActionComplete"
          onActionFailure="onActionFailure">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <!-- columns -->
    </e-grid-columns>
</ejs-grid>

<script>
// Intercept and potentially cancel actions
function onActionBegin(args) {
    if (args.requestType === 'delete') {
        // Confirm before delete
        if (!confirm('Are you sure you want to delete this record?')) {
            args.cancel = true;
            return;
        }
    }
    
    if (args.requestType === 'save') {
        // Add audit fields before save
        args.data.ModifiedBy = currentUser.id;
        args.data.ModifiedDate = new Date();
    }
}

// React after action completes
function onActionComplete(args) {
    if (args.requestType === 'save') {
        console.log('Record saved:', args.data);
        alert('Record saved successfully!');
    }
    if (args.requestType === 'delete') {
        console.log('Record deleted');
    }
}

// Handle errors
function onActionFailure(args) {
    console.error('Error:', args.error);
    alert('An error occurred: ' + args.error.message);
}
</script>
```

### Rule 3: Event Order and Timing

| Event | Timing | Cancellable | When it Fires |
|-------|--------|------------|--------------|
| `onLoad` | Before data bind | ❌ | Grid initializing |
| `onActionBegin` | Before action | ✅ | Save, Delete, Sort, Filter, Page |
| `onActionComplete` | After action | ❌ | After action finishes |
| `onActionFailure` | On error | ❌ | Action fails with error |
| `onDataBound` | After data bound | ❌ | Data rendered |
| `onDestroyed` | On destroy | ❌ | Component destroying |

---

## Event Handling Basics

### Basic Event Handler Pattern

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onLoad="onGridLoad"
          onDataBound="onDataBound">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onGridLoad(args) {
    console.log('Grid is initializing');
}

function onDataBound(args) {
    console.log('Grid data bound and rows rendered');
}
</script>
```

### Accessing Grid Instance in Event Handler

```cshtml
<script>
function onRowDataBound(args) {
    // Get grid instance
    var grid = document.getElementById('Grid').ej2_instances[0];
    
    // Customize row
    if (args.data.Freight > 100) {
        args.row.style.backgroundColor = '#ffcccc';
    }
}
</script>
```

---

## All Grid Events by Category

### Lifecycle Events (4)

| Event | Args Property | Use Case |
|-------|--------------|----------|
| `onLoad` | `LoadEventArgs` | Before data binding - setup grid properties |
| `onCreated` | - | Grid component created |
| `onDataBound` | `DataBoundEventArgs` | After data rendered - post-render actions |
| `onDestroyed` | - | Component destroyed - cleanup |

**Example:**
```cshtml
<ejs-grid id="Grid" 
          onLoad="onLoad"
          onDataBound="onDataBound"
          onDestroyed="onDestroyed">
</ejs-grid>

<script>
function onLoad(args) {
    // Grid initializing - safe to modify properties
    args.grid.pageSettings.pageSize = 20;
}

function onDataBound(args) {
    console.log('Data bound, ' + args.grid.getRows().length + ' rows rendered');
}

function onDestroyed(args) {
    console.log('Grid destroyed - cleanup resources');
}
</script>
```

### Action Events (3)

| Event | requestType Values | Use Case |
|-------|------------------|----------|
| `onActionBegin` | 'save', 'delete', 'cancel', 'refresh', 'paging', 'sorting', 'filtering', 'grouping', 'add', 'beginEdit' | Intercept action, validate, cancel |
| `onActionComplete` | Same as actionBegin | React after action, show feedback |
| `onActionFailure` | - | Error handling |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionBegin="onActionBegin"
          onActionComplete="onActionComplete"
          onActionFailure="onActionFailure">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
</ejs-grid>

<script>
function onActionBegin(args) {
    console.log('Action starting: ' + args.requestType);
    
    switch(args.requestType) {
        case 'save':
            console.log('Saving:', args.data);
            break;
        case 'delete':
            if (!confirm('Delete?')) {
                args.cancel = true;
            }
            break;
        case 'paging':
            console.log('Going to page:', args.currentPage);
            break;
    }
}

function onActionComplete(args) {
    console.log('Action complete: ' + args.requestType);
    
    if (args.requestType === 'save') {
        alert('Record saved!');
    }
}

function onActionFailure(args) {
    console.error('Action failed:', args.error);
}
</script>
```

### Row Events (8)

| Event | Use Case |
|-------|----------|
| `onRowDataBound` | Style rows, add custom classes, modify row based on data |
| `onRowSelecting` | Prevent certain rows from being selected |
| `onRowSelected` | React to row selection |
| `onRowDeselecting` | Prevent deselection |
| `onRowDeselected` | React to row deselection |
| `onRecordClick` | Single click on row |
| `onRecordDoubleClick` | Double click - often used to edit |
| `onRowDrag` | Row drag and drop |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onRowDataBound="onRowDataBound"
          onRowSelected="onRowSelected"
          onRecordDoubleClick="onRecordDoubleClick">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID"></e-grid-column>
        <e-grid-column field="Status" headerText="Status"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onRowDataBound(args) {
    // Style based on data
    if (args.data.Status === 'Completed') {
        args.row.style.backgroundColor = '#90EE90';
        args.row.style.fontWeight = 'bold';
    }
}

function onRowSelected(args) {
    console.log('Row selected:', args.data);
}

function onRecordDoubleClick(args) {
    console.log('Double click on row:', args.data.OrderID);
    // Could trigger edit mode here
}
</script>
```

### Cell Events (7)

| Event | Use Case |
|-------|----------|
| `onQueryCellInfo` | Customize cell appearance, add CSS classes |
| `onCellSelecting` | Prevent cell selection |
| `onCellSelected` | React to cell selection |
| `onCellDeselecting` | Prevent cell deselection |
| `onCellDeselected` | React to deselection |
| `onCellEdit` | Before cell edit |
| `onCellSave` | Before cell save in batch edit |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onQueryCellInfo="onQueryCellInfo"
          onCellSelected="onCellSelected">
</ejs-grid>

<script>
function onQueryCellInfo(args) {
    // Color code cells
    if (args.column.field === 'Freight') {
        if (args.data.Freight > 100) {
            args.cell.style.backgroundColor = '#FFE4E1';
            args.cell.style.color = '#8B0000';
        }
    }
}

function onCellSelected(args) {
    console.log('Cell selected:', args.data, args.column.field);
}
</script>
```

### Edit Events (6)

| Event | Use Case |
|-------|----------|
| `onActionBegin` (with requestType='save'/'delete') | Validate before save |
| `onActionComplete` (with requestType='save'/'delete') | React after save/delete |
| `onBeforeEdit` (requestType='beginEdit'/'add') | Before edit mode |
| `onBeforeBatchSave` | Before batch save |
| `onBatchAdd` | Batch add rows |
| `onBatchDelete` | Batch delete rows |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionBegin="onActionBegin"
          onActionComplete="onActionComplete">
    <e-grid-editSettings allowEditing="true" allowDeleting="true" mode="Batch"></e-grid-editSettings>
</ejs-grid>

<script>
function onActionBegin(args) {
    if (args.requestType === 'save') {
        // Validate Freight is positive
        if (args.data.Freight < 0) {
            args.cancel = true;
            alert('Freight must be positive');
        }
    }
}

function onActionComplete(args) {
    if (args.requestType === 'save') {
        console.log('Data saved to server');
    }
}
</script>
```

### Column Events (6)

| Event | Use Case |
|-------|----------|
| `onColumnDragStart` | Column drag-drop |
| `onColumnDrop` | Column dropped |
| `onColumnResizeStart` | Column resize start |
| `onColumnResizeStop` | Column resize end |
| `onColumnReorder` | Column reorder |
| `onColumnDataStateChange` | Column state change (sorting, filtering) |

### Data & State Events (4)

| Event | Use Case |
|-------|----------|
| `onDataStateChange` | Grid state changed (sort, filter, page) |
| `onPdfQueryCellInfo` | Customize PDF export cell |
| `onBeforePdfExport` | Before PDF export |
| `onBeforeExcelExport` | Before Excel export |

---

## Common Event Patterns

### Confirmation Dialog Before Delete

```cshtml
<ejs-grid id="Grid" onActionBegin="onActionBegin">
    <e-grid-editSettings allowDeleting="true"></e-grid-editSettings>
</ejs-grid>

<script>
function onActionBegin(args) {
    if (args.requestType === 'delete') {
        var grid = document.getElementById('Grid').ej2_instances[0];
        if (!confirm('Delete record: ' + args.data[0].OrderID + '?')) {
            args.cancel = true;
        }
    }
}
</script>
```

### Highlight Rows Based on Condition

```cshtml
<ejs-grid id="Grid" onRowDataBound="onRowDataBound">
</ejs-grid>

<script>
function onRowDataBound(args) {
    if (args.data.Freight > 100) {
        args.row.classList.add('high-freight');
    }
}
</script>

<style>
.high-freight {
    background-color: #ffcccc !important;
    font-weight: bold;
}
</style>
```

### Show Toast on Save

```cshtml
<ejs-grid id="Grid" onActionComplete="onActionComplete">
</ejs-grid>

<script>
function onActionComplete(args) {
    if (args.requestType === 'save') {
        // Show toast
        var toastObj = new ej.notifications.Toast
            divContent: 'Record saved successfully!'
        });
        toastObj.show();
    }
}
</script>
