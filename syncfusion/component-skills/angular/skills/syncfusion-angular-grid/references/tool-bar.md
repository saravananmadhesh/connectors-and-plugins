# Toolbar

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Mandatory Rules](#mandatory-rules)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar](#custom-toolbar)
- [Toolbar Events](#toolbar-events)

## When to Use This Skill

Use this skill when you need to:
- **Add toolbar** — Display toolbar with buttons and controls
- **Built-in items** — Use predefined toolbar items like Print, Export, Search
- **Custom buttons** — Add application-specific toolbar buttons
- **Toolbar events** — Handle toolbar button clicks
- **Export buttons** — Implement Excel/PDF export buttons
- **Search bar** — Add search functionality to toolbar
- **Grid ID requirement** — Ensure grid has ID for toolbar event handling
- **Toolbar styling** — Customize toolbar appearance

## Overview

Toolbar provides quick access to common grid operations. Use built-in items or create custom toolbar buttons for your workflows.

## Mandatory Rules
 
### Rule 1: GridComponent ID is REQUIRED for Toolbar Click Events (Export/Import)
 
When using toolbar click events to handle export (Excel, PDF) or custom actions, you **MUST** provide an `id` attribute on the `<ejs-grid>` element. This ID is required for toolbar button clicks to locate the grid instance.

❌ **WRONG** - No ID provided on grid:
```typescript
// Component
export class GridComponent {
  data = [{ OrderID: 10248, CustomerName: 'VINET' }];
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    // Grid cannot be found by toolbar button click
  }
}
```

```html
<!-- Template - No ID attribute -->
<ejs-grid [dataSource]="data" 
          [toolbar]="['ExcelExport', 'PdfExport']"
          (toolbarClick)="onToolbarClick($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID"></e-column>
  </e-columns>
</ejs-grid>
```

✅ **CORRECT** - ID attribute provided on grid:
```typescript
// Component
export class GridComponent {
  @ViewChild('grid') grid!: GridComponent;
  
  data = [{ OrderID: 10248, CustomerName: 'VINET' }];
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    if (args.item?.id === this.grid?.id + '_excelexport') {
      this.grid.excelExport();
    }
  }
}
```

```html
<!-- Template - ID attribute required -->
<ejs-grid #grid
          id="grid"
          [dataSource]="data" 
          [toolbar]="['ExcelExport', 'PdfExport']"
          (toolbarClick)="onToolbarClick($event)">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID"></e-column>
  </e-columns>
</ejs-grid>
```

## Built-in Toolbar Items

Add standard toolbar buttons:

```typescript
import { Component } from '@angular/core';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-toolbar-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [toolbar]="toolbarItems"
              [editSettings]="editSettings"
              [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ToolbarGridComponent {
  editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'
  };

  toolbarItems: ToolbarItems[] = [
    'Add',
    'Edit', 
    'Delete',
    'Update',
    'Cancel',
    'Search',
    'ExcelExport',
    'PdfExport',
    'Print'
  ];

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];
}
```

## Custom Toolbar

Create custom toolbar with buttons and templates:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-custom-toolbar-grid',
  template: `
    <ng-template #toolbarTemplate>
      <div style="display: flex; gap: 10px; padding: 8px; flex-wrap: wrap;">
        <button (click)="onAdd()" class="custom-btn">
          ➕ Add Order
        </button>
        <button (click)="onRefresh()" class="custom-btn">
          🔄 Refresh
        </button>
        <button (click)="onExport()" class="custom-btn">
          📥 Export to Excel
        </button>
        <button (click)="onDelete()" class="custom-btn">
          🗑️ Delete Selected
        </button>
        <input type="text" placeholder="Quick search..." 
               (keyup)="onSearch($event)"
               style="padding: 6px; width: 200px;">
      </div>
    </ng-template>
    
    <ejs-grid #grid [dataSource]="data" 
              [toolbarTemplate]="toolbarTemplate"
              [editSettings]="editSettings"
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Row', type: 'Multiple' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  styles: [`
    .custom-btn {
      padding: 6px 12px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .custom-btn:hover {
      background-color: #0b7dda;
    }
  `]
})
export class CustomToolbarGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];

  onAdd() {
    this.grid.addRecord();
  }

  onRefresh() {
    this.grid.refresh();
    console.log('Grid refreshed');
  }

  onExport() {
    this.grid.excelExport();
  }

  onDelete() {
    const selectedIndexes = this.grid.getSelectedRowIndexes();
    this.grid.deleteRecord(selectedIndexes);
  }

  onSearch(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.grid.search(value);
  }
}
```

## Toolbar Events

Respond to toolbar button clicks:

```typescript
import { Component } from '@angular/core';
import { ToolbarClickEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-toolbar-events-grid',
  template: `
    <div style="padding: 10px; background-color: #f0f0f0;">
      <p>Last action: {{ lastAction }}</p>
    </div>
    <ejs-grid [dataSource]="data" 
              [toolbar]="['Add', 'Edit', 'Delete', 'Search', 'Print']"
              [editSettings]="editSettings"
              (toolbarClick)="onToolbarClick($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ToolbarEventsGridComponent {
  lastAction = 'None';

  editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  onToolbarClick(args: ToolbarClickEventArgs) {
    console.log('Toolbar clicked:', args.item);
    this.lastAction = (args.item as any).text || (args.item as any).id;
  }
}
```
