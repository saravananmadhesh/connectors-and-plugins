# Icons and Appearance — Syncfusion Angular DropDownButton

## Table of Contents
- [Button Icon with iconCss](#button-icon-with-iconcss)
- [Icon Position](#icon-position)
- [Vertical Button Layout](#vertical-button-layout)
- [Icon-Only Button](#icon-only-button)
- [Sprite Image Icon](#sprite-image-icon)
- [Hiding the Dropdown Arrow](#hiding-the-dropdown-arrow)
- [Rounded Corner Styling](#rounded-corner-styling)
- [Customizing Icon Size and Button Width](#customizing-icon-size-and-button-width)
- [Dynamic Caret Icon Change](#dynamic-caret-icon-change)

---

## Button Icon with iconCss

Use the `iconCss` property to add an icon to the button itself. Provide an icon CSS class from the Syncfusion icon library or any third-party icon font.

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message" iconCss="ddb-icons e-message"></button>
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

> Syncfusion provides built-in icons via the `e-icons` class prefix (e.g., `e-icons e-copy`). Third-party icon fonts are also supported.

---

## Icon Position

By default the icon appears on the **left** of the button text. Use `iconPosition="Top"` to place the icon above the text.

```html
<!-- Default: icon on left -->
<button ejs-dropdownbutton [items]="items" content="Message" iconCss="ddb-icons e-message"></button>

<!-- Icon on top -->
<button ejs-dropdownbutton [items]="items" content="Message" iconCss="ddb-icons e-message" iconPosition="Top"></button>
```

Valid values for `iconPosition`: `"Left"` (default), `"Top"`.

---

## Vertical Button Layout

To stack the icon above the text in a tall vertical style, combine `iconPosition="Top"` with `cssClass="e-vertical"`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message"
      iconCss="ddb-icons e-message"
      cssClass="e-vertical"
      iconPosition="Top">
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

## Icon-Only Button

To create an icon-only button without text and without the dropdown arrow, use `iconCss` without `content`, and add `cssClass="e-caret-hide"`:

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" iconCss="e-icons e-menu" cssClass="e-caret-hide"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'New tab' },
    { text: 'New window' },
    { text: 'New incognito window' },
    { separator: true },
    { text: 'Print' },
    { text: 'Cast' },
    { text: 'Find' }
  ];
}
```

---

## Sprite Image Icon

To use a sprite image instead of a font icon, set `iconCss` to a custom class that applies a `background-image` with X/Y positioning. Set width and height on the icon element via CSS.

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" iconCss="e-image" cssClass="e-caret-hide"></button>
  `,
  styles: [`
    .e-image {
      background-image: url('path/to/sprite.png');
      background-position: -10px -20px;
      width: 32px;
      height: 32px;
    }
  `]
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Display Settings' },
    { text: 'System Settings' },
    { text: 'Additional Settings' }
  ];
}
```

---

## Hiding the Dropdown Arrow

To remove the dropdown caret arrow from the button, add `e-caret-hide` to the `cssClass` property:

```html
<button ejs-dropdownbutton [items]="items" content="Clipboard" cssClass="e-caret-hide"></button>
```

This is useful when you want the button to look like a plain button with no visual hint of a dropdown.

---

## Rounded Corner Styling

Apply a custom CSS class that adds `border-radius` to achieve a rounded corner button:

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Clipboard" cssClass="e-round-corner"></button>
  `,
  styles: [`
    .e-round-corner {
      border-radius: 5px;
    }
  `]
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

---

## Customizing Icon Size and Button Width

To set a custom button width and enlarge the icon, apply a custom CSS class. Use `iconPosition="Top"` for a top-icon layout:

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Find & Select"
      iconCss="e-icons e-search"
      iconPosition="Top"
      cssClass="e-custom">
    </button>
  `,
  styles: [`
    .e-custom {
      width: 85px;
    }
    .e-custom .e-btn-icon {
      font-size: 40px;
    }
  `]
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Find' },
    { text: 'Replace' },
    { text: 'Go To' },
    { text: 'Go To Special' }
  ];
}
```

---

## Dynamic Caret Icon Change

Change the caret arrow direction when the popup opens/closes using the `beforeOpen` and `beforeClose` events. Add `e-caret-up` class when open, remove it when closed:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DropDownButtonModule, DropDownButtonComponent, ItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton #ddb [items]="items" content="Clipboard"
      (beforeOpen)="onBeforeOpen($event)"
      (beforeClose)="onBeforeClose($event)">
    </button>
  `
})
export class AppComponent {
  @ViewChild('ddb') public ddb!: DropDownButtonComponent;

  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onBeforeOpen(args: BeforeOpenCloseMenuEventArgs) {
    this.ddb.cssClass = 'e-caret-up';
  }

  onBeforeClose(args: BeforeOpenCloseMenuEventArgs) {
    this.ddb.cssClass = '';
  }
}
```

The `e-caret-up` CSS class rotates the caret to point upward, providing a visual cue that the popup is open.
