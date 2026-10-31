# Columns

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Column Properties](#column-properties)
- [Column Types](#column-types)
- [Column Templates](#column-templates)
- [Foreign Key Columns](#foreign-key-columns)
- [Column Rendering](#column-rendering)

## When to Use This Skill

Use this skill when you need to:
- **Define grid structure** — Map data fields to grid columns with appropriate types
- **Configure column properties** — Set widths, alignment, sorting, filtering capabilities
- **Format column data** — Display numbers as currency, dates with specific formats
- **Create column templates** — Customize column content with HTML templates
- **Implement foreign keys** — Display related data from lookup tables in columns
- **Render custom content** — Use templates for complex column visualizations
- **Control column visibility** — Show/hide columns based on conditions
- **Set column types** — Specify string, number, date, boolean types for proper handling

## Overview

Columns define the structure and presentation of your grid data. Each column maps to a field in your data source and controls how that data is displayed, formatted, and interacted with.

## Column Properties

Basic column configuration with essential properties:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-column-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="EmployeeID" headerText="ID" [isPrimaryKey]="true" 
                  width="100" type="number"></e-column>
        <e-column field="FirstName" headerText="First Name" width="120" 
                  [allowSorting]="true" [allowFiltering]="true"></e-column>
        <e-column field="LastName" headerText="Last Name" width="120"></e-column>
        <e-column field="Title" headerText="Title" width="150" 
                  [customClass]="'custom-title'"></e-column>
        <e-column field="HireDate" headerText="Hire Date" type="date" 
                  format="yMd" width="130"></e-column>
        <e-column field="Salary" headerText="Salary" type="number" 
                  format="C2" width="120" [textAlign]="'Right'"></e-column>
        <e-column field="Verified" headerText="Verified" type="boolean" 
                  width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ColumnGridComponent {
  data = [
    { EmployeeID: 1, FirstName: 'Nancy', LastName: 'Davolio', Title: 'Sales Representative', 
      HireDate: new Date(1992, 4, 1), Salary: 60000, Verified: true },
    { EmployeeID: 2, FirstName: 'Andrew', LastName: 'Fuller', Title: 'Vice President Sales', 
      HireDate: new Date(1992, 8, 14), Salary: 97000, Verified: true }
  ];
}
```

**Key column properties:**
- `field` — Maps to data source field
- `headerText` — Display column header
- `width` — Column width (px or %)
- `type` — Data type (string, number, date, boolean, datetime)
- `format` — Display format (C2 for currency, yMd for date)
- `isPrimaryKey` — Mark as primary key
- `allowSorting` — Enable/disable sorting
- `allowFiltering` — Enable/disable filtering
- `textAlign` — Align content (Left, Right, Center)

## Column Types

Grid supports various data types with automatic formatting:

```typescript
<ejs-grid [dataSource]="data">
  <e-columns>
    <!-- String column -->
    <e-column field="Name" headerText="Name" type="string" width="120"></e-column>
    
    <!-- Number column -->
    <e-column field="Quantity" headerText="Quantity" type="number" 
              [customFormat]="numberFormat" width="100"></e-column>
    
    <!-- Date column -->
    <e-column field="OrderDate" headerText="Order Date" type="date" 
              format="yMd" width="130"></e-column>
    
    <!-- DateTime column -->
    <e-column field="CreatedAt" headerText="Created At" type="datetime" 
              format="g" width="180"></e-column>
    
    <!-- Boolean column (checkbox) -->
    <e-column field="IsActive" headerText="Active" type="boolean" width="100"></e-column>

  </e-columns>
</ejs-grid>
```

## Column Templates

Use custom templates to render complex content in columns:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="EmployeeID" headerText="ID" width="100"></e-column>
        <e-column field="FirstName" headerText="First Name" width="120"></e-column>
        
        <!-- Custom template with formatting -->
        <e-column field="Salary" headerText="Salary" width="120">
          <ng-template #template let-data>
            <div style="color: #2ecc71; font-weight: bold;">
              {{ data.Salary | currency:'USD':'symbol' }}
            </div>
          </ng-template>
        </e-column>
        
        <!-- Template with buttons -->
        <e-column headerText="Actions" width="150" textAlign="Center">
          <ng-template #template let-data>
            <button (click)="onEdit(data)">Edit</button>
            <button (click)="onDelete(data)">Delete</button>
          </ng-template>
        </e-column>
        
        <!-- Image template -->
        <e-column field="ProfilePicture" headerText="Profile" width="100">
          <ng-template #template let-data>
            <img [src]="data.ProfilePicture" width="30" height="30" 
                 style="border-radius: 50%;">
          </ng-template>
        </e-column>
        
        <!-- Badge template -->
        <e-column field="Status" headerText="Status" width="100">
          <ng-template #template let-data>
            <span [ngClass]="{
              'badge-success': data.Status === 'Active',
              'badge-warning': data.Status === 'Inactive',
              'badge-danger': data.Status === 'Suspended'
            }">{{ data.Status }}</span>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class TemplateGridComponent {
  data = [...]; // Your data
  
  onEdit(data: any) { console.log('Edit:', data); }
  onDelete(data: any) { console.log('Delete:', data); }
}
```

## Foreign Key Columns

Display foreign key relationships with lookup values:

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-fk-grid',
  template: `
    <ejs-grid [dataSource]="orderData">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        
        <!-- Foreign Key Column -->
        <e-column field="EmployeeID" headerText="Employee" width="150" 
                  [foreignKeyValue]="'FirstName'"
                  [dataSource]="employeeManager">
        </e-column>
        
        <e-column field="CustomerID" headerText="Customer" width="150"
                  [foreignKeyValue]="'ContactName'"
                  [dataSource]="customerManager">
        </e-column>
        
        <e-column field="OrderDate" headerText="Order Date" type="date" 
                  format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ForeignKeyGridComponent {
  orderData = [
    { OrderID: 10248, EmployeeID: 1, CustomerID: 'VINET', OrderDate: new Date(1996, 6, 4) },
    { OrderID: 10249, EmployeeID: 3, CustomerID: 'TOMSP', OrderDate: new Date(1996, 6, 5) }
  ];

  employeeManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });

  customerManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

## Column Rendering

Control how columns are rendered and displayed:

```typescript
<ejs-grid [dataSource]="data" [columns]="columns">
  <!-- Columns can be dynamically created -->
</ejs-grid>
```

```typescript
export class DynamicColumnGridComponent {
  columns = [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { 
      field: 'OrderDate', 
      headerText: 'Order Date', 
      type: 'date',
      format: 'yMd',
      width: 130 
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      type: 'number',
      format: 'C2',
      width: 120 
    }
  ];
  
  data = [
    { OrderID: 10248, CustomerName: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61 }
  ];
}
```
