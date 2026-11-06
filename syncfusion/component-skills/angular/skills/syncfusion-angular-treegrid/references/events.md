---
name: Events Reference (Table)
description: 'Complete table reference for all Syncfusion Angular TreeGrid events.'
---

# TreeGrid Events - Table Reference

## When to Use

Use events when you need to:
- **Handle user actions** — Respond to clicks, edits, selections
- **Validate data** — Execute validation logic before operations
- **Cancel operations** — Prevent unwanted actions (cancelable events)
- **Async operations** — Handle async work in event handlers
- **Side effects** — Trigger updates in other components
- **Audit changes** — Log user interactions and data changes
- **Custom workflows** — Implement business logic around events

## Data Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `dataBound` | `EmitType<Object>` | - | No | Fires when data source is populated |
| `beforeDataBound` | `EmitType<BeforeDataBoundArgs>` | `cancel, data` | Yes | Fires before data binding |
| `dataSourceChanged` | `EmitType<DataSourceChangedEventArgs>` | `action, data, endEdit()` | Yes | Fires on data add/edit/delete, requires `endEdit()` for async |
| `dataStateChange` | `EmitType<DataStateChangeEventArgs>` | `action, currentPage, pageSize` | No | Fires on sort/page/filter complete |

## Action Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `actionBegin` | `EmitType<ActionBeginEventArgs>` | `action, requestType, data` | Yes | Fires when action starts (sort, filter, page, search, edit) |
| `actionComplete` | `EmitType<ActionCompleteEventArgs>` | `action, requestType, result` | No | Fires when action completes |
| `actionFailure` | `EmitType<FailureEventArgs>` | `error` | No | Fires when action fails |

## Selection Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `rowSelecting` | `EmitType<RowSelectingEventArgs>` | `rowIndex, rowData, data` | Yes | Fires before row selection |
| `rowSelected` | `EmitType<RowSelectEventArgs>` | `rowIndex, rowData, rowElement` | No | Fires after row selection |
| `rowDeselecting` | `EmitType<RowDeselectEventArgs>` | `rowIndex, rowData, data` | Yes | Fires before row deselection |
| `rowDeselected` | `EmitType<RowDeselectEventArgs>` | `rowIndex, rowData, data` | No | Fires after row deselection |
| `cellSelecting` | `EmitType<CellSelectingEventArgs>` | `cellIndex, data` | Yes | Fires before cell selection |
| `cellSelected` | `EmitType<CellSelectEventArgs>` | `cellIndex, data, cell` | No | Fires after cell selection |
| `cellDeselecting` | `EmitType<CellDeselectEventArgs>` | `cellIndex, data` | Yes | Fires before cell deselection |
| `cellDeselected` | `EmitType<CellDeselectEventArgs>` | `cellIndex, data` | No | Fires after cell deselection |
| `checkboxChange` | `EmitType<CheckBoxChangeEventArgs>` | `rowIndex, rowData` | Yes | Fires on checkbox toggle |

## Expand/Collapse Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `expanding` | `EmitType<RowExpandingEventArgs>` | `rowIndex, rowData` | Yes | Fires while row expanding |
| `expanded` | `EmitType<RowExpandedEventArgs>` | `rowIndex, rowData` | No | Fires after row expanded |
| `collapsing` | `EmitType<RowCollapsingEventArgs>` | `rowIndex, rowData` | Yes | Fires while row collapsing |
| `collapsed` | `EmitType<RowCollapsedEventArgs>` | `rowIndex, rowData` | No | Fires after row collapsed |

