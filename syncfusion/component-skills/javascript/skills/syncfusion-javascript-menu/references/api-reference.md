# Complete API Reference

## Table of Contents
- [Menu Properties](#menu-properties)
- [MenuItem Properties](#menuitem-properties)
- [Menu Methods](#menu-methods)
- [Events](#events)
- [Animation Effects](#animation-effects)
- [Orientation Types](#orientation-types)
- [Field Settings](#field-settings)
- [Complete Examples](#complete-examples)

## Menu Properties

### items

**Type:** `MenuItemModel[] | { [key: string]: Object }[]`

Array of menu items to display in the menu component.

```typescript
let menuObj: Menu = new Menu({
    items: [
        { text: 'File' },
        { text: 'Edit' },
        { text: 'View' }
    ]
}, '#menu');
```

### orientation

**Type:** `Orientation` (default: `Horizontal`)

Specifies the orientation of the menu - either horizontal or vertical.

```typescript
// Horizontal menu (default)
let horizontal = new Menu({
    items: menuItems,
    orientation: 'Horizontal'
}, '#menu');

// Vertical menu
let vertical = new Menu({
    items: menuItems,
    orientation: 'Vertical'
}, '#menu');
```

### animationSettings

**Type:** `MenuAnimationSettingsModel`

Specifies animation settings for opening sub-menus.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    animationSettings: {
        effect: 'FadeIn',
        duration: 300,
        easing: 'ease-in-out'
    }
}, '#menu');
```

**Properties:**
- `effect`: `MenuEffect` - Animation effect (FadeIn, ZoomIn, SlideDown, None)
- `duration`: `number` - Duration in milliseconds (default: 400)
- `easing`: `string` - CSS easing function (default: 'ease')

### enableScrolling

**Type:** `boolean` (default: `false`)

Enables scrolling for menu when content exceeds the viewing area.

```typescript
let menuObj: Menu = new Menu({
    items: largeMenuData,
    enableScrolling: true
}, '#menu');
```

### enableRtl

**Type:** `boolean` (default: `false`)

Enables right-to-left (RTL) direction for the menu.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    enableRtl: true
}, '#menu');
```

### cssClass

**Type:** `string`

Specifies custom CSS classes for menu styling.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    cssClass: 'custom-menu dark-theme'
}, '#menu');
```

### enableHtmlSanitizer

**Type:** `boolean` (default: `true`)

Enables HTML sanitization to prevent XSS attacks in menu item content.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    enableHtmlSanitizer: true
}, '#menu');
```

### enablePersistence

**Type:** `boolean` (default: `false`)

Enables persisting the component's state between page reloads.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    enablePersistence: true
}, '#menu');
```

### fields

**Type:** `FieldSettingsModel`

Specifies mapping of data fields for binding custom data structures.

```typescript
let menuObj: Menu = new Menu({
    items: customData,
    fields: {
        text: 'label',
        children: 'submenu',
        itemId: 'id',
        parentId: 'parent'
    }
}, '#menu');
```

### hamburgerMode

**Type:** `boolean` (default: `false`)

Enables hamburger menu mode for mobile responsiveness.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: true,
    title: 'Menu',
    target: '.navbar'
}, '#menu');
```

### hoverDelay

**Type:** `number` (default: `0`)

Specifies delay in milliseconds before showing submenu on hover.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hoverDelay: 200  // 200ms delay before submenu appears
}, '#menu');
```

### showItemOnClick

**Type:** `boolean` (default: `false`)

When true, submenus only open on click instead of hover.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    showItemOnClick: true
}, '#menu');
```

### target

**Type:** `string`

Target element selector for hamburger mode attachment.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: true,
    target: '.navbar-container'
}, '#menu');
```

### template

**Type:** `string | Function`

HTML template for customizing menu item rendering.

```typescript
let templateString = `
    <div style="display: flex; align-items: center;">
        <i class="icon icon-\${text.toLowerCase()}"></i>
        <span>\${text}</span>
    </div>
`;

