# Full API Reference — Syncfusion TypeScript Mention

> Source: https://ej2.syncfusion.com/documentation/api/mention/index-default

## Table of Contents
- [Properties](#properties)
  - [actionFailureTemplate](#actionfailuretemplate)
  - [allowSpaces](#allowspaces)
  - [cssClass](#cssclass)
  - [dataSource](#datasource)
  - [debounceDelay](#debouncedelay)
  - [displayTemplate](#displaytemplate)
  - [enablePersistence](#enablepersistence)
  - [enableRtl](#enablertl)
  - [fields](#fields)
  - [filterType](#filtertype)
  - [groupTemplate](#grouptemplate)
  - [highlight](#highlight)
  - [ignoreAccent](#ignoreaccent)
  - [ignoreCase](#ignorecase)
  - [itemTemplate](#itemtemplate)
  - [locale](#locale)
  - [mentionChar](#mentionchar)
  - [minLength](#minlength)
  - [noRecordsTemplate](#norecordstemplate)
  - [popupHeight](#popupheight)
  - [popupWidth](#popupwidth)
  - [query](#query)
  - [requireLeadingSpace](#requireleadingspace)
  - [showMentionChar](#showmentionchar)
  - [sortOrder](#sortorder)
  - [spinnerTemplate](#spinnertemplate)
  - [suffixText](#suffixtext)
  - [suggestionCount](#suggestioncount)
  - [target](#target)
  - [zIndex](#zindex)
- [Methods](#methods)
  - [addEventListener](#addeventlistener)
  - [addItem](#additem)
  - [appendTo](#appendto)
  - [dataBind](#databind)
  - [destroy](#destroy)
  - [disableItem](#disableitem)
  - [getDataByValue](#getdatabyvalue)
  - [getItems](#getitems)
  - [getRootElement](#getrootelement)
  - [hidePopup](#hidepopup)
  - [refresh](#refresh)
  - [removeEventListener](#removeeventlistener)
  - [search](#search)
  - [showPopup](#showpopup)
  - [Inject](#inject)
- [Events](#events)
  - [actionBegin](#actionbegin)
  - [actionComplete](#actioncomplete)
  - [actionFailure](#actionfailure)
  - [beforeOpen](#beforeopen)
  - [change](#change)
  - [closed](#closed)
  - [created](#created)
  - [dataBound](#databound)
  - [destroyed](#destroyed)
  - [filtering](#filtering)
  - [opened](#opened)
  - [select](#select)
- [Type Reference](#type-reference)
  - [MentionChangeEventArgs](#mentionchangeeventargs)
  - [FilterType Values](#filtertype-values)
  - [SortOrder Values](#sortorder-values)

---

## Properties

### actionFailureTemplate

**Type:** `string | Function` &nbsp;|&nbsp; **Default:** `'Request failed'`

Accepts the template and assigns it to the popup list content of the component when the data fetch request from the remote server fails.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: new DataManager({ url: 'url', adaptor: new WebApiAdaptor() }),
  fields: { text: 'name', value: 'id' },
  actionFailureTemplate: '<div class="error">⚠ Unable to load suggestions.</div>'
});
mentionObj.appendTo('#mention-element');
```

---

### allowSpaces

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

Defines whether to allow the space in the middle of a mention while searching. When disabled (`false`), typing a space ends the mention search and closes the popup.

```typescript
// "@Alice Smith" will continue filtering even after the space
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [{ name: 'Alice Smith', id: '1' }, { name: 'Bob Jones', id: '2' }],
  fields: { text: 'name', value: 'id' },
  allowSpaces: true
});
mentionObj.appendTo('#mention-element');
```

---

### cssClass

**Type:** `string` &nbsp;|&nbsp; **Default:** `null`

Defines one or more CSS class names (space-separated) to apply to the mention component root and its popup element.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  cssClass: 'custom-mention dark-theme'
});
mentionObj.appendTo('#mention-element');
```

---

### dataSource

**Type:** `{ [key: string]: Object }[] | DataManager | string[] | number[] | boolean[]` &nbsp;|&nbsp; **Default:** `[]`

Accepts the list items either through local data or a remote service and binds them to the component. Accepts an array of JSON objects, a primitive array (strings, numbers, booleans), or an instance of `DataManager`.

```typescript
// Local string array
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Alice', 'Bob', 'Carol', 'David']
});
mentionObj.appendTo('#mention-element');

// Local object array
const mentionObj2: Mention = new Mention({
  target: '#mentionTarget2',
  dataSource: [
    { name: 'Alice', id: 'alice' },
    { name: 'Bob',   id: 'bob'   }
  ],
  fields: { text: 'name', value: 'id' }
});
mentionObj2.appendTo('#mention-element2');

// Remote DataManager
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
const mentionObj3: Mention = new Mention({
  target: '#mentionTarget3',
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' }
});
mentionObj3.appendTo('#mention-element3');
```

---

### debounceDelay

**Type:** `number` &nbsp;|&nbsp; **Default:** `300`

Specifies the delay time in milliseconds for filtering operations. The component waits this long after a keystroke before executing the filter. Increase for remote data sources to reduce server requests.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  debounceDelay: 500   // wait 500 ms after each keystroke
});
mentionObj.appendTo('#mention-element');
```

---

### displayTemplate

**Type:** `string | Function` &nbsp;|&nbsp; **Default:** `null`

Specifies the template for the chip inserted into the target element after the user selects a suggestion. Supports `${fieldName}` binding syntax. Applies only to contenteditable target elements.

```typescript
const mentionObj: Mention = new Mention({
  target: '#editableDiv',
  dataSource: [{ name: 'Alice', id: 'alice', role: 'Engineer' }],
  fields: { text: 'name', value: 'id' },
  displayTemplate: '<span class="mention-chip"><b>@${name}</b> (${role})</span>'
});
mentionObj.appendTo('#mention-element');
```

---

### enablePersistence

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

Enable or disable persisting the component's state between page reloads using browser local storage.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  enablePersistence: true
});
mentionObj.appendTo('#mention-element');
```

---

### enableRtl

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

Enable or disable rendering the component in right-to-left direction. Useful for RTL languages (Arabic, Hebrew).

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  enableRtl: true
});
mentionObj.appendTo('#mention-element');
```

---

### fields

**Type:** `FieldSettingsModel` &nbsp;|&nbsp; **Default:** `{ text: null, value: null, iconCss: null, groupBy: null }`

Defines the field mappings from the data source object to the Mention component's display and value roles:

| Field | Description |
|---|---|
| `text` | Property name used as the display label in the popup and as the inserted chip text |
| `value` | Property name used as the underlying selected value |
| `iconCss` | Property name holding a CSS class string to render an icon beside the item |
| `groupBy` | Property name used to group items under section headers in the popup |

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [
    { id: 'e1', name: 'Alice', dept: 'Engineering', avatar: 'e-icons e-user' },
    { id: 'e2', name: 'Bob',   dept: 'Design',      avatar: 'e-icons e-user' }
  ],
  fields: {
    text: 'name',
    value: 'id',
    iconCss: 'avatar',
    groupBy: 'dept'
  }
});
mentionObj.appendTo('#mention-element');
```

---

### filterType

**Type:** `FilterType` &nbsp;|&nbsp; **Default:** `'Contains'`

Determines the filter strategy used when searching through the data source.

| FilterType | Description |
|---|---|
| `'StartsWith'` | Checks whether a value begins with the specified value |
| `'EndsWith'` | Checks whether a value ends with a specified value |
| `'Contains'` | Checks whether a value contains a specified value |

```typescript
// Only show items starting with the typed text
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Badminton', 'Basketball', 'Cricket', 'Football'],
  filterType: 'StartsWith'
});
mentionObj.appendTo('#mention-element');
```

---

### groupTemplate

**Type:** `string | Function` &nbsp;|&nbsp; **Default:** `null`

Accepts a template design and assigns it to the group headers present in the popup list. Requires `fields.groupBy` to be set.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [
    { name: 'Alice', id: '1', dept: 'Engineering' },
    { name: 'Bob',   id: '2', dept: 'Design'      }
  ],
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: '<div class="group-header">${dept}</div>'
});
mentionObj.appendTo('#mention-element');
```

---

### highlight

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

Specifies whether to highlight (bold) the searched characters within suggestion list items. Matched text is wrapped in a styled `<span>`.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Alice Johnson', 'Alice Cooper', 'Bob Smith'],
  highlight: true   // "@ali" bolds "Ali" in matching items
});
mentionObj.appendTo('#mention-element');
```

---

### ignoreAccent

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

When set to `true`, ignores diacritic characters (accents) when filtering, so that typing `e` matches `é`, `ê`, `è`, etc.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Müller', 'García', 'Dupont'],
  ignoreAccent: true   // typing "Muller" matches "Müller"
});
mentionObj.appendTo('#mention-element');
```

---

### ignoreCase

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `true`

Specifies whether searches are case-insensitive. When `true` (default), `"alice"` matches `"Alice"`. Set to `false` for case-sensitive filtering.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Alice', 'alice', 'ALICE'],
  ignoreCase: false   // only exact-case matches shown
});
mentionObj.appendTo('#mention-element');
```

---

### itemTemplate

**Type:** `string` &nbsp;|&nbsp; **Default:** `null`

Specifies the HTML template for each suggestion item rendered in the popup list. Supports `${fieldName}` binding syntax.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [{ name: 'Alice', id: 'alice', role: 'Engineer' }],
  fields: { text: 'name', value: 'id' },
  itemTemplate: `<div class="item-row">
    <span class="item-name">\${name}</span>
    <span class="item-role">\${role}</span>
  </div>`
});
mentionObj.appendTo('#mention-element');
```

---

### locale

**Type:** `string` &nbsp;|&nbsp; **Default:** `'en-US'`

Overrides the global culture and localization value for this component instance. Default global culture is `'en-US'`.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  locale: 'fr-FR'
});
mentionObj.appendTo('#mention-element');
```

---

### mentionChar

**Type:** `string` &nbsp;|&nbsp; **Default:** `'@'`

Specifies the symbol or single character which triggers the search action in the mention component. Must be a single character.

```typescript
// Use # as the trigger character
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['JavaScript', 'TypeScript', 'Python'],
  mentionChar: '#'
});
mentionObj.appendTo('#mention-element');
```

---

### minLength

**Type:** `number` &nbsp;|&nbsp; **Default:** `0`

Specifies the minimum number of characters the user must type after the trigger character before the suggestion list appears. The default value is `0`, where the popup opens as soon as the user inputs the mention character.

```typescript
// Popup only opens after typing @ + 2 characters
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  minLength: 2
});
mentionObj.appendTo('#mention-element');
```

---

### noRecordsTemplate

**Type:** `string` &nbsp;|&nbsp; **Default:** `'No records found'`

Specifies the template shown in the popup when no items match the current filter text. Accepts an HTML string.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  noRecordsTemplate: '<div class="empty-state">No users found for your search</div>'
});
mentionObj.appendTo('#mention-element');
```

---

### popupHeight

**Type:** `string | number` &nbsp;|&nbsp; **Default:** `'300px'`

Specifies the height of the popup. Accepts a pixel string (e.g. `'200px'`), a number (treated as pixels), or a percentage string. Controls the maximum scrollable height of the suggestion list.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  popupHeight: '200px'
});
mentionObj.appendTo('#mention-element');
```

---

### popupWidth

**Type:** `string | number` &nbsp;|&nbsp; **Default:** `'auto'`

Specifies the width of the popup. Accepts a pixel string, a number (treated as pixels), or a percentage string (relative to the target element width). Defaults to `'auto'` which sizes the popup to its widest content.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  popupWidth: '300px'
});
mentionObj.appendTo('#mention-element');
```

---

### query

**Type:** `Query` &nbsp;|&nbsp; **Default:** `null`

Specifies an external `Query` object that can be customized and applied against the data source. Useful for filtering, selecting specific fields, or limiting records when using `DataManager`.

```typescript
import { Query } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteDataManager,
  fields: { text: 'ContactName', value: 'CustomerID' },
  query: new Query().select(['ContactName', 'CustomerID']).take(10)
});
mentionObj.appendTo('#mention-element');
```

---

### requireLeadingSpace

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `true`

Specifies whether a space is required before the mention character to trigger the suggestion list. When set to `false`, the suggestion list is triggered even without a preceding space (e.g. inside a word or email address).

```typescript
// "@mention" triggers anywhere — no preceding space needed
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  requireLeadingSpace: false
});
mentionObj.appendTo('#mention-element');
```

---

### showMentionChar

**Type:** `boolean` &nbsp;|&nbsp; **Default:** `false`

Specifies whether to show the configured `mentionChar` with the inserted text. When `true`, the chip reads `@Alice` instead of `Alice`.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  showMentionChar: true
});
mentionObj.appendTo('#mention-element');
```

---

### sortOrder

**Type:** `SortOrder` &nbsp;|&nbsp; **Default:** `'None'`

Specifies the order in which the data source items are displayed in the suggestion list.

| Value | Description |
|---|---|
| `'None'` | The data source is not sorted (default) |
| `'Ascending'` | The data source is sorted in ascending order |
| `'Descending'` | The data source is sorted in descending order |

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['David', 'Alice', 'Carol', 'Bob'],
  sortOrder: 'Ascending'   // shows: Alice, Bob, Carol, David
});
mentionObj.appendTo('#mention-element');
```

---

### spinnerTemplate

**Type:** `string | Function` &nbsp;|&nbsp; **Default:** `null`

Specifies the template displayed in the popup while data is being loaded from a remote server. When `null`, the default circular spinner is used.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteDataManager,
  fields: { text: 'name', value: 'id' },
  spinnerTemplate: '<div class="loading">Loading members...</div>'
});
mentionObj.appendTo('#mention-element');
```

---

### suffixText

**Type:** `string` &nbsp;|&nbsp; **Default:** `null`

Specifies custom text to append immediately after the inserted mention chip. You can append a space (`' '`) or a newline character (`'\n'`) as a suffix to improve typing flow.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  suffixText: ' '   // cursor lands after a space following the chip
});
mentionObj.appendTo('#mention-element');
```

---

### suggestionCount

**Type:** `number` &nbsp;|&nbsp; **Default:** `25`

Specifies the maximum number of items displayed in the suggestion popup. The limit is applied after filtering.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: largeDataArray,
  fields: { text: 'name', value: 'id' },
  suggestionCount: 10
});
mentionObj.appendTo('#mention-element');
```

---

### target

**Type:** `HTMLElement | string` &nbsp;|&nbsp; **Default:** *(required, no default)*

Specifies the target selector where the mention component needs to be displayed. The Mention component listens to the target element's user input and displays suggestions as soon as the user inputs the mention character. Accepts a CSS selector string or a direct `HTMLElement` reference.

```typescript
// By CSS selector
const mentionObj: Mention = new Mention({
  target: '#commentTextarea',
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj.appendTo('#mention-element');

// By HTMLElement reference
const el = document.getElementById('commentTextarea') as HTMLElement;
const mentionObj2: Mention = new Mention({
  target: el,
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj2.appendTo('#mention-element2');
```

---

### zIndex

**Type:** `number` &nbsp;|&nbsp; **Default:** `1000`

Specifies the CSS `z-index` value of the component popup element. Increase this value when the popup needs to appear above other positioned elements such as modals or overlays.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  zIndex: 9999
});
mentionObj.appendTo('#mention-element');
```

---

## Methods

### addEventListener

Adds a handler function to the given event listener.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | The name of the event to listen to |
| `handler` | `Function` | The callback function to run when the event occurs |

**Returns:** `void`

```typescript
mentionObj.addEventListener('select', (args) => {
  console.log('Item selected:', args);
});
```

---

### addItem

Adds a new item (or items) to the popup list. By default the new item is appended as the last item, but you can insert at a specific position using the optional `itemIndex` parameter.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `items` | `Object[] \| Object \| string \| boolean \| number \| string[] \| boolean[] \| number[]` | The item or array of items to add |
| `itemIndex` *(optional)* | `number` | Zero-based index at which to insert the new item |

**Returns:** `void`

```typescript
// Append a single item
mentionObj.addItem({ name: 'Eve Davis', id: 'eve' });

// Insert at index 0 (top of list)
mentionObj.addItem({ name: 'Zara Ahmed', id: 'zara' }, 0);

// Add multiple items
mentionObj.addItem([
  { name: 'Frank Moore', id: 'frank' },
  { name: 'Grace Lee',   id: 'grace' }
]);
```

---

### appendTo

Appends the control within the given HTML element.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `selector` *(optional)* | `string \| HTMLElement` | Target element or CSS selector where the control is mounted |

**Returns:** `void`

```typescript
mentionObj.appendTo('#mention-element');
// or
mentionObj.appendTo(document.getElementById('mention-element')!);
```

---

### dataBind

When invoked, applies all pending property changes immediately to the component without waiting for the next render cycle.

**Returns:** `void`

```typescript
mentionObj.minLength = 3;
mentionObj.dataBind();
```

---

### destroy

Removes the component from the DOM and detaches all its related event handlers. Also removes all attributes and classes added by the component. The target element stops responding to the trigger character after this call.

**Returns:** `void`

```typescript
mentionObj.destroy();
```

---

### disableItem

Disables a specific item in the popup list so it appears greyed out and cannot be selected.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable — by value string, index number, data object, or list element reference |

**Returns:** `void`

```typescript
mentionObj.disableItem('bob');                              // by value string
mentionObj.disableItem(2);                                  // by index
mentionObj.disableItem({ name: 'Carol', id: 'carol' });    // by data object
mentionObj.disableItem(mentionObj.getItems()[1] as HTMLLIElement); // by element
```

---

### getDataByValue

Gets the data object from the data source that matches the given value.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `value` | `string \| number \| boolean \| object` | The value to look up in the data source |

**Returns:** `{ [key: string]: Object } | string | number | boolean`

```typescript
const record = mentionObj.getDataByValue('alice');
// Returns: { name: 'Alice', id: 'alice', ... }
```

---

### getItems

Gets all the list item elements currently bound to the component's suggestion popup.

**Returns:** `Element[]`

```typescript
const items: Element[] = mentionObj.getItems();
console.log('Item count:', items.length);
items.forEach((el, i) => console.log(i, (el as HTMLElement).textContent));
```

---

### getRootElement

Returns the root HTML element of the component.

**Returns:** `HTMLElement`

```typescript
const root: HTMLElement = mentionObj.getRootElement();
console.log(root.id);
```

---

### hidePopup

Hides the suggestion popup if it is currently in an open state.

**Returns:** `void`

```typescript
mentionObj.hidePopup();
```

---

### refresh

Applies all pending property changes and re-renders the component.

**Returns:** `void`

```typescript
mentionObj.dataSource = updatedDataArray;
mentionObj.refresh();
```

---

### removeEventListener

Removes a previously registered event handler from the given event.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `eventName` | `string` | The name of the event to remove the handler from |
| `handler` | `Function` | The exact handler function reference to remove |

**Returns:** `void`

```typescript
const handler = (args: any) => console.log(args);
mentionObj.addEventListener('select', handler);
// Later:
mentionObj.removeEventListener('select', handler);
```

---

### search

Searches the entered text and shows matching results in the suggestion list. Positions the popup at the given screen coordinates.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `text` | `string` | The search string to filter the suggestion list |
| `positionX` | `number` | Horizontal screen coordinate (px) for popup placement |
| `positionY` | `number` | Vertical screen coordinate (px) for popup placement |

**Returns:** `void`

```typescript
// Programmatically trigger search at screen position (200, 150)
mentionObj.search('ali', 200, 150);
```

---

### showPopup

Opens the popup that displays the list of items.

**Returns:** `void`

```typescript
mentionObj.showPopup();
```

---

### Inject *(static)*

Dynamically injects the required feature modules into the component class.

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `moduleList` | `Function[]` | Array of module constructors to inject |

**Returns:** `void`

```typescript
import { Mention, VirtualScroll } from '@syncfusion/ej2-dropdowns';
Mention.Inject(VirtualScroll);
```

---

## Events

### actionBegin

**Type:** `EmitType<Object>`

Triggers before fetching data from the remote server.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionBegin: () => {
    console.log('Remote fetch started');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### actionComplete

**Type:** `EmitType<Object>`

Triggers after data is fetched successfully from the remote server.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionComplete: () => {
    console.log('Remote fetch completed');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### actionFailure

**Type:** `EmitType<Object>`

Triggers when the data fetch request from the remote server fails.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  actionFailure: (e: Object) => {
    console.error('Remote fetch failed:', e);
  }
});
mentionObj.appendTo('#mention-element');
```

---

### beforeOpen

**Type:** `EmitType<PopupEventArgs>`

Triggers before the popup is opened. Set `args.cancel = true` to prevent the popup from appearing.

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  beforeOpen: (args: PopupEventArgs) => {
    if (shouldBlockPopup) {
      args.cancel = true;  // prevent popup from opening
    }
  }
});
mentionObj.appendTo('#mention-element');
```

---

### change

**Type:** `EmitType<MentionChangeEventArgs>`

Triggers when an item in the popup is selected and the value is updated in the editor (target element).

```typescript
import { MentionChangeEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  change: (args: MentionChangeEventArgs) => {
    console.log('Inserted value:', args.value);
    console.log('Item data:', args.itemData);
    console.log('Previous item:', args.previousItem);
    console.log('Target element:', args.element);
  }
});
mentionObj.appendTo('#mention-element');
```

---

### closed

**Type:** `EmitType<PopupEventArgs>`

Triggers after the popup is closed.

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  closed: (args: PopupEventArgs) => {
    console.log('Popup closed');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### created

**Type:** `EmitType<Object>`

Triggers when the component is created and fully initialized.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  created: () => {
    console.log('Mention component initialized');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### dataBound

**Type:** `EmitType<Object>`

Triggers when the data source is populated in the popup list. Useful with remote data to know exactly when items have finished loading.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteData,
  fields: { text: 'name', value: 'id' },
  dataBound: () => {
    console.log('Suggestion list populated:', mentionObj.getItems().length, 'items');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### destroyed

**Type:** `EmitType<Object>`

Triggers when the component is destroyed (after `destroy()` is called).

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  destroyed: () => {
    console.log('Mention component destroyed and removed');
  }
});
mentionObj.appendTo('#mention-element');
```

---

### filtering

**Type:** `EmitType<FilteringEventArgs>`

Triggers on typing a character in the component (each keystroke after the trigger character). Use `e.updateData()` to supply custom-filtered data and override the built-in filter.

**`FilteringEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The text typed after the trigger character |
| `updateData` | `function` | Call with `(dataSource, query?, fields?)` to override results |
| `cancel` | `boolean` | Set `true` to cancel the default filter action |
| `preventDefaultAction` | `boolean` | Set `true` to prevent the default filter from running |

```typescript
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  filtering: (e: FilteringEventArgs) => {
    // Custom filter: only match names starting with typed text
    const query: Query = new Query().where('name', 'startswith', e.text, true);
    e.updateData(userData, query);
  }
});
mentionObj.appendTo('#mention-element');
```

---

### opened

**Type:** `EmitType<PopupEventArgs>`

Triggers after the popup opens.

```typescript
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  opened: (args: PopupEventArgs) => {
    console.log('Popup opened', args.popup);
  }
});
mentionObj.appendTo('#mention-element');
```

---

### select

**Type:** `EmitType<SelectEventArgs>`

Triggers when an item in the popup is selected by the user — either with mouse/tap or keyboard navigation. Set `args.cancel = true` to prevent the item from being inserted.

```typescript
import { SelectEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  select: (args: SelectEventArgs) => {
    console.log('Selected item data:', args.itemData);
    // Prevent insertion of inactive users
    if ((args.itemData as any).status === 'inactive') {
      args.cancel = true;
    }
  }
});
mentionObj.appendTo('#mention-element');
```

---

## Type Reference

### MentionChangeEventArgs

Extends `SelectEventArgs`. Passed to the `change` event handler.

```typescript
interface MentionChangeEventArgs extends SelectEventArgs {
  value: number | string | boolean;      // The value of the selected item
  previousItem: HTMLLIElement;           // The previously focused list element
  previousItemData: FieldSettingsModel;  // Data object for the previously selected item
  element: HTMLElement;                  // The target element the Mention is bound to
}
```

**Inherited from `SelectEventArgs`:**

| Property | Type | Description |
|---|---|---|
| `item` | `HTMLLIElement` | The selected list item element |
| `itemData` | `FieldSettingsModel` | The data object for the selected item |
| `isInteracted` | `boolean` | `true` if triggered by user interaction |
| `cancel` | `boolean` | Set `true` to cancel the default action |
| `e` | `Event` | The underlying DOM event |

---

### FilterType Values

| Value | Description |
|---|---|
| `'StartsWith'` | Matches items whose display text begins with the typed string |
| `'EndsWith'` | Matches items whose display text ends with the typed string |
| `'Contains'` | Matches items whose display text contains the typed string (default) |

---

### SortOrder Values

| Value | Description |
|---|---|
| `'None'` | Items appear in the original data source order (default) |
| `'Ascending'` | Items sorted alphabetically A → Z |
| `'Descending'` | Items sorted alphabetically Z → A |
