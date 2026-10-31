# Vue 2 Template Configuration

## Table of Contents
- [When to Use](#when-to-use)
- [Columns](#columns)
- [Rows](#rows)
- [Cells](#cells)
- [Adaptive UI](#adaptive-ui)
- [Modules](#modules)
- [Performance Optimization](#performance-optimization)
- [Data Binding (Vue 2)](#data-binding-vue-2)
- [Editing](#editing)
- [Sorting](#sorting)
- [Grouping](#grouping)
- [Filtering](#filtering)
- [Scrolling](#scrolling)
- [Searching](#searching)
- [Paging](#paging)
- [Selection](#selection)
- [Export Operations](#export-operations)
- [Aggregates](#aggregates)
- [Printing](#printing)
- [Hierarchical Binding](#hierarchical-binding)
- [State Management](#state-management)
- [Toolbar](#toolbar)

## When to Use

Use this reference when you need to:
- Configure Syncfusion Vue Grid components in Vue 2 projects
- Implement column templates, row templates, and cell templates
- Set up module injection with Vue 2 Options API
- Configure data binding, editing, and CRUD operations
- Work with adaptive UI for responsive layouts
- Optimize performance with paging and virtualization
- Implement Vue 2-specific template syntax and patterns

## Columns

```vue
<!-- Custom image: <e-column headerText='Employee Image' width='150' :template="'employeeImage'"></e-column> -->
<template slot-scope="{data}"><img :src="'./images/' + data.EmployeeID + '.png'" :alt="data.EmployeeID"/></template>

<!-- Badge/status: <e-column field='Status' headerText='Status' width='100' :template="'statusBadge'"></e-column> -->
<template slot-scope="{data}"><span :class="'badge badge-' + data.Status.toLowerCase()">{{ data.Status }}</span></template>

<!-- Link: <e-column field='CustomerName' headerText='Customer' width='150' :template="'customerLink'"></e-column> -->
<template slot-scope="{data}"><a :href="data.CustomerURL" target="_blank">{{ data.CustomerName }}</a></template>

<!-- Header: <e-column field='OrderID' headerText='Order ID' :headerTemplate="'customHeader'"></e-column> -->
<template slot-scope="{data}"><div style="font-weight: bold; color: #0078d4;">{{ headerText }}</div></template>

<!-- Formatted text (currency): <e-column field='Freight' headerText='Freight' :template="'freightTemplate'"></e-column> -->
<template slot-scope="{data}"><strong style="color: #d32f2f;">${{ data.Freight.toFixed(2) }}</strong></template>
```

## Rows

```javascript
// Row template (custom HTML)
rowTemplate: `<tr style="height: 60px;">
  <td class="order-id">\${OrderID}</td>
  <td><div class="customer-info"><div>\${CustomerID}</div><small>\${Freight}</small></div></td>
</tr>`

// Detail/expandable template
detailTemplate: `<div style="padding: 15px; background: #f9f9f9;">
  <div><strong>Customer:</strong> \${CustomerID}</div>
  <div><strong>Freight:</strong> $\${Freight}</div>
  <div><strong>Status:</strong> \${Status}</div>
</div>`
```

## Cells

```vue
<!-- HTML content: <e-column field='Description' :template="'htmlContent'"></e-column> -->
<template slot-scope="{data}"><div><h5>{{ data.Title }}</h5><p>{{ data.Description }}</p></div></template>

<!-- Conditional styling: <e-column field='Status' :template="'statusCell'"></e-column> -->
<template slot-scope="{data}"><div :style="getStyle(data.Status)">{{ data.Status }}</div></template>
<!-- Methods: getStyle(s) { if (s === 'Shipped') return { backgroundColor: '#d4edda', color: '#155724' }; ... } -->

<!-- Action buttons: <e-column headerText='Actions' :template="'actionButtons'"></e-column> -->
<template slot-scope="{data}"><div style="display: flex; gap: 8px;">
  <button @click="editRow(data)" style="padding: 4px 8px;">Edit</button>
  <button @click="deleteRow(data)" style="padding: 4px 8px;">Delete</button>
</div></template>

<!-- Tooltip (truncated): <e-column field='notes' :template="'notesCell'"></e-column> -->
<template slot-scope="{data}"><div :title="data.notes" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ data.notes }}</div></template>
```

## Adaptive UI

```javascript
// Adaptive detail template
adaptiveDetail: `<div style="padding: 15px; background: #f5f5f5;">
  <div><span class="label">Customer:</span> <span>\${CustomerID}</span></div>
  <div><span class="label">Freight:</span> <span>$\${Freight}</span></div>
  <div><span class="label">Status:</span> <span>\${Status}</span></div>
</div>`

// Responsive column template
// In Vue template: <e-column field='Description' :template="'responsiveDesc'"></e-column>
// <template slot-scope="{data}">
//   <div :class="isSmallScreen ? 'mobile-text' : 'desktop-text'">
//     <div class="title">{{ data.Title }}</div>
//     <div v-if="!isSmallScreen" class="description">{{ data.Description }}</div>
//   </div>
// </template>

// In data(): isSmallScreen: window.innerWidth < 768
// In mounted(): window.addEventListener('resize', () => { this.isSmallScreen = window.innerWidth < 768; })
```

## Modules & Performance

```javascript
// Module injection: provide: { grid: [Page, Sort, Filter, Group, Edit, Toolbar, VirtualScroll, ForeignKey] }
// Paging: pageSettings: { pageSize: 25, pageCount: 5 }
// Row virtualization: enableVirtualization: true, height: "400"
// Column virtualization: enableColumnVirtualization: true
// Infinite scrolling: pageSettings: { enableInfiniteScrolling: true }
// Update cell: this.$refs.grid.setCellValue(rowIdx, field, value)
```

## Editing

```javascript
// Basic editing: editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' }
// Dialog mode: editSettings: { mode: 'Dialog' }
// Batch mode: editSettings: { mode: 'Batch' }, getBatchChanges() { return this.$refs.grid.ej2Instances.getBatchChanges(); }
// Validation: actionBegin(a) { if (a.requestType === 'save' && !a.data.CustomerID) a.cancel = true; }

// CRUD methods
startEdit() { this.$refs.grid.ej2Instances.startEdit(); }
addRecord() { this.$refs.grid.ej2Instances.addRecord(); }
deleteRecord() { this.$refs.grid.ej2Instances.deleteRecord(); }
setCellValue(r, f, v) { this.$refs.grid.ej2Instances.setCellValue(r, f, v); }

// Server-side CRUD: data: new DataManager({ url: '/api/Orders', updateUrl: '/api/Orders/Update', insertUrl: '/api/Orders/Insert', removeUrl: '/api/Orders/Delete' })
// Edit events: actionBegin(args) { if (args.requestType === 'beginEdit') {...} }
```

## Sorting

```javascript
// Enable sorting + provide module
allowSorting: true,
provide: { grid: [Sort] }

// Disable for specific column: <e-column field="OrderID" :allowSorting="false"></e-column>

// Initial sort
sortSettings: { columns: [{ field: 'OrderID', direction: 'Descending' }], initialSortDirection: 'Descending' }

// Multi-column sort
sortSettings: { columns: [{ field: 'CustomerID', direction: 'Ascending' }, { field: 'ShipCity', direction: 'Ascending' }], sortMode: 'Child' }

// Foreign key sorting: provide: { grid: [Sort, ForeignKey] }
// <e-column field="EmployeeID" :dataSource="employeeData" foreignKeyField="EmployeeID" foreignKeyValue="EmployeeName"></e-column>

// Custom sort comparers
customComparer(v1, v2) { return v1.length < v2.length ? -1 : v1.length > v2.length ? 1 : 0; }
applySortWithComparer() { this.$refs.grid.ej2Instances.sortByColumn('CustomerID', 'Ascending', true, this.customComparer); }

// Culture-based: setCulture('sv-SE'), locale: 'sv-SE'

// Programmatic sort
applySorting() { this.$refs.grid.ej2Instances.sortByColumn('CustomerID', 'Ascending'); }
applyMultiSort() { this.$refs.grid.ej2Instances.sortByColumn('CustomerID', 'Ascending', true); this.$refs.grid.ej2Instances.sortByColumn('ShipCity', 'Descending', true); }
clearSort() { this.$refs.grid.ej2Instances.clearSorting(); }

// Sort events: actionBegin(args) { if (args.requestType === 'sorting') {...} }
// Touch drag sort: :allowTouchDragSort="true"
// Custom sort icons (CSS): .e-grid .e-sort-ascending::before { content: "▲"; color: #0066cc; }
```

## Grouping

```javascript
// Basic grouping
allowGrouping: true,
groupSettings: { columns: ['ShipCity'] }

// Multi-level grouping
groupSettings: { columns: ['ShipCountry', 'ShipCity'] }

// Group with paging
groupSettings: { columns: ['ShipCity'], enableImmediateMode: false },
pageSettings: { pageSize: 25 }

// Collapse/expand all groups
dataBound() { this.$refs.grid.ej2Instances.groupModule.collapseAll(); }
expandAllGroups() { this.$refs.grid.ej2Instances.groupModule.expandAll(); }

// Programmatic grouping
groupByCity() { this.$refs.grid.ej2Instances.groupByColumn('ShipCity'); }
ungroupByCity() { this.$refs.grid.ej2Instances.ungroupByColumn('ShipCity'); }
clearAllGroups() { this.$refs.grid.ej2Instances.groupSettings.columns = []; this.$refs.grid.ej2Instances.refresh(); }

// Group events
actionBegin(args) { if (args.requestType === 'grouping') { /* grouping started */ } }
actionComplete(args) { if (args.requestType === 'grouping') { /* grouping done */ } }
```

## Filtering & Searching

**Filtering:**
```javascript
// Filter bar mode: allowFiltering: true, filterSettings: { type: 'FilterBar', mode: 'OnEnter' }
// Filter menu: filterSettings: { type: 'Menu' }
// Excel/checkbox filter: filterSettings: { type: 'Excel' }
// Initial filters: filterSettings: { columns: [{ field: 'OrderID', operator: 'equal', value: '10248' }] }
// Disable filtering: <e-column field="OrderID" :allowFiltering="false"></e-column>
// Filter events: actionBegin(args) { if (args.requestType === 'filtering') { ... } }
```

**Searching:**
```javascript
// Enable search: allowSearching: true, toolbar: ['Search']
// Custom search: searchSettings: { fields: ['CustomerID', 'ShipCity'], operator: 'contains', ignoreAccent: true }
// Programmatic: this.$refs.grid.ej2Instances.search(text); // or search('') to clear
// Search events: actionBegin(args) { if (args.requestType === 'searching') { ... } }
```

## Scrolling & Paging

**Scrolling:**
```javascript
// Row virtualization: enableVirtualization: true, height: "400px"
// Column virtualization: enableColumnVirtualization: true
// Infinite scrolling: pageSettings: { pageSize: 20, mode: 'Infinite' }
// Freeze rows/columns: frozenSettings: { frozenRows: 2, frozenColumns: 1 }
// Hide scrollbar (action complete): const sb = document.querySelector('.e-grid .e-hsbar'); if (sb) sb.style.display = 'none';
```

**Paging:**
```javascript
// Enable: allowPaging: true, pageSettings: { pageSize: 10, currentPage: 1 }
// Page size options: pageSettings: { pageSize: 10, pageSizes: [5, 10, 20, 50] }
// Query string: pageSettings: { pageSize: 10, enableQueryString: true }
// Programmatic: goToPage(p) { this.$refs.grid.ej2Instances.goToPage(p); }
// Get current: this.$refs.grid.ej2Instances.pageSettings.currentPage
// Events: actionBegin/actionComplete(args) { if (args.requestType === 'paging') {...} }
```

## Selection

```javascript
// Row selection (single): selectionSettings: { type: 'Row', mode: 'Single' }
// Row selection (multiple): selectionSettings: { type: 'Row', mode: 'Multiple' }
// Cell selection: selectionSettings: { type: 'Cell', mode: 'Multiple', cellSelectionMode: 'Flow' }
// Column selection: selectionSettings: { type: 'Column', mode: 'Single' }
// Checkbox selection: <e-column type="checkbox" width="50"></e-column>, selectionSettings: { checkboxOnly: true, type: 'Row' }
// Persist across pages: selectionSettings: { type: 'Row', mode: 'Multiple', persistSelection: true }

// Programmatic: selectRow(i) { this.$refs.grid.ej2Instances.selectRow(i); }
// selectMultiple: selectRows([0, 2, 4]) { this.$refs.grid.ej2Instances.selectRows([0, 2, 4]); }
// selectAll() { this.$refs.grid.ej2Instances.selectAll(); }
// clearSelection() { this.$refs.grid.ej2Instances.clearSelection(); }

// Get selected: getSelectedRecords() { return this.$refs.grid.ej2Instances.getSelectedRecords(); }
// Get indices: getSelectedRowIndices() { return this.$refs.grid.ej2Instances.getSelectedRowIndexes(); }

// Events: rowSelected(args) { console.log('Row selected:', args.data); }
// rowDeselected(args) { console.log('Row deselected:', args.data); }
```

## Export & Printing

**Excel/CSV/PDF Export:**
```javascript
// Basic: toolbar: ['ExcelExport', 'CsvExport', 'PdfExport']
// Custom columns: excelExport() { const props = { columns: [{field: 'OrderID', format: 'C2'}], fileName: 'export.xlsx' }; this.$refs.grid.excelExport(props); }
// CSV custom: exportCSV() { const csv = ['header1,header2', ...rows].join('\n'); const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv'})); link.download = 'export.csv'; link.click(); }
// PDF variants: exportPdfCurrentPage() { const props = { exportType: 'CurrentPage' }; this.$refs.grid.ej2Instances.pdfExport(props); }
// PDF selected: const selected = this.$refs.grid.ej2Instances.getSelectedRecords(); this.$refs.grid.ej2Instances.pdfExport({ dataSource: selected });
// Toolbar click: toolbarClick(args) { if (args.item.id === 'grid_excelexport') this.$refs.grid.excelExport({ fileName: 'export.xlsx' }); }
```

**Aggregates:**
```javascript
// Basic: aggregates: [{ columns: [{ type: 'Sum', field: 'Freight', format: 'C2' }] }]
// Footer: { type: 'Sum', field: 'Freight', footerTemplate: 'Total: ${Sum}' }
// Group: groupSettings: { columns: ['ShipCountry'], disablePageWiseAggregates: false }, aggregates: [{ columns: [{ type: 'Sum', field: 'Freight', groupFooterTemplate: 'Subtotal: ${Sum}' }] }]
// Multiple types: { type: ['Sum', 'Average', 'Min', 'Max'], field: 'Freight', format: 'C2' }
```

**Printing:**
```javascript
// Enable: toolbar: ['Print']
// Programmatic: toolbarClick(args) { if (args.item.id === 'grid_print') this.$refs.grid.ej2Instances.print(); }
// Current page: printCurrentPage() { this.$refs.grid.ej2Instances.print(false, true); }
// Selected rows: printSelected() { const selected = this.$refs.grid.ej2Instances.getSelectedRowIndexes(); this.$refs.grid.ej2Instances.printRows(selected); }
// Settings: printSettings: { printMode: 'AllPages' }
```

## Hierarchical & State Management

**Hierarchical Binding:**
```javascript
// Master-detail: childGrid: { dataSource: childData, queryString: 'OrderID', columns: [...] }
// Expand/collapse events: detailExpand(args) { ... }, detailCollapse(args) { ... }
// Programmatic: expandRow(i) { this.$refs.grid.ej2Instances.expandRow(i); }
// Collapse: collapseRow(i) { ... }, expandAll() { ... }, collapseAll() { ... }
```

**State Management:**
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```javascript
// Enable persistence: enablePersistence: true, persistID: "gridSettings"
// Manual save: saveGridState() { const state = this.$refs.grid.ej2Instances.getPersistData(); localStorage.setItem('gridState', JSON.stringify(state)); }
// Restore: restoreGridState() { const saved = localStorage.getItem('gridState'); if (saved) this.$refs.grid.ej2Instances.setPersistData(JSON.parse(saved)); }
// Immutable mode: enableImmutableMode: true
// Clear: clearPersistedState() { localStorage.removeItem('gridSettings_gridstate'); location.reload(); }
```

## Toolbar

```javascript
// Enable: toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Print', 'Search']
// Custom items: toolbar: [{ text: 'Expand', tooltipText: 'Expand All', prefixIcon: 'e-expand', id: 'expandall' }, ...]
// Click handler: toolbarClick(args) { if (args.item.id === 'expandall') this.$refs.grid.ej2Instances.groupModule.expandAll(); }
// Enable/disable: enableToolbarItems(ids, enable) { this.$refs.grid.ej2Instances.toolbarModule.enableItems(ids, enable); }

// PDF: toolbar: ['PdfExport'], allowPdfExport: true, toolbarClick(args) { if (args.item.id === 'grid_pdfexport') this.$refs.grid.ej2Instances.pdfExport(); }
// PDF current page: exportPdfCurrentPage() { this.$refs.grid.ej2Instances.pdfExport({ exportType: 'CurrentPage' }); }
// PDF selected: const sel = this.$refs.grid.ej2Instances.getSelectedRecords(); this.$refs.grid.ej2Instances.pdfExport({ dataSource: sel });
// PDF custom: exportPdfCustom() { this.$refs.grid.ej2Instances.pdfExport({ fileName: 'report.pdf', pageOrientation: 'Landscape', pageSize: 'A4' }); }

// Excel: toolbar: ['ExcelExport', 'CsvExport'], allowExcelExport: true
// Excel current: exportExcelCurrentPage() { this.$refs.grid.ej2Instances.excelExport({ exportType: 'CurrentPage' }); }
// Excel filtered: const filtered = this.$refs.grid.ej2Instances.getFilteredRecords(); this.$refs.grid.ej2Instances.excelExport({ dataSource: filtered });
// Excel custom: exportExcelCustom() { this.$refs.grid.ej2Instances.excelExport({ fileName: 'report.xlsx', columns: [{field: 'OrderID'}, {field: 'Freight', format: 'C2'}] }); }
// CSV: exportCsv() { this.$refs.grid.ej2Instances.csvExport({ fileName: 'report.csv' }); }
```

## Globalization & Accessibility

**Globalization:**
```javascript
// Set locale: selectedLocale: 'en', changeLocale(l) { this.selectedLocale = l; setCulture(l); }
// Custom translations: L10n.load({ 'de': { 'grid': { 'Add': 'Hinzufügen', 'Edit': 'Bearbeiten', 'Delete': 'Löschen' } } })
// Currency: setCulture('de-DE'); setCurrencyCode('EUR');
// Number format: <e-column field="Freight" format="C2" width="100"></e-column>
// Date format: <e-column field="OrderDate" type="date" format="yMd" width="130"></e-column>
```

**Accessibility:**
```javascript
// Keyboard shortcuts: keyPressed(args) { if (args.key.toLowerCase() === 'n') { args.preventDefault(); this.$refs.grid.ej2Instances.addRecord(); } }
// Prevent keys: preventKeyAction: { Enter: false, Escape: false }
// Clipboard: selectionSettings: { type: 'Multiple' }, copyWithHeader() { this.$refs.grid.ej2Instances.copy(true); }
// AutoFill: enableAutoFill: true, editSettings: { mode: 'Batch', allowEditing: true }
// Context menu: contextMenuItems: ['Copy', 'ExcelExport', 'PdfExport'], contextMenuClick(args) { if (args.item.id === 'grid_sendemail') {...} }
// Enable/disable menu: this.$refs.grid.ej2Instances.contextMenuModule.contextMenu.enableItems(['Copy'], true);
// Show/hide menu: showItems(['Copy', 'ExcelExport']), hideItems(['Copy'])
// Built-in items: ['Copy', 'CopyHeader', 'Edit', 'Delete', 'Save', 'Cancel', 'ExcelExport', 'PdfExport', 'CsvExport']
```