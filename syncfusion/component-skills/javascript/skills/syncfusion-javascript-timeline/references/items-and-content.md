# Items and Content Configuration

## Table of Contents
- [Overview](#overview)
- [Adding String Content](#adding-string-content)
- [Template Content](#template-content)
- [Opposite Content](#opposite-content)
- [Dot Customization](#dot-customization)
- [Disabling Items](#disabling-items)
- [Custom CSS Classes](#custom-css-classes)

## Overview

Timeline items are configured using the `items` property, which accepts an array of `TimelineItemModel` objects. Each item can be customized with various properties to control appearance and behavior.

### TimelineItemModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | string or function | Main content for the item |
| `oppositeContent` | string or function | Content displayed on opposite side |
| `dotCss` | string | CSS class for dot customization |
| `cssClass` | string | CSS class for item styling |
| `disabled` | boolean | Disables the item when true |

## Adding String Content

### Basic String Content

Define simple text content for Timeline items using the `content` property:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const orderStatus: TimelineItemModel[] = [
  { content: 'Shipped' },
  { content: 'Departed' },
  { content: 'Arrived' },
  { content: 'Out for Delivery' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
});

timeline.appendTo("#timeline");
```

This creates a timeline with four items, each displaying simple text content. Content is positioned according to the timeline's `align` property (default is vertical layout).

### Multiple Items with Different Content

Create timelines with varied content representing different stages or events:

```typescript
const projectMilestones: TimelineItemModel[] = [
  { content: 'Project Kickoff' },
  { content: 'Requirements Gathering' },
  { content: 'Design Review' },
  { content: 'Development Sprint' },
  { content: 'Testing Phase' },
  { content: 'Release' }
];

let timeline: Timeline = new Timeline({
  items: projectMilestones,
});

timeline.appendTo("#timeline");
```

## Template Content

### Using Template Selectors

Instead of plain strings, use template selectors to render complex HTML content. Define a template in your HTML with an `id` attribute, then reference it using the selector:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const orderStatus: TimelineItemModel[] = [
  { content: '#content-template' },
  { content: '#content-template' },
  { content: '#content-template' },
  { content: 'Out for Delivery' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
});

timeline.appendTo("#timeline");
```

### Template HTML

Define your template in the HTML with an `id`:

```html
<script id="content-template" type="text/x-jsrender">
    <div class="content-container">
        <div class="title">
            ${if(itemIndex==0)} Shipped
            ${else if(itemIndex==1)} Departed
            ${else if(itemIndex==2)} Arrived
            ${/if}
        </div>
        <span class="description">
            ${if(itemIndex==0)} Package details received
            ${else if(itemIndex==1)} In-transit
            ${else if(itemIndex==2)} Package arrived at nearest hub
            ${/if}
        </span>
        <div class="info">
            ${if(itemIndex==0)} - Awaiting dispatch
            ${else if(itemIndex==1)} (International warehouse)
            ${else if(itemIndex==2)} (New york - US)
            ${/if}
        </div>
    </div>
</script>
```

#### Template Context Variables

The template has access to:
- **`itemIndex`** - The index of the current item (0-based)
- **`item`** - The current TimelineItemModel data object

### Template Styling

Style your templates with CSS:

```css
.content-container {
    position: relative;
    width: 180px;
    padding: 10px;
    margin-left: 5px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px;
    background-color: ghostwhite;
}

.content-container::before {
    content: '';
    position: absolute;
    left: -8px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 8px solid silver;
}

.content-container .title {
    font-size: 16px;
    font-weight: bold;
}

.content-container .description {
    color: #999999;
    font-size: 12px;
}

.content-container .info {
    color: #999999;
    font-size: 10px;
    margin-top: 5px;
}
```

## Opposite Content

### Adding Opposite Content

The `oppositeContent` property displays content on the opposite side of the timeline item. This is useful for showing supplementary information like dates, times, or descriptions.

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const mealTimes: TimelineItemModel[] = [
  { content: 'Breakfast', oppositeContent: '8:00 AM' },
  { content: 'Lunch', oppositeContent: '1:00 PM' },
  { content: 'Dinner', oppositeContent: '8:00 PM' },
];

let timeline: Timeline = new Timeline({
  items: mealTimes
});

timeline.appendTo("#timeline");
```

### Dual-Content Display

Combine content and oppositeContent for rich information display:

```typescript
const frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan You' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];

let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'Before'  // Content on one side, oppositeContent on other
});

timeline.appendTo("#timeline");
```

### Position of Opposite Content

The position of `oppositeContent` depends on the `align` property:
- **Before:** In horizontal orientation, oppositeContent is at bottom; in vertical, it's on right
- **After:** In horizontal orientation, oppositeContent is at top; in vertical, it's on left
- **Alternate:** Alternates between sides
- **AlternateReverse:** Alternates in reverse pattern

## Dot Customization

### Using dotCss Property

Customize the appearance of timeline dots (the circular markers) using the `dotCss` property. This allows you to add icons, change colors, or add images to each dot.

```typescript
const orderStatus: TimelineItemModel[] = [
  { content: 'Order Placed', dotCss: 'dot-icon-order' },
  { content: 'Shipped', dotCss: 'dot-icon-truck' },
  { content: 'Delivered', dotCss: 'dot-icon-check' }
];

let timeline: Timeline = new Timeline({
  items: orderStatus,
});

timeline.appendTo("#timeline");
```

### CSS Styling for Dots

Define the CSS classes for dots:

```css
/* Add icons using ::before or ::after pseudo-elements */
.dot-icon-order.e-dot::before {
    content: '📦';
    font-size: 14px;
}

.dot-icon-truck.e-dot::before {
    content: '🚚';
    font-size: 14px;
}

.dot-icon-check.e-dot::before {
    content: '✓';
    font-size: 14px;
    color: green;
    font-weight: bold;
}

/* Or add background images */
.dot-icon-order.e-dot {
    background-image: url('order-icon.png');
    background-size: cover;
    background-position: center;
}

/* Add text to dots */
.dot-icon-text.e-dot::after {
    content: 'A';
    position: absolute;
    font-size: 10px;
    color: white;
}
```

## Disabling Items

### Using disabled Property

Disable specific timeline items using the `disabled` property:

```typescript
const taskStatus: TimelineItemModel[] = [
  { content: 'Task 1 - Completed' },
  { content: 'Task 2 - In Progress' },
  { content: 'Task 3 - Not Started', disabled: true },
  { content: 'Task 4 - Not Started', disabled: true }
];

let timeline: Timeline = new Timeline({
  items: taskStatus,
});

timeline.appendTo("#timeline");
```

When disabled is `true`, the item appears grayed out or with reduced opacity.

## Custom CSS Classes

### Styling Individual Items

Add custom CSS classes to individual items using the `cssClass` property for targeted styling:

```typescript
const stageData: TimelineItemModel[] = [
  { content: 'Stage 1', cssClass: 'status-completed' },
  { content: 'Stage 2', cssClass: 'status-in-progress' },
  { content: 'Stage 3', cssClass: 'status-pending' }
];

let timeline: Timeline = new Timeline({
  items: stageData,
  cssClass: 'custom-timeline'
});

timeline.appendTo("#timeline");
```

### CSS Class Styling

Define CSS for custom classes:

```css
.custom-timeline .status-completed {
    background-color: #e8f5e9;
    border-left: 4px solid #4caf50;
}

.custom-timeline .status-in-progress {
    background-color: #fff3e0;
    border-left: 4px solid #ff9800;
}

.custom-timeline .status-pending {
    background-color: #f3e5f5;
    border-left: 4px solid #9c27b0;
}

/* Customize dot appearance per item */
.custom-timeline .status-completed .e-dot {
    background: #4caf50;
    border-color: #4caf50;
}

.custom-timeline .status-in-progress .e-dot {
    background: #ff9800;
    border-color: #ff9800;
}

.custom-timeline .status-pending .e-dot {
    background: #9c27b0;
    border-color: #9c27b0;
}
```

### Complete Example: Status Timeline

Combine all item configuration options:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const statusTimeline: TimelineItemModel[] = [
  {
    content: 'Order Placed',
    oppositeContent: 'Jan 15, 2024',
    cssClass: 'status-completed',
    dotCss: 'dot-icon-check'
  },
  {
    content: 'Processing',
    oppositeContent: 'Jan 16, 2024',
    cssClass: 'status-in-progress',
    dotCss: 'dot-icon-process'
  },
  {
    content: 'Shipped',
    oppositeContent: 'Jan 17, 2024',
    cssClass: 'status-completed',
    dotCss: 'dot-icon-truck'
  },
  {
    content: 'Delivery Pending',
    oppositeContent: 'Est. Jan 20, 2024',
    cssClass: 'status-pending',
    dotCss: 'dot-icon-pending'
  }
];

let timeline: Timeline = new Timeline({
  items: statusTimeline,
  align: 'Alternate',
  cssClass: 'order-status-timeline'
});

timeline.appendTo("#timeline");
```

This comprehensive example demonstrates string content, opposite content, custom CSS classes, and dot customization all working together to create a rich timeline visualization.
