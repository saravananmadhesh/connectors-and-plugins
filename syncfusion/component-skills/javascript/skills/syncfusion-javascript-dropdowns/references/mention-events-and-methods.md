# Events and Methods — Syncfusion TypeScript Mention

## Table of Contents
- [select Event](#select-event)
- [change Event](#change-event)
- [filtering Event](#filtering-event)
- [created and destroyed Events](#created-and-destroyed-events)
- [dataBound Event](#databound-event)
- [showPopup() and hidePopup()](#showpopup-and-hidepopup)
- [search()](#search)
- [disableItem()](#disableitem)
- [addItem()](#additem)
- [getItems() and getDataByValue()](#getitems-and-getdatabyvalue)
- [destroy()](#destroy)
- [dataBind() and refresh()](#databind-and-refresh)

---

## select Event

Fires when the user picks an item from the suggestion popup — by clicking, pressing **Enter**, or pressing **Tab**. The event fires before the chip is inserted into the target element.

```typescript
import { Mention, SelectEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  select: (args: SelectEventArgs) => {
    console.log('Selected item:', args.item);       // HTMLLIElement
    console.log('Item data:', args.itemData);       // data object from dataSource
    console.log('Cancelled?', args.cancel);         // set true to prevent insertion
  }
});
mentionObj.appendTo('#mention-element');
```

Set `args.cancel = true` to prevent the selected item from being inserted:

```typescript
select: (args: SelectEventArgs) => {
  // Block selection of deactivated users
  if ((args.itemData as any).status === 'inactive') {
    args.cancel = true;
  }
}
```

---

## change Event

Fires after a selection is confirmed and the value is inserted into the target element. It provides access to the current and previous selection.

```typescript
import { Mention, MentionChangeEventArgs } from '@syncfusion/ej2-dropdowns';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  change: (args: MentionChangeEventArgs) => {
    console.log('New value:', args.value);              // inserted value
    console.log('Item data:', args.itemData);           // full data object
    console.log('Previous item:', args.previousItem);   // HTMLLIElement
    console.log('Target element:', args.element);       // the target HTMLElement
  }
});
mentionObj.appendTo('#mention-element');
```

**`MentionChangeEventArgs` properties:**

| Property | Type | Description |
|---|---|---|
| `value` | `number \| string \| boolean` | The value of the selected item |
| `item` | `HTMLLIElement` | The selected list item element |
| `itemData` | `FieldSettingsModel` | The full data object for the selected item |
| `previousItem` | `HTMLLIElement` | The previously selected list item element |
| `previousItemData` | `FieldSettingsModel` | Data object for the previously selected item |
| `element` | `HTMLElement` | The target element the Mention is bound to |
| `isInteracted` | `boolean` | `true` if the change was triggered by user interaction |
| `e` | Event | The underlying DOM event |

---

## filtering Event

Fires each time the user types a character after the trigger. Use `e.updateData()` to supply custom-filtered results. See `references/filtering.md` for full examples.

```typescript
import { Mention, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  filtering: (e: FilteringEventArgs) => {
    const query: Query = new Query().where('name', 'startswith', e.text, true);
    e.updateData(userData, query);
  }
});
mentionObj.appendTo('#mention-element');
```

---

## created and destroyed Events

`created` fires once after the component is fully initialized. `destroyed` fires after `destroy()` completes.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  created: () => {
    console.log('Mention component is ready');
  },
  destroyed: () => {
    console.log('Mention component removed from DOM');
  }
});
mentionObj.appendTo('#mention-element');
```

---

## dataBound Event

Fires after the suggestion list data is populated in the popup — useful for remote data to know when items have finished loading:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: remoteDataManager,
  fields: { text: 'name', value: 'id' },
  dataBound: () => {
    console.log('Popup list populated with', mentionObj.getItems().length, 'items');
  }
});
mentionObj.appendTo('#mention-element');
```

---

## showPopup() and hidePopup()

Open or close the popup programmatically without user input:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj.appendTo('#mention-element');

// Open popup from a button
document.getElementById('openBtn')!.addEventListener('click', () => {
  mentionObj.showPopup();
});

// Close popup from another action
document.getElementById('closeBtn')!.addEventListener('click', () => {
  mentionObj.hidePopup();
});
```

---

## search()

Programmatically trigger the mention search at a given text and screen position. Useful for integrations where you want to show suggestions at a specific cursor location.

```typescript
// Signature: search(text: string, positionX: number, positionY: number): void

mentionObj.search('ali', 200, 150);
// Opens the popup filtered to "ali" positioned at (200, 150) on screen
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `text` | `string` | The search string to filter suggestions |
| `positionX` | `number` | Horizontal screen coordinate for popup placement (px) |
| `positionY` | `number` | Vertical screen coordinate for popup placement (px) |

---

## disableItem()

Disable a specific item in the popup so it appears greyed out and cannot be selected.

```typescript
// Disable by string value
mentionObj.disableItem('bob');

// Disable by index (number)
mentionObj.disableItem(2);

// Disable by data object
mentionObj.disableItem({ name: 'Carol White', id: 'carol' });

// Disable by HTMLLIElement reference
const li = mentionObj.getItems()[1] as HTMLLIElement;
mentionObj.disableItem(li);
```

> **Note:** `disableItem()` requires that `fields.disabled` is mapped to a property in your data model. The method updates the data source entry to reflect the disabled state.

---

## addItem()

Add one or more new items to the suggestion list at runtime. Items are appended at the end by default, or inserted at a specific index.

```typescript
// Add a single object item at the end
mentionObj.addItem({ name: 'Eve Davis', id: 'eve' });

// Add multiple items
mentionObj.addItem([
  { name: 'Frank Moore', id: 'frank' },
  { name: 'Grace Lee',   id: 'grace' }
]);

// Insert at a specific index (0-based)
mentionObj.addItem({ name: 'Zara Ahmed', id: 'zara' }, 0);
```

---

## getItems() and getDataByValue()

### getItems()

Returns all rendered `<li>` elements in the suggestion popup:

```typescript
const listItems: Element[] = mentionObj.getItems();
console.log('Total items in popup:', listItems.length);

listItems.forEach((item, idx) => {
  console.log(`Item ${idx}:`, (item as HTMLElement).textContent);
});
```

### getDataByValue()

Returns the data object from the source that matches a given value:

```typescript
const record = mentionObj.getDataByValue('alice');
// Returns: { name: 'Alice Johnson', id: 'alice', role: 'Engineer', ... }
console.log('Found:', record);
```

Accepts `string`, `number`, `boolean`, or `object` as the lookup value.

---

## destroy()

Removes the Mention component from the DOM, detaches all event handlers, and cleans up internal state. Call this when the component is no longer needed (e.g. before navigating away in a SPA):

```typescript
// Clean up to prevent memory leaks
mentionObj.destroy();
```

After `destroy()`, the `#mention-element` host element is restored to its original state and the target element stops responding to the trigger character.

---

## dataBind() and refresh()

### dataBind()

Applies pending property changes immediately without waiting for the next render cycle:

```typescript
mentionObj.minLength = 3;
mentionObj.dataBind();   // apply the new minLength right now
```

### refresh()

Applies all pending property changes and re-renders the component:

```typescript
mentionObj.dataSource = updatedDataArray;
mentionObj.refresh();    // re-render with new data
```
