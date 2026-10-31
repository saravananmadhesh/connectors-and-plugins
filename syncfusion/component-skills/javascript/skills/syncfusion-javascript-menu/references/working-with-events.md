# Working with Events

## Table of Contents
- [Show Menu Items on Click](#show-menu-items-on-click)
- [Event Types Overview](#event-types-overview)
- [Select Event](#select-event)
- [BeforeOpen and OnOpen Events](#beforeopen-and-onopen-events)
- [BeforeClose and OnClose Events](#beforeclose-and-onclose-events)
- [BeforeItemRender Event](#beforeitemrender-event)
- [Event Argument Properties](#event-argument-properties)
- [Event Handling Patterns](#event-handling-patterns)
- [Real-World Examples](#real-world-examples)

## Show Menu Items on Click

By default, the Menu component opens submenus on hover. Use the `showItemOnClick` property to open submenus only on click:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'Open' },
            { text: 'Save' },
            { text: 'Exit' }
        ]
    },
    {
        text: 'Edit',
        items: [
            { text: 'Cut' },
            { text: 'Copy' },
            { text: 'Paste' }
        ]
    },
    {
        text: 'View',
        items: [
            {
                text: 'Toolbars',
                items: [
                    { text: 'Menu Bar' },
                    { text: 'Bookmarks Toolbar' },
                    { text: 'Customize' }
                ]
            },
            {
                text: 'Zoom',
                items: [
                    { text: 'Zoom In' },
                    { text: 'Zoom Out' },
                    { text: 'Reset' }
                ]
            },
            { text: 'Full Screen' }
        ]
    }
];

// Initialize menu with showItemOnClick enabled
let menuObj: Menu = new Menu({
    items: menuItems,
    showItemOnClick: true,
    cssClass: 'e-rounded-menu'
}, '#menu');
```

### Behavior with showItemOnClick

- **true**: Submenus open only on click, not on hover
- **false** (default): Submenus open on hover
- Useful for touch devices or when you want precise control over submenu visibility
- Reduces accidental menu openings from mouse movement

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Menu with Click to Open</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <ul id="menu"></ul>
</body>
</html>
```

## Event Types Overview

The Menu component provides five main events for interaction tracking:

| Event | Trigger | Argument Type |
|-------|---------|---------------|
| `select` | When a menu item is clicked/selected | `MenuEventArgs` |
| `beforeOpen` | Before a submenu opens | `BeforeOpenCloseMenuEventArgs` |
| `onOpen` | After a submenu opens | `OpenCloseMenuEventArgs` |
| `beforeClose` | Before a submenu closes | `BeforeOpenCloseMenuEventArgs` |
| `onClose` | After a submenu closes | `OpenCloseMenuEventArgs` |
| `beforeItemRender` | Before each menu item renders | `MenuEventArgs` |

## Select Event

Triggered when a menu item is selected:

```typescript
import { Menu, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'Open', id: 'file-open' },
            { text: 'Save', id: 'file-save' },
            { text: 'Exit', id: 'file-exit' }
        ]
    },
    { text: 'Help', id: 'help' }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        console.log(`Item selected: ${args.item.text}`);
        console.log(`Item ID: ${args.item.id}`);
    }
}, '#menu');
```

### MenuEventArgs Properties

Triggered for **select** and **beforeItemRender** events.

```typescript
interface MenuEventArgs {
    name: string;              // Specifies name of the event
    item: MenuItemModel;       // The menu item being interacted with
    element: HTMLElement;      // The DOM element of the menu item
    isChecked: boolean;        // Whether item is checked (if applicable)
    isFocused: boolean;        // Whether item has focus
}
```

**Property Descriptions:**
- `name` - Specifies the event name (e.g., 'select', 'beforeItemRender')
- `item` - The MenuItemModel object of the selected/rendered item
- `element` - The actual DOM element (HTMLElement) of the menu item
- `isChecked` - Boolean indicating if the item is in a checked state
- `isFocused` - Boolean indicating if the item currently has focus

### Practical Select Example

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        if (args.item.id === 'file-open') {
            handleFileOpen();
        } else if (args.item.id === 'file-save') {
            handleFileSave();
        } else if (args.item.id === 'file-exit') {
            handleFileExit();
        }
    }
}, '#menu');

function handleFileOpen() {
    console.log('Opening file dialog...');
}

function handleFileSave() {
    console.log('Saving file...');
}

function handleFileExit() {
    console.log('Exiting application...');
}
```

## BeforeOpen and OnOpen Events

Handle events when submenus are about to open or have opened:

```typescript
import { BeforeOpenCloseMenuEventArgs, OpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        console.log(`About to open: ${args.name}`);
    },
    onOpen: (args: OpenCloseMenuEventArgs) => {
        console.log(`Opened: ${args.name}`);
    }
}, '#menu');
```

### BeforeOpenCloseMenuEventArgs Properties

Triggered for **beforeOpen** and **beforeClose** events.

```typescript
interface BeforeOpenCloseMenuEventArgs {
    name: string;              // Specifies name of the event
    cancel: boolean;           // Set true to prevent the action
    element: HTMLElement;      // The submenu element
    items: MenuItemModel[];    // Items in the submenu
    isOpen: boolean;           // Whether submenu is being opened
    parentItem: MenuItemModel; // Parent menu item (for submenus)
    top?: number;              // Top position for submenu (optional)
    left?: number;             // Left position for submenu (optional)
}
```

**Property Descriptions:**
- `name` - Specifies the event name ('beforeOpen', 'beforeClose')
- `cancel` - Set to true to prevent/cancel the menu action
- `element` - The submenu DOM element
- `items` - Array of MenuItemModel objects in the submenu
- `isOpen` - Boolean indicating whether menu is being opened or closed
- `parentItem` - The parent MenuItemModel (useful for nested menus)
- `top` - Optional vertical position for submenu placement
- `left` - Optional horizontal position for submenu placement

### OpenCloseMenuEventArgs Properties

Triggered for **onOpen** and **onClose** events.

```typescript
interface OpenCloseMenuEventArgs {
    name: string;              // Specifies name of the event
    element: HTMLElement;      // The menu/submenu element
}
```

**Property Descriptions:**
- `name` - Specifies the event name ('onOpen', 'onClose')
- `element` - The menu or submenu DOM element

### Practical Open Event Example

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Load data before opening submenu
        if (args.parentItem && !args.parentItem.items) {
            args.parentItem.items = loadDynamicItems();
        }

        // Cancel opening under certain conditions
        if (!isUserAuthorized()) {
            args.cancel = true;
        }
    },
    onOpen: (args: OpenCloseMenuEventArgs) => {
        // Apply custom styling after opening
        console.log('Submenu opened successfully');
    }
}, '#menu');
```

