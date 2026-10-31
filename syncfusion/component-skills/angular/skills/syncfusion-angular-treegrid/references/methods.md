---
name: Methods Reference (Table)
description: 'Complete table reference for all Syncfusion Angular TreeGrid methods.'
---

# TreeGrid Methods - Table Reference

## When to Use

Use this methods reference when you need to:
- **Quick method lookup** — Find method names and signatures
- **Programmatic control** — Call methods from your code
- **Type checking** — Verify method parameters and return types
- **API documentation** — Reference complete method list
- **Dynamic operations** — Refresh, add, delete, or update data programmatically
- **Data manipulation** — Modify TreeGrid state and behavior
- **Event handling** — Execute methods in response to user actions

## Data Management Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `addRecord()` | `addRecord(data?, index?, position?)` | `void` | `data: Object \| Object[], index?: number, position?: string` | Add new record at specified position |
| `deleteRecord()` | `deleteRecord(fieldName?, data?)` | `void` | `fieldName?: string, data?: Object` | Delete record by key or data object |
| `deleteRow()` | `deleteRow(tr)` | `void` | `tr: HTMLTableRowElement` | Delete visible row by element |
| `setRowData()` | `setRowData(key, rowData?)` | `void` | `key: string \| number, rowData?: ITreeData` | Update row by primary key |
| `updateRow()` | `updateRow(index, data)` | `void` | `index: number, data: Object` | Update row by index with data |
| `setCellValue()` | `setCellValue(key, field, value)` | `void` | `key: string \| number, field: string, value: any` | Update cell by key and field |
| `refresh()` | `refresh()` | `void` | - | Refresh entire TreeGrid |
| `refreshRows()` | `refreshRows(indexes, isNow?)` | `void` | `indexes: number[], isNow?: boolean` | Refresh specific rows |
| `refreshColumns()` | `refreshColumns(refreshUI?)` | `void` | `refreshUI?: boolean` | Refresh column definitions |
| `refreshHeader()` | `refreshHeader()` | `void` | - | Refresh header section |
| `refreshLayout()` | `refreshLayout()` | `void` | - | Full layout refresh |

## Selection Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `selectRow()` | `selectRow(index, isToggle?)` | `void` | `index: number, isToggle?: boolean` | Select row by index |
| `selectRows()` | `selectRows(rowIndexes)` | `void` | `rowIndexes: number[]` | Select multiple rows |
| `selectCell()` | `selectCell(cellIndex, isToggle?)` | `void` | `cellIndex: IIndex, isToggle?: boolean` | Select cell by position |
| `selectCheckboxes()` | `selectCheckboxes(indexes)` | `void` | `indexes: number[]` | Select checkboxes by row indexes |
| `clearSelection()` | `clearSelection()` | `void` | - | Deselect all rows/cells |
| `getSelectedRowIndexes()` | `getSelectedRowIndexes()` | `number[]` | - | Get selected row indexes |
| `getSelectedRecords()` | `getSelectedRecords()` | `Object[]` | - | Get selected record data |
| `getSelectedRows()` | `getSelectedRows()` | `Element[]` | - | Get selected row elements |
| `getSelectedRowCellIndexes()` | `getSelectedRowCellIndexes()` | `ISelectedCell[]` | - | Get selected cell indexes |
| `getCheckedRecords()` | `getCheckedRecords()` | `Object[]` | - | Get records with checked checkboxes |
| `getCheckedRowIndexes()` | `getCheckedRowIndexes()` | `number[]` | - | Get indexes of checked rows |

## Expand/Collapse Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `expandAll()` | `expandAll()` | `Promise<Object>` | - | Expand all rows |
| `expandAtLevel()` | `expandAtLevel(level)` | `Promise<Object>` | `level: number` | Expand all at specific level |
| `expandByKey()` | `expandByKey(key)` | `Promise<Object>` | `key: Object` | Expand by primary key |
| `expandRow()` | `expandRow(row, record?, key?, level?)` | `Promise<Object>` | `row: HTMLTableRowElement \| number` | Expand specific row |
| `collapseAll()` | `collapseAll()` | `Promise<Object>` | - | Collapse all rows |
| `collapseAtLevel()` | `collapseAtLevel(level)` | `Promise<Object>` | `level: number` | Collapse all at specific level |
| `collapseByKey()` | `collapseByKey(key)` | `Promise<Object>` | `key: Object` | Collapse by primary key |
| `collapseRow()` | `collapseRow(row, record?, key?)` | `Promise<Object>` | `row: HTMLTableRowElement` | Collapse specific row |

