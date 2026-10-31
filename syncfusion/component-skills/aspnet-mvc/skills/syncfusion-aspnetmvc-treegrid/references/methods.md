# Methods

## Table of Contents
- [Overview](#overview)
- [Data Methods](#data-methods)
- [Selection Methods](#selection-methods)
- [Editing Methods](#editing-methods)
- [Export Methods](#export-methods)
- [Column Methods](#column-methods)
- [Row Methods](#row-methods)
- [Utility Methods](#utility-methods)
- [Common Method Patterns](#common-method-patterns)

---

## Overview

TreeGrid methods allow programmatic control over grid behavior, data manipulation, selection, editing, and export operations. Methods are called on the TreeGrid instance using `ej2_instances['TreeGrid'].methodName()`.

**Getting TreeGrid Instance:**
```javascript
let treeGridInstance = ej2_instances['TreeGrid'];
// OR via element
let treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
```

---

## Data Methods

### Refresh
**Purpose:** Refresh the entire TreeGrid with current data

```javascript
treeGridInstance.refresh();
```

**Use Case:** After server-side data changes

### GetDataRows
**Purpose:** Get all visible data rows

```javascript
let allRows = treeGridInstance.getDataRows();
```

### ClearSorting
**Purpose:** Clear all sort columns

```javascript
treeGridInstance.clearSorting();
```

### ClearFiltering
**Purpose:** Clear all filter criteria

```javascript
treeGridInstance.clearFiltering();
```

---

## Selection Methods

### SelectRow
**Purpose:** Select specific row(s)

```javascript
treeGridInstance.selectRow(2);  // Select single row
treeGridInstance.selectRow([1, 2, 3]);  // Select multiple rows
```

### SelectCell
**Purpose:** Select specific cell(s)

```javascript
// Select single cell at row 1, column 0
treeGridInstance.selectCell({ rowIndex: 1, cellIndex: 0 });

// Select multiple cells
treeGridInstance.selectCell([
  { rowIndex: 1, cellIndex: 0 },
  { rowIndex: 2, cellIndex: 1 }
]);
```

### GetSelectedRowIndexes
**Purpose:** Get array of selected row indexes

```javascript
let selectedRows = treeGridInstance.getSelectedRowIndexes();
console.log(selectedRows);  // [0, 2, 4]
```

### GetSelectedRowCellIndexes
**Purpose:** Get selected row and cell indexes

```javascript
let selected = treeGridInstance.getSelectedRowCellIndexes();
console.log(selected);  // [{ rowIndex: 1, cellIndex: 0 }, ...]
```

---

## Editing Methods

### StartEdit
**Purpose:** Start edit mode for row

```javascript
treeGridInstance.startEdit();  // Edit currently selected row
treeGridInstance.startEdit(2);  // Edit row at index 2
```

### EndEdit
**Purpose:** Exit edit mode and save changes

```javascript
treeGridInstance.endEdit();
```

### CloseEdit
**Purpose:** Exit edit mode without saving

```javascript
treeGridInstance.closeEdit();
```

### AddRecord
**Purpose:** Add new record

```javascript
// Add to end
treeGridInstance.addRecord({ TaskID: 10, TaskName: 'New Task' });

// Add at specific index
treeGridInstance.addRecord({ TaskID: 10, TaskName: 'New Task' }, 2);

// Add as child of row 1
treeGridInstance.addRecord({ TaskID: 10, TaskName: 'Sub Task' }, 1);
```

### UpdateRow
**Purpose:** Update specific row

```javascript
treeGridInstance.updateRow(1, { TaskName: 'Updated Name', Duration: 50 });
```

### DeleteRow
**Purpose:** Delete specific row

```javascript
treeGridInstance.deleteRow(2);  // Delete row at index 2
```

### DeleteRecord
**Purpose:** Delete record by primary key

```javascript
treeGridInstance.deleteRecord('key1', 'TaskID');
```

### Copy
**Purpose:** Copy selected rows/cells to clipboard

```javascript
treeGridInstance.copy();
```

### Paste
**Purpose:** Paste clipboard data

```javascript
treeGridInstance.paste();
```

---

## Export Methods

### ExcelExport
**Purpose:** Export TreeGrid to Excel file

```javascript
// Basic export
treeGridInstance.excelExport();

// With custom options
treeGridInstance.excelExport({
  fileName: 'TreeGrid.xlsx',
  hierarchyExportMode: 'All'
});
```

### PdfExport
**Purpose:** Export TreeGrid to PDF

```javascript
// Basic export
treeGridInstance.pdfExport();

// With options
treeGridInstance.pdfExport({
  fileName: 'TreeGrid.pdf',
  orientation: 'Portrait',
  pageSize: 'A4'
});
```

### Print
**Purpose:** Print TreeGrid

```javascript
treeGridInstance.print();
```

### CsvExport
**Purpose:** Export TreeGrid as CSV

```javascript
treeGridInstance.csvExport({
  fileName: 'TreeGrid.csv'
});
```

---

## Column Methods

### HideColumns
**Purpose:** Hide column(s)

```javascript
treeGridInstance.hideColumns('TaskName');  // Hide by field
treeGridInstance.hideColumns([1, 2]);  // Hide by column indexes
```

### ShowColumns
**Purpose:** Show hidden column(s)

```javascript
treeGridInstance.showColumns('TaskName');
treeGridInstance.showColumns([1, 2]);
```

### GetVisibleColumns
**Purpose:** Get list of visible columns

```javascript
let visibleCols = treeGridInstance.getVisibleColumns();
```

### GetColumns
**Purpose:** Get all column definitions

```javascript
let columns = treeGridInstance.getColumns();
```

### ReorderColumns
**Purpose:** Reorder columns

```javascript
treeGridInstance.reorderColumns(['Duration', 'TaskName', 'StartDate']);
```

---

## Row Methods

### ExpandRow
**Purpose:** Expand parent row to show children

```javascript
treeGridInstance.expandRow(document.getElementById('grid_row_1'));
// OR by row index
treeGridInstance.expandRow(1);
```

### CollapseRow
**Purpose:** Collapse parent row to hide children

```javascript
treeGridInstance.collapseRow(1);
```

### ExpandAll
**Purpose:** Expand all parent rows

```javascript
treeGridInstance.expandAll();
```

### CollapseAll
**Purpose:** Collapse all parent rows

```javascript
treeGridInstance.collapseAll();
```

### ReorderRows
**Purpose:** Reorder rows (drag-drop)

```javascript
treeGridInstance.reorderRows([0, 2], 1);
```

## Utility Methods

### Search
**Purpose:** Search TreeGrid data

```javascript
treeGridInstance.search('search text');
```
---

## Common Method Patterns

### Pattern 1: Selection & Export
```javascript
// Select rows
treeGridInstance.selectRow([1, 2, 3]);
let selectedRows = treeGridInstance.getSelectedRowIndexes();

// Export
treeGridInstance.excelExport({ fileName: 'Export.xlsx' });
treeGridInstance.pdfExport();

// Hierarchy
treeGridInstance.expandAll();
treeGridInstance.collapseAll();
```

---

## Summary

**Key Takeaways:**
- Access methods via TreeGrid instance: `ej2_instances['TreeGrid'].methodName()`
- Data methods: refresh
- Selection methods: selectRow, selectCell, getSelectedRowIndexes
- Editing methods: startEdit, addRecord, updateRow, deleteRow
- Export methods: excelExport, pdfExport, print, csvExport
- Column methods: hideColumns, showColumns
- Row methods: expandRow, collapseRow, expandAll, collapseAll

**Best Practices:**
- Call `refresh()` after bulk data changes
- Validate data before `addRecord()` or `updateRow()`
- Combine methods for complex workflows (select → export → clear state)

