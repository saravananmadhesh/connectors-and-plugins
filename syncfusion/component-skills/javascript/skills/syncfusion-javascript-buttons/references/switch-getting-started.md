# Getting Started with Syncfusion EJ2 JavaScript Switch

This guide covers setting up a JavaScript/TypeScript project and rendering the Syncfusion Switch component from scratch.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Add CSS Theme](#add-css-theme)
- [HTML Setup](#html-setup)
- [Create and Render Switch](#create-and-render-switch)
- [Checked State](#checked-state)
- [Next Steps](#next-steps)

---

## Prerequisites

- Node.js and npm installed, or
- A browser with ES module support
- Basic knowledge of TypeScript/JavaScript

---

## Installation

### Option 1: NPM

```bash
npm install @syncfusion/ej2-buttons --save
```

### Option 2: CDN

Include the CDN links directly in your HTML:

```html
<!-- Material 3 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material3.css" rel="stylesheet" />
<script src="https://cdn.syncfusion.com/ej2/ej2-buttons/dist/ej2-buttons.umd.js"></script>

<!-- Or Bootstrap 5 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/bootstrap5.css" rel="stylesheet" />
<script src="https://cdn.syncfusion.com/ej2/ej2-buttons/dist/ej2-buttons.umd.js"></script>
```

---

## Add CSS Theme

Choose one of the available themes and add it to your HTML or import it in your CSS file:

```html
<!-- In your HTML file -->
<head>
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material3.css" rel="stylesheet" />
</head>
```

**Or in your CSS/TypeScript:**

```typescript
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/switch/index.css";
```

### Available Themes
- Material 3 (default)
- Bootstrap 5
- Fluent 2
- Tailwind 3
- Fabric
- High Contrast

---

## HTML Setup

Create an HTML element with an ID where the Switch will render:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Syncfusion Switch</title>
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material3.css" rel="stylesheet" />
</head>
<body>
  <div id="switch"></div>
  <script src="app.ts"></script>
</body>
</html>
```

---

## Create and Render Switch

### Basic Switch

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Create a new Switch instance
const switchComponent: Switch = new Switch();

// Render into the HTML element
switchComponent.appendTo('#switch');
```

### Switch with Label

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switchComponent: Switch = new Switch({
  content: 'Enable notifications'
});
switchComponent.appendTo('#switch');
```

### Multiple Switches

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const notificationSwitch: Switch = new Switch({
  content: 'Notifications'
});
notificationSwitch.appendTo('#notifications');

const darkModeSwitch: Switch = new Switch({
  content: 'Dark Mode'
});
darkModeSwitch.appendTo('#darkmode');

const autoPlaySwitch: Switch = new Switch({
  content: 'Auto Play'
});
autoPlaySwitch.appendTo('#autoplay');
```

---

## Checked State

### Pre-checked Switch

Set the `checked` property to `true` to render the Switch in the checked (on) state:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switchComponent: Switch = new Switch({
  checked: true,
  content: 'This switch is checked'
});
switchComponent.appendTo('#switch');
```

### Toggling State Programmatically

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function toggleSwitch(): void {
  switchComponent.checked = !switchComponent.checked;
}

switchComponent = new Switch({
  checked: false,
  content: 'Toggle me'
});
switchComponent.appendTo('#switch');

// Hook up button to toggle
document.getElementById('toggle-btn')?.addEventListener('click', toggleSwitch);
```

---

## Handle State Changes

Use the `change` event to respond to state changes:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onStateChange(args: ChangeEventArgs): void {
  if (args.checked) {
    console.log('Switch is now ON');
  } else {
    console.log('Switch is now OFF');
  }
}

const switchComponent: Switch = new Switch({
  content: 'Listen to changes',
  change: onStateChange
});
switchComponent.appendTo('#switch');
```

---

## Complete Example

Combine everything into a working example:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import '@syncfusion/ej2-buttons/styles/material3.css';

enableRipple(true);

// State tracking
let switchesState: { [key: string]: boolean } = {
  notifications: false,
  darkMode: false,
  autoPlay: false,
};

function onNotificationChange(args: ChangeEventArgs): void {
  switchesState.notifications = args.checked ?? false;
  console.log('Notifications:', switchesState.notifications);
}

function onDarkModeChange(args: ChangeEventArgs): void {
  switchesState.darkMode = args.checked ?? false;
  console.log('Dark Mode:', switchesState.darkMode);
}

function onAutoPlayChange(args: ChangeEventArgs): void {
  switchesState.autoPlay = args.checked ?? false;
  console.log('Auto Play:', switchesState.autoPlay);
}

// Create switches
const notificationSwitch: Switch = new Switch({
  content: 'Enable Notifications',
  change: onNotificationChange
});
notificationSwitch.appendTo('#notifications');

const darkModeSwitch: Switch = new Switch({
  content: 'Dark Mode',
  checked: false,
  change: onDarkModeChange
});
darkModeSwitch.appendTo('#darkmode');

const autoPlaySwitch: Switch = new Switch({
  content: 'Auto Play Videos',
  checked: true,
  change: onAutoPlayChange
});
autoPlaySwitch.appendTo('#autoplay');

console.log('Switches initialized!');
```

---

## Next Steps

- [Features and State Management](switch-features.md) – Advanced features like disabled, labels, and RTL
- [Style and Appearance](switch-style-and-appearance.md) – Customizing colors, sizes, and themes
- [Events and Methods](switch-events-and-methods.md) – Handling events and interacting programmatically
- [How To](switch-how-to.md) – Common use cases and recipes
- [API Reference](switch-api.md) – Complete property, method, and event reference
