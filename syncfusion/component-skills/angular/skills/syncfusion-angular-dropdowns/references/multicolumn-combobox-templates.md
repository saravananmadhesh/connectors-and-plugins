# Templates in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Header Template](#header-template)
- [Group Template](#group-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)

## Overview

Templates allow custom HTML/Angular content in different parts of the MultiColumn ComboBox popup:

| Template Property | Scope |
|-------------------|-------|
| `itemTemplate` | Each row in the popup list |
| `headerTemplate` | Column header cells (via `<e-column>`) |
| `groupTemplate` | Group header rows |
| `footerTemplate` | Bottom of the popup |
| `noRecordsTemplate` | Shown when no items match filter |
| `actionFailureTemplate` | Shown when remote data fetch fails |

## Item Template

Customize each row in the popup using `[itemTemplate]`. Use template string syntax `${FieldName}`:

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='empData'
      [fields]='fields'
      [placeholder]='waterMark'
      [itemTemplate]='itemTemplate'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
  // Template string for each row — fields referenced with ${FieldName}
  public itemTemplate: string = '<tr><td class="emp-id">${EmpID}</td><td class="name">${Name}</td><td class="city">${Designation}</td></tr>';
}
```

## Header Template

Customize column header cells using `ng-template #headerTemplate` inside `<e-column>`:

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [gridSettings]='gridSettings'
  popupHeight='230px'>
  <e-columns>
    <e-column field='EmpID' width='100'>
      <ng-template #headerTemplate let-data>
        <div><span class="header">Employee ID</span></div>
      </ng-template>
    </e-column>
    <e-column field='Name' width='135'>
      <ng-template #headerTemplate let-data>
        <div><span class="header">Employee Name</span></div>
      </ng-template>
    </e-column>
    <e-column field='Designation' width='135'>
      <ng-template #headerTemplate let-data>
        <div><span class="header">Designation</span></div>
      </ng-template>
    </e-column>
    <e-column field='Country' width='95'>
      <ng-template #headerTemplate let-data>
        <div><span class="header">Country</span></div>
      </ng-template>
    </e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

## Group Template

Customize the group header row shown above each group of items using `[groupTemplate]`:

```typescript
export class AppComponent {
  public orderData: Object[] = [
    { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(8364186e5), Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(836505e6), Freight: 11.61 },
    { OrderID: 10250, CustomerID: 'HANAR', OrderDate: new Date(8367642e5), Freight: 65.83 }
  ];
  public fields: Object = { text: 'CustomerID', value: 'OrderID', groupBy: 'CustomerID' };
  public waterMark: string = 'Select an order';
  // Context: ${key} = group value, ${field} = field name, ${count} = items in group
  public groupTemplate: string = '<div class="e-group-temp">Key is: ${key}, Field is: ${field}, Count is: ${count}</div>';
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='orderData'
  [fields]='fields'
  [placeholder]='waterMark'
  [groupTemplate]='groupTemplate'>
  <e-columns>
    <e-column field='OrderID' header='Order ID' width='100'></e-column>
    <e-column field='CustomerID' header='Customer ID' width='90'></e-column>
    <e-column field='Freight' header='Freight' width='90'></e-column>
    <e-column field='OrderDate' header='Order Date' width='100'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

## Footer Template

Add content at the bottom of the popup (e.g., item count, action links) using `[footerTemplate]`:

```typescript
export class AppComponent {
  public empData: Object[] = [ /* ... */ ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
  public footerTemplate: string = `<span class='foot' style='font-weight: bolder; margin: 0 10px'>
    Total list of employees: ${this.empData.length}
  </span>`;
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [placeholder]='waterMark'
  [footerTemplate]='footerTemplate'>
  <e-columns> ... </e-columns>
</ejs-multicolumncombobox>
```

## No Records Template

Customize the popup when no items are found (empty data source or no filter matches):

```typescript
export class AppComponent {
  public dataSource = []; // Empty data
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select a name';
  public noRecordsTemplate: string = "<span class='norecord'>NO RECORDS FOUND</span>";
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='dataSource'
  [fields]='fields'
  [placeholder]='waterMark'
  [noRecordsTemplate]='noRecordsTemplate'>
  <e-columns>
    <e-column field='EmployeeID' header='Employee ID' width='90'></e-column>
    <e-column field='Name' header='Name' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

Also localizable — see `accessibility.md` for `L10n` usage.

## Action Failure Template

Show a custom message when the remote data request fails:

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

export class AppComponent {
  public dataSource = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public fields: Object = { text: 'ShipCountry', value: 'CustomerID' };
  public waterMark: string = 'Select a country';
  public gridSettings: Object = { rowHeight: 40 };
  public actionFailureTemplate: string = "<span class='action-failure'>Data fetch failed</span>";
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='dataSource'
  [fields]='fields'
  [placeholder]='waterMark'
  [gridSettings]='gridSettings'
  [actionFailureTemplate]='actionFailureTemplate'>
  <e-columns>
    <e-column field='OrderID' header='Order ID' width='90'></e-column>
    <e-column field='CustomerID' header='Customer ID' width='90'></e-column>
    <e-column field='ShipCountry' header='Ship Country' width='90'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```
