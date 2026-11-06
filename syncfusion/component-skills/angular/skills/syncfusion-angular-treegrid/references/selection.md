---
name: Selection
description: 'Selection in Syncfusion Angular TreeGrid - row selection, cell selection, checkbox selection modes, selection events, and programmatic selection.'
---

# Selection

Selection enables users to select rows, cells, or use checkboxes for data manipulation and interaction.

## When to Use

Use selection features when you need to:
- **Enable row/cell selection** — Allow users to select one or multiple records
- **Bulk operations** — Enable users to perform actions on multiple selected rows
- **Highlight selected data** — Show visual feedback for user selections
- **Programmatic selection** — Select rows dynamically from code
- **Restrict selection** — Limit selection to specific columns or rows
- **Get selected records** — Retrieve selected data for processing
- **Prevent selection** — Disable selection for certain rows or regions

## Table of Contents
- [Selection Rules](#selection-rules)
- [Selection Modes](#selection-modes)
- [Checkbox Selection](#checkbox-selection)
- [Selection APIs](#selection-apis)
- [Selection Events](#selection-events)

## Selection Rules

### Rule: Selection is Built-In (NO Module Injection Required)
**Severity**: 🟢 IMPORTANT - Don't inject unnecessary service

**Requirement**:
```typescript
// ✅ CORRECT - Selection is built-in, NO service needed
<ejs-treegrid 
  [selectionSettings]='{ type: "Multiple", mode: "Row" }'>
</ejs-treegrid>

// NO SERVICE INJECTION REQUIRED
@Component({
  providers: []  // ← Don't inject SelectionService
})

// ❌ WRONG - DON'T inject SelectionService
import { SelectionService } from '@syncfusion/ej2-angular-treegrid';
@Component({
  providers: [SelectionService]  // NOT NEEDED - Selection is built-in
})
```

**Selection Features (All Built-In)**:
```typescript
// Row Selection
selectionSettings: { type: 'Single', mode: 'Row' }      // ✅ No service needed

// Multiple Row Selection
selectionSettings: { type: 'Multiple', mode: 'Row' }    // ✅ No service needed

// Cell Selection
selectionSettings: { type: 'Single', mode: 'Cell' }     // ✅ No service needed

// Checkbox Selection
selectionSettings: { type: 'Checkbox', mode: 'Row' }    // ✅ No service needed
```

---

### Rule: Selection Persistence Requires State Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

**Severity**: 🟠 IMPORTANT - Selection state not preserved across page reload

**Requirement**:
```typescript
// ✅ TO PERSIST SELECTION STATE:
<ejs-treegrid 
  [enablePersistence]='true'
  [selectionSettings]='{ type: "Multiple", mode: "Row" }'>
</ejs-treegrid>

// Without enablePersistence, selection is lost on:
// - Page reload
// - Navigation away and back
// - Component recreation

// ✅ ALTERNATIVE: Manually save selection
saveSelection() {
  const selected = this.treegrid.getSelectedRowIndexes();
  localStorage.setItem('savedSelection', JSON.stringify(selected));
}

loadSelection() {
  const saved = localStorage.getItem('savedSelection');
  if (saved) {
    this.treegrid.selectRows(JSON.parse(saved));
  }
}
```

---

## Selection Modes

### Row Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [selectionSettings]='selectionSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public selectionSettings = {
    type: 'Single',    // Single, Multiple
    mode: 'Row'        // Row, Cell, Both
  };
}
```

### Cell Selection

```typescript
public selectionSettings = {
  type: 'Multiple',
  mode: 'Cell'
};
```

### Multiple Selection

```typescript
public selectionSettings = {
  type: 'Multiple',
  mode: 'Row',
  enableToggle: true
};
```

## Checkbox Selection

### Enable Checkbox Selection

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [selectionSettings]='selectionSettings'>
  <e-columns>
    <e-column type='checkbox' width='50'></e-column>
    <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

```typescript
public selectionSettings = {
  type: 'Multiple',
  mode: 'Row'
};
```

### Select All Checkboxes

```typescript
<button (click)='selectAll()'>Select All</button>
<button (click)='clearSelection()'>Clear Selection</button>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  [selectionSettings]='selectionSettings'>
  <e-columns>
    <e-column type='checkbox' width='50'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;

selectAll() {
  this.treegrid.selectAll();
}

clearSelection() {
  this.treegrid.clearSelection();
}
```

## Selection APIs

### Get Selected Records

```typescript
<button (click)='getSelectedRecords()'>Get Selected Records</button>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  [selectionSettings]='selectionSettings'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
@ViewChild('treegrid') treegrid!: TreeGridComponent;

getSelectedRecords() {
  const selectedRecords = this.treegrid.getSelectedRecords();
  console.log('Selected records:', selectedRecords);
  
  selectedRecords.forEach(record => {
    console.log(record.TaskName);
  });
}
```

### Select Specific Row

```typescript
selectRowByIndex(index: number) {
  this.treegrid.selectRow(index);
}

// Select by multiple indices
selectMultipleRows() {
  this.treegrid.selectRows([0, 2, 4]);
}
```

### Get Selected Indexes

```typescript
getSelectedIndexes() {
  const selectedIndexes = this.treegrid.getSelectedRowIndexes();
  console.log('Selected row indexes:', selectedIndexes);
}

getSelectedCellIndexes() {
  const selectedCells = this.treegrid.getSelectedCellIndexes();
  console.log('Selected cell indexes:', selectedCells);
}
```

## Selection Events

### Selection Change Event

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [selectionSettings]='selectionSettings'
  (rowSelecting)='onRowSelecting($event)'
  (rowSelected)='onRowSelected($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onRowSelecting(args: any) {
  console.log('Row selecting:', args.row);
  
  // Prevent selection based on conditions
  if (args.data?.Status === 'Archived') {
    args.cancel = true;  // Prevent selection
  }
}

onRowSelected(args: any) {
  console.log('Row selected:', args.row);
  
  // Update UI or perform actions
  const selectedRecord = args.rowData;
  console.log('Selected task:', selectedRecord.TaskName);
}
```

### Cell Selection Event

```typescript
<ejs-treegrid 
  [selectionSettings]='selectionSettings'
  (cellSelecting)='onCellSelecting($event)'
  (cellSelected)='onCellSelected($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onCellSelecting(args: any) {
  console.log('Cell selecting:', args.cell);
}

onCellSelected(args: any) {
  console.log('Cell selected:', args.cell);
  console.log('Cell value:', args.cellIndex);
}
```

### Perform Action on Selection

```typescript
<button (click)='deleteSelected()'>Delete Selected</button>

<ejs-treegrid 
  #treegrid
  [dataSource]='data'
  [childMapping]='childMapping'
  [selectionSettings]='selectionSettings'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
deleteSelected() {
  const selectedIndexes = this.treegrid.getSelectedRowIndexes();
  
  selectedIndexes.forEach(index => {
    this.treegrid.deleteRecord(index);
  });
  
  alert(`${selectedIndexes.length} records deleted`);
}

```
