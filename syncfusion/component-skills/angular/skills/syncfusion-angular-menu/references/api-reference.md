# Complete API Reference - Syncfusion Angular Menu Component

## Table of Contents
- [Component Properties](#component-properties)
- [MenuItem Properties](#menuitem-properties)
- [Animation Settings](#animation-settings)
- [Field Settings](#field-settings)
- [Menu Methods](#menu-methods)
- [Menu Events](#menu-events)
- [Event Arguments](#event-arguments)
- [Enumerations](#enumerations)

---

## Component Properties

### Overview Table
| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `items` | `MenuItemModel[]` | `[]` | Array of menu items to render |
| `fields` | `FieldSettingsModel` | - | Maps data source fields to menu structure |
| `template` | `string \| Function` | - | Custom HTML template for menu items |
| `animationSettings` | `MenuAnimationSettingsModel` | - | Controls submenu animation behavior |
| `orientation` | `Orientation` | `'Horizontal'` | 'Horizontal' or 'Vertical' layout |
| `showItemOnClick` | `boolean` | `false` | Open submenu on click (true) or hover (false) |
| `cssClass` | `string` | - | Custom CSS class for styling |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `enableScrolling` | `boolean` | `false` | Enable scrollbar for large menus |
| `enablePersistence` | `boolean` | `false` | Persist component state between page reloads |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitize untrusted HTML content |
| `hamburgerMode` | `boolean` | `false` | Enable hamburger menu mode |
| `target` | `string` | - | Target element for hamburger mode toggle |
| `title` | `string` | - | Title text displayed in hamburger mode |
| `hoverDelay` | `number` | `0` | Delay (ms) before submenu opens on hover |
| `locale` | `string` | `'en-US'` | Localization culture code |

### Detailed Property Documentation

#### items
**Type:** `MenuItemModel[] | { [key: string]: Object }[]`  
**Purpose:** Specifies menu items with their properties to render as the Menu component.

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
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
```

#### fields
**Type:** `FieldSettingsModel`  
**Purpose:** Maps data source fields to menu structure. Used for hierarchical and self-referential data binding.

```typescript
public fields: FieldSettingsModel = {
  text: 'name',
  children: 'submenu',
  iconCss: 'icon'
};

public menuData = [
  { id: 1, name: 'File', icon: 'e-file' },
  { id: 2, name: 'Edit', icon: 'e-edit' }
];
```

#### template
**Type:** `string | Function`  
**Purpose:** Defines custom HTML template for rendering menu items.

```typescript
// String template
public template: string = '<div class="custom-item">${text} - ${category}</div>';

// Function template
public template: Function = (data: any) => {
  return `<span class="item-icon">${data.icon}</span><span>${data.text}</span>`;
};
```

#### animationSettings
**Type:** `MenuAnimationSettingsModel`  
**Purpose:** Controls how submenu items animate when opened/closed.

```typescript
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'FadeIn',
  duration: 400,
  easing: 'ease-out'
};
```

#### orientation
**Type:** `Orientation` - `'Horizontal' | 'Vertical'`  
**Purpose:** Sets the layout direction of the menu.

```typescript
// Horizontal menu bar (default)
<ejs-menu [orientation]="'Horizontal'"></ejs-menu>

// Vertical sidebar menu
<ejs-menu [orientation]="'Vertical'"></ejs-menu>
```

#### showItemOnClick
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Controls submenu opening behavior.

```typescript
// Click to open (mobile-friendly)
<ejs-menu [showItemOnClick]="true"></ejs-menu>

// Hover to open (desktop-friendly)
<ejs-menu [showItemOnClick]="false"></ejs-menu>
```

#### cssClass
**Type:** `string`  
**Purpose:** Adds custom CSS classes to the menu wrapper for styling.

```typescript
<ejs-menu [cssClass]="'dark-theme gradient-bg'"></ejs-menu>

/* CSS */
.dark-theme {
  background: #333;
  color: #fff;
}
```

#### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Enables right-to-left layout for RTL languages (Arabic, Hebrew, etc.).

```typescript
<ejs-menu [enableRtl]="true"></ejs-menu>
<!-- or dynamically -->
public toggleRtl(): void {
  this.menuObj.enableRtl = !this.menuObj.enableRtl;
}
```

#### enableScrolling
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Enables scrollbar when menu exceeds available space.

```typescript
<ejs-menu [enableScrolling]="true"></ejs-menu>
```

#### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Persists menu state (open/closed submenus) to localStorage between page reloads.

```typescript
<ejs-menu [enablePersistence]="true"></ejs-menu>
<!-- Menu state now saved and restored automatically -->
```

#### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`  
**Purpose:** Sanitizes HTML content in menu items to prevent XSS attacks.

```typescript
// Secure - removes potentially harmful scripts
<ejs-menu [enableHtmlSanitizer]="true"></ejs-menu>

// Unsafe - allows raw HTML (use with caution)
<ejs-menu [enableHtmlSanitizer]="false"></ejs-menu>
```

#### hamburgerMode
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Converts menu into collapsible hamburger menu for mobile/responsive layouts.

```typescript
@Component({
  template: `
    <ejs-menu 
      [hamburgerMode]="true" 
      [target]="'#menu-toggle'"
      title="Menu">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

#### target
**Type:** `string`  
**Purpose:** Specifies DOM element (selector) to toggle hamburger menu. Usually a hamburger button.

```typescript
<button id="menu-toggle" (click)="toggleMenu()">☰ Menu</button>
<ejs-menu 
  [hamburgerMode]="true" 
  [target]="'#menu-toggle'">
</ejs-menu>
```

#### title
**Type:** `string`  
**Purpose:** Displays title text when hamburger mode is enabled.

```typescript
<ejs-menu 
  [hamburgerMode]="true" 
  [title]="'Navigation Menu'">
</ejs-menu>
```

#### hoverDelay
**Type:** `number`  
**Default:** `0`  
**Purpose:** Sets millisecond delay before submenu opens on hover. Useful for preventing accidental menu opens.

```typescript
// 300ms delay before submenu opens
<ejs-menu [hoverDelay]="300"></ejs-menu>
```

#### locale
**Type:** `string`  
**Default:** `'en-US'`  
**Purpose:** Sets UI culture/language for localized content.

```typescript
// Arabic locale
<ejs-menu [locale]="'ar-AE'"></ejs-menu>

// Spanish locale
<ejs-menu [locale]="'es-ES'"></ejs-menu>
```

---

## MenuItem Properties

### Overview Table
| Property | Type | Purpose |
|----------|------|---------|
| `text` | `string` | Display text for the menu item |
| `id` | `string` | Unique identifier for the menu item |
| `iconCss` | `string` | CSS class for icon styling |
| `url` | `string` | Navigation URL (creates anchor link) |
| `items` | `MenuItemModel[]` | Submenu items array |
| `separator` | `boolean` | Creates visual separator line |
| `htmlAttributes` | `Record<string, any>` | Custom HTML attributes |

### Detailed Documentation

#### text
**Type:** `string`  
**Purpose:** Display text shown for the menu item.

```typescript
{ text: 'File' }
{ text: 'New Document' }
```

#### id
**Type:** `string`  
**Purpose:** Unique identifier for referencing the menu item in methods and events.

```typescript
{ id: 'file-menu', text: 'File' }
{ id: 'file-new', text: 'New', parentId: 'file-menu' }

// Reference in code
this.menuObj.enableItems(['file-new'], true);
```

#### iconCss
**Type:** `string`  
**Purpose:** CSS classes for icon display. Supports font icons and sprite images.

```typescript
// Font icon
{ text: 'File', iconCss: 'e-icons e-file' }

// Multiple classes
{ text: 'Save', iconCss: 'fas fa-save custom-icon' }

// Sprite image
{ text: 'Undo', iconCss: 'sprite-icon undo' }
```

#### url
**Type:** `string`  
**Purpose:** Navigation URL. Creates anchor link from the menu item.

```typescript
{ text: 'Google', url: 'https://www.google.com' }
{ text: 'Dashboard', url: '/dashboard' }
{ text: 'Users', url: '/admin/users#list' }
```

#### items
**Type:** `MenuItemModel[]`  
**Purpose:** Array of submenu items, creating hierarchical menu structure.

```typescript
{
  text: 'File',
  items: [
    { text: 'Open' },
    { text: 'Save' },
    { text: 'Save As' }
  ]
}
```

#### separator
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Creates horizontal (horizontal menu) or vertical (vertical menu) separator line to group items.

```typescript
[
  { text: 'New' },
  { text: 'Open' },
  { separator: true },  // Visual divider
  { text: 'Exit' }
]
```

#### htmlAttributes
**Type:** `Record<string, any>`  
**Purpose:** Adds custom HTML attributes to the rendered menu item element.

```typescript
{
  text: 'Settings',
  htmlAttributes: {
    'class': 'premium-item',
    'data-permission': 'admin',
    'title': 'Advanced Settings',
    'aria-label': 'Application Settings'
  }
}
```

---

## Animation Settings

### MenuAnimationSettingsModel

**Properties:**

| Property | Type | Purpose |
|----------|------|---------|
| `effect` | `MenuEffect` | Animation effect to apply |
| `duration` | `number` | Duration in milliseconds |
| `easing` | `string` | CSS easing function |

### Effect Options
- **None** - No animation, instant appearance
- **SlideDown** - Submenu slides down
- **ZoomIn** - Submenu zooms in from center
- **FadeIn** - Submenu fades in

### Easing Options
- `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`
- `cubic-bezier(n,n,n,n)` for custom easing

### Examples

```typescript
// Fast fade-in
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'FadeIn',
  duration: 200,
  easing: 'linear'
};

// Smooth slide down
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'SlideDown',
  duration: 500,
  easing: 'ease-out'
};

// Bounce zoom
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'ZoomIn',
  duration: 600,
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// No animation
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'None'
};

// Usage in template
<ejs-menu [animationSettings]="animationSettings"></ejs-menu>
```

---

## Field Settings

### FieldSettingsModel

Maps data source fields to menu structure properties:

| Property | Type | Purpose |
|----------|------|---------|
| `text` | `string \| string[]` | Field name for menu item text |
| `children` | `string \| string[]` | Field name for submenu items |
| `itemId` | `string \| string[]` | Field name for unique ID |
| `parentId` | `string \| string[]` | Field name for parent item ID (self-referential) |
| `iconCss` | `string \| string[]` | Field name for icon CSS class |
| `url` | `string \| string[]` | Field name for navigation URL |
| `separator` | `string \| string[]` | Field name for separator flag |

### Hierarchical Data Example

```typescript
public fields: FieldSettingsModel = {
  text: 'name',
  children: 'submenu',
  iconCss: 'icon'
};

public hierarchicalData = [
  {
    name: 'File',
    icon: 'e-icons e-file',
    submenu: [
      { name: 'Open', icon: 'e-icons e-open' },
      { name: 'Save', icon: 'e-icons e-save' }
    ]
  }
];
```

### Self-Referential Data Example

```typescript
public fields: FieldSettingsModel = {
  text: 'name',
  itemId: 'id',
  parentId: 'parentId'
};

public selfRefData = [
  { id: 1, name: 'File', parentId: null },
  { id: 2, name: 'Open', parentId: 1 },
  { id: 3, name: 'Save', parentId: 1 },
  { id: 4, name: 'Edit', parentId: null }
];
```

---

## Menu Methods

### insertBefore()

**Signature:** `insertBefore(items: MenuItemModel[], target: string, isUniqueId?: boolean): void`

**Purpose:** Insert menu items before a target item.

```typescript
@ViewChild('menu')
public menuObj?: MenuComponent;

public insertNewItem(): void {
  const newItems: MenuItemModel[] = [
    { text: 'New Item', id: 'new-1' }
  ];
  
  // Insert before 'Save' item
  this.menuObj?.insertBefore(newItems, 'Save', false);
}
```

**Parameters:**
- `items` - Array of MenuItemModel items to insert
- `target` - Text or ID of target item (reference point)
- `isUniqueId` - If true, target is treated as unique ID; if false, treated as text

### insertAfter()

**Signature:** `insertAfter(items: MenuItemModel[], target: string, isUniqueId?: boolean): void`

**Purpose:** Insert menu items after a target item.

```typescript
public insertAfterItem(): void {
  const newItems: MenuItemModel[] = [
    { text: 'Insert After', id: 'insert-1' }
  ];
  
  // Insert after 'File' menu
  this.menuObj?.insertAfter(newItems, 'File', false);
}
```

### removeItems()

**Signature:** `removeItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Remove menu items by text or ID.

```typescript
public removeItem(): void {
  // Remove by text
  this.menuObj?.removeItems(['Save'], false);
  
  // Remove by ID
  this.menuObj?.removeItems(['save-id'], true);
}
```

**Parameters:**
- `items` - Array of item texts or IDs to remove
- `isUniqueId` - If true, items treated as IDs; if false, treated as text

### enableItems()

**Signature:** `enableItems(items: string[], enable: boolean, isUniqueId?: boolean): void`

**Purpose:** Enable or disable menu items.

```typescript
public disableItems(): void {
  // Disable by text
  this.menuObj?.enableItems(['Export', 'Print'], false, false);
}

public enableItems(): void {
  // Enable by ID
  this.menuObj?.enableItems(['export-id', 'print-id'], true, true);
}
```

**Parameters:**
- `items` - Array of item texts or IDs
- `enable` - true to enable, false to disable
- `isUniqueId` - If true, items treated as IDs

### showItems()

**Signature:** `showItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Show hidden header-level menu items. (Note: Only affects header items initially hidden)

```typescript
public showItem(): void {
  // Show by text
  this.menuObj?.showItems(['Tools'], false);
  
  // Show by ID
  this.menuObj?.showItems(['tools-id'], true);
}
```

### hideItems()

**Signature:** `hideItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Hide header-level menu items.

```typescript
public hideItem(): void {
  // Hide by text
  this.menuObj?.hideItems(['Admin'], false);
}
```

### setItem()

**Signature:** `setItem(item: MenuItemModel, id?: string, isUniqueId?: boolean): void`

**Purpose:** Update or set a menu item properties in the Menu component.

```typescript
public updateMenuItem(): void {
  // Update by text
  this.menuObj?.setItem(
    { text: 'Updated File', iconCss: 'e-icons e-file' },
    'File',
    false
  );
}

public updateByItemId(): void {
  // Update by unique ID
  this.menuObj?.setItem(
    { text: 'Save As...', id: 'save-as', iconCss: 'e-icons e-save' },
    'save-id',
    true
  );
}
```

**Parameters:**
- `item` - MenuItemModel with updated properties
- `id` - Optional text or ID of the item to update
- `isUniqueId` - If true, id is treated as unique ID; if false, treated as text

### open()

**Signature:** `open(): void`

**Purpose:** Opens the Menu in hamburger mode. This method expands the hamburger menu when it's in collapsed state.

```typescript
@ViewChild('menu')
public menuObj?: MenuComponent;

public openHamburgerMenu(): void {
  // Open hamburger menu programmatically
  this.menuObj?.open();
}

// Usage example with button
public onHamburgerButtonClick(): void {
  this.menuObj?.open();
  // Apply animations or additional logic
}
```

**Returns:** void

### getItemIndex()

**Signature:** `getItemIndex(item: MenuItemModel | string, isUniqueId?: boolean): number[]`

**Purpose:** Get the index path of a menu item in the Menu hierarchy. Returns array of indices representing the item's position.

```typescript
public findItemIndex(): void {
  // Get index by text
  const index: number[] | undefined = this.menuObj?.getItemIndex('Save', false);
  console.log('Item index path:', index); // e.g., [0, 1] for File > Save
}

public findItemById(): void {
  // Get index by unique ID
  const index: number[] | undefined = this.menuObj?.getItemIndex('save-id', true);
  console.log('Item index path:', index);
}

public navigateToItem(): void {
  const itemIndex = this.menuObj?.getItemIndex('Export', false);
  if (itemIndex) {
    console.log(`Item is at level ${itemIndex.length}, position ${itemIndex[itemIndex.length - 1]}`);
  }
}
```

**Parameters:**
- `item` - MenuItemModel or string (text/ID) to search
- `isUniqueId` - If true, item is treated as unique ID; if false, treated as text

**Returns:** `number[]` - Array of indices representing hierarchical position (e.g., [0, 2] = first top-level item, third child)

### close()

**Signature:** `close(): void`

**Purpose:** Closes the Menu if it is opened in hamburger mode. This method collapses the hamburger menu when it's in expanded state.

```typescript
@ViewChild('menu')
public menuObj?: MenuComponent;

public closeHamburgerMenu(): void {
  // Close hamburger menu programmatically
  this.menuObj?.close();
}

// Usage example: close on item selection
public onMenuItemSelected(): void {
  this.menuObj?.close(); // Auto-collapse after selection
}

// Auto-close on outside click
public onBackdropClick(): void {
  this.menuObj?.close();
}
```

**Returns:** void

### destroy()

**Signature:** `destroy(): void`

**Purpose:** Destroys the Menu component and releases all resources. Removes event listeners and DOM elements created by the component.

```typescript
@ViewChild('menu')
public menuObj?: MenuComponent;

public ngOnDestroy(): void {
  // Clean up menu component on component destruction
  this.menuObj?.destroy();
}

// Manual cleanup if needed
public cleanupMenu(): void {
  this.menuObj?.destroy();
  console.log('Menu component destroyed');
}
```

**Returns:** void

**Note:** This method is typically called automatically during Angular's ngOnDestroy lifecycle hook. Use manually only when explicitly removing the component.

---

## Menu Events

### Overview Table

| Event | Arguments | Cancelable | Purpose |
|-------|-----------|-----------|---------|
| `beforeOpen` | `BeforeOpenCloseMenuEventArgs` | Yes | Before submenu opens |
| `beforeClose` | `BeforeOpenCloseMenuEventArgs` | Yes | Before submenu closes |
| `onOpen` | `OpenCloseMenuEventArgs` | No | After submenu opened |
| `onClose` | `OpenCloseMenuEventArgs` | No | After submenu closed |
| `select` | `MenuEventArgs` | No | Menu item selected/clicked |
| `beforeItemRender` | `MenuEventArgs` | No | Before item renders |
| `created` | `Event` | No | Component initialization complete |

### Event Examples

```typescript
export class MenuComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Submenu opening:', args);
    // Prevent opening specific items
    if (args.item?.text === 'Admin') {
      args.cancel = true;
    }
  }

  public onBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Submenu closing:', args);
    // Prevent closure
    args.cancel = true;
  }

  public onOpen(args: OpenCloseMenuEventArgs): void {
    console.log('Submenu opened:', args);
  }

  public onClose(args: OpenCloseMenuEventArgs): void {
    console.log('Submenu closed:', args);
  }

  public onSelect(args: MenuEventArgs): void {
    console.log('Item selected:', args.item?.text);
    // Navigate or trigger action
  }

  public onBeforeItemRender(args: MenuEventArgs): void {
    console.log('Item rendering:', args.item?.text);
    // Customize item appearance
  }

  public onCreated(): void {
    console.log('Menu created successfully');
    // Initialize after render
  }
}
```

---

## Event Arguments

### BeforeOpenCloseMenuEventArgs

**Properties:**

```typescript
interface BeforeOpenCloseMenuEventArgs {
  name: string;           // Event name: 'beforeOpen' or 'beforeClose'
  item?: MenuItemModel;   // Menu item being opened/closed
  element?: HTMLElement;  // DOM element of the menu
  cancel?: boolean;       // Set to true to prevent action
}
```

**Example:**

```typescript
public beforeOpenHandler(args: BeforeOpenCloseMenuEventArgs): void {
  if (args.item?.id === 'admin-menu') {
    // Prevent admin menu from opening for non-admins
    args.cancel = !this.isAdmin;
  }
}
```

### OpenCloseMenuEventArgs

**Properties:**

```typescript
interface OpenCloseMenuEventArgs {
  name: string;           // Event name: 'onOpen' or 'onClose'
  item?: MenuItemModel;   // Menu item opened/closed
  element?: HTMLElement;  // DOM element of the menu
}
```

**Example:**

```typescript
public onOpenHandler(args: OpenCloseMenuEventArgs): void {
  console.log('Menu item opened:', args.item?.text);
  // Highlight or animate
  args.element?.classList.add('active');
}
```

### MenuEventArgs

**Properties:**

```typescript
interface MenuEventArgs {
  name: string;           // Event name: 'select' or 'beforeItemRender'
  item?: MenuItemModel;   // Menu item being rendered/selected
  element?: HTMLElement;  // DOM element of the menu item
}
```

**Example:**

```typescript
public beforeItemRenderHandler(args: MenuEventArgs): void {
  if (args.item?.id === 'premium-feature') {
    args.element?.classList.add('premium-badge');
    args.element?.setAttribute('data-premium', 'true');
  }
}

public selectHandler(args: MenuEventArgs): void {
  console.log('Selected:', args.item?.text);
  this.navigateTo(args.item?.url || '/');
}
```

---

## Enumerations

### Orientation

```typescript
enum Orientation {
  Horizontal = 'Horizontal',  // Menu bar layout (default)
  Vertical = 'Vertical'       // Sidebar layout
}
```

### MenuEffect

```typescript
enum MenuEffect {
  None = 'None',           // Instant appearance
  SlideDown = 'SlideDown', // Slide down animation
  ZoomIn = 'ZoomIn',       // Zoom in animation
  FadeIn = 'FadeIn'        // Fade in animation
}
```

### MenuOpenType

```typescript
enum MenuOpenType {
  Auto = 'Auto',    // Auto detection (click or hover based on showItemOnClick)
  Click = 'Click',  // Open only on click
  Hover = 'Hover'   // Open only on hover
}
```

---

## Quick Reference Summary

### Most Common Properties
```typescript
@Component({
  template: `
    <ejs-menu
      [items]="menuItems"
      [animationSettings]="animationSettings"
      [orientation]="'Horizontal'"
      [showItemOnClick]="false"
      (select)="onItemSelect($event)">
    </ejs-menu>
  `
})
export class MenuComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'File', items: [{ text: 'Open' }, { text: 'Save' }] },
    { text: 'Edit', items: [{ text: 'Cut' }, { text: 'Copy' }] }
  ];

  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'FadeIn',
    duration: 300
  };

  public onItemSelect(args: MenuEventArgs): void {
    console.log('Selected:', args.item?.text);
  }
}
```

### Most Common Methods
```typescript
// Add items
this.menuObj?.insertAfter([{ text: 'New' }], 'File', false);

// Remove items
this.menuObj?.removeItems(['Old'], false);

// Enable/Disable
this.menuObj?.enableItems(['Export'], false, false);

// Hide/Show
this.menuObj?.hideItems(['Admin'], false);
```

### Most Common Events
```typescript
(beforeOpen)="onBeforeOpen($event)"
(select)="onSelect($event)"
(beforeItemRender)="onBeforeItemRender($event)"
(created)="onCreated()"
```

