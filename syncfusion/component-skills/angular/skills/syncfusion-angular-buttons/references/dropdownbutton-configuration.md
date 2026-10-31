# Configuration and Behavior — Syncfusion Angular DropDownButton

## Table of Contents
- [Disabling the Button](#disabling-the-button)
- [RTL Support](#rtl-support)
- [Popup Width](#popup-width)
- [Create Popup on Click](#create-popup-on-click)
- [HTML Sanitizer](#html-sanitizer)
- [Close Action Events](#close-action-events)
- [Enable Persistence](#enable-persistence)
- [Dynamic Item Management](#dynamic-item-management)
- [Toggle Popup Programmatically](#toggle-popup-programmatically)

---

## Disabling the Button

Set `disabled="true"` or bind `[disabled]="true"` to make the DropDownButton non-interactive. The button is visually grayed out and the popup cannot be opened.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message"
      iconCss="ddb-icons e-message"
      [disabled]="true">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Edit' },
    { text: 'Delete' },
    { text: 'Mark as Read' },
    { text: 'Like Message' }
  ];
}
```

To toggle disabled state dynamically:
```typescript
// In component
public isDisabled = false;
toggleDisabled() { this.isDisabled = !this.isDisabled; }
```
```html
<button ejs-dropdownbutton [items]="items" content="Options" [disabled]="isDisabled"></button>
```

---

## RTL Support

Enable right-to-left layout with `enableRtl="true"`. This flips the button layout and popup direction for RTL languages.

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message"
      iconCss="ddb-icons e-message"
      enableRtl="true">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Edit' },
    { text: 'Delete' },
    { text: 'Mark as Read' },
    { text: 'Like Message' }
  ];
}
```

---

## Popup Width

By default, the popup width adapts to its content. Use `popupWidth` to fix the popup to a specific width for visual consistency.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" [popupWidth]="'200px'" content="DropDownButton"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Selection', iconCss: 'e-icons e-list-unordered' },
    { text: 'Yes / No',  iconCss: 'e-icons e-check-box' },
    { text: 'Text',      iconCss: 'e-icons e-caption' },
    { text: 'None',      iconCss: 'e-icons e-mouse-pointer' }
  ];
}
```

`popupWidth` accepts CSS strings (`'200px'`, `'15rem'`, `'50%'`) or raw numbers (treated as pixels).

---

## Create Popup on Click

By default the popup element is created during component initialization. Set `createPopupOnClick="true"` to defer popup DOM creation until the first click. This improves initial page load performance when many DropDownButtons are present.

```html
<button ejs-dropdownbutton [items]="items" content="Deferred" createPopupOnClick="true"></button>
```

---

## HTML Sanitizer

The `enableHtmlSanitizer` property (default: `true`) strips potentially unsafe HTML from button `content` and item `text` values before rendering. Set to `false` only if you control all input and need raw HTML rendering.

```html
<!-- Allow HTML in content (use with trusted content only) -->
<button ejs-dropdownbutton [items]="items" [enableHtmlSanitizer]="false"
  content="<b>Bold</b> Menu">
</button>
```

---

## Close Action Events

The `closeActionEvents` property specifies the DOM event that closes the popup. By default the popup closes on any outside click. Customize this to change the trigger.

```html
<button ejs-dropdownbutton [items]="items" content="Options" closeActionEvents="mouseout"></button>
```

---

## Enable Persistence

When `enablePersistence="true"`, the component's state (e.g., `disabled`, `cssClass`) is saved to `localStorage` and restored on page reload.

```html
<button ejs-dropdownbutton [items]="items" content="Persistent" enablePersistence="true"></button>
```

---

## Dynamic Item Management

Use the `addItems` and `removeItems` methods to modify the popup items at runtime. Get a reference to the component with `@ViewChild`.

### Add Items

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton #ddb [items]="items" content="Edit"></button>
    <button (click)="addItem()">Add Item</button>
  `
})
export class AppComponent {
  @ViewChild('ddb') public ddb!: DropDownButtonComponent;

  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' }
  ];

  addItem() {
    // Append a new item at the end
    this.ddb.addItems([{ text: 'Paste' }]);

    // Insert before 'Copy' (second parameter is the text of the item to insert before)
    // this.ddb.addItems([{ text: 'Undo' }], 'Copy');
  }
}
```

### Remove Items

```typescript
removeItem() {
  // Remove by item text
  this.ddb.removeItems(['Cut']);

  // Remove by unique id (if items have 'id' set)
  // this.ddb.removeItems(['item-id-1'], true);
}
```

---

## Toggle Popup Programmatically

Call `toggle()` to open or close the popup based on its current state:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton #ddb [items]="items" content="Menu"></button>
    <button (click)="togglePopup()">Toggle Popup</button>
  `
})
export class AppComponent {
  @ViewChild('ddb') public ddb!: DropDownButtonComponent;

  public items: ItemModel[] = [
    { text: 'Option A' },
    { text: 'Option B' }
  ];

  togglePopup() {
    this.ddb.toggle();
  }
}
```

### Set Focus Programmatically

Use `focusIn()` to move keyboard focus to the DropDownButton element:

```typescript
this.ddb.focusIn();
```
