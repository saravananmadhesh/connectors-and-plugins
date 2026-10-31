# Timeline Advanced Features (Vue 3)

## Table of Contents
- [Template Property for Custom Rendering](#template-property-for-custom-rendering)
- [Template Context](#template-context)
- [Reverse Property for Newest-First Display](#reverse-property-for-newest-first-display)
- [Complex Template Patterns](#complex-template-patterns)
- [When to Use Templates vs. Built-in Properties](#when-to-use-templates-vs-built-in-properties)
- [Accessibility](#accessibility)

## Template Property for Custom Rendering

Use the `template` property for complete custom item rendering:

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent :template="customTemplate">
      <e-items>
        <e-item v-for="item in items" :key="item.id" :content="item.title" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([
  { id: 1, title: 'Meeting', time: '10:00', attendees: 5 },
  { id: 2, title: 'Lunch', time: '12:30', attendees: 2 }
]);

const customTemplate = (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-timeline-item';
  wrapper.innerHTML = `
    <div class="item-header">
      <h3>${data.title}</h3>
      <span class="time">${data.time}</span>
    </div>
    <div class="item-body">
      <span>${data.attendees} attendees</span>
    </div>
  `;
  return wrapper;
};
</script>
```

## Template Context

The template function receives the item data:

```typescript
interface TimelineTemplateContext {
  [key: string]: any;  // All item data fields
}
```

```vue
<script setup>
const customTemplate = (data) => {
  // data contains all fields from the item
  return `<div>
    <strong>${data.title}</strong>
    <p>${data.description}</p>
  </div>`;
};
</script>
```

## Reverse Property for Newest-First Display

Display items in reverse order (useful for activity feeds, history):

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent :reverse="true">
      <e-items>
        <e-item content="Latest activity" />
        <e-item content="Previous activity" />
        <e-item content="Oldest activity" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### Toggle Reverse

```vue
<template>
  <div>
    <button @click="reverse = !reverse">
      {{ reverse ? 'Newest First' : 'Oldest First' }}
    </button>
    <div style="height: 400px;">
      <TimelineComponent :reverse="reverse">
        <e-items>
          <e-item content="Activity 1" />
          <e-item content="Activity 2" />
          <e-item content="Activity 3" />
        </e-items>
      </TimelineComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent } from '@syncfusion/ej2-vue-layouts';

const reverse = ref(true);
</script>
```

## Complex Template Patterns

### Pattern 1: Card-Style Items

```vue
<template>
  <TimelineComponent :template="cardTemplate">
    <e-items>
      <e-item v-for="post in posts" :key="post.id" :content="post.title" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const posts = ref([
  { id: 1, title: 'Post 1', author: 'Alice', content: 'First post content', image: 'p1.jpg' },
  { id: 2, title: 'Post 2', author: 'Bob', content: 'Second post content', image: 'p2.jpg' }
]);

const cardTemplate = (data) => {
  const card = document.createElement('div');
  card.className = 'timeline-card';
  card.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="card-image" />
    <div class="card-body">
      <h3>${data.title}</h3>
      <div class="card-author">By ${data.author}</div>
      <p>${data.content}</p>
    </div>
  `;
  return card;
};
</script>

<style>
.timeline-card {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}
.card-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.card-body {
  padding: 12px;
  flex: 1;
}
.card-author {
  color: #666;
  font-size: 12px;
  margin: 4px 0;
}
</style>
```

### Pattern 2: Timeline with Actions

```vue
<template>
  <TimelineComponent :template="actionTemplate">
    <e-items>
      <e-item v-for="(event, i) in events" :key="i" :content="event.title" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const events = ref([
  { id: 1, title: 'Event 1', status: 'completed' },
  { id: 2, title: 'Event 2', status: 'in-progress' },
  { id: 3, title: 'Event 3', status: 'pending' }
]);

const handleAction = (id, action) => {
  console.log(`${action} event ${id}`);
};

const actionTemplate = (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'action-item';
  wrapper.innerHTML = `
    <div class="action-header">
      <strong>${data.title}</strong>
      <span class="status status-${data.status}">${data.status}</span>
    </div>
    <div class="action-buttons">
      <button onclick="(${handleAction.toString()})(${data.id}, 'view')">View</button>
      <button onclick="(${handleAction.toString()})(${data.id}, 'edit')">Edit</button>
    </div>
  `;
  return wrapper;
};
</script>

<style>
.action-item {
  padding: 12px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}
.action-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.status-completed { color: #4caf50; }
.status-in-progress { color: #ff9800; }
.status-pending { color: #999; }
.action-buttons button {
  margin-right: 8px;
  padding: 4px 8px;
}
</style>
```

### Pattern 3: Timeline with Media

```vue
<script setup>
const mediaTemplate = (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'media-item';
  wrapper.innerHTML = `
    <div class="media-header">
      <h3>${data.title}</h3>
      <time>${data.date}</time>
    </div>
    <div class="media-content">
      <p>${data.description}</p>
      ${data.image ? `<img src="${data.image}" alt="${data.title}" />` : ''}
    </div>
    <div class="media-footer">
      <button>Like</button>
      <button>Share</button>
      <button>Comment</button>
    </div>
  `;
  return wrapper;
};
</script>
```

## When to Use Templates vs. Built-in Properties

### Use Built-in Properties When:

- Content is simple text
- Standard alignment is sufficient
- No custom layout needed
- Quick to implement

```vue
<template>
  <TimelineComponent align="Alternate">
    <e-items>
      <e-item content="Simple" oppositeContent="Date" />
    </e-items>
  </TimelineComponent>
</template>
```

### Use Templates When:

- Complex layout required
- Multiple media types
- Custom actions or interactivity
- Rich card-based display

```vue
<template>
  <TimelineComponent :template="complexTemplate">
    <e-items>
      <e-item v-for="item in complex" :key="item.id" :content="item.title" />
    </e-items>
  </TimelineComponent>
</template>
```

## Accessibility

### Keyboard Navigation

```vue
<template>
  <div>
    <button @click="previous" :disabled="currentIndex === 0">Previous</button>
    <button @click="next" :disabled="currentIndex === events.length - 1">Next</button>
    <div style="height: 400px;">
      <TimelineComponent>
        <e-items>
          <e-item
            v-for="(event, i) in events"
            :key="i"
            :content="event.title"
            :cssClass="i === currentIndex ? 'focused' : ''"
          />
        </e-items>
      </TimelineComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent } from '@syncfusion/ej2-vue-layouts';

const events = ref([
  { title: 'A' },
  { title: 'B' },
  { title: 'C' }
]);

const currentIndex = ref(0);
const previous = () => { if (currentIndex.value > 0) currentIndex.value--; };
const next = () => { if (currentIndex.value < events.value.length - 1) currentIndex.value++; };
</script>

<style>
.focused {
  outline: 2px solid #0066cc;
  background: #f0f8ff;
}
</style>
```

### ARIA Labels

```vue
<template>
  <TimelineComponent :htmlAttributes="ariaAttrs">
    <e-items>
      <e-item content="Event" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const ariaAttrs = {
  role: 'list',
  'aria-label': 'Project timeline'
};
</script>
```

### Screen Reader Announcements

```vue
<template>
  <div>
    <div aria-live="polite" class="sr-only">{{ announcement }}</div>
    <TimelineComponent :beforeItemRender="announceItem">
      <e-items>
        <e-item v-for="event in events" :key="event.id" :content="event.title" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const events = ref([{ id: 1, title: 'A' }, { id: 2, title: 'B' }]);
const announcement = ref('');

const announceItem = (args) => {
  announcement.value = `Item ${args.itemIndex + 1} of ${events.value.length}: ${events.value[args.itemIndex].title}`;
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## Best Practices

1. **Use templates for complex items**: Reserve for when built-in isn't enough

2. **Cache template functions**: Don't recreate on every render

3. **Use `reverse` for activity feeds**: Newest first is conventional

4. **Test templates thoroughly**: They can break easily

5. **Provide accessibility**: ARIA labels, keyboard nav

6. **Sanitize content**: Prevent XSS in user-generated data

7. **Profile performance**: Templates can be slow with many items

**Next:** Learn about [accessibility](timeline-accessibility.md) for full a11y support.
