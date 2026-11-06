# Advanced Features and Item Management

## Table of Contents
- [Adding Menu Items Dynamically](#adding-menu-items-dynamically)
- [Removing Menu Items](#removing-menu-items)
- [Enabling and Disabling Items](#enabling-and-disabling-items)
- [Hiding and Showing Items](#hiding-and-showing-items)
- [Scrollable Menus](#scrollable-menus)
- [Sub-Menu Positioning](#sub-menu-positioning)
- [Hamburger Mode](#hamburger-mode)
- [Menu Effects](#menu-effects)
- [Performance Optimization](#performance-optimization)

## Adding Menu Items Dynamically

Add menu items after initialization using `insertAfter()` or `insertBefore()`:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file',
        items: [
            { text: 'Open', id: 'open' },
            { text: 'Save', id: 'save' }
        ]
    },
    { text: 'Help', id: 'help' }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');

// Insert new items after 'Save'
let newItems: MenuItemModel[] = [
    { text: 'Save As', id: 'save-as' }
];
menuObj.insertAfter(newItems, '#save');

// Insert new items before 'Help'
let helpItems: MenuItemModel[] = [
    { text: 'Edit', id: 'edit' }
];
menuObj.insertBefore(helpItems, '#help');

// Insert at top level
menuObj.insertAfter([{ text: 'View', id: 'view' }], '#file');
```

### Using Index-Based Insertion

```typescript
// Get all top-level items
let topLevelItems = menuObj.items;

// Insert at specific position
let newItem: MenuItemModel = { text: 'Insert Here', id: 'new' };

// By parent ID
menuObj.insertAfter([newItem], '#file-submenu');

// By item text
let items = menuObj.items.filter(item => item.text === 'File');
if (items.length > 0) {
    menuObj.insertAfter([newItem], items[0].id);
}
```

## Removing Menu Items

Remove items using `removeItems()`:

```typescript
// Remove by ID
menuObj.removeItems(['save-as']);

// Remove multiple items
menuObj.removeItems(['save-as', 'view']);

// Remove all items under 'File'
menuObj.removeItems(['open', 'save', 'exit']);
```

### Conditional Removal

```typescript
function removeObsoleteItems() {
    let itemsToRemove = [];

    if (!hasInternetConnection()) {
        itemsToRemove.push('sync', 'upload', 'download');
    }

    if (!isAdminUser()) {
        itemsToRemove.push('admin-panel', 'user-management');
    }

    if (itemsToRemove.length > 0) {
        menuObj.removeItems(itemsToRemove);
    }
}
```

## Enabling and Disabling Items

Enable and disable menu items using the `enableItems()` method. The method accepts three parameters:
- **items**: String array of item text or ID values
- **enable**: Boolean - true to enable, false to disable
- **isUniqueId**: Boolean - true if using unique IDs, false if using text

Disable items on initialization:

```typescript
import { Menu, MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let menuItems: MenuItemModel[] = [
    {
        text: 'Events',
        items: [
            { text: 'Conferences' },
            { text: 'Music' },
            { text: 'Workshops' }
        ]
    },
    {
        text: 'Movies',
        items: [
            { text: 'Now Showing' },
            { text: 'Coming Soon' }
        ]
    },
    {
        text: 'Directory',
        items: [
            { text: 'Media Gallery' },
            { text: 'Newsletters' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Handle disabling submenu items
        for (let i: number = 0; i < args.items.length; i++) {
            if (disableItems.indexOf(args.items[i].text) > -1) {
                menuObj.enableItems([args.items[i].text], false, false);
            }
        }
    }
}, '#menu');

let disableItems: string[] = ['Conferences', 'Music', 'Directory'];

// Disable items by text (third parameter false = using text, not ID)
menuObj.enableItems(disableItems, false, false);

// Button to enable all items
let buttonObj: Button = new Button();
buttonObj.appendTo('#enableAll');

buttonObj.element.onclick = (): void => {
    menuObj.enableItems(disableItems, true, false);
    disableItems = [];
}
```

### Enable/Disable by Unique ID

If items have unique IDs, use the third parameter as `true`:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file-menu',
        items: [
            { text: 'Save', id: 'file-save' },
            { text: 'Delete', id: 'file-delete' }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');

// Enable/disable by unique ID
menuObj.enableItems(['file-save', 'file-delete'], false, true);
```

## Hiding and Showing Items

Show or hide menu items using `showItems()` and `hideItems()` methods. These methods accept:
- **items**: String array of item text or ID values
- **isUniqueId**: Boolean - true if using unique IDs, false if using text

Hide items on initialization:

```typescript
import { Menu, MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let menuItems: MenuItemModel[] = [
    {
        text: 'Events',
        items: [
            { text: 'Conferences' },
            { text: 'Music' },
            { text: 'Workshops' }
        ]
    },
    {
        text: 'Movies',
        items: [
            { text: 'Now Showing' },
            { text: 'Coming Soon' }
        ]
    },
    {
        text: 'Directory',
        items: [
            { text: 'Media Gallery' },
            { text: 'Newsletters' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Handle hiding submenu items
        for (let i: number = 0; i < args.items.length; i++) {
            if (hiddenItems.indexOf(args.items[i].text) > -1) {
                menuObj.hideItems([args.items[i].text], false);
            }
        }
    }
}, '#menu');

let hiddenItems: string[] = ['Workshops', 'Music', 'Movies'];

// Hide items by text (second parameter false = using text, not ID)
menuObj.hideItems(hiddenItems, false);

// Button to show all items
let buttonObj: Button = new Button();
buttonObj.appendTo('#showAll');

buttonObj.element.onclick = (): void => {
    menuObj.showItems(hiddenItems, false);
    hiddenItems = [];
}
```

### Hide/Show by Unique ID

If items have unique IDs, use the second parameter as `true`:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file-menu',
        items: [
            { text: 'Debug', id: 'debug-mode' },
            { text: 'Test', id: 'test-mode' }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');

// Hide items by unique ID
menuObj.hideItems(['debug-mode', 'test-mode'], true);

// Show items by unique ID
menuObj.showItems(['debug-mode', 'test-mode'], true);
```

> Using the `beforeOpen` event, you can hide sub menu items since the menu supports hiding items only for headers initially.

## Scrollable Menus

Enable scrolling for menus with many items:

```typescript
import { Menu } from '@syncfusion/ej2-navigations';

let largeMenuData: MenuItemModel[] = generateLargeDataset(500);

let menuObj: Menu = new Menu({
    items: largeMenuData,
    enableScrolling: true
}, '#menu');
```

### Styling Scrollable Menus

```css
/* Set max height to enable scrolling */
.e-menu-wrapper {
    max-height: 400px;
    overflow-y: auto;
}

/* Customize scrollbar */
.e-menu-wrapper::-webkit-scrollbar {
    width: 8px;
}

.e-menu-wrapper::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.e-menu-wrapper::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.e-menu-wrapper::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

### Scrollable Horizontal Menu

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    orientation: 'Horizontal',
    enableScrolling: true
}, '#menu');
```

```css
.e-menu-wrapper.e-horizontal {
    max-width: 800px;
    overflow-x: auto;
}

.e-menu-wrapper.e-horizontal::-webkit-scrollbar {
    height: 8px;
}
```

## Sub-Menu Positioning

Change submenu position by setting the `top` and `left` properties in the `beforeOpen` event. The submenu position can be adjusted to open above, below, or at custom coordinates:

```typescript
import { Menu, MenuItemModel, MenuModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { enableRipple, closest } from '@syncfusion/ej2-base';

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
            { text: 'Toolbar' },
            { text: 'Sidebar' }
        ]
    },
    {
        text: 'Tools',
        items: [
            { text: 'Spelling & Grammar' },
            { text: 'Customize' },
            { text: 'Options' }
        ]
    },
    { text: 'Go' },
    { text: 'Help' }
];

// Initialize menu with custom positioning
let menuOptions: MenuModel = {
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Get parent menu item element offset
        let relativeOffset: ClientRect = closest(args.event.target as Element, '.e-menu-item').getBoundingClientRect();
        
        // Get sub menu wrapper element using closest method
        let subMenuEle: HTMLElement = closest(args.element, '.e-menu-wrapper') as HTMLElement;
        subMenuEle.style.display = 'block';
        
        // Set custom position - submenu opens above the parent item
        args.top = (relativeOffset.top - subMenuEle.getBoundingClientRect().height) + pageYOffset;
        args.left = relativeOffset.left + pageXOffset;
        
        subMenuEle.style.display = '';
    }
};

// Initialize Menu component
let menuObj: Menu = new Menu(menuOptions, '#menu');
```

### BeforeOpenCloseMenuEventArgs Properties

```typescript
interface BeforeOpenCloseMenuEventArgs {
    name: string;              // Event name
    cancel: boolean;           // Set true to prevent submenu opening
    element: HTMLElement;      // The submenu element
    items: MenuItemModel[];    // Items in the submenu
    isOpen: boolean;           // Is submenu already open
    parentItem: MenuItemModel; // Parent menu item
    top?: number;              // Top position for submenu
    left?: number;             // Left position for submenu
    event?: Event;             // Triggering event
}
```

### Custom Positioning Examples

**Position submenu to the right:**
```typescript
beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
    args.top = 0;           // Align with parent top
    args.left = 300;        // Position 300px to the right
}
```

**Position submenu above parent:**
```typescript
beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
    let parentElem = closest(args.event.target as Element, '.e-menu-item');
    let offset = parentElem.getBoundingClientRect();
    
    args.top = offset.top - 300;  // Position above
    args.left = offset.left;       // Align with parent left
}
```

**Position submenu centered:**
```typescript
beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
    let submenuEle = args.element;
    let viewportWidth = window.innerWidth;
    
    // Center the submenu horizontally
    args.left = (viewportWidth - submenuEle.offsetWidth) / 2;
}
```

### Complete Submenu Positioning Example

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        let trigger = args.event.target as Element;
        let parentItem = closest(trigger, '.e-menu-item');
        let submenuWrapper = args.element;
        
        // Show temporarily to get dimensions
        submenuWrapper.style.display = 'block';
        
        let parentRect = parentItem.getBoundingClientRect();
        let submenuRect = submenuWrapper.getBoundingClientRect();
        
        // Check if submenu would go off-screen to the right
        if (parentRect.right + submenuRect.width > window.innerWidth) {
            // Position to the left of parent
            args.left = parentRect.left - submenuRect.width;
        } else {
            // Position to the right of parent
            args.left = parentRect.right;
        }
        
        // Check if submenu would go below viewport
        if (parentRect.top + submenuRect.height > window.innerHeight) {
            // Position above parent
            args.top = parentRect.top - submenuRect.height;
        } else {
            // Position below parent
            args.top = parentRect.top;
        }
        
        // Restore original display
        submenuWrapper.style.display = '';
    }
}, '#menu');
```

## Hamburger Mode

Create a responsive hamburger menu for mobile:

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: true,
    title: 'Menu',
    target: '.navbar'  // Element to attach menu
}, '#menu');
```

### Responsive Hamburger Implementation

```typescript
function setupResponsiveMenu() {
    let isMobile = window.innerWidth < 768;

    let menuObj: Menu = new Menu({
        items: menuItems,
        hamburgerMode: isMobile,
        title: 'Navigation'
    }, '#menu');

    window.addEventListener('resize', () => {
        let newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            menuObj.hamburgerMode = isMobile;
        }
    });
}
```

### Hamburger Menu Styling

```css
.e-menu-wrapper.e-hamburger-mode {
    position: fixed;
    left: -100%;
    top: 60px;
    width: 100%;
    max-width: 300px;
    height: calc(100vh - 60px);
    flex-direction: column;
    background: white;
    transition: left 0.3s ease;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    z-index: 1000;
}

