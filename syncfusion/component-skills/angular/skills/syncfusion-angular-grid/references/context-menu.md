# Context Menu

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Basic Context Menu](#basic-context-menu)
- [Custom Context Menu](#custom-context-menu)

## When to Use This Skill

Use this skill when you need to:
- **Right-click menu options** — Provide context menu for grid operations
- **Custom context menus** — Define custom menu items for specific actions
- **Row operations** — Implement Copy, Edit, Delete, and custom row actions
- **Column operations** — Add column-specific context menu items
- **Conditional menu items** — Show/hide menu items based on context
- **Keyboard accessibility** — Ensure menu works with keyboard navigation
- **Multi-row operations** — Apply batch operations via context menu

## Overview

Context menu provides right-click options for grid operations. Customize menu items for editing, copying, and other actions.

## Basic Context Menu

Enable context menu with default items:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [contextMenuItems]="['Copy', 'Edit', 'Delete']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ContextMenuGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];
}
```

## Custom Context Menu

Create custom context menu with row and cell operations:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, ContextMenuClickEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-custom-context-menu-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" 
              [contextMenuItems]="contextMenuItems"
              [editSettings]="editSettings"
              (contextMenuClick)="onContextMenuClick($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Status" headerText="Status" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CustomContextMenuGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'
  };

  contextMenuItems = [
    { text: 'Copy', target: '.e-gridcontent', id: 'grid_copy' },
    { text: 'Edit', target: '.e-gridcontent', id: 'grid_edit' },
    { text: 'Delete', target: '.e-gridcontent', id: 'grid_delete' },
    { text: 'Mark as Completed', target: '.e-gridcontent', id: 'custom_complete' },
    { text: 'View Details', target: '.e-gridcontent', id: 'custom_details' }
  ];

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Status: 'Pending', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Status: 'In Progress', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Status: 'Completed', Freight: 65.83 }
  ];

  onContextMenuClick(args: ContextMenuClickEventArgs) {
    console.log('Context menu clicked:', args.item);
    
    if ((args.item as any).id === 'custom_complete') {
      this.markAsCompleted();
    } else if ((args.item as any).id === 'custom_details') {
      this.viewDetails();
    }
  }

  markAsCompleted() {
    const selectedRowIndex = this.grid.getSelectedRowIndexes()[0];
    if (selectedRowIndex !== undefined) {
      const recordObject = this.grid.getCurrentViewRecords()[selectedRowIndex];
      recordObject.Status = 'Completed';
      this.grid.refresh();
    }
  }

  viewDetails() {
    const selectedRowIndex = this.grid.getSelectedRowIndexes()[0];
    if (selectedRowIndex !== undefined) {
      const recordObject = this.grid.getCurrentViewRecords()[selectedRowIndex];
      console.log('View details for:', recordObject);
    }
  }
}
```
