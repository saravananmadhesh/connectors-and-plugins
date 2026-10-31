# Complete API Reference for Angular Breadcrumb

## Table of Contents
- [Component Properties](#component-properties)
- [Item Model Properties](#item-model-properties)
- [Component Methods](#component-methods)
- [Component Events](#component-events)
- [Event Arguments](#event-arguments)
- [Usage Examples](#usage-examples)

---

## Component Properties

The Breadcrumb component supports the following properties for configuration and control:

### activeItem

**Type:** `string`  
**Default:** `''`

Specifies the URL of the active/current breadcrumb item. This property determines which item is marked as the active item in the breadcrumb trail.

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb [activeItem]="currentUrl">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
      <e-breadcrumb-item text="Electronics" url="/products/electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`
})
export class AppComponent {
  currentUrl: string = '/products/electronics';
}
```

### cssClass

**Type:** `string`  
**Default:** `''`

Defines one or more CSS classes separated by spaces to be applied to the breadcrumb component for custom styling and theming.

```ts
<ejs-breadcrumb cssClass="custom-breadcrumb dark-theme">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

Associated CSS:

```css
.custom-breadcrumb {
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 4px;
}

.custom-breadcrumb.dark-theme {
  background-color: #2d2d2d;
  color: #ffffff;
}
```

### disabled

**Type:** `boolean`  
**Default:** `false`

Enable or disable the entire breadcrumb component. When set to `true`, the breadcrumb becomes non-interactive and visually disabled.

```ts
<ejs-breadcrumb [disabled]="isDisabled">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

CSS for disabled state styling:

```css
.e-breadcrumb.e-disabled {
  opacity: 0.6;
  pointer-events: none;
  color: #999;
}
```

### enableActiveItemNavigation

**Type:** `boolean`  
**Default:** `false`

Enable or disable navigation for the active (last) breadcrumb item. When `true`, clicking the active item will trigger navigation to its URL.

```ts
<ejs-breadcrumb [enableActiveItemNavigation]="true">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
    <e-breadcrumb-item text="Current" url="/products/current"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

When enabled, clicking "Current" (the active item) navigates to `/products/current`.

### enableNavigation

**Type:** `boolean`  
**Default:** `true`

Enable or disable click-based navigation for all breadcrumb items. When `false`, breadcrumb items are displayed but don't navigate.

```ts
// Navigation disabled - breadcrumb is display-only
<ejs-breadcrumb [enableNavigation]="false">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>

// Navigation enabled - items are clickable
<ejs-breadcrumb [enableNavigation]="true">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting component state (like active item and scroll position) between page reloads using browser storage.

```ts
import { Component } from '@angular/core';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb [enablePersistence]="true" id="breadcrumb">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Settings" url="/settings"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`
})
export class AppComponent {}
```

When enabled with `id="breadcrumb"`, the component saves state to localStorage as `breadcrumb-state` and restores it on page reload.

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enable or disable right-to-left (RTL) layout rendering. Useful for languages like Arabic, Hebrew, and Urdu.

```ts
// RTL breadcrumb for Arabic interface
<ejs-breadcrumb [enableRtl]="true">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="الرئيسية" url="/home"></e-breadcrumb-item>
    <e-breadcrumb-item text="المنتجات" url="/products"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

Associated CSS for RTL:

```css
.e-breadcrumb[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

.e-breadcrumb[dir="rtl"] .e-breadcrumb-item {
  margin-left: 0;
  margin-right: 8px;
}
```

### itemTemplate

**Type:** `any` (Template)  
**Default:** `null`

Specifies the template for rendering custom item content. The template receives the item data as context.

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [BreadcrumbModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb>
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Products"></e-breadcrumb-item>
    </e-breadcrumb-items>
    <ng-template #itemTemplate let-data="">
      <div class="custom-item">
        <span class="item-text">{{data.text}}</span>
        <span class="item-badge" *ngIf="data.badge">{{data.badge}}</span>
      </div>
    </ng-template>
  </ejs-breadcrumb>`
})
export class AppComponent {}
```

```css
.custom-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-badge {
  background-color: #f44336;
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
}
```

### items

**Type:** `BreadcrumbItemModel[]`  
**Default:** `[]`

Defines the array of breadcrumb items to display. Use this for programmatic item management instead of directives.

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { BreadcrumbItemModel } from '@syncfusion/ej2-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb [items]="breadcrumbItems"></ejs-breadcrumb>`
})
export class AppComponent {
  breadcrumbItems: BreadcrumbItemModel[] = [
    { text: 'Home', url: '/home', id: 'home' },
    { text: 'Products', url: '/products', id: 'products' },
    { text: 'Electronics', url: '/products/electronics', id: 'electronics' },
    { text: 'Laptops', url: '/products/electronics/laptops', id: 'laptops', disabled: false }
  ];
}
```

### maxItems

**Type:** `number`  
**Default:** `-1` (no limit)

Specifies the maximum number of items to display before applying the overflow behavior. When the item count exceeds this value, the `overflowMode` property determines how extra items are handled.

```ts
<ejs-breadcrumb [maxItems]="3" overflowMode="Menu">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
    <e-breadcrumb-item text="Electronics" url="/products/electronics"></e-breadcrumb-item>
    <e-breadcrumb-item text="Laptops" url="/products/electronics/laptops"></e-breadcrumb-item>
    <e-breadcrumb-item text="Gaming" url="/products/electronics/laptops/gaming"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

With `maxItems="3"`: Shows first 3 items + remaining items in a dropdown menu.

### overflowMode

**Type:** `string | BreadcrumbOverflowMode`  
**Default:** `BreadcrumbOverflowMode.Menu`

Specifies how to handle breadcrumb items when they exceed available space. Valid values:
- `Menu`: Shows fitting items + dropdown for remainder
- `Collapsed`: Shows first and last + ellipsis for middle items
- `Wrap`: Items wrap to multiple lines
- `Scroll`: Horizontal scrollbar for single-line overflow
- `Hidden`: Shows fitting items only, hidden items appear on navigation
- `None`: All items on single line without overflow handling

```ts
// Menu overflow mode (default)
<ejs-breadcrumb [maxItems]="3" overflowMode="Menu">...</ejs-breadcrumb>

// Collapsed mode
<ejs-breadcrumb [maxItems]="3" overflowMode="Collapsed">...</ejs-breadcrumb>

// Wrap mode
<ejs-breadcrumb overflowMode="Wrap">...</ejs-breadcrumb>

// Scroll mode
<ejs-breadcrumb [maxItems]="4" overflowMode="Scroll">...</ejs-breadcrumb>

// Hidden mode
<ejs-breadcrumb [maxItems]="3" overflowMode="Hidden">...</ejs-breadcrumb>

// None mode
<ejs-breadcrumb overflowMode="None">...</ejs-breadcrumb>
```

### separatorTemplate

**Type:** `any` (Template)  
**Default:** `'/'`

Specifies the template for rendering custom separators between breadcrumb items. Can be text, HTML, or Angular template.

```ts
// Simple text separator
<ejs-breadcrumb separatorTemplate="→">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>

// Custom icon separator
<ejs-breadcrumb>
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products"></e-breadcrumb-item>
  </e-breadcrumb-items>
  <ng-template #separatorTemplate>
    <span class="e-bicons e-arrow"></span>
  </ng-template>
</ejs-breadcrumb>
```

### url

**Type:** `string`  
**Default:** `''`

Specifies a URL whose path will be parsed to automatically generate breadcrumb items. The URL is segmented and each segment becomes a breadcrumb item.

```ts
// Generate items from URL path
<ejs-breadcrumb url="url">
</ejs-breadcrumb>

// Results in items: products > electronics > laptops

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb [url]="navigationUrl"></ejs-breadcrumb>`
})
export class AppComponent {
  navigationUrl: string = 'url';
}
```

---

## Item Model Properties

Individual breadcrumb items use the `BreadcrumbItemModel` interface with these properties:

### disabled

**Type:** `boolean`  
**Default:** `false`

Enable or disable a specific breadcrumb item. Disabled items appear visually distinct and cannot be clicked.

```ts
const items: BreadcrumbItemModel[] = [
  { text: 'Home', url: '/home', disabled: false },
  { text: 'Products', url: '/products', disabled: false },
  { text: 'Archived', url: '/archived', disabled: true }  // Disabled item
];

