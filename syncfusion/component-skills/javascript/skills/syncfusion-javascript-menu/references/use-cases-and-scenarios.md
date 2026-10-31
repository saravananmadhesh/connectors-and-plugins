# Use Cases and Scenarios

## Table of Contents
- [Scrollable Menu with Large Datasets](#scrollable-menu-with-large-datasets)
- [Accordion Menu](#accordion-menu)
- [Sidebar Menu](#sidebar-menu)
- [Toolbar Integration](#toolbar-integration)
- [Context Menu Pattern](#context-menu-pattern)
- [Mnemonic UI in Menu Items](#mnemonic-ui-in-menu-items)
- [Menu with Icons and Titles](#menu-with-icons-and-titles)
- [Multi-Language Menu](#multi-language-menu)
- [Dynamic Menu Based on User Role](#dynamic-menu-based-on-user-role)

## Scrollable Menu with Large Datasets

Create a scrollable menu for displaying many items:

```typescript
import { Menu, MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

// Large dataset with many categories
let largeMenuData: MenuItemModel[] = [
    {
        text: 'Appliances',
        items: [
            { text: 'Kitchen' },
            { text: 'Television' },
            { text: 'Washing Machine' },
            { text: 'Refrigerators' },
            { text: 'Air Conditioners' },
            { text: 'Water Purifiers' },
            { text: 'Air Purifiers' },
            { text: 'Chimneys' },
            { text: 'Inverters' },
            { text: 'Healthy Living' },
            { text: 'Vacuum Cleaners' },
            { text: 'Room Heaters' },
            { text: 'New Launches' }
        ]
    },
    {
        text: 'Accessories',
        items: [
            { text: 'Mobile' },
            { text: 'Laptops' },
            { text: 'Gaming' },
            // ... more items
        ]
    }
];

let menuObj: Menu = new Menu({
    items: largeMenuData,
    enableScrolling: true
}, '#menu');
```

### CSS for Scrollable Menu

```css
.e-menu-wrapper.e-menu-popup {
    max-height: 300px;
    overflow-y: auto;
}
```

## Accordion Menu

Create an accordion-style menu where only one section expands at a time:

```typescript
let accordionMenuItems: MenuItemModel[] = [
    {
        text: 'Section 1',
        id: 'section-1',
        items: [
            { text: 'Item 1.1' },
            { text: 'Item 1.2' },
            { text: 'Item 1.3' }
        ]
    },
    {
        text: 'Section 2',
        id: 'section-2',
        items: [
            { text: 'Item 2.1' },
            { text: 'Item 2.2' },
            { text: 'Item 2.3' }
        ]
    },
    {
        text: 'Section 3',
        id: 'section-3',
        items: [
            { text: 'Item 3.1' },
            { text: 'Item 3.2' }
        ]
    }
];

let lastOpenedSection: string;

let menuObj: Menu = new Menu({
    items: accordionMenuItems,
    orientation: 'Vertical',
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Close previously opened section
        if (lastOpenedSection && lastOpenedSection !== args.parentItem?.id) {
            menuObj.close(document.getElementById(lastOpenedSection));
        }
        lastOpenedSection = args.parentItem?.id;
    }
}, '#accordion-menu');
```

## Sidebar Menu

Create a vertical sidebar menu for navigation:

```typescript
let sidebarMenuItems: MenuItemModel[] = [
    { text: 'Dashboard', id: 'dashboard', iconCss: 'e-icons e-dashboard' },
    { text: 'Products', id: 'products', iconCss: 'e-icons e-shopping-cart' },
    {
        text: 'Orders',
        id: 'orders',
        iconCss: 'e-icons e-orders',
        items: [
            { text: 'Pending', id: 'orders-pending' },
            { text: 'Completed', id: 'orders-completed' },
            { text: 'Cancelled', id: 'orders-cancelled' }
        ]
    },
    { text: 'Reports', id: 'reports', iconCss: 'e-icons e-report' },
    { text: 'Settings', id: 'settings', iconCss: 'e-icons e-settings' }
];

let sidebarMenu: Menu = new Menu({
    items: sidebarMenuItems,
    orientation: 'Vertical',
    cssClass: 'sidebar-menu',
    select: (args) => {
        loadPage(args.item.id);
    }
}, '#sidebar');

function loadPage(pageId: string) {
    console.log(`Loading page: ${pageId}`);
    // Load corresponding page content
}
```

### Sidebar Menu Styling

```css
.sidebar-menu {
    width: 250px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar-menu .e-menu-item {
    color: white;
    padding: 15px 20px;
    border-left: 3px solid transparent;
    transition: all 0.3s ease;
}

.sidebar-menu .e-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-left-color: white;
}

.sidebar-menu .e-menu-item.e-selected {
    background-color: rgba(255, 255, 255, 0.2);
    border-left-color: white;
}

.sidebar-menu .e-popup {
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
}
```

## Toolbar Integration

Integrate menu with toolbar component:

```typescript
let toolbarMenuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file-menu',
        items: [
            { text: 'New', id: 'file-new' },
            { text: 'Open', id: 'file-open' },
            { text: 'Save', id: 'file-save' },
            { separator: true },
            { text: 'Exit', id: 'file-exit' }
        ]
    },
    {
        text: 'Edit',
        id: 'edit-menu',
        items: [
            { text: 'Undo', id: 'edit-undo' },
            { text: 'Redo', id: 'edit-redo' },
            { separator: true },
            { text: 'Cut', id: 'edit-cut' },
            { text: 'Copy', id: 'edit-copy' },
            { text: 'Paste', id: 'edit-paste' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: toolbarMenuItems,
    orientation: 'Horizontal',
    select: (args) => {
        handleToolbarMenuAction(args.item.id);
    }
}, '#toolbar-menu');

function handleToolbarMenuAction(actionId: string) {
    switch (actionId) {
        case 'file-new':
            createNewDocument();
            break;
        case 'file-open':
            openDocument();
            break;
        case 'edit-cut':
            cutSelection();
            break;
        // ... more cases
    }
}
```

## Context Menu Pattern

Create a right-click context menu:

```typescript
let contextMenuItems: MenuItemModel[] = [
    { text: 'Cut', id: 'ctx-cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', id: 'ctx-copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', id: 'ctx-paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    { text: 'Delete', id: 'ctx-delete', iconCss: 'e-icons e-delete' }
];

let contextMenu: Menu = new Menu({
    items: contextMenuItems,
    cssClass: 'context-menu',
    select: (args) => {
        handleContextAction(args.item.id);
    }
}, '#context-menu');

// Show context menu on right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.open(e.pageY, e.pageX);
});
```

### Context Menu Styling

```css
.context-menu {
    position: fixed;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
}

.context-menu .e-menu-item {
    padding: 8px 16px;
}

.context-menu .e-menu-item:hover {
    background-color: #f0f0f0;
}
```

## Mnemonic UI in Menu Items

Create menu items with keyboard shortcuts:

```typescript
let mnemonicMenuItems: MenuItemModel[] = [
    {
        text: '<u>F</u>ile',  // Underline indicates mnemonic
        id: 'file',
        items: [
            { text: '<u>N</u>ew', id: 'new' },
            { text: '<u>O</u>pen', id: 'open' },
            { text: '<u>S</u>ave', id: 'save' }
        ]
    },
    {
        text: '<u>E</u>dit',
        id: 'edit',
        items: [
            { text: 'Cu<u>t</u>', id: 'cut' },
            { text: '<u>C</u>opy', id: 'copy' },
            { text: '<u>P</u>aste', id: 'paste' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: mnemonicMenuItems,
    enableHtmlSanitizer: false  // Allow HTML in text
}, '#menu');

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        switch (e.key.toUpperCase()) {
            case 'F':
                menuObj.open(document.getElementById('file-menu'));
                break;
            case 'E':
                menuObj.open(document.getElementById('edit-menu'));
                break;
        }
    }
});
```

## Menu with Icons and Titles

Create visually rich menu items:

```typescript
let richMenuItems: MenuItemModel[] = [
    {
        text: 'File',
        iconCss: 'e-icons e-file',
        items: [
            { text: 'New', iconCss: 'e-icons e-file-plus' },
            { text: 'Open', iconCss: 'e-icons e-folder-open' },
            { text: 'Save', iconCss: 'e-icons e-save' }
        ]
    },
    {
        text: 'View',
        iconCss: 'e-icons e-eye',
        items: [
            { text: 'Zoom In', iconCss: 'e-icons e-zoom-in' },
            { text: 'Zoom Out', iconCss: 'e-icons e-zoom-out' },
            { text: 'Full Screen', iconCss: 'e-icons e-fullscreen' }
        ]
    },
    {
        text: 'Tools',
        iconCss: 'e-icons e-tools',
        items: [
            { text: 'Preferences', iconCss: 'e-icons e-settings' },
            { text: 'Developer Tools', iconCss: 'e-icons e-terminal' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: richMenuItems,
    cssClass: 'icon-menu'
}, '#menu');
```

### Icon Menu Styling

```css
.icon-menu .e-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon-menu .e-icons {
    font-size: 16px;
    width: 20px;
    text-align: center;
}
```

## Multi-Language Menu

Support multiple languages dynamically:

```typescript
let languageTexts: Record<string, Record<string, string>> = {
    en: {
        file: 'File',
        open: 'Open',
        save: 'Save',
        edit: 'Edit',
        cut: 'Cut'
    },
    es: {
        file: 'Archivo',
        open: 'Abrir',
        save: 'Guardar',
        edit: 'Editar',
        cut: 'Cortar'
    },
    fr: {
        file: 'Fichier',
        open: 'Ouvrir',
        save: 'Enregistrer',
        edit: 'Édition',
        cut: 'Couper'
    }
};

function createLocalizedMenu(language: string = 'en') {
    let texts = languageTexts[language] || languageTexts['en'];

    let menuItems: MenuItemModel[] = [
        {
            text: texts.file,
            items: [
                { text: texts.open },
                { text: texts.save }
            ]
        },
        {
            text: texts.edit,
            items: [
                { text: texts.cut }
            ]
        }
    ];

    return new Menu({ items: menuItems }, '#menu');
}

// Change language
let currentLanguage = 'en';
document.getElementById('language-selector').addEventListener('change', (e) => {
    currentLanguage = (e.target as HTMLSelectElement).value;
    createLocalizedMenu(currentLanguage);
});
```

## Dynamic Menu Based on User Role

Show/hide menu items based on user permissions:

```typescript
interface UserRole {
    name: string;
    permissions: string[];
}

const rolePermissions: Record<string, string[]> = {
    admin: ['view-all', 'edit-all', 'delete-all', 'settings', 'reports'],
    manager: ['view-all', 'edit-own', 'reports'],
    user: ['view-own', 'edit-own']
};

let allMenuItems: MenuItemModel[] = [
    { text: 'Dashboard', id: 'dashboard', requiredPermission: 'view-all' },
    { text: 'Users', id: 'users', requiredPermission: 'settings' },
    { text: 'Reports', id: 'reports', requiredPermission: 'reports' },
    { text: 'Settings', id: 'settings', requiredPermission: 'settings' }
];

function createRoleBasedMenu(userRole: UserRole) {
    let visibleItems = allMenuItems.filter(item => {
        if (!item.requiredPermission) return true;
        return userRole.permissions.includes(item.requiredPermission);
    });

    return new Menu({
        items: visibleItems,
        cssClass: `role-${userRole.name}`
    }, '#menu');
}

// Usage
let currentUser = { name: 'John', role: 'manager' };
let userPermissions = rolePermissions[currentUser.role];
let userRoleObj: UserRole = {
    name: currentUser.role,
    permissions: userPermissions
};

let menuObj = createRoleBasedMenu(userRoleObj);
```
