# TreeGrid API: Properties & Methods

## When to Use This Reference

Read this reference when you need to:
- Access and configure TreeGrid properties programmatically
- Understand all available configuration options
- Call TreeGrid methods for data operations
- Manipulate rows and columns dynamically
- Control expand/collapse behavior
- Perform selection and filtering operations
- Handle editing and validation
- Export data or print
- Access DOM elements and layout information

---

## Table of Contents

- [Properties](#properties)
  - [Data & Configuration](#data--configuration)
  - [Behavior & Display](#behavior--display)
  - [Selection & Interaction](#selection--interaction)
  - [Editing & Validation](#editing--validation)
  - [Export & Printing](#export--printing)
  - [Advanced Features](#advanced-features)
- [Methods](#methods)
  - [Data Operations](#data-operations)
  - [Expand/Collapse Control](#expandcollapse-control)
  - [Selection & Filtering](#selection--filtering)
  - [Editing Operations](#editing-operations)
  - [Export & Printing Operations](#export--printing-operations)
  - [DOM Access & Layout](#dom-access--layout)
  - [Utility Methods](#utility-methods)

---

## Properties

### Data & Configuration

- **dataSource** `Object | DataManager` - Data source for hierarchical/flat data binding
- **columns** `ColumnModel[] | string[] | Column[]` - Column definitions for grid structure
- **childMapping** `string` - Property name for hierarchical parent-child relationships (e.g., `'children'`)
- **idMapping** `string` - Primary key field name for flat/self-referencing data
- **parentIdMapping** `string` - Parent key field name for hierarchical relationships
- **pageSettings** `PageSettingsModel` - Pagination configuration (pageSize, currentPage, etc.)
- **sortSettings** `SortSettingsModel` - Default sort order and multi-sort configuration
- **filterSettings** `FilterSettingsModel` - Filter behavior (type, mode, operators)
- **editSettings** `EditSettingsModel` - CRUD operation modes (inline, dialog, batch)
- **query** `Query` - External DataManager query for data processing

### Behavior & Display

- **allowPaging** `boolean` - Enable/disable pagination (default: false)
- **allowSorting** `boolean` - Enable/disable sorting capability (default: false)
- **allowMultiSorting** `boolean` - Allow sorting by multiple columns (default: true)
- **allowFiltering** `boolean` - Display filter bar for records (default: false)
- **allowSelection** `boolean` - Enable row/cell selection (default: true)
- **allowTextWrap** `boolean` - Enable text wrapping in cells (default: false)
- **allowReordering** `boolean` - Enable column drag-and-drop reordering (default: false)
- **allowResizing** `boolean` - Enable column width resizing (default: false)
- **allowRowDragAndDrop** `boolean` - Enable row drag-and-drop reordering (default: false)
- **allowExcelExport** `boolean` - Enable Excel export functionality (default: false)
- **allowPdfExport** `boolean` - Enable PDF export functionality (default: false)
- **height** `string | number` - Grid scrollable height (default: 'auto')
- **width** `string | number` - Grid width (default: 'auto')
- **rowHeight** `number` - Height of grid rows (default: null)
- **gridLines** `GridLine` - Grid line visibility (Both, None, Horizontal, Vertical, Default)
- **enableRtl** `boolean` - Right-to-left rendering (default: false)
- **enableAltRow** `boolean` - Alternate row styling with CSS class (default: true)
- **enableHover** `boolean` - Highlight row on hover (default: false)
- **enableStickyHeader** `boolean` - Keep column headers visible during scroll (default: false)

### Selection & Interaction

- **selectionSettings** `SelectionSettingsModel` - Selection behavior (mode: Row/Cell, type: Single/Multiple)
- **selectedRowIndex** `number` - Initially selected row index (default: -1)
- **isRowSelectable** `RowSelectable | string` - Determine if a row is selectable
- **searchSettings** `SearchSettingsModel` - Search functionality configuration
- **loadingIndicator** `LoadingIndicatorModel` - Loading spinner/shimmer effect settings
- **locale** `string` - Localization culture code (default: 'en-US')
- **showColumnChooser** `boolean` - Allow dynamic column visibility toggle (default: false)
- **showColumnMenu** `boolean` - Enable column menu for each column (default: false)
- **columnChooserSettings** `ColumnChooserSettingsModel` - Column chooser configuration
- **columnMenuItems** `ColumnMenuItem[] | ColumnMenuItemModel[]` - Custom column menu items
- **contextMenuItems** `ContextMenuItem[] | ContextMenuItemModel[]` - Context menu items
- **toolbar** `string | ToolbarItemModel[]` - Toolbar items (Search, ExpandAll, ExcelExport, PdfExport, etc.)

### Editing & Validation

- **editModule** `Edit` - Internal edit module for CRUD operations
- **autoCheckHierarchy** `boolean` - Auto-check child records when parent is checked (default: false)
- **rowTemplate** `string | Function` - Custom row template for data rendering
- **detailTemplate** `string | Function` - Template for expandable detail rows
- **emptyRecordTemplate** `string | Function` - Template for empty records message

### Export & Printing

- **printModule** `Print` - Internal print module
- **printMode** `PrintMode` - Print output mode (AllPages, CurrentPage)
- **aggregates** `AggregateRowModel[]` - Summary row configurations
- **textWrapSettings** `TextWrapSettingsModel` - Text wrap mode during export

### Advanced Features

- **enableVirtualization** `boolean` - Virtual scrolling for large datasets (default: false)
- **enableColumnVirtualization** `boolean` - Virtual rendering of columns (default: false)
- **enableInfiniteScrolling** `boolean` - Infinity scroll instead of paging (default: false)
- **infiniteScrollSettings** `InfiniteScrollSettingsModel` - Infinity scroll cache/blocks
- **enableImmutableMode** `boolean` - Reuse old rows in result during actions (default: false)
- **enableVirtualMaskRow** `boolean` - Show shimmer effect in virtual scrolling (default: true)
- **enablePersistence** `boolean` - Persist state between page reloads (default: false)
- **enableColumnSpan** `boolean` - Merge adjacent cells with same data (default: false)
- **enableRowSpan** `boolean` - Merge adjacent rows with same data (default: false)
- **enableAdaptiveUI** `boolean` - Responsive UI for small screens (default: false)
- **enableAutoFill** `boolean` - Show auto-fill handle on cell selection (default: false)
- **enableCollapseAll** `boolean` - Collapse all rows initially (default: false)
- **frozenColumns** `number` - Number of columns fixed on left (default: 0)
- **frozenRows** `number` - Number of rows fixed at top (default: 0)
- **treeColumnIndex** `number` - Column index with expander button (default: 0)
- **columnQueryMode** `ColumnQueryModeType` - Data retrieval mode (All, Schema, ExcludeHidden)
- **clipMode** `ClipMode` - Clip mode for printing (Ellipsis/Default)
- **hasChildMapping** `string` - Property indicating parent/child for remote data
- **loadChildOnDemand** `boolean` - Load child records on expand (remote data only, default: true)
- **expandStateMapping** `string` - Property for row expand/collapse state
- **copyHierarchyMode** `CopyHierarchyType` - Copy mode (Parent, Child, Both, None - default: Parent)
- **rowDropSettings** `RowDropSettingsModel` - Row drag-drop target configuration

### Internal Modules

- **clipboardModule** `TreeClipboard` - Handle copy/paste operations
- **editModule** `Edit` - Manage CRUD operations
- **pagerModule** `Page` - Manage pagination
- **sortModule** `Sort` - Manage sorting
- **filterModule** - Manage filtering
- **columnMenuModule** `ColumnMenu` - Manage column menus
- **contextMenuModule** `ContextMenu` - Manage context menus
- **keyboardModule** `KeyboardEvents` - Manage keyboard interactions
- **reorderModule** `Reorder` - Manage column reordering
- **rowDragAndDropModule** `RowDD` - Manage row drag-drop
- **toolbarModule** `Toolbar` - Manage toolbar

---

## Methods

### Data Operations

**addRecord(data, index, position)**
- Insert single or multiple records at specified position
- Parameters: data (object/array), index (position), position (before/after/child)
- Returns: void
- Requires: `editSettings.allowAdding = true`

**deleteRecord(fieldName, data)**
- Delete record(s) by field name and data
- Parameters: fieldName (primary key name), data (record to delete)
- Returns: void
- Requires: `editSettings.allowDeleting = true`

**updateRow(index, data)**
- Update entire row data without entering edit mode
- Parameters: index (row index), data (new values)
- Returns: void

**updateCell(index, field, value)**
- Update single cell value
- Parameters: index (row index), field (column field), value (new value)
- Returns: void

**setCellValue(rowData, field, value)**
- Update cell in batch edit mode
- Parameters: rowData (row object), field (column), value (new value)
- Returns: void

**setRowData(rowData, data)**
- Update row in batch edit mode
- Parameters: rowData (identifier), data (new values)
- Returns: void

**getBatchChanges()**
- Get pending changes in batch mode (add/edit/delete)
- Returns: Object with added, changed, deleted arrays

### Expand/Collapse Control

**expandAll()**
- Expand all rows in hierarchy
- Returns: void
- ⚠️ Use cautiously on large datasets

**expandRow(row)**
- Expand specific row by element
- Parameters: row (HTMLTableRowElement)
- Returns: void

**expandByKey(key)**
- Expand record by primary key value
- Parameters: key (unique identifier)
- Returns: void

**expandAtLevel(level)**
- Expand all rows at specific hierarchy level
- Parameters: level (depth level)
- Returns: void

**collapseAll()**
- Collapse all rows in hierarchy
- Returns: void

**collapseRow(row)**
- Collapse specific row by element
- Parameters: row (HTMLTableRowElement)
- Returns: void

**collapseByKey(key)**
- Collapse record by primary key value
- Parameters: key (unique identifier)
- Returns: void

**collapseAtLevel(level)**
- Collapse all rows at specific hierarchy level
- Parameters: level (depth level)
- Returns: void

**indent(record)**
- Move record one level deeper (promote to child)
- Parameters: record (optional - uses selected if omitted)
- Returns: void

**outdent(record)**
- Move record one level up (demote from parent)
- Parameters: record (optional - uses selected if omitted)
- Returns: void

### Selection & Filtering

**selectRow(index, isToggle)**
- Select row by index
- Parameters: index (row position), isToggle (toggle selection)
- Returns: void

**selectCell(cellIndex, isToggle)**
- Select cell by row/column indices
- Parameters: cellIndex ({rowIndex, columnIndex}), isToggle (toggle)
- Returns: void

**selectRows(rowIndices)**
- Select multiple rows
- Parameters: rowIndices (array of row indexes)
- Returns: void

**selectCheckboxes(rowIndices)**
- Check checkboxes for specific rows
- Parameters: rowIndices (array of row indexes)
- Returns: void

**clearSelection()**
- Deselect all selected rows/cells
- Returns: void

**getSelectedRecords()**
- Get data of all selected rows
- Returns: Object[]

**getSelectedRowIndexes()**
- Get indexes of all selected rows
- Returns: number[]

**getSelectedRowCellIndexes()**
- Get cell indexes within selected rows
- Returns: ISelectedCell[]

**getSelectedRows()**
- Get HTMLElement of all selected rows
- Returns: Element[]

**filterByColumn(field, operator, value, isCaseSensitive, type)**
- Filter records by column field
- Parameters: field, operator (startsWith/contains/equal), value, caseSensitive, type
- Returns: void

**clearFiltering()**
- Remove all filters (show all records)
- Returns: void

**search(searchString)**
- Search records by string value
- Returns: void
- Customize via `searchSettings`

### Editing Operations

**editCell(index, field)**
- Enter edit mode for specific cell
- Parameters: index (row index), field (column field name)
- Returns: void
- Requires: `editSettings.allowEditing = true`

**startEdit()**
- Start row editing
- Returns: void

**endEdit()**
- Finish and save row editing
- Returns: void

**closeEdit()**
- Close edit without saving
- Returns: void

**saveCell()**
- Save current cell changes (UI only, not datasource)
- Returns: void

**enableToolbarItems(items)**
- Enable toolbar items by name/index
- Parameters: items (toolbar item array)
- Returns: void

### Export & Printing Operations

**excelExport(excelExportProperties, isMultipleExport, workbook, isBlob)**
- Export to Excel file (.xlsx)
- Parameters: properties (config), isMultipleExport (bool), workbook (EJ2 Workbook), isBlob (return blob)
- Returns: Promise

**csvExport(excelExportProperties, isMultipleExport, workbook, isBlob)**
- Export to CSV file
- Parameters: Same as excelExport
- Returns: Promise

**pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob)**
- Export to PDF document
- Parameters: properties (config), isMultipleExport (bool), pdfDoc (EJ2 PDF Document), isBlob
- Returns: Promise

**serverExcelExport(url)**
- Server-side Excel export
- Parameters: url (server endpoint)
- Returns: Promise

**serverCsvExport(url)**
- Server-side CSV export
- Parameters: url (server endpoint)
- Returns: Promise

**serverPdfExport(url)**
- Server-side PDF export
- Parameters: url (server endpoint)
- Returns: Promise

**print()**
- Print all pages (hides pager by default)
- Returns: void
- Customize via `printMode`

**copy(withHeader)**
- Copy selected rows/cells to clipboard
- Parameters: withHeader (include column headers)
- Returns: void

**paste(data, rowIndex, colIndex)**
- Paste clipboard data into grid
- Parameters: data (clipboard string), rowIndex (start position), colIndex
- Returns: void

### DOM Access & Layout

**getRows()**
- Get all row HTMLElement (excluding summary rows)
- Returns: HTMLTableRowElement[]

**getRowByIndex(index)**
- Get specific row element by index
- Parameters: index (row position)
- Returns: Element

**getDataRows()**
- Get all data row elements
- Returns: Element[]

**getCellFromIndex(rowIndex, columnIndex)**
- Get cell element by row and column index
- Parameters: rowIndex, columnIndex
- Returns: Element

**getCurrentViewRecords()**
- Get currently visible records (considers expand/collapse state)
- Returns: Object[]

**getContent()**
- Get main content area DIV
- Returns: Element

**getContentTable()**
- Get content table element
- Returns: Element

**getHeaderContent()**
- Get header content element
- Returns: Element

**getHeaderTable()**
- Get header table element
- Returns: Element

**getFooterContent()**
- Get footer content element
- Returns: Element

**getFooterContentTable()**
- Get footer table element
- Returns: Element

**getPager()**
- Get pager element for page navigation
- Returns: Element

**getRootElement()**
- Get root component element
- Returns: HTMLElement

**getPageSizeByHeight(containerHeight)**
- Calculate optimal page size for container height
- Parameters: containerHeight (number or string in px)
- Returns: number

**hideSpinner()**
- Hide manually shown loading spinner
- Returns: void

**showSpinner()**
- Display loading spinner overlay
- Returns: void

**autoFitColumns(fieldNames)**
- Adjust column widths to fit content
- Parameters: fieldNames (column names to auto-fit)
- Returns: void
- Tip: Call in `dataBound` event for initial render

**openColumnChooser(x, y)**
- Display column chooser at position
- Parameters: x (X-axis), y (Y-axis)
- Returns: void

**hideColumns(keys, hideBy)**
- Hide columns by name
- Parameters: keys (column name or array), hideBy (field/header)
- Returns: void

**showColumns(keys, showBy)**
- Show columns by name
- Parameters: keys (column name or array), showBy (field/header)
- Returns: void

**reorderColumns(fromIndex, toIndex)**
- Reorder column position
- Parameters: fromIndex (current position), toIndex (new position)
- Returns: void

**refreshColumns(refreshUI)**
- Refresh column definitions and layout
- Parameters: refreshUI (update DOM)
- Returns: void

**refreshLayout()**
- Force complete re-render of column and layout
- Returns: void

**refreshHeader()**
- Refresh header section only
- Returns: void

**refresh()**
- Refresh visual appearance and data
- Returns: void
- Synchronizes displayed data with datasource

### Utility Methods

**goToPage(pageNo)**
- Navigate to specific page number
- Parameters: pageNo (page number)
- Returns: void
- Requires: `allowPaging = true`

**sortByColumn(columnName, direction, isMultiSort)**
- Sort column with specified direction
- Parameters: columnName (field), direction (Ascending/Descending), isMultiSort (preserve other sorts)
- Returns: void

**clearSorting()**
- Remove all sorting
- Returns: void

**getVisibleRecords()**
- Get all visible records based on current state
- Returns: Object[]

**getVisibleColumns()**
- Get all columns currently visible
- Returns: Column[]

**getColumns(isRefresh)**
- Get all column definitions
- Parameters: isRefresh (refresh column model)
- Returns: Column[]

**getColumnFieldNames()**
- Get all column field names
- Returns: string[]

**getColumnByField(field)**
- Get column object by field name
- Parameters: field (column field)
- Returns: Column

**getColumnByUid(uid)**
- Get column object by unique ID
- Parameters: uid (column UID)
- Returns: Column

**getColumnIndexByField(field)**
- Get column position by field name
- Parameters: field (column field)
- Returns: number

**getColumnIndexByUid(uid)**
- Get column position by UID
- Parameters: uid (column UID)
- Returns: number

**getColumnHeaderByField(field)**
- Get column header element by field
- Parameters: field (column field)
- Returns: Element

**getColumnHeaderByIndex(index)**
- Get column header element by index
- Parameters: index (column position)
- Returns: Element

**getColumnHeaderByUid(uid)**
- Get column header element by UID
- Parameters: uid (column UID)
- Returns: Element

**getUidByColumnField(field)**
- Get column UID by field name
- Parameters: field (column field)
- Returns: string

**getPrimaryKeyFieldNames()**
- Get primary key field name(s)
- Returns: string[]

**getRowInfo(target)**
- Get row metadata (index, data) from element
- Parameters: target (Element or EventTarget)
- Returns: RowInfo

**getDataModule()**
- Get data handling modules (base + tree module)
- Returns: Object with data operations

**getCheckedRecords()**
- Get records with checkboxes checked
- Returns: Object[]

**getCheckedRowIndexes()**
- Get row indexes with checked checkboxes
- Returns: number[]

**deleteRow(tr)**
- Delete row from DOM by element
- Parameters: tr (HTMLTableRowElement)
- Returns: void

**appendTo(selector)**
- Attach grid to HTML element
- Parameters: selector (element ID or DOM element)
- Returns: void

**destroy()**
- Clean up component (detach events, clear DOM)
- Returns: void
- Prevents memory leaks

**addEventListener(eventName, handler)**
- Add event listener
- Parameters: eventName (event type), handler (callback function)
- Returns: void

**removeEventListener(eventName, handler)**
- Remove event listener
- Parameters: eventName (event type), handler (callback function)
- Returns: void

**updateExternalMessage(message)**
- Update external/custom validation message
- Parameters: message (error message)
- Returns: void

**Inject(moduleList)**
- Dynamically inject feature modules
- Parameters: moduleList (array of module functions)
- Returns: void
- Example: `TreeGrid.Inject(Page, Sort, Filter, Edit)`

**reorderRows(fromIndex, toIndex)**
- Reorder row position via drag-drop
- Parameters: fromIndex (current position), toIndex (new position)
- Returns: void

**getFrozenLeftColumnHeaderByIndex(index)**
- Get frozen left column header by index
- Parameters: index (column position)
- Returns: Element

**getFrozenRightColumnHeaderByIndex(index)**
- Get frozen right column header by index
- Parameters: index (column position)
- Returns: Element

**getFrozenRightDataRows()**
- Get all frozen right data rows
- Returns: Element[]

**getFrozenRightRowByIndex(index)**
- Get frozen right row element by index
- Parameters: index (row position)
- Returns: Element

**getFrozenRightRows()**
- Get all frozen right rows
- Returns: Element[]

**getFrozenRightCellFromIndex(rowIndex, columnIndex)**
- Get frozen right cell by indices
- Parameters: rowIndex, columnIndex
- Returns: Element

**getMovableCellFromIndex(rowIndex, columnIndex)**
- Get movable cell by indices
- Parameters: rowIndex, columnIndex
- Returns: Element

**getMovableColumnHeaderByIndex(index)**
- Get movable column header by index
- Parameters: index (column position)
- Returns: Element

**getMovableDataRows()**
- Get all movable data rows
- Returns: Element[]

**getMovableRowByIndex(index)**
- Get movable row element by index
- Parameters: index (row position)
- Returns: Element

**getMovableRows()**
- Get all movable rows
- Returns: Element[]
