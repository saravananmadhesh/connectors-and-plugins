# Events

## Table of Contents
- [Overview](#overview)
- [Data Events](#data-events)
- [Selection Events](#selection-events)
- [Editing Events](#editing-events)
- [Sorting & Filtering Events](#sorting--filtering-events)
- [Column Events](#column-events)
- [Row Events](#row-events)
- [Export Events](#export-events)
- [State Events](#state-events)
- [Error Events](#error-events)
- [Common Event Patterns](#common-event-patterns)

---

## Overview

TreeGrid events allow you to respond to user actions and component lifecycle stages. Events are handled by setting event handler methods in the tag helper or binding them in JavaScript.

**Event Handler Pattern:**

**In Tag Helper:**
```cshtml
<ejs-treegrid id="TreeGrid" 
    dataSource="ViewBag.DataSource"
    actionComplete="onActionComplete"
    actionFailure="onActionFailure"
    rowSelecting="onRowSelecting">
</ejs-treegrid>
```

**Event Handler Function:**
```javascript
function onActionComplete(args) {
    console.log('Action completed:', args);
}
```

---

## Data Events

### Created
**Fired:** When TreeGrid is created and initialized  
**Purpose:** Perform setup after grid initialization

```javascript
function onCreated(args) {
    console.log('TreeGrid created successfully');
    // Initialize custom plugins, load saved state, etc.
}
```

### ActionBegin
**Fired:** Before CRUD operation or feature execution  
**Purpose:** Pre-process operations, validate data, show loading state

```cshtml
<ejs-treegrid actionBegin="onActionBegin"></ejs-treegrid>
```

```javascript
function onActionBegin(args) {
    // args.requestType: 'save', 'cancel', 'delete', 'add', 'sorting', 'filtering', 'paging'
    if (args.requestType === 'save') {
        console.log('Saving:', args.data);
    }
}
```

### ActionComplete
**Fired:** After CRUD operation or feature execution completes  
**Purpose:** Update UI, log operations, refresh dependent data

```javascript
function onActionComplete(args) {
    // args.requestType: 'save', 'cancel', 'delete', 'add'
    if (args.requestType === 'save') {
        console.log('Data saved successfully');
        showNotification('Record updated');
    }
}
```

### ActionFailure
**Fired:** When operation fails  
**Purpose:** Error handling, show error messages

```javascript
function onActionFailure(args) {
    console.error('Operation failed:', args.error);
    // Handle errors: isPrimaryKey not set, conflicting properties, etc.
    showErrorMessage('An error occurred: ' + args.error);
}
```

### DataBound
**Fired:** After data binding completes  
**Purpose:** Process bound data, calculate summaries, update related UI

```javascript
function onDataBound(args) {
    console.log('Data binding complete');
    // Update status display, calculate totals
}
```

---

## Selection Events

### RowSelecting
**Fired:** Before row selection  
**Purpose:** Validate/prevent selection, conditional logic

```javascript
function onRowSelecting(args) {
    // args.data: row data
    // args.rowIndex: row index
    
    if (args.data.Status === 'Locked') {
        args.cancel = true;  // Prevent selection
    }
}
```

### RowSelected
**Fired:** After row is selected  
**Purpose:** Update UI based on selection, show details

```javascript
function onRowSelected(args) {
    let selectedRow = args.data;
    console.log('Selected:', selectedRow.TaskName);
}
```

### RowDeselecting
**Fired:** Before row deselection  
**Purpose:** Validate deselection

```javascript
function onRowDeselecting(args) {
    if (requiresConfirmation()) {
        args.cancel = true;
    }
}
```

### RowDeselected
**Fired:** After row is deselected  
**Purpose:** Update UI after deselection

```javascript
function onRowDeselected(args) {
    console.log('Deselected:', args.data.TaskName);
    clearDetailPanel();
}
```

### CellSelecting
**Fired:** Before cell selection  
**Purpose:** Prevent certain cells from being selected

```javascript
function onCellSelecting(args) {
    if (args.columnIndex === 0) {
        args.cancel = true;  // Prevent ID column selection
    }
}
```

### CellSelected
**Fired:** After cell is selected  
**Purpose:** Highlight cell, show cell details

```javascript
function onCellSelected(args) {
    console.log('Selected cell value:', args.cell.textContent);
}
```

---

## Editing Events

### BeginEdit
**Fired:** When edit mode starts  
**Purpose:** Initialize edit controls, set focus

```javascript
function onBeginEdit(args) {
    console.log('Editing row:', args.rowData.TaskID);
    // Focus on first edit field
}
```

### EndEdit
**Fired:** When edit mode ends  
**Purpose:** Validate edited data before save

```javascript
function onEndEdit(args) {
    // Validate data
    if (args.data.TaskName.trim() === '') {
        args.cancel = true;
        showError('Task name cannot be empty');
    }
}
```

### CellEdit & QueryCellInfo
**CellEdit Fired:** When a cell is being edited  
**QueryCellInfo Fired:** For each cell when rendering

```javascript
function onCellEdit(args) {
    console.log('Cell editing:', args.value);
}

function onQueryCellInfo(args) {
    if (args.column.field === 'Status' && args.data.Status === 'Complete') {
        args.cell.classList.add('status-complete');
    }
}
```

---

## Sorting & Filtering Events

### ResizeStop
**Fired:** When column resize completes  
**Purpose:** Save column widths, update layout

```javascript
function onResizeStop(args) {
    let columnWidths = args.column.width;
    saveColumnWidths(columnWidths);
}
```
---

## Column Events

### HeaderCellInfo
**Fired:** For each header cell  
**Purpose:** Customize header appearance

```javascript
function onHeaderCellInfo(args) {
    if (args.column.field === 'TaskName') {
        args.headerCell.classList.add('required-column');
    }
}
```

### ColumnDragStart & ColumnDrop
**ColumnDragStart:** When column drag starts - prevent drag for ID column  
**ColumnDrop:** When column is dropped - save new column order

```javascript
function onColumnDragStart(args) {
    if (args.column.field === 'TaskID') {
        args.cancel = true;
    }
}

function onColumnDrop(args) {
    saveColumnOrder();
}
```

---

## Row Events

### RowDataBound
**Fired:** For each row when rendering  
**Purpose:** Apply row-level styling, custom formatting

```javascript
function onRowDataBound(args) {
    if (args.data.IsUrgent) {
        args.row.classList.add('urgent-row');
    }
    
    if (args.data.Progress === 100) {
        args.row.classList.add('completed-row');
    }
}
```

### RowSelected
**Covered in Selection Events**

### Expanding & Expanded & Collapsed
**Expanding:** Before expand - prevent if no children  
**Expanded:** After expand - load additional data  
**Collapsed:** After collapse - cleanup

```javascript
function onExpanding(args) {
    if (!args.data.Children) args.cancel = true;
}

function onExpanded(args) {
    console.log('expanded:', args.data.TaskID);
}

function onCollapsed(args) {
    console.log('collapsed:', args.data.TaskID);
}
```

### RowDragStart & RowDrop
**RowDragStart:** Before drag - prevent locked rows  
**RowDrop:** After drop - persist row order

```javascript
function onRowDragStart(args) {
    if (args.data.IsLocked) args.cancel = true;
}

function onRowDrop(args) {
    persistRowOrder();
}
```

---

## Export Events

### BeforeExcelExport
**Fired:** Before Excel export  
**Purpose:** Modify export content, add headers

```javascript
function onBeforeExcelExport(args) {
    // Customize Excel export
    console.log('Exporting to Excel');
}
```

### ExcelExportComplete
**Fired:** After Excel export completes  
**Purpose:** Show completion message

```javascript
function onExcelExportComplete(args) {
    console.log('Excel export completed');
    showMessage('Excel file downloaded successfully');
}
```

### BeforePdfExport
**Fired:** Before PDF export  
**Purpose:** Customize PDF content

```javascript
function onBeforePdfExport(args) {
    console.log('Exporting to PDF');
}
```

### PdfExportComplete
**Fired:** After PDF export  
**Purpose:** Show completion feedback

```javascript
function onPdfExportComplete(args) {
    showMessage('PDF exported successfully');
}
```

---

## State Events

---

## Error Events

### ActionFailure
**Covered in Data Events**  
**Common Error Scenarios:**
- `isPrimaryKey` not configured for CRUD operations
- Both `childMapping` and `idMapping` enabled
- `Selection` with `rowTemplate`
- `dataSource` or `columns` not provided

```javascript
function onActionFailure(args) {
    if (args.error.message.includes('isPrimaryKey')) {
        console.error('Primary key not configured');
    }
}
```

---

## Common Event Patterns

### Pattern 1: Data Validation on Save
```javascript
function onActionBegin(args) {
    if (args.requestType === 'save') {
        if (!validateRow(args.data)) {
            args.cancel = true;
            showError('Invalid data');
        }
    }
}

function validateRow(data) {
    return data.TaskName && data.TaskName.trim() !== '' && data.Duration > 0;
}
```

### Pattern 2: Error Handling
```javascript
function onActionFailure(args) {
    let errorMsg = args.error.message || 'An error occurred';
    console.error('Error:', errorMsg);
    
    if (errorMsg.includes('isPrimaryKey')) {
        showError('Primary key must be configured for edit operations');
    } else if (errorMsg.includes('dataSource')) {
        showError('Data source is required');
    } else {
        showError(errorMsg);
    }
}
```

---

## Summary

**Key Event Categories:**
- **Data Events:** created, actionBegin, actionComplete, actionFailure, dataBound
- **Selection Events:** rowSelecting, rowSelected, cellSelecting, cellSelected
- **Editing Events:** beginEdit, endEdit, queryCellInfo
- **Row Events:** rowDataBound, Expanding, Expanded, rowDrag, rowDrop
- **Export Events:** beforeExcelExport, beforePdfExport
- **State Events:** dataStateChange
- **Error Events:** actionFailure

**Best Practices:**
- Use `ActionBegin` for pre-operation validation
- Use `ActionComplete` for post-operation updates
- Use `ActionFailure` for comprehensive error handling
- Use `QueryCellInfo` for conditional cell styling
- Use `RowDataBound` for row-level styling
- Save state in `ActionComplete` for persistence
- Prevent invalid operations with `args.cancel = true`

