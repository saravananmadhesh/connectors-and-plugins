# Dark Mode Implementation

## Table of Contents
- [Overview](#overview)
- [Global Dark Mode](#global-dark-mode)
- [Per-Component Dark Mode](#per-component-dark-mode)
- [Runtime Theme Switching](#runtime-theme-switching)

## Overview

Syncfusion JavaScript themes support both light and dark variants. Dark mode is toggled by applying the `e-dark-mode` CSS class to the `<body>` element or specific component containers.

**Supported themes with dark variants:**
- Tailwind 3.4 → tailwind3.css (light), tailwind3-dark.css (dark)
- Bootstrap 5.3 → bootstrap5.3.css (light), bootstrap5.3-dark.css (dark)
- Fluent 2 → fluent2.css (light), fluent2-dark.css (dark)
- Material 3 → material3.css (light), material3-dark.css (dark)

**How it works:**
- Import ONE theme CSS file (e.g., `tailwind3.css`)
- Apply `e-dark-mode` class to switch to dark variant
- Remove `e-dark-mode` class to return to light variant
- No need to import separate dark CSS files

## Global Dark Mode

Apply dark mode to all Syncfusion controls by adding `e-dark-mode` to the `<body>` element.

### Static Dark Mode

```html
<!-- index.html -->
<body class="e-dark-mode">
  <div id="app"></div>
</body>
```

### Dynamic Dark Mode with CheckBox

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Button } from '@syncfusion/ej2-buttons';

let isDarkMode: boolean = false;

// Initialize dark mode checkbox
const darkModeCheckBox: CheckBox = new CheckBox({
  label: 'Enable Dark Mode',
  checked: isDarkMode,
  change: (args) => {
    const checked: boolean = args.checked ?? false;
    isDarkMode = checked;
    
    if (checked) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
  }
});
darkModeCheckBox.appendTo('#darkModeCheckbox');

// Initialize sample button
const button: Button = new Button({
  cssClass: 'e-primary',
  content: 'Sample Button'
});
button.appendTo('#sampleButton');
```

## Per-Component Dark Mode

Apply dark mode to specific controls or sections by adding `e-dark-mode` to the component's container.

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Initialize light mode button
const lightButton: Button = new Button({
  cssClass: 'e-primary',
  content: 'Light Button'
});
lightButton.appendTo('#lightButton');

// Initialize dark mode button (container has e-dark-mode class)
const darkButton: Button = new Button({
  cssClass: 'e-primary',
  content: 'Dark Button'
});
darkButton.appendTo('#darkButton');
```

```html
<h2>Light Mode Section</h2>
<div>
  <button id="lightButton"></button>
</div>

<h2>Dark Mode Section</h2>
<div class="e-dark-mode">
  <button id="darkButton"></button>
</div>
```

### Multiple Sections with Different Modes

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { Grid } from '@syncfusion/ej2-grids';

const data: Object[] = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

// Initialize light mode navigation buttons
const homeButton: Button = new Button({ content: 'Home' });
homeButton.appendTo('#homeButton');

const aboutButton: Button = new Button({ content: 'About' });
aboutButton.appendTo('#aboutButton');

// Initialize dark mode grid
const grid: Grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', width: 100 },
    { field: 'CustomerID', width: 100 },
    { field: 'Freight', width: 100, format: 'C2' }
  ]
});
grid.appendTo('#grid');
```

```html
<!-- Light mode navigation -->
<div class="nav-section">
  <button id="homeButton"></button>
  <button id="aboutButton"></button>
</div>

<!-- Dark mode content area -->
<div class="e-dark-mode content-section">
  <div id="grid"></div>
</div>
```

## Runtime Theme Switching

### With localStorage Persistence

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Initialize from localStorage
let isDarkMode: boolean = localStorage.getItem('darkMode') === 'true';

// Apply dark mode class on initialization
if (isDarkMode) {
  document.body.classList.add('e-dark-mode');
} else {
  document.body.classList.remove('e-dark-mode');
}

// Initialize toggle button
const toggleButton: Button = new Button({
  content: isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode',
  onClick: () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
    
    // Update button text
    toggleButton.content = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  }
});
toggleButton.appendTo('#toggleButton');
```

### With System Preference Detection

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Check system preference
let isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply initial dark mode class
if (isDarkMode) {
  document.body.classList.add('e-dark-mode');
} else {
  document.body.classList.remove('e-dark-mode');
}

// Update status display
const updateStatus = (): void => {
  const statusElement: HTMLElement | null = document.getElementById('modeStatus');
  if (statusElement) {
    statusElement.textContent = `Current mode: ${isDarkMode ? 'Dark' : 'Light'}`;
  }
};

updateStatus();

// Listen for system preference changes
const mediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
const handleChange = (e: MediaQueryListEvent): void => {
  isDarkMode = e.matches;
  
  if (isDarkMode) {
    document.body.classList.add('e-dark-mode');
  } else {
    document.body.classList.remove('e-dark-mode');
  }
  
  updateStatus();
};
mediaQuery.addEventListener('change', handleChange);

// Initialize override button
const toggleButton: Button = new Button({
  content: 'Override System Preference',
  onClick: () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
    
    updateStatus();
  }
});
toggleButton.appendTo('#toggleButton');
```

```html
<p id="modeStatus"></p>
<button id="toggleButton"></button>
```
