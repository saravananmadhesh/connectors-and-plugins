# Filtering — Syncfusion TypeScript Mention

## Table of Contents
- [Filter Types](#filter-types)
- [Minimum Length](#minimum-length)
- [Case and Accent Sensitivity](#case-and-accent-sensitivity)
- [Debounce Delay](#debounce-delay)
- [Custom Filtering with the filtering Event](#custom-filtering-with-the-filtering-event)
- [Remote Data Filtering](#remote-data-filtering)
- [Suggestion Count Limit](#suggestion-count-limit)

---

## Filter Types

The `filterType` property controls how typed characters are matched against the data source. The default is `'Contains'`.

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const sports: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Hockey', 'Tennis'];

// Contains (default) — "ball" matches "Basketball" and "Football"
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: sports,
  filterType: 'Contains'
});
mentionObj.appendTo('#mention-element');
```

```typescript
// StartsWith — "ba" matches "Badminton" and "Basketball" only
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: sports,
  filterType: 'StartsWith'
});
mentionObj.appendTo('#mention-element');
```

```typescript
// EndsWith — "ton" matches "Badminton" only
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: sports,
  filterType: 'EndsWith'
});
mentionObj.appendTo('#mention-element');
```

| `filterType` | Behavior |
|---|---|
| `'Contains'` (default) | Match if the item text contains the typed string |
| `'StartsWith'` | Match if the item text starts with the typed string |
| `'EndsWith'` | Match if the item text ends with the typed string |

---

## Minimum Length

`minLength` sets the number of characters the user must type after the trigger character before the popup appears. The default is `0` (popup opens immediately on `@`).

```typescript
// Popup only opens after typing @ab (2 characters after @)
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  minLength: 2
});
mentionObj.appendTo('#mention-element');
```

Use this to avoid unnecessary popup triggers in large datasets where an empty query would return too many results.

---

## Case and Accent Sensitivity

### ignoreCase

Set `ignoreCase: false` to make filtering case-sensitive:

```typescript
// "@Alice" matches "Alice" but "@alice" does not
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Alice', 'Bob', 'alice', 'bob'],
  ignoreCase: false
});
mentionObj.appendTo('#mention-element');
```

Default is `true` — filtering is case-insensitive.

### ignoreAccent

Set `ignoreAccent: true` to treat accented characters as their base equivalents (e.g. `é` = `e`):

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Müller', 'García', 'Dupont', 'Rossi'],
  ignoreAccent: true    // typing "Muller" matches "Müller"
});
mentionObj.appendTo('#mention-element');
```

---

## Debounce Delay

`debounceDelay` (default `300` ms) controls how long the component waits after a keystroke before running a filter operation. Increase this for remote data sources to reduce network requests:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteDataManager,
  fields: { text: 'name', value: 'id' },
  debounceDelay: 500   // wait 500 ms after each keystroke before querying
});
mentionObj.appendTo('#mention-element');
```

Set to `0` to filter immediately on every keystroke (suitable for small local datasets).

---

## Custom Filtering with the filtering Event

The `filtering` event fires on every keystroke. Use `e.updateData()` to supply a custom-filtered data source, overriding the component's built-in filtering:

```typescript
import { Mention, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const employees: { [key: string]: Object }[] = [
  { name: 'Alice Johnson', id: '1', dept: 'Engineering' },
  { name: 'Bob Smith',     id: '2', dept: 'Design'      },
  { name: 'Carol White',   id: '3', dept: 'Engineering' }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  filtering: (e: FilteringEventArgs) => {
    // Only show Engineering dept members whose name starts with the typed text
    const query: Query = new Query()
      .where('dept', 'equal', 'Engineering')
      .where('name', 'startswith', e.text, true);
    e.updateData(employees, query);
  }
});
mentionObj.appendTo('#mention-element');
```

**`FilteringEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The text typed by the user (after the trigger character) |
| `updateData` | `function` | Call this with `(dataSource, query?, fields?)` to override the suggestion list |
| `cancel` | `boolean` | Set `true` to cancel default filtering behavior |
| `preventDefaultAction` | `boolean` | Set `true` to prevent the default filter action |

To defer filtering with a custom async operation, call `e.updateData()` inside a callback:

```typescript
filtering: (e: FilteringEventArgs) => {
  setTimeout(() => {
    const filtered = employees.filter(emp =>
      (emp['name'] as string).toLowerCase().includes(e.text.toLowerCase())
    );
    e.updateData(filtered);
  }, 100);
}
```

---

## Remote Data Filtering

When using a `DataManager` remote source, the `filtering` event lets you adjust the query sent to the server:

```typescript
import { Mention, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  filtering: (e: FilteringEventArgs) => {
    // Dynamically adjust query based on typed text
    const query: Query = new Query()
      .select(['ContactName', 'CustomerID'])
      .where('ContactName', 'startswith', e.text, true)
      .take(8);
    e.updateData(remoteData, query);
  }
});
mentionObj.appendTo('#mention-element');
```

---

## Suggestion Count Limit

`suggestionCount` caps the number of items shown in the popup (default `25`):

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: largeDataArray,
  fields: { text: 'name', value: 'id' },
  suggestionCount: 10    // show at most 10 items
});
mentionObj.appendTo('#mention-element');
```

This limit is applied after filtering, so typing more characters further narrows the list below `suggestionCount`.
