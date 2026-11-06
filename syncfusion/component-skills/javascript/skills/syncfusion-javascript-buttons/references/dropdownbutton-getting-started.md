# Getting Started — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Component](#basic-component)
- [Binding Data Source](#binding-data-source)
- [Run the Application](#run-the-application)

---

## Prerequisites

- Node.js 14+
- Modern browser (Chrome, Firefox, Safari, Edge)

---

## Installation

Install the Syncfusion split-buttons package (which includes DropdownButton):

```bash
npm install @syncfusion/ej2-splitbuttons --save
```

---

## CSS Imports

Add the required CSS files to your HTML file or CSS imports:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/drop-down-button/index.css";
```

Or include via CDN in HTML:

```html
<link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/tailwind3.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/tailwind3.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/tailwind3.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/tailwind3.css" rel="stylesheet" />
```

> Other available themes: `material3`, `bootstrap5`, `fluent2`, `fabric`. Replace `tailwind3` with the desired theme name in all four imports.

---

## Basic Component

Create an HTML element for the DropdownButton:

```html
<button id="dropdownbutton"></button>
```

Render an empty DropdownButton (no popup items yet):

```typescript
import { DropdownButton } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const dropdownButton: DropdownButton = new DropdownButton();
dropdownButton.appendTo('#dropdownbutton');
```

`enableRipple(true)` adds a Material-style ripple effect on click. Call it once at the application entry point.

---

## Binding Data Source

Populate the popup using the `items` array property with item objects. Each item requires at minimum a `text` property:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
];

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'Clipboard'
});
dropdownButton.appendTo('#dropdownbutton');
```

**ItemModel fields commonly used:**

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Label displayed in the popup |
| `iconCss` | `string` | CSS class(es) for an icon |
| `url` | `string` | Navigation URL for the item |
| `separator` | `boolean` | Renders a horizontal divider |
| `disabled` | `boolean` | Disables a specific item |
| `id` | `string` | Unique identifier for the item |

---

## HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/tailwind3.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/tailwind3.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/tailwind3.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/tailwind3.css" rel="stylesheet" />
</head>
<body>
  <button id="dropdownbutton"></button>
  <script src="bundle.js"></script>
</body>
</html>
```

---

## TypeScript Setup

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Define items
const items: ItemModel[] = [
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
];

// Create DropdownButton
const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  content: 'Clipboard',
  iconCss: 'e-icons e-clipboard',
  click: (args: any): void => {
    console.log('Clicked item:', args.item.text);
  }
});

dropdownButton.appendTo('#dropdownbutton');
```

---

## Run the Application

Build and run your application:

```bash
npm run build
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`). The DropdownButton renders with a caret; clicking it opens the popup with the configured items.

---

## What's Next?

- Configure popup items and icons → [dropdownbutton-popup-items.md](dropdownbutton-popup-items.md)
- Customize appearance and styling → [dropdownbutton-appearance-and-styling.md](dropdownbutton-appearance-and-styling.md)
- Handle events and interactions → [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
- Full API reference → [dropdownbutton-api.md](dropdownbutton-api.md)
