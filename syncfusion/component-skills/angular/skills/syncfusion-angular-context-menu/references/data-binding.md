# Data Binding

## Table of Contents
- [MenuItemModel Structure](#menuitemmodel-structure)
- [Local Data Source Binding](#local-data-source-binding)
- [Parent-Child Item Relationships](#parent-child-item-relationships)
- [beforeItemRender Event](#beforeitemrender-event)
- [Dynamic Data Updates](#dynamic-data-updates)

## MenuItemModel Structure

The `MenuItemModel` interface defines the structure for menu items. Each item in the menu's `items` array follows this model:

### Complete Property Reference Table

| Property | Type | Optional | Default | Description |
|----------|------|----------|---------|-------------|
| `text` | `string` | No | - | **Required.** Specifies text for menu item. This is the display label shown to users. |
| `id` | `string` | Yes | - | Specifies the id for menu item. Use this for identifying items in methods like `enableItems()`, `removeItems()`, etc. Useful with `isUniqueId` parameter in component methods. |
| `items` | `MenuItemModel[]` | Yes | - | Specifies the sub menu items that is the array of MenuItem model. Creates nested/hierarchical menus. Can have unlimited nesting levels. |
| `separator` | `boolean` | Yes | `false` | Specifies separator between the menu items. Separators are either horizontal or vertical lines used to group menu items. Set to `true` to create a visual divider. |
| `iconCss` | `string` | Yes | - | Defines class/multiple classes separated by a space for the menu Item that is used to include an icon. Menu Item can include font icon and sprite image. Example: `iconCss: 'e-icons e-edit'` or `iconCss: 'fa-solid fa-pen'`. |
| `url` | `string` | Yes | - | Specifies url for menu item that creates the anchor link to navigate to the url provided. When clicked, navigates to this URL. Can be relative or absolute URLs. Example: `/dashboard` or `https://example.com/page`. |
| `htmlAttributes` | `Record<string, any>` | Yes | - | Specifies the htmlAttributes property to support adding custom attributes to the menu items. Example: `{ 'data-info': 'value', 'title': 'My Tooltip', 'aria-label': 'Edit Item' }`. Useful for custom styling, data attributes, and accessibility. |

### Complete Property Example

**Brief Example:**
```typescript
const menuItem: MenuItemModel = {
  text: 'Edit',                           // Display text
  id: 'edit-item',                        // Unique identifier
  iconCss: 'e-icons e-edit',              // Icon styling
  items: [                                // Sub-items (nested)
    { text: 'Undo' },
    { text: 'Redo' }
  ],
  separator: false,                       // Not a separator
  url: '',                                // No navigation
  htmlAttributes: {                       // Custom attributes
    'data-action': 'edit',
    'title': 'Edit the item'
  }
};
```

**Full Working Example - All Properties:**
```typescript
import { Component } from '@angular/core';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-full-menuitem-example',
  template: `
    <div id="target">Right click here</div>
    <ejs-contextmenu target='#target' [items]='menuItems'></ejs-contextmenu>
  `
})
export class FullMenuItemExampleComponent {
  menuItems: MenuItemModel[] = [
    // Simple text item
    {
      text: 'New',
      id: 'new-item'
    },
    
    // Item with icon
    {
      text: 'Edit',
      id: 'edit-item',
      iconCss: 'e-icons e-edit'
    },
    
    // Item with submenu
    {
      text: 'Format',
      id: 'format-item',
      iconCss: 'e-icons e-palette',
      items: [
        { text: 'Bold', id: 'bold' },
        { text: 'Italic', id: 'italic' },
        { text: 'Underline', id: 'underline' }
      ]
    },
    
    // Separator divider
    {
      separator: true
    },
    
    // URL navigation item
    {
      text: 'Visit Website',
      id: 'website-item',
      iconCss: 'e-icons e-export',
      url: 'https://example.com',
      htmlAttributes: {
        'target': '_blank',
        'title': 'Open external link'
      }
    },
    
    // Item with custom HTML attributes
    {
      text: 'Settings',
      id: 'settings-item',
      iconCss: 'e-icons e-settings',
      htmlAttributes: {
        'data-action': 'settings',
        'data-premium': 'true',
        'aria-label': 'Open settings menu',
        'title': 'Configure options'
      }
    },
    
    // Complex nested structure
    {
      text: 'Advanced',
      id: 'advanced-item',
      items: [
        {
          text: 'Development',
          id: 'dev',
          items: [
            { text: 'Console', id: 'console' },
            { text: 'Debugger', id: 'debugger' }
          ]
        },
        {
          text: 'Analytics',
          id: 'analytics',
          url: '/analytics'
        }
      ]
    }
  ];
}
```

### Property Details and Examples

#### Property: `text` (Required)

Specifies the display text for the menu item. This is the only required property.

**Brief Example:**
```typescript
{ text: 'Edit' }
```

**Full Example:**
```typescript
const items: MenuItemModel[] = [
  { text: 'Save' },                    // Simple text
  { text: 'Save As...' },              // Text with ellipsis
  { text: 'Recent Files' },            // Submenu text
  { text: 'A' },                       // Single character
  { text: 'Copy (Ctrl+C)' }            // Text with shortcut hint
];
```

#### Property: `id` (Optional)

Specifies the unique identifier for the menu item. Use this when you need to reference items programmatically in component methods.

**Brief Example:**
```typescript
{ text: 'Edit', id: 'edit-item' }
```

**Full Example - Using IDs with Component Methods:**
```typescript
export class IdExampleComponent {
  items: MenuItemModel[] = [
    { text: 'Edit', id: 'edit-item' },
    { text: 'Delete', id: 'delete-item' },
    { text: 'Copy', id: 'copy-item' }
  ];
  
  @ViewChild('contextMenu') contextMenu!: ContextMenuComponent;
  
  disableAdminActions() {
    // Disable by ID (more reliable than by text)
    this.contextMenu.enableItems(['delete-item', 'admin-settings'], false, true);
  }
  
  showSuperUserMenu() {
    // Show items by ID
    this.contextMenu.showItems(['admin-panel', 'audit-logs'], true);
  }
  
  findItemIndex() {
    // Get index by ID
    const index = this.contextMenu.getItemIndex('edit-item', true);
    console.log('Edit item at index:', index);
  }
}
```

#### Property: `iconCss` (Optional)

Defines CSS classes for displaying an icon next to the menu item text. Supports Syncfusion icons, Font Awesome, or custom icon fonts.

**Brief Example:**
```typescript
{ text: 'Edit', iconCss: 'e-icons e-edit' }
```

**Full Example - Various Icon Sources:**
```typescript
items: MenuItemModel[] = [
  // Syncfusion built-in icons
  { text: 'Edit', iconCss: 'e-icons e-edit' },
  { text: 'Delete', iconCss: 'e-icons e-delete' },
  { text: 'Save', iconCss: 'e-icons e-save' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  
  // Font Awesome icons (if available)
  { text: 'Settings', iconCss: 'fa-solid fa-gear' },
  { text: 'User', iconCss: 'fa-solid fa-user' },
  
  // Multiple icon classes
  { text: 'Premium Feature', iconCss: 'e-icons e-star custom-premium-icon' },
  
  // Submenu with icons
  {
    text: 'Format',
    iconCss: 'e-icons e-palette',
    items: [
      { text: 'Bold', iconCss: 'e-icons e-bold' },
      { text: 'Italic', iconCss: 'e-icons e-italic' },
      { text: 'Underline', iconCss: 'e-icons e-underline' }
    ]
  }
];
```

**CSS for Custom Icons:**
```css
.custom-premium-icon::before {
  content: '★';
  color: gold;
}
```

#### Property: `separator` (Optional)

Creates a visual divider line between menu items for grouping related items.

**Brief Example:**
```typescript
{ separator: true }
```

**Full Example - Logical Grouping:**
```typescript
items: MenuItemModel[] = [
  // Group 1: File operations
  { text: 'New', iconCss: 'e-icons e-new' },
  { text: 'Open', iconCss: 'e-icons e-open' },
  { text: 'Save', iconCss: 'e-icons e-save' },
  
  // Separator
  { separator: true },
  
  // Group 2: Editing operations
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' },
  
  // Separator
  { separator: true },
  
  // Group 3: Document operations
  { text: 'Print', iconCss: 'e-icons e-print' },
  { text: 'Export', iconCss: 'e-icons e-export' }
];
```

#### Property: `url` (Optional)

Specifies a URL that the menu item navigates to when clicked. Transforms the item into a clickable link.

**Brief Example:**
```typescript
{ text: 'Google', url: 'https://google.com' }
```

**Full Example - Navigation:**
```typescript
items: MenuItemModel[] = [
  // External URLs
  {
    text: 'Visit Syncfusion',
    url: 'https://syncfusion.com',
    htmlAttributes: { 'target': '_blank' }
  },
  
  // Internal routes
  {
    text: 'Dashboard',
    url: '/dashboard',
    iconCss: 'e-icons e-home'
  },
  {
    text: 'Settings',
    url: '/settings',
    iconCss: 'e-icons e-settings'
  },
  
  // Submenu with URLs
  {
    text: 'Documentation',
    items: [
      { text: 'Getting Started', url: '/docs/getting-started' },
      { text: 'API Reference', url: '/docs/api' },
      { text: 'Tutorials', url: 'https://tutorials.example.com' }
    ]
  }
];
```

**Note:** URL items still fire the `select` event, allowing you to intercept navigation if needed:

```typescript
onSelect(args: MenuEventArgs) {
  if (args.item.url === 'https://example.com') {
    // Custom handling before navigation
    console.log('Navigating to external link');
  }
}
```

#### Property: `items` (Optional - Nested MenuItemModel[])

Specifies sub-menu items, creating hierarchical/nested menus. Each item can have its own items array, allowing unlimited nesting depth.

**Brief Example:**
```typescript
{
  text: 'Format',
  items: [
    { text: 'Bold' },
    { text: 'Italic' }
  ]
}
```

**Full Example - Hierarchical Structure:**
```typescript
items: MenuItemModel[] = [
  {
    text: 'File',
    iconCss: 'e-icons e-folder',
    items: [
      { text: 'New', id: 'file-new' },
      { text: 'Open', id: 'file-open' },
      {
        text: 'Recent Files',
        id: 'recent',
        items: [
          { text: 'Document1.txt', url: '/recent/doc1' },
          { text: 'Document2.txt', url: '/recent/doc2' },
          { separator: true },
          { text: 'Clear Recent', id: 'clear-recent' }
        ]
      },
      { separator: true },
      { text: 'Exit', id: 'file-exit' }
    ]
  },
  {
    text: 'Edit',
    iconCss: 'e-icons e-edit',
    items: [
      { text: 'Undo', id: 'edit-undo' },
      { text: 'Redo', id: 'edit-redo' },
      { separator: true },
      { text: 'Cut', id: 'edit-cut' },
      { text: 'Copy', id: 'edit-copy' },
      { text: 'Paste', id: 'edit-paste' }
    ]
  },
  {
    text: 'View',
    items: [
      {
        text: 'Zoom',
        items: [
          { text: '100%', id: 'zoom-100' },
          { text: '150%', id: 'zoom-150' },
          { text: '200%', id: 'zoom-200' }
        ]
      },
      {
        text: 'Layout',
        items: [
          { text: 'Default', id: 'layout-default' },
          { text: 'Wide', id: 'layout-wide' },
          { text: 'Compact', id: 'layout-compact' }
        ]
      }
    ]
  }
];
```

**Programming Nested Items:**
```typescript
export class NestedProgrammingComponent {
  addSubMenu() {
    // Add submenu to existing item
    const fileItem = this.menuItems[0];
    
    if (fileItem.items) {
      fileItem.items.push({
        text: 'New Group',
        items: [
          { text: 'Project', id: 'new-project' },
          { text: 'File', id: 'new-file' }
        ]
      });
    }
  }
  
  getNestedItemIndex() {
    // Find nested item: Format > Bold
    const index = this.contextMenu.getItemIndex('bold', true);
    console.log(index); // [1, 0] - second level menu, first item
  }
}
```

#### Property: `htmlAttributes` (Optional - Record<string, any>)

Adds custom HTML attributes to the menu item DOM element. Useful for custom data storage, accessibility, and styling.

**Brief Example:**
```typescript
{
  text: 'Edit',
  htmlAttributes: {
    'data-action': 'edit',
    'title': 'Edit selected item'
  }
}
```

**Full Example - Various Use Cases:**
```typescript
items: MenuItemModel[] = [
  // Custom data attributes
  {
    text: 'Edit',
    id: 'edit-item',
    htmlAttributes: {
      'data-action': 'edit',
      'data-icon': 'pencil',
      'data-hotkey': 'Ctrl+E'
    }
  },
  
  // Accessibility attributes
  {
    text: 'Delete',
    htmlAttributes: {
      'aria-label': 'Delete the selected file',
      'role': 'menuitem',
      'title': 'Permanently remove this item (cannot be undone)'
    }
  },
  
  // External URL with target
  {
    text: 'Help',
    url: 'https://help.example.com',
    htmlAttributes: {
      'target': '_blank',
      'rel': 'noopener noreferrer',
      'title': 'Open help in new tab'
    }
  },
  
  // Permission-based styling
  {
    text: 'Admin Panel',
    htmlAttributes: {
      'data-permission': 'admin',
      'data-requires-auth': 'true',
      'class': 'admin-only',
      'style': 'color: red;'
    }
  },
  
  // Performance tracking
  {
    text: 'Download Report',
    htmlAttributes: {
      'data-track': 'true',
      'data-event': 'report-download',
      'data-category': 'exports'
    }
  },
  
  // Nested items with attributes
  {
    text: 'Export',
    htmlAttributes: {
      'data-submenu': 'export-options'
    },
    items: [
      {
        text: 'PDF',
        htmlAttributes: {
          'data-format': 'pdf',
          'data-size': 'small'
        }
      },
      {
        text: 'Excel',
        htmlAttributes: {
          'data-format': 'xlsx',
          'data-size': 'medium'
        }
      }
    ]
  }
];
```

**Accessing Custom Attributes in TypeScript:**
```typescript
onItemSelect(args: MenuEventArgs) {
  // Access custom data attributes
  const action = args.element.getAttribute('data-action');
  const requiresAuth = args.element.getAttribute('data-requires-auth');
  
  console.log('Action:', action);
  console.log('Requires authentication:', requiresAuth);
  
  // Track analytics
  const trackData = args.element.getAttribute('data-track');
  if (trackData === 'true') {
    const event = args.element.getAttribute('data-event');
    // Send to analytics
    console.log('Track event:', event);
  }
}
```

**CSS Styling with htmlAttributes:**
```css
/* Style admin-only items */
.admin-only {
  color: red;
  font-weight: bold;
}

/* Highlight items with data-premium attribute */
[data-premium="true"] {
  background-color: #fff3cd;
  border-left: 3px solid gold;
}

/* Add visual indicator for items requiring authentication */
[data-requires-auth="true"]::after {
  content: ' 🔒';
}
```

### Core Properties

The basic `MenuItemModel` interface structure:

```typescript
import { MenuItemModel } from '@syncfusion/ej2-navigations';

// Minimal required structure
interface MenuItemModel {
  text: string;  // Display text (required)
  
  // Optional properties for enhancement
  id?: string;
  items?: MenuItemModel[];
  separator?: boolean;
  iconCss?: string;
  url?: string;
  htmlAttributes?: Record<string, any>;
}
```

## Local Data Source Binding

### Array of Objects

Bind menu items from a simple array of objects:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut', iconCss: 'e-cm-icons e-cut' },
    { text: 'Copy', iconCss: 'e-cm-icons e-copy' },
    { text: 'Paste', iconCss: 'e-cm-icons e-paste' }
  ];
}
```

### Dynamic Array Creation

Create menu items programmatically from data:

```typescript
export class AppComponent {
  public menuItems: MenuItemModel[] = [];

  constructor() {
    this.initializeMenu();
  }

  initializeMenu(): void {
    const actions = ['Cut', 'Copy', 'Paste', 'Delete'];
    
    this.menuItems = actions.map(action => ({
      text: action,
      iconCss: `e-icons e-${action.toLowerCase()}`
    }));
  }
}
```

### Data from API/Service

Fetch menu items from an external source:

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

// Mock service for demonstration
class MenuService {
  getMenuItems(): MenuItemModel[] {
    return [
      { text: 'Dashboard', iconCss: 'e-icons e-home' },
      { text: 'Settings', iconCss: 'e-icons e-settings' },
      { text: 'Logout', iconCss: 'e-icons e-close' }
    ];
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<ejs-contextmenu [items]='menuItems'></ejs-contextmenu>`
})
export class AppComponent implements OnInit {
  public menuItems: MenuItemModel[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
  }
}
```

## Parent-Child Item Relationships

### Hierarchical Structure

Create multi-level menus with parent-child relationships:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    iconCss: 'e-icons e-folder',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { text: 'Recent Files', items: [
        { text: 'document1.txt' },
        { text: 'document2.txt' }
      ]}
    ]
  },
  {
    text: 'Edit',
    iconCss: 'e-icons e-edit',
    items: [
      { text: 'Undo' },
      { text: 'Redo' },
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  }
];
```

### Building from Flat Data

Transform flat data structure into hierarchical menu:

```typescript
interface MenuItem {
  id: number;
  parentId?: number;
  text: string;
  icon?: string;
}

const flatData: MenuItem[] = [
  { id: 1, text: 'File', icon: 'e-folder' },
  { id: 2, parentId: 1, text: 'New' },
  { id: 3, parentId: 1, text: 'Open' },
  { id: 4, text: 'Edit', icon: 'e-edit' },
  { id: 5, parentId: 4, text: 'Cut' },
  { id: 6, parentId: 4, text: 'Copy' }
];

export class AppComponent {
  public menuItems: MenuItemModel[] = [];

  constructor() {
    this.buildHierarchy();
  }

  buildHierarchy(): void {
    const items: MenuItemModel[] = [];
    const itemMap = new Map<number, MenuItemModel>();

    // First pass: create all items
    flatData.forEach(data => {
      const menuItem: MenuItemModel = {
        text: data.text,
        iconCss: data.icon ? `e-icons ${data.icon}` : undefined,
        items: []
      };
      itemMap.set(data.id, menuItem);
    });

    // Second pass: build hierarchy
    flatData.forEach(data => {
      const menuItem = itemMap.get(data.id)!;
      
      if (data.parentId) {
        const parent = itemMap.get(data.parentId);
        if (parent && parent.items) {
          parent.items.push(menuItem);
        }
      } else {
        items.push(menuItem);
      }
    });

    this.menuItems = items;
  }
}
```

### Managing Parent-Child Updates

```typescript
updateSubmenu(parentId: string, newSubItems: MenuItemModel[]): void {
  const parent = this.menuItems.find(m => m.id === parentId);
  
  if (parent) {
    parent.items = newSubItems;
    // Trigger menu refresh if needed
  }
}
```

## beforeItemRender Event

### Item Rendering Customization

The `beforeItemRender` event fires before each menu item renders, allowing customization:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='itemRender($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  itemRender(args: MenuEventArgs): void {
    // Called before each item renders
    console.log('Rendering item:', args.item.text);
  }
}
```

### Conditional Item Styling

```typescript
itemRender(args: MenuEventArgs): void {
  // Highlight disabled items
  if (args.item.disabled) {
    args.element.classList.add('disabled-item');
  }

  // Add CSS classes based on item properties
  if (args.item.iconCss) {
    args.element.classList.add('icon-item');
  }
}
```

### Custom HTML Content

```typescript
itemRender(args: MenuEventArgs): void {
  // Customize item display with HTML
  if (args.item.text === 'Save As...') {
    args.element.innerHTML = `
      <span>Save As...</span>
      <span style="color: gray; font-size: 0.9em;">(Ctrl+S)</span>
    `;
  }
}
```

### Data Transformation

```typescript
itemRender(args: MenuEventArgs): void {
  // Format text based on item properties
  if (args.item.text) {
    // Convert to title case
    const titleCase = args.item.text
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    
    args.element.textContent = titleCase;
  }
}
```

### Handling Separator Items

```typescript
itemRender(args: MenuEventArgs): void {
  // Add custom styling to separators
  if (!args.item.text && args.item.separator) {
    args.element.classList.add('custom-separator');
  }
}
```

## Dynamic Data Updates

### Updating Menu Items at Runtime

Modify menu items and refresh the component:

```typescript
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
  ];

  addMenuItem(newItem: MenuItemModel): void {
    this.menuItems.push(newItem);
    // Trigger change detection
  }

  updateMenuItem(index: number, updatedItem: MenuItemModel): void {
    this.menuItems[index] = updatedItem;
  }

  removeMenuItem(index: number): void {
    this.menuItems.splice(index, 1);
  }
}
```

### Real-Time Data Binding

Bind menu items to a data source that changes:

```typescript
export class AppComponent implements OnInit {
  public menuItems: MenuItemModel[] = [];
  private dataRefreshInterval: any;