<ejs-breadcrumb [items]="items"></ejs-breadcrumb>
```

### iconCss

**Type:** `string`  
**Default:** `''`

Specifies CSS classes for icons to display with the item. Use Syncfusion icon classes or custom CSS.

```ts
const items: BreadcrumbItemModel[] = [
  { text: 'Home', url: '/home', iconCss: 'e-icons e-home' },
  { text: 'Documents', url: '/docs', iconCss: 'e-bicons e-folder' },
  { text: 'File.txt', url: '/file', iconCss: 'e-bicons e-file' }
];

<ejs-breadcrumb [items]="items"></ejs-breadcrumb>
```

### id

**Type:** `string`  
**Default:** `''`

Specifies a unique identifier for the breadcrumb item. Use for item tracking, state management, and programmatic access.

```ts
const items: BreadcrumbItemModel[] = [
  { id: 'item-1', text: 'Home', url: '/home' },
  { id: 'item-2', text: 'Products', url: '/products' },
  { id: 'item-3', text: 'Electronics', url: '/products/electronics' }
];

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb [items]="items" (itemClick)="onItemClick($event)"></ejs-breadcrumb>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = items;

  onItemClick(args: BreadcrumbClickEventArgs): void {
    console.log('Clicked item ID:', args.item.id);
    // Route based on item ID
    if (args.item.id === 'item-2') {
      // Navigate to products
    }
  }
}
```

### text

**Type:** `string`  
**Default:** `''`

Specifies the display text for the breadcrumb item.

```ts
const items: BreadcrumbItemModel[] = [
  { text: 'Home', url: '/home' },
  { text: 'User Profile', url: '/profile' },
  { text: 'Settings', url: '/settings' }
];

