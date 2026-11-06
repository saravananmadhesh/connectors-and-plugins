# Popup Items — Syncfusion JavaScript SplitButton

## Table of Contents
- [Icons on Popup Items](#icons-on-popup-items)
- [Item Templating with beforeItemRender](#item-templating-with-beforeitemrender)
- [Popup Templating with target](#popup-templating-with-target)
- [Dynamic Item Management](#dynamic-item-management)

---

## Icons on Popup Items

Add icons to individual popup action items by setting `iconCss` on each `ItemModel`. The icon appears to the left of the item text by default.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut',   iconCss: 'e-icons e-cut' },
  { text: 'Copy',  iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' }
];

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items
});
splitBtn.appendTo('#element');
```

Icon CSS classes can be Syncfusion built-in icons (`e-icons`) or third-party icon classes.

---

## Item Templating with beforeItemRender

The `beforeItemRender` event fires while rendering each popup action item. Use it to customise the item's DOM — append extra elements, modify content, or apply conditional formatting.

The event argument (`args`) provides:
- `args.item` — the `ItemModel` for the current item
- `args.element` — the `<li>` DOM element being rendered

**Example: Append right-aligned shortcut icons**

```typescript
import { SplitButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple, createElement } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-paste',
  items: items,
  beforeItemRender: (args: MenuEventArgs): void => {
    // Append a shortcut span to the right of each item
    const shortCutSpan: HTMLElement = createElement('span');
    const text: string = args.item.text!;
    args.element.appendChild(shortCutSpan);
    shortCutSpan.setAttribute('class', 'shortcut');
    const clsName: string = (text === 'Copy') ? 'e-icons' : 'e-sb-icons';
    shortCutSpan.classList.add(clsName);
    if (text === 'Cut') shortCutSpan.classList.add('e-cut');
    else if (text === 'Paste') shortCutSpan.classList.add('e-paste');
    else shortCutSpan.classList.add('e-copy');
  }
});
splitBtn.appendTo('#element');
```

Use `createElement` imported from `@syncfusion/ej2-base` (or `document.createElement`) for safe DOM element creation inside the event.

---

## Popup Templating with target

To replace the entire popup with custom HTML (e.g., a color palette, a list view, or any custom layout), use the `target` property. Pass a CSS selector or DOM element reference pointing to your custom popup container.

When `target` is set, the standard `items` array popup is replaced by the targeted element.

**Example: Color palette popup**

```html
<button id="action">Color</button>
<div id="dropdowntarget">
  <!-- custom popup content here (e.g., color swatches) -->
  <div style="padding:8px">
    <span style="background:#f00;display:inline-block;width:20px;height:20px;"></span>
    <span style="background:#0f0;display:inline-block;width:20px;height:20px;"></span>
    <span style="background:#00f;display:inline-block;width:20px;height:20px;"></span>
  </div>
</div>

**index.ts:**
```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-color',
  target: '#dropdowntarget'
});
splitBtn.appendTo('#action');
```
```

> When `target` is used, `items` is ignored — the entire popup content comes from the targeted element.

**Example: Group items using ListView as target**

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ListView } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface ListItem {
  text: string;
  category: string;
}

const listItems: ListItem[] = [
  { text: 'Cut',               category: 'Basic' },
  { text: 'Copy',              category: 'Basic' },
  { text: 'Paste',             category: 'Basic' },
  { text: 'Paste as Formula',  category: 'Advanced' },
  { text: 'Paste as Hyperlink',category: 'Advanced' }
];

const listView: ListView = new ListView({
  dataSource: listItems,
  fields: { groupBy: 'category' }
});
listView.appendTo('#listview');

const splitBtn: SplitButton = new SplitButton({
  content: 'ClipBoard',
  target: listView.element
});
splitBtn.appendTo('#element');
```

---

## Dynamic Item Management

Add or remove popup items after the component has been initialized.

### addItems()

Appends new items at the end or inserts them before a specified item.

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }] as ItemModel[]
});
splitBtn.appendTo('#element');

// Append a new item at the end
splitBtn.addItems([{ text: 'Select All' }] as ItemModel[]);

// Insert before 'Copy'
splitBtn.addItems([{ text: 'Undo' }] as ItemModel[], 'Copy');
```

### removeItems()

Removes items by their text label (or by unique ID when `isUniqueId` is `true`).

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({ content: 'Paste' });
splitBtn.appendTo('#element');

// Remove by text
splitBtn.removeItems(['Cut', 'Paste']);

// Remove by unique id
splitBtn.removeItems(['item-id-1'], true);
```
