# Command Column in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Enable Command Column](#enable-command-column)
- [Built-in Commands](#built-in-commands)
- [Custom Commands](#custom-commands)
- [Command Events](#command-events)
- [Conditional Commands](#conditional-commands)
- [Styling Commands](#styling-commands)

## When to Use This Skill

Use this skill when you need to:
- **Add action buttons to rows** — Implement Edit, Delete, or custom action buttons
- **Enable built-in commands** — Use predefined Edit, Delete, Save, Cancel commands
- **Create custom commands** — Add application-specific button actions
- **Handle command events** — Respond to user clicks on command buttons
- **Conditional command display** — Show/hide commands based on row data or user permissions
- **Style command buttons** — Customize button appearance and behavior
- **Batch row operations** — Enable multiple row selections with command execution
- **Simplify row interactions** — Avoid custom templates for common row actions

## Overview

Command column provides buttons for common grid actions like Edit, Delete, and custom operations. It simplifies row-level interactions without needing custom templates.

---

## Enable Command Column

### Basic Setup

```typescript
import { Component } from '@angular/core';
import { EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [editSettings]="{ mode: 'Dialog', allowEditing: true, allowDeleting: true }">
      <e-columns>
        <e-column type="checkbox" width="50"></e-column>
        <e-column field="OrderID" headerText="Order ID" width="100" [isPrimaryKey]="true"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        <e-column type="commandColumn" headerText="Actions" width="150"
                  [commands]="[{type: 'Edit', buttonOption: {cssClass: 'e-flat'}},
                               {type: 'Delete', buttonOption: {cssClass: 'e-flat'}},
                               {type: 'Save', buttonOption: {cssClass: 'e-flat'}},
                               {type: 'Cancel', buttonOption: {cssClass: 'e-flat'}}]">
        </e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [EditService, ToolbarService]
})
export class AppCommandGridComponent {
  data = [];
}
```

---

## Built-in Commands

### Available Built-in Commands

| Command | Available In | Action |
|---------|--------------|--------|
| `Edit` | Normal mode | Start editing row |
| `Delete` | Normal mode | Delete row |
| `Save` | Edit mode | Save changes |
| `Cancel` | Edit mode | Cancel editing |

### Edit/Delete Commands

```typescript
<e-column
  headerText="Edit/Delete"
  width="120"
  [commands]="[
    { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { cssClass: 'e-flat' } }
  ]">
</e-column>
```

### Save/Cancel Commands

```typescript
<e-column
  headerText="Save/Cancel"
  width="120"
  [commands]="[
    { type: 'Save', buttonOption: { cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { cssClass: 'e-flat' } }
  ]">
</e-column>
```

## Custom Commands

The custom command column feature extends the Grid component's capabilities by enabling custom command buttons in a column to perform specific actions on individual rows. To define custom command buttons, use the `column.commands` property. Associate the desired actions with these buttons through the `commandClick` event, allowing custom logic to be executed on button click.

### View Details with Dialog

The following example demonstrates how to display a custom "Details" command button and handle the click event to show row information in a dialog:

```typescript
import { GridModule, EditService, CommandColumnService } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandModel, CommandClickEventArgs, GridComponent, EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-custom-command',
  standalone: true,
  imports: [GridModule, DialogModule],
  providers: [EditService, CommandColumnService],
  template: `
    <ejs-grid #grid [dataSource]="data" [editSettings]="editSettings" 
              (commandClick)="commandClick($event)" height="310px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" textAlign="Right" 
                  [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" textAlign="Right" 
                  editType="numericedit" width="120" format="C2"></e-column>
        <e-column field="ShipCountry" headerText="Ship Country" 
                  editType="dropdownedit" width="150"></e-column>
        <e-column headerText="Commands" width="140" [commands]="commands"></e-column>
      </e-columns>
    </ejs-grid>

    <ejs-dialog #dialog header="Row Information" showCloseIcon="true"
                width="400px" [visible]="dialogVisible" (close)="dialogClose()">
      <ng-template>
        <ng-container *ngIf="rowData">
          <p><b>Order ID:</b> {{ rowData.OrderID }}</p>
          <p><b>Customer ID:</b> {{ rowData.CustomerID }}</p>
          <p><b>Freight:</b> {{ rowData.Freight }}</p>
          <p><b>Ship Country:</b> {{ rowData.ShipCountry }}</p>
        </ng-container>
      </ng-template>
    </ejs-dialog>
  `
})
export class CustomCommandComponent implements OnInit {
  @ViewChild('grid') gridComponent!: GridComponent;
  
  data: any[] = [];
  editSettings: EditSettingsModel = { allowEditing: true, allowDeleting: true };
  commands: CommandModel[] = [];
  dialogVisible: boolean = false;
  rowData: any;

  ngOnInit(): void {
    this.loadData();
    this.initializeCommands();
  }

  private loadData(): void {
    // Load grid data from service
    this.data = [
      { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, ShipCountry: 'France' },
      { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, ShipCountry: 'Germany' }
      // ... more data
    ];
  }

  private initializeCommands(): void {
    this.commands = [
      { buttonOption: { content: 'Details', cssClass: 'e-flat' } }
    ];
  }

  commandClick(args: CommandClickEventArgs): void {
    // Get command type from commandColumn.type (Edit, Delete, Save, Cancel)
    // For custom commands, type will be None/undefined
    const commandType = args.commandColumn?.type;
    const buttonText = args.target?.textContent?.trim();
    
    if (commandType === 'Edit' || commandType === 'Delete') {
      // Built-in commands are handled automatically by the grid
      return;
    }
    
    // Handle custom command buttons
    if (buttonText === 'Details') {
      this.rowData = args.rowData;
      this.dialogVisible = true;
    }
  }

  dialogClose(): void {
    this.dialogVisible = false;
  }
}
```

## Command Events

### Click Event

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent, CommandClickEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-command-click-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" (commandClick)="onCommandClick($event)">
      <e-columns>
        <!-- columns with commands -->
      </e-columns>
    </ejs-grid>
  `
})
export class CommandClickGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = [...]; // Load from service
  }

  onCommandClick(args: CommandClickEventArgs) {
    console.log('Command type:', args.commandColumn?.type);
    console.log('Row data:', args.rowData);
    console.log('Button element:', args.target);
    console.log('Button text:', args.target?.textContent);
  }
}
```

### Command Type Checking

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent, CommandClickEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-command-check-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" (commandClick)="onCommand($event)">
      <e-columns>
        <!-- columns with commands -->
      </e-columns>
    </ejs-grid>
  `
})
export class CommandCheckGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = [...]; // Load from service
  }

  onCommand(args: CommandClickEventArgs) {
    const commandType = args.commandColumn?.type;
    const buttonText = args.target?.textContent?.trim();
    
    if (commandType === 'Edit') {
      console.log('Edit command:', args.rowData);
    } else if (commandType === 'Delete') {
      console.log('Delete command:', args.rowData);
    } else {
      // Custom commands identified by button text
      console.log('Custom command:', buttonText, 'Data:', args.rowData);
    }
  }
}
```

---

## Conditional Commands

### Show/Hide Based on Row Data

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, EditService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-conditional-command',
  template: `
    <ejs-grid #grid [dataSource]="data" [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true"></e-column>
        <e-column field="CustomerID" headerText="Customer"></e-column>
        <e-column field="Status" headerText="Status"></e-column>
        <e-column headerText="Actions" width="150" [cellTemplate]="'actionTemplate'">
        </e-column>
      </e-columns>
      <ng-template #actionTemplate let-data>
        <button class="e-btn e-small" (click)="editRow(data)" [style.margin-right.px]="5">
          Edit
        </button>
        <button 
          *ngIf="data.Status !== 'Completed"
          class="e-btn e-small e-danger" 
          (click)="deleteRow(data)">
          Delete
        </button>
        <button 
          *ngIf="data.Status === 'Pending"
          class="e-btn e-small e-success" 
          (click)="completeRow(data)">
          Complete
        </button>
      </ng-template>
    </ejs-grid>
  `,
  providers: [EditService]
})
export class ConditionalCommandComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  editSettings: any = { allowEditing: true, allowDeleting: true, mode: 'Dialog' };

  editRow(rowData: any): void {
    console.log('Edit row:', rowData);
  }

  deleteRow(rowData: any): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.gridComponent.deleteRecord();
    }
  }

  completeRow(rowData: any): void {
    console.log('Complete row:', rowData);
  }
```

### Role-Based Commands

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, EditService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-role-command',
  template: `
    <ejs-grid #grid [dataSource]="data" [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true"></e-column>
        <e-column field="CustomerID" headerText="Customer"></e-column>
        <e-column
          headerText="Actions"
          width="150"
          [commands]="getCommandsForRole()">
        </e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [EditService]
})
export class RoleCommandComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  editSettings: any = { allowEditing: true, allowDeleting: true };
  userRole: string = 'user';

  ngOnInit() {
    this.getUserRole();
  }

  private getUserRole(): void {
    this.userRole = localStorage.getItem('userRole') || 'user';
  }

  getCommandsForRole(): any[] {
    if (this.userRole === 'admin') {
      return [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat' } },
        { buttonOption: { content: 'Audit', cssClass: 'e-flat', click: this.viewAudit } }
      ];
    } else {
      return [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat' } },
        { buttonOption: { content: 'View', cssClass: 'e-flat', click: this.viewDetails } }
      ];
    }
  }

  private viewAudit = (args: any): void => {
    console.log('Audit:', args.rowData);
  };

  private viewDetails = (args: any): void => {
    console.log('Details:', args.rowData);
  }
