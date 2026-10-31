# Menu Items Customization

## Table of Contents
- [Menu Item Properties](#menu-item-properties)
- [Icons and Images](#icons-and-images)
- [Navigation URLs](#navigation-urls)
- [Mnemonic UI](#mnemonic-ui)
- [Custom Attributes](#custom-attributes)
- [Enable and Disable Items](#enable-and-disable-items)
- [Show and Hide Items](#show-and-hide-items)
- [Add, Remove, Insert Items](#add-remove-insert-items)
- [Item Separators](#item-separators)
- [Dynamic Methods Reference](#dynamic-methods-reference)

## Menu Item Properties

### MenuItemModel Interface

```typescript
export interface MenuItemModel {
  text?: string;              // Display text
  iconCss?: string;          // CSS class for icon
  url?: string;              // Navigation URL
  items?: MenuItemModel[];   // Submenu items
  separator?: boolean;       // Item separator line
  disabled?: boolean;        // Disable item
  hidden?: boolean;          // Hide item
  id?: string;              // Unique identifier
  className?: string;       // Custom CSS class
  htmlAttributes?: any;     // HTML attributes
  keyCode?: string;         // Keyboard shortcut
}
```

### Basic Item Definition

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'File' },
  { text: 'Edit', items: [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ]},
  { text: 'Help' }
];
```

## Icons and Images

Add icons to menu items using the `iconCss` property with font icon classes:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      iconCss: 'e-icons e-file',
      items: [
        { text: 'Open', iconCss: 'e-icons e-open' },
        { text: 'Save', iconCss: 'e-icons e-save' },
        { separator: true },
        { text: 'Exit' }
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
      items: [
        { text: 'Toolbar' },
        { text: 'Sidebar' },
        { text: 'Full Screen' }
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
}
```

### Using Custom Images

For custom images instead of font icons, use `htmlAttributes`:

```typescript
{
  text: 'File',
  htmlAttributes: {
    style: 'background-image: url("image.png"); background-repeat: no-repeat;'
  }
}
```

**Important:** Ensure proper CSS imports for icon fonts (Material Icons, Font Awesome, etc.).

## Navigation URLs

Add navigation links to menu items using the `url` property:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" (beforeItemRender)="beforeItemRender($event)"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'Appliances',
      items: [
        { text: 'Washing Machine', url: 'https://www.google.com/search?q=washing+machine' },
        { text: 'Air Conditioners', url: 'https://www.google.com/search?q=air+conditioners' }
      ]
    },
    {
      text: 'Mobile',
      items: [
        { text: 'Headphones', url: 'https://www.google.com/search?q=headphones' },
        { text: 'Memory Cards', url: 'https://www.google.com/search?q=memory+cards' },
        { text: 'Power Banks', url: 'https://www.google.com/search?q=power+banks' }
      ]
    },
    {
      text: 'Entertainment',
      items: [
        { text: 'Televisions', url: 'https://www.google.com/search?q=televisions' },
        { text: 'Home Theatres', url: 'https://www.google.com/search?q=home+theatres' },
        { text: 'Gaming Laptops', url: 'https://www.google.com/search?q=gaming+laptops' }
      ]
    },
    { text: 'Fashion', url: 'https://www.google.com/search?q=fashion' },
    { text: 'Offers', url: 'https://www.google.com/search?q=offers' }
  ];

  public beforeItemRender(args: MenuEventArgs): void {
    // Custom navigation logic if needed
  }
}
```

### Navigation Behavior

- URLs open in the **same tab** by default
- Add `target="_blank"` via `beforeItemRender` to open in new tab:

```typescript
public beforeItemRender(args: MenuEventArgs): void {
  if (args.item.url) {
    args.element.setAttribute('target', '_blank');
  }
}
```

## Mnemonic UI

Add keyboard shortcuts to menu items using the `keyCode` property for mnemonic UI:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    keyCode: 'Alt+F',
    items: [
      { text: 'Open', keyCode: 'Ctrl+O' },
      { text: 'Save', keyCode: 'Ctrl+S' },
      { text: 'Exit', keyCode: 'Alt+F4' }
    ]
  },
  {
    text: 'Edit',
    keyCode: 'Alt+E',
    items: [
      { text: 'Cut', keyCode: 'Ctrl+X' },
      { text: 'Copy', keyCode: 'Ctrl+C' },
      { text: 'Paste', keyCode: 'Ctrl+V' }
    ]
  }
];
```

## Custom Attributes

Add HTML attributes to menu items using the `htmlAttributes` property:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    htmlAttributes: {
      class: 'custom-file-menu',
      'data-toggle': 'tooltip',
      title: 'File operations'
    },
    items: [
      { 
        text: 'Open',
        htmlAttributes: {
          'data-value': 'open-file',
          class: 'open-item'
        }
      }
    ]
  }
];
```

### Common Custom Attributes

```typescript
{
  text: 'Item',
  htmlAttributes: {
    'data-testid': 'menu-item-1',
    'aria-label': 'Custom Label',
    'role': 'menuitem'
  }
}
```

## Enable and Disable Items

### Disable Items on Creation

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Enabled Item' },
  { text: 'Disabled Item', disabled: true }
];
```

### Dynamic Enable/Disable

Use the `enableItems` method to enable or disable items after creation:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button (click)="disableItems()">Disable Items</button>
      <button (click)="enableAllItems()">Enable All</button>
      <ejs-menu #menu [items]="menuItems"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public menuItems: MenuItemModel[] = [
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

  public disableItems(): void {
    // Disable specific items
    this.menuObj?.enableItems(['Conferences', 'Music'], false, false);
  }

  public enableAllItems(): void {
    // Enable items
    this.menuObj?.enableItems(['Conferences', 'Music'], true, false);
  }
}
```

### Using Item IDs

Set `isUniqueId` to `true` to use item IDs instead of text:

```typescript
public menuItems: MenuItemModel[] = [
  {
    id: 'item-1',
    text: 'Events'
  }
];

// Disable by ID
this.menuObj?.enableItems(['item-1'], false, true);  // true = use ID
```

## Show and Hide Items

### Hide Items on Creation

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Visible Item' },
  { text: 'Hidden Item', hidden: true }
];
```

### Dynamic Show/Hide

Use `showItems` and `hideItems` methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button (click)="hideItems()">Hide Items</button>
      <button (click)="showAllItems()">Show All</button>
      <ejs-menu #menu [items]="menuItems"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'Events', items: [{ text: 'Conferences' }, { text: 'Music' }] },
    { text: 'Movies' },
    { text: 'Directory' }
  ];

  public hideItems(): void {
    this.menuObj?.hideItems(['Workshops', 'Music'], false);
  }

  public showAllItems(): void {
    this.menuObj?.showItems(['Workshops', 'Music'], false);
  }
}
```

**Note:** Currently, only header items can be hidden initially. Use `beforeOpen` event to hide submenu items dynamically.

## Add, Remove, Insert Items

### Insert Items

Use `insertBefore` and `insertAfter` methods to add items dynamically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuComponent, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button (click)="addBefore()">Insert Before Asia</button>
      <button (click)="addAfter()">Insert After Asia</button>
      <ejs-menu #menu [items]="data" [fields]="menuFields" (created)="created()"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public data: { [key: string]: Object }[] = [
    {
      continent: 'Asia',
      countries: [
        { country: 'China' },
        { country: 'India' }
      ]
    },
    { continent: 'North America' },
    { continent: 'Oceania' }
  ];

  public menuFields: any = {
    text: ['continent', 'country'],
    children: ['countries']
  };

  public created(): void {
    // Insert items on creation
  }

  public addBefore(): void {
    const insertItem: MenuItemModel[] = [
      { text: 'Europe', items: [{ text: 'Finland' }, { text: 'Austria' }] }
    ];
    this.menuObj?.insertBefore(insertItem, 'Oceania', false);
  }

  public addAfter(): void {
    const insertItem: MenuItemModel[] = [
      { text: 'Africa', items: [{ text: 'Nigeria' }] }
    ];
    this.menuObj?.insertAfter(insertItem, 'Asia', false);
  }
}
```

