# Advanced Features

## When to Use This Reference

**Read this file when you need to:**
- Print TreeGrid data with custom formatting or specific columns
- Add custom toolbar buttons or manage toolbar visibility
- Implement clipboard operations (copy/paste) for bulk data handling
- Enable state persistence to save user preferences between sessions
- Combine multiple advanced features in one grid

## Table of Contents
- [Print](#print)
- [Toolbar](#toolbar)
- [Clipboard Operations](#clipboard-operations)
- [State Persistence](#state-persistence)

## Print

Print TreeGrid data with customizable options. Inject `Print` module and set `printMode` to control printing scope.

```typescript
import { TreeGrid, Toolbar, Print } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Toolbar, Print);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Print'],
    printMode: 'All',  // Print all records
    height: 265,
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
        { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Print Current Page Only

Set `printMode: 'CurrentPage'` to print only visible page when paging enabled:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Print'],
    printMode: 'CurrentPage',
    allowPaging: true,
    pageSettings: { pageSize: 8 },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

### Print via External Button

Invoke `print()` method on button click:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let printBtn = new Button();
printBtn.appendTo('#print');

document.getElementById('print').addEventListener('click', () => {
    treeGridObj.print();
});
```

### Show/Hide Columns While Printing

Use `toolbarClick` and `printComplete` events to toggle column visibility:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Print'],
    toolbarClick: function(args) {
        if (args.item.text === 'Print') {
            let cols = this.grid.columns;
            cols.forEach((col, idx) => {
                if (col.field === 'duration') col.visible = true;
                if (col.field === 'startDate') col.visible = false;
            });
        }
    },
    printComplete: function(args) {
        let cols = this.grid.columns;
        cols.forEach((col, idx) => {
            if (col.field === 'duration') col.visible = false;
            if (col.field === 'startDate') col.visible = true;
        });
    },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

**Limitations:**
- Large datasets print all rows, may freeze browser - use CSV/PDF export instead
- Page setup configurable via browser print dialog only

## Toolbar

Add pre-built and custom toolbar items to TreeGrid. Inject `Toolbar` module and define `toolbar` property.

```typescript
import { TreeGrid, Toolbar, Edit, Selection } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Toolbar, Edit, Selection);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'Print'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

### Built-in Toolbar Items

| Item | Action |
|------|--------|
| ExpandAll | Expand all rows |
| CollapseAll | Collapse all rows |
| Add | Add new row |
| Edit | Edit selected row |
| Update | Save changes |
| Delete | Delete selected row |
| Cancel | Cancel editing |
| Search | Show search box |
| Print | Print grid |
| ExcelExport | Export to Excel |
| PdfExport | Export to PDF |
| WordExport | Export to Word |
| Indent | Indent record level |
| Outdent | Outdent record level |

### Custom Toolbar Items

Define custom toolbar buttons with `text`, `id`, and `align` properties:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    toolbar: [
        'Add',
        { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'toolbarfilter', align: 'Right' },
        { text: 'Export', id: 'export', prefixIcon: 'e-icons e-export', align: 'Right' }
    ],
    toolbarClick: (args) => {
        if (args.item.id === 'toolbarfilter') {
            treeGridObj.filterByColumn('taskName', 'startswith', 'Testing');
        }
        if (args.item.id === 'export') {
            alert('Custom export action');
        }
    },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

### Enable/Disable Toolbar Items

Use `enableItems()` method to control toolbar availability:

```typescript
let enableBtn = new Button({}, '#enable');
let disableBtn = new Button({}, '#disable');

enableBtn.element.onclick = () => {
    let itemIds = [treeGridObj.element.id + '_gridcontrol_QuickFilter', treeGridObj.element.id + '_gridcontrol_ClearFilter'];
    treeGridObj.toolbarModule.enableItems(itemIds, true);
};

disableBtn.element.onclick = () => {
    let itemIds = [treeGridObj.element.id + '_gridcontrol_QuickFilter', treeGridObj.element.id + '_gridcontrol_ClearFilter'];
    treeGridObj.toolbarModule.enableItems(itemIds, false);
};
```

## Clipboard Operations

Copy/paste grid data via keyboard shortcuts or programmatic methods.

### Keyboard Shortcuts

- `Ctrl + C` - Copy selected rows/cells
- `Ctrl + Shift + H` - Copy with headers
- `Ctrl + V` - Paste data

```typescript
import { TreeGrid, Selection, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Selection, Page);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSelection: true,
    selectionSettings: { type: 'Multiple', mode: 'Row' },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

### Copy via Button

Use `copy()` method to copy selected data:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let copyBtn = new Button();
copyBtn.appendTo('#copy');

document.getElementById('copy').addEventListener('click', () => {
    treeGridObj.copy();  // Copy without header
});

let copyHeaderBtn = new Button();
copyHeaderBtn.appendTo('#copyHeader');

document.getElementById('copyHeader').addEventListener('click', () => {
    treeGridObj.copy(true);  // Copy with header
});
```

### Copy Hierarchy Modes

Control which records copy when hierarchy selected via `copyHierarchyMode`:

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    copyHierarchyMode: 'Parent',  // Parent, Child, Both, None
    allowSelection: true,
    selectionSettings: { type: 'Multiple', mode: 'Row' },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

**Hierarchy Modes:**
- `Parent` - Copy selected records + parents
- `Child` - Copy selected records + children
- `Both` - Copy selected records + parents + children
- `None` - Copy only selected records

### AutoFill Feature

Enable drag-to-fill pattern for cells in batch edit mode:

```typescript
import { TreeGrid, Edit, Toolbar, Selection } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Edit, Toolbar, Selection);

let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    enableAutoFill: true,
    editSettings: { allowEditing: true, mode: 'Batch' },
    selectionSettings: { type: 'Multiple', mode: 'Cell', cellSelectionMode: 'Box' },
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

**AutoFill Requirements:**
- `enableAutoFill: true`
- Selection mode `Cell` with `cellSelectionMode: 'Box'`
- Batch editing enabled

## State Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Save TreeGrid state (column order, sorting, filtering, paging) to browser localStorage. Enable with `enablePersistence: true`.

```typescript
let treeGridObj = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    enablePersistence: true,  // Auto-save state
    allowSorting: true,
    allowFiltering: true,
    allowPaging: true,
    columns: [/* columns */]
});

treeGridObj.appendTo('#TreeGrid');
```

### Get Persisted State

Access stored state via `window.localStorage`:

```typescript
let savedState = window.localStorage.getItem('treegridTreeGrid');
let gridModel = JSON.parse(savedState);
console.log('Sorted columns:', gridModel.sortSettings);
console.log('Filtered columns:', gridModel.filterSettings);
```

### Set Persisted State

Update localStorage directly:

```typescript
let newModel = {
    sortSettings: [{ field: 'taskID', direction: 'Ascending' }],
    pageSettings: { currentPage: 2 },
    columns: gridColumns
};

window.localStorage.setItem('treegridTreeGrid', JSON.stringify(newModel));
```

**Note:** localStorage key format is: `componentNameComponentId` (e.g., `treegridTreeGrid` for component with id `TreeGrid`).

**Persisted Properties:**
- Column order and visibility
- Sorting settings
- Filter settings
- Current page
- Search text

