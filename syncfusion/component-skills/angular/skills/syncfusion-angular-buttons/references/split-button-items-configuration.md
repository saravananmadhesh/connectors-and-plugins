# Button Items Configuration

## Table of Contents
- [ItemModel Interface](#itemmodel-interface)
- [Basic Item Configuration](#basic-item-configuration)
- [Icons in Items](#icons-in-items)
- [Separators](#separators)
- [URL Navigation](#url-navigation)
- [Disable Items](#disable-items)
- [Dynamic Item Management](#dynamic-item-management)
- [Item Click Handling](#item-click-handling)
- [Advanced Patterns](#advanced-patterns)

## ItemModel Interface

The `ItemModel` interface defines the structure for SplitButton dropdown items. The following are the **only officially supported properties** per the Syncfusion API documentation:

```typescript
interface ItemModel {
  text?: string;        // Display text for the item
  id?: string;          // Unique identifier for item
  iconCss?: string;     // CSS class for item icon
  url?: string;         // URL to navigate (internal or external)
  separator?: boolean;  // Display as separator line
  disabled?: boolean;   // Disable/enable item
}
```

> **⚠️ Note:** The properties `title`, `cssClass`, `htmlAttributes`, and `target` are **not part of the official `ItemModel` interface** and should not be used. For URL items, the link behaviour (new tab vs. same tab) is controlled by the `url` value itself or handled in the `(select)` event handler.

## Basic Item Configuration

### Text-Only Items

Simplest item configuration with just text:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

```html
<ejs-splitbutton 
  content="Edit"
  [items]="items">
</ejs-splitbutton>
```

**Result:** Three menu items with text labels only.

### Items with IDs

Add unique identifiers for tracking and dynamic updates:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'cut', text: 'Cut' },
    { id: 'copy', text: 'Copy' },
    { id: 'paste', text: 'Paste' }
  ];
  
  onItemSelect(args: any): void {
    console.log('Selected item ID:', args.item.id);
    // Route based on ID
    switch (args.item.id) {
      case 'cut':
        this.executeCut();
        break;
      case 'copy':
        this.executeCopy();
        break;
      case 'paste':
        this.executePaste();
        break;
    }
  }
  
  private executeCut(): void {
    console.log('Cut operation');
  }
  
  private executeCopy(): void {
    console.log('Copy operation');
  }
  
  private executePaste(): void {
    console.log('Paste operation');
  }
}
```

### Items with IDs for Identification

Use the `id` property to uniquely identify items for action dispatch:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'save-as', text: 'Save As' },
    { id: 'export', text: 'Export' }
  ];
  
  onItemSelect(args: any): void {
    // Dispatch based on id
    console.log('Selected:', args.item.id);
  }
}
```

## Icons in Items

### Using Material Design Icons

Material Design icons are built into Syncfusion components:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' }
  ];
}
```

**Common Material Icons:**
- `e-icons e-cut` - Cut icon
- `e-icons e-copy` - Copy icon
- `e-icons e-paste` - Paste icon
- `e-icons e-save` - Save icon
- `e-icons e-delete` - Delete icon
- `e-icons e-print` - Print icon
- `e-icons e-export` - Export icon
- `e-icons e-download` - Download icon

### Using Font Awesome Icons

To use Font Awesome icons, include Font Awesome CSS:

```html
<!-- In index.html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save', iconCss: 'fas fa-save' },
    { text: 'Delete', iconCss: 'fas fa-trash' },
    { text: 'Download', iconCss: 'fas fa-download' },
    { text: 'Refresh', iconCss: 'fas fa-refresh' }
  ];
}
```

### Using Bootstrap Icons

Include Bootstrap Icons CSS:

```html
<!-- In index.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
```

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Settings', iconCss: 'bi bi-gear' },
    { text: 'Profile', iconCss: 'bi bi-person-circle' },
    { text: 'Logout', iconCss: 'bi bi-box-arrow-right' }
  ];
}
```

### Icon and Text Positioning

Combine icons with text for visual hierarchy:

```typescript
export class AppComponent {
  public fileActions: ItemModel[] = [
    { text: 'New Document', iconCss: 'e-icons e-file' },
    { text: 'Open File', iconCss: 'e-icons e-folder-open' },
    { text: 'Recent Files', iconCss: 'e-icons e-clock' }
  ];
}
```

```html
<ejs-splitbutton 
  content="File"
  iconCss="e-icons e-file"
  [items]="fileActions">
</ejs-splitbutton>
```

**Result:** Primary button and all items have icons on the left with text on right.

## Separators

### Simple Separators

Add visual separation between item groups:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { separator: true },
    { text: 'Save' },
    { text: 'Save As' },
    { separator: true },
    { text: 'Exit' }
  ];
}
```

**Result:** Three groups separated by horizontal lines.

### Separators with Icons

Group related icon items with separators:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    { text: 'Select All', iconCss: 'e-icons e-select-all' },
    { text: 'Find', iconCss: 'e-icons e-search' }
  ];
}
```

