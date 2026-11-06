# TreeGrid Methods

## Table of Contents
- [Overview](#overview)
- [Method Categories](#method-categories)
- [Method Usage Examples](#method-usage-examples)

## Overview

TreeGrid methods provide programmatic access to perform actions on the TreeGrid component after initialization. Use them to manipulate data, control editing, select rows/cells, sort/filter, navigate pages, export, refresh, manage columns, and access configuration.

## Method Categories

### Data Manipulation (Add, Edit, Delete)

| Method | Parameters | Purpose |
|--------|------------|---------|
| **addRecord** | data?, index?, position? | Add new record(s) |
| **deleteRecord** | fieldName?, data? | Delete record |
| **deleteRow** | tr | Delete row element |
| **setRowData** | key, rowData? | Update row data |
| **updateRow** | index, data | Update row by index |
| **updateCell** | rowIndex, field, value | Update cell value |
| **setCellValue** | key, field, value | Update cell by key |

---

### Row Access & Info

| Method | Parameters | Returns | Purpose |
|--------|------------|---------|---------|
| **getRows** | - | HTMLTableRowElement[] | All rows |
| **getRowByIndex** | index | Element | Row by index |
| **getDataRows** | - | Element[] | Data rows only |
| **getRowInfo** | target | RowInfo | Row metadata |
| **getCurrentViewRecords** | - | Object[] | Visible records |
| **getVisibleRecords** | - | Object[] | Visible with expansion state |

---

### Column Operations

| Method | Parameters | Purpose |
|--------|------------|---------|
| **getColumns** | isRefresh? | Get all columns |
| **getColumnByField** | field | Get by field name |
| **getColumnByUid** | uid | Get by UID |
| **getColumnFieldNames** | - | Get all field names |
| **getVisibleColumns** | - | Get visible only |
| **getColumnIndexByField** | field | Get column index |
| **showColumns** | keys, showBy? | Show hidden |
| **hideColumns** | keys, hideBy? | Hide columns |
| **autoFitColumns** | fieldNames? | Auto-fit widths |
| **refreshColumns** | refreshUI? | Refresh definitions |
| **reorderColumns** | fromFName, toFName | Reorder |

---

### Selection & Checking

| Method | Parameters | Purpose |
|--------|------------|---------|
| **selectRow** | index, isToggle? | Select row by index |
| **selectRows** | rowIndexes | Select multiple rows |
| **selectCell** | cellIndex, isToggle? | Select cell |
| **getSelectedRecords** | - | Get selected data |
| **getSelectedRowIndexes** | - | Get selected indices |
| **getSelectedRows** | - | Get selected elements |
| **clearSelection** | - | Clear all selections |
| **selectCheckboxes** | indexes | Select by checkbox |
| **getCheckedRecords** | - | Get checked records |
| **getCheckedRowIndexes** | - | Get checked indices |

---

### Expand/Collapse

| Method | Parameters | Purpose |
|--------|------------|---------|
| **expandAll** | - | Expand all rows |
| **collapseAll** | - | Collapse all rows |
| **expandRow** | row, record?, key?, level? | Expand specific row |
| **collapseRow** | row, record?, key? | Collapse specific row |
| **expandByKey** | key | Expand by primary key |
| **collapseByKey** | key | Collapse by primary key |
| **expandAtLevel** | level | Expand at level |
| **collapseAtLevel** | level | Collapse at level |

---

### Editing

| Method | Parameters | Purpose |
|--------|------------|---------|
| **startEdit** | row? | Start editing row |
| **editCell** | rowIndex?, field? | Edit specific cell |
| **endEdit** | - | Save edits |
| **closeEdit** | - | Cancel edits |
| **saveCell** | - | Save cell changes |
| **indent** | record? | Move level deeper |
| **outdent** | record? | Move level higher |

---

### Export

| Method | Parameters | Returns | Purpose |
|--------|------------|---------|---------|
| **excelExport** | properties?, isMultiple?, workbook?, isBlob? | Promise | Export to Excel |
| **pdfExport** | properties?, isMultiple?, pdfDoc?, isBlob? | Promise | Export to PDF |
| **csvExport** | properties?, isMultiple?, workbook?, isBlob? | Promise | Export to CSV |
| **serverExcelExport** | url | void | Server-side Excel |
| **serverPdfExport** | url | void | Server-side PDF |
| **serverCsvExport** | url | void | Server-side CSV |

---

### Filtering & Searching

| Method | Parameters | Purpose |
|--------|------------|---------|
| **filterByColumn** | fieldName, operator, value, predicate?, matchCase?, ignoreAccent? | Filter by column |
| **clearFiltering** | - | Clear all filters |
| **search** | searchString | Search records |

---

### Sorting & Navigation

| Method | Parameters | Purpose |
|--------|------------|---------|
| **sortByColumn** | columnName, direction, isMultiSort? | Sort column |
| **clearSorting** | - | Clear all sorts |
| **goToPage** | pageNo | Navigate to page |

---

### UI Controls

| Method | Parameters | Purpose |
|--------|------------|---------|
| **showSpinner** | - | Show loading spinner |
| **hideSpinner** | - | Hide loading spinner |
| **print** | - | Print all pages |
| **openColumnChooser** | x?, y? | Open column chooser |
| **enableToolbarItems** | items, isEnable | Enable/disable toolbar |
| **refresh** | - | Refresh display |
| **refreshHeader** | - | Refresh header |
| **refreshLayout** | - | Refresh layout |

---

### DOM Element Access

| Category | Methods | Purpose |
|----------|---------|---------|
| **Content** | getContent, getContentTable | Access content area |
| **Header** | getHeaderContent, getHeaderTable, getColumnHeaderByField, getColumnHeaderByIndex | Access header |
| **Footer** | getFooterContent, getFooterContentTable | Access footer |
| **Cells** | getCellFromIndex, getMovableCellFromIndex, getFrozenRightCellFromIndex | Access cells |
| **Frozen Columns** | getFrozenLeftColumnHeaderByIndex, getFrozenRightCellFromIndex, getFrozenRightDataRows | Access frozen areas |
| **Movable Area** | getMovableColumnHeaderByIndex, getMovableDataRows, getMovableRowByIndex | Access movable area |
| **Pager** | getPager, getPageSizeByHeight | Access pager |

---

### Clipboard Operations

| Method | Parameters | Purpose |
|--------|------------|---------|
| **copy** | withHeader? | Copy to clipboard |
| **paste** | data, rowIndex, colIndex | Paste from clipboard |

---

### Component Lifecycle

| Method | Parameters | Purpose |
|--------|------------|---------|
| **destroy** | - | Destroy component |
| **appendTo** | selector? | Append to element |
| **Inject** | moduleList | Inject modules |

---

### Event Management

| Method | Parameters | Purpose |
|--------|------------|---------|
| **addEventListener** | eventName, handler | Add event listener |
| **removeEventListener** | eventName, handler | Remove event listener |

---

### Batch Operations

| Method | Parameters | Returns | Purpose |
|--------|------------|---------|---------|
| **getBatchChanges** | - | Object | Get pending changes |

---

## Method Usage Examples

### Select & Copy Data
```javascript
// Select rows
gridInstance.selectRow(0);
gridInstance.selectRows([0, 2, 4]);

// Get selected
const records = gridInstance.getSelectedRecords();

// Copy
gridInstance.copy(true); // with headers
```

### Add & Edit Record
```javascript
// Add
gridInstance.addRecord({
  taskID: 4,
  taskName: 'New Task'
}, 0, 'Child');

// Edit
gridInstance.editCell(0, 'taskName');
gridInstance.endEdit(); // Save or closeEdit(); // Cancel
```

### Filter & Search
```javascript
// Filter
gridInstance.filterByColumn('progress', 'greaterthan', 50);

// Search
gridInstance.search('Project');

// Clear
gridInstance.clearFiltering();
```

### Export Data
```javascript
// Excel
gridInstance.excelExport();

// PDF
gridInstance.pdfExport({ fileName: 'report.pdf' });

// CSV
gridInstance.csvExport();
```

### Expand/Collapse
```javascript
// Expand all
gridInstance.expandAll();

// Expand specific
gridInstance.expandByKey(2);

// Expand at level
gridInstance.expandAtLevel(1);
```

### Column Management
```javascript
// Get columns
const cols = gridInstance.getColumns();

// Show/hide
gridInstance.showColumns(['duration', 'progress']);
gridInstance.hideColumns(['priority']);

// Reorder
gridInstance.reorderColumns('taskName', 'duration');

// Auto fit
gridInstance.autoFitColumns();
```

---

**Last Updated**: March 2026  
**Total Methods**: 80+
