# Filtering — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Enabling and Disabling Filtering](#enabling-and-disabling-filtering)
- [Changing the Filter Type](#changing-the-filter-type)
- [Filtering Event](#filtering-event)
- [Notes](#notes)

---

## Overview

The MultiColumnComboBox includes built-in filtering. When users type in the input, the popup list automatically narrows to matching items. Filtering is enabled by default (`allowFiltering: true`).

---

## Enabling and Disabling Filtering

Filtering is on by default. Disable it explicitly with `allowFiltering: false`:

```ts
// Filtering enabled (default)
const enabled: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowFiltering: true,
  columns: columns
});
enabled.appendTo('#multicolumn');

// Filtering disabled
const disabled: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowFiltering: false,
  columns: columns
});
disabled.appendTo('#multicolumn-no-filter');
```

---

## Changing the Filter Type

Use `filterType` to control how the typed text is matched against item text. The default is `'StartsWith'`.

| Value | Behavior |
|---|---|
| `'StartsWith'` | Items whose text begins with the typed characters |
| `'EndsWith'` | Items whose text ends with the typed characters |
| `'Contains'` | Items whose text contains the typed characters anywhere |

```ts
import { MultiColumnComboBox, FilterType } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller',       Designation: 'Team Lead',       Country: 'England' },
  { EmpID: 1002, Name: 'Robert',              Designation: 'Developer',       Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',             Designation: 'HR',              Country: 'Russia'  },
  { EmpID: 1004, Name: 'Steven Buchanan',     Designation: 'Product Manager', Country: 'Ukraine' },
  { EmpID: 1005, Name: 'Margaret Peacock',    Designation: 'Developer',       Country: 'Egypt'   }
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
  allowFiltering: true,
  filterType: 'EndsWith',
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Filtering Event

The `filtering` event fires on every character typed in the input. Use it for custom filter logic (e.g., filtering by multiple fields or applying server-side filtering).

```ts
import { MultiColumnComboBox, FilteringEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowFiltering: true,
  columns: columns,
  filtering: (args: FilteringEventArgs) => {
    // args.text contains the typed value
    // args.updateData() can be used to supply custom filtered results
    console.log('Filter text:', args.text);
  }
});

mccBox.appendTo('#multicolumn');
```

---

## Notes

- Filtering applies to the `fields.text` column by default.
- When no items match the filter, the popup shows the `noRecordsTemplate` content.
- For remote data filtering, handle the `filtering` event manually and call `args.updateData()` with filtered results from the server.
