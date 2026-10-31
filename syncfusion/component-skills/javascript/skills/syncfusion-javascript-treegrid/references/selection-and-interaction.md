# TreeGrid Selection & Interaction

## When to Use This Reference

Read this reference when you need to:
- Enable single or multiple row/cell selection in TreeGrid
- Implement checkbox-based selection with header select-all option
- Get selected rows or cells programmatically after user interaction
- Perform conditional selection based on data values
- Toggle selection on-off per row (enable/disable click behavior)
- Select specific rows at initial render using selectedRowIndex
- Handle Touch interactions (mobile/tablet selection with popups)
- Use selection in event handlers (rowSelected, cellSelected events)
- Implement selection-based bulk actions (delete, archive, etc.)
- Distinguish between Row, Cell, and Both selection modes

---

## Table of Contents

- [Selection Types](#selection-types)
- [Selection Modes](#selection-modes)
- [Row Selection](#row-selection)
- [Cell Selection](#cell-selection)
- [Checkbox Selection](#checkbox-selection)
- [Programmatic Selection](#programmatic-selection)
- [Toggle Selection](#toggle-selection)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Selection Types

Define whether TreeGrid allows single or multiple selections.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

// Single selection (default)
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: { type: 'Single' },  // Only one row/cell at a time
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Multiple selection
const treeGridObj2 = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  selectionSettings: { type: 'Multiple' },
  // Use Ctrl+Click or Shift+Click to select multiple rows
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width:200 }
  ]
});
treeGridObj2.appendTo('#TreeGrid');
```

**Type Behaviors:**
- `Single` - Only one row/cell selected at a time (default)
- `Multiple` - Multiple selections via Ctrl+Click (individual) or Shift+Click (range)

---

## Selection Modes

Define what gets selected: rows, cells, or both.

```typescript
// Row selection (entire rows highlighted)
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  selectionSettings: { mode: 'Row', type: 'Multiple' },
  // ... columns
});

// Cell selection (only individual cells)
const treeGridObj2 = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  selectionSettings: { mode: 'Cell', type: 'Multiple' },
  // Ctrl+Click or Shift+Click for multiple cells
  // ... columns
});

// Both row and cell selection
const treeGridObj3 = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  selectionSettings: { mode: 'Both', type: 'Multiple' },
  // Can select rows and cells independently
  // ... columns
});
```

**Mode Behaviors:**
- `Row` - Select entire rows (highlight full row)
- `Cell` - Select only individual cells (no row highlight)
- `Both` - Select rows and cells independently

---

## Row Selection

Select or retrieve selected rows programmatically.

### Initial Row Selection

Pre-select a row when grid loads:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  selectedRowIndex: 1,  // Select row at index 1 on load
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

### Get Selected Rows

Retrieve selected row data after user selects:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  rowSelected: (args: RowSelectEventArgs) => {
    const selectedIndexes = treeGridObj.getSelectedRowIndexes();  // Array: [0, 2, 5]
    const selectedRecords = treeGridObj.getSelectedRecords();    // Array of data objects
    console.log('Selected indexes:', selectedIndexes);
    console.log('Selected records:', selectedRecords);
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

### Conditional Row Selection  

Select multiple rows based on data criteria at initialization:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  dataBound: () => {
    // Find and select rows where taskID is 3 or 5
    const rowIndexes = [];
    projectData.forEach((data, index) => {
      if (data.taskID === 3 || data.taskID === 5) {
        rowIndexes.push(index);
      }
    });
    treeGridObj.selectRows(rowIndexes);
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

---

## Cell Selection

Select individual cells with different selection patterns.

### Cell Selection Modes

```typescript
// Flow mode: Select continuous range across row boundaries
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Cell',
    cellSelectionMode: 'Flow'  // Default: flows across rows
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Box mode: Select rectangular box within columns
const treeGridObj2 = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Cell',
    cellSelectionMode: 'Box'  // Rectangular selection only
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj2.appendTo('#TreeGrid');
```

---

## Checkbox Selection

Enable checkbox column for row selection with select-all header option.

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row'
  },
  columns: [
    { type: 'checkbox', width: 50 },  // Checkbox column (auto-positioned first)
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

**Checkbox Features:**
- Header checkbox: Auto-select/deselect all rows in current page
- Child hierarchy: Selecting parent auto-selects/deselects children (if hierarchical)
- Programmatic control: Use `selectRows()`, `selectAll()`, `deselectAll()` methods
- Multi-page: Selection resets per page (unless using state management)

---

## Programmatic Selection

Control selection via code (after grid renders).

```typescript
// Select single row by index
treeGridObj.selectRow(0);