## Filtering & Sorting Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `filterByColumn()` | `filterByColumn(fieldName, operator, value, predicate?, matchCase?, ignoreAccent?)` | `void` | `fieldName: string, operator: string, value: any` | Filter column by criteria |
| `clearFiltering()` | `clearFiltering()` | `void` | - | Clear all filters |
| `sortByColumn()` | `sortByColumn(columnName, direction, isMultiSort?)` | `void` | `columnName: string, direction: 'Ascending' \| 'Descending'` | Sort column |
| `clearSorting()` | `clearSorting()` | `void` | - | Clear all sorting |
| `search()` | `search(searchString)` | `void` | `searchString: string` | Search records |

## Export Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `excelExport()` | `excelExport(excelExportProperties?, isMultipleExport?, workbook?, isBlob?)` | `Promise<Object>` | Optional: properties, multiExport flag, workbook, blob flag | Export to Excel (.xlsx) |
| `pdfExport()` | `pdfExport(pdfExportProperties?, isMultipleExport?, pdfDoc?, isBlob?)` | `Promise<Object>` | Optional: properties, multiExport flag, PDF doc, blob flag | Export to PDF |
| `csvExport()` | `csvExport(excelExportProperties?, isMultipleExport?, workbook?, isBlob?)` | `Promise<Object>` | Same as excelExport | Export to CSV |
| `serverExcelExport()` | `serverExcelExport(url)` | `void` | `url: string` | Server-side Excel export |
| `serverPdfExport()` | `serverPdfExport(url)` | `void` | `url: string` | Server-side PDF export |
| `serverCsvExport()` | `serverCsvExport(url)` | `void` | `url: string` | Server-side CSV export |

## Editing Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `startEdit()` | `startEdit(target?)` | `void` | `target?: Object` | Start row edit mode |
| `endEdit()` | `endEdit()` | `void` | - | Commit edits |
| `closeEdit()` | `closeEdit()` | `void` | - | Cancel edits without saving |
| `editCell()` | `editCell(rowIndex?, field?)` | `void` | `rowIndex?: number, field?: string` | Start cell edit |
| `saveCell()` | `saveCell()` | `void` | - | Save cell changes |
| `updateCell()` | `updateCell(rowIndex, field, value)` | `void` | `rowIndex: number, field: string, value: any` | Update cell directly |
| `getBatchChanges()` | `getBatchChanges()` | `Object` | - | Get batch mode changes (added, updated, deleted) |

## UI Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `hideColumns()` | `hideColumns(keys, hideBy?)` | `void` | `keys: string \| string[], hideBy?: 'field' \| 'headerText'` | Hide columns |
| `showColumns()` | `showColumns(keys, showBy?)` | `void` | `keys: string \| string[], showBy?: 'field' \| 'headerText'` | Show columns |
| `reorderColumns()` | `reorderColumns(fromFName, toFName)` | `void` | `fromFName: string \| string[], toFName: string` | Reorder columns |
| `reorderRows()` | `reorderRows(fromIndexes, toIndex, position)` | `void` | `fromIndexes: number[], toIndex: number, position: string` | Reorder rows (above/below/child) |
| `autoFitColumns()` | `autoFitColumns(fieldNames?)` | `void` | `fieldNames?: string \| string[]` | Auto-fit columns to content |
| `indent()` | `indent(record?)` | `void` | `record?: Object` | Indent record one level deeper |
| `outdent()` | `outdent(record?)` | `void` | `record?: Object` | Outdent record one level up |
| `enableToolbarItems()` | `enableToolbarItems(items, isEnable)` | `void` | `items: string[], isEnable: boolean` | Enable/disable toolbar items |
| `openColumnChooser()` | `openColumnChooser(x?, y?)` | `void` | `x?: number, y?: number` | Open column chooser dialog |
| `print()` | `print()` | `void` | - | Print TreeGrid |
| `copy()` | `copy(withHeader?)` | `void` | `withHeader?: boolean` | Copy selected to clipboard |
| `paste()` | `paste(data, rowIndex, colIndex)` | `void` | `data: string, rowIndex: number, colIndex: number` | Paste from clipboard |
| `showSpinner()` | `showSpinner()` | `void` | - | Show loading spinner |
| `hideSpinner()` | `hideSpinner()` | `void` | - | Hide loading spinner |

## Navigation Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `goToPage()` | `goToPage(pageNo)` | `void` | `pageNo: number` | Navigate to page |
| `getPageSizeByHeight()` | `getPageSizeByHeight(containerHeight?)` | `number` | `containerHeight?: number \| string` | Calculate optimal page size |

