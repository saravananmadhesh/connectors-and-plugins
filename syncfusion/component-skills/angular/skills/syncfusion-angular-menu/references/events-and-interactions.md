# Events and Interactions

## Table of Contents
- [Event Overview](#event-overview)
- [beforeOpen Event](#beforeopen-event)
- [beforeClose Event](#beforeclose-event)
- [onOpen Event](#onopen-event)
- [onClose Event](#onclose-event)
- [select Event](#select-event)
- [created Event](#created-event)
- [beforeItemRender Event](#beforeitemrender-event)
- [Practical Examples](#practical-examples)

## Event Overview

The Menu component provides lifecycle and interaction events to enable dynamic customization:

| Event | Arguments | Purpose | Cancelable |
|-------|-----------|---------|-----------|
| `beforeOpen` | `BeforeOpenCloseMenuEventArgs` | Before submenu opens | Yes |
| `beforeClose` | `BeforeOpenCloseMenuEventArgs` | Before submenu closes | Yes |
| `onOpen` | `OpenCloseMenuEventArgs` | After submenu opens | No |
| `onClose` | `OpenCloseMenuEventArgs` | After submenu closes | No |
| `select` | `MenuEventArgs` | Menu item selected | No |
| `beforeItemRender` | `MenuEventArgs` | Before menu item renders | No |
| `created` | `Event` | Menu initialized | No |

### Event Arguments Details

#### BeforeOpenCloseMenuEventArgs
Used by `beforeOpen` and `beforeClose` events.

```typescript
interface BeforeOpenCloseMenuEventArgs {
  // Event metadata
  name: string;                    // Event name: 'beforeOpen' or 'beforeClose'
  
  // Menu item information
  item?: MenuItemModel;            // The menu item being opened/closed
  
  // DOM element reference
  element?: HTMLElement;           // The DOM element of the menu
  
  // Cancelation control
  cancel?: boolean;                // Set to true to prevent opening/closing
}
```

**Usage Example:**

```typescript
public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  console.log('Event:', args.name);                    // 'beforeOpen'
  console.log('Item text:', args.item?.text);         // Menu item text
  console.log('Item ID:', args.item?.id);             // Menu item ID
  console.log('Element classes:', args.element?.className);
  
  // Prevent opening if user is not authorized
  if (args.item?.id === 'admin-menu' && !this.isAdmin) {
    args.cancel = true;  // Block opening
  }
}
```

#### OpenCloseMenuEventArgs
Used by `onOpen` and `onClose` events (cannot be canceled).

```typescript
interface OpenCloseMenuEventArgs {
  // Event metadata
  name: string;                    // Event name: 'onOpen' or 'onClose'
  
  // Menu item information
  item?: MenuItemModel;            // The menu item opened/closed
  
  // DOM element reference
  element?: HTMLElement;           // The DOM element of the menu
}
```

**Usage Example:**

```typescript
public onOpen(args: OpenCloseMenuEventArgs): void {
  console.log('Menu opened:', args.item?.text);
  // Apply styling
  args.element?.classList.add('opened');
  args.element?.style.backgroundColor = '#f0f0f0';
}

public onClose(args: OpenCloseMenuEventArgs): void {
  console.log('Menu closed:', args.item?.text);
  // Remove styling
  args.element?.classList.remove('opened');
  args.element?.style.backgroundColor = '';
}
```

#### MenuEventArgs
Used by `select` and `beforeItemRender` events.

```typescript
interface MenuEventArgs {
  // Event metadata
  name: string;                    // Event name: 'select' or 'beforeItemRender'
  
  // Menu item information
  item?: MenuItemModel;            // The menu item being rendered/selected
  
  // DOM element reference
  element?: HTMLElement;           // The DOM element of the menu item
}
```

**Usage Example:**

```typescript
public select(args: MenuEventArgs): void {
  console.log('Selected item:', args.item?.text);
  console.log('Item URL:', args.item?.url);
  console.log('Element:', args.element?.innerText);
}

public beforeItemRender(args: MenuEventArgs): void {
  // Add custom attributes
  if (args.item?.id === 'premium') {
    args.element?.setAttribute('data-premium', 'true');
    args.element?.classList.add('premium-item');
  }
}
```

## beforeOpen Event

Triggered **before** a submenu opens. Allows modification of content or prevention of opening.

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class="status">{{ status }}</div>
      <ejs-menu [items]="menuItems" (beforeOpen)="beforeOpen($event)"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public status: string = '';

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
    }
  ];

  public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    this.status = 'Opening submenu: ' + args.items[0]?.text;
    
    // Optional: Prevent opening under certain conditions
    // args.cancel = true;
  }
}
```

### BeforeOpenCloseMenuEventArgs Properties

```typescript
export interface BeforeOpenCloseMenuEventArgs {
  element?: HTMLElement;        // DOM element
  items?: MenuItemModel[];      // Menu items array
  parentItem?: MenuItemModel;   // Parent menu item
  event?: Event;               // Event object
  cancel?: boolean;            // Cancel the operation
}
```

### Use Cases

- **Validate** before opening
- **Modify** submenu items dynamically
- **Prevent** opening under conditions
- **Load** data on-demand
- **Handle** submenu visibility

### Preventing Submenu Opening

```typescript
public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Prevent opening specific submenus
  if (args.parentItem?.text === 'Admin') {
    args.cancel = true;
  }
}
```

## beforeClose Event

Triggered **before** a submenu closes. Allows preventing closure or cleanup operations.

```typescript
public beforeClose(args: BeforeOpenCloseMenuEventArgs): void {
  this.status = 'Closing submenu';
  
  // Prevent closing custom elements
  if (args.element?.querySelector('input:focus')) {
    args.cancel = true;  // Keep open if input is focused
  }
}
```

## onOpen Event

Triggered **after** a submenu successfully opens. Useful for post-open adjustments.

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class="event-log">{{ eventLog }}</div>
      <ejs-menu [items]="menuItems" (onOpen)="onOpen($event)"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public eventLog: string = '';

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [{ text: 'Open' }, { text: 'Save' }]
    }
  ];

  public onOpen(args: OpenCloseMenuEventArgs): void {
    this.eventLog = 'Submenu opened successfully';
    
    // Apply custom styling or focus management
    if (args.element) {
      args.element.style.background = 'lightblue';
    }
  }
}
```

### OpenCloseMenuEventArgs Properties

```typescript
export interface OpenCloseMenuEventArgs {
  element?: HTMLElement;       // DOM element
  items?: MenuItemModel[];     // Menu items array
  parentItem?: MenuItemModel;  // Parent menu item
  event?: Event;              // Event object
}
```

## onClose Event

Triggered **after** a submenu closes. Useful for cleanup tasks.

```typescript
public onClose(args: OpenCloseMenuEventArgs): void {
  console.log('Submenu closed');
  
  // Cleanup operations
  this.eventLog = 'Submenu closed, cleaning up...';
  
  // Remove styles applied on open
  if (args.element) {
    args.element.style.background = '';
  }
}
```

## select Event

Triggered when a menu item is **selected/clicked**. Used for custom navigation or actions.

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
      <div class="selection-log">{{ selectedItem }}</div>
      <ejs-menu [items]="menuItems" (select)="onItemSelect($event)"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public selectedItem: string = '';

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

  public onItemSelect(args: MenuEventArgs): void {
    this.selectedItem = 'Selected: ' + args.item?.text;
    
    // Custom navigation logic
    if (args.item?.text === 'New') {
      this.handleNewFile();
    } else if (args.item?.text === 'Open') {
      this.handleOpenFile();
    }
  }

  private handleNewFile(): void {
    console.log('Creating new file...');
  }

  private handleOpenFile(): void {
    console.log('Opening file dialog...');
  }
}
```

### MenuEventArgs Properties

```typescript
export interface MenuEventArgs {
  element?: HTMLElement;       // DOM element
  item?: MenuItemModel;        // Selected item
  parentItem?: MenuItemModel;  // Parent item
  event?: Event;              // Event object
}
```

## created Event

Triggered when the Menu component is **initialized**. Useful for setup tasks.

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
      <button (click)="addNewItem()">Add Item</button>
      <ejs-menu #menu [items]="menuItems" (created)="onCreated()"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [{ text: 'Open' }, { text: 'Save' }]
    }
  ];

  public onCreated(): void {
    console.log('Menu initialized');
    
    // Perform initialization tasks
    this.disableDefaultItems();
  }

  private disableDefaultItems(): void {
    this.menuObj?.enableItems(['Save'], false, false);
  }

  public addNewItem(): void {
    const newItems: MenuItemModel[] = [{ text: 'New File' }];
    this.menuObj?.insertAfter(newItems, 'File', false);
  }
}
```

## beforeItemRender Event

Triggered **before** each menu item is rendered. Allows customization of individual menu items, such as setting tooltips, titles, or attributes.

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
      id: 'settingsIcon',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'Open', items: [
          { text: 'Sub Option 1' },
          { text: 'Sub Option 2' }
        ]},
        { text: 'Save' },
        { separator: true },
        { text: 'Exit' }
      ]
    },
    {
      id: 'userIcon',
      iconCss: 'e-icons e-user',
      items: [
        { text: 'Profile' },
        { text: 'Account' }
      ]
    }
  ];

  public beforeItemRender(args: MenuEventArgs): void {
    // Set title attribute for icon-based menu items to show tooltip
    if (args.item?.id === 'settingsIcon') {
      args.element?.setAttribute('title', 'Settings');
    } else if (args.item?.id === 'userIcon') {
      args.element?.setAttribute('title', 'User Account');
    }

    // Add custom CSS class for styling
    if (args.item?.text === 'Exit') {
      args.element?.classList.add('menu-item-danger');
    }

    // Add data attributes
    if (args.item?.text) {
      args.element?.setAttribute('data-menu-item', args.item.text);
    }
  }
}
```

### Use Cases

- **Set Tooltips** for icon-only menu items
- **Add Title Attributes** for accessibility
- **Apply Custom Styling** based on item properties
- **Set Data Attributes** for tracking or testing
- **Add ARIA Labels** for screen readers
- **Customize DOM Elements** before rendering

### Setting Tooltips for Icon Menu Items

```typescript
public beforeItemRender(args: MenuEventArgs): void {
  const item = args.item;
  
  // Define icon to tooltip mapping
  const tooltipMap: { [key: string]: string } = {
    'settingsIcon': 'Settings',
    'userIcon': 'User Profile',
    'helpIcon': 'Help & Support',
    'logoutIcon': 'Logout'
  };

  if (item?.id && item.id in tooltipMap) {
    args.element?.setAttribute('title', tooltipMap[item.id]);
  }
}
```

### Adding ARIA Labels

```typescript
public beforeItemRender(args: MenuEventArgs): void {
  if (args.item?.id === 'settingsIcon') {
    args.element?.setAttribute('aria-label', 'Settings Menu');
    args.element?.setAttribute('role', 'menuitem');
  }
}
```

### Custom Styling Based on Content

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" (beforeItemRender)="beforeItemRender($event)"></ejs-menu>
    </div>
  `,
  styles: [`
    .menu-item-danger {
      color: #e74c3c !important;
    }

    .menu-item-admin {
      background-color: #fffacd;
      font-weight: bold;
    }

    .menu-item-disabled-style {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Save' },
        { text: 'Delete' },
        { text: 'Admin Reset', id: 'admin-reset' }
      ]
    }
  ];

  public beforeItemRender(args: MenuEventArgs): void {
    // Style dangerous actions
    if (args.item?.text === 'Delete') {
      args.element?.classList.add('menu-item-danger');
    }

    // Highlight admin-only options
    if (args.item?.id === 'admin-reset') {
      args.element?.classList.add('menu-item-admin');
      args.element?.setAttribute('title', 'Admin only: Reset all settings');
    }

    // Disable certain items visually
    if (args.item?.text === 'Archive') {
      args.element?.classList.add('menu-item-disabled-style');
    }
  }
}
```

### Complete Set Title & Icon Example

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-title-icon',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" (beforeItemRender)="beforeItemRender($event)"></ejs-menu>
    </div>
  `
})
export class TitleIconComponent {
  public menuItems: MenuItemModel[] = [
    {
      id: 'home',
      iconCss: 'e-icons e-home'
    },
    {
      id: 'settings',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'General Settings' },
        { text: 'Advanced' },
        { text: 'Security' }
      ]
    },
    {
      id: 'help',
      iconCss: 'e-icons e-help'
    },
    {
      id: 'logout',
      iconCss: 'e-icons e-logout'
    }
  ];

  public beforeItemRender(args: MenuEventArgs): void {
    const titleMap: { [key: string]: string } = {
      'home': 'Home',
      'settings': 'Settings',
      'help': 'Help & Support',
      'logout': 'Sign Out'
    };

    if (args.item?.id && args.item.id in titleMap) {
      args.element?.setAttribute('title', titleMap[args.item.id]);
      args.element?.setAttribute('aria-label', titleMap[args.item.id]);
    }
  }
}
```

## Practical Examples

### Example 1: Event Trace Logger

Log all events for debugging:

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class="event-trace" [innerHTML]="eventTrace"></div>
      <button (click)="clearLog()">Clear Log</button>
      <ejs-menu 
        [items]="menuItems"
        (beforeOpen)="beforeOpen($event)"
        (beforeClose)="beforeClose($event)"
        (onOpen)="onOpen($event)"
        (onClose)="onClose($event)"
        (select)="onItemSelect($event)"
        (created)="onCreated()">
      </ejs-menu>
    </div>
  `
})
export class AppComponent {
  public eventTrace: string = '';

  public menuItems: MenuItemModel[] = [
    {
      text: 'Events',
      items: [
        { text: 'Conferences' },
        { text: 'Music' }
      ]
    },
    {
      text: 'Movies',
      items: [
        { text: 'Now Showing' },
        { text: 'Coming Soon' }
      ]
    }
  ];

  public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    this.addToLog('beforeOpen: ' + args.items?.[0]?.text);
  }

  public beforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    this.addToLog('beforeClose: ' + args.items?.[0]?.text);
  }

  public onOpen(args: OpenCloseMenuEventArgs): void {
    this.addToLog('onOpen: ' + args.items?.[0]?.text);
  }

  public onClose(args: OpenCloseMenuEventArgs): void {
    this.addToLog('onClose: ' + args.items?.[0]?.text);
  }

  public onItemSelect(args: MenuEventArgs): void {
    this.addToLog('select: ' + args.item?.text);
  }

  public onCreated(): void {
    this.addToLog('created: Menu initialized');
  }

  private addToLog(message: string): void {
    this.eventTrace = this.eventTrace + message + '<br />';
  }

  public clearLog(): void {
    this.eventTrace = '';
  }
}
```

### Example 2: Dynamic Item Enable/Disable

```typescript
public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  // Dynamically disable submenu items before opening
  for (let i = 0; i < args.items.length; i++) {
    if (args.items[i].text === 'Admin Only') {
      if (!this.isAdmin()) {
        this.menuObj?.enableItems([args.items[i].text as string], false, false);
      }
    }
  }
}

private isAdmin(): boolean {
  // Check user role
  return false;
}
```

### Example 3: Custom Navigation

```typescript
public onItemSelect(args: MenuEventArgs): void {
  const selectedText = args.item?.text;
  const url = args.item?.url;

  if (url) {
    // Navigate to URL
    window.location.href = url;
  } else {
    // Handle custom logic
    switch (selectedText) {
      case 'Dashboard':
        this.navigateTo('/dashboard');
        break;
      case 'Settings':
        this.navigateTo('/settings');
        break;
      default:
        console.log('Selected:', selectedText);
    }
  }
}

private navigateTo(path: string): void {
  console.log('Navigating to:', path);
  // Use Angular Router for navigation
}
```

---

**Next:** To style and theme your menu, see [references/styling-and-appearance.md](styling-and-appearance.md).
