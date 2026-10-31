# Programmatic Control - Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [CRITICAL RULES: Method Access & Properties](#critical-rules-method-access--properties)
- [@ViewChild Reference - Complete Method Catalog](#viewchild-reference---complete-method-catalog)
  - [Data Methods](#data-methods)
  - [Row Methods](#row-methods)
  - [Column Methods](#column-methods)
  - [Sort Methods](#sort-methods)
  - [Filter Methods](#filter-methods)
  - [Search Methods](#search-methods)
  - [Group Methods](#group-methods)
  - [Page Methods](#page-methods)
  - [Edit Methods](#edit-methods)
  - [Export Methods](#export-methods)
  - [Print Method](#print-method)
  - [Toolbar Methods](#toolbar-methods)

## When to Use This Skill

Use this skill when you need to:
- **Call grid methods** — Programmatically control grid behavior
- **Set up ViewChild references** — Access component instance for method calls
- **Understand method catalog** — Find and learn available methods by category
- **Troubleshoot method failures** — Debug silent failures from missing ViewChild
- **Async method handling** — Properly await async methods like export/print
- **Data manipulation** — Add, edit, delete, refresh records via methods
- **Navigation** — Go to specific pages, rows, or cells
- **Dynamic operations** — Perform operations triggered by user actions

---

## CRITICAL RULES: Method Access & Properties

### Rule 1: @ViewChild is MANDATORY for Method Calls
Always attach a ViewChild reference — methods fail silently without it.

```typescript
// ❌ WRONG - No component reference
<ejs-grid [dataSource]="data"></ejs-grid>
this.gridComponent.addRecord(data);  // ERROR: gridComponent is undefined

// ✅ CORRECT - Use @ViewChild for method access
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({...})
export class MyGridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  
  addNewRecord() {
    this.gridComponent.addRecord(data);  // ✅ Works
  }
}

<ejs-grid #grid [dataSource]="data"></ejs-grid>
```

### Rule 2: Use Correct Method Parameters
Wrong parameters cause silent failure — always verify method signature.

```typescript
// ❌ WRONG - Missing required parameters
this.gridComponent.filterByColumn('Freight', 100);

// ✅ CORRECT - All 3 parameters required (field, operator, value)
this.gridComponent.filterByColumn('Freight', 'greaterThan', 100);

// ❌ WRONG - Wrong parameter type
this.gridComponent.selectRows(0);  // Number instead of array

// ✅ CORRECT - selectRows expects array
this.gridComponent.selectRows([0, 2, 4]);

// ❌ WRONG - Missing required arguments
this.gridComponent.deleteRecord('OrderID');

// ✅ CORRECT - Needs both field name and record object
this.gridComponent.deleteRecord('OrderID', recordObj);
```

### Rule 3: Check Return Values from Getter Methods
Don't assume methods return data — values may be empty or undefined.

```typescript
// ❌ WRONG - Crashes if array is empty
const selected = this.gridComponent.getSelectedRecords();
console.log(selected[0].OrderID);  // TypeError if empty

// ✅ CORRECT - Always validate before use
const selected = this.gridComponent.getSelectedRecords();
if (selected && selected.length > 0) {
  console.log('Selected:', selected[0].OrderID);
} else {
  console.log('No records selected');
}

// ❌ WRONG - Assuming getVisibleColumns always has data
const visibleCols = this.gridComponent.getVisibleColumns();
visibleCols.forEach(col => console.log(col.field));  // May crash

// ✅ CORRECT - Check existence
const visibleCols = this.gridComponent.getVisibleColumns();
if (visibleCols && visibleCols.length > 0) {
  visibleCols.forEach(col => console.log(col.field));
}
```

### Rule 4: Properties vs Methods — Know the Difference
- **Properties**: Set via Angular binding (`[property]="value"`)
- **Methods**: Call via @ViewChild reference (`this.gridComponent.method()`)
- Never mix them

```typescript
// ❌ WRONG - Can't call methods via binding
<ejs-grid [goToPage(2)]="true"></ejs-grid>

// ✅ CORRECT - Use binding for properties
<ejs-grid [allowPaging]="true" [pageSettings]="{ pageSize: 20 }"></ejs-grid>

// ⚠️ WRONG - Can't set properties via methods
this.gridComponent.allowPaging = true;  // Won't work

// ✅ CORRECT - Call method to change property at runtime
this.gridComponent.setProperties({ allowPaging: true });

// ❌ WRONG - Can't call methods from template binding
<button (click)="goToPage(2)"></button>  // Won't find goToPage in component

// ✅ CORRECT - Wrap method in component function
@Component({...})
export class MyComponent {
  navigatePage(pageNum: number) {
    this.gridComponent.goToPage(pageNum);
  }
}
<button (click)="navigatePage(2)"></button>
```

### Rule 5: Refresh Grid After External Data Changes
When data changes outside grid's knowledge, refresh to reflect changes.

```typescript
// ❌ WRONG - External data changes ignored by grid
async handleExternalUpdate() {
  const newData = await fetchDataFromServer();
  this.gridData = newData;  // Grid doesn't know about change
}

// ✅ CORRECT - Refresh grid after updating data
async handleExternalUpdate() {
  const newData = await fetchDataFromServer();
  this.gridData = newData;
  this.gridComponent.refresh();  // Notify grid of change
}

// Use refresh() for:
// • Reloading data after external API update
// • Clearing filters/sorts after data change
// • Syncing grid with external state changes
// • Completing batch operations
```

---

Here's the full catalog of available methods:

## @ViewChild Reference - Complete Method Catalog

Always attach a ViewChild reference to access the grid instance programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({...})
export class MyGridComponent {
  @ViewChild('grid') gridInstance: GridComponent;
```

### Data Methods
```typescript
this.gridInstance.refresh()                             // Reload data from source
this.gridInstance.setProperties({ dataSource: newData })// Change data source at runtime
this.gridInstance.getCurrentViewRecords()               // Get currently visible rows (after filter/page)
this.gridInstance.getDataModule().dataManager           // Access underlying DataManager
```

### Row Methods
```typescript
this.gridInstance.getRowByIndex(rowIndex)               // Get DOM row element by index
this.gridInstance.getRowInfo(rowElement)                // Get row data from a DOM element
this.gridInstance.selectAll()                           // Select all rows
this.gridInstance.clearSelection()                      // Deselect all rows
this.gridInstance.selectRows([0, 2, 4])                 // Select rows by index array
this.gridInstance.getSelectedRows()                     // Get selected DOM row elements
this.gridInstance.getSelectedRecords()                  // Get selected data records (objects)
```

### Column Methods
```typescript
this.gridInstance.getColumns()                          // Get all column objects
this.gridInstance.getVisibleColumns()                   // Get only visible column objects
this.gridInstance.getColumnByField('OrderID')           // Get column by field name
this.gridInstance.getColumnByUid(uid)                   // Get column by UID
this.gridInstance.showColumns('Order ID')               // Show column by headerText
this.gridInstance.showColumns(['Order ID', 'Freight'])  // Show multiple columns
this.gridInstance.hideColumns('Internal Notes')         // Hide column by headerText
this.gridInstance.hideColumns(['Region', 'EmployeeID']) // Hide multiple columns
this.gridInstance.autoFitColumns()                      // Auto-fit all columns to content
this.gridInstance.autoFitColumns(['OrderID', 'Freight'])// Auto-fit specific columns
```

### Sort Methods
```typescript
this.gridInstance.sortColumn('OrderID', 'Ascending')   // Sort a column programmatically
this.gridInstance.sortColumn('Freight', 'Descending')  // Descending sort
this.gridInstance.clearSorting()                       // Remove all sorts
this.gridInstance.sortSettings.columns                 // Read current sort state
```

### Filter Methods
```typescript
this.gridInstance.filterByColumn('CustomerID', 'StartsWith', 'VIN') // Filter column
this.gridInstance.filterByColumn('Freight', 'GreaterThan', 50)       // Numeric filter
this.gridInstance.clearFiltering()                                   // Remove all filters
this.gridInstance.clearFiltering(['CustomerID'])                     // Remove one column filter
this.gridInstance.filterSettings.columns                             // Read current filter state
```

### Search Methods
```typescript
this.gridInstance.search('searchTerm')                 // Perform global search
this.gridInstance.search('')                           // Clear search
```

### Group Methods
```typescript
this.gridInstance.groupColumn('ShipCountry')           // Group by a column
this.gridInstance.ungroupColumn('ShipCountry')         // Remove group
this.gridInstance.groupSettings.columns               // Read currently grouped columns
```

### Page Methods
```typescript
this.gridInstance.goToPage(3)                          // Navigate to specific page
this.gridInstance.pageSettings.currentPage            // Current page number
this.gridInstance.pageSettings.pageSize               // Current page size
this.gridInstance.pageSettings.totalRecordsCount      // Total record count
```

### Edit Methods
```typescript
this.gridInstance.addRecord({ OrderID: 99, CustomerID: 'NEW' }) // Add record programmatically
this.gridInstance.startEdit()                          // Begin editing selected row
this.gridInstance.endEdit()                            // Confirm / save current edit
this.gridInstance.closeEdit()                          // Cancel current edit
this.gridInstance.deleteRecord('OrderID', recordObj)  // Delete by key field + record
this.gridInstance.updateRow(rowIndex, updatedData)    // Update a specific row
this.gridInstance.setCellValue(rowIndex, field, value)// Update a single cell value
```

### Export Methods
```typescript
this.gridInstance.excelExport()                        // Export to Excel
this.gridInstance.excelExport({ fileName: 'data.xlsx' }) // With options
this.gridInstance.pdfExport()                          // Export to PDF
this.gridInstance.pdfExport({ pageOrientation: 'Landscape' }) // With options
this.gridInstance.csvExport()                          // Export to CSV
```

### Print Method
```typescript
this.gridInstance.print()                              // Print the grid
```

### Toolbar Methods
```typescript
this.gridInstance.toolbarModule.enableItems(['Add', 'Edit'], true)     // Enable items
this.gridInstance.toolbarModule.enableItems(['Delete', 'Update'], false) // Disable items
```

### Hierarchy / Detail Row Methods
```typescript
this.gridInstance.detailRowModule.detailsExpand([0, 1, 2])   // Expand detail rows by index
this.gridInstance.detailRowModule.detailsCollapse([0, 1, 2]) // Collapse detail rows
```

### State Methods
```typescript
this.gridInstance.getState()                           // Get full serializable grid state
this.gridInstance.setState(savedStateObj)              // Restore grid to saved state
```

### All Event Props Catalog

Wire these directly on `<ejs-grid>` as props.

... (Full event catalog, toolbar patterns, dynamic column show/hide, setProperties patterns,
export hooks, cross-feature patterns, row/cell styling, scrolling decision tree, and patterns)



