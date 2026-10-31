# Grid Properties

## Table of Contents

- [Overview](#overview)
- [When to Use](#when-to-use)
- [Data Management Properties](#data-management-properties)
- [Display Properties](#display-properties)
- [Feature Flags and Toggles](#feature-flags-and-toggles)
- [Configuration Properties](#configuration-properties)
- [Advanced Feature Properties](#advanced-feature-properties)
- [Status Properties](#status-properties)
- [Behavioral Properties](#behavioral-properties)
- [Module References](#module-references)

## Overview

The Grid component exposes a comprehensive set of properties that allow you to configure and customize its behavior. Properties define how the Grid handles data, renders content, enables features, and responds to user interactions.

## When to Use

Use Grid properties to:
- Bind and configure data sources
- Enable or disable specific features (filtering, sorting, paging, etc.)
- Customize appearance and layout
- Configure editing and validation
- Set up column definitions and templates
- Define selection and interaction modes
- Configure advanced features like grouping, aggregates, and exports

## Data Management Properties

### dataSource
Type: `Object | DataManager | DataResult`

It is used to render grid table rows. If the `dataSource` is an array of JavaScript objects, then Grid will create instance of DataManager from this `dataSource`. If the `dataSource` is an existing DataManager, the Grid will not initialize a new one.

Default: `[]`

### query
Type: `Query`

Defines the external Query that will be executed along with data processing.

Default: `null`

### queryString
Type: `string`

Defines the relationship between parent and child datasource. It acts as the foreign key for parent datasource.

Default: `''`

## Display Properties

### columns | height | width
- `columns` (Type: `Column[] | string[] | ColumnModel[]`) — Schema for dataSource; auto-generated if undefined. Default: `[]`
- `height | width` (Type: `string | number`) — Grid dimensions

### gridLines
Type: `GridLine` — Modes: `Both` | `None` | `Horizontal` | `Vertical` | `Default`. Default: `Default`

### clipMode
Type: `ClipMode` — Content overflow modes: `Clip` (truncate) | `Ellipsis` (with optional tooltip) | `EllipsisWithTooltip`. Default: `Ellipsis`

### cssClass | locale | rowHeight
- `cssClass` (Type: `string`) — Custom CSS class for grid element. Default: `''`
- `locale` (Type: `string`) — Culture/localization override (default: 'en-US'). Default: `''`
- `rowHeight` (Type: `number`) — Row height for all rows

### enableRtl | enableStickyHeader
- `enableRtl` (Type: `boolean`) — Right-to-left rendering. Default: `false`
- `enableStickyHeader` (Type: `boolean`) — Sticky column headers on scroll. Default: `false`

## Feature Flags and Toggles

All boolean properties. Default values shown:
- `allowKeyboard` (default: `true`) — Keyboard interaction
- `allowSelection` (default: `true`) — Row selection via click
- `allowPaging` (default: `false`) — Footer pager/page navigation
- `allowSorting` (default: `false`) — Sorting on column header click
- `allowMultiSorting` (default: `false`) — Multi-column sort with Ctrl+click
- `allowReordering` (default: `false`) — Column drag-to-reorder
- `allowResizing` (default: `false`) — Column resize capability
- `allowFiltering` (default: `false`) — Filter bar display
- `allowGrouping` (default: `false`) — Dynamic column grouping/ungrouping
- `allowExcelExport` (default: `false`) — Excel export
- `allowPdfExport` (default: `false`) — PDF export
- `allowRowDragAndDrop` (default: `false`) — Drag rows to another grid
- `allowTextWrap` (default: `false`) — Cell text wrapping
- `showColumnChooser` (default: `false`) — Show/hide columns dynamically
- `showColumnMenu` (default: `false`) — Column menu options
- `autoFit` (default: `false`) — Auto-fit on refresh/virtual scroll

## Configuration Properties

### editSettings
Type: `EditSettingsModel`

Configures the edit settings.

Default: `{ allowAdding: false, allowEditing: false, allowDeleting: false, mode: 'Normal', allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }`

### selectionSettings
Type: `SelectionSettingsModel`

Configures the selection settings.

Default: `{ mode: 'Row', cellSelectionMode: 'Flow', type: 'Single' }`

### pageSettings
Type: `PageSettingsModel`

Configures the pager in the Grid.

Default: `{ currentPage: 1, pageSize: 12, pageCount: 8, enableQueryString: false, pageSizes: false, template: null }`

### filterSettings
Type: `FilterSettingsModel`

Configures the filter settings of the Grid.

Default: `{ columns: [], type: 'FilterBar', mode: 'Immediate', showFilterBarStatus: true, immediateModeDelay: 1500, operators: {} }`

### sortSettings
Type: `SortSettingsModel`

Configures the sorting settings of the Grid.

Default: `{ columns: [] }`

### searchSettings
Type: `SearchSettingsModel`

Configures the search behavior in the Grid.

Default: `{ ignoreCase: true, fields: [], operator: 'contains', key: '' }`

### groupSettings
Type: `GroupSettingsModel`

Configures the grouping settings of the Grid.

Default: `{ showDropArea: true, showToggleButton: false, showGroupedColumn: false, showUngroupButton: true, columns: [] }`

### aggregates
Type: `AggregateRowModel[]`

Defines aggregate rows for the Grid including Sum, Average, Count, etc.

Default: `[]`

### toolbar
Type: `[]` — Built-in items: `Add` | `Edit` | `Update` | `Delete` | `Cancel` | `Search` | `Print` | `ExcelExport` | `PdfExport` | `CsvExport`. Also supports custom toolbar items.

### childGrid | detailTemplate | rowTemplate
- `childGrid` (Type: `GridModel`) — Child grid options; requires `queryString` for parent-child relationship
- `detailTemplate` (Type: `string | Function`) — Additional row information (template string or element ID)
- `rowTemplate` (Type: `string | Function`) — Custom row rendering

### emptyRecordTemplate | pagerTemplate | toolbarTemplate
- `emptyRecordTemplate` (Type: `string | Function`) — Custom empty record message
- `pagerTemplate | toolbarTemplate` (Type: `string | Function`) — Pager and toolbar templates. Default: `null`

## Advanced Feature Properties

### frozenRows | frozenColumns
- `frozenRows | frozenColumns` (Type: `number`) — Frozen rows/columns count. Default: `0`

### enableVirtualization | enableColumnVirtualization
- `enableVirtualization` (Type: `boolean`) — Render only visible rows; load on vertical scroll (supports large datasets). Default: `false`
- `enableColumnVirtualization` (Type: `boolean`) — Render only visible columns; load on horizontal scroll. Default: `false`

### enableInfiniteScrolling | infiniteScrollSettings
- `enableInfiniteScrolling` (Type: `boolean`) — Load data when scrollbar reaches end. Default: `false`
- `infiniteScrollSettings` (Type: `InfiniteScrollSettingsModel`) — Configure caching, maxBlocks, initialBlocks. Default: `{ enableCache: false, maxBlocks: 5, initialBlocks: 5 }`

### enableColumnSpan | enableRowSpan
- `enableColumnSpan` (Type: `boolean`) — Merge adjacent cells with identical data between columns. Default: `false`
- `enableRowSpan` (Type: `boolean`) — Merge adjacent cells with identical data between rows. Default: `false`

### enableAdaptiveUI | adaptiveUIMode
- `enableAdaptiveUI` (Type: `boolean`) — Adaptive filter/sort/edit dialogs. Default: `false`
- `adaptiveUIMode` (Type: `AdaptiveMode`) — Adaptive mode: enumeration value. Default: `Both`

### selectedRowIndex | resizeSettings | loadingIndicator
- `selectedRowIndex` (Type: `number`) — Select row at initial render; get current selection. Default: `-1`
- `resizeSettings` (Type: `ResizeSettingsModel`) — Resizing behavior (mode: 'Normal'). Default: `{ mode: 'Normal' }`
- `loadingIndicator` (Type: `LoadingIndicatorModel`) — Configure indicator type. Default: `{ indicatorType: 'Spinner' }`

### enablePersistence | ej2StatePersistenceVersion
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.
- `enablePersistence` (Type: `boolean`) — Persist state to localStorage. Default: `false`
- `ej2StatePersistenceVersion` (Type: `string`) — Persistence version. Default: `''`

### isRowSelectable | isRowPinned
- `isRowSelectable` (Type: `RowSelectable | string`) — Control row selectability; default all selectable. Default: `null`
- `isRowPinned` (Type: `PinRow | Function`) — Pin rows at top; pinned rows visible across paging/scroll. Default: `null`

### enableImmutableMode
- `enableImmutableMode` (Type: `boolean`) — Immutable mode for state management. Default: `false`

## Status Properties

### currentViewData | currentAction | parentDetails
- `currentViewData` (Type: `Object[]`) — Currently visible records. Default: `[]`
- `currentAction` (Type: `ActionArgs`) — Current action details. Default: `{}`
- `parentDetails` (Type: `ParentDetails`) — Parent Grid details (read-only). Default: `{}`

## Behavioral Properties

### Behavioral Properties

#### printMode | rowRenderingMode | hierarchyPrintMode
- `printMode` (Type: `PrintMode`) — Modes: `AllPages` | `CurrentPage`. Default: `AllPages`
- `rowRenderingMode` (Type: `RowRenderingDirection`) — Row rendering direction
- `hierarchyPrintMode` (Type: `HierarchyGridPrintMode`) — Master-detail print mode

#### columnQueryMode
Type: `ColumnQueryModeType` — Datasource retrieval: `All` (whole) | `Schema` (defined columns) | `ExcludeHidden` (visible only). Default: `All`

#### columnMenuItems | contextMenuItems
- `columnMenuItems` (Type: `ColumnMenuItem[]`) — Built-in: `AutoFitAll` | `AutoFit` | `Group` | `Ungroup` | `SortAscending` | `SortDescending` | `Filter`. Also supports custom items. Default: `null`
- `contextMenuItems` (Type: `ContextMenuItem[]`) — Built-in: AutoFit | Group/Ungroup | Edit | Delete | Export | Sort | Navigation. Supports custom items. Default: `null`

#### columnChooserSettings | rowDropSettings | exportGrids
- `columnChooserSettings` (Type: `ColumnChooserSettingsModel`) — Column chooser config. Default: `{ columnChooserOperator: 'startsWith' }`
- `rowDropSettings` (Type: `RowDropSettingsModel`) — Row drop configuration
- `exportGrids` (Type: `string[]`) — Grid IDs to export. Default: `null`

#### requireTemplateRef | enableVirtualMaskRow | enableAltRow | enableHover
- `requireTemplateRef` (Type: `boolean`) — Allow template access in queryCellInfo/rowDataBound (false improves performance). Default: `true`
- `enableVirtualMaskRow` (Type: `boolean`) — Shimmer effect for virtual/infinite scroll. Default: `true`
- `enableAltRow` (Type: `boolean`) — Alternating row colors. Default: `false`
- `enableHover` (Type: `boolean`) — Row hover effect. Default: `true`

#### enableAutoFill | enableHeaderFocus
- `enableAutoFill` (Type: `boolean`) — Auto fill feature. Default: `false`
- `enableHeaderFocus` (Type: `boolean`) — Header focus. Default: `false`

## Module References

**Data/Content Manipulation:**
- `editModule` (Type: `Edit`) — Content manipulation
- `clipboardModule` (Type: `Clipboard`) — Copy operations

**Filtering/Sorting/Grouping:**
- `filterModule` (Type: `Filter`) — Filter operations
- `sortModule` (Type: `Sort`) — Sort operations
- `groupModule` (Type: `Group`) — Grouping behavior
- `searchModule` (Type: `Search`) — Search operations

**Navigation/Display:**
- `pagerModule` (Type: `Page`) — Paging operations
- `scrollModule` (Type: `Scroll`) — Scroll manipulation
- `selectionModule` (Type: `Selection`) — Selection behavior
- `showHider` (Type: `ShowHide`) — Show/hide columns
- `infiniteScrollModule` (Type: `InfiniteScroll`) — Infinite scroll

**Export/Print:**
- `excelExportModule` (Type: `ExcelExport`) — Excel export
- `pdfExportModule` (Type: `PdfExport`) — PDF export
- `printModule` (Type: `Print`) — Print feature

**UI/Interaction:**
- `toolbarModule` (Type: `Toolbar`) — Toolbar items/actions
- `columnMenuModule` (Type: `ColumnMenu`) — Column menu items/actions
- `contextMenuModule` (Type: `ContextMenu`) — Context menu items/actions
- `keyboardModule` (Type: `KeyboardEvents`) — Keyboard interactions
- `reorderModule` (Type: `Reorder`) — Column reordering
- `rowDragAndDropModule` (Type: `RowDD`) — Row drag-and-drop functionality
