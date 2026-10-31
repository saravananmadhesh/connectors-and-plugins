# Advanced Features

## Table of Contents
- [HTML Setup](#html-setup)
- [Scrollable Menus](#scrollable-menus)
- [MenuOpenType Configuration](#menuopentype-configuration)
- [Filter Support](#filter-support)
- [HTML Sanitization](#html-sanitization)
- [Persistence and Locale](#persistence-and-locale)
- [Accessibility Features](#accessibility-features)

## HTML Setup

### Basic HTML Structure for Advanced Features

```html
<div>
  <!-- Target element for context menu -->
  <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
    Right-click here for advanced features
  </div>
  <!-- ContextMenu will be rendered here -->
  <ul id="contextmenu"></ul>
</div>
```

## Scrollable Menus

### Enable Scrolling

Enable automatic scrolling for large menus:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const menuItems = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
  { text: 'Item 4' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
  { text: 'Item 8' },
  { text: 'Item 9' },
  { text: 'Item 10' }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableScrolling: true  // Enable scroll for long menus
});

contextMenu.appendTo('#contextmenu');
```

### Horizontal Scroll (HScroll)

Scrolling for items exceeding horizontal space:

```typescript
import { ContextMenu, HScroll } from '@syncfusion/ej2-navigations';

// Inject HScroll module
ContextMenu.Inject(HScroll);

const wideMenuItems = [
  { text: 'Very Long Menu Item Name 1' },
  { text: 'Very Long Menu Item Name 2' },
  { text: 'Very Long Menu Item Name 3' }
];

const contextMenu = new ContextMenu({
  items: wideMenuItems,
  target: '#target',
  enableScrolling: true
});

contextMenu.appendTo('#contextmenu');
```

### Vertical Scroll (VScroll)

Scrolling for vertically overflowing items:

```typescript
import { ContextMenu, VScroll } from '@syncfusion/ej2-navigations';

// Inject VScroll module
ContextMenu.Inject(VScroll);

const manyItems = Array.from({ length: 50 }, (_, i) => ({
  text: `Option ${i + 1}`
}));

const contextMenu = new ContextMenu({
  items: manyItems,
  target: '#target',
  enableScrolling: true  // Enable vertical scrolling
});

contextMenu.appendTo('#contextmenu');
```

### Scroll Configuration

```typescript
import { ContextMenu, HScroll, VScroll } from '@syncfusion/ej2-navigations';

ContextMenu.Inject(HScroll, VScroll);

const contextMenu = new ContextMenu({
  items: largeMenuData,
  target: '#target',
  enableScrolling: true,
  
  // Optional: Configure scroll behavior
  hScroll: {
    enabled: true
  },
  vScroll: {
    enabled: true
  }
});
```

## MenuOpenType Configuration

### Auto Open (Default)

Submenu opens automatically on hover:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  openType: 'Auto'  // Opens on hover
});
```

### Click to Open

Open submenus only on click:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  showItemOnClick: true  // Require click to open submenus
});
```

### Hover with Custom Delay

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  hoverDelay: 500  // 500ms before opening submenu on hover
});
```

### Menu Effect Types

```typescript
// Different animation effects when opening submenus
const effectTypes = [
  'SlideDown',   // Default - slides down
  'ZoomIn',      // Zooms in
  'FadeIn',      // Fades in
  'None'         // No animation
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    effect: 'ZoomIn',      // Choose effect
    duration: 400,
    easing: 'ease'
  }
});
```

## Filter Support

### Filter Elements within Target

Apply menu only to specific elements:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#container',
  filter: '.editable'  // Apply menu only to .editable elements
});

// HTML with filtered elements
// <div id="container">
//   <div class="editable">Right-click here</div>
//   <div class="readonly">Right-click has no menu</div>
// </div>
```

### Multiple Element Filters

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#grid',
  filter: 'tbody tr'  // Apply to table rows only
});

// HTML structure
// <table id="grid">
//   <tbody>
//     <tr>Right-click for menu</tr>
//     <tr>Right-click for menu</tr>
//   </tbody>
// </table>
```

### Complex Selectors

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#container',
  filter: '.item:not(.disabled)'  // Exclude disabled items
});

