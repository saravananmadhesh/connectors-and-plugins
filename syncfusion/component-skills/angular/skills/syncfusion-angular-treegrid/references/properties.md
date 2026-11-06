---
name: Properties Reference (Table)
description: 'Complete table reference for all Syncfusion Angular TreeGrid properties.'
---

# TreeGrid Properties - Table Reference

## When to Use

Use this properties reference when you need to:
- **Quick property lookup** — Find property names and types
- **Configure TreeGrid** — Set up TreeGrid with proper settings
- **Understand defaults** — Know default values for properties
- **Type checking** — Verify property data types
- **API documentation** — Reference complete property list
- **Auto-completion** — Use as reference for IDE autocomplete
- **Property configuration** — Set properties in component code

## Data Binding Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `Object[] \| DataManager` | `[]` | Primary data source for rendering TreeGrid rows |
| `childMapping` | `string` | `null` | Property path for child records in data source |
| `idMapping` | `string` | `null` | Field name containing unique id for each row |
| `parentIdMapping` | `string` | `null` | Field name containing parent's id (flat data binding) |
| `hasChildMapping` | `string` | `null` | Property indicating if record is parent (remote data only) |
| `expandStateMapping` | `string` | `null` | Property path for expand status of a record |

## Display Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `height` | `string \| number` | `'auto'` | Scrollable height of TreeGrid content (px, %, auto) |
| `width` | `string \| number` | `'auto'` | TreeGrid width (px, %, auto) |
| `rowHeight` | `number` | `null` | Height of TreeGrid rows |
| `treeColumnIndex` | `number` | `0` | Index of column with expander button |
| `columns` | `ColumnModel[] \| string[]` | `[]` | Schema of dataSource, auto-generated if empty |
| `gridLines` | `'Both' \| 'None' \| 'Horizontal' \| 'Vertical' \| 'Default'` | `'Default'` | Grid line display options |
| `rowTemplate` | `any` | `null` | Custom row template (string or HTML element ID) |
| `detailTemplate` | `any` | `null` | Detail template for additional row information |
| `emptyRecordTemplate` | `any` | `null` | Template rendered when no data available |
| `pagerTemplate` | `any` | `null` | Custom pager template |

## Behavior Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowSelection` | `boolean` | `true` | Enable/disable row, cell selection |
| `allowSorting` | `boolean` | `false` | Enable sorting on column header click |
| `allowMultiSorting` | `boolean` | `true` | Allow multi-column sorting (requires `allowSorting`) |
| `allowFiltering` | `boolean` | `false` | Display filter bar |
| `allowPaging` | `boolean` | `false` | Render pager |
| `allowReordering` | `boolean` | `false` | Allow column reordering via drag & drop |
| `allowResizing` | `boolean` | `false` | Allow column resizing |
| `allowRowDragAndDrop` | `boolean` | `false` | Enable row reordering with drag & drop |
| `allowExcelExport` | `boolean` | `false` | Export TreeGrid to Excel file |
| `allowPdfExport` | `boolean` | `false` | Export TreeGrid to PDF file |
| `allowTextWrap` | `boolean` | `false` | Wrap text when exceeding column width |
| `autoCheckHierarchy` | `boolean` | `false` | Enable hierarchy checkbox selection |
| `selectedRowIndex` | `number` | `-1` | Index of row to select on initial render |

## Feature Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableVirtualization` | `boolean` | `false` | Render only visible rows, load on scroll |
| `enableColumnVirtualization` | `boolean` | `false` | Render only visible columns horizontally |
| `enableInfiniteScrolling` | `boolean` | `false` | Load data as scrollbar reaches end |
| `enablePersistence` | `boolean` | `false` | Persist component state between page reloads |
| `enableRtl` | `boolean` | `false` | Render component right-to-left |
| `enableAdaptiveUI` | `boolean` | `false` | Adaptive pop-up UI for small screens |
| `enableAltRow` | `boolean` | `true` | Alternate row background colors |
| `enableAutoFill` | `boolean` | `false` | Auto fill icon on cell selection for copy |
| `enableCollapseAll` | `boolean` | `false` | Load all rows in collapsed state initially |
| `enableColumnSpan` | `boolean` | `false` | Merge adjacent cells with similar data (columns) |
| `enableRowSpan` | `boolean` | `false` | Merge adjacent cells with similar data (rows) |
| `enableHover` | `boolean` | `false` | Enable row hover effect |
| `enableImmutableMode` | `boolean` | `false` | Reuse old rows instead of full refresh |
| `enableStickyHeader` | `boolean` | `false` | Keep column headers visible while scrolling |
| `enableVirtualMaskRow` | `boolean` | `true` | Display shimmer effect during virtual scrolling |
| `loadChildOnDemand` | `boolean` | `true` | Load child records only on expand (remote data only) |
| `frozenColumns` | `number` | `0` | Number of columns fixed on left during scroll |
| `frozenRows` | `number` | `0` | Number of rows fixed at top during scroll |
| `locale` | `string` | `''` | Override culture and localization for component |

