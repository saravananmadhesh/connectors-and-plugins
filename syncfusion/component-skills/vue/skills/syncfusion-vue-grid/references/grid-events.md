# Grid Events

## Table of Contents

- [Overview](#overview)
- [When to Use](#when-to-use)
- [Data Binding Events](#data-binding-events)
- [Action Events](#action-events)
- [Editing Events](#editing-events)
- [Selection Events](#selection-events)
- [Column Events](#column-events)
- [Sorting and Filtering Events](#sorting-and-filtering-events)
- [Grouping Events](#grouping-events)
- [Row Events](#row-events)
- [Cell Events](#cell-events)
- [Export and Print Events](#export-and-print-events)
- [Menu Events](#menu-events)
- [Template Events](#template-events)
- [Batch Mode Events](#batch-mode-events)
- [Lifecycle Events](#lifecycle-events)

## Overview

Grid events allow you to respond to user interactions and Grid state changes. Events are triggered at specific points in the Grid's lifecycle and when users perform actions like editing, selecting, sorting, and filtering.

## When to Use

Use Grid events to:
- Respond to user interactions (clicking, double-clicking, dragging)
- Validate data during editing
- Customize Grid behavior dynamically
- Update external UI based on Grid changes
- Perform custom actions before or after Grid operations
- Handle data binding and state changes
- Monitor selection changes
- Respond to export and print operations
- Track sorting, filtering, and grouping changes

## Data Binding Events

### load
Type: `EmitType<Object>`

This event allows customization of Grid properties before rendering.

**Usage:** Use this event to modify Grid settings before the component initializes.

### beforeDataBound
Type: `EmitType<BeforeDataBoundArgs>`

Triggers before data is bound to Grid.

**Usage:** Use this event to modify data or cancel data binding if necessary.

### dataBound
Type: `EmitType<Object>`

Triggers when data source is populated in the Grid.

**Usage:** Use this event after initial data binding is complete to perform post-binding operations.

### dataSourceChanged
Type: `EmitType<DataSourceChangedEventArgs>`

Triggers when the grid data is added, deleted and updated. Invoke the done method from the argument to start render after edit operation.

**Usage:** Use this event to track changes to the data source.

### dataStateChange
Type: `EmitType<DataStateChangeEventArgs>`

Triggers when the grid actions such as Sorting, Paging, Grouping etc., are done. In this event, the current view data and total record count should be assigned to the `dataSource` based on the action performed.

**Usage:** Use this event in remote data binding scenarios to update your data source.

### columnDataStateChange
Type: `EmitType<ColumnDataStateChangeEventArgs>`

Triggers when the grid actions such as Sorting, Paging, Grouping etc., are done to get column `dataSource`. In this event, the current view column data and total record count should be assigned to the column `dataSource` based on the action performed.

**Usage:** Use this event for dynamic column data updates.

## Action Events

### actionBegin
Type: `EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs | NotifyArgs | ReorderEventArgs>`

Triggers when Grid actions such as sorting, filtering, paging, grouping etc., starts.

**Usage:** Use this event to perform actions before Grid operations complete.

### actionComplete
Type: `EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs | NotifyArgs | ReorderEventArgs>`

Triggers when Grid actions such as sorting, filtering, paging, grouping etc. are completed.

**Usage:** Use this event to perform actions after Grid operations are finished.

### actionFailure
Type: `EmitType<FailureEventArgs>`

Triggers when any Grid action failed to achieve the desired results.

**Usage:** Use this event to handle errors and display appropriate messages to users.

## Editing Events

### beginEdit
Type: `EmitType<BeginEditArgs>`

Triggers before the record is to be edit.

**Usage:** Use this event to perform validation or modifications before editing starts.

### cellEdit
Type: `EmitType<CellEditArgs>`

Triggers when the cell is being edited.

**Usage:** Use this event to implement custom cell editing logic or validation.

### cellSave
Type: `EmitType<CellSaveArgs>`

Triggers when the cell is being saved.

**Usage:** Use this event to validate and process cell data before saving.

### cellSaved
Type: `EmitType<CellSaveArgs>`

Triggers after the cell is saved.

**Usage:** Use this event to perform actions after a cell is successfully saved.

### batchAdd
Type: `EmitType<BatchAddArgs>`

Triggers when records are added in batch mode.

**Usage:** Use this event to track additions in batch editing mode.

### beforeBatchAdd
Type: `EmitType<BeforeBatchAddArgs>`

Triggers before records are added in batch mode.

**Usage:** Use this event to validate or cancel batch additions.

### batchDelete
Type: `EmitType<BatchDeleteArgs>`

Triggers when records are deleted in batch mode.

**Usage:** Use this event to track deletions in batch editing mode.

### beforeBatchDelete
Type: `EmitType<BeforeBatchDeleteArgs>`

Triggers before records are deleted in batch mode.

**Usage:** Use this event to validate or cancel batch deletions.

### batchCancel
Type: `EmitType<BatchCancelArgs>`

Triggers when cancel the batch edit changes batch mode.

**Usage:** Use this event when batch editing is cancelled.

### beforeBatchSave
Type: `EmitType<BeforeBatchSaveArgs>`

Triggers before records are saved in batch mode.

**Usage:** Use this event to validate all batch changes before final save.

## Selection Events

### rowSelected
Type: `EmitType<RowSelectEventArgs>`

Triggers after a row is selected.

**Usage:** Use this event to perform actions when a row is selected.

### rowSelecting
Type: `EmitType<RowSelectingEventArgs>`

Triggers before row selection occurs.

**Usage:** Use this event to prevent selection of specific rows if needed.

### rowDeselected
Type: `EmitType<RowDeselectEventArgs>`

Triggers when a selected row is deselected.

**Usage:** Use this event to perform actions when a row is deselected.

### rowDeselecting
Type: `EmitType<RowDeselectingEventArgs>`

Triggers before deselecting the selected row.

**Usage:** Use this event to prevent deselection if necessary.

### cellSelected
Type: `EmitType<CellSelectEventArgs>`

Triggers after a cell is selected.

**Usage:** Use this event to perform actions when a cell is selected.

### cellSelecting
Type: `EmitType<CellSelectingEventArgs>`

Triggers before any cell selection occurs.

**Usage:** Use this event to prevent selection of specific cells if needed.

### cellDeselected
Type: `EmitType<CellDeselectEventArgs>`

Triggers when a particular selected cell is deselected.

**Usage:** Use this event to perform actions when a cell is deselected.

### cellDeselecting
Type: `EmitType<CellDeselectEventArgs>`

Triggers before the selected cell is deselecting.

**Usage:** Use this event to prevent deselection if necessary.

### columnSelected
Type: `EmitType<ColumnSelectEventArgs>`

Triggers after a column is selected.

**Usage:** Use this event to perform actions when a column is selected.

### columnSelecting
Type: `EmitType<ColumnSelectingEventArgs>`

Triggers before column selection occurs.

**Usage:** Use this event to prevent selection of specific columns if needed.

### columnDeselected
Type: `EmitType<ColumnDeselectEventArgs>`

Triggers when a selected column is deselected.

**Usage:** Use this event to perform actions when a column is deselected.

### columnDeselecting
Type: `EmitType<ColumnDeselectEventArgs>`

Triggers before deselecting the selected column.

**Usage:** Use this event to prevent deselection if necessary.

### checkBoxChange
Type: `EmitType<CheckBoxChangeEventArgs>`

Triggers when the check box state change in checkbox column.

**Usage:** Use this event to track checkbox selection changes.

## Column Events

### columnDrag
Type: `EmitType<ColumnDragEventArgs>`

Triggers when column header element is dragged (moved) continuously.

**Usage:** Use this event to monitor column reordering in progress.

### columnDragStart
Type: `EmitType<ColumnDragEventArgs>`

Triggers when column header element drag (move) starts.

**Usage:** Use this event when a column drag operation begins.

### columnDrop
Type: `EmitType<ColumnDragEventArgs>`

Triggers when a column header element is dropped on the target column.

**Usage:** Use this event to respond to column reordering completion.

### resizing
Type: `EmitType<ResizeArgs>`

Triggers on column resizing.

**Usage:** Use this event to monitor column resize operations in progress.

### resizeStart
Type: `EmitType<ResizeArgs>`

Triggers when column resize starts.

**Usage:** Use this event when a column resize operation begins.

### resizeStop
Type: `EmitType<ResizeArgs>`

Triggers when column resize ends.

**Usage:** Use this event to respond to column resize completion.

## Sorting and Filtering Events

### beforeCustomFilterOpen
Type: `EmitType<BeforeCustomFilterOpenEventArgs>`

Event triggered before the custom filter dialog is opened.

**Usage:** Use this event to customize the filter dialog behavior.

## Grouping Events

### lazyLoadGroupExpand
Type: `EmitType<LazyLoadArgs>`

Triggers when expand the caption row in lazy load grouping.

**Usage:** Use this event to load child data when a group is expanded.

### lazyLoadGroupCollapse
Type: `EmitType<LazyLoadArgs>`

Triggers when collapse the caption row in lazy load grouping.

**Usage:** Use this event when a group is collapsed in lazy loading mode.

## Row Events

### recordClick
Type: `EmitType<RecordClickEventArgs>`

Triggers when record is clicked.

**Usage:** Use this event to respond to row clicks.

### recordDoubleClick
Type: `EmitType<RecordDoubleClickEventArgs>`

Triggers when record is double clicked.

**Usage:** Use this event to open edit mode or detail views on double-click.

### rowDataBound
Type: `EmitType<RowDataBoundEventArgs>`

Triggered every time a request is made to access row information, element, or data. This will be triggered before the row element is appended to the Grid element.

**Usage:** Use this event to customize row styling or content dynamically.

### rowDrag
Type: `EmitType<RowDragEventArgs>`

Triggers when row elements are dragged (moved) continuously.

**Usage:** Use this event to monitor row drag operations in progress.

### rowDragStart
Type: `EmitType<RowDragEventArgs>`

Triggers when row element's drag(move) starts.

**Usage:** Use this event when a row drag operation begins.

### rowDragStartHelper
Type: `EmitType<RowDragEventArgs>`

Triggers when row element's before drag(move).

**Usage:** Use this event before drag operation starts.

### rowDrop
Type: `EmitType<RowDragEventArgs>`

Triggers when row elements are dropped on the target row.

**Usage:** Use this event to respond to row drop completion.

## Cell Events

### queryCellInfo
Type: `EmitType<QueryCellInfoEventArgs>`

Triggered every time a request is made to access cell information, element, or data. This will be triggered before the cell element is appended to the Grid element.

**Usage:** Use this event to customize cell styling, content, or attributes dynamically.

## Export and Print Events

### beforeExcelExport
Type: `EmitType<Object>`

Triggers before Grid data is exported to Excel file.

**Usage:** Use this event to customize Excel export settings or cancel export.

### excelQueryCellInfo
Type: `EmitType<ExcelQueryCellInfoEventArgs>`

Triggers before exporting each cell to Excel file. You can also customize the Excel cells.

**Usage:** Use this event to customize individual cell formatting in Excel export.

### excelHeaderQueryCellInfo
Type: `EmitType<ExcelHeaderQueryCellInfoEventArgs>`

Triggers before exporting each header cell to Excel file. You can also customize the Excel cells.

**Usage:** Use this event to customize header cell formatting in Excel export.

### excelAggregateQueryCellInfo
Type: `EmitType<AggregateQueryCellInfoEventArgs>`

Triggers before exporting aggregate cell to Excel document. You can also customize the PDF cells.

**Usage:** Use this event to customize aggregate cell formatting in Excel export.

### excelExportComplete
Type: `EmitType<ExcelExportCompleteArgs>`

Triggers after Grid data is exported to Excel file.

**Usage:** Use this event after Excel export is complete.

### beforePdfExport
Type: `EmitType<Object>`

Triggers before Grid data is exported to PDF document.

**Usage:** Use this event to customize PDF export settings or cancel export.

### pdfQueryCellInfo
Type: `EmitType<PdfQueryCellInfoEventArgs>`

Triggers before exporting each cell to PDF document. You can also customize the PDF cells.

**Usage:** Use this event to customize individual cell formatting in PDF export.

### pdfHeaderQueryCellInfo
Type: `EmitType<PdfHeaderQueryCellInfoEventArgs>`

Triggers before exporting each header cell to PDF document. You can also customize the PDF cells.

**Usage:** Use this event to customize header cell formatting in PDF export.

### pdfAggregateQueryCellInfo
Type: `EmitType<AggregateQueryCellInfoEventArgs>`

Triggers before exporting aggregate cell to PDF document. You can also customize the PDF cells.

**Usage:** Use this event to customize aggregate cell formatting in PDF export.

### pdfExportComplete
Type: `EmitType<PdfExportCompleteArgs>`

Triggers after Grid data is exported to PDF document.

**Usage:** Use this event after PDF export is complete.

### exportDetailDataBound
Type: `EmitType<ExportDetailDataBoundEventArgs>`

Triggers before exporting each detail Grid to PDF document.

**Usage:** Use this event to customize detail grid export.

### exportDetailTemplate
Type: `EmitType<ExportDetailTemplateEventArgs>`

Triggers before exporting each detail template.

**Usage:** Use this event to customize detail template exports.

### exportGroupCaption
Type: `EmitType<ExportGroupCaptionEventArgs>`

Triggers before exporting each caption row to PDF/Excel/CSV document. You can also customize the export caption row values.

**Usage:** Use this event to customize group caption formatting in exports.

### beforePrint
Type: `EmitType<PrintEventArgs>`

Triggers before the print action starts.

**Usage:** Use this event to customize print settings or cancel printing.

### printComplete
Type: `EmitType<PrintEventArgs>`

Triggers after print action is completed.

**Usage:** Use this event after printing is complete.

## Menu Events

### columnMenuClick
Type: `EmitType<MenuEventArgs>`

Triggers when click on column menu.

**Usage:** Use this event to respond to column menu item clicks.

### columnMenuOpen
Type: `EmitType<ColumnMenuOpenEventArgs>`

Triggers before column menu opens.

**Usage:** Use this event to customize or cancel column menu opening.

### columnMenuClose
Type: `EmitType<ColumnMenuOpenEventArgs>`

Triggers before the column menu closes. This event allows you to perform custom actions or cancel the closing of the column menu.

**Usage:** Use this event when column menu is about to close.

### contextMenuClick
Type: `EmitType<ContextMenuClickEventArgs>`

Triggers when click on context menu.

**Usage:** Use this event to respond to context menu item clicks.

### contextMenuOpen
Type: `EmitType<ContextMenuOpenEventArgs>`

Triggers before context menu opens.

**Usage:** Use this event to customize or cancel context menu opening.

### contextMenuClose
Type: `EmitType<ContextMenuOpenEventArgs>`

Triggers before the context menu closes. This event allows you to perform custom actions or cancel the closing of the context menu.

**Usage:** Use this event when context menu is about to close.

## Template Events

### detailExpand
Type: `EmitType<DetailExpandCollapseArgs>`

Triggers before expanding the detail row. This event allows to perform customize actions or cancel the expansion of the detail row.

**Usage:** Use this event to control detail row expansion behavior.

### detailDataBound
Type: `EmitType<DetailDataBoundEventArgs>`

Triggers after detail row expands.

**Note:** This event triggers at initial expand.

**Usage:** Use this event after detail row data is bound.

### detailCollapse
Type: `EmitType<DetailExpandCollapseArgs>`

Triggers before collapsing the detail row. This event allows to perform customize actions or cancel the collapse of the detail row.

**Usage:** Use this event to control detail row collapse behavior.

### beforeDetailTemplateDetach
Type: `EmitType<DetailTemplateDetachArgs>`

Event triggered before a detail template row is removed from the DOM. This event allows executing necessary cleanup operations or additional actions before the detail row is detached.

**Usage:** Use this event to perform cleanup before a detail row is removed.

### headerCellInfo
Type: `EmitType<HeaderCellInfoEventArgs>`

Triggered for stacked header.

**Usage:** Use this event to customize stacked header cells.

## Batch Mode Events

### beforeAutoFill
Type: `EmitType<BeforeAutoFillEventArgs>`

Triggers before Grid autoFill action.

**Usage:** Use this event to control or cancel autoFill behavior.

### beforeCopy
Type: `EmitType<BeforeCopyEventArgs>`

Triggers before Grid copy action.

**Usage:** Use this event to customize or cancel copy operations.

### beforePaste
Type: `EmitType<BeforePasteEventArgs>`

Triggers before Grid paste action.

**Usage:** Use this event to validate or customize pasted data.

## UI Events

### keyPressed
Type: `EmitType<KeyboardEventArgs>`

Triggers when any keyboard keys are pressed inside the grid.

**Usage:** Use this event to handle keyboard shortcuts or custom key actions.

### beforeOpenAdaptiveDialog
Type: `EmitType<AdaptiveDialogEventArgs>`

Triggers before adaptive filter and sort dialogs open.

**Usage:** Use this event to customize adaptive dialogs.

### beforeOpenColumnChooser
Type: `EmitType<ColumnChooserEventArgs>`

Triggers before the columnChooser open.

**Usage:** Use this event to customize column chooser behavior.

## Lifecycle Events

### created
Type: `EmitType<Object>`

Triggers when the component is created.

**Usage:** Use this event to perform initialization after component creation.

### destroyed
Type: `EmitType<Object>`

Triggers when the component is destroyed.

**Usage:** Use this event to perform cleanup before component destruction.

### toolbarClick
Type: `EmitType<ClickEventArgs>`

Triggers when toolbar item is clicked.

**Usage:** Use this event to respond to toolbar button clicks.
