# Virtualization in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [Enabling Virtualization](#enabling-virtualization)
- [Local Data Virtualization](#local-data-virtualization)
- [Remote Data Virtualization](#remote-data-virtualization)

## Overview

The `enableVirtualization` property enables UI virtualization in the popup. Rather than rendering all items in the DOM, virtualization renders only the rows visible within the popup viewport, significantly improving performance with large datasets (hundreds to thousands of records).

> **Note:** When `enableVirtualization` is `true`, the popup renders rows on demand as the user scrolls — not all data is in the DOM at once.

## Enabling Virtualization

Set `[enableVirtualization]='true'` on `<ejs-multicolumncombobox>`. Use `popupHeight` to constrain the visible area and trigger virtual scrolling.

```html
<ejs-multicolumncombobox
  [dataSource]='dataList'
  [fields]='fields'
  [enableVirtualization]='true'
  popupHeight='230px'>
  ...
</ejs-multicolumncombobox>
```

## Local Data Virtualization

Use `enableVirtualization` with a large local array. Set `popupHeight` to enable scrolling.

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
      [enableVirtualization]='true'
      [gridSettings]='gridSettings'
      popupHeight='230px'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='90'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='90'></e-column>
        <e-column field='Country' header='Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = this.generateData(150);
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
  public gridSettings: Object = { rowHeight: 40 };

  private generateData(count: number): Object[] {
    const designations = ['Team Lead', 'Developer', 'HR', 'Manager', 'Analyst'];
    const countries = ['England', 'USA', 'Russia', 'India', 'Australia'];
    const data: Object[] = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        EmpID: 1000 + i,
        Name: `Employee ${i}`,
        Designation: designations[i % designations.length],
        Country: countries[i % countries.length]
      });
    }
    return data;
  }
}
```

## Remote Data Virtualization

When using remote data with `enableVirtualization`, the component fetches all data from the server on popup open and then applies virtual scrolling locally.

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='dataSource'
      [fields]='fields'
      [placeholder]='waterMark'
      [enableVirtualization]='true'
      [gridSettings]='gridSettings'
      popupHeight='230px'>
      <e-columns>
        <e-column field='OrderID' header='Order ID' width='90'></e-column>
        <e-column field='CustomerID' header='Customer ID' width='90'></e-column>
        <e-column field='ShipCity' header='Ship City' width='90'></e-column>
        <e-column field='ShipCountry' header='Ship Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public dataSource: DataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public fields: Object = { text: 'CustomerID', value: 'OrderID' };
  public waterMark: string = 'Select a customer';
  public gridSettings: Object = { rowHeight: 40 };
}
```

> **Note:** With remote virtualization, all records are fetched in one request on popup open. Virtual scrolling then handles DOM rendering efficiently without additional server calls while scrolling.