const contextMenu2 = new ContextMenu({
  items: menuItems,
  target: '#container',
  filter: '[data-type="editable"]'  // Filter by data attribute
});
```

## HTML Sanitization

### Enable HTML in Items

Allow HTML content in menu items:

```typescript
const contextMenu = new ContextMenu({
  items: [
    { text: '<strong>Bold Item</strong>' },
    { text: '<em>Italic Item</em>' },
    { text: '<span style="color: red;">Red Text</span>' }
  ],
  target: '#target',
  enableHtmlSanitizer: true  // Sanitize HTML for security
});
```

### Disable Sanitization (Use Carefully)

```typescript
const contextMenu = new ContextMenu({
  items: [
    { text: '<div class="custom-content">Custom</div>' }
  ],
  target: '#target',
  enableHtmlSanitizer: false  // CAUTION: Only use with trusted content
});
```

### Safe HTML Templates

```typescript
const contextMenu = new ContextMenu({
  items: [
    { 
      text: '<span class="icon-wrapper"><i class="e-icons e-save"></i> Save</span>',
      safe: true
    }
  ],
  target: '#target',
  enableHtmlSanitizer: true
});
```

## Persistence and Locale

### Enable Persistence

Store and restore menu state:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enablePersistence: true  // Save state in localStorage
});

contextMenu.appendTo('#contextmenu');

// State is automatically restored on page reload
```

### Persistence Properties

```typescript
// Automatically persisted in localStorage
const persistedState = {
  expandedItems: [],
  selectedItem: null,
  scrollPosition: { x: 0, y: 0 }
};
```

### Locale Configuration

Set menu display language:

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  locale: 'fr-FR'  // French
});

// Supported locales: 'en-US', 'fr-FR', 'de-DE', 'es-ES', etc.
```

### Custom Localization

```typescript
// Define custom strings
const L10n = {
  'fr-FR': {
    'Cut': 'Couper',
    'Copy': 'Copier',
    'Paste': 'Coller'
  }
};

const contextMenu = new ContextMenu({
  items: [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ],
  target: '#target',
  locale: 'fr-FR'
});
```

## Accessibility Features

### ARIA Attributes

Support for screen readers:

```typescript
const contextMenu = new ContextMenu({
  items: [
    { 
      text: 'Edit',
      id: 'edit-item',
      htmlAttributes: {
        'aria-label': 'Edit the selected item',
        'role': 'menuitem'
      }
    },
    { 
      text: 'Delete',
      id: 'delete-item',
      htmlAttributes: {
        'aria-label': 'Delete the selected item',
        'role': 'menuitem'
      }
    }
  ],
  target: '#target'
});
```

### Keyboard Navigation

Navigate menu with keyboard:

```typescript
// Supported keys:
// Arrow Up/Down: Navigate menu items
// Enter: Select item
// Escape: Close menu
// Alt + letter: Activate underlined menu item

const menuItems = [
  { text: '<u>C</u>ut' },      // Alt+C
  { text: '<u>C</u>opy' },     // Alt+C
  { text: '<u>P</u>aste' },    // Alt+P
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableHtmlSanitizer: true
});
```

### Focus Management

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  onOpen: (args: any) => {
    // Set focus to first menu item
    const firstItem = document.querySelector('.e-menu-item');
    if (firstItem) {
      (firstItem as HTMLElement).focus();
    }
  }
});
```

### High Contrast Support

```css
/* High contrast mode styles */
@media (prefers-contrast: more) {
  .e-contextmenu {
    border: 2px solid currentColor;
  }
  
  .e-contextmenu .e-menu-item {
    border: 1px solid transparent;
  }
  
  .e-contextmenu .e-menu-item:focus {
    border: 1px solid currentColor;
    outline: 2px solid currentColor;
  }
}
```

### Reduced Motion Support

```typescript
// Detect user preference for reduced motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  animationSettings: {
    effect: prefersReducedMotion ? 'None' : 'SlideDown'
  }
});
```

### WCAG Compliance

```typescript
// Ensure WCAG 2.1 Level AA compliance:
// - All items have descriptive labels
// - Color is not the only indicator
// - Sufficient color contrast
// - Keyboard accessible
// - Focus indicators visible
// - Screen reader announcements

const wcagCompliantMenu = new ContextMenu({
  items: [
    {
      text: '✂️ Cut',  // Icon + text (not color only)
      htmlAttributes: {
        'aria-label': 'Cut selected text'
      }
    },
    {
      text: '📋 Copy',
      htmlAttributes: {
        'aria-label': 'Copy selected text'
      }
    }
  ],
  target: '#target'
});
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Interactions & Events](./interactions.md) - Event handling
- [Styling & Appearance](./styling.md) - CSS customization
- [API Reference](./api-reference.md) - Complete property documentation
