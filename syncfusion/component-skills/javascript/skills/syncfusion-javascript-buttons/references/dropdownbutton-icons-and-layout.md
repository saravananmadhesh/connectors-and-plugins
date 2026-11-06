# Icons and Layout — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [Button Icon with iconCss](#button-icon-with-iconcss)
- [Icon Position](#icon-position)
- [Icon-Only Button](#icon-only-button)
- [Sprite Image Icons](#sprite-image-icons)
- [Vertical Button Layout](#vertical-button-layout)
- [Customize Icon and Button Size](#customize-icon-and-button-size)

---

## Button Icon with iconCss

Use the `iconCss` property to render an icon inside the DropdownButton. Set it to one or more CSS class names that define the icon. The `e-icons` class provides Syncfusion's built-in icon set.

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit' },
  { text: 'Delete' },
  { text: 'Mark as Read' },
  { text: 'Like Message' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-message',
  content: 'Message'
});
dropdownButton.appendTo('#dropdownbutton');
```

> Third-party icon libraries (Font Awesome, Bootstrap Icons, etc.) work the same way — pass the relevant class names to `iconCss`.

### Using Font Awesome Icons

```typescript
const items: ItemModel[] = [
  { text: 'Edit', iconCss: 'fa fa-edit' },
  { text: 'Delete', iconCss: 'fa fa-trash' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'fa fa-envelope',
  content: 'Message'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Icon Position

Control where the icon appears relative to the button text using `iconPosition`. Accepted values: `"Left"` (default) | `"Right"` | `"Top"` | `"Bottom"`.

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit' },
  { text: 'Delete' },
  { text: 'Mark as Read' },
];

// Icon on the left (default)
const leftIcon: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-message',
  iconPosition: 'Left',
  content: 'Message'
});
leftIcon.appendTo('#left-icon');

// Icon on top
const topIcon: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-message',
  iconPosition: 'Top',
  content: 'Message'
});
topIcon.appendTo('#top-icon');

// Icon on right
const rightIcon: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-message',
  iconPosition: 'Right',
  content: 'Message'
});
rightIcon.appendTo('#right-icon');
```

---

## Icon-Only Button

Create an icon-only button (no text, no caret) by:
1. Setting `iconCss` (required for the icon)
2. Adding `e-caret-hide` via `cssClass` to hide the dropdown arrow
3. Omitting button content (leave content empty)

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'New tab' },
  { text: 'New window' },
  { text: 'New incognito window' },
  { separator: true },
  { text: 'Print' },
  { text: 'Cast' },
  { text: 'Find' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-menu',
  cssClass: 'e-caret-hide'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Sprite Image Icons

Use custom sprite images instead of CSS classes. Create a sprite stylesheet and apply to items:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit', iconCss: 'sprite-icon edit-icon' },
  { text: 'Delete', iconCss: 'sprite-icon delete-icon' },
  { text: 'Refresh', iconCss: 'sprite-icon refresh-icon' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'sprite-icon main-icon',
  content: 'Actions'
});
dropdownButton.appendTo('#dropdownbutton');
```

**Accompanying CSS:**

```css
.sprite-icon {
  background-image: url('path/to/sprite.png');
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
}

.edit-icon {
  background-position: 0 0;
}

.delete-icon {
  background-position: -24px 0;
}

.refresh-icon {
  background-position: -48px 0;
}

.main-icon {
  background-position: -72px 0;
}
```

---

## Vertical Button Layout

Display items vertically by adding custom CSS:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'First', iconCss: 'e-icons e-one' },
  { text: 'Second', iconCss: 'e-icons e-two' },
  { text: 'Third', iconCss: 'e-icons e-three' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-settings',
  cssClass: 'e-vertical',
  content: 'Options'
});
dropdownButton.appendTo('#dropdownbutton');
```

---

## Customize Icon and Button Size

Control icon and button dimensions using CSS:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Small', iconCss: 'e-icons e-arrow-down' },
  { text: 'Medium', iconCss: 'e-icons e-arrow-down' },
  { text: 'Large', iconCss: 'e-icons e-arrow-down' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-settings',
  cssClass: 'custom-size',
  content: 'Size'
});
dropdownButton.appendTo('#dropdownbutton');
```

**Custom CSS:**

```css
/* Large button with large icons */
.custom-size {
  font-size: 18px;
  padding: 12px 16px;
}

.custom-size .e-icons::before {
  font-size: 20px;
}

/* Small button with small icons */
.custom-size.e-small {
  font-size: 12px;
  padding: 6px 10px;
}

.custom-size.e-small .e-icons::before {
  font-size: 14px;
}
```

---

## Popup Content Layout

Control how popup items are displayed:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Item 1', iconCss: 'e-icons e-one' },
  { text: 'Item 2', iconCss: 'e-icons e-two' },
  { text: 'Item 3', iconCss: 'e-icons e-three' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'Menu',
  target: '#popup-target' // Optional: specify custom popup target
});
dropdownButton.appendTo('#dropdownbutton');
```