## BeforeClose and OnClose Events

Handle events when submenus are about to close or have closed:

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
        console.log(`About to close: ${args.name}`);
        // Prevent closing under certain conditions
        if (userWantsToStay) {
            args.cancel = true;
        }
    },
    onClose: (args: OpenCloseMenuEventArgs) => {
        console.log(`Closed: ${args.name}`);
    }
}, '#menu');
```

## BeforeItemRender Event

Triggered before each menu item is rendered, allowing customization:

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeItemRender: (args: MenuEventArgs) => {
        // Customize item appearance
        if (args.item.text === 'Settings') {
            args.item.iconCss = 'e-icons e-settings';
        }

        // Disable certain items based on conditions
        if (args.item.id === 'file-save' && !hasUnsavedChanges()) {
            args.element.classList.add('e-disabled');
        }
    }
}, '#menu');
```

## Event Argument Properties

### Common Properties

All event arguments have these properties:

```typescript
// Event name
args.name  // 'select', 'beforeOpen', 'onOpen', etc.

// Element reference
args.element  // HTMLElement reference

// Item being operated on
args.item  // MenuItemModel
```

### Special Properties

Some events have additional properties:

```typescript
// BeforeOpen/beforeClose specific
args.cancel        // Set to true to cancel the action
args.isOpen        // Whether menu is being opened
args.parentItem    // Parent menu item for submenus

// Select specific
args.isChecked  // Whether item is checked
args.isFocused  // Whether item has focus
```

## Event Handling Patterns

### Pattern 1: Simple Event Logging

```typescript
let eventLog: string[] = [];

let menuObj: Menu = new Menu({
    items: menuItems,
    select: logEvent,
    beforeOpen: logEvent,
    onOpen: logEvent,
    beforeClose: logEvent,
    onClose: logEvent
}, '#menu');

function logEvent(args: any) {
    const timestamp = new Date().toLocaleTimeString();
    eventLog.push(`[${timestamp}] ${args.name}`);
    displayEventLog();
}

function displayEventLog() {
    console.log('Event Log:', eventLog);
}
```

