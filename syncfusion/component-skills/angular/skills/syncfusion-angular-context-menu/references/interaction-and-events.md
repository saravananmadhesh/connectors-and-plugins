# Interaction & Events

## Table of Contents
- [Menu Item Click Handlers](#menu-item-click-handlers)
- [Click-to-Open Submenus](#click-to-open-submenus)
- [Programmatic Open and Close](#programmatic-open-and-close)
- [Menu Positioning](#menu-positioning)
- [Opening Dialogs on Item Selection](#opening-dialogs-on-item-selection)
- [MenuEventArgs Reference](#menueventargs-reference)

## Menu Item Click Handlers

### select Event

Handle menu item clicks using the `select` event:

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
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        (select)='onSelect($event)'>
      </ejs-contextmenu>
      
      <p>Selected Item: {{ selectedItem }}</p>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  public selectedItem = '';

  onSelect(args: MenuEventArgs): void {
    this.selectedItem = args.item.text || 'Unknown';
    console.log('Item clicked:', args.item.text);
  }
}
```

### Conditional Actions Based on Selection

```typescript
onSelect(args: MenuEventArgs): void {
  switch (args.item.text) {
    case 'Cut':
      this.performCut();
      break;
    case 'Copy':
      this.performCopy();
      break;
    case 'Paste':
      this.performPaste();
      break;
  }
}

private performCut(): void {
  console.log('Cutting selected content');
  // Implement cut logic
}

private performCopy(): void {
  console.log('Copying selected content');
  // Implement copy logic
}

private performPaste(): void {
  console.log('Pasting content');
  // Implement paste logic
}
```

### Accessing Event Arguments

```typescript
onSelect(args: MenuEventArgs): void {
  // Get item properties
  const itemText = args.item.text;
  const itemId = args.item.id;
  const itemElement = args.element;
  
  // Get event details
  const eventSource = args.event;
  const targetElement = args.event.target as HTMLElement;
  
  console.log(`Selected: ${itemText} (ID: ${itemId})`);
  console.log(`Target element ID: ${targetElement.id}`);
}
```

## Click-to-Open Submenus

### showItemOnClick Property

By default, submenus open on hover. Enable click-based opening:

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
        [items]='menuItems'
        [showItemOnClick]='true'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Show All Bookmarks' },
    {
      text: 'Bookmarks Toolbar',
      items: [
        {
          text: 'Most Visited',
          items: [
            { text: 'Gmail' },
            { text: 'Google' }
          ]
        },
        { text: 'Recently Added' }
      ]
    }
  ];
}
```

### Advantages of Click-Based Submenus

- Prevents accidental submenu opening on hover
- Better for touch devices where hover isn't available
- More deliberate user interaction
- Reduces menu clutter on hover

## Programmatic Open and Close

### open() Method

Open the context menu programmatically at specific coordinates:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { getInstance } from '@syncfusion/ej2-base';
import { ContextMenu } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule, ButtonModule],
  template: `
    <div class="e-section-control">
      <button ejs-button (click)="openMenu()">Open ContextMenu</button>
      
      <ejs-contextmenu 
        id='contextmenu' 
        [items]='menuItems'>
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

  openMenu(): void {
    // Get reference to context menu component
    const contextmenuElement = document.getElementById('contextmenu_0') as HTMLElement;
    const contextmenuObj = getInstance(contextmenuElement, ContextMenu) as ContextMenu;
    
    // Open at specific coordinates (top: 40px, left: 20px)
    contextmenuObj.open(40, 20);
  }
}
```

### close() Method

Close the context menu programmatically:

```typescript
closeMenu(): void {
  const contextmenuElement = document.getElementById('contextmenu_0') as HTMLElement;
  const contextmenuObj = getInstance(contextmenuElement, ContextMenu) as ContextMenu;
  
  contextmenuObj.close();
}
```

### Open at Mouse Position

```typescript
openMenuAtMouse(event: MouseEvent): void {
  const contextmenuElement = document.getElementById('contextmenu_0') as HTMLElement;
  const contextmenuObj = getInstance(contextmenuElement, ContextMenu) as ContextMenu;
  
  // Open at mouse cursor position
  contextmenuObj.open(event.clientY, event.clientX);
}
```

## Menu Positioning

### Top and Left Coordinates

Position the menu at specific screen coordinates:

```typescript
openMenu(): void {
  const contextmenuObj = getInstance(
    document.getElementById('contextmenu_0'), 
    ContextMenu
  ) as ContextMenu;
  
  // Position: 100px from top, 150px from left
  contextmenuObj.open(100, 150);
}
```

### Relative to Target Element

```typescript
openMenuAtElement(): void {
  const targetElement = document.getElementById('target') as HTMLElement;
  const rect = targetElement.getBoundingClientRect();
  
  const contextmenuObj = getInstance(
    document.getElementById('contextmenu_0'), 
    ContextMenu
  ) as ContextMenu;
  
  // Position at element's bottom-right
  contextmenuObj.open(
    rect.top + rect.height,
    rect.left + rect.width
  );
}
```

### Center on Screen

```typescript
centerMenuOnScreen(): void {
  const contextmenuObj = getInstance(
    document.getElementById('contextmenu_0'), 
    ContextMenu
  ) as ContextMenu;
  
  const top = window.innerHeight / 2;
  const left = window.innerWidth / 2;
  
  contextmenuObj.open(top, left);
}
```

## Opening Dialogs on Item Selection

### Dialog Integration

Open a dialog when a specific menu item is clicked:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule, DialogModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      
      <ejs-dialog 
        #dialog 
        [visible]='dialogVisible'
        [buttons]='dialogButtons'
        header='Save As'
        content='Enter file name...'>
      </ejs-dialog>
      
      <ejs-contextmenu 
        target="#target" 
        [items]="menuItems" 
        (select)="itemSelect($event)">
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('dialog')
  public dialog?: DialogComponent;

  public dialogVisible = false;

  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save As...' },
    { text: 'Print' }
  ];

  public dialogButtons: any[] = [
    {
      buttonModel: {
        isPrimary: true,
        content: 'Save',
        cssClass: 'e-flat'
      },
      click: () => this.onDialogSave()
    }
  ];

  itemSelect(args: MenuEventArgs): void {
    if (args.item.text === 'Save As...') {
      this.dialogVisible = true;
      if (this.dialog) {
        this.dialog.show();
      }
    }
  }

  onDialogSave(): void {
    console.log('File saved');
    this.dialogVisible = false;
    if (this.dialog) {
      this.dialog.hide();
    }
  }
}
```

### Confirmation Dialog

```typescript
itemSelect(args: MenuEventArgs): void {
  if (args.item.text === 'Delete') {
    // Show confirmation dialog before deleting
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.performDelete();
    }
  }
}

private performDelete(): void {
  console.log('Item deleted');
}
```

## Complete Event Reference

### Event: select

**Triggers:** While selecting menu item (when item is clicked).

**Signature:** `(select)='onSelect($event)'`

**Event Arguments - MenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'select'`. |
| `event` | `Event` | Original browser event object (click event). Contains properties like `type`, `timeStamp`, `target`. |
| `item` | `MenuItemModel` | The menu item that was selected/clicked. Contains all item properties (text, id, iconCss, etc.). |
| `element` | `HTMLElement` | The DOM element of the menu item that was clicked. Can be used for styling or accessing attributes. |

**MenuEventArgs Interface (Complete):**
```typescript
interface MenuEventArgs {
  name: string;                    // 'select' | 'beforeItemRender'
  event: Event;                    // Browser event
  item: MenuItemModel;             // Selected menu item
  element: HTMLElement;            // DOM element of item
  element.textContent: string;     // Item text
  element.innerHTML: string;       // Item HTML
  element.classList: DOMTokenList; // CSS classes
}
```

**Brief Example:**
```typescript
onSelect(args: MenuEventArgs) {
  console.log('Selected:', args.item.text);
}
```

**Full Example - Complete Event Handling:**
```typescript
onSelect(args: MenuEventArgs): void {
  // Item information
  const itemText = args.item.text;
  const itemId = args.item.id;
  const itemElement = args.element;

  // Event information
  const eventType = args.event.type;  // e.g., 'click'
  const timestamp = (args.event as any).timeStamp;

  // Element information
  const classes = itemElement.classList;
  const html = itemElement.innerHTML;
  
  // Event target (the element that triggered the menu)
  const targetElement = args.event.target as HTMLElement;

  console.log({
    itemText,
    itemId,
    eventType,
    timestamp,
    classes: Array.from(classes),
    targetElementId: targetElement.id
  });
}
```

### Event: beforeOpen

**Triggers:** Before opening the menu item.

**Signature:** `(beforeOpen)='onBeforeOpen($event)'`

**Event Arguments - BeforeOpenCloseMenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'beforeOpen'`. |
| `event` | `Event` | Original browser event object (contextmenu or mousedown event) that triggered the menu opening. |

**BeforeOpenCloseMenuEventArgs Interface (Complete):**
```typescript
interface BeforeOpenCloseMenuEventArgs {
  name: string;                    // 'beforeOpen' | 'beforeClose'
  event: Event;                    // Browser event that triggered opening/closing
  // Additional properties may be available depending on Syncfusion version
}
```

**Brief Example:**
```typescript
onBeforeOpen(args: BeforeOpenCloseMenuEventArgs) {
  console.log('Menu about to open');
}
```

**Full Example - Dynamic Menu Modification:**
```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-before-open',
  template: `
    <div id="target">Right click here</div>
    <ejs-contextmenu 
      #cm
      target='#target'
      [items]='menuItems'
      (beforeOpen)='onBeforeOpen($event)'>
    </ejs-contextmenu>
  `
})
export class BeforeOpenComponent {
  @ViewChild('cm') contextMenu!: ContextMenuComponent;
  
