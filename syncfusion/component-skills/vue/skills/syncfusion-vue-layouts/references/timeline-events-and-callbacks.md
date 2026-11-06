# Timeline Events and Callbacks (Vue 3)

## Table of Contents
- [created Event](#created-event)
- [beforeItemRender Event](#beforeitemrender-event)
- [TimelineRenderingEventArgs](#timelinerenderingeventargs)
- [Event Handling Patterns](#event-handling-patterns)

## created Event

Fired when the timeline component is rendered:

```vue
<template>
  <TimelineComponent :created="onCreated">
    <e-items>
      <e-item content="Event" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const onCreated = () => {
  console.log('Timeline rendered');
  // Initialize custom logic, fetch data, etc.
};
</script>
```

## beforeItemRender Event

Fired before each timeline item is rendered. Use to customize items dynamically.

### Basic Usage

```vue
<template>
  <TimelineComponent :beforeItemRender="onBeforeItemRender">
    <e-items>
      <e-item v-for="event in events" :key="event.id" :content="event.text" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const events = ref([
  { id: 1, text: 'Critical', priority: 'high' },
  { id: 2, text: 'Normal', priority: 'medium' }
]);

const onBeforeItemRender = (args) => {
  // args.item - the item data
  // args.itemIndex - index of the item
  // args.element - the item DOM element
  console.log('Rendering item:', args.itemIndex);
};
</script>
```

### Customize Item Appearance

```vue
<template>
  <TimelineComponent :beforeItemRender="customizeItem">
    <e-items>
      <e-item
        v-for="(task, i) in tasks"
        :key="i"
        :content="task.title"
      />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const tasks = ref([
  { title: 'Design', status: 'completed' },
  { title: 'Development', status: 'in-progress' },
  { title: 'Testing', status: 'pending' }
]);

const customizeItem = (args) => {
  const task = tasks.value[args.itemIndex];
  if (task) {
    // Add status-based class
    args.element.classList.add(`task-${task.status}`);

    // Customize dot color via element
    const dot = args.element.querySelector('.e-dot');
    if (dot) {
      if (task.status === 'completed') dot.style.background = '#4caf50';
      if (task.status === 'in-progress') dot.style.background = '#ff9800';
      if (task.status === 'pending') dot.style.background = '#e0e0e0';
    }
  }
};
</script>
```

### Modify Content Before Render

```vue
<script setup>
const onBeforeItemRender = (args) => {
  // Augment content
  if (args.item) {
    const original = args.item.textContent || '';
    args.item.innerHTML = `
      <div class="custom-content">
        <strong>${original}</strong>
        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
      </div>
    `;
  }
};
</script>
```

## TimelineRenderingEventArgs

```typescript
interface TimelineRenderingEventArgs {
  item: any;              // The item data
  itemIndex: number;      // Index in items array
  element: HTMLElement;    // The item's DOM element
}
```

## Event Handling Patterns

### Pattern 1: Lazy Content Loading

```vue
<template>
  <TimelineComponent :beforeItemRender="loadLazyContent">
    <e-items>
      <e-item
        v-for="(item, i) in items"
        :key="i"
        :content="item.summary"
      />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([
  { id: 1, summary: 'Loading...', details: null },
  { id: 2, summary: 'Loading...', details: null }
]);

const loadLazyContent = async (args) => {
  const item = items.value[args.itemIndex];
  if (item && !item.details) {
    // Simulate API call
    await new Promise(r => setTimeout(r, 500));
    item.details = `Details for ${item.id}`;
    args.element.querySelector('.e-timeline-content').innerHTML = item.details;
  }
};
</script>
```

### Pattern 2: Conditional Styling

```vue
<script setup>
import { ref, computed } from 'vue';

const events = ref([
  { type: 'success', message: 'All tests passed' },
  { type: 'error', message: 'Build failed' },
  { type: 'warning', message: 'Slow performance detected' }
]);

const onBeforeItemRender = (args) => {
  const event = events.value[args.itemIndex];
  if (event) {
    args.element.classList.add(`event-${event.type}`);

    const dot = args.element.querySelector('.e-dot');
    if (dot) {
      const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800'
      };
      dot.style.background = colors[event.type] || '#2196f3';
    }
  }
};
</script>
```

### Pattern 3: Track Render Performance

```vue
<template>
  <TimelineComponent :beforeItemRender="trackRender">
    <e-items>
      <e-item v-for="(item, i) in items" :key="i" :content="item.text" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref(Array.from({ length: 10 }, (_, i) => ({ text: `Item ${i + 1}` })));
const renderTimes = ref([]);

const trackRender = (args) => {
  const start = performance.now();
  // Do work
  const end = performance.now();
  renderTimes.value.push({ index: args.itemIndex, time: end - start });
};
</script>
```

### Pattern 4: Interactive Items

```vue
<template>
  <TimelineComponent :beforeItemRender="makeInteractive">
    <e-items>
      <e-item v-for="event in events" :key="event.id" :content="event.title" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const events = ref([
  { id: 1, title: 'Click me' },
  { id: 2, title: 'Click me too' }
]);

const makeInteractive = (args) => {
  args.element.style.cursor = 'pointer';
  args.element.addEventListener('click', () => {
    const event = events.value[args.itemIndex];
    console.log('Clicked:', event);
  });
};
</script>
```

## Best Practices

1. **Use beforeItemRender for dynamic customization**: Better than template functions

2. **Keep handlers fast**: They fire for every item

3. **Avoid heavy DOM operations**: Cache references when possible

4. **Use addEventListener sparingly**: Clean up on unmount

5. **Validate data**: Check for null/undefined in handlers

6. **Use performance.now()**: For accurate timing measurements

7. **Handle async carefully**: Use await but consider race conditions

**Next:** Learn about [advanced features](timeline-advanced-features.md).
