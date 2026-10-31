---
name: Foreign-keys
description: 'Foreign Key Columns in Syncfusion Angular TreeGrid - mapping foreign key values to display text, and remote data binding.'
---

# Foreign Key Columns

Foreign Key columns enable relationships between TreeGrid data and external lookup tables for dropdown selection and display mapping.

## When to Use

Use Foreign Key columns when you need to:
- **Lookup values** — Map IDs to display text from related tables
- **Dropdown editing** — Show dropdown lists in edit mode
- **Data relationships** — Establish connections between related data

## Table of Contents
- [Foreign Key Configuration](#foreign-key-configuration)
- [Remote Data Binding](#remote-data-binding)

## Foreign Key Configuration

### Basic Foreign Key Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor, ForeignKeyService, EditService } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [editSettings]='editSettings'>
      <e-columns>
        <e-column 
          field='TaskID' 
          headerText='Task ID' 
          width='90' 
          isPrimaryKey='true'>
        </e-column>
        <e-column 
          field='TaskName' 
          headerText='Task Name' 
          width='200'>
        </e-column>
        <e-column 
          field='AssignedTo' 
          headerText='Assigned To'
          foreignKeyField='EmployeeID'
          foreignKeyValue='EmployeeName'
          dataSource='employeeData'
          editType='dropdownlist'
          width='150'>
        </e-column>
        <e-column 
          field='DepartmentID' 
          headerText='Department'
          foreignKeyField='DeptID'
          foreignKeyValue='DeptName'
          dataSource='departmentData'
          editType='dropdownlist'
          width='120'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ForeignKeyService, EditService]
})
export class AppComponent {
  public data: Object[] = [
    {
      TaskID: 1,
      TaskName: 'Project Planning',
      AssignedTo: 1,      // Foreign Key (ID)
      DepartmentID: 10,   // Foreign Key (ID)
      subtasks: [
        { TaskID: 2, TaskName: 'Scope', AssignedTo: 2, DepartmentID: 10 }
      ]
    }
  ];

  // Lookup data for Employee FK
  public employeeData = [
    { EmployeeID: 1, EmployeeName: 'Alice Johnson' },
    { EmployeeID: 2, EmployeeName: 'Bob Smith' },
    { EmployeeID: 3, EmployeeName: 'Carol Williams' }
  ];

  // Lookup data for Department FK
  public departmentData = [
    { DeptID: 10, DeptName: 'Engineering' },
    { DeptID: 20, DeptName: 'Marketing' },
    { DeptID: 30, DeptName: 'Sales' }
  ];

  public childMapping: string = 'subtasks';

  public editSettings = {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };
}
```

---

## Remote Data Binding

### Load FK Data from Server

```typescript
import { DataManager, UrlAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='taskDataManager'
      [childMapping]='childMapping'
      [editSettings]='editSettings'
      idMapping='TaskID'
      parentIdMapping='ParentID'>
      <e-columns>
        <e-column 
          field='TaskID' 
          headerText='Task ID' 
          width='90' 
          isPrimaryKey='true'>
        </e-column>
        <e-column 
          field='TaskName' 
          headerText='Task Name' 
          width='200'>
        </e-column>
        <e-column 
          field='AssignedToID' 
          headerText='Assigned To'
          foreignKeyField='EmployeeID'
          foreignKeyValue='EmployeeName'
          [dataSource]='employeeDataManager'
          editType='dropdownlist'
          width='150'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [EditService]
})
export class AppComponent {
  // Remote data for TreeGrid
  public taskDataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });

  // Remote data for FK lookup
  public employeeDataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true,
    pageSize: 20
  });

  public data: Object[] = [];
  public childMapping: string = 'Children';

  public editSettings = {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  };
}
```