## URL Navigation

### Internal Navigation

Navigate to app routes using the `url` property. Handle the `(select)` event to perform programmatic navigation:

```typescript
export class AppComponent {
  constructor(private router: Router) {}
  
  public navigationItems: ItemModel[] = [
    { id: 'home',     text: 'Home',     url: '/' },
    { id: 'about',    text: 'About',    url: '/about' },
    { id: 'services', text: 'Services', url: '/services' },
    { id: 'contact',  text: 'Contact',  url: '/contact' }
  ];
  
  onItemSelect(args: any): void {
    if (args.item.url) {
      this.router.navigateByUrl(args.item.url);
    }
  }
}
```

```html
<ejs-splitbutton 
  content="Navigate"
  [items]="navigationItems"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

### External Links

To open external URLs in a new tab, handle the `(select)` event and call `window.open()`:

```typescript
export class AppComponent {
  public externalLinks: ItemModel[] = [
    { id: 'github',   text: 'GitHub',        url: 'https://github.com' },
    { id: 'so',       text: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { id: 'mdn',      text: 'MDN Docs',       url: 'https://developer.mozilla.org' }
  ];
  
  onItemSelect(args: any): void {
    if (args.item.url) {
      window.open(args.item.url, '_blank');
    }
  }
}
```

### Mixed Navigation

Combine internal and external navigation:

```typescript
export class AppComponent {
  constructor(private router: Router) {}
  
  public mixedItems: ItemModel[] = [
    { id: 'dashboard', text: 'Dashboard', url: '/dashboard', iconCss: 'e-icons e-dashboard' },
    { id: 'settings',  text: 'Settings',  url: '/settings',  iconCss: 'e-icons e-settings' },
    { separator: true },
    { id: 'docs',    text: 'Documentation', url: 'https://docs.example.com', iconCss: 'e-icons e-book' },
    { id: 'support', text: 'Support',       url: 'https://support.example.com', iconCss: 'e-icons e-help' }
  ];
  
  // Determine if URL is external
  private isExternal(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }
  
  onItemSelect(args: any): void {
    const url: string = args.item.url;
    if (!url) return;
    if (this.isExternal(url)) {
      window.open(url, '_blank');
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
```

### Custom Navigation Handler

Handle navigation programmatically:

```typescript
export class AppComponent {
  constructor(private router: Router) {}
  
  public items: ItemModel[] = [
    { id: 'dashboard', text: 'Dashboard' },
    { id: 'profile', text: 'Profile' },
    { id: 'settings', text: 'Settings' }
  ];
  
  onItemSelect(args: any): void {
    const itemId = args.item.id;
    
    switch (itemId) {
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
    }
  }
}
```

## Disable Items

### Static Disable

Disable items at creation:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save', disabled: false },
    { text: 'Save As', disabled: false },
    { separator: true },
    { text: 'Delete', disabled: true }  // Always disabled
  ];
}
```

### Dynamic Disable/Enable

Enable/disable based on application state:

```typescript
export class AppComponent {
  isEditable: boolean = false;
  
  public items: ItemModel[] = [
    { text: 'Edit', disabled: true },
    { text: 'Delete', disabled: true },
    { text: 'Archive', disabled: false }
  ];
  
  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
    this.items[0].disabled = !this.isEditable;  // Edit
    this.items[1].disabled = !this.isEditable;  // Delete
  }
  
  onItemSelect(args: any): void {
    if (args.item.disabled) {
      console.log('Item is disabled');
      return;
    }
    console.log('Executing:', args.item.text);
  }
}
```

### Conditional Enable Based on Selection

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  selectedItems: any[] = [];
  
  public items: ItemModel[] = [
    { id: 'edit', text: 'Edit', disabled: true },
    { id: 'duplicate', text: 'Duplicate', disabled: true },
    { id: 'delete', text: 'Delete', disabled: true }
  ];
  
  onSelectionChange(selectedIds: string[]): void {
    this.selectedItems = selectedIds;
    
    // Enable/disable based on selection count
    if (selectedIds.length === 1) {
      this.items[0].disabled = false;  // Edit
      this.items[1].disabled = false;  // Duplicate
      this.items[2].disabled = false;  // Delete
    } else if (selectedIds.length > 1) {
      this.items[0].disabled = true;   // Edit (only for single)
      this.items[1].disabled = true;   // Duplicate (only for single)
      this.items[2].disabled = false;  // Delete
    } else {
      this.items[0].disabled = true;
      this.items[1].disabled = true;
      this.items[2].disabled = true;
    }
  }
}
```

## Dynamic Item Management

### Add New Items

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Item 1' },
    { text: 'Item 2' }
  ];
  
  addItem(): void {
    const newItem: ItemModel = {
      text: `Item ${this.items.length + 1}`
    };
    this.items.push(newItem);
  }
  
  addItemWithIcon(): void {
    const newItem: ItemModel = {
      text: 'New Item',
      iconCss: 'e-icons e-plus'
    };
    this.items.push(newItem);
  }
}
```

```html
<ejs-splitbutton 
  #splitBtn
  content="Actions"
  [items]="items">
</ejs-splitbutton>

<button (click)="addItem()">Add Item</button>
<button (click)="addItemWithIcon()">Add Item with Icon</button>
```

### Remove Items

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' }
  ];
  
  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
  
