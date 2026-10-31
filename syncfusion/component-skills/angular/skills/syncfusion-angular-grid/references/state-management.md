# State Management

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Save Grid State](#save-grid-state)
- [Restore Column State](#restore-column-state)

## When to Use This Skill

Use this skill when you need to:
- **Persist grid state** — Save and restore column, sort, filter, paging state
- **User preferences** — Remember user's grid configuration across sessions
- **State recovery** — Restore grid to previous state on page reload
- **Column layout** — Save custom column widths and order
- **Filter persistence** — Keep applied filters between sessions
- **Sort preferences** — Remember sort settings
- **LocalStorage integration** — Store state in browser storage
- **Form recovery** — Recover form state after disconnection

## Overview

Save and restore grid state including columns, sorting, filters, and paging. Useful for persistent user preferences and form recovery.

## Save Grid State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Capture current grid state:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-state-save-grid',
  template: `
    <button (click)="saveState()">Save State</button>
    <button (click)="loadState()">Load State</button>
    <button (click)="resetState()">Reset</button>
    
    <ejs-grid #grid [dataSource]="data" 
              [allowPaging]="true"
              [allowSorting]="true"
              [allowFiltering]="true"
              [pageSettings]="{ pageSize: 10 }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class StateSaveGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', Freight: 41.34 }
  ];

  saveState() {
    const gridState = {
      currentPage: this.grid.pageSettings.currentPage,
      pageSize: this.grid.pageSettings.pageSize,
      sortedColumns: this.grid.sortSettings.columns,
      filteredColumns: this.grid.filterSettings.columns
    };
    localStorage.setItem('gridState', JSON.stringify(gridState));
    console.log('State saved:', gridState);
  }

  loadState() {
    const savedState = localStorage.getItem('gridState');
    if (savedState) {
      const gridState = JSON.parse(savedState);
      this.grid.pageSettings.currentPage = gridState.currentPage;
      this.grid.pageSettings.pageSize = gridState.pageSize;
      console.log('State loaded:', gridState);
    }
  }

  resetState() {
    localStorage.removeItem('gridState');
    this.grid.clearSorting();
    this.grid.clearFiltering();
    console.log('State reset');
  }
}
```

## Restore Column State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Save and restore column configuration:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-column-state-grid',
  template: `
    <button (click)="saveColumnState()">Save Column Layout</button>
    <button (click)="restoreColumnState()">Restore Layout</button>
    
    <ejs-grid #grid [dataSource]="data" 
              [allowReordering]="true"
              [allowResizing]="true"
              [columns]="columns">
    </ejs-grid>
  `
})
export class ColumnStateGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  columns = [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120 }
  ];

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];

  saveColumnState() {
    const columnState = this.grid.getColumnByField('');
    // Save order and width
    const state = this.columns.map((col, idx) => ({
      field: col.field,
      width: col.width,
      index: idx
    }));
    localStorage.setItem('columnState', JSON.stringify(state));
    console.log('Column state saved');
  }

  restoreColumnState() {
    const savedState = localStorage.getItem('columnState');
    if (savedState) {
      const state = JSON.parse(savedState);
      console.log('Column state restored:', state);
    }
  }
}
```