### Remove Items

Use the `removeItems` method:

```typescript
public removeItems(): void {
  // Remove items by text
  this.menuObj?.removeItems(['North America', 'Mexico'], false);
  
  // Or remove by ID (set last parameter to true)
  this.menuObj?.removeItems(['item-1', 'item-2'], true);
}
```

## Item Separators

Separators are horizontal lines that group menu items visually:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { separator: true },        // Separator line
      { text: 'Save' },
      { text: 'Save As' },
      { separator: true },        // Another separator
      { text: 'Exit' }
    ]
  }
];
```

### Horizontal Menu Separators

Separators work for both vertical and horizontal menus:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Home' },
  { text: 'Products' },
  { separator: true },      // Vertical line separator
  { text: 'Services' },
  { text: 'About' },
  { separator: true },
  { text: 'Contact' }
];
```

### Important Notes

- ⚠️ The `separator` property should NOT be used with other properties like `text`, `items`, or `url`
- Separators are non-interactive and cannot be selected
- Use separators to visually group related menu items

## Dynamic Methods Reference

### insertBefore() - Add Items Before a Target

**Signature:** `insertBefore(items: MenuItemModel[], target: string, isUniqueId?: boolean): void`

**Purpose:** Insert menu items before a target item by text or ID.

```typescript
import { MenuComponent } from '@syncfusion/ej2-angular-navigations';
import { ViewChild } from '@angular/core';

@Component({
  template: `
    <button (click)="insertBefore()">Insert Item Before 'Save'</button>
    <ejs-menu #menu [items]="menuItems"></ejs-menu>
  `
})
export class MenuComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New', id: 'file-new' },
        { text: 'Save', id: 'file-save' }
      ]
    }
  ];

  public insertBefore(): void {
    // Insert by text (isUniqueId = false)
    const newItems: MenuItemModel[] = [
      { text: 'Insert Before', id: 'file-insert' }
    ];
    this.menuObj?.insertBefore(newItems, 'Save', false);
  }

  public insertBeforeById(): void {
    // Insert by ID (isUniqueId = true)
    const newItems: MenuItemModel[] = [
      { text: 'Import', id: 'file-import' }
    ];
    this.menuObj?.insertBefore(newItems, 'file-save', true);
  }
}
```

