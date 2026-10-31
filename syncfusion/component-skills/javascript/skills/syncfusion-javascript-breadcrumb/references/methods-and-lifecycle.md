# Methods and Lifecycle

## Table of Contents
- [Lifecycle Overview](#lifecycle-overview)
- [Component Lifecycle Methods](#component-lifecycle-methods)
- [Event Management Methods](#event-management-methods)
- [Data Management Methods](#data-management-methods)
- [Component Access Methods](#component-access-methods)
- [Lifecycle Patterns](#lifecycle-patterns)

## Lifecycle Overview

The Breadcrumb component has a well-defined lifecycle from creation to destruction:

```
1. Constructor
2. Initialization
3. appendTo() - DOM attachment
4. created event - component ready
5. Runtime - user interaction
6. destroy() - cleanup
```

### Lifecycle State

```typescript
// Create instance
const breadcrumb = new Breadcrumb({ items: [...] });
// State: Created but not attached

// Attach to DOM
breadcrumb.appendTo('#breadcrumb');
// State: Component initialized and rendered

// Use component
breadcrumb.itemClick = (args) => { /* ... */ };
// State: Active and ready for interaction

// Clean up
breadcrumb.destroy();
// State: Destroyed and removed from DOM
```

## Component Lifecycle Methods

### appendTo()

Appends the breadcrumb component to a specified DOM element or selector.

**Signature:**
```typescript
appendTo(selector?: string | HTMLElement): void
```

**Parameters:**
- `selector` (optional): Target element ID, selector string, or HTMLElement

**Returns:** void

**Usage:**

```typescript
// Using element ID
const breadcrumb = new Breadcrumb({ items: [...] });
breadcrumb.appendTo('#breadcrumb-container');

// Using HTMLElement
const container = document.getElementById('breadcrumb');
breadcrumb.appendTo(container);

// Using CSS selector
breadcrumb.appendTo('nav.breadcrumb');

// Append without parameter (uses component's target)
breadcrumb.appendTo();
```

**Example:**

```typescript
// Create and append in one workflow
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});

// Append to specific container
breadcrumb.appendTo('#app-breadcrumb');

// Component now renders and is interactive
console.log('Breadcrumb rendered:', breadcrumb.getRootElement());
```

### destroy()

Destroys the breadcrumb component and removes it from the DOM.

**Signature:**
```typescript
destroy(): void
```

**Returns:** void

**Usage:**

```typescript
const breadcrumb = new Breadcrumb({ items: [...] });
breadcrumb.appendTo('#breadcrumb');

// Later, when component is no longer needed
breadcrumb.destroy();
// Component is removed from DOM and cleaned up
```

**Cleanup:**

```typescript
// Clean up event listeners and resources
breadcrumb.removeEventListener('itemClick', handler);
breadcrumb.destroy();

// Remove DOM references
const element = breadcrumb.getRootElement();
element.remove();
```

**Use Cases:**

```typescript
// Single Page Application navigation
class NavigationComponent {
  private breadcrumb: Breadcrumb;
  
  initialize() {
    this.breadcrumb = new Breadcrumb({
      items: this.getNavigationItems()
    });
    this.breadcrumb.appendTo('#breadcrumb');
  }
  
  cleanup() {
    if (this.breadcrumb) {
      this.breadcrumb.destroy();
      this.breadcrumb = null;
    }
  }
  
  handleRouteChange(route) {
    // Clean up old breadcrumb
    this.cleanup();
    
    // Create new breadcrumb for route
    this.initialize();
  }
}
```

## Data Management Methods

### dataBind()

Applies all pending property changes and renders the component immediately.

**Signature:**
```typescript
dataBind(): void
```

**Returns:** void

**Usage:**

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Update items
breadcrumb.items = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Phones', url: '/products/phones' }
];

// Apply changes immediately
breadcrumb.dataBind();
```

**Updating Multiple Properties:**

```typescript
// Change multiple properties
breadcrumb.items = newItems;
breadcrumb.activeItem = '/products/electronics';
breadcrumb.maxItems = 5;
breadcrumb.overflowMode = 'Menu';

// Apply all changes at once
breadcrumb.dataBind();
```

**Conditional Updates:**

```typescript
// Update based on conditions
function updateBreadcrumb(breadcrumb, newPath) {
  const items = generateItemsFromPath(newPath);
  
  breadcrumb.items = items;
  breadcrumb.activeItem = newPath;
  
  // Apply updates
  breadcrumb.dataBind();
}
```

### refresh()

Applies all pending property changes and re-renders the component completely.

**Signature:**
```typescript
refresh(): void
```

**Returns:** void

**Usage:**

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  cssClass: 'old-class'
});
breadcrumb.appendTo('#breadcrumb');

// Update CSS class
breadcrumb.cssClass = 'new-class';

// Refresh component
breadcrumb.refresh();
```

**Difference from dataBind():**

```typescript
// dataBind() - applies pending changes
breadcrumb.items = newItems;
breadcrumb.dataBind();  // Applies items update

// refresh() - complete re-render
breadcrumb.items = newItems;
breadcrumb.refresh();   // Complete re-render with all changes
```

**Use Case:**

```typescript
// Responsive breadcrumb update on resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  
  if (width < 600) {
    breadcrumb.maxItems = 3;
    breadcrumb.overflowMode = 'Collapsed';
  } else {
    breadcrumb.maxItems = 5;
    breadcrumb.overflowMode = 'Menu';
  }
  
  breadcrumb.refresh();
});
```

## Component Access Methods

### getRootElement()

Returns the root DOM element of the breadcrumb component.

**Signature:**
```typescript
getRootElement(): HTMLElement
```

**Returns:** HTMLElement - The breadcrumb's root container element

**Usage:**

```typescript
const breadcrumb = new Breadcrumb({ items: [...] });
breadcrumb.appendTo('#breadcrumb');

// Get root element
const rootElement = breadcrumb.getRootElement();
console.log('Root element:', rootElement);
console.log('Class name:', rootElement.className);

// Manipulate DOM
rootElement.style.padding = '20px';
rootElement.classList.add('custom-style');
```

**DOM Manipulation:**

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Get and inspect root element
const root = breadcrumb.getRootElement();

// Add event listener to root
root.addEventListener('mouseenter', () => {
  console.log('User hovering breadcrumb');
});

// Access internal structure
const items = root.querySelectorAll('.e-breadcrumb-item');
console.log('Number of items:', items.length);
```

## Event Management Methods

### addEventListener()

Adds an event listener to the breadcrumb component.

**Signature:**
```typescript
addEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName`: Name of the event (e.g., 'itemClick', 'beforeItemRender', 'created')
- `handler`: Function to execute when event fires

**Returns:** void

**Usage:**

```typescript
const breadcrumb = new Breadcrumb({ items: [...] });
breadcrumb.appendTo('#breadcrumb');

// Add click handler
breadcrumb.addEventListener('itemClick', (args) => {
  console.log('Item clicked:', args.item.text);
});

// Add render handler
breadcrumb.addEventListener('beforeItemRender', (args) => {
  console.log('Rendering:', args.item.text);
});

// Add creation handler
breadcrumb.addEventListener('created', () => {
  console.log('Component created');
});
```

**Multiple Listeners:**

```typescript
// Multiple handlers for same event
function handler1(args) {
  console.log('Handler 1');
}

function handler2(args) {
  console.log('Handler 2');
}

breadcrumb.addEventListener('itemClick', handler1);
breadcrumb.addEventListener('itemClick', handler2);

// Both execute on item click
```

### removeEventListener()

Removes an event listener from the breadcrumb component.

**Signature:**
```typescript
removeEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName`: Name of the event to remove listener from
- `handler`: The exact handler function to remove

**Returns:** void

**Usage:**

```typescript
// Define handler
function handleItemClick(args) {
  console.log('Item clicked');
}

// Add listener
breadcrumb.addEventListener('itemClick', handleItemClick);

// Later, remove listener
breadcrumb.removeEventListener('itemClick', handleItemClick);
```

**Cleanup Example:**

```typescript
class BreadcrumbManager {
  private breadcrumb: Breadcrumb;
  private clickHandler: (args: any) => void;
  
  setup() {
    this.breadcrumb = new Breadcrumb({ items: [...] });
    this.clickHandler = (args) => this.handleClick(args);
    
    this.breadcrumb.addEventListener('itemClick', this.clickHandler);
    this.breadcrumb.appendTo('#breadcrumb');
  }
  
  handleClick(args: any) {
    console.log('Handled click:', args.item.text);
  }
  
  cleanup() {
    this.breadcrumb.removeEventListener('itemClick', this.clickHandler);
    this.breadcrumb.destroy();
  }
}
```

### Inject()

Dynamically injects required modules into the breadcrumb component.

**Signature:**
```typescript
Inject(moduleList: Function[]): void
```

**Parameters:**
- `moduleList`: Array of module functions to inject

**Returns:** void

**Usage:**

```typescript
import { Breadcrumb, BreadcrumbRipple } from '@syncfusion/ej2-navigations';

// Create breadcrumb
const breadcrumb = new Breadcrumb({ items: [...] });

// Inject ripple effect module
breadcrumb.Inject(BreadcrumbRipple);

breadcrumb.appendTo('#breadcrumb');
```

**Note:** Modules are typically pre-registered globally or via tree-shaking in modern builds.

## Lifecycle Patterns

### Pattern 1: Complete Lifecycle Management

```typescript
class BreadcrumbComponent {
  private breadcrumb: Breadcrumb;
  
  // 1. Initialize
  initialize(container: string, items: any[]) {
    this.breadcrumb = new Breadcrumb({
      items: items,
      cssClass: 'app-breadcrumb'
    });
    
    // 2. Setup event handlers
    this.setupEventHandlers();
    
    // 3. Append to DOM
    this.breadcrumb.appendTo(container);
    
    // 4. Return when ready
    return this.breadcrumb.getRootElement();
  }
  
  private setupEventHandlers() {
    this.breadcrumb.itemClick = (args) => {
      this.handleItemClick(args);
    };
    
    this.breadcrumb.created = () => {
      this.handleCreated();
    };
  }
  
  private handleItemClick(args: any) {
    console.log('Navigation:', args.item.text);
  }
  
  private handleCreated() {
    console.log('Breadcrumb ready');
  }
  
  // Update content
  updateItems(items: any[]) {
    this.breadcrumb.items = items;
    this.breadcrumb.dataBind();
  }
  
  // 5. Cleanup
  destroy() {
    this.breadcrumb.destroy();
  }
}

// Usage
const component = new BreadcrumbComponent();
component.initialize('#breadcrumb', items);

// Later
component.updateItems(newItems);
component.destroy();
```

### Pattern 2: SPA Route Navigation

```typescript
class SPABreadcrumb {
  private breadcrumb: Breadcrumb;
  
  setupRouting(router: any) {
    router.on('navigate', (route: string) => {
      this.updateForRoute(route);
    });
  }
  
  private updateForRoute(route: string) {
    // Clean up old breadcrumb
    if (this.breadcrumb) {
      this.breadcrumb.destroy();
    }
    
    // Generate items from route
    const items = this.generateItemsFromRoute(route);
    
    // Create new breadcrumb
    this.breadcrumb = new Breadcrumb({
      items: items,
      activeItem: route,
      itemClick: (args) => this.handleNavigation(args)
    });
    
    this.breadcrumb.appendTo('#breadcrumb');
  }
  
  private generateItemsFromRoute(route: string) {
    const segments = route.split('/').filter(s => s);
    const items = [];
    let path = '';
    
    items.push({ text: 'Home', url: '/' });
    
    segments.forEach((segment, index) => {
      path += '/' + segment;
      items.push({
        text: this.capitalize(segment),
        url: path,
        disabled: index === segments.length - 1
      });
    });
    
    return items;
  }
  
  private handleNavigation(args: any) {
    // Prevent default and use router
    args.cancel = true;
    router.navigate(args.item.url);
  }
  
  private capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
```

### Pattern 3: Responsive Breadcrumb

```typescript
class ResponsiveBreadcrumb {
  private breadcrumb: Breadcrumb;
  private resizeObserver: ResizeObserver;
  
  initialize(items: any[]) {
    this.breadcrumb = new Breadcrumb({
      items: items,
      overflowMode: this.getOverflowMode()
    });
    
    this.breadcrumb.appendTo('#breadcrumb');
    
    // Observe container resize
    this.setupResizeObserver();
  }
  
  private setupResizeObserver() {
    const container = this.breadcrumb.getRootElement();
    
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverflowMode();
    });
    
    this.resizeObserver.observe(container);
  }
  
  private updateOverflowMode() {
    const container = this.breadcrumb.getRootElement();
    const width = container.offsetWidth;
    const newMode = this.getOverflowModeForWidth(width);
    
    if (this.breadcrumb.overflowMode !== newMode) {
      this.breadcrumb.overflowMode = newMode;
      this.breadcrumb.refresh();
    }
  }
  
  private getOverflowMode() {
    return this.getOverflowModeForWidth(
      this.breadcrumb.getRootElement().offsetWidth
    );
  }
  
  private getOverflowModeForWidth(width: number) {
    if (width < 400) return 'Collapsed';
    if (width < 600) return 'Menu';
    return 'Wrap';
  }
  
  destroy() {
    this.resizeObserver.disconnect();
    this.breadcrumb.destroy();
  }
}
```

---

**Next:** Review complete examples and integrate all concepts into your implementation.
