---
name: Command Column
description: 'Command Column in Syncfusion Angular TreeGrid - action buttons in cells (Edit, Delete, Save, Cancel), custom commands, and command click handling.'
---

# Command Column

Command Column displays action buttons like Edit, Delete, Save, and Cancel in cells for quick inline operations on data.

## When to Use

Use command column when you need to:
- **Action buttons** — Add Edit, Delete, Save, Cancel buttons
- **Inline operations** — Perform operations without dialogs
- **Custom commands** — Create custom action buttons
- **Multiple actions** — Provide several options per row

## Table of Contents
- [Basic Command Column](#basic-command-column)
- [Built-in Commands](#built-in-commands)
- [Custom Commands](#custom-commands)
- [Command Events](#command-events)
- [Conditional Commands](#conditional-commands)

## Basic Command Column

### Enable Command Column

```typescript
import { Component } from '@angular/core';
import { CommandColumnService, EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [editSettings]='editSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='ID' width='90' isPrimaryKey='true'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column headerText='Action' width='150' [commands]='commands'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [CommandColumnService, EditService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public editSettings = {
    mode: 'Normal',
    allowEditing: true,
    allowDeleting: true,
    allowAdding: true
  };

  public commands = [
    { type: 'Edit', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-small' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-small' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-small' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-small' } }
  ];
}
```

## Built-in Commands

### Standard Command Types

```typescript
public commands = [
  { type: 'Edit' },      // Opens edit row
  { type: 'Delete' },    // Deletes row
  { type: 'Save' },      // Saves edited row
  { type: 'Cancel' }     // Cancels editing
];
```

### Commands with Custom Styling

```typescript
public commands = [
  {
    type: 'Edit',
    buttonOption: {
      iconCss: 'e-icons e-edit',
      cssClass: 'e-flat',
      content: 'Edit'
    }
  },
  {
    type: 'Delete',
    buttonOption: {
      iconCss: 'e-icons e-delete',
      cssClass: 'e-danger',
      content: 'Delete'
    }
  }
];
```

## Custom Commands

### Add Custom Action Buttons

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, CommandColumnService, EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [editSettings]='editSettings'
      (commandClick)='onCommandClick($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='ID' isPrimaryKey='true'></e-column>
        <e-column field='TaskName' headerText='Task Name'></e-column>
        <e-column 
          headerText='Actions' 
          width='150'
          [commands]='commands'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [CommandColumnService, EditService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  
  public editSettings = {
    mode: 'Normal',
    allowEditing: true
  };

  public commands = [
    { type: 'Edit', buttonOption: { cssClass: 'e-outline', content: 'Edit' } },
    { type: 'Delete', buttonOption: { cssClass: 'e-danger', content: 'Delete' } },
    {
      buttonOption: {
        content: 'Copy',
        cssClass: 'e-info',
        iconCss: 'e-icons e-copy'
      }
    },
    {
      buttonOption: {
        content: 'Details',
        cssClass: 'e-primary',
        iconCss: 'e-icons e-details'
      }
    }
  ];

  onCommandClick(args: any): void {
    if (args.commandType === 'Edit') {
      // Edit row
      console.log('Editing row:', args.rowData);
    } else if (args.commandType === 'Delete') {
      // Delete row
      if (confirm('Delete this record?')) {
        this.treegrid.deleteRecord(args.rowData);
      }
    } else if (args.commandType === 'Copy') {
      // Custom copy command
      const copyData = { ...args.rowData };
      copyData.TaskID = null;  // Clear ID for new record
      console.log('Copying record:', copyData);
      this.treegrid.addRecord(copyData);
    } else if (args.commandType === 'Details') {
      // Show details dialog
      console.log('Show details for:', args.rowData);
      this.showDetailsDialog(args.rowData);
    }
  }

  private showDetailsDialog(data: any): void {
    // Implement details dialog
  }
}
```

## Command Events

### Handle Command Click Events

```typescript
import { Component } from '@angular/core';
import { CommandColumnService, EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      (commandClick)='onCommandClick($event)'
      (actionBegin)='onActionBegin($event)'
      (actionComplete)='onActionComplete($event)'>
      <e-columns>
        <!-- Command column -->
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [CommandColumnService, EditService]
})
export class AppComponent {
  public data: Object[] = [];

  onCommandClick(args: any): void {
    console.log('Row Data:', args.rowData);
    console.log('Command Type:', args.commandType);
    console.log('Row Index:', args.rowIndex);
  }

  onActionBegin(args: any): void {
    if (args.requestType === 'save') {
      console.log('Saving changes...');
    } else if (args.requestType === 'delete') {
      console.log('Deleting record...');
    }
  }

  onActionComplete(args: any): void {
    if (args.requestType === 'save') {
      console.log('Changes saved successfully');
    }
  }
}
```

### Disable Commands for Specific Rows

```typescript
onCommandClick(args: any): void {
  const rowData = args.rowData;
  
  // Disable delete for locked records
  if (rowData.IsLocked && args.commandType === 'Delete') {
    alert('Cannot delete locked records');
    args.cancel = true;
    return;
  }

  // Only allow edit for owned records
  if (rowData.OwnerId !== this.currentUserId && args.commandType === 'Edit') {
    alert('You can only edit your own records');
    args.cancel = true;
    return;
  }
}
```
