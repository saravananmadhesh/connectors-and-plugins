# Data Binding in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Binding Local Data](#binding-local-data)
- [Binding Remote Data](#binding-remote-data)
- [Using the Query Property](#using-the-query-property)

## Overview

The MultiColumn ComboBox loads data from local arrays or remote services via the `dataSource` property. It supports:
- **Local:** Object arrays
- **Remote:** `DataManager` with adaptors (OData, WebAPI, etc.)

The `fields` property maps data fields to the component's text, value, and groupBy roles.

## Fields Mapping

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Field displayed in the input after selection |
| `value` | `string` | Hidden value stored/returned by the component |
| `groupBy` | `string` | Field used to group items in the popup |

> All three fields should be mapped correctly — an incorrect mapping leaves the selected item undefined.

```typescript
public fields: Object = { text: 'Name', value: 'EmpID', groupBy: 'Country' };
```

## Binding Local Data

Pass an array of plain JavaScript objects to `[dataSource]`:

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
      text='Michael'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
        <e-column field='Country' header='Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' },
    { EmpID: 1004, Name: 'Steven Buchanan', Designation: 'Product Manager', Country: 'Ukraine' },
    { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer', Country: 'Egypt' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
}
```

## Binding Remote Data

Use `DataManager` with an appropriate adaptor. The component fetches data via HTTP and renders it in the popup:

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
      [placeholder]='waterMark'>
      <e-columns>
        <e-column field='EmployeeID' header='Employee ID' width='120'></e-column>
        <e-column field='FirstName' header='Name' width='120'></e-column>
        <e-column field='Designation' header='Designation' width='120'></e-column>
        <e-column field='Country' header='Country' width='100'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public dataSource = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });
  public fields: Object = { text: 'FirstName', value: 'EmployeeID' };
  public waterMark: string = 'Select a name';
}
```

**Supported adaptors:**
- `WebApiAdaptor` — REST APIs returning JSON
- `ODataAdaptor` — OData v2 services
- `ODataV4Adaptor` — OData v4 services
- `UrlAdaptor` — Custom server-side processing

## Using the Query Property

The `query` property filters or limits data fetched from the source. Works with both local and remote data:

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { Query } from '@syncfusion/ej2-data';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='empData'
      [fields]='fields'
      [query]='query'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
        <e-column field='Country' header='Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' },
    // ... more records
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  // Select specific columns and limit to 7 results
  public query: Query = new Query().select(['Name', 'EmpID', 'Designation', 'Country']).take(7);
}
```
