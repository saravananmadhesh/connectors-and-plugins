# Filtering — Syncfusion TypeScript DropDownList

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filtering Event and updateData](#filtering-event-and-updatedata)
- [Filter Types](#filter-types)
- [Minimum Character Limit](#minimum-character-limit)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Diacritics Filtering](#diacritics-filtering)
- [Debounce Delay](#debounce-delay)
- [Highlight Matched Characters](#highlight-matched-characters)
- [Limit Search Result Count](#limit-search-result-count)

---

## Enable Filtering

Set `allowFiltering: true` to show a search box above the popup list. Filtering starts as soon as the user types in the search box.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Alaska', 'California', 'Florida', 'Georgia'],
    allowFiltering: true,
    placeholder: 'Select a state'
});
dropDownListObject.appendTo('#ddlelement');
```

Use `filterBarPlaceholder` to add placeholder text to the search box:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: data,
    allowFiltering: true,
    filterBarPlaceholder: 'Search...',
    placeholder: 'Select a value'
});
```

---

## Filtering Event and updateData

When using remote data or custom logic, handle the `filtering` event and call `e.updateData()` with the filtered data source and query.

```ts
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

let searchData: { [key: string]: Object }[] = [
    { Index: 's1', Country: 'Alaska' },
    { Index: 's2', Country: 'California' },
    { Index: 's3', Country: 'Florida' },
    { Index: 's4', Country: 'Georgia' }
];

let filter: DropDownList = new DropDownList({
    dataSource: searchData,
    fields: { text: 'Country', value: 'Index' },
    allowFiltering: true,
    placeholder: 'Select a country',
    filtering: (e: FilteringEventArgs) => {
        let query = new Query();
        query = e.text !== '' ? query.where('Country', 'startswith', e.text, true) : query;
        e.updateData(searchData, query);
    }
});
filter.appendTo('#ddlelement');
```

---

## Filter Types

Change the match behavior within the `filtering` event handler by passing a different operator to `query.where()`.

| Operator | Matches |
|---|---|
| `'startswith'` | Items beginning with typed text (default) |
| `'endswith'` | Items ending with typed text |
| `'contains'` | Items containing typed text anywhere |

### EndsWith Example

```ts
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
});

let filter: DropDownList = new DropDownList({
    dataSource: searchData,
    query: new Query().select(['ContactName', 'CustomerID']).take(7),
    fields: { text: 'ContactName', value: 'CustomerID' },
    allowFiltering: true,
    popupHeight: '250px',
    sortOrder: 'Ascending',
    placeholder: 'Select a name',
    filtering: (e: FilteringEventArgs) => {
        if (e.text === '') {
            e.updateData(searchData);
        } else {
            let query = new Query().select(['ContactName', 'CustomerID']);
            query = query.where('ContactName', 'endswith', e.text, true);
            e.updateData(searchData, query);
        }
    }
});
filter.appendTo('#ddlelement');
```

---

## Minimum Character Limit

Prevent remote requests until a minimum number of characters is typed. Check `e.text.length` inside the `filtering` event:

```ts
filtering: (e: FilteringEventArgs) => {
    if (e.text === '') {
        e.updateData(searchData);
    } else {
        // Require at least 3 characters before fetching
        if (e.text.length < 3) { return; }
        let query = new Query().select(['ContactName', 'CustomerID']);
        query = query.where('ContactName', 'startswith', e.text, true);
        e.updateData(searchData, query);
    }
}
```

---

## Case-Sensitive Filtering

The fourth parameter of `query.where()` controls case sensitivity. Pass `false` to enable case-sensitive matching (default is `true` = case-insensitive):

```ts
filtering: (e: FilteringEventArgs) => {
    if (e.text === '') {
        e.updateData(searchData);
    } else {
        let query = new Query().select(['ContactName', 'CustomerID']);
        // false = case-sensitive
        query = query.where('ContactName', 'startswith', e.text, false);
        e.updateData(searchData, query);
    }
}
```

---

## Diacritics Filtering

Set `ignoreAccent: true` to ignore diacritic characters (accents) during filtering, making international character sets easier to search:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let data: string[] = [
    'Aeróbics', 'Aeróbics en Agua', 'Aerografía', 'Aeromodelaje',
    'Águilas', 'Ajedrez', 'Ala Delta', 'Álbumes de Música'
];

let ddlObj: DropDownList = new DropDownList({
    dataSource: data,
    placeholder: 'Select a value',
    ignoreAccent: true,
    allowFiltering: true,
    filterBarPlaceholder: 'e.g: aero'
});
ddlObj.appendTo('#ddlelement');
```

With `ignoreAccent: true`, typing "aero" matches "Aeróbics", "Aerografía", etc.

---

## Debounce Delay

Use `debounceDelay` to set a delay (in milliseconds) between keystrokes and the filter operation. This reduces unnecessary filtering calls and improves performance. Default is `300`ms. Set to `0` to disable debouncing.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    debounceDelay: 500,    // wait 500ms after last keystroke
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Highlight Matched Characters

Use the `highlightSearch` function (imported from `@syncfusion/ej2-dropdowns`) inside the `fields.itemCreated` callback to visually highlight matched characters in the list:

```ts
import { DropDownList, FilteringEventArgs, highlightSearch } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
});
let text: string;

let filter: DropDownList = new DropDownList({
    dataSource: searchData,
    query: new Query().select(['ContactName', 'CustomerID']).take(7),
    fields: {
        text: 'ContactName',
        value: 'CustomerID',
        itemCreated: (e: { [key: string]: Object }) => {
            highlightSearch(e.item as HTMLElement, text, true, 'StartsWith');
        }
    },
    allowFiltering: true,
    placeholder: 'Select a name',
    filtering: (e: FilteringEventArgs) => {
        text = e.text;
        let query = new Query().select(['ContactName', 'CustomerID']);
        query = e.text !== '' ? query.where('ContactName', 'startswith', e.text, true) : query;
        e.updateData(searchData, query);
    }
});
filter.appendTo('#ddlelement');
```

---

## Limit Search Result Count

Restrict the number of results returned by adjusting the `.take()` count in your filter query:

```ts
filtering: (e: FilteringEventArgs) => {
    // Limit results to 4 items
    let query = new Query().select(['ContactName', 'CustomerID']).take(4);
    query = e.text !== '' ? query.where('ContactName', 'startswith', e.text, true) : query;
    e.updateData(searchData, query);
}
```
