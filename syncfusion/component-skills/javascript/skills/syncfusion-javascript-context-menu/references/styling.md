# Styling & Appearance

## Table of Contents
- [CSS Customization](#css-customization)
- [Icon Styling](#icon-styling)
- [URL Navigation](#url-navigation)
- [Right-to-Left Layout](#right-to-left-layout)
- [Custom CSS Classes](#custom-css-classes)
- [Text Formatting](#text-formatting)
- [Theme Support](#theme-support)

## CSS Customization

### Import Theme Styles

Add theme CSS to your project. Choose one theme:

```css
/* Fluent 2 (Default) */
@import "@syncfusion/ej2-navigations/styles/fluent2.css";

/* Alternative themes */
@import "@syncfusion/ej2-navigations/styles/bootstrap5.css";
@import "@syncfusion/ej2-navigations/styles/material.css";
@import "@syncfusion/ej2-navigations/styles/fabric.css";
@import "@syncfusion/ej2-navigations/styles/tailwind.css";
```

### Custom Menu Styling

```css
/* Style the entire menu wrapper */
.e-contextmenu-wrapper {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Style menu items */
.e-contextmenu-wrapper ul .e-menu-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
}

/* Hover state */
.e-contextmenu-wrapper ul .e-menu-item:hover,
.e-contextmenu-wrapper ul .e-menu-item.e-selected {
  background-color: #e9ecef;
  color: #000;
}

/* Disabled items */
.e-contextmenu-wrapper ul .e-menu-item.e-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Separator */
.e-contextmenu-wrapper .e-separator {
  height: 1px;
  background-color: #dee2e6;
  margin: 4px 0;
}
```

### Menu Item Spacing

```css
/* Increase item padding */
.e-contextmenu-wrapper ul .e-menu-item {
  padding: 12px 20px;
}

/* Adjust separator margins */
.e-contextmenu-wrapper .e-separator {
  margin: 8px 0;
}

/* Add item spacing */
.e-contextmenu-wrapper ul .e-menu-item + .e-menu-item {
  margin-top: 4px;
}
```

## Icon Styling

### Add Icons to Menu Items

Use Font Awesome or Material Icons:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const menuItems = [
  { 
    text: 'Cut',
    iconCss: 'e-icons e-cut'  // Syncfusion icon
  },
  { 
    text: 'Copy',
    iconCss: 'e-icons e-copy'
  },
  { 
    text: 'Paste',
    iconCss: 'e-icons e-paste'
  },
  { separator: true },
  { 
    text: 'Delete',
    iconCss: 'e-icons e-delete'
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Icon Styling CSS

```css
/* Style icons */
.e-contextmenu-wrapper ul .e-menu-item .e-menu-icon::before {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  vertical-align: middle;
  display: inline-block;
}

/* Color icons */
.e-contextmenu-wrapper ul .e-menu-item .e-cut::before {
  color: #ff6b6b;
}

.e-contextmenu-wrapper ul .e-menu-item .e-copy::before {
  color: #4ecdc4;
}

.e-contextmenu-wrapper ul .e-menu-item .e-delete::before {
  color: #ff6b6b;
}

/* Icon opacity on hover */
.e-contextmenu-wrapper ul .e-menu-item:hover .e-menu-icon::before {
  opacity: 0.8;
}
```

### Custom Icon Images

```typescript
const menuItems = [
  { 
    text: 'Settings',
    iconCss: 'custom-icon settings-icon'
  },
  { 
    text: 'Help',
    iconCss: 'custom-icon help-icon'
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});
```

```css
/* Custom icon styles */
.custom-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  background-size: contain;
  background-repeat: no-repeat;
}

.settings-icon {
  background-image: url('/images/settings.svg');
}

.help-icon {
  background-image: url('/images/help.svg');
}
```

## URL Navigation

### Navigate with Menu Items

```typescript
const menuItems = [
  { 
    text: 'Home',
    url: '/'
  },
  { 
    text: 'About',
    url: '/about'
  },
  { 
    text: 'External Site',
    url: 'url',
    target: '_blank'  // Open in new tab
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Navigation with Icons

```typescript
const menuItems = [
  { 
    text: 'Google',
    url: 'url',
    target: '_blank',
    iconCss: 'e-icons e-globe'
  },
  { 
    text: 'GitHub',
    url: 'url',
    target: '_blank',
    iconCss: 'e-icons e-github'
  }
];
```

### Programmatic Navigation

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  select: (args: any) => {
    if (args.item.url) {
      window.open(args.item.url, '_blank');
    }
  }
});
```

## Right-to-Left Layout

### Enable RTL

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableRtl: true  // Enable right-to-left layout
});

contextMenu.appendTo('#contextmenu');
```

### RTL CSS

```css
/* RTL specific styling */
.e-contextmenu-wrapper.e-rtl {
  direction: rtl;
  text-align: right;
}

.e-contextmenu-wrapper.e-rtl ul .e-menu-item {
  padding-left: 20px;
  padding-right: 16px;
}

.e-contextmenu-wrapper.e-rtl ul .e-menu-item .e-menu-icon::before {
  margin-left: 12px;
  margin-right: 0;
}
```

### Bidirectional Text

```typescript
// Mix LTR and RTL text
const menuItems = [
  { text: 'English Item' },
  { text: 'عنصر عربي' },  // Arabic text
  { text: 'עברית' }        // Hebrew text
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableRtl: true
});
```

## Custom CSS Classes

### Apply Custom Classes

```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  cssClass: 'custom-menu dark-theme'  // Apply multiple classes
});

contextMenu.appendTo('#contextmenu');
```

### Custom Class Styling

```css
/* Dark theme variant */
.e-contextmenu-wrapper.dark-theme {
  background-color: #2d3139;
  border-color: #1e1e1e;
}

.e-contextmenu-wrapper.dark-theme ul .e-menu-item {
  color: #e0e0e0;
}

.e-contextmenu-wrapper.dark-theme ul .e-menu-item:hover {
  background-color: #3d3f47;
}

.e-contextmenu-wrapper.dark-theme .e-separator {
  background-color: #444;
}
```

### Class-Based Variants

```typescript
// Light theme
const lightMenu = new ContextMenu({
  items: menuItems,
  target: '#light-target',
  cssClass: 'light-theme'
});

// Dark theme
const darkMenu = new ContextMenu({
  items: menuItems,
  target: '#dark-target',
  cssClass: 'dark-theme'
});

// Compact theme
const compactMenu = new ContextMenu({
  items: menuItems,
  target: '#compact-target',
  cssClass: 'compact-theme'
});
```

```css
/* Compact theme */
.e-contextmenu-wrapper.compact-theme ul .e-menu-item {
  padding: 4px 12px;
  font-size: 12px;
}

/* Light theme */
.e-contextmenu-wrapper.light-theme {
  background-color: #ffffff;
  border: 1px solid #cccccc;
}

.e-contextmenu-wrapper.light-theme ul .e-menu-item:hover {
  background-color: #f0f0f0;
}
```

## Text Formatting

### Underline Character

Underline a character in the item text for keyboard shortcuts:

```typescript
const menuItems = [
  { text: '<u>C</u>ut' },      // Ctrl+X
  { text: '<u>C</u>opy' },     // Ctrl+C
  { text: '<u>P</u>aste' },    // Ctrl+V
  { separator: true },
  { text: '<u>D</u>elete' }    // Delete
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableHtmlSanitizer: true  // Allow HTML in items
});
```

### Text with HTML

```typescript
const menuItems = [
  { 
    text: '<span class="text-bold">Bold Text</span>'
  },
  { 
    text: '<span class="text-italic">Italic Text</span>'
  },
  { 
    text: '<strong>Delete</strong> <span class="text-muted">(Irreversible)</span>'
  }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableHtmlSanitizer: true
});
```

```css
/* Formatting styles */
.text-bold {
  font-weight: bold;
}

.text-italic {
  font-style: italic;
}

.text-muted {
  color: #999;
  font-size: 12px;
  margin-left: 8px;
}
```

## Theme Support

### Available Themes

```typescript
// Bootstrap 5 theme
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  cssClass: 'e-bootstrap5'
});

