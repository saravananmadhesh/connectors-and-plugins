# Events in Syncfusion Gantt Chart

## Table of Contents
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [actionFailure](#actionfailure)
- [cellEdit](#celledit)
- [beforeTooltipRender](#beforetooltiprender)
- [beforeExcelExport](#beforeexcelexport)
- [beforePdfExport](#beforepdfexport)
- [Cell Selection Events](#cell-selection-events)
- [Row Selection Events](#row-selection-events)
- [Column Drag Events](#column-drag-events)
- [Column Menu Events](#column-menu-events)
- [contextMenuClick](#contextmenuclick)
- [Export Complete Events](#export-complete-events)
- [requestType Reference](#requesttype-reference)

---

## actionBegin

Fires **before** Gantt processes any action (add/edit/delete/sort/filter/dependency/zoom).

```typescript
actionBegin: function(args: any) {
    if (args.requestType === 'beforeSave') {
        args.cancel = true;  // abort save
    }
    if (args.requestType === 'filtering') {
        console.log('Filtering column:', args.currentFilteringColumn);
    }
    if (args.requestType === 'sorting') {
        console.log('Sort column:', args.columnName, args.direction);
    }
}
```

| Operation | Argument Type | Key Properties |
|-----------|--------------|----------------|
| Add/Edit/Delete | `ITaskAddedEventArgs` | `action`, `cancel`, `data`, `newTaskData`, `modifiedRecords`, `recordIndex`, `rowPosition` |
| Taskbar editing | `ITimeSpanEventArgs` | `cancel`, `requestType` ('taskbarEditing'), `projectStartDate`, `projectEndDate` |
| Filtering | `FilterEventArgs` | `cancel`, `columns`, `currentFilterObject`, `currentFilteringColumn`, `requestType` |
| Sorting | `SortEventArgs` | `cancel`, `columnName`, `direction`, `requestType` |
| Dependency | `IDependencyEventArgs` | `fromItem`, `toItem`, `isValidLink`, `newPredecessorString`, `requestType` |
| Zooming | `ZoomEventArgs` | `cancel`, `requestType` ('beforeZoomIn'/'beforeZoomOut'), `timeline` |

---

## actionComplete

Fires **after** an action successfully completes.

```typescript
actionComplete: function(args: any) {
    switch (args.requestType) {
        case 'filtering': console.log('Filter column:', args.currentFilteringColumn); break;
        case 'sorting':   console.log('Sorted:', args.columnName, args.direction); break;
        case 'save':      console.log('Saved task data:', args.modifiedTaskData); break;
        case 'delete':    console.log('Deleted records:', args.modifiedRecords); break;
        case 'AfterZoomIn':
        case 'AfterZoomOut':
        case 'AfterZoomToProject': console.log('New timeline:', args.timeline); break;
    }
}
```

---

## actionFailure

Fires when an operation fails. Import `FailureEventArgs` from `@syncfusion/ej2-grids`.

```typescript
actionFailure: function(args: FailureEventArgs) {
    console.error('Gantt error:', args.error[0]);
}
```

| Property | Type | Description |
|----------|------|-------------|
| `error` | Error | Error information |

---

## cellEdit

Fires when a grid cell enters edit mode. Use `args.cancel = true` to prevent editing.

```typescript
cellEdit: function(args: CellEditArgs) {
    if (args.columnName === 'StartDate') args.cancel = true;
}
```

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel edit |
| `cell` | Cell DOM element |
| `columnName` | Field name of edited column |
| `columnObject` | Column metadata |
| `row` | Row DOM element |
| `rowData` | Full row data |
| `value` | Current cell value before edit |
| `validationRules` | Column validation rules |

---

## beforeTooltipRender

Fires before any tooltip renders (taskbar, connector, timeline header).

```typescript
beforeTooltipRender: function(args: BeforeTooltipRenderEventArgs) {
    if (args.args.target.classList.contains('e-gantt-child-taskbar')) {
        args.content = `<b>${(args.data as any).TaskName}</b>`;
    }
    // args.cancel = true to suppress tooltip
}
```

| Property | Description |
|----------|-------------|
| `args` | Target element and interaction context |
| `content` | Tooltip HTML — override to customize |
| `cancel` | Set `true` to prevent tooltip display |
| `data` | Related Gantt task data |

---

## beforeExcelExport

Fires before exporting to Excel/CSV. Set `args.cancel = true` to abort.

```typescript
beforeExcelExport: function(args: any) {
    console.log(`Exporting to ${args.isCsv ? 'CSV' : 'Excel'}`);
}
```

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel export |
| `isCsv` | `true` if exporting as CSV, `false` for Excel |
| `name` | Event name |

---

## beforePdfExport

Fires before PDF export. Set `args.cancel = true` to abort.

```typescript
beforePdfExport: function(args: any) {
    // args.cancel = true to abort
}
```

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel export |
| `ganttObject` | Gantt instance reference |
| `name` | Event name |
| `requestType` | `'beforePdfExport'` |

---

## Cell Selection Events

Requires `selectionSettings.mode: 'Cell'` or `'Both'`.

```typescript
// cellSelecting — fires before selection; cancel to prevent
cellSelecting: function(args: CellSelectEventArgs) {
    if (args.cellIndex.rowIndex === 0) args.cancel = true;
},
// cellSelected — fires after selection
cellSelected: function(args: CellSelectEventArgs) {
    const { rowIndex, cellIndex } = args.cellIndex as any;
    console.log(`Selected row ${rowIndex}, col ${cellIndex}`);
},
// cellDeselecting — fires before deselection; cancel to keep selected
cellDeselecting: function(args: CellDeselectEventArgs) {
    console.log('Deselecting:', args.cellIndexes);
},
// cellDeselected — fires after deselection
cellDeselected: function(args: CellDeselectEventArgs) {
    console.log('Deselected:', args.cellIndexes);
}
```

**`CellSelectEventArgs`** (cellSelecting / cellSelected):

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel selection |
| `cellIndex` | `{ rowIndex, cellIndex }` of the target cell |
| `cells` | DOM elements of selected cells |
| `currentCell` | Cell element being selected |
| `data` | Row data for the cell |
| `previousRowCell` | Previously selected cell element |
| `previousRowCellIndex` | Index of previously selected cell |
| `selectedRowCellIndex` | Indices of selected row and column |

**`CellDeselectEventArgs`** (cellDeselecting / cellDeselected):

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel deselection |
| `cellIndexes` | Row and column indices of cells being deselected |
| `cells` | DOM elements of the deselecting cells |
| `data` | Row data for the deselecting cell |

---

## Row Selection Events

```typescript
rowSelecting:   function(args: any) { /* args.cancel = true to prevent */ },
rowSelected:    function(args: any) { console.log('Row selected:', args.data); },
rowDeselecting: function(args: any) { /* args.cancel = true to prevent */ },
rowDeselected:  function(args: any) { console.log('Row deselected:', args.data); }
```

| Event | Fires | Key `args` Properties |
|-------|-------|-----------------------|
| `rowSelecting` | Before row is selected | `cancel`, `data`, `rowIndex`, `isCtrlPressed`, `isShiftPressed` |
| `rowSelected` | After row is selected | `data`, `rowIndex`, `row` (HTMLElement) |
| `rowDeselecting` | Before row is deselected | `cancel`, `data`, `rowIndex` |
| `rowDeselected` | After row is deselected | `data`, `rowIndex` |

---

## Column Drag Events

Requires `allowReordering: true` + `Reorder` module injected.

```typescript
Gantt.Inject(Reorder);
// ...
allowReordering: true,
columnDragStart: function(args: ColumnDragEventArgs) { console.log('Drag started:', (args.column as any).field); },
columnDrag:      function(args: ColumnDragEventArgs) { console.log('Dragging over:', args.target); },
columnDrop:      function(args: ColumnDragEventArgs) { console.log('Dropped on:', args.target); }
```

**`ColumnDragEventArgs`** (all three events):

| Property | Description |
|----------|-------------|
| `column` | Column object being dragged/dropped |
| `target` | Element under drag pointer or drop target |
| `draggableType` | `'headercell'` (dragStart) or `'column'`/`'row'` |

---

## Column Menu Events

Requires `showColumnMenu: true` + `ColumnMenu` module injected.

```typescript
Gantt.Inject(ColumnMenu);
// ...
showColumnMenu: true,
columnMenuOpen: function(args: ColumnMenuOpenEventArgs) {
    args.items = args.items.filter((item: any) => item.id !== 'GanttCustom_columnMenuSortAscending');
},
columnMenuClick: function(args: ColumnMenuClickEventArgs) {
    console.log('Item clicked:', args.item.id, 'Column:', (args.column as any).field);
}
```

**`columnMenuOpen` — `ColumnMenuOpenEventArgs`:**

| Property | Description |
|----------|-------------|
| `cancel` | Set `true` to cancel menu opening |
| `column` | Column linked to the opened menu |
| `element` | Header element that triggered the menu |
| `items` | Menu items list (modifiable) |
| `left` / `top` | Viewport position of the menu |
| `name` | `'columnMenuOpen'` |
| `parentItem` | Parent item in nested menus |
| `showSubMenuOn` | Submenu trigger: click or hover |

**`columnMenuClick` — `ColumnMenuClickEventArgs`:**

| Property | Description |
|----------|-------------|
| `name` | `'columnMenuClick'` |
| `column` | Column linked to the menu item |
| `element` | DOM element of the clicked item |
| `item` | The menu item object clicked |

---

## contextMenuClick

Requires `ContextMenu` module injected + `contextMenuItems` configured.

```typescript
Gantt.Inject(ContextMenu);
// ...
contextMenuItems: ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask',
                   'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert'],
contextMenuClick: function(args: any) {
    console.log('Item:', args.item.id, 'Row:', args.rowData);
}
```

| Property | Description |
|----------|-------------|
| `name` | `'contextMenuClick'` |
| `element` | DOM element that triggered the menu |
| `event` | Pointer event with interaction details |
| `item` | Clicked menu item (`id`, `text`) |
| `type` | Type of menu item (e.g., `'Content'`) |
| `rowData` | Data object of the associated row |

---

## Export Complete Events

Use `args.promise` to access the blob for custom download handling.

```typescript
excelExportComplete: function(args: any) {
    args.promise.then((e: { blobData: Blob }) => { /* custom download */ });
},
pdfExportComplete: function(args: any) {
    args.promise.then((e: { blobData: Blob }) => { /* custom download */ });
}
```

---

## requestType Reference

| requestType | Event | Description |
|-------------|-------|-------------|
| `'beforeSave'` | actionBegin | Before task add/edit save |
| `'beforeDelete'` | actionBegin | Before task delete |
| `'taskbarEditing'` | actionBegin | During taskbar drag/resize |
| `'filtering'` | actionBegin/Complete | Filter applied |
| `'filterAfterOpen'` | actionComplete | Filter menu opened |
| `'sorting'` | actionBegin/Complete | Sort applied |
| `'beforeZoomIn'` | actionBegin | Before zoom in |
| `'beforeZoomOut'` | actionBegin | Before zoom out |
| `'AfterZoomIn'` | actionComplete | After zoom in |
| `'AfterZoomOut'` | actionComplete | After zoom out |
| `'AfterZoomToProject'` | actionComplete | After zoom to fit |
| `'save'` | actionComplete | After task saved |
| `'delete'` | actionComplete | After task deleted |
| `'validateLinkedTask'` | Before dependency link drawn / validated |
| `'updateDependency'` | actionBegin | Dependency update |
