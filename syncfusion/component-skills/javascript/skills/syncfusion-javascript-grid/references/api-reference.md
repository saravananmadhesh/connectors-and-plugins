# JavaScript Grid - API Reference

## Table of Contents
- [All Properties Reference](#all-properties-reference)
  - [Data & Query Properties](#data--query-properties)
  - [Paging Properties](#paging-properties)
  - [Sorting Properties](#sorting-properties)
  - [Filtering Properties](#filtering-properties)
  - [Selection Properties](#selection-properties)
  - [Editing Properties](#editing-properties)
  - [Layout & Display Properties](#layout--display-properties)
  - [Grouping Properties](#grouping-properties)
  - [Virtualization & Performance](#virtualization--performance)
  - [Column Operations](#column-operations)
  - [Row Operations](#row-operations)
  - [UI Features](#ui-features)
  - [Export Properties](#export-properties)
  - [Accessibility & Localization](#accessibility--localization)
  - [State & Configuration](#state--configuration)
- [Key Methods Reference](#key-methods-reference)
  - [Data Methods](#data-methods)
  - [Row Methods](#row-methods)
  - [Cell Methods](#cell-methods)
  - [Column Methods](#column-methods)
  - [Selection Methods](#selection-methods)
  - [Editing Methods](#editing-methods)
  - [Filtering Methods](#filtering-methods)
  - [Sorting Methods](#sorting-methods)
  - [Grouping Methods](#grouping-methods)
  - [Paging Methods](#paging-methods)
  - [Export Methods](#export-methods)
  - [Toolbar Methods](#toolbar-methods)
  - [Hierarchy/Detail Row Methods](#hierarchydetail-row-methods)
  - [State Methods](#state-methods)
- [Common Usage Patterns](#common-usage-patterns)
- [Module Injection Requirements](#module-injection-requirements)
- [Property Notes](#property-notes)

## When to Use This Reference

- Lookup all 112+ grid properties by functional category
- Understand property configuration and allowed values
- Find proper method names and signatures for grid operations
- Check module injection requirements for specific features
- Configure events and event handlers
- Discover properties, methods, and settings quickly

---

## All Properties Reference

Complete reference of all 112+ Grid properties organized by functional category.

### Data & Query Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `dataSource` | `Object[], DataManager, DataResult` | `[]` | Primary data source for grid rows |
| `columns` | `Column[], string[], ColumnModel[]` | `[]` | Column schema definition |
| `query` | `Query` | `null` | External Query for data processing |
| `aggregates` | `AggregateRowModel[]` | `[]` | Aggregate row configurations |
| `childGrid` | `GridModel` | `''` | Child grid for hierarchy |
| `queryString` | `string` | `''` | Relationship key for parent-child |

### Paging Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowPaging` | `boolean` | `false` | Enable/disable paging |
| `pageSettings` | `PageSettingsModel` | `{currentPage:1, pageSize:12}` | Pagination configuration |

### Sorting Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowSorting` | `boolean` | `false` | Enable column sorting |
| `allowMultiSorting` | `boolean` | `false` | Allow sorting multiple columns |
| `sortSettings` | `SortSettingsModel` | `{columns:[]}` | Pre-defined sort configuration |

### Filtering Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowFiltering` | `boolean` | `false` | Enable filter bar |
| `filterSettings` | `FilterSettingsModel` | `{type:'FilterBar', mode:'Immediate'}` | Filter configuration |
| `searchSettings` | `SearchSettingsModel` | `{ignoreCase:true, fields:[]}` | Search behavior |

### Selection Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowSelection` | `boolean` | `true` | Enable row/cell selection |
| `selectionSettings` | `SelectionSettingsModel` | `{mode:'Row', type:'Single'}` | Selection mode & type |
| `selectedRowIndex` | `number` | `-1` | Initial selected row index |
| `isRowSelectable` | `RowSelectable, string` | `null` | Determine selectable rows |

### Editing Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `editSettings` | `EditSettingsModel` | `{allowEditing:false, mode:'Normal'}` | Edit behavior & mode |
| `detailTemplate` | `string, Function` | `null` | Detail row template |
| `emptyRecordTemplate` | `string, Function` | `null` | Empty grid message template |
| `rowTemplate` | `string, Function` | `null` | Custom row template |

### Layout & Display Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `height` | `string, number` | `'auto'` | Scrollable content height |
| `width` | `string, number` | `'auto'` | Grid width |
| `rowHeight` | `number` | `null` | Uniform row height |
| `gridLines` | `GridLine` | `'Default'` | Grid line display mode |
| `clipMode` | `ClipMode` | `'Ellipsis'` | Cell overflow behavior |
| `enableAltRow` | `boolean` | `true` | Alternate row styling |
| `enableHover` | `boolean` | `true` | Row hover highlight |
| `enableStickyHeader` | `boolean` | `false` | Sticky column headers |
| `allowTextWrap` | `boolean` | `false` | Text wrapping in cells |
| `cssClass` | `string` | `''` | Custom CSS class |

### Grouping Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowGrouping` | `boolean` | `false` | Enable grouping |
| `groupSettings` | `GroupSettingsModel` | `{columns:[]}` | Pre-defined grouping |

### Virtualization & Performance

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `enableVirtualization` | `boolean` | `false` | Virtual scroll (rows) |
| `enableColumnVirtualization` | `boolean` | `false` | Virtual scroll (columns) |
| `enableInfiniteScrolling` | `boolean` | `false` | Infinite scroll loading |
| `infiniteScrollSettings` | `InfiniteScrollSettingsModel` | `{enableCache:false, maxBlocks:5}` | Infinite scroll config |
| `enableVirtualMaskRow` | `boolean` | `true` | Shimmer effect for virtual rows |
| `enablePersistence` | `boolean` | `false` | Persist state on page reload |
| `enableImmutableMode` | `boolean` | `false` | Reuse rows for better performance |
| `requireTemplateRef` | `boolean` | `true` | Keep template references |

### Column Operations

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowReordering` | `boolean` | `false` | Allow column drag-drop reorder |
| `allowResizing` | `boolean` | `false` | Allow column resize |
| `frozenColumns` | `number` | `0` | Number of frozen columns |
| `frozenRows` | `number` | `0` | Number of frozen rows |
| `resizeSettings` | `ResizeSettingsModel` | `{mode:'Normal'}` | Column resize mode |
| `rowRenderingMode` | `RowRenderingDirection` | `'Horizontal'` | Row rendering direction |
| `autoFit` | `boolean` | `false` | Auto-fit columns |

### Row Operations

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowRowDragAndDrop` | `boolean` | `false` | Enable row drag-drop |
| `rowDragAndDropModule` | `RowDD` | Module ref | Row drag-drop module |
| `rowDropSettings` | `RowDropSettingsModel` | `{targetID:''}` | Drop target config |
| `isRowPinned` | `PinRow, Function` | `null` | Determine pinned rows |

### UI Features

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `showColumnChooser` | `boolean` | `false` | Show column visibility UI |
| `showColumnMenu` | `boolean` | `false` | Show column context menu |
| `columnChooserSettings` | `ColumnChooserSettingsModel` | `{columnChooserOperator:'startsWith'}` | Column chooser config |
| `columnMenuItems` | `ColumnMenuItem[], ColumnMenuItemModel[]` | `null` | Column menu items |
| `contextMenuItems` | `ContextMenuItem[], ContextMenuItemModel[]` | `null` | Context menu items |
| `toolbar` | `string[], string, object[]` | `null` | Toolbar items |
| `toolbarTemplate` | `string, Function` | `null` | Custom toolbar template |
| `pagerTemplate` | `string, Function` | `null` | Custom pager template |

### Export Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowExcelExport` | `boolean` | `false` | Enable Excel export |
| `allowPdfExport` | `boolean` | `false` | Enable PDF export |
| `printMode` | `PrintMode` | `'AllPages'` | Print pages scope |
| `exportGrids` | `string[]` | `null` | IDs of grids to export |
| `hierarchyPrintMode` | `HierarchyGridPrintMode` | `'Expanded'` | Hierarchy print mode |

### Accessibility & Localization

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `enableKeyboard` | `boolean` | `true` | Keyboard interaction |
| `allowKeyboard` | `boolean` | `true` | Allow keyboard navigation |

| `enableAdaptiveUI` | `boolean` | `false` | Adaptive UI dialogs |
| `enableAutoFill` | `boolean` | `false` | Auto-fill on cell selection |
| `enableColumnSpan` | `boolean` | `false` | Column span for same data |
| `enableRowSpan` | `boolean` | `false` | Row span for same data |
| `enableHeaderFocus` | `boolean` | `true` | Focus on header |
| `locale` | `string` | `''` | Culture/localization |
| `adaptiveUIMode` | `AdaptiveMode` | `'Both'` | Adaptive UI mode |
| `columnQueryMode` | `ColumnQueryModeType` | `'All'` | Data retrieval mode |

### State & Configuration

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `loadingIndicator` | `LoadingIndicatorModel` | `{indicatorType:'Spinner'}` | Loading indicator config |
| `currentAction` | `ActionArgs` | `{}` | Current action details (read-only) |
| `currentViewData` | `Object[]` | `[]` | Currently visible records (read-only) |
| `parentDetails` | `ParentDetails` | `{}` | Parent grid details (read-only) |
| `ej2StatePersistenceVersion` | `string` | `''` | State persistence version |
| `textWrapSettings` | `TextWrapSettingsModel` | `{wrapMode:'Both'}` | Text wrap configuration |

---

## Key Methods Reference

### Data Methods

| Method | Parameters | Returns | Purpose |
|--------|-----------|---------|---------|
| `setProperties(properties, muteOnNotify)` | `properties: Object, muteOnNotify?: boolean` | `void` | Update grid properties dynamically |
| `refresh()` | `none` | `void` | Refresh/redraw entire grid |
| `refreshRows(rowIndexes)` | `rowIndexes: Object` | `void` | Refresh specific rows |
| `refreshHeader()` | `none` | `void` | Refresh column headers |
| `getRowsObject()` | `none` | `Row[]` | Get all row objects |
| `getRowByIndex(index)` | `index: number` | `HTMLTableRowElement` | Get row element by index |
| `getRowData(index)` | `index?: number` | `any` | Get row/current row data |
| `getCurrentViewRecords()` | `none` | `Object[]` | Get visible data records |
| `getContentTable()` | `none` | `HTMLTableElement` | Get content table element |
| `getHeaderTable()` | `none` | `HTMLTableElement` | Get header table element |

### Row Methods

| Method | Parameters | Returns | Purpose |
|--------|-----------|---------|---------|
| `selectRow(index, isToggle)` | `index: number, isToggle?: boolean` | `void` | Select row by index |
| `getSelectedRowIndexes()` | `none` | `number[]` | Get selected row indexes |
| `getSelectedRowCells()` | `none` | `HTMLTableCellElement[]` | Get selected row cells |
| `insertRow(data, rowIndex)` | `data: Object, rowIndex?: number` | `void` | Insert new row |
| `deleteRow(tr)` | `tr: HTMLElement` | `void` | Delete row |
| `updateRow(index, data)` | `index: number, data: any` | `void` | Update row data |
| `startEdit(tr)` | `tr?: HTMLElement` | `void` | Start row edit |
| `endEdit()` | `none` | `void` | End row edit |
| `addRecord(data, index)` | `data?: Object, index?: number` | `void` | Add new record |
| `deleteRecord(key, record)` | `key?: string, record?: any` | `void` | Delete record |

### Cell Methods

| Method | Parameters | Returns | Purpose |
|--------|-----------|---------|---------|
| `selectCell(rowIndex, colIndex)` | `rowIndex: number, colIndex: number` | `void` | Select cell by position |
| `startEdit(tr)` | `tr?: HTMLElement` | `void` | Start cell edit mode |
| `setCellValue(rowIndex, field, value)` | `rowIndex: number, field: string, value: any` | `void` | Update cell value |
| `getCellValue(rowIndex, field)` | `rowIndex: number, field: string` | `any` | Get cell value |
| `getSelectedCellIndexes()` | `none` | `CellIndex[]` | Get selected cell indexes |
| `editCell(index, field)` | `index: number, field: string` | `void` | Edit specific cell |
| `getBoundingClientRect(rowIndex, colIndex)` | `rowIndex: number, colIndex: number` | `any` | Get cell position info |

### Column Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `getColumns()` | `none` | `Column[]` | Get all column objects |
| `getColumnByField(field)` | `field: string` | `Column` | Get column by field name |
| `getColumnIndexByField(field)` | `field: string` | `number` | Get column index by field |
| `hideColumns(keys, hideBy)` | `keys: string[], hideBy?: string` | `void` | Hide columns by keys |
| `showColumns(keys, showBy)` | `keys: string[], showBy?: string` | `void` | Show columns by keys |
| `reorderColumns(fromIndex, toIndex)` | `fromIndex: number, toIndex: number` | `void` | Reorder column position |
| `autoFitColumns()` | `none` | `void` | Auto-fit all columns |
| `resizeColumn(field, width)` | `field: string, width: number` | `void` | Resize column width |
| `setColumnWidth(width, colIndex)` | `width: number, colIndex: number` | `void` | Set column width by index |
| `moveTo(toIndex)` | `toIndex: number` | `void` | Move column to index |

### Selection Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `selectRows(rowIndexes)` | `rowIndexes: number[]` | `void` | Select multiple rows |
| `selectCells(cellIndexes)` | `cellIndexes: CellIndex[]` | `void` | Select multiple cells |
| `clearSelection()` | `none` | `void` | Clear all selections |
| `clearCellSelection()` | `none` | `void` | Clear cell selections |
| `clearRowSelection()` | `none` | `void` | Clear row selections |
| `getSelectedRecords()` | `none` | `Object[]` | Get data of selected rows |

### Editing Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `closeEdit()` | `none` | `void` | Close edit mode |
| `cancelEdit()` | `none` | `void` | Cancel and revert edit |
| `saveCell(isForceSave)` | `isForceSave?: boolean` | `void` | Save current cell edit |
| `getBatchChanges()` | `none` | `BatchChanges` | Get batch edit changes |
| `batchSave()` | `none` | `void` | Save batch changes |
| `batchCancel()` | `none` | `void` | Cancel batch changes |

### Filtering Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `filter(fieldName, operator, value, type)` | Complex params | `void` | Apply filter |
| `clearFiltering(columns)` | `columns?: string[]` | `void` | Clear filters |
| `getFilteredRecords()` | `none` | `Object[]` | Get filtered data |
| `getFilteredRowIndexes()` | `none` | `number[]` | Get filtered row indexes |

### Sorting Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `sortByColumn(fieldName, direction, isMultiSort)` | `fieldName: string, direction: string, isMultiSort?: boolean` | `void` | Sort by column |
| `removeSortColumn(field)` | `field: string` | `void` | Remove sort from column |
| `clearSorting()` | `none` | `void` | Clear all sorts |

### Grouping Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `groupColumn(fieldName)` | `fieldName: string` | `void` | Group by column |
| `ungroupColumn(fieldName)` | `fieldName: string` | `void` | Remove grouping |
| `clearGrouping()` | `none` | `void` | Clear all groups |
| `expandCollapseGroup(target)` | `target: any` | `void` | Toggle group expand/collapse |

### Paging Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `goToPage(pageNumber)` | `pageNumber: number` | `void` | Navigate to page |
| `getPageCount()` | `none` | `number` | Get total page count |
| `getPager()` | `none` | `PagerComponent` | Get pager component |

### Export Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `excelExport(excelExportProperties)` | `excelExportProperties?: any` | `void` | Export to Excel |
| `pdfExport(pdfExportProperties)` | `pdfExportProperties?: any` | `void` | Export to PDF |
| `csvExport(csvExportProperties)` | `csvExportProperties?: any` | `void` | Export to CSV |
| `print()` | `none` | `void` | Print grid |

### Toolbar Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `addToolbarItem(item)` | `item: ItemModel, index?: number` | `void` | Add toolbar item |
| `removeToolbarItem(item)` | `item: number, string` | `void` | Remove toolbar item |
| `updateToolbarItem(item)` | `item: ItemModel` | `void` | Update toolbar item |
| `enableToolbarItems(items, enable)` | `items: string[], enable: boolean` | `void` | Enable/disable toolbar items |

### Hierarchy/Detail Row Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `expandRow(target)` | `target: number, HTMLElement` | `void` | Expand detail row |
| `collapseRow(target)` | `target: number, HTMLElement` | `void` | Collapse detail row |
| `expandAll()` | `none` | `void` | Expand all groups/details |
| `collapseAll()` | `none` | `void` | Collapse all groups/details |
| `getDetailRowInstance(gridName)` | `gridName: string` | `Grid` | Get child grid instance |

### State Methods

| Method | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `getPersistData()` | `none` | `Object` | Get persisted state data |
| `resetPersistData()` | `none` | `void` | Reset persisted state |
| `getCurrentViewRecords()` | `none` | `Object[]` | Get current view records |

---

## Common Usage Patterns

### Basic Grid Setup

```ts
import { Grid, Page, Sort, Filter, Inject } from '@syncfusion/ej2-grids';

const gridElement = document.getElementById('grid');
const grid: Grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  height: 400,
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  pageSettings: { pageSize: 12 }
});
grid.appendTo(gridElement);
Inject(Page, Sort, Filter);
```

### With DataManager and Remote Data

```ts
const grid: Grid = new Grid({
  dataSource: {
    url: 'url',
    adaptor: new UrlAdaptor()
  },
  columns: [
    { field: 'OrderID', headerText: 'ID', width: 100 },
    { field: 'CustomerName', headerText: 'Name', width: 150 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});
grid.appendTo('#grid');
```

### Advanced with Editing & Toolbar

```ts
const grid: Grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  editSettings: {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
  actionBegin: (args: any) => {
    if (args.requestType === 'save') {
      console.log('Saving:', args.data);
    }
  }
});
grid.appendTo('#grid');
Inject(Page, Sort, Filter, Edit, Toolbar);
```

### Virtual Scrolling for Large Datasets

```ts
const grid: Grid = new Grid({
  dataSource: largeDataset,
  columns: [...],
  height: 400,
  enableVirtualization: true,
  pageSettings: { pageSize: 50 }
});
grid.appendTo('#grid');
Inject(VirtualScroll);
```

### Frozen Columns & Rows

```ts
const grid: Grid = new Grid({
  dataSource: data,
  columns: [...],
  frozenColumns: 2,
  frozenRows: 1,
  height: 400
});
grid.appendTo('#grid');
Inject(Freeze);
```

### Master-Detail with Child Grid

```ts
const grid: Grid = new Grid({
  dataSource: masterData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer' }
  ],
  childGrid: {
    dataSource: childData,
    columns: [
      { field: 'OrderID', headerText: 'Order ID' },
      { field: 'ProductName', headerText: 'Product' }
    ],
    queryString: 'OrderID'
  },
  detailTemplate: '<div>${OrderID}</div>'
});
grid.appendTo('#grid');
```

---

## Module Injection Requirements

Grid features require specific module injection:

| Feature | Module | Syntax |
|---------|--------|--------|
| Paging | `Page` | `Inject(Page)` |
| Sorting | `Sort` | `Inject(Sort)` |
| Filtering | `Filter` | `Inject(Filter)` |
| Grouping | `Group` | `Inject(Group)` |
| Editing | `Edit` | `Inject(Edit)` |
| Selection | `Selection` | `Inject(Selection)` |
| Virtual Scrolling | `VirtualScroll` | `Inject(VirtualScroll)` |
| Infinite Scrolling | `InfiniteScroll` | `Inject(InfiniteScroll)` |
| Toolbar | `Toolbar` | `Inject(Toolbar)` |
| Excel Export | `ExcelExport` | `Inject(ExcelExport)` |
| PDF Export | `PdfExport` | `Inject(PdfExport)` |
| CSV Export | `CsvExport` | `Inject(CsvExport)` |
| Print | `Print` | `Inject(Print)` |
| Column Menu | `ColumnMenu` | `Inject(ColumnMenu)` |
| Context Menu | `ContextMenu` | `Inject(ContextMenu)` |
| Column Chooser | `ColumnChooser` | `Inject(ColumnChooser)` |
| Reorder | `Reorder` | `Inject(Reorder)` |
| Resize | `Resize` | `Inject(Resize)` |
| Row Drag & Drop | `RowDD` | `Inject(RowDD)` |
| Freeze | `Freeze` | `Inject(Freeze)` |
| Search | `Search` | `Inject(Search)` |
| Aggregate | `Aggregate` | `Inject(Aggregate)` |
| Clipboard | `Clipboard` | `Inject(Clipboard)` |

### Import Example

```ts
import {
  Grid, Page, Sort, Filter, Group, Edit, Toolbar,
  Inject, VirtualScroll, ExcelExport, PdfExport, Selection
} from '@syncfusion/ej2-grids';

// Use in grid
Inject(Page, Sort, Filter, Group, Edit, Toolbar, VirtualScroll, ExcelExport, PdfExport, Selection);
```

---

## Quick Usage Examples

### Setting Data Dynamically

```ts
const grid = document.querySelector('#grid').ej2_instances[0];

// Update dataSource
grid.dataSource = newData;
grid.refresh();

// Add row
grid.addRecord({ OrderID: 10001, CustomerID: 'ABC123', Freight: 25.5 });

// Update cell
grid.setCellValue(0, 'Freight', 30.5);

// Delete row
grid.deleteRecord('key', rowData);
```

### Event Handling

```ts
const grid: Grid = new Grid({
  dataSource: data,
  actionBegin: (args: any) => {
    console.log('Action:', args.requestType);
  },
  actionComplete: (args: any) => {
    if (args.requestType === 'save') {
      console.log('Saved:', args.data);
    }
  },
  recordDoubleClick: (args: any) => {
    console.log('Row double clicked:', args.rowData);
  }
});
grid.appendTo('#grid');
```

### Selection

```ts
// Select row
grid.selectRow(0);

// Select multiple rows
grid.selectRows([0, 2, 4]);

// Get selected rows
const selected = grid.getSelectedRecords();
console.log(selected);

// Clear selection
grid.clearSelection();
```

### Filtering & Sorting

```ts
// Apply filter
grid.filter('CustomerID', 'equal', 'VINET');

// Multi-column sort
grid.sortByColumn('OrderDate', 'Descending', true);
grid.sortByColumn('CustomerID', 'Ascending', true);

// Clear filters
grid.clearFiltering();
```

---

## Property Notes

- **Core properties** (dataSource, columns, query) require no module injection
- **Performance**: Use `enableVirtualization` for datasets >1000 rows, `enableInfiniteScrolling` for continuous loading
- **State Persistence**: Set `enablePersistence: true` + `ej2StatePersistenceVersion` to maintain state across reloads
- **Accessibility**: Enable `enableRtl` for RTL languages, `enableKeyboard` for keyboard navigation
- **Formatting**: `clipMode: 'Ellipsis'` for overflow text, `allowTextWrap: true` for multi-line cells
- **Selection**: `selectionSettings.type: 'Multiple'` allows multi-select, `mode: 'Cell'` for cell selection
- **Editing**: Inject `Edit` module and set `editSettings.mode` to "Dialog", "Batch", "InlineEdit", "InlineAdd"
- **Modules**: Always inject required modules before calling related methods
- **Data Binding**: Use `DataManager` for remote data, local arrays for client-side data
- **Events**: Use `actionBegin` to intercept/cancel, `actionComplete` for post-action processing