  menuItems: MenuItemModel[] = [
    { text: 'Edit', id: 'edit' },
    { text: 'Delete', id: 'delete' },
    { text: 'Admin Only', id: 'admin' }
  ];
  
  isAdmin = false;
  
  onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    console.log('Event name:', args.name);  // 'beforeOpen'
    
    // Access target element
    const targetElement = args.event.target as HTMLElement;
    console.log('Menu opening on element:', targetElement.id);
    
    // Dynamically show/hide items based on context
    if (this.isAdmin) {
      this.contextMenu.showItems(['admin'], true);
    } else {
      this.contextMenu.hideItems(['admin'], true);
    }
  }
}
```

**Use Case - Context-Aware Menu:**
```typescript
onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
  const targetElement = args.event.target as HTMLElement;
  
  // Show different menu items based on target element
  if (targetElement.classList.contains('protected')) {
    this.contextMenu.hideItems(['Delete', 'Edit'], true);
  } else {
    this.contextMenu.showItems(['Delete', 'Edit'], true);
  }
}
```

### Event: beforeClose

**Triggers:** Before closing the menu.

**Signature:** `(beforeClose)='onBeforeClose($event)'`

**Event Arguments - BeforeOpenCloseMenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'beforeClose'`. |
| `event` | `Event` | Browser event that triggered the closing. |