.e-menu-wrapper.e-hamburger-mode.e-open {
    left: 0;
}

.hamburger-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
}

@media (max-width: 767px) {
    .hamburger-toggle {
        display: block;
    }
}
```

## Menu Effects

Apply various effects to menu opening:

```typescript
import { Menu, MenuEffect } from '@syncfusion/ej2-navigations';

// Fade In effect
let fadeMenu = new Menu({
    items: menuItems,
    animationSettings: { effect: MenuEffect.FadeIn, duration: 300 }
}, '#menu');

// Zoom In effect
let zoomMenu = new Menu({
    items: menuItems,
    animationSettings: { effect: MenuEffect.ZoomIn, duration: 400 }
}, '#menu');

// Slide Down effect
let slideMenu = new Menu({
    items: menuItems,
    animationSettings: { effect: MenuEffect.SlideDown, duration: 250 }
}, '#menu');

// No animation
let noAnimMenu = new Menu({
    items: menuItems,
    animationSettings: { effect: MenuEffect.None }
}, '#menu');
```

### Custom Animation with Easing

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    animationSettings: {
        effect: MenuEffect.SlideDown,
        duration: 500,
        easing: 'ease-in-out'
    }
}, '#menu');
```

## Performance Optimization

Optimize menu performance for large datasets:

