# Customization and Styling

## Table of Contents
- [CSS Selectors Reference](#css-selectors-reference)
- [CSS Class Customization](#css-class-customization)
- [Menu Orientation](#menu-orientation)
- [Animation Settings](#animation-settings)
- [Rounded Corners](#rounded-corners)
- [Custom Menu Items with Templates](#custom-menu-items-with-templates)
- [Right-to-Left Support](#right-to-left-support)
- [Theme Customization](#theme-customization)
- [Responsive Design](#responsive-design)

## CSS Selectors Reference

The Menu component uses the following CSS class structure based on the DOM hierarchy. Use these selectors to customize different aspects of the menu:

### Menu Wrapper Structure

```
.e-menu-wrapper                                  ← Main menu wrapper container
├── .e-menu-parent .e-ul                        ← Parent UL element
│   ├── .e-menu-item                            ← Individual menu items
│   │   ├── .e-menu-text                        ← Item text
│   │   ├── .e-caret                            ← Caret icon for nested items
│   │   └── .e-icons                            ← Menu item icons
│   └── .e-menu-parent .e-ul                    ← Nested sub-menus
│
└── .e-menu-wrapper.e-menu-popup                ← Popup submenu wrapper
    └── ul .e-menu-item                         ← Popup menu items
```

### Primary CSS Selectors

| Selector | Purpose | Usage |
|----------|---------|-------|
| `.e-menu-wrapper` | Main menu wrapper | Customize overall menu container |
| `.e-menu-wrapper.e-menu-popup` | Popup submenu wrapper | Customize popup submenus |
| `.e-menu-wrapper ul` | Menu lists | Style menu list elements |
| `.e-menu-wrapper ul .e-menu-item` | Menu items | Customize individual items |
| `.e-menu-wrapper.e-menu-popup .e-menu-item` | Popup items | Customize popup menu items |
| `.e-menu-wrapper ul .e-menu-item .e-caret` | Caret icons | Customize caret for nested items |
| `.e-menu-item.e-focused` | Focused item | Style focused menu items |
| `.e-menu-item.e-selected` | Selected item | Style selected menu items |
| `.e-menu-item.e-disabled` | Disabled item | Style disabled items |

### Example: Using CSS Selectors

```css
/* Customize menu wrapper */
.e-menu-wrapper {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
}

/* Customize menu popup (submenu) wrapper */
.e-menu-wrapper.e-menu-popup {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Customize menu items in wrapper */
.e-menu-wrapper ul .e-menu-item {
    padding: 10px 15px;
    color: #333;
    transition: all 0.2s ease;
}

/* Customize popup menu items */
.e-menu-wrapper.e-menu-popup .e-menu-item {
    border-bottom: 1px solid #f0f0f0;
}

/* Customize caret icon */
.e-menu-wrapper ul .e-menu-item .e-caret {
    margin-left: 8px;
    color: #666;
}
```

### Complete DOM-Based Customization Example

```css
/* Main menu wrapper - horizontal bar */
.e-menu-wrapper {
    background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%);
    padding: 0;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Menu lists */
.e-menu-wrapper ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* Individual menu items */
.e-menu-wrapper ul .e-menu-item {
    color: white;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
}

.e-menu-wrapper ul .e-menu-item:hover {
    background-color: #16a085;
    border-bottom-color: #1abc9c;
}

/* Popup submenu wrapper */
.e-menu-wrapper.e-menu-popup {
    background-color: #ecf0f1;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    min-width: 200px;
}

/* Items inside popup */
.e-menu-wrapper.e-menu-popup .e-menu-item {
    color: #2c3e50;
    padding: 10px 12px;
    border-bottom: 1px solid #bdc3c7;
}

.e-menu-wrapper.e-menu-popup .e-menu-item:hover {
    background-color: #d5dbdb;
    border-bottom-color: #95a5a6;
}

/* Caret icon styling */
.e-menu-wrapper ul .e-menu-item .e-caret {
    width: 6px;
    height: 6px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg);
    margin-left: auto;
}

/* Focused menu item */
.e-menu-item.e-focused {
    background-color: #16a085;
    outline: none;
}

/* Selected menu item */
.e-menu-item.e-selected {
    background-color: #1abc9c;
}

/* Disabled menu item */
.e-menu-item.e-disabled {
    color: #95a5a6;
    cursor: not-allowed;
    opacity: 0.6;
}
```

## CSS Class Customization

Apply custom CSS classes using the `cssClass` property:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    { text: 'File', items: [{ text: 'Open' }, { text: 'Save' }] },
    { text: 'Edit', items: [{ text: 'Cut' }, { text: 'Copy' }] }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    cssClass: 'custom-menu dark-theme'
}, '#menu');
```

### Custom CSS Example

```css
/* Custom styling for menu */
.custom-menu {
    background-color: #2c3e50;
    border-radius: 4px;
}

.custom-menu .e-menu-item {
    color: #ecf0f1;
    padding: 12px 16px;
    font-weight: 500;
}

.custom-menu .e-menu-item:hover {
    background-color: #34495e;
    color: #fff;
}

.custom-menu.e-menu-wrapper.e-menu-popup .e-menu-item {
    background-color: #34495e;
}

.dark-theme .e-menu-item {
    border-color: #1a1a1a;
}
```

## Menu Orientation

Display menu items horizontally or vertically:

### Horizontal Orientation (Default)

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'File', items: [{ text: 'Open' }, { text: 'Save' }] },
    { text: 'Edit', items: [{ text: 'Cut' }, { text: 'Copy' }] },
    { text: 'View' }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    orientation: 'Horizontal'  // Default
}, '#menu');
```

### Vertical Orientation

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    orientation: 'Vertical'
}, '#menu');
```

### Styling for Vertical Menu

```css
.e-menu-wrapper .e-vertical {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.e-menu-wrapper .e-vertical ul .e-menu-item {
    border-left: 3px solid transparent;
    padding: 10px 15px;
    transition: all 0.3s ease;
}

.e-menu-wrapper.e-vertical ul .e-menu-item:hover {
    border-left-color: #007bff;
    background-color: #f8f9fa;
}
```

## Animation Settings

Configure animations for sub-menu opening:

```typescript
import { Menu, MenuAnimationSettingsModel, MenuEffect } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    { text: 'File', items: [{ text: 'Open' }, { text: 'Save' }] },
    { text: 'Edit', items: [{ text: 'Cut' }, { text: 'Copy' }] }
];

let animationSettings: MenuAnimationSettingsModel = {
    effect: MenuEffect.FadeIn,    // Animation effect
    duration: 300,                 // Duration in milliseconds
    easing: 'ease-in-out'         // Easing function
};

let menuObj: Menu = new Menu({
    items: menuItems,
    animationSettings: animationSettings
}, '#menu');
```

### Available Animation Effects

```typescript
// FadeIn - Fade effect
animationSettings: { effect: MenuEffect.FadeIn, duration: 300 }

// ZoomIn - Zoom effect
animationSettings: { effect: MenuEffect.ZoomIn, duration: 300 }

// SlideDown - Slide effect
animationSettings: { effect: MenuEffect.SlideDown, duration: 300 }

// None - No animation
animationSettings: { effect: MenuEffect.None }
```

### Complete Animation Example

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    animationSettings: {
        effect: MenuEffect.SlideDown,
        duration: 400,
        easing: 'ease-out'
    }
}, '#menu');
```

## Rounded Corners

Apply rounded corners to menu items:

```css
/* Rounded menu wrapper */
.e-menu-wrapper {
    border-radius: 8px;
    overflow: hidden;
}

/* Rounded menu items */
.e-menu-wrapper ul .e-menu-item {
    border-radius: 4px;
    margin: 2px;
}

/* Rounded popup (submenu) */
.e-menu-wrapper.e-menu-popup {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### TypeScript Implementation

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    cssClass: 'rounded-menu'
}, '#menu');
```

### Combined CSS

```css
.rounded-menu {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rounded-menu .e-menu-item {
    border-radius: 4px;
    margin: 2px 4px;
    transition: all 0.2s ease;
}

.rounded-menu .e-menu-item:hover {
    background-color: #007bff;
    color: white;
    border-radius: 6px;
}

.rounded-menu.e-menu-wrapper.e-menu-popup {
    border-radius: 8px;
    margin-top: 4px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
```

## Custom Menu Items with Templates

Use HTML templates to create custom menu items:

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'File' },
    { text: 'Edit' },
    { text: 'Help' }
];

let templateString = `
    <div style="padding: 8px;">
        <span style="color: #007bff; font-weight: bold;">\${text}</span>
    </div>
`;

let menuObj: Menu = new Menu({
    items: menuItems,
    template: templateString
}, '#menu');
```

### Template with Conditions

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'Home', badge: 'new' },
    { text: 'Products', count: 5 },
    { text: 'Settings' }
];

let templateString = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>\${text}</span>
        \${if(badge)}<span style="background: red; color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px;">\${badge}</span>\${/if}
        \${if(count)}<span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 3px;">\${count}</span>\${/if}
    </div>
`;

let menuObj: Menu = new Menu({
    items: menuItems,
    template: templateString
}, '#menu');
```

### Template Function

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    template: (props: any) => {
        return `<div class="custom-item">
                    <i class="icon icon-${props.text.toLowerCase()}"></i>
                    ${props.text}
                </div>`;
    }
}, '#menu');
```

## Right-to-Left Support

Enable RTL mode for Arabic, Hebrew, and other right-to-left languages:

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    enableRtl: true
}, '#menu');
```

### RTL HTML

```html
<html dir="rtl">
<head>
    <meta charset="utf-8" />
    <title>RTL Menu</title>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <ul id="menu"></ul>
    </div>

    <script src="url"></script>
    <script>
        var menuItems = [
            { text: 'ملف', items: [{ text: 'فتح' }, { text: 'حفظ' }] },
            { text: 'تحرير', items: [{ text: 'قص' }, { text: 'نسخ' }] }
        ];

        var menuObj = new ej.navigations.Menu({
            items: menuItems,
            enableRtl: true
        }, '#menu');
    </script>
</body>
</html>
```

## Theme Customization

Change themes using different CSS files or CSS variables:

### Using Different Theme Files

```typescript
// Fluent2 Theme
import '@syncfusion/ej2-navigations/styles/fluent2.css';

// Material Theme
// import '@syncfusion/ej2-navigations/styles/material.css';

// Bootstrap4 Theme
// import '@syncfusion/ej2-navigations/styles/bootstrap4.css';

let menuObj: Menu = new Menu({
    items: menuItems,
    cssClass: 'e-fluent2-light'  // Apply theme class
}, '#menu');
```

### Custom Theme with CSS Variables

```css
:root {
    --primary-color: #007bff;
    --primary-hover: #0056b3;
    --menu-bg: #ffffff;
    --menu-text: #333333;
    --border-color: #e0e0e0;
}

.custom-theme {
    --primary-color: #20c997;
    --primary-hover: #1a9876;
    --menu-bg: #f8f9fa;
    --menu-text: #212529;
}

.e-menu-wrapper {
    background-color: var(--menu-bg);
    color: var(--menu-text);
    border: 1px solid var(--border-color);
}

.e-menu-wrapper ul .e-menu-item:hover {
    background-color: var(--primary-color);
    color: white;
}

.e-menu-wrapper ul .e-menu-item.e-focused {
    background-color: var(--primary-hover);
}
```

## Responsive Design

Make menu responsive for mobile and desktop:

```css
/* Desktop - Horizontal Menu */
@media (min-width: 768px) {
    .e-menu-wrapper {
        display: flex;
        flex-direction: row;
    }

    .e-menu-wrapper ul .e-menu-item {
        flex: 0 1 auto;
    }
}

/* Mobile - Vertical Hamburger Menu */
@media (max-width: 767px) {
    .e-menu-wrapper {
        position: fixed;
        left: -100%;
        top: 60px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: left;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    }

    .e-menu-wrapper.active {
        left: 0;
    }

    .e-menu-wrapper ul .e-menu-item {
        padding: 15px;
        border-bottom: 1px solid #f0f0f0;
    }
}

/* Hamburger toggle button */
.hamburger {
    display: none;
}

@media (max-width: 767px) {
    .hamburger {
        display: block;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
}
```

### TypeScript for Responsive Menu

```typescript
import { Menu } from '@syncfusion/ej2-navigations';

let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: window.innerWidth < 768,
    target: '.navbar'  // Element to attach hamburger menu
}, '#menu');

// Update on resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        menuObj.hamburgerMode = true;
    } else {
        menuObj.hamburgerMode = false;
    }
});
```

## Complete Customization Example

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    orientation: 'Horizontal',
    cssClass: 'modern-menu',
    enableRtl: false,
    animationSettings: {
        effect: MenuEffect.SlideDown,
        duration: 300,
        easing: 'ease-out'
    },
    enableScrolling: false,
    hoverDelay: 0
}, '#menu');
```

```css
.modern-menu {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.modern-menu .e-menu-item {
    color: white;
    padding: 12px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    border-radius: 4px;
    margin: 2px;
}

.modern-menu .e-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.modern-menu .e-popup {
    background: white;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.modern-menu .e-popup .e-menu-item {
    color: #333;
}

.modern-menu .e-popup .e-menu-item:hover {
    background-color: #f0f0f0;
    transform: none;
}
```
