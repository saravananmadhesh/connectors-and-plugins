# Context Menu

## Table of Contents
- [Overview](#overview)
- [Default Context Menu Items](#default-context-menu-items)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Enable/Disable Items Dynamically](#enabledisable-items-dynamically)
- [Targeting Specific Areas](#targeting-specific-areas)
- [Troubleshooting](#troubleshooting)

## Overview

The TreeGrid has built-in context menu that appears when right-clicking. To enable this feature, inject the `ContextMenu` module and define items in the `contextMenuItems` property.

```typescript
import { TreeGrid, ContextMenu, Page, Sort, Edit, Resize } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(ContextMenu, Page, Sort, Edit, Resize);

let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowSorting: true,
    allowResizing: true,
    allowPaging: true,
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' },
    allowPdfExport: true,
    allowExcelExport: true,
    contextMenuItems: ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save', 'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport'],
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
        { field: 'duration', headerText: 'Duration', width: 100, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

## Default Context Menu Items

| Menu Item | Action | Use Case |
|-----------|--------|----------|
| AutoFit | Auto fit current column | Quick column width adjustment |
| AutoFitAll | Auto fit all columns | Fit entire grid to content |
| Edit | Edit current record | Inline record modification |
| Delete | Delete current record | Remove selected row |
| Save | Save edited record | Confirm changes |
| Cancel | Cancel edit mode | Abandon changes |
| PdfExport | Export as PDF | Generate PDF report |
| ExcelExport | Export as Excel | Export to Excel workbook |
| CsvExport | Export as CSV | Export as CSV file |
| SortAscending | Sort ascending | Sort column A→Z |
| SortDescending | Sort descending | Sort column Z→A |
| FirstPage | Go to first page | Navigate to start |
| PrevPage | Go to previous page | Navigate backward |
| LastPage | Go to last page | Navigate to end |
| NextPage | Go to next page | Navigate forward |
| AddRow | Add new row | Insert record |
| Indent | Indent record | Move to next hierarchy level |
| Outdent | Outdent record | Move to previous hierarchy level |

## Custom Context Menu Items

Create custom menu items with specific actions. Define items in `contextMenuItems` array and handle in `contextMenuClick` event:

```typescript
let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    allowPaging: true,
    contextMenuItems: [
        { text: 'Expand Row', target: '.e-content', id: 'expandrow' },
        { text: 'Collapse Row', target: '.e-content', id: 'collapserow' }
    ],
    contextMenuClick: (args?: MenuEventArgs) => {
        if (args.item.id === 'expandrow') {
            let rowElement = treeGridObj.getSelectedRows()[0] as HTMLTableRowElement;
            treeGridObj.expandRow(rowElement);
        } else if (args.item.id === 'collapserow') {
            let rowElement = treeGridObj.getSelectedRows()[0] as HTMLTableRowElement;
            treeGridObj.collapseRow(rowElement);
        }
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Key properties:**
- `text`: Display label in menu
- `target`: CSS selector for where menu appears (.e-content for row area)
- `id`: Unique identifier for item

## Enable/Disable Items Dynamically

Control menu items visibility based on conditions using `contextMenuOpen` event:

```typescript
let treeGridObj: TreeGrid = new TreeGrid({
    dataSource: sampleData,
    childMapping: 'subtasks',
    editSettings: { allowEditing: true, allowDeleting: true, mode: 'Row' },
    contextMenuItems: [
        { text: 'Edit Record', target: '.e-content', id: 'edit_record' },
        { text: 'Delete Record', target: '.e-content', id: 'delete_record' }
    ],
    contextMenuClick: (args?: MenuEventArgs) => {
        if (args.item.id === 'edit_record') {
            treeGridObj.startEdit(args.rowInfo.row);
        } else if (args.item.id === 'delete_record') {
            treeGridObj.deleteRecord(args.rowInfo.row);
        }
    },
    contextMenuOpen: (args?: BeforeOpenCloseEventArgs) => {
        let rowData = args.rowInfo.rowData;
        // Disable edit if parent record
        if (rowData.hasChildRecords) {
            treeGridObj.grid.contextMenuModule.contextMenu.enableItems(['Edit Record'], false);
            treeGridObj.grid.contextMenuModule.contextMenu.enableItems(['Delete Record'], true);
        } else {
            treeGridObj.grid.contextMenuModule.contextMenu.enableItems(['Edit Record'], true);
            treeGridObj.grid.contextMenuModule.contextMenu.enableItems(['Delete Record'], false);
        }
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
        { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
        { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
    ]
});

treeGridObj.appendTo('#TreeGrid');
```

Use `enableItems()` method to toggle menu item availability. Pass `true` to enable, `false` to disable.

## Targeting Specific Areas

Menu can appear for different click targets. Use `target` property on menu items:

```typescript
contextMenuItems: [
    { text: 'Header Option', target: '.e-headercell', id: 'header_action' },
    { text: 'Row Option', target: '.e-rowcell', id: 'row_action' },
    { text: 'Content Option', target: '.e-content', id: 'content_action' }
]
```

**Target selectors:**
- `.e-headercell`: Appears when right-clicking header
- `.e-rowcell`: Appears when right-clicking data cells
- `.e-content`: Appears anywhere in content area
- Omit `target`: Menu appears everywhere (global)

## Troubleshooting

**Q: Context menu not appearing**
- Verify `ContextMenu` module is injected via `TreeGrid.Inject()`
- Ensure `contextMenuItems` array is populated
- Check browser console for errors

**Q: Custom menu items not executing**
- Verify item `id` matches condition in `contextMenuClick` handler
- Ensure `TreeGridHelper` and `MenuEventArgs` are imported correctly
- Check that row/cell is actually selected before right-click

**Q: Menu items showing when shouldn't be visible**
- Use `contextMenuOpen` event to conditionally hide/show via `enableItems()`
- Verify `args.cancel = true` for conditions requiring no menu display
