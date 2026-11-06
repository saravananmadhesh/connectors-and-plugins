# Layout Patterns and Design

## Table of Contents
- [Spacer Element](#spacer-element)
- [Separator Element](#separator-element)
- [Button Integration](#button-integration)
- [Menu Integration](#menu-integration)
- [DropDownButton Integration](#dropdownbutton-integration)
- [Sidebar Integration](#sidebar-integration)
- [Responsive Design](#responsive-design)
- [Complex Navigation Layouts](#complex-navigation-layouts)

## Spacer Element

The **Spacer** element (`e-appbar-spacer`) distributes content within the AppBar, pushing elements to edges or creating flexible spacing.

### Basic Spacer Usage

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar: AppBar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");

const homeBtn: Button = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-home'
});
homeBtn.appendTo('#homeBtn');

const cutBtn: Button = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-cut'
});
cutBtn.appendTo('#cutBtn');

const panBtn: Button = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-pan'
});
panBtn.appendTo('#panBtn');
```

### HTML with Spacer

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Spacer Element</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar">
        <!-- Left side: Home button -->
        <button id="homeBtn"></button>
        
        <!-- Spacer pushes remaining items to right -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Right side: Edit buttons -->
        <button id="cutBtn"></button>
        <button id="panBtn"></button>
    </header>
</body>
</html>
```

### Multiple Spacers for Distributed Layout

```html
<!-- Left | Center | Right -->
<header id="appbar">
    <button id="homeBtn"></button>
    <div class="e-appbar-spacer"></div>
    
    <span class="app-title">My App</span>
    <div class="e-appbar-spacer"></div>
    
    <button id="profileBtn"></button>
</header>
```

```css
.app-title {
    text-align: center;
    flex: 0 0 auto;
}
```

### Spacer CSS

```css
.e-appbar-spacer {
    flex: 1;  /* Takes up available space */
}
```

## Separator Element

The **Separator** element (`e-appbar-separator`) creates vertical visual dividers between groups of buttons or content.

### Basic Separator Usage

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar: AppBar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");

// Group 1: Cut, Copy, Paste
const cutBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-cut'
});
cutBtn.appendTo('#cutBtn');

const copyBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-copy'
});
copyBtn.appendTo('#copyBtn');

const pasteBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-paste'
});
pasteBtn.appendTo('#pasteBtn');

// Group 2: Bold, Italic, Underline
const boldBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-bold'
});
boldBtn.appendTo('#boldBtn');

const italicBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-italic'
});
italicBtn.appendTo('#italicBtn');

const underlineBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-underline'
});
underlineBtn.appendTo('#underlineBtn');
```

### HTML with Separator

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Separator Element</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        #appbar .e-btn.e-inherit {
            margin: 0 3px;
        }
    </style>
</head>
<body>
    <header id="appbar">
        <!-- Clipboard group -->
        <button id="cutBtn"></button>
        <button id="copyBtn"></button>
        <button id="pasteBtn"></button>
        
        <!-- Separator: vertical line -->
        <div class="e-appbar-separator"></div>
        
        <!-- Formatting group -->
        <button id="boldBtn"></button>
        <button id="italicBtn"></button>
        <button id="underlineBtn"></button>
        
        <!-- Separator: vertical line -->
        <div class="e-appbar-separator"></div>
        
        <!-- Alignment group -->
        <button id="alignLeftBtn"></button>
        <button id="alignCenterBtn"></button>
        <button id="alignRightBtn"></button>
    </header>
</body>
</html>
```

### Separator CSS

```css
.e-appbar-separator {
    width: 1px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.12);
    margin: 0 8px;
    align-self: center;
}

/* Separator color in dark mode */
.e-appbar.e-dark .e-appbar-separator {
    background-color: rgba(255, 255, 255, 0.12);
}
```

## Button Integration

Buttons inherit AppBar colors when using `cssClass: 'e-inherit'`.

### Button Pattern

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

// Icon button
const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu',
  title: 'Menu'
});
menuBtn.appendTo('#menuBtn');