## Edit Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `beginEdit` | `EmitType<BeginEditEventArgs>` | `rowIndex, rowData, requestType` | Yes | Fires before edit starts |
| `cellEdit` | `EmitType<CellEditEventArgs>` | `rowIndex, value, previousValue, column` | Yes | Fires when editing cell |
| `cellSave` | `EmitType<CellSaveEventArgs>` | `rowIndex, value, previousValue, column` | Yes | Fires when saving cell |
| `cellSaved` | `EmitType<CellSaveEventArgs>` | `rowIndex, value, column` | No | Fires after cell saved |
| `beforeBatchAdd` | `EmitType<BeforeBatchAddArgs>` | `data` | Yes | Fires before batch add |
| `batchAdd` | `EmitType<BatchAddArgs>` | `data` | No | Fires on batch add |
| `beforeBatchDelete` | `EmitType<BeforeBatchDeleteArgs>` | `data` | Yes | Fires before batch delete |
| `batchDelete` | `EmitType<BatchDeleteArgs>` | `data` | No | Fires on batch delete |
| `beforeBatchSave` | `EmitType<BeforeBatchSaveArgs>` | `addedRecords, changedRecords, deletedRecords` | Yes | Fires before batch save |
| `batchCancel` | `EmitType<BatchCancelArgs>` | `data` | No | Fires on batch cancel |

## Drag & Drop Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `rowDragStartHelper` | `EmitType<RowDragEventArgs>` | `rowIndex, rowData` | Yes | Fires just before row drag |
| `rowDragStart` | `EmitType<RowDragEventArgs>` | `rowIndex, rowData, data` | No | Fires when row drag starts |
| `rowDrag` | `EmitType<RowDragEventArgs>` | `rowIndex, rowData` | No | Fires continuously during drag |
| `rowDrop` | `EmitType<RowDragEventArgs>` | `rowIndex, dropIndex, dropPosition` | Yes | Fires when row dropped |

## Menu Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `contextMenuOpen` | `EmitType<BeforeOpenCloseMenuEventArgs>` | `element, event` | No | Fires before context menu opens |
| `contextMenuClick` | `EmitType<MenuEventArgs>` | `item, element` | No | Fires on context menu item click |
| `columnMenuOpen` | `EmitType<ColumnMenuOpenEventArgs>` | `column` | Yes | Fires before column menu opens |
| `columnMenuClick` | `EmitType<MenuEventArgs>` | `item, element` | No | Fires on column menu item click |
| `toolbarClick` | `EmitType<ClickEventArgs>` | `item, originalEvent` | Yes | Fires on toolbar item click |

## Column Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `columnDragStart` | `EmitType<ColumnDragEventArgs>` | `column, columns` | No | Fires when column drag starts |
| `columnDrag` | `EmitType<ColumnDragEventArgs>` | `column` | No | Fires continuously during column drag |
| `columnDrop` | `EmitType<ColumnDragEventArgs>` | `column` | No | Fires when column dropped |
| `resizeStart` | `EmitType<ResizeArgs>` | `column` | Yes | Fires when column resize starts |
| `resizing` | `EmitType<ResizeArgs>` | `column` | No | Fires during column resize |
| `resizeStop` | `EmitType<ResizeArgs>` | `column` | No | Fires when column resize ends |

## Export Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `beforeExcelExport` | `EmitType<Object>` | - | Yes | Fires before Excel export |
| `excelQueryCellInfo` | `EmitType<ExcelQueryCellInfoEventArgs>` | `cell, data, column` | No | Fires before each cell exports to Excel |
| `excelHeaderQueryCellInfo` | `EmitType<ExcelHeaderQueryCellInfoEventArgs>` | `cell, column` | No | Fires before header cell exports to Excel |
| `excelAggregateQueryCellInfo` | `EmitType<AggregateQueryCellInfoEventArgs>` | `cell, column, aggregateType` | No | Fires before aggregate cell exports to Excel |
| `excelExportComplete` | `EmitType<ExcelExportCompleteArgs>` | `promise` | No | Fires after Excel export completes |
| `beforePdfExport` | `EmitType<Object>` | - | Yes | Fires before PDF export |
| `pdfQueryCellInfo` | `EmitType<PdfQueryCellInfoEventArgs>` | `cell, data, column, style` | No | Fires before each cell exports to PDF |
| `pdfHeaderQueryCellInfo` | `EmitType<PdfHeaderQueryCellInfoEventArgs>` | `cell, column` | No | Fires before header cell exports to PDF |
| `pdfAggregateQueryCellInfo` | `EmitType<AggregateQueryCellInfoEventArgs>` | `cell, column, aggregateType` | No | Fires before aggregate cell exports to PDF |
| `pdfExportComplete` | `EmitType<PdfExportCompleteArgs>` | `promise` | No | Fires after PDF export completes |

