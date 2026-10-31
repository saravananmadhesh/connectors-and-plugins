# File Menu

This guide covers the File Menu feature in the Ribbon, which provides a dropdown menu for application-level commands like New, Open, Save, and Options. **File Menu requires the RibbonFileMenu module.**

## Table of Contents

- [File Menu Overview](#file-menu-overview)
- [Module Injection](#module-injection)
- [Basic File Menu Setup](#basic-file-menu-setup)
- [Adding Menu Items](#adding-menu-items)
- [Menu Item Properties](#menu-item-properties)
- [Submenu on Click](#submenu-on-click)
- [Custom Header Text](#custom-header-text)
- [Menu Item Icons](#menu-item-icons)
- [Menu Item Templates](#menu-item-templates)
- [File Menu Events](#file-menu-events)
- [File Menu Module Methods](#file-menu-module-methods)
- [Complete Examples](#complete-examples)

## File Menu Overview

The File Menu provides a dropdown menu for file and application operations:

- **Typical items**: New, Open, Save, Save As, Print, Options, Exit
- **Location**: Appears before the first tab (usually as "File" button)
- **Behavior**: Opens dropdown menu with actions
- **Use cases**: Document management, application settings, user account

**Key features:**
- Hierarchical menu structure with submenus
- Icons and custom templates
- Click events for each menu item
- Customizable header text and styling

## Module Injection

File Menu requires the `RibbonFileMenu` module:

```typescript
import { Ribbon, RibbonFileMenu } from "@syncfusion/ej2-ribbon";

// Inject FileMenu module
Ribbon.Inject(RibbonFileMenu);
```

**Important:** Always inject `RibbonFileMenu` before creating a Ribbon with a file menu.

## Basic File Menu Setup

Create a simple File Menu:

```typescript
import { Ribbon, RibbonFileMenu } from "@syncfusion/ej2-ribbon";
import { MenuItemModel } from "@syncfusion/ej2-navigations";

Ribbon.Inject(RibbonFileMenu);

let fileMenuItems: MenuItemModel[] = [
    { text: "New", id: "new" },
    { text: "Open", id: "open" },
    { text: "Save", id: "save" }
];

let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems
    },
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- `visible: true` shows the File Menu
- `menuItems` defines the menu structure
- Each item has `text` and optional `id` for identification

## Adding Menu Items

Define menu items with text, icons, and IDs:

```typescript
let fileMenuItems: MenuItemModel[] = [
    { 
        text: "New", 
        id: "new",
        iconCss: "e-icons e-file-new"
    },
    { 
        text: "Open", 
        id: "open",
        iconCss: "e-icons e-folder-open"
    },
    { 
        text: "Save", 
        id: "save",
        iconCss: "e-icons e-save"
    },
    { 
        separator: true // Visual separator
    },
    { 
        text: "Print", 
        id: "print",
        iconCss: "e-icons e-print"
    },
    { 
        text: "Exit", 
        id: "exit"
    }
];
```

**Key points:**
- Each item can have an icon (`iconCss`)
- Use `separator: true` to add visual dividers
- Items appear in the order they are defined

## Menu Item Properties

Available properties for menu items:

```typescript
let fileMenuItems: MenuItemModel[] = [{
    text: "Save As",              // Display text
    id: "save-as",                // Unique identifier
    iconCss: "e-icons e-save",    // Icon CSS class
    url: "#save-as",              // Link URL (optional)
    separator: false,             // Show separator after item
    items: [],                    // Submenu items
    hidden: false,                // Hide the item
    disabled: false               // Disable the item
}];
```

**Common properties:**
- `text` (string, required): Display text
- `id` (string): Unique identifier for events
- `iconCss` (string): CSS class for icon
- `items` (array): Submenu items
- `separator` (boolean): Add separator line
- `disabled` (boolean): Disable the item
- `hidden` (boolean): Hide the item

## Submenu on Click

Create hierarchical menus with submenus:

```typescript
let fileMenuItems: MenuItemModel[] = [
    { 
        text: "New",
        id: "new",
        iconCss: "e-icons e-file-new",
        items: [
            { text: "Blank Document", id: "new-blank" },
            { text: "From Template", id: "new-template" },
            { separator: true },
            { text: "From URL", id: "new-url" }
        ]
    },
    { 
        text: "Open",
        id: "open",
        iconCss: "e-icons e-folder-open",
        items: [
            { text: "Open File", id: "open-file" },
            { text: "Open Folder", id: "open-folder" },
            { text: "Open Recent", id: "open-recent" }
        ]
    }
];
```

**Submenu behavior:**
- Hover or click parent item to show submenu
- Submenus can be nested (multiple levels)
- Use separators to group related submenu items

## Custom Header Text

Customize the File Menu button text:

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        text: "File", // Custom text (default: "File")
        menuItems: fileMenuItems
    },
    tabs: []
});
```

**Alternative header text examples:**
- "File" (default)
- "Menu"
- "Actions"
- "" (empty for icon-only)

## Menu Item Icons

Add icons to menu items for visual identification:

```typescript
let fileMenuItems: MenuItemModel[] = [
    { 
        text: "New", 
        iconCss: "e-icons e-file-new" // Syncfusion icon
    },
    { 
        text: "Open", 
        iconCss: "e-icons e-folder-open"
    },
    { 
        text: "Save", 
        iconCss: "e-icons e-save"
    },
    { 
        text: "Print", 
        iconCss: "e-icons e-print"
    },
    { 
        text: "Settings", 
        iconCss: "custom-icon-settings" // Custom CSS class
    }
];
```

**Icon sources:**
- Syncfusion built-in icons: `e-icons e-[name]`
- Font Awesome: `fa fa-[name]`
- Custom CSS classes with background images

## Menu Item Templates

Use custom templates for rich menu item content:

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems,
        template: '<div class="custom-menu-item">' +
                  '  <span class="${iconCss}"></span>' +
                  '  <div>' +
                  '    <h4>${text}</h4>' +
                  '    <p>${description}</p>' +
                  '  </div>' +
                  '</div>'
    },
    tabs: []
});

let fileMenuItems: MenuItemModel[] = [{
    text: "New Document",
    description: "Create a blank document",
    iconCss: "e-icons e-file-new"
}, {
    text: "Open",
    description: "Open an existing document",
    iconCss: "e-icons e-folder-open"
}];
```

## File Menu Events

Handle menu item selection and menu state:

### Select Event

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems,
        select: (args) => {
            console.log("Selected item:", args.item.id);
            
            switch (args.item.id) {
                case "new":
                    createNewDocument();
                    break;
                case "open":
                    openDocument();
                    break;
                case "save":
                    saveDocument();
                    break;
                case "exit":
                    closeApplication();
                    break;
            }
        }
    },
    tabs: []
});
```

### Before Open Event

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems,
        beforeOpen: (args) => {
            console.log("File menu opening");
            // Update menu state before opening
            // E.g., enable/disable items based on context
        }
    },
    tabs: []
});
```

### Before Close Event

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems,
        beforeClose: (args) => {
            console.log("File menu closing");
            // Perform cleanup or save state
        }
    },
    tabs: []
});
```

**Available events:**
- `select`: Triggered when a menu item is clicked
- `beforeOpen`: Triggered before menu opens
- `beforeClose`: Triggered before menu closes
- `open`: Triggered after menu opens
- `close`: Triggered after menu closes

## File Menu Module Methods

The `RibbonFileMenu` module provides methods for programmatically managing file menu items and visibility:

### Adding Menu Items

Add items dynamically to the file menu:

```typescript
let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: [
            { text: "New", id: "new", iconCss: "e-icons e-file-new" }
        ]
    },
    tabs: []
});

ribbon.appendTo("#ribbon");

// Add items dynamically
function addFileMenuItems(newItems: MenuItemModel[]) {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        ribbon.fileMenu.menuItems = [
            ...ribbon.fileMenu.menuItems,
            ...newItems
        ];
    }
}

// Example: Add Save As and Print items
addFileMenuItems([
    { text: "Save As", id: "save-as", iconCss: "e-icons e-save" },
    { text: "Print", id: "print", iconCss: "e-icons e-print" }
]);
```

### Removing Menu Items

Remove items from the file menu:

```typescript
function removeFileMenuItem(itemId: string) {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        ribbon.fileMenu.menuItems = ribbon.fileMenu.menuItems.filter(
            item => item.id !== itemId
        );
    }
}

// Example: Remove "Recent Files" item
removeFileMenuItem("recent");
```

### Disabling and Enabling Items

Control menu item availability:

```typescript
function disableFileMenuItem(itemId: string) {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        const item = ribbon.fileMenu.menuItems.find(i => i.id === itemId);
        if (item) {
            item.disabled = true;
        }
    }
}

function enableFileMenuItem(itemId: string) {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        const item = ribbon.fileMenu.menuItems.find(i => i.id === itemId);
        if (item) {
            item.disabled = false;
        }
    }
}

// Example: Disable "Print" if no printer available
disableFileMenuItem("print");

// Example: Enable items based on document state
function updateMenuState(hasDocument: boolean) {
    if (hasDocument) {
        enableFileMenuItem("save");
        enableFileMenuItem("print");
    } else {
        disableFileMenuItem("save");
        disableFileMenuItem("print");
    }
}
```

### Updating Menu Items

Modify existing menu items:

```typescript
function updateFileMenuItem(itemId: string, updates: Partial<MenuItemModel>) {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        const item = ribbon.fileMenu.menuItems.find(i => i.id === itemId);
        if (item) {
            Object.assign(item, updates);
        }
    }
}

// Example: Update item text
updateFileMenuItem("new", { text: "New Document" });

// Example: Update item icon
updateFileMenuItem("open", { iconCss: "e-icons e-folder" });

// Example: Update multiple properties
updateFileMenuItem("save-as", { 
    text: "Save As...", 
    iconCss: "e-icons e-save-copy" 
});
```

### Finding Menu Items

Search for menu items:

```typescript
function findFileMenuItem(itemId: string): MenuItemModel | undefined {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        return ribbon.fileMenu.menuItems.find(i => i.id === itemId);
    }
}

function getMenuItemsByPrefix(prefix: string): MenuItemModel[] {
    if (ribbon.fileMenu && ribbon.fileMenu.menuItems) {
        return ribbon.fileMenu.menuItems.filter(
            item => item.id?.startsWith(prefix)
        );
    }
    return [];
}

// Example: Find "Save" item
const saveItem = findFileMenuItem("save");
if (saveItem) {
    console.log("Save item found:", saveItem.text);
}

// Example: Get all recent file items
const recentItems = getMenuItemsByPrefix("recent-");
console.log("Recent files:", recentItems);
```

## Complete Examples

### Example 1: Document Editor File Menu

```typescript
import { Ribbon, RibbonFileMenu } from "@syncfusion/ej2-ribbon";
import { MenuItemModel } from "@syncfusion/ej2-navigations";

Ribbon.Inject(RibbonFileMenu);

let fileMenuItems: MenuItemModel[] = [
    { 
        text: "New",
        id: "new",
        iconCss: "e-icons e-file-new",
        items: [
            { text: "Blank Document", id: "new-blank" },
            { text: "Blog Post", id: "new-blog" },
            { text: "Resume", id: "new-resume" }
        ]
    },
    { 
        text: "Open",
        id: "open",
        iconCss: "e-icons e-folder-open",
        items: [
            { text: "Open File", id: "open-file" },
            { text: "Open Recent", id: "open-recent" }
        ]
    },
    { separator: true },
    { 
        text: "Save",
        id: "save",
        iconCss: "e-icons e-save"
    },
    { 
        text: "Save As",
        id: "save-as",
        iconCss: "e-icons e-save",
        items: [
            { text: "PDF", id: "save-pdf" },
            { text: "Word Document", id: "save-docx" },
            { text: "Plain Text", id: "save-txt" }
        ]
    },
    { separator: true },
    { 
        text: "Print",
        id: "print",
        iconCss: "e-icons e-print"
    },
    { 
        text: "Print Preview",
        id: "print-preview",
        iconCss: "e-icons e-preview"
    },
    { separator: true },
    { 
        text: "Options",
        id: "options",
        iconCss: "e-icons e-settings"
    },
    { 
        text: "Exit",
        id: "exit"
    }
];

let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        text: "File",
        menuItems: fileMenuItems,
        select: (args) => {
            console.log("Menu item selected:", args.item.id);
            handleFileMenuAction(args.item.id);
        }
    },
    tabs: [/* tabs configuration */]
});

ribbon.appendTo("#ribbon");

function handleFileMenuAction(id: string) {
    switch (id) {
        case "new-blank":
            console.log("Creating blank document...");
            break;
        case "open-file":
            console.log("Opening file dialog...");
            break;
        case "save":
            console.log("Saving document...");
            break;
        case "print":
            console.log("Opening print dialog...");
            break;
        case "exit":
            console.log("Closing application...");
            break;
    }
}
```

### Example 2: Application Settings Menu

```typescript
let fileMenuItems: MenuItemModel[] = [
    { 
        text: "Account",
        id: "account",
        iconCss: "e-icons e-user",
        items: [
            { text: "Sign In", id: "sign-in" },
            { text: "Sign Out", id: "sign-out", disabled: true },
            { separator: true },
            { text: "Manage Account", id: "manage-account" }
        ]
    },
    { 
        text: "Settings",
        id: "settings",
        iconCss: "e-icons e-settings",
        items: [
            { text: "General", id: "settings-general" },
            { text: "Appearance", id: "settings-appearance" },
            { text: "Language", id: "settings-language" },
            { text: "Advanced", id: "settings-advanced" }
        ]
    },
    { separator: true },
    { 
        text: "Help",
        id: "help",
        iconCss: "e-icons e-help",
        items: [
            { text: "Documentation", id: "help-docs" },
            { text: "Tutorial", id: "help-tutorial" },
            { text: "Support", id: "help-support" },
            { separator: true },
            { text: "About", id: "help-about" }
        ]
    }
];

let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        text: "Menu",
        menuItems: fileMenuItems,
        select: (args) => {
            handleMenuSelection(args.item.id);
        },
        beforeOpen: (args) => {
            // Update menu state based on user login status
            updateMenuState();
        }
    },
    tabs: []
});

ribbon.appendTo("#ribbon");

function updateMenuState() {
    const isLoggedIn = checkLoginStatus();
    // Enable/disable menu items based on login state
}

function handleMenuSelection(id: string) {
    console.log("Menu action:", id);
}
```

### Example 3: Recent Files Menu

```typescript
let recentFiles = [
    { name: "Document1.docx", path: "/documents/doc1.docx" },
    { name: "Presentation.pptx", path: "/presentations/pres1.pptx" },
    { name: "Spreadsheet.xlsx", path: "/spreadsheets/sheet1.xlsx" }
];

let fileMenuItems: MenuItemModel[] = [
    { 
        text: "New",
        id: "new",
        iconCss: "e-icons e-file-new"
    },
    { 
        text: "Open",
        id: "open",
        iconCss: "e-icons e-folder-open"
    },
    { separator: true },
    { 
        text: "Recent Files",
        id: "recent",
        iconCss: "e-icons e-history",
        items: recentFiles.map((file, index) => ({
            text: file.name,
            id: `recent-${index}`,
            path: file.path
        }))
    },
    { separator: true },
    { 
        text: "Save",
        id: "save",
        iconCss: "e-icons e-save"
    }
];

let ribbon: Ribbon = new Ribbon({
    fileMenu: {
        visible: true,
        menuItems: fileMenuItems,
        select: (args) => {
            if (args.item.id && args.item.id.startsWith("recent-")) {
                console.log("Opening recent file:", args.item.path);
                openFile(args.item.path);
            }
        }
    },
    tabs: []
});

ribbon.appendTo("#ribbon");

function openFile(path: string) {
    console.log("Opening file at:", path);
}
```

These examples demonstrate different File Menu configurations: document editor with file operations, application settings menu, and dynamic recent files menu.