  ngOnInit(): void {
    this.loadMenuItems();
    
    // Refresh menu items every 5 seconds
    this.dataRefreshInterval = setInterval(() => {
      this.loadMenuItems();
    }, 5000);
  }

  private loadMenuItems(): void {
    // Fetch fresh data from service
    this.menuItems = [
      { text: 'Item 1', id: '1' },
      { text: 'Item 2', id: '2' },
      { text: 'Item 3', id: '3' }
    ];
  }

  ngOnDestroy(): void {
    if (this.dataRefreshInterval) {
      clearInterval(this.dataRefreshInterval);
    }
  }
}
```

### Conditional Item Rendering

```typescript
public get dynamicMenuItems(): MenuItemModel[] {
  const items: MenuItemModel[] = [
    { text: 'New', iconCss: 'e-icons e-new' },
    { text: 'Open', iconCss: 'e-icons e-open' }
  ];

  // Add admin-only items
  if (this.isAdmin) {
    items.push({ text: 'Settings', iconCss: 'e-icons e-settings' });
    items.push({ text: 'Manage Users', iconCss: 'e-icons e-users' });
  }

  return items;
}
```

### Batch Updates

```typescript
updateMenuStructure(newStructure: MenuItemModel[]): void {
  this.menuItems = [];  // Clear existing
  
  // Add new items in batch
  newStructure.forEach(item => {
    this.menuItems.push(item);
  });
}
```

## Complete Example: Dynamic Data-Bound Menu

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

interface DataRecord {
  id: number;
  text: string;
  iconCss?: string;
  subItems?: DataRecord[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <button (click)="addItem()">Add Item</button>
      <button (click)="refreshData()">Refresh Data</button>
      
      <div id="target">Right click / Touch hold</div>
      
      <ejs-contextmenu 
        #contextmenu
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='onItemRender($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [];
  private dataSource: DataRecord[] = [];

  ngOnInit(): void {
    this.loadDataSource();
    this.bindMenuItems();
  }

  private loadDataSource(): void {
    this.dataSource = [
      {
        id: 1,
        text: 'File',
        iconCss: 'e-icons e-folder',
        subItems: [
          { id: 11, text: 'New' },
          { id: 12, text: 'Open' },
          { id: 13, text: 'Save' }
        ]
      },
      {
        id: 2,
        text: 'Edit',
        iconCss: 'e-icons e-edit',
        subItems: [
          { id: 21, text: 'Cut' },
          { id: 22, text: 'Copy' },
          { id: 23, text: 'Paste' }
        ]
      }
    ];
  }

  private bindMenuItems(): void {
    this.menuItems = this.transformData(this.dataSource);
  }

  private transformData(data: DataRecord[]): MenuItemModel[] {
    return data.map(record => ({
      text: record.text,
      iconCss: record.iconCss,
      id: record.id.toString(),
      items: record.subItems ? this.transformData(record.subItems) : undefined
    }));
  }

  onItemRender(args: MenuEventArgs): void {
    // Apply custom styling
    if (args.item.iconCss) {
      args.element.classList.add('has-icon');
    }
  }

  addItem(): void {
    const newItem: DataRecord = {
      id: this.dataSource.length + 1,
      text: 'New Item',
      iconCss: 'e-icons e-plus'
    };
    
    this.dataSource.push(newItem);
    this.bindMenuItems();
  }

  refreshData(): void {
    this.loadDataSource();
    this.bindMenuItems();
  }
}
```

---

**Next:** Handle menu item clicks and events in [references/interaction-and-events.md](../interaction-and-events.md).
