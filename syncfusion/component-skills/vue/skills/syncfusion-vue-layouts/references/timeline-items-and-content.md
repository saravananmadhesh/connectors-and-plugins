# Timeline Items and Content (Vue 3)

## Table of Contents
- [Items Array Property](#items-array-property)
- [String Content and Multiline Strings](#string-content-and-multiline-strings)
- [Template-Based Content with Slots/Props](#template-based-content-with-slotsprops)
- [Opposite Content Configuration](#opposite-content-configuration)
- [Dot Customization](#dot-customization)
- [Disabling Items](#disabling-items)
- [Per-Item CSS Classes](#per-item-css-classes)

## Items Array Property

### Pass Items as Data

```vue
<template>
  <div style="height: 350px;">
    <TimelineComponent :items="timelineItems" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent } from '@syncfusion/ej2-vue-layouts';

const timelineItems = ref([
  { content: 'Order Placed', oppositeContent: 'Jan 15' },
  { content: 'Order Shipped', oppositeContent: 'Jan 16' },
  { content: 'Out for Delivery', oppositeContent: 'Jan 18' },
  { content: 'Delivered', oppositeContent: 'Jan 19' }
]);
</script>
```

### TypeScript Interface

```ts
interface TimelineItem {
  content?: string | HTMLElement | Function;
  oppositeContent?: string | HTMLElement | Function;
  dotCss?: string;
  disabled?: boolean;
  cssClass?: string;
}
```

## String Content and Multiline Strings

### Single-Line Content

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Single line event" />
    </e-items>
  </TimelineComponent>
</template>
```

### Multiline Content

Use `\n` (newline character) for multi-line content:

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item :content="multilineContent" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const multilineContent = 'First line\nSecond line\nThird line';
</script>
```

## Template-Based Content with Slots/Props

### Function-Based Content

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item :content="renderItem" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const renderItem = () => {
  const div = document.createElement('div');
  div.className = 'custom-item';
  div.innerHTML = `
    <strong>Custom</strong>
    <p>Rendered content</p>
  `;
  return div;
};
</script>
```

### Dynamic Content with Reactive State

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item
        v-for="event in events"
        :key="event.id"
        :content="(el) => renderEvent(el, event)"
      />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemDirective, ItemsDirective } from '@syncfusion/ej2-vue-layouts';

const events = ref([
  { id: 1, title: 'Meeting', time: '10:00', description: 'Team sync' },
  { id: 2, title: 'Lunch', time: '12:30', description: 'With client' },
  { id: 3, title: 'Call', time: '14:00', description: 'Project review' }
]);

const renderEvent = (el, event) => {
  el.innerHTML = `
    <div class="event-item">
      <strong>${event.title}</strong>
      <div class="event-time">${event.time}</div>
      <p>${event.description}</p>
    </div>
  `;
};
</script>

<style>
.event-item {
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
.event-time {
  color: #666;
  font-size: 12px;
  margin: 4px 0;
}
</style>
```

## Opposite Content Configuration

### Single Opposite Content

```vue
<template>
  <TimelineComponent align="Alternate">
    <e-items>
      <e-item content="Event Title" oppositeContent="2026-01-15" />
    </e-items>
  </TimelineComponent>
</template>
```

### Different Content for Each Item

```vue
<template>
  <TimelineComponent align="Alternate">
    <e-items>
      <e-item content="Planned" oppositeContent="Q1 2026" />
      <e-item content="In Progress" oppositeContent="Q2 2026" />
      <e-item content="Completed" oppositeContent="Q3 2026" />
    </e-items>
  </TimelineComponent>
</template>
```

## Dot Customization

### Custom Icon as Dot

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Shipped" dotCss="e-icons e-package" />
      <e-item content="Delivered" dotCss="e-icons e-check" />
    </e-items>
  </TimelineComponent>
</template>
```

### Custom Color via dotCss

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Critical" dotCss="e-danger" />
      <e-item content="Warning" dotCss="e-warning" />
      <e-item content="Success" dotCss="e-success" />
    </e-items>
  </TimelineComponent>
</template>
```

### Custom Image as Dot

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Avatar Event" dotCss="e-avatar" />
    </e-items>
  </TimelineComponent>
</template>
```

### Custom Dot via Function

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item :content="renderContent" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const renderContent = (el) => {
  el.innerHTML = `
    <div class="custom-dot-event">
      <div class="dot-icon">★</div>
      <div class="event-content">Custom dot event</div>
    </div>
  `;
};
</script>

<style>
.custom-dot-event {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dot-icon {
  width: 24px;
  height: 24px;
  background: gold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## Disabling Items

### Disable Specific Items

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Active Event" :disabled="false" />
      <e-item content="Disabled Event" :disabled="true" />
      <e-item content="Another Active" :disabled="false" />
    </e-items>
  </TimelineComponent>
</template>
```

### Disabled Item Styling

```vue
<style>
.e-timeline .e-timeline-item.e-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
```

## Per-Item CSS Classes

### Apply Custom Classes

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Standard" />
      <e-item content="Highlighted" cssClass="highlight-item" />
      <e-item content="Critical" cssClass="critical-item" />
    </e-items>
  </TimelineComponent>
</template>

<style>
.highlight-item {
  background: #fff3cd;
  padding: 8px;
  border-left: 3px solid #ffc107;
}

.critical-item {
  background: #f8d7da;
  padding: 8px;
  border-left: 3px solid #dc3545;
}
</style>
```

## Best Practices

1. **Use function templates for complex content**: Better than inline HTML strings

2. **Keep content concise**: Timeline works best with short text

3. **Use opposite content for metadata**: Dates, times, durations

4. **Use dotCss for visual variety**: Highlight important events

5. **Disable items to indicate state**: Show pending or inactive events

6. **Use per-item classes for styling**: Custom appearance per item

7. **Sanitize user content**: When displaying user-provided data

**Next:** Learn about [styling and customization](timeline-styling-and-customization.md) for themes.
