# API Reference

## Table of Contents
- [ContextMenu Properties](#contextmenu-properties)
- [MenuItem Properties](#menuitem-properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Enums](#enums)

## ContextMenu Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | MenuItemModel[] | [] | Specifies menu items with configuration |
| `target` | string | '' | CSS selector for the element triggering the context menu |
| `animationSettings` | MenuAnimationSettingsModel | { effect: 'SlideDown' } | Animation behavior for submenu opening |
| `cssClass` | string | '' | Custom CSS classes to apply to the menu wrapper |
| `enableHtmlSanitizer` | boolean | true | Enable sanitization of HTML content for security |
| `enablePersistence` | boolean | false | Persist menu state in localStorage across page reloads |
| `enableRtl` | boolean | false | Enable right-to-left layout |
| `enableScrolling` | boolean | false | Enable scrolling for menus exceeding viewport |
| `filter` | string | '' | CSS selector to filter target elements within container |
| `hoverDelay` | number | 0 | Delay (ms) before submenu appears on hover |
| `itemTemplate` | string \| Function | null | Custom template for rendering menu items |
| `locale` | string | 'en-US' | Locale for text and formatting |
| `showItemOnClick` | boolean | false | Open submenus on click instead of hover |
| `fields` | FieldSettingsModel | {} | Map data fields to item properties |

### Property Usage Examples

```typescript
// Animation settings
animationSettings: {
  duration: 600,
  easing: 'ease-in-out',
  effect: 'ZoomIn'
}

// Field mapping
fields: {
  text: 'itemName',
  iconCss: 'itemIcon',
  children: 'subItems',
  url: 'itemLink'
}

// CSS classes
cssClass: 'dark-theme compact-menu'

// Filter specific elements
filter: '.context-sensitive'

// Hover delay for submenus
hoverDelay: 500

// Show submenus on click
showItemOnClick: true

// Enable scrolling for long menus
enableScrolling: true

// Enable HTML content
enableHtmlSanitizer: true
```

### Advanced Property Examples

**Locale and Localization:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  locale: 'ar-AE'  // Arabic locale
});
```

**Filter for Specific Elements:**
```typescript
// Only show context menu for certain elements
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#container',
  filter: '.editable-field'  // Only on elements with this class
});
```

**Custom Item Template:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  itemTemplate: (item: MenuItemModel) => {
    return `<div class="custom-item">${item.text}</div>`;
  }
});
```

**Enable Persistence:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enablePersistence: true  // Save state to localStorage
});
```

**RTL Support:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  enableRtl: true  // Right-to-left layout
});
```

**Scrolling Configuration:**
```typescript
const contextMenu = new ContextMenu({
  items: largeMenuItems,  // Many items
  target: '#target',
  enableScrolling: true,  // Enable scroll
  hoverDelay: 300
});
```

## MenuItem Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Display text for the menu item |
| `id` | string | Unique identifier for the item |
| `iconCss` | string | CSS class for displaying icons |
| `url` | string | URL for navigation when item is clicked |
| `items` | MenuItemModel[] | Nested submenu items (array of menu items) |
| `separator` | boolean | Display item as a visual separator line |
| `htmlAttributes` | Record | Custom HTML attributes to add to the item element |

### MenuItem Example

```typescript
{
  text: 'File',
  id: 'file-menu',
  iconCss: 'e-icons e-file',
  items: [
    {
      text: 'New',
      iconCss: 'e-icons e-new',
      url: '/new'
    },
    {
      text: 'Open',
      iconCss: 'e-icons e-folder-open'
    },
    {
      separator: true
    },
    {
      text: 'Exit',
      id: 'exit-item'
    }
  ],
  htmlAttributes: {
    'data-action': 'file-menu',
    'aria-label': 'File operations'
  }
}
```

## Methods

### Core Methods

#### `open(top: number, left: number, target?: HTMLElement): void`
Open the ContextMenu at specified coordinates.

```typescript
contextMenu.open(300, 400);
contextMenu.open(300, 400, element);
```

#### `close(): void`
Close the ContextMenu if it's opened.

```typescript
contextMenu.close();
```

#### `refresh(): void`
Re-render the menu after modifications.

```typescript
contextMenu.items.push(newItem);
contextMenu.refresh();
```

### Item Management Methods

#### `enableItems(items: string[], enable: boolean, isUniqueId?: boolean): void`
Enable or disable menu items.