// Material theme
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  cssClass: 'e-material'
});

// Tailwind theme
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  cssClass: 'e-tailwind'
});
```

### Theme Switching

```typescript
const switchTheme = (theme: string) => {
  const contextMenu = new ContextMenu({
    items: menuItems,
    target: '#target',
    cssClass: `e-${theme}`
  });
  
  contextMenu.appendTo('#contextmenu');
};

// Usage
switchTheme('material');
switchTheme('tailwind');
```

## Context Menu CSS Classes

### Default CSS Classes

Reference these classes to customize the ContextMenu appearance:

| CSS Class | Purpose |
|-----------|---------|
| `.e-contextmenu-wrapper` | Main wrapper for entire context menu |
| `.e-contextmenu-wrapper .e-menu-parent` | Container for menu items |
| `.e-contextmenu-wrapper ul .e-menu-item` | Individual menu item element |
| `.e-contextmenu-wrapper ul .e-menu-item.e-selected .e-caret::before` | Caret icon for submenu indicator |
| `.e-contextmenu-wrapper ul .e-menu-item .e-menu-icon::before` | Icon element in menu item |

### Customizing CSS Classes

```css
/* Main wrapper - overall container */
.e-contextmenu-wrapper {
  z-index: 1000;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

/* Menu items container */
.e-contextmenu-wrapper .e-menu-parent {
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Individual menu items */
.e-contextmenu-wrapper ul .e-menu-item {
  padding: 10px 16px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  color: #333;
  font-size: 14px;
}

.e-contextmenu-wrapper ul .e-menu-item:hover {
  background-color: #f0f0f0;
}

/* Selected/active menu item */
.e-contextmenu-wrapper ul .e-menu-item.e-selected {
  background-color: #e3f2fd;
  color: #1976d2;
}

/* Menu icons */
.e-contextmenu-wrapper ul .e-menu-item .e-menu-icon::before {
  margin-right: 10px;
  vertical-align: middle;
}

/* Submenu caret/arrow */
.e-contextmenu-wrapper ul .e-menu-item.e-selected .e-caret::before {
  float: right;
  margin-left: 10px;
}

/* Separator line */
.e-contextmenu-wrapper .e-separator {
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
  cursor: default;
}

/* Disabled items */
.e-contextmenu-wrapper .e-menu-item.e-disabled {
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
```

### Advanced Customization

```css
/* Nested submenu positioning */
.e-contextmenu-wrapper .e-menu-parent .e-menu-parent {
  position: absolute;
  left: 100%;
  top: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Custom hover indicator - left border */
.e-contextmenu-wrapper ul .e-menu-item {
  position: relative;
  border-left: 3px solid transparent;
}

.e-contextmenu-wrapper ul .e-menu-item:hover {
  border-left-color: #2196F3;
}

/* Dark theme variant */
.e-contextmenu-wrapper.dark-theme {
  background-color: #2d3139;
  border-color: #1e1e1e;
}

.e-contextmenu-wrapper.dark-theme .e-menu-item {
  color: #e0e0e0;
}

.e-contextmenu-wrapper.dark-theme .e-menu-item:hover {
  background-color: #3d3f47;
}

.e-contextmenu-wrapper.dark-theme .e-separator {
  background-color: #444;
}
```

## See Also

- [Getting Started](./getting-started.md) - Basic setup
- [Menu Structure & Templates](./menu-structure.md) - Custom templates
- [API Reference](./api-reference.md) - cssClass and properties