## Data Access Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getCurrentViewRecords()` | `getCurrentViewRecords()` | `Object[]` | - | Get visible records (current view) |
| `getVisibleRecords()` | `getVisibleRecords()` | `Object[]` | - | Get visible records by state |
| `getVisibleColumns()` | `getVisibleColumns()` | `Column[]` | - | Get visible columns |
| `getColumns()` | `getColumns(isRefresh?)` | `Column[]` | `isRefresh?: boolean` | Get all columns |
| `getColumnByField()` | `getColumnByField(field)` | `Column` | `field: string` | Get column by field name |
| `getColumnByUid()` | `getColumnByUid(uid)` | `Column` | `uid: string` | Get column by UID |
| `getColumnFieldNames()` | `getColumnFieldNames()` | `string[]` | - | Get all column field names |
| `getPrimaryKeyFieldNames()` | `getPrimaryKeyFieldNames()` | `string[]` | - | Get primary key field names |
| `getDataModule()` | `getDataModule()` | `Object` | - | Get data handling modules |

## Column/Header Access Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getColumnIndexByField()` | `getColumnIndexByField(field)` | `number` | `field: string` | Get column index by field |
| `getColumnIndexByUid()` | `getColumnIndexByUid(uid)` | `number` | `uid: string` | Get column index by UID |
| `getUidByColumnField()` | `getUidByColumnField(field)` | `string` | `field: string` | Get UID by field name |
| `getColumnHeaderByField()` | `getColumnHeaderByField(field)` | `Element` | `field: string` | Get header element by field |
| `getColumnHeaderByIndex()` | `getColumnHeaderByIndex(index)` | `Element` | `index: number` | Get header element by index |
| `getColumnHeaderByUid()` | `getColumnHeaderByUid(uid)` | `Element` | `uid: string` | Get header element by UID |

## Row Access Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getRowByIndex()` | `getRowByIndex(index)` | `Element` | `index: number` | Get row element by index |
| `getRows()` | `getRows()` | `HTMLTableRowElement[]` | - | Get all row elements |
| `getDataRows()` | `getDataRows()` | `Element[]` | - | Get data row elements (exclude summary) |
| `getRowInfo()` | `getRowInfo(target)` | `RowInfo` | `target: Element \| EventTarget` | Get row info from element |

## Cell Access Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getCellFromIndex()` | `getCellFromIndex(rowIndex, columnIndex)` | `Element` | `rowIndex: number, columnIndex: number` | Get cell by row/col index |
| `getMovableCellFromIndex()` | `getMovableCellFromIndex(rowIndex, columnIndex)` | `Element` | `rowIndex: number, columnIndex: number` | Get movable cell |
| `getFrozenRightCellFromIndex()` | `getFrozenRightCellFromIndex(rowIndex, columnIndex)` | `Element` | `rowIndex: number, columnIndex: number` | Get frozen right cell |

## Frozen Column Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getFrozenLeftColumnHeaderByIndex()` | `getFrozenLeftColumnHeaderByIndex(index)` | `Element` | `index: number` | Get frozen left header |
| `getFrozenRightColumnHeaderByIndex()` | `getFrozenRightColumnHeaderByIndex(index)` | `Element` | `index: number` | Get frozen right header |
| `getFrozenRightDataRows()` | `getFrozenRightDataRows()` | `Element[]` | - | Get frozen right data rows |
| `getFrozenRightRowByIndex()` | `getFrozenRightRowByIndex(index)` | `Element` | `index: number` | Get frozen right row |
| `getFrozenRightRows()` | `getFrozenRightRows()` | `Element[]` | - | Get all frozen right rows |

## Movable Column Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getMovableColumnHeaderByIndex()` | `getMovableColumnHeaderByIndex(index)` | `Element` | `index: number` | Get movable header |
| `getMovableDataRows()` | `getMovableDataRows()` | `Element[]` | - | Get movable data rows |
| `getMovableRowByIndex()` | `getMovableRowByIndex(index)` | `Element` | `index: number` | Get movable row |
| `getMovableRows()` | `getMovableRows()` | `Element[]` | - | Get all movable rows |

## DOM Access Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `getContent()` | `getContent()` | `Element` | - | Get main content DIV |
| `getContentTable()` | `getContentTable()` | `Element` | - | Get content table |
| `getHeaderContent()` | `getHeaderContent()` | `Element` | - | Get header content |
| `getHeaderTable()` | `getHeaderTable()` | `Element` | - | Get header table |
| `getFooterContent()` | `getFooterContent()` | `Element` | - | Get footer content |
| `getFooterContentTable()` | `getFooterContentTable()` | `Element` | - | Get footer table |
| `getPager()` | `getPager()` | `Element` | - | Get pager element |

## Utility Methods

| Method | Signature | Returns | Parameters | Description |
|--------|-----------|---------|-----------|-------------|
| `updateExternalMessage()` | `updateExternalMessage(message)` | `void` | `message: string` | Update pager message |
| `destroy()` | `destroy()` | `void` | - | Destroy component and cleanup |

## Total: 60+ Methods Documented

