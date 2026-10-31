# Getting Started with Syncfusion EJ2 JavaScript Toast

This guide walks through installing, configuring, and rendering your first `Toast` component in a TypeScript/JavaScript application.

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Toast Component](#basic-toast-component)
- [Toast with Custom Target](#toast-with-custom-target)
- [Running the Application](#running-the-application)

---

## Prerequisites

- Node.js 14+
- A Vite or webpack-based TypeScript/JavaScript project

Create a new Vite-based app:

```bash
# TypeScript
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install @syncfusion/ej2-notifications --save
npm run dev

# JavaScript
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install @syncfusion/ej2-notifications --save
npm run dev
```

---

## Installation

Install the Syncfusion notifications package, which contains the Toast component:

```bash
npm install @syncfusion/ej2-notifications@33.x.x --save
```

Toast depends on buttons and popups packages (installed automatically as peers):

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-popups --save
```

---

## CSS Imports

Add all required CSS files in your global stylesheet:

```css
/* src/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/toast/index.css";
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Basic Toast Component

Import `Toast` from the notifications package:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';
import './styles.css';
```

The Toast renders hidden by default. Call `toastObj.show()` to display it. The `created` event fires once the component initializes, making it the standard place to trigger the initial show.

### Basic Toast Example

```typescript
import { Toast } from '@syncfusion/ej2-notifications';
import './styles.css';

let toastObj: Toast = new Toast({
  title: 'Matt sent you a friend request',
  content: 'Hey, wanna dress up as wizards and ride our hoverboards?',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000
});
toastObj.appendTo('#toast');

// Show the toast
toastObj.show();
```

**HTML Target Element:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Toast Demo</title>
</head>
<body>
  <div id="toast"></div>
  <button id="show-btn">Show Toast</button>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### Auto-Show on Created

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Welcome!',
  content: 'Thanks for using Syncfusion Toast',
  created: () => {
    toastObj.show();
  }
});
toastObj.appendTo('#toast');
```

### Show Toast on Button Click

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Success!',
  content: 'Your changes have been saved.'
});
toastObj.appendTo('#toast');

document.getElementById('show-btn')!.addEventListener('click', () => {
  toastObj.show();
});
```

---

## Toast with Custom Target

By default, Toast renders in `document.body`. Render inside a specific container element using the `target` property — useful for modals, panels, and scoped notification areas:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Sample Toast',
  content: 'Rendered inside a custom container',
  target: '#toast_target',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 3000,
  created: () => {
    toastObj.show();
  }
});
toastObj.appendTo('#toast_target');
```

**HTML:**

```html
<div>
  <div id="toast_target" style="width: 400px; height: 200px; border: 1px solid #ccc; position: relative;"></div>
</div>
```

> **Note:** When `target` is set, toast `position` is calculated relative to that container rather than the viewport.

---

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

The app opens in the browser. Click the button to show the toast notification.

---

## Complete Working Example

```typescript
// src/main.ts
import { Toast } from '@syncfusion/ej2-notifications';
import './styles.css';

let toastObj: Toast = new Toast({
  title: 'Matt sent you a friend request',
  content: 'Hey, wanna dress up as wizards and ride our hoverboards?',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000,
  showCloseButton: true,
  showProgressBar: true
});
toastObj.appendTo('#toast');

document.getElementById('show-btn')!.addEventListener('click', () => {
  toastObj.show();
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Toast Component Demo</title>
</head>
<body>
  <button id="show-btn">Show Toast</button>
  <div id="toast"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Quick Utility Toast (No Component Needed)

For simple toasts without component instantiation, use `ToastUtility.show()`:

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

// Show a success toast instantly
ToastUtility.show('File saved successfully', 'Success', 3000);

// Show an error toast
ToastUtility.show('Connection failed', 'Error', 5000);

// Show an info toast
ToastUtility.show('New update available', 'Information', 4000);

// Show a warning toast
ToastUtility.show('Disk space low', 'Warning', 0);
```

---

## Gotchas

- **Missing styles**: If the toast appears unstyled, ensure all required CSS files (`ej2-base`, `ej2-buttons`, `ej2-popups`, `ej2-notifications`) are imported.
- **Hidden by default**: Toast renders hidden. You must call `show()` to display it.
- **AppendTo required**: The component must be appended to a DOM element using `appendTo()` to render properly.
- **Target position**: When `target` is set, position is relative to the target, not the viewport.

---

## See Also

- [toast-configuration.md](./toast-configuration.md) - Configuration options
- [toast-position.md](./toast-position.md) - Positioning
- [toast-timeout-and-dismissal.md](./toast-timeout-and-dismissal.md) - Timeout and dismissal
- [toast-templates-and-styling.md](./toast-templates-and-styling.md) - Templates and styling
- [toast-animation.md](./toast-animation.md) - Animation effects
- [toast-services.md](./toast-services.md) - ToastUtility and advanced patterns
- [toast-accessibility.md](./toast-accessibility.md) - Accessibility guidelines
- [toast-api.md](./toast-api.md) - Complete API reference
