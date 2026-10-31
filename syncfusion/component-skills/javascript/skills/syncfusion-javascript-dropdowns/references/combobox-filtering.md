# Filtering — Syncfusion TypeScript ComboBox

## Table of Contents
- [Enabling Filtering](#enabling-filtering)
- [filtering Event and FilteringEventArgs](#filtering-event-and-filteringeventargs)
- [filter() Method](#filter-method)
- [Local Data Filtering](#local-data-filtering)
- [Remote Data Filtering](#remote-data-filtering)
- [isDeviceFullScreen](#isdevicefullscreen)
- [No-Match Handling](#no-match-handling)
- [Filtering vs autofill](#filtering-vs-autofill)

---

## Enabling Filtering

Set `allowFiltering: true` to allow the user to type in the input and filter the dropdown list in real time. Unlike AutoComplete, the ComboBox shows the full list when the popup opens — filtering narrows it as the user types.

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const countryData: string[] = ['Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Denmark'];

const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  allowFiltering: true,
  placeholder: 'Search a country'
});
comboBox.appendTo('#combo-element');
```

With `allowFiltering: true` and a local data source, the ComboBox performs a default `StartsWith` filter automatically.

---

## filtering Event and FilteringEventArgs

The `filtering` event fires on every keystroke when `allowFiltering` is `true`. Use it to implement custom filter logic or to issue remote queries.

**`FilteringEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The current text typed in the input |
| `updateData` | `Function` | Call with `(dataSource, query?, fields?)` to update the popup list |
| `cancel` | `boolean` | Set to `true` to cancel the filtering operation |

```typescript
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

const countryData: { [key: string]: Object }[] = [
  { name: 'Australia', code: 'AU' },
  { name: 'Austria',   code: 'AT' },
  { name: 'Belgium',   code: 'BE' },
  { name: 'Brazil',    code: 'BR' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  fields: { text: 'name', value: 'code' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    let query: Query = new Query();
    // Filter: items where 'name' starts with the typed text
    query = (args.text !== '') ? query.where('name', 'startswith', args.text, true) : query;
    args.updateData(countryData, query);
  },
  placeholder: 'Search a country'
});
comboBox.appendTo('#combo-element');
```

---

## filter() Method

Call `filter()` programmatically to apply a data source and query without waiting for user input:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  fields: { text: 'name', value: 'code' },
  allowFiltering: true
});
comboBox.appendTo('#combo-element');

// Programmatically filter to only show items starting with 'A'
const query: Query = new Query().where('name', 'startswith', 'A', true);
comboBox.filter(countryData, query, { text: 'name', value: 'code' });
```

**Signature:**
```typescript
filter(
  dataSource: Object[] | DataManager | string[] | number[] | boolean[],
  query?: Query,
  fields?: FieldSettingsModel
): void
```

---

## Local Data Filtering

For local data arrays, use the `filtering` event with a `Query` to apply custom filter conditions:

```typescript
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  fields: { text: 'name', value: 'code' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    const query: Query = new Query();
    if (args.text !== '') {
      // Case-insensitive 'contains' match
      query.where('name', 'contains', args.text, true);
    }
    args.updateData(countryData, query);
  }
});
comboBox.appendTo('#combo-element');
```

Common filter operators: `'startswith'`, `'endswith'`, `'contains'`, `'equal'`.

---

## Remote Data Filtering

For remote `DataManager` data, issue a new query in the `filtering` event each time the user types:

```typescript
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const comboBox: ComboBox = new ComboBox({
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    let query: Query = new Query().select(['ContactName', 'CustomerID']).take(10);
    if (args.text !== '') {
      query = query.where('ContactName', 'startswith', args.text, true);
    }
    args.updateData(remoteData, query);
  },
  placeholder: 'Search customers'
});
comboBox.appendTo('#combo-element');
```

Each keystroke triggers a new server request with the updated query.

---

## isDeviceFullScreen

Controls whether the popup opens in fullscreen mode on mobile devices when filtering is enabled:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  allowFiltering: true,
  isDeviceFullScreen: true,   // default: true — fullscreen popup on mobile
  placeholder: 'Search a country'
});
comboBox.appendTo('#combo-element');
```

Set `isDeviceFullScreen: false` to display the popup the same way on both mobile and desktop devices.

---

## No-Match Handling

When `allowFiltering` is `true` and no items match the typed text, the popup shows a "No records found" message by default. Customize it with `noRecordsTemplate` (inherited from DropDownBase):

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: countryData,
  fields: { text: 'name', value: 'code' },
  allowFiltering: true,
  noRecordsTemplate: '<span class="norecord">No matching country found</span>'
});
comboBox.appendTo('#combo-element');
```

If `allowCustom: true` (default), the user can still submit their typed text as a custom value even when no match is found.

---

## Filtering vs autofill

These two features are complementary but work differently:

| Feature | Behavior |
|---|---|
| `allowFiltering: true` | Opens popup, filters list items as user types |
| `autofill: true` | Suggests and auto-selects the first match inline in the input |

They can be used together:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowFiltering: true,
  autofill: true,            // inline suggestion + filtered popup list
  placeholder: 'Start typing...'
});
comboBox.appendTo('#combo-element');
```

When both are enabled, the popup filters AND the input autofills with the first match.
