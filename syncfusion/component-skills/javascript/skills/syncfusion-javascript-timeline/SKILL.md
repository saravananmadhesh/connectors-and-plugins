---
name: syncfusion-javascript-timeline
description: Create and configure Syncfusion TypeScript Timeline control for displaying sequential events and chronological content. Use this skill when implementing timeline layouts, milestone tracking, process flows, progress indicators, or visualizing ordered sequences. This skill covers project milestones, career progression, order status tracking, itinerary planning, and procedural workflow visualization using Syncfusion Timeline.
metadata:
  author: "Syncfusion Inc"
  category: "Layouts"
  version: "34.1.29"
---

# Implementing Syncfusion TypeScript Timeline

## When to Use This Skill

Use this skill when you need to:
- Display items in chronological or sequential order
- Visualize timelines, milestones, or event progression
- Show workflow steps or process flows
- Create status tracking displays (order tracking, project milestones, career paths)
- Arrange content in Before, After, Alternate, or Reverse alignments
- Customize timeline appearance with dots, connectors, and styles
- Handle timeline events like lifecycle and rendering callbacks
- Use horizontal or vertical orientations for timeline layout

## Timeline Control Overview

The Syncfusion TypeScript Timeline control displays content items in a sequential or chronological layout. It supports:

- **Multiple Alignments:** Before, After, Alternate, AlternateReverse
- **Orientations:** Horizontal and Vertical layouts
- **Rich Content:** String content, templated content, or opposite content
- **Customization:** Dot styling, connector customization, CSS classes
- **Events:** Created, beforeItemRender lifecycle events
- **Reverse Mode:** Display items in reverse order
- **Advanced Templates:** Full control over item appearance

## Quick Start Guide

### Basic Timeline Creation

```typescript
import { Timeline } from '@syncfusion/ej2-layouts';

// Create timeline items
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}]
});

// Render to DOM element
timeline.appendTo("#timeline");
```

### Timeline with Content

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const items: TimelineItemModel[] = [
  { content: 'Item 1' },
  { content: 'Item 2' },
  { content: 'Item 3' }
];

let timeline: Timeline = new Timeline({
  items: items,
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

## Core Concepts

### Key Properties

- **`items`** - Array of TimelineItemModel objects defining timeline items
- **`orientation`** - Display direction: `Vertical` (default) or `Horizontal`
- **`align`** - Content alignment: `Before`, `After`, `Alternate`, `AlternateReverse`
- **`reverse`** - Boolean to display items in reverse order
- **`template`** - HTML template selector for custom item rendering
- **`cssClass`** - Custom CSS class for styling the timeline container
- **`created`** - Event triggered when timeline rendering completes
- **`beforeItemRender`** - Event triggered before each item renders

### TimelineItemModel Properties

- **`content`** - Main content (string or template selector)
- **`oppositeContent`** - Opposite-side content (string or template selector)
- **`dotCss`** - CSS class for dot customization
- **`cssClass`** - CSS class for individual item styling
- **`disabled`** - Boolean to disable specific items

## Documentation and Navigation Guide

### Getting Started & Setup
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and dependencies
- Development environment setup
- CSS style imports and theming
- Basic timeline creation and initialization
- First working example

### Items, Content & Opposite Content
📄 **Read:** [references/items-and-content.md](references/items-and-content.md)
- Adding string content to items
- Using templated content with selectors
- Configuring oppositeContent property
- Disabling specific timeline items
- Custom CSS classes for items
- Dot customization with dotCss property

### Alignment & Orientation Modes
📄 **Read:** [references/alignment-and-orientation.md](references/alignment-and-orientation.md)
- Before alignment (content positioning)
- After alignment (reversed content positioning)
- Alternate alignment (alternating arrangement)
- AlternateReverse alignment (reverse alternating)
- Vertical orientation (default, stacked vertically)
- Horizontal orientation (side-by-side layout)
- Layout combinations and use cases

### Customization & Styling
📄 **Read:** [references/customization-styling.md](references/customization-styling.md)
- Common connector styling (all connectors)
- Individual connector styling (per-item styling)
- Dot color customization
- Dot size adjustment with CSS variables
- Dot border and outline styling
- CSS selector patterns for customization
- Advanced styling techniques

### Templating & Custom Rendering
📄 **Read:** [references/templating.md](references/templating.md)
- Template property and template selectors
- Template context (item, itemIndex)
- Advanced HTML template usage
- Dot customization within templates
- Progress line styling
- Template best practices and patterns

### Events & Lifecycle Hooks
📄 **Read:** [references/events-and-lifecycle.md](references/events-and-lifecycle.md)
- Created event (triggered on render complete)
- beforeItemRender event (triggered before each item renders)
- TimelineRenderingEventArgs for event handling
- Using events for initialization and customization
- Event callback patterns

### Reverse Layout Mode
📄 **Read:** [references/reverse-layout.md](references/reverse-layout.md)
- Reverse property for reverse item ordering
- Use cases for reverse display
- Reverse with different alignments
- Combining reverse with orientations

### Complete API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)
- **Properties & Defaults** - All 9 Timeline properties with types and default values
- **Methods** - All 7 Timeline methods (addEventListener, appendTo, dataBind, etc.)
- **Events & Arguments** - beforeItemRender and created events with TimelineRenderingEventArgs
- **Item Configuration** - All 5 TimelineItemModel properties
- **Enumerations** - TimelineAlign and TimelineOrientation values
- **Quick Setup Example** - Complete working configuration

## Common Patterns

### Status Tracking Timeline
Display sequential status updates with custom styling:
```typescript
const status = [
  { content: 'Ordered', cssClass: 'state-completed' },
  { content: 'Shipped', cssClass: 'state-progress' },
  { content: 'Delivered' }
];

let timeline: Timeline = new Timeline({
  items: status,
  cssClass: 'status-timeline'
});
```

### Dual-Content Timeline
Show main content with opposite context information:
```typescript
const events = [
  { content: 'Day 1, 4:00 PM', oppositeContent: 'Check-in' },
  { content: 'Day 1, 7:00 PM', oppositeContent: 'Dinner' }
];

let timeline: Timeline = new Timeline({
  items: events,
  align: 'Alternate',
  orientation: 'Vertical'
});
```

### Horizontal Milestone Timeline
Display project milestones horizontally:
```typescript
let timeline: Timeline = new Timeline({
  items: milestones,
  orientation: 'Horizontal',
  align: 'Before'
});
```

## Setup Requirements

### Dependencies
```
@syncfusion/ej2-layouts
  └── @syncfusion/ej2-base
```

### CSS Imports
```css
@import "@syncfusion/ej2-base/styles/fluent2.css";
@import "@syncfusion/ej2-layouts/styles/fluent2.css";
```

### HTML Element
```html
<div id="timeline"></div>
```

---

**Ready to implement?** Choose a reference guide above based on your current task, or start with [Getting Started](references/getting-started.md) for setup instructions.
