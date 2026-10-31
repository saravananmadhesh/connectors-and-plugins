# Getting Started — Syncfusion TypeScript Mention

## Table of Contents
- [Installation](#installation)
- [CSS and Theme Imports](#css-and-theme-imports)
- [HTML Setup](#html-setup)
- [Basic Instantiation](#basic-instantiation)
- [Trigger Character](#trigger-character)
- [Minimal Working Example](#minimal-working-example)
- [Troubleshooting](#troubleshooting)

---

## Installation

Install the Syncfusion Dropdowns package, which contains the Mention component:

```bash
npm install @syncfusion/ej2-dropdowns --save
```

The Mention component depends on these peer packages (installed automatically as dependencies):

```bash
@syncfusion/ej2-base
@syncfusion/ej2-data
@syncfusion/ej2-lists
@syncfusion/ej2-popups
```

---

## CSS and Theme Imports

Import a built-in theme in your stylesheet or entry file. The `material.css` bundle is the quickest option:

```css
/* Option 1: Full bundle — import once in your main CSS or index.ts */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/mention/index.css";
```

For a smaller build, import only the required component styles:

```typescript
/* Option 2: Scoped imports in TypeScript entry file */
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
```

**Available themes:** `material.css`, `fabric.css`, `bootstrap.css`, `bootstrap4.css`, `bootstrap5.css`, `highcontrast.css`, `tailwind.css`.

---

## HTML Setup

The Mention component needs two elements:

1. **Target element** — the textarea, input, or contenteditable div where the user types. This is the element the Mention component listens to.
2. **Host element** — a placeholder `<div>` or `<input>` that the Mention component mounts on via `appendTo()`. It does not need to be visible.

```html
<!-- Target: the editable element the user types in -->
<textarea id="mentionTarget" rows="5" cols="40"
  placeholder="Type @ to mention someone"></textarea>

<!-- Host: the element Mention is instantiated on -->
<div id="mention-element"></div>
```

**Supported target element types:**
- `<textarea>` — standard multi-line input
- `<input type="text">` — single-line input
- `contenteditable="true"` div — rich text scenarios

---

## Basic Instantiation

Import `Mention` and create an instance pointing to the target element. Call `appendTo()` on the host element.

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const userData: { [key: string]: Object }[] = [
  { name: 'Alice',   id: 'alice'  },
  { name: 'Bob',     id: 'bob'    },
  { name: 'Carol',   id: 'carol'  },
  { name: 'David',   id: 'david'  },
  { name: 'Eve',     id: 'eve'    }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',   // CSS selector or HTMLElement reference
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});

mentionObj.appendTo('#mention-element');
```

**`target`** can be a CSS selector string (`'#myTextarea'`) or a direct `HTMLElement` reference:

```typescript
const targetEl = document.getElementById('mentionTarget') as HTMLElement;

const mentionObj: Mention = new Mention({
  target: targetEl,
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});
mentionObj.appendTo('#mention-element');
```

---

## Trigger Character

The default trigger character is `@`. Change it with `mentionChar`:

```typescript
// Use # as the trigger — type # to open popup
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go'],
  mentionChar: '#'
});
mentionObj.appendTo('#mention-element');
```

> **Note:** `mentionChar` must be a single character. It cannot be changed after instantiation via property binding — recreate the component if you need to change the trigger at runtime.

---

## Minimal Working Example

A complete self-contained example with local string data:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@syncfusion/ej2/material.css" />
</head>
<body>
  <h3>Mention Demo</h3>
  <textarea id="mentionTarget" rows="6" cols="50"
    placeholder="Type @ to tag a team member"></textarea>
  <div id="mention-element"></div>

  <script type="module" src="./app.js"></script>
</body>
</html>
```

```typescript
// app.ts
import { Mention } from '@syncfusion/ej2-dropdowns';

const teamMembers: string[] = [
  'Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank'
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: teamMembers
});

mentionObj.appendTo('#mention-element');
```

**Behavior:**
1. Click into the textarea and type `@`
2. The suggestion popup opens listing all team members
3. Type more characters to filter (e.g. `@Al` shows `Alice`)
4. Press **Enter**, **Tab**, or click to insert — the selected name is inserted as a chip

---

## Troubleshooting

**Popup doesn't open:**
- Verify `target` points to the correct element ID and it exists in the DOM when `appendTo()` is called
- Check that the element is focused before typing
- If `requireLeadingSpace` is `true` (default), ensure there is a space before `@` (or it is at the start of the text)

**Items not showing in popup:**
- Confirm `dataSource` is not empty
- For object arrays, verify `fields.text` maps to an actual property key in your objects
- If `minLength` > 0, type that many characters after `@` before the popup opens

**Chip not inserted after selection:**
- Check the browser console for errors
- Confirm the target element is a supported type (textarea, input, contenteditable div)

**CSS not applied:**
- Ensure the theme CSS is loaded before the component initializes
- Check for conflicting global CSS rules overriding `.e-mention` styles
