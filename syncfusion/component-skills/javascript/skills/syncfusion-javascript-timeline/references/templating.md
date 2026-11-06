# Templating and Custom Rendering

## Table of Contents
- [Overview](#overview)
- [Template Basics](#template-basics)
- [Template Context](#template-context)
- [Creating Templates](#creating-templates)
- [Template Patterns](#template-patterns)
- [Best Practices](#best-practices)

## Overview

The Timeline control allows you to customize the appearance of each item using the `template` property. This enables complete control over:

- Dot items (icons, images, text)
- Item content rendering
- Progress bars and visual indicators
- Complex HTML layouts per item
- Dynamic styling per item

The template system uses JSRender, a lightweight templating engine that provides conditional rendering, data binding, and iteration capabilities.

## Template Basics

### Using the template Property

Specify a template using a selector that points to an HTML `<script>` element with `type="text/x-jsrender"`:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const projectMilestones: TimelineItemModel[] = [
  { content: 'Kickoff meeting' },
  { content: 'Content approved' },
  { content: 'Design approved' },
  { content: 'Product delivered' }
];

let timeline: Timeline = new Timeline({
  items: projectMilestones,
  orientation: 'Horizontal',
  template: '#timeline-template',
  cssClass: 'custom-timeline'
});

timeline.appendTo("#timeline");
```

### Template Element

Define your template in an HTML `<script>` tag with `type="text/x-jsrender"` and a unique `id`:

```html
<script id="timeline-template" type="text/x-jsrender">
    <!-- Your template HTML goes here -->
</script>
```

## Template Context

Within a template, you have access to context variables that provide information about each item:

| Variable | Type | Description |
|----------|------|-------------|
| `item` | TimelineItemModel | The current item's data object |
| `itemIndex` | number | The 0-based index of the current item |

### Accessing Item Data

```html
<script id="timeline-template" type="text/x-jsrender">
    <div class="template-content">
        <p>Index: ${itemIndex}</p>
        <p>Content: ${item.content}</p>
        <p>Opposite: ${item.oppositeContent}</p>
    </div>
</script>
```

### Conditional Rendering

Use JSRender's conditional syntax to show different content based on item index or data:

```html
<script id="timeline-template" type="text/x-jsrender">
    <div class="item-${itemIndex}">
        ${if(itemIndex == 0)}
            <div class="first-item">This is the first item!</div>
        ${else if(itemIndex == 3)}
            <div class="last-item">This is the last item!</div>
        ${else}
            <div class="middle-item">Middle item</div>
        ${/if}
    </div>
</script>
```

## Creating Templates

### Basic Template Structure

Here's a simple template that wraps content in a styled container:

```typescript
let timeline: Timeline = new Timeline({
  items: projectMilestones,
  template: '#basic-template'
});

timeline.appendTo("#timeline");
```

```html
<script id="basic-template" type="text/x-jsrender">
    <div class="template-wrapper">
        <div class="template-content">
            ${item.content}
        </div>
    </div>
</script>
```

### Template with Progress Indicator

Create a template showing progress or stages:

```typescript
const stages: TimelineItemModel[] = [
  { content: 'Stage 1: Planning' },
  { content: 'Stage 2: Design' },
  { content: 'Stage 3: Development' },
  { content: 'Stage 4: Testing' }
];

let timeline: Timeline = new Timeline({
  items: stages,
  orientation: 'Horizontal',
  template: '#progress-template'
});

timeline.appendTo("#timeline");
```

```html
<script id="progress-template" type="text/x-jsrender">
    <div class="progress-container item-${itemIndex}">
        <div class="progress-header">
            <span class="stage-number">${itemIndex + 1}</span>
            <span class="stage-name">${item.content}</span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
    </div>
</script>
```

CSS Styling:
```css
.progress-container {
    padding: 16px;
    text-align: center;
    position: relative;
}

.progress-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.stage-number {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    background: #2196F3;
    color: white;
    border-radius: 50%;
    font-weight: bold;
}

.progress-bar {
    width: 100%;
    height: 4px;
    background: #e0e0e0;
    margin-top: 8px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #2196F3;
    width: 100%;
}
```

### Template with Icons and Images

Create visually rich templates with icons or images:

```html
<script id="icon-template" type="text/x-jsrender">
    <div class="icon-container item-${itemIndex}">
        <div class="icon-box">
            ${if(itemIndex == 0)}
                <span class="icon">📋</span>
            ${else if(itemIndex == 1)}
                <span class="icon">🎨</span>
            ${else if(itemIndex == 2)}
                <span class="icon">💻</span>
            ${else if(itemIndex == 3)}
                <span class="icon">✅</span>
            ${/if}
        </div>
        <div class="icon-label">${item.content}</div>
    </div>
</script>
```

CSS:
```css
.icon-container {
    text-align: center;
    padding: 12px;
}

.icon-box {
    font-size: 32px;
    margin-bottom: 8px;
}

.icon {
    display: inline-block;
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: 28px;
    background: #f5f5f5;
    border-radius: 8px;
}

.icon-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
}
```

## Template Patterns

### Pattern 1: Status-Based Styling Template

Different styling based on item content or status:

```html
<script id="status-template" type="text/x-jsrender">
    <div class="status-item ${getStatusClass(itemIndex)}">
        <div class="status-content">${item.content}</div>
        <div class="status-indicator"></div>
    </div>
</script>
```

TypeScript:
```typescript
const items: TimelineItemModel[] = [
  { content: 'Completed' },
  { content: 'In Progress' },
  { content: 'Pending' }
];

let timeline: Timeline = new Timeline({
  items: items,
  template: '#status-template',
  cssClass: 'status-timeline'
});

timeline.appendTo("#timeline");
```

CSS:
```css
.status-item.completed {
    background: #e8f5e9;
    border-left: 4px solid #4CAF50;
}

.status-item.in-progress {
    background: #fff3e0;
    border-left: 4px solid #FF9800;
    animation: pulse 1s infinite;
}

.status-item.pending {
    background: #f3e5f5;
    border-left: 4px solid #9C27B0;
    opacity: 0.7;
}

.status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-top: 8px;
}

.status-item.completed .status-indicator {
    background: #4CAF50;
}

.status-item.in-progress .status-indicator {
    background: #FF9800;
}

.status-item.pending .status-indicator {
    background: #9C27B0;
}
```

### Pattern 2: Complex HTML Template

Multi-level nested structure with rich content:

```html
<script id="complex-template" type="text/x-jsrender">
    <div class="complex-item item-${itemIndex}">
        <div class="timeline-content">
            <div class="content-header">
                <h4>${item.content}</h4>
                <span class="badge">${itemIndex + 1}</span>
            </div>
            <div class="content-body">
                ${if(item.oppositeContent)}
                    <p class="description">${item.oppositeContent}</p>
                ${/if}
            </div>
            <div class="content-footer">
                <span class="date">Date: Jan ${itemIndex + 1}, 2024</span>
            </div>
        </div>
        <div class="timeline-dot-custom"></div>
        <div class="timeline-connector"></div>
    </div>
</script>
```

CSS:
```css
.complex-item {
    position: relative;
    padding: 12px 16px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 12px 0;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.content-header h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.badge {
    background: #2196F3;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.content-body {
    margin-bottom: 8px;
}

.description {
    margin: 8px 0;
    color: #666;
    font-size: 14px;
}

.content-footer {
    border-top: 1px solid #f0f0f0;
    padding-top: 8px;
    color: #999;
    font-size: 12px;
}
```

### Pattern 3: Data-Driven Template

Template that uses multiple properties from item data:

```typescript
interface CustomItem extends TimelineItemModel {
  status?: 'completed' | 'active' | 'pending';
  date?: string;
  icon?: string;
}

const items: CustomItem[] = [
  { 
    content: 'Phase 1', 
    oppositeContent: 'Planning',
    status: 'completed',
    date: 'Jan 1-5'
  },
  { 
    content: 'Phase 2', 
    oppositeContent: 'Development',
    status: 'active',
    date: 'Jan 6-20'
  },
  { 
    content: 'Phase 3', 
    oppositeContent: 'Testing',
    status: 'pending',
    date: 'Jan 21-30'
  }
];

let timeline: Timeline = new Timeline({
  items: items,
  template: '#data-template'
});

timeline.appendTo("#timeline");
```

```html
<script id="data-template" type="text/x-jsrender">
    <div class="data-item status-${item.status}">
        <div class="item-main">${item.content}</div>
        <div class="item-sub">${item.oppositeContent}</div>
        <div class="item-meta">${item.date}</div>
    </div>
</script>
```

## Best Practices

### 1. Keep Templates Simple
Complex logic should be in TypeScript, not templates. Templates should focus on rendering.

✅ **Good:**
```html
<script id="simple-template" type="text/x-jsrender">
    <div>${item.content}</div>
</script>
```

❌ **Avoid:**
```html
<script id="complex-template" type="text/x-jsrender">
    ${if(complex_calculation(item))}
        <!-- Complex nested logic -->
    ${/if}
</script>
```

### 2. Use CSS Classes for Styling
Apply styles via CSS classes rather than inline styles in templates.

✅ **Good:**
```html
<div class="item-status-${itemIndex}"></div>
```

### 3. Responsive Templates
Ensure templates work on different screen sizes:

```html
<script id="responsive-template" type="text/x-jsrender">
    <div class="responsive-item">
        <div class="item-content">${item.content}</div>
    </div>
</script>
```

CSS:
```css
@media (max-width: 768px) {
    .responsive-item {
        flex-direction: column;
        padding: 8px;
    }
}
```

### 4. Accessibility
Include proper ARIA labels and semantic HTML:

```html
<script id="accessible-template" type="text/x-jsrender">
    <div class="timeline-item" role="listitem" aria-label="${item.content}">
        <div class="item-number" aria-label="Item ${itemIndex + 1}">${itemIndex + 1}</div>
        <div class="item-text">${item.content}</div>
    </div>
</script>
```

### 5. Reusable Template Section

Create a single template that handles multiple item types:

```html
<script id="unified-template" type="text/x-jsrender">
    <div class="timeline-item item-type-${item.type || 'default'}">
        <div class="item-header">
            <span class="item-title">${item.content}</span>
            ${if(item.oppositeContent)}
                <span class="item-subtitle">${item.oppositeContent}</span>
            ${/if}
        </div>
        <div class="item-body">
            ${if(itemIndex % 2 === 0)}
                <div class="primary-action">Primary</div>
            ${else}
                <div class="secondary-action">Secondary</div>
            ${/if}
        </div>
    </div>
</script>
```

This comprehensive guide covers all aspects of templating in the Timeline control, from basic usage to advanced patterns and best practices.
