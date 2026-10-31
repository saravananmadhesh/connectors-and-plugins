# Getting Started - Button (TypeScript)

## Table of Contents
- [Installation](#installation)
- [Quick App Example](#quick-app-example)
- [CSS / Themes](#css--themes)
- [Using methods](#using-methods)
- [Events and handlers](#events-and-handlers)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Button package from npm:

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-base --save
```

## Quick App Example

A minimal working example with a Button component:

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
</head>
<body>
  <button id="button1">Click Me</button>
  <button id="button2">Primary Button</button>
  <script src="bundle.js"></script>
</body>
</html>
```

**main.ts**
```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Create default button
const button1: Button = new Button({});
button1.appendTo('#button1');

// Create primary button
const button2: Button = new Button({
  cssClass: 'e-primary'
});
button2.appendTo('#button2');
```

## CSS / Themes

Import theme CSS. Choose one theme:

```typescript
// main.ts or app.css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/button/index.css";
```

Available themes:
- material (default)
- bootstrap5
- fluent
- tailwind3
- fabric

## Using Methods

Access Button methods using the component instance:

```typescript
const button: Button = new Button({});
button.appendTo('#myButton');

// Disable button
button.disabled = true;

// Enable button
button.disabled = false;

// Get button state
console.log('Button disabled:', button.disabled);

// Refresh button
button.refresh();

// Destroy button
button.destroy();
```

## Events and Handlers

Handle button click events:

```typescript
const button: Button = new Button({
  click: (args: any): void => {
    console.log('Button clicked');
    console.log('Event args:', args);
  }
});
button.appendTo('#myButton');
```

Listen to created event:

```typescript
const button: Button = new Button({
  created: (): void => {
    console.log('Button created');
  }
});
button.appendTo('#myButton');
```

Alternatively, use addEventListener:

```typescript
const button: Button = new Button({});
button.appendTo('#myButton');

button.element.addEventListener('click', (): void => {
  console.log('Button clicked via addEventListener');
});
```

## Troubleshooting

**Styles not applied:**
- Ensure CSS imports are at the top of your file
- Verify theme CSS path points to `node_modules/@syncfusion/ej2-buttons/styles/`
- Check browser DevTools for failed CSS requests

**Button not rendering:**
- Confirm HTML element with matching ID exists in DOM
- Check that `appendTo()` is called after DOM ready
- Verify no console errors in browser DevTools

**Click event not firing:**
- Ensure event handler is passed during initialization
- Check that button is not disabled
- Verify no JavaScript errors in console

**Ripple effect not showing:**
- Ensure `enableRipple(true)` is called before button initialization
- Check that theme CSS includes ripple styles
- Verify ripple CSS class is not disabled by other styles
