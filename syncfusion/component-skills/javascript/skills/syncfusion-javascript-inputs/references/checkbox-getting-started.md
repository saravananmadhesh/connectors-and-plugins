# Getting Started — Syncfusion TypeScript CheckBox

Set up a TypeScript/JavaScript project and render a basic `CheckBox` from Syncfusion.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install the Package](#install-the-package)
- [Add CSS References](#add-css-references)
- [Add CheckBox Component](#add-checkbox-component)
- [Enable Ripple Effect (Optional)](#enable-ripple-effect-optional)
- [Run the Application](#run-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js installed
- A TypeScript or JavaScript project (Vite recommended)

### Create a new app with Vite

```bash
# TypeScript
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm run dev

# JavaScript
npm create vite@latest my-app -- --template vanilla
cd my-app
npm run dev
```

---

## Install the Package

All Syncfusion EJ2 packages are published on npm.

```bash
npm install @syncfusion/ej2-buttons@33.x.x --save
```

> The `--save` flag adds the package to `dependencies` in `package.json`.

---

## Add CSS References

Import the required CSS files in `src/styles.css`:

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
```

Then import `styles.css` in `src/main.ts`:

```typescript
import './styles.css';
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Add CheckBox Component

In `src/main.ts`, import and create the CheckBox instance:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';
import './styles.css';

let checkbox: CheckBox = new CheckBox({
  label: 'Default',
  checked: false
});
checkbox.appendTo('#checkbox');
```

**HTML:**

```html
<input type="checkbox" id="checkbox" />
```

---

## Checked by Default

Create a pre-checked checkbox:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'I agree to the terms',
  checked: true
});
checkbox.appendTo('#agree-checkbox');
```

---

## Label Position

Control where the label appears relative to the checkbox:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

// Label after checkbox (default)
let afterLabel: CheckBox = new CheckBox({
  label: 'After (default)',
  labelPosition: 'After'
});
afterLabel.appendTo('#after-checkbox');

// Label before checkbox
let beforeLabel: CheckBox = new CheckBox({
  label: 'Before',
  labelPosition: 'Before'
});
beforeLabel.appendTo('#before-checkbox');
```

---

## Enable Ripple Effect (Optional)

For a Material-style ripple on click, use `enableRipple` from `@syncfusion/ej2-base`:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import './styles.css';

enableRipple(true);

let checkbox: CheckBox = new CheckBox({
  label: 'Default with ripple'
});
checkbox.appendTo('#checkbox');
```

---

## Basic CSS-Only CheckBox

For a simple CSS-only checkbox without the EJ2 component:

```html
<div class="e-checkbox-wrapper">
  <input type="checkbox" id="css-checkbox" />
  <label class="e-checkbox-label" for="css-checkbox">CSS Only</label>
</div>
```

```css
.e-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.e-checkbox-label {
  cursor: pointer;
  user-select: none;
}
```

---

## Run the Application

```bash
npm run dev
```

The browser opens with the rendered CheckBox. The output displays a checkbox with the label "Default".

---

## Complete Working Example

```typescript
// src/main.ts
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './styles.css';

// Simple checkbox
let simpleCheckbox: CheckBox = new CheckBox({
  label: 'Simple Checkbox',
  checked: false,
  change: (args: ChangeEventArgs) => {
    console.log('Checked:', args.checked);
  }
});
simpleCheckbox.appendTo('#simple-checkbox');

// Pre-checked checkbox
let agreedCheckbox: CheckBox = new CheckBox({
  label: 'I agree to the terms and conditions',
  checked: true
});
agreedCheckbox.appendTo('#agreed-checkbox');
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CheckBox Demo</title>
</head>
<body>
  <div>
    <input type="checkbox" id="simple-checkbox" />
  </div>
  <div>
    <input type="checkbox" id="agreed-checkbox" />
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Troubleshooting

- **Styles not applying** — Verify CSS import paths match your `node_modules` location.
- **Component not found** — Ensure `@syncfusion/ej2-buttons` is installed and listed in `package.json`.
- **Checkbox not rendering** — Ensure the target element exists in the DOM before calling `appendTo()`.
- **TypeScript errors** — Ensure types are imported correctly and the target version is compatible.

---

## Gotchas

- **HTML target required**: The component must be appended to a DOM element using `appendTo()`.
- **CSS imports required**: Both `ej2-base` and `ej2-buttons` CSS files must be imported.
- **State management**: Use `checked` property to set/read state programmatically.

---

## See Also

- [checkbox-label-and-size.md](./checkbox-label-and-size.md) - Label configuration and sizing
- [checkbox-states.md](./checkbox-states.md) - Checked, indeterminate, and disabled states
- [checkbox-style-and-appearance.md](./checkbox-style-and-appearance.md) - Custom CSS classes
- [checkbox-how-to.md](./checkbox-how-to.md) - Common patterns
- [checkbox-accessibility.md](./checkbox-accessibility.md) - Accessibility guidelines
- [checkbox-api.md](./checkbox-api.md) - Complete API reference