### Pattern 2: Conditional Event Handling

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        switch (args.item.id) {
            case 'file-open':
                handleFileOpen();
                break;
            case 'file-save':
                handleFileSave();
                break;
            case 'file-exit':
                if (confirm('Are you sure you want to exit?')) {
                    handleFileExit();
                }
                break;
        }
    }
}, '#menu');
```

### Pattern 3: Async Event Handling

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: async (args: MenuEventArgs) => {
        try {
            if (args.item.id === 'save-to-cloud') {
                const result = await saveToCloud();
                console.log('Saved:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}, '#menu');

async function saveToCloud(): Promise<any> {
    const response = await fetch('/api/save', { method: 'POST' });
    return response.json();
}
```

### Pattern 4: Event Delegation

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        // Delegate to handler map
        const handlers: Record<string, Function> = {
            'file-new': createNewFile,
            'file-open': openFile,
            'file-save': saveFile,
            'edit-cut': cutSelection,
            'edit-copy': copySelection,
            'edit-paste': pasteSelection
        };

        const handler = handlers[args.item.id];
        if (handler) {
            handler();
        }
    }
}, '#menu');
```

## Real-World Examples

### Example 1: Activity Tracking

```typescript
class MenuActivityTracker {
    private activities: any[] = [];

    setupMenu(menuObj: Menu) {
        menuObj.select = this.trackSelection.bind(this);
        menuObj.beforeOpen = this.trackOpen.bind(this);
        menuObj.onClose = this.trackClose.bind(this);
    }

    private trackSelection(args: MenuEventArgs) {
        this.activities.push({
            action: 'select',
            item: args.item.text,
            timestamp: new Date(),
            userId: getCurrentUser().id
        });
        this.saveActivity();
    }

    private trackOpen(args: BeforeOpenCloseMenuEventArgs) {
        this.activities.push({
            action: 'open',
            menu: args.parentItem?.text,
            timestamp: new Date()
        });
    }

    private trackClose(args: OpenCloseMenuEventArgs) {
        this.activities.push({
            action: 'close',
            timestamp: new Date()
        });
    }

    private saveActivity() {
        // Send to server for logging
        fetch('/api/log-activity', {
            method: 'POST',
            body: JSON.stringify(this.activities)
        });
    }
}

let tracker = new MenuActivityTracker();
let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
tracker.setupMenu(menuObj);
```

### Example 2: Lazy Loading Submenus

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: async (args: BeforeOpenCloseMenuEventArgs) => {
        // Only load if not already loaded
        if (args.parentItem && !args.parentItem.items) {
            // Show loading indicator
            console.log('Loading submenu...');

            // Fetch from server
            const data = await fetch(`/api/menu/${args.parentItem.id}`);
            const items = await data.json();

            // Update parent item
            args.parentItem.items = items;
        }
    }
}, '#menu');
```

### Example 3: Permission-Based Event Handling

```typescript
let userPermissions = ['file.read', 'file.write', 'edit.basic'];

let menuObj: Menu = new Menu({
    items: menuItems,
    beforeItemRender: (args: MenuEventArgs) => {
        // Check permissions for each item
        const requiredPermission = getRequiredPermission(args.item.id);
        if (!hasPermission(requiredPermission)) {
            args.element.classList.add('e-disabled');
        }
    },
    select: (args: MenuEventArgs) => {
        const requiredPermission = getRequiredPermission(args.item.id);
        if (!hasPermission(requiredPermission)) {
            alert('You do not have permission to access this action');
            return;
        }
        // Handle the action
    }
}, '#menu');

function hasPermission(permission: string): boolean {
    return userPermissions.includes(permission);
}

function getRequiredPermission(itemId: string): string {
    // Map item IDs to required permissions
    const permissionMap: Record<string, string> = {
        'file-open': 'file.read',
        'file-save': 'file.write',
        'edit-cut': 'edit.basic'
    };
    return permissionMap[itemId] || '';
}
```

### Example 4: Event Debouncing

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: debounce((args: MenuEventArgs) => {
        console.log(`Selected: ${args.item.text}`);
        performHeavyOperation(args.item.id);
    }, 300)
}, '#menu');

function debounce<T extends Function>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    }) as any;
}
```

## Summary

- Use `select` to respond to item clicks
- Use `beforeOpen` to prevent opening or load data
- Use `onOpen/onClose` for tracking state changes
- Use `beforeItemRender` to customize item appearance
- Check `args.cancel` to prevent actions
- Implement permission checks before handling events
- Use debouncing for expensive operations
