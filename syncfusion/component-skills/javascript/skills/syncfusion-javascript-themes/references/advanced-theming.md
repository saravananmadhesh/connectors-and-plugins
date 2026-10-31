# Advanced Theming Features

## Table of Contents
- [Size Modes (Touch Support)](#size-modes-touch-support)
- [Theme Studio Customization](#theme-studio-customization)
- [Component-Specific Styling](#component-specific-styling)

## Size Modes (Touch Support)

Syncfusion JavaScript controls provide two size modes to optimize UX across different devices and input methods:

- **Normal mode (default):** Standard control sizes optimized for mouse/keyboard input
- **Touch mode (bigger):** Enlarged controls with increased spacing for touch/mobile devices

### Global Size Mode

Enable touch mode for the entire application by adding the `e-bigger` class to `<body>`:

```html
<!-- index.html -->
<body class="e-bigger">
  <div id="app"></div>
</body>
```

**Effect:** All Syncfusion controls increase in size with larger tap targets (44x44px minimum).

### Component-Specific Size Mode

Apply touch mode to individual controls:

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { Grid } from '@syncfusion/ej2-grids';

// Regular size button
const normalButton: Button = new Button({
  content: 'Normal Button'
});
normalButton.appendTo('#normalButton');

// Touch-optimized button via container class
const touchButton: Button = new Button({
  content: 'Touch Button'
});
touchButton.appendTo('#touchButton');

// Touch-optimized grid via cssClass property
const grid: Grid = new Grid({
  cssClass: 'e-bigger',
  dataSource: data
});
grid.appendTo('#grid');
```

```html
<!-- Regular size button -->
<button id="normalButton"></button>

<!-- Touch-optimized button via container class -->
<div class="e-bigger">
  <button id="touchButton"></button>
</div>

<!-- Touch-optimized grid -->
<div id="grid"></div>
```

### Runtime Size Mode Switching

Toggle size mode dynamically based on user preference or device detection:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

let isTouchMode: boolean = false;

// Auto-detect touch device
const isTouchDevice: boolean = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
isTouchMode = isTouchDevice;

// Apply initial e-bigger class to body
if (isTouchMode) {
  document.body.classList.add('e-bigger');
} else {
  document.body.classList.remove('e-bigger');
}

// Update status display
const updateStatus = (): void => {
  const statusElement: HTMLElement | null = document.getElementById('sizeStatus');
  if (statusElement) {
    statusElement.textContent = `Size Mode: ${isTouchMode ? 'Touch' : 'Normal'}`;
  }
};

updateStatus();

// Initialize toggle button
const toggleButton: Button = new Button({
  content: 'Toggle Size Mode',
  onClick: () => {
    isTouchMode = !isTouchMode;
    
    if (isTouchMode) {
      document.body.classList.add('e-bigger');
    } else {
      document.body.classList.remove('e-bigger');
    }
    
    updateStatus();
  }
});
toggleButton.appendTo('#toggleButton');

// Initialize sample button
const sampleButton: Button = new Button({
  isPrimary: true,
  content: 'Sample Button'
});
sampleButton.appendTo('#sampleButton');
```

```html
<h3 id="sizeStatus"></h3>
<button id="toggleButton"></button>
<div style="margin-top: 20px;">
  <button id="sampleButton"></button>
</div>
```

## Theme Studio Customization

### Accessing Theme Studio

Visit [https://ej2.syncfusion.com/themestudio/?theme=tailwind3](https://ej2.syncfusion.com/themestudio/?theme=tailwind3)

**Available themes:**
- Material 3: `?theme=material3`
- Fluent 2: `?theme=fluent2`
- Bootstrap 5.3: `?theme=bootstrap5.3`
- Tailwind 3.4: `?theme=tailwind3`

### Customizing Theme Colors

Theme Studio exposes common theme variables for customization:

1. **Select base theme** (Material 3, Fluent 2, Bootstrap 5.3, Tailwind 3.4)
2. **Pick colors** using color pickers for primary, secondary, success, warning, error
3. **Preview changes** in real-time across multiple controls
4. **Filter controls** to generate CSS for specific controls only (reduces bundle size)
5. **Download theme** as ZIP containing CSS, SCSS, and `settings.json`

### Using Downloaded Theme

```typescript
// Import custom theme CSS
import './custom-theme/custom-material3.css';
import { Button } from '@syncfusion/ej2-buttons';

// Initialize button with custom theme
const button: Button = new Button({
  isPrimary: true,
  content: 'Custom Theme Button'
});
button.appendTo('#button');
```

```html
<!-- Or use HTML link tag -->
<link href="./custom-theme/custom-material3.css" rel="stylesheet" />

<button id="button"></button>
```

### Re-importing Settings

To modify an existing custom theme:

1. Click **Import** icon in Theme Studio
2. Upload previously downloaded `settings.json`
3. Modify colors as needed
4. Download updated theme

**Use case:** Update brand colors across application without recreating theme from scratch.

### Filtering Controls

Reduce CSS bundle size by including only used controls:

1. Click **Filter** icon in Theme Studio
2. Select controls (e.g., Button, Grid, Dropdown)
3. Click **Apply**
4. Download filtered theme (smaller CSS file)

**Example:** If app only uses Button, Grid, and Calendar, filter to those controls instead of downloading full theme CSS (~300KB+ reduction).

## Component-Specific Styling

### Button Customization

```css
/* styles.css */
.e-btn {
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.e-btn.e-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.e-btn.e-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
```