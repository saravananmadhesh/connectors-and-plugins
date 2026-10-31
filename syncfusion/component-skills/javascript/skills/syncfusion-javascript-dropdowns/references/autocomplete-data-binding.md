# Data Binding — Syncfusion TypeScript AutoComplete

## Table of Contents
- [Local String Arrays](#local-string-arrays)
- [Local Number and Boolean Arrays](#local-number-and-boolean-arrays)
- [Local Object Arrays](#local-object-arrays)
- [fields Mapping](#fields-mapping)
- [Grouping with groupBy](#grouping-with-groupby)
- [Icons with iconCss](#icons-with-iconCss)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [query Property](#query-property)
- [sortOrder](#sortorder)
- [htmlAttributes](#htmlattributes)
- [Action Events](#action-events)
- [actionFailureTemplate](#actionfailuretemplate)

---

## Local String Arrays

The simplest data source is a plain string array. No `fields` mapping is needed.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const fruits: string[] = [
  'Apple', 'Avocado', 'Banana', 'Cherry',
  'Grape', 'Kiwi', 'Mango', 'Peach'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: fruits,
  placeholder: 'Search a fruit'
});
atcObj.appendTo('#atc');
```

---

## Local Number and Boolean Arrays

Primitive number and boolean arrays are also supported directly:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: [1, 2, 3, 10, 100, 200, 500],
  placeholder: 'Search a number'
});
atcObj.appendTo('#atc');
```

---

## Local Object Arrays

When using an array of objects, always pair it with a `fields` mapping so the component knows which properties to display and select.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { id: 'e1', name: 'Alice Johnson', dept: 'Engineering' },
  { id: 'e2', name: 'Bob Smith',     dept: 'Design'       },
  { id: 'e3', name: 'Carol White',   dept: 'Engineering'  },
  { id: 'e4', name: 'David Brown',   dept: 'Marketing'    },
  { id: 'e5', name: 'Eve Davis',     dept: 'Design'       }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Search employees'
});
atcObj.appendTo('#atc');
```

---

## fields Mapping

`fields` is a `FieldSettingsModel` object that maps your data object's property names to the component's roles:

| Field | Default | Description |
|---|---|---|
| `text` | `null` | Property rendered as the display text in the suggestion list and in the input after selection |
| `value` | `null` | Property used as the underlying selected value |
| `iconCss` | `null` | Property holding a CSS class string to render an icon beside each item |
| `groupBy` | `null` | Property used to group items into labeled sections |

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: [
    { empId: 101, fullName: 'Alice Johnson', team: 'Engineering', avatar: 'e-icons e-user' },
    { empId: 102, fullName: 'Bob Smith',     team: 'Design',      avatar: 'e-icons e-user' }
  ],
  fields: {
    text:    'fullName',   // shown in popup list and in input
    value:   'empId',      // stored as selected value
    iconCss: 'avatar',     // renders icon beside each item
    groupBy: 'team'        // groups items by team
  },
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

> **Note:** When `fields.text` is set, the input displays the `text` property after selection. The `value` property is stored internally and accessible via `atcObj.value`.

---

## Grouping with groupBy

Set `fields.groupBy` to a property name to render grouped section headers in the popup:

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const vehicles: { [key: string]: Object }[] = [
  { id: 1, name: 'Honda Civic',    type: 'Car'   },
  { id: 2, name: 'Ford Mustang',   type: 'Car'   },
  { id: 3, name: 'Kawasaki Ninja', type: 'Bike'  },
  { id: 4, name: 'Royal Enfield',  type: 'Bike'  },
  { id: 5, name: 'Tesla Model S',  type: 'Car'   }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: vehicles,
  fields: { text: 'name', value: 'id', groupBy: 'type' },
  placeholder: 'Search vehicles'
});
atcObj.appendTo('#atc');
```

Customize the group header HTML with `groupTemplate`:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: vehicles,
  fields: { text: 'name', value: 'id', groupBy: 'type' },
  groupTemplate: '<div class="group-header">\${type}</div>',
  placeholder: 'Search vehicles'
});
atcObj.appendTo('#atc');
```

---

## Icons with iconCss

Map a CSS class property with `fields.iconCss` to render icons in each suggestion item:

```typescript
const languages: { [key: string]: Object }[] = [
  { name: 'JavaScript', lang: 'js',  icon: 'e-icons e-code' },
  { name: 'TypeScript', lang: 'ts',  icon: 'e-icons e-code' },
  { name: 'Python',     lang: 'py',  icon: 'e-icons e-code' }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: languages,
  fields: { text: 'name', value: 'lang', iconCss: 'icon' },
  placeholder: 'Search language'
});
atcObj.appendTo('#atc');
```

---

## Remote Data with DataManager

Use `DataManager` to bind to a REST API, OData, or any server-side data source:

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  placeholder: 'Search customers',
  minLength: 2
});
atcObj.appendTo('#atc');
```

**Supported DataManager adaptors:**

| Adaptor | Use case |
|---|---|
| `UrlAdaptor` | Generic REST APIs |
| `ODataAdaptor` | OData v3 endpoints |
| `ODataV4Adaptor` | OData v4 endpoints |
| `WebApiAdaptor` | ASP.NET Web API endpoints |
| `JsonAdaptor` | Local JSON array wrapped in DataManager |

---

## query Property

Use `query` to customize the request sent to the `DataManager` — select specific fields, take a fixed number of records, or apply additional filters:

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
  // Only fetch ContactName and CustomerID columns, limit to 50 records
  query: new Query().select(['ContactName', 'CustomerID']).take(50),
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

Update `query` at runtime and call `dataBind()`:

```typescript
atcObj.query = new Query().select(['ContactName', 'CustomerID']).take(10);
atcObj.dataBind();
```

---

## sortOrder

Specifies the order in which data source items are displayed in the popup:

| Value | Description |
|---|---|
| `'None'` | Items appear in data source order (default) |
| `'Ascending'` | Items sorted A → Z |
| `'Descending'` | Items sorted Z → A |

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Banana', 'Apple', 'Cherry', 'Date'],
  sortOrder: 'Ascending',   // Apple, Banana, Cherry, Date
  placeholder: 'Search fruit'
});
atcObj.appendTo('#atc');
```

---

## htmlAttributes

Accepts extra HTML attributes (key-value pairs) to apply to the underlying `<input>` element, such as `title`, `name`, `aria-*`, or `data-*` attributes:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  htmlAttributes: {
    title: 'Start typing to search team members',
    name: 'teamMember',
    'aria-label': 'Team member search'
  },
  placeholder: 'Search team'
});
atcObj.appendTo('#atc');
```

---

## Action Events

Use these events to respond to remote data fetch lifecycle:

### actionBegin — fires before remote fetch starts
```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionBegin: () => {
    console.log('Fetching data from server...');
  }
});
atcObj.appendTo('#atc');
```

### actionComplete — fires after remote fetch succeeds
```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionComplete: (e: Object) => {
    console.log('Data loaded:', e);
  }
});
atcObj.appendTo('#atc');
```

### actionFailure — fires when remote fetch fails
```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionFailure: (e: Object) => {
    console.error('Failed to load data:', e);
  }
});
atcObj.appendTo('#atc');
```

---

## actionFailureTemplate

Specifies the HTML displayed in the popup when a remote data fetch fails. Accepts an HTML string.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  }),
  fields: { text: 'name', value: 'id' },
  actionFailureTemplate: '<div class="fetch-error">⚠ Unable to load suggestions. Please retry.</div>',
  placeholder: 'Search users'
});
atcObj.appendTo('#atc');
```