## Print Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `beforePrint` | `EmitType<PrintEventArgs>` | - | Yes | Fires before print action |
| `printComplete` | `EmitType<PrintEventArgs>` | - | No | Fires after print completes |

## Query Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `queryCellInfo` | `EmitType<QueryCellInfoEventArgs>` | `data, cell, column, rowIndex, colIndex` | No | Fires on cell access/info request |
| `rowDataBound` | `EmitType<RowDataBoundEventArgs>` | `data, row, rowIndex` | No | Fires on row access/info request |
| `headerCellInfo` | `EmitType<HeaderCellInfoEventArgs>` | `cell, column` | No | Fires on header access request |
| `detailDataBound` | `EmitType<DetailDataBoundEventArgs>` | `data, rowIndex` | No | Fires after detail row expands |
| `recordDoubleClick` | `EmitType<RecordDoubleClickEventArgs>` | `data, rowIndex, column, cell` | Yes | Fires on record double-click |

## Copy/Paste Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `beforeCopy` | `EmitType<BeforeCopyEventArgs>` | `data` | Yes | Fires before copy action |
| `beforePaste` | `EmitType<BeforePasteEventArgs>` | `data` | Yes | Fires before paste action |

## Lifecycle Events

| Event | Type | Args | Cancelable | Description |
|-------|------|------|-----------|-------------|
| `load` | `EmitType<Object>` | - | No | Fires before initial render, customize properties |
| `created` | `EmitType<Object>` | - | No | Fires when component fully created |

## Event Categories Summary

| Category | Count | Key Events |
|----------|-------|-----------|
| **Data Events** | 4 | dataBound, beforeDataBound, dataSourceChanged, dataStateChange |
| **Action Events** | 3 | actionBegin, actionComplete, actionFailure |
| **Selection Events** | 9 | rowSelecting, rowSelected, cellSelecting, checkboxChange |
| **Expand/Collapse Events** | 4 | expanding, expanded, collapsing, collapsed |
| **Edit Events** | 10 | beginEdit, cellEdit, cellSave, batch operations |
| **Drag & Drop Events** | 4 | rowDragStart, rowDrag, rowDrop |
| **Menu Events** | 5 | contextMenuClick, columnMenuClick, toolbarClick |
| **Column Events** | 6 | columnDragStart, columnDrop, resizeStart, resizing, resizeStop |
| **Export Events** | 10 | beforeExcelExport, excelQueryCellInfo, pdfExportComplete |
| **Print Events** | 2 | beforePrint, printComplete |
| **Query Events** | 5 | queryCellInfo, rowDataBound, headerCellInfo, recordDoubleClick |
| **Copy/Paste Events** | 2 | beforeCopy, beforePaste |
| **Lifecycle Events** | 2 | load, created |
| **TOTAL** | **56+** | All TreeGrid events |

## Event Patterns

### Cancelable Events (event.cancel = true)
```
rowSelecting, cellSelecting, rowDeselecting, cellDeselecting, checkboxChange,
expanding, collapsing, beginEdit, cellEdit, cellSave,
rowDragStartHelper, rowDrop,
columnMenuOpen, toolbarClick,
resizeStart,
beforeExcelExport, beforePdfExport, beforePrint,
recordDoubleClick, beforeCopy, beforePaste
```

### Async Operations (require event.endEdit())
```
dataSourceChanged - when action is 'add' or 'edit'
Always call event.endEdit() even on error
```

### Export Customization Events
```
Excel: excelQueryCellInfo (cell level), excelHeaderQueryCellInfo (header level)
PDF: pdfQueryCellInfo (cell level), pdfHeaderQueryCellInfo (header level)
Both: excelAggregateQueryCellInfo, pdfAggregateQueryCellInfo (aggregates)
```

