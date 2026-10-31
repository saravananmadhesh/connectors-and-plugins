# Events and Event Handling

## Table of Contents
- [Event Overview](#event-overview)
- [itemClick Event](#itemclick-event)
- [beforeItemRender Event](#beforeitemrender-event)
- [created Event](#created-event)
- [Loading State Transitions](#loading-state-transitions)
- [Event Handler Patterns](#event-handler-patterns)
- [Common Event Use Cases](#common-event-use-cases)

## Event Overview

The Breadcrumb component fires events at key moments during its lifecycle and user interaction. Three main events are available:

```typescript
// Event lifecycle
// 1. Component initialization → created
// 2. Each item rendering → beforeItemRender
// 3. User item click → itemClick
```

### Event Properties

Each event provides an event arguments object with specific properties:

```typescript
// BreadcrumbClickEventArgs
{
  cancel: boolean,
  element: HTMLElement,
  event: Event,
  item: BreadcrumbItemModel,
  name: string
}

// BreadcrumbBeforeItemRenderEventArgs
{
  cancel: boolean,
  element: HTMLElement,
  item: BreadcrumbItemModel,
  name: string
}
```

## itemClick Event

**Event Type:** `BreadcrumbClickEventArgs`  
**Fired When:** User clicks a breadcrumb item

The itemClick event fires whenever a user clicks on a breadcrumb item. Use this event to handle navigation or prevent default behavior.

### Event Arguments

```typescript
interface BreadcrumbClickEventArgs {
  cancel: boolean;           // Set to true to prevent navigation
  element: HTMLElement;      // Clicked DOM element
  event: Event;              // Native browser event
  item: BreadcrumbItemModel; // The clicked item data
  name: string;              // Event name ('itemClick')
}
```

### Basic Implementation

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/products/electronics' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Handle item click
breadcrumb.itemClick = (args) => {
  console.log('Item clicked:', args.item.text);
  console.log('URL:', args.item.url);
  console.log('Item element:', args.element);
};
```

### Accessing Event Properties

```typescript
breadcrumb.itemClick = (args: BreadcrumbClickEventArgs) => {
  // Access clicked item
  const clickedItem = args.item;
  console.log('Clicked:', clickedItem.text);
  
  // Access native event
  const nativeEvent = args.event;
  console.log('Event type:', nativeEvent.type);
  
  // Access element
  const element = args.element;
  console.log('Element class:', element.className);
  
  // Event name
  console.log('Event name:', args.name); // 'itemClick'
};
```

### Preventing Navigation

```typescript
breadcrumb.itemClick = (args) => {
  // Prevent default navigation
  args.cancel = true;
  
  // Custom navigation logic
  const url = args.item.url;
  console.log('Custom navigation to:', url);
  
  // Implement custom route handling
  router.navigate(url);
};
```

### Conditional Navigation

```typescript
breadcrumb.itemClick = (args) => {
  // Only allow navigation to home
  if (args.item.url !== '/') {
    args.cancel = true;
    alert('Only home navigation allowed');
    return;
  }
  
  // Allow home navigation
  args.cancel = false;
};
```

### Event Filtering

```typescript
breadcrumb.itemClick = (args) => {
  // Handle only specific items
  if (args.item.id === 'admin-item') {
    // Admin item clicked
    if (!userIsAdmin) {
      args.cancel = true;
      alert('Admin access required');
    }
  }
  
  // Handle other items
  else {
    // Normal navigation
    window.location.href = args.item.url;
  }
};
```

### Analytics Tracking

```typescript
breadcrumb.itemClick = (args) => {
  // Track breadcrumb navigation
  trackEvent('breadcrumb_click', {
    item_text: args.item.text,
    item_url: args.item.url,
    timestamp: new Date()
  });
  
  // Continue with default navigation
  args.cancel = false;
};
```

## beforeItemRender Event

**Event Type:** `BreadcrumbBeforeItemRenderEventArgs`  
**Fired When:** Before each breadcrumb item renders

The beforeItemRender event fires for each item during component initialization and updates. Use this to customize item rendering or cancel rendering.

### Event Arguments

```typescript
interface BreadcrumbBeforeItemRenderEventArgs {
  cancel: boolean;           // Set to true to skip item rendering
  element: HTMLElement;      // Item DOM element
  item: BreadcrumbItemModel; // Item data
  name: string;              // Event name ('beforeItemRender')
}
```

### Basic Implementation

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/products/electronics' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Handle before render
breadcrumb.beforeItemRender = (args) => {
  console.log('Rendering item:', args.item.text);
};
```

### Customizing Element

```typescript
breadcrumb.beforeItemRender = (args) => {
  // Add custom attributes
  args.element.setAttribute('data-item-id', args.item.id);
  args.element.setAttribute('data-item-url', args.item.url);
  
  // Add custom classes
  if (args.item.disabled) {
    args.element.classList.add('custom-disabled');
  }
};
```

### Conditional Rendering

```typescript
breadcrumb.beforeItemRender = (args) => {
  // Skip rendering specific items
  if (args.item.id === 'hidden-item') {
    args.cancel = true;
    return;
  }
  
  // Render all other items
  args.cancel = false;
};
```

### Item-Specific Styling

```typescript
breadcrumb.beforeItemRender = (args) => {
  // Apply styles based on item properties
  if (args.item.special) {
    args.element.style.fontWeight = 'bold';
    args.element.style.color = '#ff6b6b';
  }
  
  if (args.item.disabled) {
    args.element.style.opacity = '0.5';
    args.element.style.pointerEvents = 'none';
  }
};
```

### Dynamic Content Injection

```typescript
breadcrumb.beforeItemRender = (args) => {
  // Add custom content to element
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = args.item.badge || '';
  
  if (args.item.badge) {
    args.element.appendChild(badge);
  }
};
```

## created Event

**Event Type:** `Event`  
**Fired When:** Component rendering is completed

The created event fires once after the breadcrumb component has finished rendering and is ready for use.

### Basic Implementation

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Handle component creation
breadcrumb.created = () => {
  console.log('Breadcrumb component created');
  // Component ready for interaction
};
```

### Initialization Tasks

```typescript
breadcrumb.created = () => {
  // Perform post-initialization tasks
  console.log('Breadcrumb ready');
  
  // Access component
  const root = breadcrumb.getRootElement();
  console.log('Root element:', root);
  
  // Setup additional handlers
  setupCustomHandlers();
  
  // Initialize analytics
  logComponentLoad();
};

function setupCustomHandlers() {
  // Custom setup code
}

function logComponentLoad() {
  console.log('Breadcrumb component loaded');
}
```

### Component Configuration After Creation

```typescript
breadcrumb.created = () => {
  // Apply dynamic configuration
  if (window.innerWidth < 768) {
    breadcrumb.overflowMode = 'Menu';
    breadcrumb.maxItems = 3;
  } else {
    breadcrumb.overflowMode = 'Wrap';
    breadcrumb.maxItems = -1;
  }
  
  breadcrumb.dataBind();
};
```

## Loading State Transitions

Breadcrumb items can display different icon states to indicate loading, success, error, or warning conditions. Use `beforeItemRender` to update item states dynamically.

```typescript
const items = [
  { text: 'Step 1', url: '/', iconCss: 'e-icons e-check' },
  { text: 'Step 2', url: '/step2', iconCss: 'e-icons e-spinner' },
  { text: 'Step 3', url: '/step3', iconCss: '' }
];

const breadcrumb = new Breadcrumb({
  items: items,
  enableNavigation: false,
  beforeItemRender: (args: BreadcrumbBeforeItemRenderEventArgs) => {
    // Update item styling based on state
    if (args.item.iconCss && args.item.iconCss.includes('e-spinner')) {
      args.element.classList.add('loading-state');
    } else if (args.item.iconCss && args.item.iconCss.includes('e-check')) {
      args.element.classList.add('completed-state');
    }
  }
});

breadcrumb.appendTo('#breadcrumb');
```

**CSS for Loading States:**

```css
.e-breadcrumb-item.loading-state {
  opacity: 0.7;
  cursor: wait;
}

.e-breadcrumb-item.loading-state .e-spinner {
  animation: spin 1s linear infinite;
}

.e-breadcrumb-item.completed-state {
  opacity: 1;
  color: #4caf50;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**Real-world State Management:**

```typescript
class StateManager {
  private breadcrumb: Breadcrumb;
  
  constructor() {
    const items: BreadcrumbItemModel[] = [
      { text: 'Validation', iconCss: 'e-icons e-info' },
      { text: 'Processing', iconCss: 'e-icons e-info' },
      { text: 'Uploading', iconCss: 'e-icons e-info' },
      { text: 'Complete', iconCss: 'e-icons e-info' }
    ];
    
    this.breadcrumb = new Breadcrumb({
      items: items,
      enableNavigation: false,
      beforeItemRender: (args) => {
        const iconClass = args.item.iconCss || '';
        if (iconClass.includes('e-spinner')) {
          args.element.classList.add('active-step');
        } else if (iconClass.includes('e-check')) {
          args.element.classList.add('completed-step');
        }
      }
    });
    this.breadcrumb.appendTo('#breadcrumb');
  }
  
  async processStep(stepIndex: number): Promise<boolean> {
    try {
      // Mark as loading
      const items = this.breadcrumb.items as BreadcrumbItemModel[];
      items[stepIndex].iconCss = 'e-icons e-spinner';
      items[stepIndex].disabled = true;
      this.breadcrumb.dataBind();
      
      // Simulate async operation
      await this.executeStep(stepIndex);
      
      // Mark as complete
      items[stepIndex].iconCss = 'e-icons e-check';
      items[stepIndex].disabled = false;
      this.breadcrumb.dataBind();
      
      return true;
    } catch (error) {
      // Mark as error
      const items = this.breadcrumb.items as BreadcrumbItemModel[];
      items[stepIndex].iconCss = 'e-icons e-error';
      items[stepIndex].disabled = false;
      this.breadcrumb.dataBind();
      
      console.error(`Step ${stepIndex} failed:`, error);
      return false;
    }
  }
  
  private executeStep(index: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  }
}

// Usage
const stateManager = new StateManager();
await stateManager.processStep(0);
await stateManager.processStep(1);
await stateManager.processStep(2);
```

**Multi-step Process with Progress:**

```typescript
// Multi-step process with visual progress tracking
const stepsItems: BreadcrumbItemModel[] = [
  { text: 'Validation', iconCss: 'e-icons e-info' },
  { text: 'Processing', iconCss: 'e-icons e-info' },
  { text: 'Uploading', iconCss: 'e-icons e-info' },
  { text: 'Complete', iconCss: 'e-icons e-info' }
];

const breadcrumb = new Breadcrumb({
  items: stepsItems,
  enableNavigation: false,
  cssClass: 'process-tracker'
});

async function executeProcess() {
  for (let i = 0; i < stepsItems.length; i++) {
    // Set current step as loading
    stepsItems[i].iconCss = 'e-icons e-spinner';
    breadcrumb.dataBind();
    
    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mark as complete
    stepsItems[i].iconCss = 'e-icons e-check';
    stepsItems[i].disabled = true;
    breadcrumb.dataBind();
  }
}

executeProcess();
```

## Event Handler Patterns

### Registering Events

```typescript
// Pattern 1: Event property assignment
breadcrumb.itemClick = (args) => {
  console.log('Item clicked');
};

// Pattern 2: addEventListener method
breadcrumb.addEventListener('itemClick', (args) => {
  console.log('Item clicked');
});

// Pattern 3: Via constructor
const breadcrumb = new Breadcrumb({
  items: [...],
  itemClick: (args) => {
    console.log('Item clicked');
  }
});
```

### Multiple Event Handlers

```typescript
// Handler 1: Navigation tracking
function trackNavigation(args) {
  console.log('Navigation:', args.item.url);
}

// Handler 2: Analytics
function analyticsTracking(args) {
  ga('send', 'event', 'breadcrumb', 'click', args.item.text);
}

// Handler 3: Security check
function securityCheck(args) {
  if (!userHasAccess(args.item.url)) {
    args.cancel = true;
  }
}

// Register all handlers
breadcrumb.addEventListener('itemClick', trackNavigation);
breadcrumb.addEventListener('itemClick', analyticsTracking);
breadcrumb.addEventListener('itemClick', securityCheck);
```

### Removing Event Handlers

```typescript
function handleClick(args) {
  console.log('Clicked');
}

// Register
breadcrumb.addEventListener('itemClick', handleClick);

// Later, remove
breadcrumb.removeEventListener('itemClick', handleClick);
```

### Chained Event Handling

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  itemClick: handleItemClick,
  beforeItemRender: handleBeforeRender,
  created: handleCreated
});

function handleItemClick(args) {
  console.log('1. Item clicked');
}

function handleBeforeRender(args) {
  console.log('2. Item rendering');
}

function handleCreated() {
  console.log('3. Component created');
}
```

## Common Event Use Cases

### Use Case 1: Analytics and Tracking

```typescript
interface NavigationMetrics {
  timestamp: Date;
  item: string;
  url: string;
  userAgent: string;
}

const metrics: NavigationMetrics[] = [];

breadcrumb.itemClick = (args) => {
  metrics.push({
    timestamp: new Date(),
    item: args.item.text,
    url: args.item.url,
    userAgent: navigator.userAgent
  });
  
  // Send to analytics
  sendToAnalytics(metrics);
};
```

### Use Case 2: Permission-Based Navigation

```typescript
breadcrumb.itemClick = (args) => {
  // Check user permissions
  const hasAccess = checkPermission(args.item.url);
  
  if (!hasAccess) {
    args.cancel = true;
    showAccessDenied();
    return;
  }
  
  // Allow navigation
  args.cancel = false;
};

function checkPermission(url: string): boolean {
  const userRole = getCurrentUserRole();
  const allowedRoles = getUrlPermissions(url);
  return allowedRoles.includes(userRole);
}
```

### Use Case 3: Dynamic Item Styling Based on State

```typescript
breadcrumb.beforeItemRender = (args) => {
  // Style based on item state
  const state = getItemState(args.item.id);
  
  switch(state) {
    case 'completed':
      args.element.classList.add('breadcrumb-completed');
      break;
    case 'active':
      args.element.classList.add('breadcrumb-active');
      break;
    case 'pending':
      args.element.classList.add('breadcrumb-pending');
      break;
  }
};
```

### Use Case 4: Route-Based Navigation

```typescript
breadcrumb.itemClick = (args) => {
  args.cancel = true; // Prevent default
  
  // Use router instead of default navigation
  router.navigate(args.item.url).then(() => {
    console.log('Navigated to:', args.item.url);
  }).catch((error) => {
    console.error('Navigation failed:', error);
    showError('Navigation failed');
  });
};
```

### Use Case 5: Event Logging

```typescript
class BreadcrumbEventLogger {
  private logs: any[] = [];
  
  setupLogging(breadcrumb: Breadcrumb) {
    breadcrumb.created = () => this.logCreated();
    breadcrumb.beforeItemRender = (args) => this.logBeforeRender(args);
    breadcrumb.itemClick = (args) => this.logItemClick(args);
  }
  
  private logCreated() {
    this.logs.push({
      timestamp: new Date(),
      event: 'created'
    });
  }
  
  private logBeforeRender(args: BreadcrumbBeforeItemRenderEventArgs) {
    this.logs.push({
      timestamp: new Date(),
      event: 'beforeItemRender',
      item: args.item.text
    });
  }
  
  private logItemClick(args: BreadcrumbClickEventArgs) {
    this.logs.push({
      timestamp: new Date(),
      event: 'itemClick',
      item: args.item.text,
      url: args.item.url
    });
  }
  
  getLogs() {
    return this.logs;
  }
}

// Usage
const logger = new BreadcrumbEventLogger();
logger.setupLogging(breadcrumb);
```

---

**Next:** Learn about component lifecycle methods using [methods-and-lifecycle.md](methods-and-lifecycle.md).
