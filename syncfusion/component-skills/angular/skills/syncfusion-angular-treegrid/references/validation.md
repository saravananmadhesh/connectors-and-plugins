---
name: Validation
description: 'Advanced validation in Syncfusion Angular TreeGrid - async validation, custom rules, cross-field validation, server-side validation, and display strategies.'
---

# Advanced Validation

Comprehensive validation strategies for TreeGrid editing including async validation, custom rules, and server-side validation.

## When to Use

Use validation features when you need to:
- **Ensure data quality** — Validate user input before saving
- **Required fields** — Force users to fill in mandatory fields
- **Format validation** — Check email, phone, URL formats
- **Custom rules** — Implement business-specific validation logic
- **Cross-field validation** — Validate relationships between multiple fields
- **Async validation** — Validate against server (check username availability, etc.)
- **Server-side validation** — Prevent invalid data from being saved

## Table of Contents
- [Built-in Validation Rules](#built-in-validation-rules)
- [Custom Validation Rules](#custom-validation-rules)
- [Async Validation](#async-validation)
- [Validation Display Strategies](#validation-display-strategies)
- [Dynamic Validation](#dynamic-validation)

## Built-in Validation Rules

### Standard Validation Rules

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
        <!-- Required field -->
        <e-column 
          field='TaskName' 
          headerText='Task Name' 
          width='200'
          validationRules='{ required: true }'>
        </e-column>
        
        <!-- Min/Max validation -->
        <e-column 
          field='Duration' 
          headerText='Duration' 
          type='number'
          width='100'
          validationRules='{ required: true, min: 1, max: 1000 }'>
        </e-column>
        
        <!-- Email validation -->
        <e-column 
          field='Email' 
          headerText='Email' 
          width='150'
          validationRules='{ required: true, email: true }'>
        </e-column>
        
        <!-- Pattern validation -->
        <e-column 
          field='Code' 
          headerText='Code' 
          width='120'
          validationRules='{ required: true, pattern: "^[A-Z]{3}[0-9]{3}$" }'>
        </e-column>
        
        <!-- Min/Max length -->
        <e-column 
          field='Description' 
          headerText='Description' 
          width='200'
          validationRules='{ required: true, minLength: 10, maxLength: 500 }'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public editSettings = {
    mode: 'Cell',
    allowEditing: true
  };
}
```

## Custom Validation Rules

### Define Custom Validators

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent, EditService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      [editSettings]='editSettings'
      (actionComplete)='onActionComplete($event)'>
      <e-columns>
        <e-column 
          field='TaskID' 
          headerText='Task ID' 
          type='number'
          isPrimaryKey='true'
          width='90'
          validationRules='{ required: true, custom: validateTaskID }'>
        </e-column>
        <e-column 
          field='TaskName' 
          headerText='Task Name' 
          width='200'
          validationRules='{ required: true }'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public editSettings = {
    mode: 'Cell',
    allowEditing: true
  };

  // Custom validator function
  validateTaskID = (args: any): boolean => {
    // Custom logic: Task ID must be unique
    const taskID = args.value;
    const isDuplicate = this.data.some(
      item => item.TaskID === taskID && item.TaskID !== args.rowData?.TaskID
    );
    
    if (isDuplicate) {
      args.message = 'Task ID must be unique';
      return false;
    }
    
    // Task ID must be positive
    if (taskID <= 0) {
      args.message = 'Task ID must be positive';
      return false;
    }
    
    return true;
  };

  onActionComplete(args: any): void {
    if (args.requestType === 'save') {
      console.log('Record validated and saved');
    }
  }
}
```

### Complex Custom Validation

```typescript
validateTaskLogic = (args: any): boolean => {
  const record = args.rowData || args.data;
  
  // Business rule: Cannot create subtasks for completed parent tasks
  if (record.parentTaskID) {
    const parentTask = this.data.find(t => t.TaskID === record.parentTaskID);
    if (parentTask && parentTask.Status === 'Completed') {
      args.message = 'Cannot add subtasks to completed tasks';
      return false;
    }
  }
  
  // Business rule: High priority tasks must have duration >= 5 days
  if (record.Priority === 'High' && record.Duration < 5) {
    args.message = 'High priority tasks must have at least 5 days duration';
    return false;
  }
  
  return true;
};
```

## Async Validation

### Validate Against Server

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [editSettings]='editSettings'
      (beforeBatchSave)='onBeforeBatchSave($event)'>
      <e-columns>
        <e-column 
          field='Email' 
          headerText='Email' 
          width='200'
          validationRules='{ required: true, email: true }'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  public editSettings = { mode: 'Batch', allowEditing: true };

  constructor(private http: HttpClient) {}

  onBeforeBatchSave(args: any): void {
    args.cancel = true; // Prevent immediate save
    
    // Validate each changed record with server
    const validationPromises = args.changedRecords.map((record: any) => 
      this.validateRecordWithServer(record)
    );

    Promise.all(validationPromises).then((results) => {
      const hasErrors = results.some(result => !result.isValid);
      
      if (hasErrors) {
        alert('Validation failed. Please check your entries.');
      } else {
        // Proceed with save after validation
        this.saveToServer(args.changedRecords);
      }
    });
  }

  private validateRecordWithServer(record: any): Observable<{ isValid: boolean; message: string }> {
    return this.http.post<any>('/api/validate', record).pipe(
      map(response => ({
        isValid: response.success,
        message: response.message
      }))
    );
  }

  private saveToServer(records: any[]): void {
    this.http.post('/api/tasks/batch', records).subscribe({
      next: () => {
        console.log('Records saved successfully');
        this.treegrid.refresh();
      },
      error: (error) => {
        console.error('Save failed:', error);
      }
    });
  }
}
```

## Validation Display Strategies

### Custom Error Highlighting

```typescript
import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

interface FieldError {
  rowIndex: number;
  field: string;
  message: string;
}

@Component({
  selector: 'app-treegrid',
  template: `
    <style>
      .error-cell {
        background-color: #ffebee;
        border: 1px solid #f44336;
      }
      .error-tooltip {
        color: #d32f2f;
        font-size: 12px;
        margin-top: 4px;
      }
    </style>
    
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [editSettings]='editSettings'
      (cellSaved)='onCellSaved($event)'>
    </ejs-treegrid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  public editSettings = { mode: 'Cell', allowEditing: true };
  private fieldErrors: FieldError[] = [];

  onCellSaved(args: any): void {
    const validation = this.validateField(args.column.field, args.value, args.rowData);
    
    if (!validation.valid) {
      this.fieldErrors.push({
        rowIndex: args.rowIndex,
        field: args.column.field,
        message: validation.message
      });

      // Highlight error cell
      const cell = this.treegrid.grid?.getCellByIndex(
        args.rowIndex, 
        this.treegrid.grid?.getColumnIndexByField(args.column.field) || 0
      );
      
      if (cell) {
        cell.classList.add('error-cell');
      }
    }
  }

  private validateField(field: string, value: any, record: any): { valid: boolean; message: string } {
    if (field === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: 'Invalid email format' };
      }
    }
    return { valid: true, message: '' };
  }
}
```

## Dynamic Validation

### Conditional Validation Rules

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [editSettings]='editSettings'
      (actionComplete)='onActionComplete($event)'>
      <e-columns>
        <e-column field='TaskType' headerText='Type' width='120'></e-column>
        <e-column field='ExternalURL' headerText='External URL' width='200'></e-column>
        <e-column field='InternalID' headerText='Internal ID' width='150'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public editSettings = { mode: 'Cell', allowEditing: true };

  onActionComplete(args: any): void {
    if (args.requestType === 'save') {
      const validation = this.validateByTaskType(args.data);
      if (!validation.valid) {
        args.cancel = true;
        alert(validation.message);
      }
    }
  }

  private validateByTaskType(record: any): { valid: boolean; message: string } {
    switch (record.TaskType) {
      case 'External':
        // For external tasks, URL is required
        if (!record.ExternalURL || !this.isValidUrl(record.ExternalURL)) {
          return { 
            valid: false, 
            message: 'External tasks must have a valid URL' 
          };
        }
        break;

      case 'Internal':
        // For internal tasks, InternalID is required
        if (!record.InternalID || record.InternalID.length < 5) {
          return { 
            valid: false, 
            message: 'Internal tasks must have an ID of at least 5 characters' 
          };
        }
        break;

      case 'Hybrid':
        // Hybrid tasks require both
        if (!record.ExternalURL || !record.InternalID) {
          return { 
            valid: false, 
            message: 'Hybrid tasks require both URL and Internal ID' 
          };
        }
        break;
    }

    return { valid: true, message: '' };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
```