### insertAfter() - Add Items After a Target

**Signature:** `insertAfter(items: MenuItemModel[], target: string, isUniqueId?: boolean): void`

**Purpose:** Insert menu items after a target item.

```typescript
public insertAfter(): void {
  // Insert by text
  const newItems: MenuItemModel[] = [
    { text: 'Print', id: 'file-print' },
    { text: 'Export', id: 'file-export' }
  ];
  this.menuObj?.insertAfter(newItems, 'Save', false);
}

public insertAfterMultiple(): void {
  // Insert multiple items after a target
  const items: MenuItemModel[] = [
    { text: 'Backup', items: [
      { text: 'Auto Backup' },
      { text: 'Manual Backup' }
    ]},
    { separator: true },
    { text: 'Close' }
  ];
  this.menuObj?.insertAfter(items, 'File', false);
}
```

### removeItems() - Delete Menu Items

**Signature:** `removeItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Remove menu items by text or ID.

```typescript
public removeItems(): void {
  // Remove by text (isUniqueId = false)
  this.menuObj?.removeItems(['Paste', 'Delete'], false);
}

public removeItemsById(): void {
  // Remove by ID (isUniqueId = true)
  this.menuObj?.removeItems(['edit-paste', 'edit-delete'], true);
}

public removeAllSubmenus(): void {
  // Remove all submenu items from 'Edit'
  this.menuObj?.removeItems(['Cut', 'Copy', 'Paste'], false);
}
```

### enableItems() - Enable or Disable Items

**Signature:** `enableItems(items: string[], enable: boolean, isUniqueId?: boolean): void`

**Purpose:** Enable or disable menu items (disabled items appear grayed out and cannot be clicked).

```typescript
public disableItems(): void {
  // Disable by text
  this.menuObj?.enableItems(['Save', 'Print'], false, false);
}

