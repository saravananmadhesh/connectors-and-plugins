# Getting Started - ButtonGroup (TypeScript)

## Table of Contents
- [Installation](#installation)
- [Quick App Example](#quick-app-example)
- [CSS / Themes](#css--themes)
- [Using methods](#using-methods)
- [Events and handlers](#events-and-handlers)
- [Troubleshooting](#troubleshooting)

## Installation

Install the ButtonGroup package from npm:

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-base --save
```

## Quick App Example

A minimal working example with a ButtonGroup component:

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
</head>
<body>
  <div id="buttonGroup"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

**main.ts**
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

// Create button group with HTML
const groupDiv = document.getElementById('buttonGroup')!;
groupDiv.innerHTML = `
  <button>Left</button>
  <button>Center</button>
  <button>Right</button>
`;

// Initialize ButtonGroup
createButtonGroup(groupDiv);
```

## CSS / Themes

Import theme CSS. Choose one theme:

```typescript
// main.ts or app.css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/button-group/index.css";
```

Available themes:
- material (default)
- bootstrap5
- fluent
- tailwind3
- fabric

## Using Methods

The ButtonGroup is primarily CSS-based and methods apply to child button elements:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('buttonGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Option 1</button>
  <button class="e-btn">Option 2</button>
  <button class="e-btn">Option 3</button>
`;

createButtonGroup(groupDiv);

// Get selected buttons
const selectedButtons = groupDiv.querySelectorAll('.e-active');
console.log('Selected:', selectedButtons.length);

// Disable all buttons
const allButtons = groupDiv.querySelectorAll('button');
allButtons.forEach(btn => {
  btn.setAttribute('disabled', '');
});

// Enable all buttons
allButtons.forEach(btn => {
  btn.removeAttribute('disabled');
});

// Select specific button
const secondBtn = groupDiv.querySelector('button:nth-child(2)') as HTMLButtonElement;
if (secondBtn) {
  secondBtn.classList.add('e-active');
}
```

## Events and Handlers

Handle ButtonGroup selection changes:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('buttonGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Option 1</button>
  <button class="e-btn">Option 2</button>
  <button class="e-btn">Option 3</button>
`;

createButtonGroup(groupDiv);

// Listen to button clicks within group
groupDiv.addEventListener('click', (event: Event): void => {
  const target = event.target as HTMLButtonElement;
  if (target.tagName === 'BUTTON') {
    console.log('Selected:', target.textContent);
    console.log('All selected:', Array.from(groupDiv.querySelectorAll('.e-active'))
      .map(btn => (btn as HTMLButtonElement).textContent));
  }
});
```

## Troubleshooting

**ButtonGroup not grouping buttons:**
- Ensure buttons are direct children of container
- Check that CSS is imported
- Verify `createButtonGroup()` is called

**Selection not working:**
- Confirm container has `e-btn-group` class applied
- Check that `createButtonGroup()` is called on correct element
- Verify buttons have `e-btn` class

**Styling not applied:**
- Ensure theme CSS is imported
- Verify buttons are wrapped in proper container
- Check browser DevTools for CSS loading

**Selection events not firing:**
- Use `addEventListener` on container element
- Ensure `click` handler is attached to group, not individual buttons
