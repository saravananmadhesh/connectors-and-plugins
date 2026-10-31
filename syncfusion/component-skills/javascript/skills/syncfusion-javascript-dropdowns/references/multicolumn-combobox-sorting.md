# Sorting — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Enabling and Disabling Sorting](#enabling-and-disabling-sorting)
- [Setting Initial Sort Order](#setting-initial-sort-order)
- [Multi-Column Sorting](#multi-column-sorting)
- [Summary of Sort Properties](#summary-of-sort-properties)

---

## Overview

The MultiColumnComboBox supports column-based sorting via the popup grid header. Clicking a column header toggles ascending → descending → none. Sorting is enabled by default (`allowSorting: true`).

---

## Enabling and Disabling Sorting

```ts
// Sorting enabled (default)
const enabled: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowSorting: true,
  columns: columns
});
enabled.appendTo('#multicolumn');

// Sorting disabled
const disabled: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowSorting: false,
  columns: columns
});
disabled.appendTo('#multicolumn-no-sort');
```

---

## Setting Initial Sort Order

Use `sortOrder` to define the initial sort direction when the component first renders.

| Value | Behavior |
|---|---|
| `SortOrder.None` | No initial sorting (default) |
| `SortOrder.Ascending` | Data sorted ascending on load |
| `SortOrder.Descending` | Data sorted descending on load |

```ts
import { MultiColumnComboBox, SortOrder, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller',    Designation: 'Team Lead',       Country: 'England' },
  { EmpID: 1002, Name: 'Robert',           Designation: 'Developer',       Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',          Designation: 'HR',              Country: 'Russia'  },
  { EmpID: 1004, Name: 'Steven Buchanan',  Designation: 'Product Manager', Country: 'Ukraine' },
  { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer',       Country: 'Egypt'   }
];

const fields: object = { text: 'Name', value: 'EmpID' };

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
  allowSorting: true,
  sortOrder: SortOrder.Descending,
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Multi-Column Sorting

By default, only one column can be sorted at a time (`sortType: 'OneColumn'`). To allow sorting by multiple columns simultaneously, set `sortType: 'MultipleColumns'`. Users can hold **Ctrl** and click multiple column headers.

```ts
import { MultiColumnComboBox, SortOrder, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: empData,
  fields: fields,
  allowSorting: true,
  sortOrder: SortOrder.Descending,
  sortType: 'MultipleColumns',
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Summary of Sort Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `allowSorting` | `boolean` | `true` | Enable/disable column sorting |
| `sortOrder` | `SortOrder \| string` | `SortOrder.None` | Initial sort direction |
| `sortType` | `SortType \| string` | `'OneColumn'` | One-column or multi-column sorting |