let menuObj: Menu = new Menu({
    items: menuItems,
    template: templateString
}, '#menu');
```

### title

**Type:** `string`

Title text for hamburger mode menu.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    hamburgerMode: true,
    title: 'Navigation Menu'
}, '#menu');
```

### locale

**Type:** `string` (default: `'en-US'`)

Overrides the global culture and localization value.

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    locale: 'es-ES'  // Spanish locale
}, '#menu');
```

## MenuItem Properties

### text

**Type:** `string`

Display text for the menu item.

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'Home' },
    { text: 'About' },
    { text: 'Contact' }
];
```

### id

**Type:** `string`

Unique identifier for the menu item.

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'File', id: 'file' },
    { text: 'Edit', id: 'edit' }
];

menuObj.disableItems(['file']);
```

### url

**Type:** `string`

Navigation URL for the menu item.

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'About', url: '/about' }
];
```

### items

**Type:** `MenuItemModel[]`

Sub-menu items array for creating nested hierarchies.

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'New' },
            { text: 'Open' },
            { text: 'Save' }
        ]
    }
];
```

### iconCss

**Type:** `string`

CSS class for displaying icon before menu item text.

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'Home', iconCss: 'e-icons e-home' },
    { text: 'Settings', iconCss: 'e-icons e-settings' },
    { text: 'Help', iconCss: 'e-icons e-help' }
];
```

### separator

**Type:** `boolean`

When true, renders the item as a separator line.

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { separator: true },  // Creates visual separator
    { text: 'Exit' }
];
```

### htmlAttributes

**Type:** `Record<string, any>`

Custom HTML attributes for the menu item element.

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Download',
        htmlAttributes: {
            'data-action': 'download',
            'title': 'Download the file',
            'target': '_blank'
        }
    }
];
```

## Menu Methods

### addEventListener()

Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string) - Name of the event
- `handler` (Function) - Callback function to run when event occurs

**Returns:** void

```typescript
menuObj.addEventListener('select', (args: MenuEventArgs) => {
    console.log('Item selected:', args.item.text);
});
```

### appendTo()

Appends the Menu control within the given HTML element.

**Parameters:**
- `selector` (string | HTMLElement, optional) - Target element where control needs to be appended

**Returns:** void

```typescript
// Append to element by ID
menuObj.appendTo('#menu-container');

// Append to element reference
let containerElement = document.getElementById('menu-container');
menuObj.appendTo(containerElement);
```

### close()

Closes the Menu if it is opened in hamburger mode.

**Returns:** void

```typescript
// Close hamburger menu
menuObj.close();
```

### dataBind()

When invoked, applies the pending property changes immediately to the component.

**Returns:** void

```typescript
// Update items
menuObj.items = newItems;

// Apply pending changes
menuObj.dataBind();
```

### destroy()

Destroys the widget and releases all resources.

**Returns:** void

```typescript
menuObj.destroy();
```

### enableItems()

This method is used to enable or disable the menu items in the Menu based on the items and enable argument.

**Parameters:**
- `items` (string[]) - Text items that needs to be enabled/disabled
- `enable` (boolean) - Set true/false to enable/disable the list items
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Disable items by text
menuObj.enableItems(['File', 'Edit'], false, false);

// Enable items by unique ID
menuObj.enableItems(['file-id', 'edit-id'], true, true);

// Toggle specific items
menuObj.enableItems(['Save'], false, false);  // Disable Save
```

### getItemIndex()

This method is used to get the index of the menu item in the Menu based on the argument.

**Parameters:**
- `item` (MenuItem | string) - Item object or id/text to get the index
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** number[]

```typescript
// Get index by text
let index = menuObj.getItemIndex('File');

// Get index by unique ID
let indexById = menuObj.getItemIndex('file-id', true);

// Get nested item index
let nestedIndex = menuObj.getItemIndex('Open');
```

### getRootElement()

Returns the root element of the component.

**Returns:** HTMLElement

```typescript
let rootElement = menuObj.getRootElement();
console.log(rootElement.classList);  // Get CSS classes
```

### hideItems()

This method is used to hide the menu items in the Menu based on the items text.

**Parameters:**
- `items` (string[]) - Text items that needs to be hidden
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Hide items by text
menuObj.hideItems(['Debug', 'Experimental'], false);

// Hide items by unique ID
menuObj.hideItems(['debug-id', 'exp-id'], true);

// Hide conditional items
menuObj.hideItems(['Admin Panel']);
```