**Brief Example:**
```typescript
onBeforeClose(args: BeforeOpenCloseMenuEventArgs) {
  console.log('Menu about to close');
}
```

**Full Example - State Cleanup:**
```typescript
onBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
  console.log('Cleaning up before menu closes');
  
  // Save menu state
  this.previousMenuState = 'closed';
  
  // Reset highlight
  this.highlightedItem = null;
}
```

### Event: onOpen

**Triggers:** While opening the menu item (after menu is displayed).

**Signature:** `(onOpen)='onOpen($event)'`

**Event Arguments - OpenCloseMenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'onOpen'`. |
| `event` | `Event` | Browser event that triggered the opening. |

**OpenCloseMenuEventArgs Interface (Complete):**
```typescript
interface OpenCloseMenuEventArgs {
  name: string;                    // 'onOpen' | 'onClose'
  event: Event;                    // Browser event
  // Additional properties may be available depending on Syncfusion version
}
```

**Brief Example:**
```typescript
onOpen(args: OpenCloseMenuEventArgs) {
  console.log('Menu opened:', args.name);
}
```

**Full Example - Menu State Tracking:**
```typescript
@Component({
  selector: 'app-menu-state',
  template: `
    <div>Menu Status: {{ menuStatus }}</div>
    <div id="target">Right click here</div>
    <ejs-contextmenu 
      target='#target'
      [items]='items'
      (onOpen)='onOpen($event)'
      (onClose)='onClose($event)'>
    </ejs-contextmenu>
  `
})
export class MenuStateComponent {
  menuStatus = 'Closed';
  items: MenuItemModel[] = [{ text: 'Item 1' }];
  
  onOpen(args: OpenCloseMenuEventArgs) {
    this.menuStatus = 'Open - Event: ' + args.name;
    console.log('Menu displayed at:', new Date().toLocaleTimeString());
  }
  
  onClose(args: OpenCloseMenuEventArgs) {
    this.menuStatus = 'Closed - Event: ' + args.name;
  }
}
```

### Event: onClose

**Triggers:** While closing the menu (after menu is hidden).

**Signature:** `(onClose)='onClose($event)'`

**Event Arguments - OpenCloseMenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'onClose'`. |
| `event` | `Event` | Browser event that triggered the closing. |

