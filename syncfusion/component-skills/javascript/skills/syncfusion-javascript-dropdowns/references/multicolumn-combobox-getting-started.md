# Getting Started — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [HTML Setup](#html-setup)
- [Basic Component Setup](#basic-component-setup)
- [Configuring Popup Size](#configuring-popup-size)
- [Troubleshooting](#troubleshooting)

---

## Installation

The MultiColumnComboBox ships as a separate EJ2 package: `@syncfusion/ej2-multicolumn-combobox`. Install it via npm:

```bash
npm install @syncfusion/ej2-multicolumn-combobox
```

The package has the following peer dependency tree:

```
@syncfusion/ej2-multicolumn-combobox
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-grids
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-navigations
├── @syncfusion/ej2-popups
└── @syncfusion/ej2-buttons
```

These peers are installed automatically by npm.

---

## CSS Imports

Add the following theme CSS imports to your `styles.css` (or main entry). The MultiColumnComboBox uses theme files from `ej2-base`, `ej2-inputs`, `ej2-grids`, `ej2-popups`, and `ej2-multicolumn-combobox`.

```css
/* styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/multicolumn-combobox/index.css";
```

> Other themes available: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`. Replace `tailwind3` with the desired theme name across all imports.

---

## HTML Setup

Create a target input element in your HTML. The MultiColumnComboBox initializes on an `<input>` element by default.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <input type="text" id="multicolumn" />
  <script src="bundle.js"></script>
</body>
</html>
```

---

## Basic Component Setup

The minimum required setup: `dataSource`, `fields`, and a `columns` array. Use the `MultiColumnComboBox` class from the package, then call `appendTo()` on a target element.

```ts
// app.ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
  { EmpID: 1002, Name: 'Robert',     Designation: 'Developer',  Country: 'USA'    },
  { EmpID: 1003, Name: 'Michael',    Designation: 'HR',         Country: 'Russia' }
];

const fields: object = { text: 'Name', value: 'EmpID' };

const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 120 },
  { field: 'Name',        header: 'Name',        width: 120 },
  { field: 'Designation', header: 'Designation', width: 120 },
  { field: 'Country',     header: 'Country',     width: 100 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  placeholder: 'Select an employee'
});

mccBox.appendTo('#multicolumn');
```

### Required Properties

| Property | Type | Purpose |
|---|---|---|
| `dataSource` | `object[] \| DataManager` | Data to populate the popup grid |
| `fields` | `FieldSettingsModel` | Maps data keys to display text and hidden value |
| `columns` | `ColumnModel[]` | Defines the columns rendered in the popup grid |
| `placeholder` | `string` | Hint text shown in the input |

---

## Configuring Popup Size

The popup defaults to `300px` height and matches the component width. Customize with `popupHeight` and `popupWidth`:

```ts
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: { text: 'Name', value: 'EmpID' },
  columns: [
    { field: 'EmpID',       header: 'Employee ID', width: 90 },
    { field: 'Name',        header: 'Name',        width: 90 },
    { field: 'Designation', header: 'Designation', width: 90 },
    { field: 'Country',     header: 'Country',     width: 70 }
  ],
  popupHeight: '250px',
  popupWidth: '500px',
  placeholder: 'Select an employee'
});

mccBox.appendTo('#multicolumn');
```

Both `popupHeight` and `popupWidth` accept `string` (e.g. `'250px'`) or `number` (in pixels).

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Popup list renders unstyled | Verify all 5 CSS imports are present and the bundler picks up `styles.css` |
| Selected text not showing | Check `fields.text` maps to the correct property key in your data |
| No data displays in popup | Confirm `dataSource` is not empty and `columns[].field` values match data keys |
| `MultiColumnComboBox is not a constructor` | Run `npm install @syncfusion/ej2-multicolumn-combobox` and restart the dev server |
| TypeScript type errors | Use `{ [key: string]: Object }[]` for typed data arrays and `ColumnModel[]` for columns |
| Popup appears offscreen | Set explicit `popupWidth` and ensure parent container does not have `overflow: hidden` |
