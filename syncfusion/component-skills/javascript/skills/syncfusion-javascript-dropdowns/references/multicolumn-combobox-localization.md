# Localization — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
- [Full Example (French)](#full-example-french)
- [Locale Keys Reference](#locale-keys-reference)
- [Notes](#notes)

---

## Overview

Localization lets you translate the component's built-in text strings (e.g., "No records found") into any language using the `L10n` class from `@syncfusion/ej2-base`.

---

## Setup

### 1. Import `L10n`

```ts
import { L10n } from '@syncfusion/ej2-base';
```

### 2. Register Locale Strings

The MultiColumnComboBox uses the locale key `'multicolumncombobox'`. The only built-in translatable string is `noRecordsTemplate`.

```ts
L10n.load({
  'fr-BE': {
    'multicolumncombobox': {
      'noRecordsTemplate': 'Aucun enregistrement trouvé',
    },
  },
});
```

### 3. Set the `locale` Property

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  locale: 'fr-BE',
  allowFiltering: true,
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

---

## Full Example (French)

```ts
import { L10n } from '@syncfusion/ej2-base';
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

L10n.load({
  'fr-BE': {
    'multicolumncombobox': {
      'noRecordsTemplate': 'Aucun enregistrement trouvé',
    },
  },
});

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
  { EmpID: 1002, Name: 'Robert',       Designation: 'Developer', Country: 'USA'     }
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
  locale: 'fr-BE',
  allowFiltering: true,
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

When the user types a value that yields no matches, the popup will display "Aucun enregistrement trouvé" instead of the default "No records found".

---

## Locale Keys Reference

| Locale Key | Default Value |
|---|---|
| `noRecordsTemplate` | `'No records found'` |

---

## Notes

- `L10n.load()` must be called **before** the component renders, typically at the top of the file or in the app entry point.
- The `locale` property accepts any valid BCP 47 language tag (e.g., `'en-US'`, `'fr-BE'`, `'de'`).
- For additional text customization beyond the locale key (such as custom styling in the no-records message), use the `noRecordsTemplate` property directly — it accepts a template string:

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  noRecordsTemplate: '<span>Aucun résultat pour cette recherche</span>',
  // ... other config
});
mccBox.appendTo('#multicolumn');
```
