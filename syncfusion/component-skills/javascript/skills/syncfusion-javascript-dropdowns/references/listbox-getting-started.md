# Getting Started with JavaScript ListBox

## Table of Contents
- [Installation](#installation)
- [Adding CSS References](#adding-css-references)
- [HTML Setup](#html-setup)
- [Creating Your First ListBox](#creating-your-first-listbox)
- [ListBox with Change Handler](#listbox-with-change-handler)
- [ListBox with Multiple Selection](#listbox-with-multiple-selection)
- [Troubleshooting](#troubleshooting)

---

## Installation

The ListBox component is part of the Syncfusion EJ2 dropdowns package. Install it using npm:

```bash
npm install @syncfusion/ej2-dropdowns --save
```

**What gets installed:**
- ListBox component
- Related dropdown components (ComboBox, DropDownList, AutoComplete)
- Built-in styling system

---

## Adding CSS References

Syncfusion provides multiple theme options. Link the CSS in your HTML file or import in your entry file.

### Via HTML `<link>` tag

```html
<!-- index.html -->
<link href="../../node_modules/@syncfusion/ej2-fluent2-theme/styles/list-box/index.css" rel="stylesheet" />
```

### Via ES Module import (Webpack / Vite)

```ts
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/list-box/index.css";
```

### Available Themes

| Theme | Import Path Suffix |
|---|---|
| Tailwind 3 (recommended) | `tailwind3.css` |
| Material | `material.css` |
| Bootstrap 5 | `bootstrap5.css` |
| Fluent | `fluent.css` |
| Fabric | `fabric.css` |

---

## HTML Setup

The ListBox renders into a `<div>` element. Provide a container element with an `id`:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <link href="../../node_modules/@syncfusion/ej2-fluent2-theme/styles/list-box/index.css" rel="stylesheet" />
</head>
<body>
  <div id="listbox"></div>
  <script src="index.js"></script>
</body>
</html>
```

---

## Creating Your First ListBox

### Basic ListBox with Static Data

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Vue', id: '4' },
  { text: 'Angular', id: '5' },
  { text: 'Svelte', id: '6' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');
```

### Array of Strings (Simple Alternative)

For plain lists without IDs:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: ['JavaScript', 'TypeScript', 'React', 'Vue']
});

listBox.appendTo('#listbox');
```

---

## ListBox with Change Handler

Capture the selected item on user interaction:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Vue', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  change: (args) => {
    console.log('Selected Item Value:', args.value);
    console.log('Selected Item(s):', args.items);
  }
});

listBox.appendTo('#listbox');
```

---

## ListBox with Multiple Selection

Enable multiple item selection (Ctrl+Click or Shift+Click):

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'HTML', id: '1' },
  { text: 'CSS', id: '2' },
  { text: 'JavaScript', id: '3' },
  { text: 'TypeScript', id: '4' },
  { text: 'React', id: '5' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' },
  change: (args) => {
    console.log('Selected values:', args.value);
  }
});

listBox.appendTo('#listbox');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| ListBox not rendering | Missing `appendTo` call | Call `listBox.appendTo('#id')` after instantiation |
| No styles applied | Missing CSS imports | Import all three CSS files (base, inputs, dropdowns) |
| Items not showing | Wrong `fields` mapping | Verify `fields.text` and `fields.value` match your data keys |
| Change event not firing | Typo in event name | Use `change` (lowercase) in the model object |