// Text button
const loginBtn = new Button({
  cssClass: 'e-inherit',
  content: 'Login'
});
loginBtn.appendTo('#loginBtn');

// Icon + Text button
const settingsBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-settings',
  content: 'Settings'
});
settingsBtn.appendTo('#settingsBtn');
```

### HTML Structure

```html
<header id="appbar">
    <button id="menuBtn"></button>
    <div class="e-appbar-spacer"></div>
    <button id="loginBtn"></button>
    <button id="settingsBtn"></button>
</header>
```

## Menu Integration

The **Menu** component integrates with AppBar for dropdown navigation.

### Basic Menu Pattern

```ts
import { AppBar, Menu, MenuItemModel } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

// File menu items
const fileMenuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' },
    { separator: true },
    { text: 'Exit' }
];

// File menu
const fileMenu = new Menu({
  cssClass: 'e-inherit',
  items: fileMenuItems
});
fileMenu.appendTo('#fileMenu');

// Edit menu items
const editMenuItems: MenuItemModel[] = [
    { text: 'Undo' },
    { text: 'Redo' },
    { separator: true },
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
];

const editMenu = new Menu({
  cssClass: 'e-inherit',
  items: editMenuItems
});
editMenu.appendTo('#editMenu');

// Menu button
const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Menu Integration</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <ul id="fileMenu"></ul>
        <ul id="editMenu"></ul>
        <div class="e-appbar-spacer"></div>
        <button id="helpBtn"></button>
    </header>
</body>
</html>
```

## DropDownButton Integration

The **DropDownButton** component provides inline dropdown menus in AppBar.

### DropDownButton Pattern

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { DropDownButton, ItemModel } from "@syncfusion/ej2-splitbuttons";
import { Button } from "@syncfusion/ej2-buttons";

const appbar = new AppBar({ colorMode: 'Primary' });
appbar.appendTo("#appbar");

// File menu items
const fileItems: ItemModel[] = [
    { text: 'New Document' },
    { text: 'Open' },
    { text: 'Save' }
];

const fileDropdown = new DropDownButton({
  cssClass: 'e-inherit',
  items: fileItems,
  content: 'File'
});
fileDropdown.appendTo('#fileDropdown');

// User profile menu
const profileItems: ItemModel[] = [
    { text: 'Profile' },
    { text: 'Settings' },
    { separator: true },
    { text: 'Logout' }
];

const profileDropdown = new DropDownButton({
  cssClass: 'e-inherit',
  items: profileItems,
  iconCss: 'e-icons e-user',
  content: 'User'
});
profileDropdown.appendTo('#profileDropdown');

// Menu button
const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');
```

### HTML Structure

```html
<header id="appbar">
    <button id="menuBtn"></button>
    <button id="fileDropdown">File</button>
    <div class="e-appbar-spacer"></div>
    <button id="profileDropdown">User</button>
</header>
```

## Sidebar Integration

Combine AppBar with **Sidebar** for comprehensive navigation.

### AppBar + Sidebar Pattern

```ts
import { AppBar, Sidebar, TreeView } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// AppBar header
const appbar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");

// Menu toggle button
const menuBtn = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');

// Sidebar
const sidebar = new Sidebar({
  width: '250px',
  target: '.main-content',
  isOpen: true
});
sidebar.appendTo('#sidebar');

// TreeView in sidebar
const treeData = [
    { nodeId: '01', nodeText: 'Home' },
    { nodeId: '02', nodeText: 'Documents' },
    { nodeId: '03', nodeText: 'Settings' }
];

const tree = new TreeView({
  fields: { dataSource: treeData, id: 'nodeId', text: 'nodeText' }
});
tree.appendTo('#treeview');

// Toggle sidebar on menu button click
menuBtn.element.addEventListener('click', () => {
  sidebar.toggle();
});
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>AppBar + Sidebar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        body {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 0;
        }
        
        .layout {
            display: flex;
            flex: 1;
        }
        
        .main-content {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>Dashboard</span>
        <div class="e-appbar-spacer"></div>
        <button id="profileBtn"></button>
    </header>
    
    <div class="layout">
        <aside id="sidebar">
            <div id="treeview"></div>
        </aside>
        
        <div class="main-content">
            <h3>Main Content Area</h3>
        </div>
    </div>
</body>
</html>
```

