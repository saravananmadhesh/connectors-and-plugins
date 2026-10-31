# Menu Items and Hierarchy

## Table of Contents
- [Simple Menu Items](#simple-menu-items)
- [Nested Menu Items](#nested-menu-items)
- [MenuItem Properties](#menuitem-properties)
- [Text and Display](#text-and-display)
- [Item IDs and Identification](#item-ids-and-identification)
- [URLs and Navigation](#urls-and-navigation)
- [Icons in Menu Items](#icons-in-menu-items)
- [Separator Items](#separator-items)
- [Setting Item Titles (Tooltips)](#setting-item-titles-tooltips)
- [MenuItemModel Interface](#menuitemmodel-interface)

## Simple Menu Items

The simplest menu has items with just text:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    { text: 'File' },
    { text: 'Edit' },
    { text: 'View' },
    { text: 'Help' }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

This creates a horizontal menu with four items.

## Nested Menu Items

Create hierarchies using the `items` property on menu items:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'New' },
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
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

### Multi-Level Nesting

Nest items to any depth:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Fashion',
        items: [
            {
                text: 'Men Fashion',
                items: [
                    {
                        text: 'Personal Care',
                        items: [
                            { text: 'Trimmers' },
                            { text: 'Shavers' }
                        ]
                    },
                    {
                        text: 'Clothing',
                        items: [
                            { text: 'Shirts' },
                            { text: 'Jackets' },
                            { text: 'Track Suits' }
                        ]
                    }
                ]
            },
            {
                text: 'Women Fashion',
                items: [
                    { text: 'Kurtas' },
                    { text: 'Sarees' }
                ]
            }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

## MenuItem Properties

A `MenuItemModel` object supports the following properties:

| Property | Type | Purpose |
|----------|------|---------|
| `text` | `string` | Display text for the menu item |
| `id` | `string` | Unique identifier for the item |
| `url` | `string` | Navigation URL for the item |
| `iconCss` | `string` | CSS classes for icon display |
| `items` | `MenuItemModel[]` | Sub-menu items |
| `separator` | `boolean` | Whether to render as separator |
| `htmlAttributes` | `Record<string, any>` | Custom HTML attributes |

## Text and Display

The `text` property is the primary display label:

```typescript
let menuItems: MenuItemModel[] = [
    { text: 'Home' },
    { text: 'About Us' },
    { text: 'Contact' }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

## Item IDs and Identification

Use unique IDs to identify and manipulate menu items:

```typescript
let menuItems: MenuItemModel[] = [
    { 
        text: 'File',
        id: 'file-menu',
        items: [
            { text: 'Open', id: 'file-open' },
            { text: 'Save', id: 'file-save' },
            { text: 'Close', id: 'file-close' }
        ]
    },
    { 
        text: 'Edit',
        id: 'edit-menu',
        items: [
            { text: 'Undo', id: 'edit-undo' },
            { text: 'Redo', id: 'edit-redo' }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');

// Access items by ID
menuObj.disableItems(['file-save']);
menuObj.hideItems(['edit-redo']);
```

## URLs and Navigation

Make menu items clickable links:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Documentation',
        url: 'url'
    },
    {
        text: 'Products',
        items: [
            {
                text: 'Angular',
                url: 'url'
            },
            {
                text: 'React',
                url: 'url'
            },
            {
                text: 'Vue',
                url: 'url'
            }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

## Icons in Menu Items

Add icons using CSS classes with the `iconCss` property:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        iconCss: 'e-icons e-file',
        items: [
            { text: 'Open', iconCss: 'e-icons e-folder-open' },
            { text: 'Save', iconCss: 'e-icons e-save' },
            { text: 'Exit', iconCss: 'e-icons e-close' }
        ]
    },
    {
        text: 'Edit',
        iconCss: 'e-icons e-edit',
        items: [
            { text: 'Cut', iconCss: 'e-icons e-cut' },
            { text: 'Copy', iconCss: 'e-icons e-copy' },
            { text: 'Paste', iconCss: 'e-icons e-paste' }
        ]
    },
    {
        text: 'View',
        iconCss: 'e-icons e-eye'
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

### Using Font Awesome Icons

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Settings',
        iconCss: 'fa fa-cog',
        items: [
            { text: 'Profile', iconCss: 'fa fa-user' },
            { text: 'Preferences', iconCss: 'fa fa-sliders' }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

## Separator Items

Create visual separators to group menu items:

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'New' },
            { text: 'Open' },
            { text: 'Save' },
            { separator: true },  // Add separator here
            { text: 'Exit' }
        ]
    },
    {
        text: 'Edit',
        items: [
            { text: 'Cut' },
            { text: 'Copy' },
            { text: 'Paste' },
            { separator: true },  // Add separator here
            { text: 'Select All' }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

**Important**: When `separator: true` is set, don't include `text` or other properties. The separator is purely a visual divider.

## Setting Item Titles (Tooltips)

Add HTML title attributes to menu items to display tooltips on hover. Use the `beforeItemRender` event:

```typescript
import { Menu, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let menuItems: MenuItemModel[] = [
    {
        id: 'settingIcon',
        iconCss: 'em-icons e-file',
        items: [
            { text: 'Open', items: [
                { text: 'Sub Option 1' },
                { text: 'Sub Option 2' }
            ]},
            { text: 'Save' },
            { separator: true },
            { text: 'Exit' }
        ]
    }
];

// Add titles (tooltips) using beforeItemRender event
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeItemRender: (args: MenuEventArgs) => {
        if (args.item.id === 'settingIcon') {
            args.element.setAttribute('title', 'Settings');
        }
        // Add more titles for other items
        if (args.item.text === 'Open') {
            args.element.setAttribute('title', 'Open a file (Ctrl+O)');
        }
        if (args.item.text === 'Save') {
            args.element.setAttribute('title', 'Save the file (Ctrl+S)');
        }
        if (args.item.text === 'Exit') {
            args.element.setAttribute('title', 'Exit the application');
        }
    }
}, '#menu');
```

### Title Properties

```typescript
interface MenuEventArgs {
    name: string;              // Event name
    item: MenuItemModel;       // The menu item
    element: HTMLElement;      // DOM element - use to set attributes
    isChecked: boolean;        // Is checked
    isFocused: boolean;        // Has focus
}
```

### Using beforeItemRender for Titles

```typescript
let menuObj: Menu = new Menu({
    items: menuItems,
    beforeItemRender: (args: MenuEventArgs) => {
        // Set title based on item text
        const titleMap: { [key: string]: string } = {
            'Open': 'Open file - Ctrl+O',
            'Save': 'Save file - Ctrl+S',
            'Delete': 'Delete item - Del',
            'Undo': 'Undo action - Ctrl+Z',
            'Redo': 'Redo action - Ctrl+Y'
        };

        if (titleMap[args.item.text]) {
            args.element.setAttribute('title', titleMap[args.item.text]);
        }

        // Set title based on ID
        if (args.item.id === 'admin-menu') {
            args.element.setAttribute('title', 'Administrator panel');
        }
    }
}, '#menu');
```

### Tooltip Styling

```css
/* Browser default tooltip styling */
.e-menu-wrapper ul .e-menu-item[title] {
    cursor: help;
}

/* Custom tooltip on hover (optional) */
.e-menu-wrapper ul .e-menu-item:hover::after {
    content: attr(title);
    position: absolute;
    bottom: -30px;
    left: 0;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 12px;
    z-index: 1000;
}
```

## MenuItemModel Interface

Complete interface definition:

```typescript
interface MenuItemModel {
    // Display and Identity
    text?: string;                    // Display text
    id?: string;                      // Unique identifier
    
    // Navigation
    url?: string;                     // Navigation URL
    
    // Appearance
    iconCss?: string;                 // Icon CSS classes
    separator?: boolean;              // Separator line
    
    // Hierarchy
    items?: MenuItemModel[];          // Sub-menu items
    
    // Attributes
    htmlAttributes?: Record<string, any>;  // Custom HTML attributes
}
```

## Practical Examples

### Example 1: Complete Application Menu

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        id: 'menu-file',
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
        id: 'menu-edit',
        iconCss: 'e-icons e-edit',
        items: [
            { text: 'Undo', id: 'edit-undo', iconCss: 'e-icons e-undo' },
            { text: 'Redo', id: 'edit-redo', iconCss: 'e-icons e-redo' },
            { separator: true },
            { text: 'Cut', id: 'edit-cut', iconCss: 'e-icons e-cut' },
            { text: 'Copy', id: 'edit-copy', iconCss: 'e-icons e-copy' },
            { text: 'Paste', id: 'edit-paste', iconCss: 'e-icons e-paste' }
        ]
    },
    {
        text: 'Help',
        id: 'menu-help',
        iconCss: 'e-icons e-help'
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

### Example 2: E-commerce Navigation

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Electronics',
        items: [
            { text: 'Computers', url: '/electronics/computers' },
            { text: 'Phones', url: '/electronics/phones' },
            { text: 'Tablets', url: '/electronics/tablets' }
        ]
    },
    {
        text: 'Fashion',
        items: [
            {
                text: 'Men',
                items: [
                    { text: 'Shirts', url: '/fashion/men/shirts' },
                    { text: 'Pants', url: '/fashion/men/pants' }
                ]
            },
            {
                text: 'Women',
                items: [
                    { text: 'Dresses', url: '/fashion/women/dresses' },
                    { text: 'Shoes', url: '/fashion/women/shoes' }
                ]
            }
        ]
    }
];

let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

## Summary

- Use `text` for item labels
- Use `items` array to create nested hierarchies
- Use `id` for identification and manipulation
- Use `iconCss` to add visual icons
- Use `separator: true` to group items
- Use `url` for navigation
- Use `htmlAttributes` for custom attributes
