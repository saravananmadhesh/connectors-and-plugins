# Data Binding in JavaScript ListBox

## Table of Contents
- [Basic Data Structure](#basic-data-structure)
- [Fields Mapping](#fields-mapping)
- [Grouping Data](#grouping-data)
- [Dynamic Data](#dynamic-data)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Troubleshooting](#troubleshooting)

---

## Basic Data Structure

### Simple Array of Objects

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'HTML', id: '1' },
  { text: 'CSS', id: '2' },
  { text: 'JavaScript', id: '3' },
  { text: 'TypeScript', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');
```

### Array of Strings

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: ['JavaScript', 'TypeScript', 'React', 'Vue']
});

listBox.appendTo('#listbox');
```

---

## Fields Mapping

### Text and Value Mapping

Map data property names to what the ListBox uses for display and internal value:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

// Data with different property names than 'text'/'id'
const data: { [key: string]: Object }[] = [
  { name: 'JavaScript', code: 'js' },
  { name: 'TypeScript', code: 'ts' },
  { name: 'React', code: 'react' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'name',   // Display this property
    value: 'code'   // Use this as the selection value
  }
});

listBox.appendTo('#listbox');
```

### Icon CSS Field

Attach icon CSS classes to list items:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'Audio', id: '1', icon: 'e-icons e-music' },
  { text: 'Video', id: '2', icon: 'e-icons e-video' },
  { text: 'Image', id: '3', icon: 'e-icons e-image' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'text',
    value: 'id',
    iconCss: 'icon'
  }
});

listBox.appendTo('#listbox');
```

### Disabled Field

Mark specific items as non-selectable via a data property:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', isDisabled: false },
  { text: 'TypeScript', id: '2', isDisabled: true },  // disabled
  { text: 'React', id: '3', isDisabled: false }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'text',
    value: 'id',
    disabled: 'isDisabled'
  }
});

listBox.appendTo('#listbox');
```

---

## Grouping Data

Group items by a category field using `fields.groupBy`:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'HTML', id: '1', type: 'Markup' },
  { text: 'CSS', id: '2', type: 'Styling' },
  { text: 'JavaScript', id: '3', type: 'Programming' },
  { text: 'TypeScript', id: '4', type: 'Programming' },
  { text: 'Sass', id: '5', type: 'Styling' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'text',
    value: 'id',
    groupBy: 'type'
  }
});

listBox.appendTo('#listbox');
```

---

## Dynamic Data

### Update Data Source After Initialization

Replace the full data source at runtime:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const initialData: { [key: string]: Object }[] = [
  { text: 'Frontend', id: '1' },
  { text: 'Backend', id: '2' }
];

const listBox: ListBox = new ListBox({
  dataSource: initialData,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');

// Later — replace the data source completely
const backendData: { [key: string]: Object }[] = [
  { text: 'Node.js', id: '1' },
  { text: 'Python', id: '2' },
  { text: 'Go', id: '3' }
];

document.getElementById('switchBtn')!.addEventListener('click', () => {
  listBox.dataSource = backendData as any;
  listBox.dataBind();
});
```

### Add Items with `addItems` Method

Append new items without replacing the entire data source:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'Item 1', id: '1' },
  { text: 'Item 2', id: '2' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');

document.getElementById('addBtn')!.addEventListener('click', () => {
  listBox.addItems([{ text: 'Item 3', id: '3' }]);
});
```

---

## Remote Data with DataManager

Bind the ListBox to a remote API using `DataManager`:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const listBox: ListBox = new ListBox({
  dataSource: new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true  // Enable only when API origin differs from your app
  }),
  query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(10),
  fields: { text: 'ContactName', value: 'CustomerID' }
});

listBox.appendTo('#listbox');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Items display `[object Object]` | Missing `fields` mapping | Set `fields: { text: 'yourPropName', value: 'yourValueProp' }` |
| Group headers not shown | `groupBy` field not mapped | Add `groupBy: 'categoryField'` to the `fields` object |
| Remote data not loading | Missing adaptor | Provide the correct adaptor (`ODataV4Adaptor`, `WebApiAdaptor`, etc.) |
| Disabled items still selectable | Wrong field name | Verify `fields.disabled` matches the boolean property name in your data |
