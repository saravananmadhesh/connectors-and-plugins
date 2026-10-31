# Data Binding — Syncfusion TypeScript DropDownList

## Table of Contents
- [Fields Property](#fields-property)
- [Array of Strings](#array-of-strings)
- [Array of JSON Objects](#array-of-json-objects)
- [Complex Nested Data](#complex-nested-data)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Primitive vs Object Value Binding](#primitive-vs-object-value-binding)

---

## Fields Property

The `fields` property maps data columns to DropDownList roles. All sub-fields are optional:

| Field | Type | Description |
|---|---|---|
| `text` | string | Column to display as list item label |
| `value` | string | Column used as the hidden unique identifier |
| `groupBy` | string | Column used to group items into categories |
| `iconCss` | string | CSS class column to render icons per item |
| `disabled` | string | Boolean column to disable specific items |

```ts
fields: { text: 'Game', value: 'Id', groupBy: 'Category', iconCss: 'Icon', disabled: 'State' }
```

> When binding complex data, always map `fields` correctly — otherwise the selected item will be `undefined`.

---

## Array of Strings

Simplest form: both text and value are the same string.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sportsData: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Array of JSON Objects

Bind complex JSON data and map columns to `text` and `value`:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sportsData: { [key: string]: Object }[] = [
    { Id: 'game1', Game: 'Badminton' },
    { Id: 'game2', Game: 'Football' },
    { Id: 'game3', Game: 'Tennis' }
];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Complex Nested Data

Use dot-notation to map nested object properties in `fields`:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let countriesData: { [key: string]: Object }[] = [
    { Country: { Name: 'Australia' }, Code: { Id: 'AU' } },
    { Country: { Name: 'Bermuda' },   Code: { Id: 'BM' } },
    { Country: { Name: 'Canada' },    Code: { Id: 'CA' } },
    { Country: { Name: 'Denmark' },   Code: { Id: 'DK' } },
    { Country: { Name: 'France' },    Code: { Id: 'FR' } }
];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: countriesData,
    fields: { text: 'Country.Name', value: 'Code.Id' },
    placeholder: 'Select a country'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Remote Data with DataManager

Use `DataManager` to fetch data from remote OData services. The `query` property controls what is fetched.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let customers: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer',
    sortOrder: 'Ascending'
});
customers.appendTo('#ddlelement');
```

### Getting Item Count After Remote Load

Use the `actionComplete` event to access fetched results:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: new DataManager({ /* ... */ }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer',
    actionComplete: (e: any) => {
        console.log('Total items:', e.result.length);
    }
});
```

After render, use `getItems()` method to count rendered DOM elements:

```ts
console.log('Items in DOM:', ddl.getItems().length);
```

### Modifying Remote Data Before Binding

Use `actionComplete` to modify the result array before it's displayed:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: new DataManager({ /* ... */ }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer',
    actionComplete: (e: any) => {
        // Remove first two items
        e.result.splice(0, 2);
    }
});
```

---

## Primitive vs Object Value Binding

### Primitive Value Binding

For simple string/number data sources, set `value` to a primitive:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let records: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

let dropObject: DropDownList = new DropDownList({
    dataSource: records,
    placeholder: 'Select an item',
    value: 'Item 5',
    popupHeight: '200px'
});
dropObject.appendTo('#ddlelement');
```

### Object Value Binding

Enable `allowObjectBinding` to set/get the selected value as a full data object:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let records: { [key: string]: Object }[] = [];
for (let i: number = 1; i <= 150; i++) {
    records.push({ id: 'id' + i, text: 'Item ' + i });
}

let dropObject: DropDownList = new DropDownList({
    dataSource: records,
    fields: { value: 'id', text: 'text' },
    allowObjectBinding: true,
    placeholder: 'Select an item',
    value: { id: 'id5', text: 'Item 5' },  // object as initial value
    popupHeight: '200px'
});
dropObject.appendTo('#ddlelement');
```

> When `allowObjectBinding` is `true`, the `value` property holds the entire matched object, not just the value field.
