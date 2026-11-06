# Events and Methods — Syncfusion TypeScript DropDownList

## Table of Contents
- [Events Overview](#events-overview)
- [change Event](#change-event)
- [open and close Events](#open-and-close-events)
- [beforeOpen Event](#beforeopen-event)
- [select Event](#select-event)
- [filtering Event](#filtering-event)
- [dataBound Event](#databound-event)
- [actionBegin, actionComplete, actionFailure](#actionbegin-actioncomplete-actionfailure)
- [focus and blur Events](#focus-and-blur-events)
- [resize Events](#resize-events)
- [Methods Overview](#methods-overview)
- [showPopup and hidePopup](#showpopup-and-hidepopup)
- [addItem](#additem)
- [getItems and getDataByValue](#getitems-and-getdatabyvalue)
- [dataBind and refresh](#databind-and-refresh)
- [clear](#clear)
- [focusIn and focusOut](#focusin-and-focusout)
- [destroy](#destroy)

---

## Events Overview

| Event | When it fires |
|---|---|
| `change` | Value changes (user interaction or programmatic) |
| `open` | Popup opens |
| `close` | Popup closes |
| `beforeOpen` | Before popup opens |
| `select` | User selects an item from popup |
| `filtering` | User types in the filter bar |
| `dataBound` | Data source is populated in the popup |
| `actionBegin` | Before remote data fetch |
| `actionComplete` | After successful remote data fetch |
| `actionFailure` | Remote data fetch fails |
| `focus` | Component receives focus |
| `blur` | Component loses focus |
| `created` | Component is created |
| `destroyed` | Component is destroyed |
| `resizeStart` | User starts resizing popup |
| `resizing` | Popup is being resized |
| `resizeStop` | User finishes resizing popup |

---

## change Event

Fires when the selected value changes — either by user interaction or programmatically. Use `args.isInteracted` to distinguish between the two.

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
    placeholder: 'Select a game',
    change: (args) => {
        if (args.isInteracted) {
            console.log('User changed to:', args.value);
        } else {
            console.log('Programmatic change to:', args.value);
        }
    }
});
dropDownListObject.appendTo('#ddlelement');

// Programmatic change — triggers change event with isInteracted = false
document.getElementById('btn').onclick = () => {
    dropDownListObject.value = 'game3';
};
```

---

## open and close Events

`open` fires when the popup becomes visible. `close` fires when it is dismissed.

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    open: (args) => {
        console.log('Popup opened');
    },
    close: (args) => {
        console.log('Popup closed');
    }
});
```

### Close Popup on Window Scroll

Use `hidePopup()` inside a window scroll handler:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');

window.onscroll = () => {
    dropDownListObject.hidePopup();
};
```

---

## beforeOpen Event

Fires before the popup opens. Can be used to modify data or state before the list is shown.

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    beforeOpen: (args) => {
        console.log('About to open popup');
    }
});
```

---

## select Event

Fires when a user selects an item from the popup (via mouse/tap or keyboard). This fires before `change`.

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    select: (args) => {
        console.log('Selected item:', args.itemData);
        console.log('Selected value:', args.item);
    }
});
```

---

## filtering Event

Fires when the user types in the filter bar. Used to provide custom filtering logic. See [filtering.md](filtering.md) for full details.

```ts
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

let ddl: DropDownList = new DropDownList({
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
```

---

## dataBound Event

Fires after the data source is loaded and bound to the popup list.

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    dataBound: () => {
        console.log('Data is ready in popup');
    }
});
```

---

## actionBegin, actionComplete, actionFailure

These events are for remote data scenarios:

- `actionBegin` — fires before the HTTP request is made
- `actionComplete` — fires after a successful response; `e.result` contains the fetched data
- `actionFailure` — fires when the request fails

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: new DataManager({ /* ... */ }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer',
    actionBegin: () => {
        console.log('Fetching data...');
    },
    actionComplete: (e: any) => {
        console.log('Fetched', e.result.length, 'items');
        // Optionally modify e.result before display
    },
    actionFailure: () => {
        console.error('Data fetch failed');
    }
});
```

---

## focus and blur Events

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    focus: () => { console.log('Focused'); },
    blur: ()  => { console.log('Blurred'); }
});
```

---

## resize Events

Available when `allowResize: true`:

```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    allowResize: true,
    placeholder: 'Select a game',
    resizeStart: () => { console.log('Resize started'); },
    resizing:    () => { console.log('Resizing...'); },
    resizeStop:  () => { console.log('Resize stopped'); }
});
```

---

## Methods Overview

| Method | Description |
|---|---|
| `showPopup()` | Opens the popup |
| `hidePopup()` | Closes the popup |
| `addItem(items, index?)` | Adds item(s) at a position |
| `getItems()` | Returns all rendered `<li>` elements |
| `getDataByValue(value)` | Returns the data object for a value |
| `disableItem(item)` | Disables a specific item |
| `dataBind()` | Applies pending property changes immediately |
| `refresh()` | Re-renders the component |
| `clear()` | Clears the selected value |
| `focusIn()` | Programmatically focuses the component |
| `focusOut()` | Programmatically removes focus |
| `destroy()` | Destroys the component and removes it from the DOM |
| `filter(dataSource, query?, fields?)` | Filters data from the given source |

---

## showPopup and hidePopup

```ts
// Open the popup programmatically
dropDownListObject.showPopup();

// Close the popup
dropDownListObject.hidePopup();
```

---

## addItem

Add one or more items to the popup list. Items append to the end by default; provide `itemIndex` to insert at a position.

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

// Add at index 0 (first position)
document.getElementById('first').onclick = () => {
    dropDownListObject.addItem({ Id: 'game0', Game: 'Hockey' }, 0);
};

// Add in between (at index 2)
document.getElementById('between').onclick = () => {
    dropDownListObject.addItem({ Id: 'game4', Game: 'Golf' }, 2);
};

// Add at end (no index)
document.getElementById('last').onclick = () => {
    dropDownListObject.addItem({ Id: 'game5', Game: 'Cricket' });
};
```

---

## getItems and getDataByValue

```ts
// Get all rendered list item elements
let items: Element[] = dropDownListObject.getItems();
console.log('Item count:', items.length);

// Get data object by value
let data = dropDownListObject.getDataByValue('game2');
console.log('Data for game2:', data);
```

---

## dataBind and refresh

Use `dataBind()` to immediately apply pending property changes (required in cascading scenarios):

```ts
dropDownListObject.value = 'game2';
dropDownListObject.dataBind();  // Apply changes immediately
```

Use `refresh()` to re-render the component from scratch:

```ts
dropDownListObject.refresh();
```

---

## clear

Clears the current selection, resetting `value`, `text`, and `index` to `null`:

```ts
dropDownListObject.clear();
```

---

## focusIn and focusOut

```ts
// Focus the component
dropDownListObject.focusIn();

// Remove focus
dropDownListObject.focusOut();

// Example: focus via keyboard shortcut (Alt+T)
document.onkeyup = (e) => {
    if (e.altKey && e.keyCode === 84) {
        dropDownListObject.focusIn();
    }
};
```

---

## destroy

Removes the component from the DOM and detaches all event handlers:

```ts
dropDownListObject.destroy();
```