<ejs-breadcrumb [items]="items"></ejs-breadcrumb>
```

### url

**Type:** `string`  
**Default:** `''`

Specifies the URL/destination for the breadcrumb item. Used for navigation when `enableNavigation` is `true`.

```ts
const items: BreadcrumbItemModel[] = [
  { text: 'Home', url: '/home' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' }
];

<ejs-breadcrumb [items]="items" [enableNavigation]="true"></ejs-breadcrumb>
```

---

## Component Methods

### destroy

**Returns:** `void`

Destroys the breadcrumb component and cleans up resources. Call this when removing the component from the DOM.

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb #breadcrumb [items]="items"></ejs-breadcrumb>
    <button (click)="destroyBreadcrumb()">Destroy</button>`
})
export class AppComponent {
  @ViewChild('breadcrumb') breadcrumb!: BreadcrumbComponent;
  
  items = [
    { text: 'Home', url: '/home' },
    { text: 'Products', url: '/products' }
  ];

  destroyBreadcrumb(): void {
    this.breadcrumb.destroy();
    // Component is now cleaned up and no longer functional
  }
}
```

---

## Component Events

The breadcrumb component emits the following events:

### beforeItemRender

**Type:** `EmitType<BreadcrumbBeforeItemRenderEventArgs>`

Triggered before each breadcrumb item is rendered. Use this to customize item appearance and properties before display.

**Arguments:** `BreadcrumbBeforeItemRenderEventArgs`
- `cancel`: `boolean` - Set to `true` to prevent item rendering
- `element`: `HTMLElement` - The DOM element being rendered
- `item`: `BreadcrumbItemModel` - The item being rendered
- `name`: `string` - Event name ('beforeItemRender')

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb (beforeItemRender)="onBeforeItemRender($event)">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`
})
export class AppComponent {
  onBeforeItemRender(args: BreadcrumbBeforeItemRenderEventArgs): void {
    // Add custom CSS class to specific items
    if (args.item.text === 'Products') {
      args.element.classList.add('highlight-item');
    }
    
    // Prevent rendering of certain items
    if (args.item.text === 'Admin') {
      args.cancel = true;
    }
  }
}
```

### created

**Type:** `EmitType<Event>`

Triggered once the breadcrumb component rendering is completed. Use for initialization or post-render setup.

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb #breadcrumb (created)="onComponentCreated()">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>
  <div *ngIf="isReady">Breadcrumb Ready</div>`
})
export class AppComponent {
  @ViewChild('breadcrumb') breadcrumb!: BreadcrumbComponent;
  isReady: boolean = false;

  onComponentCreated(): void {
    console.log('Breadcrumb component created and rendered');
    this.isReady = true;
    
    // Perform post-render operations
    this.breadcrumb.element.focus();
  }
}
```

### itemClick

**Type:** `EmitType<BreadcrumbClickEventArgs>`

Triggered when a breadcrumb item is clicked. Use to handle custom navigation or perform actions before navigation.

**Arguments:** `BreadcrumbClickEventArgs`
- `cancel`: `boolean` - Set to `true` to prevent default navigation
- `element`: `HTMLElement` - The clicked item's DOM element
- `event`: `Event` - The native click event
- `item`: `BreadcrumbItemModel` - The clicked breadcrumb item
- `name`: `string` - Event name ('itemClick')

```ts
import { BreadcrumbModule, BreadcrumbClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb (itemClick)="onItemClick($event)">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>
      <e-breadcrumb-item text="Electronics" url="/products/electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`
})
export class AppComponent {
  constructor(private router: Router) {}