### Strategy 1: Virtual Scrolling

```typescript
function createVirtualMenu(data: any[], pageSize: number = 50) {
    let currentPage = 0;
    let items = data.slice(0, pageSize);

    let menuObj: Menu = new Menu({
        items: items,
        enableScrolling: true
    }, '#menu');

    let menuElement = document.getElementById('menu');
    menuElement.addEventListener('scroll', () => {
        let scrollTop = menuElement.scrollTop;
        let scrollHeight = menuElement.scrollHeight;
        let clientHeight = menuElement.clientHeight;

        if (scrollHeight - scrollTop <= clientHeight + 50) {
            // Load next page
            currentPage++;
            let nextItems = data.slice(
                currentPage * pageSize,
                (currentPage + 1) * pageSize
            );
            menuObj.insertAfter(nextItems);
        }
    });

    return menuObj;
}
```

### Strategy 2: Lazy Loading

```typescript
let menuObj: Menu = new Menu({
    items: initialData,
    beforeOpen: async (args) => {
        if (args.parentItem && !args.parentItem.items) {
            // Load submenu on demand
            const submenu = await loadSubmenu(args.parentItem.id);
            args.parentItem.items = submenu;
        }
    }
}, '#menu');

async function loadSubmenu(parentId: string): Promise<MenuItemModel[]> {
    const response = await fetch(`/api/submenu/${parentId}`);
    return response.json();
}
```

