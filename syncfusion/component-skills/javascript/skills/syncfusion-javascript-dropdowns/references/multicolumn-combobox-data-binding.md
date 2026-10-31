# Data Binding — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Binding Local Data](#binding-local-data)
- [Binding Remote Data](#binding-remote-data)
- [Using Query](#using-query)
- [Supported Data Services](#supported-data-services)

---

## Overview

The MultiColumnComboBox accepts data through the `dataSource` property. It supports:
- Plain JavaScript object arrays (local data)
- `DataManager` instances (remote or advanced local queries)

The `fields` property maps which data object keys serve as the display text, hidden value, and optional group-by field.

---

## Fields Mapping

```ts
const fields: object = {
  text: 'Name',       // shown in the input box after selection
  value: 'EmpID',     // hidden value stored/returned by the component
  groupBy: 'Country'  // optional: groups items in the popup by this field
};
```

| Field | Type | Description |
|---|---|---|
| `text` | `string` | Property to display as item text in the input |
| `value` | `string` | Property used as the underlying value |
| `groupBy` | `string` | Property used to group list items |

> Map `fields` correctly — an incorrect mapping causes the selected item to appear `undefined`.

---

## Binding Local Data

Pass a plain array of objects to `dataSource`. Each object's keys must include what `fields.text`, `fields.value`, and each column `field` reference.

```ts
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller',       Designation: 'Team Lead',       Country: 'England' },
  { EmpID: 1002, Name: 'Robert',              Designation: 'Developer',       Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',             Designation: 'HR',              Country: 'Russia'  },
  { EmpID: 1004, Name: 'Steven Buchanan',     Designation: 'Product Manager', Country: 'Ukraine' },
  { EmpID: 1005, Name: 'Margaret Peacock',    Designation: 'Developer',       Country: 'Egypt'   }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: { text: 'Name', value: 'EmpID' },
  text: 'Michael',
  columns: [
    { field: 'EmpID',       header: 'Employee ID', width: 90 },
    { field: 'Name',        header: 'Name',        width: 90 },
    { field: 'Designation', header: 'Designation', width: 90 },
    { field: 'Country',     header: 'Country',     width: 70 }
  ]
});

mccBox.appendTo('#multicolumn');
```

---

## Binding Remote Data

Use `DataManager` with an adaptor to fetch data from a REST API. The component will load and display data from the remote service.

```ts
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataSource: DataManager = new DataManager({
  url: 'url',                       // Replace with your trusted API endpoint
  adaptor: new WebApiAdaptor(),
  crossDomain: true                 // Enable only when the API origin differs from your app
});

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: dataSource,
  fields: { text: 'FirstName', value: 'EmployeeID' },
  placeholder: 'Select a name',
  popupHeight: '230px',
  columns: [
    { field: 'EmployeeID',  header: 'Employee ID', width: 120 },
    { field: 'FirstName',   header: 'Name',        width: 130 },
    { field: 'Designation', header: 'Designation', width: 120 },
    { field: 'Country',     header: 'Country',     width: 90  }
  ]
});

mccBox.appendTo('#multicolumn');
```

---

## Using Query

Use the `query` property to apply constraints on the data before it is rendered. This works with both local and remote data sources.

```ts
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';
import { Query } from '@syncfusion/ej2-data';

const query: Query = new Query()
  .select(['Name', 'EmpID', 'Designation', 'Country'])
  .take(7);

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: { text: 'Name', value: 'EmpID' },
  query: query,
  columns: [
    { field: 'EmpID',       header: 'Employee ID', width: 90 },
    { field: 'Name',        header: 'Name',        width: 90 },
    { field: 'Designation', header: 'Designation', width: 90 },
    { field: 'Country',     header: 'Country',     width: 70 }
  ]
});

mccBox.appendTo('#multicolumn');
```

---

## Supported Data Services

The `DataManager` supports multiple adaptors for different backends:

| Adaptor | Use Case |
|---|---|
| `WebApiAdaptor` | ASP.NET Web API / REST services |
| `ODataAdaptor` | OData v3 services |
| `ODataV4Adaptor` | OData v4 services |
| `JsonAdaptor` | Local JSON array with DataManager features |

```ts
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataSource: DataManager = new DataManager({
  url: 'url',                       // Replace with your trusted OData v4 endpoint
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});
```

> For large remote datasets, combine `DataManager` with `enableVirtualization: true` for efficient rendering.