public enableItems(): void {
  // Enable by ID
  this.menuObj?.enableItems(['file-save', 'file-print'], true, true);
}

public toggleItemState(): void {
  // Dynamic enable/disable based on condition
  const isAdmin = this.checkUserRole();
  this.menuObj?.enableItems(['Delete', 'Permissions'], isAdmin, false);
}

@ViewChild('menu')
public menuObj?: MenuComponent;

public checkUserRole(): boolean {
  // Check if current user is admin
  return this.authService.hasRole('admin');
}
```

**Use Case:** Disable features based on:
- User permissions/roles
- License restrictions
- Feature flags
- Data availability

### showItems() - Display Hidden Items

**Signature:** `showItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Show header-level menu items that were previously hidden.

```typescript
public showItems(): void {
  // Show by text
  this.menuObj?.showItems(['Tools', 'Admin'], false);
}

public showItemsById(): void {
  // Show by ID
  this.menuObj?.showItems(['menu-tools', 'menu-admin'], true);
}

public showAdvancedOptions(): void {
  // Show advanced options based on user setting
  if (this.advancedModeEnabled) {
    this.menuObj?.showItems(['Developer', 'Debug', 'Advanced'], false);
  }
}
```

### hideItems() - Hide Menu Items

**Signature:** `hideItems(items: string[], isUniqueId?: boolean): void`

**Purpose:** Hide header-level menu items from display.

```typescript
public hideItems(): void {
  // Hide by text
  this.menuObj?.hideItems(['Admin', 'Developer'], false);
}

public hideItemsById(): void {
  // Hide by ID
  this.menuObj?.hideItems(['menu-admin', 'menu-dev'], true);
}

public hideForGuestUser(): void {
  // Hide admin features for guest users
  if (this.userRole === 'guest') {
    this.menuObj?.hideItems(['Admin', 'Settings', 'Export'], false);
  }
}
```

### Complete Example: Dynamic Menu Management

```typescript
@Component({
  template: `
    <div>
      <button (click)="addNewMenu()">Add New</button>
      <button (click)="removeMenu()">Remove Save</button>
      <button (click)="disablePrint()">Disable Print</button>
      <button (click)="showAdvanced()">Show Advanced</button>
    </div>
    <ejs-menu #menu [items]="menuItems"></ejs-menu>
  `
})
export class DynamicMenuComponent implements OnInit {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
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
      items: [
        { text: 'Cut', id: 'edit-cut' },
        { text: 'Copy', id: 'edit-copy' },
        { text: 'Paste', id: 'edit-paste' }
      ]
    },
    {
      text: 'View',
      id: 'view-menu',
      items: []
    }
  ];

  ngOnInit(): void {
    // Initialize dynamic items
    this.loadUserMenu();
  }

  public addNewMenu(): void {
    const newItems: MenuItemModel[] = [
      { text: 'Recent Files', id: 'file-recent' }
    ];
    this.menuObj?.insertAfter(newItems, 'Open', false);
  }

  public removeMenu(): void {
    this.menuObj?.removeItems(['Save'], false);
  }

  public disablePrint(): void {
    this.menuObj?.enableItems(['Print'], false, false);
  }

  public showAdvanced(): void {
    // Load advanced options dynamically
    const advanced: MenuItemModel[] = [
      { text: 'Theme', id: 'view-theme' },
      { text: 'Developer Tools', id: 'view-dev' },
      { text: 'Fullscreen', id: 'view-fullscreen' }
    ];
    this.menuObj?.insertAfter(advanced, 'View', false);
  }

  public loadUserMenu(): void {
    // Load menu items based on user permissions
    const permissions = this.userService.getPermissions();
    if (!permissions.includes('export')) {
      this.menuObj?.hideItems(['Export'], false);
    }
    if (!permissions.includes('admin')) {
      this.menuObj?.hideItems(['Admin Settings'], false);
    }
  }
}
```

---

**Next:** To add animations, control orientation, and handle menu behavior, see [references/animation-and-orientation.md](animation-and-orientation.md).
