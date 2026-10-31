# Context Menu in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Built-in Context Menu](#built-in-context-menu)
- [Custom Context Menu](#custom-context-menu)
- [Event Handling](#event-handling)
- [Programmatic Trigger](#programmatic-trigger)

## When to Use This Reference

- Add right-click context menus for grid cells and rows
- Provide quick access to common grid operations
- Customize menu items for specific data types
- Handle context menu selection and item clicks
- Implement conditional menu items based on row data

## Overview

Context menu provides quick access to common operations when right-clicking on grid cells, rows, headers, or grid body. The context menu feature allows you to:
- Access built-in operations like copy, edit, delete, and export
- Create custom menu items tailored to your application
- Handle menu item clicks with custom logic
- Show/hide menu items conditionally based on context
- Display submenus for organized command grouping

## Built-in Context Menu

### Enable Context Menu

```ts
import { Grid, Column, ContextMenu, Page, Sort, Filter } from '@syncfusion/ej2-grids';

const data: object[] = window.gridData;

const grid: Grid = new Grid({
  dataSource: data,
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  contextMenuItems: ['Copy', 'ExcelExport', 'PdfExport', 'Edit', 'Delete'],
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2', textAlign: 'Right' }
  ]
});

grid.appendTo('#Grid');

new ContextMenu({}); // injected automatically via services
```

### Built-in Menu Items

The Grid provides several built-in context menu items that can be used out-of-the-box:

```ts
const contextMenuItems: string[] = [
  'Copy',              // Copy selected cells
  'CopyWithHeader',    // Copy selected cells with column headers
  'ExcelExport',       // Export selection to Excel
  'PdfExport',         // Export selection to PDF
  'CsvExport',         // Export selection to CSV
  'Edit',              // Edit selected row
  'Delete',            // Delete selected row
  'Save',              // Save edited row
  'Cancel'             // Cancel editing
];

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems,
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  columns: [/* ... */],
  contextMenuClick: onContextMenuClick
});

grid.appendTo('#Grid');
```

## Custom Context Menu

### Add Custom Menu Items

You can create custom context menu items with personalized actions:

```ts
const customContextMenu: object[] = [
  {
    text: 'Copy',
    target: '.e-gridcontent',
    id: 'grid-copy'
  },
  {
    text: 'View Details',
    target: '.e-gridcontent',
    id: 'grid-details'
  },
  {
    text: 'Send Email',
    target: '.e-gridcontent',
    id: 'grid-email'
  },
  {
    text: 'Generate Report',
    target: '.e-gridcontent',
    id: 'grid-report'
  }
];

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems: customContextMenu,
  columns: [/* ... */],
  contextMenuClick: (args: any) => {
    if (args.item.id === 'grid-copy') {
      grid.copyRows();
    }
  }
});

grid.appendTo('#Grid');
```

### Context Menu with Icons

Enhance menu items with visual icons for better user experience:

```ts
const contextMenuItems: object[] = [
  {
    text: 'Copy',
    iconCss: 'e-icons e-copy',
    target: '.e-gridcontent',
    id: 'grid-copy'
  },
  {
    text: 'Edit',
    iconCss: 'e-icons e-edit',
    target: '.e-gridcontent',
    id: 'grid-edit'
  },
  {
    text: 'Delete',
    iconCss: 'e-icons e-delete',
    target: '.e-gridcontent',
    id: 'grid-delete'
  }
];

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems,
  editSettings: { allowEditing: true, allowDeleting: true },
  contextMenuClick: customClick,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

### Submenu Items

Organize context menu items into submenus for better structure:

```ts
const contextMenuItems: object[] = [
  {
    text: 'Export',
    id: 'grid-export',
    items: [
      { text: 'Excel', id: 'grid-excel' },
      { text: 'PDF', id: 'grid-pdf' },
      { text: 'CSV', id: 'grid-csv' }
    ]
  },
  {
    text: 'Tools',
    id: 'grid-tools',
    items: [
      { text: 'Sort', id: 'grid-sort' },
      { text: 'Filter', id: 'grid-filter' }
    ]
  }
];

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems,
  columns: [/* ... */],
  contextMenuClick: (args: any) => {
    switch (args.item.id) {
      case 'grid-excel':
        grid.excelExport();
        break;
      case 'grid-pdf':
        grid.pdfExport();
        break;
      case 'grid-csv':
        grid.csvExport();
        break;
      case 'grid-sort':
        // Handle sort action
        break;
      case 'grid-filter':
        // Handle filter action
        break;
    }
  }
});

grid.appendTo('#Grid');
```

## Event Handling

### Handle Context Menu Click

Execute custom logic when users click on context menu items:

```ts
function onContextMenuClick(args: any): void {
  if (args.item.id === 'grid-copy') {
    // Custom copy logic
    console.log('Copying selected data...');
    grid.copyRows();
  }

  if (args.item.id === 'grid-details') {
    // Show details dialog
    const selectedRecords: object[] = grid.getSelectedRecords();
    if (selectedRecords.length > 0) {
      showDetailsDialog(selectedRecords[0]);
    }
  }

  if (args.item.id === 'grid-email') {
    // Send email logic
    const selectedRecords: object[] = grid.getSelectedRecords();
    if (selectedRecords.length > 0) {
      sendEmailTo((selectedRecords[0] as any).CustomerID);
    }
  }
}

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems: customMenu,
  contextMenuClick: onContextMenuClick,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

### Context Menu Before Open

Control menu visibility and behavior before the context menu opens:

```ts
function onContextMenuBeforeOpen(args: any): void {
  console.log('Context menu opening at:', args.top, args.left);

  const selectedRows: number[] = grid.getSelectedRows();
  const hasSelection: boolean = selectedRows.length > 0;

  // Conditionally show/hide items based on selection
  // args.items = args.items.filter(item => 
  //   item.id !== 'grid-delete' || hasSelection
  // );
}

const grid: Grid = new Grid({
  dataSource: data,
  contextMenuItems: contextMenuItems,
  beforeOpen: onContextMenuBeforeOpen,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

## Programmatic Trigger

Trigger the context menu programmatically from code:

```ts
const gridRef: Grid = grid; // Grid instance from scope

document.getElementById('openMenu')?.addEventListener('click', (e: MouseEvent): void => {
  // Create pseudo event based on desired position
  const event: MouseEvent = new MouseEvent('contextmenu', {
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 100
  });

  // Trigger context menu at specified position
  grid.contextMenuModule.contextMenu.show(event);
});
```

## Notes

- Include `ContextMenu` service in the `Grid` initialization via `new Grid(...)` or `inject` when using frameworks that support dependency injection.
- For Excel/PDF/CSV exports, include `ExcelExport`, `PdfExport`, or `CsvExport` services.
- Context menu items can be targeted to specific areas using `target` property (e.g., '.e-gridcontent', '.e-headercell').
- Use `id` property to uniquely identify each menu item for event handling.
- Apply custom styling using `iconCss` property with Syncfusion icon classes.
- Use `beforeOpen` event to dynamically show/hide menu items based on current grid state.
- Menu items can have nested submenu items using the `items` array property.
