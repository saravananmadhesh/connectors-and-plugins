# Hierarchy Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Basic Hierarchy Grid](#basic-hierarchy-grid)
- [Nested Grid Hierarchy](#nested-grid-hierarchy)

## When to Use This Skill

Use this skill when you need to:
- **Master-detail relationships** — Display parent and child/related records
- **Expandable rows** — Allow users to expand rows to see detail data
- **Nested grids** — Show child grids within parent grid rows
- **Hierarchical data** — Organize and display tree-like data structures
- **Related data display** — Show details for selected parent record
- **Complex data relationships** — Visualize parent-child and multi-level structures

## Overview

Display hierarchical or nested data with master-detail grid structure. Expand rows to show child records in detail rows or nested grids.

## Basic Hierarchy Grid

Create master-detail grid:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridModel, DetailRowService } from '@syncfusion/ej2-angular-grids';

interface Order {
  OrderID: number;
  CustomerName: string;
  Freight: number;
}

interface OrderItem {
  ItemID: number;
  ProductName: string;
  Quantity: number;
  Price: number;
  OrderID: number;
}

@Component({
  selector: 'app-hierarchy-grid',
  imports: [],
  providers: [DetailRowService],
  template: `
    <ejs-grid [dataSource]="parentData" 
              [childGrid]="childGrid"
              height="315px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100" textAlign="Right"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class HierarchyGridComponent implements OnInit {
  
  parentData: Order[] = [];
  childGrid!: GridModel;

  childData: OrderItem[] = [
    { ItemID: 1, ProductName: 'Quiche Lorraine', Quantity: 5, Price: 6.00, OrderID: 10248 },
    { ItemID: 2, ProductName: 'Mozzarella di Giovanni', Quantity: 10, Price: 3.60, OrderID: 10248 },
    { ItemID: 3, ProductName: 'Tourtière', Quantity: 9, Price: 1.90, OrderID: 10249 }
  ];

  ngOnInit(): void {
    this.parentData = [
      { 
        OrderID: 10248, 
        CustomerName: 'VINET', 
        Freight: 32.38
      },
      { 
        OrderID: 10249, 
        CustomerName: 'TOMSP', 
        Freight: 11.61
      }
    ];

    // Configure child grid as TypeScript object
    this.childGrid = {
      dataSource: this.childData,
      queryString: 'OrderID',
      columns: [
        { field: 'ItemID', headerText: 'Item ID', width: 80 },
        { field: 'ProductName', headerText: 'Product', width: 150 },
        { field: 'Quantity', headerText: 'Qty', type: 'number', width: 80 },
        { field: 'Price', headerText: 'Price', type: 'number', format: 'C2', width: 120 }
      ]
    };
  }
}
```

## Nested Grid Hierarchy

Use nested grids for multiple levels:

```typescript
import { Component, OnInit } from '@angular/core';
import { GridModel, DetailRowService } from '@syncfusion/ej2-angular-grids';

interface Company {
  CompanyID: number;
  CompanyName: string;
}

interface Department {
  DepartmentID: number;
  DepartmentName: string;
  CompanyID: number;
}

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  DepartmentID: number;
}

@Component({
  selector: 'app-nested-hierarchy-grid',
  imports: [],
  providers: [DetailRowService],
  template: `
    <ejs-grid [dataSource]="companies"
              [childGrid]="departmentGrid"
              height="315px">
      <e-columns>
        <e-column field="CompanyID" headerText="Company ID" width="100" textAlign="Right"></e-column>
        <e-column field="CompanyName" headerText="Company Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class NestedHierarchyGridComponent implements OnInit {
  
  companies: Company[] = [];
  departmentGrid!: GridModel;
  employeeGrid!: GridModel;

  departmentData: Department[] = [
    { DepartmentID: 101, DepartmentName: 'Engineering', CompanyID: 1 },
    { DepartmentID: 102, DepartmentName: 'Sales', CompanyID: 1 }
  ];

  employeeData: Employee[] = [
    { EmployeeID: 1, FirstName: 'John', LastName: 'Smith', DepartmentID: 101 },
    { EmployeeID: 2, FirstName: 'Jane', LastName: 'Doe', DepartmentID: 101 },
    { EmployeeID: 3, FirstName: 'Mike', LastName: 'Brown', DepartmentID: 102 }
  ];

  ngOnInit(): void {
    this.companies = [
      { CompanyID: 1, CompanyName: 'Acme Corp' },
      { CompanyID: 2, CompanyName: 'Tech Solutions' }
    ];

    // Configure employee grid (second level child)
    this.employeeGrid = {
      dataSource: this.employeeData,
      queryString: 'DepartmentID',
      columns: [
        { field: 'EmployeeID', headerText: 'Emp ID', width: 100, textAlign: 'Right' },
        { field: 'FirstName', headerText: 'First Name', width: 120 },
        { field: 'LastName', headerText: 'Last Name', width: 120 }
      ]
    };

    // Configure department grid (first level child) with employee grid as child
    this.departmentGrid = {
      dataSource: this.departmentData,
      queryString: 'CompanyID',
      childGrid: this.employeeGrid,
      columns: [
        { field: 'DepartmentID', headerText: 'Dept ID', width: 100, textAlign: 'Right' },
        { field: 'DepartmentName', headerText: 'Department', width: 150 }
      ]
    };
  }
}
```