  removeItemById(id: string): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  
  clearAllItems(): void {
    this.items = [];
  }
}
```

### Update Item Properties

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save Draft', disabled: false },
    { text: 'Publish', disabled: false }
  ];
  
  updateItemText(index: number, newText: string): void {
    if (index < this.items.length) {
      this.items[index].text = newText;
    }
  }
  
  toggleItemDisabled(index: number): void {
    if (index < this.items.length) {
      this.items[index].disabled = !this.items[index].disabled;
    }
  }
}
```

## Item Click Handling

### Basic Item Selection

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'save', text: 'Save' },
    { id: 'export', text: 'Export' },
    { id: 'print', text: 'Print' }
  ];
  
  onItemSelect(args: any): void {
    const itemId = args.item.id;
    const itemText = args.item.text;
    
    console.log(`Item selected: ${itemText} (${itemId})`);
  }
}
```

```html
<ejs-splitbutton 
  content="Options"
  [items]="items"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

### Item Selection with Routing

```typescript
export class AppComponent {
  constructor(private router: Router) {}
  
  public items: ItemModel[] = [
    { id: 'users', text: 'Users', url: '/admin/users' },
    { id: 'roles', text: 'Roles', url: '/admin/roles' },
    { id: 'permissions', text: 'Permissions', url: '/admin/permissions' }
  ];
  
  onItemSelect(args: any): void {
    const url = args.item.url;
    if (url) {
      this.router.navigateByUrl(url);
    }
  }
}
```

### Item Selection with Custom Logic

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { id: 'email', text: 'Send Email' },
    { id: 'sms', text: 'Send SMS' },
    { id: 'notification', text: 'In-App Notification' }
  ];
  
  onNotificationMethod(args: any): void {
    const method = args.item.id;
    
    switch (method) {
      case 'email':
        this.sendEmail();
        break;
      case 'sms':
        this.sendSMS();
        break;
      case 'notification':
        this.showNotification();
        break;
    }
  }
  
  private sendEmail(): void {
    console.log('Sending email...');
  }
  
  private sendSMS(): void {
    console.log('Sending SMS...');
  }
  
  private showNotification(): void {
    console.log('Showing notification...');
  }
}
```

## Advanced Patterns

### Grouped Items with Sections

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    // File operations
    { text: 'New', iconCss: 'e-icons e-file' },
    { text: 'Open', iconCss: 'e-icons e-folder-open' },
    { text: 'Save', iconCss: 'e-icons e-save' },
    { separator: true },
    
    // Edit operations
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    
    // Utility
    { text: 'Exit', iconCss: 'e-icons e-exit' }
  ];
}
```

### Items from API Call

```typescript
export class AppComponent implements OnInit {
  public items: ItemModel[] = [];
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadItemsFromAPI();
  }
  
  private loadItemsFromAPI(): void {
    this.http.get<ItemModel[]>('/api/splitbutton-items')
      .subscribe(
        (data) => {
          this.items = data;
        },
        (error) => {
          console.error('Error loading items:', error);
        }
      );
  }
}
```

### Context-Based Item Configuration

```typescript
export class AppComponent {
  userRole: 'admin' | 'editor' | 'viewer' = 'viewer';
  
  get items(): ItemModel[] {
    switch (this.userRole) {
      case 'admin':
        return [
          { text: 'Edit', disabled: false },
          { text: 'Delete', disabled: false },
          { text: 'Archive', disabled: false }
        ];
      case 'editor':
        return [
          { text: 'Edit', disabled: false },
          { text: 'Delete', disabled: true },
          { text: 'Archive', disabled: true }
        ];
      case 'viewer':
      default:
        return [
          { text: 'Edit', disabled: true },
          { text: 'Delete', disabled: true },
          { text: 'Archive', disabled: true }
        ];
    }
  }
}
```

```html
<ejs-splitbutton 
  content="Actions"
  [items]="items">
</ejs-splitbutton>

<div style="margin-top: 20px;">
  <button (click)="userRole = 'admin'">Switch to Admin</button>
  <button (click)="userRole = 'editor'">Switch to Editor</button>
  <button (click)="userRole = 'viewer'">Switch to Viewer</button>
</div>
```

Your button items are now properly configured! Explore [events-and-methods.md](events-and-methods.md) to handle item interactions.
