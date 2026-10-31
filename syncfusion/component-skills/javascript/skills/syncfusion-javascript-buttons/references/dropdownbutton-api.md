# API Reference — Syncfusion EJ2 JavaScript DropdownButton

Source: https://ej2.syncfusion.com/javascript/documentation/api/drop-down-button/

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Type Definitions](#type-definitions)

---

## Import

```typescript
import { DropdownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
```

---

## Properties

### items `ItemModel[]`

Array of items to display in the dropdown popup.

- **Type:** `ItemModel[]`
- **Default:** `[]`

```typescript
const items: ItemModel[] = [
  { text: 'Edit' },
  { text: 'Delete' },
  { separator: true },
  { text: 'Save' },
];

new DropdownButton({ items: items });
```

---

### content `string`

Text or HTML content displayed inside the button element.

- **Type:** `string`
- **Default:** `""`

```typescript
new DropdownButton({
  items: items,
  content: 'Actions'
});
```

---

### iconCss `string`

CSS class(es) for the button icon. Supports Syncfusion built-in icons, Font Awesome, or any font-icon class.

- **Type:** `string`
- **Default:** `""`

```typescript
new DropdownButton({
  items: items,
  iconCss: 'e-icons e-menu',
  content: 'Menu'
});
```

---

### iconPosition `string`

Position of the icon relative to button text: `"Left"` | `"Right"` | `"Top"` | `"Bottom"`.

- **Type:** `string`
- **Default:** `"Left"`

```typescript
new DropdownButton({
  items: items,
  iconCss: 'e-icons e-settings',
  iconPosition: 'Top',
  content: 'Settings'
});
```

---

### cssClass `string`

One or more space-separated CSS class names. Common values:
- Color: `e-primary`, `e-success`, `e-danger`, `e-warning`, `e-info`
- Style: `e-outline`, `e-flat`, `e-round-corner`
- Size: `e-small`, `e-large`
- Layout: `e-vertical`, `e-caret-hide`

- **Type:** `string`
- **Default:** `""`

```typescript
new DropdownButton({
  items: items,
  cssClass: 'e-primary e-small e-round-corner',
  content: 'Action'
});
```

---

### disabled `boolean`

Disables the button. A disabled button cannot be interacted with and is visually grayed out.

- **Type:** `boolean`
- **Default:** `false`

```typescript
new DropdownButton({
  items: items,
  disabled: true,
  content: 'Disabled'
});
```

---

### enableRtl `boolean`

Renders the component in right-to-left (RTL) direction for RTL locales (Arabic, Hebrew, etc.).

- **Type:** `boolean`
- **Default:** `false`

```typescript
new DropdownButton({
  items: items,
  enableRtl: true,
  content: 'قائمة'
});
```

---

### popupWidth `string`

Width of the popup element. Accepts CSS values like `"250px"`, `"auto"`, `"100%"`.

- **Type:** `string`
- **Default:** `"auto"`

```typescript
new DropdownButton({
  items: items,
  popupWidth: '350px',
  content: 'Menu'
});
```

---

### target `string`

Specifies the target element or selector where the popup should open relative to.

- **Type:** `string`
- **Default:** `null`

```typescript
new DropdownButton({
  items: items,
  target: '#custom-container',
  content: 'Menu'
});
```

---

### enablePersistence `boolean`

When `true`, persists the component state across page reloads using browser local storage.

- **Type:** `boolean`
- **Default:** `false`

```typescript
new DropdownButton({
  items: items,
  enablePersistence: true,
  content: 'Menu'
});
```

---

### enableHtmlSanitizer `boolean`

When `true`, sanitizes untrusted HTML before rendering to prevent XSS attacks.

- **Type:** `boolean`
- **Default:** `true`

```typescript
new DropdownButton({
  items: items,
  enableHtmlSanitizer: true,
  content: 'Menu'
});
```

---

### animationSettings `AnimationSettings`

Configuration for popup animation: `effect`, `duration`, `easing`.

- **Type:** `AnimationSettings`
- **Effects:** `'None'` | `'SlideDown'` | `'ZoomIn'` | `'FadeIn'`

```typescript
new DropdownButton({
  items: items,
  animationSettings: { effect: 'SlideDown', duration: 800 },
  content: 'Menu'
});
```

---

### itemTemplate `Function`

Function to customize item rendering. Receives a data object and returns HTML string.

- **Type:** `(data: any) => string`
- **Default:** `null`

```typescript
new DropdownButton({
  items: items,
  itemTemplate: (data: any) => {
    return `<div>${data.properties.text}</div>`;
  },
  content: 'Menu'
});
```

---

### beforeItemRender `Function`

Event handler called before each item is rendered. Receives `MenuEventArgs` with item and element.

- **Type:** `(args: MenuEventArgs) => void`

```typescript
new DropdownButton({
  items: items,
  beforeItemRender: (args: MenuEventArgs) => {
    // Customize item appearance
    args.element.style.color = 'blue';
  },
  content: 'Menu'
});
```

---

## Events

### select

Fires when a popup item is selected/clicked. Provides the selected `ItemModel` via `args.item`.

```typescript
new DropdownButton({
  items: items,
  select: (args: MenuEventArgs) => {
    console.log('Selected:', args.item.text);
  },
  content: 'Menu'
});
```

---

### beforeOpen

Fires before the popup opens. Use to update items or prevent opening.

```typescript
new DropdownButton({
  items: items,
  beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
    console.log('Popup about to open');
    args.cancel = false; // Set to true to prevent opening
  },
  content: 'Menu'
});
```

---

### beforeClose

Fires before the popup closes.

```typescript
new DropdownButton({
  items: items,
  beforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
    console.log('Popup about to close');
  },
  content: 'Menu'
});
```

---

### open

Fires after the popup is positioned and opened.

```typescript
new DropdownButton({
  items: items,
  open: (args: OpenCloseMenuEventArgs) => {
    console.log('Popup opened');
  },
  content: 'Menu'
});
```

---

### close

Fires after the popup is closed.

```typescript
new DropdownButton({
  items: items,
  close: (args: OpenCloseMenuEventArgs) => {
    console.log('Popup closed');
  },
  content: 'Menu'
});
```

---

### created

Fires after the component is created and initialized.

```typescript
new DropdownButton({
  items: items,
  created: () => {
    console.log('Component created');
  },
  content: 'Menu'
});
```

---

## Methods

### appendTo(element)

Renders the component inside the specified DOM element or selector.

- **Signature:** `appendTo(element: string | HTMLElement): void`

```typescript
const dropdown = new DropdownButton({ items: items });
dropdown.appendTo('#dropdownbutton');
// or
dropdown.appendTo(document.getElementById('dropdownbutton'));
```

---

### toggle()

Opens or closes the popup programmatically.

- **Signature:** `toggle(): void`

```typescript
const dropdown = new DropdownButton({ items: items });
dropdown.appendTo('#dropdownbutton');

dropdown.toggle(); // Open popup
dropdown.toggle(); // Close popup
```

---

### refresh()

Refreshes the component to reflect changes in items or properties.

- **Signature:** `refresh(): void`

```typescript
const dropdown = new DropdownButton({ items: items });

// Add item
dropdown.items.push({ text: 'New Item' });
dropdown.refresh();
```

---

### destroy()

Destroys the component and removes it from the DOM.

- **Signature:** `destroy(): void`

```typescript
const dropdown = new DropdownButton({ items: items });
// ... use component ...
dropdown.destroy();
```

---

## ItemModel Interface

Defines the structure of popup items:

```typescript
interface ItemModel {
  text?: string;                // Display text
  iconCss?: string;             // Icon CSS class
  id?: string;                  // Unique identifier
  url?: string;                 // Navigation URL
  disabled?: boolean;           // Item is disabled
  separator?: boolean;          // Render as separator line
  [key: string]: any;           // Custom properties
}
```

### Example with Custom Properties

```typescript
interface CustomItemModel extends ItemModel {
  badge?: number;
  description?: string;
  category?: string;
}

const items: CustomItemModel[] = [
  { 
    text: 'Save', 
    iconCss: 'e-icons e-save',
    badge: 1,
    description: 'Save the document'
  },
  { 
    text: 'Delete', 
    iconCss: 'e-icons e-delete',
    description: 'Remove the item'
  },
];
```

---

## MenuEventArgs Interface

Passed to event handlers like `select`, `beforeItemRender`:

```typescript
interface MenuEventArgs {
  item: ItemModel;              // Selected/rendered item
  element: HTMLElement;         // DOM element of item
  event: MouseEvent | KeyboardEvent; // Triggering event
}
```

---

## BeforeOpenCloseMenuEventArgs Interface

Passed to `beforeOpen` and `beforeClose` events:

```typescript
interface BeforeOpenCloseMenuEventArgs {
  element: HTMLElement;         // Popup element
  cancel?: boolean;             // Set to true to cancel action
}
```

---

## OpenCloseMenuEventArgs Interface

Passed to `open` and `close` events:

```typescript
interface OpenCloseMenuEventArgs {
  element: HTMLElement;         // Popup element
  event: Event;                 // Triggering event
}
```