**Brief Example:**
```typescript
onClose(args: OpenCloseMenuEventArgs) {
  console.log('Menu closed:', args.name);
}
```

### Event: beforeItemRender

**Triggers:** While rendering each menu item (before each item is displayed).

**Signature:** `(beforeItemRender)='onBeforeItemRender($event)'`

**Event Arguments - MenuEventArgs:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Specifies name of the event. Value: `'beforeItemRender'`. |
| `event` | `Event` | Browser event associated with rendering. |
| `item` | `MenuItemModel` | The menu item being rendered. |
| `element` | `HTMLElement` | The DOM element of the item being rendered. |

**Brief Example:**
```typescript
onBeforeItemRender(args: MenuEventArgs) {
  console.log('Rendering item:', args.item.text);
}
```

**Full Example - Item Customization:**
```typescript
onBeforeItemRender(args: MenuEventArgs): void {
  // Customize based on item properties
  if (args.item.disabled) {
    args.element.classList.add('disabled-item');
    args.element.style.opacity = '0.5';
  }

  // Add custom styling to specific items
  if (args.item.text === 'Delete') {
    args.element.classList.add('danger-item');
    args.element.style.color = 'red';
  }

  // Highlight admin items
  if ((args.item as any).role === 'admin') {
    args.element.classList.add('admin-badge');
    args.element.setAttribute('data-admin', 'true');
  }
}
```

**Use Case - Dynamic Content Rendering:**
```typescript
onBeforeItemRender(args: MenuEventArgs): void {
  // Add keyboard shortcut hints
  const shortcuts = {
    'Cut': '(Ctrl+X)',
    'Copy': '(Ctrl+C)',
    'Paste': '(Ctrl+V)',
    'Undo': '(Ctrl+Z)',
    'Redo': '(Ctrl+Y)'
  };

  if (shortcuts[args.item.text!]) {
    const shortcut = shortcuts[args.item.text!];
    args.element.innerHTML += `<span style="float: right; color: gray; font-size: 0.9em;">${shortcut}</span>`;
  }
}
```

### Event: created

**Triggers:** Once the component rendering is completed (after initialization).

**Signature:** `(created)='onCreated()'` or `(created)='onCreated($event)'`

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| - | `Event` | Standard JavaScript Event object. |

**Brief Example:**
```typescript
onCreated() {
  console.log('ContextMenu component created and ready');
}
```

**Full Example - Component Initialization:**
```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { ContextMenuComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-created-event',
  template: `
    <div>Status: {{ componentStatus }}</div>
    <div id="target">Right click here</div>
    <ejs-contextmenu 
      #cm
      target='#target'
      [items]='items'
      (created)='onCreated()'>
    </ejs-contextmenu>
  `
})
export class CreatedEventComponent implements OnInit {
  @ViewChild('cm') contextMenu!: ContextMenuComponent;
  
  items: MenuItemModel[] = [{ text: 'Item 1' }];
  componentStatus = 'Initializing...';
  
  ngOnInit() {
    // Note: created event fires during initialization
  }
  
  onCreated() {
    this.componentStatus = 'Ready';
    console.log('Component fully initialized');
    
    // Now safe to access component methods
    console.log('Total items:', this.contextMenu.items?.length);
  }
}
```

## Event Differences: before* vs on* Events

Understanding the timing of different events:

| Event | Timing | Purpose | Can Prevent |
|-------|--------|---------|-------------|
| `beforeOpen` | Before menu appears | Prepare menu, modify items | Yes (in some cases) |
| `onOpen` | After menu is visible | React to menu opening | No |
| `beforeClose` | Before menu disappears | Save state, cleanup | Yes (in some cases) |
| `onClose` | After menu is hidden | React to menu closing | No |
| `select` | When item clicked | Handle selection | Depends on item action |
| `beforeItemRender` | Before each item renders | Customize appearance | No |
| `created` | After component initialized | Setup component | No |

**Visual Timeline:**
```
Right-click occurs
       ↓
   beforeOpen  ← Can modify menu here
       ↓
    [Menu displays]
       ↓
     onOpen    ← React to visible menu
       ↓
  User clicks item
       ↓
   select      ← Handle selection
       ↓
   beforeClose ← Cleanup before closing
       ↓
    [Menu hides]
       ↓
    onClose    ← React to hidden menu
```

