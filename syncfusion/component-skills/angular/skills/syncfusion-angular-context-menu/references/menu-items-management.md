# Menu Items Management

## Table of Contents
- [Adding Menu Items Dynamically](#adding-menu-items-dynamically)
- [Removing Menu Items](#removing-menu-items)
- [Enabling and Disabling Items](#enabling-and-disabling-items)
- [Showing and Hiding Items](#showing-and-hiding-items)
- [Dynamic Context-Aware Menus](#dynamic-context-aware-menus)
- [Multi-Level Nested Menus](#multi-level-nested-menus)

## Adding Menu Items Dynamically

### insertAfter() Method

Add new menu items after a specified target item:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        #contextmenu 
        target='#target' 
        [items]='menuItems' 
        (created)='onCreated()'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'View' },
    { text: 'Refresh' },
    { text: 'New' }
  ];

  onCreated(): void {
    // Insert 'Sort By' after 'Refresh'
    (this.contextmenu as ContextMenuComponent).insertAfter(
      [{ text: 'Sort By' }], 
      'Refresh'
    );
  }
}
```

### insertBefore() Method

Add new menu items before a specified target item:

```typescript
onCreated(): void {
  // Insert 'Display Settings' before 'Personalize'
  (this.contextmenu as ContextMenuComponent).insertBefore(
    [{ text: 'Display Settings' }], 
    'Personalize'
  );
}
```

### Multiple Items Insertion

Insert multiple items at once:

```typescript
onCreated(): void {
  const newItems: MenuItemModel[] = [
    { text: 'Sort By Name' },
    { text: 'Sort By Date' },
    { text: 'Sort By Size' }
  ];

  (this.contextmenu as ContextMenuComponent).insertAfter(
    newItems, 
    'Refresh'
  );
}
```

## Removing Menu Items

### removeItems() Method

Remove specified items from the context menu:

```typescript
onCreated(): void {
  // Remove single item by text
  (this.contextmenu as ContextMenuComponent).removeItems(['Paste']);
}
```

### Remove Multiple Items

```typescript
onCreated(): void {
  const itemsToRemove = ['Cut', 'Copy', 'Paste'];
  (this.contextmenu as ContextMenuComponent).removeItems(itemsToRemove);
}
```

### Remove Based on Condition

```typescript
removeUnauthorizedItems(userRole: string): void {
  if (userRole === 'viewer') {
    (this.contextmenu as ContextMenuComponent).removeItems([
      'Delete', 
      'Edit', 
      'Rename'
    ]);
  }
}
```

## Enabling and Disabling Items

### enableItems() Method

Control item availability based on application state:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        #contextmenu 
        target='#target' 
        [items]='menuItems' 
        (created)='onCreated()'
        (beforeOpen)='beforeOpen()'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    {
      text: 'View',
      items: [
        { text: 'Large icons' },
        { text: 'Medium icons' },
        { text: 'Small icons' }
      ]
    },
    { text: 'Refresh' },
    { separator: true },
    { text: 'New' }
  ];

  onCreated(): void {
    // Disable parent item 'View'
    (this.contextmenu as ContextMenuComponent).enableItems(
      ['View'], 
      false
    );
  }

  beforeOpen(): void {
    // Disable sub-item 'Medium icons' on menu open
    (this.contextmenu as ContextMenuComponent).enableItems(
      ['Medium icons'], 
      false
    );
  }
}
```

### Re-enable Disabled Items

```typescript
// Enable previously disabled items
(this.contextmenu as ContextMenuComponent).enableItems(
  ['Edit', 'Delete'], 
  true  // enable = true
);
```

### Conditional Item State

```typescript
updateItemState(canEdit: boolean): void {
  (this.contextmenu as ContextMenuComponent).enableItems(
    ['Edit', 'Cut', 'Delete'],
    canEdit
  );
}
```

## Showing and Hiding Items

### hideItems() Method

Hide menu items dynamically without removing them:

```typescript
beforeOpen(args: BeforeOpenCloseMenuEventArgs) {
  // Hide specific items
  (this.contextmenu as ContextMenuComponent).hideItems([
    'Cut', 
    'Copy', 
    'Paste'
  ]);
}
```

### showItems() Method

Display previously hidden items:

```typescript
beforeOpen(args: BeforeOpenCloseMenuEventArgs) {
  // Show specific items
  (this.contextmenu as ContextMenuComponent).showItems([
    'Save', 
    'Export'
  ]);
}
```

## Dynamic Context-Aware Menus

### Show Different Menus Based on Target

Display different menu items depending on which element was right-clicked:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">
        <div id='clipboard' class='e-div'>Clipboard Area</div>
        <div id='editor' class='e-div'>Editor Area</div>
      </div>
      <ejs-contextmenu 
        #contextmenu 
        target='#target .e-div' 
        [items]='menuItems' 
        (beforeOpen)='beforeOpen($event)'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    .e-div { 
      padding: 20px; 
      border: 1px solid #ccc; 
      margin: 10px; 
      height: 100px;
    }
  `]
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' },
    { text: 'Add' },
    { text: 'Edit' },
    { text: 'Delete' }
  ];

  beforeOpen(args: BeforeOpenCloseMenuEventArgs) {
    const targetId = (args.event.target as HTMLElement).id;
    
    if (targetId === 'clipboard') {
      // Show clipboard operations
      (this.contextmenu as ContextMenuComponent).showItems([
        'Cut', 
        'Copy', 
        'Paste'
      ]);
      (this.contextmenu as ContextMenuComponent).hideItems([
        'Add', 
        'Edit', 
        'Delete'
      ]);
    } else if (targetId === 'editor') {
      // Show editor operations
      (this.contextmenu as ContextMenuComponent).showItems([
        'Add', 
        'Edit', 
        'Delete'
      ]);
      (this.contextmenu as ContextMenuComponent).hideItems([
        'Cut', 
        'Copy', 
        'Paste'
      ]);
    }
  }
}
```

### Role-Based Menu Items

```typescript
beforeOpen(args: BeforeOpenCloseMenuEventArgs) {
  const userRole = this.getUserRole();
  
  if (userRole === 'admin') {
    (this.contextmenu as ContextMenuComponent).showItems([
      'Delete', 
      'Export', 
      'Manage Users'
    ]);
  } else if (userRole === 'editor') {
    (this.contextmenu as ContextMenuComponent).showItems([
      'Edit', 
      'Copy'
    ]);
    (this.contextmenu as ContextMenuComponent).hideItems(['Delete']);
  } else {
    (this.contextmenu as ContextMenuComponent).hideItems([
      'Delete', 
      'Edit', 
      'Export'
    ]);
  }
}

private getUserRole(): string {
  // Fetch user role from service
  return 'editor';
}
```

## Multi-Level Nested Menus

### Creating Nested Structure

Define menu items with multiple nesting levels:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      {
        text: 'New',
        items: [
          { text: 'Document' },
          { text: 'Project' }
        ]
      },
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

### Managing Nested Items

Access and manipulate items at any level:

```typescript
// Get reference to nested items
const viewItems = this.menuItems.find(m => m.text === 'View')?.items;

// Add nested item
this.contextmenu.insertAfter(
  [{ text: 'Compact View' }], 
  'Large Icons'
);
```

### Dynamic Nested Menus

```typescript
addDynamicSubmenu(parentItem: string, newSubItem: MenuItemModel): void {
  const parent = this.menuItems.find(m => m.text === parentItem);
  
  if (parent) {
    if (!parent.items) {
      parent.items = [];
    }
    parent.items.push(newSubItem);
  }
}
```

### Example: Nested Submenu Filtering

```typescript
beforeOpen(args: BeforeOpenCloseMenuEventArgs) {
  // Disable certain sub-items based on conditions
  if (this.isReadOnly) {
    (this.contextmenu as ContextMenuComponent).enableItems(
      ['Delete', 'Edit'], 
      false
    );
  }
}
```

## Complete Example: Advanced Menu Management

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <button (click)="addItem()">Add Item</button>
      <button (click)="removeItem()">Remove Item</button>
      <button (click)="toggleItemState()">Toggle State</button>
      
      <div id="target">Right click / Touch hold</div>
      
      <ejs-contextmenu 
        #contextmenu 
        target='#target' 
        [items]='menuItems' 
        (created)='onCreated()'
        (beforeOpen)='beforeOpen($event)'
        (select)='onSelect($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { separator: true },
    { text: 'Edit' },
    { text: 'Delete' }
  ];

  private isDeleteEnabled = true;

  onCreated(): void {
    console.log('Context menu created');
  }

  beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    // Dynamic state management
    if (!this.isDeleteEnabled) {
      (this.contextmenu as ContextMenuComponent).enableItems(['Delete'], false);
    }
  }

  addItem(): void {
    (this.contextmenu as ContextMenuComponent).insertAfter(
      [{ text: 'Print' }], 
      'Open'
    );
  }

  removeItem(): void {
    (this.contextmenu as ContextMenuComponent).removeItems(['Print']);
  }

  toggleItemState(): void {
    this.isDeleteEnabled = !this.isDeleteEnabled;
    (this.contextmenu as ContextMenuComponent).enableItems(
      ['Delete'], 
      this.isDeleteEnabled
    );
  }

  onSelect(args: MenuEventArgs): void {
    console.log('Selected:', args.item.text);
  }
}
```

---

**Next:** Learn how to bind menu items from data sources in [references/data-binding.md](../data-binding.md).
