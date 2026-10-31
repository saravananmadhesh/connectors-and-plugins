# Events and Interactivity — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [Handling Item Selection (select)](#handling-item-selection-select)
- [Before Open and Close Events](#before-open-and-close-events)
- [Open Event](#open-event)
- [Disable the Button](#disable-the-button)
- [Dynamic Item Management](#dynamic-item-management)
- [Programmatic Toggle](#programmatic-toggle)
- [RTL Support](#rtl-support)

---

## Handling Item Selection (select)

The `select` event fires when the user clicks a popup item. The `MenuEventArgs` argument provides `args.item` (the selected `ItemModel`) and `args.element` (the DOM element).

```typescript
import { DropdownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
];

function onSelect(args: MenuEventArgs): void {
  console.log('Selected item:', args.item.text);
  console.log('Item ID:', (args.item as any).id);
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  select: onSelect,
  content: 'Clipboard'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Before Open and Close Events

Use `beforeOpen` and `beforeClose` events to prepare UI before the popup opens or closes:

```typescript
import { DropdownButton, ItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
];

let dropdownButton: DropdownButton;

function beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  console.log('Popup is about to open');
  // Update items dynamically if needed
  dropdownButton.items.push({ text: 'New Item' });
}

function beforeClose(args: BeforeOpenCloseMenuEventArgs): void {
  console.log('Popup is about to close');
}

dropdownButton = new DropdownButton({
  items: items,
  beforeOpen: beforeOpen,
  beforeClose: beforeClose,
  content: 'Clipboard'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Open Event

The `open` event fires after the popup is positioned. Use it to customize popup behavior:

```typescript
import { DropdownButton, ItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
];

function onOpen(args: OpenCloseMenuEventArgs): void {
  const popup = args.element.parentElement as HTMLElement;
  console.log('Popup opened');
  console.log('Popup width:', popup.offsetWidth);
  console.log('Popup height:', popup.offsetHeight);
}

function onClose(args: OpenCloseMenuEventArgs): void {
  console.log('Popup closed');
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  open: onOpen,
  close: onClose,
  content: 'Clipboard'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Disable the Button

Set `disabled` to `true` to disable the button:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit' },
  { text: 'Delete' },
  { text: 'Share' },
];

const enabledButton: DropdownButton = new DropdownButton({
  items: items,
  disabled: false,
  content: 'Enabled'
});
enabledButton.appendTo('#enabled');

const disabledButton: DropdownButton = new DropdownButton({
  items: items,
  disabled: true,
  content: 'Disabled'
});
disabledButton.appendTo('#disabled');
```

### Toggle Disable State Programmatically

```typescript
let dropdownButton: DropdownButton;

// Enable button
function enableButton(): void {
  dropdownButton.disabled = false;
}

// Disable button
function disableButton(): void {
  dropdownButton.disabled = true;
}

dropdownButton = new DropdownButton({
  items: items,
  content: 'Toggle'
});
dropdownButton.appendTo('#dropdownbutton');

// Call toggle functions
document.getElementById('enable-btn')?.addEventListener('click', enableButton);
document.getElementById('disable-btn')?.addEventListener('click', disableButton);
```

---

## Dynamic Item Management

Add, remove, or update items at runtime:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const dropdownButton: DropdownButton = new DropdownButton({
  items: [
    { text: 'Item 1' },
    { text: 'Item 2' },
  ],
  content: 'Menu'
});
dropdownButton.appendTo('#dropdownbutton');

// Add item
function addItem(): void {
  dropdownButton.items.push({ text: 'Item 3' });
  dropdownButton.refresh();
}

// Remove first item
function removeItem(): void {
  dropdownButton.items.splice(0, 1);
  dropdownButton.refresh();
}

// Update item
function updateItem(): void {
  dropdownButton.items[0].text = 'Updated Item 1';
  dropdownButton.refresh();
}

// Clear all items
function clearItems(): void {
  dropdownButton.items = [];
  dropdownButton.refresh();
}

document.getElementById('add-btn')?.addEventListener('click', addItem);
document.getElementById('remove-btn')?.addEventListener('click', removeItem);
document.getElementById('update-btn')?.addEventListener('click', updateItem);
document.getElementById('clear-btn')?.addEventListener('click', clearItems);
```

---

## Programmatic Toggle

Open or close the popup programmatically:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Save' },
  { text: 'Open' },
  { text: 'Export' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'File'
});
dropdownButton.appendTo('#dropdownbutton');

// Open popup
function openPopup(): void {
  dropdownButton.toggle();
}

// Close popup
function closePopup(): void {
  dropdownButton.toggle();
}

document.getElementById('open-btn')?.addEventListener('click', openPopup);
document.getElementById('close-btn')?.addEventListener('click', closePopup);
```

---

## RTL Support

Enable right-to-left (RTL) text direction:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'حفظ' },        // Save in Arabic
  { text: 'فتح' },        // Open in Arabic
  { text: 'تصدير' },      // Export in Arabic
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  enableRtl: true,
  content: 'قائمة'          // Menu in Arabic
});
dropdownButton.appendTo('#dropdownbutton');
```

**HTML:**
```html
<div id="dropdownbutton" dir="rtl"></div>
```

---

## Keyboard Accessibility

The DropdownButton supports keyboard navigation out of the box:

- **Tab** – Move focus to the button
- **Space / Enter** – Open the popup
- **Arrow Down / Arrow Right** – Navigate to the next item
- **Arrow Up / Arrow Left** – Navigate to the previous item
- **Escape** – Close the popup
- **Enter / Space** – Select the focused item