## MenuEventArgs Complete Reference

The `MenuEventArgs` object provides comprehensive event information when items are selected or rendered:

```typescript
interface MenuEventArgs {
  name: string;                    // Event name ('select' or 'beforeItemRender')
  event: Event;                    // Browser event (click, render, etc.)
  item: MenuItemModel;             // Menu item involved in the event
  {
    text?: string;                 // Item display text
    id?: string;                   // Item unique id
    items?: MenuItemModel[];        // Sub-items
    iconCss?: string;              // Icon CSS class
    url?: string;                  // Navigation URL
    separator?: boolean;           // Is separator
    htmlAttributes?: Record<string, any>;  // Custom HTML attributes
    [key: string]: any;            // Other properties
  }
  element: HTMLElement;            // DOM element of the item
  {
    textContent: string;           // Element text
    innerHTML: string;             // Element HTML
    classList: DOMTokenList;       // CSS classes
    getAttribute(name: string): string; // Get attributes
    setAttribute(name: string, value: string): void; // Set attributes
    // ... other HTMLElement methods
  }
}
```

### Practical Usage Examples

```typescript
onSelect(args: MenuEventArgs): void {
  // Item information
  const itemText = args.item.text;
  const itemId = args.item.id;
  const itemElement = args.element;

  // Event information
  const eventType = args.event.type;  // e.g., 'click'
  const timestamp = (args.event as any).timeStamp;

  // Element information
  const classes = itemElement.classList;
  const html = itemElement.innerHTML;
  
  // Event target (the element that triggered the menu)
  const targetElement = args.event.target as HTMLElement;

  console.log({
    itemText,
    itemId,
    eventType,
    timestamp,
    classes: Array.from(classes),
    targetElementId: targetElement.id
  });
}
```

### BeforeOpenCloseMenuEventArgs Complete Reference

The `BeforeOpenCloseMenuEventArgs` object is used for `beforeOpen` and `beforeClose` events:

```typescript
interface BeforeOpenCloseMenuEventArgs {
  name: string;                    // 'beforeOpen' or 'beforeClose'
  event: Event;                    // Browser event that triggered the action
  {
    type: string;                  // Event type ('contextmenu', 'mousedown', etc.)
    target: HTMLElement;           // Element that triggered the event
    preventDefault(): void;        // Can prevent default behavior
    stopPropagation(): void;       // Can stop event bubbling
  }
}
```

### OpenCloseMenuEventArgs Complete Reference

The `OpenCloseMenuEventArgs` object is used for `onOpen` and `onClose` events:

```typescript
interface OpenCloseMenuEventArgs {
  name: string;                    // 'onOpen' or 'onClose'
  event: Event;                    // Browser event
}
```

## Complete Example: Interactive Menu with Events

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      
      <div style="margin-top: 20px;">
        <p>Last Action: {{ lastAction }}</p>
        <p>Menu State: {{ menuState }}</p>
      </div>
      
      <ejs-contextmenu 
        #contextmenu
        target='#target' 
        [items]='menuItems'
        (created)='onCreated()'
        (beforeOpen)='onBeforeOpen($event)'
        (select)='onSelect($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'New', iconCss: 'e-icons e-new' },
    { text: 'Open', iconCss: 'e-icons e-open' },
    { separator: true },
    { text: 'Save', iconCss: 'e-icons e-save' },
    { text: 'Save As...' }
  ];

  public lastAction = 'None';
  public menuState = 'Closed';

  onCreated(): void {
    console.log('ContextMenu initialized');
    this.lastAction = 'Component Created';
  }

  onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    this.menuState = 'Opening...';
    console.log('Menu opening');
  }

  onSelect(args: MenuEventArgs): void {
    this.lastAction = `Selected: ${args.item.text}`;
    this.menuState = 'Closed';
    
    console.log(`User clicked: ${args.item.text}`);
    
    // Execute action based on selection
    this.executeAction(args.item.text);
  }

  private executeAction(itemText?: string): void {
    switch (itemText) {
      case 'New':
        console.log('Creating new file');
        break;
      case 'Open':
        console.log('Opening file');
        break;
      case 'Save':
        console.log('Saving file');
        break;
      case 'Save As...':
        console.log('Saving file with new name');
        break;
    }
  }
}
```

---

**Next:** Customize menu appearance, animations, and styling in [references/styling-and-customization.md](../styling-and-customization.md).
