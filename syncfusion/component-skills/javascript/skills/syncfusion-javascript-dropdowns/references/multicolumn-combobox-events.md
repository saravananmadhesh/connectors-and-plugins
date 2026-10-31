# Events — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [change](#change)
- [select](#select)
- [open](#open)
- [close](#close)
- [filtering](#filtering)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [actionFailure](#actionfailure)
- [created](#created)
- [Event Summary](#event-summary)

---

## change

Fires when a popup item is selected **or** when the model value is changed by the user. This is the primary event for capturing user selection.

```ts
import { MultiColumnComboBox, ChangeEventArgs, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

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
  columns: columns,
  change: (args: ChangeEventArgs) => {
    console.log('Value changed:', args.value);
    console.log('Text changed:', args.text);
    console.log('Item data:', args.itemData);
  }
});

mccBox.appendTo('#multicolumn');
```

---

## select

Fires when a popup item is selected by mouse click, tap, or keyboard navigation. Fires *before* `change`.

```ts
import { MultiColumnComboBox, SelectEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  select: (args: SelectEventArgs) => {
    console.log('Selected item:', args.itemData);
  }
});
mccBox.appendTo('#multicolumn');
```

---

## open

Fires when the popup opens.

```ts
import { MultiColumnComboBox, PopupEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  open: (args: PopupEventArgs) => {
    console.log('Popup opened');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## close

Fires when the popup closes.

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  close: (args: PopupEventArgs) => {
    console.log('Popup closed');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## filtering

Fires on every character typed in the component. Use this event for custom filter logic, including server-side filtering.

```ts
import { MultiColumnComboBox, FilteringEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowFiltering: true,
  columns: columns,
  filtering: (args: FilteringEventArgs) => {
    // args.text: the typed search string
    // For custom filtering, call args.updateData(filteredData) to supply results
    console.log('Filtering with text:', args.text);
  }
});
mccBox.appendTo('#multicolumn');
```

---

## actionBegin

Fires before fetching data from a remote server. Use to show loading indicators.

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: remoteDataManager,
  fields: fields,
  columns: columns,
  actionBegin: () => {
    console.log('Data fetch started');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## actionComplete

Fires after data is successfully fetched from a remote server.

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: remoteDataManager,
  fields: fields,
  columns: columns,
  actionComplete: () => {
    console.log('Data fetch completed');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## actionFailure

Fires when a remote data fetch request fails. Use to display error messages or retry logic.

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: remoteDataManager,
  fields: fields,
  columns: columns,
  actionFailure: () => {
    console.error('Data fetch failed');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## created

Fires after the component is rendered. Use to perform post-render initialization.

```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  created: () => {
    console.log('Component created and rendered');
  }
});
mccBox.appendTo('#multicolumn');
```

---

## Event Summary

| Event | When Fired | Argument Type |
|---|---|---|
| `change` | Value changes or item selected | `ChangeEventArgs` |
| `select` | Item selected in popup | `SelectEventArgs` |
| `open` | Popup opens | `PopupEventArgs` |
| `close` | Popup closes | `PopupEventArgs` |
| `filtering` | Character typed in input | `FilteringEventArgs` |
| `actionBegin` | Remote fetch starts | `Object` |
| `actionComplete` | Remote fetch succeeds | `Object` |
| `actionFailure` | Remote fetch fails | `Object` |
| `created` | Component rendered | `Event` |
