# Getting Started — Syncfusion TypeScript AutoComplete

## Table of Contents
- [Installation](#installation)
- [CSS and Theme Imports](#css-and-theme-imports)
- [HTML Setup](#html-setup)
- [Basic Instantiation](#basic-instantiation)
- [Object Data with Field Mapping](#object-data-with-field-mapping)
- [Minimal Working Example](#minimal-working-example)
- [Troubleshooting](#troubleshooting)

---

## Installation

Install the Syncfusion Dropdowns package, which contains the AutoComplete component:

```bash
npm install @syncfusion/ej2-dropdowns --save
```

Peer packages are installed automatically as dependencies:

```bash
@syncfusion/ej2-base
@syncfusion/ej2-data
@syncfusion/ej2-lists
@syncfusion/ej2-inputs
@syncfusion/ej2-popups
```

---

## CSS and Theme Imports

Import a built-in theme in your stylesheet or TypeScript entry file:

```css
/* Option 1: Full bundle — import once in your main CSS */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/auto-complete/index.css";
```

For a smaller build, import only the required component styles:

```typescript
/* Option 2: Scoped imports in TypeScript entry file */
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
```

**Available themes:** `material.css`, `material3.css`, `fabric.css`, `bootstrap.css`, `bootstrap4.css`, `bootstrap5.css`, `highcontrast.css`, `tailwind.css`.

---

## HTML Setup

The AutoComplete component mounts on an `<input>` element:

```html
<input id="atc" type="text" />
```

> Only `<input type="text">` is supported as the host element. Unlike the Mention component, AutoComplete does not use a separate `target` element.

---

## Basic Instantiation

Import `AutoComplete`, create an instance, and call `appendTo()` with the input's ID:

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const sports: string[] = [
  'Badminton', 'Basketball', 'Cricket', 'Football',
  'Golf', 'Hockey', 'Rugby', 'Tennis'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  placeholder: 'Find a sport'
});

atcObj.appendTo('#atc');
```

**Behavior:** The popup stays hidden until the user types at least one character (controlled by `minLength`, default `1`). Matching items appear immediately based on the `filterType` (default `'Contains'`).

---

## Object Data with Field Mapping

When `dataSource` is an array of objects, use `fields` to tell the component which property to display and which to use as the value:

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { id: 'e1', name: 'Alice',  dept: 'Engineering' },
  { id: 'e2', name: 'Bob',    dept: 'Design'       },
  { id: 'e3', name: 'Carol',  dept: 'Engineering'  },
  { id: 'e4', name: 'David',  dept: 'Marketing'    }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: employees,
  fields: { value: 'id', text: 'name', groupBy: 'dept' },
  placeholder: 'Find an employee'
});

atcObj.appendTo('#atc');
```

**`fields` mapping:**

| Field | Description |
|---|---|
| `text` | Property rendered as the display label in the suggestion popup |
| `value` | Property used as the underlying selected value |
| `iconCss` | Property holding a CSS class to render an icon beside each item |
| `groupBy` | Property used to group items under category headers |

---

## Minimal Working Example

A complete self-contained example:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@syncfusion/ej2-fluent2-theme/styles/auto-complete/index.css" />
</head>
<body>
  <h3>AutoComplete Demo</h3>
  <input id="atc" type="text" />
  <script type="module" src="./app.js"></script>
</body>
</html>
```

```typescript
// app.ts
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const countries: string[] = [
  'Australia', 'Austria', 'Brazil', 'Canada',
  'China', 'Denmark', 'France', 'Germany',
  'India', 'Italy', 'Japan', 'Norway',
  'Sweden', 'United Kingdom', 'United States'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: countries,
  placeholder: 'Search a country',
  highlight: true
});

atcObj.appendTo('#atc');
```

**Behavior:**
1. Click into the input and type any character
2. The suggestion popup opens listing matching countries
3. Type more characters to narrow results
4. Press **Enter** or click an item to select — the value is inserted into the input
5. Press **Escape** to close the popup without selecting

---

## Troubleshooting

**Popup doesn't open:**
- Verify the `<input>` element with the given ID exists in the DOM when `appendTo()` is called
- Check that `minLength` is not set higher than the number of characters the user has typed (default is `1`)
- Confirm `dataSource` is not an empty array

**Items not appearing:**
- For object arrays, verify `fields.text` matches an actual property key in your data objects
- Check `filterType` — with `'StartsWith'`, typing `'a'` won't match `'Canada'`, but `'Contains'` will
- Ensure `ignoreCase` is `true` (default) if you expect case-insensitive matching

**Selected value is not the display text:**
- When using object arrays, the input shows the `fields.text` value after selection. If you need a different value stored, ensure `fields.value` is mapped correctly.

**CSS styles missing:**
- Confirm the theme CSS is imported before the component renders
- Check for CSS conflicts overriding `.e-autocomplete` or `.e-dropdownbase` classes
