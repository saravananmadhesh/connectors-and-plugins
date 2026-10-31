# Editing

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Critical Rules](#critical-rules)
- [Edit Types](#edit-types)
- [Inline Editing](#inline-editing)
- [Dialog Editing](#dialog-editing)
- [Batch Editing](#batch-editing)
- [Edit Templates](#edit-templates)
- [Validation](#validation)
- [Persisting Changes](#persisting-changes)

## When to Use This Skill

Use this skill when you need to:
- **Enable inline editing** — Allow users to edit cells directly in the grid
- **Dialog-based editing** — Open dialog forms for editing row data
- **Batch editing** — Allow multiple row edits before saving
- **Validation** — Validate data before saving with error handling
- **Custom edit templates** — Create specialized edit forms for complex data
- **CRUD operations** — Add, update, and delete records through the grid
- **Edit mode control** — Manage edit mode entry and exit
- **Data persistence** — Save edited data to backend services
- **Edit events** — Hook into before/after edit lifecycle events
- **Primary key requirement** — Ensure proper data manipulation with primary keys

## Overview

Grid supports multiple editing modes to add, update, and delete records. Configure edit types and validation rules to match your requirements.

## Critical Rules

#### Rule 1: Primary Key Required for Data Manipulation Methods

Data manipulation methods (`addRecord()`, `deleteRecord()`, `setCellValue()`, etc.) **fail silently** without a primary key. Always mark one column as primary key.

```typescript
// ❌ WRONG - Editing methods fail silently
<e-column field="OrderID"></e-column>
<e-column field="CustomerName"></e-column>

// ✅ CORRECT - Mark ID column as primary key
<e-column field="OrderID" [isPrimaryKey]="true" width="100"></e-column>
<e-column field="CustomerName" width="150"></e-column>

// Now these methods work:
this.gridComponent.addRecord(newData);        // ✅ Works
this.gridComponent.deleteRecord('OrderID', record);  // ✅ Works
this.gridComponent.setCellValue(rowIndex, 'Freight', 500);  // ✅ Works
```

Why? Grid uses the primary key to identify which row to update or delete. Without it, there's no way to map changes back to the data source.

#### Rule 2: Edit Methods Require editSettings Configuration

Edit methods like `addRecord()`, `updateRecord()`, `deleteRecord()` **fail silently** without proper configuration. Must:
1. Set `[editSettings]` with `allowAdding: true`, `allowEditing: true`, `allowDeleting: true`
2. Inject `EditService` in `providers`

```typescript
// ❌ WRONG - addRecord() fails silently
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `<ejs-grid [dataSource]="data"></ejs-grid>`
})
export class GridComponent {
  data = [...];
  
  addNewRecord() {
    this.gridComponent.addRecord({ OrderID: 10251, CustomerName: 'NEW' });  // ❌ Fails silently
  }
}

// ✅ CORRECT - Full setup required
import { Component, ViewChild } from '@angular/core';
import { GridComponent, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid 
      [dataSource]="data" 
      [editSettings]="editSettings"
      [toolbar]="toolbarItems">
      <e-columns>
        <e-column field="OrderID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" width="150"></e-column>
        <e-column field="Freight" type="number" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [EditService, ToolbarService]  // ✅ MUST inject EditService
})
export class GridComponent {
  @ViewChild('grid') gridComponent!: GridComponent;
  
  editSettings: EditSettingsModel = {
    allowAdding: true,    // ✅ Enable add
    allowEditing: true,   // ✅ Enable edit
    allowDeleting: true,  // ✅ Enable delete
    mode: 'Normal'        // 'Normal' (inline), 'Dialog', 'Batch'
  };

  toolbarItems: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  data = [...];
  
  addNewRecord() {
    this.gridComponent.addRecord({ OrderID: 10251, CustomerName: 'NEW' });  // ✅ Works
  }
}
```

---

## Edit Types

Grid offers three main edit types:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-edit-types-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="toolbarItems"
              [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class EditTypesGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'  // 'Normal' (inline), 'Dialog', 'Batch'
  };

  toolbarItems: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];
}
```

## Inline Editing

Edit cells directly in the grid:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-inline-edit-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Edit', 'Delete', 'Update', 'Cancel']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class InlineEditGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Normal'  // Inline edit
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 }
  ];
}
```

## Dialog Editing

Edit records in a modal dialog:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-dialog-edit-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Edit', 'Delete', 'Update', 'Cancel']"
              (actionBegin)="onActionBegin($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class DialogEditGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Dialog'  // Dialog edit mode
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 }
  ];

  onActionBegin(args: any) {
    if (args.requestType === 'save') {
      console.log('Saving record:', args.data);
    }
  }
}
```

## Batch Editing

Edit multiple rows before saving:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-batch-edit-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Delete', 'Update', 'Cancel']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class BatchEditGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Batch'  // Batch edit mode
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];
}
```

## Edit Templates

Use custom templates for editing:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-edit-template-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Edit', 'Update', 'Cancel']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        
        <!-- Custom edit template -->
        <e-column field="Freight" headerText="Freight" width="120">
          <ng-template #editTemplate let-data>
            <input type="number" step="0.01" [(ngModel)]="data.Freight" class="e-field">
          </ng-template>
        </e-column>
        
        <!-- Dropdown template -->
        <e-column field="Status" headerText="Status" width="120">
          <ng-template #editTemplate let-data>
            <select [(ngModel)]="data.Status" class="e-field">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class EditTemplateGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Normal'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, Status: 'Pending' },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, Status: 'Completed' }
  ];
}
```

## Validation

Always match the validation rule to the column's data type. Using the wrong rule causes incorrect validation messages (e.g., applying `min`/`max` to a string column shows a number-based message like "ShipName must be at least 3" instead of "must have at least 3 characters").

Add validation rules to edited cells:

```typescript
import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-validation-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Edit', 'Delete', 'Update', 'Cancel']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"
                  [validationRules]="{ required: true, minLength: 3 }"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" width="120"
                  [validationRules]="{ required: true, min: 0, max: 1000 }"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" width="130"
                  [validationRules]="{ required: true }"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ValidationGridComponent {
  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    mode: 'Normal'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61, OrderDate: new Date(1996, 6, 5) }
  ];
}
```

### Validation Rules Reference

| Rule | Applies to | Description | Example |
|------|-----------|-------------|---------|
| `required` | All types | Field must not be empty | `{ required: true }` |
| `minLength` | **String only** | Minimum character count | `{ minLength: 3 }` |
| `maxLength` | **String only** | Maximum character count | `{ maxLength: 50 }` |
| `min` | **Number only** | Minimum numeric value | `{ min: 0 }` |
| `max` | **Number only** | Maximum numeric value | `{ max: 10000 }` |

## Persisting Changes

Save changes to a server:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, EditSettingsModel, ActionEventArgs } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-persist-edit-grid',
  template: `
    <ejs-grid #grid
              [dataSource]="data" 
              [editSettings]="editSettings"
              [toolbar]="['Add', 'Edit', 'Delete', 'Update', 'Cancel']"
              (actionComplete)="onActionComplete($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" [isPrimaryKey]="true" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class PersistEditGridComponent {
  @ViewChild('grid') grid!: GridComponent;

  editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  constructor(private http: HttpClient) { }

  onActionComplete(args: ActionEventArgs) {
    if (args.requestType === 'save') {
      // Send to server API
      this.http.post('api/orders', args.data).subscribe(
        (result) => {
          console.log('Data saved successfully:', result);
        },
        (error) => {
          console.error('Error saving data:', error);
        }
      );
    }
  }
}
```