## Responsive Design

Adapt AppBar layout for different screen sizes using media queries.

### Responsive AppBar

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const isMobile = window.innerWidth < 768;

const appbar = new AppBar({
  colorMode: 'Primary',
  mode: isMobile ? 'Dense' : 'Regular',
  position: isMobile ? 'Bottom' : 'Top'
});
appbar.appendTo("#appbar");

// Update on resize
window.addEventListener('resize', () => {
  const newMode = window.innerWidth < 768 ? 'Dense' : 'Regular';
  appbar.mode = newMode;
});
```

### Responsive CSS

```css
/* Desktop: Top AppBar, Regular mode */
@media (min-width: 1024px) {
    #appbar {
        position: top;
        height: 56px;
    }
    
    #appbar .e-btn {
        margin: 0 8px;
    }
}

/* Tablet: Top AppBar, Regular mode */
@media (min-width: 600px) and (max-width: 1023px) {
    #appbar {
        position: top;
        height: 56px;
    }
    
    #appbar .e-btn {
        margin: 0 4px;
    }
}

/* Mobile: Bottom AppBar, Dense mode */
@media (max-width: 599px) {
    #appbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 48px;
        display: flex;
    }
    
    #appbar .e-btn {
        flex: 1;
        margin: 0;
    }
    
    body {
        padding-bottom: 48px;
    }
}
```

## Complex Navigation Layouts

### Example 1: E-Commerce Header

```html
<header id="appbar">
    <!-- Logo -->
    <img src="logo.png" alt="Logo" class="logo" />
    
    <!-- Search -->
    <input type="search" placeholder="Search products..." class="search" />
    
    <!-- Spacer -->
    <div class="e-appbar-spacer"></div>
    
    <!-- Right section -->
    <button id="wishlistBtn"></button>
    <button id="cartBtn"></button>
    <button id="accountBtn"></button>
</header>
```

### Example 2: SPA Dashboard

```html
<header id="appbar">
    <!-- Menu toggle -->
    <button id="toggleSidebar"></button>
    
    <!-- Page title -->
    <span class="page-title">Dashboard</span>
    
    <!-- Spacer -->
    <div class="e-appbar-spacer"></div>
    
    <!-- Notifications, settings, profile -->
    <button id="notificationsBtn"></button>
    <div class="e-appbar-separator"></div>
    <button id="settingsBtn"></button>
    <button id="profileBtn"></button>
</header>
```

### Example 3: Editor Toolbar

```html
<header id="appbar">
    <!-- File operations -->
    <button id="newBtn"></button>
    <button id="openBtn"></button>
    <button id="saveBtn"></button>
    <div class="e-appbar-separator"></div>
    
    <!-- Edit operations -->
    <button id="undoBtn"></button>
    <button id="redoBtn"></button>
    <div class="e-appbar-separator"></div>
    
    <!-- Format operations -->
    <button id="boldBtn"></button>
    <button id="italicBtn"></button>
    <button id="underlineBtn"></button>
    
    <!-- Spacer -->
    <div class="e-appbar-spacer"></div>
    
    <!-- View options -->
    <button id="zoomInBtn"></button>
    <button id="zoomOutBtn"></button>
</header>
```

## Troubleshooting

**Issue: Spacer not expanding**
- Ensure flexbox is enabled on AppBar
- Check CSS for flex: 1

**Issue: Separator color wrong**
- Verify color contrasts with background
- Adjust opacity for different color modes

**Issue: Components not inheriting color**
- Add `cssClass: 'e-inherit'` to component
- Check AppBar has colorMode set

## Next Steps

- Follow **best practices** with [Accessibility Guide](best-practices-and-accessibility.md)
- Configure **positioning** with [Positioning Guide](positioning-and-sticky.md)
- Learn **styling** with [Styling Guide](styling-customization.md)