```

### Status-Based Commands

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-status-command-grid',
  template: `
    <ejs-grid #grid [dataSource]="data">
      <e-columns>
        <!-- columns -->
        <e-column headerText="Actions" [commands]="getCommandsForStatus(row.Status)"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class StatusCommandGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = [...]; // Load from service
  }

  getCommandsForStatus(status: string) {
    const baseCommands = [{ type: 'Edit', buttonOption: { cssClass: 'e-flat' } }];

    if (status === 'Draft') {
      baseCommands.push({ type: 'Delete', buttonOption: { cssClass: 'e-flat' } });
    }

    if (status === 'Pending') {
      baseCommands.push({
        buttonOption: { content: 'Approve', cssClass: 'e-flat e-success', click: () => this.approveRow() }
      });
    }

    if (status === 'Completed') {
      baseCommands.push({
        buttonOption: { content: 'Archive', cssClass: 'e-flat e-info', click: () => this.archiveRow() }
      });
    }

    return baseCommands;
  }

  approveRow() {
    console.log('Row approved');
  }

  archiveRow() {
    console.log('Row archived');
  }
}
```

---

## Styling Commands

### Button Styling

```typescript
<e-column
  headerText="Actions"
  width="200"
  [commands]="[
    {
      type: 'Edit',
      buttonOption: {
        cssClass: 'e-flat e-outline',
        iconCss: 'e-icons e-edit'
      }
    },
    {
      type: 'Delete',
      buttonOption: {
        cssClass: 'e-flat e-danger',
        iconCss: 'e-icons e-delete'
      }
    },
    {
      buttonOption: {
        content: 'Archive',
        cssClass: 'e-flat e-warning',
        iconCss: 'e-icons e-archive'
      }
    }
  ]">