```typescript
contextMenu.enableItems(['Cut', 'Copy'], true);
contextMenu.enableItems(['item-id'], false, true);  // By ID
```

#### `hideItems(items: string[], isUniqueId?: boolean): void`
Hide menu items without removing them.

```typescript
contextMenu.hideItems(['Advanced', 'Debug']);
contextMenu.hideItems(['debug-id'], true);
```

#### `showItems(items: string[], isUniqueId?: boolean): void`
Show previously hidden menu items.

```typescript
contextMenu.showItems(['Advanced']);
contextMenu.showItems(['debug-id'], true);
```

#### `removeItems(items: string[], isUniqueId?: boolean): void`
Remove menu items from the menu.

```typescript
contextMenu.removeItems(['Paste', 'New Option']);
contextMenu.removeItems(['remove-id'], true);
```

#### `insertBefore(items: MenuItemModel[], text: string, isUniqueId?: boolean): void`
Insert items before a specific item.

```typescript
contextMenu.insertBefore([{ text: 'New' }], 'Paste');
contextMenu.insertBefore([newItem], 'id-value', true);
```

#### `insertAfter(items: MenuItemModel[], text: string, isUniqueId?: boolean): void`
Insert items after a specific item.

```typescript
contextMenu.insertAfter([{ text: 'Save As' }], 'Save');
contextMenu.insertAfter([newItem], 'id-value', true);
```

#### `setItem(item: MenuItem, id?: string, isUniqueId?: boolean): void`
Update properties of an existing menu item.

```typescript
contextMenu.setItem({ text: 'Save', disabled: false }, 'Save');
contextMenu.setItem(updatedItem, 'save-id', true);
```

#### `getItemIndex(item: MenuItem | string, isUniqueId?: boolean): number[]`
Get the index of a menu item.

```typescript
const index = contextMenu.getItemIndex('Cut');
const index = contextMenu.getItemIndex('cut-id', true);
```

### General Methods

#### `appendTo(selector: string | HTMLElement): void`
Append the component to a specific element.

```typescript
contextMenu.appendTo('#contextmenu');
contextMenu.appendTo(document.getElementById('container'));
```

#### `destroy(): void`
Destroy the component and remove it from DOM.

```typescript
contextMenu.destroy();
```

#### `dataBind(): void`
Apply pending property changes immediately.

```typescript
contextMenu.dataBind();
```

#### `getRootElement(): HTMLElement`
Get the root element of the component.

```typescript
const rootElement = contextMenu.getRootElement();
```

## Events

### Lifecycle Events

#### `beforeOpen`
Triggered before the menu opens. Use to validate or cancel opening.

```typescript
beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
  console.log('Opening at:', args.top, args.left);
  if (!shouldOpen) args.cancel = true;
}
```

#### `onOpen`
Triggered after the menu opens.

```typescript
onOpen: (args: OpenCloseMenuEventArgs) => {
  console.log('Menu opened');
}
```

#### `beforeClose`
Triggered before the menu closes.

```typescript
beforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
  console.log('Menu closing');
}
```

#### `onClose`
Triggered after the menu closes.

```typescript
onClose: (args: OpenCloseMenuEventArgs) => {
  console.log('Menu closed');
}
```

### Item Events

#### `select`
Triggered when a menu item is selected.

```typescript
select: (args: MenuEventArgs) => {
  console.log('Selected:', args.item.text);
}
```

#### `beforeItemRender`
Triggered before each item is rendered.

```typescript
beforeItemRender: (args: MenuEventArgs) => {
  if (args.item.text === 'Delete') {
    args.item.disabled = true;
  }
}
```

#### `created`
Triggered after component rendering is complete.

```typescript
created: (args: Event) => {
  console.log('Component ready');
}
```

## Interfaces

### BeforeOpenCloseMenuEventArgs

Triggered before the menu opens or closes:

```typescript
interface BeforeOpenCloseMenuEventArgs {
  name?: string;         // Name of the event
  cancel?: boolean;      // Set to true to cancel the action
}
```

**Usage Example:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
    // Cancel opening under certain conditions
    if (shouldPreventOpen) {
      args.cancel = true;
    }
    console.log('Menu opening - Event:', args.name);
  }
});
```

### OpenCloseMenuEventArgs

Triggered when the menu opens or closes:

```typescript
interface OpenCloseMenuEventArgs {
  name?: string;         // Name of the event
}
```

**Usage Example:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  onOpen: (args: OpenCloseMenuEventArgs) => {
    console.log('Menu opened - Event:', args.name);
  },
  onClose: (args: OpenCloseMenuEventArgs) => {
    console.log('Menu closed - Event:', args.name);
  }
});
```

