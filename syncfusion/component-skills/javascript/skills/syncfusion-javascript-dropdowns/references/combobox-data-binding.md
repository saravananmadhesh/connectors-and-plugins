# Data Binding — Syncfusion TypeScript ComboBox

## Table of Contents
- [Local String Arrays](#local-string-arrays)
- [Local Object Arrays](#local-object-arrays)
- [Fields Mapping](#fields-mapping)
- [Grouping Items](#grouping-items)
- [htmlAttributes](#htmlattributes)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [query Property](#query-property)
- [allowObjectBinding](#allowobjectbinding)
- [Adding Items Dynamically](#adding-items-dynamically)

---

## Local String Arrays

The simplest data source is a `string[]`. The ComboBox uses each string as both display text and value:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const sportsData: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Tennis'];

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select or type a sport'
});
comboBox.appendTo('#combo-element');
```

---

## Local Object Arrays

Use an object array when items need separate display text and values:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const sportsData: { [key: string]: Object }[] = [
  { id: '1', sport: 'Badminton' },
  { id: '2', sport: 'Basketball' },
  { id: '3', sport: 'Cricket' },
  { id: '4', sport: 'Football' },
  { id: '5', sport: 'Tennis' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

After selection, `comboBox.value` returns `'3'` (the `id`) and `comboBox.text` returns `'Cricket'`.

---

## Fields Mapping

The `fields` property maps your object keys to the ComboBox's internal `text` and `value` roles:

| Field | Purpose | Default |
|---|---|---|
| `text` | Display label shown in input and dropdown | — |
| `value` | Internal value stored on selection | — |
| `groupBy` | Groups items under a category header | — |
| `disabled` | Marks an item as non-selectable | — |
| `iconCss` | CSS class for item icon | — |

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: [
    { ID: 'a1', Name: 'Badminton', Category: 'Indoor' },
    { ID: 'b1', Name: 'Cricket',   Category: 'Outdoor' }
  ],
  fields: {
    text: 'Name',
    value: 'ID',
    groupBy: 'Category'
  }
});
comboBox.appendTo('#combo-element');
```

---

## Grouping Items

Set `fields.groupBy` to a key in your data objects to group the dropdown list under category headers:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const vegData: { [key: string]: Object }[] = [
  { vegetable: 'Cabbage',  category: 'Leafy and Salad' },
  { vegetable: 'Spinach',  category: 'Leafy and Salad' },
  { vegetable: 'Carrot',   category: 'Root Vegetables' },
  { vegetable: 'Beetroot', category: 'Root Vegetables' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: vegData,
  fields: { text: 'vegetable', value: 'vegetable', groupBy: 'category' },
  placeholder: 'Select a vegetable'
});
comboBox.appendTo('#combo-element');
```

Group headers are rendered above each category in the popup list.

---

## htmlAttributes

Use `htmlAttributes` to add extra HTML attributes to the underlying `<input>` element:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  htmlAttributes: {
    title: 'Select a sport from the list',
    name: 'sportField',
    'aria-label': 'Sports ComboBox'
  },
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

Accepts any valid HTML attribute as key-value string pairs.

---

## Remote Data with DataManager

Use `DataManager` with an adaptor to load data from a remote endpoint:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  placeholder: 'Select a customer'
});
comboBox.appendTo('#combo-element');
```

The ComboBox automatically fetches data when the popup opens.

---

## query Property

Use `query` to control which records are fetched and in what order from the remote source:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  query: new Query().select(['ContactName', 'CustomerID']).take(20),
  placeholder: 'Select a customer'
});
comboBox.appendTo('#combo-element');
```

`query` applies on every data fetch. Combine `select()`, `take()`, `where()`, and `sortBy()` as needed.

---

## allowObjectBinding

When `allowObjectBinding` is `true`, `comboBox.value` returns the full selected data object rather than just the primitive value field:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const teamData: { [key: string]: Object }[] = [
  { id: 1, name: 'Engineering', lead: 'Alice' },
  { id: 2, name: 'Design',      lead: 'Bob' },
  { id: 3, name: 'Marketing',   lead: 'Carol' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: teamData,
  fields: { text: 'name', value: 'id' },
  allowObjectBinding: true,
  placeholder: 'Select a team'
});
comboBox.appendTo('#combo-element');

// After user selects 'Engineering':
// comboBox.value === { id: 1, name: 'Engineering', lead: 'Alice' }
```

Use `allowObjectBinding` when you need to pass the entire selected record to a form or service.

---

## Adding Items Dynamically

Use `addItem()` to insert new items at runtime:

```typescript
// Append a single item to the end of the list
comboBox.addItem({ sport: 'Hockey', id: '6' });

// Insert at a specific index (zero-based)
comboBox.addItem({ sport: 'Rugby', id: '7' }, 2);

// Add multiple items at once
comboBox.addItem([
  { sport: 'Volleyball', id: '8' },
  { sport: 'Swimming',   id: '9' }
]);
```

The popup list updates immediately. Items added via `addItem()` are appended to the original `dataSource`.