## Settings Objects

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectionSettings` | `SelectionSettingsModel` | `{ mode: 'Row', type: 'Single' }` | Configure selection behavior (type, mode, cellSelectionMode) |
| `editSettings` | `EditSettingsModel` | `{ mode: 'Normal', allowAdding: false, ... }` | Configure edit settings (mode, permissions, dialog) |
| `filterSettings` | `FilterSettingsModel` | `{ type: 'FilterBar', mode: 'Immediate' }` | Configure filter settings (type, mode, columns) |
| `sortSettings` | `SortSettingsModel` | `{ columns: [] }` | Configure sort settings |
| `pageSettings` | `PageSettingsModel` | `{ currentPage: 1, pageSize: 12 }` | Configure pager (size, count, current page) |
| `searchSettings` | `SearchSettingsModel` | `{ search: [] }` | Configure search settings |
| `infiniteScrollSettings` | `InfiniteScrollSettingsModel` | `{ enableCache: false, ... }` | Configure infinite scrolling |
| `columnChooserSettings` | `ColumnChooserSettingsModel` | `{ columnChooserOperator: 'startsWith' }` | Configure column chooser |
| `textWrapSettings` | `TextWrapSettingsModel` | `{ wrapMode: 'Both' }` | Configure text wrapping |
| `loadingIndicator` | `LoadingIndicatorModel` | `{ indicatorType: 'Spinner' }` | Configure loading indicator (Spinner or Shimmer) |
| `rowDropSettings` | `RowDropSettingsModel` | `{}` | Configure row drop settings |

## Menu & Template Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `toolbar` | `string[] \| Object[]` | `null` | Toolbar items (built-in or custom) |
| `columnMenuItems` | `ColumnMenuItem[]` | `null` | Column menu items |
| `contextMenuItems` | `ContextMenuItem[]` | `null` | Context menu items |
| `showColumnMenu` | `boolean` | `false` | Enable column menu per column |
| `showColumnChooser` | `boolean` | `false` | Allow dynamic show/hide columns |

## Hierarchy & Aggregates

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aggregates` | `AggregateRowModel[]` | `[]` | Configure aggregate rows |
| `isRowSelectable` | `RowSelectable \| string` | `null` | Determine if row is selectable |

## Export & Display Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `clipMode` | `ClipMode` | `'Ellipsis'` | Clip mode for content display |
| `printMode` | `PrintMode` | `'AllPages'` | Print mode (AllPages or CurrentPage) |
| `columnQueryMode` | `'All' \| 'Schema' \| 'ExcludeHidden'` | `'All'` | Data retrieval mode for columns |
| `copyHierarchyMode` | `CopyHierarchyType` | `'Parent'` | Copy clipboard modes (Parent, Child, Both, None) |
| `query` | `Query` | `null` | External Query for data processing |

## Module Properties

| Property | Type | Description |
|----------|------|-------------|
| `editModule` | `Edit` | Handle TreeGrid content manipulation |
| `sortModule` | `Sort` | Manipulate sorting |
| `filterModule` | `Filter` | Handle filtering |
| `printModule` | `Print` | Handle printing |
| `pagerModule` | `Page` | Manipulate paging |
| `toolbarModule` | `Toolbar` | Manipulate toolbar items/actions |
| `clipboardModule` | `TreeClipboard` | Handle copy action |
| `columnMenuModule` | `ColumnMenu` | Manipulate column menu |
| `contextMenuModule` | `ContextMenu` | Handle context menu |
| `keyboardModule` | `KeyboardEvents` | Manipulate keyboard interactions |
| `rowDragAndDropModule` | `RowDD` | Manipulate row reordering |
| `reorderModule` | `Reorder` | Manipulate column reordering |

## Quick Reference: Column Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `field` | `string` | - | Data field name |
| `headerText` | `string` | - | Column header text |
| `width` | `number \| string` | - | Column width |
| `type` | `string` | - | Data type (text, number, date, boolean) |
| `isPrimaryKey` | `boolean` | - | Is primary key |
| `visible` | `boolean` | - | Show/hide column |
| `textAlign` | `string` | - | Cell text alignment |
| `format` | `string` | - | Format string |
| `template` | `string \| Function` | - | Cell template |
| `headerTemplate` | `string \| Function` | - | Header template |
| `footerTemplate` | `string \| Function` | - | Footer template |
| `validationRules` | `Object` | - | Validation rules |
| `allowFiltering` | `boolean` | - | Enable column filtering |
| `allowSorting` | `boolean` | - | Enable column sorting |
| `editType` | `string` | - | Edit control type |
| `allowEditing` | `boolean` | - | Enable cell editing |
| `displayAsCheckBox` | `boolean` | - | Display as checkbox |
| `allowReordering` | `boolean` | - | Allow column reorder |
| `allowResizing` | `boolean` | - | Allow column resize |
| `showColumnMenu` | `boolean` | - | Show column menu |

## Total: 70+ Properties Documented