### insertAfter()

It is used to insert the menu items after the specified menu item text.

**Parameters:**
- `items` (MenuItemModel[]) - Items that needs to be inserted
- `text` (string) - Text item after that the element to be inserted
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Insert single item after 'Save'
menuObj.insertAfter(
    [{ text: 'Save As', id: 'save-as' }],
    'Save'
);

// Insert multiple items after 'File'
menuObj.insertAfter([
    { text: 'Item 1', id: 'item-1' },
    { text: 'Item 2', id: 'item-2' }
], 'File');

// Insert by unique ID
menuObj.insertAfter([
    { text: 'New Item' }
], 'save-id', true);
```

### insertBefore()

It is used to insert the menu items before the specified menu item text.

**Parameters:**
- `items` (MenuItemModel[]) - Items that needs to be inserted
- `text` (string) - Text item before that the element to be inserted
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Insert single item before 'Exit'
menuObj.insertBefore(
    [{ text: 'Print', id: 'print' }],
    'Exit'
);

// Insert multiple items before 'Edit'
menuObj.insertBefore([
    { text: 'Item 1' },
    { text: 'Item 2' }
], 'Edit');

// Insert by unique ID
menuObj.insertBefore([
    { text: 'New Item' }
], 'exit-id', true);
```

### open()

This method is used to open the Menu in hamburger mode.

**Returns:** void

```typescript
// Open hamburger menu
menuObj.open();
```

### refresh()

Applies all the pending property changes and render the component again.

**Returns:** void

```typescript
// Update properties
menuObj.items = updatedItems;
menuObj.animationSettings.duration = 500;

// Refresh component to apply changes
menuObj.refresh();
```

### removeEventListener()

Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string) - Name of the event to remove
- `handler` (Function) - Function to remove

**Returns:** void

```typescript
// Remove specific event handler
const selectHandler = (args: MenuEventArgs) => {
    console.log('Selected:', args.item.text);
};

menuObj.removeEventListener('select', selectHandler);
```

### removeItems()

It is used to remove the menu items from the Menu based on the items text.

**Parameters:**
- `items` (string[]) - Text items that needs to be removed
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Remove by text
menuObj.removeItems(['Save As', 'Print']);

// Remove by unique ID
menuObj.removeItems(['save-as-id', 'print-id'], true);

// Remove single item
menuObj.removeItems(['Debug Mode']);
```

### setItem()

This method is used to set/update the menu item in the Menu based on the argument.

**Parameters:**
- `item` (MenuItem) - Item object that needs to be updated
- `id` (string, optional) - Id or text to identify the item to update
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Update item by text
menuObj.setItem(
    { text: 'Open File', id: 'open-updated' },
    'Open'
);

// Update item by unique ID
menuObj.setItem(
    { text: 'Save Document', id: 'save-updated' },
    'save-id',
    true
);

// Update nested item
menuObj.setItem(
    { text: 'New Text', iconCss: 'e-icons e-new' },
    'old-item-id',
    true
);
```

### showItems()

This method is used to show the menu items in the Menu based on the items text.

**Parameters:**
- `items` (string[]) - Text items that needs to be shown
- `isUniqueId` (boolean, optional) - Set true if it is a unique id

**Returns:** void

```typescript
// Show items by text
menuObj.showItems(['Debug', 'Experimental'], false);

// Show items by unique ID
menuObj.showItems(['debug-id', 'exp-id'], true);

// Show hidden conditional items
menuObj.showItems(['Admin Panel']);
```

### Inject

Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]) - Array of module functions to inject

**Returns:** void

```typescript
// Inject additional modules if needed
import { MenuBase } from '@syncfusion/ej2-navigations';

menuObj.Inject([MenuBase]);
```

## Events

For detailed event handling information, refer to **[working-with-events.md](working-with-events.md)**.

The Menu component supports the following events:

