# Popup Items — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [Icons on Popup Items](#icons-on-popup-items)
- [Navigation URLs](#navigation-urls)
- [Separators](#separators)
- [Disabled Items](#disabled-items)
- [Item Selection and Events](#item-selection-and-events)

---

## Icons on Popup Items

Set `iconCss` on each item to add an icon. The icon appears to the left of the item text by default.

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', iconCss: 'e-icons e-delete' },
  { text: 'Mark As Read', iconCss: 'e-icons e-checkbox' },
  { text: 'Like Message', iconCss: 'e-icons e-heart' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-message',
  content: 'Message'
});
dropdownButton.appendTo('#dropdownbutton');
```

### Icon Positioning

Icons can appear on the left (default) or right using the `beforeItemRender` event:

```typescript
import { DropdownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', iconCss: 'e-icons e-delete' },
];

function beforeItemRender(args: MenuEventArgs): void {
  // Customize item appearance
  args.element.style.paddingRight = '20px';
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  beforeItemRender: beforeItemRender,
  content: 'Actions'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Navigation URLs

Provide a `url` on an item to make it navigate to a web page:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Google', iconCss: 'e-icons e-link', url: 'https://www.google.com' },
  { text: 'GitHub', iconCss: 'e-icons e-link', url: 'https://www.github.com' },
  { text: 'Stack Overflow', iconCss: 'e-icons e-link', url: 'https://stackoverflow.com' },
];

function beforeItemRender(args: MenuEventArgs): void {
  // Open links in new tab
  const anchor = args.element.querySelector('a') as HTMLAnchorElement;
  if (anchor) {
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
  }
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  beforeItemRender: beforeItemRender,
  iconCss: 'e-icons e-globe',
  content: 'Quick Links'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Separators

Add separator lines between groups of items using the `separator` property:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Undo', iconCss: 'e-icons e-undo' },
  { text: 'Redo', iconCss: 'e-icons e-redo' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'Edit'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Disabled Items

Disable specific items using the `disabled` property:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'New', iconCss: 'e-icons e-new', disabled: false },
  { text: 'Open', iconCss: 'e-icons e-open', disabled: false },
  { text: 'Save', iconCss: 'e-icons e-save', disabled: true },
  { text: 'Save As', iconCss: 'e-icons e-save', disabled: true },
  { separator: true },
  { text: 'Exit', iconCss: 'e-icons e-exit', disabled: false },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'File'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Item Selection and Events

Handle item clicks using the `select` or `click` event:

```typescript
import { DropdownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Save', id: 'save_action' },
  { text: 'Print', id: 'print_action' },
  { text: 'Export', id: 'export_action' },
];

function onSelect(args: MenuEventArgs): void {
  console.log('Selected item:', args.item.text);
  console.log('Item ID:', (args.item as any).id);
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  select: onSelect,
  content: 'Actions'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Dynamic Item Management

Add, update, or remove items dynamically:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const dropdownButton: DropdownButton = new DropdownButton({
  items: [
    { text: 'Item 1', id: 'item1' },
    { text: 'Item 2', id: 'item2' },
  ],
  content: 'Menu'
});
dropdownButton.appendTo('#dropdownbutton');

// Add new item
dropdownButton.items.push({ text: 'Item 3', id: 'item3' });
dropdownButton.refresh();

// Remove item
dropdownButton.items.splice(0, 1);
dropdownButton.refresh();

// Update item
dropdownButton.items[0].text = 'Updated Item';
dropdownButton.refresh();
```
