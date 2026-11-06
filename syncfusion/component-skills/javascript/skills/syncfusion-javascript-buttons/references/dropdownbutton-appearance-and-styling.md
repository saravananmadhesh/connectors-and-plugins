# Appearance and Styling — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [CSS Class Reference](#css-class-reference)
- [Color Styles](#color-styles)
- [Size Variants](#size-variants)
- [Rounded Corners](#rounded-corners)
- [Hide Dropdown Arrow](#hide-dropdown-arrow)
- [Popup Width and Position](#popup-width-and-position)
- [Custom Styling](#custom-styling)

---

## CSS Class Reference

Override default styles by targeting these CSS classes:

| CSS Class | Purpose |
|-----------|---------|
| `.e-dropdown-btn` | Container for the DropdownButton component |
| `.e-dropdown-btn.e-primary` | Primary color styling |
| `.e-dropdown-btn.e-success` | Success (green) color styling |
| `.e-dropdown-btn.e-info` | Info (blue) color styling |
| `.e-dropdown-btn.e-warning` | Warning (orange) color styling |
| `.e-dropdown-btn.e-danger` | Danger (red) color styling |
| `.e-dropdown-btn.e-outline` | Outline (bordered, transparent fill) styling |
| `.e-dropdown-btn.e-flat` | Flat (no border/shadow) styling |
| `.e-dropdown-btn:hover` | Hover state |
| `.e-dropdown-btn.e-active` | Active / pressed state |
| `.e-dropdown-btn:disabled` | Disabled state |
| `.e-dropdown-btn.e-small` | Small size |
| `.e-dropdown-btn.e-large` | Large size |
| `.e-dropdown-popup` | Popup container |
| `.e-dropdown-popup .e-item` | Individual popup item |
| `.e-dropdown-popup .e-item:hover` | Popup item hover state |
| `.e-dropdown-popup .e-item.e-selected` | Selected popup item |
| `.e-dropdown-popup .e-item.e-disabled` | Disabled popup item |
| `.e-dropdown-popup .e-separator` | Separator between items |

---

## Color Styles

Apply predefined color styles using `cssClass`:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
];

// Primary
const primary: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-primary',
  content: 'Primary'
});
primary.appendTo('#primary');

// Success
const success: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-success',
  content: 'Success'
});
success.appendTo('#success');

// Danger
const danger: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-danger',
  content: 'Danger'
});
danger.appendTo('#danger');

// Outline
const outline: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-outline',
  content: 'Outline'
});
outline.appendTo('#outline');

// Flat
const flat: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-flat',
  content: 'Flat'
});
flat.appendTo('#flat');
```

Multiple classes can be combined (space-separated):

```typescript
const smallPrimary: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-primary e-small',
  content: 'Small Primary'
});
smallPrimary.appendTo('#small-primary');
```

---

## Size Variants

| Class | Effect |
|-------|--------|
| `e-small` | Compact height and font |
| `e-large` | Larger height and font |
| *(default)* | Normal size |

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];

// Small button
const small: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-small',
  content: 'Small'
});
small.appendTo('#small');

// Normal button (default)
const normal: DropdownButton = new DropdownButton({
  items: items,
  content: 'Normal'
});
normal.appendTo('#normal');

// Large button
const large: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-large',
  content: 'Large'
});
large.appendTo('#large');
```

---

## Rounded Corners

Add `e-round-corner` via `cssClass` to apply rounded borders:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', iconCss: 'e-icons e-delete' },
  { text: 'Share', iconCss: 'e-icons e-share' },
];

const roundedButton: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-round-corner e-primary',
  content: 'Actions'
});
roundedButton.appendTo('#rounded-button');
```

---

## Hide Dropdown Arrow

Add `e-caret-hide` via `cssClass` to hide the dropdown caret:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' },
];

const noCaretButton: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'e-caret-hide',
  iconCss: 'e-icons e-menu',
  content: 'Menu'
});
noCaretButton.appendTo('#no-caret');
```

---

## Popup Width and Position

Control popup dimensions:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Short Item' },
  { text: 'This is a much longer item text' },
  { text: 'Medium' },
];

const customPopup: DropdownButton = new DropdownButton({
  items: items,
  content: 'Menu',
  popupWidth: '300px' // Set custom popup width
});
customPopup.appendTo('#custom-popup');
```

---

## Custom Styling

Apply custom CSS classes for unique styling:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];

const styledButton: DropdownButton = new DropdownButton({
  items: items,
  cssClass: 'custom-dropdown',
  content: 'Styled'
});
styledButton.appendTo('#styled');
```

**Custom CSS:**

```css
.custom-dropdown {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
}

.custom-dropdown:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.custom-dropdown:active {
  transform: translateY(0);
}

.custom-dropdown .e-icons::before {
  color: white;
}

.e-dropdown-popup.custom-popup {
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

.e-dropdown-popup.custom-popup .e-item:hover {
  background-color: #f0f0f0;
}
```

---

## Theme Support

All components support multiple themes. Include the desired theme CSS:

```html
<!-- Material 3 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material3.css" rel="stylesheet" />

<!-- Bootstrap 5 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/bootstrap5.css" rel="stylesheet" />

<!-- Fluent Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/fluent2.css" rel="stylesheet" />

<!-- Fabric Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/fabric.css" rel="stylesheet" />

<!-- Tailwind Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/tailwind3.css" rel="stylesheet" />
```
