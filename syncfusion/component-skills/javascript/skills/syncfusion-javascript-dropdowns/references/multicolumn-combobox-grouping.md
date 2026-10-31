# Grouping — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Enabling Grouping](#enabling-grouping)
- [Custom Group Template](#custom-group-template)
- [Key Points](#key-points)

---

## Overview

The MultiColumnComboBox supports grouping popup items by a shared category field. Group headers are fixed and update dynamically as you scroll through the list. Configure grouping through the `fields.groupBy` property.

---

## Enabling Grouping

Set `fields.groupBy` to the data property that defines the group category:

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller',    Designation: 'Team Lead',       Country: 'England' },
  { EmpID: 1002, Name: 'Robert',           Designation: 'Developer',       Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',          Designation: 'HR',              Country: 'Russia'  },
  { EmpID: 1004, Name: 'Steven Buchanan',  Designation: 'Product Manager', Country: 'Ukraine' },
  { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer',       Country: 'Egypt'   },
  { EmpID: 1006, Name: 'Janet Leverling',  Designation: 'Team Lead',       Country: 'Africa'  }
];

// Group items by Country
const fields: object = { text: 'Name', value: 'EmpID', groupBy: 'Country' };

const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 90 },
  { field: 'Name',        header: 'Name',        width: 90 },
  { field: 'Designation', header: 'Designation', width: 90 },
  { field: 'Country',     header: 'Country',     width: 70 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Custom Group Template

Use `groupTemplate` on the component to customize how each group header displays. The template is a **string** that can reference `${key}` (group value), `${field}` (group field name), and `${count}` (number of items in the group).

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const data: { [key: string]: Object }[] = [
  { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(8364186e5), Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(836505e6),  Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', OrderDate: new Date(8367642e5), Freight: 65.83 },
  { OrderID: 10253, CustomerID: 'HANAR', OrderDate: new Date(836937e6),  Freight: 58.17 }
];

const fields: object = { text: 'CustomerID', value: 'OrderID', groupBy: 'CustomerID' };

// groupTemplate must be a string using ${key}, ${field}, ${count} tokens
const groupTemplate: string = '<div class="e-group-temp">Key is: ${key}, Field is: ${field}, Count is: ${count}</div>';

const columns: ColumnModel[] = [
  { field: 'OrderID',    header: 'Order ID',    width: 120 },
  { field: 'CustomerID', header: 'Customer ID', width: 140 },
  { field: 'Freight',    header: 'Freight',     width: 120 },
  { field: 'OrderDate',  header: 'Order Date',  width: 140 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: data,
  fields: fields,
  groupTemplate: groupTemplate,
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Key Points

- Group headers are fixed — they remain visible as users scroll through a group's items.
- Group headers update dynamically based on scroll position.
- Combine `groupBy` with `groupTemplate` for a fully branded group header appearance.
- Sorting and grouping can coexist — items will be sorted within groups.