</e-column>
```

### CSS Classes

```css
/* Button sizes */
.e-btn.e-small { padding: 4px 8px; font-size: 12px; }
.e-btn.e-large { padding: 12px 16px; font-size: 16px; }

/* Button styles */
.e-btn.e-flat { background-color: transparent; border: 1px solid #ddd; }
.e-btn.e-outline { border: 2px solid currentColor; }
.e-btn.e-primary { background-color: #007bff; color: white; }
.e-btn.e-success { background-color: #28a745; color: white; }
.e-btn.e-danger { background-color: #dc3545; color: white; }
.e-btn.e-warning { background-color: #ffc107; color: black; }
.e-btn.e-info { background-color: #17a2b8; color: white; }

/* Hover effects */
.e-btn:hover { opacity: 0.8; cursor: pointer; }
.e-btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

### Inline Styling

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, EditService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-styled-command',
  template: `
    <ejs-grid #grid [dataSource]="data" [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true"></e-column>
        <e-column field="CustomerID" headerText="Customer"></e-column>
        <e-column headerText="Actions" width="150" [cellTemplate]="'styledActionTemplate'">
        </e-column>
      </e-columns>
      <ng-template #styledActionTemplate let-data>
        <button 
          [ngStyle]="commandButtonStyle" 
          [style.background-color]="'#007bff'"
          (click)="editRow(data)">
          Edit
        </button>
        <button 
          [ngStyle]="commandButtonStyle" 
          [style.background-color]="'#dc3545'"
          (click)="deleteRow(data)">
          Delete
        </button>
      </ng-template>
    </ejs-grid>
  `,
  providers: [EditService]
})
export class StyledCommandComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  data: any[] = [];
  editSettings: any = { allowEditing: true, allowDeleting: true };

  commandButtonStyle = {
    padding: '6px 10px',
    fontSize: '12px',
    marginRight: '4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white'
  };

  editRow(rowData: any): void {
    console.log('Edit row:', rowData);
  }

  deleteRow(rowData: any): void {
    if (confirm('Are you sure?')) {
      this.gridComponent.deleteRecord();
    }
  }
```
