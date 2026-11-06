# Grid Methods

## Table of Contents

- [Overview](#overview)
- [When to Use](#when-to-use)
- [Record Management Methods](#record-management-methods)
- [Cell and Row Methods](#cell-and-row-methods)
- [Selection Methods](#selection-methods)
- [Column Methods](#column-methods)
- [Sorting and Filtering Methods](#sorting-and-filtering-methods)
- [Grouping Methods](#grouping-methods)
- [Paging Methods](#paging-methods)
- [Export and Print Methods](#export-and-print-methods)
- [Data Binding Methods](#data-binding-methods)
- [Search Methods](#search-methods)
- [Editing Methods](#editing-methods)
- [Template and Lifecycle Methods](#template-and-lifecycle-methods)
- [UI Control Methods](#ui-control-methods)
- [Utility Methods](#utility-methods)

## Overview

Grid methods provide programmatic access to perform actions on the Grid component after initialization. Use them to manipulate data, control editing, select rows/cells, sort/filter, navigate pages, export, refresh, manage columns/grouping, and access configuration.

## Record Management Methods

### addRecord(data, index) | addRecordAsync(data, index)

Adds a new record (Async variant resolves on save). `data` (Object, optional), `index` (number, optional). Returns: void | Promise. Note: `editSettings.allowEditing` must be true.

### deleteRecord(fieldname, data) | deleteRecordAsync(fieldname, data)

Deletes a record (Async resolves on completion). `fieldname` (string), `data` (Object). Deletes selected record if params omitted. Returns: void | Promise. Note: `editSettings.allowDeleting` must be true.

### updateRow(index, data) | updateRowAsync(index, data)

Updates specified row without entering edit mode (Async resolves on save). `index` (number), `data` (Object). Returns: void | Promise.

### updateCell(rowIndex, field, value) | setCellValue(rowIndex, field, value)

Update/set cell without edit mode. `rowIndex` (number), `field` (string), `value` (string|number|boolean|Date). Returns: void.

### setCellValueAsync(rowIndex, field, value) | setRowData(index, data) | setRowDataAsync(index, data)

Async cell/row operations. Returns: Promise.

## Cell and Row Methods

**Row access:** `getRowByIndex(index):Element` | `getRows():Element[]` | `getDataRows():Element[]` | `getRowsObject():Row[]`

**Row delete:** `deleteRow(tr)` | `deleteRowAsync(tr):Promise`

**Row/Cell info:** `getCellFromIndex(rowIndex, columnIndex):Element` | `getRowIndexByPrimaryKey(value):number` | `getRowInfo(target):RowInfo`

**Row pinning:** `pinRows(data)` | `unpinRows(data)`

**Detail rows:** `detailExpandAll()` | `detailCollapseAll()`

## Selection Methods

**Select rows:** `selectRow(index, isToggle?)` | `selectRows(rowIndexes)` | `selectRowsByRange(startIndex, endIndex?)`

**Select cells:** `selectCell(cellIndex, isToggle?)` | `selectCells(rowCellIndexes)` | `selectCellsByRange(startIndex, endIndex?)`

**Clear selection:** `clearRowSelection()` | `clearCellSelection()` | `clearSelection()`

**Get selection:** `getSelectedRows():Element[]` | `getSelectedRowIndexes():number[]` | `getSelectedRecords():Object[]` | `getSelectedRowCellIndexes():ISelectedCell[]` | `getSelectedColumnsUid():string[]`

## Column Methods

**Get columns:** `getColumns(isRefresh?)` | `getVisibleColumns()` | `getColumnFieldNames():string[]` | `getForeignKeyColumns()`

**Get by field/uid:** `getColumnByField(field):Column` | `getColumnByUid(uid, isColumns?):Column` | `getColumnIndexByField(field):number` | `getColumnIndexByUid(uid):number` | `getUidByColumnField(field):string`

**Get headers:** `getColumnHeaderByField(field):Element` | `getColumnHeaderByIndex(index):Element` | `getColumnHeaderByUid(uid):Element`

**Frozen/Movable:** `getMovableRows():Element[]` | `getFrozenLeftColumnHeaderByIndex(index):Element` | `getFrozenDataRows():Element[]`

**Manage columns:** `hideColumns(keys, hideBy?)` | `showColumns(keys, showBy?)` | `setColumns(columns)`

**Auto-fit:** `autoFitColumns(fieldNames?, startRowIndex?, endRowIndex?)` (ignores hidden columns; use in dataBound event for initial sizing)

## Sorting and Filtering Methods

**Sort:** `sortColumn(columnName, direction, isMultiSort?)` | `sortColumnAsync(...)` | `clearSorting()` | `clearSortingAsync()`

**Filter:** `filterByColumn(fieldName, operator, value, predicate?, actualOperator?)` | `filterByColumnAsync(...)` | `clearFiltering(fields?)` | `clearFilteringAsync(fields?)`

## Grouping Methods

**Group:** `groupColumn(columnName)` | `groupColumnAsync(columnName):Promise` | `ungroupColumn(columnName)` | `ungroupColumnAsync(columnName):Promise`

**Expand/Collapse:** `groupExpandAll()` | `groupCollapseAll()`

**Aggregates:** `getSummaryValues(summaryCol, summaryData):number`

## Paging Methods

`goToPage(pageNo)` | `goToPageAsync(pageNo):Promise` | `calculatePageSizeByParentHeight(containerHeight):number`

## Export and Print Methods

**Client-side export:** `excelExport(properties?, isMultiple?, workbook?, isBlob?):Promise` | `csvExport(properties?, isMultiple?, workbook?, isBlob?):Promise` | `pdfExport(properties?, isMultiple?, pdfDoc?, isBlob?):Promise`

**Server-side export:** `serverExcelExport(url, headers?)` | `serverCsvExport(url, headers?)` | `serverPdfExport(url, headers?)`

**Print:** `print()` (prints all pages, hides pager. Customize with `printMode`)

## Data Binding Methods

**Change data:** `changeDataSource(dataSource?, columns?, properties?)` (resets sorting/filtering/grouping/aggregates; auto-generates columns if none specified)

**Get data:** `getCurrentViewRecords():Object[]` | `getFilteredRecords():Object[]|Promise` | `getDataModule():Data` (for current queries and configuration)

## Search Methods

`search(searchString)` | `searchAsync(searchString):Promise` (customize with `searchSettings`)

## Editing Methods

`startEdit()` (requires row selected, `editSettings.allowEditing` true) | `endEdit()` | `endEditAsync():Promise` | `closeEdit()`

`editCell(index, field)` (batch mode) | `saveCell()` (doesn't save to DataSource)

## Template and Lifecycle Methods

`destroyTemplate(propertyNames?, index?, callback?)` | `refresh()` | `refreshColumns()` | `refreshHeader()` | `freezeRefresh()` (full re-render of columns/layout) | `destroy()` (detaches handlers/attributes/classes)

## UI Control Methods

**Batch updates:** `batchUpdate(changes)` | `batchAsyncUpdate(changes)` (after 50ms) | `getBatchChanges():Object` (gets add/edit/delete before save)

**Spinners/Scrolls:** `showSpinner()` | `hideSpinner()` | `hideScroll()` (when content not overflown)

**UI Actions:** `openColumnChooser(x?, y?)` | `enableToolbarItems(items, isEnable)`

## Utility Methods

**Clipboard/Reorder:** `copy()` | `reorderColumns(fromFName, toFName)` | `reorderColumnByIndex(fromIndex, toIndex)` (inconsistent; use target index) | `reorderColumnByTargetIndex(fieldName, toIndex)` (consistent results) | `reorderColumnByModel(fromColumn, toColumn)` (standard & stacked headers) | `reorderRows(fromIndexes, toIndex)`

**DOM Access:** `getContent():Element` | `getContentTable():Element` | `getFooterContent():Element` | `getFooterContentTable():Element` | `getPager():Element`

**DOM Set:** `setGridContent(content)` | `setGridContentTable(contentTable)` | `setGridHeaderContent(headerContent)` | `setGridHeaderTable(headerTable)` | `setGridPager(pager)`

**Persistence:** `getPersistData():string` | `getPersistColumns():string` (excludes templates/functions)

**Info/Dialog:** `getPrimaryKeyFieldNames():string[]` | `getFilterUIInfo():FilterUI` | `updateExternalMessage(message)` | `showAdaptiveFilterDialog()` | `showAdaptiveSortDialog()`
