# Getting Started — Syncfusion TypeScript Tooltip

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Tooltip](#basic-tooltip)
- [Tooltip on Multiple Targets](#tooltip-on-multiple-targets)
- [Using title Attribute as Content](#using-title-attribute-as-content)
- [Running the Application](#running-the-application)

---

## Installation

Create a TypeScript app with Vite:

```bash
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install @syncfusion/ej2-popups@33.x.x --save
npm run dev
```

> For JavaScript projects use `--template vanilla`. The `--save` flag registers the dependency in `package.json`.

---

## CSS Imports

Add Syncfusion theme CSS in your global stylesheet:

```css
/* src/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/tooltip/index.css";
```

Then import the stylesheet in your entry file:

```typescript
// src/main.ts
import './styles.css';
```

> Available themes: `material3`, `bootstrap5`, `fluent2`, `tailwind3`. Replace `tailwind3` with your preferred theme across both imports.

---

## Basic Tooltip

The simplest usage creates a Tooltip instance and appends it to an element.

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import './styles.css';

let tooltip: Tooltip = new Tooltip({
  content: 'Tooltip Content',
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

**HTML:**

```html
<button id="target" class="e-btn">Show Tooltip</button>
```

---

## Tooltip with Specific Target

To attach the tooltip to a specific element within a container:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  position: 'TopCenter',
  content: 'Tooltip Content',
  target: '#myButton'
});
tooltip.appendTo('#container');
```

**HTML:**

```html
<div id="container">
  <button id="myButton" class="e-btn">Hover Me</button>
</div>
```

---

## Tooltip on Multiple Targets

A single Tooltip instance can serve multiple targets within a container. Set `target` to a shared CSS selector and the tooltip reads each element's `title` attribute as its content.

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '.e-info',
  position: 'RightCenter'
});
tooltip.appendTo('#container');
```

**HTML:**

```html
<div id="container">
  <form>
    <table>
      <tr>
        <td>User Name</td>
        <td><input type="text" class="e-info" title="Please enter your name" /></td>
      </tr>
      <tr>
        <td>Email Address</td>
        <td><input type="email" class="e-info" title="Enter a valid email address" /></td>
      </tr>
      <tr>
        <td>Password</td>
        <td><input type="password" class="e-info" title="Be at least 8 characters length" /></td>
      </tr>
    </table>
  </form>
</div>
```

> Each matched `.e-info` element's `title` attribute becomes that element's tooltip content. The `title` attribute is used as fallback when no `content` property is supplied.

---

## Using title Attribute as Content

If the `content` property is not provided, the Tooltip automatically reads the `title` attribute of the target element.

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '#myBtn'
});
tooltip.appendTo('#container');
```

**HTML:**

```html
<div id="container">
  <button id="myBtn" class="e-btn" title="This is my tooltip text">Hover Me</button>
</div>
```

> Useful for progressive enhancement — standard HTML `title` attributes become rich Syncfusion tooltips without extra configuration.

---

## Running the Application

```bash
npm run dev
```

The development server starts and opens the app in the browser. The tooltip appears on hover over the target element by default.

---

## Complete Working Example

```typescript
// src/main.ts
import { Tooltip } from '@syncfusion/ej2-popups';
import './styles.css';

// Basic tooltip on a button
let tooltip: Tooltip = new Tooltip({
  content: 'Click to submit the form',
  position: 'TopCenter'
});
tooltip.appendTo('#submit-btn');
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tooltip Demo</title>
</head>
<body>
  <button id="submit-btn" class="e-btn e-primary">Submit</button>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Gotchas

- **DOM required**: Tooltip requires a browser environment with DOM.
- **Target must exist**: The target element must be present in the DOM before `appendTo()` is called.
- **CSS imports required**: Both `ej2-base` and `ej2-popups` CSS files must be imported.
- **Multiple targets**: Use a CSS selector for `target` to apply one tooltip to multiple elements.

---

## See Also

- [tooltip-content.md](./tooltip-content.md) - Content strategies and templates
- [tooltip-position.md](./tooltip-position.md) - 12 positions and offsets
- [tooltip-open-mode.md](./tooltip-open-mode.md) - Open modes (Hover, Click, Focus, Custom)
- [tooltip-animation.md](./tooltip-animation.md) - Animation effects
- [tooltip-customization.md](./tooltip-customization.md) - CSS customization
- [tooltip-how-to.md](./tooltip-how-to.md) - Common patterns
- [tooltip-accessibility.md](./tooltip-accessibility.md) - Accessibility guidelines
- [tooltip-api.md](./tooltip-api.md) - Complete API reference
