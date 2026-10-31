# Events and Interactivity — Syncfusion Angular DropDownButton

## Table of Contents
- [Event Overview](#event-overview)
- [select — Handle Item Selection](#select--handle-item-selection)
- [open — Popup Opened](#open--popup-opened)
- [close — Popup Closed](#close--popup-closed)
- [beforeOpen — Before Popup Opens](#beforeopen--before-popup-opens)
- [beforeClose — Before Popup Closes](#beforeclose--before-popup-closes)
- [beforeItemRender — Customize Item Rendering](#beforeitemrender--customize-item-rendering)
- [created — Component Initialized](#created--component-initialized)
- [Open a Dialog on Item Click](#open-a-dialog-on-item-click)
- [Change Popup Open Position](#change-popup-open-position)

---

## Event Overview

| Event | Argument Type | When it fires |
|---|---|---|
| `select` | `MenuEventArgs` | User selects a popup action item |
| `open` | `OpenCloseMenuEventArgs` | Popup finishes opening |
| `close` | `OpenCloseMenuEventArgs` | Popup finishes closing |
| `beforeOpen` | `BeforeOpenCloseMenuEventArgs` | Before popup opens (cancellable) |
| `beforeClose` | `BeforeOpenCloseMenuEventArgs` | Before popup closes (cancellable) |
| `beforeItemRender` | `MenuEventArgs` | Each popup item is being rendered |
| `created` | `Event` | Component finishes initial render |

---

## select — Handle Item Selection

Fires when a user clicks on a popup action item. Use `args.item` to identify which item was selected.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Edit" (select)="onSelect($event)"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onSelect(args: MenuEventArgs) {
    console.log('Selected item:', args.item.text);
    // args.item contains the full ItemModel of the selected item
  }
}
```

---

## open — Popup Opened

Fires after the popup finishes opening. Use `args.element` to access the popup's DOM element (e.g., to reposition it).

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton #ddb [items]="items" content="Clipboard" (open)="onOpen($event)"></button>
  `
})
export class AppComponent {
  @ViewChild('ddb') public ddb!: DropDownButtonComponent;

  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onOpen(args: OpenCloseMenuEventArgs) {
    console.log('Popup opened', args.element);
  }
}
```

---

## close — Popup Closed

Fires after the popup finishes closing.

```typescript
onClose(args: OpenCloseMenuEventArgs) {
  console.log('Popup closed');
}
```

Template binding:
```html
<button ejs-dropdownbutton [items]="items" content="Options" (close)="onClose($event)"></button>
```

---

## beforeOpen — Before Popup Opens

Fires just before the popup opens. Set `args.cancel = true` to prevent the popup from opening.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Options" (beforeOpen)="onBeforeOpen($event)"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];

  public isDisabled = false;

  onBeforeOpen(args: BeforeOpenCloseMenuEventArgs) {
    if (this.isDisabled) {
      args.cancel = true; // Prevent popup from opening
    }
  }
}
```

---

## beforeClose — Before Popup Closes

Fires just before the popup closes. Set `args.cancel = true` to keep it open.

```typescript
onBeforeClose(args: BeforeOpenCloseMenuEventArgs) {
  // Optionally cancel closing
  // args.cancel = true;
  console.log('Popup about to close');
}
```

---

## beforeItemRender — Customize Item Rendering

Fires once for each popup item during rendering. Use it to customize the item's DOM element, add icons, add extra elements, or change content.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Clipboard"
      (beforeItemRender)="onItemRender($event)">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onItemRender(args: MenuEventArgs) {
    // Add a badge to "Copy"
    if (args.item.text === 'Copy') {
      const badge = document.createElement('span');
      badge.textContent = 'Ctrl+C';
      badge.style.float = 'right';
      badge.style.fontSize = '11px';
      args.element.appendChild(badge);
    }
  }
}
```

---

## created — Component Initialized

Fires once after the DropDownButton component completes its initial render.

```typescript
onCreated() {
  console.log('DropDownButton is ready');
}
```

Template:
```html
<button ejs-dropdownbutton [items]="items" content="Menu" (created)="onCreated()"></button>
```

---

## Open a Dialog on Item Click

Handle the `select` event to trigger a dialog when a specific menu item is clicked.

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [DropDownButtonModule, DialogModule],
  template: `
    <ejs-dialog #dialog [buttons]="dlgButtons" [visible]="false"
      content='Move Items To "Web Team"' width="250px" [position]="position">
    </ejs-dialog>
    <button ejs-dropdownbutton #ddb [items]="items" content="Move"
      iconCss="ddb-icons e-folder"
      cssClass="e-vertical"
      iconPosition="Top"
      (select)="onSelect($event)">
    </button>
  `
})
export class AppComponent {
  @ViewChild('dialog') public dialog!: DialogComponent;

  public position = { X: 100, Y: 100 };

  public dlgButtons: Object[] = [{
    buttonModel: { isPrimary: true, content: 'Submit', cssClass: 'e-flat' },
    click: function(this: DialogComponent) { this.hide(); }
  }];

  public items: ItemModel[] = [
    { text: 'Archive' },
    { text: 'Inbox' },
    { text: 'HR Portal' },
    { separator: true },
    { text: 'Other Folder...' },
    { text: 'Copy to Folder' }
  ];

  onSelect(args: MenuEventArgs) {
    if (args.item.text === 'Other Folder...') {
      this.dialog.show();
    }
  }
}
```

---

## Change Popup Open Position

Use the `open` event to programmatically reposition the popup. Access `args.element.parentElement` to modify the popup's wrapper position.

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton #ddb [items]="items" content="Clipboard" (open)="onOpen($event)"></button>
  `
})
export class AppComponent {
  @ViewChild('ddb') public ddb!: DropDownButtonComponent;

  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onOpen(args: OpenCloseMenuEventArgs) {
    // Position popup above the button instead of below
    const popupWrapper = args.element.parentElement!;
    const buttonRect = this.ddb.element.getBoundingClientRect();
    popupWrapper.style.top = (buttonRect.top - popupWrapper.offsetHeight) + 'px';
  }
}
```