### MenuEventArgs

Triggered during item rendering or selection:

```typescript
interface MenuEventArgs {
  name?: string;         // Name of the event
  item?: MenuItemModel;  // The menu item being rendered/selected
  element?: HTMLElement; // The DOM element of the menu item
}
```

**Usage Example - Item Selection:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  select: (args: MenuEventArgs) => {
    console.log('Selected item:', args.item?.text);
    console.log('Element:', args.element);
    console.log('Event name:', args.name);
  }
});
```

**Usage Example - Item Rendering:**
```typescript
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target',
  beforeItemRender: (args: MenuEventArgs) => {
    // Modify item element before rendering
    if (args.item?.text === 'Special Item') {
      args.element?.classList.add('special-styling');
    }
  }
});
```

### MenuAnimationSettingsModel
```typescript
interface MenuAnimationSettingsModel {
  duration?: number;     // Animation duration (ms)
  easing?: string;       // CSS easing function
  effect?: MenuEffect;   // Animation effect
}
```

### FieldSettingsModel

Maps data source fields to menu item properties:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string \| string[] | Field name(s) for item display text |
| `children` | string \| string[] | Field name(s) for nested items (submenu) |
| `iconCss` | string \| string[] | Field name(s) for icon CSS classes |
| `itemId` | string \| string[] | Field name(s) for unique item identifier |
| `parentId` | string \| string[] | Field name(s) for parent item relationship (hierarchical) |
| `separator` | string \| string[] | Field name(s) for separator indicator |
| `url` | string \| string[] | Field name(s) for navigation URL |

```typescript
interface FieldSettingsModel {
  text?: string | string[];         // Field name(s) for item text
  iconCss?: string | string[];      // Field name(s) for icon CSS classes
  url?: string | string[];          // Field name(s) for URL
  itemId?: string | string[];       // Field name(s) for ID
  parentId?: string | string[];     // Field name(s) for parent ID (hierarchical)
  children?: string | string[];     // Field name(s) for nested items
  separator?: string | string[];    // Field name(s) for separator indicator
}
```

#### FieldSettings Usage Examples

**Example 1: Simple Field Mapping**
```typescript
const dataSource = [
  {
    itemName: 'File',
    itemIcon: 'e-icons e-file',
    subItems: [
      { itemName: 'New' },
      { itemName: 'Open' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: dataSource,
  fields: {
    text: 'itemName',
    iconCss: 'itemIcon',
    children: 'subItems'
  }
});
```

**Example 2: Hierarchical Data**
```typescript
const hierarchicalData = [
  { id: 1, parentId: null, label: 'File' },
  { id: 2, parentId: 1, label: 'New' },
  { id: 3, parentId: 1, label: 'Open' },
  { id: 4, parentId: null, label: 'Edit' }
];

const contextMenu = new ContextMenu({
  items: hierarchicalData,
  fields: {
    itemId: 'id',
    parentId: 'parentId',
    text: 'label'
  }
});
```

**Example 3: Complex Mapping**
```typescript
const complexData = [
  {
    id: 'file-menu',
    label: 'File',
    icon: 'e-icons e-file',
    link: '/file',
    isSeparator: false,
    children: [
      { id: 'new', label: 'New', link: '/new' }
    ]
  }
];

const contextMenu = new ContextMenu({
  items: complexData,
  fields: {
    text: 'label',
    iconCss: 'icon',
    url: 'link',
    itemId: 'id',
    separator: 'isSeparator',
    children: 'children'
  }
});
```

#### Individual Property Examples

**`text` - Display Text Field**
```typescript
// Maps the 'name' field from data to item text
fields: { text: 'name' }

// Data: [{ name: 'Save' }, { name: 'Delete' }]
// Result: Menu items display "Save" and "Delete"
```

**`iconCss` - Icon CSS Classes**
```typescript
// Maps the 'itemIcon' field to icon CSS
fields: { iconCss: 'itemIcon' }

// Data: [
//   { text: 'Cut', itemIcon: 'e-icons e-cut' },
//   { text: 'Copy', itemIcon: 'e-icons e-copy' }
// ]
// Result: Icons displayed for each item
```

**`url` - Navigation URL**
```typescript
// Maps the 'link' field for navigation
fields: { url: 'link' }

// Data: [
//   { text: 'Home', link: '/' },
//   { text: 'About', link: '/about' }
// ]
// Result: Items navigate to specified URLs
```

**`itemId` - Unique Identifier**
```typescript
// Maps the 'uniqueId' field for item identification
fields: { itemId: 'uniqueId' }

// Data: [
//   { uniqueId: 'save-btn', text: 'Save' },
//   { uniqueId: 'delete-btn', text: 'Delete' }
// ]
// Result: Items identified by unique ID
```

**`parentId` - Hierarchical Relationship**
```typescript
// Maps the 'parent' field for hierarchical structure
fields: { itemId: 'id', parentId: 'parent' }

// Data: [
//   { id: 1, parent: null, text: 'File' },
//   { id: 2, parent: 1, text: 'New' },
//   { id: 3, parent: 1, text: 'Open' }
// ]
// Result: "New" and "Open" appear as submenu under "File"
```

**`separator` - Separator Indicator**
```typescript
// Maps the 'isSeparator' field to identify separator lines
fields: { separator: 'isSeparator' }

// Data: [
//   { text: 'Edit' },
//   { isSeparator: true },
//   { text: 'Delete' }
// ]
// Result: Visual separator line between "Edit" and "Delete"
```

**`children` - Nested Items**
```typescript
// Maps the 'submenu' field for nested items
fields: { text: 'label', children: 'submenu' }

// Data: [
//   {
//     label: 'File',
//     submenu: [
//       { label: 'New' },
//       { label: 'Open' }
//     ]
//   }
// ]
// Result: "New" and "Open" appear as nested submenu
```

### MenuEventArgs

```typescript
interface MenuEventArgs {
  item: MenuItemModel;           // The menu item
  element: HTMLElement;          // DOM element
  event?: MouseEvent;            // Triggering event
  cancel?: boolean;              // Cancel action
}
```

## Enums

### MenuEffect
Animation effects for submenu opening:

```typescript
enum MenuEffect {
  SlideDown = 'SlideDown',    // Default
  ZoomIn = 'ZoomIn',
  FadeIn = 'FadeIn',
  None = 'None'
}
```

### MenuOpenType
How submenus are opened:

```typescript
enum MenuOpenType {
  Auto = 'Auto',      // Hover (default)
  Click = 'Click',    // On click
  Hover = 'Hover'     // Explicitly hover
}
```

## Usage Examples

### Complete Initialization

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

const contextMenu = new ContextMenu({
  items: [
    {
      text: 'Edit',
      iconCss: 'e-icons e-edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    { separator: true },
    {
      text: 'Delete',
      iconCss: 'e-icons e-delete'
    }
  ],
  target: '#target',
  animationSettings: {
    duration: 400,
    effect: 'SlideDown'
  },
  cssClass: 'custom-menu',
  enableRtl: false,
  enableScrolling: true,
  hoverDelay: 500,
  select: (args) => handleSelection(args),
  beforeOpen: (args) => validateOpen(args),
  onOpen: (args) => setupMenu(args),
  onClose: (args) => cleanupMenu(args)
});

contextMenu.appendTo('#contextmenu');
```

### Event Handling

```typescript
contextMenu.addEventListener('select', (args: MenuEventArgs) => {
  console.log('Item selected:', args.item.text);
});

contextMenu.addEventListener('beforeOpen', (args: BeforeOpenCloseMenuEventArgs) => {
  console.log('Menu opening at', args.top, args.left);
});
```

### Dynamic Operations

```typescript
// Add items
contextMenu.insertAfter([{ text: 'New Item' }], 'Paste');

// Update items
contextMenu.setItem({ text: 'Modified', disabled: false }, 'Edit');

// Enable/disable
contextMenu.enableItems(['Undo'], canUndo);

// Remove items
contextMenu.removeItems(['Temporary']);

// Refresh
contextMenu.refresh();
```

## See Also

- [Getting Started](./getting-started.md) - Setup and initialization
- [Menu Items Management](./menu-items.md) - Dynamic item operations
- [Interactions & Events](./interactions.md) - Event handling patterns
- [Advanced Features](./advanced-features.md) - Scrolling, accessibility
