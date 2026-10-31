# How-To Scenarios — Syncfusion JavaScript SplitButton

## Table of Contents
- [Enable Right-to-Left (RTL)](#enable-right-to-left-rtl)
- [Set the Disabled State](#set-the-disabled-state)
- [Group Popup Items Using ListView](#group-popup-items-using-listview)
- [Open a Dialog on Popup Item Click](#open-a-dialog-on-popup-item-click)
- [Underline a Character in Item Text](#underline-a-character-in-item-text)

---

## Enable Right-to-Left (RTL)

Set `enableRtl: true` to render the SplitButton in right-to-left layout. The shimmer direction and popup position also adapt to RTL.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Autosum' },
  { text: 'Average' },
  { text: 'Count numbers' },
  { text: 'Min' },
  { text: 'Max' }
];

let splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-sigma',
  items: items,
  enableRtl: true
});
splitBtn.appendTo('#element');
```

RTL affects the entire component including the popup menu direction.

---

## Set the Disabled State

Use the `disabled` property to prevent all interaction with the SplitButton — both the primary action and the popup trigger are disabled together.

```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Autosum' },
  { text: 'Average' },
  { text: 'Count numbers' },
  { text: 'Min' },
  { text: 'Max' }
];

let splitBtn: SplitButton = new SplitButton({
  iconCss: 'e-icons e-sigma',
  items: items,
  disabled: true
});
splitBtn.appendTo('#element');
```

To toggle disabled state dynamically:

```typescript
// Disable at runtime
splitBtn.disabled = true;
splitBtn.dataBind();

// Re-enable
splitBtn.disabled = false;
splitBtn.dataBind();
```

---

## Group Popup Items Using ListView

To display grouped popup items with category headers, use a Syncfusion ListView component as the popup via the `target` property. The ListView `groupBy` field creates the visual groupings.

```typescript
<!-- HTML -->
<button id="element">ClipBoard</button>
<ul id="listview"></ul>

<!-- TypeScript -->
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ListView } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const listItems: any[] = [
  { text: 'Cut',                category: 'Basic' },
  { text: 'Copy',               category: 'Basic' },
  { text: 'Paste',              category: 'Basic' },
  { text: 'Paste as Formula',   category: 'Advanced' },
  { text: 'Paste as Hyperlink', category: 'Advanced' }
];

// Create and render the ListView
const listView: ListView = new ListView({
  dataSource: listItems,
  fields: { groupBy: 'category' }
});
listView.appendTo('#listview');

// Pass the ListView element as target
const splitBtn: SplitButton = new SplitButton({
  content: 'ClipBoard',
  target: listView.element
});
splitBtn.appendTo('#element');
```

> Requires `@syncfusion/ej2-lists` package (or CDN script for `ej2-lists`).

---

## Open a Dialog on Popup Item Click

Handle the `select` event to detect which popup item was clicked, then programmatically show a Dialog component.

```html
<!-typescript
<!-- HTML -->
<button id="element">Help</button>
<div id="dialog"></div>
<div id="container"></div>

<!-- TypeScript -->
import { SplitButton, MenuEventArgs, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Create the Dialog (hidden by default)
const dialogObj: Dialog = new Dialog({
  width: '250px',
  header: 'Software Update',
  content: 'Are you sure you want to update?',
  target: document.getElementById('container'),
  visible: false,
  buttons: [
    {
      click: (): void => { dialogObj.hide(); },
      buttonModel: { content: 'OK', isPrimary: true }
    },
    {
      click: (): void => { dialogObj.hide(); },
      buttonModel: { content: 'Cancel' }
    }
  ]
});
dialogObj.appendTo('#dialog');

// SplitButton with select event
const items: ItemModel[] = [
  { text: 'Help' },
  { text: 'About' },
  { text: 'Update...' }
];

const splitBtn: SplitButton = new SplitButton({
  content: 'Help',
  items: items,
  select: (args: MenuEventArgs): void => {
    if (args.item.text === 'Update...') {
      dialogObj.show();
    }
  }
});
splitBtn.appendTo('#element');

The `select` event argument provides `args.item` (the selected `ItemModel`) and `args.element` (the clicked DOM element).

> Requires `@syncfusion/ej2-popups` for the Dialog component.

---

## Underline a Character in Item Text

Use the `beforeItemRender` event to manipulate the `innerHTML` of each `<li>` item and wrap specific characters in a `<u>` tag for keyboard shortcut hints.

```typescript
import { SplitButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: items,
  beforeItemRender: (args: MenuEventArgs): void => {
    // Underline the "C" in "Copy"
    if (args.item.text === 'Copy') {
      args.element.innerHTML = '<u>C</u>opy';
    }
  }
});
splitBtn.appendTo('#element');
```

Use `args.element.innerHTML` to inject HTML markup. Apply this pattern to any item text by matching `args.item.text` and replacing the character with `<u>char</u>rest`.
