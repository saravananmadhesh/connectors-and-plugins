# Columns — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Core Column Properties](#core-column-properties)
- [Text Alignment](#text-alignment)
- [Cell Templates](#cell-templates)
- [Header Templates](#header-templates)
- [Display as Checkbox](#display-as-checkbox)
- [Custom Attributes](#custom-attributes)
- [Format](#format)

---

## Overview

Columns define what data fields appear in the popup grid. In JavaScript, the `columns` property on the model is a `ColumnModel[]` array — each element configures one column. There are no JSX directive wrappers as in React.

---

## Core Column Properties

Every column requires `field`. Use `header` and `width` to label and size the column.

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
  { EmpID: 1002, Name: 'Robert',       Designation: 'Developer', Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',      Designation: 'HR',        Country: 'Russia'  }
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
  text: 'Michael',
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

| Property | Type | Description |
|---|---|---|
| `field` | `string` | Data source field to display in this column. **Required.** |
| `header` | `string` | Text shown in the column header. |
| `width` | `number` | Column width in pixels. |

---

## Text Alignment

Use `textAlign` to control the horizontal alignment of column content.

Accepted values: `'Left'` | `'Right'` | `'Center'` | `'Justify'`

```ts
const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 90 },
  { field: 'Name',        header: 'Name',        width: 90, textAlign: 'Right' },
  { field: 'Designation', header: 'Designation', width: 90 },
  { field: 'Country',     header: 'Country',     width: 70 }
];
```

---

## Cell Templates

Use `template` to fully customize what renders inside each cell. The template is a **string** using `${FieldName}` syntax to interpolate data values.

```ts
const data: { [key: string]: Object }[] = [
  { Name: 'Andrew Fuller',    Eimg: 7, Designation: 'Team Lead', Country: 'England', DateofJoining: '12/10/2010' },
  { Name: 'Anne Dodsworth',   Eimg: 1, Designation: 'Developer', Country: 'USA',     DateofJoining: '10/05/2000' }
];

const fields: object = { text: 'Name', value: 'Eimg' };

const columns: ColumnModel[] = [
  {
    field: 'Eimg',
    header: 'Photos',
    width: 90,
    template: '<div><img class="empImage" src="https://ej2.syncfusion.com/demos/src/multicolumn-combobox/Employees/${Eimg}.png" alt="employee"/></div>'
  },
  {
    field: 'Name',
    header: 'Employee Name',
    width: 160,
    template: '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div>'
  },
  {
    field: 'DateofJoining',
    header: 'Date of Joining',
    width: 165,
    template: '<div class="dateOfJoining"> ${DateofJoining} </div>'
  },
  { field: 'Country', header: 'Country', width: 100 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: data,
  fields: fields,
  placeholder: 'Select an employee',
  gridSettings: { rowHeight: 40 },
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

> When using `template`, set `gridSettings: { rowHeight: 40 }` if the template content is taller than the default row height.

---

## Header Templates

Use `headerTemplate` on a column to replace the default header text with custom HTML.

```ts
const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', headerTemplate: '<div class="header"><span>Employee ID</span></div>',     width: 90  },
  { field: 'Name',        header: 'Name',        headerTemplate: '<div class="header"><span>Employee Name</span></div>',    width: 160 },
  { field: 'Designation', header: 'Designation', headerTemplate: '<div class="header"><span>Designation</span></div>',      width: 90  },
  { field: 'Country',     header: 'Country',     headerTemplate: '<div class="header"><span>Country</span></div>',          width: 80  }
];
```

---

## Display as Checkbox

Use `displayAsCheckBox: true` to render a boolean field as a checkbox instead of showing `true`/`false` text.

```ts
const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 90, displayAsCheckBox: true },
  { field: 'Name',        header: 'Name',        width: 90 },
  { field: 'Designation', header: 'Designation', width: 90 },
  { field: 'Country',     header: 'Country',     width: 70 }
];
```

> Default value is `false`. Enable this when the column field contains boolean values.

---

## Custom Attributes

Use `customAttributes` to add custom CSS classes or inline styles to all cells in a column.

```ts
const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 90 },
  { field: 'Name',        header: 'Name',        width: 90, customAttributes: { class: 'e-custom-multicolumn' } },
  { field: 'Designation', header: 'Designation', width: 90 },
  { field: 'Country',     header: 'Country',     width: 70 }
];
```

The object is applied as HTML attributes on each cell element in the column.

---

## Format

Use the `format` property to apply formatting to column data (e.g., numbers, dates).

```ts
const columns: ColumnModel[] = [
  // Number format (currency with 2 decimals)
  { field: 'Freight',    header: 'Freight',    width: 120, format: 'C2' },
  // Date format
  { field: 'OrderDate',  header: 'Order Date', width: 140, format: { type: 'date', skeleton: 'medium' } }
];
```

Format strings follow the Internationalization library conventions used across Syncfusion EJ2 components.
