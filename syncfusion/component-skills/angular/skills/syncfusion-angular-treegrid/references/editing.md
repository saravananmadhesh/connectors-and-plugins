---
name: Editing
description: 'Editing in Syncfusion Angular TreeGrid - cell editing, inline editing, dialog editing, row editing, batch editing, and field validation.'
---

# Editing

Editing allows users to create, modify, and delete records with multiple editing modes and validation.

## When to Use

Use editing features when you need to:
- **Enable CRUD operations** — Allow users to create, read, update, and delete records in the TreeGrid
- **Inline editing** — Edit cell values directly without opening dialogs
- **Dialog editing** — Provide a dedicated form for editing records with validation
- **Batch editing** — Edit multiple records and save them all at once
- **Field validation** — Ensure data integrity with required fields and custom validation rules
- **Edit mode customization** — Control how editing behaves (e-mail formats, numeric precision, etc.)
- **Prevent unwanted edits** — Disable editing for specific columns or rows

## Table of Contents
- [CRUD & Editing Rules](#crud--editing-rules)
- [Editing Modes](#editing-modes)
- [Configure Editing](#configure-editing)
- [Validation](#validation)
- [Events](#events)
- [Optimistic Updates](#optimistic-updates)

## CRUD & Editing Rules

### Rule 1: EditSettings is MANDATORY for Editing
**Severity**: 🔴 CRITICAL - Editing won't work without configuration

**Requirement**:
```typescript
// ✅ REQUIRED - Must define editSettings
public editSettings = {
  mode: 'Cell',                    // Required: 'Cell', 'Dialog', 'Inline', 'Batch'
  allowEditing: true,              // Required: Enable editing
  allowAdding: true,               // Optional: Enable adding rows
  allowDeleting: true              // Optional: Enable deleting rows
};

<ejs-treegrid 
  [editSettings]='editSettings'
  [primaryKey]='TaskID'>           // Also need primary key
</ejs-treegrid>

// ❌ WRONG - No editSettings = No editing possible
<ejs-treegrid>
  <!-- No editing functionality -->
</ejs-treegrid>
```

**Additional Requirements**:
```typescript
// ✅ MUST inject EditService for any editing mode
import { EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  providers: [EditService]  // REQUIRED
})
```

**Edit Mode Rules**:
```typescript
// Cell Mode - Edit individual cells
editSettings: { mode: 'Cell', allowEditing: true }

// Dialog Mode - Edit in popup dialog
editSettings: { mode: 'Dialog', allowEditing: true }

// Inline Mode - Edit full row inline
editSettings: { mode: 'Inline', allowEditing: true }

// Batch Mode - Edit multiple rows, save all at once
editSettings: { mode: 'Batch', allowEditing: true }
```

---

### Rule 2: EditService Module Injection is MANDATORY for Editing
**Severity**: 🔴 CRITICAL - Editing features won't initialize without service

**Requirement**:
```typescript
// ✅ REQUIRED - EditService must be injected
import { EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `...`,
  providers: [EditService]  // MANDATORY for editing
})
export class AppComponent {}

// ❌ WRONG - Missing EditService
@Component({
  providers: []  // Service not injected = Editing fails
})
```

---

### Rule 3: Column EditType Must Match Data Type
**Severity**: 🟠 IMPORTANT - Validation fails with mismatched editTypes

**Requirement**:
```typescript
// ✅ CORRECT - EditType matches data type
<e-columns>
  <e-column field='TaskName' 
    headerText='Task' 
    editType='stringedit'></e-column>
    
  <e-column field='Duration' 
    headerText='Duration' 
    editType='numericedit'
    [validationRules]='{ required: true, min: 1, max: 1000 }'></e-column>
    
  <e-column field='Priority' 
    headerText='Priority' 
    editType='dropdownedit'></e-column>
    
  <e-column field='StartDate' 
    headerText='Start Date' 
    editType='datepickeredit'
    format='yMd'></e-column>
    
  <e-column field='IsCompleted' 
    headerText='Completed' 
    editType='booleanedit'></e-column>
</e-columns>

// ❌ WRONG - EditType mismatch
<e-column field='Duration' 
  headerText='Duration' 
  editType='TextBox'>  <!-- Should be NumericTextBox -->
</e-column>
```

**Valid EditTypes**:
| EditType | Best For | Validation |
|----------|----------|------------|
| stringedit | String fields | max length |
| numericedit | Numbers | min, max, decimals |
| dropdownedit | Fixed options | required |
| datepickeredit | Dates | date range |
| booleanedit | Booleans | true/false |
| datetimepickeredit| |Date and Time| |date and time range|

---

### Rule 4: Primary Key (isPrimaryKey) is MANDATORY for CRUD Operations
**Severity**: 🔴 CRITICAL - Editing/Deleting fails silently without this

**Requirement**:
```typescript
// ✅ REQUIRED - Exactly ONE column must have isPrimaryKey='true'
<e-columns>
  <e-column field='TaskID' headerText='ID' isPrimaryKey='true'></e-column>
  <e-column field='TaskName' headerText='Task'></e-column>
</e-columns>

// ❌ WRONG - No primary key = CRUD operations fail silently
<e-columns>
  <e-column field='TaskID' headerText='ID'></e-column>
  <e-column field='TaskName' headerText='Task'></e-column>
</e-columns>
```

**Rules**:
- ✅ Only ONE primary key allowed per grid
- ✅ Primary key value must be UNIQUE for each row
- ✅ Primary key must not be NULL/undefined
- ✅ Must match a field in data source
- ❌ Do NOT mark multiple columns as primary key
- ❌ Do NOT use composite/multi-column primary keys

**Impact Without This**:
```typescript
// What fails without isPrimaryKey:
- Edit operations (beginEdit fails silently)
- Delete operations (no row deleted)
- Update operations (data not persisted)
- Row selection preservation
```

---

## Editing Modes

### Row Editing

```typescript
import { Component } from '@angular/core';
import { EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [editSettings]='editSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90' isPrimaryKey='true'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';

  public editSettings = {
    mode: 'Inline'
  };
}
```

### Dialog Editing

```typescript
public editSettings = {
  mode: 'Dialog'
};
```

### Batch Editing

```typescript
public editSettings = {
  mode: 'Batch'
};
```

## Configure Editing

### Enable CRUD Operations

```typescript
public editSettings = {
  mode: 'Inline',
  allowEditing: true,
  allowDeleting: true,
  allowAdding: true
};
```

### Column Editor Type

```typescript
<e-column field='Duration' headerText='Duration' type='number' editType='numericedit' width='100'></e-column>
<e-column field='StartDate' headerText='Start Date' type='date' editType='datepickeredit' width='130'></e-column>
<e-column field='Status' headerText='Status' editType='dropdownedit' width='100'></e-column>
```

## Validation

### Field Validation

```typescript
<e-column 
  field='TaskName' 
  headerText='Task Name' 
  width='200'
  validationRules='{ required: true }'>
</e-column>

<e-column 
  field='Duration' 
  headerText='Duration' 
  type='number'
  validationRules='{ required: true, min: 1, max: 100 }'>
</e-column>
```

## Events

### Edit Events

```typescript
<ejs-treegrid 
  (actionBegin)='onActionBegin($event)'
  (actionComplete)='onActionComplete($event)'
  (actionFailure)='onActionFailure($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onActionBegin(args: any) {
  if (args.requestType === 'save') {
    console.log('Saving record:', args.data);
  }
}

onActionComplete(args: any) {
  if (args.requestType === 'save') {
    console.log('Record saved successfully');
  }
}

onActionFailure(args: any) {
  console.error('Edit operation failed:', args);
}
```

## Optimistic Updates

### Apply Changes Before Server Confirmation

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, EditService } from '@syncfusion/ej2-angular-treegrid';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [editSettings]='editSettings'
      (beforeBatchSave)='onBeforeBatchSave($event)'
      (actionFailure)='onActionFailure($event)'>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  public editSettings = { mode: 'Batch' };
  private originalData: Object[] = [];

  constructor(private http: HttpClient) {}

  onBeforeBatchSave(args: any): void {
    this.originalData = JSON.parse(JSON.stringify(this.data));
    args.cancel = false;
    this.saveChangesToServer(args.changedRecords);
  }

  private saveChangesToServer(changes: any[]): void {
    this.http.post('/api/tasks/batch', changes).subscribe({
      next: (response) => {
        console.log('Changes saved successfully');
        this.treegrid.refresh();
      },
      error: (error) => {
        console.error('Save failed, reverting changes');
        this.data = JSON.parse(JSON.stringify(this.originalData));
        this.treegrid.refresh();
      }
    });
  }

  onActionFailure(args: any): void {
    console.error('Operation failed:', args);
  }
}
```
