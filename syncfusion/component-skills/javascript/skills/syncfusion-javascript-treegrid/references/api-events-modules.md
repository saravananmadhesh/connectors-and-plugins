# TreeGrid API: Events & Modules

## When to Use This Reference

Read this reference when you need to:
- Handle TreeGrid lifecycle events (created, destroyed, load)
- Respond to data binding events (dataBound, actionComplete)
- Intercept edit operations with events
- Handle selection and expand/collapse events
- Manage export operations
- Respond to user interactions (click, double-click, scroll)
- Handle drag-and-drop events
- Inject required modules for features
- Understand module loading and dependencies

---

## Table of Contents

- [Events](#events)
  - [Lifecycle Events](#lifecycle-events)
  - [Data Events](#data-events)
  - [Edit Events](#edit-events)
  - [Selection Events](#selection-events)
  - [Expand/Collapse Events](#expandcollapse-events)
  - [Export Events](#export-events)
  - [UI Interaction Events](#ui-interaction-events)
  - [Drag/Drop Events](#dragdrop-events)
- [Modules](#modules)
  - [Module Injection Pattern](#module-injection-pattern)
  - [Available Modules](#available-modules)
  - [Module Usage Example](#module-usage-example)

---

## Events

### Lifecycle Events

**created** `EmitType<Object>`
- Fires when TreeGrid DOM is created
- Subscribe early in component initialization
- Use to: Setup custom initialization logic

**load** `EmitType<Object>`
- Allows customization of TreeGrid properties before rendering
- Use to: Modify configuration dynamically before render

**dataBound** `EmitType<Object>`
- Fires after data rendering completed
- Use to: Auto-fit columns, trigger custom operations on data

**beforeDataBound** `EmitType<BeforeDataBoundArgs>`
- Fires before data rendering starts
- Use to: Cancel data binding if needed (set `args.cancel = true`)

**dataSourceChanged** `EmitType<DataSourceChangedEventArgs>`
- Fires when data added, deleted, or updated
- Call `args.done()` to start rendering after edit operation
- Use to: Track data changes, trigger custom updates

**dataStateChange** `EmitType<DataStateChangeEventArgs>`
- Fires after sorting, paging, filtering completed
- Assign current view data and total record count based on action
- Remote data binding: Use to fetch filtered/sorted data from server

### Data Events

**actionBegin** `EmitType<PageEventArgs|FilterEventArgs|SortEventArgs|SearchEventArgs|AddEventArgs|SaveEventArgs|EditEventArgs|DeleteEventArgs>`
- Triggers when TreeGrid action starts (sort, filter, page, search, add, edit, delete)
- Use to: Show spinner, disable UI during operation

**actionComplete** `EmitType<PageEventArgs|FilterEventArgs|SortEventArgs|SearchEventArgs|AddEventArgs|SaveEventArgs|EditEventArgs|DeleteEventArgs>`
- Triggers when TreeGrid action completes
- Use to: Hide spinner, enable UI, refresh display

**actionFailure** `EmitType<FailureEventArgs>`
- Triggers when TreeGrid action fails
- Use to: Handle errors, show error messages

**beforeExcelExport** `EmitType<Object>`
- Fires before starting Excel export
- Use to: Customize export settings

**beforePdfExport** `EmitType<Object>`
- Fires before starting PDF export
- Use to: Customize PDF settings

### Edit Events

**beginEdit** `EmitType<BeginEditArgs>`
- Fires before row/cell enters edit mode
- Use to: Validate if editing is allowed, initialize editors

**cellEdit** `EmitType<CellEditArgs>`
- Fires when cell is being edited
- Use to: Validate cell value during edit

**cellSave** `EmitType<CellSaveArgs>`
- Fires before cell edit is saved
- Use to: Validate and format cell value

**cellSaved** `EmitType<CellSaveArgs>`
- Fires after cell edit is saved
- Use to: Perform post-save operations

**batchAdd** `EmitType<BatchAddArgs>`
- Fires when records added in batch mode
- Use to: Track batch additions

**beforeBatchAdd** `EmitType<BeforeBatchAddArgs>`
- Fires before records added in batch mode
- Use to: Validate or cancel batch add

**batchDelete** `EmitType<BatchDeleteArgs>`
- Fires when records deleted in batch mode
- Use to: Track batch deletions

**beforeBatchDelete** `EmitType<BeforeBatchDeleteArgs>`
- Fires before records deleted in batch mode
- Use to: Validate or cancel batch delete

**beforeBatchSave** `EmitType<BeforeBatchSaveArgs>`
- Fires before batch changes saved to datasource
- Use to: Validate all batch changes before commit

**batchCancel** `EmitType<BatchCancelArgs>`
- Fires when batch edit cancelled
- Use to: Cleanup unsaved changes

### Selection Events

**rowSelected** `EmitType<RowSelectEventArgs>`
- Fires after row is selected
- Use to: Track selected row data

**rowSelecting** `EmitType<RowSelectingEventArgs>`
- Fires before row selection occurs
- Use to: Prevent selection (set `args.cancel = true`)

**rowDeselected** `EmitType<RowDeselectEventArgs>`
- Fires after selected row is deselected
- Use to: Track deselection

**rowDeselecting** `EmitType<RowDeselectEventArgs>`
- Fires before row deselection
- Use to: Prevent deselection

**cellSelected** `EmitType<CellSelectEventArgs>`
- Fires after cell is selected
- Use to: Track selected cell

**cellSelecting** `EmitType<CellSelectingEventArgs>`
- Fires before cell selection
- Use to: Prevent selection

**cellDeselected** `EmitType<CellDeselectEventArgs>`
- Fires after cell is deselected
- Use to: Track deselection

**cellDeselecting** `EmitType<CellDeselectEventArgs>`
- Fires before cell deselection
- Use to: Prevent deselection

**checkboxChange** `EmitType<CheckBoxChangeEventArgs>`
- Fires when checkbox row is toggled
- Use to: Track checkbox state changes

**recordDoubleClick** `EmitType<RecordDoubleClickEventArgs>`
- Fires when record is double-clicked
- Use to: Open detail view or edit dialog

### Expand/Collapse Events

**expanding** `EmitType<RowExpandingEventArgs>`
- Fires while row is expanding
- Use to: Show loading state during expand

**expanded** `EmitType<RowExpandedEventArgs>`
- Fires after row expanded (child records loaded)
- Use to: Initialize child content

**collapsing** `EmitType<RowCollapsingEventArgs>`
- Fires while row is collapsing
- Use to: Cleanup before collapse

**collapsed** `EmitType<RowCollapsedEventArgs>`
- Fires after row collapsed
- Use to: Cleanup collapsed state

**detailDataBound** `EmitType<DetailDataBoundEventArgs>`
- Fires after detail row expands (initially and on each expand)
- Use to: Initialize detail content

### Export Events

**excelQueryCellInfo** `EmitType<ExcelQueryCellInfoEventArgs>`
- Fires before each cell exported to Excel
- Use to: Customize cell styling, format values

**excelHeaderQueryCellInfo** `EmitType<ExcelHeaderQueryCellInfoEventArgs>`
- Fires before each header cell exported to Excel
- Use to: Customize header formatting

**excelAggregateQueryCellInfo** `EmitType<AggregateQueryCellInfoEventArgs>`
- Fires before aggregate cell exported to Excel
- Use to: Customize aggregate formatting

**excelExportComplete** `EmitType<ExcelExportCompleteArgs>`
- Fires after Excel export completed
- Use to: Show completion message, save file

**pdfQueryCellInfo** `EmitType<PdfQueryCellInfoEventArgs>`
- Fires before each cell exported to PDF
- Use to: Customize PDF cell styling

**pdfHeaderQueryCellInfo** `EmitType<PdfHeaderQueryCellInfoEventArgs>`
- Fires before each header cell exported to PDF
- Use to: Customize PDF header

**pdfAggregateQueryCellInfo** `EmitType<AggregateQueryCellInfoEventArgs>`
- Fires before aggregate cell exported to PDF
- Use to: Customize PDF aggregate

**pdfExportComplete** `EmitType<PdfExportCompleteArgs>`
- Fires after PDF export completed
- Use to: Show completion message

**beforeCopy** `EmitType<BeforeCopyEventArgs>`
- Fires before copy operation starts
- Use to: Validate or prevent copy

**beforePaste** `EmitType<BeforePasteEventArgs>`
- Fires before paste operation starts
- Use to: Validate or prevent paste

**beforePrint** `EmitType<PrintEventArgs>`
- Fires before print action begins
- Use to: Setup print settings

**printComplete** `EmitType<PrintEventArgs>`
- Fires after print action completed
- Use to: Show print message

### UI Interaction Events

**columnDragStart** `EmitType<ColumnDragEventArgs>`
- Fires when column header drag begins
- Use to: Show drag indicator

**columnDrag** `EmitType<ColumnDragEventArgs>`
- Fires continuously while column is being dragged
- Use to: Update visual feedback

**columnDrop** `EmitType<ColumnDragEventArgs>`
- Fires when column header dropped
- Use to: Handle reorder completion

**resizeStart** `EmitType<ResizeArgs>`
- Fires when column resize starts
- Use to: Show resize visual

**resizing** `EmitType<ResizeArgs>`
- Fires during column resizing
- Use to: Update UI during resize

**resizeStop** `EmitType<ResizeArgs>`
- Fires when column resize ends
- Use to: Save column width

**columnMenuOpen** `EmitType<ColumnMenuOpenEventArgs>`
- Fires before column menu opens
- Use to: Customize menu items

**columnMenuClick** `EmitType<MenuEventArgs>`
- Fires when column menu item clicked
- Use to: Handle custom menu actions

**contextMenuOpen** `EmitType<BeforeOpenCloseMenuEventArgs>`
- Fires before context menu opens
- Use to: Customize context menu

**contextMenuClick** `EmitType<MenuEventArgs>`
- Fires when context menu item clicked
- Use to: Handle custom context actions

**toolbarClick** `EmitType<ClickEventArgs>`
- Fires when toolbar item clicked
- Use to: Handle toolbar actions

**headerCellInfo** `EmitType<HeaderCellInfoEventArgs>`
- Triggered for every header cell accessed
- Use to: Access header info, apply custom styling

**rowDataBound** `EmitType<RowDataBoundEventArgs>`
- Triggered for every row element appended
- Use to: Apply row-level styling, validation

**queryCellInfo** `EmitType<QueryCellInfoEventArgs>`
- Triggered for every cell accessed before appending
- Use to: Apply cell-level styling, formatting

### Drag/Drop Events

**rowDragStartHelper** `EmitType<RowDragEventArgs>`
- Fires just before row dragging begins
- Use to: Create custom drag helper element

**rowDragStart** `EmitType<RowDragEventArgs>`
- Fires when row element drag starts
- Use to: Show drag indicator

**rowDrag** `EmitType<RowDragEventArgs>`
- Fires continuously while row is being dragged
- Use to: Update visual feedback

**rowDrop** `EmitType<RowDragEventArgs>`
- Fires when row element dropped to target row
- Use to: Update row order/parent in datasource

---

## Modules

### Module Injection Pattern

TreeGrid features are loaded on-demand using modules. Only inject modules you need to reduce bundle size and improve performance.

**Basic Injection Syntax:**

```typescript
import { TreeGrid, Page, Sort, Filter, Edit, Inject } from '@syncfusion/ej2-treegrid';

let treegrid = new TreeGrid({
  dataSource: data,
  childMapping: 'children',
  columns: [
    { field: 'id', headerText: 'ID', width: 100 },
    { field: 'name', headerText: 'Name', width: 150 }
  ],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true }
});

// Inject required modules
TreeGrid.Inject(Page, Sort, Filter, Edit);
treegrid.appendTo('#treegrid');
```

### Available Modules

**Data Operations (Core)**
- `Page` - Enable pagination feature
- `Sort` - Enable sorting feature
- `Filter` - Enable filtering feature
- `Edit` - Enable CRUD operations (add, edit, delete)
- `Aggregate` - Enable summary rows/aggregates

**Column/Menu Operations**
- `ColumnChooser` - Enable column visibility toggle
- `ColumnMenu` - Enable column header menu
- `CommandColumn` - Enable command buttons in columns
- `ContextMenu` - Enable context menu on right-click

**Layout & Interaction**
- `Resize` - Enable column resizing
- `Reorder` - Enable column reordering
- `RowDragAndDrop` - Enable row drag-drop reordering (use `rowDragAndDropModule` in config)

**Output & Export**
- `Print` - Enable print feature (injected by default)
- `Toolbar` - Enable toolbar with built-in items
- `ExcelExport` - Enable Excel export
- `PdfExport` - Enable PDF export

### Module Usage Example

```typescript
// Core grid with pagination and sorting
TreeGrid.Inject(Page, Sort);

// Full-featured grid
TreeGrid.Inject(Page, Sort, Filter, Edit, Aggregate, ColumnChooser, 
                ColumnMenu, ContextMenu, Resize, Reorder, Print, 
                Toolbar, ExcelExport, PdfExport);

// Minimal grid (sorting only)
TreeGrid.Inject(Sort);

// Remote data with filtering and export
TreeGrid.Inject(Filter, ExcelExport, PdfExport);
```

**Performance Tip:** Inject only modules required by your feature set. Unused modules increase bundle size unnecessarily.
