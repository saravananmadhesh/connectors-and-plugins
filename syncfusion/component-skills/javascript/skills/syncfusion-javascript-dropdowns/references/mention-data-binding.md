# Data Binding — Syncfusion TypeScript Mention

## Table of Contents
- [Local String Arrays](#local-string-arrays)
- [Local Object Arrays with Fields Mapping](#local-object-arrays-with-fields-mapping)
- [Fields Mapping Reference](#fields-mapping-reference)
- [Grouping Items](#grouping-items)
- [Icons in Suggestion Items](#icons-in-suggestion-items)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Query Property](#query-property)
- [Sort Order](#sort-order)
- [Action Events](#action-events)
- [Error Handling with actionFailureTemplate](#error-handling-with-actionfailuretemplate)

---

## Local String Arrays

The simplest data source is a plain string array. The array values are used as both the display text and the inserted value.

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const languages: string[] = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java'];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: languages
});
mentionObj.appendTo('#mention-element');
```

Number and boolean arrays are also accepted:

```typescript
// Number array
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [1, 2, 3, 4, 5]
});
mentionObj.appendTo('#mention-element');
```

---

## Local Object Arrays with Fields Mapping

When your data is an array of objects, use `fields` to tell the component which properties to use for display text and value.

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { id: 'emp1', name: 'Alice Johnson',  role: 'Engineering' },
  { id: 'emp2', name: 'Bob Smith',      role: 'Design'      },
  { id: 'emp3', name: 'Carol White',    role: 'Engineering' },
  { id: 'emp4', name: 'David Brown',    role: 'Product'     }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: {
    text: 'name',   // property shown in popup and inserted as chip text
    value: 'id'     // property used as the underlying value
  }
});
mentionObj.appendTo('#mention-element');
```

---

## Fields Mapping Reference

| Field | Purpose | Default |
|---|---|---|
| `text` | Property name for the display label in the popup and chip | `null` |
| `value` | Property name for the underlying value | `null` |
| `iconCss` | Property name for CSS class(es) to render an icon beside the item | `null` |
| `groupBy` | Property name to group items under section headers | `null` |

When `text` is `null` and `value` is `null`, the component uses the raw item value (works for primitive arrays).

---

## Grouping Items

Set `fields.groupBy` to a property name to render group headers in the popup:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: {
    text: 'name',
    value: 'id',
    groupBy: 'role'    // items grouped under "Engineering", "Design", "Product"
  }
});
mentionObj.appendTo('#mention-element');
```

Customize the group header appearance with `groupTemplate`:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'role' },
  groupTemplate: '<strong class="group-title">${role}</strong>'
});
mentionObj.appendTo('#mention-element');
```

---

## Icons in Suggestion Items

Set `fields.iconCss` to a property that holds a CSS class string. The class is applied to an `<span>` rendered before the item text:

```typescript
const contacts: { [key: string]: Object }[] = [
  { name: 'Alice', id: '1', icon: 'e-icons e-user'   },
  { name: 'Team',  id: '2', icon: 'e-icons e-group'  }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: contacts,
  fields: { text: 'name', value: 'id', iconCss: 'icon' }
});
mentionObj.appendTo('#mention-element');
```

---

## Remote Data with DataManager

Pass a `DataManager` instance as `dataSource` to load data from a remote API:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const remoteData: DataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'ContactName', value: 'CustomerID' }
});
mentionObj.appendTo('#mention-element');
```

**Common adaptors:**

| Adaptor | Use case |
|---|---|
| `ODataV4Adaptor` | OData v4 endpoints |
| `WebApiAdaptor` | ASP.NET Web API / REST JSON |
| `UrlAdaptor` | Custom server-side data processing |
| `JsonAdaptor` | In-memory JSON (local, but via DataManager) |

---

## Query Property

Use `query` to filter, select, or sort the data before it reaches the component. Works with both local `DataManager` and remote sources:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  // Fetch only 10 records, selecting specific columns
  query: new Query().select(['ContactName', 'CustomerID']).take(10)
});
mentionObj.appendTo('#mention-element');
```

---

## Sort Order

Control how the suggestion list is sorted via `sortOrder`:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['David', 'Alice', 'Carol', 'Bob', 'Eve'],
  sortOrder: 'Ascending'    // 'None' | 'Ascending' | 'Descending'
});
mentionObj.appendTo('#mention-element');
```

| Value | Behavior |
|---|---|
| `'None'` (default) | Items displayed in data source order |
| `'Ascending'` | Items sorted A→Z |
| `'Descending'` | Items sorted Z→A |

---

## Action Events

When using remote `DataManager` data, use these events to track fetch lifecycle:

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  }),
  fields: { text: 'name', value: 'id' },
  actionBegin: () => {
    console.log('Fetching data from server...');
  },
  actionComplete: () => {
    console.log('Data loaded successfully.');
  },
  actionFailure: (e: Object) => {
    console.error('Data fetch failed:', e);
  }
});
mentionObj.appendTo('#mention-element');
```

---

## Error Handling with actionFailureTemplate

Customize the popup message shown when a remote data fetch fails:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: new DataManager({ url: 'url', adaptor: new WebApiAdaptor() }),
  fields: { text: 'name', value: 'id' },
  actionFailureTemplate: '<div class="error-msg">⚠ Could not load suggestions. Try again.</div>'
});
mentionObj.appendTo('#mention-element');
```

The default value is `'Request failed'`. The template accepts HTML strings.
