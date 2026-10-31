# Features and Configuration — Syncfusion TypeScript DropDownList

## Table of Contents
- [Disabled Items](#disabled-items)
- [Dynamic Disable with disableItem Method](#dynamic-disable-with-disableitem-method)
- [Enable/Disable the Entire Component](#enabledisable-the-entire-component)
- [Clear Selection](#clear-selection)
- [Popup Resize](#popup-resize)
- [Virtual Scrolling](#virtual-scrolling)
- [Incremental Search](#incremental-search)
- [Float Label](#float-label)
- [Read-Only Mode](#read-only-mode)
- [Sort Order](#sort-order)
- [Icon Support](#icon-support)
- [HTML Attributes and CSS Class](#html-attributes-and-css-class)
- [Localization](#localization)

---

## Disabled Items

Map a boolean column to `fields.disabled` to disable specific items. Disabled items are visible but not selectable. If the current selection becomes disabled, it is cleared.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let statusData: { [key: string]: Object }[] = [
    { Status: 'Open',               State: false },
    { Status: 'Waiting for Customer', State: false },
    { Status: 'On Hold',            State: true },  // disabled
    { Status: 'Follow-up',          State: false },
    { Status: 'Closed',             State: true },  // disabled
    { Status: 'Solved',             State: false }
];

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: statusData,
    fields: { value: 'Status', disabled: 'State' },
    placeholder: 'Select Status'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Dynamic Disable with disableItem Method

Use `disableItem()` to disable a specific item at runtime by value, index, or HTML `<li>` element:

```ts
// Disable by value
dropDownListObject.disableItem('On Hold');

// Disable by index
dropDownListObject.disableItem(null, null, 2);

// Disable by HTMLLIElement
const liElement = document.querySelector('.e-list-item') as HTMLLIElement;
dropDownListObject.disableItem(liElement);
```

To disable multiple items, iterate:

```ts
['On Hold', 'Closed'].forEach(val => dropDownListObject.disableItem(val));
```

> The `dataSource` is updated when an item is disabled using this method.

---

## Enable/Disable the Entire Component

Set `enabled: false` to prevent all user interactions with the component:

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    enabled: false,
    placeholder: 'Select a game'
});
```

Toggle at runtime:

```ts
dropDownListObject.enabled = false;
dropDownListObject.dataBind();
```

---

## Clear Selection

### Via UI (Clear Button)

Set `showClearButton: true` to display a clear (×) icon in the input. Clicking it resets `value`, `text`, and `index` to `null`.

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game',
    showClearButton: true
});
```

### Programmatically

Set `value`, `text`, or `index` to `null`, or call the `clear()` method:

```ts
// Set null to clear
dropDownListObject.value = null;

// Or use clear() method
dropDownListObject.clear();
```

---

## Popup Resize

Set `allowResize: true` to let users resize the popup via a drag handle in the bottom-right corner. Resized dimensions are retained across sessions.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: statusData,
    fields: { value: 'Status' },
    placeholder: 'Select Status',
    allowResize: true
});
dropDownListObject.appendTo('#ddlelement');
```

Related events: `resizeStart`, `resizing`, `resizeStop`.

---

## Virtual Scrolling

Use `enableVirtualization: true` for large datasets. Only a fixed number of DOM elements are rendered at any time; items are recycled as the user scrolls. Requires injecting the `VirtualScroll` module.

```ts
import { DropDownList, VirtualScroll } from '@syncfusion/ej2-dropdowns';

DropDownList.Inject(VirtualScroll);

let records: { [key: string]: Object }[] = [];
for (let i: number = 1; i <= 150; i++) {
    records.push({ id: 'id' + i, text: 'Item ' + i });
}

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: records,
    fields: { value: 'id', text: 'text' },
    placeholder: 'Select an item',
    enableVirtualization: true,
    allowFiltering: false,
    popupHeight: '200px'
});
dropDownListObject.appendTo('#ddlelement');
```

### Virtual Scroll Keyboard Navigation

| Key | Action |
|---|---|
| `ArrowDown` | Loads the next virtual item; holds to load more |
| `ArrowUp` | Loads the previous virtual item |
| `PageDown` | Loads the next page and selects the last item |
| `PageUp` | Loads the previous page and selects the first item |
| `Home` | Loads the initial set and selects the first item |
| `End` | Loads the last set and selects the last item |

### Virtualization Limitations

- **Not compatible with grouping** (`fields.groupBy`)
- Selected value may not be in the current viewport
- Once filtered and popup is closed, it reopens with the initial set
- Keyboard actions do not work while the popup is closed

---

## Incremental Search

The DropDownList supports incremental search by default (no configuration needed). When the popup is closed, typing characters focuses the item that matches the typed text sequentially. Pressing the same key again advances to the next matching item.

---

## Float Label

Use `floatLabelType` to control the floating label behavior:

- `'Never'` — Label never floats (default)
- `'Always'` — Label always floats above the input
- `'Auto'` — Label floats when the input is focused or has a value

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game',
    floatLabelType: 'Auto'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## Read-Only Mode

Set `readonly: true` to prevent user interaction while displaying the current value:

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    value: 'game1',
    readonly: true,
    placeholder: 'Select a game'
});
```

---

## Sort Order

Control the sort order of list items using `sortOrder`:

| Value | Behavior |
|---|---|
| `'None'` (default) | Items appear in data source order |
| `'Ascending'` | Items sorted A → Z |
| `'Descending'` | Items sorted Z → A |

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    sortOrder: 'Ascending',
    placeholder: 'Select a game'
});
```

---

## Icon Support

Map the `iconCss` field to a CSS class column to render icons alongside list items. The mapped class is applied to a `<span>` element inside each list item.

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sortFormatData: { [key: string]: Object }[] = [
    { Class: 'asc-sort',  Type: 'Sort A to Z', Id: '1' },
    { Class: 'dsc-sort',  Type: 'Sort Z to A', Id: '2' },
    { Class: 'filter',    Type: 'Filter',      Id: '3' },
    { Class: 'clear',     Type: 'Clear',       Id: '4' }
];

let sortFormat: DropDownList = new DropDownList({
    dataSource: sortFormatData,
    fields: { text: 'Type', iconCss: 'Class', value: 'Id' },
    placeholder: 'Select a format'
});
sortFormat.appendTo('#ddlelement');
```

---

## HTML Attributes and CSS Class

Use `htmlAttributes` to add extra HTML attributes to the input element:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: countries,
    fields: { text: 'Name' },
    htmlAttributes: { name: 'country', title: 'Country Picker' }
});
```

Use `cssClass` to add custom CSS classes to the root element:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    cssClass: 'custom-ddl-style',
    placeholder: 'Select a game'
});
```

---

## Localization

Use `L10n` to translate the `noRecordsTemplate` and `actionFailureTemplate` text:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { L10n } from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

L10n.load({
    'fr-BE': {
        'dropdowns': {
            'noRecordsTemplate': 'Aucun enregistrement trouvé',
            'actionFailureTemplate': "Modèle d'échec d'action"
        }
    }
});

let ddl: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    }),
    locale: 'fr-BE',
    fields: { text: 'ContactName', value: 'CustomerID' },
    query: new Query().select(['ContactName', 'CustomerID']).take(0),
    placeholder: 'Sélectionnez un élément'
});
ddl.appendTo('#ddlelement');
```

Supported locale keys: `noRecordsTemplate`, `actionFailureTemplate`
