---
name: events-catalog
description: 'Complete JavaScript Grid events reference with 85+ events, mandatory rules, requestType catalog, cancellation patterns, and event timing sequences.'
---

# Events Communication & Event Catalog

## Table of Contents

- [Mandatory Rules](#mandatory-rules-for-event-handling)
- [Event Binding Pattern](#event-binding-pattern)
- [All 85 Grid Events by Category](#all-85-grid-events-by-category)
- [requestType Full Catalog](#requesttype-full-catalog)
- [Cancellation Patterns](#cancellation-patterns)
- [Event Timing Sequences](#event-timing-sequences)

## When to Use This Reference

- Reference Grid event handling patterns and sequences
- Find all available grid events by category
- Understand event cancellation and event timing
- Implement event handlers for user actions
- Handle data changes and grid state updates

---

## Mandatory Rules for Event Handling

**CRITICAL:** Follow these rules when using Grid's event system.

### Rule 1: Event Handler Must Accept args Parameter

```ts
// ❌ WRONG
grid.addEventListener('actionComplete', () => console.log('done'));

// ✅ CORRECT
grid.addEventListener('actionComplete', (args: any) => {
  console.log('Type:', args.requestType);
});
```

### Rule 2: Use actionBegin for Cancellation, actionComplete for Reactions

| Use `actionBegin` when | Use `actionComplete` when |
|---|---|
| Cancel action (`args.cancel = true`) | Call backend API after save/delete |
| Modify data before save | Show toast notification |
| Confirm before delete | Refresh grid data |
| Block unauthorized actions | Sync external state |

```ts
grid.actionBegin = (args: any) => {
  if (args.requestType === 'delete') {
    args.cancel = !confirm('Delete?');
  }
  if (args.requestType === 'save') {
    args.data.UpdatedAt = new Date().toISOString();
  }
};

grid.actionComplete = (args: any) => {
  if (args.requestType === 'save') {
    apiService.syncRecord(args.data).then(() => showToast('Saved'));
  }
};

grid.actionFailure = (args: any) => {
  console.error('Error:', args.error);
};
```

### Rule 3: Event Timing Matters

| Event | Timing | Can Cancel? |
|-------|--------|-------------|
| `actionBegin` | Before action | ✅ |
| `actionComplete` | After action | ❌ |
| `rowSelecting` | Before selection | ✅ |
| `rowSelected` | After selection | ❌ |

### Rule 4: Never Call Grid Methods in Render Events

Don't call `refresh()`, `selectRow()`, etc. in `queryCellInfo` or `rowDataBound` — causes infinite loops. Use `actionComplete` instead.

### Rule 5: Error Handling is MANDATORY

Always wire `actionFailure` for proper error handling.

---

## Event Binding Pattern

```ts
// Configuration Object (Recommended)
const grid = new Grid({
  actionBegin: (args: any) => { console.log('Before:', args.requestType); },
  actionComplete: (args: any) => { console.log('After:', args.requestType); }
});
grid.appendTo('#grid');

// addEventListener
grid.addEventListener('actionBegin', (args: any) => { /* handler */ });

// Direct Property
grid.actionBegin = (args: any) => { /* handler */ };
```

---

## All 85 Grid Events by Category

### Lifecycle Events (4)
- `created` - Grid initialized 
- `load` - Before data binding
- `dataBound` - After data bound, rows rendered
- `destroyed` - Component destroyed

### Action Events (3)
- `actionBegin` - Before ANY action — Check `args.requestType`
- `actionComplete` - After action completes
- `actionFailure` - On action error — MANDATORY

### Row Events (7)
| Event | Cancellable | Use Case |
|-------|------------|----------|
| `rowDataBound` | ❌ | Per row render — style rows |
| `rowSelecting` | ✅ | Before selection — prevent locked |
| `rowSelected` | ❌ | After selected — update state |
| `rowDeselecting` | ✅ | Before deselection |
| `rowDeselected` | ❌ | After deselected |
| `recordClick` | ❌ | Single row click |
| `recordDoubleClick` | ❌ | Double click — edit trigger |

### Cell Events (8)
| Event | Cancellable | Use Case |
|-------|------------|----------|
| `queryCellInfo` | ❌ | Per cell render — style cells |
| `cellSelecting` | ✅ | Before select |
| `cellSelected` | ❌ | After selected |
| `cellDeselecting` | ✅ | Before deselect |
| `cellDeselected` | ❌ | After deselected |
| `cellEdit` | ✅ | Batch mode — prevent edit primary key |
| `cellSave` | ❌ | Cell saved (batch) |
| `cellSaved` | ❌ | After saved |

### Edit & Batch Events (7)
| Event | Cancellable | Use Case |
|-------|------------|----------|
| `beginEdit` | ✅ | Edit started — prevent certain records |
| `beforeBatchAdd` | ✅ | Before add |
| `beforeBatchDelete` | ✅ | Before delete |
| `beforeBatchSave` | ✅ | Before save — validate changes |
| `batchAdd` | ❌ | New row added |
| `batchDelete` | ❌ | Row deleted |
| `batchCancel` | ❌ | Edit cancelled |

### Column Events (10)
| Event | Use Case |
|-------|----------|
| `columnDragStart` | Column drag starts |
| `columnDrag` | Dragging continuously |
| `columnDrop` | Dropped on target |
| `columnDataStateChange` | Data state changed (sort/filter/group) |
| `columnDeselecting` | ✅ Before deselect |
| `columnDeselected` | After deselected |
| `columnSelecting` | ✅ Before select |
| `columnSelected` | After selected |
| `columnMenuOpen` | ✅ Before menu opens |
| `resizeStop` | Column resize ends |

### Data State Events (4)
| Event | Use Case |
|-------|----------|
| `dataStateChange` | Actions completed — update from API |
| `columnDataStateChange` | Column-specific state change |
| `dataSourceChanged` | Data added/deleted/updated |
| `beforeDataBound` | Before data binding |

### Export & Print Events (10)
| Event | Use Case |
|-------|----------|
| `beforeExcelExport` | Modify Excel workbook |
| `excelQueryCellInfo` | Before exporting each cell |
| `excelExportComplete` | Excel export finished |
| `beforePdfExport` | Modify PDF document |
| `pdfQueryCellInfo` | Before exporting each cell |
| `pdfExportComplete` | PDF export finished |
| `beforePrint` | Before print action |
| `printComplete` | Print completed |
| `excelHeaderQueryCellInfo` | Before header export |
| `pdfHeaderQueryCellInfo` | Before PDF header export |

### Detail Row & Other Events (12)
| Event | Use Case |
|-------|----------|
| `detailExpand` | ✅ Before detail expands |
| `detailCollapse` | ✅ Before detail collapses |
| `detailDataBound` | After detail expands |
| `contextMenuClick` | Context menu item clicked |
| `toolbarClick` | Toolbar item clicked |
| `commandClick` | Command button clicked |
| `keyPressed` | Keyboard key pressed |
| `checkBoxChange` | Checkbox state changed |
| `beforeCopy` | ✅ Before copy |
| `beforePaste` | ✅ Before paste |
| `lazyLoadGroupExpand` | Group expansion (lazy load) |
| `beforeOpenColumnChooser` | ✅ Before chooser opens |

---

## requestType Full Catalog

### CRUD / Edit
- `'add'` | Add clicked (actionBegin, ✅ cancellable)
- `'beginEdit'` | Edit clicked (actionBegin, ✅ cancellable)  
- `'save'` | Record saved (actionBegin/Complete, ✅ in actionBegin)
- `'delete'` | Record deleted (actionBegin/Complete, ✅ in actionBegin)
- `'cancel'` | Edit cancelled (actionBegin/Complete)
- `'batchsave'` | Batch save (actionBegin/Complete, ✅ cancellable)

### Navigation / Data
- `'sorting'`, `'filtering'`, `'searching'`, `'grouping'`, `'ungrouping'`, `'paging'`, `'refresh'`, `'reorder'`

### Export / Print / Scroll
- `'excel'`, `'pdfexport'`, `'csvexport'`, `'print'` (actionBegin)
- `'virtualscroll'`, `'infiniteScroll'` (actionComplete)

---

## Cancellation Patterns

```ts
// Cancel delete
grid.actionBegin = (args: any) => {
  if (args.requestType === 'delete') args.cancel = !confirm('Delete?');
};

// Cancel add by permission
grid.actionBegin = (args: any) => {
  if (args.requestType === 'add' && !hasRole('editor')) args.cancel = true;
};

// Cancel row selection (locked rows)
grid.rowSelecting = (args: any) => {
  if (args.data?.IsLocked) args.cancel = true;
};

// Cancel cell edit (protect primary key)
grid.cellEdit = (args: any) => {
  if (args.columnName === 'OrderID') args.cancel = true;
};

// Cancel batch save (validate)
grid.beforeBatchSave = (args: any) => {
  const errors = validate(args.batchChanges);
  if (errors.length > 0) {
    args.cancel = true;
    showErrors(errors);
  }
};

// Cancel paste (validate data)
grid.beforePaste = (args: any) => {
  if (!isValid(args.data)) args.cancel = true;
};
```

---

## Event Timing Sequences

| Scenario | Sequence |
|----------|----------|
| **Page Load** | `load` → `dataBound` |
| **Row Selection** | `rowSelecting` → `rowSelected` |
| **Single Click** | `recordClick` → `rowSelected` |
| **Double Click** | `recordDoubleClick` → `beginEdit` |
| **Sort/Filter/Page** | `actionBegin` → `actionComplete` → `dataBound` |
| **Edit Inline** | `beginEdit` → `cellEdit`/`cellSave` (batch) → `actionComplete` |
| **Excel Export** | `actionBegin` → `beforeExcelExport` → `excelQueryCellInfo` (per cell) → `excelExportComplete` |
| **PDF Export** | `actionBegin` → `beforePdfExport` → `pdfQueryCellInfo` (per cell) → `pdfExportComplete` |
| **Virtual Scroll** | `actionBegin` → `actionComplete` → `rowDataBound` (new rows) |
| **Detail Expand** | `detailExpand` → `detailDataBound` |
| **Batch Add** | `beforeBatchAdd` → `batchAdd` |
| **Batch Save** | `beforeBatchSave` → `actionBegin` → `actionComplete` |

---

## Complete Setup Example

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true },
    { field: 'CustomerName', headerText: 'Customer' }
  ],
  editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Dialog'
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],

  // Before action - cancellation point
  actionBegin: (args: any) => {
    if (args.requestType === 'delete') {
      args.cancel = !confirm('Delete?');
    }
    if (args.requestType === 'save') {
      args.data.ModifiedDate = new Date();
    }
  },

  // After action - success handling
  actionComplete: (args: any) => {
    if (args.requestType === 'save') {
      console.log('Saved');
    }
  },

  // Error handling
  actionFailure: (args: any) => {
    console.error('Error:', args.error);
  },

  // Row events
  rowDataBound: (args: any) => {
    if (args.data?.Status === 'Inactive') {
      args.rowElement?.classList.add('inactive');
    }
  },

  rowSelected: (args: any) => {
    console.log('Selected:', args.data);
  }
});

grid.appendTo('#grid');
```
