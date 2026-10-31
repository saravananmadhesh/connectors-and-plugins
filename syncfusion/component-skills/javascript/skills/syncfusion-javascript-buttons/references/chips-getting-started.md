# Getting Started - Chips (TypeScript)

## Table of Contents
- [Installation](#installation)
- [Quick App Example](#quick-app-example)
- [CSS / Themes](#css--themes)
- [Using methods](#using-methods)
- [Events and handlers](#events-and-handlers)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Chips package from npm:

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-base --save
```

## Quick App Example

A minimal working example with a Chips component:

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
</head>
<body>
  <div id="chips"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

**main.ts**
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

// Create ChipList instance
const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Chip 1' },
    { text: 'Chip 2' },
    { text: 'Chip 3' },
    { text: 'Chip 4' }
  ]
});
chipList.appendTo('#chips');
```

## CSS / Themes

Import theme CSS. Choose one theme:

```typescript
// main.ts or app.css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/chips/index.css";
```

Available themes:
- material (default)
- bootstrap5
- fluent
- tailwind3
- fabric

## Using Methods

Access ChipList methods:

```typescript
import { ChipList, ChipListModel } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'React', leadingIconCss: 'e-icons e-close' },
    { text: 'TypeScript', leadingIconCss: 'e-icons e-close' },
    { text: 'Angular', leadingIconCss: 'e-icons e-close' }
  ]
});
chipList.appendTo('#chips');

// Get all chips
console.log('Chips:', chipList.chips);

// Add a new chip
chipList.chips.push({ text: 'Vue' });
chipList.refresh();

// Remove a chip
chipList.chips.splice(0, 1);
chipList.refresh();

// Clear all chips
chipList.chips = [];
chipList.refresh();
```

## Events and Handlers

Handle chip selection and click events:

```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Chip 1' },
    { text: 'Chip 2' },
    { text: 'Chip 3' }
  ],
  click: (args: any): void => {
    console.log('Chip clicked:', args.text);
  },
  delete: (args: any): void => {
    console.log('Chip deleted:', args.text);
  }
});
chipList.appendTo('#chips');
```

## Troubleshooting

**Chips not displaying:**
- Ensure container with ID exists
- Verify chips array is populated with data
- Check CSS theme is imported

**Delete button not showing:**
- Add `deletable: true` property to chips configuration
- Ensure theme CSS includes delete icon styles

**Events not firing:**
- Verify event handlers are defined during initialization
- Check browser console for errors
- Ensure chip interactions are enabled
