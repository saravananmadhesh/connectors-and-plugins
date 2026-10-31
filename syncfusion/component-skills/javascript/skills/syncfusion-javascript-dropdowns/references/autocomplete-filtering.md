# Filtering — Syncfusion TypeScript AutoComplete

## Table of Contents
- [filterType](#filtertype)
- [minLength](#minlength)
- [ignoreCase](#ignorecase)
- [ignoreAccent](#ignoreaccent)
- [debounceDelay](#debouncedelay)
- [filtering Event](#filtering-event)
- [filter() Method](#filter-method)
- [Remote Data Filtering](#remote-data-filtering)
- [Case-Sensitive Filtering](#case-sensitive-filtering)

---

## filterType

Controls how the typed text is matched against data source items. The default is `'Contains'`.

| Value | Description | Example: typing `'an'` |
|---|---|---|
| `'StartsWith'` | Item text must begin with the typed string | Matches `'Android'` — not `'Canada'` |
| `'EndsWith'` | Item text must end with the typed string | Matches `'Japan'` — not `'Canada'` |
| `'Contains'` | Item text must contain the typed string anywhere (default) | Matches both `'Android'` and `'Canada'` |

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Australia', 'Austria', 'Canada', 'France', 'Japan', 'Rwanda'],
  filterType: 'StartsWith',
  placeholder: 'Search (StartsWith)'
});
atcObj.appendTo('#atc');
```

Change `filterType` at runtime:

```typescript
atcObj.filterType = 'EndsWith';
atcObj.dataBind();
```

---

## minLength

Specifies the minimum number of characters the user must type before the filtering action begins and the popup opens. Default is `1`.

```typescript
// Popup only opens after typing 3 characters
const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeEmployeeList,
  fields: { text: 'name', value: 'id' },
  minLength: 3,
  placeholder: 'Type 3+ chars to search'
});
atcObj.appendTo('#atc');
```

Set `minLength: 0` to show all items as soon as the user focuses the input (before typing):

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  minLength: 0   // show popup immediately on focus
});
atcObj.appendTo('#atc');
```

---

## ignoreCase

When `true` (default), filtering is case-insensitive — `'alice'` matches `'Alice'`, `'ALICE'`, etc.  
Set to `false` for case-sensitive filtering.

```typescript
// Case-sensitive: only "Alice" matches "Ali", not "aLI"
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'alice', 'ALICE', 'Bob'],
  ignoreCase: false,
  placeholder: 'Case-sensitive search'
});
atcObj.appendTo('#atc');
```

---

## ignoreAccent

When `true`, diacritic characters are normalized before filtering, so `'e'` matches `'é'`, `'ê'`, `'è'`, etc. Default is `false`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Müller', 'García', 'Dupont', 'Schröder'],
  ignoreAccent: true,   // typing "Muller" matches "Müller"
  placeholder: 'Search with accent support'
});
atcObj.appendTo('#atc');
```

---

## debounceDelay

Specifies the delay in milliseconds between the last keystroke and the filter execution. Default is `300` ms. Useful when filtering against a remote data source to reduce the number of server requests.

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  }),
  fields: { text: 'name', value: 'id' },
  debounceDelay: 500,   // wait 500 ms after last keystroke
  minLength: 2,
  placeholder: 'Search users'
});
atcObj.appendTo('#atc');
```

---

## filtering Event

The `filtering` event fires on every keystroke (after `minLength` is satisfied). Use `e.updateData()` to override the default filter with custom logic.

### Basic custom filter

```typescript
import { AutoComplete, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const sports: string[] = [
  'Badminton', 'Basketball', 'Cricket', 'Football',
  'Golf', 'Hockey', 'Rugby', 'Tennis'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  placeholder: 'Find a sport',
  filtering: (e: FilteringEventArgs) => {
    // Custom: only match items starting with typed text, case-insensitive
    const query: Query = new Query().where('', 'startswith', e.text, true);
    e.updateData(sports, query);
  }
});
atcObj.appendTo('#atc');
```

### FilteringEventArgs properties

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The current value typed in the input |
| `updateData` | `function(dataSource, query?, fields?)` | Call to supply custom filtered data; cancels the built-in filter |
| `cancel` | `boolean` | Set `true` to cancel the event entirely (no filtering occurs) |
| `preventDefaultAction` | `boolean` | Set `true` to stop the default built-in filter from running (your handler must call `updateData`) |

### Async / server-side filtering via event

```typescript
import { AutoComplete, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});

const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  placeholder: 'Search customers',
  minLength: 2,
  filtering: (e: FilteringEventArgs) => {
    // Add server-side filter: only return rows where ContactName starts with typed text
    const query: Query = new Query()
      .where('ContactName', 'startswith', e.text, true)
      .take(10);
    e.updateData(remoteData, query);
  }
});
atcObj.appendTo('#atc');
```

---

## filter() Method

Programmatically trigger filtering without waiting for user input. Useful for applying a pre-set filter on component initialization or after an external state change.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const sports: string[] = [
  'Badminton', 'Basketball', 'Cricket', 'Football', 'Hockey', 'Tennis'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  placeholder: 'Sport'
});
atcObj.appendTo('#atc');

// Programmatically filter to items containing 'ball'
const filterQuery: Query = new Query().where('', 'contains', 'ball', true);
atcObj.filter(sports, filterQuery);
```

**Signature:**
```typescript
filter(
  dataSource: { [key: string]: Object }[] | DataManager | string[] | number[] | boolean[],
  query?: Query,
  fields?: FieldSettingsModel
): void
```

---

## Remote Data Filtering

For remote data sources, filtering queries are sent to the server automatically. The component appends a `where` clause based on `filterType` and the typed text.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  query: new Query().select(['ContactName', 'CustomerID']),
  filterType: 'StartsWith',
  minLength: 2,
  debounceDelay: 400,
  placeholder: 'Search customers'
});
atcObj.appendTo('#atc');
```

**How it works:**
1. User types ≥ `minLength` characters after `debounceDelay` ms
2. A `where` clause is appended to the `query` using `filterType` and the typed text
3. `DataManager` sends the request to the server with the filter applied
4. Results populate the suggestion popup

---

## Case-Sensitive Filtering

Combine `ignoreCase: false` with `filterType` for strict matching:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Apple', 'apple', 'APPLE', 'Banana', 'Cherry'],
  ignoreCase: false,     // exact case must match
  filterType: 'StartsWith',
  placeholder: 'Case-sensitive StartsWith'
});
atcObj.appendTo('#atc');
// Typing "App" → only "Apple" matches
// Typing "app" → only "apple" matches
// Typing "APP" → only "APPLE" matches
```
