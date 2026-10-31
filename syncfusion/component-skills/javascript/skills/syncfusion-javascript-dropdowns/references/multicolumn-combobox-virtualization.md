# Virtualization — Syncfusion JavaScript MultiColumnComboBox

## Table of Contents
- [Overview](#overview)
- [Virtualization with Local Data](#virtualization-with-local-data)
- [Virtualization with Remote Data](#virtualization-with-remote-data)
- [Best Practices for Virtualization](#best-practices-for-virtualization)
- [Key Property](#key-property)

---

## Overview

Virtualization enables efficient rendering of very large datasets in the popup list. Instead of rendering every item in the DOM, it creates a fixed number of elements and reuses them as the user scrolls. This technique dramatically reduces memory usage and improves scroll performance.

Enable it with `enableVirtualization: true`.

---

## Virtualization with Local Data

Generate or load large local datasets and enable virtualization. The component only renders visible rows in the DOM at any time.

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

// Generate 150 items programmatically
function generateData(count: number): object[] {
  const names      = ['John', 'Alice', 'Bob', 'Mario Pontes', 'Yang Wang', 'Michael', 'Nancy', 'Robert King'];
  const hours      = [8, 12, 16];
  const status     = ['Pending', 'Completed', 'In Progress'];
  const designation = ['Engineer', 'Manager', 'Tester'];
  const result: object[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      TaskID:      i + 1,
      Engineer:    names[Math.floor(Math.random() * names.length)],
      Designation: designation[Math.floor(Math.random() * designation.length)],
      Estimation:  hours[Math.floor(Math.random() * hours.length)],
      Status:      status[Math.floor(Math.random() * status.length)]
    });
  }
  return result;
}

const fields: object = { text: 'Engineer', value: 'TaskID' };

const columns: ColumnModel[] = [
  { field: 'TaskID',      header: 'Employee ID', width: 100 },
  { field: 'Engineer',    header: 'Name',        width: 140 },
  { field: 'Designation', header: 'Designation', width: 130 },
  { field: 'Estimation',  header: 'Estimation',  width: 120 },
  { field: 'Status',      header: 'Status',      width: 120 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: generateData(150),
  fields: fields,
  placeholder: 'Select an engineer',
  popupHeight: 230,
  gridSettings: { rowHeight: 40 },
  enableVirtualization: true,
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Virtualization with Remote Data

When using `DataManager` with virtualization, the component initially fetches all data from the server, then performs virtual scrolling against the locally-stored result.

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataSource: DataManager = new DataManager({
  url: 'url',                       // Replace with your trusted API endpoint
  adaptor: new WebApiAdaptor(),
  crossDomain: true                 // Enable only when the API origin differs from your app
});

const fields: object = { text: 'ShipCountry', value: 'CustomerID' };

const columns: ColumnModel[] = [
  { field: 'OrderID',     header: 'OrderID',     width: 120 },
  { field: 'CustomerID',  header: 'CustomerID',  width: 130 },
  { field: 'ShipCountry', header: 'ShipCountry', width: 120 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  id: 'multicolumn',
  dataSource: dataSource,
  fields: fields,
  popupHeight: '230px',
  placeholder: 'Select a country',
  gridSettings: { rowHeight: 40 },
  enableVirtualization: true,
  columns: columns
});

mccBox.appendTo('#multicolumn');
```

---

## Best Practices for Virtualization

- Set `gridSettings: { rowHeight: N }` to a fixed value — virtualization relies on consistent row heights for accurate position calculations.
- Set an explicit `popupHeight` — the component needs a defined viewport for virtual rendering.
- Combine with `popupHeight` to keep the popup at a manageable size (e.g., `230px` or `300px`).
- Virtualization is most beneficial for datasets with 100+ items.

---

## Key Property

| Property | Type | Default | Description |
|---|---|---|---|
| `enableVirtualization` | `boolean` | `false` | Enables virtual scrolling in the popup list |