### select

Triggered when a menu item is selected.

**Argument Type:** `MenuEventArgs`

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        console.log(`Selected: ${args.item.text}`);
    }
}, '#menu');
```

### beforeOpen

Triggered before a submenu opens.

**Argument Type:** `BeforeOpenCloseMenuEventArgs`

See **[working-with-events.md](working-with-events.md#beforeopen-and-onopen-events)** for detailed event handling patterns.

### onOpen

Triggered after a submenu opens.

**Argument Type:** `OpenCloseMenuEventArgs`

### beforeClose

Triggered before a submenu closes.

**Argument Type:** `BeforeOpenCloseMenuEventArgs`

### onClose

Triggered after a submenu closes.

**Argument Type:** `OpenCloseMenuEventArgs`

### beforeItemRender

Triggered before each menu item is rendered.

**Argument Type:** `MenuEventArgs`

### created

Triggered once component rendering is completed.

**Argument Type:** `Event`

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    created: () => {
        console.log('Menu component created');
    }
}, '#menu');
```

## Event Interfaces

Complete documentation of all event argument interfaces used in Menu events.

### MenuEventArgs

Triggered for select and beforeItemRender events.

**Properties:**

```typescript
interface MenuEventArgs {
    name: string;              // Specifies name of the event
    item: MenuItemModel;       // The menu item being interacted with
    element: HTMLElement;      // The DOM element of the menu item
    isChecked: boolean;        // Whether item is checked (if applicable)
    isFocused: boolean;        // Whether item has focus
}
```