// Select multiple rows by array of indexes
treeGridObj.selectRows([0, 2, 4]);

// Get selected row indexes
const selectedIndexes = treeGridObj.getSelectedRowIndexes();  // [0, 2, 4]

// Get selected row records (actual data objects)
const selectedData = treeGridObj.getSelectedRecords();

// Select all rows
treeGridObj.selectAll();

// Deselect all rows
treeGridObj.deselectAll();

// Clear selection using clearSelection()
treeGridObj.clearSelection();
```

---

## Toggle Selection

Enable/disable toggle behavior: clicking selected row again deselects it.

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: {
    type: 'Multiple',
    enableToggle: true  // Click selected row to deselect
  },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');
```

**Toggle Behavior:**
- First click: Selects row
- Second click on same row: Deselects it
- With Type='Multiple': Toggles just that row, preserves other selections

---

## Common Patterns

### Pattern: Bulk Actions on Selected Rows

Perform delete/archive on all selected rows:

```typescript
const treeGridObj = new TreeGrid({
  dataSource: projectData,
  childMapping: 'subtasks',
  height: 270,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  columns: [
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Delete selected rows via button click
document.getElementById('deleteBtn').onclick = () => {
  const selectedRecords = treeGridObj.getSelectedRecords();
  
  if (selectedRecords.length === 0) {
    alert('No rows selected');
    return;
  }
  
  // Remove from data source
  selectedRecords.forEach((record: any) => {
    const index = projectData.indexOf(record);
    if (index > -1) {
      projectData.splice(index, 1);
    }
  });
  
  treeGridObj.refresh();
  treeGridObj.clearSelection();
};
```

### Pattern: Parent-Child Automatic Selection

When selecting parent row, children auto-select (hierarchical data):

```typescript
const treeGridObj = new TreeGrid({
  dataSource: hierarchicalProjectData,  // Data with parent-child relationships
  childMapping: 'children',              // Points to child array
  height: 270,
  selectionSettings: {
    type: 'Multiple',
    mode: 'Row'
  },
  columns: [
    { type: 'checkbox', width: 50 },    // Checkbox handles hierarchy
    { field: 'taskID', headerText: 'ID', width: 70 },
    { field: 'taskName', headerText: 'Task', width: 200 }
  ]
});
treeGridObj.appendTo('#TreeGrid');

// Selecting parent checkbox auto-selects all children
// TreeGrid handles this automatically - no custom code needed
```

---

## Troubleshooting

**Q: Checkboxes not appearing?**  
A: Ensure column type is 'checkbox': `{ type: 'checkbox', width: 50 }`. Place first in columns array.

**Q: Multi-select not working (Ctrl+Click not selecting)?**  
A: Verify `selectionSettings.type: 'Multiple'` is set. Use Ctrl+Click for individual rows, Shift+Click for ranges.

**Q: Selected rows not persisting after paging?**  
A: Paging resets selection per page. Store selected IDs in external variable and reselect after page change in `actionComplete` event.

**Q: Toggle selection not working?**  
A: Enable with `selectionSettings.enableToggle: true`. Works with both Single and Multiple types.

**Q: Checkbox header (select all) not visible?**  
A: Ensure checkbox column is first: `{ type: 'checkbox', width: 50 }` comes before other columns.
