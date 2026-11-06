# Syncfusion Angular Grid — Events Catalog

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [CRITICAL RULES: Event Handling](#-critical-rules-event-handling)
- [actionBegin vs actionComplete — Decision Rule](#actionbegin-vs-actioncomplete--decision-rule)
- [requestType Full Catalog](#requesttype-full-catalog)
  - [CRUD / Edit](#crud--edit)
  - [Navigation / Data](#navigation--data)
  - [Export / Print](#export--print)
  - [Scroll](#scroll)
- [args.cancel = true — Interception Patterns](#argscancel--true--interception-patterns)
  - [Cancellable Events](#cancellable-events)
- [All Event Props Catalog](#all-event-props-catalog)
  - [Lifecycle](#lifecycle)
  - [Universal Action](#universal-action)
  - [Row](#row)
  - [Cell](#cell)
  - [Edit (Granular)](#edit-granular)
  - [Observable/Custom Binding Sort / Filter / Group / Search / Page](#observablecustom-binding-sort--filter--group--search--page)
  - [Observable/Custom Binding CRUD](#observablecustom-binding-crud)
  - [Column](#column)
  - [Export / Print](#export--print-1)
  - [Hierarchy / Detail Row](#hierarchy--detail-row)
  - [Context Menu](#context-menu)
  - [Toolbar](#toolbar)

## When to Use This Skill

Use this skill when you need to:
- **Handle grid events** — Respond to user interactions and data changes
- **Implement event handlers** — Listen to lifecycle, CRUD, and user action events
- **Control event flow** — Cancel operations before/after they complete
- **Synchronize with backend** — Save changes via actionBegin/actionComplete
- **Intercept operations** — Validate or prevent actions using event cancellation
- **Track user actions** — Monitor sorting, filtering, grouping, pagination
- **Custom workflows** — Implement multi-step processes triggered by events
- **Event signatures** — Ensure handlers match exact event parameter signatures
- **Request type handling** — Distinguish between different operation types

---

## ⚠️ CRITICAL RULES: Event Handling

#### Rule 1: Event Handlers Must Match Exact Signature
Wrong signatures cause silent failures or crashes. All event handlers must accept `$event` parameter.

```typescript
// ❌ WRONG - Missing args parameter
<ejs-grid (actionComplete)="onActionComplete()"></ejs-grid>

// ✅ CORRECT - Accept and destructure args parameter
<ejs-grid (actionComplete)="onActionComplete($event)"></ejs-grid>

onActionComplete(args: any): void {
  console.log('Request type:', args.requestType);
  console.log('Data:', args.data);
}

// ❌ WRONG - Incorrect parameter name
(rowSelected)="onRowSelected(event)"  // event != $event

// ✅ CORRECT
(rowSelected)="onRowSelected($event)"

onRowSelected(args: any) {
  const selectedRows = args.data;  // Correct way to access data
}
```

#### Rule 2: Use actionBegin for Cancellation, actionComplete for Reactions
The difference is timing and capability — use each for its purpose.

```typescript
// ❌ WRONG - Can't cancel in actionComplete
<ejs-grid (actionComplete)="onComplete($event)"></ejs-grid>
onComplete(args: any) {
  args.cancel = true;  // Won't work — action already occurred
}

// ✅ CORRECT - Cancel in actionBegin
<ejs-grid 
  (actionBegin)="onBegin($event)"
  (actionComplete)="onComplete($event)"
  (actionFailure)="onFailure($event)">
</ejs-grid>

onBegin(args: any) {
  // ✅ Can cancel action before it executes
  if (args.requestType === 'save' && !this.isValid) {
    args.cancel = true;
    return;
  }
  
  // ✅ Can modify data before save
  if (args.requestType === 'save') {
    args.data.UpdatedAt = new Date();
    args.data.UpdatedBy = this.currentUser.id;
  }
  
  // ✅ Can confirm before delete
  if (args.requestType === 'delete') {
    args.cancel = !window.confirm('Delete this record?');
  }
}

onComplete(args: any) {
  // ✅ Can call backend API after save/delete
  if (args.requestType === 'save') {
    this.syncToServer(args.data);
    showToast('Record saved');
    this.gridComponent.clearSelection();
  }
  
  if (args.requestType === 'delete') {
    this.notifyDelete(args.data);
  }
  
  // ✅ Can show toast/notification
  // ✅ Can refresh grid
  // ✅ Can re-enable toolbar buttons
}

onFailure(args: any) {
  // ✅ MANDATORY - Handle errors
  console.error('Error:', args.error);
  showToast('Operation failed: ' + args.error, 'error');
}
```

#### Rule 3: Event Timing Matters
Know when events fire relative to action execution.

| Event | Timing | Can Cancel? | Use For |
|-------|--------|-------------|---------|
| `actionBegin` | **Before** action starts | ✅ Yes (`args.cancel = true`) | Validation, cancellation, data mutation |
| `actionComplete` | **After** action finishes successfully | ❌ No | Success handling, API calls, notifications |
| `actionFailure` | **On error** | ❌ No | Error handling, logging |
| `rowSelecting` | **Before** row selection | ✅ Yes | Prevent selection, role-based access |
| `rowSelected` | **After** row selected | ❌ No | Update external state, enable/disable buttons |
| `rowDataBound` | **Per row during render** | ❌ No | Row styling (see Rule 4) |
| `queryCellInfo` | **Per cell during render** | ❌ No | Cell styling (see Rule 4) |

Use `args.requestType` in actionBegin/actionComplete to identify the action — see requestType catalog below.

#### Rule 4: Don't Call Methods Inside Render Events
`rowDataBound` and `queryCellInfo` fire on **every render/scroll** — calling methods here causes infinite loops and crashes.

```typescript
// ❌ FORBIDDEN - Infinite loop
<ejs-grid 
  (rowDataBound)="onRowDataBound($event)"
  (queryCellInfo)="onQueryCellInfo($event)">
</ejs-grid>

onRowDataBound(args: any) {
  this.gridComponent.refresh();  // NEVER DO THIS ← infinite loop
  this.gridComponent.selectRow(0);  // NEVER DO THIS ← causes crash
}

onQueryCellInfo(args: any) {
  this.gridComponent.setProperties({...});  // NEVER DO THIS ← crash
}

// ✅ CORRECT - Use for styling ONLY
onRowDataBound(args: any) {
  // ✅ Safe: Styling only
  if (args.data.Status === 'Pending') {
    args.rowElement.classList.add('pending-style');
  }
}

onQueryCellInfo(args: any) {
  // ✅ Safe: Cell styling only
  if (args.cell.textContent === 'High') {
    args.cell.classList.add('high-priority');
  }
}

// ✅ CORRECT - Call methods in action events instead
<ejs-grid (actionComplete)="onComplete($event)"></ejs-grid>

onComplete(args: any) {
  if (args.requestType === 'refresh') {
    // ✅ Safe to call methods in actionComplete
    this.gridComponent.selectRow(0);
  }
}
```

---
## actionBegin vs actionComplete � Decision Rule

| Use `actionBegin` when you need to | Use `actionComplete` when you need to |
|---|---|
| Cancel / stop the action (`args.cancel = true`) | Call backend API after save/delete |
| Modify data before save (`args.data.field = value`) | Show toast / notification |
| Confirm before delete | Refresh grid data |
| Block unauthorized actions | Sync external React state |
| Customize export before start | Re-enable toolbar buttons |

```typescript
// actionBegin � intercept and mutate
const actionBegin = (args) => {
  if (args.requestType === 'delete')
    args.cancel = !window.confirm(`Delete record ${args.data[0]?.OrderID}?`);

  if (args.requestType === 'save') {
    args.data.UpdatedAt = new Date().toISOString();
    args.data.UpdatedBy = currentUser.id;
  }

  if (['add', 'beginEdit'].includes(args.requestType)) {
    this.gridInstance.toolbarModule.enableItems(['Add', 'Edit', 'Delete'], false);
    this.gridInstance.toolbarModule.enableItems(['Update', 'Cancel'], true);
  }
};

// actionComplete � react after action
const actionComplete = async (args) => {
  if (args.requestType === 'save') {
    await apiService.syncRecord(args.data);
    showToast('Record saved');
    this.gridInstance.clearSelection();
    this.gridInstance.toolbarModule.enableItems(['Add', 'Edit', 'Delete'], true);
    this.gridInstance.toolbarModule.enableItems(['Update', 'Cancel'], false);
  }
  if (args.requestType === 'delete') {
    await apiService.deleteRecord(args.data[0]);
    this.gridInstance.refresh();
  }
};
```

---

## requestType Full Catalog

### CRUD / Edit

| `requestType` | When | Available in |
|---|---|---|
| `'add'` | Add clicked / addRecord() called | `actionBegin` |
| `'beginEdit'` | Row double-clicked / Edit clicked | `actionBegin` |
| `'save'` | Record saved (add or edit) | `actionBegin`, `actionComplete` |
| `'delete'` | Record deleted | `actionBegin`, `actionComplete` |
| `'cancel'` | Edit cancelled | `actionBegin`, `actionComplete` |
| `'batchsave'` | Batch mode all changes saved | `actionBegin`, `actionComplete` |

### Navigation / Data

| `requestType` | When | Available in |
|---|---|---|
| `'sorting'` | Sort applied/removed | both |
| `'filtering'` | Filter applied/cleared | both |
| `'searching'` | Global search | both |
| `'grouping'` | Column grouped | both |
| `'ungrouping'` | Column ungrouped | both |
| `'paging'` | Page changed | both |
| `'refresh'` | Grid refreshed | both |
| `'reorder'` | Column reordered | `actionComplete` |

### Export / Print

| `requestType` | When | Available in |
|---|---|---|
| `'excel'` | Excel export | `actionBegin` |
| `'pdfexport'` | PDF export | `actionBegin` |
| `'csvexport'` | CSV export | `actionBegin` |
| `'print'` | Print | `actionBegin` |

### Scroll

| `requestType` | When | Available in |
|---|---|---|
| `'virtualscroll'` | Virtual scroll chunk loaded | `actionComplete` |
| `'infiniteScroll'` | Infinite scroll next block | `actionComplete` |

---

## args.cancel = true � Interception Patterns

Only works in `(actionBegin)` and specific before-events.

```typescript
// Cancel delete with confirmation
(actionBegin)="onActionBegin($event)"

// In component:
onActionBegin(args: any) {
  if (args.requestType === 'delete') {
    args.cancel = !window.confirm('Delete this record?');
  }
}

// Cancel add – permission check
onActionBegin(args: any) {
  if (args.requestType === 'add' && !this.userHasRole('editor')) {
    args.cancel = true;
  }
}

// Cancel row selection – locked records
(rowSelecting)="onRowSelecting($event)"

// Cancel cell edit – protect primary key in Batch mode
(cellEdit)="onCellEdit($event)"

// Cancel batch save – custom validation
(beforeBatchSave)="onBeforeBatchSave($event)"
```

Component implementation:
```typescript
@Component({
  selector: 'app-cancellable-events',
  template: `
    <ejs-grid #grid [dataSource]="data" 
      (rowSelecting)="onRowSelecting($event)"
      (cellEdit)="onCellEdit($event)"
      (beforeBatchSave)="onBeforeBatchSave($event)"
      editSettings="{ mode: 'Batch' }">
      <e-columns>
        <e-column field="OrderID" type="number" [isPrimaryKey]="true"></e-column>
        <e-column field="Status"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [EditService, ToolbarService]
})
export class CancellableEventsComponent implements OnInit {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  // Cancel row selection – prevent selecting locked records
  onRowSelecting(args: any) {
    if (args.data?.Status === 'Locked') {
      args.cancel = true;
    }
  }

  // Cancel cell edit – protect primary key in Batch mode
  onCellEdit(args: any) {
    if (args.columnName === 'OrderID') {
      args.cancel = true;
    }
  }

  // Cancel batch save – custom validation before bulk save
  onBeforeBatchSave(args: any) {
    const errors = this.validateBatchChanges(args.batchChanges);
    if (errors.length > 0) {
      args.cancel = true;
      this.showValidationDialog(errors);
    }
  }

  private validateBatchChanges(batchChanges: any): string[] {
    const errors: string[] = [];
    if (batchChanges && batchChanges.length > 0) {
      // Add your validation logic
      batchChanges.forEach((change: any) => {
        if (!change.OrderID) errors.push('OrderID is required');
      });
    }
    return errors;
  }

  private showValidationDialog(errors: string[]) {
    alert('Validation errors:\n' + errors.join('\n'));
  }

  private loadData() {
    // Load initial data
    this.data = [];
  }
}
```

### Cancellable Events

| Event | Cancellable | Use Case |
|---|---|---|
| `actionBegin` | ? | Cancel any CRUD, sort, filter, group, page, export |
| `rowSelecting` | ? | Prevent selection of locked rows |
| `cellEdit` (Batch) | ? | Prevent editing specific cells |
| `beforeBatchAdd` | ? | Block batch add conditionally |
| `beforeBatchDelete` | ? | Block batch delete conditionally |
| `beforeBatchSave` | ? | Block batch save on validation failure |
| `actionComplete` | ? | Action already done |
| `rowSelected` | ? | Selection already done |

---

## All Event Props Catalog

Wire directly on `<ejs-grid>` as props.

### Lifecycle
```typescript
(created)="onCreated($event)"           // Grid initialized and rendered
(load)="onLoad($event)"              // Before data binding
(dataBound)="onDataBound($event)"         // After data bound and rows rendered
(destroyed)="onDestroyed($event)"         // Component destroyed
```

### Universal Action
```typescript
(actionBegin)="onActionBegin($event)"       // Before ANY action – check args.requestType
(actionComplete)="onActionComplete($event)" // After ANY action
(actionFailure)="onActionFailure($event)"   // On error – always wire for error handling
```

### Row
```typescript
(rowDataBound)="onRowDataBound($event)"     // Per row during render – use for row styling
(rowSelecting)="onRowSelecting($event)"     // Before selection – cancellable
(rowSelected)="onRowSelected($event)"       // After selection – update external state
(rowDeselecting)="onRowDeselecting($event)" // Before deselect – cancellable
(rowDeselected)="onRowDeselected($event)"   // After deselect
(recordClick)="onRecordClick($event)"       // Single click
(recordDoubleClick)="onRecordDoubleClick($event)" // Double click
```

### Cell
```typescript
(queryCellInfo)="onQueryCellInfo($event)"   // Per cell during render – use for cell styling
(cellSelecting)="onCellSelecting($event)"   // Before cell select – cancellable
(cellSelected)="onCellSelected($event)"     // After cell select
(cellDeselected)="onCellDeselected($event)" // After cell deselect
```

### Edit (Granular)
```typescript
(beginEdit)="onBeginEdit($event)"           // Edit mode started (Inline/Dialog)
(cellEdit)="onCellEdit($event)"             // Cell entered edit (Batch) – cancellable
(cellSave)="onCellSave($event)"             // Cell saved (Batch)
(cellSaving)="onCellSaving($event)"         // Before cell save (Batch) – cancellable
(batchAdd)="onBatchAdd($event)"             // Batch: new row added
(batchDelete)="onBatchDelete($event)"       // Batch: row deleted
(beforeBatchAdd)="onBeforeBatchAdd($event)"     // Cancellable
(beforeBatchDelete)="onBeforeBatchDelete($event)" // Cancellable
(beforeBatchSave)="onBeforeBatchSave($event)"   // Cancellable – use for validation
```

### Observable/Custom Binding Sort / Filter / Group / Search / Page
```typescript
(dataStateChange)="onDataStateChange($event)" // note: 'on' prefix
```

### Observable/Custom Binding CRUD
```typescript
(dataSourceChanged)="onDataSourceChanged($event)" // note: 'on' prefix
```

### Column
```typescript
(columnDragStart)="onColumnDragStart($event)"
(columnDrag)="onColumnDrag($event)"
(resizeStart)="onResizeStart($event)"
(resizing)="onResizing($event)"
(resizeStop)="onResizeStop($event)"                  // auto-save state
```

### Export / Print
```typescript
(beforeExcelExport)="onBeforeExcelExport($event)"    // Modify workbook (args.workbook)
(excelExportComplete)="onExcelExportComplete($event)"
(beforePdfExport)="onBeforePdfExport($event)"      // Modify document (args.pdfDocument)
(pdfExportComplete)="onPdfExportComplete($event)"
(beforePrint)="onBeforePrint($event)"
(printComplete)="onPrintComplete($event)"
```

### Hierarchy / Detail Row
```typescript
(detailDataBound)="onDetailDataBound($event)"
(detailExpand)="onDetailExpand($event)"
(detailCollapse)="onDetailCollapse($event)"
```

### Context Menu
```typescript
(contextMenuClick)="onContextMenuClick($event)"  // args.item.id to identify item
(contextMenuOpen)="onContextMenuOpen($event)"   // modify items dynamically
```

### Toolbar
```typescript
(toolbarClick)="onToolbarClick($event)"      // args.item.id or args.item.text
```

