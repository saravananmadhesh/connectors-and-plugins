# TreeGrid Events

## Table of Contents
- [Overview](#overview)
- [Event Categories](#event-categories)
- [actionBegin/actionComplete RequestTypes](#actionbeginactioncomplete-requesttypes)
- [Event Usage Patterns](#event-usage-patterns)
- [Event Flow Timeline](#event-flow-timeline)
- [Common Event Handlers](#common-event-handlers)
- [Event Cancellation Quick Reference](#event-cancellation-quick-reference)

## Overview

TreeGrid events allow you to respond to user interactions and TreeGrid state changes. Events are triggered at specific points in the TreeGrid's lifecycle and when users perform actions like editing, selecting, sorting, and filtering.

## Event Categories

### Lifecycle Events

| Event | When | Args | Cancellable |
|-------|------|------|-------------|
| **load** | Before rendering | Object | No |
| **created** | Component created | Object | No |
| **beforeDataBound** | Before data binding | BeforeDataBoundArgs | Yes |
| **dataBound** | After data binding | Object | No |
| **dataSourceChanged** | Data added/deleted/updated | DataSourceChangedEventArgs | No |

---

### Selection Events

| Event | When | Can Cancel | Use Case |
|-------|------|-----------|----------|
| **rowSelecting** | Before row selected | Yes | Prevent selection of specific rows |
| **rowSelected** | After row selected | No | Handle row selection |
| **rowDeselecting** | Before row deselected | Yes | Prevent deselection |
| **rowDeselected** | After row deselected | No | Handle deselection |
| **cellSelecting** | Before cell selected | Yes | Prevent cell selection |
| **cellSelected** | After cell selected | No | Handle cell selection |
| **cellDeselecting** | Before cell deselected | Yes | Prevent cell deselection |
| **cellDeselected** | After cell deselected | No | Handle cell deselection |
| **checkboxChange** | Checkbox state changes | No | Handle checkbox changes |

---

### Editing Events

| Event | When | Can Cancel | Use Case |
|-------|------|-----------|----------|
| **beginEdit** | Before edit starts | Yes | Validate before editing |
| **cellEdit** | While cell editing | No | Monitor edit changes |
| **cellSave** | While cell saving | No | Process cell changes |
| **cellSaved** | After cell saved | No | Handle save completion |
| **batchAdd** | Records added in batch | No | Handle batch additions |
| **beforeBatchAdd** | Before batch add | Yes | Validate batch adds |
| **batchDelete** | Records deleted in batch | No | Handle batch deletes |
| **beforeBatchDelete** | Before batch delete | Yes | Validate batch deletes |
| **beforeBatchSave** | Before batch save | Yes | Validate batch saves |
| **batchCancel** | Batch cancelled | Yes | Handle cancellation |

---

### Expansion Events

| Event | When | Args | Can Cancel |
|-------|------|------|-----------|
| **expanding** | Record expanding | RowExpandingEventArgs | Yes |
| **expanded** | Record expanded | RowExpandedEventArgs | No |
| **collapsing** | Record collapsing | RowCollapsingEventArgs | Yes |
| **collapsed** | Record collapsed | RowCollapsedEventArgs | No |

---

### Column Events

| Event | When | Args | Can Cancel |
|-------|------|------|-----------|
| **columnDragStart** | Drag starts | ColumnDragEventArgs | No |
| **columnDrag** | Dragging | ColumnDragEventArgs | No |
| **columnDrop** | Column dropped | ColumnDragEventArgs | No |
| **columnMenuOpen** | Menu opening | ColumnMenuOpenEventArgs | Yes |
| **columnMenuClick** | Menu clicked | MenuEventArgs | No |
| **resizeStart** | Resize starts | ResizeArgs | No |
| **resizing** | Resizing | ResizeArgs | No |
| **resizeStop** | Resize stops | ResizeArgs | No |

---

### Export Events

| Event | Service | When | Can Cancel |
|-------|---------|------|-----------|
| **beforeExcelExport** | Excel | Before export | Yes |
| **excelExportComplete** | Excel | After export | No |
| **excelQueryCellInfo** | Excel | Per cell | No |
| **excelHeaderQueryCellInfo** | Excel | Per header | No |
| **excelAggregateQueryCellInfo** | Excel | Per aggregate | No |
| **beforePdfExport** | PDF | Before export | Yes |
| **pdfExportComplete** | PDF | After export | No |
| **pdfQueryCellInfo** | PDF | Per cell | No |
| **pdfHeaderQueryCellInfo** | PDF | Per header | No |
| **pdfAggregateQueryCellInfo** | PDF | Per aggregate | No |

---

### Print Events

| Event | When | Args | Can Cancel |
|-------|------|------|-----------|
| **beforePrint** | Before print | PrintEventArgs | Yes |
| **printComplete** | After print | PrintEventArgs | No |

---

### Cell & Row Events

| Event | When | Args | Use Case |
|-------|------|------|----------|
| **queryCellInfo** | Accessing cell | QueryCellInfoEventArgs | Style cells dynamically |
| **headerCellInfo** | Accessing header | HeaderCellInfoEventArgs | Customize headers |
| **rowDataBound** | Row appending | RowDataBoundEventArgs | Style rows dynamically |
| **recordDoubleClick** | Double-click | RecordDoubleClickEventArgs | Handle double-click |
| **detailDataBound** | Detail expands | DetailDataBoundEventArgs | Handle detail expansion |

---

### Row Drag-Drop Events

| Event | When | Args | Can Cancel |
|-------|------|------|-----------|
| **rowDragStartHelper** | Just before drag | RowDragEventArgs | No |
| **rowDragStart** | Drag starts | RowDragEventArgs | No |
| **rowDrag** | Dragging | RowDragEventArgs | No |
| **rowDrop** | Row dropped | RowDragEventArgs | No |

---

### UI Events

| Event | When | Args |
|-------|------|------|
| **toolbarClick** | Toolbar clicked | ClickEventArgs |
| **contextMenuOpen** | Context menu opening | BeforeOpenCloseMenuEventArgs |
| **contextMenuClick** | Context menu clicked | MenuEventArgs |

---

### Copy/Paste Events

| Event | When | Args | Can Cancel |
|-------|------|------|-----------|
| **beforeCopy** | Before copy | BeforeCopyEventArgs | Yes |
| **beforePaste** | Before paste | BeforePasteEventArgs | Yes |

---

### Action Events

| Event | RequestType | When | Can Cancel |
|-------|-------------|------|-----------|
| **actionBegin** | Various | Action starts | Yes |
| **actionComplete** | Various | Action completes | No |
| **actionFailure** | Error | Action fails | No |
| **dataStateChange** | Various | State changes | No |

---

## actionBegin/actionComplete RequestTypes

| RequestType | When Triggered | Args Object Properties |
|-------------|----------------|----|
| **paging** | Page navigation | currentPage, pageSize |
| **filtering** | Filter applied | columns, filterOperator |
| **sorting** | Sort applied | columnName, direction |
| **searching** | Search performed | searchString |
| **add** | Add record | data |
| **edit** | Edit record | data, rowData |
| **save** | Save record | data, rowData |
| **delete** | Delete record | data, rowData |

---

## Event Usage Patterns

### Prevent Action
```javascript
@actionBegin="(args) => {
  if (args.requestType === 'delete') {
    args.cancel = true; // Cancel delete
  }
}"
```

### Validate Before Action
```javascript
@beginEdit="(args) => {
  if (args.data.priority === 'Critical') {
    args.cancel = true; // Prevent editing critical tasks
  }
}"
```

### Customize Export
```javascript
@excelQueryCellInfo="(args) => {
  if (args.cell.colIndex === 3 && args.data.progress > 75) {
    args.style = { backColor: '#90EE90' }; // Green
  }
}"
```

### Handle Row Styling at Runtime
```javascript
@queryRowInfo="(args) => {
  if (args.data.status === 'Done') {
    args.row.classList.add('completed-row');
  }
}"
```

### Track Data Changes
```javascript
@dataSourceChanged="(args) => {
  console.log('Action:', args.action);
  console.log('Data:', args.data);
  // Sync with backend
}"
```

### Expand Only Parent Rows
```javascript
@expanding="(args) => {
  if (!args.data.children || args.data.children.length === 0) {
    args.cancel = true; // Can't expand leaf nodes
  }
}"
```

---

## Event Flow Timeline

```
Page Load
  ↓
load
  ↓
created
  ↓
beforeDataBound
  ↓
dataBound
  ↓
User Interaction
  ├─ Select Row
  │  ├─ rowSelecting (can cancel)
  │  └─ rowSelected
  │
  ├─ Edit Cell
  │  ├─ beginEdit (can cancel)
  │  ├─ cellEdit
  │  ├─ cellSave
  │  ├─ cellSaved
  │  └─ actionComplete
  │
  ├─ Expand Row
  │  ├─ expanding (can cancel)
  │  └─ expanded
  │
  ├─ Export Data
  │  ├─ beforeExcelExport (can cancel)
  │  ├─ excelQueryCellInfo (per cell)
  │  └─ excelExportComplete
  │
  ├─ Filter/Sort/Search
  │  ├─ actionBegin (can cancel)
  │  └─ actionComplete
  │
  └─ Drag Row
     ├─ rowDragStartHelper
     ├─ rowDragStart
     ├─ rowDrag
     └─ rowDrop
```

---

## Common Event Handlers

### Monitor All Actions
```javascript
@actionBegin="onActionBegin"
@actionComplete="onActionComplete"
@actionFailure="onActionFailure"

const onActionBegin = (args) => {
  console.log(`Action starting: ${args.requestType}`);
};

const onActionComplete = (args) => {
  console.log(`Action complete: ${args.requestType}`);
};

const onActionFailure = (args) => {
  console.error(`Action failed:`, args.error);
};
```

### Handle Selection
```javascript
@rowSelected="onRowSelected"
@cellSelected="onCellSelected"

const onRowSelected = (args) => {
  console.log('Row selected:', args.rowIndex, args.rowData);
};

const onCellSelected = (args) => {
  console.log('Cell selected:', args.cellIndex);
};
```

### Customize on Render
```javascript
@queryCellInfo="onQueryCellInfo"
@rowDataBound="onRowDataBound"

const onQueryCellInfo = (args) => {
  // Customize cell
};

const onRowDataBound = (args) => {
  // Customize row
};
```

---

## Event Cancellation Quick Reference

| Event | Cancellable | How to Cancel |
|-------|-----------|--------------|
| **rowSelecting** | ✓ | `args.cancel = true` |
| **beginEdit** | ✓ | `args.cancel = true` |
| **actionBegin** | ✓ | `args.cancel = true` |
| **expanding** | ✓ | `args.cancel = true` |
| **beforeBatchSave** | ✓ | `args.cancel = true` |
| **beforeExcelExport** | ✓ | `args.cancel = true` |
| **columnMenuOpen** | ✓ | `args.cancel = true` |
| **beforeCopy** | ✓ | `args.cancel = true` |
| **beforePaste** | ✓ | `args.cancel = true` |

---