### Strategy 3: Memoization

```typescript
let memoizedData = new Map();

async function getCachedMenuData(key: string): Promise<any[]> {
    if (memoizedData.has(key)) {
        return memoizedData.get(key);
    }

    const data = await fetch(`/api/menu/${key}`).then(r => r.json());
    memoizedData.set(key, data);
    return data;
}

let menuObj: Menu = new Menu({
    items: initialData,
    beforeOpen: async (args) => {
        if (args.parentItem && !args.parentItem.items) {
            args.parentItem.items = await getCachedMenuData(args.parentItem.id);
        }
    }
}, '#menu');
```

### Strategy 4: Defer Non-Critical Items

```typescript
// Show critical items immediately
let criticalItems = menuItems.filter(item => item.priority !== 'low');

let menuObj: Menu = new Menu({
    items: criticalItems,
    enableScrolling: true
}, '#menu');

// Load non-critical items after short delay
setTimeout(() => {
    let nonCriticalItems = menuItems.filter(item => item.priority === 'low');
    menuObj.insertAfter(nonCriticalItems);
}, 500);
```

### Strategy 5: Debounce Frequent Updates

```typescript
let updateQueue: MenuItemModel[] = [];
let updateTimer: NodeJS.Timeout;

function queueMenuUpdate(items: MenuItemModel[]) {
    updateQueue.push(...items);
    
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
        if (updateQueue.length > 0) {
            menuObj.insertAfter(updateQueue);
            updateQueue = [];
        }
    }, 1000);
}

// Call this frequently without performance impact
queueMenuUpdate([newItem1]);
queueMenuUpdate([newItem2]);
```

## Summary

- Use `insertAfter()` and `insertBefore()` for dynamic additions
- Use `removeItems()` to delete items
- Use `disableItems()` to prevent interaction
- Use `hideItems()` to hide items without removal
- Enable `enableScrolling` for large datasets
- Use `hamburgerMode` for mobile responsiveness
- Apply animations with `animationSettings`
- Optimize with lazy loading and caching
