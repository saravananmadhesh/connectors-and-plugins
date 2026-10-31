# Events and Lifecycle Hooks

## Table of Contents
- [Overview](#overview)
- [Event Handling Pattern](#event-handling-pattern)
- [Created Event](#created-event)
- [BeforeItemRender Event](#beforeitemrender-event)
- [Common Use Cases](#common-use-cases)
- [Event Examples](#event-examples)

## Overview

The Timeline control provides lifecycle events that fire at specific points during the Timeline's rendering process. These events allow you to execute custom logic and respond to Timeline state changes.

### Available Events

| Event | Triggered | Use Case |
|-------|-----------|----------|
| `created` | When the Timeline finishes rendering | Initialization, DOM manipulation |
| `beforeItemRender` | Before each individual item renders | Item-specific customization, data modification |

## Event Handling Pattern

### Basic Event Handler Syntax

Events are defined in the Timeline configuration object when initializing:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

let timeline: Timeline = new Timeline({
  items: [...],
  eventName: (args: EventArgsType) => {
    // Your custom logic here
  }
});

timeline.appendTo("#timeline");
```

### Method Reference Pattern

For complex event logic, pass a method reference:

```typescript
let timeline: Timeline = new Timeline({
  items: [...],
  created: onTimelineCreated,
  beforeItemRender: onBeforeItemRender
});

function onTimelineCreated(): void {
  // Initialization logic
}

function onBeforeItemRender(args: TimelineRenderingEventArgs): void {
  // Item rendering logic
}

timeline.appendTo("#timeline");
```

## Created Event

The `created` event fires when the Timeline control has finished its initial rendering process. This is the ideal time for:

- Accessing rendered DOM elements
- Initializing dependent UI components
- Loading additional data
- Applying post-render customizations

### Created Event Signature

```typescript
created?: () => void;
```

### Basic Example

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const productLifecycle: TimelineItemModel[] = [
  { content: 'Planning' },
  { content: 'Developing' },
  { content: 'Testing' },
  { content: 'Launch' },
];

let timeline: Timeline = new Timeline({
  items: productLifecycle,
  created: () => {
    console.log('Timeline rendering complete!');
    // Perform post-render tasks
  }
});

timeline.appendTo("#timeline");
```

### Practical Example: DOM Access

Access and modify Timeline DOM elements after creation:

```typescript
let timeline: Timeline = new Timeline({
  items: productLifecycle,
  created: onTimelineCreated
});

function onTimelineCreated(): void {
  // Get the container element
  const container = document.getElementById('timeline');
  
  if (container) {
    // Add custom attributes or classes
    container.setAttribute('data-timeline-ready', 'true');
    container.classList.add('timeline-initialized');
    
    // Modify specific items
    const firstItem = container.querySelector('.e-timeline-item:first-child');
    if (firstItem) {
      firstItem.classList.add('first-item-style');
    }
    
    // Count total items
    const itemCount = container.querySelectorAll('.e-timeline-item').length;
    console.log(`Timeline has ${itemCount} items`);
  }
}

timeline.appendTo("#timeline");
```

### Use Case: Initialize Related Components

Initialize dependent components when Timeline is ready:

```typescript
let timeline: Timeline = new Timeline({
  items: productLifecycle,
  created: initializeDependentUI
});

function initializeDependentUI(): void {
  // Initialize tooltips
  initializeTooltips();
  
  // Load additional data
  loadTimelineMetadata();
  
  // Setup event listeners
  attachCustomEventListeners();
}

function initializeTooltips(): void {
  const items = document.querySelectorAll('.e-timeline-item');
  items.forEach((item, index) => {
    item.title = `Item ${index + 1}`;
  });
}

function loadTimelineMetadata(): void {
  console.log('Loading additional metadata...');
}

function attachCustomEventListeners(): void {
  const items = document.querySelectorAll('.e-timeline-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      console.log('Item clicked:", e.currentTarget);
    });
  });
}

timeline.appendTo("#timeline");
```

## BeforeItemRender Event

The `beforeItemRender` event fires before each individual timeline item renders. This allows you to customize, validate, or modify item properties dynamically before rendering.

### BeforeItemRender Event Signature

```typescript
beforeItemRender?: (args: TimelineRenderingEventArgs) => void;
```

### TimelineRenderingEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `element` | HTMLElement | The DOM element of the item being rendered |
| `index` | number | The 0-based index of the current item |
| `name` | string | The event name (always 'beforeItemRender' for this event) |

### Basic Example

```typescript
import { Timeline, TimelineItemModel, TimelineRenderingEventArgs } from '@syncfusion/ej2-layouts';

const items: TimelineItemModel[] = [
  { content: 'Item 1', oppositeContent: 'Header 1' },
  { content: 'Item 2', oppositeContent: 'Header 2' },
  { content: 'Item 3', oppositeContent: 'Header 3' }
];

let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    console.log(`Event: ${args.name}`);
    console.log(`Rendering item at index: ${args.index}`);
    console.log(`Element: ${args.element.tagName}`);
  }
});

timeline.appendTo("#timeline");
```

### Practical Example: Dynamic Content Modification

Customize the DOM element before rendering:

```typescript
let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    // Add data attributes to element
    args.element.setAttribute('data-item-index', args.index.toString());
    args.element.setAttribute('data-event-name', args.name);
    
    // Conditionally modify based on index
    if (args.index === 0) {
      args.element.classList.add('first-item');
    } else if (args.index === items.length - 1) {
      args.element.classList.add('last-item');
    }
    
    // Add custom classes for styling
    if (args.index % 2 === 0) {
      args.element.classList.add('even-item');
    } else {
      args.element.classList.add('odd-item');
    }
  }
});

timeline.appendTo("#timeline");
```

### Practical Example: DOM Element Customization

Customize the rendered DOM element:

```typescript
let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    // Add custom attributes to element
    args.element.setAttribute('data-item-index', args.index.toString());
    args.element.setAttribute('data-content', args.element.textContent || '');
    
    // Add classes based on conditions
    if (args.index < items.length / 2) {
      args.element.classList.add('first-half');
    } else {
      args.element.classList.add('second-half');
    }
    
    // Modify inline styles
    args.element.style.setProperty('--item-index', args.index.toString());
    
    // Add event listeners to the element
    args.element.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      console.log(`Right-clicked on item ${args.index}`);
    });
  }
});

timeline.appendTo("#timeline");
```

### Practical Example: Data Enrichment

Modify item content and styling before rendering:

```typescript
interface EnhancedTimelineItem extends TimelineItemModel {
  timestamp?: string;
  status?: 'completed' | 'active' | 'pending';
}

const items: EnhancedTimelineItem[] = [
  { content: 'Phase 1', oppositeContent: 'Completed', status: 'completed' },
  { content: 'Phase 2', oppositeContent: 'Active', status: 'active' },
  { content: 'Phase 3', oppositeContent: 'Pending', status: 'pending' }
];

let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    // Get the item data from the items array
    const item = items[args.index] as EnhancedTimelineItem;
    
    // Add timestamp if not present
    if (!item.timestamp) {
      item.timestamp = new Date().toISOString();
    }
    
    // Apply CSS class based on status
    if (item.status) {
      args.element.classList.add(`status-${item.status}`);
    }
    
    // Add visual indicators
    if (item.status === 'completed') {
      args.element.classList.add('dot-completed');
    } else if (item.status === 'active') {
      args.element.classList.add('dot-active');
    }
  }
});

timeline.appendTo("#timeline");
```

**CSS Definition:**

```css
.status-completed {
  background: #e8f5e9;
  border-left: 4px solid #4CAF50;
}

.status-active {
  background: #fff3e0;
  border-left: 4px solid #FF9800;
}

.status-pending {
  background: #f3e5f5;
  border-left: 4px solid #9C27B0;
  opacity: 0.7;
}
```

## Common Use Cases

### Use Case 1: Progress Tracking

Automatically update progress display:

```typescript
let timeline: Timeline = new Timeline({
  items: items,
  created: () => {
    updateProgressBar();
  },
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    updateProgressBar();
  }
});

function updateProgressBar(): void {
  const totalItems = items.length;
  const completedItems = items.filter((item: any) => 
    item.status === 'completed'
  ).length;
  
  const percentage = (completedItems / totalItems) * 100;
  const progressBar = document.getElementById('progress');
  if (progressBar) {
    (progressBar as HTMLElement).style.width = percentage + '%';
  }
}

timeline.appendTo("#timeline");
```

### Use Case 2: Custom Item Counters

Add sequential numbering to items:

```typescript
const items: TimelineItemModel[] = [
  { content: 'Step One' },
  { content: 'Step Two' },
  { content: 'Step Three' }
];

let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    // Prepend number to content
    const number = args.index + 1;
    args.data.content = `${number}. ${args.data.content}`;
    
    // Or add with custom formatting
    args.element.setAttribute('data-step-number', number.toString());
  }
});

timeline.appendTo("#timeline");
```

### Use Case 3: Conditional Styling Based on Data

Apply different styles based on item data:

```typescript
interface DataItem extends TimelineItemModel {
  priority?: 'high' | 'medium' | 'low';
}

const items: DataItem[] = [
  { content: 'Critical Task', priority: 'high' },
  { content: 'Regular Task', priority: 'medium' },
  { content: 'Low Priority', priority: 'low' }
];

let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    const item = args.data as DataItem;
    
    if (item.priority === 'high') {
      item.cssClass = 'priority-high';
      args.element.style.borderLeftColor = 'red';
    } else if (item.priority === 'medium') {
      item.cssClass = 'priority-medium';
    } else {
      item.cssClass = 'priority-low';
    }
  }
});

timeline.appendTo("#timeline");
```

### Use Case 4: Analytics and Logging

Track rendering events for analytics:

```typescript
let renderCount = 0;

let timeline: Timeline = new Timeline({
  items: items,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    renderCount++;
    console.log(`Rendering item ${args.index + 1}/${items.length}`);
  },
  created: () => {
    console.log(`Timeline render complete. Total renders: ${renderCount}`);
    // Send analytics
    trackEvent('timeline_rendered', { item_count: items.length });
  }
});

function trackEvent(eventName: string, data: any): void {
  // Send to analytics service
  console.log(`Event: ${eventName}`, data);
}

timeline.appendTo("#timeline");
```

## Event Examples

### Complete Example: Complex Event Handling

```typescript
import { Timeline, TimelineItemModel, TimelineRenderingEventArgs } from '@syncfusion/ej2-layouts';

interface OrderItem extends TimelineItemModel {
  status?: string;
  timestamp?: string;
  amount?: number;
}

const orderTimeline: OrderItem[] = [
  { content: 'Order Placed', status: 'completed', amount: 120 },
  { content: 'Processing', status: 'completed', amount: 120 },
  { content: 'Shipped', status: 'active', amount: 120 },
  { content: 'In Transit', status: 'pending', amount: 120 },
  { content: 'Delivered', status: 'pending', amount: 120 }
];

let timeline: Timeline = new Timeline({
  items: orderTimeline,
  cssClass: 'order-timeline',
  
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    const item = args.data as OrderItem;
    
    // Add progressive styling
    if (item.status === 'completed') {
      item.cssClass = (item.cssClass || '') + ' status-completed';
      item.dotCss = 'dot-checkmark';
    } else if (item.status === 'active') {
      item.cssClass = (item.cssClass || '') + ' status-active';
      item.dotCss = 'dot-active';
    } else {
      item.cssClass = (item.cssClass || '') + ' status-pending';
    }
    
    // Add metadata attributes
    args.element.setAttribute('data-status', item.status || '');
    args.element.setAttribute('data-amount', item.amount?.toString() || '');
    args.element.setAttribute('data-order-step', (args.index + 1).toString());
  },
  
  created: () => {
    // Calculate completion percentage
    const total = orderTimeline.length;
    const completed = orderTimeline.filter(
      (item: OrderItem) => item.status === 'completed'
    ).length;
    const percentage = (completed / total) * 100;
    
    console.log(`Order ${percentage}% complete`);
    
    // Update UI
    const progressElement = document.getElementById('order-progress');
    if (progressElement) {
      progressElement.style.width = percentage + '%';
      progressElement.textContent = `${Math.round(percentage)}%`;
    }
    
    // Add completion indicator to last completed item
    if (completed > 0) {
      const items = document.querySelectorAll('.e-timeline-item');
      if (items[completed - 1]) {
        items[completed - 1].classList.add('last-completed');
      }
    }
  }
});

timeline.appendTo("#timeline");
```

This comprehensive guide covers all event handling aspects of the Timeline control, from basic usage to complex scenarios.
