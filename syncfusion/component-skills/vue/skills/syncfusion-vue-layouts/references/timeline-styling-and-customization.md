# Timeline Styling & Customization (Vue 3)

## Table of Contents
- [Connector Styling](#connector-styling)
- [Dot Color, Size, and Variants](#dot-color-size-and-variants)
- [CSS Custom Properties](#css-custom-properties)
- [e-outline Class Usage](#e-outline-class-usage)
- [Complete Customization Examples](#complete-customization-examples)

## Connector Styling

### Default Connector

The connector is the line that connects timeline items. By default, it inherits the theme accent color.

### Custom Connector Color

```css
.e-timeline .e-connector {
  background-color: #ff5722;
}
```

### Custom Connector Width

```css
/* Horizontal timeline */
.e-timeline.e-horizontal .e-connector {
  height: 3px;
}

/* Vertical timeline */
.e-timeline.e-vertical .e-connector {
  width: 3px;
}
```

### Per-Item Connector Color

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Item 1" cssClass="connector-red" />
      <e-item content="Item 2" cssClass="connector-blue" />
    </e-items>
  </TimelineComponent>
</template>

<style>
.connector-red + * .e-connector {
  background-color: red;
}
.connector-blue + * .e-connector {
  background-color: blue;
}
</style>
```

### Dashed Connector

```css
.e-timeline .e-connector {
  background: repeating-linear-gradient(
    to bottom,
    #999 0,
    #999 4px,
    transparent 4px,
    transparent 8px
  );
}
```

### Gradient Connector

```css
.e-timeline .e-connector {
  background: linear-gradient(to bottom, #ff5722, #ffc107, #4caf50);
}
```

## Dot Color, Size, and Variants

### Dot Color

```css
/* All dots */
.e-timeline .e-dot {
  background-color: #2196f3;
  border-color: #1976d2;
}

/* Per-item dot color */
.e-timeline .e-dot.e-primary { background: #2196f3; }
.e-timeline .e-dot.e-success { background: #4caf50; }
.e-timeline .e-dot.e-warning { background: #ff9800; }
.e-timeline .e-dot.e-danger { background: #f44336; }
```

### Dot Size

```css
.e-timeline .e-dot {
  width: 16px;
  height: 16px;
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
}
```

### Dot Shadow and Outline

```css
.e-timeline .e-dot {
  background: #2196f3;
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}
```

### Dot Variants

```css
/* Square dot */
.e-timeline .e-dot.square {
  border-radius: 0;
}

/* Diamond dot */
.e-timeline .e-dot.diamond {
  border-radius: 0;
  transform: rotate(45deg);
}

/* Outline dot (no fill) */
.e-timeline .e-dot.outline {
  background: transparent;
  border: 2px solid #2196f3;
}
```

### Pulsing Dot

```css
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
  100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
}

.e-timeline .e-dot.pulse {
  background: #2196f3;
  animation: pulse 2s infinite;
}
```

## CSS Custom Properties

Define theme variables for easy theming:

```css
:root {
  --dot-size: 16px;
  --dot-color: #2196f3;
  --dot-border: white;
  --dot-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
  --connector-color: #e0e0e0;
  --connector-width: 2px;
  --content-spacing: 12px;
  --item-spacing: 24px;
}

[data-theme="dark"] {
  --dot-color: #4d9fff;
  --dot-border: #1e1e1e;
  --connector-color: #444;
}

.e-timeline .e-dot {
  width: var(--dot-size);
  height: var(--dot-size);
  background: var(--dot-color);
  border: 2px solid var(--dot-border);
  box-shadow: var(--dot-shadow);
}

.e-timeline .e-connector {
  background: var(--connector-color);
}

.e-timeline.e-vertical .e-connector {
  width: var(--connector-width);
}

.e-timeline.e-horizontal .e-connector {
  height: var(--connector-width);
}
```

## e-outline Class Usage

Apply the `e-outline` class for outlined (hollow) dots:

```vue
<template>
  <TimelineComponent cssClass="outline-timeline">
    <e-items>
      <e-item content="Outlined event" />
    </e-items>
  </TimelineComponent>
</template>

<style>
.outline-timeline .e-dot {
  background: transparent;
  border: 2px solid #2196f3;
}
</style>
```

### Per-Item Outline

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Filled" cssClass="filled-dot" />
      <e-item content="Outlined" cssClass="outlined-dot" />
    </e-items>
  </TimelineComponent>
</template>

<style>
.filled-dot .e-dot { background: #2196f3; }
.outlined-dot .e-dot { background: transparent; border: 2px solid #2196f3; }
</style>
```

## Complete Customization Examples

### Example 1: Project Milestones

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent cssClass="milestone-timeline">
      <e-items>
        <e-item
          v-for="(milestone, i) in milestones"
          :key="i"
          :content="milestone.title"
          :oppositeContent="milestone.date"
          :cssClass="`milestone-${milestone.status}`"
        />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const milestones = ref([
  { title: 'Kickoff', date: 'Jan 2026', status: 'completed' },
  { title: 'Design Review', date: 'Feb 2026', status: 'completed' },
  { title: 'Development', date: 'Mar 2026', status: 'in-progress' },
  { title: 'Beta Release', date: 'Apr 2026', status: 'pending' },
  { title: 'Launch', date: 'May 2026', status: 'pending' }
]);
</script>

<style>
.milestone-timeline .e-dot {
  width: 18px;
  height: 18px;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #ccc;
}

.milestone-completed .e-dot {
  background: #4caf50;
  box-shadow: 0 0 0 2px #4caf50, 0 0 0 5px rgba(76, 175, 80, 0.2);
}

.milestone-in-progress .e-dot {
  background: #ff9800;
  box-shadow: 0 0 0 2px #ff9800, 0 0 0 5px rgba(255, 152, 0, 0.2);
  animation: pulse-orange 2s infinite;
}

.milestone-pending .e-dot {
  background: #e0e0e0;
}

@keyframes pulse-orange {
  0% { box-shadow: 0 0 0 2px #ff9800, 0 0 0 5px rgba(255, 152, 0, 0.4); }
  70% { box-shadow: 0 0 0 2px #ff9800, 0 0 0 10px rgba(255, 152, 0, 0); }
  100% { box-shadow: 0 0 0 2px #ff9800, 0 0 0 5px rgba(255, 152, 0, 0); }
}
</style>
```

### Example 2: Activity Feed

```vue
<template>
  <div style="height: 500px;">
    <TimelineComponent cssClass="activity-feed">
      <e-items>
        <e-item
          v-for="(activity, i) in activities"
          :key="i"
          :content="(el) => renderActivity(el, activity)"
        />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const activities = ref([
  { type: 'comment', user: 'Alice', text: 'Posted a comment', time: '2m ago' },
  { type: 'edit', user: 'Bob', text: 'Updated the document', time: '15m ago' },
  { type: 'create', user: 'Carol', text: 'Created new project', time: '1h ago' }
]);

const renderActivity = (el, activity) => {
  el.innerHTML = `
    <div class="activity-item activity-${activity.type}">
      <div class="activity-user">${activity.user}</div>
      <div class="activity-text">${activity.text}</div>
      <div class="activity-time">${activity.time}</div>
    </div>
  `;
};
</script>

<style>
.activity-feed .e-dot {
  width: 12px;
  height: 12px;
}

.activity-comment .e-dot { background: #2196f3; }
.activity-edit .e-dot { background: #ff9800; }
.activity-create .e-dot { background: #4caf50; }

.activity-item {
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 3px solid #ddd;
}

.activity-user { font-weight: bold; }
.activity-time { font-size: 11px; color: #999; }
</style>
```

### Example 3: Order Tracking

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent cssClass="order-tracking">
      <e-items>
        <e-item content="Order Placed" cssClass="step-done" />
        <e-item content="Payment Confirmed" cssClass="step-done" />
        <e-item content="Shipped" cssClass="step-current" />
        <e-item content="Out for Delivery" cssClass="step-pending" />
        <e-item content="Delivered" cssClass="step-pending" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<style>
.order-tracking .e-dot {
  width: 20px;
  height: 20px;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #ccc;
}

.order-tracking .step-done .e-dot {
  background: #4caf50;
  box-shadow: 0 0 0 2px #4caf50;
}

.order-tracking .step-current .e-dot {
  background: #ff9800;
  box-shadow: 0 0 0 2px #ff9800;
  animation: pulse-current 1.5s infinite;
}

.order-tracking .step-pending .e-dot {
  background: #e0e0e0;
}

.order-tracking .step-pending .e-timeline-content {
  opacity: 0.5;
}

@keyframes pulse-current {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
</style>
```

## Best Practices

1. **Use CSS variables for theming**: Maintainable across themes

2. **Animate current/active states**: Use pulse for in-progress items

3. **Color-code by status**: Consistent color language for states

4. **Match dot size to context**: Larger dots for emphasis, smaller for subtle

5. **Provide visual feedback**: Hover states, focus indicators

6. **Test dark mode**: Ensure contrast in all themes

7. **Use semantic colors**: Green for success, red for danger, etc.

**Next:** Learn about [events and callbacks](timeline-events-and-callbacks.md).
