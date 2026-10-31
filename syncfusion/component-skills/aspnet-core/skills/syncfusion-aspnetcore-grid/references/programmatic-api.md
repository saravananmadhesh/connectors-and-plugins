# Programmatic Control in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Mandatory Usage Rules](#mandatory-usage-rules)
- [Complete Method Reference](#complete-method-reference)
  - [Data & Refresh Methods (5)](#data--refresh-methods-5)
  - [Row Access Methods (8)](#row-access-methods-8)
  - [Row Manipulation Methods (7)](#row-manipulation-methods-7)
  - [Selection Methods (10)](#selection-methods-10)
  - [Column Methods (8)](#column-methods-8)
  - [Sorting & Filtering Methods (6)](#sorting--filtering-methods-6)
  - [Paging Methods (3)](#paging-methods-3)
  - [Editing Methods (4)](#editing-methods-4)
  - [Export Methods (4)](#export-methods-4)
  - [State Methods (3)](#state-methods-3)

---

## Overview

Access all Grid methods through the grid instance after getting it via `document.getElementById('Grid').ej2_instances[0]`.

```cshtml
<button onclick="refreshGrid()">Refresh</button>

<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function refreshGrid() {
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.refresh(); // Call method on grid instance
}
</script>
```

---

## Mandatory Usage Rules

### Rule 1: Get Grid Instance Correctly

```javascript
// ✅ CORRECT - Get instance from DOM element
var grid = document.getElementById('Grid').ej2_instances[0];

// ❌ WRONG - Can't use jQuery without proper conversion
var grid = $('#Grid').data('ejGrid');

// ❌ WRONG - Instance array is 0-indexed, only first one works
var grid = document.getElementById('Grid').ej2_instances[1];
```

### Rule 2: Call Methods Only After Grid is Created

```cshtml
<ejs-grid id="Grid" onCreated="onCreated">
</ejs-grid>

<script>
// ✅ CORRECT - Call in event handler after grid created
function onCreated(args) {
    args.grid.selectRow(0); // Safe - grid exists
}

// ❌ WRONG - Grid might not be created yet
<script type="text/javascript">
    // This might fail if called before grid is created
    document.getElementById('Grid').ej2_instances[0].selectRow(0);
</script>
</script>
```

### Rule 3: Store Grid Reference in Variable for Repeated Use

```javascript
// ✅ CORRECT - Store reference once
var grid = document.getElementById('Grid').ej2_instances[0];
grid.selectRow(0);
grid.selectRow(1);
grid.selectRow(2);

// ❌ INEFFICIENT - Getting instance repeatedly
document.getElementById('Grid').ej2_instances[0].selectRow(0);
document.getElementById('Grid').ej2_instances[0].selectRow(1);
document.getElementById('Grid').ej2_instances[0].selectRow(2);
```

### Rule 4: Primary Key Required for Data Manipulation Methods

Methods like `setCellValue()`, `setRowData()` require `isPrimaryKey="true"` on a unique column.

```cshtml
<!-- ❌ WRONG - Methods fail silently without primary key -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- ✅ CORRECT - Mark unique column as primary key -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var grid = document.getElementById('Grid').ej2_instances[0];
grid.setCellValue(10248, 'Freight', 50.00); // Now works - has primary key
</script>
```

### Rule 5: Use Correct Method Parameters

Check method signatures - wrong parameters or types cause silent failures.

```javascript
// ❌ WRONG - Missing required parameters
var grid = document.getElementById('Grid').ej2_instances[0];
grid.filterByColumn('Freight', 100);

// ✅ CORRECT - All 3 parameters required
grid.filterByColumn('Freight', 'greaterThan', 100);

// ❌ WRONG - Wrong parameter type (selectRows expects array)
grid.selectRows(0);

// ✅ CORRECT
grid.selectRows([0, 2, 4]); // Array required
```

### Rule 6: Check Return Values from Getter Methods

Don't assume methods return data - always validate before using.

```javascript
// ❌ WRONG - Might be undefined/empty array
var grid = document.getElementById('Grid').ej2_instances[0];
var selected = grid.getSelectedRecords();
console.log(selected[0].OrderID); // Crashes if no selection

// ✅ CORRECT - Validate before use
var grid = document.getElementById('Grid').ej2_instances[0];
var selected = grid.getSelectedRecords();
if (selected && selected.length > 0) {
    console.log(selected[0].OrderID);
} else {
    alert('No records selected');
}
```

### Rule 7: Edit Methods Require editSettings Configuration

Methods like `addRecord()`, `editRow()`, `deleteRecord()` need proper edit settings.

```cshtml
<!-- ❌ WRONG - No edit configuration -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionComplete="onActionComplete">
</ejs-grid>

<script>
// addRecord() fails silently without edit settings
var grid = document.getElementById('Grid').ej2_instances[0];
grid.addRecord({ OrderID: 10324, CustomerID: 'NEW' });
</script>

<!-- ✅ CORRECT - Add edit settings -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onActionComplete="onActionComplete">
    <e-grid-editSettings allowAdding="true" 
                        allowEditing="true" 
                        allowDeleting="true" 
                        mode="Dialog">
    </e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var grid = document.getElementById('Grid').ej2_instances[0];
grid.addRecord({ OrderID: 10324, CustomerID: 'NEW' }); // Now works
</script>
```

---

## Complete Method Reference

### Data & Refresh Methods (5)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `refresh()` | `grid.refresh()` | Reload data from current DataSource |
| `refreshRow(index)` | `grid.refreshRow(2)` | Refresh single row by index |
| `addRecord(data, index)` | `grid.addRecord({...}, 0)` | Programmatically add record to grid |
| `deleteRecord(fieldName, value)` | `grid.deleteRecord('OrderID', 10248)` | Delete specific record by field value |
| `getContentTable()` | `var table = grid.getContentTable()` | Get grid content table element |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Refresh entire grid
grid.refresh();

// Refresh specific row
grid.refreshRow(2);

// Add new record
grid.addRecord({ OrderID: 10999, CustomerID: 'NEWC', Freight: 50 });

// Delete record by key
grid.deleteRecord('OrderID', 10248);
```

### Row Access Methods (8)

| Method | Syntax | Returns |
|--------|--------|---------|
| `getRows()` | `grid.getRows()` | All row elements (HTMLCollection) |
| `getRowByIndex(index)` | `grid.getRowByIndex(0)` | Row element at index |
| `getContentTable()` | `grid.getContentTable()` | Grid content table element |
| `getSelectionIndexes()` | `grid.getSelectedRowIndexes()` | Selected row indices (number[]) |
| `getSelectedRecords()` | `grid.getSelectedRecords()` | Selected row data (object[]) |
| `getCurrentViewRecords()` | `grid.getCurrentViewRecords()` | Current page records |
| `getTotalRecordsCount()` | `grid.getTotalRecordsCount()` | Total records in data |
| `getVisibleColumns()` | `grid.getVisibleColumns()` | Visible Column objects |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Get all rows
var rows = grid.getRows();
console.log(rows.length + ' rows');

// Get specific row
var row1 = grid.getRowByIndex(0);

// Get selected rows
var selectedIndexes = grid.getSelectedRowIndexes(); // [0, 2, 4]
var selectedData = grid.getSelectedRecords(); // [{...}, {...}]

// Get current page data
var currentPageData = grid.getCurrentViewRecords();

// Get total record count
console.log('Total:', grid.getTotalRecordsCount());
```

### Row Manipulation Methods (7)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `selectRow(rowIndex)` | `grid.selectRow(3)` | Select row by index |
| `clearSelection()` | `grid.clearSelection()` | Deselect all rows |
| `startEdit(rowIndex)` | `grid.startEdit(2)` | Start editing row |
| `endEdit()` | `grid.endEdit()` | End edit mode, save changes |
| `cancelEdit()` | `grid.cancelEdit()` | Cancel edit without saving |
| `deleteRow(row)` | `grid.deleteRow(rowElement)` | Delete row |
| `selectRows(indexes)` | `grid.selectRows([0, 2, 4])` | Select multiple rows |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Select row 0
grid.selectRow(0);

// Select multiple rows
grid.selectRows([0, 1, 2]);

// Clear selection
grid.clearSelection();

// Edit row 2
grid.startEdit(2);

// Save edit
grid.endEdit();

// Cancel edit
grid.cancelEdit();

// Delete row
var rows = grid.getRows();
grid.deleteRow(rows[0]);
```

### Selection Methods (10)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `selectRow(index)` | `grid.selectRow(0)` | Select single row |
| `selectRows(indexes)` | `grid.selectRows([0, 1, 2])` | Select multiple rows |
| `selectCell(cellIndex)` | `grid.selectCell([0, 1])` | Select cell by row, col index |
| `selectCells(cellIndexes)` | `grid.selectCells([[0,0], [1,2]])` | Select multiple cells |
| `getSelectedRowIndexes()` | `var idx = grid.getSelectedRowIndexes()` | Get selected row indices |
| `getSelectedRecords()` | `var data = grid.getSelectedRecords()` | Get selected row data |
| `getSelectedRowCellIndexes()` | `grid.getSelectedRowCellIndexes()` | Get selected cell indices |
| `getSelectedCellsIndexes()` | `grid.getSelectedCellsIndexes()` | Get all selected cell indices |
| `clearSelection()` | `grid.clearSelection()` | Clear all selections |
| `selectAll()` | `grid.selectAll()` | Select all visible rows |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Select rows  
grid.selectRow(0);
grid.selectRows([1, 2, 3]);
grid.selectAll();

// Get selected
var selectedIndexes = grid.getSelectedRowIndexes();
var selectedData = grid.getSelectedRecords();

// Select cells (row index, column index)
grid.selectCell([0, 1]);
grid.selectCells([[0, 0], [1, 2], [2, 1]]);

// Clear
grid.clearSelection();
```

### Column Methods (8)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `getColumnByField(field)` | `grid.getColumnByField('OrderID')` | Get Column object by field |
| `getColumnFieldNames()` | `grid.getColumnFieldNames()` | Get all column field names[] |
| `getVisibleColumns()` | `grid.getVisibleColumns()` | Get visible Column objects |
| `hideColumns(fields)` | `grid.hideColumns(['OrderDate'])` | Hide columns by field |
| `showColumns(fields)` | `grid.showColumns(['OrderDate'])` | Show hidden columns |
| `reorderColumns(fromIndex, toIndex)` | `grid.reorderColumns(1, 3)` | Reorder column position |
| `autoFitColumns(columns)` | `grid.autoFitColumns(['OrderID', 'CustomerID'])` | Auto-fit column widths |
| `resizeColumn(field, width)` | `grid.resizeColumn('OrderID', 150)` | Set column width |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Get column info
var orderIdCol = grid.getColumnByField('OrderID');
var visibleCols = grid.getVisibleColumns();
var fieldNames = grid.getColumnFieldNames(); // ['OrderID', 'CustomerID', ...]

// Hide/show columns
grid.hideColumns(['OrderDate', 'ShippedDate']);
grid.showColumns(['OrderDate']);

// Reorder columns (move column 1 to position 3)
grid.reorderColumns(1, 3);

// Auto-fit and resize
grid.autoFitColumns(['OrderID', 'CustomerID']);
grid.resizeColumn('Freight', 150);
```

### Sorting & Filtering Methods (6)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `sortByColumn(field, direction)` | `grid.sortByColumn('OrderID', 'Ascending')` | Sort by column |
| `clearSorting()` | `grid.clearSorting()` | Remove all sorts |
| `filterByColumn(field, operator, value)` | `grid.filterByColumn('Freight', 'greaterThan', 100)` | Filter by column |
| `filterByColumns(predicates) ` | Complex filtering | Filter with multiple conditions |
| `clearFiltering()` | `grid.clearFiltering()` | Clear all filters |
| `searchNext(searchString)` | `grid.searchNext('VINET')` | Search next occurrence |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Sorting
grid.sortByColumn('OrderID', 'Ascending');
grid.sortByColumn('Freight', 'Descending');
grid.clearSorting();

// Filtering
grid.filterByColumn('Freight', 'greaterThan', 100);
grid.filterByColumn('CustomerID', 'startswith', 'V');
grid.clearFiltering();

// Search
grid.searchNext('VINET');
```

### Paging Methods (3)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `goToPage(pageNumber)` | `grid.goToPage(2)` | Navigate to specific page |
| `getCurrentPage()` | `var page = grid.getCurrentPage()` | Get current page number |
| `getPageCount()` | `var count = grid.getPageCount()` | Get total page count |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Navigate
grid.goToPage(2);
grid.goToPage(1); // Go to first page

// Get info
var currentPage = grid.getCurrentPage();
var totalPages = grid.getPageCount();
console.log('Page ' + currentPage + ' of ' + totalPages);
```

### Editing Methods (4)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `startEdit(rowIndex)` | `grid.startEdit(2)` | Put row in edit mode |
| `endEdit()` | `grid.endEdit()` | Save edit changes |
| `cancelEdit()` | `grid.cancelEdit()` | Cancel edit |
| `setBatchChanges(changes)` | `grid.setBatchChanges(batchData)` | Set batch edit changes |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Edit row 2
grid.startEdit(2);

// Later, save
grid.endEdit();

// Or cancel
grid.cancelEdit();
```

### Export Methods (4)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `excelExport()` | `grid.excelExport()` | Export to Excel |
| `pdfExport()` | `grid.pdfExport()` | Export to PDF |
| `csvExport()` | `grid.csvExport()` | Export to CSV |
| `print()` | `grid.print()` | Open print dialog |

**Example:**
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Export methods
grid.excelExport();
grid.pdfExport();
grid.csvExport();
grid.print();
```

### State Methods (3)

| Method | Syntax | Use Case |
|--------|--------|----------|
| `getPersistenceProperties()` | `grid.getPersistenceProperties()` | Get current grid state |
| `refresh()` | `grid.refresh()` | Refresh grid data |
| `updateExternalMessage(message)` | `grid.updateExternalMessage('msg')` | Set external message |

---

## Common Code Patterns

### Select Row and Get Data
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.selectRow(0);
var selectedData = grid.getSelectedRecords();
console.log(selectedData[0]); // First selected row
```

### Add Multiple Records
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
var newRecords = [
    { OrderID: 11000, CustomerID: 'CUST1', Freight: 100 },
    { OrderID: 11001, CustomerID: 'CUST2', Freight: 200 }
];
newRecords.forEach(function(record) {
    grid.addRecord(record);
});
```

### Filter and Select Matching Rows
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.filterByColumn('Freight', 'greaterThan', 100);
grid.selectAll(); // Select filtered results
```

### Export Selected Rows
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.selectRows([0, 2, 4]);
grid.excelExport(); // Exports selected rows
```