**Usage Example:**

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args: MenuEventArgs) => {
        console.log(`Event: ${args.name}`);
        console.log(`Item: ${args.item.text}`);
        console.log(`Element:`, args.element);
        console.log(`Focused: ${args.isFocused}`);
    },
    beforeItemRender: (args: MenuEventArgs) => {
        // Customize item before rendering
        if (args.item.id === 'admin-only') {
            args.element.style.display = 'none';
        }
    }
}, '#menu');
```

### BeforeOpenCloseMenuEventArgs

Triggered for beforeOpen and beforeClose events.

**Properties:**

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

**Usage Example:**

```typescript
import { Menu, MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

let menuObj: Menu = new Menu({
    items: menuItems,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        console.log(`Event: ${args.name}`);
        console.log(`Parent: ${args.parentItem?.text}`);
        
        // Load items dynamically if not loaded
        if (args.parentItem && !args.parentItem.items) {
            args.parentItem.items = [
                { text: 'Loaded Item 1' },
                { text: 'Loaded Item 2' }
            ];
        }
        
        // Disable specific user from opening admin menu
        if (args.parentItem?.id === 'admin' && !isAdmin()) {
            args.cancel = true;  // Prevent opening
        }
    },
    beforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
        console.log(`Closing: ${args.parentItem?.text}`);
    }
}, '#menu');
```

### OpenCloseMenuEventArgs

Triggered for onOpen and onClose events.

**Properties:**

```typescript
interface OpenCloseMenuEventArgs {
    name: string;              // Specifies name of the event
    element: HTMLElement;      // The menu/submenu element
}
```

**Usage Example:**

```typescript
import { Menu, MenuItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

let menuObj: Menu = new Menu({
    items: menuItems,
    onOpen: (args: OpenCloseMenuEventArgs) => {
        console.log(`Event: ${args.name}`);
        console.log('Element classes:', args.element.classList);
        
        // Add animation or visual effect when menu opens
        args.element.classList.add('menu-open-animation');
    },
    onClose: (args: OpenCloseMenuEventArgs) => {
        console.log(`Menu closed: ${args.name}`);
        
        // Remove animation classes when menu closes
        args.element.classList.remove('menu-open-animation');
    }
}, '#menu');
```

## Animation Effects

### MenuEffect Enum

Available animation effects for menu opening:

```typescript
// Fade In - Gradual fade effect
animationSettings: { effect: MenuEffect.FadeIn, duration: 300 }

// Zoom In - Zoom enlargement effect
animationSettings: { effect: MenuEffect.ZoomIn, duration: 300 }

// Slide Down - Slide from top effect
animationSettings: { effect: MenuEffect.SlideDown, duration: 300 }

// None - No animation
animationSettings: { effect: MenuEffect.None }
```

## Orientation Types

### Orientation Enum

Menu orientation options:

```typescript
// Horizontal - Items displayed in a row
orientation: 'Horizontal'  // Default

// Vertical - Items displayed in a column
orientation: 'Vertical'
```

## Field Settings

### FieldSettingsModel

Maps custom data field names to menu item properties:

```typescript
interface FieldSettingsModel {
    text?: string | string[];           // Display text field
    children?: string | string[];       // Child items field
    itemId?: string | string[];         // Item ID field
    parentId?: string | string[];       // Parent ID field (for self-referential data)
    iconCss?: string | string[];        // Icon CSS field
    separator?: string | string[];      // Separator field
    url?: string | string[];            // URL field
}
```

### Example Usage

```typescript
// Custom data structure
interface CustomItem {
    name: string;
    nested: CustomItem[];
    icon: string;
    link: string;
}

let customData: CustomItem[] = [
    {
        name: 'Products',
        link: '/products',
        icon: 'shop-icon',
        nested: [
            { name: 'Electronics', link: '/electronics', icon: 'device-icon', nested: [] }
        ]
    }
];

// Map fields
let menuObj: Menu = new Menu({
    items: customData,
    fields: {
        text: 'name',
        url: 'link',
        iconCss: 'icon',
        children: 'nested'
    }
}, '#menu');
```

## Complete Examples

### Example 1: Full-Featured Menu

```typescript
import { Menu, MenuItemModel, MenuEffect } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'file-menu',
        iconCss: 'e-icons e-file',
        items: [
            { text: 'New', id: 'file-new', iconCss: 'e-icons e-plus' },
            { text: 'Open', id: 'file-open', iconCss: 'e-icons e-folder-open' },
            { text: 'Save', id: 'file-save', iconCss: 'e-icons e-save' },
            { separator: true },
            { text: 'Exit', id: 'file-exit', iconCss: 'e-icons e-close' }
        ]
    },
    {
        text: 'Edit',
        id: 'edit-menu',
        iconCss: 'e-icons e-edit',
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
    items: menuItems,
    orientation: 'Horizontal',
    animationSettings: {
        effect: MenuEffect.SlideDown,
        duration: 300
    },
    enableScrolling: false,
    cssClass: 'main-menu',
    select: (args) => {
        console.log(`Action: ${args.item.text}`);
    }
}, '#menu');
```

### Example 2: Data-Bound Menu

```typescript
let hierarchicalData: any[] = [
    {
        category: 'Electronics',
        id: 'elec',
        children: [
            { category: 'Phones', id: 'phones', children: [] },
            { category: 'Laptops', id: 'laptops', children: [] }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: hierarchicalData,
    fields: {
        text: 'category',
        itemId: 'id',
        children: 'children'
    }
}, '#menu');
```

### Example 3: Event-Driven Menu

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    select: (args) => handleSelection(args),
    beforeOpen: (args) => handleBeforeOpen(args),
    onOpen: (args) => handleOpen(args),
    beforeClose: (args) => handleBeforeClose(args)
}, '#menu');

function handleSelection(args: MenuEventArgs) {
    console.log(`Selected: ${args.item.id}`);
}

function handleBeforeOpen(args: BeforeOpenCloseMenuEventArgs) {
    console.log('Opening menu...');
}

function handleOpen(args: OpenCloseMenuEventArgs) {
    console.log('Menu opened');
}

function handleBeforeClose(args: BeforeOpenCloseMenuEventArgs) {
    console.log('Closing menu...');
}
```

## Summary

- **Properties**: Configure menu behavior with 15+ properties
- **Methods**: Manipulate menu items dynamically with 8+ methods
- **Events**: Track user interactions with 6 comprehensive events
- **Field Settings**: Map any custom data structure
- **Animation**: Choose from 4 animation effects
- **Events Details**: See [working-with-events.md](working-with-events.md) for complete event documentation