  onItemClick(args: BreadcrumbClickEventArgs): void {
    console.log('Item clicked:', args.item.text);
    
    // Custom validation before navigation
    if (this.requiresSaveCheck(args.item)) {
      // Prevent default navigation
      args.cancel = true;
      
      // Show confirmation or perform custom action
      if (confirm('You have unsaved changes. Continue?')) {
        this.router.navigate([args.item.url]);
      }
    }
    
    // Track navigation analytics
    console.log('Navigating to:', args.item.url);
  }

  private requiresSaveCheck(item: any): boolean {
    // Custom logic to determine if save check is needed
    return false;
  }
}
```

---

## Event Arguments

### BreadcrumbBeforeItemRenderEventArgs

Interface for the `beforeItemRender` event:

```ts
interface BreadcrumbBeforeItemRenderEventArgs {
  cancel: boolean;          // Set true to prevent rendering
  element: HTMLElement;     // Item's DOM element
  item: BreadcrumbItemModel; // Item being rendered
  name: string;             // Event name
}
```

### BreadcrumbClickEventArgs

Interface for the `itemClick` event:

```ts
interface BreadcrumbClickEventArgs {
  cancel: boolean;          // Set true to prevent navigation
  element: HTMLElement;     // Item's DOM element
  event: Event;             // Native click event
  item: BreadcrumbItemModel; // Clicked item
  name: string;             // Event name
}
```

---

## Usage Examples

### Example 1: Programmatic Item Management

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '@syncfusion/ej2-angular-navigations';
import { BreadcrumbItemModel } from '@syncfusion/ej2-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<button (click)="addItem()">Add Item</button>
    <button (click)="removeItem()">Remove Last Item</button>
    <ejs-breadcrumb #breadcrumb [items]="items" [activeItem]="activeItem"></ejs-breadcrumb>`
})
export class AppComponent {
  @ViewChild('breadcrumb') breadcrumb!: BreadcrumbComponent;

  items: BreadcrumbItemModel[] = [
    { id: '1', text: 'Home', url: '/home' },
    { id: '2', text: 'Products', url: '/products' }
  ];

  activeItem: string = '/products';

  addItem(): void {
    const newItem: BreadcrumbItemModel = {
      id: String(this.items.length + 1),
      text: `Item ${this.items.length + 1}`,
      url: `/item/${this.items.length + 1}`
    };
    this.items.push(newItem);
    this.activeItem = newItem.url;
  }

  removeItem(): void {
    if (this.items.length > 1) {
      this.items.pop();
      this.activeItem = this.items[this.items.length - 1].url;
    }
  }
}
```

### Example 2: Advanced Event Handling

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { BreadcrumbBeforeItemRenderEventArgs, BreadcrumbClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb 
    cssClass="custom-breadcrumb"
    [enablePersistence]="true"
    id="app-breadcrumb"
    (beforeItemRender)="beforeRender($event)"
    (itemClick)="handleClick($event)"
    (created)="onCreated()">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Home" url="/" id="home"></e-breadcrumb-item>
      <e-breadcrumb-item text="Dashboard" url="/dashboard" id="dashboard"></e-breadcrumb-item>
      <e-breadcrumb-item text="Reports" url="/reports" id="reports"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`
})
export class AppComponent {
  beforeRender(args: BreadcrumbBeforeItemRenderEventArgs): void {
    // Add icon to home item
    if (args.item.id === 'home') {
      args.item.iconCss = 'e-icons e-home';
    }
    
    // Disable future items
    if (args.item.id === 'reports') {
      args.item.disabled = false; // Or true if needed
    }
  }

  handleClick(args: BreadcrumbClickEventArgs): void {
    console.log(`User clicked on: ${args.item.text} (ID: ${args.item.id})`);
    // Custom navigation logic
  }

  onCreated(): void {
    console.log('Breadcrumb initialized and ready for interaction');
  }
}
```

### Example 3: RTL with Persistence

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-breadcrumb 
    [enableRtl]="true"
    [enablePersistence]="true"
    id="rtl-breadcrumb"
    cssClass="rtl-breadcrumb">
    <e-breadcrumb-items>
      <e-breadcrumb-item text="الرئيسية" url="/home"></e-breadcrumb-item>
      <e-breadcrumb-item text="المنتجات" url="/products"></e-breadcrumb-item>
      <e-breadcrumb-item text="الإلكترونيات" url="/electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
  </ejs-breadcrumb>`,
  styles: [`
    .rtl-breadcrumb {
      direction: rtl;
    }
  `]
})
export class AppComponent {}
```

This comprehensive API reference covers all properties, methods, and events with practical examples for each.
