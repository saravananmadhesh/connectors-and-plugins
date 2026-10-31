---
name: toolbar
description: 'Toolbar in Syncfusion Grid: built-in toolbar items, custom toolbars, event handling, export actions.'
---

# Toolbar

## Table of Contents
- [Overview](#overview)
- [Mandatory Rules](#mandatory-rules)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar](#custom-toolbar)
- [Event Handling](#event-handling)
- [Advanced Toolbar Patterns](#advanced-toolbar-patterns)

## When to Use This Reference

- Add toolbar buttons for grid operations
- Configure built-in toolbar items (Add, Edit, Delete)
- Create custom toolbar buttons with icons
- Handle toolbar button clicks and commands
- Implement context-aware toolbar visibility

## Overview

The toolbar provides quick access to common grid operations like CRUD, export, and custom actions. It supports both built-in items and custom components for enhanced productivity.

---

## Mandatory Rules

### Rule 1: Grid ID is REQUIRED for Toolbar Click Events (Export/Import)

When using toolbar click events to handle export (Excel, PDF) or custom actions, you **MUST** provide an `id` attribute on the Grid instance.

❌ **WRONG** - No ID, toolbar event cannot find the grid:
```ts
const grid = new Grid({
  dataSource: data,
  toolbar: ['ExcelExport', 'PdfExport']
});

grid.appendTo('#grid');
```

✅ **CORRECT** - ID attribute provided:
```ts
import { Grid, Toolbar, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, ExcelExport, PdfExport);

const grid = new Grid({
  id: 'grid',
  dataSource: data,
  toolbar: ['ExcelExport', 'PdfExport'],
  toolbarClick: onToolbarClick
});

grid.appendTo('#grid');
```

---

## Built-in Toolbar Items

### Add Standard Toolbar

```ts
import { Grid, Toolbar, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```

### Available Toolbar Items

```ts
const toolbarItems = [
  'Add',           // Add new record
  'Edit',          // Edit selected record
  'Delete',        // Delete selected record
  'Update',        // Save changes
  'Cancel',        // Cancel editing
  'Search',        // Search box
  'ExcelExport',   // Export to Excel
  'PdfExport',     // Export to PDF
  'CsvExport',     // Export to CSV
  'Print'          // Print grid
];

import { Grid, Toolbar, Edit, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, ExcelExport, PdfExport);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: toolbarItems,
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```

### Edit Toolbar Setup

```ts
import { Grid, Toolbar, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  }
});

grid.appendTo('#grid');
```

---

## Custom Toolbar

### Add Custom Button

```ts
import { Grid, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar);

let gridInstance: Grid;

const customToolbar = [
  'Add',
  'Edit',
  'Delete',
  {
    text: 'Refresh',
    tooltipText: 'Refresh Data',
    prefixIcon: 'e-icons e-refresh',
    id: 'grid-refresh',
    align: 'Right'
  }
];

const toolbarClick = (args: any) => {
  if (args.item.id === 'grid-refresh') {
    gridInstance.refresh();
  }
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: customToolbar,
  toolbarClick: toolbarClick
});

grid.appendTo('#grid');
gridInstance = grid;
```

---

## Event Handling

### Handle Toolbar Click Events

```ts
import { Grid, Toolbar, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit);

let gridInstance: Grid;

const toolbarClick = (args: any) => {
  if (args.item.text === 'Add') {
    console.log('Add button clicked');
  }
  if (args.item.text === 'Delete') {
    console.log('Delete button clicked');
  }
  if (args.item.id === 'grid-search') {
    console.log('Search:', args.value);
  }
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: ['Add', 'Edit', 'Delete', 'Search'],
  toolbarClick: toolbarClick,
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
gridInstance = grid;
```

### Disable Toolbar Items

```ts
import { Grid, Toolbar, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit);

let gridInstance: Grid;

const actionComplete = (args: any) => {
  if (args.requestType === 'save') {
    // Disable delete after save
    gridInstance.toolbarModule.enableItems(['Delete'], false);
  }
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ],
  toolbar: ['Add', 'Edit', 'Delete'],
  actionComplete: actionComplete,
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
gridInstance = grid;
```

### Conditional Toolbar Items

```ts
import { Grid, Toolbar, Edit, ExcelExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, ExcelExport);

const userRole = 'editor'; // 'viewer', 'editor', 'admin'

const getToolbarItems = () => {
  const items = ['Add', 'Edit'];

  if (userRole === 'admin') {
    items.push('Delete');
  }

  items.push('Search', 'ExcelExport');
  return items;
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: getToolbarItems(),
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```

---

## Advanced Toolbar Patterns

### Role-Based Conditional Toolbar

```ts
import { Grid, Toolbar, Edit, ExcelExport, PdfExport } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, ExcelExport, PdfExport);

let userRole = 'viewer'; // 'viewer', 'editor', 'admin'

const getToolbarItems = () => {
  const baseItems = ['Search'];

  if (userRole === 'editor') {
    return ['Add', 'Edit', 'Delete', ...baseItems, 'ExcelExport'];
  }

  if (userRole === 'admin') {
    return ['Add', 'Edit', 'Delete', ...baseItems, 'ExcelExport', 'PdfExport', 'CsvExport'];
  }

  return [...baseItems, 'ExcelExport']; // viewer only
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', format: 'C2' }
  ],
  toolbar: getToolbarItems(),
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  }
});

grid.appendTo('#grid');

// Toggle role for demonstration
document.getElementById('roleSelect')?.addEventListener('change', (e: any) => {
  userRole = e.target.value;
  grid.toolbar = getToolbarItems();
});
```

### Custom Toolbar with State Management

```ts
import { Grid, Toolbar, Edit, ExcelExport, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, ExcelExport, Selection);

let gridInstance: Grid;
let selectedCount = 0;

const customToolbar = [
  {
    text: 'Add Order',
    prefixIcon: 'e-icons e-add-new',
    id: 'custom-add',
    align: 'Left'
  },
  {
    text: 'Delete Selected',
    prefixIcon: 'e-icons e-delete',
    id: 'custom-delete',
    align: 'Left'
  },
  {
    text: 'Refresh Data',
    prefixIcon: 'e-icons e-refresh',
    id: 'custom-refresh',
    align: 'Right'
  },
  {
    text: 'Export',
    prefixIcon: 'e-icons e-export-excel',
    id: 'custom-export',
    align: 'Right'
  }
];

const handleToolbarClick = (args: any) => {
  if (args.item.id === 'custom-add') {
    gridInstance.addRecord();
  } else if (args.item.id === 'custom-delete') {
    const selectedRecords = gridInstance.getSelectedRecords();
    if (selectedRecords.length > 0) {
      gridInstance.deleteRecord(selectedRecords);
    }
  } else if (args.item.id === 'custom-refresh') {
    gridInstance.refresh();
  } else if (args.item.id === 'custom-export') {
    gridInstance.excelExport();
  }
};

const onRecordSelectionChange = (args: any) => {
  selectedCount = gridInstance.getSelectedRowIndexes().length;
  console.log('Selected records:', selectedCount);
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', format: 'C2' }
  ],
  toolbar: customToolbar,
  toolbarClick: handleToolbarClick,
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  rowSelected: onRecordSelectionChange,
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  }
});

grid.appendTo('#grid');
gridInstance = grid;
```

### Toolbar with Styling

```ts
import { Grid, Toolbar, Edit, ExcelExport, PdfExport, Print } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, ExcelExport, PdfExport, Print);

// Custom CSS for toolbar styling
const toolbarStyles = document.createElement('style');
toolbarStyles.textContent = `
  .e-toolbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-bottom: 3px solid #764ba2;
    padding: 12px 20px;
  }

  .e-toolbar .e-btn {
    background-color: white;
    color: #667eea;
    border: 1px solid #667eea;
    border-radius: 4px;
    margin: 0 5px;
    padding: 8px 16px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .e-toolbar .e-btn:hover {
    background-color: #667eea;
    color: white;
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
  }

  .e-toolbar .e-btn.e-active {
    background-color: #667eea;
    color: white;
  }

  .e-toolbar .e-btn-icon {
    margin-right: 6px;
  }

  .e-toolbar-separator {
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0 10px;
  }
`;

document.head.appendChild(toolbarStyles);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', '|', 'ExcelExport', 'PdfExport', 'Print'],
  editSettings: { mode: 'Dialog' }
});

grid.appendTo('#grid');
```
